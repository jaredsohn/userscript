// ==UserScript==
// @name           Gaddy Helper
// @namespace      http://userscripts.org/scripts/show/124765
// @description    Enhancement for gaddy hits on mturk. 
// @include        http://*buildmyrank.com/portal/mt*
// @include        https://*buildmyrank.com/portal/mt*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      Nobody
// @version        0.9.8

// ==/UserScript==

//Note: We used to keep the domain limited to buildmyrank.com/mturk.php?writer_assignment but the urls seem to be in flux now. 


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


function main() {

  var fullLinkString = $("li:last").text();
  var textRE = fullLinkString.match("written for (.*), so");

  convertedre = textRE[1];
  for (var i=0; i<4; i++) {
		convertedre = convertedre.replace("DOT", ".");
  }
  
  //find and strip off http or https prefix so later link works (untested live, but should work)
  if (convertedre.substr(0,7).toLowerCase()=='http://'){
	convertedre = convertedre.substr(7)
  }
  if (convertedre.substr(0,8).toLowerCase()=='https://'){
	convertedre = convertedre.substr(8)
  }
  


  //convertedre = '<a href="'+convertedre+'">Link text</a>';
  $("ul").append("<li>"+convertedre+"</li>");
  convertedre2 = '<a href="http://www.'+convertedre+'" target=_blank>'+convertedre+'</a>';
  $("ul").append("<li>"+convertedre2+"</li>");

  //find keyword string
  var keywordString = $("b:first").text();
  //build search text and anchors
  var googleString = '<a href=\"http://www.google.com/search?q=' + keywordString + '\" target=_blank> Google: ' + keywordString + '</a>';
  var bingString = '<a href=\"http://www.bing.com/search?q=' + keywordString + '\" target=_blank> Bing: ' + keywordString + '</a>';
  var wikiString = '<a href=\"http://en.wikipedia.com/wiki/Special:Search/' + keywordString + '\" target=_blank> Wikipedia: ' + keywordString + '</a>';

  //append to document
  $("ul").append("<li>"+googleString+"</li>"); 
  $("ul").append("<li>"+bingString+"</li>"); 
  $("ul").append("<li>"+wikiString+"</li>"); 
}

// load jQuery and execute the main function
addJQuery(main);