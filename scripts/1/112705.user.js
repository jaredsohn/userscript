// ==UserScript==
// @name           klavogonki: user info
// @namespace      klavogonki
// @include        http://klavogonki.ru/g/*
// @include        http://www.klavogonki.ru/g/*
// @author         novkostya
// @version        1.0
// ==/UserScript==

function profilePopupExtra(id, text) {
	var user = null;
	game.players.each(function(player) {
		if (player.info.user.id == id) {
			user = player.info.user;
		}
	});
	
	var div = document.createElement('div');
	div.innerHTML = text;
	var table = div.getElementsByTagName("table")[1];
	table.rows[5].cells[1].innerHTML = user.avg_speed + " зн/мин";
	table.rows[6].cells[1].innerHTML = user.avg_error + "%";
	table.insert("<th>Очки:</th><td>" + user.scores + "</td>");
	table.insert("<th>Бонусы:</th><td>" + user.bonuses + "</td>");
	return div.innerHTML;
}

function showProfilePopup(a) {
    var b = $("popup");
    WindowSize.setPopupPos(b);
    b.show();
    if (profile_popup_cache[a]) {
        $("popup_content").innerHTML = profile_popup_cache[a];
    } else {
        if (!profile_popup_timers[a]) {
            $("popup_content").innerHTML = "<img src=\"/img/loading.gif\">";
            profile_popup_timers[a] = setTimeout(function () {new Ajax.Request("/ajax/profile-popup", {parameters: {user_id: a, gametype: game.custom ? game.params.gametype : "normal"}, onSuccess: function (c) {profile_popup_cache[a] = profilePopupExtra(a, c.responseText);$("popup_content").innerHTML = profile_popup_cache[a];WindowSize.setPopupPos(b);b.show();}});profile_popup_timers[a] = null;}, 1000);
        }
    }
}

var script = document.createElement("script");
script.innerHTML = profilePopupExtra + showProfilePopup;
document.body.appendChild(script);