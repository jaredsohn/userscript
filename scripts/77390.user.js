// ==UserScript==
// @name           reddit - Ignore Untoward
// @namespace        http://www.reddit.com
// @originalby      http://jobson.us
// @changesthread      
// @description    Adds an option to ignore untoward persons of your choosing. 
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

var console = (unsafeWindow.console) ? unsafeWindow.console : '';
var li = setupLI(); // add, del, show
var ul = scanPage(); // Get all comment link sets
var db = {
	list: Untoward('get'),
	add: function(el) {
		var user = getUser(el.parentNode);
		Untoward('add',user);
		UntowardScan();
	},
	del: function(el) {
		var user = getUser(el.parentNode);
		Untoward('del',user);
		UntowardScan();
	},
	show: function(el) {
		var u = el.parentNode;
		toggle(u.parentNode.getElementsByClassName('usertext-body')[0],'show');
		toggle(u.getElementsByClassName('dbDel')[0],'show');
		toggle(u.getElementsByClassName('dbShow')[0],'hide');
	}
}

String.prototype.isUntoward = function() {
	for (var i=0;i<db.list.length;i++) {
		if (db.list[i] == this) return true;
	}
	return false;
}

modifyCSS();
addDBLinks();
UntowardScan();


function UntowardScan() {
	for (var i=0;i<ul.length;i++) {
		var user = getUser(ul[i]);
		if (user.isUntoward()) {
			toggle(ul[i].parentNode.getElementsByClassName('usertext-body')[0],'hide');
			toggle(ul[i].getElementsByClassName('dbAdd')[0],'hide');
			toggle(ul[i].getElementsByClassName('dbDel')[0],'hide');
			toggle(ul[i].getElementsByClassName('dbShow')[0],'show');
		} else {
			toggle(ul[i].parentNode.getElementsByClassName('usertext-body')[0],'show');
			toggle(ul[i].getElementsByClassName('dbDel')[0],'hide');
			toggle(ul[i].getElementsByClassName('dbShow')[0],'hide');
			toggle(ul[i].getElementsByClassName('dbAdd')[0],'show');
		}
	}
}

function toggle(node,state) {
	node.style.display = (state=='hide') ? 'none' : '';
}

function addDBLinks() {
	for (var i=0;i<ul.length;i++) {
		var l;
		l = ul[i].appendChild(li.add.cloneNode(true));
		l.addEventListener('click',function() { db.add(this); },false);
		l = ul[i].appendChild(li.del.cloneNode(true));
		l.addEventListener('click',function() { db.del(this); },false);
		l = ul[i].appendChild(li.show.cloneNode(true));
		l.addEventListener('click',function() { db.show(this); },false);
	}
}

function getUser(node) {
	return node.parentNode.getElementsByTagName('p')[0].getElementsByTagName('a')[0].innerHTML;
}

function Untoward(key,val) {
	switch(key) {
		case 'add':
			db.list.push(val);
			GM_setValue('Untoward',db.list.join(','));
			db.list = Untoward('get');
			break;
		case 'del':
			var d = [];
			for (var i=0;i<db.list.length;i++) {
				if (db.list[i]==val) continue;
				d.push(db.list[i]);
			}
			GM_setValue('Untoward',d.join(','));
			db.list = Untoward('get');
			break;
		case 'get':
			return (GM_getValue('Untoward')) ? GM_getValue('Untoward').split(',') : [];
			break;
	}
}


function scanPage() {
	var sets = document.getElementsByClassName('flat-list');
	var out = [];
	for (var i=0;i<sets.length;i++) {
		// Check to make sure we're in the comment section.
		if ((sets[i].getElementsByTagName('li').length<3 || sets[i].getElementsByTagName('li').length>4)) continue;
		if (sets[i].getElementsByTagName('li')[0].getElementsByTagName('a')[0].innerHTML != 'permalink') continue;
		out.push(sets[i]);
	}
	return out;
}

function setupLI() {
	var out = {};
	var li = document.createElement('li');
		li.style.color = '#888888';
		li.style.fontWeight = 'bold';
	
	out.add = li.cloneNode('true');
	addClass(out.add,'dbAdd');
	out.add.appendChild(document.createTextNode('ignore person'));
	out.del = li.cloneNode('true');
	addClass(out.del,'dbDel');
	out.del.appendChild(document.createTextNode('unignore'));
	out.show = li.cloneNode('true');
	addClass(out.show,'dbShow');
	out.show.appendChild(document.createTextNode('show single comment'));

	return out;
}

function modifyCSS() {
	var s = document.styleSheets[0];
		s.insertRule('li.dbAdd  { cursor: pointer; }',s.cssRules.length);
		s.insertRule('li.dbDel  { cursor: pointer; }',s.cssRules.length);
		s.insertRule('li.dbShow { cursor: pointer; }',s.cssRules.length);
}

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}