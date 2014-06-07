// ==UserScript==
// @name       Auto-reload pages that suck up resources
// @namespace  com.kworthstudios.autoreload
// @version    1.5
// @description 
// @include     /^https?://.*facebook.com.?/
// @exclude		/^https?:\/\/creative\.ak\.fbcdn\.(com|net)\//
// @exclude		/^https?:\/\/external\.ak\.fbcdn\\.(com|net)\//
// @exclude		/^https?:\/\/photos-\w+\.ak\.fbcdn\.(com|net)\//
// @exclude		/^https?:\/\/platform\.ak\.fbcdn\.(com|net)\//
// @exclude		/^https?:\/\/profile\.ak\.fbcdn\.(com|net)\//
// @exclude		/^https?:\/\/(\w+\.)*static\.ak\.fbcdn\.(com|net)\//
// @exclude		/^https?:\/\/((\w+\.)*)\w+\.channel\.facebook\.(com|net)\//
// @exclude		/^https?:\/\/apps\.facebook\.(com|net)\//
// @exclude		/^https?:\/\/error\.facebook\.(com|net)\//
// @exclude		/^https?:\/\/(\w+\.)*static\.facebook\.(com|net)\//
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/\w+\/posts\//
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/ai/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/ajax/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/campaign/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/dialog/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/editaccount/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/editprofile/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/extern/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/friends/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/groups/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/help/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/home\.php\?sk=group_/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/login/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/logout/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/notifications/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/plugins/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/posted/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/reqs/
// @exclude		/^https?:\/\/\w+\.facebook\.(com|net)\/settings/

// @include		/^https?:\/\/.?feedly.com.?/

// @include		/^https?:\/\/www\.google\.com\/finance/
// @exclude		/^https?:\/\/www\.google\.com\/finance\/_/

// @copyright  2013+, ME
// ==/UserScript==

console.error(window.location);

var time = 0,
    timeout = 3600000,
    interval = 500;

function doWork() {

    // add div to show time idle
	var mins = Math.floor(( timeout - time ) / 60000),
        secs = Math.floor(( timeout - time - (mins * 60000) ) / 1000),
        div = document.getElementById( "timeIdleDiv" );
    
    if ( div === null || div === undefined ) {

        div = document.createElement( "div" );
        document.body.appendChild( div );
        div.setAttribute( "id", "timeIdleDiv" );

	if ( window.location.href.indexOf("finance") >= 0 ) {
            div.setAttribute( "style", "position:fixed;top:30px;left:5px;color:#000000;z-index:10000000;font-size:14px;");
	}
	else {
            div.setAttribute( "style", "position:fixed;top:11px;left:5px;color:#ffffff;z-index:10000000;font-size:14px;");
	}
        div.addEventListener("click", function(){
            window.location.reload();
        }, false);
    }
    
    div.innerHTML = "<b>Reload:</b> " + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
    
    time += interval;
    
    if ( time >= timeout ) {
        //console.error("reload");
        window.location.reload();
        return;
    }
}

/*
window.onmousemove = function() {
	//console.error( "mousemove");
    time = 0;
};
*/
// run ever hour if no activity
window.setInterval(doWork, interval);