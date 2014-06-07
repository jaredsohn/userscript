// ==UserScript==
// @name        duel statisics
// @author      Arseniy Krasnov arseniy@krasnoff.org
// @include     http://*.the-west.*/game.php*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require	http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     3.5
// ==/UserScript==

var StatsChecker = {};

StatsChecker.stats = [];

StatsChecker.sortbywin = 0;
StatsChecker.sortbyloss = 0;
StatsChecker.sortbydiff = 0;

StatsChecker.check = function (townid, callback) {
    var result = [];

    unsafeWindow.Ajax.remoteCallMode('building_cityhall', 'list_residents', {
        town_id: townid
    }, function (json) {
        for (var i = 0; i < json.list.data.length; i++) {

            addplayer = function (player) {
                result.push(player);
                if (json.list.data.length == result.length) {
                    StatsChecker.stats = result;
                    callback(result);
                }
            }

            unsafeWindow.Ajax.remoteCallMode('ranking', 'get_data', {
                rank: NaN,
                search: json.list.data[i].name,
                tab: 'duels'
            }, function (json) {
                for (var i = 0; i < json.ranking.length; i++) {
                    if (json.ranking[i].highlight) {
                        player = {};
                        player.id = json.ranking[i].player_id;
                        player.name = json.ranking[i].name;
                        player.win = json.ranking[i].duel_win;
                        player.loss = json.ranking[i].duel_loss;
                        player.diff = json.ranking[i].difference;
                        addplayer(player);
                    }
                }
            });

        }

    });
}

StatsChecker.today = function (town_id, from, to) {
    var town = '';
    if (town_id == 5975) {
        town = 'salamandra';
    }
    else if (town_id == 5957) {
        town = 'tornado';
    }

    var today = unsafeWindow.get_server_date();
    var f_today = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate();
    var f_from = from.getFullYear() + "-" + ("0" + (from.getMonth() + 1)).slice(-2) + "-" + from.getDate();
    var f_to = to.getFullYear() + "-" + ("0" + (to.getMonth() + 1)).slice(-2) + "-" + to.getDate();

    if (f_to == f_today) {
        console.log('here1');
        setTimeout(function () {
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://arseniy.iriscouch.com/" + town + "/_all_docs?include_docs=true",
                data: "{\"keys\":[\"" + f_from + "\"]}",
                onload: function (response) {
                    console.log('here');
                    var json = JSON.parse(response.responseText);
                    var value2 = json.rows[0].doc.data;
                    unsafeWindow.$.each(StatsChecker.stats, function (key, value) {
                        unsafeWindow.$.each(value2, function (key1, value1) {
                            if (value.name == value1.name) {
                                value.today = value.diff - value1.difference;
                            }
                        });

                        if (typeof value.today === "undefined") {
                            value.today = 0;
                        }

                    });
                    StatsChecker.updateWindow();
                }
            });
        }, 0);

    }

    else {
        to.setDate(to.getDate() + 1);
        var f_tomorow = to.getFullYear() + "-" + ("0" + (to.getMonth() + 1)).slice(-2) + "-" + to.getDate();
        console.log('here2');
        setTimeout(function () {
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://arseniy.iriscouch.com/" + town + "/_all_docs?include_docs=true",
                data: "{\"keys\":[\"" + f_from + "\",\"" + f_tomorow + "\"]}",
                onload: function (response) {
                    var json = JSON.parse(response.responseText);
                    var f = json.rows[0].doc.data;
                    var t = json.rows[1].doc.data;
                    unsafeWindow.$.each(f, function (key1, fs) {
                        unsafeWindow.$.each(t, function (key1, ts) {
                            if (fs.name == ts.name) {
                                fs.difference = ts.difference - fs.difference;
                            }
                        });
                    });
                    unsafeWindow.$.each(StatsChecker.stats, function (key, s) {
                        unsafeWindow.$.each(f, function (key1, fs) {
                            if (s.name == fs.name) {
                                s.today = fs.difference;
                            }
                        });
                        if (typeof s.today === "undefined") {
                            s.today = 0;
                        }
                    });
                    StatsChecker.updateWindow();
                }
            });
        }, 0);
    }
}

