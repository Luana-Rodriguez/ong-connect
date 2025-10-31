// --- DADOS DE PROJETOS (GLOBAL) ---
const projetosData = [
    {
        id: 'alimenta-bem',
        titulo: 'Projeto Alimenta Bem',
        imagem: 'imagens/charity-supermarket-svgrepo-com.svg',
        descricaoCurta: 'Distribuição de cestas básicas e oficinas de nutrição para famílias.',
        descricaoCompleta: '<p>O Projeto Alimenta Bem garante segurança alimentar e promove a educação nutricional em comunidades carentes. Nosso foco é a sustentabilidade a longo prazo.</p><h3>Metas:</h3><ul><li>Distribuir 500 cestas/mês.</li><li>Realizar 4 oficinas de nutrição/mês.</li><li>Capacitar 20 voluntários novos.</li></ul>',
        status: 'Ativo',
        necessidade: 'Urgente'
    },
    {
        id: 'casa-estudo',
        titulo: 'Projeto Casa Estudo',
        imagem: 'imagens/study-student-svgrepo-com.svg',
        descricaoCurta: 'Aulas de reforço e biblioteca comunitária para crianças e adolescentes.',
        descricaoCompleta: '<p>A Casa Estudo oferece um ambiente seguro e estimulante para o desenvolvimento educacional. Acreditamos que a educação transforma o futuro.</p><h3>Localização:</h3><p>Centro Comunitário, Bloco C.</p>',
        status: 'Em Expansão',
        necessidade: 'Voluntários'
    },
    {
        id: 'saude-praca',
        titulo: 'Projeto Saúde na Praça',
        imagem: 'imagens//health-clinic-medical-svgrepo-com.svg',
        descricaoCurta: 'Atendimentos de triagem, vacinação e orientações de saúde.',
        descricaoCompleta: '<p>Levamos saúde primária e prevenção para locais de difícil acesso. Nossos atendimentos são realizados por profissionais voluntários.</p><h3>Próximos Eventos:</h3><p>Verifique o nosso calendário de eventos para saber as datas e locais.</p>',
        status: 'Em Andamento',
        necessidade: 'Financiamento'
    }
];

// --- TEMPLATES JS (GLOBAL) ---
function createProjectDetailTemplate(projeto) {
    const statusBadge = `<span class="badge ${projeto.status === 'Ativo' ? 'badge-voluntario' : 'badge-doacao'}">${projeto.status}</span>`;
    const necessidadeBadge = `<span class="badge badge-doacao">${projeto.necessidade}</span>`;
    
    return `
        <section>
            <a href="#" class="btn" onclick="renderProjectList()">← Voltar para a lista</a>
            <h2>${projeto.titulo}</h2>
            
            <div style="display: flex; flex-wrap: wrap; gap: var(--espaco-l); margin-bottom: var(--espaco-l); align-items: flex-start;">
                <img src="${projeto.imagem}" alt="${projeto.titulo}" width="300" style="max-width: 300px; border-radius: var(--borda-radius);" />
                <div>
                    <p style="font-style: italic;">Status: ${statusBadge} Necessidade: ${necessidadeBadge}</p>
                    ${projeto.descricaoCompleta}
                    <button class="btn btn-primary" style="margin-top: var(--espaco-m);">Quero ser Voluntário neste Projeto</button>
                    <button class="btn" style="margin-top: var(--espaco-m);">Fazer Doação Específica</button>
                </div>
            </div>
            
        </section>
    `;
}

// --- FUNÇÕES DE INTERAÇÃO (GLOBAL) ---

window.showToast = function(message, type = 'success', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast alert alert-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('active');
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.classList.remove('active');
        toast.style.transform = 'translateY(-100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// --- FUNÇÕES SPA (GLOBAL) ---

const mainContent = document.querySelector('main');

window.renderProjectDetail = function(projectId) {
    const projeto = projetosData.find(p => p.id === projectId);
    
    if (projeto && mainContent) {
        mainContent.innerHTML = createProjectDetailTemplate(projeto);
        history.pushState({ id: projectId }, projeto.titulo, `?projeto=${projectId}`);
        window.scrollTo(0, 0);
    }
}

window.renderProjectList = function() {
    const originalHTML = `
        <h1>Projetos da Nossa ONG</h1>
        <p>Conheça alguns de nossos projetos e suas áreas de atuação:</p>
        <div class="grid-container">
            ${projetosData.map(p => `
                <div class="projeto-card" onclick="renderProjectDetail('${p.id}')" style="cursor: pointer;">
                    <img src="${p.imagem}" alt="${p.titulo}" />
                    <div class="card-content">
                        <h3>${p.titulo}</h3>
                        <p>${p.descricaoCurta}</p>
                    </div>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); renderProjectDetail('${p.id}')">Saiba Mais</button>
                </div>
            `).join('')}
        </div>
    `;
    if (mainContent) {
        mainContent.innerHTML = originalHTML;
        history.pushState({}, 'Projetos', 'projetos.html');
        window.scrollTo(0, 0);
    }
}

// --- EVENT LISTENERS E INICIALIZAÇÃO (DOMContentLoaded) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Hambúrguer e Dropdown
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('active');
                    }
                });
                dropdownMenu.classList.toggle('active');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    // 2. Modal Listener
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // 4. Validação de Formulário
    const form = document.getElementById('cadastroForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            
            document.querySelectorAll('.form-group input').forEach(input => {
                input.classList.remove('is-invalid', 'is-valid');
                const feedback = input.parentNode.querySelector('.feedback-invalid');
                if (feedback) feedback.remove();
            });

            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                let isValid = true;
                let errorMessage = '';

                if (input.value.trim() === '') {
                    isValid = false;
                    errorMessage = 'Este campo é obrigatório.';
                } 
                else if (input.hasAttribute('pattern')) {
                    const regex = new RegExp(input.getAttribute('pattern'));
                    if (!regex.test(input.value)) {
                        isValid = false;
                        errorMessage = 'Formato incorreto. Ex: ' + input.getAttribute('placeholder');
                    }
                }

                if (!isValid) {
                    isFormValid = false;
                    input.classList.add('is-invalid');
                    
                    const feedbackElement = document.createElement('p');
                    feedbackElement.className = 'feedback-invalid';
                    feedbackElement.textContent = errorMessage;
                    input.parentNode.appendChild(feedbackElement);
                } else {
                    input.classList.add('is-valid');
                }
            });

            if (isFormValid) {
                showToast('Cadastro realizado com sucesso!', 'success');
                form.reset();
            } else {
                showToast('Por favor, corrija os erros no formulário.', 'error');
            }
        });
    }

    // 5. Inicialização da Lista de Projetos (SPA)
    if (mainContent && document.title.includes('ONG CONNECT')) {
        const urlParams = new URLSearchParams(window.location.search);
        const initialProject = urlParams.get('projeto');
        
        // Verifica se a página atual é a de projetos pelo conteúdo (você pode ajustar isso)
        if (window.location.pathname.includes('projetos.html') || window.location.pathname === '/') { 
            if (initialProject) {
                renderProjectDetail(initialProject);
            } else {
                renderProjectList();
            }
        }
    }
});

// Adicione no seu script.js (fora do DOMContentLoaded)
window.toggleAltoContraste = function() {
    document.body.classList.toggle('modo-alto-contraste');
}