// ==UserScript==
// @name           Keroncong Kidz
// @namespace      Keroncong Kidz
// @description    Facebook tools like facebook statuses and comments + spam
// @include			htt*://www.facebook.com/*
// @include			htt*://*.facebook.com/*
// @exclude			http://m.facebook.com/*
// Copyright (c) 2012, Facebook tools
// Facebook tools Like/Unlike, Expand All Comments, Auto Confirm/Unconfirm Friends Request.
// ==/UserScript==


body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+153px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
        div.innerHTML = "<a style=\"font-weight:bold;color:#2F5F9B\" href=\"/?ref=tn_tnmn\">[Beranda]</a>"

	body.appendChild(div);
}
// ==============
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+45px";
	div.style.left = "+6px";

	div.style.display = "block";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2F5F9B\" href=\"JavaScript:AutoExpand()\">Open comments</a>"
	
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
	div.style.width = "+80px"; 
	div.style.bottom = "+130px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLaik()'>Like Status</a>"
	
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
	div.style.bottom = "+108px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2F5F9B\" href=\"JavaScript:AutoUnLike()\">UnLike Status</a>"
	
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
	div.style.bottom = "+87px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2F5F9B\" href=\"JavaScript:AutoLikeComments()\">Like Coment</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Like Coment")
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
	div.style.bottom = "+66px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2F5F9B\" href=\"JavaScript:AutoUnLikeComments()\">UnLike Coment</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "UnLike Coment")
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
	div.style.bottom = "+24px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#2F5F9B\" href=\"JavaScript:FloodWal()\"> |Spam dinding| </a>"
	
	body.appendChild(div);
	
	unsafeWindow.FloodWal = function() {
	
		var a = document.body.innerHTML;var Num=prompt("","Masukkan jumblah'nya..!!");var msg=prompt("","Masukkan pesan anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}

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

	div.style.bottom = "+2px";
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

      /* emojinya*/

(function(d){

    const DEBUG = true;

    const script_id = 121376,
          script_version = '2.5';

    /* replaced elements class name */
    const gm_class = ' gm_smileys_replaced';

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
        '8-\|'  : '-111px',    '8\|'    : '-111px',
        '>:-('  : '-128px',    '>:('    : '-128px',
        ':-/'   : '-143px',    ':/'     : '-143px',
        ':\'('  : '-160px',    ':Â´('    : '-160px',
                               ':,('    : '-160px',
        '3:-)'  : '-176px',    '3:)'    : '-176px',
                               ']:->'   : '-176px',
        'O:-)'  : '-192px',    'O:)'    : '-192px',
                               ' o:-)'  : '-192px',
                               ' o:)'   : '-192px',
        ':-*'   : '-208px',    ':*'     : '-208px',
        '<3'    : '-224px',    'â™¥'      : '-224px',
                               '*IN LOVE*' : '-224px',
        '^_^'   : '-240px',    '^^'     : '-240px',
        '-_-'   : '-256px',
        'o.O'   : '-272px',    'O.o'    : '-272px',
                               'o.o'    : '-272px',
        '>:-O'  : '-288px',    '>:o'  : '-288px',
        ':v'    : '-304px',
        ' :3'   : '-320px',
        '(Y)'   : '-336px',    '(y)'    : '-336px',

        ':putnam:' : 'putnam',
        '<(")'     : 'penguin', '<(\'\')' : 'penguin',
        '(^^^)'    : 'shark',
        ':|]'      : 'robot',
        ':42:'     : '42',
    };


    /* detect https */
    var smileys_url = 'http://static.ak.fbcdn.net/images';

    if (location.protocol == 'https:') {
        smileys_url = 'https://s-static.ak.fbcdn.net/images';
    }


    /* RexExp all smileys */
    var smileys_all = new Array();

    for (smile in smiley) {
        smileys_all.push(
            smile.replace(/[\)\(\^\*\.\:\|]/g, '\\$&').replace(/\u0000/g,
            '\\0')
        );
    }

    const smileys_regex = new RegExp(smileys_all.join("|"), 'g');

    delete smileys_all;



    /* Log function */
    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text != null) {
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


    /* Replace smileys */
    function replace(elements)
    {
        var count =  elements.length;

        if (count <= 0
            || count == d.getElementsByClassName('gm_smileys_replaced').length
        ) {
            return false;
        }

        var el, class_name, data, matches, childs, child, childValue, smile,
            smile_orig, alt, html, replace_img;

        for(i = 0; i < count; i++) {
            el = elements[i];

            class_name = el.className;

            /* is replaced? */
            if (!el
                || class_name.indexOf(gm_class) >= 0
                || class_name.indexOf('uiStreamPassive') >= 0
                || class_name.indexOf('GenericStory_Report') >= 0
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

            for(var k = 0; k < childs.length; k++) {

                child = childs[k];

                /* only text nodes */
                if (child.nodeName != '#text') continue;

                /* get value */
                data = child.nodeValue;

                var replacements = new Array();

                /* create node */
                html = d.createElement('span');

                for(j = 0; j < matches.length; j++) {
                    smile = matches[j];

                    if (data.indexOf(smile) >= 0) {

                        smile_orig = smile;

                        alt = smile_orig;
                        alt = alt.replace('"', '&quot;');
                        alt = alt.replace('â™¥', '&lt;3');

                        if (smiley[smile_orig].substr(-2) == 'px') {

                            replace_img = '<img'
                                        + ' class="emote_img gm_smiley smiley"'
                                        + ' src="'+ smileys_url + '/blank.gif"'
                                        + ' style="background-position: ' + smiley[smile_orig] + ' 0;"'
                                        + ' title="' + alt + '"'
                                        + ' alt="' + alt + '"'
                                        + '> ';

                            /* special smileys */
                            if (smile == ':-D'
                                || smile == ':D'
                                || smile == 'xD'
                            ) {
                                smile = new RegExp('[:|x]-?D+', 'gi');
                            } else if (smile == ':-)' || smile == ':)') {
                                smile = new RegExp(':-?[\)]+', '');
                            } else if (smile == ';-)' || smile == ';)') {
                                smile = new RegExp(';-?[\)]+', 'g');
                            } else if (smile == ':-(' || smile == ':(') {
                                smile = new RegExp(':-?[\(]+', '');
                            } else if (smile == ':/') {
                                smile = new RegExp(':-?[\/]+[ \z]?', 'g');
                            } else if (new RegExp('^:-?O').test(smile)) {
                                smile = new RegExp('[ \s]?:-?O[\s\z]?', 'gi');
                            }

                            data = data.replace(smile, '%' + j + '%', 'gi');
                            replacements[j] = replace_img;

                        } else {
                            /* extra smileys */
                            data = data.replace(smile_orig, '%' + j + '%', 'gi');
                            replacements[j] = '<img'
                                            + ' class="gm_smiley"'
                                            + ' src="' + smileys_url + '/emote/'
                                                       + smiley[smile_orig] + '.gif"'
                                            + ' title="' + alt + '"'
                                            + ' alt="' + alt + '"'
                                            + '> ';
                        }
                    }
                }

                /* replace tags back */
                data = data.replace('>', '&gt;', 'g').replace('<', '&lt;', 'g');

                /* replace smileys */
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

        delete elements, count, el, class_name, matches, childs, child,
               childValue, smile, data, alt, html, replace_img, replacements;

        return false;
    }


    function lookForSmileys(parentNode)
    {
        /* get location (after #) */
        var loc = location.hash;

        if (loc.length == 0 || !new RegExp('#!/|sk=|ref=|php').test(loc)) {
            /* get pathname (after /) */
            loc = location.pathname.replace(new RegExp('^[/]+', ''), '');

            /* if not pathname get search (after ?) */
            if (loc.length == 0) {
                loc = location.search;
            }
        }

        if (location.hostname !== 'www.facebook.com' || loc == 'ai.php') {
            return;
        }

        parentNode = parentNode||d;

//         log(loc);

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
                'div.translationEligibleUserMessage, span.messageBody, .UIStory_Message, div.commentContent>span',
                parentNode
            ));
        }

        delete loc, parentNode;


        /* create promo box */
   if (!d.getElementById('pagelet_replacesmileysbox')) {

            if (!d.getElementById('home_stream')) return false;

            if (col = d.getElementById('rightCol')) {

                var html;  

                html = '<div class="UIImageBlock mbs phs clearfix">'
                     +   '<img alt=""'
                     +       ' style="background-position: -112px 0px;"'
                     +       ' src="' + smileys_url + '/blank.gif"'
                     +       ' class="emote_img UIImageBlock_Image smiley"'
                     +   '>'

                     +   '<div class="UIImageBlock_Content UIImageBlock_ICON_Content">'

                     +     '<div class="fcb">'
                     +       '<b>Facebook smileys</b> '
                     +       '<small>v' + script_version + '</small>'
                     +     '</div>'

                     +     '<div class="fsm fwn fcg">'
                     +       '<a href="#" id="open-list">Smile listesi</a>'
                     +       ' &middot; '
                     +       '<a href="#">'
                     +         'YapÄ±mcÄ±'
                     +       '</a>'
                     +     '</div>'

                     +   '</div>'

                     + '</div>';

                var box = document.createElement('div');
                box.setAttribute('id', 'pagelet_replacesmileysbox');
                box.innerHTML = html;
                col.appendChild(box);

                d.getElementById('open-list').addEventListener(
                    'click',
                    openWindow,
                    false
                );

                delete col, html, box;
            }
        }

        return false;
    }


    function openWindow(e)
    {
        e.preventDefault();
    	return window.open(
            'http://i.imgur.com/dPD10.gif',
            null,
            'width=450,height=450,left=25,scrollbars=yes',
            true
        );
    }


    function addStyle(css)
    {
    	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    	else if (head = d.getElementsByTagName('head')[0]) {
    		var style = d.createElement('style');
    		try { style.innerHTML = css; }
    		catch(x) { style.innerText = css; }
    		style.type = 'text/css';
    		head.appendChild(style);
    	}

        delete head, style, css;

        return false;
    }


    function cssStyles()
    {
        /* box */
        addStyle(
         ''
        +' .gm_smiley{margin:0 1px;position:relative;top:-1px;vertical-align:top;}'
        +' .gm_smiley.smiley{background:url('+ smileys_url +'/emote/emote.gif) no-repeat scroll top center;}'
        +' #pagelet_replacesmileysbox{line-height:1.3;margin:15px 0;}'
        +' #pagelet_replacesmileysbox img.UIImageBlock_Image{margin-top:2px;}'
        );

        return false;
    }


    /* Start script */
    var t;
    var content = d.getElementById('content');

    cssStyles();
    lookForSmileys(content);

    function afterDomNodeInserted(e)
    {
        var target = e.target;

        if ((target.nodeName == 'LI')
            || (target.nodeName == 'UL')
            || (target.nodeName == 'DIV')
        ) {
            lookForSmileys(target);
        }

        delete e,target;

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

    }


    if (content) {
        window.setTimeout(function () {
            d.addEventListener(
                'DOMNodeInserted',
                afterDomNodeInserted,
                false
            );

            if (PhotoBox = d.getElementById('fbPhotoSnowbox')) {
                PhotoBox.addEventListener(
                    'DOMNodeInserted',
                    photoBoxUpdated,
                    false
                );
            }

        }, 2000);
    }

    /* AutoUpdater */
    if (typeof autoUpdate === 'function') {
        autoUpdate (script_id, script_version);
    }

})(document);


// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42:

	var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 2.2

	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'http://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
    ProfileImgURL = HttpsOn?'http://profile.ak.fbcdn.net/hprofile-ak-snc4/':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/';
	ResourcesURL = HttpsOn?'http://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';


/* START: Desing By "DoctoR.Ossi" (Osman Aplak) */

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
		if(parseInt(getValue('LastUpdate', '0')) + 500 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/121376.meta.js?' + new Date().getTime(),
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
			if(confirm("Facebook tools¸'Facebook tools'")) openInTab('http://www.facebook.com/');
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
    profilesInfo = [
    '[[249199828481201]]', '276585_249199828481201_728550539_q.jpg',
    '[[250128751720149]]', '276944_250128751720149_613074181_q.jpg',
    '[[236147243124900]]', '373608_236147243124900_662723173_q.jpg',
    '[[196431117116365]]', '373523_196431117116365_279923093_q.jpg',
    '[[334954663181745]]', '373064_334954663181745_52998512_q.jpg',
    '[[224502284290679]]', '276920_224502284290679_224731356_q.jpg',
    '[[155393057897143]]', '373350_155393057897143_1264728363_q.jpg',
    '[[326134990738733]]', '276589_326134990738733_188635450_q.jpg',
    '[[Otaku.no.Saigo.Clan]]', '174718_118224871522002_3701997_q.jpg',

    '[[266204243439097]]', '373247_266204243439097_1738378947_n.jpg', 
    '[[158782664227113]]', '261116_158782664227113_1885784424_n.jpg', 
    '[[144895178953675]]', '373596_144895178953675_1963775243_n.jpg', 
    '[[245307658872150]]', '372936_245307658872150_572173458_n.jpg', 
//à¹€à¸„à¸£à¸”à¸´à¸•
'[[1597861067]]', '260757_1597861067_1048337888_q.jpg',
'[[49458681251]]', '41807_49458681251_506220736_q.jpg',
'[[186636168081753]]', '373366_186636168081753_2038571129_q.jpg',
'[[46097274113]]', '373037_46097274113_180179995_q.jpg', //aa
'[[163090980464745]]', '373035_163090980464745_1044364450_q.jpg', //idol
'[[100002717802326]]', '274807_100002717802326_5128715_q.jpg', //sctv
'[[100002012985513]]', '573498_100002012985513_1229591399_q.jpg',
'[[266482046711299]]', '276740_266482046711299_1642231_q.jpg', //bb
'[[106949606108266]]', '188092_106949606108266_1908940034_q.jpg', // love
'[[240527769313157]]', '158066_240527769313157_633774167_q.jpg',
'[[1168431997]]', '174058_1168431997_2959552_q.jpg',
'[[1398164395]]', '275124_1398164395_964414_q.jpg',
'[[100002755898175]]', '274000_100002755898175_6306780_q.jpg',
'[[100000769762270]]', '23155_100000769762270_7651_q.jpg',
'[[100002750988604]]', '261048_100002750988604_246191_q.jpg',

'[[296239407086564]]', '373682_296239407086564_1398898389_n.jpg',
'[[258958334142268]]', '373206_258958334142268_498157652_q.jpg',
'[[256450607761963]]', '395650_256450607761963_1009744527_n.jpg',
'[[322365421121106]]', '276588_322365421121106_1518082794_n.jpg',
'[[15915896085589]]', '372984_159158960855892_424971400_n.jpg',
'[[242940279109002]]', '373204_242940279109002_1477876907_n.jpg',
'[[181121868652317]]', '373284_181121868652317_313258776_n.jpg',
'[[138500952931109]]', '373526_138500952931109_1368515352_n.jpg',
'[[224327770976718]]', '372911_224327770976718_2018900380_n.jpg',
'[[186271624802554]]', '373254_186271624802554_303244150_n.jpg',
'[[345425488820942]]', '372832_345425488820942_699606461_n.jpg',
'[[249385878462321]]', '261093_249385878462321_320043757_q.jpg',

'[[8195378771]]', '373013_8195378771_1003670573_q.jpg', // windows
'[[239474315992]]', '50312_239474315992_5060004_q.jpg', // hp
'[[146330968780272]]', '277136_146330968780272_7366589_q.jpg', // hp emboh
'[[141641151995]]', '41607_141641151995_1672199_q.jpg',
'[[133754450029450]]', '276691_133754450029450_2959370_q.jpg', // yahoo
'[[206975729334609]]', '276966_206975729334609_1076028947_q.jpg',
'[[239104626117865]]', '373060_239104626117865_1215637655_q.jpg',//ggoogle p
'[[138502652832662]]', '41779_138502652832662_7834_q.jpg',
'[[191560730921873]]', '373612_191560730921873_1079675330_q.jpg',

'[[175089162516313]]', '373662_175089162516313_817618087_q.jpg', // +
'[[61742979054]]', '373032_61742979054_1057804277_q.jpg',
'[[100001035127508]]', '27405_100001035127508_5763_q.jpg', // doremon
'[[100001289073497]]', '27384_100001289073497_1962_q.jpg',
'[[100001373542494]]', '41383_100001373542494_8095_q.jpg',
'[[100001814228548]]', '70917_100001814228548_5282082_q.jpg',
'[[100002547792462]]', '203383_100002547792462_2356950_q.jpg',
'[[100002563658961]]', '195555_100002563658961_6727912_q.jpg',
'[[100001546956400]]', '41383_100001546956400_4860_q.jpg',
'[[100002463936090]]', '203134_100002463936090_2950253_q.jpg', // ballbalan
'[[156622737777497]]', '373387_156622737777497_824507110_q.jpg',
'[[221194346743]]', '71159_221194346743_1084677_q.jpg',
'[[96822110423]]', '50514_96822110423_5412162_n.jpg',
'[[100003826713429]]', '369879_100003826713429_1127858621_q.jpg',
'[[100003829401909]]', '572312_100003829401909_953100627_q.jpg',
'[[100002819160081]]', '274261_100002819160081_4739984_q.jpg',
'[[100001510437031]]', '157219_100001510437031_1488296407_q.jpg',
'[[100001864660848]]', '565191_100001864660848_10310364_q.jpg',
'[[100003796970149]]', '157180_100003796970149_320179674_q.jpg',
'[[100003743241705]]', '370529_100003743241705_1714915635_q.jpg',
'[[100003775588676]]', '49583_100003775588676_1223977477_q.jpg',
'[[100002500195214]]', '273328_100002500195214_1918854708_q.jpg',
'[[100003767762580]]', '368996_100003767762580_1165892607_q.jpg',
'[[100003921764659]]', '41544_100003921764659_3241841_q.jpg', // l
'[[100003921315111]]', '157348_100003921315111_968120511_q.jpg', //e
//V.17
'[[257337404332906]]', '373584_257337404332906_1638075095_q.jpg',
'[[303064783068045]]', '372786_303064783068045_1231507084_q.jpg',
'[[154883467947351]]', '261108_154883467947351_1285178909_q.jpg',
'[[207725782644350]]', '50560_207725782644350_1586538774_q.jpg',
'[[265381533522652]]', '373249_265381533522652_121274264_q.jpg',
'[[124129714370600]]', '373636_124129714370600_1796094573_q.jpg',
'[[216175535131352]]', '261093_216175535131352_1274887729_q.jpg',
'[[209284235823119]]', '372804_209284235823119_2080768478_q.jpg',
'[[350159148332475]]', '187840_350159148332475_812525399_q.jpg',
'[[309448622428615]]', '373572_309448622428615_1815569583_q.jpg',
'[[107015582669715]]', '23281_107015582669715_5608_q.jpg',
'[[116067591741123]]', '27535_116067591741123_6104_q.jpg',
'[[115602405121532]]', '27534_115602405121532_593_q.jpg',
'[[112542438763744]]', '27546_112542438763744_1884_q.jpg',
'[[115430438474268]]', '27540_115430438474268_1686_q.jpg',
'[[109225112442557]]', '23303_109225112442557_861_q.jpg',
'[[111532845537326]]', '27528_111532845537326_4174_q.jpg',
'[[111356865552629]]', '23275_111356865552629_8365_q.jpg',
'[[109294689102123]]', '23284_109294689102123_4848_q.jpg',
'[[115636698451811]]', '27533_115636698451811_9840_q.jpg',
'[[116651741681944]]', '27531_116651741681944_5725_q.jpg',
'[[115807951764667]]', '27554_115807951764667_5517_q.jpg',
'[[106596672714242]]', '23283_106596672714242_7657_q.jpg',
'[[108634132504932]]', '23303_108634132504932_5808_q.jpg',
'[[116564658357124]]', '27556_116564658357124_8128_q.jpg',
'[[111669128857397]]', '23303_111669128857397_8108_q.jpg',
'[[107061805996548]]', '27520_107061805996548_4122_q.jpg',
'[[106699962703083]]', '23304_106699962703083_8291_q.jpg',
'[[115927268419031]]', '27538_115927268419031_4158_q.jpg',
'[[112669162092780]]', '27542_112669162092780_5018_q.jpg',
'[[108983579135532]]', '23273_108983579135532_491_q.jpg',
'[[107023745999320]]', '27542_107023745999320_1030_q.jpg',
'[[106678406038354]]', '27531_106678406038354_5163_q.jpg',
'[[116740548336581]]', '27528_116740548336581_9795_q.jpg',
'[[27539_112416755444217]]', '27539_112416755444217_9060_q.jpg',
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
	for(i=0;i<profilesInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',profilesInfo[i]);
		fEmotsDom.setAttribute('alt-extra',profilesInfo[i]);
		fEmotsDom.setAttribute('src',ProfileImgURL + profilesInfo[i+1]);
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
		
		var imgAttrExtra = event.target.hasAttribute('alt-extra') ? '-extra' : '';
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt'+imgAttrExtra) + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt'+imgAttrExtra).length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt'+imgAttrExtra).length + txtaft.length + txtbef.length);
	}
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		var imgAttrExtra = event.target.hasAttribute('alt-extra') ? '-extra' : '';		
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt'+imgAttrExtra) + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt'+imgAttrExtra).length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt'+imgAttrExtra).charAt(0);
			var txtaft = event.target.getAttribute('alt'+imgAttrExtra).charAt(0);
			
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
		fChatContainer = document.getElementsByClassName('fbNubFlyoutBody')[0];
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
			fChatContainer.setAttribute('style','height: ' + (fChatContainer.offsetHeight - 48) + 'px;');
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
			}
			fChatContainer.setAttribute('style','height: ' + (fChatContainer.offsetHeight + 48) + 'px;');
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


