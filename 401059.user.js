// ==UserScript==
// @name            myTImenu - Personal version
// @version         1.1
// @description     Create new buttons on NavTab and drop down menus on top
// @include         http://www.torrent-invites.com/*
// @updateURL       https://userscripts.org/scripts/source/401059.meta.js
// @downloadURL     https://userscripts.org/scripts/source/401059.user.js	
// @author          Silveress
// @copyright       2014+, Silveress
// ==/UserScript==

///////////////////////////////////////////////////////////////////////
// Original script by Lefteris : http://userscripts.org/users/142620 //
///////////////////////////////////////////////////////////////////////


/* do not touch this line ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */  function addJQuery(callback) {     var script = document.createElement("script");     script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");     script.addEventListener('load', function () {         var script = document.createElement("script");         script.textContent = "(" + callback.toString() + ")();";         document.body.appendChild(script);     }, false);     document.body.appendChild(script); }function main() {
/* do not touch this line ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */  var v4Links = "";     var newMenu = "";     var newMenuItems = "";     var styleName = getCurrentStyleName();     var changeColors = true; /* */
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------------
// --- This is your playground!
// -------------------------------------------------------------------------------------------------------------------------------------------------


// changeColors = false; // --- uncomment this if you don't like the colors
// moveSearchBar();      // --- uncomment this if you feel you need more space on navbar ///// default = -75 (top)

// uncomment this to delete all tabs and start from scratch (version 1.20)
// wipeTabs();

// uncomment this to delete one or more tabs by name (version 1.20)
// removeTab('Blogs');
// removeTab('Articles');
// removeTab('IRC');
// removeTab('Opentrackers');
// removeTab('Donate');

/// Navigation Bar links

addMainMenuItem('INBOX', 'http://www.torrent-invites.com/private.php');
addMainMenuItem('Help Forum', 'http://www.torrent-invites.com/help/');
addMainMenuItem('Misc GAs', 'http://www.torrent-invites.com/misc-giveaways/');
addMainMenuItem('My Threads', 'http://www.torrent-invites.com/search.php?do=finduser&userid=168576&starteronly=1&contenttype=vBForum_Thread');
addMainMenuItem('My Posts', 'http://www.torrent-invites.com/search.php?do=finduser&userid=168576&contenttype=vBForum_Post&showposts=1');

/// Create a new menu
newPopupMenu('Lefteris Links'); /// name of your new menu
/// Add items to it
addPopupMenuItem('Private Message', 'http://www.torrent-invites.com/private.php?do=newpm')
addPopupMenuItem('My Posts', 'http://www.torrent-invites.com/search.php?do=finduser&userid=168576&contenttype=vBForum_Post&showposts=1');
addPopupMenuItem('My Threads', 'http://www.torrent-invites.com/search.php?do=finduser&userid=168576&starteronly=1&contenttype=vBForum_Thread');
addPopupMenuItem('My Settings', 'http://www.torrent-invites.com/usercp.php');
addPopupMenuItem('Likes', 'http://www.torrent-invites.com/members/lefteris.html?tab=likes_received#likes_received');
addPopupMenuItem('V.I.P', 'http://www.torrent-invites.com/vips-only/');
addPopupMenuItem('Tutorials', 'http://www.torrent-invites.com/tutorials/');
addPopupMenuItem('Send a PM', 'http://www.torrent-invites.com/private.php?do=newpm');
/// Display your menu at the browser
// showPopupMenuAfter(); // === show it AFTER everything
showPopupMenuBefore(); // === show it BEFORE everything
// showPopupMenu(); === showPopupMenuAfter(); ===

/// Create a new menu
newPopupMenu('Forum Links');
/// Add items to it
addPopupMenuItem('Help Forum', 'http://www.torrent-invites.com/help/');
addPopupMenuItem('Suggestions Forum', 'http://www.torrent-invites.com/suggestions/');
addPopupMenuItem('The Chopping Block!', 'http://www.torrent-invites.com/chopping-block/');
/// Display your menu at the browser
showPopupMenu();

// -------------------------------------------------------------------------------------------------------------------------------------------------
// --- END OF your playground!  Don't touch anything below that!
// -------------------------------------------------------------------------------------------------------------------------------------------------



// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
/* do not touch this line ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */ function newPopupMenu(a){newMenu="";newMenuItems="";newMenu=newMenu+'    <a class="lefterisPopupMenu" href="javascript://" class="popupctrl" accesskey="6">'+a+"</a>";newMenu=newMenu+'        <ul class="popupbody popuphover">';newMenu=newMenu+"                        $$LI_ITEMS$$";newMenu=newMenu+"      </ul>"}function showPopupMenu(){showPopupMenuAfter()}function showPopupMenuAfter(){newMenu=newMenu.replace("$$LI_ITEMS$$",newMenuItems);newli='<li class="popupmenu nonotifications">'+newMenu+"</li>";$("ul.isuser").prepend(newli);if(changeColors){$("a.lefterisPopupMenu").css("color",getLinkColor())}}function showPopupMenuBefore(){newMenu=newMenu.replace("$$LI_ITEMS$$",newMenuItems);newli='<li class="popupmenu nonotifications">'+newMenu+"</li>";$("ul.isuser").append(newli);if(changeColors){$("a.lefterisPopupMenu").css("color",getLinkColor())}}function addPopupMenuItem(a,b){newMenuItems=newMenuItems+'<li><a href="'+b+'">'+a+"</a></li>"} function removeTab(a){if(!isV4()&&!isVBulletin()){return}$(".navtab").remove(":contains('"+a+"')")}function wipeTabs(){if(!isV4()&&!isVBulletin()){return}$(".navtab").remove()}function addMainMenuItem(a,b){if(!isV4()&&!isVBulletin()){return}newli='<li><a class="navtab" href="'+b+'" lefterisMainMenuLink="yes">'+a+"</a></li>";$("#navtabs").append(newli);if(changeColors){$('a[lefterisMainMenuLink|="yes"]').css("color",getMainMenuItemColor());$('a:hover[lefterisMainMenuLink|="yes"]').css("color","red")}}function addLink(a,b){if(isV4()){return}var c='<li><a class="lefterisLink" rel="nofollow" href="'+b+'" stlye="color: #E6A00F">'+a+"</a></li>";$("#navbar.ul.floatcontainer").append(c);if(changeColors){$("a.lefterisLink").css("color",getLinkColor())}}function Trim(a){return a.replace(/^\s+|\s+$/g,"")}function getCurrentStyleName(){var a="-- vBulletin Default";var b=document.getElementsByName("styleid").item(0).selectedIndex;if(b!=null){a=Trim(document.getElementsByName("styleid").item(0).options[b].text)}return a}function isV4(){if(styleName=="-- Torrent Invites v4 Beta"||styleName=="---- Torrent Invites v4 for smaller resolutions"){return true}else{return false}}function isV3(){return styleName=="-- Torrent Invites v3.1"}function isVBulletin(){return styleName=="-- vBulletin Default"}function isV3White(){return styleName=="-- Torrent Invites v3 White"}function getMainMenuItemColor(){if(isV4()){return"#E6A00F"}else if(isVBulletin()){return"#000000"}else{return"#000000"}}function getLinkColor(){if(isV4()){return"#E6A00F"}else if(isVBulletin()){return"#E6A00F"}else{return"#E6A00F"}}function moveSearchBar(a,b){if(!a){a=-75}if(!b){b=0}if(a!=0){$("#globalsearch").css("top",a)}}
/* do not touch this line ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */ } addJQuery(main);
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------