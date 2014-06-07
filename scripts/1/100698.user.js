// ==UserScript==
// @author         Jatin Jain
// @name           cleanUpOrg
// @namespace      cleanUpOrg
// @include        https://*.salesforce.com/*
//				  
// ==/UserScript==
var div=document.getElementsByClassName("pbHeader")[0];
if(div!=null)
{
	var button=document.createElement("input");
	button.type="button";
	button.value="Clean Org";
	button.addEventListener('click', initClick, false );
	div.appendChild(button);
}

function initClick(){
                var links = document.getElementsByTagName("a");
                var i=0;
				var linkEle;
				var xhttp=new XMLHttpRequest();
                for(i=0;i<links.length;i++)
                {
					linkEle = links[i];
                    if(linkEle.innerHTML=="Erase" || linkEle.innerHTML=="Del")
                    {
						xhttp.open("GET",linkEle.href,false);
						xhttp.send("");
						linkEle.innerHTML = "Deleted";
                    }
                }
}