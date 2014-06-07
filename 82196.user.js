// ==UserScript==
// @name           Tivibu - WebTVClient
// @description    Silverlight size fix
// @version        1.2
// @date           26.07.2010
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @include        http://webtvweb.ttnet.com.tr/WebClient/WebTVClient.aspx*
// @include        http://95.0.28.124/WebClient/WebTVClient.aspx*
// ==/UserScript==

var tivibu_obj = document.getElementById('WebTVClient');
if (tivibu_obj)
{
	if (tivibu_obj.width<940)
	{
		tivibu_obj.width=940;
	}
	if (tivibu_obj.height<600)
	{
		tivibu_obj.height=600;
	}
}

GM_registerMenuCommand("Set BG-Color to Black", function(){document.body.style.backgroundColor='#000000';});
GM_registerMenuCommand("Set BG-Color to White", function(){document.body.style.backgroundColor='#FFFFFF';});
