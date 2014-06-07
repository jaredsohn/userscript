// ==UserScript==
// @name           Tumblr + Text::Hatena
// @namespace      http://userscripts.org/users/7010
// @include        http://www.tumblr.com/new/*
// @include        http://www.tumblr.com/edit/*
// ==/UserScript==

// 2008/10/21 FIX escapeHTML (patched by utatane.tumblr.com)
// 2007/10/26 auto expand
// 2007/09/12 FIX BlockquoteNode

const KEY_PREVIEW = 'CTRL+T';

GM_addStyle(<><![CDATA[
	div#header img#logo {
		height : 40px !important;
		width : auto !important;
	}
	h1 {
		font-size : 20px;
		font-weight : bold;
	}
	.EXT_resizeable {
		border-bottom : 8px solid #639DD2;
	}
	.EXT_formatable {
		line-height : 1.8em;
	}
	.EXT_fittable {
		overflow-y : hidden;
	}
]]></>);

(function(){
	var target = getTextarea();
	if(!target) return;
	
	formatable(target, {
		name : 'HATENA',
		parse : function(text){
			with(new Hatena()){
				parse(text);
				return html();
			}
		}
	});
	// fittable(target);
})();

function getTextarea(){
	var type = $x('//input[@name="post[type]"]').value;
	switch(type){
	case 'quote':
	case 'photo':
	case 'video':
	case 'regular':
		return $('post_two');
	case 'link':
		show('link_description');
		hide('add_link_description');
		return $('post_three');
	case 'conversation':
	default:
		return;
	}
}

// -- [Application] ------------------------------------------------------
function formatable(target, parser){
	const SOURCE_HEADER = '<!--SOURCE: ' + parser.name + '\n'
	const SOURCE_FOOTER = '\n-->'
	
	addClass(target, 'EXT_formatable');
	
	var elmPreview = insertBefore(target, document.createElement('div'));
	hide(elmPreview);
	
	var elmForm = $x('ancestor::form', target);
	
	function preview(force){
		if(force || !isVisible(elmPreview)){
			elmPreview.innerHTML = parse();
			
			hide(target);
			show(elmPreview);
		} else {
			hide(elmPreview);
			show(target);
		}
	}
	
	function parse(){
		return parser.parse(target.value) + '\n' + 
			SOURCE_HEADER + target.value + SOURCE_FOOTER;
	}
	
	function submit(){
		preview(true)
		target.value = parse();
	}
	
	target.value = target.value.match(
		SOURCE_HEADER + '((.|\\n)*)' + SOURCE_FOOTER)? RegExp.$1 : target.value;;
	
	window.addEventListener('keydown', function(e){
		switch(keyString(e)){
		case KEY_PREVIEW:
			cancel(e);
			preview()
			return;
		case 'CTRL+ENTER':
			submit();
			elmForm.submit();
			return;
		}
	}, false);
	
	elmForm.addEventListener('submit', submit, true);
}

function fittable(target){
	addClass(target, 'EXT_fittable');
	
	const MIN = target.clientHeight;
	var clone = document.body.appendChild(target.cloneNode(false));
	
	with(clone.style){
		height     = '50px';
		width      = target.offsetWidth + 'px';
		position   = 'absolute';
		visibility = 'hidden';
	}
	
	setInterval(function(){
		clone.value = target.value;
		target.style.height = Math.max(MIN, clone.scrollHeight + 20) + 'px';
	}, 50);
}

// 垂直方向にサイズ変更可能なテキストエリア
// 8px程度の下線を想定
function resizeable(target){
	addClass(target, 'EXT_resizeable');
	
	const MIN_HEIHGT = target.clientHeight - 10;
	var style = target.style;
	var down = false;
	var top = 0
	for(var e = target ; e ; e = e.offsetParent)
		top += e.offsetTop;
	
	function onBottom(e){
		return (top + target.clientHeight - 5 < e.pageY)
	}
	
	target.addEventListener('mousedown', function (e) {
		if(onBottom(e))
			down = true;
	}, true);
	
	target.addEventListener('mousemove', function (e) {
		if(onBottom(e)){
			style.cursor = 's-resize';
		} else {
			style.cursor = '';
		}
	}, true);
	
	window.addEventListener('mousemove', function (e) {
		if(!down) return;
		
		cancel(e);
		style.height = Math.max(MIN_HEIHGT, e.pageY - top) + 'px';
	}, true);
	
	window.addEventListener('mouseup', function (e) {
		down = false;
	}, true);
}

