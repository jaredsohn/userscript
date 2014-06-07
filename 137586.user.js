// ==UserScript==
// @name           Facebook Scroll Lock blink
// @namespace      W3D
// @description    Scroll Lock blinking on facebook message
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @version        3.2
var fileVers = "3.2";
// @icon           http://dl.dropbox.com/s/8pceogc8y8kpqn5/green_led_on.png
// ==/UserScript==

Array.prototype.equals = function(other) {
	if (this === other) {
		return true;
	}
	if (this.length != other.length) {
		return false;
	}
	for (i in this) {
		if (this[i] != other[i]) {
			return false;
		}
	}
	return true;
}

if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }
	
	GM_registerMenuCommand = function(name, func){
		flyingCommands(name, func);
	}
}
	
flyingCommands = function(name, func) {
	var nameId="menuCommand";
	if(!document.getElementById(nameId)){
			GM_addStyle('\
				#menuCommand { position:fixed;z-index:10001;top:40px;left:10px;padding:5px 5px;background:white;border:1px solid black; border-radius:5px;}\
				#menuCommand *{color:black; text-align:left; font-size:10px; font-family:sans-serif;}\
				#menuCommand p {padding: 0px 5px; text-align:center; cursor:pointer; color: #000000; background-color: #c0c0c0; border-radius:5px; border:1px solid black;}\
				#menuCommand p:hover {background-color: #d0d0d0;}\
			');
			var div = document.createElement('div');
			div.id = nameId;
			document.body.appendChild(div);
	}
	var div = document.getElementById(nameId);
	
	var cmd = document.createElement('p');
	cmd.innerHTML=name;
	div.appendChild(cmd);
	
	cmd.addEventListener('click', function() {
		func();
	}, false);
}

addToFacebookMenus = function(name, func){
	var allElements = document.getElementsByClassName('uiMenuInner');
	for (i in allElements) {
		var menuIn = allElements[i];
		var liin = document.createElement('li');
		liin.id = 'blinkSettings';
		liin.setAttribute('class', 'uiMenuItem uiMenuItemCheckbox uiSelectorOption');
		liin.innerHTML = '<a class="itemAnchor" role="menuitem" href="javascript:void(0)"><span class="itemLabel fsm">'+name+'</span></a>';
		liin.addEventListener('click', function() {
			func();
		}, false);
		menuIn.insertBefore(liin, menuIn.firstChild);
	}
}


//flyingCommands("blink", blink);

//chrome should be compatible now

function blink() {
	//GM_log("blink blink blink blink blink blink blink blink blink");
	/*
	if(sessionStorage.blinkHoldStart==null || sessionStorage.blinkHoldStart=="false"){
		sessionStorage.blinkHoldStart = "true";
		sessionStorage.blinkHoldStop = "false"*/
		setTimeout(	function(){
			GM_xmlhttpRequest({method: "GET", url: "http://127.0.0.1:8000/KeyboardBlink", timeout: "500"});
		}, 100);
		/*setTimeout( function() { //hold it wrapper ... hold any additional calls for some time.. reduce unneeded traffic and beep overflow
			sessionStorage.blinkHoldStart = "false";
		}, 2000);
	}*/
}

function stopBlink() {
	/*if(sessionStorage.blinkHoldStop==null || sessionStorage.blinkHoldStop=="false"){
		sessionStorage.blinkHoldStop = "true";
		sessionStorage.blinkHoldStart = "false"*/
		setTimeout(	function(){
			GM_xmlhttpRequest({method: "GET", url: "http://127.0.0.1:8000/KeyboardStopBlink", timeout: "500"});
		}, 100);
		/*setTimeout( function() { //hold it wrapper ... hold any additional calls for some time.. reduce unneeded traffic and beep overflow
			sessionStorage.blinkHoldStop = "false";
		}, 2000);
	}*/
}

function testBlinkServer() {
	if(sessionStorage.blinkServerTested==null || sessionStorage.blinkServerTested=="false"){
		sessionStorage.blinkServerTested="true";
		setTimeout(	function(){
			GM_xmlhttpRequest({method: "GET", url: "http://127.0.0.1:8000/KeyboardTestBlinkServer", timeout: "500", 
			onload: function (){//server ok
			},
			onerror: function (){//server not on
				alert("Your Blink server (HttpLEDServer.jar) is not running\n(or needs an update)");
			}
			});
		}, 100);
	}
}

