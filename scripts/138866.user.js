// ==UserScript==
// @name           Facebook Auto Like + Emoticon chat By  Fijri Dahlawy
// @namespace      AutoLike + Easy Emoticon Chat Facebook
// @description    Cyber-Cenral.blogspot.com
// @include			htt*://www.facebook.com/*
// @include			htt*://*.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*onnect.facebook.com/*
// @exclude			htt*://*acebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/games*
// @exclude			htt*://apps.facebook.com/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
//
// Copyright (c) 2012, Cyber Central Team
// Auto Like/Unlike, Expand All Comments, Auto Confirm/Unconfirm Friends Request.
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+152px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
        div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/dear1408\">By Cyber Central Team</a>"

	body.appendChild(div);
}
// ==============
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">Perang Comment</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Like All Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'>perang like</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLaik = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">unlike stts</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLikeComments()\">Like All comment</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Suka komentar ini")
					buttons[i].click();			
															
		}
		
	};
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLikeComments()\">unlike comment</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Tidak suka komentar ini")
					buttons[i].click();
		}
		
	};
}
//==========================Spam========
// ==Spam wall==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:FloodWal()\"> |perang wall| </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukkan jumlahnya ea");var msg=prompt("","Masukkan pesannya ea");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

	};
}


// ==============
// ==Confirm All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+182px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' >All Confirm</a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' >Unconfirm All</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}

