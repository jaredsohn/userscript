/**
* This program is copyright PlayerScripts.com, a division of TinHat Software Ltd.
* We grant you a liscence for personal, private and non-commercial use only.
* Please refer to playerscripts.com for further information.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

// ==UserScript==
// @name          Mafia Wars Remove job Delay
// @namespace     MWRemoveJobDelay
// @description   	This script removes the delay found on the Italy and LasVegas jobs, and Operations. That's it. 
// @include       	http://apps.facebook.com/inthemafia/*
// @include       	http://facebook.mafiawars.com/mwfb/*
// @exclude         http://www.facebook.com/*
// @exclude			http://facebook.mafiawars.com/mwfb/xd_receiver.htm*
// @exclude			http://facebook.mafiawars.com/mwfb/iframe_proxy.php*
// @version       	0.1.7
// @contributor   	Shrubber
// ==/UserScript==

var SUC_script_num = 97253;
var script_version = "0.1.7"

// Global variables
// anything starting with gvar is a GLOBAL variable.
var gvar	=	{}; 

// Pointers to Utilities
var g_Utils             = new Utilities();

// GM API Check
var GMSTORAGE_PATH = 'MWRD';
GM_ApiBrowserCheck()

/**** Start Main Code ****/

// FB and MW Detection
// We are only worried about the URL detection because of the excludes

// main window will get processed here
gvar.strFrameId = 'Ignore'
if (self.location.href.indexOf('http://apps.facebook.com/inthemafia/') != -1) {
	gvar.strFrameId = 'FaceBook'
} else if (self.location.href.indexOf('http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=index') != -1) {
	gvar.strFrameId = 'MafiaWars'
}
	

GM_log('gvar.strFrameId = '+gvar.strFrameId);

if ( gvar.strFrameId == 'FaceBook') {
	
	var oDom;
	
	// Reset the height of the Mafia Wars iFrame, because Zygna cannot get this right in Chrome
	oDom = document.getElementsByName('mafiawars');
	if (oDom.length != 0) {oDom[0].style.height = '3000px'; GM_log('reset window height');}
    
} else if ( gvar.strFrameId == 'MafiaWars') {
	
	GM_log('load Mafia Wars');
	
	// Set up Event Based processing
	gvar.pass       	 	= 0,
	gvar.change_count    	= 0,
	gvar.notify_count    	= 0,
	gvar.scheduled       	= false;
    gvar.bDebugOn           = false,
   	gvar.bSetting           = false,
    gvar.bSetting_reset     = false;
	gvar.iOnloadEvent 		= 0;
	
    // This listner is what get's things going.  It listens for DOM changes
    document.addEventListener("DOMNodeInserted", function (_obj) {
        gvar.change_count++;
        if (!gvar.scheduled && gvar.change_count > 2 ) schedNotify();
    },
    false);

    // This listner closes anything out when the windows close.
    
    
    window.addEventListener("unload", function (_obj) {
        try {
            GM_log('Scripts are unloading.  Frame = '+gvar.strFrameId);
        } catch(_errObj) {
            GM_log('Something bad has happend - '+_errObj.message);
        }
    },
    false);
    
} else {
	GM_log('Load nothing')
}

// Main Loop

function MainLoop(){
    var oDom, oSnapShot
    var i1, i2, strTemp;
	
	//GM_log('Main Loop');
	
	// LV and Italy
	oSnapShot = g_Utils.getSnapshot('//a[contains(@onclick,"return MapController.panelButtonDoJob")]')
	//GM_log('oSnapShot.snapshotLength = '+oSnapShot.snapshotLength);
	for (var i=0; i<oSnapShot.snapshotLength; i++) {
		//GM_log('i = '+i);
		oDom = oSnapShot.snapshotItem(i)
		strTemp = oDom.getAttribute('onclick');
		strTemp = strTemp.replace('MapController.panelButtonDoJob','MapController.panelDoJob');
		oDom.setAttribute('onclick',strTemp);
	}
	
	//Operations
	oSnapShot = g_Utils.getSnapshot('//a[contains(@onclick,"SocialMissionController.doTask")]')
	GM_log('oSnapShot.snapshotLength = '+oSnapShot.snapshotLength);
	for (var i=0; i<oSnapShot.snapshotLength; i++) {
		//GM_log('i = '+i);
		oDom = oSnapShot.snapshotItem(i)
		oDom.setAttribute('disabled','');
		oDom.setAttribute('class','sexy_button_new do_job sexy_energy_new medium orange');
	}
	
}

/**** DOM Notify and Change Code ****/

/**** DOM Notify and Change Code ****/

function notifyChange() {
    if (gvar.notify_count == gvar.change_count) MainLoop();
    if (gvar.notify_count != gvar.change_count) {
        schedNotify();
        return;
    }
    gvar.scheduled = false;
};

function schedNotify() {
    gvar.scheduled = true;
    gvar.notify_count = gvar.change_count;
    gvar.iOnloadEvent = setTimeout(function (_obj) {
        notifyChange();
    },
    100);
};

