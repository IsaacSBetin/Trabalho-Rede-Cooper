// Este script controla todas as interatividades da página da Rede Cooper.
// Ele é carregado com 'defer' no HTML, então não é preciso esperar o DOM carregar.

// --- LÓGICA DO MENU MOBILE ---
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

mobileNavToggle.addEventListener('click', () => {
    const isVisible = navLinks.getAttribute('data-visible') === 'true';
    navLinks.setAttribute('data-visible', !isVisible);
    mobileNavToggle.setAttribute('aria-expanded', !isVisible);
});


// --- LÓGICA DO ACCORDION FAQ ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Fecha todos os outros itens para manter a interface limpa
        faqItems.forEach(i => i.classList.remove('open'));
        // Abre ou fecha o item clicado
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});


// --- LÓGICA DE SCROLL (ANIMAÇÕES, NAV ATIVA, BOTÃO VOLTAR AO TOPO) ---
const sections = document.querySelectorAll('section[data-section]');
const navLinksList = document.querySelectorAll('.nav-link');
const backToTopButton = document.querySelector('.back-to-top');

// Observador para animações de entrada e para ativar o link da navegação
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona classe de visibilidade para animação CSS
            entry.target.classList.add('visible');

            // Ativa o link correspondente na navegação
            const sectionId = entry.target.id;
            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));


// Animação dos contadores na seção "Impacto"
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Maior = mais lento
            const inc = target / speed;
            let count = 0;

            const updateCount = () => {
                if (count < target) {
                    count += inc;
                    counter.innerText = Math.ceil(count).toLocaleString('pt-BR');
                    setTimeout(updateCount, 10); // Intervalo da atualização
                } else {
                    counter.innerText = target.toLocaleString('pt-BR');
                }
            };

            updateCount();
            observer.unobserve(counter); // Roda a animação apenas uma vez
        }
    });
}, { threshold: 0.8 });

document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));


// Lógica do botão "Voltar ao Topo"
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});


// --- LÓGICA DO FORMULÁRIO DE CONTATO ---
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Simulação de um envio para o servidor
    setTimeout(() => {
        formMessage.innerHTML = '<p class="success-message">Obrigado! Recebemos sua mensagem e entraremos em contato em breve.</p>';
        formMessage.style.display = 'block';
        contactForm.reset(); // Limpa o formulário
        submitButton.disabled = false;
        submitButton.textContent = 'Quero Mudar o Futuro';

        // Esconde a mensagem de sucesso após alguns segundos
        setTimeout(() => {
             formMessage.style.display = 'none';
        }, 6000);

    }, 1500);
});