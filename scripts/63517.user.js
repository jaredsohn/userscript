// ==UserScript==
// @name			Przyciski BBCode
// @description		Dodaje przyciski BBCode.
// @date			2009-12-05
// @version			4.2
// @namespace		http://userscripts.org/scripts/show/63517
// @author 			mikskape
// @include 		http://www.menelgame.pl/messages/write*
// ==/UserScript==

var s_wersja = '4.2';
var s_info = 'http://userscripts.org/scripts/show/63517';
var s_url = 'http://userscripts.org/scripts/source/63517.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Przyciski BBCode". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});

function usun( element ) {
	try {
    	element.parentNode.removeChild( element );
	} catch( error ){
		//
	}
}

(function(){

	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addBBCode() {' +
		'var tag = arguments[0];' +
		'var value = arguments[1];' +
		'var str1;' +
		'if (value) {' +
			'if (value=="0") return;' +
			'str1 = "[" + tag + "=" + value + "]";' +
		'} else {' +
			'str1 = "[" + tag + "]";' +
		'}' +
		'var str2 = "[/" + tag + "]";' +
		'var message = document.getElementsByName("f_text")[0];' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'var seltext = rng.text;' +
			'rng.text = str1 + seltext + str2;' +
			'rng.collapse(false);' +
			'rng.move("character",-str2.length);' +
			'rng.moveStart("character",-seltext.length);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var seltext = message.value.substring(start,message.selectionEnd);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str1 + seltext + str2 + endtext;' +
			'message.selectionStart = start + str1.length;' +
			'message.selectionEnd = start + str1.length + seltext.length;' +
		'}' +
		'message.focus();' +
	'}';
	var form = document.getElementsByTagName("td")[0];
	form.parentNode.insertBefore(script,form);
var tra = document.getElementsByTagName('td')[5];
if (document.location.href.indexOf("http://www.menelgame.pl/messages/write/?reply=") != -1){
var ta = document.getElementsByTagName("td")[6];
var strong = document.getElementById('form1').getElementsByTagName('strong');
usun(strong[1]);
var minoder = tra.getElementsByTagName('th');
var minode = minoder[4];
} else if (document.location.href.indexOf("http://www.menelgame.pl/messages/write/?to=") != -1){
var ta = document.getElementsByTagName("td")[8];
var strong = document.getElementById('form1').getElementsByTagName('strong');
usun(strong[1]);
var minoder = tra.getElementsByTagName('th');
var minode = minoder[4];
} else if (document.location.href=="http://www.menelgame.pl/messages/write/") {
var ta = document.getElementsByTagName("td")[8];
var strong = document.getElementById('form1').getElementsByTagName('strong');
usun(strong[1]);
var minoder = tra.getElementsByTagName('th');
var minode = minoder[4];
}
	ta.innerHTML += "&nbsp;";
var newth = document.createElement('input');
newth.type="button";
newth.value="b";
newth.setAttribute('style','font-weight: bold');
newth.setAttribute('onclick','javascript:addBBCode("b")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="i";
newth.setAttribute('style','font-style: italic;');
newth.setAttribute('onclick','javascript:addBBCode("i")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="u";
newth.setAttribute('style','text-decoration: underline;');
newth.setAttribute('onclick','javascript:addBBCode("u")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="Center";
newth.setAttribute('onclick','javascript:addBBCode("center")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="Link";
newth.setAttribute('onclick','javascript:addBBCode("url")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="Obraz";
newth.setAttribute('onclick','javascript:addBBCode("img")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="Lista";
newth.setAttribute('onclick','javascript:addBBCode("list")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="Cytat";
newth.setAttribute('onclick','javascript:addBBCode("quote")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="Marquee";
newth.setAttribute('onclick','javascript:addBBCode("marquee")');
ta.insertBefore(newth, minode);
var newth = document.createElement('input');
newth.type="button";
newth.value="Datki";
newth.setAttribute('onclick','javascript:addBBCode("ref")');
ta.insertBefore(newth, minode);
ta.innerHTML += "<select class='dropdown' onchange='addBBCode(\"color\",this.value)'><option value='0'>Kolor</option><option value='black' style='color:black'>Czarny</option><option value='silver' style='color:silver'>Srebrny</option><option value='gray' style='color:gray'>Szary</option><option value='maroon' style='color:maroon'>Kasztanowy</option><option value='brown' style='color:brown'>Brązowy</option><option value='red' style='color:red'>Czerwony</option><option value='orange' style='color:orange'>Pomarańczowy</option><option value='yellow' style='color:yellow'>Żółty</option><option value='lime' style='color:lime'>Limonkowy</option><option value='green' style='color:green'>Zielony</option><option value='olive' style='color:olive'>Oliwkowy</option><option value='teal' style='color:teal'>Cyraneczkowy</option><option value='aqua' style='color:aqua'>Aqua</option><option value='dodgerblue' style='color:dodgerblue'>Dodgerblue</option><option value='blue' style='color:blue'>Niebieski</option><option value='navy' style='color:navy'>Granatowy</option><option value='purple' style='color:purple'>Purpurowy</option><option value='fuchsia' style='color:fuchsia'>Fuksjowy</option><option value='pink' style='color:pink'>Różowy</option><option value='white' style='color:white'>Biały</option></select><br/>";
})();