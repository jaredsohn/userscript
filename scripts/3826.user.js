// ==UserScript==
// @name         viki.paticik arama
// @namespace     farkob aka queen
// @description  paticik vikide kolay arama
// @include       http://viki.paticik.com/menu.php
// ==/UserScript==

var cibik = '<form name=\"form1\" action=baslik.php method=get target=\"vikibaslik\"><input tabindex=1 type=text name=iclink size=20><input tabindex=4 type=submit accesskey="s" value=" Ara(Alt+S) "></form>';
var my_banner = document.createElement("div");
my_banner.innerHTML = '<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #F0903F; color: #000000;">' +
	'<p style="margin:0px;padding: 5px;text-align:center;">' +cibik+
	'</a>' +
	'</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin

document.body.style.margin = '0px';