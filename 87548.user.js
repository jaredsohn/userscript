// ==UserScript==
// @name           NextPlease!
// @namespace      http://www.web2samus.com/
// @description    keyboard navigation of prev/next pages
// @include        *
// ==/UserScript==

var prev_pattern, next_pattern;
prev_pattern = RegExp().compile(Array(
    '\\bprev(ious)?\\b',
    '\\banterior\\b',
    '^\\s*&lt;',
    '^\\s*<',
    '^\\s*←'
).join('|'), 'i');
next_pattern = RegExp().compile(Array(
    '\\bnext\\b',
    '\\bsiguiente\\b',
    '&gt;\\s*$',
    '>\\s*$',
    '→\\s*$'
).join('|'), 'i');

function navigate(pattern) {
    function test_child_imgs(link_elem) {
        var i_child, link_child;

        for (i_child = 0; i_child < link_elem.childNodes.length; i_child++) {
            link_child = link_elem.childNodes[i_child];
            if (link_child.nodeName == 'IMG' && pattern.test(link_child.alt))
                return true;
        }
        return false;
    }
    var i_link, link_elem, head_links;

    // test "link" tags on head element
    head_links = document.getElementsByTagName('link');
    for (i_link = 0; i_link < head_links.length; i_link++) {
        link_elem = head_links[i_link];
        if (pattern.test(link_elem.rel))
            return link_elem.href;
    }

    // test normal links on the rest of the document
    for (i_link = document.links.length - 1; i_link >= 0; i_link--) {
        link_elem = document.links[i_link];
        if (pattern.test(link_elem.rel) || pattern.test(link_elem.textContent) || test_child_imgs(link_elem))
            return link_elem.href;
    }
}

unsafeWindow.addEventListener('keypress', function(e) {
    var url;
    if (e.altKey) {
        switch (String.fromCharCode(e.charCode)) {
        case '[':
            url = navigate(prev_pattern);
            break;
        case ']':
            url = navigate(next_pattern);
            break;
        }
    }
    if (url)
        window.location = url;
}, false);

