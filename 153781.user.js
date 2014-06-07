// ==UserScript==
// @name        Ghost Trapper Livefeed Clicker
// @namespace   Hazado
// @description Clicks and Refreshes the Live Feed
// @include     *www.ghost-trappers.com/fb/live_feed.php*
// @version     1.0
// ==/UserScript==

function selectNodes(xPath,params){
	params=(params||{});
	return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
}

//short form for evaluate with single node return
function selectSingleNode(xPath,params){
	params=params||{}; params['type']=9;
	return selectNodes(xPath,params).singleNodeValue;
}

function click(e) {
	if(!e && typeof e=='string') e=document.getElementById(e);
	if(!e) return;
	var evObj = e.ownerDocument.createEvent('MouseEvents');
	evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evObj);
	evObj=null;
};

noclick = false;
function checkforfeed() {
	if (noclick == false) {
		var link = document.getElementById('updateButton');
		var test = document.getElementById('updateText');
		document.title = "GT Live Feed - "+test.title.match(/[0-9]* s/)+" until refresh";
		if (test == null) window.setTimeout(function () {window.location.href = "http://www.ghost-trappers.com/fb/live_feed.php"}, 300000);
		else if (test.title == 'You can update the live feed in 0 seconds.') 
		{
			noclick = true;
			window.setTimeout(function () {click(link.children[0])},1000);
		}
	}
}

function clickfeed() {
	var link = selectSingleNode(".//div[contains(@id,'showMonsterContainer') and not(contains(@title,'processed'))]");
	if (link != null) 
	{
		link.setAttribute("title","processed")
		click(link.children[0]);
		window.setTimeout(clickfeed,(Math.round((Math.random() * 1)) + 1) * 1000);
	}
}

if (document.body.innerHTML.match(/doing maintenance and will be back in a few minutes/)) window.setTimeout(function () {window.location.href = "http://www.ghost-trappers.com/fb/live_feed.php"}, 300000);
else 
{
	window.setInterval(checkforfeed,1000);
	window.setTimeout(clickfeed,(Math.round((Math.random() * 1)) + 1) * 1000);
}