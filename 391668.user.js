// ==UserScript==
// @name       Dev B-Jay Remove Bot 
// @namespace  https://www.facebook.com/tipsglobe
// @version    0.1
// @description  Tips That Makes You Freak
// @match      http://www.like4like.org/*
// @copyright  2014+, Toukir Rahman
// ==/UserScript==
var code = "";
$(".all").prepend(code);
$('a[onclick$="skiplink();"]').parent().parent().remove();
$('img[src$="http://www.like4like.org/img/icon/antibot-top-1.png"]').parent().parent().parent().remove();
