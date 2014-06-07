// Safeconnect AutoLogin v2.5
// (c) 2005-2006, Clem
//		Altered 2010 by NINJ4
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//												ALSO works in Google Chrome: http://www.google.com/chrome
//
// Combine with 'Allow Password Remembering' for perfect auto-login =)
// --------------------------------------------------------------------
// ==UserScript==
// @name          Safeconnect AutoLogin
// @namespace     http://labs.beffa.org/greasemonkey/
// @description   Automatic Login for TCNJ's Safeconnect System
// @include		http://auth.impulse.com/*
// @include		https://auth.impulse.com/*
// @include		http://safeconnect.tcnj.edu:8008/*
// @include		https://safeconnect.tcnj.edu:8008/*
// @include		http://198.31.193.211:8008/*
// @include		https://198.31.193.211:8008/*
// @include		https://wireless-at-tcnj.tcnj.edu/*
// @include		http://www.tcnj.edu/
// ==/UserScript==

(function() {
var al_KeyPressed = false;
var al_isWireless = false;
	//Chrome compatibility:
	// author         GIJoe (http://userscripts.org/topics/41177)
	// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
	
	//--- to test localStorage in firefox
	//delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
	var gvar=function() {} // Global variables
	function GM_ApiBrowserCheck() {
	  const GMSTORAGE_PATH = 'GM_'; // You can change it to avoid conflict with others scripts
	  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
	  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
	  GM_clog=function(msg) { if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
	  GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
	    var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
	    var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
	    if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
	    return sel;
	  }
	  var needApiUpgrade=false;
	  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
	    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
	  }
	  if(typeof(GM_setValue)!='undefined') {
	    var gsv=GM_setValue.toString();
	    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
	    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
	  } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }
	
	  if(needApiUpgrade) {
	    GM_log('Try to recreate needed GM Api...');
	    var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
	    if(ws=='object') {
	      GM_log('Using localStorage for GM Api.');
	      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
	      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
	      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
	    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
	      GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
	      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
	      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
	      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
	    }
	    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
	    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
	    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
	      GM_log('Using XMLHttpRequest for GM Api.');
	      GM_xmlhttpRequest=function(obj) {
	        var request=new XMLHttpRequest();
	        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
	        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
	        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
	        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
	        request.send(obj.data); return request;
	  } } }
	}
	//End of Chrome compatibility

var al_tcnjChange = function() {
	var hpage = prompt("Please enter the homepage you'd like to\nredirect to after logging into safeconnect:","http://www.google.com/ig");
	if ( hpage.indexOf(  'http:\/\/' ) <= 0 ) {
		hpage = 'http:\/\/' + hpage;
	}
	GM_setValue( 'homepage', hpage );
}
function gup( name )
{
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}
var al_Init = function() {
	//Check for Chrome	
	GM_ApiBrowserCheck();
	//check for wireless
	if ( String(document.location).indexOf('wireless-at-tcnj.tcnj.edu') > 0 ) {
		if ( gup( 'fail' ) != '' ) {
			window.location.replace( 'http:\/\/' + gup( 'dest' ) );
			return;
		}
			al_isWireless = true;//Only really important for Chrome
	}
	//SAFECONNECT CHANGES
	if ( gvar.isGreaseMonkey ) {
		GM_registerMenuCommand( "Change Safeconnect AutoLogin Homepage", al_tcnjChange );
	}

	if ( GM_getValue( 'homepage' ) == null ) {
		if ( ( gvar.isGreaseMonkey ) || ( String(document.location).indexOf('www.tcnj.edu') > -1 ) ) { //selects for when needed in chrome
			al_tcnjChange();
		}
	}
	if ( ( String(document.location).indexOf('www.tcnj.edu') > 0 ) && ( GM_getValue( 'safeconnected', false ) ) ) {
		//if ( document.referrer.indexOf( 'safeconnect' ) > 0 ) { 
			GM_setValue( 'safeconnected', false );
			window.location.replace( GM_getValue( 'homepage' ) );
		//}
	}

	
	
	//*///SAFECONNECT CHANGES OVER
	//Now back to Clem's regular script---
	var passfield = false;
	if (!document.getElementsByTagName) return;
	var forms = document.getElementsByTagName("form");
	for (var i=0;i<forms.length;i++) {
		var formElement = forms[i].elements;
		for (var j=0; j < formElement.length; j++) {
			var thisElement = formElement[j];
			if (thisElement.type == "password") {
				
					//Apparently we're dealing with safeconnect, right?
					if ( ( String(document.location).indexOf('safeconnect') > 0 ) || ( String(document.location).indexOf('auth.impulse.com') > 0 ) || ( String(document.location).indexOf('198.31.193.211:8008') > 0 ) ) { GM_setValue( 'safeconnected', true ); }
				/////That's really it for safeconnect//////////////////////
				
				//this if statement broke the script in FF 3.6.3 and GM 0.8.20100408.6
				//This isn't a perfect remedy, but works for TCNJ Safeconnect
				//to prevent submit to stupid site which put fake login / pass value
				//if (thisElement.value != thisElement.defaultValue) {
				
				//Chrome doesn't discriminate between enabled sites and everything else, so another check is necessary:
				//remove this if statement and it's corresponding "}" to enable autologin on every page
				if ( ( gvar.isGreaseMonkey ) || ( GM_getValue( 'safeconnected', false ) ) || ( al_isWireless ) ) {
					passfield = true;
					thisElement.addEventListener('keypress', al_KeyPress, true); 
				}
				
				
				//}
			}
		}
	}
	if (passfield)
		setTimeout(al_CheckPass, 10);
}

var al_KeyPress = function (){
	al_KeyPressed = true;
}

var al_CheckPass = function () {
	if (!al_KeyPressed) {
		if (!document.getElementsByTagName) return;
		var forms = document.getElementsByTagName("form");
		for (var i=0;i<forms.length;i++) {
			var formElement = forms[i].elements;
			for (var j=0; j < formElement.length; j++) {
				var thisElement = formElement[j];
				if (thisElement.type == "password") {
					if(thisElement.value.length>1){
						submit = false;
						for (var input, k=0; input=formElement[k]; k++)
							if (input.type == "submit")
								submit = input;
					
						if (submit) {
							submit.click();
						} else {
							forms[i].submit();
						}
			
						return;
					}
				}
			}
		}
		setTimeout(al_CheckPass, 100);
	}
}
	
al_Init();
})();