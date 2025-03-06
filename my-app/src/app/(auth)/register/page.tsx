"use client";
import { fetchActionApi } from "@/app/utils/actions";
import { useState } from "react";
import Input from "@/app/components/material/input";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("รหัสผ่านไม่ตรงกัน");
            return;
        }
        let body = {
            username: username,
            email: email,
            password: password
        };
        const res = await fetchActionApi("/api/auth/local/register", {
            method: "POST",
            body: JSON.stringify(body)
        });

        if (res) {
            if (res.status === 409) {
                alert("เป็นสมาชิกอยู่แล้ว");
            } else if (res.status !== 200) {
                console.log(res);
                alert("error");
            } else {
                console.log(res);
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '' }}>
            <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    สมัครสมาชิก
                </h1>
                <form onSubmit={(e) => register(e)}>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        label="ชื่อผู้ใช้"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        label="อีเมล"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        label="รหัสผ่าน"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        label="ยืนยันรหัสผ่าน"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        สมัครสมาชิก
                    </button>
                </form>
            </div>
        </div>
    );
}