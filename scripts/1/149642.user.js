// ==UserScript==
// @name       Replace MMail.com.my autoplay video ads with  a picture of kitten
// @namespace  http://www.mmail.com.my
// @version    0.1
// @description  Replace MMail.com.my autoplay video ads with  a picture of kitten
// @match      http://www.mmail.com.my/*
// @copyright  2012+, Weldan Jamili http://mweldan.com
// ==/UserScript==

//http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
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

// the guts of this userscript
function main() {
  $("object").replaceWith('<img src="http://placekitten.com/230/400" alt="" title="courtesy of mweldan.com" />');
}

// load jQuery and execute the main function
addJQuery(main);
