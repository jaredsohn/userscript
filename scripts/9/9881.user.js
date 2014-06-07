// ==UserScript==
// @name           Orkut Pending Friend Request Deleter
// @namespace      http://www.devilsworkshop.org/2007/04/03/orkut-scrap-deleter-script-anti-flooding/
// @description    If due to some scripts or any other reason u have lots of pending friends request, then this is the best script for you!
// @include        http://www.orkut.*/Friends.aspx?show=pendingFriends*
// ==/UserScript==


window.addEventListener(
	'load',
	function() {
	
window.location.href = 'javascript: _selectAll(true); var d=document.forms["f"]; var e; e=document.createElement("input"); e.name="Action.removeFriends";  e.type="hidden"; e.value=""; d.appendChild(e); d.submit();';
//end
	},

	true);