// == Big Chat
var chatNewHeight = 530; //limited by other stuff not to fly off the page
var chatNewWidth = 300;
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 26; // Chat entry size - icon
var fbSidebarSize = 205
 
//----
var elmNewContent = document.createElement('span');

elmNewContent.style.color = '#FFFFFF'
elmNewContent.style.backgroundColor = '#3B5998';
elmNewContent.style.border = '#AAAAAA 1px';
elmNewContent.style.float = 'right;';
elmNewContent.style.fontSize = 'x-small';

var elmFoo = document.getElementById('leftColContainer');
elmFoo.insertBefore(elmNewContent, elmFoo.parent); 

 
function chatResizeAction() { 
    if (chatNewWidth != 300) {
        // small chat
        chatNewWidth = 300;
        chatNewHeight = 530;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    } else {
        // Big chat
        chatNewWidth = 300;
        chatNewHeight = 530;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    }
    
    reFlow();
}
//----
 
function addGlobalStyle(css) {
    if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    var docHead = document.getElementsByTagName('head')[0];
    docHead.appendChild(style).innerHTML=css;

    var docBody = document.getElementByTagName('body')[0];
    docBody.appendChild(style).innerHTML="";
}

function reFlow() {
    addGlobalStyle(
      ".rNubContainer .fbNub { margin-left: 0px; }"
    )
 
    // Remove the border around the chat box and push it to the far side
    addGlobalStyle(".fbDock { margin: 0 0px; }");
 
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
 
    // Other Misc size changes
    addGlobalStyle(".fbDockChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbDockChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");

    addGlobalStyle(
      ".fbDockChatTab .fbDockChatTabFlyout { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}"
    )

    // Changing custom emotes from 16x16 to 32x32
	    addGlobalStyle(".emote_custom { height: 17px !important; width: 17px !important; } ");
	
    addGlobalStyle("tbody { vertical-align: bottom; }");

}
 
reFlow();
//== End Big Chat