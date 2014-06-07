// ==UserScript==
// @name           vBulletin Multi-Merge
// @namespace      http://home.comcast.net/~mailerdaemon/
// @include        */postings.php
// ==/UserScript==

if(!String.prototype.trim) String.prototype.trim = function() { return this.replace(/^\s*/,'').replace(/\s*$/, ''); }

var form = null;
var url = null;
var sub = null;
form = document.forms.namedItem("vbform");
if(form == null)
{
//	GM_log("form == null");
	return;
}
url = form.elements.namedItem("mergethreadurl");
if(url == null)
{
//	GM_log("url == null");
	return;
}

for(i = 0; i<form.elements.length; i++)
	if(form.elements.item(i).type == "submit")
		sub = form.elements.item(i);
if(sub == null)
{
	GM_log("sub == null");
	return;
}

sub.type = "button";
sub.value = "Merge Multiple Threads";
sub.addEventListener("click", mysubmit, true);

textarea = document.createElement("textarea");
textarea.name = "mergethreadurls";
textarea.rows = "10";
textarea.cols = "80";
//textarea.value = "\n\n\n";
url.parentNode.replaceChild(textarea, url);
url = null;

var running = 0;
var done = true;

function mysubmit(e)
{
	done = false;
	sub.disabled = true;
	var title = form.elements.namedItem("title").value;
	var master = form.elements.namedItem("t").value;
	var urls = textarea.value.split(/[;\n]+/);
	for(i = 0; i < urls.length; ++i)
	{
		var j = urls[i].trim();
		if(j != "")
		{
			var Data = 's=&do=domergethread&t='+encodeURIComponent(master)+'&title='+encodeURIComponent(title)+'&mergethreadurl='+encodeURIComponent(urls[i]);
//			GM_log(j+"\n"+ Data);
//*
			++running;
			GM_xmlhttpRequest({
				method: 'POST',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				url: 'http://forums.secondlife.com/postings.php',
				onload: function(responseDetails) {
//					GM_log('Request to merge threads returned ' + responseDetails.status + ' ' + responseDetails.statusText);
					--running;
					check();
				},
				data: Data
			});//*/
		}
	}
	done = true;
	check();
	return true;
}

function check()
{
	if(running == 0 && done)
	{
		sub.disabled = false;
		textarea.value = "";//"\n\n\n";
	}
}