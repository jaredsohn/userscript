// ==UserScript==
// @name           deviantART - Preview Comment Signature
// @namespace      http://davidjcobb.deviantart.com/
// @description    Allows you to preview your Comment Signature while editing it.
// @include        http://my.deviantart.com/settings/identity
// ==/UserScript==

window.TA=null;
window.BT=null;
window.PD=null;

$=function(){return document.getElementById.apply(document,arguments)};
mE=function(html){a=document.createElement("div");a.innerHTML=html;return a.firstChild};

window.prevOff=
function(){
   var PD=window.PD;
   window.TA.style.display="inline";
   PD.style.display="none";
   PD.innerHTML="";
   window.BT.value="Preview";
};

window.prevOn=
function(s,d){
   var PD=window.PD;
   window.TA.style.display="none";
   PD.style.display="";
   PD.innerHTML="<strong>Preview:</strong><br/>Lorem ipsum blah blah blah... Lorem ipsum blah blah blah... Lorem ipsum blah blah blah..<a href='http://davidjcobb.deviantart.com/'>.</a><br /><br />--<br />\n"+d.response.content.substring(0,d.response.content.indexOf("<br /><br />--<br />\n"));
   window.BT.value="Edit";
};

window.difi=
function(t){
   unsafeWindow.DiFi.pushPost("Comments","preview",[t,0],window.prevOn);
   unsafeWindow.DiFi.send();
};

window.click=
function(){
   var BT=window.BT;
   if(BT.value=="Preview") {
      window.difi(window.TA.value);
      BT.value="Loading...";
   }else{
      window.prevOff();
   }
};

(function(){
   var TA=window.TA=$("signature_id");
   var BT=window.BT=mE('<input type="button" value="Preview" style="width:'+TA.offsetWidth+'px;margin-bottom:6px">');
   TA.parentNode.insertBefore(BT,TA.nextSibling);
   BT.addEventListener("click",window.click,!0);
   var PD=window.PD=mE('<div style="display:none;overflow:hidden;background:#F0FBF8;padding:0 4px;font-size:9pt;margin:0"></div>');
   PD.style.width=window.getComputedStyle(TA,"").getPropertyValue("width");
   PD.style.height=window.getComputedStyle(TA,"").getPropertyValue("height");
   TA.parentNode.insertBefore(PD,TA.nextSibling);
})();