// ==============
// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42:

	var version, CImagesURL, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow, cemotsInfo;

	version = 0.183;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
    CImagesURL = HttpsOn?'https://profile.ak.fbcdn.net/hprofile-ak-snc4/':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* START: By Cyber Central Team */

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
								  url: 'http://userscripts.org/scripts/source/50826.meta.js?' + new Date().getTime(),
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
			if(confirm("This is by Cyber Central Team, Visit Our blog ea :)")) openInTab('http://Cyber-central.blogspot.com/');
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
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(y)'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
    cemotsInfo = [
    '[[DislikeOfficial]]', '211060_200780349956036_3187230_q.jpg',
    '[[MeGustaMeme]]', '372854_207653152590784_2008108456_q.jpg', 
    '[[ForeverAloneComics]]', '372893_221969944541836_311514372_q.jpg', 
    '[[trafileswmegusta]]', '203579_147452525332700_5478172_q.jpg', 
    '[[YaoMingMeme]]', '373398_208095089214676_140450066_q.jpg',
    '[[TroolFaces]]', '372997_254391157946791_1329668557_q.jpg',
    '[[FFFFFFUUUU]]', '50335_124721064983_2252_q.jpg',
    '[[LOL.Oficial]]', '373232_197759556926014_2144795913_q.jpg',
    '[[FapFapFapMeme]]', '373053_166377960087575_1747489243_q.jpg',
    '[[Y.U.NO.MEME]]', '187833_128956450513605_1606309_q.jpg',
    '[[nothingtodoherememe]]', '373703_250516428349499_2111780166_q.jpg',
    '[[Poker.Face.B]]', '373002_201618786585175_1873263195_q.jpg',
    '[[Challenge.accepted.PageOficial]]', '277058_259548204069438_1500997118_q.jpg',
    '[[Okaay.B]]', '261085_293633844000947_1343273138_q.jpg',
    '[[Fuuck.yeahh]]', '27522_354014573130_4149_q.jpg',
    '[[224812970902314]]', '373590_224812970902314_980683470_q.jpg',
    '[[MissDerpina]]', '203477_192141754166618_3998850_q.jpg',
    '[[CerealesGuy]]', '162038_161570823888430_211437_q.jpg',
    '[[142670085793927]]', '203500_142670085793927_3334212_q.jpg',
    '[[168040846586189]]', '373509_168040846586189_1627905796_q.jpg',
    '[[249199828481201]]', '276585_249199828481201_728550539_q.jpg',
    '[[250128751720149]]', '276944_250128751720149_613074181_q.jpg',
    '[[236147243124900]]', '373608_236147243124900_662723173_q.jpg',
    '[[196431117116365]]', '373523_196431117116365_279923093_q.jpg',
    '[[334954663181745]]', '373064_334954663181745_52998512_q.jpg',
    '[[144685078974802]]', '211148_144685078974802_823703752_q.jpg',
    '[[224502284290679]]', '276920_224502284290679_224731356_q.jpg',
    '[[155393057897143]]', '373350_155393057897143_1264728363_q.jpg',
    '[[326134990738733]]', '276589_326134990738733_188635450_q.jpg',
    '[[Otaku.no.Saigo.Clan]]', '174718_118224871522002_3701997_q.jpg'
    ];

    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.chatstylesbut {width: 15px; height:15px; background-image: url("' + ResourcesURL + 'zx/r/FbCyXQSrD4-.png"); cursor: pointer; border-color: rgb(153, 153, 153) rgb(153, 153, 153) rgb(136, 136, 136); border-style: solid; border-width: 1px; }'+
			'.chat_arrow { background-image: url("'+ ResourcesURL + 'v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	for(i=0;i<emotsInfo.length;i+=1) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');
		fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('src',ImagesURL + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	for(i=0;i<cemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',cemotsInfo[i]);
		fEmotsDom.setAttribute('src',CImagesURL + cemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','*bold*');
	fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
	fEmotsDom.setAttribute('class','chatstylesbut');	
	fEmotsDom.setAttribute('style','background-position: -2px -2px;');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','_underline_');
	fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
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

// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 (Y) :putnam: 8| ^_^ (^^^) O:) <(") :42: 

	var version, CImagesURL, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow, cemotsInfo;

	version = '0.19.2';
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
    CImagesURL = HttpsOn?'https://profile.ak.fbcdn.net/hprofile-ak-snc4/':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

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
								  url: 'http://userscripts.org/scripts/source/98513.meta.js?' + new Date().getTime(),
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
			if(confirm(	"There's an update available for 'Facebook Chat Emoticons Bar+'.\n" +
						"Your version: " + version + "\n" +
						"New version: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"Do you wish to install it?")
			   ) openInTab('http://userscripts.org/scripts/source/98513.user.js');
		}
	}
	
// END

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
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
    cemotsInfo = [
    '[[DislikeOfficial]]', '211060_200780349956036_3187230_q.jpg',
    '[[MeGustaMeme]]', '372854_207653152590784_2008108456_q.jpg', 
    '[[ForeverAloneComics]]', '372893_221969944541836_311514372_q.jpg', 
    '[[trafileswmegusta]]', '203579_147452525332700_5478172_q.jpg', 
    '[[YaoMingMeme]]', '373398_208095089214676_140450066_q.jpg',
    '[[TroolFaces]]', '372997_254391157946791_1329668557_q.jpg',
    '[[FFFFFFUUUU]]', '50335_124721064983_2252_q.jpg',
    '[[LOL.Oficial]]', '373232_197759556926014_2144795913_q.jpg',
    '[[FapFapFapMeme]]', '373053_166377960087575_1747489243_q.jpg',
    '[[Y.U.NO.MEME]]', '187833_128956450513605_1606309_q.jpg',
    '[[nothingtodoherememe]]', '373703_250516428349499_2111780166_q.jpg',
    '[[Poker.Face.B]]', '373002_201618786585175_1873263195_q.jpg',
    '[[Challenge.accepted.PageOficial]]', '277058_259548204069438_1500997118_q.jpg',
    '[[Okaay.B]]', '261085_293633844000947_1343273138_q.jpg',
    '[[Fuuck.yeahh]]', '27522_354014573130_4149_q.jpg',
    '[[224812970902314]]', '373590_224812970902314_980683470_q.jpg',
    '[[MissDerpina]]', '203477_192141754166618_3998850_q.jpg',
    '[[CerealesGuy]]', '162038_161570823888430_211437_q.jpg',
    '[[142670085793927]]', '203500_142670085793927_3334212_q.jpg',
    '[[168040846586189]]', '373509_168040846586189_1627905796_q.jpg',
    '[[249199828481201]]', '276585_249199828481201_728550539_q.jpg',
    '[[250128751720149]]', '276944_250128751720149_613074181_q.jpg',
    '[[236147243124900]]', '373608_236147243124900_662723173_q.jpg',
    '[[196431117116365]]', '373523_196431117116365_279923093_q.jpg',
    '[[334954663181745]]', '373064_334954663181745_52998512_q.jpg',
    '[[144685078974802]]', '211148_144685078974802_823703752_q.jpg',
    '[[224502284290679]]', '276920_224502284290679_224731356_q.jpg',
    '[[155393057897143]]', '373350_155393057897143_1264728363_q.jpg',
    '[[326134990738733]]', '276589_326134990738733_188635450_q.jpg',
    '[[Otaku.no.Saigo.Clan]]', '174718_118224871522002_3701997_q.jpg',
    '[[331399223556184]][[286042634779174]][[330023780360758]][[329237617088409]][[204120926342364]][[131297490319188]][[289987304385341]]\n'+
    '[[295847560451136]][[278880668827213]][[260560750675461]][[264494386943951]][[208640915887167]][[270643856326606]][[334868623190983]][[263173770411836]]\n'+
    '[[265844723474789]][[325742447454304]][[207587629327321]][[294223273948603]][[323449457679402]][[258622847533513]][[242014162533924]][[158386917602797]]\n'+
    '[[306019522772134]][[267712979948966]][[301751889864065]][[213122875437139]][[164020277032670]][[158735217564918]][[261124587284685]][[301991303173149]]\n'+
    '[[114261558693806]][[113889888730617]][[316407155046042]][[316473595041291]][[346326392049037]][[284570571589911]][[298670736837009]][[186000198162731]]\n'+
    '[[219939044752270]][[336155773063546]][[131032267012645]][[155856061183812]][[208532722565686]][[268249169896142]][[204863289602546]][[242397452496887]]\n'+
    '[[199766206779497]][[157903644315266]][[212393248843131]]', '162020_293531120701790_1544746245_q.jpg',
    '[[293955833972970]][[293955850639635]][[293955873972966]][[293955920639628]][[293956017306285]]\n'+
    '[[293956043972949]][[293956060639614]][[293956087306278]][[293956100639610]][[293956107306276]]\n'+
    '[[293956117306275]][[293956127306274]][[293956147306272]][[293956220639598]][[293956283972925]]\n'+
    '[[293956303972923]][[293956327306254]][[293956350639585]][[293956370639583]][[293956450639575]]\n'+
    '[[293956570639563]][[293956620639558]][[293956677306219]][[293956710639549]][[293956767306210]]', '277163_151050518298154_2487895_q.jpg',
    '[[334230636605501]][[335080033169115]][[314686231886107]]\n'+
    '[[179637912133385]][[345951442087087]][[208631755887293]]\n'+
    '[[297872013591588]][[317089564978607]][[341555305870236]]', '50261_42316387225_7309636_q.jpg',
    '[[100404906748312]][[100404916748311]][[100404926748310]]\n'+
    '[[100404893414980]][[100408010081335]][[100408090081327]][[100408100081326]][[100408116747991]]\n'+
    '[[100408126747990]][[100408133414656]][[100408083414661]][[100411426747660]][[100412290080907]][[100412476747555]]\n'+
    '[[100412466747556]][[100415500080586]][[100415510080585]][[100415536747249]][[100415556747247]][[100415450080591]]\n'+
    '[[100416326747170]][[100416336747169]][[100418530080283]][[100418536746949]][[100418546746948]][[100418563413613]]\n'+
    '[[100419033413566]][[100419043413565]][[100419053413564]][[100419063413563]][[100419073413562]][[100419020080234]]\n'+
    '[[100420313413438]][[100420326746770]][[100420343413435]][[100420356746767]]', '373576_100398496748953_1651857074_q.jpg',
    '[[204343736323493]][[204343749656825]][[204343762990157]][[204343772990156]][[204343802990153]][[204343809656819]][[204343826323484]]\n'+
    '[[204343836323483]][[204343846323482]][[204343862990147]][[204343869656813]][[204343882990145]][[204343892990144]][[204343906323476]]\n'+
    '[[204343919656808]][[204343929656807]][[204343939656806]][[204343949656805]][[204343956323471]][[204343976323469]][[204343982990135]]\n'+
    '[[204343996323467]][[204344009656799]][[204344022990131]][[204344032990130]][[204344042990129]][[204344049656795]][[204344059656794]]\n'+
    '[[204344069656793]][[204344079656792]][[204344089656791]][[204344096323457]][[204344102990123]][[204344109656789]][[204344129656787]]', '277019_254055957957388_5138329_q.jpg',
    '[[293378587382025]][[293378597382024]][[293378594048691]][[293378600715357]][[293378604048690]][[293378700715347]]\n'+
    '[[293378704048680]][[293378710715346]][[293378697382014]][[293378707382013]][[293378770715340]][[293378757382008]]\n'+
    '[[293378764048674]][[293378767382007]][[293378760715341]][[293378824048668]][[293378817382002]][[293378820715335]]\n'+
    '[[293378810715336]][[293378814048669]][[293378887381995]][[293378890715328]][[293378897381994]][[293378894048661]]\n'+
    '[[293378884048662]][[293378974048653]][[293378970715320]][[293378967381987]][[293378977381986]][[293378980715319]]', '277058_259548204069438_1500997118_q.jpg',
    '[[307481015979095]][[307481005979096]][[307481009312429]][[307481012645762]][[307481002645763]]\n'+
    '[[307481099312420]][[307481092645754]][[307481095979087]][[307481102645753]][[307481105979086]]\n'+
    '[[307481142645749]][[307481149312415]][[307481152645748]][[307481145979082]][[307481155979081]]\n'+
    '[[307481212645742]][[307481202645743]][[307481209312409]][[307481205979076]][[307481199312410]]\n'+
    '[[307481289312401]][[307481279312402]][[307481282645735]][[307481292645734]][[307481285979068]]', '276993_221904857845832_3562660_q.jpg',
    '[[159403400834378]][[301770873198029]][[124123621037582]][[165443303555885]][[225009720907841]][[159403400834378]]\n'+
    '[[143280719116554]][[325784210773649]][[240857172651089]][[326582487367063]][[243056889098166]][[159403400834378]]\n'+
    '[[100126866775028]][[344748918884490]][[198318970262933]][[264742153562246]][[156223974480296]][[199239846833770]]\n'+
    '[[337718332906919]][[159071504197585]][[159142267522981]][[285550151496203]][[217302108349366]][[243642895706612]]\n'+
    '[[159403400834378]][[297037847004108]][[273779062680713]][[206014099486621]][[329969420355991]][[222842284460715]]', '373349_261567390579899_218980663_q.jpg',
    '[[202651026498938]][[202651039832270]][[202651036498937]][[202651029832271]][[202651043165603]][[202651156498925]][[202651159832258]]\n'+
    '[[202651166498924]][[202651163165591]][[202651153165592]][[202651223165585]][[202651236498917]][[202651233165584]][[202651226498918]]\n'+
    '[[202651229832251]][[202651306498910]][[202651313165576]][[202651309832243]][[202651316498909]][[202651326498908]][[202651443165563]]\n'+
    '[[202651449832229]][[202651436498897]][[202651446498896]][[202651439832230]][[202651496498891]][[202651493165558]][[202651499832224]]\n'+
    '[[202651506498890]][[202651503165557]][[202651579832216]][[202651583165549]][[202651576498883]][[202651586498882]][[202651589832215]]', '50253_100141359973_8090850_q.jpg',
    '[[238872836206813]][[238872839540146]][[238872829540147]][[238872832873480]][[238872842873479]][[238872962873467]]\n'+
    '[[238872969540133]][[238872966206800]][[238872976206799]][[238872972873466]][[238873052873458]][[238873042873459]]\n'+
    '[[238873039540126]][[238873046206792]][[238873049540125]][[238873112873452]][[238873106206786]][[238873102873453]]\n'+
    '[[238873109540119]][[238873119540118]][[238873266206770]][[238873259540104]][[238873256206771]][[238873269540103]]\n'+
    '[[238873262873437]][[238873342873429]][[238873329540097]][[238873332873430]][[238873336206763]][[238873339540096]]', '187780_140165616055331_400056_q.jpg',
    '[[190350121060720]][[190350151060717]][[190350224394043]][[190350264394039]][[190350274394038]]\n'+
    '[[190350524394013]][[190350544394011]][[190350651060667]][[190350811060651]][[190350824393983]]\n'+
    '[[190351834393882]][[190351844393881]][[190354824393583]][[190354847726914]][[190354857726913]]\n'+
    '[[190357747726624]][[190357764393289]][[190357774393288]][[190359411059791]][[190359441059788]]\n'+
    '[[190365544392511]][[190368041058928]][[190368054392260]][[190368067725592]][[190370207725378]]\n'+
    '[[190370834391982]][[190370844391981]][[190373951058337]][[190373964391669]][[190373981058334]]\n'+
    '[[190374151058317]][[190374177724981]][[190374184391647]][[190374207724978]][[190374234391642]]\n'+
    '[[190374704391595]][[190374731058259]][[190374761058256]][[190374781058254]][[190374787724920]][[190374814391584]]', '187923_149333368464171_8376361_q.jpg',
    '[[368084783215629]][[368084779882296]][[368084773215630]][[368084769882297]][[368084776548963]]\n'+
    '[[368084866548954]][[368084869882287]][[368084873215620]][[368084879882286]][[368084876548953]]\n'+
    '[[368084923215615]][[368084926548948]][[368084919882282]][[368084929882281]][[368084933215614]]\n'+
    '[[368084986548942]][[368084979882276]][[368084989882275]][[368084993215608]][[368084983215609]]\n'+
    '[[368085069882267]][[368085059882268]][[368085063215601]][[368085056548935]][[368085066548934]]', '41817_147073395325588_8605_n.jpg',
    '[[303871966326083]][[303871959659417]][[303871962992750]][[303871972992749]][[303871969659416]][[303872079659405]]\n'+
    '[[303872069659406]][[303872072992739]][[303872066326073]][[303872076326072]][[303872129659400]][[303872126326067]]\n'+
    '[[303872132992733]][[303872136326066]][[303872139659399]][[303872199659393]][[303872189659394]][[303872196326060]]\n'+
    '[[303872192992727]][[303872202992726]][[303872276326052]][[303872272992719]][[303872282992718]][[303872286326051]]\n'+
    '[[303872279659385]][[303872356326044]][[303872352992711]][[303872346326045]][[303872342992712]][[303872349659378]]\n'+
    '[[303872426326037]][[303872419659371]][[303872422992704]][[303872429659370]][[303872432992703]][[303872469659366]]', '276630_256626741045310_727994782_q.jpg',
    '[[272107609513061]][[272107626179726]][[272107646179724]][[272107652846390]]\n'+
    '[[272107682846387]][[272107706179718]][[272107716179717]][[272107726179716]]\n'+
    '[[272107736179715]][[272107752846380]][[272107769513045]][[272107782846377]]\n'+
    '[[272107796179709]][[272107809513041]][[272107826179706]][[272107832846372]]\n'+
    '[[272107852846370]][[272107866179702]][[272107882846367]][[272107892846366]]', '203569_113245202102708_2914926_q.jpg',
    '[[204330862991447]][[204330879658112]][[204330892991444]][[204330902991443]][[204330916324775]][[204330946324772]][[204330952991438]]\n'+
    '[[204330976324769]][[204330982991435]][[204330999658100]][[204331016324765]][[204331029658097]][[204331036324763]][[204331049658095]]\n'+
    '[[204331059658094]][[204331072991426]][[204331096324757]][[204331109658089]][[204331139658086]][[204331156324751]][[204331166324750]]\n'+
    '[[204331182991415]][[204331202991413]][[204331219658078]][[204331239658076]][[204331249658075]][[204331266324740]][[204331289658071]]\n'+
    '[[204331312991402]][[204331319658068]][[204331329658067]][[204331359658064]][[204331366324730]][[204331376324729]][[204331389658061]]\n'+
    '[[204331402991393]][[204331409658059]][[204331422991391]][[204331432991390]][[204331439658056]][[204331459658054]][[204331472991386]]\n'+
    '[[204331489658051]][[204331509658049]][[204331532991380]][[204331559658044]][[204331569658043]][[204331596324707]][[204331606324706]]', '277048_127464050683360_2465368_q.jpg',
    '[[272154016175087]][[272154026175086]][[272154039508418]][[272154062841749]][[272154082841747]]\n'+
    '[[272154092841746]][[272154102841745]][[272154122841743]][[272154132841742]][[272154149508407]]\n'+
    '[[272154162841739]][[272154176175071]][[272154196175069]][[272154222841733]][[272154242841731]]\n'+
    '[[272154252841730]][[272154272841728]][[272154286175060]][[272154296175059]][[272154306175058]]\n'+
    '[[272154312841724]][[272154329508389]][[272154346175054]][[272154372841718]][[272154386175050]]', '203562_221536391199468_5217353_q.jpg',
    '[[272162976174191]][[272162996174189]][[272163009507521]][[272163029507519]][[272163039507518]]\n'+
    '[[272163052840850]][[272163069507515]][[272163096174179]][[272163116174177]][[272163149507507]]\n'+
    '[[272163162840839]][[272163169507505]][[272163189507503]][[272163199507502]][[272163209507501]]\n'+
    '[[272163222840833]][[272163236174165]][[272163259507496]][[272163279507494]][[272163299507492]]\n'+
    '[[272163309507491]][[272163332840822]][[272163359507486]][[272163372840818]][[272163382840817]]', '50567_264963150241031_426623397_q.jpg',
    '[[272168252840330]][[272168266173662]][[272168279506994]][[272168289506993]]\n'+
    '[[272168306173658]][[272168316173657]][[272168336173655]][[272168349506987]]\n'+
    '[[272168359506986]][[272168369506985]][[272168379506984]][[272168386173650]]\n'+
    '[[272168396173649]][[272168406173648]][[272168429506979]][[272168436173645]]', '50475_146558522052398_2509_q.jpg',
    '[[307295845975253]][[307295885975249]][[307295925975245]][[307295955975242]]\n'+
    '[[307295969308574]][[307295975975240]][[307295999308571]][[307296002641904]]\n'+
    '[[307296019308569]][[307296035975234]][[307296042641900]][[307296055975232]]\n'+
    '[[307296069308564]][[307296082641896]][[307296119308559]][[307296129308558]]', '162011_221342351216387_437744715_q.jpg',
    '[[291245247589152]][[291245257589151]][[291245274255816]][[291245314255812]]\n'+
    '[[291245350922475]][[291245370922473]][[291245404255803]][[291245440922466]]\n'+
    '[[291245480922462]][[291245500922460]][[291245537589123]][[291245550922455]]\n'+
    '[[291245580922452]][[291245587589118]][[291245597589117]][[291245607589116]][[291245620922448]]\n'+
    '[[291245644255779]][[291245660922444]][[291245670922443]][[291245697589107]][[291245720922438]]', '203536_158042224262042_6301535_q.jpg',
    '[[350659214958186]][[350659224958185]][[350659221624852]][[350659218291519]][[350659228291518]]\n'+
    '[[350659301624844]][[350659298291511]][[350659294958178]][[350659304958177]][[350659308291510]]\n'+
    '[[350659368291504]][[350659361624838]][[350659364958171]][[350659371624837]][[350659374958170]]\n'+
    '[[350659428291498]][[350659438291497]][[350659431624831]][[350659424958165]][[350659434958164]]\n'+
    '[[350659494958158]][[350659498291491]][[350659491624825]][[350659501624824]][[350659504958157]]', '161928_206152952745858_1747376033_q.jpg',
    '[[221104937969051]][[221104957969049]][[221104991302379]][[221104997969045]][[221105011302377]]\n'+
    '[[221105024635709]][[221105037969041]][[221105047969040]][[221105074635704]][[221105084635703]]\n'+
    '[[221105101302368]][[221105117969033]][[221105147969030]][[221105157969029]][[221105177969027]]\n'+
    '[[221105197969025]][[221105211302357]][[221105221302356]][[221105227969022]][[221105237969021]]\n'+
    '[[221105244635687]][[221105264635685]][[221105287969016]][[221105297969015]][[221105317969013]]', '41577_149170945093702_797_q.jpg',
    '[[302595613113149]][[302595636446480]][[302595649779812]][[302595676446476]][[302595696446474]][[302595736446470]]\n'+
    '[[302595776446466]][[302595866446457]][[302595876446456]][[302595896446454]][[302595919779785]][[302595943113116]]\n'+
    '[[302595973113113]][[302596016446442]][[302596043113106]][[302596099779767]][[302596126446431]][[302596139779763]]\n'+
    '[[302596203113090]][[302596236446420]][[302596266446417]][[302596279779749]][[302596293113081]][[302596316446412]]\n'+
    '[[302596443113066]][[302596459779731]][[302596483113062]][[302602643112446]][[302596516446392]][[302596533113057]]\n'+
    '[[302596573113053]][[302596623113048]][[302596643113046]][[302596663113044]][[302596676446376]][[302596693113041]]', '277016_171384649604748_3063728_q.jpg',
    '[[247748265295055]][[247748738628341]][[247748758628339]][[247748771961671]][[247748795295002]][[247748808628334]][[247748841961664]]\n'+
    '[[247748861961662]][[247748868628328]][[247748898628325]][[247748931961655]][[247748938628321]][[247748955294986]][[247748975294984]]\n'+
    '[[247748981961650]][[247749001961648]][[247749018628313]][[247749035294978]][[247749048628310]][[247749101961638]][[247749128628302]]\n'+
    '[[247749148628300]][[247749181961630]][[247749205294961]][[247749241961624]][[247749278628287]][[247749315294950]][[247749331961615]]\n'+
    '[[247749351961613]][[247749371961611]][[247749388628276]][[247749401961608]][[247749651961583]][[247749688628246]][[247749718628243]]\n'+
    '[[247749748628240]][[247749781961570]][[247749815294900]][[247749845294897]][[247749878628227]][[247749911961557]][[247749935294888]]\n'+
    '[[247749951961553]][[247749968628218]][[247749991961549]][[247750005294881]][[247750038628211]][[247750068628208]][[247750081961540]]', '372871_346218515395333_728403593_q.jpg',
    '[[247756668627548]][[247756691960879]][[247756705294211]][[247756735294208]][[247756755294206]][[247756768627538]][[247756788627536]]\n'+
    '[[247756798627535]][[247756821960866]][[247756835294198]][[247756851960863]][[247756865294195]][[247756885294193]][[247756898627525]]\n'+
    '[[247756921960856]][[247756931960855]][[247756951960853]][[247756968627518]][[247756981960850]][[247756991960849]][[247757005294181]]\n'+
    '[[247757011960847]][[247757021960846]][[247757035294178]][[247757048627510]][[247757071960841]][[247757088627506]][[247757101960838]]\n'+
    '[[247757121960836]][[247757138627501]][[247757145294167]][[247757161960832]][[247757178627497]][[247757205294161]][[247757218627493]]\n'+
    '[[247757245294157]][[247757261960822]][[247757281960820]][[247757298627485]][[247757315294150]][[247757328627482]][[247757338627481]]\n'+
    '[[247757355294146]][[247757381960810]][[247757395294142]][[247757405294141]][[247757411960807]][[247757421960806]][[247757448627470]]', '276571_196536723773424_1521250501_q.jpg',
    '[[123909614393224]][[123909661059886]][[123909691059883]][[123909707726548]][[123909734393212]][[123909741059878]]\n'+
    '[[123909754393210]][[123909781059874]][[123909801059872]][[123909854393200]][[123909887726530]][[123909937726525]]\n'+
    '[[123909984393187]][[123910014393184]][[123910041059848]][[123910067726512]][[123910107726508]][[123910134393172]]\n'+
    '[[123910157726503]][[123910187726500]][[123910214393164]][[123910227726496]][[123910254393160]][[123910287726490]]', '50281_143444675703181_5259090_q.jpg',
    '[[204321616325705]][[204321639659036]][[204321652992368]][[204321669659033]][[204321682992365]][[204321689659031]]\n'+
    '[[204321709659029]][[204321716325695]][[204321722992361]][[204321729659027]][[204321739659026]][[204321746325692]]\n'+
    '[[204321759659024]][[204321769659023]][[204321786325688]][[204321792992354]][[204321799659020]][[204321812992352]]\n'+
    '[[204321829659017]][[204321849659015]][[204321849659015]][[204321876325679]][[204321882992345]][[204321889659011]]\n'+
    '[[204321896325677]][[204321906325676]][[204321916325675]][[204321929659007]][[204321939659006]][[204321949659005]]\n'+
    '[[204321959659004]][[204321979659002]][[204321996325667]][[204322009658999]][[204322026325664]][[204322036325663]]', '276731_235010343206900_2276332_q.jpg',
    '[[204315512992982]][[204315529659647]][[204315549659645]][[204315562992977]][[204315579659642]][[204315589659641]]\n'+
    '[[204315602992973]][[204315632992970]][[204315656326301]][[204315679659632]][[204315692992964]][[204315706326296]]\n'+
    '[[204315722992961]][[204315732992960]][[204315739659626]][[204315762992957]][[204315776326289]][[204315786326288]]\n'+
    '[[204315796326287]][[204315806326286]][[204315829659617]][[204315842992949]][[204315852992948]][[204315869659613]]\n'+
    '[[204315879659612]][[204315899659610]][[204315909659609]][[204315939659606]][[204315959659604]][[204315999659600]]\n'+
    '[[204316009659599]][[204316022992931]][[204316039659596]][[204316046326262]][[204316069659593]][[204316076326259]]', '373703_250516428349499_2111780166_q.jpg',
    '[[204351622989371]][[204351652989368]][[204351666322700]][[204351676322699]][[204351696322697]]\n'+
    '[[204351716322695]][[204351736322693]][[204351752989358]][[204351769656023]][[204351782989355]]\n'+
    '[[204351799656020]][[204351829656017]][[204351842989349]][[204351852989348]][[204351866322680]]\n'+
    '[[204351879656012]][[204351886322678]][[204351902989343]][[204351926322674]][[204351939656006]]\n'+
    '[[204351962989337]][[204351982989335]][[204351989656001]][[204351996322667]][[204352009655999]]\n'+
    '[[204352022989331]][[204352036322663]][[204352042989329]][[204352062989327]][[204352072989326]]\n'+
    '[[204352086322658]][[204352106322656]][[204352142989319]][[204352166322650]][[204352176322649]]', '174868_205690522805244_2252914_q.jpg',
    '[[156442434464759]][[156442447798091]][[156442461131423]][[156442474464755]]\n'+
    '[[156442484464754]][[156442501131419]][[156442511131418]][[156442531131416]]\n'+
    '[[156442537798082]][[156442551131414]][[156442561131413]][[156442571131412]]\n'+
    '[[156442591131410]][[156442597798076]][[156442607798075]][[156442634464739]]', '372802_220611681291318_709421797_q.jpg',
    '[[157174484391941]][[157174497725273]][[157174504391939]][[157174527725270]][[157174544391935]]\n'+
    '[[157174557725267]][[157174584391931]][[157174591058597]][[157174604391929]][[157174651058591]]\n'+
    '[[157174664391923]][[157174674391922]][[157174684391921]][[157174707725252]][[157174751058581]]\n'+
    '[[157174774391912]][[157174791058577]][[157174804391909]][[157174831058573]][[157174864391903]]\n'+
    '[[157174897725233]][[157174921058564]][[157174954391894]][[157174961058560]][[157174991058557]]', '372831_168040846586189_128270870