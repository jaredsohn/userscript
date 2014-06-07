{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Quack Toolsammlung\par
// @namespace      Quack\par
// @description    Toolsammlung f\'fcr Grepolis 2.0\par
// @include        http://*.grepolis.*/game*\par
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js\par
// @icon           http://s7.directupload.net/images/120320/ullq32vn.jpg\par
// @version        1.9.5\par
// ==/UserScript==\par
\par
// JQuery\par
(function () \{\par
//access to window object cross-browser\par
var uW;\par
if (typeof unsafeWindow === 'object')\{\par
uW = unsafeWindow;\par
\} else \{\par
uW = window;\par
\}\par
//get jQuery\par
var $ = uW.jQuery;\par
\}());\par
\par
\par
// Weltdaten einlesen\par
var nsfw = (typeof unsafeWindow !== 'undefined');\par
var A_ID = ((nsfw) ? unsafeWindow : window), $ = A_ID.jQuery;\par
var P_ID = ((nsfw) ? unsafeWindow : window), $ = P_ID.jQuery;\par
var T_ID = ((nsfw) ? unsafeWindow : window), $ = T_ID.jQuery;\par
var AllianzID = parseInt(A_ID.Game.alliance_id, 10);\par
var SpielerID = parseInt(P_ID.Game.player_id, 10);\par
var WeltID=/:\\/\\/([^./]+)/.exec(window.location.href)[1];\par
var SpracheID = WeltID.substr(0,2);\par
var StadtID = parseInt(T_ID.Game.townId, 10);\par
var currentpopulation = $('#pop_current').html();\par
\par
\par
// Grepo Marliktools by Marlik\par
(function () \{\par
if (typeof $ == "undefined") \{\par
    var $ = unsafeWindow.jQuery\par
\}\par
$(function () \{\par
    var a = $('<div id="mgt" />').appendTo("body");\par
    a.GameData = unsafeWindow.GameData;\par
    a.HidesOverview = unsafeWindow.HidesOverview;\par
    a.server = /([a-zA-Z0-9]*)\\./.exec(document.location.href)[1];\par
    a.GPWM = unsafeWindow.GPWindowMgr;\par
    a.GPL = unsafeWindow.Layout;\par
    a.Debug = false;\par
    a.DebugContent = new Array;\par
    a.DebugRefresh = function () \{\par
        if (!a.Debug) return;\par
        var b = a.GPWM.getOpenFirst(a.GPL.wnd.TYPE_CUSTOM);\par
        if (!b) \{\par
            a.GPL.wnd.Create(a.GPL.wnd.TYPE_CUSTOM);\par
            b = a.GPWM.getOpenFirst(a.GPL.wnd.TYPE_CUSTOM)\par
        \}\par
        if (a.DebugContent.length == 10) a.DebugContent.shift();\par
        var c = "";\par
        for (var d = 0; d < a.DebugContent.length; d++) c += a.DebugContent[d];\par
        b.setContent(c)\par
    \};\par
    a.DebugWrite = function (b) \{\par
        a.DebugContent.push((new Date).toString() + ":<br>" + b + "<br><br>");\par
        a.DebugRefresh()\par
    \};\par
    if (a.Debug) \{\par
        window.setTimeout(a.DebugRefresh, 3e3)\par
    \}\par
    a.ajaxSuccess(function (b, c, d) \{\par
        var e = d.url.split(/&/)[0];\par
        a.DebugWrite(e);\par
        var g;\par
        if (d.data != undefined) \{\par
            g = $.parseJSON(unescape(d.data).replace(/json=/, ""))\par
        \}\par
        switch (e) \{\par
        case "/game/report?action=view":\par
            \{\par
                a.reportView(b, c, d);\par
                document.getElementById('RepConvRes').style.visibility = "hidden";\par
                break\par
            \};\par
        case "/game/town_overviews?action=hides_overview":\par
            \{\par
                if (d.type == "GET") a.hidesOverview();\par
                break\par
            \};\par
        case "/game/town_overviews?action=command_overview":\par
            \{\par
                if (d.type == "GET") a.commandOverview(b, c, d);\par
                break\par
            \};\par
        case "/game/building_place?action=simulate":\par
            \{\par
                if (d.type == "POST") a.simulateView(b, c, d);\par
                break\par
            \};\par
        case "/game/building_hide?action=index":\par
            \{\par
                if (d.type == "GET") a.hidesIndex();\par
                break\par
            \};\par
        case "/game/town_info?action=info":\par
            \{\par
                a.townGSButton();\par
                break\par
            \};\par
        case "/game/player?action=get_profile_html":\par
            \{\par
                f = d.url.match(/player_id%22%3A(\\d*)%2C/);\par
                if (f != null) \{\par
                    a.playerGSButton(f[1])\par
                \}\par
                break\par
            \};\par
        case "/game/player?action=index":\par
            \{\par
                a.playerSettingsInit();\par
                break\par
            \};\par
        case "/game/alliance?action=profile":\par
            \{\par
                f = d.url.match(/alliance_id%22%3A(\\d*)%2C/);\par
                if (f != null) \{\par
                    a.allianceGSButton(f[1])\par
                \}\par
                break\par
            \};\par
        case "/game/town_overviews?action=culture_overview":\par
            \{\par
                if (d.type == "GET") a.cultureOverview()\par
            \}\par
        \}\par
    \});\par
    a.playerSettingsInit = function () \{\par
        var b = a.GPWM.getOpenFirst(a.GPL.wnd.TYPE_PLAYER_SETTINGS);\par
        if (!b) return;\par
        var c = $("DIV#gpwnd_" + b.getID() + " .settings-menu ul:last");\par
        $(c[0]).append('<li><a id="marlik-grepotools" class="settings-link" href="#">marlikstools</a></li>');\par
        $("a#marlik-grepotools").click(function () \{\par
            return false\par
        \})\par
    \};\par
    a.hidesOverview = function () \{\par
        var b = $("#hides_overview_towns");\par
        var c = b.find(".town_item");\par
        for (var d = 0; d < c.length; d++) \{\par
            var e = $(c[d]);\par
            var f = e.find(".iron");\par
            var g = Number(f.text().trim());\par
            var h = e.find("input");\par
            if (g > 15e3) \{\par
                h.val(g - 15e3).change();\par
                e.find(".iron_img").click();\par
                var i = a.HidesOverview.spinners[e.find(".iron_img").attr("name")];\par
                i.setValue(g - 15e3)\par
            \}\par
        \}\par
    \};\par
    a.hidesIndex = function () \{\par
        var a = parseInt($("#iron_count").text());\par
        if (a > 15e3) $("#hide_order_input").val(a - 15e3).change()\par
    \};\par
    a.simulateView = function (b, c, d) \{\par
        var e = c.responseText.match(/\{(.+)\}/);\par
        var f = $.parseJSON("\{" + e[1] + "\}");\par
        var g = \{\par
            wood: 0,\par
            stone: 0,\par
            iron: 0,\par
            favor: 0,\par
            pop: 0\par
        \};\par
        var h = \{\par
            wood: 0,\par
            stone: 0,\par
            iron: 0,\par
            favor: 0,\par
            pop: 0\par
        \};\par
        units = a.GameData.units;\par
        for (unit in units) \{\par
            if (unit != "militia") \{\par
                h.wood += units[unit].resources.wood * f.att_losses[unit];\par
                h.stone += units[unit].resources.stone * f.att_losses[unit];\par
                h.iron += units[unit].resources.iron * f.att_losses[unit];\par
                h.favor += units[unit].favor * f.att_losses[unit];\par
                h.pop += units[unit].population * f.att_losses[unit]\par
            \}\par
        \}\par
        for (unit in units) \{\par
            if (unit != "militia") \{\par
                g.wood += units[unit].resources.wood * f.def_losses[unit];\par
                g.stone += units[unit].resources.stone * f.def_losses[unit];\par
                g.iron += units[unit].resources.iron * f.def_losses[unit];\par
                g.favor += units[unit].favor * f.def_losses[unit];\par
                g.pop += units[unit].population * f.def_losses[unit]\par
            \}\par
        \}\par
        $("#simulator_body").css("position", "relative");\par
        $("#place_sim_lost_res").css("position", "absolute").css("right", "8px").css("bottom", "34px").css("text-align", "center").html('<h4>Verluste</h4><table width="235"><tr><th>Angreifer</th><th> </th><th>Verteidiger</th></tr><tr><td width="50%">' + h.wood + '</td><td><img class="unit_order_res wood" alt="' + a.GameData.resources.wood + '" src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/></td><td width="50%">' + g.wood + "</td></tr><tr><td>" + h.stone + '</td><td><img class="unit_order_res stone" alt="' + a.GameData.resources.stone + '" src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/></td><td>' + g.stone + "</td></tr><tr><td>" + h.iron + '</td><td><img class="unit_order_res iron" alt="' + a.GameData.resources.iron + '" src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/></td><td>' + g.iron + "</td></tr><tr><td>" + h.favor + '</td><td><img class="unit_order_res favor" alt="' + a.GameData.favor + '" src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/></td><td>' + g.favor + "</td></tr><tr><td>" + h.pop + '</td><td><img class="unit_order_res population" alt="' + a.GameData.poplation + '" src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/></td><td>' + g.pop + "</td></tr></table>")\par
    \};\par
    a.reportView = function (b, c, d) \{\par
        var e = c.responseText.match(/ReportViewer\\.initialize\\((.+)\\);/);\par
        if (e != null) \{\par
            e[1] = e[1].replace(/"3":/g, '"x":');\par
            e[1] = e[1].replace(/"2":/g, '"y":');\par
            e[1] = e[1].replace(/"1":/g, '"z":');\par
            var f = $.parseJSON(e[1]);\par
            var g = a.calculateTroopCosts(f.result.att_units);\par
            var h = a.calculateTroopCosts(f.result.def_units);\par
            $("#resources").append('<hr /><h4>Verluste:</h4><table><tr><td width="50%">' + g.wood + '</td><td><img class="unit_order_res wood" alt="' + a.GameData.resources.wood + '" src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/></td><td width="50%">' + h.wood + "</td></tr><tr><td>" + g.stone + '</td><td><img class="unit_order_res stone" alt="' + a.GameData.resources.stone + '" src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/></td><td>' + h.stone + "</td></tr><tr><td>" + g.iron + '</td><td><img class="unit_order_res iron" alt="' + a.GameData.resources.iron + '" src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/></td><td>' + h.iron + "</td></tr><tr><td>" + g.favor + '</td><td><img class="unit_order_res favor" alt="' + a.GameData.favor + '" src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/></td><td>' + h.favor + "</td></tr><tr><td>" + g.pop + '</td><td><img class="unit_order_res population" alt="' + a.GameData.poplation + '" src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/></td><td>' + h.pop + "</td></tr></table>")\par
        \} else if ($(c.responseText).find(".report_side_defender").length > 0) \{\par
            var h = \{\par
                wood: 0,\par
                stone: 0,\par
                iron: 0,\par
                favor: 0,\par
                pop: 0\par
            \};\par
            units = a.GameData.units;\par
            for (unit in units) \{\par
                if (unit != "militia") \{\par
                    if ($(c.responseText).find(".unit_" + unit).length != 0) \{\par
                        gdunit = $(c.responseText).find(".unit_" + unit).parent().find(".report_losts").text() * -1;\par
                        h.wood += units[unit].resources.wood * gdunit;\par
                        h.stone += units[unit].resources.stone * gdunit;\par
                        h.iron += units[unit].resources.iron * gdunit;\par
                        h.favor += units[unit].favor * gdunit;\par
                        h.pop += units[unit].population * gdunit\par
                    \}\par
                \}\par
            \}\par
            $("#report_booty_bonus_fight").prepend('<h4>Verluste:</h4><table><tr><td width="50%"> </td><td><img class="unit_order_res wood" alt="' + a.GameData.resources.wood + '" src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/></td><td width="50%">' + h.wood + '</td></tr><tr><td> </td><td><img class="unit_order_res stone" alt="' + a.GameData.resources.stone + '" src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/></td><td>' + h.stone + '</td></tr><tr><td> </td><td><img class="unit_order_res iron" alt="' + a.GameData.resources.iron + '" src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/></td><td>' + h.iron + '</td></tr><tr><td> </td><td><img class="unit_order_res favor" alt="' + a.GameData.favor + '" src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/></td><td>' + h.favor + '</td></tr><tr><td> </td><td><img class="unit_order_res population" alt="' + a.GameData.poplation + '" src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/></td><td>' + h.pop + "</td></tr></table>")\par
        \}\par
    \};\par
    a.calculateTroopCosts = function (b) \{\par
        var c = 0;\par
        var d = 0;\par
        var e = 0;\par
        var f = 0;\par
        var g = 0;\par
        var h = a.GameData;\par
        if (typeof b.x !== "undefined") \{\par
            if (b.x.lost != null && Object.keys(b.x.lost).length != 0) \{\par
                var i = b.x.lost;\par
                for (unit in i) \{\par
                    if (unit != "militia") \{\par
                        gdunit = h.units[unit];\par
                        c += gdunit.resources.wood * i[unit];\par
                        d += gdunit.resources.stone * i[unit];\par
                        e += gdunit.resources.iron * i[unit];\par
                        g += gdunit.favor * i[unit];\par
                        f += gdunit.population * i[unit]\par
                    \}\par
                \}\par
            \}\par
        \}\par
        if (typeof b.y !== "undefined") \{\par
            if (b.y.lost != null && Object.keys(b.y.lost).length != 0) \{\par
                var i = b.y.lost;\par
                for (unit in i) \{\par
                    if (unit != "militia") \{\par
                        gdunit = h.units[unit];\par
                        c += gdunit.resources.wood * i[unit];\par
                        d += gdunit.resources.stone * i[unit];\par
                        e += gdunit.resources.iron * i[unit];\par
                        g += gdunit.favor * i[unit];\par
                        f += gdunit.population * i[unit]\par
                    \}\par
                \}\par
            \}\par
        \}\par
        if (typeof b.z !== "undefined") \{\par
            if (b.z.lost != null && Object.keys(b.z.lost).length != 0) \{\par
                var i = b.z.lost;\par
                for (unit in i) \{\par
                    if (unit != "militia") \{\par
                        gdunit = h.units[unit];\par
                        c += gdunit.resources.wood * i[unit];\par
                        d += gdunit.resources.stone * i[unit];\par
                        e += gdunit.resources.iron * i[unit];\par
                        g += gdunit.favor * i[unit];\par
                        f += gdunit.population * i[unit]\par
                    \}\par
                \}\par
            \}\par
        \}\par
        return \{\par
            wood: c,\par
            stone: d,\par
            iron: e,\par
            favor: g,\par
            pop: f\par
        \}\par
    \};\par
    a.townGSButton = function () \{\par
        var b = a.GPWM.getOpen(a.GPL.wnd.TYPE_TOWN);\par
        if (b.length == 0) return;\par
        wnd = b[b.length - 1];\par
        var c = wnd.getID();\par
        var d = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_right SPAN.gt_gsbutton");\par
        if (d.length > 0) return;\par
        var e = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo A.gp_player_link").attr("href");\par
        var f = e.split(/#/);\par
        var g = $.parseJSON(atob(f[1] || f[0]));\par
        var h = window.location.host.replace(/.grepolis.com.*$/, "");\par
        var i = h.replace(/\\d+/, "");\par
        var j = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_right");\par
        $(j[1]).append('<span class="gt_gsbutton"><a target="_blank" href="http://' + i + ".grepostats.com/world/" + h + "/player/" + g.id + '"><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a></span>');\par
        $(j[1]).css("width", "100px");\par
        var k = $('a[onclick^="Layout.allianceProfile"]').attr("onclick").replace(")", "").split(",")[1];\par
        var l = $('a[onclick^="Layout.allianceProfile"]').parent().find(".list_item_right");\par
        l.prepend('<span class="gt_gsbutton"><a target="_blank" href="http://' + i + ".grepostats.com/world/" + h + "/alliance/" + k + '"><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a></span>');\par
        l.css("width", "60px")\par
    \};\par
    a.playerGSButton = function (b) \{\par
        var c = a.GPWM.getOpenFirst(a.GPL.wnd.TYPE_PLAYER_PROFILE);\par
        if (!c) return;\par
        var d = $("DIV#gpwnd_" + c.getID() + " DIV#player_buttons ");\par
        var e = a.server.replace(/\\d+/, "");\par
        $(d[0]).append("<a target=_blank href=http://" + e + ".grepostats.com/world/" + a.server + "/player/" + b + '><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a>')\par
    \};\par
    a.allianceGSButton = function (b) \{\par
        var c = a.GPWM.getOpenFirst(a.GPL.wnd.TYPE_ALLIANCE_PROFILE);\par
        if (!c) return;\par
        var d = $("DIV#gpwnd_" + c.getID() + " DIV#player_buttons ");\par
        var e = a.server.replace(/\\d+/, "");\par
        $(d[0]).append("<a target=_blank href=http://" + e + ".grepostats.com/world/" + a.server + "/alliance/" + b + '><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a>')\par
    \};\par
    a.cultureOverview = function () \{\par
        var a = $("ul#cultur_overview_towns");\par
        var b, c, d, e;\par
        e = 0;\par
        b = $('a[class~="confirm"][class~="type_theater"]');\par
        d = $('a[class~="confirm"][class~="type_theater"][class~="disabled"]');\par
        if (d.length > 0) \{\par
            for (var f = 0; f < b.length; f++) \{\par
                if ($(b[f]).attr("class").indexOf("disabled") > 1) continue;\par
                c = $(b[f]).parents('li[id^="ov_town_"]');\par
                eltext = c[0].previousSibling;\par
                $(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));\par
                $(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))\par
            \}\par
        \}\par
        e = 0;\par
        b = $('a[class~="confirm"][class~="type_party"]');\par
        d = $('a[class~="confirm"][class~="type_party"][class~="disabled"]');\par
        if (d.length > 0) \{\par
            for (var f = 0; f < b.length; f++) \{\par
                if ($(b[f]).attr("class").indexOf("disabled") > 1) continue;\par
                c = $(b[f]).parents('li[id^="ov_town_"]');\par
                eltext = c[0].previousSibling;\par
                $(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));\par
                $(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))\par
            \}\par
        \}\par
        var g = $("ul#culture_overview_towns span.eta");\par
        var h = $("div#place_culture_count").text();\par
        if (h.indexOf("[") < 1) \{\par
            var i = h.split("/");\par
            var j = parseInt(i[0]) + g.length;\par
            var k = parseInt(i[1]) - j;\par
            if (k > 0) \{\par
                $("DIV#place_culture_count").text(i[0] + "/" + i[1] + " [-" + k + "]")\par
            \} else \{\par
                var l = new Array;\par
                for (var f = 0; f < g.length; f++) l.push($(g[f]).text());\par
                l.sort();\par
                var m = l[l.length + k - 1];\par
                $("div#place_culture_count").html(i[0] + "/" + i[1] + " [<span></span>]").find("span").countdown(m).mousePopup(new unsafeWindow.MousePopup("Zeit bis zum Erreichen der n\'e4chsten Stufe"))\par
            \}\par
        \}\par
    \};\par
    a.commandOverview = function (a, b, c) \{\par
        var d = b.responseText.match(/\{(.+)\}/);\par
        var e = $.parseJSON("\{" + d[1] + "\}");\par
        if (e.data != undefined) \{\par
            if (e.data.commands.length > 0) $("div.game_header").html($("div.game_header").html().split(" (")[0] + " (" + e.data.commands.length + ")");\par
            var f = \{\par
                attack_land: 0,\par
                support: 0,\par
                attack_sea: 0,\par
                attack_spy: 0,\par
                farm_attack: 0,\par
                abort: 0,\par
                attack_takeover: 0\par
            \};\par
            for (var g = 0; g < e.data.commands.length; g++) f[e.data.commands[g].type]++;\par
            var h = $("div .support_filter");\par
            $(h[0]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_land));\par
            $(h[1]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.support));\par
            $(h[2]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_sea));\par
            $(h[3]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_spy));\par
            $(h[4]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.farm_attack));\par
            $(h[5]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.abort));\par
            $(h[6]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_takeover))\par
        \}\par
    \};\par
    a.gttr = \{\par
        config: \{\par
            okLogo: '<img style="width:10px;height:10px;float:left;padding: 2pt 5px 0 2px;" src="http://grepo.faark.de/grexGrepoTownReservation/resources/green.png">',\par
            warningLogo: '<img style="width:10px;height:10px;float:left;padding: 2pt 5px 0 2px;" src="http://grepo.faark.de/grexGrepoTownReservation/resources/red.png">',\par
            loadingLogo: '<img style="width:10px;height:10px;float:left;padding: 2pt 5px 0 2px;" src="http://faark.bplaced.net/projects/faarksGrepoPicSaver/resources/loading.gif">',\par
            errorLogo: '<img style="width:10px;height:10px;float:left;padding: 2pt 5px 0 2px;" src="http://grepo.faark.de/grexGrepoTownReservation/resources/red.png">'\par
        \},\par
        strings: \{\par
            content: \{\par
                de: \{\par
                    nologin: "Keine Login-Daten verf\'fcgbar",\par
                    multiplelogin: "F\'fcr diese Allianz sind mehrere<br/>Accounts eingetragen. Bitte l\'f6sche<br/>alle bis auf das Aktuelle.",\par
                    reservedby: '<span style="color:red;">Reserviert von<br/>[[PLAYERLIST]]</span>',\par
                    loading: "Lade Reservierungen...",\par
                    loading_tooltip: '<span style="font-size:80%; color:grey;">\'dcberpr\'fcfe Reservierung...</span>',\par
                    aviablewithlink: '<span style="display:inline-block">Nicht reserviert <a target="_blank" href="[[URL]]" style="font-size:60%">(f\'fcr mich reservieren)</a></span>',\par
                    reservedwithlink: '<span style="display:inline-block;max-width:300px;">Reserviert von [[URLPLAYERLIST]]</span>',\par
                    mouseover_loading: "Reservierung wird vom Server<br/>geladen, bitte warten...",\par
                    mouseover_reserved: "Dieses Dorf wurde von [[PLAYER]] reserviert.<br/>Weitere Infos erh\'e4lst du von ihm...",\par
                    mouseover_reserve: "Dieses Dorf wird noch von keinem<br/>anderen Spieler beansprucht.<br/><br/>Du d\'fcrftest es dir selber<br/>reservieren oder Gefahrlos farmen k\'f6nnen",\par
                    mouseover_error: "Beim ermitteln der Reservierungen ist ein Fehler aufgetreten!<br/>Eventuell musst du das GM-Script neu installieren.<br/>Sollte das auch nix bringt, kannst du dich an Grex oder Faark wenden.",\par
                    mouseover_extending: "<br/><span style='float:right;color: gray;font-size: 60%;'>by Grex & Faark</span>",\par
                    error: '<span style="color:red"><span style="text-decoration:underline;">Fehler beim \'dcberpr\'fcfen der Reservierung:</span><br/>[[ERRORTEXT]]</span>'\par
                \},\par
                en: \{\par
                    nologin: "No login-information available",\par
                    multiplelogin: "You have multiple login-infos<br/>for this alliance. please delete<br/>all except for the current.",\par
                    reservedby: '<span style="color:red;">Reserved by <br/>[[PLAYERLIST]]</span>',\par
                    loading: "Loading reservations...",\par
                    loading_tooltip: '<span style="font-size:80%; color:grey;">Checking reservation...</span>',\par
                    aviablewithlink: '<span style="display:inline-block">Not reserved <a target="_blank" href="[[URL]]" style="font-size:60%">(reserve it for me)</a></span>',\par
                    reservedwithlink: '<span style="display:inline-block;max-width:300px;">Reserved by [[URLPLAYERLIST]]</span>',\par
                    mouseover_loading: "Loading reservation-data from<br/>server, please wait...",\par
                    mouseover_reserved: "This village is reserved by [[PLAYER]].<br/>Ask him for more information...",\par
                    mouseover_reserve: "This village isn't claimed by<br/>any allied player.<br/><br/>You can reserve it for your self<br/>or ask for resources, if you want",\par
                    mouseover_error: "There was an error while getting reservation-informations!<br/>re-install that GM-Script can solve that problem.<br/>you can ask Grex oder Faark for help, if not.(german forum)",\par
                    mouseover_extending: "<br/><span style='float:right;color: gray;font-size: 60%;'>by Grex & Faark</span>",\par
                    error: '<span style="color:red"><span style="text-decoration:underline;">Error checking reservations state:</span><br/>[[ERRORTEXT]]</span>'\par
                \}\par
            \},\par
            lang: "en",\par
            defaultReplacements: [\{\par
                find: /\\[\\[now\\]\\]/gi,\par
                replace: function () \{\par
                    return (new Date).toLocaleString()\par
                \}\par
            \}],\par
            get: function (a, b) \{\par
                try \{\par
                    var c = this.defaultReplacements;\par
                    var d = this.content[this.lang][a];\par
                    if (b) \{\par
                        var e = [];\par
                        if (b.length) e = b;\par
                        else for (var f in b) e.push(\{\par
                            find: new RegExp("\\\\[\\\\[" + f + "\\\\]\\\\]", "gi"),\par
                            replace: b[f]\par
                        \})\par
                    \}\par
                    for (var f = 0; f < c.length; f++) d = d.replace(c[f].find, c[f].replace)\par
                \} catch (g) \{\par
                    DebugWrite("Could not load String [" + a + "]")\par
                \}\par
            \},\par
            init: function () \{\par
                var b = /([a-zA-Z]*)/.exec(a.server)[1];\par
                if (this.content[b]) this.lang = b\par
            \}\par
        \},\par
        account: \{\par
            init: function () \{\}\par
        \},\par
        init: function () \{\par
            this.strings.init();\par
            this.account.init()\par
        \}\par
    \};\par
    a.gttr.init()\par
