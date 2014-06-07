// ==UserScript==
// @name           Maghrebi ourasi marfou3
// @namespace      AutoLike
// @description    Chat Emotion on facebook by Maghrebi ourasi marfou3 www.facebook.com/Maghrebi.ourasi.marfou3
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==
//Chat Emoticons Bar

	var Pics, ProfImagesURL, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, cusemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	Httpzir = window.location.href.match('https://')?true:false;
	ImagesURL = Httpzir?'https://s-static.ak.fbcdn.net/images/':'http://s-static.ak.fbcdn.net/images/';
	ProfImagesURL = Httpzir?'https://graph.facebook.com/':'http://graph.facebook.com/';
	Pics = Httpzir?'/picture':'/picture';
	ResourcesURL = Httpzir?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* mr-zir */

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
	cusemotsInfo = ['[[xatmaniac]]', 'xatmaniac', '[[xathello]]', 'xathello', '[[xatecool]]', 'xatecool', '[[xatcrs]]', 'xatcrs', '[[xatsmirk]]', 'xatsmirk', '[[xatcomeon]]', 'xatcomeon', '[[xated]]', 'xated', '[[xathehe]]', 'xathehe', '[[xatmad]]', 'xatmad', '[[xatshh]]', 'xatshh', '[[xatgoo]]', 'xatgoo', '[[xatpray]]', 'xatpray', '[[xatpty]]', 'xatpty', '[[xatrage]]', 'xatrage', '[[xatlove]]', 'xatlove', '[[xatevil]]', 'xatevil', '[[xatpty]]', 'xatpty', '[[xatchew]]', 'xatchew', '[[xatcrying]]', 'xatcrying', '[[xatredface]]', 'xatredface', '[[xatwhat]]', 'xatwhat', '[[xatono]]', 'xatono','[[xatsleepy]]', 'xatsleepy', '[[xatbye]]', 'xatbye', '[[xatswt]]', 'xatswt', '[[xatcry2]]', 'xatcry2', '[[xatgrin]]', 'xatgrin', '[[xatwary]]', 'xatwary', '[[xatclap]]', 'xatclap', '[[xatxd]]', 'xatxd', '[[xatshock]]', 'xatshock', '[[xatno]]', 'xatno', '[[xatkiss]]', 'xatkiss', '[[xatflip]]', 'xatflip', '[[xatsry]]', 'xatsry', '[[xathmm]]', 'xathmm', '[[xatbeye]]', 'xatbeye', '[[xatawe]]', 'xatawe', '[[xatum]]', 'xatum', '[[xattired]]', 'xattired', '[[likemerah]]', 'likemerah', '[[ixlike]]', 'ixlike', '[[xatmaniac2]]', 'xatmaniac2', '[[xatfedup]]', 'xatfedup', '[[xatxp]]', 'xatxp', '[[xatpukee]]', 'xatpukee', '[[xathugg]]', 'xathugg', '[[xatsmirk2]]', 'xatsmirk2', '[[xatshock2]]', 'xatshock2', '[[xatsad]]', 'xatsad', '[[xatmutter]]', 'xatmutter', '[[xatshifty]]', 'xatshifty', '[[xatunn]]', 'xatunn', '[[xatnrd]]', 'xatnrd', '[[xatfan]]', 'xatfan', '[[xatraging]]', 'xatraging', '[[coolhehe]]', 'coolhehe', '[[xatstraw]]', 'xatstraw', '[[xata2]]', 'xata2', '[[xatsilly]]', 'xatsilly', '[[xatdhehe]]', 'xatdhehe', '[[xatredface2]]', 'xatredface2', '[[xatthumbsup]]', 'xatthumbsup', '[[xatthumbsdown]]', 'xatthumbsdown', '[[xatsmirkcomeon]]', 'xatsmirkcomeon', '[[xatsmirkhehe]]', 'xatsmirkhehe', '[[xatfacepalm]]', 'xatfacepalm', '[[xatroll]]', 'xatroll', '[[xatwink]]', 'xatwink', '[[xatmaniac3]]', 'xatmaniac3', '[[xatmaniac4]]', 'xatmaniac4', '[[xatmaniachehe]]', 'xatmaniachehe', '[[xathug2]]', 'xathug2', '[[xatmaniacfan]]', 'xatmaniacfan', '[[xatmaniachmm]]', 'xatmaniachmm', '[[xateek]]', 'xateek', '[[xatmario8]]', 'xatmario8', '[[xatloser]]', 'xatloser', '[[xatsix]]', 'xatsix', '[[xat8ball]]', 'xat8ball', '[[xatpeeking]]', 'xatpeeking', '[[xatemo]]', 'xatemo', '[[xatxdhehe]]', 'xatxdhehe', '[[xatmutterflip]]', 'xatmutterflip', '[[xatraspberry]]', 'xatraspberry', '[[xattwitch]]', 'xattwitch', '[[xatprayy]]', 'xatprayy', '[[MAR0C.MA]]', 'MAR0C.MA', '[[Maghrebi.ourasi.marfou3]]', 'Maghrebi.ourasi.marfou3', '[[facebook]]', 'facebook', '[[278029242253904]]', '278029242253904', '[[513735088653632]]', '513735088653632', '[[513735115320296]]', '513735115320296', '[[513735125320295]]', '513735125320295', '[[513735161986958]]', '513735161986958', '[[513735191986955]]', '513735191986955', '[[513735205320287]]', '513735205320287', '[[513735228653618]]', '513735228653618', '[[513735255320282]]', '513735255320282', '[[513738508653290]]', '513738508653290', '[[513735315320276]]', '513735315320276', '[[513735351986939]]', '513735351986939', '[[513735381986936]]', '513735381986936', '[[513735415320266]]', '513735415320266', '[[513735481986926]]', '513735481986926', '[[513735535320254]]', '513735535320254', '[[513735601986914]]', '513735601986914', '[[513735628653578]]', '513735628653578', '[[513735651986909]]', '513735651986909', '[[513735708653570]]', '513735708653570', '[[513735738653567]]', '513735738653567', '[[513735781986896]]', '513735781986896', '[[513735815320226]]', '513735815320226', '[[513735835320224]]', '513735835320224', '[[513735858653555]]', '513735858653555', '[[513735868653554]]', '513735868653554', '[[513735898653551]]', '513735898653551'];
	
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 13px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
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

// ==============