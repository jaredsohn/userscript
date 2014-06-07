// ==UserScript==
// @name           kissmanga arrows chapter navigation
// @version        1.0
// @namespace      
// @author         stansmith
// @description    Bind left and right arrow keys to previous and next chapter links like a proper slideshow program
// @include		   http://kissmanga.com/manga/* 	
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @run-at-document-end
// ==/UserScript==
document.addEventListener("keyup",keyup,false);
var next = $('a:has(img[title=Next chapter])').attr('href');
var prev = $('a:has(img[title=Prev chapter])').attr('href');
                 
function keyup (key) {
    if (key.keyCode==39) {
        // -->
        window.location.href = next;
    } else if (key.keyCode==37) {
        // <--
        window.location.href = prev;
    }
}