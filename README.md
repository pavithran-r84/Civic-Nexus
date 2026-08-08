# Civic Nexus

### AI-Assisted Coordination Platform for Community Problem-Solving

**Civic Nexus is built around a simple observation: reporting a civic problem is only the beginning. The harder problem is getting the right people to work on it together.**

🔗 **https://civic-nexus-lyart.vercel.app/** ·

---

## The Problem We Chose to Solve

We started by looking at how civic problems are reported and what happens after a report is submitted.

Most platforms are good at one thing: **collecting complaints**.

But collecting a complaint doesn't mean the problem will be solved.

We wanted to understand what happens after the report is filed. That led us to a different problem:

* The same issue can be reported through multiple channels by different people, with no clear way to connect them.
* A municipality may assign a complaint internally without knowing whether an NGO, volunteer group, or resident association is already active in that area.
* A ticket can be marked **"Resolved"** without clear evidence that the work was actually completed.
* The person who reported the issue often has little visibility into what happened afterwards.

When we looked at real civic complaint systems, we found examples of large volumes of complaints moving through disconnected channels, long resolution times, and cases where citizens reported that issues marked as resolved were still present.

That changed the question we were asking.

### The problem isn't only:

> **"How do we make it easier to report a problem?"**

### It's:

> **"How do we coordinate the people who can actually solve it?"**

That became the foundation of Civic Nexus.

---

# The Decision That Shaped the Product

Once we defined the problem as **coordination**, we used one question to evaluate every major feature:

> **Does this make coordination more visible and trustworthy, or is it just another feature?**

That decision led to several choices.

### 1. Coordination is the core feature

The **Coordination Engine** isn't an extra AI screen.

It is the centre of the workflow.

Instead of simply categorizing a complaint, the system asks:

**Who should act on this, and who should work with them?**

For example:

**Primary stakeholder:** Municipality
**Supporting stakeholders:** NGO + Volunteers + RWA

The recommendation also includes a reason, rather than simply presenting a list of names.

---

### 2. "Resolved" isn't enough

A status label doesn't prove that a problem was actually fixed.

So Civic Nexus requires **before-and-after photo evidence** as part of the resolution workflow.

The goal isn't to make the interface look more sophisticated.

It's to make the final state of a complaint more trustworthy.

---

### 3. We included the community, not just institutions

We initially thought about the usual stakeholders:

* Municipality
* NGOs
* Volunteers

But there was another group that made sense in the actual coordination problem:

**Resident Welfare Associations (RWAs).**

Residents often know what is happening on their streets before an external organization does.

So we added RWAs as a first-class stakeholder instead of treating them as ordinary citizens.

---

### 4. We kept analytics intentionally simple

Analytics are useful, but they weren't the part of the problem we were trying to prove.

So instead of spending most of our development time building an elaborate dashboard, we focused that effort on the coordination workflow.

For this prototype, **proving the mechanism mattered more than polishing every surrounding feature.**

---

# How Civic Nexus Works

The complete workflow is designed around one shared issue lifecycle.

```text
Citizen reports an issue
        ↓
Photo + location + description
        ↓
AI analyzes the issue
        ↓
Category + Priority + Reasoning + Estimated Resolution Time
        ↓
Coordination Engine recommends stakeholders
        ↓
Primary: Municipality
Support: NGO / Volunteers / RWA
        ↓
Municipality reviews and accepts
        ↓
Relevant stakeholders are notified
        ↓
Everyone works from one shared timeline
        ↓
Issue is resolved with before/after evidence
        ↓
Resolution becomes visible to the original reporter
```

The important part isn't any individual screen.

**It's the shared workflow connecting all of them.**

---

# Try the Prototype

The live prototype includes five stakeholder perspectives:

* 👤 **Citizen**
* 🏛️ **Municipality**
* 🌱 **CleanCity NGO**
* 🧹 **Youth Volunteers**
* 🏘️ **Green Park RWA**

The navbar includes a **Role Switcher** that lets you move between these perspectives instantly.

This represents authentication and permissions for the prototype without pretending that production authentication has already been implemented.

For example, you can:

1. Report a civic issue as a citizen.
2. Let the AI classify it.
3. See which stakeholders the Coordination Engine recommends.
4. Switch to the Municipality perspective.
5. Accept the coordination request.
6. See supporting stakeholders join the issue.
7. Follow the shared timeline.
8. Complete the issue using before/after proof.
9. Return to the citizen perspective and see the verified resolution.

---

