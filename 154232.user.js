// ==UserScript==
// @name         Words replacer
// @namespace    http://userscripts.org/users/475424
// @description  Just add the words you want to replace with others when you write a text.
// @include      *
// @grant        none
// @version      0.1
// @updateURL    https://userscripts.org/scripts/source/154232.meta.js
// @downloadURL  https://userscripts.org/scripts/source/154232.user.js
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  var words = {
    " pò" : " po'",
    /* ADD HERE YOUR WORDS!!111 */
    " "   : " "
  };
        
  $('textarea').keyup(function() {
    for(var word in words) {
      $(this).text($(this).text().replace(word, words[word]));
      $(".textMetrics").text($(".textMetrics").text().replace(word, words[word])); // this is for the Facebook chat
    }
  });
}

addJQuery(main);