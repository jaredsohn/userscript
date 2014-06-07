// ==UserScript==
// @name           Toggle Comments
// @namespace      http://userscripts.org/users/useridnumber
// @description    Show and Hide Comments
// @include        http://kucourses.com/*&ThreadViewMode=expanded*
// ==/UserScript==

var totalRows = 0;
var snippetsCreated = 0;
var postsVisible = 1;
var allPosts = new Array();

/*
This is the main loop of the script.  It finds the table containing the posts then goes through every post and sets up the id for all of the posts and their corresponding image togglers.  It also uses text from each post to create a "preview snippet" of text that will be shown in place of a post whenever a post is hidden.
*/
function createPreviewSnippets()
{
	if (snippetsCreated)
	{
		showPreviewSnippets();
		return;
	}
	
	var table2 = findBigTable();
	var rows = table2.rows;
	var counter = 0;
	
	for (var i = 2; i < rows.length; i += 2, counter++)
	{
		// get images
		var images = rows[i].getElementsByTagName("img");
		
		// header rows have 3 images (+/- toggle, envelope, email)
		// except children have that ... thingie
		// have to check for image that contains the toggle
		switch (images.length)
		{
			// 3 is OP
			case 3:
				images[0].setAttribute("id", "Toggle_" + i);
				break;
				
			// 4 is 1st reply to OP
			case 4:
				images[1].setAttribute("id", "Toggle_" + i);
				break;
				
			// 5 is reply to reply
			case 5:
				images[2].setAttribute("id", "Toggle_" + i);
				break;
		}
	
		// set id for corresponding post cell
		var pc = rows[i+1].cells[0];
		var ctables = pc.getElementsByTagName("table");
		var innarows = ctables[0].rows;
		var tc = innarows[0].cells[1];
		tc.setAttribute("id", "PostCell_" + i);
		tc.setAttribute("onclick", "hidePreviewSnippets()");
		
		if (tc.textContent == null)
		{
			alert(tc);
			alert(tc.innerHTML);
			return;
		}
		
		// get the first 30 chars from post cell to make preview
		var ss = tc.textContent.substring(0,30);
		
		// set id to entire post row
		var postRow = rows[i+1];
		postRow.setAttribute("id", "PostRow_" + i);
		
		// add post cell to allPosts
		allPosts[counter] = tc;

		// set id for preview snippet
		var c = rows[i].cells[0];
		var s = document.createElement("span");
		s.setAttribute("id", "PreviewSnippet_" + i);
		
		// prep the preview snippet
		s.appendChild(document.createTextNode(ss));
		s.style.color = "#0000ff";
		s.style.fontWeight = "bold";
		s.style.textDecoration = "underline";
		s.style.display = "none";
		c.appendChild(s);
	}
	totalRows = counter;
	snippetsCreated = 1;
}

/*
This shows all preview text snippets and hides the corresponding post.
*/
function showPreviewSnippets()
{
	if (snippetsCreated != 1)
	{
		createPreviewSnippets();
	}
	
	for (var i = 2; i < totalRows; i += 2)
	{
		var snip = document.getElementById("PreviewSnippet_" + i);
		snip.style.display = "inline";
	}
}

/*
This hides all preview snippets and shows the full posts again.
*/
function hidePreviewSnippets()
{
	for (var i = 2; i < totalRows; i += 2)
	{
		var snip = document.getElementById("PreviewSnippet_" + i);
		snip.style.display = "none";
	}
}

/*
This function creates the toggle events for all of the posts' images so that the image can be clicked to either show or hide the corresponding post.
*/
function createToggleEvents()
{
	var table2 = findBigTable();
	var rows = table2.rows;

	for (var i = 2; i < rows.length; i += 2)
	{
		// get toggle images
		var ti = document.getElementById("Toggle_" + i);
		
		if (typeof window.addEventListener != "undefined")
		{
			ti.addEventListener("click", togglePost, false);
		}
		else
		{
			ti.attachEvent("click", togglePost);
		}
	}
}

/*
This functions handles a post being toggled.  It gets the id from the event argument and uses it to hide that particular post and show a text snippet in its place.  It also adjusts that show/hide image accordingly.
*/
function togglePost(evt)
{
	var imgId = evt.target.getAttribute("id");
	var nums = imgId.split("_");
	var num = nums[1];
	var post = document.getElementById("PostRow_" + num);
	
	// if it's already hidden, show post
	if (post.style.display == 'none')
	{
		post.style.display = 'table-row';
		
		// show corresponding preview snippet
		var snip = document.getElementById("PreviewSnippet_" + num);
		snip.style.display = "none";
		
		// change img
		var toggleImg = document.getElementById("Toggle_" + num);
		var oldSrc = toggleImg.getAttribute("src");
		// change right.gif to down.gif
		newSrc = oldSrc.replace("right.gif", "down.gif");
		// change original src
		toggleImg.setAttribute("src", newSrc);

		// show children
	}
	else
	{
		// else hide post, show snippet
		post.style.display = 'none';
		
		// show corresponding preview snippet
		var snip = document.getElementById("PreviewSnippet_" + num);
		snip.style.display = "inline";
		
		// change img
		var toggleImg = document.getElementById("Toggle_" + num);
		var oldSrc = toggleImg.getAttribute("src");
		// change down.gif to right.gif
		newSrc = oldSrc.replace("down.gif", "right.gif");
		// change original src
		toggleImg.setAttribute("src", newSrc);
		
		// hide children
	}
	
	// prevent other events from happening
	evt.preventDefault();
	evt.stopPropagation();
	evt.cancelBubble = true;
}

/*
The discussion board posts are contained in a "big table" that contains more than two rows.  This function goes through all of the tables on the page to find that table and assumes it is the table containing the posts.
*/
function findBigTable()
{
	var tables = document.getElementsByTagName("table");
	
	for (var i = 0; i < tables.length; i++)
	{
		if (tables[i].rows.length > 2)
		{
			return tables[i];
		}
	}
}


// This runs when the script is first executed.
function startUp()
{
	createPreviewSnippets()
	createToggleEvents();
}
startUp();
