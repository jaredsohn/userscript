// ==UserScript==
//
// @name			kino.to Movie Iframe
// @namespace		http://userscripts.org/users/181110
// @description		Watch every movie on kino.to in an iframe. the iframe contains almost only the player Also bypasses some host-side "captcha-like" checks like timers or plugin availability where possible. tested in ff 3.6 and chrome 5.0 
// @version			0.9.8
// @include			http://kino.to/*
// @include			http://www.kino.to/*
// @include			http://alpha.kino.to/* 
// @include			http://beta.kino.to/* 
// @include			http://www.mystream.to/file-*
// @include			http://mystream.to/file-*
// @include			http://www.tubeload.to/file-*
// @include			http://tubeload.to/file-*
// @include			http://loaded.it/show*
// @include			http://www.loaded.it/show*
// @include			http://www.sharehoster.com/*
// @include			http://sharehoster.com/*
// @include			http://www.fullshare.net/*
// @include			http://fullshare.net/*
// @include			http://dataup.to/*
// @include			http://www.dataup.to/*
// @include			http://duckload.com/*
// @include			http://www.duckload.com/*
// @include			http://archiv.to/*
// @include			http://www.archiv.to/*
// @include			http://mcload.to/*
// @include			http://www.mcload.to/*
// @include			http://freeload.to/*
// @include			http://www.freeload.to/*
// @include			http://speedload.to/*
// @include			http://www.speedload.to/*
// @include			http://quickload.to/*
// @include			http://www.quickload.to/*
// @include			http://ebase.to/*
// @include			http://www.ebase.to/*
// @include			http://filebase.to/files/*
// @include			http://www.filebase.to/files/*
// @include			http://vstreamr.com/stream/*
// @include			http://www.vstreamr.com/stream/*
// @include			http://www.share.cx/video/*
// @include			http://share.cx/video/*
// @include			http://loombo.com/*
// @include			http://www.loombo.com/*
// @include			http://www.novamov.com/video/*
// @include			http://novamov.com/video/*
// @include			http://skyload.net/File/*
// @include			http://www.skyload.net/File/*
// @include			http://www.filestage.to/watch/*
// @include			http://filestage.to/watch/*
// @run_at			document_end
// ==/UserScript==

// 0.7.5	better reset of onbeforeunload
// 0.7.6	remove annoying layer from kino.to
// 0.8		dont rely on jquery on kino.to. use DOMNodeInserted instead of jquerys ajaxSuccess
// 0.8.1	onbeforeunload reset via postMessage(). also via load
// 0.8.2	remove the sharedName. use a closure in contentEval ...
// 0.8.3	always do a 1 sec timeout before unsetting onbeforeunload (chrome is too fast ;) 
// 0.8.4	fixed a captcha-timer issue, which unsets onbeforeunload to fast
// 0.9		Added Download link. use a closure (for testing opera) and an object for the hoster (no switch case anymore)
// 0.9.1	Make http://alpha.kino.to work 
// 0.9.2	Added share.cx
// 0.9.3	Added loombo.com
// 0.9.4	Always resize embed tag, even if its flash ...
// 0.9.5	Fixed vstreamr
// 0.9.6	New duckload
// 0.9.7	Added novamov.com
// 0.9.8	new selector. kino.to uses now an image map. 
//			new hoster:
//				- skyload.net
//				- filestage.to

