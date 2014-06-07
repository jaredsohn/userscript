// ==UserScript==
// @name	BlitzMax Code Highlighting
// @description Highlights BlitzMax code within codeblocks in the forums at blitzbasic.com
// @include http://blitzmax.com/*
// @include http://blitzbasic.com/*
// @include http://www.blitzmax.com/*
// @include http://www.blitzbasic.com/*
// ==/UserScript==

//
// VERSION: 0.8
//

// keywords
var vartypes = [ "@", "$", "!", "%", "#", "Byte", "Short", "Int", "Long", "Float", "Double", "String", "Object" ];

var keywords = [ "Strict","SuperStrict","End","True","False","Null","Pi","Nan","Var","Ptr","If","Then","Else","ElseIf","EndIf","For","To","Step","Next","EachIn",
"While","Wend","EndWhile","Repeat","Until","Forever","Select","EndSelect","Case","Default","Exit","Continue","Const","Local","Global",
"Field","Function","EndFunction","Type","EndType","Extends","Method","EndMethod","Abstract","Final","New","Self","Super","Delete",
"Release","Public","Private","Extern","EndExtern","Module","ModuleInfo","Incbin","IncbinPtr","IncbinLen","Include","Framework","Import",
"Assert","Goto","Try","EndTry","Catch","Throw","DefData","ReadData","RestoreData","And","Or","Not","Shl","Shr","Sar","Len","Abs","Mod",
"Sgn","Min","Max","Varptr","SizeOf","Asc","Chr","Return" ];

var blitz_mod = [ "RuntimeError", "DebugStop", "DebugLog", "AppDir", "AppFile", "AppTitle", "AppArgs", "LaunchDir", "OnEnd",
"ReadStdin", "WriteStdout", "WriteStderr", "Delay", "MilliSecs", "MemAlloc", "MemFree", "MemExtend",
"MemClear", "MemCopy", "MemMove", "GCSetMode", "GCSuspend", "GCResume", "GCCollect", "GCMemAlloced",
"GCEnter", "GCLeave", "HandleFromObject", "HandleToObject", "Print", "Input"]

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// color styles use by highlighter
addGlobalStyle(
	// background & normal text styles
	"pre.code, pre.codebox { margin-top: 2px  !important; margin-bottom: 0px  !important; border: 1px solid gray !important; background-color: #013c77 !important;  color: #f0f0f0 !important; }" +
	// code styles
	".code-comment { color: #06bed9 !important; font-weight: none !important;  }" +
	".code-keyword { color: #fbfb00 !important; font-weight: none !important;  }" +
	".code-vartype { color: #fbc300 !important; font-weight: none !important;  }" +
	".code-string { color: #00f400 !important; font-weight: none !important;  }" +
	".code-number { color: #bbbbbb !important; font-weight: none !important;  }" +
	".code-attribute { color: #808080 !important; font-weight: none !important;  }" +
	".code-button { font-size: 8pt !important; margin-top: 0px !important; }" + 
	".code-linenumber { font-size: 8pt !important; color: #909090 !important; }"
);


function HighlightWord( source, word, style) {
	return source.replace( new RegExp( "\\b("+word+")\\b", "gim"), "<span class=" + style + ">$1</span>");
}

