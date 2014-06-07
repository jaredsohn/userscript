// ==UserScript==
// @name        Ignore Keywords
// @namespace   http://www.neogaf.com/
// @include     http://www.neogaf.com/forum/*
// @version     1.04
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	$('.postbit-post ').each(function(e){
			if($(this).text().indexOf('Remove user from') > -1)
			{
				$(this).parent().hide();
			}
			
		});	
}
addJQuery(main);