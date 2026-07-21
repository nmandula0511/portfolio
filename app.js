/* ==========================================================================
   PORTFOLIO SCRIPTS - NAVEEN MANDULA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initProjectFilters();
    initProjectModals();
    initContactForm();
    initScrollAnimations();
});

/* ==========================================================================
   THEME SWITCHING (DARK/LIGHT)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !mainNav) return;

    navToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ==========================================================================
   PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to current
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Simple enter transition trigger
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

/* ==========================================================================
   PROJECT MODALS (STAR SYSTEM DETAILS)
   ========================================================================== */
const CASE_STUDIES_DATA = {
    'strands-orchestrator': {
        title: 'A2A Multi-Agent Diagnostics Engine',
        badge: 'AWS Native Agentic AI',
        impact: '95% Auto-Remediation',
        specs: [
            ['Orchestration', 'AWS Strands SDK'],
            ['Large Language Model', 'Amazon Nova PRO (Bedrock)'],
            ['Agent Protocol', 'A2A / agent_card.json'],
            ['Tool Integration', 'Decoupled MCP Gateway'],
            ['Isolation', 'Session Isolation Factory']
        ],
        situation: 'At a major telecom provider, the network operations vertical (NOC) managed a fleet of 140,000+ hybrid dual-link edge routers supporting Spectrum Internet Backup connectivity. The legacy diagnostics sub-agent code was built as a vanilla, tightly coupled Python prototype. It executed routing validations and diagnostic commands sequentially, causing high response latencies (~2.8s) and session context leaks when multiple operators ran tasks simultaneously.',
        task: 'Re-architect and implement an enterprise-grade backend and multi-agent topology to automate root-cause diagnosis (RCA), isolate query states, parallelize tool execution, and minimize latency.',
        action: 'Refactored the system into an Agent-to-Agent (A2A) orchestration hierarchy managed by a master orchestrator (<code>NetOrchestrator</code>). Sub-agents (SmartEdge Diagnostics, Cable Modem, Mobile Offload) publish capabilities using A2A JSON manifests (<code>agent_card.json</code>). Built a custom Agent Factory to isolate conversation states. Deployed a multi-threaded Central Model Context Protocol (MCP) Gateway that parallelizes target queries (Amazon Neptune Graph DB, DynamoDB active configs, and Aurora PostgreSQL logs) as reusable, discoverable <code>@tool</code> services. Deprecated API serverless layers in favor of direct FastAPI containers.',
        result: 'Achieved a 95% autonomous fault diagnostics and self-healing rate, eliminating the need for expensive physical truck rolls. Slashed execution response latency from 1200ms down to under 150ms while standardizing deployments via Terraform templates.',
        architectureSvg: `
            <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>
                    .edge { stroke: #374151; stroke-width: 1.5; fill: none; }
                    .edge-glow { stroke: #6366f1; stroke-width: 2; fill: none; stroke-dasharray: 4,4; }
                    .node-box { fill: #111827; stroke: #374151; stroke-width: 1.5; rx: 6px; }
                    .node-box-active { fill: #111827; stroke: #6366f1; stroke-width: 2px; rx: 6px; }
                    .node-box-accent { fill: #111827; stroke: #14b8a6; stroke-width: 2px; rx: 6px; }
                    .text-header { fill: #f3f4f6; font-size: 10px; font-family: monospace; font-weight: bold; text-anchor: middle; }
                    .text-body { fill: #9ca3af; font-size: 8px; font-family: sans-serif; text-anchor: middle; }
                </style>
                <!-- Graph lines -->
                <path d="M 90,80 L 140,80" class="edge" marker-end="url(#arrow)"/>
                <path d="M 220,80 L 255,80" class="edge" />
                <path d="M 285,80 L 310,40" class="edge-glow" />
                <path d="M 285,80 L 310,80" class="edge-glow" />
                <path d="M 285,80 L 310,120" class="edge-glow" />
                <path d="M 390,40 L 420,60" class="edge" />
                <path d="M 390,80 L 420,80" class="edge" />
                <path d="M 390,120 L 420,100" class="edge" />
                
                <!-- Telemetry Stream -->
                <rect x="15" y="55" width="75" height="50" class="node-box" />
                <text x="52" y="78" class="text-header">Telemetry</text>
                <text x="52" y="90" class="text-body">140k+ Routers</text>
                
                <!-- Kafka Buffer -->
                <rect x="140" y="55" width="80" height="50" class="node-box-accent" />
                <text x="180" y="78" class="text-header">Kafka Queue</text>
                <text x="180" y="90" class="text-body">(Log Buffer)</text>
                
                <!-- Agent Factory -->
                <polygon points="255,80 270,60 285,80 270,100" fill="#111827" stroke="#6366f1" stroke-width="2" />
                <text x="270" y="83" class="text-header" font-size="8">Factory</text>
                
                <!-- SmartEdge Diagnostics Agent -->
                <rect x="310" y="20" width="80" height="40" class="node-box-active" />
                <text x="350" y="37" class="text-header">SmartEdge Agt</text>
                <text x="350" y="49" class="text-body">WiFi Stuck LTE</text>
                
                <!-- Cable Modem Agent -->
                <rect x="310" y="60" width="80" height="40" class="node-box" />
                <text x="350" y="77" class="text-header">CableModem Agt</text>
                <text x="350" y="89" class="text-body">Modem State</text>
                
                <!-- Mobile Offload Agent -->
                <rect x="310" y="100" width="80" height="40" class="node-box" />
                <text x="350" y="117" class="text-header">Offload Agent</text>
                <text x="350" y="129" class="text-body">Tower Hand-off</text>
                
                <!-- DB targets -->
                <rect x="420" y="40" width="65" height="30" class="node-box-accent" />
                <text x="452" y="58" class="text-header">DynamoDB</text>
                
                <!-- Topology Graph -->
                <rect x="420" y="80" width="65" height="30" class="node-box-accent" />
                <text x="452" y="98" class="text-header">Neptune DB</text>
                
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 2 L 10 5 L 0 8 z" fill="#374151" />
                    </marker>
                </defs>
            </svg>
        `
    },
    'kafka-recovery': {
        title: 'Invincible Backup Real-Time Ingestion',
        badge: 'Event-Driven Data Pipeline',
        impact: 'Zero Redundant Dispatches',
        specs: [
            ['Message Broker', 'Apache Kafka'],
            ['Telemetry Volume', '140k+ Active Modems'],
            ['ETL Processor', 'AWS Glue ETL Jobs'],
            ['Storage Systems', 'DynamoDB & Aurora PostgreSQL'],
            ['Monitoring Latency', 'Near-Real-Time (<5s)']
        ],
        situation: 'The dual-link hybrid router fleet (equipped with Spectrum Internet Backup connectivity) experienced anomalous loops where customer devices failed to fail back from cellular 5G back to the primary fiber broadband after regional outages. This led to cellular cost overruns and excessive field dispatches (truck rolls) to customer sites.',
        task: 'Build a low-latency telemetry data streaming and event correlation pipeline to monitor 140,000+ active routers, track backup state triggers, and automatically flag locked units for diagnostic runs.',
        action: 'Maintained and optimized real-time Apache Kafka streaming data pipelines. Engineered background time-series correlation algorithms in Python to detect modems remaining stuck on 5G cellular for over 90 minutes. Paired cable modem statuses with backup unit data to identify systemic issues vs local device failures, routing cleaned telemetry logs directly to Aurora SQL and DynamoDB data tiers via automated Glue ETL tasks.',
        result: 'Delivered instant visual RCA insights to NOC engineers, preventing unnecessary field truck rolls and automatically restoring high-speed connectivity in over 95% of identified cases.',
        architectureSvg: `
            <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>
                    .edge { stroke: #374151; stroke-width: 1.5; fill: none; }
                    .edge-glow { stroke: #14b8a6; stroke-width: 2; fill: none; }
                    .node-box { fill: #111827; stroke: #374151; stroke-width: 1.5; rx: 6px; }
                    .node-box-active { fill: #111827; stroke: #6366f1; stroke-width: 2px; rx: 6px; }
                    .node-box-accent { fill: #111827; stroke: #14b8a6; stroke-width: 2px; rx: 6px; }
                    .text-header { fill: #f3f4f6; font-size: 10px; font-family: monospace; font-weight: bold; text-anchor: middle; }
                    .text-body { fill: #9ca3af; font-size: 8px; font-family: sans-serif; text-anchor: middle; }
                </style>
                <!-- Paths -->
                <path d="M 80,100 L 120,100" class="edge-glow" />
                <path d="M 210,100 L 250,100" class="edge" />
                <path d="M 335,100 L 375,100" class="edge-glow" />
                <path d="M 335,100 L 375,60" class="edge" />
                <path d="M 335,100 L 375,140" class="edge" />
                
                <!-- Nodes -->
                <rect x="15" y="75" width="65" height="50" class="node-box" />
                <text x="47" y="98" class="text-header">IoT Devices</text>
                <text x="47" y="110" class="text-body">140k Routers</text>
                
                <rect x="120" y="70" width="90" height="60" class="node-box-accent" />
                <text x="165" y="95" class="text-header">Apache Kafka</text>
                <text x="165" y="110" class="text-body">(Real-Time Queue)</text>
                
                <rect x="250" y="75" width="85" height="50" class="node-box" />
                <text x="292" y="98" class="text-header">Glue ETL</text>
                <text x="292" y="110" class="text-body">(Batch Process)</text>
                
                <rect x="375" y="35" width="95" height="35" class="node-box-active" />
                <text x="422" y="52" class="text-header">DynamoDB</text>
                <text x="422" y="62" class="text-body">Active Configs</text>
                
                <rect x="375" y="82" width="95" height="35" class="node-box-active" />
                <text x="422" y="99" class="text-header">Aurora DB</text>
                <text x="422" y="109" class="text-body">Historical Logs</text>
                
                <rect x="375" y="130" width="95" height="35" class="node-box-active" />
                <text x="422" y="147" class="text-header">AIOps Engine</text>
                <text x="422" y="157" class="text-body">Stuck Anomaly</text>
            </svg>
        `
    },
    'ups-langgraph': {
        title: 'Enterprise LangGraph AI Platform',
        badge: 'Multi-Agent System',
        impact: 'Enterprise Scale',
        specs: [
            ['Engine', 'LangGraph & LangChain'],
            ['Models', 'AWS Bedrock & SageMaker'],
            ['RAG Strategy', 'Hybrid Vector (Pinecone + FAISS)'],
            ['Telemetry', 'OpenTelemetry & CloudWatch'],
            ['Access Tier', 'IAM & Secure Tenants']
        ],
        situation: 'UPS required a centralized, secure AI infrastructure to deploy diverse intelligent assistants across regional logistics operations and corporate divisions, preventing disjointed, expensive PoC experiments.',
        task: 'Architect and scale a multi-tenant Agentic AI platform. The system needed strict security boundaries, robust compliance guardrails, cost-tracking controls, and high retrieval accuracy.',
        action: 'Coordinated the development of standard planner-executor agents utilizing LangGraph. Designed hybrid search retrievers merging vector databases (FAISS + Pinecone) with traditional BM25. Built global token usage caching models, prompt verification checks, and system logging monitors utilizing OpenTelemetry.',
        result: 'Successfully onboarded multiple business units onto a unified AWS Bedrock environment. Realized massive savings in model costs through token optimization and decreased hallucination rates in production pipelines.',
        architectureSvg: `
            <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>
                    .edge { stroke: #374151; stroke-width: 1.5; fill: none; }
                    .edge-glow { stroke: #6366f1; stroke-width: 2; fill: none; }
                    .node-box { fill: #111827; stroke: #374151; stroke-width: 1.5; rx: 6px; }
                    .node-box-active { fill: #111827; stroke: #6366f1; stroke-width: 2px; rx: 6px; }
                    .node-box-accent { fill: #111827; stroke: #14b8a6; stroke-width: 2px; rx: 6px; }
                    .text-header { fill: #f3f4f6; font-size: 10px; font-family: monospace; font-weight: bold; text-anchor: middle; }
                    .text-body { fill: #9ca3af; font-size: 8px; font-family: sans-serif; text-anchor: middle; }
                </style>
                <!-- Paths -->
                <path d="M 85,100 L 125,100" class="edge" />
                <path d="M 215,100 L 255,100" class="edge-glow" />
                <path d="M 350,75 L 380,45" class="edge" />
                <path d="M 350,125 L 380,155" class="edge" />
                
                <!-- Nodes -->
                <rect x="15" y="75" width="70" height="50" class="node-box" />
                <text x="50" y="98" class="text-header">User UI</text>
                <text x="50" y="110" class="text-body">API Gateway</text>
                
                <rect x="125" y="70" width="90" height="60" class="node-box-active" />
                <text x="170" y="95" class="text-header">LangGraph</text>
                <text x="170" y="110" class="text-body">(Planner-Executor)</text>
                
                <rect x="255" y="70" width="95" height="60" class="node-box-accent" />
                <text x="302" y="95" class="text-header">Hybrid Search</text>
                <text x="302" y="110" class="text-body">(FAISS + Pinecone)</text>
                
                <rect x="380" y="20" width="95" height="40" class="node-box-active" />
                <text x="427" y="37" class="text-header">AWS Bedrock</text>
                <text x="427" y="49" class="text-body">Nova PRO / Claude</text>
                
                <rect x="380" y="140" width="95" height="40" class="node-box" />
                <text x="427" y="157" class="text-header">Observability</text>
                <text x="427" y="169" class="text-body">OTel &amp; CloudWatch</text>
            </svg>
        `
    },
    'visa-fraud': {
        title: 'Real-Time Fraud Network Analytics',
        badge: 'Deep Learning',
        impact: '88% Fraud Accuracy',
        specs: [
            ['Algorithm', 'XGBoost, LightGBM, TensorFlow'],
            ['Data Processing', 'GCP Dataflow & Vertex AI'],
            ['Scale', 'Billions of daily operations'],
            ['Metrics', '-14% False Positives'],
            ['Deployment', 'Kubernetes & MLflow (Azure)']
        ],
        situation: 'Visa payment rails require ultra-low latency screening structures to evaluate and block fraudulent transactions instantly without impacting genuine merchant processing speeds.',
        task: 'Develop high-throughput predictive models capable of scoring transaction risk within milliseconds and streamline MLOps monitoring for model drift.',
        action: 'Built deep neural networks and ensemble frameworks (XGBoost/LightGBM) distributed across GCP Vertex AI and BigQuery. Configured auto-updating MLOps infrastructure utilizing MLflow and Kubernetes. Applied explainable AI (SHAP/LIME) models to guarantee regulatory compliance.',
        result: 'Achieved an 88% overall fraud detection rate. Decreased credit card false positive transactions by 14% while preserving sub-millisecond network speeds.',
        architectureSvg: `
            <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>
                    .edge { stroke: #374151; stroke-width: 1.5; fill: none; }
                    .edge-glow { stroke: #14b8a6; stroke-width: 2; fill: none; }
                    .node-box { fill: #111827; stroke: #374151; stroke-width: 1.5; rx: 6px; }
                    .node-box-active { fill: #111827; stroke: #6366f1; stroke-width: 2px; rx: 6px; }
                    .node-box-accent { fill: #111827; stroke: #14b8a6; stroke-width: 2px; rx: 6px; }
                    .text-header { fill: #f3f4f6; font-size: 10px; font-family: monospace; font-weight: bold; text-anchor: middle; }
                    .text-body { fill: #9ca3af; font-size: 8px; font-family: sans-serif; text-anchor: middle; }
                </style>
                <!-- Paths -->
                <path d="M 85,100 L 125,100" class="edge" />
                <path d="M 220,100 L 260,100" class="edge-glow" />
                <path d="M 355,100 L 395,100" class="edge-glow" />
                
                <!-- Nodes -->
                <rect x="15" y="75" width="70" height="50" class="node-box" />
                <text x="50" y="98" class="text-header">Transaction Feed</text>
                <text x="50" y="110" class="text-body">Billions of Tx</text>
                
                <rect x="125" y="70" width="95" height="60" class="node-box-accent" />
                <text x="172" y="95" class="text-header">GCP Dataflow</text>
                <text x="172" y="110" class="text-body">(Streaming ETL)</text>
                
                <rect x="260" y="70" width="95" height="60" class="node-box-active" />
                <text x="307" y="95" class="text-header">Vertex AI</text>
                <text x="307" y="110" class="text-body">(XGBoost + TF)</text>
                
                <rect x="395" y="75" width="80" height="50" class="node-box" />
                <text x="435" y="98" class="text-header">MLflow / K8s</text>
                <text x="435" y="110" class="text-body">PCI Governance</text>
            </svg>
        `
    },
    'ge-iot': {
        title: 'Industrial Predictive Maintenance Platform',
        badge: 'IoT Machine Learning',
        impact: '-11% Downtime',
        specs: [
            ['Modeling', 'Random Forests & XGBoost'],
            ['ETL Engine', 'PySpark / AWS EMR'],
            ['Storage Hub', 'AWS Redshift & S3'],
            ['Metrics', '79% Failure Prediction Rate'],
            ['IaC Provisioning', 'Terraform Templates']
        ],
        situation: 'General Electric industrial units (turbines, generators) faced unexpected breakdowns, leading to steep production losses and high emergency maintenance costs.',
        task: 'Formulate a continuous failure-forecasting engine that flags internal issues before mechanical breakdown occurs.',
        action: 'Constructed an AWS industrial IoT framework leveraging PySpark pipelines to process gigabytes of sensor feeds. Trained Random Forest and gradient-boosted diagnostic classifiers to recognize signature wear anomalies.',
        result: 'Decreased unplanned asset downtime by 11% while hitting a 79% failure prediction accuracy rate.',
        architectureSvg: `
            <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>
                    .edge { stroke: #374151; stroke-width: 1.5; fill: none; }
                    .edge-glow { stroke: #6366f1; stroke-width: 2; fill: none; }
                    .node-box { fill: #111827; stroke: #374151; stroke-width: 1.5; rx: 6px; }
                    .node-box-active { fill: #111827; stroke: #6366f1; stroke-width: 2px; rx: 6px; }
                    .node-box-accent { fill: #111827; stroke: #14b8a6; stroke-width: 2px; rx: 6px; }
                    .text-header { fill: #f3f4f6; font-size: 10px; font-family: monospace; font-weight: bold; text-anchor: middle; }
                    .text-body { fill: #9ca3af; font-size: 8px; font-family: sans-serif; text-anchor: middle; }
                </style>
                <!-- Paths -->
                <path d="M 80,60 L 120,80" class="edge" />
                <path d="M 80,140 L 120,120" class="edge" />
                <path d="M 215,100 L 255,100" class="edge" />
                <path d="M 345,100 L 385,100" class="edge-glow" />
                
                <!-- Nodes -->
                <rect x="15" y="35" width="65" height="45" class="node-box" />
                <text x="47" y="58" class="text-header">IoT Sensors</text>
                <text x="47" y="70" class="text-body">Turbine Telemetry</text>
                
                <rect x="15" y="115" width="65" height="45" class="node-box" />
                <text x="47" y="138" class="text-header">Logs/Events</text>
                <text x="47" y="150" class="text-body">Outage History</text>
                
                <rect x="120" y="70" width="95" height="60" class="node-box-accent" />
                <text x="167" y="95" class="text-header">PySpark / EMR</text>
                <text x="167" y="110" class="text-body">(Feature Engine)</text>
                
                <rect x="255" y="70" width="90" height="60" class="node-box" />
                <text x="300" y="95" class="text-header">AWS Redshift</text>
                <text x="300" y="110" class="text-body">(Data Warehouse)</text>
                
                <rect x="385" y="70" width="100" height="60" class="node-box-active" />
                <text x="435" y="95" class="text-header">LSTM + XGBoost</text>
                <text x="435" y="110" class="text-body">(RUL Forecast)</text>
            </svg>
        `
    }
};

