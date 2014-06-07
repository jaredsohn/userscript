// ==UserScript==
// @name           Haloscan comments repairs and upgrades
// @description    lets you ban (sort of) people on haloscan, and alternately colours the comments for readability
// @namespace      http://www.userscripts.org/scripts/show/3218
// @include        http://www.haloscan.com/comments/*
// @include        http://www.haloscan.com/comments.php*
// ==/UserScript==

//	This script has been tested in Firefox 1.5 with GreaseMonkey and also in MSIE6.0 with reifysoft.com's Turnabout (under wine)

var settings = [];
settings['blockedp'] = null;
settings['posts'] = null;
settings['msgs'] = null;

settings['postid'] = location.pathname.replace(/^\/comments\/([^\/]+)\/$/, '$1');
settings['account'] = location.pathname.replace(/^\/comments\/(.*)\/.*\/$/, '$1');

settings['inited'] = false;
settings['lastid'] = null;
settings['viewed'] = null;

settings['premium-'+ settings['account']] = false;

settings['settings_form'] = null;

settings['done_layout'] = false;
settings['done_clean'] = false;	

// list the options that are listed in the settings table
settings['editable'] = {'bgcolour': [getcolour], 'evencolour': [getcolour], 'oddcolour': [getcolour], 'evenfgcolour': [getcolour],
						'oddfgcolour': [getcolour], 'point': [getbool], 'layout': [getbool], 'textareafix': [getbool], 
						'firsttolast': [getbool], 'bylinetotop': [getbool], 'showcount': [getbool],
						'justify': [getbool] /*, 'invertblocked': [getbool, function(){ settings['blockedp'] = [] }] */};

// set defaults for the editable settings
settings['bgcolour'] = 'white';
settings['evencolour'] = '#EEEEEE';
settings['oddcolour'] = 'white';
settings['evenfgcolour'] = 'black';
settings['oddfgcolour'] = 'green';
settings['point'] = true;
settings['layout'] = true;
settings['clean'] = true;
settings['textareafix'] = true;
settings['firsttolast'] = true;
settings['bylinetotop'] = true;
settings['enablegravatars'] = true;
settings['showcount'] = false;
settings['invertblocked'] = false;
settings['justify'] = false;
settings['numposts'] = 200;
settings['numblocked'] = 400;

function load() {
	if(GM_getValue) {
		settings['blockedp'] = GM_getValue('blocked','').split(/\n/);
		settings['premium-'+ settings['account']] = GM_getValue('premium-'+ settings['account'], false);
		var getposts = GM_getValue('posts','').split(/\n/);
		var posts = [];
		for(var i = 0; i < getposts.length; i++) {
			var c = getposts[i].split(/\:\:/);
			if(c.length == 4)
				posts[c[0]] = new posttype(c[1],parseInt(c[2], 10),parseInt(c[3], 10));
		}

		if(!settings['inited']) {
			settings['inited'] = true;
			var postid = settings['postid'];
			if(typeof posts[postid] == 'undefined') {
				settings['viewed'] = 0;
				settings['lastid'] = -1;
			}
			else {
				// move this post back in the age list
				var prev = posts[postid].age;
				posts[postid].age /= 2;
				for(var e in posts)
					if(e != postid && posts[e].age >= posts[postid].age && posts[e].age <= prev)
						posts[e].age++;
				
				settings['lastid'] = posts[postid].lastid;
				settings['viewed'] = posts[postid].comments;
			}
		}
		
		settings['posts'] = posts;
		
		// load editable options
		var editable = settings['editable'];
		for(var e in editable)
			settings[e] = GM_getValue(e, settings[e]);
	}
}

function save() {
	if(GM_setValue) {
		blockedp = settings['blockedp'];
		if(blockedp.length > settings['numblocked'])
			blockedp = blockedp.splice(blockedp.length - settings['numblocked']);
			
		GM_setValue('blocked', blockedp.join('\n').replace(/\n\n+/, '\n'));
		var str = '';
		var posts = settings['posts'];
		for(var v in posts)
			if(typeof posts[v] != 'undefined' && posts[v].age < settings['numposts']) 
				str += v +'::'+ posts[v].comments +'::'+ posts[v].lastid +'::'+ posts[v].age +'\n';
		GM_setValue('posts', str);
		
		// save editable options
		var editable = settings['editable'];
		for(var e in editable)
			GM_setValue(e, settings[e]);
	}
}

var seenp = {};
function seen(name) {
	seenp[name] = true;
}

