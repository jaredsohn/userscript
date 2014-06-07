// ==UserScript==
// @name			Nuevo Chat de Facebook con Emoticones y Memes Por Mario Lara M
// @author			Mario Lara M
// @description			Añade Todos los nuevos emoticonos / Meme / Anime en la barra del Chat de Facebook
// @version           1.0
// @versionnumber		1.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*
// @namespace			http://userscripts.org/scripts/show/129532
// ==/UserScript==

(function(d){

    const DEBUG = true;

    const script_id = 129532,
          script_version = '3.0';

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
                     +       '<a href="/DoctoR.Ossi">'
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
								  url: 'http://userscripts.org/scripts/source/129532.meta.js?' + new Date().getTime(),
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
			if(confirm("Nuevo Chat de Facebook con Emoticones y Memes'.\n Nueva version disponible ¿Deseas actualizar?")) openInTab('http://userscripts.org/scripts/source/129532.user.js');
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
 
//v2.0 
    '[[200263193396380]][[200263203396379]][[200263223396377]][[200263230063043]][[200263243396375]]\n'+
'[[200263253396374]][[200263266729706]][[200263286729704]][[200263300063036]][[200263306729702]]\n'+
'[[200263313396368]][[200263323396367]][[200263340063032]][[200263360063030]][[200263370063029]]\n'+
'[[200263390063027]][[200263413396358]][[200263423396357]][[200263433396356]][[200263456729687]]\n'+
'[[200263473396352]][[200263503396349]][[200263516729681]][[200263530063013]][[200263183396381]]', '318155_378595012164041_311252415564968_1237820_2143075719_n.jpg', 
    '[[200269326729100]][[200269346729098]][[200269363395763]][[200269386729094]][[200269403395759]]\n'+
'[[200269433395756]][[200269450062421]][[200269470062419]][[200269483395751]][[200269500062416]]\n'+
'[[200269516729081]][[200269533395746]][[200269550062411]][[200269563395743]][[200269576729075]]\n'+
'[[200269593395740]][[200269616729071]][[200269630062403]][[200269640062402]][[200269653395734]]\n'+
'[[200269680062398]][[200269690062397]][[200269696729063]][[200269710062395]][[200269306729102]]', '545239_378601765496699_311252415564968_1237828_821134306_n.jpg',
    '[[200274983395201]][[200274996728533]][[200275010061865]][[200275020061864]][[200275030061863]]\n'+
'[[200275046728528]][[200275063395193]][[200275076728525]][[200275093395190]][[200275100061856]]\n'+
'[[200275113395188]][[200275126728520]][[200275136728519]][[200275153395184]][[200275166728516]]\n'+
'[[200275180061848]][[200275193395180]][[200275206728512]][[200275220061844]][[200275230061843]]\n'+
'[[200275240061842]][[200275256728507]][[200275266728506]][[200275280061838]][[200274976728535]]', '524173_378603312163211_311252415564968_1237830_1636254699_n.jpg',
    '[[200347806721252]][[200347816721251]][[200347836721249]][[200347843387915]][[200347853387914]]\n'+
'[[200347863387913]][[200347876721245]][[200347896721243]][[200347906721242]][[200347913387908]]\n'+
'[[200347923387907]][[200347940054572]][[200347963387903]][[200347990054567]][[200348013387898]]\n'+
'[[200348026721230]][[200348040054562]][[200348050054561]][[200348060054560]][[200348083387891]]\n'+
'[[200348103387889]][[200348116721221]][[200348126721220]][[200348140054552]][[200347773387922]]', '532843_378614058828803_311252415564968_1237846_1067431750_n.jpg', 
    '[[200723633350336]][[200723666683666]][[200723696683663]][[200723740016992]][[200723780016988]]\n'+
'[[200723806683652]][[200723830016983]][[200723920016974]][[200723963350303]][[200724050016961]]\n'+
'[[200724106683622]][[200724150016951]][[200724196683613]][[200724276683605]][[200724390016927]]\n'+
'[[200724493350250]][[200724513350248]][[200724546683578]][[200724616683571]][[200724706683562]]\n'+
'[[200724750016891]][[200724790016887]][[200724833350216]][[200724873350212]][[200724946683538]]', '292978_378614068828802_311252415564968_1237847_223123962_n.jpg',
    '[[200834260005940]][[200834280005938]][[200834290005937]][[200834306672602]][[200834323339267]]\n'+
'[[200834340005932]][[200834353339264]][[200834370005929]][[200834383339261]][[200834393339260]]\n'+
'[[200834406672592]][[200834436672589]][[200834443339255]][[200834453339254]][[200834483339251]]\n'+
'[[200834503339249]][[200834513339248]][[200834530005913]][[200834543339245]][[200834553339244]]\n'+
'[[200834570005909]][[200834586672574]][[200834593339240]][[200834600005906]][[200834250005941]]', '375169_378614078828801_311252415564968_1237848_739265641_n.jpg',
    '[[200320113390688]][[200320126724020]][[200320136724019]][[200320150057351]][[200320170057349]]\n'+
'[[200320186724014]][[200320196724013]][[200320216724011]][[200320233390676]][[200320250057341]]\n'+
'[[200320266724006]][[200320280057338]][[200320313390668]][[200320326724000]][[200320343390665]]\n'+
'[[200320356723997]][[200320376723995]][[200320390057327]][[200320403390659]][[200320413390658]]\n'+
'[[200320440057322]][[200320463390653]][[200320476723985]][[200320496723983]][[200320093390690]]', '561913_378614095495466_311252415564968_1237849_1401619943_n.jpg',
    '[[201144386641594]][[201144409974925]][[201144426641590]][[201144453308254]][[201144466641586]]\n'+
'[[201144473308252]][[201144483308251]][[201144496641583]][[201144513308248]][[201144526641580]]\n'+
'[[201144536641579]][[201144553308244]][[201144576641575]][[201144599974906]][[201144609974905]]\n'+
'[[201144629974903]][[201144639974902]][[201144673308232]][[201144686641564]][[201144706641562]]\n'+
'[[201144716641561]][[201144733308226]][[201144753308224]][[201144773308222]][[201144369974929]]', '547781_378614115495464_311252415564968_1237851_1307727747_n.jpg',
    '[[200311006724932]][[200311013391598]][[200311023391597]][[200311033391596]][[200311043391595]]\n'+
'[[200311056724927]][[200311063391593]][[200311083391591]][[200311093391590]][[200311106724922]]\n'+
'[[200311116724921]][[200311140058252]][[200311150058251]][[200311173391582]][[200311190058247]]\n'+
'[[200311200058246]][[200311210058245]][[200311226724910]][[200311236724909]][[200311253391574]]\n'+
'[[200311263391573]][[200311270058239]][[200311283391571]][[200311293391570]][[200310990058267]]', '529117_378614138828795_311252415564968_1237852_551229402_n.jpg',
    '[[200728970016469]][[200728980016468]][[200729010016465]][[200729023349797]][[200729040016462]]\n'+
'[[200729073349792]][[200729083349791]][[200729110016455]][[200729123349787]][[200729133349786]]\n'+
'[[200729143349785]][[200729170016449]][[200729186683114]][[200729206683112]][[200729230016443]]\n'+
'[[200729243349775]][[200729263349773]][[200729293349770]][[200729310016435]][[200729333349766]]\n'+
'[[200729346683098]][[200729380016428]][[200729406683092]][[200729433349756]][[200728946683138]]', '533365_378614155495460_311252415564968_1237853_384996538_n.jpg',
    '[[201772106578822]][[201772126578820]][[201772136578819]][[201772149912151]][[201772159912150]]\n'+
'[[201772183245481]][[201772196578813]][[201772209912145]][[201772229912143]][[201772246578808]]\n'+
'[[201772256578807]][[201772276578805]][[201772283245471]][[201772293245470]][[201772309912135]]\n'+
'[[201772323245467]][[201772336578799]][[201772369912129]][[201772383245461]][[201772409912125]]\n'+
'[[201772423245457]][[201772429912123]][[201772446578788]][[201772463245453]][[201772483245451]]', '521920_378614172162125_311252415564968_1237854_667462632_n.jpg',
    '[[200609570028409]][[200609586695074]][[200609606695072]][[200609623361737]][[200609643361735]]\n'+
'[[200609653361734]][[200609670028399]][[200609680028398]][[200609700028396]][[200609710028395]]\n'+
'[[200609716695061]][[200609753361724]][[200609766695056]][[200609803361719]][[200609820028384]]\n'+
'[[200609846695048]][[200609880028378]][[200609903361709]][[200609923361707]][[200609946695038]]\n'+
'[[200609983361701]][[200609993361700]][[200610033361696]][[200610053361694]][[200609553361744]]', '531189_378614185495457_311252415564968_1237855_1712007582_n.jpg',
    '[[200332460056120]][[200332473389452]][[200332480056118]][[200332493389450]][[200332510056115]]\n'+
'[[200332516722781]][[200332526722780]][[200332550056111]][[200332566722776]][[200332583389441]]\n'+
'[[200332590056107]][[200332603389439]][[200332610056105]][[200332616722771]][[200332626722770]]\n'+
'[[200332633389436]][[200332643389435]][[200332680056098]][[200332713389428]][[200332730056093]]\n'+
'[[200332740056092]][[200332756722757]][[200332770056089]][[200332776722755]][[200332446722788]]', '526652_378614202162122_311252415564968_1237856_1598081629_n.jpg',
    '[[200739853348714]][[200739866682046]][[200739880015378]][[200739906682042]][[200739930015373]]\n'+
'[[200739936682039]][[200739946682038]][[200739956682037]][[200739963348703]][[200739996682033]]\n'+
'[[200740020015364]][[200740043348695]][[200740060015360]][[200740073348692]][[200740090015357]]\n'+
'[[200740123348687]][[200740130015353]][[200740143348685]][[200740170015349]][[200740176682015]]\n'+
'[[200740190015347]][[200740206682012]][[200740220015344]][[200740240015342]][[200739836682049]]', '556058_378614222162120_311252415564968_1237857_1573610991_n.jpg',
    '[[200299000059466]][[200299013392798]][[200299043392795]][[200299053392794]][[200299066726126]]\n'+
'[[200299076726125]][[200299103392789]][[200299126726120]][[200299136726119]][[200299150059451]]\n'+
'[[200299176726115]][[200299193392780]][[200299203392779]][[200299220059444]][[200299233392776]]\n'+
'[[200299256726107]][[200299276726105]][[200299300059436]][[200299333392766]][[200299346726098]]\n'+
'[[200299360059430]][[200299383392761]][[200299390059427]][[200299403392759]][[200298986726134]]', '555221_378614235495452_311252415564968_1237858_898543997_n.jpg',
    '[[200601093362590]][[200601100029256]][[200601113362588]][[200601130029253]][[200601140029252]]\n'+
'[[200601160029250]][[200601180029248]][[200601200029246]][[200601213362578]][[200601226695910]]\n'+
'[[200601236695909]][[200601250029241]][[200601270029239]][[200601290029237]][[200601300029236]]\n'+
'[[200601323362567]][[200601333362566]][[200601356695897]][[200601366695896]][[200601383362561]]\n'+
'[[200601406695892]][[200601420029224]][[200601436695889]][[200601450029221]][[200601070029259]]', '538896_378614252162117_311252415564968_1237859_1781814813_n.jpg',
//    '[[Otaku.no.Saigo.Clan]]', '',

//v2.1
    '[[200756283347071]][[200756293347070]][[200756320013734]][[200756340013732]][[200756356680397]]\n'+
'[[200756370013729]][[200756386680394]][[200756400013726]][[200756416680391]][[200756433347056]]\n'+
'[[200756453347054]][[200756470013719]][[200756486680384]][[200756503347049]][[200756526680380]]\n'+
'[[200756546680378]][[200756556680377]][[200756570013709]][[200756576680375]][[200756596680373]]\n'+
'[[200756606680372]][[200756606680372]][[200756630013703]][[200756643347035]][[200756270013739]]', '292129_378614262162116_311252415564968_1237860_1860814518_n.jpg',
    '[[200747953347904]][[200747993347900]][[200748000014566]][[200748006681232]][[200748013347898]]\n'+
'[[200748026681230]][[200748040014562]][[200748056681227]][[200748080014558]][[200748110014555]]\n'+
'[[200748130014553]][[200748146681218]][[200748156681217]][[200748173347882]][[200748193347880]]\n'+
'[[200748216681211]][[200748240014542]][[200748250014541]][[200748260014540]][[200748273347872]]\n'+
'[[200748283347871]][[200748303347869]][[200748310014535]][[200748323347867]][[200747933347906]]', '541057_378614285495447_311252415564968_1237861_1303965804_n.jpg',
    '[[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]]\n'+
'[[344902288866647]][[344902288866647]][[344902308866645]][[344902322199977]][[344902338866642]][[344902362199973]][[344902382199971]]\n'+
'[[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]]\n'+
'[[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]][[344902288866647]]', '419519_344902308866645_311252415564968_1145046_574558526_n.jpg',
    '[[379138478776361]][[379138488776360]][[379138498776359]][[379138512109691]][[379138542109688]]\n'+
'[[379138562109686]][[379138572109685]][[379138605443015]][[379138625443013]][[379138652109677]]\n'+
'[[379138675443008]][[379138695443006]][[379138715443004]][[379138745443001]][[379138758776333]]\n'+
'[[379138775442998]][[379138798776329]][[379138805442995]][[379138812109661]][[379138822109660]]', '533267_379149475441928_311252415564968_1240149_1992508307_n.jpg',
    '[[396802510344325]][[396802520344324]][[396802513677658]][[396802517010991]][[396802523677657]][[396802650344311]][[396802653677644]][[396802663677643]]\n'+
'[[396802657010977]][[396802660344310]][[396802753677634]][[396802750344301]][[396802743677635]][[396802747010968]][[396802740344302]][[396802837010959]]\n'+
'[[396802840344292]][[396802833677626]][[396802843677625]][[396802847010958]][[396802920344284]][[396802933677616]][[396802923677617]][[396802927010950]]\n'+
'[[396802930344283]][[396802997010943]][[396803003677609]][[396803000344276]][[396802993677610]][[396803007010942]][[396803087010934]][[396803090344267]]', '541654_379828402040702_311252415564968_1242669_497717667_n.jpg',
    '[[379811608709048]][[379811625375713]][[379811648709044]][[379811682042374]]\n'+
'[[379811702042372]][[379811715375704]][[379811742042368]][[379811768709032]]\n'+
'[[379811792042363]][[379811815375694]][[379811838709025]][[379811875375688]]\n'+
'[[379811892042353]][[379811922042350]][[379811945375681]][[379811962042346]]', '526748_379821322041410_311252415564968_1242645_1578703856_n.jpg',
'[[293997730635447]][[293997767302110]][[293997777302109]][[293997787302108]][[293997790635441]]\n'+
'[[293997800635440]][[293997810635439]][[293997820635438]][[293997837302103]][[293997863968767]]\n'+
'[[293997870635433]][[293997897302097]][[293997913968762]][[293997943968759]][[293997960635424]]\n'+
'[[293997973968756]][[293998003968753]][[293998027302084]][[293998043968749]][[293998113968742]]\n'+
'[[293998137302073]][[293998150635405]][[293998163968737]][[293998197302067]][[293998213968732]]', '373585_173000882800830_647242581_n.jpg',

    '[[200723633350336]][[200723666683666]][[200723696683663]][[200723740016992]]  [[200723780016988]]\n'+
'[[200723806683652]][[200723830016983]][[200723920016974]]  [[200723963350303]][[200724050016961]]\n'+
'[[200724106683622]][[200724150016951]]  [[200724196683613]][[200724276683605]][[200724390016927]]\n'+
'[[200724493350250]]  [[200724513350248]][[200724546683578]][[200724616683571]][[200724706683562]]\n'+
'  [[200724750016891]][[200724790016887]][[200724833350216]][[200724873350212]][[200724946683538]]', '563180_383511325005743_311252415564968_1255441_98148590_n.jpg',
    '[[455799847776890]][[455799847776890]][[455799847776890]][[455799847776890]][[455799861110222]][[455799847776890]]\n'+
'[[455799847776890]][[455799847776890]][[455799847776890]][[455799847776890]][[455799874443554]][[455799847776890]]\n'+
'[[455799847776890]][[455799884443553]][[455799891110219]][[455799911110217]][[455799917776883]][[455799847776890]]\n'+
'[[455799847776890]][[455799931110215]][[455799944443547]][[455799951110213]][[455799961110212]][[455799847776890]]\n'+
'[[455799847776890]][[455799971110211]][[455799977776877]][[455799984443543]][[455799994443542]][[455799847776890]]\n'+
'[[455799847776890]][[455799847776890]][[455799847776890]][[455799847776890]][[455799847776890]][[455799847776890]]', '388033_455794877777387_216197131_n.jpg',
//    '[[126220920723194]]', '',
//    '[[126125527399400]]', '',
//    '[[126236287388324]]', '',
//    '[[252346194801306]]', '',
//    '[[266313623412267]]', '',
//    '[[191560730921873]]', '',
//    '[[182809565135565]]', '',
//    '[[242070735843795]]', '',
//    '[[258958334142268]]', '',
//v2.2 A-Z
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
    '[[379853848704824]]', '535850_379853848704824_311252415564968_1242918_915618392_n.jpg',
    '[[379853978704811]]', '523162_379853978704811_311252415564968_1242920_2082515870_n.jpg',
    '[[379854058704803]]', '562081_379854058704803_311252415564968_1242923_180098095_n.jpg',
    '[[136342506479536]]', '373241_136342506479536_831783111_q.jpg',
    '[[224173507657194]]', '372917_224173507657194_1836514892_q.jpg',
    '[[379849868705222]]', '319737_379849868705222_311252415564968_1242888_1310307412_n.jpg',

//v2.3 à¸ à¸²à¸žà¹€à¸„à¸¥à¸·à¹ˆà¸­à¸™à¹„à¸«à¸§
    
//    '[[334230636605501]][[335080033169115]][[314686231886107]]\n'+
//'[[179637912133385]][[345951442087087]][[208631755887293]]\n'+
//'[[297872013591588]][[317089564978607]][[341555305870236]]', '372806_162551737180830_715174335_n.jpg',


//Share
//    'Finds More Tips For Facebook [[110566632320002]] [[126213110723975]] [[126540207361797]] [[126132024065417]] [[110780922298250]] [[126216480723638]] [[126278187384134]] [[127878643893717]] [[kayzhen2]] Visits The User Profile http://www.facebook.com/kayzhen2 or Check His Blog directly to Get More Tips http://www.vertal-xp.blogspot.com/', '187838_209715015781243_281074045_n.jpg',
    ];

//'[[204321616325705]][[204321639659036]][[204321652992368]][[204321669659033]][[204321682992365]][[204321689659031]]\n'+
//'[[204321709659029]][[204321716325695]][[204321722992361]][[204321729659027]][[204321739659026]][[204321746325692]]\n'+
//'[[204321759659024]][[204321769659023]][[204321786325688]][[204321792992354]][[204321799659020]][[204321812992352]]\n'+
//'[[204321829659017]][[204321849659015]][[204321849659015]][[204321876325679]][[204321882992345]][[204321889659011]]\n'+
//'[[204321896325677]][[204321906325676]][[204321916325675]][[204321929659007]][[204321939659006]][[204321949659005]]\n'+
//'[[204321959659004]][[204321979659002]][[204321996325667]][[204322009658999]][[204322026325664]][[204322036325663]]'


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
        chatNewEntryWidth = chatNewWidth - (5 + 5 + 5);
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

//  chat enorme 280 x 600

	
// CSS to increase chat box size


addStyle( '.fbDockChatTabFlyout {width:260px!important;height:333px!important;} ');
addStyle( 'div.conversationContainer { height:600px!important;} ');
addGlobalStyle(".emote_custom { height: 16px !important; width: 16px !important; } ");
addGlobalStyle("tbody { vertical-align: bottom; }");


// Function to add style


function addStyle(css) {

	if (typeof GM_addStyle !== 'undefined') { 
		return GM_addStyle(css); 
		}

	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
		}
}
