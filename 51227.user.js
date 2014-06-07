// ==UserScript==
// @name           Passfans
// @namespace      http://passfans.com/forum/*
// @description    Passfans remove hidden text and fix e_d_u links
// @include        http://passfans.com/forum/thread*
// @include        http://passfans.com/forum/viewthread*
// ==/UserScript==

function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/e_d_u/gi,'edu',null);



var span, spans = document.getElementsByTagName('span');
for(var i=spans.length-1; i>=0; i--) {
span = spans[i];
if(span.style.display=='none') span.parentNode.removeChild(span);
}


var font, fonts = document.getElementsByTagName('font');
for(var i=fonts.length-1; i>=0; i--) {
font = fonts[i];
if(font.style.fontSize=='0px') font.parentNode.removeChild(font);
}



