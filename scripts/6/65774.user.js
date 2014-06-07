// ==UserScript==
// @name		Google Help Forum Hide Spam Responses
// @author		Erik Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	googleHelpForumHideSpamResponses
// @include		http://www.google.com/support/forum/p/*/thread?*
// @match		http://www.google.com/support/forum/p/*/thread?*
// @version		0.1
// ==/UserScript==

(function(){
	GM_addStyle((<><![CDATA[
		div#wpsf div.highlighted_followup{
			display:block;
		}
	]]></>).toString());
})();