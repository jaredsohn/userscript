// ==UserScript==
// @name           Mousehunt AutoHorn extensio
// @namespace      link ref: http://userscripts.org/scripts/show/74721
// @description    Longtail AutoHorn
// @version        4.1.1.01
// @include        http://*.mousehuntgame.com/*
// @include        https://*.mousehuntgame.com/*
// @require        http://code.jquery.com/jquery-latest.js
// @require        http://sizzlemctwizzle.com/updater.php?id=74721&days=7&show
// @author         are (updated by Tinnv)
// ==/UserScript==
/*  Global Variables  */
var defaultpage = "http://www.mousehuntgame.com",
    hornpage = "http://www.mousehuntgame.com/turn.php",
    origtitle = document.title,
    timerEvent,
    timerTitle,
    timerTrapCheck,
    waktuTrapCheck,
    waktuNextHorn,
    waktuRandom,
    waktuTitle,
    waktuTournament,
    msgTitle = "Sound The Horn",
    alertShown = !1,
    hornAllowed = !1,
    currentTrap = {
        weapon: 0,
        base: 0,
        trinket: 0,
        bait: 0,
        cached: !1,
        busy: !1
    },
    trapConfig = {
        TrapCheck: {
            min: 0,
            sec: 5
        },
        SeasonalGarden: {
            maxAmplifier: 200,
            wr: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            sg: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            sr: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            fl: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            }
        },
        ZugzwangTower: {
            pawn: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            knight: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            bishop: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            rook: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            queen: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            king: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            chessmaster: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            minAmplifier: 0
        },
        Iceberg: {
            enabled: 0,
            slushy_shoreline: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            phase1: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            phase2: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            phase3: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            phase4: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            phase5: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            generals: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            }
        },
        BalackCove: {
            enabled: 0,
            jod: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: 98
            },
            low: {
                weapon: 38,
                base: -1,
                trinket: -1,
                bait: 119
            },
            mid: {
                weapon: 38,
                base: -1,
                trinket: -1,
                bait: 119
            },
            high: {
                weapon: 38,
                base: -1,
                trinket: -1,
                bait: 118
            }
        },
        FieryWarpath: {
            enabled: 0,
            Warrior: {
                weapon: -1,
                base: -1,
                trinket: 539,
                bait: -1
            },
            Scout: {
                weapon: -1,
                base: -1,
                trinket: 538,
                bait: -1
            },
            Archer: {
                weapon: -1,
                base: -1,
                trinket: 534,
                bait: -1
            },
            Cavalry: {
                weapon: -1,
                base: -1,
                trinket: 535,
                bait: -1
            },
            Mage: {
                weapon: -1,
                base: -1,
                trinket: 537,
                bait: -1
            },
            Artillery: {
                weapon: 35,
                base: -1,
                trinket: -1,
                bait: -1
            },
            Gargantua: {
                weapon: 56,
                base: -1,
                trinket: -1,
                bait: -1
            },
            Crimson_commander: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            },
            Boss: {
                weapon: -1,
                base: -1,
                trinket: -1,
                bait: -1
            }
        }
    },
    availableTraps = {};
