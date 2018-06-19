// Form validation
validate('form-a', function (e) {
    testModal('thanks-modal');
    
    // Change preventDefault to your submit function
    e.preventDefault();
});

validate('form-b', function (e) {
    testModal('thanks-modal');
    
    // Change preventDefault to your submit function
    e.preventDefault();
});

validate('form-c', function (e) {
    testModal('thanks-modal');
    
    // Change preventDefault to your submit function
    e.preventDefault();
});

// Sliders
var mainSlider = document.querySelectorAll('.main-slider__holder');
for (var i = 0; i < mainSlider.length; i++) {
    var slider = mainSlider[i];
    
    tns({
        container: slider,
        slideBy: 'page',
        autoplay: false,
        controls: true,
        nav: false,
        autoHeight: true,
        speed: 600
    });
    var btns = slider.parentElement.parentElement.querySelector('.tns-controls');
    slider.parentElement.parentElement.querySelector('.tns-inner').insertAdjacentElement('beforeend', btns);
}

// Anchors
var anchors = document.querySelectorAll('a.anchor');

if (anchors) {
    for (var j = 0; j < anchors.length; j++) {
        anchors[j].addEventListener('click', function (e) {
            var link = this.getAttribute('href');
            var destination = document.querySelector(link).getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                behavior: 'smooth',
                left: 0,
                top: destination
            });
            e.preventDefault();
        });
    }
}

// Animate class
function animateClass(target) {
    var items = document.querySelectorAll(target);
    
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemPos = item.getBoundingClientRect().top + window.pageYOffset;
            var pos = window.pageYOffset - (item.clientHeight / 3);
            
            if (pos > itemPos - window.innerHeight) {
                item.classList.add('animate');
            } else {
                item.classList.remove('animate');
            }
        }
    }
}

// Window Scroll
var header = document.querySelector('header.header');
var headerGap = 0;
var footer = document.querySelector('footer.footer');
var fixedFormColumn = document.querySelector('.form-column');

window.addEventListener('scroll', function () {
    windowScroll();
});

window.addEventListener('resize', function () {
    windowResize();
});

function windowResize() {
    if (window.innerWidth > 1024) {
        headerGap = 100;
    } else {
        headerGap = 20;
    }
}

function windowScroll() {
    if (window.pageYOffset > headerGap) {
        header.classList.add('header_fixed');
    } else {
        header.classList.remove('header_fixed');
    }
    
    if (fixedFormColumn) {
        if (window.innerWidth > 1024) {
            var scrollDistance = footer.getBoundingClientRect().top + window.pageYOffset;
            if (window.pageYOffset + window.innerHeight >= scrollDistance) {
                fixedFormColumn.style.position = 'absolute';
                fixedFormColumn.style.bottom = 0;
            } else {
                fixedFormColumn.removeAttribute('style');
            }
        } else {
            fixedFormColumn.removeAttribute('style');
        }
    }
    
    animateClass('.about__map');
    animateClass('.shop__inner');
}

// Check if content loaded
document.addEventListener('DOMContentLoaded', function () {
    var pageHtml = document.querySelector('html');
    pageHtml.classList.add('loaded');
    
    // Browser And Platform Detect
    browsers();
    
    // Window events
    windowScroll();
    windowResize();
});





