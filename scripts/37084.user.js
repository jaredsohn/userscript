// ==UserScript==
// @name           Change field size
// @namespace      pbr_cfs
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// ==/UserScript==

window.setTimeout( 
    function() {
        change_field();
        realign_players();
    }
, 200);

//480x1060
//520x1170

var fieldWidth = 520;
var fieldHeight = 1170;
var pageWidth = 1080;
var dx = 6;
var dy = 12;
var fdy = 48;

function change_field() {
    var container = document.getElementById("body_container");
    if (container != null) {
        container.setAttribute("style","width:"+pageWidth+"px;");
    }

    var content = document.getElementById("content");
    if (content != null) {
        content.setAttribute("style","width:"+pageWidth+"px;");
    }

    var container = document.getElementById("replay_container");
    if (container != null) {
        container.setAttribute("style","width:"+fieldWidth+"px;");
    }


    var container = document.getElementById("replay");
    if (container != null) {
        container.setAttribute("style","width:"+fieldWidth+"px;");
    }

    var container = document.getElementById("replay_info");
    if (container != null) {
        container.setAttribute("style","float:right;");
    }
    var area = document.getElementById("replay_area");
    if (area != null) {
        area.setAttribute("style","width:"+fieldWidth+"px; height:"+fieldHeight+"px;");
        area.style.backgroundImage = 'url("http://img151.imageshack.us/img151/5180/glblargevo7.jpg")';
        //area.style.backgroundImage = 'url("http://i473.photobucket.com/albums/rr98/saintedix/GLB/GLB-Field---Extended.jpg")';
        //area.style.backgroundImage = 'url("http://img248.imageshack.us/img248/7782/glbsidelinexj4.jpg")';
    }
}

function realign_players() {
    var play_data = unsafeWindow.play_data;
		console.log("play_data.length="+play_data.length);
		for (var fr=0; fr<unsafeWindow.play_data.length; fr++) {
            for (var p=0; p<unsafeWindow.play_data[fr].length; p++) {
                unsafeWindow.play_data[fr][p].x += dx;
                unsafeWindow.play_data[fr][p].y += dy;
            }
        }

    var ds = document.getElementById("ds");
    var dsy = parseInt(ds.style.top) + fdy +"px";
    ds.style.top = dsy;
}




