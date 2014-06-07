// ==UserScript==
// @name			Facebook Chat Meme XL Bar
// @description	                Meme formato XL sempre presenti nella chat di Facebook - Creato da genialfactory.com
// @version	  		1
// @versionnumber  		1
// @require          		http://code.jquery.com/jquery-1.7.1.min.js
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			genialFactory
// @namespace		        http://www.facebook.com/genialfactory
// @icon			http://digilander.libero.it/genialfactory/template/blog/genial%20stemma.png
// ==/UserScript==
//
// 
//
/* START */

/* 

- log -
*v 1.3 (beta)
Remove Alphabet
Add new emoticon
*v 1.2 (beta)
Update Alphabet
*v 1.1 (beta)
Init

*/

	var version, storage, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 1;
	


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
								  url: 'Add Nanti?' + new Date().getTime(),
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
			if(confirm("Mau Install Emot Kaskus buat FB gak gan?")) openInTab('Add Nanti');
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
	
var a = '\n[[260117804093152]][[260117944093138]]\n'+
'[[260120360759563]][[260118067426459]]'
	var b = '\n[[260139017424364]][[260139084091024]]\n'+
'[[260139117424354]][[260139147424351]]'
	var c = '\n[[260143454090587]][[260143464090586]]\n'+
'[[260143474090585]][[260143487423917]]'
	var d = '\n[[260145850757014]][[260145910757008]]\n'+
'[[260145950757004]][[260145984090334]]'
	var e = '\n[[260149537423312]][[260149547423311]]\n'+
'[[260149560756643]][[260149567423309]]'
	var f = '\n[[260150644089868]][[260150650756534]]\n'+
'[[260150660756533]][[260150670756532]]'
	var g = '\n[[260151697423096]][[260151714089761]]\n'+
'[[260151720756427]][[260151730756426]]'
	var h = '\n[[260153020756297]][[260153054089627]]\n'+
'[[260153064089626]][[260153090756290]]'
	var i = '\n[[260154097422856]][[260154144089518]]\n'+
'[[260154164089516]][[260154194089513]]'
	var j = '\n[[260156107422655]][[260156117422654]]\n'+
'[[260156134089319]][[260156140755985]]'
	var l = '\n[[260157324089200]][[260157354089197]]\n'+
'[[260157384089194]][[260157410755858]]'
	var m = '\n[[260158354089097]][[260158370755762]]\n'+
'[[260158390755760]][[260158407422425]]'
	var n = '\n[[260159934088939]][[260159970755602]]\n'+
'[[260160004088932]][[260160024088930]]'
	var o = '\n[[260161174088815]][[260161180755481]]\n'+
'[[260161187422147]][[260161197422146]]'
	var p = '\n[[260162207422045]][[260162247422041]]\n'+
'[[260162260755373]][[260162267422039]]'
	var q = '\n[[260318280739771]][[260318290739770]]\n'+
'[[260318307406435]][[260318317406434]]'
	var r = '\n[[260319564072976]][[260319604072972]]\n'+
'[[260319620739637]][[260319640739635]]'
	var s = '\n[[260902204014712]][[260902207348045]]\n'+
'[[260902210681378]][[260902214014711]]'
	var t = '\n[[260902497348016]][[260902504014682]]\n'+
'[[260902510681348]][[260902517348014]]'
	var u = '\n[[260902917347974]][[260902920681307]]\n'+
'[[260902924014640]][[260902930681306]]'
	var v = '\n[[260906637347602]][[260906650680934]]\n'+
'[[260906657347600]][[260906660680933]]'
	var w = '\n[[260907057347560]][[260907060680893]]\n'+
'[[260907067347559]][[260907080680891]]'
	var z = '\n[[260907627347503]][[260907630680836]]\n'+
'[[260907637347502]][[260907640680835]]'
	var ab = '\n[[261886097249656]][[261886107249655]]\n'+
'[[261886110582988]][[261886117249654]]'
	var bc = '\n[[261886957249570]][[261886963916236]]\n'+
'[[261886970582902]][[261886977249568]]'
	var cd = '\n[[261887487249517]][[261887497249516]]\n'+
'[[261887503916182]][[261887517249514]]'
	var de = '\n[[261888310582768]][[261888350582764]]\n'+
