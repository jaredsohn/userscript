// ==UserScript==
// @name        Wikipedia Torrent Assistant
// @require http://sizzlemctwizzle.com/updater.php?id=75369
// @namespace   giant.badger.extensions
// @description Remove spoliers when checking wikipedia for new episodes
// @include     http://en.wikipedia.org/wiki/*_(season_*)
// @version     1
// ==/UserScript==

// ===================== LOAD JQUERY ============================
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// ===============================================================

function main() {

	// =========== Spoiler Code =========================
	$(".description a").css("color", "black");
	$(".description").css("background-color", "black");
	
	$(".description").mouseenter(function () {
		$("a", this).css("color", "#0000FF");
		$(this).css("background-color", "white");
		//$(this).animate({backgroundColor: 'white'}, 'slow');
	});

	$(".description").mouseleave(function () {
		$("a", this).css("color", "black");
		$(this).css("background-color", "black");
		//$(this).animate({backgroundColor: 'black'}, 'slow');
	});	

	// =========== Add Download Links ===================
	var season_raw = window.location.pathname;
	var season_num = season_raw.match(/[0-9]+/);
	var snum_original = season_num;
	
	var show_name = season_raw.replace("/wiki/", "");
	show_name = show_name.replace("_(season_" + season_num + ")", "");
	show_name = show_name.replace(/_/g, "+");
	if (season_num.toString().length == 1) {
		season_num = "0" + season_num;
	}
			
	$(".vevent").not(".infobox").each(function () {
		var _c = 0;
		$(this).children().each(function () {
			if (_c == 1) {
				var ep_num = $(this).text();
				if (ep_num.toString().length == 1) {
					ep_num = "0" + ep_num;
			}
				
			var dl_url = "http://torrentz.eu/search?f=" + show_name + "+s" + season_num + "e" + ep_num;
			$(this).replaceWith('<a href="' + dl_url + '">Download Ep.' + ep_num + '</a>');	
			}
			_c++;
		});
	});

	// =========== Add Season Download Link ==============

	var season_url = "http://torrentz.eu/search?f=" + show_name + "+season+" + snum_original;
	$("#firstHeading").append('<a href="' + season_url + '"> Download Season ' + season_num + '</a>');

}


addJQuery(main);