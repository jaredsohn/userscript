// ==UserScript==
// @name        DBO Forum Enhancer
// @icon		https://dl.dropbox.com/u/4209180/Destiny/other/favicon_32.png
// @namespace   userscripts@arithmomaniac.com
// @description	Adds new features to DBO Forums, including many feature restorations form HBO.
// @require		http://code.jquery.com/jquery-1.9.1.js
// @include     http://destiny.bungie.org/forum/*
// @version     0.7

// @copyright 	   2013+, Arithmomaniac (arithmomaniac@hotmail.com)
// @license		   MPL 1.1+ / GPL 2.0+ / LGPL 2.1+ / CC BY-SA 3.0+ US
// @license		   GNU Lesser General Public License 2.1+; http://www.gnu.org/licenses/lgpl.html
// @license		   Mozilla Public License 1.1+ ; http://www.mozilla.org/MPL/
// @license		   GNU General Public License 2.0+; http://www.gnu.org/licenses/gpl.html
// @license		   Creative Commons Attribution-Noncommercial 3.0+ United States License; http://creativecommons.org/licenses/by-sa/3.0/us/
// ==/UserScript==

/* 
VERSION HISTORY
Version 0.7.1	(2013-05-28)
	- Fixed bug for link changing on new threads
Version 0.7		(2013-03-20)
	- Added thread-context information to table homepage
	- Added permalinks to footers of every thread-mode post
	- In thread-post mode, showed title if different than that of post replying to

TO DO
- Add non-harded customization options
- Much more

*/

var options = 
{
	changeTable: true, //add columns to table, change links within
	addPermalinks: true, //add permalinks to footers of every post
	insertTitles: true //in multipost mode, show title if different than one replying to
}

if (options.changeTable && $(".normaltab").length) //also test that is table
{
	var rows = $(".normaltab").find(".a, .b")

	/*---Add the new columns to the table---*/
	var headers = $(".normaltab th")
	headers.eq(3).toggle();
	headers.eq(4).text( "New/Posts" ) //new / total # of posts (NOT replies!)
	headers.eq(4).after("<th>Latest</th>") //time of latests post
		//there has got to be a cleaner way to do this

	rows.each (function (){
		addAndPopulateNewColumns(this);
		changeLinks(this);
	}
	)
	rows.find("td:eq(2) a").css("color", "black") //make the links in first-post column black

	/*----------------------------Functions used Above----------------------------*/

		
	
}


if (options.addPermalinks) //add permalinks to bottom of every post. Note these are single-post permalinks
{
	$(".thread-posting").each(addPermalink)
	

}

if (options.insertTitles)
{
	$(".thread-posting").each(insertTitle)
	
	
	//don't bother with single-post mode, as lack of prev/next buttons means impossible not to notics
}

/*---TABLE: Tweak Css---*/
//TODO: MOVE TO USERSTYLE
//rows.find("a.replynew").css("font-weight", "bold"); //bold unread replies


//-----------------------------------------------

//add the latest post, new post cell values for each row
function addAndPopulateNewColumns(element)
{
	var existingCells = $(element).find("td");
	
	//hide the "views" column;
	existingCells.eq(3).toggle(); 
	
	// the "latests post" column
	var latestPostCell = existingCells.eq(2).clone();
	// the "replies column" which becomes "new/posts"
	var numberPostsCell = existingCells.eq(4);
	
	latestPostCell.find("span").text(
		calculateLatestPost(existingCells)
	)
	//now that contain right values, append
	existingCells.eq(4).after(latestPostCell);
	
	numberPostsCell.find("span").text(
		calculateNewPosts(existingCells)
	);
}

