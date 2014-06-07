// ==UserScript==
// @name       Epic Erepublik
// @version    1.05
// @description  Automated epic fighting. USE THIS SCRIPT ONLY WHEN YOU ARE AFK AND IN ONLY 1 WINDOW/TAB WITH EREPUBLIK LAUNCHED, OTHERWISE IT WILL EAT YOUR ENERGY BARS. WHEN NOT NEEDED TURN IT OFF IN GREASEMONKEY ETC
// @include      http://*.erepublik.com/*
// @copyright  MISI
// @downloadURL		http://userscripts.org/scripts/source/177749.user.js
// @updateURL		http://userscripts.org/scripts/source/177749.meta.js
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
				if (reset_health_to_recover - parseInt($(".tooltip_health_limit").html()) < 200) {
					//let's burn some well to not waste refills
					url = "http://www.erepublik.com" + $(".fight_button[href*=military]").eq(0).attr("href");
					location.href = url;
				} else {
					//nothing to do, go back to main page
					location.href = "http://www.erepublik.com/en";
				}
			}
		} else if (military_type == "battlefield") {
			//battle page, let's fight
			setTimeout(function() {
				if (SERVER_DATA.points.defender >= 1800 || SERVER_DATA.points.attacker >= 1800) {
					//battle finished
					location.href = "http://www.erepublik.com/en";
				}
				if ($("#pvp").hasClass("epicBattle")) {
					//epic battle, go all in
					t = setInterval(function() {
						if (globalNS.userInfo.wellness < 10) {
							//regen energy
							if ($("#DailyConsumtionTrigger").hasClass("energy")) {
								//energy bars, ignore
								location.href = "http://www.erepublik.com/en";
							} else {
								//let's eat food
								$("#DailyConsumtionTrigger").click();
							}
						}
						$('#fight_btn').click();
					}, 3000);
				} else {
					// not epic, just burn 5 kills
					i = 1;
					t = setInterval(function() {
						if (globalNS.userInfo.wellness < 10) {
							location.href = "http://www.erepublik.com/en";
						}
						$('#fight_btn').click();
						i++;
						if (i == 5) {
							location.href = "http://www.erepublik.com/en";
						}
					}, 3000);
				}
			}, 3000);
		}
	} else {
		// we are on main page
		if (reset_health_to_recover - globalNS.userInfo.wellness >= 10 && parseInt($(".tooltip_health_limit").html()) >= 10) {
			if ($("#DailyConsumtionTrigger").hasClass("energy")) {
				//energy bars, ignore
			} else {
				//let's eat food
				$("#DailyConsumtionTrigger").click();
			}
		}
		setTimeout(function() {
			location.href = "http://www.erepublik.com/en/military/campaigns";
		}, 30000);
	}
}