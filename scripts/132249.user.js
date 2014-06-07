// ==UserScript==
// @name           Direct mediafire links
// @namespace      http://userscripts.org/users/464734
// @description    Auto makes mediafire links into direct links
// @include        http://*
// ==/UserScript==

var links = new Array();

linkify();

for(i=0;i<links.length;i++)
{
	makeDirect(links[i]);
}

function makeDirect(a)
{
	url = a.getAttribute("href");
	GM_xmlhttpRequest({
        	method: 'GET',
                url: url,
                headers: {
                	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                        'Referrer' : "http://mediafire.com/"
                },
                onload: function(res) {
                	var txt = res.responseText;
                	var dlink = txt.match(/http:\/\/\d+\.\d+\.\d+\.\d+\/\w+\/\w+\/.+\" onclick=\"avh\(this\);return true;\"/gi) + '';
                	if(dlink != 'null')
                	{
                		dlink = dlink.replace(/\" onclick=\"avh\(this\);return true;\"/gi, '');
                		a.setAttribute("href", dlink);
                		a.innerHTML = dlink;
                	}
                	else if(txt.indexOf("File Removed for Violation.") > -1 || txt.indexOf("Invalid or Deleted File") > -1 || txt.indexOf("File Blocked for Violation.") > -1)
                	{
                		a.setAttribute("style", "color:red;text-decoration:line-through;");
                	}
                }
        });
}

function linkify()
{ 
        try
        {
        	var regex = /http:\/\/[www\.]{0,}mediafire\.com\/\?\w+/gi
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
              				if(prefix.toLowerCase() != 'http://')
              				{
              					href = 'http://' + href;
              				}
              				var a = document.createElement('a');
              				a.setAttribute('href', href);
              				a.appendChild(document.createTextNode(link));
              				span.appendChild(a);
              				links.push(a);			
              				lastLastIndex = regex.lastIndex;
              			}
              			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); 
              			tekst.parentNode.replaceChild(span, tekst);
              		}	
      		}
        } 
        catch(e)
        {
        }

}