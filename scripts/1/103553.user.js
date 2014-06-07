// ==UserScript==
// @name           Glitch Achievement Checker
// @namespace      http://beta.glitch.com/profiles/PCRVAH9D41N1IGA/
// @include        http://beta.glitch.com/achievements/
// @match          http://beta.glitch.com/achievements/
// @description    Dims the achievements that you've already achieved, revealing ones you should work on.
// ==/UserScript==

function main() {
    $(document).ready(function() {
        var id,
            achievedArray = [],
			$itemsList = $('.items-list');

		function sortNumber(a,b) {
			return b.num - a.num;
		}
			
        api_call("players.info", {},
        function(e) {
            id = e.player_tsid;
            $.get("http://beta.glitch.com/profiles/" + id + "/achievements/",
            function(data) {
				var links = $(data).find('ul.badges li.tip a strong'),
					orderedItems = [],
					orderedIds = [];
					
				links.each(function(index, t){
                    achievedArray.push($(t).html());
				});
				var achievedCount = 0;
                $("a.tip").each(function(index, link) {
                    var $link = $(link),
						item = $link.find('span.item-name').html(),
						achievementNum,
						achievementNumArr = $link.find('img').attr('src').split('_'),
						orderedItem;
					
					achievementNumArr.pop()
					achievementNum = achievementNumArr.pop();
					
                    if (achievedArray.indexOf(item) != -1) {
                        $link.css("opacity", "0.25");
                        achievedCount++;
                    }
					orderedItems.push({num:achievementNum, item:$link.parent()});
					//					console.log(achievementNum);
                });
				orderedItems.sort(sortNumber);
				console.log(orderedItems);
				while(orderedItems.length > 0){
					orderedItem = orderedItems.shift();
					if(orderedItem){
						$itemsList.prepend($(orderedItem.item));
					}
				}
                $("h1.first").parent().append("<h4>" + achievedCount + " done, " + ($("a.tip").length - achievedCount) + " to go!</h4>");
            });
		});
    });
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);
