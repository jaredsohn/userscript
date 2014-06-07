// ==UserScript==
// @name           Zippyshare Direct Link Converter
// @namespace      zippyshareconverter
// @include        http://*zippyshare.com/v/*/file.html
// @include        *
// ==/UserScript==

if(document.location.toString().indexOf('zippyshare.com') != -1 && document.location.toString().indexOf('/file.html') != -1){
	document.location = document.getElementById('dlbutton').href;
}
else{
	var allLinks = document.links;
	for (var i=0; i<allLinks.length; i++) {
		var url = allLinks[i].href.toString();
		if(url.indexOf(".zippyshare.com") != -1){
			allLinks[i].addEventListener('click', doneclick, true);
		}
	}
}

function doneclick(eventObject){
if (eventObject.stopPropagation) eventObject.stopPropagation();
if (eventObject.preventDefault) eventObject.preventDefault();
if (eventObject.preventCapture) eventObject.preventCapture();
if (eventObject.preventBubble) eventObject.preventBubble();
GM_xmlhttpRequest({
	method: "GET",
	url: eventObject.target.parentNode.href.toString(),
	onload: function(response) {
		var dlbutton = document.createElement('a');
		dlbutton.setAttribute('id', 'dlbutton');
		document.body.appendChild(dlbutton);
		var dlink = "var " + search(response.responseText, "<script type=\"text/javascript\">\n    var ", "</script>");
		eval(dlink);
		var download = document.getElementById('dlbutton').pathname;
		document.location = eventObject.target.parentNode.href.toString().substring(0, eventObject.target.parentNode.href.toString().indexOf("/v/")) + download;
	}
});
}

function search(text, start, end){
	var dlink = text.substring(text.indexOf(start) + start.length);
	dlink = dlink.substring(0, dlink.indexOf(end))
	return dlink
}