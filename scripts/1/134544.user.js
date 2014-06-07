// ==UserScript==
// @name           Facebook (like-unlike_Status, like-unlike_Komentar, DownloadAlbum, RefreshPage, ChatEmoticon, FriendsChecker) by USULUDDIN IS35
// @namespace      AutoLike
// @version        3.2.3
// @author         usuluddin@programmer.net
// @description    like-unlike_Status, like-unlike_Komentar, DownloadAlbum, RefreshPage, ChatEmoticon, FriendsChecker
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude	   http://*.channel.facebook.com/*
// @exclude	   https://*.channel.facebook.com/*
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
// @require        http://buzzy.hostoi.com/AutoUpdater.js
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.display = "block";
        div.style.opacity= 0.90;
	div.style.bottom = "+222px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-snc7/s720x720/395968_356594411021092_100000116091097_1705161_736356199_n.jpg' width='16' height='19' align='absmiddle' /><a style=\"font-weight:bold;color:#333333\" href=\"/usuluddin25\" title='by Usuluddin'>USULUDDIN IS35 !</a>"
    
	body.appendChild(div);
}
// ==============

// ==Home==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.display = "block";
        div.style.opacity= 0.90;
	div.style.bottom = "+197px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://www.sggs.ac.in/finalimages/home_icon.png' width='16' height='16' align='absmiddle' /><a style=\"font-weight:bold;color:#333333\" href=\"/?ref=logo\" title='by Usuluddin'>HOME</a>"
    
	body.appendChild(div);
}
// ==============