// -- [Utility - DOM] ------------------------------------------------------
function $x(exp, context){
	context = context || document;
	return document.evaluate(exp, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function $(id){
	return id.nodeType? id : document.getElementById(id);
}

function addClass(target, cls){
	if(!contain(target.className, cls))
		target.className += " " + cls;
}

function contain(target, str){
	return !!(target.match('(\s|^)' + str + '(\s|$)'));
}

function removeElement(elm){
	return elm.parentNode.removeChild(elm);
}

function insertBefore(target, node){
	return target.parentNode.insertBefore(node, target);
}

function insertAfter(target, node){
	return target.parentNode.insertBefore(node, target.nextSibling);
}

function isVisible(target){
	return $(target).style.display!='none';
}

function hide(target){
	return $(target).style.display='none';
}

function show(target, style){
	return $(target).style.display=(style || '');
}

function cancel(e){
	e.preventDefault();
	e.stopPropagation();
}


// -- [Utility] ------------------------------------------------------
function log() {
	unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments))
}

function keyString(e){
	var specialKeys = {
		8  : 'BACK',
		9  : 'TAB',
		13 : 'ENTER',
		19 : 'PAUSE',
		20 : 'CAPS_LOCK',
		27 : 'ESCAPE',
		32 : 'SPACE',
		33 : 'PAGE_UP',
		34 : 'PAGE_DOWN',
		35 : 'END',
		36 : 'HOME',
		37 : 'LEFT',
		38 : 'UP',
		39 : 'RIGHT',
		40 : 'DOWN',
		45 : 'INSERT',
		46 : 'DELETE',
	};
	
	var code = e.keyCode;
	var res = [];
	e.shiftKey && res.push('SHIFT');
	e.ctrlKey  && res.push('CTRL');
	e.altKey   && res.push('ALT');
	if(code < 16 || 18 < code)
		res.push(specialKeys[code] || String.fromCharCode(code));
	return res.join('+');
}


// -- [Text::Hatena] -------------------------------------------------
// http://tech.nitoyon.com/javascript/application/texthatena/download.html

// from prototype.js
Object.extend = function(destination, source) {
	for (property in source) {
	destination[property] = source[property];
	}
	return destination;
}

String.times = function(str, time){
	var s = "";
	for(var i = 0; i < time; i++)s += "\t";
	return s;
}

