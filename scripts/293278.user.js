// ==UserScript==
// @namespace       likeButton
// @name            Hit that like button! 
// @description     Hit that like button!
// @author          Justin (Fogest)
// @match           http://forums.hardwarezone.com.sg/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    jQ('.vbseo_like_link').each(function(){
		if((jQ(this).parent().parent().parent().css("opacity") > 0.5) && (jQ(this).children().hasClass('hwz-unlike-button') == false))
			this.click();
    });
	var nextButton = jQ('#content ul a:contains("Next ›")');
	if(nextButton.length > 0) {
		console.log("Found next button and attempting to click.");
		nextButton[0].click();
	}
}

// load jQuery and execute the main function
addJQuery(main);