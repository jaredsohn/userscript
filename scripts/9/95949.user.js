// ==UserScript==
// @name Partisan link
// @version 0.1.3
// @namespace dick.blanck@gmail.com
// @description On lbc.rsl.ru/el/ find some item with class=hash_code and transform it to magnet or direct link.
// @author Richard Blanck
// @include */el*
// 
// ==/UserScript==
//
// Need a Firefox 3.5 and above.
/*
This code is licenced under the GPL
www.fsf.org/licensing/licenses/gpl.html
*/
GM_registerMenuCommand( 'Run script manualy Ctrl-l', partizanlink(), 'l', 'control');

document.addEventListener("DOMSubtreeModified", partizanlink, false);
partizanlink();

function partizanlink() {
var ToType;
ToType = 'tree:tiger';
Tokenize( ToType);
ToType = 'MD5';
Tokenize( ToType);
}

function Tokenize( ToType) {
var Tokens = document.getElementsByClassName( ToType); 	// 
var Tokenss = new Array();
//alert('Length='+Tokens.length);
var l = Tokens.length;
if( l > 0) {
	var Token = '';
	for(var i=0; i<l; i++){
		//alert('i='+i+' Class='+Tokens[i].className);
		Token = Tokens[i].innerHTML.trim();
		switch( ToType) {
		case 'tree:tiger':
			Tokens[i].innerHTML = "<a href='magnet:?xt=urn:tree:tiger:"+Token+"'><img style='border: none; vertical-align: -0.2cm;' src='http://lbc.rsl.ru/el/img/magnet-blue-icon.png' title='DC++ magnet' alt='DC++ magnet'></a>";
			//Tokens[i].className = "DClink";
			break;
		case 'MD5':
			Tokens[i].innerHTML = "<a href='http://libgen.org/get?nametype=orig&md5="+Token+"'><img style='border: none; vertical-align: -0.2cm;' src='http://lbc.rsl.ru/el/img/folder-link-icon.png' title='LibGen direct link' alt='LibGen direct link'></a>";
			Tokens[i].innerHTML += "<a href='http://gen.lib.rus.ec/get?nametype=orig&md5="+Token+"'><img style='border: none; vertical-align: -0.2cm;' src='http://lbc.rsl.ru/el/img/folder-link-icon.png' title='GenLibRusEc direct link' alt='GenLibRusEc direct link'></a>";
			//Tokens[i].className = 'directlink';
			break;
		default:
		}
		//Tokens[i].style.visibility = "visible";
		Tokenss.push( Tokens[i]);
	}
	for(var i = 0; i < Tokenss.length; i++) {
		//alert('i='+i+' Class='+Tokenss[i].className);
		//Tokenss[i].style.visibility = "visible";
		Tokenss[i].style.display = "inline";
		Tokenss[i].className = 'partizanlink';
	}
}
}
