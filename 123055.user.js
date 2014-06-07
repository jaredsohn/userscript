// ==UserScript==
// @name           abism_hou^q
// @version        1.41421356
// @namespace      4chan.org/prog
// @description    abism_hou^q to BBCode compiler for 4chan's /prog/ textboard.
// @include        http://dis.4chan.org/read/*
// @include        http://dis.4chan.org/prog/*
// ==/UserScript==

function compile(string) {
	var s = {
		src : string,
		pos : 0,
		buf : [],
		code : false,
		quotlv : 0,
		quotend : false,
		quotextra : false,
	};
	parsePost(s);
	return s.buf.join('');
}

function parsePost(s) {
	var tok;
	while (tok = nextToken(s)) {
		switch (tok) {
			case "{": parseCode(s); break;
			case "[": parseText(s); break;
			default : write(s, tok);
		}
	}
}

function nextToken(s, spaceIsToken) {
	var i = s.pos;
	var end = s.src.length;
	if (i >= end) {
		return null;
	}
	var c = s.src[i++];
	if (c.match(/[\[\{\]\}]/)) {
		s.pos = i;
		return c;
	}
	var t = type(c, spaceIsToken);
	while (i < end && type(s.src[i], spaceIsToken) == t) {
		i++;
	}
	var tok = s.src.substr(s.pos, i-s.pos);
	s.pos = i;
	return tok;
}

function type(ch, spaceIsToken) {
	var regex = spaceIsToken ? /[ \[\{\]\}]/ : /[\[\{\]\}]/;
	if (ch.match(regex)) return ch;
	return 'w';
}

function parseCode(s) {
	var tok;
	var nest = 0;
	s.code = true;
	write(s, "[code]");
	while (tok = nextToken(s)) {
		switch (tok) {
			case '{': nest++; break;
			case '}':
				if (nest > 0) {
					nest--;
				} else {
					write(s, "[/code]");
					return;
				}
		}
		write(s, tok);
	}
	s.code = false;
}

function parseText(s) {
	const subst = {
		"a":"aa",
		"b":"b",
		"i":"i",
		"s":"s",
		"m":"m",
		"_":"sub",
		"h":"spoiler",
		"o":"o",
		"u":"u",
		"^":"sup",
	}
	var flags = nextToken(s, true);
	var bb = [];
	var quote = false;
	for (var i in flags) {
		var c = flags[i];
		if (c == "q") {
			quote = true;
		} else if (subst[c]) {
			bb.push(subst[c]);
		} else {
			// invalid char, so it wasn't bbcode, just text
			write(s, "[", flags);
			return;
		}
	}
	if (quote) {
		startquote(s);
	}
	for (var i in bb) {
		write(s, "[", bb[i], "]");
	}
	s.pos++; // skipping first whitespace
	var tok;
	while ("]" != (tok = nextToken(s))) {
		switch (tok) {
			case "{": parseCode(s); break;
			case "[": parseText(s); break;
			default : write(s, tok);
		}
	}
	bb.reverse();
	for (var i in bb) {
		write(s, "[/", bb[i], "]");
	}
	if (quote) {
		endquote(s);
	}
}

function startquote(s) {
	if (s.quotlv > 1) {
		s.buf.push("[o]\n");
	}
	s.buf.push("> ");
	s.quotlv++;
}

function endquote(s) {
	if (s.quotlv > 1 || s.quotextra) {
		s.buf.push("[/o]");
	}
	if (s.quotlv == 1) {
		s.quotend = true;
		s.quotextra = false;
	}
	s.quotlv--;
}

function write(s) {
	var args = Array.prototype.slice.apply(arguments).slice(1);
	if (s.quotlv == 1) {
		for (var x in args) {
			var arg = args[x];
			var i = arg.indexOf('\n');
			if (i != -1) {
				s.buf.push(arg.substr(0,i));
				if (s.code) {
					s.buf.push("[/code]");
				}
				s.buf.push("[o]\n");
				if (s.code) {
					s.buf.push("[code]");
				}
				s.buf.push(arg.substr(i+1));
				s.quotextra = true;
			} else {
				s.buf.push(arg);
			}
		}
	} else {
		if (s.quotend) {
			s.quotend = false;
			if (args[0].match(/^[ \t]*[^ \t]/)) {
				s.buf.push('\n');
				s.buf.push(args[0].substr(args[0].search(/\w/)));
				args = args.slice(1);
			}
		}
		for (var i in args) {
			s.buf.push(args[i]);
		}
	}
}

stack = {};

function addControls(textarea) {
	var id = textarea.id;
	if (!id) {
		id = "newpostform";
		textarea.id = id;
	}
	stack[id] = [];
	var table = textarea.parentNode.parentNode.parentNode;
	var tr = table.firstChild;
	while (tr.tagName != "TR") {
		tr = tr.nextSibling;
	}
	var td = tr.lastChild;
	while (td.tagName != "TD") {
		td = td.previousSibling;
	}
	var t = document.createElement("td");
	tr.insertBefore(t, td);
	var comp = id.replace("form", "a");
	var undo = id.replace("form", "b");
	t.innerHTML +=
		'<input type="button" value="☼" id="' + comp + '" /> '+
		'<input type="button" value="↶" id="' + undo + '" /> ';
	textarea.onchange = function() {
		stack[id].push(textarea.value);
	};
	document.getElementById(comp).onclick = function(){
		var s = compile(textarea.value);
		textarea.value = s;
	};
	document.getElementById(undo).onclick = function(){
		var s = stack[id].pop();
		if (s) {
			textarea.value = s;
		} else {
			textarea.value = "";
		}
	};
}

(function() {
	var textareas = document.getElementsByTagName("textarea");
	for (var i in textareas) {
		addControls(textareas[i]);
	}
})()

