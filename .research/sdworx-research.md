# SD Worx: research for the hackathon challenge

Challenge: *"Turn fragmented organisational knowledge into a trusted shared resource."* (help employees find, understand and trust internal knowledge; detect conflicting or outdated info; connect people to experts)

Researched 2026-09-30. Labels:
- **[FACT]**: stated by SD Worx (press release, annual report, quarterly update) or directly observable (for example GitHub)
- **[JOB]**: taken from a job posting. It shows the stack SD Worx uses or hires for, but many postings have expired, so the stack may have changed since
- **[INFERENCE]**: our own interpretation

Key primary sources:
- Annual Report 2025, Core Report (PDF): https://country-cms.prd.sdworx.com/sites/default/files/2026-04/SDWorx_AR2025_CoreReport.pdf
- Quarterly Update Q1 2026 (PDF): https://www.sdworx.com/sites/default/files/2026-06/Report_Quarterly_Update_Q1_2026_final.pdf

---

## 1. Company overview

### Scale and financials
- **[FACT]** FY2025: revenue EUR 1.307bn (+10.7%), adjusted EBITDA EUR 271.2m (+16.5%), net result EUR 101.4m (the first year above EUR 100m). https://www.sdworx.co.uk/en-gb/press/2026-03-02-sd-worx-records-double-digit-growth-and-strengthens-european-position
- **[FACT]** About 10,000 employees in 27 countries. More than 105,000 clients (other releases say ~95,000 or "over 100,000"). Pays about 6 million employees every month. More than 1.7m mysdworx users. https://www.sdworx.com/en-en/about-sd-worx/press/2026-04-30-ai-european-scale-sd-worx-looks-back-2025-new-annual-report
- **[FACT]** Q1 2026 revenue EUR 335m (+4.3% YoY). Core markets are Belgium, Germany and the Nordics. The CFO (Sebastiaan Peeters) says the AI rollout is meant "to boost our efficiency and keep our cost base under control". (Q1 2026 PDF above)
- **[FACT]** Headquartered in Antwerp, founded 1945. Describes itself as "the leading European HR, Pay and Time partner" and "Europe's backbone of work". (Annual Report 2025)
- **[FACT]** Also runs a delivery and development centre in Mauritius (Quatre Bornes), with a "MultiCountry development unit" for multi-country payroll and partner integrations. https://careers.sdworx.com/jobs/3487815-software-developer-fullstack , https://career.io/job/fullstack-developer-quatre-bornes-sd-worx-a2c7b66c9ce5a2f6ad40f2fb43391c59
- **[FACT]** Development hubs in Katowice, Poland (data engineering, Dynamics 365 X++) and in Romania (SDWorxRomania GitHub account). https://justjoin.it/job-offer/sd-worx-senior-data-engineer-katowice-data

### Leadership (relevant to tech and AI)
- **[FACT]** CEO Kobe Verdonck. Chief Strategy Officer Michael Custers.
- **[FACT]** Gille Sebrechts (aged 32) was appointed **Chief Products & Technology Officer** in May 2026 and reports to the CEO. Career: management consultant, then Director of the Transformation Office at SD Worx (2021), then CEO of Protime, then Chief Digital Officer & EVP. His brief is to drive AI integration across HR, Pay and Time. https://www.sdworx.com/en-en/about-sd-worx/press/2026-05-11-gille-sebrechts-takes-role-chief-products-technology-officer-sd-worx

