// ==UserScript==
// @name           ETI Topic Title on Menubar
// @namespace      pendevin
// @description    Puts a topic's title on the fancy new floating menubar
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// ==/UserScript==

var string=document.getElementsByClassName('window-header-title')[0].textContent;
string=string.substring(string.indexOf(' > ')+3);

var title=document.createElement('span');
title.textContent=string;
title.id='topic-title';
document.getElementsByClassName('menubar')[0].appendChild(title);

var css='\
		#topic-title{\n\
			padding:2px 12px 2px 8px;\n\
			font-size:12px;\n\
			float:right;\n\
		}\n\
		\n\
	';
GM_addStyle(css);