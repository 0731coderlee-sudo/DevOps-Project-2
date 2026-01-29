"use client";

import React, { useState } from "react";
import TerminalBlock from "./TerminalBlock";
import { FaJava, FaJenkins, FaKey, FaCogs, FaPlay } from "react-icons/fa";
import MagnifiedImage from "./MagnifiedImage";

const tabs = [
    { id: "install", label: "1. Installation", icon: <FaJava /> },
    { id: "plugins", label: "2. Plugins", icon: <FaCogs /> },
    { id: "secrets", label: "3. Secrets", icon: <FaKey /> },
    { id: "pipelines", label: "4. Pipelines", icon: <FaJenkins /> },
    { id: "run", label: "5. Run", icon: <FaPlay /> },
];

export default function JenkinsSetupGuide() {
    const [activeTab, setActiveTab] = useState("install");

    return (
        <div className="w-full max-w-5xl mx-auto bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-800 bg-gray-900/50 scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                            ? "bg-blue-600/10 text-blue-400 border-b-2 border-blue-500"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                            }`}
                    >
                        <span className="text-sm sm:text-base">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.id === "install" ? "1" : tab.id === "plugins" ? "2" : tab.id === "secrets" ? "3" : tab.id === "pipelines" ? "4" : "5"}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8 min-h-[400px] sm:min-h-[500px]">
                {activeTab === "install" && (
                    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Installation Prerequisites</h3>
                        <p className="text-sm sm:text-base text-gray-400">
                            To run this project, you need a server (VPS or Local) with the following installed.
                        </p>

                        <div className="p-3 sm:p-4 rounded-lg border border-yellow-600/30 bg-yellow-500/10">
                            <p className="text-yellow-400 text-xs sm:text-sm">
                                <strong>Important:</strong> The Jenkins machine must have <strong>Node.js (npm)</strong> and <strong>Python (pip)</strong> installed
                                to run frontend linting and backend tests in the CI pipeline.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            <div>
                                <h4 className="text-base sm:text-lg font-semibold text-blue-400 mb-2">Step 1: Install Java</h4>
                                <p className="text-xs sm:text-sm text-gray-500 mb-2">Jenkins requires Java (OpenJDK 17 recommended).</p>
                                <TerminalBlock title="Install Java">
                                    {`sudo apt update
sudo apt install fontconfig openjdk-17-jre
java -version`}
                                </TerminalBlock>
                            </div>

                            <div>
                                <h4 className="text-base sm:text-lg font-semibold text-blue-400 mb-2">Step 2: Install Node.js & npm</h4>
                                <p className="text-xs sm:text-sm text-gray-500 mb-2">Required for frontend linting in CI pipeline.</p>
                                <TerminalBlock title="Install Node.js">
                                    {`curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v && npm -v`}
                                </TerminalBlock>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
                            <div>
                                <h4 className="text-base sm:text-lg font-semibold text-blue-400 mb-2">Step 3: Install Python & pip</h4>
                                <p className="text-xs sm:text-sm text-gray-500 mb-2">Required for backend testing in CI pipeline.</p>
                                <TerminalBlock title="Install Python">
                                    {`sudo apt install python3 python3-pip -y
python3 --version
pip3 --version`}
                                </TerminalBlock>
                            </div>

                            <div>
                                <h4 className="text-base sm:text-lg font-semibold text-blue-400 mb-2">Step 4: Install Jenkins</h4>
                                <p className="text-xs sm:text-sm text-gray-500 mb-2">Add the repo and install the package.</p>
                                <TerminalBlock title="Install Jenkins">
                                    {`sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins`}
                                </TerminalBlock>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6">
                            <h4 className="text-base sm:text-lg font-semibold text-blue-400 mb-2">Step 5: Start & Unlock</h4>
                            <p className="text-xs sm:text-sm text-gray-500 mb-2">
                                Start the service and retrieve the initial admin password to unlock the dashboard at <code>http://your-ip:8080</code>.
                            </p>
                            <TerminalBlock title="Unlock Jenkins">
                                {`sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo cat /var/lib/jenkins/secrets/initialAdminPassword`}
                            </TerminalBlock>
                        </div>
                    </div>
                )}

                {activeTab === "plugins" && (
                    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Required Plugins</h3>
                        <p className="text-sm sm:text-base text-gray-400">
                            Navigate to <strong className="text-white">Manage Jenkins {">"} Plugins {">"} Available Plugins</strong> and install these essentials:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                                { name: "Docker", desc: "For building and pushing images." },
                                { name: "Docker Pipeline", desc: "Scripting Docker commands in Jenkinsfile." },
                                { name: "NodeJS", desc: "Provides Node.js and npm for frontend linting." },
                                { name: "Pipeline: Stage View", desc: "Visualizing the workflow stages." },
                                { name: "Ansible", desc: "For infrastructure automation (optional if using shell)." },
                            ].map((plugin, i) => (
                                <div key={i} className="p-3 sm:p-4 rounded-xl border border-gray-800 bg-gray-900/50 flex items-start gap-3 sm:gap-4">
                                    <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg text-blue-400 text-sm sm:text-base">
                                        <FaCogs />
                                    </div>
                                    <div>
                                        <h5 className="text-sm sm:text-base font-semibold text-white">{plugin.name}</h5>
                                        <p className="text-xs sm:text-sm text-gray-500">{plugin.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "secrets" && (
                    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Configure Secrets</h3>
                        <p className="text-sm sm:text-base text-gray-400">
                            Go to <strong className="text-white">Manage Jenkins {">"} Credentials {">"} System {">"} Global credentials</strong>.
                        </p>

                        <div className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl mb-6">
                            <MagnifiedImage
                                src="/images/jenkins_credentials.png"
                                alt="Jenkins Credentials Configuration"
                                width={800}
                                height={400}
                                className="w-full opacity-90"
                                unoptimized
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                        <th className="py-2 px-4">ID</th>
                                        <th className="py-2 px-4">Kind</th>
                                        <th className="py-2 px-4">Value/Content</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-300">
                                    <tr className="border-b border-gray-800/50">
                                        <td className="py-3 px-4 font-mono text-yellow-400">dockerhub-username</td>
                                        <td className="py-3 px-4">Username with password</td>
                                        <td className="py-3 px-4">Docker Hub User & Access Token</td>
                                    </tr>
                                    <tr className="border-b border-gray-800/50">
                                        <td className="py-3 px-4 font-mono text-yellow-400">vps-credentials</td>
                                        <td className="py-3 px-4">Username with password</td>
                                        <td className="py-3 px-4">SSH User (root) & Password</td>
                                    </tr>
                                    <tr className="border-b border-gray-800/50">
                                        <td className="py-3 px-4 font-mono text-green-400">vps-ip</td>
                                        <td className="py-3 px-4">Secret text</td>
                                        <td className="py-3 px-4">Target Server IP Address</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-4 font-mono text-green-400">DEVOPS2_DOMAIN</td>
                                        <td className="py-3 px-4">Secret text</td>
                                        <td className="py-3 px-4">Your Domain (e.g., example.com)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "pipelines" && (
                    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
                        <div>
                            <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">1. DevOps-CI (Continuous Integration)</h3>
                            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                                Builds Docker images, runs tests, and pushes to Docker Hub. Triggers CD on success.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                                <li><strong>Type:</strong> Pipeline</li>
                                <li><strong>Script Path:</strong> <code>Jenkinsfile</code></li>
                                <li><strong>Repo URL:</strong> <code>https://github.com/HimanM/DevOps-Project-2.git</code></li>
                            </ul>
                            <div className="rounded-xl overflow-hidden border border-gray-800">
                                <MagnifiedImage
                                    src="/images/jenkins_config.png"
                                    alt="CI Config"
                                    width={800}
                                    height={400}
                                    className="w-full"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-6 sm:pt-8">
                            <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">2. DevOps-CD (Continuous Deployment)</h3>
                            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                                Deploys the application to the VPS using Docker Compose.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                                <li><strong>Type:</strong> Pipeline</li>
                                <li><strong>Script Path:</strong> <code>Jenkinsfile.deploy</code></li>
                                <li><strong>Trigger:</strong> Build after other projects are built (DevOps-CI)</li>
                            </ul>
                            <div className="rounded-xl overflow-hidden border border-gray-800">
                                <MagnifiedImage
                                    src="/images/jenkins_cd_config.png"
                                    alt="CD Config"
                                    width={800}
                                    height={400}
                                    className="w-full"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-6 sm:pt-8">
                            <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4">3. DevOps-InitDomain (Infrastructure)</h3>
                            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                                Configures Nginx and SSL certificates using Ansible. Run this once initially.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                                <li><strong>Type:</strong> Pipeline</li>
                                <li><strong>Script Path:</strong> <code>Jenkinsfile.initdomain</code></li>
                            </ul>
                            <div className="rounded-xl overflow-hidden border border-gray-800">
                                <MagnifiedImage
                                    src="/images/jenkins_infra_config.png"
                                    alt="Infra Config"
                                    width={800}
                                    height={400}
                                    className="w-full"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "run" && (
                    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Execution Flow</h3>
                        <p className="text-sm sm:text-base text-gray-400">
                            Follow this order to successfully deploy the project.
                        </p>

                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm sm:text-base">1</div>
                                    <div>
                                        <h4 className="text-sm sm:text-base font-bold text-white">Run DevOps-InitDomain</h4>
                                        <p className="text-xs sm:text-sm text-gray-400">
                                            Manually build this job first. It installs Ansible, configures Nginx, and sets up SSL for your domain.
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-lg overflow-hidden border border-gray-800 mt-2">
                                    <MagnifiedImage
                                        src="/images/jenkins_infra_pipeline.png"
                                        alt="Infra Pipeline"
                                        width={800}
                                        height={400}
                                        className="w-full"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm sm:text-base">2</div>
                                    <div>
                                        <h4 className="text-sm sm:text-base font-bold text-white">Run DevOps-CI</h4>
                                        <p className="text-xs sm:text-sm text-gray-400">
                                            Trigger this job (or push to GitHub). It will build the app, run tests, and push images.
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-lg overflow-hidden border border-gray-800 mt-2">
                                    <MagnifiedImage
                                        src="/images/jenkins_pipeline_stage_view.png"
                                        alt="CI Pipeline Stage View"
                                        width={800}
                                        height={400}
                                        className="w-full"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-sm sm:text-base">3</div>
                                    <div>
                                        <h4 className="text-sm sm:text-base font-bold text-white">Automatic Deployment</h4>
                                        <p className="text-xs sm:text-sm text-gray-400">
                                            Upon success of CI, <strong>DevOps-CD</strong> will automatically trigger and deploy the new version to your VPS.
                                        </p>
                                    </div>
                                </div>
                                <div className="rounded-lg overflow-hidden border border-gray-800 mt-2">
                                    <MagnifiedImage
                                        src="/images/jenkins_cd_pipeline.png"
                                        alt="CD Pipeline"
                                        width={800}
                                        height={400}
                                        className="w-full"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
