// ==UserScript==
// @name        digg - add mirrors
// @namespace   http://jordi.degroof.googlepages.com/
// @description Adds links to rorr.im (http://rorr.im/), Coral Cache (http://www.coralcdn.org/), DuggBack (http://www.duggback.com/) and Archive.org wayback machine (http://web.archive.org) to every story on digg
// @source       http://userscripts.org/scripts/show/7585
// @identifier http://userscripts.org/scripts/review/7585?format=txt
// @version     1.7
// @date        2009-03-31
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// @include     *#digg_link=*
// ==/UserScript==

// Version History
// 1.7 -- Replaced ouggMirror with rorr.im
// 1.6..6 -- speed improvement
// 1.6.5 -- opera fixes: apparrently Opera doesn't like firebug's console object, nor GM_xmlhttprequest
// 1.6.4 -- no injection on compact widgets
//	aesthetic update: mirrors are displayed centered
//	update to make it work with ADC v0.9
// 1.6.3.1 -- fixed an error in autoupdate
// 1.6.3 -- update autoupdate to work with new userscripts.org layout
// 1.6.2 -- improved ADC compability
//	Now works correctly with digg's new comment system (thanks to jackyyll)
// 1.6.1 -- changed coral to use port 8080, instead of the deprecated 8090
//	Improved availability check
// 1.6 -- added automatic availability check of stories
//	Wayback now redirects automatically to most recent page
//	Replaced Google cache by DuggBack
// 1.5.3  -- fixed update code again, hope it works properly now
// 1.5.2 -- fixed update code
// 1.5.1 -- forgot to include reference to *#digg_link=*, so the mirrors are added with ADC, but invisible because the frame is to small
// 1.5 -- added support for Add Digg Control


if(!GM_xmlhttpRequest)
{
  // Dummy GM_xmlhttpRequest to keep opera happy
  function GM_xmlhttpRequest(details) {
  return false;
  }
}

function addGlobalStyle(css)
{
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
}

function addStyle()
{
//console.time("digg - add mirrors - addstyle");
	var rorrimicon		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABGdBTUEAALGPC/xhBQAAAMNJREFUKFONkD0OwjAMhcspGBhQz8I14Eqg0g50RZSRhYWBHgBGEEsHoGKhEhISA1v8cH5JSwcsWYmVz88v7oAj+DckbIP4Qrs7KD2Bjg/I2o/AgcUT6C14zJQz5oyAcAm6vhyvYKXYnRtoxqfNGNTP3AQFi/ymlRSUeinrCOKi1TU8OXiqTTiGWJ09eF8Zr23KCYTx/fUcZp4V63kMMcrrH1Sf5G4arI0duY0ENNyCqvcv7FZYctOmrEH2ze25sf/W8gOGoHiapQHj7gAAAABJRU5ErkJggg==";
	var coralcacheicon	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAEZ0FNQQAAsY58%2B1GTAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAC4SURBVHjajJAxCsJAEEX%2FBg9gYyEodilT7AHEC8TCItVcIidwT2BvnzqFOUByghRpAilsNmBhoZ7gWxjNGkT98BkGHm9gFEmYwjRZk03KUzmGEz3V19APz2ZlfCWp2KRKZvgSCaRVMCD%2BiCeBtL8gCaQFyZjcNiTodndbUu%2F1RVKxJGOQzIdQX%2BYPERcfwWMUsQBYAKylN76ddiEXBslRp8%2BfrUXs0KjI13e8bs4BbACsu%2F0AIL0PALvCrkT4yHQjAAAAAElFTkSuQmCC";
	var waybackicon		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAvSURBVHjaYlipZfAfCBiQaQYGBgzMxIADADUxItM4FaKDEaxwlbbhf2QaGwAIMACO7RsUdiuurwAAAABJRU5ErkJggg==";
	var duggbackicon	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABPUlEQVR42j2PsU7CYBgA7//5i61NpUaUgg4OMrRGSePiI7CYuPkUjhDewsTVTRMd7dDd3ZDUxaExxsmEoAJOBpB+Dkanu/FOXRsj3yKgFPwRfh1QSmEg0d8iOM0mWycnUK0yA2bAchhSPz6m8DzmIhiUYi2O2T09pVyr8Xh+jlOpsN/pYAcBb3nObDLBiAivd3eU63WqcYwXhgStFgvg4eKC0fMzXqmEujRGZiIstGYlitg+OmI6GpEnCdPBAEdrbEj0X7DjeWyEIV/DIcqyWN/ZwbVt9O8aGhH8MOTw7IxGu81TmvKRZRx0u7R6PbTrIiJolMKPIuwg4ClNmQ4GjPt93rOM1b098H0KEdSVMVK4LmZzk/HLC0vzORowvo/VaPCZ57iLRaJujLmdi1AUBapU+m8SEQoRtNZYcP8DP4x3gFrOVxsAAAAASUVORK5CYII=";

	var style= ".diggmirror a{float:left; background: none; opacity: 0.7; width: 10px; height: 10px; padding-bottom: 0px;} ";
	style+= ".diggmirror a:hover{opacity: 1;} ";
	style+= ".diggmirror a{margin: 4px 0px 0px 2px; padding: 0px 0px 0px 0px;} ";
	style+= "li.digg-it, li.undigg-it, li.dugg-it, li.buried-it{float:none; margin-top: 0.1px;} ";
	style+= ".diggmirror:after{content: '.'; visibility: hidden;} ";
	
	style+= ".rorrim{background: no-repeat url("+ rorrimicon +") center center !important; margin-left: 1px;} ";
	style+= ".coralcache{background: no-repeat url("+ coralcacheicon +") center center !important;} ";
	style+= ".duggback{background: no-repeat url("+ duggbackicon +") center center !important;} ";
	style+= ".wayback{background: no-repeat url("+ waybackicon +") center center !important;} ";
	
	addGlobalStyle(style);
//console.timeEnd("digg - add mirrors - addstyle");
}

