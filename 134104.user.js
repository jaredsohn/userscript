// ==UserScript==
// @name           Tapuz Forum View Fix
// @namespace      Tapuz
// @version        1.5
// @description    Hides the left panel in Tapuz forums, so more space is available for posts
// @include        *tapuz.co.il/Forums2008*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery.noConflict();
jQuery('.forum-side-bar').hide();
jQuery('.forumContentInner').css('margin-left', '0px');
jQuery('.sideBarForum').hide();
jQuery('#divTopBanner').hide();
jQuery('footer').hide();
jQuery('#divBottomBanner').hide();
//jQuery('forumHeaderTabs').not('.activeForumHeaderTab').hide();
//jQuery('.forumHeaderTabs li').not('.activeForumHeaderTab').hide();
jQuery('.forumHeaderTabs').hide();
jQuery('.businessMessage').hide();
jQuery('.forum-brief').hide();
jQuery('.forumTaglinesBox').hide();
// remove admin messages
jQuery('div#user_7923').parent('.msg-title').hide();