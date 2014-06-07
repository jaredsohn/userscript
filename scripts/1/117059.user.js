// ==UserScript==
// @name           Safelinking
// @namespace      Safelinking.net
// @description    Checks safelinking protected links and colors them appropriately
// @include        http://*
// @include        https://*
// @exclude        http://safelinking.net/*
// @exclude        https://safelinking.net/*
// @version 	   1.1
// ==/UserScript==


var url = 'safelinking.net/';

linkify();
var a = document.getElementsByTagName("a");
for(i=0;i<a.length;i++)
{
	var href = a[i].getAttribute("href");
	if(href != null && (href.indexOf(url + "p/") > -1 || href.indexOf("sflk.in/p") > -1))
	{
		checkit(a[i]);
	}
}

function checkit(link)
{
	GM_xmlhttpRequest({
                    method: 'GET',
                    url: "https://" + url + 'check?link=' + link,
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                    },
                    onload: function(responseDetails) {
                    	var status = str_between(responseDetails.responseText, "<link_status>", "</link_status>");
                     	switch(status)
                     	{
                     		case "Not yet checked":
                     			color = 'grey';
                     		break;
                     		
                     		case "Online":
                     			color = 'green';
                     		break;
                     		
                     		case "Broken":
                     			color = 'orange';
                     		break;
                     		
                     		case "Unknown link":
                     			color = 'brown';
                     		break;
                     		
                     		case "Offline":
                     			color = 'red';
                     		break;
                     	}
                     	link.setAttribute("style", "font-weight:bold;color:" + color);
                    }
                });
}

function linkify()
{ 
        try
        {
        	var regex = /http(s|):\/\/[www\.]{0,}(safelinking\.net|sflk\.in)\/p(\/|)[a-zA-Z0-9]+(\.\w+|)/gi
              	var altText, tekst, muligtLink;
              	//This array contains the html tags to ignore when evaluating the function
              	var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'textarea'];
              	var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";
              	altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
              	for(var i=0;i<altText.snapshotLength;i++)
              	{
              		tekst = altText.snapshotItem(i);
              		muligtLink = tekst.nodeValue;
              		if(regex.test(muligtLink))
              		{
              			var span = document.createElement('span');		
              			var lastLastIndex = 0;
              			regex.lastIndex = 0;
              			for(myArray = null; myArray = regex.exec(muligtLink); )
              			{
              				var link = myArray[0];
              				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); 		
              				var href = link;
              				var prefix = '';
              				if(href.length > 7)
              				{
              					prefix = href.substring(0,7);
              				}
              				if(prefix.toLowerCase() != 'http://' && prefix.toLowerCase() != 'https:/')
              				{
              					href = 'http://' + href;
              				}
              				var a = document.createElement('a');
              				a.setAttribute('href', href);
              				a.appendChild(document.createTextNode(link));
              				span.appendChild(a);				
              				lastLastIndex = regex.lastIndex;
              			}
              			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); 
              			tekst.parentNode.replaceChild(span, tekst);
              		}	
      		}
        } 
        catch(e)
        {
        	alert(e);
        }

}


function str_between(string, prefix, suffix) 
{
	s = string;
	var i = s.indexOf(prefix);
	if(i >= 0) 
	{
		s = s.substring(i + prefix.length);
	} 
	else 
	{
		return '';
	}
	if(suffix) 
	{
		i = s.indexOf(suffix);
		if(i >= 0) 
		{
			s = s.substring(0, i);
		} 
		else 
		{
			return '';
		}
	}
	return s;
}