'[[261888357249430]][[261888367249429]]'
      var genial = '\nScopri questa estensione su www.genialfactory.com/2012/07/elenco-completo-meme-xl-sempre-presente.html'
    

// sampel code  pakyu3, 'http://graph.facebook.com/305628672860494/picture', 
	spemotsInfo = [a, 'http://digilander.libero.it/genialfactory/meme/557172_260117740759825_645939322_n.jpg', b, 'http://digilander.libero.it/genialfactory/meme/255362_260138970757702_602127251_n.jpg', c, 'http://digilander.libero.it/genialfactory/meme/553189_260143440757255_2016304937_n.jpg', d, 'http://digilander.libero.it/genialfactory/meme/376386_260145827423683_1338305480_n.jpg', e, 'http://digilander.libero.it/genialfactory/meme/531362_260149507423315_902659377_n.jpg',  f, 'http://digilander.libero.it/genialfactory/meme/309379_260150630756536_623211718_n.jpg',  g, 'http://digilander.libero.it/genialfactory/meme/553730_260151680756431_378819575_n.jpg',  h, 'http://digilander.libero.it/genialfactory/meme/482064_260152997422966_622011592_n.jpg', i, 'http://digilander.libero.it/genialfactory/meme/417510_260154087422857_1807987589_n.jpg', j, 'http://digilander.libero.it/genialfactory/meme/534848_260156087422657_435386796_n.jpg', l, 'http://digilander.libero.it/genialfactory/meme/165858_260157280755871_1496203986_n.jpg', m, 'http://digilander.libero.it/genialfactory/meme/396588_260158340755765_1263521441_n.jpg', n, 'http://digilander.libero.it/genialfactory/meme/600304_260159894088943_1597078225_n.jpg',  o, 'http://digilander.libero.it/genialfactory/meme/557667_260161154088817_1715633730_n.jpg',  p, 'http://digilander.libero.it/genialfactory/meme/481997_260162197422046_1408457768_n.jpg', q, 'http://digilander.libero.it/genialfactory/meme/282378_260318260739773_175397970_n.jpg', r, 'http://digilander.libero.it/genialfactory/meme/557239_260319500739649_371189183_n.jpg', s, 'http://digilander.libero.it/genialfactory/meme/486618_260902194014713_824119126_n.jpg', t, 'http://digilander.libero.it/genialfactory/meme/391282_260902484014684_1857198344_n.jpg', u, 'http://digilander.libero.it/genialfactory/meme/539685_260902900681309_1070548158_n.jpg', v, 'http://digilander.libero.it/genialfactory/meme/392890_260906617347604_459724719_n.jpg', w, 'http://digilander.libero.it/genialfactory/meme/557648_260907047347561_741443289_n.jpg', z, 'http://digilander.libero.it/genialfactory/meme/205249_260907614014171_2117239169_n.jpg', ab, 'http://digilander.libero.it/genialfactory/meme/557799_261886073916325_2014850458_n.jpg', bc, 'http://digilander.libero.it/genialfactory/meme/205230_261886950582904_1994262859_n.jpg', cd, 'http://digilander.libero.it/genialfactory/meme/487211_261887473916185_436576138_n.jpg', de, 'http://digilander.libero.it/genialfactory/meme/557599_261888287249437_1886816184_n.jpg', genial, 'http://digilander.libero.it/genialfactory/template/blog/genial%20stemma.png',
];                                                                            
spemotsTitle = ['Yao Ming', ' ', 'TrollFace', ' ', 'Fuck Yeah', ' ', 'True Story', ' ', 'You dont Say?', ' ', 'Forever Alone', ' ', 'LoL', ' ', 'Are you Fucking kidding me?', ' ', 'Poker Face', ' ', 'Me Gusta', ' ', 'Jackie Chan', ' ', 'Cereal Guy', ' ', 'Genius', ' ', 'Y U NO', ' ', 'FFUUU-', ' ', 'Challenge Accepted', ' ', 'I see What did you There', ' ', 'Mother of God', ' ', 'No.', ' ', 'Not Bad', ' ', 'Oh God Why?', ' ', 'Okay', ' ', 'So Close', ' ', 'Zalando guy', ' ', 'AAAWWW YYYEEEAAA', ' ', 'Derp smile', ' ', 'Derpina smile', ' ', 'genialFactory', ' '];             

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
fEmotsDom.setAttribute('title',spemotsTitle[i]);
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
	}