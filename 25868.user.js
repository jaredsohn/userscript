// ==UserScript==
// @name          The ASP.NET Forums Signature Hijacker
// @description   Inserts your signature inside an ASP.NET Forum reply, so users can *not* opt to have it hidden through their profile settings.
// @author        Adam Kahtava
// @version       1.0
// @include       http://forums.asp.net/*
// @namespace     http://adam.kahtava.com/etcetera/GreaseMonkey/forums.asp.net.signature.hijacker/
// ==/UserScript==

window.addEventListener('load', function(){

  try{
    
    var replyFrame = window.frames[2];
      
    if(replyFrame && replyFrame.frameElement.id == 'mce_editor_0'){

      var mySignatureId = 'ForumPostSignature';
    
      if(!replyFrame.document.getElementById(mySignatureId)){
      
        var yourHijackedSignature = '';
        yourHijackedSignature += ' - Adam Kahtava [<a href="http://adam.kahtava.com">http://adam.kahtava.com</a>]';

        replyFrame.document.body.innerHTML += '<div class="ForumPostSignature" id="' + mySignatureId + '">' + yourHijackedSignature + '</div>';
        
      }
    }
  }
  catch (ex) {}

}, true);