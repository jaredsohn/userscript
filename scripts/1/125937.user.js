// ==UserScript==
// @author			Robert Gomes
// @name			AIUB Remember Password
// @namespace   	        http://www.aiub.edu/app/login.aspx
// @description 	        The browser will ask the user whether to remember username/password or not
// @match   		        http://www.aiub.edu/App/Login.aspx
// @version     	        2.6.0
// @updateURL		        https://userscripts.org/scripts/source/125937.meta.js
// @downloadURL 	        https://userscripts.org/scripts/source/125937.user.js
// @run-at			document-end
// ==/UserScript==

for(i=0;i<document.getElementsByClassName('FlatTextBox').length;i++)
{
	document.getElementsByClassName('FlatTextBox')[i].autocomplete="on";
}