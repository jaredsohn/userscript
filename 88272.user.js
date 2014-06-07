// ==UserScript==
// @name           Google Calendar Top Bar Toggler
// @namespace      arteg.info
// @include        *google.com/calendar*
// @version 2.0
// ==/UserScript==

	var TopBar = document.getElementById('topBar');
	function ToggleTopBar() {
	if (TopBar.style.display=="block") {
		TopBar.style.display="none";
		}
	else {
		TopBar.style.display="block";
	}
	}

	
	var Toggler = document.createElement('span');
	Toggler.addEventListener("click", ToggleTopBar, false);
	Toggler.innerHTML="Toggle the top bar";
	Toggler.style.cursor="pointer";
	Toggler.style.borderBottom="1px dashed blue";
	Toggler.style.color="blue";
	Toggler.style.position="absolute";
	Toggler.style.left="46%";
	document.getElementById('guser').appendChild(Toggler);
	
	TopBar.style.display="none";
	