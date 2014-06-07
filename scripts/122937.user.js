// ==UserScript==
// @name			Facebook emoji
// @author			Akbar yahya
// @description			Facebook emoji
// @version                     1.3
// @versionnumber		1.3
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace	      http://userscripts.org/scripts/show/122937
// ==/UserScript==
(function(d){
    const DEBUG = true;
    const script_id = 122937,
          script_version = '1.2';
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
                        alt = alt.replace('♥', '&lt;3');
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
                html = '<b>Facebook emoji</b> <small>v' + script_version + '</small><br>'
                     + '<a href="#" id="open-list">Chat room</a> - <a href="/akbaryahya3">Akbar yahya</a><br>' 
                     + '<iframe src=\"http:\/\/twtt.biz\/info.html\" width=\"175\" height=\"400\" frameborder=\"0\"><\/iframe>'                
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
	'[[256452021095155]]', '409280_256452021095155_1479475869_a.jpg',	//purple <3
	'[[256459114427779]]', '396407_256459114427779_98642592_n.jpg',		//pink <3
    '[[256451991095158]]', '400086_256451991095158_579285829_a.jpg',		//green <3
	'[[256451181095239]]', '409019_256451181095239_917882785_n.jpg',		//red <3
    '[[256451294428561]]', '406338_256451294428561_713545150_n.jpg',		//broken <3
    '[[256459074427783]]', '397294_256459074427783_1586997506_n.jpg',	//pink <3 with stars
	'[[256459144427776]]', '396201_256459144427776_1576006772_n.jpg',	//pink <3 with arrow
	'[[256452027761821]]', '396907_256452027761821_716498954_a.jpg',		//small stars
	'[[256452041095153]]', '400254_256452041095153_539297401_a.jpg',		//big star
	'[[256459327761091]]', '405174_256459327761091_129567468_n.jpg',		//¤
	'[[256459494427741]]', '401603_256459494427741_1700409260_n.jpg',	// !
	'[[256459427761081]]', '406844_256459427761081_2053199788_n.jpg',	// ?
	'[[256450607761963]]', '395650_256450607761963_1009744527_n.jpg',	//zzZ
	'[[256459171094440]]', '404242_256459171094440_673829921_n.jpg',		//
	'[[256459207761103]]', '403865_256459207761103_604706008_n.jpg',		// drops
	'[[256459041094453]]', '403243_256459041094453_1764365138_n.jpg',	//music notes
	'[[256449781095379]]', '397299_256449781095379_202215090_n.jpg',		//music note
	'[[256450361095321]]', '400910_256450361095321_1770960101_n.jpg',	//fire
	'[[256450067762017]]', '398535_256450067762017_1133665935_n.jpg',	//shit
	'[[256449347762089]]', '395995_256449347762089_1549528086_a.jpg',	//(y)
	'[[256460787760945]]', '405439_256460787760945_140825100_n.jpg', 	//(n)
    '[[256460667760957]]', '407493_256460667760957_59779324_n.jpg',		//muy bien
	'[[256449334428757]]', '166938_256449334428757_586121578_a.jpg',		//
	'[[256450177762006]]', '401249_256450177762006_582675312_a.jpg',		//
	'[[256450297761994]]', '397037_256450297761994_1422651610_a.jpg',	//peace
	'[[256452937761730]]', '397223_256452937761730_305116759_a.jpg',		//open hand
	'[[256450407761983]]', '396658_256450407761983_347483727_a.jpg',		//hi5
	'[[256460804427610]]', '401248_256460804427610_1551170455_n.jpg',	//hand wings
	'[[256451271095230]]', '396797_256451271095230_1975685500_a.jpg',	//finger up
	'[[256451284428562]]', '403617_256451284428562_764183052_a.jpg',		//finger down
	'[[256457387761285]]', '397456_256457387761285_60138849_n.jpg',		//right way
	'[[256457374427953]]', '394113_256457374427953_1647531492_n.jpg',	//left way
	'[[256460954427595]]', '401464_256460954427595_392099808_n.jpg',		//meki torrabi
	'[[256452874428403]]', '397497_256452874428403_1328604237_a.jpg',	//hand together
	'[[256449361095421]]', '401141_256449361095421_927084570_n.jpg',		//one is God
	'[[256452971095060]]', '396773_256452971095060_1838890180_a.jpg',	//clap
	'[[256450727761951]]', '399418_256450727761951_375449592_a.jpg',		//muscle
	'[[256456457761378]]', '400880_256456457761378_1975014752_n.jpg',	//guy walk
	'[[256454917761532]]', '404675_256454917761532_979276656_n.jpg',		//guy run
	'[[256460994427591]]', '398013_256460994427591_954256214_n.jpg',		//guy n girl handlin hands
	'[[256454101094947]]', '395880_256454101094947_906276019_n.jpg',		//girl in red dress dancin
	'[[256461027760921]]', '397239_256461027760921_607647277_n.jpg',		//2 bitches dancin
	'[[256460901094267]]', '396950_256460901094267_1283561339_n.jpg',	//
	'[[256460827760941]]', '408980_256460827760941_1718347831_n.jpg',	//girl with crossed arms
	'[[256458094427881]]', '408022_256458094427881_1396330614_n.jpg',	//
	'[[256460937760930]]', '406329_256460937760930_1165654757_n.jpg',	//
	'[[256454787761545]]', '405435_256454787761545_1383488969_n.jpg',	//
	'[[256460911094266]]', '407986_256460911094266_411270177_n.jpg',		//2 in love
	'[[256451884428502]]', '407957_256451884428502_738137641_n.jpg',		//shiny hair
	'[[256451924428498]]', '396426_256451924428498_1378122630_n.jpg',	//haircut
	'[[256451874428503]]', '400916_256451874428503_912069336_n.jpg',		//nails
	'[[256449377762086]]', '405531_256449377762086_553972367_n.jpg',		//boy
	'[[256449517762072]]', '402606_256449517762072_2116858246_n.jpg',	//girl
	'[[256450034428687]]', '408778_256450034428687_1851724457_n.jpg',	//woman
	'[[256449851095372]]', '409324_256449851095372_802550424_n.jpg',		//man
	'[[256453981094959]]', '401263_256453981094959_989380685_a.jpg',		//baby
	'[[256462417760782]]', '402536_256462417760782_1934566221_n.jpg',	//old woman
	'[[256462387760785]]', '403291_256462387760785_1872248914_n.jpg',	//old man
	'[[256462251094132]]', '403301_256462251094132_160715402_n.jpg',		//blondy boy
	'[[256462301094127]]', '405703_256462301094127_15858199_n.jpg',		//boy with cap
	'[[256462347760789]]', '403280_256462347760789_1632521786_n.jpg',	//indian boy
	'[[256454001094957]]', '409372_256454001094957_299004053_n.jpg',		//worker
	'[[256456204428070]]', '400920_256456204428070_780771093_n.jpg',		//policeman
	'[[256449964428694]]', '166970_256449964428694_470065423_n.jpg',		//angel
	'[[256454031094954]]', '403905_256454031094954_473640359_n.jpg',		//princess
	'[[256454064428284]]', '396560_256454064428284_1174735401_n.jpg',	//emo motherfucka
	'[[256450347761989]]', '402175_256450347761989_336142806_n.jpg',		//skull
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
	'[[256454117761612]]', '401502_256454117761612_1393387315_n.jpg',	//mis
	'[[256462614427429]]', '401060_256462614427429_1747088506_n.jpg',	//hrcak
	'[[256454194428271]]', '396304_256454194428271_76223408_n.jpg',		//zec
	'[[256454134428277]]', '395883_256454134428277_1332614946_n.jpg',	//veliki pas
	'[[256462864427404]]', '400915_256462864427404_971503431_n.jpg',		//zaba
	'[[256453721094985]]', '408782_256453721094985_230730251_n.jpg',		//tigar
	'[[256462717760752]]', '408174_256462717760752_1351714691_n.jpg',	//koala
	'[[256453964428294]]', '400026_256453964428294_835292038_n.jpg',		//medo
	'[[256450214428669]]', '404300_256450214428669_1870163886_n.jpg',	//krme
	'[[256454171094940]]', '399440_256454171094940_125348116_n.jpg',		//krava
	'[[256454271094930]]', '409320_256454271094930_339369984_n.jpg',		//vepar
	'[[256454727761551]]', '394902_256454727761551_956461070_n.jpg',		//majmun
	//fali majmun koji sjedi
	'[[256449407762083]]', '396636_256449407762083_1452626236_n.jpg',	//konj
	'[[256455537761470]]', '406275_256455537761470_969566334_n.jpg',		//konj 2
	'[[256462834427407]]', '396468_256462834427407_1331379218_n.jpg',	//kamila
	'[[256462741094083]]', '402109_256462741094083_780325799_n.jpg',		//ovan
	'[[256462677760756]]', '397315_256462677760756_578466704_n.jpg',		//slon
	'[[256454231094934]]', '393835_256454231094934_2135904956_n.jpg',	//zmija
	'[[256462431094114]]', '402739_256462431094114_521300372_n.jpg',		//sivo pile
	'[[256462571094100]]', '396672_256462571094100_1983274550_n.jpg',	//zuto pile
	'[[256454251094932]]', '395363_256454251094932_1827008875_n.jpg',	//kokoš
	'[[256454344428256]]', '396711_256454344428256_573043302_n.jpg',		//plinfa
	'[[256462654427425]]', '409499_256462654427425_210888557_n.jpg',		//gusjenica
	'[[256450207762003]]', '402108_256450207762003_657954306_n.jpg',		//hobotnica
	'[[256462487760775]]', '409030_256462487760775_1151201824_n.jpg',	//ribica
	'[[256450891095268]]', '395644_256450891095268_128224632_n.jpg',		//riba
	'[[256454304428260]]', '403678_256454304428260_1487183079_n.jpg',	//kit
	//fali delfin
	//Flowers
	'[[256458327761191]]', '401654_256458327761191_652877881_n.jpg',	//buket
	'[[256458254427865]]', '396160_256458254427865_463797307_n.jpg',		//rozi cvijet
	'[[256458304427860]]', '393983_256458304427860_292504270_a.jpg',		//suncokret
	'[[256458214427869]]', '404308_256458214427869_1141732970_n.jpg',	//rozi veliki
	'[[256461731094184]]', '401149_256461731094184_488461632_n.jpg',		//2 zelena lista
	'[[256458361094521]]', '406432_256458361094521_229670421_n.jpg',		//palma
	'[[256458424427848]]', '395421_256458424427848_1643238241_n.jpg',	//kaktus
	'[[256461637760860]]', '401048_256461637760860_1096132731_n.jpg',	//proljece
	'[[256461541094203]]', '394477_256461541094203_1587046586_n.jpg',	//skoljka
	//Places
	'[[256461791094178]]', '402545_256461791094178_511519700_a.jpg',		//suton na moru
	'[[256453507761673]]', '396215_256453507761673_39994083_n.jpg',		//zvijezda padalica
	'[[256454047761619]]', '407587_256454047761619_605862432_n.jpg',		//kip slobode
	'[[256453531095004]]', '404812_256453531095004_1233091607_n.jpg',	//duga
	'[[256455084428182]]', '406502_256455084428182_1531961076_n.jpg',	//slika
	'[[256461177760906]]', '408201_256461177760906_612538997_n.jpg',		//rollercoaster slika
	'[[256456531094704]]', '406917_256456531094704_2026437172_n.jpg',	//brod slika
	//Prevozna sredstva
	'[[256455571094800]]', '396702_256455571094800_886991575_n.jpg',		//gliser
	'[[256449437762080]]', '402759_256449437762080_1381261147_n.jpg',	//brodić
	'[[256449464428744]]', '407670_256449464428744_1518360788_n.jpg',	//avion
	'[[256450247761999]]', '405678_256450247761999_253108756_n.jpg',		//raketa
	'[[256455614428129]]', '402378_256455614428129_503075578_n.jpg',		//bike
	//fali plavi autic
	'[[256449417762082]]', '404636_256449417762082_368524575_n.jpg',		//crveni autić
	'[[256450811095276]]', '404593_256450811095276_1430328100_n.jpg',	//taxi
	'[[256456434428047]]', '407846_256456434428047_1774113735_n.jpg',	//bus
	'[[256461154427575]]', '409288_256461154427575_1439794544_n.jpg',	//police
	'[[256461054427585]]', '400038_256461054427585_620967096_n.jpg',		//vatrogasno
	'[[256461117760912]]', '401691_256461117760912_1000278924_n.jpg',	//ambulance
	'[[256453271095030]]', '396695_256453271095030_1829211684_n.jpg',	//kamiončić
	'[[256449481095409]]', '408022_256449481095409_867726142_n.jpg',		//tramvaj
	'[[256452437761780]]', '399605_256452437761780_510437444_n.jpg',		//voz
	'[[256461251094232]]', '406466_256461251094232_1203873081_n.jpg',	//speed voz
	'[[256449494428741]]', '396498_256449494428741_1726572686_n.jpg',	//
	'[[256455141094843]]', '408805_256455141094843_1324970263_n.jpg',	//
	'[[256452464428444]]', '399601_256452464428444_645216640_n.jpg',		//benzinska pumpa
	'[[256450754428615]]', '397336_256450754428615_1514663315_n.jpg',	//semafor
	'[[256458064427884]]', '407159_256458064427884_1450879512_n.jpg',	//danger
	'[[256455651094792]]', '402345_256455651094792_1834093955_n.jpg',	//
	'[[256456721094685]]', '408926_256456721094685_1063999872_n.jpg',	//
	'[[256456261094731]]', '393858_256456261094731_606505357_n.jpg',		//ATM
	'[[256455491094808]]', '407529_256455491094808_298483031_n.jpg',		//777
	'[[256456117761412]]', '401607_256456117761412_128018140_n.jpg',		//
	'[[256458827761141]]', '396468_256458827761141_427467839_n.jpg',		//
	'[[256455117761512]]', '407038_256455117761512_957311450_n.jpg',		//coffee
	'[[256455467761477]]', '400140_256455467761477_745150557_n.jpg',		//F1 flag
	'[[256455884428102]]', '403817_256455884428102_1240837323_n.jpg',	//2 crossed JPN flags
	'[[256453814428309]]', '398096_256453814428309_939654379_n.jpg',		//JPN flag
	'[[256462217760802]]', '396204_256462217760802_986797027_n.jpg',		//KOR flag
	'[[256462187760805]]', '406443_256462187760805_1580619244_n.jpg',	//CHN flag
	'[[256453854428305]]', '408104_256453854428305_807863813_n.jpg',		//USA flag
	//missin FRA flag
	'[[256462121094145]]', '398059_256462121094145_194506787_n.jpg',		//ESP flag
	'[[256453901094967]]', '402172_256453901094967_423616461_n.jpg',		//ITA flag
	'[[256462147760809]]', '395392_256462147760809_109496707_n.jpg',		//RUS flag
	'[[256453937761630]]', '406185_256453937761630_1074798309_n.jpg',	//UK flag
	'[[256453881094969]]', '407659_256453881094969_1256288900_a.jpg',	//DEU flag
	//Symbols
	'[[256451121095245]]', '400405_256451121095245_1116538315_n.jpg',	//1
	'[[256451134428577]]', '394151_256451134428577_1637770608_n.jpg',	//2
	'[[256451151095242]]', '409000_256451151095242_1889418065_n.jpg',	//3
	'[[256451164428574]]', '397901_256451164428574_725155198_n.jpg',		//4
	'[[256457064427984]]', '405673_256457064427984_587135597_n.jpg',		//5
	'[[256457077761316]]', '407989_256457077761316_836034359_n.jpg',		//6
	'[[256457101094647]]', '406422_256457101094647_618683087_n.jpg',		//7
	'[[256457151094642]]', '393995_256457151094642_723639694_n.jpg',		//8
	'[[256457177761306]]', '406249_256457177761306_447970203_n.jpg',		//9
	'[[256457214427969]]', '408325_256457214427969_1080084107_n.jpg',	//0
	'[[256456741094683]]', '404455_256456741094683_1685222700_n.jpg',	//#
	'[[256457397761284]]', '400200_256457397761284_2077046074_n.jpg',	//^
	'[[256457427761281]]', '397256_256457427761281_1594539415_n.jpg',	//v
	'[[256457494427941]]', '404820_256457494427941_18988419_n.jpg',		//<-
	//missin ->
	'[[256457521094605]]', '405735_256457521094605_105573115_n.jpg',		//up-right
	'[[256457547761269]]', '407297_256457547761269_765575849_n.jpg',		//up-left
	'[[256457584427932]]', '407090_256457584427932_114911717_n.jpg',		//right-down
	//missin left-down
	'[[256457627761261]]', '398157_256457627761261_1742294790_n.jpg',	//>
	'[[256451351095222]]', '407500_256451351095222_2040199804_n.jpg',	//<<
	'[[256451344428556]]', '401320_256451344428556_1673449174_n.jpg',	//>>
	'[[256451501095207]]', '401659_256451501095207_1019193317_n.jpg',	//OK
	'[[256456811094676]]', '406309_256456811094676_1138809885_n.jpg',	//new
	'[[256451487761875]]', '407888_256451487761875_751348013_n.jpg',		//top
	//missin UP
	'[[256456827761341]]', '397291_256456827761341_1122110483_n.jpg',	//cool
	'[[256462027760821]]', '400306_256462027760821_1412365032_n.jpg',	//camera sign
	'[[256456557761368]]', '396949_256456557761368_1034972756_n.jpg',	//]]
	'[[256450947761929]]', '405300_256450947761929_349292736_n.jpg',		//WiFi
	'[[256451187761905]]', '403796_256451187761905_1314909523_n.jpg',	//red jpn sign
	'[[256451211095236]]', '401531_256451211095236_156387086_n.jpg',		//darkblue jpn sign
	//missin jpn orange sign
	'[[256457264427964]]', '407170_256457264427964_64319836_n.jpg',		//pink jpn sign
	'[[256451227761901]]','401688_256451227761901_748081890_n.jpg',		//green jpn sign
	'[[256451241095233]]', '403931_256451241095233_727088542_n.jpg',		//1st jpn orange sign
	'[[256456911094666]]', '397499_256456911094666_1447534322_n.jpg',	//
	'[[256456941094663]]', '409002_256456941094663_983859481_n.jpg',		//
	'[[256456961094661]]', '399853_256456961094661_992182306_n.jpg',		//
	'[[256456991094658]]', '393938_256456991094658_188873492_n.jpg',		//
	'[[256457294427961]]', '395198_256457294427961_1155397626_n.jpg',	//jpn blue sign
	'[[256456144428076]]', '407407_256456144428076_1472671300_n.jpg',	//woman n man sign
	'[[256455667761457]]', '166935_256455667761457_1494547399_n.jpg',	//man sign
	'[[256455714428119]]', '398428_256455714428119_1492195124_n.jpg',	//woman sign
	'[[256450567761967]]', '407224_256450567761967_281677206_a.jpg',		//baby on board
	'[[256456707761353]]', '398170_256456707761353_1839442402_n.jpg',	//no smokin
	'[[256450767761947]]', '397298_256450767761947_650207464_n.jpg',		//parkin sign
	'[[256450924428598]]', '399999_256450924428598_1535007615_n.jpg',	//wheelchair
	'[[256461217760902]]', '403879_256461217760902_241310927_n.jpg',		//tram sign
	//missin WC
	'[[256458674427823]]', '407755_256458674427823_594971809_n.jpg',		//jpn sign
	'[[256451717761852]]', '404473_256451717761852_2087423407_n.jpg',	//jpn sign2
	'[[256456661094691]]', '404599_256456661094691_1150893972_n.jpg',	//-18
	'[[256457347761289]]', '397218_256457347761289_1017655984_n.jpg',	//ID
	'[[256456641094693]]', '401454_256456641094693_967165607_n.jpg',		//
	'[[256456601094697]]', '403321_256456601094697_453328402_n.jpg',		//
	'[[256456571094700]]', '400353_256456571094700_1299942144_n.jpg',	//<3
	'[[256450501095307]]', '396739_256450501095307_531842148_n.jpg',		//VS
	'[[256457984427892]]', '403112_256457984427892_1700153662_n.jpg',	//
	'[[256458011094556]]', '394343_256458011094556_1855643752_n.jpg',	//OFF
	'[[256450707761953]]', '409439_256450707761953_1142377348_n.jpg',	//
	'[[256456084428082]]', '403100_256456084428082_1313854600_n.jpg',	// some jpn shit
	'[[256451417761882]]', '405581_256451417761882_16314256_n.jpg',		//
	'[[256457664427924]]', '406920_256457664427924_810537947_n.jpg',		//bik
	// missin here
	'[[256457681094589]]', '406396_256457681094589_712745523_n.jpg',		//rak
	'[[256457711094586]]', '396734_256457711094586_279901125_n.jpg',		//
	'[[256457814427909]]', '394297_256457814427909_2088444015_a.jpg',	//
	'[[256457821094575]]', '401122_256457821094575_1980305348_n.jpg',	//vaga
	'[[256457857761238]]', '403675_256457857761238_1626636694_n.jpg',	//
	'[[256457887761235]]', '409535_256457887761235_102615458_n.jpg',		//strijelac
	'[[256457917761232]]', '394950_256457917761232_2068391386_n.jpg',	//
	'[[256457947761229]]', '394414_256457947761229_1091481_n.jpg',		//
	'[[256451437761880]]', '402496_256451437761880_182207529_n.jpg',		//
	'[[256451474428543]]', '402338_256451474428543_2129289612_n.jpg',	//
	'[[256451377761886]]', '394510_256451377761886_193064516_n.jpg',		//
	'[[256462911094066]]', '402999_256462911094066_1425536323_n.jpg',	//A
	'[[256462951094062]]', '405320_256462951094062_2054050259_n.jpg',	//B
	'[[256462994427391]]', '404479_256462994427391_910643323_n.jpg',		//AB
	'[[256463011094056]]', '404495_256463011094056_1223050697_n.jpg',	//0
	'[[256451054428585]]', '393944_256451054428585_696709671_n.jpg',		//green circle
	'[[256457021094655]]', '402699_256457021094655_209652665_n.jpg',		//red circle
	'[[256451101095247]]', '407952_256451101095247_984349464_n.jpg',		//purple circle
	'[[256449644428726]]', '402702_256449644428726_2046430818_n.jpg',	//12h
	'[[256451427761881]]', '397033_256451427761881_44003680_n.jpg',		//1h
	'[[256451541095203]]', '409549_256451541095203_178507491_n.jpg',		//2h
	'[[256451567761867]]', '402443_256451567761867_1591923668_n.jpg',	//3h
	'[[256451584428532]]', '409386_256451584428532_1412466708_n.jpg',	//4h
	'[[256451594428531]]', '404290_256451594428531_399875353_n.jpg',		//5h
	'[[256451621095195]]', '406195_256451621095195_1761541233_n.jpg',	//6h
	'[[256449531095404]]', '396550_256449531095404_1047876674_n.jpg',	//7h
	'[[256449541095403]]', '394464_256449541095403_427739642_n.jpg',		//8h
	'[[256449564428734]]', '407794_256449564428734_1741645642_n.jpg',	//9h
	'[[256449584428732]]', '400274_256449584428732_137150737_n.jpg',		//10h
	'[[256449624428728]]', '398566_256449624428728_1798402479_n.jpg',	//11h
	'[[256459214427769]]', '405262_256459214427769_1826882762_n.jpg',	//red circle
	'[[256459301094427]]', '166976_256459301094427_1565549757_n.jpg',	//red X
	'[[256451517761872]]', '408815_256451517761872_215311200_a.jpg',		//©
	'[[256451531095204]]', '395280_256451531095204_220375588_a.jpg',		//®
	'[[256463097760714]]', '396444_256463097760714_2120308077_n.jpg',	//™
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