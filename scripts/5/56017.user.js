// ==UserScript==
// @name          Pageflakes Refresh
// @namespace     Refresh Pageflakes
// @description   New flakes!
// @include       http://pageflakes.com/Default.aspx
// @include       http://www.pageflakes.com/Default.aspx
// ==/UserScript==
document.body.style.overflow = "hidden";

var maxtime = 180000;
var ms = maxtime;
var rArr = new Array();
//var cleer = 1;
Countdown();

GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.pageflakes.com/GetJSON.ashx",
    onload: function(responseDetails) {
	if (responseDetails.status ==  200) {
	
		var pattern = /"id":"m[0-9]*/g;
		var result = null;
		while ((result = pattern.exec(responseDetails.responseText)) != null) {
		result = result[0].substring(6);
		if (rArr[result] != 1) rArr[result] = 1;
		}
	}
	else alert("Searching fail: "+responseDetails.statusText);
    }
});

function Countdown()
{
    if(ms>0)
    {
        document.title = "Pageflakes | " + ((ms/1000)) + "s";
		ms = ms-1000;
        window.setTimeout(Countdown, 1000);
    } else {
        document.title = "Pageflakes | Refreshing";
        //if (cleer > 10) window.location.reload('true');
		
		for (var akey in rArr) 
			window.location.href="javascript:$module('"+akey+"').refresh();";
        
		ms = maxtime;
        //cleer++;
        window.setTimeout(Countdown, 1000);
    }
}