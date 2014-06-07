// ==UserScript==
// @name           unauffälliger Webkicks-Chatstyle
// @namespace      *
// @description    Webkicks-Chats umstylen, damit sie (z.B. auf Arbeit, in der Schule, etc.) weniger auffallen
// @include        http://server*.webkicks.de/*/index2.cgi
// @include        http://server*.webkicks.de/cgi-bin/chat.cgi
// ==/UserScript==


function umstylen(){
  f = parent.frames;
  for(i=0;i<f.length;i++){
    if(f[i].document.getElementById("userStyle")){
      continue;
    }
    //alert(f[i].name);
    newStyle = f[i].document.createElement('style');
    //alert(f[i].name+"1");
    newStyle.setAttribute("type", "text/css");
    newStyle.setAttribute("id", "userStyle");
    //alert(f[i].name+"2");
    newStyle.innerHTML = "body, td, div, a, input, select, font{background-color:#fff ! important;background-image:'' ! important;color:#000 ! important;}";
    newStyle.innerHTML += "div, hr{border: 0px ! important;}";
    newStyle.innerHTML += "img{max-width: 7px ! important;max-height: 7px ! important;}";
    newStyle.innerHTML += "img:hover{max-width: 100px ! important;max-height: 100px ! important;}";
    //alert(f[i].name+"3");
    f[i].document.getElementsByTagName('head')[0].appendChild(newStyle);
    //alert(f[i].name+"4");
    f[i].document.getElementsByTagName('body')[0].background="";
  }
  //alert(i);
}
window.setInterval(umstylen,1000);