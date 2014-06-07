// ==UserScript== 
// @name poll1
// @description auto poll filler 
// @include http://www.cineroundup.com/* 
// ==/UserScript==

var runCount = 0;    
pollVoter();



function pollVoter() {
  while(runCount < 500){
    
    setTimeout(goHome(), 15000);
vote();
  }
}

function goHome(){
   var d = new Date();
   var cookie = document.cookie = "v0=1;expires=" + d.toGMTString() + ";" + ";";
alert(cookie);
   document.getElementById("voteid2").checked = true;
}

function vote(){
    document.getElementsByName("form2")[0].submit();
}
