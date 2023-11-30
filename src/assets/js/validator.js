function Validator(formSelector) {
    var _this = this
    // Hàm lấy element cha của element
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    // Hàm thực hiện validate
    function handleValidate(event) {
        var inputValue = event.target.value;
        var inputName = event.target.name
        var errorMessage
        // Lấy ra các rules tương ứng với thẻ input
        var rules = formRules[event.target.name]

        // Kiểm tra và chạy từng rule
        for (let i = 0; i < rules.length; i++) {
            // Nếu ô input là confirm password thì lấy giá trị từ ô password để kiểm tra
            if (inputName === 'confirm-password') {
                let passwordValue = document.querySelector('[name="password"]').value
                errorMessage = rules[i](passwordValue, inputValue)
            } else {
                errorMessage = rules[i](inputValue)
            }
            if (errorMessage)
                break
        }

        if (errorMessage) {
            var formGroup = getParent(event.target, '.form-group')
            if (formGroup) {
                var formMessage = formGroup.querySelector('.form-message')
                formMessage.innerText = errorMessage
                formGroup.classList.add('invalid')
            }
        } else {
            var formGroup = getParent(event.target, '.form-group')
            if (formGroup) {
                var formMessage = formGroup.querySelector('.form-message')
                formMessage.innerText = ''
                formGroup.classList.remove('invalid')
            }
        }

        return !errorMessage
    }

    // Hàm clear message lỗi khi nhập vào ô input
    function handleClearError(event) {
        var formGroup = getParent(event.target, '.form-group')
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid')
            var formMessage = formGroup.querySelector('.form-message')
            if (formMessage) {
                formMessage.innerText = ''
            }
        }
    }

    // Hàm lấy giá trị của ô input password
    function getConfirmValue() {
        return
    }

    /**
     * Form rules chứa các rule tương ứng với các thẻ input
     * với key là name của thẻ input, value là rule được lấy trong validateRules tương ứng với thẻ input
    */
    var formRules = {}

    /**
     * Validate rules lưu các định nghĩa rule 
     * - Nếu có lỗi return error message
     * - Nếu không có lỗi return undefined
    */
    var validateRules = {
        required: function (value) {
            return value ? undefined : 'Please fill out this field';
        },

        email: function (value) {
            var regrex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regrex.test(value) ? undefined : 'Email address format is not valid.';
        },

        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Password must be at least ${min} characters long.`
            }
        },

        confirmed: function (confirmValue, value) {
            return value === confirmValue ? undefined : `Passwords do not match. Please re-enter passwords.`
        }
    }

    // Lấy ra form element trong DOM theo form selector
    var formElement = document.querySelector(formSelector);

    // Khi có form element trong DOM thì mới xử lý
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|')

            for (var rule of rules) {
                var isRuleHasValue = rule.includes(':')
                var ruleInfo;


                if (isRuleHasValue) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }

                if (!Array.isArray(formRules[input.name])) {
                    formRules[input.name] = []
                }

                var ruleFunc = validateRules[rule];

                // Gán giá trị của các rule trong form rules là các function trong validate rules 
                if (isRuleHasValue) {
                    ruleFunc = validateRules[rule](ruleInfo[1])
                }
                formRules[input.name].push(ruleFunc)
            }

            // Lắng nghe sự kiện để validate (blur, onchange,...)
            input.onblur = handleValidate
            input.oninput = handleClearError

        }
    }

    // Xử lý submit form
    formElement.onsubmit = function (event) {
        event.preventDefault()

        var inputs = formElement.querySelectorAll('[name][rules]')
        var isValid = true;

        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }

        // Gửi dữ liệu khi form hợp lệ
        if (isValid) {
            if (typeof (_this.onSubmit) === 'function') {

                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            if (input.matches(':checked')) {
                                values[input.name] = input.value
                            }
                        case 'checkbox':

                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = []
                            }
                            if (input.matches(':checked')) {
                                values[input.name].push(input.value)
                                return values
                            }
                            if (values[input.name].length == 0) {
                                values[input.name] = ''
                            }
                            break
                        case 'file':
                            values[input.name] = input.files;
                            break
                        default:
                            values[input.name] = input.value
                            break
                    }
                    return values;
                }, {})

                _this.onSubmit(formValues)

            }
        }
    }
}

export default Validator