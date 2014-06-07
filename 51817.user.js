// ==UserScript==
// @name Postifier
// @description Double-click anywhere on a thread on www.bungie.net to load the next page of replies in-place.
// @author Bapabooiee
// @namespace http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @include http://*bungie.net/*
// ==/UserScript==

// Note from Bapa:
// This script never quite got where I wanted it to be -- and that's mostly to do with the fact this script
// was just for practice. So, there's no polish, and it's rather primitive. But at least it works.

///////////////////////////////////
// GLOBAL VARIABLES //
//////////////////////////////////

var gAddress = window.location.href;

var xhr = null; // the global httpRequest object
var refItem = null; // the item we'll insert posts before.

var nUserPage = 0; // what page the *user* is currently on

var nNextPage = 1; // what the next page to query should be?
var nMaxPage = 0; // what the last reported page num is in the thread

var gBaseURL = "";
var gLastURL = "";
var gLastPageNum = 0;

var gNewPages = new Array(); // an array of all the "retrieved" pages

var debug = true;



////////////////////////////////////////////////////////////
// CUSTOM TYPES
//////////

function Timer()
{
	this.started = false;
	this.ended = false;

	this.startTime = null;
	this.endTime = null;

	this.getSeconds = function()
		{
			if(!this.started && this.ended) // has the timer stopped, and have we at last stopped once?
			{
				var start = this.startTime.getTime();
				var end = this.endTime.getTime();

				return (end - start) / 1000;
			}
			else
				return -1;
		}

	this.start = function()
		{
			this.startTime = new Date();
			this.started = true;
		}

	this.stop = function()
		{
			this.endTime = new Date();

			this.ended = true;
			this.started = false;
		}
}

// A representation of a retrieved page.
function PageInfo(postCount, url, pageNum, lastPage, posts)
{
	this.postCount = postCount;
	this.url = url;
	this.pageNum = pageNum;
	this.lastPage = lastPage;
	this.posts = posts;
	
	this.startFade = function()
	{
		throw new Error("Unimplemented.");
	}
	
	this.showData = function()
	{
		alert("post count: "+this.postCount);
		alert("url: "+this.url);
		alert("lastnum: "+this.pageNum);
		alert("maxpage: "+this.lastPage);
		//alert(this.posts.innerHTML);
	}
	
	this.getPostCount = function()
	{
		throw new Error("Unimplemented.");
	}
}

////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
///////

// Is the current page a thread?
function pageIsThread(address)
{
	var exp = new RegExp("Forums.*postID(?!.*&act=(msg|reply|edit))", "i");

	var result = exp.test(address);

	if(exp.test(address))
		return true;
	else
		return false;

	// NOTE: Maybe this function should be more robust?
}

// Figure out what page we're on.
function getCurrentPage(address)
{
	if(!pageIsThread(address))
		return -1;

	if(!/&postRepeater1-p=/i.test(address))
	{
		return 1; // no post repeater, we are on page 1.
	}
	else
	{
		var result = /postRepeater1-p=(\d*)/i.exec(address);

		if(!result)
			return -1;
		else
			return parseInt(result[1]);
	}
}

function checkUserSignedIn()
{
	var utils = document.getElementById('utility');

	if(!utils)
		return false;

	if(utils.innerHTML.search(/ctl00_dashboardNav_passportSignOutLink/) != -1)
		return true;
	else
		return false;
}

// Figure-out the actual address of the thread, minus the "&postRepeater" stuff.
function getBaseAddress()
{
	var result = /(.*postID=\d*)/i.exec(gAddress);

	return result[1];
}


/////////////////////////////////
// Helper Functions //
////////////////////////////////

function findRefItem()
{
	var item = null;

	var block =  document.getElementById('ctl00_mainColPanel').getElementsByClassName('block-a')[0];

	for(var i = 0; i < block.childNodes.length; i++)
	{
		item = block.childNodes[i];
		if(item.nodeType == 1 && item.hasAttribute('class') && item.className == "clear")
			break;
	}

	return item;
}

