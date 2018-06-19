// Modal
// Scrollbar width
function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    
    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    
    return w1 - w2;
}

// Get modal
function getModal(callBack) {
    var modalTriggers = document.querySelectorAll('.modal-trigger');
    
    for (var i = 0; i < modalTriggers.length; i++) {
        var trigger = modalTriggers[i];
        trigger.addEventListener('click', function (e) {
            var target = e.target.dataset.target;
            var targetModal = document.querySelector('.' + target);
            
            document.querySelector('.modal').classList.add('visually-hidden');
            targetModal.classList.remove('visually-hidden');
            
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = getScrollBarWidth() + 'px';
            document.querySelector('.modal__frame').classList.add('active');
            
            removeModal();
            
            if (callBack) {
                callBack();
            }
            
            // Update slider inside modal
            if (target === 'gallery-modal') {
                gallery.goTo(1);
            }
        });
    }
}

getModal();

// Remove modal
function removeModal() {
    var modals = document.querySelectorAll('.modal');
    
    if (modals) {
        for (var i = 0; i < modals.length; i++) {
            var modal = modals[i];
            
            modal.addEventListener('click', function (e) {
                if (e.target.classList.contains('modal__close')) {
                    this.classList.add('visually-hidden');
                    document.body.classList.remove('modal-open');
                    document.body.removeAttribute('style');
                    e.preventDefault();
                }
            });
        }
    }
}

// Test modal
function testModal(target, callBack) {
    var modals = document.querySelectorAll('.modal');
    if (modals) {
        for (var i = 0; i < modals.length; i++) {
            var modal = modals[i];
            modal.classList.add('visually-hidden');
            document.querySelector('.' + target).classList.remove('visually-hidden');
            
            if (callBack) {
                callBack();
            }
        }
    }
}