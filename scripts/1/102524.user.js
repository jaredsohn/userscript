// ==UserScript==
// @name           azimut.com.ua: fixing login form
// @description    hide login form after successful login and make right-top login form work
// @namespace      shops
// @require http://code.jquery.com/jquery-1.5.2.min.js
// @include        http://www.azimut.com.ua/*
// ==/UserScript==
if (jQuery('a.headerNavigation').filter(function (index, item) {
    return ((item.firstChild || {}).nodeValue || '') == 'Выход'
}).length) {
    jQuery('td.login>table')[0].style.visibility = 'hidden';
}

var form = document.getElementById('form2');
if (form) {
    form.action = 'login.php?action=process';
    form.method = 'post';
    var formParent = form.parentNode;
    var formGrandParent = formParent.parentNode;
    formGrandParent.appendChild(form);
    form.appendChild(formParent);
    var inputs = form.getElementsByTagName('input');
    inputs[0].name = 'email_address';
    inputs[1].name = 'password';

}