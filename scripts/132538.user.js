// ==UserScript==
// @name			DELIJE cHAT BOX
// @description	                SLIKE
// @description	        DELIJA
// @description	        Za
// @description	        Chat 
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Tech
// @version			2
// @versionnumber	2
// @namespace		
// ==/UserScript==
//


	var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 2;
	


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
	

	
	
GRB ZVEZDE = '[[416542128369894]][[416542125036561]][[416542121703228]][[416542118369895]]\n' +
'[[416542131703227]][[416542248369882]][[416542255036548]][[416542258369881]]\n' +
'[[416542245036549]][[416542261703214]][[416542338369873]][[416542335036540]]\n' +
'[[416542341703206]][[416542348369872]][[416542345036539]][[416542471703193]]\n' +
'[[416542465036527]][[416542468369860]][[416542461703194]][[416542458369861]]\n' +
'[[416542575036516]][[416542568369850]][[416542561703184]][[416542565036517]]'

DIMOVI = '[[443963028963309]][[443963018963310]][[443963022296643]][[443963025629976]][[443963032296642]][[443963162296629]]\n' +
'[[443963158963296]][[443963165629962]][[443963168963295]][[443963175629961]][[443963275629951]][[443963272296618]]\n' +
'[[443963288963283]][[443963278963284]][[443963292296616]][[443963388963273]][[443963382296607]][[443963385629940]]\n' +
'[[443963392296606]][[443963378963274]][[443963492296596]][[443963495629929]][[443963498963262]][[443963485629930]]\n' +
'[[443963488963263]][[443963592296586]][[443963602296585]][[443963598963252]][[443963588963253]][[443963595629919]]'
PONOS GRADA = '[[209344965849961]][[209344982516626]][[209344979183293]][[209344975849960]][[209344972516627]][[209345095849948]]\n' +
'[[209345099183281]][[209345085849949]][[209345089183282]][[209345092516615]][[209345189183272]][[209345192516605]]\n' +
'[[209345182516606]][[209345195849938]][[209345185849939]][[209345299183261]][[209345289183262]][[209345292516595]]\n' +
'[[209345302516594]][[209345295849928]][[209345429183248]][[209345425849915]][[209345422516582]][[209345419183249]]\n' +
'[[209345432516581]][[209345545849903]][[209345539183237]][[209345542516570]][[209345532516571]][[209345535849904]]'
UROS = [[400895339941080]][[400895326607748]][[400895333274414]][[400895336607747]][[400895329941081]][[400895473274400]]\n' +
'[[400895463274401]][[400895469941067]][[400895466607734]][[400895476607733]][[400895566607724]][[400895573274390]]\n' +
'[[400895563274391]][[400895569941057]][[400895559941058]][[400895643274383]][[400895653274382]][[400895649941049]]\n' +
'[[400895656607715]][[400895646607716]][[400895786607702]][[400895779941036]][[400895789941035]][[400895783274369]]\n' +
'[[400895793274368]][[400895876607693]][[400895886607692]][[400895873274360]][[400895879941026]][[400895883274359]]'
DUPLA KRUNA = '[[281441738616589]][[281441751949921]][[281441755283254]][[281441741949922]][[281441748616588]][[281441845283245]]\n' +
'[[281441848616578]][[281441858616577]][[281441855283244]][[281441851949911]][[281441915283238]][[281441921949904]]\n' +
'[[281441918616571]][[281441928616570]][[281441925283237]][[281442001949896]][[281442011949895]][[281442015283228]]\n' +
'[[281442008616562]][[281442005283229]][[281442121949884]][[281442115283218]][[281442108616552]][[281442118616551]]\n' +
'[[281442111949885]][[281442211949875]][[281442208616542]][[281442221949874]][[281442215283208]][[281442218616541]]'
NAVIJACI = '[[306237802785417]][[306237796118751]][[306237789452085]][[306237786118752]][[306237792785418]][[306237926118738]]\n' +                                     
'[[306237919452072]][[306237922785405]][[306237916118739]][[306237912785406]][[306237992785398]][[306237996118731]]\n' +
'[[306238006118730]][[306238002785397]][[306237999452064]][[306238096118721]][[306238102785387]][[306238099452054]]\n' +
'[[306238109452053]][[306238106118720]][[306238219452042]][[306238229452041]][[306238232785374]][[306238222785375]]\n' +
'[[306238226118708]][[306238299452034]][[306238306118700]][[306238302785367]][[306238309452033]][[306238312785366]]'
LJUBAV = '[[352674011459795]][[352674008126462]][[352674004793129]][[352673998126463]][[352674001459796]]\n' +
'[[352674134793116]][[352674138126449]][[352674131459783]][[352674124793117]][[352674128126450]]\n' +
'[[352674221459774]][[352674228126440]][[352674214793108]][[352674231459773]][[352674218126441]]\n' +
'[[352674308126432]][[352674318126431]][[352674311459765]][[352674304793099]][[352674314793098]]\n' +
'[[352674444793085]][[352674454793084]][[352674448126418]][[352674441459752]][[352674451459751]]'
DELIJE = '[[294658237282776]][[294658247282775]][[294658243949442]][[294658240616109]][[294658250616108]][[294658420616091]]\n' +
'[[294658417282758]][[294658427282757]][[294658423949424]][[294658413949425]][[294658553949411]][[294658543949412]]\n' +
'[[294658537282746]][[294658533949413]][[294658540616079]][[294658683949398]][[294658680616065]][[294658673949399]]\n' +
'[[294658687282731]][[294658677282732]][[294658767282723]][[294658773949389]][[294658777282722]][[294658770616056]]\n' +
'[[294658763949390]][[294658847282715]][[294658863949380]][[294658853949381]][[294658857282714]][[294658860616047]]'
GRB = '[[400887109941903]][[400887119941902]][[400887116608569]][[400887113275236]]\n' +
'[[400887123275235]][[400887226608558]][[400887223275225]][[400887229941891]]\n' +
'[[400887233275224]][[400887236608557]][[400887339941880]][[400887343275213]]\n' +
'[[400887329941881]][[400887336608547]][[400887333275214]][[400887536608527]]\n' +
'[[400887533275194]][[400887529941861]][[400887539941860]][[400887543275193]]\n' +
'[[400887893275158]][[400887883275159]][[400887889941825]][[400887886608492]]'
PSIHO = '[[260270304070343]][[260270294070344]][[260270307403676]][[260270300737010]][[260270297403677]][[260270437403663]]\n' +
'[[260270424070331]][[260270427403664]][[260270434070330]][[260270430736997]][[260270504070323]][[260270507403656]]\n' +
'[[260270517403655]][[260270514070322]][[260270510736989]][[260270587403648]][[260270580736982]][[260270584070315]]\n' +
'[[260270590736981]][[260270594070314]][[260270697403637]][[260270694070304]][[260270690736971]][[260270687403638]]\n' +
'[[260270684070305]][[260270767403630]][[260270764070297]][[260270777403629]][[260270770736963]][[260270774070296]]'

 var v2 = 'This is the second version of meme facebook extension for firefox and chrome. Stay tuned, i will update script by adding new memes and fixing some bugs.\n'+
 'you can find all memes here turbolego.com/L.txt, i also added hotkeys for memes, ctrl+number of meme, please report bugs at theztech@connect.to\n'+
