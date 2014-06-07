// ==UserScript==
// @name           RvB Alerts Popup RTStyle
// @namespace      KWierso
// @description    Full RvB Alert list, embedded into each RT page. For use in getting the URLs out of journal/image comments.
// @include        http://*.roosterteeth.com*
// @exclude        http://*.roosterteeth.com/members/signin.php*
// @exclude        http://*.roosterteeth.com/members/index.php*
// @exclude        http://*.roosterteeth.com/members/

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
	
		var requestParts=httpRequest.responseText.split("<td id='myAlertHolder'>");
	
		var alertlistParts=requestParts[1].split("</td>");
		var alertlist=document.createElement('div');
		alertlist.innerHTML=alertlistParts[0];
	document.body.appendChild(alertlist);
		document.getElementById('pageContent').insertBefore(alertlist,document.getElementById('pageContent').firstChild);
		}
	else{
	window.console=window.console||{log:opera.postError}||{log:alert};
	console.log("Error loading watchlist page\n"+ httpRequest.status +":"+ httpRequest.statusText);
      }
    }
  };
httpRequest.send(null);
})();