// Closure for opera etc..
(function () {
	
var domain = document.domain.replace(/^(.*\.)?([^.]+)\.[^.]+/, '$2');

var shared = {
	width: 722,
	height: 346
};

//!!unsafeWindow.XMLHttpRequest -> firefox else chrome
var win = (this.unsafeWindow && this.unsafeWindow.XMLHttpRequest ? unsafeWindow : window);

if (domain == 'kino') {
	// Dont execute me if im in the historymanager iframe
	if (location.href.match(/Cache.php/)) return;
	
	// Remove the annoying ad-layer
	var annoy = document.querySelector('[class^=Mother_]');
	if (annoy) annoy.parentNode.removeChild(annoy);
	
	// Create the iframe once
	var iframe  = document.createElement('iframe');
	iframe.setAttribute('width', shared.width + 20);
	iframe.setAttribute('height', shared.height + 70);
	iframe.setAttribute('border', 0);

	var iTimeout;
	function removeBeforeUnload () {
		clearTimeout(iTimeout);
		iTimeout = setTimeout(function () {
			win.onbeforeunload = function () {};
		}, 1000);
	}
	iframe.addEventListener('load', removeBeforeUnload, true);
	this.addEventListener('message', removeBeforeUnload, false);
	
	var nTimeout;
	// wait for the domtree change in the module node
	document.querySelector('#Vadda, #Module').addEventListener('DOMNodeInserted', function () {
		clearTimeout(nTimeout);
		nTimeout = setTimeout(function () {
			var toFrame = document.querySelector('#PlayerContent a, #AjaxStream a, #AjaxStream map area');
			if (!toFrame) return;
			toFrame.addEventListener('click', function (event) {
				event.preventDefault();
				win.onbeforeunload = function () {
					return 'some hoster are using frame killers so press cancel/stay on this page ;)';
				};
				iframe.setAttribute('src', this.getAttribute('href'));
				var parent = document.querySelector('#PlayerContent, #AjaxStream');
				parent.insertBefore(iframe, parent.firstChild);
			}, true);
		}, 300);
		
	}, true);
	// Make sure its always loaded
	document.querySelector('#Vadda, #Module').appendChild(document.createElement('div')); // :)
	// out of the user script
	return;
}

var hoster = {
	selectors: {
		ebase: '#go2 object',
		mcload: '#go2 object',
		freeload: '#go2 object',
		speedload: '#go2 object',
		archiv: '#go2 object',
		quickload: '#go2 object',
		filebase: '#go2 object',
		duckload: '#watch_film object, #player object',
		dataup: '#divxer object',
		tubeload: '#theplayer object',
		mystream: '#theplayer object',
		loaded: 'object#player',
		fullshare: 'object#player',
		sharehoster: 'object#player',
		vstreamr: '.vsVideoArea object',
		share: '#streamplayer object',
		loombo: '#contmvshre embed',
		novamov: '#mediaspace embed',
		skyload: 'table embed, table object',
		filestage: '#container embed'
	},
	setBody: function (html) {
		document.body.innerHTML = "";
		if (typeof(html) == 'string')
			document.body.innerHTML = html;
		else
			document.body.appendChild(html);
		var embed = document.querySelector('embed');
		if (embed) {
			embed.setAttribute('width', shared.width);
			embed.setAttribute('height', shared.height);
			// Add the download link over the player
			if (embed.getAttribute('type').match('video')) {
				var link = document.createElement('a');
				link.setAttribute('href', embed.getAttribute('src'));
				link.appendChild(document.createTextNode('Download Movie'));
				document.body.insertBefore(link, document.body.firstChild);
			}
		}
	},
	contentEval: function (source) {
	  if ('function' == typeof source) {
	    var args = Array.prototype.slice.call(arguments,1);
	    source = '(' + source + ').apply(window, '+JSON.stringify(args)+');';
	  }
	  
	  source =
		'(function () {' +
		'var shared = {'+
		'	width: '+shared.width+','+
		'	height: '+shared.height+','+
		'	setBody: '+this.setBody+
		'};'+
		source +
		'})()';
	  
	  var script = document.createElement('script');
	  script.setAttribute("type", "application/javascript");
	  script.textContent = source;
	  document.body.appendChild(script);
	  // gets sometimes removed by shared.setBody
	  try { document.body.removeChild(script); } catch (e) {};
	},
	// Used by all
	all: function () {
		// Try to get the player by selector;
		var obj = document.querySelector(this.selectors[domain]);
		if (obj) this.setBody(obj);
		// cleanup the onbeforeunload() of kino.to
		this.contentEval(
			"if (window.parent) window.parent.postMessage('rdy=1', 'http://kino.to');" +
			"if (window.parent) window.parent.postMessage('rdy=1', 'http://alpha.kino.to');" +
			"if (window.parent) window.parent.postMessage('rdy=1', 'http://beta.kino.to');"
		);
	},
	// Loaded.it, sharehoster.to, loombo.com & fullshare.net
	loaded: function (time_wait, func) {
		time_wait = time_wait||200;
		func = func||'wait_timer';
		if (document.querySelector('#submit, #continue, #btn_download'))
			return this.contentEval(function (w, func) {
				//window.stop();
				var submit = document.querySelector('#submit, #continue, #btn_download');
				if (submit) {
					var form = submit.form;
					window[func] = function () {
						if (time_wait <= 0) {
							if (submit.id == 'submit')
								form.removeChild(submit);
							form.submit();
							window[func] = function () {};
							return;
						}
						num = time_wait -= 100;
						submit.value = 'still ' + (time_wait/1000)  + 's :(';
						if (func == 'countDown')
							window.setTimeout(countDown, 400);
					}
					document.body.insertBefore(submit.form, document.body.firstChild);
					num = time_wait = w;
					submit.disabled = false;
				}
			}, time_wait, func);
		
		this.contentEval(function () {
			if (window.makePOSTRequest) {
				alertContents = function () {
					if (http_request.readyState == 4) {
						 if (http_request.status == 200) {
							result = http_request.responseText;
							shared.setBody(result);
						 }
					 }
				};
				get(document.getElementById('myform'));
			}
		});
		this.all();
	},
	fullshare: function () {
		// They check serverside :/
		this.loaded(20000);
	},
	sharehoster: function () { this.loaded(); },
	loombo: function () { this.loaded(1200, 'countDown'); },
	// Mystream, Tubeload
	mystream: function () {
		var s = document.getElementById('player').getElementsByTagName('script')[0].innerHTML;
		win.stop();
		var matches = s.match (/var url = '(.*)'/);
		var url = matches[1];
		matches = s.match (/var plugin = '(.*)'/);
		var plugin = matches[1];
		if (plugin == 'divx') {
			this.contentEval(function(url) {
				shared.setBody((new MediaPlugin()).divxNode({
					src: url, 
					autoplay: true, 
					id: 'divx', 
					width: shared.width, 
					height: shared.height
				}));
			}, url);
		}
		
		this.all();
	},
	tubeload: function () { this.mystream(); },
	// duckload
	duckload: function () {
		// New duckload
		if (document.getElementById('form')) {
			document.body.insertBefore(document.getElementById('form'), document.body.firstChild);			
			return setTimeout(function () { document.getElementById('form').submit();}, 10000);
		}
		// Old duckload
		if (document.getElementById('bb'))
			return this.contentEval(function () {
				$('#bb').click();
			});
		
		this.all();
	},
	// Filebase
	filebase: function () {
		if (document.getElementById('dl_free'))
			return document.getElementById('dl_free').form.submit();
		
		this.all();
	},
	share: function () {
		var btn = document.querySelector('button[name=method_free]');
		if (btn) btn.click();
		else 
			this.all();
	}
};

// Stop all changes of location + stops loading page -> faster
win.stop();
//win.top.location.href = win.top.location.href + '#1234';
if (hoster[domain]) (hoster[domain])();
else hoster.all();

})();

