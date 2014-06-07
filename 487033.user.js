// ==UserScript==
// @name           Maulwurf Nerz Source
// @version        0.61
// ==/UserScript==

var HMoleLangArray = {};
var HMole = {
    Home: "http://grmh.pl/",
    sName: "Mole Hole",
    sVer: "0.6.1 (10.05.2014)",
    ScriptAtcive: true,
    RepClipboard: "",
    Drag: false,
    DragLY: 0,
    CLMAX: 200,
    ajax: false,
    LangLoaded: false,
    PlayerLoaded: false,
    Language: "en",
    LngUse: "en",
    LngAva: {
        pl: "PL",
        en: "EN",
        de: "DE",
        ro: "RO",
        fr: "FR",
        es: "ES",
        nl: "NL",
        pt: "PT",
        it: "IT",
        ru: "RU"
    },
    Lang: {},
    RepType: "",
    CurTown: "",
    gAPI: ["alliances", "players", "towns", "world"],
    CookieWall: "cMH_Wall",
    CookieNew: "cMH_New",
    SetCookie: "cMH_Set",
    Set: {
        alarm: true,
        alarmSel: 0,
        alarmLoop: true,
        balarm: true,
        balarmSel: 1,
        balarmLoop: true,
        exCmdList: true,
        fheight: true,
        ftabs: true,
        colRep: true,
        ownRep: true,
        stime: true,
        statsGRCL: "grmh",
        unitsCost: true,
        mapOcean: true,
        mapGrid: false,
        smallMenu: false,
        menu: true,
        turboMode: false,
        townPrvWindow: true
    },
    AlarmsURLs: ["http://grmh.pl/sound/alarm.mp3", "http://grmh.pl/sound/alarm1.mp3", "http://grmh.pl/sound/alarm2.mp3", "http://grmh.pl/sound/alarm3.mp3", "http://greenmp3.pl/dzwonki/19844.mp3", "http://greenmp3.pl/dzwonki/1144.mp3", "http://greenmp3.pl/dzwonki/28284.mp3", "http://greenmp3.pl/dzwonki/4663.mp3", "http://greenmp3.pl/dzwonki/526.mp3", "http://greenmp3.pl/dzwonki/8157.mp3", "http://greenmp3.pl/dzwonki/626.mp3", "http://greenmp3.pl/dzwonki/8348.mp3", "http://greenmp3.pl/dzwonki/628.mp3", "http://3gplay.pl/upload/dzwonki/mp3/dzwonki-mp3-1852e684df33739.mp3", "http://3gplay.pl/upload/dzwonki/mp3/dzwonki-mp3-3532eb82f1b608.mp3", "http://3gplay.pl/upload/dzwonki/mp3/dzwonki-mp3-18521bad6f06de8.mp3", "http://3gplay.pl/upload/dzwonki/mp3/dzwonki-mp3-5510b846905f76.mp3", "http://3gplay.pl/upload/dzwonki/mp3/dzwonki-mp3-2051ffcf79a67dc.mp3", "http://3gplay.pl/upload/dzwonki/mp3/dzwonki-mp3-1450e7367cf2a5a.mp3", "http://soundjax.com/reddo/67838%5Esmokealarm.mp3", "http://soundjax.com/reddo/53241%5Ealarm01.mp3", "http://soundjax.com/reddo/27574%5Ealarm03.mp3", "http://soundjax.com/reddo/85121%5Ealien_alarm_new.mp3", "http://soundjax.com/reddo/15494%5EALARME3.mp3", "http://soundjax.com/reddo/44424%5EALARME1.mp3", "http://soundjax.com/reddo/67838%5Esmokealarm.mp3", "http://soundjax.com/reddo/44216%5Ealarm.mp3", "http://soundjax.com/reddo/24308%5Eflgalarm.mp3", "http://soundjax.com/reddo/97744%5EALARM.mp3", "BRAK DZWIĘKU"],
    gRAPCookie: "cMH_gRAP",
    gRAP: {
        Style: 0,
        ShowDate: true,
        ShowTitle: false,
        HideAttUnits: false,
        HideDefUnits: false,
        HideUnits: false,
        HideSpyBulding: false,
        HideSpyCoins: false,
        HideSpyRes: false,
        HideDeffArmy: false,
        HideIncoArmy: false,
        HideSelTroop: false
    },
    GuiUstCookie: "cMH_GuiUst",
    GuiUst: {
        ShowOptions: true,
        HideCenter: false,
        HideLeft: false,
        HideRight: false
    },
    cma: 0,
    dodaj: "",
    bz: 160,
    tick: 0,
    AnimStep: 0,
    STime: 0,
    sShowLastWall: false,
    AlarmActive: false,
    bAlarmActive: false,
    bro: "oth",
    tmpTownList: {},
    attTownList: {},
    numAttacks: 0,
    MenuUpdated: false,
    TownOverwiew: false,
    unSize: "8",
    LineD: "[img]http://grmh.pl/gui/ldou.gif[/img]",
    LineS: "[img]http://grmh.pl/gui/lsin.gif[/img]",
    CountryNames: {
        de: "Deutschland",
        en: "United Kingdom",
        fr: "France",
        gr: "Ελλάδα",
        nl: "Nederland",
        es: "España",
        it: "Italia",
        ro: "România",
        se: "Sverige",
        cz: "Česko",
        pl: "Polska",
        pt: "Portugal",
        hu: "Magyarország",
        sk: "Slovensko",
        dk: "Danmark",
        ru: "Россия",
        no: "Noreg",
        br: "Brasil",
        th: "ประเทศไทย",
        tr: "Türkiye",
        us: "USA",
        ar: "Argentina",
        fi: "Suomi",
        zz: "Beta"
    },
    CouSep: {
        de: "von",
        en: "from",
        fr: "",
        gr: "",
        nl: "",
        es: "",
        it: "",
        ro: "",
        se: "",
        cz: "",
        pl: "należące do",
        pt: "",
        hu: "",
        sk: "",
        dk: "",
        ru: "",
        no: "",
        br: "",
        th: "",
        tr: "",
        us: "",
        ar: "",
        fi: "",
        zz: ""
    },
    ConstCommands: ["abort", "attack_incoming", "attack_land", "attack_pillage", "attack_sea", "attack_spy", "attack_takeover", "attack", "breakthrough", "colonization_failed", "colonization", "conqueror", "farm_attack", "illusion", "revolt_arising", "revolt_running", "revolt", "siege", "spying", "support", "trade", "underattack_land", "underattack_sea"],
    ConstPowers: ["acumen", "attack_boost", "attack_penalty", "bolt", "building_order_boost", "call_of_the_ocean", "cap_of_invisibility", "cleanse", "defense_boost", "defense_penalty", "desire", "divine_sign", "earthquake", "effort_of_the_huntress", "fair_wind", "favor_boost", "favor_penalty", "fertility_improvement", "forced_loyalty", "happiness", "happy_folks", "hermes_boost", "illusion", "iron_production_penalty", "kingly_gift", "loyalty_loss", "myrmidion_attack", "natures_gift", "olympic_experience", "olympic_sword", "olympic_torch", "olympic_village", "patroness", "pest", "population_boost", "pumpkin", "resource_boost", "resurrection", "sea_storm", "starter_protection", "stone_production_penalty", "strength_of_heroes", "town_protection", "transformation", "trojan_defense", "underworld_treasures", "unit_movement_boost", "unit_order_boost", "unit_training_boost", "wedding", "wisdom", "wood_production_penalty", "sword_generation", "slinger_generation", "archer_generation", "hoplite_generation", "rider_generation", "chariot_generation", "resource_wood", "resource_stone", "resource_iron", "longterm_attack_boost", "longterm_defense_boost", "centaur_generation", "harpy_generation", "fury_generation", "minotaur_generation", "longterm_festival_resource_boost", "longterm_wood_boost", "longterm_stone_boost", "longterm_iron_boost", "longterm_unit_order_boost"],
    ConstBuildings: {
        main: "A0",
        place: "AA",
        lumber: "A1",
        farm: "A2",
        stoner: "A3",
        storage: "A4",
        ironer: "B1",
        barracks: "B2",
        temple: "B3",
        market: "B4",
        docks: "C1",
        academy: "C2",
        wall: "C3",
        hide: "C4",
        theater: "D1",
        thermal: "D2",
        library: "D3",
        lighthouse: "D4",
        tower: "E1",
        statue: "E2",
        oracle: "E3",
        trade_office: "E4"
    },
    GetHomeUrlParm: function () {
        return "&land=" + Game.market_id + "&world=" + Game.world_id.substring(2, Game.world_id.length) + "&ally=" + Game.alliance_id + "&plid=" + Game.player_id
    },
    Cookie: function (e, t) {
        try {
            if (t == undefined) return $.parseJSON($.cookie(e));
            $.cookie(e, JSON.stringify(t), {
                expires: 365
            })
        } catch (n) {
            return null
        }
    },
    GetMoveCode: function (e) {
        switch (e) {
        case "abort":
            return "A";
        case "support":
            return "B";
        case "attack_incoming":
            return "C";
        case "attack":
            return "D";
        case "attack_land":
            return "D";
        case "attack_sea":
            return "E";
        case "farm_attack":
            return "F";
        case "attack_takeover":
            return "G"
        }
        return "X"
    },
    Link2Struct: function (l) {
        l = l.split(/#/);
        ret = {};
        eval("ret=" + atob(l[1] || l[0]));
        return ret
    },
    strip_tags: String.prototype.strip_tags = function () {
        tags = this;
        stripped = tags.replace(/<\/?[^>]+>/gi, "");
        return stripped
    },
    GetPalyerAllyName: function (e) {
        var t = HMole.GetPalyerIdByName(e);
        if (t == null) return "";
        if (t in HMole.gAPI.players)
            if (HMole.gAPI.players[t].allianceID in HMole.gAPI.alliances) return HMole.gAPI.alliances[HMole.gAPI.players[t].allianceID].name;
        return ""
    },
    GetPalyerIdByName: function (e) {
        for (var t in HMole.gAPI.players)
            if (HMole.gAPI.players[t]["name"] == e) return HMole.gAPI.players[t]["id"];
        return null
    },
    GetAllyIdByName: function (e) {
        for (var t in HMole.gAPI.alliances)
            if (HMole.gAPI.alliances[t]["name"] == e) return HMole.gAPI.alliances[t]["id"];
        return null
    },
    GetAllyId: function (e) {
        for (var t in HMole.gAPI.alliances)
            if (HMole.gAPI.alliances[t]["name"] == e) return HMole.gAPI.alliances[t]["id"];
        return null
    },
    GetAllyByName: function (e) {
        for (var t in HMole.gAPI.alliances)
            if (HMole.gAPI.alliances[t]["name"] == e) return HMole.gAPI.alliances[t];
        return null
    },
    GetPlayerByName: function (e) {
        for (var t in HMole.gAPI.players)
            if (HMole.gAPI.players[t]["name"] == e) return HMole.gAPI.players[t];
        return null
    },
    GetPlayerName: function (e) {
        if (e == Game.player_id) return Game.player_name;
        if (e in HMole.gAPI.players) return HMole.gAPI.players[e].name;
        return "?"
    },
    GetTownPlayerName: function (e) {
        var t = HMole.GetTownPlayerId(e);
        if (t != null) return HMole.GetPlayerName(t);
        return "opuszczone"
    },
    GetTownPlayerId: function (e) {
        if (e in HMole.gAPI.towns) return HMole.gAPI.towns[e].playerID;
        if (e in ITowns.towns) {
            HMole.gAPI["towns"][e] = new Array;
            HMole.gAPI["towns"][e]["id"] = e;
            HMole.gAPI["towns"][e]["name"] = ITowns.towns.name;
            HMole.gAPI["towns"][e]["playerID"] = Game.player_id;
            return Game.player_id
        }
        if (ITowns.getTown(Game.townId).hasConqueror()) return null;
        var t = $.ajax({
            url: "/game/town_info?action=info&town_id=" + Game.townId + "&h=" + Game.csrfToken + "&json=%7B%22id%22%3A" + e.toString() + "%2C%22town_id%22%3A" + Game.townId + "%2C%22nlreq_id%22%3A" + Game.notification_last_requested_id + "%7D",
            async: false
        });
        try {
            res = JSON.parse(t.responseText).plain.html
        } catch (n) {
            res = t.responseText
        }
        if ($(res).eq(2).find(".gp_player_link").length == 1) {
            t = HMole.Link2Struct($(res).eq(2).find(".gp_player_link").attr("href"));
            HMole.gAPI["towns"][e] = new Array;
            HMole.gAPI["towns"][e]["id"] = e;
            HMole.gAPI["towns"][e]["name"] = "?? dorób ??";
            HMole.gAPI["towns"][e]["playerID"] = t.id;
            return t.id
        }
        return null
    },
    SavP: function () {
        var e = document.getElementById("forum_post_textarea").value;
        e = e.replace(/\uFEFF\u2591/g, HMole.bz);
        e = e.replace(/\u00A8/g, HMole.bz);
        document.getElementById("forum_post_textarea").value = e;
        Forum.postSave()
    },
    Pop: function (e) {
        var t = $("#popup_div").attr("style");
        var n = $("#popup_div").html();
        e.mouseenter();
        var r = $("#popup_content").html();
        $("#popup_div").html(n);
        $("#popup_div").attr("style", t);
        return r
    },
    ReportsView: function (e) {
        if (!HMole.Set.colRep) return;
        $.each($(e + " center img"), function (e, t) {
            t = $(this).parent().next().find(":first");
            if (t == undefined) return;
            t.css("background", "transparent");
            t.css("background-image", "url(" + HMole.Home + "r/body.gif)");
            t.css("background-repeat", "repeat-y");
            t.parent().css("border", "0");
            t.find("table").css("border", "0")
        })
    },
    outit: function () {
        HMole.ScriptAtcive = false;
        HMole.Cookie("cGMH_ScriptAtcive", false);
        if (typeof HMoleAboutWnd != "undefined") {
            try {
                HMoleAboutWnd.close()
            } catch (e) {}
            HMoleAboutWnd = undefined
        }
        $("#toolbar_activity_commands_list a").remove();
        $(".GMHADD").remove();
        HMole.AnimStep = 0;
        setTimeout("HMoleAnimDezadeactivation()", 100)
    },
    init: function () {
        var e, t, n;
        if (HMole.LangLoaded) return;
        HMole.Language = Game.locale_lang.substring(0, 2);
        HMole.LngUse = HMole.Language;
        if (HMole.LngAva[HMole.LngUse] == undefined) {
            HMole.LngUse = "en"
        }
        HMole.Lang = HMoleLangArrayENG;
        var r = HMole.Home + "scripts/lang/MoleHole_" + HMole.LngUse.toUpperCase() + ".js";
        HMole.LngUse = "en";
        $.ajax({
            type: "GET",
            url: r,
            dataType: "script",
            timeout: 10 * 1e3,
            complete: function () {
                var e;
                HMole.LangLoaded = true;
                if (typeof HMoleLangAdd == "undefined") return;
                if (HMoleLangAdd == undefined) return;
                for (e in HMoleLangAdd) HMole.Lang[e] = HMoleLangAdd[e];
                $("#HMoleLoading").attr("src", HMole.Home + "gui/load3.gif");
                $("#HMOptions").html("<br><br><br><center>-- " + HMole.Lang.opcje + "</center><br>", 14);
                if (!HMole.Set.menu) $("#HMConvLink").html(" " + HMole.Lang.norka + HMole.sVer.substring(0, 5))
            },
            error: function () {
                HMole.LangLoaded = true
            }
        });
        Game.alliance_name = "";
        HMole.gAPI["world"] = new Array;
        HMole.gAPI["world"].id = Game.world_id;
        HMole.gAPI["world"].nr = Game.world_id.substring(2, Game.world_id.length);
        HMole.gAPI["world"].Name = "???";
        HMole.gAPI["world"].Name = "???";
        HMole.gAPI["towns"] = new Array
    },
    LoadPlayers: function () {
        var t, n, r;
        if (HMole.PlayerLoaded) return;
        HMole.PlayerLoaded = true;
        $.ajax({
            type: "GET",
            url: "http://" + Game.world_id + ".grepolis.com/data/alliances.txt",
            dataType: "text",
            success: function (t) {
                t = t.replace(/\+/g, " ") + "\n";
                r = t.split("\n");
                HMole.gAPI["alliances"] = new Array;
                for (e in r)
                    if (e != "") {
                        r[e] += ",";
                        n = r[e].split(",");
                        HMole.gAPI["alliances"][n[0]] = new Array;
                        HMole.gAPI["alliances"][n[0]]["id"] = n[0];
                        HMole.gAPI["alliances"][n[0]]["name"] = decodeURIComponent(n[1]);
                        HMole.gAPI["alliances"][n[0]]["points"] = n[2];
                        HMole.gAPI["alliances"][n[0]]["towns"] = n[3];
                        HMole.gAPI["alliances"][n[0]]["members"] = n[4];
                        HMole.gAPI["alliances"][n[0]]["rank"] = n[5]
                    }
                if (HMole.gAPI.alliances[Game.alliance_id] != undefined) Game.alliance_name = HMole.gAPI.alliances[Game.alliance_id].name
            }
        });
        $.ajax({
            type: "GET",
            url: "http://" + Game.world_id + ".grepolis.com/data/players.txt",
            dataType: "text",
            success: function (t) {
                t = t.replace(/\+/g, " ") + "\n";
                r = t.split("\n");
                HMole.gAPI["players"] = new Array;
                for (e in r)
                    if (e != "") {
                        r[e] += ",";
                        n = r[e].split(",");
                        HMole.gAPI["players"][n[0]] = new Array;
                        HMole.gAPI["players"][n[0]]["id"] = n[0];
                        HMole.gAPI["players"][n[0]]["name"] = decodeURIComponent(n[1]);
                        HMole.gAPI["players"][n[0]]["allianceID"] = n[2];
                        HMole.gAPI["players"][n[0]]["points"] = n[3];
                        HMole.gAPI["players"][n[0]]["rank"] = n[4];
                        HMole.gAPI["players"][n[0]]["towns"] = n[5]
                    }
            }
        })
    },
    secsToHHMMSS: function (e) {
        var t = Math.floor(e / 3600);
        var n = Math.floor((e - t * 3600) / 60);
        var r = e - t * 3600 - n * 60;
        if (t < 10) {
            t = "0" + t
        }
        if (n < 10) {
            n = "0" + n
        }
        if (r < 10) {
            r = "0" + r
        }
        return t + ":" + n + ":" + r
    },
    SelTroop: function (e, t) {
        var n = $(e).attr("ref");
        var r = $(e).attr("tim");
        if (t == "C") {
            if (!(n in HMole.attTownList)) return;
            delete HMole.attTownList[n];
            $("#GMHseltroop").parent().find(":first").css("background-image", "url(" + HMole.Home + "m/C.png)");
            $("#GMHseltroop").parent().find(":first").css("backgroundPosition", "0 0")
        } else {
            HMole.attTownList[n] = {};
            HMole.attTownList[n].at = t;
            HMole.attTownList[n].ti = r
        }
        $("#GMHseltroop").remove();
        HMole.SavTroop()
    },
    SavTroop: function () {
        var e, t = Timestamp.server();
        for (e in HMole.attTownList)
            if (HMole.attTownList[e].ti <= t) delete HMole.attTownList[e];
        HMole.Cookie("cGMH_attTownList", HMole.attTownList)
    },
    getUnit: function (e, t, n) {
        var r = -1;
        for (var i = 0; i < $(t).length; i++) {
            if (i % n == 0) {
                if (r > -1) {}
                r++;
                e.Count = r
            }
            if (e[r].unit_list.length > 0) {
                e[r].unit_list += "¨"
            }
            var s = HMole.getUnitName($(t)[i]);
            e[r].unit_list += HMole.GetUnit(s);
            e[r].unit_send += HMole.bbcU($(t + " span.place_unit_black")[i].innerHTML, "000") + "¨"
        }
        return e
    },
    UnitResource: function (e) {
        var t = {};
        t.unit_send = "";
        t.unit_lost = "";
        t.unit_list = "";
        t.w = 0;
        t.s = 0;
        t.i = 0;
        t.p = 0;
        t.f = 0;
        for (var n = 0; n < $(e + " div.report_unit").length; n++) {
            if (t.unit_list.length > 0) t.unit_list += "¨";
            var r = HMole.getUnitName($(e + " div.report_unit")[n]);
            var i = HMole.UnitCost(r);
            var s = $(e + " span.report_losts")[n].innerHTML.replace("-", "");
            if (s == "?") s = 0;
            else {
                t.w += i.w * parseInt(s);
                t.s += i.s * parseInt(s);
                t.i += i.i * parseInt(s);
                t.p += i.p * parseInt(s);
                t.f += i.f * parseInt(s)
            }
        }
        return t
    },
    typUnits: {
        1: ["defAtt", "losAtt"],
        2: ["defDef", "losDef"]
    },
    WallReset: function () {
        try {
            var e = {
                defAtt: {},
                losAtt: {},
                defDef: {},
                losDef: {}
            };
            $.each($("div#building_wall li.odd"), function (t, n) {
                if (t > 0) {
                    $.each(n.getElementsByClassName("list_item_left"), function (n, r) {
                        $.each(r.getElementsByClassName("wall_report_unit"), function (r, i) {
                            unitName = HMole.getUnitName(i);
                            unitKill = i.getElementsByClassName("place_unit_black")[0].innerHTML;
                            e[HMole.typUnits[t][n]][unitName] = unitKill
                        })
                    });
                    $.each(n.getElementsByClassName("list_item_right"), function (n, r) {
                        $.each(r.getElementsByClassName("wall_report_unit"), function (r, i) {
                            unitName = HMole.getUnitName(i);
                            unitKill = i.getElementsByClassName("place_unit_black")[0].innerHTML;
                            e[HMole.typUnits[t][n + 1]][unitName] = unitKill
                        })
                    })
                }
            });
            HMole.Cookie(HMole.CookieWall, e);
            HumanMessage.success(HMole.Lang.MSGHUMAN.OK)
        } catch (t) {
            HumanMessage.error(HMole.Lang.MSGHUMAN.ERROR)
        }
    },
    WallReplace: function () {
        var e, t;
        e = HMole.Cookie(HMole.CookieWall);
        if (e != null) {
            $("div#building_wall.game_inner_box div.wall_report_unit").append($("<span/>", {
                "class": "place_unit_black bold HMoleDiff"
            }).html(" ")).append($("<span/>", {
                "class": "place_unit_white bold HMoleDiff"
            }).html(" "));
            $.each($("div#building_wall li.odd"), function (n, r) {
                if (n > 0) {
                    $.each(r.getElementsByClassName("list_item_left"), function (r, i) {
                        $.each(i.getElementsByClassName("wall_report_unit"), function (i, s) {
                            s.getElementsByClassName("place_unit_black")[0].style.display = "none";
                            s.getElementsByClassName("place_unit_white")[0].style.display = "none";
                            unitName = HMole.getUnitName(s);
                            unitKill = s.getElementsByClassName("place_unit_black")[0].innerHTML;
                            unitSave = e[HMole.typUnits[n][r]][unitName];
                            unitDiff = unitKill;
                            if (unitSave != undefined) unitDiff = unitKill - unitSave;
                            t = unitDiff != 0 ? unitDiff : "0";
                            s.getElementsByClassName("place_unit_black bold HMoleDiff")[0].innerHTML = t;
                            if (t != "0") s.getElementsByClassName("place_unit_white bold HMoleDiff")[0].innerHTML = t
                        })
                    });
                    $.each(r.getElementsByClassName("list_item_right"), function (r, i) {
                        $.each(i.getElementsByClassName("wall_report_unit"), function (i, s) {
                            s.getElementsByClassName("place_unit_black")[0].style.display = "none";
                            s.getElementsByClassName("place_unit_white")[0].style.display = "none";
                            unitName = HMole.getUnitName(s);
                            unitKill = s.getElementsByClassName("place_unit_black")[0].innerHTML;
                            unitSave = e[HMole.typUnits[n][r + 1]][unitName];
                            unitDiff = unitKill;
                            if (unitSave != undefined) unitDiff = unitKill - unitSave;
                            t = unitDiff != 0 ? unitDiff : "0";
                            s.getElementsByClassName("place_unit_black bold HMoleDiff")[0].innerHTML = t;
                            if (t != "0") s.getElementsByClassName("place_unit_white bold HMoleDiff")[0].innerHTML = t
                        })
                    })
                }
            })
        }
    },
    bbc: function (e, t) {
        if (e != undefined)
            if (e.length > 0) return "[" + t + "]" + e + "[/" + t + "]";
        return e
    },
    bbcS: function (e, t) {
        if (e.length > 0 && $("#BBCODEA").attr("checked")) return "[size=" + t + "]" + e + "[/size]";
        return e
    },
    bbcWHT: function (e, t) {
        return "¨¨¨¨¨¨¨¨¨¨".slice(1, t - e.length)
    },
    bbcC: function (e, t) {
        return "[color=#" + t + "]" + e + "[/color]"
    },
    bbcU: function (e, t) {
        return HMole.bbcWHT(e, 7) + e
    },
    bbcVAL: function (e, t) {
        return HMole.bbcWHT(String(e), t) + String(e)
    },
    getUnitName: function (e) {
        if ($(e).attr("style") != null && $(e).attr("style").replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, "$1") != $(e).attr("style")) {
            return $(e).attr("style").replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, "$1")
        } else {
            for (var t in GameData.units) {
                if ($(e).hasClass(t)) {
                    return t.toString()
                }
            }
            for (var t in GameData.heroes) {
                if ($(e).hasClass(t)) {
                    return t.toString()
                }
            }
            return "unknown"
        }
    },
    getCommandIcon: function (e) {
        for (var t in HMole.ConstCommands) {
            if ($(e).hasClass(HMole.ConstCommands[t])) return "[img]" + HMole.Home + "m/" + HMole.GetMoveCode(HMole.ConstCommands[t]) + ".png[/img]"
        }
        return ""
    },
    getPowerIcon: function (e) {
        if ($(e).attr("data-power-id") != undefined) {
            return HMole.bbc(HMole.Home + "pow/" + $(e).attr("data-power-id") + ".png", "img")
        }
        for (var t in HMole.ConstPowers) {
            if ($(e).hasClass(HMole.ConstPowers[t])) {
                return HMole.bbc(HMole.Home + "pow/" + HMole.ConstPowers[t] + ".png", "img")
            }
        }
        return ""
    },
    GetUnit: function (e) {
        var t = {
            sword: "A1",
            slinger: "B1",
            archer: "C1",
            hoplite: "D1",
            rider: "E1",
            chariot: "F1",
            catapult: "G1",
            big_transporter: "A2",
            bireme: "B2",
            attack_ship: "C2",
            demolition_ship: "D2",
            small_transporter: "E2",
            trireme: "F2",
            colonize_ship: "G2",
            zyklop: "A3",
            sea_monster: "B3",
            harpy: "C3",
            medusa: "D3",
            minotaur: "E3",
            manticore: "F3",
            centaur: "G3",
            pegasus: "H3",
            cerberus: "I3",
            fury: "J3",
            calydonian_boar: "K3",
            griffin: "L3",
            godsent: "M3",
            militia: "A4",
            atalanta: "A5",
            cheiron: "B5",
            ferkyon: "C5",
            helen: "D5",
            hercules: "E5",
            leonidas: "F5",
            orpheus: "G5",
            terylea: "H5",
            urephon: "I5",
            zuretha: "J5",
            andromeda: "K5",
            unkown: "XX",
            unknown: "XX"
        };
        return t[e] || "XX"
    },
    UnitCost: function (e) {
        try {
            return {
                w: GameData.units[e]["resources"]["wood"],
                s: GameData.units[e]["resources"]["stone"],
                i: GameData.units[e]["resources"]["iron"],
                p: GameData.units[e]["population"],
                f: GameData.units[e]["favor"]
            }
        } catch (t) {
            return {
                w: 0,
                s: 0,
                i: 0,
                p: 0,
                f: 0
            }
        }
    },
    GetBuild: function (e) {
        return HMole.ConstBuildings[e] || "XX"
    },
    BuildIdByCode: function (e) {
        var t;
        switch (e) {
        case "D1":
        case "D2":
        case "D3":
        case "D4":
            return "spc1";
        case "E1":
        case "E2":
        case "E3":
        case "E4":
            return "spc2"
        }
        for (t in HMole.ConstBuildings)
            if (e == HMole.ConstBuildings[t]) return t;
        return undefined
    },
    NewBuildUpdate: function (e) {
        var t, n;
        for (t in e)
            if (e[t].mid in HMole.ConstBuildings) {
                n = GameData.buildings[e[t].mid];
                e[t].nam = n ? n.name : this.l10n.construction_overlay.special_building
            }
    },
    NewBuildData: function () {
        function t(e) {
            return {
                id: e,
                mid: e,
                code: HMole.ConstBuildings[e] || "XX",
                lvl: 0,
                nam: ""
            }
        }
        var e = Array();
        e["lumber"] = t("lumber");
        e["ironer"] = t("ironer");
        e["docks"] = t("docks");
        e["farm"] = t("farm");
        e["barracks"] = t("barracks");
        e["academy"] = t("academy");
        e["stoner"] = t("stoner");
        e["temple"] = t("temple");
        e["wall"] = t("wall");
        e["storage"] = t("storage");
        e["market"] = t("market");
        e["hide"] = t("hide");
        e["main"] = t("main");
        e["place"] = t("place");
        e["spc1"] = t("spc1");
        e["spc2"] = t("spc2");
        e["place"].lvl = 1;
        return e
    },
    AddCnvBtn: function (e, t) {
        var n = GuiEx.But(2, "float:right;");
        $(n).attr("id", e + t);
        $(n).attr("class", "button");
        $(n).attr("rel", "#" + t);
        $(n).mousePopup(new MousePopup(HMole.Lang.repRec));
        return n
    },
    AddCnvBtnS: function (e, t) {
        var n = GuiEx.But(3, "float:right;");
        $(n).attr("id", e + t);
        $(n).attr("class", "button");
        $(n).attr("rel", "#" + t);
        $(n).mousePopup(new MousePopup(HMole.Lang.repCfg));
        return n
    },
    AddBtn: function (e, t) {
        WndName = t || "";
        return $("<a/>", {
            id: e + t,
            "class": "button",
            href: "#",
            style: "float: right; ",
            rel: "#" + t
        }).append(jQuery("<span/>", {
            "class": "left"
        }).append(jQuery("<span/>", {
            "class": "right"
        }).append(jQuery("<span/>", {
            "class": "middle"
        }).text(HMole.Lang[e] || e))).append(jQuery("<span/>", {
            style: "clear: both; "
        })))
    },
    wndsAdd: function (that) {
        if (!HMole.ScriptAtcive) return;
        var wGP = that;
        var HMoleForm = false;
        if (typeof wGP != "undefined") {
            var jGP = wGP.getJQElement();
            switch (wGP.type) {
            case Layout.wnd.TYPE_CUSTOM:
                break;
            case Layout.wnd.TYPE_TOWNINDEX:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_FARM_TOWN:
                break;
            case Layout.wnd.TYPE_WONDERS:
                break;
            case Layout.wnd.TYPE_TOWN:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_ISLAND:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_ALLIANCE:
                break;
            case Layout.wnd.TYPE_ALLIANCE_FORUM:
                HMole.ReportsView("#postlist li .content");
                if (HMole.Set.fheight == true) {
                    wGP.setHeight($(window).height() - 100);
                    $("#forum").height($(window).height() - 200);
                    wGP.setPosition("center", "center")
                }
                HMole.EmotsAdd(wGP, ".bb_button_wrapper", "#forum_post_textarea");
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_ALLIANCE_PROFILE:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_QUEST:
                break;
            case Layout.wnd.TYPE_BUILDING:
                if ($("#temple_favor_bar").css("display") == "none") $("#temple_gods").css({
                    top: "323px"
                });
                $.each($('a[id^="temple_"]'), function (e, t) {
                    var n = MM.checkAndPublishRawModel("PlayerGods", {
                        id: Game.player_id
                    }).getCurrentProductionOverview()[$(this).attr("rel")];
                    $(this).append($("<div/>", {
                        style: "margin-top:60px; color:#000080; text-shadow: 1px 1px 1px white; font-size:11px;",
                        name: "GMHTcnt"
                    }).html("<center>" + n.production + " /h</center>"))
                });
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_MARKET:
                break;
            case Layout.wnd.TYPE_PHOENICIANSALESMAN:
                break;
            case Layout.wnd.TYPE_RANKING:
                break;
            case Layout.wnd.TYPE_TOWN_OVERVIEWS:
                if (HMole.dodaj == "pod") {
                    HMole.dodaj = ""
                }
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_ATTACK_PLANER:
                break;
            case Layout.wnd.TYPE_MESSAGE:
                wGP.setWidth(780);
                HMole.ReportsView(".message_post_content");
                var area = "";
                var but = null;
                if (jGP.find("#message_new_message").length > 0) {
                    area = "#message_new_message";
                    but = jGP.find(".game_footer a:first")
                } else if (jGP.find("#message_reply_message").length > 0) {
                    area = "#message_reply_message";
                    but = $(area).next()
                } else if (jGP.find("#message_message").length > 0) area = "#message_message";
                if (jGP.find("#forum_post_textarea").length > 0) area = "#forum_post_textarea";
                if (area != "") HMole.EmotsAdd(wGP, ".bb_button_wrapper", area);
                if (but != null)
                    if (HMole.bro == "ffx") {
                        but = null
                    }
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_REPORT:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_DIALOG:
                break;
            case Layout.wnd.TYPE_UNINHABITED_PLACE:
                break;
            case Layout.wnd.TYPE_MEMO:
                break;
            case Layout.wnd.TYPE_PREMIUM:
                break;
            case Layout.wnd.TYPE_PLAYER_PROFILE_EDIT:
                break;
            case Layout.wnd.TYPE_PLAYER_PROFILE:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_PLAYER_SETTINGS:
                if (jGP.find("#HMoleSetupLink").length == 0) {
                    jGP.find(".settings-menu ul").eq(2).append($("<li>").append($("<img/>", {
                        src: HMole.Home + "imgs/icon.ico"
                    })).append($("<a/>", {
                        id: "HMoleSetupLink",
                        href: "#"
                    }).html(" " + HMole.Lang.norka).click(function () {
                        MyHole.Help("HELPTAB4")
                    })))
                }
                break;
            case Layout.wnd.TYPE_PUBLISH_REPORT:
                break;
            case Layout.wnd.TYPE_COLOR_TABLE:
                break;
            case Layout.wnd.TYPE_CONQUEST:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_ATK_COMMAND:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_CONQUEROR:
                HMoleForm = true;
                break;
            case Layout.wnd.TYPE_CHAT:
                break;
            case Layout.wnd.TYPE_DIRECTION_XSELLING:
                break;
            case Layout.wnd.TYPE_FARM_TOWN_OVERVIEWS:
                jGP.find($("#fto_town_list li")).attr("style", "border-right:0px");
                jGP.find($("#fto_town_list li.town" + Game.townId)).attr("style", "border-right: 5px solid green");
                if (jGP.find($("#fto_town_list li.town" + Game.townId + ".active")).length == 0 && HMole.CurTown != Game.townId) {
                    HMole.CurTown = Game.townId;
                    jGP.find($("#fto_town_list li.town" + Game.townId)).click()
                }
                break;
            case Layout.wnd.TYPE_ACK_CHOOSE_TOWN:
                break
            }
            if (HMoleForm) {
                var WndName = wGP.getName();
                var WndId = "#" + WndName;
                if (wGP.type == Layout.wnd.TYPE_ALLIANCE_FORUM && HMole.Set.ftabs) {
                    var Q_DivWrapper = jGP.parent().find($("div.menu_wrapper.minimize.menu_wrapper_scroll"));
                    var Q_DivWrapperUl = jGP.parent().find($("div.menu_wrapper.minimize.menu_wrapper_scroll>ul"));
                    if (Q_DivWrapper.width() != Q_DivWrapperUl.width()) {
                        var Q_next = $(Q_DivWrapper).parent().find($("a.next")).width();
                        var Q_prev = $(Q_DivWrapper).parent().find($("a.prev")).width();
                        Q_DivWrapper.width(Q_DivWrapper.width() + Q_next + Q_prev);
                        Q_DivWrapperUl.width(Q_DivWrapper.width());
                        Q_DivWrapperUl.css("right", 0);
                        $(Q_DivWrapper).find($("div.fade_left")).remove();
                        $(Q_DivWrapper).find($("div.fade_right")).remove();
                        $(Q_DivWrapper).parent().find($("a.next")).remove();
                        $(Q_DivWrapper).parent().find($("a.prev")).remove();
                        var Q_Mnoznik = $($("ul.menu_inner li")[$("ul.menu_inner li").length - 1]).position().top / 22 + 1;
                        jGP.height(jGP.height() + Q_DivWrapper.height() * (Q_Mnoznik - 1));
                        jGP.find($("div.gpwindow_content")).css("top", Q_DivWrapper.height() * (Q_Mnoznik + 1));
                        Q_DivWrapper.height(Q_DivWrapper.height() * Q_Mnoznik);
                        jGP.find($("div.gpwindow_top")).attr("id", "gptop1");
                        jGP.parent().find($("div#gptop1")).css({
                            "z-index": "6",
                            height: "30px"
                        });
                        for (var Q_top = 1; Q_top < Q_Mnoznik; Q_top++) {
                            $("<div/>", {
                                "class": "gpwindow_top",
                                id: "gptop" + (Q_top + 1),
                                style: "top:" + 22 * Q_top + "px;"
                            }).append($("<div/>", {
                                "class": "gpwindow_left corner"
                            })).append($("<div/>", {
                                "class": "gpwindow_right corner"
                            })).insertBefore(jGP.find($("div.gpwindow_content")))
                        }
                        var Q_zindex = $("#gptop" + Q_Mnoznik).css("z-index");
                        for (var Q_top = Q_Mnoznik - 1; Q_top > 0; Q_top--) {
                            $("#gptop" + Q_top).css("z-index", ++Q_zindex).css("height", "30px");
                            $("#gptop" + Q_top + " .corner").css("height", "30px")
                        }
                        jGP.parent().find($("ul.menu_inner>li")).css("float", "left");
                        $.each(jGP.parent().find($("ul.menu_inner>li")), function (e, t) {
                            if (e == 0) {
                                jGP.parent().find($("ul.menu_inner>li")).eq(0).insertAfter(jGP.parent().find($("ul.menu_inner>li")).eq(jGP.parent().find($("ul.menu_inner>li")).length - 1))
                            } else {
                                jGP.parent().find($("ul.menu_inner>li")).eq(0).insertBefore(jGP.parent().find($("ul.menu_inner>li")).eq(jGP.parent().find($("ul.menu_inner>li")).length - e))
                            }
                        })
                    }
                }
                if (wGP.type == Layout.wnd.TYPE_ALLIANCE_FORUM)
                    if (HMole.bro == "ffx")
                        if (jGP.find($("#forum_post_textarea")).length != 0) jGP.find($("#forum_buttons a.button:first")).attr("onClick", "HMole.SavP(true)");
                if (wGP.type == Layout.wnd.TYPE_ISLAND) {
                    if (jGP.find($("#island_towns_controls a")).length == 0) {
                        $("<a/>", {
                            href: "#",
                            "class": "write_message"
                        }).click(function () {
                            var e, t, n = "";
                            $.each(jGP.find($("#island_info_towns_left_sorted_by_name li span.player_name")), function (e, t) {
                                if ($(this).text() != Game.player_name && $(this).text() != "Opuszczone miasto" && $(this).text() != "Brak miast na tej wyspie." && n.indexOf($(this).text()) < 0) {
                                    n += $(this).text();
                                    n += "; "
                                }
                            });
                            Layout.newMessage.open({
                                recipients: n
                            })
                        }).appendTo(WndId + " #island_towns_controls")
                    }
                }
                if (wGP.type == Layout.wnd.TYPE_PLAYER_PROFILE) {
                    if (jGP.find($("#butCNV" + WndName)).length == 0) {
                        HMole.AddCnvBtn("butCNV", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "player_profile";
                            HMoleData(wGP, true);
                            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                        }).appendTo(WndId + " #player_towns div.game_border div.game_list_footer");
                        HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "player_profile";
                            HMoleData(wGP, false)
                        }).appendTo(WndId + " #player_towns div.game_border div.game_list_footer");
                        HMole._player = null;
                        HMole._player_name = $(jGP.find($("#player_info h3:first"))).html();
                        jGP.find($("#player_buttons")).append($("<a/>", {
                            href: "#",
                            style: "width:31px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -423px 0px rgba(0, 0, 0, 0) "
                        }).mousePopup(new MousePopup(HMole.Lang.STATS)).click(function () {
                            MyHole.statsWnd(false)
                        }))
                    }
                }
                if (wGP.type == Layout.wnd.TYPE_ALLIANCE_PROFILE) {
                    if (jGP.find($("#butCNV" + WndName)).length == 0) {
                        HMole.AddCnvBtn("butCNV", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "ally_profile";
                            HMoleData(wGP, true);
                            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                        }).appendTo(WndId + " #ally_towns div.game_border div.game_list_footer");
                        HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "ally_profile";
                            HMoleData(wGP, false)
                        }).appendTo(WndId + " #ally_towns div.game_border div.game_list_footer");
                        HMole._ally = null;
                        HMole._ally_name = $(jGP.find($("#player_info h3:first"))).html();
                        jGP.find($("#player_buttons")).append($("<a/>", {
                            href: "#",
                            style: "width:31px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -423px 0px rgba(0, 0, 0, 0) "
                        }).mousePopup(new MousePopup(HMole.Lang.STATSA)).click(function () {
                            MyHole.statsWnd(true)
                        }));
                        $("<a/>", {
                            href: "#",
                            "class": "write_message"
                        }).click(function () {
                            var e, t, n = "";
                            $.each(jGP.find($("#ally_towns ul.members_list>li:nth-child(2) ul li")), function (t, r) {
                                e = $(r).find("a.gp_player_link").html();
                                if (e.length >= 14)
                                    if (e[13] == "." && e[12] == "." && e[11] == ".") {
                                        e = ""
                                    }
                                if (e.length > 3 && e != Game.player_name) {
                                    n += e;
                                    n += "; "
                                }
                            });
                            Layout.newMessage.open({
                                recipients: n
                            })
                        }).insertBefore(WndId + " #ally_towns div.game_border_top")
                    }
                }
                if (wGP.type == Layout.wnd.TYPE_CONQUEST) {
                    if ($(WndId + " #butCNV" + WndName).length == 0) {
                        HMole.AddCnvBtn("butCNV", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "conquest";
                            HMoleData(wGP, true);
                            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                        }).appendTo($(WndId + " a.gp_town_link"));
                        HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "conquest";
                            HMoleData(wGP, false)
                        }).appendTo($(WndId + " a.gp_town_link"))
                    }
                }
                if (wGP.type == Layout.wnd.TYPE_TOWN) {
                    jGP.find($("a.color_table.assign_color")).parent().width(101);
                    if (jGP.find($(WndId + "HMoleStatsPlayer")).length == 0 && $(jGP.find($("a.gp_player_link"))[0]).attr("href") != undefined) {
                        var __tmp = $(jGP.find($("a.gp_player_link"))[0]).attr("href").split(/#/);
                        HMole._player = eval("tmpArray=" + atob(__tmp[1] || __tmp[0])).id;
                        HMole._player_name = encodeURIComponent($(jGP.find($("a.gp_player_link"))[0]).html());
                        $("<a/>", {
                            id: WndName + "HMoleStatsPlayer",
                            href: "#",
                            style: "width:31px; height:23px; float:right; background:url('" + HMole.Home + "gui/but.png') repeat scroll -423px 0px rgba(0, 0, 0, 0) "
                        }).mousePopup(new MousePopup(HMole.Lang.STATS)).click(function () {
                            MyHole.statsWnd(false)
                        }).insertAfter(jGP.find($("a.color_table.assign_color")));
                        if (jGP.find($("a.color_table.assign_ally_color")).length > 0) {
                            jGP.find($("a.color_table.assign_ally_color")).parent().width(101);
                            var __tmp = jGP.find($("a.color_table.assign_ally_color")).parent().parent().find("a:first").attr("onclick");
                            HMole._ally = __tmp.replace(/(.*?)\('(.*?)',(.*?)\)(.*?)/, "$3");
                            HMole._ally_name = __tmp.replace(/(.*?)\('(.*?)',(.*?)\)(.*?)/, "$2");
                            $("<a/>", {
                                href: "#",
                                style: "width:31px; height:23px; float:right; background:url('" + HMole.Home + "gui/but.png') repeat scroll -423px 0px rgba(0, 0, 0, 0) "
                            }).mousePopup(new MousePopup(HMole.Lang.STATSA)).click(function () {
                                MyHole.statsWnd(true)
                            }).insertAfter(jGP.find($("a.color_table.assign_ally_color")))
                        }
                        jGP.find($("a.town_bbcode_link")).parent().append($("<a/>", {
                            href: "#",
                            style: "margin:0 1px 0 0; width:22px; height:23px; float:right; background:url('" + HMole.Home + "gui/but.png') repeat scroll -132px 0px rgba(0, 0, 0, 0) "
                        }).mouseout(function () {
                            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -132px 0px rgba(0, 0, 0, 0)"
                        }).click(function () {
                            var e = $(jGP.find($("input#town_bbcode_id"))[0]).attr("value").replace(/\[town\](.*?)\[\/town\]/, "$1");
                            if (HMole.tmpTownList[e] != undefined) return;
                            var t = HMole.Link2Struct($(jGP.find($("a.gp_island_link"))[0]).attr("href"));
                            var n = $(jGP.find($("div.game_header.bold"))[0]).html().strip_tags().replace(/\s+/g, " ");
                            HMole.tmpTownList[e] = {};
                            HMole.tmpTownList[e].href = "#" + btoa('{"id":' + e + ',"ix":' + t.ix + ',"iy":' + t.iy + ',"tp":"town","name":"' + unescape(encodeURIComponent(n)) + '"}');
                            HMole.tmpTownList[e].name = n;
                            $("#HMTowns").html("");
                            $("#HMTowns").append("brudnopis<br>");
                            for (e in HMole.tmpTownList) {
                                $("#HMTowns").append($("<span/>", {
                                    "class": "bbcodes bbcodes_town"
                                }).append($("<a/>", {
                                    "class": "gp_town_link",
                                    href: HMole.tmpTownList[e].href,
                                    style: "font-weight:normal; font-size:10px;"
                                }).html(HMole.tmpTownList[e].name + "<br>")))
                            }
                            $(".nui_main_menu").css("top", 255 + $(".nui_main_menu").height() + "px");
                            $(".nui_main_menu.HMole").css("top", "255px");
                            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                        }))
                    }
                }
                $(WndId + " #report_report div.game_list_footer").ready(function () {
                    if ($(WndId + " #report_arrow").length > 0) {
                        if (jGP.find($("#RepConvRes")).length > 0) jGP.find($("#RepConvRes")).remove();
                        if ($(WndId + " #report_report #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = jGP.find($("div#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\.png.*/, "$1");
                                if (HMole.RepType == "attack" && jGP.find($("div.support_report_summary")).length != 0) HMole.RepType = "attack_support";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).appendTo(WndId + " #report_report div.game_list_footer");
                            HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = jGP.find($("div#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\.png.*/, "$1");
                                if (HMole.RepType == "attack" && jGP.find($("div.support_report_summary")).length != 0) HMole.RepType = "attack_support";
                                HMoleData(wGP, false)
                            }).appendTo(WndId + " #report_report div.game_list_footer");
                            if (HMole.Set.unitsCost) {
                                var e = jGP.find($("div#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\.png.*/, "$1");
                                if (jGP.find($("div.support_report_cities")).length > 0) e = "attack_support";
                                switch (e) {
                                case "attack_support":
                                    wGP.setHeight(540);
                                case "attack":
                                case "take_over":
                                case "breach":
                                    if (jGP.find($("div.report_booty_bonus_fight")).length > 0) {
                                        var t = {};
                                        t.att = {};
                                        t.def = {};
                                        t.att = HMole.UnitResource(WndId + " div.report_side_attacker_unit");
                                        if (e != "attack_support") t.def = HMole.UnitResource(WndId + " div.report_side_defender_unit");
                                        else t.def = HMole.UnitResource(WndId + " div.support_report_summary .report_side_defender_unit");
                                        $(jGP.find($("div.report_booty_bonus_fight"))[0]).append($("<br/>")).append($("<table/>", {
                                            style: "width:100%;font-size:12px"
                                        }).append($("<tr/>", {
                                            style: "height:16px; padding:0px;"
                                        }).append('<td align="right" width="45%">' + t.att.w + "</td>").append('<td><img src="' + HMole.Home + 'r/rwood.png"/></td>').append('<td align="left" width="45%">' + t.def.w + "</td>")).append($("<tr/>", {
                                            style: "height:16px;padding:0px;"
                                        }).append('<td align="right">' + t.att.s + "</td>").append('<td><img src="' + HMole.Home + 'r/riron.png"/></td>').append('<td align="left">' + t.def.s + "</td>")).append($("<tr/>", {
                                            style: "height:16px;padding:0px;"
                                        }).append('<td align="right">' + t.att.i + "</td>").append('<td><img src="' + HMole.Home + 'r/rstone.png"/></td>').append('<td align="left">' + t.def.i + "</td>")).append($("<tr/>", {
                                            style: "height:16px; padding:0px;"
                                        }).append('<td align="right">' + t.att.p + "</td>").append('<td><img src="' + HMole.Home + 'r/rpopu.png"/></td>').append('<td align="left">' + t.def.p + "</td>")).append($("<tr/>", {
                                            style: "height:16px; padding:0px;"
                                        }).append('<td align="right">' + t.att.f + "</td>").append('<td><img src="' + HMole.Home + 'r/rfavor.png"/></td>').append('<td align="left">' + t.def.f + "</td>")))
                                    }
                                }
                            }
                        }
                    } else {}
                });
                $(WndId + " #building_wall").ready(function () {
                    jGP.find("#building_wall ul.game_list").css("max-height", "450px");
                    if ($(WndId + " #building_wall #butCNV" + WndName).length == 0) {
                        HMole.AddCnvBtn("butCNV", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "wall";
                            HMoleData(wGP, true);
                            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                        }).appendTo(WndId + " #building_wall");
                        HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                            HMole.parentId = this.getAttribute("rel");
                            HMole.RepType = "wall";
                            HMoleData(wGP, false)
                        }).appendTo(WndId + " #building_wall");
                        HMole.AddBtn("btnReset", WndName).click(function () {
                            HMole.WallReset();
                            if (HMole.sShowLastWall == true) HMole.WallReplace()
                        }).appendTo(WndId + " #building_wall");
                        var e = c2 = "0";
                        if (HMole.sShowLastWall == true) c2 = "1";
                        else e = "1"; if (HMole.sShowLastWall == true) HMole.WallReplace();
                        $("<span/>", {
                            style: "display:block;"
                        }).html(HMole.Lang.wallShow + ": ").append($("<a/>", {
                            href: "#",
                            id: "rb_wall1",
                            sel: e,
                            rel: wGP.getID()
                        }).click(function () {
                            if (HMole.sShowLastWall == false) return;
                            HMole.sShowLastWall = false;
                            document.getElementById("rb_wall2").firstChild.src = HMole.Home + "gui/rb0.gif";
                            this.firstChild.src = HMole.Home + "gui/rb1.gif";
                            document.getElementById("rb_wall2").setAttribute("sel", "0");
                            this.setAttribute("sel", "1");
                            $(".place_unit_black.bold.HMoleDiff").remove();
                            $(".place_unit_white.bold.HMoleDiff").remove();
                            $(".place_unit_black.bold").show();
                            $(".place_unit_white.bold").show()
                        }).append($("<img/>", {
                            src: HMole.Home + "gui/rb" + e + ".gif",
                            style: "position:relative; top:2px;"
                        })).append(" " + HMole.Lang.wallShowA + " ")).append(" .... ").append($("<a/>", {
                            href: "#",
                            id: "rb_wall2",
                            sel: c2
                        }).click(function () {
                            if (HMole.sShowLastWall == true) return;
                            HMole.sShowLastWall = true;
                            document.getElementById("rb_wall1").firstChild.src = HMole.Home + "gui/rb0.gif";
                            this.firstChild.src = HMole.Home + "gui/rb1.gif";
                            document.getElementById("rb_wall1").setAttribute("sel", "0");
                            this.setAttribute("sel", "1");
                            HMole.WallReplace()
                        }).append($("<img/>", {
                            src: HMole.Home + "gui/rb" + c2 + ".gif",
                            style: "position:relative; top:2px;"
                        })).append(" " + HMole.Lang.wallShowB)).appendTo(WndId + " #building_wall")
                    }
                });
                $(WndId + " #place_defense #defense_header").ready(function () {
                    if ($(WndId + " #place_defense #defense_header").length > 0) {
                        if ($(WndId + " #place_defense #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "agora";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).appendTo(WndId + " #place_defense div.game_list_footer");
                            HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "agora";
                                HMoleData(wGP, false)
                            }).appendTo(WndId + " #place_defense div.game_list_footer");
                            HMole.AddBtn("SUPPLAYERS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "support_players";
                                HMoleData(wGP, false)
                            }).appendTo(WndId + " #place_defense div.game_list_footer")
                        }
                    }
                });
                $(WndId + " #place_defense .game_header").ready(function () {
                    if ($(WndId + " #place_defense .game_header").length > 0) {
                        if ($(WndId + " #place_defense #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "agora2";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).appendTo(WndId + " #place_defense div.game_list_footer");
                            HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "agora2";
                                HMoleData(wGP, false)
                            }).appendTo(WndId + " #place_defense div.game_list_footer")
                        }
                    }
                });
                if (wGP.type == Layout.wnd.TYPE_TOWN_OVERVIEWS) {
                    $(WndId + " #dd_commands_command_type").ready(function () {
                        if ($(WndId + " #dd_commands_command_type").length > 0) {
                            if ($(WndId + " #game_list_footer #butCNV" + WndName).length == 0) {
                                HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                    HMole.parentId = this.getAttribute("rel");
                                    HMole.RepType = "command_curator";
                                    HMoleData(wGP, true);
                                    this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                                }).appendTo(WndId + " #game_list_footer");
                                HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                    HMole.parentId = this.getAttribute("rel");
                                    HMole.RepType = "command_curator";
                                    HMoleData(wGP, false)
                                }).appendTo(WndId + " #game_list_footer")
                            }
                        }
                    })
                }
                $(WndId + " div.command_info").ready(function () {
                    if ($(WndId + " div.command_info").length > 0) {
                        if ($(WndId + " div.command_info #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "command";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).appendTo(WndId + " div.command_info");
                            if ($(WndId + " div.command_info a.button").length > 1) {
                                $("#butCNV" + WndName).css("right", "125px")
                            }
                            HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "command";
                                HMoleData(wGP, false)
                            }).appendTo(WndId + " div.command_info");
                            if ($(WndId + " div.command_info a.button ~ a").length > 1) {
                                $("#butCNVS" + WndName).css("right", "150px")
                            } else {
                                $("#butCNVS" + WndName).css("right", "25px")
                            }
                            var e = jGP.find($(".command_icon_wrapper img")).attr("src").replace(/^.*[\/]/, "").replace(/.png/, "");
                            if (e == "attack" && jGP.find($("div.return")).length < 1)
                                if (HMole.Link2Struct(jGP.find($("div.defender a.gp_town_link")).attr("href")).id == Game.townId) {
                                    e = jGP.find($(".command_info_time .arrival_time")).html();
                                    e = e.substring(e.length - 8, e.length).replace(/ /, "0");
                                    var t = new Date(Timestamp.server() * 1e3);
                                    t.setHours(e.substring(0, 2));
                                    t.setMinutes(e.substring(3, 5));
                                    t.setSeconds(e.substring(6, 8));
                                    e = Math.round(t.getTime() / 1e3);
                                    if (e < Timestamp.server()) e += 24 * 60 * 60;
                                    e = "_" + HMole.Link2Struct(jGP.find($("div.attacker a.gp_town_link")).attr("href")).id + Game.townId + e;
                                    if (e in HMole.attTownList) {
                                        jGP.find($(".command_icon_wrapper img:first")).attr("src", HMole.Home + "/m/" + HMole.attTownList[e].at + ".png")
                                    }
                                }
                        }
                    }
                });
                if (wGP.type == Layout.wnd.TYPE_CONQUEROR) {
                    $(WndId + " #conqueror_units_in_town").ready(function () {
                        if ($(WndId + " #conqueror_units_in_town #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "conquerold";
                                HMoleData(wGP, false)
                            }).prependTo(WndId + " #conqueror_units_in_town");
                            HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "conquerold";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).prependTo(WndId + " #conqueror_units_in_town")
                        }
                    });
                    $(WndId + " #unit_movements").ready(function () {
                        if ($(WndId + " #unit_movements #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "conquerold_troops";
                                HMoleData(wGP, false)
                            }).prependTo(WndId + " #unit_movements");
                            HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "conquerold_troops";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).prependTo(WndId + " #unit_movements")
                        }
                    })
                }
                $(WndId + " #towninfo_gods").ready(function () {
                    jGP.find(".choose_power.disabled").css({
                        opacity: .5
                    });
                    $.each($("div.towninfo_gods .god_mini div[name=GMHTcnt]"), function (e, t) {
                        $(t).remove()
                    });
                    $.each($("a.choose_power.towninfo_god_power div[name=GMHTcnt]"), function (e, t) {
                        $(t).remove()
                    });
                    $.each($("a.choose_power.towninfo_god_power"), function (e, t) {
                        e = this.className;
                        if (e.indexOf("disabled") > 0) return;
                        var n = GameData.powers[e.substring(e.lastIndexOf(" ") + 1, e.lenght)];
                        var r = MM.checkAndPublishRawModel("PlayerGods", {
                            id: Game.player_id
                        }).getCurrentProductionOverview()[n.god_id];
                        var i = "margin-top:0px; text-shadow: 1px 1px 1px black; font-size:12px; z-index:3000;";
                        if (r.current >= 500) i += " color:#FF0000;";
                        else i += " color:#00D0FF;";
                        e = jGP.find(".god_mini." + n.god_id);
                        if (e.find("div[name=GMHTcnt]").length < 1) $(e).append($("<div/>", {
                            style: i,
                            name: "GMHTcnt"
                        }).html("<center><b>" + r.current + "</b></center>"));
                        e = Math.floor(r.current / n.favor);
                        if (e > 0) $(this).append($("<div/>", {
                            style: "margin-top:32px; color:#00FF00; text-shadow: 1px 1px 1px black; font-size:12px; z-index:3000;",
                            name: "GMHTcnt"
                        }).html("<center>" + e + "x</center>"));
                        else {
                            $(this).css("background-position", function (e, t) {
                                return t.replace(/-?\d+px$/, "0px")
                            });
                            $(this).append($("<div/>", {
                                style: "margin-top:34px; color:#FF0000; text-shadow: 1px 1px 1px black; font-size:9px; z-index:3000;",
                                name: "GMHTcnt"
                            }).countdown(Timestamp.server() + (n.favor - r.current) / r.production * 60 * 60))
                        }
                    })
                });
                $(WndId + " #unit_order #big_transporter").ready(function () {
                    if ($(WndId + " #unit_order div#units #HMolePower").length == 0) {
                        var e = 0;
                        if ($(WndId + " #sword").length != 0) e = "fertility_improvement";
                        if ($(WndId + " #big_transporter").length != 0) e = "call_of_the_ocean";
                        if (e != 0) {
                            $("<div/>", {
                                id: "HMolePower",
                                "class": "towninfo_power_image power_icon86x86 " + e,
                                style: ""
                            }).click(function () {
                                var t = $(".btn_gods_spells.circle_button.spells.active.checked").length;
                                if (t == 0) $(".btn_gods_spells.circle_button.spells").click();
                                $(".power_icon30x30." + e + ".new_ui_power_icon.js-power-icon").click();
                                if (t == 0) $(".btn_gods_spells.circle_button.spells.active.checked").click();
                                $("#HMolePower").css("background-position", function (e, t) {
                                    return t.replace(/-?\d+px$/, "0px")
                                })
                            }).appendTo(WndId + " #unit_order div#units")
                        }
                    }
                });
                $(WndId + " #academy_tech_bg").ready(function () {
                    if ($(WndId + " #academy_tech_bg").length > 0) {
                        if ($(WndId + " #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtn("butCNV", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "academy_research";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).appendTo(WndId);
                            HMole.AddCnvBtnS("butCNVS", WndName).click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "academy_research";
                                HMoleData(wGP, false)
                            }).appendTo(WndId)
                        }
                    }
                });
                $(WndId + " #techtree").ready(function () {
                    if ($(WndId + " #techtree").length > 0) {
                        if ($(WndId + " #butCNV" + WndName).length == 0) {
                            HMole.AddCnvBtn("butCNV", WndName).css("top", "370px").click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "buildings";
                                HMoleData(wGP, true);
                                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                            }).appendTo(WndId);
                            HMole.AddCnvBtnS("butCNVS", WndName).css("top", "370px").click(function () {
                                HMole.parentId = this.getAttribute("rel");
                                HMole.RepType = "buildings";
                                HMoleData(wGP, false)
                            }).appendTo(WndId)
                        }
                    }
                })
            }
        }
    },
    insertBBcode: function (e, t, n) {
        var r = n;
        r.focus();
        if (typeof document.selection != "undefined") {
            var i = document.selection.createRange();
            var s = i.text;
            i.text = e + s + t;
            i = document.selection.createRange();
            if (s.length == 0) {
                i.move("character", -t.length)
            } else {
                i.moveStart("character", e.length + s.length + t.length)
            }
            i.select()
        } else {
            if (typeof r.selectionStart != "undefined") {
                r.focus();
                var o = r.selectionStart;
                var u = r.selectionEnd;
                var a = r.scrollTop;
                var f = r.scrollHeight;
                var s = r.value.substring(o, u);
                r.value = r.value.substr(0, o) + e + s + t + r.value.substr(u);
                var l;
                if (s.length == 0) {
                    l = o + e.length
                } else {
                    l = o + e.length + s.length + t.length
                }
                r.selectionStart = l;
                r.selectionEnd = l;
                r.scrollTop = a + r.scrollHeight - f
            }
        }
    },
    AlarmStart: function () {
        if (HMole.AlarmActive) return;
        if (HMole.Set.alarmSel == 0) $("#ui_box").append($("<audio/>", {
            id: "HMolePlayer"
        }).html('<source src="' + HMole.Home + 'sound/alarm.mp3" type="audio/mpeg" /><source src="' + HMole.Home + 'sound/alarm.ogg" type="audio/ogg" /><embed hidden="true" loop="true" src="' + HMole.Home + 'sound/alarm.mp3"/>'));
        else $("#ui_box").append($("<audio/>", {
            id: "HMolePlayer"
        }).html('<source src="' + HMole.AlarmsURLs[HMole.Set.alarmSel] + '" type="audio/mpeg" /><embed hidden="true" loop="true" src="' + HMole.AlarmsURLs[HMole.Set.alarmSel] + '"/>')); if (HMole.Set.alarmLoop) document.getElementById("HMolePlayer").addEventListener("ended", function () {
            this.currentTime = 0;
            this.play()
        }, false);
        document.getElementById("HMolePlayer").play();
        HMole.AlarmActive = true;
        $("#logo").html("");
        $("#logo").append($("<img/>", {
            style: "position:absolute; left:16px; top:8px;",
            src: HMole.Home + "gui/alarm.gif"
        })).append($("<a/>", {
            "class": "last_report game_arrow_left",
            href: "#",
            style: "top:38px;"
        }).click(function () {
            document.getElementById("HMolePlayer").volume -= .05
        })).append($("<a/>", {
            "class": "next_report game_arrow_right",
            href: "#",
            style: "top:38px;"
        }).click(function () {
            document.getElementById("HMolePlayer").volume += .05
        })).append($("<a/>", {
            "class": "game_arrow_delete",
            href: "#",
            style: "top:40px;"
        }).click(function () {
            $("#logo").html("");
            $("#logo").append($("<img/>", {
                style: "position:absolute; left:1px; top:3px;",
                src: HMole.Home + "gui/logo.gif"
            }));
            document.getElementById("HMolePlayer").pause();
            $("#HMolePlayer").remove();
            HMole.AlarmActive = false
        }))
    },
    Emoty1: ["1/usmiech", "1/ostr", "1/kwadr", "1/smutny", "1/smutny2", "1/yyyy", "1/uoeee", "1/luzik", "1/rotfl", "1/oczko", "1/mniam", "1/jezyk", "1/jezyk_oko", "1/stres", "1/nerwus", "1/zly", "1/w8", "1/bezradny", "1/krzyk", "1/szok", "1/hura", "1/tak", "1/oklaski", "1/boisie", "1/prosi", "1/milczek", "1/nie", "1/hejka", "1/okok", "1/cwaniak", "1/haha", "1/mysli", "1/lezkawoku", "1/papa", "1/papa_buzka", "1/kwiatek", "1/foch", "1/zmeczony", "1/beczy", "1/diabel", "1/glupek", "1/wysmiewacz", "1/zalamka", "1/zmartwienie", "1/buzki", "1/zawstydzony", "1/dobani", "1/dokuczacz", "1/figielek", "1/spadaj", "1/paluszkiem", "1/wnerw", "1/zacieszacz", "1/muza", "1/aparat", "1/kotek", "1/piesek", "1/pocieszacz", "1/buziak", "1/plotki", "1/plask", "1/klotnia", "1/chatownik", "1/wesoly", "1/mruga", "1/lol", "1/rotfl2", "1/zakochany", "1/tiaaa", "1/wc", "1/ziew", "1/bije", "1/dostal", "1/zniesmaczony", "1/zab", "1/puknijsie", "1/gafa", "1/soczek", "1/winko", "1/palacz", "1/gazeta", "1/gra", "1/telefon", "1/zakupy", "1/spioch", "1/wanna", "1/prysznic", "1/pada", "1/woblokach", "1/snieg", "1/slonko", "1/okularnik", "1/jepizze", "1/obiad", "1/tort", "1/piwko", "1/olaboga", "1/hmmm", "1/alejaja", "1/palka", "1/kwiaty", "1/jezyczek", "1/wiwat", "1/uklon", "1/przypal", "1/drink", "1/drinkona", "1/fajek", "1/lupa", "1/snajper", "1/policjant", "1/dzwoni", "1/plakus", "1/spoko", "1/enzyk", "1/kucharz", "1/pytajnik", "1/wykrzyknik"],
    Emoty2: ["2/ahoy", "2/majtek", "2/szacunek", "2/rapidka", "2/rapidka2", "2/strach", "2/wrozy", "2/szczerbaty", "2/poszukiwacz", "2/czater", "2/spiewak", "2/szpada", "2/zhustka", "2/pojedynek", "2/kompani", "2/papuga", "2/zflaga", "2/salut", "2/pifpaf", "2/kapitan", "2/czacha", "2/skullbullet", "2/flaga", "2/skrzynia", "2/tiki", "2/marynarz", "2/bezrumu", "2/ognia", "2/bomba", "2/atak", "2/zeglarz", "2/brodaty", "2/jack", "2/korsarz", "2/korsarz2", "2/piratka", "2/piratka2", "2/lol", "2/usmiech", "2/okej", "2/gwizda", "2/gwizda2", "2/niepewny", "2/zaskoczony", "2/przestraszony", "2/smutny", "2/zly", "2/kopniety", "2/oczko", "2/wstyd", "2/przerazony", "2/wesoly"],
    Emoty3: ["3/usmiech", "3/tak", "3/lol", "3/lol2", "3/usmiechzabki", "3/1st", "3/2nd", "3/3rd", "3/klaun", "3/sumienie", "3/smutny", "3/nie", "3/smutasek", "3/lzawi", "3/sorki", "3/placzejakdziecko", "3/placze", "3/beczy", "3/papa", "3/nudy", "3/niepewny", "3/ziewanie", "3/ziewbranoc", "3/ziew", "3/spi", "3/niewiem", "3/kopniety", "3/chytry", "3/hmm", "3/zlosliwy", "3/fuck", "3/zly", "3/wkurzony", "3/agresywny", "3/kwasny", "3/foch", "3/takiego", "3/grozi", "3/jezyk", "3/jezyk2", "3/zirytowany", "3/wsciekly", "3/przestan", "3/szok", "3/zmieszany", "3/szuka", "3/puknijsie", "3/pukpuk", "3/onie", "3/brwi", "3/zdziwiony", "3/zawiedziony", "3/zdziwko", "3/lagodny", "3/megaszok", "3/rozgladasie", "3/glupek", "3/oziebly", "3/znudzony", "3/ziewa", "3/foh", "3/swietny", "3/akuku", "3/ziomal", "3/zwyciestwo", "3/yool", "3/gratki", "3/terefere", "3/radocha", "3/gibanie", "3/podchmielony", "3/tanczy", "3/tanczy2", "3/klaska", "3/haha", "3/podziw", "3/oczko", "3/oczko2", "3/oczko3", "3/witaj", "3/witaj2", "3/klaszcze", "3/swir", "3/ubaw", "3/zadowolony", "3/tofajnie", "3/kciukgora", "3/kciukdol", "3/wrrum", "3/jest", "3/napina", "3/sekret", "3/slinisie", "3/napalony", "3/mdleje", "3/gwizdze", "3/prosi", "3/blagam", "3/zawstydzony", "3/zonk", "3/zonk2", "3/adolf", "3/bije", "3/box", "3/cwiczy", "3/silacz", "3/zarowka", "3/pizza", "3/zygi", "3/piwko", "3/smutnyspacer", "3/smutnyaniol", "3/uscisk", "3/zakochani", "3/walnac", "3/klutnia", "3/kumple", "3/rucha", "3/odkurz", "3/doktor", "3/szpady", "3/patyk", "3/zgoda", "3/tuli", "3/zebranie", "3/fala", "3/grupfoto", "3/uuu"],
    Emoty3b: ["3b/cowboy", "3b/cowboy2", "3b/rolnik", "3b/baca", "3b/czapeczka", "3b/czapeczka2", "3b/czapeczka3", "3b/czapeczka4", "3b/czarodziej", "3b/biskup", "3b/kaznodzieja", "3b/policeman", "3b/policjant", "3b/detektyw", "3b/zolnierz", "3b/szef", "3b/pieniazek", "3b/afro", "3b/kibol", "3b/student", "3b/torba", "3b/aniol", "3b/rybak", "3b/lowi", "3b/surfing", "3b/plywak", "3b/pilot", "3b/skuter", "3b/miesza", "3b/gotuje", "3b/smazy", "3b/kucharz", "3b/glodny", "3b/kelner", "3b/muszka", "3b/piwka", "3b/joint", "3b/faja", "3b/kurzak", "3b/winko", "3b/pijaki", "3b/piwko", "3b/piwolot", "3b/szampan", "3b/degustant", "3b/zrozna", "3b/czyta", "3b/kawka", "3b/przemawia", "3b/koniectematu", "3b/gazeta", "3b/czytaj", "3b/pisze", "3b/maluje", "3b/papa", "3b/tele", "3b/telefon", "3b/komorka", "3b/tv", "3b/matrix", "3b/komp", "3b/lamer", "3b/walkman", "3b/dj", "3b/muzyka", "3b/perkusja", "3b/punk", "3b/trabka", "3b/zespol", "3b/wisielec", "3b/sniezka", "3b/krol", "3b/wczasy", "3b/trening", "3b/myjezemby", "3b/uzi", "3b/spluwa", "3b/mysliwy", "3b/uzbrojony", "3b/samoboj", "3b/samoboj2", "3b/wmur", "3b/wmur2", "3b/roza", "3b/stokrotki", "3b/stokroty", "3b/zoltakartka", "3b/czerwonakartka", "3b/lincz", "3b/manrikikusari", "3b/kapitulacja", "3b/rokefeler", "3b/cwaniak", "3b/cool", "3b/cool2", "3b/dupa", "3b/rowerek", "3b/kolarz", "3b/zbanowany", "3b/dziecko", "3b/dzieci", "3b/walwleb", "3b/romeo", "3b/smierc", "3b/transformer", "3b/lolflag", "3b/kon", "3b/patataj", "3b/ban", "3b/spam", "3b/magik", "3b/szczena", "3b/rycerz", "3b/polska", "3b/brawo"],
    Emoty3c: ["3c/manicure", "3c/robotka", "3c/mdleje", "3c/zegna", "3c/jekwiatek", "3c/swiruje", "3c/psychopatka", "3c/bezprzypalu", "3c/ziewka", "3c/paluszkiem", "3c/paznokietki", "3c/dryni", "3c/gdziedmuchac", "3c/brawo", "3c/spiewa", "3c/toon", "3c/czyrliderka", "3c/niebieska", "3c/fajek", "3c/kolezanki", "3c/usmiech", "3c/mruga", "3c/nuda", "3c/haha", "3c/hihi", "3c/faza", "3c/hej", "3c/szalona", "3c/flirt", "3c/calus", "3c/buzka", "3c/zakochana", "3c/serce", "3c/niedowiary", "3c/okurcze", "3c/smutna", "3c/beczy", "3c/placze", "3c/histeria", "3c/zla", "3c/kopnieta", "3c/wchowanego", "3c/sciema", "3c/buja", "3c/nieslucham", "3c/zachwycona", "3c/apsik", "3c/szok", "3c/dlaczego", "3c/blondynka", "3c/smierdzi", "3c/oczko", "3c/atletka", "3c/suszyzeby", "3c/kicha", "3c/radocha", "3c/rumieniec", "3c/tonieja", "3c/zdziwiona", "3c/ziewa", "3c/alesmieszne", "3c/sorki", "3c/fochy", "3c/palka", "3c/wielkastopa", "3c/usmieszek", "3c/utratasil", "3c/niedowierza", "3c/agentka", "3c/niewiem", "3c/alejaja", "3c/tanczy", "3c/mysli", "3c/lusterko", "3c/profesor", "3c/tancuje", "3c/uklon", "3c/swiruska", "3c/hyhy", "3c/zdziwko", "3c/jola", "3c/krolowa", "3c/tak", "3c/grymas", "3c/drapie", "3c/stres", "3c/chora", "3c/aerobik", "3c/czeka", "3c/zawiedziona", "3c/lala", "3c/salut", "3c/modlitwa", "3c/wkurzona", "3c/nie", "3c/gala", "3c/wymioty", "3c/pijana", "3c/przeciaganie", "3c/proca", "3c/wiedzma"],
    Emoty4: ["4/usmiech", "4/tak", "4/kiepsko", "4/pinokio", "4/hihi", "4/haha", "4/hahaha", "4/cierpliwy", "4/refleks", "4/sorki", "4/ulga", "4/zatkajsie", "4/niezadowolony", "4/zalamany", "4/foch", "4/kciukgora", "4/czas", "4/doroboty", "4/oczko", "4/sciany", "4/tanczy", "4/puknijsie", "4/placze", "4/jacidam", "4/taniec", "4/smiech", "4/dowcip", "4/smutny", "4/kopniety", "4/brzydal", "4/zgrywus", "4/cyklop", "4/lizus", "4/zegnaj", "4/klaszcze", "4/oklaski", "4/pardon", "4/pierdziuch", "4/piroman", "4/polewka", "4/wybryk", "4/poploch", "4/niepewny", "4/klamczuch", "4/wskazuje", "4/uklon", "4/tedy", "4/zakochany"],
    Emoty5: ["5/smiech", "5/lol", "5/smutny", "5/nie", "5/krzyk", "5/terefele", "5/kciukdol", "5/pobity", "5/klaszcze", "5/wystraszony", "5/stop", "5/wskazuje", "5/zly", "5/akuku", "5/perfekt", "5/ugory", "5/piesc", "5/grozi", "5/lecislinka", "5/smarka", "5/tanczy", "5/jezyk", "5/git", "5/nuda", "5/okularnik", "5/gwizda", "5/roza", "5/emocje", "5/wyprasza", "5/przybity", "5/papa", "5/czacza", "5/smiejesie", "5/niedowierza", "5/powstrzymuje", "5/ziewa", "5/zadzwon", "5/tygamoniu", "5/piwko", "5/kumple", "5/koledzy", "5/korsarz", "5/zolnierz", "5/policjant", "5/harcerz", "5/narciarz", "5/nurek", "5/plywak", "5/rycerz", "5/adolf", "5/adolf2", "5/aldi", "5/hitler", "5/niewidomy", "5/baca", "5/grill", "5/koszykasz", "5/koszykasz2", "5/koszykasz3", "5/gracz", "5/maszynka", "5/czarodziej", "5/lasuch", "5/relaks", "5/czipsy", "5/alko", "5/voodzia", "5/ognisko", "5/cwiczy", "5/szajba", "5/przypal", "5/sasasa", "5/palka", "5/grzebiewzembie", "5/img", "5/spluwy", "5/swieczka", "5/parasol", "5/jajecznica", "5/sniadanie", "5/aukcja", "5/kapitulacja", "5/samutaj", "5/zebrak", "5/punk", "5/pieniazek", "5/wmur", "5/wmurek", "5/kierowca", "5/deska", "5/rowerek", "5/boks", "5/rysunek", "5/lizak", "5/dziecko", "5/taleze", "5/katarynka", "5/papieros", "5/nakaz", "5/poczta", "5/pilot", "5/pajak", "5/owacja", "5/pomponik", "5/patataj", "5/www", "5/wisielec", "5/viking", "5/gramofon", "5/puzon", "5/drazek", "5/robin", "5/biskup", "5/papuga", "5/haczyk", "5/gitara", "5/pisarz", "5/zlewiesci", "5/histeria", "5/zgrywus", "5/rzongler", "5/czaszkowiec", "5/wachakwiat", "5/narandke", "5/waga", "5/rozoweokulary", "5/kochaniekocha", "5/parasolka", "5/nadrutach", "5/pompuje", "5/perfumy", "5/suszarka", "5/zabojczyni", "5/kawka", "5/krolikrolowa", "5/tancza", "5/jestesmoj", "5/rejs", "5/swiruje", "5/kochamcie", "5/bokserka", "5/pobita", "5/okulary", "5/okularnica", "5/zroza", "5/higienistka", "5/nudy", "5/wyznaje", "5/nalasso", "5/calus", "5/kretynka", "5/majaczy", "5/zachwyt", "5/dziewczyna", "5/lusterko", "5/warkocze", "5/oczko", "5/gracja", "5/jezyczek", "5/waleczna", "5/buziak", "5/zawstydzona", "5/przywoluje", "5/hahaha", "5/smutna", "5/olaboga", "5/placze", "5/beczy", "5/histeryzuje", "5/ostrzega", "5/wygania", "5/puknijsie", "5/banki", "5/prasuje", "5/narciarka"],
    Emoty6: ["6/wiwat", "6/smieszne", "6/smiech", "6/nuda", "6/sherlock", "6/drwal", "6/proca", "6/manrikikusari", "6/palacz", "6/luk", "6/upal", "6/spluwy", "6/ognisko", "6/blant", "6/joint", "6/przypal", "6/palka", "6/karmiptaki", "6/lustereczko", "6/prasowka", "6/dziadek", "6/babcia", "6/szczerbaty", "6/glowka", "6/mdleje", "6/kibic", "6/zawis", "6/kapitulacja", "6/hura", "6/glodny", "6/ban", "6/student", "6/haczyk", "6/skrzypek", "6/plywak", "6/ponton", "6/lunatyk", "6/wc", "6/inwalida", "6/rybak", "6/wiosluje", "6/kibel", "6/motorowka", "6/szermierze", "6/jatezmusze", "6/nakoniku", "6/cool", "6/prysznic", "6/kapiel", "6/fruwa", "6/skuter", "6/rowerek", "6/masakra", "6/zegluje", "6/gitara", "6/kowboj", "6/pirat", "6/kwiaty", "6/kwiatki", "6/ciacho", "6/superman", "6/winko", "6/rzeznik", "6/baranek", "6/wacha", "6/barabara", "6/bujawka", "6/granat", "6/boks", "6/butelka", "6/czytaj", "6/wodeczka", "6/wedkuje", "6/fotograf", "6/mail", "6/rekin", "6/rzepa", "6/zdrajca", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/", "6/"],
    Emoty7: ["7/leber", "7/bzyk", "7/bociek", "7/kaczuszki", "7/aligator", "7/kupa", "7/chodzik", "7/gruby", "7/marysia", "7/odbijacz", "7/odbijacz2", "7/zaba", "7/glut", "7/glut2", "7/glut3", "7/tacysami", "7/eistein", "7/renifer", "7/wiedzma", "7/respekt", "7/jack", "7/badpete", "7/banan", "7/cool", "7/fakers", "7/rybi", "7/boja", "7/obcy", "7/lala", "7/krecik", "7/skrillex", "7/pszczola", "7/sierszen", "7/osa", "7/bocian", "7/swinia", "7/taz", "7/breakdance", "7/robak", "7/ludzik", "7/los", "7/a-kuku", "7/sounthpark", "7/manager", "7/on", "7/ona", "7/palma", "7/pies", "7/kwiatek", "7/kwiatek2", "7/motyle", "7/motyle2", "7/motyle3", "7/dizzy", "7/dizzy2", "7/kostek", "7/gostek", "7/gostek2", "7/gostek3", "7/paramloda", "7/aniolka", "7/mysza", "7/stokrotka", "7/bart", "7/beavisbutt", "7/subzero", "7/reptile", "7/buster", "7/porky", "7/zolnierz", "7/mslug", "7/mslug2", "7/mslug3", "7/mslug4", "7/kotek", "7/psina"],
    Emoty8: ["8/ban", "8/zakochany-drzewo", "8/wakacje", "8/dj", "8/koncert", "8/charakter", "8/basenik", "8/wrekin", "8/wplace", "8/wusmiech", "8/akwarium", "8/wanted", "8/melodia", "8/kalafior", "8/tencerz", "8/delfin", "8/ptak", "8/lezakowanie", "8/offtopic", "8/indyk", "8/zeglarz", "8/bocian", "8/aborygen", "8/maszynka", "8/rybki", "8/motorowka", "8/walec", "8/diabel", "8/gniewus"],
    Emoty9: ["9/icon_01.png", "9/icon_02.png", "9/icon_03.png", "9/icon_04.png", "9/icon_05.png", "9/icon_06.png", "9/icon_07.png", "9/icon_08.png", "9/icon_09.png", "9/icon_10.png", "9/icon_11.png", "9/icon_12.png", "9/icon_13.png", "9/crazzy.png", "9/icon_rank.png", "9/attack.png", "9/diplomat.png", "9/favour.png", "9/research_pnts.png", "9/forumpost.png", "9/notepad.png", "9/pop.png", "9/helm.png", "9/wreath.png", "9/wood.png", "9/stone.png", "9/iron.png", "9/ally", "9/flag", "9/island", "9/link", "9/ocean", "9/player", "9/points", "9/spinner", "9/time", "9/town", "9/townptns", "9/world", "9/worldend", "9/worldh"],
    lasttab: 0,
    EmotsAdd: function (e, t, n) {
        function r(t, r, i) {
            return $("<li/>").append($("<a/>", {
                "class": "submenu_link",
                href: "#" + e,
                id: "help-" + t,
                rel: t
            }).click(function () {
                var e = HMole.lasttab;
                e.getJQElement().find("li a.submenu_link").removeClass("active");
                $(this).addClass("active");
                var t = document.getElementById("emots_poup_content");
                t.innerHTML = "";
                $.each(i, function (t, r) {
                    t = HMole.Home + "e/" + r;
                    if (t.indexOf(".png") < 1) t += ".gif";
                    e.getJQElement().find("#emots_poup_content").append($("<img/>", {
                        src: t,
                        title: ""
                    }).mouseover(function () {
                        this.style.backgroundColor = "#C0C0C0"
                    }).mouseout(function () {
                        this.style.backgroundColor = "transparent"
                    }).click(function () {
                        HMole.insertBBcode("[img]" + $(this).attr("src") + "[/img]", "", e.getJQElement().find(n)[0]);
                        $("#emot_popup_" + e.type).toggle()
                    }))
                })
            }).append($("<span/>", {
                "class": "left"
            }).append($("<span/>", {
                "class": "right"
            }).append($("<span/>", {
                "class": "middle",
                title: "K"
            }).html(r)))))
        }
        if (e.getJQElement().find("#emot_popup_" + e.type).length == 0) {
            HMole.lasttab = e;
            e.getJQElement().find($(".bb_button_wrapper")).append($("<div/>", {
                id: "emot_popup_" + e.type,
                style: "display:none;z-index:5000;"
            }).append($("<div/>", {
                "class": "bbcode_box top_left",
                style: 'top:-27px; height:2px; background:url("http://pl.cdn.grepolis.com/images/game/popup/top_left.png") rgba(0, 0, 0, 0);'
            })).append($("<div/>", {
                "class": "bbcode_box top_right",
                style: 'top:-27px; height:2px; background:url("http://pl.cdn.grepolis.com/images/game/popup/top_right.png") rgba(0, 0, 0, 0);'
            })).append($("<div/>", {
                "class": "bbcode_box top_center",
                style: "top:-27px; height:2px;"
            })).append($("<div/>", {
                "class": "bbcode_box middle_left",
                style: "top:-25px; width:3px;"
            })).append($("<div/>", {
                "class": "bbcode_box middle_right",
                style: "top:-25px; width:7px;"
            })).append($("<div/>", {
                "class": "menu_wrapper closable",
                style: "top:-25px; left: -4px; width:100%; background-color:#282218;"
            }).append($("<ul/>", {
                "class": "menu_inner",
                style: "width: 508px;"
            }).prepend(r("EMOTS1", "<img src='" + HMole.Home + "gui/et1a.gif'</img>", HMole.Emoty1)).prepend(r("EMOTS2", "<img src='" + HMole.Home + "gui/et2a.gif'</img>", HMole.Emoty2)).prepend(r("EMOTS3", "<img src='" + HMole.Home + "gui/et3a.gif'</img>", HMole.Emoty3)).prepend(r("EMOTS3b", "<img src='" + HMole.Home + "gui/et3b.gif'</img>", HMole.Emoty3b)).prepend(r("EMOTS3c", "<img src='" + HMole.Home + "gui/et3c.gif'</img>", HMole.Emoty3c)).prepend(r("EMOTS4", "<img src='" + HMole.Home + "gui/et4a.gif'</img>", HMole.Emoty4)).prepend(r("EMOTS5", "<img src='" + HMole.Home + "gui/et5a.gif'</img>", HMole.Emoty5)).prepend(r("EMOTS6", "<img src='" + HMole.Home + "gui/et6a.gif'</img>", HMole.Emoty6)).prepend(r("EMOTS7", "<img src='" + HMole.Home + "gui/et7a.gif'</img>", HMole.Emoty7)).prepend(r("EMOTS8", "<img src='" + HMole.Home + "gui/et8a.gif'</img>", HMole.Emoty8)).prepend(r("EMOTS9", "<img src='" + HMole.Home + "gui/et9a.gif'</img>", HMole.Emoty9)))).append($("<div/>", {
                "class": "bbcode_box middle_center",
                style: "height:170px;"
            }).append($("<div/>", {
                "class": "bbcode_box top_left"
            })).append($("<div/>", {
                "class": "bbcode_box top_right"
            })).append($("<div/>", {
                "class": "bbcode_box top_center"
            })).append($("<div/>", {
                "class": "bbcode_box bottom_center"
            })).append($("<div/>", {
                "class": "bbcode_box bottom_right"
            })).append($("<div/>", {
                "class": "bbcode_box bottom_left"
            })).append($("<div/>", {
                "class": "bbcode_box middle_left"
            })).append($("<div/>", {
                "class": "bbcode_box middle_right"
            })).append($("<div/>", {
                "class": "bbcode_box content clearfix",
                style: "overflow-y:scroll; height:170px;"
            }).append($("<div/>", {
                id: "emots_poup_content"
            })))).css({
                position: "absolute",
                top: "48px",
                left: "255px",
                width: "500px"
            }));
            e.getJQElement().find(t).append($("<a/>", {
                href: "#",
                style: "margin:0 3px 0 0; width:22px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -154px 0px rgba(0, 0, 0, 0) "
            }).mouseout(function () {
                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -154px 0px rgba(0, 0, 0, 0)"
            }).click(function () {
                var t;
                t = HMole.RepClipboard;
                HMole.parentId = this.getAttribute("rel");
                HMole.RepType = "situation";
                HMoleData(null, true);
                if (HMole.RepClipboard == "") return;
                HMole.insertBBcode(HMole.RepClipboard, "", e.getJQElement().find(n)[0]);
                HMole.RepClipboard = t;
                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
            }).mousePopup(new MousePopup(HMole.Lang.insert + " " + HMole.Lang.situation + " " + HMole.Lang.report)));
            e.getJQElement().find(t).append($("<a/>", {
                href: "#",
                style: "margin:0 3px 0 0; width:22px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -44px 0px rgba(0, 0, 0, 0) "
            }).mouseout(function () {
                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -44px 0px rgba(0, 0, 0, 0)"
            }).click(function () {
                HMole.insertBBcode(HMole.RepClipboard, "", e.getJQElement().find(n)[0]);
                this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
            }).mousePopup(new MousePopup(HMole.Lang.insert + " " + HMole.Lang.repPla)));
            e.getJQElement().find(t).append($("<a/>", {
                href: "#",
                style: "margin:0 3px 0 0; width:22px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -88px 0px rgba(0, 0, 0, 0) "
            }).click(function () {
                $("#emot_popup_" + e.type).toggle()
            }));
            $("#help-EMOTS1").click()
        }
    }
};
var MyHole = {
    init: function () {
        if (!HMole.ScriptAtcive) return;
        if (HMole.LangLoaded == false || typeof Layout == "undefined") {
            setTimeout("MyHole.init()", 100);
            return
        }
        var e, t;
        t = HMole.Cookie(HMole.SetCookie);
        if (t != null)
            for (e in t) HMole.Set[e] = t[e];
        else HMole.Cookie(HMole.SetCookie, HMole.Set);
        t = HMole.Cookie(HMole.gRAPCookie);
        if (t != null)
            for (e in t) HMole.gRAP[e] = t[e];
        else HMole.Cookie(HMole.gRAPCookie, HMole.gRAP);
        t = HMole.Cookie(HMole.GuiUstCookie);
        if (t != null)
            for (e in t) HMole.GuiUst[e] = t[e];
        else HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst);
        t = HMole.Cookie("cGMH_numAttacks");
        if (t == null) HMole.Cookie("cGMH_numAttacks", HMole.numAttacks);
        else HMole.numAttacks = t;
        t = HMole.Cookie("cGMH_attTownList");
        if (t != null) HMole.attTownList = t;
        if (location.pathname.indexOf("game") != -1) {
            var n, r, i, s, o = "";
            HMole.bz = String.fromCharCode(HMole.bz);
            if ($("body").hasClass("is_firefox")) HMole.bro = "ffx";
            s = document.getElementsByClassName("nui_left_box");
            if (s != null)
                if (s.length) {
                    s = document.getElementsByClassName("nui_main_menu")[0];
                    n = $("<div/>", {
                        "class": "nui_main_menu HMole",
                        style: "top:255px;"
                    }).append($("<div/>", {
                        id: "MHOLE_MENU",
                        style: "background:url('" + HMole.Home + "gui/LayA.gif') repeat scroll 0px 0px rgba(0, 0, 0, 0)"
                    }).append($("<div/>", {
                        id: "logo",
                        style: "position:absolute; left:0px; top:0px;"
                    }).append($("<img/>", {
                        style: "position:absolute; left:1px; top:3px;",
                        src: HMole.Home + "gui/logo.gif"
                    }))).append($("<div/>", {
                        id: "hm_Timer",
                        style: "float:right; margin:5px;"
                    }).append($("<div/>", {
                        id: "hm_TimerS2",
                        style: "float:right; width:14px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -140px 0px rgba(0, 0, 0, 0)"
                    })).append($("<div/>", {
                        id: "hm_TimerS1",
                        style: "float:right; width:14px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -140px 0px rgba(0, 0, 0, 0)"
                    })).append($("<div/>", {
                        id: "hm_TimerD2",
                        style: "float:right; width:3px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -157px 0px rgba(0, 0, 0, 0)"
                    })).append($("<div/>", {
                        id: "hm_TimerM2",
                        style: "float:right; width:14px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -140px 0px rgba(0, 0, 0, 0)"
                    })).append($("<div/>", {
                        id: "hm_TimerM1",
                        style: "float:right; width:14px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -140px 0px rgba(0, 0, 0, 0)"
                    })).append($("<div/>", {
                        id: "hm_TimerD1",
                        style: "float:right; width:3px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -157px 0px rgba(0, 0, 0, 0)"
                    })).append($("<div/>", {
                        id: "hm_TimerH2",
                        style: "float:right; width:14px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -140px 0px rgba(0, 0, 0, 0)"
                    })).append($("<div/>", {
                        id: "hm_TimerH1",
                        style: "float:right; width:14px; height:21px; display:block; background:url('" + HMole.Home + "gui/digi.gif') -140px 0px rgba(0, 0, 0, 0)"
                    }))).append(GuiEx.gLink("<br><br><br><center>-- " + HMole.Lang.opcje + "</center><br>", 14).attr("id", "HMOptions").click(function () {
                        MyHole.Help("HELPTAB4")
                    }))).append($("<div/>", {
                        id: "HMTowns",
                        style: "text-align:left; padding-left:10px; background:url('" + HMole.Home + "gui/LayC.gif') repeat scroll 0px 0px rgba(0, 0, 0, 0)"
                    }));
                    if (!HMole.Set.menu) {
                        n.append($("<div/>", {
                            id: "kit2",
                            style: "display:block; height:20px; background:url('" + HMole.Home + "gui/LayB.gif') repeat scroll 0px 0px rgba(0, 0, 0, 0)"
                        }).append($("<div/>", {
                            style: "top:2px; position:relative; float:left; display:block; width:8px; height:14px; background:url('" + HMole.Home + "gui/but.png') repeat scroll -385px -36px;"
                        })).append($("<a/>", {
                            id: "HMConvLink",
                            href: HMole.Home + "?p=rnk&m=cnq" + HMole.GetHomeUrlParm(),
                            target: "_blank",
                            style: "float:left; line-height:20px; color: #FFFF00; font-size: 10px;"
                        }).mouseout(function () {
                            this.style.color = "#FFFF00"
                        }).mouseover(function () {
                            this.style.color = "#80FFFF"
                        }).html(" " + HMole.Lang.norka)))
                    } else {
                        r = $("<div/>", {
                            style: "margin-top:4px; float:left; width:120px"
                        });
                        for (i = 0; i < 10; i++) {
                            r.append($("<span/>", {
                                id: "Menu_" + i,
                                "class": "circle_button_small"
                            }).append($("<span/>", {
                                style: "background:url('" + HMole.Home + "gui/btnico.png') -" + i * 24 + "px 0; display:block; width: 24px; height: 24px;"
                            })))
                        }
                        n.append($("<div/>", {
                            id: "kit2",
                            style: "display:block; height:60px; background:url('" + HMole.Home + "gui/LayB.gif') repeat scroll 0px 0px rgba(0, 0, 0, 0)"
                        }).append($("<div/>", {
                            style: "top:2px; position:relative; float:left; display:block; width:8px; height:14px; background:url('" + HMole.Home + "gui/but.png') repeat scroll -385px -36px;"
                        })).append(r))
                    }
                }
            $(".nui_left_box").after(n);
            s.style.top = 255 + document.getElementsByClassName("nui_main_menu")[0].clientHeight + "px";
            $("#kit2 div:first").click(function () {
                if ($("#kit").is(":visible")) {
                    $("#kit").hide();
                    if (HMole.Set.menu) $(".nui_main_menu").eq(1).css("top", "314px");
                    else $(".nui_main_menu").eq(1).css("top", "273px");
                    HMole.GuiUst.ShowOptions = false;
                    HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst)
                } else {
                    $("#kit").show();
                    $(".nui_main_menu").eq(1).css("top", 255 + document.getElementsByClassName("nui_main_menu")[0].clientHeight + "px");
                    HMole.GuiUst.ShowOptions = true;
                    HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst)
                }
            });
            if (!HMole.GuiUst.ShowOptions) $("#kit2 div:first").click();
            if (HMole.Set.menu) {
                $("#Menu_3").click(function () {
                    $("#ui_box .picomap_area .bull_eye_buttons .rb_map .option.city_overview").click();
                    HMole.TownOverwiew = true
                });
                $("#Menu_4").click(function () {
                    MyHole.LinkMenu()
                });
                $("#Menu_5").click(function () {
                    $(".nui_main_menu .main_menu_item.reports").click()
                });
                $("#Menu_6").click(function () {
                    $(".nui_main_menu .main_menu_item.ranking").click()
                });
                $("#Menu_7").click(function () {
                    $(".nui_main_menu .main_menu_item.alliance").click()
                });
                $("#Menu_8").click(function () {
                    $(".nui_main_menu .main_menu_item.messages").click()
                });
                $("#Menu_9").click(function () {
                    $(".nui_main_menu .main_menu_item.allianceforum").click()
                });
                $("#Menu_5").append($("<div/>", {
                    id: "Menu_5N",
                    style: "float:right; margin-top:-11px; color:#FF6000; font-weight:bold; font-size:11px;"
                }));
                $("#Menu_8").append($("<div/>", {
                    id: "Menu_8N",
                    style: "float:right; margin-top:-11px; color:#FF6000; font-weight:bold; font-size:11px;"
                }));
                $("#Menu_9").append($("<div/>", {
                    id: "Menu_9N",
                    style: "float:right; margin-top:-11px; color:#FF6000; font-weight:bold; font-size:11px;"
                }));
                $(".nui_main_menu .middle .content ul").hide()
            }
        }
        var u = false;
        $.each(Layout.wnd.getAllOpen(), function (e, t) {
            HMole.wndsAdd(Layout.wnd.GetByID(t.getID()))
        });
        $("body").ajaxStart(function () {
            HMole.ajax = true
        });
        $("body").ajaxStop(function () {
            HMole.ajax = false
        });
        $("body").ajaxComplete(function (e, t, n) {
            HMole.lastRequest = {};
            HMole.lastRequest.e = e;
            HMole.lastRequest.xhr = t;
            HMole.lastRequest.settings = n
        });
        $("body").ajaxSuccess(function (e, t, n) {
            HMole.lastRequest = {};
            HMole.lastRequest.e = e;
            HMole.lastRequest.xhr = t;
            HMole.lastRequest.settings = n;
            $.each(Layout.wnd.getAllOpen(), function (e, t) {
                HMole.wndsAdd(Layout.wnd.GetByID(t.getID()))
            });
            if ($("#butCNVmoves").length == 0) {
                HMole.cma = MM.models.CommandsMenuBubble[Game.player_id].attributes;
                HMole.AddCnvBtn("butCNVmoves", "").click(function () {
                    HMole.RepType = "commands_list";
                    HMoleData(null, true);
                    this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                }).appendTo("div#toolbar_activity_commands_list");
                HMole.AddCnvBtnS("butCNVSname", "").click(function () {
                    HMole.RepType = "commands_list";
                    HMoleData(null, false)
                }).appendTo("div#toolbar_activity_commands_list");
                $("<a/>", {
                    href: "#",
                    "class": "button",
                    style: "cursor:s-resize; width:130px; height:24px; background:url('" + HMole.Home + "gui/splitter.gif');"
                }).mousedown(function (e) {
                    if (e.which === 1) HMole.Drag = true;
                    return false
                }).mouseup(function (e) {
                    if (e.which === 1) HMole.Drag = false;
                    return false
                }).mouseout(function () {
                    HMole.Drag = false;
                    return false
                }).mousemove(function (e) {
                    if (e.which === 1 && !HMole.Drag) e.which = 0;
                    if (e.which == 1) {
                        var t = $("div#toolbar_activity_commands_list .js-dropdown-item-list").children().length * 47;
                        HMole.CLMAX += e.clientY - HMole.DragLY;
                        if (HMole.CLMAX < 47) HMole.CLMAX = 47;
                        if (HMole.CLMAX > t) HMole.CLMAX = t;
                        $("div#toolbar_activity_commands_list .js-dropdown-item-list").css("max-height", HMole.CLMAX)
                    }
                    HMole.DragLY = e.clientY;
                    return false
                }).appendTo("div#toolbar_activity_commands_list")
            }
        });
        $(".inventory").click(function (e, t) {
            HMole.dodaj = "inv"
        });
        $("<a/>", {
            href: "#",
            "class": "button GMHADD",
            style: "left:2px; top:6px; width:20px; height:18px; background:url('" + HMole.Home + "gui/but.png') -374px -0px;"
        }).click(function () {
            $("#ui_box .nui_right_box").hide();
            $("#ui_box .nui_units_box").hide();
            $("#ui_box .gods_area").hide();
            HMole.GuiUst.HideRight = true;
            HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst)
        }).appendTo("#ui_box .nui_units_box .bottom_ornament");
        $("<a/>", {
            href: "#",
            "class": "button GMHADD",
            style: "left:174px; top:40px; width:20px; height:18px; background:url('" + HMole.Home + "gui/but.png') -374px -18px;"
        }).click(function () {
            $("#ui_box .nui_right_box").show();
            $("#ui_box .nui_units_box").show();
            $("#ui_box .gods_area").show();
            HMole.GuiUst.HideRight = false;
            HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst)
        }).appendTo("#ui_box .nui_toolbar .right");
        if (HMole.GuiUst.HideRight) $("#ui_box .nui_units_box .bottom_ornament a").click();
        $("<a/>", {
            href: "#",
            "class": "button GMHADD",
            style: "left:8px; top:56px; width:20px; height:18px; background:url('" + HMole.Home + "gui/but.png') -374px -0px; z-index:6;"
        }).click(function () {
            if (HMole.GuiUst.HideCenter) {
                HMole.GuiUst.HideCenter = false;
                $("#ui_box .town_name_area a").css("background-position", "-374px -0px");
                $("#ui_box .nui_toolbar").show();
                $("#ui_box .ui_resources_bar").show();
                $("#ui_box .toolbar_buttons").show();
                $("#ui_box .tb_activities").show();
                $("#ui_box .tb_activities.toolbar_activities").show();
                $("#ui_box .ui_quickbar").show();
                $("#ui_box .leaves").show()
            } else {
                HMole.GuiUst.HideCenter = true;
                $("#ui_box .town_name_area a").css("background-position", "-374px -18px");
                $("#ui_box .nui_toolbar").hide();
                $("#ui_box .ui_resources_bar").hide();
                $("#ui_box .toolbar_buttons").hide();
                $("#ui_box .tb_activities").hide();
                $("#ui_box .tb_activities.toolbar_activities").hide();
                $("#ui_box .ui_quickbar").hide();
                $("#ui_box .leaves").hide()
            }
            HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst)
        }).appendTo("#ui_box .town_name_area");
        if (HMole.GuiUst.HideCenter) {
            HMole.GuiUst.HideCenter = false;
            $("#ui_box .town_name_area a").click()
        }
        $("#ui_box .nui_main_menu .bottom .slide_button_wrapper").css({
            left: 92,
            top: -2
        });
        $("<a/>", {
            href: "#",
            "class": "button GMHADD",
            style: "left:-4px; top:16px; width:20px; height:18px; background:url('" + HMole.Home + "gui/but.png') -374px -0px;"
        }).click(function () {
            $("#ui_box .nui_main_menu").hide();
            $("#ui_box .nui_left_box").hide();
            $("#ui_box .picomap_area").hide();
            HMole.GuiUst.HideLeft = true;
            HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst)
        }).appendTo("#ui_box .nui_main_menu .bottom");
        $("<a/>", {
            href: "#",
            "class": "button GMHADD",
            style: "left:-152px; top:40px; width:20px; height:18px; background:url('" + HMole.Home + "gui/but.png') -374px -18px;"
        }).click(function () {
            $("#ui_box .nui_main_menu").show();
            $("#ui_box .nui_left_box").show();
            $("#ui_box .picomap_area").show();
            $(".nui_main_menu .middle .content ul").height(295);
            HMole.GuiUst.HideLeft = false;
            HMole.Cookie(HMole.GuiUstCookie, HMole.GuiUst)
        }).appendTo("#ui_box .nui_toolbar .left");
        if (HMole.GuiUst.HideLeft) $("#ui_box .nui_main_menu .bottom a").click();
        var u;
        u = HMole.Cookie(HMole.CookieNew);
        if (u == null) u = "";
        if (u != HMole.sVer) setTimeout("MyHole.Help('HELPTAB3')", 3e3);
        $('<a style="z-index:7; position:absolute; top:3px; left:366px;" href="#"><img src="' + HMole.Home + 'gui/tbaw.png" style="border-width: 0px" /></a></a>').append($("<div/>", {
            id: "MH_mna",
            style: "position:absolute; left:13px; top:-2px; font-family:'Trebuchet MS',Gill,sans-serif; font-size:12px"
        }).html("?")).append($("<div/>", {
            id: "MH_mns",
            style: "position:absolute; left:13px; top:11px; font-family:'Trebuchet MS',Gill,sans-serif; font-size:12px"
        }).html("?")).appendTo("#ui_box");
        setTimeout("IRQ_Timer()", 1e3);
        HMole.STime = 0;
        setTimeout("TimerTick()", 1e3);
        if (HMole.Set.mapGrid) MyHole.MapAdds()
    },
    MapAdds: function () {
        if ($("#map_move_container").length == 0) {
            setTimeout("MyHole.MapAdds()", 100);
            return
        }
        var e = MapTiles.map2Pixel(100, 100);
        $("head").append($("<style/>").append(".HMoleON {border: 1px solid #fff; position: absolute; display: block; z-index: 2; opacity: .1;width: " + e.x + "px; height: " + e.x + "px;}"));
        for (var t = 0; t < 10; t++) {
            for (var n = 0; n < 10; n++) {
                var r = MapTiles.map2Pixel(n * 100, t * 100);
                $("#map_move_container").append($("<div/>", {
                    "class": "HMoleON",
                    style: "left:" + r.x + "px; top:" + r.y + "px; background-image: url(" + HMole.Home + "o/g.png);"
                }))
            }
        }
    },
    LinkMenu: function () {
        var e;
        if ($("#lMenu").length > 0) return;
        e = $("<div/>", {
            id: "lMenu",
            style: "display:block; position:absolute; left:100px; top:260px; height:100px; z-index:10;"
        }).append(GuiEx.Border().append($("<ul/>", {
            style: "text-align:left;"
        }).append($("<li/>", {}).html('<img src="' + HMole.Home + 'e/9/mole.gif"> ' + HMole.Lang.norka)).append($("<li/>", {}).html('<img src="' + HMole.Home + 'e/9/favicon.gif"> Grepolis Stats')).append($("<li/>", {}).html('<img src="' + HMole.Home + 'e/9/gintel.gif"> Grepolis Intel')).append($("<li/>", {}).html('<img src="' + HMole.Home + 'e/9/world.gif"> GP Maps')).append($("<li/>", {}).html('<img src="' + HMole.Home + 'e/9/gfinder.gif"> Grepolis Finder')).append($("<li/>", {}).html('<img src="' + HMole.Home + 'e/9/gforum.gif"> Grepolis Forum')).append($("<li/>", {}).html('<img src="' + Game.img() + '/game/support/menu_icon.png"> Support'))));
        $("#ui_box").append(e);
        $("#lMenu").mouseleave(function () {
            $("#lMenu").remove()
        });
        $.each($("#lMenu ul li"), function (e, t) {
            $(this).css("background-image", "url(" + HMole.Home + "imgs/pu_bg.png)");
            $(this).css("cursor", "pointer");
            $(this).mouseenter(function () {
                $(this).css("background-image", "url(" + HMole.Home + "imgs/pu_bgs.png)")
            });
            $(this).mouseleave(function () {
                $(this).css("background-image", "url(" + HMole.Home + "imgs/pu_bg.png)")
            })
        });
        $("#lMenu ul li").eq(0).click(function () {
            window.open(HMole.Home + "?p=rnk" + HMole.GetHomeUrlParm(), "_blank")
        });
        $("#lMenu ul li").eq(1).click(function () {
            window.open("http://www." + HMole.Language + ".grepostats.com/world/" + Game.world_id + "/player/" + Game.player_id, "_blank")
        });
        $("#lMenu ul li").eq(2).click(function () {
            window.open("http://grepointel.com/track.php?server=" + Game.world_id + "&pn=" + Game.player_name, "_blank")
        });
        $("#lMenu ul li").eq(3).click(function () {
            window.open("http://" + Game.world_id + ".grepolismaps.org/", "_blank")
        });
        $("#lMenu ul li").eq(4).click(function () {
            window.open("http://www.drolez.com/software/grepolis/finder/" + Game.world_id + "/", "_blank")
        });
        $("#lMenu ul li").eq(5).click(function () {
            window.open("http://forum." + HMole.Language + ".grepolis.com/forum.php", "_blank")
        });
        $("#lMenu ul li").eq(6).click(function () {
            WndHandlerPlayerSettings.prototype.supportPopup(800, 600)
        })
    },
    Help: function (e, t) {
        function r(e, n) {
            return $("<li/>").append($("<a/>", {
                "class": "submenu_link",
                href: "#",
                id: "help-" + e,
                rel: e,
                rem: n
            }).click(function () {
                HMole.CQQ = t;
                t.find("li a.submenu_link").removeClass("active");
                var e = t.find("div.gpwindow_content").height();
                $(this).addClass("active");
                if (HMoleAboutWnd != undefined) {
                    HMoleAboutWnd.setContent2(GuiEx.Border().append(MyHole.HelpTabs($(this).attr("rel"))).append("<br><br>"));
                    HMoleAboutWnd.getJQElement().find($("#HMoleBtns")).remove()
                } else {
                    $("#player_settings").GuiEx.Border().append(MyHole.HelpTabs($(this).attr("rel"))).append("<br><br>");
                    t.find($("#HMoleBtns")).remove()
                }
            }).append($("<span/>", {
                "class": "left"
            }).append($("<span/>", {
                "class": "right"
            }).append($("<span/>", {
                "class": "middle",
                title: n
            }).html(n)))))
        }
        if (t == undefined) {
            if (typeof HMoleAboutWnd != "undefined") {
                try {
                    HMoleAboutWnd.close()
                } catch (n) {}
                HMoleAboutWnd = undefined
            }
            HMoleAboutWnd = Layout.dialogWindow.open("", HMole.Lang.norka, 600, 500, MyHole.HelpClose, false);
            HMoleAboutWnd.setHeight([490]);
            HMoleAboutWnd.setPosition(["center", "center"]);
            t = HMoleAboutWnd.getJQElement()
        } else {
            $(".settings-container:first").html = "";
            t = $(".settings-container:first")
        } if (HMole.Language == "pl") {
            t.append($("<div/>", {
                "class": "menu_wrapper",
                style: "left:78px; right:14px"
            }).append($("<ul/>", {
                "class": "menu_inner",
                style: "width: 450px;"
            }).prepend(r("HELPTAB1", HMole.Lang.HELPTAB1)).prepend(r("HELPTAB2", HMole.Lang.HELPTAB2)).prepend(r("HELPTAB3", HMole.Lang.HELPTAB3)).prepend(r("HELPTAB4", HMole.Lang.HELPTAB4)).prepend(r("HELPTAB5", "Co Nowego ?"))))
        } else {
            t.append($("<div/>", {
                "class": "menu_wrapper",
                style: "left:78px; right:14px"
            }).append($("<ul/>", {
                "class": "menu_inner",
                style: "width: 450px;"
            }).prepend(r("HELPTAB1", HMole.Lang.HELPTAB1)).prepend(r("HELPTAB2", HMole.Lang.HELPTAB2)).prepend(r("HELPTAB3", HMole.Lang.HELPTAB3)).prepend(r("HELPTAB4", HMole.Lang.HELPTAB4))))
        }
        var i = 0;
        $.each(t.find($("ul.menu_inner li")), function (e, t) {
            i += $(t).width()
        });
        t.find($("ul.menu_inner")).width(i);
        if (e == null) {
            e = "HELPTAB1"
        }
        $("#help-" + e).click()
    },
    settings: function () {
        function e(e, t, n) {
            if (n == true) n = "1";
            else n = "0";
            return $("<a/>", {
                href: "#",
                id: e,
                sel: n
            }).click(function () {
                if (this.getAttribute("sel") == "1") this.setAttribute("sel", "0");
                else this.setAttribute("sel", "1");
                this.firstChild.src = HMole.Home + "gui/cb" + this.getAttribute("sel") + ".gif"
            }).append($("<img/>", {
                src: HMole.Home + "gui/cb" + n + ".gif",
                style: "position:relative; top:2px;"
            })).append(t + "<br>")
        }

        function t(e, t, n) {
            if (n == true) n = "1";
            else n = "0";
            return $("<a/>", {
                href: "#",
                id: e,
                sel: n
            }).click(function () {
                document.getElementById("rb_st1").firstChild.src = HMole.Home + "gui/rb0.gif";
                document.getElementById("rb_st2").firstChild.src = HMole.Home + "gui/rb0.gif";
                document.getElementById("rb_st3").firstChild.src = HMole.Home + "gui/rb0.gif";
                document.getElementById("rb_st4").firstChild.src = HMole.Home + "gui/rb0.gif";
                this.firstChild.src = HMole.Home + "gui/rb1.gif";
                document.getElementById("rb_st1").setAttribute("sel", "0");
                document.getElementById("rb_st2").setAttribute("sel", "0");
                document.getElementById("rb_st3").setAttribute("sel", "0");
                document.getElementById("rb_st4").setAttribute("sel", "0");
                this.setAttribute("sel", "1")
            }).append($("<img/>", {
                src: HMole.Home + "gui/rb" + n + ".gif",
                style: "position:relative; top:2px;"
            })).append(t + "<br>")
        }
        var n = $("<div/>", {
            style: "padding-left:10px; padding-right:10px"
        }).html("<br><b>" + HMole.Lang.opcje + ":</b><br><br>").append(e("cb_colRep", " " + HMole.Lang.set1, HMole.Set.colRep)).append(e("cb_fheight", " " + HMole.Lang.set2, HMole.Set.fheight)).append(e("cb_ftabs", " " + HMole.Lang.set3, HMole.Set.ftabs)).append(e("cb_stime", " " + HMole.Lang.set4, HMole.Set.stime)).append(e("cb_mapOcean", " " + HMole.Lang.set6, HMole.Set.mapOcean)).append(e("cb_mapGrid", " " + HMole.Lang.set7, HMole.Set.mapGrid)).append(e("cb_smallMenu", " " + HMole.Lang.set8, HMole.Set.smallMenu)).append(e("cb_turboMode", " " + HMole.Lang.set11, HMole.Set.turboMode)).append(e("cb_menu", " " + HMole.Lang.set12, HMole.Set.menu)).append(e("cb_townPrvWindow", " " + HMole.Lang.set13, HMole.Set.townPrvWindow)).append(e("cb_alarm", " " + HMole.Lang.set9, HMole.Set.alarm)).append(GuiEx.aLink(HMole.Lang.HELPTAB4, 12).click(function () {
            MyHole.setAralm()
        })).append($("<div/>", {}).html("<br>" + HMole.Lang.set5 + ":")).append($("<div/>", {
            style: "padding-left:10px"
        }).append(t("rb_st1", " grmh.eu (" + HMole.Lang.norka + ")", HMole.Set.statsGRCL == "grmh")).append(t("rb_st2", " grepostats.com", HMole.Set.statsGRCL == "gstats")).append(t("rb_st3", " grepointel.com", HMole.Set.statsGRCL == "gintel")).append(t("rb_st4", " grepolis.potusek.eu", HMole.Set.statsGRCL == "ptusek"))).append("<br>");
        $(n).append(GuiEx.Button(HMole.Lang.butSDeactiv).click(function () {
            Layout.showConfirmDialog(HMole.Lang.butSDeactiv, HMole.Lang.butSDeactiv + "?", function () {
                HMole.outit()
            })
        }));
        HMole.Set.exCmdList = false;
        $(n).append(HMole.AddBtn(HMole.Lang.repgen).click(function () {
            if (!HMole.Set.stime)
                if ($("#cb_stime").attr("sel") != "0") {
                    HMole.Set.stime = true;
                    HMole.STime = 0;
                    setTimeout("TimerTick()", 1e3)
                }
            var e = false;
            if (HMole.Set.menu != ($("#cb_menu").attr("sel") != "0")) location.reload();
            HMole.Set.colRep = $("#cb_colRep").attr("sel") != "0";
            HMole.Set.fheight = $("#cb_fheight").attr("sel") != "0";
            HMole.Set.ftabs = $("#cb_ftabs").attr("sel") != "0";
            HMole.Set.stime = $("#cb_stime").attr("sel") != "0";
            HMole.Set.mapOcean = $("#cb_mapOcean").attr("sel") != "0";
            HMole.Set.mapGrid = $("#cb_mapGrid").attr("sel") != "0";
            HMole.Set.smallMenu = $("#cb_smallMenu").attr("sel") != "0";
            HMole.Set.alarm = $("#cb_alarm").attr("sel") != "0";
            HMole.Set.exCmdList = $("#cb_exCmdList").attr("sel") != "0";
            HMole.Set.turboMode = $("#cb_turboMode").attr("sel") != "0";
            HMole.Set.menu = $("#cb_menu").attr("sel") != "0";
            HMole.Set.townPrvWindow = $("#cb_townPrvWindow").attr("sel") != "0";
            if ($("#rb_st4").attr("sel") == "1") HMole.Set.statsGRCL = "ptusek";
            else if ($("#rb_st3").attr("sel") == "1") HMole.Set.statsGRCL = "gintel";
            else if ($("#rb_st2").attr("sel") == "1") HMole.Set.statsGRCL = "gstats";
            else HMole.Set.statsGRCL = "grmh";
            HMole.Cookie(HMole.SetCookie, HMole.Set);
            HumanMessage.success(HMole.Lang.MSGHUMAN.OK);
            if (!HMole.Set.exCmdList) {
                HMole.attTownList = {};
                HMole.Cookie("cGMH_attTownList", HMole.attTownList)
            }
            if (HMole.Set.stime == false) {
                $("#hm_TimerH1").css("background-position", "-140px 0px");
                $("#hm_TimerH2").css("background-position", "-140px 0px");
                $("#hm_TimerM1").css("background-position", "-140px 0px");
                $("#hm_TimerM2").css("background-position", "-140px 0px");
                $("#hm_TimerS1").css("background-position", "-140px 0px");
                $("#hm_TimerS2").css("background-position", "-140px 0px");
                $("#hm_TimerD1").css("background-position", "-157px 0px");
                $("#hm_TimerD2").css("background-position", "-157px 0px")
            }
            if (HMole.Set.mapOcean == false)
                if ($("#HMoleOcean").length != 0) $("#HMoleOcean").remove();
            if (HMole.Set.mapGrid == false) $(".HMoleON").remove();
            if (HMole.Set.mapGrid) MyHole.MapAdds()
        }));
        return n
    },
    HelpTabs: function (e) {
        function t(e) {
            if (Game.premium_features[e] == null || Game.premium_user == false) return "-";
            else return day_hr_min_sec(Game.premium_features[e] - Timestamp.now(), true)
        }
        if (e == "HELPTAB1") {
            var n = Game.locale_lang[3] + Game.locale_lang[4];
            n = n.toLowerCase();
            if (n in HMole.CountryNames) n = HMole.CountryNames[n];
            else n = "???";
            var r = $("<div/>", {}).append("<tr><td>" + HMole.Lang.world + ":</td><td>" + Game.world_id.substring(2, Game.world_id.length)).append("<tr><td>" + HMole.Lang.wrdspeed + ":</td><td>" + Game["game_speed"]).append("<tr><td>" + HMole.Lang.country + ":</td><td>" + n).append("<tr><td>Lang:</td><td>" + Game.locale_lang[0] + Game.locale_lang[1]).append("<tr><td>Map Size:</td><td>" + GameData["map_size"] + " x " + GameData["map_size"] + " (" + GameData["map_size"] / 10 + " morza)").append("<tr><td>HeroWorld:</td><td>" + Game["is_hero_world"]).append("<tr><td>Pease Start:</td><td>" + day_hr_min_sec(Game.peace_starts_at - Timestamp.now())).append("<tr><td>Pease Stop:</td><td>" + day_hr_min_sec(Game.peace_ends_at - Timestamp.now())).append("<tr><td>Time Zone:</td><td>" + Game.player_settings.timezone);
            return r
        }
        if (e == "HELPTAB2") {
            var i = ITowns.getTown(Game.townId);
            var s = new Date;
            var r = $("<div/>", {}).append("<tr><td>" + HMole.Lang.name + ":</td><td>" + Game.player_name).append("<tr><td>" + HMole.Lang.ALLY + ":</td><td>" + Game.alliance_name).append("<tr><td>" + HMole.Lang.pldays + ":</td><td>" + Game["player_days_registered"]).append("<tr><td>" + HMole.Lang.citynum + ":</td><td>" + Game["player_villages"]).append("<tr><td>" + HMole.Lang.points + ":</td><td>" + Game["player_points"]).append("<tr><td>" + HMole.Lang.inrank + ":</td><td>" + Game["player_rank"]).append("<tr><td>" + Game.premium_data.curator.name + ":</td><td>" + t("curator")).append("<tr><td>" + Game.premium_data.trader.name + ":</td><td>" + t("trader")).append("<tr><td>" + Game.premium_data.priest.name + ":</td><td>" + t("priest")).append("<tr><td>" + Game.premium_data.commander.name + ":</td><td>" + t("commander")).append("<tr><td>" + Game.premium_data.captain.name + ":</td><td>" + t("captain"));
            return r
        }
        if (e == "HELPTAB3") return HMole.Lang.HLPVERSION + ":" + HMole.sVer + "<iframe width='100%' height='384px' src='" + HMole.Home + "HMRCinst.html?p=cnv&m=ins&sLang=" + Game.market_id + "'></iframe>";
        if (e == "HELPTAB4") return MyHole.settings();
        if (e == "HELPTAB5") {
            var r = $("<div/>", {}).append("Aktualna Wersja :" + HMole.sVer).append("<br><br>Ostatnio Wprowadzone Zmiany:").append("<br> - 10 wprowadzono raport z wojsk poza miastem").append("<br> - 01 wprowadzono Podgląd Miasta w oknie").append("<br> - 22 nowe emotikony :)").append("<br> - 22 alarm blokady CAPTCHA wyłącza się gdy zaczniemy wpisywać kod").append("<br> - 22 alarm blokady CAPTCHA włącza się nie gdy powiadomienie tylko gdy blokada").append("<br> - 22 poprawki w raporcie sytuacyjnym").append("<br> - 12 (wprowadzono poprawki ;)").append("<br> - 09 Alarm włączenia blokady CAPTCHA (a wtedy nie działa zwykły Alarm ataków)").append("<br> - 09 Nowe tło raportów").append("<br> - 08 Poprawiono pare pomniejszych szczegółów w raportach").append("<br> - 08 Poprawiono błędy z podglądem dużych raportów (podczas generacji)").append("<br> - 04 Poprawiono pare błędów z raportami (polecenia zarządcy, ruchy na okupację)").append("<br> - 04 Poprawiono raport sytuacyjny (rozszerzone info o podboju w starym systemie)").append("<br> - 01 Dodano statystyki graczy i sojuszy (wersja tymczasowa)").append("<hr>").append("<br> pytania lub dostrzeżone błędy można słać na TropsyKretts@gmail.com");
            return r
        }
        return "<div id='HMSiteInfo'><center><img src='http://grepolis.com/images/game/ajax-loader.gif'/img></center></div>"
    },
    HelpClose: function () {
        HMole.Cookie(HMole.CookieNew, HMole.sVer);
        HMoleAboutWnd = undefined
    },
    setAralm: function () {
        var e, t, n;
        if (typeof HMoleSetAlarm != "undefined") {
            try {
                HMoleSetAlarm.close()
            } catch (r) {}
            HMoleSetAlarm = undefined
        }
        HMoleSetAlarm = Layout.dialogWindow.open("", HMole.Lang.set9 + " - " + HMole.Lang.HELPTAB4, 650, 550, false, false);
        HMoleSetAlarm.setHeight([550]);
        HMoleSetAlarm.setPosition(["center", "center"]);
        var i = $("<tbody/>", {
            id: "ranking_inner"
        });
        e = 0;
        for (t in HMole.AlarmsURLs)
            if (HMole.AlarmsURLs.hasOwnProperty(t)) {
                if (e % 2) n = $("<tr>", {
                    i: t,
                    "class": "game_table_even top"
                });
                else n = $("<tr>", {
                    i: t,
                    "class": "game_table_odd top"
                });
                n.append("<td>" + (e + 1));
                n.append($("<td>", {
                    id: "asel_" + t,
                    i: t
                }).append("<img src='" + HMole.Home + "gui/cbb0.gif'>").click(function () {
                    $("#asel_" + HMole.Set.alarmSel).html("<img src='" + HMole.Home + "gui/cbb0.gif'>");
                    $(this).html("<img src='" + HMole.Home + "gui/cbb1.gif'>");
                    HMole.Set.alarmSel = $(this).attr("i");
                    $("#HM_ACTUAL").html(HMole.AlarmsURLs[HMole.Set.alarmSel])
                }));
                n.append("<td>" + HMole.AlarmsURLs[t]).append($("<a/>", {
                    href: "#",
                    style: "margin:0 3px 0 0; width:22px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -198px 0px rgba(0, 0, 0, 0) "
                }).mouseout(function () {
                    this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -198px 0px rgba(0, 0, 0, 0)"
                }).click(function () {
                    if ($("#HMolePlayerTry").length > 0) {
                        document.getElementById("HMolePlayerTry").pause();
                        $("#HMolePlayerTry").remove()
                    }
                    $("#ui_box").append($("<audio/>", {
                        id: "HMolePlayerTry"
                    }).html('<source src="' + HMole.AlarmsURLs[$(this).parent().attr("i")] + '" type="audio/mpeg" /><embed hidden="true" loop="true" src="' + HMole.AlarmsURLs[$(this).parent().attr("i")] + '"/>'));
                    if (HMole.Set.alarmLoop) document.getElementById("HMolePlayerTry").addEventListener("ended", function () {
                        this.currentTime = 0;
                        this.play()
                    }, false);
                    document.getElementById("HMolePlayerTry").play();
                    this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                }));
                n.append($("<a/>", {
                    href: "#",
                    style: "margin:0 3px 0 0; width:22px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -198px -46px rgba(0, 0, 0, 0) "
                }).click(function () {
                    if ($("#HMolePlayerTry").length > 0) {
                        document.getElementById("HMolePlayerTry").pause();
                        $("#HMolePlayerTry").remove()
                    }
                }));
                i.append(n);
                e++
            }
        var s = GuiEx.Border().append("Aktualny dzwięk alarmu:").append(GuiEx.Border().append($("<p>", {
            id: "HM_ACTUAL"
        }).html(HMole.AlarmsURLs[HMole.Set.alarmSel]))).append(GuiEx.aLink(HMole.Lang.show, 12).click(function () {
            HMole.AlarmStart()
        })).append("<br>").append($("<div/>", {
            "class": "game_inner_box ranking_table"
        }).append($("<div/>", {
            "class": "ranking_table_body global_ranking"
        }).append($("<table>", {
            "class": "game_header bold",
            style: "width:100%; border-bottom: 1px solid #D0BE97;"
        }).append($("<thead>").append($("<tr>").append("<th>------------------> DOSTĘPNE DZWONKI <------------------")))).append($("<div/>", {
            id: "ranking_table_wrapper"
        }).append($("<table>", {
            id: "citys_info_table_scroll",
            "class": "game_table",
            style: "overflow-y: auto; overflow-x: hidden;",
            cellspacing: "0"
        }).append(i)))));
        s.append('<div class="game_border_top"></div>');
        n = "0";
        if (HMole.Set.alarmLoop) n = "1";
        s.append($("<a/>", {
            href: "#",
            sel: n
        }).click(function () {
            if (this.getAttribute("sel") == "1") {
                this.setAttribute("sel", "0");
                HMole.Set.alarmLoop = false
            } else {
                this.setAttribute("sel", "1");
                HMole.Set.alarmLoop = true
            }
            this.firstChild.src = HMole.Home + "gui/cb" + this.getAttribute("sel") + ".gif"
        }).append($("<img/>", {
            src: HMole.Home + "gui/cb" + n + ".gif",
            style: "position:relative; top:2px;"
        })).append(" Odgrywaj Wielokrotnie<br>"));
        HMoleSetAlarm.appendContent(s, 420);
        $("#asel_" + HMole.Set.alarmSel).html("<img src='" + HMole.Home + "gui/cbb1.gif'>")
    },
    setbAralm: function () {
        var e, t, n;
        if (typeof HMoleSetAlarm != "undefined") {
            try {
                HMoleSetAlarm.close()
            } catch (r) {}
            HMoleSetAlarm = undefined
        }
        HMoleSetAlarm = Layout.dialogWindow.open("", HMole.Lang.set99 + " - " + HMole.Lang.HELPTAB4, 650, 550, false, false);
        HMoleSetAlarm.setHeight([550]);
        HMoleSetAlarm.setPosition(["center", "center"]);
        var i = $("<tbody/>", {
            id: "ranking_inner"
        });
        e = 0;
        for (t in HMole.AlarmsURLs)
            if (HMole.AlarmsURLs.hasOwnProperty(t)) {
                if (e % 2) n = $("<tr>", {
                    i: t,
                    "class": "game_table_even top"
                });
                else n = $("<tr>", {
                    i: t,
                    "class": "game_table_odd top"
                });
                n.append("<td>" + (e + 1));
                n.append($("<td>", {
                    id: "asel_" + t,
                    i: t
                }).append("<img src='" + HMole.Home + "gui/cbb0.gif'>").click(function () {
                    $("#asel_" + HMole.Set.balarmSel).html("<img src='" + HMole.Home + "gui/cbb0.gif'>");
                    $(this).html("<img src='" + HMole.Home + "gui/cbb1.gif'>");
                    HMole.Set.balarmSel = $(this).attr("i");
                    $("#HM_ACTUAL").html(HMole.AlarmsURLs[HMole.Set.alarmSel])
                }));
                n.append("<td>" + HMole.AlarmsURLs[t]).append($("<a/>", {
                    href: "#",
                    style: "margin:0 3px 0 0; width:22px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -198px 0px rgba(0, 0, 0, 0) "
                }).mouseout(function () {
                    this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -198px 0px rgba(0, 0, 0, 0)"
                }).click(function () {
                    if ($("#HMolePlayerTry").length > 0) {
                        document.getElementById("HMolePlayerTry").pause();
                        $("#HMolePlayerTry").remove()
                    }
                    $("#ui_box").append($("<audio/>", {
                        id: "HMolePlayerTry"
                    }).html('<source src="' + HMole.AlarmsURLs[$(this).parent().attr("i")] + '" type="audio/mpeg" /><embed hidden="true" loop="true" src="' + HMole.AlarmsURLs[$(this).parent().attr("i")] + '"/>'));
                    if (HMole.Set.balarmLoop) document.getElementById("HMolePlayerTry").addEventListener("ended", function () {
                        this.currentTime = 0;
                        this.play()
                    }, false);
                    document.getElementById("HMolePlayerTry").play();
                    this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                }));
                n.append($("<a/>", {
                    href: "#",
                    style: "margin:0 3px 0 0; width:22px; height:23px; float:left; background:url('" + HMole.Home + "gui/but.png') repeat scroll -198px -46px rgba(0, 0, 0, 0) "
                }).click(function () {
                    if ($("#HMolePlayerTry").length > 0) {
                        document.getElementById("HMolePlayerTry").pause();
                        $("#HMolePlayerTry").remove()
                    }
                }));
                i.append(n);
                e++
            }
        var s = GuiEx.Border().append("Aktualny dzwięk alarmu:").append(GuiEx.Border().append($("<p>", {
            id: "HM_ACTUAL"
        }).html(HMole.AlarmsURLs[HMole.Set.balarmSel]))).append("<br>").append($("<div/>", {
            "class": "game_inner_box ranking_table"
        }).append($("<div/>", {
            "class": "ranking_table_body global_ranking"
        }).append($("<table>", {
            "class": "game_header bold",
            style: "width:100%; border-bottom: 1px solid #D0BE97;"
        }).append($("<thead>").append($("<tr>").append("<th>------------------> DOSTĘPNE DZWONKI <------------------")))).append($("<div/>", {
            id: "ranking_table_wrapper"
        }).append($("<table>", {
            id: "citys_info_table_scroll",
            "class": "game_table",
            style: "overflow-y: auto; overflow-x: hidden;",
            cellspacing: "0"
        }).append(i)))));
        s.append('<div class="game_border_top"></div>');
        n = "0";
        if (HMole.Set.balarmLoop) n = "1";
        s.append($("<a/>", {
            href: "#",
            sel: n
        }).click(function () {
            if (this.getAttribute("sel") == "1") {
                this.setAttribute("sel", "0");
                HMole.Set.balarmLoop = false
            } else {
                this.setAttribute("sel", "1");
                HMole.Set.balarmLoop = true
            }
            this.firstChild.src = HMole.Home + "gui/cb" + this.getAttribute("sel") + ".gif"
        }).append($("<img/>", {
            src: HMole.Home + "gui/cb" + n + ".gif",
            style: "position:relative; top:2px;"
        })).append(" Odgrywaj Wielokrotnie<br>"));
        HMoleSetAlarm.appendContent(s, 420);
        $("#asel_" + HMole.Set.balarmSel).html("<img src='" + HMole.Home + "gui/cbb1.gif'>")
    },
    statsWnd: function (e) {
        var t, n;
        HMoleNode = $("<div/>", {
            id: "HMoleNode"
        });
        if (e == true) n = HMole.Lang.STATSA + ": " + HMole._ally_name;
        else n = HMole.Lang.STATS + ": " + HMole._player_name; if (HMole.Set.statsGRCL != "grepointel" && HMole._ally == null && e == true) {
            if (!HMole.PlayerLoaded) {
                HMole.LoadPlayers();
                setTimeout(function () {
                    MyHole.statsWnd(e)
                }, 1500);
                return
            }
            HMole._ally = HMole.GetAllyIdByName(HMole._ally_name);
            if (HMole._ally == null) return
        }
        if (HMole.Set.statsGRCL != "grepointel" && HMole._player == null && e != true) {
            if (!HMole.PlayerLoaded) {
                HMole.LoadPlayers();
                setTimeout(function () {
                    MyHole.statsWnd(e)
                }, 1500);
                return
            }
            HMole._player = HMole.GetPalyerIdByName(HMole._player_name);
            if (HMole._player == null) return
        }
        if (HMole.Set.statsGRCL == "gstats") {
            if (e == true) t = "http://" + Game.market_id + ".grepostats.com/world/" + Game.world_id + "/alliance/" + HMole._ally;
            else t = "http://" + Game.market_id + ".grepostats.com/world/" + Game.world_id + "/player/" + HMole._player;
            HMoleNode.append($("<iframe/>", {
                src: t,
                style: "width:970px; height:480px;"
            }));
            Layout.dialogWindow.open(HMoleNode.html().toString(), n, 970, 480, null, true).setPosition("center", "center")
        } else {
            if (HMole.Set.statsGRCL == "gintel") {
                if (e == true) t = "http://grepointel.com/alliance.php?server=" + Game.world_id + "&an=" + HMole._ally_name;
                else t = "http://grepointel.com/track.php?server=" + Game.world_id + "&pn=" + HMole._player_name + "&rt=overview";
                HMoleNode.append($("<iframe/>", {
                    src: t,
                    style: "width:1020px; height:580px;"
                }));
                Layout.dialogWindow.open(HMoleNode.html().toString(), n, 1020, 580, null, true).setPosition("center", "center")
            } else {
                if (HMole.Set.statsGRCL == "ptusek") {
                    if (e == true) t = "http://grepolis.potusek.eu/light/alliance/" + Game.world_id + "/" + HMole._ally + "/" + Game.locale_lang;
                    else t = "http://grepolis.potusek.eu/light/player/" + Game.world_id + "/" + HMole._player + "/" + Game.locale_lang;
                    HMoleNode.append($("<iframe/>", {
                        src: t,
                        style: "width:820px; height:625px;"
                    }));
                    Layout.dialogWindow.open(HMoleNode.html().toString(), n, 820, 690, function () {}, true).setPosition("center", "center")
                } else {
                    if (e == true) t = HMole.Home + "miniform.html/?p=al&land=" + Game.market_id + "&world=" + Game.world_id.substring(2, Game.world_id.length) + "&ally=" + HMole._ally;
                    else t = HMole.Home + "miniform.html/?p=pl&land=" + Game.market_id + "&world=" + Game.world_id.substring(2, Game.world_id.length) + "&plid=" + HMole._player;
                    HMoleNode.append($("<iframe/>", {
                        src: t,
                        style: "width:100%; height:100%;"
                    }));
                    Layout.dialogWindow.open(HMoleNode.html().toString(), n, 918, 704, function () {}, true).setPosition("center", "center")
                }
            }
        }
    },
    TownIndexWindowOpen: function () {
        if ($("#TownOverview_extra").length > 0) return;
        if (typeof wndTownOverview != "undefined") {
            try {
                wndTownOverview.close()
            } catch (e) {}
            wndTownOverview = undefined
        }
        wndTownOverview = Layout.dialogWindow.open("", "Town Overview", 800, 600, MyHole.TownIndexWindowClose, true);
        wndTownOverview.setPosition("center", "center");
        wndTownOverview.appendContent($("<div/>", {
            id: "TownOverview_extra"
        }), 420);
        $("#ui_box .ui_city_overview:first").appendTo("#TownOverview_extra");
        $("#ui_box .ui_construction_queue:first").appendTo("#TownOverview_extra");
        $("#TownOverview_extra .town_background").css({
            top: -360,
            left: -660
        })
    },
    TownIndexWindowClose: function () {
        $("#TownOverview_extra .ui_city_overview:first").appendTo("#ui_box");
        $("#TownOverview_extra .ui_construction_queue:first").appendTo("#ui_box");
        $("#ui_box .picomap_area .bull_eye_buttons .rb_map .option.island_view").click()
    }
};
HMoleLangArrayENG = {
    rep: {
        ga1: ["A ray of light breaks through the clouds,\na chariot descends and follows the city.", "The selected city receives a chariot.", ""],
        ga2: ["Dark clouds appear over the city.\nLightning hit the building and damaged it.", "Random building in the city losing 1 level.", ""],
        ga4: ["Zeus tears up the sky with lightning bolts\nand tosses soldiers through the air.\nSome cling to trees, other swallow the sky.", "Destroys 10-30% of the attacking land units.", ""],
        gb1: ["Brave warriors hear the call for help\nand rush into the city of the patroness.", "The city receives 5 random units.", ""],
        gb2: ["An owl circles above the enemy troops\nand reports about their strength.", "You receive an espionage report\nabout an incoming enemy troop.", ""],
        gb3: ["A ray of light breaks through the clouds.\nAthena spreads her shield across the city.", "You can't throw any spells on the city.", "The city received protection"],
        gc1: ["Wood washes up on the city shore.\nPoseidon is showing himself from his good side.", "The city receives 800 wood.", ""],
        gc2: ["Strong waves break against the shore.\nThe workers imbues wonderful voice of the sea.", "All construction orders in the harbor\nare accelerated.", "Speed of the harbor increased by 100%"],
        gc3: ["The ground shifts and quakes.Large chunks\nof the city wall plummet into the depths.", "The city wall loses 1-3 levels.", ""],
        gc4: ["Poseidon rises and his waves beat against the ships.\nIt's not a good day for seafarers.", "Destroys 10-30% of the\nrandomly selected ships.", ""],
        gd1: ["Noblemen come from all the surrounding lands\nto bring presents to the king's marrying daughter.", "The city receives 200 pieces\nof each raw material.", ""],
        gd2: ["At night, Hera places a warming veil around the\nworkers and cools them gently in the mid-day heat.", "Increases the production\nof raw materials in mines.", "Production has been increased by 50%"],
        gd3: ["Another proud warrior has been born.\nHera means this city well.", "In the barracks, all recruitment\nassigned are accelerated.", "Speed of the barracks increased by 100%"],
        ge1: ["Hades show his justice and punish\nthe dissolved inhabitants terrible epidemic.", "Reduces the basic production\nof raw materials.", "Production reduced by 50%"],
        ge3: ["The ground opens up\nand grants you access to incredible riches.", "The city receives 500 silver coins.", ""]
    },
    norka: "Monty Hole",
    konwrap: "Report Converter",
    repRec: "Remember Report",
    repPla: "Saved Report",
    repCfg: "Configure Report",
    insert: "Insert",
    opcje: "Options",
    set0: "Show converted reports instead of the normal",
    set1: "Modify the appearance of the converted reports",
    set2: "Enlarge window of alliance forum to 80% height of screen",
    set3: "In alliance forum show all bookmarks",
    set4: "In the menu on the left show increased time from the server",
    set5: "To preview the statistics use information from the site",
    set6: "On the map show the current ocean",
    set7: "On the map show the cartographic grid",
    set8: "Less menu",
    set9: "Attacks alarm",
    set99: "CAPTCHA locked alarm (This lock blocks the attacks alarm)",
    set10: "Modify list of upcoming troops",
    set11: "Enable accelerated (for slow computers)",
    set12: "Change the standard menu for other",
    set13: "Always turn the city preview to window mode",
    name: "Name",
    pldays: "Count of Play Days",
    citynum: "Number of Cities",
    points: "Points",
    inrank: "In Ranking",
    world: "World",
    wrdspeed: "​World's Speed",
    country: "Country",
    unisbeyondcity: "Troops out of the city",
    reprv: "Report Preview",
    repopt: "Conversion Options",
    repwzo: "Pattern",
    repwzo1: "Normal",
    show: "Show",
    hide: "Hide",
    title: "Title",
    date: "Date",
    repgen: "Apply Changes",
    selTroops: "Designations attacks",
    UNSUP: "Army defending",
    unisupcity: "Army defending town",
    UNINCO: "Army imminent",
    incoming: "Troops approaching to the city",
    incozero: "No incoming troops",
    incoown: "belonging to the",
    incoocu: "occupied by",
    supontar: "Support Occurred to Target",
    cost: "Costs",
    zniszczone: "Destroyed",
    stracone: "Lost",
    zdobyte: "Gained",
    zdobres: "Gained Resources",
    wykwoj: "Detected Army",
    spelleff: "Spell Effect",
    spelltime: "Duration of the spell",
    spellend: "End of the Spell",
    occupant: "Occupant",
    occuend: "End of Siege",
    unitsinoccu: "All troops in the besieged city",
    wallShow: "Show defeated from",
    wallShowA: "beginning of the game",
    wallShowB: "last reset",
    btnReset: "Reset",
    butSDeactiv: "Deactivate Appendix",
    butSActivate: "click to activate the add-on",
    by: "by",
    yes: "Yes",
    no: "No",
    lack: "Lack",
    above: "Above",
    god: "God",
    resPhalanx: "Phalanx",
    resRam: "Ram",
    situation: "Situation",
    report: "Report",
    inAtt: "Imminent Attacks",
    inDef: "Imminent Supports",
    curInci: "Current Incitement",
    startRevolt: "Start of Revolt",
    endRevolt: "End Revolt",
    curRevolt: "Current Revolt",
    WEBSITE: "Website",
    AUTHOR: "Author",
    BTNCONV: "Convert",
    BTNGENER: "Generate",
    BTNSRC: "Source",
    BTNVIEW: "Preview",
    BTNSAVE: "Save",
    BTNMARKS: "Mark as read",
    BTNMARKA: "Mark all as read",
    MSGTITLE: "Convert report",
    MSGQUEST: "Which of the data you want to publish?",
    MSGALL: "All",
    MSGBBCODE: "Following the publication of the report, you can pair it with news and forums using the BBCode.",
    MSGRESOURCE: "Loot",
    MSGUNITS: "Units",
    MSGBUILD: "Buildings",
    MSGUSC: "Used silver coins",
    MSGRAW: "Raw materials",
    SUPPORT: "Support",
    SPY: "Spying",
    CONQUER: "Conquered",
    LOSSES: "Losses",
    HIDDEN: "Hidden",
    NOTUNIT: "None",
    TOWN: "Town",
    PLAYER: "Player",
    ALLY: "Ally",
    CAST: "cast",
    ONTOWER: "On the town",
    MSGHIDAD: "Hide cities",
    MSGFORUM: "The report will be published",
    BBALLY: "alliance forums / in the message",
    BBFORUM: "external forum",
    ERRGETSRC: "An error occurred! Please, generate the source and send as an attachment to TropsyKretts@gmail.com",
    ICOCLOSE: "Close",
    ICOHELP: "About converter",
    MSGPREVIEW: "<b>Report preview</b>",
    HELPTAB1: "World Info",
    HELPTAB2: "Player Info",
    HELPTAB3: "Instruction",
    HELPTAB4: "Settings",
    HLPVERSION: "Version",
    HLPFIXED: "Fixed",
    HLPADDED: "Added",
    MSGHUMAN: {
        OK: "The information has been saved",
        ERROR: "An error occurred while writing"
    },
    STATS: "Player Stats",
    STATSA: "Alliance Stats",
    STATSPOINT: "Points",
    STATSRANK: "Rank",
    LABELS: {
        attack: {
            ATTACKER: "Attacker",
            DEFENDER: "Defender",
            MSGHIDAT: "attacker",
            MSGHIDDE: "defender",
            MSGATTUNIT: "Army attacking",
            MSGDEFUNIT: "Army defenders"
        },
        support: {
            ATTACKER: "Supporting",
            DEFENDER: "Supported",
            MSGHIDAT: "supporting",
            MSGHIDDE: "supported",
            MSGATTUNIT: "Army supporting",
            MSGDEFUNIT: "Army defenders"
        },
        espionage: {
            ATTACKER: "Spy",
            DEFENDER: "Spied",
            MSGHIDAT: "spy",
            MSGHIDDE: "spied",
            MSGATTUNIT: "",
            MSGDEFUNIT: ""
        }
    },
    MSGDETAIL: "command details",
    MSGRETURN: "(return)",
    MSGCLAIM: "city ​​reserves",
    MSGCLAIMPPUP: "Generate reservation",
    MSGGENBBCODE: "Generate a list of BBCode",
    MSGDEFSITE: "Defeated...",
    MSGLOSSITE: "Losses...",
    MSGASATT: "...as an attacker",
    MSGASDEF: "...as a defender",
    MSGDIFF1: "do not show differences",
    MSGDIFF2: "show differences",
    MSGDIFF3: "show only the differences",
    BBCODELIMIT: "In view of the limited amount of text in one post, in the case of a long list, the data were divided into groups. Each group paste as a separate entry.",
    CHKPOWERNAME: "Display time remaining to the possibility of using the spell",
    CHKNIGHTNAME: "Obscures the city in night bonus",
    CHKFORUMTABS: "Replace scrolls the tabs on the forum for multi line",
    BTNRESERVE: "Booking",
    LNKRESERVE: "Reservations",
    LBLGETRESER: "Getting data ...",
    CHKCMDIMG: "View the icons for the destination city commands",
    STATSLINK: "Statistics from the display",
    SUPPLAYERS: "List of Players",
    CHKUNITSCOST: "The report showing the cost of lost units"
};
(function () {
    if (typeof MoleHole != "undefined") return;
    MoleHole = "runned";
    $("#loader_content").append($("<img/>", {
        id: "HMoleLoading",
        src: HMole.Home + "gui/load1.gif"
    }));
    HMole.ScriptAtcive = HMole.Cookie("cGMH_ScriptAtcive");
    if (HMole.ScriptAtcive != true && HMole.ScriptAtcive != false) {
        HMole.ScriptAtcive = true;
        HMole.Cookie("cGMH_ScriptAtcive", true)
    }
    if (HMole.ScriptAtcive != true) {
        setTimeout("HMoleLoad()", 100);
        return
    }
    HMole.init();
    $(document).ready(function () {
        setTimeout("MyHole.init()", 100)
    })
})();
var GuiEx = {
    Border: function () {
        return $("<div/>", {
            "class": "game_border"
        }).append($("<div/>", {
            "class": "game_border_top"
        })).append($("<div/>", {
            "class": "game_border_bottom"
        })).append($("<div/>", {
            "class": "game_border_left"
        })).append($("<div/>", {
            "class": "game_border_right"
        })).append($("<div/>", {
            "class": "game_border_corner corner1"
        })).append($("<div/>", {
            "class": "game_border_corner corner2"
        })).append($("<div/>", {
            "class": "game_border_corner corner3"
        })).append($("<div/>", {
            "class": "game_border_corner corner4"
        }))
    },
    Border2: function (e, t, n) {
        var r = $("<div/>");
        $(r).append($("<div/>", {
            "class": "box top left"
        }).append($("<div/>", {
            "class": "box top right"
        }).append($("<div/>", {
            "class": "box top center"
        }))));
        $(r).append($("<div/>", {
            "class": "box middle left"
        }).append($("<div/>", {
            "class": "box middle right"
        }).append($("<div/>", {
            "class": "box middle center",
            style: "height:" + n + "px;"
        }).append($("<span/>", {
            "class": "town_name"
        }).html(e)).append(t))));
        $(r).append($("<div/>", {
            "class": "box bottom left"
        }).append($("<div/>", {
            "class": "box bottom right"
        }).append($("<div/>", {
            "class": "box bottom center"
        }))));
        return r
    },
    BorderLight: function (e, t) {
        var n = $("<div/>");
        $(n).append($("<div/>", {
            "class": "box top left"
        }).append($("<div/>", {
            "class": "box top right"
        }).append($("<div/>", {
            "class": "box top center"
        }))));
        $(n).append($("<div/>", {
            "class": "box middle left"
        }).append($("<div/>", {
            "class": "box middle right"
        }).append($("<div/>", {
            "class": "box middle center"
        }).append($("<span/>", {
            "class": "town_name"
        }).html(e)).append($("<div/>", {
            "class": "box_content"
        }).html(t)))));
        $(n).append($("<div/>", {
            "class": "box bottom left"
        }).append($("<div/>", {
            "class": "box bottom right"
        }).append($("<div/>", {
            "class": "box bottom center"
        }))));
        return n
    },
    RepPrvBorderLight: function (e, t) {
        var n = $("<div/>");
        $(n).append($("<div/>", {
            "class": "box top left"
        }).append($("<div/>", {
            "class": "box top right"
        }).append($("<div/>", {
            "class": "box top center"
        }))));
        $(n).append($("<div/>", {
            "class": "box middle left"
        }).append($("<div/>", {
            "class": "box middle right"
        }).append($("<div/>", {
            "class": "box middle center"
        }).append($("<span/>", {
            "class": "town_name",
            style: "float:left;"
        }).html(e).append($("<div/>", {
            id: "HMoleRepParts"
        }))).append($("<div/>", {
            "class": "box_content"
        }).html(t)))));
        $(n).append($("<div/>", {
            "class": "box bottom left"
        }).append($("<div/>", {
            "class": "box bottom right"
        }).append($("<div/>", {
            "class": "box bottom center"
        }))));
        return n
    },
    But: function (e, t) {
        return $("<a/>", {
            href: "#",
            style: t + "width:22px; height:23px; background:url('" + HMole.Home + "gui/but.png') repeat scroll " + -e * 22 + "px 0px rgba(0, 0, 0, 0) "
        }).mouseout(function () {
            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll " + -e * 22 + "px 0px rgba(0, 0, 0, 0)"
        }).mouseover(function () {
            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll " + -e * 22 + "px -23px rgba(0, 0, 0, 0)"
        })
    },
    Button: function (e) {
        return $("<a/>", {
            "class": "button",
            href: "#",
            style: "float:top"
        }).append($("<span/>", {
            "class": "left"
        }).append($("<span/>", {
            "class": "right"
        }).append($("<span/>", {
            "class": "middle"
        }).text(e))).append($("<span/>", {
            style: "clear:both;"
        })))
    },
    ProgressBar: function (e) {
        return $("<div/>", {
            "class": "single-progressbar",
            id: e
        }).append($("<div/>", {
            "class": "border_l"
        })).append($("<div/>", {
            "class": "border_r"
        })).append($("<div/>", {
            "class": "body"
        })).append($("<div/>", {
            "class": "progress"
        }).append($("<div/>", {
            "class": "indicator",
            style: "width: 0%;"
        }))).append($("<div/>", {
            "class": "caption"
        }).append($("<span/>", {
            "class": "text"
        })))
    },
    gLink: function (e, t) {
        return $("<div/>", {
            style: "color:#ECB44D; font-size:" + t + "px; font-weight:bold; line-height:12px; cursor:pointer;"
        }).html(e).mouseout(function () {
            this.style.color = "#ECB44D"
        }).mouseover(function () {
            this.style.color = "#EEDDBB"
        })
    },
    bLink: function (e, t) {
        return $("<div/>", {
            style: "color:#53C6FF; font-size:" + t + "px; font-weight:bold; line-height:12px; cursor:pointer;"
        }).html(e).mouseout(function () {
            this.style.color = "#53C6FF"
        }).mouseover(function () {
            this.style.color = "#80FFFF"
        })
    },
    aLink: function (e, t) {
        return $("<div/>", {
            style: "color:#800080; font-size:" + t + "px; font-weight:bold; line-height:12px; cursor:pointer;"
        }).html(e).mouseout(function () {
            this.style.color = "#800080"
        }).mouseover(function () {
            this.style.color = "#400040"
        })
    },
    CheckBox: function (e, t, n) {
        if (n == true) n = "1";
        else n = "0";
        return $("<a/>", {
            href: "#",
            id: e,
            sel: n
        }).click(function () {
            if (this.getAttribute("sel") == "1") this.setAttribute("sel", "0");
            else this.setAttribute("sel", "1");
            this.firstChild.src = HMole.Home + "gui/cb" + this.getAttribute("sel") + ".gif"
        }).append($("<img/>", {
            src: HMole.Home + "gui/cb" + n + ".gif",
            style: "position:relative; top:2px;"
        })).append(" " + t + "<br>")
    },
    CheckBoxVal: function (e) {
        if ($("#" + e).attr("sel") == 1) return true;
        return false
    }
}

