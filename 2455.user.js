// ==UserScript==
// @name           Gmail Unread/Read Button
// @namespace      http://www.arantius.com/article/arantius/gmail+delete+button/
// @description    Add a "Unread/Read" button to Gmail's interface.
// @include        http*://mail.google.com/*
// ==/UserScript==

//
// Version 3.4.4:
//  - Lithuanian translation.
// Version 3.4.3:
//  - Re-engineer and re-enable keyboard shortcut.
// Version 3.4.2:
//  - Temporarily disable keyboard shortcut due to bugs.
// Version 3.4.1:
//  - User-submitted chinese localization.
// Version 3.4:
//  - Keyboard shortcut, by popular demand.
// Version 3.3:
//  - By suggestion, an option to customize the text on the button.
// Version 3.2:
//  - A basic method to hide the button where it is ineffective.
// Version 3.1.1:
//  - Dutch translation.
// Version 3.1:
//  - Button was missing in 'sent mail', now fixed.
//  - Configuration via user script commands, position and color.
// Version 3.0.1:
//  - Ukranian translation.
// Version 3.0:
//  - Completely rebuilt, based on the injection technique designed for
//    my related script 'Gmail Action Links'
//
// --------------------------------------------------------------------
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
// When distributing this original script or any script based on this
// code on the web, a link to the homepage (URL in namespace above) is
// required.
// --------------------------------------------------------------------
//

