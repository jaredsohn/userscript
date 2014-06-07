// ==UserScript==
// @name       idk cht wifi login
// @namespace  http://userscripts.org/users/idkskate
// @version    0.1
// @description  enter something useful
// @include    http://pwlan.hinet.net/wlan_2_0/
// @copyright  2011+, You
// ==/UserScript==
//alert("a");



var account='yourhinetaccount';
var password='yourhinetpassword';
var emome=false;//if you are emome user , chage "false" to "true"
function myclick(obj){
    if(document.all)   
    {obj.click();}  
     else   
     {  
           var evt = document.createEvent("MouseEvents");  
           evt.initEvent("click", true, true);   
          obj.dispatchEvent(evt); 
      }   
}

function autologin(){
var tab_num=4;
var acount_num=6;
if(emome){acount_num=0;tab_num=3;}
myclick(document.links[tab_num]);
document.getElementsByTagName('input')[acount_num].value = account;
if(document.getElementsByTagName('input')[acount_num].onchange)document.getElementsByTagName('input')[acount_num].onchange();
document.getElementsByTagName('input')[acount_num+1].value = password;
if(document.getElementsByTagName('input')[acount_num+1].onchange)document.getElementsByTagName('input')[acount_num+1].onchange();
myclick(document.links[7]);//submit
}
url=document.href;

if(url.indexOf("auth_portal.php")>-1){
myclick(document.links[3]);
}else{
   setTimeout(autologin(),3000)
}