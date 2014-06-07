// ==UserScript==
// @name  	Zhihu Highlight Me
// @include	http://www.zhihu.com/*
// ==/UserScript==

function nativeTreeWalker(pat) {
    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT, 
        null, 
        false
    );

    var node;
    var hl = '<span style="background:yellow;font-weight:900">$&</span>';

    while(node = walker.nextNode()) {
        var s = node.nodeValue;
        if (s.match(pat)) {
            var np = node.parentNode;
            if (np.nodeType == 1) {
              // alert (np.nodeName);
              if (node.parentNode.nodeName.toLowerCase() == 'script') {
                continue;
              }
              np.innerHTML = np.innerHTML.replace (pat, hl);
            }
            node.nodeValue = s.replace (pat, hl);
            // alert (node.nodeValue);
        }
    }
}

p = document.getElementsByClassName ('xis')[0].firstChild.nodeValue;
pat = new RegExp ('@' + p, 'ig');
nativeTreeWalker (pat);