String._escapeHTML = function(s){
	s = s.replace(/\&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/"/g, "&quot;");
	// s = s.replace(/\'/g, "&#39");
	// s = s.replace(/\\/g, "&#92");
	return s;
}

String._unescapeHTML = function(s){
	s = s.replace(/&amp;/g, "&");
	s = s.replace(/&lt;/g, "<");
	s = s.replace(/&gt;/g, ">");
	s = s.replace(/&quot;/g, "\"");
	return s;
}


// Hatena::Hatena_HTMLFilter
Hatena_HTMLFilter = function(args){
	this.self = {
		context : args["context"],
		html : ''
	};
	this.init();
}
Hatena_HTMLFilter.prototype = {
	init :function(){
		// HTML::Parser を利用すべきなんだけど JavaScript ではなんとも...
	},

	parse : function(html){
		var c = this.self.context;
		this.self.html = c.self.texthandler(html, c);
	},

	html : function(){
		return this.self.html;
	}
}


// Hatena
Hatena = function(args){
	if(args == null) args = {};
	this.self = {
		html : '',
		baseuri : args["baseuri"],
		permalink : args["permalink"] || "",
		ilevel : args["ilevel"] || 0,
		invalidnode : args["invalidnode"] || [],
		sectionanchor : args["sectionanchor"] || 'o-',
		texthandler : args["texthandler"] || function(text, c){
			// footnote
			var p = c.self.permalink;
			var html = "";
			var foot = text.split("((");
			for(var i = 0; i < foot.length; i++){
				if(i == 0){
					html += foot[i];
					continue;
				}
				var s = foot[i].split("))", 2);
				if(s.length != 2){
					html += "((" + foot[i];
					continue;
				}
				var pre = foot[i - i];
				var note = s[0];
				var post = foot[i].substr(s[0].length + 2);
				if(pre.match(/\)$/) && post.match(/^\(/)){
					html += "((" + post;
				} else {
					var notes = c.footnotes(note);
					var num = notes.length;
					note = note.replace(/<.*?>/g, "");
					note = note.replace(/&/g, "&amp;");
					html += '<span class="footnote"><a href="' + p + '#f' + num + '" title="' + note + '" name="fn' + num + '">*' + num + '</a></span>' + post;
				}
			}
			return html;
		}
	};
}
Hatena.prototype = {
	parse : function(text){
		this.self.context = new Hatena_Context({
			text : text || "",
			baseuri : this.self.baseuri,
			permalink : this.self.permalink,
			invalidnode : this.self.invalidnode,
			sectionanchor : this.self.sectionanchor,
			texthandler : this.self.texthandler
		});
		var c = this.self.context;
		var node = new Hatena_BodyNode();
		node._new({
			context : c,
			ilevel : this.self.ilevel
		});
		node.parse();
		var parser = new Hatena_HTMLFilter({
			context : c
		});
		parser.parse(c.html());
		this.self.html = parser.html();

		if (this.self.context.footnotes().length != 0) {
			var node = new Hatena_FootnoteNode();
			node._new({
				context : this.self.context,
				ilevel : this.self.ilevel
			});
			node.parse();
			this.self.html += "\n";
			this.self.html += node.self.html;
		}
	}, 

	html : function(){
		return this.self.html;
	}
}


// Hatena::Context
Hatena_Context = function(args){
	this.self = {
		text : args["text"],
		baseuri : args["baseuri"],
		permalink : args["permalink"],
		invalidnode : args["invalidnode"],
		sectionanchor : args["sectionanchor"],
		texthandler : args["texthandler"],
		_htmllines : [],
		footnotes : Array(),
		sectioncount : 0,
		syntaxrefs : [],
		noparagraph : 0
	};
	this.init();
}
Hatena_Context.prototype = {
	init : function() {
		this.self.text = this.self.text.replace(/\r/g, "");
		this.self.lines = this.self.text.split('\n');
		this.self.index = -1;
	},

	hasnext : function() {
		return (this.self.lines != null && this.self.lines.length - 1 > this.self.index);
	},

	nextline : function() {
		return this.self.lines[this.self.index + 1];
	},

	shiftline : function() {
		return this.self.lines[++this.self.index];
	},

	currentline : function() {
		return this.self.lines[this.self.index];
	},

	html : function() {
		return this.self._htmllines.join ("\n");
	},

	htmllines : function(line) {
		if(line != null) this.self._htmllines.push(line);
		return this.self._htmllines;
	},

	lasthtmlline : function() {return this.self._htmllines[this.self._htmllines.length - 1]; },

	footnotes : function(line) {
		if(line != null) this.self.footnotes.push(line);
		return this.self.footnotes;
	},

	syntaxrefs : function(line) {
		if(line != null) this.self.syntaxrefs.push(line);
		return this.self.syntaxrefs;
	},

	syntaxpattern : function(pattern) {
		if(pattern != null) this.self.syntaxpattern = pattern;
		return this.self.syntaxpattern;
	},

	noparagraph : function(noparagraph) {
		if(noparagraph != null) this.self.noparagraph = noparagraph;
		return this.self.noparagraph;
	},

	incrementsection : function() {
		return this.self.sectioncount++;
	}
}


// Hatena::Node
Hatena_Node = function(){}
Hatena_Node.prototype = {
	html : "", 
	pattern : "",

	_new : function(args){
		if(args == null) args = Array();
		this.self = {
			context : args["context"],
			ilevel : args["ilevel"],
			html : ''
		};
		this.init();
	},
	init : function(){
		this.self.pattern = '';
	},

	parse : function(){ alert('die'); },

	context : function(v){
		this.self.context = v;
	}
};


// Hatena::BodyNode
Hatena_BodyNode = function(){};
Hatena_BodyNode.prototype = Object.extend(new Hatena_Node(), {
	parse : function(){
		var c = this.self.context;
		while (this.self.context.hasnext()) {
			var node = new Hatena_SectionNode();
			node._new({
				context : c,
				ilevel : this.self.ilevel
			});
			node.parse();
		}
	}
})


// Hatena::BrNode
Hatena_BrNode = function(){};
Hatena_BrNode.prototype = Object.extend(new Hatena_Node(), {
	parse : function(){
		var c = this.self.context;
		var l = c.shiftline();
		if(l.length != 0) return;
		var t = String.times("\t", this.self.ilevel);
		if (c.lasthtmlline() == t + "<br>" || c.lasthtmlline() == t) {
			c.htmllines(t + "<br>");
		} else {
			c.htmllines(t);
		}
	}
})


// Hatena::CDataNode
Hatena_CDataNode = function(){};
Hatena_CDataNode.prototype = Object.extend(new Hatena_Node(), {
	parse : function(){
		var c = this.self.context;
		var t = String.times("\t", this.self.ilevel);
		var l = c.shiftline();
		var text = new Hatena_Text();
		text._new({context : c});
		text.parse(l);
		l = text.html();
		c.htmllines(t + l);
	}
})


// Hatena::DlNode
Hatena_DlNode = function(){};
Hatena_DlNode.prototype = Object.extend(new Hatena_Node(), {
	init : function(){
		this.self.pattern = /^\:((?:<[^>]+>|\[\].+?\[\]|\[[^\]]+\]|\[\]|[^\:<\[]+)+)\:(.+)$/;
	},

	parse : function(){
		var c = this.self.context;
		var l = c.nextline();
		if(!l.match(this.self.pattern)) return;
		this.self.llevel = RegExp.$1.length;
		var t = String.times("\t", this.self.ilevel);

		c.htmllines(t + "<dl>");
		while (l = c.nextline()) {
			if(!l.match(this.self.pattern)) break;
			c.shiftline();
			c.htmllines(t + "\t<dt>" + RegExp.$1 + "</dt>");
			c.htmllines(t + "\t<dd>" + RegExp.$2 + "</dd>");
		}
		c.htmllines(t + "</dl>");
	}
})


// Hatena::FootnoteNode
Hatena_FootnoteNode = function(){};
Hatena_FootnoteNode.prototype = Object.extend(new Hatena_Node(), {
	html : "",

	parse : function(){
		var c = this.self["context"];
		if(c.self.footnotes == null || c.self.footnotes.length == 0) return;
		var t = String.times("\t", this.self["ilevel"]);
		var p = c.self.permalink;
		this.self["html"] = '';

		this.self.html += t + '<div class="footnote">\n';
		var num = 0;
		var text = new Hatena_Text();
		text._new({context : c});
		for(var i = 0; i < c.self.footnotes.length; i++) {
			var note = c.self.footnotes[i];
			num++;
			text.parse(note);
			var l = t + '\t<p class="footnote"><a href="' + p + '#fn' + num + '" name="f' + num + '">*' + num + '</a>: '
				+ text.html() + '</p>';
			this.self["html"] += l + "\n";
		}
		this.self["html"] += t + '</div>\n';
	}
})


// Hatena::H3Node
Hatena_H3Node = function(){};
Hatena_H3Node.prototype = Object.extend(new Hatena_Node(), {
	init : function(){
		this.self.pattern = /^\*(?:(\d{9,10}|[a-zA-Z]\w*)\*)?((?:\[[^\:\[\]]+\])+)?(.*)$/;
	},

	parse : function(){
		var c = this.self.context;
		var l = c.shiftline();
		if(l == null) return;
		if(!l.match(this.self.pattern)) return;
		var name = RegExp.$1;
		var cat = RegExp.$2;
		var title = RegExp.$3;
		var b = c.self.baseuri;
		var p = c.self.permalink;
		var t = String.times("\t", this.self.ilevel);
		var sa = c.self.sectionanchor;

		/* TODO: カテゴリは未対応
		if (cat) {
			if(cat.match(/\[([^\:\[\]]+)\]/)){ // 繰り返しできないなぁ...
				var w = RegExp.$1;
				var ew = escape(RegExp.$1);
				cat = cat.replace(/\[([^\:\[\]]+)\]/, '[<a class="sectioncategory" href="' + b + '?word=' + ew + '">' + w + '</a>]');
			}
		}*/
		var extra = '';
		var ret = this._formatname(name);
		var name = (ret[0] != undefined ? ret[0] : ""); extra = (ret[1] != undefined ? ret[1] : "");
		// REPLACE: c.htmllines(t + '<h3><a href="' + p + '#' + name + '" name="' + name + '"><span class="sanchor">' + sa + '</span></a> ' + cat + title + '</h3>' + extra);
		c.htmllines(t + '<h3>' + title + '</h3>');
	},

	_formatname : function(name){
		/* TODO: 時間も未対応。表示時の時間が表示されてしまう...
		if (name && name.match(/^\d{9,10}$/)) {
			var m = sprintf('%02d', (localtime($name))[1]);
			var h = sprintf('%02d', (localtime($name))[2]);
			return (
				$name,
				qq| <span class="timestamp">$h:$m</span>|,
			);
		} elsif ($name) {*/
		if(name != ""){
			return [name];
		} else {
			this.self.context.incrementsection();
			name = 'p' + this.self.context.self.sectioncount;
			return [name];
		}
	}
})


// Hatena::H4Node
Hatena_H4Node = function(){};
Hatena_H4Node.prototype = Object.extend(new Hatena_Node(), {
	init : function(){
		this.self.pattern = /^\*\*((?:[^\*]).*)$/;
	},

	parse : function(){
		var c = this.self.context;
		var l = c.shiftline();
		if(l == null) return;
		if(!l.match(this.self.pattern)) return;
		var t = String.times("\t", this.self.ilevel);
		c.htmllines(t + "<h4>" + RegExp.$1 + "</h4>");
	}
})


// Hatena::H5Node
Hatena_H5Node = function(){};
Hatena_H5Node.prototype = Object.extend(new Hatena_Node(), {
	init : function(){
		this.self.pattern = /^\*\*\*((?:[^\*]).*)$/;
	},

	parse : function(){
		var c = this.self.context;
		var l = c.shiftline();
		if(l == null) return;
		if(!l.match(this.self.pattern)) return;
		var t = String.times("\t", this.self.ilevel);
		c.htmllines(t + "<h5>" + RegExp.$1 + "</h5>");
	}
})


// Hatena::ListNode
Hatena_ListNode = function(){};
Hatena_ListNode.prototype = Object.extend(new Hatena_Node(), {
	init : function(){
		this.self.pattern = /^([\-\+]+)([^>\-\+].*)$/;
	},

	parse : function(){
		var c = this.self.context;
		var l = c.nextline();
		if(!l.match(this.self.pattern)) return;
		this.self.llevel = RegExp.$1.length;
		var t = String.times("\t", this.self.ilevel + this.self.llevel - 1);
		this.self.type = RegExp.$1.substr(0, 1) == '-' ? 'ul' : 'ol';

		c.htmllines(t + "<" + this.self.type + ">");
		while (l = c.nextline()) {
			if(!l.match(this.self.pattern)) break;
			if (RegExp.$1.length > this.self.llevel) {
				//c.htmllines(t + "\t<li>"); bug??
				var node = new Hatena_ListNode();
				node._new({
					context : this.self.context,
					ilevel : this.self.ilevel
				});
				node.parse();
				//c.htmllines(t + "\t</li>"); bug??
			} else if(RegExp.$1.length < this.self.llevel) {
				break;
			} else {
				l = c.shiftline();
				c.htmllines(t + "\t<li>" + RegExp.$2 + "</li>");
			}
		}
		c.htmllines(t + "</" + this.self.type + ">");
	}
})


// Hatena::PNode
Hatena_PNode = function(){};
Hatena_PNode.prototype = Object.extend(new Hatena_Node(), {
	parse :function(){
		var c = this.self.context;
		var t = String.times("\t", this.self.ilevel);
		var l = c.shiftline();
		var text = new Hatena_Text();
		text._new({context : c});
		text.parse(l);
		l = text.html();
		c.htmllines(t + "<p>" + l + "</p>");
	}
});


// Hatena::PreNode
Hatena_PreNode = function(){};
Hatena_PreNode.prototype = Object.extend(new Hatena_Node(), {
	init :function(){
		this.self.pattern = /^>\|$/;
		this.self.endpattern = /(.*)\|<$/;
		this.self.startstring = "<pre>";
		this.self.endstring = "</pre>";
	},

	parse : function(){
		c = this.self.context;
		if(!c.nextline().match(this.self.pattern)) return;
		c.shiftline();
		var t = String.times("\t", this.self.ilevel);
		c.htmllines(t + this.self.startstring);
		var x = '';
		while (c.hasnext()) {
			var l = c.nextline();
			if (l.match(this.self.endpattern)) {
				var x = RegExp.$1;
				c.shiftline();
				break;
			}
			c.htmllines(this.escape_pre(c.shiftline()));
		}
		c.htmllines(x + this.self.endstring);
	},

	escape_pre : function(text){ String._escapeHTML(text); }
})


// Hatena::SuperpreNode
Hatena_SuperpreNode = function(){};
Hatena_SuperpreNode.prototype = Object.extend(new Hatena_PreNode(), {
	init : function(){
		this.self.pattern = /^>\|\|$/;
		this.self.endpattern = /^\|\|<$/;
		this.self.startstring = "<pre>";
		this.self.endstring = "</pre>";
	},

	escape_pre : function(s){
		return String._escapeHTML(s);
	}
})


// Hatena::SuperpreNode
Hatena_TableNode = function(){};
Hatena_TableNode.prototype = Object.extend(new Hatena_Node(), {
	init : function(){
		this.self.pattern = /^\|([^\|]*\|(?:[^\|]*\|)+)$/;
	},

	parse : function(s){
		var c = this.self.context;
		var l = c.nextline();
		if(!l.match(this.self.pattern)) return;
		var t = String.times("\t", this.self.ilevel);

		c.htmllines(t + "<table>");
		while (l = c.nextline()) {
			if(!l.match(this.self.pattern)) break;
			l = c.shiftline();
			c.htmllines(t + "\t<tr>");
			var td = l.split("|");
			td.pop(); td.shift();
			for (var i = 0; i < td.length; i++) {
				var item = td[i];
				if (item.match(/^\*(.*)/)) {
					c.htmllines(t + "\t\t<th>" + RegExp.$1 + "</th>");
				} else {
					c.htmllines(t + "\t\t<td>" + item + "</td>");
				}
			}
			c.htmllines(t + "\t</tr>");
		}
		c.htmllines(t + "</table>");
	}
})


// Hatena::Section
Hatena_SectionNode = function(){};
Hatena_SectionNode.prototype = Object.extend(new Hatena_Node(), {
	init : function(){
		this.self.childnode = ["h5", "h4", "h3", "blockquote", "dl", "list", "pre", "superpre", "table", "tagline", "tag"];
		this.self.startstring = '<div class="section">';
		this.self.endstring = '</div>';
		this.self.child_node_refs = Array();
	},

	parse : function(){
		var c = this.self.context;
		var t = String.times("\t", this.self.ilevel);
		
		this.self.ilevel--; // ADD:
		this._set_child_node_refs();
		// COMM: c.htmllines(t + this.self.startstring);
		while (c.hasnext()) {
			var l = c.nextline();
			var node = this._findnode(l);
			if(node == null) return;
			// TODO: ref == instanceof ???
			//if (ref(node) eq 'Hatena_H3Node') {
			//	if(this.self.started++) break;
			//}
			node.parse();
		}
		// COMM: c.htmllines(t + this.self.endstring);
	},

	_set_child_node_refs : function(){
		var c = this.self.context;
		var nodeoption = {
			context : c,
			ilevel : this.self.ilevel + 1
		};
		var invalid = Array();
		if(c.self.invalidnode) invalid[c.self.invalidnode] = Array();
		for(var i = 0; i <  this.self.childnode.length; i++) {
			var node = this.self.childnode[i];
			if(invalid[node]) continue;
			var mod = 'Hatena_' + node.charAt(0).toUpperCase() + node.substr(1).toLowerCase() + 'Node';
			var n = eval("new "+ mod +"()");
			n._new(nodeoption);
			this.self.child_node_refs.push(n);
		}
	},

	_findnode : function(l){
		for(var i = 0; i < this.self.child_node_refs.length; i++) {
			var node = this.self.child_node_refs[i];
			var pat = node.self.pattern;
			if(pat == null) continue;
			if (l.match(pat)) {
				return node;
			}
		}
		var nodeoption = {
			context : this.self.context,
			ilevel : this.self.ilevel + 1
		};
		if (l.length == 0) {
			var node = new Hatena_BrNode(nodeoption);
			node._new(nodeoption);
			return node;
		} else if (this.self.context.noparagraph()) {
			var node = new Hatena_CDataNode();
			node._new(nodeoption);
			return node;
		} else {
			var node = new Hatena_PNode;
			node._new(nodeoption);
			return node;
		}
	}
})


// Hatena::BrockquoteNode
Hatena_BlockquoteNode = function(){};
Hatena_BlockquoteNode.prototype = Object.extend(new Hatena_SectionNode(), {
	init : function(){
		this.self.pattern = /^>>$/;
		this.self.endpattern = /^<<$/;
		this.self.childnode = ["h4", "h5", "blockquote", "dl", "list", "pre", "superpre", "table"];//, "tagline", "tag"];
		this.self.startstring = "<blockquote>";
		this.self.endstring = "</blockquote>";
		this.self.child_node_refs = Array(); // ADD:
	},

	parse : function(){
		var c = this.self.context;
		if(!c.nextline().match(this.self.pattern)) return;
		c.shiftline();
		var t = String.times("\t", this.self.ilevel);
		this._set_child_node_refs();
		c.htmllines(t + this.self.startstring);
		while (c.hasnext()) {
			var l = c.nextline();
			if (l.match(this.self.endpattern)) {
				c.shiftline();
				break;
			}
			var node = this._findnode(l);
			if(node == null) break;
			node.parse();
		}
		c.htmllines(t + this.self.endstring);
	}
})


// Hatena::TagNode
Hatena_TagNode = function(){};
Hatena_TagNode.prototype = Object.extend(new Hatena_SectionNode(), {
	init : function(){
		this.self.pattern = /^>(<.*)$/;
		this.self.endpattern = /^(.*>)<$/;
		this.self.childnode = ["h4", "h5", "blockquote", "dl", "list", "pre", "superpre", "table"];
		this.self.child_node_refs = Array();
	},

	parse : function(){
		var c = this.self.context;
		var t = String.times("\t", this.self.ilevel);
		if(!c.nextline().match(this.self.pattern)) return;
		c.shiftline();
		c.noparagraph(1);
		this._set_child_node_refs();
		var x =this._parse_text(RegExp.$1);
		c.htmllines(t + x);
		while (c.hasnext()) {
			var l = c.nextline();
			if (l.match(this.self.endpattern)) {
				c.shiftline();
				x = this._parse_text(RegExp.$1);
				c.htmllines(t + x);
				break;
			}
			var node = this._findnode(l);
			if(node == null) break;
			node.parse();
		}
		c.noparagraph(0);
	},

	_parse_text : function(l){
		var text = new Hatena_Text();
		text._new({context : this.self.context});
		text.parse(l);
		return text.html();
	}
})


// Hatena::TaglineNode
Hatena_TaglineNode = function(){};
Hatena_TaglineNode.prototype = Object.extend(new Hatena_SectionNode(), {
	init : function(){
		this.self.pattern = /^>(<.*>)<$/;
		this.self.child_node_refs = Array();
	},

	parse : function(){
		var c = this.self.context;
		var t = String.times("\t", this.self.ilevel);
		if(!c.nextline().match(this.self.pattern)) return;
		c.shiftline();
		c.htmllines(t + RegExp.$1);
	}
})


// Hatena::Text
Hatena_Text = function(){}
Hatena_Text.prototype = {
	_new : function(args){
		this.self = {
			context : args["context"],
			html : ''
		};
	},

	parse : function(text){
		this.self.html = '';
		if(text == null) return;
		this.self.html = text;
	},

	html : function(){return this.self.html;}
}