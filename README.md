# Hiver AI Intern Assignment - Evaluation Report
Submitted by: **Ankit Sharma**

**Date:** 23 November 2025

**Tech Stack:** Node.js, Express, React, Google Gemini API (gemini-2.0-flash)

## How to Run the Project

### 1. Backend Setup:

        cd backend
        npm install
        # Ensure .env contains: GOOGLE_API_KEY=your_key_here
        node server.js


### 2. Frontend Setup:

* Open the React App (bundled in the submission) or run via `npm start` if separated.

### 3. Verification:

* The frontend will show a **Green Indicator** ("Backend Connected") if the server is running.

* Select a customer from the dropdown to test isolation.

## Part A: Email Tagging Mini-System

### 1. Approach & Architecture

To solve the problem of Customer Isolation (preventing data leaks between clients), I implemented a **Dynamic Few-Shot** Prompting architecture.

* Data Storage: Emails are stored with a strict `customer_id` attribute.

* Runtime Logic: When a request arrives for CUST_A:

    1. The system queries the database only for records where `customer_id == 'CUST_A'`.

    2. It retrieves the last $N$ examples (Body + Tag) for that specific customer.

    3. It constructs a prompt injecting only those examples as "Ground Truth" history.

* Result: The LLM has zero visibility into `CUST_B`'s data, ensuring strict isolation at the prompt level.

### 2. The Model / Prompt

I used **Gemini 2.0 Flash** for its speed and context window.

**System Prompt Structure:**

        You are an email classifier for Customer {customer_id}.
        Classify the new email based STRICTLY on the following historical examples.

        HISTORY (Ground Truth):
        - "{example_body_1}" -> {tag_1}
        - "{example_body_2}" -> {tag_2}

        NEW EMAIL: "{input_body}"

        Output JSON: { "tag": "string", "confidence": 0.0, "reason": "string" }


### 3. Error Analysis

* **Ambiguity:** If a customer uses vague language (e.g., "It's not working") without context, the model struggles.

* **Cold Start:** For a brand new customer with 0 history, the model defaults to a generic fallback.

* **Guardrails:** I implemented a "Confidence Score". If confidence < 0.6, the UI flags it, allowing human review.

### 4. Improvement Ideas for Production

1. **Fine-Tuned Adapters (LoRA):** Instead of prompt engineering, train lightweight Low-Rank Adapters for large customers. This reduces token costs and latency while maintaining isolation.

2. **Hierarchical Taxonomy:** Implement a multi-step classification: First identify Category (e.g., Bug) -> then Sub-Category (e.g., UI Bug). This improves accuracy on complex queries.

3. **Human-in-the-Loop Feedback:** When an agent corrects a tag in the UI, that correction should immediately update the "History" vector store to improve future predictions (Online Learning).

## Part B: Sentiment Analysis Prompt Evaluation

### 1. Prompt Iteration (Evaluation)

I tested multiple prompts to ensure consistent, debuggable output.

* **Prompt v1 (Failure):** "Is this email positive or negative?"

    * **Result:** Failed on nuances. "Please help me quickly" was marked as Negative (Hostile) rather than Neutral (Urgent). Output format was unstructured text.

* **Prompt v2 (Success):**

    * **Improvement:** Enforced JSON schema and added a specific instruction: "Focus on product sentiment, not user politeness."

    * **Result:** Successfully identifies "Frustrated but Polite" users.

### 2. Systematic Evaluation Report

* **What Failed:** Simple keyword detection failed on sarcasm ("Great, another error") and polite complaints ("I love the app, but it crashed").

* **What Improved:** Asking the model to output a `reasoning` field forces "Chain of Thought" processing, significantly reducing hallucinated sentiment.

* **How to Evaluate Systematically:**

    * Create a "Golden Dataset" of 50 ambiguous emails labeled by humans.

    * Run the prompt against this set daily.

    * Measure Precision (Did we catch all angry users?) and Recall (Did we avoid flagging neutral users as angry?).

### Part C: Mini-RAG (Knowledge Base)

### 1. Approach

I built a standard RAG (Retrieval Augmented Generation) pipeline:

1. **Indexing:** `KB_ARTICLES` are embedded using text-embedding-004 on server startup.

2. **Retrieval:** Incoming queries are embedded and compared using Cosine Similarity.

3. **Generation:** The top 2 most relevant chunks are injected into the context window for the final answer.

### 2. Failure Case & Debugging

* **Failure:** Query: "Error 503"

* **Result:** The system returned generic "Troubleshooting" articles because "Error 503" wasn't explicitly mentioned in the vector space of the general text.

* **Debug Step:** I inspected the `retrieved_docs` JSON response.

* **Fix:** We need **Hybrid Search**. Vectors are bad at exact keyword matches (like error codes). We should combine Vector Rank with BM25 (Keyword Match) Rank.

### 3. Top 5 Improvements for Retrieval

1. **Hybrid Search:** Combine Semantic Search (Vectors) + Keyword Search (BM25) to catch exact error codes or product names.

2. **Re-Ranking:** Fetch top 20 documents quickly, then use a heavier "Cross-Encoder" model (like Cohere Rerank) to strictly order the top 3 for the LLM.

3. **Metadata Filtering:** If the user is on the "Billing" page, filter the vector search to category: billing before searching to remove noise.

4. **Query Expansion:** If a user asks "automations broken", use an LLM to expand the query to "workflows not triggering, rules failing" before searching to catch synonyms.

5. **Recency Weighting:** Boost the score of KB articles updated in the last 30 days to prevent serving outdated documentation.