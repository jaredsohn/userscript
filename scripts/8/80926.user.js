// ==UserScript==
// @name           Google Dictionary fix
// @namespace      
// @description    Adds definitions back to the 2010 Google search results layout
// @include        http://*.google.*
// ==/UserScript==


(function(){
    var userInput = document.getElementsByName('q')[0].value
    var terms = userInput.split(" ");

    var links = "<style>a.ext:hover  {display: text-decoration: underline !important; color:#4373db !important;}</style>";
   
    for (var i=0; i<terms.length; i++) {
         links = links + " <a href='http://www.google.com/dictionary?aq=f&langpair=en|en&hl=en&q=" + terms[i] + "' class='ext' style='color:#6E6E6E; text-decoration:none'>" + terms[i] + "</a>";
    }
    document.getElementById('resultStats').innerHTML = document.getElementById('resultStats').innerHTML + links;
})();