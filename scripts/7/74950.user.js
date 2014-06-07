// ==UserScript==
// @name           Aske...
// @namespace      josteinaj
// @description    Setter inn "aske" foran mange ord på siden
// @include        *
// ==/UserScript==
(function(){
var foo = "not here";
function aske(input) {
	var word = input.replace(/^\s+|\s+$/g,"").toLowerCase();
	if (word.length === 0) repl = false;
	word += ' ';
	var repl = true;
	if (0 <= word.indexOf('.') && word.indexOf('.') < word.length-2) repl = false; // forkortelser
	else if (word.match(/^[^a-zA-ZæøåÆØÅ]/) !== null) repl = false; // bare foran ord
	else if (word.indexOf('aske') === 0) repl = false;
	else if (word.indexOf('og') === 0) repl = false;
	else if (word.indexOf('fra') === 0) repl = false;
	else if (word.indexOf('da') === 0) repl = false;
	else if (word.indexOf('eller') === 0) repl = false;
	else if (word.indexOf('å ') === 0) repl = false;
	else if (word.indexOf('først') === 0) repl = false;
	else if (word.indexOf('innledningsvis') === 0) repl = false;
	else if (word.indexOf('også') === 0) repl = false;
	else if (word.indexOf('dessuten') === 0) repl = false;
	else if (word.indexOf('i') === 0) repl = false;
	else if (word.indexOf('tillegg') === 0) repl = false;
	else if (word.indexOf('til') === 0) repl = false;
	else if (word.indexOf('siden') === 0) repl = false;
	else if (word.indexOf('deretter') === 0) repl = false;
	else if (word.indexOf('endelig') === 0) repl = false;
	else if (word.indexOf('men') === 0) repl = false;
	else if (word.indexOf('for') === 0) repl = false;
	else if (word.indexOf('imot') === 0) repl = false;
	else if (word.indexOf('inntil') === 0) repl = false;
	else if (word.indexOf('ved') === 0) repl = false;
	else if (word.indexOf('gjennom') === 0) repl = false;
	else if (word.indexOf('uten') === 0) repl = false;
	else if (word.indexOf('senere') === 0) repl = false;
	else if (word.indexOf('jeg') === 0) repl = false;
	else if (word.indexOf('du') === 0) repl = false;
	else if (word.indexOf('hun') === 0) repl = false;
	else if (word.indexOf('han') === 0) repl = false;
	else if (word.indexOf('det') === 0) repl = false;
	else if (word.indexOf('vi') === 0) repl = false;
	else if (word.indexOf('de') === 0) repl = false;
	else if (word.indexOf('dermed') === 0) repl = false;
	else if (word.indexOf('første') === 0) repl = false;
	else if (word.indexOf('andre') === 0) repl = false;
	else if (word.indexOf('tre') === 0) repl = false;
	else if (word.indexOf('fjerd') === 0) repl = false;
	else if (word.indexOf('femt') === 0) repl = false;
	else if (word.indexOf('seks') === 0) repl = false;
	else if (word.indexOf('sjette') === 0) repl = false;
	else if (word.indexOf('syv') === 0) repl = false;
	else if (word.indexOf('ått') === 0) repl = false;
	else if (word.indexOf('ni ') === 0) repl = false;
	else if (word.indexOf('ti ') === 0) repl = false;
	else if (word.indexOf('ellev') === 0) repl = false;
	else if (word.indexOf('tolv') === 0) repl = false;
	else if (word.indexOf('slik') === 0) repl = false;
	else if (word.indexOf('særlig') === 0) repl = false;
	else if (word.indexOf('alt') === 0) repl = false;
	else if (word.indexOf('likevel') === 0) repl = false;
	else if (word.indexOf('derfor') === 0) repl = false;
	else if (word.indexOf('altså') === 0) repl = false;
	else if (word.indexOf('som') === 0) repl = false;
	else if (word.indexOf('følge') === 0) repl = false;
	else if (word.indexOf('av') === 0) repl = false;
	else if (word.indexOf('den') === 0) repl = false;
	else if (word.indexOf('grunn ') === 0) repl = false;
	else if (word.indexOf(' ') === 0) repl = false;
	
	word = input.replace(/^\s+|\s+$/g,"");
	if (!repl)
		return word;
	else if (word.match(/^[A-ZÆØÅ]/) === null)
		return 'aske-'+word;
	else
		return 'Aske-'+word.substr(0,1).toLowerCase()+word.substr(1);
}

// Degree of injection
var p = 0.2;

var fill = 0.0;
var elements = document.getElementsByTagName('*');
for (var e = 0; e < elements.length; e++) {
	for (var n = 0; n < elements[e].childNodes.length; n++) {
		var node = elements[e].childNodes[n];
		if (node.nodeType == 3) {
			var split = node.nodeValue.split(' ');
			for (var s = 0; s < split.length; s++) {
				if (fill < 1.0) {
					fill += p;
				} else {
					fill -= 1.0;
					split[s] = aske(split[s]);
				}
			}
			node.nodeValue = split.join(' ');
		}
	}
}

})();