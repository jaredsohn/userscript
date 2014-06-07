// ==UserScript==
// @name        PS2 Login
// @namespace   http://userscripts.org/users/483258
// @description PS2 Auto Login
// @include     https://auth.station.sony.com/login*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==

(function() {
   var PS2Username = GM_getValue("PS2Username",false);
   var PS2Password = GM_getValue("PS2Password",false);
   var loginFlag = true;
 
   window.setLogin = function(event){
          loginFlag=false;
         
      PS2Username=prompt("Enter your forum User ID");
      GM_setValue("PS2Username", PS2Username);
      PS2Username=GM_getValue("PS2Username",false);
 
      PS2Password=prompt("Enter your forum password");
      GM_setValue("PS2Password", PS2Password);
      PS2Password=GM_getValue("PS2Password",false);
 
      loginFlag=true;
      event.preventDefault();
   }
 
   var links = document.createElement("a");
    links.innerHTML = '<div id="PSSetAuth" style="cursor: pointer; border-style:outset;border-color:#FFF;width:180px;margin:5px;font-size:small;text-align:center;background-color:#000000; height:30px;color: #FFF;"><p style="margin: 2px 2px 2px 2px;">Sony Station Forum Credentials</div>';
   
    links.addEventListener('click', setLogin, true);
   
    document.body.insertBefore(links, document.body.firstChild);  
   
     
   window.PS2Login = function(){
       if(!(GM_getValue("PS2Username",false)==false) && !(GM_getValue("PS2Password",false)==false) && loginFlag==true){
        var formA = document.forms.namedItem("loginForm");
        var ps2id = formA.elements.namedItem("username");
            ps2id.value=PS2Username;
            var pass = formA.elements.namedItem("password");
            pass.value=PS2Password;
 
 
       document.getElementById('btnContinue').click();
 
       
        }else{
            setTimeout(PS2Login,2000);
        }
    }
 
    //call PS2Login onLoad, pausing in case user wants to set/change user/pass first
    setTimeout(PS2Login,2000);
})
 
 
();