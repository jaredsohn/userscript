// ==UserScript==
// @name			(っ◕‿◕)っ Grinbook (っ◕‿◕)っ - WhatsApp Edition
// @description			Selección de emotcones del popular mensajero para el chat de Facebook - made by @starg09
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			starg09
// @version			2.0
// @versionnumber		2.0
// @license			Attribution-NonCommercial-NoDerivs 3.0 Unported (CC BY-NC-ND 3.0); http://creativecommons.org/licenses/by-nc-nd/3.0/
// @namespace			http://www.taringa.net/starg09
// ==/UserScript==
//

// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 (Y) :putnam: 8| ^_^ (^^^) O:) <(") :42: 

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
	
	taremotsInfo = ['[[462714137086099]]', 'hphotos-ak-ash4/391560_462714137086099_568493835_n.jpg', '[[462714253752754]]', 'hphotos-ak-ash3/532541_462714253752754_1183692267_n.jpg', '[[462714267086086]]', 'hphotos-ak-prn1/552710_462714267086086_1925097257_n.jpg', '[[462714133752766]]', 'hphotos-ak-snc7/295427_462714133752766_46611736_n.jpg', '[[462714177086095]]', 'hphotos-ak-ash3/553372_462714177086095_735882484_n.jpg', '[[462714157086097]]', 'hphotos-ak-ash3/547985_462714157086097_206962930_n.jpg', '[[462714183752761]]', 'hphotos-ak-snc7/599586_462714183752761_1946615257_n.jpg', '[[462714237086089]]', 'hphotos-ak-prn1/526435_462714237086089_568879970_n.jpg', '[[462714243752755]]', 'hphotos-ak-snc7/484068_462714243752755_634307867_n.jpg', '[[462714257086087]]', 'hphotos-ak-ash3/554905_462714257086087_1821136862_n.jpg', '[[462714220419424]]', 'hphotos-ak-ash3/526430_462714220419424_1933809510_n.jpg', '[[462714197086093]]', 'hphotos-ak-ash4/380736_462714197086093_2034621322_n.jpg', '[[462714307086082]]', 'hphotos-ak-snc7/391494_462714307086082_312042457_n.jpg', '[[462714317086081]]', 'hphotos-ak-snc7/576215_462714317086081_1873233499_n.jpg', '[[462714333752746]]', 'hphotos-ak-prn1/556052_462714333752746_901954299_n.jpg', '[[462714387086074]]', 'hphotos-ak-prn1/563884_462714387086074_1592831845_n.jpg', '[[462714417086071]]', 'hphotos-ak-ash4/389024_462714417086071_978102706_n.jpg', '[[462714400419406]]', 'hphotos-ak-snc7/418768_462714400419406_325569516_n.jpg', '[[462714370419409]]', 'hphotos-ak-ash4/487661_462714370419409_1902454160_n.jpg', '[[462714363752743]]', 'hphotos-ak-ash3/560987_462714363752743_1190960180_n.jpg', '[[462714440419402]]', 'hphotos-ak-ash3/558264_462714440419402_907405020_n.jpg', '[[462714330419413]]', 'hphotos-ak-prn1/554899_462714330419413_559720121_n.jpg', '[[462714293752750]]', 'hphotos-ak-ash4/406348_462714293752750_702520212_n.jpg', '[[462714283752751]]', 'hphotos-ak-ash3/532627_462714283752751_582469204_n.jpg', '[[462714277086085]]', 'hphotos-ak-prn1/547803_462714277086085_636214456_n.jpg', '[[462714097086103]]', 'hphotos-ak-ash4/292420_462714097086103_1519933895_n.jpg', '[[462714090419437]]', 'hphotos-ak-ash3/555024_462714090419437_1072219224_n.jpg', '[[462714083752771]]', 'hphotos-ak-ash3/181125_462714083752771_708289375_n.jpg', '[[462714067086106]]', 'hphotos-ak-snc7/484527_462714067086106_448561222_n.jpg', '[[462714070419439]]', 'hphotos-ak-ash4/306851_462714070419439_1158444312_n.jpg', '[[462714057086107]]', 'hphotos-ak-ash4/399529_462714057086107_1184526449_n.jpg', '[[462714147086098]]', 'hphotos-ak-ash4/376806_462714147086098_948440926_n.jpg', '[[462714103752769]]', 'hphotos-ak-ash3/599836_462714103752769_694187914_n.jpg', '[[462714510419395]]', 'hphotos-ak-ash3/549132_462714510419395_610222536_n.jpg', '[[462714497086063]]', 'hphotos-ak-snc7/427409_462714497086063_1104343563_n.jpg', '[[462714027086110]]', 'hphotos-ak-ash3/599683_462714027086110_202332018_n.jpg', '[[462714230419423]]', 'hphotos-ak-prn1/563521_462714230419423_574876374_n.jpg', '[[462714043752775]]', 'hphotos-ak-ash4/422229_462714043752775_1897643127_n.jpg', '[[462714110419435]]', 'hphotos-ak-ash3/547954_462714110419435_532860671_n.jpg', '[[462714450419401]]', 'hphotos-ak-ash4/418681_462714450419401_254101174_n.jpg', '[[462714463752733]]', 'hphotos-ak-prn1/552645_462714463752733_367973838_n.jpg', '[[462714477086065]]', 'hphotos-ak-ash3/549704_462714477086065_190478006_n.jpg', '[[462714453752734]]', 'hphotos-ak-ash3/548890_462714453752734_431552967_n.jpg', '[[462714130419433]]', 'hphotos-ak-ash4/389130_462714130419433_864609850_n.jpg', '[[462714123752767]]', 'hphotos-ak-prn1/524213_462714123752767_1834468955_n.jpg', '[[462714113752768]]', 'hphotos-ak-ash4/313989_462714113752768_666926025_n.jpg', '[[462714107086102]]', 'hphotos-ak-ash4/208984_462714107086102_1797627660_n.jpg', '[[462714480419398]]', 'hphotos-ak-snc7/375714_462714480419398_743458455_n.jpg']


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