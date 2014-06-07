// ==UserScript==
// @name           Blue House
// @namespace      am
// @description    Turns the word 'house' blue like in the book House of Leaves.
// @include        http://*
// ==/UserScript==
// version 0.3
// created 2009-07-03
// last modified 2009-07-16 
// author Aaron McBride (http://www.apejet.org/aaron/)
//
// WARNING: this script will run against most pages and 
//   will cause unknown performance and usability problems
//   not recommended for day-to-day use!
//
// license: MIT License.  Some code based on a jQuery plugin by Johann Burkard (http://johannburkard.de)
//   http://johannburkard.de/resources/Johann/jquery.highlight-3.js
// more info on the jQuery plugin at:
//   http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
// color and word choices based on House of Leaves by Mark Z. Danielewski
//   http://en.wikipedia.org/wiki/House_of_Leaves
//
// Changes:
// 0.3 - send the texts to markup as a list so that we only do one DOM pass
// 0.2 - fixed bug with killing text in textareas
// 0.1 - basic implementation
// 
// TODO: ???

function styleText(n, textClasses) {
    var skip = 0;
    if(n.nodeType == 3 && n.parentNode.nodeName != "TEXTAREA") {
        for(var i = 0; i < textClasses.length; i++) {
            var textClass = textClasses[i];
            var pos = n.data.toLowerCase().indexOf(textClass.text);
            if (pos != -1) {
                var spannode = document.createElement('span');
                spannode.className = textClass.className;
                var middlebit = n.splitText(pos);
                var endbit = middlebit.splitText(textClass.text.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
            }
        }
    } else if (n.nodeType == 1 && n.childNodes && !/(script|style)/i.test(n.tagName)) {
        for (var i = 0; i < n.childNodes.length; i++) {
            i += styleText(n.childNodes[i], textClasses);
        }
    }
    return skip;
}

if (window.document && window.document.body
    && document.getElementsByTagName('head') && document.getElementsByTagName('head')[0]) {
    
    //define the styles
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '._house { color: #007 } strike, ._minotaur { color: #F00 }';
    document.getElementsByTagName('head')[0].appendChild(style);
    //apply the styles
    var textClasses = [{"text":"house", "className":"_house"},
                       {"text":"minotaur", "className":"_minotaur"}];
    styleText(window.document.body, textClasses);
    
}
