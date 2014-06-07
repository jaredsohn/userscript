// ==UserScript==
// @name        Javascript-css beautify
// @namespace   http://devs.forumvi.com
// @description Javascript-CSS format with CodeMirror
// @include     http://*
// @include     https://*
// @version     1.0
// @require  	http://jsbeautifier.org/js/lib/beautify.js
// @require 	http://cssbeautify.com/cssbeautify.js
// @require 	http://codemirror.net/lib/codemirror.js
// @require 	http://codemirror.net/addon/runmode/runmode.js
// @require 	http://codemirror.net/mode/javascript/javascript.js
// @require 	http://codemirror.net/mode/css/css.js
// @grant       GM_addStyle
// @run-at 		document-end
// @copyright   2014+, Zzbaivong
// ==/UserScript==

/* File archiver
jsbeautify https://dl.dropboxusercontent.com/u/126946313/Userscript/js-css-beautify/beautify.js
cssbeautify https://dl.dropboxusercontent.com/u/126946313/Userscript/js-css-beautify/cssbeautify.js
codemirror https://dl.dropboxusercontent.com/u/126946313/Userscript/js-css-beautify/codemirror.js
runmode https://dl.dropboxusercontent.com/u/126946313/Userscript/js-css-beautify/runmode.js
javascript https://dl.dropboxusercontent.com/u/126946313/Userscript/js-css-beautify/javascript.js
css https://dl.dropboxusercontent.com/u/126946313/Userscript/js-css-beautify/css.js
*/

