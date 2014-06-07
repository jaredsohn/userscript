// ==UserScript==
// @name           Easy Subscriber - MM Project
// @namespace      ESub
// @author         HCBR600RR
// @copyright      2013 HCBR600RR
// @version        1.0.5
// @date           31.03.2013
// @description    EasySub - Free eRepublik Subscriber Project to get Media Mogul Medal
// @homepage       http://easysubmarine.yzi.me/
// @updateURL      http://userscripts.org/scripts/source/161673.meta.js
// @downloadURL    http://userscripts.org/scripts/source/161673.user.js
// @include        http://www.erepublik.com/*/newspaper/*
// @include        http://www.erepublik.com/*/article/*
// @include        https://www.erepublik.com/*/newspaper/*
// @include        https://www.erepublik.com/*/article/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @history        1.0.4 name convention
// @history        1.0.3 add web page, jQuery fix
// @history        1.0.2 Small optimizations and fixes
// @history        1.0.1 Set urls
// @history        1.0.0 First version
// ==/UserScript==
var hosturl = "http://easysubmarine.yzi.me/easysub.php", ButtonStage = { "0": "Start Subing", 1: "Stop" }; function Stage(a) { $("#easybutton").html(ButtonStage[a]) } function Log(a) { $("#easystatus").html(a); GM_log(a) } function Jsonize(a) { var b = a.indexOf("<"); return 0 <= b ? a.substr(0, b) : a }
function ParseResult(a){a=Jsonize(a);void 0!=subChecker&&window.clearInterval(subChecker);var b=JSON.parse(a);a=b.subuid;b=b.subpid;void 0!=a?-1==a?(Log("All newpaper subscribed."),Stage(0)):void 0!=b&&(GM_setValue("easy_subpId",b),GM_setValue("easy_subeId",a),a=location.href.match(/-([0-9]+)\//)[1],b!=a&&(location.href=BASE_URL+"newspaper/"+b)):Stage(0)}function onError(a,b,c){Log("HTTP Error: "+a.status+" : "+b+", "+c)}
var htmlMenu='<div id="easymenu"><button id="easybutton">'+ButtonStage[0]+"</button>",htmlMenu=htmlMenu+'<span id="easystatus">Events Log:</span>',htmlMenu=htmlMenu+"</div>";$("div.newspaper_head").before(htmlMenu);var htmlStyle="<style> #easymenu { border-bottom: 3px solid #bab00b; clear: both; float: left; margin-bottom: 10px; padding-bottom: 3px; width: 760px; }",htmlStyle=htmlStyle+"#easystatus {margin-left: 10px; }",htmlStyle=htmlStyle+"#easybutton {width: 100px; } </style>";$("head").append(htmlStyle);
var uId=$("input#citizen_id").val(),pId=GM_getValue("easy_mypId",0),mysubs=GM_getValue("easy_MySubcribers",-1),subpId=GM_getValue("easy_subpId",0),subuId=GM_getValue("easy_subeId",0),lastUpdate=GM_getValue("easy_lastdayUpdate",0),subChecker=void 0,bSubing=!1,spURL=location.href.split("/"),BASE_URL=spURL[0]+"/"+spURL[1]+"/"+spURL[2]+"/"+spURL[3]+"/",eDay=0,eDay=parseInt($("span.eday>strong").text().replace(",",""),10);
function easymain(){var a=$("input#newspaper_id").val();if(bSubing=subpId===a)Stage(1),subChecker=window.setInterval(function(){if(!1===$('div.actions > a[class*="subscribeToNewspaper"]').is(":visible")){window.clearInterval(subChecker);Log("Registering your sub and load next newspaper...");var a=$("em.subscribers:first").text();$.ajax({type:"POST",url:hosturl,context:this,data:{uid:uId,subuid:subuId,subs:a},crossDomain:!0,cache:!1,success:function(a){ParseResult(a)},error:onError})}else Log("Waiting for you to subscibe. Please Click to Subscribe button.")},
2E3)}
$("#easybutton").click(function(){Stage(bSubing?0:1);if(bSubing)bSubing=!1,GM_setValue("easy_subpId",0),GM_setValue("easy_subeId",0),void 0!=subChecker&&window.clearInterval(subChecker);else{if(0==pId)if(Log("First run, register my into poject"),$.ajax({url:BASE_URL+"citizen/profile/"+uId,type:"GET",async:!1,context:this,cache:!1,timeout:3E4,error:onError,success:function(a){(a=$(a).find('div.one_newspaper > a[href*="newspaper"]').attr("href"))&&(pId=a.match(/-([0-9]+)\//)[1])}}),0!=pId)GM_setValue("easy_mypId",pId);
else{Log("Script Initialisation Failed");return}if(0!=pId){if(eDay!=lastUpdate)if($.ajax({url:BASE_URL+"newspaper/"+pId,type:"GET",async:!1,cache:!1,context:this,timeout:3E4,error:onError,success:function(a){mysubs=$(a).find("div.actions > p > em").text()}}),0<=mysubs)lastUpdate=eDay,GM_setValue("easy_lastdayUpdate",lastUpdate);else{Log("Update paper failed");Stage(0);return}$.ajax({type:"GET",url:hosturl,context:this,async:!0,data:{uid:uId,pid:pId,subs:mysubs},crossDomain:!0,cache:!1,success:function(a){ParseResult(a)},
error:onError})}}});easymain();
