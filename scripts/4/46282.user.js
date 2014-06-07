// ==UserScript==
// @name    Facebook Metropolis auto-ent
// @namespace   metropolis
// @description   metropolis
// @include   http://apps.facebook.com/metropolisgame/*
// @include   http://www.facebook.com/login.php
// @version 0.1.0
// ==/UserScript==

(function()
{


	var i=0;
	var metropolisHome="http://apps.facebook.com/metropolisgame";
	var metropolisRequests="http://apps.facebook.com/metropolisgame/requests.php";

	if (location.href.indexOf("requests.php")>0)
	{
		Array.forEach(document.links, function(link) {

			if (link.href.indexOf("players.php")>0)
			{
				location.replace(link.href);
			}
		});
	}
	else if (location.href.indexOf("players.php")>0)
	{
		var id=getURLParam("id");
		GM_log("id is "+location.href);	
		try
		{		
			unsafeWindow.a38075929120_entertain(id);
		}
		catch (e)
		{
			//alert("already entertained.");
		}
		location.replace(metropolisRequests);
	}
	if (location.href.indexOf("facebook.com/login.php")>0)
	{
		var next=getURLParam("next");
		if (next.indexOf("metropol")>0)
		{
	//		document.getElementById ("email").value = username;
	//		document.getElementById("pass").value=password;
		}
	}



function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (
aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
} 

})();