function checkMirrors(link, dugglink)
{
	GM_xmlhttpRequest({
		method: 'HEAD',
		url: link.href,
		onload: function(responseDetails) {
		//GM_log("finished successful; status: " + responseDetails.status);
			if(Math.floor(responseDetails.status/100) === 5)
			{
				//GM_log(link.href + ": " + responseDetails.status);
				link.href= "http://rorr.im/" + dugglink.substring(7); 
			}
		}
	});
	return;
}

function addIcons(node, target, href, dugglink)
{
	var anchor;
	
	// add container
	var container = document.createElement("li");
	container.className = "dugg-it diggmirror";

	//add rorr.im cache link
	anchor = document.createElement("a");
	anchor.href = "http://rorr.im/" + dugglink.substring(7);
	anchor.target = target;
	anchor.title = "rorr.im";
	anchor.className= "rorrim";
	container.appendChild(anchor);

	//add coral cache link
	anchor = document.createElement("a");
	anchor.href = href;
	anchor.host += ".nyud.net:8080";
	anchor.target = target;
	anchor.title = "Coral Cache - The Coral Content Distribution Network";
	anchor.className= "coralcache";
	container.appendChild(anchor);

	//add duggBack link
	anchor = document.createElement("a");
	anchor.href = dugglink.replace(/digg\.com/, "duggback.com");
	anchor.target = target;
	anchor.title = "DuggBack";
	anchor.className= "duggback";
	container.appendChild(anchor);
	
	// add archive.org link
	anchor = document.createElement("a");
	anchor.href = "http://web.archive.org/" + href;
	anchor.target = target;
	anchor.title = "Archive.org Wayback Machine";
	anchor.className= "wayback";
	container.appendChild(anchor);
	
	node.parentNode.appendChild(container);	// Add mirrors created in memory to real-life dom
}

function addMirrorList(link, idx)
{
	var node, dugglink;
	
	if(idx === null)	// The page contains only one diggbutton (eg story page)
	{
		node= document.getElementById("diglink1");
		dugglink= window.location.href.replace(/\/all/, '');
	}
	else 
	{
		node= document.getElementById("diglink" + idx);
		dugglink= document.getElementById("diggs" + idx).href;
	}
	
	if(!node && (idx === null))	// In case you perform a search, and only one item is found
	{
		node= document.getElementById("diglink0");
		dugglink= document.getElementById("diggs0").href;
	}
	
	if(!node) return;	// Exit when the node can't be found
	
	var href= link.href;
	var target= link.target; // Get target from link so all links on the page act the same (open in new tab or open in the same tab)
	
	addIcons(node, target, href, dugglink);
	
	checkMirrors(link, dugglink);
}

function addmirrors()
{
//console.time("digg - add mirrors");
	if ( location.pathname.indexOf('diggthis.php') !== -1 && window.location.hash.toString().indexOf('#adc_diggthis') === 0) // embedded widget?
	{
		var node= document.getElementById("diglink1");
		var target= "_top";
		var href= document.referrer;
		var dugglink= location.search;
			dugglink= dugglink.substring(3, dugglink.length);
		
		addIcons(node, target, href, dugglink);
	}
	else if( location.hostname.indexOf('digg.com') !== -1 )	//are we on the main digg site?
	{
		var xpath  = "//div[@class='news-body']/h3/a[@href][1]";
		var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		
		var resultLength= result.snapshotLength;
		
		if(resultLength < 1) return;

		if(resultLength === 1) addMirrorList (result.snapshotItem(0), null );
		else 
		{		
			var i= 0, j= 0;
			// Check wether a user has a #1 story set
			if(result.snapshotItem(0).parentNode.id === "title-1")
			{
				addMirrorList (result.snapshotItem(0), -1 );
				resultLength= resultLength-1;
			}
			else if(window.location.href.match(/users/))
			{
				i= 0;
				j= -1;
			}
			else
			{
				i=-1;
				j=-1;
			}
			
			// Add mirrors to all other stories
			var k= resultLength;
			do
			{
				addMirrorList (result.snapshotItem(k+j), k+i );
			} while(--k);
		}
	}
//console.timeEnd("digg - add mirrors");
}

//Are we on a page with ADC box?
if ( location.hash.indexOf('#digg_link=') === 0 || location.hostname.indexOf("rorr.im") === 0 )
{
	var controlIframe= document.getElementById("diggControlIframe");
	if(controlIframe) // Resize ADC box when found, else wait till page is loaded
	{
		controlIframe.height= 100;
	}
	else
		window.addEventListener("load", function(){var controlIframe= document.getElementById("diggControlIframe"); if(controlIframe) controlIframe.height= 100;}, false);		
}
else if(location.href.indexOf('&s=compact') === -1) // No need to execute when the control is compact, no mirrors will be displayed anyway
{
	addStyle();
	addmirrors();
}

// update automatically (http://userscripts.org/scripts/show/2296)
var SCRIPT = {
		name: "digg - add mirrors",
		namespace: "http://jordi.degroof.googlepages.com/",
		source: "http://userscripts.org/scripts/show/7585",			// script homepage
		identifier: "http://userscripts.org/scripts/review/7585?format=txt",
		version: "1.7",								// version
		date: (new Date(2009, 03 -1, 31))		// update date
		.valueOf()
};
try {
	window.addEventListener("load", function () {
		try {
			unsafeWindow.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
		} catch (ex) {}
	}, false);
} catch (ex) {}