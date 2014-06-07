// ==UserScript==
// @name           Better Dagospia.com
// @version        1.23
// @namespace      http://www.dagospia.com/
// @description    Rimuove un po' di immondizia e attenua la cacofonia visuale
// @include        http://dagospia.com/*
// @include        http://www.dagospia.com/*
// @updateURL      http://userscripts.org/scripts/source/88593.user.js
// @icon           http://www.dagospia.com/favicon.ico
// ==/UserScript==

/**** HISTORY ****/
//1.23    Removed ad banner in content pages, trying to fix the meta refresh block
//1.20    Made the single pages less cacophonic
//1.19    After website restyling, re-allowed some of the visual items
//1.18    Re-admitted a couple of image containers into the sidebar
//        Managed to kill the stupid tooltip that got into the way when reading the page

//thanks to n0nick http://userscripts.org/scripts/show/4097
function blockMetaRefresh(){

// looking for three common cases: refresh, Refresh, REFRESH
// if anyone knows how to do a case-insensitive query, that would be cool.. email sagiem at gmail dot com
var refresh1 = document.evaluate("//meta[@http-equiv='Refresh']|//meta[@http-equiv='refresh']|//meta[@http-equiv='REFRESH']|//meta[http-equiv='refresh']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

//GM_log("Refresh: "+refresh1.snapshotItem(0));

if(refresh1.snapshotItem(0) != null){
	var content = refresh1.snapshotItem(0).getAttribute("content");
	var yesh = 1;
}

if (yesh == 1){
	var stopTimer = window.setTimeout("window.stop();",
		(content-1)*1000); // in case load hasn't finished when the refresh fires
	window.addEventListener("load", function(){
	   try { window.clearTimeout(stopTimer); } catch(ex) {}
	   window.stop();
	   }, true);
	GM_log("stopped meta-refresh");
} else {
	GM_log("no meta-refresh found");
}
}

//thanks to blueday http://userscripts.org/scripts/show/5506 (doesn't seem to work for me)
function blockMetaRefresh2() {
	
		var allMetas, thisMeta, content, timeout, timeout_ms, url, view1, view2, link;
	
		timeout = -1;
		url = 'none';
	
		allMetas = document.getElementsByTagName('meta');
		for (var i = 0; i < allMetas.length; i++) {
			thisMeta = allMetas[i];
	
			if (thisMeta.httpEquiv.match(/refresh/i)) {
				if (thisMeta.content.match(/[\D]/)) {
					content = thisMeta.content.split(';');
					timeout = content[0];
					
					url = thisMeta.content.match(/url=['"]?([^'"]+)['"]?$/i);
					url = RegExp.lastParen;
				}
				else {
					timeout = thisMeta.content;
					url = thisMeta.baseURI;
				}
			}
		}
	
		if (timeout > 0) {
			timeout_ms = (timeout - 1) * 1000;
		}
	
		view1 = document.createElement('div');
		view1.setAttribute('style', 'padding-top: 1em; padding-bottom: 1em;');
		view2 = document.createElement('div');
		view2.setAttribute('style', 'border: 1px solid black; padding: 0.5em; background: rgb(255, 255, 191) none repeat scroll 0%; width: 90%; color: black; margin-left: auto; margin-right: auto; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; font-family: sans-serif;');
		view2.appendChild(document.createTextNode('Refresh: '));
		link = document.createElement('a');
		link.href = url;
		link.setAttribute('style', 'color: blue;');
		link.appendChild(document.createTextNode(url));
		view2.appendChild(link);
		view2.appendChild(document.createTextNode(' Timeout: ' + timeout));
		view1.appendChild(view2);
	
		if (timeout >= 0) {
			// in case load hasn't finished when the refresh fires
			var stopTimer = window.setTimeout("window.stop();", timeout_ms); 
			window.addEventListener("load", function() {
				try { window.clearTimeout(stopTimer); } catch(ex) {}
				window.stop();
			}, true);
	
			var fc = document.body.firstChild;
			if (fc) {
				fc.parentNode.insertBefore(view1, fc);
			}
			else {
				var view3 = document.createElement('div');
				view3.appendChild(view1);
				document.body.innerHTML = view3.innerHTML + document.body.innerHTML;
			}
		}		
	}
	
//removes br
function replaceBr(){
	var sideb = document.getElementById("sidebar").innerHTML;
	document.getElementById("sidebar").innerHTML=sideb.replace(new RegExp("<br>","g"),'');
	var sideb2 = document.getElementById("sidebar").innerHTML;
	document.getElementById("sidebar").innerHTML=sideb2.replace(new RegExp("&nbsp;","g"),'');
	}
	
function removeStupidTip(){
	var artTitle = document.getElementById('testoArticolo');
	/*artTitle.removeAttribute('title');*/
	artTitle.setAttribute('title', '');
	
	}
 
//main function
(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}	
	
	//parts of the page to hide
	var cssStyle = '.mediaBox, .advBanner {display:none !important} ';
	
	//a little make-up
	cssStyle += '.post h2 {border-bottom: none !important; padding-bottom: 15px;} '; 


//modifiers for non home pages only
	if (window.location.href != "http://www.dagospia.com/" || window.location.href == "http://dagospia.com/" ) {
		
		cssStyle += '#primaria, #social-icons, #data-odierna {display:none !important} #left {margin-right:0px !important} #left .inner {margin-right:30px !important; margin-left:30px !important;} '; 
	}	


  //add CSS
	addGlobalStyle(cssStyle);
	
	//remove br from sidebar
	replaceBr();
	
	// break moronic meta refresh of the page
	blockMetaRefresh2();
	
	//remove stupid tooltip floating above article (sorry, as it is it breaks the loading of the pictures)
	removeStupidTip();
	
	
}

)()