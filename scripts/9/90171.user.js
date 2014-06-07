// ==UserScript==
// @name          Dirty Quotes
// @namespace     http://dirty.ru/
// @description   Dirty Quotes Button
// @include       http://www.dirty.ru/comments/*
// @include       http://dirty.ru/comments/*
// ==/UserScript==
 
 
 
function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}
 
 
var gAll = getElementsByClass('comment_inner');
for (var key in gAll)
{
        var val = gAll[key];
        var t_inner = getElementsByClass('c_body',val);
        var t_inner = getElementsByClass('c_body', val);
        var c_inner = t_inner[0].innerHTML;
        c_inner = c_inner.replace('&','amp');
        c_inner = c_inner.replace("'",'');
        c_inner = c_inner.replace('"','');
 
        var t_footer = getElementsByClass('c_footer', val);
        var t_username = getElementsByClass('c_user', t_footer[0]);
        var c_username =  t_username[0].innerHTML;
        var link = document.createElement('a');
        link.setAttribute('href', 'http://quotes-dirty.ru/write?username='+encodeURI(c_username)+'&text='+encodeURI(c_inner));
        link.setAttribute('target', '_blank');
        link.setAttribute('class', 'c_answer');
        link.innerHTML = "в цитатник";
        t_footer[0].appendChild(link);
 
}