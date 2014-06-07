// ==UserScript==
// @name           BTJunkie2AzureusWeb
// @namespace      http://userscripts.org/people/35269
// @include        http://btjunkie.org/search?*
// ==/UserScript==


  var AzureusHtmlWebUIHostName = "localhost";
  var AzureusHtmlWebUIPort = "6886";

  var elements=document.getElementsByTagName('th'); 
  //GM_log("test"+elements[50].href+" - "+elements[52].href);
  var i=0;
  while (elements[i]){
	if (elements[i].className.match('label')) {
		//GM_log("i:"+i+" - href:"+elements[i].href);
		var theTH = elements[i];
		var theLink = theTH.childNodes[0].href;
		var theTarget = "http://"+AzureusHtmlWebUIHostName+":"+AzureusHtmlWebUIPort+"/index.tmpl?d=u&upurl=";
		var newButton=document.createElement('span');

		theTarget = theTarget + encodeURI(theLink);
		newButton.innerHTML='<a href="'+theTarget+'" border="0"><img src="/images/down.gif" border="0"/>AW</a>';

		theTH.appendChild(newButton);
		
	}
	i++; 
	
  }
