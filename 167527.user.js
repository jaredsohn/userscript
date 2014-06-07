// ==UserScript== 
// @name			Livestream - Add Viewer count to Chat
// @version			1.0
// @description		Adds viewer count to chat popout.
// @include			http://www.livestream.com/*/chat?tab=chat-livestream
// ==/UserScript==

function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

function getStreamName()
{
 var thisUrl = document.location.href;
 var newUrl=thisUrl.replace("http://www.livestream.com/","");
 var uarray=newUrl.split("/");
 var StreamName=uarray[0];
 return StreamName;
}

function sendBack(jsonContent)
{
	var obj = JSON.parse(jsonContent);
	var d = obj.channel.currentViewerCount;
	if(d==1)
	{
		var x="<strong>"+d+"</strong> Viewer";
	}
	else
	{
		var x="<strong>"+d+"</strong> Viewers";
	}
	document.getElementById("viewer_count").innerHTML=x;
}

function reloadVC()
{
	var channel = getStreamName();
    var apiCallAddress = "http://x"+channel+"x.api.channel.livestream.com/2.0/info.json";
    //window.alert(apiCallAddress);
	var ret = null;
	ret = GM_xmlhttpRequest({
	  method: "GET",
	  url: apiCallAddress,
	  onload: function(res) {
		sendBack(res.responseText);
	  }
	});
}


addGlobalStyle("#viewer_count{background-color:#EEEEEE;text-align:center;border:1px solid #CCCCCC;font-weight:bold;position:absolute;z-index:9001;right:105px; bottom:0px; width:125px; height:20px;}");

var elmNewContent = document.createElement('div');
elmNewContent.id = 'viewer_count';
elmNewContent.appendChild(document.createTextNode(' '));
var topofpage = document.getElementById('channel-chat');
topofpage.parentNode.insertBefore(elmNewContent, topofpage);


var StartUp=reloadVC();
var myVar=setInterval(function(){reloadVC()},30000);