# What We Built — and Why We Stopped There

A prototype is not supposed to prove that everything can be built.

It should prove that the **most important part of the idea actually works**.

## Built

### End-to-end coordination workflow

The complete issue lifecycle works through a **shared backend data source**, rather than separate mock states on individual screens.

This was important because an earlier version of the project had disconnected screen-level state.

We replaced that with a shared REST API so that different stakeholder views actually reflect the same issue.

### AI-assisted issue analysis

Gemini is used for issue classification and reasoning.

We also built an **offline fallback** so that the core demo doesn't fail if the API or network becomes unavailable.

### Role-based access

Different stakeholder types see different actions and information based on their role.

### Map-based reporting

Citizens can select the location of an issue using an interactive map.

### Photo-verified resolution

Resolution requires evidence rather than simply changing a status to "Resolved."

The evidence is visible across the stakeholder workflow, including to the citizen who reported the issue.

---

# What We Deliberately Didn't Build

Some things were intentionally left out.

### Real government and NGO integrations

Connecting to real municipal systems would require institutional partnerships, access to their APIs, data agreements, and operational integration.

That is a deployment problem, not something we could meaningfully prove by adding more prototype code.

### Production authentication

The role switcher is used for the prototype to demonstrate the interaction model.

Real authentication, identity verification, permissions management, and account security would be required in a production system.

### Custom-trained AI models

We didn't train a new civic AI model just to make the project sound more advanced.

We used an existing AI API for classification and reasoning and focused our engineering effort on the part that was actually unique:

**coordination.**

---

# Tech Stack

| Layer               | Technology                    | Why We Chose It                                                                        |
| ------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| Frontend            | React + Vite                  | Fast iteration during a time-limited build                                             |
| Backend             | json-server + `db.json`       | Simple shared REST API without spending the prototype's time building a custom backend |
| AI                  | Gemini API + offline fallback | AI assistance without making the demo dependent on API availability                    |
| Maps                | Leaflet + OpenStreetMap       | Lightweight mapping without API-key or billing overhead                                |
| Frontend Deployment | Vercel                        | Fast and simple deployment                                                             |
| Backend Deployment  | Render                        | Simple deployment for the prototype API                                                |

The important technology decision wasn't choosing the most complicated stack.

It was choosing a stack that allowed us to spend our limited time on the **coordination problem**.

---

# Project Structure

```text
civic_nexus/
│
├── backend/
│   └── db.json
│
└── frontend/
    └── src/
        ├── context/
        │   └── Shared application state
        │
        ├── api/
        │   └── Backend communication
        │
        ├── modules/
        │   ├── citizen-report/
        │   ├── ai-analysis/
        │   ├── coordination-engine/
        │   ├── stakeholder-dashboard/
        │   ├── resolution-verification/
        │   └── community-analytics/
        │
        ├── components/
        │   ├── Navbar
        │   ├── RoleSwitcher
        │   └── OverviewPage
        │
        └── pages/
```

---

# Run Locally

```bash
git clone https://github.com/pavithran-r84/Civic-Nexus.git
cd Civic-Nexus
```

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:3001
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```
---

# What We Learned

The biggest lesson from building Civic Nexus wasn't a particular technology.

It was that **the visible problem isn't always the real problem.**

We started with civic issue reporting.

As we mapped the workflow, we realized that reporting was already a solved-enough problem for a prototype.

The difficult part was everything that happened after the report:

**Who should act?
Who should support them?
Who knows about the issue already?
What happens after someone claims it is resolved?
How does the citizen know that the problem was actually addressed?**

That is where Civic Nexus focuses.

---

# Where This Goes Next

The coordination mechanism we built isn't limited to waste management or Green Park.

The same question can be applied to other community problems:

> **Who should act on this, and who should work with them?**

Potential extensions include:

* Disaster response coordination
* Public health campaigns
* Smart-village initiatives
* Local environmental campaigns
* Community infrastructure maintenance
* Emergency volunteer coordination

Green Park was our **proof-of-concept environment**, not the limit of the idea.

---

# The Team

Built by: The Cryonix


---

## Final Note

Civic Nexus is a prototype.

The coordination workflow is implemented and functional.

The authentication, institutional integrations, and production infrastructure are intentionally simplified or simulated.

We would rather be clear about what works today than make the prototype sound like a production system it isn't.

**The idea we wanted to prove was simple:**

> **A civic problem shouldn't end when someone submits a report. It should end when the right people coordinate, act, and provide evidence that the problem was actually solved.**
