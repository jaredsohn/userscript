// ==UserScript==
// @name           Use answers.com for google define results
// @namespace      http://blog.chmouel.com/
// @description    Use answers.com for google define results
// @include        http://*.google.*
// ==/UserScript==

(function(){
    
resultStats = document.getElementById("resultStats");
word =  resultStats.childNodes[7].textContent
if (resultStats.childNodes[9].text == "definition")
    resultStats.childNodes[9].href = "http://www.answers.com/topic/" + word

})();    
