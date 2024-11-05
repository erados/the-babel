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
}); 