\});\par
\}());\par
\par
\par
// GTIO \'dcberladen/L\'f6schen in attack/support window\par
(function () \{\par
var scriptEl = document.createElement("script");\par
scriptEl.setAttribute('type', 'text/javascript');\par
scriptEl.appendChild(document.createTextNode("\tab var gt_db_debugger=false;\tab var gt_db_content=new Array();\tab var gt_db_MaxContentLength=14;\tab function gt_db_FormatTime(t)\tab\{\tab\tab var h=t.getHours();\tab\tab if (h<10) h='0'+h;\tab\tab var m=t.getMinutes();\tab\tab if (m<10) m='0'+m;\tab\tab var s=t.getSeconds();\tab\tab if (s<10) s='0'+s;\tab\tab return h+':'+m+':'+s;\tab\};\tab function gt_db_RefreshContent()\tab\{\tab\tab if (!gt_db_debugger) return;\tab\tab var gt_wnd;\tab\tab gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);\tab\tab if (!gt_wnd)\tab\tab\{\tab\tab\tab Layout.wnd.Create(Layout.wnd.TYPE_CUSTOM, 'G.Tio Tools Console');\tab\tab\tab gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);\tab\tab\}\tab\tab if (gt_db_content.length==gt_db_MaxContentLength)\tab\tab\{\tab\tab\tab gt_db_content.shift();\tab\tab\}\tab\tab var gt_temp_content='';\tab\tab for (var i=0; i<gt_db_content.length; i++)\tab\tab\{\tab\tab\tab gt_temp_content=gt_temp_content+gt_db_content[i];\tab\tab\}\tab\tab gt_wnd.setContent(gt_temp_content);\tab\}\tab function gt_db_Debug(message)\tab\{\tab\tab var now=new Date();\tab\tab gt_db_content.push(gt_db_FormatTime(now)+' '+message+'<br>');\tab\tab gt_db_RefreshContent();\tab\};\tab (function()\{\tab\tab gt_db_content.push('Tools startet...<br>');\tab\tab window.setTimeout(gt_db_RefreshContent, 3000);\tab\})();\tab "));\par
document.body.appendChild(scriptEl);\par
\par
var scriptEl = document.createElement("script");\par
scriptEl.setAttribute('type', 'text/javascript');\par
scriptEl.appendChild(document.createTextNode("\tab function gt_st_ajaxComplete(e, xhr, settings)\tab\{\tab\tab var url=settings.url.split(/&/)[0];\tab\tab if (url=='/game/town_info?action=info' && settings.type=='GET')\tab\tab\{\tab\tab\tab var data=unescape(settings.data);\tab\tab\tab data=data.replace(/json=/,'');\tab\tab\tab var dataj=$.parseJSON(data);\tab\tab\tab gt_db_Debug('towninfo requested for '+dataj.id);\tab\tab\tab gt_ati_process(dataj.id);\tab\tab\tab gt_agsb_townwndprocess();\tab\tab\tab return;\tab\tab\}\tab\tab if (url=='/game/player?action=get_profile_html' && settings.type=='GET')\tab\tab\{\tab\tab\tab var data=unescape(settings.data);\tab\tab\tab data=data.replace(/json=/,'');\tab\tab\tab var dataj=$.parseJSON(data);\tab\tab\tab gt_agsb_playerwndprocess(dataj.player_id);\tab\tab\tab return;\tab\tab\}\tab\tab if (url=='/game/town_info?action=attack' || url=='/game/town_info?action=support')\tab\tab\{\tab\tab\tab gt_bl_initWnd();\tab\tab\}\tab\tab\tab\};\tab $('body').ajaxComplete(gt_st_ajaxComplete);"));\par
document.body.appendChild(scriptEl);\par
\par
var scriptEl = document.createElement("script");\par
scriptEl.setAttribute('type', 'text/javascript');\par
scriptEl.appendChild(document.createTextNode("\tab var gt_bl_unitPopulation=\{sword:1,slinger:1,archer:1,hoplite:1,rider:3,chariot:4,catapult:15,minotaur:30,zyklop:40,medusa:18,cerberus:30,fury:55,centaur:12\};\tab var gt_bl_groundUnits=new Array('sword','slinger','archer','hoplite','rider','chariot','catapult','minotaur','zyklop','medusa','cerberus','fury','centaur');\tab function gt_bl_process(wndid)\tab\{\tab\tab var wnd=GPWindowMgr.GetByID(wndid);\tab\tab if (!wnd)\tab\tab\tab return;\tab\tab var handler=wnd.getHandler();\tab\tab if (!handler)\tab\tab\tab return;\tab\tab var units=new Array();\tab\tab var item;\tab\tab for (var i=0; i<gt_bl_groundUnits.length; i++)\tab\tab\{\tab\tab\tab if (handler.data.units[gt_bl_groundUnits[i]])\tab\tab\tab\{\tab\tab\tab\tab item=\{name:gt_bl_groundUnits[i], count:handler.data.units[gt_bl_groundUnits[i]].count, population:handler.data.units[gt_bl_groundUnits[i]].population\};\tab\tab\tab\tab units.push(item);\tab\tab\tab\}\tab\tab\}\tab\tab if (handler.data.researches && handler.data.researches.berth)\tab\tab\tab var berth=handler.data.researches.berth;\tab\tab else\tab\tab\tab var berth=0;\tab\tab var totalCap=handler.data.units.big_transporter.count*(handler.data.units.big_transporter.capacity+berth)+handler.data.units.small_transporter.count*(handler.data.units.small_transporter.capacity+berth);\tab\tab\tab\tab\tab\tab units.sort(function(a,b)\{\tab\tab\tab return b.population-a.population;\tab\tab\});\tab\tab for (i=0; i<units.length; i++)\tab\tab\tab gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);\tab\tab for (i=0; i<units.length; i++)\tab\tab\tab if (units[i].count==0)\tab\tab\tab\{\tab\tab\tab\tab units.splice(i,1);\tab\tab\tab\tab i=i-1;\tab\tab\tab\};\tab\tab gt_db_Debug('---');\tab\tab for (i=0; i<units.length; i++)\tab\tab\tab gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);\tab\tab\tab\tab\tab\tab\tab\tab var restCap=totalCap;\tab\tab var sendUnits=new Array();\tab\tab for (i=0; i<units.length; i++)\tab\tab\{\tab\tab\tab item=\{name:units[i].name, count:0\};\tab\tab\tab sendUnits[units[i].name]=item;\tab\tab\};\tab\tab for (j=0; j<gt_bl_groundUnits.length; j++)\tab\tab\{\tab\tab\tab if (sendUnits[gt_bl_groundUnits[j]])\tab\tab\tab\tab gt_db_Debug(sendUnits[gt_bl_groundUnits[j]].name+' '+sendUnits[gt_bl_groundUnits[j]].count);\tab\tab\}\tab\tab\tab\tab\tab\tab var hasSent;\tab\tab k=0;\tab\tab while (units.length>0)\tab\tab\{\tab\tab\tab hasSent=false;\tab\tab\tab k=k+1;\tab\tab\tab for (i=0; i<units.length; i++)\tab\tab\tab\{\tab\tab\tab\tab if (units[i].population<=restCap)\tab\tab\tab\tab\{\tab\tab\tab\tab\tab hasSent=true;\tab\tab\tab\tab\tab units[i].count=units[i].count-1;\tab\tab\tab\tab\tab sendUnits[units[i].name].count=sendUnits[units[i].name].count+1;\tab\tab\tab\tab\tab restCap=restCap-units[i].population;\tab\tab\tab\tab\}\tab\tab\tab\}\tab\tab\tab for (i=0; i<units.length; i++)\tab\tab\tab\tab if (units[i].count==0)\tab\tab\tab\tab\{\tab\tab\tab\tab\tab units.splice(i,1);\tab\tab\tab\tab\tab i=i-1;\tab\tab\tab\tab\};\tab\tab\tab if (!hasSent)\tab\tab\tab\{\tab\tab\tab\tab gt_db_Debug('Abbruch nach '+k+' loops');\tab\tab\tab\tab break;\tab\tab\tab\}\tab\tab\}\tab\tab gt_db_Debug('nach '+k+'---- rest='+restCap);\tab\tab for (i=0; i<gt_bl_groundUnits.length; i++)\tab\tab\{\tab\tab\tab if (sendUnits[gt_bl_groundUnits[i]])\tab\tab\tab\tab gt_db_Debug(sendUnits[gt_bl_groundUnits[i]].name+' '+sendUnits[gt_bl_groundUnits[i]].count);\tab\tab\}\tab\tab handler.getUnitInputs().each(function ()\tab\tab\{\tab\tab\tab if (!sendUnits[this.name])\tab\tab\tab\{\tab\tab\tab\tab if (handler.data.units[this.name].count>0)\tab\tab\tab\tab\tab this.value=handler.data.units[this.name].count;\tab\tab\tab\tab else\tab\tab\tab\tab\tab this.value='';\tab\tab\tab\}\tab\tab\});\tab\tab for (i=0; i<gt_bl_groundUnits.length; i++)\tab\tab\{\tab\tab\tab if (sendUnits[gt_bl_groundUnits[i]])\tab\tab\tab\{\tab\tab\tab\tab if (sendUnits[gt_bl_groundUnits[i]].count>0)\tab\tab\tab\tab\tab $('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val(sendUnits[gt_bl_groundUnits[i]].count);\tab\tab\tab\tab else\tab\tab\tab\tab\tab $('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val('');\tab\tab\tab\}\tab\tab\}\tab\tab $('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');\tab\}\tab function gt_bl_delete(wndid)\tab\{\tab\tab var wnd=GPWindowMgr.GetByID(wndid);\tab\tab if (!wnd)\tab\tab\tab return;\tab\tab var handler=wnd.getHandler();\tab\tab if (!handler)\tab\tab\tab return;\tab\tab handler.getUnitInputs().each(function ()\tab\tab\{\tab\tab\tab this.value='';\tab\tab\});\tab\tab $('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');\tab\}\tab function gt_bl_initWnd()\tab\{\tab\tab var wnds=GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);\tab\tab if (wnds.length==0)\tab\tab\{\tab\tab\tab return;\tab\tab\}\tab\tab var testel=$('DIV#gpwnd_'+wndid+' A.gt_balanced');\tab\tab if (testel.length>0) return;\tab\tab var wnd=wnds[wnds.length-1];\tab\tab var wndid=wnd.getID();\tab\tab var ael=$('DIV#gpwnd_'+wndid+' A.select_all_units');\tab\tab $(ael).after('&nbsp;|&nbsp;<a class=gt_balanced style=\\\\\\'position:relative; top:3px\\\\\\' href=javascript:gt_bl_process('+wndid+')>Kein \\u00dcberladen</a>\tab\tab &nbsp;|&nbsp;<a style=\\\\\\'position:relative; top:3px\\\\\\' href=javascript:gt_bl_delete('+wndid+')>L\\u00f6schen</a>');\tab\}"));\par
document.body.appendChild(scriptEl);\par
\}());\par
\par
\par
// Buttonleiste\par
(function () \{\par
// Buttonleisten darstellen\par
$('<div id="Buttonleiste" style="padding-top:2px;z-index:100;position:absolute;width:169px;height:91px;top:593px;left:-2px;"></div>').appendTo('body');\par
$("#Buttonleiste").css("background-image","url(http://s7.directupload.net/images/120326/9blwjtom.png)");\par
$('<div id="Troops_Info_leiste" style="margin-left:80px;z-index:99;position:absolute;width:82px;height:40px;top:630px;"></div>').appendTo('body');\par
$("#Troops_Info_leiste").css("background-image","url(http://s14.directupload.net/images/120407/7xmz4xu6.png)");\par
\par
\par
// Buttons f\'fcr alle Sprachen darstellen\par
$('<a id="BTN_GS_Ally" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:3px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/alliance/'+AllianzID+'" target="_blank"><img src="http://s7.directupload.net/images/120326/6na88lya.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Grepomaps" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:69px;" href="http://'+WeltID+'.grepolismaps.org/" target="_blank"><img src="http://s14.directupload.net/images/120326/tltq4m5b.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Max_Forum" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:135px;" href="http://'+WeltID+'.grepolis.com/forum" target="_blank"><img src="http://s14.directupload.net/images/120326/z7cuj6bi.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_GS_Player" style="z-index:101;position:absolute;width:24px;height:20px;top:640px;left:3px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/player/'+SpielerID+'" target="_blank"><img src="http://s1.directupload.net/images/120326/hm7fewtb.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Troops_Info" style="z-index:101;position:absolute;width:24px;height:20px;top:640px;left:135px;" href="#"><img src="http://s1.directupload.net/images/120326/2uqhptno.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_HK" style="z-index:5;position:absolute;top:0px;left:466px;" href="#"><img src="http://s1.directupload.net/images/120629/6a9xx5bw.png" style="border-width: 0px" /></a>').appendTo('body');\par
\par
\par
// Sprache \'e4ndern\par
var uw=unsafeWindow;\par
switch(SpracheID)\{\par
\tab\tab case 'de':\par
var mo_GS_Ally = "Link zur Grepostats Allianz\'fcbersicht";\par
var mo_Grepomaps = "Link zur Karte dieser Welt";\par
var mo_Townsearch = "Link zur Stadtsuche";\par
var mo_Max_Forum = "Maximiert das Allianzforum im neuen Tab";\par
var mo_GS_Player = "Link zur Grepostats Spieler\'fcbersicht";\par
var mo_Troops_Info = "Anzahl der Truppen einer Stadt in BB-Code umwandeln";\par
var mo_Fullscreen = "Vollbild Modus";\par
var mo_Grepobash = "Link zur Grepobash Allianz\'fcbersicht";\par
var mo_intown = "Truppen in dieser Stadt (inklusive unterst\'fctzende Truppen)";\par
var mo_fromtown = "Truppen aus dieser Stadt (nur eigene Truppen)";\par
var mo_HK = "<b>Hotkeys:</b> <p> <u>Stadtauswahl:</u> <br> Pfeiltaste links - Letzte Stadt <br> Pfeiltaste rechts - N\'e4chste St\'e4dte <p> <u>Verwalter:</u> <br> 1 - Handels\'fcbersicht <br> 2 - Befehls\'fcbersicht <br> 3 - Rekrutierungs\'fcbersicht <br> 4 - Truppen\'fcbersicht <br> 5 - Truppen au\'dferhalb <br> 6 - Geb\'e4ude\'fcbersicht <br> 7 - Kultur\'fcbersicht <br> 8 - G\'f6tter\'fcbersicht <br> 9 - H\'f6hlen\'fcbersicht <br> 0 - Stadtgruppen\'fcbersicht <br> - - St\'e4dteliste <p> <u>Men\'fc:</u> <br> S - Stadt\'fcbersicht <br> N - Nachrichten <br> B - Berichte <br> A - Allianz <br> F - Allianz-Forum <br> E - Einstellungen <br> P - Profil <br> R - Rangliste <p> <u>Sonstiges:</u> <br> H - Grepo Wiki Direktsuche <br> W - WWRanks Button verstecken/anzeigen (WWRanks muss installiert sein) <br> X - \'dcbersicht \'fcber alle (erlaubten) Statistiken und Skripte f\'fcr Grepolis";\par
$('<a id="BTN_Troops_intown" style="z-index:99;position:absolute;width:24px;height:20px;top:632px;left:99px;" href="#" onclick="bbunit(1)"><img src="http://s7.directupload.net/images/120407/sclwp7es.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Troops_fromtown" style="z-index:99;position:absolute;width:24px;height:20px;top:650px;left:99px;" href="#" onclick="bbunit(0)"><img src="http://s7.directupload.net/images/120407/ugahl3s4.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Townsearch" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:102px;" href="http://grepo.faark.de/tondasPolisSuche/townSearch.php/'+WeltID+'" target="_blank"><img src="http://s14.directupload.net/images/120326/6kb4efti.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Fullscreen" style="z-index:101;position:absolute;width:24px;height:20px;top:639px;left:36px;" href="#"><img src="http://s7.directupload.net/images/120326/yyciaz38.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Grepobash" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:36px;" href="http://grepobash.de/show.php?server='+WeltID+'&ally='+AllianzID+'&order=all" target="_blank"><img src="http://s7.directupload.net/images/120326/jbmt9zcx.png" style="border-width: 0px" /></a>').appendTo('body');break;\tab\par
\tab case 'fr':\par
var mo_GS_Ally = "R\'e9sum\'e9 Grepostats Alliance";\par
var mo_Grepomaps = "Grepomaps";\par
var mo_Townsearch = "Recherche de ville";\par
var mo_Max_Forum = "Reduire le forum d'alliance dans une nouvelle fen\'eatre";\par
var mo_GS_Player = "R\'e9sum\'e9 grepostats joueur";\par
var mo_Troops_Info = "Convertir les unit\'e9 de la ville en BBCode";\par
var mo_Fullscreen = "Plein ecran";\par
var mo_Grepobash = "R\'e9sum\'e9 Grepostats alliance bashpoints";\par
var mo_intown = "Troupes de la ville (avec les supports)";\par
var mo_fromtown = "Troupes de la ville (Seulement vos propres troupes)";\par
var mo_HK = "<b>Raccourci:</b> <p> <u>S\'e9lection ville:</u> <br> Fl\'e8che gauche \endash  Ville pr\'e9c\'e9dente<br>Fl\'e8che droite \endash  Ville suivante<p> <u>Administrateur:</u> <br>1 \endash  Commerces<br>2 \endash  Ordres<br>3 \endash  Recrutements<br>4 \endash  Aper\'e7u des Troupes<br>5 \endash  Troupes en dehors<br>6 \endash  Aper\'e7u batiments<br>7 \endash  Cultures<br>8 \endash  Divinit\'e9s<br>9 \endash  Grottes<br>0 \endash  Groupes de villes<br>\endash  \endash  Listes des villes<p> <u>Menu:</u> <br>S - Aper\'e7u de la ville<br> N - Messages <br> B - Rapports <br> A - Alliance <br> F - Forum d'alliance <br> E - R\'e9glages <br> P - Profil <br> R - Rang<p> <u>Autre:</u> <br>H \endash  Recherche Grepo Wiki <br>W - Cacher ou afficher le WWRanks button  <br>X - Sommaire des statistiques et des scripts pour Grepolis <p> <font size = 1>Traduction by Loulebe</font>";\par
$('<a id="BTN_Troops_intown" style="z-index:99;position:absolute;width:24px;height:20px;top:632px;left:99px;" href="#" onclick="bbunit(1)"><img src="http://s14.directupload.net/images/120407/7f4totua.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Troops_fromtown" style="z-index:99;position:absolute;width:24px;height:20px;top:650px;left:99px;" href="#" onclick="bbunit(0)"><img src="http://s1.directupload.net/images/120407/h3qbc6an.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Townsearch" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:102px;" href="http://www.drolez.com/grepofinder/'+WeltID+'" target="_blank"><img src="http://s14.directupload.net/images/120326/6kb4efti.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Grepobash" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:36px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/alliance/'+AllianzID+'/members?compare=kill" target="_blank"><img src="http://s1.directupload.net/images/120327/4p2zqrs2.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Fullscreen" style="z-index:101;position:absolute;width:24px;height:20px;top:639px;left:36px;" href="#"><img src="http://s14.directupload.net/images/120327/5ucfm7cl.png" style="border-width: 0px" /></a>').appendTo('body');break;\par
\tab\tab case 'nl':\par
var mo_GS_Ally = "Link naar het Grepostats alliantieoverzicht";\par
var mo_Grepomaps = "Link naar de kaart van deze wereld";\par
var mo_Townsearch = "Link naar de stedenzoeker";\par
var mo_Max_Forum = "Maximaliseert het alliantieforum in een nieuw tab";\par
var mo_GS_Player = "Link naar het Grepostats spelersoverzicht";\par
var mo_Troops_Info = "Converteert de eenheidsinfo van de huidige stad naar BB-Code";\par
var mo_Fullscreen = "Volledig scherm mode";\par
var mo_Grepobash = "Link naar de Grepostats alliantie gevechtspunten overzicht";\par
var mo_intown = "Troepen in deze stad (inclusief ondersteunende troepen)";\par
var mo_fromtown = "Troepen uit deze stad (alleen maar eigen troepen)"; \par
var mo_HK = "<b>Hotkeys:</b> <p> <u>Stedenkeuze:</u> <br> Cursortoets links - Vorige stad <br> Cursortoets rechts - Volgende stad <p> <u>Bestuurder:</u> <br> 1 - Handelsoverzicht <br> 2 - Beveloverzicht <br> 3 - Rekruteringsoverzicht <br> 4 - Troepenoverzicht <br> 5 - Troepen buiten <br> 6 - Gebouwenoverzicht <br> 7 - Cultuuroverzicht <br> 8 - Godenoverzicht <br> 9 - Grottenoverzicht <br> 0 - Stadsgroepenoverzicht <br> - - Stedenlijst <p> <u>Menu:</u> <br> S - Stadsoverzicht <br> N - Berichten <br> B - Rapporten <br> A - Alliantie <br> F - Alliantieforum <br> E - Instellingen <br> P - Profiel <br> R - Ranglijst <p> <u>Overige:</u> <br> H - Grepo Wiki Search <br> W - WWRanks button weergeven of verbergen (WWRanks moet geinstalleerd zijn <br> X- Overzicht van alle (toegestane) statistiek-tools en scripts voor Grepolis)";\par
$('<a id="BTN_Troops_intown" style="z-index:99;position:absolute;width:24px;height:20px;top:632px;left:99px;" href="#" onclick="bbunit(1)"><img src="http://s14.directupload.net/images/120407/7f4totua.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Troops_fromtown" style="z-index:99;position:absolute;width:24px;height:20px;top:650px;left:99px;" href="#" onclick="bbunit(0)"><img src="http://s1.directupload.net/images/120407/h3qbc6an.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Townsearch" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:102px;" href="http://www.drolez.com/grepofinder/'+WeltID+'" target="_blank"><img src="http://s14.directupload.net/images/120326/6kb4efti.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Grepobash" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:36px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/alliance/'+AllianzID+'/members?compare=kill" target="_blank"><img src="http://s1.directupload.net/images/120327/4p2zqrs2.png" style="border-width: 0px" /></a>').appendTo('body');\tab     \tab\tab\par
$('<a id="BTN_Fullscreen" style="z-index:101;position:absolute;width:24px;height:20px;top:639px;left:36px;" href="#"><img src="http://s1.directupload.net/images/120327/uz6f89kr.png" style="border-width: 0px" /></a>').appendTo('body');break;\par
\tab\tab default: // default = en\par
var mo_GS_Ally = "Link to the Grepostats alliance summary";\par
var mo_Grepomaps = "Link to the map of this world";\par
var mo_Townsearch = "Link to the townsearch";\par
var mo_Max_Forum = "Maximizes the alliance forum in a new tab";\par
var mo_GS_Player = "Link to the Grepostats player summary";\par
var mo_Troops_Info = "Converts current town's unit info to BBCode";\par
var mo_Fullscreen = "Fullscreen mode";\par
var mo_Grepobash = "Link to the Grepostats alliance bashpoints summary";\par
var mo_intown = "Troops in this city (includes supports)";\par
var mo_fromtown = "Troops from this city (only your own troops)";\par
var mo_HK = "<b>Hotkeys:</b> <p> <u>City selection:</u> <br> Cursor left - Last city <br> Cursor right - Next city <p> <u>Administrator:</u> <br> 1 - Trade overview <br> 2 - Command overview <br> 3 - Recruitment overview <br> 4 - Troop overview <br> 5 - Troops outside <br> 6 - Building overview <br> 7 - Culture overview <br> 8 - Gods overview <br> 9 - Cave overview <br> 0 - City groups overview <br> - - City list <p> <u>Menu:</u> <br> S - City overview <br> N - Messages <br> B - Reports <br> A - Alliance <br> F - Alliance forum <br> E - Settings <br> P - Profile <br> R - Ranking <p> <u>Other:</u> <br> H - Grepo Wiki Search <br> W - Show/Hide WWRanks button (WWRanks must be installed) <br> X - Overview of all (allowed) statistic-tools and scripts for Grepolis ";\par
$('<a id="BTN_Troops_intown" style="z-index:99;position:absolute;width:24px;height:20px;top:632px;left:99px;" href="#" onclick="bbunit(1)"><img src="http://s14.directupload.net/images/120407/7f4totua.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Troops_fromtown" style="z-index:99;position:absolute;width:24px;height:20px;top:650px;left:99px;" href="#" onclick="bbunit(0)"><img src="http://s1.directupload.net/images/120407/h3qbc6an.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Townsearch" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:102px;" href="http://www.drolez.com/grepofinder/'+WeltID+'" target="_blank"><img src="http://s14.directupload.net/images/120326/6kb4efti.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Grepobash" style="z-index:101;position:absolute;width:24px;height:20px;top:606px;left:36px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/alliance/'+AllianzID+'/members?compare=kill" target="_blank"><img src="http://s1.directupload.net/images/120327/4p2zqrs2.png" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Fullscreen" style="z-index:101;position:absolute;width:24px;height:20px;top:639px;left:36px;" href="#"><img src="http://s1.directupload.net/images/120327/uz6f89kr.png" style="border-width: 0px" /></a>').appendTo('body');break;\tab\par
\};\par
\par
\par
// Mouseover\par
uw.$('#BTN_Troops_fromtown').mousePopup(new uw.MousePopup(mo_fromtown));\par
uw.$('#BTN_Troops_intown').mousePopup(new uw.MousePopup(mo_intown));\par
uw.$('#BTN_GS_Ally').mousePopup(new uw.MousePopup(mo_GS_Ally));\tab\par
uw.$('#BTN_Grepomaps').mousePopup(new uw.MousePopup(mo_Grepomaps));\tab\par
uw.$('#BTN_Townsearch').mousePopup(new uw.MousePopup(mo_Townsearch));\tab\par
uw.$('#BTN_Max_Forum').mousePopup(new uw.MousePopup(mo_Max_Forum));\tab\par
uw.$('#BTN_GS_Player').mousePopup(new uw.MousePopup(mo_GS_Player));\tab\par
uw.$('#BTN_Troops_Info').mousePopup(new uw.MousePopup(mo_Troops_Info));\tab\par
uw.$('#BTN_Fullscreen').mousePopup(new uw.MousePopup(mo_Fullscreen));\tab\par
uw.$('#BTN_Grepobash').mousePopup(new uw.MousePopup(mo_Grepobash));\par
uw.$('#BTN_HK').mousePopup(new uw.MousePopup(mo_HK));\par
\par
\par
// Troop Info Menu\par
var troop_info_pos = 0;\par
$('#BTN_Troops_Info').click(function ()  \{\par
if(troop_info_pos == 0) \{\par
$('#Troops_Info_leiste').animate(\{\par
    left: '+=81'\par
  \});\par
$('#BTN_Troops_intown').animate(\{\par
    left: '+=81'\par
  \});  \par
$('#BTN_Troops_fromtown').animate(\{\par
    left: '+=81'\par
  \}); \par
troop_info_pos = troop_info_pos +1;\par
\}\par
else \{\par
$('#Troops_Info_leiste').animate(\{\par
    left: '-=81'\par
  \});\par
$('#BTN_Troops_intown').animate(\{\par
    left: '-=81'\par
  \});  \par
$('#BTN_Troops_fromtown').animate(\{\par
    left: '-=81'\par
  \}); \par
troop_info_pos = troop_info_pos -1;\par
\}\par
\});\par
$('#BTN_Troops_intown').click(function ()  \{\par
$('#Troops_Info_leiste').animate(\{\par
    left: '-=81'\par
  \});\par
$('#BTN_Troops_intown').animate(\{\par
    left: '-=81'\par
  \});  \par
$('#BTN_Troops_fromtown').animate(\{\par
    left: '-=81'\par
  \});  \par
  troop_info_pos = troop_info_pos -1;\par
\});\par
$('#BTN_Troops_fromtown').click(function ()  \{\par
$('#Troops_Info_leiste').animate(\{\par
    left: '-=81'\par
  \});\par
$('#BTN_Troops_intown').animate(\{\par
    left: '-=81'\par
  \});  \par
$('#BTN_Troops_fromtown').animate(\{\par
    left: '-=81'\par
  \});  \par
  troop_info_pos = troop_info_pos -1;\par
\});\par
\tab\}());\par
\par
\tab\par
// Plus Menu (nicht fertig und verbuggt)\par
(function MenuPlus () \{\par
var troops = false;\par
var movement = false;\par
var trade = false;\par
\par
if (unsafeWindow.jQuery === undefined) \{\par
\} else \{\par
    $ = unsafeWindow.jQuery;\par
    init();\par
\}\par
\par
var troop_ICON_switch = 0;\par
var movement_ICON_switch = 0;\par
var trade_ICON_switch = 0;\par
$('<a id="BTN_Troops_Plus" style="z-index:101;position:absolute;width:17px;height:7px;top:19px;left:390px;" href="#"><img src="http://s14.directupload.net/images/120410/r6844coh.png" id="BTN_Troops_Plus_Icon" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Movement_Plus" style="z-index:101;position:absolute;width:17px;height:7px;top:19px;left:418px;" href="#"><img src="http://s14.directupload.net/images/120410/r6844coh.png" id="BTN_Movement_Plus_Icon" style="border-width: 0px" /></a>').appendTo('body');\par
$('<a id="BTN_Trade_Plus" style="z-index:101;position:absolute;width:17px;height:7px;top:19px;left:446px;" href="#"><img src="http://s14.directupload.net/images/120410/r6844coh.png" id="BTN_Trade_Plus_Icon" style="border-width: 0px" /></a>').appendTo('body');\par
\par
function init() \{\par
    var f = unsafeWindow.MenuBubbleOrders.renderHtml;\par
    unsafeWindow.MenuBubbleOrders.renderHtml = function (data) \{\par
        var r = f(data);\par
        displayHiddenDivs();\par
        return r;\par
    \}\par
\}\par
\par
function toggleMenuBubble(event) \{\par
    if (event.currentTarget.id == "BTN_Troops_Plus") troops = !troops;\par
\tab if (event.currentTarget.id == "BTN_Movement_Plus") movement = !movement;\par
    if (event.currentTarget.id == "BTN_Trade_Plus") trade = !trade;\par
    displayHiddenDivs();\par
\par
\}\par
\par
function displayHiddenDivs() \{\par
    if (troops) \{\par
        $("div#lbox_cont_troops").css("display", "block").appendTo('#town_controls');\par
\tab\tab\} else \{\par
        $("div#lbox_cont_troops").css("display", "none");\par
    \}\par
    if (movement) \{\par
        $("div#lbox_cont_movement").css("display", "block").appendTo('#town_controls');\par
\tab\} else \{\par
        $("div#lbox_cont_movement").css("display", "none");\par
    \}\par
    if (trade) \{\par
        $("div#lbox_cont_trade").css("display", "block").appendTo('#town_controls');\par
    \} else \{\par
        $("div#lbox_cont_trade").css("display", "none");\par
    \}\par
\tab\par
\tab $("a#BTN_Troops_Plus").unbind();\par
\tab $("a#BTN_Movement_Plus").unbind();\par
\tab $("a#BTN_Trade_Plus").unbind();\par
\tab $("a#BTN_Troops_Plus").bind("click", toggleMenuBubble);\par
    $("a#BTN_Movement_Plus").bind("click", toggleMenuBubble);\par
    $("a#BTN_Trade_Plus").bind("click", toggleMenuBubble);\par
\par
$('#BTN_Troops_Plus').click(function ()  \{\par
if(troop_ICON_switch == 0) \{\par
$("#BTN_Troops_Plus_Icon").attr("src","http://s1.directupload.net/images/120410/9athvf59.png");\par
\tab troop_ICON_switch = troop_ICON_switch +1;\par
\}\par
else \{\par
$("#BTN_Troops_Plus_Icon").attr("src","http://s14.directupload.net/images/120410/r6844coh.png"); \par
\tab troop_ICON_switch = troop_ICON_switch -1;\par
\}\par
\});\par
\par
$('#BTN_Movement_Plus').click(function ()  \{\par
if(movement_ICON_switch == 0) \{\par
$("#BTN_Movement_Plus_Icon").attr("src","http://s1.directupload.net/images/120410/9athvf59.png");\par
\tab movement_ICON_switch = movement_ICON_switch +1;\par
\}\par
else \{\par
$("#BTN_Movement_Plus_Icon").attr("src","http://s14.directupload.net/images/120410/r6844coh.png"); \par
\tab movement_ICON_switch = movement_ICON_switch -1;\par
\}\par
\});\par
\par
$('#BTN_Trade_Plus').click(function ()  \{\par
if(trade_ICON_switch == 0) \{\par
$("#BTN_Trade_Plus_Icon").attr("src","http://s1.directupload.net/images/120410/9athvf59.png");\par
\tab trade_ICON_switch = trade_ICON_switch +1;\par
\}\par
else \{\par
$("#BTN_Trade_Plus_Icon").attr("src","http://s14.directupload.net/images/120410/r6844coh.png"); \par
\tab trade_ICON_switch = trade_ICON_switch -1;\par
\}\par
\});\par
\tab\}\par
\}());\par
\tab\par
\tab\par
// Vollbild Funktion (based on the work of grepolisutils by sayunu)\par
$('#BTN_Fullscreen').click(function ()  \{\par
document.getElementById('sidebar').style.visibility='hidden';\par
document.getElementById('header').style.visibility='hidden';  \par
document.getElementById('Buttonleiste').style.visibility='hidden';  \par
document.getElementById('Troops_Info_leiste').style.visibility='hidden'; \par
document.getElementById('BTN_Troops_intown').style.visibility='hidden'; \par
document.getElementById('BTN_Troops_fromtown').style.visibility='hidden'; \par
document.getElementById('BTN_GS_Ally').style.visibility='hidden'; \par
document.getElementById('BTN_Grepobash').style.visibility='hidden'; \par
document.getElementById('BTN_Grepomaps').style.visibility='hidden'; \par
document.getElementById('BTN_Townsearch').style.visibility='hidden'; \par
document.getElementById('BTN_Max_Forum').style.visibility='hidden'; \par
document.getElementById('BTN_GS_Player').style.visibility='hidden'; \par
document.getElementById('BTN_Fullscreen').style.visibility='hidden'; \par
document.getElementById('BTN_Troops_Info').style.visibility='hidden'; \par
document.getElementById('BTN_Troops_Plus').style.visibility='hidden'; \par
document.getElementById('BTN_Movement_Plus').style.visibility='hidden'; \par
document.getElementById('BTN_Trade_Plus').style.visibility='hidden';\par
document.getElementById('BTN_HK').style.visibility='hidden';  \par
document.getElementById('main_area').style.top='0px';  \par
\par
var div = document.createElement('div');  \par
div.style.zIndex = 10;  div.id = 'vb_back';  \par
div.style.position = 'fixed';\par
div.style.top = '1px';  \par
div.style.left = '50%';   \par
div.style.backgroundColor = '#2D5487';   \par
div.style.border = '1px solid #FFCC66';  \par
document.body.appendChild(div);   \par
\par
var a = document.createElement('a');  a.innerHTML = "<img src=http://s14.directupload.net/images/120327/4tnvbg37.png></img>"; \par
a.href = 'javascript:void(0)';  a.style.color = '#FFCC66';  \par
a.onclick = function()  \par
\{    document.body.removeChild(document.getElementById('vb_back'));   \par
document.getElementById('sidebar').style.visibility='visible';   \par
document.getElementById('header').style.visibility='visible';  \par
document.getElementById('Buttonleiste').style.visibility='visible'; \par
document.getElementById('Troops_Info_leiste').style.visibility='visible'; \par
document.getElementById('BTN_Troops_intown').style.visibility='visible'; \par
document.getElementById('BTN_Troops_fromtown').style.visibility='visible'; \par
document.getElementById('BTN_GS_Ally').style.visibility='visible'; \par
document.getElementById('BTN_Grepobash').style.visibility='visible'; \par
document.getElementById('BTN_Grepomaps').style.visibility='visible'; \par
document.getElementById('BTN_Townsearch').style.visibility='visible'; \par
document.getElementById('BTN_Max_Forum').style.visibility='visible'; \par
document.getElementById('BTN_GS_Player').style.visibility='visible'; \par
document.getElementById('BTN_Fullscreen').style.visibility='visible'; \par
document.getElementById('BTN_Troops_Info').style.visibility='visible'; \par
document.getElementById('BTN_Troops_Plus').style.visibility='visible'; \par
document.getElementById('BTN_Movement_Plus').style.visibility='visible'; \par
document.getElementById('BTN_Trade_Plus').style.visibility='visible';\par
document.getElementById('BTN_HK').style.visibility='visible';  \par
document.getElementById('main_area').style.top='65px'; \};  \par
div.appendChild(a);\par
\});\par
\par
\par
// Helpdiv\par
(function ()\{\par
$('<div id="helpdiv" style="display:none;z-index:1000;position:absolute;background-image:url(http://s14.directupload.net/images/120622/nzvnt9hs.png);background-repeat:no-repeat;width:236px;height:93px;top:48%;left:47%;"><input type="text" id="suchwort" value="Suchwort" style="height:14px;width:135px;margin-top:60px;font-size:10px"/><input type="submit" id="help_BTN" value="Suchen" style="height:19px;background-color:#EEEEEE;border-width:1px;border-style:solid;border-color:#330000;font-size:10px"/></div>').appendTo('body');\par
$("#suchwort").focus(function()\{var that = this; setTimeout(function()\{$(that).select();\},10);\});\par
$("#help_BTN").click(function() \{\par
var Suchwort_var = $("#suchwort").val();\par
window.open("http://wiki."+SpracheID+".grepolis.com/index.php?&search="+Suchwort_var+"");\par
\});\par
$('<a id="BTN_exithelp" style="z-index:101;position:absolute;width:24px;height:20px;top:-19px;left:198px;" href="#"><img src="http://s7.directupload.net/images/120622/5r399w7u.png" style="border-width: 0px" /></a>').appendTo('#helpdiv');\par
$("#BTN_exithelp").click(function() \{\par
$("#helpdiv").toggle();\par
\});\par
\}()); \par
\par
\par
// Hotkeys\par
$(window).keydown(\par
    function(hk)\{\par
        var notTheseOnes = ['textarea','input'];\par
        var target = hk.target.tagName.toLowerCase();\par
\tab\tab // Stadt vor und zur\'fcck\par
        if (hk.which == 37 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab window.location.href ='javascript:Layout.townSwitch(ITowns.getPrevTownId(Game.townId))';\par
        \}\par
\tab\tab if (hk.which == 39 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Layout.townSwitch(ITowns.getNextTownId(Game.townId))';\par
        \}\par
\tab\tab // Verwalter\par
\tab\tab if (hk.which == 49 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("trade_overview")';\par
        \}\par
\tab\tab if (hk.which == 50 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("command_overview")';\par
        \}\par
\tab\tab if (hk.which == 51 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("recruit_overview")';\par
        \}\tab\tab\par
\tab\tab if (hk.which == 52 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("unit_overview")';\par
        \}\par
\tab\tab if (hk.which == 53 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("outer_units")';\par
        \}\par
\tab\tab if (hk.which == 54 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("building_overview")';\par
        \}\par
\tab\tab if (hk.which == 55 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("culture_overview")';\par
        \}\par
\tab\tab if (hk.which == 56 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("gods_overview")';\par
        \}\par
\tab\tab if (hk.which == 57 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("hides_overview")';\par
        \}\par
\tab\tab if (hk.which == 48 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("town_group_overview","town_group_overviews")';\par
        \}\par
\tab\tab if (hk.which == 219 && $.inArray(target,notTheseOnes) < 0)\{\par
            window.location.href ='javascript:Overviews.openOverview("towns_overview")';\par
        \}\tab\par
\tab\tab // Andere\par
\tab\tab if (hk.which == 72 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab\tab $("#helpdiv").toggle();\par
        \}\tab\par
\tab\tab if (hk.which == 87 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab\tab $("#idWWRankBtn").toggle();\par
        \}\par
\tab\tab if (hk.which == 83 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(1);\par
        \}\par
\tab\tab if (hk.which == 82 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(13);\par
        \}\par
\tab\tab if (hk.which == 66 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(17);\par
        \}\tab\par
\tab\tab if (hk.which == 78 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(16);\par
\tab\tab\}\tab\par
\tab\tab if (hk.which == 65 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(6);\par
\tab\tab\}\tab\par
\tab\tab if (hk.which == 70 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(7);\par
\tab\tab\}\tab\par
\tab\tab if (hk.which == 69 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(26);\par
\tab\tab\}\tab\par
\tab\tab if (hk.which == 80 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab uw.Layout.wnd.Create(24);\par
\tab\tab\}\tab\par
\tab\tab if (hk.which == 88 && $.inArray(target,notTheseOnes) < 0)\{\par
\tab\tab var uw=unsafeWindow;\par
\tab\tab var inhalt = $('<div class="inner_box"><div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;"><div style="float:left; padding-right:10px;"></div>Vorwort</div><div id="vorwort" style="padding:5px;font-family: Verdana, Geneva, sans-serif;font-size: 12px;"><table width="100%" border="0" cellspacing="0"><tr><td width="10%" style="text-align:center"><img src="http://s1.directupload.net/images/120726/vaatg5wd.png" width="100" height="100" /><b>Quackmaster</b></td><td width="90%">Wenn ihr meine Arbeit unterst\'fctzen wollt, freue ich \'fcber jeden Klick auf   die normalen Links mit dem jeweiligen Namen des Statistiktools oder des Skriptes. Ihr werdet lediglich   kurz zu einer Seite weitergeleitet, die ihr nach 5 Sekunden \'fcberspringen   k\'f6nnt. Wer keine Zeit daf\'fcr aufbringen m\'f6chte, findet den Direktlink direkt darunter. Es sind nur die in der deutschen Version von Grepolis erlaubten Skripte verzeichnet.</td></tr></table></div><div style="overflow-x: hidden; padding-left: 5px; position: relative;"></div></div></div><div class="inner_box" style="margin-top:20px;"><div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;"><div style="float:left; padding-right:10px;"></div><table width="100%" border="0" cellspacing="0"><tr><td width="95%">Statistiken</td><td width="5%"><div id="Stats_Export"></div></td></tr></table></div><div id="Stats" style="padding:5px;font-family: Verdana, Geneva, sans-serif;font-size: 12px;"><a href="http://adf.ly/B7C8k" target="_blank">Grepolis Stats</a> <small>von <a href="http://www.clashrank.com/contact/" rel="nofollow" target="_blank">Clash Rank</a></small><br /><small><a href="http://www.grepostats.com" target="_blank">Direktlink</a></small><br />Bietet Statistiken und \'dcbersichten \'fcber Spieler, Allianzen, St\'e4dte und vielem mehr<br /><br /><a href="http://adf.ly/B7BlJ" target="_blank">Grepolis Maps</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=105" rel="nofollow" target="_blank">Gehirnpfirsich</a></small><br /><small><a href="http://www.grepolismaps.org" target="_blank">Direktlink</a></small><br />Kartentool - Weltkarten aller Server<br /><br /><a href="http://adf.ly/B6HBW" target="_blank">Bashrangliste</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=1643" rel="nofollow" target="_blank">quert</a></small><br /><small><a href="http://www.grepobash.de" target="_blank">Direktlink</a></small><br />Allianzinterne Bashrangliste<br /><br /><a href="http://adf.ly/B7CYV" target="_blank">Polissuche</a> <small> von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=83" rel="nofollow" target="_blank">Faark</a> (Quelltext: Tonda)</small><br /><small><a href="http://grepo.faark.de/tondasPolisSuche/townSearch.php" target="_blank">Direktlink</a></small><br />Suchen von St\'e4dten mit bestimmten Filteroptionen. N\'fctzlich um Geisterst\'e4dte und Inaktive zu finden<br /><br /><a href="http://adf.ly/B7Cry" target="_blank">Grepolis - Einheiten Vergleich</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=11342" rel="nofollow" target="_blank">Quackmaster</a></small><br /><small><a href="https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE" target="_blank">Direktlink</a></small><br />Eine Tabelle um die Verteidigungswerte der einzelnen Einheiten in Grepolis miteinander zu vergleichen<br /><br /><a href="http://adf.ly/B7CyQ" target="_blank">Abakus - Der Grepolis Rechner</a>  <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=781" rel="nofollow" target="_blank">Aerials</a></small><br /><small><a href="http://forum.de.grepolis.com/showthread.php?691-Abakus-Der-Grepolis-Rechner" target="_blank">Direktlink</a></small><br />Rechner und Planer rund um Grepolis zum Download auf den Computer<br /><br /><a href="http://adf.ly/BKCfU" target="_blank">YouScreen</a>  <small>von <a href="mailto:webmaster@youscreen.de" rel="nofollow" target="_blank">Lukas Ruschitzka</a></small><br /><small><a href="http://www.youscreen.de/" target="_blank">Direktlink</a></small><br />Screenshot Tool - mit der &quot;Druck&quot; Taste einen Screenshot erstellen und direkt ins Internet hochladen (vorherige Bearbeitung m\'f6glich)</div><div style="overflow-x: hidden; padding-left: 5px; position: relative;"></div></div></div><div class="inner_box" style="margin-top:20px;"><div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;"><div style="float:left; padding-right:10px;"></div><table width="100%" border="0" cellspacing="0"><tr><td width="95%">Skripte</td><td width="5%"><div id="Skripte_Export"></div></td></tr></table></div><div id="Skripte" style="padding:5px;font-family: Verdana, Geneva, sans-serif;font-size: 12px;"><a href="http://adf.ly/AAMwY" target="_blank">Quack Toolsammlung</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=11342" rel="nofollow">Quackmaster</a></small><br /><small><a href="http://userscripts.org/scripts/show/128637" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />- Grepo Stats Button in der Stadtinfo, Spielerinfo und Allianzinfo<br />- \'dcbersch\'fcssiges Silber bis 15k wird in das Formfeld in der H\'f6hle vorab eingetragen<br />- In Berichten und im Simulator werden Truppenverluste in Rohstoffe/Gunst/BP umgerechnet<br />- Anzeige von Punkten f\'fcr bestimmte Geb\'e4ude im Senat<br />- Buttonleiste mit Links zu allen wichtigen Toolseiten: grepostats.com,   grepobash.de, grepolismaps.org, tondas Polissuche (hosted by faark) und   einem Link zum Allyforum (maximiert)<br />- Vollbild Funktion<br />- BB Code Ausgabe der stationierten Truppen in einer Stadt f\'fcr das Forum oder Nachrichten<br />- Kein \'dcberladen der Schiffe im Angriffs-/Unterst\'fctzungsfenster<br />- Erweiterung der Kultur\'fcbersicht (G.Tio2.0Tools)<br />- Erweiterung der Befehls\'fcbersicht (Anzahl von Bewegungen wird angezeigt)<br />- Hotkeys zu verschiedenen Funktionen<br />- Durchbl\'e4ttern der St\'e4dte mit den Pfeiltasten<br />- Grepo Wiki Direktsuche<br /><br /><a href="http://adf.ly/AAYLL" target="_blank">WW-Ranks</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=4532" rel="nofollow">ReinerCY</a></small><br /><small><a href="www.g2.b0x.info/wwranks.user.js" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />F\'fcgt einen Button hinzu, welcher bei Klick ein Fenster \'f6ffnet, welches eine Sch\'e4tzung der zeitlichen Entwicklung der WW anzeigt.<br /><br /><a href="http://adf.ly/AARtm" target="_blank">GrepoTownList</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=8531" rel="nofollow">GTeauDFAdGTio</a></small><br /><small><a href="http://userscripts.org/scripts/show/84608" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />Zusatzfunktionen f\'fcr die Seite &quot;Grepolis Stats&quot;. Erm\'f6glicht die Umwandlung der St\'e4dte eines Spielers in BB-Code.<br /><br /><a href="http://adf.ly/AAWLF" target="_blank">G.Tio2.0Tools</a> <small>von <a href="http://forum.de.grepolis.com/private.php?do=newpm&amp;u=8531" rel="nofollow">GTeauDFAdGTio</a></small><br /><small><a href="http://www.gtiopolis.de/index.php?page=gtio2-0tools" target="_blank">Direktlink</a></small><br /><strong>Funktionen:</strong><br />- Anzeige Town-ID<br />- Grepostats Button in der Stadtinfo und Spielerinfo<br />- Erweiterung Kultur\'fcbersicht<br />- Erweiterung Befehls\'fcbersicht<br />- Kein \'dcberladen der Schiffe<br /></div><div style="overflow-x: hidden; padding-left: 5px; position: relative;"></div></div></div>');\par
\tab\tab var win = uw.Layout.wnd.Create(0,"\'dcbersicht Statistiken und Skripte");\par
\tab\tab win.setWidth(740);\par
        win.setHeight(520);\par
\tab\tab win.setContent(inhalt);\par
\tab\tab var mo_Export = "Liste als BB-Code f\'fcr das Forum";\par
\tab\tab $('<a id="BTN_Stats_Export" style="" href="#"><img src="http://s1.directupload.net/images/120731/temp/cji8kxhb.png" style="border-width: 0px" /></a>').appendTo('#Stats_Export');\par
\tab\tab $('<a id="BTN_Skripte_Export" style="" href="#"><img src="http://s1.directupload.net/images/120731/temp/cji8kxhb.png" style="border-width: 0px" /></a>').appendTo('#Skripte_Export');\par
\tab\tab uw.$('#BTN_Stats_Export').mousePopup(new uw.MousePopup(mo_Export));\tab\tab\par
\tab\tab uw.$('#BTN_Skripte_Export').mousePopup(new uw.MousePopup(mo_Export));\par
\tab\tab var expRahmen_a = "<div class='inner_box'><div class='game_border'><div class='game_border_top'></div><div class='game_border_bottom'></div><div class='game_border_left'></div><div class='game_border_right'></div><div class='game_border_corner corner1'></div><div class='game_border_corner corner2'></div><div class='game_border_corner corner3'></div><div class='game_border_corner corner4'></div><div class='game_header bold' style='height:18px;'><div style='float:left; padding-right:10px;'></div>"\par
\tab\tab var expRahmen_b = "</div><textarea id='expTextarea' style=\\"height: 165px; width: 99%;\\">"\par
\tab\tab var expRahmen_c = "</textarea></div><div style='overflow-x: hidden; padding-left: 5px; position: relative;'></div></div></div>"\par
\tab\tab var expTitel = "Copy and Paste"\par
\tab\tab\par
\tab\tab\tab\tab $('#BTN_Stats_Export').click(function ()  \{\par
\tab\tab var expWin = uw.Layout.wnd.Create(0,"Statistiken");\par
\tab\tab expWin.setWidth(740);\par
\tab\tab var expInhalt_Stats = "[quote][font=sansserif][center][size=20][b]Statistiken:[/b][/size][/center][/font][/quote]\\n[quote][font=sansserif][size=10][url=http://adf.ly/B7C8k]Grepolis Stats[/url][/size] [size=6]von [url=http://www.clashrank.com/contact/]Clash Rank[/url]\\n[url=http://www.grepostats.com/]Direktlink[/url][/size]\\nBietet Statistiken und \'dcbersichten \'fcber Spieler, Allianzen, St\'e4dte und vielem mehr\\n\\n[size=10][url=http://adf.ly/B7BlJ]Grepolis Maps[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=105]Gehirnpfirsich[/url]\\n[url=http://www.grepolismaps.org/]Direktlink[/url][/size]\\nKartentool - Weltkarten aller Server\\n\\n[size=10][url=http://adf.ly/B6HBW]Bashrangliste[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=1643]quert[/url]\\n[url=http://www.grepobash.de/]Direktlink[/url][/size]\\nAllianzinterne Bashrangliste\\n\\n[size=10][url=http://adf.ly/B7CYV]Polissuche[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=83]Faark[/url] (Quelltext: Tonda)\\n[url=http://grepo.faark.de/tondasPolisSuche/townSearch.php]Direktlink[/url][/size]\\nSuchen von St\'e4dten mit bestimmten Filteroptionen. N\'fctzlich um Geisterst\'e4dte und Inaktive zu finden.\\n\\n[size=10][url=http://adf.ly/B7Cry]Grepolis - Einheiten Vergleich[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=11342]Quackmaster[/url]\\n[url=https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE]Direktlink[/url][/size]\\nEine Tabelle um die Verteidigungswerte der einzelnen Einheiten in Grepolis miteinander zu vergleichen.\\n\\n[size=10][url=http://adf.ly/B7CyQ]Abakus - Der Grepolis Rechner[/url][/size] [size=6]von [url=http://forum.de.grepolis.com/private.php?do=newpm&u=781]Aerials[/url]\\n[url=http://forum.de.grepolis.com/showthread.php?691-Abakus-Der-Grepolis-Rechner]Direktlink[/url][/size]\\nRechner und Planer rund um Grepolis zum Download auf den Computer\\n\\n[size=10][url=http://adf.ly/BKCfU]YouScreen[/url][/size] [size=6]von [url=mailto:webmaster@youscreen.de]Lukas Ruschitzka[/url]\\n[url=http://www.youscreen.de/]Direktlink[/url][/size]\\nScreenshot Tool - mit der Druck-Taste einen Screenshot erstellen und direkt ins Internet hochladen (vorherige Bearbeitung m\'f6glich)\\n[/font][/quote]"\par
\tab\tab expWin.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Stats +expRahmen_c);\par
\tab\tab $("#expTextarea").focus(function()\{var that = this; setTimeout(function()\{$(that).select();\},10);\});\par
\tab\tab\});\par
\tab\tab\tab\tab $('#BTN_Skripte_Export').click(function ()  \{\par
\tab\tab var expWin = uw.Layout.wnd.Create(0,"Skripte");\par
\tab\tab expWin.setWidth(740);\par
\tab\tab var expInhalt_Skripte = "[quote][font=sansserif][center][size=20][b]Skripte:[/b][/size]\\nAdd-ons installieren um die Skripte zum laufen zu bringen:\\n[b]Firefox:[/b] [url=https://addons.mozilla.org/de/firefox/addon/greasemonkey/]Greasemonkey[/url] ; [b]Chrome:[/b] [url=https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo]Tampermonkey[/url][/center][/font][/quote]\\n[quote][font=sansserif][size=10][url=http://adf.ly/AAMwY]Quack Toolsammlung[/url][/size]\\n[size=6][url=http://userscripts.org/scripts/show/128637]Direktlink[/url][/size]\\n[b]Funktionen:[/b]\\n- Grepo Stats Button in der Stadtinfo, Spielerinfo und Allianzinfo\\n- \'dcbersch\'fcssiges Silber bis 15k wird in das Formfeld in der H\'f6hle vorab eingetragen\\n- In Berichten und im Simulator werden Truppenverluste in Rohstoffe/Gunst/BP umgerechnet\\n- Anzeige von Punkten f\'fcr bestimmte Geb\'e4ude im Senat\\n- Buttonleiste mit Links zu allen wichtigen Toolseiten: grepostats.com, grepobash.de, grepolismaps.org, tondas Polissuche (hosted by faark) und einem Link zum Allyforum (maximiert)\\n- Vollbild Funktion\\n- BB Code Ausgabe der stationierten Truppen in einer Stadt f\'fcr das Forum oder Nachrichten\\n- Kein \'dcberladen der Schiffe im Angriffs-/Unterst\'fctzungsfenster\\n- Erweiterung der Kultur\'fcbersicht (G.Tio2.0Tools)\\n- Erweiterung der Befehls\'fcbersicht (Anzahl von Bewegungen wird angezeigt)\\n- Hotkeys zu verschiedenen Funktionen\\n- Durchbl\'e4ttern der St\'e4dte mit den Pfeiltasten\\n- Grepo Wiki Direktsuche[/font][/quote]\\n[quote][font=sansserif][size=10][url=http://adf.ly/AARtm]GrepoTownList[/url][/size]\\n[size=6][url=http://userscripts.org/scripts/show/84608]Direktlink[/url][/size]\\n[b]Funktionen:[/b]\\nZusatzfunktionen f\'fcr die Seite GrepoStats. Erm\'f6glicht die Umwandlung der St\'e4dte eines Spielers in BB-Code.[/font][/quote]\\n[quote][font=sansserif][size=10][url=http://adf.ly/AAYLL]WW-Ranks[/url][/size]\\n[size=6][url=www.g2.b0x.info/wwranks.user.js]Direktlink[/url][/size]\\n[b]Funktionen:[/b]\\nF\'fcgt einen Button hinzu, welcher bei Klick ein Fenster \'f6ffnet, welches eine Sch\'e4tzung der zeitlichen Entwicklung der WW anzeigt.[/font][/quote]\\n[quote][font=sansserif][size=10][url=http://adf.ly/AAWLF]G.Tio2.0Tools[/url][/size]\\n[size=6][url=http://www.gtiopolis.de/index.php?page=gtio2-0tools]Direktlink[/url][/size] \\n[b]Funktionen:[/b]\\n- Anzeige Town-ID\\n- Grepostats Button in der Stadtinfo und Spielerinfo\\n- Erweiterung Kultur\'fcbersicht\\n- Erweiterung Befehls\'fcbersicht\\n- Kein \'dcberladen der Schiffe[/font][/quote]"\par
\tab\tab expWin.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Skripte +expRahmen_c);\par
\tab\tab $("#expTextarea").focus(function()\{var that = this; setTimeout(function()\{$(that).select();\},10);\});\par
\tab\tab\});\par
\tab\tab\}\tab\tab\tab\par
    \});\par
