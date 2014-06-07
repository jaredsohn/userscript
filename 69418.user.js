// ==UserScript==
// @name           Forum Tweets Post Beta
// @namespace      www.bungie.net
// @include        http://www.bungie.net/Forums/createpost.aspx?postID=*&act=reply
// @version	   0.5.6
// ==/UserScript==
function getCookie(name) {
var results = document.cookie.match(name + '=(.*?)(;|$)');
if (results)
return (unescape(results[1]));
else
return null;}

var bnetname = getCookie("BungieDisplayName").replace(/&nbsp;/g, " ");

var thread = encodeURI("http://www.bungie.net/Forums/posts.aspx?postID="+document.URL.substr(52,8));

function sendtweet() {
var text_raw_1 = document.getElementById('ctl00_mainContent_postForm_skin_body').value;
var text_raw_2 = text_raw_1.replace(/\[?b\]|\[\/b\]|\[u\]|\[\/u\]|\[i\]|\[\/i\]|\[url\]|\[\/url\]|\[quote\]|\[\/quote\]|\[url=|\]/g, "").replace("Posted by:","%23PostedBy");	
 	
        if(text_raw_2.length>60){
		var tweet = encodeURI(text_raw_2.slice(0,60)+"...");
	}
	
        else{
		var tweet = encodeURI(text_raw_2);}

	GM_xmlhttpRequest({
    method: "get",
    url: "http://apx.comlu.com/twitterforum.php?tweet="+tweet+"&bnetname="+bnetname+"&thread="+thread,
    onload: function(response)
    	{
        return;
    	}
	});
}
var submitpost = document.getElementById('ctl00_mainContent_postForm_skin_submitButton');
submitpost.addEventListener("click", sendtweet, true);

