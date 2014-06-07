// ==UserScript==
// modified by aardvarkMan
// @name            Spam Buttons + view inline (derived from Craigslist Spam Buttons v1.1)
// @namespace       http://www.stillnetstudios.com
// @description     Displays buttons on the item list so you can flag items as spam without having to click through, and places the content in line so that you can view them quickly.
// @include         http://*.craigslist.*/*
// ==/UserScript==


var tables = document.getElementsByTagName("blockquote");
if (tables[1])
{
	var paras = tables[1].getElementsByTagName("p");
	var regex = new RegExp(/\w\w\w\/(\d+)\.html/);
	for (i=0;i< paras.length;i++) 
	{
		anchors = paras[i].getElementsByTagName("a");
		if (anchors.length > 0) 
		{
			href = anchors[0].getAttribute("href");
			if (retval = regex.exec(href)) 
			{
				postingID = retval[1];
				newlink = document.createElement("a");
				newlink.setAttribute("href","http://flag.craigslist.org/?flagCode=15&postingID=" + postingID);
				newlink.setAttribute("style","font-size: 9px; padding-right: 6px;");
				newlink.setAttribute("title","Click to mark this item as spam.");
				newlink.setAttribute("onclick","return markAsSpam(" + postingID + ")");
				newlink.setAttribute("id","sl_" + postingID);
				newlink.innerHTML = '[spam]';
				paras[i].insertBefore(newlink,paras[i].firstChild);
						
				var postContent = document.createElement("div");
				postContent.setAttribute("id", "content_" + postingID );
				//postContent.style.display = 'none';
				paras[i].insertBefore(postContent,paras[i].lastChild.nextSibling);
				
				//newlink = document.createElement("span");
				//newlink.setAttribute("href", "");
				//newlink.setAttribute("style","font-size: 13px; padding-right: 6px;");
				//newlink.addEventListener("click", new function(){ this.postContent.style.display = 'block'; this.innerHTML = "  [-]"; }, true );
				//newlink.innerHTML = '  [+]';
				//var newLink.postContent = postContent;
				//paras[i].insertBefore(newlink,paras[i].lastChild);
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://' + window.location.host + '/' + href,
					headers: 
					{
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,application/xhtml+xml,text/xml,text/xhtml',
					},
					onload: function(responseDetails) 
					{
						var regex = new RegExp(/\w\w\w\/(\d+)\.html/);
						var postID = regex.exec(responseDetails.finalUrl)[1];
						var logo = document.getElementById( "content_" + postID );
//						logo.setAttribute( "style", "display : none" );
						var html = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1]; 
						var elem = document.createElement("div") ;
						elem.innerHTML = html;
						var foundTags = elem.getElementsByTagName( "div" );
						for( var i = 0; i < foundTags.length; ++i ) // in foundTags )
						{
							if( foundTags[i].getAttribute( "id" ) == "userbody" )
								logo.textContent = foundTags[i].textContent;
						}
						
						var foundTags = elem.getElementsByTagName( "img" );
						for( var i = 0; i < foundTags.length; ++i ) // in foundTags )
						{
							logo.appendChild( foundTags[i] );
						}
						
						

					} 
				});
				
			}
		}
	}
}

// create a new image.  We'll mark items as spam by fetching the spam URL as the source
// for the image.  Tricky, huh?  This way it works in both Opera and FireFox.
tmpCLSBimg = new Image();
tmpFunction = function(postingID) {
	var newlink = document.createElement("a");
	newlink.setAttribute("style","font-size: 14px; padding-right: 11px; padding-left: 8px; color: red; font-weight: bold;");
	newlink.innerHTML = '&#x2713';
	tmpCLSBimg.src = "http://flag.craigslist.org/?flagCode=15&postingID=" + postingID;
	document.getElementById("sl_" + postingID).parentNode.replaceChild(newlink,document.getElementById("sl_" + postingID));
	// this only appears to work in Opera. If you know how to make it work in FF, let me know.
	document.status = "Marked item " + postingID + " as spam.";
	setTimeout('window.status = ""',2000);
	return false;
	}

// place the function into the window differently for Opera and FireFox
if (navigator.appName == "Opera") {
	window.markAsSpam = tmpFunction;
	}
else {
	unsafeWindow.markAsSpam = tmpFunction;
	}
