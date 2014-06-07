// ==UserScript==
// @name           Adds definitions back to the 2010 Google search results layout
// @namespace      http://blog.sixteenseve.com/
// @description    Adds definitions back to the 2010 Google search results layout
// @include        https://*.google.*
// @include        http://*.google.*
// @version        1.1
// ==/UserScript==

(function(){
    var userInput = document.getElementsByName('q')[0].value
    var terms = userInput.split(" ");

var oldHTML = document.getElementById('resultStats').innerHTML;
var newHTML = "<style>a.ext:hover  {text-decoration: underline !important; color:#4373db !important;}</style><a href='http://www.answers.com/topic/" + userInput + "' class='ext' style='color:#6E6E6E; text-decoration:none'>" + oldHTML + "</a>";
document.getElementById('resultStats').innerHTML = newHTML;

    var links = "<style>a.ext:hover  {display: text-decoration: underline !important; color:#4373db !important;}</style>";
   
    for (var i=0; i<terms.length; i++) {
         links = links + " <a href='http://dictionary.com/browse/" + terms[i] + "?fromAsk=true' class='ext' style='color:#6E6E6E; text-decoration:none'>" + terms[i] + "</a>";
    }
    document.getElementById('resultStats').innerHTML = document.getElementById('resultStats').innerHTML + links;
})();