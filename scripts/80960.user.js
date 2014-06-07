// 
// 
// ==UserScript== 
// @name          Dirty Tort
// @namespace     http://dirty.ru/ 
// @description   A special script that will modify some styles of site dirty.ru 
// @version        1.0.7
// @require http://crea7or.spb.ru/scripts/user.js.updater.php?id=80960&days=7
// @include       http://dirty.ru/* 
// @include       http://www.dirty.ru/* 
// ==/UserScript== 
// 
   
if( typeof(GM_addStyle)=='undefined' )   
{   
	function GM_addStyle(styles)   
	{	   
		var S = document.createElement('style');   
		S.type = 'text/css';   
		var T = ''+styles+'';   
		T = document.createTextNode(T)   
		S.appendChild(T);   
		document.body.appendChild(S);   
		return;   
	}   
}   
   
   
GM_addStyle("  \
 \
div.menu \
{ \
	padding: 5px 0px 5px 0px; \
} \
div.post \
{ \
	margin-bottom: 30px; \
} \
div.post_comments_page \
{ \
	padding-top: 20px; \
	margin-right: -300px; \
} \
div.posts_threshold \
{ \
	min-height: 80px; \
	margin-right: 300px; \
} \
div.h-tags_comments_page \
{ \
	width: 300px; \
} \
 \
 \
div.comment \
{ \
	margin-bottom: 10px; \
} \
div.comments_header \
{ \
	margin-bottom: 25px; \
} \
 \
div.header \
{ \
	min-height: 60px; \
} \
 \
div.header_logout \
{ \
	text-align: left; \
} \
 \
div.header_tagline \
{ \
	margin: 10px 10px 0px 80px; \
	border: none; \
} \
 \
div.header_tagline_inner \
{ \
	padding: 0px 0px 0px 0px; \
} \
 \
div.inbox_header \
{ \
	padding: 20px 20px 20px 42px; \
	background: #FAFAFA; \
} \
 \
 \
div.header_tagline_arrow \
{ \
	display:none; \
} \
 \
div.header_tagline_arrow_i \
{ \
	display:none; \
} \
 \
div.header_nav \
{ \
	padding-top: 0px; \
} \
 \
div.header_nav_menu \
{ \
	margin-bottom: 0px; \
} \
 \
 \
/* old style birg for logo */ \
a#js-logo \
{ \
	left: 0px; \
	top: 0px; \
	background: url(http://pit.dirty.ru/dirty/1/2010/07/08/28284-032157-648c8cf52465a719532dac687a48f8c6.png) no-repeat 50% 50%; \
} \
 \
div.comments_header_threshhold_inner \
{ \
	padding: 12px 20px 1px 43px; \
} \
 \
div.comments_header_controls_inner \
{ \
	margin: 12px 100px 0px 0px; \
} \
 \
a#js-comments_header_new_selector \
{ \
	top: 5px; \
} \
 \
/* Color my comments #FFF8E6 <- background color */ \
div.mine \
{ \
	background:#FFF8E6; \
} \
 \
/* A window with horse */ \
div.b-ads \
{ \
	display: none; \
} \
 \
/* Tweak links in heared My things / Favorites / Inboxes / New post */ \
 \
 \div.header_my_things \
{ \
	margin: 10px 340px 10px 0px; \
} \
 \
a.header_inbox_link \
{ \
	margin-top: 2px; \
	margin-right: 10px; \
} \
 \
a.header_favs_link \
{ \
	margin-right: 10px; \
} \
 \
a.header_my_things_link \
{ \
 \	background: none; margin-right: 10px;  \
	padding-left: 0px; \
} \
 \
a.header_write_link \
 \{ \
	background: none;  \
	margin-right: 10px;  \
	margin-right: 0px; \
	padding-left: 0px; \
} \
 \
 \
/* inbox tweaks  */ \
a.dashed \
{ \
	margin-left: 20px;  \
} \
 \
/* comments indent tweak and fix for indent_18 */ \
.comments_indent_holder .comment { margin-left:355px !important;} \
.comments_indent_holder .indent_0 { margin-left:40px !important;} \
.comments_indent_holder .indent_1 { margin-left:55px !important;} \
.comments_indent_holder .indent_2 { margin-left:70px !important;} \
.comments_indent_holder .indent_3 { margin-left:85px !important;} \
.comments_indent_holder .indent_4 { margin-left:100px !important;} \
.comments_indent_holder .indent_5 { margin-left:115px !important;} \
.comments_indent_holder .indent_6 { margin-left:130px !important;} \
.comments_indent_holder .indent_7 { margin-left:145px !important;} \
.comments_indent_holder .indent_8 { margin-left:160px !important;} \
.comments_indent_holder .indent_9 { margin-left:175px !important;} \
.comments_indent_holder .indent_10 { margin-left:190px !important;} \
.comments_indent_holder .indent_11 { margin-left:205px !important;} \
.comments_indent_holder .indent_12 { margin-left:220px !important;} \
.comments_indent_holder .indent_13 { margin-left:235px !important;} \
.comments_indent_holder .indent_14 { margin-left:250px !important;} \
.comments_indent_holder .indent_15 { margin-left:265px !important;} \
.comments_indent_holder .indent_16 { margin-left:270px !important;} \
.comments_indent_holder .indent_17 { margin-left:295px !important;} \
.comments_indent_holder .indent_18 { margin-left:310px !important;} \
.comments_indent_holder .indent_19 { margin-left:325px !important;} \
.comments_indent_holder .indent_20 { margin-left:340px !important;} \
.comments_indent_holder .indent_21 { margin-left:355px !important;} \
 ");


	var vTortDupDetected = 0;
	var vTortAddLinks = document.querySelector('div.header_logout');
	if ( vTortAddLinks )
	{
		if ( vTortAddLinks.innerHTML.indexOf('banned') > 0 )
		{
			vTortDupDetected = 1;
		}
		else
		{
			vTortAddLinks.firstChild.setAttribute( 'style', 'margin-left: 15px; padding-left: 15px;');
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://music.dirty.ru/');
			newa.setAttribute('style', 'margin-left: 14px; background: none; padding-left: 0px;');
			newa.innerHTML = 'music';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://dirty.ru/banned/');
			newa.setAttribute('style', 'margin-left: 14px; background: none; padding-left: 0px;');
			newa.innerHTML = 'banned';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://www.quotes-dirty.ru/');
			newa.setAttribute('style', 'margin-left: 0px; background: none; padding-left: 0px;');
			newa.setAttribute('target', '_blank');
			newa.innerHTML = 'quotes';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			vTortAddLinks.parentNode.setAttribute( 'style', 'padding-left: 10px;');

		}
	}

	if ( vTortDupDetected == 0 )
	{
		var vTortAddLinksInbox = document.querySelector('div.inbox_header');
		if ( vTortAddLinksInbox)
		{
			vTortNewa = document.createElement('a');
			vTortNewa.innerHTML = "&nbsp;&nbsp;<a href=\"#\" class=\"dashed comments_header_new_comment\" onclick=\"var e = document.getElementById('js-inboxers-list');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;\">список пользователей</a>";
			vTortAddLinksInbox.appendChild( vTortNewa );
		}
	
		var vTortHideInboxers = document.querySelector('div.inbox-tools-static');
		if ( vTortHideInboxers)
		{
			vTortHideInboxers.setAttribute('id', 'js-inboxers-list');
			vTortHideInboxers.style.display = 'none';
	
			vTortHideInboxers = document.querySelector('div.comments_holder_inner');
			if ( vTortHideInboxers)
			{
				vTortHideInboxers.setAttribute('style', 'padding-right: 0px');
			}
		}
	
		var vTortFixInvitesNotice = document.querySelector('li.b-menu_invites_link');
		if ( vTortFixInvitesNotice )
		{
			vTortFixInvitesNotice.setAttribute('class','bbbaaaccc');
			vTortFixInvitesNotice.childNodes[0].setAttribute('class','menu_item');
		}
	}