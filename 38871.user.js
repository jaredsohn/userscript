// ==UserScript==
// @name           Remover Publidad Ebay / Remove Ebay Ads
// @namespace      Remove Ebay Ads
// @description    Remove Ebay Ads
// @include        http://cell-phones.shop.ebay.com/items/*
// @include        http://*.ebay.com/items/*
// @include        http://cgi.ebay.com/*
// ==/UserScript==
/*
Creado por DartLord
Es mi segundo script, es una modificación de 'Replace Google/Yahoo Ads', otra de mis pruebas
15-12-2008
*/


function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

var regex = /rtm_html*/;
var scripts = document.getElementsByTagName('body')[0];

if (!scripts) return; 
scripts = scripts.getElementsByTagName('div');
if (!scripts) return;

//var ad1 = 'rtm_html_184';
//var ad2 = 'rtm_html_234';

var len = scripts.length;
//alert(len);
	
for (var i = len-1; i >= 0; i--) {
	var f = scripts[i];
	var replace_text = '';
	
	 if(regex.test(f.id)){
	
		//alert(f.id);
		replace_text = '  ';
	}
	if (replace_text != '')
	{
		var ad_notice = document.createElement("div");
		f.parentNode.insertBefore(ad_notice, f);
		ad_notice.innerHTML = replace_text;
		ad_notice.className = 'removed-publicidad';
		f.parentNode.removeChild(f);
	}
}

addGlobalStyle("div.removed-publicidad, " +
			   " a.ad_origin:active { width: 100%; border: 0px solid black; text-align: center; color: black; background-color: transparent; font-weight: bold; text-decoration: none ! important; }");
