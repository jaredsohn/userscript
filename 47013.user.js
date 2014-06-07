// ==UserScript==
// @name           UW-Angel Timeout Override
// @namespace      mw
// @description    overrides timeout
// @include        https://uwangel.uwaterloo.ca/*
// ==/UserScript==

//unsafeWindow.nSessionTimeout = 3;
//GM_getResourceURL('https://uwangel.uwaterloo.ca/uwangel/Timeout/keepAlive.asp?secs=59&btnStayConnected=Stay+Connected');


//override
//location.href = "javascript:void( angelTimeoutWarning = function() { GM_getResourceURL('https://uwangel.uwaterloo.ca/uwangel/Timeout/uwangel/Timeout/default.htm'); GM_getResourceURL('https://uwangel.uwaterloo.ca/uwangel/Timeout/keepAlive.asp?secs=59&btnStayConnected=Stay+Connected'); setAngelTimeoutWarning(nSessionTimeout);}   )";

unsafeWindow.angelTimeoutWarning = function() { GM_getResourceURL('https://uwangel.uwaterloo.ca/uwangel/Timeout/uwangel/Timeout/default.htm'); GM_getResourceURL('https://uwangel.uwaterloo.ca/uwangel/Timeout/keepAlive.asp?secs=59&btnStayConnected=Stay+Connected'); unsafeWindow.setAngelTimeoutWarning(unsafeWindow.nSessionTimeout);} ;