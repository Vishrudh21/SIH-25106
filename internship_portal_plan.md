## Campus Internship & Placement Platform Blueprint

### 1. Problem Context & Goals
- Replace fragmented internship/placement workflows across campus with a unified, low-cost, role-aware portal.
- Minimize manual approvals, status chasing, and scattered communication for students, mentors, and placement staff.
- Provide transparency on application pipelines, interview schedules, supervisor feedback, and certificate generation.
- Keep the experience engaging for students while ensuring compliance with institutional data/privacy policies.

### 2. Stakeholder Personas
- **Students (Pre-final & Final Year)**: maintain profile, discover roles, apply, track progress, receive mentor feedback, access certificates.
- **Faculty Mentors**: approve applications, monitor advisees, share recommendations, log internship evaluations.
- **Placement Cell Officers**: publish verified opportunities, manage employer relations, monitor KPIs, broadcast communications.
- **Employers/Recruiters**: post positions (via placement cell), review shortlisted candidates, schedule interviews, provide offer updates.
- **Supervisors (Industry Mentors)**: record attendance/milestones, submit evaluations, trigger completion certificates.
- **Administrators (IT/Compliance)**: manage roles, integrations, audit logs, data-retention policies.

### 3. Requirements & Success Metrics
- **Functional**
  - Single student profile with resumes, skills, preferences, documents.
  - Role-based dashboards for postings, approvals, interview scheduling, feedback.
  - Matching engine surfacing best-fit opportunities per student.
  - Workflow automation: mentor approvals, reminders, calendar sync, certificate issuance.
  - Analytics on pipeline health, unplaced students, employer engagement.
  - Secure document storage with consent controls and audit histories.
- **Non-Functional**
  - Deployable on commodity campus hardware; open-source stack (PostgreSQL, Node/Nest, React, Redis).
  - Responsive UI, accessible design (WCAG AA), offline-friendly exports.
  - Data privacy (role-based access, encrypted storage, consent tracking).
  - Observability (structured logs, metrics) and easy maintenance (containerized).
- **KPIs**
  - ≥70% reduction in manual approval turnaround time.
  - ≥50% reduction in missed deadlines for applications/interviews.
  - ≥90% of active students maintaining updated profiles per semester.
  - Real-time dashboard adoption by placement cell (daily active use).

### 4. User Journeys
- **Student Journey**
  1. Onboarding wizard collects academic details, skills, resume.
  2. Dashboard highlights recommended roles with eligibility badges.
  3. Single-click apply triggers mentor approval; notifications show status transitions.
  4. Interview invites sync to calendar; student confirms availability.
  5. Post-internship, supervisor feedback auto-updates profile, certificate available for download/share.
- **Placement Officer Journey**
  1. Create/post opportunity with competency tags and department/stipend filters.
  2. Monitor applicant funnel, shortlist with drag-and-drop Kanban.
  3. Bulk notify employers and students; dashboards show open seats vs. filled.
  4. Export reports for administration/AICTE requirements.
- **Mentor Journey**
  1. Receive approval requests, view student profile snapshot, accept/return with comments.
  2. Track advisee pipeline; intervene on pending interviews.
  3. Evaluate internship outcomes; contribute qualitative notes.
- **Employer Journey**
  1. Receive curated shortlist link from placement cell.
  2. Review anonymized preview, request full profiles.
  3. Input selection results to update pipeline & offers.
- **Supervisor Journey**
  1. Log weekly updates (attendance/milestones).
  2. Submit final evaluation to trigger certificate + placement-readiness update.

### 5. Feature Set & Prioritization
- **Priority P0 (MVP)**
  - Authentication & role-based access.
  - Student profile builder + document upload.
  - Opportunity posting & eligibility tagging.
  - Matching & notification engine with mentor approval workflow.
  - Application tracker (student + placement views).
  - Supervisor feedback & certificate generation.
- **Priority P1**
  - Interview scheduling with calendar sync (ICS/Google Workspace).
  - Analytics dashboards (placements, offers, unfilled seats).
  - Employer portal with secure shortlist access.
  - Gamified skill badges, placement readiness score.
- **Priority P2**
  - AI/ML recommendation tuning, chatbot for FAQs.
  - Integration APIs (LMS, ERP, government portals).
  - Mobile app or PWA offline enhancements.

### 6. Matching Algorithm Outline
- **Inputs**: student skills, certifications, academic program, GPA, availability window, preferences, past internship outcomes.
- **Opportunity Metadata**: required competencies, mandatory filters (department/year), nice-to-have skills, stipend range, potential placement probability.
- **Scoring**:
  - Hard constraints filter (eligibility).
  - Weighted score = Σ(skill weight × proficiency match) + preference alignment bonus + mentor recommendation boost − schedule conflicts.
  - Diversity considerations (department quotas, gender equity) via configurable constraints.
- **Output**: ranked list per student and per opportunity; top-N used for notifications.
- **Adaptation**: feedback loop adjusts weights based on acceptance rates, interview outcomes, placement conversions.

