// ==UserScript==
// @name           RPEx
// @namespace      RPEx
// @description    Remove Robert Poch's posts from blog.idnes.cz forum
// @include        http://blog.idnes.cz/oper/*
// ==/UserScript==


frameEl = document.getElementsByName('main')[0];
aEls = frameEl 
        ? frameEl.contentDocument.getElementsByTagName('A')
        : document.getElementsByTagName('A');
        
if (aEls) {
        for (i = 0, len = aEls.length; i < len; i++) {
            el = aEls[i];
            if (el.getAttribute('href') 
                    && el.getAttribute('href').match(/robertpoch.blog.idnes.cz/)) 
            {
                    el = el.parentNode.parentNode;
                    //el.style.backgroundColor = 'Red';
                    el.style.display = 'none';
            }
        }
}

