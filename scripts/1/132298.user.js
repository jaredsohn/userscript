// ==UserScript==
// @name			Facebook Meme Chat Emoticons Bar
// @description	                Adds meme emoticon bar to Facebook chat
// @description	        Visit kaosgaul.in.
// @description	        Report bugs at kontak@kaosgaul.in
// @description	        Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			spistek
// @version			1
// @versionnumber	1
// @namespace		http://userscripts.org/scripts/show/129125
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
	

	
	var mean = '[[241015455995828]][[241015459329161]][[241015465995827]][[241015452662495]][[241015462662494]]\n'+
'[[241015572662483]][[241015585995815]][[241015579329149]][[241015582662482]][[241015575995816]]\n'+
'[[241015652662475]][[241015659329141]][[241015669329140]][[241015662662474]][[241015655995808]]\n'+
'[[241015749329132]][[241015755995798]][[241015745995799]][[241015742662466]][[241015752662465]]\n'+
'[[241015959329111]][[241015989329108]][[241015965995777]][[241015962662444]][[241015985995775]]'
   var hitler = '[[364099893634444]][[364099910301109]][[364099926967774]][[364099933634440]][[364099953634438]]\n'+
'[[364099966967770]][[364099980301102]][[364099993634434]][[364100006967766]][[364100013634432]]\n'+
'[[364100023634431]][[364100033634430]][[364100050301095]][[364100070301093]][[364100086967758]]\n'+
'[[364100093634424]][[364100110301089]][[364100126967754]][[364100140301086]][[364100200301080]]\n'+
'[[364100213634412]][[364100223634411]][[364100230301077]][[364100243634409]][[364100250301075]]\n'+
'[[364100260301074]][[364100266967740]][[364100276967739]][[364100286967738]][[364100300301070]]'
  var hardcore = '[[259970010762373]][[259970014095706]][[259970017429039]][[259970024095705]][[259970020762372]][[259970154095692]][[259970167429024]]\n'+
'[[259970157429025]][[259970160762358]][[259970170762357]][[259970234095684]][[259970237429017]][[259970244095683]][[259970240762350]]\n'+
'[[259970247429016]][[259970310762343]][[259970317429009]][[259970324095675]][[259970320762342]][[259970327429008]][[259970424095665]]\n'+
'[[259970417428999]][[259970420762332]][[259970430762331]][[259970427428998]][[259970487428992]][[259970500762324]][[259970494095658]]\n'+
'[[259970490762325]][[259970497428991]][[259970574095650]][[259970577428983]][[259970584095649]][[259970587428982]][[259970580762316]]'
  var worthit = '[[239245462840234]][[239245459506901]][[239245466173567]][[239245469506900]]\n'+
'[[239245456173568]][[239245589506888]][[239245582840222]][[239245576173556]]\n'+
'[[239245586173555]][[239245579506889]][[239245659506881]][[239245666173547]]\n'+
'[[239245662840214]][[239245652840215]][[239245669506880]][[239245749506872]]\n'+
'[[239245746173539]][[239245736173540]][[239245742840206]][[239245739506873]]\n'+
'[[239245852840195]][[239245849506862]][[239245846173529]][[239245842840196]]'
  var bitchplease = '[[393242404033669]][[393242400700336]][[393242414033668]][[393242410700335]]\n'+
'[[393242407367002]][[393242547366988]][[393242560700320]][[393242557366987]]\n'+
'[[393242550700321]][[393242544033655]][[393242670700309]][[393242677366975]]\n'+
'[[393242680700308]][[393242684033641]][[393242674033642]][[393242864033623]]\n'+
'[[393242857366957]][[393242850700291]][[393242854033624]][[393242847366958]]'
  var potato = '[[355161337863812]][[355161344530478]][[355161341197145]][[355161334530479]][[355161347863811]][[355161451197134]][[355161454530467]]\n'+
'[[355161457863800]][[355161467863799]][[355161471197132]][[355161541197125]][[355161537863792]][[355161547863791]][[355161544530458]]\n'+
'[[355161551197124]][[355161637863782]][[355161634530449]][[355161641197115]][[355161624530450]][[355161627863783]][[355161741197105]]\n'+
'[[355161751197104]][[355161747863771]][[355161744530438]][[355161754530437]][[355161824530430]][[355161817863764]][[355161831197096]]\n'+
'[[355161827863763]][[355161821197097]][[355161911197088]][[355161921197087]][[355161924530420]][[355161914530421]][[355161927863753]]'
 var stopyou = '[[390771627613200]][[390771630946533]][[390771637613199]][[390771624279867]][[390771634279866]][[390771734279856]]\n'+
