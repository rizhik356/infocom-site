document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('left')
                entry.target.classList.remove('right');
                entry.target.classList.add('show');
            }
        });
    });

    items.forEach(el => observer.observe(el));

// Ждем появления элементов с классом animate_counting
    const countingElements = document.querySelectorAll('.animate_counting');

// Функция для анимации счетчика
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const steps = 60;
        const step = target / steps;

        function update() {
            current += step;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        }

        update();
    }

// Создаем наблюдатель для элементов со счетчиками
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    // Задержка перед запуском счетчика
                    setTimeout(() => {
                        animateCounter(counter);
                    }, 100); // Задержка 800ms после появления анимации
                }
            }
        });
    }, { threshold: 0.5 }); // Срабатывает когда элемент виден на 50%

// Наблюдаем за каждым элементом с классом animate_counting
    countingElements.forEach(el => {
        counterObserver.observe(el);
    });

    const carousel = document.querySelector('.carousel_container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && prevBtn && nextBtn) {
        // Прокрутка влево
        prevBtn.addEventListener('click', () => {
            const cardWidth = document.querySelector('.carousel_card')?.offsetWidth || 400;
            const gap = 32; // 2rem = 32px
            carousel.scrollBy({
                left: -(cardWidth + gap),
                behavior: 'smooth'
            });
        });

        // Прокрутка вправо
        nextBtn.addEventListener('click', () => {
            const cardWidth = document.querySelector('.carousel_card')?.offsetWidth || 400;
            const gap = 32; // 2rem = 32px
            carousel.scrollBy({
                left: cardWidth + gap,
                behavior: 'smooth'
            });
        });

        // Скрываем/показываем кнопки в зависимости от положения скролла
        function updateButtonsVisibility() {
            const isAtStart = carousel.scrollLeft <= 10;
            const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;

            if (prevBtn) {
                prevBtn.style.opacity = isAtStart ? '0.5' : '1';
                prevBtn.style.cursor = isAtStart ? 'default' : 'pointer';
                prevBtn.disabled = isAtStart;
            }

            if (nextBtn) {
                nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
                nextBtn.style.cursor = isAtEnd ? 'default' : 'pointer';
                nextBtn.disabled = isAtEnd;
            }
        }

        carousel.addEventListener('scroll', updateButtonsVisibility);
        window.addEventListener('resize', updateButtonsVisibility);
        updateButtonsVisibility();
    }

    document.querySelectorAll('.spec-item').forEach(item => {
        const header = item.querySelector('.spec-header');

        const toggleItem = () => {
            item.classList.toggle('active');
        };

        header.addEventListener('click', (e) => {
            // Если кликнули на кнопку-переключатель
            if (e.target.closest('.spec-toggle')) {
                toggleItem();
            } else {
                // Если кликнули на любую другую часть заголовка
                toggleItem();
            }
        });

        // Поддержка клавиатуры
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');

        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem();
            }
        });
    });

});