// ==UserScript==
// @name     Litportal HTML Only
// @description Fixes litportal.ru
// @include  http://www.litportal.ru/genre*/author*/read/*
// ==/UserScript==





function EmptyFunction()
{
}



function fixWindowGetSelection()
{

	unsafeWindow.LockSel = EmptyFunction;

	// remove event handlers
//	document.onmousedown= myClick;
//	document.ondragstart=EmptyFunction;
//	document.onselectstart = EmptyFunction;
//	document.ontextmenu = EmptyFunction;
}


var waitForTextCount = 0;


function unprotect(text)
{
	pageHtml = text.innerHTML;
	
	pageHtml = pageHtml.replace(new RegExp('<span class=[\'"]?h[\'"]?>[^<]*</span>','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('xmlns:xlink="http://www.w3.org/1999/xlink"','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('xmlns:fb="http://www.gribuser.ru/xml/fictionbook/2.0"','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('<a name="@number"></a>','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('&nbsp;','gi'), ' ');
	pageHtml = pageHtml.replace(new RegExp('[ \t][ \t]+','gi'), ' ');
	pageHtml = pageHtml.replace(new RegExp('<(h[1-6]|div|p)','gi'), '\n<$1');
	pageHtml = pageHtml.replace(new RegExp('[ \t]*align="justify"','gi'), '');

	text.innerHTML = pageHtml;
	
	return text;
}

unsafeWindow.waitForText = function() 
{
	var text = document.getElementById("page_text");
	if ( (text == null) || (text.innerHTML.length < 100 ) ) {
		++waitForTextCount;
		if (waitForTextCount < 1000) {   // wait 200sec or ~3min
			window.setTimeout("waitForText()", 200);
		}
		else {
			GM_log("Wait time out");
		}

	}
	else {  // i got the text
		// I want to make some changes in the look&fill. 

		// Specifically I am going to make left panel smaller
		GM_log("Waited "+(waitForTextCount*200)/1000+" sec for load");
		modifyPage(text);

	}
}

var Links = new Array();
function findLinks()
{
	// i am looking for links like
	// <a class="main" href="http://www.litportal.ru/genre16/author4033/read/page/2/book17736.html">2</a>	
	var allLinks = document.evaluate("//a[@href]", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var regExp = new RegExp("litportal.{1}ru/genre[0-9]+/author[0-9]+/read/page/[0-9]+/book[0-9]+", "gi");
	var regExpPage = new RegExp("(page/)([0-9]+)", "gi");
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var link = allLinks.snapshotItem(i);
		href = link.getAttribute("href");
		pageMatch = href.match(regExpPage);
		if (href.match(regExp)) {
//			GM_log("pageMatch="+pageMatch[0]+" href="+href);
			Links[ (pageMatch[0]) ] = link;
		}
	}
	Links.sort();
}

function cleanUp() {
	all = document.evaluate("//table", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < all.snapshotLength; i++) {
		var e = all.snapshotItem(i);
		e.parentNode.removeChild(e);
	}
}


function modifyPage(text)
{
	// i need only two things on the page - links to the pages and text itself
	findLinks();
	GM_log("Found "+Links.length+" links");

	// remove all elements from the page
	if (Links.length > 0) {
		cleanUp();
	}
	var count = 1;
	var linksText = "";
	regExp = new RegExp("page/[0-9]+", "gi");

	for (var link in Links)
	{
		href = Links[link].getAttribute("href");
		var m = href.match(regExp);
		if (m != null) {
			linksText += '<a href="' + href + '">'+m[0]+'</a> &nbsp; &nbsp; ';
		}
		count++;
	}

	linksText += ""
	text = unprotect(text);
	cleanUp();
	document.write("<head></head>"+"<body>"+linksText+"<br>"+text.innerHTML+"</body>");
	document.body.style.fontSize = "10px";
	document.body.style.background = "white";
	document.body.style.color = "black";
}



// Minor fix first

fixWindowGetSelection();


// wait until IFrame loads the text
window.setTimeout("waitForText()", 200);
