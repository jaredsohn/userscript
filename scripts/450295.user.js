// ==UserScript==
// @name       Uncheck email me by default  
// @version    1.0
// @description Unchecks the "Email me" box by default  
// @match      http://www.physicsoverflow.org/*
// @match      http://physicsoverflow.org/*
// @cchrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/layout/default/images/filesave.pngopyright  WTFPL, http://wtfpl.net 
// ==/UserScript==
var po-qa-notifier = document.getElementsByName("a_notify");
$(po-qa-notifier).attr("value","0"); 
