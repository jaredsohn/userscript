// ==UserScript==
// @name          SexpCode->BBCode Compiler
// @version       0.4.2.5
// @namespace     DeltaTheta
// @description   SexpCode to BBCode compiler for 4chan's /prog/ textboard. (currently incompatible with ``EXPERT BBCODE FRAMEWORK'' and based on it.)
// @include       http://dis.4chan.org/read/*
// ==/UserScript==

function Status(s, r) {
    this.status = s;
    this.result = r;
}

var bbcode_tag = function (tag) { return (function(text) { return new Status(true, "["+tag+"]"+text+"[/"+tag+"]"); }); }
var bb_apply = 
    function (f) { 
	return (function(x) { 
	    var g = sexpcode_evaltag(x.car());
	    if (!g.status) return g;
	    return x.cdr()[f](g.result);
	});
    }

String.prototype.reverse =
    function () {
	return this.split("").reverse().join("");
    }
String.prototype.reversecar =
    function () {
	return this.split(" ").reverse().join(" ");
    }
String.prototype.car =
    function () {
	var i, l = this.length, s = '', c = '', n = 0;
	for (i = 0; i < l; ++i) {
	    c = this[i];
	    if (c == ' ')
		return s;
	    s += c;
	}
	return s;
    }
String.prototype.cdr =
    function () {
	var i, c = '', l = this.length;
	for (i = 0; i < l; ++i) {
	    c = this[i];
	    if (c == ' ')
		return this.slice(++i);
	}
	return '';
    }
String.prototype.cons =
    function (x) {
	if (x) {
	    if (this=='') return x
	    return this + ' ' + x
	} return this;
    }
String.prototype.map =
    function (f) {
	var r = f(this.car()), x;
	if (r.status)
	    for (x = this.cdr(); x != ''; x = x.cdr())
		r.result = r.result.cons(f(x.car()).result);
	return r;
    }
String.prototype.foldr =
    function (f) {
	var r = f(this.car()), x;
	if (r.status)
	    for (x = this.cdr(); x != ''; x = x.cdr())
		r = f(r.result.cons(x.car()));
	return r;
    }

String.prototype.foldl =
    function (f) { // TODO: if (r.status)
	var r = new Status(true, ''), x;
	for (x = this.reversecar(); x != ''; x = x.cdr())
	    r = f(x.car().cons(r.result));
	return r;
    }
String.prototype.mapchar =
    function (f) {
	var i = 0, r = f(this[i++]), l = this.length;
	if (r.status)
	    for (; i < l; ++i)
		r.result += f(this[i]).result;
	return r;
    }
String.prototype.foldrchar =
    function (f) {
	var i = 0, r = f(this[i++]), l = this.length;
	if (r.status)
	    for (; i < l; ++i)
		r = f(r.result + this[i]);
	return r;
    }
String.prototype.foldlchar =
    function (f) { //TODO: if (r.status)
	var i, r = new Status(true, ''), l = this.length;
	var xs = this.reverse();
	for (i = 0; i < l; ++i)
	    r = f(xs[i] + r.result);
	return r;
    }
String.prototype.repeat =
    function (t) {
	var i, r = new Status(true, '');
	for (i = 0; i < t; ++i)
	    r.result += this;
	return r;
    }
