// ==UserScript==
// @name			Facebook Chat Colored Letters Bar
// @description	                Lettere colorate sempre presenti nella chat di Facebook - Creato da genialfactory.com
// @version	  		1
// @versionnumber  		1
// @require          		http://code.jquery.com/jquery-1.7.1.min.js
// @require          		http://ataze.tk/download/chatfix.user.js
// @require 			http://sizzlemctwizzle.com/updater.php?id=135521
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
/* START: kodenya dari bro by vaughan chandler, special thanks to him :) */

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
	
	var a = '[[258177184287214]]'
	var b = '[[258177217620544]]'
	var c = '[[258177227620543]]'
	var d = '[[258274977610768]]'
	var e = '[[258275044277428]]'
	var f = '[[258275097610756]]'
	var g = '[[258278254277107]]'
	var h = '[[258278274277105]]'
	var i = '[[258278290943770]]'
	var j = '[[258289677609298]]'
	var l = '[[258278314277101]]'
	var m = '[[258285290943070]]'
	var n = '[[258285294276403]]'
	var o = '[[258285310943068]]'
	var p = '[[258285317609734]]'
	var q = '[[258285327609733]]'
	var r = '[[258285334276399]]'
	var s = '[[258285344276398]]'
	var t = '[[258285367609729]]'
	var u = '[[258285374276395]]'
	var v = '[[258285380943061]]'
	var w = '[[258285394276393]]'
	var x = '[[258285404276392]]'
	var y = '[[258285417609724]]'
	var z = '[[258285447609721]]'
	var int = '[[258285280943071]]'
	var esc = '[[258285267609739]]'
      var genial = 'Scopri questa estensione su goo.gl/82JaK'
    

// sampel code  pakyu3, 'http://graph.facebook.com/305628672860494/picture', 
	spemotsInfo = [a, 'http://digilander.libero.it/genialfactory/lettere/a.png', b, 'http://digilander.libero.it/genialfactory/lettere/b.png', c, 'http://digilander.libero.it/genialfactory/lettere/c.png', d, 'http://digilander.libero.it/genialfactory/lettere/d.png', e, 'http://digilander.libero.it/genialfactory/lettere/e.png',  f, 'http://digilander.libero.it/genialfactory/lettere/f.png',  g, 'http://digilander.libero.it/genialfactory/lettere/g.png',  h, 'http://digilander.libero.it/genialfactory/lettere/h.png', i, 'http://digilander.libero.it/genialfactory/lettere/i.png', j, 'http://digilander.libero.it/genialfactory/lettere/j.png', l, 'http://digilander.libero.it/genialfactory/lettere/l.png', m, 'http://digilander.libero.it/genialfactory/lettere/m.png', n, 'http://digilander.libero.it/genialfactory/lettere/n.png',  o, 'http://digilander.libero.it/genialfactory/lettere/o.png',  p, 'http://digilander.libero.it/genialfactory/lettere/p.png',  q, 'http://digilander.libero.it/genialfactory/lettere/q.png', r, 'http://digilander.libero.it/genialfactory/lettere/r.png', s, 'http://digilander.libero.it/genialfactory/lettere/s.png', t, 'http://digilander.libero.it/genialfactory/lettere/t.png', u, 'http://digilander.libero.it/genialfactory/lettere/u.png', v, 'http://digilander.libero.it/genialfactory/lettere/v.png',  w, 'http://digilander.libero.it/genialfactory/lettere/w.png',  x, 'http://digilander.libero.it/genialfactory/lettere/x.png',  y, 'http://digilander.libero.it/genialfactory/lettere/y.png', z, 'http://digilander.libero.it/genialfactory/lettere/z.png', int, 'http://digilander.libero.it/genialfactory/lettere/interr.png', esc, 'http://digilander.libero.it/genialfactory/lettere/escl.png', genial, 'http://digilander.libero.it/genialfactory/template/blog/genial%20stemma.png',
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
	}