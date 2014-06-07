// ==UserScript==
// @name        moblie ynet for pc
// @namespace   http://shmulik.zekar.co.cc
// @include     http://m.ynet.co.il/*
// @version     2.6
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    make m.ynet looks good on pc
// @grant        GM_addStyle
// @grant        GM_getValue
// ==/UserScript==

GM_addStyle("\
   body { background: black } \
   #div_Content, #talkbacks {width:960px; margin:auto; background:white} \
   .artimgborder {float:left; clear:left} \
   .hplinkTitle {clear:both; } \
   .linkbutton {background:#4479ba; color:#fff; padding: 10px 14px} \
   #set_div_2 {display:inherit!important; width:960px!important; margin:auto!important; position:inherit!important} \
   div.wrapper {padding: 0 15px} \
   .talkbacksShow {height: 45px; text-align:center; background:-moz-linear-gradient(center top , #FFFFFF, #CCCCCC) repeat scroll 0 0 transparent} \
   #RepeaterCategories_ctl03_MiddlebannerPanel, #ifr, #set_div_1 {display:none}\
   #talkbacks .talkbacks_sendBTN {margin: 0 0 1em}\
");

if ((location.href == "http://m.ynet.co.il/") || (location.href == "http://m.ynet.co.il/Maavaron.aspx")) location.href = "http://m.ynet.co.il/main.aspx"

var o = JSON.parse(sessionStorage["offportal_aspx_data"]);
var myDate = new Date(o.secondTime);
var currentTime = new Date('5/12/2013 18:56:31');
var minutes = 1000 * 60;            

if (o.secondTime == null || (((currentTime.getTime() - myDate.getTime()) / minutes) >= 120)) {
    
    if (o.secondFlag == 1) {
        o.secondFlag = 0;
        var date = new Date();
        o.secondTime = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()+' 19:56:31';
        o.redirectURL = window.location.href;
        sessionStorage["offportal_aspx_data"] = JSON.stringify(o);
/*
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            window.location = "http://m.ynet.co.il/MaavaronP.aspx";
        }
        else if (navigator.userAgent.match(/Android/i)) {
            window.location = "http://m.ynet.co.il/MaavaronPA.aspx";
        }
        else {
                o.secondFlag = 1;
              sessionStorage["offportal_aspx_data"] = JSON.stringify(o);
            //window.location = "http://m.ynet.co.il/MaavaronP.aspx";
        }*/
    }
    else {
        o.secondFlag = 1;
        sessionStorage["offportal_aspx_data"] = JSON.stringify(o);
    }
      
                
window.onload = function (){
var $ = unsafeWindow.jQuery;
$(function(){

  if (location.href.indexOf("TalkbacksShow")>=0)
  {
    unsafeWindow.open_all_talkbacks=function(){$('.talkbacks_BG').css('display','none');$('.talkbacks_open').css('display','');};
    unsafeWindow.close_all_talkbacks=function(){$('.talkbacks_BG').css('display','');$('.talkbacks_open').css('display','none');};
    $("#innerHeader").append("<a class='linkbutton' style='display:inline-block;border:1px solid #000;padding:5px;' onclick='open_all_talkbacks()'>פתח את כל התגובות</a>");
  }
  
  if (location.href.indexOf("AddTalkback")>=0)
  {
    $("#talkbacks").append("<br style='clear:both'>")
  }  
  
  $("#ifr").parent().remove();
  $("img[id^='poster']").remove();
  $("video").parent().parent().css("float","left").css("clear","left").css("margin","10px");
  $(".text12 > img").parent().css("width","300px").css("float","left").css("clear","left").css("margin","10px");                         //not in user script
  $("iframe[src^='http://www.youtube.com']").css("float","left").css("clear","left").css("margin","10px");
  $("#set_div_1").remove();
  $("#div_Content div").last().remove();
  $("#div_Content div").last().remove();
  $(".talkbacksShow div:last").remove();
  
  var ArtId = decodeURIComponent((new RegExp('[?|&]id=([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  
  $(".talkbacksShow").html("<a class='linkbutton' href='TalkbacksShow.aspx?id="+ArtId+"'>קרא תגובות</a> <a class='linkbutton' href='AddTalkback.aspx?id="+ArtId+"'>הוסף תגובה</a>");
  $("#RepeaterCategories_ctl03_MiddlebannerPanel").remove();
  if ((location.href == "http://m.ynet.co.il/main.aspx") && GM_getValue("MiniMain", false))
  {
    $("#div_Content a + div").css("display","none");
    $("#div_Content a + div:hover").css("display","block");
    $("#div_Content a:hover + div").css("display","block");
  }
  
  $("head").append("<link rel='shortcut icon' href='http://www.ynet.co.il/favicon.ico' />");
})};

