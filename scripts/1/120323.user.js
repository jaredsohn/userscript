// ==UserScript==
// @name Make Massachusetts Department of Revenue Site Better 
// @match https://wfb.dor.state.ma.us/webfile/Business/Private/WebForms/FileReturns/filereturns.aspx* 
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
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
  $("#content > table > tbody > tr > td:nth-child(1)").html("<iframe width='800px' height='700px' id='results'></iframe>")
  $("form")[0].target="results";
}

// load jQuery and execute the main function
addJQuery(main);