// ==UserScript==
// @name           DSSortReportGroups
// @namespace      de.staemme.limone
// @version        1.0.1
// @author         LimonE
// @description    Sortiert die Gruppenlinks in den Berichten.
// @include        http://de*.die-staemme.de/game.php*&screen=report*
// ==/UserScript==

var url = new $U(document.URL), b = true;
if (typeof(url.param.view) != 'undefined') b = false;
if (url.param.mode && url.param.mode.search(/public|block|filter|move|forward/g) != -1) b = false;
if (b) sortIt();

function sortIt() {
	var node	= $x('//html/body/table[4]/tbody/tr/td/table/tbody/tr/td[2]/form[1]/table[1]/tbody/tr[1]/td[1]')[0];
	var links	= $x('a', node);
	var current	= stripMeta($x('strong', node)[0].innerHTML);
	var bool	= (current == 'Neue Berichte' ? true : false);
	var newreports	= (!bool ? links[0].href : null);
	var hash = new $H(), first;
	function stripMeta(s) { return s.replace(/(\s&gt;)|(&lt;\s)|(\s\[)|(\]\s)/g, ''); }
	function addMeta(s, b) { return (!b ? ' ['+s+'] ' : ' &gt;'+s+'&lt; '); }
	for (var i = (bool ? 0 : 1); i < links.length; i++) {
		var key = stripMeta(links[i].innerHTML);
		var value = links[i].href;
		hash.set(key, value);
	}
	if (!bool) hash.set(current, null);
	var sortedKeys = hash.keys().sort();
	node.innerHTML = '';
	if (bool) {
		first = document.createElement('strong');
		first.innerHTML = addMeta('Neue Berichte', true);
	}
	else {
		first = document.createElement('a');
		first.innerHTML = addMeta('Neue Berichte');
		first.href = newreports;
	}
	node.appendChild(first);
	for (var i = 0; i < sortedKeys.length; i++) {
		var elem, key = sortedKeys[i];
		if (current == key) {
			elem = document.createElement('strong');
			elem.innerHTML = addMeta(key, true);
		}
		else {
			elem = document.createElement('a');
			elem.innerHTML = addMeta(key);
			elem.href = hash.get(key);
		}
		node.appendChild(elem);
	}
}


// Utils

// Hash class
function $H() {
	this._items 	= new Array();
	this._keys 	= new Array();
	this.length 	= function() { return this._keys.length; };
	this.keys 	= function() { return this._keys; };
	this.get 	= function(k) { return this._items[k]; };
	this.hasKey	= function(k) { return typeof(this._items[k]) != 'undefined'; };
	this.set	= function(k, v) {
		if (typeof(v) != 'undefined') {
			if (!this.hasKey(k)) this._keys.push(k);
			this._items[k] = v;	
		}
	};
}

// URI class
function $U(u) {
	var p = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$');
	var r = u.match(p);
	if (!r) return;
	this.scheme	= r[2] || (r[1] ? '' : null);
	this.authority	= r[4] || (r[3] ? '' : null);
	this.path	= r[5];
	this.query	= r[7] || (r[6] ? '' : null);
	this.fragment	= r[9] || (r[8] ? '' : null);
	this.param	= new ParamList(this.query);
	function ParamList(s) {
		var a = s.split('&');
		for (var i = 0; i < a.length; i++) {
			var n = a[i].split('=')[0];
			var w = a[i].split('=')[1];
			this[n] = w;
		}
	}
}

// XPath function
function $x(e, n) {
	if (!n) n = document;
	var f = [], r = document.evaluate(e, n, null, 0, null);
	while (i = r.iterateNext()) f.push(i);
	return f;
}