// ==UserScript==
// @name		Przyciski BBCode
// @description		Dodaje przyciski BBcode do wiadomości.
// @date		2009-12-05
// @version		4.1
// @namespace		http://userscripts.org/scripts/show/63517
// @author 		mikskape
// @include 		*menelgame.pl/messages/write*
// @license		http://creativecommons.org/licenses/by/3.0/de/	
// ==/UserScript==

var skrypt_nazwa = 'przyciski_bbcode';
var skrypt_msg = 'przyciki_bbcode_msg';
var skrypt_wersja = '4.1';
var skrypt_url = 'http://userscripts.org/scripts/source/63517.user.js'

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://mikskape.x10hosting.com/skrypty/version.xml', onload: function (source)
	{
		if (source.status == 200) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(source.responseText, 'application/xml');
		
		var wersja = dom.getElementsByTagName(skrypt_nazwa)[0].textContent;
		var msg = dom.getElementsByTagName(skrypt_msg)[0].textContent;
		if (wersja != skrypt_wersja) {
		alert(msg);
		window.location.href=skrypt_url;
		}
	}}
});
function removeElement( element ) {
	try {
    	element.parentNode.removeChild( element );
	} catch( error ){
		//
	}
}

function remove_iframe_adds() {
	try {
		var adds = document.getElementById('form1').getElementsByTagName('strong');
			removeElement(adds[1]);
		
	} catch( error ) {
		stack.push( error );
	}
}

function init() {
	remove_iframe_adds();
}

init();
window.addEventListener("load", init, false);

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
var idx = document.getElementsByName('f_did')[0].value;
var stronax=('http://menelgame.pl/messages/write/?reply=' + idx);
var stronaxxx=('http://www.menelgame.pl/messages/write/?reply=' + idx);
var stronaxx = document.location.href;
if (stronaxx==stronax) {
var ta = document.getElementsByTagName("td")[6];
} else {
if (stronaxx==stronaxxx) {
var ta = document.getElementsByTagName("td")[6];
} else {
var ta = document.getElementsByTagName("td")[8];
}
}
	ta.innerHTML += "&nbsp;";
var newth = document.createElement('input');
newth.type="button";
newth.value="b";
newth.setAttribute('style','font-weight: bold');
newth.setAttribute('onclick','javascript:addBBCode("b")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="i";
newth.setAttribute('style','font-style: italic;');
newth.setAttribute('onclick','javascript:addBBCode("i")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="u";
newth.setAttribute('style','text-decoration: underline;');
newth.setAttribute('onclick','javascript:addBBCode("u")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="Center";
newth.setAttribute('onclick','javascript:addBBCode("center")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="Link";
newth.setAttribute('onclick','javascript:addBBCode("url")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="Obraz";
newth.setAttribute('onclick','javascript:addBBCode("img")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="Lista";
newth.setAttribute('onclick','javascript:addBBCode("list")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="Cytat";
newth.setAttribute('onclick','javascript:addBBCode("quote")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="Marqee";
newth.setAttribute('onclick','javascript:addBBCode("marquee")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
var newth = document.createElement('input');
newth.type="button";
newth.value="Datki";
newth.setAttribute('onclick','javascript:addBBCode("ref")');
ta.insertBefore(newth, tra.getElementsByTagName('th')[4]);
ta.innerHTML += "<select class='dropdown' onchange='addBBCode(\"color\",this.value)'><option value='0'>Kolor</option><option value='black' style='color:black'>Czarny</option><option value='silver' style='color:silver'>Srebrny</option><option value='gray' style='color:gray'>Szary</option><option value='maroon' style='color:maroon'>Kasztanowy</option><option value='brown' style='color:brown'>Brązowy</option><option value='red' style='color:red'>Czerwony</option><option value='orange' style='color:orange'>Pomarańczowy</option><option value='yellow' style='color:yellow'>Żółty</option><option value='lime' style='color:lime'>Limonkowy</option><option value='green' style='color:green'>Zielony</option><option value='olive' style='color:olive'>Oliwkowy</option><option value='teal' style='color:teal'>Cyraneczkowy</option><option value='aqua' style='color:aqua'>Aqua</option><option value='blue' style='color:blue'>Niebieski</option><option value='navy' style='color:navy'>Granatowy</option><option value='purple' style='color:purple'>Purpurowy</option><option value='fuchsia' style='color:fuchsia'>Fuksjowy</option><option value='pink' style='color:pink'>Różowy</option><option value='white' style='color:white'>Biały</option></select> ";
var laenge = tr.length;
for (var x = 1; x<=laenge; x++)
{
var td = tr[x].getElementsByTagName('td');
var id1 = td[1].innerHTML.split('/profil/id:');
var id = id1[1].split('/"');
}
	if (document.location.href.indexOf("page=networkkommunikation") != -1)
		ta.innerHTML += "<br />";
	ta.innerHTML += "<br />";
	ta.parentNode.insertBefore(div,ta);
	if (document.location.href.indexOf("page=writemessage") != -1) {
		ta.parentNode.style.height="99%";
		GM_addStyle("select.dropdown{border:1px solid #000;background-color:#141E26;color:#848484}");
	}

})();