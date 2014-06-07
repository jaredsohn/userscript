// ==UserScript==
// @name			(っ◕‿◕)っ Grinbook (っ◕‿◕)っ - Classic Edition
// @description			Emoticones de Taringa! en el chat de facebook más algunos memes. Hecho por @starg09 con ayuda de @fabricio3g.
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			starg09
// @version			2.1
// @versionnumber		2.1
// @license			Attribution-NonCommercial-NoDerivs 3.0 Unported (CC BY-NC-ND 3.0); http://creativecommons.org/licenses/by-nc-nd/3.0/
// @namespace			http://www.taringa.net/starg09
// ==/UserScript==
//

// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 (Y) :putnam: 8| ^_^ (^^^) O:) <(") :42: 

	var version, HttpsOn, ImagesURL, TarimgURL, ResourcesURL, storage, emotsInfo, spemotsInfo, taremotsInfo, taremots2Info, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 1.0;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	TarimgURL = HttpsOn?'https://fbcdn-sphotos-a.akamaihd.net/':'http://fbcdn-sphotos-a.akamaihd.net/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

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
		if(parseInt(getValue('LastUpdate', '0')) + 86400000 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/50826.meta.js?' + new Date().getTime(),
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
		if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > version) {
			if(confirm(	"There's an update available for 'Facebook Chat Emoticons Bar'.\n" +
						"Your version: " + version + "\n" +
						"New version: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"Do you wish to install it?")
			   ) openInTab('http://userscripts.org/scripts/source/50826.user.js');
		}
	}
	
