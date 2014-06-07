// ==UserScript==
// @name           Non-native Retweet
// @namespace      @jamespgilbert
// @include        http://twitter.com/*
// ==/UserScript==

unsafeWindow.realRT = function(txt)
{
        var status = document.getElementsByClassName("twitter-anywhere-tweet-box-editor")[0];
	status.value = txt.replace("_apos_", "'","g").replace("_quot_", "\"","g");
	window.scroll(0,0);
        status.focus();
}

document.addEventListener('DOMNodeInserted', function (e) {
	if (e.target.className == "stream-item") {
		var actions = e.target.getElementsByClassName("tweet-actions")[0];
                var unameelem = e.target.getElementsByClassName("tweet-screen-name")[0];
                var uname = unameelem.href + "";
                var content = e.target.getElementsByClassName("tweet-text")[0].textContent;
                uname = uname.split("/").pop();
		var realrt = document.createElement("a");
		realrt.id = "rt_" + uname + "_" + Math.ceil(Math.random() * 9999);
		realrt.innerHTML = "<a onclick=\"realRT('RT @" + uname + " " + content.replace("'", "_apos_", "g").replace("\"", "_quot_","g") + "')\" style='margin-left:8px'>Old Retweet</a>";
		actions.appendChild(realrt);
	}
}, false);
