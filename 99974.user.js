// ==UserScript==
// @name           HCI auto Portal Login
// @namespace      -
// @description    This script will enable you to auto login when the network redirects you to the portal login page
// @include        https://securelogin.arubanetworks.com/upload/custom/HCI-Public/*
// ==/UserScript==

document.getElementById('user').value = '-----------';
document.getElementById('password').value = '----------------';
setTimeout(function() {document.forms[0].submit();},1);