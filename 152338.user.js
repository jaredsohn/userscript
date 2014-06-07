// ==UserScript==
// @name        yandex mail .ru
// @namespace   yandex
// @include     *mail.ya*.ru*
// @version     1
// @grant   	 none
// ==/UserScript==
// ==UserScript==
// @name        yandex mail .ru
// @namespace   yandex
// @include     *mail.ya*.ru*
// @version     1
// @grant   	 none
// ==/UserScript==

(function($){
$=$.noConflict();

$(document).ready(function(){
height=76;

script=setInterval(function(){
if ($('.b-folders__folder_current .b-folders__folder__name').length)
{
//blue=$('head link[href='').
blue=$('.b-folders__folder_current .b-folders__folder__name').css('background-color')=="rgb(160, 179, 233)";
green=$('.b-folders__folder_current .b-folders__folder__name').css('background-color')=="rgb(189, 239, 124)";

orange=$('.b-folders__folder_current .b-folders__folder__name').css('background-color')=="rgb(255, 133, 0)";

$('head').append("<style>"+
".b-messages__message:hover .b-messages__firstline {width:100%; -display:block}"+

//".b-messages__message.loading *{cursor:wait !important}"+
//".b-messages__message:hover{color:white !important; text-shadow:0 1px 1px rgba(0, 0, 0, 0.3);,0 0px 5px rgba(0, 0, 0, 0.7)}"+
//".b-messages__message:hover * {color:white !important; }"+

//".b-messages__message:hover .b-ico_service {background-color:white }"+
//".b-messages .b-messages__message {line-height:25px !important;min-height:75px; height:auto !important; white-space:normal !important}"+
//".b-messages .b-messages__message:after{display:none}"+
//".b-messages__message .b-messages__message__link {margin:0 300px 0 0;390; padding:26px 0; display:block;  float:left}"+
//".b-messages__message .b-messages__from {padding:26px  0 27px 7px; }"+
//".b-messages__message .b-messages__message__checkbox{padding:32px 5PX 26PX 19PX; }"+
//".b-messages__message .b-messages__message__checkbox INPUT {VERTICAL-ALIGN:TOP}"+
//".b-messages__message .b-ico_importance {BACKGROUND-POSITION:50% 34PX; }"+
//".b-messages__message:hover .b-ico_service {float:left;padding:20px 0; }"+
//".b-messages__message:hover .b-messages__message__right {display:none}"+
".b-messages__message:hover .b-messages__subject {-display:block; }"+
(blue?"/* .b-messages__message{background: rgba(201, 215, 252,0.33);}  */ .b-messages__message:hover{background-color:#BDCAEF !important;#5D6A8F ; }":'')+
(green	?".b-messages__message:hover{background-color: rgba(142,214,8,0.6) !important;#BDEF7C;#97C908;#6BA200; }.b-messages__message:hover .b-messages__firstline{color:#592}":'')+
/* (orange	?".b-messages__message:hover{-color:white !important; background-color:  #FDA317	!important;rgba(253,163,23,0.9); #FFB032 } .b-messages__message:hover .b-messages__firstline{color:#8C5B0E !important;rgba(255,255,255,0.9) ;#84560D}-.b-messages__message:hover .b-messages__from,.b-messages__message:hover .b-messages__subject{color:white !important;rgba(255,255,255,0.7)} ":'')+ */
(orange	?".b-messages__message:hover *{-font-weight:bold !important}.b-messages__message:hover{-text-shadow:0 0 12px #B24A00;#9E4300;color:rgba(255,255,255,0.7) !important; background-color:  #FDA317	!important;rgba(253,163,23,0.9); #FFB032 } .b-messages__message:hover .b-messages__firstline{color:rgba(255,255,255,0.75) !important;}.b-messages__message:hover .b-messages__from,.b-messages__message:hover .b-messages__subject{color:white !important;rgba(255,255,255,0.7)} ":'')+
//#88B900
".b-messages__message *{text-decoration:none !important}"+
".b-messages__message{height:"+height+"px !important;line-height:"+height+"px !important;border-color:rgba(164, 164, 164,0.22) !important;}"+
".b-messages__message__link{padding:27px 100% 26px 0;}"+
".block-messages-wrap{-height:350px; -overflow-y:auto; }"+
//"html{overflow:hidden}/*.b_footer*/ .b-page-bottom *{background:#E6EAF0 !important;} .b-page-bottom{ position:fixed; bottom:0; width:100%}"+

".b-messages__message_hover *{font-weight:normal !important;}"+
"</style>");

//xx=setInterval(function(){if ($('.b-messages__message').length) clearInterval(xx);
//go();
//},100)

//if (!$('.b-messages__message').length)
(function go(){//setTimeout(function(){

//$('.b-messages__message a').click(function(){$(this).parents('.b-messages__message').addClass('loading')});
//console.log($('.b-messages__message').length);
$('.b-messages__message').live('click',function(e){
if (-1 == $.inArray(e.target.className, 	[	'b-messages__message__checkbox__input',	'b-messages__message__checkbox',	'b-link_js',	"b-ico_importance"]))
//alert('asd'); 
//console.log($('input.b-messages__message__checkbox__input',this).length);
$(this).find('input.b-messages__message__checkbox__input').click();
//$('input.b-messages__message__checkbox__input',this).click(); //alert($('.b-messages__message__checkbox__input',this).val())
});



$('.b-messages__message').live('mouseover',function(){
if ((!$(this).hasClass('b-messages__message_unread')) && $(this).attr('unread')) $(this).removeAttr('unread'); 
if ($(this).hasClass('b-messages__message_unread')) $(this).attr('unread',1); /*if (!$(this).attr('unread'))*/ 

$(this).addClass('b-messages__message_unread');
if (!$(this).attr('unread')) $(this).addClass('b-messages__message_hover'); });
$('.b-messages__message').live('mouseout',function(){if (!$(this).attr('unread')) $(this).removeClass('b-messages__message_unread'); $(this).removeClass('b-messages__message_hover');});

//},5000);

})();

//console.log(script);
clearInterval(script);
//console.log(script+'asd');
}
},50);

});
})(jQuery)