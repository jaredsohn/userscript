// ==UserScript==
// @name			(っ◕‿◕)っ Grinbook (っ◕‿◕)っ - T! Edition
// @description			Emoticones de Taringa! en el chat de Facebook - made by @starg09
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
	
	taremotsInfo = ['[[437240006300179]]', 'hphotos-ak-snc7/577527_437240006300179_1596425351_n.jpg', '[[437239776300202]]', 'hphotos-ak-ash3/525924_437239776300202_14860250_n.jpg', '[[437239822966864]]', 'hphotos-ak-ash3/526918_437239822966864_1039873302_n.jpg', '[[437239832966863]]', 'hphotos-ak-snc6/285755_437239832966863_549233987_n.jpg', '[[437240042966842]]', 'hphotos-ak-prn1/551245_437240042966842_1881953623_n.jpg', '[[437239782966868]]', 'hphotos-ak-snc6/224906_437239782966868_342820261_n.jpg', '[[215891431846137]]', 'hphotos-ak-ash3/558791_215891431846137_191312554304025_308318_693849571_n.jpg', '[[437239992966847]]', 'hphotos-ak-ash3/581178_437239992966847_1613089432_n.jpg', '[[437239842966862]]', 'hphotos-ak-ash4/285640_437239842966862_1589827643_n.jpg', '[[191316447636969]]', 'hphotos-ak-snc7/402439_191316447636969_191312554304025_255746_281907918_n.jpg', '[[437239896300190]]', 'hphotos-ak-ash3/533439_437239896300190_1166920575_n.jpg', '[[437239929633520]]', 'hphotos-ak-snc6/182161_437239929633520_1789426954_n.jpg', '[[437229416301238]]', 'hphotos-ak-ash4/250877_437229416301238_1941973516_n.jpg', '[[437239976300182]]', 'hphotos-ak-snc6/283698_437239976300182_386012247_n.jpg', '[[462657117091801]]', 'hphotos-ak-ash3/532502_462657117091801_817985645_n.jpg', '[[437239986300181]]', 'hphotos-ak-ash3/552836_437239986300181_595877500_n.jpg', '[[437240032966843]]', 'hphotos-ak-snc6/181838_437240032966843_1155614497_n.jpg', '[[437240052966841]]', 'hphotos-ak-ash3/546197_437240052966841_2080878351_n.jpg', '[[437240062966840]]', 'hphotos-ak-ash4/197748_437240062966840_4362708_n.jpg', '[[437229382967908]][[437229396301240]]', 'hphotos-ak-ash3/549523_462722123751967_852386007_n.jpg', '[[437239802966866]]', 'hphotos-ak-ash3/598689_437239802966866_1938082801_n.jpg', '[[191327717635842]]', 'hphotos-ak-snc7/421983_191327717635842_191312554304025_255774_1272337631_n.jpg', '[[437229362967910]][[437229379634575]]', 'hphotos-ak-snc6/182181_462765097081003_1302703261_n.jpg', '[[437229472967899]][[437229482967898]]\n[[437229496301230]][[437229506301229]]', 'hphotos-ak-snc6/182181_462765107081002_1563446688_n.jpg', '[[437229429634570]][[437229439634569]]\n[[437229449634568]][[437229462967900]]', 'hphotos-ak-snc6/182181_462765100414336_1623879499_n.jpg', '[[437229512967895]][[437229526301227]]', 'hphotos-ak-snc6/182181_462765110414335_243273227_n.jpg', '[[437239762966870]]', 'hphotos-ak-ash3/578089_437239762966870_394399063_n.jpg', '[[192120634223217]]', 'hphotos-ak-snc7/429950_192120634223217_191312554304025_257431_1645892663_n.jpg', '[[240662962702317]]', 'hphotos-ak-ash3/552990_240662962702317_191312554304025_356791_1555892785_n.jpg', '[[437228142968032]][[437228129634700]]', 'hphotos-ak-snc6/182181_462765090414337_937567824_n.jpg', '[[437239812966865]]', 'hphotos-ak-snc6/285742_437239812966865_1731197202_n.jpg', '[[437239886300191]]', 'hphotos-ak-ash3/578170_437239886300191_784049194_n.jpg', '[[437239939633519]]', 'hphotos-ak-ash3/601918_437239939633519_596125040_n.jpg', '[[462960367061476]][[462960437061469]]', 'hphotos-ak-prn1/562514_437239866300193_378809289_n.jpg', '[[437239959633517]]', 'hphotos-ak-ash4/282972_437239959633517_1982972719_n.jpg', '[[192120940889853]]', 'hphotos-ak-ash4/420444_192120940889853_191312554304025_257432_1890959551_n.jpg', '[[240659796035967]]', 'hphotos-ak-prn1/538091_240659796035967_191312554304025_356780_148028304_n.jpg', '[[437239926300187]]', 'hphotos-ak-ash3/556848_437239926300187_426041975_n.jpg', '[[437239942966852]]', 'hphotos-ak-ash3/576654_437239942966852_1023307073_n.jpg', '[[462661683758011]]', 'hphotos-ak-ash4/403945_462661683758011_2005763569_n.jpg']


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