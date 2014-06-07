// ==UserScript==
// @name	RSTtoHTML
// @namespace	*
// @description	Replace selected RST formatted text in textbox with HTML converted text via http://rst2a.com/api/
// ==/UserScript==

function RSTtoHTML()
{
	textareas = document.getElementsByTagName('textarea');
	if (!textareas.length) { return; }
	
	var textarea = null;
	var len = null;
	var start = null;
	var end = null;
	var sel = null;
	
	for (var i = 0; i < textareas.length; i++) {
		textarea = textareas[i];
		
		len = textarea.value.length;
		if (!len) { continue; }

		start = textarea.selectionStart;
		if (typeof start == undefined) { continue; }
		
		end = textarea.selectionEnd;
		sel = textarea.value.substring(start, end);
		
		GM_xmlhttpRequest({
		method: 'POST',
		url: "http://api.rst2a.com/1.0/rst2/html?style=default",
		data: "rst=" + escape(sel),
		headers: {
		      "User-agent": "Mozilla/4.0 (compatible) Greasemonkey/0.3",
		      "Content-type": "application/x-www-form-urlencoded",
		      "Accept": "application/atom+xml,application/xml,text/xml"
		},
		onload: function(response) {
			if (response.status == 200) {
				//console.log(response.responseText);
				//replaceSelection(selection, response.responseText);
				textarea.value = textarea.value.substring(0,start) + unescape(response.responseText) + textarea.value.substring(end,len);
			}
		}
		});
		return;
	}
}

GM_registerMenuCommand( "RSTtoHTML", RSTtoHTML);
