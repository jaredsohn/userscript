// ==UserScript==
// @name          Hanhai
// @description   JKNP support for Hanhai
// @include       http://bbs*.ustc.edu.cn/*
// ==/UserScript==

var isFF36up = false;
if (navigator.userAgent) {
  var ffver = navigator.userAgent.match(/Firefox\/3\.(\d+)/);
  isFF36up = ffver && parseInt(ffver[1], 10) >= 6;
}
 
var nsResolver = {
  lookupNamespaceURI:function (prefix) {
    if (isFF36up && prefix == "ns") {
      return "http://www.w3.org/1999/xhtml";
    }
    else {
      return "";
    }
  }
};


// list of threads on board page
var ThreadList;
// link to threads
var ThreadLink;
// list of posts on thread view
var PostList;
// list of quotes
var QuoteList;

// url to prev/next page
var hasPrev;
var PrevPage;
var hasNext;
var NextPage;

var current=0;
var max;

var debug = true;

var origin_color = '#EEEEEE';
var mark_color = '#FEFEFE';
var mark_post = '#DEDEDE';


function dev(msg)
{
    if(debug) 
    {alert( msg);}
}


function isBoard () 
{
    return( (/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbs(t)?doc(.)*/i.test(document.location)) ||
	    (/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbsgetmsg/i.test(document.location))
	  );
}

function isThread()
{
    return(/^http(s)?:\/\/bbs([\d])?.ustc.edu.cn\/cgi\/bbstcon(.)*/i.test(document.location));
}

function markerBoard(i)
{
    ThreadList.snapshotItem(i).style.backgroundColor = mark_color;
}

function unmarkerBoard(i)
{
    ThreadList.snapshotItem(i).style.backgroundColor = origin_color; 
}

function findPos(obj) 
{
    var curleft = curtop = 0;
    if (obj.offsetParent) {
	do {
	    curleft += obj.offsetLeft;
	    curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return [curleft,curtop];
    }
}
    
function scrollToPost(i)
{
    var t = PostList.snapshotItem(i);
    var pos = findPos(t);
    window.scrollTo(pos[0],pos[1]-10);
}

function markerPost(i)
{
    PostList.snapshotItem(i).style.backgroundColor = mark_post;
    scrollToPost(i);
}

function unmarkerPost(i)
{
    PostList.snapshotItem(i).style.backgroundColor = origin_color;
}

function getLinks()
{
    var Titles = document.evaluate("//td[@class='title']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    ThreadLink = new Array();
    for (var i = 0; i < Titles.snapshotLength; i++) {
	var thisTitle = Titles.snapshotItem(i);
	var rawlinks = thisTitle.innerHTML.replace(/\&amp;/g,'&').split("</a>");
	if(rawlinks.length>2)
	{ 
	    var origin = (rawlinks[0].match(/(?:href=")(.*)(?=")/))[1];
	    var full = (rawlinks[1].match(/(?:href=")(.*)(?=")/))[1];
	    ThreadLink[i] = [origin,full];
	}
	else
	{
	    var full = (rawlinks[0].match(/(?:href=")(.*)(?=")/))[1];
	    ThreadLink[i] = [full,full];
	}
    }
    var fix = ThreadLink.length - max - 1;
    for (var i = 0; i<fix; i++) {
	ThreadLink.shift();
    }
}

function enterThread(i)
{
    var link = (ThreadLink[i])[1];
    window.open(link,'_self');
}

function enterFullThread(i)
{
    var link = (ThreadLink[i])[0];
    window.open(link,'_self');
}

function getPN()
{
    var next =  document.evaluate("//a[@class='next']",document,null,
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(next.snapshotLength==1)
    {
	var str = next.snapshotItem(0).outerHTML;
	var res = (str.replace(/\&amp;/g,'&').match(/(?:href=")(.*)(?=")/))[1];
	NextPage = res;
	hasNext = true;
    } else {
	hasNext = false;
    }
    
    var prev = document.evaluate("//a[@class='prev']",document,null,
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(prev.snapshotLength==1)
    {
	var str = prev.snapshotItem(0).outerHTML;
	var res = (str.replace(/\&amp;/g,'&').match(/(?:href=")(.*)(?=")/))[1];
	PrevPage = res;
	hasPrev = true;
    } else {
	hasPrev = false;	
    }


}

function getThreads()
{
    ThreadList = document.evaluate("//ns:tr[@class='new' or @class='old']",document,nsResolver,
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    current = 0;
    max = ThreadList.snapshotLength-1;
    markerBoard(current);	
    getLinks();
    getPN();    
}



function KeyHandlerBoard(e)
{
    var w=e.which;
    switch(w)
    {
	// "j" or "J"
    case 106:
    case 74:
	if(current<max){
	    unmarkerBoard(current);
	    current+=1;
	    markerBoard(current);
	} else if(hasNext) {
	    window.open(NextPage,"_self");
	}	    
	break;
	// "k" or "K"
    case 107:
    case 75:
	if(current>0){
	    unmarkerBoard(current);
	    current-=1;
	    markerBoard(current);
	} else if(hasPrev) {
	    window.open(PrevPage,"_self");	    
	}
	break;
	// "l"
    case 108:
	enterFullThread(current);
	break;
	// "L"
    case 76:
	enterThread(current);
	break;
	// "n" or "N"
    case 110:
    case 78:
	if(hasNext) {
	    window.open(NextPage,"_self");
	}
	break;
	// "p" or "P"
    case 112:
    case 80:
	if(hasPrev) {
	    window.open(PrevPage,"_self");	    
	}
	break;
    default:
	return;
    };
    e.stopPropagation();
}

function getQuotes()
{
    // TODO
}


function getPosts()
{
    PostList = document.evaluate("//table[@class='bbsconbody']",document,null,
				   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    current = 0;
    max = PostList.snapshotLength-1;
    markerPost(current);
    getQuotes();
    getPN();
}

function KeyHandlerThread(e)
{
    var w=e.which;
    switch(w)
    {
	// "j" or "J"
    case 106:
    case 74:
	if(current<max){
	    unmarkerPost(current);
	    current+=1;
	    markerPost(current);
	}
	break;
	// "k" or "K"
    case 107:
    case 75:
	if(current>0){
	    unmarkerPost(current);
	    current-=1;
	    markerPost(current);
	}
	break;
	// "n" or "N"
    case 110:
    case 78:
	if(hasNext) {
	    window.open(NextPage,"_self");
	}
	break;
	// "p" or "P"
    case 112:
    case 80:
	if(hasPrev) {
	    window.open(PrevPage,"_self");	    
	}
	break;
    default:
	return;
    }
    e.stopPropagation();
}


if(isBoard()){
    getThreads();
    document.addEventListener("keypress",KeyHandlerBoard,true);    
} else if (isThread()) {
    getPosts();
    document.addEventListener("keypress",KeyHandlerThread,true);
}





