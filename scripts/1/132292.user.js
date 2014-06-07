// ==UserScript==
// @name			Facebook Chat AlmasyGroup
// @namespace		        Auto Like And Confirm (ALL)
// @version			0.2
// @copyright		        AlmasyGroup
// @description			 اضافة شريط التعابير لدردشة الفيس بوك والاعجاب التلقائي
// @author			AlmasyGroup
// @icon			http://2.bp.blogspot.com/-vuGzfsP1-U4/T59cdFILUmI/AAAAAAAAAKY/W1NTHzQW1tY/s1600/black-facebook-300x300
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			htt*://developers.facebook.com/*
//
// Copyright (c) 2012, AlmasyGroup
// Auto Like/Unlike, And Another Function.


// ==/UserScript==

// ==Add me Up==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like7');
div.style.position = "fixed";
div.style.display = "block";
div.style.opacity= 0.90;
div.style.bottom = "+162px";
div.style.width = "125px";
	div.style.backgroundColor = "#6C266A";
	div.style.border = "2px solid #C0C0C0";
	div.style.padding = "2px";
	div.innerHTML = "<center><a style=\"font-weight:bold;color:#ffffff\"href=\"/groups/Alalmasy\"><b>قروب الالماسي</b></a></center>"

div2 = document.createElement("div");
div2.setAttribute('id','spoiler');
div2.style.position = "fixed";
div2.style.opacity= 0.90;
div2.style.bottom = "+204px";
div2.style.backgroundColor = "#CCD3E3";
div2.style.border = "1px dashed #555";
div2.style.padding = "2px";
div.style.width = "125px";
div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>:: اخفاءالصندوق::</a> <a style='color: #FFFFFF;' onclick='alert(\'Made by Prototype\');'></a></center></div> "

body.appendChild(div);
body.appendChild(div2);

unsafeWindow.spoiler = function() {
var i;
for(i=1;i<=20;i++) {
var x=document.getElementById('like'+i);
if (x.style.display=="none") {
x.style.display="block";
div2.innerHTML = "<center><div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>:: اخفاءالصندوق::</a> <a title='Made by Prototype'></a></center> "
}
else {
x.style.display="none";
div2.innerHTML = "<center><a onclick='spoiler()' title='Click to Open'>&raquo;</a></center>"
}
}
};
}
// ==Expand==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like5');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+122px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisBukaKomeng()'><b>فتح‌التعليقات</b></a>"

body.appendChild(div);

unsafeWindow.OtomatisBukaKomeng = function() {
buttons = document.getElementsByTagName("input");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("") >= 0)
if(buttons[i].getAttribute("name") == "view_all")
buttons[i].click();
}

};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like6');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+102px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisBukaKomengPosts()'><b>منشورات قديمة<b/></a>"

body.appendChild(div);

unsafeWindow.OtomatisBukaKomengPosts = function() {
buttons = document.getElementsByTagName("a");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("lfloat") >= 0)
if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
buttons[i].click();
}

};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like1');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+82px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'><b>اعجاب‌باالكل<b></a>"

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
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+62px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlike()'><b>إلغاءالكل</b></a>"

body.appendChild(div);

unsafeWindow.OtomatisUnlike = function() {
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
div.setAttribute('id','like3');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+42px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaikComments()'><b>اعجاب‌باالتعليقات</b></a>"

body.appendChild(div);

//buat fungsi tunda
function tunda(milliSeconds){
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + milliSeconds);
}



unsafeWindow.OtomatisLaikComments = function() {

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("like_link") >= 0)
if(buttons[i].getAttribute("title") == "Like this comment")
buttons[i].click();
}



};
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like4');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+22px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisUnlikeComments();'><b>إلغاء‌إعجاب‌التعليقات</b></a>"

body.appendChild(div);
//buat fungsi tunda
function tunda(milliSeconds){
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + milliSeconds);
}

unsafeWindow.OtomatisUnlikeComments = function() {


buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("") >= 0)
if(buttons[i].getAttribute("title") == "Unlike this comment")
buttons[i].click();
}

};
}


// ==============





