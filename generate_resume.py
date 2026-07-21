import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf():
    pdf_path = os.path.abspath("assets/Naveen_Mandula_Resume.pdf")
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    
    # Page setup - 0.5 inch margins all around for data density
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom colors
    PRIMARY_COLOR = colors.HexColor("#1e3a8a") # Deep Navy
    TEXT_COLOR = colors.HexColor("#1f2937") # Dark grey
    MUTED_COLOR = colors.HexColor("#4b5563") # Muted grey
    
    # Custom styles
    styles.add(ParagraphStyle(
        name='ResumeName',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY_COLOR,
        alignment=1, # Center
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='ResumeContact',
        fontName='Helvetica',
        fontSize=9,
        leading=11,
        textColor=TEXT_COLOR,
        alignment=1, # Center
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='ResumeSectionHeader',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=PRIMARY_COLOR,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))
    
    styles.add(ParagraphStyle(
        name='ResumeBody',
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=TEXT_COLOR,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='ResumeBodyBold',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=TEXT_COLOR,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='ResumeBullet',
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=TEXT_COLOR,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=3
    ))
    
    styles.add(ParagraphStyle(
        name='JobTitleHeader',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=TEXT_COLOR,
        spaceBefore=6,
        spaceAfter=2,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        name='JobSubHeader',
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=11,
        textColor=MUTED_COLOR,
        spaceAfter=4,
        keepWithNext=True
    ))

    story = []
    
    # Header Section
    story.append(Paragraph("NAVEEN MANDULA", styles['ResumeName']))
    story.append(Paragraph(
        "Senior AI Architect | AIOps Engineer | AWS & Azure<br/>"
        "+1 (334) 454-0408 &nbsp;|&nbsp; "
        "<a href='mailto:nmandula0511@gmail.com'><font color='#1f2937'>nmandula0511@gmail.com</font></a> &nbsp;|&nbsp; "
        "<a href='https://www.linkedin.com/in/naveenmandula'><font color='#1f2937'>LinkedIn</font></a> &nbsp;|&nbsp; "
        "<a href='https://github.com/nmandula0511'><font color='#1f2937'>GitHub</font></a> &nbsp;|&nbsp; "
        "<a href='https://nmandula0511.github.io/portfolio/'><font color='#1f2937'>Portfolio</font></a>",
        styles['ResumeContact']
    ))
    
    # Divider
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY_COLOR, spaceAfter=8, spaceBefore=0))
    
    # 1. Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", styles['ResumeSectionHeader']))
    story.append(Paragraph(
        "Highly accomplished Senior AI Architect and AIOps Engineer with over 10 years of experience "
        "designing, building, and optimizing production-grade intelligent platforms and cloud-native "
        "backend systems across telecommunications, logistics, finance, and industrial IoT domains. "
        "Proven expert in implementing scalable agentic AI networks, multi-agent orchestration frameworks, "
        "and robust event-driven streaming data pipelines. Demonstrated ability to bridge the gap between "
        "legacy Python/Linux environments and cutting-edge, high-availability AWS architectures while "
        "establishing rigorous cloud governance, performance optimization, and concrete cost reductions.",
        styles['ResumeBody']
    ))
    
    # 2. Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", styles['ResumeSectionHeader']))
    skills = [
        ("AI Architecture & Agentic Systems: ", "Strands Framework (AWS-Native Agent Orchestration), Agent-to-Agent (A2A) Communication Protocols, Model Context Protocol (MCP) Gateways, Multi-Agent Systems, LangGraph, LangChain, Tool Calling, Planning/ReAct Agents, Memory Systems, AI Governance & Guardrails"),
        ("Generative AI & LLMs: ", "Amazon Bedrock Architecture, Amazon Nova PRO, GPT-4, Claude (Anthropic), Native S3 RAG Pipelines, Prompt Engineering, Hallucination Mitigation, Model Drift, RAGAS / DeepEval"),
        ("Cloud & Infrastructure: ", "AWS (Bedrock, SageMaker, Glue Jobs/ETL, Athena, Fargate, Lambda, EKS, S3 & S3 Tables, Step Functions, SNS/SQS, IAM), GCP (Vertex AI, BigQuery, Dataflow), Azure AI"),
        ("Databases & Data Streaming: ", "Apache Kafka (Real-Time Ingestion/Streaming), Amazon DynamoDB, Amazon Aurora (PostgreSQL Engine exclusively), Amazon Neptune (Graph DB/Digital Twin Modeling)"),
        ("DevOps & MLOps: ", "Terraform (Infrastructure as Code), CI/CD (GitHub Actions, GitLab Pipelines), Docker, Kubernetes (EKS/AKS), MLflow, OpenTelemetry, Prometheus, Grafana, CloudWatch"),
        ("Programming Languages: ", "Python (Expert), Python FastAPI, SQL, Scala, R, Go, Bash, YAML, JSON")
    ]
    for category, detail in skills:
        p_text = f"<b>{category}</b>{detail}"
        story.append(Paragraph(p_text, styles['ResumeBody']))
        
    # 3. Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", styles['ResumeSectionHeader']))
    
    # Job 1: Charter
    story.append(Paragraph("Charter Communications (Spectrum) &nbsp;|&nbsp; Greenwood Village, CO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Feb 2026 – Present", styles['JobTitleHeader']))
    story.append(Paragraph("Senior AWS Backend & AIOps Engineer", styles['JobSubHeader']))
    
    charter_bullets = [
        "<b>Core Platform Architecture:</b> Architecting and delivering core AWS backend capabilities and scalable agentic AI models for the internal AIOps Platform, serving network operations groups to automate root cause analysis (RCA) and accelerate network incident remediation.",
        "<b>AWS Data Pipeline Engineering:</b> Engineered and optimized production AWS Glue ETL jobs to consume, clean, and pre-process high-volume telemetry data from Amazon S3, routing structured data directly into high-performance DynamoDB and Amazon Aurora data tiers.",
        "<b>Agentic AI Refactoring:</b> Re-architected a legacy 'vanilla Python' sub-agent codebase into a modular, production-grade Strands multi-agent layout running native Amazon Bedrock orchestration powered by the Amazon Nova PRO large language model.",
        "<b>Agent-to-Agent (A2A) Protocols:</b> Designed and deployed an asynchronous Agent-to-Agent (A2A) communication framework enabling the primary master orchestrator agent ('Paul') to dynamically discover and query domain-specific sub-agents via strict agent_card.json capability blueprints.",
        "<b>Model Context Protocol (MCP) Integration:</b> Replaced rigid sequential utility functions with a multi-threaded, parallelized Model Context Protocol (MCP) Gateway execution model, transforming business logic into reusable, discoverable tool-calling structures to reduce UI dashboard response latency.",
        "<b>Production Code Standards:</b> Upgraded system quality and statefulness across long-running, parallel user context boundaries by applying software engineering Factory Design Patterns and strict data validation contracts utilizing Pydantic models.",
        "<b>API & Core Optimization:</b> Streamlined backend performance by deprecating middle-tier Lambda wrappers and API Gateways, exposing REST invocation endpoints directly from the Agent Core layer to minimize request overhead and latency.",
        "<b>Invincible Wi-Fi Real-Time Analytics:</b> Maintained live, event-driven Apache Kafka data streaming pipelines capturing state triggers for 140k+ backup systems; implemented complex time-series correlation logic to flag anomalous loops where customer devices failed to roll back from 5G cellular backup to primary fiber paths after 90+ minutes.",
        "<b>Cross-Domain Correlation Engine:</b> Built data mechanics pairing cable modem status flags with backup unit telemetry, delivering instant visual root cause analysis (RCA) insights to engineers and preventing costly physical truck rolls.",
        "<b>Infrastructure as Code:</b> Controlled, provisioned, and scaled all platform infrastructure across DEVO testing spaces using Terraform scripts integrated with automated CI/CD pipelines."
    ]
    for bullet in charter_bullets:
        story.append(Paragraph(f"&bull; {bullet}", styles['ResumeBullet']))
        
    story.append(Spacer(1, 4))
    
    # Job 2: UPS
    story.append(Paragraph("UPS (United Parcel Service) &nbsp;|&nbsp; Atlanta, GA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Feb 2022 – Feb 2026", styles['JobTitleHeader']))
    story.append(Paragraph("AI Engineer", styles['JobSubHeader']))
    
    ups_bullets = [
        "Architected enterprise-scale Agentic AI platform with LangGraph-based multi-agent orchestration enabling intelligent automation across logistics, operations, and customer service workflows.",
        "Led end-to-end transition of AI solutions from PoC to production, standardizing reusable architectures for agentic workflows and RAG pipelines across multiple business units.",
        "Designed multi-agent orchestration frameworks with planner-executor patterns, dynamic tool routing, and stateful execution supporting complex enterprise decision-making.",
        "Built scalable multi-tenant AI platform on AWS Bedrock & SageMaker with secure onboarding, governance controls, and IAM-based access management.",
        "Developed advanced RAG pipelines integrating document ingestion, semantic chunking, embedding generation, and hybrid vector search (FAISS + Pinecone + BM25) to minimize hallucinations.",
        "Established AI governance frameworks including prompt validation, guardrails, audit logging, and compliance mechanisms ensuring responsible AI usage.",
        "Implemented LLM token optimization and cost governance strategies (context window optimization, caching) reducing inference costs while maintaining performance.",
        "Developed LLM observability solutions using OpenTelemetry and CloudWatch tracking latency, token usage, and throughput across distributed AI services.",
        "Built event-driven AI architectures using AWS SNS/SQS for asynchronous communication between agents, APIs, and backend services."
    ]
    for bullet in ups_bullets:
        story.append(Paragraph(f"&bull; {bullet}", styles['ResumeBullet']))
        
    story.append(Spacer(1, 4))
    
    # Job 3: Visa
    story.append(Paragraph("Visa Inc. &nbsp;|&nbsp; Foster City, CA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; May 2019 – Jan 2022", styles['JobTitleHeader']))
    story.append(Paragraph("Senior Data Scientist", styles['JobSubHeader']))
    
    visa_bullets = [
        "Engineered real-time fraud detection platform using deep learning (neural networks) and ensemble methods (XGBoost, LightGBM/TensorFlow), achieving 88% detection accuracy and reducing false positives by 14% across billions of global payment transactions.",
        "Developed transaction authorization optimization models using ML and risk scoring algorithms, improving approval rates by 7% while maintaining robust fraud controls.",
        "Architected payment network analytics platform on GCP (BigQuery, Vertex AI, Dataflow) with distributed pipelines, reducing analytics processing time by 55%.",
        "Designed MLOps infrastructure using MLflow, Kubernetes, and Azure ML, monitoring 18+ production models across fraud detection, authorization, and risk management.",
        "Applied explainable AI techniques (SHAP/LIME) for transparency in risk and fraud models; developed PCI-compliant ML pipelines with data encryption and IAM governance."
    ]
    for bullet in visa_bullets:
        story.append(Paragraph(f"&bull; {bullet}", styles['ResumeBullet']))
        
    story.append(Spacer(1, 4))
    
    # Job 4: GE
    story.append(Paragraph("General Electric (GE) &nbsp;|&nbsp; Boston, MA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Jul 2016 – Apr 2019", styles['JobTitleHeader']))
    story.append(Paragraph("Machine Learning Engineer", styles['JobSubHeader']))
    
    ge_bullets = [
        "Built predictive maintenance platform for industrial equipment using ML (Random Forests, XGBoost) and IoT sensor analytics, predicting failures with 79% accuracy and reducing unplanned downtime by 11% across aviation, power, and renewable energy divisions.",
        "Developed energy production optimization models power plants using ML and physics-based simulations, improving plant efficiency by 6%.",
        "Architected supply chain demand forecasting models using ensemble methods and time-series analysis (LSTM, ARIMA), reducing stockouts by 14% across global markets.",
        "Architected AWS data infrastructure (EC2, Redshift, S3) for industrial IoT analytics processing sensor data from thousands of connected assets using distributed PySpark pipelines.",
        "Designed LLM-assisted diagnostic workflows for engineering report generation, anomaly summarization, and insights delivery.",
        "Automated infrastructure provisioning using Terraform and AWS IaC patterns under secure VPC isolation."
    ]
    for bullet in ge_bullets:
        story.append(Paragraph(f"&bull; {bullet}", styles['ResumeBullet']))
        
    story.append(Spacer(1, 4))
    
    # Job 5: Abbott
    story.append(Paragraph("Abbott Laboratories &nbsp;|&nbsp; Abbott Park, IL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aug 2013 – Jun 2016", styles['JobTitleHeader']))
    story.append(Paragraph("Data Scientist", styles['JobSubHeader']))
    
    abbott_bullets = [
        "Developed medical device quality prediction models using ML (Random Forests, XGBoost) on manufacturing data, reducing defect rates by 9% and improving product quality across diagnostics and medical devices.",
        "Built demand forecasting models for pharmaceuticals and medical devices using ARIMA and regression techniques, achieving 86% accuracy to optimize production planning and inventory management.",
        "Engineered clinical trial analytics using statistical modeling and survival analysis on patient data from cardiovascular and diabetes studies, accelerating regulatory submissions.",
        "Architected supply chain optimization models using linear programming and simulation, reducing disruptions by 8% across pharmaceutical and device manufacturing."
    ]
    for bullet in abbott_bullets:
        story.append(Paragraph(f"&bull; {bullet}", styles['ResumeBullet']))
        
    story.append(Spacer(1, 4))
    
    # 4. Education
    story.append(Paragraph("EDUCATION", styles['ResumeSectionHeader']))
    story.append(Paragraph("<b>Master of Science in Computer Science</b> &mdash; Auburn University (2012 &ndash; 2013)", styles['ResumeBody']))
    story.append(Paragraph("<b>Bachelor of Technology (B.Tech), Computer Science & Engineering</b> &mdash; Jawaharlal Nehru Technological University (JNTU) &nbsp;|&nbsp; Hyderabad, India", styles['ResumeBody']))
    
    doc.build(story)
    print("PDF generated successfully.")

if __name__ == "__main__":
    generate_pdf()
