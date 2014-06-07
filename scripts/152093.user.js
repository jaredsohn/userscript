// ==UserScript==
// @name        Kwiatek: srednia ocen
// @namespace   http://mniezgoda.pl
// @description Oblicza srednia ocen w dzienniku internetowym Kwiatka - Vulcan
// @author      Mateusz Niezgoda
// @version     1.1
// @include     https://uonet.vulcan.net.pl/*
// ==/UserScript==

var avg = (function(){
	var avg = function(){
		this.init();
	};
	avg.prototype = {
		opt: null,
		sad: null,
		sum: null,
		inc: null,
		getMarks: function () {
			var sad = optim = sum = i = 0;
			var tmp = function(e){
				var _ = parseFloat(e.innerText);
				if(_ > 0){
					sum += Math.round(_);
					i++;

					var p = _ * 100;
					p = new String(p);
					p = p[1] + p[2];
					p = parseInt(p);
					var q;
					if(p > 25){
						q = Math.ceil(_);
						optim += q;
					} else {
						optim += Math.round(_)
					};

					if(p < 75){
						q = Math.floor(_);
						sad += q;
					} else {
						sad += Math.round(_)
					};
				};
			};
			var e = document.querySelector('.DataGridRow');
			var o = e.childElementCount - 2;
			[].forEach.call(document.querySelectorAll('.DataGridRow td:nth-child('+o+')'), tmp);
			[].forEach.call(document.querySelectorAll('.DataGridAltRow td:nth-child('+o+')'), tmp);

			this.opt = optim;
			this.sad = sad;
			this.sum = sum;
			this.inc = i;
		},
		avg: function (p) {
			switch (p) {
				case 'opt': return Math.round(this.opt/this.inc * 100)/100; break;
				case 'sad': return Math.round(this.sad/this.inc * 100)/100; break;
				default: return Math.round(this.sum/this.inc * 100)/100;
			};
		},
		makeContainerAndFillIt: function () {
			var d = document.createElement('div');
				d.style.fontSize = "1em";
				d.style.clear = "both";
			
				var t = "<br />";
				t += " :| Twoja średnia z ocen to: " + this.avg('normal');
					t += "<br />";
				t += " :) Twoja optymistyczna średnia z ocen to: " + this.avg('opt');
					t += "<br />";
				t += " :( Twoja pesymistyczna średnia z ocen to: " + this.avg('sad');

			d.innerHTML = t;

			var c = document.querySelector('#TheContent');

			if(c){
				console.log(c.insertBefore(d, document.querySelector('.ContentWidthGuard')));
			};
		},
		init: function () {
			this.getMarks();
			this.makeContainerAndFillIt();
		}
	};

	return avg;
})();

(function(){
	if(document.querySelector('.ContentWidthGuard'))
		new avg();
})();