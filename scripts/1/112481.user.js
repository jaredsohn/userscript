// ==UserScript==
// @name Youtube Video Hider
// @author deathgorepain
// @version 0.1b
// @description Hides videos you don't want to see on youtube
// @include /^https?://(www.)?youtube.com/*/
// @license Youtube Video Hider by deathgorepain is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// @license http://creativecommons.org/licenses/by-nc-sa/3.0/
// @namespace net.sourceforge.deathgorepain
// ==/UserScript==


/*
 * Changelist:
 * 0.1b:
 *	- Changed include to ignore accounts.google.com otherwise problems occur
 *	- Added '/' and '/watch' as recognized paths
 *	- Added possibility to hide comments by certain users
 *	- Added filtering of featured results under '/results'
 * 0.1a:
 *	- First version, simple, supporting only a few pages
 */

 /* TODO
  *	- Somehow let users add entries to lists without editing script
  * - Maybe replace hidden videos with appropriate feed entries
  */
 
//-------------------------------------------------------------------------
//-------------------------Variables---------------------------------------
//-------------------------------------------------------------------------

//Generate list of stuff you wanna hide
var userList = [];
var titleList = [];
var commenterList = [];

var path = document.location.pathname;

/** Simple class to contain
  *
  * @thePath		URL.path component the XPaths apply to
  * @theUserXPath 	XPath to find video by user
  * @theTitleXPath 	XPath to find video by title
  */
function Item(thePath,theUserXPath,theTitleXPath){
	this.path=thePath;
	this.xPathUser=theUserXPath;
	this.xPathTitle=theTitleXPath;
}

/*Each youtube page displays videos differently
 *we will have to check the path of the uri
 *then search with XPath for the incriminating element and it's parents
 */
var items = [
		//Main page
		new Item("/",
			"//span[@class='video-username']//a[contains(.,'{0}')]/ancestor::div[@class='video-cell'][1]",
			"//div[@class='video-title']//a[contains(.,'{0}')]/ancestor::div[@class='video-cell'][1]"),
		//Results page	
		new Item( "/results",
				"//a[contains(.,'{0}')]/ancestor::div[contains(@class,'*sr')][1]"
				//Featured results
				+"|//span[@class='ads-by']/a[contains(.,'{0}')]/ancestor::div[contains(@class,'sidebar-ads featured') or @class='result-item'][1]",
				"//a[contains(@title,'{0}')]/ancestor::div[contains(@class,'*sr')][1]"
				//Featured results
				+"|//a[@title=* and contains(.,'{0}')]/ancestor::div[contains(@class,'sidebar-ads featured')][1]"),
		//User page
		new Item("/user",
				"//a[contains(.,'{0}')]/ancestor::div[@class='content'][1]",
				"//span[contains(.,'{0}')]/ancestor::div[@class='content'][1]"),
		//Browse page
		new Item("/videos",
				"//a[contains(.,'{0}')]/ancestor::div[@class='video-cell *vl'][1]",
				"//a[contains(.,'{0}') and @class='video-title']/ancestor::div[@class='video-cell *vl'][1]"),
		//Music page
		new Item("/music",
			"//a[contains(.,'{0}')]/ancestor::div[@class='video-cell *vl'][1]",
			"//div[@class='browse-item-content']/span[@class='stat']/a[contains(.,'{0}')]/ancestor::div[@class='browse-item music-item removable-item'][1]"),
		//Video (playing) page
		new Item("/watch",
			"//span[@class='stat' and contains(.,'{0}')]/ancestor::li[@class='video-list-item '][1]",
			"//span[@class='title' and contains(.,'{0}')]/ancestor::li[@class='video-list-item '][1]")		
	];
const XPATH_COMMENT = "//li[@class='comment ' and @data-author='{0}']";

//Find out where we are and throw exception if we can't handle it.
var item=null;
for( index in items){
	if( path == items[index].path)
		item = items[index];
}
if(item==null) throw "[Greasemonkey:Youtube Video Hider]Unknown path. Won't try to hide anything here.";

//-------------------------------------------------------------------------
//----------------------Useful functions-----------------------------------
//-------------------------------------------------------------------------
/** Evalutes a given XPath-expression on the current document.
  *
  * @param xPath	expression to evaluate
  * @returns XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE	Snapshot of evaluation-results.
  */
function evaluate(xPath){
	return document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
}

/** Hides all nodes in a given <code>snapshot</code> (XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE)
  *
  * @param snapshot XPathResult (XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE) of an evaluated expression.
  */
function hideNodes(snapshot){
	var item;
	for ( var i=0 ; i < snapshot.snapshotLength; i++ ){
		item = snapshot.snapshotItem(i);
		item.style.display="none";
	}
}

/** A simple function to evalute format strings.
  * Thanks to <b>Filipiz</b> on <a href="http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4256130#4256130" >stackoverflow.com</a>
  * @args Arguments to be inserted into the format string
  */
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

String.prototype.startsWith = function(string){
	return this.indexOf(string)==0;
}

//-------------------------------------------------------------------------
//----------------------The actual hiding process--------------------------
//-------------------------------------------------------------------------

//Hide videos by user
for(user in userList){
	hideNodes(evaluate(item.xPathUser.format(userList[user])));
}

//Hide videos with title
for(title in userList){
	hideNodes(evaluate(item.xPathTitle.format(titleList[title])));
}

//Hide comments by users
if(path!='/watch')
	return;
for(commenter in commenterList){
	hideNodes(evaluate(XPATH_COMMENT.format(commenterList[commenter])));
}
