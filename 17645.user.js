Source for "Orkut Login"

   1. // ==UserScript==
   2. // @name Orkut Login
   3. // @author Moises Lima (Portuguese version) | Mr Nobody (English Version Translation)
   4. // @version 0.1
   5. // @description Creates a menu to switch user quickly using cookies
   6. // @include http://*orkut.com*
   7. // ==/UserScript==
   8.
   9. function sc() {
  10. if (location.hostname.indexOf('orkut.com') >-1 ) {
  11. (function () {
  12.     var userAtual=document.getElementsByTagName("b")[0].innerHTML;
  13.
  14.     function createCookie(name,value,days) {
  15.         if (days) {
  16.             var date = new Date();
  17.             date.setTime(date.getTime()+(days*24*60*60*1000));
  18.             var expires = "; expires="+date.toGMTString();
  19.         }
  20.         else var expires = "";
  21.         document.cookie = name+"="+value+expires+"; domain=.orkut.com; ";
  22.     }
  23.
  24.     function readCookie(name) {
  25.         var nameEQ = name + "=";
  26.         var ca = document.cookie.split(';');
  27.         for(var i=0;i < ca.length;i++) {
  28.             var c = ca[i];
  29.             while (c.charAt(0)==' ') c = c.substring(1,c.length);
  30.             if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  31.         }
  32.         return null;
  33.     }
  34.
  35.     function eraseCookie(name) {
  36.         createCookie(name,"",-1);
  37.     }
  38.
  39.     saveUser =function() {
  40.         var users=readCookie("users");
  41.         if(users){
  42.             users=users.replace(userAtual+",","");
  43.             createCookie("users",(userAtual+((users)?","+users:",")),500);
  44.         }else createCookie("users",userAtual+",",500);
  45.         createCookie(userAtual,readCookie("orkut_state"),500);
  46.         location.reload();
  47.     }
  48.     deleteUser =function(mail) {
  49.         if(confirm("Are u sure u want to delete this user?")){
  50.             var users=readCookie("users");
  51.             if(users){
  52.                 users=users.replace(mail+",","");
  53.                 createCookie("users",users,500);
  54.                 eraseCookie(mail);
  55.                 location.reload();
  56.             }
  57.         }
  58.     }
  59.     loginUser =function(mail) {
  60.         newuser=readCookie(mail)
  61.         eraseCookie("orkut_state");
  62.         createCookie("orkut_state",newuser,500);
  63.         location.reload();
  64.     }
  65.
  66.     function findPos(obj) {
  67.         var curleft = curtop = 0;
  68.         if (obj.offsetParent) {
  69.             curleft = obj.offsetLeft
  70.             curtop = obj.offsetTop
  71.             while (obj = obj.offsetParent) {
  72.                 curleft += obj.offsetLeft
  73.                 curtop += obj.offsetTop
  74.             }
  75.         }
  76.         return [curleft,curtop];
  77.     }
  78.     var linkConfig = document.createElement("a") ;
  79.     linkConfig.href = "Javascript:void(0)";
  80.     linkConfig.innerHTML =" | Users";
  81.     linkConfig.id="Linkconfig"
  82.     linkConfig.addEventListener('mouseover',function () {
  83.         var menuRollOver=document.getElementById('menuRollOver')
  84.         if(menuRollOver){
  85.             if(menuRollOver.style.display=="block"){
  86.                 menuRollOver.style.display="none"
  87.             }else{
  88.                 menuRollOver.style.display="block"
  89.                 menuRollOver.style.cssText="position:absolute;left:"+(findPos(linkConfig)[0])+"px;"
  90.             }
  91.         }else{
  92.             var users=readCookie("users");
  93.            
  94.             var menuRollOver = document.createElement("table") ;
  95.             menuRollOver.innerHTML ='<tr style="background: #BFD0EA;"><td><a  href="javascript:void(0)" onclick="saveUser()">Add current user</a></td><td></td></tr>';
  96.             menuRollOver.id="menuRollOver"
  97.             menuRollOver.className="panel"
  98.             menuRollOver.style.display="block"
  99.             menuRollOver.style.cssText="position:absolute;left:"+(findPos(linkConfig)[0])+"px;"
 100.             linkConfig.appendChild(menuRollOver);
 101.             if(users){
 102.                 var users=users.split(",")
 103.                 var usersMenu=document.getElementById("usersMenu");
 104.                 for( var i = 0, mail; mail = users[i]; i++ ) {
 105.                     menuRollOver.innerHTML+=''
 106.                     +'<tr style="background: #BFD0EA;"><td><a  href="javascript:void(0)" id="'+mail+'" onclick="loginUser(this.id)">'+mail+'</a></td>'
 107.                     +'<td><a  href="javascript:void(0)" id="'+mail+'" onclick="deleteUser(this.id)">'
 108.                     +'<img src="http://www.orkut.com/img/pres2.gif" /></a></td></tr>';
 109.                 }
 110.             }
 111.         }
 112.     },false);
 113.     linkConfig.addEventListener('mouseout',function () {
 114.         document.getElementById('menuRollOver').style.display    = "none";
 115.     },false);
 116.     document.getElementsByTagName('table')[0].getElementsByTagName('td')[2].appendChild(linkConfig)
 117.
 118. })();
 119. }
 120. }
 121.
 122. sc=String(sc);
 123. sc=sc.substring(16,sc.length-1);
 124. script=document.createElement('script');
 125. script.textContent=sc;
 126. document.getElementsByTagName('head')[0].appendChild(script);