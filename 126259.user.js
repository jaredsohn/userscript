// ==UserScript==
// @name			New Facebook Chat Emotion
// @author			heri adi idil adha
// @name			New Facebook Chat Emotions
// @description			Extended Facebook Chat
// @version           0.0
// @versionnumber		0.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// ==/UserScript==

(function(d){

    const DEBUG = true;

    const script_id = 126192,
          script_version = '0.0';

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
                     +       '<b>Facebook smileys by Heri Adi Idil Adha :)</b> '
                     +       '<small>v' + script_version + '</small>'
                     +     '</div>'

                     +     '<div class="fsm fwn fcg">'
                     +       '<a href="#" id="open-list">Smile list</a>'
                     +       ' &middot; '
                     +       '<a href="http://www.facebook.com/profile.php?id=100000158393095">'
                     +         'Author'
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

	version = 0.0

	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'http://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
    ProfileImgURL = HttpsOn?'http://profile.ak.fbcdn.net/hprofile-ak-snc4/':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/';
	ResourcesURL = HttpsOn?'http://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';


/* START: */

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
								  url: 'http://userscripts.org/scripts/source/126192.meta.js?' + new Date().getTime(),
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
			if(confirm("New Facebook Chat Emoticons'.\n Facebook Chat ?")) openInTab('http://userscripts.org/scripts/source/126192.user.js');
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
   '[[142670085793927]]', '203500_142670085793927_3334212_q.jpg',
    '[[168040846586189]]', '373509_168040846586189_1627905796_q.jpg',
    '[[144685078974802]]', '211148_144685078974802_823703752_q.jpg',
	'[[145225882254911]]', '373395_145225882254911_115221962_n.jpg', 
    '[[295437087159559]]', '392060_295439203826014_295437087159559_721194_86587285_n.jpg', 
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

    '[[266204243439097]]', '373247_266204243439097_1738378947_n.jpg', 
    '[[158293577608335]]', '373049_158293577608335_52064129_n.jpg', 
    '[[158782664227113]]', '261116_158782664227113_1885784424_n.jpg', 
    '[[144895178953675]]', '373596_144895178953675_1963775243_n.jpg', 
    '[[245307658872150]]', '372936_245307658872150_572173458_n.jpg', 
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

    '[[316094695079811]]', '372860_316094695079811_1715148684_n.jpg',
    '[[272758526114508]]', '373688_272758526114508_1143611526_n.jpg',
    '[[272758526114508]]', '373688_272758526114508_1143611526_n.jpg',
    '[[292344094149930]]', '373653_292344094149930_1340034324_n.jpg',
    '[[271851089537301]]', '373479_271851089537301_1452083108_n.jpg',
	
	
//kaskus
	
	
	
	    '[[239173782833076]]', '401350_239173782833076_208810792536042_527350_1701138791_n.jpg',
	    '[[239173929499728]]', '425166_239173929499728_150863955_n.jpg',
	    '[[239174109499710]]', '427197_239174109499710_208810792536042_527353_704626056_n.jpg ',
	    '[[239174162833038]]', '429946_239174162833038_208810792536042_527354_1696629961_n.jpg',
	    '[[239174262833028]]', '422534_239174262833028_208810792536042_527356_619150098_n.jpg ',
	    '[[239174326166355]]', '404263_239174326166355_208810792536042_527357_458060700_n.jpg ',
	    '[[239174449499676]]', '394030_239174449499676_208810792536042_527358_1095497113_n.jpg',
	    '[[239174532833001]]', '428200_239174532833001_208810792536042_527359_808112832_n.jpg ',
	    '[[239180809499040]]', '423700_239180809499040_208810792536042_527371_1727350783_n.jpg',
	    '[[239180959499025]]', '423004_239180959499025_208810792536042_527372_2111804522_n.jpg',
	    '[[239181109499010]]', '395912_239181109499010_208810792536042_527374_1395582158_n.jpg',
	    '[[239181232832331]]', '419375_239181232832331_208810792536042_527375_1349781910_n.jpg',
	    '[[239185906165197]]', '424982_239185906165197_208810792536042_527389_1903515017_n.jpg',
	    '[[239185909498530]]', '424982_239185909498530_208810792536042_527390_659362412_n.jpg ',
	    '[[239185912831863]]', '424982_239185912831863_208810792536042_527391_1855392763_n.jpg ',
	    '[[239185916165196]]', '424982_239185916165196_208810792536042_527392_229082511_n.jpg ',
	    '[[239185919498529]]', '424982_239185919498529_208810792536042_527393_1019393264_n.jpg',
	    '[[239187959498325]]', '425107_239187959498325_208810792536042_527394_1997484422_n.jpg',
	    '[[239187962831658]]', '425107_239187962831658_208810792536042_527395_1034274119_n.jpg',
	    '[[239187966164991]]', '425107_239187966164991_208810792536042_527396_186138221_n.jpg ',
	    '[[239187969498324]]', '425107_239187969498324_208810792536042_527397_1060421781_n.jpg',
	    '[[239187972831657]]', '425107_239187972831657_208810792536042_527398_1814031716_n.jpg',
	    '[[239188199498301]]', '396998_239188199498301_208810792536042_527399_1115033997_n.jpg',
	    '[[239188202831634]]', '396998_239188202831634_208810792536042_527400_578764757_n.jpg ',
	    '[[239188206164967]]', '396998_239188206164967_208810792536042_527401_1302868677_n.jpg',
	    '[[239188806164907]]', '407833_239188806164907_208810792536042_527406_1422649214_n.jpg',
	    '[[239188802831574]]', '407833_239188802831574_208810792536042_527405_811357181_n.jpg ',
	    '[[239188796164908]]', '407833_239188796164908_208810792536042_527404_25082886_n.jpg  ',
	    '[[239188219498299]]', '396998_239188219498299_208810792536042_527403_2016091227_n.jpg',
	    '[[239188212831633]]', '396998_239188212831633_208810792536042_527402_1450139556_n.jpg',
	    '[[239190799498041]]', '430380_239190799498041_208810792536042_527414_453435799_n.jpg ',
	    '[[239188809498240]]', '407833_239188809498240_208810792536042_527407_92813046_n.jpg  ',
	    '[[239188812831573]]', '407833_239188812831573_208810792536042_527408_991194827_n.jpg ',
	    '[[239190792831375]]', '430380_239190792831375_208810792536042_527412_1629196280_n.jpg',
	    '[[239190796164708]]', '430380_239190796164708_208810792536042_527413_1792821240_n.jpg',
	    '[[239190802831374]]', '430380_239190802831374_208810792536042_527415_1790814993_n.jpg',
	    '[[239190806164707]]', '430380_239190806164707_208810792536042_527416_1022089040_n.jpg',
	    '[[239191512831303]]', '423274_239191512831303_208810792536042_527425_953877017_n.jpg ',
	    '[[239191522831302]]', '423274_239191522831302_208810792536042_527426_1387322715_n.jpg',
	    '[[239191532831301]]', '423274_239191532831301_1606838773_n.jpg',
	    '[[239191536164634]]', '423274_239191536164634_208810792536042_527428_1265361856_n.jpg',
	    '[[239191539497967]]', '423274_239191539497967_208810792536042_527429_944791659_n.jpg ',
	    '[[239192696164518]]', '418751_239192696164518_208810792536042_527438_250515475_n.jpg ',
	    '[[239192699497851]]', '418751_239192699497851_208810792536042_527439_2124486871_n.jpg',
	    '[[239192706164517]]', '418751_239192706164517_208810792536042_527440_2001668510_n.jpg',
	    '[[239192709497850]]', '418751_239192709497850_208810792536042_527441_984782478_n.jpg ',
	    '[[239192712831183]]', '418751_239192712831183_208810792536042_527442_940303372_n.jpg ',
	    '[[239193352831119]]', '425116_239193352831119_208810792536042_527449_1297538268_n.jpg',
	    '[[239193362831118]]', '425116_239193362831118_208810792536042_527450_803967724_n.jpg ',
	    '[[239193366164451]]', '425116_239193366164451_208810792536042_527451_1235244161_n.jpg',
	    '[[239193369497784]]', '425116_239193369497784_208810792536042_527452_1038781904_n.jpg',
	    '[[239193372831117]]', '425116_239193372831117_208810792536042_527453_1580171013_n.jpg',
	    '[[239194602830994]]', '406445_239194602830994_208810792536042_527466_839409356_n.jpg ',
	    '[[239194606164327]]', '406445_239194606164327_208810792536042_527467_895052555_n.jpg ',
	    '[[239194609497660]]', '406445_239194609497660_208810792536042_527468_1520475301_n.jpg',
	    '[[239194612830993]]', '406445_239194612830993_208810792536042_527469_1576321318_n.jpg',
	    '[[239195346164253]]', '418030_239195346164253_208810792536042_527472_546130951_n.jpg ',
	    '[[239195352830919]]', '418030_239195352830919_208810792536042_527473_1459040648_n.jpg',
	    '[[239195362830918]]', '418030_239195362830918_208810792536042_527474_800409954_n.jpg ',
	    '[[239195366164251]]', '418030_239195366164251_208810792536042_527475_1636196636_n.jpg',
	    '[[239195369497584]]', '418030_239195369497584_208810792536042_527476_392366592_n.jpg ',
	    '[[239196152830839]]', '425872_239196152830839_208810792536042_527480_1636434717_n.jpg',
	    '[[239196159497505]]', '425872_239196159497505_208810792536042_527481_856765990_n.jpg ',
	    '[[239196166164171]]', '425872_239196166164171_208810792536042_527482_1081999352_n.jpg',
	    '[[239196169497504]]', '425872_239196169497504_208810792536042_527483_1793131371_n.jpg',
	    '[[239196172830837]]', '425872_239196172830837_208810792536042_527484_1985572425_n.jpg',
	    '[[239196776164110]]', '425369_239196776164110_208810792536042_527486_1024214892_n.jpg',
	    '[[239196779497443]]', '425369_239196779497443_208810792536042_527487_1038065670_n.jpg',
	    '[[239196782830776]]', '425369_239196782830776_208810792536042_527488_1406581629_n.jpg',
	    '[[239196786164109]]', '425369_239196786164109_208810792536042_527489_688983171_n.jpg ',
	    '[[239196789497442]]', '425369_239196789497442_208810792536042_527490_890348312_n.jpg ',
	    '[[239197899497331]]', '395906_239197899497331_208810792536042_527491_341978871_n.jpg ',
	    '[[239197902830664]]', '395906_239197902830664_208810792536042_527492_998083963_n.jpg ',
	    '[[239197906163997]]', '395906_239197906163997_208810792536042_527493_990854877_n.jp  ',
	    '[[239197909497330]]', '395906_239197909497330_208810792536042_527494_423597852_n.jpg ',
	    '[[239197912830663]]', '395906_239197912830663_208810792536042_527495_439873665_n.jpg ',
	    '[[239198832830571]]', '429805_239198832830571_208810792536042_527496_360540493_n.jpg ',
	    '[[239198836163904]]', '429805_239198836163904_208810792536042_527497_444394408_n.jpg ',
	    '[[239198842830570]]', '429805_239198842830570_208810792536042_527498_1726628014_n.jpg',
	    '[[239198846163903]]', '429805_239198846163903_208810792536042_527499_1799352997_n.jpg',
	    '[[239198852830569]]', '429805_239198852830569_208810792536042_527500_1305904384_n.jpg',
	    '[[239199452830509]]', '431159_239199452830509_208810792536042_527501_1620787503_n.jpg',
	    '[[239199459497175]]', '431159_239199459497175_208810792536042_527502_504969764_n.jpg ',
	    '[[239199462830508]]', '431159_239199462830508_208810792536042_527503_128647956_n.jpg ',
	    '[[239200359497085]]', '421780_239200359497085_208810792536042_527508_1464936213_n.jpg',
	    '[[239200362830418]]', '421780_239200362830418_208810792536042_527509_673857133_n.jpg ',
	    '[[239200369497084]]', '421780_239200369497084_208810792536042_527510_1178859144_n.jpg',
	    '[[239200376163750]]', '421780_239200376163750_109102268_n.jpg',
	    '[[239200382830416]]', '421780_239200382830416_208810792536042_527512_834723656_n.jpg ',
	
	
    '[[221832151226580]]', '373455_221832151226580_1765735627_n.jpg', 
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
    '[[299969196713474]]', '372838_299969196713474_1606904603_n.jpg',
    '[[159158960855892]]', '372984_159158960855892_424971400_n.jpg',
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
    '[[306140386091878]]', '373237_306140386091878_851921318_n.jpg',
    '[[345425488820942]]', '372832_345425488820942_699606461_n.jpg',
    '[[355316531150134]]', '372873_355316531150134_1736238347_n.jpg',
    '[[244276778975060]]', '372783_244276778975060_647656153_n.jpg',
    '[[166297346811432]]', '372925_166297346811432_1264296790_n.jpg',
    '[[340680965960951]]', '373233_340680965960951_684584580_n.jpg',
    '[[126229327389020]]', '27977_126229327389020_123901794288440_321639_6066831_n.jpg',
    '[[127868980561350]]', '31432_127868980561350_119193198095595_360800_5065376_n.jpg',
    '[[126220920723194]]', '27977_126220920723194_123901794288440_321588_5280905_n.jpg',
    '[[126125527399400]]', '31397_126125527399400_123901794288440_321210_6541100_n.jpg',
    '[[126236287388324]]', '27977_126236287388324_123901794288440_321681_7075191_n.jpg',
	
	'[[127878643893717]]', '31432_127878643893717_119193198095595_360823_4683334_n.jpg',
	'[[126278187384134]]', '27977_126278187384134_123901794288440_321792_532125_n.jpg',
	'[[126216480723638]]', '27977_126216480723638_123901794288440_321574_5710742_n.jpg',
	'[[110780922298250]]', '30302_110780922298250_107569439286065_69153_3663372_n.jpg',
	'[[126132024065417]]', '28667_126132024065417_123901794288440_321235_2277856_n.jpg',
	'[[126540207361797]]', '31956_126540207361797_126535820695569_351745_5403096_n.jpg',
	'[[126213110723975]]', '27977_126213110723975_123901794288440_321543_2175015_n.jpg',
	'[[110566632320002]]', '28914_110566632320002_110562282320437_70172_5760745_n.jpg',
	
    '[[252346194801306]]', '373334_252346194801306_1790253379_q.jpg',
    '[[266313623412267]]', '372827_266313623412267_1139168491_q.jpg',
    '[[191560730921873]]', '373612_191560730921873_1079675330_q.jpg',
    '[[182809565135565]]', '373605_182809565135565_1001788489_q.jpg',
    '[[242070735843795]]', '373618_242070735843795_769462514_q.jpg',
    '[[258958334142268]]', '373206_258958334142268_498157652_q.jpg',
    '[[196920740401785]]', '373192_196920740401785_1284312742_q.jpg',
    '[[113544575430999]]', '373622_113544575430999_300212597_q.jpg',
    '[[294715893904555]]', '372969_294715893904555_1901647256_q.jpg',
    '[[294660140569858]]', '373587_294660140569858_478025726_q.jpg',
    '[[328415510520892]]', '373622_328415510520892_917440000_q.jpg',
    '[[270221906368791]]', '373607_270221906368791_57033006_q.jpg',
    '[[212614922155016]]', '373509_212614922155016_1290783757_q.jpg',
    '[[205633882856736]]', '372800_205633882856736_1832257183_q.jpg',
    '[[256255337773105]]', '373603_256255337773105_431775381_q.jpg',
    '[[288138264570038]]', '373659_288138264570038_1461934681_q.jpg',
    '[[296999947008863]]', '261109_296999947008863_640224354_q.jpg',
    '[[216672855078917]]', '372968_216672855078917_1393843742_q.jpg',
    '[[278786215503631]]', '261085_278786215503631_207327985_q.jpg',
    '[[241341589270741]]', '373643_241341589270741_369533067_q.jpg',
    '[[312524205448755]]', '372896_312524205448755_1686406526_q.jpg',
    '[[200138403410055]]', '211171_200138403410055_1437352794_q.jpg',
    '[[165410113558613]]', '372913_165410113558613_547442504_q.jpg',
    '[[203403609746433]]', '373398_203403609746433_363584857_q.jpg',
    '[[334427926570136]]', '373018_334427926570136_990451047_q.jpg',
    '[[250632158335643]]', '276592_250632158335643_990630424_q.jpg',
    '[[285985351447161]]', '373472_285985351447161_209955544_q.jpg',
    '[[343627398996642]]', '373587_343627398996642_107902818_q.jpg',
    '[[315740851791114]]', '373581_315740851791114_1376177167_q.jpg',
    '[[136342506479536]]', '373241_136342506479536_831783111_q.jpg',
    '[[224173507657194]]', '372917_224173507657194_1836514892_q.jpg',
    '[[317710424919150]]', '372774_317710424919150_1511641330_q.jpg',
	
	
	//Share
    'FB Chat Emoticons\n'+
    'by PaulDr!\n'+
    '[[PARTHA.dhr.paul]] == http://fb.me/PARTHA.dhr.paul', '274202_100000029272727_2583955_q.jpg',

	
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
	    addGlobalStyle(".emote_custom { height: 20px !important; width: 20px !important; } ");
	
    addGlobalStyle("tbody { vertical-align: bottom; }");

}
 
reFlow();
//== End Big Chat