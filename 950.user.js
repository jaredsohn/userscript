// ==UserScript==
// @name        FeedLink
// @description Displays images for the feeds (rss,atom,etc...) that is available from the site and will popup a menu for subscription when the the image is clicked.
// @include     http://*.blogspot.com*
// @include     http://www.livejournal.com/users/*
// ==/UserScript==
 
(function() {

// This script will create the necessary functions and adds a handler to onLoad function hook
// The reason is, the greasemonkey plugins will be called after creating DOM of document
// and before onLoad function of body is called. So changing DOM that is now available
// may lead to few problems in firefox.
window.addEventListener("load",addFeedLinks,false);

/* Register handler of mouseover on document
 */
document.onmouseover = checkAndHideMenu;
function addFeedLinks() {
    // First discover the feeds and save it
    feeds = discoverFeeds();
                                                                                                               
    var feedlinkDiv = document.createElement("div");
    for(feedname in feeds) {
        feedlinkDiv.appendChild(getLinkElementToAdd(feedname,feeds[feedname]));
    }
    document.body.appendChild(feedlinkDiv);

	// Create the popup menus
	createMenus();
}

function discoverFeeds() {
	var links = document.getElementsByTagName("link");
	var linkmap = new Object();

	for(var idx = 0; idx < links.length; ++idx) {
		var link = links.item(idx);
		if(link.rel == "alternate")	{
			// link type can be: (application/atom+xml) ,(application/rss+xml), (text/xml), ...
			var feedtype = (link.type.split('/'))[1];
			// now feedtype can be: (atom+xml), (rss+xml), (xml), (undefined)
			switch(feedtype) {
				case "atom+xml": linkmap["atom"] = link.href; break;
				case "rss+xml" : linkmap["rss"]  = link.href; break;
				case "xml"     : linkmap["xml"]  = link.href; break;
			}
		}		
	}
	return linkmap;
}
function getLinkElementToAdd(feedname,linkurl) {
	var imgelem = document.createElement("img");
	imgelem.setAttribute("align","right");
	//imgelem.setAttribute("onclick","return feedlinkv11().showMenu(event,'"+feedname+"');");
	imgelem.onclick = function (event) { return showMenu(event,feedname); };
	imgelem.setAttribute("border","0");
	imgelem.setAttribute("hspace","2");
	imgelem.setAttribute("alt",feedname);

	var linkelem = document.createElement("a");
	linkelem.setAttribute("href",linkurl);
	linkelem.setAttribute("title","Click to subscribe");
	//linkelem.setAttribute("onclick","return false;");
	linkelem.onclick = function(event) { return false; }
	linkelem.appendChild(imgelem);

	// set img src depending on feedname which can be (atom,rss,xml)
	switch(feedname) {
		case "atom": imgelem.setAttribute("src",ATOMIMGDATA); break;
		case "rss" : imgelem.setAttribute("src",RSSIMGDATA);  break;
		case "xml" : imgelem.setAttribute("src",XMLIMGDATA);  break;
	}
	return linkelem;
}

// Create menus and control their display
function createMenus() {
	createMenuStyle();
	for(feedname in feeds) {
         createSubscribeMenu(feedname,feeds[feedname]);
    }
}
function createMenuStyle() {
    var menuStyleNode = document.createElement("style");
    /* add the stylesheet node to the body
     */
    document.body.appendChild(menuStyleNode);
    /* get the reference to the new stylesheet node
     */
    menuStyleSheetNode = document.styleSheets[document.styleSheets.length-1];
    /* add the css rules required to build the menu
     */
    for(var i=0; i < MENUCSS.length; ++i) {
        menuStyleSheetNode.insertRule(MENUCSS[i],0);
    }
}
function createSubscribeMenu(feedtype,linkurl) {
    /* get the menuid corresponding to feedtype
     */
    var menuid = getMenuId(feedtype);
                                                                                                               
    /* avoid creating duplicate div elements
     */
    if(document.getElementById(menuid) != null) return;
                                                                                                               
    var subscribeMenuDiv = document.createElement("div");
    subscribeMenuDiv.setAttribute("id",menuid);
    subscribeMenuDiv.setAttribute("class","subscribeMenu");
    //subscribeMenuDiv.setAttribute("onmouseover","javascript:menuSelectionProgress=true;");
    //subscribeMenuDiv.setAttribute("onmouseout","javascript:menuSelectionProgress=false;");
	subscribeMenuDiv.onmouseover = function(event) { menuSelectionProgress = true; };
	subscribeMenuDiv.onmouseout  = function(event) { menuSelectionProgress = false; };
                                                                                                               
    /* create a div to wrap all the links (anchors)
     */
    var menuItemsDiv = document.createElement("div");
    menuItemsDiv.setAttribute("class","subscribe");
    //menuItemsDiv.setAttribute("onmouseout","checkAndHideMenu");
	menuItemsDiv.onmouseout = checkAndHideMenu;
                                                                                                               
    /* create the feed url anchor
     */
	var feedAnchorElement = document.createElement("a");
	feedAnchorElement.setAttribute("href",linkurl);
	feedAnchorElement.setAttribute("title",feedtype.toUpperCase()+" FeedURL");
	feedAnchorElement.onclick = function(event) { return hideMenu(event); }
	feedAnchorElement.innerHTML = feedtype.toUpperCase() + " Feed"
	menuItemsDiv.appendChild(feedAnchorElement);

	/* create the subscribe anchors
     */
    for(subscr in subscriptions) {
        var subscrURL = subscriptions[subscr];
                                                                                                               
        var anchorElement = document.createElement("a");
        anchorElement.setAttribute("href",subscrURL+linkurl);
        anchorElement.setAttribute("title",subscrURL+linkurl);
        //anchorElement.setAttribute("onclick","return hideMenu("+menuid+");");
		anchorElement.onclick = function(event) { return hideMenu(event); };
        anchorElement.innerHTML = subscr;
                                                                                                               
        /* first add a <BR/> 
         */
        menuItemsDiv.appendChild(document.createElement("br"));
        /* add anchor to its wrapper div
         */
        menuItemsDiv.appendChild(anchorElement);
    }
    /* add wrapper div to menudiv
     */
    subscribeMenuDiv.appendChild(menuItemsDiv);
    /* add menu div to the body
     */
    document.body.appendChild(subscribeMenuDiv);
}
function showMenu(eventParam,feedtype) {
	var scrollLeft = 0, scrollTop = 0;
	
	if(document.documentElement) { // when <!DOCTYPE is specified
		scrollLeft = document.documentElement.scrollLeft;
		scrollTop = document.documentElement.scrollTop;
	} else {
		scrollLeft = document.body.scrollLeft;
		scrollTop = document.body.scrollTop;
	}
	
    var menuleft = eventParam.clientX + scrollLeft;
    var menutop  = eventParam.clientY + scrollTop;
    /* Adjust the menutop and menuleft so that popup menu will not
     * get out of window. */
    if(menutop+MENUHEIGHT >= window.innerHeight) {
        menutop = menutop - MENUHEIGHT;
    }
	if(menuleft+MENUWIDTH >= window.innerWidth) {
		menuleft = menuleft - MENUWIDTH;
    }

    var menudiv = document.getElementById(getMenuId(feedtype));
    menudiv.style.left = menuleft +"px";
    menudiv.style.top = menutop+"px";
    menudiv.style.display = "block";

    /* save the menuid that is dispalyed for later reference
     */
    menuDisplayId = getMenuId(feedtype);
                                                                                                               
    /* return false so that if anchor's onclick is used to call this
     * it will stop further action. */
    return false;
}
function hideMenu(eventParam) {
    if(menuDisplayId != null) {
        document.getElementById(menuDisplayId).style.display = "none";
        menuDisplayId = null;
    }
    /* return true so that if anchor's onclick is used to call this
     * it will not stop further action. */
    return true;
}
                                                                                                               
/* This function will be handler for document.onmouseover so it should
 * only take one parameter and that will be a event parameter. */
function checkAndHideMenu(eventParam) {
    if(menuSelectionProgress == false) hideMenu(eventParam);
    /* do not stop the default actions of other handlers associated with
     * document.onmouseover (like, display of url on status bar when mouse
     * moves over a link). so return false. */
    return false;
}
                                                                                                               
function getMenuId(feedtype) {
    if(feedtype == "atom")  return ATOMFEEDMENUID;
    if(feedtype == "rss" )  return RSSFEEDMENUID;
    if(feedtype == "xml" )  return XMLFEEDMENUID;
}


// Variables need to controll the actions of popup and display of feed images
var subscriptions = new Object();
/* Associative array that holds the subscriptions text to display
 * and the subscription url.
 * FORMAT: subscritions[TEXT TO DISPLAY] = SUBSCRIPTION URL (feed url will be appended later)
 */
subscriptions["Subscribe to Bloglines"] = "http://www.bloglines.com/sub/";
subscriptions["Subscribe to NewsGator"] = "http://www.newsgator.com/ngs/subscriber/subext.aspx?url="
                                                                                                               
const ATOMFEEDMENUID = "atomFeedMenuDiv";
const RSSFEEDMENUID  = "rssFeedMenuDiv";
const XMLFEEDMENUID  = "xmlFeedMenuDiv";
                                                                                                               
const MENUHEIGHT = 45;
const MENUWIDTH = 135;
                                                                                                               
const MENUCSS = new Array(
".subscribe { font: 8pt,Arial,sans-serif;font-weight:bold;background-color:gray;width:"+MENUWIDTH+"px;height:"+MENUHEIGHT+"px;padding-left:2px;padding-right:2px;border-style:outset; text-align:left;}",
".subscribe a:link, .subscribe a:visited { color: white; }",
".subscribe a:hover { color: white; background-color:#FF8040; }",
".subscribeMenu { display: none; position: absolute; z-index: 10000;}");
                                                                                                               
var menuSelectionProgress = false;
var menuDisplayId = null;

// Feeds discovered should be save for usage
var feeds = null;

// Image data:
const ATOMIMGDATA = 
"data:image/gif;base64,R0lGODlhVAASAKEAAICAgP////+AQP///ywAAAAAV" +
"AASAAACt4SPqcvtD1eYtNqLs968VxMI4kiW5omWQcQ+KxCm8iy/7Z28Mc33Ng7U" +
"mXYCy4hyVKVsFtin+YEISSFikZos7ibLww+WC4OkIKV1a95aqV5xG/H7KqbJc7Z" +
"+rXZBFH4fCudSdkeEhqWnh8LkNhb41kCnhURolnel+NiYCbY5N3hJGRozuse5+b" +
"UoCHMnYnjE1RoLOnT6ZDsREdmziwnkq8sbfOT7+yl8XEQc5OfR7PwMHaU8TY1TAAA7"; 

const RSSIMGDATA =
"data:image/gif;base64,R0lGODlhVAASAKEAAICAgP////+AQP///ywAAAAAV" +
"AASAAACq4SPqcvtD1eYtNqLs968VxMI4kiW5omWQcQ+KxCm8iy/7Z28Mc33Ng7U" +
"jSxDSnHSUx0ssA/zAxGKdoIQ1Uqi+pa5LsL2Y0irWbIqiQJ7ud+2Y0ycapHo7JI" +
"CcjrdDfjURFdUN8VWCLIG4wIyxAjoWKfGdygZpuD3Z/Z3NRhpmMhXabmIiVlxpL" +
"U1eYf3hBc1OhhLCEQ7JstJWwt7C5kblOcRLDxMzOR7jAxUAAA7";

const XMLIMGDATA =
"data:image/gif;base64,R0lGODlhVAASAKEAAICAgP////+AQP///ywAAAAAV" + 
"AASAAACsISPqcvtD1eYtNqLs968VxMI4kiW5omWQcQ+KxCm8iy/7Z28Mc33Ng7U" +
"jXaCELGI7J1sFtin+YEIh6LYZGhULg8/WO4LkoJI1uruetQWuWA24tdVTLHUbFZ" +
"N5lJAz+fbNUZ2hmSHlxf2l+iG2DCXVFaYpsXUxmgZB0ZU9liVZLhm6aXIiJlJVd" +
"dJWIFH+da3FwUI80lbCiQ2S2toe+vgqKvE28ug42F8jJx8MczcfFsAADs="; 

})();
