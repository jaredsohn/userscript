// ==UserScript==
// @name           Twitter update status on meebo
// @namespace      http://matthewfl.com
// @include        http://www.meebo.com/*
// ==/UserScript==

var user = GM_getValue("username", false);
if( user === false ) {
    user = prompt("Enter you twitter username");
    GM_setValue("username", user);
}
    var time = 2*1000;
    var oldUpdate=false;
function update () {
    GM_xmlhttpRequest({
	method: "GET",
	url: "http://twitter.com/statuses/user_timeline/"+user+".json",
	onload: function (response) {
	    var j = JSON.parse(response.responseText);
	    for(var i=0;i<j.length;++i) {
		if(j[i].in_reply_to_user_id == null) {
		    if(j[i].text != oldUpdate) {
			time = 3*60*1000;
			oldUpdate = j[i].text;
			try {
			    unsafeWindow.meeboApp.setStatusMessage(j[i].text)
			} catch (e) {}
		    }
		    return;
		}
	    }
	}
    });
}

function ping () {
    time *= 1.25;
    if(time > 10*60*1000)
	time = 10*60*1000;
    if( unsafeWindow.gEventMgr.getState() == "im" )
	update();
    else
	time = 3*1000;
    setTimeout(ping, time);
}

if(top == window)
    ping();