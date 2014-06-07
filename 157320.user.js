// ==UserScript==
// @name        Google Instant Disabler
// @namespace   http://userscripts.org/users/283528
// @description Disable Google Instant search-as-you-type
// @author      V Ronin
// @include     http://www.google.com/
// @include     http://www.google.it/
// @include     http://www.google.de/
// @include     http://www.google.co.uk/
// @include     http://www.google.fr/
// @include     http://www.google.es/
// @include     https://www.google.com/
// @include     https://www.google.it/
// @include     https://www.google.de/
// @include     https://www.google.co.uk/
// @include     https://www.google.fr/
// @include     https://www.google.es/
// @include     https://encrypted.google.com/
// @version     1.0
// ==/UserScript==
var CurrentUrl=window.location.href;
CurrentUrl=CurrentUrl.substring(0,CurrentUrl.length-1);
var LinkToClick
var Found=false;
if (window.find("click here to turn off Google Instant"))
{
	LinkToClick=new RegExp("href=\"(.+)\">Screen reader users, click here to turn off Google Instant.");
	Found=true;
}
else if (window.find("fare clic qui per disattivare Google Instant"))
{
	LinkToClick=new RegExp("href=\"(.+)\">Gli utenti che utilizzano lettori di schermo possono fare clic qui per disattivare Google Instant.");
	Found=true;
}
else if (window.find("klicken Sie hier zum Deaktivieren von Google Instant"))
{
	LinkToClick=new RegExp("href=\"(.+)\">Wenn Sie ein Bildschirmleseprogramm verwenden, klicken Sie hier zum Deaktivieren von Google Instant.");
	Found=true;
}
else if (window.find("click here to turn off Google Instant"))
{
	LinkToClick=new RegExp("href=\"(.+)\">Screen-reader users, click here to turn off Google Instant.");
	Found=true;
}
else if (window.find("cliquez ici pour désactiver la recherche instantanée Google."))
{
	LinkToClick=new RegExp("href=\"(.+)\">Si vous utilisez un lecteur d'écran, cliquez ici pour désactiver la recherche instantanée Google.");
	Found=true;
}
else if (window.find("desactivar Google Instant haciendo clic aquí."))
{
	LinkToClick=new RegExp("href=\"(.+)\">Los usuarios de lectores de pantalla pueden desactivar Google Instant haciendo clic aquí.");
	Found=true;
}
if (Found){
	var str = document.getElementsByTagName('body')[0].innerHTML;
	var str=str.match(LinkToClick)[1];
	str=str.substring(str.lastIndexOf("href"),str.length-1);
	str=str.replace("href=\"","");
	str=str.substring(0,str.indexOf("\""));
	while(str.indexOf("&amp;")>=0) str=str.replace("&amp;","&");
	window.location=CurrentUrl+str;
}