function tulisWaktu() {
    timerTitle && clearTimeout(timerTitle);
    var a = new Date;
    loadParam("updateWindowTitle", !0) && waktuTitle && (document.title = a >= waktuTitle ? msgTitle + " | " + origtitle : msgWaktu(a, waktuTitle) + " | " + origtitle);
    waktuNextHorn && a <= waktuNextHorn ? $('div#AutoHorn li span[name="hornTime"]').html(msgWaktu(a, waktuNextHorn)) : $('div#AutoHorn li span[name="hornTime"]').html("00:00");
    waktuRandom && a <= waktuRandom && $('div#AutoHorn li span[name="randomTime"]').html(msgWaktu(a, waktuRandom));
    if (waktuTournament && a < waktuTournament && 0 < $("div#tournamentStatusHud div.timer").length) {
        var b = msgWaktu(a, waktuTournament, 1);
        try {
            "pending" == unsafeWindow.user.viewing_atts.tournament.status ? b = "Starts in: " + b : "active" == unsafeWindow.user.viewing_atts.tournament.status && (b += " remaining")
        } catch (c) {}
        $("div#tournamentStatusHud div.timer").html(b)
    }
    waktuTrapCheck && a <= waktuTrapCheck ? $('div#AutoHorn li span[name="trapCheckTime"]').html(msgWaktu(a, waktuTrapCheck)) : $('div#AutoHorn li span[name="trapCheckTime"]').html("00:00");
    timerTitle =
    setTimeout(function () {
        tulisWaktu()
    }, 1E3)
}
function openLink(a) {
    0 < $('a[href="' + a + '"]').length && $('a[href="' + a + '"]').first().click();
    window.location.href = a
}
function msgWaktu(a, b, c) {
    var c = "undefined" != typeof c ? c : !1,
        a = Math.round((b - a) / 1E3),
        b = Math.floor(a / 3600),
        d = Math.floor(a / 60);
    0 == b && (b = null);
    d %= 60;
    10 > d && (d = "0" + d);
    a %= 60;
    10 > a && (a = "0" + a);
    return b ? c ? b + " hrs " + d + " mins " + a + " secs" : b + ":" + d + ":" + a : c ? d + " mins " + a + " secs" : d + ":" + a
}
function soundAlarm() {
    var a = document.getElementById("alarm");
    a || (a = document.createElement("span"), a.id = "alarm", $("body").append(a));
    a.innerHTML = '<embed type="application/x-mplayer2" loop="99" playcount="99" hidden="true" width="0" height="0" src="' + loadParam("soundURL", "http://www.fkware.com/roundclock/sounds/alarmclock2.wav") + '" autostart="true" volume="' + loadParam("alertVolume", 100) + '" ></embed>'
}
function calculateRandomPage() {
    if ("undefined" == typeof unsafeWindow.user.user_id) setTimeout(function () {
        calculateRandomPage()
    }, 1E3);
    else {
        var a = 6E4 * loadParam("minRandomPage", 10),
            b = 6E4 * loadParam("maxRandomPage", 20),
            a = Math.random() * (b - a) + a;
        setTimeout(function () {
            randomLinks()
        }, a);
        waktuRandom = new Date((new Date).getTime() + a)
    }
}
function calculateTrapCheck() {
    timerTrapCheck && clearTimeout(timerTrapCheck);
    var a = new Date,
        b = new Date;
    b.setMinutes(trapConfig.TrapCheck.min, trapConfig.TrapCheck.sec, 0);
    b < a && b.setTime(b.getTime() + 36E5);
    timerTrapCheck = setTimeout(function () {
        randomLinks()
    }, b.getTime() - a.getTime());
    waktuTrapCheck = b
}
function randomLinks() {
    var a = [];
    a.push("http://www.mousehuntgame.com/journal.php");
    a.push("http://www.mousehuntgame.com/profile.php");
    $('a[href*="www.mousehuntgame.com/inventory.php"]').add('a[href*="www.mousehuntgame.com/shops.php"]').add('a[href*="www.mousehuntgame.com/adversaries.php"]').add('a[href*="www.mousehuntgame.com/item.php"]').add('a[href*="www.mousehuntgame.com/journal.php"]').add('a[href*="www.mousehuntgame.com/profile.php"]').add('a[href*="www.mousehuntgame.com/tournament.php"]').not('a[href*="&"]').not('a[href*="#"]').each(function () {
        for (var b = $(this).attr("href"), d = !1, e = 0; e < a.length; e++) if (a[e] == b) {
            d = !0;
            break
        }
        d || a.push(b)
    });
    if (0 < a.length) {
        var b = Math.floor(Math.random() * a.length);
        openLink(a[b])
    }
}
function checkLocation() {
    if (31 == unsafeWindow.user.environment_id && trapConfig.ZugzwangTower.enabled) return unsafeWindow.user.viewing_atts.zzt_amplifier >= unsafeWindow.user.viewing_atts.zzt_max_amplifier ? travelTo("seasonal_garden", "zugzwang_tower") : changeTrap(trapConfig.SeasonalGarden[unsafeWindow.user.viewing_atts.season]);
    if (14 == unsafeWindow.user.environment_id && trapConfig.BalackCove.enabled) return 0 < getComponentQuantity(119) || 0 < getComponentQuantity(118) ? travelTo("jungle_of_dread", "balacks_cove") : changeTrap(trapConfig.BalackCove.jod);
    if (2 == unsafeWindow.user.environment_id && trapConfig.BalackCove.enabled) {
        var a = {
                base: -1,
                weapon: -1,
                trinket: -1,
                bait: -1
            },
            a = "high" == unsafeWindow.user.viewing_atts.tide ? trapConfig.BalackCove.high : "low" == unsafeWindow.user.viewing_atts.tide ? trapConfig.BalackCove.low : trapConfig.BalackCove.mid;
        if (0 < a.bait && 1 > getComponentQuantity(a.bait)) if (119 == a.bait && 0 < getComponentQuantity(118)) a.bait = 118;
        else if (118 == a.bait && 0 < getComponentQuantity(119)) a.bait = 119;
        else
        return travelTo("balacks_cove", "jungle_of_dread");
        return changeTrap(a)
    }
    if (32 == unsafeWindow.user.environment_id && trapConfig.ZugzwangTower.enabled) {
        var b = Math.max(unsafeWindow.user.viewing_atts.zzt_mage_progress, unsafeWindow.user.viewing_atts.zzt_tech_progress);
        if (a = 8 > b ? trapConfig.ZugzwangTower.pawn : 10 > b ? trapConfig.ZugzwangTower.knight : 12 > b ? trapConfig.ZugzwangTower.bishop : 14 > b ? trapConfig.ZugzwangTower.rook : 15 > b ? trapConfig.ZugzwangTower.queen : 16 > b ? trapConfig.ZugzwangTower.king : trapConfig.ZugzwangTower.chessmaster) return changeTrap(a)
    } else {
        if (39 == unsafeWindow.user.environment_id && trapConfig.Iceberg.enabled) return changeTrap(trapConfig.Iceberg.slushy_shoreline);
        if (40 == unsafeWindow.user.environment_id && trapConfig.Iceberg.enabled) {
            a = 0;
            for (b = 1; 4 >= b; b++) if (a += unsafeWindow.user.quests.QuestIceberg.phases[b].length, unsafeWindow.user.quests.QuestIceberg.user_progress < a) switch (b) {
            case 1:
                return changeTrap(trapConfig.Iceberg.phase1);
            case 2:
                return changeTrap(trapConfig.Iceberg.phase2);
            case 3:
                return changeTrap(trapConfig.Iceberg.phase3);
            case 4:
                return changeTrap(trapConfig.Iceberg.phase4)
            } else if (unsafeWindow.user.quests.QuestIceberg.user_progress == a) return changeTrap(trapConfig.Iceberg.generals);
            return changeTrap(trapConfig.Iceberg.phase5)
        }
        if (unsafeWindow.user.environment_id = trapConfig.FieryWarpath.enabled) {
            var c = ["Warrior", "Scout", "Archer", "Mage", "Cavalry"],
                a = {
                    base: -1,
                    weapon: -1,
                    trinket: -1,
                    bait: -1
                };
            if (4 == unsafeWindow.user.viewing_atts.desert_warpath.wave) return changeTrap(trapConfig.FieryWarpath.Boss);
            if ("desert_general" == unsafeWindow.user.viewing_atts.desert_warpath.streak.mouse_type) return changeTrap(trapConfig.FieryWarpath.crimson_commander);
            if ("desert_supply" == unsafeWindow.user.viewing_atts.desert_warpath.streak.mouse_type) return;
            var d = -1,
                e = c[0],
                f;
            for (f in unsafeWindow.user.viewing_atts.desert_warpath.wave_population) {
                if (0 < unsafeWindow.user.viewing_atts.desert_warpath.wave_population[f].population) break;
                e = unsafeWindow.user.viewing_atts.desert_warpath.wave_population[f].subgroup;
                if (1 == unsafeWindow.user.viewing_atts.desert_warpath.wave && "Archer" == e || 2 == unsafeWindow.user.viewing_atts.desert_warpath.wave && "Mage" == e || 3 == unsafeWindow.user.viewing_atts.desert_warpath.wave && "artillery" == e) return changeTrap(trapConfig.FieryWarpath.Warrior);
                d++
            }
            e = -1;
            f = !1;
            for (b in unsafeWindow.user.viewing_atts.desert_warpath.wave_population) if (e++, !(e <= d) && unsafeWindow.user.viewing_atts.desert_warpath.streak.mouse_type == b) switch (unsafeWindow.user.viewing_atts.desert_warpath.wave_population[b].subgroup) {
            case "Warrior":
                a = trapConfig.FieryWarpath.Warrior;
                break;
            case "Scout":
                a = trapConfig.FieryWarpath.Scout;
                break;
            case "Archer":
                a = trapConfig.FieryWarpath.Archer;
                break;
            case "Cavalry":
                2 <= unsafeWindow.user.viewing_atts.desert_warpath.streak.quantity ? a = trapConfig.FieryWarpath.Cavalry : f = !0;
                break;
            case "Mage":
                2 <= unsafeWindow.user.viewing_atts.desert_warpath.streak.quantity ? a = trapConfig.FieryWarpath.Mage : f = !0
            }
            if (!1 == unsafeWindow.user.viewing_atts.desert_warpath.streak.mouse_type || f) 
				a = trapConfig.FieryWarpath[c[d + 1]];
						
            if(7 <= unsafeWindow.user.viewing_atts.desert_warpath.streak.quantity) a = trapConfig.FieryWarpath.Gargantua;
            if (a) return changeTrap(a)
        }
    }
    return ! ! 0
}