function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');

    if (!modal || !modalClose) return;

    // Elements inside the modal to update
    const mBadge = document.getElementById('modal-badge');
    const mTitle = document.getElementById('modal-title');
    const mImpactVal = document.getElementById('modal-impact-val');
    const mSpecsList = document.getElementById('modal-specs-list');
    const mSituation = document.getElementById('star-situation');
    const mTask = document.getElementById('star-task');
    const mAction = document.getElementById('star-action');
    const mResult = document.getElementById('star-result');
    const mArchitecture = document.getElementById('modal-architecture');

    function openModal(projectId) {
        const data = CASE_STUDIES_DATA[projectId];
        if (!data) return;

        // Set Content
        mBadge.textContent = data.badge;
        mTitle.textContent = data.title;
        mImpactVal.textContent = data.impact;

        // Adjust badge styles depending on type
        if (data.badge.includes('Agentic')) {
            mBadge.className = 'badge';
        } else if (data.badge.includes('Streaming') || data.badge.includes('Data')) {
            mBadge.className = 'badge badge-accent';
        } else {
            mBadge.className = 'badge';
            mBadge.style.color = 'var(--accent)';
            mBadge.style.borderColor = 'rgba(245, 158, 11, 0.25)';
            mBadge.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
        }

        // Specs List
        mSpecsList.innerHTML = '';
        data.specs.forEach(([key, val]) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key}:</strong> ${val}`;
            mSpecsList.appendChild(li);
        });

        // STAR Content
        mSituation.innerHTML = data.situation;
        mTask.innerHTML = data.task;
        mAction.innerHTML = data.action;
        mResult.innerHTML = data.result;

        // Load SVG Diagram
        mArchitecture.innerHTML = data.architectureSvg;

        // Show Modal
        modal.classList.remove('hidden');
        // Let UI render hidden state off, then transition opacity
        setTimeout(() => {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            bodyScrollLock(true);
        }, 50);
        
        // Trap focus to close button
        modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            modal.classList.add('hidden');
            bodyScrollLock(false);
        }, 300); // match CSS transition speed
    }

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
        
        // Support triggering via keyboard enter on card
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const projectId = card.getAttribute('data-project-id');
                openModal(projectId);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);

    // Close on clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function bodyScrollLock(lock) {
    if (lock) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   CONTACT FORM VALIDATION & SIMULATED SUBMISSION
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (!form) return;

    const fields = {
        name: {
            input: document.getElementById('form-name'),
            error: document.getElementById('name-error'),
            validate: val => val.trim().length > 0
        },
        email: {
            input: document.getElementById('form-email'),
            error: document.getElementById('email-error'),
            validate: val => {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return regex.test(val.trim());
            }
        },
        subject: {
            input: document.getElementById('form-subject'),
            error: document.getElementById('subject-error'),
            validate: val => val.trim().length > 0
        },
        message: {
            input: document.getElementById('form-message'),
            error: document.getElementById('message-error'),
            validate: val => val.trim().length > 0
        }
    };

    // Setup input listeners to clear errors dynamically
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        field.input.addEventListener('input', () => {
            field.input.parentElement.classList.remove('invalid');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;

        // Perform validation
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            const val = field.input.value;
            
            if (!field.validate(val)) {
                field.input.parentElement.classList.add('invalid');
                isFormValid = false;
            } else {
                field.input.parentElement.classList.remove('invalid');
            }
        });

        if (isFormValid) {
            // Simulated submission with loading spinner
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner');

            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;

            // Real AJAX submission to FormSubmit.co
            fetch('https://formsubmit.co/ajax/nmandula0511@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: fields.name.input.value,
                    email: fields.email.input.value,
                    _subject: `New Portfolio Message: ${fields.subject.input.value}`,
                    message: fields.message.input.value
                })
            })
            .then(response => response.json())
            .then(data => {
                // Save submission payload locally to simulate db storage
                const submission = {
                    name: fields.name.input.value,
                    email: fields.email.input.value,
                    subject: fields.subject.input.value,
                    message: fields.message.input.value,
                    timestamp: new Date().toISOString()
                };

                let submissionsHistory = JSON.parse(localStorage.getItem('contact-submissions') || '[]');
                submissionsHistory.push(submission);
                localStorage.setItem('contact-submissions', JSON.stringify(submissionsHistory));

                // Switch UI states
                spinner.classList.add('hidden');
                form.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                
                // Fallback success UI transitions
                const submission = {
                    name: fields.name.input.value,
                    email: fields.email.input.value,
                    subject: fields.subject.input.value,
                    message: fields.message.input.value,
                    timestamp: new Date().toISOString(),
                    status: 'local-only-offline'
                };
                let submissionsHistory = JSON.parse(localStorage.getItem('contact-submissions') || '[]');
                submissionsHistory.push(submission);
                localStorage.setItem('contact-submissions', JSON.stringify(submissionsHistory));

                spinner.classList.add('hidden');
                form.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            });
        }
    });

    const resetBtn = document.getElementById('form-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner');
            
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');
            submitBtn.disabled = false;
            
            formSuccess.classList.add('hidden');
            form.classList.remove('hidden');
        });
    }
}

/* ==========================================================================
   SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
    // Add fade-in classes to sections and cards dynamically
    const animatedElements = document.querySelectorAll('.expertise-card, .project-card, .timeline-item, .education-card');
    
    // Set initial opacity styles via JS if observer is supported
    if ('IntersectionObserver' in window) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // animate slightly before fully in view
        });

        animatedElements.forEach(el => observer.observe(el));
    }
}
