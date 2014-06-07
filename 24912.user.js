// ==UserScript==
// @name           REV3 WMV-streams
// @namespace      zmarn
// @description    Places a Silverlight WMV-Player instead of a Flash-Player on the Revision3 episode-sites
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


var flash = document.getElementById('rev3_player');
var preimg = document.getElementById('rev3_player').src;
preimg = preimg.split('Thumb=');
preimg = preimg[1].split('.jpg');
preimg = preimg[0] + ".jpg";
var i;
if (flash) {
		//var qua = document.getElementsByName("quality")[0].value;
		var A = getElementsByTitle('Download');
		for(i=0;i<A.length;i++)
				{				
				/*	if (A[i].innerHTML  == "Small WMV" && qua != "low") {
														var wmv = getElementsByTitle("Download")[i].href;
							}	
							else
								{*/
					if (A[i].innerHTML == "Large WMV" /* && qua == "high" */ ) {
									var wmv = getElementsByTitle("Download")[i].href;
								}	
					else
						{
						}
						
				//}
			}
    var w = 555;
    var h = 337;
		var wmvs = document.createElement("div");
		wmvs.innerHTML = '<iframe style="border-style: none; border-width: 0pt; margin-bottom:-5px;" src="http://zmarn.zm.ohost.de/lab/sp/gr.php?wmv=' + wmv + '&img=' + preimg + '&h=' + h + '&w=' + w + '" name="schnabeldabel" height="' + h + '" scrolling="no" width=" ' + w + ' ">' +
		'</iframe>';
    flash.parentNode.replaceChild(wmvs, flash);
}