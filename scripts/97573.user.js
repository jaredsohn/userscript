// ==UserScript==
// @name              Facebook Chat Emoticons Bar by cyriac
// @description 	Adds an emoticon bar to Facebook chat
// @include	http://facebook.com/*
// @include	http://*.facebook.com/*
// @include	https://facebook.com/*
// @include	https://*.facebook.com/*
// @author            bitMAN
// @version           0.0.141
// @license           Attribution-NonCommercial-NoDerivs 3.0 Unported (CC BY-NC-ND 3.0); http://creativecommons.org/licenses/by-nc-nd/3.0/
// @namespace     http://userscripts.org/scripts/show/50826
// ==/UserScript==
//

// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42:


/* START: This part of the code was written by Vaughan Chandler for FFixer, special thanks to him :) */
	var storage = 'none';
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
/* END */
	
	var emotsInfo = new Array();
	emotsInfo[0] = ':)';	emotsInfo[1] = 590;
	emotsInfo[2] = ':(';	emotsInfo[3] = 606;
	emotsInfo[4] = ':p';	emotsInfo[5] = 622;
	emotsInfo[6] = ':D';	emotsInfo[7] = 638;
	emotsInfo[8] = '>:(';	emotsInfo[9] = 718;
	emotsInfo[10] = '-_-';	emotsInfo[11] = 846;
	emotsInfo[12] = ':/';	emotsInfo[13] = 734;
	emotsInfo[14] = 'o.O';	emotsInfo[15] = 862;
	emotsInfo[16] = ':\'(';	emotsInfo[17] = 750;
	emotsInfo[18] = '>:O';	emotsInfo[19] = 878;
	emotsInfo[20] = ':v';	emotsInfo[21] = 894;
	emotsInfo[22] = '3:)';	emotsInfo[23] = 766;
	emotsInfo[24] = ':o';	emotsInfo[25] = 654;
	emotsInfo[26] = ':3';	emotsInfo[27] = 910;
	emotsInfo[28] = ';)';	emotsInfo[29] = 670;
	emotsInfo[30] = ':*';	emotsInfo[31] = 798;
	emotsInfo[32] = '8)';	emotsInfo[33] = 686;
	emotsInfo[34] = '<3';	emotsInfo[35] = 814;
	emotsInfo[36] = '8|';	emotsInfo[37] = 702;
	emotsInfo[38] = '^_^';	emotsInfo[39] = 830;
	emotsInfo[40] = 'O:)';	emotsInfo[41] = 782;
	
	var fEmotBarDom = document.createElement('div');
	var ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	var ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	fEmotBarDom.setAttribute('style','padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 1px; border-color: #777777; position: static;');
	
	var fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	for(i=0;i<emotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background: transparent url(http://static.ak.fbcdn.net/rsrc.php/z28K9/hash/wjc46okw.png) no-repeat scroll -'+ emotsInfo[i+1] +'px -84px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;');
		fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt',':|]');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/robot.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_custom');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','(^^^)');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/shark.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_custom');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt',':putnam:');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/putnam.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_custom');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','<(")');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/penguin.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_custom');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt',':42:');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/42.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_custom');
	fEmotsListDom.appendChild(fEmotsDom);

	var fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img sp_8mf37a sx_3bae31');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter inputContainer')[0].getElementsByClassName('input')[0];
		fChatInput.value += event.target.getAttribute('alt')+' ';
		fChatInput.focus();
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