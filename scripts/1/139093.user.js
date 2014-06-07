// ==UserScript==
// @name			(っ◕‿◕)っ Grinbook (っ◕‿◕)っ - elvago9 Edition
// @description			Emoticones de la extensión de @elvago9 para facebook - made by @starg09
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
	
	taremotsInfo = ['[[462700313754148]][[462700333754146]]\n[[462700340420812]][[462700343754145]]', 'hphotos-ak-ash3/599625_462984910392355_1764404916_n.jpg', '[[462709937086519]]', 'hphotos-ak-ash3/524429_462709937086519_474387677_n.jpg', '[[211492658952681]]', 'hphotos-ak-ash3/527255_211492658952681_191312554304025_298212_163256149_n.jpg', '[[225968764171737]]', 'hphotos-ak-prn1/562742_225968764171737_191312554304025_327647_548128467_n.jpg', '[[191313654303915]]', 'hphotos-ak-snc7/421845_191313654303915_191312554304025_255743_993721494_n.jpg', '[[462700350420811]][[462700353754144]][[462700370420809]]\n[[462700387087474]][[462700393754140]][[462700400420806]]', 'hphotos-ak-snc7/582115_462984907059022_234515852_n.jpg', '[[191327974302483]]', 'hphotos-ak-ash4/407028_191327974302483_191312554304025_255779_355714556_n.jpg', '[[462700407087472]][[462700413754138]][[462700430420803]]\n[[462700433754136]][[462700443754135]][[462700450420801]]', 'hphotos-ak-ash3/182138_462984900392356_245426889_n.jpg', '[[462709940419852]]', 'hphotos-ak-ash3/524429_462709940419852_2051725577_n.jpg', '[[192110254224255]]', 'hphotos-ak-ash4/395841_192110254224255_191312554304025_257420_1415101680_n.jpg', '[[191329640968983]]', 'hphotos-ak-snc7/425016_191329640968983_191312554304025_255791_773109816_n.jpg', '[[191327857635828]]', 'hphotos-ak-snc7/425742_191327857635828_191312554304025_255775_743252975_n.jpg', '[[462709943753185]]', 'hphotos-ak-ash3/524429_462709943753185_1788546552_n.jpg', '[[192119710889976]]', 'hphotos-ak-snc7/420795_192119710889976_191312554304025_257429_1803251969_n.jpg', '[[462700453754134]][[462700460420800]]\n[[462700477087465]][[462700483754131]]', 'hphotos-ak-ash4/318883_462984893725690_1361141529_n.jpg', '[[462709950419851]]', 'hphotos-ak-ash3/524429_462709950419851_2105731911_n.jpg', '[[191322750969672]]', 'hphotos-ak-snc7/418616_191322750969672_191312554304025_255760_110930866_n.jpg', '[[462709967086516]]', 'hphotos-ak-ash3/524429_462709967086516_792368207_n.jpg', '[[462706833753496]][[462706837086829]][[462706840420162]]\n[[462706847086828]][[462706850420161]][[462706997086813]]', 'hphotos-ak-ash4/376290_462984883725691_850959262_n.jpg', '[[191329000969047]]', 'hphotos-ak-ash4/409152_191329000969047_191312554304025_255790_793185933_n.jpg', '[[462710057086507]]', 'hphotos-ak-ash3/553370_462710057086507_393741107_n.jpg', '[[191325924302688]]', 'hphotos-ak-snc7/419815_191325924302688_191312554304025_255768_376657853_n.jpg', '[[462710060419840]]', 'hphotos-ak-ash3/553370_462710060419840_923878621_n.jpg', '[[462700507087462]][[462700513754128]][[462700517087461]]\n[[462700527087460]][[462700537087459]][[462700553754124]]\n[[462700563754123]][[462700577087455]][[462700597087453]]', 'hphotos-ak-ash4/205415_462984867059026_936975396_n.jpg', '[[191325690969378]]', 'hphotos-ak-ash4/401497_191325690969378_191312554304025_255767_6218055_n.jpg', '[[192119304223350]]', 'hphotos-ak-snc7/429847_192119304223350_191312554304025_257428_906765822_n.jpg', '[[225928150842465]]', 'hphotos-ak-ash3/579413_225928150842465_191312554304025_327546_823948143_n.jpg', '[[462700613754118]][[462700623754117]][[462700633754116]]\n[[462700643754115]][[462700660420780]][[462700687087444]]\n[[462700713754108]][[462700723754107]][[462700733754106]]', 'hphotos-ak-prn1/524179_462984853725694_360568981_n.jpg', '[[462700743754105]][[462700763754103]][[462700773754102]]\n[[462700783754101]][[462700797087433]][[462700803754099]]', 'hphotos-ak-ash3/548244_462984793725700_2109554553_n.jpg', '[[192113274223953]]', 'hphotos-ak-ash4/424716_192113274223953_191312554304025_257426_1017264322_n.jpg', '[[240662369369043]]', 'hphotos-ak-ash4/398929_240662369369043_191312554304025_356789_1729717660_n.jpg', '[[240678132700800]]', 'hphotos-ak-ash4/403417_240664126035534_191312554304025_356805_100317509_n.jpg', '[[192119824223298]]', 'hphotos-ak-snc7/429789_192119824223298_191312554304025_257430_328569051_n.jpg', '[[238557359579544]]', 'hphotos-ak-prn1/545065_238557359579544_191312554304025_352958_401207609_n.jpg', '[[191328274302453]]', 'hphotos-ak-ash4/403029_191328274302453_191312554304025_255787_1870902079_n.jpg', '[[217760118325935]]', 'hphotos-ak-ash3/554371_217760118325935_191312554304025_312703_1972462773_n.jpg', '[[191323557636258]]', 'hphotos-ak-ash4/429490_191323557636258_191312554304025_255762_2069432244_n.jpg', '[[192109597557654]]', 'hphotos-ak-snc7/418570_192109597557654_191312554304025_257417_2061819551_n.jpg', '[[216927435075870]] ', 'hphotos-ak-ash4/293018_216927435075870_191312554304025_310369_1908253129_n.jpg']


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