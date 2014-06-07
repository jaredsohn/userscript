// ==UserScript==
// @name           4chan line spam remover
// @namespace      bleh
// @description    Replaces duplicate line spam with a link to show it
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @version        1.4
// ==/UserScript==

var maxLines = 3,
    maxWord = 20,

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
    var lines = blockquote.innerHTML.split('<br>'), words = new Array(),
        line, i, re, count, replaceWith = '',
        keys = new Array(), duplicates = {};

    for (i = 0; i < lines.length; i++) {
        line = lines[i];
        keys = Object.keys(duplicates);

        if (keys.indexOf(line) >= 0 || line.length == 0 || line == ' ' || line == '<br>')
            continue;

        re = new RegExp(quote(line), 'g');
        count = blockquote.innerHTML.match(re);

        if (count.length >= maxLines) {
            duplicates[line] = count.length;
        }
    }

    if (keys.length > 0) {
        hideComment(blockquote, keys.join('<br />'), count.length);
        return;
    }

    words = blockquote.innerHTML.split(' ');

    var map = {};
    var count = words.map(function(val) {
        return map[val] = (typeof map[val] === 'undefined') ? 1 : map[val] + 1;
    });

    for(word in map){
        if (map[word] > maxWord) {
            replaceWith = lines[0].length < 50 ? lines[0] : lines[0].substring(0, 50);
            hideComment(blockquote, replaceWith + '...', count.length);
            break;
        }
    }
}

function hideComment(blockquote, repalceWith, count){
    var a = document.createElement('a'),
        link = document.createElement('blockquote');

    a.href = '#';
    a.innerHTML = 'Show duplicates' + ' x '+ count;
    a.className = reducedLinesClass;

    link.innerHTML = repalceWith;
    link.appendChild(document.createElement('br'));
    link.appendChild(document.createElement('br'));
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