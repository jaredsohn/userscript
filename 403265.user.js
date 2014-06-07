// ==UserScript==
// @name       隐藏优酷浏览记录
// @namespace  http://xihuanyinyue.com
// @version    0.1
// @description  隐藏在登陆优酷账号时候的浏览记录加载【776455616】
// @match      http://www.youku.com/
// @match      http://www.soku.com/
// @copyright  2013-3-5  
// ==/UserScript==
function remN(str) {
  return str.replace(/\s+/, "");
}
var d=document.getElementById("headq");

d.onkeyup=function(){ 
  
  var v=d.value;
  console.log(v);
    v=remN(v);
  
    if(v=='')
    {
         
        var xbox=document.getElementById("_xbox_refresh");
        xbox.style.display='none';   
    }
    else
        
    {
         
         var xbox=document.getElementById("_xbox_refresh");
        xbox.style.display='block';
    }
    
}
d.onclick=function(e){ 
    var v=d.value;
    v=remN(v);
    if(v=='')
    {
     
 
        var xbox=document.getElementById("_xbox_refresh");
        xbox.style.display='none';
        
    }
    else
        
    {
         var xbox=document.getElementById("_xbox_refresh");
        xbox.style.display='block';
    }
       
                    
                    }
