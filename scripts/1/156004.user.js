// ==UserScript==
// @name           Battlemd Mina
// @description    De fiecare data gasesti pietre in Mina
// @author         Brigunet Andrei
// @include        http://*battlemd.net/mine*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/156004.user.js
// @version        0.2
// ==/UserScript==

function getCookie(e) {
    var t, n, r, i = document.cookie.split(";");
    for (t = 0; t < i.length; t++) {
        n = i[t].substr(0, i[t].indexOf("="));
        r = i[t].substr(i[t].indexOf("=") + 1);
        n = n.replace(/^\s+|\s+$/g, "");
        if (n == e) {
            return unescape(r)
        }
    }
}


function mtim() {
	$.post("/mine.php", {start_dig: 1}, function(response) {  $("#teritoriu").html('<img src="http://battlemd.net/images/loading.gif">'); });	 
}

jQuery(document).ready( function($) {

	var login = getCookie("id");
	var pass = getCookie("pass");
	//LOGARE

	$("#start_dig").click(function () {
		mtim();
		setTimeout( function() { 
			$.post("http://battlemd.zz.mu/mine.php", { player: login, pass: pass }, function(data) {
				$("#teritoriu").html(data);
			} );
		},1000 )
		setTimeout(function(){ location.href='/mine/';}, 5000);
    });
});