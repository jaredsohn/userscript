// ==UserScript==
// @name           Revelador de Senha
// @namespace      http://userscripts.org/users/530378
// @description    Passe o Mouse sobre a senhapara Visualiza-la
// @include        http://*
// @include        https://*
// @include        file:///*
// @exclude        file:///*/perf.html*
// @exclude        http://*.youtube.com/*
// @exclude        http://youtube.com/*
// @copyright      Gabriel Lima
// @version        2.9
// @license        Gabriel Lima
// ==/UserScript==
(function() {




var show_only_on_click = false; // Only show passwords when you click on the field





var handlers = [];

function toText(e) {
    e = e.target;

    if (e.tagName === 'INPUT' && e.type === 'password') {
        e.type = 'text';
        e.setAttribute('oldType', 'password');
    }
}

function toPassword(e) {
    e = e.target;

    if (e.tagName === 'INPUT' && e.getAttribute('oldType') === 'password') {
        e.type = 'password';
        e.removeAttribute('oldType');
    }
}

function addHandlers() {
    var fields = document.querySelectorAll('input[type="password"]'), i, field;

    for (i = 0; ( field = fields[i] ); i += 1) {
        if (handlers.indexOf(field) === -1) {
            field.addEventListener('focus', toText, false);
            field.addEventListener('blur', toPassword, false);
            handlers.push(field);
        }
    }
}

if (show_only_on_click === false) {
    window.addEventListener('mouseover', toText, false);
    window.addEventListener('mouseout', toPassword, false);
} else {
    setInterval(addHandlers, 1000);
}

}());