// ==UserScript==
// @name              one more 404
// @namespace      http://ikenie.com/
// @include            *
// ==/UserScript==

(function() {
	function onemore404(doc) {
		GM_xmlhttpRequest({
			method:"GET", 
			url:document.location.href,
			onload:function(x){
				if (x.status == 403) {
					r = 3;
					showFlash(r,this);					
				} else if (x.status == 404) {
					r = Math.floor(Math.random() * 4) + 1;
					showFlash(r,this);
				} else if (x.status == 503) {
					r = 5;
					showFlash(r,this);
				}
			}
		});
	}
	
	onemore404(document);

	setTimeout(function() {
		if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
			window.AutoPagerize.addDocumentFilter(HanamasaDaisuki);
		}
	}, 0);
	
	
function getPageScroll(){

	var yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}

	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}



//
// getPageSize()
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org
// Edit for Firefox by pHaez
//
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}


	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}


//
// pause(numberMillis)
// Pauses code execution for specified time. Uses busy code, not good.
// Code from http://www.faqts.com/knowledge_base/view.phtml/aid/1602
//
function pause(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

function showFlash(roku,thisobj){
	
Scroll(thisobj);


	var file = "http://w.ikenie.com/404/roku_over.swf?roku="+roku;
	var ver = "8,0,0,0";
	if(navigator.appName.indexOf("Microsoft") != -1){
		var br = "ie";
	}else{
		var br = "other";
	}
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();	
	var objBody = document.body;
	var objOverlay = document.createElement("div");
	var myTag= '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+ver+'" width="100%" height="100%" id="overlayFlash" align="middle"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+file+'" /><param name="quality" value="high" /><param name="salign" value="lt" /><param name="wmode" value="transparent" /><param name="bgcolor" value="#ffffff" /><param name="FlashVars" value="br='+br+'" /><embed src="'+file+'" quality="high" salign="lt" swLiveConnect=true wmode="transparent" bgcolor="#ffffff" FlashVars="br='+br+'" width="100%" height="100%" name="overlayFlash" id="overlayFlash" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
	
	objOverlay.setAttribute('id','flashoverlay');
	objOverlay.style.display = 'block';

	objOverlay.style.position = 'absolute';
	objOverlay.style.top = '0';
	objOverlay.style.left = '0';
	objOverlay.style.zIndex = '10000';
 	objOverlay.style.width = '100%';
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.innerHTML = myTag;
	objBody.insertBefore(objOverlay, objBody.firstChild);
}


function hideFlash(){
	var objBody = document.body;
	objBody.removeChild(objBody.firstChild);
}


var eventTimer;
var restScroll=0;

function Scroll(base){
    var obj_base = getElemPosition(base);
    restScroll = 0-obj_base.y;
    eventTimer = setInterval(setScrollPosition,5);
}

function setScrollPosition() {
    var moveValue=0;
    if(Math.abs(restScroll)>80){
        //moveValue = (restScroll>0)?200:-20;
		moveValue = -100;
    }else{
        moveValue = Math.round(restScroll/10);
    }
    scrollBy(0,moveValue);
    restScroll = (restScroll>0)?restScroll-moveValue:restScroll-moveValue;
    if(moveValue==0){
        clearInterval(eventTimer);
        restScroll=0;
    }
}

function getElemPosition(elem) {
    var obj = new Object();
    obj.x = elem.offsetLeft;
    obj.y = elem.offsetTop;
    while(elem.offsetParent) {
        elem = elem.offsetParent;
        obj.x += elem.offsetLeft;
        obj.y += elem.offsetTop;
    }
    return obj;
}

	
	
	
	
})();