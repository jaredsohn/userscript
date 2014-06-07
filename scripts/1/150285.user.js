// ==UserScript==
// @name        lavabo ok
// @namespace   http://dev.webnaute.net
// @include     http://www.royaumedulavabo.com/
// @include     http://www.royaumedulavabo.com/*
// @version     1
// ==/UserScript==
//
unsafeWindow.SendXMLHttpRequest = function SendXMLHttpRequest(Method, Url, Message, CallBack, Obj){
setTimeout (function() {
  var xhr_object = null;
  var URLParam;
  var data;
//  if (xhr_object.overrideMimeType) xhr_object.overrideMimeType('text/html; charset=iso-8859-1');
  if (Method=="GET") { URLParam="?"+Message; data = ""; }
  else { URLParam=""; data = Message; }
  GM_xmlhttpRequest ({
        method: Method,
        url: Url+URLParam,
        data: data,
        overrideMimeType: 'text/html; charset=iso-8859-1',
        headers: (Method == "GET") ? undefined : {
            "Content-type": "application/x-www-form-urlencoded;charset=iso-8859-1",
            "Content-length": Message.length },
        onload: function(response){
    if(response.readyState == 4) {
      if (data.match(/&a=1&/)) {
        response.responseText = response.responseText.replace (/[^:]\/\/.*/g, "");
        response.responseText = response.responseText.replace (/\n|\r/g, "");
        document.getElementById("DivText").innerHTML = response.responseText.replace (/</g,"&lt;");
      }
      if(CallBack!=undefined) {
          if(Obj==undefined) CallBack(response.responseText);
          else Obj[CallBack](response.responseText);
      }
    }
  }
  })
  return(true);
}, 0);
return true;
}


unsafeWindow.Start();
