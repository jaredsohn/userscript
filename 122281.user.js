// ==UserScript==
// @name			Facebook Emoticons+ by napster
// @author			Ricky x napster
// @description			Adds an emoticon/meme/anime bar to Facebook chat editted by Ricky x napster
// @version           		2.0
// @versionnumber		2.0
// @include          		http://*.facebook.com/*
// @include           		https://*.facebook.com/*
// @match            	 	http://*.facebook.com/*
// @match             		https://*.facebook.com/*
// @namespace			http://userscripts.org/scripts/show/120394

// ==/UserScript==

(function(d){

    const DEBUG = true;

    const script_id = 121376,
          script_version = '2.0';

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
                        alt = alt.replace('♥', '&lt;3');

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
                     +       '<a href="/DoctoR.Ossi">'
                     +         'Yapımcı'
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
            'http://imgim.com/793inciw8628775.jpg',
            null,
            'width=450,height=850,left=25,scrollbars=yes',
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

	version = 2.0

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
			if(confirm("ตอนนี้มีเวอร์ชั่นใหม่สำหรับ 'Facebook Chat More Emoticons+'.\n ต้องการติดตั้งตอนนี้หรือไม่ ?")) openInTab('http://userscripts.org/scripts/source/121376.user.js');
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
  
    '[[145225882254911]]', '373395_145225882254911_115221962_n.jpg', 
    '[[295437087159559]]', '392060_295439203826014_295437087159559_721194_86587285_n.jpg', 
    '[[221832151226580]]', '373455_221832151226580_1765735627_n.jpg', 
    '[[159050490867328]]', '276921_159050490867328_366627782_n.jpg', 
    '[[181121868652317]]', '373284_181121868652317_313258776_n.jpg',
    '[[296239407086564]]', '373682_296239407086564_1398898389_n.jpg',
    '[[317347358286674]]', '373477_317347358286674_1280542865_n.jpg',
    '[[242940279109002]]', '373204_242940279109002_1477876907_n.jpg',
    '[[299969196713474]]', '372838_299969196713474_1606904603_n.jpg',
    '[[322365421121106]]', '276588_322365421121106_1518082794_n.jpg',
    '[[241542755918374]]', '373337_241542755918374_803992496_n.jpg',
    '[[159158960855892]]', '372984_159158960855892_424971400_n.jpg',
    '[[199212223501830]]', '373182_199212223501830_1470014677_n.jpg',
    '[[284617331589876]]', '373182_199212223501830_1470014677_n.jpg',
    '[[284617331589876]]', '373195_284617331589876_526150440_n.jpg', 
    '[[trafileswmegusta]]', '203579_147452525332700_5478172_q.jpg', 
    '[[TroolFaces]]', '372997_254391157946791_1329668557_q.jpg',
    '[[LOL.Oficial]]', '373232_197759556926014_2144795913_q.jpg',
    '[[FapFapFapMeme]]', '373053_166377960087575_1747489243_q.jpg',
    '[[CerealesGuy]]', '162038_161570823888430_211437_q.jpg',
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
    '[[158293577608335]]', '373049_158293577608335_52064129_n.jpg', 
    '[[158782664227113]]', '261116_158782664227113_1885784424_n.jpg', 
    '[[144895178953675]]', '373596_144895178953675_1963775243_n.jpg', 
    '[[245307658872150]]', '372936_245307658872150_572173458_n.jpg', 
//เครดิต
    '[[278299882219687]]', '373352_278299882219687_1270140546_n.jpg', 
    '[[292960684074210]]', '373627_292960684074210_1886989232_n.jpg', 
    '[[263942863670203]]', '373453_263942863670203_264217486_n.jpg', 
    '[[260637650666183]]', '372926_260637650666183_2081825699_n.jpg', 
    '[[200791816678107]]', '373084_200791816678107_1663924866_n.jpg', 
    '[[349125801770492]]', '372919_349125801770492_280376981_n.jpg', 
    '[[344959635531298]]', '373352_344959635531298_1751019295_n.jpg', 
    '[[139933362786387]]', '373523_139933362786387_1148288490_n.jpg', 
    '[[200791816678107]]', '373084_200791816678107_1663924866_n.jpg', 
    '[[139933362786387]]', '373523_139933362786387_1148288490_n.jpg', 
    '[[196040593823652]]', '373267_196040593823652_171892241_n.jpg', 
    '[[264607293593028]]', '187858_264607293593028_1535087133_n.jpg', 
    '[[139572426155861]]', '372940_139572426155861_1552988677_n.jpg', 
    '[[139933362786387]]', '373523_139933362786387_1148288490_n.jpg', 
//V.1.4
    '[[nongyen]]', '211849_1363576267_1960154645_q.jpg', 
    '[[312043225496201]]', '372911_312043225496201_262337771_n.jpg', 
    '[[264000353661534]]', '373471_264000353661534_1667257924_n.jpg', 
    '[[311892002175027]]', '373364_311892002175027_1182470681_n.jpg', 
    '[[295707353800293]]', '373241_295707353800293_2112284624_n.jpg',
    '[[301206263254875]]', '373618_301206263254875_504517370_n.jpg',
    '[[224327770976718]]', '372911_224327770976718_2018900380_n.jpg',
    '[[302254733151700]]', '373185_302254733151700_201015568_n.jpg',
    '[[138500952931109]]', '373526_138500952931109_1368515352_n.jpg',
    '[[254708701262201]]', '373668_254708701262201_1520916153_n.jpg',
    '[[150007401774327]]', '373576_150007401774327_1414170535_n.jpg',
    '[[209779169107843]]', '372881_209779169107843_1322191204_n.jpg',
    '[[285756594808082]]', '373618_285756594808082_293376520_n.jpg',
    '[[186271624802554]]', '373254_186271624802554_303244150_n.jpg',
    '[[253974841334328]]', '373279_253974841334328_1033121441_n.jpg',
    '[[198947756866358]]', '373350_198947756866358_361564622_n.jpg',
    '[[311970972176096]]', '187857_311970972176096_1501796591_n.jpg',
//V.15
    '[[210374132379735]]', '373665_210374132379735_1706950326_n.jpg',
    '[[166457916787243]]', '261100_166457916787243_1568872474_n.jpg',
    '[[226476154095867]]', '373615_226476154095867_1622064364_n.jpg',
    '[[314809595218100]]', '373091_314809595218100_1731654510_n.jpg',
    '[[266613746732321]]', '187854_266613746732321_1457736570_n.jpg',
    '[[117676438351747]]', '372996_117676438351747_625652911_n.jpg',
    '[[293908137317286]]', '373613_293908137317286_1415572529_n.jpg',
    '[[206315799456115]]', '373584_206315799456115_303175611_n.jpg',
    '[[122607641189860]]', '261083_122607641189860_456714000_n.jpg',
    '[[288985991152726]]', '372885_288985991152726_1256629343_n.jpg',
//V.17
    '[[316094695079811]]', '372860_316094695079811_1715148684_n.jpg',
    '[[272758526114508]]', '373688_272758526114508_1143611526_n.jpg',
    '[[272758526114508]]', '373688_272758526114508_1143611526_n.jpg',
    '[[292344094149930]]', '373653_292344094149930_1340034324_n.jpg',
    '[[271851089537301]]', '373479_271851089537301_1452083108_n.jpg',
//Share
    'ตอนนี้ฉันกำลังใช้ปลักอินเสริมที่ช่วยเพิ่ม Emotions ใน Chat Facebook อยู่ (ตัวอย่าง (y)  [[159050490867328]] [[264000353661534]]  [[245307658872150]]  [[158782664227113]] ฯลฯ) ฉันอยากให้เธอลองใช้บ้าง แล้วเรามาสนุกด้วยกัน ใช้ได้ทั้ง Firefox และ Google Chrome ดูจากเว็บนี้ได้เลย >> http://board.postjung.com/592973.html <<', '187838_209715015781243_281074045_n.jpg',
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
var chatNewHeight = 430; //limited by other stuff not to fly off the page
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
        chatNewHeight = 430;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    } else {
        // Big chat
        chatNewWidth = 300;
        chatNewHeight = 430;
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
	    addGlobalStyle(".emote_custom { height: 20px !important; width: 20px !important; } ");
	
    addGlobalStyle("tbody { vertical-align: bottom; }");

}
 
reFlow();
//== End Big Chat