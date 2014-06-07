// ==UserScript==
// @name           QuickReply
// @namespace      QuickReply
// @description    Adds a quick reply box to TvTropes forum discussion pages.
// @include        http://tvtropes.org/pmwiki/posts.php?discussion=*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var elements = getElementsByClass("forumbutton");
var button = 0;

for (var i = 0; i < elements.length; i++)
{
	if (elements[i].innerHTML == "add a post")
	{
		button = elements[i];
		break;
	}
}
button.style.display = "none";

var table = button.parentNode;

var URL = window.location.href;

var begin = URL.indexOf("discussion=") + "discussion=".length;
var end = URL.indexOf("&", begin)
if (end == -1)
	{ end = URL.length; }

var code = URL.substring(begin,end);

var form = document.createElement('form');
form.setAttribute('action','forumaddpost.php');
form.setAttribute('method','post');
form.innerHTML = '<textarea cols="70" rows="9" id="postedit" name="postedit"></textarea>\
<input type="hidden" value="' + code + '" name="discussion">\
<center><input type="submit" value="send"></center>'
table.appendChild(form);
