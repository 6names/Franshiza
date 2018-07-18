// data-required="required" For required inputs
// data-error-message="message" For error message
// value="empty" For invalid select option
//
function validate(formEl, callback) {
    var form = document.getElementById(formEl);
    
    if (form) {
        var inputs = form.querySelectorAll('input');
        var textareas = form.querySelectorAll('textarea');
        var selects = form.querySelectorAll('select');
        var re;
        
        // Selects
        for (var i = 0; i < selects.length; i++) {
            var options = selects[i].parentElement.querySelectorAll('.select__option');
            
            for (var j = 0; j < options.length; j++) {
                var option = options[j];
                option.addEventListener('click', function () {
                    if (this.dataset.val === 'empty') {
                        this.parentElement.parentElement.classList.add('error');
                        form.classList.add('invalid');
                        console.log(this);
                    } else {
                        this.parentElement.parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                    }
                });
            }
        }
        
        function checkSelects() {
            for (var i = 0; i < selects.length; i++) {
                var select = selects[i];
                if (select.value === 'empty') {
                    select.parentElement.classList.add('error');
                    form.classList.add('invalid');
                } else {
                    select.parentElement.classList.remove('error');
                    form.classList.remove('invalid');
                }
            }
        }
        
        // Inputs
        function checkInputs(input) {
            if (input.dataset.required === 'required') {
                var name = input.getAttribute('name');
                var type = input.getAttribute('type');
                
                if (type === 'checkbox') {
                    if (!input.checked) {
                        input.parentElement.classList.add('error');
                        form.classList.add('invalid');
                    } else {
                        input.parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                    }
                } else if (type === 'radio') {
                    var groupName = input.getAttribute('name');
                    var group = document.querySelectorAll('[name=' + groupName + '"]');
                    var i;
                    
                    for (i = 0; i < group.length; i++) {
                        if (group[i].checked)
                            break;
                    }
                    
                    var item;
                    var j = 0;
                    
                    if (i === group.length) {
                        for (j = 0; j < group.length; j++) {
                            item = group[j];
                            item.parentElement.classList.add('error');
                            item.parentElement.parentElement.classList.add('error');
                            form.classList.add('invalid');
                        }
                    } else {
                        for (j = 0; j < group.length; j++) {
                            item = group[j];
                            item.parentElement.classList.remove('error');
                            item.parentElement.parentElement.classList.remove('error');
                            form.classList.remove('invalid');
                        }
                    }
                } else {
                    if (name) {
                        switch (name) {
                            case 'name':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'firstName':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'lastName':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'email':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'mail':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'phone':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            case 'tel':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            
                            default:
                                randomInput();
                        }
                    }
                    
                    function randomInput() {
                        if (input.value === '') {
                            input.classList.add('error');
                            form.classList.add('invalid');
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                        }
                    }
                    
                    function patternInput() {
                        if (!re.test(input.value)) {
                            input.classList.add('error');
                            form.classList.add('invalid');
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                        }
                    }
                }
            }
        }
        
        // Inputs listeners
        for (var k = 0; k < inputs.length; k++) {
            var type = inputs[k].getAttribute('type');
            var input = inputs[k];
            if (type === 'checkbox' || type === 'radio') {
                input.addEventListener('change', function () {
                    checkInputs(this);
                });
            } else {
                input.addEventListener('blur', function () {
                    checkInputs(this);
                });
                input.addEventListener('keyup', function () {
                    checkInputs(this);
                });
            }
        }
        
        // Textarea
        for (var l = 0; l < textareas.length; l++) {
            var textarea = textareas[l];
            textarea.addEventListener('blur', function () {
                checkInputs(this);
            });
        }
        
        // Submit listener
        form.addEventListener('submit', function (e) {
            
            for (var k = 0; k < inputs.length; k++) {
                checkInputs(inputs[k]);
            }
            
            for (var l = 0; l < textareas.length; l++) {
                checkInputs(textareas[l]);
            }
            
            checkSelects();
            
            if (form.querySelectorAll('.error').length > 0) {
                e.preventDefault();
            } else {
                if (callback) {
                    callback(e);
                }
            }
        });
    }
}