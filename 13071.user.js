// ==UserScript==
// @name           Mininova2AzureusWeb
// @namespace      http://userscripts.org/people/35269
// @include        http://www.mininova.org/*
// @description	  Script adds another download link on mininova to send the request to Azureus HTML Web UI server running on the machine.
// @date          2006-10-17
// @version       0.1
// @GM_version    0.6.4
// ==/UserScript==

  var AzureusHtmlWebUIHostName = "localhost";
  var AzureusHtmlWebUIPort = "6886";

  var elements=document.getElementsByTagName('a'); 
  //GM_log("test"+elements[50].href+" - "+elements[52].href);
  var i=0;
  while (elements[i]){
	if (elements[i].className.match('dl')) {
		//GM_log("i:"+i+" - href:"+elements[i].href);
		var theTD = elements[i].parentNode;
		var newButton=document.createElement('span');
		
		var theTarget = "http://"+AzureusHtmlWebUIHostName+":"+AzureusHtmlWebUIPort+"/index.tmpl?d=u&upurl=";
		theTarget = theTarget + encodeURI(elements[i].href);
		newButton.innerHTML='<a href="'+theTarget+'"><img src="/images/down.gif"/>AW</a>';
		//theTD.insertBefore(newButton,elements[i]);
		theTD.appendChild(newButton);
	}
	i++; 
	
  }
