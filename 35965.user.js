// ==UserScript==
// @name           Watchlist with Forum Modification
// @namespace      lucideer.com
// @description    Puts your watchlist on every page.
// @include        http://*.roosterteeth.com*
// @include        http://*.roosterteeth.com/forum/*
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
			
			
			var watchlisttest=/You have no new alerts\./i;
			var watchLength=watchlisttest.test(watchlist.innerHTML);

			if(watchLength != false)
			{
				watchlist.innerHTML="<b>Your watchlist is blank.</b>";
					//getElementByClass('spacer', watchlist);
			}
			
			if(document.URL.search(/\/forum\//) != -1)
			{
                
				var Forum = document.getElementById("Forum");
				var trs = Forum.getElementsByTagName("tr");
               
				if(watchlist.innerHTML != "<b>Your watchlist is blank.</b>")
                {
    				try
    				{
                       
    					var insidethedivs;
    					//var tr2 = watchlist.getElementsByTagName("td");
    					var tr2 = watchlist.getElementsByTagName("table");
                      
    					//alert(tr2.length);
    					var innerdivs = watchlist.getElementsByTagName('div');
                 
    					var dividernum;
    					//alert(watchlist.firstChild.firstChild.childNodes[1].firstChild);
    					for(i=1;i<innerdivs.length;i++)
    					{
    						if(innerdivs[i].className == "divider")
    						{
    							dividernum=i;
                            
    						}
    						
    						if(innerdivs[i].className != "divider")
    						{
    							innerdivs[i].style.width = "237px";
    							innerdivs[i].style.padding = "8px 0pt";
    							innerdivs[i].style.float = "left";
    							insidethedivs = innerdivs[i].getElementsByTagName("*");
                        
    						}
    					}
    					
    					trs[4].innerHTML = "<td style='border-top: 1px solid rgb(221, 221, 221); padding-top: 3px;' colspan='2'><table>" + tr2[0].innerHTML + "</table></td>";
    					
    				}
    				catch(err)
    				{
            
    					var tbodyneeded = Forum.getElementsByTagName("tbody");
    					var newtr = document.createElement("tr");
    					tbodyneeded[1].insertBefore(newtr, tbodyneeded[1].firstChild.nextSibling);
    					trs[4].innerHTML = "<td style='border-top: 1px solid rgb(221, 221, 221); padding-top: 3px;' colspan='2'><table>" + tr2[0].innerHTML + "</table></td>";
    					//console.log("WTF MATE");
    					var tables = Forum.getElementsByTagName("table");
    					//alert(trs[4].innerHTML);
    				}
                }
            
			}
			else
			{
				watchlist.setAttribute('align', 'center');
				document.getElementById('pageContent').insertBefore(watchlist,document.getElementById('pageContent').firstChild);
			}
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