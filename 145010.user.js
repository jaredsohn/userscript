// ==UserScript==
// @name			Facebook Colorful Alphabets For Chat Box By Saad Khan
// @description	                Facebook Colorful Alphabets For Chat Box
// @description	        Report bugs at loyalsaadkhan@ymail.com - https://www.facebook.com/profile.php?id=100002912394173
// @description	        Thank you for using my script! Developed by Saad Khan loyalsaadkhan@ymail.com 
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			SaadKhan
// @version			1
// @versionnumber	1
// @namespace		https://www.facebook.com/SaadKhanAnimator
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
	
var A = '[[329111550516587]]'
var B = '[[329111567183252]]'
var C = '[[329111580516584]]'
var D = '[[329111590516583]]'
var E = '[[329111623849913]]'
var F = '[[329111643849911]]'
var G = '[[329111677183241]]'
var H = '[[329111710516571]]'
var I = '[[329111723849903]]'
var J = '[[329111737183235]]'
var K = '[[329111743849901]]'
var L = '[[329111750516567]]'
var M = '[[329111770516565]]'
var N = '[[329111790516563]]'
var O = '[[329111807183228]]'
var P = '[[329120307182378]]'
var Q = '[[329113640516378]]'
var R = '[[329111853849890]]'
var S = '[[329111873849888]]'
var T = '[[329111883849887]]'
var U = '[[329111890516553]]'
var V = '[[329111947183214]]'
var W = '[[329111957183213]]'
var X = '[[329111973849878]]'
var Y = '[[329111983849877]]'
var Z = '[[329111990516543]]'

             var v1 = 'Salam My name is Muhammad Saad Khan. I am from Pakistan Karachi & I devoleped this extension for Google Chrome & Firefox for more further details. Email:loyalsaadkhan@ymail.com, Cell No: +923453497580 & Join me on facebook: https://www.facebook.com/profile.php?id=100002912394173'
	spemotsInfo = [A, 'https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-ash4/405492_329111550516587_1304203548_n.jpg', B, 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-ash4/387152_329111567183252_1931915373_n.jpg', C, 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-snc7/393854_329111580516584_1316618189_n.jpg', D, 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-ash4/418686_329111590516583_762828514_n.jpg', E, 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-snc7/305029_329111623849913_2020467289_n.jpg', F, 'https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-ash4/292371_329111643849911_1056810523_n.jpg', G, 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash3/578700_329111677183241_744973569_n.jpg', H, 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-ash3/528158_329111710516571_1820819750_n.jpg', I, 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash4/255497_329111723849903_1702875204_n.jpg', J, 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-ash4/292982_329111737183235_2035234188_n.jpg', K, 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-prn1/551870_329111743849901_1122171769_n.jpg', L, 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-ash3/582605_329111750516567_609197769_n.jpg', M, 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-prn1/533059_329111770516565_254554275_n.jpg', N, 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash3/580030_329111790516563_345059386_n.jpg', O, 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-ash3/579946_329111807183228_760405493_n.jpg', P, 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/551855_329120307182378_1965446245_n.jpg', Q, 'https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-prn1/551125_329113640516378_491908204_n.jpg', R, 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-ash3/546554_329111853849890_1479113275_n.jpg', S, 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-ash4/405550_329111873849888_993834639_n.jpg', T, 'https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-snc7/319426_329111883849887_1335600923_n.jpg', U, 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash3/524553_329111890516553_1446515478_n.jpg', V, 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-ash3/561800_329111947183214_1516540619_n.jpg', W, 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/559171_329111957183213_158630769_n.jpg', X, 'https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-ash4/419864_329111973849878_164639322_n.jpg', Y, 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-snc6/254932_329111983849877_1118357649_n.jpg', Z, 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-ash4/378238_329111990516543_344935008_n.jpg', v1, 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-ash3/539230_292505354189875_1842228284_n.jpg'];                                                                            
    spemotsTitle = ['A', '', 'B', '', 'C', '', 'D', '', 'E', '', 'F' , '', 'G', '', 'H', '', 'I', '', 'J', '', 'K', '', 'L', '', 'M', '', 'N', '', 'O', '', 'P', '', 'Q', '', 'R', '', 'S', '', 'T','', 'U', '', 'V', '', 'W', '', 'X', '', 'Y', ' ', 'Z', ' ', 'v1'];
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

