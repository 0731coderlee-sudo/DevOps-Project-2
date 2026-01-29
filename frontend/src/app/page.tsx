import BackendStatus from "@/components/BackendStatus";
import JenkinsSetupGuide from "@/components/JenkinsSetupGuide";
import JenkinsWorkflow from "@/components/JenkinsWorkflow";
import { FaGithub, FaJenkins, FaDocker, FaPython, FaReact } from "react-icons/fa";
import { SiAnsible } from "react-icons/si";

// Unused variable for testing Jenkins linting
const jenkins_test_unused_var = "This variable is intentionally unused for testing";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030712] to-[#030712]" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs sm:text-sm mb-4 sm:mb-6">
            <span className="flex w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
            DevOps Project 2
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 sm:mb-8 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent px-2">
            Advanced Jenkins <br /> CI/CD Orchestration
          </h1>

          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            A comprehensive demonstration of modern DevOps practices, featuring chained pipelines,
            infrastructure automation with Ansible, and containerized deployments.
          </p>

          <div className="max-w-md mx-auto mb-8 sm:mb-12 px-4">
            <BackendStatus />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            <a
              href="https://github.com/HimanM/DevOps-Project-2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FaGithub className="text-lg sm:text-xl" /> GitHub Repo
            </a>
            <a
              href="#setup"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FaJenkins className="text-lg sm:text-xl" /> Setup Guide
            </a>
          </div>

          {/* Docker Hub Links */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
            <a
              href="https://hub.docker.com/r/himanm/devops-project-2-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-2.5 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800/80 transition-all flex items-center gap-3"
            >
              <FaDocker className="text-xl text-blue-400" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Frontend Image</div>
                <div className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                  himanm/devops-project-2-frontend
                </div>
              </div>
            </a>
            <a
              href="https://hub.docker.com/r/himanm/devops-project-2-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-2.5 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800/80 transition-all flex items-center gap-3"
            >
              <FaDocker className="text-xl text-blue-400" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Backend Image</div>
                <div className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                  himanm/devops-project-2-backend
                </div>
              </div>
            </a>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto opacity-70 px-4">
            {[
              { icon: <FaJenkins />, name: "Jenkins" },
              { icon: <FaDocker />, name: "Docker" },
              { icon: <SiAnsible />, name: "Ansible" },
              { icon: <FaReact />, name: "Next.js" },
              { icon: <FaPython />, name: "Flask" },
              { icon: <FaGithub />, name: "GitHub" },
            ].map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                <div className="text-xl sm:text-2xl text-gray-300">{tech.icon}</div>
                <span className="text-xs font-medium text-gray-500">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Visualization */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#050a18]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Pipeline Architecture</h2>
            <p className="text-sm sm:text-base text-gray-400">Real-time visualization of the project&apos;s automation workflows.</p>
          </div>

          <JenkinsWorkflow />
        </div>
      </section>

      {/* Setup Guide */}
      <section id="setup" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Jenkins Setup & Configuration</h2>
            <p className="text-sm sm:text-base text-gray-400">Complete guide to configuring the CI/CD pipelines.</p>
          </div>

          <JenkinsSetupGuide />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p>© 2025 DevOps Project 2. Built for learning by HimanM</p>
      </footer>
    </main>
  );
}