// END

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
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
	taremotsInfo = ['[[191313654303915]]', 'hphotos-ak-snc7/421845_191313654303915_191312554304025_255743_993721494_n.jpg', '[[191316447636969]]', 'hphotos-ak-snc7/402439_191316447636969_191312554304025_255746_281907918_n.jpg', '[[191323557636258]]', 'hphotos-ak-ash4/429490_191323557636258_191312554304025_255762_2069432244_n.jpg', '[[191325924302688]]', 'hphotos-ak-snc7/419815_191325924302688_191312554304025_255768_376657853_n.jpg', '[[191325690969378]]', 'hphotos-ak-ash4/401497_191325690969378_191312554304025_255767_6218055_n.jpg', '[[191327717635842]]', 'hphotos-ak-snc7/421983_191327717635842_191312554304025_255774_1272337631_n.jpg', '[[191327857635828]]', 'hphotos-ak-snc7/425742_191327857635828_191312554304025_255775_743252975_n.jpg', '[[191327974302483]]', 'hphotos-ak-ash4/407028_191327974302483_191312554304025_255779_355714556_n.jpg', '[[192120940889853]]', 'hphotos-ak-ash4/420444_192120940889853_191312554304025_257432_1890959551_n.jpg', '[[191322750969672]]', 'hphotos-ak-snc7/418616_191322750969672_191312554304025_255760_110930866_n.jpg', '[[191329640968983]]', 'hphotos-ak-snc7/425016_191329640968983_191312554304025_255791_773109816_n.jpg', '[[192109597557654]]', 'hphotos-ak-snc7/418570_192109597557654_191312554304025_257417_2061819551_n.jpg', '[[191329000969047]]', 'hphotos-ak-ash4/409152_191329000969047_191312554304025_255790_793185933_n.jpg', '[[192119824223298]]', 'hphotos-ak-snc7/429789_192119824223298_191312554304025_257430_328569051_n.jpg', '[[192120634223217]]', 'hphotos-ak-snc7/429950_192120634223217_191312554304025_257431_1645892663_n.jpg', '[[192119710889976]]', 'hphotos-ak-snc7/420795_192119710889976_191312554304025_257429_1803251969_n.jpg', '[[192110254224255]]', 'hphotos-ak-ash4/395841_192110254224255_191312554304025_257420_1415101680_n.jpg', '[[192119304223350]]', 'hphotos-ak-snc7/429847_192119304223350_191312554304025_257428_906765822_n.jpg', '[[230128137089133]]', 'hphotos-ak-snc7/292545_230128137089133_191312554304025_334270_1298525340_n.jpg', '[[217760118325935]]', 'hphotos-ak-ash3/554371_217760118325935_191312554304025_312703_1972462773_n.jpg', '[[225968764171737]]', 'hphotos-ak-prn1/562742_225968764171737_191312554304025_327647_548128467_n.jpg', '[[238557359579544]]', 'hphotos-ak-prn1/545065_238557359579544_191312554304025_352958_401207609_n.jpg', '[[216927435075870]]', 'hphotos-ak-ash4/293018_216927435075870_191312554304025_310369_1908253129_n.jpg', '[[215891431846137]]', 'hphotos-ak-ash3/558791_215891431846137_191312554304025_308318_693849571_n.jpg', '[[225928150842465]]', 'hphotos-ak-ash3/579413_225928150842465_191312554304025_327546_823948143_n.jpg', '[[192113274223953]]', 'hphotos-ak-ash4/424716_192113274223953_191312554304025_257426_1017264322_n.jpg', '[[191328274302453]]', 'hphotos-ak-ash4/403029_191328274302453_191312554304025_255787_1870902079_n.jpg', '[[211492658952681]]', 'hphotos-ak-ash3/527255_211492658952681_191312554304025_298212_163256149_n.jpg', '[[240659796035967]]', 'hphotos-ak-prn1/538091_240659796035967_191312554304025_356780_148028304_n.jpg', '[[240661116035835]]', 'hphotos-ak-ash3/559408_240661116035835_191312554304025_356785_604142887_n.jpg', '[[240662369369043]]', 'hphotos-ak-ash4/398929_240662369369043_191312554304025_356789_1729717660_n.jpg', '[[240662962702317]]', 'hphotos-ak-ash3/552990_240662962702317_191312554304025_356791_1555892785_n.jpg', '[[240678132700800]]', 'hphotos-ak-ash4/403417_240664126035534_191312554304025_356805_100317509_n.jpg', '[[464668456890667]][[464668473557332]][[464668483557331]]\n[[464668506890662]][[464668526890660]][[464668556890657]]\n[[464668586890654]][[464668606890652]][[464668630223983]]', 'hphotos-ak-snc7/526089_427863707237809_427859843904862_1479260_1871685247_n.jpg', '[[343561049054827]][[343561065721492]][[343561072388158]][[343561079054824]][[343561092388156]][[343561105721488]][[343561112388154]]\n[[343561122388153]][[343561135721485]][[343561142388151]][[343561152388150]][[343561162388149]][[343561175721481]][[343561185721480]]\n[[343561192388146]][[343561205721478]][[343561215721477]][[343561235721475]][[343561242388141]][[343561249054807]][[343561255721473]]\n[[343561272388138]][[343561282388137]][[343561292388136]][[343561315721467]][[343561325721466]][[343561332388132]][[343561339054798]]\n[[343561349054797]][[343561375721461]][[343561389054793]][[343561405721458]][[343561415721457]][[343561429054789]][[343561452388120]]\n[[343561459054786]][[343561469054785]][[343561492388116]][[343561509054781]][[343561529054779]][[343561542388111]][[343561542388111]]', 'hphotos-ak-ash3/p480x480/579735_427893047234875_427859843904862_1479389_1386974959_n.jpg', '[[140230169424967]][[140230199424964]][[140230212758296]][[140230236091627]][[140230249424959]]\n[[140230269424957]][[140230292758288]][[140230302758287]][[140230329424951]][[140230349424949]]\n[[140230249424959]][[140230386091612]][[140230399424944]][[140230416091609]][[140230426091608]]\n[[140230439424940]][[140230456091605]][[140230472758270]][[140230489424935]][[140230506091600]]\n[[140230519424932]][[140230526091598]][[140230539424930]][[140230556091595]][[140230576091593]]', 'hphotos-ak-ash2/p480x480/75246_427896010567912_427859843904862_1479394_696575333_n.jpg', '[[343646075712991]][[343646105712988]][[343646115712987]][[343646129046319]][[343646145712984]]\n[[343646159046316]][[343646172379648]][[343646185712980]][[343646202379645]][[343646212379644]]\n[[343646242379641]][[343646285712970]][[343646302379635]][[343646312379634]][[343646319046300]]\n[[343646342379631]][[343646352379630]][[343646362379629]][[343646372379628]][[343646379046294]]\n[[343646385712960]][[343646392379626]][[343646402379625]][[343646409046291]][[343646422379623]]\n[[343646442379621]][[343646452379620]][[343646459046286]][[343646469046285]][[343646482379617]]', 'hphotos-ak-snc7/p480x480/380267_427897970567716_427859843904862_1479400_1922153713_n.jpg']


    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
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
		for(i=0;i<taremotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',taremotsInfo[i]);
		fEmotsDom.setAttribute('src',TarimgURL + taremotsInfo[i+1]);
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
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
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
	
	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
				fixHeightAndScroll(fChatBar[i]);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
				fixHeightAndScroll(fChatBar[i]);
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
	
	function fixHeightAndScroll(bar) {
		fChatContainer = bar.parentNode.parentNode.parentNode;
		var oldheight = parseInt(fChatContainer.children[2].style.height.replace("px",""));
		var newheight = 285 - (fChatContainer.children[0].clientHeight + fChatContainer.children[1].clientHeight + fChatContainer.children[3].clientHeight + 1);
		fChatContainer.children[2].style.height = newheight + "px";
		fChatContainer.children[2].scrollTop += oldheight - newheight;
	}