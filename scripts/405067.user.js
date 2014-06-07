// ==UserScript==
// @name        replace goog tracking url
// @namespace   *.google.*
// @version     1
// @grant       none
// @include     *.google.*
// @includes    *.google.*
// ==/UserScript==

function replace_url(elem, attr) {
    var elems = document.getElementsByTagName(elem);
    for (var i = 0; i < elems.length; i++){
        elems[i][attr] = elems[i][attr].replace('https://www.google.com/url?q=', '');
        elems[i][attr] = elems[i][attr].replace('http://www.google.com/url?q=', '');  
        elems[i][attr] = elems[i][attr].replace('https://encrypted.google.com/url?q=', ''); 
        elems[i][attr] = elems[i][attr].replace('https://www.google.com/aclk?', ''); 
        elems[i][attr] = elems[i][attr].replace('/url?q=http', 'http');  
        elems[i][attr] = elems[i][attr].replace(/sa=.*http/, 'http');  
        elems[i][attr] = elems[i][attr].replace(/&sa=.*/, '');  
        elems[i][attr] = elems[i][attr].replace('https://www.google.com/http', 'http'); 
        elems[i][attr] = unescape(elems[i][attr]);
        
    }
}

// window.onload = function() {
    console.log("greasemonkey launched");
    replace_url('a', 'href');
    replace_url('img', 'src');
    // etc
// }