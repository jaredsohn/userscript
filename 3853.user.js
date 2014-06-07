// ==UserScript==
// @name allInputAccessKeys
// @namespace http://www.strangecode.com/
// @description Sets the accesskey for each submit buttons on page to the first letter of the value of the button.
// @include *
// ==/UserScript==
(function () {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type') == 'submit') {
            var matches = /^(\w)/i.exec(inputs[i].getAttribute('value'));
            inputs[i].setAttribute('accessKey', matches[0].toLowerCase());
        }
    }
})();

