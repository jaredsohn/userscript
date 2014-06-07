// ==UserScript==
// @name			Facebook Chat Big and Emotions Big
// @author			NonGyEN
// @description			ขยายช่องแชท และ Emoticons ให้ใหญ่ขึ้นใน Google Chrome และ Firefox พัฒนาโดย NonGyEn เวอร์ชั่น 1.0 (http://www.facebook.com/nongyen.programmer)
// @version			1.0
// @versionnumber		1.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			http://userscripts.org/scripts/show/145680
// @icon           http://image.free.in.th/z/ib/facebookchat.png
// ==/UserScript==

var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 1.0;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	function UpdateCheck() {
		if(parseInt(getValue('LastUpdate', '0')) + 864 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/145680.meta.js?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('An error occurred while checking for updates:\n' + err);
			}
		}
	}
	
	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > version) {
			if(confirm(	"มีเวอร์ชั่นใหม่สำหรับ 'Facebook Chat Big and Emotions Big'.\n" +
						"เวอร์ชั่นปัจจุบัน: " + version + "\n" +
						"เวอร์ชั่นใหม่: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"คุณควรที่จะติดตั้งมัน ?")
			   ) openInTab('http://userscripts.org/scripts/source/145680.user.js');
		}
	}
	
// END
	
UpdateCheck();

//aggiungo il listener per il click sulla chattab nella dock bar
initListeners();


//#-------------------------------------------------------------------- เพิ่มขนาดแชท Big Chat --------------------------------------------------------------------#\\
var chatNewHeight = 400; //limited by other stuff not to fly off the page
var chatNewWidth = 280; // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 0; // Chat entry size - icon
var fbSidebarSize = 205

function chatResizeAction() { 

        chatNewWidth = 280;
        chatNewHeight = 400;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 6;
    
    reFlow();
}


 //----
 
function addGlobalStyle(css) {
    if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    var docHead = document.getElementsByTagName('head')[0];
    docHead.appendChild(style).innerHTML=css;
    var docBody = document.getElementByTagName('body')[0];
    docBody.appendChild(style).innerHTML="";
}

function reFlow() {
	addGlobalStyle(
      ".rNubContainer .fbNub { margin-left: 2px; }"
    )
    // Remove the border around the chat box and push it to the far side
    addGlobalStyle(".fbDock { margin: 0 0px; }");
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
addGlobalStyle(".fbMercuryChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbMercuryChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");
    addGlobalStyle(
      ".fbMercuryChatTab .fbDockChatTabFlyout  { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}" +
	  "#fbDockChatTabs .fbMercuryChatTab.opened {" +
	  "width: " + chatNewWidth + "px !important; " +
	  "}"
    )
 addGlobalStyle(".emote_custom { height: 38px !important; width: 38px !important; } ");
    addGlobalStyle("tbody { vertical-align: bottom; }");
}
reFlow();
//#-------------------------------------------------------------------- End Big Chat --------------------------------------------------------------------#\\