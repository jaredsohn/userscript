// ==UserScript==
// @name           sequential txt scrambler
// @namespace      http://polog.org/
// @include        *
// ==/UserScript==
// based on http://userscripts.org/scripts/show/23540 by youpy

var tags = ['sup', 'sub', 'i', 's', 'big', 'small', 'u', 'tt', 'span'];


var nodeWalker = function(node, nodeType, fun){
    this.nodes = node.childNodes;
    this.nodeType = nodeType;
    this.fun = fun;
    this.idx = -1;
    this.next();
}
nodeWalker.prototype.current = function(){
    return this.nodes[this.idx];
}
nodeWalker.prototype.next = function(){
    if(++this.idx >= this.nodes.length) return;
    var n = this.current();
    if(n.nodeType == this.nodeType) {
        this.fun(n);
    } else if(n.childNodes && n.childNodes.length > 0) {
        new nodeWalker(n, this.nodeType, this.fun);
    }
    var self = this;
    setTimeout(function(){self.next()}, 100);
}


function scramble(node) {
    var f = function(str) {
        var offset = Math.floor(Math.random() * str.length)
        var tag = tags[Math.floor(Math.random() * tags.length)];
        var b = document.createElement(tag);

        if(offset > 0) {
            b.appendChild(f(str.slice(0, offset)));
            b.appendChild(f(str.slice(offset)));
        } else {
            b.innerHTML = str;
        }

        return b;
    };
    node.parentNode && node.parentNode.replaceChild(f(node.nodeValue), node)
}


// Node.TEXT_NODE is undefined on Greasemonkey script
new nodeWalker(document.body, 3, scramble);

if (window.AutoPagerize) {
    window.AutoPagerize.addFilter(function (pages) {
        pages.forEach(function (page) {
            new nodeWalker(page, 3, scramble);
        });
    });
}