// ==Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.display = "block";
        div.style.opacity= 0.90;
	div.style.bottom = "+149px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='16' align='absmiddle' /><a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\" title='by Usuluddin'>LIKE STATUS</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
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
// ==Unlike Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
        div.style.display = "block";
        div.style.opacity= 0.90;
	div.style.bottom = "+125px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://kazuma.mywapblog.com/files/unlike.png' width='16' height='16' align='absmiddle' /><a style=\"font-weight:bold;color:#333333\" title='by Usuluddin' href=\"JavaScript:AutoUnLike()\">UNLIKE STATUS</a>"
	
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
        div.style.display = "block";
        div.style.opacity= 0.90;
        div.style.bottom = "+90px";
        div.style.left = "+6px";
        div.style.backgroundColor = "#eceff5";
        div.style.border = "1px dashed #94a3c4";
        div.style.padding = "2px";
        div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='16' align='absmiddle' /><a style=\"font-weight:bold;color:#333333\" title='by Usuluddin' href=\"JavaScript:AutoLikeComments()\">LIKE KOMENTAR</a>"

    body.appendChild(div);

    unsafeWindow.AutoLikeComments = function() {

        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("cmnt_like_link") >= 0)
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
        div.style.display = "block";
        div.style.opacity= 0.90;
        div.style.bottom = "+66px";
        div.style.left = "+6px";
        div.style.backgroundColor = "#eceff5";
        div.style.border = "1px dashed #94a3c4";
        div.style.padding = "2px";
        div.innerHTML = "<img src='http://kazuma.mywapblog.com/files/unlike.png' width='16' height='16' align='absmiddle' /><a style=\"font-weight:bold;color:#333333\" title='by Usuluddin' href=\"JavaScript:AutoUnLikeComments()\">UNLIKE KOMENTAR</a>"

    body.appendChild(div);

    unsafeWindow.AutoUnLikeComments = function() {

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


// ==Expand==
body = document.body;
if(body != null) {
        div = document.createElement("div");
        div.style.position = "fixed";
        div.style.display = "block";
        div.style.opacity= 0.90;
        div.style.bottom = "+40px";
        div.style.left = "+6px";
        div.style.backgroundColor = "#eceff5";
        div.style.border = "1px dashed #94a3c4";
        div.style.padding = "2px";
        div.innerHTML = "<img src='https://contactus.samsung.com/customer/contactus/formmail/images/common/btn_expand.gif' width='16' height='16' align='absmiddle' /><a style=\"font-weight:bold;color:#333333\" title='by Usuluddin' href=\"JavaScript:AutoExpand()\">BUKA KOMENTAR</a>"

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


//==Download Album==
(function(){
if(document.querySelector('#dFA')||location.href.indexOf('//www.facebook.com')<0||location.href.indexOf('php')>-1){return;}
var k=document.createElement('li');k.innerHTML='<a id="dFA" class="navSubmenu" onClick="dFAcore();">DownFbAlbum</a>';
document.querySelectorAll('#userNavigation')[0].appendChild(k);

var head = document.getElementsByTagName("head")[0];var script = document.createElement("script");script.src = "https://dl.dropbox.com/u/4013937/downFbAlbum.js";head.appendChild(script);
}
)()

//==refresh page==
var bllink=location.href;
var blhost=location.host;

var blscript=document.querySelector('script');
if (blscript){
	var blcontent=blscript.innerHTML;
	if (blcontent.indexOf(";document.write(i(d,c));")>=0 && blcontent.indexOf('var d="=iunm?=ifbe')>=0 && blcontent.indexOf(";for(var u=0;u<_.length;u++){var r=")>=0){
		window.location.reload();
		return;
	}
}

var blelement=document.querySelector('iframe#fulliframe');
if (blelement){
	window.location.reload();
	return;
}


//==Chat==
// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 (Y) :putnam: 8| ^_^ (^^^) O:) <(") :42: 

	var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 0.19;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';


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
		if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > version) {
			if(confirm(	"There's an update available for 'Facebook Chat Emoticons Bar'.\n" +
						"Your version: " + version + "\n" +
						"New version: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"Do you wish to install it?")
			   ) openInTab('http://userscripts.org/scripts/source/50826.user.js');
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

    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
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
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
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


// ========================
(function(d){

    var DEBUG = false;

    var script_id = 49338,
        script_version = '2.3.1';



    /* replaced elements class name */
    var gm_class = ' gm_smileys_replaced';



    /* smileys */
    var smiley = {
        ':-)'   : '1px',       ':)'     : '1px',
        ':-('   : '-16px',     ':('     : '-16px',
        ':-P'   : '-31px',     ':P'     : '-31px',
                               ':-p'    : '-31px',
                               ':p '    : '-31px',
        ':-D'   : '-47px',     ':D'     : '-47px',
        ':-O'   : '-64px',     ':O '    : '-64px',
                               ':-o'    : '-64px',
                               ':o '    : '-64px',
        ';-)'   : '-79px',     ';)'     : '-79px',
        '8-)'   : '-96px',     ' 8)'    : '-96px',
        '8-|'   : '-111px',    '8|'     : '-111px',
        '>:-('  : '-128px',    '>:('    : '-128px',
        ':-/'   : '-143px',    ':/'     : '-143px',
        ':\'('  : '-160px',    ':´('    : '-160px',
                               ':,('    : '-160px',
        '3:-)'  : '-176px',    '3:)'    : '-176px',
                               ']:->'   : '-176px',
        'O:-)'  : '-192px',    'O:)'    : '-192px',
                               ' o:-)'  : '-192px',
                               ' o:)'   : '-192px',
        ':-*'   : '-208px',    ':*'     : '-208px',
        '<3'    : '-224px',    '♥'      : '-224px',
                               '*IN LOVE*' : '-224px',
        '^_^'   : '-240px',    '^^'     : '-240px',
        '-_-'   : '-256px',
        'o.O'   : '-272px',    'O.o'    : '-272px',
                               'o.o'    : '-272px',
        '>:-O'  : '-288px',    '>:o'    : '-288px',
                               '>.<'    : '-288px',
        ':v'    : '-304px',
        ' :3'   : '-320px',
        '(Y)'   : '-336px',    '(y)'    : '-336px',

        ':putnam:' : 'putnam',
        '<(")'     : 'penguin', '<(\'\')' : 'penguin',
        '(^^^)'    : 'shark',
        ':|]'      : 'robot',
        ':42:'     : '42'
    };



    /* detect https */
    var smileys_url = 'http://static.ak.fbcdn.net/images';

    if (location.protocol == 'https:') {
        smileys_url = 'https://s-static.ak.fbcdn.net/images';
    }



    /* RexExp all smileys */
    smileys_all = [];

    var smile;
    for (smile in smiley) {
        smileys_all.push(
            smile.replace(/[)(\^\*\.\|]/g, '\\$&').replace(/\u0000/g, '\\0')
        );
    }

    var smileys_regex = new RegExp(smileys_all.join("|"), 'gm');



    /* Log function */
    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== null) {
            GM_log(text);
        }
        return false;
    }



    /* Find elements */
    function g(id, parent)
    {
        if(id && typeof id === 'string') {
            var p = parent||d;
            id = p.querySelectorAll(id);
        }
        return id||null;
    }



    /* Location */
    var loc;

    function getLocation()
    {
        /* get location (after #) */
        loc = location.hash;

        if (loc.length === 0 || !new RegExp('#!/|sk=|ref=|php').test(loc)) {
            /* get pathname (after /) */
            loc = location.pathname.replace(/^[\/]+/, '');

            /* if not pathname get search (after ?) */
            if (loc.length === 0) {
                loc = location.search;
            }
        }

        return loc;
    }



    /* Replace smileys */
    function replace(elements)
    {
        var count =  elements.length;

        if (count <= 0 ||
            count == d.getElementsByClassName('gm_smileys_replaced').length
        ) {
            return false;
        }


        var el, class_name, data, matches, childs, child, childValue, smile,
            smile_orig, alt, html, replace_img;

        for(i = 0; i < count; i++) {
            el = elements[i];

            class_name = el.className;

            /* is replaced? */
            if (!el ||
                class_name.indexOf(gm_class) >= 0 ||
                class_name.indexOf('uiStreamPassive') >= 0 ||
                class_name.indexOf('GenericStory_Report') >= 0
            ) {
                continue;
            }

            /* add class */
            el.className += gm_class;

            data = el.innerHTML;
            /* replace tags */
            data = data.replace('&gt;', '>', 'g').replace('&lt;', '<', 'g');

            /* check smileys */
            matches = data.match(smileys_regex);

            data = null;

            if (!matches) continue;

            childs = el.childNodes;
            childs_length = childs.length;

            for(var k = 0; k < childs_length; k++) {

                child = childs[k];

                /* only text nodes */
                if (child.nodeName != '#text') continue;

                /* get value */
                data = child.nodeValue;

                var replacements = [];

                /* create node */
                html = d.createElement('span');

                matches_length = matches.length;
                for(j = 0; j < matches_length; j++) {
                    smile = matches[j];

                    if (data.indexOf(smile) >= 0) {

                        smile_orig = smile;

                        alt = smile_orig;
                        alt = alt.replace('"', '&quot;');
                        alt = alt.replace('♥', '&lt;3');

                        if (smiley[smile_orig].substr(-2) == 'px') {

                            replace_img = '<img' +
                                          ' class="emote_img gm_smiley smiley"' +
                                          ' src="'+ smileys_url + '/blank.gif"' +
                                          ' style="background-position: ' + smiley[smile_orig] + ' 0;"' +
                                          ' title="' + alt + '"' +
                                          ' alt="' + alt + '"' +
                                          '> ';

                            /* special smileys */
                            if (smile == ':-D' || smile == ':D' || smile == 'xD') {
                                smile = new RegExp(':-?D+', 'gi');

                            } else if (smile == ':-)' || smile == ':)') {
                                smile = new RegExp(':-?\\)+');

                            } else if (smile == ';-)' || smile == ';)') {
                                smile = new RegExp(';-?\\)+', 'g');

                            } else if (smile == ':-(' || smile == ':(') {
                                smile = new RegExp(':-?\\(+');

                            } else if (smile == ':/') {
                                smile = new RegExp(':-?[\\/]+[ \\s]?', 'g');

                            } else if (new RegExp('^:-?O').test(smile)) {
                                smile = new RegExp('[ \\s]?:-?O[\\s\\z]?', 'gi');

                            }

                            data = data.replace(smile, '%' + j + '%', 'gi');
                            replacements[j] = replace_img;

                        } else {
                            /* extra smileys */
                            data = data.replace(smile_orig, '%' + j + '%', 'gi');
                            replacements[j] = '<img' +
                                              ' class="gm_smiley"' +
                                              ' src="' + smileys_url + '/emote/' + smiley[smile_orig] + '.gif"' +
                                              ' title="' + alt + '"' +
                                              ' alt="' + alt + '"' +
                                              '> ';
                        }
                    }
                }

                /* replace tags back */
                data = data.replace('>', '&gt;', 'g').replace('<', '&lt;', 'g');

                /* replace smileys */
                replacements_length = replacements.length;
                for(r = 0; r < replacements.length; r++) {
                    data = data.replace(
                        new RegExp('%' + r + '%', 'g'),
                        replacements[r]
                    );
                }
                replacements = null;

                html.innerHTML = data;
                el.replaceChild(html, child);

                /* Data reset */
                data = null;
            }

        }


        return false;
    }



    function lookForSmileys(parentNode)
    {
        loc = getLocation();

        if (location.hostname !== 'www.facebook.com' || loc == 'ai.php') {
            return;
        }

        parentNode = parentNode||d;


        /* photo */
        if (new RegExp('photo.php').test(loc)) {
            replace(g(
                '#photocaption, div.commentContent>span',
                parentNode
            ));
        } else
        /* notes */
        if (new RegExp('note.php').test(loc)) {
            replace(g(
                'div.notesBlogText p, div.commentContent>span',
                d.getElementById('contentCol')
            ));
        } else {
            /* statuses */
            replace(g(
                'span.messageBody, .UIStory_Message, div.tlTxFe, div.commentContent>span',
                parentNode
            ));
        }


        createPromoBox();

        return false;
    }



    /* create promo box */
    function createPromoBox()
    {
        if (!d.getElementById('pagelet_replacesmileysbox')) {

            if (!d.getElementById('home_stream')) return false;

            if (!!(col = d.getElementById('rightCol'))) {

                html = '<div class="UIImageBlock mbs phs clearfix">' +
                         '<img alt=""' +
                             ' style="background-position: -112px 0;"' +
                             ' src="' + smileys_url + '/blank.gif"' +
                             ' class="emote_img UIImageBlock_Image smiley"' +
                         '>' +

                         '<div class="UIImageBlock_Content UIImageBlock_ICON_Content">' +

                           '<div class="fcb">' +
                             '<b>Replace smileys</b> ' +
                             '<small>v' + script_version + '</small>' +
                           '</div>' +

                           '<div class="fsm fwn fcg">' +
                             '<a href="#" id="open-list">List of smileys</a>' +
                             ' &middot; ' +
                             '<a href="/pages/Replace-smileys-userscript/155692691129314">' +
                               'Become a Fan' +
                             '</a>' +
                           '</div>' +

                         '</div>' +

                       '</div>';

                box = document.createElement('div');
                box.setAttribute('id', 'pagelet_replacesmileysbox');
                box.innerHTML = html;
                col.appendChild(box);

                d.getElementById('open-list').addEventListener(
                    'click',
                    openWindow,
                    false
                );
            }
        }

        return false;
    }



    function openWindow(e)
    {
        e.preventDefault();

        window.open (
            'http://userscripts.kub4jz.cz/smileys/',
            null,
            'width=450,height=450,left=25,scrollbars=yes',
            true
        );

        return false;
    }



    function addStyle(css)
    {
        if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }

        else if (!!(head = d.getElementsByTagName('head')[0])) {
            style = d.createElement('style');
            try { style.innerHTML = css; }
            catch(x) { style.innerText = css; }
            style.type = 'text/css';
            head.appendChild(style);
        }

        return false;
    }



    function cssStyles()
    {
        /* box */
        addStyle(
         '' +
         ' .gm_smiley{margin:0 1px;position:relative;top:-1px;vertical-align:top;}' +
         ' .gm_smiley.smiley{background:url('+ smileys_url +'/emote/emote.gif) no-repeat scroll top center;}' +
         ' #pagelet_replacesmileysbox{line-height:1.3;margin:15px 0;}' +
         ' #pagelet_replacesmileysbox img.UIImageBlock_Image{margin-top:2px;}'
        );

        return false;
    }



    /* Start script */
    var content = d.getElementById('content');

    cssStyles();
    lookForSmileys(content);



    function afterDomNodeInserted(e)
    {
        target = e.target;

        if ((target.nodeName == 'LI') ||
            (target.nodeName == 'DIV') ||
            (target.nodeName == 'UL')
        ) {
            lookForSmileys(target);
        }

        return false;
    }



    function photoBoxUpdated(e)
    {
        target = e.relatedNode;

        if (target.id == 'fbPhotoSnowboxFeedback') {
            replace(g(
                '#fbPhotoSnowboxCaption, span.commentBody',
                d.getElementById('fbPhotoSnowbox')
            ));
        }

        return false;
    }


    window.setTimeout(function () {
        d.addEventListener(
            'DOMNodeInserted',
            afterDomNodeInserted,
            false
        );

        if (!!(PhotoBox = d.getElementById('fbPhotoSnowbox'))) {
            PhotoBox.addEventListener(
                'DOMNodeInserted',
                photoBoxUpdated,
                false
            );
        }

    }, 2000);


    /* AutoUpdater */
    if (typeof autoUpdate === 'function') {
        autoUpdate (script_id, script_version);
    }

})(document);



