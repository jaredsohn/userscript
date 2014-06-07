// ==UserScript==



// @name           Word blocker

// @namespace      jarblewiki.tiddlyspot.com/



// @description    Blocks pages if they contain specified words.

// ==/UserScript==





//redirect to a random site from a list



block = 0;


//edit this list.
wordBlock("Poké");

wordBlock("fractal");

wordBlock("w3schools");

wordBlock("falling sand");

wordBlock("bionicle");

wordBlock("facebook");

wordBlock("wiki");

wordBlock("cellular automata");

wordBlock("games");

wordBlock("scratch.mit.edu");

wordblock("flash");

wordBlock("youtube");

wordBlock("Trolo");

wordBlock("trolo");

wordBlock("Rickroll");

wordBlock("Ubuntu");


function wordBlock(word){

//if the page doesn't contain "word", redirect

if(document.body.innerHTML.indexOf(word) != -1){

block++;

}

}


//if a blocked word is present

if(block > 0){

location.replace("http://www.google.com");

}