function seen_update() {
	blockedp = settings['blockedp'];
	
	var lastseen = null;
	var lastblocked = null;

	for(var i = 0; i < blockedp.length; i++) {
		var name = blockedp[i];
		if(seenp[name] == true) {
			blockedp.splice(i, 1);
			blockedp.push(name);
		}
	}
	
	settings['blockedp'] = blockedp;
	delete seenp;
}

// check whether name is blocked
function blocked(name) {
	for(var i = 0; i < settings['blockedp'].length; i++)
		if(settings['blockedp'][i] == name)
			return !settings['invertblocked'];	
	return settings['invertblocked'];
}

// toggle who's blocked status. keep the viewpoints position relative to a
function block(who, a) {
	// someone may have been blocked in another window
	load();
	
	var blockedp = settings['blockedp'];	
	var i = 0;
	for(; i < blockedp.length; i++)
		if(blockedp[i] == who) break;
	var blockp = (i == blockedp.length);
	if(blockp) blockedp.push(who);
	else if(i + 1 == blockedp.length) blockedp.pop();
	else blockedp[i] = blockedp.pop();
	
	settings['blockedp'] = blockedp;
	save();
	
	// y keeps track of the change in viewpoint caused by the shrinking
	// yp keeps the viewpoint on track if the shrinking causes the scrolling to hit the bottom of the page. should only change from 0 when it does this
	var y = offsetTopAbs(a);
	var yp = pageYOffset();

	if(settings['clean']) clean(blockp, who);
	
	y -= offsetTopAbs(a);
	yp -= pageYOffset();

	// make it appear as though the user has not moved relative to the link clicked
	// this is a piece of silly hackery, but it works
	window.scrollBy(0, yp - y);
}


// put the block button in the byline
// actually pretties up the whole byline
// byline must have no parent node
function insertButtons(byline, name) {
	
	var a = document.createElement('A');
	a.href = 'javascript:;';
	a.target = '_self';
	a.innerHTML = '[X]';
	a.style.color = 'red';
	var blockfunc = function(){ block(name, a); };
	addEventListener(a, 'click', blockfunc, true);
	
	var table = document.createElement("TABLE");
	var tbody = cb("TBODY", table);
	var tr = cb("TR", tbody);
	var td1 = cb("TD", tr);
	var td2 = cb("TD", tr);
	
	table.className = 'byline_holder';
	table.width = '100%';
	td1.width = '100%';
	td1.vAlign = 'top';
	td2.vAlign = 'top';
	td1.insertBefore(byline, td1.firstChild);
	td2.insertBefore(a, td2.firstChild);
	
	return table;
}

// sorts the comments into the the layout and puts the msgs array into first to last order
function sort() {
	var msgs = settings['msgs'];
	
	if(msgs.length > 1) {
		var order = settings['firsttolast'];
		var first = parseid(msgs[0]);
		var second = parseid(msgs[1]);
		var isfirsttolast = ((first === null || second === null) || first < second);
		
		var tbody = find(find(document, {'nodeName': 'TABLE', 'className': 'MainTable'}), {'nodeName': 'TBODY'});
		var next = msgs[msgs.length - 1].parentNode.nextSibling;
		
		if(!isfirsttolast)
			msgs = msgs.reverse();
		
		if(order != isfirsttolast) {
			for(var i = msgs.length - 1; i >= 0; i--) {
				var tr = msgs[i].parentNode;
				tbody.removeChild(tr);
				tbody.insertBefore(tr, next);
			}
		}	
	}
	
	settings['msgs'] = msgs;
}

// does the initial formatting
function layout() {
	settings['done_layout'] = true;
	
	// change bgcolour 
	document.body.style.backgroundColor = settings['bgcolour'];
	
	// remove all HR's
	addGlobalStyle('HR { display: none ! important; }');
	
	var msgs = settings['msgs'];
	
	var colour = false;
	var evencolour = settings['evencolour'], oddcolour = settings['oddcolour'], 
		evenfgcolour = settings['evenfgcolour'], oddfgcolour = settings['oddfgcolour'];
	for(var i = 0; i < msgs.length; i++) {
		var td = msgs[i];
		
		var byline = find(td, {'className': 'byline'});
		byline.parentNode.removeChild(byline);
		var name = nameof(byline);
		var bylinetbl = insertButtons(byline, name);
		
		var a = find(td, {'nodeName': 'A', 'name': null});
		a.parentNode.removeChild(a);
		
		var div = ce('DIV');
		div.id = 'BY:'+ name;
		div.className = 'MessageBody';
		if(settings['justify']) div.style.textAlign = 'justify';
		
		for(var c = td.firstChild, d = null; c; c = d) {
			d = c.nextSibling;
			td.removeChild(c);
			div.appendChild(c);
			
			if(c.style) {
				c.style.backgroundColor = colour? evencolour : oddcolour
				c.style.color = colour? evenfgcolour : oddfgcolour;
			}
		}
		
		// alternate the colours of the comments
		if(colour) {
			td.style.backgroundColor = settings['evencolour'];
			td.style.color = settings['evenfgcolour'];
			byline.style.color = settings['evenfgcolour'];
		}
		else {
			td.style.backgroundColor = settings['oddcolour'];
			td.style.cColor = settings['oddfgcolour'];
			byline.style.color = settings['oddfgcolour'];
		}
		
		colour = !colour;
		
		td.appendChild(a);
		td.appendChild(bylinetbl);
		td.appendChild(div);
	}
}

