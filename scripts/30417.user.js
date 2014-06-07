// ==UserScript==
// @name           SGS Web stat progressbar
// @namespace      arvid.jakobsson@gmail.com
// @description    A progressbar for SGS Net web stats. Version 1.0
// @include        http://web.sgsnet.se/tvbstats/ip.php
// ==/UserScript==

/*
Changelog

* 1.0 2008-07-21
* Progressbars for favicon and each day.

*/
const MAX = convert('15 GB');

function createHeader() {
	var header_row = $xs("//table[.//th]/tbody/tr[th]");
	var newhead = document.createElement('th');
	newhead.textContent = 'Counter';
	header_row.appendChild(newhead);
}

function addCounters() {
	$x("//table[.//th]//tr[not(.//th)]").forEach(function(row, i) {
		var totalstr = $xs("./td[last()]/text()", row).data;
		var total = convert(totalstr);
		
		var newcell = document.createElement('td');
		newcell.appendChild((new ProgressBar({comp: (total/MAX > 1) ? 1 : total / MAX, foreground: ['#0f0', '#ff0', '#f00'], background: '#F9F3E7'}, 100, 20)).canvasElement); 
		if ( i == 0) {
			setFavicon(total);
			
		}
		
		row.appendChild(newcell);
	});
}

function setFavicon(traffic) {
	var favicon_url = (new ProgressBar({comp: (traffic/MAX > 1) ? 1 : traffic / MAX, foreground: ['#0f0', '#ff0', '#f00'], background: '#F9F3E7'}, 16, 16)).canvasElement.toDataURL();
	var favicon_link = document.createElement('link');
	favicon_link.setAttribute('rel', 'shortcut icon');
	favicon_link.setAttribute('type', 'image/png');
	favicon_link.setAttribute('href', favicon_url);
	document.getElementsByTagName('head')[0].appendChild(favicon_link);
}

function convert(str) {
	var tbl = {'gb': 1024*1024, 'mb': 1024, 'kb': 1};
	
	var m = trim(str).match(/(.*) (.*)/);
	var value = m[1]
	var unit = m[2];
	
	return parseInt(value, 10)*tbl[unit.toLowerCase()];
}
/*
 * ProgressBar object
*/

function ProgressBar(opts, width, height) {
	this.opts = {
		border: opts.border ||  '#000',
		background: opts.background || '#fff',
		foreground: opts.foreground || '#0f0',
		comp: opts.comp || 0
	};
	
	var canvas = document.createElement('canvas');
	canvas.setAttribute('width', width );
	canvas.setAttribute('height', height);
	
	this.canvasElement = canvas;
	this.canvasContext = canvas.getContext("2d");
	this.width = width;
	this.height = height;
	this.lingrad = this.createLinGrad(this.opts.foreground);
	
	this.paintBackground();
	if (opts.comp != null) 
		this.setCompleted(opts.comp);
	
	return this;
}

ProgressBar.prototype.createLinGrad = function (clrs) {
	var lingrad = this.canvasContext.createLinearGradient(2, this.height/2, this.width-2, this.height/2);
	clrs = ( clrs instanceof Array ? clrs : [ clrs ]);
	
	lingrad.addColorStop(0, clrs[0]);
	for ( var i = 1; i < clrs.length - 1; i++) {
		lingrad.addColorStop( i / (clrs.length - 1), clrs[i] );
		lingrad.addColorStop( i / (clrs.length - 1), clrs[i] );
	}
	if (clrs.length > 1) 
		lingrad.addColorStop(1, clrs[clrs.length - 1]);
	
	return lingrad;
};

ProgressBar.prototype.paintBackground = function () {
	var w = this.width, h = this.height, ctx = this.canvasContext;
	
	ctx.fillStyle = this.opts.border; //paint border
	ctx.fillRect (0, 0, w,  h);
	
	ctx.fillStyle = this.opts.background; //paint background
	ctx.fillRect (1, 1, w-2, h-2);
	
	return this;
};

ProgressBar.prototype.setCompleted = function (comp) {
	var ctx = this.canvasContext, w = this.width, h = this.height;
	ctx.fillStyle = this.lingrad;
	ctx.fillRect(1, 1, comp * (w - 2), h - 2);
	return this;
};

createHeader();
addCounters();

/* 
 Helper functions
*/

function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function $xs(xpath, root) {
	return $x(xpath, root)[0];
}

function $(id) { return document.getElementById(id); }

function trim(str) { return str.replace(/^\s*(.*?)\s*$/, "$1"); };