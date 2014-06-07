// ==UserScript==
// @name           CustomTwitter3
// @namespace      number23_cn
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
runOnTweets();

function runOnTweets(callback) {
    var datetime = function(unixTime) {
        var d = new Date(parseInt(unixTime));
        return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
	document.addEventListener("DOMNodeInserted", function(e) {
		var list = e.target.getElementsByClassName("_timestamp");
		if (list != null && list.length > 0) {
			for (var i = 0; i < list.length; i++) {
                e = document.createElement("span");
                e.className = "_timestamp";
                e.textContent = dateTime(list[i].getAttribute("data-time"));
                list[i].parentNode.appendChild(e);
			}
		}
	}, true);
}