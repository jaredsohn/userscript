// ==UserScript==
// @name          rftg_refresh
// @namespace     http://genie.game-host.org/
// @description   adds auto refresh to rftg
// @include       http://genie.game-host.org/game*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

function determine_status() {
    re = new RegExp("Status: (.*?)Your", "g");
    status = "None";
    $("p").each(function(i, para) {
	para_text = $(para).text();
	result = re.exec(para_text)
	if (result) {
	    status = result[1];
	}
    });
    return status;
}

(function() {
    // get game id from url
    var loc = String(window.location);
    if (loc == "http://genie.game-host.org/gamelist.htm") {
	$('title').text('Games in Progress (RFTG)');
	return;
    }
    var s = loc.split("=");
    var display_id = "#" + s[1];
    var game_id = "#" + s[1] + ",T";

    status = determine_status();
    if (status == "Game End") {
	// the game is over.
	$('title').text('Game End! (RFTG ' + display_id + ')');
	return;
    }
    if (status != "Waiting") {
	// the user is taking an action.
	$('title').text('Your Move! (RFTG ' + display_id + ')');
	return;
    }

    $('title').text('Waiting... (RFTG ' + display_id + ')');
    
    // check periodically if it has become the user's turn.
    var count = 1;
    function update() {
        $.get("http://genie.game-host.org/activelist.htm", function(data){
	    data = $(data);
	    data.find("tr").each(function(i, row) {
        	var game_row = false;
		row = $(row);
		row.find("td").each( function(j, elem){
		    if ($(elem).text() == game_id) {
			game_row = true;
		    } 
		    if ($(elem).text() == "Your turn") {
			if (game_row) {
				window.location = loc; //reload w/o prompt
			}
		    }
		});
	    });
	});
	// set timeout and call the next iteration.
	over_ten = Math.max(11, count) - 11;
	over_five = Math.max(6, count) - 6;
	wait = 10000 + 5000 * over_five + 1000 * over_ten * over_ten;
	count = count + 1;
	setTimeout(update, wait);
    }
    update();
}());



