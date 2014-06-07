// ==UserScript==
// @name       Erepublik epic finder
// @version    1.5
// @description  Automated find epic, based on http://userscripts.org/scripts/show/177749
// @include      http://*.erepublik.com/*
// @downloadURL		http://userscripts.org/scripts/source/177837.user.js
// @updateURL		http://userscripts.org/scripts/source/177837.meta.js
// @copyright  Tmin10
// ==/UserScript==

function wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    setTimeout(wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    main();
  }
}
wait();



function main() {
	main_type = location.href.split("/")[4];
	military_type = location.href.split("/")[5];
	hp = globalNS.userInfo.wellness;
	max_hp = reset_health_to_recover;
	rec_hp = parseInt($(".tooltip_health_limit").html());
	
	if (main_type == "military") {
		//not main page
		if (military_type == "campaigns") {
			//battles list, check for epic battle
			if ($("img").hasClass("isEpicBattle")) {
				//epic battle active
				epic_url = "http://www.erepublik.com" + $(".isEpicBattle").siblings().eq(5).attr("href");
				location.href = epic_url;
			} else {
				//no epic battle
				
				setTimeout(function() {
					location.href = "http://www.erepublik.com/en/military/campaigns";
				}, 30000);
				
			}
		} else if (military_type == "battlefield") {
			//battle page, alert
			var mailNotification = new Notification("Erepublik epic finder", {
    tag : "Erepublik-epic-finder",
    body : "Epic battle open!",
    icon : "http://i.imgur.com/hQOn0kC.png"
});
		}
	}
}