function TimerTick() {
    var e, t;
    if (!HMole.ScriptAtcive) return;
    if (!HMole.Set.stime) return;
    if (HMole.LTime != Timestamp.last_servertime_update) {
        HMole.LTime = Timestamp.last_servertime_update;
        HMole.STime = 32
    }
    t = Timestamp.serverTime();
    e = 1e3;
    if (HMole.STime < 40) {
        HMole.STime++;
        e = 250
    }
    setTimeout("TimerTick()", e);
    e = getHumanReadableTimeDate(t);
    $("#hm_TimerH1").css("background-position", "-" + e[0] * 14 + "px 0px");
    $("#hm_TimerH2").css("background-position", "-" + e[1] * 14 + "px 0px");
    $("#hm_TimerM1").css("background-position", "-" + e[3] * 14 + "px 0px");
    $("#hm_TimerM2").css("background-position", "-" + e[4] * 14 + "px 0px");
    $("#hm_TimerS1").css("background-position", "-" + e[6] * 14 + "px 0px");
    $("#hm_TimerS2").css("background-position", "-" + e[7] * 14 + "px 0px");
    $("#hm_TimerD1").css("background-position", "-154px 0px");
    $("#hm_TimerD2").css("background-position", "-154px 0px")
}

function IRQ_Timer() {
    if (!HMole.ScriptAtcive) return;
    setTimeout("IRQ_Timer()", 1e3);
    if (HMole.Set.townPrvWindow)
        if ($("#ui_box .ui_city_overview:first").length > 0)
            if ($("#ui_box .ui_city_overview:first").css("display") != "none") HMole.TownOverwiew = true;
    if (HMole.TownOverwiew) {
        HMole.TownOverwiew = false;
        MyHole.TownIndexWindowOpen()
    }
    if (!HMole.Set.turboMode) IRQ_Timer2();
    else {
        HMole.tick++;
        if (HMole.tick > 1) {
            HMole.tick = 0;
            $("html").css("background", "none");
            $("body").css("background", "none");
            $('#map_tiles div[id^="tile_"]').remove();
            IRQ_Timer2()
        }
    }
}

