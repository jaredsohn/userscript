// ==UserScript==
// @name MargMap
// ==/UserScript==
/*MargoPogromca v3.16 by absflg
 */
function margo_addon() {
    margoP3 = {
        ver: "3.16"
    };
    (function (c) {
        var a = c.ver;
        $("#tutorials").remove();
        c.margo_defcol = function (d) {
            switch (d) {
            case 1:
                return "olive";
            case 2:
                return "gold";
            case 3:
                return "green";
            case 4:
                return "teal";
            case 5:
                return "aqua";
            case 6:
                return "yellow";
            case 7:
                return "#343434";
            case 8:
                return "white";
            case 9:
                return "blue";
            case 10:
                return "violet";
            case 11:
                return "red"
            }
        };
        c.margo_colname = function (d) {
            switch (d) {
            case 1:
                return "Tytan";
            case 2:
                return "Heros";
            case 3:
                return "Elita III";
            case 4:
                return "Elita II";
            case 5:
                return "Elita";
            case 6:
                return "NPC";
            case 7:
                return "Mob zwykły";
            case 8:
                return "Gracz";
            case 9:
                return "Przejście";
            case 10:
                return "Odnawialne";
            case 11:
                return "Twoja postać"
            }
        };
		c.side = function(l) {
			if(l.prof == 'w' || l.prof == 'p' || l.prof =='h') return 1;
			return 2;
		};
        c.margo_color = [];
        c.tab = [];
        if (ReadCookie("margopogromca3")) {
            c.tab = ReadCookie("margopogromca3").split("|");
            c.margo_minilvl = parseInt(c.tab[0]);
            c.margo_button = c.tab[1];
            for (var b = 2; b <= 12; b++) {
                c.margo_color[b - 1] = c.tab[b]
            }
            c.margo_speed = parseInt(c.tab[13]);
            if (c.margo_speed != c.margo_speed) {
                c.margo_speed = 700
            }
        } else {
            for (var b = 1; b <= 11; b++) {
                c.margo_color[b] = c.margo_defcol(b)
            }
            c.margo_minilvl = 1;
            c.margo_button = "e";
            c.margo_speed = 700
        }
        c.margo_saveCookie = function () {
            if (($("#margo_config_button").val() == "") || ($("#margo_config_button").val().lenght > 1)) {
                mAlert("Niepoprawny skrót klawiszowy!")
            } else {
                c.margo_button = "" + ($("#margo_config_button").val())
            }
            for (var d = 1; d <= 11; d++) {
                if (($("#margo_config_color" + d).val() == "") || ($("#margo_config_button").val().lenght == 0)) {} else {
                    c.margo_color[d] = "" + ($("#margo_config_color" + d).val())
                }
                $("#margo_config_colortest" + d).css("background-color", c.margo_color[d])
            }
            if ($("#margo_config_minilvl").val() == "") {} else {
                if (parseInt($("#margo_config_minilvl").val()) == parseInt($("#margo_config_minilvl").val())) {
                    c.margo_minilvl = parseInt($("#margo_config_minilvl").val())
                }
            }
            if ($("#margo_config_speed").val() == "") {} else {
                if (parseInt($("#margo_config_speed").val()) == parseInt($("#margo_config_speed").val())) {
                    c.margo_speed = parseInt($("#margo_config_speed").val())
                }
            }
            c.tab = "";
            c.tab += c.margo_minilvl + "|";
            c.tab += c.margo_button + "|";
            for (var d = 1; d <= 11; d++) {
                c.tab += c.margo_color[d] + "|"
            }
            c.tab += c.margo_speed + "|";
            c.expiry = new Date(parseInt(new Date().getTime()) * 2);
            document.cookie = "margopogromca3=" + c.tab + ";expires=" + c.expiry + ";";
            if (c.margo_con = true) {
                clearInterval(c.margo_interval);
                c.margo_interval = setInterval(function () {
                    c.refresh_margo()
                }, c.margo_speed)
            }
        };
        c.refresh_margo = function () {
            $("#margo_npc").html("");
            for (var h in g.npc) {
                g.npc[h].lvl;
                var i = g.npc[h];
                if ((i.type == 0) || ((i.type == 2) && (i.lvl > c.margo_minilvl - 1)) || ((i.type == 3) && (i.lvl > c.margo_minilvl - 1))) {
                    var e = 7;
                    if (g.npc[h].wt > 99) {
                        e = 1
                    } else {
                        if (g.npc[h].wt > 79) {
                            e = 2
                        } else {
                            if (g.npc[h].wt > 29) {
                                e = 3
                            } else {
                                if (g.npc[h].wt > 19) {
                                    e = 4
                                } else {
                                    if (g.npc[h].wt > 9) {
                                        e = 5
                                    } else {
                                        if (i.type == 0) {
                                            e = 6
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $("<div onclick='hero.searchPath(" + i.x + "," + i.y + ");' id=\"npc__" + h + '" ctip="t_item" tip="<center><img src=' + i.icon + " /><b>" + i.nick + "</b>" + c.margo_colname(e) + "," + i.lvl + ' lvl</center>"></div>').css({
                        position: "absolute",
                        left: ((i.x) * c.margo_square) + 1,
                        top: (((i.y) * c.margo_square) + 1),
                        "background-color": c.margo_color[e],
                        width: c.margo_square,
                        height: c.margo_square
                    }).appendTo("#margo_npc")
                }
            }
            for (var h in g.other) {
                var f = g.other[h];
 
				var bpx = Math.ceil(c.margo_square*0.2);
				var bs = 'none';
				var reltxt = '';
 
				if (location.host=='game5.margonem.pl' && (c.side(f.prof)!=c.side(hero.prof))) {
					bs = bpx+'px #b90000 solid';
					reltxt = '<i style=\'color:#b90000\'>Przeciwna frakcja</i>';
				} else if (f.relation=='fr') {
					bs = bpx+'px #00b900 solid';
					reltxt = '<i style=\'color:#00b900\'>Przyjaciel</i>';
				} else if (f.relation=='cl') {
					bs = bpx+'px #00b900 solid';
					reltxt = '<i style=\'color:#00b900\'>Klanowicz</i>';
				} else if (f.relation=='en') {
					bs = bpx+'px #b90000 solid';
					reltxt = '<i style=\'color:#b90000\'>Wróg</i>';
				}
 
				if (f.wanted) {
					reltxt += '<i style=\'color:red\'>Poszukiwany</i>';
				}
 
				if (reltxt) reltxt = '<br>'+reltxt;
 
				$("<div onclick='chatTo(\"" + f.nick + '");\' id="other__' + h + '" ctip="t_npc" tip="<center><div style=\'background:url(/obrazki/postacie' + f.icon + "); height: " + $("#other" + h).css("height") + "; width:" + $("#other" + h).css("width") + " '></div><b>" + f.nick + "</b>gracz, " + f.lvl + f.prof + reltxt + '</center>"></div>').css({
                    position: "absolute",
                    left: ((f.x) * c.margo_square) + 1,
                    top: ((f.y) * c.margo_square) + 1,
                    "background-color": c.margo_color[8],
                    width: c.margo_square - (bs!='none'?bpx*2:0),
                    height: c.margo_square - (bs!='none'?bpx*2:0),
					border: bs
                }).appendTo("#margo_npc")
            }
            $("div#base div.gw").each(function (j) {
                $("<div onclick='hero.searchPath(" + (parseInt($(this).css("left")) / 32) + "," + (parseInt($(this).css("top")) / 32) + ");' id=\"gw__" + $(this).attr("id").substring(2) + "\" tip='" + $(this).attr("tip") + "'></div>").css({
                    position: "absolute",
                    left: ((parseInt($(this).css("left")) / 32) * c.margo_square) + 1,
                    top: ((parseInt($(this).css("top")) / 32) * c.margo_square) + 1,
                    "background-color": c.margo_color[9],
                    width: c.margo_square,
                    height: c.margo_square
                }).appendTo("#margo_npc")
            });
            for (var h in g.item) {
                var d = g.item[h];
                if (d.cl == 20) {
                    $("<div onclick='hero.searchPath(" + (d.x) + "," + (d.y) + ");'id=\"item__" + h + '" ctip="t_item" tip="<center><img src=/obrazki/itemy/' + d.icon + " /><b>" + d.name + '</b>odnawialne</center>"></div>').css({
                        position: "absolute",
                        left: ((d.x) * c.margo_square) + 1,
                        top: ((d.y) * c.margo_square) + 1,
                        "background-color": c.margo_color[10],
                        width: c.margo_square,
                        height: c.margo_square
                    }).appendTo("#margo_npc")
                }
            }
            $('<div id="hero__" ctip="t_item" tip="<center><b>Twoja Postać</b></center>"></div>').css({
                position: "absolute",
                left: ((hero.x) * c.margo_square) + 1,
                top: ((hero.y) * c.margo_square) + 1,
                "background-color": c.margo_color[11],
                width: c.margo_square,
                height: c.margo_square
            }).appendTo("#margo_npc").click(function () {
                if (g.gw["" + hero.x + "." + hero.y] == true) {
                    _g("walk")
                }
                _g("takeitem")
            })
        };
        if (map.x > map.y) {
            c.margo_square = (512 - (512 % map.x)) / map.x
        } else {
            c.margo_square = (426 - (426 % map.y)) / map.y
        }
        c.margo_szer = c.margo_square * map.x;
        c.margo_wys = c.margo_square * map.y;
        $('<div id="margo"></div>').css({
            position: "absolute",
            left: (512 - c.margo_szer) / 2,
            top: (426 - c.margo_wys) / 2,
            zIndex: 499,
            width: c.margo_szer,
            height: c.margo_wys + 20
        }).appendTo("#centerbox");
        $('<img id="margo_obrazek" src="' + document.baseURI + "/obrazki/miasta" + map.file + '">').css({
            position: "absolute",
            left: (512 - c.margo_szer) / 2,
            top: (426 - c.margo_wys) / 2,
            zIndex: 498,
            width: c.margo_szer,
            height: c.margo_wys,
            border: "2px solid black"
        }).appendTo("#centerbox").attr("src", $("#ground").css("background-image").replace(/url\("?(.+?)"?\)/, "$1"));
        $('<div id="margo_npc"></div>').css({
            left: 0,
            top: 0,
            width: c.margo_szer,
            height: c.margo_wys
        }).appendTo("#margo");
        $('<div id="margo_credit">MargoPogromca v' + a + " by absflg (Valius->Jaruna)</div>").css({
            left: 0,
            top: 0,
            width: c.margo_szer,
            height: 20
        }).appendTo("#margo");
        $('<span id="margo_c_b">[Konfig.]</span>').css({
            "font-size": 13,
            position: "absolute",
            left: (c.margo_szer - 45),
            "background-color": "black",
            color: "red"
        }).appendTo("#margo_credit").click(function () {
            $("#margo_config").toggle()
        });
        $('<div id="margo_config"></div>').css({
            position: "absolute",
            left: 300,
            top: 15,
            border: "1px gold solid",
            color: "white",
            "background-color": "black",
            "font-size": "12px",
            zIndex: 500
        }).appendTo("body").draggable().bind("mousedown", function (d) {
            d.stopPropagation()
        });
        $("#margo_config").html("<center>MargoPogromca v" + a + " - Konfiguracja</center><br><br>Tu możesz ustawić skrót klawiszowy<br>");
        $('<br><b>Skrót:</b><input type="text" size=1 id="margo_config_button" value="' + c.margo_button + '" /><br>').appendTo("#margo_config");
        $('<br><b>Minimalny poziom:</b><input type="text" size=1 id="margo_config_minilvl" value="' + c.margo_minilvl + '" /><br>').appendTo("#margo_config");
        $('<br><b>Częstotliwość odświeżana:</b><br><input type="text" size=2 id="margo_config_speed" value="' + c.margo_speed + '" /><b>ms</b> (stand. 700ms) <br>').appendTo("#margo_config");
        $('<br>Tutaj możesz ustawić, w jaki kolorze będą <br>wyświetlane zdarzenia na mapie. Kolory można <br>zapisywać angielskimi nazwami (np. red, gold). <br>Listę kolorów możesz znaleść pod tym <br>adresem: <a href="http://www.statom.pl/HTML/kolory.html">http://www.statom.pl/HTML/kolory.html</a><br>').appendTo("#margo_config");
        $("#margo_config a").css({
            color: "yellowgreen",
            margin: "1px 0px 1px 3px"
        }).attr("target", "_blank");
        for (var b = 1; b <= 11; b++) {
            $('<br>  <span id="margo_config_colortest' + b + '">__</span>').css({
                color: "black",
                position: "visual",
                "background-color": c.margo_color[b],
                height: 11,
                width: 11
            }).appendTo("#margo_config");
            $("<b> " + c.margo_colname(b) + ': </b><input type="text" size=7 id="margo_config_color' + b + '" value="' + c.margo_color[b] + '">').appendTo("#margo_config")
        }
        $('<br><br><input type="button" id="margo_config_b" value="Zapisz" tip="Zapisz" />').appendTo("#margo_config").click(function () {
            c.margo_saveCookie()
        });
        $('<input type="button" id="margo_config_close" value="Wyjdź" tip="Wyjdź" />').appendTo("#margo_config").click(function () {
            $("#margo_config").toggle()
        });
        $("#margo_config").hide();
        $("#margo_obrazek").hide();
        $("#margo").hide();
        c.margo_con = false;
        $(document).keypress(function (d) {
            if ((String.fromCharCode(d.which).toUpperCase() == c.margo_button.toUpperCase()) && (d.target.tagName != "INPUT") && (d.target.tagName != "TEXTAREA")) {
                $("#margo_obrazek").toggle();
                $("#margo").toggle();
                if (c.margo_con == false) {
                    c.margo_con = true;
                    c.refresh_margo();
                    c.margo_interval = setInterval(function () {
                        c.refresh_margo()
                    }, c.margo_speed)
                } else {
                    c.margo_con = false;
                    clearInterval(c.margo_interval)
                }
            }
        });
        maplistgwxy = {};
        super_escape = function (d) {
            s1 = "" + d;
            s1 = s1.split("ą").join("%B9");
            s1 = s1.split("ć").join("%E6");
            s1 = s1.split("ę").join("%EA");
            s1 = s1.split("ł").join("%B3");
            s1 = s1.split("ń").join("%F1");
            s1 = s1.split("ó").join("%F3");
            s1 = s1.split("ś").join("%9C");
            s1 = s1.split("ź").join("%9F");
            s1 = s1.split("ż").join("%BF");
            s1 = s1.split("Ą").join("%A5");
            s1 = s1.split("Ć").join("%C6");
            s1 = s1.split("Ę").join("%CA");
            s1 = s1.split("Ł").join("%A3");
            s1 = s1.split("Ń").join("%D1");
            s1 = s1.split("Ó").join("%D3");
            s1 = s1.split("Ś").join("%8C");
            s1 = s1.split("Ź").join("%8F");
            s1 = s1.split("Ż").join("%AF");
            s1 = s1.split(" ").join("+");
            return s1
        };
        maplistgwxy = {};
        maplistgwxy.dburl = "http://173.83.251.34/~ippx/emargo.pl/get/add_map_xy_.php";
        maplistgwxy.dumpdata = function () {
            maplistgwxy.wpisdb = [];
            $("div#base div.gw").each(function (d) {
                maplistgwxy.jedenwpis = "";
                maplistgwxy.jedenwpis += (parseInt($(this).css("left")) / 32) + "|";
                maplistgwxy.jedenwpis += (parseInt($(this).css("top")) / 32) + "|";
                maplistgwxy.jedenwpis += super_escape($(this).attr("tip").replace("<br>(wymaga klucza)", "")) + "|";
                for (var e in g.townname) {
                    if ($(this).attr("tip").replace("<br>(wymaga klucza)", "") == g.townname[e]) {
                        maplistgwxy.jedenwpis += e
                    }
                }
                maplistgwxy.wpisdb.push(maplistgwxy.jedenwpis)
            });
            $.getScript(maplistgwxy.dburl + "?get=" + maplistgwxy.wpisdb.join("*") + "&map=" + super_escape(map.name) + "&id=" + map.id + "&x=" + map.x + "&y=" + map.y + "&img=" + super_escape(map.file) + "&mainid=" + map.mainid)
        };
        maplistgwxy.dumpdata();
        monsterlist = {
            map: {
                save: function () {}
            }
        }
    })(margoP3)
}
var $$$margoP3;
if (!$$$margoP3) {
    g.loadQueue.push({
        fun: margo_addon,
        data: ""
    });
    $$$margoP3 = true
}
 
function ReadCookie(d) {
    var b = "" + document.cookie;
    var c = b.indexOf(d);
    if (c == -1 || d == "") {
        return ""
    }
    var a = b.indexOf(";", c);
    if (a == -1) {
        a = b.length
    }
    return unescape(b.substring(c + d.length + 1, a))
};;