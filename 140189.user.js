// ==UserScript==
//
// @name           InvitGeek
//
// @description    GeekFtour   
//
// @namespace      http://www.facebook.com/N3RG4L
//   
// @author        ReaPQ
//
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// 
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http*://*.eventbrite*
//
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.0 first version
// @history        1.0b first beta version, who knew!!
//
// ==/UserScript==


var quant = 1;
//var id = /[quant]/

var form = document.forms.namedItem('mgform');
var quantity = document.getElementsByTagName('select');

$(function autofill(){
	quantity[0].value = quant;
	form.submit();
});