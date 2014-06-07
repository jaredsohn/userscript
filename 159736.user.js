// ==UserScript==
// @name        Gmail auto resize labels
// @description Automatically fit Gmail labels
// @namespace   me.bck.userscripts.gmail_auto_resize_labels
// @include     https://mail.google.com/mail/*
// @version     0.1
// ==/UserScript==

var garl_div = document.createElement('style');
garl_div.innerHTML='.ajl { height: auto !important; }';
document.body.appendChild(garl_div);