'Download newest version here http://userscripts.org/scripts/show/122827'
	spemotsInfo = [umad, 'http://www.rev6.com/forum/images/smilies/trollface.gif', megusta, 'http://butteredtoast.org/F7U12Addon/images/megusta.png', jack, 'http://i0.kym-cdn.com/photos/images/list/000/185/168/misc-jackie-chan-l.png', accept, 'http://www4.slikomat.com/11/0110/r5w-accept.png', poker, 'http://i3.kym-cdn.com/entries/icons/tiny/000/003/193/1279052383758.jpg', trues, 'http://www4.slikomat.com/11/0110/yin-true.png', alone, 'http://i3.kym-cdn.com/entries/icons/tiny/000/003/619/Untitled-1.jpg', mog, 'http://www4.slikomat.com/11/0110/39v-mog.png', all, 'http://www4.slikomat.com/11/0110/n1u-all.png', fap, 'http://i0.kym-cdn.com/entries/icons/tiny/000/005/939/Fap%20Guy%20Meme.png',  yuno, 'http://cache.ohinternet.com/images/squares/Y-u-no-exploitable.png/25_25_Y-u-no-exploitable.png', gtfo, 'http://img818.imageshack.us/img818/2967/752050ba7b28435ebae43df.png', yao , 'http://t1.gstatic.com/images?q=tbn:ANd9GcQwUdKzke2i1LBj_IYWYujKpDKzQRJWzye8lQAptGDgrbrmXPtozb7JpIw', okay , 'http://cache.ohinternet.com/images/squares/Okay_guy.jpg/25_25_Okay_guy.jpg', no , 'http://img205.imageshack.us/img205/8443/81cebb2014cb46efb1b9869.png', dbumtss,'http://img696.imageshack.us/img696/3426/cae1296481aa4430889bd77.png',ilied,'http://img688.imageshack.us/img688/6753/350b6af2bb314911b6deeb8.png', lolface,'http://butteredtoast.org/F7U12Addon/images/lol.png',fuckyou,'http://img189.imageshack.us/img189/5334/8dee47fbba564d468d70b02.png',kiddinme,'http://img26.imageshack.us/img26/6636/074e086bf37e41368316977.png', cguy, 'http://img337.imageshack.us/img337/310/892d3e552a094e5eadf8454.png', why, 'http://img829.imageshack.us/img829/9242/06a74046af3b4611a6dd26f.png', nbad, 'http://img404.imageshack.us/img404/9899/48a6944aeb2247f282862d9.png', ayeah, 'http://img845.imageshack.us/img845/3280/57d8ea2aef40409484e820c.png', fuu, 'http://www.itsmods.com/forum/images/smilies/fuu.png', fucky, 'http://lh4.ggpht.com/_EdWrfJxxD_I/TJsgE-uVppI/AAAAAAAAEsY/Bl7LRZlXgCc/fuckyea.png', hardcore, 'http://img525.imageshack.us/img525/930/7b3671b83915492cb04e167.png', wtf, 'http://img862.imageshack.us/img862/4417/8a942223273b4ad797eef1f.png', pcguy, 'http://img210.imageshack.us/img210/4239/666e1ba2bb1b46e0904c528.png', cute, 'http://img80.imageshack.us/img80/3964/a08f11e050f34458a9f2f67.png', youdontsay, 'http://img197.imageshack.us/img197/1096/4cb92a5e68c74d03ab5d6d6.png', notsure, 'http://img269.imageshack.us/img269/802/f7b731e60f2e495ea1f5c1c.png', trolldad, 'http://img840.imageshack.us/img840/3401/6e8d74a62af34a78bcc3ae2.png', v2, 'http://www4.slikomat.com/11/0113/jo8-Untitl.png'];                                                                            
    spemotsTitle = ['YouMad', ' ', 'MeGusta', ' ','Jackie Chan', ' ','Challenge Accepted', ' ', 'Poker Face', ' ','True Story', ' ','Forever Alone', ' ','Mother of God', ' ','X all the Y', ' ','Fap', ' ','Y U NO', ' ','GTFO',' ','Bitch Please',' ','Okay',' ','No',' ','Ba Dum Tsss',' ','I Lied',' ','LOL',' ','Fuck You',' ','Are you kidding me', ' ', 'Careal Guy', ' ', 'Whyyyy', ' ', 'Obama not bad', ' ', 'awwww yeaahhh', ' ', 'fuuuuuuu', ' ', 'Fuckyeah', ' ', 'so hardcore', ' ', 'That scared guy', ' ', 'Computer guy wtf', ' ', 'rainbow guy', ' ', 'you don\'t say', ' ', 'not sure if', ' ', 'trolldad', ' ', 'v2'];
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}' +
			'.chat_arrow { background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');

	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('title',spemotsTitle[i]);
		fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
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
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
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
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
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


shortcut = {
	'all_shortcuts':{},
	'add': function(shortcut_combination,callback,opt) {
	
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();


		var func = function(e) {
			e = e || window.event;
			
	
			
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; 

			var keys = shortcut_combination.split("+");
		
			var kp = 0;
			
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
		
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { 
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else {
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { 
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { 
					e.cancelBubble = true;
					e.returnValue = false;
	
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
	 
}
shortcut.add('Ctrl+1',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = umad; });
shortcut.add('Ctrl+2',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = megusta; });
shortcut.add('Ctrl+3',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = jack; });
shortcut.add('Ctrl+4',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = accept; });
shortcut.add('Ctrl+5',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = poker; });
shortcut.add('Ctrl+6',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = trues; });
shortcut.add('Ctrl+7',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = alone; });
shortcut.add('Ctrl+8',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = mog; });
shortcut.add('Ctrl+9',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = all; });
shortcut.add('Ctrl+0',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = fap; });