// ==UserScript==
// @name           Twelve Sands - Always Have Links
// @namespace    http://userscripts.org/scripts/show/32901
// @include      http://www.twelvesands.com/*
// @include      http://www.twelvesands.com/char.php?i=*
// @exclude      http://www.twelvesands.com/*.css*
// @exclude      http://www.twelvesands.com/chat*
// @exclude      http://www.twelvesands.com/
// @exclude      http://www.twelvesands.com/artifact.php*
// @exclude      http://www.twelvesands.com/char.php
// @exclude      http://www.twelvesands.com/char.php?a=*
// @exclude      http://www.twelvesands.com/recipe*
// @version      2.0

// ==/UserScript==

var menu = document.createElement("div");
menu.innerHTML = '<font size="-2">' +
'(<a href="char.php">Character Profile</a>)' +
'(<a href="char.php?a=ar">View your Artifacts</a>)' +
'(<a href="char.php?a=ma">Cast a Spell</a>)' +
'<br>' +
'(<a href="mail.php">View your Mailbox</a>)' +
'(<a href="char.php?a=ql">View your Quest Log</a>)' +
'<br>' +
'(<a href="recipe.php?t=1">Cook something</a>)' +
'(<a href="recipe.php?t=2">Craft something</a>)' +
'(<a href="char.php?a=t">Change your title</a>)' +
'</font>';
document.body.insertBefore(menu, document.body.firstChild);

