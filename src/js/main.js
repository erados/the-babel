document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectItems = document.querySelectorAll('.project-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 선택된 카테고리
            const selectedCategory = button.dataset.category;

            // 프로젝트 필터링
            projectItems.forEach(item => {
                if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                    item.style.display = '';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 스크롤 관련 변수
    let lastScrollTop = 0;
    let nav = document.querySelector('nav');
    let isNavVisible = true;
    
    // 스크롤 이벤트에 throttle 적용
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleNavVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleNavVisibility() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향 확인 (위: true, 아래: false)
        const isScrollingUp = currentScrollTop < lastScrollTop;
        
        // 최상단에서는 항상 표시
        if (currentScrollTop <= 0) {
            showNav();
        }
        // 스크롤 방향에 따라 표시/숨김
        else if (isScrollingUp && !isNavVisible) {
            showNav();
        } else if (!isScrollingUp && isNavVisible && currentScrollTop > 100) {
            hideNav();
        }
        
        lastScrollTop = currentScrollTop;
    }

    function showNav() {
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
        isNavVisible = true;
    }

    function hideNav() {
        nav.style.transform = 'translateY(-100%)';
        nav.style.opacity = '0';
        isNavVisible = false;
    }

    // 브라우저 언어 감지
    function getBrowserLanguage() {
        const language = navigator.language || navigator.userLanguage;
        return language.startsWith('ko') ? 'ko' : 'en';
    }

    // 전역 변수 설정
    let currentLang = localStorage.getItem('language') || 'ko';

    // 언어 변경 함수
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        
        // 모든 번역 요소 업데이트
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let translation = translations[lang];
            
            for (const k of keys) {
                translation = translation[k];
            }
            
            if (translation) {
                element.innerHTML = translation;
            }
        });

        // 언어 선택 버튼 스타일 업데이트
        document.querySelectorAll('.language-options button').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    // 언어 선택 버튼에 이벤트 리스너 추가
    const languageButtons = document.querySelectorAll('.language-selector button');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newLang = this.getAttribute('data-lang');
            setLanguage(newLang);
            console.log('Language changed to:', newLang); // 디버깅용
        });
    });

    // 초기 언어 설정
    setLanguage(currentLang);

    // 언어 선택기 토글 기능
    const languageToggle = document.querySelector('.language-toggle');
    const languageOptions = document.querySelector('.language-options');
    const currentLangDisplay = document.querySelector('.current-lang');

    // 아이콘 클릭 시에만 옵션 표시
    languageToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        languageOptions.classList.toggle('show');
    });

    // 언어 선택 시
    document.querySelectorAll('.language-options button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const newLang = this.getAttribute('data-lang');
            setLanguage(newLang);
            currentLangDisplay.textContent = newLang.toUpperCase();
            languageOptions.classList.remove('show');
        });
    });

    // 다른 곳 클릭 시 옵션 닫기
    document.addEventListener('click', () => {
        languageOptions.classList.remove('show');
    });

    // 초기 언어 표시
    currentLangDisplay.textContent = currentLang.toUpperCase();
}); 