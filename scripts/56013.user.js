// ==UserScript==
// @name           Xbox Live Messages
// @namespace      Xbox Live Messages
// @description    View how many Xbox Live Messages you have straight from Bungie.net.
// @include        http://*bungie.net/*
// ==/UserScript==

GM_xmlhttpRequest ({
    method: "GET",
    url: "http://live.xbox.com/en-US/Messages",
    headers: {
        "User-agent": "Mozilla/5.0",
        "Accept": "text/html",
    },
    onload: function (response){
        var doc = document.implementation.createDocument ("", "", null);
        var html = document.createElement ("html");
        html.innerHTML = response.responseText;
        doc.appendChild (html);
        var bxMessages = document.getElementById('xblMessagesCount'),
	xblMessages = doc.getElementsByClassName('message-count').item(0);
        if (!xblMessages)
	{
		bxMessages.href = 'https://live.xbox.com/Account/Signin';
                bxMessages.className = "inactive";
		bxMessages.textContent = '!';
	}
	else
	{
		if (!xblMessages.textContent == "")
			bxMessages.textContent = xblMessages.textContent;
		else
			bxMessages.textContent = "0";
	}
    }
});

var bMessages = document.getElementsByClassName('messages').item(0), xMessages = document.createElement('li');
xMessages.className = 'xblMessages';
xMessages.innerHTML = '<a id="xblMessagesCount" href="http://live.xbox.com/en-US/Messages" target="_blank"></a>';
bMessages.parentNode.insertBefore(xMessages, bMessages.nextSibling);
GM_addStyle("li.xblMessages a { background: url(http://www.xbox.com/Shell/images/favicon.ico) no-repeat; color: #96CB35; font-size: 11px; padding: 2px 0px 0px 21px; margin-left: 8px; } li.xblMessages a:hover { color: #FFFFFF; } li.xblMessages a.inactive { font-size: 13px; color: #C00000; } li.xblMessages a.inactive:hover { color: #FFFFFF; }");

// Poop.