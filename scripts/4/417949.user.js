// ==UserScript==
// @name       Google Music Utils
// @namespace  http://wormss.net/
// @version    0.2
// @description  Stops Google Music from closing and minimises Explicit tags.
// @match      https://play.google.com/music/listen
// @copyright  2013+, WORMSS
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_info
// @grant GM_unregisterMenuCommand
// @grant GM_registerMenuCommand
// ==/UserScript==

(function() {
	var _hoverEl = null,
	_add = document.body.classList.add.bind(document.body.classList),
	_remove = document.body.classList.remove.bind(document.body.classList),
	_contains = document.body.classList.contains.bind(document.body.classList),
	_opts = {
		accidentalClose	: { value: 1, menu: "Accidental Close:", values: [{ menu: 'Allow' }, { menu: 'Prevent' }]},
		explicit		: { value: 1, menu: "Explicit:", values: [{ menu: 'Full' }, { menu: 'Collapse' }]},
		uploadButton	: { value: 1, menu: "Upload Button:", values: [{ menu: 'Show' }, { menu: 'Hide', klass: 'hideUploadButton' }]},
		queueDetails	: { value: 1, menu: "Queue Details:", values: [{ menu: 'Show' }, { menu: 'Hide', klass: 'hideQueueDetails' }]},
		queueArtist		: { value: 1, menu: "Queue Artist:", values: [{ menu: 'Show' }, { menu: 'Hide', klass: 'hideQueueArtist' }, { menu: 'Minimize', klass: 'minimizeQueueArtist' }]},
		queueAlbum		: { value: 1, menu: "Queue Album:", values: [{ menu: 'Show' }, { menu: 'Hide', klass: 'hideQueueAlbum' }, { menu: 'Minimize', klass: 'minimizeQueueAlbum' }]}
	},
	_mcid = {
		accidentalClose	: 0,
		explicit		: 0,
		uploadButton	: 0,
		queueDetails	: 0,
		queueArtist		: 0,
		queueAlbum		: 0
	};
	
	function addGlobalStyle(__css) {
		var __style = document.createElement('style');
		__style.type = 'text/css';
		__style.innerHTML = __css;
		Array.prototype.forEach.call(document.getElementsByTagName('head'), function(__head) {
			__head.appendChild(__style.cloneNode(true));
		});
	}
	
	function assignClass(__key) {
		var __optValue, __opt = _opts[__key];
		console.log(__opt);
		Array.prototype.forEach.call(__opt.values, function(__value, __index) {
			if ( __index != __opt.value && __value.hasOwnProperty('klass') && _contains(__value.klass) ) {
				_remove(__value.klass);
			}
		});
		__optValue = __opt.values[__opt.value];
		console.log(__optValue);
		if ( __optValue.hasOwnProperty('klass') && !_contains(__optValue.klass) ) {
			_add(__optValue.klass);
		}
	}
	
	function storeValue(__key) {
		GM_setValue(__key, _opts[__key].value.toString());
	}
	
	function retrieveValue(__key) {
		var __tmp = GM_getValue(__key, _opts[__key]);
		if ( isNaN(parseInt(__tmp, 10)) ) {
			storeValue(__key);
		} else {
			_opts[__key].value = __tmp;
			_opts[__key].value %= _opts[__key].values.length;
		}
	}
	
	function assignMenuCommand(__key) {
		var __menuText,
		__opt = _opts[__key];
		__menuText = __opt.menu;
		Array.prototype.forEach.call(__opt.values, function(__value, __index) {
			__menuText += __index == __opt.value ? (' [' + __value.menu + ']') : (' ' + __value.menu);
		});
		_mcid[__key] = GM_registerMenuCommand(__menuText, function() {
			_opts[__key].value++;
			_opts[__key].value %= _opts[__key].values.length;
			storeValue(__key);
			assignClass(__key);
			updateMenu();
		});
	}
	
	function updateMenu() {
		GM_unregisterMenuCommand(_mcid.accidentalClose);
		GM_unregisterMenuCommand(_mcid.explicit);
		GM_unregisterMenuCommand(_mcid.uploadButton);
		GM_unregisterMenuCommand(_mcid.queueDetails);
		GM_unregisterMenuCommand(_mcid.queueArtist);
		GM_unregisterMenuCommand(_mcid.queueAlbum);
		
		assignMenuCommand("accidentalClose");
		assignMenuCommand("explicit");
		
		assignMenuCommand('uploadButton');
		assignMenuCommand('queueDetails');
		assignMenuCommand('queueArtist');
		assignMenuCommand('queueAlbum');
	}
	/*** End Setup ***/
	
	retrieveValue('accidentalClose');
	retrieveValue('explicit');
	retrieveValue('uploadButton');
	retrieveValue('queueDetails');
	retrieveValue('queueArtist');
	retrieveValue('queueAlbum');
	
	if ( GM_info.version > "3.7.3817" ) {
		updateMenu();
	}
	
	addGlobalStyle('body.hideUploadButton button[data-id=upload-music] { display: none; }');
	addGlobalStyle('body.hideQueueDetails #content.has-queue-details .queue-details { display: none; }');
	addGlobalStyle('body.hideQueueDetails #content.has-queue-details #main { top: 0; }');
	addGlobalStyle('body.hideQueueArtist div.queue-song-table th[data-col=artist], body.hideQueueArtist div.queue-song-table tr.song-row td[data-col=artist] { display: none; }');
	addGlobalStyle('body.hideQueueAlbum div.queue-song-table th[data-col=album], body.hideQueueAlbum div.queue-song-table tr.song-row td[data-col=album] { display: none; }');
	addGlobalStyle('body.minimizeQueueArtist div.queue-song-table th[data-col=artist] { width: 10% }');
	addGlobalStyle('body.minimizeQueueAlbum div.queue-song-table th[data-col=album] { width:10% }');
	
	assignClass('uploadButton');
	assignClass('queueDetails');
	assignClass('queueArtist');
	assignClass('queueAlbum');
	
	setTimeout(function() {
		window.onbeforeunload = function(__e) {
			if ( _opts.accidentalClose.value == 1 ) {
				__e = __e || window.event || {};
				__e.retunValue = 'Sure?';
				return __e;
			}
		};
	}, 5000);
	
	setInterval(window.onscroll = window.onmousewheel = function() {
		if ( _opts.explicit.value == 1 ) {
			Array.prototype.forEach.call(document.getElementsByClassName('explicit'), function(__el) {
				__el.onmouseenter = function() {
					__el.innerHTML = 'Explicit';
					_hoverEl = __el;
				};
				__el.onmouseleave = function() {
					__el.innerHTML = 'E';
					_hoverEl = null;
				};
				if ( __el != _hoverEl && __el.innerHTML != "E" ) {
					__el.onmouseleave();
				}
			});
		}
	}, 5000);  
}());