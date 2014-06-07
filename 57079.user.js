// ==UserScript==
// @name           ccIt - Travian
// @namespace      dlogan
// @version        0.10
// @description    Send IGM's in Travian to more than one recipient at at time using a ";" to separate the names
// @include        http://s8.travian.us/nachrichten.php*
// ==/UserScript==

  function ccIt(e){
    var logLevel = 0;
    var frmIGM = document.forms[0];
    
    if(document.getElementById('receiver')){
      document.getElementById('receiver').maxLength=500;
    }
    frmIGM.addEventListener('submit', sendIGMs, false);  
    
  	function log(level, text) {
      if (logLevel >= level)
        GM_log(text);
    }

    function sendIGMs(frm){
      var iReceiver = document.getElementById('receiver');
      
      if(iReceiver.value.indexOf(";") != -1){
        var arrRecipients = iReceiver.value.split(";");
        log(1, "sendIGMs - Recipients:" + arrRecipients);
        var strSub = document.getElementById('subject').value;
        log(2, "sendIGMs - strSub:" + strSub);
        var strMsg = document.getElementById('igm').value;
        log(2, "sendIGMs - strMsg:" + strMsg);
        
        for (i=0;i< arrRecipients.length - 1;i++){
          var strTo = arrRecipients[i];
          sendAjaxMessage(strTo, strSub, strMsg);
          pause();
        }
               
        var strTo = arrRecipients[arrRecipients.length - 1];
        log(2, "sendIGMs - Final User:" + arrRecipients[arrRecipients.length - 1]);
        
        iReceiver.value = strTo;
        pause();
        
        return false;
      } else {
        return true;
      }
    }
    
    function pause(){
      var millis = Math.floor(Math.random()*80) + 50;
      var date = new Date();
      var curDate = null;
     do { curDate = new Date(); } while(curDate-date < millis);
    } 
    
    function sendAjaxMessage(strTo, strSubject, strMessage){
      var strX = Math.floor(Math.random()*95) + 1
      var strY = Math.floor(Math.random()*18) + 1
      log(2, "sendAjaxMessage - strTo:" + strTo);
      log(2, "sendAjaxMessage - strSubject:" + strSubject);
      log(2, "sendAjaxMessage - strMessage:" + strMessage);
      log(3, "sendAjaxMessage - strX:" + strX);
      log(3, "sendAjaxMessage - strY:" + strY);
      
      GM_xmlhttpRequest({     
          method: 'POST',     
          url: 'http://' + window.location.host + '/nachrichten.php',     
          headers: {'User-Agent': 'Mozilla/5.0',
                    'Referer': 'http://' + window.location.host + '/nachrichten.php?t=1',
                    'Content-type': 'application/x-www-form-urlencoded'}, 
          data:  "c=906&an=" + strTo + "&be=" + strSubject + "&message=" + strMessage + "&t=2&s1.x=" + strX + "&s1.y=" + strY,
          onload: function(responseDetails) {} 
      });
    }

  }
  
if(window.addEventListener){
  window.addEventListener('load', ccIt, false);
} else {
  window.attachEvent('onload', ccIt);
}