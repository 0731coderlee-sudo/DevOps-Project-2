"use client";

import React, { useState, useEffect } from "react";
import { FaServer, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function BackendStatus() {
    const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");
    const [data, setData] = useState<{ message: string; timestamp: number } | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            setStatus("loading");
            try {
                const res = await fetch("/api/data");
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                    setStatus("online");
                } else {
                    setStatus("offline");
                }
            } catch (error) {
                console.error("Backend check failed:", error);
                setStatus("offline");
            }
        };

        checkStatus();
    }, []);

    return (
        <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaServer className="text-blue-400" />
                    Backend Status
                </h3>
                <button
                    onClick={() => window.location.reload()}
                    className="text-xs px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                    Refresh
                </button>
            </div>

            <div className="flex items-center gap-4">
                {status === "loading" && (
                    <div className="flex items-center gap-2 text-yellow-400">
                        <FaSpinner className="animate-spin" />
                        <span>Checking connection...</span>
                    </div>
                )}

                {status === "online" && (
                    <div className="flex items-center gap-2 text-green-400">
                        <FaCheckCircle />
                        <span>Online</span>
                        <span className="text-xs text-gray-500 ml-2 font-mono">
                            {data?.message}
                        </span>
                    </div>
                )}

                {status === "offline" && (
                    <div className="flex items-center gap-2 text-red-400">
                        <FaTimesCircle />
                        <span>Offline (Check Console)</span>
                    </div>
                )}
            </div>
        </div>
    );
}
