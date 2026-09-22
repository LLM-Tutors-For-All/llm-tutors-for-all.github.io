// Fades each [data-reveal] block in the first time it scrolls into view.
// The layout script only adds `motion-ok` when motion is allowed, so without
// it (reduced motion, no JavaScript) everything is simply visible.
const root = document.documentElement;

if (root.classList.contains('motion-ok')) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );

  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}
