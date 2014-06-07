// ==UserScript==
// @name          	Cooster Captcha Bypass
// @namespace      	http://www.ultimateshinobi.org/g18-administrators
// @version        	1.0.1
// @author        	MSox - Modified by Sioc
// @description    	Removes captcha for given brutes on UltimateShinobi
// @include			http*://www.ultimateshinobi.org/g18-administrators
// @include			http*://www.ultimateshinobi.org/forum
// @include			http*://www.ultimateshinobi.org/
// @include			http*://www.ultimateshinobi.org/
// ==/UserScript==

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" id="min-width" lang="en" xml:lang="en"   ><head><title>Administrators Group</title><meta http-equiv="content-type" content="text/html; charset=utf-8" /><meta http-equiv="content-script-type" content="text/javascript" /><meta http-equiv="content-style-type" content="text/css" /><link rel="shortcut icon" type="image/x-icon" href="http://i14.photobucket.com/albums/a311/SanativeStigma/kakaicon.gif" /><meta name="title" content="Administrators Group" /><link rel="stylesheet" href="/112-ltr.css" type="text/css" /><link rel="search" type="application/opensearchdescription+xml" href="/improvedsearch.xml" title="Ultimate Shinobi  - A Naruto RPG" /><link rel="search" type="application/opensearchdescription+xml" href="http://www.board-directory.net/en/search/improvedsearch.xml" title="Search forums" /><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script><script src="http://illiweb.com/rsc/54/frm/lang/en.js" type="text/javascript"></script><script type="text/javascript">//<![CDATA[
$(document).ready(function(){});//]]></script>

