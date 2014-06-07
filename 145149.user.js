    // ==UserScript==
    // @name                        Facebook Animated Chat Pictures - Sidebar by Lanjelin
    // @description                 Facebook Animated Chat Pictures - Sidebar by Lanjelin
    // @include                     http://facebook.com/*
    // @include                     http://*.facebook.com/*
    // @include                     https://facebook.com/*
    // @include                     https://*.facebook.com/*
    // @exclude                     http://*.channel.facebook.com/*
    // @exclude                     https://*.channel.facebook.com/*
    // @author                      Lanjelin
    // @version                     1
    // @versionnumber               1
	// @grant						GM_getValue
	// @grant						GM_setValue	
    // ==/UserScript==
    //
	var version, storage, ani_info, header_tag, style_tag, fp_pointer_up, fp_pointer_down, fb_bar, fb_list, fb_pointer;
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
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
           
	ani_info = ['Ugh', 'http://turbolego.com/ugh.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010370392038',
				'Gangnam', 'http://turbolego.com/gangnam.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010830332038',
				'0_o','http://turbolego.com/O_o.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010966517038',
				'durr','http://turbolego.com/durrr.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010975102038',
				'yes','http://turbolego.com/yes.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010976602038',
				'um...no','http://turbolego.com/um___no.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010978712038',
				'no','http://turbolego.com/no.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010980037038',
				'taco','http://turbolego.com/taco.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151010981317038',
				'Star Wars - A New Hope','http://expdvl.com/files/web/fbimg/starwars1.gif',
				'/ajax/sharer/?s=4&appid=2347471856&p[]=603152037&p[]=10151011043452038'
				];
	header_tag = document.getElementsByTagName('head')[0];
	if (header_tag) {
		style_tag = document.createElement('style');
		style_tag.type = 'text/css';
		style_tag.innerHTML =
			'.char_ani_bar {padding-top:2px;padding-bottom:6px;line-height:16px;padding-left:2px;background:#EEEEEE none repeat scroll 0 0;border-style:solid;border-width:0px 0px 0px 0px;border-color:#C9D0DA;position:static; }'+
			'.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}' +
			'.chat_pointer { background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }' + 
			'.ani_img{height:25px;vertical-align:top;width:25px;padding-right:2px;padding-top:2px;}' +
			'.ani_list{border:none !important;}';
		header_tag.appendChild(style_tag);
	}
	fp_pointer_up = 'margin-top:-7px;cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	fp_pointer_down = 'cursor: pointer; position: absolute; right: 2px;'
	fb_bar = document.createElement('div');
	fb_bar.setAttribute('class','char_ani_bar');
	fb_list = document.createElement('div');
	fb_list.setAttribute('name','ani_list');
	fb_bar.appendChild(fb_list);
	for(i=0;i<ani_info.length;i+=3) {
		var fb_links = document.createElement('a');
			fb_links.setAttribute('href',ani_info[i+2]);
			fb_links.setAttribute('rel','dialog');
			fb_links.setAttribute('alt',ani_info[i]);
		fb_list.appendChild(fb_links);
		var fb_img = document.createElement('img');
			fb_img.setAttribute('alt',ani_info[i]);
			fb_img.setAttribute('title',ani_info[i]);
			fb_img.setAttribute('src','' + ani_info[i+1]);
			fb_img.setAttribute('style','cursor: pointer;');
			fb_img.setAttribute('class','ani_img');
		fb_links.appendChild(fb_img);
	}
	fb_pointer = document.createElement('i');
		fb_pointer.setAttribute('alt','');
		fb_pointer.setAttribute('class','img chat_pointer');
		fb_pointer.setAttribute('style',fp_pointer_up);
	fb_bar.appendChild(fb_pointer);
	var setting_visible = getValue('visible',true);
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);
	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbSidebarGripper')[0]);
		fInsertEmotBar(event.target);
	}
	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbSidebarGripper')[0];
		fNewEmotBar = fb_bar.cloneNode(true);
		setVisibility(fNewEmotBar);
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
		document.getElementsByClassName('char_ani_bar')[0].setAttribute('style','height: 57px;');
		document.getElementsByClassName('fbSidebarGripper')[0].childNodes[0].setAttribute('style','display: none !important;');
	}
	function fHideShowEmotBar(event){
		fb_char_bar = document.getElementsByName('ani_list');
		if(fb_char_bar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fb_char_bar.length;i++) {
				fb_char_bar[i].setAttribute('style','display: block;');
				fb_char_bar[i].parentNode.childNodes[1].setAttribute('style',fp_pointer_up);
				document.getElementsByClassName('char_ani_bar')[0].setAttribute('style','height: 57px;');
				document.getElementsByClassName('fbChatSidebarBody')[0].style.height = (Number(document.getElementsByClassName('fbChatSidebarBody')[0].style.height.replace('px','')) - 53 ) + 'px';
			}
		} else {
			for(i=0;i<fb_char_bar.length;i++) {
				fb_char_bar[i].setAttribute('style','display: none;');
				fb_char_bar[i].parentNode.childNodes[1].setAttribute('style',fp_pointer_down);
				document.getElementsByClassName('char_ani_bar')[0].setAttribute('style','height: 4px;');
				document.getElementsByClassName('fbChatSidebarBody')[0].style.height = (Number(document.getElementsByClassName('fbChatSidebarBody')[0].style.height.replace('px','')) + 53 ) + 'px';
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: float;');
			DOM.childNodes[1].setAttribute('style',fp_pointer_up);
		} else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',fp_pointer_down);
		}
	}