// hides unwanted posters
function clean(block, name) {
	settings['done_clean'] = true;
	var msgs = settings['msgs'];
	var hash = settings['msgs_hash'];
	
	// everyone likes a downward closure
	function blockmsgs(n) {
		var a = hash[n];
		for(var i = 0; i < a.length; i++) {
			var td = msgs[a[i]];
			var byline = find(td, {'nodeName': 'TABLE', 'className': 'byline_holder'});
			var div = find(td, {'nodeName': 'DIV', 'className': 'MessageBody'});
			
			if(block) {
				div.style.display = 'none';
				byline.style.fontSize = '8px';
			}
			else {
				div.style.display = '';
				byline.style.fontSize = '';
			}
		}
	}
	if(name == null) {
		for(var n in hash)
			if(blocked(n) == block)
				blockmsgs(n);
	}
	else
		blockmsgs(name);
}

// moves the window to the last message viewed
function point_move(min) {
	if(min == 0 && !settings['firsttolast']) return;
	
	var msgs = settings['msgs'];
	
	if(point_move.prototype.last !== null) {
		if(point_move.prototype.last >= 0 && point_move.prototype.last < msgs.length)
			window.scrollTo(0, offsetTopAbs(msgs[point_move.prototype.last]));
		return;
	}
	
	var lastid = settings['lastid'];
	var viewed = settings['viewed'];

	// find the last message viewed -- binary search
	var gotomsg = -1;
	var id = null;
	if(lastid != -1 && msgs.length != 0) {
		var min = 0, max = msgs.length - 1;
		while(gotomsg = ((min + max) >> 1)) {
			var m = msgs[gotomsg];
			
			id = parseid(m);			
			if(lastid >= id) min = gotomsg + 1;
			else if(lastid < id) max = gotomsg - 1;
			if(min >= max) break;
		}
		
		while(gotomsg < msgs.length && parseid(msgs[gotomsg]) <= lastid) gotomsg++;
	}
	point_move.prototype.last = gotomsg;
	
	var y = null;
	// accurately go to the message
	if(gotomsg >= 1 && gotomsg < msgs.length)
		y = offsetTopAbs(msgs[gotomsg]);

	if(y !== null)
		window.scrollTo(0, y);
}
point_move.prototype.last = null;

// update the last viewed message data
function point_update() {
	var posts = settings['posts'];
	var postid = settings['postid'];
	var msgs = settings['msgs'];
	
	// load(); -- not needed; one completed recently
	if(typeof posts[postid] == 'undefined') {
		posts[postid] = new posttype(msgs.length, parseid(msgs[msgs.length - 1]), 0);
		for(var v in posts)
			if(typeof posts[v] == 'undefined') delete posts[v];
			else posts[v].age++;
	}
	else {
		var lastid = parseid(msgs[msgs.length - 1]);
		if(lastid >= posts[postid].lastid) {
			posts[postid].comments = msgs.length;
			posts[postid].lastid = lastid;
		}
	}
	settings['posts'] = posts;
}

function point() {
	point_move(1);
	point_update();
}