//window.setInterval(onload, 5000);
window.addEventListener('load', onload, true);

function onload(){
	checkUpdates();
	testBlinkServer();

	//refreshing on event
	setTimeout(	function(){
		var chat=document.getElementById('fbDockChatTabs');
		//if (!chat) GM_log("didnt get chat");
		if(chat){
			chat.addEventListener("DOMNodeInserted", numMessagesFind, false);
			setTimeout(function (){numMessagesFind();}, 500);
		}
		
		addToFacebookMenus("Blinker Settings...",setup);
	}, 1000);
}
var blockedPeople = localStorage.blinkScrollBlocked;

var prevFound=[];
//flyingCommands("Out prevFound",function(){alert(prevFound.valueOf())});
function numMessagesFind(){
	var found = new Array();
	
	var chat=document.getElementById('fbDockChat');
	var allElements = chat.getElementsByClassName('numMessages');
	var element;
	var foundOne = false;
	for (var i = 0; ((element = allElements[i]) != null); i++) {
		var val = element.innerHTML;
		if(val =='') val = "0";
		if (val != "0"){
			//test if blocked person
			var name = element.previousSibling.getElementsByClassName('name')[0].innerHTML;
			if((!blockedPeople) || (blockedPeople.indexOf(name)==-1)){
				found.push(val); //slower than previous versions, but only beeps once for one message. No repeated beeps for same message
				foundOne = true;
			}
		}
	}
	if(!found.equals(prevFound)){
		if(foundOne) blink();
		else stopBlink();
	}
	prevFound = found;
}

function setup() {
	if(document.getElementById('blinkBlock')) return;
	GM_addStyle('\
		#blinkBlock {position:fixed; z-index:10001; opacity:0.9; top:40px; right:40px; padding:20px 30px; background:white; width:550px; border-radius: 20px 20px 20px 80px; border:1px solid black;}\
		#blinkBlock * { color:black;text-align:left;line-height:normal;font-size:12px;font-family:sans-serif; }\
		#blinkBlock div { text-align:center;font-weight:bold;font-size:14px; }\
		#blinkBlock textarea { height:120px;width:100%;font-size:11px;font-family:monospace;border:1px solid gray;padding:1px; }\
		#blinkBlock button { width:150px;margin:0 10px;text-align:center; }\
	');
	var div = document.createElement('div');
	div.id = 'blinkBlock';
	div.innerHTML = '<div>Block names from blink to Facebook Scroll</div><div><form name><textArea id="textAreaBlinkBlockedNames">'+localStorage.blinkScrollBlocked+'</textArea><button id="blinkBlockOk">Save settings & Close</button><button id="blinkBlockTest">Send test blink</button></form></div>';
	document.body.appendChild(div);
	div = null;
	document.getElementById('blinkBlockOk').addEventListener('click', function() {
		localStorage.blinkScrollBlocked = document.getElementById('textAreaBlinkBlockedNames').value;
		//GM_log("saved "+document.getElementById('textAreaBlinkBlockedNames').value);
		blockedPeople = localStorage.blinkScrollBlocked;
		while(true){
			var div = document.getElementById('blinkBlock');
			if(!div) break;
			div.parentNode.removeChild(div);
		}
	}, false);
	
	document.getElementById('blinkBlockTest').addEventListener('click', function() {
		blink();
	}, false);
	
}

function checkUpdates(){
	if(!sessionStorage.blinkScrollUpdateCheckedAlready){
		sessionStorage.blinkScrollUpdateCheckedAlready = "true";
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/137586.meta.js",
			onload: function(response) {
				var onlineMeta = response.responseText;
				[, onlineVers]=onlineMeta.match(/\/\/ @version\s*(.*)/);
				if(fileVers!=onlineVers){
					var message = "Facebook Scroll Lock blink:\n  Online version: "+onlineVers+"\n  Your version: "+fileVers+"\n  Open update page (new tab)?";
					if(confirm(message)) GM_openInTab('http://userscripts.org/scripts/show/137586');
				}
			}
		});
	}
}
