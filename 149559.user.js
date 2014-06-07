// ==UserScript==
// @name          MobyGames Advanced Random
// @namespace	  mobyrandom
// @version 	  0.4
// @updateURL     http://userscripts.org/scripts/source/149559.meta.js
// @downloadURL   http://userscripts.org/scripts/source/149559.user.js
// @description   Extends capabilities of MobyGames' random game chooser
// @include		  http*://*.mobygames.com/*
// @grant         none
// ==/UserScript== 

var debug = 0    // Toggle Debug Mode (console logging)
                 // 1 = On
				 // 0 = Off
				 
var GameBrowserMax = 38261 // Since I haven't implemented a way to dynamically determine this integer yet, I'm putting a
					       // preset integer here as of October 3, 2012. 
						   // Page: http://www.mobygames.com/browse/games/list-games/
						   // Top of page: "(items 1-25 of X)"
						   // GameBrowserMax should = X.
						   
/* Changelog:
[0.4 (October 3, 2012)]
- Implemented cleaner method of debug message logging
- Fixed HTTPS usage
- New value for GameBrowserMax */				   
						   					   
/* To Do:
- Implement way to determine GameBrowserMax automatically
- Settings, and filters to change the type of results you get, such as by year, platform, etc
- GUI for settings and filters */
				 
function queryRandom(min,max) { // query random.org for integers
debugMsg('min: ' + min + ' max: ' + max);
var rdo = 'http://www.random.org/integers/?num=1&min=' + min + '&max=' + max + '&col=1&base=10&format=plain&rnd=new' // random.org url
var rdoReq = new XMLHttpRequest();
var rdoReqState = rdoReq.readyState
rdoReq.open("GET",rdo,false)
rdoReq.send(); 
var rdoInt = rdoReq.responseText
debugMsg('random.org returns integer ' + rdoInt);
return rdoInt 
}

function getNewPage(offsetNum){
var gamelistUrl = 'http://www.mobygames.com/browse/games/offset,' + offsetNum + '/so,0a/list-games/'
	if(isUsingHttps() == 'https')
	{
	var gamelistUrl = 'https://www.mobygames.com/browse/games/offset,' + offsetNum + '/so,0a/list-games/'
	}
debugMsg('mobygames game list url: ' + gamelistUrl);
if(offsetNum!=0 || offsetNum!=='' || offsetNum!=='undefined') // use if not > < statement here instead
	{
	var gamelistGet = new XMLHttpRequest(); 
	gamelistGet.open("GET",gamelistUrl,false);
	gamelistGet.send();
	var gamelistRspTxt = gamelistGet.responseText
	var gamelistDom = new DOMParser().parseFromString(gamelistRspTxt,"text/html")
	}
	debugMsg('new game list DOM: ' + gamelistDom);
	var gamelistLinks = gamelistDom.evaluate("//a[contains(@href, '/game/')]", gamelistDom, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var gamelistNumLinks = gamelistLinks.snapshotLength
	debugMsg('number of game links in new game list DOM snapshot: ' + gamelistNumLinks)
	var gamelistNumLinksRdm = queryRandom(1,gamelistNumLinks)
	var gamelistNewLink = gamelistLinks.snapshotItem(gamelistNumLinksRdm)
	return gamelistNewLink;
}
	
function findRandomGameLink()
{
var rdmgmlinkGet = document.evaluate("//a[contains(@href, 'random')]", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
debugMsg('mobygames random game link, snapshot length: ' + rdmgmlinkGet.snapshotLength)
	for (var i=0; i < rdmgmlinkGet.snapshotLength; i++)
	{
	var rdmgmlinkGetT = rdmgmlinkGet.snapshotItem(i)
	return rdmgmlinkGetT;
	}
}

function gotoUrl(url)
{
window.location.href = url
debugMsg('redirecting to ' + url);
}

function hookRandomGameLink()
{
var hook = findRandomGameLink()
hook.href = 'javascript:;'
hook.addEventListener('click',main,false) // bind new function to event listener
}

function main()
{
var qro = queryRandom(1,GameBrowserMax)
var newUrl = getNewPage(qro)
gotoUrl(newUrl);
}

function debugMsg(msg)
{
	if(debug==1)
	{
	console.log(arguments.callee.caller.name + ': ' + msg)
	}
}

function isUsingHttps()
{
	if(window.location.protocol == 'https:')
	{
	return 'https'
	}
}

function test() // test function for use during development
{
alert('hello world');
queryRandom(1,10);
return success
}

hookRandomGameLink();