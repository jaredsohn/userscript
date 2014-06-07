// ==UserScript==
// @name tieba_hide_message_scores bywb
// @namespace tieba
// @description 去除贴吧左上角提示，回复和@除外
// @include http://tieba.baidu.com/*
// @version 1.0
// @grant GM_addStyle
// ==/UserScript==

var $ = unsafeWindow.$;

$(function(){
var sett,myi=0;

function spp(){
// alert($("#"+theid).size())

if(($("#message_reply a").size()==0)&&($("#message_atme a").size()==0))//如果没有人回复或者at，则全隐藏
{$(".ui_bubble_content ").hide("slow");
$(".ui_arrow_o_up").hide("slow")
}
else //否则隐藏多余的
{
$("#message_clientnews ").hide("slow");
$("#message_favts ").hide("slow");
$("#message_newcard ").hide("slow");
$("#message_paperprops ").hide("slow");
$("#message_scores ").hide("slow");
}
// clearInterval(sett);
}
sett=setInterval(spp,3000)
})
	