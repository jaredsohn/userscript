// ==UserScript==
// @name         KanjiDamageClean
// @namespace    kanji_damage
// @description  Cleans up KanjiDamage
// @vesion       1.0
// @include      http://kanjidamage.com/japanese_symbols/*
// ==/UserScript==

var style;
style = document.createElement('style');
style.type = 'text/css';

function addGlobalStyle(css) {
   style.innerHTML = style.innerHTML + "\n" + css;
}

function parseGlobalStyle() {
   style.innerHTML = "/* kanjidamageclean css */" + style.innerHTML;
   var head;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   head.appendChild(style);
}

parseGlobalStyle();

//> Base
addGlobalStyle('.wrap > div { margin:0; padding:0; }');
addGlobalStyle('.wrap { width:524px; }');

addGlobalStyle('.header { padding:15px 0 9px !important; }');

addGlobalStyle('a { color:#00b; }');
addGlobalStyle('a:hover { color:#002; }');

//> Header
/*var array = new Array();
var seqFlag = 0;
array = document.body.getElementsByName(*);
for(var i = 0; i < array.length; i++) {
	if(array.item(i).className == 'new_sequence_flag') {
		seqFlag = 1;
		break;
	}
}*/
if(document.body.childNodes[1].childNodes[3].childNodes[5].className == 'new_sequence_flag') {
	seqFlag = 1;
} else {
	seqFlag = 0;
}

addGlobalStyle('.sequence { height:35px;');
if (seqFlag) {
	addGlobalStyle('            width:80px;');
} else {
	addGlobalStyle('            width:100%;');
}
addGlobalStyle('            float:right;');
addGlobalStyle('            padding:0 5px;');
addGlobalStyle('            background:#444;');
addGlobalStyle('            color:#eee;');
addGlobalStyle('            text-align:right;');
addGlobalStyle('            font-weight:bold;');
addGlobalStyle('            font-size:28px; }');
document.body.innerHTML = document.body.innerHTML.replace('Number\:', '');

addGlobalStyle('.new_sequence_flag img { display:none; }');
addGlobalStyle('.new_sequence_flag { background:#444');
addGlobalStyle('                                no-repeat');
addGlobalStyle('                                right center;');
addGlobalStyle('                     display:block;');
addGlobalStyle('                     height:35px;');
addGlobalStyle('                     width:434px;');
addGlobalStyle('                     float:left;');
addGlobalStyle('                   }');

//> Content
addGlobalStyle('.title { padding:25px 20px; }');

addGlobalStyle('.properties { float:right;');
addGlobalStyle('              line-height:2;');
addGlobalStyle('              padding:15px 0 0;');
addGlobalStyle('              text-align:center; }');

addGlobalStyle('.components { clear:left; color:#20f; }');

/*addGlobalStyle('.components a { color:#a06; }');
addGlobalStyle('.components a:hover { color:#00f; text-decoration:underline; }');*/

addGlobalStyle('.section { font-size:1.2em; text-transform:lowercase; }');
addGlobalStyle('#Onyomi, .highlightedOnyomiKeyword { color:#f02; font-style:italic; text-transform:lowercase; }');
addGlobalStyle('#Onyomi {font-size:1.2em; }');

addGlobalStyle('.highlightedTranslationKeyword { color:#000; font-weight:bold; }');
addGlobalStyle('.highlightedComponentKeyword { color:#20f; }');

addGlobalStyle('.lookalikes p u { text-decoration:none; font-weight:bold; }')

















addGlobalStyle('.new_sequence_flag { background-image:url("data:image/png;base64,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") }');
