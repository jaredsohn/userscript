// ==UserScript==
// @name           Always Show Watchlist on RoosterTeeth
// @namespace      lucideer.com
// @description    Always Show Watchlist on RoosterTeeth
// @include        http://*.roosterteeth.com*
// @exclude 	http://*.roosterteeth.com/forum/*
// @exclude 	http://*.roosterteeth.com/members/
// @exclude 	http://*.roosterteeth.com/members/index.php*
// @exclude	http://*.roosterteeth.com/members/signin.php*
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
    if(httpRequest.status==200)
		{	
				var watchlist =document.createElement('div');
				
				var requestParts=httpRequest.responseText.split("</td></tr></table></td></tr></table>");
				//alert(requestParts.parent.innerHTML);
				//var watchlistParts=requestParts[1].split("<tr><td height='16' /></tr>");
				var requestholder = requestParts[1].split("</td></tr></table></div>");

				requestholder[0] += "</td></tr></table></div>";
				watchlist.innerHTML = requestholder[0];
				//watchlist = httpRequest.responseText.getElementById('Watching');
			
			watchlist.setAttribute('align', 'center');
			var watchlisttest=/You have no new alerts\./i;
			var watchLength=watchlisttest.test(watchlist.innerHTML);

			if(watchLength != false)
			{
				watchlist.innerHTML="<b>Your watchlist is blank.</b>";
					//getElementByClass('spacer', watchlist);
			}
			if(watchlist.firstChild.firstChild.childNodes[1].childNodes.length > 1)
			{
				watchlist.firstChild.firstChild.childNodes[1].removeChild(watchlist.firstChild.firstChild.childNodes[1].firstChild);
				watchlist.firstChild.firstChild.childNodes[1].removeChild(watchlist.firstChild.firstChild.childNodes[1].firstChild);
			}
document.getElementById('pageContent').insertBefore(watchlist,document.getElementById('pageContent').firstChild);
			
		}
		else
		{
			window.console=window.console||{log:opera.postError}||{log:alert};
			console.log("Error loading watchlist page\n"+ httpRequest.status +":"+ httpRequest.statusText);
	    }
    }
  };
httpRequest.send(null);
})();

var allHTMLTags = new Array();

function getElementByClass(theClass, watchlist) 
{
	//Create Array of All HTML Tags
	var allHTMLTags=document.getElementsByTagName("*");

	//Loop through all tags using a for loop
	for (i=0; i<allHTMLTags.length; i++) 
	{
		//Get all tags with the specified class name.
		if (allHTMLTags[i].className==theClass) 
		{
			var holder = allHTMLTags[i].innerHTML;
			allHTMLTags[i].innerHTML = watchlist.innerHTML + "<br \>" + holder;
		}
	}
}