// ==UserScript==
// @name           Reddit Frontpage Comment Karma
// @namespace      tag:a_hal89@hotmail.com,2008-05-22:Ahal
// @description    Adds your comment karma to the reddit frontpage.
// @include        http://www.reddit.com/*
// ==/UserScript==

var spans = document.getElementsByTagName("span");
var username;
var karma;

for (var i = 0; i < spans.length; ++i){
	if (spans[i].className == "user"){
		karma = spans[i];
		username = karma.getElementsByTagName("a")[0].innerHTML;
		break;
	}
}

GM_xmlhttpRequest({

        method:"GET",

        url:'http://www.reddit.com/user/' + username,

        onload:function(result) {

       		var iframe = document.getElementById('historyFrame');

	    	if (!iframe) {

			iframe = document.createElement("iframe");

			iframe.setAttribute("id", "commentKarmaFrame");
			//iframe.setAttribute("style", "display:block;z-index:1002;position:fixed;overflow:auto;top:70px;background-color:white;left:5px;border:1px solid black;height:100%;width:100%");
			iframe.style.display = "none";

			iframe.addEventListener('load', function() { createIFrameBody(result.responseText); }, false);

			document.body.appendChild(iframe);
		}

        }

});

function createIFrameBody( text ){
	var iframe = document.getElementById("commentKarmaFrame");
	iframe.contentDocument.body.innerHTML = text;
	
	spans = iframe.contentDocument.getElementsByTagName("span")
	var sCount = 0;
	var commentKarma;
	for (var i = 0; i < spans.length; ++i){
		if(spans[i].className == "karma"){
			if(sCount == 1) {
				commentKarma = spans[i].innerHTML;
				break;
			}
			else sCount += 1;
		}
	}
	karma.getElementsByTagName("b")[0].innerHTML += " / " + commentKarma;
}