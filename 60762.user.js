// ==UserScript==
// @name           Sendlabs On Green
// @namespace      http://www.sendlabs.com
// @description    Sendlabs reskin in a greenish mannor.
// @version        0.0.3
// @require        http://sizzlemctwizzle.com/gm_config_updater.php?id=60762
// @include        http://sl7.sendlabs.com/admin/index.php*
// ==/UserScript==



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
	'body{background-color:#FFF;background-image:none;}'+
	'#headerMenu li.dropdown, #headerMenu ul li ul, #headerMenu li li a {background-color:#5E9118;}'+
	'.menuBar {border-bottom:7px solid #5E9118;}'+
	'.ContentContainer {border:1px solid #FFF;margin:0;}'+
	'#headerMenu ul li ul li{background-color:#70AC00;}'+
	'#headerMenu ul li ul li, #headerMenu li li a {background-image:none !important;}'+
	'#headerMenu li li a:hover, .MenuText {color:#CFC;}'+
	'.Heading1{color:#5E9118;}'
);