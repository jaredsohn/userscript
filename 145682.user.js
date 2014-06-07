// ==UserScript==
// @name			Facebook Chat More Emoticons+
// @author			Achillepower
// @description			New smileys and emoticons to Facebook chat by AchillePowe  4.5 (http://www.facebook.com/AchillePower)
// @version           4.5
// @versionnumber		4.5
// @icon           http://s3.amazonaws.com/uso_ss/icon/145682/large.png
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			http://www.facebook.com/f.new.emoticone.plus
// ==/UserScript==

(function(d){

    const DEBUG = true;

    const script_id = 121376,
          script_version = '4.5';

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
                     +       '<b>evolution.social-networking</b> '
                     +       '<small>v' + script_version + '</small>'
                     +     '</div>'

                     +     '<div class="fsm fwn fcg">'
                     +       '<a href="#" id="open-list">Contact us.</a>'
                     +       ' &middot; '
                     +       '<a href="/AchillePower">'
                     +         'If you have any comments or questions'
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
            'http://www.facebook.com/messages/100002612446029',
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

	version = 2.2

	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'http://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
    ProfileImgURL = HttpsOn?'http://profile.ak.fbcdn.net/hprofile-ak-snc4/':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/';
	ResourcesURL = HttpsOn?'http://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';


/* START: Desing By "AchillePower" (AchillePower) */

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
								  url: '' + new Date().getTime(),
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
			if(confirm("New smileys and emoticons to Facebook chat by AchillePowe ")) openInTab('http://www.facebook.com/pages/Fb-New-%C3%89motic%C3%B4ne-Plus-beta/226169490792925');
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
   
    '[[239174109499710]]', '427197_239174109499710_208810792536042_527353_704626056_n.jpg', 
    '[[239187959498325]]', '425107_239187959498325_208810792536042_527394_1997484422_n.jpg',
    '[[239187962831658]]', '425107_239187962831658_208810792536042_527395_1034274119_n.jpg',
    '[[239191512831303]]', '423274_239191512831303_208810792536042_527425_953877017_n.jpg',
    '[[460446070666492]]', '534380_460446070666492_1559983299_n.jpg',  
    '[[458743664170066]]', '423865_458743664170066_1102625111_n.jpg', 
    '[[458743684170064]]', '523334_458743684170064_309857270_n.jpg',
    '[[458743697503396]]', '381087_458743697503396_2137382088_n.jpg',
    '[[458743710836728]]', '577096_458743710836728_1726137822_n.jpg',
    '[[458743727503393]]', '560463_458743727503393_1241316255_n.jpg',
    '[[458743744170058]]', '530006_458743744170058_1074760793_n.jpg',  
    '[[458743767503389]]', '391738_458743767503389_852781400_n.jpg', 
    '[[458743787503387]]', '304634_458743787503387_1366057353_n.jpg',
    '[[458743794170053]]', '185051_458743794170053_884118179_n.jpg',
    '[[458743840836715]]', '554702_458743840836715_1971817003_n.jpg',
    '[[458743927503373]]', '530254_458743927503373_688894919_n.jpg',
    '[[458743934170039]]', '557505_458743934170039_905509311_n.jpg',  
    '[[458743957503370]]', '295148_458743957503370_313021161_n.jpg', 
    '[[458744524169980]]', '423774_458744524169980_1591989393_n.jpg',
    '[[458744554169977]]', '644520_458744554169977_224021068_n.jpg',
    '[[458744650836634]]', '318472_458744650836634_937454346_n.jpg',
    '[[458744700836629]]', '429832_458744700836629_1407309120_n.jpg',
    '[[458744780836621]]', '551977_458744780836621_450934074_n.jpg',  
    '[[458744824169950]]', '431338_458744824169950_1925895064_n.jpg', 
    '[[458744837503282]]', '296451_458744837503282_1076817264_n.jpg',
    '[[458744897503276]]', '557344_458744897503276_188736054_n.jpg',
    '[[458744974169935]]', '582838_458744974169935_48445832_n.jpg',
    '[[458745007503265]]', '563257_458745007503265_584091553_n.jpg',
    '[[458745047503261]]', '431324_458745047503261_730020769_n.jpg',  
    '[[458745387503227]]', '539945_458745387503227_1188125739_n.jpg', 
    '[[458745320836567]]', '394244_458745320836567_828669027_n.jpg',
    '[[458745337503232]]', '292920_458745337503232_1745081370_n.jpg',
    '[[445014572219379]]', '399201_445014572219379_695680650_n.png',
    '[[445015122219324]]', '547646_445015122219324_631867993_n.png',
//à¹€à¸„à¸£à¸”à¸´à¸•         
//V.1.4  
    '[[312004372187067]]', '17984_440885735965596_232501591_n.jpg',  
    '[[312004515520386]]', '523763_440885732632263_2074311245_n.jpg', 
    '[[312615488792622]]', '282528_440885772632259_292423430_n.jpg',
    '[[363460793698354]]', '44633_440885675965602_1821121659_n.jpg',
    '[[364105393643631]]', '735_440885722632264_1231597756_n.jpg',
    '[[363460653698368]]', '282573_440885672632269_1198263882_n.jpg',
//V.17
    '[[458744247503341]]', '386001_458744247503341_878648280_n.jpg',  
    '[[460472423997190]]', '578501_460472423997190_1111681381_n.jpg', 
    '[[458745357503230]]', '295156_458745357503230_646744982_n.jpg',
    '[[458743760836723]]', '207935_458743760836723_174244806_n.jpg',
    '[[458744614169971]]', '577078_458744614169971_141095140_n.jpg',
//v2.1
    '[[364105660310271]]', '68880_440898835964286_1606564872_n.png',  
    '[[216563015093091]]', '479754_440898832630953_1194504830_n.png', 
    '[[271066929620940]]', '380030_271066929620940_1875285115_n.jpg',
    '[[440923862628450]]', '382102_440928942627942_893833547_n.png',
    '[[401495479865793]]', '215158_440974669290036_1815846577_n.png',
    '[[440983092622527]]', '556760_440983092622527_846178690_n.png',  
    '[[440983122622524]]', '543988_440983122622524_2124094865_n.png', 
    '[[440982989289204]]', '20709_440982989289204_1913253443_n.png',
    '[[440982869289216]]', '17755_440982869289216_1233793520_n.png',
    '[[440983025955867]]', '533529_440983025955867_1894264378_n.png',
    '[[440982959289207]]', '380643_440982959289207_805643974_n.png',
    '[[440983002622536]]', '205154_440983002622536_1234326306_n.png',
	'[[319363178135180]]', '564767_319363178135180_825080416_n.jpg',
    '[[319363101468521]]', '389297_319363101468521_1254020183_n.jpg',
//v2.2
    '[[319363128135185]]', '523221_319363128135185_189220957816070_804876_37657527_n.jpg',
    '[[319363214801843]]', '562063_319363214801843_189220957816070_804880_930747445_n.jpg',
    '[[319363221468509]]', '533144_319363221468509_1636334633_n.jpg',
	'[[319363251468506]]', '529857_319363251468506_189220957816070_804883_1710509421_n.jpg',
    '[[319363258135172]]', '576765_319363258135172_1613910481_n.jpg',
    '[[319363271468504]]', '523687_319363271468504_189220957816070_804885_2118367370_n.jpg',
    '[[319363278135170]]', '380218_319363278135170_738683451_n.jpg',
    '[[319363324801832]]', '156543_319363324801832_503918072_n.jpg',
    '[[319363334801831]]', '385752_319363334801831_706928718_n.jpg',
    '[[319363354801829]]', '581435_319363354801829_189220957816070_804891_566999076_n.jpg',
    '[[319363414801823]]', '575249_319363414801823_189220957816070_804896_637602849_n.jpg',
    '[[319363421468489]]', '582795_319363421468489_659153527_n.jpg',
    '[[319363448135153]]', '545037_319363448135153_189220957816070_804899_666575014_n.jpg',
    '[[319363618135136]]', '557749_319363618135136_189220957816070_804912_162165549_n.jpg',
    '[[319363194801845]]', '551934_319363194801845_189220957816070_804879_690938884_n.jpg',
    '[[319363838135114]]', '427851_319363838135114_189220957816070_804929_1876802340_n.jpg',
//v2.2 A-Z

//v2.3 à¸ à¸²à¸žà¹€à¸„à¸¥à¸·à¹ˆà¸­à¸™à¹„à¸«à¸§


//Share
   
	
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
 