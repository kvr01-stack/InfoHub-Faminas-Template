/**
 * Aplicação Principal - Página Setorial FAMINAS
 * Extensão Universitária • Engenharia de Software • ADS
 */

import { initModalController } from './modal-controller.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o gerenciador de modais institucionais (Sobre, Termos, Privacidade)
  initModalController();

  console.log('[InfoHub Setorial] Template institucional inicializado com sucesso.');

  /* ==========================================================================
     ESPAÇO PARA LÓGICA ESPECÍFICA DOS ESTUDANTES (OPCIONAL):
     Exemplos de funcionalidades que vocês podem adicionar:
     - Copiar telefone/e-mail para a área de transferência ao clicar em um botão
     - Filtragem de dúvidas frequentes ou cálculo de prazos
     - Alternância de visualizações ou accordions interativos
     ========================================================================== */
});

/* ==========================================================================
   REVISTA CIENTÍFICA — LÓGICA DO GRUPO 3
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Links oficiais da revista. Todos preenchidos.
  const BASE = 'https://periodicos.faminas.edu.br/index.php/RCFaminas';
  const LINKS = {
    ojs: BASE,                                  // página inicial da revista
    cadastro: `${BASE}/user/register`,
    acesso: `${BASE}/login`,
    normas: `${BASE}/about/submissions`,        // Condições e Normas Técnico-Editoriais
    template: `${BASE}/libraryFiles/downloadPublic/23`,
    autores: `${BASE}/libraryFiles/downloadPublic/24`,
    conflito: `${BASE}/libraryFiles/downloadPublic/25`,
    ia: `${BASE}/libraryFiles/downloadPublic/30`,
    contatoRevista: `${BASE}/about/contact`,
    whatsapp: 'https://wa.me/553237297500', // WhatsApp da CAA, (32) 3729-7500
    portal: 'https://portal.faminas.edu.br/FrameHTML/web/app/edu/PortalEducacional/login/', // Portal do Aluno
  };

  document.querySelectorAll('[data-link]').forEach((a) => {
    const url = LINKS[a.dataset.link];
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else {
      a.classList.add('is-pending');
      a.setAttribute('aria-disabled', 'true');
      a.addEventListener('click', (e) => e.preventDefault());
    }
  });

  document.querySelectorAll('.link-pending').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));

  // Checklists com barra de progresso (geral) e contagem por grupo
  const boxes = [...document.querySelectorAll('.check-item input')];
  const bar = document.getElementById('check-bar');
  const msg = document.getElementById('check-msg');
  const track = bar.parentElement;
  track.setAttribute('aria-valuemax', boxes.length);
  const updateProgress = () => {
    const done = boxes.filter((b) => b.checked).length;
    const pct = Math.round((done / boxes.length) * 100);
    bar.style.width = `${pct}%`;
    track.setAttribute('aria-valuenow', done);
    msg.textContent = done === boxes.length
      ? 'Tudo conferido! Seu artigo está pronto para ser enviado.'
      : `${done} de ${boxes.length} itens conferidos (${pct}%)`;
    document.querySelectorAll('.check-group').forEach((g) => {
      const inputs = [...g.querySelectorAll('input')];
      g.querySelector('.group-count').textContent = `${inputs.filter((i) => i.checked).length}/${inputs.length}`;
    });
  };
  boxes.forEach((b) => b.addEventListener('change', updateProgress));
  updateProgress();

  // Busca nas dúvidas frequentes (ignora acentos e maiúsculas)
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const items = [...document.querySelectorAll('.faq-item')];
  const empty = document.getElementById('faq-empty');
  document.getElementById('faq-search')?.addEventListener('input', (e) => {
    const q = norm(e.target.value.trim());
    let shown = 0;
    items.forEach((it) => {
      const match = norm(it.textContent).includes(q);
      it.hidden = !match;
      if (match) shown++;
    });
    empty.hidden = shown > 0;
  });
});