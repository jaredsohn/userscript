// ==UserScript==
// @name			Facebook Chat Simpson XL Bar
// @description	                Tutti i personaggi dei Simpson formato XL sempre presenti nella chat di Facebook - Creato da genialfactory.com
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
	
	var a = '\n[[307193002718965]][[307192986052300]]\n'+
'[[307192992718966]][[307193009385631]]'
	var b = '\n[[307193189385613]][[307193172718948]]\n'+
'[[307193176052281]][[307193192718946]]'
	var c = '\n[[307193576052241]][[307193556052243]]\n'+
'[[307193559385576]][[307193382718927]]'
	var d = '\n[[307189522719313]][[307189532719312]]\n'+
'[[307189536052645]][[307189549385977]]'
	var e = '\n[[307194049385527]][[307194052718860]]\n'+
'[[307194056052193]][[307194066052192]]'
	var f = '\n[[307195372718728]][[307195522718713]]\n'+
'[[307195616052037]][[307195806052018]]'
	var g = '\n[[307196202718645]][[307196189385313]]\n'+
'[[307196209385311]][[307196236051975]]'
	var h = '\n[[307194269385505]][[307194262718839]]\n'+
'[[307194246052174]][[307194372718828]]'
	var i = '\n[[307196796051919]][[307196792718586]]\n'+
'[[307196789385253]][[307196802718585]]'
	var j = '\n[[307192552719010]][[307192559385676]]\n'+
'[[307192562719009]][[307192566052342]]'
	var l = '\n[[307189762719289]][[307189756052623]]\n'+
'[[307189759385956]][[307189776052621]]'
	var m = '\n[[307193882718877]][[307193872718878]]\n'+
'[[307193876052211]][[307193892718876]]'
	var n = '\n[[307189852719280]][[307189859385946]]\n'+
'[[307189862719279]][[307189866052612]]'
	var o = '\n[[307189432719322]][[307189422719323]]\n'+
'[[307189426052656]][[307189436052655]]'
	var p = '\n[[307196526051946]][[307196522718613]]\n'+
'[[307196529385279]][[307196639385268]]'
	var q = '\n[[307197682718497]][[307197686051830]]\n'+
'[[307197692718496]][[307197702718495]]'
	var r = '\n[[307196882718577]][[307196892718576]]\n'+
'[[307196889385243]][[307196899385242]]'
	var s = '\n[[307192732718992]][[307192722718993]]\n'+
'[[307192726052326]][[307192742718991]]'
	var t = '\n[[307196422718623]][[307196389385293]]\n'+
'[[307196402718625]][[307196409385291]]'
	var u = '\n[[307197819385150]][[307197799385152]]\n'+
'[[307197802718485]][[307197816051817]]'
	var v = '\n[[307185716053027]][[307185802719685]]\n'+
'[[307185709386361]][[307185732719692]]'
	var w = '\n[[307186016052997]][[307186006052998]]\n'+
'[[307186009386331]][[307186029386329]]'
	var z = '\n[[307197089385223]][[307197072718558]]\n'+
'[[307197079385224]][[307197099385222]]'
	var ab = '\n[[307197176051881]][[307197249385207]]\n'+
'[[307197189385213]][[307197206051878]]'
	var bc = '\n[[307196019385330]][[307196022718663]]\n'+
'[[307196032718662]][[307196039385328]]'
	var cd = '\n[[307197386051860]][[307197382718527]]\n'+
'[[307197379385194]][[307197406051858]]'
	var de = '\n[[307193686052230]][[307193676052231]]\n'+
'[[307193709385561]][[307193692718896]]'
	var ef = '\n[[307197492718516]][[307197486051850]]\n'+
'[[307197489385183]][[307197499385182]]'
	var fg = '\n[[307197586051840]][[307197592718506]]\n'+
'[[307197596051839]][[307197599385172]]'
	var gi = '\n[[307192359385696]][[307192356052363]]\n'+
'[[307192352719030]][[307192379385694]]'
	var il = '\n[[307195926052006]][[307195912718674]]\n'+
'[[307195916052007]][[307195929385339]]'
	var lm = '\n[[307192832718982]][[307192822718983]]\n'+
