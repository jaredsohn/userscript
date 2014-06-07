// ==UserScript==
// @name           An2tofa Facebook Chatbar 
// @description    This script gives you a set of emoticons that you can click for a more efficient way to use emoticons in Facebook chat. 
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.2.2
// @author         Mike Shamory
// @author	   bitMAN
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

	var fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	fEmotBarDom.setAttribute('style','padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-bottom-style: solid; border-bottom-width: 1px; border-color: #EEEEEE;');
	
	for(i=0;i<emotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background: transparent url(http://facebookchatbar.ucoz.com/images/themes/tmp_1.png) no-repeat scroll -'+ emotsInfo[i+1] +'px -84px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;');
		fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotBarDom.appendChild(fEmotsDom);
	}

	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','update');
	fEmotsDom.setAttribute('src','http://www.facebookchatbar.ucoz.com/images/updates.png');
	fEmotsDom.setAttribute('style','cursor: pointer;');
	fEmotsDom.setAttribute('class','emote_banner');
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
               

		if (event.target.getAttribute('alt') == 'popout') {

	                window.open('http://www.facebook.com/presence/popout.php');

		}
		else if (event.target.getAttribute('alt') == 'update') {

			window.open('http://userscripts.org/scripts/show/56504')

		}
		else {

			fChatInput.value += ' ' + event.target.getAttribute('alt')+' ';
			fChatInput.focus();

                }
	}