// ==UserScript==
// @name           Theme Preview
// @namespace      Theme Preview
// @description    You can have your themes and eat them too! Select a theme and wallah!
// @include        http://*bungie.net/fanclub/*/Group/GroupEditor.aspx
// ==/UserScript==

var themes = document.getElementById("ctl00_MainContentArea_chapterSkin").getElementsByTagName("input"), i = 0;

for (i; i < themes.length; i++)
{
	themes[i].addEventListener("click",
		function() 
		{
			var themeValue = this.value; stylesheet = window.document.createElement('link');
			stylesheet.rel = 'stylesheet';
			stylesheet.type = 'text/css';
			if (themeValue == "Group_Community1")
				stylesheet.href = '/App_Themes/Group_Community1/Group_Com1.css';
			else if (themeValue == "Group_Community2")
				stylesheet.href = '/App_Themes/Group_Community2/Group_Com2.css';
			else if (themeValue == "Group_Simpleblack")
				stylesheet.href = '/App_Themes/Group_Simpleblack/Group_black.css';
			else if (themeValue == "Group_Simpleorange")
				stylesheet.href = '/App_Themes/Group_Simpleorange/Group_orange.css';
			else
				stylesheet.href = '/App_Themes/' + themeValue + '/' + themeValue + '.css';
			
			document.getElementsByTagName("head")[0].appendChild(stylesheet);
		}
, true);
}