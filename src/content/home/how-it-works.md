---
title: A working tutor to test against
steps:
  - title: Course corpus
    role: Knowledge base
    body: >-
      UC Berkeley Data 8, Spring 2026: lectures, assignments, textbook
      material, worksheets and exams. Student mode leaves out solutions.
  - title: Retrieval
    role: Local search
    body: >-
      A local BM25 index ranks chunks of up to about 3,500 characters. Optional
      OpenAI embeddings add matching by meaning, not just shared words.
  - title: Brain
    role: Language model
    body: >-
      An OpenAI-compatible model, gpt-4o-mini by default, writes the answer from
      up to eight retrieved passages, the tutor’s instructions and recent chat.
  - title: Interfaces
    role: Where learners ask
    body: The same response engine answers in every interface.
    outputs:
      - Local CLI
      - Discord
      - Slack
link:
  label: How the knowledge base and brain fit together
  href: https://llm-tutors-for-all.github.io/Documentation/model-options/
---

Benchmarks need more than a model, so we built a complete tutor system to run
them on. Its course knowledge is kept separate from the model that writes
answers, so each can be swapped and compared in controlled combinations.
