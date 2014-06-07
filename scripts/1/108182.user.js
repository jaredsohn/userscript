// ==UserScript== 
// @name        Spread the SL Post Love
// @author      LGG
// @namespace   SLPOSTLOVE
// @icon        http://img199.imageshack.us/img199/8739/loooovez.png
// @description Auto Loves Everything on the second life profiles pages <3
// @version     0.2 (26 July 2011)
// @license     GPL 2.0 
// @include     https://my.secondlife.com/*
// @include     http://my.secondlife.com/*
// ==/UserScript==

var love=true;//set to false if you want to unlove everything

var debug =0;//set to 3 to see debug
var wait = 500;

if (debug > 2) {
    my_debug_div = document.createElement('div');
    my_debug_div.innerHTML = '<div style="height: 200px; width: 500px; ' +
	     'background-color: #330000; z-index: 100; position: fixed;' +
	     'padding: 5px; ' +
	     'right: 10px; bottom: 10px;" id="my_debug_div">' +
	     '<p><a id="close_log">Close</a></p>' +
	     '<textarea style="width: 490px; height: 150px; font-size:75%;" id="lgg_log" readonly>' +
	     '</textarea>' +
	     '</div>';

    document.body.insertBefore(my_debug_div, document.body.firstChild);
    document.getElementById('close_log').addEventListener("click", toggle_lgg_log, true);
}

if (debug > 0) lgg_log('Current Location: ' + document.location);
setTimeout(init, wait);
function init() {
    //var html_tag = evaluate_xpath('.//html'); 
    lgg_log("Looking for stuff to love...");
	
	var stuffTOLove = evaluate_xpath('.//a[ @href[contains(.,"love")] and @class[contains(.,"toggle_love")] and @data-love[contains(.,"Love")] and .="Love"]');

	if(!love)
	{
		stuffTOLove = evaluate_xpath('.//a[ @href[contains(.,"love")] and @class[contains(.,"toggle_love")] and @data-love[contains(.,"Love")] and .="Unlove"]');
	}
	
	var mores= evaluate_xpath('.//a[ @href[contains(.,"feed?page=")] and @class[contains(.,"load_more")]]');
	if(mores.snapshotLength >0)
	{
		var more = mores.snapshotItem(0);
		more.addEventListener("click", function() {
			setTimeout(init,1200);
		}, false);

	}
		
	//<a href="/whirly.fizzle/feed?page=2" class="button load_more" data-remote="true" rel="next">More</a>
	var i = 0;
    if (stuffTOLove.snapshotLength < 1) return;
	for(i=0;i<stuffTOLove.snapshotLength;i++)
	{
		var thingToLove = stuffTOLove.snapshotItem(i);
		var LoveURL = thingToLove.getAttribute("href");
		LoveURL = document.location.hostname + LoveURL;
		lgg_log(LoveURL);
		
		/*		thingToLove.click();*/
		var e = document.createEvent('MouseEvents');
		e.initEvent('click',true,true); 
		thingToLove.dispatchEvent(e);
	}



}

function toggle_lgg_log() {
    var lgg_log = document.getElementById('my_debug_div');
    if (lgg_log.style.display != "none") {
        lgg_log.style.display = "none";
    } else {
        lgg_log.style.display = "block";
    }
}
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
function removeByElement(arrayName, arrayElement) {
    for (var i = 0; i < arrayName.length; i++) {
        if (arrayName[i] == arrayElement)
            arrayName.splice(i, 1);
    }
}
function evaluate_xpath(xpath_query) {
    if (debug >= 2) lgg_log(xpath_query);
    var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (debug >= 1) lgg_log('nodes returned: ' + nodes.snapshotLength);

    return nodes;
}

function lgg_log(log_string) {
    if (debug > 2) {
        var logspace = document.getElementById('lgg_log');
        logspace.value += log_string + "\n";
        logspace.scrollTop = logspace.scrollHeight;
    }

    GM_log(log_string);
}

function lgg_log_return(return_value) {
    if (return_value > 0) {
        lgg_log("Log successfully submitted. Bytes transferred: " + return_value);
    } else {
        lgg_log("Log could not be submitted.  Returned: " + return_value);
    }
}
