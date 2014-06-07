// ==UserScript==
// @name           REV3 Xvid-streams
// @namespace      zmarn
// @description    Places a DivX-Web-Player instead of a Flash-Player on the Revision3 episode-sites
// @include        *revision3.com/*
// ==/UserScript==
function getElementsByTitle (title) {
	var all = document.all ? document.all : document.getElementsByTagName('*');
	var elements = new Array();
	for (var e = 0; e < all.length; e++)
		if (all[e].title == title)
			elements[elements.length] = all[e];
	return elements;
}
var flash = document.getElementsByTagName('embed')[0];
/*
var preimg = document.getElementsByTagName('embed')[0].src;
preimg = preimg.split('Thumb=');
preimg = preimg[1].split('.jpg');
preimg = preimg[0] + ".jpg";*/
var i; 
if (flash) {
		//var qua = document.getElementsByName("quality")[0].value;
		var A = getElementsByTitle('Download');
		for(i=0;i<A.length;i++)
				{				
				/*	if (A[i].innerHTML  == "Small Xvid" && qua != "low") {
														var xvid = getElementsByTitle("Download")[i].href;
							}	
							else
								{ */
					if (A[i].innerHTML == "Large Xvid" /*&& qua == "high" */ ) {
									var xvid = getElementsByTitle("Download")[i].href;
								}	
					else
						{
						}
						
			//	}
			}
		var xvids = document.createElement("div");
		xvids.innerHTML = '<object classid="clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616" width="555" height="333" codebase="http://go.divx.com/plugin/DivXBrowserPlugin.cab">' +
' <param name="custommode" value="none" />' +
 ' <param name="autoPlay" value="false" />'+
  '<param name="src" value="' + xvid + '" />' +
'<embed type="video/divx" src="' + xvid + '" custommode="none" width="555" height="333" autoPlay="false"  pluginspage="http://go.divx.com/plugin/download/">'+
'</embed>'+
'</object> ';
   flash.parentNode.replaceChild(xvids, flash);
   xvids.style.marginBottom = "-5px";
}