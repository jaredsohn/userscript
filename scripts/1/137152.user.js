// ==UserScript==
// @name			emoticon kaskus for facebook chatbar
// @description	                membuat facebook lebih berwarna :hammer
// @version	  		3.0.4
// @versionnumber  		3
// @require          		http://code.jquery.com/jquery-1.7.1.min.js
// @require          		http://ataze.tk/download/chatfix.user.js
// @require 			http://sizzlemctwizzle.com/updater.php?id=135521
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			ataze
// @namespace		        ataze.tk
// @icon			http://s3.amazonaws.com/uso_ss/icon/135521/large.png?1339118924
// ==/UserScript==
//
// emoticon di ambil di http://livebeta.kaskus.co.id/thread/000000000000000012334574/emot-kaskus-di-facebook-update-noscriptappetc makasih buat bro gundhoel
//
/* START: kodenya dari bro by vaughan chandler, special thanks to him :) */

/* 

- log -

*v 3.0.4
Remove : mimin
Remove : thumbs up
Add : buldog
add : fuck3
Add : ekk
*v 3.0.3
Remove : resize chat
Add : Versionnumber (Upgradeable)
Fix : version (Upgradeable)
Fix : ads
*v 3.0.2
Add : hide offline user
Add : noads
Add : Versionnumber (Upgradeable) (testing2)
*v 3.0.1
Add : Versionnumber (Upgradeable) (testing)
Add : icon
*v 3.0.0
Add :  resize chat 
*v 2.1.0
Fix : version bug
Add : no-ads (experimental)
*v 2.0.4
Fix : bug UpdateCheck fix 
Fix : Height And Scrollbar
Add : paws
*v 2.0.0
Add : genit
Add : senyum 
Add : confused
Add : melet
Add : nohope
Add : wink
Add : think
Add : shakehand
*v 1.1.0
Fix : UpdateCheck
*v 1.0.4
Add : dafuqdidiread
*v 1.0.0 
Remove : ngacir
Add : mimin emot
*v.0.0.2 (beta)
Fix : gwngakak
*v.0.0.1 (beta)
Init

*/

	var version, storage, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 3;
	


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
								  url: 'http://userscripts.org/scripts/source/135521.meta.js?' + new Date().getTime(),
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
			if(confirm("kaskus Emoticons Bar ada update baru'.\nmau install kaga?")) openInTab('http://userscripts.org/scripts/source/135521.user.js');
		}
	}
	
/* END */

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
	
	var peace = '[[271066852954281]]'
	var shutup = '[[271066882954278]]'
	var kaget = '[[271066799620953]]'
	var rolleyes = '[[271066776287622]]'
	var wowcantik = '[[271066762954290]]'
	var matabelo = '[[271066826287617]]'
	var cools = '[[271066869620946]] '
	var nangis = '[[271066902954276]]'
	var mad = '[[271066969620936]]'
	var cium = '[[271066992954267]]'
	var meringis = '[[271067006287599]]'
	var ngacir = '[[271067092954257]]'
	var eek = '[[271066839620949]]'
	var pakyu = '[[271067689620864]]'
	var pakyu2 = '[[271067696287530]]'
	var pakyu3 = '[[305628672860494]]'
	var maho = '[[271067829620850]]'
	var takut = '[[271068142954152]]'
	var hammer = '[[271066959620937]]'
	var siul = '[[271067052954261]]'
	var sundul = '[[271068122954154]]'
	var kucing = '[[271067146287585]]'
	var anjing = '[[271067166287583]]'
	var najis = '[[271067869620846]]'
	var army = '[[271067062954260]]'
	var metal = '[[271067966287503]]'
	var berbusa = '[[271067986287501]]'
	var ngakak = '[[gwngakak]]'
	var malus = '[[271066929620940]]'
	var mewek = '[[chatmewek]]'
	var malu = '[[271066782954288]]'
	var justread = '[[dafuqdidijustread]]'
	var linux2 = '[[271067106287589]]'
	var Thumbs_down = '[[271067386287561]]'
	var genit = '[[271067939620839]]'
	var senyum = '[[271067016287598]]'
	var confused = '[[271066939620939]]'
	var melet = '[[271066916287608]]'
	var nohope = '[[271067956287504]]'
	var wink = '[[271066976287602]]'
	var think = '[[271066892954277]]'
	var shakehand = '[[271067399620893]]'
	var paws = '[[239198836163904]]'
	var buldog = '[[271068199620813]]'
	var cinta = '[[239191522831302]]'

