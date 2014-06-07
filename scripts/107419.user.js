// 2012-03-08
// ==UserScript==
// @name  Urdu Font Changer
// @version 2.2.2
// @copyright 2011+, Kashif Iqbal Khan (kashiif@gmail.com)
// @license (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @description   Changes font of the DW Urdu and VOA News urdu websites
// @updateURL http://userscripts.org/scripts/source/107419.meta.js
// @include  http://*.dw-world.de/*
// @include  http://dw-world.de/*
// @include  http://*.dw.de/*
// @include  http://dw.de/*
// @include  http://www.voanews.com/urdu/*
// ==/UserScript==
// Credits: Awais Athar (BBC urdu Font Changer)

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function isApplicable()
{
	if (document.location.href.indexOf('/urdu') < 0)
	{
		var language = document.evaluate(
				"//head/meta[@name='language' and @content='ur_PK']",
				document,
				null,
				XPathResult.ANY_UNORDERED_NODE_TYPE,
				null);
				
		if (language.singleNodeValue==null) {return false;}
		
		return true;
	}
	return true;
}

var site = document.location.host;
var urduFonts = '"Jameel Noori Nastaleeq", "Alvi Nastaleeq v1.0.0","Alvi Nastaleeq","Fajer Noori Nastalique", Tahoma !important';

if (site.indexOf('voanews') >= 0)
{
	addGlobalStyle('body,a, h1, h2, h3, h4, h5, h6, th, div, input[type="text"], span, label, button, textarea  { font-family: '+ urduFonts+'; } ');
}
else if (site.indexOf('dw-world') >= 0 || site.indexOf('dw.de') >= 0)
{
	if (isApplicable())
	{
		// addGlobalStyle('body,a, b, strong, h1, h2, h3, h4, h5, h6, th, div, div.le div b, div.le div, div.le a, input[type="text"], select.input, textarea, div.col3 p, div.col4 p, .longText  { font-family: '+ urduFonts+'; } ');
		addGlobalStyle('body,a, b, strong, h1, h2, h3, h4, h5, h6, th, div, p, input[type="text"], select.input, textarea  { font-family: '+ urduFonts+'; } ');	
	}
}