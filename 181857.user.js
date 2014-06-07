// ==UserScript==
// @name              Tagowyłapywacz 
// @namespace         kamdz.pl
// @description       Dodaje dyskretne wyróżnienie dla wpisów na mikroblogu zawierających obserwowane tagi.
// @author            Kamil "kamdz" Dzwonkowski 
// @version           1.1
// @include           http://*wykop.pl/mikroblog*
// ==/UserScript==

var main = function () {
	$(function() {
		var tags = $("#observedTags span").map(function() {
			return $(this).text();
	    }).get();
		
		var check = function () {
			$("li[data-type='entry'] a.showTagSummary").each(function() {
				if ($.inArray($(this).text(), tags) !== -1)
					$(this).closest(".aCI").css("border-left", "2px solid #ACACAC");
			});
		};
		
		$(document).ajaxComplete(function(event, xhr, settings) {
			if (settings.url.indexOf("ajax/stream/recent/id") !== -1 || settings.url.indexOf("ajax/entries/add") !== -1 || settings.url.indexOf("mikroblog/next") !== -1)
				check();
		});

		check();
	});
};

var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild(script);