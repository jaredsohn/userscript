// vim: ts=4:sts=4:sw=4:ff=unix:noet
// ==UserScript==
// @name          WetPaint HTML Post
// @namespace     http://userscripts.org/users/Guest4157
// @description   Allow the usage of (some) HTML tags in WetPaint forum posts.
// @include       http://*.wetpaint.com/thread/*
// @version       0.1
// @licence       BSD license; http://creativecommons.org/licenses/BSD/
// @author        Gu1
// ==/UserScript==
 
location.href = "javascript:("+function()
{
	function decodeHTML(a) {
		return a.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, '\'');
	}
	function newlinesToUnicode(a) { return a.replace(/<br\s*\/?>/gi,"\n"); }
	
	XMLHttpRequest.prototype.origsend = XMLHttpRequest.prototype.send;
	XMLHttpRequest.prototype.send = function(input)
	{
		var regex = /&lt;(img|a|font|div|table|tr|td)([\s\S]*?)&gt;([\s\S]*?&lt;\/\1&gt;)?/gi;
		// we use [\s\S]* instead of .* because the dot doesnt match new lines and there is no "DOTALL" flag
		
		if(input == null)
		{
			return this.origsend();
		}
		
		if(input.substr != undefined && input.substr(0, 20) == "<thread><posts><post") // are we posting a new post ?
		{
			var docu = (new DOMParser).parseFromString(input, "text/xml"); // the data as an XMLDocument object
			var text = docu.getElementsByTagName('text');
			if(text.length == 1) // to avoid an error if the text element doesnt exist
			{
				text = text[0].firstChild;
				text.nodeValue = text.nodeValue.replace(regex, function(i) {
					return decodeHTML(i);
				});
				input = (new XMLSerializer()).serializeToString(docu);
			}
		}
		
		return this.origsend(input); // calling the real method
	}
	
	if(document.querySelectorAll != undefined)
	{
		var nl = document.querySelectorAll('a[id^="WPC-action_editThreadPost"]');
	}
	else // slower way to do it on older versions of ff that don't have the selector api
	{
		var nltmp = document.getElementsByTagName('a');
		var nl = new Array;
		for(var y = 0; y < nltmp.length; y++)
		{
			if(nltmp[y].id != undefined && nltmp[y].id.substr(0, 25) == 'WPC-action_editThreadPost') {
				nl.push(nltmp[y]);
			}
		}
		delete nltmp;
	}
	
	for(i = 0; i < nl.length; i++) // this code fix post editing when there is html in the edited post.
	{
		nl[i].addEventListener('click', function(e)
		{
			var textNode = e.originalTarget.parentNode.parentNode.nextSibling.nextSibling;
			var postText = document.getElementById('edit_postText');
			var postQuote = document.getElementById('edit_postQuote');
			
			setTimeout(function()
			{
				if(document.getElementById('postEditor').style.display == 'block')
				{
					var textNodeClone = textNode.cloneNode(true);
					var next;
					var cur = textNodeClone.firstChild;
					
					while(cur)
					{
						next = cur.nextSibling;
						if(cur.nodeName.toUpperCase() === "BLOCKQUOTE")
						{
							postQuote.value = cur.innerHTML.replace(/^"|"$/g, '');
							postQuote.value = decodeHTML(newlinesToUnicode(postQuote.value));
							textNodeClone.removeChild(cur);
							break;
						}
						cur = next;
					}
					postText.value = decodeHTML(newlinesToUnicode(textNodeClone.innerHTML));
				}
			}, 50); // we wait 50ms before executing
		}, true);
	}
} + ")();";
