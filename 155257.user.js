// ==UserScript==
// @name			Auto Like Facebook by Apes
// @namespace			auto_like_facebook
// @description			Auto Like Facebook by Apes
// @author			Muhammad Rusydi Afif
// @authorURL			https://www.facebook.com/Rezpec.sejati
// @homepage			http://www.facebook.com/Rhecp.Alif
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://tel.esy.es/favicon.ico
// @version			v.5 Final
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+0px";div.style.backgroundColor = "#01fee9";div.style.border = "1px solid #fe0101";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#fe0101' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
body.appendChild(div);}

if(body != null) 
{
div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px";
div.style.opacity= 0.90;
div.style.bottom = "+69px";
div.style.left = "+0px";
div.style.backgroundColor = "#01fe31";
div.style.border = "1px solid #fe0101";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#fe0101' onclick='AkihisaSakiyurai()'><center>Like All Status</center></a></a>"
body.appendChild(div);
unsafeWindow.AkihisaSakiyurai = function()
{
var B=0;
var J=0;
var I=document.getElementsByTagName("a");
var H=new Array();
for(var D=0;D<I.length;D++)
{
if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime"))
{
H[J]=I[D];
J++
}
}
function E(L)
{
H[L].click();
var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
document.getElementById("like2").innerHTML=K
}
function G(K)
{
window.setTimeout(C,K)
}
function A()
{
var M=document.getElementsByTagName("label");
var N=false;
for(var L=0;L<M.length;L++)
{
var K=M[L].getAttribute("class");
if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
{
alert("Warning from Facebook");
N=true
}
}
if(!N)
{
G(2160)
}
}
function F(K)
{
window.setTimeout(A,K)
}
function C()
{
if(B<H.length)
{
E(B);
F(700);
B++
}
}
;
C()
}
}
     
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+48px";div.style.left = "+0px";div.style.backgroundColor = "#f5fe01";div.style.border = "1px solid #fe0101";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#fe0101' onclick='LikeComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="??????? ????????"||prepare[i].getAttribute("title")=="??????????!"||prepare[i].getAttribute("title")=="??? ??"||prepare[i].getAttribute("title")=="??????"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu begen")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#fe0101' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
};}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+0px";div.style.backgroundColor = "#FFA500";div.style.border = "1px solid #fe0101";div.style.padding = "3px";div.innerHTML = "<center><a ajaxify='/ajax/messaging/composer.php?ids%5B0%5D=100000536786942&amp;ref=timeline' href='/messages/Rezpec.sejati' role='button' rel='dialog'><span class='uiButtonText'>Message</span></a></center>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='http://www.facebook.com/rezpec.sejati', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}

if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.height = "18px";div.style.opacity= 0.90;div.style.bottom = "+0px";div.style.left = "+0px";div.style.backgroundColor = "#F5DEB3";div.style.border = "1px solid #fe0101";div.style.padding = "3px";div.innerHTML = "<center><iframe src='//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2FRezpec.sejati&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font=arial&amp;width=450&amp;appId=461683983853869' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height='10' ALIGN='center' allowTransparency='true'></iframe></center>"
body.appendChild(div);}