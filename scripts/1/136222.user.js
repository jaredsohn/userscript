// ==UserScript==
// @name           spam remover
// @namespace      bleh
// @description    Replaces duplicate line spam with a link to show it
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @version	   	   1.3
// ==/UserScript==

var maxLines = 6,
    container = document.querySelector('form[name="delform"]'),
   	reducedLinesClass = 'show-lines';

[].forEach.call(container.querySelectorAll('blockquote'), function(el){
	removeDuplicates(el);
});

container.addEventListener('DOMNodeInserted', function(event){
	var node = event.target;
	if (node.className == 'postContainer replyContainer') {
		removeDuplicates(node.querySelector('blockquote'));
	}
});

function removeDuplicates(blockquote){
	var array = blockquote.innerHTML.split('<br>'),
		line, i, re, count;

	for (i = 0; i < array.length; i++) {
		line = array[i];

		if (line.length == 0 || line == ' ') continue;

		re = new RegExp(quote(line), 'g');
		count = blockquote.innerHTML.match(re);

		if (count.length >= maxLines) {
			hideComment(blockquote, line + ' x' + count.length);
			break;
		}
	}
}

function hideComment(blockquote, repalceWith){
	var a = document.createElement('a'),
		link = document.createElement('blockquote');

	a.href = '#';
	a.innerHTML = repalceWith;
	a.className = reducedLinesClass;
	link.appendChild(a);

	blockquote.parentNode.appendChild(link);
	blockquote.style.display = 'none';
}

// escaping regex
function quote(str) {
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};

//mimics jQuery.parents() poorly
function parents(el, fn){
	while (el && el.nodeName != 'HTML'){
		if (fn.call(el)) return el;
		
		el = el.parentNode;
	}

	return null;
}

container.addEventListener('click', function(e){
	var node = e.target;

	if (parents(node, function(){ return this.className == reducedLinesClass; })){
		var blockquote;

		e.preventDefault();
		e.stopPropagation();
		
		blockquote = parents(node, function(){ return this.nodeName == 'BLOCKQUOTE'; });

		if (blockquote) {
			blockquote.style.display = 'none';
			blockquote.previousElementSibling.style.display = '';
		}
	}
})