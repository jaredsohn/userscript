// ==UserScript==
// @name        Merriam-Webster Dictionary With KK
// @namespace   tsaiid
// @description	  Add Kenyon and Knott (KK) pronouncing to Merriam-Webster Dictionary
// @include     http://www.merriam-webster.com/*
// @version		0.1.2
// @copyright	I-Ta Tsai (http://blog.tsaiid.idv.tw/)
// @license     GPL version 3 or any later version; http://www.gnu.org/licenses/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==
// Based on script built by PCMan's script of KK converter.
// https://docs.google.com/leaf?id=0B4BhmC8V2mivMmQxZWUyNmItYjViMS00YzRjLTg5MDUtNDhiMzRjNWViYjNk&hl=en
//Change Log:
//0.1.2 By Tsai KD. Check jQuery, because Chrome doesn't support @require tag.
//0.1.1	Can recurrsively change KK if more than one is found.
//		Fix the problem of incorrectly changing the html tags.
//0.1	Initial version.

function addJQuery(callback) {
	if (typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	} else {
		callback();
	}
}

function main() {

	function convert_to_kk(ori) {
		var kk = ori // KK 音標

		kk = kk.replace(/ˈə/g, 'ʌ');	// \ˈə\ as u in abut
		kk = kk.replace(/ə/g, 'ə');	// \ə\ as a in abut
		kk = kk.replace(/<sup>ə<\/sup>/ig, '');	// \<sup>ə</sup>\ as e in kitten
		kk = kk.replace(/ər/g, 'ɝ');	// \ ər \ as ur/er in further 
		kk = kk.replace(/a/g, 'æ');	// \ a \ as a in ash 
		kk = kk.replace(/ā/g, 'e');	// \ā\ as a in ace 
		kk = kk.replace(/ä/g, 'ɑ');	// \ ä \ as o in mop 
		kk = kk.replace(/au̇/g, 'aʊ');	// \ au̇ \ as ou in out 
		// \ b \ as in baby
		kk = kk.replace(/ch/g, 'tʃ');	// \ ch \ as ch in chin
		// \ d \ as d in did
		kk = kk.replace(/e/g, 'ɛ');	// \ e \ as e in bet
		kk = kk.replace(/ˈē/g, 'ˈi');	// \ ˈē \ as ea in easy 
		kk = kk.replace(/ē/g, 'ɪ');	// \ ē \ as y in easy 
		// \ f \ as f in fifty 
		//  \ g \ as g in go 
		// \ h \ as h in hat 
		kk = kk.replace(/i/g, 'ɪ');	// \ i \ as i in hit 
		kk = kk.replace(/ī/g, 'aɪ');	// \  \ as i in ice 
		kk = kk.replace(/j/g, 'dʒ');	// \ j \ as j in job 
		// \ k \ as k in kin 
		// kk = kk.replace(/ḵ/g, '');	// \  \ as ch in ich dien ????
		// \ l \ as l in lily 
		// \ m \ as m in murmur 
		// \ n \ as n in own 
		// kk = kk.replace(/ŋ/g, 'ŋ');	// siŋ\ as ng in sing 
		kk = kk.replace(/ō/g, 'o');	// \ō\ as o in go
		kk = kk.replace(/ȯ/g, 'ɔ');	// \ȯ \ as aw in law 
		// kk = kk.replace(/i/g, 'i');	// \ i \ as oy in boy 
		// \ p \ as p in pepper 
		//  \ r \ as r in red 
		// \ s \ as s in less> 
		kk = kk.replace(/sh/g, 'ʃ');	// \ sh \ as sh in shy 
		// \ t \ as t in tie 
		kk = kk.replace(/<u>th<\/u>/ig, 'ð');	// \ <u>th</u> \ as th in the 
		kk = kk.replace(/th/g, 'θ');	// \ th \ as th in thin 
		kk = kk.replace(/ü/g, 'u');	// \ ü \ as oo in loot 
		kk = kk.replace(/u̇/g, 'ʊ');	// \u̇\ as oo in foot 
		// \ v \ as v in vivid 
		// \ w \ as w in away 
		kk = kk.replace(/yü/g, 'ju');	// \ yü \ as you in youth 
		kk = kk.replace(/yu̇/g, 'jʊ');	// \ yu̇\ as u in curable 
		kk = kk.replace(/y/g, 'j');	// \ y \ as y in yet 
		// \ z \ as z in zone 
		kk = kk.replace(/zh/g, 'ʒ');	// \ zh \ as si in vision
		return kk;
	}

	$ = $.noConflict(); // prevent conflicts with other libraries

	jQuery(document).ready(function($) {
		if ($(".pr").length) {
			$.each($(".pr"), function(){
				var kk_pr = $(this).clone();
				kk_pr.contents().filter(function(){return this.nodeType == 3;}).each(function() {
					$(this).replaceWith(function(){
						return convert_to_kk($(this).text());	
					});
				});
				$(this).append("<br/><span style=\"margin-left: 0px; background: #ffff00; \">KK: " + kk_pr.html() + "</span></span>");
			});
		}
	});
}

addJQuery(main);
