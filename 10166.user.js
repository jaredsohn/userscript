// ==UserScript==
// @name           Add Reply Button to Fanfou
// @namespace      luosheng
// @description    为饭否的留言添加一个回复键。
// @include        http://fanfou.com/home
// ==/UserScript==

var streamDiv = document.getElementById("stream");
var list = streamDiv.childNodes[1];

document.getElementById('update').childNodes[1].childNodes[3].childNodes[1].id = "replyBox";

for (var i = 0; i < list.childNodes.length; i++) {
	liElem = list.childNodes[i];
	if (liElem.className.indexOf("sys") == -1) {
	    username = liElem.childNodes[1].text;
	    liElem.appendChild(document.createTextNode(" "));
	    liElem.appendChild(createReplyButton(username));
	}
}

function createReplyButton(to) {
    var span = document.createElement("span");
    span.className = "op";
    span.innerHTML = '<a href="javascript:void(0)" onclick="' + 
        "document.getElementById('replyBox').value = '@'+'" + to + " '; document.getElementById('replyBox').focus()" +
        '">回复</a>';
    return span;
}