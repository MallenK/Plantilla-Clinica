// JavaScript para MediSalud Premium
document.addEventListener('DOMContentLoaded', function() {
    
    // ==============================================
    // NAVEGACIÓN SUAVE
    // ==============================================
    
    // Navegación smooth scroll
    const navLinks = document.querySelectorAll('.nav__link, .footer__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ==============================================
    // CARRUSEL DE ESPECIALISTAS
    // ==============================================
    
    const specialistsTrack = document.querySelector('.specialists__track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSpecialistIndex = 0;
    const specialists = document.querySelectorAll('.specialist__card');
    const specialistsPerView = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
    const totalSpecialists = specialists.length;
    
    function updateSpecialistsCarousel() {
        const cardWidth = 280; // width + gap
        const translateX = -(currentSpecialistIndex * cardWidth);
        specialistsTrack.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar estados de botones
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentSpecialistIndex === 0;
            nextBtn.disabled = currentSpecialistIndex >= totalSpecialists - specialistsPerView;
            
            if (prevBtn.disabled) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'not-allowed';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }
            
            if (nextBtn.disabled) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'not-allowed';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        }
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSpecialistIndex > 0) {
                currentSpecialistIndex--;
                updateSpecialistsCarousel();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentSpecialistIndex < totalSpecialists - specialistsPerView) {
                currentSpecialistIndex++;
                updateSpecialistsCarousel();
            }
        });
    }
    
    // ==============================================
    // CARRUSEL DE TESTIMONIOS
    // ==============================================
    
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialsPrevBtn = document.getElementById('testimonialsPrev');
    const testimonialsNextBtn = document.getElementById('testimonialsNext');
    
    let currentTestimonialIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial__card');
    const testimonialsPerView = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
    const totalTestimonials = testimonials.length;
    
    function updateTestimonialsCarousel() {
        const cardWidth = 320; // width + gap
        const translateX = -(currentTestimonialIndex * cardWidth);
        testimonialsTrack.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar estados de botones
        if (testimonialsPrevBtn && testimonialsNextBtn) {
            testimonialsPrevBtn.disabled = currentTestimonialIndex === 0;
            testimonialsNextBtn.disabled = currentTestimonialIndex >= totalTestimonials - testimonialsPerView;
            
            if (testimonialsPrevBtn.disabled) {
                testimonialsPrevBtn.style.opacity = '0.5';
                testimonialsPrevBtn.style.cursor = 'not-allowed';
            } else {
                testimonialsPrevBtn.style.opacity = '1';
                testimonialsPrevBtn.style.cursor = 'pointer';
            }
            
            if (testimonialsNextBtn.disabled) {
                testimonialsNextBtn.style.opacity = '0.5';
                testimonialsNextBtn.style.cursor = 'not-allowed';
            } else {
                testimonialsNextBtn.style.opacity = '1';
                testimonialsNextBtn.style.cursor = 'pointer';
            }
        }
    }
    
    if (testimonialsPrevBtn && testimonialsNextBtn) {
        testimonialsPrevBtn.addEventListener('click', function() {
            if (currentTestimonialIndex > 0) {
                currentTestimonialIndex--;
                updateTestimonialsCarousel();
            }
        });
        
        testimonialsNextBtn.addEventListener('click', function() {
            if (currentTestimonialIndex < totalTestimonials - testimonialsPerView) {
                currentTestimonialIndex++;
                updateTestimonialsCarousel();
            }
        });
    }
    
    // ==============================================
    // SISTEMA FAQ
    // ==============================================
    
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los elementos
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle del elemento actual
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // ==============================================
    // DIAGNÓSTICO RÁPIDO
    // ==============================================
    
    const symptomBtns = document.querySelectorAll('.symptom__btn');
    const diagnosisResult = document.getElementById('diagnosisResult');
    const diagnosisContent = diagnosisResult.querySelector('.diagnosis__content');
    
    const symptomRecommendations = {
        'dolor-pecho': {
            title: 'Recomendación para Dolor en el Pecho',
            text: 'El dolor en el pecho puede indicar problemas cardiovasculares. Te recomendamos una consulta inmediata con nuestra cardióloga, la Dra. Elena Vargas. Si el dolor es severo o va acompañado de dificultad para respirar, busca atención de urgencias inmediatamente.'
        },
        'sarpullido': {
            title: 'Recomendación para Sarpullido o Manchas',
            text: 'Para problemas dermatológicos como sarpullidos o manchas en la piel, recomendamos una consulta con nuestro dermatólogo, el Dr. Carlos Mendoza. Trae fotos del problema si ha cambiado recientemente.'
        },
        'lesion-articular': {
            title: 'Recomendación para Lesión Articular',
            text: 'Las lesiones articulares requieren evaluación especializada. Te recomendamos consultar con nuestra traumatóloga, la Dra. Ana Rodríguez, quien se especializa en medicina deportiva y rehabilitación.'
        },
        'cansancio': {
            title: 'Recomendación para Cansancio Extremo',
            text: 'El cansancio extremo puede tener múltiples causas. Una consulta con nuestro internista, el Dr. Miguel Torres, puede ayudarte a identificar la causa subyacente y establecer un plan de tratamiento.'
        },
        'fiebre': {
            title: 'Recomendación para Fiebre Persistente',
            text: 'La fiebre persistente requiere evaluación médica. Nuestro equipo de urgencias está disponible 24/7, o puedes agendar una consulta con medicina interna para un análisis completo.'
        },
        'dolor-abdominal': {
            title: 'Recomendación para Dolor Abdominal',
            text: 'El dolor abdominal puede requerir evaluación inmediata según la intensidad. Para casos severos, nuestras urgencias están disponibles 24/7. Para evaluación general, consulta con medicina interna.'
        }
    };
    
    symptomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const symptom = this.dataset.symptom;
            
            // Remover clase activa de todos los botones
            symptomBtns.forEach(otherBtn => {
                otherBtn.classList.remove('active');
            });
            
            // Agregar clase activa al botón seleccionado
            this.classList.add('active');
            
            // Actualizar contenido del diagnóstico
            const recommendation = symptomRecommendations[symptom];
            if (recommendation) {
                diagnosisContent.querySelector('.diagnosis__title').textContent = recommendation.title;
                diagnosisContent.querySelector('.diagnosis__text').textContent = recommendation.text;
                
                // Scroll suave al resultado
                setTimeout(() => {
                    diagnosisResult.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        });
    });
    
    // ==============================================
    // FORMULARIO DE CITA MÉDICA
    // ==============================================
    
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            const errors = [];
            
            // Validar campos requeridos
            if (!data.nombre || data.nombre.trim().length < 2) {
                errors.push('El nombre debe tener al menos 2 caracteres');
            }
            
            if (!data.telefono || !/^[+]?[0-9\s\-()]{9,}$/.test(data.telefono)) {
                errors.push('Por favor ingresa un teléfono válido');
            }
            
            if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                errors.push('Por favor ingresa un email válido');
            }
            
            if (!data.especialidad) {
                errors.push('Debes seleccionar una especialidad');
            }
            
            // Mostrar errores si los hay
            const existingError = this.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            if (errors.length > 0) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.innerHTML = `
                    <strong>Errores encontrados:</strong><br>
                    ${errors.map(error => `• ${error}`).join('<br>')}
                `;
                this.insertBefore(errorDiv, this.firstChild);
                
                // Scroll al mensaje de error
                errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            
            // Si no hay errores, procesar el formulario
            const existingSuccess = this.querySelector('.success-message');
            if (existingSuccess) {
                existingSuccess.remove();
            }
            
            // Simular envío (aquí conectarías con tu backend)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de envío
            setTimeout(() => {
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.innerHTML = `
                    <strong>¡Solicitud enviada correctamente!</strong><br>
                    Nos pondremos en contacto contigo en un plazo máximo de 24 horas para confirmar tu cita.
                    <br><br>
                    <strong>Resumen de tu solicitud:</strong><br>
                    • Nombre: ${data.nombre}<br>
                    • Especialidad: ${data.especialidad}<br>
                    • Fecha preferida: ${data.fecha || 'No especificada'}
                `;
                
                this.insertBefore(successDiv, this.firstChild);
                this.reset();
                
                // Scroll al mensaje de éxito
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remover mensaje después de 10 segundos
                setTimeout(() => {
                    successDiv.remove();
                }, 10000);
                
            }, 2000);
        });
        
        // Validación en tiempo real
        const formInputs = appointmentForm.querySelectorAll('.form__input');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remover estilos de error mientras el usuario escribe
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let message = '';
            
            switch (field.name) {
                case 'nombre':
                    if (value.length < 2) {
                        isValid = false;
                        message = 'El nombre debe tener al menos 2 caracteres';
                    }
                    break;
                case 'telefono':
                    if (!/^[+]?[0-9\s\-()]{9,}$/.test(value)) {
                        isValid = false;
                        message = 'Teléfono inválido';
                    }
                    break;
                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        isValid = false;
                        message = 'Email inválido';
                    }
                    break;
            }
            
            // Aplicar estilos de validación
            if (isValid) {
                field.style.borderColor = 'var(--success)';
                field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            } else {
                field.style.borderColor = 'var(--error)';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            }
        }
    }
    
    // ==============================================
    // ANIMACIONES AL HACER SCROLL
    // ==============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll(
        '.service__card, .specialist__card, .testimonial__card, .contact__card, .symptom__btn'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ==============================================
    // MENÚ HAMBURGuesa (móvil)
    // ==============================================
    
    // Crear botón de menú hamburguesa
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav__menu');
    
    if (window.innerWidth <= 768) {
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger';
        hamburgerBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        hamburgerBtn.style.cssText = `
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 24px;
            height: 24px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
        `;
        
        const spans = hamburgerBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.cssText = `
                width: 24px;
                height: 3px;
                background-color: var(--text-primary);
                border-radius: 1px;
                transition: all 0.3s;
            `;
        });
        
        nav.insertBefore(hamburgerBtn, navMenu);
        
        let isMenuOpen = false;
        
        hamburgerBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'var(--surface-background)';
                navMenu.style.padding = 'var(--space-lg)';
                navMenu.style.boxShadow = 'var(--shadow-lg)';
                navMenu.style.borderRadius = '0 0 var(--radius-lg) var(--radius-lg)';
                
                // Animar hamburger
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                navMenu.style.display = '';
                navMenu.style.flexDirection = '';
                navMenu.style.position = '';
                navMenu.style.top = '';
                navMenu.style.left = '';
                navMenu.style.right = '';
                navMenu.style.background = '';
                navMenu.style.padding = '';
                navMenu.style.boxShadow = '';
                navMenu.style.borderRadius = '';
                
                // Restaurar hamburger
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // ==============================================
    // HEADER SCROLL EFECT
    // ==============================================
    
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ==============================================
    // INICIALIZACIÓN
    // ==============================================
    
    // Actualizar carousels al cargar
    updateSpecialistsCarousel();
    updateTestimonialsCarousel();
    
    // Actualizar carousels al redimensionar ventana
    window.addEventListener('resize', function() {
        setTimeout(() => {
            updateSpecialistsCarousel();
            updateTestimonialsCarousel();
        }, 100);
    });
    
    // Prevenir envío de formulario con Enter en campos individuales
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('form__input')) {
            e.preventDefault();
            
            // Buscar siguiente campo o enviar si es el último
            const form = e.target.closest('form');
            if (form) {
                const inputs = Array.from(form.querySelectorAll('.form__input, .form__select'));
                const currentIndex = inputs.indexOf(e.target);
                
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                } else {
                    form.querySelector('button[type="submit"]').click();
                }
            }
        }
    });
    
    // Lazy loading para imágenes (si se agregan imágenes reales)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    console.log('MediSalud Premium - Sitio web cargado correctamente');
});

// ==============================================
// FUNCIONES UTILITARIAS
// ==============================================

// Función para formatear números de teléfono
function formatPhoneNumber(input) {
    // Remover caracteres no numéricos
    let value = input.value.replace(/\D/g, '');
    
    // Formatear según el patrón español
    if (value.startsWith('34')) {
        // Código de país +34
        value = '+34 ' + value.substring(2);
    } else if (value.length === 9) {
        // Número nacional
        value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    
    input.value = value;
}

// Función para validar fechas futuras
function isFutureDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
}

// Función para mostrar notificaciones toast
function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary-500)'};
        color: white;
        padding: 16px 24px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después del tiempo especificado
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}