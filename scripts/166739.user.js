// ==UserScript==
// @name       Censor Big Brother IL
// @namespace  http://www.roypeled.com/
// @version    0.1
// @description  This will censor all big brother posts in facbeook
// @match      https://*/*
// @copyright  2013+, You
// ==/UserScript==

var stream = document.querySelector("#globalContainer");

function filter(){

    var stories = stream.querySelectorAll(".storyInnerContent");
    for(var i=0; i < stories.length; i++){
        var story = stories[i];
        var content = story.textContent;
        if(/דיירים|אח הגדול/.test(content)){
            story.innerHTML = "<h1 style='line-height: 80px;'>פח</h1>";
        }
    }
    
}

if(stream){

    filter();    
    
    stream.addEventListener("DOMNodeInserted", function (ev) {
      filter();
    }, false);
}