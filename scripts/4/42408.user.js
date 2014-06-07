// ==UserScript==
// @name         Nexus War Message Box Controls Modification
// @namespace    http://nw.message.box.controls.modification/arundor
// @description  Moves the Nexus War message box size controls to the top of the message pane, so that they won't move every time the box is resized.
// @include      http://*nexuswar.com/map/*
// ==/UserScript==

//Find the original 'Messages' title.
var messwrap = document.getElementById('messwrap');
var oldHeader = messwrap.getElementsByTagName('h3')[0];

//Create HTML code for replacing the 'Messages' title with a new one that includes size controls in the right corner.
//CSS is new to me, I tried my best to follow good form and not to butcher the conventions of style, but I'm not sure how well I succeeded.
var newHeader = document.createElement("div");
newHeader.setAttribute('class', 'mtitle');
newHeader.innerHTML = '<table style="text-align: center; width: 100%"><tr>' +
	'<td style="text-align: left; width: 10%">Messages</td>' +
	'<td>&nbsp;</td>' +
	'<td style="width: 40px"><a id="b-mess-max" style="text-decoration: none; color:white; font-weight: normal; font-size:11px" href="javascript:maximizeMessages()">(max.)</a></td>' +
	'<td style="width: 40px"><a id="b-mess-min" style="text-decoration: none; color:white; font-weight: normal; font-size:11px" href="javascript:minimizeMessages()">(min.)</a></td>' +
	'<td style="width: 20px"><a id="b-mess-minus" href="javascript:shrinkMessages()"><img src="/r/skins/cobalt/i/ch/controls/pane-minus.gif" width="11" height="11" alt="" /></a></td>' +
	'<td style="width: 20px"><a id="b-mess-plus" href="javascript:growMessages()"><img src="/r/skins/cobalt/i/ch/controls/pane-plus.gif" width="11" height="11" alt="" /></a></td>' +
	'</tr></table>';
	
//Create a new 'filler' element that is blank and will replace the old size controls.
var controls = document.getElementById('messagecontrols');
var filler = document.createElement('div');
filler.setAttribute('id', 'messagecontrols');
filler.innerHTML = '&nbsp;';

if (oldHeader) {
	if (controls) {
		//Replace the old header with the new one that contains the size controls.
		oldHeader.parentNode.replaceChild(newHeader, oldHeader);
		//Get rid of the old controls, as they are now redundant.
		controls.parentNode.replaceChild(filler, controls);
	}
}
