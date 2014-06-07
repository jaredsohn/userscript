// ==UserScript==
// @name           MathJax for Campfire
// @description    Loads MathJax onto a page to render math equations.
// @author         Ben Mabey
// @include       *.campfirenow.com/room*
// ==/UserScript==

(function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://github.com/javascripts/other/MathJax/MathJax.js"; //TODO: switch to MathJax's public URL when announced!

  var config = 'MathJax.OutputJax.fontDir = "https://github-assets.s3.amazonaws.com/javascripts/MathJax/fonts";' +
                'MathJax.Hub.Config({' +
                 'extensions: ["tex2jax.js","TeX/noErrors.js"],' +
                 'jax: ["input/TeX","output/HTML-CSS"],' +
               '});' +
               'MathJax.Hub.Startup.onload();';

  if (window.opera) {script.innerHTML = config}
               else {script.text = config}

  document.getElementsByTagName("head")[0].appendChild(script);
})();

