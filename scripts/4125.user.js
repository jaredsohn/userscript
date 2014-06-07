/*
    This nifty script will automatically reload a webpage.

    Eric Lammertsma
*/

// ==UserScript==
// @name            Server not found? Try and try again!
// @description     (2006-04-17)
// @include         *
// ==/UserScript==

(function () {
  if(document.documentURI.substr(0,14)=="about:neterror")
  {
    var text1 = "If at first you don't succeed, Try and...";
    var text2 = "Try again!";
    var text3 = "Canceled.";
    var error_div = document.getElementById("errorLongDesc");
    var error_btn = document.getElementById("errorTryAgain");
    if (error_div && error_btn)
    {
      var head = document.getElementsByTagName("head")[0];
      script = document.createElement("script");
      script.type = "application/x-javascript";
      script.innerHTML = "var count=6;\nvar countdown=\"\";var auto_retry=true;\nsetTimeout(autoRetryThis, 1000);\nfunction autoRetryThis() {\nif (!auto_retry) {\ndocument.getElementById(\"errorAutoRetry3\").innerHTML = \""+text3+"\";\nreturn\n}\nif (count>0) {\ncount--;\nif (count>0) countdown += \" \"+count+\"..\"\nsetTimeout(autoRetryThis, 1000);\n}\ndocument.getElementById(\"errorAutoRetry2\").innerHTML = countdown;\nif (count <= 0){\ndocument.getElementById(\"errorAutoRetry3\").innerHTML = \""+text2+"\";\nretryThis();\n}\n}";
      head.appendChild(script)
      error_div.innerHTML += "<p><div id=\"errorAutoRetry1\">"+text1+"</div><div id=\"errorAutoRetry2\" style=\"font-size:80%;color:ThreeDShadow;\"><br /></div><div id=\"errorAutoRetry3\"><br /></div></p>";
      error_btn.style.marginTop = "0px";
      error_btn.style.marginBottom = "5px";
      
      // This *should* work, but it doesn't
      /*
      cancel_btn = document.createElement("xul:button");
      cancel_btn.setAttribute("xmlns:xul", "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
      cancel_btn.setAttribute("id", "errorStopRetry");
      cancel_btn.setAttribute("oncommand", "auto_retry=false; autoRetryThis();");
      cancel_btn.setAttribute("label", "Stop Trying");
      cancel_btn.setAttribute("style", "margin-top: 0px; color: -moz-FieldText; height:25px; width:100px;");
      */

      // So normal HTML instead:
      cancel_btn = document.createElement("button");
      cancel_btn.setAttribute("id", "errorStopRetry");
      cancel_btn.setAttribute("onclick", "auto_retry=false; this.style.visibility=\"hidden\"; autoRetryThis();");
      cancel_btn.setAttribute("style", "margin-top: 5px; font: message-box; padding:0px 8px 3px 8px; color: -moz-FieldText; height:25px;");
      cancel_btn.innerHTML = "Stop Trying";
      error_btn.parentNode.appendChild(cancel_btn, error_btn);
    }
  }

})();