(function() {
function _gmrb_watch_click(e) {
	var el=e.target;
	if (!el) return;
	if (!el.id) return;
	if ('_gmrb_'!=el.id) return;

	e.preventBubble();
	_gmrb_read(el);
}

function _gmrb_watch_key(e) {
	var el=e.target;
	var button=e.target.ownerDocument.getElementById('_gmrb_');

	//check if there is a rename button showing now
	if (!button) return;

	//check if we pressed the right key
	//if (String.fromCharCode(e.which) != GM_getValue('key', 'x')) return;

	//check if we shouldn't handle the event because it's from certain elements
	for (var x=el; x!=null; x=x.parentNode) {
		var n=x.nodeName;
		if (n=="TEXTAREA" || n=="INPUT" || n=="BUTTON") return;
	}

	e.preventBubble();
	_gmrb_read(button);
}

function _gmrb_read(button) {
	//find container
	var action='ur'; // read = rd ; unread = ur
	var cont=button;
	while (null!=cont && 'TABLE'!=cont.tagName) cont=cont.parentNode;
	if (!cont) return;
	
	//find action box in container
	var box=cont.getElementsByTagName('select')[0];
	box=box.wrappedJSObject || box;
	box.onfocus();
	var action_index=-1;
	for (var i=0; i<box.options.length; i++) {
		if (("ur"==box.options[i].value || "rd"==box.options[i].value) && !box.options[i].disabled ) {
			action_index=i;
			break;
		}
	}
	if (-1==action_index) return;

	//trigger action via box
	box.selectedIndex=action_index;
	box.onchange();
}

if ('undefined'==typeof GM_registerMenuCommand) {
	//we're an extension, no GM apis
	function GM_getValue(a,b) {return b;}
} else {
	//we're a user script
	function _gmrb_option_pos() {
		GM_setValue('gmrb_pos',
			prompt(
				'Please enter the position you want.  Valid choices: left, right\n'+
				'NOTE: You will need to re-load GMail for this to take effect',
				GM_getValue('gmrb_pos', 'left')
			)
		);
	}
	GM_registerMenuCommand(
		'Gmail Unread/Read Button Position...',
		_gmrb_option_pos
	);

	function _gmrb_option_color() {
		GM_setValue('gmrb_color',
			prompt(
				'Please enter the color, all HTML colors are valid\n(white, black, #DD3322, etc)\n'+
				'NOTE: You will need to re-load GMail for this to take effect',
				GM_getValue('gmrb_color', 'black')
			)
		);
	}
	GM_registerMenuCommand(
		'Gmail Unread/Read Button Color...',
		_gmrb_option_color
	);

	function _gmrb_option_text() {
		GM_setValue('gmrb_text',
			prompt(
				'Please enter the text to show on the button.\n'+
				'NOTE: Leave blank to use default text\n'+
				'NOTE: You will need to re-load GMail for this to take effect',
				GM_getValue('gmrb_text', '')
			)
		);
	}
	GM_registerMenuCommand(
		'Gmail Read/Unread Button Text...',
		_gmrb_option_text
	);

	function _gmrb_option_key() {
		GM_setValue('gmrb_key',
			prompt(
				'Please enter the mark read hotkey.\n'+
				'Any one character, default is "x".',
				GM_getValue('gmrb_key', 'x')
			)
		);
	}
	GM_registerMenuCommand(
		'Gmail Read/Unread Button Hotkey...',
		_gmrb_option_key
	);
}

if (window.document.location.href.match(/name=js/)) {
	//find language
	var lang='';
	for (var i in unsafeWindow) {
		var x=unsafeWindow[i];
		if ('string'!=typeof x) continue;

		if (x.indexOf('help/intl/')==0) {
			lang=x.substr(10);
			lang=lang.substr(0,lang.length-1);
			break;
		}
	}

	//make button HTML
	var buttonText='(Un)Read';
	switch (lang) {
//	case 'it':    buttonText='Elimina'; break;
//	case 'es':    buttonText='Borrar'; break;
//	case 'fr':    buttonText='Supprimer'; break;
//	case 'pt-BR': buttonText='Apaga'; break;
//	case 'de':    buttonText='L&#246;schen'; break;
//	case 'bg':    buttonText='&#1048;&#1079;&#1090;&#1088;&#1080;&#1081;'; break;
//	case 'ru':    buttonText='&#1059;&#1076;&#1072;&#1083;&#1080;&#1090;&#1100;'; break;
//	case 'pl':    buttonText='Usu&#324;'; break;
//	case 'ja':    buttonText='\u30b4\u30df\u7bb1\u3078\u79fb\u52d5'; break;
//	case 'hu':    buttonText='T&#246;r&#246;l'; break;
//	case 'uk':    buttonText='&#1042;&#1080;&#1076;&#1072;&#1083;&#1080;&#1090;&#1080;'; break;
	case 'nl':    buttonText='(On)Gelezen'; break;
//	case 'zh-TW': case 'zh-CN': case 'zt-TW':
//	case 'zt-CN': case 'zt-HK': case 'zh-HK':
//		buttonText='&#21034;&#38500;'; break;
//	case 'lt':    buttonText='Trinti'; break;
	}
	var customText=GM_getValue('gmrb_text', '');
	if (''!=customText) buttonText=customText;

	var button="<button id='_gmrb_' class='ab' style='color: "+
		GM_getValue('gmrb_color', 'black')+
		";'><b>"+buttonText+"</b></button>";
	var space='&nbsp;&nbsp;';
	var holdS='<span id="_gmrb_hold">';
	var holdE='</span>';

	//tweak variables to put button in
	for (var i in unsafeWindow) {
		try {
			var x=unsafeWindow[i];
			if ('object'!=typeof x) continue;

			if (0==x[0].indexOf('<table cellspacing')
				&&
				x[2].indexOf('class=lz')>0
			) {
				//list views
				if (x[4].indexOf('&nbsp;')>0) {
					if ('left'==GM_getValue('gmrb_pos', 'left')) {
						unsafeWindow[i][2]+=holdS+button+space+holdE;
					} else {
						unsafeWindow[i][6]+=holdS+button+space+holdE;
					}
				} else {
					if ('left'==GM_getValue('gmrb_pos', 'left')) {
						unsafeWindow[i][4]+=holdS+button+space+holdE;
					} else {
						unsafeWindow[i][8]=holdS+space+button+holdE+unsafeWindow[i][8];
					}
				}
			} else if (0==x[0].indexOf('<table width')
				&&
				x[2].indexOf('class=lz')>0
			) {
				//message view
				if ('left'==GM_getValue('gmrb_pos', 'left')) {
					unsafeWindow[i][4]+=button+space;
				} else {
					unsafeWindow[i][6]=space+button+unsafeWindow[i][6];
				}
			}
		} catch (e) {
			//noop, just catch errors
		}
	}
} else if (window.document.location.href.match(/search=(drafts|trash|spam)/)) {
	//hide the button where it doesn't belong via CSS
	//we get a little flicker, but such is life
	GM_addStyle('#_gmrb_hold { display: none; }');
} else {
	window.addEventListener('click', _gmrb_watch_click, true);
//	window.addEventListener('keypress', _gmrb_watch_key, true);
}

})();