function normalise(root) {
	function replaceChildren(r, p) {
		var d;
		for(var c = p.firstChild; c !== null; c = d) {
			d = c.nextSibling;
			p.removeChild(c);
			r.insertBefore(c, r.lastChild);
		}
	}
	
	for(var c = root.firstChild; c !== null; c = c.nextSibling) {
		switch(c.nodeName) {
		// does not modify element
		case 'A':
		case 'B':
		case 'I':
		//case 'BR':
		case '#text':
			break;
			
		case 'BR':
			root.replaceChild(document.createTextNode('\n'), c);
			break;
		
		case 'STRONG':
			var replace = ce('B');
			replaceChildren(replace, c);
			root.replaceChild(replace, c);
			c = replace;
			break;
			
		case 'EM':
			var replace = ce('I');
			replaceChildren(replace, c);
			root.replaceChild(replace, c);
			c = replace;
			break;
		
		case 'P':
			var next = c.firstChild;
			for(var cc = next; cc !== null; cc = c.firstChild) {
				c.removeChild(cc);
				root.insertBefore(cc, c);
			}
			
			root.insertBefore(ce('BR'), c);
			root.insertBefore(ce('BR'), c);
			root.removeChild(c);
			c = next;
			break;
			
		// convert
		case 'SPAN':
			if(c.style.fontWeight == 'bold' && c.style.fontStyle == 'italic') {
				var bold = ce('B');
				var italic = ce('I');
				bold.appendChild(italic);
				replaceChildren(italic, c);
				root.replaceChild(bold, c);
				c = italic;
				break;
			}
			else if(c.style.fontWeight == 'bold') {
				var replace = ce('B');
				replaceChildren(replace, c);
				root.replaceChild(replace, c);
				c = replace;
				break;
			}
			else if(c.style.fontStyle == 'italic') {
				var replace = ce('I');
				replaceChildren(replace, c);
				root.replaceChild(replace, c);
				c = replace;
				break;
			}
			// fall through to default if none of these apply
		
		// remove
		default:
			var cc = c.lastChild;
			if(cc == null) {
				root.removeChild(c);
				continue;
			}
			
			var last = c.lastChild;
			for(; cc !== null; cc = c.firstChild) {
				c.removeChild(cc);
				root.insertBefore(cc, c);
			}
			root.removeChild(c);
			c = last;
			break;
		}
		
		normalise(c);
	}
}

function richtext_textarea() {
	var form = document.forms[0], textarea = null;
	for(var i = 0; i < form.elements.length; i++)
		if(form.elements[i].name == 'addMessage') {
			textarea = form.elements[i];
			break;
		}
	if(textarea == null) throw('no textarea found');
	return [form, textarea];
}

function richtext_editable(bodycontent, textarea) {
	this.element = null;
	this.e_window = null;
	this.e_document = null;
	this.e_body = null;
	this.execCommand = null;
	this.textarea = textarea;
	
	if(document.all) {
		var editable =
		this.element =
		this.e_window =
		this.e_document =
		this.e_body =
			ce('DIV');
		
		this.execCommand = function(cmd, b, option) { document.execCommand(cmd, b, option); };
		
		editable.style.overflow = 'auto';
		editable.contentEditable = 'true';
		richtext_load(this, bodycontent);
	}
	else {
		var editable =
		this.element =
			ce('IFRAME');
		
		richtext_finalise(this, bodycontent);
	}
}

function richtext_load(element, bodycontent) {
	try {
		var html = '<html><head><style type="text/css"> BODY { font-size: small; background-colour: white; } </style></head><body></body></html>';
		
		element.e_document.open();
		element.e_document.write(html);
		element.e_document.close();
	
		var body = document.all ? element.e_document : element.e_document.body;
		body.innerHTML = bodycontent.replace(/\n/g, '<BR>');
		normalise(body);
		
		var event_handler = richtext_event(element, element.textarea);
		addEventListener(element.element.contentWindow.document, 'keypress', event_handler, true);
	}
	catch(e) {}
}

function richtext_finalise(editable, bodycontent) {
	if(!document.all) {
		try {
			editable.element.contentWindow.document.designMode = 'on';
			
			try {
				editable.e_window = editable.element.contentWindow;
				editable.e_document = editable.element.contentWindow.document;
				editable.e_body = editable.element.contentWindow.document.body;
				richtext_load(editable, bodycontent);
				
				editable.e_window = editable.element.contentWindow;
				editable.e_document = editable.element.contentWindow.document;
				editable.e_body = editable.element.contentWindow.document.body;
				editable.execCommand = function(cmd, b, option) { editable.element.contentWindow.document.execCommand(cmd, b, option); };
			}
			catch(e) {}
		}
		catch(e) {
			setTimeout(function(){ richtext_finalise(editable, bodycontent); }, 10);
		}
	}
}

function richtext_event(element, textarea) {
	var kbcmd = function(e) {
		if(e.ctrlKey) {
			var key = String.fromCharCode(e.charCode).toLowerCase();
			var cmd = null;
			
			switch(key) {
				case 'b': cmd = 'bold'; break;
				case 'i': cmd = 'italic'; break;
				// commands allowed to be handled by the browser
				case 'a':
				case 'z':
				case 'x':
				case 'c':
				case 'v':
					return true;
			}
			
			if(cmd !== null)
				richtext_command(element, cmd, null);
			if(e.stopPropagation) e.stopPropagation();
			if(e.preventDefault) e.preventDefault();
			return false;
		}
		return true;
	};
	
	if(document.all) {		
		return function(e) {
			if(e.keyCode == 13) { 
				var rng = document.selection.createRange(); 
				rng.pasteHTML('<br /><span style="display: none;"></span>'); 
				return false; 
			}
			return kbcmd(e);
		};
	}
	else 
		return kbcmd;
}

