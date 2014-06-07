// SABnzbd Oneclick Controls For tvnzb v0.1 by cookem
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name		SABnzbd Oneclick Controls For tvnzb
// @author		cookem
// @version		0.2
// @description		Creates links in newzbin post listings to add postid's to a SABnzbd server
// @include		http://*tvnzb.com/*
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
var gSabHost = "127.0.0.1:8080";

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
	"" +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addURL?url=$postid$&pp=0" + "\">A</a> " +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addURL?url=$postid$&pp=1" + "\">R</a> " +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addURL?url=$postid$&pp=2" + "\">U</a> " +
	"<a " + gTargetHtml + " href=\"http://" + gSabHost + "/sabnzbd/addURL?url=$postid$&pp=3" + "\">D</a>" +
	"";

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

	gPostRowsPath = "//form[@name='nzb_form']/table[@class='standard']/tbody/tr";
	gPostUrlPath = "td[5]/a";
  	gNodeToSabControlsPath = "td[8]";
  	return true;
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

	postId = urlNodes.snapshotItem(0);
		
	return postId.href;
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
	GM_log("before if");
	if(controlNodes.snapshotLength == 0)
		return;
	GM_log("after if");	
	sabControlsNode = controlNodes.snapshotItem(0);

	sabControlsNode.innerHTML = gControlsHtmlFormat.replace(postIdReplacePattern, postId);
	//sabControlsNode.parentNode.insertBefore(gControlsHtmlFormat.replace(postIdReplacePattern, postId), sabControlsNode);
}

// The entry point
function loadSabControls()
{
	var postRows;
	var postRow;
	var postId;
	var controlNodes1;
	var sabControlsNode1;
		
	addopenwin() 
	
	if(!initializePaths())
		return;
	
	postRows = getPostRows();
	
	postRow = postRows.snapshotItem(0);
	//postRow.insertCell(7);

	controlNodes1 = document.evaluate(
		gNodeToSabControlsPath,
		postRow,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	sabControlsNode1 = controlNodes1.snapshotItem(0);
	sabControlsNode1.innerHTML = "SABnzbd";
			
	for(var i = 1; i < postRows.snapshotLength; i=i+2)
	{
		postRow = postRows.snapshotItem(i);
		//postRow.insertCell(7);
		
		postId = getPostId(postRow);
		if(postId == null)
			postId = 1;

		appendSabControls(postRow, postId);
	}
	
}
function addopenwin() 
{
var head;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
var script = document.createElement("script");
//script.innerHTML = 'function openwin(fileName) { window.open(fileName,"sabnzbdwin","width=350,height=350,directories=no,location=no,menubar=no,scrollbars=yes,status=no,toolbar=no,resizable=no") }' ;
script.innerHTML = 'function openwin(fileName) { window.open(fileName,"sabnzbdwin","width=1000,height=600,directories=no,location=yes,menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes") }' ; 
script.setAttribute('language','JavaScript');
script.type = 'text/javascript';
head.appendChild(script);
}

window.addEventListener("load", loadSabControls, false);
