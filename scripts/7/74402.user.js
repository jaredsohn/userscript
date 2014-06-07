// ==UserScript==
// @name          ZppBeta
// @namespace     http://userstyles.org
// @description	  Test version of Zoklet++ 2
// @author        Mutant Funk Drink
// @homepage      http://userstyles.org/styles/24648
// @include       http://zoklet.net/*
// @include       https://zoklet.net/*
// @include       http://*.zoklet.net/*
// @include       https://*.zoklet.net/*
// ==/UserScript==
// <CSS>
//(function() {
//var css = ".postmessage A IMG{	width: inherit !important;	height: inherit !important;        max-width: 200px !important;        max-height: 200px !important;}.postmessage A IMG:hover{	width: inherit !important;	height: inherit !important;	border: 1px solid #000000 !important;        max-width: 600px !important;        max-height: 900px !important;}.postmessage A IMG{	z-index: 0;	}DIV DIV.page DIV TABLE.tborder TBODY TR TD.alt2 DIV.smallfont STRONG {     visibility: hidden !important;}DIV DIV.page DIV TABLE TBODY TR TD TABLE.tborder TBODY TR TD.alt2 DIV.smallfont A STRONG {     visibility: visible !important;}.alt1 DIV.smallfont A:visited{     color: #323232 !important;}.alt2 DIV.smallfont A:visited{     color: #323232 !important;}";
//if (typeof GM_addStyle != "undefined") {
	//GM_addStyle(css);
//} else if (typeof PRO_addStyle != "undefined") {
//	PRO_addStyle(css);
//} else if (typeof addStyle != "undefined") {
//	addStyle(css);
//} else {
	//var heads = document.getElementsByTagName("head");
	//if (heads.length > 0) {
	//	var node = document.createElement("style");
		//node.type = "text/css";
		//node.appendChild(document.createTextNode(css));
		//heads[0].appendChild(node); 
	//}
//}
//})();

// <new CSS function>
function injectCSS() {
    var headTag = document.getElementsByTagName("head")[0].innerHTML;	
	var newCSS = headTag + '<style type="text/css">.postmessage A IMG{	width: inherit !important;	height: inherit !important;        max-width: 200px !important;        max-height: 200px !important;}.postmessage A IMG:hover{	width: inherit !important;	height: inherit !important;	border: 1px solid #000000 !important;        max-width: 600px !important;        max-height: 900px !important;}.postmessage A IMG{	z-index: 0;	}DIV DIV.page DIV TABLE.tborder TBODY TR TD.alt2 DIV.smallfont STRONG {     visibility: hidden !important;}DIV DIV.page DIV TABLE TBODY TR TD TABLE.tborder TBODY TR TD.alt2 DIV.smallfont A STRONG {     visibility: visible !important;}.alt1 DIV.smallfont A:visited{     color: #323232 !important;}.alt2 DIV.smallfont A:visited{     color: #323232 !important;}</style>';
	document.getElementsByTagName('head')[0].innerHTML = newCSS;
 }
// </new CSS function>

// </CSS>


// <UPDATE NOTIFICATION>
script_updatetext="First major update.";
script_version=2.0;


	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='Zoklet++';
	scriptId='74284';
	scriptVersion=2.0;
	scriptUpdateText='Fixed a bug with one of the options not working, cant remember which. Changed the layout so it appears in the middle of the page.';
	// === Stop editing here. ===

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
		    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
		    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
			    		GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
			    		newversion = document.createElement("div");
			    		newversion.setAttribute('id', 'gm_update_alert');
			    		newversion.innerHTML = ''
					+'	<b>Zoklet++ Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			          		document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			    	}
	    		}
		});
	}
	
// </UPDATE NOTIFICATION>	


//   <APPEND NEXT PAGE>

// If-else statement that prevents the button from loading on pages other than showthread.php
//
// <check url>
if (window.location.pathname.match(/showthread.php/)) 
{
	injectButton();
}
else
{
}
// </check url>


