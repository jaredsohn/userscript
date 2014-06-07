// ==UserScript==
// @name           Lelombrik.net - "Fichier Suivant" & "Fichier précédent" fix
// @namespace      http://pas-bien.net
// @description    La navigation se fait dans les fichiers pas dans les catégories.
// @include        http://www.lelombrik.net/videos/*/*.html
// @include        http://www.lelombrik.net/images/*/*.html
// @include        http://www.lelombrik.net/jeux/*/*.html
// @include        http://www.lelombrik.net/animations/*/*.html
// @include        http://www.lelombrik.net/sons/*/*.html
// @include        http://www.lelombrik.net/loops/*/*.html
// @include        http://www.lelombrik.net/fan-club/*/*.html
// @include        http://www.lelombrik.net/grease-monkey-script/*/les-pandas-sont-des-cons.html
// ==/UserScript==

var td = document.getElementsByClassName('case_fichier')[0];
var ereg = /^http:\/\/www\.lelombrik\.net\/[a-z-]+\/([0-9]+)\/.*\.html$/;
var match = ereg.exec(document.location);
var num = parseInt(match[1],10);
//alert(div);
var div = document.createElement('div');
div.setAttribute('style', 'text-align: center; margin: 15px;');
div.innerHTML = '<a href="http://www.lelombrik.net/grease-monkey-script/'+(num+1)+'/les-pandas-sont-des-cons.html">« Fichier plus récent</a>'
	+' | <a href="http://www.lelombrik.net/grease-monkey-script/'+(num-1)+'/les-pandas-sont-des-cons.html">Fichier plus vieux »</a>';
for(i = 0 ; i < td.childNodes.length ; i++)
{
	if(td.childNodes[i].nodeType == 1)
	{
		td.insertBefore(div,td.childNodes[i]);
		break;
	}
}