### 7. Architecture Overview
```
graph LR
  subgraph Frontend (React/PWA)
    UI[Role-based SPA] --> AuthUI[Keycloak/Auth0 UI]
  end
  subgraph Backend (Node/NestJS)
    API[GraphQL/REST API]
    Match[Matching Service]
    Workflow[Workflow Orchestrator]
    Notif[Notification Service]
  end
  subgraph Data Layer
    PG[(PostgreSQL)]
    Redis[(Redis Cache)]
    Object[Object Storage (S3/minio)]
  end
  subgraph Integrations
    Calendar[ICS/Google]
    Email[SMTP]
    SMS[Messaging API]
  end
  UI --> API
  API --> PG
  API --> Redis
  API --> Object
  API --> Match
  API --> Workflow
  Workflow --> Notif
  Notif --> Email
  Notif --> SMS
  Workflow --> Calendar
  Admin[Observability/Grafana] --> API
```

### 8. Data Model Sketch
- **User**: id, name, email, role, department, verified_flags.
- **StudentProfile**: user_id (FK), academic_details, skills[], resume_url, preferences, badges[], readiness_score.
- **Opportunity**: id, title, description, department_ids[], required_skills[], stipend_range, conversion_probability, status, posted_by.
- **Application**: id, student_id, opportunity_id, status, mentor_id, timestamps, score_breakdown.
- **MentorFeedback**: application_id, comments, decision, timestamp.
- **Interview**: id, application_id, interviewer, schedule_slot, mode, notes.
- **SupervisorFeedback**: student_id, opportunity_id, attendance_pct, performance_score, remarks, certificate_url.
- **NotificationLog**, **AuditLog**, **Attachment**, etc.

### 9. API Contract Highlights (REST/GraphQL Hybrid)
- `POST /auth/login` – Keycloak integration.
- `GET /students/{id}` / `PATCH /students/{id}` – profile CRUD with role checks.
- `POST /opportunities` – placement officers only; payload includes competency tags.
- `GET /opportunities?studentId=...` – returns scored matches + eligibility reasons.
- `POST /applications` – student apply; triggers mentor workflow.
- `PATCH /applications/{id}/mentor-decision` – approve/return with rationale.
- `POST /applications/{id}/interviews` – schedule interview slot.
- `POST /applications/{id}/supervisor-feedback` – triggers certificate generation.
- `GET /dashboard/placement-kpis` – aggregated analytics (role restricted).
- Webhooks/Events: `application.status.updated`, `interview.scheduled`, `certificate.generated`.

### 10. UI / Wireframe Descriptions
- **Landing & Login**: role-aware entry; highlight success stories, live stats.
- **Student Dashboard**: hero card with readiness score, next tasks, recommended roles carousel, pipeline Kanban (Applied → Shortlisted → Interview → Offer).
- **Role Detail Page**: competency chips, stipend bands, conversion gauge, mentors assigned, single-click apply with eligibility explanation.
- **Mentor Console**: approval inbox, advisee timeline, ability to leave notes and nudge students.
- **Placement Command Center**: heatmap of departments, open seats, interview calendar, employer status list.
- **Supervisor Workspace**: weekly log form, milestone tracker, final evaluation wizard generating certificate preview.

### 11. Engagement & Experience Hooks
- Gamified badges for profile completeness, interview preparedness, top performer of the week.
- Personalized nudges (“3 roles match your new AI/ML badge”).
- Story widgets featuring alumni success and employer testimonials.
- Theming aligned with campus branding; subtle animations, micro-interactions for buttons/cards.

### 12. Implementation Roadmap (Sample Timeline)
| Phase | Duration | Key Activities | Deliverables |
| --- | --- | --- | --- |
| Discovery & Design | Weeks 1-2 | Workshops, requirement validation, UX research | Personas, journeys, IA, UX flows |
| Architecture & Setup | Weeks 3-4 | Repo setup, CI/CD, auth integration, DB schema, infra as code | Technical architecture docs, initial scaffolds |
| MVP Build | Weeks 5-10 | Profiles, postings, matching, applications, mentor workflow, notifications | Deployable MVP on staging |
| Pilot & Feedback | Weeks 11-12 | Limited department rollout, collect metrics, refine matching weights | Pilot report, backlog adjustments |
| Enhancements | Weeks 13-16 | Analytics dashboards, interview scheduling, supervisor portal, certificates | Production release candidate |
| Launch & Training | Weeks 17-18 | Campus-wide onboarding, playbooks, admin training | Go-live + support plan |

### 13. Development Task Buckets
- **Foundations**: infra (Docker/K8s), CI/CD, auth (Keycloak), RBAC middleware, audit logging.
- **Profile & Content**: student profile service, document storage integration, resume parser (optional).
- **Opportunity Lifecycle**: posting UI, tagging engine, verification workflow, matchmaking service.
- **Workflow & Notifications**: approval orchestration, calendar sync, email/SMS templates.
- **Analytics**: data warehouse tables, dashboards (Metabase/Grafana), exports.
- **Quality & Compliance**: automated tests, security scans, privacy consent flows, backup/DR strategy.

### 14. Open Questions / Assumptions
- Does the campus already use an SSO provider? (Assumed Keycloak or institution LDAP available.)
- Calendar integration preference (Google Workspace vs. Outlook/ICS).
- SMS gateway availability and budget.
- Data retention requirements for graduated batches.
- Desired level of automation for employer onboarding (self-serve vs. placement curated).

### 15. Next Steps
1. Validate requirements with placement cell & IT admins.
2. Conduct quick UX discovery with representative students/mentors.
3. Finalize tech stack & hosting constraints, then proceed with MVP build per roadmap.


