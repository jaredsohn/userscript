// ==UserScript==
// @name	Old Layout of Facebook (Almost)
// @namespace	Gautam - http://www.facebook.com/profile.php?id=619363009
// @description	You can get the almost old Facebook page layout by this. [Thanks to sizzlemctwizzle (http://userscripts.org/scripts/show/11992) & Erich Schubert (http://userscripts.org/scripts/show/44687)]
// @include	http://*.facebook.com/*
// @include	https://*.facebook.com/*
// ==/UserScript==
//
// 2 Usersripts combined by Gautam (http://www.facebook.com/profile.php?id=619363009) to get the almost old Facebook layout
//
// This part is by Erich Schubert
//
// Changes Facebook into 2 column layout
function init() {
	var filter=document.getElementById('home_filter_list');
	var sidebar=document.getElementById('home_sidebar');
	var leftcol=document.getElementById('home_left_column');
	var firstside = sidebar.firstChild
	while (filter.firstChild) {
		var child = filter.firstChild;
		filter.removeChild(child);
		if (child.id || child.style.color != "white") {
			sidebar.insertBefore(child, firstside);
		}
	}
	filter.style.width = "5px";
	// leftcol.style.width = "900px";
	// sidebar.style.width = "10px";
	document.getElementById('home_stream').style.width="650px";
}

init();
window.addEventListener('load', init, false);

//
// This part is by sizzlemctwizzle
//
// Below script Removes
//   -third party application profile boxes
//   -gifts
//   -third party wall attachment links
//   -nagging to invite users on hompage
//   -advertisements
//   -rounded image corners
//   -sponser highlight
//   -"Home" nav link
//   -Your name nav link
//   -find friends link(use the search if you wanna find someone)
//   -exapnd the filters
GM_addStyle(<><![CDATA[
#right_column { width: 77% !important; }
div[id^="box_app_"]:not(#box_app_2297529396):not(#box_app_2305272732):not(#box_app_2309869772):not(#box_app_2327158227):not(#box_app_2341989679):not(#box_app_2347471856):not(#box_app_2356318349):not(#box_app_2361831622):not(#box_app_2407511955):not(#box_app_2503140832):not(#box_app_2719290516):not(#box_app_2392950137):not(#box_app_2550392059), .gifts_received, .wall_contextual_extra, .nextstep, .app_icon_row, .invitefriends, #ssponsor, div[class$="_ad"], .divider_bar, .more_section, .fbpage_fan, .ad_capsule, .see_more_arrow, #more_apps_divider_narrow, .platform, .profile_empty_divider, .newstuff, .app_install_story, .emu_sponsor, .fbnew_preview_bar, .adcolumn, .social_ad, .sponsor, #attachment_buttons_list span[style*="app_"], li[id^="bookmarked_app_"] a[href^="http://apps."], li[id^="bookmarked_app_"] a[href*="gift"], #profile_tab_add, .footer_ad, .UIComposer_More_Container, .UIComposer_Attachment a[style*="gift.gif"], li[view="box_3"], li[view^="app_"], .approve_friend, #fb_menu_home, .app_story, .UIComposer_Attachment a[style*="/app_"], #fb_menu_account, .UIRoundedImage_Corners, #home_sponsor, #findfriends, .UIMutableFilterList_Toggle,.UIMutableFilterList_Separator, .UIMutableFilterList_Tip, .house_sponsor, #pymk { display: none !important; } 
.UIFilterList { padding-bottom: 0px !important; } 
.UIMutableFilterList_HiddenSection { opacity: 100 !important; display: block !important; }
]]></>.toString());


// The following code only exists because CSS does not have reverse parent selectors
function removeStuff() {
  // People You Don't Know and Would Never Want to Know
  if(pymk=document.getElementById('pymk')) pymk.parentNode.parentNode.parentNode.style.display = "none";
  
  // Move pokes to the top of the page so we can ignore the Highlights section easier
  if(sidebar=document.getElementById('home_sidebar')) if(pokes=document.evaluate('//div[@class="sidebar_item pokes UIHomeBox"]', document, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) sidebar.insertBefore(pokes, sidebar.firstChild);

  // Hide the application filters(Some even show up when you don't have any apps installed yourself!)
  var apps = document.evaluate('//div[contains(@class, "UIFilterList_Item")]/a[contains(@href, "?filter=app_") or contains(@href, "?filter=pp")]', document, null, 6, null), app, i=apps.snapshotLength;
  while(app=apps.snapshotItem(--i)) if(!/(2361831622|2344061033|2347471856|2392950137|2309869772|2305272732)/.test(app.href)) app.parentNode.style.display = "none";
  
  // Ever notice how you can't Hide application stories?
  var stories = document.evaluate('//div[contains(@id, "div_story_")]//a[contains(@href, "http://apps.facebook.com/") or contains(@href, "http://apps.new.facebook.com/")]', document, null, 6, null), story, i=stories.snapshotLength;
  while(story=stories.snapshotItem(--i)) story.parentNode.parentNode.parentNode.parentNode.style.display = "none";
}

// Re-run my code when the page changes, wouldn't have to do this if I could use CSS
function process() {
  document.documentElement.removeEventListener('DOMNodeInserted', process, false);
  removeStuff();
  document.documentElement.addEventListener("DOMNodeInserted", process, false);
}

process();

CheckScriptForUpdate = {
 id: '44981',
 days: 2,
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();