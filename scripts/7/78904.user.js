// ==UserScript==
// @name           Formspring "ask anonymously" checked by default
// @namespace      http://userscripts.org/users/70005
// @description    Auto-checks the "ask anonymously" checkbox on Formspring.
// @include        http://www.formspring.me/*
// ==/UserScript==
document.getElementById('anonymous').checked = 'checked';