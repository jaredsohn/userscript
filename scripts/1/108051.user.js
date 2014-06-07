// ==UserScript==
// @name				Google Plus Syntax Highlighter
// @namespace		https://plus.google.com/
// @description	Google Plus 
// @version			0.0.1
// @include			https://plus.google.com/*
// ==/UserScript==


var aryClassElements = new Array();
aryClassElements.length = 0;

getElementsByClassName('a-b-f-i-p-R', document.body );
	for ( var i = 0; i < aryClassElements.length; i++ ) {
		var code = aryClassElements[i].innerHTML;
		for ( var e = 0; e < code.length; e++ ) {
			code =  code.replace('<br>', '\r')
			code =  code.replace('[/code]','</pre>')
			code =  code.replace('[code as3]','<pre class="brush: as3">')
			code =  code.replace('[code bash]','<pre class="brush: bash">')
			code =  code.replace('[code cf]','<pre class="brush: cf">')
			code =  code.replace('[code csharp]','<pre class="brush: csharp">')
			code =  code.replace('[code cpp]','<pre class="brush: cpp">')
			code =  code.replace('[code css]','<pre class="brush: css">')
			code =  code.replace('[code delphi]','<pre class="brush: delphi">')
			code =  code.replace('[code diff]','<pre class="brush: diff">')
			code =  code.replace('[code erlang]','<pre class="brush: erlang">')
			code =  code.replace('[code groovy]','<pre class="brush: groovy">')
			code =  code.replace('[code js]','<pre class="brush: js">')
			code =  code.replace('[code java]','<pre class="brush: java">')
			code =  code.replace('[code javafx]','<pre class="brush: javafx">')
			code =  code.replace('[code perl]','<pre class="brush: perl">')
			code =  code.replace('[code php]','<pre class="brush: php">')
			code =  code.replace('[code text]','<pre class="brush: text">')
			code =  code.replace('[code pw]','<pre class="brush: pw">')
			code =  code.replace('[code python]','<pre class="brush: python">')
			code =  code.replace('[code ruby]','<pre class="brush: ruby">')
			code =  code.replace('[code scala]','<pre class="brush: scala">')
			code =  code.replace('[code sql]','<pre class="brush: sql">')
			code =  code.replace('[code vbnet]','<pre class="brush: vbnet">')
			code =  code.replace('[code xml]','<pre class="brush: xml">')
			code =  code.replace('[code xml]','<pre class="brush: xml">')
			}
		aryClassElements[i].innerHTML = code;
	}


function getElementsByClassName( strClassName, obj ) {
    if ( obj.className == strClassName ) {
        aryClassElements[aryClassElements.length] = obj;
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i] );
}

var theme = 'Default'; 

head = document.getElementsByTagName('head')[0];
csslist = ['shCore.css','shTheme'+theme+'.css'];
scriptlist = ['shCore.js', 'shAutoloader.js'];

for(i=0; i<csslist.length; i++) {
	var css = document.createElement('link');
	css.type="text/css";
	css.rel="stylesheet";
	css.href="http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/styles/"+csslist[i];
	head.insertBefore(css,null);
}

for(i=0; i<scriptlist.length; i++) {
	var script = document.createElement('script');
	script.type='text/javascript';
	script.src="http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/"+scriptlist[i];
	head.appendChild(script,null);
}

function runSH() {
	var timerId;
	function h() {
		if(typeof(SyntaxHighlighter)=="undefined") return;
		SyntaxHighlighter.autoloader(
			'as3 http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushAS3.js',
			'bash http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushBash.js',
			'cf http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushColdFusion.js',
			'csharp http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushCSharp.js',
			'cpp http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushCpp.js',
			'css http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushCss.js',
			'delphi http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushDelphi.js',
			'diff http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushDiff.js',
			'erlang http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushErlang.js',
			'groovy http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushGroovy.js',
			'js http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushJScript.js',
			'java http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushJava.js',
			'javafx http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushJavaFX.js',
			'perl http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushPerl.js',
			'php http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushPhp.js',
			'text http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushPlain.js',
			'pw http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushPowerShell.js',
			'python http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushPython.js',
			'ruby http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushRuby.js',
			'scala http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushScala.js',
			'sql http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushSql.js',
			'vbnet http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushVb.js',
			'xml http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushXml.js'
		);
		//SyntaxHighlighter.config.stripBrs = true;
		SyntaxHighlighter.defaults['smart-tabs'] = true;
		SyntaxHighlighter.defaults['toolbar'] = false;
		SyntaxHighlighter.all();
		clearTimeout(timerId);
	}
	timerId=setInterval(h,1500);
}

var initscript = document.createElement('script');
initscript.type='text/javascript';
initscript.innerHTML=runSH.toString()+"; runSH();";
head.appendChild(initscript,null);