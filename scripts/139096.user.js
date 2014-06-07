// ==UserScript==
// @name			(っ◕‿◕)っ Grinbook (っ◕‿◕)っ - MSN Edition
// @description			Emoticones de MSN en el chat de Facebook - Hecho por @baske para @starg09
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			baske y starg09
// @version			2.0
// @versionnumber		2.0
// @license			Attribution-NonCommercial-NoDerivs 3.0 Unported (CC BY-NC-ND 3.0); http://creativecommons.org/licenses/by-nc-nd/3.0/
// @namespace			http://www.taringa.net/baske http://www.taringa.net/starg09
// ==/UserScript==
//

	var version, HttpsOn, ImagesURL, TarimgURL, ResourcesURL, storage, taremotsInfo, taremots2Info, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 1.0;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	TarimgURL = HttpsOn?'https://fbcdn-sphotos-a.akamaihd.net/':'http://fbcdn-sphotos-a.akamaihd.net/';
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
		if(parseInt(getValue('LastUpdate', '0')) + 86400000 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/50826.meta.js?' + new Date().getTime(),
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
			if(confirm(	"There's an update available for 'Facebook Chat Emoticons Bar'.\n" +
						"Your version: " + version + "\n" +
						"New version: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"Do you wish to install it?")
			   ) openInTab('http://userscripts.org/scripts/source/50826.user.js');
		}
	}
	
// END

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
	
	UpdateCheck();
	
	taremotsInfo = ['[[509405575741899]]', 'hphotos-ak-snc7/599590_509405575741899_186886536_n.jpg', '[[509405365741920]]', 'hphotos-ak-snc7/564623_509405719075218_1228050242_n.jpg', '[[509405712408552]]', 'hphotos-ak-ash4/309407_509405712408552_2041593823_n.jpg', '[[509405485741908]]', 'hphotos-ak-snc7/599830_509405485741908_463915588_n.jpg', '[[509405515741905]]', 'hphotos-ak-ash4/599624_509405515741905_1791103492_n.jpg', '[[509405555741901]]', 'hphotos-ak-snc7/576076_509405555741901_1056104679_n.jpg', '[[509405595741897]]', 'hphotos-ak-snc7/480394_509405595741897_565676490_n.jpg', '[[509405435741913]]', 'hphotos-ak-ash4/552695_509405435741913_1496165297_n.jpg', '[[509405609075229]]', 'hphotos-ak-ash4/526387_509405609075229_860504356_n.jpg', '[[509405415741915]]', 'hphotos-ak-snc7/315378_509405415741915_853648742_a.jpg', '[[509405649075225]]', 'hphotos-ak-snc7/580843_509405649075225_1811990537_n.jpg', '[[509410582408065]]', 'hphotos-ak-snc7/483212_509410582408065_893658992_n.jpg', '[[509405415741915]]', 'hphotos-ak-ash4/315378_509405415741915_853648742_n.jpg', '[[509405619075228]]', 'hphotos-ak-snc7/564650_509405619075228_1256630585_n.jpg', '[[509405805741876]]', 'hphotos-ak-snc7/564737_509405805741876_2126485701_n.jpg', '[[509405635741893]]', 'hphotos-ak-snc7/409608_509405635741893_1662753533_n.jpg', '[[509413749074415]]', 'hphotos-ak-ash4/545280_509413749074415_692549594_a.jpg', '[[509414709074319]]', 'hphotos-ak-snc7/255284_509414709074319_133347827_n.jpg', '[[509405692408554]]', 'hphotos-ak-snc7/553574_509405692408554_1053659185_n.jpg', '[[509405739075216]]', 'hphotos-ak-ash3/539094_509405739075216_374034162_n.jpg', '[[509405779075212]]', 'hphotos-ak-prn1/406324_509405779075212_1579646686_n.jpg', '[[509405562408567]]', 'hphotos-ak-prn1/396170_509405562408567_348275134_n.jpg', '[[509405762408547]]', 'hphotos-ak-ash4/547891_509405762408547_716557801_n.jpg', '[[509405625741894]]', 'hphotos-ak-ash3/555464_509405625741894_1618289538_n.jpg', '[[509405452408578]]', 'hphotos-ak-ash3/564535_509405452408578_799434988_n.jpg', '[[509405472408576]]', 'hphotos-ak-ash4/557277_509405472408576_1791431492_n.jpg', '[[509405799075210]]', 'hphotos-ak-ash4/562730_509405799075210_285642626_n.jpg', '[[509405535741903]]', 'hphotos-ak-ash3/553375_509405535741903_308234195_n.jpg', '[[509405875741869]]', 'hphotos-ak-prn1/524146_509405875741869_601963925_n.jpg', '[[509405892408534]]', 'hphotos-ak-ash3/545533_509405892408534_1605739186_n.jpg', '[[509405849075205]]', 'hphotos-ak-ash4/555473_509405849075205_777289066_n.jpg', '[[509405935741863]]', 'hphotos-ak-ash3/551175_509405935741863_1469270243_n.jpg', '[[509405949075195]]', 'hphotos-ak-ash3/304782_509405949075195_1156225169_n.jpg', '[[509406072408516]]', 'hphotos-ak-ash3/599835_509406072408516_512746857_n.jpg', '[[509405995741857]]', 'hphotos-ak-ash3/553367_509405995741857_1482886757_n.jpg', '[[509405955741861]]', 'hphotos-ak-ash3/488058_509405955741861_328060203_n.jpg', '[[509405835741873]]', 'hphotos-ak-ash3/557496_509405835741873_1402568284_n.jpg', '[[509406052408518]]', 'hphotos-ak-ash3/558175_509406052408518_155912042_a.jpg', '[[509406062408517]]', 'hphotos-ak-ash3/314786_509406062408517_247094756_n.jpg', '[[509405902408533]]', 'hphotos-ak-ash3/553586_509405902408533_445410151_n.jpg', '[[509405859075204]]', 'hphotos-ak-ash3/554998_509405859075204_1892938239_n.jpg', '[[509406045741852]]', 'hphotos-ak-ash3/553495_509406045741852_947114252_n.jpg', '[[509406132408510]]', 'hphotos-ak-ash3/599786_509406132408510_642475079_n.jpg', '[[509406092408514]]', 'hphotos-ak-ash3/389030_509406092408514_1893088192_n.jpg', '[[509406085741848]]', 'hphotos-ak-ash3/399389_509406085741848_315070078_n.jpg', '[[509405862408537]]', 'hphotos-ak-ash3/527086_509405862408537_279868934_n.jpg', '[[509406139075176]]', 'hphotos-ak-ash3/599924_509406139075176_308838721_n.jpg', '[[509405912408532]]', 'hphotos-ak-ash3/484464_509405912408532_1049676973_n.jpg']


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
	
		for(i=0;i<taremotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',taremotsInfo[i]);
		fEmotsDom.setAttribute('src',TarimgURL + taremotsInfo[i+1]);
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