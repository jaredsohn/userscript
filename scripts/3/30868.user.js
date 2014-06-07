// ==UserScript==
// @name           Always Show Watchlist on RoosterTeeth
// @namespace      lucideer.com
// @description    Always Show Watchlist on RoosterTeeth
// @include        http://*.roosterteeth.com*
// @version        1
// @license        Public Domain
// ==/UserScript==

(function(){
if(window.ActiveXObject){
  var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
}
else if(window.XMLHttpRequest){
  var httpRequest=new XMLHttpRequest();
}
httpRequest.open("GET",'http://'+document.domain+'/members/index.php', true); 
httpRequest.onreadystatechange=function(){
  if(httpRequest.readyState==4){
    if(httpRequest.status==200){
      var requestParts=httpRequest.responseText.split("<td class='content'>");
      var watchlistParts=requestParts[1].split("<tr><td height='16' /></tr>");
      var watchlist=document.createElement('div');
      watchlist.innerHTML=watchlistParts[0];
      document.getElementById('pageContent').insertBefore(watchlist,document.getElementById('pageContent').firstChild);
      }
    else{
      window.console=window.console||{log:GM_log}||{log:opera.postError}||{log:alert};
      console.log("Error loading watchlist page\n"+ httpRequest.status +":"+ httpRequest.statusText);
      }
    }
  };
httpRequest.send(null);
})();