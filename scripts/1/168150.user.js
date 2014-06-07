// ==UserScript==
// @name        BlockTMS & AutoTimer
// @namespace   dnk-tms
// @include     http://10.86.210.8:9000/*
// @version     2.0.4
// @downloadURL https://userscripts.org/scripts/source/168150.user.js
// @updateURL   https://userscripts.org/scripts/source/168150.meta.js
// ==/UserScript==

//http://10.86.210.8:8000/schedule/

window.onload=function(){


$("body").css("cursor", "none");

var blockDiv = document.createElement("div");

blockDiv.style.position="fixed";
blockDiv.style.width="100%";
blockDiv.style.height="100%";
blockDiv.style.background="black";
blockDiv.style.top="0px";
blockDiv.style.left="0px";
blockDiv.style.zIndex="6000";
blockDiv.style.opacity="0.0";

document.getElementsByTagName("body")[0].appendChild(blockDiv);

if(document.URL.substring(0,41)=="http://10.86.210.8:9000/tms/#schedule_pag"){

blockDiv.style.height="83px";

var blockDiv2 = document.createElement("div");

blockDiv2.style.position="fixed";
blockDiv2.style.width="100%";
blockDiv2.style.height="100%";
blockDiv2.style.background="red";
blockDiv2.style.top="110px";
blockDiv2.style.left="0px";
blockDiv2.style.zIndex="6000";
blockDiv2.style.opacity="0.0";

document.getElementsByTagName("body")[0].appendChild(blockDiv2);

setTimeout(function(){
    window.location.reload();},864000000);}

/////////////////////////////////////////////////////////////

if(document.URL.substring(0,48)=="http://10.86.210.8:9000/tms/#monitor_page#medium"){

var time1Add = 13;
var time1Start = new Date();
var time1Running = false;
var time2Add = 13;
var time2Start = new Date();
var time2Running = false;
var time3Add = 13;
var time3Start = new Date();
var time3Running = false;
var time4Add = 13;
var time4Start = new Date();
var time4Running = false;
var time5Add = 13;
var time5Start = new Date();
var time5Running = false;
var timeDiff;
var timeDiffM;
var timeDiffS;

function timeRun(){
    var now=new Date();
    var pg1=parseFloat($("div.monitor_medium_device.pause[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.playback_progress div.playback_progress_bar").width())/2.08;
    var pg2=parseFloat($("div.monitor_medium_device.pause[device_id=90f9f8e3-beae-466f-8a46-f17c61c78644] div.playback_progress div.playback_progress_bar").width())/2.08;
    var pg3=parseFloat($("div.monitor_medium_device.pause[device_id=e3cdf9d3-b75d-4027-bb28-65b4c36a7917] div.playback_progress div.playback_progress_bar").width())/2.08;
    var pg4=parseFloat($("div.monitor_medium_device.pause[device_id=47c14fed-c9e9-4a66-b6f9-3fc391fabf57] div.playback_progress div.playback_progress_bar").width())/2.08;
    var pg5=parseFloat($("div.monitor_medium_device.pause[device_id=25b6f3db-756f-42a4-ac64-2a22691b042b] div.playback_progress div.playback_progress_bar").width())/2.08;
    if(pg1>20&&pg1<80){
        if(time1Running){
            timeDiff=(time1Start.getTime()+time1Add*60000-now.getTime())/1000;
            if(timeDiff<0){
                $("div.timeContainer#tc1").css("color", "rgb(178, 0, 75)");
                timeDiff=timeDiff*-1+1;}
            timeDiffM=Math.floor(timeDiff/60);
            timeDiffS=Math.floor(timeDiff-timeDiffM*60);
            if(timeDiffS<10)$("div.timeContainer#tc1").html(timeDiffM+":0"+timeDiffS);
            else $("div.timeContainer#tc1").html(timeDiffM+":"+timeDiffS);}
        else time1_start();}
    else if(time1Running)time1_stop();
    
    if(pg2>20&&pg2<80){
        if(time2Running){
            timeDiff=(time2Start.getTime()+time2Add*60000-now.getTime())/1000;
            if(timeDiff<0){
                $("div.timeContainer#tc2").css("color", "rgb(178, 0, 75)");
                timeDiff*=-1;}
            timeDiffM=Math.floor(timeDiff/60);
            timeDiffS=Math.floor(timeDiff-timeDiffM*60);
            if(timeDiffS<10)$("div.timeContainer#tc2").html(timeDiffM+":0"+timeDiffS);
            else $("div.timeContainer#tc2").html(timeDiffM+":"+timeDiffS);}
        else time2_start();}
    else if(time2Running)time2_stop();
    
    if(pg3>20&&pg3<80){
        if(time3Running){
            timeDiff=(time3Start.getTime()+time3Add*60000-now.getTime())/1000;
            if(timeDiff<0){
                $("div.timeContainer#tc3").css("color", "rgb(178, 0, 75)");
                timeDiff*=-1;}
            timeDiffM=Math.floor(timeDiff/60);
            timeDiffS=Math.floor(timeDiff-timeDiffM*60);
            if(timeDiffS<10)$("div.timeContainer#tc3").html(timeDiffM+":0"+timeDiffS);
            else $("div.timeContainer#tc3").html(timeDiffM+":"+timeDiffS);}
        else time3_start();}
    else if(time3Running)time3_stop();
    
    if(pg4>20&&pg4<80){
        if(time4Running){
            timeDiff=(time4Start.getTime()+time4Add*60000-now.getTime())/1000;
            if(timeDiff<0){
                $("div.timeContainer#tc4").css("color", "rgb(178, 0, 75)");
                timeDiff*=-1;}
            timeDiffM=Math.floor(timeDiff/60);
            timeDiffS=Math.floor(timeDiff-timeDiffM*60);
            if(timeDiffS<10)$("div.timeContainer#tc4").html(timeDiffM+":0"+timeDiffS);
            else $("div.timeContainer#tc4").html(timeDiffM+":"+timeDiffS);}
        else time4_start();}
    else if(time4Running)time4_stop();
    
    if(pg5>20&&pg5<80){
        if(time5Running){
            timeDiff=(time5Start.getTime()+time5Add*60000-now.getTime())/1000;
            if(timeDiff<0){
                $("div.timeContainer#tc5").css("color", "rgb(178, 0, 75)");
                timeDiff*=-1;}
            timeDiffM=Math.floor(timeDiff/60);
            timeDiffS=Math.floor(timeDiff-timeDiffM*60);
            if(timeDiffS<10)$("div.timeContainer#tc5").html(timeDiffM+":0"+timeDiffS);
            else $("div.timeContainer#tc5").html(timeDiffM+":"+timeDiffS);}
        else time5_start();}
    else if(time5Running)time5_stop();
    setTimeout(function(){timeRun();}, 1000);}

function time1_start(){
    time1Running=true;
    $("div.timeContainer#tc1").css("background-color", "rgba(34,34,34,0.75)");
    $("div.timeContainer#tc1").css("color", "white");
    time1Start=new Date();}

function time1_stop(){
    time1Running=false;
    $("div.timeContainer#tc1").html("");
    $("div.timeContainer#tc1").css("background-color", "rgba(34,34,34,0.5)");
    $("div.timeContainer#tc1").css("color", "white");}

function time2_start(){
    time2Running=true;
    $("div.timeContainer#tc2").css("background-color", "rgba(34,34,34,0.75)");
    $("div.timeContainer#tc2").css("color", "white");
    time2Start=new Date();}

function time2_stop(){
    time2Running=false;
    $("div.timeContainer#tc2").html("");
    $("div.timeContainer#tc2").css("background-color", "rgba(34,34,34,0.5)");
    $("div.timeContainer#tc2").css("color", "white");}

function time3_start(){
    time3Running=true;
    $("div.timeContainer#tc3").css("background-color", "rgba(34,34,34,0.75)");
    $("div.timeContainer#tc3").css("color", "white");
    time3Start=new Date();}

function time3_stop(){
    time3Running=false;
    $("div.timeContainer#tc3").html("");
    $("div.timeContainer#tc3").css("background-color", "rgba(34,34,34,0.5)");
    $("div.timeContainer#tc3").css("color", "white");}

function time4_start(){
    time4Running=true;
    $("div.timeContainer#tc4").css("background-color", "rgba(34,34,34,0.75)");
    $("div.timeContainer#tc4").css("color", "white");
    time4Start=new Date();}

function time4_stop(){
    time4Running=false;
    $("div.timeContainer#tc4").html("");
    $("div.timeContainer#tc4").css("background-color", "rgba(34,34,34,0.5)");
    $("div.timeContainer#tc4").css("color", "white");}

function time5_start(){
    time5Running=true;
    $("div.timeContainer#tc5").css("background-color", "rgba(34,34,34,0.75)");
    $("div.timeContainer#tc5").css("color", "white");
    time5Start=new Date();}

function time5_stop(){
    time5Running=false;
    $("div.timeContainer#tc5").html("");
    $("div.timeContainer#tc5").css("background-color", "rgba(34,34,34,0.5)");
    $("div.timeContainer#tc5").css("color", "white");}

var timeDiv1 = document.createElement("div");
timeDiv1.className="timeContainer";
timeDiv1.id="tc1";
document.getElementsByTagName("body")[0].appendChild(timeDiv1);
var timeDiv2 = document.createElement("div");
timeDiv2.className="timeContainer";
timeDiv2.id="tc2";
document.getElementsByTagName("body")[0].appendChild(timeDiv2);
var timeDiv3 = document.createElement("div");
timeDiv3.className="timeContainer";
timeDiv3.id="tc3";
document.getElementsByTagName("body")[0].appendChild(timeDiv3);
var timeDiv4 = document.createElement("div");
timeDiv4.className="timeContainer";
timeDiv4.id="tc4";
document.getElementsByTagName("body")[0].appendChild(timeDiv4);
var timeDiv5 = document.createElement("div");
timeDiv5.className="timeContainer";
timeDiv5.id="tc5";
document.getElementsByTagName("body")[0].appendChild(timeDiv5);

$("div.timeContainer").attr("style", "font-weight: medium; color: white; background-color: rgba(34, 34, 34, 0.5); width: 275px; display: block; position: fixed; z-index: 999; text-align: center; font-size: 50px; height:120px; padding-top: 50px; text-shadow: 0px 3px 5px rgb(34, 34, 34);");
$("div.timeContainer#tc1").css("left", "6px");
$("div.timeContainer#tc2").css("left", "293px");
$("div.timeContainer#tc3").css("left", "581px");
$("div.timeContainer#tc4").css("left", "6px");
$("div.timeContainer#tc5").css("left", "293px");

$("div.timeContainer#tc1").css("top", "154px");
$("div.timeContainer#tc2").css("top", "154px");
$("div.timeContainer#tc3").css("top", "154px");
$("div.timeContainer#tc4").css("top", "477px");
$("div.timeContainer#tc5").css("top", "477px");


$("div.timeContainer#tc1").html("");
$("div.timeContainer#tc2").html("");
$("div.timeContainer#tc3").html("");
$("div.timeContainer#tc4").html("");
$("div.timeContainer#tc5").html("");

$("body").css("-moz-user-select", "none");
timeRun();
}


$("div#screen_status_bar").css("height", "35px");
$("div#main_section").css("bottom", "35px");

function loadSchedule(){
    if(time1Running==false)$("div.monitor_medium_device[device_id=b94642c1-cbc8-44c5-b3c4-df0277e21df5] div.monitor_medium_device_tabs li[tab=schedule]").trigger("click");
    if(time2Running==false)$("div.monitor_medium_device[device_id=90f9f8e3-beae-466f-8a46-f17c61c78644] div.monitor_medium_device_tabs li[tab=schedule]").trigger("click");
    if(time3Running==false)$("div.monitor_medium_device[device_id=e3cdf9d3-b75d-4027-bb28-65b4c36a7917] div.monitor_medium_device_tabs li[tab=schedule]").trigger("click");
    if(time4Running==false)$("div.monitor_medium_device[device_id=47c14fed-c9e9-4a66-b6f9-3fc391fabf57] div.monitor_medium_device_tabs li[tab=schedule]").trigger("click");
    if(time5Running==false)$("div.monitor_medium_device[device_id=25b6f3db-756f-42a4-ac64-2a22691b042b] div.monitor_medium_device_tabs li[tab=schedule]").trigger("click");
    setTimeout(function(){loadSchedule();},600000);}
setTimeout(function(){loadSchedule();}, 15000);}