// Check the contents of a returned page, and find-out if it's a valid page with posts or not.
function detectFail(parent)
{
	throw new Error("Unimplemented.");
}


// Strip away everything so we're only left with raw forum posts.
function removeAllButPosts(parent)
{
	var postCount = 0;
	var children = parent.childNodes;
	var item = null;
	
	var nodesToRemove = new Array();

	for(var i = 0; i < children.length; i++)
	{
		item = children[i];

//                if(item.nodeType == 1) // an element node
//		  {
			if(isElementPost(item))
			{
				postCount++;
				continue;
			}
			else
			{
				nodesToRemove.push(item);
				continue;
			}
//		  }
	}
	
	for(var i = 0; i < nodesToRemove.length; i++)
		parent.removeChild(nodesToRemove[i]);
}


function initialize()
{
// 	try
//	{ 

		gBaseURL = getBaseAddress();
		refItem = findRefItem();
		
		nUserPage = getCurrentPage(gAddress);
		nMaxPage = getPageCount(document, gAddress);
		
		var postCount = getPostCount(refItem.parentNode);
		nNextPage = nUserPage;
		
		createFirstPage(postCount);
		
		if(postCount == 25 && nUserPage+1 <= nMaxPage)
			nNextPage++;
			
		//alert(gNewPages[0].posts.childNodes.length);
					
		//alert(nUserPage);
		//alert(nMaxPage);
		document.body.addEventListener('dblclick', retrievalRequest, true);
// 	} catch(err)
//	{
//		alert(err);
//	}*/
}

function createFirstPage(postCount)
{
	var container = refItem.parentNode;
	var children = container.childNodes;
	
	var frag = document.createDocumentFragment();
		
	var item = null;
	for(var i = 0; i < children.length; i++)
	{
		item = children[i];
		
		if(isElementPost(item))
			frag.appendChild(item);
	
	}

	var firstPage = new PageInfo(postCount, gAddress, nUserPage, nMaxPage, frag);
	//firstPage.showData();
	gNewPages.push(firstPage);	
	refItem.parentNode.insertBefore(frag, refItem);	
}

function handleStateChange()
{
	var state = xhr.readyState;
	//var status = xhr.status;
	//var statustText = xhr.statusText;

	if(state == 4)
	{
		processResults(xhr.responseText);
		calcAndProcessPage();
	}
}

function appendPosts(posts)
{
	refItem.parentNode.insertBefore(posts, refItem);
}

function calcAndProcessPage()
{
	// Get the data for the last retrieved page.
	var currentPage = gNewPages[gNewPages.length - 1];
	
	if(!currentPage)
		return;
		
	var lastPage;
	
	if(gNewPages.length >= 2)
		lastPage = gNewPages[gNewPages.length - 2];
	else
		lastPage = null;
	
	if(lastPage)
	{		
		if(currentPage.pageNum == lastPage.pageNum)
		{
			var difference = currentPage.postCount - lastPage.postCount;
			
			if(difference > 0) // we have more posts than last time.
			{
				removePosts(currentPage, difference);	
				updateLastPage(lastPage, currentPage);
				gNewPages.pop();
				
				currentPage = lastPage;
				appendPosts(currentPage.posts);
			}
			else if (difference < 0)
			{
				// A user got banned or something. Not sure what to do about this yet.			
				// TODO: Fixme!
			}
			else
				gNewPages.pop();
		}
		else
			appendPosts(currentPage.posts);
	}
	else
	{
		/* We should never be here x_X */
		alert('kriez');
	}

	if(currentPage.postCount == 25 && nNextPage+1 <= currentPage.lastPage)
		nNextPage++;
}

function processPageInfo(lastPage, newPage)
{
}

