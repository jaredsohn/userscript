// ==UserScript==
// @name        submove
// @namespace   Timeline
// @include     https://karagarga.net/details.php?id=*
// @version     1
// @grant	 GM_xmlhttpRequest
// @version     1.3
// ==/UserScript==


var subStart = 'included:';
var subStart2 = 'Unknown if subtitles included<br />';
var subEnd = 'Add a link to subtitles';


var code = document.body.innerHTML;

if (code.indexOf(subStart) != -1) {
	var ref = subStart;
} else {
	var ref = subStart2;
}


var code2 = code.substr(code.indexOf(ref));
var end = code2.indexOf(subEnd);
var subText = code2.slice(ref.length, end);

if (subText == "") {subText = "non !";}  
	
subText = subText.replace('Lien vers les sous-titres :', '');
plop = document.getElementsByClassName("rowhead");
plop2 = plop[0].parentNode.parentNode.innerHTML;
plop[0].parentNode.parentNode.innerHTML =  "<tr><td class='heading' valign='top' align='right'>Sous-Titres</td><td>"+subText+"</td></tr>"+plop2;


