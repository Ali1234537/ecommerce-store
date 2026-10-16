"use client"

import { useState } from "react";

import { useRouter } from "next/navigation";

function AdminLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (email === "admin@gmail.com" && password === "123456789") {
            localStorage.setItem("Admin", "true");
            router.push("/admin")
        } else {
            setError("Invalid Email or password!")
        }
    }
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
            <form onSubmit={handleLogin}
                className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-center text-3xl font-bold text-gray-800">
                    Admin Login
                </h1>

                <div>
                    <label className="mb-2 block text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                        className="w-full rounded-lg border p-3 text-gray-900"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                        className="w-full rounded-lg border p-3 text-gray-900"
                    />
                </div>

                {error && (
                    <p className="text-red-600 text-lg">
                        {error}
                    </p>
                )}

                <button type="submit"
                    className="w-full rounded-lg bg-black p-3 font-semibold text-white hover:bg-gray-800">
                    Login as Admin
                </button>
            </form>
        </main>
    );
}

export default AdminLogin;