function IRQ_Timer2() {
    var e, t, n, r, i;
    if (HMole.dodaj == "inv")
        if ($(".slots:first").length > 0) {
            HMole.dodaj = "";
            if ($(".slots a#butCNVmoves").length == 0) {
                HMole.AddCnvBtn("butCNVmoves", "").click(function () {
                    HMole.RepType = "inventory";
                    HMoleData(null, true);
                    this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
                }).appendTo($(".slots:first"));
                HMole.AddCnvBtnS("butCNVSname", "").click(function () {
                    HMole.RepType = "inventory";
                    HMoleData(null, false)
                }).appendTo($(".slots:first"))
            }
        }
    if (HMole.Set.alarm && $(".activity.attack_indicator").length != 0) {
        n = $(".activity.attack_indicator.active div.hover_state div.icon div.count.js-caption").html();
        if (n == undefined) n = 0;
        else n = parseInt(n); if (n > HMole.numAttacks) HMole.AlarmStart();
        if (n != HMole.numAttacks) {
            HMole.numAttacks = n;
            HMole.Cookie("cGMH_numAttacks", HMole.numAttacks)
        }
        if (n == 0 && HMole.AlarmActive != false) {
            HMole.AlarmActive = false;
            document.getElementById("HMolePlayer").pause();
            $("#HMolePlayer").remove()
        }
    }
    if (HMole.Set.smallMenu) {
        $(".nui_main_menu .middle .content ul li").each(function (e) {
            $(this).height("23px")
        });
        $(".nui_main_menu .middle .content ul").height(208)
    }
    if (HMole.Set.mapOcean && $("#map_move_container").length != 0) {
        if ($("#HMoleOcean").length == 0) $("#map").append($("<div/>", {
            id: "HMoleOcean"
        }).append($("<div/>", {
            style: "left:220px; top:60px; position:absolute; display:block; z-index:2; opacity:.5; width:64px; height:76px; background-image:url(" + HMole.Home + "gui/bdigi.png);"
        })).append($("<div/>", {
            style: "left:290px; top:60px; position:absolute; display:block; z-index:2; opacity:.5; width:64px; height:76px; background-image:url(" + HMole.Home + "gui/bdigi.png);"
        })));
        var n = MapTiles.pixel2Map(WMap.scroll.x + (WMap.size.x >> 1) + (MapTiles.tileSize.x >> 1), WMap.scroll.y + (WMap.size.y >> 1) + (MapTiles.tileSize.y >> 1));
        n.x = Math.floor(n.x / 100) * 76;
        n.y = Math.floor(n.y / 100) * 76;
        $("#HMoleOcean").children().eq(0).css("background-position", "0px -" + n.x + "px");
        $("#HMoleOcean").children().eq(1).css("background-position", "0px -" + n.y + "px")
    }
    if (HMole.Set.menu) {
        if (!HMole.MenuUpdated) {
            if ($(".nui_main_menu .reports.main_menu_item .name_wrapper .name").html() != undefined) {
                HMole.MenuUpdated = true;
                n = $(".nui_main_menu .reports.main_menu_item .name_wrapper .name").html().trim();
                $("#Menu_5").mousePopup(new MousePopup(n));
                n = $(".nui_main_menu .ranking.main_menu_item .name_wrapper .name").html().trim(), $("#Menu_6").mousePopup(new MousePopup(n));
                n = $(".nui_main_menu .alliance.main_menu_item .name_wrapper .name").html().trim(), $("#Menu_7").mousePopup(new MousePopup(n));
                n = $(".nui_main_menu .messages.main_menu_item .name_wrapper .name").html().trim(), $("#Menu_8").mousePopup(new MousePopup(n));
                n = $(".nui_main_menu .allianceforum.main_menu_item .name_wrapper .name").html().trim();
                $("#Menu_9").mousePopup(new MousePopup(n));
                n = HMole.Pop($("#ui_box .picomap_area .bull_eye_buttons .rb_map .option.city_overview"));
                $("#Menu_3").mousePopup(new MousePopup(n));
                n = "Links";
                $("#Menu_4").mousePopup(new MousePopup(n));
                $("#popup_div").hide()
            }
        }
        n = $(".nui_main_menu .reports.main_menu_item .button_wrapper .indicator").html();
        if (n == "0") n = "";
        $("#Menu_5N").html(n);
        n = $(".nui_main_menu .messages.main_menu_item .button_wrapper .indicator").html();
        if (n == "0") n = "";
        $("#Menu_8N").html(n);
        n = $(".nui_main_menu .allianceforum.main_menu_item .button_wrapper .indicator").html();
        if (n == "0") n = "";
        $("#Menu_9N").html(n)
    }
    if (HMole.cma.unit_movements != undefined) {
        e = n = 0;
        for (i = 0; i < HMole.cma.unit_movements.length; i++) {
            if (HMole.cma.unit_movements[i].incoming != true) continue;
            if (HMole.cma.unit_movements[i].incoming_attack == true) e++;
            if (HMole.cma.unit_movements[i].type == "support") n++
        }
        if (e != 0) $("#MH_mna").css("color", "#FF0000");
        else $("#MH_mna").css("color", "#808080");
        $("#MH_mna").html(e);
        if (n != 0) $("#MH_mns").css("color", "#00FFFF");
        else $("#MH_mns").css("color", "#808080");
        $("#MH_mns").html(n)
    }
}