var sexpcode_tagtable = {
    // builtin tags
    b: bbcode_tag("b"),
    u: bbcode_tag("u"),
    o: bbcode_tag("o"),
    i: bbcode_tag("i"),
    s: bbcode_tag("s"),
    m: bbcode_tag("m"),
    aa: bbcode_tag("aa"),
    sub: bbcode_tag("sub"),
    sup: bbcode_tag("sup"),
    spoiler: bbcode_tag("spoiler"),
    code: bbcode_tag("code"),
    rem: function(x){return"";},
    verbatim: bbcode_tag("#"),
    // Do these make this {b.u.o.i {foldr-char spoiler TOURING-COMPLETE}}?
    // on words
    'map': bb_apply('map'),
    // filter would be worthless
    'foldr': bb_apply('foldr'),
    'foldl': bb_apply('foldl'),
    // on characters
    'map-char': bb_apply('mapchar'),
    // again, why would I filter a string I just wrote? and filter on what?
    'foldr-char': bb_apply('foldrchar'),
    'foldl-char': bb_apply('foldlchar'),
    // it's becoming GNU/Bloat-quality
    'repeat': function (x) {
	var n = new Number(x.car());
	return x.cdr().repeat(n);
    },
    'car': function(x) {
	return x.car(); },
    'cdr': function(x) {
	return x.cdr(); },
    // user-defined tag-table
    tagtable: {},
    // functions
    define: function(tag, fun) {
	this.tagtable[tag] = fun;
    },
    undefine: function(tag) {
	this.tagtable[tag] = undefined;
    },
    get: function(tag) {
	var f = this.tagtable[tag], g = this[tag];
	if (f === undefined) {
	    if (g === undefined) return new Status(false, "Undefined tag: "+tag);
	    return new Status(true, g);
	} return new Status(true, f);
    },
    call: function(tag, text) {
	var f = this.get(tag);
	if (!f.status) return f;
	return f.result(text);
    },
    func_compose: function(f, g) {
	return new Status(true, (function(x){
	    var x1 = g(x);
	    if (!x1.status) return x1;
	    return f(x1.result);
	}));
    },
    func_repeat: function(f, t) {
	return new Status(true, (function(x) {
	    var r = new Status(true, '');
	    r = f(x);
	    if (r.status)
		while (--t)
		    r.result = f(r.result).result;
	    return r;
	}));
    }
}

function sexpcode_tokenize(sexp) {
    var i;
    var c = '';
    var tok = '';
    var list = [];
    var len = sexp.length;
    var arity = 0;
    var tag = false;

    for (i = 0; i < len; ++i) {
	c = sexp[i];
	switch (c) {
	case '{':
	    ++arity;
	    list.push(tok);
	    list.push('@@@___TOK__TAG_OPEN');
	    tok='';
	    tag=true;
	    break;
	case '}':
	    --arity;
	    list.push(tok);
	    list.push('@@@___TOK__TAG_CLOSE');
	    tok='';
	    break;
	case '\\':
	    var nc = sexp[++i];
	    switch (nc) {
	    case ' ':
	    case '\n':
		break;
	    case 'n':
		tok+='\n';
		break;
	    default:
		tok+=nc;
		break;
	    }
	    break;
	default:
	    if (tag) {
		if ((c != ' ') &&
		    (c != '\n')) {
		    tok += c;
		} else {
		    list.push(tok);
		    tok = (c == '\n') ? '\n' : '';
		    tag = false;
		}
	    } else tok+=c;
	}
    }
    if (arity > 0) return new Status(false, "Unmatched {");
    else if (arity < 0) return new Status(false, "Unmatched }");
    list.push(tok);
    return new Status(true, list);
}

function Node() {
    this.type = null;
    this.content = '';
    this.next = null;
    this.child = null;
    this.parent = null;
    this.n = 0;
}

function sexpcode_parse(list) {
    var i;
    var node = new Node();
    var tree = node;
    var tok = '';
    var len = list.length;
    node.type = 'text';
    for (i = 0; i < len; ++i) {
	tok = list[i];
	if (tok === '@@@___TOK__TAG_CLOSE') {
	    node = node.parent;
	    node.next = new Node();
	    node.next.parent = node.parent;
	    node = node.next;
	} else if (tok === '@@@___TOK__TAG_OPEN') {
	    node.type = 'tag';
	    node.content = list[++i];
	    node.child = new Node();
	    node.child.parent = node;
	    node = node.child;
	} else {
	    node.type = 'text';
	    node.content = tok;
	    node.next = new Node();
	    node.next.parent = node.parent;
	    node = node.next;
	}
    }
    return tree;
}

