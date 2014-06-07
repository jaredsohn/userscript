// ==UserScript==
// @name              TD Marker
// @author            modestein
// @description       通用列表标记脚本，鼠标左键点选行或鼠标左键在行上按住拖拽可以对列表行进行标记/取消标记
// @create            2010-10-01
// @lastmodified      2010-10-12
// @version           1.1
// @namespace         modestein
// @include           *
// ==/UserScript==

const HIGHLIGHT_COLOR = "peachpuff";
const BG_KEY = "TD_MARKER_bgColor";
const HL_KEY = "TD_MARKER_highlight";
const MIN_VALID_LINE_HEIGHT = 20;
const MAX_VALID_LINE_HEIGHT = 80;
const MIN_VALID_LINE_LENGTH = 15;
const SELECT_START_TOLERATE = 15;
let each = Array.forEach, pool = [];
function $(s, el){
	return (el || document).querySelectorAll(s);
}
function get(el, key){
	return el.getUserData(key);
}
function set(el, key, value){
	return el.setUserData(key, value, null);
}
function setBG(el, color){
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
function $row(el, tb){
	while(el && el.parentNode != tb) el = el.parentNode;
	return el;
}
function inBlank(e, el){
	var mx = e.clientX, my = e.clientY;
	return Array.every($("td>*,th>*", el), function(n){
		var c = n.getBoundingClientRect(), d = SELECT_START_TOLERATE;
		return mx > c.right + d || mx < c.left - d || my < c.top - d || my > c.bottom + d;
	});
}

let scanTBody = (function(){
	var start = -1, last = -1, cur = null;
	function highlight(el){
		var b = !set(el, HL_KEY, !get(el, HL_KEY));
		setBG(el, b ? HIGHLIGHT_COLOR : get(el, BG_KEY));
		each(el.cells, function(c){
			setBG(c, b ? HIGHLIGHT_COLOR : get(c, BG_KEY));
		});
	}
	function mousedown(e){
		var t = e.target, r = $row(t, this), ot = e.explicitOriginalTarget.nodeType;
		if(r && !e.button && ot !=3 && inBlank(e, r)){
			last = start = r.rowIndex;
			highlight(r);
			listen("mouseover", mouseover, cur = this);
			listen("mouseup", finish);
			listen("blur", finish);
			e.preventDefault();
		}
	}
	function mouseover(e){
		var r = $row(e.target, this), idx = r && r.rowIndex;
		if(r && start != -1 && last != idx){
			var a = [last, idx], d1 = start - a[0], d2 = start - a[1], d = (d1 < 0) * 2 - 1, n = +(a[0] < a[1]);
			d1 * d2 > 0 && (a[+(d * d1 < d * d2)] += d);
			for(var rs = this.parentNode.rows, i = a[1 - n]; i <= a[n]; i++){
				i != start && highlight(rs[i]);
			}
			last = idx;
			getSelection().removeAllRanges();
		}
	}
	function finish(e){
		unlisten("mouseover", mouseover, cur);
		unlisten("mouseup", finish);
		unlisten("blur", finish);
		last = start = -1;
		cur = null;
	}
	return function(){
		each($("tbody"), function(t){
			if(~pool.indexOf(t) || !isList(t.rows)) return;
			pool.push(t);
			listen("mousedown", mousedown, t);
			each(t.rows, function(r){
				set(r, BG_KEY, r.style.backgroundColor);
				each(r.cells, function(c){
					set(c, BG_KEY, c.style.backgroundColor);
				});
			});
		});
	}
})();


let scanTable = (function(){
	var start = -1, last = -1, cur = null;
	function highlight(el){
		var b = !set(el, HL_KEY, !get(el, HL_KEY));
		each(el.rows, function(r){
			setBG(r, b ? HIGHLIGHT_COLOR : get(r, BG_KEY));
			each(r.cells, function(c){
				setBG(c, b ? HIGHLIGHT_COLOR : get(c, BG_KEY));
			});
		});
	}
	function index(tbody){
		for(var i = 0, t = tbody.parentNode.tBodies; !t[i].isSameNode(tbody); i++);
		return i;
	}
	function mousedown(e){
		var t = e.target, r = $row(t, this), ot = e.explicitOriginalTarget.nodeType;
		if(r && !e.button && ot !=3 && inBlank(e, r)){
			last = start = index(r);
			highlight(r);
			listen("mouseover", mouseover, cur = this);
			listen("mouseup", finish);
			listen("blur", finish);
			e.preventDefault();
		}
	}
	function mouseover(e){
		var r = $row(e.target, this), idx = r && index(r);
		if(r && start != -1 && last != idx){
			var a = [last, idx], d1 = start - a[0], d2 = start - a[1], d = (d1 < 0) * 2 - 1, n = +(a[0] < a[1]);
			d1 * d2 > 0 && (a[+(d * d1 < d * d2)] += d);
			for(var rs = this.tBodies, i = a[1 - n]; i <= a[n]; i++){
				i != start && highlight(rs[i]);
			}
			last = idx;
			getSelection().removeAllRanges();
		}
	}
	function finish(e){
		unlisten("mouseover", mouseover, cur);
		unlisten("mouseup", finish);
		unlisten("blur", finish);
		last = start = -1;
		cur = null;
	}
	return function(){
		each($("table"), function(t){
			if(~pool.indexOf(t) || !isList(t.tBodies)) return;
			pool.push(t);
			listen("mousedown", mousedown, t);
			each(t.tBodies, function(tb){
				each(tb.rows, function(r){
					set(r, BG_KEY, r.style.backgroundColor);
					each(r.cells, function(c){
						set(c, BG_KEY, c.style.backgroundColor);
					});
				});
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