// ========================

// ==FriendsChecker==

var facebookID;

window.setTimeout(
  function() {
    informOld();
    doCheck();
  }, 5000)

function informOld() {
  if(unsafeWindow.Env) {
    facebookID = unsafeWindow.Env.user;
    exFriends = eval(GM_getValue(facebookID + " ex friends", "({})"));
    for (i in exFriends)
      inform(exFriends[i]);
  }
}

function doCheck() {
  if (unsafeWindow.Env) {
    var oldSavedFriends = eval(GM_getValue(facebookID + " friends","[]"));
    var newSavedFriends = ({});

    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + facebookID + "&token=1-1&filter[0]=user&options[0]=friends_only&time=" + Math.floor((new Date()).getTime() / 1000),
      onload: function(result) {
        friends = eval('(' + result.responseText.substring(9) + ')').payload.entries;

        for (i = friends.length - 1; i >= 0; i--) {
          if (friends[i].type == "user") {
            newSavedFriends[friends[i].uid] = friends[i];
          }
        }
        
        if (friends.length > 0) {
          for (i in oldSavedFriends) {
            if (!newSavedFriends[i]) {
              exFriends[i] = oldSavedFriends[i];
              inform(oldSavedFriends[i]);
            }
          }
          
          GM_setValue(facebookID + " friends", uneval(newSavedFriends));
          GM_setValue(facebookID + " ex friends", uneval(exFriends));
          GM_setValue("last checked", new Date().toGMTString());
        }
      }
    });
  }
}

