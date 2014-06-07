// ==UserScript==
// @name           Erepublik Fix v2.0 BETA
// @namespace      http://www.erepublik.com/en/citizen/profile/1309629
// @include        http://economy.erepublik.com/*
// @require		     http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

//Special thanks to JCFC http://www.erepublik.com/en/citizen/profile/1618260
//who wrote the original version of this greasemonkey script http://userscripts.org/scripts/show/81311

//URL settings
var currURL = location.href;
var arrURL = currURL.split('/');
BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';


// Reemplazando...
function replace_Lisa()
{
	GM_addStyle('.extended.entertainment_bg  {background-image:url("http://erepfix.0sites.net/fixedimages/entertainment3.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Lisa","James Preston");
}
function replace_Emma()
{
	GM_addStyle('.extended.work_bg  {background-image:url("http://erepfix.0sites.net/fixedimages/work3.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Emma","Cody Maxwell");
}
function replace_Lana()
{
	GM_addStyle('.extended.train_bg  {background-image:url("http://erepfix.0sites.net/fixedimages/train3.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Lana","Ryan Stevens");
}
function replace_Gina()
{
	GM_addStyle('.extended.learn_bg  {background-image:url("http://erepfix.0sites.net/fixedimages/learn3.jpg") !important;');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Gina","Jake Bauman");
}

// Por si lo necesito xD
function MsgBox (textstring) {
alert (textstring) }

//La función principal
function Main() {

	var subURL = currURL.substr(BASE_URL.length);
	LOCALE = subURL.substring(0, 2) + '/';
	BASE_URL += LOCALE;
	subURL = currURL.substr(BASE_URL.length);
	
	//Acá irían las página con imágenes para reemplazar
	var pagesFunctions = [
		//{p: 'badges',	 	f: ModifyTools},
		//{p: 'rss_menu',  	f: ModifyTools},
		{p: 'work',			f: replace_Emma},
		{p: 'train',		f: replace_Lana},
		{p: 'study',		f: replace_Gina},
		{p: 'entertain',	f: replace_Lisa}
	];
	
	pagesFunctions.forEach(function(v) {
		if ((subURL.substr(0, v.p.length) == v.p))
			v.f();
			});	
};

//Llamando a la función...
window.addEventListener('load',Main(), false);