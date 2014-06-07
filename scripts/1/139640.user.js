// ==UserScript==
// @name			Facepunch Subs
// @namespace		@LuaStoned
// @description		Extend fp_read to include subscribed threads
// @include			http*://*facepunch.com/fp_read.php
// @include			http*://*facepunch.com/forumdisplay.php*
// @version			1.3
// ==/UserScript==

// Facepunch <3
var jQuery = unsafeWindow.jQuery;
if (localStorage)
{
	if (!localStorage.FPS)
		localStorage.FPS = JSON.stringify(Array());
}
else
{
	alert("Script can't save threads, sorry.");
	return;
}

function arrayContainsID(array, ID)
{
	for (var i = 0; i < array.length; i++)
		if (array[i][0] == ID)
			return i;
	
	return -1;
}

function getSubDiv(ID, bool)
{
	var subscribeDiv = document.createElement("div");
	subscribeDiv.setAttribute("id", "subdiv_" + ID);
	subscribeDiv.setAttribute("class", "newposts");
	subscribeDiv.setAttribute("style", "display: none;");
	// subscribeDiv.setAttribute("style", "visibility: hidden;");
	
	var subscribeImage = document.createElement("img");
	subscribeImage.setAttribute("style", "height: 12px; width: 12px;");
	subscribeImage.setAttribute("src", "/fp/ratings/" + (bool ? "tick" : "cross") + ".png");
	
	var subscribeLink = document.createElement("a");
	subscribeLink.setAttribute("id", (bool ? "sub_" : "unsub_") + ID);
	subscribeLink.appendChild(subscribeImage);
	
	subscribeLink.appendChild(document.createTextNode(bool ? " Subscribe!" : " Unubscribe!"));
	subscribeLink.addEventListener("click", bool ? subscribeThread : unsubscribeThread);
	
	subscribeDiv.appendChild(subscribeLink);
	return subscribeDiv;
}

function swapShowHide(event)
{
	var threadID = this.getAttribute("id").match("\\d+").toString();
	// var subscribeDiv = document.getElementById("subdiv_" + threadID);
	
	/*if (event.type == "mouseenter")
		subscribeDiv.style.visibility = "visible";
	else
		subscribeDiv.style.visibility = "hidden";*/
	
	var subscribeDiv = jQuery("#subdiv_" + threadID);
	if (event.type == "mouseenter")
		subscribeDiv.fadeIn(300);
	else
		subscribeDiv.fadeOut(300);
}

