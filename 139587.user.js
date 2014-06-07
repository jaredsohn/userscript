// ==UserScript==
// @name        CEF Text Encoder - By Fafaffy
// @namespace   Encode Text
// @include        http://forum.cheatengine.org/posting.php*
// @include        http://forum.cheatengine.org/viewtopic.php*
// @version     1
// ==/UserScript==
var source = document.body.innerHTML;
var newString;
var str_out;
var reg = /!~\d*/g;
var result;
var num;
var url = new RegExp("http://forum.cheatengine.org/posting.php*");

while ((result = reg.exec(source)) != null) {
    newString = result.toString().substr(2);
    str_out = "";
	for (i = 0; i < newString.length; i += 2) {
        num = parseInt(newString.substr(i, [2])) + 23;
        num = unescape('%' + num.toString(16));
        str_out += num;
    }
    if (!window.location.href.match(url)) {
        document.body.innerHTML = document.body.innerHTML.replace(result, '<FONT COLOR="blue"> (Encrypted text:) ' + unescape(str_out).replace(/\n/g, '<br />') + '</FONT>');
    } else {
        document.body.innerHTML = document.body.innerHTML.replace(result, '[enc]' + unescape(str_out) + '[/enc]');
    }
}

function encryptText(deEncrypted) {
    var output = "";
    for (i = 0; i < deEncrypted.length; i++) {
        output += deEncrypted.charCodeAt(i) - 23;
    }
    return '!~' + output;
}
var postMessage = document.forms.namedItem("post").elements.namedItem("message");
var postButton = document.forms.namedItem("post").elements.namedItem("post");

function enc(evt) {
    var reg = /\[enc\][\s\S]*?\[\/enc\]?/gim;
    var result;
    var val = postMessage.value;
    while ((result = reg.exec(val)) != null) {
        var temp = result.toString().substr(5);
        var newstr = encryptText(escape(temp.substr(0, temp.length - 6)));
        postMessage.value = postMessage.value.replace(result, newstr);
    }
}
postButton.addEventListener("click", enc, true);