//move the link to original post to date column, and have the main like behave like HBO Guestbook *jump to new*
function changeLinks(element)
{
	var rowCells = $(element).find("td");
	var threadLink = rowCells.eq(0).find("a.thread, a.threadnew"); //find title in first cell
	if (!threadLink.length){
		return; //if sticky, say, ignore
	}
	if (!(rowCells.eq(0).find(".reply a.reply").length)) //if no replies at all
	{
		return; //don't change
	}

	threadLink = threadLink[0]; //convert to actual element
	
	//change the First-post-date element to link to the post
	//to do, we create new element and move old text into it
	//then we append the new element
	var dateCellSpan = rowCells.eq(2).find("span");
	var dateLink = $('<a href="' + threadLink.href + '"></a>');
	dateLink.text(dateCellSpan.text());
	dateCellSpan.text("");
	dateCellSpan.append(dateLink)
	
	//now find the hash to the main URL, to jump to right post
	
	var hashPostId = Math.min.apply(null, getPostIds(rowCells[0], "a.replynew")) //get first new
	if (hashPostId == -Infinity) //if not exist
		hashPostId = Math.max.apply(null, getPostIds(rowCells[0], "a.reply")) //use last post
		
	//if exist, we add the hash of the first new post (or last post, if case may be) to the thread link
	if (hashPostId != Infinity)//ignore if no replies at all
	{
		threadLink.href += ("#p" +  hashPostId)
	}
	
}


//calculates date of latest post
function calculateLatestPost(jqElements)
{

	//if old sticky, ignore date entirely - just clutter
	if (jqElements.find("a.thread-sticky").length)
	{
		return "---"
	}
	//no replies - since have not rn calculateNewPosts yet
	else if (jqElements.eq(4).text() == "0")
	{
		return jqElements.eq(2).text(); //show the time of the only post again
	}
	else
	{
		var MaxId = Math.max.apply(null, getPostIds(jqElements[0], "a.reply, a.replynew")); //find the maximum hash (eg. newest post)
		var MaxIdPostBubble = $("#p" + MaxId.toString()) //get the post bubble corresponding to the post - easiest marker
		var maxIdLinkTitle = MaxIdPostBubble.prevAll("a")[0].title //get title of actual post link
		return maxIdLinkTitle.substring(maxIdLinkTitle.length - 17); //trim non-date jqElements
	}
	
}


//calculates number of new posts, in a string containging also number of posts total
function calculateNewPosts(jqElements)
{
	
	
	jqElement = jqElements.eq(0) //only the first cell matters now here
	
	//sticky post - not applicable
	if (jqElement.find("a.thread-sticky, a.threadnew-sticky").length)
	{
		return "-"
	}
	
	//non-sticky posts
	totalPosts = parseInt(jqElements.eq(4).text()) + 1 //total posts = replies + 1
	var unreadPosts; 
	
	if (jqElement.find("a.threadnew").length) //new posts, as "thread-new"
	{
		noReadReplies = !(jqElement.find(".reply a.reply").length); 
		unreadPosts =	jqElement.find(".reply a.replynew").length + 	//number new replies
					+ noReadReplies; 						//if no read replies, assume root is unread, too
	}
	return (unreadPosts || 0 ) + " / " + totalPosts;
}

function getPostIds(element, childSelector)
{
return $(element).find(childSelector).map(
			//get all the URL hashes (eg "#p1337) for reply posts, and then parse the contained number within
			function(){ return parseInt(this.hash.substring(2))	} //trim the first two chars and convert to number
		).get() //turn into an array
}

function insertTitle()
	{
		postJqElement = $(this);
		var origLink = postJqElement.find(".op-link a");
		if (!(origLink.length)) 
		{
			return;
		}
		var title = postJqElement.find(".header h2").text();
		var parentTitle = $(origLink[0].hash).find(".header h2, .header h1").text();
		
		if (title != parentTitle)
		{
			var postBody = postJqElement.find(".body");
			if (postBody.text() == "\n- No text -\n")
				postBody.text("");
			postBody.prepend("<p>" + title + " [<strong>Title</strong>]</p>")
		}
	}
	
	
	function addPermalink(){
		postElement = this;
		var postId = postElement.id.substring(1);
		var replyLink = $(postElement).find(".reply .stronglink");
		replyLink.text("Reply");
		permaLink = replyLink.clone();
		replyLink.after(permaLink);
		permaLink[0].textContent = "Permalink";
		permaLink[0].title = "";
		permaLink[0].href = "http://destiny.bungie.org/forum/index.php?id=" + postId;
		replyLink.after("&nbsp;&nbsp;&nbsp;");
	}