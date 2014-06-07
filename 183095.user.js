// ==UserScript==
// @name        hugefiles
// @namespace   hugefiles
// @include     http://hugefiles.net/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
$('div.pay_sub:nth-child(1) > center:nth-child(3) > form:nth-child(1) > input:nth-child(6)').click();
$('#dap').click();
});