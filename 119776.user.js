// ==UserScript==
// @name           AutoScanning
// @author         KamaZz
// @include        http://*.ogame.*/game/index.php?page=galaxy&session=*
// @include        http://*.ogame.*/game/index.php?page=messages&session=*
// @include        http://*.ogame.*/game/index.php?page=showmessage&session=*
// ==/UserScript==
var document = unsafeWindow.document;
var $ = unsafeWindow.$;
// for multi language support, change the value of idioma below to one of the supported languages (en, pt, ru)
var idioma = 'en';
var LANG;
var LANG_NAME = {
    en: "English",
    pt: "Portuguese",
    ru: "Русский",
};
// lang EN
var LANG_EN = {
    scan: "Scan",
    all: "All",
    idle: "Idle",
    lowidle: "Low Idle",
    from: "from",
    ending: "ending",
    notabove: "top players are not above",
    start: "Start",
    stop: "Stop",
    change: "Change",
    noprobes: "No probes were available to be sent",
};
// lang PT-BR
var LANG_PT = {
    scan: "Scaniar",
    all: "Todos",
    idle: "Inativos",
    lowidle: "Low Inativos",
    from: "de",
    ending: "até",
    notabove: "Maior Rank",
    start: "Iniciar",
    stop: "Parar",
    change: "Mudança",
    noprobes: "Não sondas estavam disponíveis para ser enviados",
};
// lang RU
var LANG_RU = {
    scan: "Сканить",
    all: "всех",
    idle: "Ишки",
    lowidle: "Low Idle",
    from: "начиная с",
    ending: "заканчивая",
    notabove: "рейтинг игроков не выше",
    start: "Вперёд",
    stop: "остановить",
    change: "изменение",
    noprobes: "Нет зондов были доступны для отправки",
};
// switch to language defined in idioma
switch (idioma) {
case 'en':
    LANG = LANG_EN;
    break;
case 'pt':
    LANG = LANG_PT;
    break;
case 'ru':
    LANG = LANG_RU;
    break;
default:
    LANG = LANG_EN;
};
// load location information from page
var galaxy = $("#galaxy_input");
var system = $("#system_input");
var rank = $("#bar li:eq(2)").text();
$("#galaxytableHead").after('<table cellspacing="0" cellpadding="0" border="0" id="galaxytable"><tr class="info info_headertd" colspan="13" id="interface"></td></tr></table>');
$("#interface").html('<span>' + LANG.scan + ' <select><option value="all" selected="selected">' + LANG.all + '</option><option value="i">' + LANG.idle + '</option><option value="li">' + LANG.lowidle + '</option></select> ' + LANG.from + ' <input type="text" id="min" size="3" /> ' + LANG.ending + ' <input type="text" id="max" size="3" /><span id="all">, ' + LANG.notabove + ' <input type="text" id="rank" size="3" /></span>&nbsp;<input type="button" id="scanner" value="' + LANG.start + '" /> </span>');
$("#scanner").click((function () {
    var min = $("#min").val().split(':');
    var max = $("#max").val().split(':');
    galaxy.val(min[0]);
    system.val(min[1]);
    unsafeWindow.submitForm();
    setTimeout((function () {
        parse(max[0], max[1], $("#interface option:selected").val());
    }), randomNumber(3000, 5000));
}));
$("#interface option:eq(2)").click((function () {
    $("#all").css("display", "inline");
}))
$("#interface option:eq(1)").click((function () {
    $("#all").css("display", "none");
}))
$("#interface option:eq(0)").click((function () {
    $("#all").css("display", "inline");
}))

function randomNumber(m, n) {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor(Math.random() * (n - m + 1)) + m;
}
var parse = function (max_galaxy, max_system, who) {
        var address = window.location;
        address += "";
        var session = address.match(/[^=]{12}$/);
        var count;
        if (who == "all") var rank = $("#interface #rank").val();
        var galaxy = $("#galaxy_input");
        var system = $("#system_input");
        var i = 0;
        var interval = setInterval((function () {
            if (i < 15) {
                if (!($("#galaxytable .row:eq(" + i + ") span[class*='vacation']").html()) && !($("#galaxytable .row:eq(" + i + ") span[class*='noob']").html())) {
                    if (who == "all") {
                        var prank = parseInt($("#galaxytable .row:eq(" + i + ") .anti_rank").text().match(/\d+/g));
                        if (prank >= rank) {
                            var url = 'index.php?page=minifleet&session=' + session + '&ajax=1';
                            params = new Object();
                            params.mission = 6;
                            params.galaxy = galaxy.val();
                            params.system = system.val();
                            params.position = parseInt(i + 1);
                            params.type = 1;
                            params.shipCount = 5;
                            $.post(url, params, unsafeWindow.displayMessage);
                        }
                    } else if (who == "li") {
                        var prank = parseInt($("#galaxytable .row:eq(" + i + ") .anti_rank").text().match(/\d+/g));
                        if (prank >= rank) {
                            var url = 'index.php?page=minifleet&session=' + session + '&ajax=1';
                            params = new Object();
                            params.mission = 6;
                            params.galaxy = galaxy.val();
                            params.system = system.val();
                            params.position = parseInt(i + 1);
                            params.type = 1;
                            params.shipCount = 5;
                            $.post(url, params, unsafeWindow.displayMessage);
                        }
                    } else {
                        if ($("#galaxytable .row:eq(" + i + ") span[class*='inactive']").html()) {
                            var url = 'index.php?page=minifleet&session=' + session + '&ajax=1';
                            params = new Object();
                            params.mission = 6;
                            params.galaxy = galaxy.val();
                            params.system = system.val();
                            params.position = parseInt(i + 1);
                            params.type = 1;
                            params.shipCount = 5;
                            $.post(url, params, unsafeWindow.displayMessage);
                        }
                    }
                }
                i++;
            } else {
                clearInterval(interval);
                retry();
            }
        }), randomNumber(200, 1000));

        function retry() {
            if (system.val() != max_system) {
                if (system.val() < 499) {
                    unsafeWindow.submitOnKey(39);
                    setTimeout((function () {
                        parse(max_galaxy, max_system, who);
                    }), randomNumber(3000, 5000));
                } else {
                    if (galaxy.val() != max_galaxy) {
                        galaxy.val(galaxy.val() * 1 + 1);
                        system.val(1);
                        unsafeWindow.submitForm();
                        setTimeout((function () {
                            parse(max_galaxy, max_system, who);
                        }), randomNumber(3000, 5000));
                    }
                }
            } else {
                if (galaxy.val() != max_galaxy) {
                    galaxy.val(galaxy.val() * 1 + 1);
                    system.val(1);
                    unsafeWindow.submitForm();
                    setTimeout((function () {
                        parse(max_galaxy, max_system, who);
                    }), randomNumber(3000, 5000));
                }
            }
        }
    }
if (system.val() > 50) $("#min").val(galaxy.val() + ":" + parseInt(system.val() - 50));
else $("#min").val(galaxy.val() + ":" + 1);
if (system.val() < 449) $("#max").val(galaxy.val() + ":" + parseInt(system.val() * 1 + 50));
else $("#max").val(galaxy.val() + ":" + 499);
$("#rank").val(parseInt(rank.replace(/\D/g, "")) + 500);