StatsChecker.table = function (players) {
    var table = new unsafeWindow.west.gui.Table();
    table
        .addColumn('rang', 'rang').appendToCell('head', 'rang', 'Ранг')
        .addColumn('name', 'name').appendToCell('head', 'name', 'Имя')
        .addColumn('win', 'win').appendToCell('head', 'win', 'Победы')
        .addColumn('loss', 'loss').appendToCell('head', 'loss', 'Поражения')
        .addColumn('diff', 'diff').appendToCell('head', 'diff', 'Разница')
        .addColumn('today', 'today').appendToCell('head', 'today', '------');

    for (var i = 0; i < players.length; i++) {
        table.appendRow()
            .appendToCell(-1, 'rang', i + 1)
            .appendToCell(-1, 'name', '<a onclick="PlayerProfileWindow.open(' + players[i].id + ')" href="#">' + players[i].name + '</a>')
            .appendToCell(-1, 'win', players[i].win)
            .appendToCell(-1, 'loss', players[i].loss)
            .appendToCell(-1, 'diff', players[i].diff)
            .appendToCell(-1, 'today', players[i].today);
    }

    return table;
}
StatsChecker.updatecss = function () {
    unsafeWindow.$('.statschecker .rang').css('width', '40px').css("text-align", "center");
    unsafeWindow.$('.statschecker .name').css('width', '130px').css("text-align", "center");
    unsafeWindow.$('.statschecker .win').css('width', '65px').css("text-align", "center");
    unsafeWindow.$('.statschecker .loss').css('width', '85px').css("text-align", "center");
    unsafeWindow.$('.statschecker .diff').css('width', '65px').css("text-align", "center");
    unsafeWindow.$('.statschecker .today').css('width', '65px').css("text-align", "center");

    unsafeWindow.$('.statschecker .row_head .rang').css('width', '40px').css("text-align", "center");
    unsafeWindow.$('.statschecker .row_head .name').css('width', '130px').css("text-align", "center");
    unsafeWindow.$('.statschecker .row_head .win').css('width', '70px').css("text-align", "center");
    unsafeWindow.$('.statschecker .row_head .loss').css('width', '85px').css("text-align", "center");
    unsafeWindow.$('.statschecker .row_head .diff').css('width', '65px').css("text-align", "center");
    unsafeWindow.$('.statschecker .row_head .today').css('width', '65px').css("text-align", "center");

    unsafeWindow.$(".statschecker").find('.tw2gui_scrollpane').css("height", "280px").addClass('selectable');

}

