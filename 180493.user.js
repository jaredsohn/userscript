// ==UserScript==
// @name       Yahoo Interface Trimup
// @namespace YahooInterfaceTrimupByBGM
// @version    1.1
// @description  Trims up the Yahoo! Groups interface
// @match     http://*.groups.yahoo.com/*
// @match      https://*.groups.yahoo.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant      GM_addStyle
//*- The @grant directive is needed to work around a design change introduced in GM 1.0.   It restores the sandbox.  */
// @run-at document-end
// @copyright  2013, BGM
// ==/UserScript==

//v 1.0	Monday, October 21, 2013 - initial release
//v 1.1   Tuesday, October 22, 2013 - added message area cleanup

//shrink the height of the message list entries
GM_addStyle(".yg-msg-row > div { padding-bottom: 2px!important;  padding-top: 2px!important;   }");

//remove that gigantic banner image!!!!!!!
GM_addStyle(".subnav-refresh.group-img-container.yg-rapid.yg-no-follow { display: none!important;   }");

//remove the silly empty bar above the message column block
GM_addStyle("#yg-groupdetail-navbar-empty, .yg-pend-not-empty { display: none!important;   }");

//get some space back below the search area
GM_addStyle("element.style { padding-top: 0!important;   }");


//fix the funny fixed toolbar
GM_addStyle("#yg-action-bar {  top: 0px !important;  }");
//GM_addStyle("#yg-actionbar-container yom-mod yom-actions yg-action-bg docked fixed{  top: 126px !important;  }");
GM_addStyle(".yom-mod.yom-actions.yg-action-bg.docked.fixed{  top: 126px !important;  }");
GM_addStyle("#yg-msg-view .yom-actions.fixed, .yom-mod.yom-actions.yg-action-bg.dockme {  top: 126 !important; height: 31px !important; }");
GM_addStyle(".yg-page .yom-actions .actions-rt {  top: 1px !important; }");
GM_addStyle(".arrow-up {  top: -4px !important; }");
GM_addStyle("ul.actions-lt {  top: -10px !important; padding-bottom: 10px !important;  }");

//"navbar" - you know, the one that says, "conversations, Photos, Events, etc. that noone uses.
GM_addStyle(".group-detail-navbar ul.nav-lt li { margin-right: 0 !important; }");

//Add the "Files" and "Links links back to the navbar [just changing the display value to show causes another effect - we need to remove the style completely]
removestyle("#filesnav", "hide newitem");
removestyle("#linksnav", "hide newitem");


//Now expand the thread detail for a wide monitor - I WOULD REMOVE THIS IF YOU DON'T HAVE A WIDE MONITOR!
GM_addStyle("#body-container, #yg-msg-list-container, .yg-msg-list yg-content-bg {  max-width: 100%!important;  }");
GM_addStyle(".yg-msglist-title { max-width: 1100px!important;  }");		//increase the width of the title column

//Now widen the actual message reading pane and get rid of some ads
GM_addStyle(".yg-page .y-col2 .yg-grid .y-col2-2 { display:none !important; }");		//get rid of Yahoo's Ad sidebar
removestyle(".msg-list-container .yg-msg-read-container", "overflow-x");					//make the message a little wider
GM_addStyle(".card.clrfix.yg-msg-read-container { width:100% !important; }");		//get rid of Yahoo's Ad sidebar



//fix broken link colour
GM_addStyle(".yg-msglist-title a:visited { color:#8384c8!important; }");


function removestyle(whatelement, whatstyle){
	$(whatelement).removeClass(whatstyle)
}


