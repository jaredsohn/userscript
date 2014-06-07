// ==UserScript==
// @name ETI Quote Context
// @namespace freakish thunder
// @description Add Quote Context Link to all quotes (prob doesn't work with archive)
// @include http://*.endoftheinter.net/showmessages.php*
// @include https://*.endoftheinter.net/showmessages.php*
// @include http://endoftheinter.net/showmessages.php*
// @include https://endoftheinter.net/showmessages.php*
// @include https://endoftheinter.net/message.php*
// @include http://endoftheinter.net/message.php*
// @include https://*.endoftheinter.net/message.php*
// @include http://*.endoftheinter.net/message.php*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if (node == null)
		node = document;
	if ( tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	for (var i = 0, j = 0; i < elsLen; i++) {
		if (els[i].className == searchClass) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function parseOuter(str) // given outerHTML string, find the topic & message id and make a link
{
var p0 = str.indexOf(',');
var p1 = str.indexOf(',',p0 + 1);
var p2 = str.indexOf('@',p1 + 1);
var tm = [str.substring(p0 + 1, p1), str.substring(p1 + 1, p2)];   
    return tm;
}

var quotes = getElementsByClass('quoted-message');

console.log(quotes);

for (var i = 0; i < quotes.length; i++)
{

var parse = parseOuter(quotes[i].outerHTML);
    var sp = document.createTextNode(' ');
    var msg = document.createElement('a');
    msg.href = "http://boards.endoftheinter.net/message.php?id=" + parse[1] + "&topic=" + parse[0];
    msg.innerHTML = 'Message Detail';
quotes[i].childNodes[0].appendChild(sp);
    quotes[i].childNodes[0].appendChild(msg);
}