// ==UserScript==
// @name           LokalistenZoomPics
// @author	       livinskull
// @version	       1.06
// @description    Displays the largest version of smaller photos on lokalisten.de.
// @namespace      http://userscripts.org/users/livinskull
// @include        http://*lokalisten.de/*
// ==/UserScript==

/* Image types
 * http://images.lokalisten.de/photos/a/2009/08/06/19/01/2258881_1249578665137t.jpg		tiny
 * http://images.lokalisten.de/photos/a/2009/08/06/19/01/2258881_1249578665137m.jpg		medium
 * http://images.lokalisten.de/photos/a/2009/08/06/19/01/2258881_1249578665137l.jpg		large
 */


/* parts of the code taken from StudivzZoomPics by Dorian Scholz */


var popupDelayTime = GM_getValue("popupDelayTime", 500);
var delayedPopupObj = null;
var delayedPopupEvent = null;
var maxZoomFactor = GM_getValue("maxZoomFactor", 2.5);
var initial = true;
var urls = '';

function addGlobalStyle(css) {
  var head = document.getElementsByTagName('head')[0];
  if (head) { 
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
}

function injectCode() {
	var oImages = document.getElementsByTagName('img');
	
	/* Image zooming */
	for (i=0; i < oImages.length; ++i) {
		var sLargeImgUrl = oImages[i].src.substring(0, oImages[i].src.length - 5) + 'l' + oImages[i].src.substring(oImages[i].src.length - 4, oImages[i].src.length);
		
		if (oImages[i].getAttribute("largeDivId") == null) {
			if (oImages[i].src.match(/http:\/\/images(\.l[0-9]+)?\.lokalisten\.de\/photos\/(a|a-gal|grp|grp-gal|m)\/[0-9]+\/[0-9]+\/[0-9]+\/[0-9]+\/([0-9]+\/)?[0-9]+_[0-9]+[tm]\.jpg/i)) {
				var oLoadingImg = document.createElement("img");
				oLoadingImg.src = "http://www.lokalisten.de/img/loader/ajax_l.gif";
				
				var oLargeDiv = document.createElement("div");
				oLargeDiv.appendChild(oLoadingImg);
				oLargeDiv.setAttribute("name", "largeDiv");
				oLargeDiv.id = "largeDiv:" + sLargeImgUrl;
				oLargeDiv.className = "divPopup";
				document.body.appendChild(oLargeDiv);
				
				urls += sLargeImgUrl + '\n';

				oImages[i].setAttribute("largeDivId", oLargeDiv.id);
				oImages[i].addEventListener('mouseover', mouseOver, true);
				oImages[i].addEventListener('mousemove', mouseMove, true);
				oImages[i].addEventListener('mouseout', mouseOut, true);
			}
		}
	}
	
	//GM_log(urls);
	/* comment showing */
	/*var oLinks = document.getElementsByTagName('a');
	
	for (i=0; i < oLinks.length; ++i) {
		aLinkMatch = Array();
		if (aLinkMatch = oLinks[i].href.match(/\/web\/user\/show\/imageComment\.do\?imgId=([0-9]+)/)) {
			var oLargeDiv = document.createElement("div");
			var oLoadingImg = document.createElement("img");
			
			oLoadingImg.src = "http://www.lokalisten.de/img/loader/ajax_l.gif";			
			oLargeDiv.appendChild(oLoadingImg);
			oLargeDiv.setAttribute("name", "commentDiv");
			oLargeDiv.id = "commentDiv:" + aLinkMatch[1];
			oLargeDiv.className = "divPopup";
			document.body.appendChild(oLargeDiv);

			oLinks[i].setAttribute("largeDivId", oLargeDiv.id);
			oLinks[i].addEventListener('mouseover', mouseOver, true);
			oLinks[i].addEventListener('mousemove', mouseMove, true);
			oLinks[i].addEventListener('mouseout', mouseOut, true);
		}
	}*/
	
	
	if (initial && document.getElementById('l_innerContent') && document.location == 'http://www.lokalisten.de/web/showHome.do') {
		/* settings */
		var oSettingsDiv = document.createElement("div");
				
		oSettingsDiv.id = 'ZoomPicsSettings';
		oSettingsDiv.className = 'divZoomPicsSettings';
		document.body.appendChild(oSettingsDiv);
	
		var oSettingsLink = document.createElement('a');
		oSettingsLink.href = '#';
		oSettingsLink.className = 'editBt';
		oSettingsLink.innerHTML  = '<span><img src="/img/btn/edt.gif" />LokalistenZoomPics-Settings</span>';
		
		x = document.getElementsByClassName('salutationBar')[0];
		x.insertBefore(oSettingsLink, x.getElementsByClassName('clear')[0]);
		
		oSettingsLink.addEventListener("click", showSettings, true);
		
		initial = false;
	}
}

function mouseOver(event) {
	delayedPopupObj = document.getElementById(this.getAttribute("largeDivId"));
	delayedPopupEvent = event;
	delayedPopupTimeout = window.setTimeout(showDelayedPopup, popupDelayTime);
}

function mouseOut(event) {
	var divObj = document.getElementById(this.getAttribute("largeDivId"));
	window.clearTimeout(delayedPopupTimeout);
	divObj.style.visibility = "hidden";
}

function showDelayedPopup() {
	var sUrl = '';
	if (delayedPopupObj.id.substring(0,9) == 'largeDiv:') {
		sUrl = delayedPopupObj.id.substring(9, delayedPopupObj.id.length);
		
		if (delayedPopupObj.firstChild.src != sUrl) {
		GM_xmlhttpRequest({
			method: "GET",
			url: sUrl,
			onload: function (resp) {
				if (resp.status == 200) {
					obj = document.getElementById('largeDiv:' + resp.finalUrl);
					obj.firstChild.src = resp.finalUrl;
					recalcPopup(delayedPopupObj.id, delayedPopupEvent);
				}
			}
		});
		}
	} /*else {
		iId = delayedPopupObj.id.substring(11, delayedPopupObj.id.length);
		sUrl = 'http://www.lokalisten.de/web/user/accountImage/manageImageTag.do?comments=1&imgId=' + iId + '&method=ajaxLoadComments&imageId=' + iId;
		
		if (delayedPopupObj.firstChild.src != sUrl) {
		GM_xmlhttpRequest({
			method: "GET",
			url: sUrl,
			onload: function (resp) {
				if (resp.status == 200) {
					delayedPopupObj.innerHTML = resp.responseText;
					//recalcPopup(delayedPopupObj.id, delayedPopupEvent);
					//delayedPopupObj
				}
			}
		});
		}
	}*/
	
	delayedPopupObj.style.visibility = "visible";
  
}

function mouseMove(event) {
	recalcPopup(this.getAttribute("largeDivId"), event);
}

function recalcPopup(sDivId, event) {
	var divObj = document.getElementById(sDivId);
	var imgObj = divObj.firstChild;
	
	var x = 0, y = 0, maxWidth = 0, maxHeight = 0, zoomFaktor = 0; 
	// check which side of the cursor has more space left
	if(event.pageX < (window.innerWidth / 2)) {
	  x = event.pageX + 10;
	  maxWidth = window.innerWidth - (event.pageX + 50);
	} else {
	  x = event.pageX - (5 + divObj.offsetWidth); // show large image left from cursor
	  maxWidth = event.pageX - 20;
	}
	
	// zoom image to max size, so it still fits in the window
	maxHeight = window.innerHeight - 20;
	zoomFaktor = Math.min(maxZoomFactor, maxHeight / imgObj.naturalHeight, maxWidth / imgObj.naturalWidth);
	imgObj.width = imgObj.naturalWidth * zoomFaktor;
	imgObj.height = imgObj.naturalHeight * zoomFaktor;
	
	// if the zoomed image still fits on the left side of the cursor, put it there
	if(event.pageX - (5 + divObj.offsetWidth) >= 0) {
	  x = event.pageX - (5 + divObj.offsetWidth); // show large image left from cursor
	}
	
	y = event.pageY - (divObj.offsetHeight / 2); // show large image centered beside the cursor
	// don't let it slide out the top or bottom of the window
	y = Math.min(y, window.pageYOffset + window.innerHeight - divObj.offsetHeight - 5);
	y = Math.max(y, window.pageYOffset + 5);
	

	divObj.className = "divPopup";
	divObj.style.left = x + "px";
	divObj.style.top = y + "px";

}

function DOMAttrModified(event) {
	if (event.target.id != '' && event.target.id.substring(0, 9) != "largeDiv:") { // don't reload on empty or self generated events
		injectCode(); 
	}
}

function showSettings() {
	var settingsDiv = document.getElementById('ZoomPicsSettings');
	var settingsHtml = '<div style="background-color: #CCFF00; padding: 5px; font-weight: bold;">' +
		'LokalistenZoomPics Settings<div style="float: right;"><a href="#" id="settingsCloseLink">[X]</a></div></div>' +
		'<div style="margin-top: 10px; font-size: 80%;">' +
		'max zoom factor (default: 2.5): <div style="float:right;"><input id="settingszoomfactor" type="text" value="'+maxZoomFactor+'"/></div><br/><br/>' +
		'popup delay time (ms) (default: 500): <div style="float:right;"><input id="settingsdelay" type="text" value="'+popupDelayTime+'"/></div><br/><br/>' +
		'<div style="text-align: center; font-size: small;"><a href="http://userscripts.org/scripts/show/57899" target="_blank">LokalistenZoomPics</a> by livinskull</div>' +
		'</div>';
	
	settingsDiv.style.left = (window.innerWidth / 2 - 250)  + 'px';		// 250 = width/2
	settingsDiv.style.top = '50px';
	settingsDiv.innerHTML = settingsHtml;
	document.getElementById('settingsCloseLink').addEventListener("click", closeSettings, true);
	
	settingsDiv.style.visibility = 'visible';
	//unsafeWindow['Effect'].Grow('ZoomPicsSettings');
}

function closeSettings() {
	maxZoomFactor = document.getElementById('settingszoomfactor').value;
	GM_setValue("maxZoomFactor", maxZoomFactor);
	popupDelayTime = document.getElementById('settingsdelay').value;
	GM_setValue("popupDelayTime", popupDelayTime);
	document.getElementById('ZoomPicsSettings').style.visibility = 'hidden';
}

injectCode();
addGlobalStyle('.divPopup {visibility: hidden; position: absolute; z-index: 1000001; padding: 3px; background-color: #99CC00;}');
addGlobalStyle('.divZoomPicsSettings {visibility: hidden; position:fixed; z-index: 1000001; width: 500px; /*margin: 0 auto;*/ padding: 5px; background-color: #99CC00;}');
document.addEventListener("DOMAttrModified", DOMAttrModified, false);
