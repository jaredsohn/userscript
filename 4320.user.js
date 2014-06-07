// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Add "Show Comments Here" link
// @description   Add "Show Comments Here" link to Hebrew WordPress blogs
// @include       http://www.popup.co.il/*
// @include       http://popup.co.il/*
// @include       http://www.zgugiot.com/*
// @include       http://zgugiot.com/*
// ==/UserScript==
var d = document;
var ShowCommentsHere = "&#1492;&#1510;&#1490;&#32;&#1514;&#1490;&#1493;&#1489;&#1493;&#1514;&#32;&#1499;&#1488;&#1503;&#32;&#187";
var HideComments = "&#1492;&#1505;&#1514;&#1512;&#32;&#1514;&#1490;&#1493;&#1489;&#1493;&#1514;&#32;&#171";

function getComments(i)
{
	var id = "comments" + i;
	var commentsDiv = d.getElementById(id);
	var linkObj = d.getElementById("commentsFor" + i);
	if(commentsDiv)
	{
		linkObj.innerHTML = ShowCommentsHere;
		commentsDiv.parentNode.removeChild(commentsDiv);
		return
	}
	
	commentsDiv = d.createElement("div");
	commentsDiv.id = id;
	linkObj.parentNode.parentNode.insertBefore(commentsDiv, linkObj.parentNode.nextSibling)
	commentsDiv.innerHTML = "\u05d8\u05d5\u05e2\u05df...";
	commentsDiv.style.backgroundColor = "#FF0";
	commentsDiv.style.textAlign = "center";
	
	GM_xmlhttpRequest({
		method: "get",
		url: linkObj.href,
		commentsDiv: commentsDiv,
		data: null,
		onload: function(responseDetails)
		{
			linkObj.innerHTML = HideComments;
			var CommentsHeaderClosingTag = "/h3>";
			var t = responseDetails.responseText.split("<h3");
			if(t.length != 3)
			{
				t = responseDetails.responseText.split("<h5"); // for http://room404.net/
				if(t.length == 4)
					t.splice(0,1);
				
				CommentsHeaderClosingTag = "/h5>";
			}
				
			if(t.length == 3)
			{
				t = t[1].split(CommentsHeaderClosingTag);
				if(t[1])
				{
					this.commentsDiv.innerHTML = t[1];
					this.commentsDiv.style.backgroundColor = "#FFF";
					this.commentsDiv.style.border = "1px inset";
					if(this.commentsDiv.offsetHeight > 400)
						this.commentsDiv.style.height = "400px;"
					
					this.commentsDiv.style.overflow = "auto";
					window.scrollTo(null, this.commentsDiv.offsetTop-100);
					this.commentsDiv.scrollLeft = 0;
					
					var firstLI = this.commentsDiv.getElementsByTagName("li")[0];
					if(firstLI)
					{
						firstLI.style.marginTop = "5px";
						firstLI.parentNode.style.marginTop = 0;
						firstLI.style.marginBottom = "5px";
						firstLI.parentNode.style.marginBottom = 0;
					}
					
					return;
				}
			}
			
			this.commentsDiv.innerHTML = "!An error has occured";
			this.commentsDiv.style.backgroundColor = "#FAA";
		}
	});
}

window.getComments = getComments;

function attachEvent(o, sEvent, handler)
{
	if(o.addEventListener)
		o.addEventListener(sEvent, handler, true);
	else
		o["on" + sEvent] = handler;
}

var links = d.getElementsByTagName("a");
var commentsRE = /\/\?p\=(\d*)\#comments$/;
for(var i = 0; i < links.length; ++i)
{
	if(links[i].id.indexOf("commentsFor") == 0)
		continue;
		
	commentsRE.lastIndex = 0;
	var m = commentsRE(links[i].href);
	if(m && m[1])
	{
		var space = d.createElement("span");
		space.innerHTML = " <strong>|</strong>";
		links[i].parentNode.appendChild(space);
		links[i].parentNode.appendChild(d.createTextNode("   "));
		
		links[i].innerHTML = links[i].innerHTML.replace(/ ý/, "");
		var newlink = d.createElement("a");
		newlink.innerHTML = ShowCommentsHere;
		newlink.id = "commentsFor" + m[1];
		newlink.href = links[i].href;
		attachEvent(newlink, "click", new Function("event", "getComments(" + m[1] + "); if(event.preventDefault) event.preventDefault(); return false;"));
		links[i].parentNode.appendChild(newlink);
	}		
}
