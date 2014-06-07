// ==UserScript==
// @name           FixOurName
// @namespace      Bloop
// @include        https://pioneers.berkeley.edu/teams/
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main(){
	$('img')[10].title="2011 Albany HS";
	$('img')[10].alt="2011 Albany HS"
}


addJQuery(main);