//   <append button>
function injectButton()
{
window.addButton = function () {
	// Get the location on the page where you want to create the button
	// The code below does not work since the pagenav div has no ID, and is therefore commented out.
	//var targetDiv = document.getElementById('pagenav');

	
	
	// Finds the class of the div we are looking for.
	var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='pagenav']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    targetDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
}
	
	
	// Create a div to surround the button
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'zpp1');
	
	// Create the button and set its attributes
	var inputButton = document.createElement('input');
	inputButton.name = 'appendButton';
	inputButton.type = 'button';
	inputButton.id = 'zppbutton1';
	inputButton.value = 'Append Next Page';
	//inputButton.setAttribute("onclick", "pullMore();");
	
	// Append the button to the div
	newDiv.appendChild(inputButton); 
	targetDiv.appendChild(newDiv);
	
	var button = document.getElementById('zppbutton1');
    button.addEventListener('click', pullMore, false);
}

function changeid(pagenav){
obj.id = 'vapoorize' + obj.id
} 
}
// </append button>



// <append routines>
var nextURL = null; // the URL for next, or null for pending/none
var nextLinkNode = null; // the node of the "Next" link
var mainTable = null;
window.addEventListener("load", init, false);

// Check the scroll position on a timer because we can't use onscroll (bug 189308).
// If we do switch to onscroll, remember to call testScrollPosition after changing the page.
//setInterval(testScrollPosition, 100);

// Where the new button is called.
injectCSS();
addButton();

function init() 
{ 
  mainTable = findMainTable(document);
  nextLinkNode = findNextLink(document);
  setNextURL(document);
}

//  The code below originates from a script written by Paul Dawson, which automatically appends the next page once you scroll to the bottom of the page.
//  This script uses other parts of the original script, but does not need the code at the bottom which checks what part of the page you are on.
//  It has therefore been commented out.
// 
//function testScrollPosition() 
//{
  //if ((nextURL != null) && ((document.documentElement.offsetHeight - document.documentElement.scrollTop) < (1.2 * window.innerHeight))) {
     // We're near the bottom of the page; one press of pgdn could get close to the bottom of the page.
    // (At about 1.9 * window.innerHeight, one press of pgdn would actually hit the bottom of the page.)
    //pullMore();
  //}
//}

function pullMore()
{
  var iframe = document.createElement("iframe");
  iframe.addEventListener("load", whee, false);
  iframe.width = 1;
  iframe.height = 1;
  iframe.style.visibility = "hidden";
  iframe.src = nextURL;
  document.body.appendChild(iframe);

  // Don't pull this more than once.
  nextURL = null;

  function whee() {
    var iframeDoc = iframe.contentDocument;

    // Update nextURL for when we reach the bottom of the page again.
    setNextURL(iframeDoc);

    // Update the "Next" link in the page to make it a little less confusing.
    // Commented out because updating the "Next" link at the top of the page but not the one at
    // the bottom of the page is no good.
    // nextLinkNode.href = nextURL || "javascript:alert('No more!')";

    // no quick reply on Invision boards
    // removeQuickReply(mainTable);

    // Move posts into the main page's table.
    siphon(findMainTable(iframeDoc), mainTable);

    // Get rid of the iframe to free memory once it's GCed and so on.
    // Use a setTimeout to work around bug 305471 and to spread out the CPU usage to keep Firefox responsive.
    setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 1500);
  }
}

function findMainTable(doc)
{
  // posts are contained in a div#posts (very sensible)

  for (var div,i=0; div=doc.getElementsByTagName("div")[i]; ++i) {
    if (div.id == "posts") {
      return div;
    }
  }

  return null;
}

function findNextLink(doc)
{
  for (var link,i=0; link=doc.links[i]; ++i)
    if ((link.innerHTML == ">" || link.text == ">") && link.getAttribute("href").indexOf("showthread.php?") != -1) {
      return link;
    }
  return null;
}

function setNextURL(doc)
{
  var nextLink = findNextLink(doc)

  if (nextLink)
    nextURL = nextLink.href;
}

// Active topics have a "Quick Reply" textarea at the bottom of each page.
// This function removes it so you only have to see the last "Quick Reply" box on the page.
function removeQuickReply(table)
{
  var lastRow = lastRowOf(table);
  if (lastRow.getElementsByTagName("textarea")[0] != null) {
    lastRow.parentNode.removeChild(lastRow);
    
    // Remove the second-to-last row too.
    var lastRow = lastRowOf(table);
    lastRow.parentNode.removeChild(lastRow);
  }
}

function lastRowOf(table)
{
  return table.tBodies[0].rows[table.tBodies[0].rows.length - 1];
}

function siphon(sourceTable, destTable)
{
  var child;
  while ((child = sourceTable.childNodes[0]))
    destTable.appendChild(child);
}
// </append routines>
// </APPEND NEXT PAGE>

