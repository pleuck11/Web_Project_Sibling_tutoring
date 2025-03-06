import { cookies } from "next/headers";
import qs from 'qs'
 
interface FetchResponse<T> {
   data: T | null;
   status?: number;
   error?: {};
}
 
export const fetchApi = async <T>(
   path: string,
   options: RequestInit = {
      method: "GET",
   },
   populate?: any,
   filters?: any,
): Promise<FetchResponse<T>> => {
   let headers = {};
   const cookie = await cookies()
   const accessToken = cookie.get("access_token")?.value || "";
 
   if (accessToken !== "") {
      headers = {
         "Content-type": "application/json",
         "Authorization": `Bearer ${accessToken}`
      }
   } else {
      headers = {
         "Content-type": "application/json"
      };
   }
 
   let url: any;
 
   if (populate) {
      let queryParams: any = {};
      queryParams = populate;
      if (filters) {
         queryParams.filters = filters;
      };
      const newUrl = new URL(path, process.env.API_URL);
 
      newUrl.search = qs.stringify({populate: queryParams});
      url = newUrl;
   } else {
      url = `${process.env.API_URL}${path}`
   }
 
   try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();
 
      return { data, status: response.status };
   } catch (error) {
      return { data: null, status: 500, error: "Unknown error" };
   }
}