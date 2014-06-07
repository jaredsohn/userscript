// ==UserScript==
// @name           Autocaps2
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/*
// @version        1.0.1
// ==/UserScript==




String.prototype.endsWith = function(str){return (this.match(str+"$")==str)}
String.prototype.trim = function(){return(this.replace(/[\s]+$/, ""))}
String.prototype.startsWith = function(str){return (this.match("^"+str)==str)}
var capAfter = ["\n", "\n\n", ". ", "! ", "? ", ":) ", ":D ", ":P ", ":( ", ":/ ", ":* ", ":O "];	// po tych kapitalizujemy
var noCapAfter = ["...", "np.", "ww.", "p.n.e.", "n.p.m.", "vs.", "doc.", "hab.", "dyr.", "red.", "dot.", "dz.", "inf.", "tyg.", "cdn.", "tzn.", "tj.", "ds.", "jw.", "m.in.", "z o.o.", "p.s.", "inż.", "prof.", "itp.", "itd.", "ul.", "tel.", "godz.", "min.", "max.", "płn.", "płd.", "wsch.", "zach.", "gosp.", "polit."];	// po tych nie kapitalizujemy
var ignore = ["http", "www"];		// te ignorujemy

//activate(document.getElementById("tresc"));

var textareas = document.getElementsByTagName("textarea");
for(var i=0; i<textareas.length; i++){
	activate(textareas[i]);
}

// jeśli piszemy, co 2 sekundy robi reformat, albo natychmiast, jeśli textbox straci fokus
function activate(textarea){	
	textarea.addEventListener("change", function(e){ reformat(e.target); }, false);	
	textarea.addEventListener("keypress", function(){ textarea.changed = true; }, false);		
	textarea.addEventListener("cut", function(){ textarea.changed = true; }, false);	
	textarea.addEventListener("paste", function(){ textarea.changed = true; }, false);	
	textarea.timer = window.setInterval(function(){ if(textarea.changed) reformat(textarea); }, 2000);
	textarea.addEventListener("blur", function(){ window.clearInterval(textarea.timer); }, false);
	textarea.addEventListener("focus", function(){ timer = window.setInterval(function(){ if(textarea.changed) reformat(textarea); }, 2000); }, false);
}

function reformat(e){		
	if(e.value.indexOf("--ac") != -1){
		e.value = e.value.replace("--ac", "");
		e.acDisabled = true;
	}
	if(e.value.indexOf("++ac") != -1){
		e.value = e.value.replace("++ac", "");
		e.acDisabled = false;	
	}
	if(e.acDisabled){
		e.changed = false;
		return;
	}
	
	var selStart = e.selectionStart;
	var selEnd = e.selectionEnd;	
	var scrollbarPos = e.scrollTop;
	var text = e.value;
	
	var noCapFirst = false;
	for(var i in ignore){
		if(text.startsWith(ignore[i])){
			noCapFirst = true;
			break;
		}
	}	
	if(!noCapFirst) text = capFirst(text);
	
	for(var i in capAfter){
		text = capitalizeAfter(text, capAfter[i]);
	}

	e.value = text;
	e.selectionStart = selStart;
	e.selectionEnd = selEnd;
	e.scrollTop = scrollbarPos;
	e.changed = false;
}

function capitalizeAfter(text, mark){
	mark = mark.toLowerCase();
	var startPos = text.toLowerCase().indexOf(mark); // zadziała dla :D i :d
	while(startPos != -1){
		var leftPart = text.substring(0, startPos + mark.length);	// lewa strona wraz ze znakiem końca (zwykle spacja na końcu!
		var rightPart = text.substring(startPos + mark.length);		// reszta - z wielkiej litery

		var noException = true;
		for(var i in noCapAfter){
			noException = noException && !leftPart.trim().toLowerCase().endsWith(noCapAfter[i]);
		}
		for(var i in ignore){
			noException = noException && !rightPart.toLowerCase().startsWith(ignore[i]);
		}

		if(noException){
			rightPart = capFirst(rightPart);
			text = leftPart + rightPart;
		}else{
		}

		startPos = text.toLowerCase().indexOf(mark, startPos + mark.length + 1);
	}
	return text;
}

function capFirst(text){
	return text.substring(0,1).toUpperCase() + text.substring(1);
}