<script type="text/javascript">//<![CDATA[
var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-18372114-1']);_gaq.push(['_trackPageview']);_gaq.push(['_trackPageLoadTime']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();//]]></script></head><body background="http://25.media.tumblr.com/tumblr_m1hvhymrXL1rsy6vxo1_400.png" bgcolor="#f5f5f5" text="#151a29" link="#e02a2a" vlink="#e02a2a"><a name="top"></a><table class="bodylinewidth" width="1000" cellspacing="0" cellpadding="10" border="0" align="center"><tr><td class="bodyline"><table width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td align="center" width="100%" valign="middle"><a href="/forum"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/usbannernaruto_zps8eb032e2.png" id="i_logo" border="0" alt="Ultimate Shinobi  - A Naruto RPG" vspace="1" /></a><br /><div class="maintitle"></div><br /><span class="gen"><br />&nbsp; </span></td></tr></table><table cellspacing="0" cellpadding="0" border="0" align="center"><tr><td align="center" nowrap="nowrap"><a class="mainmenu" href="/forum" rel="nofollow"><img id="i_icon_mini_index" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/homenavicomp1_zpsf2a43502.png" border="0"  hspace="0" alt="Home" title="Home" /></a><a class="mainmenu" href="/" rel="nofollow"><img id="i_icon_mini_portal" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/portalnavicomp2_zps4a9e75e4.png" border="0"  hspace="0" alt="Portal" title="Portal" /></a><a class="mainmenu" href="/calendar" rel="nofollow"><img id="i_icon_mini_calendar" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/calnavicomp3_zps7be887be.png" border="0"  hspace="0" alt="Calendar" title="Calendar" /></a><a class="mainmenu" href="/faq" rel="nofollow"><img id="i_icon_mini_faq" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/faqnavicomp3_zps301de543.png" border="0"  hspace="0" alt="FAQ" title="FAQ" /></a><a class="mainmenu" href="/search" onclick="showhide(document.getElementById('search_menu')); return false;" rel="nofollow"><img id="i_icon_mini_search" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/searchnavicomp2_zps5ff92430.png" border="0"  hspace="0" alt="Search" title="Search" /></a><script type="text/javascript">//<![CDATA[
var url_search = '/search';
insert_search_menu();//]]>
</script><a class="mainmenu" href="/memberlist" rel="nofollow"><img id="i_icon_mini_members" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/membersnavicomp2_zps3b31b5a1.png" border="0"  hspace="0" alt="Memberlist" title="Shitlist" /></a><a class="mainmenu" href="/groups" rel="nofollow"><img id="i_icon_mini_groups" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/groupsnavicomp2_zpsfa3c166b.png" border="0"  hspace="0" alt="Usergroups" title="Usergroups" /></a><a class="mainmenu" href="/profile?mode=editprofile" rel="nofollow"><img id="i_icon_mini_profile" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/profilenavicomp2_zpsc0873a00.png" border="0"  hspace="0" alt="Profile" title="Profile" /></a><a class="mainmenu" href="/privmsg?folder=inbox" rel="nofollow"><img id="i_icon_mini_message" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/nopmnavicomp2_zps41816ee2.png" border="0"  hspace="0" alt="You have no new messages" title="You have no new messages" /></a><a class="mainmenu" href="/login?logout=1&amp;tid=d7d2b38e5b402347eecbcbd7ee31d85e&amp;key=85c6e1" rel="nofollow" id="logout" ><img id="i_icon_mini_logout" src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/logoutavicomp_zps3fe34a4e.png" border="0"  hspace="0" alt="Log out [ Cut ]" title="Log out [ Cut ]" /></a></td></tr></table><div style="clear: both;"></div><div id="page-body"><div id="content-container" class="no-left"><table cellpadding="0" cellspacing="0" width="100%" class="three-col"><tbody><tr><td valign="top" width="0"><div id="emptyidleft"></div></td><td valign="top" width="100%"><table class="forumline" width="100%" border="0" cellspacing="1" cellpadding="4"><form action="/g18-administrators" method="post"><tr><th class="thHead" colspan="7" height="25"><h1 class="pagetitle">Group Information<h1></th></tr><tr><td class="row1" width="20%"><span class="gen">Group name:</span></td><td class="row2"><span class="gen"><strong>Administrators</strong></span></td></tr><tr><td class="row1" width="20%"><span class="gen">Group description:</span></td><td class="row2"><span class="gen">Your wonderful Site Administrators. :)#DE1871</span></td></tr><tr><td class="row1" width="20%"><span class="gen">Group membership:</span></td><td class="row2"><span class="gen">This is a closed group: no more users accepted&nbsp;</span></td></tr></form></table><form action="/g18-administrators" method="post" name="post"><table class="forumline" width="100%" border="0" cellspacing="1" cellpadding="4"><tr><th class="thCornerL" height="25" nowrap="nowrap">Private Message</th><th class="thTop" nowrap="nowrap">Username</th><th class="thTop" nowrap="nowrap">Posts</th><th class="thTop" nowrap="nowrap">Location</th><th class="thTop" nowrap="nowrap">e-mail</th><th class="thTop" nowrap="nowrap">Website</th><th class="thCornerR" nowrap="nowrap">Select</th></tr><tr><td class="catSides" colspan="8" height="28"><span class="cattitle">Group Moderator</span></td></tr><tr><td class="row1" align="center"><a href="/privmsg?mode=post&amp;u=1"><img src="http://illiweb.com/fa/prosilver_grey/icon_contact_pm.png" class="i_icon_pm" alt="Send private message" title="Send private message" /></a></td><td class="row1" align="center"><span class="gen"><a class="gen" href="/u448"><span style="color:#BA112D"><strong>Cut</strong></span></a></span></td><td class="row1" align="center" valign="middle"><span class="gen">7223</span></td><td class="row1" align="center" valign="middle"><span class="gen">Australia, mate.</span></td><td class="row1" align="center" valign="middle"><span class="gen"><a href="mailto:ultimateshinobi@live.com"><img src="http://illiweb.com/fa/prosilver_grey/icon_contact_email.gif" alt="Send e-mail" title="Send e-mail" /></a></span></td><td class="row1" align="center"><a href="http://www.ultimateshinobi.org" target="_userwww"><img src="http://illiweb.com/fa/prosilver_grey/icon_contact_www.gif" id="i_icon_www" alt="Visit poster's website" title="Visit poster's website" /></a></td><td class="row1" align="center">&nbsp</td></tr><tr><td class="catSides" colspan="8" height="28"><span class="cattitle">Group Members</span></td></tr><tr><td class="row1" align="center"><a href="/privmsg?mode=post&amp;u=979"><img src="http://illiweb.com/fa/prosilver_grey/icon_contact_pm.png" class="i_icon_pm" alt="Send private message" title="Send private message" /></a></td><td class="row1" align="center"><span class="gen"><a class="gen" href="/u979"><span style="color:#FF6803"><strong>Cookie Monster</strong></span></a></span></td><td class="row1" align="center"><span class="gen">2999</span></td><td class="row1" align="center"><span class="gen">England, UK </span></td><td class="row1" align="center" valign="middle"><span class="gen">&nbsp;</span></td><td class="row1" align="center"><a href="http://www.ultimateshinobi.org" target="_userwww"><img src="http://illiweb.com/fa/prosilver_grey/icon_contact_www.gif" id="i_icon_www" alt="Visit poster's website" title="Visit poster's website" /></a></td><td class="row1" align="center"></td></tr><tr><td class="row2" align="center"><a href="/privmsg?mode=post&amp;u=2"><img src="http://illiweb.com/fa/prosilver_grey/icon_contact_pm.png" class="i_icon_pm" alt="Send private message" title="Send private message" /></a></td><td class="row2" align="center"><span class="gen"><a class="gen" href="/u2"><span style="color:#BA112D"><strong>US Admin</strong></span></a></span></td><td class="row2" align="center"><span class="gen">408</span></td><td class="row2" align="center"><span class="gen">Scanning the Forum </span></td><td class="row2" align="center" valign="middle"><span class="gen">&nbsp;</span></td><td class="row2" align="center"><a href="http://www.ultimateshinobi.org" target="_userwww"><img src="http://illiweb.com/fa/prosilver_grey/icon_contact_www.gif" id="i_icon_www" alt="Visit poster's website" title="Visit poster's website" /></a></td><td class="row2" align="center"></td></tr></table><table width="100%" border="0" cellspacing="2" cellpadding="0" align="center"><tr><td align="left" valign="top"><span class="nav">Page <strong>1</strong> of <strong>1</strong></span></td><td align="right" valign="top"><span class="nav"></span></td></tr><tr><td></td></tr></table></form><table width="100%" border="0" cellspacing="2" align="center"><tr><td align="right" valign="top"><form action="/viewforum" method="get" name="jumpbox" onsubmit="if(document.jumpbox.f.value == -1){return false;}"><table border="0" cellspacing="0" cellpadding="0"><tr><td nowrap="nowrap"><span class="gensmall">Jump to:&nbsp;<select name="selected_id" onchange="if(this.options[this.selectedIndex].value != -1){ forms['jumpbox'].submit() }"><option value="-1">Select a forum</option><option value="-1"></option><option value="-1">|</option><option fa_attr=" true" value="c1">|--INFORMATION ZONE</option><option fa_attr=" true" value="f2">|&nbsp;&nbsp;&nbsp;|--RULES AND GUIDES</option><option fa_attr=" true" value="f1">|&nbsp;&nbsp;&nbsp;|--ANNOUNCEMENTS AND UPDATES</option><option fa_attr=" true" value="f3">|&nbsp;&nbsp;&nbsp;|--FORUM ASSISTANCE</option><option fa_attr=" true" value="f9">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Solved Topics</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f111">|&nbsp;&nbsp;&nbsp;|--PLOTS AND EVENTS</option><option fa_attr=" true" value="f183">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Plot Characters</option><option value="-1">|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="c4">|--SOCIAL ZONE</option><option fa_attr=" true" value="f10">|&nbsp;&nbsp;&nbsp;|--INTRODUCTIONS</option><option fa_attr=" true" value="f12">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Departures</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f4">|&nbsp;&nbsp;&nbsp;|--GENERAL DISCUSSION</option><option fa_attr=" true" value="f5">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Artistic Corner</option><option fa_attr=" true" value="f6">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Naruto Chapter Corner</option><option fa_attr=" true" value="f7">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Blogging Corner</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f25">|&nbsp;&nbsp;&nbsp;|--ADVERTISE</option><option fa_attr=" true" value="f144">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Approved Advertisements</option><option fa_attr=" true" value="f166">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Approved Affiliates</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f167">|&nbsp;&nbsp;&nbsp;|--HISTORICAL ARCHIVES</option><option fa_attr=" true" value="f136">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Announcements</option><option fa_attr=" true" value="f209">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Systems</option><option fa_attr=" true" value="f195">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Plots and Events</option><option fa_attr=" true" value="f36">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Approved Characters</option><option fa_attr=" true" value="f149">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Genin</option><option fa_attr=" true" value="f151">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Chuunin</option><option fa_attr=" true" value="f152">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Jounin</option><option fa_attr=" true" value="f150">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Missing-Nin</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f154">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Character Points</option><option fa_attr=" true" value="f146">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Clans</option><option fa_attr=" true" value="f142">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Equipment</option><option fa_attr=" true" value="f140">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Jutsu</option><option fa_attr=" true" value="f208">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Creatures</option><option fa_attr=" true" value="f153">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Missions</option><option fa_attr=" true" value="f145">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Miscellaneous</option><option fa_attr=" true" value="f143">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived Threads</option><option fa_attr=" true" value="f141">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Archived W.I.P's</option><option fa_attr=" true" value="f147">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--W.I.P Characters</option><option fa_attr=" true" value="f148">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--W.I.P Clans</option><option fa_attr=" true" value="f210">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--W.I.P Jutsu</option><option fa_attr=" true" value="f211">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--W.I.P Equipment</option><option fa_attr=" true" value="f212">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--W.I.P Creatures</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f114">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Plot Pages</option><option value="-1">|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="c2">|--PRE-ROLEPLAY ZONE</option><option fa_attr=" true" value="f8">|&nbsp;&nbsp;&nbsp;|--CHARACTER REGISTRATION</option><option fa_attr=" true" value="f15">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Approved Characters</option><option fa_attr=" true" value="f17">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Konohagakure Shinobi</option><option fa_attr=" true" value="f180">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kumogakure Shinobi</option><option fa_attr=" true" value="f216">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kirigakure Shinobi</option><option fa_attr=" true" value="f18">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Nukenin</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f11">|&nbsp;&nbsp;&nbsp;|--CUSTOM REGISTRY</option><option fa_attr=" true" value="f19">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Clan Registration</option><option fa_attr=" true" value="f20">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Approved Clans</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f21">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Jutsu Registration</option><option fa_attr=" true" value="f27">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Approved Jutsu</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f22">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Equipment Registration</option><option fa_attr=" true" value="f28">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Approved Equipment</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f23">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Creature Registration</option><option fa_attr=" true" value="f29">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Approved Creatures</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f26">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Miscellaneous Registration</option><option fa_attr=" true" value="f30">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Approved Applications</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f13">|&nbsp;&nbsp;&nbsp;|--THE ENCYCLOPEDIA</option><option fa_attr=" true" value="f33">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Jutsu</option><option fa_attr=" true" value="f34">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Clans</option><option fa_attr=" true" value="f45">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Equipment</option><option fa_attr=" true" value="f50">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Universal Weapons</option><option fa_attr=" true" value="f85">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Accessories & Protectorates</option><option fa_attr=" true" value="f75">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Special Creations</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f181">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Professions</option><option value="-1">|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f124">|&nbsp;&nbsp;&nbsp;|--REQUEST AREA</option><option fa_attr=" true" value="f125">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Konohagakure Missions</option><option fa_attr=" true" value="f182">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kumogakure Missions</option><option fa_attr=" true" value="f218">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kirigakure Missions</option><option fa_attr=" true" value="f126">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Nukenin Missions</option><option fa_attr=" true" value="f14">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Evaluation Section</option><option fa_attr=" true" value="f31">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Evaluated Topics</option><option fa_attr=" true" value="f32">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Evaluated Missions</option><option fa_attr=" true" value="f199">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Accounts</option><option fa_attr=" true" value="f200">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Konohagakure Accounts</option><option fa_attr=" true" value="f201">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kumogakure Accounts</option><option fa_attr=" true" value="f217">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kirigakure Accounts</option><option fa_attr=" true" value="f203">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Nukenin Accounts</option><option fa_attr=" true" value="f204">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Old Accounts</option><option value="-1">|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="c3">|--HI NO KUNI - THE FIRE COUNTRY</option><option fa_attr=" true" value="f43">|&nbsp;&nbsp;&nbsp;|--The Fire Country</option><option fa_attr=" true" value="f121">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Outer Village Gates</option><option fa_attr=" true" value="f113">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Fire Temple</option><option fa_attr=" true" value="f120">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Forest of Death</option><option fa_attr=" true" value="f122">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Roiyaru Road</option><option fa_attr=" true" value="f127">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Shukuba Town</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f123">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Mountain's Graveyard</option><option value="-1">|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="c8">|--KAMINARI NO KUNI - THE LIGHTNING COUNTRY</option><option fa_attr=" true" value="f88">|&nbsp;&nbsp;&nbsp;|--The Lightning Country</option><option fa_attr=" true" value="f132">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Outer Village Borders</option><option fa_attr=" true" value="f178">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Outer Village Gates</option><option fa_attr=" true" value="f155">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Forest of Sanctuary</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f133">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kyousei Mountain</option><option fa_attr=" true" value="f135">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Lightning Temple</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f134">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--The Great Geyser</option><option fa_attr=" true" value="f35">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Fisherman's Port</option><option value="-1">|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="c5">|--MIZU NO KUNI - THE WATER COUNTRY</option><option fa_attr=" true" value="f86">|&nbsp;&nbsp;&nbsp;|--The Water Country</option><option fa_attr=" true" value="f257">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Capital Island</option><option fa_attr=" true" value="f239">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Outer Village Gates</option><option fa_attr=" true" value="f256">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--The Death Trap</option><option fa_attr=" true" value="f258">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Ochiru Cliffs</option><option fa_attr=" true" value="f259">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Illusion Forest</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f240">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Island of Ruins</option><option fa_attr=" true" value="f243">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Black Sand Beach</option><option fa_attr=" true" value="f241">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Remains of Wrath</option><option fa_attr=" true" value="f242">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Devil's Eye</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f244">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Island of Tranquility</option><option fa_attr=" true" value="f252">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Waterfall of the Divine</option><option fa_attr=" true" value="f253">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--The Zen Gardens</option><option fa_attr=" true" value="f254">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Agricultural District</option><option fa_attr=" true" value="f255">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Dolphin Beach</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f245">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Island of Protection</option><option fa_attr=" true" value="f249">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Area One</option><option fa_attr=" true" value="f250">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Area Two</option><option fa_attr=" true" value="f251">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Area Three</option><option value="-1">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f246">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Island of Snow</option><option fa_attr=" true" value="f247">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Cavern of Ice</option><option fa_attr=" true" value="f248">|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Frozen Mist Caves</option><option value="-1">|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="c6">|--THE GREAT AND MINOR NATIONS</option><option fa_attr=" true" value="f187">&nbsp;&nbsp;&nbsp;&nbsp;|--The Great Nations</option><option fa_attr=" true" value="f87">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Kaze No Kuni - The Wind Country</option><option fa_attr=" true" value="f158">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Tsuchi no Kuni - The Earth Country</option><option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f131">&nbsp;&nbsp;&nbsp;&nbsp;|--The Minor Nations</option><option fa_attr=" true" value="f90">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Yu No Kuni - The Hot Springs Country</option><option fa_attr=" true" value="f196">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Forbidden Oasis</option><option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f42">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kusa no Kuni - The Grass Country</option><option fa_attr=" true" value="f52">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--The Forest Ravine</option><option fa_attr=" true" value="f47">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--The Heaven and Earth Bridge</option><option fa_attr=" true" value="f48">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--The Forest of Bamboo</option><option fa_attr=" true" value="f49">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--The Grassy Plains</option><option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f37">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Tsuki no Kuni - The Moon Country</option><option fa_attr=" true" value="f94">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Getsugakure - Village Hidden under the Moon</option><option fa_attr=" true" value="f116">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Tournament Temple</option><option fa_attr=" true" value="f117">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Registration Lobby</option><option fa_attr=" true" value="f118">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Fighting Stadium</option><option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f129">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Ame no Kuni - The Rain Country</option><option fa_attr=" true" value="f89">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kuma No Kuni - The Bear Country</option><option fa_attr=" true" value="f194">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--The Treehouse</option><option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f91">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Ta No Kuni - The Rice Field Country</option><option fa_attr=" true" value="f92">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Kawa No Kuni - The River Country</option><option fa_attr=" true" value="f207">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Nami no Kuni - Wave Country</option><option fa_attr=" true" value="f93">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Yama No Kuni - The Mountain Country</option><option fa_attr=" true" value="f197">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|--Cavernous Tranquility</option><option value="-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</option><option fa_attr=" true" value="f16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--Yuki no Kuni - The Snow Country</option><option fa_attr=" true" value="f198">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--The Igloo</option></select><input type="hidden" name="tid" value="d7d2b38e5b402347eecbcbd7ee31d85e" />&nbsp;<input class="liteoption" type="submit" value="Go" /></span></td></tr></table></form></td></tr></table></td><td valign="top" width="215"><div id="right"><table class="forumline" width="100%" border="0" cellspacing="1" cellpadding="0"><tr><td class="catLeft" height="25"><span class="genmed  module-title">Navigation</span></td></tr><tr><td  class='row1'  align="left"><style type="text/css">
	dl.image_map {display:block; width:140px; height:142px; background:url(http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/newnavigationbackgroundscroll_zps80392f47.png); position:relative; margin:2px auto 2px auto;}
	a.LINK0 {left:16px; top:21px; background:transparent;}
	a.LINK0 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK0:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK1 {left:16px; top:29px; background:transparent;}
	a.LINK1 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK1:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK2 {left:16px; top:37px; background:transparent;}
	a.LINK2 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK2:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK3 {left:16px; top:45px; background:transparent;}
	a.LINK3 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK3:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK4 {left:16px; top:53px; background:transparent;}
	a.LINK4 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK4:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK5 {left:16px; top:61px; background:transparent;}
	a.LINK5 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK5:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK6 {left:16px; top:69px; background:transparent;}
	a.LINK6 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK6:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK7 {left:16px; top:77px; background:transparent;}
	a.LINK7 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK7:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK8 {left:16px; top:85px; background:transparent;}
	a.LINK8 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK8:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK9 {left:16px; top:93px; background:transparent;}
	a.LINK9 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK9:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK10 {left:16px; top:101px; background:transparent;}
	a.LINK10 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK10:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
	a.LINK11 {left:16px; top:109px; background:transparent;}
	a.LINK11 {display:block; width:106px; height:0; padding-top:9px; overflow:hidden; position:absolute;}
	a.LINK11:hover  {background:transparent; border:1px dashed; color:#E02A2A;}
</style>

<dl class="image_map">
	<dd><a class="LINK0" title="" href="http://www.ultimateshinobi.getgoo.us/f2-rules-and-guides"></a></dd>
	<dd><a class="LINK1" title="" href="http://www.ultimateshinobi.getgoo.us/f1-announcements-and-updates"></a></dd>
	<dd><a class="LINK2" title="" href="http://www.ultimateshinobi.getgoo.us/t3135-character-template"></a></dd>
	<dd><a class="LINK3" title="" href="http://www.ultimateshinobi.getgoo.us/t3134-face-claims#32376"></a></dd>
	<dd><a class="LINK4" title="" href="http://www.ultimateshinobi.getgoo.us/f11-custom-registry"></a></dd>
	<dd><a class="LINK5" title="" href="http://www.ultimateshinobi.org/t3103-special-characteristics"></a></dd>
	<dd><a class="LINK6" title="" href="http://www.ultimateshinobi.getgoo.us/f33-jutsu"></a></dd>
	<dd><a class="LINK7" title="" href="http://www.ultimateshinobi.getgoo.us/f34-clans"></a></dd>
	<dd><a class="LINK8" title="" href="http://www.ultimateshinobi.getgoo.us/f45-equipment"></a></dd>
	<dd><a class="LINK9" title="" href="http://www.ultimateshinobi.getgoo.us/t3118-the-tailed-beasts"></a></dd>
	<dd><a class="LINK10" title="" href="http://www.ultimateshinobi.org/f181-professions"></a></dd>
	<dd><a class="LINK11" title="" href="http://www.ultimateshinobi.getgoo.us/f14-evaluation-section"></a></dd>
</dl></td></tr></table><div style="height: 6px"></div><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td  align="left"><center><script charset="utf-8" src="http://widgets.twimg.com/j/2/widget.js"></script>
<script>
new TWTR.Widget({
  version: 2,
  type: 'profile',
  rpp: 20,
  interval: 30000,
  width: 180,
  height: 100,
  theme: {
    shell: {
      background: '#ffffff',
      color: '#000000'
    },
    tweets: {
      background: '#e02a2a',
      color: '#ffffff',
      links: '#000000'
    }
  },
  features: {
    scrollbar: true,
    loop: false,
    live: false,
    behavior: 'all'
  }
}).render().setUser('US_Roleplay').start();
</script></center></td></tr></table><div style="height: 6px"></div><table class="forumline" width="100%" border="0" cellspacing="1" cellpadding="0"><tr><td class="catLeft" height="25"><span class="genmed  module-title">STAFF TEAM</span></td></tr><tr><td  class='row1'  align="left"><script language="JavaScript">
<!--
if (document.images) {
nostaff1= new Image;

adam= new Image;
darius= new Image;
enzo= new Image;
amy= new Image;
jelly= new Image;
puppy= new Image;
kite= new Image;
heida= new Image;
zack= new Image;
mrmoney= new Image;
ivan= new Image;

nostaff1.src="http://i.imgur.com/pqrCsta.png";

adam.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Adamsidebar2013-2_zps5db0c2e8.png";
darius.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Darisidebar2013-5_zpsa39dadcf.png";
enzo.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Urysidebar2013-2_zps8cbd626d.png";
amy.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Amysidebar2013_zpsebc719c9.png";
jelly.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Alexsidebar2013-2_zps2cb802de.png";
puppy.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Alex2sidebar2013_zps25debd56.png";
kite.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Errysidebar2013-2_zps78998a3c.png";
heida.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Heidasidebar2013-5_zps026b9578.png";
zack.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Zacksidebar2013-2_zpsc6608765.png";
mrmoney.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/MrMoneysidebar2013-2_zps6d8f0db2.png";
ivan.src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/Ivansidebar2013_zps2f5a8e47.png";

}

function switchImage(thisImage,newImage) {
if (document.images) {
imgOn=eval(newImage + ".src");
document[thisImage].src= imgOn;
}
}
//-->
</script>

<center><div class="staff"><table width="140px" cellspacing="0" cellpadding="0"><tr><td width="33%"><center><div class="staff1"><div class="staffpic"><img src="http://i.imgur.com/pqrCsta.png" name="nostaff"></div><div class="icons">
<a href="http://www.ultimateshinobi.org/u1" onMouseover="switchImage('nostaff','adam')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u979" onMouseover="switchImage('nostaff','darius')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u1157" onMouseover="switchImage('nostaff','enzo')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u950" onMouseover="switchImage('nostaff','amy')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u1685" onMouseover="switchImage('nostaff','jelly')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u1482" onMouseover="switchImage('nostaff','puppy')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a><br>
<a href="http://www.ultimateshinobi.org/u1431" onMouseover="switchImage('nostaff','kite')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u1338" onMouseover="switchImage('nostaff','heida')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u1739" onMouseover="switchImage('nostaff','zack')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u200" onMouseover="switchImage('nostaff','mrmoney')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
<a href="http://www.ultimateshinobi.org/u247" onMouseover="switchImage('nostaff','ivan')" onMouseout="switchImage('nostaff','nostaff1')"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shurikensidebar2_zpsdb73ca13.png"style="margin-top: 5px;"></a>
</div></div></center></td></td></tr></table></div></center></tr></table><div style="height: 6px"></div><table class="forumline" width="100%" border="0" cellspacing="1" cellpadding="0"><tr><td class="catLeft" height="25"><span class="genmed  module-title">MARCH SPOTLIGHT</span></td></tr><tr><td  class='row1'  align="left"><center><style type="text/css">

#popitmenu{
position: absolute;
background-color: white;
border: 0px solid black;
font: normal 12px Verdana;
line-height: 0px;
z-index: 100;
visibility: hidden;
}

