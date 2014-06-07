// ==UserScript==
// @name           Facebook ChatBar + Updated
// @description    This script gives you a set of emoticons that you can click to use in Facebook chat. Updated to work with popout chat!
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.3.2
// @author         Mike Shamory
// @author         bitMAN
// @author         James Hartig
// ==/UserScript==
//



// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:)

	var emotsInfo = new Array();
	emotsInfo[0] = ':)';		emotsInfo[1] = 590;
	emotsInfo[2] = ':(';		emotsInfo[3] = 606;
	emotsInfo[4] = ':p';		emotsInfo[5] = 622;
	emotsInfo[6] = ':D';		emotsInfo[7] = 638;
	emotsInfo[8] = '>:(';		emotsInfo[9] = 718;
	emotsInfo[10] = '-_-';		emotsInfo[11] = 846;
	emotsInfo[12] = ':/';		emotsInfo[13] = 734;
	emotsInfo[14] = 'o.O';		emotsInfo[15] = 862;
	emotsInfo[16] = ":'(";		emotsInfo[17] = 750;
	emotsInfo[18] = '>:O';		emotsInfo[19] = 878;
	emotsInfo[20] = ':v';		emotsInfo[21] = 894;
	emotsInfo[22] = '3:)';		emotsInfo[23] = 766;
	emotsInfo[24] = ':o';		emotsInfo[25] = 654;
	emotsInfo[26] = ':3';		emotsInfo[27] = 910;
	emotsInfo[28] = ';)';		emotsInfo[29] = 670;
	emotsInfo[30] = ':*';		emotsInfo[31] = 798;
	emotsInfo[32] = '8)';		emotsInfo[33] = 686;
	emotsInfo[34] = '<3';		emotsInfo[35] = 814;
	emotsInfo[36] = '8|';		emotsInfo[37] = 702;
	emotsInfo[38] = '^_^';		emotsInfo[39] = 830;
	emotsInfo[40] = 'O:)';		emotsInfo[41] = 782;
	emotsInfo[42] = ':|]';		emotsInfo[43] = 924;
	emotsInfo[44] = '(^^^)';	emotsInfo[45] = 940;
	emotsInfo[46] = ':putnam:';	emotsInfo[47] = 572;
	emotsInfo[48] = '<(")';		emotsInfo[49] = 518;
	emotsInfo[50] = '_msg_';	emotsInfo[51] = 536;
	emotsInfo[52] = '*msg*';	emotsInfo[53] = 554;
	emotsInfo[54] = 'popout';	emotsInfo[55] = 500;
	
	var fEmotBarDom = false;
	
	function createDOMElement(popup) {
		if (!fEmotBarDom) {
			fEmotBarDom = document.createElement('div');
			fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
			if (popup) {
				fEmotBarDom.setAttribute('style','line-height: 16px; background-color:#FFF;text-align:center;');
			} else {
				fEmotBarDom.setAttribute('style','padding-bottom: 2px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-bottom-style: solid; border-bottom-width: 1px; border-color: #EEEEEE;');
			}
			for(i=0;i<emotsInfo.length;i+=2) {
				if (i<54 || !popup) {
					var fEmotsDom = document.createElement('img');
					fEmotsDom.setAttribute('alt',emotsInfo[i]);
					fEmotsDom.setAttribute('style','cursor: pointer; background: transparent url(http://facebookchatbar.ucoz.com/images/themes/tmp_1.png) no-repeat scroll -'+ emotsInfo[i+1] +'px -84px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;');
					fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
					fEmotsDom.setAttribute('class','emote_img');
					fEmotBarDom.appendChild(fEmotsDom);
				}
			}
		}
	}
	
	document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);
	
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = ".fbNubFlyoutBody180 { height: 180px !important;}";
	} else {
		styleElement.appendChild(document.createTextNode(".fbNubFlyoutBody180 { height: 180px !important;}"));
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);

	function fInsertedNodeHandler(event) {		
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout')[0]){
			createDOMElement(false);
			fInsertEmotBar(event.target);
		} else if (event.target.parentNode.getElementsByClassName && event.target.parentNode.getElementsByClassName('fbNubFlyoutBody')[0] && event.target.parentNode.getElementsByClassName('fbNubFlyoutBody')[0].className.indexOf('fbNubFlyoutBody180') == -1 && event.target.parentNode.className.indexOf('fbChatTab')>-1){
			event.target.parentNode.getElementsByClassName('fbNubFlyoutBody')[0].className += ' fbNubFlyoutBody180';
		} else if (event.target.getElementsByClassName && event.target.getElementsByClassName('chat_input_div')[0]){
			createDOMElement(true);
			fInsertEmotBarInPopup(event.target);
			if (event.target.getElementsByClassName('chat_conv')[0]){
			
				var styleElement2 = document.createElement("style");
				styleElement2.type = "text/css";
				if (styleElement2.styleSheet) {
					styleElement2.styleSheet.cssText = ".new_chat_conv { height: "+(parseFloat(document.getElementsByClassName('presence_popout')[0].scrollHeight)-112)+"px !important;}";
				} else {
					styleElement2.appendChild(document.createTextNode(".new_chat_conv { height: "+(parseFloat(document.getElementsByClassName('presence_popout')[0].scrollHeight)-112)+"px !important;}"));
				}
				document.getElementsByTagName("head")[0].appendChild(styleElement2);
				
			
				for(var i=0;i<event.target.getElementsByClassName('chat_conv').length;i++) {
					event.target.getElementsByClassName('chat_conv')[i].className += ' new_chat_conv';
				}
			}
		}
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyout')[0].getElementsByClassName('fbNubFlyoutHeader')[0].getElementsByClassName('toolbox')[0];
		if (fChatToolBox && !fChatToolBox.getElementsByClassName('chat_tab_emot_bar')[0]){
			fNewEmotBar = fEmotBarDom.cloneNode(true);
			for(i=0;i<fNewEmotBar.getElementsByClassName('emote_img').length;i++){
				fNewEmotBar.getElementsByClassName('emote_img')[i].removeEventListener('click', fEmotClickHandler , false);
				fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler , false);
			}
			if(fChatToolBox.childNodes) {
				fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.firstChild);
			} else {
				fChatToolBox.appendChild(fNewEmotBar);
			}
		} else if (fChatToolBox && fChatToolBox.getElementsByClassName('chat_tab_emot_bar')[0]) {
			//somehow we are losing the onClicks so unregister and re-register them
			fNewEmotBar = fChatToolBox.getElementsByClassName('chat_tab_emot_bar')[0];
			for(i=0;i<fNewEmotBar.getElementsByClassName('emote_img').length;i++){
				fNewEmotBar.getElementsByClassName('emote_img')[i].removeEventListener('click', fEmotClickHandler , false);
				fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler , false);
			}
		}
	}
	
	function fInsertEmotBarInPopup(fChatWrapper) {
		fChatInput = fChatWrapper.getElementsByClassName('chat_input_div')[0];
		if (fChatInput && !fChatInput.getElementsByClassName('chat_tab_emot_bar')[0]){
			fNewEmotBar = fEmotBarDom.cloneNode(true);
			for(i=0;i<fNewEmotBar.getElementsByClassName('emote_img').length;i++){
				fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler, false);
			}
			if(fChatInput.childNodes) {
				fChatInput.insertBefore(fNewEmotBar,fChatInput.firstChild);
			} else {
				fChatInput.appendChild(fNewEmotBar);
			}
			
		} else if (fChatInput && !fChatInput.getElementsByClassName('chat_tab_emot_bar')[0]){
			//somehow we are losing the onClicks so unregister and re-register them
			fNewEmotBar = fChatInput.getElementsByClassName('chat_tab_emot_bar')[0];
			for(i=0;i<fNewEmotBar.getElementsByClassName('emote_img').length;i++){
				fNewEmotBar.getElementsByClassName('emote_img')[i].removeEventListener('click', fEmotClickHandler, false);
				fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler, false);
			}
		}
	}

	function fEmotClickHandler(event){		
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('chat_input_div')[0].getElementsByClassName('chat_input')[0];		
		if (event.target.getAttribute('alt') == 'popout') {
	        window.open('http://www.facebook.com/presence/popout.php');
		} else {
			fChatInput.value += ' ' + event.target.getAttribute('alt')+' ';
			fChatInput.focus();
        }
	}