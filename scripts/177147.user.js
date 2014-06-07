// ==UserScript==
// @name        Opt in Ads for specific Youtube channel
// @description adds the uploader of the video to the URL so you can configure your AdblockPlus to whitelist certain channel you would like to support ----- to whitelist in AdblockPlus add a rule containing '@@|http*://www.youtube.com/watch*user=NAMEOFTHECHANNELHERE' (without quotation marks) ----- this is far from elegant but its a quick workaround
// @namespace   de.schippi
// @include     http*://www.youtube.com/watch*
// @version     1
// ==/UserScript==


var u = window.location.href;
if(u.search("user=") == -1){
	var cont = document.getElementById("watch7-user-header").innerHTML;
	var user=cont.replace(/.+\/user\//i,'').replace(/\?(?:.|\s)*/m,''); 
	window.location = u+"&user="+user;
}
