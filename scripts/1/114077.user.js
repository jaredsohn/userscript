// ==UserScript==
// @name           Glitch Achievement Checker
// @namespace      http://beta.glitch.com/profiles/PCRVAH9D41N1IGA/
// @include        http://www.glitch.com/achievements/
// @include        http://www.glitch.com/achievements/?*
// @match          http://www.glitch.com/achievements/
// @match          http://www.glitch.com/achievements/?*
// @description    Dims the achievements that you've already achieved, revealing ones you should work on.
// @require        http://updater.usotools.co.cc/114077.js
// ==/UserScript==

(function() {

function main() {
	$(document).ready(function() {
		var id;
		var achievedArray = [];
		var isFlipped = (document.location.search.match(/^\?(.*)+/) && document.location.search.match(/^\?(.*)+/)[1].split('&').indexOf('flip=1') > -1);
		
		function sortAchievements(a, b) {
			var x = $(a).find('a > img').attr('src').match(/_([0-9]+_[0-9]+).png/)[1];
			var y = $(b).find('a > img').attr('src').match(/_([0-9]+_[0-9]+).png/)[1];
			if (x > y) { return 1; }
			return -1;
		}
		api_call("players.info", {}, function(e) {
			id = e.player_tsid;
			$.get(document.location.protocol + "//" + document.location.host + "/profiles/" + id + "/achievements/",
			function(data) {
				var links = $(data).find('ul.badges li.tip a strong');		
				links.each(function(index, t){
					achievedArray.push($(t).html());
				});
				var achievedCount = 0;
				$("a.tip").each(function(index, link) {
					var link = $(link);
					var item = $(link).find('span.item-name').html();
						
					if (achievedArray.indexOf(item) != -1) {
						if (!isFlipped) { link.css("opacity", "0.25"); }
						achievedCount++;
					} else {
						if (isFlipped) { link.css("opacity", "0.25"); }
                    }
				});
				var sortedAchievements = $('ul.items-list li');
				sortedAchievements.sort(sortAchievements);
				$('ul.items-list li').remove();
				$('ul.items-list').append(sortedAchievements);
				
				$("h1.first").parent().append("<h4>" + achievedCount + " done, " + ($("a.tip").length - achievedCount) + " to go!</h4>");
			});
		});
	});
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();