function richtext_command(element, cmd, option) {
	try {
		element.e_window.focus();
		element.execCommand(cmd, false, option);
		element.e_window.focus();
	}
	catch(e) {}
}

function richtext() {
	var formparts = richtext_textarea();
	var form = formparts[0], textarea = formparts[1];
	var bodycontent = textarea.value;
	textarea.style.display = 'none';
	var editable = new richtext_editable(bodycontent, textarea);
		
	var table = ce('TABLE');
	var tbody = ce('TBODY');
	var tr1 = ce('TR');
	var tr2 = ce('TR');
	var td1 = ce('TD');
	var td2 = ce('TD');
	var b = ce('INPUT');
	var i = ce('INPUT');
	var a = ce('INPUT');
	
	b.type = 'button';
	i.type = 'button';
	a.type = 'button';
	
	table.appendChild(tbody);
	tbody.appendChild(tr1);
	tbody.appendChild(tr2);
	tr1.appendChild(td1);
	tr2.appendChild(td2);
	td1.appendChild(b);
	td1.appendChild(document.createTextNode(' '));
	td1.appendChild(i);
	td1.appendChild(document.createTextNode(' '));
	td1.appendChild(a);
	td2.appendChild(editable.element);
	
	table.style.width = '100%';
	table.style.border = 'thin outset #808080';
	table.style.backgroundColor = '#EEEEEE';
	td1.style.backgroundColor = '#EEEEEE';
	td2.style.backgroundColor = '#EEEEEE';
	td2.style.height = '225px';
	td1.align = 'right';
	b.value = 'B';
	b.style.fontWeight = 'bold';
	addEventListener(b, 'click', function() { richtext_command(editable, 'bold', null); }, true);
	i.value = 'I';
	i.style.fontStyle = 'italic';
	addEventListener(i, 'click', function() { richtext_command(editable, 'italic', null); }, true);
	a.value = 'Link';
	addEventListener(a, 'click', function() {
			var addr = prompt('Link to:', 'http://');
			richtext_command(editable, 'UnLink', null);
			if(addr) richtext_command(editable, 'CreateLink', addr);
			return false;
		}, true);
	
 	textarea.parentNode.insertBefore(table, textarea);
 	
	editable.element.style.width = '100%';
	editable.element.style.height = '100%';
	editable.element.style.border = 'thin inset #808080';
	editable.element.style.backgroundColor = 'white';
	
	var unloader = function(e) { normalise(editable.e_body); textarea.value = editable.e_body.innerHTML; table.parentNode.removeChild(table); };
 	addEventListener(form, 'submit', unloader, true);
	addEventListener(window, 'unload', unloader, true);
}

function savesettings() {
	var frm = settings['settings_form'];
	var editable = settings['editable'];
	
	for(var e in editable) {
		var orig = settings[e];
		el = find(frm, {'nodeName': 'INPUT', 'name': e});
		
		settings[e] = editable[e][0](el);
		if(settings[e] != orig && editable[e].length == 2)
			editable[e][1](el);
	}
	
	save();
	
	alert('Settings saved!\nRefresh to see changes.');
}

