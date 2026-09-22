// Turns a demo reply from demo.yaml into HTML. Deliberately tiny: it knows
// paragraphs, line breaks, `inline code` and ``` code blocks. Everything is
// escaped first, so content can never inject markup.

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const inlineCode = (text: string) => text.replace(/`([^`]+)`/g, '<code>$1</code>');

export function renderAnswer(answer: string): string {
  const blocks: string[] = [];
  const parts = answer.trim().split(/^```[^\n]*$/m);

  parts.forEach((part, index) => {
    const isCode = index % 2 === 1;
    if (isCode) {
      blocks.push(`<pre><code>${escapeHtml(part.replace(/^\n|\n$/g, ''))}</code></pre>`);
      return;
    }
    for (const paragraph of part.split(/\n\s*\n/)) {
      const text = paragraph.trim();
      if (!text) continue;
      const lines = text.split('\n').map((line) => inlineCode(escapeHtml(line.trim())));
      blocks.push(`<p>${lines.join('<br>')}</p>`);
    }
  });

  return blocks.join('');
}

/** Terminal output prints exactly as typed. */
export function renderPlain(answer: string): string {
  return escapeHtml(answer.trim());
}
