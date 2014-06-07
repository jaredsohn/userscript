// ==UserScript==
// @name           dA Messages
// @description    Displays your deviantART Messages.
// @namespace      http://www.paramour.net78.net/
// @include        *
// @exclude        http://*deviantart.com*
// ==/UserScript==

scriptVER = ".14";
css="position:fixed;opacity:0.78;filter:alpha(opacity=78);bottom:0px;text-transform: lowercase;font-size:13px;width:100%;text-align:center;font-weight:bold;padding-bottom:2px;font-family:Tahoma";
head = document.getElementsByTagName('head')[0];
body = document.getElementsByTagName('body')[0];
html = document.getElementsByTagName('html')[0];
try {
 GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://deviantart.com/',
  onload: function(responseDetails) {
   var messageC=new RegExp("<span id=\"rockdock-message-count\">(.*)</span>");
   var logIN=new RegExp("<form action=\"http://www.deviantart.com/users/login\" method=\"post\">");
   //alert(messageC.exec(responseDetails.responseText)[1]);
   if(messageC.test(responseDetails.responseText)==true) {
    children = document.createElement("div");
    children.setAttribute("style", css);
    children.innerHTML=messageC.exec(responseDetails.responseText)[1];
    html.appendChild(children);
    GM_log("Posting Message Center Results");
    delete messageC;
    delete responseDetails.responseText;
   } else if(logIN.test(responseDetails.responseText)==true) {
    GM_log("Not logged in.");
   } else {
    GM_log("Undefined Error!");
   }
  }
 });
} catch(e) {
 GM_log(e.description);
}