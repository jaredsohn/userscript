// ==UserScript==
// @name       AdRemover
// @version    8.5
// @description  Enjoy the web without ads!
// @match      http://*/*
// @match      https://*/*
// @exclude    https://www.google.*/*tbm=isch*
// @downloadURL http://userscripts.org/scripts/show/159351
// @copyright  2014+, ich01
// @namespace http://userscripts.org/scripts/show/159351
// @updateURL http://userscripts.org/scripts/source/159351.meta.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// ==/UserScript==
//unsafeWindow
var uw = (this.unsafeWindow) ? this.unsafeWindow : window;
//AdRemover object
uw.adremover = {
thisScriptVersion: "8.5",
startTime: new Date().getMilliseconds(),
startTimeSeconds: new Date().getSeconds(),
isfirefox: false,
keyWordList: [],
keyURLList: [],
keyPopupList: [],
keyInPagePopupList: [],
labelTextes: [],
removedElements: 0,
removedImages: 0,
removedObjects: 0,
removedPlaceholders: 0,
removedSpecialPopups: 0,
AR_elements_activated: true,
AR_objects_activated: true,
AR_images_activated: true,
AR_minimode_activated: false,
AR_placeholders_activated: true,
removedElementsArray: [],
removedImagesArray: [],
removedObjectsArray: [],
removedPlaceholdersArray: [],
removedSpecialPopupsArray: [],
AR_milliseconds: 0,
regexp_adsearch: "",
regexp_iframesearch: "",
regexp_popupsearch: "",
regexp_inpagepopupsearch: "",
testForForbiddenKeywords: function(words) {
	var h_Regexp = new RegExp("badge|radio|logo|acad|Ads_BA_TakeOver|fad|load|shad|read|head|add|pad|advanced|grad|admin|nonpro_adslayout|captcha|masthead-|yt-masthead","i");
    if (words.search(h_Regexp)>-1) {
		return true;   
    } else {
		return false;   
    }
},
initAdRegexp: function() {
	var newRegexpString = adremover.keyWordList[0];
	for (var i = 1;i<adremover.keyWordList.length;i++) {
		newRegexpString+="|"+adremover.keyWordList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_adsearch = a_Regexp;
},
initIframeRegexp: function() {
	var newRegexpString = adremover.keyURLList[0];
	for (var i = 1;i<adremover.keyURLList.length;i++) {
		newRegexpString+="|"+adremover.keyURLList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_iframesearch = a_Regexp;
},
initPopupRegexp: function() {
	var newRegexpString = adremover.keyPopupList[0];
	for (var i = 1;i<adremover.keyPopupList.length;i++) {
		newRegexpString+="|"+adremover.keyPopupList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_popupsearch = a_Regexp;
},
initInPagePopupRegexp: function() {
	var newRegexpString = adremover.keyInPagePopupList[0];
	for (var i = 1;i<adremover.keyInPagePopupList.length;i++) {
		newRegexpString+="|"+adremover.keyInPagePopupList[i];
	}
	var a_Regexp = new RegExp(newRegexpString,"i");
	adremover.regexp_inpagepopupsearch = a_Regexp;
},
handleIframe: function(iframe) {
	if (iframe) {
		var oldSRC = iframe.getAttribute("src");
		adremover.removedObjectsArray.push(oldSRC);
		iframe.outerHTML="";
	}
},
getBrowserLanguage: function() {
	adremover.labelTextes = [];
	adremover.labelTextes[0] = "Total";
	adremover.labelTextes[1] = "Elements";
	adremover.labelTextes[2] = "Images";
	adremover.labelTextes[3] = "Objects";
	adremover.labelTextes[4] = "Click for Popup!";
	adremover.labelTextes[5] = "Close popup";
	adremover.labelTextes[6] = "Restore ads partially";
	adremover.labelTextes[7] = "Enable AdRemover on this domain";
	adremover.labelTextes[8] = "General Settings";
	adremover.labelTextes[9] = "Remove normal elements";
	adremover.labelTextes[10] = "Remove images";
	adremover.labelTextes[11] = "Remove iframes";
	adremover.labelTextes[12] = "Remove placeholders";
	adremover.labelTextes[13] = "Ads restored!";
	adremover.labelTextes[14] = "An unknown error occurred in AdRemover "+adremover.thisScriptVersion+".";
	adremover.labelTextes[15] = "AdRemover is now disabled on this domain!";
	adremover.labelTextes[16] = "AdRemover is now enabled on this domain!";
	adremover.labelTextes[17] = "Placeholders";
	adremover.labelTextes[18] = "About";
	adremover.labelTextes[19] = "Author";
	adremover.labelTextes[20] = "Minimized info";
	if (navigator.language.indexOf("de")>=0) {
		//German translation
		adremover.labelTextes[0] = "Gesamt";
		adremover.labelTextes[1] = "Elemente";
		adremover.labelTextes[2] = "Grafiken";
		adremover.labelTextes[3] = "Objekte";
		adremover.labelTextes[4] = "Klick f&uuml;r Popup!";
		adremover.labelTextes[5] = "Popup schlie&szlig;en";
		adremover.labelTextes[6] = "Werbung teilweise wiederherstellen";
		adremover.labelTextes[7] = "Werbeblocker auf dieser Domain aktivieren";
		adremover.labelTextes[8] = "Allgemeine Einstellungen";
		adremover.labelTextes[9] = "Normale Elemente entfernen";
		adremover.labelTextes[10] = "Grafiken entfernen";
		adremover.labelTextes[11] = "Eingebundene Frames entfernen";
		adremover.labelTextes[12] = "Platzhalter entfernen";
		adremover.labelTextes[13] = "Werbung wiederhergestellt";
		adremover.labelTextes[14] = "Ein unbekannter Fehler trat in AdRemover "+adremover.thisScriptVersion+" auf.";
		adremover.labelTextes[15] = "AdRemover ist nun auf dieser Domain deaktiviert!";
		adremover.labelTextes[16] = "AdRemover ist nun auf dieser Domain wieder aktiviert!";
		adremover.labelTextes[17] = "Platzhalter";
		adremover.labelTextes[18] = "&Uuml;ber";
		adremover.labelTextes[19] = "Autor";
		adremover.labelTextes[20] = "Winzige Info";
	}
},
createInfoElement: function(removed_elements, removed_images, removed_objects) {
	document.getElementsByTagName("body")[0].appendChild(document.createElement("adremover"));
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.textAlign="left";
	adrel.style.lineHeight="12px";
	adrel.style.opacity="0.85";
	adrel.style.color="black";
	adrel.style.position="fixed";
	adrel.style.zIndex="9999999999999";
	adrel.style.fontSize="11px";
	adrel.style.top="0px";
	adrel.style.right="0px";
	adrel.style.background="rgba(238, 238, 238,0.9)";
	adrel.style.borderLeft="2px solid cyan";
	adrel.style.borderBottom="2px solid cyan";
	adrel.style.boxShadow="cyan -2px 2px 4px 1px";
	adrel.style.display="block";
	adrel.style.padding="4px";
	adrel.style.maxHeight="150px";
	adrel.style.maxWidth="150px";
	adrel.style.borderBottomLeftRadius="3px";
	adrel.style.transition="all 0.8s ease-out";
	adrel.style.fontFamily="Arial";
	adrel.style.cursor="pointer";
	adrel.addEventListener("click", function() {adremover.createPopup();});
	var allString = "<span style='font-family:Arial;font-weight:bold;font-size:15px;'>AdRemover "+adremover.thisScriptVersion+"</span><br>";
	allString+="<span style='font-family:Arial;font-weight:bold;'>"+adremover.labelTextes[0]+":</span> "+(adremover.removedElements+adremover.removedImages+adremover.removedObjects)+"<br>";
	if (adremover.removedElements>0) {
		allString+=adremover.labelTextes[1]+": "+adremover.removedElements+"<br>";
	}
	if (adremover.removedImages>0) {
		allString+=adremover.labelTextes[2]+": "+adremover.removedImages+"<br>";
	}
	if (adremover.removedObjects>0) {
		allString+=adremover.labelTextes[3]+": "+adremover.removedObjects+"<br>";
	}
	if (adremover.removedPlaceholders>0) {
		allString+=adremover.labelTextes[17]+": "+adremover.removedPlaceholders+"<br>";
	}
	if (adremover.removedSpecialPopups>0) {
		allString+="Special Popups: "+adremover.removedSpecialPopups+"<br>";
	}
	allString+="<span style='font-family:Arial;font-weight:bold;'>"+adremover.labelTextes[4]+"</span>";
	document.getElementsByTagName("adremover")[0].innerHTML=allString;
	setTimeout("adremover.hideInfoElement()", 6000);
},
createMiniInfoElement: function() {
	document.getElementsByTagName("body")[0].appendChild(document.createElement("adremover"));
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.textAlign="left";
	adrel.style.lineHeight="12px";
	adrel.style.opacity="0.85";
	adrel.style.color="black";
	adrel.style.position="fixed";
	adrel.style.zIndex="9999999999999";
	adrel.style.fontSize="11px";
	adrel.style.top="0px";
	adrel.style.right="0px";
	adrel.style.background="rgba(238, 238, 238,0.9)";
	adrel.style.borderLeft="2px solid cyan";
	adrel.style.borderBottom="2px solid cyan";
	adrel.style.boxShadow="cyan -2px 2px 4px 1px";
	adrel.style.display="block";
	adrel.style.padding="4px";
	adrel.style.maxHeight="150px";
	adrel.style.maxWidth="150px";
	adrel.style.borderBottomLeftRadius="3px";
	adrel.style.transition="all 0.8s ease-out";
	adrel.style.fontFamily="Arial";
	adrel.style.cursor="pointer";
	adrel.addEventListener("click", function() {adremover.createPopup();});
	var allString = "<span style='font-family:Arial;font-weight:normal;font-size:12px;'>AdRemover</span><br>";
	document.getElementsByTagName("adremover")[0].innerHTML=allString;
	setTimeout("adremover.hideInfoElement()", 6000);
},
hideInfoElement: function() {
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.opacity="0";
	setTimeout("adremover.hideInfoElement2()", 900);
},
hideInfoElement2: function() {
	var adrel = document.getElementsByTagName("adremover")[0];
	adrel.style.display="none";
	adrel.outerHTML="";
},
checkFirefox: function() {
	if (navigator.userAgent.toLowerCase().indexOf("firefox")>-1) {
		adremover.isfirefox = true;
	}
},
initAdremover: function() {
	adremover.getBrowserLanguage();
	console.log("Starting AdRemover "+adremover.thisScriptVersion+" on "+document.location+" ...");
	//Check for blacklistet Popup
	adremover.initBlacklistPopups();
	adremover.initPopupRegexp();
	if (document.location.toString().toLowerCase().search(adremover.regexp_popupsearch)>-1) {
		window.open('','_self');
        window.close();
	}
	//Start cleaning
	if (adremover.checkForBlacklist(document.location)==false) {
		adremover.getARSettings();
		adremover.initKeyWordList();
		adremover.initKeyURLList();
		adremover.initInPagePopups();
		adremover.initInPagePopupRegexp();
		adremover.initAdRegexp();
		adremover.initIframeRegexp();
		adremover.startCleaning();
	} else {
		adremover.getARSettings();
		adremover.createMiniInfoElement();
	}
},
secondRun: function() {
	console.log("Starting AdRemover "+adremover.thisScriptVersion+" on "+document.location+" 4 seconds after page load ...");
	//Check for blacklistet Popup
	if (document.location.toString().toLowerCase().search(adremover.regexp_popupsearch)>-1) {
		window.open('','_self');
        window.close();
	}
	//Start cleaning
	if (adremover.checkForBlacklist(document.location)==false) {
		adremover.startCleaning();
	}
},
checkForBlacklist: function() {
	if (localStorage.getItem("AR_userblacklist")!=undefined && localStorage.getItem("AR_userblacklist")!=null) {
		if (localStorage.getItem("AR_userblacklist").indexOf(document.location.host)>=0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
},
changeBlacklist: function(formelement) {
	if (formelement.checked==false) {
		localStorage.setItem("AR_userblacklist",localStorage.getItem("AR_userblacklist")+";"+document.location.host);
		alert(adremover.labelTextes[15]);
	} else if (formelement.checked==true) {
		var firstChar = localStorage.getItem("AR_userblacklist").indexOf(document.location.host);
		localStorage.setItem("AR_userblacklist",localStorage.getItem("AR_userblacklist").substring(0,firstChar-1)+localStorage.getItem("AR_userblacklist").substring(firstChar+document.location.host.length));
		alert(adremover.labelTextes[16]);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
initKeyWordList: function() {
	adremover.keyWordList.push("afc");
	adremover.keyWordList.push("brandbox");
	adremover.keyWordList.push("watch-channel-brand-div");
	adremover.keyWordList.push("ad");
	adremover.keyWordList.push("rwidesky");
	adremover.keyWordList.push("tvcap");
	adremover.keyWordList.push("werbung");
	adremover.keyWordList.push("billboardcontainer");
	adremover.keyWordList.push("medrec");
	adremover.keyWordList.push("aswift_");
	adremover.keyWordList.push("eyecatcher");
	adremover.keyWordList.push("sponsored");
	adremover.keyWordList.push("sky");
	adremover.keyWordList.push("commercial");
	adremover.keyWordList.push("superlayer");
	adremover.keyWordList.push("sidebanner");
	adremover.keyWordList.push("pyv-watch-related-dest-url");
	adremover.keyWordList.push("masthead");
	adremover.keyWordList.push("aswift");
	adremover.keyWordList.push("adsense");
	adremover.keyWordList.push("bannerzone");
},
initKeyURLList: function() {
	adremover.keyURLList.push("atdmt.com/MRT");
	adremover.keyURLList.push("cdn.movad.net/");
	adremover.keyURLList.push("redintelligence.net/request");
	adremover.keyURLList.push("ads.adtiger.de/ad");
	adremover.keyURLList.push("ads.newtentionassets.net/asset");
	adremover.keyURLList.push("hosting.adjug.com/AdJug");
	adremover.keyURLList.push("adclient.uimserv.net/html.ng");
	adremover.keyURLList.push("creativeproxy.uimserv.net/?LogoutAdProxy");
	adremover.keyURLList.push("a.ligatus.com/");
	adremover.keyURLList.push("2mdn.net/");
	adremover.keyURLList.push("track.adform.net/ad");
	adremover.keyURLList.push("hosting.adjug.com/Ad");
	adremover.keyURLList.push("ad4mat.de/ads");
	adremover.keyURLList.push("zanox-affiliate.de/ppc");
	adremover.keyURLList.push("ads.bluelithium.com/iframe");
	adremover.keyURLList.push("pagead2.googlesyndication.com/simgad");
	adremover.keyURLList.push("ads.tlvmedia.com/st?ad");
	adremover.keyURLList.push("ad.xtendmedia.com/st?ad");
	adremover.keyURLList.push("zanox-affiliate.de/ppc");
	adremover.keyURLList.push("content.yieldmanager.edgesuite.net/atoms");
	adremover.keyURLList.push("network.adsmarket.com/ceas");
	adremover.keyURLList.push(".ib.adnxs.com/if?");
	adremover.keyURLList.push("adserver.freenet.de/Ads");
	adremover.keyURLList.push("i.ligatus.com/com_ms");
	adremover.keyURLList.push("ds.serving-sys.com/burstingRes");
	adremover.keyURLList.push("tags.qservz.com/ct_adi");
	adremover.keyURLList.push("image.adjug.com/Advertiser");
	adremover.keyURLList.push("tags.qservz.com/ct_adi");
	adremover.keyURLList.push("g.doubleclick.net/pagead");
	adremover.keyURLList.push("doubleclick.net/");
	adremover.keyURLList.push("content-result-ads");
	adremover.keyURLList.push("ads.newtention.net/ads");
	adremover.keyURLList.push("uk-ads.openx.net");
	adremover.keyURLList.push("tag.admeld.com/imp/iframe");
	adremover.keyURLList.push("ad.ad-srv.net/request_content.php");
	adremover.keyURLList.push("ads.yahoo.com/i");
	adremover.keyURLList.push("coinurl.com/get.php?id=");
	adremover.keyURLList.push("ad.a-ads.com/");
	adremover.keyURLList.push("cpalead.com/banner.php?");
	adremover.keyURLList.push("ads.trafficjunky.net/ads");
	adremover.keyURLList.push("2mdn.net/ads");
	adremover.keyURLList.push("adx.chip.de/www");
	adremover.keyURLList.push("ad.ad-srv.net/request_content.php");
	adremover.keyURLList.push("img.propellerads.com/www/images");
	adremover.keyURLList.push("ad.propellerads.com/a");
},
initInPagePopups: function() {
	adremover.keyInPagePopupList.push("adflad.*");
	adremover.keyInPagePopupList.push("sponsorads.*");
},
initBlacklistPopups: function() {
	adremover.keyPopupList.push("http://www.*mpnrs.com/");
	adremover.keyPopupList.push("sunmaker.com/.*/home.html?a_aid=.*&chan=");
	adremover.keyPopupList.push("32d1d3b9c.se/?placement=");
	adremover.keyPopupList.push("http://cdn.anyoption.com/landing.shtml");
	adremover.keyPopupList.push("http://www.adcash.com/script/pop_pack");
	adremover.keyPopupList.push("ih.adscale.de/adscale-ih/show");
},
removeNormalElement: function(anElement) {
	var acChildren;
	if (anElement) {
		anElement.style.display="none";
		for (var i = 0;i<anElement.children.length;i++) {
			acChildren = anElement.children[i];
			if (acChildren) {
				if  (acChildren.nodeName && (acChildren.nodeName=="IFRAME" || acChildren.nodeName=="OBJECT" || acChildren.nodeName=="EMBED")) {
					adremover.handleIframe(acChildren);
					adremover.removedObjects++;
				}
			}
		}
	}
	adremover.removedElementsArray.push(anElement);
},
removeElements: function() {
	var acEl, acElId, acElClass, acElNodeName, acElSrc, setRemoved;
	for (var i = 0;i<document.getElementsByTagName("*").length;i++) {
		setRemoved = false;
		acEl = document.getElementsByTagName("*")[i];
		if (acEl) {
			acElNodeName = acEl.nodeName;
			//ID and Class check
			if (acElNodeName=="DIV" || acElNodeName=="IFRAME" || acElNodeName=="IMG" || acElNodeName=="A" || acElNodeName=="OBJECT" || acElNodeName=="P" || acElNodeName=="SECTION") {
				if (acEl.getAttribute("id")) {
					acElId = acEl.getAttribute("id").toLowerCase();
				} else {
					acElId="";
				}
				if (acEl.className) {
					if (acEl.className.baseVal) {
						acElClass = acEl.className.baseVal.toString().toLowerCase();
					} else if (acEl.className) {
						acElClass = acEl.className.toLowerCase();
					} else {
						acElClass = "";
					}
				} else {
					acElClass = "";
				}
				if (setRemoved==false && adremover.testForForbiddenKeywords(acElClass)==false && adremover.testForForbiddenKeywords(acElId)==false) {
					if (acElId.search(adremover.regexp_adsearch)>-1) {
						setRemoved = true;
						adremover.removeNormalElement(acEl);
						adremover.removedElements++;
					}
					//Class name check
					if (setRemoved==false && acElClass.search(adremover.regexp_adsearch)>-1) {
						setRemoved = true;
						adremover.removeNormalElement(acEl);
						adremover.removedElements++;
					}
					//Special inpage popup check
					if (acElId.search(adremover.regexp_inpagepopupsearch)>-1) {
						adremover.removedSpecialPopups++;
						adremover.removedSpecialPopupsArray.push(acElId);
						acEl.setRemoved = true;
						acEl.outerHTML = "";
						console.log("Removed a special popup!");
					}
				}
			}
			//Iframe and object
			if (adremover.AR_objects_activated==true && (acElNodeName=="IFRAME" || acElNodeName=="OBJECT" || acElNodeName=="EMBED")) {
				acElSrc = acEl.getAttribute("src");
				if (acElSrc) {
					acElSrc = acElSrc.toLowerCase();
					if (acElSrc.search(adremover.regexp_iframesearch)>-1) {
						adremover.handleIframe(acEl);
						setRemoved = true;
						adremover.removedObjects++;
					}
				}
			}
			//image check
			if (adremover.AR_images_activated==true && acElNodeName=="IMG") {
				acElSrc = acEl.getAttribute("src");
				if (acElSrc) {
					acElSrc = acElSrc.toLowerCase();
					if (acElSrc.search(adremover.regexp_iframesearch)>-1) {
						adremover.removedImagesArray.push(acEl);
						acEl.style.display="none";
						setRemoved = true;
						adremover.removedImages++;
					} else {
						var filename = acElSrc.substring(acElSrc.lastIndexOf("/"));
						if (filename.search(adremover.regexp_adsearch)>-1 && adremover.testForForbiddenKeywords(filename)==false) {
							adremover.removedImagesArray.push(acEl);
							acEl.style.display="none";
							setRemoved = true;
							adremover.removedImages++;
						}
					}
				}
			}
		}
	}
},
removePlaceholders: function() {
	var firstRemoved = false;
	for (var i = 0;i<adremover.removedElementsArray.length;i++)  {
		if (adremover.removedElementsArray[i].parentNode!=null && adremover.removedElementsArray[i].parentNode.nodeName!="BODY") {
			if (adremover.removedElementsArray[i].parentNode.children.length==1) {
				adremover.removedElementsArray[i].parentNode.style.display="none";
				adremover.removedPlaceholdersArray.push(adremover.removedElementsArray[i].parentNode);
				adremover.removedPlaceholders++;
				firstRemoved = true;
			}
			if (adremover.removedElementsArray[i].parentNode.parentNode!=null  && adremover.removedElementsArray[i].parentNode.parentNode.nodeName!="BODY") {
				if (adremover.removedElementsArray[i].parentNode.parentNode.children.length==1 && firstRemoved==true) {
						adremover.removedElementsArray[i].parentNode.parentNode.style.display="none";
						adremover.removedPlaceholdersArray.push(adremover.removedElementsArray[i].parentNode.parentNode);
						adremover.removedPlaceholders++;
				}
			}
		}
		firstRemoved = false;
	}
	for (var j = 0;j<adremover.removedImagesArray.length;j++)  {
		if (adremover.removedImagesArray[j].parentNode!=null) {
			if (adremover.removedImagesArray[j].parentNode.children.length==1 && adremover.removedImagesArray[j].parentNode.nodeName!="BODY") {
				adremover.removedImagesArray[j].parentNode.style.display="none";
				adremover.removedPlaceholdersArray.push(adremover.removedImagesArray[j].parentNode);
				adremover.removedPlaceholders++;
				firstRemoved = true;
			}
			if (adremover.removedImagesArray[j].parentNode.parentNode!=null && adremover.removedImagesArray[j].parentNode.parentNode.nodeName!="BODY") {
				if (adremover.removedImagesArray[j].parentNode.parentNode.children.length==1 && firstRemoved==true) {
						adremover.removedImagesArray[j].parentNode.parentNode.style.display="none";
						adremover.removedPlaceholdersArray.push(adremover.removedImagesArray[j].parentNode.parentNode);
						adremover.removedPlaceholders++;
				}
			}
		}
		firstRemoved = false;
	}
},
createPopup: function() {
	//getting information about removed elements
	var string2 = "";
	for (var h = 0;h<adremover.removedSpecialPopupsArray.length;h++) {
		string2+="Special Popup [id="+adremover.removedSpecialPopupsArray[h]+"]<br>";
	}
	for (var i = 0;i<adremover.removedElementsArray.length;i++) {
		if (adremover.removedElementsArray[i]!=null) {
			string2+=adremover.removedElementsArray[i].tagName+" [class="+adremover.removedElementsArray[i].className+"] [id="+adremover.removedElementsArray[i].getAttribute("id")+"]<br>";
		}
	}
	for (var j = 0;j<adremover.removedImagesArray.length;j++) {
		if (adremover.removedImagesArray[j]!=null) {
			string2+=adremover.removedImagesArray[j].tagName+" [class="+adremover.removedImagesArray[j].className+"] [id="+adremover.removedImagesArray[j].getAttribute("id")+"] [src="+adremover.removedImagesArray[j].getAttribute("src")+"]<br>";
		}
	}
	for (var k = 0;k<adremover.removedObjectsArray.length;k++) {
		string2+="Iframe/Object [src="+adremover.removedObjectsArray[k]+"]<br>";
	}
	for (var l = 0;l<adremover.removedPlaceholdersArray.length;l++) {
		string2+="PH: "+adremover.removedPlaceholdersArray[l].tagName+" [class="+adremover.removedPlaceholdersArray[l].className+"] [id="+adremover.removedPlaceholdersArray[l].getAttribute("id")+"]<br>";
	}
	//Create popup
	document.getElementsByTagName("body")[0].appendChild(document.createElement("adremoverpopup"));
	var adpopup = document.getElementsByTagName("adremoverpopup")[0];
	var left = (window.innerWidth - 500) / 2;
	var top = (window.innerHeight - 350) / 2;
	adpopup.style.top=top + "px";
	adpopup.style.left=left + "px";
	adpopup.style.background="rgba(200,200,200,0.9)";
	adpopup.style.border="1px black solid";
	adpopup.style.position="fixed";
	adpopup.style.fontFamily="Arial";
	adpopup.style.lineHeight="17px";
	adpopup.style.display="block";
	adpopup.style.width="500px";
	adpopup.style.height="350px";
	adpopup.style.zIndex="999999999999";
	adpopup.style.borderRadius="3px";
	adpopup.style.transition="opacity 0.2s ease";
	adpopup.style.textAlign="left";
	adpopup.style.paddingLeft="5px";
	adpopup.style.overflow="scroll";
	adpopup.style.color="black";
	adpopup.style.boxShadow="0px 0px 2px 3px rgba(0,0,0,0.5)";
	adpopup.style.opacity="1";
	var string1 = "<span style='left:-1px;background:rgb(245,233,237);width:97%;margin-left:0px;position:absolute;padding:7px;font-family:Arial;font-size:16px;font-weight:bold;color:black;'>AdRemover " + adremover.thisScriptVersion +"</span>";
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>Status</span><br>";
	string1+="Runtime: "+adremover.AR_milliseconds+" ms";
	string1+="<br>"+adremover.labelTextes[0]+": "+(adremover.removedElements+adremover.removedObjects+adremover.removedImages);
	string1+="<br>"+adremover.labelTextes[1]+": "+adremover.removedElements;
	string1+="<br>"+adremover.labelTextes[2]+": "+adremover.removedImages;
	string1+="<br>"+adremover.labelTextes[3]+": "+adremover.removedObjects;
	string1+="<br>"+adremover.labelTextes[17]+": "+adremover.removedPlaceholders;
	string1+="<br><input type=button value='"+adremover.labelTextes[5]+"' onclick=adremover.closePopup();>";
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-family:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>Extras</span><br>";
	string1+="<input type=button value='"+adremover.labelTextes[6]+"' onclick=adremover.restoreAds(this);><br>";
	string1+="<input onchange=adremover.changeBlacklist(this); type=checkbox";
	if (adremover.checkForBlacklist(document.location.host)==false) {
		string1+=" checked";
	}	
	string1+="> "+adremover.labelTextes[7];
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>"+adremover.labelTextes[8]+"</span><br>";
	string1+="<input onclick=adremover.setAR_elements_activated(this); type=checkbox";
	if (adremover.AR_elements_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[9]+"<br>";
	string1+="<input onclick=adremover.setAR_images_activated(this); type=checkbox";
	if (adremover.AR_images_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[10]+"<br>";
	string1+="<input onclick=adremover.setAR_objects_activated(this); type=checkbox";
	if (adremover.AR_objects_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[11]+"<br>";
	string1+="<input onclick=adremover.setAR_placeholders_activated(this); type=checkbox";
	if (adremover.AR_placeholders_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[12]+"<br>";
	string1+="<input onclick=adremover.setAR_minimode_activated(this); type=checkbox";
	if (adremover.AR_minimode_activated==true) {
		string1+=" checked";
	}
	string1+="> "+adremover.labelTextes[20]+"<br>";
	string1+="<br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>"+adremover.labelTextes[18]+"</span><br>";
	string1+=adremover.labelTextes[19]+": ich01";
	string1+="<br>Homepage: <a href=http://userscripts.org/scripts/show/159351 target=_blank alt=Homepage>*click*</a>";
	string1+="<br>Copyright: 2014+, ich01";
	string1+="<br><br>";
	string1+="<span style='background-color:rgba(118,105,199,0.7);color:white;font-weight:bold;font-famliy:Arial;width:50%;border-radius:3px;padding:1px;position:absolute;'>Details</span><br>";
	string1+=string2;
	adpopup.innerHTML=string1;
},
startCleaning: function() {
	if (adremover.AR_elements_activated==true) {
		adremover.removeElements();
	}
	if (adremover.AR_placeholders_activated==true) {
		adremover.removePlaceholders();
	}
	if (adremover.removedElements>0 || adremover.removedObjects>0 || adremover.removedImages>0) {
		if (adremover.AR_minimode_activated==false) {
			adremover.createInfoElement();
		} else {
			adremover.createMiniInfoElement();
		}
	}
},
closePopup: function() {
	var adpopup = document.getElementsByTagName("adremoverpopup")[0];
	adpopup.style.opacity="0";
	setTimeout("adremover.closePopup2()", 300);
},
closePopup2: function() {
	var adpopup = document.getElementsByTagName("adremoverpopup")[0];
	adpopup.style.display="none";
	adpopup.outerHTML="";
},
setAR_elements_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_elements_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_elements_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_images_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_images_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_images_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_objects_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_objects_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_objects_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_placeholders_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_placeholders_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_placeholders_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
setAR_minimode_activated: function(formelement) {
	if (formelement.checked==true) {
		GM_setValue("AR_minimode_activated",true);
	} else if (formelement.checked==false) {
		GM_setValue("AR_minimode_activated",false);
	} else {
		alert(adremover.labelTextes[14]);
	}
},
getARSettings: function() {
	//Elements
	if (GM_getValue("AR_elements_activated")!=null && GM_getValue("AR_elements_activated")!=undefined) {
		adremover.AR_elements_activated = GM_getValue("AR_elements_activated");
	} else {
		GM_setValue("AR_elements_activated",true);
		adremover.AR_elements_activated = true;
	}
	//Objects
	if (GM_getValue("AR_objects_activated")!=null && GM_getValue("AR_objects_activated")!=undefined) {
		adremover.AR_objects_activated = GM_getValue("AR_objects_activated");
	} else {
		GM_setValue("AR_objects_activated",true);
		adremover.AR_objects_activated = true;
	}
	//Images
	if (GM_getValue("AR_images_activated")!=null && GM_getValue("AR_images_activated")!=undefined) {
		adremover.AR_images_activated = GM_getValue("AR_images_activated");
	} else {
		GM_setValue("AR_images_activated",true);
		adremover.AR_images_activated = true;
	}
	//Placeholders
	if (GM_getValue("AR_placeholders_activated")!=null && GM_getValue("AR_placeholders_activated")!=undefined) {
		adremover.AR_placeholders_activated = GM_getValue("AR_placeholders_activated");
	} else {
		GM_setValue("AR_placeholders_activated",true);
		adremover.AR_placeholder_activated = true;
	}
	//Mini Info enabled
	if (GM_getValue("AR_minimode_activated")!=null && GM_getValue("AR_minimode_activated")!=undefined) {
		adremover.AR_minimode_activated = GM_getValue("AR_minimode_activated");
	} else {
		GM_setValue("AR_minimode_actived",false);
		adremover.AR_minimode_activated = false;
	}
},
restoreAds: function(formelement) {
	var restoredElements = 0;
	for (var i = 0;i<adremover.removedElementsArray.length;i++) {
		if	(adremover.removedElementsArray[i]!=null) {
			adremover.removedElementsArray[i].style.display="block";
			restoredElements++;
		}
	}
	for (var j = 0;j<adremover.removedImagesArray.length;j++) {
		if (adremover.removedImagesArray[j]!=null) {
			adremover.removedImagesArray[j].style.display="block";
			restoredElements++;
		}
	}
	for (var k = 0;k<adremover.removedPlaceholdersArray.length;k++) {
		if (adremover.removedPlaceholdersArray[k]!=null) {
			adremover.removedPlaceholdersArray[k].style.display="block";
			restoredElements++;
		}
	}
	console.log("Restored "+restoredElements+" elements");
	formelement.value=adremover.labelTextes[13];
	formelement.disabled=true;
}
};
//Init AdRemover
if (navigator.userAgent.toLowerCase().indexOf("firefox")>-1) {
		window.adremover = uw.adremover;
		console.log("Firefox detected. Compatibility mode enabled.");
}
adremover.initAdremover();
var endTime = new Date().getMilliseconds();
var endTimeSeconds = new Date().getSeconds();
var fullTime = -1;
fullTime = endTime - adremover.startTime;
fullTime+= ((endTimeSeconds-adremover.startTimeSeconds)*1000);
GM_registerMenuCommand("AdRemover Settings",function() {adremover.createPopup();});
adremover.AR_milliseconds=fullTime;
console.log("AdRemover "+adremover.thisScriptVersion+" has finished it's work! ["+fullTime+" ms]");
setTimeout("adremover.secondRun()",4000);