#popitmenu a{
text-decoration: none;
padding-left: 0px;
color: black;
display: block;
}

#popitmenu a:hover{ /*hover background color*/
background-color: #6494b3;
}

</style>

<script type="text/javascript">

/***********************************************
* Pop-it menu- © Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

var defaultMenuWidth="100px" //set default menu width.

var linkset=new Array()
//SPECIFY MENU SETS AND THEIR LINKS. FOLLOW SYNTAX LAID OUT

linkset[0]='<a href="http://www.ultimateshinobi.org/u9"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/meyayusotmmarch2013-2_zps37e40e25.png"></a>'

linkset[1]='<a href="http://www.ultimateshinobi.org/u1835"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/olannotmmarch2013_zpsb4fd45c5.png"></a>'

linkset[2]='<a href="http://www.ultimateshinobi.org/t8832-shiro-kiri-genin"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/shirocotmmarch2013_zps2df85090.png"></a>'

linkset[3]='<a href="http://www.ultimateshinobi.org/t8685-serial-escalation"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/serialescalationtotmmarch2013_zps6ce4f0b3.png"></a>'

linkset[4]='<a href="http://www.ultimateshinobi.org/u1482"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/puppysotmmarch2013_zps289f4c0c.png"></a>'


////No need to edit beyond here

var ie5=document.all && !window.opera
var ns6=document.getElementById

if (ie5||ns6)
document.write('<div id="popitmenu" onMouseover="clearhidemenu();" onMouseout="dynamichide(event)"></div>')

function iecompattest(){
return (document.compatMode && document.compatMode.indexOf("CSS")!=-1)? document.documentElement : document.body
}

function showmenu(e, which, optWidth){
if (!document.all&&!document.getElementById)
return
clearhidemenu()
menuobj=ie5? document.all.popitmenu : document.getElementById("popitmenu")
menuobj.innerHTML=which
menuobj.style.width=(typeof optWidth!="undefined")? optWidth : defaultMenuWidth
menuobj.contentwidth=menuobj.offsetWidth
menuobj.contentheight=menuobj.offsetHeight
eventX=ie5? event.clientX : e.clientX
eventY=ie5? event.clientY : e.clientY
//Find out how close the mouse is to the corner of the window
var rightedge=ie5? iecompattest().clientWidth-eventX : window.innerWidth-eventX
var bottomedge=ie5? iecompattest().clientHeight-eventY : window.innerHeight-eventY
//if the horizontal distance isn't enough to accomodate the width of the context menu
if (rightedge<menuobj.contentwidth)
//move the horizontal position of the menu to the left by it's width
menuobj.style.left=ie5? iecompattest().scrollLeft+eventX-menuobj.contentwidth+"px" : window.pageXOffset+eventX-menuobj.contentwidth+"px"
else
//position the horizontal position of the menu where the mouse was clicked
menuobj.style.left=ie5? iecompattest().scrollLeft+eventX+"px" : window.pageXOffset+eventX+"px"
//same concept with the vertical position
if (bottomedge<menuobj.contentheight)
menuobj.style.top=ie5? iecompattest().scrollTop+eventY-menuobj.contentheight+"px" : window.pageYOffset+eventY-menuobj.contentheight+"px"
else
menuobj.style.top=ie5? iecompattest().scrollTop+event.clientY+"px" : window.pageYOffset+eventY+"px"
menuobj.style.visibility="visible"
return false
}

function contains_ns6(a, b) {
//Determines if 1 element in contained in another- by Brainjar.com
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
}

function hidemenu(){
if (window.menuobj)
menuobj.style.visibility="hidden"
}

function dynamichide(e){
if (ie5&&!menuobj.contains(e.toElement))
hidemenu()
else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
hidemenu()
}

function delayhidemenu(){
delayhide=setTimeout("hidemenu()",500)
}

function clearhidemenu(){
if (window.delayhide)
clearTimeout(delayhide)
}

if (ie5||ns6)
document.onclick=hidemenu

</script>
<a href="http://www.ultimateshinobi.org/u9" onMouseover="showmenu(event,linkset[0])" onMouseout="delayhidemenu()"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/usotmbase_zps4f26dd41.png"></a>
<a href="http://www.ultimateshinobi.org/u1835" onMouseover="showmenu(event,linkset[1])" onMouseout="delayhidemenu()"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/notmbase_zps03c7626d.png"></a>
<a href="http://www.ultimateshinobi.org/t8832-shiro-kiri-genin" onMouseover="showmenu(event,linkset[2])" onMouseout="delayhidemenu()"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/cotmbase_zps35ec9306.png"></a>
<a href="http://www.ultimateshinobi.org/t8685-serial-escalation" onMouseover="showmenu(event,linkset[3])" onMouseout="delayhidemenu()"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/totmbase_zps835d88a9.png"></a><br>
<a href="http://www.ultimateshinobi.org/u1482" onMouseover="showmenu(event,linkset[4])" onMouseout="delayhidemenu()"><img src="http://i496.photobucket.com/albums/rr330/M4D4R4UCHIH4/sotmbase3_zps6fd7b985.png"></a>
<br>
<a href="http://www.ultimateshinobi.org/t4-spotlight-archives" style="text-transform: uppercase; font-family: calibri; font-size: 10px;">Spotlight Archives</a>
</center></td></tr></table></menuobj><div style="height: 6px"></div><table class="forumline" width="100%" border="0" cellspacing="1" cellpadding="0"><tr><td class="catLeft" height="25"><span class="genmed  module-title">Affiliates</span></td></tr><tr><td  class='row1'  align="left"><center><b><font face="Calibri" size="2" color="#e02a2a">OUR BUTTON</b></font><br>
<a href="http://www.ultimateshinobi.getgoo.us/forum" class="postlink"><img src="http://i.imgur.com/ieBnoSj.gif" border="0" alt="Ultimate Shinobi" /></a><br><br>

<b><font face="Calibri" size="2">OUR AFFILIATES</b></font><br>
<table border="0">
<tr>
<td><a href="http://nwotn3.motion-forum.net/portal.htm" class="postlink" target="_blank"><strong><img src="http://i65.servimg.com/u/f65/13/55/61/02/miniba10.jpg" alt="" style="opacity: 0.6;" onmouseover="this.style.opacity=1;this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.6;this.filters.alpha.opacity=60" border="0" height=31 width=88 ></strong></a></td>
</tr>
<tr>
<td><a href="http://www.fairytailrp.com/" class="postlink" target="_blank"><strong><img src="http://i41.servimg.com/u/f41/15/11/84/39/ftrpg11.png" alt="" style="opacity: 0.6;" onmouseover="this.style.opacity=1;this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.6;this.filters.alpha.opacity=60" border="0" height=31 width=88 ></strong></a></td>
</tr>
<tr>
<td><a href="http://www.platinumhearts.net" class="postlink" target="_blank"><strong><img src="http://i14.photobucket.com/albums/a323/Frost_0/1600720518a9b0da04b9bd7a5e87d141.jpg" alt="" style="opacity: 0.6;" onmouseover="this.style.opacity=1;this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.6;this.filters.alpha.opacity=60" border="0" height=31 width=88 ></strong></a></td>
</tr>
<tr>
<td><a href="http://bleachgotei.forumsmotion.com/" class="postlink" target="_blank"><strong><img src="http://i1029.photobucket.com/albums/y359/IsshinON/The%20Beginning%20of%20Photoshop/BGaffiliate2-1.png" alt="" style="opacity: 0.6;" onmouseover="this.style.opacity=1;this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.6;this.filters.alpha.opacity=60" border="0" height=31 width=88 ></strong></a></td>
</tr>
<tr>
<td>
<a href="http://www.bleachstory.net/" target="_blank"><img src="http://i37.servimg.com/u/f37/13/67/77/07/bleach11.gif"  alt="Bleach Story RP" style="opacity: 0.6;" onmouseover="this.style.opacity=1;this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.6;this.filters.alpha.opacity=60" border="0" height=31 width=88 ></a></a></td></tr>
<tr>
<td></a></a></td></tr>
</table></center></td></tr></table><div style="height: 6px"></div><table class="forumline" width="100%" border="0" cellspacing="1" cellpadding="0"><tr><td class="catLeft" height="25"><span class="genmed  module-title">COPYRIGHT</span></td></tr><tr><td  class='row1'  align="left"><br /><strong><span style="font-size: 8px; line-height: normal"><div style="margin:auto;text-align:center;width:100%">Naruto© - The Creator<div style="margin:auto;text-align:center;width:100%">[ Masashi Kishimoto
]</div> </div><div style="margin:auto;text-align:center;width:100%">Custom Characters, Equipment, Techniques, Images, etc. <div style="margin:auto;text-align:center;width:100%">~ Their Rightful Owners ~</div></div><div style="margin:auto;text-align:center;width:100%"></br><br />Any creations, posts, and ideas from this site are copyrighted to their respective owners. Therefore, information may not be taken or used without their permission. Failing to abide is plagiarism.<div style="margin:auto;text-align:center;width:100%">© All Rights Reserved.</div></div></span></strong></br>
<strong><span style="font-size: 8px; line-height: normal"><div style="margin:auto;text-align:center;width:100%"><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-nd/3.0/80x15.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/3.0/">Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported License</a>.</div></div></span></strong><center><br></td></tr></table></center><div style="height: 6px"></div></div></td></tr></tbody></table></div></div><!--
 close div id="page-body" --><div id="page-footer"><div align="center"><div class="gen"><strong><a href="http://www.forumotion.com/forum-free" target="_blank">Forum free</a></strong>&nbsp;|&nbsp;<span class="gensmall">&copy;</span> <a href="http://www.phpbb.com/" target="_blank">phpBB</a>&nbsp;|&nbsp;<a name="bottom" href="http://help.forumotion.com/" target="_blank">Free forum support</a>&nbsp;|&nbsp;<a name="bottom" href="/contact" rel="nofollow">Contact</a>&nbsp;|&nbsp;<a href="/abuse?page=%2Fg18-administrators&amp;report=1" rel="nofollow">Report an abuse</a></div></div></div></td></tr></table><script type="text/javascript">//<![CDATA[
fa_endpage();//]]></script></body></html>
