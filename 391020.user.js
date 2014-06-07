// ==UserScript==
// @name        private checkbox setter
// @namespace   codepad.org
// @include     http://codepad.org/*
// @version     1
// @grant       none
// ==/UserScript==
if (document.querySelectorAll('[name=private]'))
{
    document.querySelectorAll('[name=private]')[0].checked = true;
}