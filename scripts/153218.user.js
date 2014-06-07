// ==UserScript==
// @name        Ignore Keywords
// @namespace   http://www.neogaf.com/
// @include     http://www.neogaf.com/forum/*
// @version     1.03
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

	var bannedWords = new Array("InsertWordHere1", "InsertWordHere2");
	
	$('td')
		.each(function(e){
		
			for(var i=0; i<bannedWords.length; i++)
			{
				if($(this).text().toLowerCase().indexOf(bannedWords[i].toLowerCase()) > -1)
				{
					$(this).parent().parent().hide();
				}
			}
		});	
}
addJQuery(main);

