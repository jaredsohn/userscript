// ==UserScript==
// @name        Mechwarrior Online Extra Profile Stats
// @namespace   mwomercs.com
// @grant       none
// @description Adds additional stats to the MWO profile stat pages.
// @include     http://mwomercs.com/profile/stats*
// @include     https://mwomercs.com/profile/stats*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @require     https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @require     https://raw.github.com/claviska/jquery-miniColors/master/jquery.minicolors.js
// @require     https://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js
// @version     2.1.17
// ==/UserScript==

(function() {
    // add some extra style sheets
    $('<link rel="stylesheet" href="https://rawgithub.com/claviska/jquery-miniColors/master/jquery.minicolors.css" type="text/css" />').appendTo("head");
    $('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" type="text/css" />').appendTo("head");

    var damage_values = {
        "AC/10": 10,
        "AC/2": 2,
        "AC/20": 20,
        "AC/5": 5,
        "ANTI-MISSILE SYSTEM": 0,
        "ER LARGE LASER": 9,
        "ER PPC": 10,
        "FLAMER": 0.7,
        "GAUSS RIFLE": 15,
        "LARGE LASER": 9,
        "LB 10-X AC": 10,
        "LRG PULSE LASER": 10.6,
        "LRM 10": 1.1,
        "LRM 15": 1.1,
        "LRM 20": 1.1,
        "LRM 5": 1.1,
        "MACHINE GUN": 0.1,
        "MED PULSE LASER": 6,
        "MEDIUM LASER": 5,
        "NARC": 0,
        "PPC": 10,
        "SMALL LASER": 3,
        "SML PULSE LASER": 3.4,
        "SRM 2": 2,
        "SRM 4": 2,
        "SRM 6": 2,
        "STREAK SRM 2": 2.5,
        "TAG": 0,
        "ULTRA AC/5": 5
    };

    var mech_info = {
        ATLAS: { weight: 100 },
        AWESOME: { weight: 80 },
        BANSHEE: { weight: 95 },
        BATTLEMASTER: { weight: 85 },
        BLACKJACK: { weight: 45 },
        "THE BOAR'S HEAD": { weight: 100 },
        CATAPHRACT : { weight: 70 },
        CATAPULT: { weight: 65 },
        CENTURION: { weight: 50 },
        COMMANDO: { weight: 25 },
        CICADA: { weight: 40 },
        "THE DEATH'S KNELL": { weight: 25 },
        DRAGON: { weight: 60 },
        "DRAGON SLAYER": { weight: 80 },
        "EMBER": { weight: 35 },
        "FANG": { weight: 60 },
        "FIREBRAND": { weight: 65 },
        FIRESTARTER: { weight: 35 },
        "FLAME": { weight: 60 },
        "GOLDEN BOY": { weight: 55 },
        "GRID IRON": { weight: 50 },
        "GRID IRON LIMITED EDITION": { weight: 50 },
        GRIFFIN: { weight: 55 },
        "HEAVY METAL": { weight: 90 },
        HIGHLANDER: { weight: 90 },
        "HUGINN": { weight: 35 },
        HUNCHBACK: { weight: 50 },
        "ILYA MUROMETS": { weight: 70 },
        JAGERMECH: { weight: 65 },
        JENNER: { weight: 35 },
        "JESTER": { weight: 65 },
        KINTARO: { weight: 55 },
        "LA MALINCHE": { weight: 95 },
        LOCUST: { weight: 20 },
        "MISERY": { weight: 90 },
        ORION: { weight: 75 },
        "OXIDE": { weight: 35 },
        "PRETTY BABY": { weight: 80 },
        "PROTECTOR": { weight: 75 },
        QUICKDRAW: { weight: 60 },
        RAVEN: { weight: 35 },
        "SHADOW HAWK": { weight: 55 },
        SPIDER: { weight: 30 },
        STALKER: { weight: 90 },
        THUNDERBOLT: { weight: 65 },
        TREBUCHET: { weight: 50 },
        VICTOR: { weight: 80 },
        WOLVERINE: { weight: 55 },
        "THE X-5": { weight: 30 },
        "YEN-LO-WANG": { weight: 50 }
    }

    var config = {
        colors: {
            green: "#00FF00",
            red: "#FF0000"
        },
        levels: {
            accuracy: {
                green: 75,
                red: 50
            },
            efficiency: {
                green: 0.85,
                red: 0.50
            },
            kill_death: {
                green: 1.30,
                red: 0.90
            },
            survival_rate: {
                green: 70,
                red: 50
            },
            win_loss: {
                green: 1.25,
                red: 0.85
            }
        }
    };

    $.cookie.json = true;
    $.extend(true, config, $.cookie('mwo_stats_config'));

    var table = $(".table-striped");
    table.attr("id", "stats_table");
    var tbody = table.find("tbody");
    var rows =  tbody.find("tr");
    var thead = table.find("thead");
    var stats_header = thead.find("tr");
    var stats_header_first_child_text = stats_header.find("th:first-child").text();
    var new_row;
    var totals;
    var column_defs;
    var total_win_loss_ratio;

    if ( stats_header_first_child_text === "Weapon" ) {
    
        $("<th />").text("Actual Dmg/Hit").appendTo(stats_header);
        $("<th />").text("Listed Dmg/Hit").appendTo(stats_header);
        $("<th />").text("Max Damage").appendTo(stats_header);
        $("<th />").text("Efficiency").appendTo(stats_header);

        totals = {
            fired: 0,
            hit: 0,
            dmg: 0,
            max_dmg: 0
        };

        rows.each(function(i,e) {
            var el = $(e);
            var fired = el.find("td:nth-child(3)").text().replace(/,/g, '');
            totals.fired += parseInt(fired, 10);
            var hit = el.find("td:nth-child(4)").text().replace(/,/g, '');
            totals.hit += parseInt(hit, 10);
            var weapon_field = el.find("td:first-child")
            var weapon_dmg = damage_values[weapon_field.text()];
            if ( weapon_field.text() === 'ANTI-MISSILE SYSTEM' ) {
                weapon_field.text('AMS');
            }
            var total_dmg = el.find("td:last-child").text().replace(/,/g, '');
            totals.dmg += parseInt(total_dmg, 10);
            var dmg_per_hit = (hit > 0 && total_dmg > 0) ? Math.round(total_dmg / hit * 100) / 100 : '';
            var max_dmg = (hit > 0 && weapon_dmg > 0) ? Math.round(hit * weapon_dmg) : '';
            totals.max_dmg += max_dmg ? max_dmg : 0;
            var efficiency = (total_dmg > 0 && max_dmg > 0) ? total_dmg / max_dmg : '';
            efficiency = efficiency ? Math.round(efficiency * 100) / 100 : '';
            var accuracy_cell = el.find("td:nth-child(5)");
            var accuracy = accuracy_cell.text().replace(/%/, '');
            el.find("td:nth-child(5)").css("color", (accuracy >= config.levels.accuracy.green ? config.colors.green : accuracy <= config.levels.accuracy.red ? config.colors.red : ''));
            var time_equipped_cell = el.find("td:nth-child(6)");
            var time_equipped = time_equipped_cell.text();
            time_equipped_cell.text(normalize_time(time_equipped));
            $("<td />").text(dmg_per_hit).appendTo(e);
            $("<td />").text(weapon_dmg).appendTo(e);
            $("<td />").text(commify(max_dmg)).appendTo(e);
            $("<td />").text(efficiency).css("color", (efficiency >= config.levels.efficiency.green ? config.colors.green : efficiency <= config.levels.efficiency.red ? config.colors.red : '')).appendTo(e);
        });

        new_row = $("<tr />");

        $("<td />").text("TOTALS").appendTo(new_row);
        $("<td />").text('').appendTo(new_row);
        $("<td />").text(commify(totals.fired)).appendTo(new_row);
        $("<td />").text(commify(totals.hit)).appendTo(new_row);
        var total_accuracy = (Math.round(totals.hit / totals.fired * 10000) / 100);
        $("<td />").text(total_accuracy + '%').css("color", (total_accuracy >= config.levels.accuracy.green ? config.colors.green : total_accuracy <= config.levels.accuracy.red ? config.colors.red : '')).appendTo(new_row);
        $("<td />").text('').appendTo(new_row);
        $("<td />").text(commify(totals.dmg)).appendTo(new_row);
        $("<td />").text('').appendTo(new_row);
        $("<td />").text('').appendTo(new_row);
        $("<td />").text(commify(Math.round(totals.max_dmg))).appendTo(new_row);
        var total_efficiency = (totals.dmg > 0 && totals.max_dmg > 0) ? totals.dmg / totals.max_dmg : '';
        total_efficiency = total_efficiency ? Math.round(total_efficiency * 100) / 100 : '';
        $("<td />").text(total_efficiency).appendTo(new_row);
        column_defs = [
            { "sType": "percent", "aTargets": [ 4 ] },
            { "sType": "formatted-num", "aTargets": [ 1, 2, 3, 5, 6, 9 ] }
        ];
    }
    else if ( stats_header_first_child_text === "Mech'" ) {
        // lower the font-size on the table so we can fit extra information in better
        table.css('font-size', '10px');

        // change some of the header row titles to save some space
        stats_header.find("th:nth-child(2)").attr("title", "Matches Played").html("#<br />Played");
        stats_header.find("th:nth-child(5)").attr("title", "Win/Loss Ratio").text("WLR");
        stats_header.find("th:nth-child(8)").attr("title", "Kill/Death Ratio").text("KDR");
        stats_header.find("th:nth-child(9)").attr("title", "Damage Done").html("Dmg<br />Done");

        $("<th />").attr("title", "Win/Loss +/-").text("+/-").insertAfter(stats_header.find("th:nth-child(4)"));
        $("<th />").attr("title", "Kill/Death +/-").text("+/-").insertAfter(stats_header.find("th:nth-child(8)"));
        $("<th />").attr("title", "Survival Percentage").text("Survival").insertBefore(stats_header.find("th:nth-child(11)"));
        $("<th />").attr("title", "Damage Per Match").text("DPM").insertAfter(stats_header.find("th:nth-child(12)"));
        $("<th />").attr("title", "Damage Per Ton Per Match").text("DpTpM").insertAfter(stats_header.find("th:nth-child(13)"));
        $("<th />").attr("title", "XP Per Match").text("XPM").insertAfter(stats_header.find("th:nth-child(15)"));

        totals = {
            deaths: 0,
            dmg: 0,
            kills: 0,
            losses: 0,
            matches: 0,
            mechs: 0,
            time: '0:0:0',
            tonnage: 0,
            wins: 0,
            xp: 0

        };

        rows.each(function(i,e) {
            var el = $(e);
            var win_loss_ratio_cell = el.find("td:nth-child(5)");
            var kill_death_ratio_cell = el.find("td:nth-child(8)");
            var dmg_cell = el.find("td:nth-child(9)");
            var xp_cell = el.find("td:nth-child(10)");
            var mech = el.find("td:first-child").text();

            var tonnage = 0;
            if ( mech_info.hasOwnProperty(mech) ) {
                tonnage = mech_info[mech].weight;
            }
            else {
                mech = /^(.*)\s/.exec(mech)[1];
                if ( mech_info.hasOwnProperty(mech) ) {
                    tonnage = mech_info[mech].weight;
                }
            }
            totals.tonnage += tonnage;
            totals.mechs += 1 ;

            var dmg = dmg_cell.text().replace(/,/g, '');
            dmg = dmg ? parseInt(dmg, 10) : 0;
            totals.dmg += dmg;

            var matches = el.find("td:nth-child(2)").text().replace(/,/g, '');
            matches = matches ? parseInt(matches, 10) : 0;
            totals.matches += matches;

            var wins = el.find("td:nth-child(3)").text().replace(/,/g, '');
            wins = wins ? parseInt(wins, 10) : 0;
            totals.wins += wins;

            var losses = el.find("td:nth-child(4)").text().replace(/,/g, '');
            losses = losses ? parseInt(losses, 10) : 0;
            totals.losses += losses;

            var kills = el.find("td:nth-child(6)").text().replace(/,/g, '');
            kills = kills ? parseInt(kills, 10) : 0;
            totals.kills += kills;

            var deaths = el.find("td:nth-child(7)").text().replace(/,/g, '');
            deaths = deaths ? parseInt(deaths, 10) : 0;
            totals.deaths += deaths;

            var xp = el.find("td:nth-child(10)").text().replace(/,/g, '');
            xp = xp ? parseInt(xp, 10) : 0
            totals.xp += xp;

            var time_cell = el.find("td:nth-child(11)");
            time_cell.text(normalize_time(time_cell.text()));
            var time = time_cell.text();
            if ( typeof(time) !== 'undefined' ) {
                totals.time = add_time(totals.time, time);
            }

            var win_loss_plus_minus = wins - losses;
            $("<td />").text((win_loss_plus_minus > 0 ? "+" : "") +  win_loss_plus_minus).css("color", (win_loss_plus_minus > 0 ? config.colors.green : win_loss_plus_minus < 0 ? config.colors.red : '')).insertBefore(win_loss_ratio_cell);
            
            var kill_death_plus_minus = kills - deaths;
            $("<td />").text((kill_death_plus_minus > 0 ? "+" : "") + kill_death_plus_minus).css("color", (kill_death_plus_minus > 0 ? config.colors.green : kill_death_plus_minus < 0 ? config.colors.red : '')).insertBefore(kill_death_ratio_cell);

            win_loss_ratio_cell.css("color", (win_loss_ratio_cell.text() >= config.levels.win_loss.green ? config.colors.green : win_loss_ratio_cell.text() <= config.levels.win_loss.red ? config.colors.red : ''));
            kill_death_ratio_cell.css("color", (kill_death_ratio_cell.text() >= config.levels.kill_death.green ? config.colors.green : kill_death_ratio_cell.text() <= config.levels.kill_death.red ? config.colors.red : ''));

            var survival_rate = Math.round( ( matches - deaths ) / matches * 100 );
            $("<td />").text(survival_rate + "%").css("color", (survival_rate >= config.levels.survival_rate.green ? config.colors.green : survival_rate <= config.levels.survival_rate.red ? config.colors.red : '')).insertBefore(dmg_cell);
            
            var dmg_per_match = (dmg && matches) ? Math.round(dmg / matches) : '';
            var dpm_cell = $("<td />").text(commify(dmg_per_match));
            dpm_cell.insertAfter(dmg_cell)

            var dmg_per_ton_per_match = ( dmg_per_match && mech && tonnage ) ? Math.round(dmg_per_match/tonnage*100)/100 : 0;
            $("<td />").text(dmg_per_ton_per_match).insertAfter(dpm_cell);

            var xp_per_match = (xp && matches) ? Math.round(xp / matches) : '';
            $("<td />").text(commify(xp_per_match)).insertAfter(xp_cell);
        });

        new_row = $("<tr />");

        $("<td />").text("TOTALS").appendTo(new_row);
        $("<td />").text(totals.matches).appendTo(new_row);
        $("<td />").text(totals.wins).appendTo(new_row);
        $("<td />").text(totals.losses).appendTo(new_row);
        var total_win_loss_ratio = Math.round(totals.wins/totals.losses*100)/100;
        var win_loss_ratio_cell = $("<td />").text(total_win_loss_ratio).css("color", (total_win_loss_ratio >= config.levels.win_loss.green ? config.colors.green : total_win_loss_ratio <= config.levels.win_loss.red ? config.colors.red : '')).appendTo(new_row);
        var total_win_loss_plus_minus = totals.wins - totals.losses;
        $("<td />").text((total_win_loss_plus_minus > 0 ? "+" : "") + total_win_loss_plus_minus).css("color", (total_win_loss_plus_minus > 0 ? config.colors.green : total_win_loss_plus_minus < 0 ? config.colors.red : '')).insertBefore(win_loss_ratio_cell);
        $("<td />").text(totals.kills).appendTo(new_row);
        $("<td />").text(totals.deaths).appendTo(new_row);
        var total_kill_death_ratio = Math.round(totals.kills/totals.deaths*100)/100;
        var kill_death_ratio_cell = $("<td />").text(total_kill_death_ratio).css("color", (total_kill_death_ratio >= config.levels.kill_death.green ? config.colors.green : total_kill_death_ratio <= config.levels.kill_death.red ? config.colors.red : '')).appendTo(new_row);
        var total_kill_death_plus_minus = totals.kills - totals.deaths;
        $("<td />").text((total_kill_death_plus_minus > 0 ? "+" : "") + total_kill_death_plus_minus).css("color", (total_kill_death_plus_minus > 0 ? config.colors.green : total_kill_death_plus_minus < 0 ? config.colors.red : '')).insertBefore(kill_death_ratio_cell);
        var total_survival_rate = Math.round( ( totals.matches - totals.deaths ) / totals.matches * 10000 ) / 100;
        $("<td />").text(commify(total_survival_rate + "%")).css("color", (total_survival_rate >= config.levels.survival_rate.green ? config.colors.green : total_survival_rate <= config.levels.survival_rate.red ? config.colors.red : '')).appendTo(new_row);
        $("<td />").text(commify(totals.dmg)).appendTo(new_row);
        $("<td />").text(commify(Math.round(totals.dmg/totals.matches))).appendTo(new_row);
        $("<td />").text(commify(Math.round(totals.dmg/totals.matches/(totals.tonnage/totals.mechs)*100)/100)).appendTo(new_row)
        $("<td />").text(commify(totals.xp)).appendTo(new_row);
        $("<td />").text(commify(Math.round(totals.xp/totals.matches))).appendTo(new_row);

        var total_time_parts = totals.time.split(':');
        total_time_parts = $.map(total_time_parts, function(val) {
            return pad(val, 2);
        });
        totals.time = total_time_parts.join(':');

        $("<td />").text(totals.time).appendTo(new_row);

        column_defs = [
            { "sType": "formatted-num", "aTargets": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ] }
        ];
    }
    else if ( stats_header_first_child_text === "Mode Name" ) {
        $("<th />").text("XP/Match").insertAfter(stats_header.find("th:nth-child(6)"));
        $("<th />").text("CB/Match").appendTo(stats_header);

        totals = {
            matches: 0,
            wins: 0,
            losses: 0,
            xp: 0,
            cbills: 0
        };

        rows.each(function(i,e) {
            var el = $(e);
            var win_loss_ratio_cell = el.find("td:nth-child(5)");
            var xp_cell = el.find("td:nth-child(6)");

            var matches = el.find("td:nth-child(2)").text().replace(/,/g, '');
            totals.matches += matches ? parseInt(matches, 10) : 0;

            var wins = el.find("td:nth-child(3)").text().replace(/,/g, '');
            totals.wins += wins ? parseInt(wins, 10) : 0;

            var losses = el.find("td:nth-child(4)").text().replace(/,/g, '');
            totals.losses += losses ? parseInt(losses, 10) : 0;

            var xp = el.find("td:nth-child(6)").text().replace(/,/g, '');
            totals.xp += xp ? parseInt(xp, 10) : 0;

            var cb_cell = el.find("td:nth-child(7)");
            var cbills = cb_cell.text().replace(/,/g, '');
            totals.cbills += cbills ? parseInt(cbills, 10) : 0;

            win_loss_ratio_cell.css("color", (win_loss_ratio_cell.text() >= config.levels.win_loss.green ? config.colors.green : win_loss_ratio_cell.text() <= config.levels.win_loss.red ? config.colors.red : ''));

            var xp_per_match = (xp && matches) ? Math.round(xp / matches) : '';
            $("<td />").text(commify(xp_per_match)).insertAfter(xp_cell);
            $("<td />").text(commify(Math.round(cbills/matches))).insertAfter(cb_cell);
            
        });

        new_row = $("<tr />");

        $("<td />").text("TOTALS").appendTo(new_row);
        $("<td />").text(totals.matches).appendTo(new_row);
        $("<td />").text(totals.wins).appendTo(new_row);
        $("<td />").text(totals.losses).appendTo(new_row);
        total_win_loss_ratio = Math.round(totals.wins/totals.losses*100)/100;
        $("<td />").text(total_win_loss_ratio).css("color", (total_win_loss_ratio >= config.levels.win_loss.green ? config.colors.green : total_win_loss_ratio <= config.levels.win_loss.red ? config.colors.red : '')).appendTo(new_row);
        $("<td />").text(commify(totals.xp)).appendTo(new_row);
        $("<td />").text(commify(Math.round(totals.xp/totals.matches))).appendTo(new_row);
        $("<td />").text(commify(totals.cbills)).appendTo(new_row);
        $("<td />").text(commify(Math.round(totals.cbills/totals.matches))).appendTo(new_row);
        column_defs = [
            { "sType": "formatted-num", "aTargets": [ 1, 2, 3, 5, 6, 7, 8 ] }
        ];
    }
    else if ( stats_header_first_child_text === "Map Name" ) {
        $("<th />").text("Avg Time/Match").insertAfter(stats_header.find("th:nth-child(6)"));

        totals = {
            matches: 0,
            wins: 0,
            losses: 0,
            cbills: 0,
            time: '0:0:0'
        };

        rows.each(function(i,e) {
            var el = $(e);
            var win_loss_ratio_cell = el.find("td:nth-child(5)");

            var matches = el.find("td:nth-child(2)").text().replace(/,/g, '');
            totals.matches += matches ? parseInt(matches, 10) : 0;

            var wins = el.find("td:nth-child(3)").text().replace(/,/g, '');
            totals.wins += wins ? parseInt(wins, 10) : 0;

            var losses = el.find("td:nth-child(4)").text().replace(/,/g, '');
            totals.losses += losses ? parseInt(losses, 10) : 0;

            var time_cell = el.find("td:nth-child(6)");
            var time = normalize_time(time_cell.text());
            if ( typeof(time) !== 'undefined' ) {
                totals.time = add_time(totals.time, time);
            }

            win_loss_ratio_cell.css("color", (win_loss_ratio_cell.text() >= config.levels.win_loss.green ? config.colors.green : win_loss_ratio_cell.text() <= config.levels.win_loss.red ? config.colors.red : ''));
            $("<td />").text(fn_average_time(time, matches)).insertAfter(el.find("td:nth-child(6)"));
            
        });

        new_row = $("<tr />");

        $("<td />").text("TOTALS").appendTo(new_row);
        $("<td />").text(totals.matches).appendTo(new_row);
        $("<td />").text(totals.wins).appendTo(new_row);
        $("<td />").text(totals.losses).appendTo(new_row);
        total_win_loss_ratio = Math.round(totals.wins/totals.losses*100)/100;
        $("<td />").text(total_win_loss_ratio).css("color", (total_win_loss_ratio >= config.levels.win_loss.green ? config.colors.green : total_win_loss_ratio <= config.levels.win_loss.red ? config.colors.red : '')).appendTo(new_row);
        $("<td />").text(totals.time).appendTo(new_row);
        $("<td />").text(fn_average_time(totals.time, totals.matches)).appendTo(new_row);
        column_defs = [
            { "sType": "formatted-num", "aTargets": [ 1, 2, 3, 5, 6 ] }
        ];
    }

    if ( new_row ) {
        var tfoot = $("<tfoot />");
        new_row.appendTo(tfoot);
        tfoot.insertAfter(thead);
    }

    $('<style type="text/css"> \
        .sorting_hover{ background-color: #EEEEEE; color: #211F15; } \
        .sorting_asc { background-color: #EEEEEE; color: #211F15; } \
        .sorting_desc { background-color: #EEEEEE; color: #211F15; } \
        #mwo_stats_config_form input { width: 80px; margin-right: 5px; } \
        #mwo_stats_config_form td { padding: 0 5px 5px; } \
    </style>').appendTo("head");
    
    /* DataTable Setup */

    // adds hover events to the header cells
    thead.find("th").css({
        "cursor": "pointer"
    }).hover(
        function() {
            $(this).addClass("sorting_hover");
        },
        function() {
            $(this).removeClass("sorting_hover");
        }
    );

    $.extend( $.fn.dataTableExt.oSort, {
        "percent-pre": function ( a ) {
            var x = (a === "-") ? 0 : a.replace( /%/, "" );
            return parseFloat( x );
        },
     
        "percent-asc": function ( a, b ) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },
     
        "percent-desc": function ( a, b ) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    } );

    $.extend( $.fn.dataTableExt.oSort, {
        "formatted-num-pre": function ( a ) {
            a = (a === "-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
            return parseFloat( a );
        },
     
        "formatted-num-asc": function ( a, b ) {
            return a - b;
        },
     
        "formatted-num-desc": function ( a, b ) {
            return b - a;
        }
    } );

    table.dataTable({
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": true,
        "bInfo": false,
        "aoColumnDefs": column_defs
    });

    // config button and dialog
    var stats_wrapper = $("#stats_table_wrapper");
    stats_wrapper.css('position', 'relative');
    var dialog_el = $("<div />")
                    .attr('id', 'mwo_stats_config_dialog')
                    .attr('title', 'Statistics Settings')
                    .css('display', 'none')
                    .html(' \
                            <p>&nbsp;</p> \
                            <table id="mwo_stats_config_form" cellpadding="0" cellspacing="0" border="0"> \
                                <thead> \
                                    <tr> \
                                        <th>&nbsp;</th> \
                                        <th style="text-align: left; padding-left: 9px;">Positive</th> \
                                        <th style="text-align: left; padding-left: 9px;">Negative</th> \
                                    </tr> \
                                </thead> \
                                <tbody> \
                                    <tr> \
                                        <td>Accuracy</td> \
                                        <td><input id="levels_accuracy_green"></input></td> \
                                        <td><input id="levels_accuracy_red"></input></td> \
                                    </tr> \
                                    <tr> \
                                        <td>Efficiency</td> \
                                        <td><input id="levels_efficiency_green"></input></td> \
                                        <td><input id="levels_efficiency_red"></input></td> \
                                    </tr> \
                                    <tr> \
                                        <td>Kill/Death Ratio</td> \
                                        <td><input id="levels_kill_death_green"></input></td> \
                                        <td><input id="levels_kill_death_red"></input></td> \
                                    </tr> \
                                    <tr> \
                                        <td>Survival</td> \
                                        <td><input id="levels_survival_rate_green"></input></td> \
                                        <td><input id="levels_survival_rate_red"></input></td> \
                                    </tr> \
                                    <tr> \
                                        <td>Win/Loss Ratio</td> \
                                        <td><input id="levels_win_loss_green"></input></td> \
                                        <td><input id="levels_win_loss_red"></input></td> \
                                    </tr> \
                                    <tr> \
                                        <td>Colors</td> \
                                        <td><input id="colors_green" class="minicolors inline" /></td> \
                                        <td><input id="colors_red" class="minicolors" /></td> \
                                    </tr> \
                                </tbody> \
                            </table> \
                    ')
                    .insertAfter(table);

    $("#colors_green").minicolors({ defaultValue: '#00FF00', position: 'top left', letterCase: 'uppercase', inline: false, });
    $("#colors_red").minicolors({ defaultValue: '#FF0000', position: 'top left', letterCase: 'uppercase', inline: false, });
    $("<button />")
        .attr('id', 'config_button')
        .attr('name', 'config_button')
        .css({
            position: 'absolute',
            top: '-35px',
            right: '0px'
        })
        .html('&nbsp;')
        .appendTo(stats_wrapper);
    $( "#config_button")
        .button({
            icons: {
                primary: "ui-icon-gear"
            },
            text: false
        })
        .click(function() {
        $(dialog_el).dialog("open");
    });
    $(dialog_el).dialog({
        autoOpen: false,
        height: 350,
        width: 400,
        modal: true,
        buttons: {
            Save: function() {
                $(this).dialog("close");
                config.colors.green = $("#colors_green").val();
                config.colors.red = $("#colors_red").val();
                config.levels.accuracy.green = $("#levels_accuracy_green").val();
                config.levels.accuracy.red = $("#levels_accuracy_red").val();
                config.levels.efficiency.green = $("#levels_efficiency_green").val();
                config.levels.efficiency.red = $("#levels_efficiency_red").val();
                config.levels.kill_death.green = $("#levels_kill_death_green").val();
                config.levels.kill_death.red = $("#levels_kill_death_red").val();
                config.levels.survival_rate.green = $("#levels_survival_rate_green").val();
                config.levels.survival_rate.red = $("#levels_survival_rate_red").val();
                config.levels.win_loss.green = $("#levels_win_loss_green").val();
                config.levels.win_loss.red = $("#levels_win_loss_red").val();        
                $.cookie('mwo_stats_config', config);
                location.reload();
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        },
        open: function() {
            $("#colors_green").val(config.colors.green);
            $("#colors_red").val(config.colors.red);
            $("#levels_accuracy_green").val(config.levels.accuracy.green);
            $("#levels_accuracy_red").val(config.levels.accuracy.red);
            $("#levels_efficiency_green").val(config.levels.efficiency.green);
            $("#levels_efficiency_red").val(config.levels.efficiency.red);
            $("#levels_kill_death_green").val(config.levels.kill_death.green);
            $("#levels_kill_death_red").val(config.levels.kill_death.red);
            $("#levels_survival_rate_green").val(config.levels.survival_rate.green);
            $("#levels_survival_rate_red").val(config.levels.survival_rate.red);
            $("#levels_win_loss_green").val(config.levels.win_loss.green);
            $("#levels_win_loss_red").val(config.levels.win_loss.red);
            $("#colors_green").minicolors('value', config.colors.green);
            $("#colors_red").minicolors('value', config.colors.red);
        }
    });
    
    function commify(num) {
        // stringify number;
        num += '';
    
        var regx = /^(\d+)(\d{3})/;
    
        while ( regx.test(num) ) {
            num = num.replace(regx, '$1' + ',' + '$2');
        }
    
        return num;
    }

    function normalize_time (time) {
        var regex = /day/;
        if ( regex.test(time) ) {
            var time_parts = time.split(/\s*day[s]?\s*/);
            return add_time(time_parts[1], (24 * time_parts[0]) + ':00:00');
        }
        else {    
            return time;
        }
    }

    function add_time(total_time, new_time) {
        new_time = normalize_time(new_time);
        var total_time_parts = total_time.split(':');
        var new_time_parts = new_time.split(':');

        // make sure the time arrays have integers in them
        for ( var i = 0 ; i <= 2 ; i++ ) {
            total_time_parts[i] = parseInt(total_time_parts[i], 10);
            new_time_parts[i] = parseInt(new_time_parts[i], 10);
        }

        total_time_parts[0] += new_time_parts[0];
        total_time_parts[1] += new_time_parts[1];
        total_time_parts[2] += new_time_parts[2];

        if ( total_time_parts[2] > 0 && (total_time_parts[2] / 60) >= 1 ) {
            total_time_parts[1] += Math.floor(total_time_parts[2] / 60);
            total_time_parts[2] = total_time_parts[2] % 60;
        }

        if ( total_time_parts[1] > 0 && (total_time_parts[1] / 60) >= 1 ) {
            total_time_parts[0] += Math.floor(total_time_parts[1] / 60);
            total_time_parts[1] = total_time_parts[1] % 60;
        }

        total_time_parts = $.map(total_time_parts, function(val) {
            return pad(val, 2);        
        });
        total_time = total_time_parts.join(':');
        return total_time;
    }

    function pad(num, size) {
        // stringify number
        num += '';
        while (num.length < size) {
            num = "0" + num;
        }
        return num;
    }

    function fn_average_time(time, num) {
        var time_parts = time.split(':');
        var total_time = parseInt(time_parts[0], 10) * 60 * 60 + parseInt(time_parts[1], 10) * 60 + parseInt(time_parts[2], 10);
        var average_time = Math.floor(total_time / num);
        
        time_parts[0] = Math.floor(average_time / ( 60 * 60 ));
        time_parts[1] = Math.floor((average_time - time_parts[0] * 60 * 60) / 60 );
        time_parts[2] = Math.floor(average_time - (time_parts[0] * 60 * 60) - (time_parts[1] * 60));
        time_parts = $.map(time_parts, function(val) {
            return pad(val, 2);        
        });

        total_time = time_parts.join(':');
        return total_time;
    }

})();
