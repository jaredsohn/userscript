// ==UserScript==
// @name          Billard Aktuell WEI-Tisch
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Billard Aktuell WEI-Tisch: Zeigt den WEI-Tisch direkt in Forumsbeiträgen vom Billard Aktuell-Forum an.
// @include       http://*billard-aktuell.de/*
// ==/UserScript==

//2009-07-30

var strWEICode = '<div style=\"width:553px; height:360px;\">\n\t<object classid=\"clsid:166B1BCA-3F9C-11CF-8075-444553540000\"\n \t\t\tcodebase=\"http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,0,0\"\n \t\t\tid=\"pooltable\"\n \t\t\twidth=\"553\"\n \t\t\theight=\"360\">\n\t\t<param name=\"src\" value=\"pooltable2.dcr\">\n\t\t<param name=\"swRemote\" value=\"swSaveEnabled=\'true\' swVolume=\'true\' swRestart=\'true\' swPausePlay=\'true\' swFastForward=\'true\' swContextMenu=\'true\' \">\n\t\t<param name=\"swStretchStyle\" value=\"none\">\n\t\t<param name=\"bgColor\" value=\"#FFFFFF\"> \n\t\t<param name=\"sw1\" value=\"THE_WEI_STRING\">\n\n\t\t<embed src=\"pooltable2.dcr\" \n\t\t\t   sw1=\"THE_WEI_STRING\" \n\t\t\t   bgColor=\"#FFFFFF\"\n\t\t\t   width=\"553\" \n\t\t\t   height=\"360\" \n\t\t\t   swRemote=\"swSaveEnabled=\'true\' swVolume=\'true\' swRestart=\'true\' swPausePlay=\'true\' swFastForward=\'true\' swContextMenu=\'true\'\" \n\t\t\t   swStretchStyle=\"none\"\n \t\t\t   type=\"application/x-director\" \n \t\t\t   pluginspage=\"http://www.macromedia.com/shockwave/download/\">\n \t\t</embed>\n\t</object>\n</div>';

var allElements = document.getElementsByClassName('nav');
if (allElements) {
	for (var i = 0; i < allElements.length; i++) {
		var thisElement = allElements[i];
		if (thisElement.innerHTML.indexOf('_php') > -1) {
			thisElement.innerHTML += '<p/><a href=\"/wei.html\" onclick=\"window.open(\'wei.html\', \'_phpbbsmilies\', \'HEIGHT=370,resizable=yes,scrollbars=yes,WIDTH=590\');return false;\" target=\"_wei\" class=\"nav\">WEI Tisch</a>';
		}
	}
}



var allElements = document.getElementsByClassName('postbody');
if (allElements) {
	for (var i = 0; i < allElements.length; i++) {
		var thisElement = allElements[i];
		var myArray = thisElement.innerHTML.match(/START\((\n|\r|.)*?\)END/gim);
		if (myArray != null) {
			for (i = 0; i < myArray.length; i++) {
				var strWEIString = myArray[i];
				var strWEIReplacement = strWEIString.replace(/(START\(|\)END|<.*?>|\n|\r)/gim, '');
				thisElement.innerHTML = thisElement.innerHTML.replace(strWEIString, strWEICode.replace(/THE_WEI_STRING/gim, strWEIReplacement));
			}
		}
	}
}

/*
Der Objekt-Code, Escapen mit -> http://www.htmlescape.net/stringescape_tool.html
<div style="width:553px; height:360px;">
	<object classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000"
 			codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,0,0"
 			id="pooltable"
 			width="553"
 			height="360">
		<param name="src" value="pooltable2.dcr">
		<param name="swRemote" value="swSaveEnabled='true' swVolume='true' swRestart='true' swPausePlay='true' swFastForward='true' swContextMenu='true' ">
		<param name="swStretchStyle" value="none">
		<param name="bgColor" value="#FFFFFF">
		<param name="sw1" value="THE_WEI_STRING">

		<embed src="pooltable2.dcr"
			   sw1="THE_WEI_STRING"
			   bgColor="#FFFFFF"
			   width="553"
			   height="360"
			   swRemote="swSaveEnabled='true' swVolume='true' swRestart='true' swPausePlay='true' swFastForward='true' swContextMenu='true'"
			   swStretchStyle="none"
 			   type="application/x-director"
 			   pluginspage="http://www.macromedia.com/shockwave/download/">
 		</embed>
	</object>
</div>
*/
