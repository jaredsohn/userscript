// ==UserScript==
// @name           Reddit Checkboxes
// @description    Checkmark all interesting stories and have them all open at once.
// @include        http://www.reddit.com/
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Initialize everything by adding in extra elements (checkboxes, etc.)
$('div#siteTable div.thing').each(function() {
	$(this).prepend('<input class="mycheck" type="checkbox" style="height:30px;float:left;position:relative;top:11px;">');
});

$('body').append('<input id="openchecked" type="button" style="position:fixed;right:0;bottom:0;height:30px;width:120px;" value="Open Checked">');


// Set the behaviors for clicking
$('div#siteTable div.thing').click(function() {
	var checked = $(this).children('input:checkbox').prop('checked');

	if (checked) {
		$(this).children('input:checkbox').prop('checked', false);
	} else {
		$(this).children('input:checkbox').prop('checked', true);
	}
});

$('input#openchecked').click(function() {
	$('div.thing input:checkbox:checked').each(function() {
		var commentURL = $(this).siblings(".entry").find('a.comments').prop('href');

		window.open(commentURL);
	});
});
}

// load jQuery and execute the main function
addJQuery(main);