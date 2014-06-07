// ==UserScript==
// @name Partisan link for RSL
// @version 0.1.3
// @namespace dick.blanck@gmail.com
// @description On http://old.rsl.ru/view.jsp add to page "Поля MARC" magnet or direct link, if this 001 field found on http://lbc.rsl.ru/bib4md5/ database
// @author Richard Blanck
// @include http://old.rsl.ru/*
// 
// ==/UserScript==
//
// Need a Firefox 3.5 and above.
/*
This code is licenced under the GPL
www.fsf.org/licensing/licenses/gpl.html
*/
//GM_registerMenuCommand( 'Run script manualy Ctrl-l', partizanlink(), 'l', 'control');

partizanlinkRSL();

function partizanlinkRSL() {
var needDiv = document.getElementsByClassName( 'sf')[0]; // там только один div с таким классом
var needTable = needDiv.getElementsByTagName('table')[0]; // первая таблица
var TabElms = needTable.getElementsByTagName('td');
for(var i=0; i<TabElms.length; i++) {
	if(TabElms[i].innerHTML == '001') break; 	// поле 001
}
var ID = TabElms[i+1].innerHTML; 			// значение поля 001
//alert( ID);
/* получили идентификатор - теперь запросим MD5 */
var DisplayElem = document.getElementById( 'Partizan_link')
if( ! DisplayElem) { 
	DisplayElem = document.createElement( 'div');
	DisplayElem.setAttribute( 'id', 'Partizan_link');
	DisplayElem.setAttribute( 'style', 'float: right; margin-right: 15em;');
	needDiv.insertBefore( DisplayElem, needTable);
}
GM_xmlhttpRequest({
	method: "GET",
	url: 'http://lbc.rsl.ru/bib4md5/zg/gMD5.php?ID='+ID+'&server=RSL',
	onload: function(response) {
		//alert( response.responseText);
		if( response.responseText.length != 0 && response.responseText.substr(0, 5) != 'Error') {
			var MD5s = response.responseText.split("\n");
			for (var i=0; i < MD5s.length - 1; i++) {
				DisplayElem.innerHTML += "<a href='http://libgen.org/get?nametype=orig&md5="+MD5s[i]+"'><img src='http://lbc.rsl.ru/el/img/folder-link-icon.png' title='LibGen direct link' alt='LibGen direct link'></a>"+'&nbsp;&nbsp;'
				DisplayElem.innerHTML += "<a href='http://gen.lib.rus.ec/get?nametype=orig&md5="+MD5s[i]+"'><img src='http://lbc.rsl.ru/el/img/folder-link-icon.png' title='GenLibRusEc direct link' alt='GenLibRusEc direct link'></a>"+'&nbsp;&nbsp;'
				DisplayElem.innerHTML += "<a href='magnet:?xt=urn:tree:tiger:"+MD5s[i]+"'><img src='http://lbc.rsl.ru/el/img/magnet-blue-icon.png' title='DC++ magnet' alt='DC++ magnet'></a>"+'&nbsp;&nbsp;'
				DisplayElem.innerHTML += "<a href='http://libgen.org/book/index.php?md5="+MD5s[i]+"' target='_new'><img src='http://lbc.rsl.ru/el/img/world-link-icon.png' title='other links' alt='other links'></a>"+'<br>';
			}
		}
	}
});
}
