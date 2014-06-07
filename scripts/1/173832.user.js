// ==UserScript==
// @name       Yii :: giix auto select base Models
// @namespace  http://www.codesk.co.th/
// @version    0.1
// @description  enter something useful
// @match      *://*/*gii/giixModel
// @copyright  2013+, Codesk Co.,Ltd.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// the guts of this userscript
function main() {
    jQ('tr','.preview').each(function(index, obj){
        if(jQ('td.file:contains("base")',obj).length > 0) {
			jQ('input',obj).attr('checked','checked');
        }
    });
}
// load jQuery and execute the main function
addJQuery(main);
