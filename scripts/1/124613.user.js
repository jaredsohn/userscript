// ==UserScript==
// @name        Hide Gadget
// @namespace   http://jelzo.com
// @description Hides the below-email Rapportive Google gadget
// @version     0.0.1
// @include     http://mail.google.com/mail*
// @include     https://mail.google.com/mail*
// @include     http://mail.google.com/a/*
// @include     https://mail.google.com/a/*
// @author      Conrad Irwin — conrad.irwin@gmail.com
// ==/UserScript==
var s = document.createElement('style')
s.innerText = 'iframe[src*=gadgets][src*=rapportive] { display: none }'
document.getElementsByTagName('head')[0].appendChild(s)