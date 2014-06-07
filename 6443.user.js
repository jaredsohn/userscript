// ==UserScript==
// @name           LDD OpenDocument
// @namespace      http://www.notessidan.se
// @description    Adds a div box for each response when reading a topic on the Lotus Communities
// @include        http://*.lotus.com/ldd*
// @include        https://*.lotus.com/ldd*
// ==/UserScript==

/*
_________________________________________________________________________________

This scripts was originally written by by Julian Robichaux ( http://www.nsftools.com ) and can be found here:
http://www.openntf.org/Projects/pmt.nsf/ProjectHome?ReadForm&Query=LDDMonkey

Description : 

When I see a topic I like in a view I always CTRL-Click it to open that post in a new tab. 
This script will automatically retrieve all responses upon opening a document and display them
in a flat row one response after another . this is useful if you are a fast reader and want to quickly 
findout if the answer is on any of the responses to a post. 
You can ofcourse also easy quicksearch all responses as they are all on the same page at once.

This script works a little bit different than the original script. here are the main differences.

- You will not get any [+] signs at all.
- You will need to open a document to see the threads.

Known bugs:

- if you select to also box the current post [default] the old post is still shown.
- There is no easy way to see which main topic a response belong to.

_________________________________________________________________________________

Thomas Adrian
http://www.notessidan.se

Release 1.0 - November 20, 2006
First relase, also added the 2 fixes in LDD Monkey 1.7 which removes the white images and 

_________________________________________________________________________________

*/

if(window.location.href.toLowerCase().indexOf("?opendocument") > 0)
{		
// Only process this script if we are on a notesdocument
var AlsoMakeCurrentPostBox = true;	//set to false to leave the current post as it is
if(AlsoMakeCurrentPostBox) makeCurrentPostBox();
start();
}

function start(){

	var img = document.getElementsByTagName("img");
	var links = document.getElementsByTagName("a");
	for (i=0; i < links.length; i++) 
	{
		var node = links[i];
		var tag = node.getAttribute("href");
		if (!tag) continue;
		
		if (tag.toLowerCase().indexOf("?opendocument") > 0) 
		{
			if (tag.indexOf("/") == -1) 
			{
				var div = document.createElement("div");
				div.setAttribute("id", tag);
				div.style.display = "block";
				div.style.backgroundColor = "#C8D7E3";
				div.style.border = "1px solid #777777";
				div.style.height = "";
				div.style.padding = "5px";
				div.style.margin = "5px";
				div.style.marginLeft = "10px";
				div.style.visibility = "visible";
				var image = getGreyRuler();
				var imgParent = image.parentNode;
				imgParent.insertBefore(div, image);
				getData(div,tag);
			}
		}
	}
	return true;
}

function getGreyRuler()
{
	// Return the gray ruler, just above the "Return to top" link
	var img = document.getElementsByTagName("img");
		for(j=0;j<img.length;j++)
		{
			var image = img[j]
			if (image.getAttribute("src").toLowerCase().indexOf("gray_rule.gif") > 0)
			{
			return image;
			break;
			}
		}
}

function getPostData(div,responseDetails)
{
		var resp = responseDetails;
		var bodyText = "";
			
		var pos = resp.toLowerCase().indexOf("/next.gif");
		if (pos > 0) {
			tpos = resp.indexOf("</table>", pos);
			brpos = resp.indexOf("<br>", pos);
			if ((tpos > 0) && (brpos > 0))
				pos = (tpos > brpos) ? brpos : tpos + 8;
			else
				pos = (tpos > brpos) ? tpos + 8 : brpos;
			var endOfBody = new Array ("blue_rule.gif","gray_rule.gif","thread-divider.gif" 
				);
			var pos2 = -1;
			for (j = 0; j < endOfBody.length; j++) {
				pos2 = resp.indexOf(endOfBody[j], pos);
				if (pos2 >= 0)
					break;
			}
						
			if (pos2 < 0)
				pos2 = resp.lastIndexOf("10x10.gif");
			
			if (pos2 > 0) {
				bodyText = resp.substring(pos, pos2);
				
				if (bodyText.indexOf("</div>") > 0)
					bodyText = bodyText.substring(0, bodyText.lastIndexOf("</div>"));
				else
					bodyText = bodyText.substring(0, bodyText.lastIndexOf("<"));
			} else {
				bodyText = "Error finding end of message body";
			}
		} else {
			bodyText = "Error finding beginning of body";
		}
		return bodyText.replace(/<img\b(.*?)10x10.gif[^>]*>/g,"");
	}


	
function getData(div,tag)
{
		var host = window.location.protocol + "//" + window.location.host;
		var path = window.location.pathname;
		var relpath = host + path.substring(0, path.lastIndexOf("/")) + "/";
		var url = tag;
		
		if (tag.indexOf("://") > 0) {
		} else if (tag.indexOf("/") == 0) {
			url = host + tag;
		} else {
			url = relpath + tag;
		}
		
		GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},onreadystatechange: function(responseDetails) {
				if (responseDetails.readyState == 4)
				{
				div.innerHTML = getPostData(div,responseDetails.responseText);
				}
			}
		});
}

function makeCurrentPostBox()
{
	// Find the current post and box it
	var divc = document.createElement("div");
	divc.setAttribute("id", "test");
	divc.style.display = "block";
	divc.style.backgroundColor = "#E9E9E9";
	divc.style.border = "1px solid #777777";
	divc.style.height = "";
	divc.style.padding = "5px";
	divc.style.margin = "5px";
	divc.style.marginLeft = "10px";
	divc.style.visibility = "visible";
	divc.innerHTML = getPostData(divc,document.body.innerHTML);
	var pr = getGreyRuler();
	var prParent = pr.parentNode;
	prParent.insertBefore(divc, pr);

}

function removePostData()	// This function is currently not being used
{
	
	var allLinks;
	var thisLink;
	allLinks = document.evaluate('/html/body/form/table[2]/tbody/tr/td[2]/table/tbody/tr/td/br[4]/*',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
	,null);
	
	for (i = 0; i < allLinks.snapshotLength; i++) 
	{
		thisLink = allLinks.snapshotItem(i);
		var thisLinkp = thisLink.parentNode;
		thisLinkp.removeChild(thisLink);
	}
}