// ==============
// ==Confirm Requests==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like8');
div.style.position = "fixed";
div.style.display = "block";
div.style.opacity= 0.90;
div.style.bottom = "+2px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px dashed #94a3c4";
div.style.padding = "2px";
div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' ><b>تأكيدطلبات‌الصداقة</b></a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' ><b>تجاهل‌طلبات‌الصداقة</b></a>"

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
// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3><(") :42:

	var version, CImagesURL, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow, cemotsInfo;

	version = 0.183;
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
								  url: 'http://userscripts.org/scripts/source/132292.meta.js?' + new Date().getTime(),
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
			if(confirm("There's an update available for 'Facebook Chat Emoticons Bar'.\nDo you wish to install it?")) openInTab('http://userscripts.org/scripts/source/132292.user.js');
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
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3>:O', ':v', ':3', '(y)'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
    cemotsInfo = ['[[]]'];

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
               fEmotsDom.setAttribute('alt','[[239173782833076]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239173782833076/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
       var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239173929499728]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239173929499728/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239174109499710]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239174109499710/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
        	var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239174162833038]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239174162833038/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
       var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239174262833028]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239174262833028/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239174326166355]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239174326166355/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
        	var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239174449499676]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239174449499676/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
       var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239174532833001]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239174532833001/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239180809499040]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239180809499040/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
        	var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239181109499010]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239181109499010/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
       var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239181232832331]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239181232832331/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239185909498530]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239185909498530/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239185912831863]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239185912831863/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239185919498529]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239185919498529/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239187959498325]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239187959498325/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239187962831658]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239187962831658/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239187966164991]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239187966164991/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239187969498324]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239187969498324/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239187972831657]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239187972831657/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239188206164967]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239188206164967/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239188212831633]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239188212831633/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239188802831574]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239188802831574/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239188806164907]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239188806164907/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239188809498240]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239188809498240/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239190802831374]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239190802831374/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239190806164707]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239190806164707/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239191512831303]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239191512831303/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239191522831302]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239191522831302/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239191532831301]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239191532831301/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239192712831183]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239192712831183/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239192696164518]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239192696164518/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239192699497851]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239192699497851/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239192706164517]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239192706164517/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239192709497850]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239192709497850/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239193352831119]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239193352831119/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239193366164451]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239193366164451/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239196169497504]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239196169497504/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239196172830837]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239196172830837/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239196159497505]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239196159497505/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239196789497442]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239196789497442/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239197902830664]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239197902830664/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239197909497330]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239197909497330/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239198842830570]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239198842830570/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239198846163903]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239198846163903/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239198852830569]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239198852830569/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239200359497085]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239200359497085/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','[[239200382830416]]');
               fEmotsDom.setAttribute('src','https://graph.facebook.com/239200382830416/picture');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','www.facebook.com/groups/Alalmasy');
               fEmotsDom.setAttribute('src','http://www.den4b.com/images/download.png');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
               fEmotsListDom.appendChild(fEmotsDom);
      var fEmotsDom = document.createElement('img');
               fEmotsDom.setAttribute('alt','            [[379320338758329]] [[379320355424994]] [[379320348758328]] [[379320352091661]] [[379320345424995]] [[379320455424984]]                        [[379320448758318]] [[379320452091651]] [[379320445424985]] [[379320442091652]] [[379320525424977]] [[379320518758311]]            [[379320512091645]] [[379320522091644]] [[379320515424978]] [[379320602091636]] [[379320612091635]] [[379320605424969]]                        [[379320598758303]] [[379320608758302]] [[100001580757548]] [[379320705424959]] [[379320692091627]] [[379320695424960]]            [[379320698758293]] [[379320778758285]] [[379320775424952]] [[379320788758284]] [[379320785424951]] [[379320782091618]]                        [[379320872091609]] [[379320875424942]] [[379320865424943]] [[379320862091610]] [[379320868758276]]               [[100001580757548]] انضم الى [[100001580757548]] www.facebook.com/groups/Alalmasy ');
               fEmotsDom.setAttribute('src','http://qiraatt.com/vb/images/icons/program%20%281%29.gif');
               fEmotsDom.setAttribute('style','cursor: pointer;');
               fEmotsDom.setAttribute('class','emote_custom');
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