function inform(friend){
  if (document.getElementById("globalContainer")) {
    if (!document.getElementById("facebookFriendsChecker"))
      addFriendsCheckerStuff()
    personRemoved = document.createElement("div");
    personRemoved.setAttribute("class", "person");
    personRemoved.innerHTML = "<div class=\"image\"><span><img class=\"photo\" alt=\""+friend.t+"\" src=\""+friend.it+"\"/></span></div>"+
                              "<div class=\"info\"><dl class=\"clearfix\"><dt>Name:</dt><dd class=\"result_name fn\"><span class=\"url fn\">"+friend.t+"</span></dd>"+
                                                                         "<dt>Actions:</dt><dd class=\"fn\"><span class=\"url fn\"><a href=\"http://www.facebook.com/profile.php?id="+(friend.i?friend.i:friend.uid)+"\">View Profile</a></span></dd>"+
                                                                         "<dt>Status:</dt><dd class=\"fn\"><span class=\"url fn\">"+(friend.pnd==1?"Unable to check when friend requests are denied.":"No longer in your friends.")+"</span></dd></dl></div>"
    document.getElementById("removedFriends").appendChild(personRemoved);
  }
}

function addFriendsCheckerStuff() {
  if (foo = document.getElementById("globalContainer")) {
    ffc = document.createElement("div");
    ffc.id = "facebookFriendsChecker";
    GM_addStyle("#facebookFriendsChecker {"+
                "  top: 0px;"+
                "  z-index: 1337;"+
                "  padding-top: 0px;"+
                "  width: 980px;"+
                "  margin: auto;"+
                "  position: relative;"+
                "  display: block;"+
                "  height: auto;"+
                "  background-color: #3B5998;"+
                "  border-bottom: 1px solid #D8DFEA;"+
                "}"+
                ""+
                "#facebookFriendsChecker h2, #facebookFriendsChecker h3 {"+
                "  color: white;"+
                "  display: block;"+
                "  font-weight: bold;"+
                "  padding:7px 7px 7px 8px;"+
                "}"+
                ""+
                "#facebookFriendsChecker h2 {"+
                "  font-size: 16px;"+
                "}"+
                ""+
                "#facebookFriendsChecker h3 {"+
                "  font-size: 14px;"+
                "}"+
                ""+
                "#Explanation a {"+
                "  color: white;"+
                "}"+
                ""+
                "#facebookFriendsChecker .person {"+
                "  background: white none;"+
                "  border: 1px solid #CCCCCC;"+
                "  margin: 5px;"+
                "  padding: 9px 9px 0 9px;"+
                "  width: 400px;"+
                "}"+
                ""+
                ".info dt {"+
                "  color:gray;"+
                "  float:left;"+
                "  padding:0;"+
                "  width:75px;"+
                "}"+
                "#facebookFriendsChecker img {"+
                "  display: block;"+
                "  float: left;"+
                "  height: 50px;"+
                "  padding:0 9px 0 0;"+
                "}"+
                "#facebookFriendsChecker #Explanation {"+
                "  top: 20px;"+
                "  right: 0px;"+
                "  position: absolute;"+
                "  width: 510px;"+
                "}"+
                "#facebookFriendsChecker button {"+
                "  cursor: pointer;"+
                "  margin: 5px;"+
                "}")
    ffc.innerHTML = "<h2>Facebook Friends Checker greasemonkey script.</h2>"+
                    "<div id=\"RemovedFriends\">"+
                    "  <h3>The following people are no longer friends with you;</h3>"+
                    "  <div id=\"removedFriends\"></div>"+
                    "  <button id=\"button\">Click to hide this</button>"+
                    "</div>"+
                    "<div id=\"Explanation\">"+
                    "  <p>A person might be showing here for a number of reasons;</p>"+
                    "  <ul>"+
                    "    <li>They may have removed you as a friend</li>"+
                    "    <li>You may have removed them as a friend</li>"+
                    "    <li>They may have deactivated their Facebook account</li>"+
                    "    <li>They may have blocked you completely.</li>"+
                    "  </ul>"+
                    "</div>";
    foo.insertBefore(ffc, foo.firstChild);

    document.getElementById("button").addEventListener(
      'click',
      function() {
        document.getElementById("facebookFriendsChecker").style.display = "none";
        GM_setValue(facebookID + " ex friends", "({})")
        resizeBlueBar();
      },
      false);
      
    ffc.addEventListener(
      'DOMNodeInserted',
      resizeBlueBar,
      false);
  }
}

function resizeBlueBar() {
  if (document.getElementById("facebookFriendsChecker").style.display != "none")
    document.getElementById("blueBar").style.height = (42 + parseInt(document.defaultView.getComputedStyle(document.getElementById("facebookFriendsChecker"), null).getPropertyValue("height"))) + "px";
  else
    document.getElementById("blueBar").style.height = "41px";
}