\par
\par
// Grepo BBUnit by balping\par
(function () \{\par
var uw=unsafeWindow;\par
\par
uw.bbunit = function(mode)\{\par
    var units_own = uw.ITowns.getTown(parseInt(uw.Game.townId)).units();\par
    var units_support = uw.ITowns.getTown(parseInt(uw.Game.townId)).unitsSupport();\par
    var bbf="[*]";\par
    var bba="[*]";\par
    var volte=false;\par
    for (unit in units_own)\{\par
        if(units_own[unit]!=0 || units_support[unit]!=0)\{\par
            bbf += "[img]http://cdn.grepolis.com/images/game/units/" + unit + "_40x40.png[/img][|]";\par
            bba += "[center]" + (units_own[unit] + mode*units_support[unit]) + "[/center][|]";\par
            volte=true;\par
        \}\par
    \}\par
    if(volte)\{\par
        bbf = bbf.substr(0, bbf.length-3);\par
        bba = bba.substr(0, bba.length-3);\par
        bbf += "[/*]";\par
        bba += "[/*]";\par
        var win = uw.Layout.wnd.Create(0,"BBUnit");\par
        win.setWidth(640);\par
        win.setHeight(360);\par
        win.setContent("Copy and paste:<br/><textarea style=\\"height: 90%; width: 95%;\\">Troops " + (mode==0 ? "from" : "in") + " [town]" + parseInt(uw.Game.townId) + "[/town]:\\n[table]" + bbf + bba + "[/table]</textarea>");\par
    \}\par
\};\par
\tab\}());\par
\par
\par
// GREPO POINTS (based on the work of TilX : http://userscripts.org/users/tilx)\par
(function () \{\par
\par
\tab //cookie-based alternative for GM_*Value functions\par
\tab var value, newValueLib = function (prefix) \{\par
\tab\tab var prefix = 'tilx_' + prefix + '_';\par
\tab\tab\par
\tab\tab //cookie-functions by Peter-Paul Koch (http://www.quirksmode.org/js/cookies.html#script)\par
\tab\tab var createCookie = function (name, value, days) \{\par
\tab\tab\tab var expires = "";\par
\tab\tab\tab if (days) \{\par
\tab\tab\tab\tab var date = new Date();\par
\tab\tab\tab\tab date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));\par
\tab\tab\tab\tab expires = "; expires=" + date.toGMTString();\par
\tab\tab\tab\}\par
\tab\tab\tab document.cookie = name + "=" + value + expires + "; path=/";\par
\tab\tab\};\par
\tab\tab var readCookie = function (name) \{\par
\tab\tab\tab var nameEQ = name + "=";\par
\tab\tab\tab var ca = document.cookie.split(';');\par
\tab\tab\tab for(var i = 0; i < ca.length; i++) \{\par
\tab\tab\tab\tab var c = ca[i];\par
\tab\tab\tab\tab while (c.charAt(0) == ' ') \{\par
\tab\tab\tab\tab\tab c = c.substring(1,c.length);\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab if (c.indexOf(nameEQ) == 0) \{\par
\tab\tab\tab\tab\tab return c.substring(nameEQ.length,c.length);\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\tab return undefined;\par
\tab\tab\};\par
\tab\tab\par
\tab\tab return \{\par
\tab\tab\tab set: function (name, value) \{\par
\tab\tab\tab\tab createCookie(prefix + name, value, 365);\par
\tab\tab\tab\}, \par
\tab\tab\tab get: function (name, def)\{\par
\tab\tab\tab\tab var ret = readCookie(prefix + name);\par
\tab\tab\tab\tab if(ret !== undefined)\{\par
\tab\tab\tab\tab\tab return ret;\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab return def;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\};\par
\tab\};\par
\tab\par
\tab\par
\tab //Object.create() by Douglas Crockford\par
\tab if(typeof Object.create !== 'function')\{\par
\tab\tab Object.create = function (o) \{\par
\tab\tab\tab var F = function () \{\};\par
\tab\tab\tab F.prototype = o;\par
\tab\tab\tab return new F();\par
\tab\tab\};\par
\tab\} \par
\tab\par
\tab\par
\tab //the actual script\par
\tab var grepoPoints = (function () \{\par
\tab\tab\par
\tab\tab\par
\tab\tab var buildingsData = \{\par
\tab\tab\tab 'main':\tab\tab\tab [110, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82, 90, 99],\par
\tab\tab\tab 'hide':\tab\tab\tab [21, 6, 8, 11, 14, 18, 23, 30, 39, 51],\par
\tab\tab\tab 'storage':\tab\tab [15, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10, 12, 13, 15, 17, 20, 22, 25, 29, 33, 38, 43, 49, 56, 64, 73, 83],\par
\tab\tab\tab 'farm':\tab\tab\tab [17, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 25, 28, 31, 35, 39, 44, 49, 55, 62, 69, 77, 87, 97, 109, 122, 136, 153],\par
\tab\tab\tab 'place':\tab\tab [22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],\par
\tab\tab\tab 'lumber':\tab\tab [22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],\par
\tab\tab\tab 'stoner':\tab\tab [22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],\par
\tab\tab\tab 'ironer':\tab\tab [22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],\par
\tab\tab\tab 'market':\tab\tab [108, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 22, 24, 26, 28, 30, 32, 35, 38, 41, 44, 47, 51, 55, 60, 64, 70, 75],\par
\tab\tab\tab 'docks':\tab\tab [66, 7, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 49, 54, 60, 66, 72, 80, 88, 96],\par
\tab\tab\tab 'barracks':\tab\tab [33, 4, 4, 5, 5, 6, 7, 7, 8, 9, 10, 11, 13, 14, 16, 17, 19, 22, 24, 27, 30, 33, 37, 42, 46, 52, 58, 64, 72, 80],\par
\tab\tab\tab 'wall':\tab\tab\tab [34, 4, 5, 5, 6, 6, 7, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 28, 31, 35, 39, 44, 49, 55],\par
\tab\tab\tab 'academy':\tab\tab [67, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 28, 31, 35, 39, 44, 49, 55, 62, 69, 77, 87, 97, 109, 122, 136, 153, 171, 192],\par
\tab\tab\tab 'temple':\tab\tab [216, 17, 19, 20, 22, 24, 25, 27, 30, 32, 35, 37, 40, 44, 48, 51, 55, 59, 64, 69, 78, 81, 87, 94, 102],\par
\tab\tab\tab\par
\tab\tab\tab 'theater':\tab\tab [500],\par
\tab\tab\tab 'lighthouse':\tab [500],\par
\tab\tab\tab 'library':\tab\tab [500],\par
\tab\tab\tab 'thermal':\tab\tab [500],\par
\tab\tab\tab 'tower':\tab\tab [500],\par
\tab\tab\tab 'statue':\tab\tab [500],\par
\tab\tab\tab 'oracle':\tab\tab [500],\par
\tab\tab\tab 'trade_office':\tab [500]\par
\tab\tab\};\par
\tab\tab\par
\tab\tab var levels = Object.create(buildingsData);\par
\tab\tab var levelsQueue = Object.create(buildingsData);\par
\par
\tab\tab\par
\tab\tab var initStyle = function () \{\par
\tab\tab\tab\tab var style = [];\par
\tab\tab\tab\tab style.push('span.tilx_points \{font-size: 7px\}');\par
\tab\tab\tab\tab style.push('span.tilx_points_block \{display:block; position:absolute;bottom:2px;right:3px;z-index:5; color:#fff;text-shadow:1px 1px 0px #000;font-size: 10px;font-weight: bold;\}');\par
\tab\tab\tab\tab $('<style type="text/css">' + style.join("\\n") + '</style>').appendTo('head');\par
\tab\tab\}\par
\tab\tab\par
\tab\tab var getUpgradeBuildingHTMLPart_old;\par
\tab\tab\par
\tab\tab var getUpgradeBuildingHTMLPart_new = function(building) \{\par
\tab\tab\tab var ret = getUpgradeBuildingHTMLPart_old.apply(window, arguments),\par
\tab\tab\tab\tab name = building.controller.replace(/^building_(.*)$/, '$1'),\par
\tab\tab\tab\tab level = levels[name],\par
\tab\tab\tab\tab levelQueue = levelsQueue[name],\par
\tab\tab\tab\tab points = 0;\par
\tab\tab\tab if (typeof level === 'number' && typeof levelQueue === 'number') \{\par
\tab\tab\tab\tab for (var i = 0; i < level && typeof buildingsData[name][i] === 'number'; i += 1) \{\par
\tab\tab\tab\tab\tab points += buildingsData[name][i];\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab ret += 'Schon ' + points + ' P ';\par
\tab\tab\tab\tab if(level !== levelQueue)\{\par
\tab\tab\tab\tab\tab for (var i = level; i < levelQueue && typeof buildingsData[name][i] === 'number'; i += 1) \{\par
\tab\tab\tab\tab\tab\tab points += buildingsData[name][i];\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab ret += '(' + points + ' P mit Bauschleife) ';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab for (var i = levelQueue; typeof buildingsData[name][i] === 'number'; i += 1) \{\par
\tab\tab\tab\tab\tab points += buildingsData[name][i];\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab ret += 'von insgesamt ' + points + ' P erreicht. <br>';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab ret += 'Stufe ' + level; \par
\tab\tab\tab\tab if(level !== levelQueue)\{\par
\tab\tab\tab\tab\tab ret += ' (' + levelQueue + ' mit Bauschleife)';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab ret += ' von maximal ' + buildingsData[name].length + '.';\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab return ret;\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab return ret;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab\par
\tab\tab var addPoints = (function () \{\par
\tab\tab\tab var examineQueue = function (name, level, val) \{\par
\tab\tab\tab\tab $('.main_tasks_image').each(function () \{\par
\tab\tab\tab\tab\tab if ($(this).css('backgroundImage').replace(/.*\\/([^.]+)\\.png.*/, '$1') === name) \{\par
\tab\tab\tab\tab\tab\tab $(this).append(\par
\tab\tab\tab\tab\tab\tab\tab '<span class="tilx_points_block">' + (val[level] !== undefined ? val[level] : '?') + ' P<\\/span>'\par
\tab\tab\tab\tab\tab\tab );\par
\tab\tab\tab\tab\tab level += 1;\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\});\par
\tab\tab\tab\tab return level;\par
\tab\tab\tab\};\par
\tab\tab\tab\par
\tab\tab\tab return function () \{\par
\tab\tab\tab\tab if(!$('#building_main_main').hasClass('tilx_grepoPoints'))\{\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab $('#building_main_main').addClass('tilx_grepoPoints')\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab var b, level;\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab $.each(buildingsData, function (key, val) \{\par
\tab\tab\tab\tab\tab\tab b = $('#building_main_' + key);\par
\tab\tab\tab\tab\tab\tab if (b.length > 0) \{\par
\tab\tab\tab\tab\tab\tab\tab level = parseInt($('.level', b).eq(0).text(), 10);\par
\tab\tab\tab\tab\tab\tab\tab if (!isNaN(level)) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab levels[key] = level;\par
\tab\tab\tab\tab\tab\tab\tab\tab level = examineQueue(key, level, val);\par
\tab\tab\tab\tab\tab\tab\tab\tab levelsQueue[key] = level;\par
\tab\tab\tab\tab\tab\tab\tab\tab if (level < val.length) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab $('.build:not(.tear_down), .build_grey:not(.tear_down)', b).append('<span class="tilx_points"> (' + (val[level] !== undefined ? val[level] : '?') + ' P)<\\/span>');\par
\tab\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\tab\tab if (level - 1 >= 0) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab $('.tear_down', b).append('<span class="tilx_points"> (-' + (val[level - 1] !== undefined ? val[level - 1] : '?') + ' P)<\\/span>');\par
\tab\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab\tab\tab b = $('#special_building_' + key);\par
\tab\tab\tab\tab\tab\tab\tab if (b.length > 0) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab levels[key] = 0;\par
\tab\tab\tab\tab\tab\tab\tab\tab level = examineQueue(key, 0, val);\par
\tab\tab\tab\tab\tab\tab\tab\tab levelsQueue[key] = level;\par
\tab\tab\tab\tab\tab\tab\tab\tab b.append(\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab '<span class="tilx_points_block">' + (val[0] !== undefined ? val[0] : '?') + ' P<\\/span>'\par
\tab\tab\tab\tab\tab\tab\tab\tab );\par
\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\});\par
\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab uW.buildingMousePopup();\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\};\par
\tab\tab\}());\par
\tab\tab\par
\tab\tab return function () \{\par
\tab\tab\tab //value = newValueLib(SCRIPTNAME);\par
                //if (document.URL.indexOf('game/building_main') !== -1) \{\par
\tab\tab\tab\tab initStyle();\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab $('*').ajaxComplete(function () \{\par
\tab\tab\tab\tab\tab addPoints();\par
\tab\tab\tab\tab\});\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab getUpgradeBuildingHTMLPart_old = uW.getUpgradeBuildingHTMLPart;\par
\tab\tab\tab\tab uW.getUpgradeBuildingHTMLPart = getUpgradeBuildingHTMLPart_new;\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab addPoints();\tab\tab\tab\par
\tab\tab\tab //\}\par
\tab\tab\};\par
\tab\}());\par
grepoPoints();\par
\par
\par
\}());\par
}
