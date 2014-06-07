// ==UserScript==
// @name            Project W
// @version         0.0.1
// @description     simplify the weibo, or rather, make it less annoying
// @include         http://weibo.com/*
// @include         http://*.weibo.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant           GM_addStyle
// @license         GPL License
// @namespace       com.aeryen
// @author          aeryen
// ==/UserScript==

var    CSSS = ".W_main { background-image: none ! important; } ";
CSSS = CSSS + ".WB_global_nav {background: #333333;}";

CSSS = CSSS + "#plc_main { margin: 0; width: 700px ! important; padding: 0; overflow: hidden; float:left;} ";
CSSS = CSSS + ".W_main_a { margin: 0; width: 700px ! important; padding: 0;}";

CSSS = CSSS + ".W_main_c { width: 700px ! important; padding: 40px 0 20px 0 ! important;} ";
CSSS = CSSS + ".W_main_bg{background: none ! important;}";

CSSS = CSSS + ".input { margin: 0 0 0 0 ! important; } ";
CSSS = CSSS + "#pl_content_publisherTop { margin: 0 0 0 0 ! important; padding: 0px 20px 20px 20px;} ";
CSSS = CSSS + "#pl_content_homeFeed {padding: 20px 20px;} ";

CSSS = CSSS + "#Box_right { clear: left;} #pl_leftnav_common { clear: left;}";
CSSS = CSSS + ".W_main_l {width: 230px ! important; padding: 0 ! important;} ";
CSSS = CSSS + ".WB_left_nav .lev a:hover {background-image: none ! important ;}";
CSSS = CSSS + ".WB_left_nav .lev2 a:hover, .WB_left_nav .lev2 a.lev_curr , .WB_left_nav .lev2 a.lev_curr:hover, .WB_left_nav .lev3 a:hover {background-image: none ! important ;}";

CSSS = CSSS + ".W_person_info dt {background:none ! important;}";
CSSS = CSSS + "img.S_line5 {border-bottom-style:none; border-bottom-width:0 ! important; }";

CSSS = CSSS + ".B_index .WB_feed .repeat .input textarea {width: 503px;}";

CSSS = CSSS + "#pl_content_box {padding: 20px;}";
CSSS = CSSS + "#pl_content_atmeWeibo {padding: 20px;}";
CSSS = CSSS + "#pl_content_commentList {padding: 20px;}";
CSSS = CSSS + "#pl_content_likeList {padding: 20px;}";
CSSS = CSSS + "#pl_content_messageList {padding: 20px;}";
CSSS = CSSS + "#pl_content_notebox {padding: 20px;}";

CSSS = CSSS + "#pl_content_favListSearch, #pl_content_favListTags, #pl_content_myFavoritesList {padding: 20px 20px 0 20px;}";

CSSS = CSSS + "#pl_content_sendMeFeed {padding: 20px;}";

GM_addStyle(CSSS);

$('#Box_right').children().not('#pl_rightmod_myinfo, #pl_content_setSkin').remove(); //just remove (almost) every thing

$('#pl_leftnav_app').remove();                 //left:  apps

$('.gn_nav').hide();                           //top:   menu
$(".gn_search").css("margin","7px 0px 0px 450px");
$('body').css('font-family','Microsoft YaHei, Helvetica, sans-serif');

var bgcolor = $('.W_main_a').css('background-color');

document.addEventListener("DOMNodeInserted", function(event) {
    $('#plc_main').css('margin', '0');
    $('.W_main_a').css('margin', '0');
    $('#plc_main').has('.W_main_a').css('margin', '0 0 0 50px');
    $('.W_main_a').has('#plc_main').css('margin', '0 0 0 50px');
    $('#plc_main.W_main_a').css('margin', '0 0 0 50px');

    $('.title_area').remove();
    $('.arrow').remove();
    $('#pl_content_biztips').remove();             //middle: image adv
    $('.W_main_c').css('background-color', bgcolor);    
    var main_rS = $('.W_main_r').each(function() {
        if( $(this).find('#pl_rightmod_myinfo').length == 0 )
        {    $(this).remove();
        }
        });
});

$('#Box_right').prependTo('.WB_left_nav');

var pngImg =  /([a-f0-9]){6}_repeat_bg_y.png/g;
var imagePath = $('.W_main_bg').css('background-image');
console.log( pngImg.exec(imagePath)[0].substring(0, 6) );

