// ==UserScript==
// @name  Notification Browser N07 Design2 1.0
// @namespace     http://stylebot.me/styles/1916
// @description   Estilo CSS para las notificaciones en Browser de Taringa.net. Uso Excusivo para Taringa.net. Created by ElNicko077
// @include   http://www.taringa.net/*
// @include   https://www.taringa.net/*
// @author        ElNicko077
// ==/UserScript==

var jscript = document.createElement("script"); 
jscript.src = "http://elnicko077.com/ext/tns_moz/js/jquery.min.js" 
jscript.type = "text/javascript"; 
document.getElementsByTagName("body")[0].appendChild(jscript);

var script = document.createElement("script"); 
script.src = "http://elnicko077.com/ext/tns_moz/js/Sstorage.js" 
script.type = "text/javascript"; 
document.getElementsByTagName("body")[0].appendChild(script);



$(document).ready(function() {	

	$('#design-tab-account fieldset').append( "<h3 class='active'>Notificaciones</h3><div class='clearfix'><p>Selecciona el diseño que más te guste.</p><div id='n-selector'><form id='n-form'><div id='design-one' class='n-d-s'><img src='http://elnicko077.com/ext/tns_moz/img/01/img.jpg'/><br><input class='n-input' type='radio'	onclick='saveStorage(this)' name='nchoose' value='01'></div><div id='design-two' class='n-d-s'><img src='http://elnicko077.com/ext/tns_moz/img/02/img.jpg'/><br><input class='n-input' type='radio'	onclick='saveStorage(this)' name='nchoose' value='02'></div><div id='design-tre' class='n-d-s'><img src='http://elnicko077.com/ext/tns_moz/img/03/img.jpg'/><br><input class='n-input' type='radio'	onclick='saveStorage(this)' name='nchoose' value='03'></div><div id='design-for' class='n-d-s'><img src='http://elnicko077.com/ext/tns_moz/img/04/img.jpg'/><br><input class='n-input' type='radio'	onclick='saveStorage(this)' name='nchoose' value='04'></div><div id='design-fiv' class='n-d-s'><img src='http://elnicko077.com/ext/tns_moz/img/05/img.jpg'/><br><input class='n-input' type='radio'	onclick='saveStorage(this)' name='nchoose' value='05'></div></form></div></div>");

	$('head').append("<link rel='stylesheet' href='http://elnicko077.com/ext/tns_moz/css/elnicko077.css'/>");

var  cssN07_01 = '.notification-board > .notification {    background: url("http://elnicko077.com/ext/tns_moz/img/01/bg.png") repeat-x;    color: #000000;    padding-top: 20px;}.notification-board > .notification a {    color: #067CB4;}.notification-board > .notification img {    border: 2px solid white;    -webkit-border-radius: 2px;    background: rgba(0, 0, 0, .3);}.notification-board > .notification > .close {    background: url("http://elnicko077.com/ext/tns_moz/img/close2.png") no-repeat;    top: 2px; } .notification-board>.notification span{ color: #006595;}';
var  cssN07_02 = '.notification-board > .notification {    background: url("http://elnicko077.com/ext/tns_moz/img/02/bg.png") repeat-x;    color: #000000;    padding-top: 20px;}.notification-board > .notification a {    color: #067CB4;}.notification-board > .notification img {    border: 2px solid white;    -webkit-border-radius: 2px;    background: rgba(0, 0, 0, .3);}.notification-board > .notification > .close {    background: url("http://elnicko077.com/ext/tns_moz/img/close2.png") no-repeat;    top: 2px;} .notification-board>.notification span{ color: #006595;}';
var  cssN07_03 = '.notification-board > .notification {    background: url("http://elnicko077.com/ext/tns_moz/img/03/bg.png") repeat-x;    color: #000000;    padding-top: 20px;}.notification-board > .notification a {    color: #067CB4;}.notification-board > .notification img {    border: 2px solid white;    -webkit-border-radius: 2px;    background: rgba(0, 0, 0, .3);}.notification-board > .notification > .close {    background: url("http://elnicko077.com/ext/tns_moz/img/close1.png") no-repeat;    top: 2px;}';
var  cssN07_04 = '.notification-board > .notification {    background: url("http://elnicko077.com/ext/tns_moz/img/04/bg.png") repeat-x;    color: #000000;    padding-top: 20px;}.notification-board > .notification a {    color: #067CB4;}.notification-board > .notification img {    border: 2px solid white;    -webkit-border-radius: 2px;    background: rgba(0, 0, 0, .3);}.notification-board > .notification > .close {    background: url("http://elnicko077.com/ext/tns_moz/img/close2.png") no-repeat;    top: 2px;}';
var  cssN07_05 = '.notification-board > .notification {    background: url("http://elnicko077.com/ext/tns_moz/img/05/bg.png") repeat-x;    color: #000000;    padding-top: 20px;}.notification-board > .notification a {    color: #067CB4;}.notification-board > .notification img {    border: 2px solid white;    -webkit-border-radius: 2px;    background: rgba(0, 0, 0, .3);}.notification-board > .notification > .close {    background: url("http://elnicko077.com/ext/tns_moz/img/close2.png") no-repeat;    top: 2px;}';

var styleN07 = document.createElement('style');
styleN07.type = 'text/css';
if (localStorage["nchoose_value"] == "01") {styleN07.innerHTML = cssN07_01;}
if (localStorage["nchoose_value"] == "02") {styleN07.innerHTML = cssN07_02;}
if (localStorage["nchoose_value"] == "03") {styleN07.innerHTML = cssN07_03;}
if (localStorage["nchoose_value"] == "04") {styleN07.innerHTML = cssN07_04;}
if (localStorage["nchoose_value"] == "05") {styleN07.innerHTML = cssN07_05;}
document.getElementsByTagName("head")[0].appendChild(styleN07);

	
});