'[[390771737613189]][[390771747613188]][[390771744279855]][[390771740946522]][[390771807613182]][[390771824279847]]\n'+
'[[390771814279848]][[390771817613181]][[390771820946514]][[390771910946505]][[390771900946506]][[390771914279838]]\n'+
'[[390771904279839]][[390771907613172]][[390771997613163]][[390772004279829]][[390772010946495]][[390772007613162]]\n'+
'[[390772000946496]][[390772064279823]][[390772067613156]][[390772074279822]][[390772077613155]][[390772070946489]]'
 var notbad = '[[239289962835784]][[239289956169118]][[239289949502452]][[239289959502451]][[239289952835785]]\n'+
'[[239290072835773]][[239290066169107]][[239290076169106]][[239290079502439]][[239290069502440]]\n'+
'[[239290159502431]][[239290162835764]][[239290152835765]][[239290156169098]][[239290149502432]]\n'+
'[[239290249502422]][[239290252835755]][[239290236169090]][[239290239502423]][[239290246169089]]\n'+
'[[239290352835745]][[239290359502411]][[239290356169078]][[239290362835744]][[239290366169077]]'
 var badluck = '[[330214790365071]][[330214793698404]][[330214800365070]][[330214797031737]][[330214803698403]]\n'+
'[[330214907031726]][[330214910365059]][[330214903698393]][[330214900365060]][[330214897031727]]\n'+
'[[330214967031720]][[330214973698386]][[330214970365053]][[330214980365052]][[330214983698385]]\n'+
'[[330215063698377]][[330215060365044]][[330215057031711]][[330215053698378]][[330215067031710]]\n'+
'[[330215167031700]][[330215180365032]][[330215177031699]][[330215173698366]][[330215170365033]]\n'+
'[[330215250365025]][[330215243698359]][[330215253698358]][[330215247031692]][[330215257031691]]'
 var okay = '[[296238963769967]][[296238960436634]][[296238953769968]][[296238950436635]][[296238957103301]]\n'+
'[[296239070436623]][[296239077103289]][[296239073769956]][[296239080436622]][[296239083769955]]\n'+
'[[296239160436614]][[296239163769947]][[296239170436613]][[296239173769946]][[296239167103280]]\n'+
'[[296239240436606]][[296239243769939]][[296239237103273]][[296239247103272]][[296239250436605]]\n'+
'[[296239363769927]][[296239377103259]][[296239367103260]][[296239373769926]][[296239370436593]]\n'+
'[[296239473769916]][[296239463769917]][[296239460436584]][[296239467103250]][[296239470436583]]'
 var ultragay = '[[390815444275485]][[390815460942150]][[390815454275484]][[390815457608817]][[390815450942151]][[390815634275466]]\n'+
