// 커스텀 커서
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-item').forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
    observer.observe(item);
});

// 프로젝트 모달
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', () => {
        const projectId = item.dataset.project;
        openProjectModal(projectId);
    });
});

function openProjectModal(projectId) {
    // 프로젝트 상세 정보를 보여주는 모달 구현
    // ... 
} 