function sexpcode_evaltag(code) {
    var i;
    var c = '';
    var com = '', tok = '';
    var res = [];
    var list = [];
    var len = code.length;
    if (code[0] == '.') return new Status(false, "Can't compose ``nothing'' in "+code);
    if (code[0] == '*' ||
	code[0] == '^') return new Status(false, "Can't repeat ``nothing'' in "+code);
    for (i = 0; i < len; ++i) {
	c = code[i];
	switch (c) {
	case '.':
	    list.push(com);
	    list.push('@@@___TOK__COMPOSE');
	    com='';
	    break;
	case '^':
	case '*':
	    list.push(com);
	    list.push('@@@___TOK__REPEAT');
	    com='';
	    break;
	default:
	    com += c;
	}
    }
    if (list[--i] === '@@@___TOK__COMPOSE')
	return new Status(false, "Can't compose with ``nothing'' in "+code);
    else if (list[i] === '@@@___TOK__REPEAT')
	return new Status(false, "Can't repeat ``no'' times in "+code);
    list.push(com);
    len = list.length;
    var f = sexpcode_tagtable.get(list[0]), g = null, h = null, n;
    if (!f.status) return f;
    f = f.result;
    for (i = 1; i < len; ++i) {
	tok = list[i];
	if (tok == '@@@___TOK__COMPOSE') {
	    if (g !== null) {
		f = sexpcode_tagtable.func_compose(f, g);
		if (!f.status) return f;
		f = f.result;
	    }
	    g = sexpcode_tagtable.get(list[++i]);
	    if (!g.status) return g;
	    g = g.result;
	} else {
	    h = (g === null) ? f : g;
	    n = new Number(list[++i]);
	    if (n < 1) return new Status(false, "Function repetition must be followed by an exact non-negative integer.");
	    h = sexpcode_tagtable.func_repeat(h, n);
	    if (!h.status) return h;
	    if (g === null) f = h.result;
	    else g = h.result;
	}
    }
    if (g !== null) {
	f = sexpcode_tagtable.func_compose(f, g);
	if (!f.status) return f;
	f = f.result;
    }
    return new Status(true, f);
}

function sexpcode_string(tree) {
    var s = '';
    if (tree == null);
    else if (tree.type == 'tag')
	s = '{' + tree.content + ' ' +
	sexpcode_string(tree.child) + '}' +
	sexpcode_string(tree.next);
    else s = (tree.content + sexpcode_string(tree.next));
    return s;
}

function sexpcode_evaltree(tree) {
    var s = new Status(true, ''), tag, c, n;
    if (tree == null) return s;
    if (tree.type == 'tag') {
	if (tree.content == 'code')
	    s.result = sexpcode_evaltag(tree.content).result(sexpcode_string(tree.child)).result;
	else {
	    tag = sexpcode_evaltag(tree.content);
	    
	    if (!tag.status) return tag;
	    c = sexpcode_evaltree(tree.child);
	    if (!c.status) return c;
	    s.result = tag.result(c.result);
	    if (!s.result.status) return s.result;
	    s.result = s.result.result;
	}
	n = sexpcode_evaltree(tree.next);
	if (!n.status) return n;
	s.result += n.result;
    }
    else {
	n = sexpcode_evaltree(tree.next);
	if (!n.status) return n;
	s.result += (tree.content + n.result);
    }
    return s;
}

function sexpcode_evalsexp(sexp) {
    var tok, parse, tree;
    tok = sexpcode_tokenize(sexp);
    if (!tok.status) return tok;
    parse = sexpcode_parse(tok.result);
    tree = sexpcode_evaltree(parse);
    return tree;
}
function error(s)
{
    document.getElementById("stderr").innerHTML += ("Error: " + s + "<br />");
};
function compilesexpcode(event)
{
    document.getElementById("stderr").innerHTML="";
    var html = sexpcode_evalsexp(document.getElementsByTagName("textarea")[0].value);
    if (!html.status)
	error(html.result);
    else document.getElementsByTagName("textarea")[0].value = html.result;
};
(function() {

    butanstyle = "text-decoration:underline overline; font-style:oblique; font-weight:bold;";

    document.getElementsByTagName("td")[8].innerHTML += ' <input type="button" id="sexpcode" style="'
	+ butanstyle
	+ '" value="COMPILE SEXPCODE" />';
    document.getElementById("sexpcode").addEventListener('click', compilesexpcode, true);


    forcedstderr = document.createElement("div");
    forcedstderr.id = "stderr";
    forcedstderr.style.border="1px dotted";
    forcedstderr.style.color="red";
    document.body.appendChild(forcedstderr, document.getElementsByTagName("form")[0].lastChild);

})()