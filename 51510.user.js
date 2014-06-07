// <![CDATA[ 

// ==UserScript==
// @name           Expand Yahoo! Mail Ajax Viewing Pane
// @namespace      http://html-apps.com/greasemonkey/expandyahoomail
// @author         htmlapps
// @website        http://html-apps.com/
// @description    Makes the viewing pane wider.  Runs in the background for about two hours.
// @include        http://*mail.yahoo.com/*launch*
// @include        https://*mail.yahoo.com/*launch*
// @license        http://creativecommons.org/licenses/by-sa/3.0/us/
// @version        10
// @history        9 updated for new yahoo
// @history        8 updated for new yahoo
// ==/UserScript==

var timerLimit = (55*60*2);
function loadChecker()
{
	try
	{
		intInnerWidth = window.innerWidth;

		objAdPane = document.getElementById('theAd');
		if(!(null==objAdPane)) objAdPane.style.display='none';

		objView = document.getElementById('shellcontent');

		if(!(null==objView ))
		{
			objView.style.right='0px';
		}

		if(timerLimit-- > 0) objLoadChecker = window.setTimeout(loadChecker, 1100);
	}
	catch(e){}
}
objLoadChecker = window.setTimeout(loadChecker, 1000);

// ]]>