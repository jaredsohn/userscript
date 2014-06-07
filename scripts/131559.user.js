// ==UserScript== 
// @name        Remove onpaste
// @author      6147
// @namespace   1L2BprVn76F11f231
// @description description
// @version     1.0
// @license     GPL 3.0 
// @include     *
// @require     http://usocheckup.redirectme.net/131063.js
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript== 


$(document).ready(function() {
     $('input[onpaste]').removeAttr('onpaste');
});