function HMoleLoad() {
    if (location.pathname.indexOf("game") != -1) {
        var e = "click to activate";
        if (HMole.Lang.butSActivate != undefined) e = HMole.Lang.butSActivate;
        $("#HMoleDisabled").remove();
        $("#ui_box").append($("<img/>", {
            src: HMole.Home + "gui/klatka.gif",
            id: "HMoleDisabled",
            style: "position:absolute; bottom:10px; left:50px; z-index:1000"
        }).mousePopup(new MousePopup(e)).click(function () {
            $("#HMoleDisabled").attr("src", HMole.Home + "gui/klatkafree.gif");
            HMole.ScriptAtcive = true;
            HMole.Cookie("cGMH_ScriptAtcive", true);
            HMole.AnimStep = 0;
            setTimeout("HMoleAnimActivation()", 100)
        }));
        return
    }
    setTimeout("HMoleLoad()", 100)
}

function HMoleAnimDezadeactivation() {
    var e;
    switch (HMole.AnimStep) {
    case 0:
        $("#ui_box").append($("<img/>", {
            src: HMole.Home + "gui/klatkaP.gif",
            id: "HMoleDisabled",
            style: "position:absolute; top:0px; left:50px; z-index:1000"
        }));
        HMole.AnimStep++;
        break;
    case 1:
        e = $("#HMoleDisabled").offset().top + 8;
        $("#HMoleDisabled").css({
            top: e
        });
        if (e > 230) HMole.AnimStep++;
        break;
    case 2:
        e = $("#logo").offset().left + 5;
        $("#logo").css({
            left: e
        });
        if (e > 60) {
            $("#HMoleDisabled").attr("src", HMole.Home + "gui/klatka.gif");
            $(".nui_main_menu.HMole").remove();
            $(".nui_main_menu").css("top", "255px");
            HMole.AnimStep++
        }
        break;
    case 3:
        e = $("#HMoleDisabled").offset().top + 10;
        $("#HMoleDisabled").css({
            top: e
        });
        if (e > $(window).height() - 100) {
            HMole.AnimStep++;
            setTimeout("HMoleLoad()", 100);
            return
        }
        break
    }
    setTimeout("HMoleAnimDezadeactivation()", 50)
}