/**** General Javascript Utilies ****/
function Utilities() {
	// making them public
    this.getSnapshot        = getSnapshot;

    
    // get a Snapshot based on an XPath
	function getSnapshot(_strPattern,_doc) {
	    // default is document if _doc is not provided
	    return document.evaluate(_strPattern, _doc||document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
}

/*****				GreaseMonkey API Utils				*****/

// GM Api Checker
function GM_ApiBrowserCheck() {
	gvar.isGreaseMonkey=false; 

	// replace unsafeWindow
	if( typeof(unsafeWindow)=='undefined') { unsafeWindow = window; }
	
	// replace GM_log
	if(typeof(GM_log)=='undefined') { 
		GM_log = function(msg) { 
			try { 
				unsafeWindow.console.log('GM_log: '+msg); 
			} catch(_errObj) {
				//nothing in here
			} 
		}; 
	}
	
	var needApiUpgrade=false;
	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError;
	}
	
	// Test for issues with GM API
	if(typeof(GM_setValue)!='undefined') {
		var gsv=GM_setValue.toString();
		if (gsv.indexOf('staticArgs')>0) { 
			gvar.isGreaseMonkey=true; 
			GM_log('GreaseMonkey Api detected...'); 
		} else if(/not\s+supported/.test(gsv)) { 									// test GM_hitch 
			needApiUpgrade=true; 
			isBuggedChrome=true; 
			GM_log('Bugged Chrome GM Api detected...'); 
		}
	} else { 
		needApiUpgrade=true; GM_log('No GM Api detected...'); 
	}
	
	// Define GM_getValue, GM_setValue, GM_deleteValue
	if(!needApiUpgrade) {
		GM_log('Upgrading actual GM storage functions for objects, arrays, etc');
		GM_getValue_old = GM_getValue;
		GM_setValue_old = GM_setValue;
		
		GM_getValue=function(name,defValue) {
			var strTemp;
			if(typeof(defValue) == 'undefined')
				strTemp = GM_getValue_old(GMSTORAGE_PATH+'.'+name)		
			else
				strTemp = GM_getValue_old(GMSTORAGE_PATH+'.'+name,JSON.stringify(defValue));
				
			if (typeof(strTemp) == 'undefined')
				return strTemp
			else 
				return JSON.parse(strTemp);
		}
		GM_setValue=function(name,value) {
			GM_setValue_old(GMSTORAGE_PATH+'.'+name,JSON.stringify(value));
		}
		
	} else {
		GM_log('Try to recreate needed GM Api...');
		GM_log('Using [' +  GMSTORAGE_PATH  + '] as storage path.');
		var ws=null; 
		try { 
			ws=typeof(unsafeWindow.localStorage); 
			unsafeWindow.localStorage.length; 
		} catch(_errObj) { 																// Catch Security error
			ws=null; 
		} 
		if(ws=='object') {
			GM_log('Using localStorage for GM Api.');
			
			GM_getValue=function(name, defValue) {
				var strTemp
				
				strTemp = localStorage.getItem(GMSTORAGE_PATH+'.'+name);
				if (strTemp != null) 
					return JSON.parse(strTemp)
				else
					return defValue
			};
			
			GM_setValue=function(name,value) {
				if (typeof(value) != 'undefined')
					localStorage.setItem(GMSTORAGE_PATH+'.'+name, JSON.stringify(value))
			}	
			
			GM_deleteValue=function(name) { 
				unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+'.'+name); 
			}
			GM_listValues=function() {
				var value = [];
				for(var i=0; i<unsafeWindow.localStorage.length; i++) value[i] = unsafeWindow.localStorage[i];
				return value;
			}
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
			GM_log('Using temporarilyStorage for GM Api.'); 
			gvar.temporarilyStorage = new Array();
			GM_getValue=function(name,defValue) {
				if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name])=='undefined') { 
					return defValue; 
				} else { 
					return gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name]; 
				}
			}
			GM_setValue=function(name,value) { 
					gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name]=value; 
			}
			GM_deleteValue=function(name) { 
				delete gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name]; 
			};
			GM_listValue=function() { 
				var value = [];
				var i = 0;
				for(var ID in gvar.temporarilyStorage) {value[i] = ID; i++};
				return value;
			}
		}
		
		// replace Open in Tab
		if(typeof(GM_openInTab)=='undefined') { 
			GM_openInTab=function(url) { 
				unsafeWindow.open(url,""); 
			} 
		}
		
		// replace GM_registerMenuCommand
		if((typeof(GM_registerMenuCommand)=='undefined')||(isBuggedChrome)) { 
			GM_registerMenuCommand=function(name,cmd) { 								// Dummy
				GM_log("Notice: GM_registerMenuCommand is not supported."); 
			} 
		}
		
		//update XMLHttpRequest
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
	  		GM_log('Using XMLHttpRequest for GM Api.');
	  		GM_xmlhttpRequest=function(obj) {
	        	var request=new XMLHttpRequest();
	        	try { 
		        	request.open(obj.method,obj.url,true); 
		        } catch(_errObj) { 
			        if(obj.onerror) { 
				        obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'}); 
				    }; 
				    return; 
				}
		        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
	        	if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }      
		        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
		        request.send(obj.data); return request;
	    	}
		}
	}

}