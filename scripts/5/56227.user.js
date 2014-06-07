// ==UserScript==
// @name           UserScript Install On Fly.
// @namespace      xpsdeset
// @include        http://userscripts.org/scripts*
// @include        http://userscripts.org/
// ==/UserScript==




				

				x=document.getElementsByClassName("la")[0];
				var dld=document.createElement("th");
					dld.innerHTML="Install";
					dld.setAttribute('class', 'la'); 
					x.parentNode.insertBefore( dld ,x.nextSibling);
					

					


for(i=0;i<document.getElementsByClassName("script-meat").length;i++)

{				

				x=document.getElementsByClassName("script-meat")[i];
				var dld=document.createElement("td");
					dld.innerHTML="<a class=\"userjs\" href=\""+x.getElementsByTagName("a")[0].href.replace("show","source")+".user.js\"><img src='/images/script_icon.png'></a>";
					x.parentNode.insertBefore( dld ,x.nextSibling);
					

					}
					
					
					
	//				
					

					