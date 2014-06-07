// SABnzbd Oneclick Controls For Newzbin v0.2 by Pedro Ferreira
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name		SABnzbd Oneclick Controls For Newzbin
// @author		Pedro Ferreira
// @version		0.2
// @description		Creates links in newzbin post listings to add postid's to a SABnzbd server
// @include		http://*newzbin.com/*
// @include		http://*newzxxx.com/*
// ==/UserScript==
// 
//
// Features:
// 		Adds 4 links in every post for each post processing action (add, +repair, +unpack, +delete)
//		SABnzbd links open in a popup window
// 		Supports different listing styles as defined in newzbin under "My Account/Preferences"
//		Customizable HTML format for the SAB links
// 		
// 
//	v0.2:
//		- Modified the Node Paths to make it compatible with the recent layout changes in newzbin.com
//		- Added configuration settings to choose the target of SAB window. (same, new, popup, frame).
//
//
// *** Users must edit the User Configuration section bellow to match their settings ***
//



/******************** User Configuration Start ********************/

// The host and port of SAB server. In the form of host:port
//
// Examples: 	localhost:8080
// 		192.168.0.1:1234
// 		mycomputer:7891
// 		mydns.com:9999
//
var gSabHost = "localhost:8080";

// Select the used Listing Style in newzbin (My Account/Preferences)
//
// Options:	
//		0 - (V2) [ALL]
//		1 - (V3) NB Classic (ALL)
// 		2 - (V3) NB V3 (Attrs in Popup)
// 		3 - (V3) NB V3 (Attrs in Table)
// 		4 - (V3) CypherNEUK #1 (Attrs in Popup)
//		5 - (V3) CypherNEUK #1 (Attrs in Table)
//
var gListingStyle = 1;

// Selects the target of the SAB window.
//
// Options:	
//		0 - Same window
//		1 - New window
//		2 - Popup window
//		3 - Frame (See below for frame name settings)
//
var gTargetWindow = 2;

// The name of the frame to open windows. Only needed if using gTargetWindow = 3. (See above)
//
var gFrameName = "SABFrame";

/******************** User Configuration End ********************/



var gTargetHtml = "";

if(gTargetWindow == 1) //New window
{
	gTargetHtml = "target=\"_blank\"";
}else if(gTargetWindow == 2) //Popup window
{
	gTargetHtml = "onclick=\"openwin(href); return false;\""
}else if(gTargetWindow == 3) //Frame
{
	gTargetHtml = "target=\"" + gFrameName + "\"";
}

// Controls HTML
// This HTML will be appended to the innerHTML of the node specified in gNodeToSabControlsPath
// use $postid$ as a placeholder for the specific postid
var gControlsHtmlFormat =
	"<br/>" +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addID?id=$postid$&pp=0" + "\">A</a> " +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addID?id=$postid$&pp=1" + "\">R</a> " +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addID?id=$postid$&pp=2" + "\">U</a> " +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addID?id=$postid$&pp=3" + "\">D</a>";

// The regex pattern to replace the $postid$ in the HTML
var postIdReplacePattern = /\$postid\$/g;

// The regex pattern to match a postid in one url
var gPostIdUrlPattern = /\/browse\/post\/(\d+)/;

var gPostRowsPath;
var gPostUrlPath;
var gNodeToSabControlsPath;

// Initializes the XPath expressions to the specified listing style (gListingStyle)
function initializePaths()
{
	gPostRowsPath = "//form/table/tbody[@class=\"odd\" or @class=\"even\" or @class=\"odd-new\" or @class=\"even-new\"]";
	
	switch(gListingStyle)
	{
		case 0: //(V2) (ALL)
			gPostRowsPath = "//table/tbody/tr[@class=\"odd\" or @class=\"even\" or @class=\"new\"]";
			gPostUrlPath = "td[6]/a[@href]";
			gNodeToSabControlsPath = "td[2]";
			return true;
		break;
		
		case 1: //NB Classic (ALL)
			gPostUrlPath = "tr/td[4]/a[2]";
			gNodeToSabControlsPath = "tr/td[3]";
			return true;
		break;
		
		case 2: //NB V3 (Attrs in Popup)
			gPostUrlPath = "tr/td[2]/a[2]";
			gNodeToSabControlsPath = "tr[2]/td";
			return true;
		break;
		
		case 3: //NB V3 (Attrs in Table)
			gPostUrlPath = "tr/td[2]/a[2]";
			gNodeToSabControlsPath = "tr[2]/td";
			return true;
		break;
		
		case 4: //CypherNEUK #1 (Attrs in Popup)
			gPostUrlPath = "tr/td[3]/a[2]";
			gNodeToSabControlsPath = "tr[2]/td";
			return true;
		break;
		
		case 5: //CypherNEUK #1 (Attrs in Table)
			gPostUrlPath = "tr/td[3]/a[2]";
			gNodeToSabControlsPath = "tr[2]/td";
			return true;
		break;
		
		default:
			return false;
	}
}

// Returns all post rows in the document
function getPostRows()
{
	return document.evaluate(
		gPostRowsPath,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}

// Returns the post id of a postRow node
function getPostId(postRow)
{
	var postid;
	var prefixIndex;
	var postUrl;
	var urlNodes;
	
	urlNodes = document.evaluate(
		gPostUrlPath,
		postRow,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(urlNodes.snapshotLength == 0)
		return null;

	postUrl = urlNodes.snapshotItem(0).href;
	
	postId = postUrl.match(gPostIdUrlPattern);
	
	if(postId == null)
		return null;
		
	return postId[1];
}

// Append the SAB controls in a post row
function appendSabControls(postRow, postId)
{
	var controlNodes;
	var sabControlsNode;

	controlNodes = document.evaluate(
		gNodeToSabControlsPath,
		postRow,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(controlNodes.snapshotLength == 0)
		return;

	sabControlsNode = controlNodes.snapshotItem(0);
	
	sabControlsNode.innerHTML += gControlsHtmlFormat.replace(postIdReplacePattern, postId);
}

// The entry point
function loadSabControls()
{
	var postRows;
	var postRow;
	var postId;
	
	if(!initializePaths())
		return;
	
	postRows = getPostRows();
	
	for(var i = 0; i < postRows.snapshotLength; i++)
	{
		postRow = postRows.snapshotItem(i);

		postId = getPostId(postRow);
		if(postId == null)
			continue;

		appendSabControls(postRow, postId);
	}
}

window.addEventListener("load", loadSabControls, false);