// ==UserScript==
// @name           Zend Framework: Less Useless Tab/Document Titles
// @namespace      http://www.bitconsultants.net
// @include        http://framework.zend.com/manual/*
// ==/UserScript==

function clean(value){
    value = value.replace(/<\/?[^>]+>/gi, '');
    value = value.replace(/[0-9]/g, '');
    value = value.replace(/\./g, '');
    value = value.replace(/&nbsp;/, '');
    return value;
}

var page_heading = clean(document.getElementsByClassName('info')[0].firstChild.firstChild.nodeValue);
document.getElementsByTagName('title')[0].innerHTML = page_heading + ' - ZF Docs';