// ==UserScript==
// @name			Facebook New Chat Emoticons Bar
// @description	                Adds new emoticon bar to Facebook chat
// @description	        Visit turbolego.com/L.txt.
// @description	        Report bugs at spistek@yahoo.fr
// @description	        Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			spistek
// @version			1
// @versionnumber	1
// @namespace		http://userscripts.org/scripts/show/122852
// ==/UserScript==
//

	var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 1;
	


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
	
var sad = '[[363460537031713]]'
var angel = '[[363460563698377]]'
var attention = '[[363460583698375]]'
var beurk = '[[363460607031706]]'
var big_smile = '[[363460617031705]]'
var bof = '[[363460630365037]]'
var cat = '[[363460653698368]]'
var cool = '[[363460687031698]]'
var cry = '[[363460703698363]]'
var devil = '[[363460710365029]]'
var dunno = '[[363460727031694]]'
var eating = '[[363460763698357]]'
var fiouh = '[[363460793698354]]'
var heart = '[[363460820365018]]'
var hehe = '[[363460843698349]]'
var hein = '[[363460887031678]]'
var humpf = '[[363460910365009]]'
var hourra = '[[363460920365008]]'
var kiss = '[[363460940365006]]'
var lalala = '[[363460953698338]]'
var lol = '[[363460967031670]]'
var mad = '[[363460973698336]]'
var missed = '[[363460997031667]]'
var neutral = '[[363461023698331]]'
var nice = '[[363461033698330]]'
var nope = '[[363461050364995]]'
var nyan = '[[363461070364993]]'
var robot = '[[363461090364991]]'
var rock_head = '[[363461117031655]]'
var shock = '[[363461147031652]]'
var small = '[[363461177031649]]'
var smile = '[[363461207031646]]'
var tongue_up = '[[363461217031645]]'
var whoa = '[[363461233698310]]'
var wink = '[[363461247031642]]'
var working_hard = '[[363461273698306]]'
var XZ = '[[363461290364971]]'
var XZZ = '[[363461307031636]]'
var XD = '[[363461317031635]]'
var Xq = '[[363461330364967]]'
	spemotsInfo = [sad, 'http://graph.facebook.com/363460537031713/picture', angel, 'http://graph.facebook.com/363460563698377/picture', attention, 'http://graph.facebook.com/363460583698375/picture',beurk, 'http://graph.facebook.com/363460607031706/picture', big_smile, 'http://graph.facebook.com/363460617031705/picture', bof, 'http://graph.facebook.com/363460630365037/picture', cat, 'http://graph.facebook.com/363460653698368/picture', cool, 'http://graph.facebook.com/363460687031698/picture', cry, 'http://graph.facebook.com/363460703698363/picture', devil, 'http://graph.facebook.com/363460710365029/picture', dunno, 'http://graph.facebook.com/363460727031694/picture', eating, 'http://graph.facebook.com/363460763698357/picture', fiouh, 'http://graph.facebook.com/363460793698354/picture', heart, 'http://graph.facebook.com/363460820365018/picture', hehe, 'http://graph.facebook.com/363460843698349/picture', hein, 'http://graph.facebook.com/363460887031678/picture', humpf, 'http://graph.facebook.com/363460910365009/picture', hourra, 'http://graph.facebook.com/363460920365008/picture', kiss, 'http://graph.facebook.com/363460940365006/picture', lalala, 'http://graph.facebook.com/363460953698338/picture', lol, 'http://graph.facebook.com/363460967031670/picture', mad, 'http://graph.facebook.com/363460973698336/picture', missed, 'http://graph.facebook.com/363460997031667/picture', neutral, 'http://graph.facebook.com/363461023698331/picture', nice, 'http://graph.facebook.com/363461033698330/picture', nope, 'http://graph.facebook.com/363461050364995/picture', nyan, 'http://graph.facebook.com/363461070364993/picture', robot, 'http://graph.facebook.com/363461090364991/picture', rock_head, 'http://graph.facebook.com/363461117031655/picture', shock, 'http://graph.facebook.com/363461147031652/picture', small, 'http://graph.facebook.com/363461177031649/picture', smile, 'http://graph.facebook.com/363461207031646/picture', tongue_up, 'http://graph.facebook.com/363461217031645/picture', whoa, 'http://graph.facebook.com/363461233698310/picture', wink, 'http://graph.facebook.com/363461247031642/picture', working_hard, 'http://graph.facebook.com/363461273698306/picture', XZ, 'http://graph.facebook.com/363461290364971/picture', XZZ, 'http://graph.facebook.com/363461307031636/picture', XD, 'http://graph.facebook.com/363461317031635/picture', Xq, 'http://graph.facebook.com/363461330364967/picture'];                                                                            
    spemotsTitle = ['sad', '', 'angel', '', 'attention', '', 'beurk', '', 'big smile', '', 'bof' , '', 'cat', '', 'cool', '', 'cry', '', 'devil', '', 'dunno', '', 'eating', '', 'flouh', '', 'heart', '', 'hehe', '', 'hein', '', 'humpf', '', 'hourra', '', 'kiss', '', 'lalala', '', 'lol', '', 'mad', '', 'missed', '', 'neutral', '', 'nice', ' ', 'nope', ' ', 'nyan', ' ', 'robot', ' ', 'rock head', ' ', 'shock', ' ', 'small', ' ', 'smile', ' ', 'tongue up', ' ', 'whoa', ' ', 'wink', ' ', 'working hard', ' ', 'X(', ' ', 'X)', ' ', 'XD', ' ', 'Xq'];
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');

	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('title',spemotsTitle[i]);
		fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
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
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		
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
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
	}

	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
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