function drawsettings() {
	var center = cb('CENTER', document.body);
	var show = cb('SPAN', center);
	
	var div = cb('TABLE', document.body);
	div.style.position = 'fixed';
	div.style.top = '0px';
	div.style.left = '0px';
	div.style.right = '0px';
	div.style.bottom = '0px';
	div.style.backgroundColor = 'white';
	div.style.width = '100%';
	div.style.height = '100%';
	div.style.display = 'none';
	
	var show_button = cb('A', show);
	addEventListener(show_button, 'click', function(){ 
			// shocking hack for IE
			var e = findall(div, {'nodeName':'INPUT', 'type':'checkbox'}); 
			for(var i = 0; i < e.length; i++) e[i].checked = settings[e[i].name];
			// display the table - IE needs this to be an ugly hack.
			
			try { div.style.display = 'table'; } 
			catch(e) { div.style.display = 'inline'; }
			
		},
		false);
	show_button.innerHTML = 'show settings panel';
	show_button.style.cursor = 'pointer';
	
	tb = cb('TBODY', div);
	tr = cb('TR', tb);
	td = cb('TD', tr);
	td.align = 'center';
	td.vAlign = 'middle';
	
	var frm = cb('FORM', td);
	
	cb('BR', center);
	cb('BR', center);
	var span = cb('SPAN', center);
	span.innerHTML = 'Fixed by <a style="cursor:pointer;">Simon</a>';
	
	var tbl = cb('TABLE', frm);
	tbl.style.border = 'black thin outset';
	tbl.style.fontSize = 'x-small';
	tbl.style.backgroundColor = '#EEEEEE';
	tbl.style.color = 'black';
	
	var bdy = cb('TBODY', tbl);
	
	settings['settings_form'] = bdy;

	var st = function(t) {
		var tr = cb('TR', bdy);
		var td = cb('TD', tr);
		td.colspan = 2;
		td.innerHTML = t;
		return [tr, td];
	};
	
	var sl = function(n, pn, type) {
		var tr = cb('TR', bdy);
		var td1 = cb('TD', tr);
		td1.innerHTML = pn;
		var td2 = cb('TD', tr);
		td1.align = 'left';
		td2.align = 'center';
		
		var el = cb('INPUT', td2);
		switch(type) {
		case 'bool':
			el.type = 'checkbox';
			el.name = n;
			el.checked = settings[n];
			break;
		
		case 'int':
			el.type = 'text';
			el.name = n;
			el.value = settings[n];
			el.size = 6;
			el.style.textAlign = 'right';
			var numeric = function(e) { el.value = el.value.replace(/[^\d]/, ''); if(el.value == '') el.value = '0'; };
			addEventListener(el, 'keypress', numeric, true);
			addEventListener(el, 'keyup', numeric, true);
			break;
			
		case 'colour':
			el.type = 'text';
			el.name = n;
			el.size = 7;
			el.value = settings[n];
			td1.style.backgroundColor = settings[n];
			break;
			
		case 'submit':
			el.type = 'button';
			el.value = n;
			addEventListener(el, 'click', function() { savesettings(); }, false);
			break;
			
		}
	};
	
	var title = st('<span style="font-size: small; font-weight: bold;">Haloscan Fixer Settings</span>');
	title[1].colspan = '1';
	var xtd = cb('TD', title[0]);
	xtd.align = 'right';
	var a = cb('A', xtd);
	a.innerHTML = '[X]';
	a.style.color = 'red';
	a.style.cursor = 'pointer';
	addEventListener(a, 'click', function() { div.style.display = 'none'; }, false);
	
	if(GM_setValue && GM_getValue) {
		st('<b>Appearance</b>');
		sl('layout', 'Change the layout and use blocking:', 'bool');
		sl('bylinetotop', '<div style="text-indent: 10px;">-&gt;Move byline to top of comments:</div>', 'bool');
		//sl('enablegravatars', 'Enable gravatars:', 'bool');
		sl('showcount', 'Show comment count:', 'bool');
		
		st('<b>Behaviour</b>');
		sl('point', 'Move to new comments:', 'bool');
		sl('firsttolast', 'Show in first to last order:', 'bool');
		sl('textareafix', 'Rich text editor for comments:', 'bool');
		
		// this option doesn't work
		//sl('invertblocked', 'Block all by default:', 'bool');
		
		// the following 3 settings are silly or unnecessary
		sl('justify', 'Justify comments:', 'bool');
		//sl('numposts', 'Maximum number of posts to track:', 'int');
		//sl('numblocked', 'Maximum number of blocked commentors:', 'int');
		
		st('<b>Colours</b> (<a target="_new" href="http://www.immigration-usa.com/html_colors.html">eg</a>)');
		sl('bgcolour', 'Background colour:', 'colour');
		sl('evencolour', 'Comment colour 1:', 'colour');
		sl('oddcolour', 'Comment colour 2:', 'colour');
		sl('evenfgcolour', 'Comment text 1:', 'colour');
		sl('oddfgcolour', 'Comment text 2:', 'colour');
	
		sl('save', '', 'submit');
	}
	else
		st('<span style="color:red;">You need to upgrade to the latest version of GreaseMonkey, yours lacks features necessary for changing settings.</span>');
	
	cb_commit();
}