(function () {

	var theme = "Light"; // Light|Dark

	var url = window.top.location;
	if (/\b(application\/x-javascript|text\/css)\b/.test(document.contentType) && document.URL === url.href || document.body.childNodes[0].tagName === "PRE" && /.+\.(js|css)(\?\.+)?/.test(url.pathname)) {
		var lineNo = 1,
			output = document.getElementsByTagName('pre')[0],
			txt = output.textContent,
			numbers = document.createElement("div");
		numbers.id = "lineNumber";
		output.parentNode.insertBefore(numbers, output);
		output.innerHTML = "";

		GM_addStyle('* {\
        padding: 0;\
        margin: 0;\
        }\
        body, html {\
            height: 100%;\
            min-height: 100%;\
        }\
        pre {\
            margin: 0!important;\
            border-radius: 0!important;\
            word-wrap: normal!important;\
            white-space: pre!important;\
            line-height: 1.3em;\
            padding: 0 0 0 3.8em;\
            counter-reset: linenumber;\
            font-family: Consolas, Monaco, "Andale Mono", monospace;\
            direction: ltr;\
            text-align: left;\
            white-space: pre;\
            word-spacing: normal;\
            word-break: normal;\
            -moz-tab-size: 4;\
            -o-tab-size: 4;\
            tab-size: 4;\
            -webkit-hyphens: none;\
            -moz-hyphens: none;\
            -ms-hyphens: none;\
            hyphens: none;\
        }\
        #lineNumber {\
           line-height: 1.3em;\
            pointer-events: none;\
            float: left;\
            font-size: 1em;\
            width: 3em;\
            letter-spacing: -1px;\
            border-right: 1px solid #CCC;\
        }\
        #lineNumber > span {\
            pointer-events: none;\
            display: block;\
            counter-increment: linenumber;\
        }\
        #lineNumber > span:before {\
            content: counter(linenumber);\
            font-family: monospace;\
            color: #999;\
            display: block;\
            padding-right: 0.8em;\
            text-align: right;\
        }\
        #changeClick {\
            cursor: pointer;\
            position: fixed;\
            right: 50%;\
            margin-left: -35px;\
            top: 0;\
            width: 70px;\
            height: 30px;\
            line-height: 30px;\
            text-align: center;\
            background: #007bff;\
            color: #f8f8f2;\
            text-shadow: 0 1px rgba(0,0,0,0.3);\
            opacity: .2;\
        }\
        #control,#changeClick,.line-numbers .line-numbers-rows{\
            -webkit-user-select: none;\
            -moz-user-select: none;\
            -ms-user-select: none;\
            user-select: none;\
        }\
        #changeClick:hover {\
            opacity: 1;\
        }\
        #changeClick:after, #changeClick:before {\
            content: " ";\
            display: block;\
            width: 0;\
            height: 0;\
            border-style: solid;\
            border-width: 30px 30px 0 0;\
            border-color: #007bff transparent transparent transparent;\
            position: absolute;\
            right: -30px;\
            top: 0;\
        }\
        #changeClick:before {\
            border-width: 0 30px 30px 0;\
            border-color: transparent #007bff transparent transparent;\
            right: auto;\
            left: -30px;\
        }\
        .cm-s-default .cm-keyword {color: #708;}\
        .cm-s-default .cm-atom {color: #219;}\
        .cm-s-default .cm-number {color: #164;}\
        .cm-s-default .cm-def {color: #00f;}\
        .cm-s-default .cm-variable,.cm-s-default .cm-punctuation,.cm-s-default .cm-property,.cm-s-default .cm-operator {}\
        .cm-s-default .cm-variable-2 {color: #05a;}\
        .cm-s-default .cm-variable-3 {color: #085;}\
        .cm-s-default .cm-comment {color: #a50;}\
        .cm-s-default .cm-string {color: #a11;}\
        .cm-s-default .cm-string-2 {color: #f50;}\
        .cm-s-default .cm-meta {color: #555;}\
        .cm-s-default .cm-qualifier {color: #555;}\
        .cm-s-default .cm-builtin {color: #30a;}\
        .cm-s-default .cm-bracket {color: #997;}\
        .cm-s-default .cm-tag {color: #170;}\
        .cm-s-default .cm-attribute {color: #00c;}\
        .cm-s-default .cm-header {color: blue;}\
        .cm-s-default .cm-quote {color: #090;}\
        .cm-s-default .cm-hr {color: #999;}\
        .cm-s-default .cm-link {color: #00c;}\
        .cm-negative {color: #d44;}\
        .cm-positive {color: #292;}\
        .cm-header, .cm-strong {font-weight: bold;}\
        .cm-em {font-style: italic;}\
        .cm-link {text-decoration: underline;}\
        .cm-s-default .cm-error {color: #f00;}\
        .cm-invalidchar {color: #f00;}\
        .cm-s-monokai {background: #272822; color: #f8f8f2;}\
        .cm-s-monokai div.CodeMirror-selected {background: #49483E !important;}\
        .cm-s-monokai .CodeMirror-gutters {background: #272822; border-right: 0px;}\
        .cm-s-monokai .CodeMirror-linenumber {color: #d0d0d0;}\
        .cm-s-monokai .CodeMirror-cursor {border-left: 1px solid #f8f8f0 !important;}\
        .cm-s-monokai span.cm-comment {color: #75715e;}\
        .cm-s-monokai span.cm-atom {color: #ae81ff;}\
        .cm-s-monokai span.cm-number {color: #ae81ff;}\
        .cm-s-monokai span.cm-property, .cm-s-monokai span.cm-attribute {color: #a6e22e;}\
        .cm-s-monokai span.cm-keyword {color: #f92672;}\
        .cm-s-monokai span.cm-string {color: #e6db74;}\
        .cm-s-monokai span.cm-variable {color: #a6e22e;}\
        .cm-s-monokai span.cm-variable-2 {color: #9effff;}\
        .cm-s-monokai span.cm-def {color: #fd971f;}\
        .cm-s-monokai span.cm-bracket {color: #f8f8f2;}\
        .cm-s-monokai span.cm-tag {color: #f92672;}\
        .cm-s-monokai span.cm-link {color: #ae81ff;}\
        .cm-s-monokai span.cm-error {background: #f92672; color: #f8f8f0;}\
        .cm-s-monokai .CodeMirror-activeline-background {background: #373831 !important;}\
        .cm-s-monokai .CodeMirror-matchingbracket {text-decoration: underline;color: white !important;\
        }');

		var btheme, ctheme = "";
		if (theme == "Dark") {
			btheme = "monokai";
		} else if (theme == "Light") {
			btheme = "default";
			ctheme = 'checked'
		}
		document.body.setAttribute("class", "cm-s-" + btheme);

		var control = document.createElement("div");
		control.id = "control";
		control.innerHTML = '<input style="display:none" type="checkbox" id="changeTheme" ' + ctheme + ' /><label id="changeClick" for="changeTheme">' + theme + '</label>';
		document.getElementsByTagName("body")[0].appendChild(control);

		var changeClick = document.getElementById('changeClick');
		document.getElementById('changeTheme').onchange = function () {
			if (this.checked) {
				document.body.setAttribute("class", "cm-s-default");
				changeClick.innerHTML = "Light";
			} else {
				document.body.setAttribute("class", "cm-s-monokai");
				changeClick.innerHTML = "Dark";
			}
		};
		var lang;
		if (document.contentType === "application\/x-javascript" || /.+\.js(\?\.+)?/.test(url.pathname)) {
			txt = js_beautify(txt, {
				'indent_size': 1,
				'indent_char': '\t'
			});
			lang = {
				name: "javascript",
				json: true
			};
		} else {
			txt = cssbeautify(txt);
			lang = "text/css";
		}
		CodeMirror.runMode(txt, lang, output);
		for (var i = 0; i < txt.split("\n").length; i++) {
			numbers.appendChild(document.createElement("span"));
		}
	}
}());