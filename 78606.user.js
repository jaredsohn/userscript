// ==UserScript==
// @name           eIgnore
// @namespace      eignore
// @description    A simple eRepublik comment ignore script for easier article reading
// @include        http://www.erepublik.com/*/article/*
// @include        http://www.erepublik.com/*/badges
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @author		   par30web
// ==/UserScript==


// Gets a string between a prefix and a suffix string (minified function)
String.prototype.between=function(prefix,suffix){s=this;var i=s.indexOf(prefix);if(i>=0){s=s.substring(i+prefix.length);}else{return'';}if(suffix){i=s.indexOf(suffix);if(i>=0){s=s.substring(0,i);} else{return'';}}return s;}

// The list of trolls we're ignoring
var trollstring = GM_getValue("trolls", "");
if(trollstring == -1) GM_setValue("trolls", "");
var trolls = trollstring.split("|");

// If we are on the tools page, add settings then
if(document.location.href.search("http://www.erepublik.com/.*/badges") != -1)
{
	var settings = '<div class=bordersep><div class=badgeholder><img alt="by par30web" src="http://www.kimag.es/share/88067149.png"></div><div class=codeholder><p class=padded><strong>ليست ايگنور:&nbsp;</strong>';
	for(i = 0; i < trolls.length; i++)
	{
		if(trolls[i] != "")
		{
			settings = settings + trolls[i] + ' <a id="deleteIgnore" href="http://www.eignore.com/delete/' + trolls[i] + '/">X</a>, ';
		}
	}
	settings = settings + '</p><p class=padded><strong>اضافه کن:</strong><form><input id="ignoreguy" value="" class=field>&nbsp;<input id="ignorebtn" type=submit value="ايگنور"></form></p></div></div>';
	
	$(settings).insertAfter('.tabs');
	
	var button = document.getElementById("ignorebtn");
	button.addEventListener('click', ignoreSomeone, false);	
}

// Incase we are on some article page ...
if(document.location.href.search("http://www.erepublik.com/.*/article") != -1)
{
	// Loop through all comments in the article
	var allDivs, thisDiv;
	allDivs = document.evaluate("//div[@class='articlecomments']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		
		// Now check for a match with the ignored trolls and delete the comment if the match is found
		for(var b = 0; b < trolls.length; b++)
		{
			if(thisDiv.innerHTML.between('<a title="', '" href="/en/citizen/profile/') == trolls[b])
			{
				thisDiv.style.display = 'none';
			}
		}
		// do something with thisDiv
	}
}

function ignoreSomeone()
{	
	if(trollstring == "")
	{
		GM_setValue("trolls", $("#ignoreguy").val());
	}
	else
	{
		GM_setValue("trolls", trollstring + "|" + $("#ignoreguy").val());
	}	
}

document.addEventListener('click', function(event) {
	var url = event.target.href.toString();
	if(url.search("http://www.eignore.com/delete/") == 0)
	{		
		var troll = unescape(url.between("http://www.eignore.com/delete/", "/"));	
		var newtrollstring = trollstring.replace(troll, "");
		GM_setValue("trolls", newtrollstring);
		event.stopPropagation();
    	event.preventDefault();
		alert('اين شخص از ليست ايگنورهاي شما حذف شد');
		location.reload(true);
	}
}, true);