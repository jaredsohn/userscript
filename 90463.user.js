// ==UserScript==
// @name              TD Hover
// @author            modestein
// @description       通用列表高亮脚本，对鼠标悬浮行实现高亮效果
// @create            2010-10-01
// @lastmodified      2010-10-12
// @version           1.11
// @namespace         modestein
// @include           *
// ==/UserScript==

const HIGHLIGHT_COLOR = "palegreen";
const BG_KEY = "TD_HOVER_bgColor";
const HL_KEY = "TD_HOVER_highlight";
const MIN_VALID_LINE_HEIGHT = 20;
const MAX_VALID_LINE_HEIGHT = 80;
const MIN_VALID_LINE_LENGTH = 15;
let each = Array.forEach, pool = [];
function $(s){
	return document.querySelectorAll(s);
}
function get(el, key){
	return el.getUserData(key);
}
function set(el, key, value){
	return el.setUserData(key, value, null);
}
function setBG(el, color, check){
	if(!check || el.style.backgroundColor == HIGHLIGHT_COLOR)
		el.style.backgroundColor = color;
}
function listen(ev, op, el){
	return (el || window).addEventListener(ev, op, false);
}
function unlisten(ev, op, el){
	return (el || window).removeEventListener(ev, op, false);
}
function isList(list){
	var c = 0, min = Number.MAX_VALUE, max = Number.MIN_VALUE;
	each(list, function(r){
		h = r.offsetHeight;
		if(h < MIN_VALID_LINE_HEIGHT){
			return;
		} else{
			c++;
		}
		min = Math.min(min, h);
		max = Math.max(max, h);
	});
	return c >= MIN_VALID_LINE_LENGTH && max <= MAX_VALID_LINE_HEIGHT;
}
function isSameRow(el, r){
	while(el && el != r) el = el.parentNode;
	return !!el;
}

let scanTBody = (function(){
	var list = [];
	function update(row){
		for(var el; el = list.pop();) get(el, HL_KEY) && highlight(el);
		list.push(row);
	}
	function remove(row){
		var i = list.indexOf(row);
		~i && list.splice(i, 1);
	}
	function highlight(el){
		var b = !set(el, HL_KEY, !get(el, HL_KEY));
		setBG(el, b ? HIGHLIGHT_COLOR : get(el, BG_KEY), !b);
		each(el.cells, function(c){
			setBG(c, b ? HIGHLIGHT_COLOR : get(c, BG_KEY), !b);
		});
	}
	function mouseover(e){
		if(isSameRow(e.relatedTarget, this)) return;
		update(this);
		set(this, BG_KEY, this.style.backgroundColor);
		each(this.cells, function(c){
			set(c, BG_KEY, c.style.backgroundColor);
		});
		highlight(this);
		listen("mouseout", mouseout, this);
	}
	function mouseout(e){
		if(isSameRow(e.relatedTarget, this)) return;
		highlight(this);
		remove(this);
		unlisten("mouseout", mouseout, this);
	}
	return function(){
		each($("tbody"), function(t){
			if(~pool.indexOf(t) || !isList(t.rows)) return;
			pool.push(t);
			each(t.rows, function(r){
				listen("mouseover", mouseover, r);
			});
		});
	}
})();

let scanTable = (function(){
	var list = [];
	function update(row){
		for(var el; el = list.pop();) get(el, HL_KEY) && highlight(el);
		list.push(row);
	}
	function remove(row){
		var i = list.indexOf(row);
		~i && list.splice(i, 1);
	}
	function highlight(el){
		var b = !set(el, HL_KEY, !get(el, HL_KEY));
		each(el.rows, function(r){
			setBG(r, b ? HIGHLIGHT_COLOR : get(el, BG_KEY), !b);
			each(r.cells, function(c){
				setBG(c, b ? HIGHLIGHT_COLOR : get(c, BG_KEY), !b);
			});
		});
	}
	function mouseover(e){
		if(isSameRow(e.relatedTarget, this)) return;
		update(this);
		each(this.rows, function(r){
			set(r, BG_KEY, r.style.backgroundColor);
			each(r.cells, function(c){
				set(c, BG_KEY, c.style.backgroundColor);
			});
		});
		highlight(this);
		listen("mouseout", mouseout, this);
	}
	function mouseout(e){
		if(isSameRow(e.relatedTarget, this)) return;
		highlight(this);
		remove(this);
		unlisten("mouseout", mouseout, this);
	}
	return function(){
		each($("table"), function(t){
			if(~pool.indexOf(t) || !isList(t.tBodies)) return;
			pool.push(t);
			each(t.tBodies, function(r){
				listen("mouseover", mouseover, r);
			});
		});
	}
})();

function fullScan(){
	scanTBody();
	scanTable();
	listen("DOMNodeInserted", rescan);
}

function rescan(){
	unlisten("DOMNodeInserted", rescan);
	window.setTimeout(fullScan, 100);
}
fullScan();
