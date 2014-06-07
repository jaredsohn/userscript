// ==UserScript==
// @name           Garry's Mod Code Folder Links
// @namespace      urn:user:AzraelUK:email:peter.bunyan@googlemail.com
// @description    Turn the folder names at the top into links
// @include        http://code.garrysmod.com/*
// @exclue		   http://code.garrysmod.com/*search=*
// ==/UserScript==

start = "<a href='http://code.garrysmod.com/?into="
middle = "'>"
end = "</a>"
place = document.getElementsByTagName('b')[1].innerHTML // fuck XPath
places = place.split("/")
string = ""
for(i=0, j=places.length; i<j; i++) {
	for(k = 0,a=new Array(i+1); k <= i; k++)
		a[k] = places[k]
		string = string + start + a.join("/") + middle + places[i] + end + '/'
}
document.getElementsByTagName('b')[1].innerHTML = string