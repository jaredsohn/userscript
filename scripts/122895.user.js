// ==UserScript==
// @name			Facebook Chat EEmoticon Bar
// @description			Adds an EverybodyEdits emoticon bar to Facebook chat
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Lanjelin
// @version			0.0.3
// @versionnumber		0.3
// ==/UserScript==
//

// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42:

	var version, storage, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 0.3;
	

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
								  url: 'http://userscripts.org/scripts/source/122895.meta.js?' + new Date().getTime(),
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
		if (r.responseText.match(/@versionnumber\s+(\d+\.\d+)/)[1] > version) {
			if(confirm("There's an update available for 'Facebook Chat EEmoticon Bar'.\nDo you wish to install it?")) openInTab('http://userscripts.org/scripts/source/122895.user.js');
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
	
 var s02 = '[[356665497693188]]'
 var s03 = '[[356665501026521]]'
 var s04 = '[[356665511026520]]'
 var s05 = '[[356665521026519]]'
 var s06 = '[[356665524359852]]'
 var s07 = '[[356665527693185]]'
 var s08 = '[[356665531026518]]'
 var s09 = '[[356665541026517]]'
 var s10 = '[[356665544359850]]'
 var s11 = '[[356665554359849]]'
 var s12 = '[[356665564359848]]'
 var s13 = '[[356665571026514]]'
 var s14 = '[[356665584359846]]'
 var s15 = '[[356665591026512]]'
 var s16 = '[[356665597693178]]'
 var s17 = '[[356665604359844]]'
 var s18 = '[[356665607693177]]'
 var s19 = '[[356665611026510]]'
 var s20 = '[[356665621026509]]'
 var s21 = '[[356665631026508]]'
 var s22 = '[[356665637693174]]'
 var s23 = '[[356665644359840]]'
 var s24 = '[[356665654359839]]'
 var s25 = '[[356665661026505]]'
 var s26 = '[[356665674359837]]'
 var s27 = '[[356665687693169]]'
 var s28 = '[[356665694359835]]'
 var s29 = '[[356665697693168]]'
 var s30 = '[[356665701026501]]'
 var s31 = '[[356665704359834]]'
 var s32 = '[[356665714359833]]'
 var s33 = '[[356665721026499]]'
 var s34 = '[[356665724359832]]'
 var s35 = '[[356665727693165]]'
 var s36 = '[[356665734359831]]'
 var s37 = '[[356665741026497]]'
 var s38 = '[[356665751026496]]'
 var s39 = '[[356665761026495]]'
 var s40 = '[[356665764359828]]'
 var s41 = '[[356665767693161]]'
 var s42 = '[[356665774359827]]'
 var s43 = '[[356665787693159]]'
 var s44 = '[[356665804359824]]'
 var s45 = '[[356665814359823]]'
 var s46 = '[[356665824359822]]'
 var s47 = '[[356665827693155]]'
 var s48 = '[[356665841026487]]'
 var s49 = '[[356665844359820]]'
 var s50 = '[[356665851026486]]'
 var s51 = '[[356665867693151]]'
 var s52 = '[[356665491026522]]' 
	spemotsInfo = [
	s02, 'http://a3.sphotos.ak.fbcdn.net/hphotos-ak-snc7/394695_356665497693188_356664881026583_1409909_1851304100_n.jpg',
	s03, 'http://a8.sphotos.ak.fbcdn.net/hphotos-ak-ash4/407502_356665501026521_356664881026583_1409910_975077961_n.jpg',
	s04, 'http://a2.sphotos.ak.fbcdn.net/hphotos-ak-snc7/394778_356665511026520_356664881026583_1409911_1358598525_n.jpg',
	s05, 'http://a4.sphotos.ak.fbcdn.net/hphotos-ak-ash4/381575_356665521026519_356664881026583_1409912_410765879_n.jpg',
	s06, 'http://a6.sphotos.ak.fbcdn.net/hphotos-ak-snc7/399719_356665524359852_356664881026583_1409913_1681162380_n.jpg',
	s07, 'http://a7.sphotos.ak.fbcdn.net/hphotos-ak-snc7/390515_356665527693185_356664881026583_1409914_1685529301_n.jpg',
	s08, 'http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash4/374206_356665531026518_356664881026583_1409915_1518812714_n.jpg',
	s09, 'http://a3.sphotos.ak.fbcdn.net/hphotos-ak-ash4/377788_356665541026517_356664881026583_1409916_852807528_n.jpg',
	s10, 'http://a5.sphotos.ak.fbcdn.net/hphotos-ak-ash4/393817_356665544359850_356664881026583_1409917_840830456_n.jpg',
	s11, 'http://a6.sphotos.ak.fbcdn.net/hphotos-ak-ash4/380382_356665554359849_356664881026583_1409918_304077273_n.jpg',
	s12, 'http://a4.sphotos.ak.fbcdn.net/hphotos-ak-snc7/404401_356665564359848_356664881026583_1409919_69395430_n.jpg',
	s13, 'http://a5.sphotos.ak.fbcdn.net/hphotos-ak-snc7/398740_356665571026514_356664881026583_1409920_1253794484_n.jpg',
	s14, 'http://a3.sphotos.ak.fbcdn.net/hphotos-ak-ash4/403321_356665584359846_356664881026583_1409921_963879779_n.jpg',
	s15, 'http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc7/396402_356665591026512_356664881026583_1409922_638734443_n.jpg',
	s16, 'http://a7.sphotos.ak.fbcdn.net/hphotos-ak-ash4/394986_356665597693178_356664881026583_1409923_1159730192_n.jpg',
	s17, 'http://a6.sphotos.ak.fbcdn.net/hphotos-ak-ash4/394644_356665604359844_356664881026583_1409924_1128787029_n.jpg',
	s18, 'http://a4.sphotos.ak.fbcdn.net/hphotos-ak-ash4/388222_356665607693177_356664881026583_1409925_502523620_n.jpg',
	s19, 'http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash4/390888_356665611026510_356664881026583_1409926_1886819219_n.jpg',
	s20, 'http://a8.sphotos.ak.fbcdn.net/hphotos-ak-ash4/394642_356665621026509_356664881026583_1409927_442618711_n.jpg',
	s21, 'http://a7.sphotos.ak.fbcdn.net/hphotos-ak-ash4/398143_356665631026508_356664881026583_1409928_1131138717_n.jpg',
	s22, 'http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash4/390156_356665637693174_356664881026583_1409929_632119280_n.jpg',
	s23, 'http://a6.sphotos.ak.fbcdn.net/hphotos-ak-ash4/405436_356665644359840_356664881026583_1409930_1006790565_n.jpg',
	s24, 'http://a4.sphotos.ak.fbcdn.net/hphotos-ak-ash4/394898_356665654359839_356664881026583_1409931_1319574975_n.jpg',
	s25, 'http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash4/402158_356665661026505_356664881026583_1409932_193986008_n.jpg',
	s26, 'http://a8.sphotos.ak.fbcdn.net/hphotos-ak-ash4/407714_356665674359837_356664881026583_1409933_79386335_n.jpg',
	s27, 'http://a5.sphotos.ak.fbcdn.net/hphotos-ak-snc7/393743_356665687693169_356664881026583_1409934_1324701125_n.jpg',
	s28, 'http://a3.sphotos.ak.fbcdn.net/hphotos-ak-ash4/380917_356665694359835_356664881026583_1409935_70286594_n.jpg',
	s29, 'http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash4/383961_356665697693168_356664881026583_1409936_999819382_n.jpg',
	s30, 'http://a7.sphotos.ak.fbcdn.net/hphotos-ak-ash4/374206_356665701026501_356664881026583_1409937_1823846047_n.jpg',
	s31, 'http://a8.sphotos.ak.fbcdn.net/hphotos-ak-ash4/390882_356665704359834_356664881026583_1409938_792645314_n.jpg',
	s32, 'http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash4/396080_356665714359833_356664881026583_1409939_1408907509_n.jpg',
	s33, 'http://a3.sphotos.ak.fbcdn.net/hphotos-ak-ash4/383024_356665721026499_356664881026583_1409940_2144956152_n.jpg',
	s34, 'http://a5.sphotos.ak.fbcdn.net/hphotos-ak-ash4/379058_356665724359832_356664881026583_1409941_2093828240_n.jpg',
	s35, 'http://a7.sphotos.ak.fbcdn.net/hphotos-ak-snc7/386147_356665727693165_356664881026583_1409942_1684430640_n.jpg',
	s36, 'http://a1.sphotos.ak.fbcdn.net/hphotos-ak-snc7/386156_356665734359831_356664881026583_1409943_423673065_n.jpg',
	s37, 'http://a4.sphotos.ak.fbcdn.net/hphotos-ak-ash4/400852_356665741026497_356664881026583_1409944_737412338_n.jpg',
	s38, 'http://a6.sphotos.ak.fbcdn.net/hphotos-ak-ash4/394779_356665751026496_356664881026583_1409945_1049498249_n.jpg',
	s39, 'http://a8.sphotos.ak.fbcdn.net/hphotos-ak-ash4/382608_356665761026495_356664881026583_1409946_709807481_n.jpg',
	s40, 'http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash4/390662_356665764359828_356664881026583_1409947_841623108_n.jpg',
	s41, 'http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash4/395293_356665767693161_356664881026583_1409948_561803572_n.jpg',
	s42, 'http://a7.sphotos.ak.fbcdn.net/hphotos-ak-ash4/389886_356665774359827_356664881026583_1409949_1756567344_n.jpg',
	s43, 'http://a4.sphotos.ak.fbcdn.net/hphotos-ak-snc7/402862_356665787693159_356664881026583_1409950_2123526866_n.jpg',
	s44, 'http://a6.sphotos.ak.fbcdn.net/hphotos-ak-snc7/385027_356665804359824_356664881026583_1409951_712127977_n.jpg',
	s45, 'http://a8.sphotos.ak.fbcdn.net/hphotos-ak-snc7/378097_356665814359823_356664881026583_1409952_1383832227_n.jpg',
	s46, 'http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash4/379967_356665824359822_356664881026583_1409953_1329914893_n.jpg',
	s47, 'http://a3.sphotos.ak.fbcdn.net/hphotos-ak-ash4/396118_356665827693155_356664881026583_1409954_1700661160_n.jpg',
	s48, 'http://a5.sphotos.ak.fbcdn.net/hphotos-ak-ash4/403899_356665841026487_356664881026583_1409955_1543585585_n.jpg',
	s49, 'http://a7.sphotos.ak.fbcdn.net/hphotos-ak-ash4/390445_356665844359820_356664881026583_1409956_371915090_n.jpg',
	s50, 'http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash4/407414_356665851026486_356664881026583_1409957_1660439451_n.jpg',
	s51, 'http://a2.sphotos.ak.fbcdn.net/hphotos-ak-snc7/405519_356665867693151_356664881026583_1409958_739360454_n.jpg',
	s52, 'http://a5.sphotos.ak.fbcdn.net/hphotos-ak-snc7/403306_356665491026522_356664881026583_1409908_825110697_n.jpg'	
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