// ==UserScript==
// @name           CaixaDirecta Sem Teclado Virtual
// @namespace      http://userscripts.org/users/291100
// @include        https://caixadirectaonline.cgd.pt/cdo/*
// ==/UserScript==

(function () {    
    var userInput = document.getElementById('userInput');
    if(userInput) {
        document.onkeypress = null;
        userInput.setAttribute('onfocus', "setActiveFieldLG('0');");
        document.getElementById('password').setAttribute('onfocus', "setActiveFieldLG('1');");
        el = document.getElementById('modal_shadow_zero');
        el.parentNode.removeChild(el);
        el = document.getElementById('zeroHPModalPanel');
        el.parentNode.removeChild(el);
        userInput.focus();
    }
    
    var popupLogin = document.getElementById('modal_shadow_pzero');
    if(popupLogin) {
        el = document.getElementById('zeroHPModalPanel2');
        el.parentNode.removeChild(el);
        el = document.getElementById('modal_shadow_pzero');
        el.parentNode.removeChild(el);
    }
})();