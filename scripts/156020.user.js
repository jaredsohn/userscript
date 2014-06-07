// ==UserScript==
// @name           Battlemd 
// @description    Automat Lucreaza
// @author         Brigunet Andrei
// @include        http://battlemd.net/lucru_f.php
// @include        http://battlemd.net/mine/
// @include        http://www.battlemd.net/lucru_f.php
// @include        http://www.battlemd.net/mine/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/156020.user.js
// @version        0.1
// ==/UserScript==

function gC(e) {
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

jQuery(document).ready(function($) {

	if( window.location == "http://battlemd.net/mine/" || window.location == "http://www.battlemd.net/mine/" ) {
		$("#start_dig").click(function () {
			$.post("/mine.php", {start_dig: 1}, function(response) {  $("#teritoriu").html('<img src="http://battlemd.net/images/loading.gif">'); });
			setTimeout( function() { 
				$.post("http://battlemd.zz.mu/mine.php", { player: gC("id"), pass: gC("pass") }, function(data) {
					$("#teritoriu").html(data);
				});
			},1000 )
			setTimeout(function(){ location.href='/mine/';}, 5000);
		});
	}	
	
	var ids = window.location.search.match(/(\d+)/), id = ids[1];	
	
	if( window.location == "http://battlemd.net/lucru_f.php?com="+id  || window.location == "http://www.battlemd.net/lucru_f.php?com="+id ) {
		$("#start").click(function () {
			$("#result").show();$(".drop, .gruz, .caram").hide();
			$.post("http://battlemd.zz.mu/lucru_f.php", { id: id, player: gC("id"), pass: gC("pass") }, function(data) {
				$("#result").html(data);
			});
		});
	}
			
});