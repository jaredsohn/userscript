// ==UserScript==
// @name          UserScript.org Instalar Script
// @version       1.0
// @namespace     zack0zack@gmail.com
// @description   Inserta opcion para Instalar directamente
// @include	  http://userscripts.org/
// @include	  http://userscripts.org/scripts
// @include	  http://userscripts.org/scripts?page=*
// @copyright     zack0zack@gmail.com
// ==/UserScript==


var td = document.getElementsByTagName('td');

for( var i = 0; i < td.length; i++ ){
 if ( td[i].className == 'script-meat' ){
	td[i].innerHTML = td[i].innerHTML.replace('</a>','</a><div id="install_script"><a href="' + td[i].firstElementChild.href.replace('/show/', '/source/') + '.user.js" class="userjs">Install</a><a href="/about/installing" class="help" title="how to use GreaseMonkey">How do I use this?</a></div>');
 }
}

