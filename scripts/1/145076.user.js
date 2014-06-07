// ==UserScript==
// @name           Simple AutoThumb Ver 2.0 With Autoscroll
// @description    Simplified Automatic Like Facebook Status for Friends, Groups, and Fan Page. No Coding,No Hosting Just install it with. Greasemongkey Now, PLUS FB Chat Emoticons Bar!.
// @include        htt*://www.facebook.com/*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*
// @version			1.3
// @versionnumber		1.3
// @author         AhmadSafar Modified by: Mr.Angger
// ==/UserScript==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+73px";
	div.style.left = "+6px";
	div.style.backgroundColor = "Violet";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"http://facebook.com/Anggeraw\">Simple AutoLike<br>By MR.Angger</a>"
	
	body.appendChild(div);
}
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+40px";
	div.style.left = "+6px";
	div.style.backgroundColor = "Purple";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"\">Kalo Autolike gak jalan,<br>Teken F5/Reload Webnya</a>"
	
	body.appendChild(div);
}
// ==============
// ==Fanpage==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+21px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.anggeraw.com/\">www.anggeraw.com</a>"
	
	body.appendChild(div);
}
// ==============
// ==Angger==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/anggeraw\">skynet.netsky@gmail.com</a>"

	body.appendChild(div);
}

var didlikes = 0;