function HMoleAnimActivation() {
    var e, t;
    switch (HMole.AnimStep) {
    case 0:
        e = $("#HMoleDisabled").offset().left;
        t = $("#HMoleDisabled").offset().top - 8;
        if (e > 3) e--;
        $("#HMoleDisabled").css({
            left: e,
            top: t
        });
        if (t < 230) HMole.AnimStep++;
        break;
    case 1:
        HMole.init();
        setTimeout("MyHole.init()", 100);
        $("#HMoleDisabled").remove();
        return
    }
    setTimeout("HMoleAnimActivation()", 50)
}

function DateFromString(e) {
    if (e[3] == ".") return new Date(e.substring(7, 11), e.substring(4, 6) - 1, e.substring(1, 3), e.substring(12, 14), e.substring(15, 17));
    e = e.replace("(", "");
    e = e.replace(")", "");
    e = e.replace(" ", "T");
    e = e.replace(" ", "");
    return new Date(e)
}

function strNwhite(e, t) {
    var n = "";
    e = e.toString();
    if (e.length >= t) return e.substring(e.length - t, e.length);
    while (t - e.length > 0) {
        n += "﻿░";
        t--
    }
    return n + e
}

function strNwhiteLeft(e, t) {
    var n = "";
    e = e.toString();
    if (e.length >= t) return e.substring(0, t);
    n += e;
    while (t - e.length > 0) {
        n += "﻿░";
        t--
    }
    return n
}

function WhtImg(e) {
    p = HMole.Home + "i/" + e + ".gif";
    return "[img]" + p + "[/img]"
}

function RepMain(e, t, n) {
    var r = "cb";
    var i = "[table][*][img]";
    if (t == "powers") i += HMole.Home + "pow/" + n + ".png";
    else if (t == "command") {
        if (e.miss == "idef") i += HMole.Home + "r/cq.gif";
        else i += HMole.Home + "r/ca.gif"
    } else i += HMole.Home + "r/ca.gif";
    i += "[/img][|]" + WhtImg(176) + "[b]\n";
    if (t != "powers") i += e.att.town + "\n";
    i += e.att.player + "\n" + e.att.ally + "[/b][|][img]" + HMole.Home + "r/";
    if (t == "command") {
        if (e.ico.match(/.*\/(support).*/)) i += "as";
        if (e.ico.match(/.*\/(attack).*/)) i += "aa";
        if (e.ico.match(/.*\/(conqueror).*/)) i += "ac";
        if (e.ico.match(/.*\/(revolt).*/)) i += "ar";
        if (e.ico.match(/.*\/(breakthrough).*/)) i += "ab";
        if (e.ico.match(/.*\/(abort).*/)) i += "az";
        if (e.ico.match(/.*\/(illusion).*/)) i += "ai";
        if (e.ico.match(/.*\/(farm_attack).*/)) {
            i += "ara";
            r = "cf"
        }
    }
    if (t == "support") i += "as";
    if (t == "espionage") i += "ae";
    if (t == "powers") i += "ap";
    if (t == "attack_support") i += "aas";
    if (t == "found") i += "af";
    if (t == "conquer") i += "ac";
    if (t == "illusion") i += "ai";
    if (t == "raise") {
        i += "ara";
        r = "cf"
    }
    if (t == "powers") switch (e.powerid) {
    case "transformation":
    case "sea_storm":
    case "wisdom":
        r = "cp";
        break
    }
    if (t == "command")
        if (e.miss == "iatk") r = "cq";
    i += ".gif[/img][|]" + WhtImg(176);
    i += "[b]\n" + e.def.town + "\n" + e.def.player + "\n" + e.def.ally + "[/b][|][img]" + HMole.Home + "r/" + r + ".gif[/img][/*][/table]";
    return i
}

function RepUnits(e, t) {
    var n = "";
    for (var r = 0; r < e.length; r++) {
        n += "[img]" + HMole.Home + "u/";
        n += e[r];
        r++;
        n += e[r];
        r++;
        n += ".gif[/img]"
    }
    n += "\n[font=monospace][size=9][b]";
    for (r = 0; r < t.length; r++)
        if (t[r] == "¨") n += "﻿░";
        else n += t[r];
    n += "[/b][/font]";
    return n
}

function RepUnitsEx(e, t, n, r, i) {
    var s, o, u, a, f = "[center]";
    o = 0;
    for (var l = 0; l < e.length; l++, o++) {
        if (o >= r * i && o < r * i + i) {
            f += "[img]" + HMole.Home + "u/";
            f += e[l];
            l++;
            f += e[l];
            l++;
            f += ".gif[/img]"
        } else l += 2
    }
    f += "\n[font=monospace][size=9][b]";
    o = 7 * i;
    if (t != null) {
        if (n != null) f += "[color=#2D2DFF]";
        if (t.length - r * 7 * i <= 7 * i) o = t.length - r * 7 * i;
        t += "¨";
        for (l = 0; l < o; l++)
            if (t[l + r * 7 * i] == "¨") f += "﻿░";
            else f += t[l + r * 7 * i];
        f += "\n"
    }
    if (n != null) {
        f += "[color=#FF2D2D]";
        if (n.length - r * 7 * i <= 7 * i) o = n.length - r * 7 * i;
        n += "¨";
        for (l = 0; l < o; l++) {
            if (n[l + r * 7 * i] != "¨") f += n[l + r * 7 * i];
            else if (n[l + r * 7 * i + 1] != "¨") f += "-";
            else f += "﻿░"
        }
    }
    f += "[/center]";
    return f
}

function RepUnitsExx(e, t, n, r, i) {
    var s, o, u, a, f = "[center]";
    o = 0;
    for (var l = 0; l < e.length; l++, o++) {
        if (o >= r * i && o < r * i + i) {
            f += "[img]" + HMole.Home + "u/";
            f += e[l];
            l++;
            f += e[l];
            l++;
            f += ".gif[/img]"
        } else l += 2
    }
    f += "\n[font=monospace][size=9][b][color=#FF2D2D]";
    o = 7 * i;
    if (t.length - r * 7 * i <= 7 * i) o = t.length - r * 7 * i;
    t += "¨";
    n += "¨";
    for (l = 0; l < o; l++)
        if (t[l + r * 7 * i] == "¨") f += "﻿░";
        else f += t[l + r * 7 * i];
    f += "[/center]";
    return f
}

function RepUnitsImgs(e) {
    var t = "";
    if (e == undefined) return t;
    for (var n = 0; n < e.length; n++) {
        t += "[img]" + HMole.Home + "v/";
        t += e[n];
        n++;
        t += e[n];
        n++;
        t += ".gif[/img]"
    }
    return t
}

function RepRescures(e, t) {
    var n = "";
    var r, i = 1;
    if (e) n += "[center][color=#008000][b]" + e + "[/b][/color][/center]";
    n += "[center][img]" + HMole.Home + "r/res.gif[/img][/center]";
    n += "[center][font=monospace][size=9][b]";
    for (r = 0; r < t.length - 1; r++, i++)
        if (i >= 8) i = 0;
        else {
            if (t[r] == "¨") n += "﻿░";
            else n += t[r]
        }
    n += "[/center]";
    return n
}

