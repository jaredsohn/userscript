// ==UserScript==
// @name           No More Bias! Reloaded
// @namespace      http://www.erepublik.com/en/citizen/profile/1618260
// @include        http://economy.erepublik.com/*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

//URL settings
var currURL = location.href;
var arrURL = currURL.split('/');
BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';


// Reemplazando...
function replace_Lisa()
{
	GM_addStyle('.extended.entertainment_bg  {background-image:url("http://img824.imageshack.us/img824/9710/entertainmentjudsonmano.jpg"); background-position:center top; background-repeat:no-repeat; height:auto !important; min-height:670px;');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Lisa","Judson Manor");
}
function replace_Emma()
{
	GM_addStyle('.extended.work_bg  {background-image:url("http://img202.imageshack.us/img202/5429/work2g.jpg"); background-position:center top; background-repeat:no-repeat; height:auto !important; min-height:670px;');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Lisa","Judson Manor");
}
function replace_Lana()
{
	GM_addStyle('.extended.train_bg  {background-image:url("http://img541.imageshack.us/img541/8753/train2.jpg"); background-position:center top; background-repeat:no-repeat; height:auto !important; min-height:670px;');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Lisa","Judson Manor");
}
function replace_Gina()
{
	GM_addStyle('.extended.learn_bg  {background-image:url("http://img190.imageshack.us/img190/7307/learn2.jpg"); background-position:center top; background-repeat:no-repeat; height:auto !important; min-height:670px;');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Lisa","Judson Manor");
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