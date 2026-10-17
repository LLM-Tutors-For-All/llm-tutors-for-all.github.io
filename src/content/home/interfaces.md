---
title: Four ways to reach learners
items:
  - name: Local CLI
    logo: cli.png
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
    logo: discord.png
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
    logo: slack.png
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
  - name: Grok Bot
    logo: grok.jpg
    summary: >-
      A hosted Data 8 tutor. Add the shared template to a Grok Bot account. On
      first use it sets up the Spring 2026 course materials on its own computer,
      then gives hints and cites lectures and the textbook.
    examples:
      - How do I use tbl.where? Give me a hint and cite the lecture or textbook source you used.
    note: >-
      You do not install the tutor or upload course files. It is instructed not
      to hand over solution code.
    link:
      label: Grok Bot guide
      href: https://llm-tutors-for-all.github.io/Documentation/tutor-options/interfaces/grok-bot/
---

Local CLI, Discord and Slack share one Data 8 corpus, retrieval setup and brain.
That lets us study how the deployment changes latency, reliability, API usage,
cost and the learner’s experience. Grok Bot is hosted: add the shared template,
and it sets up the Spring 2026 course materials on its own computer.
