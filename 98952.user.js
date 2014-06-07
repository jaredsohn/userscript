// ==UserScript==
// @name           khl auto refresher
// @include        http://www.khl.ru/*

// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
// Refresh Settings
var refresh = GM_getValue("refresh", 5); // Amount of seconds between reloads
GM_registerMenuCommand("Set Refresh Time", function(){
    var time = prompt("Seconds between refreshes:\n(must be greater than 1)", refresh / 1000);
    window.location.refresh();
    if (time >= 1) {
        GM_setValue("refresh", time);
        refresh = GM_getValue("refresh", 5);
    }
    else 
        if (time < 1) {
            alert('The number must be greater than 1!');
        }
        else {
            alert('Must be a number!');
        }
});


function refresh(){

	$('.calendar').load('/ .calendar', function(response, status, xhr) {
		if (status != "error") {
			var api = $("div.scrollable").scrollable({
				api: true,
				size: 10,
				items: '#thumbs',
				hoverClass: 'hover'
			});
			api.move(7);
		}
	});
	var random_num = (Math.round((Math.random() * 9000) + 1000))
	setTimeout(function(){
		 refresh();
	}, reload + random_num);
}