'[[390815637608799]][[390815644275465]][[390815640942132]][[390815647608798]][[390815800942116]][[390815810942115]]\n'+
'[[390815797608783]][[390815807608782]][[390815804275449]][[390815940942102]][[390815944275435]][[390815947608768]]\n'+
'[[390815954275434]][[390815950942101]][[390816090942087]][[390816080942088]][[390816094275420]][[390816084275421]]\n'+
'[[390816087608754]][[390816184275411]][[390816177608745]][[390816167608746]][[390816174275412]][[390816170942079]]\n'+
'[[390816267608736]][[390816270942069]][[390816277608735]][[390816274275402]][[390816284275401]][[390816384275391]]'
var trollface = '[[241123912651649]][[241123915984982]][[241123909318316]][[241123905984983]][[241123902651650]][[241124025984971]]\n'+
'[[241124022651638]][[241124032651637]][[241124029318304]][[241124019318305]][[241124192651621]][[241124199318287]]\n'+
'[[241124189318288]][[241124205984953]][[241124195984954]][[241124325984941]][[241124319318275]][[241124329318274]]\n'+
'[[241124335984940]][[241124345984939]][[241124559318251]][[241124572651583]][[241124565984917]][[241124562651584]]\n'+
'[[241124569318250]][[241124725984901]][[241124712651569]][[241124722651568]][[241124715984902]][[241124719318235]]\n'+
'[[241124785984895]][[241124789318228]][[241124792651561]][[241124795984894]][[241124799318227]][[241124942651546]]'
var pukingrainbows = '[[393321164025793]][[393321150692461]][[393321154025794]][[393321157359127]][[393321160692460]][[393321270692449]]\n'+
'[[393321264025783]][[393321267359116]][[393321274025782]][[393321277359115]][[393321380692438]][[393321384025771]]\n'+
'[[393321374025772]][[393321387359104]][[393321377359105]][[393321460692430]][[393321474025762]][[393321467359096]]\n'+
'[[393321464025763]][[393321470692429]][[393321577359085]][[393321584025751]][[393321587359084]][[393321574025752]]\n'+
'[[393321580692418]][[393321670692409]][[393321667359076]][[393321674025742]][[393321660692410]][[393321664025743]]'
var didthere = '[[290918420968688]][[290918017635395]][[290918024302061]][[290918027635394]][[290918030968727]][[290918117635385]][[290918124302051]]\n'+
'[[290918127635384]][[290918137635383]][[290918140968716]][[290918204302043]][[290918207635376]][[290918210968709]][[290918214302042]]\n'+
'[[290918217635375]][[290918300968700]][[290918294302034]][[290918287635368]][[290918290968701]][[290918297635367]][[290918424302021]]\n'+
'[[290918420968688]][[290918427635354]][[290918430968687]][[290918417635355]][[290918484302015]][[290918487635348]][[290918490968681]]\n'+
'[[290918494302014]][[290918497635347]][[290918600968670]][[290918597635337]][[290918587635338]][[290918594302004]][[290918590968671]]'
var motherofgod = '[[241155412648499]][[241155415981832]][[241155409315166]][[241155419315165]][[241155422648498]][[241155535981820]][[241155542648486]]\n' +
'[[241155545981819]][[241155549315152]][[241155539315153]][[241155619315145]][[241155629315144]][[241155625981811]][[241155632648477]]\n' +
'[[241155622648478]][[241155729315134]][[241155732648467]][[241155722648468]][[241155719315135]][[241155725981801]][[241155835981790]]\n' +
'[[241155839315123]][[241155825981791]][[241155829315124]][[241155832648457]][[241155922648448]][[241155909315116]][[241155905981783]]\n' +
'[[241155912648449]][[241155915981782]][[241155995981774]][[241155992648441]][[241156002648440]][[241156005981773]][[241155999315107]]'
var fuuu = '[[202651026498938]][[202651039832270]][[202651036498937]][[202651029832271]][[202651043165603]][[202651156498925]][[202651159832258]]\n' +
'[[202651166498924]][[202651163165591]][[202651153165592]][[202651223165585]][[202651236498917]][[202651233165584]][[202651226498918]]\n' +
'[[202651229832251]][[202651306498910]][[202651313165576]][[202651309832243]][[202651316498909]][[202651326498908]][[202651443165563]]\n' +
'[[202651449832229]][[202651436498897]][[202651446498896]][[202651439832230]][[202651496498891]][[202651493165558]][[202651499832224]]\n' +
'[[202651506498890]][[202651503165557]][[202651579832216]][[202651583165549]][[202651576498883]][[202651586498882]][[202651589832215]]'
var download = 'download from http://userscripts.org/scripts/show/129125 '
 	spemotsInfo = [mean, 'http://graph.facebook.com/364837310227369/picture', hitler, 'http://graph.facebook.com/364837346894032/picture', hardcore, 'http://graph.facebook.com/364838190227281/picture', worthit, 'http://graph.facebook.com/364842106893556/picture', bitchplease, 'http://graph.facebook.com/364837326894034/picture', potato, 'http://graph.facebook.com/364841996893567/picture', stopyou, 'http://graph.facebook.com/364838220227278/picture', notbad, 'http://graph.facebook.com/364838216893945/picture', badluck, 'http://graph.facebook.com/364837320227368/picture', okay, 'http://graph.facebook.com/364838226893944/picture', ultragay, 'http://graph.facebook.com/364842060226894/picture', trollface, 'http://graph.facebook.com/364842046893562/picture', pukingrainbows, 'http://graph.facebook.com/364842030226897/picture', didthere, 'http://graph.facebook.com/365368090174291/picture', motherofgod, 'http://graph.facebook.com/364838210227279/picture', fuuu, 'http://graph.facebook.com/365348903509543/picture', download, 'http://graph.facebook.com/365379453506488/picture'];
    spemotsTitle = ['mean', ' ', 'hitler', ' ','hardcore', ' ','worthit', ' ', 'bitchplease', ' ','potato', ' ','stopyou', ' ','notbad', ' ','badluck', ' ','okay', ' ','ultragay', ' ','trollface',' ','pukingrainbows',' ','didthere',' ','motherofgod',' ','fuuu', ' ','download'];
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
shortcut.add('Ctrl+1',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = mean; });
shortcut.add('Ctrl+2',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = hitler; });
shortcut.add('Ctrl+3',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = hardcore; });
shortcut.add('Ctrl+4',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = worthit; });
shortcut.add('Ctrl+5',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = bitchplease; });
shortcut.add('Ctrl+6',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = trues; });
shortcut.add('Ctrl+7',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = potato; });
shortcut.add('Ctrl+8',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = stopyou; });
shortcut.add('Ctrl+9',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = notbad; });
shortcut.add('Ctrl+0',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = badluck; });

