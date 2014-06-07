// ==UserScript==
// @name           Wikipedia - Dead-Link-Finder
// @description    finds external links in Wikipedia-pages, which do not return the HTTP status code 200 and marks them.
// @namespace      http://userscripts.org/users/frog23
// @include        http://*.wikipedia.org/*
// @include        http://*.wikinews.org/*
// @include        http://meta.wikimedia.org/*
// @include        http://*.wiktionary.org/*
// @include        http://*.wikibooks.org/*
// @include        http://*.wikiquote.org/*
// @include        http://*.wikiversity.org/*
// @include        http://*.wikisource.org/*
// @version        1.2.2
// @author         frog23
// @date           2009-11-21
// @license        GPL 2 or later, see <http://www.gnu.org/licenses/>
// ==/UserScript==

var fadeOutDelay = 1500;
var timeToFade = 500;


var enabled = GM_getValue("enabled",true);
if(enabled){
	var links = document.evaluate('id("bodyContent")//a[starts-with(@class, "external")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var counter = 0;
	var deadLinkCount = 0;

	var method = GM_getValue("RequestMethod","HEAD");
	var showOk = GM_getValue("showOk",false);

	var countDiv;
	var okDiv;

	if(document.URL.indexOf("browsemode=on")>-1){
		GM_log("browse mode initialized");
		GM_setValue("browsemode",true)
	}else if(document.URL.indexOf("browsemode=off")>-1){
		GM_log("browse mode stoped by user");
		GM_setValue("browsemode",false)
	}

	function next(){
		if(counter < links.snapshotLength) {
			var link = links.snapshotItem(counter);

			var linkText = link.href
			if(linkText.substring(29,0)=='http://stable.toolserver.org/'){
				counter++;
				next();
			}else{

				GM_xmlhttpRequest({
					method: method,
					url: linkText,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml',
					},
					onload: function(responseDetails) {
						if (responseDetails.readyState == 4) { 
							//if the status is not ok, set marker, except if the status is 405 or 406 and the method is HEAD (some servers can not handle head-requests properly and most of them return either one of those two codes)
							if (responseDetails.status != 200 && ((method == "HEAD" && !(responseDetails.status == 405 | responseDetails.status == 406))|method=="GET")) { 
								GM_log("page is NOT ok:" + responseDetails.status + " - " + responseDetails.statusText + " - " + link);
								var alertLabel = document.createElement("span");
								alertLabel.innerHTML = "["+responseDetails.status+"]";
								alertLabel.style.color="#ff0000";
								alertLabel.title=responseDetails.statusText;
								link.parentNode.insertBefore(alertLabel,link);

								var alertImg = document.createElement("img");
								alertImg.src = "http://commons.wikimedia.org/w/thumb.php?f=Nuvola%20apps%20important.svg&width=16px";
								alertImg.alt="Alert Icon: dead link";
								alertImg.title=responseDetails.statusText;


								link.parentNode.insertBefore(alertImg,alertLabel);
								link.parentNode.insertBefore(link,alertImg);

								if(deadLinkCount==0){
									alertLabel.id="first-dead-link-ref";

									//insert Icon with count and hide-Option
									var alertDiv = document.createElement("div");
									alertDiv.innerHTML = "<a href=\"#first-dead-link-ref\"><img src=\"http://commons.wikimedia.org/w/thumb.php?f=Nuvola%20apps%20important.svg&width=50px\" style=\"float:left;\" alt=\"Alert Icon: dead link\"></a><small>&nbsp;<a style=\"cursor:pointer\" onclick=\"this.parentNode.parentNode.style.visibility='hidden';\">[x]</a></small><br/><div id=\"dead-link-count\" style=\"float:right; padding-top:4px;\"></div>";
									alertDiv.style.background = "rgb(255, 255, 255) none repeat scroll 0% 0%"; 			
									alertDiv.style.position = "fixed"; 
									alertDiv.style.bottom = "0px"; 
									alertDiv.style.right = "0px";
		
									document.getElementById("bodyContent").appendChild(alertDiv);
									countDiv = document.getElementById("dead-link-count");
									if(GM_getValue("browsemode",false)){
										GM_setValue("browsemode",false);
										GM_log("browsemode finished");
									}
								}

								deadLinkCount++;
								countDiv.innerHTML = "<small>"+deadLinkCount+"&nbsp;</small>"; 

							}
							next();
						}
					}
				});
								
				counter++;
			}
		}else{
			if(deadLinkCount==0 && showOk){
				okDiv = document.createElement("div");
				okDiv.innerHTML = "<a style=\"cursor:pointer\" onclick=\"this.parentNode.style.visibility='hidden';\"><img src=\"http://commons.wikimedia.org/w/thumb.php?f=Gnome-emblem-default.svg&width=40px\" style=\"float:left;\" alt=\"Icon: no dead links found\"></a>";
				okDiv.id = "okDiv";
				okDiv.style.position = "fixed"; 
				okDiv.style.bottom = "0px"; 
				okDiv.style.right = "0px";
				okDiv.style.opacity = "1";
				document.getElementById("bodyContent").appendChild(okDiv);
				setTimeout(function(){fade();}, fadeOutDelay);

				
			}

			if(deadLinkCount==0 && GM_getValue("browsemode",false)){
				var link = document.evaluate("id('n-randompage')/a", document, null, 9, null).singleNodeValue;
				if(link){
					window.location = link.href;
				}else{
					GM_setValue("browsemode",false);
					GM_log("browsemode not possible");
				}
			}
		}

	}

	if(method == "HEAD"){
		GM_registerMenuCommand("WP Dead Link Finder: GET", function(){GM_setValue("RequestMethod","GET");location.reload();});
	}else{
		GM_registerMenuCommand("WP Dead Link Finder: HEAD", function(){GM_setValue("RequestMethod","HEAD");location.reload();});
	}
	if(showOk){
		GM_registerMenuCommand("WP Dead Link Finder: hide OK", function(){GM_setValue("showOk",false);location.reload();});
	}else{
		GM_registerMenuCommand("WP Dead Link Finder: show OK", function(){GM_setValue("showOk",true);location.reload();});
	}
	GM_registerMenuCommand("WP Dead Link Finder: disable", function(){GM_setValue("enabled",false);location.reload();});
	next();
}else{
	GM_registerMenuCommand("WP Dead Link Finder: enable", function(){GM_setValue("enabled",true);location.reload();});
}


function fade()
{
	okDiv.style.opacity = okDiv.style.opacity-0.05;
	if(okDiv.style.opacity <= 0){
		okDiv.parentNode.removeChild(okDiv);
		return;
	}else{
		setTimeout(function(){fade();}, timeToFade/10);
	}
}