// Global thread table
var threadTable = document.getElementById("threads").getElementsByTagName("tbody")[0];
if (document.URL.search("fp_read") < 0)
{
	function subscribeThread()
	{
		var threadID = this.getAttribute("id").match("\\d+").toString();
		var threadContainer = document.getElementById("thread_" + threadID);
		var threadInfo = threadContainer.getElementsByClassName("threadinfo")[0].getElementsByTagName("div")[0];
		
		var iconContainer = threadContainer.getElementsByClassName("threadicon")[0].getElementsByTagName("img")[0];
		var icon = iconContainer.getAttribute("title");
		var iconUrl = iconContainer.getAttribute("src");
		
		var authorContainer = threadInfo.getElementsByClassName("threadmeta")[0].getElementsByTagName("div")[0].getElementsByTagName("a")[0];
		var author = authorContainer.innerHTML;
		var authorUrl = authorContainer.getAttribute("href");
		
		var titleContainer = threadInfo.getElementsByClassName("threadtitle")[0];
		var titleSubContainer = titleContainer.getElementsByTagName("a")[0];
		var title = titleSubContainer.innerHTML;
		var titleUrl = titleSubContainer.getAttribute("href");
		
		var threadArray = Array(
			threadID,
			title,
			titleUrl,
			author,
			authorUrl,
			icon,
			iconUrl);
		
		var FPSArray = JSON.parse(localStorage.FPS);
		if (arrayContainsID(FPSArray, threadID) < 0)
		{
			FPSArray.push(threadArray);
			localStorage.FPS = JSON.stringify(FPSArray);
		}
		
		var subscribeDiv = document.getElementById("subdiv_" + threadID);
		subscribeDiv.parentElement.replaceChild(getSubDiv(threadID, false), subscribeDiv)
	}
	
	function unsubscribeThread()
	{
		var threadID = this.getAttribute("id").match("\\d+").toString();
		var FPSArray = JSON.parse(localStorage.FPS);
		FPSArray.pop(arrayContainsID(FPSArray, threadID));
		localStorage.FPS = JSON.stringify(FPSArray);
		
		var subscribeDiv = document.getElementById("subdiv_" + threadID);
		subscribeDiv.parentElement.replaceChild(getSubDiv(threadID, true), subscribeDiv)
	}	
	
	for (var i = 0; i < threadTable.children.length; i++)
	{
		var threadContainer = threadTable.children[i];
		var threadID = threadContainer.getAttribute("id").match("\\d+");
		var threadInfo = threadContainer.getElementsByClassName("threadinfo")[0].getElementsByTagName("div")[0];
		var threadTitleContainer = threadInfo.getElementsByClassName("threadtitle")[0];
		
		threadContainer.addEventListener("mouseenter", swapShowHide);
		threadContainer.addEventListener("mouseleave", swapShowHide);
		
		var FPSArray = JSON.parse(localStorage.FPS);
		var bSubscribe = arrayContainsID(FPSArray, threadID) < 0;
		
		var subscribeDiv = getSubDiv(threadID, bSubscribe);
		threadTitleContainer.appendChild(subscribeDiv);
	}
}
else
{
	function unsubscribeThread()
	{
		var threadID = this.getAttribute("id").match("\\d+").toString();
		var FPSArray = JSON.parse(localStorage.FPS);
		FPSArray.pop(arrayContainsID(FPSArray, threadID));
		localStorage.FPS = JSON.stringify(FPSArray);
		
		var threadContainer = document.getElementById("thread_sub_" + threadID);
		threadTable.removeChild(threadContainer);
	}
	
	// Subscription header
	var threadSubsHeader = document.createElement("tr");
	threadSubsHeader.setAttribute("class", "threadlisthead");
	threadSubsHeader.setAttribute("style", "background: #26F url(http://www.facepunch.com/images/buttons/newbtn_middle.png) repeat-x;");

	var threadSubsInner = document.createElement("td");
	threadSubsInner.setAttribute("colspan", 5);
	threadSubsInner.setAttribute("style", "padding: 5px; font-size: 16px; font-weight: bold;");
	threadSubsInner.innerHTML = "Subscribed Threads";
	threadSubsHeader.appendChild(threadSubsInner);
	
	var FPSArray = JSON.parse(localStorage.FPS);
	for (var i = 0; i < FPSArray.length; i++)
	{
		var threadID = FPSArray[i][0];
		var threadTitle = FPSArray[i][1];
		var threadTitleUrl = FPSArray[i][2];
		var threadAuthor = FPSArray[i][3];
		var threadAuthorUrl = FPSArray[i][4];
		var threadIcon = FPSArray[i][5];
		var threadIconUrl = FPSArray[i][6];
		
		// Only show threads that are not in fp_read already..
		if (document.getElementById("thread_" + threadID))
			continue;
		
		var threadContainer = document.createElement("tr");
		threadContainer.setAttribute("id", "thread_sub_" + threadID);
		threadContainer.setAttribute("class", "threadbit hot new nonsticky");
		threadTable.insertBefore(threadContainer, threadTable.firstChild);
		
		var threadStr = "\
			<td class=\"threadicon alt\">\
				<img border=\"0\" alt=\"" + threadIcon + "\" src=\"" + threadIconUrl + "\" title=\"" + threadIcon + "\">\
			</td>\
			<td class=\"threadinfo\">\
				<div class=\"inner\">\
					<div class=\"threaddetails\">\
						<div class=\"threaddetailicons\">\
							<div class=\"threadratings\">\
							</div>\
						</div>\
					</div>\
					<h3 class=\"threadtitle\">\
						<a id=\"thread_title_sub_" + threadID + "\" class=\"title threadtitle_unread\" href=\"showthread.php?t=" + threadID + "\" title=\"\">" + threadTitle + "</a>\
						<a href=\"fp_images.php?t=" + threadID + "\">\
							<img alt=\"This thread has images\" src=\"/fp/hasimages.png\" title=\"This thread has images\">\
						</a>\
						<div class=\"newposts\">\
							<a id=\"thread_gotonew_sub_" + threadID + "\" href=\"showthread.php?t=" + threadID + "&goto=newpost\">\
								<img src=\"/fp/newpost.gif\">\
								Goto new posts\
							</a>\
						</div>\
					</h3>\
					<div class=\"threadmeta\">\
						<p class=\"threaddesc\"></p>\
						<div class=\"author\">\
							<a href=\"" + threadAuthorUrl + "\">" + threadAuthor + "</a>\
							|\
							<a id=\"unsub_" + threadID + "\">Unsubscribe</a>\
						</div>\
					</div>\
				</div>\
			</td>\
			<td class=\"alt threadlastpost\">\
				<dl>\
				</dl>\
			</td>\
			<td class=\"threadreplies\">\
				<a onclick=\"who(" + threadID + "); return false;\" href=\"misc.php?do=whoposted&t=" + threadID + "\">~</a>\
			</td>\
			<td class=\"threadviews alt\">\
				<span>~</span>\
			</td>";
			
		threadContainer.innerHTML = threadStr;
		document.getElementById("unsub_" + threadID).addEventListener("click", unsubscribeThread);
	}
	
	threadTable.insertBefore(threadSubsHeader, threadTable.firstChild);
}

// Was too lazy to do it the clean? way..
/*var threadIconContainer = document.createElement("td");
threadIconContainer.setAttribute("class", "threadicon alt");
threadContainer.appendChild(threadIconContainer);

var threadIcon = document.createElement("img");
threadIcon.setAttribute("alt", threadIcon);
threadIcon.setAttribute("src", threadIconUrl);
threadIcon.setAttribute("title", threadIcon);
threadIcon.setAttribute("border", "0");
threadIconContainer.appendChild(threadIcon);

var threadInfo = document.createElement("td");
threadInfo.setAttribute("class", "threadinfo");

var threadTitleContainer = document.createElement("h3");
threadTitleContainer.setAttribute("class", "threadtitle");

var threadLink = document.createElement("a");
threadLink.setAttribute("id", "thread_title_" + threadID);
threadLink.setAttribute("class", "title threadtitle_unread");
threadLink.setAttribute("href", "showthread.php?t=" + threadID);
threadLink.innerHTML = threadTitle;


var newPosts = document.createElement("div");
newPosts.setAttribute("class", "newposts");

var newPostsLink = document.createElement("a");
newPostsLink.setAttribute("id", "thread_gotonew_" + threadID);
newPostsLink.setAttribute("href", "showthread.php?t=" + threadID + "&goto=newpost");
newPostsLink.innerHTML = "<img src=\"/fp/newpost.gif\"> New posts";

newPosts.appendChild(newPostsLink);	
threadTitleContainer.appendChild(threadLink);
threadTitleContainer.appendChild(newPosts);
threadInfo.appendChild(threadTitleContainer);
threadContainer.appendChild(threadInfo);*/