// ==UserScript==
// @name       Animefreak Shortcut
// @namespace  http://www.reddit.com/user/ImANewRedditor
// @version    0.1
// @description  enter something useful
// @match      http://www.animefreak.tv/watch/*
// @copyright  2012+, You
// ==/UserScript==

var next = document.getElementsByClassName("page-next")[0], prev = document.getElementsByClassName("page-previous")[0];

// define a handler
function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.ctrlKey && e.keyCode == 37)
    {
        // call your function to do the thing
        prev.click();
    }
    else if (e.ctrlKey && e.keyCode == 39)
    {
        next.click();
    }
}
// register the handler
if (next != undefined && prev != undefined)
{
    document.addEventListener('keyup', doc_keyUp, false);
}