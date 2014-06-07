// ==UserScript==
// @name        DPQuote
// @include     http://*.dobreprogramy.pl*
// @exclude http://www.dobreprogramy.pl/Blog,Edycja*
// @exclude http://www.dobreprogramy.pl/Blog,Nowy*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @grant       none
// ==/UserScript==

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
	jQ("span.nick").children(":first-child").click(function(event){
		event.preventDefault();
		text = jQ("textarea").val();
		new_text = "@"+jQ(this).html()+"\n\r"+text;
		jQ("textarea").val(new_text);
	});

	jQ("a.color-inverse").click(function(event){
		event.preventDefault();
		text = jQ("textarea.input-text").val();
		new_text = "@"+jQ(this).html()+"\n\r"+text;
		jQ("textarea.input-text").val(new_text);
	});
}
addJQuery(main);