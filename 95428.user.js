// ==UserScript==
// @name tou.tv Extra
// @description Remove ads from Tou.tv shows
// @namespace http://www.tou.tv/geasemonkey
// @match http://*.tou.tv/*
// @match http://www.tou.tv/*
// @version        0.4
// Tested on Chrome only
// ==/UserScript==
 
function removeAll() {

	for (var ems = unsafeWindow.document.getElementsByTagName("embed"), i = 0, em; em = ems[i]; i++) {
		em.setAttribute('wmode', 'window'); //change every flash to window mode to help performance
		var nx = em.nextSibling, pn = em.parentNode;
		pn.removeChild(em);
		
		if(em.id != "commanditairewidget"){
			if(em.id == "playerwidget"){
				var oldEmbed = " " + em.outerHTML;
				var fvRegExp = new RegExp('flashvars="([^"]*)"', "i");
				var fvMatches = fvRegExp.exec(oldEmbed);
				var flashvars = "";
				if(fvMatches != null){
					flashvars = "" + unescape(fvMatches[1].toString());
					
					flashvars = flashvars.replace(/amp;/gi, "");
					
					//Keeping those as backup if ever needed
					//flashvars = flashvars.replace(/pos=...\;/gi, "pos=NoWhereToBeFound;");
					//flashvars = flashvars.replace(/&pluginSmil.*\&disa/gi, "&disa");
					
					//remove ads
					flashvars = flashvars.replace(/plugin.*\&disa/gi, "disa");
					
					//Change skin to cinematic (uncomment)
					//flashvars = flashvars.replace("http://static.tou.tv/lib/v1/swf/skinTOU.swf", "http://static.tou.tv/lib/ThePlatform/4.2/swf/skinCinematic.swf");
					
					//console.log(flashvars); //debug only
				} else {
					console.log("No match");
				}
				swfNode = '<embed type="application/x-shockwave-flash" src="'+ em.src.toString() +'" width="'+ em.width +'" height="'+ em.height +'" style="'+ em.style.toString() +'"';
				swfNode += ' id="'+ em.id +'" name="'+ em.id +'" ';
				swfNode += ' wmode="window" allowScriptAccess="always" allowFullScreen="true" bgcolor="#000000" ';
				swfNode += "flashvars='"+flashvars+"'";
				swfNode += '/>';
				
				pn.innerHTML = swfNode;
			} else {
				pn.insertBefore(em, nx);
			}
			
		}
	}
}
removeAll(); 