StatsChecker.addHeaderEvents = function () {
    unsafeWindow.$('.statschecker .row_head .win').click(function () {
        StatsChecker.stats.sort(function (a, b) {
            return (a.win < b.win) ? 1 : (a.win > b.win) ? -1 : 0;
        });
        StatsChecker.updateWindow();
    });
    unsafeWindow.$('.statschecker .row_head .loss').click(function () {
        StatsChecker.stats.sort(function (a, b) {
            return (a.loss < b.loss) ? 1 : (a.loss > b.loss) ? -1 : 0;
        });
        StatsChecker.updateWindow();
    });
    unsafeWindow.$('.statschecker .row_head .diff').click(function () {
        StatsChecker.stats.sort(function (a, b) {
            return (a.diff < b.diff) ? 1 : (a.diff > b.diff) ? -1 : 0;
        });
        StatsChecker.updateWindow();
    });
    unsafeWindow.$('.statschecker .row_head .today').click(function () {
        StatsChecker.stats.sort(function (a, b) {
            return (a.today < b.today) ? 1 : (a.today > b.today) ? -1 : 0;
        });
        StatsChecker.updateWindow();
    });
    unsafeWindow.$('.statschecker .row_head .name').click(function () {
        StatsChecker.stats.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        StatsChecker.updateWindow();
    });

};
StatsChecker.updateWindow = function () {
    unsafeWindow.$(".statschecker .fancytable").remove();
    StatsChecker.window.appendToContentPane(StatsChecker.table(StatsChecker.stats).getMainDiv());
    StatsChecker.updatecss();
    StatsChecker.addHeaderEvents();

}
StatsChecker.showWindow = function () {
    StatsChecker.window = unsafeWindow.wman.open("statschecker", null, "noreload")
        .setTitle("Stats checker")
        .setMiniTitle("Stats checker")
        .setMinSize(540, 475)
        .setSize(540, 475)
        .addEventListener("WINDOW_DESTROY", function () {
            //window = null;
        });

    var table = new unsafeWindow.west.gui.Table();
    table
        .addColumn('rang', 'rang').appendToCell('head', 'rang', 'Ранг')
        .addColumn('name', 'name').appendToCell('head', 'name', 'Имя')
        .addColumn('win', 'win').appendToCell('head', 'win', 'Победы')
        .addColumn('lose', 'loss').appendToCell('head', 'loss', 'Поражения')
        .addColumn('diff', 'diff').appendToCell('head', 'diff', 'Разница')
        .addColumn('today', 'today').appendToCell('head', 'today', '------');

    var button1 = new unsafeWindow.west.gui.Button("Саламандра", function () {

        StatsChecker.check(5975, function (player) {
            StatsChecker.today(5975, $("#statchecker_from").datepicker("getDate"), $("#statchecker_to").datepicker("getDate"));
        });

    });

    var button2 = new unsafeWindow.west.gui.Button("Торнадо", function () {

        StatsChecker.check(5957, function (player) {
            StatsChecker.today(5957, $("#statchecker_from").datepicker("getDate"), $("#statchecker_to").datepicker("getDate"));
        });
    });

    var from = new unsafeWindow.west.gui.Textfield("statchecker_from").setSize(18).setWidth(80);
    var to = new unsafeWindow.west.gui.Textfield("statchecker_to").setSize(18).setWidth(80);


    unsafeWindow.$(button1.getMainDiv()).css("position", "absolute").css("top", "350px");
    unsafeWindow.$(button2.getMainDiv()).css("position", "absolute").css("left", "100px").css("top", "350px");
    unsafeWindow.$(from.getMainDiv()).css("position", "absolute").css("left", "210px").css("top", "350px");
    unsafeWindow.$(to.getMainDiv()).css("position", "absolute").css("left", "315px").css("top", "350px");
    StatsChecker.window.appendToContentPane(button1.getMainDiv());
    StatsChecker.window.appendToContentPane(button2.getMainDiv());
    StatsChecker.window.appendToContentPane(from.getMainDiv());
    StatsChecker.window.appendToContentPane(to.getMainDiv());
    StatsChecker.window.appendToContentPane(table.getMainDiv());

    $("#statchecker_from").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: "2013-08-11",
        onClose: function (selectedDate) {
            $("#statcheker_to").datepicker("option", "minDate", selectedDate);
        },
        beforeShow: function () {
            setTimeout(function () {
                $('.ui-datepicker').css('z-index', 99999999999999);
                $('.ui-datepicker').css('background-image', 'url("http://ru11.the-west.ru//images/tw2gui/textfield/textarea_bg.jpg")');

            }, 0);
        }});
    $("#statchecker_from").datepicker("setDate", unsafeWindow.get_server_date());
    $("#statchecker_to").datepicker({
        dateFormat: "yy-mm-dd",
        maxDate: unsafeWindow.get_server_date(),
        beforeShow: function () {
            setTimeout(function () {
                $('.ui-datepicker').css('z-index', 99999999999999);
                $('.ui-datepicker').css('background-image', 'url("http://ru11.the-west.ru//images/tw2gui/textfield/textarea_bg.jpg")');
            }, 0);
        },
        onClose: function (selectedDate) {
            $("#statchecker_from").datepicker("option", "maxDate", selectedDate);
        }});
    $("#statchecker_to").datepicker("setDate", unsafeWindow.get_server_date());

    StatsChecker.updatecss();


};

StatsChecker.init = function () {

    var div = unsafeWindow.$('<div class="ui_menucontainer">/');
    var link = unsafeWindow.$('<div class="menulink" style="background:url(data:image/png;base64,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);background-position: -4px -3px;"></div>');
    link.click(function () {
        StatsChecker.showWindow();
    });
    div.append(link);
    div.append('<div class="loptions"></div><div class="menucontainer_bottom"></div>');
    unsafeWindow.$("#ui_menubar").append(div);
};

StatsChecker.init();

