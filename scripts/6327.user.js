// ==UserScript==
// @name           Facebook Sponsored News Remover
// @author         Tosk
// @date           2006-11-11
// @version        1.0
// @namespace      http://www.tosker.net
// @description    Removes sponsored news in the news feed.
// @include        http://*.facebook.com/home.php?*
// ==/UserScript==

(function()
{
	var ttags = document.getElementsByTagName('span');

    //alert(ttags[0]);
	for (var i=0;i < ttags.length;i++)
		if (ttags[i].innerHTML.indexOf("Sponsored") > -1)
		{
			ttags[i].parentNode.parentNode.parentNode.parentNode.removeChild(ttags[i].parentNode.parentNode.parentNode);
			//ttags[i].parentNode.parentNode.insertBefore("<br /><br />",ttags[i]);
		}
    
})();
