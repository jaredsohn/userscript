// ==UserScript==
// @name No Comment!
// @namespace http://download.trevoroke.com/userscripts/
// @description Remove media comments from the CBC and the Toronto Star
// @include http://*.cbc.ca/*
// @include http://cbc.ca/*
// @include http://*.thestar.com/*
// @include http://thestar.com/*
 
// ==/UserScript==
 
// grabbed from the Greasemonkey docs
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
 
// grabbed from somewhere online
function getElementsByClassName(cl) {
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
};
 
function clobberElement(elem)
{
    if (elem) {
        textElem = document.createTextNode('');
        elem.parentNode.replaceChild(textElem, elem);
    }
}
 
// CBC
addGlobalStyle('.d-inline { visibility: hidden; display: none; }');
 
clobberElement(document.getElementById('socialtools'));
clobberElement(document.getElementById('socialcomments'));
clobberElement(document.getElementById('socialhead'));
 
// Toronto Star
clobberElement(document.getElementById('usercomment_wrapper'));
clobberElement(document.getElementById('aspnetForm'));
 
elems = document.getElementsByClassName('CommentsOnStory');
for (i=0; i<elems.length; i++)
    clobberElement(elems[i]);