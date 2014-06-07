// ==UserScript==
// @name          Favstrd
// @namespace     
// @description   Favstar: Now with 100% less webcock.
// @include       http://favstar.fm/*
// ==/UserScript==

(function() {
	var Config = {
		sURL : 'https://dl.dropbox.com/u/107916/eff/screen.css'
	}
	var oHead = document.getElementsByTagName("head")[0],
		oCss = document.createElement("style");

	oCss.innerHTML = "@import url('" + Config.sURL + "');";
	oHead.appendChild(oCss);

	// Striking the homage-y bits because of http://twitter.com/beep/status/6448513036.
	/*
	var oLogo = document.getElementById("logo"),
		oH2 = document.createElement("p");

	oH2.innerHTML = 'Dedicated to <a href="http://twitter.com/textism">@textism</a>, enstyléd by&nbsp;<a href="http://twitter.com/beep">@beep</a>.';
	oLogo.appendChild(oH2);
	*/

	/*
		Following bit sadly/shamelessly ripped from @secretsquirrel's excellent Favstar userscript:
		http://userscripts.org/scripts/show/63607

		Much credit to him for the awesomeness.
	*/
	onload = function() {
		if (document.getElementsByClassName == undefined) {
			document.getElementsByClassName = function(className) {
				var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
				var allElements = document.getElementsByTagName("*");
				var results = [];

				var element;
				for (var i = 0; (element = allElements[i]) != null; i++) {
					var elementClass = element.className;
					if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
						results.push(element);
				}

				return results;
			}
		}
	}

	function click(e, type) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) {return;}
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	}

	var elements = document.getElementsByClassName('otherCount');
	var element;
	for (var i = 0; (element = elements[i]) != null; i++) {
		click(element, 'click');
	}

	var viewElements = document.getElementsByClassName('viewAll');
	var viewElement;
	for (var i = 0; (viewElement = viewElements[i]) != null; i++) {
		click(viewElement, 'click');
	}

	var cDivs = document.getElementsByTagName("div"),
		iMax = cDivs.length;

	for (var i = 0; i < iMax; i++) {
		if (cDivs[i].className == "tweetWithStats") {
			var cA = cDivs[i].getElementsByTagName("a"),
				iA = cA.length;

			for (var j = 0; j < iA; j++) {
				var oA = cA[j],
					sHref = oA.getAttribute("href");

				oA.removeAttribute("target");

				if (sHref) {
					aHref = sHref.split("users");
					if (aHref.length > 1) {
						oA.setAttribute("href", "http://twitter.com" + aHref[1]);
					}
				}
			}
		}
	}

	// An excellent little Script updater by Jarrett - http://userscripts.org/scripts/show/20145
	var SUC_script_num = 63634; // Change this to the number given to the script by userscripts.org (check the address bar)
	try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
})();