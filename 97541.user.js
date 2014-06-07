// ==UserScript==
// @name           Content Concealer
// @version        1.7.2
// @release        2011-9-10
// @author         Benjamin Harris
// @license        Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License
// @namespace      http://benjaminrharris.com/content/content-concealer
// @updateURL      http://userscripts.org/scripts/source/97541.meta.js
// @description    Conceal what you're ACTUALLY looking at within the websites you're SUPPOSED to be looking at.
// @include        *
// @run-at         document-start
// ==/UserScript==

function newContent()
{
	var customTitle = prompt("Please enter a title for your concealed panel:", "CCPanel");
	if (!customTitle) { customTitle = "CCPanel"; }
	var concealerPanel = document.createElement("div");
	var screenWidth = screen.availWidth - 25;
	var screenHeight = screen.availHeight - 275;
	var fixedDiv = '<style type="text/css"> #concealpanel { position: fixed; ' +
	'top: 30px; left: 0px; z-index: 99999; } #panelControlLink { ' + 
	'position: fixed; top: 0px; left: 0px; z-index: 99999; } </style>';
	var codeInsert = '<div id="ccpanelmassiveconstructparent"> <div id="ccpanelmassiveconstructchild"> <div id="panelControlLink"> <a href="#" id="toggleLink" onClick="var e = document.getElementById(\'concealpanel\'); if(e.style.display == \'block\') e.style.display = \'none\'; else e.style.display = \'block\';" title="' + customTitle +'"> ' + customTitle + 
	'</a> | <a href="#" style="color:red;" onClick="var ccparent = document.getElementById(\'ccpanelmassiveconstructparent\'); var ccchild = document.getElementById(\'ccpanelmassiveconstructchild\'); ccparent.removeChild(ccchild);" title="Close Panel">[X]</a> </div> <div id="concealpanel" style="display: none; background-color: white;"> ' + 
	'<div id="settingsPane"><table><tr><th colspan="6" style="text-decoration:underline;">SETTINGS</th></tr><tr><td><b>Panel width:</b></td><td><input type="button" value="+" onclick="var w = document.getElementById(\'concealediframe\'); w.width++; w.width++; w.width++; w.width++; w.width++; w.width++; w.width++; w.width++; w.width++; w.width++; document.getElementById(\'displaypanelwidth\').value = w.width;" /></td><td><input type="button" value="-" onclick="var w = document.getElementById(\'concealediframe\'); w.width -= 10; document.getElementById(\'displaypanelwidth\').value = w.width;" /></td><td><input id="displaypanelwidth" type="text" size="5" readonly="true" value="' + screenWidth + '" /></td><td><b> | </b></td><td><input type="button" value="Change panel name" onclick="var tl = document.getElementById(\'toggleLink\'); var newCustomTitle = prompt(\'Edit panel title\', tl.innerHTML); if (newCustomTitle !== null) { tl.innerHTML = newCustomTitle; tl.title = newCustomTitle; }" /></td></tr><tr><td><b>Panel height:</b></td><td><input type="button" value="+" onclick="var h = document.getElementById(\'concealediframe\'); h.height++; h.height++; h.height++; h.height++; h.height++; h.height++; h.height++; h.height++; h.height++; h.height++; document.getElementById(\'displaypanelheight\').value = h.height;" /></td><td><input type="button" value="-" onclick="var h = document.getElementById(\'concealediframe\'); h.height -= 10; document.getElementById(\'displaypanelheight\').value = h.height;" /></td><td><input id="displaypanelheight" type="text" size="5" readonly="true" value="' + screenHeight + '" /></td><td><b> | </b></td><td><input type="button" value="Reset panel size" onclick="document.getElementById(\'concealediframe\').width = ' + screenWidth + '; document.getElementById(\'concealediframe\').height = ' + screenHeight + '; document.getElementById(\'displaypanelwidth\').value = ' + screenWidth + '; document.getElementById(\'displaypanelheight\').value = ' + screenHeight + ';" /></td></tr></table></div> ' + 
	'<form name="browserForm"> ' + 
	'<input type="text" name="urlbox" onKeyPress="function disableEnterKey(e) { var key; if (window.event) { key = window.event.keyCode; } else { key = e.which; } return (key !== 13); } return disableEnterKey(event);" size="50" value="http://www.example.com">  <input type="button" ' + 
	'name="goButton" value="Go!" onClick="function gotoLink(form) { newURL = form.urlbox.value; if (newURL !== \'\') { if (newURL.slice(0, 7) !== \'http://\') { newURL = \'http://\' + newURL; } if (document.browserForm.proxy[4].checked === true) { newURL = \'http://anonymouse.org/cgi-bin/anon-www.cgi/\' + newURL; } else if (document.browserForm.proxy[2].checked === true) { newURL = \'http://ccproxy01.110mb.com/index.php?q=\' + window.btoa(newURL); } else if (document.browserForm.proxy[3].checked === true) { newURL = \'http://ccproxy02.110mb.com/index.php?q=\' + window.btoa(newURL); } else if (document.browserForm.proxy[1].checked === true) { newURL = \'http://ccproxy03.110mb.com/index.php?q=\' + window.btoa(newURL); } document.getElementById(\'concealediframe\').contentWindow.location.href = newURL; } form.urlbox.value = newURL; } gotoLink(this.form);"> <br /> ' + 
	'<b>Proxy:</b> &nbsp;&nbsp; <input type="radio" name="proxy" value="none" checked="checked" /> None &nbsp;&nbsp; <input type="radio" name="proxy" value="#1" /> #1 &nbsp;&nbsp; <input type="radio" name="proxy" value="#2" /> #2 &nbsp;&nbsp; <input type="radio" name="proxy" value="#3" /> #3 &nbsp;&nbsp; <input type="radio" name="proxy" value="#4" /> #4 ' + 
	'</form> <iframe id="concealediframe" src="" width="' + screenWidth + '" height="' + screenHeight + '"> </iframe> </div> </div> </div>';
	
	if (confirm("Do you want the panel to scroll with the page?") === true) {
		concealerPanel.innerHTML = fixedDiv + ' ' + codeInsert;
	}
	else {
		concealerPanel.innerHTML = codeInsert;
	}
	document.body.insertBefore(concealerPanel, document.body.firstChild);
}

window.addEventListener("keydown", shortcutHandler, false);

if (window === window.top) {
	// Add "add panel" option to the menu
	GM_registerMenuCommand("Add New Concealed Panel", newContent, "p");
}

function shortcutHandler(event) {
	// Keyboard shortcut "ctrl+alt+p"
	if (event.ctrlKey && event.altKey && event.keyCode == 80 && window == window.top) {
		newContent();
	}
}