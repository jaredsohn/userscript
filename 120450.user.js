// ==UserScript==
// @name		AtlasRecognizer
// @namespace	AtlasRecognizer
// @description	AtlasRecognizer
// @match 		https://bitcointalk.org/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
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

addJQuery(function(){
	var aliases = ['Atlas', 'HarveyAlpha', 'I.Goldstein', 'Ragnar', 'Immanuel Go', 'ALPHA.', 'Harvey', 'Anonymous...', 'EndTheBanks'];
	$('.poster_info a, td.windowbg2 > a').each(function(ind){
		if (aliases.indexOf($(this).html()) != -1
		) {
			$(this).html('Unremorsefully Atlas <img src="https://bitcointalk.org/Themes/custom1/images/delete.gif" alt="*" border="0">');
			$(this).css('color', 'red');
		}
	});
	$('.quoteheader').each(function(ind){
		var str = $(this).html() + "";
		for (var i in aliases) {
			str = str.replace(" " + aliases[i], " Unremorsefully Atlas");
		}
		$(this).html(str);
	});
});