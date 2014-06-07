// ==UserScript==
// @name           tc_highlighter
// @namespace      tc
// @description    TopCoder Syntax Higlighter - by vector9x
// @include        http://www.topcoder.com/stat?c=problem_solution*
// ==/UserScript==
var theme = 'Emacs'; // possible themes: 'RDark', 'Midnight', 'MDUltra', 'FadeToGrey', 'Emacs', 'Eclipse', 'Django', 'Default'


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

//format code
problemText = document.getElementsByClassName('problemText')[0];
text = problemText.innerHTML.replace(/\n<br>/g,"\n").replace(/<br>/g,'\n').replace(/^\s+|\s+$/g,"");
//detect language
language = "java";
if(text.indexOf("#include")>=0) language = "cpp";
else if(text.indexOf("using")>=0) language = "csharp";
else if(text.indexOf("Public&nbsp;Function")>=0) language = "vbnet";
problemText.innerHTML = '<pre class="brush: '+language+'">' + text + '</pre>';

//launch
function runSH() {
	var timerId;
	function h() {
		if(typeof(SyntaxHighlighter)=="undefined") return;
		SyntaxHighlighter.autoloader(
			'cpp http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushCpp.js',
			'java http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushJava.js',
			'csharp http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushCSharp.js',
			'vbnet http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushVb.js'
		);
		SyntaxHighlighter.all();
		clearTimeout(timerId);
	}
	timerId=setInterval(h,500);
}

var initscript = document.createElement('script');
initscript.type='text/javascript';
initscript.innerHTML=runSH.toString()+"; runSH();";
head.appendChild(initscript,null);
