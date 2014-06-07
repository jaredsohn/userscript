// ==UserScript==
// @name          OneNote Online (OneDrive): collapse section pane
// @namespace     http://userscripts.org/topics/99057
// @include       https://onenote.officeapps.live.com/o/onenoteframe.aspx*
// @include       https://onenote.beta.officeapps.live.com/o/onenoteframe.aspx*
// @description   A crude script to hide the Section/Page pane in Microsoft OneNote Online on OneDrive (formerly OneNote Web App on SkyDrive). This can be useful when taking lots of notes on a single page.
// @grant         GM_addStyle
// @version       0.111
// ==/UserScript==


// Version history (added retroactively as of 0.03)
// 0.111(2014-02-20): tweaked horizontal scroll bar width values; removed GM_addStyle() spamming
// 0.11 (2014-02-20): merged with 'hide horizontal scroll bars' script, and changed title
// 0.1  (2014-02-19): updated to work with OneDrive (nee SkyDrive)
// 0.095(2013-08-16): oops, forgot to add "leftPanel" to server production code
// 0.094(2013-06-21): server-side variable reverted? added more error-checking
// 0.093(2013-06-20): fixed to match server-side variable renaming; also added some error-checking
// 0.092(2012-12-28): fixed for vertical scroll bar case (many/long sections), fixed bug
// 0.091(2012-12-24): disable page pane resize when hidden
// 0.09 (2012-12-24): account for possibly resized page panel
// 0.082(2012-10-24): Various refactoring--most notably, purged CDATA usages
// 0.081(2012-10-23): server-side: looks like beta/non-beta distinction is gone...
// 0.08 (2012-10-22): hey, z-index clobber fixes Web App Preview! beware name overlap
// 0.072(2012-10-22): PAGES button color RGB(68,68,68); also increased z-index to 10000
// 0.071(2012-10-22): z-index clobber to allow "pretty button"
// 0.07 (2012-10-22): server-side style changes (basically, beta has been deployed)
// 0.06 (2012-10-03): inline CSS comment (beta). also, actually added @grant
// 0.052(2012-10-03): d'oh, need to @grant GM_addStyle
// 0.051(2012-10-03): "@grant none" metadata; only YOU can prevent annoying warnings
// 0.05 (2012-07-23): OneNote Web App Preview support (ugly button on left)
// 0.04 (2012-07-23): smiley comment was killing CSS; default full -212px (not ugly 200)
// 0.03 (2012-04-10): changed button position to avoid overlap with Table Layout
// 0.02 (2012-03-09): added graphical button interface; toggle without reloading page!
// 0.01 (2012-03-08): basic functionality, no button
// VIAM INVENIEMUS AUT FACIEMUS

// Core functionality references
// http://csscreator.com/node/12184 - post 2005-12-07 13:28
// http://stackoverflow.com/questions/1677558/greasemonkey-against-an-iframe-using-include-does-this-work
// ironically, this is eminently doable in firebug, but scratchpad can't do it directly because it's an embedded iframe

// Button + cosmetic references
// http://stackoverflow.com/questions/6480082/add-a-javascript-button-using-greasemonkey
// http://www.w3schools.com/js/js_if_else.asp
// http://stackoverflow.com/questions/929537/all-about-choosing-the-right-font-for-a-website
// http://stackoverflow.com/questions/71074/how-to-remove-firefoxs-dotted-outline-on-buttons-as-well-as-links/199319#199319
// http://csscreator.com/node/25992 z-index clobber
// http://stackoverflow.com/questions/6338217/get-a-css-value-with-javascript

// Other references
// http://www.w3schools.com/jsref/jsref_search.asp
// http://stackoverflow.com/questions/8624210/getting-jquery-and-gm-addstyle-to-work-in-a-chrome-userscript-based-off-of-a-wor

//--------------------------------
// user option
// 0.071: set to true if PAGES button not displaying correctly (mash ribbon buttons?) 
const uglyButton = false;
//--------------------------------



//--- Button setup
const zNode       = document.createElement ('div');
if (uglyButton)
    zNode.innerHTML = '<button id="hidePagePaneButton" type="button">.</button>';
else
    zNode.innerHTML = '<button id="hidePagePaneButton" type="button">PAGES</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("hidePagePaneButton").addEventListener ("click", ButtonClickAction, false);
 


// 
// The main event, now toggled by the button.
//
function ButtonClickAction (zEvent)
{
    var e = 
        document.getElementById("WACViewPanel") ||
        document.getElementById("WACViewPanel_0"); // server-side, element ID was briefly changed to this, on 2013-06-20
    if (e == null) {
        return; // instead of crashing like in 0.092
    }
    
    // pre-OneDrive: .NavHierarchyScroll
    var leftPanel = document.getElementById("applicationWACNavigationPanel");
    if (leftPanel == null) {
        return;
    }   
    var leftPanelStyle = window.getComputedStyle(leftPanel);
    var leftPanelWidth = leftPanelStyle.getPropertyValue('width');
    
    // 
    var resizeBars = document.getElementsByClassName("WACNavPanelResize");
    if (resizeBars[0] == null || resizeBars[1] == null ) {
	    return;
	}
	
    
    if (e.style.marginLeft == "0px") {

        var desiredOffset = "-" + leftPanelWidth;
        e.style.marginLeft = desiredOffset;
        
        // clobber all resize bars, regardless of whether they exist
        //GM_addStyle(" span.WACNavPanelResize { z-index: 0; } "); do NOT clutter the inline styles...
        resizeBars[0].style.zIndex = "0";
        resizeBars[1].style.zIndex = "0";
        
        // functionality of old 'hide horizontal scroll bars' script.
        // 'x-overflow: none;' would NOT work if you have a manually resized box
        e.style.minWidth = "910px";
        
    } else { 
        // revert to defaults
        e.style.marginLeft = "0px";

        // unclobber resize bars, regardless of whether it exists
        resizeBars[0].style.zIndex = "100";
        resizeBars[1].style.zIndex = "100";   
        
        // untweak horizontal scroll bars
        // TODO: take leftPanelWidth into account... MAYBE they will fix this server side??
        e.style.minWidth = "0";
    }
}


//
// Button cosmetics (ugly IF...)
//
if (uglyButton) {

  GM_addStyle('#myContainer{  position: absolute;  padding: 0px 0px;  top: 165px;  } ');

} else {

  // #myContainer
  // original: 21, 205
  // demoted to above the ribbon pre-beta: 0, 163
  // pre-OneDrive: 6, 197
  GM_addStyle (" \
    div#myContainer { \
        position:               absolute; \
        padding:                0px 0px; \
        top:                    34px; \
        left:                   203px; \
        z-index:                10000; \
    } \
    button#hidePagePaneButton { \
        cursor: pointer; \
        border: 0px; \
        background: transparent; \
        font-size: 9pt; \
        color: RGB(68,68,68); \
        font-family: 'Segoe UI',Arial,Verdana,'Sans-Serif'; \
    } \
    button#hidePagePaneButton::-moz-focus-inner { \
        border: 0; \
    } \
  ");
  
  // 0.081: no more pink screen on top...beta is no longer a choice?
  const beta=true; 
  
  // override to avoid overlap with long notebook name  
  if (beta) GM_addStyle ( '#myContainer { top:16px; }' );

}


// trigger the event once because:
// - now you don't have to click PAGES twice on launch
// - in OneDrive, horizontal scroll bar apparently needs to be re-hidden after every click of PAGES
ButtonClickAction(null);
