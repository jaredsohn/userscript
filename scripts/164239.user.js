// ==UserScript==
// @name        WaniKani Vocab Examples
// @namespace   penx.scripts
// @description	Adds example sentences to the vocab pages on WaniKani.
// @include     http://www.wanikani.com*/vocabulary/*
// @exclude     */quickview/*
// @version     6.0
// @run-at 		document-end
// @updateURL	https://userscripts.org/scripts/source/164239.meta.js
// ==/UserScript==
	    
var vocabMarker = document.getElementsByClassName("japanese-font-styling-correction");
var vocab = vocabMarker[0].innerHTML;
var translationMarker = document.getElementsByTagName("h1");
var translation = translationMarker[0].innerHTML.split("</span></span> ")[1].split("\n")[0];
var start = document.getElementsByClassName("span12");

if(start){

	start[1].innerHTML = start[1].innerHTML + 
		'<section id="sentences">' +
		'<H2>Example Sentences</H2>' +
		'</section>';
		
}

document.getElementById("sentences").style.display="none";

var JSONaddr = 'http://anyorigin.com/get?url=http://www.jisho.org/sentences?jap='+vocab;

GM_xmlhttpRequest({

	method: "GET",
    url: JSONaddr,
	
    onload: function(xhr) {
	
		var data = eval("(" + xhr.responseText + ")");
		var realstuff = data.contents.split("<div style=\"margin: 15px;\">")[1];
		
		if(realstuff){
		
			realstuff = realstuff.split("</div>")[0];
			realstuff = realstuff.replace(/<a\b[^>]*>/gm,"").replace(/<\/a>/gm, "");

			document.getElementById("sentences").innerHTML += "<p>From <a href=http://www.jisho.org/sentences?jap=" + vocab + ">jisho.org</a>:</p>" + realstuff;
			var lowers = document.getElementsByClassName("lower");
			
			for(var i=0;i<lowers.length;i++){
			
				lowers[i].style.display="none";
			}
			
			GM_addStyle("table#word_result td { border: 1px; border-style: dashed; border-left: 0; border-right: 0; } table#word_result tr:first-child td { border-top: 0; } table#word_result tr:nth-last-child(2) td { border-bottom: 0; }");
			GM_addStyle(".match { color: rgb(100,100,100); }");
			GM_addStyle("td.english { font-family: \"Ubuntu\",Helvetica,Arial,sans-serif; font-size: 16px; }");
			GM_addStyle("td.japanese { font-family: \"Meiryo\",\"Hiragino Kaku Gothic Pro\",\"?????? Pro W3\",\"????\",\"Osaka\",\"MS PGothic\",\"MS P????\",sans-serif;	 font-size: 16px; }");

		}else{
		
			document.getElementById("sentences").innerHTML += "<p>No sentences found. :(</p>";
			
		}
		
		document.getElementById("sentences").style.display="inline";
		
    }
	
});