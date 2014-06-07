// ==UserScript==
// @name           [dA] Deviant's personal info
// @namespace      lucideer.com
// @description    Insert a Deviant's personal info on each of their Deviation pages
// @include        http://*.deviantart.com*
// @exclude        http://www.deviantart.com*
// @version        1
// @license        Public Domain
// ==/UserScript==

(function(){

var deviantInfo=document.createElement('div');
deviantInfo.setAttribute('id','UJS_deviantinfo');
var deviationBody=document.getElementById('deviation').firstChild;
deviationBody.insertBefore(deviantInfo,document.getElementById('deviation-tools'));
if(window.ActiveXObject){
  var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
  }
else if(window.XMLHttpRequest){
  var httpRequest=new XMLHttpRequest();
  }
httpRequest.open("GET",'http://'+document.domain+'/',true);
httpRequest.onreadystatechange=function(){
  if(httpRequest.readyState==4){
    if(httpRequest.status==200){
      var requestParts=httpRequest.responseText.split('<div id="deviant-info">');
      var personal=requestParts[1].split('<div class="lesport">')[0];
      deviantInfo.innerHTML=personal;
      }
    else{
      window.console=window.console||{log:GM_log}||{log:opera.postError}||{log:alert};
      console.log("Error loading Deviant personal info\n"+httpRequest.status+":"+httpRequest.statusText);
      }
    }
  };
httpRequest.send(null);
})();
