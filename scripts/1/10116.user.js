// ==UserScript==
// @name           JellyFish Smack Shopping Chat text to link
// @namespace      http://netmindstorm.com
// @description    Converts http text to links in the smack shopping chat.  Simply click your mouse in the chat area while smack shopping and any url will be converted to clickable links
// @include        http://www.jellyfish.com/*
// ==/UserScript==
//the text to link code is from Kim A. Brandt. See http://userscripts.org/scripts/show/7122
 const uriaggressive = /[a-z][a-z0-9+-.]*:((\/\/(([a-z0-9-\._~!$&'\(\)\/\*\+,;=:]|%[a-f0-9]{2})*@)?((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|([a-z0-9-\._~!$&'\(\)\/\*\+,;=]|%[a-f0-9]{2})+(:[0-9]+)?(\/[a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]*|%[a-f0-9]{2})*)|(\/(([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]+|%[a-f0-9]{2})(\/[a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]*|%[a-f0-9]{2})*)?)|(([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]+|%[a-f0-9]{2})(\/[a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]*|%[a-f0-9]{2})*))+(\?([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@/?]|%[a-f0-9]{2})*)?(#([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@/?]|%[a-f0-9]{2})*)?/i;
 const uri = /((http)s?|(ftp)|(mailto)):((\/\/(([a-z0-9-\._~!$&'\(\)\/\*\+,;=:]|%[a-f0-9]{2})*@)?((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|([a-z0-9-\._~!$&'\(\)\/\*\+,;=]|%[a-f0-9]{2})+(:[0-9]+)?(\/[a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]*|%[a-f0-9]{2})*)|(\/(([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]+|%[a-f0-9]{2})(\/[a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]*|%[a-f0-9]{2})*)?)|(([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]+|%[a-f0-9]{2})(\/[a-z0-9-\._~!$&'\(\)\/\*\+,;=:@]*|%[a-f0-9]{2})*))+(\?([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@/?]|%[a-f0-9]{2})*)?(#([a-z0-9-\._~!$&'\(\)\/\*\+,;=:@/?]|%[a-f0-9]{2})*)?/i;
 const uri2 = /[a-z0-9+-.]*\b\.(com|net|org|edu|uk|au)\b([A-Za-z0-9$_+=!*();/?:~-]*)?/i;
 const illegal = /^(a|button|label|legend|option|script|select|style|textarea|title)$/i;
var chatDiv = document.getElementById('chat');
var chatcss = "@namespace url(http://www.w3.org/1999/xhtml);  /* Change color of  links */ #chat div.commentText a:visited, #chat div.commentText a:link  { color: #FF7800 !important; } ";
var update=1;

//user modifiable settings
 //if this flag is true, the url matching will not require a protocol and makes several simplifications in matching
 var generousMatch = true;
 //set to -1 to true max url off
 var maxUrlLength=60;
 var clippedUrlEnd='...';

	//ref http://wiki.greasespot.net/GM_addStyle
	function chatcolor()
	{
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(chatcss);
		} else if (typeof addStyle != "undefined") {
			addStyle(chatcss);
		} else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.innerHTML = css;
				node.type = "text/css";
				heads[0].appendChild(node); 
			}
		}
	}

 function execute()
 { 		
     var elements = document.evaluate(".//text()", chatDiv, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     if (elements == null) return;
     for (var i = 0; i < elements.snapshotLength; i++) textToLink(elements.snapshotItem(i));
 }

 function textToLink(element)
 {
     if (element.parentNode.tagName.match(illegal)) return;
     var matches = element.nodeValue.match(uri);
     if (matches != null) {
	     var text = matches[0];
	     var index = element.nodeValue.indexOf(text);
	     if (index == 0)
	     {
	         if (element.nodeValue.length > text.length) textToLink(element.splitText(text.length));
	         var link = document.createElement("a");
	         link.href = element.nodeValue;
	         link.rel="external";
	         element.parentNode.insertBefore(link, element);
	         link.appendChild(element); // TEXT TO LINK
	         slimFastUrl(element); 
		     }
		     else textToLink(element.splitText(index));
  	 }
  	 else if (generousMatch == true){
  	 	matches = element.nodeValue.match(uri2);
  	 	if (matches != null) {
	     var text = matches[0];
	     var index = element.nodeValue.indexOf(text);
	     if (index == 0)
	     {
	         if (element.nodeValue.length > text.length) textToLink(element.splitText(text.length));
	         var link = document.createElement("a");
	         link.href = 'http://'+element.nodeValue;
	         link.rel="external";
	         element.parentNode.insertBefore(link, element);
	         link.appendChild(element); // TEXT TO LINK    
	         slimFastUrl(element);       	
		     }
		     else textToLink(element.splitText(index));
  	 }
  	 }

 }
 
 function slimFastUrl(element){
 	  if(element == null) return;
 	  if (maxUrlLength > 0 && element.nodeValue.length > maxUrlLength){
	 		var replacelength = element.nodeValue.length;
	 		var l1 = clippedUrlEnd.length;
	 		if (l1 == maxUrlLength) l1=0;
			var front = element.substringData(0, maxUrlLength-l1);
			front = front+clippedUrlEnd;
			var tn = document.createTextNode(front);				 
			element.parentNode.replaceChild(tn,element.parentNode.firstChild);
	}
 }
 
 function externalLinks() {
 if (!document.getElementsByTagName) return;
 var anchors = document.getElementsByTagName("a");
 for (var i=0; i<anchors.length; i++) {
   var anchor = anchors[i];
   if (anchor.getAttribute("href") &&
       anchor.getAttribute("rel") == "external")
     anchor.target = "_blank";
 }
}

chatDiv.addEventListener('click', function(event) {
	//DOMAttrModified can be pretty costly
		if (update>0) {
			update=0;
			execute();
			externalLinks();
		}
  //  event.stopPropagation();  //nice for testing, bad for mute
  //  event.preventDefault();
}, true);

chatDiv.addEventListener('DOMAttrModified', function(event) {
	//okay to use DOMAttrModified--just setting flag, no processing of the data
	update=1;
}, true);

window.onload = chatcolor();