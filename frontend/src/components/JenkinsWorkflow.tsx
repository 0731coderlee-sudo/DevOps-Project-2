"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaGitAlt,
    FaDocker,
    FaJenkins,
    FaServer,
    FaCheckCircle,
    FaLock,
    FaGlobe
} from "react-icons/fa";
import { SiAnsible, SiNginx } from "react-icons/si";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Stage = {
    id: string;
    label: string;
    icon: React.ReactNode;
    description: string;
};

type Workflow = {
    id: string;
    title: string;
    description: string;
    stages: Stage[];
};

const workflows: Workflow[] = [
    {
        id: "ci",
        title: "DevOps-CI Pipeline",
        description: "Continuous Integration: Builds and pushes Docker images on every commit.",
        stages: [
            { id: "checkout", label: "Checkout SCM", icon: <FaGitAlt />, description: "Pull code from GitHub" },
            { id: "quality", label: "Code Quality", icon: <FaCheckCircle />, description: "Linting & Unit Tests" },
            { id: "build", label: "Build Images", icon: <FaDocker />, description: "Build Frontend & Backend" },
            { id: "push", label: "Push Registry", icon: <FaDocker />, description: "Push to Docker Hub" },
            { id: "trigger", label: "Trigger CD", icon: <FaJenkins />, description: "Trigger Deployment" },
        ],
    },
    {
        id: "cd",
        title: "DevOps-CD Pipeline",
        description: "Continuous Deployment: Deploys the latest images to the VPS.",
        stages: [
            { id: "trigger", label: "Triggered", icon: <FaJenkins />, description: "Triggered by CI Success" },
            { id: "ssh", label: "SSH Connect", icon: <FaServer />, description: "Connect to VPS" },
            { id: "pull", label: "Pull Images", icon: <FaDocker />, description: "Pull from Docker Hub" },
            { id: "deploy", label: "Deploy", icon: <FaGlobe />, description: "Docker Compose Up" },
        ],
    },
    {
        id: "infra",
        title: "DevOps-InitDomain",
        description: "Infrastructure as Code: Configures Nginx and SSL.",
        stages: [
            { id: "checkout", label: "Checkout", icon: <FaGitAlt />, description: "Pull Playbooks" },
            { id: "ansible", label: "Ansible", icon: <SiAnsible />, description: "Run Playbook" },
            { id: "nginx", label: "Nginx Config", icon: <SiNginx />, description: "Reverse Proxy Setup" },
            { id: "ssl", label: "SSL Certs", icon: <FaLock />, description: "Let's Encrypt HTTPS" },
        ],
    },
];

export default function JenkinsWorkflow() {
    const [activeWorkflow, setActiveWorkflow] = useState(0);
    const [activeStage, setActiveStage] = useState(0);

    // Cycle through stages for the active workflow
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStage((prev) => {
                const currentWorkflow = workflows[activeWorkflow];
                if (prev < currentWorkflow.stages.length - 1) {
                    return prev + 1;
                }
                return 0; // Loop back to start
            });
        }, 1500); // 1.5s per stage

        return () => clearInterval(interval);
    }, [activeWorkflow]);

    return (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-8 sm:space-y-12">
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                {workflows.map((wf, idx) => (
                    <button
                        key={wf.id}
                        onClick={() => {
                            setActiveWorkflow(idx);
                            setActiveStage(0);
                        }}
                        className={cn(
                            "px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
                            activeWorkflow === idx
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        )}
                    >
                        {wf.title}
                    </button>
                ))}
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 sm:p-8 backdrop-blur-sm relative overflow-hidden min-h-[350px] sm:min-h-[400px] flex flex-col items-center justify-center">
                {/* Background Pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />

                <div className="relative z-10 text-center mb-8 sm:mb-12 px-2">
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-2">
                        {workflows[activeWorkflow].title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                        {workflows[activeWorkflow].description}
                    </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-3 md:gap-8 w-full pb-20 sm:pb-0">
                    {workflows[activeWorkflow].stages.map((stage, idx) => {
                        const isActive = idx === activeStage;
                        const isCompleted = idx < activeStage;

                        return (
                            <div key={stage.id} className="flex items-center w-full sm:w-auto">
                                {/* Stage Node */}
                                <div className="relative group flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 w-full sm:w-auto">
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1.2 : 1,
                                            borderColor: isActive ? "#3b82f6" : isCompleted ? "#10b981" : "#374151",
                                            backgroundColor: isActive ? "rgba(59, 130, 246, 0.1)" : isCompleted ? "rgba(16, 185, 129, 0.1)" : "transparent",
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-lg sm:text-2xl transition-colors duration-300 flex-shrink-0",
                                            isActive ? "text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]" :
                                                isCompleted ? "text-green-400" : "text-gray-600"
                                        )}
                                    >
                                        {stage.icon}
                                    </motion.div>

                                    {/* Label & Description */}
                                    <div className="sm:absolute sm:top-full sm:left-1/2 sm:-translate-x-1/2 sm:mt-3 md:mt-4 text-left sm:text-center w-full sm:w-32">
                                        <p className={cn(
                                            "text-xs sm:text-sm font-semibold transition-colors duration-300 leading-tight",
                                            isActive ? "text-blue-400" : isCompleted ? "text-green-400" : "text-gray-500"
                                        )}>
                                            {stage.label}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                            {stage.description}
                                        </p>
                                    </div>

                                    {/* Active Indicator Ring */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeRing"
                                            className="absolute inset-0 rounded-2xl border-2 border-blue-500"
                                            initial={{ opacity: 0, scale: 1.2 }}
                                            animate={{ opacity: [0, 1, 0], scale: [1.2, 1.4, 1.6] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Connector Line */}
                                {idx < workflows[activeWorkflow].stages.length - 1 && (
                                    <div className="hidden sm:block w-8 md:w-16 h-1 bg-gray-800 mx-2 relative overflow-hidden rounded-full">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{
                                                x: isCompleted ? "0%" : isActive ? "0%" : "-100%",
                                                opacity: isCompleted ? 1 : isActive ? 1 : 0
                                            }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className={cn(
                                                "absolute inset-0 h-full",
                                                isCompleted ? "bg-green-500" : "bg-blue-500"
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
