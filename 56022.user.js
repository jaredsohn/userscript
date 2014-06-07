// ==UserScript==
// @name           Deviantart Power Browsing
// @namespace      xpsdeset
// @include        http://browse.deviantart.com/*
// ==/UserScript==


xclass='sleekadbubble section squareBrowsead ch';
e=document.getElementsByClassName(xclass)[0];if(e){e.parentNode.removeChild(e);};
for(i=0;i<document.getElementsByClassName("t").length;i++)

{				

				x=document.getElementsByClassName("t")[i];
				var dld=document.createElement("a");
					dld.innerHTML="[D]";
					dld.href="http://www.deviantart.com/download/"+x.href.split(/-/)[x.href.split(/-/).length-1]+"/";
					x.parentNode.insertBefore( dld ,x.nextSibling);

					}
					
					
					