function HMoleData_bbCodeProfile(e, t) {
    function p() {
        for (f in o) o[f] = 65e3;
        for (f in s) {
            l = e.indexOf("[" + s[f], 0);
            if (l >= 0) o[f] = l
        }
        l = h = 65e3;
        for (f in o)
            if (o[f] < l) {
                l = o[f];
                h = f
            }
        f = h;
        c = e.indexOf("[/]", 0);
        if (l < 0) l = 65e3;
        if (c < 0) l = 65e3;
        for (f in o)
            if (f != h)
                if (o[f] < c) c = 65e3;
        f = h;
        if (l != 65e3 && c != 65e3 && l < c) {
            e = e.replace("[/]", "[/" + s[f] + "]");
            i += e.substring(0, c + 3);
            e = e.substring(c + 3, e.length);
            p();
            return
        }
        if (c < l) {
            a--;
            e = e.replace("[/]", "[/" + s[u[a]] + "]");
            i += e.substring(0, c + 3);
            e = e.substring(c + 3, e.length);
            if (l != 65e3) p();
            return
        }
        if (l < c) {
            u[a] = f;
            a++;
            i += e.substring(0, l + 1);
            e = e.substring(l + 1, e.length);
            p();
            return
        }
    }
    if (t != true) e = e.replace(/&nbsp;/ig, " ");
    e = decodeURIComponent(e);
    var n = new Array("b", "i", "u", "s", "center", "quote", "url", "img");
    var r;
    e = e.replace(/\r?\n|\r/gm, "");
    e = e.replace(/\s+/g, " ");
    for (r = 0; r < n.length; r++) {
        e = e.replace(new RegExp("<" + n[r] + ">", "gi"), "[" + n[r] + "]");
        e = e.replace(new RegExp("</" + n[r] + ">", "gi"), "[/" + n[r] + "]")
    }
    if (t == true) e = e.replace(/<span class\="bbcodes bbcodes_ally"><a href\="#" onclick\="Layout\.allianceProfile\.open\('(.*?)',(.*?)\)">(.*?)<\/a>(.*?)<\/span>/ig, "[ally][id=$2]$3[/]");
    else e = e.replace(/<span class\="bbcodes bbcodes_ally"><a href\="#" onclick\="Layout\.allianceProfile\.open\('(.*?)',(.*?)\)">(.*?)<\/a>(.*?)<\/span>/ig, "[ally]$3[/]"); if (t == true) e = e.replace(/<a href\="#" class\="bbcodes bbcodes_player" onclick\="Layout\.playerProfile\.open\('(.*?)',(.*?)\)">(.*?)<\/a>/ig, "[player][id=$2]$3[/]");
    else e = e.replace(/<a href\="#" class\="bbcodes bbcodes_player" onclick\="Layout\.playerProfile\.open\('(.*?)',(.*?)\)">(.*?)<\/a>/ig, "[player]$3[/]");
    e = e.replace(/<span class\="bbcodes bbcodes_player">(.*?)<\/span>/ig, "[player]$1[/]");
    e = e.replace(/<span class\="bbcodes bbcodes_town"><a href\="(.*?)>(.*?)<\/span>/ig, "[town]$2[/]");
    e = e.replace(/<span class\="bbcodes bbcodes_color" style\="color\:#(.*?)">(.*?)<\/span>/ig, "[color=#$1]$2[/]");
    e = e.replace(/<span class\="bbcodes bbcodes_size" style\="font-size\:(.*?)pt">(.*?)<\/span>/ig, "[size=$1]$2[/]");
    e = e.replace(/<span class\="bbcodes bbcodes_font (.*?)">(.*?)<\/span>/ig, "[font=$1]$2[/]");
    e = e.replace(/<a class\="bbcodes bbcodes_url"(.*?)href\="http:\/\/pl\.grepolis\.com\/start\/redirect\?url\=(.*?)"(.*?)>(.*?)<\/a>/ig, "[url=$2]$4[/]");
    var i = "";
    var s = ["font", "size", "color", "player", "ally", "url", "town"];
    var o = [0, 0, 0, 0, 0, 0, 0];
    var u = [];
    var a = 0;
    var f = 0;
    var l;
    var c;
    var h;
    p();
    i += e;
    i = i.replace(/\<br>/ig, "\n");
    return i
}

function HMoleData(that, quick) {
    function RepHead() {
        r = "[center]";
        if (HMole.gRAP.ShowTitle) r += "[b]" + REP.title + "[/b]\n";
        r += "[img]" + HMole.Home + "r/head.gif[/img][/center][quote]";
        return r
    }

    function RepFoot() {
        var e = "[/quote][center][img]" + HMole.Home + "r/foot.gif[/img]\n";
        if (REP.att != undefined && REP.def != undefined)
            if (REP.att.p + REP.def.p > 4e3) e += "[img]" + HMole.Home + "r/blood.gif[/img]\n";
        e += "[/center]";
        if (HMole.gRAP.ShowDate) e += REP.timeT + WhtImg(218);
        else e += WhtImg(350);
        e += "[size=7][url=grmh.eu?p=cnv]www.GRMH.eu => " + HMole.Lang.norka + " - " + HMole.Lang.konwrap + " v0.6.1[/url][/size]";
        return e
    }

    function RepStrDot(e, t) {
        var n = "";
        e = e.toString();
        if (e.length >= t) return e.substring(e.length - t, e.length);
        while (t - e.length > 0) {
            n += "¨";
            t--
        }
        return n + e
    }

    function RepCommands(e) {
        var t, n, r, i;
        t = "[table][*]";
        if (e.length == 0) t += WhtImg(705) + "\n" + HMole.Lang.incozero + "[/*][/table]";
        else {
            t += WhtImg(32) + "[|]" + WhtImg(128) + "[|]" + WhtImg(32) + "[|]" + WhtImg(128) + "[|]" + WhtImg(32) + "[|]" + WhtImg(129) + "[|]" + WhtImg(32) + "[|]" + WhtImg(129) + "[/*]";
            r = i = 0;
            for (n in e) {
                if (e[n].time_at == undefined) continue;
                if (r == 0) t += "[*]";
                else if (r < 4) t += "[|]";
                else t += "[/*]";
                i++;
                t += RepStrDot(i, 3) + "\n[img]" + e[n].img + "[/img][|]";
                t += "~" + e[n].time_on + "[b]\n=";
                t += e[n].time_at + "\n";
                t += "[town]" + e[n].town + "[/town]\n";
                t += "[player]" + e[n].player + "[/player][/b]";
                r++;
                if (r >= 4) r = 0
            }
            t += "[/table]"
        }
        return t
    }

    function RepCommands2(e) {
        var t, n, r, i;
        r = i = 0;
        for (n in e)
            if (n > 0) {
                if (r == 0) t += "[*]";
                else if (r < 3) t += "[|]";
                else t += "[/*]"; if (r == 1 || r == 2) {
                    i++;
                    t += "[img]" + HMole.Home + "m/arL.png[/img][img]" + e[n].img + "[/img][|]"
                }
                r++;
                if (r >= 4) r = 0
            }
        return t
    }

    function RepDateStrFormat(e) {
        var t = e.indexOf(":");
        if (t < 2) return null;
        var n = e[t - 2];
        n += e[t - 1];
        n += e[t];
        n += e[t + 1];
        n += e[t + 2];
        e = e.replace(n, "");
        e = e.replace(/^\s+|\s+$/g, "");
        e = e.replace(/[^0-9]/g, ".");
        if (e.charAt(2) != ".") {
            var r = e.split(".");
            e = r[2] + ".";
            e += r[1] + ".";
            e += r[0]
        }
        return e + " " + n
    }

    function RepBuldings(e) {
        function n(t) {
            return "[img]" + HMole.Home + "s/" + e[t].code + ".gif[/img][|]" + e[t].nam + ":[size=12][b]\n" + e[t].lvl + "[/b][/size]"
        }
        var t;
        t = "[table][*][|]" + WhtImg(93) + "[|][|]" + WhtImg(93) + "[|][|]" + WhtImg(93) + "[|][|]" + WhtImg(93) + "[|][|]" + WhtImg(92) + "[/*]";
        t += "[*]" + n("main") + "[|]" + n("lumber") + "[|]" + n("farm") + "[|]" + n("stoner") + "[|]" + n("storage") + "[/*]";
        t += "[*]" + n("spc1") + "[|]" + n("ironer") + "[|]" + n("barracks") + "[|]" + n("temple") + "[|]" + n("market") + "[/*]";
        t += "[*]" + n("spc2") + "[|]" + n("docks") + "[|]" + n("academy") + "[|]" + n("wall") + "[|]" + n("hide") + "[/*]";
        t += "[/table]";
        return t
    }

    function _generate() {
        var e;
        var t, n, r, s, o, u, a = "";
        if (REP.att != undefined) REP.att.unit_img = RepUnitsImgs(REP.att.unit_list);
        if (REP.def != undefined) REP.def.unit_img = RepUnitsImgs(REP.def.unit_list);
        if (REP.linia != undefined)
            for (i in REP.linia) REP.linia[i].unit_img = RepUnitsImgs(REP.linia[i].unit_list);
        if (HMole.gRAP.Style != 0) {
            var f = "[img]" + HMole.Home + "gui/ldou.gif[/img]\\n",
                l = "[img]" + HMole.Home + "gui/lsin.gif[/img]\\n",
                c = "[b]<%=HMole.bbcS(time+title,9)%>[/b]\\n",
                h = "<%=HMole.Const.footer%>",
                p = "[img]" + HMole.Home + "gui/ldou.gif[/img]\\n";
            single = "[img]" + HMole.Home + "gui/lsin.gif[/img]\\n";
            attacker = "[b]<%=HMole.bbcS(HMole.Lang.ATTACKER,10)%>[/b]: <%=att.town%> <%=att.player%> <%=att.ally%> <%=HMole.bbcS(morale+' '+luck,8)%>\\n", attUnit = "<%if(!HMole.gRAP.HideAttUnits){%><%=att.unit_img%><%=powerAtt%>\\n<%=HMole.bbcS(att.unit_send + '\\n' + HMole.bbcC(att.unit_lost,\"b50307\"),HMole.unSize)%>\\n<%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%>", defender = "[b]<%=HMole.bbcS(HMole.Lang.DEFENDER,10)%>[/b]: <%=def.town%> <%=def.player%> <%=def.ally%> <%=HMole.bbcS(oldwall+' '+nightbonus,8)%>\\n", defUnit = '<%if(!HMole.gRAP.HideDefUnits){%><%  if (def.unit_send != ""){%><%=def.unit_img%><%=powerDef%>\\n<%=HMole.bbcS(def.unit_send + \'\\n\' + HMole.bbcC(def.unit_lost,"b50307"),HMole.unSize)%>\\n<%  }else{%><%=HMole.Lang.NOTUNIT%>\\n<%  }%><%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%>', spyUnit = '<%if (def.title != null){%><%=def.title%>\\n<%  if(!HMole.gRAP.HideUnits){%><%    if (def.unit_send != ""){%><%=def.unit_img%>\\n<%=HMole.bbcS(def.unit_send,HMole.unSize)%>\\n<%    }else{%><%=HMole.Lang.NOTUNIT%>\\n<%    }%><%  }else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%  }%><%}%>', spyBuild = '<%if (build.title != null){%><%=build.title%>\\n<%  if(!HMole.gRAP.HideSpyBulding){%><%    if (build.unit_send != ""){%><%=build.unit_img%>\\n<%=HMole.bbcS(build.unit_send,HMole.unSize)%>\\n<%    }else{%><%=HMole.Lang.NOTUNIT%>\\n<%    }%><%  }else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%  }%><%}%>', spyIron = '<%=iron.title%>\\n<%if(iron.count!=""){%><%  if(!HMole.gRAP.HideSpyCoins){%><%=HMole.bbc(HMole.Home+"r/riron.png","img")%> <%=HMole.bbcS(iron.count,8)%>\\n<%  }else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%  }%><%}%>', spyResource = '<%if (resources.title != ""){%><%  if(!HMole.gRAP.HideSpyRes){%><%=HMole.bbcS(resources.title,8)%>\\n<%    if (resources.count.length > 0){%><%=resources.detail%>\\n<%    }%><%  }%><%}%>', resource = "<%if($('#MSGRESOURCE').attr('checked')){%><%=HMole.LineS%>\\n<%=HMole.bbcS(resources.title,9)%>\\n<%  if (resources.count.length > 0){%><%=resources.detail%>\\n<%  }%><%}%>", resource2 = "<%=HMole.bbcS(resources.title,9)%>\\n<%=resources.count.length%>", bunt = '<%if ( bunt.length > 0){%><%=HMole.LineS%>\\n<%=HMole.bbc(HMole.Home+"m/revolt_arising.png","img")%> <%=bunt%>\\n<%}%>', cost = '<%=HMole.bbc(HMole.Home+"v/loss.png","img")%>[b]<%=HMole.bbcS(HMole.Lang.LOSSES,9)%>[/b]\\n<%if ( att.w != undefined ){%><%=HMole.bbcS(HMole.bbcVAL(att.w,10)+HMole.bbcVAL(att.s,10)+HMole.bbcVAL(att.i,10)+HMole.bbcVAL(att.p,10)+HMole.bbcVAL(att.f,10)+" [b]"+HMole.Lang.ATTACKER+"[/b]",8)%>\\n<%}%><%=HMole.bbcS(HMole.bbcVAL(def.w,10)+HMole.bbcVAL(def.s,10)+HMole.bbcVAL(def.i,10)+HMole.bbcVAL(def.p,10)+HMole.bbcVAL(def.f,10)+" [b]"+HMole.Lang.DEFENDER+"[/b]",8)%>\\n', commandLine = "<%for(ind in linia){%><%  if (ind > 0){%><%=HMole.LineS%>\\n<%  }%><%  if (linia[ind].title.length>0) {%><%=linia[ind].title%>\\n<%  } else {%><%=linia[ind].img%> <%=linia[ind].time%> <%=linia[ind].townIdA%> <%=linia[ind].inout%> <%=linia[ind].townIdB%>\\n<%    if(!HMole.gRAP.HideUnits){%><%      if (linia[ind].unit_img != '') {%><%=linia[ind].unit_img%>   <%=linia[ind].power%>\\n<%=HMole.bbcS(linia[ind].unit_send,HMole.unSize)%>\\n<%      }%><%      if (linia[ind].spy != '') {%><%=linia[ind].spy%>\\n<%      }%><%    }%><%  }%><%}%>", conquerold = "[b]<%=HMole.bbcS(title+time,9)%>[/b]\\n<%=HMole.LineD%>\\n<%=def.town%> <%=def.player%>\\n<%=HMole.LineS%>\\n<%=att.units_title%>\\n<%if(!HMole.gRAP.HideDeffArmy){%><%  if (att.unit_img != '') {%><%=att.unit_img%>\\n<%=HMole.bbcS(att.unit_send,HMole.unSize)%>\\n<%  }else{%><%=HMole.Lang.NOTUNIT%>\\n<%  }%><%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%>", supUnit = "<%if(!HMole.gRAP.HideUnits){%><%=att.unit_img%>\\n<%=HMole.bbcS(att.unit_send,HMole.unSize)%>\\n<%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%>", command = "<%=att.town%> <%=att.player%>\\n<%=detail.time_title%> <%=detail.time_time%>\\n<%=att.units_title%>\\n<%if(!HMole.gRAP.HideUnits){%><%  if (att.unit_img != '') {%><%=att.unit_img%> <%=detail.power_img%>\\n<%=HMole.bbcS(att.unit_send,HMole.unSize)%>\\n<%  }else{%><%=HMole.Lang.NOTUNIT%>\\n<%  }%><%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%><%=HMole.LineS%>\\n<%=def.town%> <%=def.player%>\\n<%if($('#MSGRESOURCE').attr('checked')){%><%  if(resources.title!=null){%><%=HMole.LineS%>\\n<%=HMole.bbcS(resources.title,9)%>\\n<%=resources.detail%>\\n<%  }%><%}%>", agoraLine = "<%for(ind in linia){%><%  if (ind > 0){%><%=HMole.LineS%>\\n<%  }%><%=linia[ind].title%>\\n<%if(!HMole.gRAP.HideDefUnits){%><%=linia[ind].unit_img%>\\n<%=HMole.bbcS(linia[ind].unit_send,HMole.unSize)%>\\n<%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%><%}%>", agoraLine2 = "<%for(ind in linia){%><%  if (ind > 0){%><%=HMole.LineS%>\\n<%  }%><%=linia[ind].title%>\\n<%if(!HMole.gRAP.HideDefUnits){%><%=linia[ind].unit_img%>\\n<%=HMole.bbcS(linia[ind].unit_send,HMole.unSize)%>\\n<%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%><%}%>", powerDet = "<%=power%>\\n<%=efekt.title%>\\n<%if (efekt.detail != null){%><%=efekt.detail%>\\n<%}%><%if (type == 1){%><%}else if (type == 2){%><%=res.img%>\\n<%=HMole.bbcS(resources.count,HMole.unSize)%>\\n<%}else if (type == 3){%><%=res.img%>\\n<%=resources.count%>\\n<%}else if (type == 4){%><%}%>", wallHead = "<%=title%>\\n", wallDet = "<%if (defeated.title != \"\"){%><%=HMole.bbcS(defeated.title,10)%>\\n<%  if(defeated.titleAttacker != \"\"){%><%=HMole.bbcS(defeated.titleAttacker,8)%>\\n<%    for(ind in defeated.attacker){%><%=defeated.attacker[ind].unit_img%>\\n<%      if(!$('#MSGDIFF3').attr('checked')){%><%=HMole.bbcS(defeated.attacker[ind].unit_count,HMole.unSize)%>\\n<%      }%><%      if(!$('#MSGDIFF1').attr('checked')){%><%=HMole.bbcC(HMole.bbcS(defeated.attacker[ind].unit_diff,HMole.unSize),\"060\")%>\\n<%      }%><%    }%><%  }%><%  if(defeated.titleDefender != \"\"){%><%=HMole.bbcS(defeated.titleDefender,8)%>\\n<%    for(ind in defeated.defender){%><%=defeated.defender[ind].unit_img%>\\n<%      if(!$('#MSGDIFF3').attr('checked')){%><%=HMole.bbcS(defeated.defender[ind].unit_count,HMole.unSize)%>\\n<%      }%><%      if(!$('#MSGDIFF1').attr('checked')){%><%=HMole.bbcC(HMole.bbcS(defeated.defender[ind].unit_diff,HMole.unSize),\"060\")%>\\n<%      }%><%    }%><%  }%><%}%><%if (losses.title != \"\"){%><%  if (defeated.title != \"\"){%><%=HMole.LineD%>\\n<%  }%><%=HMole.bbcS(losses.title,10)%>\\n<%  if(losses.titleAttacker != \"\"){%><%=HMole.bbcS(losses.titleAttacker,8)%>\\n<%    for(ind in losses.attacker){%><%=losses.attacker[ind].unit_img%>\\n<%      if(!$('#MSGDIFF3').attr('checked')){%><%=HMole.bbcS(losses.attacker[ind].unit_count,HMole.unSize)%>\\n<%      }%><%      if(!$('#MSGDIFF1').attr('checked')){%><%=HMole.bbcC(HMole.bbcS(losses.attacker[ind].unit_diff,HMole.unSize),\"060\")%>\\n<%      }%><%    }%><%  }%><%  if(losses.titleDefender != \"\"){%><%=HMole.bbcS(losses.titleDefender,8)%>\\n<%    for(ind in losses.defender){%><%=losses.defender[ind].unit_img%>\\n<%      if(!$('#MSGDIFF3').attr('checked')){%><%=HMole.bbcS(losses.defender[ind].unit_count,HMole.unSize)%>\\n<%      }%><%      if(!$('#MSGDIFF1').attr('checked')){%><%=HMole.bbcC(HMole.bbcS(losses.defender[ind].unit_diff,HMole.unSize),\"060\")%>\\n<%      }%><%    }%><%  }%><%}%>", conquer = "<%=detail%>\\n", conquest = "[b]<%=HMole.bbcS(title,9)%>[/b]\\n<%=def.town%> (<%=time%>)\\n<%=HMole.LineS%>\\n[b]<%=HMole.bbcS(HMole.Lang.ATTACKER,10)%>[/b]: <%=att.town%> <%=att.player%> <%=att.ally%> <%=HMole.bbcS(morale+' '+luck,8)%>\\n<%=HMole.LineS%>\\n<%=att.units_title%>\\n<%if(!HMole.gRAP.HideDeffArmy){%><%  if (att.unit_img != '') {%><%=att.unit_img%>\\n<%=HMole.bbcS(att.unit_send,HMole.unSize)%>\\n<%  }else{%><%=HMole.Lang.NOTUNIT%>\\n<%  }%><%}else{%>[i]<%=HMole.Lang.HIDDEN%>[/i]\\n<%}%><%=HMole.LineS%>\\n<%=command.title%>\\n<%if(!HMole.gRAP.HideIncoArmy) for(ind in linia){%><%  if (ind > 0){%><%=HMole.LineS%>\\n<%  }%><%=linia[ind].img%> <%=linia[ind].inout%> (<%=linia[ind].time%>) <%=linia[ind].text%>\\n<%}%>", conquestTroops = "[b]<%=HMole.bbcS(title,9)%>[/b]\\n<%=HMole.LineS%>\\n<%=command.title%>\\n<%for(ind in linia){%><%  if (ind > 0){%><%=HMole.LineS%>\\n<%  }%><%=linia[ind].img%> <%=linia[ind].inout%> (<%=linia[ind].time%>) <%=linia[ind].text%>\\n<%}%>";
            a = "[quote][table][*]" + WhtImg(40) + "[|][font=monospace]";
            a += "[img]" + HMole.Home + "gui/ldou.gif[/img]\\n";
            switch (RT) {
            case "command":
                a += c + p + command;
                break;
            case "raise":
                a += c + p + attacker + attUnit + single + defender + defUnit + single + cost;
                break;
            case "breach":
            case "attack":
            case "take_over":
                a += c + p + attacker + attUnit + "[img]" + HMole.Home + "gui/latt.gif[/img]\\n" + defender + defUnit + resource + bunt + single + cost;
                break;
            case "conquerold_troops":
                a += "[b]" + HMole.bbcS(REP.title, 9) + "[/b]\\n";
                a += l;
                a += REP.command.title + "\\n";
                for (i in REP.linia) {
                    if (i > 0) a += l + "\\n";
                    a += "[img]" + HMole.Home + "m/arL.png[/img]" + REP.linia[i].img;
                    a += " ~" + REP.linia[i].time_eta + " (" + REP.linia[i].time + ") ";
                    a += REP.linia[i].text
                }
                break;
            case "command_curator":
                a += c + p + commandLine;
                break;
            case "conquerold":
                a += conquerold;
                break;
            case "support":
                a += c + p + attacker + defender + single + supUnit;
                break;
            case "attack_support":
                a += c + p + attacker + single + defender + defUnit + single + cost;
                break;
            case "agora":
                a += c + p + agoraLine;
                break;
            case "agora2":
                a += c + p + agoraLine2;
                break;
            case "espionage":
                a += c + p + attacker + single + defender + spyUnit + spyBuild + spyIron + spyResource;
                break;
            case "powers":
                a += c + p + attacker + single + defender + powerDet;
                break;
            case "wall":
                a += wallHead + p + wallDet;
                break;
            case "conquer":
            case "found":
                a += c + p + attacker + defender + single + conquer;
                break;
            case "conquest":
                a += "[b]" + HMole.bbcS(REP.title, 9) + "[/b]\\n" + REP.def.town + " " + REP.time + "\\n";
                a += l + "[b]" + HMole.bbcS(HMole.Lang.ATTACKER, 10) + "[/b]: " + REP.att.player;
                a += l + "\\n";
                if (!HMole.gRAP.HideDeffArmy) {
                    if (REP.att.unit_img != "") a += REP.att.unit_img + "\\n" + HMole.bbcS(REP.att.unit_send, 8) + "\\n";
                    else a += HMole.Lang.NOTUNIT + "\\n"
                } else a += "[i]" + HMole.Lang.HIDDEN + "[/i]\\n";
                a += l;
                if (!HMole.gRAP.HideIncoArmy) {
                    a += REP.command.title + "\\n";
                    for (i in REP.linia) {
                        if (i > 0) a += l;
                        a += "[img]" + HMole.Home + "m/arL.png[/img]" + REP.linia[i].img;
                        a += " ~" + REP.linia[i].time_eta + " (" + REP.linia[i].time + ") ";
                        var d = "";
                        if (HMole.CouSep[Game.locale_lang.substring(0, 2)] != undefined) d = HMole.CouSep[Game.locale_lang.substring(0, 2)];
                        t = REP.linia[i].text.lastIndexOf(d);
                        if (t > 0) {
                            n = REP.linia[i].text.length;
                            while (t < 3) {
                                if (REP.linia[i].text.charAt(n) == " ") t++;
                                n--
                            }
                            a += "[town]" + REP.linia[i].text.substring(0, t).replace(/^\s+|\s+$/g, "") + "[/town]\n";
                            a += "[player]" + REP.linia[i].text.substring(t + d.length, REP.linia[i].text.length).replace(/^\s+|\s+$/g, "") + "[/player]"
                        } else {
                            t = 0;
                            n = REP.linia[i].text.length;
                            while (t < 3) {
                                if (REP.linia[i].text.charAt(n) == " ") t++;
                                n--
                            }
                            a += "[town]" + REP.linia[i].text.substring(0, n + 1) + "[/town]\n";
                            a += "[player]" + REP.linia[i].text.substring(REP.linia[i].text.lastIndexOf(" ") + 1, REP.linia[i].text.length) + "[/player]"
                        }
                        a += "\\n"
                    }
                }
                break;
            case "illusion":
                a += attacker + single + defender + single + REP.efekt.title + "\\n";
                break
            }
            a += p;
            a += "[/font][|]" + WhtImg(38) + "[/quote]";
            a = tmpl(a, REP);
            return a
        }
        o = jGP.find($("#report_date")).html();
        if (o != undefined)
            if (o.length >= 12) REP.timeT = "(" + RepDateStrFormat(o).replace(" ", ") [b]") + "[/b]";
        a = RepHead();
        switch (RT) {
        case "illusion":
            a += RepMain(REP, RT, 0);
            a += "[table][*][center]" + WhtImg(705) + REP.efekt.title + "[/center][/*][/table]";
            break;
        case "support":
        case "command":
            REP.SelTroop = false;
            if (RT == "command")
                if (REP.ico.charAt(REP.ico.length - 6) == "X") {
                    if (!HMole.gRAP.HideSelTroop) REP.SelTroop = REP.ico;
                    REP.ico = "w/attack.png"
                }
            if (RT == "command")
                if (REP.miss == false) {
                    if (REP.att.ally == undefined) REP.att.ally = "[ally]" + HMole.GetPalyerAllyName(REP.att.player.replace(/\[player\](.*?)\[\/player\]/, "$1")) + "[/ally]\n";
                    if (REP.def.ally == undefined) REP.def.ally = "[ally]" + HMole.GetPalyerAllyName(REP.def.player.replace(/\[player\](.*?)\[\/player\]/, "$1")) + "[/ally]\n"
                } else {
                    if (REP.miss == "idef") {
                        REP.att.town = "Misja";
                        REP.att.ally = "";
                        if (REP.def.ally == undefined) REP.def.ally = "[ally]" + HMole.GetPalyerAllyName(REP.def.player.replace(/\[player\](.*?)\[\/player\]/, "$1")) + "[/ally]\n"
                    }
                    if (REP.miss == "iatk") {
                        REP.def.town = "Misja";
                        REP.def.ally = "";
                        if (REP.att.ally == undefined) REP.att.ally = "[ally]" + HMole.GetPalyerAllyName(REP.att.player.replace(/\[player\](.*?)\[\/player\]/, "$1")) + "[/ally]\n"
                    }
                }
            a += RepMain(REP, RT, 0);
            a += "[table][*][center]" + WhtImg(705) + "\n[img]" + HMole.Home + "r/uc.gif[/img][size=15][b] " + HMole.Lang.MSGUNITS + ":[/*][*][center]";
            if (HMole.gRAP.HideUnits) a += "[img]" + HMole.Home + "gui/hidden.gif[/img]";
            else {
                if (RT == "command")
                    if (REP.detail.power_img != "") a += REP.detail.power_img + "\n";
                if (REP.SelTroop != false) a += "[img]" + REP.SelTroop + "[/img] ";
                a += "\n";
                a += RepUnits(REP.att.unit_list, REP.att.unit_send)
            } if (RT == "support") a += "[*][center][img]" + HMole.Home + "r/ut.gif[/img][img]" + HMole.Home + "r/ut.gif[/img][img]" + HMole.Home + "r/ut.gif[/img][size=15][b] " + HMole.Lang.supontar + " [img]" + HMole.Home + "r/ut.gif[/img][img]" + HMole.Home + "r/ut.gif[/img][img]" + HMole.Home + "r/ut.gif[/img][/*]";
            if (RT == "command") a += "[*][center][img]" + HMole.Home + "r/uz.gif[/img][size=15][b] " + REP.detail.time_title + " [img]" + HMole.Home + "r/ut.gif[/img] " + REP.detail.time_time + "[/*]";
            a += "[/table]";
            break;
        case "raise":
            a += RepMain(REP, RT, 0);
            a += "[table][*]" + WhtImg(348) + "[|]" + WhtImg(348) + "[/*]";
            t = (REP.att.unit_list.length + 1) / 3;
            n = (REP.def.unit_list.length + 1) / 3;
            o = 0;
            while (t > 0 || n > 0) {
                a += "[*]";
                a += RepUnitsEx(REP.att.unit_list, REP.att.unit_send, REP.att.unit_lost, o, 6);
                a += "[|]";
                a += RepUnitsEx(REP.def.unit_list, REP.def.unit_send, REP.def.unit_lost, o, 6);
                t -= 6;
                n -= 6;
                o++;
                a += "[/*]"
            }
            a += "[/table]";
            break;
        case "breach":
        case "take_over":
        case "attack":
            a += "[table]";
            REP.okupowane = false;
            if (REP.title.indexOf(":") > 0) {
                o = REP.title;
                o = o.substring(o.lastIndexOf(")") + 1, o.lastIndexOf(":"));
                if (HMole.Language == "pl") o = o.substring(0, o.lastIndexOf(" "));
                o += " [player]";
                o += REP.title.substring(REP.title.lastIndexOf(":") + 2, REP.title.length);
                REP.okupowane = o + "[/player]"
            }
            t = (REP.att.unit_list.length + 1) / 3;
            n = (REP.def.unit_list.length + 1) / 3;
            o = 0;
            while (t > 0 || n > 0) {
                a += "[*]";
                if (HMole.gRAP.HideAttUnits) {
                    if (o == 0) a += "[center][img]" + HMole.Home + "gui/hidden.gif[/img][/center]"
                } else {
                    if (o == 0) a += REP.powerAtt;
                    a += RepUnitsEx(REP.att.unit_list, REP.att.unit_send, REP.att.unit_lost, o, 6)
                } if (o == 0) {
                    a += "[|][center][img]" + HMole.Home + "img/mid.gif[/img]\n[img]http://grepolis.com/" + REP.ico + "[/img]";
                    if (REP.load != undefined) a += "\n[b]" + REP.load;
                    a += "[/center][|]"
                } else a += "[|][|]"; if (HMole.gRAP.HideDefUnits) {
                    if (o == 0) a += "[center][img]" + HMole.Home + "gui/hidden.gif[/img][/center]"
                } else {
                    if (o == 0) {
                        if (REP.okupowane != false) a += "[color=#D00000]" + REP.okupowane + "[/color]\n";
                        a += REP.powerDef
                    }
                    a += RepUnitsEx(REP.def.unit_list, REP.def.unit_send, REP.def.unit_lost, o, 6)
                }
                t -= 6;
                n -= 6;
                o++
            }
            a += "[*]" + WhtImg(283) + "[|][|]" + WhtImg(283) + "[/*]";
            if (HMole.gRAP.HideAttUnits) {
                REP.att.w = REP.att.i = REP.att.s = REP.att.p = REP.att.f = "?"
            }
            if (HMole.gRAP.HideDefUnits) {
                REP.def.w = REP.def.i = REP.def.s = REP.def.p = REP.def.f = "?"
            }
            a += "[*][b]" + REP.att.town;
            a += "\n" + REP.att.player;
            a += "\n" + REP.att.ally;
            a += "\n[img]" + HMole.Home + "r/rmorale.png[/img] " + REP.rmorale;
            a += "\n[img]" + HMole.Home + "r/rluck.png[/img] " + REP.rluck;
            a += "[/b][|][font=monospace][size=9][b]" + strNwhite(REP.att.w, 6) + " [img]" + HMole.Home + "r/rwood.png[/img] " + strNwhiteLeft(REP.def.w, 6);
            a += "\n" + strNwhite(REP.att.i, 6) + " [img]" + HMole.Home + "r/riron.png[/img] " + strNwhiteLeft(REP.def.i, 6);
            a += "\n" + strNwhite(REP.att.s, 6) + " [img]" + HMole.Home + "r/rstone.png[/img] " + strNwhiteLeft(REP.def.s, 6);
            a += "\n" + strNwhite(REP.att.p, 6) + " [img]" + HMole.Home + "r/rpopu.png[/img] " + strNwhiteLeft(REP.def.p, 6);
            a += "\n" + strNwhite(REP.att.f, 6) + " [img]" + HMole.Home + "r/rfavor.png[/img] " + strNwhiteLeft(REP.def.f, 6);
            a += "[/font][|][b]";
            if (REP.bunt.length > 0) a += REP.bunt + "\n";
            a += REP.def.town;
            a += "\n" + REP.def.player;
            a += "\n" + REP.def.ally;
            a += "\n[img]" + HMole.Home + "r/rwall.png[/img] " + REP.roldwall;
            a += "\n[img]" + HMole.Home + "r/rnbonus.png[/img] " + REP.rnightbonus;
            a += "[/b][/*][/table]";
            break;
        case "conquerold_troops":
            a += "[center]\n[b]" + HMole.Lang.incoming + ": [/b] (" + HMole.Lang.incoocu + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
            REP.cmd = Array();
            s = r = 0;
            if (REP.timeNOW[1] != ":") o = REP.timeNOW.substring(0, 8);
            else o = "0" + REP.timeNOW.substring(0, 7);
            u = new Date(0, 0, 0, o.substring(0, 2), o.substring(3, 5), o.substring(6, 8), 0);
            for (o in REP.linia) {
                if (REP.linia[o].time_eta[1] != ":") n = REP.linia[o].time_eta.substring(0, 8);
                else n = "0" + REP.linia[o].time_eta.substring(0, 7);
                n = new Date(u.getTime() + (n.substring(0, 2) * 60 * 60 * 1e3 + n.substring(3, 5) * 60 * 1e3 + n.substring(6, 8) * 1e3));
                REP.cmd[r] = {
                    time_at: n.toTimeString().substring(0, 8),
                    time_on: REP.linia[o].time_eta,
                    img: HMole.Home + "m/" + HMole.GetMoveCode(REP.linia[o].img.replace(/(.*?)game\/unit_overview\/(.*?).png\[\/img\]/ig, "$2")) + ".png",
                    town: REP.linia[o].town.replace(/\[town\](.*?)\[\/town\]/ig, "$1"),
                    player: HMole.GetTownPlayerName(REP.linia[o].town.replace(/\[town\](.*?)\[\/town\]/ig, "$1"))
                };
                r++
            }
            a += RepCommands(REP.cmd);
            break;
        case "command_curator":
            a += "[center][size=12][b][player]" + Game.player_name + "[/player] - " + REP.title + " [img]" + HMole.Home + "r/curator.gif[/img][/b][/size]\n\n[/center]";
            for (i in REP.linia)
                if (HMole.GetMoveCode(REP.linia[i].image) != "X") {
                    a += "[img]" + HMole.Home + "r/hr.gif[/img]";
                    if (REP.linia[i].title.length > 0) a += REP.linia[i].title;
                    else {
                        a += "[table][*][b]";
                        a += REP.linia[i].townA + "\n";
                        a += REP.linia[i].playerA + "\n";
                        a += "[ally]" + HMole.GetPalyerAllyName(REP.linia[i].playerA.replace(/\[player\](.*?)\[\/player\]/, "$1")) + "[/ally][/b][|]";
                        if (REP.linia[i].in_out == "out") a += "[img]" + HMole.Home + "m/" + HMole.GetMoveCode(REP.linia[i].image) + ".png[/img][img]" + HMole.Home + "m/arR.png[/img] ";
                        else a += "[img]" + HMole.Home + "m/arL.png[/img][img]" + HMole.Home + "m/" + HMole.GetMoveCode(REP.linia[i].image) + ".png[/img] ";
                        a += "[|][b]";
                        a += REP.linia[i].townB + "\n";
                        a += REP.linia[i].playerB + "\n";
                        if (REP.linia[i].playerB != null) a += "[ally]" + HMole.GetPalyerAllyName(REP.linia[i].playerB.replace(/\[player\](.*?)\[\/player\]/, "$1")) + "[/ally][/b][|]";
                        a += REP.linia[i].time + "[b]\n";
                        if (!HMole.gRAP.HideUnits)
                            if (REP.linia[i].unit_img != "") {
                                if (REP.linia[i].power != "") a += REP.linia[i].power + "\n";
                                a += RepUnits(REP.linia[i].unit_list, REP.linia[i].unit_send)
                            }
                    }
                    a += "[/b][/*][/table]"
                }
            a += "[img]" + HMole.Home + "r/hr.gif[/img]";
            break;
        case "conquerold":
            r = REP.def.town.replace(/\[town\](.*?)\[\/town\]/, "$1");
            o = HMole.GetTownPlayerId(r);
            a += HMole.Lang.TOWN + ": " + REP.def.town + " (" + HMole.Lang.incoown + " [player]" + HMole.GetPlayerName(o) + "[/player] [ally]" + HMole.GetPalyerAllyName(HMole.GetPlayerName(o)) + "[/ally])\n";
            a += HMole.Lang.occupant + ": [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally]\n";
            a += HMole.Lang.occuend + ": [b]" + REP.time + "[/b]";
            if (!HMole.gRAP.HideDeffArmy) {
                a += "[table][*][img]" + HMole.Home + "r/icq.gif[/img][|]" + WhtImg(579) + "[center][size=14][img]" + HMole.Home + "r/uc.gif[/img] " + HMole.Lang.unitsinoccu + ": [img]" + HMole.Home + "r/ut.gif[/img]\n";
                a += RepUnitsEx(REP.att.unit_list, REP.att.unit_send, null, 0, 11);
                if ((REP.att.unit_list.length + 1) / 3 - 11 > 0) a += RepUnitsEx(REP.att.unit_list, REP.att.unit_send, null, 1, 11);
                a += "[/size][/center][|][img]" + HMole.Home + "r/icqm.gif[/img][/*][/table]"
            }
            if (!HMole.gRAP.HideIncoArmy) {
                var v = $.ajax({
                    url: "/game/command_info?action=conquest_movements&town_id=" + Game.townId + "&h=" + Game.csrfToken + "&json=%7B%22town%22%3A" + r + "%2C%22town_id%22%3A" + Game.townId + "%2C%22nlreq_id%22%3A" + Game.notification_last_requested_id + "%7D",
                    async: false
                });
                try {
                    res = JSON.parse(v.responseText).json.html
                } catch (m) {
                    res = null
                }
                if (res != null) {
                    res = res.substring(res.indexOf("ConquerorInfo.movements"), res.indexOf("</script>"));
                    res = res.substring(res.indexOf("[{") + 1, res.indexOf("}];") + 1);
                    res = JSON.parse("[" + res + "]");
                    REP.cmd = Array();
                    s = r = 0;
                    for (o = 0; o < res.length; o++) {
                        REP.cmd[r] = {
                            time_at: readableUnixTimestamp(res[o].arrival_at, "player_timezone"),
                            time_on: HMole.secsToHHMMSS(res[o].arrival_eta),
                            img: HMole.Home + "m/" + HMole.GetMoveCode(res[o].type) + ".png",
                            town: res[o].town.id,
                            player: HMole.GetPlayerName(res[o].town.player_id)
                        };
                        r++
                    }
                    a += RepCommands(REP.cmd)
                }
            }
            break;
        case "attack_support":
            a += RepMain(REP, RT, 0);
            REP.att.unit_list = "XX";
            REP.att.unit_send = "?";
            REP.att.unit_lost = "?";
            a += "[table][*]" + WhtImg(202);
            a += "[center]\n";
            a += RepUnits(REP.att.unit_list, REP.att.unit_send, REP.att.unit_lost);
            a += "[/center][|][font=monospace][size=9][b]? [img]" + HMole.Home + "r/rwood.png[/img] " + strNwhiteLeft(REP.def.w, 6);
            a += "\n? [img]" + HMole.Home + "r/riron.png[/img] " + strNwhiteLeft(REP.def.i, 6);
            a += "\n? [img]" + HMole.Home + "r/rstone.png[/img] " + strNwhiteLeft(REP.def.s, 6);
            a += "\n? [img]" + HMole.Home + "r/rpopu.png[/img] " + strNwhiteLeft(REP.def.p, 6);
            a += "\n? [img]" + HMole.Home + "r/rfavor.png[/img] " + strNwhiteLeft(REP.def.f, 6);
            a += "[/font][|][center]" + WhtImg(400) + "\n";
            a += RepUnitsEx(REP.def.unit_list, REP.def.unit_send, REP.def.unit_lost, 0, 10);
            if ((REP.att.unit_list.length + 1) / 3 - 10 > 0) RepUnitsEx(REP.def.unit_list, REP.def.unit_send, REP.def.unit_lost, 1, 10);
            a += "[player]" + Game.player_name + "[/player] - " + jGP.find($("div.report_units.report_side_defender.clearfix h4")).html().toLowerCase() + "[/*]";
            a += "[/table]";
            break;
        case "agora":
            a += "[center]\n[b]" + HMole.Lang.unisupcity + ": [/b][town]" + Game.townId + "[/town] (" + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
            a += "[table][*][center]";
            for (r in REP.linia) {
                a += "\n[b][size=10]" + REP.linia[r].title + "[/b]\n";
                a += RepUnits(REP.linia[r].unit_list, REP.linia[r].unit_send);
                a += "\n\n[img]" + HMole.Home + "r/hr.gif[/img]\n"
            }
            a += "[/center][/*][/table]";
            break;
        case "agora2":
            a += "[center]\n[b]" + HMole.Lang.unisbeyondcity + ": [/b][town]" + Game.townId + "[/town] (" + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
            a += "[table][*][center]";
            for (r in REP.linia) {
                a += "\n[b][size=10]" + REP.linia[r].title + "[/b]\n";
                a += RepUnits(REP.linia[r].unit_list, REP.linia[r].unit_send);
                a += "\n\n[img]" + HMole.Home + "r/hr.gif[/img]\n"
            }
            a += "[/center][/*][/table]";
            break;
        case "espionage":
            a += RepMain(REP, RT, 0);
            if (REP.build.title != null)
                if (!HMole.gRAP.HideSpyBulding) {
                    bd = HMole.NewBuildData();
                    o = REP.build.unit_send.replace(/\./g, " ");
                    t = REP.build.unit_list;
                    for (r = 0; r < t.length / 3; r++) {
                        if (t[3 * r + 1] == "A") continue;
                        if (t[3 * r] == "D") {
                            if (t[3 * r + 1] == "1") bd["spc1"].mid = "theater";
                            if (t[3 * r + 1] == "2") bd["spc1"].mid = "thermal";
                            if (t[3 * r + 1] == "3") bd["spc1"].mid = "library";
                            if (t[3 * r + 1] == "4") bd["spc1"].mid = "lighthouse";
                            bd["spc1"].code = HMole.ConstBuildings[bd["spc1"].mid];
                            bd["spc1"].lvl = 1;
                            continue
                        }
                        if (t[3 * r] == "E") {
                            if (t[3 * r + 1] == "1") bd["spc2"].mid = "tower";
                            if (t[3 * r + 1] == "2") bd["spc2"].mid = "statue";
                            if (t[3 * r + 1] == "3") bd["spc2"].mid = "oracle";
                            if (t[3 * r + 1] == "4") bd["spc2"].mid = "trade_office";
                            bd["spc2"].code = HMole.ConstBuildings[bd["spc2"].mid];
                            bd["spc2"].lvl = 1;
                            continue
                        }
                        bd[HMole.BuildIdByCode(t[3 * r] + t[3 * r + 1])].lvl = o.substring(7 * r + 4, 7 * r + 6)
                    }
                    HMole.NewBuildUpdate(bd);
                    a += RepBuldings(bd)
                }
            if (REP.build.title != null)
                if (!HMole.gRAP.HideUnits) {
                    a += "[table][*][center]" + WhtImg(705) + "\n[img]" + HMole.Home + "r/uc.gif[/img][size=15][b] " + HMole.Lang.MSGUNITS + ":[/*][*][center]";
                    a += RepUnits(REP.def.unit_list, REP.def.unit_send);
                    a += "[/table]"
                }
            a += "[table][*]" + WhtImg(229) + "[center][img]" + HMole.Home + "s/coins.gif[/img][/center][|]";
            a += WhtImg(228) + "[center][b]" + REP.iron.title + "[/center]\n[center][img]http://pl.cdn.grepolis.com/images/game/hide/coins.png[/img] [size=26]";
            if (HMole.gRAP.HideSpyCoins) a += HMole.Lang.HIDDEN;
            else a += REP.iron.count;
            a += "[/size][/center][|]" + WhtImg(230);
            if (REP.build.title != null) {
                if (HMole.gRAP.HideSpyRes) a += "[center][color=#008000][b]Surowce w mieście[/b][/color]\n[size=26]" + HMole.Lang.HIDDEN + "[/size][/center]";
                else a += RepRescures("Surowce w mieście:", REP.resources.count)
            } else a += "[b]Akcja szpiegowska\nzakończyła się niepowodzeniem.[/b]";
            a += "[/*][/table]";
            break;
        case "powers":
            var g = "gg";
            var y = ["", "", ""];
            switch (REP.powerid) {
            case "divine_sign":
                g = "ga1";
                y = HMole.Lang.rep.ga1;
                break;
            case "bolt":
                g = "ga2";
                y = HMole.Lang.rep.ga2;
                break;
            case "patroness":
                g = "gb1";
                y = HMole.Lang.rep.gb1;
                break;
            case "town_protection":
                g = "gb3";
                y = HMole.Lang.rep.gb3;
                break;
            case "kingly_gift":
                g = "gc1";
                y = HMole.Lang.rep.gc1;
                break;
            case "call_of_the_ocean":
                g = "gc2";
                y = HMole.Lang.rep.gc2;
                break;
            case "earthquake":
                g = "gc3";
                y = HMole.Lang.rep.gc3;
                break;
            case "wedding":
                g = "gd1";
                y = HMole.Lang.rep.gd1;
                break;
            case "happiness":
                g = "gd2";
                y = HMole.Lang.rep.gd2;
                break;
            case "fertility_improvement":
                g = "gd3";
                y = HMole.Lang.rep.gd3;
                break;
            case "pest":
                g = "ge1";
                y = HMole.Lang.rep.ge1;
                break;
            case "underworld_treasures":
                g = "ge3";
                y = HMole.Lang.rep.ge3;
                break;
            case "natures_gift":
                g = "gf1";
                y = HMole.Lang.rep.gf1;
                break;
            case "illusion":
                g = "gf3";
                y = HMole.Lang.rep.gf3;
                break;
            case "cleanse":
                g = "gf4";
                y = HMole.Lang.rep.gf4;
                break;
            case "transformation":
                g = "ga4";
                y = HMole.Lang.rep.ga4;
                break;
            case "wisdom":
                g = "gb2";
                y = HMole.Lang.rep.gb2;
                break;
            case "sea_storm":
                g = "gc4";
                y = HMole.Lang.rep.gc4;
                break
            }
            a += RepMain(REP, RT, g[0] + g[1]);
            a += "[table][*]" + WhtImg(301) + "[center][b][color=#000080]" + REP.efekt.title + "[/color][/b]\n" + y[0] + "\n[b][color=#008000]" + y[1] + "[/color]\n";
            a += HMole.Lang.cost + ": " + GameData.powers[REP.powerid].favor + "[/b][img]" + HMole.Home + "r/rfavor.png[/img][/center][|][img]" + HMole.Home + "pow/" + g + ".png[/img][|]" + WhtImg(300);
            a += "[center][b][color=#000080]" + HMole.Lang.spelleff + "[/color]\n\n[/b]";
            switch (REP.powerid) {
            case "transformation":
            case "sea_storm":
                a += "[color=#008000][b]" + HMole.Lang.zniszczone + " " + HMole.Lang.MSGUNITS + ":[/b][/color]\n";
                a += RepUnits(REP.resources.unit_list, REP.resources.count);
                break;
            case "wisdom":
                a += "[color=#008000][b]" + HMole.Lang.wykwoj + ":[/b][/color]\n";
                a += RepUnitsEx(REP.resources.unit_list, REP.resources.count, null, 0, 6);
                if ((REP.resources.unit_list.length + 1) / 3 - 6 > 0) a += RepUnitsEx(REP.resources.unit_list, REP.resources.count, null, 1, 6);
                break;
            case "patroness":
            case "divine_sign":
                a += "[color=#008000][b]" + HMole.Lang.zdobyte + " " + HMole.Lang.MSGUNITS + ":[/b][/color]\n";
                a += RepUnits(REP.resources.unit_list, REP.resources.count);
                break;
            case "bolt":
            case "town_protection":
            case "call_of_the_ocean":
            case "earthquake":
            case "happiness":
            case "fertility_improvement":
            case "pest":
                a += "[color=#008000][b]";
                if (REP.powerid == "earthquake") a += REP.efekt.detail;
                else if (REP.powerid == "bolt") a += REP.efekt.det.replace("<br>", "\n");
                else a += y[2];
                s = GameData.powers[REP.powerid].lifetime;
                if (REP.powerid == "earthquake" || REP.powerid == "bolt") s = 4 * 60 * 60 / Game.game_speed;
                a += "[/b][/color]\n";
                a += HMole.Lang.spelltime + ": " + s / 60 / 60 + "h.\n";
                o = DateFromString("(" + RepDateStrFormat(REP.time.replace("(", "").replace(")", "")) + ":00)");
                o = new Date(o.getTime() + s * 1e3);
                a += "[color=#E00000][b]" + HMole.Lang.spellend + ": " + o.toTimeString().substring(0, 8) + "[/b] (" + o.toISOString().substring(0, 10) + ")[/color]";
                break;
            case "kingly_gift":
            case "wedding":
            case "underworld_treasures":
            case "natures_gift":
                if (REP.powerid == "underworld_treasures") REP.resources.count = ".....0.......0.....500..";
                if (REP.powerid == "natures_gift") REP.resources.count = ".....0.....650.......0..";
                a += RepRescures(HMole.Lang.zdobres + ":", REP.resources.count);
                break;
            case "illusion":
                a += "Czas Nadejścia Ataku: xxx";
                break;
            case "cleanse":
                a += "Zniwelowane Moce:\n";
                o = jGP.find($("div#right_side .powers_container")).children();
                if (o.length > 0) o = o.eq(0).attr("class").replace(/power_icon power_icon86x86 (.*)/, "$1");
                else o = "";
                g = null;
                switch (o) {
                case "happiness":
                    g = "gd2";
                    break;
                case "fertility_improvement":
                    g = "gd3";
                    break;
                case "town_protection":
                    g = "gb3";
                    break;
                case "call_of_the_ocean":
                    g = "gc2";
                    break;
                case "pest":
                    g = "ge1";
                    break;
                case "fair_wind":
                    g = "ga3";
                    break;
                case "desire":
                    g = "gd4";
                    break;
                case "strength_of_heroes":
                    g = "gb4";
                    break;
                case "resurrection":
                    g = "ge2";
                    break;
                case "cap_of_invisibility":
                    g = "ge4";
                    break;
                case "effort_of_the_huntress":
                    g = "gf2";
                    break;
                case "illusion":
                    g = "gf3";
                    break
                }
                if (g == null) a += "[b]brak[/b]";
                else a += "[img]" + HMole.Home + "pow/" + g + ".png[/img]";
                break
            }
            a += "[/center][/*][/table]";
            break;
        case "wall":
            a += "[table][*]" + WhtImg(705) + "[center][size=12][player]" + Game.player_name + "[/player] - Polegli Wojownicy[/size][/center][/*][/table]";
            a += "[table][*]" + WhtImg(348) + "[|]" + WhtImg(348) + "[/*]";
            t = (REP.tef.attacker.unit_count.length + 1) / 3;
            t = (REP.los.attacker.unit_count.length + 1) / 3;
            o = 0;
            a += "[*][b]Pokonał atakując inne miasta:[/b][|][b]Stracił atakując inne miasta:[/b][/*]";
            while (t > 0 || n > 0) {
                a += "[*]";
                a += RepUnitsExx(REP.tef.attacker.unit_list, REP.tef.attacker.unit_count, REP.tef.attacker.unit_count, o, 7);
                a += "[|]";
                a += RepUnitsExx(REP.los.attacker.unit_list, REP.los.attacker.unit_count, REP.los.attacker.unit_count, o, 7);
                a += "[/*]";
                t -= 14;
                n -= 14;
                o++
            }
            a += "[/table][table][*]" + WhtImg(348) + "[|]" + WhtImg(348) + "[/*]";
            t = (REP.tef.defender.unit_count.length + 1) / 3;
            t = (REP.los.defender.unit_count.length + 1) / 3;
            o = 0;
            a += "[*][b]Pokonał broniąc swoich miast:[/b][|][b]Stracił broniąc swoich miast:[/b][/*]";
            while (t > 0 || n > 0) {
                a += "[*]";
                a += RepUnitsExx(REP.tef.defender.unit_list, REP.tef.defender.unit_count, REP.tef.defender.unit_count, o, 7);
                a += "[|]";
                a += RepUnitsExx(REP.los.defender.unit_list, REP.los.defender.unit_count, REP.los.defender.unit_count, o, 7);
                a += "[/*]";
                t -= 14;
                n -= 14;
                o++
            }
            a += "[/table]";
            break;
        case "conquer":
        case "found":
            a += RepMain(REP, RT);
            a += "[table][*][center]" + WhtImg(705) + "[size=10][b]" + REP.detail + "[/*][/table]";
            break;
        case "conquest":
            a += HMole.Lang.TOWN + ": " + REP.def.town + " (" + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n";
            a += HMole.Lang.occupant + ": " + REP.att.player + " [ally]" + HMole.GetPalyerAllyName(REP.att.player.replace(/\[player\](.*?)\[\/player\]/, "$1")) + "[/ally]\n";
            a += HMole.Lang.occuend + ": ~" + REP.time + " [b]=";
            if (REP.timeNOW[1] != ":") o = REP.timeNOW.substring(0, 8);
            else o = "0" + REP.timeNOW.substring(0, 7);
            u = new Date(0, 0, 0, o.substring(0, 2), o.substring(3, 5), o.substring(6, 8), 0);
            if (REP.time[1] != ":") n = REP.time.substring(0, 8);
            else n = "0" + REP.time.substring(0, 7);
            n = new Date(u.getTime() + (n.substring(0, 2) * 60 * 60 * 1e3 + n.substring(3, 5) * 60 * 1e3 + n.substring(6, 8) * 1e3));
            a += n.toTimeString().substring(0, 8) + "[/b]";
            if (!HMole.gRAP.HideDeffArmy) {
                a += "[table][*][img]" + HMole.Home + "r/icq.gif[/img][|]" + WhtImg(579) + "[center][size=14][img]" + HMole.Home + "r/uc.gif[/img] " + HMole.Lang.unitsinoccu + ": [img]" + HMole.Home + "r/ut.gif[/img]\n";
                a += RepUnitsEx(REP.att.unit_list, REP.att.unit_send, null, 0, 11);
                if ((REP.att.unit_list.length + 1) / 3 - 11 > 0) a += RepUnitsEx(REP.att.unit_list, REP.att.unit_send, null, 1, 11);
                a += "[/size][/center][|][img]" + HMole.Home + "r/icqm.gif[/img][/*][/table]"
            }
            if (!HMole.gRAP.HideIncoArmy) {
                if (REP.timeNOW[1] != ":") o = REP.timeNOW.substring(0, 8);
                else o = "0" + REP.timeNOW.substring(0, 7);
                u = new Date(0, 0, 0, o.substring(0, 2), o.substring(3, 5), o.substring(6, 8), 0);
                a += "[table][*]";
                s = 0;
                for (r in REP.linia)
                    if (REP.linia.hasOwnProperty(r)) {
                        s++;
                        break
                    }
                if (s == 0) a += WhtImg(705) + "\n" + HMole.Lang.incozero + "[/*][/table]";
                else {
                    var d = "";
                    if (HMole.CouSep[Game.locale_lang.substring(0, 2)] != undefined) d = HMole.CouSep[Game.locale_lang.substring(0, 2)];
                    a += WhtImg(32) + "[|]" + WhtImg(128) + "[|]" + WhtImg(32) + "[|]" + WhtImg(128) + "[|]" + WhtImg(32) + "[|]" + WhtImg(129) + "[|]" + WhtImg(32) + "[|]" + WhtImg(129) + "[/*]";
                    s = r = 0;
                    for (o in REP.linia) {
                        if (s == 0) a += "[*]";
                        else if (s < 4) a += "[|]";
                        else a += "[/*]";
                        r++;
                        a += RepStrDot(r, 3) + "\n" + REP.linia[o].img + "[|]";
                        a += "~" + REP.linia[o].time_eta + "[b]\n=";
                        if (REP.linia[o].time_eta[1] != ":") n = REP.linia[o].time_eta.substring(0, 8);
                        else n = "0" + REP.linia[o].time_eta.substring(0, 7);
                        n = new Date(u.getTime() + (n.substring(0, 2) * 60 * 60 * 1e3 + n.substring(3, 5) * 60 * 1e3 + n.substring(6, 8) * 1e3));
                        a += n.toTimeString().substring(0, 8) + "\n";
                        t = REP.linia[o].text.lastIndexOf(d);
                        if (t > 0) {
                            n = REP.linia[o].text.length;
                            while (t < 3) {
                                if (REP.linia[o].text.charAt(n) == " ") t++;
                                n--
                            }
                            a += "[town]" + REP.linia[o].text.substring(0, t).replace(/^\s+|\s+$/g, "") + "[/town]\n";
                            a += "[player]" + REP.linia[o].text.substring(t + d.length, REP.linia[o].text.length).replace(/^\s+|\s+$/g, "") + "[/player]";
                            a += "[/b]"
                        } else {
                            t = 0;
                            n = REP.linia[o].text.length;
                            while (t < 3) {
                                if (REP.linia[o].text.charAt(n) == " ") t++;
                                n--
                            }
                            a += "[town]" + REP.linia[o].text.substring(0, n + 1) + "[/town]\n";
                            a += "[player]" + REP.linia[o].text.substring(REP.linia[o].text.lastIndexOf(" ") + 1, REP.linia[o].text.length) + "[/player]";
                            a += "[/b]"
                        }
                        s++;
                        if (s >= 4) s = 0
                    }
                    a += "[/table]"
                }
            }
            break
        }
        a += RepFoot();
        return a
    }

    function _ally_players() {
        var e, t, n;
        if (HMole.gRAP.Style != 0) {
            e = "[ally]";
            e += jGP.find($("#player_info h3")).html();
            e += "[/ally]";
            e += "[quote][table]";
            $.each(jGP.find($("#ally_towns ul.members_list>li:nth-child(2) ul li")), function (t, n) {
                e += "[*]" + (t + 1) + ".[|][player]";
                e += $(n).find("a.gp_player_link").html();
                e += "[/player][|]";
                e += $(n).find("div.small-descr").html().replace(/^\s*|\s(?=\s)|\t|\s*$/g, "").replace(",", "[|]");
                e += "[/*]"
            });
            e += "[/table]"
        } else {
            var r = $(" #player_info h3").html();
            var i = HMoleData_bbCodeProfile($("#ally_profile .ally_bbcode").html(), false).strip_tags();
            var s;
            s = HMole.GetAllyByName(r);
            if (s == null) s = {
                id: null,
                name: "?",
                points: "?",
                towns: "?",
                members: "?",
                rank: "?"
            };
            var e = RepHead();
            e += "[center][size=20][b]" + r + "[/b][/size][/center]";
            e += "[table][*]" + WhtImg(169) + "W Rankingu: " + s.rank + "[|]" + WhtImg(170) + "Liczba Członków: " + s.members + "[|]" + WhtImg(170) + "Walka: ?[|]" + WhtImg(169) + "Atak: ?[/*]";
            e += "[*]Punkty: " + s.points + "[|]Liczba Miast: " + s.towns + "[|][|]Obrona: ?[/*][/table][/quote]";
            e += "[table][*]" + WhtImg(184) + "[center][img]http://grepolis.com" + $("#alliance_points img").attr("src") + "[/img][/center]";
            e += "[|]" + WhtImg(340) + "[center][img]";
            if (jGP.find($("#ally_image")).length > 0) e += "http://" + Game.world_id + ".grepolis.com/image.php?alliance_id=" + s.id;
            else e += HMole.Home + "imgs/flag/allybig.gif";
            e += "[/img][/center]";
            e += "[|]" + WhtImg(184) + "[center][img]http://grepolis.com" + $("#alliance_points img").attr("src") + "[/img][/center][/*]";
            e += "[*][|][size=10]" + i + "\n\n[/size][|][/*]";
            e += "[/table]";
            e += "[quote][table]";
            e += "[*]" + WhtImg(30) + "[|]" + WhtImg(190) + "[|]" + WhtImg(30) + "[|]" + WhtImg(190) + "[|]" + WhtImg(30) + "[|]" + WhtImg(190) + "[/*]";
            n = 0;
            $.each(jGP.find($("#ally_towns ul.members_list>li:nth-child(2) ul li")), function (t, r) {
                if (n == 0) e += "[*]";
                else if (n < 3) e += "[|]";
                else e += "[/*]";
                e += t + 1 + ".[|][b][player]";
                e += $(r).find("a.gp_player_link").html();
                e += "[/player]\n";
                e += $(r).find("div.small-descr").html().replace(/^\s*|\s(?=\s)|\t|\s*$/g, "").replace(",", "\n");
                e += "[/b]";
                n++;
                if (n >= 3) n = 0
            });
            e += "[/table]";
            e += RepFoot()
        }
        return e
    }

    function _player_towns() {
        var e, t, n;
        if (HMole.gRAP.Style != 0) {
            e = "[player]";
            e += jGP.find($("#player_info h3")).html();
            e += "[/player]";
            if ($("#player_info>a").length > 0) {
                e += "([ally]";
                e += $("#player_info>a").html();
                e += "[/ally])"
            }
            e += "[quote][table]";
            $.each(jGP.find($("#player_towns ul.game_list li")), function (n, r) {
                t = HMole.Link2Struct($(r).find("a.gp_town_link").attr("href"));
                e += "[*]" + (n + 1) + ".[|][town]";
                e += t.id.toString();
                e += "[/town][|]";
                e += "" + $(r).find("span").html().trim().split("|")[0];
                e += "[|]" + $(r).find("span").html().trim().split("|")[1];
                e += "[/*]"
            });
            e += "[/table]"
        } else {
            var r = $(" #player_info h3").html();
            var i = HMoleData_bbCodeProfile($("#player_profile").children().eq(1).html(), false).strip_tags();
            var s;
            s = HMole.GetPlayerByName(r);
            if (s == null) s = {
                id: null,
                name: "?",
                allianceID: null,
                points: "?",
                rank: "?",
                towns: "?"
            };
            var e = RepHead();
            e += "[center][size=20][b]" + r + "[/b][/size][/center]";
            e += "[table][*]" + WhtImg(169) + "W Rankingu: " + s.rank + "[|]" + WhtImg(170) + "Sojusz: " + HMole.gAPI.alliances[s.allianceID].name + "[|]" + WhtImg(170) + "Walka: x[|]" + WhtImg(169) + "Atak: x[/*]";
            e += "[*]Punkty: " + s.points + "[|]Liczba Miast: " + s.towns + "[|][|]Obrona: x[/*][/table][/quote]";
            e += "[table][*]" + WhtImg(184) + "[center][img]" + HMole.Home + "img/flagplayR.png[/img][/center]";
            e += "[|]" + WhtImg(340) + "[center][img]";
            if (jGP.find($("#profile_image img")).attr("src").indexOf("profile_default.png") > 0) e += "http://" + Game.world_id + ".grepolis.com/images/game/profile/profile_default.png";
            else e += "http://" + Game.world_id + ".grepolis.com/image.php?player_id=" + s.id;
            e += "[/img][/center]";
            e += "[|]" + WhtImg(184) + "[center][img]" + HMole.Home + "img/flagplayL.png[/img][/center][/*]";
            e += "[*][|][size=10]" + i + "\n\n[/size][|][/*]";
            e += "[/table]";
            e += "[quote][table]";
            e += "[*]" + WhtImg(30) + "[|]" + WhtImg(190) + "[|]" + WhtImg(30) + "[|]" + WhtImg(190) + "[|]" + WhtImg(30) + "[|]" + WhtImg(190) + "[/*]";
            n = 0;
            $.each(jGP.find($("#player_towns ul.game_list li")), function (r, i) {
                if (n == 0) e += "[*]";
                else if (n < 3) e += "[|]";
                else e += "[/*]";
                t = HMole.Link2Struct($(i).find("a.gp_town_link").attr("href"));
                e += r + 1 + ".[|][b][town]";
                e += t.id.toString();
                e += "[/town]\n";
                e += $(i).find("span").html().trim().split("|")[0] + "\n";
                e += $(i).find("span").html().trim().split("|")[1] + "[/b]";
                n++;
                if (n >= 3) n = 0
            });
            e += "[/table]";
            e += RepFoot()
        }
        return e
    }

    function _support_players() {
        var e, t, n, r;
        var i = {};
        $.each(jGP.find($('.game_list li[id^="support_units_"] a.gp_player_link')), function (e, n) {
            if (Game.player_name == $(n).html()) return;
            t = HMole.Link2Struct($(n).attr("href"));
            i[t.id] = {};
            i[t.id].name = HMole.gAPI.players[t.id].name;
            i[t.id].ally = HMole.gAPI.alliances[HMole.gAPI.players[t.id].allianceID].name
        });
        if (HMole.gRAP.Style != 0) {
            e = jGP.find($("#defense_header")).html() + ":";
            e += "[town]" + Game.townId + "[/town]";
            e += "[table]";
            r = 0;
            for (n in i) {
                e += "[*]" + ++r + ".[|]";
                e += "[player]" + i[n].name + "[/player][|]";
                e += "[ally]" + i[n].ally + "[/ally]";
                e += "[/*]\n"
            }
            e += "[/table]"
        } else {
            REP.title = "Podziękowania za Pomoc";
            e = RepHead();
            e += "[img]" + HMole.Home + "e/z/zakochany-drzewo.gif[/img][img]" + HMole.Home + "e/z/serce.gif[/img][b][size=28][color=#FF4F8F][font=sansserif] SERDECZNE PODZIĘKOWANIA [/font][/color][/size][/b] [img]" + HMole.Home + "e/z/serce.gif[/img][b]DLA:[/b]";
            e += "\n";
            r = 0;
            for (n in i) {
                e += WhtImg(190) + ++r + ". ";
                e += "[player]" + i[n].name + "[/player] z sojuszu ";
                e += "[ally]" + i[n].ally + "[/ally]";
                e += "\n"
            }
            e += "\n\n... za pomoc w obronie mojego miasta [town]" + Game.townId + "[/town]";
            e += "[img]" + HMole.Home + "e/z/gwiazdki.gif[/img]";
            e += RepFoot()
        }
        return e
    }

    function _commands_list() {
        var e, t, n, r, i;
        REP.cmd = Array();
        for (t = 0; t < MM.models.CommandsMenuBubble[Game.player_id].attributes.unit_movements.length; t++) {
            e = MM.models.CommandsMenuBubble[Game.player_id].attributes.unit_movements[t];
            if (e.incoming != true) continue;
            if (e.town.link.indexOf("href=") < 0) {
                REP.cmd[t] = {
                    time_at: readableUnixTimestamp(e.arrival_at, "player_timezone"),
                    time_on: HMole.secsToHHMMSS(e.arrival_at - Timestamp.server()),
                    img: HMole.Home + "m/XQ.png",
                    town: e.town.link,
                    player: "Misja"
                };
                continue
            }
            REP.cmd[t] = {
                time_at: readableUnixTimestamp(e.arrival_at, "player_timezone"),
                time_on: HMole.secsToHHMMSS(e.arrival_at - Timestamp.server()),
                img: HMole.Home + "m/" + HMole.GetMoveCode(e.type) + ".png",
                town: HMole.Link2Struct(e.town.link.match(/href="([^"]*)/)[1]).id,
                player: HMole.GetTownPlayerName(HMole.Link2Struct(e.town.link.match(/href="([^"]*)/)[1]).id)
            };
            if (!HMole.gRAP.HideSelTroop)
                if (e.type == "attack_incoming") {
                    i = "_" + REP.cmd[t].town + Game.townId + e.arrival_at;
                    if (i in HMole.attTownList) REP.cmd[t].img = HMole.Home + "/m/" + HMole.attTownList[i].at + ".png"
                }
        }
        r = RepHead();
        r += "[center]\n[b]" + HMole.Lang.incoming + ": [/b][town]" + Game.townId + "[/town] (" + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
        r += RepCommands(REP.cmd);
        r += RepFoot();
        return r
    }

    function _academy_research() {
        var e, t, n;
        var r = [];
        r[0] = ["slinger", "archer", ".", "."];
        r[1] = ["hoplite", "town_guard", "diplomacy", "."];
        r[2] = ["espionage", "booty", "pottery", "."];
        r[3] = ["rider", "architecture", "instructor", "."];
        r[4] = ["bireme", "building_crane", "meteorology", "."];
        r[5] = ["chariot", "attack_ship", "conscription", "shipwright"];
        r[6] = ["demolition_ship", "catapult", "cryptography", "democracy"];
        r[7] = ["colonize_ship", "small_transporter", "plow", "berth"];
        r[8] = ["trireme", "phalanx", "breach", "mathematics"];
        r[9] = ["ram", "cartography", "take_over", "."];
        r[10] = ["stone_storm", "temple_looting", "divine_selection", "."];
        r[10] = ["combat_experience", "strong_wine", "set_sail", "."];
        n = RepHead();
        n += "[center]\n[b]Badania Akademickie w mieście: [/b][town]" + Game.townId + "[/town] (" + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
        n += "[table]";
        t = ITowns.towns[Game.townId].researches();
        for (y = 0; y < 4; y++)
            for (x = 0; x < 12; x++) {
                if (y == 0) {
                    if (x == 0) {
                        n += "[*]" + WhtImg(53);
                        continue
                    }
                    if (x == 11) {
                        n += "[|]" + WhtImg(53) + "[/*]";
                        continue
                    }
                } else {
                    if (x == 0) {
                        n += "[*]";
                        continue
                    }
                    if (x == 11) {
                        n += "[|][/*]";
                        continue
                    }
                }
                n += "[|]";
                e = r[x - 1][y];
                if (e == ".") continue;
                n += "[img]" + HMole.Home + "a/" + String.fromCharCode(64 + x) + (y + 1);
                if (t.hasResearch(e)) n += "a";
                else n += "i";
                n += ".gif[/img]"
            }
        n += "[/table]";
        n += RepFoot();
        return n
    }

    function _inventory() {
        r = RepHead();
        r += "[center]\n[b]" + HMole.Pop($(".inventory")) + " " + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] ([ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
        r += "[table][*]";
        r += "[/table]";
        r += RepFoot();
        return r
    }

    function _buildings() {
        var e, t, n, r, i;
        t = jGP.parent().children("div.ui-dialog-titlebar").children("span.ui-dialog-title").html();
        if (t == undefined) t = " -";
        t = t.substring(0, t.indexOf("-"));
        e = RepHead();
        e += "[center]\n[b]" + t + ": [/b][town]" + Game.townId + "[/town] (" + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
        t = ITowns.towns[Game.townId].buildings();
        bd = HMole.NewBuildData();
        if (t.getBuildingLevel("theater") != "0") bd["spc1"].mid = "theater";
        if (t.getBuildingLevel("thermal") != "0") bd["spc1"].mid = "thermal";
        if (t.getBuildingLevel("library") != "0") bd["spc1"].mid = "library";
        if (t.getBuildingLevel("lighthouse") != "0") bd["spc1"].mid = "lighthouse";
        if (bd["spc1"].mid != "spc1") {
            bd["spc1"].code = HMole.ConstBuildings[bd["spc1"].mid];
            bd["spc1"].lvl = 1
        }
        if (t.getBuildingLevel("tower") != "0") bd["spc2"].mid = "tower";
        if (t.getBuildingLevel("statue") != "0") bd["spc2"].mid = "statue";
        if (t.getBuildingLevel("oracle") != "0") bd["spc2"].mid = "oracle";
        if (t.getBuildingLevel("trade_office") != "0") bd["spc2"].mid = "trade_office";
        if (bd["spc2"].mid != "spc2") {
            bd["spc2"].code = HMole.ConstBuildings[bd["spc2"].mid];
            bd["spc2"].lvl = 1
        }
        bd["main"].lvl = t.getBuildingLevel("main");
        bd["lumber"].lvl = t.getBuildingLevel("lumber");
        bd["farm"].lvl = t.getBuildingLevel("farm");
        bd["stoner"].lvl = t.getBuildingLevel("stoner");
        bd["storage"].lvl = t.getBuildingLevel("storage");
        bd["ironer"].lvl = t.getBuildingLevel("ironer");
        bd["barracks"].lvl = t.getBuildingLevel("barracks");
        bd["temple"].lvl = t.getBuildingLevel("temple");
        bd["market"].lvl = t.getBuildingLevel("market");
        bd["docks"].lvl = t.getBuildingLevel("docks");
        bd["academy"].lvl = t.getBuildingLevel("academy");
        bd["wall"].lvl = t.getBuildingLevel("wall");
        bd["hide"].lvl = t.getBuildingLevel("hide");
        HMole.NewBuildUpdate(bd);
        e += RepBuldings(bd);
        e += RepFoot();
        return e
    }

    function _situation() {
        var e, t, n, r;
        e = RepHead();
        e += "[center]\n[b]" + HMole.Lang.situation + ": [/b][town]" + Game.townId + "[/town] (" + HMole.Lang.incoown + " [player]" + Game.player_name + "[/player] [ally]" + Game.alliance_name + "[/ally])\n\n[/center]";
        t = ITowns.towns[Game.townId];
        r = HMole.NewBuildData();
        r.spc2.mid = "tower";
        HMole.NewBuildUpdate(r);
        e += "[table]";
        e += "[*][img]" + HMole.Home + "r/swal";
        if (t.buildings().getBuildingLevel("wall") == "0") e += "d";
        e += ".gif[/img][|]" + WhtImg(89);
        e += r.wall.nam + ":[size=12][b]\n" + t.buildings().getBuildingLevel("wall") + "[/b][/size]";
        e += "[|][img]" + HMole.Home + "r/stow";
        if (t.buildings().getBuildingLevel("tower") == "0") e += "d";
        e += ".gif[/img][|]" + WhtImg(75);
        e += r.spc2.nam + ":[size=12][b]\n";
        if (t.buildings().getBuildingLevel("tower") != "0") e += HMole.Lang.yes;
        else e += HMole.Lang.lack;
        e += "[/b][/size]";
        e += "[|][img]" + HMole.Home + "r/sfall";
        if (!t.researches().hasResearch("phalanx")) e += "d";
        e += ".gif[/img][|]" + WhtImg(75);
        e += HMole.Lang.resPhalanx + ":[size=12][b]\n";
        if (t.researches().hasResearch("phalanx")) e += HMole.Lang.yes;
        else e += HMole.Lang.lack;
        e += "[/b][/size]";
        e += "[|][img]" + HMole.Home + "r/stara";
        if (!t.researches().hasResearch("ram")) e += "d";
        e += ".gif[/img][|]" + WhtImg(75);
        e += HMole.Lang.resRam + ":[size=12][b]\n";
        if (t.researches().hasResearch("ram")) e += HMole.Lang.yes;
        else e += HMole.Lang.lack;
        e += "[/b][/size]";
        e += "[|][img]" + HMole.Home + "r/sstor";
        if (t.getStorage() < 1e4) e += "d";
        e += ".gif[/img][|]" + WhtImg(80);
        e += r.hide.nam + ":[size=12][b]\n";
        if (t.getStorage() < 1e4) e += t.getStorage();
        else e += HMole.Lang.above + " 10000";
        e += "[/b][/size]";
        e += "[/*][/table]\n" + HMole.Lang.god + ": " + t.god();
        e += "\n" + HMole.Lang.inAtt + ": " + $("#MH_mna").html();
        e += "\n" + HMole.Lang.inDef + ": " + $("#MH_mns").html();
        if (t.hasConqueror()) {
            if ($("#conquest").length < 1) e += "\n\n[b]OCUPATION! ...\n\n";
            else {
                n = $("#conquest").parent();
                e += "\n\n" + n.parent().parent().find($(".ui-dialog-title")).html() + " ~" + $("#conquest").html();
                e += "\n" + HMole.Lang.by + ": [player]" + n.find($(".gp_player_link")).html() + "[/player] ([ally]" + HMole.GetPalyerAllyName(n.find($(".gp_player_link")).html()) + "[/ally])\n\n"
            }
        }
        r = 0;
        t = HMole.cma.revolts.in_current_town.arising;
        for (n in t)
            if (t.hasOwnProperty(n)) {
                if (r == 0) e += "\n\n[b]" + HMole.Lang.curInci + ":\n";
                r++;
                e += strNwhite(r, 2) + "[/b] " + HMole.Lang.startRevolt + ": [b]" + readableUnixTimestamp(t[n].started_at, "player_timezone") + "[/b] ---- " + HMole.Lang.endRevolt + ": [b]" + readableUnixTimestamp(t[n].finished_at, "player_timezone") + "[/b]\n"
            }
        r = 0;
        t = HMole.cma.revolts.in_current_town.running;
        for (n in t)
            if (t.hasOwnProperty(n)) {
                if (r == 0) e += "\n\n[b]" + HMole.Lang.curRevolt + ":\n";
                r++;
                e += strNwhite(r, 2) + "[/b] " + HMole.Lang.endRevolt + ": [b]" + readableUnixTimestamp(t[n].finished_at, "player_timezone") + "[/b]\n"
            }
        t = ITowns.towns[Game.townId];
        e += "\n[size=11]_[img]" + HMole.Home + "e/9/ocean.gif[/img] [b]M" + Math.floor(t.getIslandCoordinateX() / 100) + Math.floor(t.getIslandCoordinateY() / 100);
        e += " [img]" + HMole.Home + "gui/g" + t.god() + ".gif[/img] [town]" + Game.townId + "[/town] ";
        $.each($("#ui_box .town_name_area .casted_powers_area .list-viewport .list .casted_power"), function (t, n) {
            for (r in HMole.ConstPowers)
                if ($(this).hasClass(HMole.ConstPowers[r])) e += "[img]" + HMole.Home + "p6/" + HMole.ConstPowers[r] + ".png[/img] "
        });
        e += RepFoot();
        return e
    }

    function getPlayerInfo(e) {
        res = {};
        res.town = _getTown(e);
        res.player = _getPlayer(e);
        res.ally = _getAlly(e);
        res.townName = _getTownName(e);
        res.playerName = _getPlayerName(e);
        return res
    }

    function _getTownName(e) {
        if ($(e).find($("li.town_name a")).length > 0) return $(e).find($("li.town_name a")).html().trim();
        return ""
    }

    function _getPlayerName(e) {
        if ($(e).find($("li.town_owner a")).length > 0) return $(e).find($("li.town_owner a")).html().trim();
        return ""
    }

    function _getTown(e) {
        if ($(e).find($("li.town_name a")).length > 0) return HMole.bbc(HMole.Link2Struct($(e).find($("li.town_name a")).attr("href")).id.toString(), "town");
        else if ($(e).find($("li.town_name")).length > 0) return HMole.bbc($(e).find($("li.town_name")).html().trim(), "town");
        return ""
    }

    function _getPlayer(e) {
        if ($(e).find($("li.town_owner a")).length > 0) return HMole.bbc($(e).find($("li.town_owner a")).html(), "player");
        else return HMole.bbc($(e).find($("li.town_owner")).html().trim(), "player");
        return ""
    }

    function _getAlly(e) {
        if ($(e).find($("li.town_owner_ally a")).length > 0) return HMole.bbc($(e).find($("li.town_owner_ally a")).html(), "ally");
        return ""
    }

    function getUnitDetail(e, t) {
        $.each(jGP.find($(t)), function (t, n) {
            if (e.unit_list.length > 0) e.unit_list += "¨";
            HMole.BBB = n;
            if (n.childElementCount > 0) {
                var r = HMole.getUnitName(n.children[0]);
                var i = HMole.UnitCost(r);
                var s = n.children[1].innerHTML.replace("-", "");
                if (s == "?") s = 0;
                else {
                    e.w += i.w * parseInt(s);
                    e.s += i.s * parseInt(s);
                    e.i += i.i * parseInt(s);
                    e.p += i.p * parseInt(s);
                    e.f += i.f * parseInt(s)
                }
                e.unit_list += HMole.GetUnit(r);
                e.unit_send += HMole.bbcU(n.children[0].children[0].innerHTML, "000") + "¨";
                e.unit_lost += HMole.bbcU(s.toString(), "b50307") + "¨"
            }
        });
        return e
    }

    function getUnit(e, t) {
        $.each(jGP.find($(t)), function (t, n) {
            if (e.unit_list.length > 0) {
                e.unit_list += "¨"
            }
            var r = HMole.getUnitName(n);
            e.unit_list += HMole.GetUnit(r);
            e.unit_send += HMole.bbcU(n.childElementCount > 0 ? n.children[0].innerHTML : "?", "000") + "¨"
        });
        return e
    }

    function getBuild(e, t) {
        $.each(jGP.find($(t)), function (t, n) {
            if (e.unit_list.length > 0) e.unit_list += "¨";
            var r = HMole.getUnitName(n);
            e.unit_list += HMole.GetBuild(r);
            e.unit_img += "[img]" + HMole.Home + "vs/" + HMole.GetBuild(r) + ".gif[/img]";
            e.unit_send += HMole.bbcU(n.children[0].innerHTML, "000") + "¨"
        });
        return e
    }

    function getUnitWall(e, t) {
        var n = -1;
        var r = 0;
        $.each($(t).find($("div.wall_report_unit")), function (t, i) {
            if (r % 15 == 0) {
                if (n > -1) {
                    if (e[n]["unit_list"].length > 0) {
                        e[n]["unit_img"] = RepUnitsImgs(e[n]["unit_list"])
                    }
                }
                n++;
                e[n] = {};
                e[n]["unit_img"] = "";
                e[n]["unit_list"] = "";
                e[n]["unit_count"] = "";
                e[n]["unit_diff"] = ""
            }
            if (e[n]["unit_list"].length > 0) {
                e[n]["unit_list"] += "¨"
            }
            var s = HMole.getUnitName($(i));
            e[n]["unit_list"] += HMole.GetUnit(s);
            e[n]["unit_img"] += HMole.GetUnit(s);
            e[n]["unit_count"] += HMole.bbcU($(i).find($("span.place_unit_black")).html(), "000") + "¨";
            if ($(i).find($("div.HMoleDiff")).length > 0) {
                e[n]["unit_diff"] += HMole.bbcU($(i).find($("div.HMoleDiff")).html(), "000") + "¨"
            }
            r++
        });
        if (n > -1) {
            if (e[n]["unit_list"].length > 0) {
                e[n]["unit_img"] = RepUnitsImgs(e[n]["unit_list"])
            }
        }
    }

    function getUnitWallEx(e) {
        var t = 0;
        res = {};
        res["unit_img"] = "";
        res["unit_list"] = "";
        res["unit_count"] = "";
        res["unit_diff"] = "";
        $.each($(e).find($("div.wall_report_unit")), function (e, n) {
            if (res["unit_list"].length > 0) res["unit_list"] += "¨";
            var r = HMole.getUnitName($(n));
            res["unit_list"] += HMole.GetUnit(r);
            res["unit_img"] += HMole.GetUnit(r);
            res["unit_count"] += HMole.bbcU($(n).find($("span.place_unit_black")).html(), "000") + "¨";
            if ($(n).find($("div.HMoleDiff")).length > 0) res["unit_diff"] += HMole.bbcU($(n).find($("div.HMoleDiff")).html(), "000") + "¨";
            t++
        });
        return res
    }

    function Atob(e) {
        var t = e.split(/#/);
        return atob(t[1] || t[0])
    }

    function bbCodePreview(e, t) {
        var n;
        e = e.replace(/\uFEFF\u2591/g, HMole.bz);
        e = e.replace(/\u00A8/g, HMole.bz);
        var r = $.ajax({
            url: "/game/message?action=preview&town_id=" + Game.townId + "&h=" + Game.csrfToken + "&json=%7B%22message%22%3A%22" + encodeURIComponent(e.replace(/\n/gim, "\\n").replace(/"/gim, '\\"')) + "%22%2C%22town_id%22%3A" + Game.townId + "%2C%22nlreq_id%22%3A" + Game.notification_last_requested_id + "%7D",
            async: false
        });
        try {
            n = JSON.parse(r.responseText).json.message
        } catch (i) {
            n = null
        }
        if (n != null)
            if (n != "") {
                $(t).html(n + "<br><br><br>");
                return
            }
        $(t).html('<br><center><img alt="" src="' + Game.img() + '/game/ajax-loader.gif"/><br>... using own preview function ...</center>');
        $(HMoleRepParts).append(" own prv func");
        $.ajax({
            type: "POST",
            url: HMole.Home + "post.php",
            data: {
                lw: Game.world_id,
                q: "prv",
                bbcode: e
            },
            error: function (e, n, r) {
                $(t).html("Nie Udało się wygenerować podglądu,<br> jednak po wklejeniu na forum będzie widoczne;) <br><br><br>")
            },
            success: function (e) {
                $(t).html(e + "<br><br><br>");
                if (e == "") $(t).html("Nie Udało się wygenerować podglądu,<br> jednak po wklejeniu na forum będzie widoczne;) <br><br><br>")
            }
        })
    }

    function _fight() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.type = jGP.find($("#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\..*/, "$1");
        REP.ico = jGP.find($("#report_arrow img")).attr("src");
        REP.load = jGP.find($("#load")).html();
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.morale = jGP.find($("span.fight_bonus.morale")).length == 0 ? "" : "[img]" + HMole.Home + "r/rmorale.png[/img] " + jGP.find($("span.fight_bonus.morale")).html().strip_tags().trim();
        REP.rmorale = jGP.find($("span.fight_bonus.morale")).length == 0 ? "" : jGP.find($("span.fight_bonus.morale")).html().strip_tags().trim();
        REP.luck = jGP.find($("span.fight_bonus.luck")).length == 0 ? "" : "[img]" + HMole.Home + "r/rluck.png[/img] " + jGP.find($("span.fight_bonus.luck")).html().strip_tags().trim();
        REP.rluck = jGP.find($("span.fight_bonus.luck")).length == 0 ? "" : jGP.find($("span.fight_bonus.luck")).html().strip_tags().trim();
        if (REP.luck.indexOf("-") > -1) {
            REP.luck = "[color=#b50307]" + REP.luck + "[/color]"
        }
        REP.oldwall = jGP.find($("span.fight_bonus.oldwall")).length == 0 ? "" : "[img]" + HMole.Home + "r/rwall.png[/img] " + jGP.find($("span.fight_bonus.oldwall")).html().strip_tags().trim();
        REP.roldwall = jGP.find($("span.fight_bonus.oldwall")).length == 0 ? "" : jGP.find($("span.fight_bonus.oldwall")).html().strip_tags().trim();
        REP.nightbonus = wGP.getJQElement().find($("span.fight_bonus.nightbonus")).length == 0 ? "" : "[img]" + HMole.Home + "r/rnbonus.png[/img] " + jGP.find($("span.fight_bonus.nightbonus")).html().strip_tags().trim();
        REP.rnightbonus = wGP.getJQElement().find($("span.fight_bonus.nightbonus")).length == 0 ? "" : jGP.find($("span.fight_bonus.nightbonus")).html().strip_tags().trim();
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        REP.powerAtt = "";
        $.each(jGP.find($("div.report_side_attacker div.report_power")), function (e, t) {
            REP.powerAtt += HMole.getPowerIcon($(t))
        });
        REP.powerDef = "";
        $.each(jGP.find($("div.report_side_defender div.report_power")), function (e, t) {
            REP.powerDef += HMole.getPowerIcon($(t))
        });
        REP.att.unit_img = "";
        REP.att.unit_send = "";
        REP.att.unit_lost = "";
        REP.att.unit_list = "";
        REP.att.w = 0;
        REP.att.s = 0;
        REP.att.i = 0;
        REP.att.p = 0;
        REP.att.f = 0;
        REP.def.unit_img = "";
        REP.def.unit_send = "";
        REP.def.unit_lost = "";
        REP.def.unit_list = "";
        REP.def.w = 0;
        REP.def.s = 0;
        REP.def.i = 0;
        REP.def.p = 0;
        REP.def.f = 0;
        if (RT == "attack_support") {
            if (!HMole.gRAP.HideDefUnits) REP.def = getUnitDetail(REP.def, "div.report_side_attacker_unit")
        } else {
            if (!HMole.gRAP.HideAttUnits) REP.att = getUnitDetail(REP.att, "div.report_side_attacker_unit");
            if (!HMole.gRAP.HideDefUnits) REP.def = getUnitDetail(REP.def, "div.report_side_defender_unit")
        }
        REP.resources = {};
        REP.resources.title = "";
        REP.resources.detail = "";
        REP.resources.image = "";
        REP.resources.count = "";
        REP.resources.wood = "";
        REP.resources.stone = "";
        REP.resources.iron = "";
        REP.resources.power = "";
        REP.resources.title = jGP.find($("div#resources h4")).length == 0 ? jGP.find($("div#resources p")).html() : jGP.find($("div#resources h4")).html();
        $.each(jGP.find($("div#resources li.res_background span.bold")), function (e, t) {
            REP.resources.count += HMole.bbcU(t.innerHTML, "000") + "¨";
            switch (e) {
            case 0:
                REP.resources.wood = t.innerHTML;
                break;
            case 1:
                REP.resources.stone = t.innerHTML;
                break;
            case 2:
                REP.resources.iron = t.innerHTML;
                break;
            case 3:
                REP.resources.power = t.innerHTML;
                break
            }
        });
        REP.bunt = "";
        if (jGP.find($("div#resources p")).length == 1 && jGP.find($("div#resources span")).length == 1) {
            REP.bunt = jGP.find($("div#resources span")).html().strip_tags()
        } else {
            if (jGP.find($("div#resources h4")).length == 1 && jGP.find($("div#resources span")).length == (Game.is_hero_world ? 6 : 5)) {
                REP.bunt = jGP.find($("div#resources span"))[Game.is_hero_world ? 5 : 4].innerHTML
            }
        }
    }

    function _attack_support() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.type = jGP.find($("#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\..*/, "$1");
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.morale = jGP.find($("span.fight_bonus.morale")).length == 0 ? "" : HMoleType.morale + jGP.find($("span.fight_bonus.morale")).html().strip_tags().trim();
        REP.luck = jGP.find($("span.fight_bonus.luck")).length == 0 ? "" : HMoleType.luck + jGP.find($("span.fight_bonus.luck")).html().strip_tags().trim();
        if (REP.luck.indexOf("-") > -1) {
            REP.luck = "[color=#b50307]" + REP.luck + "[/color]"
        }
        REP.oldwall = jGP.find($("span.fight_bonus.oldwall")).length == 0 ? "" : HMoleType.oldwall + jGP.find($("span.fight_bonus.oldwall")).html().strip_tags().trim();
        REP.nightbonus = wGP.getJQElement().find($("span.fight_bonus.nightbonus")).length == 0 ? "" : HMoleType.nightbonus + jGP.find($("span.fight_bonus.nightbonus")).html().strip_tags().trim();
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        REP.powerAtt = "";
        REP.powerDef = "";
        REP.def.unit_img = "";
        REP.def.unit_send = "";
        REP.def.unit_lost = "";
        REP.def.unit_list = "";
        REP.def.w = 0;
        REP.def.s = 0;
        REP.def.i = 0;
        REP.def.p = 0;
        REP.def.f = 0;
        if (!HMole.gRAP.HideDefUnits) {
            REP.def = getUnitDetail(REP.def, "div.support_report_summary div.report_units.report_side_defender div.report_side_defender_unit")
        }
        REP.bunt = "";
        if (jGP.find($("div#resources p")).length == 1 && jGP.find($("div#resources span")).length == 1) {
            REP.bunt = jGP.find($("div#resources span")).html().strip_tags()
        } else {
            if (jGP.find($("div#resources h4")).length == 1 && jGP.find($("div#resources span")).length == (Game.is_hero_world ? 6 : 5)) {
                REP.bunt = jGP.find($("div#resources span"))[Game.is_hero_world ? 5 : 4].innerHTML
            }
        }
    }

    function _raise() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.type = jGP.find($("#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\..*/, "$1");
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.morale = jGP.find($("span.fight_bonus.morale")).length == 0 ? "" : "[img]" + HMole.Home + "r/rmorale.png[/img] " + jGP.find($("span.fight_bonus.morale")).html().strip_tags().trim();
        REP.luck = jGP.find($("span.fight_bonus.luck")).length == 0 ? "" : "[img]" + HMole.Home + "r/rluck.png[/img] " + jGP.find($("span.fight_bonus.luck")).html().strip_tags().trim();
        if (REP.luck.indexOf("-") > -1) {
            REP.luck = "[color=#b50307]" + REP.luck + "[/color]"
        }
        REP.oldwall = jGP.find($("span.fight_bonus.oldwall")).length == 0 ? "" : "[img]" + HMole.Home + "r/rwall.png[/img] " + jGP.find($("span.fight_bonus.oldwall")).html().strip_tags().trim();
        REP.nightbonus = wGP.getJQElement().find($("span.fight_bonus.nightbonus")).length == 0 ? "" : "[img]" + HMole.Home + "r/rnbonus.png[/img] " + jGP.find($("span.fight_bonus.nightbonus")).html().strip_tags().trim();
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        REP.powerAtt = REP.powerDef = "";
        $.each(jGP.find($("div.report_power")), function (e, t) {
            REP.powerAtt += HMole.getPowerIcon($(t))
        });
        REP.att.unit_img = "";
        REP.att.unit_send = "";
        REP.att.unit_lost = "";
        REP.att.unit_list = "";
        REP.att.w = 0;
        REP.att.s = 0;
        REP.att.i = 0;
        REP.att.p = 0;
        REP.att.f = 0;
        REP.def.unit_img = "";
        REP.def.unit_send = "";
        REP.def.unit_lost = "";
        REP.def.unit_list = "";
        REP.def.w = 0;
        REP.def.s = 0;
        REP.def.i = 0;
        REP.def.p = 0;
        REP.def.f = 0;
        if (RT == "attack_support") {
            if (!HMole.gRAP.HideDefUnits) REP.def = getUnitDetail(REP.def, "div#left_side>div")
        } else {
            if (!HMole.gRAP.HideAttUnits) REP.att = getUnitDetail(REP.att, "div#left_side>div");
            if (!HMole.gRAP.HideDefUnits) REP.def = getUnitDetail(REP.def, "div#right_side>div")
        }
        REP.resources = {};
        REP.resources.title = "";
        REP.resources.detail = "";
        REP.resources.image = "";
        REP.resources.count = "";
        REP.resources.wood = "";
        REP.resources.stone = "";
        REP.resources.iron = "";
        REP.resources.title = jGP.find($("div#resources h4")).length == 0 ? jGP.find($("div#resources p")).html() : jGP.find($("div#resources h4")).html();
        $.each(jGP.find($("div#resources li.res_background span.bold")), function (e, t) {
            REP.resources.count += HMole.bbcU(t.innerHTML, "000") + "¨";
            switch (e) {
            case 0:
                REP.resources.wood = t.innerHTML;
                break;
            case 1:
                REP.resources.stone = t.innerHTML;
                break;
            case 2:
                REP.resources.iron = t.innerHTML;
                break
            }
        });
        REP.resources.detail = "[img]" + HMole.Home + "r/res.gif[/img]\\n¨" + HMole.bbcS(HMole.bbcVAL(parseInt(REP.resources.wood), 6) + "¨¨¨" + HMole.bbcVAL(parseInt(REP.resources.stone), 6) + "¨¨¨" + HMole.bbcVAL(parseInt(REP.resources.iron), 6), 7);
        REP.bunt = "";
        if (jGP.find($("div#resources p")).length == 1 && jGP.find($("div#resources span")).length == 1) {
            REP.bunt = jGP.find($("div#resources span")).html()
        } else {
            if (jGP.find($("div#resources h4")).length == 1 && jGP.find($("div#resources span")).length == 5) {
                REP.bunt = jGP.find($("div#resources span"))[4].innerHTML
            }
        }
    }

    function _powers() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        REP.morale = "";
        REP.luck = "";
        REP.oldwall = "";
        REP.nightbonus = "";
        REP.efekt = {};
        REP.type = -1;
        REP.resources = {};
        REP.res = {};
        REP.powerid = jGP.find($("div#report_power_symbol")).attr("class").replace(/power_icon86x86 (.*)/, "$1");
        REP.power = HMole.bbc(HMole.Home + "pow/" + jGP.find($("div#report_power_symbol")).attr("class").replace(/power_icon86x86 (.*)/, "$1") + ".png", "img");
        switch (jGP.find($("div#report_power_symbol")).attr("class").replace(/power_icon86x86 (.*)/, "$1")) {
        case "happiness":
        case "fertility_improvement":
        case "bolt":
        case "earthquake":
        case "call_of_the_ocean":
        case "town_protection":
        case "cap_of_invisibility":
            REP.type = 1;
            break;
        case "sea_storm":
        case "divine_sign":
        case "wisdom":
        case "transformation":
        case "patroness":
        case "resurrection":
            REP.type = 2;
            break;
        case "kingly_gift":
        case "wedding":
            REP.type = 3;
            break;
        case "fair_wind":
        case "strength_of_heroes":
        case "desire":
        case "pest":
        case "underworld_treasures":
            REP.type = 4;
            break
        }
        REP.efekt.title = jGP.find($("div#left_side h4")).html();
        switch (REP.type) {
        case 1:
            REP.efekt.det = jGP.find($("#right_side p")).html();
            REP.efekt.detail = jGP.find($("#right_side p")).html().strip_tags().trim();
            break;
        case 2:
            REP.efekt.detail = jGP.find($("#right_side h4")).html();
            REP.resources.image = "";
            REP.resources.count = "";
            REP.resources.unit_list = "";
            REP.resources.unit_img = "";
            $.each(jGP.find($("#right_side div.report_unit")), function (e, t) {
                var n = HMole.getUnitName(t);
                if (REP.resources.unit_list.length > 0) {
                    REP.resources.unit_list += "¨"
                }
                REP.resources.unit_list += HMole.GetUnit(n);
                REP.resources.count += HMole.bbcU(t.children[0].innerHTML, "000") + "¨"
            });
            REP.res.img = RepUnitsImgs(REP.resources.unit_list);
            break;
        case 3:
            REP.efekt.detail = jGP.find($("#report_result")).html();
            REP.resources.image = REP.resources.count = "";
            REP.resources.image = "[img]" + HMole.Home + "r/res.gif[/img]";
            $.each(jGP.find($(".res_background>span")), function (e, t) {
                REP.resources.count += HMole.bbcU(t.innerHTML, "000") + "¨" + "¨"
            });
            break
        }
    }

    function _illusion() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        REP.morale = "";
        REP.luck = "";
        REP.oldwall = "";
        REP.nightbonus = "";
        REP.efekt = {};
        REP.type = -1;
        REP.resources = {};
        REP.efekt.title = jGP.find($("div#report_game_body p")).html().strip_tags().trim()
    }

    function _support() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.type = jGP.find($("#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\..*/, "$1");
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.morale = jGP.find($("span.fight_bonus.morale")).length == 0 ? "" : "[img]" + HMole.Home + "r/rmorale.png[/img] " + jGP.find($("span.fight_bonus.morale")).html().strip_tags().trim();
        REP.luck = jGP.find($("span.fight_bonus.luck")).length == 0 ? "" : "[img]" + HMole.Home + "r/rluck.png[/img] " + jGP.find($("span.fight_bonus.luck")).html().strip_tags().trim();
        if (REP.luck.indexOf("-") > -1) {
            REP.luck = "[color=#b50307]" + REP.luck + "[/color]"
        }
        REP.oldwall = jGP.find($("span.fight_bonus.oldwall")).length == 0 ? "" : "[img]" + HMole.Home + "r/rwall.png[/img] " + jGP.find($("span.fight_bonus.oldwall")).html().strip_tags().trim();
        REP.nightbonus = wGP.getJQElement().find($("span.fight_bonus.nightbonus")).length == 0 ? "" : "[img]" + HMole.Home + "r/rnbonus.png[/img] " + jGP.find($("span.fight_bonus.nightbonus")).html().strip_tags().trim();
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        REP.power = jGP.find($("div.report_power")).length == 0 ? "" : HMole.bbc(HMole.Home + "pow/" + jGP.find($("div.report_power")).attr("id") + ".png", "img");
        REP.att.unit_img = "";
        REP.att.unit_send = "";
        REP.att.unit_list = "";
        if (!HMole.gRAP.HideAttUnits) REP.att = getUnit(REP.att, "div.report_unit")
    }

    function _command() {
        REP.title = jGP.parent().children("div.ui-dialog-titlebar").children("span.ui-dialog-title").html();
        REP.time = "";
        REP.ico = jGP.find($(".command_icon_wrapper img")).attr("src");
        REP.back = jGP.find($(".command_icon_wrapper img")).length == 1;
        REP.detail = {};
        REP.att = {};
        REP.def = {};
        REP.ret = jGP.find($("div.return")).length > 0;
        REP.farm = jGP.find($(".command_icon_wrapper img")).length > 1 && jGP.find($(".command_icon_wrapper img")).attr("src").match(/.*\/(farm).*/) ? true : false;
        REP.miss = false;
        if (jGP.find($(".attacker .report_town_bg_quest")).length > 0) {
            REP.miss = "idef";
            REP.def.town = REP.farm ? HMole.bbc(jGP.find($("div.defender li")).html(), "town") : HMole.bbc(HMole.Link2Struct(jGP.find($("div.defender a.gp_town_link")).attr("href")).id.toString(), "town");
            REP.def.townName = REP.farm ? HMole.bbc(jGP.find($("div.defender li")).html(), "town") : jGP.find($("div.defender a.gp_town_link")).html();
            REP.def.player = REP.farm ? "" : HMole.bbc(jGP.find($("div.defender a.gp_player_link")).html(), "player");
            REP.def.playerName = REP.farm ? "" : jGP.find($("div.defender a.gp_player_link")).html();
            REP.att.player = jGP.find($("div.attacker li:first")).html();
            REP.att.playerName = REP.att.player
        } else if (jGP.find($(".defender .report_town_bg_quest")).length > 0) {
            REP.miss = "iatk";
            REP.att.town = HMole.bbc(HMole.Link2Struct(jGP.find($("div.attacker a.gp_town_link")).attr("href")).id.toString(), "town");
            REP.att.townName = jGP.find($("div.attacker a.gp_town_link")).html();
            REP.att.player = HMole.bbc(jGP.find($("div.attacker a.gp_player_link")).html(), "player");
            REP.att.playerName = jGP.find($("div.attacker a.gp_player_link")).html();
            REP.def.player = jGP.find($("div.defender li:first")).html();
            REP.def.playerName = REP.def.player
        } else if (!REP.ret) {
            if (!REP.back) {
                REP.att.town = HMole.bbc(HMole.Link2Struct(jGP.find($("div.attacker a.gp_town_link")).attr("href")).id.toString(), "town");
                REP.att.townName = jGP.find($("div.attacker a.gp_town_link")).html();
                REP.att.player = HMole.bbc(jGP.find($("div.attacker a.gp_player_link")).html(), "player");
                REP.att.playerName = jGP.find($("div.attacker a.gp_player_link")).html()
            }
            REP.def.town = REP.farm ? HMole.bbc(jGP.find($("div.defender li")).html(), "town") : HMole.bbc(HMole.Link2Struct(jGP.find($("div.defender a.gp_town_link")).attr("href")).id.toString(), "town");
            REP.def.townName = REP.farm ? HMole.bbc(jGP.find($("div.defender li")).html(), "town") : jGP.find($("div.defender a.gp_town_link")).html();
            REP.def.player = REP.farm ? "" : HMole.bbc(jGP.find($("div.defender a.gp_player_link")).html(), "player");
            REP.def.playerName = REP.farm ? "" : jGP.find($("div.defender a.gp_player_link")).html()
        } else {
            if (!REP.back) {
                REP.def.town = REP.farm ? HMole.bbc(jGP.find($("div.attacker li")).html(), "town") : HMole.bbc(HMole.Link2Struct(jGP.find($("div.attacker a.gp_town_link")).attr("href")).id.toString(), "town");
                REP.def.townName = REP.farm ? HMole.bbc(jGP.find($("div.attacker li")).html(), "town") : jGP.find($("div.attacker a.gp_town_link")).html();
                REP.def.player = REP.farm ? "" : HMole.bbc(jGP.find($("div.attacker a.gp_player_link")).html(), "player");
                REP.def.playerName = REP.farm ? "" : jGP.find($("div.attacker a.gp_player_link")).html()
            }
            REP.att.town = HMole.bbc(HMole.Link2Struct(jGP.find($("div.defender a.gp_town_link")).attr("href")).id.toString(), "town");
            REP.att.townName = jGP.find($("div.defender a.gp_town_link")).html();
            REP.att.player = HMole.bbc(jGP.find($("div.defender a.gp_player_link")).html(), "player");
            REP.att.playerName = jGP.find($("div.defender a.gp_player_link")).html()
        } if (REP.att.playerName == null) {
            REP.att.player = "";
            REP.att.playerName = ""
        }
        if (REP.def.playerName == null) {
            REP.def.player = "";
            REP.def.playerName = ""
        }
        if ($("#MSGHIDAT").attr("checked")) {
            REP.att.town = HMole.bbc(HMole.Lang.HIDDEN, "town");
            REP.title = REP.title.replace(" (" + REP.att.playerName + ")", "");
            REP.title = REP.title.replace(REP.att.townName, REP.att.playerName)
        }
        if ($("#MSGHIDDE").attr("checked")) {
            REP.def.town = HMole.bbc(HMole.Lang.HIDDEN, "town");
            REP.title = REP.title.replace(" (" + REP.def.playerName + ")", "");
            REP.title = REP.title.replace(REP.def.townName, REP.def.playerName)
        }
        REP.detail.time_title = jGP.find($("fieldset.command_info_time legend")).html();
        REP.detail.time_time = jGP.find($("fieldset.command_info_time .arrival_time")).html();
        REP.att.units_title = jGP.find($("fieldset.command_info_units legend")).html();
        REP.att.unit_img = "";
        REP.att.unit_send = "";
        REP.att.unit_list = "";
        REP.att = getUnit(REP.att, jGP.find($("fieldset.command_info_units div.index_unit")));
        REP.detail.power_title = jGP.find($("fieldset.command_info_casted_powers legend")).html();
        REP.detail.power_img = "";
        $.each(jGP.find($("fieldset.command_info_casted_powers div.index_town_powers")), function (e, t) {
            REP.detail.power_img += HMole.getPowerIcon($(t))
        });
        REP.resources = {};
        REP.resources.title = "";
        REP.resources.detail = "";
        REP.resources.image = "";
        REP.resources.count = "";
        REP.resources.wood = "";
        REP.resources.stone = "";
        REP.resources.iron = "";
        REP.resources.title = jGP.find($("fieldset.command_info_res legend")).html();
        $.each(jGP.find($("fieldset.command_info_res li.res_background span")), function (e, t) {
            REP.resources.count += HMole.bbcU(t.innerHTML, "000") + "¨";
            switch (e) {
            case 0:
                REP.resources.wood = t.innerHTML;
                break;
            case 1:
                REP.resources.stone = t.innerHTML;
                break;
            case 2:
                REP.resources.iron = t.innerHTML;
                break
            }
        });
        REP.resources.detail = "[img]" + HMole.Home + "r/res.gif[/img]\\n¨" + HMole.bbcS(HMole.bbcVAL(parseInt(REP.resources.wood), 6) + "¨¨¨" + HMole.bbcVAL(parseInt(REP.resources.stone), 6) + "¨¨¨" + HMole.bbcVAL(parseInt(REP.resources.iron), 6), 7);
        REP.bunt = "";
        if (jGP.find($("div#resources p")).length == 1 && jGP.find($("div#resources span")).length == 1) {
            REP.bunt = jGP.find($("div#resources span")).html()
        } else {
            if (jGP.find($("div#resources h4")).length == 1 && jGP.find($("div#resources span")).length == 5) {
                REP.bunt = jGP.find($("div#resources span"))[4].innerHTML
            }
        }
    }

    function _command_curator() {
        REP.title = jGP.find($("div.game_header")).html().strip_tags();
        REP.time = "";
        REP.linia = {};
        if (jGP.find($("#tab_all ul#command_overview li")).length > 0) {
            var e = 0;
            $.each(jGP.find($("#tab_all ul#command_overview li")), function (e, t) {
                REP.linia[e] = {
                    title: "",
                    img: null,
                    image: null,
                    townIdA: null,
                    townIdB: null,
                    townA: null,
                    townB: null,
                    playerA: null,
                    playerB: null,
                    inout: null,
                    in_out: "out",
                    power: "",
                    unit_img: "",
                    unit_send: "",
                    unit_list: "",
                    spy: "",
                    time: ""
                };
                if ($(t).find($("h4")).length > 0) {
                    REP.linia[e].title = "[b]" + $(t).find($("h4")).html().strip_tags() + "[/b]"
                } else {
                    if ($(t).find($("span.italic")).length > 0) {
                        REP.linia[e].title = "[i]" + $(t).find($("span.italic")).html().strip_tags() + "[/i]"
                    } else {
                        if ($(t).hasClass("place_command")) {
                            REP.linia[e].img = HMole.getCommandIcon($(t).find("div.cmd_img"));
                            for (var n in HMole.ConstCommands)
                                if ($(t).find("div.cmd_img").hasClass(HMole.ConstCommands[n])) REP.linia[e].image = HMole.ConstCommands[n];
                            REP.linia[e].townIdB = "";
                            $.each($(t).find("a.gp_town_link"), function (n, r) {
                                if (n == 0) {
                                    REP.linia[e].townIdA = HMole.bbc(HMole.Link2Struct(r.getAttribute("href")).id.toString(), "town")
                                } else {
                                    REP.linia[e].townIdB = HMole.bbc(HMole.Link2Struct(r.getAttribute("href")).id.toString(), "town")
                                }
                                REP.linia[e].inout = HMole.bbc(HMole.Home + "m/" + ($(t).find(".overview_incoming").length == 0 ? "out" : "in") + ".png", "img");
                                REP.linia[e].in_out = $(t).find(".overview_incoming").length == 0 ? "out" : "in"
                            });
                            REP.linia[e].townA = REP.linia[e].townIdA;
                            REP.linia[e].townB = REP.linia[e].townIdB;
                            $.each($(t).find("a.gp_player_link"), function (n, r) {
                                if (n == 0) {
                                    REP.linia[e].townIdA += HMole.bbc($(r).html(), "player");
                                    REP.linia[e].playerA = HMole.bbc($(r).html(), "player")
                                } else {
                                    REP.linia[e].townIdB += HMole.bbc($(r).html(), "player");
                                    REP.linia[e].playerB = HMole.bbc($(r).html(), "player")
                                }
                                REP.linia[e].inout = HMole.bbc(HMole.Home + "m/" + ($(t).find(".overview_incoming").length == 0 ? "out" : "in") + ".png", "img")
                            });
                            REP.linia[e].time = $(t).find(".troops_arrive_at").html();
                            REP.linia[e].power = HMole.getPowerIcon($(t).find("div.casted_power"));
                            if ($(t).attr("id").replace(/.*_(espionage).*/, "$1") == "espionage") {} else {
                                $.each($(t).find("div.command_overview_units div.place_unit"), function (t, n) {
                                    if (REP.linia[e].unit_list.length > 0) {
                                        REP.linia[e].unit_list += "¨"
                                    }
                                    var r = HMole.getUnitName(n);
                                    REP.linia[e].unit_list += HMole.GetUnit(r);
                                    REP.linia[e].unit_send += HMole.bbcU(n.children[0].innerHTML, "000") + "¨"
                                })
                            }
                        }
                    }
                }
            })
        }
    }

    function _espionage() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.morale = "";
        REP.luck = "";
        REP.oldwall = "";
        REP.nightbonus = "";
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        REP.def.title = jGP.find($("div#left_side>h4")).html();
        REP.def.unit_img = "";
        REP.def.unit_send = "";
        REP.def.unit_list = "";
        REP.def = getUnit(REP.def, "div#left_side>div.report_unit");
        REP.build = {};
        REP.build.title = jGP.find($("div#spy_buildings>h4")).html();
        REP.build.unit_img = "";
        REP.build.unit_send = "";
        REP.build.unit_list = "";
        REP.build = getBuild(REP.build, "div#spy_buildings>div.report_unit");
        REP.iron = {};
        if (jGP.find($("div#right_side>h4")).length > 0) {
            REP.iron.title = jGP.find($("div#right_side>h4"))[0].innerHTML
        } else {
            if (jGP.find($("div#right_side>p")).length > 0) {
                REP.iron.title = jGP.find($("div#right_side>p"))[0].innerHTML.replace(/(.*:).*/, "$1")
            } else {
                REP.iron.title = jGP.find($("div#report_game_body>div>p")).html().trim()
            }
        }
        REP.iron.count = jGP.find($("div#right_side")).length > 0 ? jGP.find($("#payed_iron span")).html() || jGP.find($("div#right_side>p"))[0].innerHTML.replace(/.*:([0-9]*)/, "$1").trim() : "";
        REP.resources = {};
        REP.resources.title = "";
        REP.resources.detail = "";
        REP.resources.image = "";
        REP.resources.count = "";
        REP.resources.wood = "";
        REP.resources.stone = "";
        REP.resources.iron = "";
        REP.resources.title = jGP.find($("div#right_side>h4")).length > 0 ? jGP.find($("div#right_side>h4"))[1].innerHTML : "";
        $.each(jGP.find($("div#resources li.res_background span.bold")), function (e, t) {
            REP.resources.count += HMole.bbcU(t.innerHTML, "000") + "¨";
            switch (e) {
            case 0:
                REP.resources.wood = t.innerHTML;
                break;
            case 1:
                REP.resources.stone = t.innerHTML;
                break;
            case 2:
                REP.resources.iron = t.innerHTML;
                break
            }
        });
        REP.resources.detail = "[img]" + HMole.Home + "r/res.gif[/img]\n¨" + HMole.bbcS(HMole.bbcVAL(parseInt(REP.resources.wood), 6) + "¨¨¨" + HMole.bbcVAL(parseInt(REP.resources.stone), 6) + "¨¨¨" + HMole.bbcVAL(parseInt(REP.resources.iron), 6), 7)
    }

    function _conquerOld() {
        REP.title = jGP.find($("#conqueror_units_in_town>span")).html();
        REP.time = jGP.find($("div.clearfix"))[0].innerHTML.strip_tags().trim().replace(/\n/gi, "").replace(/.*(\(.*\)).*/, "$1");
        REP.att = {};
        REP.def = {};
        REP.def.town = HMole.bbc(HMole.Link2Struct(jGP.find($("div.clearfix a.gp_town_link")).attr("href")).id.toString(), "town");
        REP.def.townName = jGP.find($("div.clearfix a.gp_town_link")).html();
        REP.def.player = HMole.bbc(jGP.find($("div.clearfix a.gp_player_link")).html(), "player");
        REP.def.playerName = jGP.find($("div.clearfix a.gp_player_link")).html();
        if (REP.def.player == null) {
            REP.def.player = "";
            REP.def.playerName = ""
        }
        if ($("#MSGHIDDE").attr("checked")) {
            REP.def.town = HMole.bbc(HMole.Lang.HIDDEN, "town")
        }
        REP.att.units_title = jGP.find($("div.clearfix div.bold")).html();
        REP.att.unit_img = "";
        REP.att.unit_send = "";
        REP.att.unit_list = "";
        REP.att = getUnit(REP.att, jGP.find($("div.clearfix div.index_unit")))
    }

    function _conquer() {
        REP.title = jGP.find($("#report_report_header")).html().strip_tags().replace("&nbsp;", " ").trim();
        REP.type = jGP.find($("#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\..*/, "$1");
        REP.time = "(" + jGP.find($("#report_date")).html() + ") ";
        REP.morale = "";
        REP.luck = "";
        REP.oldwall = "";
        REP.nightbonus = "";
        REP.att = getPlayerInfo(jGP.find($("#report_sending_town")));
        REP.def = getPlayerInfo(jGP.find($("#report_receiving_town")));
        var e = jGP.find($("#report_game_body p a.gp_town_link")).length == 0 ? "" : HMole.bbc(HMole.Link2Struct(jGP.find($("#report_game_body p a.gp_town_link")).attr("href")).id.toString(), "town");
        var t = jGP.find($("#report_game_body p a.gp_player_link")).length == 0 ? "" : HMole.bbc(jGP.find($("#report_game_body p a.gp_player_link")).html(), "player");
        REP.detail = jGP.find($("#report_game_body p")).html().trim().replace(/\(<a.*gp_player_link.*\/a>\)/, "(" + t + ")").replace(/<a.*gp_town_link.*\/a>/, e)
    }

    function _conquerTroops() {
        REP.title = jGP.parent().find($(".ui-dialog-title")).html();
        REP.type = "";
        REP.time = "";
        REP.timeNOW = getHumanReadableTimeDate(Timestamp.serverTimeToLocal());
        REP.power = "";
        REP.morale = "";
        REP.luck = "";
        REP.oldwall = "";
        REP.nightbonus = "";
        REP.att = {};
        REP.def = {};
        REP.command = {};
        REP.command.title = jGP.find($("div.tab_content>span")).html();
        if (jGP.find($("ul#unit_movements")).length == 0) {
            REP.command.title = "\n[i]" + jGP.find($(".gpwindow_content>span")).html() + "[/i]"
        } else {
            REP.linia = {};
            $.each(jGP.find($("ul#unit_movements>li")), function (ind, elem) {
                REP.linia[ind] = {};
                REP.linia[ind].inout = HMole.bbc(HMole.Home + "m/" + ($(elem).attr("class").replace(/.*(incoming).*/, "$1").length == 0 ? "out" : "in") + ".png", "img");
                REP.linia[ind].img = HMole.bbc($(elem).find($("img.command_type")).attr("src"), "img");
                var _tbtime = $(elem).find("div>span.eta").html().split(":"),
                    _sec = parseInt(_tbtime[0]) * 60 * 60 + parseInt(_tbtime[1]) * 60 + parseInt(_tbtime[2]),
                    _time = formatDateTimeNice(Timestamp.server() + parseInt(_sec), true);
                REP.linia[ind].time = _time;
                REP.linia[ind].text = HMole.bbc(eval("tmpArray=" + Atob($(elem).find($("a.gp_town_link")).attr("href"))).id.toString(), "town");
                REP.linia[ind].time_eta = $(elem).find("div>span.eta").html();
                REP.linia[ind].town = HMole.bbc(HMole.Link2Struct($($(elem).find("div")[2]).find("a").attr("href")).id.toString(), "town");
                REP.linia[ind].text += " [player]" + HMole.GetTownPlayerName(HMole.Link2Struct($($(elem).find("div")[2]).find("a").attr("href")).id) + "[/player]"
            })
        }
    }

    function _conquest() {
        REP.title = jGP.parent().find($(".ui-dialog-title")).html();
        REP.type = "";
        REP.time = jGP.find($("div#conquest")).html();
        REP.timeNOW = getHumanReadableTimeDate(Timestamp.serverTimeToLocal());
        REP.power = "";
        REP.morale = "";
        REP.luck = "";
        REP.oldwall = "";
        REP.nightbonus = "";
        REP.att = {};
        REP.def = {};
        REP.command = {};
        REP.att.title = $(jGP.find($("h4"))[0]).html();
        REP.att.player = HMole.bbc(jGP.find($("a.gp_player_link")).html(), "player");
        REP.def.town = HMole.bbc(HMole.Link2Struct(jGP.find($("a.gp_town_link")).attr("href")).id.toString(), "town");
        REP.att.unit_img = "";
        REP.att.unit_send = "";
        REP.att.unit_list = "";
        if (!HMole.gRAP.HideAttUnits) REP.att = getUnit(REP.att, "div.report_unit");
        REP.command.title = $(jGP.find($("h4"))[1]).html();
        REP.linia = {};
        if (jGP.find($("ul#unit_movements")).length == 0) {
            REP.command.title = "\n[i]" + jGP.find($(".gpwindow_content>span")).html() + "[/i]"
        } else {
            REP.linia = {};
            $.each(jGP.find($("ul#unit_movements>li")), function (e, t) {
                REP.linia[e] = {};
                REP.linia[e].inout = HMole.bbc(HMole.Home + "m/" + ($(t).attr("class").replace(/.*(incoming).*/, "$1").length == 0 ? "out" : "in") + ".png", "img");
                REP.linia[e].img = HMole.bbc($(t).find($("img.command_type")).attr("src"), "img");
                var n = $(t).find("div>span.eta").html().split(":"),
                    r = parseInt(n[0]) * 60 * 60 + parseInt(n[1]) * 60 + parseInt(n[2]),
                    i = formatDateTimeNice(Timestamp.server() + parseInt(r), true);
                REP.linia[e].time = i;
                REP.linia[e].text = $($(t).find("div")[2]).html().replace(/.*<span.*span>(.*)/, "$1").strip_tags().trim();
                REP.linia[e].time_eta = $(t).find("div>span.eta").html();
                e++
            })
        }
    }

    function _agora() {
        REP.title = jGP.find($("#place_defense #defense_header")).html() + " " + HMole.bbc(Game.townId.toString(), "town");
        REP.time = "";
        REP.linia = {};
        $.each(jGP.find($("li.place_units")), function (e, t) {
            var n = "";
            var r = "";
            if ($(t).children("h4").children("a.gp_town_link").length > 0) {
                n = HMole.bbc(HMole.Link2Struct($(t).children("h4").children("a.gp_town_link").attr("href")).id.toString(), "town")
            }
            if ($(t).children("h4").children("a.gp_player_link").length > 0) {
                r = HMole.bbc($(t).children("h4").children("a.gp_player_link").html(), "player")
            }
            if ($("#MSGHIDAT").attr("checked")) {
                n = HMole.bbc(HMole.Lang.HIDDEN, "town")
            }
            REP.linia[e] = {};
            REP.linia[e].titleOrg = $(t).children("h4").html();
            if (r != "") {
                REP.linia[e].title = $(t).children("h4").html().replace(/(.*)<a.*\/a>.*(<a.*\/a>).*/, "$1") + n + " (" + r + ")"
            } else {
                REP.linia[e].title = $(t).children("h4").html().replace(/(.*)<a.*\/a>/, "$1") + n
            }
            REP.linia[e].unit_img = "";
            REP.linia[e].unit_send = "";
            REP.linia[e].unit_list = "";
            $.each($(t).children("div"), function (t, n) {
                if (REP.linia[e].unit_list.length > 0) {
                    REP.linia[e].unit_list += "¨"
                }
                var r = HMole.getUnitName(n);
                REP.linia[e].unit_list += HMole.GetUnit(r);
                REP.linia[e].unit_send += HMole.bbcU(n.children[0].innerHTML, "000") + "¨"
            })
        })
    }

    function _agora2() {
        REP.title = jGP.find($("#place_defense .game_header")).html() + " " + HMole.bbc(Game.townId.toString(), "town");
        REP.time = "";
        REP.linia = {};
        $.each(jGP.find($("li")), function (e, t) {
            var n = "";
            var r = "";
            if ($(t).children("h4").children("a.gp_town_link").length > 0) {
                n = HMole.bbc(HMole.Link2Struct($(t).children("h4").children("a.gp_town_link").attr("href")).id.toString(), "town")
            }
            if ($(t).children("h4").children("a.gp_player_link").length > 0) {
                r = HMole.bbc($(t).children("h4").children("a.gp_player_link").html(), "player")
            }
            if ($("#MSGHIDAT").attr("checked")) {
                n = HMole.bbc(HMole.Lang.HIDDEN, "town")
            }
            REP.linia[e] = {};
            REP.linia[e].titleOrg = $(t).children("h4").html();
            if (r != "") {
                REP.linia[e].title = $(t).children("h4").html().replace(/(.*)<a.*\/a>.*(<a.*\/a>).*/, "$1") + n + " (" + r + ")"
            } else {
                REP.linia[e].title = $(t).children("h4").html().replace(/(.*)<a.*\/a>/, "$1") + n
            }
            REP.linia[e].unit_img = "";
            REP.linia[e].unit_send = "";
            REP.linia[e].unit_list = "";
            $.each($(t).children("a.place_unit"), function (t, n) {
                if (REP.linia[e].unit_list.length > 0) {
                    REP.linia[e].unit_list += "¨"
                }
                var r = $(n).attr("class").split(/\s/)[5];
                REP.linia[e].unit_list += HMole.GetUnit(r);
                REP.linia[e].unit_send += HMole.bbcU(n.children[0].innerHTML, "000") + "¨"
            })
        })
    }

    function _wall() {
        REP.title = jGP.find($(".game_header")).html();
        REP.defeated = {};
        REP.losses = {};
        REP.defeated.title = "";
        REP.defeated.titleAttacker = "";
        REP.defeated.titleDefender = "";
        REP.losses.title = "";
        REP.losses.titleAttacker = "";
        REP.losses.titleDefender = "";
        REP.defeated.attacker = {};
        REP.defeated.defender = {};
        REP.losses.attacker = {};
        REP.losses.defender = {};
        REP.tef = {};
        REP.los = {};
        REP.tef.attacker = {};
        REP.tef.defender = {};
        REP.los.attacker = {};
        REP.los.defender = {};
        REP.defeated.title = jGP.find($("div.list_item_left h3")).html();
        REP.defeated.titleAttacker = $(jGP.find($("div.list_item_left h4"))[0]).html().strip_tags().trim();
        getUnitWall(REP.defeated.attacker, jGP.find($("div.list_item_left .wall_unit_container"))[0]);
        REP.tef.attacker = getUnitWallEx(jGP.find($("div.list_item_left .wall_unit_container"))[0]);
        REP.defeated.titleDefender = $(jGP.find($("div.list_item_left h4"))[1]).html().strip_tags().trim();
        getUnitWall(REP.defeated.defender, jGP.find($("div.list_item_left .wall_unit_container"))[1]);
        REP.tef.defender = getUnitWallEx(jGP.find($("div.list_item_left .wall_unit_container"))[1]);
        REP.losses.title = jGP.find($("div.list_item_right h3")).html();
        REP.losses.titleAttacker = $(jGP.find($("div.list_item_right h4"))[0]).html().strip_tags().trim();
        getUnitWall(REP.losses.attacker, jGP.find($("div.list_item_right .wall_unit_container"))[0]);
        REP.los.attacker = getUnitWallEx(jGP.find($("div.list_item_right .wall_unit_container"))[0]);
        REP.losses.titleDefender = $(jGP.find($("div.list_item_right h4"))[1]).html().strip_tags().trim();
        getUnitWall(REP.losses.defender, jGP.find($("div.list_item_right .wall_unit_container"))[1]);
        REP.los.defender = getUnitWallEx(jGP.find($("div.list_item_right .wall_unit_container"))[1])
    }

    function tmpl(e, t) {
        var n = /((^|%>)[^\t]*)'/g;
        var r = !/\W/.test(e) ? cache[e] = cache[e] || tmpl(e) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(n, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return t ? r(t) : r
    }

    function setRepPRV(e) {
        var t = $("<span/>", {
            id: "RCSpanPrev",
            "class": "content"
        });
        var n = $("<div/>", {
            id: "RCDivPrev",
            style: "background-color:#FFEABB; height:400px; width:762px; overflow-y:scroll;",
            "class": "content"
        }).height(411).html("<br><br>");
        n.append(t);
        bbCodePreview(e, t);
        $("#RCArea_id div.box_content").html("");
        $("#RCArea_id div.box_content").append(n);
        HMole.ReportsView("#RCSpanPrev")
    }

    function setRepBBC(e) {
        if ($("#RCAreaBBC").length == 1) {
            $("#RCAreaBBC").remove()
        }
        $("#RCAreaBBC_id div.box_content").append($("<textarea/>", {
            id: "RCAreaBBC",
            style: "width:182px; height:98px; font-size:75%;",
            readonly: "readonly",
            value: e
        }).click(function () {
            this.select()
        }));
        document.getElementById("RCAreaBBC").select()
    }

    function RepGenerate() {
        var e, t = "";
        REP.timeSN = Timestamp.serverTime();
        e = getHumanReadableTimeDate(Timestamp.serverTime());
        REP.timeT = "(" + RepDateStrFormat(e.substring(9, e.length) + " " + e.substring(0, 5)).replace(" ", ") [b]") + "[/b]";
        REP.title = "> REP <";
        if (!quick) {
            $("#RCArea_id div.box_content").html('<br><br><br><br><br><center><img alt="" src="' + Game.img() + '/game/ajax-loader.gif"/></center>');
            if ($("#rb_rt2").attr("sel") == "1") HMole.gRAP.Style = 1;
            else HMole.gRAP.Style = 0;
            HMole.gRAP.ShowDate = GuiEx.CheckBoxVal("cbShowDate");
            HMole.gRAP.ShowTitle = GuiEx.CheckBoxVal("cbShowTitle");
            HMole.gRAP.HideAttUnits = GuiEx.CheckBoxVal("MSGATTUNIT");
            HMole.gRAP.HideDefUnits = GuiEx.CheckBoxVal("MSGDEFUNIT");
            HMole.gRAP.HideSpyBulding = GuiEx.CheckBoxVal("MSGBUILD");
            HMole.gRAP.HideSpyCoins = GuiEx.CheckBoxVal("MSGUSC");
            HMole.gRAP.HideSpyRes = GuiEx.CheckBoxVal("MSGRAW");
            HMole.gRAP.HideDeffArmy = GuiEx.CheckBoxVal("UNSUP");
            HMole.gRAP.HideIncoArmy = GuiEx.CheckBoxVal("UNINCO");
            HMole.gRAP.HideUnits = GuiEx.CheckBoxVal("MSGUNITS");
            HMole.gRAP.HideSelTroop = GuiEx.CheckBoxVal("selTroops")
        }
        REP.timeS = Timestamp.serverTimeToLocal();
        switch (RT) {
        case "command":
            _command();
            t = _generate();
            break;
        case "breach":
        case "attack":
        case "take_over":
            _fight();
            t = _generate();
            break;
        case "attack_support":
            _attack_support();
            t = _generate();
            break;
        case "espionage":
            _espionage();
            t = _generate();
            break;
        case "command_curator":
            _command_curator();
            t = _generate();
            break;
        case "conquerold_troops":
            _conquerTroops();
            t = _generate();
            break;
        case "conquerold":
            _conquerOld();
            t = _generate();
            break;
        case "illusion":
            _illusion();
            t = _generate();
            break;
        case "support":
            _support();
            t = _generate();
            break;
        case "agora":
            _agora();
            t = _generate();
            break;
        case "agora2":
            _agora2();
            t = _generate();
            break;
        case "powers":
            _powers();
            t = _generate();
            break;
        case "raise":
            _raise();
            t = _generate();
            break;
        case "wall":
            _wall();
            t = _generate();
            break;
        case "conquer":
        case "found":
            _conquer();
            t = _generate();
            break;
        case "conquest":
            _conquest();
            t = _generate();
            break;
        case "ally_profile":
            t = _ally_players();
            break;
        case "player_profile":
            t = _player_towns();
            break;
        case "support_players":
            t = _support_players();
            break;
        case "commands_list":
            t = _commands_list();
            break;
        case "academy_research":
            t = _academy_research();
            break;
        case "inventory":
            t = _inventory();
            break;
        case "buildings":
            t = _buildings();
            break;
        case "situation":
            t = _situation();
            break
        }
        t = bbCodeCut(t);
        if (HMole.bro != "ffx" || quick) {
            t = t.replace(/\uFEFF\u2591/g, HMole.bz);
            t = t.replace(/\u00A8/g, HMole.bz)
        }
        if (!quick) {
            setRepBBC(t);
            setRepPRV(t);
            HMole.Cookie(HMole.gRAPCookie, HMole.gRAP)
        } else HMole.RepClipboard = t
    }

    function bbCodeCut(e) {
        var t = 500 - 6;
        var n = "[/table][/quote][center][img]" + HMole.Home + "r/cut1.gif[/img][/center]\n";
        var r = "[img]http://grmh.pl/gui/lsin.gif[/img]";
        var i, s, o = p = cur = pubp = 0;
        var u = [0, 0, 0, 0];
        var a = [0, 0, 0, 0];
        for (i = 0; i < e.length; i++)
            if (e.charAt(i) == "[") {
                o++;
                if (e.charAt(i + 1) == "*" || e.substring(i, i + 38) == r) cur = i;
                if (o >= t) {
                    if (p == 0) {
                        t -= 20;
                        if (HMole.gRAP.Style == 0) t -= 32
                    }
                    a[p] = cur;
                    p++;
                    u[p] = cur;
                    o = cur = 0
                }
            }
        if (p == 0) return e;
        a[p] = e.length;
        if (!quick) {
            if ($("#RepPart0").attr("sel") == "1") pubp = 0;
            if ($("#RepPart1").attr("sel") == "1") pubp = 1;
            if ($("#RepPart2").attr("sel") == "1") pubp = 2;
            if ($("#RepPart3").attr("sel") == "1") pubp = 3;
            $("#HMoleRepParts").html("");
            if (p > 4) p = 4;
            for (i = 0; i <= p; i++) {
                s = "0";
                if (i == pubp) s = "1";
                if (i == 0) $("#HMoleRepParts").append(" ... part: ");
                $("#HMoleRepParts").append($("<a/>", {
                    href: "#",
                    id: "RepPart" + i,
                    sel: s
                }).click(function () {
                    $("#RepPart0 img").attr("src", HMole.Home + "gui/rb0.gif");
                    $("#RepPart1 img").attr("src", HMole.Home + "gui/rb0.gif");
                    $("#RepPart2 img").attr("src", HMole.Home + "gui/rb0.gif");
                    $("#RepPart3 img").attr("src", HMole.Home + "gui/rb0.gif");
                    this.firstChild.src = HMole.Home + "gui/rb1.gif";
                    $("#RepPart0").attr("sel", "0");
                    $("#RepPart1").attr("sel", "0");
                    $("#RepPart2").attr("sel", "0");
                    $("#RepPart3").attr("sel", "0");
                    this.setAttribute("sel", "1")
                }).append($("<img/>", {
                    src: HMole.Home + "gui/rb" + s + ".gif",
                    style: "position:relative; top:2px;"
                })).append(" " + i + " .. "))
            }
        }
        i = false;
        if (a[pubp] < e.length) i = true;
        e = e.substring(u[pubp], a[pubp]);
        if (i) e += n;
        if (pubp != 0) {
            if (HMole.gRAP.Style == 0) switch (RT) {
            case "conquerold_troops":
            case "conquerold":
            case "conquest":
            case "commands_list":
                return "[center][img]" + HMole.Home + "r/cut2.gif[/img][/center][quote][table][*]" + WhtImg(32) + "[|]" + WhtImg(128) + "[|]" + WhtImg(32) + "[|]" + WhtImg(128) + "[|]" + WhtImg(32) + "[|]" + WhtImg(129) + "[|]" + WhtImg(32) + "[|]" + WhtImg(129) + e;
            case "ally_profile":
            case "player_profile":
                return "[center][img]" + HMole.Home + "r/cut2.gif[/img][/center][quote][table][*]" + WhtImg(30) + "[|]" + WhtImg(190) + "[|]" + WhtImg(30) + "[|]" + WhtImg(190) + "[|]" + WhtImg(30) + "[|]" + WhtImg(190) + e;
                break
            } else {
                return "[center][img]" + HMole.Home + "r/cut2.gif[/img][/center][quote][table][*]" + WhtImg(40) + "[|][font=monospace]" + e
            }
            return "[center][img]" + HMole.Home + "r/cut2.gif[/img][/center][quote][table]" + e
        }
        return e
    }

    function optionsReport() {
        var e = $("<div/>", {
            id: "publish_report_options1"
        });
        var t = {};
        var n = $("<div/>", {}).append($("<span/>", {
            "class": "town_name"
        }).html("<br> " + HMole.Lang.hide + ":")).append($("<div/>", {
            "class": "box_content"
        }).append(e));
        switch (RT) {
        case "support":
            labelArray = "attack";
            t = ["MSGUNITS"];
            break;
        case "command":
            labelArray = "attack";
            t = ["MSGUNITS", "selTroops"];
            break;
        case "breach":
        case "attack":
        case "take_over":
            labelArray = "attack";
            t = ["MSGATTUNIT", "MSGDEFUNIT", "MSGRESOURCE"];
            break;
        case "espionage":
            labelArray = "espionage";
            t = ["MSGUNITS", "MSGBUILD", "MSGUSC", "MSGRAW"];
            break;
        case "command_curator":
            labelArray = "attack";
            t = ["MSGUNITS"];
            break;
        case "conquest":
        case "conquerold":
            labelArray = "attack";
            t = ["UNSUP", "UNINCO"];
            break;
        case "commands_list":
            labelArray = "attack";
            t = ["selTroops"];
            break
        }
        HMole.Lang.ATTACKER = HMole.Lang.LABELS[labelArray].ATTACKER;
        HMole.Lang.DEFENDER = HMole.Lang.LABELS[labelArray].DEFENDER;
        HMole.Lang.MSGHIDAT = HMole.Lang.LABELS[labelArray].MSGHIDAT;
        HMole.Lang.MSGHIDDE = HMole.Lang.LABELS[labelArray].MSGHIDDE;
        HMole.Lang.MSGATTUNIT = HMole.Lang.LABELS[labelArray].MSGATTUNIT;
        HMole.Lang.MSGDEFUNIT = HMole.Lang.LABELS[labelArray].MSGDEFUNIT;
        $.each(t, function (t, n) {
            if (n == "MSGATTUNIT") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideAttUnits));
            if (n == "MSGDEFUNIT") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideDefUnits));
            if (n == "MSGUNITS") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideUnits));
            if (n == "MSGBUILD") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideSpyBulding));
            if (n == "MSGUSC") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideSpyCoins));
            if (n == "MSGRAW") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideSpyRes));
            if (n == "UNSUP") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideDeffArmy));
            if (n == "UNINCO") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideIncoArmy));
            if (n == "selTroops") e.append(GuiEx.CheckBox(n, HMole.Lang[n], HMole.gRAP.HideSelTroop))
        });
        formbody.append(n)
    }

    function form() {
        function r(e, t, n) {
            if (n == true) n = "1";
            else n = "0";
            return $("<a/>", {
                href: "#",
                id: e,
                sel: n
            }).click(function () {
                document.getElementById("rb_rt1").firstChild.src = HMole.Home + "gui/rb0.gif";
                document.getElementById("rb_rt2").firstChild.src = HMole.Home + "gui/rb0.gif";
                this.firstChild.src = HMole.Home + "gui/rb1.gif";
                document.getElementById("rb_rt1").setAttribute("sel", "0");
                document.getElementById("rb_rt2").setAttribute("sel", "0");
                this.setAttribute("sel", "1")
            }).append($("<img/>", {
                src: HMole.Home + "gui/rb" + n + ".gif",
                style: "position:relative; top:2px;"
            })).append(t + "<br>")
        }
        if (typeof HMoleParamWnd != "undefined") {
            try {
                HMoleParamWnd.close()
            } catch (e) {}
            HMoleParamWnd = undefined
        }
        HMoleParamWnd = Layout.dialogWindow.open("", HMole.sName, 1e3, 514, null, false);
        HMoleParamWnd.setPosition("center", "center");
        var t = $("<div/>", {
            style: "margin-top:3px"
        });
        ramka = GuiEx.RepPrvBorderLight("<b>" + HMole.Lang.reprv + "</b>", "");
        $(ramka).attr("id", "RCArea_id");
        $(ramka).attr("style", "width:790px; float:left");
        $(t).append(ramka);
        var n = $("<div/>", {
            style: "position:relative;"
        });
        formbody = $("<div/>", {
            style: "position:relative;"
        });
        switch (RT) {
        case "command":
        case "breach":
        case "attack":
        case "attack_support":
        case "raise":
        case "take_over":
        case "command_curator":
        case "conquerold":
        case "conquerold_troops":
        case "support":
        case "agora":
        case "agora2":
        case "powers":
        case "espionage":
        case "conquer":
        case "found":
        case "illusion":
        case "conquest":
        case "commands_list":
            optionsReport();
            break;
        case "wall":
            break
        }
        $(n).append($("<div/>", {
            id: "HMoleAreaBBC"
        }));
        var i = $("<div/>", {
            "class": "box middle center"
        }).append($("<span/>", {
            "class": "town_name"
        }).html("<br>" + HMole.Lang.repwzo + ":")).append($("<div/>", {
            "class": "box_content"
        }).append(r("rb_rt1", " " + HMole.Lang.repwzo1, HMole.gRAP.Style == 0)).append(r("rb_rt2", " Retro Nostalgic", HMole.gRAP.Style != 0)));
        $(n).append(i);
        var i = $("<div/>", {}).append($("<span/>", {
            "class": "town_name"
        }).html("<br> " + HMole.Lang.show + ":")).append($("<div/>", {
            "class": "box_content"
        }).append(GuiEx.CheckBox("cbShowTitle", HMole.Lang.title, HMole.gRAP.ShowTitle)).append(GuiEx.CheckBox("cbShowDate", HMole.Lang.date, HMole.gRAP.ShowDate)));
        $(n).append(i);
        $(n).append(formbody);
        $(n).append($("<a/>", {
            "class": "button",
            href: "#",
            style: "width:97%; position:absolute; top:240px;"
        }).append($("<span/>", {
            "class": "left"
        }).append($("<span/>", {
            "class": "right"
        }).append($("<span/>", {
            "class": "middle"
        }).text(HMole.Lang.repgen))).append($("<span/>", {
            style: "clear: both; "
        }))).click(function () {
            RepGenerate()
        }));
        pr = GuiEx.Border2("<b>" + HMole.Lang.repopt + "</b>", n, 280);
        $(pr).attr("style", "width:210px; float:right");
        $(t).append(pr);
        $(t).append($("<div/>", {
            id: "RCAreaBBC_id",
            style: "position:relative; width:210px; height:70px; float:right;"
        }).append($("<div/>", {
            "class": "box top left"
        }).append($("<div/>", {
            "class": "box top right"
        }).append($("<div/>", {
            "class": "box top center"
        })))).append($("<div/>", {
            "class": "box middle left"
        }).append($("<div/>", {
            "class": "box middle right"
        }).append($("<div/>", {
            "class": "box middle center"
        }).append($("<span/>", {
            "class": "town_name"
        }).html("<font size='4'><b>bbCode</b></font>")).append($("<div/>", {
            "class": "box_content"
        }))))).append($("<div/>", {
            "class": "box bottom left"
        }).append($("<div/>", {
            "class": "box bottom right"
        }).append($("<div/>", {
            "class": "box bottom center"
        })))).append(GuiEx.But(2, "position:absolute; left:176px; top:5px;").click(function () {
            HMole.RepClipboard = document.getElementById("RCAreaBBC").value;
            this.style.background = "url('" + HMole.Home + "gui/but.png') repeat scroll -22px 0px rgba(0, 0, 0, 0)"
        }).mousePopup(new MousePopup(HMole.Lang.repRec))));
        HMoleParamWnd.appendContent(t);
        $("#RCArea_id div.box_content").height(427);
        if (wGP.type != 0) wGP.getJQCloseButton().bind("click", function (e) {
            try {
                HMoleParamWnd.close()
            } catch (t) {}
            HMoleParamWnd = undefined
        });
        RepGenerate()
    }
    String.prototype.strip_tags2 = function () {
        tags = this;
        stripped = tags.replace(/<\/?[^>]+>/gi, "");
        return stripped
    };
    if (!HMole.PlayerLoaded) {
        HMole.LoadPlayers();
        setTimeout(function () {
            HMoleData(that, quick)
        }, 1500);
        return
    }
    var jGP = wGP = null;
    if (that == null) {
        wGP = Array();
        wGP.type = 0
    } else {
        wGP = that;
        jGP = wGP.getJQElement()
    }
    var REP = {};
    var labelArray = "attack";
    var RT = HMole.RepType;
    if (!quick) form();
    else {
        formbody = $("<div/>", {
            style: "position:relative;"
        });
        optionsReport();
        RepGenerate()
    }
    return REP
}