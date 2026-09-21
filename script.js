const header = document.querySelector('#header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30), { passive: true });

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const featuredReelUrl = 'https://www.instagram.com/reel/Ddhx7JYgLXB/?stkn=ZW0yNDZxa3Vqajc4';
const featuredReelEmbedUrl = 'https://www.instagram.com/reel/Ddhx7JYgLXB/embed';

const loadReel = document.querySelector('#load-reel');
const reelFrame = document.querySelector('#reel-frame');
const reelPlaceholder = document.querySelector('#reel-placeholder');

loadReel?.addEventListener('click', () => {
  if (!reelFrame.querySelector('iframe')) {
    const iframe = document.createElement('iframe');
    iframe.src = featuredReelEmbedUrl;
    iframe.title = 'Apresentação de Mateus Viana no Instagram';
    iframe.allowFullscreen = true;
    iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation allow-popups');
    iframe.dataset.source = featuredReelUrl;
    reelFrame.appendChild(iframe);
  }

  reelPlaceholder.hidden = true;
  reelFrame.hidden = false;
  loadReel.textContent = 'Vídeo carregado';
  loadReel.disabled = true;
});

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const date = data.get('data')
    ? new Date(`${data.get('data')}T12:00:00`).toLocaleDateString('pt-BR')
    : 'A definir';
  const message = `Olá! Gostaria de solicitar um orçamento para uma apresentação de Mateus Viana.\n\nNome: ${data.get('nome')}\nTipo de evento: ${data.get('evento')}\nCidade: ${data.get('cidade')}\nData: ${date}\nPúblico estimado: ${data.get('publico') || 'A definir'}\nInformações adicionais: ${data.get('mensagem') || 'Não informado'}`;
  window.open(`https://wa.me/5511963457626?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