function changeTrap(a) {
    var b;
    0 < a.weapon && a.weapon != currentTrap.weapon ? b = "weapon" : 0 < a.base && a.base != currentTrap.base ? b = "base" : -1 < a.trinket && a.trinket != currentTrap.trinket ? b = "trinket" : -1 < a.bait && a.bait != currentTrap.bait && (b = "bait");
    if (b) {
        if ("undefined" == typeof unsafeWindow.userTrapSelector) return openLink(defaultpage),
        !1;
        unsafeWindow.userTrapSelector.selectedComponentClass != b && ("weapon" === b ? $("a#trapSelector-viewWeapon img").click() : "base" === b ? $("a#trapSelector-viewBase img").click() : "trinket" === b ? 0 < $("a#trapSelector-viewtrinket div.empty").length ? $("a#trapSelector-viewtrinket div.empty").click() : $("a#trapSelector-viewtrinket img").click() : "bait" === b && (0 < $("a#trapSelector-viewBait div.empty").length ? $("a#trapSelector-viewBait div.empty").click() : $("a#trapSelector-viewBait img").click()));
        if (!1 == unsafeWindow.userTrapSelector.componentsCached) return ! ! 1;
        var c = a[b];
        0 == c ? $('div[id="trapSelectorSelectedComponent"] div.content').click() : (c = getComponentName(c)) ? $('div[id="trapSelectorBrowser"] a[id="selectComponent-' + c + '"] div.content').click() : (a[b] = -1, a = JSON.stringify(trapConfig), saveParam("trapConfig", a), checkLocation());
        return ! ! 1
    }
    return ! ! 0
}
function getComponentQuantity(a) {
    for (var b in availableTraps) if (availableTraps[b].item_id == a) return availableTraps[b].quantity;
    return 0
}
function getComponentName(a) {
    if ("undefined" == typeof unsafeWindow.userTrapSelector || "undefined" == typeof unsafeWindow.userTrapSelector.availableComponents) return null;
    for (var b in unsafeWindow.userTrapSelector.availableComponents) if (unsafeWindow.userTrapSelector.availableComponents[b].item_id == a) return unsafeWindow.userTrapSelector.availableComponents[b].type;
    return null
}
function travelTo(a, b) {
    if (a === b) return ! ! 0;
    if ("meadow" === b) openLink("http://www.mousehuntgame.com/travel.php?freeTravel=true?&uh=" + unsafeWindow.user.unique_hash);
    else {
        var c = new unsafeWindow.Ajax;
        c.requireLogin = !0;
        c.responseType = unsafeWindow.Ajax.JSON;
        c.ondone = function (c) {
            if (c.success) {
                try {
                    unsafeWindow.eventRegistry.doEvent("ajax_response", c),
                    unsafeWindow.eventRegistry.doEvent("travel_complete", {
                        old: a,
                        "new": b
                    })
                } catch (e) {}
                try {
                    unsafeWindow.app.views.HeadsUpDisplayView.hud.render(c.user)
                } catch (f) {}
            }
        };
        c.post(unsafeWindow.callbackurl + "managers/ajax/users/changeenvironment.php", {
            origin: a,
            destination: b,
            uh: unsafeWindow.user.unique_hash
        })
    }
    return ! ! 1
}
function soundTheHorn() {
    !unsafeWindow.user.has_puzzle && hornAllowed && ("block" == $("div#hornArea div.hornbutton").css("display") ? $("div#hornArea div.hornbutton a").click() : randomLinks())
}
function mulai() {
    clearTimeout(timerEvent);
    if ("undefined" == typeof unsafeWindow.user) setTimeout(function () {
        mulai()
    }, 1E3);
    else {
        var a;
        a = "undefined" != typeof unsafeWindow.HuntersHorn.getSecondsRemaining ? unsafeWindow.HuntersHorn.getSecondsRemaining() : parseInt(unsafeWindow.user.next_activeturn_seconds);
        var b = unsafeWindow.user.has_puzzle,
            c = parseInt(unsafeWindow.user.user_id),
            d = parseInt(unsafeWindow.user.bait_quantity);
        if (isNaN(c) || 1 > c) setTimeout(function () {
            document.location = defaultpage
        }, 6E4);
        else if (cleanupLink(), 0 < $("div#tournamentStatusHud div.timer").length && (waktuTournament = new Date((new Date).getTime() + 1E3 * unsafeWindow.user.viewing_atts.tournament.seconds_remaining)), !0 == b) alertShown || (alertShown = !0, loadParam("enableAlert", !1) ? soundAlarm() : alert("King Reward")),
        a = Math.round(Math.random() * Math.abs(6E4 * (loadParam("maxKRWait", 180) - loadParam("minKRWait", 180)))) + 6E4 * loadParam("minKRWait", 180),
        timerEvent = setTimeout(function () {
            randomLinks()
        }, a),
        waktuRandom = new Date((new Date).getTime() + a),
        waktuNextHorn = null,
        msgTitle = "King Reward",
        waktuTitle = new Date;
        else {
            currentTrap.weapon = unsafeWindow.user.weapon_item_id;
            currentTrap.base = unsafeWindow.user.base_item_id;
            currentTrap.trinket = unsafeWindow.user.trinket_item_id;
            currentTrap.bait = unsafeWindow.user.bait_item_id;
            0 == currentTrap.trinket ? ($("span#hud_trinketName a").html("None&nbsp;"), $("span#hud_trinketQuantity").html("0")) : ($("span#hud_trinketName a").html(unsafeWindow.user.trinket_name + "&nbsp;"), $("span#hud_trinketQuantity").html(unsafeWindow.user.trinket_quantity));
            for (var e in availableTraps) if (availableTraps[e].item_id == currentTrap.bait && availableTraps[e].quantity != unsafeWindow.user.bait_quantity && (availableTraps[e].quantity = unsafeWindow.user.bait_quantity, saveParam("availableTraps", JSON.stringify(availableTraps))), availableTraps[e].item_id == currentTrap.trinket && availableTraps[e].quantity != unsafeWindow.user.trinket_quantity) availableTraps[e].quantity = unsafeWindow.user.trinket_quantity,
            saveParam("availableTraps", JSON.stringify(availableTraps));
            calculateTrapCheck();
            $("span#hud_titlePercentage").html(unsafeWindow.user.title_percentage);
            hornAllowed = checkLocation();
            1 > d && (hornAllowed = !1);
            0 == a && hornAllowed ? soundTheHorn() : 0 < a && (msgTitle = "Sound The Horn", waktuTitle = new Date((new Date).getTime() + 1E3 * a), a = a + Math.round(Math.random() * Math.abs(loadParam("maxHornDelay", 120) - loadParam("minHornDelay", 30))) + loadParam("minHornDelay", 30), waktuNextHorn = new Date((new Date).getTime() + 1E3 * a), timerEvent = setTimeout(function () {
                hornAllowed && ($("div#hornArea div.hornbutton").css("display") == "block" ? soundTheHorn() : randomLinks())
            }, 1E3 * a))
        }
    }
}
function populateComboTrap(a) {
    var b = [],
        c;
    for (c in a) b.push(a[c]);
    b.sort(function (a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    });
    for (var d in b) {
        var e = b[d].item_id,
            f = b[d].name,
            a = b[d].classification;
        "base" === a ? $('div#AutoHornWindow select[name^="cbo"][name$="Base"]').each(function () {
            $(this).append('<option value="' + e + '" title="' + f + '">' + f + "</option>")
        }) : "weapon" === a ? $('div#AutoHornWindow select[name^="cbo"][name$="Weapon"]').each(function () {
            $(this).append('<option value="' + e + '" title="' + f + '">' + f + "</option>")
        }) : "trinket" === a ? $('div#AutoHornWindow select[name^="cbo"][name$="Trinket"]').each(function () {
            $(this).append('<option value="' + e + '" title="' + f + '">' + f + " (" + b[d].quantity + ")</option>")
        }) : "bait" === a && $('div#AutoHornWindow select[name^="cbo"][name$="Bait"]').each(function () {
            $(this).append('<option value="' + e + '" title="' + f + '">' + f + " (" + b[d].quantity + ")</option>")
        })
    }
}
function setSelectionComboTrap(a, b) {
    $('div#AutoHornWindow select[name="cbo' + a + 'Base"] option[value="' + b.base + '"]').attr("selected", "selected");
    $('div#AutoHornWindow select[name="cbo' + a + 'Weapon"] option[value="' + b.weapon + '"]').attr("selected", "selected");
    $('div#AutoHornWindow select[name="cbo' + a + 'Trinket"] option[value="' + b.trinket + '"]').attr("selected", "selected");
    $('div#AutoHornWindow select[name="cbo' + a + 'Bait"] option[value="' + b.bait + '"]').attr("selected", "selected")
}
function getSelectionComboTrap(a, b) {
    b.base = $('div#AutoHornWindow select[name="cbo' + a + 'Base"]').val();
    b.weapon = $('div#AutoHornWindow select[name="cbo' + a + 'Weapon"]').val();
    b.trinket = $('div#AutoHornWindow select[name="cbo' + a + 'Trinket"]').val();
    b.bait = $('div#AutoHornWindow select[name="cbo' + a + 'Bait"]').val()
}
function generateTrapSetupCombo(a) {
    return '<select name="cbo' + a + 'Base"><option value="-1">Any</option></select> <select name="cbo' + a + 'Weapon"><option value="-1">Any</option></select> <select name="cbo' + a + 'Trinket"><option value="-1">Any</option><option value="0">None</option></select> <select name="cbo' + a + 'Bait"><option value="-1">Any</option></select>'
}
function showBalackPage() {
    $('div#AutoHornWindow a[href="#save"]').unbind("click");
    $('div#AutoHornWindow a[href="#default"]').unbind("click");
    $('div#AutoHornWindow div[name="top"]').html("Balack's Cove Configuration");
    $('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span><li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Don\'t forget to disable this if you want to hunt in JoD</li></ul><ul><span class="groupTitle">Trap Setup</span><li title="You won\'t transferred automatically to Cove if you don\'t have Vengeful or Vanilla Stilton, hunt in JoD with this setup"><span class="paramDesc">Jungle of Dread</span>' + generateTrapSetupCombo("Jungle") + '</li><li title="Trap setup when high tide"><span class="paramDesc">High Tide</span>' + generateTrapSetupCombo("high") + '</li><li title="Trap setup when mid tide"><span class="paramDesc">Mid Tide</span>' + generateTrapSetupCombo("mid") + '</li><li title="Trap setup when low tide"><span class="paramDesc">Low Tide</span>' + generateTrapSetupCombo("low") + "</li></ul><br>");
    $('div#AutoHornWindow div[name="main"]').css({
        "overflow-y": "auto",
        height: "350px"
    });
    $('div#AutoHornWindow div[name="main"] ul').css({
        "list-style-type": "none",
        margin: "0px"
    });
    $('div#AutoHornWindow div[name="main"] .groupTitle').css({
        "font-weight": "bold",
        "font-size": "1.2em"
    });
    $('div#AutoHornWindow div[name="main"] .paramDesc').css({
        "font-weight": "bold",
        "float": "left",
        width: "150",
        "padding-left": "20px"
    });
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "300px"
    });
    $('div#AutoHornWindow div[name="main"] input.short').css({
        width: "20px"
    });
    $('div#AutoHornWindow div[name="main"] br').css({
        clear: "left"
    });
    populateComboTrap(availableTraps);
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "100px"
    });
    trapConfig.BalackCove.enabled && $('div#AutoHornWindow input[name="chkEnable"]').attr("checked", "checked");
    setSelectionComboTrap("Jungle", trapConfig.BalackCove.jod);
    setSelectionComboTrap("high", trapConfig.BalackCove.high);
    setSelectionComboTrap("mid", trapConfig.BalackCove.mid);
    setSelectionComboTrap("low", trapConfig.BalackCove.low);
    $('div#AutoHornWindow a[href="#save"]').click(function (a) {
        a.preventDefault();
        trapConfig.BalackCove.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
        getSelectionComboTrap("Jungle", trapConfig.BalackCove.jod);
        getSelectionComboTrap("high", trapConfig.BalackCove.high);
        getSelectionComboTrap("mid", trapConfig.BalackCove.mid);
        getSelectionComboTrap("low", trapConfig.BalackCove.low);
        a = JSON.stringify(trapConfig);
        saveParam("trapConfig", a);
        $("div#AutoHornWindow").hide();
        $("div#AutoHornMask").hide();
        checkLocation()
    });
    $('div#AutoHornWindow a[href="#default"]').click(function (a) {
        a.preventDefault();
        $('div#AutoHornWindow input[name="chkEnable"]').removeAttr("checked");
        $('div#AutoHornWindow select[name^="cbo"] option').each(function () {
            $(this).removeAttr("selected")
        })
    });
    var a = $(window).height(),
        b = $(window).width();
    $("div#AutoHornWindow").css({
        top: (a - $("div#AutoHornWindow").height()) / 2,
        left: (b - $("div#AutoHornWindow").width()) / 2
    });
    $("div#AutoHornMask").css({
        top: "0",
        left: "0",
        width: b,
        height: a
    });
    $("div#AutoHornMask").fadeTo(0, 0.8);
    $("div#AutoHornWindow").fadeIn(2E3)
}
function showIcebergPage() {
    $('div#AutoHornWindow a[href="#save"]').unbind("click");
    $('div#AutoHornWindow a[href="#default"]').unbind("click");
    $('div#AutoHornWindow div[name="top"]').html("Iceberg Configuration");
    $('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span><li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Use setup below for each conditions</li></ul><ul><span class="groupTitle">Trap Setup</span><li title="Trap setup for Slushy Shoreline"><span class="paramDesc">Slushy Shoreline</span>' + generateTrapSetupCombo("Slushy") + '</li><li title="Trap setup for phase 1 (Treacherous Tunnels)"><span class="paramDesc">Treacherous Tunnels</span>' + generateTrapSetupCombo("Phase1") + '</li><li title="Trap setup for phase 2 (Brutal Bulwark)"><span class="paramDesc">Brutal Bulwark</span>' + generateTrapSetupCombo("Phase2") + '</li><li title="Trap setup for phase 3 (Bombing Run)"><span class="paramDesc">Bombing Run</span>' + generateTrapSetupCombo("Phase3") + '</li><li title="Trap setup for phase 4 (The Mad Depths)"><span class="paramDesc">The Mad Depths</span>' + generateTrapSetupCombo("Phase4") + '</li><li title="Trap setup for phase 5 (Icewing\'s Lair)"><span class="paramDesc">Icewing\'s Lair</span>' + generateTrapSetupCombo("Phase5") + '</select></li><li title="Trap setup when meeting generals"><span class="paramDesc">Generals</span>' + generateTrapSetupCombo("General") + "</li></ul><br>");
    $('div#AutoHornWindow div[name="main"]').css({
        "overflow-y": "auto",
        height: "350px"
    });
    $('div#AutoHornWindow div[name="main"] ul').css({
        "list-style-type": "none",
        margin: "0px"
    });
    $('div#AutoHornWindow div[name="main"] .groupTitle').css({
        "font-weight": "bold",
        "font-size": "1.2em"
    });
    $('div#AutoHornWindow div[name="main"] .paramDesc').css({
        "font-weight": "bold",
        "float": "left",
        width: "150",
        "padding-left": "20px"
    });
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "300px"
    });
    $('div#AutoHornWindow div[name="main"] br').css({
        clear: "left"
    });
    populateComboTrap(availableTraps);
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "100px"
    });
    trapConfig.Iceberg.enabled && $('div#AutoHornWindow input[name="chkEnable"]').attr("checked", "checked");
    setSelectionComboTrap("Slushy", trapConfig.Iceberg.slushy_shoreline);
    setSelectionComboTrap("Phase1", trapConfig.Iceberg.phase1);
    setSelectionComboTrap("Phase2", trapConfig.Iceberg.phase2);
    setSelectionComboTrap("Phase3", trapConfig.Iceberg.phase3);
    setSelectionComboTrap("Phase4", trapConfig.Iceberg.phase4);
    setSelectionComboTrap("Phase5", trapConfig.Iceberg.phase5);
    setSelectionComboTrap("General", trapConfig.Iceberg.generals);
    $('div#AutoHornWindow a[href="#save"]').click(function (a) {
        a.preventDefault();
        trapConfig.Iceberg.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
        getSelectionComboTrap("Slushy", trapConfig.Iceberg.slushy_shoreline);
        getSelectionComboTrap("Phase1", trapConfig.Iceberg.phase1);
        getSelectionComboTrap("Phase2", trapConfig.Iceberg.phase2);
        getSelectionComboTrap("Phase3", trapConfig.Iceberg.phase3);
        getSelectionComboTrap("Phase4", trapConfig.Iceberg.phase4);
        getSelectionComboTrap("Phase5", trapConfig.Iceberg.phase5);
        getSelectionComboTrap("General", trapConfig.Iceberg.generals);
        a = JSON.stringify(trapConfig);
        saveParam("trapConfig", a);
        $("div#AutoHornWindow").hide();
        $("div#AutoHornMask").hide();
        checkLocation()
    });
    $('div#AutoHornWindow a[href="#default"]').click(function (a) {
        a.preventDefault();
        $('div#AutoHornWindow input[name="chkEnable"]').removeAttr("checked");
        $('div#AutoHornWindow select[name^="cbo"] option').each(function () {
            $(this).removeAttr("selected")
        })
    });
    var a = $(window).height(),
        b = $(window).width();
    $("div#AutoHornWindow").css({
        top: (a - $("div#AutoHornWindow").height()) / 2,
        left: (b - $("div#AutoHornWindow").width()) / 2
    });
    $("div#AutoHornMask").css({
        top: "0",
        left: "0",
        width: b,
        height: a
    });
    $("div#AutoHornMask").fadeTo(0, 0.8);
    $("div#AutoHornWindow").fadeIn(2E3)
}
function showFieryWarpathPage() {
    $('div#AutoHornWindow a[href="#save"]').unbind("click");
    $('div#AutoHornWindow a[href="#default"]').unbind("click");
    $('div#AutoHornWindow div[name="top"]').html("Fiery Warpath Configuration");
    $('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span><li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Use setup below for each conditions</li></ul><ul><span class="groupTitle">Trap Setup</span><li title="Trap setup for Warrior (Physical)"><span class="paramDesc">Warrior</span>' + generateTrapSetupCombo("Warrior") + '</li><li title="Trap setup for Scout (Physical)"><span class="paramDesc">Scout</span>' + generateTrapSetupCombo("Scout") + '</li><li title="Trap setup for Archer (Physical)"><span class="paramDesc">Archer </span>' + generateTrapSetupCombo("Archer") + '</li><li title="Trap setup for Cavalry in wave 2,3(Tatical)"><span class="paramDesc">Cavalry </span>' + generateTrapSetupCombo("Cavalry") + '</li><li title="Trap setup for Mage in wave 2,3 (Hydro)"><span class="paramDesc">Mage</span>' + generateTrapSetupCombo("Mage") + '</li><li title="Trap setup for Artillery in wave 3 (Arcane)"><span class="paramDesc">Artillery</span>' + generateTrapSetupCombo("Artillery") + '</select></li><li title="Trap setup for Crimson Commander"><span class="paramDesc">Crimson Commander</span>' + generateTrapSetupCombo("Crimson_commander") + '</select></li><li title="Trap setup for Gargantuamouse (Dragon)"><span class="paramDesc">Gargantuamouse</span>' + generateTrapSetupCombo("Gargantua") + '</select></li><li title="Trap setup for Boss in wave 4 (Physical)"><span class="paramDesc">Boss (Physical)</span>' + generateTrapSetupCombo("Boss") + "</select></li></ul><br>");
    $('div#AutoHornWindow div[name="main"]').css({
        "overflow-y": "auto",
        height: "350px"
    });
    $('div#AutoHornWindow div[name="main"] ul').css({
        "list-style-type": "none",
        margin: "0px"
    });
    $('div#AutoHornWindow div[name="main"] .groupTitle').css({
        "font-weight": "bold",
        "font-size": "1.2em"
    });
    $('div#AutoHornWindow div[name="main"] .paramDesc').css({
        "font-weight": "bold",
        "float": "left",
        width: "150",
        "padding-left": "20px"
    });
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "300px"
    });
    $('div#AutoHornWindow div[name="main"] br').css({
        clear: "left"
    });
    populateComboTrap(availableTraps);
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "100px"
    });
    trapConfig.FieryWarpath.enabled && $('div#AutoHornWindow input[name="chkEnable"]').attr("checked", "checked");
    setSelectionComboTrap("Warrior", trapConfig.FieryWarpath.Warrior);
    setSelectionComboTrap("Scout", trapConfig.FieryWarpath.Scout);
    setSelectionComboTrap("Archer", trapConfig.FieryWarpath.Archer);
    setSelectionComboTrap("Cavalry", trapConfig.FieryWarpath.Cavalry);
    setSelectionComboTrap("Mage", trapConfig.FieryWarpath.Mage);
    setSelectionComboTrap("Artillery", trapConfig.FieryWarpath.Artillery);
    setSelectionComboTrap("Gargantua", trapConfig.FieryWarpath.Gargantua);
    setSelectionComboTrap("Crimson_commander", trapConfig.FieryWarpath.Crimson_commander);
    setSelectionComboTrap("Boss", trapConfig.FieryWarpath.Boss);
    $('div#AutoHornWindow a[href="#save"]').click(function (a) {
        a.preventDefault();
        trapConfig.FieryWarpath.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
        getSelectionComboTrap("Warrior", trapConfig.FieryWarpath.Warrior);
        getSelectionComboTrap("Scout", trapConfig.FieryWarpath.Scout);
        getSelectionComboTrap("Archer", trapConfig.FieryWarpath.Archer);
        getSelectionComboTrap("Cavalry", trapConfig.FieryWarpath.Cavalry);
        getSelectionComboTrap("Mage", trapConfig.FieryWarpath.Mage);
        getSelectionComboTrap("Artillery", trapConfig.FieryWarpath.Artillery);
        getSelectionComboTrap("Gargantua", trapConfig.FieryWarpath.Gargantua);
        getSelectionComboTrap("Crimson_commander", trapConfig.FieryWarpath.Crimson_commander);
        getSelectionComboTrap("Boss", trapConfig.FieryWarpath.Boss);
        a = JSON.stringify(trapConfig);        
        saveParam("trapConfig", a);
        $("div#AutoHornWindow").hide();
        $("div#AutoHornMask").hide();
        checkLocation()
    });
    $('div#AutoHornWindow a[href="#default"]').click(function (a) {
        a.preventDefault();
        $('div#AutoHornWindow input[name="chkEnable"]').removeAttr("checked");
        $('div#AutoHornWindow select[name^="cbo"] option').each(function () {
            $(this).removeAttr("selected")
        })
    });
    var a = $(window).height(),
        b = $(window).width();
    $("div#AutoHornWindow").css({
        top: (a - $("div#AutoHornWindow").height()) / 2,
        left: (b - $("div#AutoHornWindow").width()) / 2
    });
    $("div#AutoHornMask").css({
        top: "0",
        left: "0",
        width: b,
        height: a
    });
    $("div#AutoHornMask").fadeTo(0, 0.8);
    $("div#AutoHornWindow").fadeIn(2E3)
}
function showZugzwangPage() {
    $('div#AutoHornWindow a[href="#save"]').unbind("click");
    $('div#AutoHornWindow a[href="#default"]').unbind("click");
    $('div#AutoHornWindow div[name="top"]').html("Zugzwang Configuration");
    $('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span><li tittle="toggle enable/disable setup on this page"><span class="paramDesc">Enable</span><input type="checkbox" name="chkEnable" />Use setup below and travel to tower when my amplifier full</li></ul><ul><span class="groupTitle">Seasonal Garden</span><li title="Trap setup for winter season (hydro)"><span class="paramDesc">Winter</span>' + generateTrapSetupCombo("Winter") + '</li><li title="Trap setup for spring season (physical)"><span class="paramDesc">Spring</span>' + generateTrapSetupCombo("Spring") + '</li><li title="Trap setup for summer season (tactical)"><span class="paramDesc">Summer</span>' + generateTrapSetupCombo("Summer") + '</li><li title="Trap setup for fall season (shadow)"><span class="paramDesc">Fall</span>' + generateTrapSetupCombo("Fall") + '</li></ul><ul><span class="groupTitle">Zugzwang Tower</span><li title="Trap setup for pawn"><span class="paramDesc">Pawn</span>' + generateTrapSetupCombo("Pawn") + '</li><li title="Trap setup for knight"><span class="paramDesc">Knight</span>' + generateTrapSetupCombo("Knight") + '</li><li title="Trap setup for bishop"><span class="paramDesc">Bishop</span>' + generateTrapSetupCombo("Bishop") + '</li><li title="Trap setup for rook"><span class="paramDesc">Rook</span>' + generateTrapSetupCombo("Rook") + '</li><li title="Trap setup for queen"><span class="paramDesc">Queen</span>' + generateTrapSetupCombo("Queen") + '</li><li title="Trap setup for king"><span class="paramDesc">King</span>' + generateTrapSetupCombo("King") + '</li><li title="Trap setup for chessmaster"><span class="paramDesc">Chessmaster</span>' + generateTrapSetupCombo("Chessmaster") + "</li></ul><br>");
    $('div#AutoHornWindow div[name="main"]').css({
        "overflow-y": "auto",
        height: "350px"
    });
    $('div#AutoHornWindow div[name="main"] ul').css({
        "list-style-type": "none",
        margin: "0px"
    });
    $('div#AutoHornWindow div[name="main"] .groupTitle').css({
        "font-weight": "bold",
        "font-size": "1.2em"
    });
    $('div#AutoHornWindow div[name="main"] .paramDesc').css({
        "font-weight": "bold",
        "float": "left",
        width: "150",
        "padding-left": "20px"
    });
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "300px"
    });
    $('div#AutoHornWindow div[name="main"] br').css({
        clear: "left"
    });
    populateComboTrap(availableTraps);
    $('div#AutoHornWindow div[name="main"] select').css({
        width: "100px"
    });
    trapConfig.ZugzwangTower.enabled && $('div#AutoHornWindow input[name="chkEnable"]').attr("checked", "checked");
    setSelectionComboTrap("Winter", trapConfig.SeasonalGarden.wr);
    setSelectionComboTrap("Spring", trapConfig.SeasonalGarden.sg);
    setSelectionComboTrap("Summer", trapConfig.SeasonalGarden.sr);
    setSelectionComboTrap("Fall", trapConfig.SeasonalGarden.fl);
    setSelectionComboTrap("Pawn", trapConfig.ZugzwangTower.pawn);
    setSelectionComboTrap("Knight", trapConfig.ZugzwangTower.knight);
    setSelectionComboTrap("Bishop", trapConfig.ZugzwangTower.bishop);
    setSelectionComboTrap("Rook", trapConfig.ZugzwangTower.rook);
    setSelectionComboTrap("Queen", trapConfig.ZugzwangTower.queen);
    setSelectionComboTrap("King", trapConfig.ZugzwangTower.king);
    setSelectionComboTrap("Chessmaster", trapConfig.ZugzwangTower.chessmaster);
    $('div#AutoHornWindow a[href="#save"]').click(function (a) {
        a.preventDefault();
        trapConfig.ZugzwangTower.enabled = $('div#AutoHornWindow input[name="chkEnable"]:checked').length;
        getSelectionComboTrap("Winter", trapConfig.SeasonalGarden.wr);
        getSelectionComboTrap("Spring", trapConfig.SeasonalGarden.sg);
        getSelectionComboTrap("Summer", trapConfig.SeasonalGarden.sr);
        getSelectionComboTrap("Fall", trapConfig.SeasonalGarden.fl);
        getSelectionComboTrap("Pawn", trapConfig.ZugzwangTower.pawn);
        getSelectionComboTrap("Knight", trapConfig.ZugzwangTower.knight);
        getSelectionComboTrap("Bishop", trapConfig.ZugzwangTower.bishop);
        getSelectionComboTrap("Rook", trapConfig.ZugzwangTower.rook);
        getSelectionComboTrap("Queen", trapConfig.ZugzwangTower.queen);
        getSelectionComboTrap("King", trapConfig.ZugzwangTower.king);
        getSelectionComboTrap("Chessmaster", trapConfig.ZugzwangTower.chessmaster);
        a = JSON.stringify(trapConfig);
        saveParam("trapConfig", a);
        $("div#AutoHornWindow").hide();
        $("div#AutoHornMask").hide();
        checkLocation()
    });
    $('div#AutoHornWindow a[href="#default"]').click(function (a) {
        a.preventDefault();
        $('div#AutoHornWindow input[name="chkEnable"]').removeAttr("checked");
        $('div#AutoHornWindow select[name^="cbo"] option').each(function () {
            $(this).removeAttr("selected")
        })
    });
    var a = $(window).height(),
        b = $(window).width();
    $("div#AutoHornWindow").css({
        top: (a - $("div#AutoHornWindow").height()) / 2,
        left: (b - $("div#AutoHornWindow").width()) / 2
    });
    $("div#AutoHornMask").css({
        top: "0",
        left: "0",
        width: b,
        height: a
    });
    $("div#AutoHornMask").fadeTo(0, 0.8);
    $("div#AutoHornWindow").fadeIn(2E3)
}
function showConfigPage() {
    $('div#AutoHornWindow a[href="#save"]').unbind("click");
    $('div#AutoHornWindow a[href="#default"]').unbind("click");
    $('div#AutoHornWindow div[name="top"]').html("AutoHorn Configuration");
    $('div#AutoHornWindow div[name="main"]').html('<ul><span class="groupTitle">General</span><li title="extra time to be added to horn time"><span class="paramDesc">Horn Delay</span>min <input type="text" name="txtMinHorn" class="short" /> max <input type="text" name="txtMaxHorn" class="short" /> seconds</li><li title="time to opening random link"><span class="paramDesc">Random Delay</span>min <input type="text" name="txtMinRandom" class="short" /> max <input type="text" name="txtMaxRandom" class="short" /> minutes</li><li title="When to checking page for TrapCheck (mm:ss). This will using your local time."><span class="paramDesc">Trap Check</span><input type="text" name="txtTrapCheckMin" class="short" /> : <input type="text" name="txtTrapCheckSec" class="short" /></li><li title="time to wait when king\'s reward appears before opening random link"><span class="paramDesc">KR Delay</span>min <input type="text" name="txtMinKR" class="short" /> max <input type="text" name="txtMaxKR" class="short" /> minutes</li><li title="toggle update timer on window title"><span class="paramDesc">Update Window Title</span><input type="radio" name="optWinTitle" value="true" />Yes <input type="radio" name="optWinTitle" value="false" />No</li></ul><ul><span class="groupTitle">Sound</span><li title="use sound as king\'s reward alert"><span class="paramDesc">Alert Sound</span><input type="radio" name="optAlert" value="true" />Yes <input type="radio" name="optAlert" value="false" />No</li><li title="URL for sound"><span class="paramDesc">Sound URL</span><input type="text" name="txtSound" class="long" /></li><li title="volume for alert"><span class="paramDesc">Sound Volume</span><input type="text" name="txtVolume" class="short" /></li></ul><br />');
    $('div#AutoHornWindow div[name="main"]').css({
        "overflow-y": "auto",
        height: "350px"
    });
    $('div#AutoHornWindow div[name="main"] ul').css({
        "list-style-type": "none",
        margin: "0px"
    });
    $('div#AutoHornWindow div[name="main"] .groupTitle').css({
        "font-weight": "bold",
        "font-size": "1.2em"
    });
    $('div#AutoHornWindow div[name="main"] .paramDesc').css({
        "font-weight": "bold",
        "float": "left",
        width: "150",
        "padding-left": "20px"
    });
    $('div#AutoHornWindow div[name="main"] input.short').css({
        width: "30px",
        "text-align": "right"
    });
    $('div#AutoHornWindow div[name="main"] input.long').css({
        width: "150px"
    });
    $('div#AutoHornWindow div[name="main"] br').css({
        clear: "left"
    });
    $('div#AutoHornWindow div[name="main"] input[name="txtMinHorn"]').val(loadParam("minHornDelay", 30));
    $('div#AutoHornWindow div[name="main"] input[name="txtMaxHorn"]').val(loadParam("maxHornDelay", 120));
    $('div#AutoHornWindow div[name="main"] input[name="txtMinKR"]').val(loadParam("minKRWait", 180));
    $('div#AutoHornWindow div[name="main"] input[name="txtMaxKR"]').val(loadParam("maxKRWait", 210));
    $('div#AutoHornWindow div[name="main"] input[name="txtMinRandom"]').val(loadParam("minRandomPage", 10));
    $('div#AutoHornWindow div[name="main"] input[name="txtMaxRandom"]').val(loadParam("maxRandomPage", 20));
    $('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckMin"]').val(trapConfig.TrapCheck.min);
    $('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckSec"]').val(trapConfig.TrapCheck.sec);
    $('div#AutoHornWindow div[name="main"] input[name="txtSound"]').val(loadParam("soundURL", "http://www.fkware.com/roundclock/sounds/alarmclock2.wav"));
    $('div#AutoHornWindow div[name="main"] input[name="txtVolume"]').val(loadParam("alertVolume", 100));
    loadParam("enableAlert", !1) ? $('div#AutoHornWindow div[name="main"] input[name="optAlert"][value="true"]').prop("checked", !0) : $('div#AutoHornWindow div[name="main"] input[name="optAlert"][value="false"]').prop("checked", !0);
    loadParam("updateWindowTitle", !0) ? $('div#AutoHornWindow div[name="main"] input[name="optWinTitle"][value="true"]').prop("checked", !0) : $('div#AutoHornWindow div[name="main"] input[name="optWinTitle"][value="false"]').prop("checked", !0);
    $('div#AutoHornWindow a[href="#save"]').click(function (a) {
        a.preventDefault();
        saveParam("minHornDelay", parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMinHorn"]').val()));
        saveParam("maxHornDelay", parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMaxHorn"]').val()));
        saveParam("minKRWait", parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMinKR"]').val()));
        saveParam("maxKRWait", parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMaxKR"]').val()));
        saveParam("alertVolume", parseInt($('div#AutoHornWindow div[name="main"] input[name="txtVolume"]').val()));
        saveParam("minRandomPage", parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMinRandom"]').val()));
        saveParam("maxRandomPage", parseInt($('div#AutoHornWindow div[name="main"] input[name="txtMaxRandom"]').val()));
        saveParam("soundURL", $('div#AutoHornWindow div[name="main"] input[name="txtSound"]').val());
        saveParam("enableAlert", "true" == $('div#AutoHornWindow div[name="main"] input[name="optAlert"]:checked').val() ? !0 : !1);
        saveParam("updateWindowTitle", "true" == $('div#AutoHornWindow div[name="main"] input[name="optWinTitle"]:checked').val() ? !0 : !1);
        trapConfig.TrapCheck.min = parseInt($('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckMin"]').val());
        trapConfig.TrapCheck.sec = parseInt($('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckSec"]').val());
        a = JSON.stringify(trapConfig);
        saveParam("trapConfig", a);
        calculateTrapCheck();
        $("div#AutoHornWindow").hide();
        $("div#AutoHornMask").hide()
    });
    $('div#AutoHornWindow a[href="#default"]').click(function (a) {
        a.preventDefault();
        $('div#AutoHornWindow div[name="main"] input[name="txtMinHorn"]').val(30);
        $('div#AutoHornWindow div[name="main"] input[name="txtMaxHorn"]').val(120);
        $('div#AutoHornWindow div[name="main"] input[name="txtMinKR"]').val(180);
        $('div#AutoHornWindow div[name="main"] input[name="txtMaxKR"]').val(210);
        $('div#AutoHornWindow div[name="main"] input[name="txtMinRandom"]').val(10);
        $('div#AutoHornWindow div[name="main"] input[name="txtMaxRandom"]').val(20);
        $('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckMin"]').val(0);
        $('div#AutoHornWindow div[name="main"] input[name="txtTrapCheckSec"]').val(0);
        $('div#AutoHornWindow div[name="main"] input[name="txtSound"]').val("http://www.fkware.com/roundclock/sounds/alarmclock2.wav");
        $('div#AutoHornWindow div[name="main"] input[name="txtVolume"]').val(100);
        $('div#AutoHornWindow div[name="main"] input[name="optAlert"][value="false"]').prop("checked", !0);
        $('div#AutoHornWindow div[name="main"] input[name="optWinTitle"][value="true"]').prop("checked", !0)
    });
    var a = $(window).height(),
        b = $(window).width();
    $("div#AutoHornWindow").css({
        top: (a - $("div#AutoHornWindow").height()) / 2,
        left: (b - $("div#AutoHornWindow").width()) / 2
    });
    $("div#AutoHornMask").css({
        top: "0",
        left: "0",
        width: b,
        height: a
    });
    $("div#AutoHornMask").fadeTo(0, 0.8);
    $("div#AutoHornWindow").fadeIn(2E3)
}
function cleanupLink() {
    $("a[href*='apps.facebook.com/mousehunt/profile.php']").add("a[href*='apps.facebook.com/mousehunt/adversaries.php']").add("a[href*='apps.facebook.com/mousehunt/item.php']").add("a[href*='apps.facebook.com/mousehunt/inventory.php']").each(function () {
        var a = $(this).attr("href"),
            a = a.replace("apps.facebook.com/mousehunt/", "www.mousehuntgame.com/");
        $(this).attr("href", a)
    });
    $("a[href^='https://www.mousehuntgame.com']").each(function () {
        var a = $(this).attr("href"),
            a = a.replace("https://", "http://");
        $(this).attr("href", a)
    })
}
function saveParam(a, b) {
    "undefined" != typeof unsafeWindow.user.user_id && GM_setValue(unsafeWindow.user.user_id + ":" + a, b)
}
function loadParam(a, b) {
    return "undefined" == typeof unsafeWindow.user.user_id || "undefined" == typeof GM_getValue ? b : GM_getValue(unsafeWindow.user.user_id + ":" + a, b)
}
function updateAvailableTraps(a) {
    var b = {},
        c;
    for (c in a) a[c].is_hidden || (b[a[c].type] = {
        item_id: a[c].item_id,
        name: a[c].name,
        classification: a[c].classification,
        quantity: a[c].quantity
    }, a[c].power_type_name && (b[a[c].type].power_type_name = a[c].power_type_name));
    availableTraps = b;
    saveParam("availableTraps", JSON.stringify(availableTraps))
}
function updateAvailableQuantity(a) {
    var b = {},
        c;
    for (c in a)!("bait" != a[c].classification && "trinket" != a[c].classification && "weapon" != a[c].classification && "base" != a[c].classification) && !a[c].is_hidden && (b[a[c].type] = {
        item_id: a[c].item_id,
        name: a[c].name,
        classification: a[c].classification,
        quantity: a[c].quantity
    }, a[c].power_type_name && (b[a[c].type].power_type_name = a[c].power_type_name));
    jQuery.extend(!0, availableTraps, b);
    saveParam("availableTraps", JSON.stringify(availableTraps))
}
function ajaxRequestAvailableTraps() {
    if (!0 != unsafeWindow.user.has_puzzle) {
        var a = new unsafeWindow.Ajax;
        a.requireLogin = !0;
        a.responseType = unsafeWindow.Ajax.JSON;
        a.post(unsafeWindow.callbackurl + "managers/ajax/users/gettrapcomponents.php", {
            uh: unsafeWindow.user.unique_hash
        })
    }
}
function loadInitialParameters() {
    "undefined" == typeof unsafeWindow.user ? setTimeout(function () {
        loadInitialParameters()
    }, 500) : (null == loadParam("trapConfig", null) ? saveParam("trapConfig", JSON.stringify(trapConfig)) : jQuery.extend(!0, trapConfig, jQuery.parseJSON(loadParam("trapConfig", null))),
    null == loadParam("availableTraps", null) ? ajaxRequestAvailableTraps() : jQuery.extend(!0, availableTraps, jQuery.parseJSON(loadParam("availableTraps", null))))
}
$(document).ready(function () {
    cleanupLink();
    1 > $("body").children().not("script").length ? setTimeout(function () {
        document.location = defaultpage
    }, 36E5) : 1 > $('a[href$="turn.php"]').length ? setTimeout(function () {
        document.location = defaultpage
    }, 18E4) : (loadInitialParameters(), setTimeout(function () {
        mulai()
    }, 1E3), 2 < $("div#header div.headsup div.hudstatlist").length && $("div#header div.headsup div.hudstatlist:last li:last").after('<li><span class="hudstatlabel">Charm:</span>&nbsp;<span id="hud_trinketName"><a href="http://www.mousehuntgame.com/inventory.php?tab=1">None&nbsp;</a></span><span id="hud_trinketQuantityLabel">(<span id="hud_trinketQuantity">0</span>)</span></li>'), $("div.hgSideBar").prepend('<div id="AutoHorn"><ul><li><a href="#conf">AutoHorn Setting</a></li><li>Horn Timer<span name="hornTime">00:00</span></li><li>Random Timer<span name="randomTime">00:00</span></li><li>Trap Check<span name="trapCheckTime">00:00</span></li></ul></div>'), $("div#AutoHorn").append('<br><ul id="seqConfig">Defined Trap Setup'), $("div#AutoHorn").append('<li><a href="#balack">Balack\'s Cove</a></li>'), $('div#AutoHorn a[href="#balack"]').click(function (a) {
        a.preventDefault();
        showBalackPage()
    }), $("div#AutoHorn").append('<li><a href="#zugzwang">Seasonal Garden - Zugzwang</a></li>'), $('div#AutoHorn a[href="#zugzwang"]').click(function (a) {
        a.preventDefault();
        showZugzwangPage()
    }), $("div#AutoHorn").append('<li><a href="#iceberg">Slushy - Iceberg</a></li>'), $('div#AutoHorn a[href="#iceberg"]').click(function (a) {
        a.preventDefault();
        showIcebergPage()
    }), $("div#AutoHorn").append('<li><a href="#FieryWarpath">Fiery Warpath</a></li>'), $('div#AutoHorn a[href="#FieryWarpath"]').click(function (a) {
        a.preventDefault();
        showFieryWarpathPage()
    }), $("div#AutoHorn").append("</ul><br>"), $("div#hgAppContainer").append('<div id="AutoHornWindow"><div name="top"></div><div name="main"></div><div name="bottom" style="position:absolute;bottom:10px;right:10px;"><a href="#save">Save</a> | <a href="#default">Restore Default</a> | <a href="#close">Close</a></div></div>'), $("div#hgAppContainer").append('<div id="AutoHornMask"></div>'), $("div#AutoHornWindow").css({
        "background-color": "#ffffff",
        position: "fixed",
        width: "600px",
        height: "400px",
        display: "none",
        "z-index": "9999",
        padding: "20px"
    }), $("div#AutoHornMask").css({
        "background-color": "#000",
        position: "fixed",
        display: "none",
        "z-index": "9998",
        padding: "0px"
    }), $(window).resize(function () {
        var a = $(window).height(),
            b = $(window).width();
        $("div#AutoHornWindow").css({
            top: (a - $("div#AutoHornWindow").height()) / 2,
            left: (b - $("div#AutoHornWindow").width()) / 2
        });
        $("div#AutoHornMask").css({
            top: "0",
            left: "0",
            width: b,
            height: a
        })
    }), $('div#AutoHornWindow div[name="top"]').css({
        "font-weight": "bold",
        "font-size": "18",
        "text-align": "center",
        "padding-bottom": "10px"
    }), $("div#AutoHorn").css({
        "padding-bottom": "20px",
        "margin-bottom": "20px",
        "border-bottom": "2px solid black"
    }), $("div#AutoHorn br").css({
        clear: "right"
    }), $("div#AutoHorn li span").css({
        "float": "right"
    }), $('div#AutoHorn a[href="#conf"]').click(function (a) {
        a.preventDefault();
        showConfigPage()
    }), $('div#AutoHornWindow a[href="#close"]').click(function (a) {
        a.preventDefault();
        $("div#AutoHornWindow").hide();
        $("div#AutoHornMask").hide()
    }), unsafeWindow.$(document).ajaxSuccess(function (a, b) {
        var c = jQuery.parseJSON(b.responseText);
        c.components ? setTimeout(function () {
            updateAvailableTraps(c.components)
        }, 1) : c.inventory && setTimeout(function () {
            updateAvailableQuantity(c.inventory)
        }, 1);
        c.user.user_id && setTimeout(function () {
            mulai()
        }, 1E3)
    }), calculateRandomPage(), tulisWaktu())
});