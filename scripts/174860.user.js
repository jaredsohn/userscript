// ==UserScript==
// @name FrankerFaceZ
// @namespace	FrankerFaceZ
// @include	*.twitch.tv/*
// @icon http://frankerfacez.storage.googleapis.com/icon32.png
// @updateURL http://userscripts.org/scripts/source/167158.user.js
// @version 1.33
// ==/UserScript==

var emoteList = new Array();
var emoteNameList = new Array();

init();

function init () {
    var username = getUsernameFromURL();
    if (username == "") {
        return;
    }

    var localCSSURL = 'http://commondatastorage.googleapis.com/frankerfacez%2F' + username + '.css';
    var globalCSSURL = 'https://dl.dropboxusercontent.com/u/81512/IFIXEDIT.css';
    var localCSS = '';
    var globalCSS = '';

    var newHTML         = document.createElement ('style');

    if (navigator.userAgent.indexOf('Firefox') == -1) {
        var http = new XMLHttpRequest();

        http.open("GET", localCSSURL, false);
        http.send();
        if (http.status == 200) {
            localCSS = http.responseText;
        }

        http.open("GET", globalCSSURL, false);
        http.send();
        if (http.status == 200) {
            globalCSS = http.responseText;
        }
    }
    else {

        var status = 0;
        var http = GM_xmlhttpRequest({
                  method: "GET",
                  url: localCSSURL,
                  synchronous: true,
                });
        cssData = http.responseText;
        if (http.status == 200) {
            localCSS = cssData;
        }
        
            var status = 0;
        http = GM_xmlhttpRequest({
                  method: "GET",
                  url: globalCSSURL,
                  synchronous: true,
                });
        cssData = http.responseText;
        if (http.status == 200) {
            globalCSS = cssData;
        }


    }

    var fullCSS = globalCSS + localCSS;

    newHTML.innerHTML = fullCSS;
    document.body.appendChild (newHTML);


    var arrayCount = 0;
    while (fullCSS.indexOf('{') != -1) {
        emoteList[arrayCount] = fullCSS.substring(1, fullCSS.indexOf('{')).trim();
        if (emoteList[arrayCount].indexOf('.') == 0) {
            emoteList[arrayCount] = emoteList[arrayCount].substring(1);
        }
        emoteNameList[arrayCount] = fullCSS.substring(fullCSS.indexOf('content:') + 10, fullCSS.indexOf(';') - 1).trim();
        if (fullCSS.indexOf('}') + 1 < fullCSS.length) {
            fullCSS = fullCSS.substring(fullCSS.indexOf('}') + 1);
            arrayCount++;
        }
        else {
            fullCSS = '';
        }
    }
    if (document.getElementById ('chat_line_list') != null)
	{
		    document.getElementById ('chat_line_list').addEventListener ("DOMNodeInserted", ParseChatLine, false);
	}
	else
	{
		window.addEventListener("DOMNodeInserted",function (event) {
			if (event.target.id == 'chat_line_list') {
				event.target.addEventListener ("DOMNodeInserted", ParseChatLine, false);
			}
		},false);
	}
}

function getUsernameFromURL ()
{
    var url = document.URL;
	
    var user = url.substring(url.indexOf('twitch.tv') + 9);
    if (user.length > 0) {
        user = user.substring(1);
    }
    if (user.indexOf('/') != -1) {
        user = user.substring(0, user.indexOf('/'));
    }
	
	user = user.toLowerCase();
	if (user == 'chat') {
		if (url.indexOf('&') != -1) {
			user = url.substring(url.indexOf('channel=') + 8, url.indexOf('&'));
		}
		else {
			user = url.substring(url.indexOf('channel='));
		}
	}
	
    return user;
}

function ParseChatLine (event)
{
	var chatLine;
	var element = event.target;
	var isArray = false;
	if (element.className != 'chat_line' && element.nodeType != 3) {
		isArray = true;
		element = element.getElementsByClassName('chat_line');
		if (element[0] == null) {return;}
		chatLine = element[0].innerHTML;
	}
	else if (element.nodeType != 3) {
		chatLine = element.innerHTML;
	}
	else {
		chatLine = element.nodeValue;
	}
    
    for (var i = 0; i < emoteList.length; i++) {
    var newLine = '<span class="' + emoteList[i] + ' emoticon"></span>';
    chatLine = chatLine.split(emoteNameList[i]).join(newLine);
	if (chatLine.indexOf(emoteNameList[i]) == -1 && chatLine.indexOf('<wbr>') != -1) {
		chatLineWbr = chatLine.split("<wbr>").join('');
		if (chatLineWbr.indexOf(emoteNameList[i]) != -1) {
			chatLine = chatLineWbr.split(emoteNameList[i]).join(newLine);
		}
	}
    }
	if (isArray) {
		if (chatLine != element[0].innerHTML) {
			event.target.getElementsByClassName('chat_line')[0].innerHTML = chatLine;
		}
	}
	else if (element.nodeType != 3) {
		if (chatLine != element.innerHTML) {
			event.target.innerHTML = chatLine;
		}
	}
	else {
		if (chatLine != element.nodeValue) {
			var parent = event.target.parentNode;
			parent.removeChild(event.target.parentNode.lastChild);
			parent.innerHTML += chatLine;
		}
	}
}