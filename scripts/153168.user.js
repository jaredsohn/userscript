// ==UserScript==
// @name        Forum gry-planszowe.pl
// @description Grupowanie nieprzeczytanych postow
// @namespace   http://userscripts.org/users/495080
// @downloadURL https://userscripts.org/scripts/source/153168.user.js
// @include     http://www.gry-planszowe.pl/forum/search.php?*search_id=unreadposts*
// @version     1.0.4
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Global
var forumOrder = [1, 43, 42, 19, 5, 24, 4, 9, 3, 53, 54, 55, 10, 34, 47, 49, 50, 51, 17, 26, 38, 6, 41];

// Functions
function onPostClick(event)
{
	event.target.parentTopic.style.display = "none";
}

function onTopicClick(event)
{
	if (hash == null)
		return;	
		
	GM_xmlhttpRequest({
	  method: "GET",
	  url: event.target.haref + "&hash=" + hash,
	  onload: function(response) {
	  }
	});
	
	var sec = event.target.parentSection;
	sec.style.display = "none";
	var next = sec.nextElementSibling;
	while (next != null && next.section == sec.section)
	{
		next.style.display = "none";
		next = next.nextElementSibling;
	}
}

function getPostsFromTable(doc)
{
	var table = doc.evaluate("/html/body/div/div[2]/form/table[2]/tbody", 
					doc, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	table.removeChild(table.children[table.childElementCount - 1]);

	var trs = [];
	for (var i = 1; i < table.childElementCount; i++)
	{
		var child = table.children[i];
		trs.push(child);
	}

	for (var i = 0; i < trs.length; i++)
	{
		var child = trs[i];
		var regex = /f\=([0-9]+)"\>([^\<]+)\</;
		var match = regex.exec(child.innerHTML);
		child.section = parseInt(match[1]);
		child.sectionName = match[2];
		
		var link = doc.evaluate("./td[3]/a[2]", 
					child, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		var attr = link.getAttribute("href");
		link.setAttribute("href", attr + "&view=unread#unread");
		link.setAttribute("target", "_blank");
		link.addEventListener("click", onPostClick, true);
		link.parentTopic = child;
		
		child.parentNode.removeChild(child);
	}
	
	return trs;
}

function retriveNextPage()
{	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.gry-planszowe.pl/forum/search.php?&search_id=unreadposts&start="+(currentHit * 50),
		
		onload: function(response) 
		{
			var responseDoc = null;
			responseDoc = new DOMParser()
				.parseFromString(response.responseText, "text/html");
				
			var pst = getPostsFromTable(responseDoc);
			posts = posts.concat(pst);
			currentHit++;
			if (currentHit <= hits)
			{
				retriveNextPage();
			}
			else
			{
				sortAndAppendPosts();
			}
		}
	});
}

function sortAndAppendPosts()
{
	var table = document.evaluate("/html/body/div/div[2]/form/table[2]/tbody", 
					document, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	posts.sort(sorting);

	var lastSection = 0;
	for (var i = 0; i < posts.length; i++)
	{
		var row = posts[i];
		if (row.section != lastSection)
		{
			lastSection = row.section;
			var tr = document.createElement("tr");
			tr.setAttribute("valign", "middle");
			tr.section = row.section;
			tr.innerHTML = "<td class=\"cat\" colspan=\"3\"><h4><a href=\"javascript:void(0)\">"+row.sectionName+"</a></h4></td><td class=\"catdiv\" colspan=\"4\"></td>";
			
			var li = tr.children[0].children[0].children[0];
			li.haref = "http://www.gry-planszowe.pl/forum/viewforum.php?f="+row.section+"&mark=topics";
			li.parentSection = tr;
			li.addEventListener("click", onTopicClick, true);
			table.appendChild(tr);
		}
		table.appendChild(row);
	}
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.gry-planszowe.pl/forum/index.php",
		onload: function(response) 
		{
			var regex = /hash\=([^\&]+)\&/;
			var matches = regex.exec(response.responseText);
			hash = matches[1];
			
			var anchor = document.createElement("a");
			anchor.setAttribute("href", "http://www.gry-planszowe.pl/forum/index.php?mark=forums&hash=" + hash);
			anchor.style.margin = "10px";
			anchor.innerHTML = "<h4>Oznacz wszystko jako przeczytane</h4>";
			var table = document.evaluate("/html/body/div/div[2]/form", 
					document, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			table.appendChild(anchor);
		}
	});
}

function sorting(a, b)
{
	return (forumOrder.indexOf(a.section) - forumOrder.indexOf(b.section));
}

//--------------------------------------------------------------------------------------
// 1 Load all unread posts
//--------------------------------------------------------------------------------------
// read number of unread posts
var divFooter = document.evaluate("/html/body/div/div[2]/div", document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				
var divPage = divFooter.snapshotItem(0);
var divNav = divFooter.snapshotItem(1);
divPage.parentNode.removeChild(divPage);
divNav.parentNode.removeChild(divNav);

var regexHits = /wyniki: ([0-9]+)/;
var matches = regexHits.exec(divPage.innerHTML);
hits = Math.floor((parseInt(matches[1]) - 1) / 50);
currentHit = 1;
currentPost = 0;

// process main page
posts = getPostsFromTable(document);
if (hits > 0)
	retriveNextPage();
else
	sortAndAppendPosts();