function random_from_to(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var $$ = function() {
	return document.querySelectorAll.apply(document, arguments);
};

function checkLikes() {
	var llist = $$("button.like_link[name=like]");
	var f = (function() {
		var i=llist.length-1;
		if (i<0) return null;
		return function() {
			llist[i--].click();
			didlikes++;
			if (i<0 || didlikes>99999) window.clearInterval(likeq);			
		}})();
	if (f) {
		var rnd = random_from_to(100,150);
		var likeq = window.setInterval(f, rnd);	       
		}
}

checkLikes();
var rnm = random_from_to(1000, 3000);
window.setInterval(checkLikes, rnm);

//Chat Emoticons Bar

	var Pics, ProfImagesURL, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, cusemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://s-static.ak.fbcdn.net/images/';
	ProfImagesURL = HttpsOn?'https://graph.facebook.com/':'http://graph.facebook.com/';
	Pics = HttpsOn?'/picture':'/picture';
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

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
	cusemotsInfo = ['[[chatmaho]]', 'chatmaho', '[[261896703869655]]', '261896703869655', '[[208810792536042]]', '208810792536042', '[[guengakak]]', 'guengakak', '[[263966766998038]]', '263966766998038', '[[xated]]', 'xated', '[[xatwary]]', 'xatwary', '[[xatmaniac]]', 'xatmaniac', '[[xatrage]]', 'xatrage', '[[xatecool]]', 'xatecool', '[[xathello]]', 'xathello', '[[xatshock]]', 'xatshock', '[[xatpty]]', 'xatpty', '[[xatsmirk]]', 'xatsmirk', '[[xatawe]]', 'xatawe', '[[xatanime]]', 'xatanime', '[[xatredface]]', 'xatredface', '[[xatcomeon]]', 'xatcomeon', '[[xatgoo]]', 'xatgoo', '[[xatxD]]', 'xatxD', '[[xathehe]]', 'xathehe'];
	
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.chat_arrow { background-image: url("'+ ResourcesURL + 'v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	for(i=0;i<emotsInfo.length;i+=1) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');
		fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('src',ImagesURL + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	for(i=0;i<cusemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',cusemotsInfo[i]);
		fEmotsDom.setAttribute('src',ProfImagesURL + cusemotsInfo[i+1] + Pics);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		
		var txtbef = ''; var txtaft = '';
		
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
				fixHeightAndScroll(fChatBar[i]);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
				fixHeightAndScroll(fChatBar[i]);
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
		}
		else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
		}
	}
	
	function fixHeightAndScroll(bar) {
		fChatContainer = bar.parentNode.parentNode.parentNode;
		var oldheight = parseInt(fChatContainer.children[2].style.height.replace("px",""));
		var newheight = 285 - (fChatContainer.children[0].clientHeight + fChatContainer.children[1].clientHeight + fChatContainer.children[3].clientHeight + 1);
		fChatContainer.children[2].style.height = newheight + "px";
		fChatContainer.children[2].scrollTop += oldheight - newheight;
	}
//=================================== Configuration Autoscroll =======================================

var SPEED_STEP=1;		// step size for increase and decrease of speed
var BASE_TIME=4;		// default scrolling speed in speed-step      
var MAX_SLOWEST_SPEED=10;	// define the slowest speed-step
  
var speed=GM_getValue("speed", BASE_TIME); // load last speed value 

var timer = null;		// handle for the periodic call to the scrolling function

//=================================== Core =============================================

// loop as fast as required, don't loop when speed is inferior to the small timestep
function reset_timer() { 
	if (timer) { window.clearTimeout(timer); };
	if (speed >= MAX_SLOWEST_SPEED) timer = null;
	else timer = window.setInterval(scroll, Math.exp(speed));
}

// actually scroll the window one pixel down
function scroll () { window.scrollBy(0, 1); };
	// Reminder : use window.scrollBy(0, -1) to scroll up

// call the scrolling loop
reset_timer();			


//=================================== Interface =========================================


function scroll_faster () {
	if(speed>=SPEED_STEP){ 	speed-=SPEED_STEP;	}  
	// else { find a way to display to the user we reached the maximum speed... any idea ? }
	hideallbuttons();
	// instead each action should individually self-clean their picture with a setTimeout
	// that would need 5 different functions because of the setTimeout Greasemonkey specificity
	// (especially since we can't specify parameters within setTimeout call in GM afaik)
	var button = document.getElementById('button_faster'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000); 
	reset_timer(); 
};
function scroll_slower () { 
	if(speed>=MAX_SLOWEST_SPEED-SPEED_STEP) { speed=MAX_SLOWEST_SPEED; scroll_pause(); return;} 
	if(speed<MAX_SLOWEST_SPEED-SPEED_STEP) { speed+=SPEED_STEP; } 
	hideallbuttons();
	var button = document.getElementById('button_slower'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000);
	reset_timer(); 
};
function scroll_start () { 
	hideallbuttons();
	var button = document.getElementById('button_start'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000);
	reset_timer();
};
function scroll_pause () {
	// should use var with local page scope, NOT global GM getValue
	speed=MAX_SLOWEST_SPEED; // does not use a specific pause var/const, could be interesting to make the distinction
	hideallbuttons();
	var button = document.getElementById('button_pause'); button.style.visibility="visible";
	reset_timer(); 
};
function scroll_reset () { 
	speed=BASE_TIME; 
	hideallbuttons();
	var button = document.getElementById('button_reset'); button.style.visibility="visible";
	setTimeout(hideallbuttons,2000);
	reset_timer();
};


function hideallbuttons() { 
	document.getElementById('button_pause').style.visibility="hidden"; 
	document.getElementById('button_start').style.visibility="hidden"; 
	document.getElementById('button_faster').style.visibility="hidden"; 
	document.getElementById('button_slower').style.visibility="hidden"; 
	document.getElementById('button_reset').style.visibility="hidden"; 
};


GM_registerMenuCommand( "Start scrolling",		scroll_start, "s", "", "t" );
GM_registerMenuCommand( "Pause scrolling",		scroll_pause, "p", "", "p" );
GM_registerMenuCommand( "Scroll faster",		scroll_faster, "l", "", "f" );
GM_registerMenuCommand( "Scroll slower",		scroll_slower, "k", "", "s" );
GM_registerMenuCommand( "Reset scrolling speed",	scroll_reset, "r", "", "r" );


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle( 'div#scrollercontroller { position:fixed; bottom:0; right:0;visibility:visible;}'
		+'p.button { visibility:hidden; position:fixed; bottom:0; right:0; } '
		);

var scrollercontroller = document.createElement('div');
scrollercontroller.id = 'scrollercontroller';

var pauseButtonElement = document.createElement('p');
pauseButtonElement.className = 'button';
pauseButtonElement.id = 'button_pause';
pauseButtonElement.innerHTML = '||';

var playButtonElement = document.createElement('p');
playButtonElement.className = 'button';
playButtonElement.id = 'button_start';
playButtonElement.innerHTML = 'Autoscroll';

var slowerButtonElement = document.createElement('p');
slowerButtonElement.className = 'button';
slowerButtonElement.id = 'button_slower';
slowerButtonElement.innerHTML = '&lt;&lt;';

var fasterButtonElement = document.createElement('p');
fasterButtonElement.className = 'button';
fasterButtonElement.id = 'button_faster';
fasterButtonElement.innerHTML = '&gt;&gt;';

var resetButtonElement = document.createElement('p');
resetButtonElement.className = 'button';
resetButtonElement.id = 'button_reset';
resetButtonElement.innerHTML = 'reset';

scrollercontroller.appendChild(pauseButtonElement);
scrollercontroller.appendChild(playButtonElement);
scrollercontroller.appendChild(slowerButtonElement);
scrollercontroller.appendChild(fasterButtonElement);
scrollercontroller.appendChild(resetButtonElement);

// Display the visual interface
document.body.insertBefore(scrollercontroller, document.body.firstChild);

function shortcuts (e){
	switch(e.charCode)
	{
		case "s".charCodeAt(0) : scroll_start();  break;
		case "p".charCodeAt(0) : scroll_pause();  break;
		case "l".charCodeAt(0) : scroll_faster(); break;	
		case "k".charCodeAt(0) : scroll_slower(); break;
		case "r".charCodeAt(0) : scroll_reset();  break;
	}

};

function registerShortcuts() {
	window.addEventListener("keypress", shortcuts, true);
};

function unregisterShortcuts() {
	window.removeEventListener("keypress",  shortcuts, true);
};

registerShortcuts();

$x('//input | //textarea | //select').forEach(registerListener);

function registerListener(node) { 
	node.addEventListener("mouseover", function() { 
			unregisterShortcuts();
			scroll_pause(); }, true); 
	node.addEventListener("mouseout", function() { 
			scroll_start (); 
			registerShortcuts();
			}, true); 
}