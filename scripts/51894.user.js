// ==UserScript==
// @name           Facebook Chat +
// @description    Emos' and Format tools
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @author         apo
// @version        1.7
// ==/UserScript==
//

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

	var fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	fEmotBarDom.setAttribute('style','padding-bottom: 4px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-bottom-style: solid; border-bottom-width: 1px; border-color: #CCCCCC;');
	for(i=0;i<emotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background: transparent url(http://static.ak.fbcdn.net/images/sprite/MegaSprite_5004_ltr.gif?8:162023) no-repeat scroll -'+ emotsInfo[i+1] +'px -84px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;');
		fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotBarDom.appendChild(fEmotsDom);
	}
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt',':|]');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/robot.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_img');
	fEmotBarDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','(^^^)');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/shark.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_img');
	fEmotBarDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt',':putnam:');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/emote/putnam.gif');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_img');
	fEmotBarDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','*msg*');
	fEmotsDom.setAttribute('src','http://i43.tinypic.com/2ujs7m1.jpg');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_img');
	fEmotBarDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','_msg_');
	fEmotsDom.setAttribute('src','http://i43.tinypic.com/15s0svr.jpg');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_img');
	fEmotBarDom.appendChild(fEmotsDom);
	document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('chat_window')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('chat_window')[0].getElementsByClassName('toolbox')[0];
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		for(i=0;i<fNewEmotBar.childNodes.length;i++) fNewEmotBar.childNodes[i].addEventListener('click', fEmotClickHandler , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.firstChild);
		else fChatToolBox.appendChild(fNewEmotBar);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.getElementsByClassName('chat_input_div')[0].getElementsByClassName('chat_input')[0];
		fChatInput.value += event.target.getAttribute('alt')+' ';
		fChatInput.focus();
	}