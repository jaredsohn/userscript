// ==UserScript==
// @name            OGame: Scan moon
// @namespace		localhost
// @description     Автоматически сканирует луну через галактику (транспорт)
// @author          Interdiction
// @include         http://*-ru.ogame.gameforge.com/game/index.php?page=fleet*
// @include         http://*-ru.ogame.gameforge.com/game/index.php?page=preferences*
// @version 		1.0
// ==/UserScript==

if (localStorage.getItem('ship_210')) {
    if (document.location.href.indexOf ("&type=3&mission=3") > 1) {
        localStorage.setItem('scan', '1');
    }
    if (localStorage.getItem('scan')) {
        if (document.location.href.indexOf ("fleet1") > 1) {
            $("#ship_210").val(localStorage.getItem('ship_210'));
            setInterval((function() {
                if (document.getElementById('continue').className == 'on') {
            	    $("#continue span").click();
                }
            }), 1000);
        }
        if (document.location.href.indexOf ("fleet2") > 1) {
            setInterval((function() {
            	$("#continue span").click();
            }), 1000);
        }
        if (document.location.href.indexOf ("fleet3") > 1) {
            setInterval((function() {
            	$("#start span").click();
                localStorage.removeItem('scan');
            }), 1000);
        }
    }
} else {
    if (document.location.href.indexOf ("fleet1") > 1) {
        document.location.href = 'index.php?page=preferences';
    }
    localStorage.setItem('ship_210', document.getElementsByName('spio_anz')[0].value);
}
if (document.location.href.indexOf ("preferences") > 1) {
    $(".btn_blue").click((function() {
    	localStorage.setItem('ship_210', document.getElementsByName('spio_anz')[0].value);
    }));
}