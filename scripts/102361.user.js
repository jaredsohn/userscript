// ==UserScript==
// @name           SafeLinked
// @namespace      http://SafeLinked.net
// @include        http://*
// ==/UserScript==

var regex = /http:\/\/slink\.myph\.us\/p\/[a-zA-Z0-9]+/gi
checkPLinks();
function checkPLinks()
{
	var unwantedTags = ['head', 'input', 'option', 'script', 'style', 'textarea', 'title'];
	var xpath = "//text()[not(parent::" + unwantedTags.join(" or parent::") +")]";
	var fullSnapShot = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(fullSnapShot.snapshotLength>0)
	{
		for(var i=0;i<fullSnapShot.snapshotLength;i++)
		{
			var itm = fullSnapShot.snapshotItem(i);
			var txt = fullSnapShot.snapshotItem(i).nodeValue;
			if(regex.test(txt))
				checkIt(itm,txt);
		}
	}
}
function checkIt(itm,txt)
{
	GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://slink.myph.us/api.php?function=simplecheck&plinks='+txt,
                    onload: function(responseDetails) {
                    	var status = responseDetails.responseText;
                     	switch(status)
                     	{
				case "online":
					color = '#3f0';
				break;
				case "offline":
					color = '#f30';
				break;
				case "not yet checked":
					color = '#7aa';
				break;
				case "unknown":
					color = '#fc3';
				break;
                     	}                    	
			if(itm.parentNode.tagName=="A")
				itm.parentNode.setAttribute("style", "color:"+color);
			else
			{
				var newLink = document.createElement("a");
				newLink.setAttribute("href",txt);
				newLink.setAttribute("style", "color:"+color);
				newLink.appendChild(document.createTextNode(txt));
				itm.parentNode.replaceChild(newLink,itm);
			}
			
                    }
                });
}