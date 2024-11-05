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
}); 