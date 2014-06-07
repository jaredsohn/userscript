// ==UserScript==
// @name           Gibberizer
// @namespace      Gibberizer
// @description    Jumbles up all the words on the page.
// @grant          none
// @include        *
// ==/UserScript==


//Delay in milliseconds for jumbling text after page update
var updateDelay = 500; 
var slowDownOnTheseSites = [
	'www.facebook.com',
];
if (slowDownOnTheseSites.indexOf(window.location.host) >= 0){
	updateDelay = 1500;
}

var globalwords = []; 

function shuffle(words){ //Knuth-Yates-Fisher shuffle, or picking out of a hat :)
	var t,j;
	for( var i = words.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i+1));
		t = words[i];
		words[i] = words[j];
		words[j] = t;
	}
}

function addback(text){
	var words = text.match(/[a-zA-Z]+/g);
	if (words == null) return text;
	var negative = text.match(/[^a-zA-Z]+/g);
	if (negative == null) return globalwords.pop();

	var output = "";
	if ( text.indexOf(words[0]) < text.indexOf(negative[0])){
		for (var i = 0; i < words.length; i++){
			output += globalwords.pop();
			if (negative[i] !== undefined){
				output += negative[i];
			}
		}
	}else{
		for (var i = 0; i < negative.length; i++){
			output += negative[i];
			if (words[i] !== undefined){
				output += globalwords.pop();
			}
		}
	}
	return output;
}
var unwantedNodeTypes = [
	'script',
	'style',
	'noscript',
];
function jumble(){
	globalwords = []; //reset globalwords,

	//collect text nodes,
       	var walker = document.createTreeWalker(
		document,
		NodeFilter.SHOW_TEXT,
		null,
		false
	);
	var type, node, matches;
	while(node = walker.nextNode()) {
		type = node.parentNode.nodeName.toLowerCase();
		if (unwantedNodeTypes.indexOf(type) >= 0) continue;
		matches = node.nodeValue.match(/[a-zA-Z]+/g);
		if (matches == null) continue;
		globalwords = globalwords.concat(matches);
	}

	shuffle(globalwords); //jumble,

	//add back!
	walker = document.createTreeWalker(
		document,
		NodeFilter.SHOW_TEXT,
		{acceptNode: function(node){
			var type = node.parentNode.nodeName.toLowerCase();
			if (unwantedNodeTypes.indexOf(type) >= 0){
				return NodeFilter.FILTER_ACCEPT;
			}
			node.nodeValue = addback(node.nodeValue);
			return NodeFilter.FILTER_ACCEPT;
		}},
		false
	);
	while(walker.nextNode()) {continue};
}

document.addEventListener("DOMContentLoaded",function(){
	jumble(); //Jumble what gets loaded initially

	var updating = false;
	function update(){
		if (updating == false){
			updating = true;
			setTimeout(function(){
				jumble();
				updating = false;
			},updateDelay);
		}
	}

	//C'mon, we gotta keep jumbling if page updates!
	var mutationobserver = new MutationObserver(function(mutations){
		mutations.forEach(function(mutation){
			if(mutation.type === 'childList'){
				update();
				return;
			}
		});
	});

	mutationobserver.observe(document, {
		childList: true,
		attributes: true,
		characterData: true,
		subtree: true,
	});
}, false);
