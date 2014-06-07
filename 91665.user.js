// ==UserScript==
// @name           Omegler
// @namespace      f337
// @description    spams Omegle
// @include        http://omegle.com/
// ==/UserScript==

var uie=document.createEvent("UIEvents");
var waitreg=/<div class="statuslog\">Connecting to server...<\/div>/g;

var invertol = 1;

if(confirm("Shall we spam?")==true){
    var whatsay = ''+prompt("What say?","fag");
    if(whatsay=='')whatsay="fag";
    document.body.innerHTML += '<div style="border:#000000 solid '+
                                     '1px;position:absolute;top:10px;left:10px;'+
                                     'z-index:600;padding:20px;background:#FFFFFF;'+
                                     'color:#000000;" onClick="document.location=\'http://omegle.com\'");">'+
                                     'Click to Cease</div>';
    invertol = setInterval(function(){
         if(document.body.innerHTML.match(/<img src=\"\/static\/chatbutton\.png\" alt=\"Start a chat\">/gi)!=null
         && document.body.innerHTML.match(waitreg)==null){
              //start new chat
              document.location = 'javascript:contentTop = $("intro").offsetTop; $("intro").dispose(); startNewChat();void 0';
         }else if(document.body.innerHTML.match(/<div class=\"statuslog\">Your conversational partner has disconnected\.<\/div>/gi)!=null
                 && document.body.innerHTML.match(waitreg)==null){
              //restart
              document.location = 'javascript:startNewChat();void 0';
         }else if(document.body.innerHTML.match(/<div class=\"strangermsg\">/gi)!=null){
              //if chat started, spam
             
              //focus message box
              document.getElementsByTagName('textarea')[0].focus();
              if(document.getElementsByTagName('textarea')[0].value.length < whatsay.length){
                   //type message
                   uie.initUIEvent("keydown", true, true, window, 1);
                   document.getElementsByTagName('textarea')[0].value += whatsay[document.getElementsByTagName('textarea')[0].value.length];
                   uie.initUIEvent("keyup", true, true, window, 1);
              }else{
                   //send message
                   document.getElementsByTagName('input')[1].click();
              }
         }
         return;
    }, 1);
}else{
    alert("Enjoy chatting reg-u-lar-ly...");
}