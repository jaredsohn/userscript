
// ==UserScript==
// @name           sanskrit vocabulary trainer
// @description    sanskrit vocabulary trainer
// @author         vishvAs vAsuki Iyengar
// @include        http://*
// @version        1.0
// ==/UserScript==

/*jslint devel: true, browser: true, undef: false, vars: true, white: true, maxerr: 50, indent: 4 */

var tooltip = {id: 'tt', top: 3, left: 3, maxw: 300, tt: document.createElement('div'),
h: null, ie: document.all ? true : false};
// Adapted from http://sixrevisions.com/tutorials/javascript_tutorial/create_lightweight_javascript_tooltip/
tooltip.show =  function(v,w){
	"use strict";
   tooltip.tt.setAttribute('id', tooltip.id);
   //tooltip.tt.style.opacity = 0;
   //tooltip.tt.style.filter = 'alpha(opacity=0)';
// <div id="movingDiv" style="position: absolute; left: 100pt; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-color: blue; border-right-color: blue; border-bottom-color: blue; border-left-color: blue; border-top-style: outset; border-right-style: outset; border-bottom-style: outset; border-left-style: outset; width: 160px; background-color: rgb(255, 255, 224); font-weight: bold; top: 158pt; ">Moving Div</div>
   tooltip.tt.style.backgroundColor = 'yellow';
   tooltip.tt.innerHTML = v;
   tooltip.tt.style.display = 'block';
   tooltip.tt.style.position = 'absolute';
   tooltip.tt.style.width = w ? w + 'px' : 'auto';
   if(!w && tooltip.ie){
    tooltip.tt.style.width = tooltip.tt.offsetWidth;
   }
	tooltip.tt.style.top = '50pt';
	tooltip.tt.style.left = '50pt';
   tooltip.tt.style.visibility = 'visible';
   if(tooltip.tt.offsetWidth > tooltip.maxw){tooltip.tt.style.width = tooltip.maxw + 'px';}
   tooltip.h = parseInt(tooltip.tt.offsetHeight, 10) + tooltip.top;
	var pos = function (e){
	  	"use strict";
	   	var u = tooltip.ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
		var l = tooltip.ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
		tooltip.tt.style.top = (u - tooltip.h) + 'px';
		tooltip.tt.style.left = (l + tooltip.left) + 'px';
		console.log("Positioning tooltip.");
		console.log(tooltip.tt);
		document.body.appendChild(tooltip.tt);
	};
	document.onmousemove = pos;
	console.log("Showing tooltip.");
	document.body.appendChild(tooltip.tt);
};
  
 
tooltip.hide = function (){
	"use strict";
	document.onmousemove = null;
	console.log("Hiding tooltip.");
	tooltip.tt.style.visibility = 'hidden';
};

var wordsLookedUp = 0;
var wordMap = {};
var key;
function getMeaning(word) {
	"use strict";
	var xmlHttp = null;
	var Url = "http://m.spokensanskrit.de/index.php?tinput=" + word.toLowerCase() + "&script=HK&direction=ES&link=y";
	xmlHttp = new XMLHttpRequest(); 
	xmlHttp.onreadystatechange = function(){
		// console.log("readyState: " + xmlHttp.readyState);
		if(xmlHttp.readyState !== 4 || xmlHttp.status !== 200){ return;}
		wordsLookedUp = wordsLookedUp + 1;
		var myHTML = xmlHttp.responseText;
		console.log("Word: "+ word);
		if(myHTML.match(/No results found/)){ console.log("Word not found"); 
			return;
		}
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = myHTML;

		var bestWord = "";
		try{
		var rowElements = tempDiv.getElementsByTagName('span');
		var row = rowElements[0].firstChild.firstChild;
		// console.log(row);
		bestWord = row.nodeValue;
		}catch(err){}
		
		console.log(bestWord);
		wordMap[word] = bestWord;
	};
	xmlHttp.open( "GET", Url, true );
	xmlHttp.send( null );
}

var bExpectText = false;
function processSelectedText() {
	"use strict";
	bExpectText = false;
	var txtOriginal = window.getSelection().toString();
	var txt = txtOriginal;
	if (txt === '') { return; }
	console.log(txt);
	txt = txt.replace(/[^a-zA-Z]/g, ' ');
	txt = txt.replace(/ +/g, ' ');
	txt = txt.replace(/^ /g, '');
	txt = txt.trim();
	var words = txt.split(' ');
	console.log(words);
	var numWords = 0;
	var word, i;
	wordsLookedUp = 0;
	for(i = 0; i< words.length; i++) {
		word = words[i].toLowerCase();
		if(!wordMap[word]) {
		wordMap[word] = " "; 
		getMeaning(word);
		numWords = numWords + 1;
		}
	}
	var clockId = 0;
	function processTranslations() {
		if(wordsLookedUp < numWords) {console.log(wordsLookedUp + " " + numWords); return;}
		var newWords = [];
		var bilingualText = "";
		for(i = 0; i< words.length; i++) {
			word = words[i].toLowerCase();
			newWords[i] = wordMap[word];
			bilingualText = bilingualText + words[i] + "[" + newWords[i] + "] ";
		}
		console.log(bilingualText);
		tooltip.show(bilingualText);
		// console.log("clock:" + clockId);
		clearInterval(clockId);
	}
	clockId = setInterval(processTranslations, 500);
}
document.addEventListener('mouseup', processSelectedText, false);
function mouseDownListener() {"use strict"; tooltip.hide(); bExpectText = true;}
document.addEventListener('mousedown', mouseDownListener, false);
