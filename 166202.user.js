// ==UserScript== 
// @name			J.TV Viewers in Chat
// @version			1.1
// @description		Adds viewer count to chat popout.
// @include			*justin.tv/chat/*
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

function getParam ( sname )
{
  var params = location.search.substr(location.search.indexOf("?")+1);
  var sval = "";
  params = params.split("&");
    // split param and value into individual pieces
    for (var i=0; i<params.length; i++)
       {
         temp = params[i].split("=");
         if ( [temp[0]] == sname ) { sval = temp[1]; }
       }
  return sval;
}


function sendBack(jsonContent)
{
	var obj = JSON.parse(jsonContent);
	var d = obj.viewers_count;
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
	var channel = getParam("channel");
	var ret = null;
	ret = GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://api.justin.tv/api/stream/summary.json?channel="+channel,
	  onload: function(res) {
		sendBack(res.responseText);
	  }
	});
}


addGlobalStyle("#viewer_count{background-color:#EEEEEE;text-align:center;border:1px solid #CCCCCC;font-weight:bold;position:absolute;z-index:1;left:1px; width:125px; height:20px;}");

var elmNewContent = document.createElement('div');
elmNewContent.id = 'viewer_count';
elmNewContent.appendChild(document.createTextNode(' '));
var topofpage = document.getElementById('dimensions_warning');
topofpage.parentNode.insertBefore(elmNewContent, topofpage);


var StartUp=reloadVC();
var myVar=setInterval(function(){reloadVC()},30000);