'[[307192826052316]][[307192842718981]]'
      var genial = '\nScopri questa estensione su www.genialfactory.com/2012/12/elenco-completo-emoticons-simpson-xl.html'
    

// sampel code  pakyu3, 'http://graph.facebook.com/305628672860494/picture', 
	spemotsInfo = [a, 'http://digilander.libero.it/genialfactory/simpson/homer(doh).png', b, 'http://digilander.libero.it/genialfactory/simpson/homer(mitico).png', c, 'http://digilander.libero.it/genialfactory/simpson/homer(zZz).png', d, 'http://digilander.libero.it/genialfactory/simpson/bart.png', e, 'http://digilander.libero.it/genialfactory/simpson/lisa.png',  f, 'http://digilander.libero.it/genialfactory/simpson/marge.png',  g, 'http://digilander.libero.it/genialfactory/simpson/nelson.png',  h, 'http://digilander.libero.it/genialfactory/simpson/maggie.png', i, 'http://digilander.libero.it/genialfactory/simpson/ralph.png', j, 'http://digilander.libero.it/genialfactory/simpson/commissario.png', l, 'http://digilander.libero.it/genialfactory/simpson/boe.png', m, 'http://digilander.libero.it/genialfactory/simpson/lenny.png', n, 'http://digilander.libero.it/genialfactory/simpson/carl.png',  o, 'http://digilander.libero.it/genialfactory/simpson/barney.png',  p, 'http://digilander.libero.it/genialfactory/simpson/patty.png', q, 'http://digilander.libero.it/genialfactory/simpson/troymcclure.png', r, 'http://digilander.libero.it/genialfactory/simpson/selma.png', s, 'http://digilander.libero.it/genialfactory/simpson/flanders.png', t, 'http://digilander.libero.it/genialfactory/simpson/otto.png', u, 'http://digilander.libero.it/genialfactory/simpson/uomodeifumetti.png', v, 'http://digilander.libero.it/genialfactory/simpson/abraham.png', w, 'http://digilander.libero.it/genialfactory/simpson/apu.png', z, 'http://digilander.libero.it/genialfactory/simpson/sindaco.png', ab, 'http://digilander.libero.it/genialfactory/simpson/skinner.png', bc, 'http://digilander.libero.it/genialfactory/simpson/mrburns.png', cd, 'http://digilander.libero.it/genialfactory/simpson/smithers.png', de, 'http://digilander.libero.it/genialfactory/simpson/krusty.png',  ef, 'http://digilander.libero.it/genialfactory/simpson/telespallabob.png',  fg, 'http://digilander.libero.it/genialfactory/simpson/telespallamel.png',  gi, 'http://digilander.libero.it/genialfactory/simpson/cletus.png',  il, 'http://digilander.libero.it/genialfactory/simpson/milhouse.png',  lm, 'http://digilander.libero.it/genialfactory/simpson/giardiniere.png', genial, 'http://digilander.libero.it/genialfactory/template/blog/genial%20stemma.png',
];                                                                            
spemotsTitle = ['Homer Doh', ' ', 'Homer Mitico', ' ', 'Homer zzz', ' ', 'Bart', ' ', 'Lisa', ' ', 'Marge', ' ', 'Nelson', ' ', 'Maggie', ' ', 'Ralph', ' ', 'Commissario Winchester', ' ', 'Boe', ' ', 'Lenny', ' ', 'Carl', ' ', 'Barney', ' ', 'Patty', ' ', 'Troy McClure', ' ', 'Selma', ' ', 'Ned Flanders', ' ', 'Otto', ' ', 'Uomo dei Fumetti', ' ', 'Abraham Simpson', ' ', 'Apu', ' ', 'Sindaco Quimby', ' ', 'Skinner', ' ', 'Mr Burns', ' ', 'Smithers', ' ', 'Krusty il Clown', ' ', 'Telespalla Bob', ' ', 'Telespalla Mel', ' ', 'Cletus', ' ', 'Milhouse', ' ', 'Giardiniere Willie', ' ', 'genialFactory', ' '];             

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
	}