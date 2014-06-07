// ==UserScript==
// @name           lastModified
// @namespace      http://ss-o.net/
// @description    The lastModified of a static documentis displayed.
// @include        http://*
// ==/UserScript==

(function(){
	if (![].some || ![].map) return;
	var lastModified = new Date(document.lastModified);
	if (lastModified.getTime() == 0) return;
	var now = new Date();
	var dates = ['FullYear','Month','Date','Hours','Minutes'];
	var times = dates.map(function(label){
		var _label = 'get' + label;
		return {label:label, span:now[_label]() - lastModified[_label]()};
	});
	var ago, static = times.some(function(timeset){
		if (timeset.span) {
			ago = [timeset.span, timeset.label, 'ago'].join(' ');
			return true;
		}
		return false;
	});
	var post = function(message){
		var div = document.createElement('div');
		div.setAttribute('style','position:fixed;right:5px;background:#000000;color:#ffffff;padding:0.5em 2em;font-size:large;-moz-border-radius:10px;-webkit-border-radius:10px;-o-border-radius:10px;border-radius:10px;height:1.3em;');
		div.style.opacity = 0.8;
		div.style.bottom = '1em';
		div.textContent = message;
		document.body.appendChild(div);
		new Tween(div.style, {delay:1,time:2, opacity:{to:0.1,from:0.8},bottom:{to:-2.2,tmpl:'$#em'}, onComplete:function(){
				document.body.removeChild(div);
			}
		});
	};

	if (static) post(ago);

/*
// Tweener Like snippet
new Tween(div.style,{time:1, onComplete:function(){},left:{to:0,from:100,tmpl:"+$#px"}});
// @require http://gist.github.com/13572.txt
*/
function Tween(item, opt) {
	var self = this, TIME = 10, time = (opt.time||1) * 1000, TM_EXP = /(\+)?\$([\#\d])/g, sets = [],
		easing = opt.transition || function(t, b, c, d){return c*t/d + b;}, _T = {time:1,onComplete:1,transition:1,delay:1};
	for (var k in opt) if (!_T[k]) {
		var set = opt[k], from = set.from || parseFloat(item[k]) || 0, values = [], tmpl = set.tmpl || '$#';
		sets.push({key:k, from:from, to:set.to, tmpl:tmpl});
	}
	var L = sets.length, delay = opt.delay*1000 || 0, startTime = new Date()*1 + delay, endTime = time + startTime, dist = endTime - startTime, run = function(){
		var now = new Date()*1, tim = now - startTime;
		for (var k = 0; k < L; ++k) {
			var set = sets[k], val = easing(tim, set.from, set.to - set.from, dist);
			item[set.key] = set.tmpl.replace(TM_EXP, function(m, p, m1){return p && val < 0 ? 0 : (m1 == '#' ? val : val.toFixed(m1));});
		}
		if (tim <= dist) {setTimeout(function(){run.call(self);},TIME);}
		else {
			for (var k = 0; k < L; ++k) {item[sets[k].key] = tmpl.replace(TM_EXP, sets[k].to);}
			if (typeof opt.onComplete == 'function') opt.onComplete(item);
		}
	};
	delay ? setTimeout(function(){run();},delay) : run(0);
}

})();
