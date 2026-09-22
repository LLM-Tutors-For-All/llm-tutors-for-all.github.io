---
title: Three ways to reach learners
items:
  - name: Local CLI
    summary: >-
      The quickest way to try the tutor without setting up a chat platform. Ask
      one question, hold a conversation, or check which course passages a
      question retrieves.
    examples:
      - python -m tutor ask "How do I use tbl.where?"
      - python -m tutor chat
    note: Course staff can switch on staff mode to include solutions.
    link:
      label: Local CLI guide
      href: https://llm-tutors-for-all.github.io/Documentation/tutor-options/interfaces/local-cli/
  - name: Discord
    summary: >-
      Students ask by mentioning the tutor, sending it a direct message, or using
      the tutor slash command in a course server.
    examples:
      - "@Data 8 Tutor how do I use tbl.where?"
      - "/tutor question: how do I use tbl.where?"
    note: Always runs in student mode.
    link:
      label: Discord setup guide
      href: https://llm-tutors-for-all.github.io/Documentation/tutor-options/interfaces/discord/
  - name: Slack
    summary: >-
      Mentions, direct messages and the tutor slash command, connected through
      Socket Mode, so no public web server is needed.
    examples:
      - "@Data 8 Tutor how do I use tbl.where?"
      - /tutor how do I use tbl.where?
    note: Always runs in student mode.
    link:
      label: Slack setup guide
      href: https://llm-tutors-for-all.github.io/Documentation/tutor-options/interfaces/slack/
---

Each interface uses the same Data 8 corpus, retrieval and brain. That lets us
study how the deployment itself changes latency, reliability, API usage, cost
and the learner’s experience.
