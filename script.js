const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const year = document.querySelector('#year');

function closeNavigation() {
  nav?.classList.remove('open');
  document.body.classList.remove('nav-open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Open navigation');
}

themeToggle?.addEventListener('click', () => {
  const dark = root.dataset.theme === 'dark';
  if (dark) {
    delete root.dataset.theme;
    localStorage.setItem('theme', 'light');
  } else {
    root.dataset.theme = 'dark';
    localStorage.setItem('theme', 'dark');
  }
});

navToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');
  document.body.classList.toggle('nav-open', Boolean(open));
  navToggle.setAttribute('aria-expanded', String(Boolean(open)));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNavigation();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) closeNavigation();
});

if (year) year.textContent = new Date().getFullYear();