### Products and portfolio
- **[FACT]** SD Worx describes its portfolio in five layers: 1 HCM, 2 Payroll & reward, 3 Workforce Management, **4 Knowledge & Expertise**, 5 Experience layer. It says: "Around this core, SD Worx adds knowledge and experience layers ... local subject matter experts who translate complex labour and payroll requirements into reliable, everyday operations." (Annual Report 2025, p.~10)
- **[FACT]** **mysdworx**: "One platform. Your workspace for HR, Pay & Time". Web and mobile, 19 languages, about 1.7m users. (Annual Report 2025)
- **[FACT]** **SD Worx Buddy**: all-in-one HR and payroll platform for SMEs with a "payroll-first" approach. Launched in Germany. https://www.sdworx.co.uk/en-gb/press/2026-03-02-sd-worx-records-double-digit-growth-and-strengthens-european-position
- **[FACT]** **"New House"**: the internal name for a new **cloud-native, API-ready continuous (real-time) payroll engine**. It replaces monthly batch runs. First live in Germany (ITSG-certified, pilot customers from summer 2025), with Belgium next. It "will also be integrated with our multi-agentic AI layer", and "several AI prototypes and proof-of-concepts were developed within the platform" in 2025. (Annual Report 2025, Highlight 04)
- **[FACT]** **SD Worx Innova / Innovapay**: frameworks for SAP SuccessFactors / SAP payroll customers. SD Worx SAP Solutions is a separate unit (MD Ruud van Galen from April 2026). (Annual Report 2025. Q1 2026 PDF)
- **[FACT]** **Protime**: SD Worx subsidiary, Belgian market leader in time registration and scheduling. It acquired **Sheepblue** (AI workforce planning). https://www.sdworx.ie/en-ie/about-us/press/sd-worx-records-double-digit-growth-and-strengthens-european-position
- **[FACT]** **SD Worx Lön**: Swedish payroll platform (see section 2 on AI-coding modernisation).
- **[FACT]** **SD Worx Compass**: formerly huapii, a performance and talent management product. **SD Worx Insights**: payroll and workforce analytics. **SD Worx Academy**: customer training and "knowledge sharing" ecosystem. (Annual Report 2025. Q1 2026 press release https://www.sdworx.ie/en-ie/about-us/press/sd-worx-confirms-strong-strategic-momentum-q1-2026-driven-digital-innovation-and-ai)
- **[FACT]** **SD Worx Legal Watch**: an AI platform that monitors legal sources (see section 3).
- Note: we found no current public evidence of a product called "SD Worx Cockpit".

### Acquisitions (buy-and-build strategy)
- **[FACT]** F2A (Italy): closed November 2024, the largest acquisition to date, about 6,000 customers. https://sdworx.ie/en-ie/about-us/press/sd-worx-successfully-closes-acquisition-f2a
- **[FACT]** Deals from 2025 to early 2026: Socialea (France), Labour Consulting, Elco and Codeas (Italy), Paie & RH Solutions (France, 1,100 customers, EUR 9m revenue) plus a stake in **Yeap** (a cloud-native payroll platform). Earlier deals: Gavdi (SAP, Poland), TribePerk (SME, Poland), huapii, Colorful HR (Romania, 2023), Romanian Software. (Annual Report 2025. Q1 2026 PDF)
- **[FACT]** Partnership with **datascalehr** for "AI-ready HR data infrastructure", to speed up multi-country onboarding. (Q1 2026 PDF)
- **[FACT]** The Annual Report 2025 says post-merger integration means "aligning systems, processes and culture". Integrations of Socialea, Labour Consulting, Elco and Codeas start in 2026.
- **[INFERENCE]** Serial acquisitions in 27 countries leave SD Worx with many overlapping systems, languages and local "ways of doing things". That is a structural source of the fragmented knowledge the challenge describes.

### Stated strategy (2025-2026)
- **[FACT]** Three priorities: (1) scale in Europe, (2) "accelerating the transformation towards a more **digital, knowledge-driven** and customer-obsessed organisation", (3) strengthen the payroll, HR and WFM portfolio. (Annual Report 2025, p.14)
- **[FACT]** A move from batch to continuous and real-time payroll, and from reactive administration to "proactive guidance". Services such as "implementation and compliance updates that previously required consultancy support are being standardised and embedded into software". (Annual Report 2025)

---

## 2. Engineering, tech stack and open source

### No public engineering blog
- **[FACT]** We found no SD Worx engineering blog, Medium publication or tech conference talks. Public talks are business-focused, for example SAP Executive Exchange Belgium 2025 ("Future of Payroll and Time") and Zukunft Personal 2024. https://go4.events.sap.com/be-sap-executive-exchange-future-proof-payroll/en_us/home.html

### GitHub
- **[FACT]** Org **SDWorx** ("SD Worx GitHub Business", Belgium). It holds 5 public repos, all .NET forks: NonBlocking (lock-free dictionary), Moq.AutoMocker, Dapper, Dapper-FluentMap, and the Azure **API Management developer portal**. https://github.com/SDWorx
- **[FACT]** Org **SDWorxCopilot** ("SD Worx GitHub Enterprise") was created 2025-06-24 and has no public repos. https://github.com/SDWorxCopilot
  - **[INFERENCE]** This is most likely the GitHub Enterprise org used for an enterprise **GitHub Copilot** rollout. It matches the "AI-enabled coding" mentioned in the 2025 annual report.
- **[FACT]** **sdworxux** ("Center of Excellence team for UX/UI at sdworx") hosts a design system, a "webkit" web UI kit (TypeScript tutorial), Ignite UI **Angular** components, a Vue design-system tool, an MJML email builder, and "test-cursor" repos (experiments with the Cursor AI IDE). https://github.com/sdworxux
- **[FACT]** Other accounts: SDWorxChallenge (a recruitment coding assignment), SDWorxRomania, sdworxmauritius, sdworx-italy, SDWORXGLOBAL (marked "NOT IN USE").

### Tech stack from job postings [JOB]
- **Cloud: Microsoft Azure.** Backend APIs are hosted on the Azure platform, in **.NET / C#**, with CI/CD. https://careers.sdworx.com/jobs/3809803-backend-developer
- **AI apps on Azure Kubernetes Service (AKS)**: "deploying and maintaining AI-driven applications on AKS with **Azure DevOps**". Python-based AI applications, Helm, Terraform, Key Vault, **Cosmos DB, PostgreSQL**. https://careers.sdworx.com/jobs/8064721 , https://www.wearedevelopers.com/jobs/ext/7146789/developer-ai-applications
- **Data platform: Snowflake + dbt on Azure**, with serverless compute, containers, IaC, Azure DevOps and Python. Roles in Katowice and the UK. https://careers.sdworx.com/jobs/6486627-senior-data-engineer , https://justjoin.it/job-offer/sd-worx-senior-data-engineer-katowice-data , https://www.wearedevelopers.com/jobs/ext/5818944/data-engineer
- **Frontend**: Angular (plus Node.js in Mauritius full-stack roles), with an in-house design system and webkit. https://careers.sdworx.com/jobs/3487815-software-developer-fullstack , https://github.com/sdworxux
- **Microsoft Power Platform, with a dedicated squad**: "Experienced Power Platform AI Developer" roles design automation with RPA, Power Platform and Copilot AI, "with a focus on **Copilot Studio** and Power Virtual Agents". Also Power Platform Developer and Associate roles, and an M365 Engineer role in internal IT. https://careers.sdworx.com/jobs/5750615-experienced-power-platform-ai-developer , https://careers.sdworx.com/jobs/5097730-power-platform-developer , https://careers.sdworx.com/jobs/5314338-power-platform-associate-engineer
- **Microsoft Dynamics AX / 365 F&O (X++)**: the legacy X-Tend payroll product was built on Dynamics AX 2009 and has been re-implemented. Senior X++ developer roles are open in Katowice. https://careers.sdworx.com/jobs/7577478-senior-x-developer , https://www.casestudies.com/company/enavate/case-study/creating-an-efficient-payroll-system-with-microsoft-dynamics-365
- **SAP**: SuccessFactors, SAP Payroll / ECP. https://careers.sdworx.com/jobs/3643223-sap-payroll-ecp-lead-consultant
- Several careers.sdworx.com postings now return HTTP 410 (expired). We could only confirm their details from search-engine snippets.

### Engineering problems they have publicly described [FACT]
- **Legacy payroll modernisation with AI coding agents.** For SD Worx Lön (Sweden), "frontend updates that once required large, multi-year transformation efforts are now delivered incrementally ... 90% of the development work is now automated" by AI coding agents, and manual UAT is still required. (Q1 2026 PDF) https://www.sdworx.com/en-en/sd-worx-quarterly-updates-q1-2026/innovation-and-tech
- **Batch to continuous payroll**: the "New House" cloud-native engine (see above).
- **Multi-country legislation**: rules differ by country and region, collective labour agreements (Belgian "joint committees") add another layer, and changes arrive "last-minute or without advance warning". This led to Legal Watch.
- **Integrating acquisitions**: aligning systems, processes and culture after M&A.
- **Multi-country onboarding and data quality**: this led to the datascalehr partnership.

---

## 3. AI and GenAI initiatives

### 3.1 Knowledge at scale (closest to our challenge) [FACT]
From the Annual Report 2025 (p.16), section **"From expertise in people's heads to digital knowledge at scale"**:
> "We are a knowledge-driven company ... HR and payroll are domains where expertise is critical, and much of this expertise traditionally sits with specialists. In 2025, we further advanced our ambition to digitise and scale this knowledge. This includes the development of **knowledge hubs** and the build-out of generative AI capabilities, such as enabling employees and customers to access **legislation databases or software documentation through conversational interfaces**, making **validated expertise** more accessible. The long-term goal is not simply automation, but also **consistency and scalability**: ensuring that knowledge is available across the organisation, **regardless of geography** ..."

Source: https://country-cms.prd.sdworx.com/sites/default/files/2026-04/SDWorx_AR2025_CoreReport.pdf

The CEO letter in the same report says: "these digital platforms, AI capabilities and human expertise allow us to **scale knowledge consistently across Europe**".

### 3.2 Agentic AI in payroll operations [FACT]
- A multi-agent "hybrid human-AI team". An "**agentic AI team coordinator** dynamically combines inputs from customer engagement, **knowledge**, and payroll assistants, with **humans validating and fine-tuning** customer responses. **AI governance** is crucial, clearly defining when human intervention is required and when automation can operate autonomously."
- The setup is "modular, market-scalable, and customer-specific". Each payroll professional is backed by 7 or more agents. It went live in 7 Belgian payroll teams and targets more than 500 Belgian payroll consultants by summer 2026. Expansion to the Netherlands and Finland is planned.
- The payroll professional's role changes "from information facilitator to orchestrator".
- **Build partner: Yuma** (AI transformation specialist).
- Quote from Gille Sebrechts: "we move decisively beyond experimentation and position agentic AI as a structural lever to ensure high quality and compliance".
- Sources: https://www.sdworx.com/en-en/about-sd-worx/press/2026-06-24-sd-worx-introduces-agentic-ai-payroll-enhance-customer-engagement , Q1 2026 PDF, https://www.made-in.be/antwerpen/sd-worx-zet-ai-agents-in-om-payrollteams-efficienter-te-laten-werken/
- **[FACT]** Annual Report 2025 describes this as an "agentic workforce: a second, digital workforce that complements human teams ... always within a **governed framework**".

### 3.3 SD Worx Legal Watch [FACT] (detecting changed or outdated regulation)
- AI "continuously monitors hundreds of trusted legal sources across multiple countries to **detect relevant changes** in legal documents and **assess their potential business impact**". SD Worx legal experts then "**review, validate and refine**" the output before it goes into customer communications and operational updates.
- Built "for legal experts rather than technologists": users configure sources with plain-language instructions, so legal teams onboard new countries and sources themselves.
- Content is managed centrally, auto-translated, and delivered in mysdworx, where customers can also submit queries.
- Live in Germany, Luxembourg, Spain, Sweden and the Netherlands.
- **Build partner: Faktion** (Belgian AI firm). The aim was to move from proof-of-concept to a "secure, scalable, fully-owned solution".
- Quote from Sebrechts: "significantly reduces manual work for legal teams and lowers the risk of missing critical updates."
- Source: https://www.sdworx.com/en-en/about-sd-worx/press/2026-04-28-sd-worx-simplifies-regulatory-complexity-employers-across-europe-ai
- **[FACT]** A separate "legal knowledge platform provides legal updates and information on joint industrial committees" is mentioned in the AHK debelux customer case. (Annual Report 2025)

### 3.4 Other AI [FACT]
- **SD Worx Assistant**: a conversational HR assistant for employees (payslips, absence requests, proactive suggestions). It is available through an app, voice assistants and "workplace team platforms". The first version targets employees, with line managers planned later. It was built with the agency In The Pocket. https://go.sdworx.com/en/digitalassistant/features/technology-and-platforms , https://inthepocket.com/work/sd-worx-2 (the second link now returns 404)
- The 2025 annual results list "customer service chatbots over **AI-enabled coding** and compliance tracking to automated reporting assistants". AI is also used in reporting and workforce scheduling. https://www.sdworx.ie/en-ie/about-us/press/ai-european-scale-sd-worx-looks-back-2025-new-annual-report
- Responsible-AI stance: "security- and privacy-by-design ... clear governance over the use of AI, ensuring compliance, transparency and trust". (Annual Report 2025)
- **[FACT]** Contact centre: **Talkdesk with the Microsoft Teams connector**. https://www.talkdesk.com/news-and-press/press-releases/sd-worx/
- **[INFERENCE]** We found no public Microsoft or Azure OpenAI customer story. Given the Azure-first stack, the AKS AI-app roles, the Copilot Studio squad and the GitHub Enterprise "Copilot" org, their LLM access very likely goes through **Azure OpenAI / Azure AI Foundry**, and internally through **Microsoft 365 Copilot / Copilot Studio**. None of this is confirmed.

---

## 4. Internal knowledge tooling

- **[JOB]** **SharePoint**: "The Microsoft SharePoint platform has been used for many years at SD Worx, for **internal collaboration** and for exchanging information with customers." The posting mentions multi-language front-ends (NL/FR/EN), JS and C# customisation, forms, dashboards and workflows. The (older) posting says most sites were then on **SharePoint 2013**, with a few on SharePoint Online. https://www.myjob.mu/JobDesc.aspx?ID=71581
- **[JOB]** **ServiceNow**: ServiceNow Developer, Trainer and Tester roles. The developer designs "IT Service Management solutions" (ITSM). https://careers.sdworx.com/jobs/5314252-servicenow-developer , https://careers.sdworx.com/jobs/5501212-servicenow-trainer
- **[JOB]** **Microsoft 365 / Power Platform / Copilot Studio**: an internal-IT M365 engineer role plus the Power Platform AI squad (see section 2).
- **[FACT]** **Microsoft Teams**: used with Talkdesk, and the SD Worx Assistant can be deployed into "workplace team platforms".
- **[FACT]** **SD Worx Academy**, "for knowledge sharing" (customer-facing), and "knowledge hubs" (Annual Report 2025).
- **[FACT]** The Azure DevOps and GitHub Enterprise stack implies engineering knowledge lives in Azure DevOps wikis and repos. The Azure DevOps part is confirmed by job postings. Where wikis are kept is **[INFERENCE]**.
- **[INFERENCE]** We found no public evidence of Confluence or Jira. SD Worx is a Microsoft shop, so internal knowledge is most likely spread across **SharePoint (partly legacy on-prem 2013) + Teams + OneDrive + ServiceNow KB + Azure DevOps**, plus country-specific systems from acquired companies.
- **[INFERENCE]** Content is written in several languages (NL, FR, DE, EN, IT, Nordic languages, PL, RO), and mysdworx supports 19 languages. Any internal knowledge tool has to handle cross-lingual search and deduplication.

---

## 5. Implications for our hackathon pitch

**Use their own framing.** SD Worx already says it wants to become a "**knowledge-driven**" organisation and to move knowledge "**from expertise in people's heads to digital knowledge at scale**", with "**validated expertise**", "**knowledge hubs**", "consistency ... regardless of geography". Quote these phrases back to them. The challenge wording ("trusted shared resource") matches the annual report closely.

**Admitted pain points to target:**
1. Expertise is concentrated in specialists' heads, so a tool that connects people to experts is directly relevant.
2. They operate in 27 countries, many languages and many collective labour agreements. The same question can have different answers per country, which is how conflicting information arises.
3. Legislation changes "last-minute or without advance warning". Internal docs, FAQs and runbooks go stale when the law changes, and Legal Watch covers customer-facing legal updates but not internal-document staleness. **Opportunity:** connect Legal Watch-style change events to internal knowledge and flag the pages they make outdated.
4. Serial M&A (F2A, Codeas, Socialea, Paie & RH...) brings in new systems and duplicate knowledge bases. Post-merger integration is an explicit priority.
5. Legacy estate: SharePoint 2013, Dynamics AX, older payroll engines in the middle of modernisation. Knowledge about "old" and "new" systems exists side by side, for example New House vs legacy engines.

**Design principles they value:**
- **Human-in-the-loop validation.** Every AI release stresses "humans validate", "governed framework", "clear AI governance". Build in an expert verification step, "verified by / last validated" badges, confidence scores and source citations.
- **Trust, compliance, EU data residency, privacy-by-design, EU AI Act awareness.** Payroll data is sensitive, so show permission-aware retrieval that respects SharePoint and Teams ACLs.
- **Configurable by domain experts, not engineers.** Legal Watch was designed so legal teams configure it in plain language.
- **Multi-agent / "agentic" vocabulary.** Their payroll system already has a "knowledge assistant" agent. Pitch our tool as a trusted **knowledge layer** that their existing agents (the Yuma-built payroll agents, SD Worx Assistant) can call, not as a separate chatbot.

**Stack to fit (most likely):**
- Azure (AKS, Cosmos DB / PostgreSQL, Key Vault, Azure DevOps), Python for AI services, .NET/C# backends, Angular frontends.
- Microsoft 365 as the knowledge source: SharePoint, Teams, OneDrive via **Microsoft Graph**, plus ServiceNow KB. Ideally the tool surfaces inside **Teams** or as a **Copilot Studio / M365 Copilot** extension or agent.
- Snowflake + dbt for analytics, for example a knowledge-health dashboard.
- LLM: Azure OpenAI / AI Foundry compatible, so keep the model layer pluggable.

**Terminology to use:** HR, Pay & Time; payroll consultant/professional; mysdworx; joint (industrial) committees / collective labour agreements; compliance; "backbone of work"; hybrid human-AI team; agentic workforce; knowledge hubs; validated expertise; European scale with local expertise.

**Possible demo angle:** "Legal Watch for internal knowledge". Show (a) a question answered with cited, country-scoped sources, (b) a detected conflict between the Belgian and Dutch versions of a procedure, or between an old document and a new law, (c) a page flagged as stale after a regulatory change, routed to the named expert for re-validation, and (d) an expert finder built from authorship and activity signals.