function Sanitize( source) {
	return source.replace( /<\/?span( class=("?)code-(comment|keyword|vartype|string|number|attribute|linenumber)(\2))?(( \/)?>|$)/gi, "");
}

function LeftPad(value, length) {
	var s = "" + value;
	length = length || 4;
	var sz = length - s.length;
	if( sz < 0) {
		// strip leading chars
		return s.slice( +sz, length)
	} else {
		// add leading pad
		var pad = "";
		for( var i = sz; i>0; i--) pad += "0";
		return pad + s;
	}
}

function HighlightSource( code, showlines) {
	// vartypes
	for( var x=0; x<vartypes.length; x++)	code = HighlightWord( code, vartypes[x], "code-vartype");
	// keywords
	for( var x=0; x<keywords.length; x++)	code = HighlightWord( code, keywords[x], "code-keyword");
	for( var x=0; x<blitz_mod.length; x++)	code = HighlightWord( code, blitz_mod[x], "code-keyword");
	// numerals
	code = code.replace( /\b(\$[a-f0-9]+|%[0-1]+|\d+(\.\d*)?)\b/gi, "<span class=code-number>$1</span>");	
	// attributes
	code = code.replace( /(\{[^\r\n\}]*\})/g, function(match,p) {
		return "<span class=code-attribute>"+Sanitize(p)+"</span>";
	});
	// strings
	code = code.replace( /("[^\r\n"]*")/g, function(match,p) {
		// hack to get around comments inside strings
		return "<span class=code-string>"+Sanitize(p).replace( /'/g, "¤")+"</span>";
	});
	// comments
	code = code.replace( /('.*)$/gm, function(match,p) {
		return "<span class=code-comment>"+Sanitize(p)+"</span>";
	});
	code = code.replace( /^(Rem(\n|.)+?(EndRem|<span class=("?)code-keyword(\4)>End<\/font>\s+Rem))/gim, function(match,p) {
		return "<span class=code-comment>"+Sanitize(p)+"</span>";
	});
	// hack to get around comments inside strings
	code = code.replace( /¤/g, "'")
	// line numbering
	if( showlines == true) {
		var count = 0;	
		code = code.replace( /([^\r\n]*?\n)/gm, function(match,p) {
			var line = "<span class=code-linenumber>" + LeftPad(count) + ": </span>";
			count++;
			return line + p;
		});		
		// last line
		code = code.replace( /([^\r\n]*?)$/g, function(match,p) {
			// need to skip further matches
			if(code == -1) return p;
			var line = "<span class=code-linenumber>" + LeftPad(count) + ": </span>";
			code = -1;
			return line + p;
		});
	}
	return code;
}

function selectCodeBoxCode(event){
	var userSelection;
	if (window.getSelection) {
		userSelection = window.getSelection();
	}	
	if (document.createRange){
		var oRange = document.createRange();
		var target = document.getElementById( this.id.substring( 0, this.id.length - 3 ) );
		oRange.selectNodeContents(target);
		userSelection.addRange(oRange);
	}
	event.preventDefault()
	return false;
}

function showCodeBoxLines(event) {
	var target = document.getElementById( this.id.substring( 0, this.id.length - 3 ) );
	target.innerHTML = HighlightSource( Sanitize(target.innerHTML), true);
	event.preventDefault()
	return false;
}

function hideCodeBoxLines(event) {
	var target = document.getElementById( this.id.substring( 0, this.id.length - 3 ) );	
	target.innerHTML = HighlightSource( Sanitize(target.innerHTML).replace( /^(\d+: )/gm, ""), false);
	event.preventDefault()
	return false;
}

function createButton(parent, id, caption, func) {
	var btn = document.createElement("a");
	btn.href = "#";
	btn.id = id;
	btn.className = "code-button";
	btn.addEventListener( 'click', func, false);
	btn.appendChild( document.createTextNode(caption));
	parent.appendChild( btn);	
	parent.appendChild( document.createTextNode(" "));
	return btn;
}

// highlight all codebox elements on the page
var codes = document.evaluate( "//pre[@class='code']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for( var i=0; i<codes.snapshotLength; i++) {
	var e = codes.snapshotItem(i);
	e.id = "gm_bbcode_"+(i+1);
	e.innerHTML = HighlightSource( e.innerHTML);

	var p = document.createElement("div");
	e.parentNode.insertBefore( p, e);
	e.parentNode.removeChild(e);
	p.appendChild(e);
	
	createButton( p, "gm_bbcode_"+(i+1)+"_a1", "[Select Code]", selectCodeBoxCode);
	createButton( p, "gm_bbcode_"+(i+1)+"_a2", "[Show Lines]", showCodeBoxLines);
	createButton( p, "gm_bbcode_"+(i+1)+"_a3", "[Hide Lines]", hideCodeBoxLines);
}

var codeboxes = document.evaluate( "//textarea[@class='codebox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for( var i=0; i<codeboxes.snapshotLength; i++) {
	
	var e = codeboxes.snapshotItem(i);
	var c = document.createElement("pre");
	c.id = "gm_bbcodebox_"+(i+1);
	c.className = "codebox";
	c.style.overflow = "auto";
	c.style.width = 800;
	c.style.height = 400;
	c.innerHTML = HighlightSource( e.innerHTML);
	
	var p = document.createElement("div");
	e.parentNode.insertBefore( p, e);
	e.parentNode.removeChild(e);
	p.appendChild(c);
		
	createButton( p, "gm_bbcodebox_"+(i+1)+"_a1", "[Select Code]", selectCodeBoxCode);
	createButton( p, "gm_bbcodebox_"+(i+1)+"_a2", "[Show Lines]", showCodeBoxLines);
	createButton( p, "gm_bbcodebox_"+(i+1)+"_a3", "[Hide Lines]", hideCodeBoxLines);
}
