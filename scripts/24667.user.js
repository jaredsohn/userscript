// ==UserScript==
// @name           NicoVideo Auto Play
// @namespace      http://endflow.net/
// @description    jump to next video automaticaly on finished play.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==
// @version        0.1.3 [2008-04-07]
// @history        [2008-04-01] 0.1.0 first version
//                 [2008-04-01] 0.1.1 improved: cleaning code, configurable
//                 [2008-04-02] 0.1.2 improved: supported other patterns
//                 [2008-04-07] 0.1.3 improved: supported more title patterns

(function(){
var cfg = {
	// condition for jump to next video
	jumpCond: function(hist, vlen){
		var sz = hist.length;
		return 3 <= sz && vlen - hist[sz-1] < 3
			&& hist[sz-1] === hist[sz-2] && hist[sz-2] === hist[sz-3];
	},
	// regular expression for to get series sub-string
	pattern: /(part|その|第|No|\()[\.\s]?\d+[\s]?(回|話|\)?)/gi,
	// delay time until jump to next video
	delay: 2000,
	interval: {
		// interval for the player is ready or not
		ready: 1000,
		// interval for the video finished or not
		jump: 300
	}
}

setTimeout(function(){
	if(getPlayerVar('ready')){
		var hist = [];
		var len = unsafeWindow.Video.length;
		setTimeout(function(){
			hist.push(getPlayerVar('moved_time'));
			if(10 < hist.length) hist.shift();
			if(cfg.jumpCond(hist, len)){
				tryToJumpNextVideo();
			}else{
				setTimeout(arguments.callee, cfg.interval.jump);
			}
		}, cfg.interval.jump);
	}else{
		setTimeout(arguments.callee, cfg.interval.ready);
	}
}, cfg.interval.ready);

// thx: http://blog.fulltext-search.biz/
function getPlayerVar(name){
	return unsafeWindow.$('flvplayer').GetVariable(name);
}

function tryToJumpNextVideo(){
	var desc = unsafeWindow.Video.description;
	var anchors = desc.match(/<a[^>]*>[^<]+<\/a>/gi);
	var videos = anchors
		.filter(function(a){return a.indexOf('watch/sm')!=-1})
		.map(function(a){return a.match(/href\="[^"]+"/)[0].slice(6,-1)});
	var title = unsafeWindow.Video.title;
	jumpNextVideo(title, videos);
}

function getPartNoFromTitle(title){
	var part = title.match(cfg.pattern)[0];
	var conv = function(n){
		return (n+'0123456789')['０１２３４５６７８９'.indexOf(n)+1];
	}
	var num = part.match(/\d+/)[0];
	return parseInt(num.replace(/\d/, conv));
}

function jumpNextVideo(title, urls){
	var url = urls.shift();
	var ctitle = title.slice(0, title.search(cfg.pattern));
	getHTML(url, function(response){
		var t = response.responseText.match(/<title>[^<]+<\/title>/gi)[0].slice(7, -8);
		if(t.indexOf(ctitle) !== -1 && (getPartNoFromTitle(title) + 1) == getPartNoFromTitle(t)){
			setTimeout(function(){
				unsafeWindow.location.href = url;
			}, cfg.delay);
		}else{
			if(urls.length !== 0) jumpNextVideo(title, urls);
		}
	});
}

function getHTML(url, onload){
	new unsafeWindow.Ajax.Request(url, {
		requestHeaders: {'Cookie': unsafeWindow.document.cookie},
		onSuccess: onload
	});
}
})();

