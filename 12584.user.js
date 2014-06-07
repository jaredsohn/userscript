// ==UserScript==
// @name           LDR - Drive
// @namespace      http://userscripts.org/scripts/show/12584
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

// UPDATE 2007/11/22 01:24

window.addEventListener('load', function() {
	var w = unsafeWindow;
	
	w.Keybind.remove('j');
	w.Keybind.remove('k');
	
	keyTapper('J', function(e, repeat){
		w.Control.scroll_next_item()
	});
	
	keyTapper('K', function(e, repeat){
		w.Control.scroll_prev_item();
	});
}, true);

// ----[Utility]-------------------------------------------------
function keyTapper(keys, handler, opt){
	const specialKeys = {
		8  :'BACK',      9  :'TAB',
		13 :'ENTER',     19 :'PAUSE',
		20 :'CAPS_LOCK', 27 :'ESCAPE',     32 :'SPACE',
		33 :'PAGE_UP',   34 :'PAGE_DOWN',
		35 :'END',       36 :'HOME',
		37 :'LEFT',      38 :'UP',         39 :'RIGHT',     40 :'DOWN',
		45 :'INSERT',    46 :'DELETE',
		91 :'WINDOWS_LEFT', 
		92 :'WINDOWS_RIGHT',
		112:'F1',        113:'F2',         114:'F3',        115:'F4',
		116:'F5',        117:'F6',         118:'F7',        119:'F8',
		120:'F9',        121:'F10',        122:'F11',       123:'F12',
		144:'NUM_LOCK',  145:'SCROLL_LOCK',
		
		// 記号(Shiftキーを押していた時に表示される文字列)
		109:'=', 222:'~', 220:'|',
		192:'`', 219:'{',
		61 :'+', 59 :'*', 221: '}',
		188:'<', 190:'>', 191:'?', 226:'_',
	};
	
	function keyString(e){
		var code = e.keyCode;
		var res = [];
		e.shiftKey && res.push('SHIFT');
		e.ctrlKey  && res.push('CTRL');
		e.altKey   && res.push('ALT');
		if(code < 16 || 18 < code)
			res.push(specialKeys[code] || String.fromCharCode(code));
		return res.join('+');
	}
	
	function cancel(e){
		e.preventDefault();
		e.stopPropagation();
	}
	
	var opts = {};
	var intervalIDs = {};
	var downed = {};
	
	document.addEventListener('keydown', function(e){
		if(e.target.tagName.match(/input|textarea/i)) return;
		
		var key = keyString(e);
		var keyCode = e.keyCode;
		var opt = opts[key];
		
		if(opt && opt.cancel) cancel(e);
		if(
			!opt || 
			intervalIDs[keyCode] != null || 
			(!opt.repeat && downed[keyCode])) return;
		
		opt.handler(e, downed[keyCode], opt);
		downed[keyCode] = true;
		
		var now = (new Date()).getTime();
		var wait = now - opt.last;
		if(wait<1500){
			opt.wait = Math.max(100, Math.floor(wait * 0.9));
		}
		opt.last = now;
		
		// 以降のキーリピートはsetTimeoutでエミュレートする
		intervalIDs[keyCode] = setTimeout(function(){
			opt.handler(e, true, opt);
			opt.last = 0; // 繰り返しが始まったらタップをクリアする
			intervalIDs[keyCode] = setTimeout(arguments.callee, opt.wait);
		}, opt.wait);
	}, true);
	document.addEventListener('keyup', function(e){
		var keyCode = e.keyCode;
		
		if(!downed[keyCode]) return;
		downed[keyCode] = false;
		
		if(intervalIDs[keyCode] == null) return;
		clearInterval(intervalIDs[keyCode]);
		delete intervalIDs[keyCode];
	}, true);
	
	(keyTapper = function(keys, handler, opt){
		opt = opt || {};
		keys.split(',').forEach(function(key){
			opts[key] = {
				handler : handler,
				repeat  : opt.repeat!=null? opt.repeat : true,
				last    : 0,
				wait    : opt.wait || 300,
				cancel  : opt.cancel!=null? opt.cancel : true,
			};
		});
	})(keys, handler, opt)
	
	keyTapper.clear = function(){
		opts = {};
	}
}