// sampel code  pakyu3, 'http://graph.facebook.com/305628672860494/picture', 
	spemotsInfo = [peace, 'http://graph.facebook.com/271066852954281/picture', shutup, 'http://graph.facebook.com/271066882954278/picture', kaget, 'http://graph.facebook.com/271066799620953/picture', rolleyes, 'http://graph.facebook.com/271066776287622/picture', wowcantik, 'http://graph.facebook.com/271066762954290/picture', matabelo, 'http://graph.facebook.com/271066826287617/picture', cools, 'http://graph.facebook.com/271066869620946/picture', nangis, 'http://graph.facebook.com/271066902954276/picture', mad, 'http://graph.facebook.com/271066969620936/picture', cium, 'http://graph.facebook.com/271066992954267/picture', meringis, 'http://graph.facebook.com/271067006287599/picture', ngacir, 'http://graph.facebook.com/271067092954257/picture', eek, 'http://graph.facebook.com/271066839620949/picture', pakyu, 'http://graph.facebook.com/271067689620864/picture', pakyu2, 'http://graph.facebook.com/271067696287530/picture', pakyu3, 'http://graph.facebook.com/305628672860494/picture', maho, 'http://graph.facebook.com/271067829620850/picture', takut, 'http://graph.facebook.com/271068142954152/picture', hammer, 'http://graph.facebook.com/271066959620937/picture', siul, 'http://graph.facebook.com/271067052954261/picture', sundul, 'http://graph.facebook.com/271068122954154/picture', kucing, 'http://graph.facebook.com/271067146287585/picture', anjing, 'http://graph.facebook.com/271067166287583/picture', najis, 'http://graph.facebook.com/271067869620846/picture', army, 'http://graph.facebook.com/271067062954260/picture', metal, 'http://graph.facebook.com/271067966287503/picture', berbusa, 'http://graph.facebook.com/271067986287501/picture', ngakak, 'http://graph.facebook.com/gwngakak/picture', malus, 'http://graph.facebook.com/271066929620940/picture', mewek, 'http://graph.facebook.com/chatmewek/picture', malu, 'http://graph.facebook.com/271066782954288/picture', justread, 'http://graph.facebook.com/dafuqdidijustread/picture', linux2, 'http://graph.facebook.com/271067106287589/picture', Thumbs_down, 'http://graph.facebook.com/271067386287561/picture', genit, 'http://graph.facebook.com/271067939620839/picture', senyum, 'http://graph.facebook.com/271067016287598/picture', confused, 'http://graph.facebook.com/271066939620939/picture', melet, 'http://graph.facebook.com/271066916287608/picture', nohope, 'http://graph.facebook.com/271067956287504/picture', wink, 'http://graph.facebook.com/271066976287602/picture', think, 'http://graph.facebook.com/271066892954277/picture', shakehand, 'http://graph.facebook.com/271067399620893/picture', paws, 'http://graph.facebook.com/239198836163904/picture', buldog, 'http://graph.facebook.com/271068199620813/picture', cinta, ' https://fbcdn-photos-a.akamaihd.net/photos-ak-snc7/v43/27/117024141736935/app_2_117024141736935_8871.gif'
];                                                                            

    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.chat_arrow { background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','*bold*');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
	fEmotsDom.setAttribute('class','chatstylesbut');	
	fEmotsDom.setAttribute('style','background-position: -2px -2px;');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','_underline_');
	fEmotsDom.setAttribute('src','http://static.ak.fbcdn.net/images/blank.gif');
	fEmotsDom.setAttribute('class','chatstylesbut');	
	fEmotsDom.setAttribute('style','background-position: -2px -42px;');
	fEmotsListDom.appendChild(fEmotsDom);

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
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		
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
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
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