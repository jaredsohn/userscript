// ==UserScript==
// @name			garrysmod wiki theme reversion
// @author			Pugsworth
// @version                     1.1
// @description		reverts the wiki theme for wiki.garrysmod.com
// @include			http://wiki.garrysmod.com*
// @include			https://wiki.garrysmod.com*
// @run-at 			document-start
// ==/UserScript==

try
{
	var url = document.location.href;

	if(!url.match("useskin\=monobook"))
	{
		if(url.match("\\?"))
		{
			document.location = url + "&useskin=monobook";
		}
		else
		{
			document.location = url + "?useskin=monobook";
		}
	}
}
catch(err)
{
	console.error(err);
}