function updateLastPage(lastPage, newPage)
{
	for(var i = 0; i < newPage.postCount; i++)
		lastPage.posts.appendChild(newPage.posts.childNodes[i].cloneNode(true));
	
	lastPage.postCount += newPage.postCount;
	lastPage.maxPage = newPage.maxPage;
}

function removePosts(pageInfo, count)
{
	var children = pageInfo.posts.childNodes;
	var item = null;
	
	var nodesToRemove = new Array();
	for(var i = 0; i < children.length - count; i++)
	{
		item = children[i];
		
		nodesToRemove.push(item)	
	}
	
	for(var i = 0; i < nodesToRemove.length;i++)
	{
		pageInfo.posts.removeChild(nodesToRemove[i]);
	}
	
	pageInfo.postCount = count;
}

function processResults(rawText)
{
	var postCount, maxPage;
	
	// NOTE: Unfortunately, it's impossble to get the responseXML -- all I can do is try to parse the reponseText in to a new element, and probe that instead.
	
	var tmpDiv = document.createElement('div'); // throw all of the retrieved HTML in to this guy.
	tmpDiv.innerHTML = rawText;
	
	/*
	var postDiv = document.createElement('div'); // the <div> that'll contain all the new posts.
	postDiv.innerHTML = " ";
	*/
	
	var frag = document.createDocumentFragment();
	
	var postsContainer = tmpDiv.getElementsByClassName('col forum_main_col_posts')[0].getElementsByClassName('block-a')[0];
		
	for(var i = 0; i < postsContainer.childNodes.length; i++)
		frag.appendChild(postsContainer.childNodes[i].cloneNode(true));
	
	
	var maxPage = getPageCount(tmpDiv, gLastURL);
	
	removeAllButPosts(frag);
	var postCount = getPostCount(frag);
	
	var newPageInfo = new PageInfo(postCount, gLastURL, gLastPageNum, maxPage, frag);
	gNewPages.push(newPageInfo);
	
	//newPageInfo.showData();
	
}

function retrievalRequest(tehEvent)
{
	var url = gBaseURL+"&postRepeater1-p="+nNextPage;

	gLastURL = url;
	gLastPageNum = nNextPage;
	
	queryPage(url);
}

function queryPage(url)
{
	xhr = new XMLHttpRequest();
	xhr.overrideMimeType("text/xml");

	xhr.onreadystatechange = handleStateChange;
	xhr.onerror = function(error) {alert(error);};

	xhr.open("GET", url, true);
	xhr.send(null);
}

function isElementPost(node)
{
	if(node.nodeType != 1 || !node.className)
		return false;
		
	if(/forum.*item/i.test(node.className))
		return true;
	else 
		return false;
}

function getPostCount(parent)
{
	var count = 0;

	for(var i = 0; i < parent.childNodes.length; i++)
	{
		if(isElementPost(parent.childNodes[i]))
			count++;
	}

	return count;
}

// Return the page count, if applicable.
function getPageCount(parent, address)
{
	if(!pageIsThread(address))
		return -1;

	var content = null;
	var chunks = null;

	// NOTE: A simple getElementById could be used... but we want to find this element from the HTML returned from |XMLHttpRequest|,
	//       since it doesn't have a |document| object.
	
	var spans = parent.getElementsByTagName('span');

	for(var i = 0; i < spans.length; i++)
	{
		if(spans[i].id == "ctl00_mainContent_cp1")
		{
			content = spans[i];
			break;
		}
	}

	if(!content)
		return 1; // Element doesn't exist. Chances are we're on a one-page'd thread (or something went wrong).

	chunks = content.getElementsByClassName('chunk');
	
	var text = null;
	for(var i = 0; i < chunks.length; i++)
	{
		text = chunks[i].innerHTML;

		if(text.search(/of/) != -1) // "... page of 362"
			return parseInt(text.split(" ")[1]);
	}

	return -1;
}


if(!pageIsThread(gAddress))
{}
else
	initialize();

//
// waitwat katgurlz?
//
