// ==UserScript==
// @name           forumw
// @include        http://forumw.org/viewtopic.php?*
// ==/UserScript==
var str=document.body.innerHTML;
var f = str.match(/(H|h)ttp\:\/\/rapidshare.com\/files\/[0-9]{2,9}\/[a-zA-Z0-9\.\+_-]*\.(?:r(?:ar|[0-9]{2})|[0-9]{3})/g);
if(f.length > 0){
	for(var url in f){
		str = str.replace(f[url],"</a><a href="+f[url]+">"+f[url]+"</a>");
	}
	document.body.innerHTML = str;
}