function commentcount() {
	var viewed = settings['viewed'];
	var msgs = settings['msgs'];
	var msgcount = cb('DIV', document.body);
	if(viewed == msgs.length) {
		if(msgs.length == 1) msgcount.innerHTML = 'There is 1 comment';
		else msgcount.innerHTML = 'There are '+ msgs.length +' comments';
	}
	else if(viewed == 0) {
		if(msgs.length == 1) msgcount.innerHTML = 'There is 1 new comment';
		else msgcount.innerHTML = 'There are '+ msgs.length +' new comments';
	}
	else {
		if(msgs.length == 1) msgcount.innerHTML = 'There is 1 new comment';
		else {
			msgcount.innerHTML = 'There are '+ msgs.length +' comments ('+ (msgs.length - viewed) +' ';
			var a = cb('A', msgcount);
			a.innerHTML = 'new';
			a.style.cursor = 'pointer';
			addEventListener(a, 'click', function() { point_move(0); }, false);
			var br = cb('SPAN', msgcount);
			br.innerHTML = ')';
		}
	}
	
	msgcount.style.backgroundColor = '#F0F0F0';
	msgcount.style.position = 'fixed';
	msgcount.style.bottom = 0;
	msgcount.style.right = 0;
	msgcount.style.borderTop = 'thin gray inset';
	msgcount.style.borderLeft = 'thin gray inset';
	msgcount.style.paddingTop = '2px';
	msgcount.style.paddingLeft = '5px';
	msgcount.style.paddingRight = '5px';
	msgcount.style.color = 'black';
	
	cb_commit();
}

function getmessages() {
	var mt = find(document.body, {'nodeName': 'TABLE', 'className': 'MainTable'});
	var msgs = findall(mt, {'nodeName': 'TD', 'className': 'MessageCell'});
	var hash = {};
	for(var i = 0; i < msgs.length; i++) {
		var name = nameof(msgs[i]);
		if(hash[name]) hash[name].push(i);
		else hash[name] = [i];
		seen(name);
	}
	seen_update();
	
	settings['maintable'] = mt;
	settings['msgs'] = msgs;
	settings['msgs_hash'] = hash;
}

function startup() {
	//GM_log('start');
	// silly refresh annoyance fix
	var yper = window.pageYOffset / document.height;
	
	//GM_log('load');
	load();
	

	//GM_log('getmessages');
	getmessages();
	
	//GM_log('sort');
	sort();
	
	//GM_log('count');
	if(settings['showcount']) commentcount();
	
	if(settings['layout']) {
		//GM_log('layout');
		layout();
		//GM_log('clean');
		clean(true, null);
	}
	
	//GM_log('textareafix');
	if(settings['textareafix']) {
		//textareafix();
		richtext();	
	}
	
	//GM_log('settings');
	drawsettings();
	
	// before point as it takes precedence
	if(yper * document.height > 0)
		window.scrollTo(0, yper * document.height);
	
	//GM_log('point');
	if(settings['point']) point();
	
	addEventListener(window, 'unload', removeAllEventListeners, false);
	
	save();
	//GM_log('end');
}

// little helper functions for getting stuff from the settings form
function getcolour(el) {
	colour = el.value;
	if(!isColour(colour)) colour = 'white';
	el.parentNode.previousSibling.style.backgroundColor = colour;
	return colour;
}

function getbool(el) {
	return el.checked;
}

function getint(el) {
	el.value = el.value.replace(/[^\d]+/, '');
	if(el.value == '') el.value = '0';
	return parseInt(el.value, 10);
}

// type for the posts array
function posttype(comments, lastid, age) {
	this.comments = comments;
	this.lastid = lastid;
	this.age = age;
}

// get the name from a byline
function nameof(msg) {
	if(msg.nodeName == 'TD')
		msg = find(msg, {'nodeName': 'SPAN', 'className': 'byline'});
	var text = msg.innerHTML.replace(/\n/g,'');
	var name = text.replace(/^\s*([^<>]+)(\s+\|.*){2}.*$/, '$1');
	return name;
}

// get the id of a msg
function parseid(msg) {
	try {
		// the first <a> element in the div should be the anchor
		var i = parseInt(find(msg, {'nodeName': 'A'}).name);
		if(isNaN(i)) return -1;
		else return i;
	} catch (e) {
		// but who can be sure?
		return -1;
	}
}

