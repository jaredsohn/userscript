//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// To uninstall, go to Tools/Manage User Scripts,
// select "Mr. Script", and click Uninstall.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name          Reddit Markdown Helper
// @namespace     http://cytzol.com
// @description	  Adds Markdown help/previews to comment boxes
// @include       http://reddit.com/*
// @include       http://*.reddit.com/*
// ==/UserScript==

// this has just been copied and pasted in here because it's not
// available on every page (just the main comment ones)

function makeShowHelp(el, i)
{
    el.addEventListener("click", function() {
	    document.getElementById("previewdiv" + i).innerHTML = "<table style='border-collapse: collapse;' border='1' bordercolor='lightgray' cellpadding='4px'>" +
		"<tr style='background-color: #ffff99; text-align: center'><td><em>you type:</em></td><td><em>you see:</em></td></tr>" +
		"<tr><td>*italics*</td><td><em>italics</em></td></tr>" +
		"<tr><td>**bold**</td><td><b>bold</b></td></tr>" +
		"<tr><td>[reddit!](http://reddit.com)</td><td><a href='http://reddit.com'>reddit!</a></td></tr>" +
		"<tr><td>* item1<br/>* item2<br/>* item3</td><td><ul><li>item 1</li><li>item 2</li><li>item 3</li></ul></td></tr>" +
		"<tr><td>&gt; quoted text</td><td><blockquote>quoted text</blockquote></td></tr>" +
		"</table>";

	}, false);
}

function makePreview(el, i, id)
{
    el.addEventListener("click", function() {
	    document.getElementById("previewdiv" + i).innerHTML = "Please wait...";
	    GM_xmlhttpRequest({
		    method: 'GET',
			url: 'http://cytzol.com/preview.pl?text=' + escape(document.getElementById(id).value).replace(new RegExp("\\+", "g"), "%2B"),
			onload:function(details) {
			document.getElementById("previewdiv" + i).innerHTML = details.responseText;
		    }
		});
	}, false);
}

var replyBoxes = document.getElementsByTagName("tr");
for (var i = 0; i < replyBoxes.length; i++) {
    if (replyBoxes[i].id.slice(0, 5) == "reply") {
	var e = replyBoxes[i];

	var replyId = e.getElementsByTagName("textarea")[0].getAttribute("id");
	
	var previewButton = document.createElement("button");
	previewButton.setAttribute("class", "btn");
	previewButton.setAttribute("onclick", "return false;");
	makePreview(previewButton, i, replyId);
	previewButton.innerHTML = "preview";
	
	var helpButton = document.createElement("button");
	helpButton.setAttribute("class", "btn");
	helpButton.setAttribute("onclick", "return false;");
	makeShowHelp(helpButton, i);
	helpButton.innerHTML = "help";
	
	var div = document.createElement("div");
	div.innerHTML = "";
	div.setAttribute("id", "previewdiv" + i);
	var cancel = e.getElementsByTagName("button")[1];
	cancel.parentNode.insertBefore(helpButton, null);
	cancel.parentNode.insertBefore(previewButton, null);
	cancel.parentNode.insertBefore(div, null);
    }
}

var markToggle = document.getElementById("marktoggle");
if (markToggle) {
    var button = document.createElement("button");
    button.setAttribute("class", "btn");
    button.setAttribute("onclick", "return false;");
    button.innerHTML = "preview";

    var div = document.createElement("div");
    div.innerHTML = "";
    div.setAttribute("id", "previewdivroot");
    makePreview(button, "root", "commentroot");
    
    markToggle.parentNode.insertBefore(button, null);
    markToggle.parentNode.insertBefore(div, null);
}

