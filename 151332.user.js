// ==UserScript==
// @name 			The Buffalo News Workaround
// @id				thebuffalonews_workaround
// @description		Remove paywall for BuffaloNews.com
// @run-at			document-end
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// @include		*://www.buffalonews.*
// @version		0.2
// @author		concernedcitizen 
// ==/UserScript==


setInterval(function(){ document.getElementById('overlay').style.display = 'none'; document.getElementById('overlay-content').style.display = 'none'; console.log('done'); },5000);