// find the offset of obj from the top of the page
function offsetTopAbs(obj) {
	var curtop = 0;
	while (obj.offsetParent) {
		curtop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	if (obj.y)
		curtop = obj.y;
		
	return curtop;
}

// some DOM manipulation shortcuts -- badly named on purpose
function ce(e) {
	return document.createElement(e);
};

// these save the things to change in a list - makes it quicker in FF and actually work in IE
var cb_tocommit = [];

// create element of type t and append to p
function cb(t, p) {
	var e = ce(t);
	cb_tocommit.push([true, e, p, null]);
	return e;
};

// remove element e from p
function re(e, p) {
	cb_tocommit.push([false, e, p, null]);
}

// create element of type t and insert it before b in p
function cbb(t, p, b) {
	var e = ce(t);
	cb_tocommit.push([true, e, p, b]);
	return e;
}

// insert e before b in p
function ibb(e, p, b) {
	cb_tocommit.push([true, e,p,b]);
}

// commit changes
function cb_commit() {
	for(var i = 0; i < cb_tocommit.length; i++) {
		var l = cb_tocommit[i];
		var a = l[0], e = l[1], p = l[2], b = l[3];
		if(a) p.insertBefore(e, b);
		else p.removeChild(e);
	}
	cb_tocommit = [];
}

// add a style to the page. not quick (~500ms) but ok
// from Mark Pilgrim's Dive into Greasemonkey -- with a try-catch throwaway for IE users
function addGlobalStyle(css) {
    var head, style;
    try {
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.insertBefore(style,null);
	}
	catch(e){}
}

// IE doesn't have array.exists
function exists(arr, el) {
	for(var i = 0; i < arr.length; i++)
		if(arr[i] == el)
			return true;
	return false;
}

function pageYOffset() {
	if (self.pageYOffset) // all except Explorer
		return self.pageYOffset;
	else if (document.documentElement && document.documentElement.scrollTop) // Explorer 6 Strict
		return document.documentElement.scrollTop;
	else if (document.body) // all other Explorers
		return document.body.scrollTop;
	return 0;
}

// neat function to test an element against a hash
function objattrtest(obj, attrs) {
	if(attrs !== null)
		for(var a in attrs) {
			if(attrs[a] === null) {
				if(typeof obj[a] == 'undefined') return false;
			}
			else if(typeof attrs[a] == 'string') {
				if(obj[a] != attrs[a]) return false;
			}
			else if(typeof attrs[a] == typeof /./) {
				if(obj[a].search(attrs[a]) == -1) return false;
			}
		}
	return true;
}

// finds the first element of with attributes matching attrs
function find(p, attrs) {
	if(!p) return null;
	
	for(var c = p.firstChild; c; c = c.nextSibling)
		if(objattrtest(c, attrs))
			return c;
	
	var bl = null;
	for(var c = p.firstChild; c; c = c.nextSibling)
		if((bl = find(c, attrs)) !== null)
			return bl;

	return null;
}

// returns all the elements that find would in an array
// this seeks no further under an element that already matches it
function findall(p, dict) {
	var result = [];
	
	for(var c = p.firstChild; c; c = c.nextSibling)
		if(objattrtest(c, dict))
			result.push(c);

	var bl = null;
	for(var c = p.firstChild; c; c = c.nextSibling)
		if(!exists(result, c) && (bl = findall(c, dict)) !== null)
			result = result.concat(bl);
	
	return result;
}

// try something until it stops throwing exceptions.
function tryrepeat(f, args, t) {
	try { f.apply(args); } catch (e) { setTimeout(function () { tryrepeat(f, args, t); }, t); }
}
	
// event listener adder
var listeners = [];
function addEventListener(object, event, fun, bubble) {
	if(object.addEventListener) object.addEventListener(event, fun, bubble);
	else if(object.attachEvent) {
		event = 'on'+ event;
		object.attachEvent(event, fun);
	}
	listeners.push([object, event, fun, bubble]);
}

// stop the document object from leaking
function removeAllEventListeners() {
	for(var i = 0; i < listeners.length; i++) {
		var c = listeners[i];
		if(c[0].removeEventListener) c[0].removeEventListener(c[1],c[2],c[3],c[4]);
		else if(c[0].detachEvent) c[0].detachEvent('on'+ c[1],c[2]);
	}
}

// start!
startup();

function isColour(c) { return c.search(/^#[a-f0-9]{6}$/i) == 0 || exists(['aliceblue','antiquewhite','aqua','aquamarine','azure','beige','bisque','black','blanchedalmond','blue','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','cyan','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dodgerblue','feldspar','firebrick','floralwhite','forestgreen','fuchsia','gainsboro','ghostwhite','gold','goldenrod','gray','green','greenyellow','honeydew','hotpink','indianred','','indigo','','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgrey','lightgreen','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslateblue','lightslategray','lightsteelblue','lightyellow','lime','limegreen','linen','magenta','maroon','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','navy','oldlace','olive','olivedrab','orange','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','purple','red','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','silver','skyblue','slateblue','slategray','snow','springgreen','steelblue','tan','teal','thistle','tomato','turquoise','violet','violetred','wheat','white','whitesmoke','yellow','yellowgreen'], c.toLowerCase()); }