(function () {
    'use strict';

    const escapeHtml = (value) =>
        String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');

    const icon = (name) => {
        const paths = {
            accessibility: '<circle cx="12" cy="4.5" r="1.7"/><path d="M5 8h14M12 8v5m0 0-4 7m4-7 4 7"/>',
            arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
            code: '<path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12"/>',
            design: '<path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 0-5H12a2 2 0 0 1 0-4h2a7 7 0 0 0-2-9Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="9.5" cy="6.5" r="1"/><circle cx="14" cy="6.5" r="1"/>',
            layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
            menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
            performance: '<path d="M4 13a8 8 0 1 1 16 0"/><path d="m12 13 4-4"/><path d="M6 17h12"/>',
            search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
            server: '<rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01M8 17h.01"/>',
            x: '<path d="m6 6 12 12M18 6 6 18"/>'
        };

        return `<svg aria-hidden="true" class="mp-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.code}</svg>`;
    };

    const serviceData = [
        {icon: 'layers', title: 'Liferay Experience', text: 'Content Pages, Fragments, Client Extensions and scalable authoring patterns.'},
        {icon: 'design', title: 'Design Systems', text: 'Reusable tokens and components that stay consistent across channels.'},
        {icon: 'server', title: 'Headless Integration', text: 'REST, GraphQL and secure integrations between portal and business services.'},
        {icon: 'code', title: 'Frontend Architecture', text: 'Maintainable micro-frontends, web components and progressive enhancement.'},
        {icon: 'performance', title: 'Performance', text: 'Core Web Vitals, caching, bundle control and rendering optimization.'},
        {icon: 'search', title: 'Search Experience', text: 'Search blueprints, relevance tuning and custom indexed fields.'}
    ];

    const projects = [
        {category: 'liferay', label: 'Liferay', title: 'Modern Liferay Portfolio', text: 'Custom Element Client Extension with responsive, editable content patterns.'},
        {category: 'game', label: 'Game', title: 'Tony Football', text: 'Browser football game with modular engine, replay and match presentation.'},
        {category: 'aem', label: 'AEM', title: 'Secure Video Pipeline', text: 'AEM to GCP transcoding and Akamai delivery architecture for protected media.'},
        {category: 'frontend', label: 'Frontend', title: 'Tony Landing', text: 'Story-driven landing page with rich motion and responsive interactions.'},
        {category: 'liferay', label: 'Liferay', title: 'Search Blueprint Lab', text: 'Exact-match filtering and custom field search behavior for user profiles.'},
        {category: 'architecture', label: 'Architecture', title: 'Component Platform', text: 'Shared component boundaries, design tokens and delivery conventions.'}
    ];

    class ModernPortfolio extends HTMLElement {
        constructor() {
            super();
            this.handleDocumentClick = this.handleDocumentClick.bind(this);
        }

        connectedCallback() {
            if (this.dataset.mounted === 'true') {
                return;
            }

            this.dataset.mounted = 'true';
            this.render();
            this.bindEvents();
        }

        disconnectedCallback() {
            document.removeEventListener('click', this.handleDocumentClick);
        }

        get config() {
            return {
                contactEmail: this.getAttribute('contact-email') || '',
                displayName: this.getAttribute('display-name') || 'Hưng',
                headline: this.getAttribute('headline') || 'Liferay & AEM Developer',
                location: this.getAttribute('location') || 'Ho Chi Minh City, Vietnam'
            };
        }

        render() {
            const config = this.config;
            const serviceCards = serviceData.map((service) => `
                <article class="mp-service-card">
                    <span class="mp-service-card__icon">${icon(service.icon)}</span>
                    <h3>${escapeHtml(service.title)}</h3>
                    <p>${escapeHtml(service.text)}</p>
                </article>
            `).join('');

            const projectCards = projects.map((project, index) => `
                <article class="mp-project-card" data-category="${escapeHtml(project.category)}">
                    <div class="mp-project-card__visual mp-project-card__visual--${(index % 4) + 1}">
                        <span class="mp-project-card__eyebrow">${escapeHtml(project.label)}</span>
                        <span class="mp-project-card__screen" aria-hidden="true"></span>
                    </div>
                    <div class="mp-project-card__body">
                        <h3>${escapeHtml(project.title)}</h3>
                        <p>${escapeHtml(project.text)}</p>
                        <button class="mp-text-button" type="button" data-project-title="${escapeHtml(project.title)}">
                            View case study ${icon('arrow')}
                        </button>
                    </div>
                </article>
            `).join('');

            this.innerHTML = `
                <div class="mp-shell">
                    <header class="mp-header" id="top">
                        <a class="mp-brand" href="#home" aria-label="Go to home">H<span>.</span></a>
                        <nav class="mp-nav" aria-label="Primary navigation">
                            <a href="#home">Home</a>
                            <a href="#services">Services</a>
                            <a href="#about">About</a>
                            <a href="#portfolio">Portfolio</a>
                            <a href="#contact">Contact</a>
                        </nav>
                        <a class="mp-button mp-button--small" href="#contact">Hire me</a>
                        <button class="mp-menu-button" type="button" aria-expanded="false" aria-controls="mp-mobile-nav" aria-label="Open navigation">
                            <span class="mp-menu-button__open">${icon('menu')}</span>
                            <span class="mp-menu-button__close">${icon('x')}</span>
                        </button>
                        <nav class="mp-mobile-nav" id="mp-mobile-nav" aria-label="Mobile navigation">
                            <a href="#home">Home</a>
                            <a href="#services">Services</a>
                            <a href="#about">About</a>
                            <a href="#portfolio">Portfolio</a>
                            <a href="#contact">Contact</a>
                        </nav>
                    </header>

                    <main>
                        <section class="mp-hero mp-section" id="home">
                            <div class="mp-hero__copy">
                                <p class="mp-kicker">Hi, I am ${escapeHtml(config.displayName)}</p>
                                <h1>Building modern digital experiences for <span>enterprise platforms.</span></h1>
                                <p class="mp-hero__role">${escapeHtml(config.headline)}</p>
                                <p class="mp-hero__intro">I turn complex portal requirements into fast, accessible and maintainable user experiences.</p>
                                <div class="mp-hero__actions">
                                    <a class="mp-button" href="#contact">Work with me</a>
                                    <a class="mp-button mp-button--ghost" href="#portfolio">Explore work</a>
                                </div>
                                <dl class="mp-metrics">
                                    <div><dt>8+</dt><dd>Years experience</dd></div>
                                    <div><dt>30+</dt><dd>Features delivered</dd></div>
                                    <div><dt>6</dt><dd>Core specialties</dd></div>
                                </dl>
                            </div>
                            <div class="mp-hero__visual" aria-label="Abstract portrait placeholder">
                                <div class="mp-orbit mp-orbit--one"></div>
                                <div class="mp-orbit mp-orbit--two"></div>
                                <div class="mp-portrait">
                                    <span class="mp-portrait__head"></span>
                                    <span class="mp-portrait__body"></span>
                                    <span class="mp-portrait__highlight"></span>
                                </div>
                                <span class="mp-floating-label mp-floating-label--one">Liferay</span>
                                <span class="mp-floating-label mp-floating-label--two">AEM</span>
                            </div>
                        </section>

                        <section class="mp-section" id="services">
                            <div class="mp-section-heading">
                                <div><p class="mp-kicker">What I do</p><h2>Services</h2></div>
                                <p>Composable solutions designed for real content teams, developers and end users.</p>
                            </div>
                            <div class="mp-service-grid">${serviceCards}</div>
                        </section>

                        <section class="mp-section mp-about" id="about">
                            <div class="mp-about__visual">
                                <div class="mp-about__portrait">
                                    <span class="mp-about__portrait-head"></span>
                                    <span class="mp-about__portrait-body"></span>
                                </div>
                                <span class="mp-about__badge">8 years<br><small>in web development</small></span>
                            </div>
                            <div class="mp-about__copy">
                                <p class="mp-kicker">About me</p>
                                <h2>Engineering clarity into complex platforms.</h2>
                                <p>I focus on component architecture, content authoring, search, media delivery and frontend quality. My goal is to leave each platform easier to operate and extend than I found it.</p>
                                <div class="mp-skill-list">
                                    <div><span>Liferay DXP</span><strong>92%</strong><i style="--progress:92%"></i></div>
                                    <div><span>Adobe Experience Manager</span><strong>90%</strong><i style="--progress:90%"></i></div>
                                    <div><span>Frontend Architecture</span><strong>86%</strong><i style="--progress:86%"></i></div>
                                    <div><span>Search & Integration</span><strong>82%</strong><i style="--progress:82%"></i></div>
                                </div>
                                <a class="mp-button mp-button--ghost" href="#contact">Start a conversation</a>
                            </div>
                        </section>

                        <section class="mp-section" id="portfolio">
                            <div class="mp-section-heading mp-section-heading--portfolio">
                                <div><p class="mp-kicker">Selected work</p><h2>Portfolio</h2></div>
                                <div class="mp-filter" role="group" aria-label="Filter projects">
                                    <button class="is-active" type="button" data-filter="all">All</button>
                                    <button type="button" data-filter="liferay">Liferay</button>
                                    <button type="button" data-filter="aem">AEM</button>
                                    <button type="button" data-filter="frontend">Frontend</button>
                                    <button type="button" data-filter="game">Game</button>
                                </div>
                            </div>
                            <div class="mp-project-grid">${projectCards}</div>
                        </section>

                        <section class="mp-section mp-contact" id="contact">
                            <div class="mp-contact__intro">
                                <p class="mp-kicker">Contact</p>
                                <h2>Have a project that needs structure and polish?</h2>
                                <p>Share the problem, current platform and target outcome. I will reply with the clearest next step.</p>
                                <div class="mp-contact__meta">
                                    <span>${escapeHtml(config.location)}</span>
                                    <span>${config.contactEmail ? escapeHtml(config.contactEmail) : 'Configure contact-email on the component'}</span>
                                </div>
                            </div>
                            <form class="mp-contact-form" novalidate>
                                <label><span>Name</span><input name="name" autocomplete="name" required></label>
                                <label><span>Email</span><input name="email" type="email" autocomplete="email" required></label>
                                <label class="mp-contact-form__full"><span>Project type</span>
                                    <select name="projectType">
                                        <option>Liferay implementation</option>
                                        <option>Frontend architecture</option>
                                        <option>AEM integration</option>
                                        <option>Design system</option>
                                    </select>
                                </label>
                                <label class="mp-contact-form__full"><span>Message</span><textarea name="message" rows="5" required></textarea></label>
                                <div class="mp-contact-form__footer">
                                    <p class="mp-form-status" aria-live="polite"></p>
                                    <button class="mp-button" type="submit">Send inquiry ${icon('arrow')}</button>
                                </div>
                            </form>
                        </section>
                    </main>

                    <footer class="mp-footer">
                        <a class="mp-brand" href="#home">H<span>.</span></a>
                        <p>Modern enterprise experiences, built with care.</p>
                        <a href="#top">Back to top ${icon('arrow')}</a>
                    </footer>
                </div>
            `;
        }

        bindEvents() {
            const menuButton = this.querySelector('.mp-menu-button');
            const mobileNav = this.querySelector('.mp-mobile-nav');

            menuButton?.addEventListener('click', () => {
                const expanded = menuButton.getAttribute('aria-expanded') === 'true';
                menuButton.setAttribute('aria-expanded', String(!expanded));
                mobileNav?.classList.toggle('is-open', !expanded);
            });

            this.querySelectorAll('a[href^="#"]').forEach((link) => {
                link.addEventListener('click', (event) => {
                    const target = this.querySelector(link.getAttribute('href'));
                    if (!target) return;
                    event.preventDefault();
                    target.scrollIntoView({behavior: 'smooth', block: 'start'});
                    menuButton?.setAttribute('aria-expanded', 'false');
                    mobileNav?.classList.remove('is-open');
                });
            });

            this.querySelectorAll('[data-filter]').forEach((button) => {
                button.addEventListener('click', () => {
                    const filter = button.dataset.filter;
                    this.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
                    this.querySelectorAll('.mp-project-card').forEach((card) => {
                        card.hidden = filter !== 'all' && card.dataset.category !== filter;
                    });
                });
            });

            this.querySelectorAll('[data-project-title]').forEach((button) => {
                button.addEventListener('click', () => {
                    const contact = this.querySelector('#contact');
                    const message = this.querySelector('textarea[name="message"]');
                    if (message) message.value = `I would like to discuss a project similar to ${button.dataset.projectTitle}.`;
                    contact?.scrollIntoView({behavior: 'smooth'});
                });
            });

            this.querySelector('.mp-contact-form')?.addEventListener('submit', (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const status = form.querySelector('.mp-form-status');

                if (!form.checkValidity()) {
                    form.reportValidity();
                    if (status) status.textContent = 'Please complete the required fields.';
                    return;
                }

                if (!this.config.contactEmail) {
                    if (status) status.textContent = 'Set the contact-email attribute in Liferay before publishing.';
                    return;
                }

                const data = new FormData(form);
                const subject = encodeURIComponent(`Portfolio inquiry from ${data.get('name')}`);
                const body = encodeURIComponent(`Email: ${data.get('email')}\nProject type: ${data.get('projectType')}\n\n${data.get('message')}`);
                window.location.href = `mailto:${this.config.contactEmail}?subject=${subject}&body=${body}`;
                if (status) status.textContent = 'Opening your email application…';
            });

            document.addEventListener('click', this.handleDocumentClick);
        }

        handleDocumentClick(event) {
            const menu = this.querySelector('.mp-mobile-nav');
            const button = this.querySelector('.mp-menu-button');
            if (!menu || !button || this.contains(event.target)) return;
            menu.classList.remove('is-open');
            button.setAttribute('aria-expanded', 'false');
        }
    }

    if (!customElements.get('modern-portfolio')) {
        customElements.define('modern-portfolio', ModernPortfolio);
    }
})();
