// ==UserScript==
// @name            ByrByrByr
// @namespace       byrbyrbyr
// @description     Attempts to organize <br> (newline) elements in posts
// @include         http://www.newkaliningrad.ru/forum/topic/*
// @version         2.1
// @icon            http://www.klgd.ru/city/characters/gerb.png
// @grant           none
// ==/UserScript==

 var posts = document.getElementsByClassName('post entry-content');

 for (var i = 0; i < posts.length; i++)
    posts[i].innerHTML = posts[i].innerHTML.
            replace(/&lt;br\s\/&gt;/g, '<br>').           // XHTML <br /> to HTML <br>
            replace(/(<br>\s*)*<p\s/g, '<br><br><p ').    // exactly 2 before <p *>
            replace(/\/div>(\s*<br>)*/g, '/div><br>').    // exactly 1 after /div>
            replace(/(<![^>]*>)(<br>\s*)+/g, '$1').       // no need after <!*>
            replace(/quote\">\s*(<br>\s*)+/g, 'quote">'). // no need in the beginning of quote
            replace(/(<br>\s*)+<\/div>/g, '</div>').      // no need before </div>
            replace(/(<br>\s*){3,}/g, '<br><br>');        // no more than 2 anywhere
