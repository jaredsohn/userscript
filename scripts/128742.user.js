// ==UserScript==
// @name			Facebook New Chat Emoticons Bar
// @description	                Adds new emoticon bar to Facebook chat
// @description	        Visit turbolego.com/L.txt.
// @description	        Report bugs at theztech@connect.to
// @description	        Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Tech
// @version			1
// @versionnumber	1
// @namespace		http://userscripts.org/scripts/show/122827
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
	
var sad = '[[362237430487357]]'
var angel = '[[362237447154022]]'
var attention = '[[362237470487353]]'
var beurk = '[[362237480487352]]'
var big_smile = '[[362237497154017]]'
var bof = '[[362237540487346]]'
var cat = '[[362237567154010]]'
var cool = '[[362237593820674]]'
var cry = '[[362237610487339]]'
var devil = '[[362237643820669]]'
var dunno = '[[362237677153999]]'
var eating = '[[362237700487330]]'
var fiout = '[[362237727153994]]'
var heart = '[[362237747153992]]'
var hehe = '[[362237793820654]]'
var hein = '[[362237850487315]]'
var humpf = '[[362237867153980]]'
var hourra = '[[362237877153979]]'
var kiss = '[[362237897153977]]'
var lalala = '[[362237907153976]]'
var lol = '[[362237917153975]]'
var mad = '[[362237970487303]]'
var missed = '[[362238013820632]]'
var neutral = '[[362238070487293]]'
var nice = '[[362238117153955]]'
var nope = '[[362238133820620]]'
var nyan = '[[362238153820618]]'
var robot = '[[362238170487283]]'
var rock_head = '[[362238190487281]]'
var shock = '[[362238220487278]]'
var smile = '[[362238287153938]]'
var tongue_up = '[[362238313820602]]'
var whoa = '[[362238333820600]]'
var wink = '[[362238400487260]]'
var working_hard = '[[362238417153925]]'
var XZ = '[[362238433820590]]'
var XZZ = '[[362238457153921]]'
var XD = '[[362238487153918]]'
var Xq = '[[362238500487250]]'
	spemotsInfo = [sad, 'http://graph.facebook.com/362237430487357/picture', angel, 'http://graph.facebook.com/362237447154022/picture', attention, 'http://graph.facebook.com/362237470487353/picture',beurk, 'http://graph.facebook.com/362237480487352/picture', big_smile, 'http://graph.facebook.com/362237497154017/picture', bof, 'http://graph.facebook.com/362237540487346/picture', cat, 'http://graph.facebook.com/362237567154010/picture', cool, 'http://graph.facebook.com/362237593820674/picture', cry, 'http://graph.facebook.com/362237610487339/picture', devil, 'http://graph.facebook.com/362237643820669/picture', dunno, 'http://graph.facebook.com/362237677153999/picture', eating, 'http://graph.facebook.com/362237700487330/picture', fiout, 'http://graph.facebook.com/362237727153994/picture', heart, 'http://graph.facebook.com/362237747153992/picture', hehe, 'http://graph.facebook.com/362237793820654/picture', hein, 'http://graph.facebook.com/362237850487315/picture', humpf, 'http://graph.facebook.com/362237867153980/picture', hourra, 'http://graph.facebook.com/362237877153979/picture', kiss, 'http://graph.facebook.com/362237897153977/picture', lalala, 'http://graph.facebook.com/362237907153976/picture', lol, 'http://graph.facebook.com/362237917153975/picture', mad, 'http://graph.facebook.com/362237970487303/picture', missed, 'http://graph.facebook.com/362238013820632/picture', neutral, 'http://graph.facebook.com/362238070487293/picture', nice, 'http://graph.facebook.com/362238117153955/picture', nope, 'http://graph.facebook.com/362238133820620/picture', nyan, 'http://graph.facebook.com/362238153820618/picture', robot, 'http://graph.facebook.com/362238170487283/picture', rock_head, 'http://graph.facebook.com/362238190487281/picture', shock, 'http://graph.facebook.com/362238220487278/picture', smile, 'http://graph.facebook.com/362238287153938/picture', tongue_up, 'http://graph.facebook.com/362238313820602/picture', whoa, 'http://graph.facebook.com/362238333820600/picture', wink, 'http://graph.facebook.com/362238400487260/picture', working_hard, 'http://graph.facebook.com/362238417153925/picture', XZ, 'http://graph.facebook.com/362238433820590/picture', XZZ, 'http://graph.facebook.com/362238457153921/picture', XD, 'http://graph.facebook.com/362238487153918/picture', Xq, 'http://graph.facebook.com/362238500487250/picture'];                                                                            
    spemotsTitle = ['sad', '', 'angel', '', 'attention', '', 'beurk', '', 'big smile', '', 'bof' , '', 'cat', '', 'cool', '', 'cry', '', 'devil', '', 'dunno', '', 'eating', '', 'flouh', '', 'heart', '', 'hehe', '', 'hein', '', 'humpf', '', 'hourra', '', 'kiss', '', 'lalala', '', 'lol', '', 'mad', '', 'missed', '', 'neutral', '', 'nice', ' ', 'nope', ' ', 'nyan', ' ', 'robot', ' ', 'rock head', ' ', 'shock', ' ', 'smile', ' ', 'tongue up', ' ', 'whoa', ' ', 'wink', ' ', 'working hard', ' ', 'X(', ' ', 'X)', ' ', 'XD', ' ', 'Xq'];
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

