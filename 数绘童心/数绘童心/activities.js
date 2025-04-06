function changeImage(imageSrc) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = imageSrc;
}

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');
let currentIndex = 0;
const slides = slider.querySelectorAll('img');
const slideWidth = slider.clientWidth / slides.length;
let intervalId; // 定义定时器 ID

// 生成圆点
function generateDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            slideTo(index);
        });
        dotsContainer.appendChild(dot);
    });
}

function slideTo(index) {
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
    updateDots();
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 自动切换函数
function autoSlide() {
    if (currentIndex < slides.length - 1) {
        slideTo(currentIndex + 1);
    } else {
        slideTo(0); // 回到第一张
    }
}

// 启动自动切换
function startAutoSlide() {
    intervalId = setInterval(autoSlide, 3000); // 每 3 秒切换一次
}

// 停止自动切换
function stopAutoSlide() {
    clearInterval(intervalId);
}

prevBtn.addEventListener('click', () => {
    stopAutoSlide(); // 点击按钮时停止自动切换
    if (currentIndex > 0) {
        slideTo(currentIndex - 1);
    } else {
        slideTo(slides.length - 1); // 回到最后一张
    }
    startAutoSlide(); // 点击按钮后重新启动自动切换
});

nextBtn.addEventListener('click', () => {
    stopAutoSlide(); // 点击按钮时停止自动切换
    if (currentIndex < slides.length - 1) {
        slideTo(currentIndex + 1);
    } else {
        slideTo(0); // 回到第一张
    }
    startAutoSlide(); // 点击按钮后重新启动自动切换
});

// 页面加载时生成圆点并启动自动切换
window.addEventListener('load', () => {
    generateDots();
    startAutoSlide();
});

const newSlider = document.querySelector('.new-slider');
const newSlides = newSlider.querySelectorAll('img');
let newCurrentIndex = 0;

function updateNewSlider() {
    newSlides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        if (index === newCurrentIndex) {
            slide.classList.add('active');
        } else if (index === (newCurrentIndex - 1 + newSlides.length) % newSlides.length) {
            slide.classList.add('prev');
        } else if (index === (newCurrentIndex + 1) % newSlides.length) {
            slide.classList.add('next');
        }
        // 调整每张图片的位置，实现重叠效果
        // slide.style.left = `${(index * ((100 / 8) - 15))}%`;
    });
}

function newSlideTo(index) {
    newCurrentIndex = index;
    updateNewSlider();
}

// 初始化
updateNewSlider();

// 自动轮播
setInterval(() => {
    newSlideTo((newCurrentIndex + 1) % newSlides.length);
}, 3000);

// 按钮事件
document.querySelector('.new-prev-btn').addEventListener('click', () => {
    newSlideTo((newCurrentIndex - 1 + newSlides.length) % newSlides.length);
});

document.querySelector('.new-next-btn').addEventListener('click', () => {
    newSlideTo((newCurrentIndex + 1) % newSlides.length);
});