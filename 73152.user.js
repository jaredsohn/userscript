// ==UserScript==
// @name           PopUpBlocker
// @namespace      uploaded.to
// @description    Blockiert PopUps
// @include        http://uploaded.to/*
// @copyright      2009+, Constantin Wenger aka SpeedProg (http://www.speedprog.tk)
// @author         Constantin Wenger aka SpeedProg
// @homepage       http://www.speedprog.tk
// @version        0.0.8
// ==/UserScript==
/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    see <http://www.gnu.org/licenses/> for the licensefile.
*/

if(location.hostname.indexOf("uploaded.to")!=-1){
	var jscript = document.createElement("script");
	var jscriptType = document.createAttribute("type");
	jscriptType.nodeValue = "text/javascript";
	jscript.setAttributeNode(jscriptType);
	jscript.innerHTML = 
	"function removePopUp(){"+
		"document.getElementById('hackLog').innerHTML = document.getElementById('hackLog').innerHTML + 'Stufe 2:<br>';"+
		"if(document.getElementsByName('download_form')[0].innerHTML.match(/winopen\\(\\);/)){"+
			"document.getElementById('hackLog').innerHTML = document.getElementById('hackLog').innerHTML + 'Ziel wurde gefunden!<br>onclick Attribut &uuml;berarbeiten.<br>';"+
			"document.getElementsByName('download_form')[0].innerHTML=document.getElementsByName('download_form')[0].innerHTML.replace(/winopen\\(\\);/,'');"+
			"if(!document.getElementsByName('download_form')[0].innerHTML.match(/winopen\\(\\);/)){"+
				"document.getElementById('hackLog').innerHTML = document.getElementById('hackLog').innerHTML + '<font color=\"green\">onclick Attribut erfolgreich &uuml;berarbeitet!<br>Button wurde aktiviert!</font><br>';"+
				"document.getElementById('download_submit').disabled=false;"+
			"}"+
		"}"+
		"else{"+
			"document.getElementById('hackLog').innerHTML = document.getElementById('hackLog').innerHTML + 'Ziel wurde nicht gefunden!<br>';"+
		"}"+
	"}";
	document.getElementsByTagName('head')[0].appendChild(jscript);
	var div =  document.createElement('div');
	var divId = document.createAttribute('id');
	divId.nodeValue = "hackLog";
	div.setAttributeNode(divId);
	document.getElementsByTagName('body')[0].insertBefore(div, document.getElementsByTagName('body')[0].firstChild);
	function wLog(msg){
		document.getElementById('hackLog').innerHTML = document.getElementById('hackLog').innerHTML + msg + '<br>';
	}
	wLog("Stufe 1:");
	if(document.getElementsByName("download_form")[0].innerHTML.match(/winopen\(\);/)){
		wLog("Ziel wurde gefunden!<br>Registriere Funktion f&uuml;r Ausf&uuml;hrung in 1sec.");
		window.setTimeout("removePopUp()", 1000);
	}
	else{
		wLog("Ziel wurde nicht gefunden!<br>Registriere f&uuml;r neuen Versuch in 3sec.");
		wLog(document.getElementsByName("download_form")[0].innerHTML + "<br>");
		window.setTimeout("removePopUp()", 3000);
	}
}