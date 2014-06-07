// ==UserScript==
// @name	 Dreamwidth Auto-Cut
// @namespace	
// @description	Automatically does a cut tag for entires > 500 words
// @include	 http://*dreamwidth.org/read*
// @exclude
// @version	 0.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
// courtesy of Erik Vergobbi Vold & Tyler G. Hicks-Wright — thanks!
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
    $("div.entry").each(function () {
        // TO CHANGE THE WORDCOUNT CUTOFF
        // please change the line below this to the desired value (e.g. wc = 1000;)
        var wc_cutoff = 500;
        
        var username = $('span.poster', this).contents().text();
        
        var linknum_pattern = /entry-([0-9]+)/g;
        var linknum_raw = $(this).attr('id');
        var linknum_result = linknum_pattern.exec(linknum_raw);
        var linknum = linknum_result[1]
        
        var entry = $('div.entry-content', this).contents().text();
		var words=entry.split(" ");
		var wc=words.length;
        
        if (wc>wc_cutoff)
        {
			$('div.entry-content',this).replaceWith("<span class=cuttag_container><span class=cuttag><b><a href=http://" + username + ".dreamwidth.org/" + linknum + ".html>Auto-cut for length.</a></b></span></span>");
        }
        // blocks to promote SFWness
        if (username=="14nights_feed")
        {
        	$('div.entry-content',this).replaceWith("<span class=cuttag_container><span class=cuttag><b><a href=http://" + username + ".dreamwidth.org/" + linknum + ".html>Auto-cut for 14nights_feed.</a></b></span></span>");
        }
	});
}

// load jQuery and execute the main function
addJQuery(main);