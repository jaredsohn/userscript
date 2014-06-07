// ==UserScript==
// @name      Enterupload Autowait
// @description Auto click, redirect, auto wait
// @include     http://www.enterupload.com/*
// @include     http://*.enterupload.com/*
// @author      lijun
// ==/UserScript==



function superfunction() 

{ 
     var ele = document.getElementById('mf');

     if(ele){
              ele.click(); 
}
    else{
      var ele = document.getElementById('btn_generate'); 
      
             if(ele){
                        var obj=document.getElementById("countdown_str");                          
              
                        if(obj&&obj.innerHTML.indexOf(">1<")!==-1){                            
                              
                                 ele.disabled=false;
                                 ele.click();   
}
     
             else { 
                    document.title="Please "+obj.textContent+"!";
                    setTimeout(superfunction,990); 
}  
} 

else{

var ele = document.getElementById('btn_download');      
       if(ele){

                 ele.click();                       
                 document.title="Download ready!";
       }
       
}      
}
}

function countdown(num) {
      if(num<=0) {
          top.location.href=top.location.href;
          return;
      }
         
      setTimeout(function() {
                          
          document.title="Waiting(0"+Math.floor(num/60)+":"+(num%60<10?'0'+num%60:num%60)+")";
          countdown(num - 1);
      }, 1000);

  }

var tex=document.body.innerHTML;

if(tex.indexOf("File Not Found")!==-1)
{document.title="File Not Found";}

else{

var div=document.getElementsByTagName('div');

for (var i = 0; i < div.length; i++) {

    if(div[i].innerHTML.indexOf("You have to wait")!==-1){

        var obj1=div[i]; 

        break;      
     }
}

if(obj1){

var m=obj1.innerHTML.indexOf("minute");
var s=obj1.innerHTML.indexOf("second");
var str=obj1.innerHTML;
m1=str.charAt(m-2);
s1=str.substring(s-3,s-1);

if(m1&&s1) { 
t=parseInt(m1)*60+parseInt(s1); }
else if(s1&&!m1) {t=parseInt(s1); }
else if (m1&&!s1) {t=parseInt(m1)*60; }

countdown(t);

}

window.addEventListener("load", superfunction, false); 
}

var obj = document.createElement("script"); 
obj.type = "application/javascript"; 
obj.innerHTML = superfunction+'superfunction();'; 
document.body.appendChild(obj);