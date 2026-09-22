---
# The Benchmarks page (/benchmarks/). The paragraphs below the second --- line
# are the page introduction. Chart numbers live in src/data/benchmarks.json.
title: Benchmarks

scope:
  title: What we test
  items:
    - name: Models
      body: Language models tested directly, with the same prompts and conditions.
      groups:
        - label: Proprietary models
          examples: [GPT, Claude, Gemini]
        - label: Open-weight models
          examples: [DeepSeek, Qwen, Llama, Kimi]
      note: Examples of the families we plan to cover. Each result will list the exact models tested.
    - name: Tutor systems
      body: >-
        Complete tutors, where the model is only one part. We evaluate the
        pieces around it and the responses students actually see.
      parts:
        - System prompts
        - Retrieval methods
        - Guardrails
        - Orchestration
        - Educational responses

questions:
  title: The questions
  body: >-
    A benchmark suite of questions, prompts and scenarios drawn from real
    course material and representative of how students use AI tutors.
  kinds:
    - Conceptual questions
    - Coding and debugging tasks
    - Requests for explanations or guidance

criteria:
  title: What we measure
  items:
    - title: Response quality
      body: Whether a response is correct, clear and actually useful for learning.
    - title: Inference cost
      body: What each response costs to generate, from API pricing or the compute to run it.
    - title: Latency
      body: How long a student waits for an answer.
    - title: Deployment tradeoffs
      body: What it takes to run a model or tutor where students are, and how reliably it works there.

methods:
  title: How we measure
  items:
    - title: Human evaluation
      body: People read and rate tutor responses directly.
    - title: LLM-as-a-judge
      body: A separate language model grades each response against a written rubric, so large sets can be scored consistently.
    - title: Automated benchmarks
      body: Scripted checks, such as correctness against a reference answer, that run the same way every time.
    - title: Pairwise comparison
      body: Two responses to the same question, side by side, and a judgment of which one teaches better.
    - title: Performance evaluation
      body: Measured latency, reliability and cost for every run.

results:
  title: Results
  body: >-
    This chart will compare the same tutor in each interface, with and without
    the tutor system around the model.
  chartTitle: Interfaces compared under the same conditions
  publishTitle: Every result will ship with
  publishes:
    - title: Methodology
      body: How each run was set up, and what each metric measures.
    - title: Harness configuration
      body: The exact settings, so anyone can repeat the run.
    - title: Test questions
      body: The questions every configuration was asked.
    - title: Measured data
      body: The raw results behind every chart.

deliverables:
  title: What we’ll deliver
  items:
    - title: A reproducible benchmark suite
      body: Educational prompts, criteria and a testing pipeline anyone can rerun.
    - title: Comparative results
      body: Proprietary and open-weight models and tutor configurations, compared on the same questions.
    - title: Deployment recommendations
      body: Guidance for instructors and developers choosing a model or tutor for their course.
    - title: A guide for instructors
      body: How to assess your own AI tutor against the benchmark.
    - title: Instructions for new models and tutors
      body: How to adapt the benchmark as new models and tutor systems appear.
    - title: A research report
      body: A final report and presentation on the findings and tradeoffs.

# Uncomment when the docs benchmark page has content:
# docsLink:
#   label: Benchmark details in the docs
#   href: https://llm-tutors-for-all.github.io/Documentation/benchmark/
---

We’re building a reproducible benchmark for language models and AI tutors used
in education. It focuses on evaluation, not on building another chatbot: the
goal is a reusable test suite and a set of recommendations that help
instructors and developers choose the right model for their needs.
