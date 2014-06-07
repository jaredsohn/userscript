// ==UserScript==
// @name butsa.ru enhancer
// @namespace http://butsa.ru
// @include http://*.butsa.ru/*
// @include http://butsa.ru/*
// @include http://*.champions.ru/*
// @include http://champions.ru/*
// ==/UserScript==

Player = function() {
    this.id = -1;
    this.number = -1;
    this.name = null;
    this.country = null;
    this.primaryPosition = null;
    this.secondaryPosition = null;
    this.age = -1;
    this.morale = -1;
    this.bonuses = null;
    this.bonusPoints = -1;
    this.nextBonusPoints = -1;
    this.talent = -1;
    this.expLevel = -1;
    this.expPoints = -1;
    this.nextLevelExpPoints = -1;
    this.salary = -1;
    this.cost = -1;
    this.salary_txt = -1;
    this.cost_txt = -1;
    this.power = -1;
    
    this.tckl = -1;
    this.mrk = -1;
    this.drbl = -1;
    this.brcv = -1;
    this.edrnc = -1;
    this.pass = -1;
    this.shotPwr = -1;
    this.shotAcc = -1;
};

var beScript = {
    debug : true,

    news : {
        version : "0.1.4",
        text : "<span>Кратенько о том, что происходит со скриптом.<br/><br/>Как многие могли уже заметить, обновления стали происзодить намного реже - если в первую неделю существования скрипта он обновлялся ежедневно (а иногда и по несколько раз на дню), то сейчас обновления выходят раз в два-три дня. На самом деле, это хорошая новость. Это означает, что мелкие дополнения и баги исправлены и сейчас добавляется что-то более-менее существенное, что требует несколько больше времени, чем просто поправить две строчки. Это первое.<br /><br />Второе. Хотелось бы обратить внимание на то, что теперь существует <a href='http://bescript.reformal.ru/'>форма обратной связи</a>. Если Вы придумали что-то новое, что позволит улучшить скрипт - не стесняйтесь, пишите туда. Там же можно обсуждать и голосовать за чужие идеи - все это крайне приветствуется и ценится Вашим покорным слугой ;).<br /><br />Если же Вы обнаружили ошибку, большая просьба, добавить ее <a href='http://code.google.com/p/butsaenhancer/issues/list'>сюда</a>. Прошу обратить особое внимание на эти две ссылки (они, кстати, продублированы в <a href='http://forum.butsa.ru/index.php?showtopic=233323'>официальном топике скрипта</a> на форуме бутсы). Дело в том, что очень трудно на форуме отследить и запомнить все идеи/ошибки, а на этих сайтах все всегда будет на месте и ничего не потеряется. Спасибо!</span>"
    },
    
	VERSION : "0.2.2",
    NAMESPACE : "butsa_enhancer",
    UPDATES_CHECK_FREQ : 15, //minutes
    TEAM_UPDATES_CHECK_FREQ : 60 * 24, // minutes; recommended value is 60 * 24 = 1440 = 1 day.
    TRAIN_UPDATES_CHECK_FREQ : 60 * 24, // minutes; recommended value is 60 * 24 = 1440 = 1 day.
    BUILDINGS_UPDATES_CHECK_FREQ : 60 * 24, // minutes; recommended value is 60 * 24 = 1440 = 1 day.
    S_ID : 101727,
    default_settings : {
        menu_helper_shown : false,
        // Sorts
        sorts_roster : true,
        sorts_school : true,
        sorts_tournament_table : true,
        sorts_club_table : true,
        
        // Roster
        helpers_profile : true,
        helpers_bonuses : true,
        helpers_fast_repair : true,
        helpers_repair_reminder : true,
        helpers_prices_link : true,
        links_in_roster : true,
        
        // Profile
        player_profile_extender : true,

        // Other
        kp_helper : true,
        last_matches_in_organizer : true,
        finance_report_sum_column : true,
        update_teams_menu : true,

        stayWithin1stVersion : false,
        
        playerProfile : {
            train_regime_radio : 1,
            exp_gain_radio : 2700,
            number_of_trains_train_num : -1,
            number_of_trains_max_age: 30,
            number_of_trains_max_season : 30,
            skills_tckl : 20.00,
            skills_mrk : 20.00,
            skills_drbl : 20.00,
            skills_brcv : 20.00,
            skills_edrnc : 20.00,
            skills_pass : 20.00,
            skills_shotPwr : 20.00,
            skills_shotAcc : 20.00,
            skills_all : 20.00,
        },
    },
    expPointsPerMinute : {
        "Чемпионат страны" : 1,
        "Кубок страны" : 1.25,
        "Кубок Банка" : 1.25,
        "Товарищеские матчи" :  0.4,
        "Кубок Восьми" : 1.3,
        "Чемпионат Мира" : 2.5,
        "Континентальный Суперкубок" : 2,
        "Лига Чемпионов" : 1.5,
        "Кубок Лиги" : 1.5,
        "Клубный Кубок" : 1.25,
        "Суперкубок" : 1.5,
        "Отборочные ЧМ" : 2,
        "Товарищеские матчи сборных" : 0.8,
        "Отборочные Континентов" : 2,
        "Чемпионат Континента" : 2.5,
        "Коммерческие турниры" : 0.5,
    },
    settings : null,
    updateSetting : function( name, value ) {
        beScript.log( "Updating settings: old value = " + eval("beScript.settings." + name ) + " new vaule = " + value );
        
        if ( beScript.settings[name] != value ) {
            eval("beScript.settings." + name + " = " + value );
            beScript.Util.serialize( "settings", beScript.settings );
        }
    },
    menuElem : null,
    __teams : null,
    __teamsArchive : null,
    userId : -1,
    activeTeamId : -1,
    trainNumber : -1,
    playingDay : -1,
    season : -1,
    hrefAction : "",
	log : function(msg) {
        if ( beScript.debug ) {
            GM_log( msg )
        }
	},
    positions : {
        "Gk" : 1,
        "Sw" : 2,
        "Ld" : 3,
        "Cd" : 4,
        "Rd" : 5,
        "Lwd": 6,
        "Dm" : 7,
        "Rwd": 8,
        "Lm" : 9,
        "Cm" : 10,
        "Rm" : 11,
        "Lw" : 12,
        "Am" : 13,
        "Rw" : 14,
        "Lf" : 15,
        "Cf" : 16,
        "Rf" : 17
    },
    playerTrainOrder : null,
    skillsArr : ["tckl","mrk","drbl","brcv","edrnc","pass","shotPwr","shotAcc"],
    skills : {
        tckl : "Отбор",
        mrk : "Опека",
        drbl : "Дриблинг",
        brcv : "Прием мяча",
        edrnc : "Выносливость",
        pass : "Пас",
        shotPwr : "Сила удара",
        shotAcc : "Точность удара",
    },
    bonuses : {
        1 : {name: "Скорость", abbr: "Ск"},
        2 : {name: "Атлетизм", abbr: "Ат"},
        3 : {name: "Технарь", abbr: "Тх"},
        4 : {name: "Плеймейкер", abbr: "Пл"},
//      5 : {name: "", abbr: ""},
        6 : {name: "Перехват", abbr: "Пр"},
        7 : {name: "Подкат", abbr: "Пд"},
        8 : {name: "Навесы", abbr: "Нв"},
        9 : {name: "Игра головой", abbr: "Гл"},
        10 : {name: "Пенальти", abbr: "Пн", gk: true},
//      11 : {name: "", abbr: ""},
        12 : {name: "Штрафные", abbr: "Шт", gk: true},
        13 : {name: "Угловые", abbr: "Уг", gk: true},
        14 : {name: "Ауты", abbr: "Ау"},
//      15 : {name: "", abbr: ""},
        16 : {name: "Лидер", abbr: "Лд", gk: true},
        17 : {name: "Универсал", abbr: "Ун"},
        18 : {name: "Один на один", abbr: "Од", gk: true, fpl: false},
        19 : {name: "От ворот", abbr: "Ов", gk: true, fpl: false},
        
        nextBonus : function( numberOfBonuses ) {
            if (numberOfBonuses < 3) {
                return 7;
            }
            var curr = 7;
            var prev = 7;
            for ( var i = 0; i < numberOfBonuses - 2; i++ ) {
                var prev1 = curr;
                curr += prev;
                prev = prev1;
            }
            
            return curr;
        },
        createBonusStr : function( bonuses ) {
            var result = "";
            for ( var i in bonuses ) {
                if ( i == 'str' ) continue;
                result += i;
                
                if ( bonuses[i] > 1 ) {
                    result += bonuses[i];
                }
                
                result += " ";
            }
            beScript.log( result );
            return result.trim();
        },
    },
    bonusesByAbbr : null,
    
    trainPlayerWithConditions : function(player) {
        var isGk = (player.primaryPosition == "Gk");
        var numberOfTrains = 126 - beScript.trainNumber;
        var season = beScript.season;
        
        var n = 0;
        var i,
        j,
        min;
        var Add;
        var factGift,
        oldSkl,
        ExpLim;
        
        var maxAge = parseInt(beScript.settings.playerProfile.number_of_trains_max_age, 10);
        var maxSeasonNumber = parseInt(beScript.settings.playerProfile.number_of_trains_max_season, 10);
        var maxNumberOfTrains = parseInt(beScript.settings.playerProfile.number_of_trains_train_num, 10);
        var sklls = beScript.playerTrainOrder || beScript.skillsArr;
        beScript.log( sklls );

        while (player.age < maxAge && (n < maxNumberOfTrains || maxNumberOfTrains == -1) && season < maxSeasonNumber) {
            if (isGk) {
                min = 0;
                for (j = 0; 7 >= j; j++) min += beScript.settings.playerProfile["skills_" + sklls[j]];
                i = player[sklls[0]] > min ? -1: 0;
            } else {
                switch (beScript.settings.playerProfile.train_regime_radio) {
                    case 1:
                        {
                            i = -1;
                            min = 100;
                            for (j = 0; 7 >= j; j++) {
                                if (min > player[sklls[j]] && beScript.settings.playerProfile["skills_" + sklls[j]] > player[sklls[j]]) {
                                    i = j;
                                    min = player[sklls[j]];
                                }
                            }
                        }
                        break;
                    case 2:
                        {
                            i = -1;
                            min = 100;
                            for (j = 0; 7 >= j; j++) if (beScript.settings.playerProfile["skills_" + sklls[j]] > player[sklls[j]]) {
                                i = j;
                                min = player[sklls[j]];
                                break;
                            }
                        }
                        break;
                    case 3:
                        {
                            i = -1;
                            min = 100;
                            for (j = 0; 7 >= j; j++) if (min > (player[sklls[j]] / beScript.settings.playerProfile["skills_" + sklls[j]]) && beScript.settings.playerProfile["skills_" + sklls[j]] > player[sklls[j]]) {
                                i = j;
                                min = player[sklls[j]] / beScript.settings.playerProfile["skills_" + sklls[j]];
                            }
                        }
                        break;
                };
            }

            if (i == -1) break;
            
            oldSkl = player.power;
            factGift = Math.min(player.talent + player.expLevel / 10, 16);
            
            Add = Math.max(Math.round(1000 * 100 * Math.pow(9 * 0.13 + Math.pow(factGift, 0.6) * 0.6, 2) / (19 + Math.pow(player[sklls[i]] / (isGk ? 7.7: 1), 2)) / 50 * (1 - (Math.pow(Math.abs(player.age - 22.5), 1.84)) * 0.013) * (1 - (Math.pow(player.power, 0.6)) * (0.019 - factGift * 0.001))) / 1000 - 0, 0 - 0);
            player.power += Add;
            player[sklls[i]] += Add;
            if (player.age >= (isGk ? 31: 30)) {
                player[sklls[Math.floor(Math.random() * 8)]] -= 0.015 * (player.age - (isGk ? 29: 28));
                player.power -= 0.015 * (player.age - (isGk ? 29: 28));
            }
            
            //if (oldSkl>player.Skl) break; //Сделать настройку!!!
            
            n++;
            numberOfTrains++;
            player.age += Math.floor(numberOfTrains / 127 + 0.001);
            season += Math.floor(numberOfTrains / 127 + 0.001);
            numberOfTrains -= Math.floor(numberOfTrains / 127 + 0.001) * 126;
            player.expPoints += beScript.settings.playerProfile.exp_gain_radio / 126; // 2700 - championship
            ExpLim = Math.floor(269 * Math.pow(1.41, (player.expLevel + 89 * player.talent - 88) / 89) * Math.pow(beScript.Util.factorial(player.talent), -0.11) * 89 / (99 - 10 * player.talent) + 0.00001);
            player.expLevel += Math.floor(player.expPoints / ExpLim + 0.00001);
            player.expPoints -= Math.floor(player.expPoints / ExpLim + 0.00001) * ExpLim;
        }
        
        return {player: player, numberOfTrains: numberOfTrains};
    },
    getPlayerById : function( team, id ) {
        var players = beScript.getMyTeams()[team.id].players;
        var player = null;
        
        if ( !players || !players[id] ) {
            player = new Player();
            player.id = id;
        } else {
            player = players[id];
        }
        
        return player;
    },
    parsePlayerInfo : function( player, body ) {
        var playerTable = $( "table[bgcolor='D0D0D0'] > tbody > tr[class='header'][bgcolor='D3E1EC']", body );
        var playerInfoTable = playerTable.parent().find( ">tr[bgcolor='ffffff'] > td > table > tbody" );
        var playerSkills =         $( ">tr:first:first-child > td:first > b > table > tbody > tr", playerInfoTable );
        var playerBehaviourTable = $( ">tr:first:first-child > td:eq(1) > b > table > tbody > tr", playerInfoTable );
        var playerConditionTable = $(">tr:eq(1) > td:first > b > table > tbody > tr", playerInfoTable);
        var playerLearningTable =  $(">tr:eq(1) > td:eq(1) > b > table > tbody > tr", playerInfoTable);
        var playerInfo = playerTable.children().eq(0);

        player.tckl = parseFloat( playerSkills.eq(0).children().eq(1).text().replace(/_/g,"") );
        player.mrk = parseFloat( playerSkills.eq(1).children().eq(1).text().replace(/_/g,"") );
        player.drbl = parseFloat( playerSkills.eq(2).children().eq(1).text().replace(/_/g,"") );
        player.brcv = parseFloat( playerSkills.eq(3).children().eq(1).text().replace(/_/g,"") );
        player.edrnc = parseFloat( playerSkills.eq(4).children().eq(1).text().replace(/_/g,"") );
        player.pass = parseFloat( playerSkills.eq(5).children().eq(1).text().replace(/_/g,"") );
        player.shotPwr = parseFloat( playerSkills.eq(6).children().eq(1).text().replace(/_/g,"") );
        player.shotAcc = parseFloat( playerSkills.eq(7).children().eq(1).text().replace(/_/g,"") );
        
        player.power = parseFloat( playerBehaviourTable.eq(0).children().eq(1).text() );
        player.age = parseInt( playerBehaviourTable.eq(1).children().eq(1).text() );
        player.salary_txt = playerBehaviourTable.eq(6).children().eq(1).text().trim();
        player.salary = parseInt(player.salary_txt.replace( /\./g, "" ));
        player.cost_txt = playerBehaviourTable.eq(5).children().eq(1).text().trim();
        if (player.cost_txt.substr(-1) === ".") {
            player.cost_txt = player.cost_txt.slice(0, -1);
        }
        player.cost = parseInt(player.cost_txt.replace( /\./g, "" ));
        var pos = beScript.Util.checkByRegExp( playerBehaviourTable.eq(2).children().eq(1).text().trim(), /(\w+)\/?(\w+)?/ );
        player.primaryPosition = pos[1];
        player.secondaryPosition = pos[2];

        var expPoints = beScript.Util.checkByRegExp( playerLearningTable.eq(1).children().eq(1).text(), /(\d+)\s\((\d+)\)?/ );
        player.expPoints = parseInt(expPoints[1], 10);
        player.nextLevelExpPoints = parseInt(expPoints[2], 10);
        player.expLevel = parseInt( playerLearningTable.eq(2).children().eq(1).text(), 10 );
        player.talent = parseInt( playerLearningTable.eq(0).children().eq(1).text(), 10 );
        player.morale = parseInt(beScript.Util.checkByRegExp(playerConditionTable.eq(1).children().eq(1).text(), /\d+/)[0], 10);

        player.number = parseInt( beScript.Util.checkByRegExp(playerInfo.text().trim(), /^\((\d+)\)/ )[1], 10 );
        player.name = $( "a[href*='xml/players']", playerInfo ).text().trim();
        player.country = {};
        player.country.name = $( "img[src*='flag']", playerInfo ).attr( "title" ).trim();
        player.country.id = parseInt(beScript.Util.checkByRegExp( $( "img[src*='flag']", playerInfo ).attr( "src" ), /(\d+)\.gif/ )[1], 10);

        var bonusesStr = playerBehaviourTable.eq(7).children().eq(1).text().trim().replace(/-/g,"");
        player.bonuses = {str:bonusesStr};

        if ( bonusesStr.length > 0 ) {
            var bonuses = bonusesStr.split( /\s/ );

            for ( var k = 0; k < bonuses.length; k++ ) {
                var bonusArr = beScript.Util.checkByRegExp( bonuses[k], /(.{2})(\d)?/ );
                var bonus = beScript.bonusesByAbbr[bonusArr[1]];
                var level = bonusArr[2] || 1;
                
                player.bonuses[bonus.abbr] = parseInt(level, 10);
            }
        }
        
        var bonusPoints = beScript.Util.checkByRegExp( playerBehaviourTable.eq(3).text().trim(), /(\d+)\((\d+)\)?/ );
        player.bonusPoints = parseInt(bonusPoints[1], 10);
        player.nextBonusPoints = parseInt(bonusPoints[2], 10);

        if ($.isFunction(player['trainWithConditions'])) {
            beScript.log("!!");
            player['trainWithConditions'] = null;
            delete player['trainWithConditions'];
        }
        
        return player;
    },
/*    updatePlayerData : function(player) {
        $.ajax({
            url: "/players/" + id,
            success: function(data) {
                var body = $( data );
                var player = beScript.getPlayerById( team, id );
                beScript.__teams[team.id].players[id] = beScript.parsePlayerInfo(player, body);

                beScript.saveMyTeams( beScript.__teams );
            }
        });
    },*/
    loadTeamPlayers : function( team, force ) {
        var playersLoaded = ($(team.players).length > 0);
        var txt = "Обновляю данные игроков";
                
        if ( !playersLoaded || force || team.players.status != 100 ) {
            beScript._timesBlocked++;
            $.blockUI({message:"<div id='progressbar' style='width:400px;'></div><div style='position:absolute;top:0;left:0;width:400px'><center id='progressText'>Обновляю данные игроков...</center></div>"});
            $( "#progressbar" ).progressbar({
                value: 0
            });
            beScript.log( "Updating roster" );
            $.ajax({
                url: "/roster/" + team.id,
                success: function(data) {
                    var _data = $(data);
                    var playersTable = $(".maintable", _data).eq(2);
                    var playersRows = $("tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA']", playersTable);
                    
                    beScript.totalNumberOfPlayers[team.id] = playersRows.size();
                    beScript.totalNumberOfPlayers.total += playersRows.size();
                    var counter = 0;

                    playersRows.each(function(i) {
                        var fields = $( "td", $(this) );
                        var id = parseInt(beScript.Util.checkByRegExp( $( "a", $(fields[1]) ).attr( "href" ), /(\d+)/ )[1]);
                        
                        $.ajax({
                            url: "/players/" + id,
                            success: function(data) {
                                var body = $( data );
                                var player = beScript.getPlayerById( team, id );
                                beScript.__teams[team.id].players[id] = beScript.parsePlayerInfo(player, body);

                                counter++;
                                beScript.totalNumberOfPlayers.handled++;
                                
                                var progressText = txt + " (" + beScript.totalNumberOfPlayers.handled + " / " + beScript.totalNumberOfPlayers.total + ")"
                                $( "#progressText" ).text(progressText);

                                $( "#progressbar" ).progressbar({
                                    value: (beScript.totalNumberOfPlayers.handled / beScript.totalNumberOfPlayers.total * 100)
                                });
                                
                                if (counter == beScript.totalNumberOfPlayers[team.id]) {
                                    beScript._timesBlocked--;
                                    team.players.status = 100;

                                    if (beScript._timesBlocked == 0) {
                                        beScript.saveMyTeams( beScript.__teams );
                                        $.unblockUI();
                                    }
                                }
                            }
                        });
                    });
                    
                    var division = $("input[name='Division']", _data).attr( "value" );
                    if ( division ) {
                        var divisionId = beScript.Util.checkByRegExp(division, /division=(\d+)/)[1];
                        beScript.__teams[team.id].divisionId = divisionId;
                        beScript.log( "Division id of " + team.name + " is " + divisionId );
                    }
                    
                    var teamId = $("input[name='ShortName']", _data).attr( "value" );
                    if ( teamId ) {
                        var teamLitId = beScript.Util.checkByRegExp(teamId, /([^\s]+)\s\(\d+\)/)[1];
                        beScript.__teams[team.id].literalId = teamLitId;
                        beScript.log( "Literal id of " + team.name + " is " + teamLitId );
                    }
                }
            });
        }
    },
    reloadBuildings : function( data ) {
        var team = beScript.getMyTeams()[beScript.activeTeamId];
        var buildingsTrs = $(".maintable table > tbody > tr[bgcolor='#F5F8FA']", data);
        var buildings = team.buildings;
        
        buildingsTrs.each( function(i) {
            var index = Math.floor(i / 3);
            var id = -1;
            
            if ( i % 3 == 0 ) {
                id = parseInt( beScript.Util.checkByRegExp( $("a", this).attr( "href" ), /\?id=(\d+)/ )[1], 10 );
            } else {
                id = parseInt( $( "input[name^=building]", this ).attr( "value" ), 10 );
            }
            
            if ( id > 0 ) {
                var building = buildings[id];
                                            
                if ( !building ) {
                    building = {};
                }

                switch ( i % 3 ) {
                    case 0: 
                        var fullName = beScript.Util.checkByRegExp( $(this).text().trim(), /(.*)-(\d)/ );
                        building.name = fullName[1];
                        building.level = parseInt(fullName[2]);
                        building.id = id;
                        beScript.log( "Updating building " + building.name + "(" + id + ")" );
                        break;
                    case 1: 
                        var info = beScript.Util.checkByRegExp( $(this).text(), /Постройка\/Ремонт\s*:\s([\d\.]+)\s([\d:]+)\s*Состояние\s*:\s(\d+)%/ );
                        building.condition = parseInt( info[3] );
                        var dateComps = info[1].split( "." );
                        var timeComps = info[2].split( ":" );
                        building.repairDate = Date.UTC( dateComps[2], parseInt(dateComps[1], 10) - 1, dateComps[0], timeComps[0], timeComps[1], timeComps[2] );
                        break;
                    case 2: break;
                    default : break;
                }
                
                buildings[id] = building;
            }
        });
        
        buildings.status |= 1;
        beScript.__teams[team.id].buildings = buildings;
        beScript.saveMyTeams( beScript.__teams );
        beScript.log( beScript.getMyTeams()[team.id].buildings );
    },
    reloadStadium : function( data ) {
        beScript.log( "Updating stadium buildings..." );
        var team = beScript.getMyTeams()[beScript.activeTeamId];
        var buildingsTrs = $(".maintable table > tbody > tr[bgcolor='#F5F8FA']", data);
        var buildings = team.buildings;

        buildingsTrs.each( function(i) {
            var index = Math.floor(i / 3);
            var id = -1;
            
            if ( i % 3 == 0 ) {
                id = parseInt( beScript.Util.checkByRegExp( $("a", this).attr( "href" ), /\?id=(\d+)/ )[1], 10 );
            } else {
                id = parseInt( $( "input[name^=building]", this ).attr( "value" ), 10 );
            }
            
            if ( id > 0 ) {
                var building = buildings[id];
                                            
                if ( !building ) {
                    building = {};
                }

                switch ( i % 3 ) {
                    case 0: 
                        var fullName = beScript.Util.checkByRegExp( $(this).text().trim(), /(.*)-(\d)/ );
                        building.name = fullName[1];
                        building.level = parseInt(fullName[2]);
                        building.id = id;
                        break;
                    case 1: 
                        var info = beScript.Util.checkByRegExp( $(this).text(), /Постройка\/Ремонт\s*:\s([\d\.]+)\s([\d:]+)\s*Состояние\s*:\s(\d+)%/ );
                        building.condition = parseInt( info[3] );
                        var dateComps = info[1].split( "." );
                        var timeComps = info[2].split( ":" );
                        building.repairDate = Date.UTC( dateComps[2], parseInt(dateComps[1], 10) - 1, dateComps[0], timeComps[0], timeComps[1], timeComps[2] );
                        break;
                    case 2: break;
                    default : break;
                }
                
                buildings[id] = building;
            }
        });
        
        buildings.status |= 2;
        beScript.__teams[team.id].buildings = buildings;
        beScript.saveMyTeams( beScript.__teams );
        beScript.log( beScript.getMyTeams()[team.id].buildings );
    },
    loadBuildings : function( force, page, pageData ) {
        beScript.log( "Updating buildings..." );
        var team = beScript.getMyTeams()[beScript.activeTeamId];
        var buildingsLoaded = (team.buildings && $(team.buildings).length > 0);
        var timeUpdaterFired = beScript.Util.checkPeriod( "buildingsUpdTime_" + beScript.activeTeamId, beScript.BUILDINGS_UPDATES_CHECK_FREQ * 1000 * 60 );
        
        if ( !team.buildings || force ) {
            beScript.log( "Buildings weren't loaded before." );
            team.buildings = {status:0};
        }

        beScript.log( "Buildings real status: " + team.buildings.status );
        
        team.buildings.status = (buildingsLoaded && !timeUpdaterFired && !force)?team.buildings.status:0;

        beScript.log( "Buildings new status: " + team.buildings.status );

        if ( !buildingsLoaded || timeUpdaterFired || team.buildings.status != (1 + 2) ) {
            if ( (team.buildings.status & 1) == 0 ) {
                $.ajax({
                    url: "/buildings/",
                    success: beScript.reloadBuildings
                });
            }
            if ( (team.buildings.status & 2) == 0 ) {
                $.ajax({
                    url: "/stadium/",
                    success: beScript.reloadStadium
                });
            }
        }
    },
    updateTeamsMenu : function() {
        var teamSelect = $("select", $("#beScript_td").next());
        
        if ( teamSelect.size == 0 ) {
            return;
        }
        
        var _teams = beScript.getMyTeams();
        var activeTeamLink = $( "<b><a href='/roster/'>" + _teams[beScript.activeTeamId].name + "</a></b>" );
        
        teamSelect.replaceWith(activeTeamLink);
        var content = $("<div>");
        
        for (var teamId in _teams) {
            if (teamId != beScript.activeTeamId) {
                var team = _teams[teamId]
                var lnk = $("<a id='beScript_dropdown_team_" + team.id + "' href='javascript:void(" + team.id + ")'>" + team.name + "</a>");
                lnk.click(function() {
                    var self = $(this);
                    var teamId = beScript.Util.checkByRegExp( self.attr( "id" ), /beScript_dropdown_team_(\d+)/ )[1];
                    var currLocation = window.location.href;
                    var newLocation = currLocation.replace( beScript.activeTeamId, teamId )
                                                  .replace(_teams[beScript.activeTeamId].divisionId, team.divisionId )
                                                  .replace(_teams[beScript.activeTeamId].literalId, team.literalId);
                    
                    $.ajax({
                        url: "/index.php?team=" + teamId,
                        success : function() { 
                            window.location.href = newLocation; 
                        }
                    });
                });
                content.append( lnk );
                lnk.wrap("<center><b></b></center>");
            }
        }
        
        activeTeamLink.qtip({
                id : 'beScript_idea',
                position: {
                    my : 'top center',
                    at : 'bottom center',
                    adjust : {y : 5}
                },
                hide: { 
                    delay: 400,
                    fixed : true
                },
                show: { 
                    delay : 10,
                },
                content : {
                    text : content
                },
                style: {
                    classes: 'ui-tooltip-dark ui-tooltip-shadow ui-tooltip-bonus',
                    tip: false
                }                    
            });
    },
    getCurrentTeamsIdNameMap : function() {
        var teamOptions = $("select", beScript.menuElem.parent().parent()).children();
        var teamOptionsA = $("a[href*='roster']", beScript.menuElem.parent().parent());
        var currentTeamIds = {};
        
        if (teamOptions.size() > 0) {
            for ( var i = 0; i < teamOptions.length; i++ ) {
                currentTeamIds[teamOptions[i].value] = teamOptions.eq(i).text().trim();
            }
        } else {
            var id = beScript.Util.checkByRegExp( teamOptionsA.attr('href'), /(\d+)/ )[1];
            currentTeamIds[id] = teamOptionsA.text().trim();
        }

        return currentTeamIds;
    },
    loadTeams : function( force ) {
        var _teams = beScript.getMyTeams();
        var teamOptions = $("select", beScript.menuElem.parent().parent()).children();
        var teamOptionsA = $("a[href*='roster']", beScript.menuElem.parent().parent());
        var currentTeamIds = beScript.getCurrentTeamsIdNameMap();
        var count = 0;

        for ( var i in _teams ) {
            count++;
        }

        var count2 = 0;
        for ( var i in currentTeamIds ) {
            count2++;
        }
        
        var needsUpdate = (count2 != count);
        var teamsArchive = null;
         
        for (var teamId in _teams) {
            if (!(teamId in currentTeamIds)) {
                if (teamsArchive == null) {
                    teamsArchive = beScript.getTeamsArchive();
                }
                
                teamsArchive[teamId] = _teams[teamId];
                
                delete _teams[teamId];
                _teams[teamId] = null;
                
                needsUpdate = true;
            }
        }
        
        if ( teamsArchive != null ) {
            beScript.saveTeamsArchive( teamsArchive );
        }
        
        if ( teamOptions.size() != 0 ) {
            beScript.activeTeamId = teamOptions.filter( ":selected" )[0].value;
        } else {
            beScript.activeTeamId = beScript.Util.checkByRegExp( teamOptionsA.attr('href'), /(\d+)/ )[1];
        }

        beScript.log( "Active team id is " + beScript.activeTeamId );

        if ( needsUpdate 
            || force 
            || count == 0
            || beScript.Util.checkPeriod( "teamsUpdTime", beScript.TEAM_UPDATES_CHECK_FREQ * 1000 * 60 ) ) {
            for (var id in currentTeamIds) {
                if ( (!_teams[id]) || (_teams[id] == null) ) {
                    _teams[id] = {};
                    _teams[id].name = currentTeamIds[id];
                    _teams[id].id = id;
                }

                if (_teams[id].players) {
                    _teams[id].players.status = 0;
                } else { 
                    _teams[id].players = {status:0};
                }
                if (_teams[id].buildings) {
                    _teams[id].buildings.status = 0;
                } else { 
                    _teams[id].buildings = {status:0};
                }
            }
            
            beScript.saveMyTeams( _teams );
        }
        
        beScript._timesBlocked = 0;
        beScript.totalNumberOfPlayers = {};
        beScript.totalNumberOfPlayers.total = 0;
        beScript.totalNumberOfPlayers.handled = 0;

        for ( var i in _teams ) {
            beScript.loadTeamPlayers( _teams[i], force );
        }
        
        beScript.log(beScript.getMyTeams());
    },
    initBonusesByAbbr : function() {
        beScript.bonusesByAbbr = {};
        for ( var id in beScript.bonuses ) {
            var bonus = beScript.bonuses[id];
            if ( typeof bonus == 'function' ) continue;
            bonus.id = id;
            
            beScript.bonusesByAbbr[bonus.abbr] = bonus;
        }
    },
    addBeScriptMenu : function() {
        if ( $("#beScript_menu").length == 0 ) {
            var greetingTd = $(".autoten");
            var browserName = $.browser.name;

            if ( browserName == "chrome" || browserName == "safari" ) {
                greetingTd.attr( "valign", "center" );
            }
            
            greetingTd.attr( "width", "800" );
            greetingTd.before( "<td width='160' id='beScript_td'/>" );
            var beScript_td = $( "#beScript_td" );
            beScript_td.html( "<span id='beScript_menu' style='margin-left:20px;color:white;text-decoration:underline'>beScript (v" + beScript.VERSION + ")</span>&nbsp;<a id='beScript_idea' href='javascript:void(0)'><img height='10' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABnRSTlMA/wD/AP83WBt9AAAB+0lEQVR42m2SzWsTQRiHfzNd4+Zr2agopeqlKBQqVtAepOBJrZZQP4o3v0DoTbyIIBSll4KXehClEs+1117MHyBYg9p6aJsmpEFNSjaJzTZskt3tZl4P2dRN9GUu7/A88/GbYUSEVgmnvhY3luacwnfGQYTm7m7PkbPh85PhU6PgUotiruDYpfkH9HNRvXTP1z8KWQFjMIp25kMxvoC+aN/9GJN8AEBERKTHp8svFCq9IsqQSFFznZrrJNJEm6S9zD8LaIvTLdLd4dej4NHbp9nQY1g7gIO/JUGOiMTztVhqMFYD4J5MkMnUGuof0TTQVULhkR1yzPYCAABiEraTCDjokbEXAwDG0DBRzQvGOwTlylRlZSqiJiFJ4MylCSBC09ES4tDY09ac66kXHuragF0SkGwIyx1kYZ9tFkQ5P9A79qRD4LJy8OpM6QuwHwgBQSAIhAAf8p/Qe22G+5UOAYByJmo2Riy9QzArMOsjB85F9zDuuR8PD44bW4C/LfhRzUEdGgfj/xOAQP+wsSo7ZYjfoAqognpKDp0Y9jKMvCE69ufZCc0qbuUK27pRa9gn1WN33i27n8Iba7vzpQ/fvHj5+sbGZjKZlWvmm/nZux76HwFIZrLH06vZH7mqoTcapi2635139bcmbnz7mlhZXlp4H7NM7e3c6y7gDwIW8gowEmYhAAAAAElFTkSuQmCC'/></a>" );
        }
        
        beScript.menuElem = $("#beScript_menu").hover(function() {
                $(this).css('cursor','pointer');
                $(this).css('color','black');
            }, function() {
                $(this).css('cursor','auto');
                $(this).css('color','white');
            });
        
        var _addMenu = function() {
            var content = $("<div/>");
            content.css( "color:white" );
            
            this.createCheckboxWithIdAndText = function( id, text, _function, wrapStyle, on, title ) {
                var result = $( "<div />" );
                
                if ( wrapStyle ) {
                    result.attr( "style", wrapStyle );
                }
                
                result.append( "<input type='checkbox' id='" + id + "' " + ((on !== false)?"checked":"") + "/>", "<label id='" + id + "_label' for='" + id + "'" + ((title)?" title='" + title + "'":"") + ">" + text + "</label>" );
                $( "#" + id + "", result ).change(_function || function() {
                    beScript.updateSetting( $(this).attr("id"), $(this).attr("checked") );
                });
                return result;
            };
            
            var sortsDiv = $( "<div id='sorts_div' />" );
            sortsDiv.append( "<span style='font-size:12px'>\"Умная\" сортировка</span>" );
            
            sortsDiv.append( this.createCheckboxWithIdAndText( "sorts_roster", "В ростере основы", null, "", beScript.settings["sorts_roster"] ) );
            sortsDiv.append( this.createCheckboxWithIdAndText( "sorts_school", "В ростере ДЮСШ", null, "", beScript.settings["sorts_school"] ) );
            sortsDiv.append( this.createCheckboxWithIdAndText( "sorts_tournament_table", "В таблице дивизиона", null, "", beScript.settings["sorts_tournament_table"] ) );
            sortsDiv.append( this.createCheckboxWithIdAndText( "sorts_club_table", "На странице клубного центра", null, "", beScript.settings["sorts_club_table"] ) );
            
            if (beScript.settings["sorts_roster"] && beScript.settings["sorts_school"] && beScript.settings["sorts_tournament_table"] && beScript.settings["sorts_club_table"] ) {
                $( "input[id='all_sorts']", sortsDiv ).attr( "checked", "true" );
            }
            
            content.append( sortsDiv, "<br />" );

            var rosterDiv = $( "<div id='roster_div' />" );
            rosterDiv.append( "<span style='font-size:12px'>Ростер команды</span>" );

            rosterDiv.append( this.createCheckboxWithIdAndText( "helpers_profile", "Всплывающее окошко профайла", null, "", beScript.settings["helpers_profile"] ) );
            rosterDiv.append( this.createCheckboxWithIdAndText( "helpers_bonuses", "Всплывающее окошко бонусов", null, "", beScript.settings["helpers_bonuses"], "Если набрано 100% бонусных очков" ) );
            rosterDiv.append( this.createCheckboxWithIdAndText( "helpers_fast_repair", "Быстрый ремонт", null, "", beScript.settings["helpers_fast_repair"] ) );
            rosterDiv.append( this.createCheckboxWithIdAndText( "helpers_repair_reminder", "Напоминание о ремонте", null, "", beScript.settings["helpers_repair_reminder"] ) );
            rosterDiv.append( this.createCheckboxWithIdAndText( "helpers_prices_link", "Ссылка на цены билетов", null, "", beScript.settings["helpers_prices_link"] ) );
            rosterDiv.append( this.createCheckboxWithIdAndText( "links_in_roster", "Ссылки в ростере", null, "", beScript.settings["links_in_roster"] ) );
            
            content.append( rosterDiv, "<br />" );

            var playerProfileDiv = $( "<div id='player_profile_div' />" );
            playerProfileDiv.append( "<span style='font-size:12px'>Профиль игрока</span>" );

            playerProfileDiv.append( this.createCheckboxWithIdAndText( "player_profile_extender", "Расчет мастерства игрока в профиле", null, "", beScript.settings["player_profile_extender"] ) );
            
            content.append( playerProfileDiv, "<br />" );

            var otherDiv = $( "<div id='other_div' />" );
            otherDiv.append( "<span style='font-size:12px'>Прочее</span>" );

            otherDiv.append( this.createCheckboxWithIdAndText( "kp_helper", "Помощник в КП", null, "", beScript.settings["kp_helper"] ) );
            otherDiv.append( this.createCheckboxWithIdAndText( "last_matches_in_organizer", "Результаты матчей в органайзере", null, "", beScript.settings["last_matches_in_organizer"] ) );
            otherDiv.append( this.createCheckboxWithIdAndText( "finance_report_sum_column", "Финансы - сумма за день", null, "", beScript.settings["finance_report_sum_column"] ) );
            otherDiv.append( this.createCheckboxWithIdAndText( "individual_plan", "Помощник тренера - индивидуальный план тренировок", null, "", beScript.settings["individual_plan"] ) );
            otherDiv.append( this.createCheckboxWithIdAndText( "stayWithin1stVersion", "Не оповещать об изменениях версии 0.2.*", null, "", beScript.settings["stayWithin1stVersion"] ) );
            
            if ( $( "select", $("#beScript_td").next()).size() > 0 ) {
                otherDiv.append( this.createCheckboxWithIdAndText( "update_teams_menu", "Улучшить меню выбора команд", null, "", beScript.settings["update_teams_menu"] ) );
            }
            
            content.append( otherDiv );

            beScript.menuElem.qtip({
                id:'beScript_menu_tooltip',
                position: {
                    my: 'center',
                    at: 'center',
                    target: $(window)
                },
                hide: false,
                show: { 
                    modal: {
                        onload : true,
                    },
                    solo: true,
                    event: 'click',
                },
                content: {
                    title: {
                        text: "beScript (v" + beScript.VERSION + ") :: Настройки",
                        button: "Закрыть",
                    },
                    text: content
                },
                style: {
                    classes : 'ui-tooltip-dark ui-tooltip-rounded beScript-menu',
                    width : 600
                },
                events: {
                    show : function( event, api ) {
                        beScript.updateSetting( "menu_helper_shown", true );
                    }
                }
            });
            
            $("#beScript_idea").qtip({
                id : 'beScript_idea',
                position: {
                    my : 'left center',  // Position my top left...
                    at : 'right center', // at the bottom right of...
                },
                hide: { 
                    delay : 200,
                    fixed : true
                },
                show: { 
                    delay : 200,
                },
                content : {
                    text : "Появилась идея? Видишь ошибку? Жми!"
                },
                style: {
                    classes: 'ui-tooltip-dark ui-tooltip-shadow ui-tooltip-bonus',
                }                    
            });

        }
                
        _addMenu();
    },
    updateTrainNumber : function() {
        beScript.trainNumber = beScript.Util.deserialize( "trainNumber", -1 );
        beScript.playingDay = beScript.Util.deserialize( "playingDay", -1 );
        beScript.season = beScript.Util.deserialize( "season", -1 );
        
        if ( !beScript.Util.checkPeriod("trainNumberUpdTime", beScript.TRAIN_UPDATES_CHECK_FREQ) && (beScript.trainNumber != -1 || beScript.playingDay != -1 || beScript.season != -1) ) {
            return;
        }
    
        var parseFunction = function(data) {
            var trainNumberArr = beScript.Util.checkByRegExp( data, /Последняя\sтренировка:\s([^;]+);\sЭто\s(\d+)\sтренировка\sиз\s(\d+)\sсезона\s(\d+)\.\sОсталось\sтренировок:\s(\d+)/ );
            beScript.trainNumber = parseInt(trainNumberArr[5], 10);
            beScript.season = parseInt(trainNumberArr[4], 10);
            beScript.playingDay = Math.round((parseInt(trainNumberArr[2], 10) / parseInt(trainNumberArr[3], 10)) * 84);
            
            beScript.Util.serialize( "trainNumber", beScript.trainNumber );
            beScript.Util.serialize( "playingDay", beScript.playingDay );
            beScript.Util.serialize( "season", beScript.season );
        };
        
        if (beScript.Util.checkLocation( "train.php?act=report" )) {
            parseFunction( $( "body" ).html() );
        } else {
            $.ajax({
                url: "/xml/school/train.php?act=report",
                success: parseFunction,
            });
        }
    },
    showNews : function() {
        var lastNewsShownVersion = beScript.Util.deserialize( "news_shown_for_version", "-1" );
        var lastVersion = (lastNewsShownVersion != -1)?beScript.Util.parseVersionNumber( lastNewsShownVersion ):-1;
        var currVersion = beScript.Util.parseVersionNumber( beScript.news.version );

        if ( lastVersion == -1 || lastVersion < currVersion ) {
            var newsTooltopContainer = $("body").append( "<div id='beScript_NewsTooltip' />" );
            var userName = $( ">b", $( "#beScript_td" ).next()).text();
            newsTooltopContainer.qtip({
                id:'beScript_news_tooltip',
                position: {
                    my: 'top center',
                    at: 'top center',
                    target: $(window)
                },
                hide: false,
                show: { 
                    modal: {
                        onload : true,
                    },
                    ready: true
                },
                content: {
                    title: {
                        text: "beScript (v" + beScript.VERSION + ") :: Новости",
                        button: "Закрыть",
                    },
                    text: "<span>Приветствую, " + userName + "!</span><br/><br/>" + beScript.news.text + "<br/><div style='position:relative;float:right;margin:0px 10px 5px 0px'><a href='http://butsa.ru/users/16032' target='_blank'>kovpas</a></div>",
                },
                style: {
                    classes:'ui-tooltip-dark ui-tooltip-rounded beScript-news',
                },
                events: {
                    show : function( event, api ) {
                        setTimeout(function() {
                            beScript.Util.serialize( "news_shown_for_version", beScript.news.version );
                        }, 0); 
                    },
                    hide : function( event, api ) {
                        beScript.Update.init();
                        api.destroy();
                    }
                }
            });
            
            return true;
        }
        
        return false;
    },
    addReformalLink : function() {
        MyOtziv.mo_showframe();
    },
    updateTeamsStorage : function() {
        var _teams = beScript.getMyTeams();
        
        if (!_teams) {
            _teams = {};
            var allTeams = beScript.Util.deserialize( "teams", {} );
            
            var teamOptions = $("select", beScript.menuElem.parent().parent()).children();
            var teamOptionsA = $("a[href*='roster']", beScript.menuElem.parent().parent());
            var currentTeamIds = [];
            
            if (teamOptions.size() > 0) {
                for ( var i = 0; i < teamOptions.length; i++ ) {
                    currentTeamIds.push(teamOptions[i].value);
                }
            } else {
                var id = beScript.Util.checkByRegExp( teamOptionsA.attr('href'), /(\d+)/ )[1];
                currentTeamIds.push(id);
            }
            
            for ( var i = 0; i < currentTeamIds.length; i++ ) {
                var teamId = currentTeamIds[i];
                var teamToSave = allTeams[teamId];
                
                if (teamToSave) {
                    _teams[teamId] = teamToSave;
                }
            }
            
            beScript.saveMyTeams(_teams);
        }
    },
    getTeamsArchive : function() {
        if (beScript.__teamsArchive == null) {
            beScript.__teamsArchive = beScript.Util.deserialize( "teams", {} );
        }
        
        return beScript.__teamsArchive;
    },
    saveTeamsArchive : function( teamsArchive ) {
        beScript.Util.serialize( "teams", teamsArchive );
        beScript.__teamsArchive = teamsArchive;
    },
    getMyTeams : function() {
        if (beScript.__teams == null) {
            var allTeams = beScript.Util.deserialize( "playerTeams", {} );
            beScript.__teams = allTeams[beScript.userId];
        }
        
        return beScript.__teams;
    },
    saveMyTeams : function( teams ) {
        var allTeams = beScript.Util.deserialize( "playerTeams", {} );
        allTeams[beScript.userId] = teams;
        beScript.Util.serialize( "playerTeams", allTeams );
        beScript.__teams = teams;
    },
    postStatistics : function() {
        if (beScript.Util.deserialize( "statistics_post_date", -1 ) != -1 ) {
            return;
        }
        
        var browser = $.browser.name;
        var browserVersion = $.browser.version;
        var os = $.os.name;
        var userId = beScript.userId;
        
        beScript.log( "posting statistics: browser = " + browser + "; browser version = " + browserVersion + "; os = " + os );
        var url = "http://kovpas.ru/1.php?userid=" + userId + "&browser=" + browser + "&browser_version=" + browserVersion + "&os=" + os;

        var responseHandler = function(data) {
            if (data.trim() == "success") {
                beScript.log( "statistics successfully saved on a server" );
                var now = new Date().getTime();
                beScript.Util.serialize("statistics_post_date", now);
            } else {
                beScript.log( "statistics can't be saved on a server: !" + data.trim() + "!" );
            }
        }
        
        if ( window.navigator.vendor && window.navigator.vendor.match(/Google/) ) {
            chrome.extension.sendRequest({'url':url}, responseHandler);
        } else if(!window.opera && typeof GM_xmlhttpRequest != "undefined") {
            GM_xmlhttpRequest({
                    method : "GET",
                    url : url,
                    onload : function(o) {
                        if (o.readyState == 4) {
                            responseHandler(o.responseText);
                        }
                    },
                    onerror : function(e) {
                        beScript.log( "!" + e );
                    }
                });
        } else {
            $.get(url, function(data) {responseHandler($(data.responseText).text()); });
        }
    },
    init : function() {
        beScript.log( "jQuery version: " + $().jquery );
                
        var act = beScript.Util.checkByRegExp( window.location.href, /act=(\w+)/ );
        beScript.hrefAction = act?act[1]:"";

        beScript.settings = beScript.Util.deserialize( "settings", beScript.default_settings );
        
        if (beScript.Util.checkLocation( "train.php" ) && (beScript.hrefAction == "vip")) {
//            beScript.train.vipProcess();
            return;
        }

        if ( !beScript.settings.playerProfile ) {
            beScript.settings.playerProfile = beScript.default_settings.playerProfile;
        }
        
        beScript.addBeScriptMenu();
        
        beScript.userId = parseInt(beScript.Util.checkByRegExp( $( ">b>a", $( "#beScript_td" ).next()).attr("href"), /\/users\/(\d+)/ )[1]);
        beScript.postStatistics();

        beScript.updateTeamsStorage();

        beScript.initBonusesByAbbr();
        beScript.loadTeams();
        beScript.loadBuildings();
        
        beScript.updateTrainNumber();
        
        beScript.Util.init();
        
        if (beScript.Util.checkLocation( "kp.php" ) || beScript.Util.checkLocation( /kp\/\?act=next$/ ) && (beScript.hrefAction != "mnext")) {
            beScript.forecasts.process();
        }
        if (beScript.Util.checkLocation( "school" )) {
            beScript.school.process();
        }
        if (beScript.Util.checkLocation( "train" )) {
            beScript.train.process();
        }
        if (beScript.Util.checkLocation( "roster" ) && !beScript.Util.checkLocation( "school" )) {
            beScript.roster.process();
        }
        if (beScript.Util.checkLocation( "ratings" )) {
            beScript.ratings.process();
        }
        if (beScript.Util.checkLocation( "organizer" )) {
            beScript.organizer.process();
        }
        if (beScript.Util.checkLocation( /club\.php$/ ) 
            || (beScript.Util.checkLocation( "club.php" ) && beScript.Util.checkLocation( "type=players/club" ) && (beScript.hrefAction == "select")) ) {
            beScript.club.process();
        }
        if (beScript.Util.checkLocation( "finances?/report.php" )) {
            beScript.finances.process();
        }
        if (beScript.Util.checkLocation( "buildings.php" ) || beScript.Util.checkLocation( /buildings\/\?act=list/ ) || beScript.Util.checkLocation( /buildings\/$/ )) {
            beScript.buildings.process();
        }
        if (beScript.Util.checkLocation( "stadium.php" ) || beScript.Util.checkLocation( /stadium\/$/ )) {
            beScript.stadium.process();
        }
        if (beScript.Util.checkLocation( "tour/index.php" ) || beScript.Util.checkLocation( "tournaments" )) {
            beScript.tournaments.process();
        }
        if (beScript.Util.checkLocation( /players\/(info\.php\?id=)?\d+/ ) || beScript.Util.checkLocation( /players\/info\.php$/ )) {
            beScript.playerProfile.process();
        }
        
        if ( !beScript.showNews() ) {
            beScript.Update.init();
        }

        beScript.addReformalLink();
        
        if ( beScript.settings.update_teams_menu !== false )
        {
            beScript.updateTeamsMenu();
        }
	},
};

beScript.Util = {
    init : function() {
        $.tablesorter.addWidget({
            id: "beScript.zebra",
            format: function(table) {
                $("tr:nth-child(odd)",table).attr("bgcolor", "#FFFFFF");
                $("tr:nth-child(even)",table).attr("bgcolor", "#EEF4FA");
            }
        });
        
        $.tablesorter.addParser({ 
            id: 'beScript.sorter.positions', 
            is: function(s) { 
                return false; 
            }, 
            format: function(s) { 
                var posMatch = beScript.Util.checkByRegExp( s, "(Gk|[LCRADS][wdmf][d]?)/?(.*)" );
                var result = beScript.positions[posMatch[1]];
                if ( posMatch[2] != "" ) {
                    result += beScript.positions[posMatch[2]] / 100;
                }

                return result;
            }, 
            type: 'numeric' 
        }); 
        
        GM_addStyle( "th.headerSortUp { color:red; } th.headerSortDown { color:green; } th { background-color: #D3E1EC;}" )
        GM_addStyle( ".ui-tooltip-player {min-width:380px} .ui-tooltip-player a:visited{color:white} .ui-tooltip-player a:link{color:white} .ui-tooltip-player table {margin-top:0px;width:200px} .ui-tooltip-player td {width:110px}" );
        GM_addStyle( ".ui-tooltip-player-individual-plan {min-width:180px}" );
        GM_addStyle( ".ui-tooltip-bonus {min-width:150px}.ui-tooltip-bonus a:visited{color:white} .ui-tooltip-bonus a:link{color:white} .ui-tooltip-bonus table {margin-top:0px;width:150px} .ui-tooltip-bonus td {width:150px}" );
        GM_addStyle( ".beScript-menu {min-width:350px}.beScript-menu a:visited{color:white} .beScript-menu a:link{color:white}" );
        GM_addStyle( ".beScript-news {min-width:700px}.beScript-news a:visited{color:white} .beScript-news a:link{color:white}" );

        var tmpl1 = "<table style='color:white'>" +
        "<tr><td style='width:80px'>Талант</td><td>${talent} + ${expLevel / 10} = ${talent + expLevel / 10}</td></tr>" +
        "<tr title='${nextLevelExpPoints - expPoints}'><td style='width:80px'>Очки опыта</td><td>${expPoints} / ${nextLevelExpPoints} = ${Math.round(expPoints / nextLevelExpPoints * 100)}%</td></tr>" +
        "<tr><td style='width:80px'>Возраст</td><td>${age}</td></tr>" +
        "<tr><td style='width:80px'>Позиция</td><td>${primaryPosition}{{if secondaryPosition}}/${secondaryPosition}{{/if}}</td></tr>" +
        "<tr><td style='width:80px'>Зарплата</td><td>${salary_txt}</td></tr>" +
        "<tr><td style='width:80px'>Стоимость</td><td>${cost_txt}</td></tr>" +
        "{{if $(bonuses).size() > 0 }}<tr><td style='width:80px'>Бонусы</td><td>${bonuses.str}</td></tr>{{/if}}" +
        "<tr title='${nextBonusPoints - bonusPoints}'><td style='width:80px'>Очки бонусов</td><td>${bonusPoints} / ${nextBonusPoints} = ${Math.round(bonusPoints / nextBonusPoints * 100)}%</td></tr>" +
        "<tr><td style='width:80px'>Мораль</td><td>${morale}</td></tr></table>";
        
        var tmpl2 = "<div style='height:156px'><table style='color:white;'>" +
        "<tr><td>Мастерство</td><td>${power}</td></tr>" +
        "{{if primaryPosition != 'Gk'}}<tr><td>Отбор</td><td>${tckl}</td></tr>" +
        "<tr><td>Опека</td><td>${mrk}</td></tr>" +
        "<tr><td>Дриблинг</td><td>${drbl}</td></tr>" +
        "<tr><td>Прием мяча</td><td>${brcv}</td></tr>" +
        "<tr><td>Выносливость</td><td>${edrnc}</td></tr>" +
        "<tr><td>Пас</td><td>${pass}</td></tr>" +
        "<tr><td>Сила удара</td><td>${shotPwr}</td></tr>" +
        "<tr><td>Точность удара</td><td>${shotAcc}</td></tr>{{/if}}</table></div>";
        
        $.template(
            "playerDetailsTemplate",
            "<table><tr><td>" + tmpl1 + "</td><td>" + tmpl2 + "</td></tr></table>"
        );

    },
    checkByRegExp : function( string, regExpString ) {
		var rx = new RegExp(regExpString);

		var res = rx.exec(string);
		if (res) {
			return res;
		}
        
        return null;
    },
	checkLocation : function(str) {
		var rx = new RegExp(str);
		var res = rx.exec(window.location.href);
		if (res) {
			return res.toString();
		}
	},
    serialize : function(container, source) {
		var str = beScript.NAMESPACE + "_" + container;
        var value = uneval(source);
        GM_setValue(str, value);
	},
	deserialize : function(container, defaultValue) {
        var value = GM_getValue(beScript.NAMESPACE + "_" + container, defaultValue);
        
        if ( value && value.length < 100 || !value ) {
            beScript.log(container + " value is !" + value + "!");
        }
        
		if (defaultValue != null) {
			if (value == "" || value == null || value == "null") {
				value = defaultValue;
//				beScript.log(container + " value set to default "
//						+ defaultValue);
			}
		}
        
		return eval(value);
	},
    checkPeriod : function(timeSource, period) {
		var lastupdate = beScript.Util.deserialize(timeSource, 0);
		var now = new Date().getTime();
		var dif = (now - lastupdate);
        
		if ((dif >= period) || (dif <= -period)) {
			beScript.Util.serialize(timeSource, now);
			return true;
		}
        
        return false;
	},
    factorial : function(n) {
        var result = 1;
        for (var i = 2; i <= n; i++) {
            result *= i
        }
        return result;
    },
    parseVersionNumber : function( versionString ) {
        var resultArr = versionString.split('.')
        var result = parseInt(resultArr[0] * 10000, 10)
                   + parseInt(resultArr[1] * 100, 10)
                   + parseInt(resultArr[2], 10);
        return result;
    },
    makeTableSortable : function( settingName, table, sorters, defaultSort, numberOfBottomRows, tableIndexOnAPage ) {
        var autoName = beScript.Util.checkByRegExp(window.location.href, /act=(\w+)/);
        
        if ( autoName ) {
            settingName += autoName[1];
        }
        
        if ( tableIndexOnAPage ) {
            settingName += "_" + tableIndexOnAPage;
        }
        
        var playersTableBody = $(table.children()[0]);
        var headerRow = $(playersTableBody.children()[0]);
        
        if ( numberOfBottomRows != 0 ) {
            var footerRow = playersTableBody.children();
            var resFooterRow = $(footerRow[footerRow.length - 1]);

            for ( var i = 1; i < numberOfBottomRows; i++ ) {
                if ( !$(footerRow[footerRow.length - i - 1]).is("tr") ) {
                    numberOfBottomRows++;
                    continue;
                }
                resFooterRow = resFooterRow.add( footerRow[footerRow.length - i - 1] );
            }
            
            resFooterRow.remove();
            playersTableBody.after(resFooterRow);
            resFooterRow.wrapAll( "<tfoot style='font-size: 11px;'/>" );
        }
        
        headerRow.remove();
        playersTableBody.before(headerRow);
        
        $( "td", headerRow ).each(function(i) {
            if ( $(this).attr("id") == "numrows" ) {
                return ;
            }

            var thistd = this;
            var newElement = $("<th></th>");            
            $.each(this.attributes, function(index) {
                $(newElement).attr(thistd.attributes[index].name, thistd.attributes[index].value);
            });
            newElement.html($(thistd).children().html())
            $(this).after(newElement).remove();
        });
        
        headerRow.wrap( "<thead style='font-size: 11px;'/>" )


        table.bind("sortEnd", function() { 
            var sortedColumns = $(".headerSortDown,.headerSortUp", table);
            var prnt = $("th", $(sortedColumns[0]).parent());
            if ( sortedColumns.length == 1 ) {
                sortSettings = [];
            }
            for (var i = 0; i < sortedColumns.length; i++ ) {
                var sortedClass = $(sortedColumns[i]).attr( "class" );
                var index = prnt.index( sortedColumns[i] );

                if ( index < 0 ) {
                    continue;
                }
                
                var sortDirection = 1;
                
                if ( beScript.Util.checkByRegExp( sortedClass, "Down" ) ) {
                    sortDirection = 0;
                }
                var found = false;
                for ( var k = 0; k < sortSettings.length; k++ ) {
                    if ( sortSettings[k][0] == index ) {
                        found = true;
                        sortSettings[k][1] = sortDirection;
                        
                        break;
                    }
                }
                
                if ( !found ) {
                    sortSettings.push( [index, sortDirection] );
                }
            }
            beScript.Util.serialize( settingName, sortSettings );
        });
        
        var sortSettings = beScript.Util.deserialize( settingName, [defaultSort] );
        
        table.tablesorter({
            widgets: ['beScript.zebra'],
            sortList: sortSettings,
            headers: sorters,
            textExtraction : function(node) {
                if ( $("select", $(node)).length > 0 ) {
                    return $(":selected", $(node)).text().trim();
                }

                var text = $(node).text().trim();
                if ( text != "" ) {
                    var expMatch = beScript.Util.checkByRegExp( text, /(\d+)\((\d+)\)/ );
                    if ( expMatch ) {
                        return parseInt(expMatch[1]) / parseInt(expMatch[2], 10);
                    }

                    expMatch = beScript.Util.checkByRegExp( text, /(\d+):(\d+)/ );
                    if ( expMatch ) {
                        return parseInt(expMatch[1], 10) - parseInt(expMatch[2], 10) / 1000;
                    }

                    return text.replace( /\./g, "" ); 
                }
                
                if ( $(node).attr("title") ) {
                    return ( beScript.Util.checkByRegExp( $(node).attr("title"), /(\d+)/ )[1] );
                }
                
                if ( $("img", node).attr( "title" ) ) {
                    return ( $("img", node).attr( "title" ) );
                }
                
                if ( $("img", node).attr( "src" ) ) {
                    return ( $("img", node).attr( "src" ) );
                }
                
                return "";
            }
        });
        
    },
};

beScript.forecasts = {
    colorizeC11Diff : function() {
        var forecastTable = $("#PrognosesTableDiv");
        var tableBody = $("tbody", forecastTable);
        var tableRows = $("tr", tableBody);
        var originalColumnArray = new Array();
        
        tableRows.each( function(i) {
            if ( i == 0 ) 
            {
                $("td:nth-child(3)", $(this)).after("<td></td>");
                return;
            }
            
            originalColumnArray[i - 1] = new Object;
            originalColumnArray[i - 1].oldIndex = i;

            var home_c11 = $("td:nth-child(3)", $(this)).text();
            var away_c11 = $("td:nth-child(4)", $(this)).text();

            originalColumnArray[i - 1].value = home_c11 - away_c11;
        });
              
        originalColumnArray.sort( function(x, y) {
            var xValue = Math.abs(parseFloat(x.value));
            var yValue = Math.abs(parseFloat(y.value));
            return (xValue - yValue);
        });
        
        originalColumnArray.reverse();
        var sortedTableBody = $("<tbody/>");
        sortedTableBody.append($(tableRows[0]).clone());

        for (var i = 0; i < originalColumnArray.length; i++) {
            var newNode = $(tableRows[originalColumnArray[i].oldIndex]).clone();
            newNode.attr("bgColor", (i % 2 == 0)?"#EEF4FA":"#FFFFFF");
            $( "td:nth-child(3)", newNode ).after("<td></td>");
            var midNode = $( "td:nth-child(4)", newNode );
            midNode.attr( "align", "center" );
            
            if ( originalColumnArray[i].value > 0 ) {
                midNode.html( "<span style='color:green;'>◀</span>&nbsp;" );
            }
            
            midNode.append( "<span style='color:grey;'>" + (Math.round(originalColumnArray[i].value * 100) / 100) + "</span>" );
            
            if ( originalColumnArray[i].value < 0 ) {
                midNode.append( "&nbsp;<span style='color:red;'>▶</span>" );
            }
            
            sortedTableBody.append(newNode);
        }
      
        tableBody.replaceWith(sortedTableBody);
    },
    process : function () {
        if ( beScript.settings.kp_helper ) {
            beScript.forecasts.colorizeC11Diff();
        }
    }
};

beScript.organizer = {
    _parseMatchesPage : function( text ) {
        var doc = $(text);
        var resultsTable = $(".maintable", doc).eq(2);
        var lastMatchDetails = $("tr:eq(1) > td", resultsTable);
        
        var a = [];
        a.push(lastMatchDetails.eq(0).text().trim());
        
        var firstTeam = lastMatchDetails.eq(1).find("a");
        
        a.push(firstTeam.attr("href").substring(8)); //  /roster/
        a.push(firstTeam.parent().text().trim());
        
        var match = lastMatchDetails.eq(2).find("a");

        a.push(match.attr("href").substring(23)); //  /xml/tour/match.php?id=
        a.push(match.text());

        var secondTeam = lastMatchDetails.eq(3).find("a");
        a.push(secondTeam.attr("href").substring(8)); //  /roster/
        a.push(secondTeam.parent().text().trim());

        a.push(lastMatchDetails.eq(4).text().trim());
        
        var teamLitId = beScript.Util.checkByRegExp( $( "input[name='ShortName']:eq(0)", doc ).attr("value"), /(\w{3})\s.(\d+)./ )[1];
        a.push(teamLitId);
        
        var teamMoney = beScript.Util.checkByRegExp( $( "input[name='Money']:eq(0)", doc ).attr("value"), /([^\"/*"*/]+)/ )[0];
        a.push(teamMoney);
        
        beScript.log(a);
        
        return a;
    },
    // 0 - date
    // 1 - first_team_id
    // 2 - first_team_name
    // 3 - match_id
    // 4 - match_result
    // 5 - second_team_id
    // 6 - second_team_name
    // 7 - tour_name
    // 8 - my_team_id
    // 9 - team_money
    _addLastMatchesResults : function( team, result ) {
        var tablerow = $("td:contains('" + team.name + "')", $(".maintable")).parent();
        
        var isHost = false;

        if ( result[8] == result[1] ) {
            isHost = true;
        }
        
        var matchresult = 1; // -1 - lost; 0 - draw; 1 - win
        var scores = result[4].split( ":" );
        var color = "green";

        if ( scores[0] == scores[1] ) {
            matchresult = 0;
            color = "grey";
        } else if ((isHost && scores[0] < scores[1]) || (!isHost && scores[0] > scores[1])) {
            matchresult = -1;
            color = "red";
        }
        
        tablerow.append( "<td align=\"center\"><a href=/matches/" + result[3] + "><div style=\"color:" + color + ";\">" + result[4] + "</div></a></td>" );
    },
    _getLastMatchResultForTeam : function( team ) {
        $.ajax({
            url: "/xml/players/roster.php?act=allmatches&id=" + team.id,
            success: function(data) {
                var a = beScript.organizer._parseMatchesPage(data);   

                beScript.Util.serialize( "organizer.team." + team.id, a.join("|") );
                beScript.organizer._addLastMatchesResults( team, a );
            }
        });
    },
    addLastMatchesResults : function() {
        var _teams = beScript.getMyTeams();
        
        if ( _teams ) {
            var rightCell = $( "td[background='/images/mainarea/right/welcome-bk2.gif']" );
            var isVip = (beScript.Util.checkByRegExp( rightCell.text(), /Опция\sдоступна\sтолько\sVIP-пользователям/ ) == null);

            if (!isVip) {
                var str = '<table class="maintable" border="0" width="100%" bgcolor="#D0D0D0" cellspacing="1" cellpadding="3">'
                                + '<thead style="font-size: 11px;"><tr bgcolor="#D3E1EC" align="center"><th><b>Команда</b></th></thead>'
                                + '<tbody>';
                var cnt = 0;
                
                for ( var i in _teams ) {
                    str += '<tr bgcolor="' + ((cnt%2 == 0)?"#ffffff":"#EEF4FA") + '"><td>' + _teams[i].name + '</td></tr>'
                    cnt++;
                }
                                
                str += '</tbody></table><br/>';
                
                $("> table>tbody>tr>td", rightCell).prepend(str);
            }
        
            var tableheader = $('tr[bgcolor="#D3E1EC"][align="center"]');

            tableheader.append("<td><span title=\"Результат последнего матча\"><b>Последний матч</b></span></td>");
            var tmp = beScript.Util.deserialize( "organizer.team." + beScript.activeTeamId );
            var activeTeamMoney = parseInt($( "a[href='/finances/report.php']", $( "#beScript_td" ).next()).text().replace(/\./g, ''));
            var needUpdate = tmp && (activeTeamMoney != tmp.split("|")[9]);
            var mainTable = $(".maintable");
            
            for ( var i in _teams ) {
                var t = beScript.Util.deserialize( "organizer.team." + _teams[i].id );
                var teamtablerow = $("td:contains('" + _teams[i].name + "')", mainTable).parent();//$("tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA'] > td:contains('" + _teams[i].name + "')").eq(0);
                var teamMoney = -1;
                
                if (isVip) {
                    teamMoney = teamtablerow.children().eq(2).text().replace(/[\.\s]/g,'');
                }

                if ( (isVip && (t && teamMoney == t.split("|")[9])) || (!isVip && !needUpdate) ) {
                    beScript.organizer._addLastMatchesResults( _teams[i], t.split("|") );
                } else {
                    beScript.log("Getting last match result for team " + _teams[i].name);
                    beScript.organizer._getLastMatchResultForTeam( _teams[i] );
                }
            }
            
            beScript.__teams = _teams;
        }
    },
    process : function() {
        if (beScript.hrefAction == "teamstatistics") {
            if ( beScript.settings.last_matches_in_organizer ) {
                beScript.organizer.addLastMatchesResults();
            }
        }
    }
};

beScript.roster = {
    makeBonusPointsClickable : function(playersTable) {
        $( "a[href*='act=bonus']", playersTable ).each(function() {
            var bonusA = $(this);
            var td = bonusA.parent().parent().parent();
            var playerId = parseInt(beScript.Util.checkByRegExp( $(this).attr( "href" ), /(\d+)/ )[1]);
            
            td.qtip({
                id : 'beScript_act_bonus' + playerId,
                position: {
                    my : 'left center',  // Position my top left...
                    at : 'right center', // at the bottom right of...
                },
                hide: { 
                    delay : 200,
                    fixed : true
                },
                show: { 
                    delay : 200,
                    solo : true,
                    effect: function(offset) {
                        $(this).slideDown(100);
                    }
                },
                events: {
                    show: function(event, api) {
                        var currteamid = $( "input[name='id']" ).attr( "value" );
                        var team = beScript.getMyTeams()[currteamid];
                        var player = team.players[playerId];
                        var value = $("<table/>").append( "<tbody/>" );
                        var isGk = (player.primaryPosition == 'Gk');
                        var overallBonusLevel = 0;
                        beScript.log( player.bonuses );
                        
                        for ( var i in player.bonuses ) {
                            if ( i == 'str' ) continue;
                            overallBonusLevel += parseInt(player.bonuses[i], 10);
                        }
                        
                        beScript.log(overallBonusLevel);

                        for (var k in beScript.bonusesByAbbr ) {
                            var bonus = beScript.bonusesByAbbr[k];
                            
                            if ( player.bonuses[bonus.abbr] == 5 ) {
                                continue;
                            }

                            if ( (isGk && bonus.gk) || (!isGk && !(bonus.fpl === false)) ) {
                                var a = $( "<a href='javascript:void(" + bonus.id + ")'/>" );
                                a.text( bonus.name );

                                a.click(function() {
                                    var bns = beScript.bonuses[beScript.Util.checkByRegExp( $(this).attr( "href" ), /(\d+)/ )[1]];
                                    api.hide();
                                    api.destroy();
                                    $.ajax({
                                        type: "POST",
                                        url: "/xml/players/info.php?type=players/profile&act=bonus",
                                        data: "step=1&oldact=bonus&act=bonus&NewBonus=" + bns.id + "&type=players/profile&firstpage=/xml/players/info.php?act=bonus&id=" + playerId,
                                        success: function( data ) {
                                            $.ajax({
                                                type: "GET",
                                                url: "/xml/players/info.php?act=bonus&id=" + playerId,
                                                success: function( data ) {
                                                    player.bonusPoints -= player.nextBonusPoints;
                                                    player.nextBonusPoints = beScript.bonuses.nextBonus( overallBonusLevel + 1 );

                                                    if ( player.bonuses[bns.abbr] ) {
                                                        player.bonuses[bns.abbr] += 1;
                                                    } else {
                                                        player.bonuses[bns.abbr] = 1;
                                                    }
                                                    
                                                    player.bonuses.str = beScript.bonuses.createBonusStr( player.bonuses );
                                                    bonusA.parent().html( player.bonusPoints + "(" + player.nextBonusPoints + ")" );
                                                    td.prev().html( "<center>" + player.bonuses.str + "</center>" );
                                                    var teams = beScript.getMyTeams();
                                                    teams[currteamid].players[playerId] = player;
                                                    beScript.saveMyTeams( teams );
                                                }
                                            });
                                        }
                                    });
                                });
                                
                                var val = $("<tr/>").append( $("<td/>").append(a) );
                                value.append( val );
                            }
                        }
                        
                        api.set('content.text', value);
                        api.set('content.title.text', "<table><tr><td style='width:20px'><img src='/images/flag/" + player.country.id + ".gif'/></td><td style='padding-bottom:4px'><a ' href='/players/" + player.id + "'>" + player.name + "</a></td></tr></table>" );
                    }
                },
                content : {
                    title : "-",
                    text : "-"
                },
                style: {
                    classes: 'ui-tooltip-dark ui-tooltip-shadow ui-tooltip-bonus',
                }                    
            });
        });
    },
    addPlayersTips : function(playersTable, currteamid) {
        var team = beScript.getMyTeams()[currteamid];
        
        if ( team ) {
            var playersRows = $( "tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA']", $( "tbody", playersTable ) );
            
            playersRows.each(function(i) {
                var fields = $( "td", $(this) );
                var playerId = parseInt(beScript.Util.checkByRegExp( $( "a", fields.eq(1) ).attr( "href" ), /(\d+)/ )[1]);

                fields.eq(1).qtip({
                    id : 'beScript' + playerId,
                    position: {
                        my : 'left center',  // Position my top left...
                        at : 'right center', // at the bottom right of...
                    },
                    hide: { 
                        delay : 200,
                        fixed : true
                    },
                    show: { 
                        delay : 200,
                        solo : true,
                        effect: function(offset) {
                            $(this).slideDown(100);
                        }
                    },
                    events: {
                        show: function(event, api) {
                            var player = team.players[playerId];
                            var value = $.tmpl( "playerDetailsTemplate", player );
                            api.set('content.text', value);
                            api.set('content.title.text', "<table><tr><td style='width:20px'><img src='/images/flag/" + player.country.id + ".gif'/></td><td style='padding-bottom:4px'><a ' href='/players/" + player.id + "'>" + player.name + "</a></td></tr></table>" );
                        }
                    },
                    content : {
                        title : "-",
                        text : "-"
                    },
                    style: {
                        classes: 'ui-tooltip-dark ui-tooltip-shadow ui-tooltip-player',
                        width:500
                    }                    
                });
            });
        }
    },
    makeTeamInfoLinks : function( currteamid ) {
        var division = $("input[name='Division']").attr( "value" );
        if ( division ) {
            var divisionId = beScript.Util.checkByRegExp(division, /division=(\d+)/)[1];
            var powerSpan = $("input[name='Power']").next();
            powerSpan.wrap( "<a href='http://www.butsa.ru/xml/ratings/ratings.php?class=1&id=1&Division=" + divisionId + "' />" );
            var power11Span = $("input[name='Power11']").next();
            power11Span.wrap( "<a href='http://www.butsa.ru/xml/ratings/ratings.php?class=1&id=28&Division=" + divisionId + "' />" );
            var moneyInput = $("input[name='Money']");
            if (moneyInput.attr('value') != '0') {
                var moneytd = moneyInput.parent();
                var money = moneytd.text();
                moneytd.empty();
                moneytd.append(moneyInput);
                moneyInput.after( "<a href='http://www.butsa.ru/xml/ratings/ratings.php?class=1&id=6&Division=" + divisionId + "'>" + money + "</a>" );
            }
            var visRatSpan = $("input[name='VisRat']").next();
            visRatSpan.wrap( "<a href='http://www.butsa.ru/xml/ratings/ratings.php?class=1&id=29&Division=" + divisionId + "' />" );
            var playersSpan = $("input[name='Players']").next();
            playersSpan.wrap( "<a href='http://www.butsa.ru/xml/ratings/ratings.php?class=1&id=3&Division=" + divisionId + "' />" );
            
            var stadiumSpan = $("input[name='Stadium']").next();
            stadiumSpan.wrap( "<a href='http://www.butsa.ru/xml/ratings/ratings.php?class=1&id=7&Division=" + divisionId + "' />" );
        }
    },
    addPricesLink : function(currteamid) {
        var division = $("input[name='Division']").attr( "value" );
        if ( division ) {
            var divisionId = beScript.Util.checkByRegExp(division, /division=(\d+)/)[1];
            var stadiumSpan = $("input[name='Stadium']").next();
            
            if ( beScript.activeTeamId == parseInt(currteamid) ) {
                var dollarIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAADySURBVDhPlZPbDYJAEEW1AuxAO9AOtAQ6gD8+jRVoB/pLF3YgHWgH2oF2oPeQmWSzbBYkuWF3mTk7L+azxNO27ULHpXS0z4emaa4p28GZnDfSU/pG4mw1CpHR3RzfBuKNAN6yALvdby6173CSKgMAJ730o4/bIGxS6QGjYbuBjIsA8NAaTQcAksM5Kh75XyYVMIgkhnhd6n/SWVpHiMA7A2i8lUEkdIBCUlCPwodrGIyMdtJJ6qfOWtjZGhCQLMD7jWHtAHovfQxQ5eaANvrUAWH9Mvm+GJvGdQTx3PkX1pO6YAO11xsnRGr5m1Nkq0F2En/PpBYe7WbCLQAAAABJRU5ErkJggg==";
                var img = $( "<img style='margin-left:3px;margin-right:5px' name='beScript_ticket_prices' height='10' src='" + dollarIcon + "' />" );
                stadiumSpan.before( img );
                img.wrap( "<a href='http://butsa.ru/stadium/?act=tickets' target='_blank' />" );
            }
        }
    },
    addRepairLinks : function() {
        var buildingsTable = $(".maintable:eq(2)").parents("table:eq(0)").nextAll("table:eq(0)");
        var header = $( ".header", buildingsTable );
        var content = $( "tr[bgcolor='ffffff']" );
        var repairImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAAsRAAALEQF/ZF+RAAAACXZwQWcAAAAMAAAADADOpTJ+AAABpElEQVQoz3WQv6tScRjGn/f99kO6ZS5+7+hgIYRBw3HQ5CwqCE2SQ4NUo6vgIIIt/QP9AY1FuIg4XAkaAgMHuQ7G4RANqZQo5xwhIbmK8rZ4zKXP+vJ5eJ+HAICIFDPv4/H4w2Aw+Hi9Xt8cDodvReQPAAIg8CEiAGAASKfTz9vttti2LcVi8QOA4OH+D6UURyKRR0qpAAAkk8lXg8FAer2ehMPhF4fQo8WBQOBOuVz+aJrmawBYLBY/iAjT6XTrOM4GgBKR40vXtNapVCqlTdOstFqtZDQava+1xmg0ug7gioj2B2nvS7dyudw7y7JkuVzuZ7OZjMfj3WQykWq1+pWZ7/nDnJY+y2Qy70ul0mUikfjU7XZ3nuftPM+TWq1mEVGMiI6S3+mMiKIA7hqG8cayLHFd92q1Wkm9Xv8O4MHpWERExMyklAKAG4VC4cJxHPE8b7PdbqXRaHxjZkOdSiICEWFm3tm2/Vkp9SSfz583m81NNps9d103dir4CAAF4He/37/UWj+NxWK35/M5Op3OL/wPv2AoFHpWqVR+GobxBcDLv0SWqPpsyqlzAAAAAElFTkSuQmCC";
        var team = beScript.getMyTeams()[beScript.activeTeamId];
        
        var buildingsToFix = {};
        var toFix = false;
        var date = new Date();
        var utcDate = date.getTime() - (date.getTimezoneOffset() * 60000);
        
        $( "td:even", content ).each( function(i) {
            var links = $( "a", this );
            
            links.each(function() {
                $this = $(this);
                var id = parseInt(beScript.Util.checkByRegExp( $this.attr( "href" ), /\?id=(\d+)/ )[1]);
                var building = team.buildings[id];
                
                $this.attr( 'id', 'beScript_repair_a_id' + id );

                if ( building.condition < 100 ) {
                    toFix = true;
                    $this.css( 'color', 'A70000' );
beScript.log( "!!!!" + utcDate + "  " + building.repairDate );
                    var diff = ((utcDate - building.repairDate) / 1000 / 60 / 60 / 24);
                    var daysLN = Math.floor((utcDate - building.lastNotification) / 1000 / 60 / 60 / 24);
                    var days = Math.floor(diff);
                    var hrs = Math.floor((diff - days) * 24);
                    
                    if ( days >= 11 && (daysLN >= 1 || building.lastNotification == undefined) &&  beScript.settings.helpers_repair_reminder !== false ) {
                        var btf = buildingsToFix[days] || "";
                        btf += building.name + " - " + building.condition + "%<br />";
                        buildingsToFix[days] = btf;
                        beScript.__teams[beScript.activeTeamId].buildings[id].lastNotification = utcDate;
                    }
                    
                    if ( beScript.settings.helpers_fast_repair !== false ) {
                        var content = building.condition + "%. Ремонт: " + days + " дней " + hrs + " часов назад."
                        var img = $( "<img style='margin-left:3px;margin-right:5px' name='beScript_repairImage_" + id + "' height='10' src='" + repairImage + "' />" );
                        $this.before( img );

                        img.qtip({
                            position: {
                                my: 'right center',
                                at: 'left center',
                            },
                            content : {
                                text : content
                            },
                            style: {
                                classes: 'ui-tooltip-dark ui-tooltip-shadow',
                            },
                            show: {
                                delay: 10
                            },
                            hide: {
                                delay: 10
                            },
                        });
                    }
                }
            });
        });

        if ( toFix && beScript.settings.helpers_repair_reminder !== false ) {
            $( "td:eq(0)", header ).prepend( "<img name='beScript_repairImage_all' height='10' src='" + repairImage + "' />&nbsp;&nbsp;" );
            var str = "";
            for ( var days in buildingsToFix ) {
                str += "<span>Последний ремонт " + days + " дней назад:</span><br><br>";
                str += "<span>" + buildingsToFix[days] + "</span>";
            }
            
            createGrowl( str, "Требуется ремонт!" );
            beScript.saveMyTeams( beScript.__teams );
        }
        
        if ( beScript.settings.helpers_fast_repair !== false ) {
            var repairImages = $( "img[name^='beScript_repairImage']", buildingsTable );
            
            repairImages.hover(function() {
                    $(this).css('cursor','pointer');
                }, function() {
                    $(this).css('cursor','auto');
                });
                
            repairImages.click( function() {
                var id = parseInt( (beScript.Util.checkByRegExp( $(this).attr( "name" ), /\d+/ )||["-1"])[0], 10 );
                var addAct = "";
                var textId = "&BuildingID=" + id + "&id=" + id;
                
                if ( id == -1 ) {
                    addAct = "all";
                    textId = "";
                }
                
                var image = $(this);
                var url = "/xml/team/buildings.php?type=team/buildings&act=repair" + addAct + ((id == -1)?"2":"");
                
                beScript.log( url );
                $.ajax({
                    type: "POST",
                    url: url,
                    data: "step=1&type=team/buildings&act=repair" + addAct + ((id == -1)?"2":"") + "&oldact=repair" + addAct + textId,
                    success: function(data) {
                        if ( id != -1 ) {
                            var building = team.buildings[id];

                            if ( $( "img[src='http://butsa.ru/images/icons/ok.gif']", data ).length ) {
                                beScript.__teams[beScript.activeTeamId].buildings[id].condition = 100;
                                var dt = new Date();
                                beScript.__teams[beScript.activeTeamId].buildings[id].repairDate = dt.getTime() - (dt.getTimezoneOffset() * 60000);
                                
                                beScript.saveMyTeams( beScript.__teams );
                                
                                $( '#beScript_repair_a_id' + id, buildingsTable ).css( 'color', '' );
                                image.remove();
                                createGrowl( "Постройка " + building.name + " отремонтирована.", "Постройка отремонтирована" );
                            } else {
                                createGrowl( "Постройка " + building.name + " не может быть отремонтирована, так как на счету команды недостаточно средств.", "Невозможно отремонтировать постройку" );
                            }
                        } else {
                            if ( $( "img[src='http://butsa.ru/images/icons/ok.gif']", data ).length ) {
                                for ( var buildingId in team.buildings ) {
                                    var building = team.buildings[buildingId];
                                    var dt = new Date();
                                    var repairDate = dt.getTime() - (dt.getTimezoneOffset() * 60000);
                                    
                                    if ( building.condition < 100 ) {
                                        beScript.__teams[beScript.activeTeamId].buildings[buildingId].condition = 100;
                                        beScript.__teams[beScript.activeTeamId].buildings[buildingId].repairDate = repairDate;
                                    }
                                    
                                    $( "[id^='beScript_repair_a_id']", buildingsTable ).css( 'color', '' );
                                    repairImages.remove();
                                }
                                
                                beScript.saveMyTeams( beScript.__teams );
                                createGrowl( "Все постройки отремонтированы.", "Все постройки отремонтированы" );
                            } else {
                                createGrowl( "Постройки не могут быть отремонтированы, так как на счету команды недостаточно средств.", "Невозможно отремонтировать постройки" );
                            }
                        }
                    }
                });
            });        
        }
    },
    updateHistoryPage : function() {
        var historyTable = $(".maintable").eq(2);
        
        var historyRows = $( "tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA']", $( "tbody", historyTable ) );
        var index = 0;
        var dates = [];
        var len = historyRows.size();
        
        historyRows.each(function(i) {
            var self = $(this);
            var fields = $( "td", self );
            var dateStr = fields.eq(0).text().trim();
            var name = fields.eq(1).text().trim();
            if ( i == 0 ) {
                dates.push(dateStr);
            }
            
            if ( i != len && i != 0 ) {
                dates[dates.length - 1] = dateStr + " - " + dates[dates.length - 1];
            }
            
            dates.push(dateStr);
            
            if (name == "свободный клуб" && i != 0) {
                dates.splice( dates.length - 2, 1 );
                self.remove();
            } else {
                self.attr( "bgcolor", (index % 2 == 0)?"#ffffff":"#EEF4FA" );
                index++;
            }
        });
        
        dates.pop();
        
        historyRows = $( "tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA']", $( "tbody", historyTable ) );

        historyRows.each(function(i) {
            var self = $(this);
            var fields = $( "td", self );
            fields.eq(0).text(dates[i]);
            
            var datesStrs = dates[i].split( " - " );
            var date1, date2;
            var date1Comps = datesStrs[0].split( "-" );
            date1 = Date.UTC( parseInt(date1Comps[0], 10), parseInt(date1Comps[1], 10) - 1, parseInt(date1Comps[2], 10) );
            
            if ( datesStrs[1] ) {
                var date2Comps = datesStrs[1].split( "-" );
                date2 = Date.UTC( parseInt(date2Comps[0], 10), parseInt(date2Comps[1], 10) - 1, parseInt(date2Comps[2], 10) );
            } else {
                date2 = new Date().getTime();
            }
            
            var diffDate = new Date(Math.abs( date2 - date1 ));
            beScript.log( new Date(date1) + "  -  " + new Date(date2) + "  =  " + diffDate );
            var years = diffDate.getFullYear() - 1970;
            var months = diffDate.getMonth();
            var days = diffDate.getDate();
            
            var yearsStr = (years > 0)?years:"";
            
            if ( years == 1 ) {
                yearsStr += " год ";
            } else if ( years >= 2 && years <= 4 ) {
                yearsStr += " года ";
            } else if ( years > 4 ) {
                yearsStr += " лет ";
            }

            var monthsStr = (months > 0)?months:"";
            
            if ( months == 1 ) {
                monthsStr += " месяц ";
            } else if ( months >= 2 && months <= 4 ) {
                monthsStr += " месяца ";
            } else if ( months > 4 ) {
                monthsStr += " месяцев ";
            }

            var daysStr = (days > 0)?days:"";
            var lastDig = days % 10;
            
            if ( lastDig == 1 && days != 11 ) {
                daysStr += " день ";
            } else if ( lastDig >= 2 && lastDig <= 4 && (days < 10 || days > 20) ) {
                daysStr += " дня ";
            } else {
                daysStr += " дней ";
            }
            
            var tipStr = yearsStr + monthsStr + daysStr;
            
            self.qtip({
                position: {
                    my: 'right center',
                    at: 'left center',
                },
                content : {
                    text : tipStr
                },
                style: {
                    classes: 'ui-tooltip-dark ui-tooltip-shadow',
                },
                show: {
                    delay: 10
                },
                hide: {
                    delay: 10
                },
            });
        });
    },
    process : function() {
        var playersTable = $(".maintable").eq(2);
        
        if ( beScript.settings.sorts_roster && !(beScript.hrefAction in oc(["allmatches", "history"]) ) ) {
            var _headers = { 
                3: { sorter:'beScript.sorter.positions' },
            };
            var defSort = [3, 0];
            var defName = "roster";
            
            if ( beScript.hrefAction == "exp" ) {
                $.extend( true, _headers, {    
                    10: { sorter:'digit' } 
                });
            } else if ( beScript.hrefAction == "parameters" ) {
                $.extend( true, _headers, {
                    10: { sorter:'digit' },
                    11: { sorter:'digit' },
                    12: { sorter:'digit' },
                });
            } else if ( beScript.hrefAction == "stats" ) {
                $.extend( true, _headers, {
                    9: { sorter:'digit' },
                    10: { sorter:'digit' },
                    11: { sorter:'digit' },
                });
            } else if ( beScript.hrefAction == "abilities" ) {
                $.extend( true, _headers, {
                    6: { sorter:'digit' },
                    7: { sorter:'digit' },
                    8: { sorter:'digit' },
                    9: { sorter:'digit' },
                    10: { sorter:'digit' },
                    11: { sorter:'digit' },
                    12: { sorter:'digit' },
                    13: { sorter:'digit' },
                });
            } else if ( beScript.hrefAction == "my" ) {
                _headers = {
                    0: { sorter:'digit' },
                    5: { sorter:'beScript.sorter.positions' },
                    6: { sorter:'digit' },
                    7: { sorter:'digit' },
                    8: { sorter:'digit' },
                    9: { sorter:'digit' },
                };
                var defSort = [0, 1];
                defName = "roster_my_first";
                beScript.Util.makeTableSortable( "roster_my_second", $(".maintable").eq(3), _headers, defSort, 1 );
            } else {
                $.extend( true, _headers, {
                    12: { sorter:'digit' }
                });
            }

            beScript.Util.makeTableSortable( defName, playersTable, _headers, defSort, 1 );
        }
        
        var currteamid = $( "input[name='id']" ).attr( "value" );

        if ( beScript.settings.links_in_roster ) {
            beScript.roster.makeTeamInfoLinks( currteamid );
        }        
            
        if ( beScript.hrefAction == "history" && beScript.settings.history_free_club_remover !== false ) {
            beScript.roster.updateHistoryPage();
        }

        if ( !(beScript.hrefAction in oc(["my", "allmatches"])) ) {
            if ( beScript.settings.helpers_profile && beScript.hrefAction != "history" ) {
                beScript.roster.addPlayersTips(playersTable, currteamid);
            }
            
            if ( beScript.settings.helpers_bonuses ) {
                beScript.roster.makeBonusPointsClickable(playersTable);
            }

            if ( (beScript.settings.helpers_fast_repair !== false || beScript.settings.helpers_repair_reminder !== false) && beScript.activeTeamId == parseInt(currteamid) ) {
                GM_wait( 'beScript.__teams[beScript.activeTeamId].buildings.status == 3', beScript.roster.addRepairLinks, beScript );
            }
            
            if (beScript.settings.helpers_prices_link !== false && beScript.activeTeamId == parseInt(currteamid)) {
                beScript.roster.addPricesLink(currteamid);
            }
        }
    }
};

beScript.buildings = {
    process : function() {
        beScript.reloadBuildings( $(document) );
    }
};

beScript.stadium = {
    process : function() {
        beScript.reloadStadium( $(document) );
    }
};

beScript.tournaments = {
    process : function() {
        if ( beScript.settings.sorts_tournament_table && beScript.Util.checkLocation( "act=standings" ) ) {
            var table = $(".maintable");
            var _headers = { 
                1: { sorter:false },
                2: { sorter:false },
                8: { sorter:"digit" },
            };
            
            beScript.Util.makeTableSortable( "tournaments", table, _headers, [0, 0], 0 );
        } else if (beScript.settings.sorts_tournament_table && (beScript.Util.checkLocation( "act=home" ) || beScript.Util.checkLocation( "act=guest" ))) {
            var table = $(".maintable");
            var _headers = { 
                1: { sorter:false },
//                2: { sorter:false },
                7: { sorter:"digit" },
            };
            
            beScript.Util.makeTableSortable( "tournaments", table, _headers, [0, 0], 0 );
        }
    }
};

beScript.club = {
    best11ToPsycho : function( table ) {
        var mainButton = $( "input[type='submit']", table );
        var processbest11ToPsychoButton = function() {
            this.disabled = true;
            $(this).attr( "class", "disabledbutton" );
            var players = beScript.getMyTeams()[beScript.activeTeamId].players;
            var bestEleven = {};
            var playersPower = [];
            
            for ( var id in players ) {
                if ( players[id].power ) {
                    playersPower.push( {id:id, power:players[id].power} );
                }
            }
            
            playersPower.sort( function(player1, player2) {
                if ( player1.power == player2.power ) return 0;
                return (player1.power > player2.power)?-1:1;
            });
            
            for ( var i = 0; i < 11; i++ ) {
                bestEleven[playersPower[i].id] = players[playersPower[i].id];
            }
            
            var trs = $( "tbody > tr" , table );
            
            trs.each( function() {
                var tr = $(this);
                var tds = $( "td", tr );
                var playerId = parseInt(beScript.Util.checkByRegExp( $( ">a", tds.eq(1) ).attr( "href" ), /\/(\d+)/ )[1]);
                var player = bestEleven[playerId];
                
                if ( player && parseInt(tds.eq(8).text().trim()) < 20 ) {
                    $( "input", tds.eq(11) ).attr( "checked", "checked" );
                } else {
                    $( "input", tds.eq(11) ).removeAttr( "checked" );
                }
            });
            
            var mb = mainButton[0];
            this.form.submit();
            mb.disabled = true;
            $(mainButton).attr( "class", "disabledbutton" );
        }
        
        mainButton.before( '<input type="button" id="beScript_best11ToPsycho" value="Отправить 11 лучших к психологу" class="button" style="margin-right:10px"/>' );
        $( "#beScript_best11ToPsycho", table ).click( processbest11ToPsychoButton );
    },
    process : function() {
        var table = $(".maintable").eq(0);
        if ( beScript.settings.sorts_club_table !== false ) {
            var _headers = { 
                3: { sorter:'beScript.sorter.positions' },
                9: { sorter:false },
            };
            
            try {
                beScript.Util.makeTableSortable( "club", table, _headers, [8, 0], 2 );
            } catch (e) {
                // ignoring the problem with a checkbox in header. 
            }

            // removing shit from a table
            $( "> tfoot > tr[class='header'] > td:last", table ).remove();
        }
        
        beScript.club.best11ToPsycho( table );
    }
};

beScript.ratings = {
    highlightMyTeam : function() {
        var table = $( ".center-table-1" );
        $.scrollTo(table);
        
        var myId = beScript.Util.checkByRegExp( $( ".autoten > b > a" ).attr( "href" ), /(\d+)/ )[1];
        $("a[href*='" + myId + "']", $(".maintable")).parent().parent().animate({
            backgroundColor: "#abcdef"
        }, 1500 );
    },
    process : function() {
        beScript.ratings.highlightMyTeam();
    }
};

beScript.playerProfile = {
    addMenuAndUpdatePlayerProgress : function() {
        var header = $( "table[bgcolor='D0D0D0'] > tbody > tr[class='header'][bgcolor='D3E1EC'] > td" );
        var menuDiv = $( "<div style='float:right;margin-right:6px'/>" ).hover(function() {
                $(this).css('cursor','pointer');
                $(this).css('color','black');
            }, function() {
                $(this).css('cursor','auto');
                $(this).css('color','');
            });
            
        var playerId = parseInt($( "input[name='id']" ).attr( "value" ));
        
        var menuSpan = $( "<span style='position:relative;top:2px;text-decoration:underline'>Настроить</span>" );
        menuDiv.append( menuSpan );
        header.prepend( menuDiv );

        var content = $( "<div />" );
        content.css( "color", "white" );
        
        var contentLeft = $("<div />");
        contentLeft.css( "float", "left" );
//        contentLeft.css( "background-color", "green" );

        var contentRight = $("<div />");
        contentRight.css( "float", "right" );
//        contentRight.css( "position", "relative" );
//        contentRight.css( "top", "25px" );
//        contentRight.css( "background-color", "blue" );
        
        var createNumericInputWithIdAndLabel = function( id, label, _function, labelStyle, inputStyle, settingName ) {
            var result = $( "<div id='" + id + "_div'/>" );
            result.attr( "style", "height:23px;");//background-color:red;border:1px solid black" );
            if ( !settingName ) {
                settingName = "playerProfile." + id;
            }
            
            result.append( "<label id='" + id + "_label' for='" + id + "' style='" + labelStyle + "'>" + label + "</label>", "<input style='" + inputStyle + "' id='" + id + "' value='" + eval("beScript.settings." + settingName) + "'/>" );
            
            $( "#" + id + "", result ).change(_function || function() {
                beScript.updateSetting( settingName, $(this).attr( "value" ) );
            });
            
            return result;
        };
        
        contentLeft.append( "<span style='font-size:12px'>Режим тренировок</span>" );
        var trainRegimeDiv = $( "<div id='train_regime_div' style='padding:3px;margin-bottom:7px;border:1px solid white' />" );
        trainRegimeDiv.append( "<input type='radio' id='train_regime_radio_min' name='train_regime_radio' value='1' /><label for='train_regime_radio_min'>Минимальные умения</label><br />" );
        trainRegimeDiv.append( "<input type='radio' id='train_regime_radio_queue' name='train_regime_radio' value='2' /><label for='train_regime_radio_queue'>По очереди</label><br />" );
        trainRegimeDiv.append( "<input type='radio' id='train_regime_radio_prop' name='train_regime_radio' value='3' /><label for='train_regime_radio_prop'>Пропорционально</label>" );
        
        var checkRadioByGroupId = function( id, inDiv ) {
            $( "input[name='" + id + "']", inDiv ).each( function() {
                if ( $(this).attr("value") == beScript.settings.playerProfile[id] ) {
                    $(this).attr("checked", "true");
                } else {
                    $(this).removeAttr("checked");
                }
            });
        }
        
        checkRadioByGroupId( "train_regime_radio", trainRegimeDiv );
        
        $( "input[name='train_regime_radio']", trainRegimeDiv ).change(function() {
            if ( $(this).attr("checked") ) {
                beScript.updateSetting( "playerProfile." + $(this).attr( "name" ), $(this).attr( "value" ) );
            }
        });
        
        contentLeft.append( trainRegimeDiv );
        
        contentLeft.append( "<span style='font-size:12px'>Получение опыта</span>" );
        var expGainDiv = $( "<div id='exp_gain_div' style='padding:3px;margin-bottom:7px;border:1px solid white' />" );
        expGainDiv.append( "<input type='radio' id='exp_gain_radio_champ' name='exp_gain_radio' value='" + (30*90) + "' checked /><label for='exp_gain_radio_champ' title='30 * 90 = 2700'>Чемпионат</label><br />" );
        expGainDiv.append( "<input type='radio' id='exp_gain_radio_friend' name='exp_gain_radio' value='" + (54*36) + "' /><label for='exp_gain_radio_friend' title='54 * 36 = 1944'>Товарищеские</label><br />" );
        expGainDiv.append( "<input type='radio' id='exp_gain_radio_champ_friend' name='exp_gain_radio' value='" + (30*90+54*36) + "' /><label for='exp_gain_radio_champ_friend' title='30 * 90 + 54 * 36 = 4644'>Чемпионат + Товарищеские</label><br/>" );
        expGainDiv.append( "<input type='radio' id='exp_gain_radio_none' name='exp_gain_radio' value='0'><label for='exp_gain_radio_none' title='0'>Не играет</label>" );
        expGainDiv.append( createNumericInputWithIdAndLabel( "exp_gain_radio", "Задать вручную: ", function() {
            var value = parseInt($(this).attr( "value" ));
            if ( value < 0 ) {
                $(this).attr( "value", 0 );
            }

            beScript.updateSetting( "playerProfile." + $(this).attr( "id" ), $(this).attr( "value" ) );
            checkRadioByGroupId( "exp_gain_radio", expGainDiv );
        }, "position:relative;top:3px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );


        checkRadioByGroupId( "exp_gain_radio", expGainDiv );
        
        $( "input[name='exp_gain_radio']", expGainDiv ).change(function() {
            if ( $(this).attr("checked") ) {
                beScript.updateSetting( "playerProfile." + $(this).attr( "name" ), $(this).attr( "value" ) );
            }
            
            $( "#exp_gain_radio" ).attr( "value", $(this).attr( "value" ) );
        });

        contentLeft.append( expGainDiv );

        contentLeft.append( "<span style='font-size:12px'>Тренировать пока</span>" );
        
        var numberOfTrainsDiv = $( "<div id='number_of_trains_div' style='padding:3px 3px 0px 7px;border:1px solid white' />" );
        numberOfTrainsDiv.append( createNumericInputWithIdAndLabel( "number_of_trains_train_num", "Количество тренировок: ", function() {
            var value = parseInt($(this).attr( "value" ));
            if ( value < -1 ) {
                $(this).attr( "value", -1 );
            }

            beScript.updateSetting( "playerProfile." + $(this).attr( "id" ), $(this).attr( "value" ) );
        }, "position:relative;bottom:2px;margin-right:5px;", "position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='number_of_trains_train_num']", numberOfTrainsDiv ).floatnumber("", 0);

        numberOfTrainsDiv.append( createNumericInputWithIdAndLabel( "number_of_trains_max_age", "Возраст меньше: ", function() {
            var value = $(this).attr( "value" );
            if ( value < 16 ) {
                $(this).attr( "value", 16 );
            }

            beScript.updateSetting( "playerProfile." + $(this).attr( "id" ), $(this).attr( "value" ) );
        }, "position:relative;top:4px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='number_of_trains_max_age']", numberOfTrainsDiv ).floatnumber("", 0);
        numberOfTrainsDiv.append( createNumericInputWithIdAndLabel( "number_of_trains_max_season", "Сезон меньше: ", function() {
            var value = $(this).attr( "value" );
            if ( value <= 0 ) {
                $(this).attr( "value", 1 );
            }

            beScript.updateSetting( "playerProfile." + $(this).attr( "id" ), $(this).attr( "value" ) );
        }, "position:relative;top:4px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='number_of_trains_max_season']", numberOfTrainsDiv ).floatnumber("", 0);

        contentLeft.append( numberOfTrainsDiv );
        
        contentRight.append( "<span style='font-size:12;'>Умения</span>" );
        
        var skillsDiv = $( "<div id='skills_div' style='padding:3px 3px 0px 7px;margin-bottom:7px;border:1px solid white' />" );
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_tckl", "Отбор: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_tckl']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_mrk", "Опека: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_mrk']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_drbl", "Дриблинг: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_drbl']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_brcv", "Прием мяча: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_brcv']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_edrnc", "Выносливость: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_edrnc']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_pass", "Пас: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_pass']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_shotPwr", "Сила удара: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_shotPwr']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_shotAcc", "Точность удара: ", null, "position:relative;bottom:2px;margin-right:5px;", "position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_shotAcc']", skillsDiv ).floatnumber(".", 2).blur();
        skillsDiv.append( createNumericInputWithIdAndLabel( "skills_all", "Все по: ", null, "position:relative;top:2px;margin-right:5px;", "float:right;position:relative;bottom:1px;border:1px solid black;width:50px;text-align:right" ) );
        $( "input[id='skills_all']", skillsDiv ).floatnumber(".", 2).blur();
        $( "input[id='skills_all']", skillsDiv ).change( function() {
            var value = $(this).attr( "value" );
            if ( value > 0 ) {
                $( "input[id^='skills_'][id!='skills_all']" ).attr( "value", value ).blur().change();
            }
        });
        
        skillsDiv.sortable({
            items: "div[id^='skills']:not(:last)",
            cancel: ':input'
        }).disableSelection();
        
        skillsDiv.find("input").bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function(e) {
            e.stopImmediatePropagation();
        });
        
        $("div[id^='skills']:not(:last),label:not(:last)", skillsDiv).hover(function() {
            $(this).css('cursor','move');
        }, function() {
            $(this).css('cursor','auto');
        });

        contentRight.append( skillsDiv );

        var expCalcDiv = $( "<div id='exp_calc_div' style='padding:3px;margin-bottom:7px;border:1px solid white'/>" );
        var expCalcLink = $( "<span id='exp_calc_link' style='color:white;text-decoration:underline'>Посчитать опыт за сезон</span>" );

        expCalcLink.click(function() {
            expCalcDiv.empty();
            expCalcDiv.append( $("<img height='12' src='data:image/gif;base64,R0lGODlh3AATAPQAACIiIszMzExMTFxcXGJiYlBQUFRUVEVFRTo6OkhISD09PTg4ODU1NTIyMlVVVU5OTjAwMC0tLURERCkpKSgoKEFBQSYmJkZGRj8/PysrKzw8PElJSVlZWSUlJWBgYGdnZyH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAA3AATAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFg8PwKIMHnLF63N2438f0mv1I2O8buXjvaOPtaHx7fn96goR4hmuId4qDdX95c4+RG4GCBoyAjpmQhZN0YGYFXitdZBIVGAoKoq4CG6Qaswi1CBtkcG6ytrYJubq8vbfAcMK9v7q7D8O1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQgDLAQGCQoLDA0QCwUHqfYSFw/xEPz88/X38Onr14+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdE/9chIeBgDoB7gjaWUWTlYAFE3LqzDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKwgcWABB5y1acFNZmEvXwoJ2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCLYMIFCzwLEprg84OsDus/tvqdezZf13Hvr2B9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebc3A8vjf5QWf15Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrAxAJoCDHbgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBBAJNv1DVV01MZdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJgxQCwT40PjfAV4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA00AqVB4hG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAAKAAEALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BAXHx/EoCzboAcdhcLDdgwJ6nua03YZ8PMFPoBMca215eg98G36IgYNvDgOGh4lqjHd7fXOTjYV9nItvhJaIfYF4jXuIf4CCbHmOBZySdoOtj5eja59wBmYFXitdHhwSFRgKxhobBgUPAmdoyxoI0tPJaM5+u9PaCQZzZ9gP2tPcdM7L4tLVznPn6OQb18nh6NV0fu3i5OvP8/nd1qjwaasHcIPAcf/gBSyAAMMwBANYEAhWYQGDBhAyLihwYJiEjx8fYMxIcsGDAxVA/yYIOZIkBAaGPIK8INJlRpgrPeasaRPmx5QgJfB0abLjz50tSeIM+pFmUo0nQQIV+vRlTJUSnNq0KlXCSq09ozIFexEBAYkeNiwgOaEtn2LFpGEQsKCtXbcSjOmVlqDuhAx3+eg1Jo3u37sZBA9GoMAw4MB5FyMwfLht4sh7G/utPGHlYAV8Nz9OnOBz4c2VFWem/Pivar0aKCP2LFn2XwhnVxBwsPbuBAQbEGiIFg1BggoWkidva5z4cL7IlStfkED48OIYoiufYIH68+cKPkqfnsB58ePjmZd3Dj199/XE20tv6/27XO3S6z9nPCz9BP3FISDefL/Bt192/uWmAv8BFzAQAQUWWFaaBgqA11hbHWTIXWIVXifNhRlq6FqF1sm1QQYhdiAhbNEYc2KKK1pXnAIvhrjhBh0KxxiINlqQAY4UXjdcjSJyeAx2G2BYJJD7NZQkjCPKuCORKnbAIXsuKhlhBxEomAIBBzgIYXIfHfmhAAyMR2ZkHk62gJoWlNlhi33ZJZ2cQiKTJoG05Wjcm3xith9dcOK5X51tLRenoHTuud2iMnaolp3KGXrdBo7eKYF5p/mXgJcogClmcgzAR5gCKymXYqlCgmacdhp2UCqL96mq4nuDBTmgBasaCFp4sHaQHHUsGvNRiiGyep1exyIra2mS7dprrtA5++z/Z8ZKYGuGsy6GqgTIDvupRGE+6CO0x3xI5Y2mOTkBjD4ySeGU79o44mcaSEClhglgsKyJ9S5ZTGY0Bnzrj+3SiKK9Rh5zjAALCywZBk/ayCWO3hYM5Y8Dn6qxxRFsgAGoJwwgDQRtYXAAragyQOmaLKNZKGaEuUlpyiub+ad/KtPqpntypvvnzR30DBtjMhNodK6Eqrl0zU0/GjTUgG43wdN6Ra2pAhGtAAZGE5Ta8TH6wknd2IytNKaiZ+Or79oR/tcvthIcAPe7DGAs9Edwk6r3qWoTaNzY2fb9HuHh2S343Hs1VIHhYtOt+Hh551rh24vP5YvXSGzh+eeghy76GuikU9FFEainrvrqrLfu+uuwxy777LTXfkIIACH5BAAKAAIALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BAWHB2l4CDZo9IDjcBja7UEhTV+3DXi3PJFA8xMcbHiDBgMPG31pgHBvg4Z9iYiBjYx7kWocb26OD398mI2EhoiegJlud4UFiZ5sm6Kdn2mBr5t7pJ9rlG0cHg5gXitdaxwFGArIGgoaGwYCZ3QFDwjU1AoIzdCQzdPV1c0bZ9vS3tUJBmjQaGXl1OB0feze1+faiBvk8wjnimn55e/o4OtWjp+4NPIKogsXjaA3g/fiGZBQAcEAFgQGOChgYEEDCCBBLihwQILJkxIe/3wMKfJBSQkJYJpUyRIkgwcVUJq8QLPmTYoyY6ZcyfJmTp08iYZc8MBkhZgxk9aEcPOlzp5FmwI9KdWn1qASurJkClRoWKwhq6IUqpJBAwQEMBYroAHkhLt3+RyzhgCDgAV48Wbgg+waAnoLMgTOm6DwQ8CLBzdGdvjw38V5JTg2lzhyTMeUEwBWHPgzZc4TSOM1bZia6LuqJxCmnOxv7NSsl1mGHHiw5tOuIWeAEHcFATwJME/ApgFBc3MVLEgPvE+Ddb4JokufPmFBAuvPXWu3MIF89wTOmxvOvp179evQtwf2nr6aApPyzVd3jn089e/8xdfeXe/xdZ9/d1ngHf98lbHH3V0LMrgPgsWpcFwBEFBgHmyNXWeYAgLc1UF5sG2wTHjIhNjBiIKZCN81GGyQwYq9uajeMiBOQGOLJ1KjTI40kmfBYNfc2NcGIpI4pI0vyrhjiT1WFqOOLEIZnjVOVpmajYfBiCSNLGbA5YdOkjdihSkQwIEEEWg4nQUmvYhYe+bFKaFodN5lp3rKvJYfnBKAJ+gGDMi3mmbwWYfng7IheuWihu5p32XcSWdSj+stkF95dp64jJ+RBipocHkCCp6PCiRQ6INookCAAwy0yd2CtNET3Yo7RvihBjFZAOaKDHT43DL4BQnsZMo8xx6uI1oQrHXXhHZrB28G62n/YSYxi+uzP2IrgbbHbiaer7hCiOxDFWhrbmGnLVuus5NFexhFuHLX6gkEECorlLpZo0CWJG4pLjIACykmBsp0eSSVeC15TDJeUhlkowlL+SWLNJpW2WEF87urXzNWSZ6JOEb7b8g1brZMjCg3ezBtWKKc4MvyEtwybPeaMAA1ECRoAQYHYLpbeYYCLfQ+mtL5c9CnfQpYpUtHOSejEgT9ogZ/GSqd0f2m+LR5WzOtHqlQX1pYwpC+WbXKqSYtpJ5Mt4a01lGzS3akF60AxkcTaLgAyRBPWCoDgHfJqwRuBuzdw/1ml3iCwTIeLUWJN0v4McMe7uasCTxseNWPSxc5RbvIgD7geZLbGrqCG3jepUmbbze63Y6fvjiOylbwOITPfIHEFsAHL/zwxBdvPBVdFKH88sw37/zz0Ecv/fTUV2/99SeEAAAh+QQACgADACwAAAAA3AATAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFh2cw8BQEm3T6yHEYHHD4oKCuD9qGvNsxT6QTgAkcHHmFeX11fm17hXwPG35qgnhxbwMPkXaLhgZ9gWp3bpyegX4DcG+inY+Qn6eclpiZkHh6epetgLSUcBxlD2csXXdvBQrHGgoaGhsGaIkFDwjTCArTzX+QadHU3c1ofpHc3dcGG89/4+TYktvS1NYI7OHu3fEJ5tpqBu/k+HX7+nXDB06SuoHm0KXhR65cQT8P3FRAMIAFgVMPwDCAwLHjggIHJIgceeFBg44eC/+ITCCBZYKSJ1FCWPBgpE2YMmc+qNCypwScMmnaXAkUJYOaFVyKLOqx5tCXJnMelcBzJNSYKIX2ZPkzqsyjPLku9Zr1QciVErYxaICAgEUOBRJIgzChbt0MLOPFwyBggV27eCUcmxZvg9+/dfPGo5bg8N/Ag61ZM4w4seDF1fpWhizZmoa+GSortgcaMWd/fkP/HY0MgWbTipVV++wY8GhvqSG4XUEgoYTKE+Qh0OCvggULiBckWEZ4Ggbjx5HXVc58IPQJ0idQJ66XanTpFraTe348+XLizRNcz658eHMN3rNPT+C+G/nodqk3t6a+fN3j+u0Xn3nVTQPfdRPspkL/b+dEIN8EeMm2GAYbTNABdrbJ1hyFFv5lQYTodSZABhc+loCEyhxTYYkZopdMMiNeiBxyIFajV4wYHpfBBspUl8yKHu6ooV5APsZjQxyyeNeJ3N1IYod38cgdPBUid6GCKfRWgAYU4IccSyHew8B3doGJHmMLkGkZcynKk2Z50Ym0zJzLbDCmfBbI6eIyCdyJmJmoqZmnBAXy9+Z/yOlZDZpwYihnj7IZpuYEevrYJ5mJEuqiof4l+NYDEXQpXQcMnNjZNDx1oGqJ4S2nF3EsqWrhqqVWl6JIslpAK5MaIqDeqjJq56qN1aTaQaPbHTPYr8Be6Gsyyh6Da7OkmmqP/7GyztdrNVQBm5+pgw3X7aoYKhfZosb6hyUKBHCgQKij1rghkOAJuZg1SeYIIY+nIpDvf/sqm4yNG5CY64f87qdAwSXKGqFkhPH1ZHb2EgYtw3bpKGVkPz5pJAav+gukjB1UHE/HLNJobWcSX8jiuicMMBFd2OmKwQFs2tjXpDfnPE1j30V3c7iRHlrzBD2HONzODyZtsQJMI4r0AUNaE3XNHQw95c9GC001MpIxDacFQ+ulTNTZlU3O1eWVHa6vb/pnQUUrgHHSBKIuwG+bCPyEqbAg25gMVV1iOB/IGh5YOKLKIQ6xBAcUHmzjIcIqgajZ+Ro42DcvXl7j0U4WOUd+2IGu7DWjI1pt4DYq8BPm0entuGSQY/4tBi9Ss0HqfwngBQtHbCH88MQXb/zxyFfRRRHMN+/889BHL/301Fdv/fXYZ39CCAAh+QQACgAEACwAAAAA3AATAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFh2fAKXsKm7R6Q+Y43vABep0mGwwOPH7w2CT+gHZ3d3lyagl+CQNvg4yGh36LcHoGfHR/ZYOElQ9/a4ocmoRygIiRk5p8pYmZjXePaYBujHoOqp5qZHBlHAUFXitddg8PBg8KGsgayxvGkAkFDwgICtPTzX2mftHW3QnOpojG3dbYkNjk1waxsdDS1N7ga9zw1t/aifTk35fu6Qj3numL14fOuHTNECHqU4DDgQEsCCwidiHBAwYQMmpcUOCAhI8gJVzUuLGThAQnP/9abEAyI4MCIVOKZNnyJUqUJxNcGNlywYOQgHZirGkSJ8gHNEky+AkS58qWEJYC/bMzacmbQHkqNdlUJ1KoSz2i9COhmQYCEXtVrCBgwYS3cCf8qTcNQ9u4cFFOq2bPLV65Cf7dxZthbjW+CgbjnWtNgWPFcAsHdoxgWWK/iyV045sAc2S96SDn1exYw17REwpLQEYt2eW/qtPZRQAB7QoC61RW+GsBwYZ/CXb/XRCYLsAKFizEtUAc+G7lcZsjroscOvTmsoUvx15PwccJ0N8yL17N9PG/E7jv9S4hOV7pdIPDdZ+ePDzv2qMXn2b5+wTbKuAWnF3oZbABZY0lVmD/ApQd9thybxno2GGuCVDggaUpoyBsB1bGGgIYbJCBcuFJiOAyGohIInQSmmdeiBnMF2GHfNUlIoc1rncjYRjW6NgGf3VQGILWwNjBfxEZcAFbC7gHXQcfUYOYdwzQNxo5yUhQZXhvRYlMeVSuSOJHKJa5AQMQThBlZWZ6Bp4Fa1qzTAJbijcBlJrtxeaZ4lnnpZwpukWieGQmYx5ATXIplwTL8DdNZ07CtWYybNIJF4Ap4NZHe0920AEDk035kafieQrqXofK5ympn5JHKYjPrfoWcR8WWQGp4Ul32KPVgXdnqxM6OKqspjIYrGPDrlrsZtRIcOuR86nHFwbPvmes/6PH4frrqbvySh+mKGhaAARPzjjdhCramdoGGOhp44i+zogBkSDuWC5KlE4r4pHJkarXrj++Raq5iLmWLlxHBteavjG+6amJrUkJJI4Ro5sBv9AaOK+jAau77sbH7nspCwNIYIACffL7J4JtWQnen421nNzMcB6AqpRa9klonmBSiR4GNi+cJZpvwgX0ejj71W9yR+eIgaVvQgf0l/A8nWjUFhwtZYWC4hVnkZ3p/PJqNQ5NnwUQrQCGBBBMQIGTtL7abK+5JjAv1fi9bS0GLlJHgdjEgYzzARTwC1fgEWdJuKKBZzj331Y23qB3i9v5aY/rSUC4w7PaLeWXmr9NszMFoN79eeiM232o33EJAIzaSGwh++y012777bhT0UURvPfu++/ABy/88MQXb/zxyCd/QggAIfkEAAoABQAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBIBAgGhKRyyWw6n9CodEqtWq/YrHY6ELQEBY5nwCk7xIWNer0hO95wziC9Ttg5b4ND/+Y87IBqZAaEe29zGwmJigmDfHoGiImTjXiQhJEPdYyWhXwDmpuVmHwOoHZqjI6kZ3+MqhyemJKAdo6Ge3OKbEd4ZRwFBV4rc4MPrgYPChrMzAgbyZSJBcoI1tfQoYsJydfe2amT3d7W0OGp1OTl0YtqyQrq0Lt11PDk3KGoG+nxBpvTD9QhwCctm0BzbOyMIwdOUwEDEgawIOCB2oMLgB4wgMCx44IHBySIHClBY0ePfyT/JCB5weRJCAwejFw58kGDlzBTqqTZcuPLmCIBiWx58+VHmiRLFj0JVCVLl0xl7qSZwCbOo0lFWv0pdefQrVFDJtr5gMBEYBgxqBWwYILbtxPsqMPAFu7blfa81bUbN4HAvXAzyLWnoDBguHIRFF6m4LBbwQngMYPXuC3fldbyPrMcGLM3w5wRS1iWWUNlvnElKDZtz/EEwaqvYahQoexEfyILi4RrYYKFZwJ3810QWZ2ECrx9Ew+O3K6F5Yq9zXbb+y30a7olJJ+wnLC16W97Py+uwdtx1NcLWzs/3G9e07stVPc9kHJ0BcLtQp+c3ewKAgYkUAFpCaAmmHqKLSYA/18WHEiZPRhsQF1nlLFWmIR8ZbDBYs0YZuCGpGXWmG92aWiPMwhEOOEEHXRwIALlwXjhio+BeE15IzpnInaLbZBBhhti9x2GbnVQo2Y9ZuCfCgBeMCB+DJDIolt4iVhOaNSJdCOBUfIlkmkyMpPAAvKJ59aXzTQzJo0WoJnmQF36Jp6W1qC4gWW9GZladCiyJd+KnsHImgRRVjfnaDEKuiZvbcYWo5htzefbl5LFWNeSKQAo1QXasdhiiwwUl2B21H3aQaghXnPcp1NagCqYslXAqnV+zYWcpNwVp9l5eepJnHqL4SdBi56CGlmw2Zn6aaiZjZqfb8Y2m+Cz1O0n3f+tnvrGbF6kToApCgAWoNWPeh754JA0vmajiAr4iOuOW7abQXVGNriBWoRdOK8FxNqLwX3oluubhv8yluRbegqGb536ykesuoXhyJqPQJIGbLvQhkcwjKs1zBvBwSZIsbcsDCCBAAf4ya+UEhyQoIiEJtfoZ7oxUOafE2BwgMWMqUydfC1LVtiArk0QtGkWEopzlqM9aJrKHfw5c6wKjFkmXDrbhwFockodtMGFLWpXy9JdiXN1ZDNszV4WSLQCGBKoQYHUyonqrHa4ErewAgMmcAAF7f2baIoVzC2p3gUvJtLcvIWqloy6/R04mIpLwDhciI8qLOB5yud44pHPLbA83hFDWPjNbuk9KnySN57Av+TMBvgEAgzzNhJb5K777rz37vvvVHRRxPDEF2/88cgnr/zyzDfv/PPQnxACACH5BAAKAAYALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BIUCwcMpO84OT2HDbm8GHLQjnn6wE3g83SA3DB55G3llfHxnfnZ4gglvew6Gf4ySgmYGlpCJknochWiId3kJcZZyDn93i6KPl4eniopwq6SIoZKxhpenbhtHZRxhXisDopwPgHkGDxrLGgjLG8mC0gkFDwjX2AgJ0bXJ2djbgNJsAtbfCNB2oOnn6MmKbeXt226K1fMGi6j359D69ua+QZskjd+3cOvY9XNgp4ABCQNYEDBl7EIeCQkeMIDAseOCBwckiBSZ4ILGjh4B/40kaXIjSggMHmBcifHky5gYE6zM2OAlzGM6Z5rs+fIjTZ0tfcYMSlLCUJ8fL47kCVXmTjwPiKJkUCDnyqc3CxzQmYeAxAEGLGJYiwCDgAUT4sqdgOebArdw507IUNfuW71xdZ7DC5iuhGsKErf9CxhPYgUaEhPWyzfBMgUIJDPW6zhb5M1y+R5GjFkBaLmCM0dOfHqvztXYJnMejaFCBQlmVxAYsEGkYnQV4lqYMNyCtnYSggNekAC58uJxmTufW5w55mwKkg+nLp105uTC53a/nhg88fMTmDfDVl65Xum/IZt/3/zaag3a5W63nll1dvfiWbaaZLmpQIABCVQA2f9lAhTG112PQWYadXE9+FtmEwKWwQYQJrZagxomsOCAGVImInsSbpCBhhwug6KKcXXQQYUcYuDMggrASFmNzjjzzIrh7cUhhhHqONeGpSEW2QYxHsmjhxpgUGAKB16g4IIbMNCkXMlhaJ8GWVJo2I3NyKclYF1GxgyYDEAnXHJrMpNAm/rFBSczPiYAlwXF8ZnmesvoOdyMbx7m4o0S5LWdn4bex2Z4xYmEzaEb5EUcnxbA+WWglqIn6aHPTInCgVbdlZyMqMrIQHMRSiaBBakS1903p04w434n0loBoQFOt1yu2YAnY68RXiNsqh2s2qqxuyKb7Imtmgcrqsp6h8D/fMSpapldx55nwayK/SfqCQd2hcFdAgDp5GMvqhvakF4mZuS710WGIYy30khekRkMu92GNu6bo7r/ttjqwLaua5+HOdrKq5Cl3dcwi+xKiLBwwwom4b0E6xvuYyqOa8IAEghwQAV45VvovpkxBl2mo0W7AKbCZXoAhgMmWnOkEqx2JX5nUufbgJHpXCfMOGu2QAd8eitpW1eaNrNeMGN27mNz0swziYnpSbXN19gYtstzfXrdYjNHtAIYGFVwwAEvR1dfxdjKxVzAP0twAAW/ir2w3nzTd3W4yQWO3t0DfleB4XYnEHCEhffdKgaA29p0eo4fHLng9qoG+OVyXz0gMeWGY7qq3xhiRIEAwayNxBawxy777LTXbjsVXRSh++689+7778AHL/zwxBdv/PEnhAAAIfkEAAoABwAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBIBAgGhKRyyWw6n9CodEqtWq/YrHY6ELQEhYLD4BlwHGg0ubBpuzdm9Dk9eCTu+MTZkDb4PXYbeIIcHHxqf4F3gnqGY2kOdQmCjHCGfpCSjHhmh2N+knmEkJmKg3uHfgaaeY2qn6t2i4t7sKAPbwIJD2VhXisDCQZgDrKDBQ8aGgjKyhvDlJMJyAjV1gjCunkP1NfVwpRtk93e2ZVt5NfCk27jD97f0LPP7/Dr4pTp1veLgvrx7AL+Q/BM25uBegoYkDCABYFhEobhkUBRwoMGEDJqXPDgQMUEFC9c1LjxQUUJICX/iMRIEgIDkycrjmzJMSXFlDNJvkwJsmdOjQwKfDz5M+PLoSGLQqgZU6XSoB/voHxawGbFlS2XGktAwKEADB0xiEWAodqGBRPSqp1wx5qCamDRrp2Qoa3bagLkzrULF4GCvHPTglRAmKxZvWsHayBcliDitHUlvGWM97FgCdYWVw4c2e/kw4HZJlCwmDBhwHPrjraGYTHqtaoxVKggoesKAgd2SX5rbUMFCxOAC8cGDwHFwBYWJCgu4XfwtcqZV0grPHj0u2SnqwU+IXph3rK5b1fOu7Bx5+K7L6/2/Xhg8uyXnQ8dvfRiDe7TwyfNuzlybKYpgIFtKhAgwEKkKcOf/wChZbBBgMucRh1so5XH3wbI1WXafRJy9iCErmX4IWHNaIAhZ6uxBxeGHXQA24P3yYfBBhmgSBozESpwongWOBhggn/N1aKG8a1YY2oVAklgCgQUUwGJ8iXAgItrWUARbwpqIOWEal0ZoYJbzmWlZCWSlsAC6VkwZonNbMAAl5cpg+NiZwpnJ0Xylegmlc+tWY1mjnGnZnB4QukMA9UJRxGOf5r4ppqDjjmnfKilh2ejGiyJAgF1XNmYbC2GmhZ5AcJVgajcXecNqM9Rx8B6bingnlotviqdkB3YCg+rtOaapFsUhSrsq6axJ6sEwoZK7I/HWpCsr57FBxJ1w8LqV/81zbkoXK3LfVeNpic0KRQG4NHoIW/XEmZuaiN6tti62/moWbk18uhjqerWS6GFpe2YVotskVssWfBOAHACrZHoWcGQwQhlvmsdXBZ/F9YLMF2jzUuYBP4a7CLCnoEHrgkDSCDAARUILAGaVVqAwQHR8pZXomm9/ONhgjrbgc2lyYxmpIRK9uSNjrXs8gEbTrYyl2ryTJmsLCdKkWzFQl1lWlOXGmifal6p9VnbQfpyY2SZyXKVV7JmZkMrgIFSyrIeUJ2r7YKnXdivUg1kAgdQ8B7IzJjGsd9zKSdwyBL03WpwDGxwuOASEP5vriO2F3nLjQdIrpaRDxqcBdgIHGA74pKrZXiR2ZWuZt49m+o3pKMC3p4Av7SNxBa456777rz37jsVXRQh/PDEF2/88cgnr/zyzDfv/PMnhAAAIfkEAAoACAAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBIBAgGhKRyyWw6n9CodEqtWq/YrHY6ELQEhYLDUPAMHGi0weEpbN7wI8cxTzsGj4R+n+DUxwaBeBt7hH1/gYIPhox+Y3Z3iwmGk36BkIN8egOIl3h8hBuOkAaZhQlna4BrpnyWa4mleZOFjrGKcXoFA2ReKwMJBgISDw6abwUPGggazc0bBqG0G8kI1tcIwZp51djW2nC03d7BjG8J49jl4cgP3t/RetLp1+vT6O7v5fKhAvnk0UKFogeP3zmCCIoZkDCABQFhChQYuKBHgkUJkxpA2MhxQYEDFhNcvPBAI8eNCx7/gMQYckPJkxsZPLhIM8FLmDJrYiRp8mTKkCwT8IQJwSPQkENhpgQpEunNkzlpWkwKdSbGihKocowqVSvKWQkIOBSgQOYFDBgQpI0oYMGEt3AzTLKm4BqGtnDjirxW95vbvG/nWlub8G9euRsiqqWLF/AEkRoiprX2wLDeDQgkW9PQGLDgyNc665WguK8C0XAnRY6oGPUEuRLsgk5g+a3cCxUqSBC7gsCBBXcVq6swwULx4hayvctGPK8FCwsSLE9A3Hje6NOrHzeOnW695sffRi/9HfDz7sIVSNB+XXrmugo0rHcM3X388o6jr44ceb51uNjF1xcC8zk3wXiS8aYC/wESaLABBs7ch0ECjr2WAGvLsLZBeHqVFl9kGxooV0T81TVhBo6NiOEyJ4p4IYnNRBQiYCN6x4wCG3ZAY2If8jXjYRcyk2FmG/5nXAY8wqhWAii+1YGOSGLoY4VRfqiAgikwmIeS1gjAgHkWYLQZf9m49V9gDWYWY5nmTYCRM2TS5pxxb8IZGV5nhplmhJyZadxzbrpnZ2d/6rnZgHIid5xIMDaDgJfbLdrgMkKW+Rygz1kEZz1mehabkBpgiQIByVikwGTqVfDkk2/Vxxqiqur4X3fksHccre8xlxerDLiHjQIVUAgXr77yFeyuOvYqXGbMrbrqBMqaFpFFzhL7qv9i1FX7ZLR0LUNdcc4e6Cus263KbV+inkAAHhJg0BeITR6WmHcaxhvXg/AJiKO9R77ILF1FwmVdAu6WBu+ZFua72mkZWMfqBElKu0G8rFZ5n4ATp5jkmvsOq+Nj7u63ZMMPv4bveyYy6fDH+C6brgnACHBABQUrkGirz2FwAHnM4Mmhzq9yijOrOi/MKabH6VwBiYwZdukEQAvILKTWXVq0ZvH5/CfUM7M29Zetthp1eht0eqkFYw8IKXKA6mzXfTeH7fZg9zW0AhgY0TwthUa6Ch9dBeIsbsFrYkRBfgTfiG0FhwMWnbsoq3cABUYOnu/ejU/A6uNeT8u4wMb1WnBCyJJTLjjnr8o3OeJrUcpc5oCiPqAEkz8tXuLkPeDL3Uhs4fvvwAcv/PDEU9FFEcgnr/zyzDfv/PPQRy/99NRXf0IIACH5BAAKAAkALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BIWCw/AoDziOtCHt8BQ28PjmzK57Hom8fo42+P8DeAkbeYQcfX9+gYOFg4d1bIGEjQmPbICClI9/YwaLjHAJdJeKmZOViGtpn3qOqZineoeJgG8CeWUbBV4rAwkGAhIVGL97hGACGsrKCAgbBoTRhLvN1c3PepnU1s2/oZO6AtzdBoPf4eMI3tIJyOnF0YwFD+nY8e3z7+Xfefnj9uz8cVsXCh89axgk7BrAggAwBQsYIChwQILFixIeNIDAseOCBwcSXMy2sSPHjxJE/6a0eEGjSY4MQGK86PIlypUJEmYsaTKmyJ8JW/Ls6HMkzaEn8YwMWtPkx4pGd76E4DMPRqFTY860OGhogwYagBFoKEABA46DEGBAoEBB0AUT4sqdIFKBNbcC4M6dkEEk22oYFOTdG9fvWrtsBxM23MytYL17666t9phwXwlum2lIDHmuSA2IGyuOLOHv38qLMbdFjHruZbWgRXeOe1nC2BUEDiyAMMHZuwoTLAQX3nvDOAUW5Vogru434d4JnAsnPmFB9NBshQXfa9104+Rxl8e13rZxN+CEydtVsFkd+vDjE7C/q52wOvb4s7+faz025frbxefWbSoQIAEDEUCwgf9j7bUlwHN9ZVaegxDK1xYzFMJH24L5saXABhlYxiEzHoKoIV8LYqAMaw9aZqFmJUK4YHuNfRjiXhmk+NcyJgaIolvM8BhiBx3IleN8lH1IWAcRgkZgCgYiaBGJojGgHHFTgtagAFYSZhF7/qnTpY+faVlNAnqJN0EHWa6ozAZjBtgmmBokwMB01LW5jAZwbqfmlNips4B4eOqJgDJ2+imXRZpthuigeC6XZTWIxilXmRo8iYKBCwiWmWkJVEAkfB0w8KI1IvlIpKnOkVpqdB5+h96o8d3lFnijrgprjbfGRSt0lH0nAZG5vsprWxYRW6Suq4UWqrLEsspWg8Io6yv/q6EhK0Fw0GLbjKYn5CZYBYht1laPrnEY67kyrhYbuyceiR28Pso7bYwiXjihjWsWuWF5p/H765HmNoiur3RJsGKNG/jq748XMrwmjhwCfO6QD9v7LQsDxPTAMKsFpthyJCdkmgYiw0VdXF/Om9dyv7YMWGXTLYpZg5wNR11C78oW3p8HSGgul4qyrJppgllJHJZHn0Y0yUwDXCXUNquFZNLKyYXBAVZvxtAKYIQEsmPgDacr0tltO1y/DMwYpkgUpJfTasLGzd3cdCN3gN3UWRcY3epIEPevfq+3njBxq/kqBoGBduvea8f393zICS63ivRBTqgFpgaWZEIUULdcK+frIfAAL2AjscXqrLfu+uuwx05FF0XUbvvtuOeu++689+7778AHL/wJIQAAOwAAAAAAAAAAAA==' />") );
            $.ajax({
                url: "/players/info.php?id=" + playerId + "&stats=1",
                success: function(data) {
                    var matchesTable = $(".body-title-1:last", $(data)).parent().next();
                    var teamName = $("option:contains('Другие игроки ')", $(data)).text().replace( 'Другие игроки ', '' ).replace(/\.{3}/, '').trim();
                    var matchesTrs = $( "table[cellpadding='3'] tr[bgcolor='EEF4FA'],tr[bgcolor='ffffff']", matchesTable )
                    beScript.log( matchesTrs.length / 2 );
//                    var matches = [];
                    
                    var totalPoints = 0;
                    var predictedPoints = 0;
                    
                    matchesTrs.each(function(i) {
                        if ( i % 2 == 0 ) {
                            var matchDetails = $( ">td", $(this) );
                            if (matchDetails.eq(1).text().match(/\d+'/g/*'*/)) {
                                var match = {};
                                match.date = matchDetails.eq(0).text();
                                match.minutes = parseInt(matchDetails.eq(1).text().replace( "'", "" ), 10);
                                match.mark = parseFloat(matchDetails.eq(2).text());
                                match.type = matchDetails.eq(4).text().split( "," )[0];
                                match.expPoints = beScript.expPointsPerMinute[match.type] * match.minutes;
                                
                                var result = $("td", matchDetails.eq(3));
                                var matchGoals = result.eq(1).text().split( ":" );
                                match.homeTeam = {id : beScript.Util.checkByRegExp($("a", result.eq(0)).attr( "href" ), /\/roster\/(\w+)/ )[1], name:result.eq(0).text(), goals:matchGoals[0] };
                                match.awayTeam = {id : beScript.Util.checkByRegExp($("a", result.eq(2)).attr( "href" ), /\/roster\/(\w+)/ )[1], name:result.eq(2).text(), goals:matchGoals[1] };
                                
                                if ( match.type != 'Товарищеские матчи' ) {
                                    if ( (match.homeTeam.name == teamName && match.homeTeam.goals > match.awayTeam.goals) 
                                        || (match.awayTeam.name == teamName && match.homeTeam.goals < match.awayTeam.goals) ) {
                                        match.expPoints *= 1.5;
                                    } else if ( match.homeTeam.goals != match.awayTeam.goals ) {
                                        match.expPoints *= 0.5;
                                    }
                                }
                                
                                match.expPoints = Math.round( match.expPoints );
                                beScript.log( match.expPoints + " " + match.minutes + " " + match.homeTeam.name + " " + match.awayTeam.name );
                                totalPoints += match.expPoints;
                              // FWIW  
                              // matches.push( match );
                            }
                        }
                    });
                    
                    if ( beScript.playingDay != 0 ) { 
                        beScript.log( totalPoints );
                        predictedPoints = Math.round(totalPoints * 84 / beScript.playingDay);
                    }
                    
                    beScript.updateSetting( "playerProfile.exp_gain_radio", predictedPoints );
                    checkRadioByGroupId( "exp_gain_radio", expGainDiv );
                    $( "#exp_gain_radio", expGainDiv ).attr( "value", predictedPoints ).blur().change();
                    expCalcDiv.empty();
                    expCalcDiv.append( expCalcLink )
                }
            });
        });
        expCalcDiv.append( expCalcLink )

        contentRight.append( expCalcDiv );

        content.append( contentLeft );
        content.append( contentRight );

        menuSpan.qtip({
            id : 'beScript_playerProfile_options',
            prerender: true,
            position: {
                my : 'top center',  // Position my top left...
                at : 'bottom center', // at the bottom right of...
            },
            hide: false,
            show: { 
                modal: {
                    onload : true,
                },
                delay : 200,
                solo : true,
                event: "click"
            },
            content : {
                title : {
                    text: "Профиль Игрока :: Настройки",
                    button: "Закрыть"
                },
                text : content
            },
            style: {
                classes: 'ui-tooltip-dark ui-tooltip-shadow ui-tooltip-player',
                width:500
            },
            events: {
                hide : function( event, api ) {
                    var result = skillsDiv.sortable( "toArray" );
                    beScript.playerTrainOrder = [];
                    
                    for ( var i = 0; i < result.length; i++ ) {
                        beScript.playerTrainOrder.push(result[i].slice(0, -4).substr(7));
                    }
                    
                    beScript.playerProfile.updatePlayerProgress();
                }
            }

        });        

        beScript.playerProfile.updatePlayerProgress();
    },
    updatePlayerProgress : function() {
        var player = new Player();
        player.id = parseInt($( "input[name='id']" ).attr( "value" ));
        
        var playerInfoTable = $( "table[bgcolor='D0D0D0'] > tbody > tr[class='header'][bgcolor='D3E1EC']" ).parent().find( ">tr[bgcolor='ffffff'] > td > table > tbody" );
        var playerSkills = $( ">tr:first:first-child > td:first > b > table > tbody > tr", playerInfoTable );
        var playerBehaviourTable = $( ">tr:first:first-child > td:eq(1) > b > table > tbody > tr", playerInfoTable );
        var playerLearningTable = $(">tr:eq(1) > td:eq(1) > b > table > tbody > tr", playerInfoTable);
        
        player.tckl = parseFloat( playerSkills.eq(0).children().eq(1).text().replace(/_/g,"") );
        player.mrk = parseFloat( playerSkills.eq(1).children().eq(1).text().replace(/_/g,"") );
        player.drbl = parseFloat( playerSkills.eq(2).children().eq(1).text().replace(/_/g,"") );
        player.brcv = parseFloat( playerSkills.eq(3).children().eq(1).text().replace(/_/g,"") );
        player.edrnc = parseFloat( playerSkills.eq(4).children().eq(1).text().replace(/_/g,"") );
        player.pass = parseFloat( playerSkills.eq(5).children().eq(1).text().replace(/_/g,"") );
        player.shotPwr = parseFloat( playerSkills.eq(6).children().eq(1).text().replace(/_/g,"") );
        player.shotAcc = parseFloat( playerSkills.eq(7).children().eq(1).text().replace(/_/g,"") );
        
        player.power = parseFloat( playerBehaviourTable.eq(0).children().eq(1).text() );
        player.age = parseInt( playerBehaviourTable.eq(1).children().eq(1).text() );
        player.primaryPosition = playerBehaviourTable.eq(2).children().eq(1).text();
        
        player.talent = parseInt( playerLearningTable.eq(0).children().eq(1).text(), 10 );
        player.expPoints = parseInt( playerLearningTable.eq(1).children().eq(1).text().replace( /\d+\(/, "" ).replace( ")", "" ), 10 );
        player.expLevel = parseInt( playerLearningTable.eq(2).children().eq(1).text(), 10 );
        
        var result = beScript.trainPlayerWithConditions(player);
        var numberOfTrains = result.numberOfTrains;
        player = result.player;

        playerSkills.each( function(i) {
            var td = $( "#beScript_playerProfile_skills_" + i, this );
            
            if ( td.length == 0 ) {
                td = $( "<td id='beScript_playerProfile_skills_" + i + "'/>" );
                $(this).children().eq(1).after( td );
            }
            
            td.html( player[beScript.skillsArr[i]].toFixed(2) );
        });

        playerBehaviourTable.each( function(i) {
            var value = "";
            
            switch ( i ) {
                case 0: value = player.power.toFixed(2); break;
                case 1: value = player.age; break;
                case 2: value = numberOfTrains + "тр."; break;
                default:
            }
            
            var td = $( "#beScript_playerProfile_behaviour_" + i, this );
            
            if ( td.length == 0 ) {
                td = $( "<td id='beScript_playerProfile_behaviour_" + i + "'/>" );
                $(this).children().eq(1).after( td );
            } else if ( i > 2 ) {
                return
            }

            td.html( value );
        });

        var expLim = Math.floor(269 * Math.pow(1.41, (player.expLevel + 89 * player.talent - 88) / 89) 
                                    * Math.pow(beScript.Util.factorial(player.talent), -0.11) 
                                    * 89 / (99 - 10 * player.talent) 
                                + 0.00001);
        playerLearningTable.each( function(i) {
            var value = "";
            
            switch ( i ) {
                case 0: value = player.talent; break;
                case 1: value = Math.round(player.expPoints) + " (" + expLim + ")"; break;
                case 2: value = player.expLevel; break;
                case 3: value = Math.min(player.talent + player.expLevel / 10, 15.9).toFixed(1); break;
                default:
            }
            
            var td = $( "#beScript_playerProfile_learning_" + i, this );
            
            if ( td.length == 0 ) {
                td = $( "<td id='beScript_playerProfile_learning_" + i + "'/>" );
                $(this).children().eq(1).after( td );
            }

            td.html( value );
        });
                
//        beScript.log( player );
//        beScript.log( numberOfTrains );
//        beScript.log( season );
    },
    process : function() {
        var playerId = parseInt($( "input[name='id']" ).attr( "value" ));
        var player = beScript.getPlayerById(beScript.getMyTeams()[beScript.activeTeamId], playerId);//beScript.getMyTeams()[beScript.activeTeamId].players[playerId];
        
        player = beScript.parsePlayerInfo(player, $("body"));
        
        if ( beScript.settings.player_profile_extender !== false ) {
            GM_wait( 'beScript.trainNumber != -1', beScript.playerProfile.addMenuAndUpdatePlayerProgress, beScript );
        }
    }
};

beScript.school = {
    process : function() {
        if ( beScript.settings.sorts_school 
            && beScript.Util.checkLocation( "roster" ) && !beScript.Util.checkLocation( "act=getplayer" ) ) {
            var playersTable = $($(".maintable")[2]);
            var _headers = { 
                3: { sorter:'beScript.sorter.positions' },
            };
            
            if ( beScript.Util.checkLocation( "roster" ) && beScript.Util.checkLocation( "act=finance" ) ) {
                $.extend( true, _headers, {
                    6: { sorter:'digit' },
                    7: { sorter:'digit' },
                    8: { sorter:'digit' },
                });
            } else {
                $.extend( true, _headers, {
                    12: { sorter:'digit' }
                });
            }
            
            beScript.Util.makeTableSortable( "school", playersTable, _headers, [3, 0], 1 );
        }
    }
};

beScript.finances = {
    addDaySumColumn : function() {
        var financesTable = $( ".maintable" );
        var tableheader = $('tr[bgcolor="#D3E1EC"][align="center"]', financesTable);
        
        tableheader.append("<td><span title=\"Деньги за день\"><b>За день</b></span></td>");

        var financeOperations = $( "tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA']", financesTable );
        var operationsSumByDate = {};
        var idOperations = ["Продажа товара",
                            "Покупка товара", 
                            "Спонсорские", 
                            "Зарплаты игроков",
                            "Зарплаты специалистов", 
                            "Стипендия игрокам ДЮСШ",
                            "Содержание стадиона",
                            "Доход от стадиона",
                            "Доход от гостиницы",
                            "Расходы на проведение матча", 
                            "Проценты по срочному вкладу", 
                            "Проценты по кредиту", 
                            "Возврат банковского кредита", 
                            "Налог за пользование Арендой",
                            "Спонсорские - ТВ",
                            "Продажа по себестоимости"]
        
        financeOperations.each(function(i) {
            var tds = $( "td", $(this) );
            var date = tds.eq(0).text().trim().split( " " )[0];
            var value = parseInt(tds.eq(2).text().trim().replace( /\./g, "" ), 10);
            var operation = operationsSumByDate[date];
            var operationName = tds.eq(1).text().trim();
            
            if ( !operation ) {
                operation = {};
                operation.val = 0;
                operation.num = 0;
                operation.idVal = 0;
            }
            
            operation.val += value;
            operation.num++;

            if ( operationName in oc(idOperations) ) {
                operation.idVal += value;
            } else {
                beScript.log( operationName );
            }
            
            operationsSumByDate[date] = operation;
        });

        var counter = 0;
        var zebraCounter = 0;
        
        for ( var date in operationsSumByDate ) {
            var operation = operationsSumByDate[date];
            beScript.log( date + " - " + operation.val );
            var rexSplitter = /^-?(\d{1,3})(\d{3})?(\d{3})?(\d{3})?(\d{3})?$/g;
            var match = rexSplitter.exec(operation.val + "");
            var valStr = match[1];
            for ( var i = 2; i < match.length; i++ ) {
                if( match[i] != undefined ) {
                    valStr += "." + match[i];
                } else {
                    break;
                }
            }
            
            var idValStr = "";
                beScript.log( operation.idVal );
            if ( operation.idVal != 0 ) {
                var rexSplitter2 = /^-?(\d{1,3})(\d{3})?(\d{3})?(\d{3})?(\d{3})?$/g;
                match = rexSplitter2.exec(operation.idVal + "");
                beScript.log( match );
                idValStr = match[1];
                for ( var i = 2; i < match.length; i++ ) {
                    if( match[i] != undefined ) {
                        idValStr += "." + match[i];
                    } else {
                        break;
                    }
                }
            }
                        
            var spentForDay = $( "<td rowspan='" + operation.num + "' bgcolor='" + ((zebraCounter % 2 == 0)?"#ffffff":"#EEF4FA") + "'><div align='right' style='color:" + ((operation.val > 0)?"green":"A70000") + "'><nobr>" + ((operation.val > 0)?"+":"-") + valStr + "</nobr></div></td>" );
            if ( operation.idVal != 0 ) {
                spentForDay.qtip({
                    position: {
                        my: 'left center',
                        at: 'right center',
                    },
                    content : {
                        text : "За ИД:<div align='right' style='color:" + ((operation.idVal > 0)?"green":"A70000") + "'><nobr>" + ((operation.idVal > 0)?"+":"-") + idValStr + "</nobr></div>"
                    },
                    style: {
                        classes: 'ui-tooltip-blue ui-tooltip-shadow',
                    },
                    show: {
                        delay: 10
                    },
                    hide: {
                        delay: 10
                    },
                });
            }
            financeOperations.eq(counter).append( spentForDay );
            
            zebraCounter++;
            counter += operation.num;
        }
    },
    process : function() {
        if ( beScript.settings.finance_report_sum_column !== false && (!beScript.Util.checkLocation( "sort" ) || beScript.Util.checkLocation( "sort=OperationDate" )) ) {
            beScript.finances.addDaySumColumn();
        }
    }  
};

beScript.train = {
    addIndividualPlanLinks : function( trainTable ) {
        GM_addStyle( ".ui-state-default { border: 1px solid #666666; background: #555555; font-weight: normal; color: #ffffff; outline: none; } .ui-state-default a { color: #ffffff; text-decoration: none; outline: none; }" );
        GM_addStyle( "	#sortable { list-style-type: none; margin: 0; padding: 0; width: 100%; }	#sortable li { margin: 3px 3px 3px 0px; padding: 0.3em; padding-top: 0.6em; font-size: 1.4em; height: 18px; } #sortable input {float:right;position:relative;bottom:5px;border:1px solid black;width:50px;text-align:right}" );
        var settingsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8xMS8wOGGVBZQAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAADkklEQVQ4ja2UUUikVRTHf3e+cXJ0NHWSGXEbxCW3fdjaGM1sfUiIBhoWEhkSSRARPnxMLdmIFnoq2ocgNcYHXxpSUWd92N6CkNYINVArRTdJcGSadQccV2a+b+5839dDjoyutD30hwuXe8753/8599wjLMvi/4T9aQ6qqhYDg0AuHA5//jR/cZFCVVWDwJvAx0Cbx+P5xuVyaTs7O0HgCHgXmA6Hw3+cj7WdYRcCIQQul+tOa2trf0VFxS9Op/Ojnp6eilAo5C0tLb3j8Xi+bW5u/qSoqOjn/5yyEOIwEAg8EwgErpimic1mQ0rJwMBAW/7S9fX1xL8SqqraOjg4+JWiKA+dTuclgGw2+0SAZVmUlJSgKMqloaGh+5ZlVRwfH78XDodXzysM1tfXXw0Gg9cVReHw8PDU4Ha7AUgmkwA4nU6Gh4fLNU27MTMzk93e3r4GrJ6v4Rebm5uHQgiSySSZTIZUKoWu64yOjj4aGxs7kFJyfHxMLBYjHo+TyWSIx+NbwPd5EttJug7gZWA3nU6TX4qiMDExcW9/f/+NWCz2djgc/snhcJzapZRomgZwWVXVkkKFN8vKyu729vY27+/vk06n8Xq9RKPReDqdHhgfH/99fHx8Rdf1W1NTU3Gv10s6nSaRSNDX13etqqoqCrxTWMOklNIupSSTyQAgpURKqQDFBWUpNk3Tyvvpuk5ZWRmGYQggCwWNrapqs91u/7K3t/e1nZ0dAHw+H5FI5Acp5WeA4XA43u/u7g7u7u4CUFdXRyQSuavr+qcXvfID0zSvAqcqt7a26OrqaotGo9cNw1BCoVD55ubmmRYSQrwIPMifFRJ+UFlZWaxpGg0NDayurgKwtrZGZ2dnJcDy8jIATU1N5HI5DMPA5XJd1jTtQ+D2ecLvjo6O2iYnJw/sdvtLHR0dvqWlJQAWFhYohKZpTE9PJ0zT/NM0zeeBubztzHAQQgDQ399/PxQK3cintbi4iBCClpYWbLZ/GmNubu7eyMjITc7hwr9smqZnfn5ez2aze5ZlPWxvb38dYHZ29kfLsl5wOBxVpmlWXhQr/H6/F3gWcJ+cFXk8nlfcbvdbGxsbX9fU1Fypra29bVmWbW9v75au64+rq6ubU6nUbwcHB78C8iQuCaSE3+8vB7zAcwWkZ+Dz+V7N5XKPE4nEtmEYxgUuSeAR8NcTA7axsbEIKM+rLdjncVSg6mhlZUUWGv8GIqaoKytmt+IAAAAASUVORK5CYII%3D";
        
        var players = $( "tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA']", trainTable );
        
        players.each(function(i) {
            var self = $(this);
            var tds = $( "td", self );

            if ( $("select", tds.eq(8)).size() == 0 ) return; // goalkeeper
            
            var playerId = parseInt(beScript.Util.checkByRegExp( tds.eq(1).find("a").attr( "href" ), /(\d+)/ )[1]);
            beScript.log(playerId);
            var player = beScript.getMyTeams()[beScript.activeTeamId].players[playerId];
            if (!player) {
                beScript.log( "Error! Cannot find player " + playerId + " in team " + beScript.getMyTeams()[beScript.activeTeamId].name );
                return;
            }
            
            tds.eq(8).css( "width", "175px" );
            var img = $("<img style='align:right; vertical-align:bottom;' src='" + settingsIcon + "'>");
            
            var plan;
            
            if (player.individualPlan ) {
                plan = player.individualPlan;
            } else {
                plan = [{name : 'skills_tckl', value : player.tckl}
                       , {name : 'skills_mrk', value : player.mrk}
                       , {name : 'skills_drbl', value : player.drbl}
                       , {name : 'skills_brcv', value : player.brcv}
                       , {name : 'skills_edrnc', value : player.edrnc}
                       , {name : 'skills_pass', value : player.pass}
                       , {name : 'skills_shotPwr', value : player.shotPwr}
                       , {name : 'skills_shotAcc', value : player.shotAcc}
                       ];
            }
            
            var content = $('<ul id="sortable"></ul>');
            var inputStyle = "";
            
            for (var i = 0; i < plan.length; i++ ) {
                var planItem = plan[i];
                content.append( "<li class='ui-state-default' id='li_" + planItem.name + "'>" + beScript.skills[planItem.name.substr(7)] + "<input style='" + inputStyle + "' id='" + planItem.name + "' value='" + planItem.value + "'/></li>" );
            }

            content.append( "<li class='ui-state-default'>Все по<input style='" + inputStyle + "' id='skills_all' value='20'/></li>" );
            $( "input[id^='skills_']", content ).floatnumber(".", 2).blur();

            $( "input[id='skills_all']", content ).change( function() {
                var value = $(this).attr( "value" );
                if ( value > 0 ) {
                    $( "input[id^='skills_'][id!='skills_all']" ).attr( "value", value ).blur().change();
                }
            });

            img.qtip({
                id : 'beScript_playerTrain_individualPlan',
                prerender: true,
                position: {
                    my : 'right center',
                    at : 'left center',
                },
                hide: false,
                show: { 
                    modal: {
                        onload : true,
                    },
                    delay : 200,
                    solo : true,
                    event: "click"
                },
                content : {
                    title : {
                        text: "Профиль Игрока :: Индивидуальный план",
                        button: "Закрыть"
                    },
                    text : content
                },
                style: 'ui-tooltip-dark ui-tooltip-shadow ui-tooltip-player-individual-plan',
                events: {
                    hide : function( event, api ) {
                        player.individualPlan = [];
                        
                        var content = api.elements.content;
                        var result = $( "#sortable", content ).sortable( "toArray" );
                        
                        for ( var i = 0; i < result.length; i++ ) {
                            var fieldId = result[i].substr(3);
                            var planItem = {};
                            planItem.name = fieldId;
                            planItem.value = parseFloat($( "#" + fieldId, content ).attr( "value" ));
                            player.individualPlan.push(planItem);
                        }
                        
                        beScript.log( player.individualPlan );
//                        beScript.getMyTeams()[beScript.activeTeamId].players[playerId];
                        
                        window.setTimeout(beScript.saveMyTeams, 0, beScript.__teams);                        
                    },
                    render: function( event, api ) {
                        var content = api.elements.content;
                         
                        $( "#sortable", content ).sortable({
                            items: "li:not(:last)",
                            cancel: ':input'
                        }).disableSelection();
                        
                        $("#sortable", content).find("input").bind('mousedown.ui-disableSelection selectstart.ui-disableSelection', function(e) {
                            e.stopImmediatePropagation();
                        });
                        
                        $("#sortable > li:not(:last)", content).hover(function() {
                            $(this).css('cursor','move');
                        }, function() {
                            $(this).css('cursor','auto');
                        });
                    }
                }

            });    
            
	    tds.eq(8).children().first().wrap("<div style='float:left;'></div>");
            tds.eq(8).append( img );
            img.wrap("<div style='float:right;'></div>");
        });        
    },
    processIndividualPlan : function( trainTable ) {
        var players = $( "tr[bgcolor='#ffffff'],tr[bgcolor='#EEF4FA']", trainTable );

        players.each(function(i) {
            var self = $(this);
            var tds = $( "td", self );
            
            if ( tds.size() == 0 || tds.eq(0).text().trim() == "№" || tds.eq(0).text().trim() == "" ) return; // header and footer

            var playerId = parseInt(beScript.Util.checkByRegExp( tds.eq(1).find("a").attr( "href" ), /(\d+)/ )[1]);
            var player = beScript.getMyTeams()[beScript.activeTeamId].players[playerId];

            if (!player) {
                return;
            }
            
            if (player.primaryPosition == "Gk" || !player.individualPlan) return;
            
            var plan = player.individualPlan;
            var activeTrain = ((beScript.hrefAction == "report")?tds.eq(6):$(":selected", tds.eq(8))).text().trim();
            if ( activeTrain == "Травма" ) return;
            
            for (var i = 0; i < plan.length; i++ ) {
                var planItem = plan[i];
                beScript.log( planItem.name.substr );
                
                if ( player[planItem.name.substr(7)] < planItem.value && activeTrain != beScript.skills[planItem.name.substr(7)] ) {
                    self.animate({
                        backgroundColor: "#facdef"
                    }, 1500 );
                    
                    tds.eq(beScript.hrefAction == "report"?6:8).qtip({
                        id : 'beScript_playerTrain_individualPlan_helper' + playerId,
                        prerender: true,
                        position: {
                            my : 'top center',
                            at : 'bottom center',
                        },
                        show: { 
                            delay : 10,
                        },
                        hide: { 
                            delay : 10,
                        },
                        content : {
                            text : "По плану тренируется <b>" + beScript.skills[planItem.name.substr(7)] + "</b> до " +  planItem.value + "<br>Текущее значение умения <b>" + beScript.skills[planItem.name.substr(7)] + "</b> - " + player[planItem.name.substr(7)],
                        },
                        style: 'ui-tooltip-dark ui-tooltip-shadow ui-tooltip-player-individual-plan',
                    });
                    
                    break;
                } else if (player[planItem.name.substr(7)] < planItem.value && activeTrain == beScript.skills[planItem.name.substr(7)]) {
                    break;
                }
            }

        });
    },
    process : function() {
        if ( beScript.Util.checkLocation( "school" ) ) return; // no addons for school trains
        var trainTable = $(".maintable");
        if ( beScript.hrefAction in oc(["report", "history"]) ) {
            var _headers = {};
            var numberOfBottomRows = 1;
            var sort = [0, 1];
            
            if ( beScript.Util.checkLocation( "act=history" ) ) {
                numberOfBottomRows = 0;
/*            } else if ( beScript.Util.checkLocation( "act=vip" ) ) {
                sort = [3, 0];
                numberOfBottomRows = 2;
                $.extend( true, _headers, { 
                    3: { sorter:'beScript.sorter.positions' },
                    6: { sorter:'digit' },
                    7: { sorter:'digit' },
                    8: { sorter:'digit' },
                    9: { sorter:'digit' },
                    10: { sorter:'digit' },
                    11: { sorter:'digit' },
                    12: { sorter:'digit' },
                    13: { sorter:'digit' },
                    16: { sorter:false },
                });*/
            } else if ( !beScript.Util.checkLocation( "school" ) ) {
                sort = [3, 0];
                $.extend( true, _headers, { 
                    3: { sorter:'beScript.sorter.positions' },
                });
/*            } else {
                sort = [3, 0];
                $.extend( true, _headers, { 
                    3: { sorter:'beScript.sorter.positions' },
                });*/
            }

            trainTable.each( function(i) {
                beScript.Util.makeTableSortable( "train_" + i, $(this), _headers, sort, numberOfBottomRows, i );
            });
        }
        
        if ( beScript.settings.helpers_profile && beScript.hrefAction in oc(["report", "select", ""]) ) {
            beScript.roster.addPlayersTips(trainTable, beScript.activeTeamId);
        }
        
        if ( beScript.settings.individual_plan !== false && beScript.hrefAction in oc(["report", "select", ""])) {
            var tmp = function() {
                beScript.train.addIndividualPlanLinks( trainTable );
                beScript.train.processIndividualPlan( trainTable.eq(0) );
            }
            
            GM_wait( 'beScript.__teams[beScript.activeTeamId].players.status == 100', tmp, beScript );
        }
    },
    
    //  ------------ VIP trains -----------
    
    addCheckboxesForVipTrain : function() {
    },
    vipProcess : function() {
        var trainTable = $(".maintable");
        
    },
};

beScript.Update = {
	UpdaterClass : function(updTime) {
		var _t = this;
		var urlNew = 'http://butsaenhancer.googlecode.com/svn/trunk/version.txt';
		var urlOld = 'http://butsaenhancer.googlecode.com/svn/trunk/versionOld.txt';
		var url = beScript.settings.stayWithin1stVersion?urlOld:urlNew;
		var randSeed = 0;
        var latestVersion = beScript.Util.deserialize( "latestVersion" );
        
        this.init = function() {
			if (beScript.Util.checkPeriod("updTime", updTime) || !latestVersion) {
				beScript.log("update check");
				this.check();
			} else if ( latestVersion != beScript.VERSION ) {
                this.update( latestVersion );
            }
		};

		this.check = function() {
			randSeed = Math.floor(1 + (9999) * Math.random());
			beScript.log("update url: " + url + "?seed=" + randSeed);

            if ( window.navigator.vendor && window.navigator.vendor.match(/Google/) ) {
                chrome.extension.sendRequest({'url':url + "?seed=" + randSeed}, this.update);
            } else if(!window.opera && typeof GM_xmlhttpRequest != "undefined") {
                GM_xmlhttpRequest({
						method : "GET",
						url : url + "?seed=" + randSeed,
						onload : function(o) {
                            beScript.log( this.readyState );
                            if (o.readyState == 4) {
                                _t.update(o.responseText);
                            }
                        },
						onerror : function(e) {
                            beScript.log( "!" + e );
                        }
					});
            } else {
                $.get(url + "?seed=" + randSeed, function(data) {_t.update($(data.responseText).text()); });
            }
		};

		this.update = function(checkver) {
            beScript.Util.serialize( "latestVersion", checkver.trim() );
            vnum = checkver;

            var flag = false;
            checkver = beScript.Util.parseVersionNumber(checkver);
            thisver =  beScript.Util.parseVersionNumber(beScript.VERSION);

            beScript.log("update processed");
            beScript.log("v:" + thisver + " u:" + checkver);

            if (checkver - thisver > 0) {
                var newVersionLink = $( "<span>Скачать?</span>" );
                newVersionLink.css( {'color':'red','text-decoration':'underline'} );
         
                if ( window.navigator.vendor && window.navigator.vendor.match(/Google/) ) {
                    newVersionLink.click( function() {
                        window.location='http://butsaenhancer.googlecode.com/svn/trunk/Butsa%20Enhancer.crx';
                    });
                } else {
                    newVersionLink.click( function() {
                        window.location='http://userscripts.org/scripts/source/101727.user.js'; 
                    });
                }
                
                newVersionLink.hover(function() {
                        $(this).css('cursor','pointer');
                    }, function() {
                        $(this).css('cursor','auto');
                    });
                
                var newVersionNotification = $( "<span>Доступно обновление " + vnum.trim() + "!<br/></span>" ).append( newVersionLink );
                
                $( "#beScript_td" ).qtip({
                    id:'beScript_menu_update_tooltip',
                    position: {
                        my : 'right center',  // Position my top left...
                        at : 'left center', // at the bottom right of...
                    },
                    show: {
                        ready: true
                    },
                    hide : {
                        event: false,
                    },
                    content: {
                        text: newVersionNotification,
                        title: {
                           text: "Обновление",
                           button: true
                        }
                    },
                    style: 'ui-tooltip-dark ui-tooltip-shadow',
                });
                
            }
		};

		this.install = function() {
			window.location = 'http://userscripts.org/scripts/source/' + beScript.S_ID + '.user.js';

		};

		this.init();
	},
	updater : null,
	init : function() {
        beScript.Update.updater = new beScript.Update.UpdaterClass(beScript.UPDATES_CHECK_FREQ * 1000 * 60);
		setTimeout(function() {
					beScript.Update.updater.check();
				}, beScript.UPDATES_CHECK_FREQ * 1000 * 60);
	}
};

// ------------------------
// - javascript libraries -
// ------------------------
//with (window) {
// jQuery 1.5.2
(function(a,b){function ci(a){return d.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cf(a){if(!b_[a]){var b=d("<"+a+">").appendTo("body"),c=b.css("display");b.remove();if(c==="none"||c==="")c="block";b_[a]=c}return b_[a]}function ce(a,b){var c={};d.each(cd.concat.apply([],cd.slice(0,b)),function(){c[this]=a});return c}function b$(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function bZ(){try{return new a.XMLHttpRequest}catch(b){}}function bY(){d(a).unload(function(){for(var a in bW)bW[a](0,1)})}function bS(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var e=a.dataTypes,f={},g,h,i=e.length,j,k=e[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h==="string"&&(f[h.toLowerCase()]=a.converters[h]);l=k,k=e[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=f[m]||f["* "+k];if(!n){p=b;for(o in f){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=f[j[1]+" "+k];if(p){o=f[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&d.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bR(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bQ(a,b,c,e){if(d.isArray(b)&&b.length)d.each(b,function(b,f){c||bs.test(a)?e(a,f):bQ(a+"["+(typeof f==="object"||d.isArray(f)?b:"")+"]",f,c,e)});else if(c||b==null||typeof b!=="object")e(a,b);else if(d.isArray(b)||d.isEmptyObject(b))e(a,"");else for(var f in b)bQ(a+"["+f+"]",b[f],c,e)}function bP(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bJ,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l==="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bP(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bP(a,c,d,e,"*",g));return l}function bO(a){return function(b,c){typeof b!=="string"&&(c=b,b="*");if(d.isFunction(c)){var e=b.toLowerCase().split(bD),f=0,g=e.length,h,i,j;for(;f<g;f++)h=e[f],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bq(a,b,c){var e=b==="width"?bk:bl,f=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return f;d.each(e,function(){c||(f-=parseFloat(d.css(a,"padding"+this))||0),c==="margin"?f+=parseFloat(d.css(a,"margin"+this))||0:f-=parseFloat(d.css(a,"border"+this+"Width"))||0});return f}function bc(a,b){b.src?d.ajax({url:b.src,async:!1,dataType:"script"}):d.globalEval(b.text||b.textContent||b.innerHTML||""),b.parentNode&&b.parentNode.removeChild(b)}function bb(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function ba(a,b){if(b.nodeType===1){var c=b.nodeName.toLowerCase();b.clearAttributes(),b.mergeAttributes(a);if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(d.expando)}}function _(a,b){if(b.nodeType===1&&d.hasData(a)){var c=d.expando,e=d.data(a),f=d.data(b,e);if(e=e[c]){var g=e.events;f=f[c]=d.extend({},e);if(g){delete f.handle,f.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)d.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function $(a,b){return d.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Q(a,b,c){if(d.isFunction(b))return d.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return d.grep(a,function(a,d){return a===b===c});if(typeof b==="string"){var e=d.grep(a,function(a){return a.nodeType===1});if(L.test(b))return d.filter(b,e,!c);b=d.filter(b,e)}return d.grep(a,function(a,e){return d.inArray(a,b)>=0===c})}function P(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function H(a,b){return(a&&a!=="*"?a+".":"")+b.replace(t,"`").replace(u,"&")}function G(a){var b,c,e,f,g,h,i,j,k,l,m,n,o,p=[],q=[],s=d._data(this,"events");if(a.liveFired!==this&&s&&s.live&&!a.target.disabled&&(!a.button||a.type!=="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var t=s.live.slice(0);for(i=0;i<t.length;i++)g=t[i],g.origType.replace(r,"")===a.type?q.push(g.selector):t.splice(i--,1);f=d(a.target).closest(q,a.currentTarget);for(j=0,k=f.length;j<k;j++){m=f[j];for(i=0;i<t.length;i++){g=t[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,e=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,e=d(a.relatedTarget).closest(g.selector)[0];(!e||e!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){f=p[j];if(c&&f.level>c)break;a.currentTarget=f.elem,a.data=f.handleObj.data,a.handleObj=f.handleObj,o=f.handleObj.origHandler.apply(f.elem,arguments);if(o===!1||a.isPropagationStopped()){c=f.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function E(a,c,e){var f=d.extend({},e[0]);f.type=a,f.originalEvent={},f.liveFired=b,d.event.handle.call(c,f),f.isDefaultPrevented()&&e[0].preventDefault()}function y(){return!0}function x(){return!1}function i(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function h(a,c,e){if(e===b&&a.nodeType===1){e=a.getAttribute("data-"+c);if(typeof e==="string"){try{e=e==="true"?!0:e==="false"?!1:e==="null"?null:d.isNaN(e)?g.test(e)?d.parseJSON(e):e:parseFloat(e)}catch(f){}d.data(a,c,e)}else e=b}return e}var c=a.document,d=function(){function G(){if(!d.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(G,1);return}d.ready()}}var d=function(a,b){return new d.fn.init(a,b,g)},e=a.jQuery,f=a.$,g,h=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,i=/\S/,j=/^\s+/,k=/\s+$/,l=/\d/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=navigator.userAgent,w,x,y,z=Object.prototype.toString,A=Object.prototype.hasOwnProperty,B=Array.prototype.push,C=Array.prototype.slice,D=String.prototype.trim,E=Array.prototype.indexOf,F={};d.fn=d.prototype={constructor:d,init:function(a,e,f){var g,i,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!e&&c.body){this.context=c,this[0]=c.body,this.selector="body",this.length=1;return this}if(typeof a==="string"){g=h.exec(a);if(!g||!g[1]&&e)return!e||e.jquery?(e||f).find(a):this.constructor(e).find(a);if(g[1]){e=e instanceof d?e[0]:e,k=e?e.ownerDocument||e:c,j=m.exec(a),j?d.isPlainObject(e)?(a=[c.createElement(j[1])],d.fn.attr.call(a,e,!0)):a=[k.createElement(j[1])]:(j=d.buildFragment([g[1]],[k]),a=(j.cacheable?d.clone(j.fragment):j.fragment).childNodes);return d.merge(this,a)}i=c.getElementById(g[2]);if(i&&i.parentNode){if(i.id!==g[2])return f.find(a);this.length=1,this[0]=i}this.context=c,this.selector=a;return this}if(d.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return d.makeArray(a,this)},selector:"",jquery:"1.5.2",length:0,size:function(){return this.length},toArray:function(){return C.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var e=this.constructor();d.isArray(a)?B.apply(e,a):d.merge(e,a),e.prevObject=this,e.context=this.context,b==="find"?e.selector=this.selector+(this.selector?" ":"")+c:b&&(e.selector=this.selector+"."+b+"("+c+")");return e},each:function(a,b){return d.each(this,a,b)},ready:function(a){d.bindReady(),x.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(C.apply(this,arguments),"slice",C.call(arguments).join(","))},map:function(a){return this.pushStack(d.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:B,sort:[].sort,splice:[].splice},d.fn.init.prototype=d.fn,d.extend=d.fn.extend=function(){var a,c,e,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i==="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!=="object"&&!d.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){e=i[c],f=a[c];if(i===f)continue;l&&f&&(d.isPlainObject(f)||(g=d.isArray(f)))?(g?(g=!1,h=e&&d.isArray(e)?e:[]):h=e&&d.isPlainObject(e)?e:{},i[c]=d.extend(l,h,f)):f!==b&&(i[c]=f)}return i},d.extend({noConflict:function(b){a.$=f,b&&(a.jQuery=e);return d},isReady:!1,readyWait:1,ready:function(a){a===!0&&d.readyWait--;if(!d.readyWait||a!==!0&&!d.isReady){if(!c.body)return setTimeout(d.ready,1);d.isReady=!0;if(a!==!0&&--d.readyWait>0)return;x.resolveWith(c,[d]),d.fn.trigger&&d(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!x){x=d._Deferred();if(c.readyState==="complete")return setTimeout(d.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",y,!1),a.addEventListener("load",d.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",y),a.attachEvent("onload",d.ready);var b=!1;try{b=a.frameElement==null}catch(e){}c.documentElement.doScroll&&b&&G()}}},isFunction:function(a){return d.type(a)==="function"},isArray:Array.isArray||function(a){return d.type(a)==="array"},isWindow:function(a){return a&&typeof a==="object"&&"setInterval"in a},isNaN:function(a){return a==null||!l.test(a)||isNaN(a)},type:function(a){return a==null?String(a):F[z.call(a)]||"object"},isPlainObject:function(a){if(!a||d.type(a)!=="object"||a.nodeType||d.isWindow(a))return!1;if(a.constructor&&!A.call(a,"constructor")&&!A.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a){}return c===b||A.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!=="string"||!b)return null;b=d.trim(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return a.JSON&&a.JSON.parse?a.JSON.parse(b):(new Function("return "+b))();d.error("Invalid JSON: "+b)},parseXML:function(b,c,e){a.DOMParser?(e=new DOMParser,c=e.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),e=c.documentElement,(!e||!e.nodeName||e.nodeName==="parsererror")&&d.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(a){if(a&&i.test(a)){var b=c.head||c.getElementsByTagName("head")[0]||c.documentElement,e=c.createElement("script");d.support.scriptEval()?e.appendChild(c.createTextNode(a)):e.text=a,b.insertBefore(e,b.firstChild),b.removeChild(e)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,e){var f,g=0,h=a.length,i=h===b||d.isFunction(a);if(e){if(i){for(f in a)if(c.apply(a[f],e)===!1)break}else for(;g<h;)if(c.apply(a[g++],e)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(var j=a[0];g<h&&c.call(j,g,j)!==!1;j=a[++g]){}return a},trim:D?function(a){return a==null?"":D.call(a)}:function(a){return a==null?"":(a+"").replace(j,"").replace(k,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var e=d.type(a);a.length==null||e==="string"||e==="function"||e==="regexp"||d.isWindow(a)?B.call(c,a):d.merge(c,a)}return c},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length==="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,b,c){var d=[],e;for(var f=0,g=a.length;f<g;f++)e=b(a[f],f,c),e!=null&&(d[d.length]=e);return d.concat.apply([],d)},guid:1,proxy:function(a,c,e){arguments.length===2&&(typeof c==="string"?(e=a,a=e[c],c=b):c&&!d.isFunction(c)&&(e=c,c=b)),!c&&a&&(c=function(){return a.apply(e||this,arguments)}),a&&(c.guid=a.guid=a.guid||c.guid||d.guid++);return c},access:function(a,c,e,f,g,h){var i=a.length;if(typeof c==="object"){for(var j in c)d.access(a,j,c[j],f,g,e);return a}if(e!==b){f=!h&&f&&d.isFunction(e);for(var k=0;k<i;k++)g(a[k],c,f?e.call(a[k],k,g(a[k],c)):e,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}d.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.subclass=this.subclass,a.fn.init=function b(b,c){c&&c instanceof d&&!(c instanceof a)&&(c=a(c));return d.fn.init.call(this,b,c,e)},a.fn.init.prototype=a.fn;var e=a(c);return a},browser:{}}),d.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){F["[object "+b+"]"]=b.toLowerCase()}),w=d.uaMatch(v),w.browser&&(d.browser[w.browser]=!0,d.browser.version=w.version),d.browser.webkit&&(d.browser.safari=!0),E&&(d.inArray=function(a,b){return E.call(b,a)}),i.test(" ")&&(j=/^[\s\xA0]+/,k=/[\s\xA0]+$/),g=d(c),c.addEventListener?y=function(){c.removeEventListener("DOMContentLoaded",y,!1),d.ready()}:c.attachEvent&&(y=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",y),d.ready())});return d}(),e="then done fail isResolved isRejected promise".split(" "),f=[].slice;d.extend({_Deferred:function(){var a=[],b,c,e,f={done:function(){if(!e){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=d.type(i),j==="array"?f.done.apply(f,i):j==="function"&&a.push(i);k&&f.resolveWith(k[0],k[1])}return this},resolveWith:function(d,f){if(!e&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(d,f)}finally{b=[d,f],c=0}}return this},resolve:function(){f.resolveWith(this,arguments);return this},isResolved:function(){return c||b},cancel:function(){e=1,a=[];return this}};return f},Deferred:function(a){var b=d._Deferred(),c=d._Deferred(),f;d.extend(b,{then:function(a,c){b.done(a).fail(c);return this},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,promise:function(a){if(a==null){if(f)return f;f=a={}}var c=e.length;while(c--)a[e[c]]=b[e[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?f.call(arguments,0):c,--g||h.resolveWith(h,f.call(b,0))}}var b=arguments,c=0,e=b.length,g=e,h=e<=1&&a&&d.isFunction(a.promise)?a:d.Deferred();if(e>1){for(;c<e;c++)b[c]&&d.isFunction(b[c].promise)?b[c].promise().then(i(c),h.reject):--g;g||h.resolveWith(h,b)}else h!==a&&h.resolveWith(h,e?[a]:[]);return h.promise()}}),function(){d.support={};var b=c.createElement("div");b.style.display="none",b.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";var e=b.getElementsByTagName("*"),f=b.getElementsByTagName("a")[0],g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=b.getElementsByTagName("input")[0];if(e&&e.length&&f){d.support={leadingWhitespace:b.firstChild.nodeType===3,tbody:!b.getElementsByTagName("tbody").length,htmlSerialize:!!b.getElementsByTagName("link").length,style:/red/.test(f.getAttribute("style")),hrefNormalized:f.getAttribute("href")==="/a",opacity:/^0.55$/.test(f.style.opacity),cssFloat:!!f.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,deleteExpando:!0,optDisabled:!1,checkClone:!1,noCloneEvent:!0,noCloneChecked:!0,boxModel:null,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableHiddenOffsets:!0,reliableMarginRight:!0},i.checked=!0,d.support.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,d.support.optDisabled=!h.disabled;var j=null;d.support.scriptEval=function(){if(j===null){var b=c.documentElement,e=c.createElement("script"),f="script"+d.now();try{e.appendChild(c.createTextNode("window."+f+"=1;"))}catch(g){}b.insertBefore(e,b.firstChild),a[f]?(j=!0,delete a[f]):j=!1,b.removeChild(e)}return j};try{delete b.test}catch(k){d.support.deleteExpando=!1}!b.addEventListener&&b.attachEvent&&b.fireEvent&&(b.attachEvent("onclick",function l(){d.support.noCloneEvent=!1,b.detachEvent("onclick",l)}),b.cloneNode(!0).fireEvent("onclick")),b=c.createElement("div"),b.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var m=c.createDocumentFragment();m.appendChild(b.firstChild),d.support.checkClone=m.cloneNode(!0).cloneNode(!0).lastChild.checked,d(function(){var a=c.createElement("div"),b=c.getElementsByTagName("body")[0];if(b){a.style.width=a.style.paddingLeft="1px",b.appendChild(a),d.boxModel=d.support.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,d.support.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",d.support.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";var e=a.getElementsByTagName("td");d.support.reliableHiddenOffsets=e[0].offsetHeight===0,e[0].style.display="",e[1].style.display="none",d.support.reliableHiddenOffsets=d.support.reliableHiddenOffsets&&e[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(a.style.width="1px",a.style.marginRight="0",d.support.reliableMarginRight=(parseInt(c.defaultView.getComputedStyle(a,null).marginRight,10)||0)===0),b.removeChild(a).style.display="none",a=e=null}});var n=function(a){var b=c.createElement("div");a="on"+a;if(!b.attachEvent)return!0;var d=a in b;d||(b.setAttribute(a,"return;"),d=typeof b[a]==="function");return d};d.support.submitBubbles=n("submit"),d.support.changeBubbles=n("change"),b=e=f=null}}();var g=/^(?:\{.*\}|\[.*\])$/;d.extend({cache:{},uuid:0,expando:"jQuery"+(d.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?d.cache[a[d.expando]]:a[d.expando];return!!a&&!i(a)},data:function(a,c,e,f){if(d.acceptData(a)){var g=d.expando,h=typeof c==="string",i,j=a.nodeType,k=j?d.cache:a,l=j?a[d.expando]:a[d.expando]&&d.expando;if((!l||f&&l&&!k[l][g])&&h&&e===b)return;l||(j?a[d.expando]=l=++d.uuid:l=d.expando),k[l]||(k[l]={},j||(k[l].toJSON=d.noop));if(typeof c==="object"||typeof c==="function")f?k[l][g]=d.extend(k[l][g],c):k[l]=d.extend(k[l],c);i=k[l],f&&(i[g]||(i[g]={}),i=i[g]),e!==b&&(i[c]=e);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[c]:i}},removeData:function(b,c,e){if(d.acceptData(b)){var f=d.expando,g=b.nodeType,h=g?d.cache:b,j=g?b[d.expando]:d.expando;if(!h[j])return;if(c){var k=e?h[j][f]:h[j];if(k){delete k[c];if(!i(k))return}}if(e){delete h[j][f];if(!i(h[j]))return}var l=h[j][f];d.support.deleteExpando||h!=a?delete h[j]:h[j]=null,l?(h[j]={},g||(h[j].toJSON=d.noop),h[j][f]=l):g&&(d.support.deleteExpando?delete b[d.expando]:b.removeAttribute?b.removeAttribute(d.expando):b[d.expando]=null)}},_data:function(a,b,c){return d.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=d.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),d.fn.extend({data:function(a,c){var e=null;if(typeof a==="undefined"){if(this.length){e=d.data(this[0]);if(this[0].nodeType===1){var f=this[0].attributes,g;for(var i=0,j=f.length;i<j;i++)g=f[i].name,g.indexOf("data-")===0&&(g=g.substr(5),h(this[0],g,e[g]))}}return e}if(typeof a==="object")return this.each(function(){d.data(this,a)});var k=a.split(".");k[1]=k[1]?"."+k[1]:"";if(c===b){e=this.triggerHandler("getData"+k[1]+"!",[k[0]]),e===b&&this.length&&(e=d.data(this[0],a),e=h(this[0],a,e));return e===b&&k[1]?this.data(k[0]):e}return this.each(function(){var b=d(this),e=[k[0],c];b.triggerHandler("setData"+k[1]+"!",e),d.data(this,a,c),b.triggerHandler("changeData"+k[1]+"!",e)})},removeData:function(a){return this.each(function(){d.removeData(this,a)})}}),d.extend({queue:function(a,b,c){if(a){b=(b||"fx")+"queue";var e=d._data(a,b);if(!c)return e||[];!e||d.isArray(c)?e=d._data(a,b,d.makeArray(c)):e.push(c);return e}},dequeue:function(a,b){b=b||"fx";var c=d.queue(a,b),e=c.shift();e==="inprogress"&&(e=c.shift()),e&&(b==="fx"&&c.unshift("inprogress"),e.call(a,function(){d.dequeue(a,b)})),c.length||d.removeData(a,b+"queue",!0)}}),d.fn.extend({queue:function(a,c){typeof a!=="string"&&(c=a,a="fx");if(c===b)return d.queue(this[0],a);return this.each(function(b){var e=d.queue(this,a,c);a==="fx"&&e[0]!=="inprogress"&&d.dequeue(this,a)})},dequeue:function(a){return this.each(function(){d.dequeue(this,a)})},delay:function(a,b){a=d.fx?d.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){d.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var j=/[\n\t\r]/g,k=/\s+/,l=/\r/g,m=/^(?:href|src|style)$/,n=/^(?:button|input)$/i,o=/^(?:button|input|object|select|textarea)$/i,p=/^a(?:rea)?$/i,q=/^(?:radio|checkbox)$/i;d.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"},d.fn.extend({attr:function(a,b){return d.access(this,a,b,!0,d.attr)},removeAttr:function(a,b){return this.each(function(){d.attr(this,a,""),this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.addClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"){var b=(a||"").split(k);for(var c=0,e=this.length;c<e;c++){var f=this[c];if(f.nodeType===1)if(f.className){var g=" "+f.className+" ",h=f.className;for(var i=0,j=b.length;i<j;i++)g.indexOf(" "+b[i]+" ")<0&&(h+=" "+b[i]);f.className=d.trim(h)}else f.className=a}}return this},removeClass:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a==="string"||a===b){var c=(a||"").split(k);for(var e=0,f=this.length;e<f;e++){var g=this[e];if(g.nodeType===1&&g.className)if(a){var h=(" "+g.className+" ").replace(j," ");for(var i=0,l=c.length;i<l;i++)h=h.replace(" "+c[i]+" "," ");g.className=d.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,e=typeof b==="boolean";if(d.isFunction(a))return this.each(function(c){var e=d(this);e.toggleClass(a.call(this,c,e.attr("class"),b),b)});return this.each(function(){if(c==="string"){var f,g=0,h=d(this),i=b,j=a.split(k);while(f=j[g++])i=e?i:!h.hasClass(f),h[i?"addClass":"removeClass"](f)}else if(c==="undefined"||c==="boolean")this.className&&d._data(this,"__className__",this.className),this.className=this.className||a===!1?"":d._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(j," ").indexOf(b)>-1)return!0;return!1},val:function(a){if(!arguments.length){var c=this[0];if(c){if(d.nodeName(c,"option")){var e=c.attributes.value;return!e||e.specified?c.value:c.text}if(d.nodeName(c,"select")){var f=c.selectedIndex,g=[],h=c.options,i=c.type==="select-one";if(f<0)return null;for(var j=i?f:0,k=i?f+1:h.length;j<k;j++){var m=h[j];if(m.selected&&(d.support.optDisabled?!m.disabled:m.getAttribute("disabled")===null)&&(!m.parentNode.disabled||!d.nodeName(m.parentNode,"optgroup"))){a=d(m).val();if(i)return a;g.push(a)}}if(i&&!g.length&&h.length)return d(h[f]).val();return g}if(q.test(c.type)&&!d.support.checkOn)return c.getAttribute("value")===null?"on":c.value;return(c.value||"").replace(l,"")}return b}var n=d.isFunction(a);return this.each(function(b){var c=d(this),e=a;if(this.nodeType===1){n&&(e=a.call(this,b,c.val())),e==null?e="":typeof e==="number"?e+="":d.isArray(e)&&(e=d.map(e,function(a){return a==null?"":a+""}));if(d.isArray(e)&&q.test(this.type))this.checked=d.inArray(c.val(),e)>=0;else if(d.nodeName(this,"select")){var f=d.makeArray(e);d("option",this).each(function(){this.selected=d.inArray(d(this).val(),f)>=0}),f.length||(this.selectedIndex=-1)}else this.value=e}})}}),d.extend({attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,e,f){if(!a||a.nodeType===3||a.nodeType===8||a.nodeType===2)return b;if(f&&c in d.attrFn)return d(a)[c](e);var g=a.nodeType!==1||!d.isXMLDoc(a),h=e!==b;c=g&&d.props[c]||c;if(a.nodeType===1){var i=m.test(c);if(c==="selected"&&!d.support.optSelected){var j=a.parentNode;j&&(j.selectedIndex,j.parentNode&&j.parentNode.selectedIndex)}if((c in a||a[c]!==b)&&g&&!i){h&&(c==="type"&&n.test(a.nodeName)&&a.parentNode&&d.error("type property can't be changed"),e===null?a.nodeType===1&&a.removeAttribute(c):a[c]=e);if(d.nodeName(a,"form")&&a.getAttributeNode(c))return a.getAttributeNode(c).nodeValue;if(c==="tabIndex"){var k=a.getAttributeNode("tabIndex");return k&&k.specified?k.value:o.test(a.nodeName)||p.test(a.nodeName)&&a.href?0:b}return a[c]}if(!d.support.style&&g&&c==="style"){h&&(a.style.cssText=""+e);return a.style.cssText}h&&a.setAttribute(c,""+e);if(!a.attributes[c]&&(a.hasAttribute&&!a.hasAttribute(c)))return b;var l=!d.support.hrefNormalized&&g&&i?a.getAttribute(c,2):a.getAttribute(c);return l===null?b:l}h&&(a[c]=e);return a[c]}});var r=/\.(.*)$/,s=/^(?:textarea|input|select)$/i,t=/\./g,u=/ /g,v=/[^\w\s.|`]/g,w=function(a){return a.replace(v,"\\$&")};d.event={add:function(c,e,f,g){if(c.nodeType!==3&&c.nodeType!==8){try{d.isWindow(c)&&(c!==a&&!c.frameElement)&&(c=a)}catch(h){}if(f===!1)f=x;else if(!f)return;var i,j;f.handler&&(i=f,f=i.handler),f.guid||(f.guid=d.guid++);var k=d._data(c);if(!k)return;var l=k.events,m=k.handle;l||(k.events=l={}),m||(k.handle=m=function(a){return typeof d!=="undefined"&&d.event.triggered!==a.type?d.event.handle.apply(m.elem,arguments):b}),m.elem=c,e=e.split(" ");var n,o=0,p;while(n=e[o++]){j=i?d.extend({},i):{handler:f,data:g},n.indexOf(".")>-1?(p=n.split("."),n=p.shift(),j.namespace=p.slice(0).sort().join(".")):(p=[],j.namespace=""),j.type=n,j.guid||(j.guid=f.guid);var q=l[n],r=d.event.special[n]||{};if(!q){q=l[n]=[];if(!r.setup||r.setup.call(c,g,p,m)===!1)c.addEventListener?c.addEventListener(n,m,!1):c.attachEvent&&c.attachEvent("on"+n,m)}r.add&&(r.add.call(c,j),j.handler.guid||(j.handler.guid=f.guid)),q.push(j),d.event.global[n]=!0}c=null}},global:{},remove:function(a,c,e,f){if(a.nodeType!==3&&a.nodeType!==8){e===!1&&(e=x);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=d.hasData(a)&&d._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(e=c.handler,c=c.type);if(!c||typeof c==="string"&&c.charAt(0)==="."){c=c||"";for(h in t)d.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+d.map(m.slice(0).sort(),w).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!e){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))d.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=d.event.special[h]||{};for(j=f||0;j<p.length;j++){q=p[j];if(e.guid===q.guid){if(l||n.test(q.namespace))f==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(f!=null)break}}if(p.length===0||f!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&d.removeEvent(a,h,s.handle),g=null,delete t[h]}if(d.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,d.isEmptyObject(s)&&d.removeData(a,b,!0)}}},trigger:function(a,c,e){var f=a.type||a,g=arguments[3];if(!g){a=typeof a==="object"?a[d.expando]?a:d.extend(d.Event(f),a):d.Event(f),f.indexOf("!")>=0&&(a.type=f=f.slice(0,-1),a.exclusive=!0),e||(a.stopPropagation(),d.event.global[f]&&d.each(d.cache,function(){var b=d.expando,e=this[b];e&&e.events&&e.events[f]&&d.event.trigger(a,c,e.handle.elem)}));if(!e||e.nodeType===3||e.nodeType===8)return b;a.result=b,a.target=e,c=d.makeArray(c),c.unshift(a)}a.currentTarget=e;var h=d._data(e,"handle");h&&h.apply(e,c);var i=e.parentNode||e.ownerDocument;try{e&&e.nodeName&&d.noData[e.nodeName.toLowerCase()]||e["on"+f]&&e["on"+f].apply(e,c)===!1&&(a.result=!1,a.preventDefault())}catch(j){}if(!a.isPropagationStopped()&&i)d.event.trigger(a,c,i,!0);else if(!a.isDefaultPrevented()){var k,l=a.target,m=f.replace(r,""),n=d.nodeName(l,"a")&&m==="click",o=d.event.special[m]||{};if((!o._default||o._default.call(e,a)===!1)&&!n&&!(l&&l.nodeName&&d.noData[l.nodeName.toLowerCase()])){try{l[m]&&(k=l["on"+m],k&&(l["on"+m]=null),d.event.triggered=a.type,l[m]())}catch(p){}k&&(l["on"+m]=k),d.event.triggered=b}}},handle:function(c){var e,f,g,h,i,j=[],k=d.makeArray(arguments);c=k[0]=d.event.fix(c||a.event),c.currentTarget=this,e=c.type.indexOf(".")<0&&!c.exclusive,e||(g=c.type.split("."),c.type=g.shift(),j=g.slice(0).sort(),h=new RegExp("(^|\\.)"+j.join("\\.(?:.*\\.)?")+"(\\.|$)")),c.namespace=c.namespace||j.join("."),i=d._data(this,"events"),f=(i||{})[c.type];if(i&&f){f=f.slice(0);for(var l=0,m=f.length;l<m;l++){var n=f[l];if(e||h.test(n.namespace)){c.handler=n.handler,c.data=n.data,c.handleObj=n;var o=n.handler.apply(this,k);o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[d.expando])return a;var e=a;a=d.Event(e);for(var f=this.props.length,g;f;)g=this.props[--f],a[g]=e[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=c.documentElement,i=c.body;a.pageX=a.clientX+(h&&h.scrollLeft||i&&i.scrollLeft||0)-(h&&h.clientLeft||i&&i.clientLeft||0),a.pageY=a.clientY+(h&&h.scrollTop||i&&i.scrollTop||0)-(h&&h.clientTop||i&&i.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:d.proxy,special:{ready:{setup:d.bindReady,teardown:d.noop},live:{add:function(a){d.event.add(this,H(a.origType,a.selector),d.extend({},a,{handler:G,guid:a.handler.guid}))},remove:function(a){d.event.remove(this,H(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){d.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},d.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},d.Event=function(a){if(!this.preventDefault)return new d.Event(a);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?y:x):this.type=a,this.timeStamp=d.now(),this[d.expando]=!0},d.Event.prototype={preventDefault:function(){this.isDefaultPrevented=y;var a=this.originalEvent;a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=y;var a=this.originalEvent;a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=y,this.stopPropagation()},isDefaultPrevented:x,isPropagationStopped:x,isImmediatePropagationStopped:x};var z=function(a){var b=a.relatedTarget;try{if(b&&b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&(a.type=a.data,d.event.handle.apply(this,arguments))}catch(e){}},A=function(a){a.type=a.data,d.event.handle.apply(this,arguments)};d.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){d.event.special[a]={setup:function(c){d.event.add(this,b,c&&c.selector?A:z,a)},teardown:function(a){d.event.remove(this,b,a&&a.selector?A:z)}}}),d.support.submitBubbles||(d.event.special.submit={setup:function(a,b){if(this.nodeName&&this.nodeName.toLowerCase()!=="form")d.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&d(b).closest("form").length&&E("submit",this,arguments)}),d.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&d(b).closest("form").length&&a.keyCode===13&&E("submit",this,arguments)});else return!1},teardown:function(a){d.event.remove(this,".specialSubmit")}});if(!d.support.changeBubbles){var B,C=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?d.map(a.options,function(a){return a.selected}).join("-"):"":a.nodeName.toLowerCase()==="select"&&(c=a.selectedIndex);return c},D=function D(a){var c=a.target,e,f;if(s.test(c.nodeName)&&!c.readOnly){e=d._data(c,"_change_data"),f=C(c),(a.type!=="focusout"||c.type!=="radio")&&d._data(c,"_change_data",f);if(e===b||f===e)return;if(e!=null||f)a.type="change",a.liveFired=b,d.event.trigger(a,arguments[1],c)}};d.event.special.change={filters:{focusout:D,beforedeactivate:D,click:function(a){var b=a.target,c=b.type;(c==="radio"||c==="checkbox"||b.nodeName.toLowerCase()==="select")&&D.call(this,a)},keydown:function(a){var b=a.target,c=b.type;(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&D.call(this,a)},beforeactivate:function(a){var b=a.target;d._data(b,"_change_data",C(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in B)d.event.add(this,c+".specialChange",B[c]);return s.test(this.nodeName)},teardown:function(a){d.event.remove(this,".specialChange");return s.test(this.nodeName)}},B=d.event.special.change.filters,B.focus=B.beforeactivate}c.addEventListener&&d.each({focus:"focusin",blur:"focusout"},function(a,b){function f(a){var c=d.event.fix(a);c.type=b,c.originalEvent={},d.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var e=0;d.event.special[b]={setup:function(){e++===0&&c.addEventListener(a,f,!0)},teardown:function(){--e===0&&c.removeEventListener(a,f,!0)}}}),d.each(["bind","one"],function(a,c){d.fn[c]=function(a,e,f){if(typeof a==="object"){for(var g in a)this[c](g,e,a[g],f);return this}if(d.isFunction(e)||e===!1)f=e,e=b;var h=c==="one"?d.proxy(f,function(a){d(this).unbind(a,h);return f.apply(this,arguments)}):f;if(a==="unload"&&c!=="one")this.one(a,e,f);else for(var i=0,j=this.length;i<j;i++)d.event.add(this[i],a,h,e);return this}}),d.fn.extend({unbind:function(a,b){if(typeof a!=="object"||a.preventDefault)for(var e=0,f=this.length;e<f;e++)d.event.remove(this[e],a,b);else for(var c in a)this.unbind(c,a[c]);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){d.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){var c=d.Event(a);c.preventDefault(),c.stopPropagation(),d.event.trigger(c,b,this[0]);return c.result}},toggle:function(a){var b=arguments,c=1;while(c<b.length)d.proxy(a,b[c++]);return this.click(d.proxy(a,function(e){var f=(d._data(this,"lastToggle"+a.guid)||0)%c;d._data(this,"lastToggle"+a.guid,f+1),e.preventDefault();return b[f].apply(this,arguments)||!1}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var F={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};d.each(["live","die"],function(a,c){d.fn[c]=function(a,e,f,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:d(this.context);if(typeof a==="object"&&!a.preventDefault){for(var o in a)n[c](o,e,a[o],m);return this}d.isFunction(e)&&(f=e,e=b),a=(a||"").split(" ");while((h=a[i++])!=null){j=r.exec(h),k="",j&&(k=j[0],h=h.replace(r,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,h==="focus"||h==="blur"?(a.push(F[h]+k),h=h+k):h=(F[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)d.event.add(n[p],"live."+H(h,m),{data:e,selector:m,handler:f,origType:h,origHandler:f,preType:l});else n.unbind("live."+H(h,m),f)}return this}}),d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){d.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},d.attrFn&&(d.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!=="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,e=0,f=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,e,g){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!=="string")return e;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(f.call(n)==="[object Array]")if(u)if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&e.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&e.push(j[t]);else e.push.apply(e,n);else p(n,e);o&&(k(o,h,e,g),k.uniqueSort(e));return e};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!=="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(f){if(f===!0)continue}else g=o=!0}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b==="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1){}a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b==="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=u;typeof b==="string"&&!j.test(b)&&(b=b.toLowerCase(),d=b,g=t),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=u;typeof b==="string"&&!j.test(b)&&(b=b.toLowerCase(),d=b,g=t),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!=="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!=="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return"text"===c&&(b===c||b===null)},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(f.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length==="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(a===b){g=!0;return 0}if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!=="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!=="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};d.find=k,d.expr=k.selectors,d.expr[":"]=d.expr.filters,d.unique=k.uniqueSort,d.text=k.getText,d.isXMLDoc=k.isXML,d.contains=k.contains}();var I=/Until$/,J=/^(?:parents|prevUntil|prevAll)/,K=/,/,L=/^.[^:#\[\.,]*$/,M=Array.prototype.slice,N=d.expr.match.POS,O={children:!0,contents:!0,next:!0,prev:!0};d.fn.extend({find:function(a){var b=this.pushStack("","find",a),c=0;for(var e=0,f=this.length;e<f;e++){c=b.length,d.find(a,this[e],b);if(e>0)for(var g=c;g<b.length;g++)for(var h=0;h<c;h++)if(b[h]===b[g]){b.splice(g--,1);break}}return b},has:function(a){var b=d(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(d.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(Q(this,a,!1),"not",a)},filter:function(a){return this.pushStack(Q(this,a,!0),"filter",a)},is:function(a){return!!a&&d.filter(a,this).length>0},closest:function(a,b){var c=[],e,f,g=this[0];if(d.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(e=0,f=a.length;e<f;e++)i=a[e],j[i]||(j[i]=d.expr.match.POS.test(i)?d(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:d(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=N.test(a)?d(a,b||this.context):null;for(e=0,f=this.length;e<f;e++){g=this[e];while(g){if(l?l.index(g)>-1:d.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b)break}}c=c.length>1?d.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a==="string")return d.inArray(this[0],a?d(a):this.parent().children());return d.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a==="string"?d(a,b):d.makeArray(a),e=d.merge(this.get(),c);return this.pushStack(P(c[0])||P(e[0])?e:d.unique(e))},andSelf:function(){return this.add(this.prevObject)}}),d.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return d.dir(a,"parentNode")},parentsUntil:function(a,b,c){return d.dir(a,"parentNode",c)},next:function(a){return d.nth(a,2,"nextSibling")},prev:function(a){return d.nth(a,2,"previousSibling")},nextAll:function(a){return d.dir(a,"nextSibling")},prevAll:function(a){return d.dir(a,"previousSibling")},nextUntil:function(a,b,c){return d.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return d.dir(a,"previousSibling",c)},siblings:function(a){return d.sibling(a.parentNode.firstChild,a)},children:function(a){return d.sibling(a.firstChild)},contents:function(a){return d.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:d.makeArray(a.childNodes)}},function(a,b){d.fn[a]=function(c,e){var f=d.map(this,b,c),g=M.call(arguments);I.test(a)||(e=c),e&&typeof e==="string"&&(f=d.filter(e,f)),f=this.length>1&&!O[a]?d.unique(f):f,(this.length>1||K.test(e))&&J.test(a)&&(f=f.reverse());return this.pushStack(f,a,g.join(","))}}),d.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?d.find.matchesSelector(b[0],a)?[b[0]]:[]:d.find.matches(a,b)},dir:function(a,c,e){var f=[],g=a[c];while(g&&g.nodeType!==9&&(e===b||g.nodeType!==1||!d(g).is(e)))g.nodeType===1&&f.push(g),g=g[c];return f},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var R=/ jQuery\d+="(?:\d+|null)"/g,S=/^\s+/,T=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,U=/<([\w:]+)/,V=/<tbody/i,W=/<|&#?\w+;/,X=/<(?:script|object|embed|option|style)/i,Y=/checked\s*(?:[^=]|=\s*.checked.)/i,Z={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};Z.optgroup=Z.option,Z.tbody=Z.tfoot=Z.colgroup=Z.caption=Z.thead,Z.th=Z.td,d.support.htmlSerialize||(Z._default=[1,"div<div>","</div>"]),d.fn.extend({text:function(a){if(d.isFunction(a))return this.each(function(b){var c=d(this);c.text(a.call(this,b,c.text()))});if(typeof a!=="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return d.text(this)},wrapAll:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapAll(a.call(this,b))});if(this[0]){var b=d(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(d.isFunction(a))return this.each(function(b){d(this).wrapInner(a.call(this,b))});return this.each(function(){var b=d(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){d(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){d.nodeName(this,"body")||d(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=d(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,d(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,e;(e=this[c])!=null;c++)if(!a||d.filter(a,[e]).length)!b&&e.nodeType===1&&(d.cleanData(e.getElementsByTagName("*")),d.cleanData([e])),e.parentNode&&e.parentNode.removeChild(e);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&d.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return d.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(R,""):null;if(typeof a!=="string"||X.test(a)||!d.support.leadingWhitespace&&S.test(a)||Z[(U.exec(a)||["",""])[1].toLowerCase()])d.isFunction(a)?this.each(function(b){var c=d(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);else{a=a.replace(T,"<$1></$2>");try{for(var c=0,e=this.length;c<e;c++)this[c].nodeType===1&&(d.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(f){this.empty().append(a)}}return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(d.isFunction(a))return this.each(function(b){var c=d(this),e=c.html();c.replaceWith(a.call(this,b,e))});typeof a!=="string"&&(a=d(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;d(this).remove(),b?d(b).before(a):d(c).append(a)})}return this.length?this.pushStack(d(d.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,e){var f,g,h,i,j=a[0],k=[];if(!d.support.checkClone&&arguments.length===3&&typeof j==="string"&&Y.test(j))return this.each(function(){d(this).domManip(a,c,e,!0)});if(d.isFunction(j))return this.each(function(f){var g=d(this);a[0]=j.call(this,f,c?g.html():b),g.domManip(a,c,e)});if(this[0]){i=j&&j.parentNode,d.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?f={fragment:i}:f=d.buildFragment(a,this,k),h=f.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&d.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)e.call(c?$(this[l],g):this[l],f.cacheable||m>1&&l<n?d.clone(h,!0,!0):h)}k.length&&d.each(k,bc)}return this}}),d.buildFragment=function(a,b,e){var f,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]==="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!X.test(a[0])&&(d.support.checkClone||!Y.test(a[0]))&&(g=!0,h=d.fragments[a[0]],h&&(h!==1&&(f=h))),f||(f=i.createDocumentFragment(),d.clean(a,i,f,e)),g&&(d.fragments[a[0]]=h?f:1);return{fragment:f,cacheable:g}},d.fragments={},d.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){d.fn[a]=function(c){var e=[],f=d(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&f.length===1){f[b](this[0]);return this}for(var h=0,i=f.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();d(f[h])[b](j),e=e.concat(j)}return this.pushStack(e,a,f.selector)}}),d.extend({clone:function(a,b,c){var e=a.cloneNode(!0),f,g,h;if((!d.support.noCloneEvent||!d.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!d.isXMLDoc(a)){ba(a,e),f=bb(a),g=bb(e);for(h=0;f[h];++h)ba(f[h],g[h])}if(b){_(a,e);if(c){f=bb(a),g=bb(e);for(h=0;f[h];++h)_(f[h],g[h])}}return e},clean:function(a,b,e,f){b=b||c,typeof b.createElement==="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var g=[];for(var h=0,i;(i=a[h])!=null;h++){typeof i==="number"&&(i+="");if(!i)continue;if(typeof i!=="string"||W.test(i)){if(typeof i==="string"){i=i.replace(T,"<$1></$2>");var j=(U.exec(i)||["",""])[1].toLowerCase(),k=Z[j]||Z._default,l=k[0],m=b.createElement("div");m.innerHTML=k[1]+i+k[2];while(l--)m=m.lastChild;if(!d.support.tbody){var n=V.test(i),o=j==="table"&&!n?m.firstChild&&m.firstChild.childNodes:k[1]==="<table>"&&!n?m.childNodes:[];for(var p=o.length-1;p>=0;--p)d.nodeName(o[p],"tbody")&&!o[p].childNodes.length&&o[p].parentNode.removeChild(o[p])}!d.support.leadingWhitespace&&S.test(i)&&m.insertBefore(b.createTextNode(S.exec(i)[0]),m.firstChild),i=m.childNodes}}else i=b.createTextNode(i);i.nodeType?g.push(i):g=d.merge(g,i)}if(e)for(h=0;g[h];h++)!f||!d.nodeName(g[h],"script")||g[h].type&&g[h].type.toLowerCase()!=="text/javascript"?(g[h].nodeType===1&&g.splice.apply(g,[h+1,0].concat(d.makeArray(g[h].getElementsByTagName("script")))),e.appendChild(g[h])):f.push(g[h].parentNode?g[h].parentNode.removeChild(g[h]):g[h]);return g},cleanData:function(a){var b,c,e=d.cache,f=d.expando,g=d.event.special,h=d.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&d.noData[j.nodeName.toLowerCase()])continue;c=j[d.expando];if(c){b=e[c]&&e[c][f];if(b&&b.events){for(var k in b.events)g[k]?d.event.remove(j,k):d.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[d.expando]:j.removeAttribute&&j.removeAttribute(d.expando),delete e[c]}}}});var bd=/alpha\([^)]*\)/i,be=/opacity=([^)]*)/,bf=/-([a-z])/ig,bg=/([A-Z]|^ms)/g,bh=/^-?\d+(?:px)?$/i,bi=/^-?\d/,bj={position:"absolute",visibility:"hidden",display:"block"},bk=["Left","Right"],bl=["Top","Bottom"],bm,bn,bo,bp=function(a,b){return b.toUpperCase()};d.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return d.access(this,a,c,!0,function(a,c,e){return e!==b?d.style(a,c,e):d.css(a,c)})},d.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bm(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0},cssProps:{"float":d.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,e,f){if(a&&a.nodeType!==3&&a.nodeType!==8&&a.style){var g,h=d.camelCase(c),i=a.style,j=d.cssHooks[h];c=d.cssProps[h]||h;if(e===b){if(j&&"get"in j&&(g=j.get(a,!1,f))!==b)return g;return i[c]}if(typeof e==="number"&&isNaN(e)||e==null)return;typeof e==="number"&&!d.cssNumber[h]&&(e+="px");if(!j||!("set"in j)||(e=j.set(a,e))!==b)try{i[c]=e}catch(k){}}},css:function(a,c,e){var f,g=d.camelCase(c),h=d.cssHooks[g];c=d.cssProps[g]||g;if(h&&"get"in h&&(f=h.get(a,!0,e))!==b)return f;if(bm)return bm(a,c,g)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bf,bp)}}),d.curCSS=d.css,d.each(["height","width"],function(a,b){d.cssHooks[b]={get:function(a,c,e){var f;if(c){a.offsetWidth!==0?f=bq(a,b,e):d.swap(a,bj,function(){f=bq(a,b,e)});if(f<=0){f=bm(a,b,b),f==="0px"&&bo&&(f=bo(a,b,b));if(f!=null)return f===""||f==="auto"?"0px":f}if(f<0||f==null){f=a.style[b];return f===""||f==="auto"?"0px":f}return typeof f==="string"?f:f+"px"}},set:function(a,b){if(!bh.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),d.support.opacity||(d.cssHooks.opacity={get:function(a,b){return be.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style;c.zoom=1;var e=d.isNaN(b)?"":"alpha(opacity="+b*100+")",f=c.filter||"";c.filter=bd.test(f)?f.replace(bd,e):c.filter+" "+e}}),d(function(){d.support.reliableMarginRight||(d.cssHooks.marginRight={get:function(a,b){var c;d.swap(a,{display:"inline-block"},function(){b?c=bm(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bn=function(a,c,e){var f,g,h;e=e.replace(bg,"-$1").toLowerCase();if(!(g=a.ownerDocument.defaultView))return b;if(h=g.getComputedStyle(a,null))f=h.getPropertyValue(e),f===""&&!d.contains(a.ownerDocument.documentElement,a)&&(f=d.style(a,e));return f}),c.documentElement.currentStyle&&(bo=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bh.test(d)&&bi.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bm=bn||bo,d.expr&&d.expr.filters&&(d.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!d.support.reliableHiddenOffsets&&(a.style.display||d.css(a,"display"))==="none"},d.expr.filters.visible=function(a){return!d.expr.filters.hidden(a)});var br=/%20/g,bs=/\[\]$/,bt=/\r?\n/g,bu=/#.*$/,bv=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bw=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bx=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,by=/^(?:GET|HEAD)$/,bz=/^\/\//,bA=/\?/,bB=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bC=/^(?:select|textarea)/i,bD=/\s+/,bE=/([?&])_=[^&]*/,bF=/(^|\-)([a-z])/g,bG=function(a,b,c){return b+c.toUpperCase()},bH=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bI=d.fn.load,bJ={},bK={},bL,bM;try{bL=c.location.href}catch(bN){bL=c.createElement("a"),bL.href="",bL=bL.href}bM=bH.exec(bL.toLowerCase())||[],d.fn.extend({load:function(a,c,e){if(typeof a!=="string"&&bI)return bI.apply(this,arguments);if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var g=a.slice(f,a.length);a=a.slice(0,f)}var h="GET";c&&(d.isFunction(c)?(e=c,c=b):typeof c==="object"&&(c=d.param(c,d.ajaxSettings.traditional),h="POST"));var i=this;d.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?d("<div>").append(c.replace(bB,"")).find(g):c)),e&&i.each(e,[c,b,a])}});return this},serialize:function(){return d.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?d.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bC.test(this.nodeName)||bw.test(this.type))}).map(function(a,b){var c=d(this).val();return c==null?null:d.isArray(c)?d.map(c,function(a,c){return{name:b.name,value:a.replace(bt,"\r\n")}}):{name:b.name,value:c.replace(bt,"\r\n")}}).get()}}),d.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){d.fn[b]=function(a){return this.bind(b,a)}}),d.each(["get","post"],function(a,c){d[c]=function(a,e,f,g){d.isFunction(e)&&(g=g||f,f=e,e=b);return d.ajax({type:c,url:a,data:e,success:f,dataType:g})}}),d.extend({getScript:function(a,c){return d.get(a,b,c,"script")},getJSON:function(a,b,c){return d.get(a,b,c,"json")},ajaxSetup:function(a,b){b?d.extend(!0,a,d.ajaxSettings,b):(b=a,a=d.extend(!0,d.ajaxSettings,b));for(var c in {context:1,url:1})c in b?a[c]=b[c]:c in d.ajaxSettings&&(a[c]=d.ajaxSettings[c]);return a},ajaxSettings:{url:bL,isLocal:bx.test(bM[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":d.parseJSON,"text xml":d.parseXML}},ajaxPrefilter:bO(bJ),ajaxTransport:bO(bK),ajax:function(a,c){function v(a,c,l,n){if(r!==2){r=2,p&&clearTimeout(p),o=b,m=n||"",u.readyState=a?4:0;var q,t,v,w=l?bR(e,u,l):b,x,y;if(a>=200&&a<300||a===304){if(e.ifModified){if(x=u.getResponseHeader("Last-Modified"))d.lastModified[k]=x;if(y=u.getResponseHeader("Etag"))d.etag[k]=y}if(a===304)c="notmodified",q=!0;else try{t=bS(e,w),c="success",q=!0}catch(z){c="parsererror",v=z}}else{v=c;if(!c||a)c="error",a<0&&(a=0)}u.status=a,u.statusText=c,q?h.resolveWith(f,[t,c,u]):h.rejectWith(f,[u,c,v]),u.statusCode(j),j=b,s&&g.trigger("ajax"+(q?"Success":"Error"),[u,e,q?t:v]),i.resolveWith(f,[u,c]),s&&(g.trigger("ajaxComplete",[u,e]),--d.active||d.event.trigger("ajaxStop"))}}typeof a==="object"&&(c=a,a=b),c=c||{};var e=d.ajaxSetup({},c),f=e.context||e,g=f!==e&&(f.nodeType||f instanceof d)?d(f):d.event,h=d.Deferred(),i=d._Deferred(),j=e.statusCode||{},k,l={},m,n,o,p,q,r=0,s,t,u={readyState:0,setRequestHeader:function(a,b){r||(l[a.toLowerCase().replace(bF,bG)]=b);return this},getAllResponseHeaders:function(){return r===2?m:null},getResponseHeader:function(a){var c;if(r===2){if(!n){n={};while(c=bv.exec(m))n[c[1].toLowerCase()]=c[2]}c=n[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){r||(e.mimeType=a);return this},abort:function(a){a=a||"abort",o&&o.abort(a),v(0,a);return this}};h.promise(u),u.success=u.done,u.error=u.fail,u.complete=i.done,u.statusCode=function(a){if(a){var b;if(r<2)for(b in a)j[b]=[j[b],a[b]];else b=a[u.status],u.then(b,b)}return this},e.url=((a||e.url)+"").replace(bu,"").replace(bz,bM[1]+"//"),e.dataTypes=d.trim(e.dataType||"*").toLowerCase().split(bD),e.crossDomain==null&&(q=bH.exec(e.url.toLowerCase()),e.crossDomain=q&&(q[1]!=bM[1]||q[2]!=bM[2]||(q[3]||(q[1]==="http:"?80:443))!=(bM[3]||(bM[1]==="http:"?80:443)))),e.data&&e.processData&&typeof e.data!=="string"&&(e.data=d.param(e.data,e.traditional)),bP(bJ,e,c,u);if(r===2)return!1;s=e.global,e.type=e.type.toUpperCase(),e.hasContent=!by.test(e.type),s&&d.active++===0&&d.event.trigger("ajaxStart");if(!e.hasContent){e.data&&(e.url+=(bA.test(e.url)?"&":"?")+e.data),k=e.url;if(e.cache===!1){var w=d.now(),x=e.url.replace(bE,"$1_="+w);e.url=x+(x===e.url?(bA.test(e.url)?"&":"?")+"_="+w:"")}}if(e.data&&e.hasContent&&e.contentType!==!1||c.contentType)l["Content-Type"]=e.contentType;e.ifModified&&(k=k||e.url,d.lastModified[k]&&(l["If-Modified-Since"]=d.lastModified[k]),d.etag[k]&&(l["If-None-Match"]=d.etag[k])),l.Accept=e.dataTypes[0]&&e.accepts[e.dataTypes[0]]?e.accepts[e.dataTypes[0]]+(e.dataTypes[0]!=="*"?", */*; q=0.01":""):e.accepts["*"];for(t in e.headers)u.setRequestHeader(t,e.headers[t]);if(e.beforeSend&&(e.beforeSend.call(f,u,e)===!1||r===2)){u.abort();return!1}for(t in {success:1,error:1,complete:1})u[t](e[t]);o=bP(bK,e,c,u);if(o){u.readyState=1,s&&g.trigger("ajaxSend",[u,e]),e.async&&e.timeout>0&&(p=setTimeout(function(){u.abort("timeout")},e.timeout));try{r=1,o.send(l,v)}catch(y){status<2?v(-1,y):d.error(y)}}else v(-1,"No Transport");return u},param:function(a,c){var e=[],f=function(a,b){b=d.isFunction(b)?b():b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=d.ajaxSettings.traditional);if(d.isArray(a)||a.jquery&&!d.isPlainObject(a))d.each(a,function(){f(this.name,this.value)});else for(var g in a)bQ(g,a[g],c,f);return e.join("&").replace(br,"+")}}),d.extend({active:0,lastModified:{},etag:{}});var bT=d.now(),bU=/(\=)\?(&|$)|\?\?/i;d.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return d.expando+"_"+bT++}}),d.ajaxPrefilter("json jsonp",function(b,c,e){var f=typeof b.data==="string";if(b.dataTypes[0]==="jsonp"||c.jsonpCallback||c.jsonp!=null||b.jsonp!==!1&&(bU.test(b.url)||f&&bU.test(b.data))){var g,h=b.jsonpCallback=d.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2",m=function(){a[h]=i,g&&d.isFunction(i)&&a[h](g[0])};b.jsonp!==!1&&(j=j.replace(bU,l),b.url===j&&(f&&(k=k.replace(bU,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},e.then(m,m),b.converters["script json"]=function(){g||d.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),d.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){d.globalEval(a);return a}}}),d.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),d.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var bV=d.now(),bW,bX;d.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&bZ()||b$()}:bZ,bX=d.ajaxSettings.xhr(),d.support.ajax=!!bX,d.support.cors=bX&&"withCredentials"in bX,bX=b,d.support.ajax&&d.ajaxTransport(function(a){if(!a.crossDomain||d.support.cors){var c;return{send:function(e,f){var g=a.xhr(),h,i;a.username?g.open(a.type,a.url,a.async,a.username,a.password):g.open(a.type,a.url,a.async);if(a.xhrFields)for(i in a.xhrFields)g[i]=a.xhrFields[i];a.mimeType&&g.overrideMimeType&&g.overrideMimeType(a.mimeType),!a.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(i in e)g.setRequestHeader(i,e[i])}catch(j){}g.send(a.hasContent&&a.data||null),c=function(e,i){var j,k,l,m,n;try{if(c&&(i||g.readyState===4)){c=b,h&&(g.onreadystatechange=d.noop,delete bW[h]);if(i)g.readyState!==4&&g.abort();else{j=g.status,l=g.getAllResponseHeaders(),m={},n=g.responseXML,n&&n.documentElement&&(m.xml=n),m.text=g.responseText;try{k=g.statusText}catch(o){k=""}j||!a.isLocal||a.crossDomain?j===1223&&(j=204):j=m.text?200:404}}}catch(p){i||f(-1,p)}m&&f(j,k,m,l)},a.async&&g.readyState!==4?(bW||(bW={},bY()),h=bV++,g.onreadystatechange=bW[h]=c):c()},abort:function(){c&&c(0,1)}}}});var b_={},ca=/^(?:toggle|show|hide)$/,cb=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cc,cd=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];d.fn.extend({show:function(a,b,c){var e,f;if(a||a===0)return this.animate(ce("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)e=this[g],f=e.style.display,!d._data(e,"olddisplay")&&f==="none"&&(f=e.style.display=""),f===""&&d.css(e,"display")==="none"&&d._data(e,"olddisplay",cf(e.nodeName));for(g=0;g<h;g++){e=this[g],f=e.style.display;if(f===""||f==="none")e.style.display=d._data(e,"olddisplay")||""}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ce("hide",3),a,b,c);for(var e=0,f=this.length;e<f;e++){var g=d.css(this[e],"display");g!=="none"&&!d._data(this[e],"olddisplay")&&d._data(this[e],"olddisplay",g)}for(e=0;e<f;e++)this[e].style.display="none";return this},_toggle:d.fn.toggle,toggle:function(a,b,c){var e=typeof a==="boolean";d.isFunction(a)&&d.isFunction(b)?this._toggle.apply(this,arguments):a==null||e?this.each(function(){var b=e?a:d(this).is(":hidden");d(this)[b?"show":"hide"]()}):this.animate(ce("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,e){var f=d.speed(b,c,e);if(d.isEmptyObject(a))return this.each(f.complete);return this[f.queue===!1?"each":"queue"](function(){var b=d.extend({},f),c,e=this.nodeType===1,g=e&&d(this).is(":hidden"),h=this;for(c in a){var i=d.camelCase(c);c!==i&&(a[i]=a[c],delete a[c],c=i);if(a[c]==="hide"&&g||a[c]==="show"&&!g)return b.complete.call(this);if(e&&(c==="height"||c==="width")){b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(d.css(this,"display")==="inline"&&d.css(this,"float")==="none")if(d.support.inlineBlockNeedsLayout){var j=cf(this.nodeName);j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)}else this.style.display="inline-block"}d.isArray(a[c])&&((b.specialEasing=b.specialEasing||{})[c]=a[c][1],a[c]=a[c][0])}b.overflow!=null&&(this.style.overflow="hidden"),b.curAnim=d.extend({},a),d.each(a,function(c,e){var f=new d.fx(h,b,c);if(ca.test(e))f[e==="toggle"?g?"show":"hide":e](a);else{var i=cb.exec(e),j=f.cur();if(i){var k=parseFloat(i[2]),l=i[3]||(d.cssNumber[c]?"":"px");l!=="px"&&(d.style(h,c,(k||1)+l),j=(k||1)/f.cur()*j,d.style(h,c,j+l)),i[1]&&(k=(i[1]==="-="?-1:1)*k+j),f.custom(j,k,l)}else f.custom(j,e,"")}});return!0})},stop:function(a,b){var c=d.timers;a&&this.queue([]),this.each(function(){for(var a=c.length-1;a>=0;a--)c[a].elem===this&&(b&&c[a](!0),c.splice(a,1))}),b||this.dequeue();return this}}),d.each({slideDown:ce("show",1),slideUp:ce("hide",1),slideToggle:ce("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){d.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),d.extend({speed:function(a,b,c){var e=a&&typeof a==="object"?d.extend({},a):{complete:c||!c&&b||d.isFunction(a)&&a,duration:a,easing:c&&b||b&&!d.isFunction(b)&&b};e.duration=d.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in d.fx.speeds?d.fx.speeds[e.duration]:d.fx.speeds._default,e.old=e.complete,e.complete=function(){e.queue!==!1&&d(this).dequeue(),d.isFunction(e.old)&&e.old.call(this)};return e},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig||(b.orig={})}}),d.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(d.fx.step[this.prop]||d.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=d.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return e.step(a)}var e=this,f=d.fx;this.startTime=d.now(),this.start=a,this.end=b,this.unit=c||this.unit||(d.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&d.timers.push(g)&&!cc&&(cc=setInterval(f.tick,f.interval))},show:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),d(this.elem).show()},hide:function(){this.options.orig[this.prop]=d.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=d.now(),c=!0;if(a||b>=this.options.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),this.options.curAnim[this.prop]=!0;for(var e in this.options.curAnim)this.options.curAnim[e]!==!0&&(c=!1);if(c){if(this.options.overflow!=null&&!d.support.shrinkWrapBlocks){var f=this.elem,g=this.options;d.each(["","X","Y"],function(a,b){f.style["overflow"+b]=g.overflow[a]})}this.options.hide&&d(this.elem).hide();if(this.options.hide||this.options.show)for(var h in this.options.curAnim)d.style(this.elem,h,this.options.orig[h]);this.options.complete.call(this.elem)}return!1}var i=b-this.startTime;this.state=i/this.options.duration;var j=this.options.specialEasing&&this.options.specialEasing[this.prop],k=this.options.easing||(d.easing.swing?"swing":"linear");this.pos=d.easing[j||k](this.state,i,0,1,this.options.duration),this.now=this.start+(this.end-this.start)*this.pos,this.update();return!0}},d.extend(d.fx,{tick:function(){var a=d.timers;for(var b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||d.fx.stop()},interval:13,stop:function(){clearInterval(cc),cc=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){d.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),d.expr&&d.expr.filters&&(d.expr.filters.animated=function(a){return d.grep(d.timers,function(b){return a===b.elem}).length});var cg=/^t(?:able|d|h)$/i,ch=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?d.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(e){}var f=b.ownerDocument,g=f.documentElement;if(!c||!d.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=f.body,i=ci(f),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||d.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||d.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:d.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){d.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return d.offset.bodyOffset(b);d.offset.initialize();var c,e=b.offsetParent,f=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(d.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===e&&(l+=b.offsetTop,m+=b.offsetLeft,d.offset.doesNotAddBorder&&(!d.offset.doesAddBorderForTableAndCells||!cg.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),f=e,e=b.offsetParent),d.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;d.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},d.offset={initialize:function(){var a=c.body,b=c.createElement("div"),e,f,g,h,i=parseFloat(d.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";d.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),e=b.firstChild,f=e.firstChild,h=e.nextSibling.firstChild.firstChild,this.doesNotAddBorder=f.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,f.style.position="fixed",f.style.top="20px",this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15,f.style.position=f.style.top="",e.style.overflow="hidden",e.style.position="relative",this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),d.offset.initialize=d.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;d.offset.initialize(),d.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(d.css(a,"marginTop"))||0,c+=parseFloat(d.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var e=d.css(a,"position");e==="static"&&(a.style.position="relative");var f=d(a),g=f.offset(),h=d.css(a,"top"),i=d.css(a,"left"),j=(e==="absolute"||e==="fixed")&&d.inArray("auto",[h,i])>-1,k={},l={},m,n;j&&(l=f.position()),m=j?l.top:parseInt(h,10)||0,n=j?l.left:parseInt(i,10)||0,d.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):f.css(k)}},d.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),e=ch.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(d.css(a,"marginTop"))||0,c.left-=parseFloat(d.css(a,"marginLeft"))||0,e.top+=parseFloat(d.css(b[0],"borderTopWidth"))||0,e.left+=parseFloat(d.css(b[0],"borderLeftWidth"))||0;return{top:c.top-e.top,left:c.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&(!ch.test(a.nodeName)&&d.css(a,"position")==="static"))a=a.offsetParent;return a})}}),d.each(["Left","Top"],function(a,c){var e="scroll"+c;d.fn[e]=function(c){var f=this[0],g;if(!f)return null;if(c!==b)return this.each(function(){g=ci(this),g?g.scrollTo(a?d(g).scrollLeft():c,a?c:d(g).scrollTop()):this[e]=c});g=ci(f);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:d.support.boxModel&&g.document.documentElement[e]||g.document.body[e]:f[e]}}),d.each(["Height","Width"],function(a,c){var e=c.toLowerCase();d.fn["inner"+c]=function(){return this[0]?parseFloat(d.css(this[0],e,"padding")):null},d.fn["outer"+c]=function(a){return this[0]?parseFloat(d.css(this[0],e,a?"margin":"border")):null},d.fn[e]=function(a){var f=this[0];if(!f)return a==null?null:this;if(d.isFunction(a))return this.each(function(b){var c=d(this);c[e](a.call(this,b,c[e]()))});if(d.isWindow(f)){var g=f.document.documentElement["client"+c];return f.document.compatMode==="CSS1Compat"&&g||f.document.body["client"+c]||g}if(f.nodeType===9)return Math.max(f.documentElement["client"+c],f.body["scroll"+c],f.documentElement["scroll"+c],f.body["offset"+c],f.documentElement["offset"+c]);if(a===b){var h=d.css(f,e),i=parseFloat(h);return d.isNaN(i)?h:i}return this.css(e,typeof a==="string"?a:a+"px")}}),a.jQuery=a.$=d})(window);
// jQuery templates. BETA!
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;if(!i)throw"Template command not found: "+j;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;"/*"*/)}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,/*'*/"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery)

// Redefenition of GM_ functions for safari && chrome + uneval
if((typeof GM_getValue==="undefined")||(GM_getValue.toString&&GM_getValue.toString().indexOf("not supported")>-1)){GM_getValue=function(a,b){return localStorage.getItem(a)||b}}if((typeof GM_setValue==="undefined")||(GM_setValue.toString&&GM_setValue.toString().indexOf("not supported")>-1)){GM_setValue=function(a,b){return localStorage.setItem(a,b)}}if(typeof GM_addStyle==="undefined"){GM_addStyle=function(b){var a=document.createElement("style");a.setAttribute("type","text/css");a.appendChild(document.createTextNode(b));document.getElementsByTagName("head")[0].appendChild(a)}}if(typeof GM_log==="undefined"){GM_log=function(a){if(console){console.log(a)}else{alert(a)}}}if(typeof(this["uneval"])!=="function"){var hasOwnProperty=Object.prototype.hasOwnProperty;var protos=[];var char2esc={"\t":"t","\n":"n","\v":"v","\f":"f","\r":"\r","'":"'",'"':'"',"\\":"\\"};var escapeChar=function(b){if(b in char2esc){return"\\"+char2esc[b]}var a=b.charCodeAt(0);return a<32?"\\x0"+a.toString(16):a<127?"\\"+b:a<256?"\\x"+a.toString(16):a<4096?"\\u0"+a.toString(16):"\\u"+a.toString(16)};var uneval_asis=function(a){return a.toString()};var name2uneval={"boolean":uneval_asis,number:uneval_asis,string:function(a){return"'"+a.toString().replace(/[\x00-\x1F\'\"\\\u007F-\uFFFF]/g,escapeChar)+"'"}/*"*/,"undefined":function(a){return"undefined"},"function":uneval_asis};var uneval_default=function(d,b){var c=[];for(var a in d){if(!hasOwnProperty.call(d,a)){continue}c[c.length]=uneval(a)+":"+uneval(d[a],1)}return b?"{"+c.toString()+"}":"({"+c.toString()+"})"};uneval_set=function(c,a,b){protos[protos.length]=[c,a];name2uneval[a]=b||uneval_default};uneval_set(Array,"array",function(d){var c=[];for(var b=0,a=d.length;b<a;b++){c[b]=uneval(d[b])}return"["+c.toString()+"]"});uneval_set(RegExp,"regexp",uneval_asis);uneval_set(Date,"date",function(a){return"(new Date("+a.valueOf()+"))"});var typeName=function(d){var c=typeof d;if(c!="object"){return c}for(var b=0,a=protos.length;b<a;b++){if(d instanceof protos[b][0]){return protos[b][1]}}return"object"};uneval=function(c,b){if(c===null){return"null"}var a=name2uneval[typeName(c)]||uneval_default;return a(c,b)}};GM_wait=function(c,cl,_o){if(c.indexOf("beScript")!=-1){c=c.replace("beScript","_o")}if(!eval(c)){setTimeout(function(){GM_wait(c,cl,_o)},100)}else{cl()}};

// jQuery plugin - qTip 2 nightly build
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('"7L 5u",9(a,b,c){9 z(c){Q f=S,g=c.26.P.1x,h=c.31,i=h.1s,j="#1b-2r",k=".5v",l=k+c.1p,m="1I-1x-1b",o;c.2K.1x={"^P.1x.(2T|1L)$":9(){f.25(),h.2r.1W(i.1I(":1P"))}},a.1m(f,{25:9(){T(!g.2T)N f;o=f.2h(),i.17(m,d).1q(k).1q(l).19("45"+k+" 51"+k,9(a,b,c){f[a.1v.24("1s","")](a,c)}).19("58"+k,9(a,b,c){o[0].16.2R=c-1}).19("59"+k,9(b){a("["+m+"]:1P").2v(i).7u().1b("2n",b)}),g.5o&&a(b).1q(l).19("4P"+l,9(a){a.5w===27&&i.1M(n)&&c.R(a)}),g.1L&&h.2r.1q(l).19("4g"+l,9(a){i.1M(n)&&c.R(a)});N f},2h:9(){Q c=a(j);T(c.1a){h.2r=c;N c}o=h.2r=a("<2i />",{1p:j.2x(1),Y:{15:"4I",M:0,O:0,2D:"3L"},3D:9(){N e}}).2X(1C.30),a(b).1q(k).19("2e"+k,9(){o.Y({X:14.1F(a(b).X(),a(1C).X()),V:14.1F(a(b).V(),a(1C).V())})}).2q("2e");N o},1W:9(b,c,j){T(b&&b.3k())N f;Q k=g.1H,l=c?"P":"R",n=a("["+m+"]:1P").2v(i),p;o||(o=f.2h());T(o.1I(":5y")&&!c||!c&&n.1a)N f;c&&h.2r.Y("7P",g.1L?"7j":""),o.56(d,e),a.1K(k)?k.1O(o,c):k===e?o[l]():o.57(1y(j,10)||3q,c?.7:0,9(){c||a(S).R()});N f},P:9(a,b){N f.1W(a,d,b)},R:9(a,b){N f.1W(a,e,b)},2l:9(){Q d=o;d&&(d=a("["+m+"]").2v(i).1a<1,d?(h.2r.1Q(),a(b).1q(k)):h.2r.1q(k+c.1p));N i.3s(m).1q(k)}}),f.25()}9 y(b,g){9 v(a){Q b=a.1e==="y",c=n[b?"V":"X"],d=n[b?"X":"V"],e=a.1n().2C("1f")>-1,f=c*(e?.5:1),g=14.5A,h=14.3M,i,j,k,l=14.44(g(f,2)+g(d,2)),m=[p/f*l,p/d*l];m[2]=14.44(g(m[0],2)-g(p,2)),m[3]=14.44(g(m[1],2)-g(p,2)),i=l+m[2]+m[3]+(e?0:m[0]),j=i/l,k=[h(j*d),h(j*c)];N{X:k[b?0:1],V:k[b?1:0]}}9 u(b){Q c=k.1w&&b.y==="M",d=c?k.1w:k.U,e=a.29.5m,f=e?"-5B-":a.29.4M?"-4M-":"",g=b.y+(e?"":"-")+b.x,h=f+(e?"1d-4p-"+g:"1d-"+g+"-4p");N 1y(d.Y(h),10)||1y(l.Y(h),10)||0}9 t(a,b,c){b=b?b:a[a.1e];Q d=k.1w&&a.y==="M",e=d?k.1w:k.U,f="1d-"+b+"-V",g=1y(e.Y(f),10);N(c?g||1y(l.Y(f),10):g)||0}9 s(f,g,h,l){T(k.12){Q n=a.1m({},i.1k),o=h.3F,p=b.26.15.2A.4j.2B(" "),q=p[0],r=p[1]||p[0],s={O:e,M:e,x:0,y:0},t,u={},v;i.1k.2j!==d&&(q==="2o"&&n.1e==="x"&&o.O&&n.y!=="1f"?n.1e=n.1e==="x"?"y":"x":q==="3A"&&o.O&&(n.x=n.x==="1f"?o.O>0?"O":"1h":n.x==="O"?"1h":"O"),r==="2o"&&n.1e==="y"&&o.M&&n.x!=="1f"?n.1e=n.1e==="y"?"x":"y":r==="3A"&&o.M&&(n.y=n.y==="1f"?o.M>0?"M":"1i":n.y==="M"?"1i":"M"),n.1n()!==m.1k&&(m.M!==o.M||m.O!==o.O)&&i.3f(n,e)),t=i.15(n,o),t.1h!==c&&(t.O=-t.1h),t.1i!==c&&(t.M=-t.1i),t.3Y=14.1F(0,j.W);T(s.O=q==="2o"&&!!o.O)n.x==="1f"?u["2S-O"]=s.x=t["2S-O"]-o.O:(v=t.1h!==c?[o.O,-t.O]:[-o.O,t.O],(s.x=14.1F(v[0],v[1]))>v[0]&&(h.O-=o.O,s.O=e),u[t.1h!==c?"1h":"O"]=s.x);T(s.M=r==="2o"&&!!o.M)n.y==="1f"?u["2S-M"]=s.y=t["2S-M"]-o.M:(v=t.1i!==c?[o.M,-t.M]:[-o.M,t.M],(s.y=14.1F(v[0],v[1]))>v[0]&&(h.M-=o.M,s.M=e),u[t.1i!==c?"1i":"M"]=s.y);k.12.Y(u).1W(!(s.x&&s.y||n.x==="1f"&&s.y||n.y==="1f"&&s.x)),h.O-=t.O.3t?t.3Y:q!=="2o"||s.M||!s.O&&!s.M?t.O:0,h.M-=t.M.3t?t.3Y:r!=="2o"||s.O||!s.O&&!s.M?t.M:0,m.O=o.O,m.M=o.M,m.1k=n.1n()}}Q i=S,j=b.26.16.12,k=b.31,l=k.1s,m={M:0,O:0,1k:""},n={V:j.V,X:j.X},o={},p=j.1d||0,q=".1b-12",r=a("<4C />")[0].3P;i.1k=f,i.3C=f,i.15={},b.2K.12={"^15.1N|16.12.(1k|3C|1d)$":9(){i.25()||i.2l(),b.1X()},"^16.12.(X|V)$":9(){n={V:j.V,X:j.X},i.2h(),i.3f(),b.1X()},"^U.18.1o|16.(3h|2f)$":9(){k.12&&i.3f()}},a.1m(i,{25:9(){Q b=i.4q()&&(r||a.29.3H);b&&(i.2h(),i.3f(),l.1q(q).19("5a"+q,s));N b},4q:9(){Q a=j.1k,c=b.26.15,f=c.2b,g=c.1N.1n?c.1N.1n():c.1N;T(a===e||g===e&&f===e)N e;a===d?i.1k=1G h.2t(g):a.1n||(i.1k=1G h.2t(a),i.1k.2j=d);N i.1k.1n()!=="4v"},4x:9(){Q c,d,e,f=k.12.Y({6H:"",1d:""}),g=i.1k,h=g[g.1e],m="1d-"+h+"-3e",p="1d"+h.3t(0)+h.2x(1)+"73",q=/5E?\\(0, 0, 0(, 0)?\\)|3z/i,r="5F-3e",s="3z",t="1u-1s-5l",u=a(1C.30).Y("3e"),v=b.31.U.Y("3e"),w=k.1w&&(g.y==="M"||g.y==="1f"&&f.15().M+n.X/2+j.W<k.1w.3a(1)),x=w?k.1w:k.U;l.3v(t),d=f.Y(r)||s,e=f[0].16[p];T(!d||q.1B(d))o.2J=x.Y(r),q.1B(o.2J)&&(o.2J=l.Y(r)||d);T(!e||q.1B(e)){o.1d=l.Y(m);T(q.1B(o.1d)||o.1d===u)o.1d=x.Y(m),o.1d===v&&(o.1d=e)}a("*",f).2P(f).Y(r,s).Y("1d",""),l.4k(t)},2h:9(){Q b=n.V,c=n.X,d;k.12&&k.12.1Q(),k.12=a("<2i />",{"1Y":"1u-1s-12"}).Y({V:b,X:c}).6c(l),r?a("<4C />").2X(k.12)[0].3P("2d").4t():(d=\'<4i:42 5H="0,0" 16="2D:54-33; 15:4I; 4A:2k(#3u#4B);"></4i:42>\',k.12.2M(p?d+=d:d))},3f:9(b,c){Q g=k.12,l=g.6a(),m=n.V,q=n.X,s="3U 5K ",u="3U 5L 3z",w=j.3C,y=14.3M,z,A,B,C,D;b||(b=i.1k),w===e?w=b:(w=1G h.2t(w),w.1e=b.1e,w.x==="3y"?w.x=b.x:w.y==="3y"?w.y=b.y:w.x===w.y&&(w[b.1e]=b[b.1e])),z=w.1e,i.4x(),p=o.1d==="3z"||o.1d==="#5O"?0:j.1d===d?t(b,f,d):j.1d,B=x(w,m,q),D=v(b),g.Y(D),b.1e==="y"?C=[y(w.x==="O"?p:w.x==="1h"?D.V-m-p:(D.V-m)/2),y(w.y==="M"?D.X-q:0)]:C=[y(w.x==="O"?D.V-m:0),y(w.y==="M"?p:w.y==="1i"?D.X-q-p:(D.X-q)/2)],r?(l.17(D),A=l[0].3P("2d"),A.5P(),A.4t(),A.5Q(0,0,4u,4u),A.5R(C[0],C[1]),A.5S(),A.5T(B[0][0],B[0][1]),A.4r(B[1][0],B[1][1]),A.4r(B[2][0],B[2][1]),A.5U(),A.5V=o.2J,A.5W=o.1d,A.5s=p*2,A.5X="4z",A.5Y=5p,A.4y(),A.2J()):(B="m"+B[0][0]+","+B[0][1]+" l"+B[1][0]+","+B[1][1]+" "+B[2][0]+","+B[2][1]+" 5Z",C[2]=p&&/^(r|b)/i.1B(b.1n())?4N(a.29.4c,10)===8?2:1:0,l.Y({60:""+(w.1n().2C("1f")>-1),O:C[0]-C[2]*4w(z==="x"),M:C[1]-C[2]*4w(z==="y"),V:m+p,X:q+p}).1l(9(b){Q c=a(S);c.17({61:m+p+" "+(q+p),7M:B,62:o.2J,63:!!b,64:!b}).Y({2D:p||b?"33":"3L"}),!b&&p>0&&c.2M()===""&&c.2M(\'<4i:4y 65="\'+p*2+\'3U" 3e="\'+o.1d+\'" 66="67" 68="4z"  16="4A:2k(#3u#4B); 2D:54-33;" />\')})),c!==e&&i.15(b)},15:9(b){Q c=k.12,f={},g=14.1F(0,j.W),h,l,m;T(j.1k===e||!c)N e;b=b||i.1k,h=b.1e,l=v(b),m=[b.x,b.y],h==="x"&&m.6b(),a.1l(m,9(a,c){Q e,i;c==="1f"?(e=h==="y"?"O":"M",f[e]="50%",f["2S-"+e]=-14.3M(l[h==="y"?"V":"X"]/2)+g):(e=t(b,c,d),i=u(b),f[c]=a?t(b,c):g+(i>e?i:0))}),f[b[h]]-=l[h==="x"?"V":"X"],c.Y({M:"",1i:"",O:"",1h:"",2S:""}).Y(f);N f},2l:9(){k.12&&k.12.1Q(),l.1q(q)}}),i.25()}9 x(a,b,c){Q d=14.3x(b/2),e=14.3x(c/2),f={4Z:[[0,0],[b,c],[b,0]],4E:[[0,0],[b,0],[0,c]],4F:[[0,c],[b,0],[b,c]],4G:[[0,0],[0,c],[b,c]],7s:[[0,c],[d,0],[b,c]],6d:[[0,0],[b,0],[d,c]],6e:[[0,0],[b,e],[0,c]],6f:[[b,0],[b,c],[0,e]]};f.6g=f.4Z,f.6h=f.4E,f.6i=f.4F,f.6j=f.4G;N f[a.1n()]}9 w(b){Q c=S,f=b.31.1s,g=b.26.U.1z,h=".1b-1z",i=/<43\\b[^<]*(?:(?!<\\/43>)<[^<]*)*<\\/43>/55,j=d;b.2K.1z={"^U.1z":9(a,b,d){b==="1z"&&(g=d),b==="2c"?c.25():g&&g.2k?c.3X():f.1q(h)}},a.1m(c,{25:9(){g&&g.2k&&f.1q(h)[g.2c?"6k":"19"]("45"+h,c.3X);N c},3X:9(d,h){9 p(a,c,d){b.2Y("U.1o",c+": "+d),n()}9 o(c){l&&(c=a("<2i/>").37(c.24(i,"")).4K(l)),b.2Y("U.1o",c),n()}9 n(){m&&(f.Y("47",""),h=e)}T(d&&d.3k())N c;Q j=g.2k.2C(" "),k=g.2k,l,m=g.2c&&!g.4J&&h;m&&f.Y("47","49"),j>-1&&(l=k.2x(j),k=k.2x(0,j)),a.1z(a.1m({6l:o,5b:p,6m:b},g,{2k:k}));N c}}),c.25()}9 v(b,c){Q i,j,k,l,m=a(S),n=a(1C.30),o=S===1C?n:m,p=m.1T?m.1T(c.1T):f,q=c.1T.1v==="6n"&&p?p[c.1T.46]:f,v=m.2s(c.1T.46||"6o");78{v=11 v==="1n"?(1G 77("N "+v))():v}76(w){s("6q 6s 6t 6v 6w 2s: "+v)}l=a.1m(d,{},g.35,c,11 v==="1j"?t(v):f,t(q||p)),p&&a.4l(S,"1T"),j=l.15,l.1p=b;T("34"===11 l.U.1o){k=m.17(l.U.17);T(l.U.17!==e&&k)l.U.1o=k;2G N e}j.1t===e&&(j.1t=n),j.13===e&&(j.13=o),l.P.13===e&&(l.P.13=o),l.P.32===d&&(l.P.32=n),l.R.13===e&&(l.R.13=o),l.15.28===d&&(l.15.28=j.1t),j.2b=1G h.2t(j.2b),j.1N=1G h.2t(j.1N);T(a.2s(S,"1b"))T(l.4h)m.1b("2l");2G T(l.4h===e)N e;a.17(S,"18")&&(a.17(S,r,a.17(S,"18")),S.3n("18")),i=1G u(m,l,b,!!k),a.2s(S,"1b",i),m.19("1Q.1b",9(){i.2l()});N i}9 u(c,p,q,s){9 L(c,d,e,f){f=1y(f,10)!==0;Q g=".1b-"+q,h={P:c&&p.P.13[0],R:d&&p.R.13[0],1s:e&&u.1g&&A.1s[0],U:e&&u.1g&&A.U[0],1t:f&&p.15.1t[0]===v?1C:p.15.1t[0],3E:f&&b};u.1g?a([]).70(a.6Z([h.P,h.R,h.1s,h.1t,h.U,h.3E],9(a){N 11 a==="1j"})).1q(g):c&&p.P.13.1q(g+"-2h")}9 K(d,f,h,j){9 D(a){z.1I(":1P")&&u.1X(a)}9 C(a){T(z.1M(l))N e;1E(u.1r.1Z),u.1r.1Z=2V(9(){u.R(a)},p.R.1Z)}9 y(b){T(z.1M(l))N e;Q c=a(b.3w||b.13),d=c.6Y(m)[0]===z[0],f=c[0]===r.P[0];1E(u.1r.P),1E(u.1r.R);T(n.13==="1D"&&d||p.R.2j&&(/1D(48|2H|4b)/.1B(b.1v)&&(d||f))){b.6y(),b.6W();N e}p.R.21>0?u.1r.R=2V(9(){u.R(b)},p.R.21):u.R(b)}9 x(a){T(z.1M(l))N e;r.P.2q("1b-"+q+"-1Z"),1E(u.1r.P),1E(u.1r.R);Q b=9(){u.P(a)};p.P.21>0?u.1r.P=2V(b,p.P.21):b()}Q k=".1b-"+q,n=p.15,r={P:p.P.13,R:p.R.13,1t:n.1t[0]===v?a(1C):n.1t,3Z:a(1C)},s={P:a.3B(""+p.P.1c).2B(" "),R:a.3B(""+p.R.1c).2B(" ")},t=a.29.3H&&1y(a.29.4c,10)===6,w;h&&(p.R.2j&&(r.R=r.R.2P(z),z.19("6A"+k,9(){z.1M(l)||1E(u.1r.R)})),n.13==="1D"&&n.2A.1D&&p.R.1c&&z.19("2Q"+k,9(a){(a.3w||a.13)!==r.P[0]&&u.R(a)}),z.19("2y"+k,9(a){u[a.1v==="2y"?"2n":"1L"](a)}),z.19("2y"+k+" 2Q"+k,9(a){z.2a(o,a.1v==="2y")})),f&&("2F"===11 p.R.1Z&&(r.P.19("1b-"+q+"-1Z",C),a.1l(g.5c,9(a,b){r.R.2P(A.1s).19(b+k+"-1Z",C)})),a.1l(s.R,9(b,c){Q d=a.6B(c,s.P),e=a(r.R);d>-1&&e.2P(r.P).1a===e.1a||c==="3T"?(r.P.19(c+k,9(a){z.1I(":1P")?y(a):x(a)}),2w s.P[d]):r.R.19(c+k,y)})),d&&(a.1l(s.P,9(a,b){r.P.19(b+k,x)}),"2F"===11 p.R.3S&&r.P.19("3i"+k,9(a){Q b=B.3c||{},c=p.R.3S,d=14.2U;b&&(d(a.2g-b.2g)>=c||d(a.2u-b.2u)>=c)&&u.R(a)})),j&&((n.2A.2e||n.28)&&a(a.1c.6C.2e?n.28:b).19("2e"+k,D),(n.28||t&&z.Y("15")==="2j")&&a(n.28).19("4a"+k,D),/3T/i.1B(p.R.1c)&&r.3Z.19("3D"+k,9(b){Q d=a(b.13);d.6S(m).1a===0&&d.2P(c).1a>1&&z.1I(":1P")&&!z.1M(l)&&u.R(b)}),p.R.2H&&/2Q|4Q/i.1B(p.R.1c)&&a(b).19("1L"+k+" 1D"+(p.R.2H.2C("6D")>-1?"48":"2H")+k,9(a){a.3w||u.R(a)}),n.13==="1D"&&r.3Z.19("3i"+k,9(a){n.2A.1D&&!z.1M(l)&&z.1I(":1P")&&u.1X(a||i)}))}9 J(b,d){9 g(a){9 c(c){(b=b.2v(S)).1a===0&&(u.2E(),u.1X(B.1c),a())}Q b;T((b=f.4K("3r:2v([X]):2v([V])")).1a===0)N c.1O(b);b.1l(9(a,b){(9 d(){Q e=u.1r.3r;T(b.X&&b.V){1E(e[a]);N c.1O(b)}e[a]=2V(d,20)})()})}Q f=A.U;b=b||p.U.1o;T(!u.1g||!b)N e;a.1K(b)&&(b=b.1O(c,u)||""),b.1V&&b.1a>0?f.4L().37(b.Y({2D:"33"})):f.2M(b),u.1g<0?z.3G("3R",g):(y=0,g(a.4n));N u}9 I(b){Q d=A.18;T(!u.1g||!b)N e;a.1K(b)&&(b=b.1O(c,u)||""),b.1V&&b.1a>0?d.4L().37(b.Y({2D:"33"})):d.2M(b),u.2E(),u.1g&&z.1I(":1P")&&u.1X(B.1c)}9 H(a){Q b=A.1A,c=A.18;T(!u.1g)N e;a?(c||G(),F()):b.1Q()}9 G(){Q b=w+"-18";A.1w&&E(),A.1w=a("<2i />",{"1Y":j+"-1w "+(p.16.2f?"1u-2f-4R":"")}).37(A.18=a("<2i />",{1p:b,"1Y":j+"-18","1J-3W":d})).6G(A.U),p.U.18.1A?F():u.1g&&u.2E()}9 F(){Q b=p.U.18.1A,c=11 b==="1n",d=c?b:"6J 1s";A.1A&&A.1A.1Q(),b.1V?A.1A=b:A.1A=a("<a />",{"1Y":"1u-3g-3u "+(p.16.2f?"":j+"-3p"),18:d,"1J-6K":d}).6L(a("<6N />",{"1Y":"1u-3p 1u-3p-6O",2M:"&6Q;"})),A.1A.2X(A.1w).17("4U","1A").40(9(b){a(S).2a("1u-3g-40",b.1v==="2y")}).4g(9(a){z.1M(l)||u.R(a);N e}).19("3D 4P 5e 6T 4Q",9(b){a(S).2a("1u-3g-6V 1u-3g-2n",b.1v.2x(-4)==="71")}),u.2E()}9 E(){A.18&&(A.1w.1Q(),A.1w=A.18=A.1A=f,u.1X())}9 D(){Q a=p.16.2f;z.2a(k,a),A.U.2a(k+"-U",a),A.1w&&A.1w.2a(k+"-4R",a),A.1A&&A.1A.2a(j+"-3p",!a)}9 C(a){Q b=0,c,d=p,e=a.2B(".");3d(d=d[e[b++]])b<e.1a&&(c=d);N[c||p,e.74()]}Q u=S,v=1C.30,w=j+"-"+q,x=0,y=0,z=a(),A,B;u.1p=q,u.1g=e,u.31=A={13:c},u.1r={3r:[]},u.26=p,u.2K={},u.1R={},u.2Z=B={1c:{},13:f,2z:e,17:s},u.2K.79={"^1p$":9(b,c,f){Q h=f===d?g.4d:f,i=j+"-"+h;h!==e&&h.1a>0&&!a("#"+i).1a&&(z[0].1p=i,A.U[0].1p=i+"-U",A.18[0].1p=i+"-18")},"^U.1o$":9(a,b,c){J(c)},"^U.18.1o$":9(a,b,c){T(!c)N E();!A.18&&c&&G(),I(c)},"^U.18.1A$":9(a,b,c){H(c)},"^15.(1N|2b)$":9(a,b,c){"1n"===11 c&&(a[b]=1G h.2t(c))},"^15.1t$":9(a,b,c){u.1g&&z.2X(c)},"^(P|R).(1c|13|2j|21|1Z)$":9(a,b,c,d,e){Q f=[1,0,0];f[e[1]==="P"?"4e":"7b"](0),L.23(u,f),K.23(u,[1,1,0,0])},"^P.2O$":9(){u.1g?u.P():u.1S(1)},"^16.3h$":9(b,c,d){a.17(z[0],"1Y",j+" 1b 1u-4D-4T "+d)},"^16.2f|U.18":D,"^4f.(1S|P|4b|R|2n|1L)$":9(b,c,d){z[(a.1K(d)?"":"7c")+"19"]("1s"+c,d)}},a.1m(u,{1S:9(b){T(u.1g)N u;Q f=p.U.18.1o,g=a.3b("7d");a.17(c[0],"1J-3O",w),z=A.1s=a("<2i/>",{1p:w,"1Y":j+" 1b 1u-4D-4T "+p.16.3h,V:p.16.V||"",4U:"7e","1J-7f":"7g","1J-3W":e,"1J-3O":w+"-U","1J-49":d}).2a(l,B.2z).2s("1b",u).2X(p.15.1t).37(A.U=a("<2i />",{"1Y":j+"-U",1p:w+"-U","1J-3W":d})),u.1g=-1,y=1,f&&(G(),I(f)),J(),u.1g=d,D(),a.1l(p.4f,9(b,c){a.1K(c)&&z.19(b==="1W"?"45 51":"1s"+b,c)}),a.1l(h,9(){S.2L==="1S"&&S(u)}),K(1,1,1,1),z.3G("3R",9(a){g.3j=B.1c,z.2q(g,[u]),y=0,u.2E(),(p.P.2O||b)&&u.P(B.1c),a()});N u},4s:9(a){Q b,c;5n(a.2p()){39"7k":b={X:z.3a(),V:z.3m()};2I;39"W":b=h.W(z,p.15.1t);2I;3u:c=C(a.2p()),b=c[0][c[1]],b=b.1e?b.1n():b}N b},2Y:9(b,c){9 m(a,b){Q c,d,e;52(c 1U k)52(d 1U k[c])T(e=(1G 7m(d,"i")).4O(a))b.4e(e),k[c][d].23(u,b)}Q g=/^15\\.(1N|2b|2A|13|1t)|16|U|P\\.2O/i,h=/^U\\.(18|17)|16/i,i=e,j=e,k=u.2K,l;"1n"===11 b?(l=b,b={},b[l]=c):b=a.1m(d,{},b),a.1l(b,9(c,d){Q e=C(c.2p()),f;f=e[0][e[1]],e[0][e[1]]="1j"===11 d&&d.7n?a(d):d,b[c]=[e[0],e[1],d,f],i=g.1B(c)||i,j=h.1B(c)||j}),t(p),x=y=1,a.1l(b,m),x=y=0,z.1I(":1P")&&u.1g&&(i&&u.1X(p.15.13==="1D"?f:B.1c),j&&u.2E());N u},1W:9(b,c){9 l(){b?(a.29.3H&&z[0].16.3n("38"),z.Y("7o","")):z.Y({2D:"",47:"",V:"",5j:"",O:"",M:""})}T(!u.1g)T(b)u.1S(1);2G N u;Q d=b?"P":"R",g=p[d],h=z.1I(":1P"),j,k;(11 b).4Y("34|2F")&&(b=!h);T(h===b)N u;T(c){T(/7q|7r/.1B(c.1v)&&/48|2H/.1B(B.1c.1v)&&c.13===p.P.13[0]&&z.7t(c.3w).1a)N u;B.1c=a.1m({},c)}k=a.3b("1s"+d),k.3j=c?B.1c:f,z.2q(k,[u,3q]);T(k.3k())N u;a.17(z[0],"1J-49",!b),b?(B.3c=a.1m({},i),u.2n(c),a.1K(p.U.1o)&&J(),u.1X(c),g.32&&a(m,g.32).2v(z).1b("R",k)):(1E(u.1r.P),2w B.3c,u.1L(c)),z.56(0,1),a.1K(g.1H)?(g.1H.1O(z,u),z.3G("3R",9(a){l(),a()})):g.1H===e?(z[d](),l.1O(z)):z.57(3q,b?1:0,l),b&&g.13.2q("1b-"+q+"-1Z");N u},P:9(a){N u.1W(d,a)},R:9(a){N u.1W(e,a)},2n:9(b){T(!u.1g)N u;Q c=a(m),d=1y(z[0].16.2R,10),e=g.5h+c.1a,f=a.1m({},b),h,i;z.1M(n)||(i=a.3b("58"),i.3j=f,z.2q(i,[u,e]),i.3k()||(d!==e&&(c.1l(9(){S.16.2R>d&&(S.16.2R=S.16.2R-1)}),c.38("."+n).1b("1L",f)),z.3v(n)[0].16.2R=e));N u},1L:9(b){Q c=a.1m({},b),d;z.4k(n),d=a.3b("59"),d.3j=c,z.2q(d,[u]);N u},1X:9(c,d){T(!u.1g||x)N u;x=1;Q f=p.15.13,g=p.15,k=g.1N,l=g.2b,m=g.2A,n=m.4j.2B(" "),o=z.3m(),q=z.3a(),r=0,s=0,t=a.3b("5a"),w=z.Y("15")==="2j",y=g.28.1V?g.28:a(b),A={O:0,M:0},C=(u.1R.12||{}).1k,D={3I:n[0],3J:n[1]||n[0],12:p.16.12||{},O:9(a){Q b=D.3I==="2o",c=y.W.O+y.3l,d=k.x==="O"?o:k.x==="1h"?-o:-o/2,e=l.x==="O"?r:l.x==="1h"?-r:-r/2,f=D.12.V+D.12.1d*2||0,g=C&&C.1e==="x"&&!b?f:0,h=c-a-g,i=a+o-y.V-c+g,j=d-(k.1e==="x"||k.x===k.y?e:0),n=k.x==="1f";b?(g=C&&C.1e==="y"?f:0,j=(k.x==="O"?1:-1)*d-g,A.O+=h>0?h:i>0?-i:0,A.O=14.1F(y.W.O+(g&&C.x==="1f"?D.12.W:0),a-j,14.3K(14.1F(y.W.O+y.V,a+j),A.O))):(h>0&&(k.x!=="O"||i>0)?A.O-=j+(n?0:2*m.x):i>0&&(k.x!=="1h"||h>0)&&(A.O-=n?-j:j+2*m.x),A.O!==a&&n&&(A.O-=m.x),A.O<c&&-A.O>i&&(A.O=a));N A.O-a},M:9(a){Q b=D.3J==="2o",c=y.W.M+y.36,d=k.y==="M"?q:k.y==="1i"?-q:-q/2,e=l.y==="M"?s:l.y==="1i"?-s:-s/2,f=D.12.X+D.12.1d*2||0,g=C&&C.1e==="y"&&!b?f:0,h=c-a-g,i=a+q-y.X-c+g,j=d-(k.1e==="y"||k.x===k.y?e:0),n=k.y==="1f";b?(g=C&&C.1e==="x"?f:0,j=(k.y==="M"?1:-1)*d-g,A.M+=h>0?h:i>0?-i:0,A.M=14.1F(y.W.M+(g&&C.x==="1f"?D.12.W:0),a-j,14.3K(14.1F(y.W.M+y.X,a+j),A.M))):(h>0&&(k.y!=="M"||i>0)?A.M-=j+(n?0:2*m.y):i>0&&(k.y!=="1i"||h>0)&&(A.M-=n?-j:j+2*m.y),A.M!==a&&n&&(A.M-=m.y),A.M<0&&-A.M>i&&(A.M=a));N A.M-a}};T(f==="1D")l={x:"O",y:"M"},c=c&&(c.1v==="2e"||c.1v==="4a")?B.1c:!m.1D&&B.3c?B.3c:i&&(m.1D||!c||!c.2g)?{2g:i.2g,2u:i.2u}:c,A={M:c.2u,O:c.2g};2G{f==="1c"&&(c&&c.13&&c.1v!=="4a"&&c.1v!=="2e"?f=B.13=a(c.13):f=B.13),f=a(f).7v(0);T(f.1a===0)N u;f[0]===1C||f[0]===b?(r=f.V(),s=f.X(),f[0]===b&&(A={M:!w||h.2N?y.36():0,O:!w||h.2N?y.3l():0})):f.1I("7w")&&h.41?A=h.41(f,l):f[0].7x==="7y://7z.7A.7B/7C/3N"&&h.3N?A=h.3N(f,l):(r=f.3m(),s=f.3a(),A=h.W(f,g.1t,w)),A.W&&(r=A.V,s=A.X,A=A.W),A.O+=l.x==="1h"?r:l.x==="1f"?r/2:0,A.M+=l.y==="1i"?s:l.y==="1f"?s/2:0}A.O+=m.x+(k.x==="1h"?-o:k.x==="1f"?-o/2:0),A.M+=m.y+(k.y==="1i"?-q:k.y==="1f"?-q/2:0),y.1V&&f[0]!==b&&f[0]!==v&&D.3J+D.3I!=="7E"?(y={5g:y,X:y[(y[0]===b?"h":"7F")+"7G"](),V:y[(y[0]===b?"w":"7H")+"7I"](),3l:y.3l(),36:y.36(),W:y.W()||{O:0,M:0}},A.3F={O:D.3I!=="3L"?D.O(A.O):0,M:D.3J!=="3L"?D.M(A.M):0}):A.3F={O:0,M:0},z.17("1Y",9(b,c){N a.17(S,"1Y").24(/1u-1s-5d-\\w+/i,"")}).3v(j+"-5d-"+k.4W()),t.3j=a.1m({},c),z.2q(t,[u,A,y.5g||y]);T(t.3k())N u;2w A.3F,d===e||5i(A.O)||5i(A.M)||!a.1K(g.1H)?z.Y(A):a.1K(g.1H)&&(g.1H.1O(z,u,a.1m({},A)),z.3G(9(b){a(S).Y({5j:"",X:""}),a.29.3H&&S.16.3n("38"),b()})),x=0;N u},2E:9(){T(u.1g<1||p.16.V||y)N u;Q b=j+"-5l",c=p.15.1t,d,e,f,g;y=1,z.Y("V","").3v(b),e=z.V()+(a.29.5m?1:0),f=z.Y("1F-V")||"",g=z.Y("3K-V")||"",d=(f+g).2C("%")>-1?c.V()/5p:0,f=(f.2C("%")>-1?d:1)*1y(f,10)||e,g=(g.2C("%")>-1?d:1)*1y(g,10)||0,e=f+g?14.3K(14.1F(e,g),f):e,z.Y("V",14.3M(e)).4k(b),y=0;N u},3Q:9(b){Q c=l;"34"!==11 b&&(b=!z.1M(c)&&!B.2z),u.1g?(z.2a(c,b),a.17(z[0],"1J-2z",b)):B.2z=!!b;N u},5q:9(){N u.3Q(e)},2l:9(){Q b=c[0],d=a.17(b,r);u.1g&&(z.1Q(),a.1l(u.1R,9(){S.2l&&S.2l()})),1E(u.1r.P),1E(u.1r.R),L(1,1,1,1),a.4l(b,"1b"),d&&(a.17(b,"18",d),c.3s(r)),c.3s("1J-3O").1q(".1b");N c}})}9 t(b){Q c;T(!b||"1j"!==11 b)N e;"1j"!==11 b.1T&&(b.1T={1v:b.1T});T("U"1U b){T("1j"!==11 b.U||b.U.1V)b.U={1o:b.U};c=b.U.1o||e,!a.1K(c)&&(!c&&!c.17||c.1a<1||"1j"===11 c&&!c.1V)&&(b.U.1o=e),"18"1U b.U&&("1j"!==11 b.U.18&&(b.U.18={1o:b.U.18}),c=b.U.18.1o||e,!a.1K(c)&&(!c&&!c.17||c.1a<1||"1j"===11 c&&!c.1V)&&(b.U.18.1o=e))}"15"1U b&&("1j"!==11 b.15&&(b.15={1N:b.15,2b:b.15})),"P"1U b&&("1j"!==11 b.P&&(b.P.1V?b.P={13:b.P}:b.P={1c:b.P})),"R"1U b&&("1j"!==11 b.R&&(b.R.1V?b.R={13:b.R}:b.R={1c:b.R})),"16"1U b&&("1j"!==11 b.16&&(b.16={3h:b.16})),a.1l(h,9(){S.2W&&S.2W(b)});N b}9 s(){Q c=b.5t;N c&&(c.5b||c.5x||a.4n).23(c,22)}Q d=!0,e=!1,f=5z,g,h,i,j="1u-1s",k="1u-2f",l="1u-3g-2z",m="2i.1b."+j,n=j+"-2n",o=j+"-40",p="-5C",q="5D",r="4X";g=a.2m.1b=9(b,h,i){Q j=(""+b).2p(),k=f,l=j==="3Q"?[d]:a.5G(22).4H(1,10),m=l[l.1a-1],n=S[0]?a.2s(S[0],"1b"):f;T(!22.1a&&n||j==="5I")N n;T("1n"===11 b){S.1l(9(){Q b=a.2s(S,"1b");T(!b)N d;m&&m.5J&&(b.2Z.1c=m);T(j!=="5M"&&j!=="26"||!h)b[j]&&b[j].23(b[j],l);2G T(a.5N(h)||i!==c)b.2Y(h,i);2G{k=b.4s(h);N e}});N k!==f?k:S}T("1j"===11 b||!22.1a){n=t(a.1m(d,{},b));N g.19.1O(S,n,m)}},g.19=9(b,c){N S.1l(9(f){9 p(b){9 c(){o.1S(11 b==="1j"||i.P.2O),k.P.1q(l.P),k.R.1q(l.R)}T(o.2Z.2z)N e;o.2Z.1c=a.1m({},b),i.P.21>0?(1E(o.1r.P),o.1r.P=2V(c,i.P.21),l.P!==l.R&&k.R.19(l.R,9(){1E(o.1r.P)})):c()}Q i,k,l,m=!b.1p||b.1p===e||b.1p.1a<1||a("#"+j+"-"+b.1p).1a?g.4d++:b.1p,n=".1b-"+m+"-2h",o=v.1O(S,m,b);T(o===e)N d;i=o.26,a.1l(h,9(){S.2L==="2L"&&S(o)}),k={P:i.P.13,R:i.R.13},l={P:a.3B(""+i.P.1c).24(/ /g,n+" ")+n,R:a.3B(""+i.R.1c).24(/ /g,n+" ")+n},i.R.1c==="3T"&&(l.R="2Q"+n),k.P.19(l.P,p),(i.P.2O||i.5k)&&p(c)})},h=g.1R={2t:9(a){a=(""+a).24(/([A-Z])/," $1").24(/69/55,"1f").2p(),S.x=(a.3V(/O|1h/i)||a.3V(/1f/)||["3y"])[0].2p(),S.y=(a.3V(/M|1i|1f/i)||["3y"])[0].2p(),S.1e=a.3t(0).4Y(/^(t|b)/)>-1?"y":"x",S.1n=9(){N S.1e==="y"?S.y+S.x:S.x+S.y},S.4W=9(){Q a=S.x.2x(0,1),b=S.y.2x(0,1);N a===b?a:a==="c"||a!=="c"&&b!=="c"?b+a:a+b}},W:9(c,d,e){9 l(a,b){f.O+=b*a.3l(),f.M+=b*a.36()}Q f=c.W(),g=d,i=0,j=1C.30,k;T(g){6p{T(g[0]===j)2I;g.Y("15")!=="6r"&&(k=g.15(),f.O-=k.O+(1y(g.Y("6u"),10)||0),f.M-=k.M+(1y(g.Y("6x"),10)||0),i++)}3d(g=g.6z());(d[0]!==j||i>1)&&l(d,1),(h.2N<4.1&&h.2N>3.1||!h.2N&&e)&&l(a(b),-1)}N f},2N:4N((""+(/4S.*6E ([0-6F]{1,3})|(4S 6I).*6M.*6P/i.4O(6U.6X)||[0,""])[1]).24("4m","72").24("75","."))||e,2m:{17:9(b,c){T(S.1a){Q d=S[0],e="18",f=a.2s(d,"1b");T(b===e){T(22.1a<2)N a.17(d,r);T(11 f==="1j"){f&&f.1g&&f.26.U.17===e&&f.2Z.17&&f.2Y("U.1o",c),a.2m["17"+q].23(S,22),a.17(d,r,a.17(d,e));N S.3s(e)}}}},4V:9(b){Q c=a([]),d="18",e;e=a.2m["4V"+q].23(S,22).38("[4X]").1l(9(){a.17(S,d,a.17(S,r)),S.3n(r)}).7l();N e},1Q:a.1u?f:9(b,c){a(S).1l(9(){c||(!b||a.38(b,[S]).1a)&&a("*",S).2P(S).1l(9(){a(S).7p("1Q")})})}}},a.1l(h.2m,9(b,c){T(!c)N d;Q e=a.2m[b+q]=a.2m[b];a.2m[b]=9(){N c.23(S,22)||e.23(S,22)}}),a(1C).19("3i.1b",9(a){i={2g:a.2g,2u:a.2u,1v:"3i"}}),g.4c="7D",g.4d=0,g.5c="4g 7J 3D 5e 3i 2Q 2y".2B(" "),g.5h=7K,g.35={5k:e,1p:e,4h:d,U:{1o:d,17:"18",18:{1o:e,1A:e}},15:{1N:"M O",2b:"1i 1h",13:e,1t:e,28:e,2A:{x:0,y:0,1D:d,2e:d,4j:"3A 3A"},1H:d},P:{13:e,1c:"2y",1H:d,21:3q,32:e,2O:e},R:{13:e,1c:"2Q",1H:d,21:0,2j:e,1Z:e,2H:"3E",3S:e},16:{3h:"",2f:e,V:e},4f:{1S:f,4b:f,P:f,R:f,1W:f,2n:f,1L:f}},h.1z=9(a){Q b=a.1R.1z;N"1j"===11 b?b:a.1R.1z=1G w(a)},h.1z.2L="1S",h.1z.2W=9(a){Q b=a.U,c;b&&"1z"1U b&&(c=b.1z,11 c!=="1j"&&(c=a.U.1z={2k:c}),"34"!==11 c.2c&&c.2c&&(c.2c=!!c.2c))},a.1m(d,g.35,{U:{1z:{4J:d,2c:d}}}),h.41=9(b,c){9 l(a,b){Q d=0,e=1,f=1,g=0,h=0,i=a.V,j=a.X;3d(i>0&&j>0&&e>0&&f>0){i=14.3o(i/2),j=14.3o(j/2),c.x==="O"?e=i:c.x==="1h"?e=a.V-i:e+=14.3o(i/2),c.y==="M"?f=j:c.y==="1i"?f=a.X-j:f+=14.3o(j/2),d=b.1a;3d(d--){T(b.1a<2)2I;g=b[d][0]-a.W.O,h=b[d][1]-a.W.M,(c.x==="O"&&g>=e||c.x==="1h"&&g<=e||c.x==="1f"&&(g<e||g>a.V-e)||c.y==="M"&&h>=f||c.y==="1i"&&h<=f||c.y==="1f"&&(h<f||h>a.X-f))&&b.6R(d,1)}}N{O:b[0][0],M:b[0][1]}}Q d=b.17("42").2p(),e=b.17("7a").2B(","),f=[],g=a(\'3r[7h="#\'+b.7i("5f").17("46")+\'"]\'),h=g.W(),i={V:0,X:0,W:{M:53,1h:0,1i:0,O:53}},j=0,k=0;h.O+=14.3x((g.3m()-g.V())/2),h.M+=14.3x((g.3a()-g.X())/2);T(d==="4o"){j=e.1a;3d(j--)k=[1y(e[--j],10),1y(e[j+1],10)],k[0]>i.W.1h&&(i.W.1h=k[0]),k[0]<i.W.O&&(i.W.O=k[0]),k[1]>i.W.1i&&(i.W.1i=k[1]),k[1]<i.W.M&&(i.W.M=k[1]),f.4e(k)}2G f=a.5f(e,9(a){N 1y(a,10)});5n(d){39"7N":i={V:14.2U(f[2]-f[0]),X:14.2U(f[3]-f[1]),W:{O:f[0],M:f[1]}};2I;39"5r":i={V:f[2]+2,X:f[2]+2,W:{O:f[0],M:f[1]}};2I;39"4o":a.1m(i,{V:14.2U(i.W.1h-i.W.O),X:14.2U(i.W.1i-i.W.M)}),c.1n()==="4v"?i.W={O:i.W.O+i.V/2,M:i.W.M+i.X/2}:i.W=l(i,f.4H()),i.V=i.X=0}i.W.O+=h.O,i.W.M+=h.M;N i},h.12=9(a){Q b=a.1R.12;N"1j"===11 b?b:a.1R.12=1G y(a)},h.12.2L="1S",h.12.2W=9(a){Q b=a.16,c;b&&"12"1U b&&(c=a.16.12,11 c!=="1j"&&(a.16.12={1k:c}),/1n|34/i.1B(11 c.1k)||(c.1k=d),11 c.V!=="2F"&&2w c.V,11 c.X!=="2F"&&2w c.X,11 c.1d!=="2F"&&c.1d!==d&&2w c.1d,11 c.W!=="2F"&&2w c.W)},a.1m(d,g.35,{16:{12:{1k:d,3C:e,V:6,X:6,1d:d,W:0}}}),h.1x=9(a){Q b=a.1R.1x;N"1j"===11 b?b:a.1R.1x=1G z(a)},h.1x.2L="1S",h.1x.2W=9(a){a.P&&(11 a.P.1x!=="1j"?a.P.1x={2T:!!a.P.1x}:11 a.P.1x.2T==="4m"&&(a.P.1x.2T=d))},a.1m(d,g.35,{P:{1x:{2T:e,1H:d,1L:d,5o:d}}})}(7O,3E)',62,486,'|||||||||function|||||||||||||||||||||||||||||||||||||||top|return|left|show|var|hide|this|if|content|width|offset|height|css|||typeof|tip|target|Math|position|style|attr|title|bind|length|qtip|event|border|precedance|center|rendered|right|bottom|object|corner|each|extend|string|text|id|unbind|timers|tooltip|container|ui|type|titlebar|modal|parseInt|ajax|button|test|document|mouse|clearTimeout|max|new|effect|is|aria|isFunction|blur|hasClass|my|call|visible|remove|plugins|render|metadata|in|jquery|toggle|reposition|class|inactive||delay|arguments|apply|replace|init|options||viewport|browser|toggleClass|at|once||resize|widget|pageX|create|div|fixed|url|destroy|fn|focus|shift|toLowerCase|trigger|overlay|data|Corner|pageY|not|delete|substr|mouseenter|disabled|adjust|split|indexOf|display|redraw|number|else|leave|break|fill|checks|initialize|html|iOS|ready|add|mouseleave|zIndex|margin|on|abs|setTimeout|sanitize|appendTo|set|cache|body|elements|solo|block|boolean|defaults|scrollTop|append|filter|case|outerHeight|Event|origin|while|color|update|state|classes|mousemove|originalEvent|isDefaultPrevented|scrollLeft|outerWidth|removeAttribute|floor|icon|90|img|removeAttr|charAt|default|addClass|relatedTarget|ceil|inherit|transparent|flip|trim|mimic|mousedown|window|adjusted|queue|msie|horizontal|vertical|min|none|round|svg|describedby|getContext|disable|fx|distance|unfocus|px|match|atomic|load|user|doc|hover|imagemap|shape|script|sqrt|tooltipshow|name|visibility|out|hidden|scroll|move|version|nextid|push|events|click|overwrite|vml|method|removeClass|removeData|undefined|noop|poly|radius|detectCorner|lineTo|get|save|3e3|centercenter|Number|detectColours|stroke|miter|behavior|VML|canvas|helper|bottomleft|topright|topleft|slice|absolute|loading|find|empty|webkit|parseFloat|exec|keydown|mouseout|header|CPU|reset|role|clone|abbreviation|oldtitle|search|bottomright||tooltiphide|for|1e10|inline|gi|stop|fadeTo|tooltipfocus|tooltipblur|tooltipmove|error|inactiveEvents|pos|mouseup|map|elem|zindex|isNaN|opacity|prerender|fluid|mozilla|switch|escape|100|enable|circle|lineWidth|console|strict|qtipmodal|keyCode|log|animated|null|pow|moz|31000px|_replacedByqTip|rgba|background|makeArray|coordorigin|api|timeStamp|solid|dashed|option|isPlainObject|123456|restore|clearRect|translate|beginPath|moveTo|closePath|fillStyle|strokeStyle|lineJoin|miterLimit|xe|antialias|coordsize|fillcolor|filled|stroked|weight|miterlimit|1000|joinstyle|middle|children|reverse|prependTo|bottomcenter|rightcenter|leftcenter|lefttop|righttop|leftbottom|rightbottom|one|success|context|html5|qtipopts|do|Unable|static|to|parse|borderLeftWidth|HTML5|attribute|borderTopWidth|stopPropagation|offsetParent|mouseover|inArray|special|frame|OS|9_|insertBefore|backgroundColor|like|Close|label|prepend|AppleWebKit|span|close|Mobile|times|splice|parents|keyup|navigator|active|preventDefault|userAgent|closest|grep|pushStack|down|3_2|Color|pop|_|catch|Function|try|builtin|coords|unshift|un|tooltiprender|alert|live|polite|usemap|parent|pointer|dimensions|end|RegExp|nodeType|overflow|triggerHandler|over|enter|topcenter|has|last|eq|area|namespaceURI|http|www|w3|org|2000|nightly|nonenone|outerH|eight|outerW|idth|dblclick|15e3|use|path|rect|jQuery|cursor'.split('|'),0,{}))
// qTip2 growl
createGrowl=function(b,d,a){var c=$(".qtip.jgrowl:visible:last");$(document.body).qtip({content:{text:b,title:{text:d,button:true}},position:{my:"top right",at:(c.length?"bottom":"top")+" right",target:c.length?c:$(document.body),adjust:{y:5+(c.length?0:$(window).scrollTop()),x:-(c.length==0)*5}},show:{event:false,ready:true,effect:function(){$(this).stop(0,1).fadeIn(400)},persistent:a===true},hide:{event:false,effect:function(e){$(this).stop(0,1).fadeOut(400).queue(function(){e.destroy();updateGrowls()})}},style:{classes:"jgrowl ui-tooltip-dark ui-tooltip-rounded",tip:false},events:{render:function(f,e){timer.call(e.elements.tooltip,f)},}}).removeData("qtip")};updateGrowls=function(){var a=$(".qtip.jgrowl:not(:animated)");a.each(function(b){var c=$(this).data("qtip");beScript.log(b);c.options.position.target=(b==0)?$(document.body):a.eq(b-1);c.set("position.at",((b==0)?"top":"bottom")+" right");if(b==0){$(this).css("top","5px");c.set("position.adjust.x",-5);c.set("position.adjust.y",5+$(window).scrollTop())}})};function timer(b){var a=$(this).data("qtip"),c=5000;if(a.get("show.persistent")===true){return}clearTimeout(a.timer);if(b.type!=="mouseover"){a.timer=setTimeout(a.hide,c)}}$(document).delegate(".qtip.jgrowl","mouseover mouseout",timer);
// qTip 2 styles
GM_addStyle( '.ui-tooltip-fluid{display:block;visibility:hidden;position:static!important;float:left!important;}.ui-tooltip,.qtip{position:absolute;left:-28000px;top:-28000px;display:none;max-width:280px;min-width:50px;font-size:10.5px;line-height:12px;}.ui-tooltip-content{position:relative;padding:5px 9px;overflow:hidden;border-width:1px;border-style:solid;text-align:left;word-wrap:break-word;overflow:hidden;}.ui-tooltip-titlebar{position:relative;min-height:14px;padding:5px 35px 5px 10px;overflow:hidden;border-width:1px 1px 0;border-style:solid;font-weight:bold;}.ui-tooltip-titlebar+.ui-tooltip-content{border-top-width:0!important;}/*!Default close button class */ .ui-tooltip-titlebar .ui-state-default{position:absolute;right:4px;top:50%;margin-top:-9px;cursor:pointer;outline:medium none;border-width:1px;border-style:solid;}* html .ui-tooltip-titlebar .ui-state-default{top:16px;}.ui-tooltip-titlebar .ui-icon,.ui-tooltip-icon .ui-icon{display:block;text-indent:-1000em;}.ui-tooltip-icon,.ui-tooltip-icon .ui-icon{-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;}.ui-tooltip-icon .ui-icon{width:18px;height:14px;text-align:center;text-indent:0;font:normal bold 10px/13px Tahoma,sans-serif;color:inherit;background:transparent none no-repeat -100em -100em;}/*!Default tooltip style */ .ui-tooltip-titlebar,.ui-tooltip-content{border-color:#F1D031;background-color:#FFFFA3;color:#555;}.ui-tooltip-titlebar{background-color:#FFEF93;}.ui-tooltip-titlebar .ui-tooltip-icon{border-color:#CCC;background:#F1F1F1;color:#777;}.ui-tooltip-titlebar .ui-state-hover{border-color:#AAA;color:#111;}/*!Light tooltip style */ .ui-tooltip-light .ui-tooltip-titlebar,.ui-tooltip-light .ui-tooltip-content{border-color:#E2E2E2;color:#454545;}.ui-tooltip-light .ui-tooltip-content{background-color:white;}.ui-tooltip-light .ui-tooltip-titlebar{background-color:#f1f1f1;}/*!Dark tooltip style */ .ui-tooltip-dark .ui-tooltip-titlebar,.ui-tooltip-dark .ui-tooltip-content{border-color:#303030;color:#f3f3f3;}.ui-tooltip-dark .ui-tooltip-content{background-color:#505050;}.ui-tooltip-dark .ui-tooltip-titlebar{background-color:#404040;}.ui-tooltip-dark .ui-tooltip-icon{border-color:#444;}.ui-tooltip-dark .ui-tooltip-titlebar .ui-state-hover{border-color:#303030;}/*!Cream tooltip style */ .ui-tooltip-cream .ui-tooltip-titlebar,.ui-tooltip-cream .ui-tooltip-content{border-color:#F9E98E;color:#A27D35;}.ui-tooltip-cream .ui-tooltip-content{background-color:#FBF7AA;}.ui-tooltip-cream .ui-tooltip-titlebar{background-color:#F0DE7D;}.ui-tooltip-cream .ui-state-default .ui-tooltip-icon{background-position:-82px 0;}/*!Red tooltip style */ .ui-tooltip-red .ui-tooltip-titlebar,.ui-tooltip-red .ui-tooltip-content{border-color:#D95252;color:#912323;}.ui-tooltip-red .ui-tooltip-content{background-color:#F78B83;}.ui-tooltip-red .ui-tooltip-titlebar{background-color:#F06D65;}.ui-tooltip-red .ui-state-default .ui-tooltip-icon{background-position:-102px 0;}.ui-tooltip-red .ui-tooltip-icon{border-color:#D95252;}.ui-tooltip-red .ui-tooltip-titlebar .ui-state-hover{border-color:#D95252;}/*!Green tooltip style */ .ui-tooltip-green .ui-tooltip-titlebar,.ui-tooltip-green .ui-tooltip-content{border-color:#90D93F;color:#3F6219;}.ui-tooltip-green .ui-tooltip-content{background-color:#CAED9E;}.ui-tooltip-green .ui-tooltip-titlebar{background-color:#B0DE78;}.ui-tooltip-green .ui-state-default .ui-tooltip-icon{background-position:-42px 0;}/*!Blue tooltip style */ .ui-tooltip-blue .ui-tooltip-titlebar,.ui-tooltip-blue .ui-tooltip-content{border-color:#ADD9ED;color:#5E99BD;}.ui-tooltip-blue .ui-tooltip-content{background-color:#E5F6FE;}.ui-tooltip-blue .ui-tooltip-titlebar{background-color:#D0E9F5;}.ui-tooltip-blue .ui-state-default .ui-tooltip-icon{background-position:-2px 0;}.ui-tooltip .ui-tooltip-tip{margin:0 auto;overflow:hidden;background:transparent!important;border:0 dashed transparent!important;z-index:10;}.ui-tooltip .ui-tooltip-tip,.ui-tooltip .ui-tooltip-tip *{position:absolute;line-height:.1px!important;font-size:.1px!important;color:#123456;background:transparent;border:0 dashed transparent;}.ui-tooltip .ui-tooltip-tip canvas{position:static;}#qtip-overlay{position:absolute;left:-10000em;top:-10000em;background-color:black;opacity:.7;filter:alpha(opacity=70);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";}/*!Add shadows to your tooltips in:FF3+,Chrome 2+,Opera 10.6+,IE6+,Safari 2+*/ .ui-tooltip-shadow{-webkit-box-shadow:1px 1px 3px 1px rgba(0,0,0,0.15);-moz-box-shadow:1px 1px 3px 1px rgba(0,0,0,0.15);box-shadow:1px 1px 3px 1px rgba(0,0,0,0.15);}.ui-tooltip-shadow .ui-tooltip-titlebar,.ui-tooltip-shadow .ui-tooltip-content{filter:progid:DXImageTransform.Microsoft.Shadow(Color="gray",Direction=135,Strength=3);-ms-filter:"progid:DXImageTransform.Microsoft.Shadow(Color="gray",Direction=135,Strength=3)";_margin-bottom:-3px;.margin-bottom:-3px;}/*!Add rounded corners to your tooltips in:FF3+,Chrome 2+,Opera 10.6+,IE9+,Safari 2+*/ .ui-tooltip-rounded,.ui-tooltip-rounded .ui-tooltip-content,.ui-tooltip-tipsy,.ui-tooltip-tipsy .ui-tooltip-content,.ui-tooltip-youtube,.ui-tooltip-youtube .ui-tooltip-content{-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;}.ui-tooltip-rounded .ui-tooltip-titlebar,.ui-tooltip-tipsy .ui-tooltip-titlebar,.ui-tooltip-youtube .ui-tooltip-titlebar{-moz-border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;border-radius:5px 5px 0 0;}.ui-tooltip-rounded .ui-tooltip-titlebar+.ui-tooltip-content,.ui-tooltip-tipsy .ui-tooltip-titlebar+.ui-tooltip-content,.ui-tooltip-youtube .ui-tooltip-titlebar+.ui-tooltip-content{-moz-border-radius:0 0 5px 5px;-webkit-border-radius:0 0 5px 5px;border-radius:0 0 5px 5px;}/*!Youtube tooltip style */ .ui-tooltip-youtube{-webkit-box-shadow:0 0 3px #333;-moz-box-shadow:0 0 3px #333;box-shadow:0 0 3px #333;}.ui-tooltip-youtube .ui-tooltip-titlebar,.ui-tooltip-youtube .ui-tooltip-content{background:transparent;background:rgba(0,0,0,0.85);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#D9000000,endColorstr=#D9000000);-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#D9000000,endColorstr=#D9000000)";color:white;border-color:#CCC;}.ui-tooltip-youtube .ui-tooltip-icon{border-color:#222;}.ui-tooltip-youtube .ui-tooltip-titlebar .ui-state-hover{border-color:#303030;}.ui-tooltip-jtools{background:#232323;background:rgba(0,0,0,0.7);background-image:-moz-linear-gradient(top,#717171,#232323);background-image:-webkit-gradient(linear,left top,left bottom,from(#717171),to(#232323));border:2px solid #ddd;border:2px solid rgba(241,241,241,1);-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;-webkit-box-shadow:0 0 12px #333;-moz-box-shadow:0 0 12px #333;box-shadow:0 0 12px #333;}.ui-tooltip-jtools .ui-tooltip-titlebar{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#717171,endColorstr=#4A4A4A);-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#717171,endColorstr=#4A4A4A)";}.ui-tooltip-jtools .ui-tooltip-content{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4A4A4A,endColorstr=#232323);-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#4A4A4A,endColorstr=#232323)";}.ui-tooltip-jtools .ui-tooltip-titlebar,.ui-tooltip-jtools .ui-tooltip-content{background:transparent;color:white;border:0 dashed transparent;}.ui-tooltip-jtools .ui-tooltip-icon{border-color:#555;}.ui-tooltip-jtools .ui-tooltip-titlebar .ui-state-hover{border-color:#333;}.ui-tooltip-cluetip{-webkit-box-shadow:4px 4px 5px rgba(0,0,0,0.4);-moz-box-shadow:4px 4px 5px rgba(0,0,0,0.4);box-shadow:4px 4px 5px rgba(0,0,0,0.4);}.ui-tooltip-cluetip .ui-tooltip-titlebar{background-color:#87876A;color:white;border:0 dashed transparent;}.ui-tooltip-cluetip .ui-tooltip-content{background-color:#D9D9C2;color:#111;border:0 dashed transparent;}.ui-tooltip-cluetip .ui-tooltip-icon{border-color:#808064;}.ui-tooltip-cluetip .ui-tooltip-titlebar .ui-state-hover{border-color:#696952;color:#696952;}.ui-tooltip-tipsy{border:0;}.ui-tooltip-tipsy .ui-tooltip-titlebar,.ui-tooltip-tipsy .ui-tooltip-content{background:transparent;background:rgba(0,0,0,.87);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#D9000000,endColorstr=#D9000000);-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#D9000000,endColorstr=#D9000000)";color:white;border:0 transparent;font-size:11px;font-family:"Lucida Grande",sans-serif;font-weight:bold;line-height:16px;text-shadow:0 1px black;}.ui-tooltip-tipsy .ui-tooltip-titlebar{padding:6px 35px 0 10;}.ui-tooltip-tipsy .ui-tooltip-content{padding:6px 10;}.ui-tooltip-tipsy .ui-tooltip-icon{border-color:#222;text-shadow:none;}.ui-tooltip-tipsy .ui-tooltip-titlebar .ui-state-hover{border-color:#303030;}.ui-tooltip-tipped .ui-tooltip-titlebar,.ui-tooltip-tipped .ui-tooltip-content{border:3px solid #959FA9;}.ui-tooltip-tipped .ui-tooltip-titlebar{background:#3A79B8;background-image:-moz-linear-gradient(top,#3A79B8,#2E629D);background-image:-webkit-gradient(linear,left top,left bottom,from(#3A79B8),to(#2E629D));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#3A79B8,endColorstr=#2E629D);-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#3A79B8,endColorstr=#2E629D)";color:white;font-weight:normal;font-family:serif;border-bottom-width:0;-moz-border-radius:3px 3px 0 0;-webkit-border-radius:3px 3px 0 0;border-radius:3px 3px 0 0;}.ui-tooltip-tipped .ui-tooltip-content{background-color:#F9F9F9;color:#454545;-moz-border-radius:0 0 3px 3px;-webkit-border-radius:0 0 3px 3px;border-radius:0 0 3px 3px;}.ui-tooltip-tipped .ui-tooltip-icon{border:2px solid #285589;background:#285589;}.ui-tooltip-tipped .ui-tooltip-icon .ui-icon{background-color:#FBFBFB;color:#555;}' );
GM_addStyle( '.jgrowl{position:fixed;top:5px;}' );

GM_addStyle( '.ui-progressbar { height:1em; text-align: left; }' );
GM_addStyle( '.ui-progressbar .ui-progressbar-value {height:90%; }' );
GM_addStyle( '.ui-widget-header { border: 1px solid #e78f08; background: #f6a828 50% 50%; color: #ffffff; font-weight: bold; }.ui-widget { font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif; font-size: 1.1em; }.ui-widget .ui-widget { font-size: 1em; }' );
GM_addStyle( '.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl { -moz-border-radius-topleft: 4px; -webkit-border-top-left-radius: 4px; -khtml-border-top-left-radius: 4px; border-top-left-radius: 4px; }.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr { -moz-border-radius-topright: 4px; -webkit-border-top-right-radius: 4px; -khtml-border-top-right-radius: 4px; border-top-right-radius: 4px; }.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl { -moz-border-radius-bottomleft: 4px; -webkit-border-bottom-left-radius: 4px; -khtml-border-bottom-left-radius: 4px; border-bottom-left-radius: 4px; }.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br { -moz-border-radius-bottomright: 4px; -webkit-border-bottom-right-radius: 4px; -khtml-border-bottom-right-radius: 4px; border-bottom-right-radius: 4px; }' );

// jQuery crossdomain xml http request
jQuery.ajax=(function(_ajax){var protocol=location.protocol,hostname=location.hostname,exRegex=RegExp(protocol+'//'+hostname),YQL='http'+(/^https/.test(protocol)?'s':'')+'://query.yahooapis.com/v1/public/yql?callback=?',query='select * from html where url="{URL}" and xpath="*"';function isExternal(url){return!exRegex.test(url)&&/:\/\//.test(url)}return function(o){var url=o.url;if(/get/i.test(o.type)&&!/json/i.test(o.dataType)&&isExternal(url)){o.url=YQL;o.dataType='json';o.data={q:query.replace('{URL}',url+(o.data?(/\?/.test(url)?'&':'?')+jQuery.param(o.data):'')),format:'xml'};if(!o.success&&o.complete){o.success=o.complete;delete o.complete}o.success=(function(_success){return function(data){if(_success){_success.call(this,{responseText:data.results[0].replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi,'')},'success')}}})(o.success)}return _ajax.apply(this,arguments)}})(jQuery.ajax);

// jQuery plugin - scrolls to a certain point on a screen
(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

// jQuery blockUI plugin: http://malsup.com/jquery/block/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}(';(h($){7(/1\\.(0|1|2)\\.(0|1|2)/.1B($.O.1d)||/^1.1/.1B($.O.1d)){3b(\'d 38 1P 37.2.3 3d 3h!  36 3f 3i v\'+$.O.1d);M}$.O.1U=$.O.1a;c 1K=h(){};c 1E=u.34||0;c 2r=$.R.1b&&(($.R.2D<8&&!1E)||1E<8);c 1W=$.R.1b&&/33 6.0/.1B(2A.3D)&&!1E;$.d=h(5){24(18,5)};$.2E=h(5){1F(18,5)};$.2V=h(1c,S,G,2L){c $m=$(\'<g B="2V"></g>\');7(1c)$m.1L(\'<1H>\'+1c+\'</1H>\');7(S)$m.1L(\'<2G>\'+S+\'</2G>\');7(G==1G)G=3w;$.d({S:$m,1a:3j,P:2x,1p:1f,G:G,13:1f,L:2L,q:$.d.15.2S})};$.O.3z=h(5){M A.25({P:0}).1l(h(){7($.q(A,\'C\')==\'3B\')A.r.C=\'3A\';7($.R.1b)A.r.3t=1;24(A,5)})};$.O.25=h(5){M A.1l(h(){1F(A,5)})};$.d.2D=2.39;$.d.15={S:\'<1H>3n 1Z...</1H>\',1c:16,1M:I,T:1f,q:{1N:0,21:0,17:\'30%\',D:\'40%\',V:\'35%\',3l:\'29\',2t:\'#2c\',Y:\'3k 3o #3s\',2f:\'#2q\',1Y:\'1Z\'},1z:{17:\'30%\',D:\'40%\',V:\'35%\'},1x:{2f:\'#2c\',2d:0.6,1Y:\'1Z\'},2S:{17:\'3y\',D:\'1y\',V:\'\',3q:\'1y\',Y:\'J\',1N:\'3r\',2d:0.6,1Y:\'3p\',2t:\'#2q\',2f:\'#2c\',\'-3u-Y-27\':\'1y\',\'-3C-Y-27\':\'1y\',\'Y-27\':\'1y\'},2m:/^3v/i.1B(18.3x.3e||\'\')?\'3g:1f\':\'3c:3a\',1C:1f,2h:2x,2F:I,1p:I,2z:I,2K:I,2W:I,1a:3m,P:3H,G:0,13:I,2B:I,2u:I,1t:16,L:16,2j:4,1e:\'43\'};c Z=16;c 12=[];h 24(a,5){c k=(a==18);c j=5&&5.S!==1G?5.S:1G;5=$.1v({},$.d.15,5||{});5.1x=$.1v({},$.d.15.1x,5.1x||{});c q=$.1v({},$.d.15.q,5.q||{});c 1z=$.1v({},$.d.15.1z,5.1z||{});j=j===1G?5.S:j;7(k&&Z)1F(18,{P:0});7(j&&2M j!=\'44\'&&(j.14||j.1d)){c 19=j.1d?j[0]:j;c f={};$(a).f(\'d.26\',f);f.a=19;f.1r=19.14;f.E=19.r.E;f.C=19.r.C;7(f.1r)f.1r.2I(19)}$(a).f(\'d.L\',5.L);c z=5.2h;c 1q=($.R.1b||5.1C)?$(\'<2s B="d" r="z-11:\'+(z++)+\';E:J;Y:J;21:0;1N:0;C:1o;17:1m%;1j:1m%;D:0;V:0" 45="\'+5.2m+\'"></2s>\'):$(\'<g B="d" r="E:J"></g>\');c X=5.T?$(\'<g B="d 2y n-N-47" r="z-11:\'+(z++)+\';E:J"></g>\'):$(\'<g B="d 2y" r="z-11:\'+(z++)+\';E:J;Y:J;21:0;1N:0;17:1m%;1j:1m%;D:0;V:0"></g>\');c w,s;7(5.T&&k){s=\'<g B="d \'+5.1e+\' 2o n-W n-N n-1Q-1J" r="z-11:\'+(z+10)+\';E:J;C:2a">\'+\'<g B="n-N-2w n-W-2b n-1Q-1J 2k">\'+(5.1c||\'&2i;\')+\'</g>\'+\'<g B="n-N-1i n-W-1i"></g>\'+\'</g>\'}H 7(5.T){s=\'<g B="d \'+5.1e+\' 2v n-W n-N n-1Q-1J" r="z-11:\'+(z+10)+\';E:J;C:1o">\'+\'<g B="n-N-2w n-W-2b n-1Q-1J 2k">\'+(5.1c||\'&2i;\')+\'</g>\'+\'<g B="n-N-1i n-W-1i"></g>\'+\'</g>\'}H 7(k){s=\'<g B="d \'+5.1e+\' 2o" r="z-11:\'+(z+10)+\';E:J;C:2a"></g>\'}H{s=\'<g B="d \'+5.1e+\' 2v" r="z-11:\'+(z+10)+\';E:J;C:1o"></g>\'}w=$(s);7(j){7(5.T){w.q(1z);w.42(\'n-N-1i\')}H w.q(q)}7(!5.T&&(!5.2u||!($.R.41&&/3X/.1B(2A.3Y))))X.q(5.1x);X.q(\'C\',k?\'2a\':\'1o\');7($.R.1b||5.1C)1q.q(\'2d\',0.0);c 2l=[1q,X,w],$2n=k?$(\'K\'):$(a);$.1l(2l,h(){A.3Z($2n)});7(5.T&&5.1M&&$.O.1M){w.1M({46:\'.n-W-2b\',4c:\'48\'})}c 2p=2r&&(!$.1n||$(\'4a,49\',k?16:a).1s>0);7(1W||2p){7(k&&5.2z&&$.1n)$(\'4b,K\').q(\'1j\',\'1m%\');7((1W||!$.1n)&&!k){c t=1k(a,\'2N\'),l=1k(a,\'2O\');c 22=t?\'(0 - \'+t+\')\':0;c 1T=l?\'(0 - \'+l+\')\':0}$.1l([1q,X,w],h(i,o){c s=o[0].r;s.C=\'1o\';7(i<2){k?s.Q(\'1j\',\'3V.3K(u.K.3L, u.K.1A) - (1P.1n?0:\'+5.2j+\') + "U"\'):s.Q(\'1j\',\'A.14.1A + "U"\');k?s.Q(\'17\',\'1P.1n && u.1h.2U || u.K.2U + "U"\'):s.Q(\'17\',\'A.14.2g + "U"\');7(1T)s.Q(\'V\',1T);7(22)s.Q(\'D\',22)}H 7(5.1p){7(k)s.Q(\'D\',\'(u.1h.2T || u.K.2T) / 2 - (A.1A / 2) + (3E = u.1h.1g ? u.1h.1g : u.K.1g) + "U"\');s.3J=0}H 7(!5.1p&&k){c D=(5.q&&5.q.D)?2Z(5.q.D):0;c 2Q=\'((u.1h.1g ? u.1h.1g : u.K.1g) + \'+D+\') + "U"\';s.Q(\'D\',2Q)}})}7(j){7(5.T)w.3I(\'.n-N-1i\').1L(j);H w.1L(j);7(j.1d||j.3F)$(j).1I()}7(($.R.1b||5.1C)&&5.13)1q.1I();7(5.1a){c 1V=5.1t?5.1t:1K;c 31=(5.13&&!j)?1V:1K;c 2Y=j?1V:1K;7(5.13)X.1U(5.1a,31);7(j)w.1U(5.1a,2Y)}H{7(5.13)X.1I();7(j)w.1I();7(5.1t)5.1t()}1S(1,a,5);7(k){Z=w[0];12=$(\':3G:3W:3M\',Z);7(5.2B)1R(1O,20)}H 29(w[0],5.2F,5.1p);7(5.G){c 1u=1R(h(){k?$.2E(5):$(a).25(5)},5.G);$(a).f(\'d.G\',1u)}};h 1F(a,5){c k=(a==18);c $a=$(a);c f=$a.f(\'d.26\');c 1u=$a.f(\'d.G\');7(1u){3N(1u);$a.2e(\'d.G\')}5=$.1v({},$.d.15,5||{});1S(0,a,5);7(5.L===16){5.L=$a.f(\'d.L\');$a.2e(\'d.L\')}c F;7(k)F=$(\'K\').2P().2C(\'.d\').3T(\'K > .d\');H F=$(\'.d\',a);7(k)Z=12=16;7(5.P){F.P(5.P);1R(h(){28(F,f,5,a)},5.P)}H 28(F,f,5,a)};h 28(F,f,5,a){F.1l(h(i,o){7(A.14)A.14.2I(A)});7(f&&f.a){f.a.r.E=f.E;f.a.r.C=f.C;7(f.1r)f.1r.3U(f.a);$(a).2e(\'d.26\')}7(2M 5.L==\'h\')5.L(a,5)};h 1S(b,a,5){c k=a==18,$a=$(a);7(!b&&(k&&!Z||!k&&!$a.f(\'d.2J\')))M;7(!k)$a.f(\'d.2J\',b);7(!5.2K||(b&&!5.13))M;c 1X=\'3S 3R 3O 3P\';b?$(u).1S(1X,5,23):$(u).3Q(1X,23)};h 23(e){7(e.2X&&e.2X==9){7(Z&&e.f.2W){c F=12;c 2R=!e.32&&e.1D===F[F.1s-1];c 1w=e.32&&e.1D===F[0];7(2R||1w){1R(h(){1O(1w)},10);M 1f}}}c 5=e.f;7($(e.1D).2H(\'g.\'+5.1e).1s>0)M I;M $(e.1D).2H().2P().2C(\'g.d\').1s==0};h 1O(1w){7(!12)M;c e=12[1w===I?12.1s-1:0];7(e)e.1O()};h 29(a,x,y){c p=a.14,s=a.r;c l=((p.2g-a.2g)/2)-1k(p,\'2O\');c t=((p.1A-a.1A)/2)-1k(p,\'2N\');7(x)s.V=l>0?(l+\'U\'):\'0\';7(y)s.D=t>0?(t+\'U\'):\'0\'};h 1k(a,p){M 2Z($.q(a,p))||0}})(1P);',62,261,'|||||opts||if|||el||var|blockUI||data|div|function||msg|full|||ui|||css|style|||document||lyr3||||this|class|position|top|display|els|timeout|else|true|none|body|onUnblock|return|widget|fn|fadeOut|setExpression|browser|message|theme|px|left|dialog|lyr2|border|pageBlock||index|pageBlockEls|showOverlay|parentNode|defaults|null|width|window|node|fadeIn|msie|title|jquery|blockMsgClass|false|scrollTop|documentElement|content|height|sz|each|100|boxModel|absolute|centerY|lyr1|parent|length|onBlock|to|extend|back|overlayCSS|10px|themedCSS|offsetHeight|test|forceIframe|target|mode|remove|undefined|h1|show|all|noOp|append|draggable|padding|focus|jQuery|corner|setTimeout|bind|fixL|_fadeIn|cb|ie6|events|cursor|wait||margin|fixT|handler|install|unblock|history|radius|reset|center|fixed|titlebar|000|opacity|removeData|backgroundColor|offsetWidth|baseZ|nbsp|quirksmodeOffsetHack|blockTitle|layers|iframeSrc|par|blockPage|expr|fff|setExpr|iframe|color|applyPlatformOpacityRules|blockElement|header|1000|blockOverlay|allowBodyStretch|navigator|focusInput|filter|version|unblockUI|centerX|h2|parents|removeChild|isBlocked|bindEvents|onClose|typeof|borderTopWidth|borderLeftWidth|children|expression|fwd|growlCSS|clientHeight|clientWidth|growlUI|constrainTabKey|keyCode|cb2|parseInt||cb1|shiftKey|MSIE|documentMode||You|v1|requires||blank|alert|about|or|href|are|javascript|later|using|700|3px|textAlign|200|Please|solid|default|right|5px|aaa|zoom|webkit|https|3000|location|350px|block|relative|static|moz|userAgent|blah|nodeType|input|400|find|marginTop|max|scrollHeight|visible|clearTimeout|keydown|keypress|unbind|mouseup|mousedown|add|appendChild|Math|enabled|Linux|platform|appendTo||mozilla|addClass|blockMsg|string|src|handle|overlay|li|embed|object|html|cancel'.split('|'),0,{}));

// jQuery plugin - changes color of an element
(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.curCSS(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);

// jQuery plugin - table sorter
(function($){$.extend({tablesorter:new function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'.',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}var rows=table.tBodies[0].rows;if(table.tBodies[0].rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}if(!p){p=detectParserForColumn(table,cells[i]);}if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}list.push(p);}}if(table.config.debug){log(parsersDebug);}return list;};function detectParserForColumn(table,node){var l=parsers.length;for(var i=1;i<l;i++){if(parsers[i].is($.trim(getElementText(table.config,node)),table,node)){return parsers[i];}}return parsers[0];}function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}return false;}function buildCache(table){if(table.config.debug){var cacheTime=new Date();}var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=table.tBodies[0].rows[i],cols=[];cache.row.push($(c));for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c.cells[j]),table,c.cells[j]));}cols.push(i);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}return cache;};function getElementText(config,node){if(!node)return"";var t="";if(config.textExtraction=="simple"){if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){t=node.childNodes[0].innerHTML;}else{t=node.innerHTML;}}else{if(typeof(config.textExtraction)=="function"){t=config.textExtraction(node);}else{t=$(node).text();}}return t;}function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){rows.push(r[n[i][checkCell]]);if(!table.config.appender){var o=r[n[i][checkCell]];var l=o.length;for(var j=0;j<l;j++){tableBody[0].appendChild(o[j]);}}}if(table.config.appender){table.config.appender(table,rows);}rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}var meta=($.metadata)?true:false,tableHeadersRows=[];for(var i=0;i<table.tHead.rows.length;i++){tableHeadersRows[i]=0;};$tableHeaders=$("thead th",table);$tableHeaders.each(function(index){this.count=0;this.column=index;this.order=formatSortingOrder(table.config.sortInitialOrder);if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(!this.sortDisabled){$(this).addClass(table.config.cssHeader);}table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}return $tableHeaders;};function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){i=(v.toLowerCase()=="desc")?1:0;}else{i=(v==(0||1))?v:0;}return i;}function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}return false;}function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(getCachedSortType(table.config.parsers,c)=="text")?((order==0)?"sortText":"sortTextDesc"):((order==0)?"sortNumeric":"sortNumericDesc");var e="e"+i;dynamicExp+="var "+e+" = "+s+"(a["+c+"],b["+c+"]); ";dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}dynamicExp+="return 0; ";dynamicExp+="}; ";eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}return cache;};function sortText(a,b){return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){$this.trigger("sortStart");var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){var $cell=$(this);var i=this.column;this.order=this.count++%2;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){var DECIMAL='\\'+config.decimal;var exp='/(^[+]?0('+DECIMAL+'0+)?$)|(^([-+]?[1-9][0-9]*)$)|(^([-+]?((0?|[1-9][0-9]*)'+DECIMAL+'(0*[1-9][0-9]*)))$)|(^[-+]?[1-9]+[0-9]*'+DECIMAL+'0+$)/';return RegExp(exp).test($.trim(s));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)this.removeChild(this.firstChild);}empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return/^[A?$a‚¬?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[^0-9.]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return/^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return/\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}$("tr:visible",table.tBodies[0]).filter(':even').removeClass(table.config.widgetZebra.css[1]).addClass(table.config.widgetZebra.css[0]).end().filter(':odd').removeClass(table.config.widgetZebra.css[0]).addClass(table.config.widgetZebra.css[1]);if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);

// jQuery plugin - float number: http://plugins.jquery.com/project/floatnumber
(function(a){a.fn.floatnumber=function(c,b){return this.each(function(){var d=a(this);var e=false;function f(){var g=new RegExp(",","g");s=d.val();s=s.replace(g,".");if(s==""){s="0"}if(!isNaN(s)){n=parseFloat(s);s=n.toFixed(b);re2=new RegExp("\\.","g");s=s.replace(re2,c);d.val(s)}}d.bind("blur",f)})}})(jQuery);

// jquery ui 1.8.14
(function(c,j){function k(a,b){var d=a.nodeName.toLowerCase();if("area"===d){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&l(a)}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&l(a)}function l(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.14",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,m,n){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(m)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(n)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){return k(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,"tabindex"),d=isNaN(b);return(d||b>=0)&&k(a,!d)}});c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);;(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);;(function(b){var d=false;b(document).mousedown(function(){d=false});b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){if(!d){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,f=a.which==1,g=typeof this.options.cancel=="string"?b(a.target).closest(this.options.cancel).length:false;if(!f||g||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(e){return c._mouseMove(e)};this._mouseUpDelegate=function(e){return c._mouseUp(e)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return d=true}},_mouseMove:function(a){if(b.browser.msie&&!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);;(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);;(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;d(b.iframeFix===true?"iframe":b.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")});return true},_mouseStart:function(a){var b=this.options;this.helper=this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);d.ui.ddmanager&&d.ui.ddmanager.dragStart(this,a);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},_mouseUp:function(a){this.options.iframeFix===true&&d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});d.ui.ddmanager&&d.ui.ddmanager.dragStop(this,a);return d.ui.mouse.prototype._mouseUp.call(this,a)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone().removeAttr("id"):this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[a.containment=="document"?0:d(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,a.containment=="document"?0:d(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){a=d(a.containment);var b=a[0];if(b){a.offset();var c=d(b).css("overflow")!="hidden";this.containment=[(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0),(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0),(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=a}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,h=a.pageY;if(this.originalPosition){var g;if(this.containment){if(this.relative_container){g=this.relative_container.offset();g=[this.containment[0]+g.left,this.containment[1]+g.top,this.containment[2]+g.left,this.containment[3]+g.top]}else g=this.containment;if(a.pageX-this.offset.click.left<g[0])e=g[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<g[1])h=g[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>g[2])e=g[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>g[3])h=g[3]+this.offset.click.top}if(b.grid){h=b.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/b.grid[1])*b.grid[1]:this.originalPageY;h=g?!(h-this.offset.click.top<g[1]||h-this.offset.click.top>g[3])?h:!(h-this.offset.click.top<g[1])?h-b.grid[1]:h+b.grid[1]:h;e=b.grid[0]?this.originalPageX+Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0]:this.originalPageX;e=g?!(e-this.offset.click.left<g[0]||e-this.offset.click.left>g[2])?e:!(e-this.offset.click.left<g[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.14"});d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var h=d.data(this,"sortable");if(h&&!h.options.disabled){c.sortables.push({instance:h,shouldRevert:h.options.revert});h.refreshPositions();h._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),f=c.options,e=f.snapTolerance,h=b.offset.left,g=h+c.helperProportions.width,n=b.offset.top,o=n+c.helperProportions.height,i=c.snapElements.length-1;i>=0;i--){var j=c.snapElements[i].left,l=j+c.snapElements[i].width,k=c.snapElements[i].top,m=k+c.snapElements[i].height;if(j-e<h&&h<l+e&&k-e<n&&n<m+e||j-e<h&&h<l+e&&k-e<o&&o<m+e||j-e<g&&g<l+e&&k-e<n&&n<m+e||j-e<g&&g<l+e&&k-e<o&&o<m+e){if(f.snapMode!="inner"){var p=Math.abs(k-o)<=e,q=Math.abs(m-n)<=e,r=Math.abs(j-g)<=e,s=Math.abs(l-h)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:m,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l}).left-c.margins.left}var t=p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(k-n)<=e;q=Math.abs(m-o)<=e;r=Math.abs(j-h)<=e;s=Math.abs(l-g)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:m-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[i].snapping&&(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=p||q||r||s||t}else{c.snapElements[i].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);;(function(d){d.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var a=this.options,b=a.accept;this.isover=0;this.isout=1;this.accept=d.isFunction(b)?b:function(c){return c.is(b)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};d.ui.ddmanager.droppables[a.scope]=d.ui.ddmanager.droppables[a.scope]||[];d.ui.ddmanager.droppables[a.scope].push(this);a.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var a=d.ui.ddmanager.droppables[this.options.scope],b=0;b<a.length;b++)a[b]==this&&a.splice(b,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(a,b){if(a=="accept")this.accept=d.isFunction(b)?b:function(c){return c.is(b)};d.Widget.prototype._setOption.apply(this,arguments)},_activate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass);b&&this._trigger("activate",a,this.ui(b))},_deactivate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass);b&&this._trigger("deactivate",a,this.ui(b))},_over:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);this._trigger("over",a,this.ui(b))}},_out:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("out",a,this.ui(b))}},_drop:function(a,b){var c=b||d.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return false;var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var g=d.data(this,"droppable");if(g.options.greedy&&!g.options.disabled&&g.options.scope==c.options.scope&&g.accept.call(g.element[0],c.currentItem||c.element)&&d.ui.intersect(c,d.extend(g,{offset:g.element.offset()}),g.options.tolerance)){e=true;return false}});if(e)return false;if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("drop",a,this.ui(c));return this.element}return false},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}});d.extend(d.ui.droppable,{version:"1.8.14"});d.ui.intersect=function(a,b,c){if(!b.offset)return false;var e=(a.positionAbs||a.position.absolute).left,g=e+a.helperProportions.width,f=(a.positionAbs||a.position.absolute).top,h=f+a.helperProportions.height,i=b.offset.left,k=i+b.proportions.width,j=b.offset.top,l=j+b.proportions.height;switch(c){case"fit":return i<=e&&g<=k&&j<=f&&h<=l;case"intersect":return i<e+a.helperProportions.width/2&&g-a.helperProportions.width/2<k&&j<f+a.helperProportions.height/2&&h-a.helperProportions.height/2<l;case"pointer":return d.ui.isOver((a.positionAbs||a.position.absolute).top+(a.clickOffset||a.offset.click).top,(a.positionAbs||a.position.absolute).left+(a.clickOffset||a.offset.click).left,j,i,b.proportions.height,b.proportions.width);case"touch":return(f>=j&&f<=l||h>=j&&h<=l||f<j&&h>l)&&(e>=i&&e<=k||g>=i&&g<=k||e<i&&g>k);default:return false}};d.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(a,b){var c=d.ui.ddmanager.droppables[a.options.scope]||[],e=b?b.type:null,g=(a.currentItem||a.element).find(":data(droppable)").andSelf(),f=0;a:for(;f<c.length;f++)if(!(c[f].options.disabled||a&&!c[f].accept.call(c[f].element[0],a.currentItem||a.element))){for(var h=0;h<g.length;h++)if(g[h]==c[f].element[0]){c[f].proportions.height=0;continue a}c[f].visible=c[f].element.css("display")!="none";if(c[f].visible){e=="mousedown"&&c[f]._activate.call(c[f],b);c[f].offset=c[f].element.offset();c[f].proportions={width:c[f].element[0].offsetWidth,height:c[f].element[0].offsetHeight}}}},drop:function(a,b){var c=false;d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&d.ui.intersect(a,this,this.options.tolerance))c=c||this._drop.call(this,b);if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],a.currentItem||a.element)){this.isout=1;this.isover=0;this._deactivate.call(this,b)}}});return c},dragStart:function(a,b){a.element.parentsUntil("body").bind("scroll.droppable",function(){a.options.refreshPositions||d.ui.ddmanager.prepareOffsets(a,b)})},drag:function(a,b){a.options.refreshPositions&&d.ui.ddmanager.prepareOffsets(a,b);d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var c=d.ui.intersect(a,this,this.options.tolerance);if(c=!c&&this.isover==1?"isout":c&&this.isover==0?"isover":null){var e;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");if(g.length){e=d.data(g[0],"droppable");e.greedyChild=c=="isover"?1:0}}if(e&&c=="isover"){e.isover=0;e.isout=1;e._out.call(e,b)}this[c]=1;this[c=="isout"?"isover":"isout"]=0;this[c=="isover"?"_over":"_out"].call(this,b);if(e&&c=="isout"){e.isout=0;e.isover=1;e._over.call(e,b)}}}})},dragStop:function(a,b){a.element.parentsUntil("body").unbind("scroll.droppable");a.options.refreshPositions||d.ui.ddmanager.prepareOffsets(a,b)}}})(jQuery);;(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),l=0;l=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,l);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){if(!a.disabled){e(this).removeClass("ui-resizable-autohide");b._handles.show()}},function(){if(!a.disabled)if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;f=f?0:c.sizeDiff.width;f={width:c.helper.width()-f,height:c.helper.height()-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",b);this._helper&&this.helper.remove();return false},_updateVirtualBoundaries:function(b){var a=this.options,c,d,f;a={minWidth:k(a.minWidth)?a.minWidth:0,maxWidth:k(a.maxWidth)?a.maxWidth:Infinity,minHeight:k(a.minHeight)?a.minHeight:0,maxHeight:k(a.maxHeight)?a.maxHeight:Infinity};if(this._aspectRatio||b){b=a.minHeight*this.aspectRatio;d=a.minWidth/this.aspectRatio;c=a.maxHeight*this.aspectRatio;f=a.maxWidth/this.aspectRatio;if(b>a.minWidth)a.minWidth=b;if(d>a.minHeight)a.minHeight=d;if(c<a.maxWidth)a.maxWidth=c;if(f<a.maxHeight)a.maxHeight=f}this._vBoundaries=a},_updateCache:function(b){this.offset=this.helper.offset();if(k(b.left))this.position.left=b.left;if(k(b.top))this.position.top=b.top;if(k(b.height))this.size.height=b.height;if(k(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,d=this.axis;if(k(b.height))b.width=b.height*this.aspectRatio;else if(k(b.width))b.height=b.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=null}if(d=="nw"){b.top=a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this._vBoundaries,c=this.axis,d=k(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=k(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=k(b.width)&&a.minWidth&&a.minWidth>b.width,h=k(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,l=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&l)b.left=i-a.minWidth;if(d&&l)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=[c.css("borderTopWidth"),c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,a){return{width:this.originalSize.width+a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,{version:"1.8.14"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var l=e(this),q=e(this).data("resizable-alsoresize"),p={},r=j&&j.length?j:l.parents(a.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(n,o){if((n=(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(l.css("position"))){c._revertToRelativePosition=true;l.css({position:"absolute",top:"auto",left:"auto"})}l.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};if(b._revertToRelativePosition){b._revertToRelativePosition=false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-g};g=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,height:i.height});a._updateCache(i);a._propagate("resize",b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=e(a),f=[];e(["Top","Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,d=a.containerOffset,f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?d.top:0}a.offset.left=a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=a.size.width/a.aspectRatio}if(d+a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&/static/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,10)||0},k=function(b){return!isNaN(parseInt(b,10))}})(jQuery);;(function(e){e.widget("ui.selectable",e.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var c=this;this.element.addClass("ui-selectable");this.dragged=false;var f;this.refresh=function(){f=e(c.options.filter,c.element[0]);f.each(function(){var d=e(this),b=d.offset();e.data(this,"selectable-item",{element:this,$element:d,left:b.left,top:b.top,right:b.left+d.outerWidth(),bottom:b.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})})};this.refresh();this.selectees=f.addClass("ui-selectee");this._mouseInit();this.helper=e("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy();return this},_mouseStart:function(c){var f=this;this.opos=[c.pageX,c.pageY];if(!this.options.disabled){var d=this.options;this.selectees=e(d.filter,this.element[0]);this._trigger("start",c);e(d.appendTo).append(this.helper);this.helper.css({left:c.clientX,top:c.clientY,width:0,height:0});d.autoRefresh&&this.refresh();this.selectees.filter(".ui-selected").each(function(){var b=e.data(this,"selectable-item");b.startselected=true;if(!c.metaKey){b.$element.removeClass("ui-selected");b.selected=false;b.$element.addClass("ui-unselecting");b.unselecting=true;f._trigger("unselecting",c,{unselecting:b.element})}});e(c.target).parents().andSelf().each(function(){var b=e.data(this,"selectable-item");if(b){var g=!c.metaKey||!b.$element.hasClass("ui-selected");b.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting");b.unselecting=!g;b.selecting=g;(b.selected=g)?f._trigger("selecting",c,{selecting:b.element}):f._trigger("unselecting",c,{unselecting:b.element});return false}})}},_mouseDrag:function(c){var f=this;this.dragged=true;if(!this.options.disabled){var d=this.options,b=this.opos[0],g=this.opos[1],h=c.pageX,i=c.pageY;if(b>h){var j=h;h=b;b=j}if(g>i){j=i;i=g;g=j}this.helper.css({left:b,top:g,width:h-b,height:i-g});this.selectees.each(function(){var a=e.data(this,"selectable-item");if(!(!a||a.element==f.element[0])){var k=false;if(d.tolerance=="touch")k=!(a.left>h||a.right<b||a.top>i||a.bottom<g);else if(d.tolerance=="fit")k=a.left>b&&a.right<h&&a.top>g&&a.bottom<i;if(k){if(a.selected){a.$element.removeClass("ui-selected");a.selected=false}if(a.unselecting){a.$element.removeClass("ui-unselecting");a.unselecting=false}if(!a.selecting){a.$element.addClass("ui-selecting");a.selecting=true;f._trigger("selecting",c,{selecting:a.element})}}else{if(a.selecting)if(c.metaKey&&a.startselected){a.$element.removeClass("ui-selecting");a.selecting=false;a.$element.addClass("ui-selected");a.selected=true}else{a.$element.removeClass("ui-selecting");a.selecting=false;if(a.startselected){a.$element.addClass("ui-unselecting");a.unselecting=true}f._trigger("unselecting",c,{unselecting:a.element})}if(a.selected)if(!c.metaKey&&!a.startselected){a.$element.removeClass("ui-selected");a.selected=false;a.$element.addClass("ui-unselecting");a.unselecting=true;f._trigger("unselecting",c,{unselecting:a.element})}}}});return false}},_mouseStop:function(c){var f=this;this.dragged=false;e(".ui-unselecting",this.element[0]).each(function(){var d=e.data(this,"selectable-item");d.$element.removeClass("ui-unselecting");d.unselecting=false;d.startselected=false;f._trigger("unselected",c,{unselected:d.element})});e(".ui-selecting",this.element[0]).each(function(){var d=e.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected");d.selecting=false;d.selected=true;d.startselected=true;f._trigger("selected",c,{selected:d.element})});this._trigger("stop",c);this.helper.remove();return false}});e.extend(e.ui.selectable,{version:"1.8.14"})})(jQuery);;(function(d){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){var a=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(a,b){if(a==="disabled"){this.options[a]=b;this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")}else d.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(a,b){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(a);var c=null,e=this;d(a.target).parents().each(function(){if(d.data(this,"sortable-item")==e){c=d(this);return false}});if(d.data(a.target,"sortable-item")==e)c=d(a.target);if(!c)return false;if(this.options.handle&&!b){var f=false;d(this.options.handle,c).find("*").andSelf().each(function(){if(this==a.target)f=true});if(!f)return false}this.currentItem=c;this._removeCurrentsFromItems();return true},_mouseStart:function(a,b,c){b=this.options;var e=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();b.containment&&this._setContainment();if(b.cursor){if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");d("body").css("cursor",b.cursor)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("activate",a,e._uiHash(this));if(d.ui.ddmanager)d.ui.ddmanager.current=this;d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);return true},_mouseDrag:function(a){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var b=this.options,c=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else{if(a.pageY-d(document).scrollTop()<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()-b.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()+b.scrollSpeed);if(a.pageX-d(document).scrollLeft()<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed)}c!==false&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(b=this.items.length-1;b>=0;b--){c=this.items[b];var e=c.item[0],f=this._intersectsWithPointer(c);if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],e):true)){this.direction=f==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(c))this._rearrange(a,c);else break;this._trigger("change",a,this._uiHash());break}}this._contactContainers(a);d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(a,b){if(a){d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this;b=c.placeholder.offset();c.reverting=true;d(this.helper).animate({left:b.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:b.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return false}},cancel:function(){var a=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var b=this.containers.length-1;b>=0;b--){this.containers[b]._trigger("deactivate",null,a._uiHash(this));if(this.containers[b].containerCache.over){this.containers[b]._trigger("out",null,a._uiHash(this));this.containers[b].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();d.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):d(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};d(b).each(function(){var e=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);if(e)c.push((a.key||e[1]+"[]")+"="+(a.key&&a.expression?e[1]:e[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},toArray:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};b.each(function(){c.push(d(a.item||this).attr(a.attribute||"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,e=this.positionAbs.top,f=e+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,k=i+a.height,j=this.offset.click.top,l=this.offset.click.left;j=e+j>i&&e+j<k&&b+l>g&&b+l<h;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:g<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<h&&i<e+this.helperProportions.height/2&&f-this.helperProportions.height/2<k},_intersectsWithPointer:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);b=b&&a;a=this._getDragVerticalDirection();var c=this._getDragHorizontalDirection();if(!b)return false;return this.floating?c&&c=="right"||a=="down"?2:1:a&&(a=="down"?2:1)},_intersectsWithSides:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width);var c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?e=="right"&&a||e=="left"&&!a:c&&(c=="down"&&b||c=="up"&&!b)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){var b=[],c=[],e=this._connectWith();if(e&&a)for(a=e.length-1;a>=0;a--)for(var f=d(e[a]),g=f.length-1;g>=0;g--){var h=d.data(f[g],"sortable");if(h&&h!=this&&!h.options.disabled)c.push([d.isFunction(h.options.items)?h.options.items.call(h.element):d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(a=c.length-1;a>=0;a--)c[a][0].each(function(){b.push(this)});return d(b)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(a){this.items=[];this.containers=[this];var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):d(this.options.items,this.element),this]],e=this._connectWith();if(e)for(var f=e.length-1;f>=0;f--)for(var g=d(e[f]),h=g.length-1;h>=0;h--){var i=d.data(g[h],"sortable");if(i&&i!=this&&!i.options.disabled){c.push([d.isFunction(i.options.items)?i.options.items.call(i.element[0],a,{item:this.currentItem}):d(i.options.items,i.element),i]);this.containers.push(i)}}for(f=c.length-1;f>=0;f--){a=c[f][1];e=c[f][0];h=0;for(g=e.length;h<g;h++){i=d(e[h]);i.data("sortable-item",a);b.push({item:i,instance:a,width:0,height:0,left:0,top:0})}}},refreshPositions:function(a){if(this.offsetParent&&this.helper)this.offset.parent=this._getParentOffset();for(var b=this.items.length-1;b>=0;b--){var c=this.items[b];if(!(c.instance!=this.currentContainer&&this.currentContainer&&c.item[0]!=this.currentItem[0])){var e=this.options.toleranceElement?d(this.options.toleranceElement,c.item):c.item;if(!a){c.width=e.outerWidth();c.height=e.outerHeight()}e=e.offset();c.left=e.left;c.top=e.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=this.containers.length-1;b>=0;b--){e=this.containers[b].element.offset();this.containers[b].containerCache.left=e.left;this.containers[b].containerCache.top=e.top;this.containers[b].containerCache.width=this.containers[b].element.outerWidth();this.containers[b].containerCache.height=this.containers[b].element.outerHeight()}return this},_createPlaceholder:function(a){var b=a||this,c=b.options;if(!c.placeholder||c.placeholder.constructor==String){var e=c.placeholder;c.placeholder={element:function(){var f=d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!e)f.style.visibility="hidden";return f},update:function(f,g){if(!(e&&!c.forcePlaceholderSize)){g.height()||g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10));g.width()||g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);c.placeholder.update(b,b.placeholder)},_contactContainers:function(a){for(var b=null,c=null,e=this.containers.length-1;e>=0;e--)if(!d.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!(b&&d.ui.contains(this.containers[e].element[0],b.element[0]))){b=this.containers[e];c=e}}else if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",a,this._uiHash(this));this.containers[e].containerCache.over=0}if(b)if(this.containers.length===1){this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}else if(this.currentContainer!=this.containers[c]){b=1E4;e=null;for(var f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[c].floating?"left":"top"];if(Math.abs(h-f)<b){b=Math.abs(h-f);e=this.items[g]}}if(e||this.options.dropOnEmpty){this.currentContainer=this.containers[c];e?this._rearrange(a,e,null,true):this._rearrange(a,null,this.containers[c].element,true);this._trigger("change",a,this._uiHash());this.containers[c]._trigger("change",a,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}}},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):b.helper=="clone"?this.currentItem.clone():this.currentItem;a.parents("body").length||d(b.appendTo!="parent"?b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);if(a[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(a[0].style.width==""||b.forceHelperSize)a.width(this.currentItem.width());if(a[0].style.height==""||b.forceHelperSize)a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)){var b=d(a.containment)[0];a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();var f=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])f=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/b.grid[0])*b.grid[0];f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())}},_rearrange:function(a,b,c,e){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var f=this,g=this.counter;window.setTimeout(function(){g==f.counter&&f.refreshPositions(!e)},0)},_clear:function(a,b){this.reverting=false;var c=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!b&&c.push(function(f){this._trigger("receive",f,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!b)c.push(function(f){this._trigger("update",f,this._uiHash())});if(!d.ui.contains(this.element[0],this.currentItem[0])){b||c.push(function(f){this._trigger("remove",f,this._uiHash())});for(e=this.containers.length-1;e>=0;e--)if(d.ui.contains(this.containers[e].element[0],this.currentItem[0])&&!b){c.push(function(f){return function(g){f._trigger("receive",g,this._uiHash(this))}}.call(this,this.containers[e]));c.push(function(f){return function(g){f._trigger("update",g,this._uiHash(this))}}.call(this,this.containers[e]))}}for(e=this.containers.length-1;e>=0;e--){b||c.push(function(f){return function(g){f._trigger("deactivate",g,this._uiHash(this))}}.call(this,this.containers[e]));if(this.containers[e].containerCache.over){c.push(function(f){return function(g){f._trigger("out",g,this._uiHash(this))}}.call(this,this.containers[e]));this.containers[e].containerCache.over=0}}this._storedCursor&&d("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!b){this._trigger("beforeStop",a,this._uiHash());for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}return false}b||this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!b){for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){d.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},_uiHash:function(a){var b=a||this;return{helper:b.helper,placeholder:b.placeholder||d([]),position:b.position,originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}});d.extend(d.ui.sortable,{version:"1.8.14"})})(jQuery);;(function(c){c.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var a=this,b=a.options;a.running=0;a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");a.headers=a.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){b.disabled||c(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){b.disabled||c(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){b.disabled||c(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){b.disabled||c(this).removeClass("ui-state-focus")});a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(b.navigation){var d=a.element.find("a").filter(b.navigationFilter).eq(0);if(d.length){var h=d.closest(".ui-accordion-header");a.active=h.length?h:d.closest(".ui-accordion-content").prev()}}a.active=a._findActive(a.active||b.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");a.active.next().addClass("ui-accordion-content-active");a._createIcons();a.resize();a.element.attr("role","tablist");a.headers.attr("role","tab").bind("keydown.accordion",function(f){return a._keydown(f)}).next().attr("role","tabpanel");a.headers.not(a.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();a.active.length?a.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):a.headers.eq(0).attr("tabIndex",0);c.browser.safari||a.headers.find("a").attr("tabIndex",-1);b.event&&a.headers.bind(b.event.split(" ").join(".accordion ")+".accordion",function(f){a._clickHandler.call(a,f,this);f.preventDefault()})},_createIcons:function(){var a=this.options;if(a.icons){c("<span></span>").addClass("ui-icon "+a.icons.header).prependTo(this.headers);this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var a=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(a.autoHeight||a.fillHeight)b.css("height","");return c.Widget.prototype.destroy.call(this)},_setOption:function(a,b){c.Widget.prototype._setOption.apply(this,arguments);a=="active"&&this.activate(b);if(a=="icons"){this._destroyIcons();b&&this._createIcons()}if(a=="disabled")this.headers.add(this.headers.next())[b?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(a){if(!(this.options.disabled||a.altKey||a.ctrlKey)){var b=c.ui.keyCode,d=this.headers.length,h=this.headers.index(a.target),f=false;switch(a.keyCode){case b.RIGHT:case b.DOWN:f=this.headers[(h+1)%d];break;case b.LEFT:case b.UP:f=this.headers[(h-1+d)%d];break;case b.SPACE:case b.ENTER:this._clickHandler({target:a.target},a.target);a.preventDefault()}if(f){c(a.target).attr("tabIndex",-1);c(f).attr("tabIndex",0);f.focus();return false}return true}},resize:function(){var a=this.options,b;if(a.fillSpace){if(c.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}b=this.element.parent().height();c.browser.msie&&this.element.parent().css("overflow",d);this.headers.each(function(){b-=c(this).outerHeight(true)});this.headers.next().each(function(){c(this).height(Math.max(0,b-c(this).innerHeight()+c(this).height()))}).css("overflow","auto")}else if(a.autoHeight){b=0;this.headers.next().each(function(){b=Math.max(b,c(this).height("").height())}).height(b)}return this},activate:function(a){this.options.active=a;a=this._findActive(a)[0];this._clickHandler({target:a},a);return this},_findActive:function(a){return a?typeof a==="number"?this.headers.filter(":eq("+a+")"):this.headers.not(this.headers.not(a)):a===false?c([]):this.headers.filter(":eq(0)")},_clickHandler:function(a,b){var d=this.options;if(!d.disabled)if(a.target){a=c(a.currentTarget||b);b=a[0]===this.active[0];d.active=d.collapsible&&b?false:this.headers.index(a);if(!(this.running||!d.collapsible&&b)){var h=this.active;j=a.next();g=this.active.next();e={options:d,newHeader:b&&d.collapsible?c([]):a,oldHeader:this.active,newContent:b&&d.collapsible?c([]):j,oldContent:g};var f=this.headers.index(this.active[0])>this.headers.index(a[0]);this.active=b?c([]):a;this._toggle(j,g,e,b,f);h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);if(!b){a.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);a.next().addClass("ui-accordion-content-active")}}}else if(d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var g=this.active.next(),e={options:d,newHeader:c([]),oldHeader:d.active,newContent:c([]),oldContent:g},j=this.active=c([]);this._toggle(j,g,e)}},_toggle:function(a,b,d,h,f){var g=this,e=g.options;g.toShow=a;g.toHide=b;g.data=d;var j=function(){if(g)return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data);g.running=b.size()===0?a.size():b.size();if(e.animated){d={};d=e.collapsible&&h?{toShow:c([]),toHide:b,complete:j,down:f,autoHeight:e.autoHeight||e.fillSpace}:{toShow:a,toHide:b,complete:j,down:f,autoHeight:e.autoHeight||e.fillSpace};if(!e.proxied)e.proxied=e.animated;if(!e.proxiedDuration)e.proxiedDuration=e.duration;e.animated=c.isFunction(e.proxied)?e.proxied(d):e.proxied;e.duration=c.isFunction(e.proxiedDuration)?e.proxiedDuration(d):e.proxiedDuration;h=c.ui.accordion.animations;var i=e.duration,k=e.animated;if(k&&!h[k]&&!c.easing[k])k="slide";h[k]||(h[k]=function(l){this.slide(l,{easing:k,duration:i||700})});h[k](d)}else{if(e.collapsible&&h)a.toggle();else{b.hide();a.show()}j(true)}b.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();a.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");if(this.toHide.length)this.toHide.parent()[0].className=this.toHide.parent()[0].className;this._trigger("change",null,this.data)}}});c.extend(c.ui.accordion,{version:"1.8.14",animations:{slide:function(a,b){a=c.extend({easing:"swing",duration:300},a,b);if(a.toHide.size())if(a.toShow.size()){var d=a.toShow.css("overflow"),h=0,f={},g={},e;b=a.toShow;e=b[0].style.width;b.width(parseInt(b.parent().width(),10)-parseInt(b.css("paddingLeft"),10)-parseInt(b.css("paddingRight"),10)-(parseInt(b.css("borderLeftWidth"),10)||0)-(parseInt(b.css("borderRightWidth"),10)||0));c.each(["height","paddingTop","paddingBottom"],function(j,i){g[i]="hide";j=(""+c.css(a.toShow[0],i)).match(/^([\d+-.]+)(.*)$/);f[i]={value:j[1],unit:j[2]||"px"}});a.toShow.css({height:0,overflow:"hidden"}).show();a.toHide.filter(":hidden").each(a.complete).end().filter(":visible").animate(g,{step:function(j,i){if(i.prop=="height")h=i.end-i.start===0?0:(i.now-i.start)/(i.end-i.start);a.toShow[0].style[i.prop]=h*f[i.prop].value+f[i.prop].unit},duration:a.duration,easing:a.easing,complete:function(){a.autoHeight||a.toShow.css("height","");a.toShow.css({width:e,overflow:d});a.complete()}})}else a.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},a);else a.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},a)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1E3:200})}}})})(jQuery);;(function(d){var e=0;d.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var a=this,b=this.element[0].ownerDocument,g;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!(a.options.disabled||a.element.attr("readonly"))){g=false;var f=d.ui.keyCode;switch(c.keyCode){case f.PAGE_UP:a._move("previousPage",c);break;case f.PAGE_DOWN:a._move("nextPage",c);break;case f.UP:a._move("previous",c);c.preventDefault();break;case f.DOWN:a._move("next",c);c.preventDefault();break;case f.ENTER:case f.NUMPAD_ENTER:if(a.menu.active){g=true;c.preventDefault()}case f.TAB:if(!a.menu.active)return;a.menu.select(c);break;case f.ESCAPE:a.element.val(a.term);a.close(c);break;default:clearTimeout(a.searching);a.searching=setTimeout(function(){if(a.term!=a.element.val()){a.selectedItem=null;a.search(null,c)}},a.options.delay);break}}}).bind("keypress.autocomplete",function(c){if(g){g=false;c.preventDefault()}}).bind("focus.autocomplete",function(){if(!a.options.disabled){a.selectedItem=null;a.previous=a.element.val()}}).bind("blur.autocomplete",function(c){if(!a.options.disabled){clearTimeout(a.searching);a.closing=setTimeout(function(){a.close(c);a._change(c)},150)}});this._initSource();this.response=function(){return a._response.apply(a,arguments)};this.menu=d("<ul></ul>").addClass("ui-autocomplete").appendTo(d(this.options.appendTo||"body",b)[0]).mousedown(function(c){var f=a.menu.element[0];d(c.target).closest(".ui-menu-item").length||setTimeout(function(){d(document).one("mousedown",function(h){h.target!==a.element[0]&&h.target!==f&&!d.ui.contains(f,h.target)&&a.close()})},1);setTimeout(function(){clearTimeout(a.closing)},13)}).menu({focus:function(c,f){f=f.item.data("item.autocomplete");false!==a._trigger("focus",c,{item:f})&&/^key/.test(c.originalEvent.type)&&a.element.val(f.value)},selected:function(c,f){var h=f.item.data("item.autocomplete"),i=a.previous;if(a.element[0]!==b.activeElement){a.element.focus();a.previous=i;setTimeout(function(){a.previous=i;a.selectedItem=h},1)}false!==a._trigger("select",c,{item:h})&&a.element.val(h.value);a.term=a.element.val();a.close(c);a.selectedItem=h},blur:function(){a.menu.element.is(":visible")&&a.element.val()!==a.term&&a.element.val(a.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");d.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");this.menu.element.remove();d.Widget.prototype.destroy.call(this)},_setOption:function(a,b){d.Widget.prototype._setOption.apply(this,arguments);a==="source"&&this._initSource();if(a==="appendTo")this.menu.element.appendTo(d(b||"body",this.element[0].ownerDocument)[0]);a==="disabled"&&b&&this.xhr&&this.xhr.abort()},_initSource:function(){var a=this,b,g;if(d.isArray(this.options.source)){b=this.options.source;this.source=function(c,f){f(d.ui.autocomplete.filter(b,c.term))}}else if(typeof this.options.source==="string"){g=this.options.source;this.source=function(c,f){a.xhr&&a.xhr.abort();a.xhr=d.ajax({url:g,data:c,dataType:"json",autocompleteRequest:++e,success:function(h){this.autocompleteRequest===e&&f(h)},error:function(){this.autocompleteRequest===e&&f([])}})}}else this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val();this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==false)return this._search(a)},_search:function(a){this.pending++;this.element.addClass("ui-autocomplete-loading");this.source({term:a},this.response)},_response:function(a){if(!this.options.disabled&&a&&a.length){a=this._normalize(a);this._suggest(a);this._trigger("open")}else this.close();this.pending--;this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.deactivate();this._trigger("close",a)}},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(a){if(a.length&&a[0].label&&a[0].value)return a;return d.map(a,function(b){if(typeof b==="string")return{label:b,value:b};return d.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(a){var b=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(b,a);this.menu.deactivate();this.menu.refresh();b.show();this._resizeMenu();b.position(d.extend({of:this.element},this.options.position));this.options.autoFocus&&this.menu.next(new d.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth(),this.element.outerWidth()))},_renderMenu:function(a,b){var g=this;d.each(b,function(c,f){g._renderItem(a,f)})},_renderItem:function(a,b){return d("<li></li>").data("item.autocomplete",b).append(d("<a></a>").text(b.label)).appendTo(a)},_move:function(a,b){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term);this.menu.deactivate()}else this.menu[a](b);else this.search(null,b)},widget:function(){return this.menu.element}});d.extend(d.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(a,b){var g=new RegExp(d.ui.autocomplete.escapeRegex(b),"i");return d.grep(a,function(c){return g.test(c.label||c.value||c)})}})})(jQuery);(function(d){d.widget("ui.menu",{_create:function(){var e=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(a){if(d(a.target).closest(".ui-menu-item a").length){a.preventDefault();e.select(a)}});this.refresh()},refresh:function(){var e=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(a){e.activate(a,d(this).parent())}).mouseleave(function(){e.deactivate()})},activate:function(e,a){this.deactivate();if(this.hasScroll()){var b=a.offset().top-this.element.offset().top,g=this.element.scrollTop(),c=this.element.height();if(b<0)this.element.scrollTop(g+b);else b>=c&&this.element.scrollTop(g+b-c+a.height())}this.active=a.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",e,{item:a})},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");this._trigger("blur");this.active=null}},next:function(e){this.move("next",".ui-menu-item:first",e)},previous:function(e){this.move("prev",".ui-menu-item:last",e)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(e,a,b){if(this.active){e=this.active[e+"All"](".ui-menu-item").eq(0);e.length?this.activate(b,e):this.activate(b,this.element.children(a))}else this.activate(b,this.element.children(a))},nextPage:function(e){if(this.hasScroll())if(!this.active||this.last())this.activate(e,this.element.children(".ui-menu-item:first"));else{var a=this.active.offset().top,b=this.element.height(),g=this.element.children(".ui-menu-item").filter(function(){var c=d(this).offset().top-a-b+d(this).height();return c<10&&c>-10});g.length||(g=this.element.children(".ui-menu-item:last"));this.activate(e,g)}else this.activate(e,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(e){if(this.hasScroll())if(!this.active||this.first())this.activate(e,this.element.children(".ui-menu-item:last"));else{var a=this.active.offset().top,b=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var g=d(this).offset().top-a+b-d(this).height();return g<10&&g>-10});result.length||(result=this.element.children(".ui-menu-item:first"));this.activate(e,result)}else this.activate(e,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[d.fn.prop?"prop":"attr"]("scrollHeight")},select:function(e){this._trigger("selected",e,{item:this.active})}})})(jQuery);;(function(b){var h,i,j,g,l=function(){var a=b(this).find(":ui-button");setTimeout(function(){a.button("refresh")},1)},k=function(a){var c=a.name,e=a.form,f=b([]);if(c)f=e?b(e).find("[name='"+c+"']"):b("[name='"+c+"']",a.ownerDocument).filter(function(){return!this.form});return f};b.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",l);if(typeof this.options.disabled!=="boolean")this.options.disabled=this.element.attr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var a=this,c=this.options,e=this.type==="checkbox"||this.type==="radio",f="ui-state-hover"+(!e?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!c.disabled){b(this).addClass("ui-state-hover");this===h&&b(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){c.disabled||b(this).removeClass(f)}).bind("click.button",function(d){if(c.disabled){d.preventDefault();d.stopImmediatePropagation()}});this.element.bind("focus.button",function(){a.buttonElement.addClass("ui-state-focus")}).bind("blur.button",function(){a.buttonElement.removeClass("ui-state-focus")});if(e){this.element.bind("change.button",function(){g||a.refresh()});this.buttonElement.bind("mousedown.button",function(d){if(!c.disabled){g=false;i=d.pageX;j=d.pageY}}).bind("mouseup.button",function(d){if(!c.disabled)if(i!==d.pageX||j!==d.pageY)g=true})}if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled||g)return false;b(this).toggleClass("ui-state-active");a.buttonElement.attr("aria-pressed",a.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(c.disabled||g)return false;b(this).addClass("ui-state-active");a.buttonElement.attr("aria-pressed",true);var d=a.element[0];k(d).not(d).map(function(){return b(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;b(this).addClass("ui-state-active");h=this;b(document).one("mouseup",function(){h=null})}).bind("mouseup.button",function(){if(c.disabled)return false;b(this).removeClass("ui-state-active")}).bind("keydown.button",function(d){if(c.disabled)return false;if(d.keyCode==b.ui.keyCode.SPACE||d.keyCode==b.ui.keyCode.ENTER)b(this).addClass("ui-state-active")}).bind("keyup.button",function(){b(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(d){d.keyCode===b.ui.keyCode.SPACE&&b(this).click()})}this._setOption("disabled",c.disabled);this._resetButton()},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),c="label[for="+this.element.attr("id")+"]";this.buttonElement=a.find(c);if(!this.buttonElement.length){a=a.length?a.siblings():this.element.siblings();this.buttonElement=a.filter(c);if(!this.buttonElement.length)this.buttonElement=a.find(c)}this.element.addClass("ui-helper-hidden-accessible");(a=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",a)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());this.hasTitle||this.buttonElement.removeAttr("title");b.Widget.prototype.destroy.call(this)},_setOption:function(a,c){b.Widget.prototype._setOption.apply(this,arguments);if(a==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");else this._resetButton()},refresh:function(){var a=this.element.is(":disabled");a!==this.options.disabled&&this._setOption("disabled",a);if(this.type==="radio")k(this.element[0]).each(function(){b(this).is(":checked")?b(this).button("widget").addClass("ui-state-active").attr("aria-pressed",true):b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var a=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),c=b("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(a.empty()).text(),e=this.options.icons,f=e.primary&&e.secondary,d=[];if(e.primary||e.secondary){if(this.options.text)d.push("ui-button-text-icon"+(f?"s":e.primary?"-primary":"-secondary"));e.primary&&a.prepend("<span class='ui-button-icon-primary ui-icon "+e.primary+"'></span>");e.secondary&&a.append("<span class='ui-button-icon-secondary ui-icon "+e.secondary+"'></span>");if(!this.options.text){d.push(f?"ui-button-icons-only":"ui-button-icon-only");this.hasTitle||a.attr("title",c)}}else d.push("ui-button-text-only");a.addClass(d.join(" "))}}});b.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(a,c){a==="disabled"&&this.buttons.button("option",a,c);b.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var a=this.element.css("direction")==="ltr";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return b(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a?"ui-corner-left":"ui-corner-right").end().filter(":last").addClass(a?"ui-corner-right":"ui-corner-left").end().end()},destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return b(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");b.Widget.prototype.destroy.call(this)}})})(jQuery);;(function(c,l){var m={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},n={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},o=c.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var a=this,b=a.options,d=b.title||" ",e=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(i){a.moveToTop(false,i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var f=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);return false}).appendTo(f);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(f);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=b.beforeclose;f.find("*").add(f).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d,e;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==b.uiDialog[0]){e=c(this).css("z-index");isNaN(e)||(d=Math.max(d,e))}});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,e=d.options;if(e.modal&&!a||!e.stack&&!e.modal)return d._trigger("focus",b);if(e.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=e.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};c.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;a._size();a._position(b.position);d.show(b.show);a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(e){if(e.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),f=g.filter(":first");g=g.filter(":last");if(e.target===g[0]&&!e.shiftKey){f.focus(1);return false}else if(e.target===f[0]&&e.shiftKey){g.focus(1);return false}}});c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._isOpen=true;a._trigger("open");return a}},_createButtons:function(a){var b=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,function(){return!(d=true)});if(d){c.each(a,function(f,h){h=c.isFunction(h)?{click:h,text:f}:h;var i=c('<button type="button"></button>').click(function(){h.click.apply(b.element[0],arguments)}).appendTo(g);c.each(h,function(j,k){if(j!=="click")j in o?i[j](k):i.attr(j,k)});c.fn.button&&i.button()});e.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(f){return{position:f.position,offset:f.offset}}var b=this,d=b.options,e=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(f,h){g=d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height()).addClass("ui-dialog-dragging");b._trigger("dragStart",f,a(h))},drag:function(f,h){b._trigger("drag",f,a(h))},stop:function(f,h){d.position=[h.position.left-e.scrollLeft(),h.position.top-e.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);b._trigger("dragStop",f,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(f){return{originalPosition:f.originalPosition,originalSize:f.originalSize,position:f.position,size:f.size}}a=a===l?this.options.resizable:a;var d=this,e=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:a,start:function(f,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",f,b(h))},resize:function(f,h){d._trigger("resize",f,b(h))},stop:function(f,h){c(this).removeClass("ui-dialog-resizing");e.height=c(this).height();e.width=c(this).width();d._trigger("resizeStop",f,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(a){var b=[],d=[0,0],e;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):[a[0],a[1]];if(b.length===1)b[1]=b[0];c.each(["left","top"],function(g,f){if(+b[g]===b[g]){d[g]=b[g];b[g]=f}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(c.extend({of:window},a));e||this.uiDialog.hide()},_setOptions:function(a){var b=this,d={},e=false;c.each(a,function(g,f){b._setOption(g,f);if(g in m)e=true;if(g in n)d[g]=f});e&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",d)},_setOption:function(a,b){var d=this,e=d.uiDialog;switch(a){case"beforeclose":a="beforeClose";break;case"buttons":d._createButtons(b);break;case"closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case"dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case"disabled":b?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");break;case"draggable":var g=e.is(":data(draggable)");g&&!b&&e.draggable("destroy");!g&&b&&d._makeDraggable();break;case"position":d._position(b);break;case"resizable":(g=e.is(":data(resizable)"))&&!b&&e.resizable("destroy");g&&typeof b==="string"&&e.resizable("option","handles",b);!g&&b!==false&&d._makeResizable(b);break;case"title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||" "));break}c.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var a=this.options,b,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();d=Math.max(0,a.minHeight-b);if(a.height==="auto")if(c.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();a=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(a,d))}else this.element.height(Math.max(a.height-b,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.14",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(a){if(this.instances.length===0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){if(c(d.target).zIndex()<c.ui.dialog.overlay.maxZ)return false})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){var b=c.inArray(a,this.instances);b!=-1&&this.oldInstances.push(this.instances.splice(b,1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var d=0;c.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var b=this,a=this.options,c=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f=a.values&&a.values.length||1,e=[];this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(a.disabled?" ui-slider-disabled ui-disabled":""));this.range=d([]);if(a.range){if(a.range===true){if(!a.values)a.values=[this._valueMin(),this._valueMin()];if(a.values.length&&a.values.length!==2)a.values=[a.values[0],a.values[0]]}this.range=d("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(a.range==="min"||a.range==="max"?" ui-slider-range-"+a.range:""))}for(var j=c.length;j<f;j+=1)e.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");this.handles=c.add(d(e.join("")).appendTo(b.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(g){g.preventDefault()}).hover(function(){a.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(a.disabled)d(this).blur();else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(g){d(this).data("index.ui-slider-handle",g)});this.handles.keydown(function(g){var k=true,l=d(this).data("index.ui-slider-handle"),i,h,m;if(!b.options.disabled){switch(g.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:k=false;if(!b._keySliding){b._keySliding=true;d(this).addClass("ui-state-active");i=b._start(g,l);if(i===false)return}break}m=b.options.step;i=b.options.values&&b.options.values.length?(h=b.values(l)):(h=b.value());switch(g.keyCode){case d.ui.keyCode.HOME:h=b._valueMin();break;case d.ui.keyCode.END:h=b._valueMax();break;case d.ui.keyCode.PAGE_UP:h=b._trimAlignValue(i+(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(i-(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(i===b._valueMax())return;h=b._trimAlignValue(i+m);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(i===b._valueMin())return;h=b._trimAlignValue(i-m);break}b._slide(g,l,h);return k}}).keyup(function(g){var k=d(this).data("index.ui-slider-handle");if(b._keySliding){b._keySliding=false;b._stop(g,k);b._change(g,k);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();return this},_mouseCapture:function(b){var a=this.options,c,f,e,j,g;if(a.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:b.pageX,y:b.pageY});f=this._valueMax()-this._valueMin()+1;j=this;this.handles.each(function(k){var l=Math.abs(c-j.values(k));if(f>l){f=l;e=d(this);g=k}});if(a.range===true&&this.values(1)===a.min){g+=1;e=d(this.handles[g])}if(this._start(b,g)===false)return false;this._mouseSliding=true;j._handleIndex=g;e.addClass("ui-state-active").focus();a=e.offset();this._clickOffset=!d(b.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:b.pageX-a.left-e.width()/2,top:b.pageY-a.top-e.height()/2-(parseInt(e.css("borderTopWidth"),10)||0)-(parseInt(e.css("borderBottomWidth"),10)||0)+(parseInt(e.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(b,g,c);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(b){var a=this._normValueFromMouse({x:b.pageX,y:b.pageY});this._slide(b,this._handleIndex,a);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(b){var a;if(this.orientation==="horizontal"){a=this.elementSize.width;b=b.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{a=this.elementSize.height;b=b.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}a=b/a;if(a>1)a=1;if(a<0)a=0;if(this.orientation==="vertical")a=1-a;b=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+a*b)},_start:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}return this._trigger("start",b,c)},_slide:function(b,a,c){var f;if(this.options.values&&this.options.values.length){f=this.values(a?0:1);if(this.options.values.length===2&&this.options.range===true&&(a===0&&c>f||a===1&&c<f))c=f;if(c!==this.values(a)){f=this.values();f[a]=c;b=this._trigger("slide",b,{handle:this.handles[a],value:c,values:f});this.values(a?0:1);b!==false&&this.values(a,c,true)}}else if(c!==this.value()){b=this._trigger("slide",b,{handle:this.handles[a],value:c});b!==false&&this.value(c)}},_stop:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("stop",b,c)},_change:function(b,a){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("change",b,c)}},value:function(b){if(arguments.length){this.options.value=this._trimAlignValue(b);this._refreshValue();this._change(null,0)}else return this._value()},values:function(b,a){var c,f,e;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(a);this._refreshValue();this._change(null,b)}else if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;f=arguments[0];for(e=0;e<c.length;e+=1){c[e]=this._trimAlignValue(f[e]);this._change(null,e)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(b):this.value();else return this._values()},_setOption:function(b,a){var c,f=0;if(d.isArray(this.options.values))f=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":if(a){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case"value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case"values":this._animateOff=true;this._refreshValue();for(c=0;c<f;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var b=this.options.value;return b=this._trimAlignValue(b)},_values:function(b){var a,c;if(arguments.length){a=this.options.values[b];return a=this._trimAlignValue(a)}else{a=this.options.values.slice();for(c=0;c<a.length;c+=1)a[c]=this._trimAlignValue(a[c]);return a}},_trimAlignValue:function(b){if(b<=this._valueMin())return this._valueMin();if(b>=this._valueMax())return this._valueMax();var a=this.options.step>0?this.options.step:1,c=(b-this._valueMin())%a;alignValue=b-c;if(Math.abs(c)*2>=a)alignValue+=c>0?a:-a;return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,a=this.options,c=this,f=!this._animateOff?a.animate:false,e,j={},g,k,l,i;if(this.options.values&&this.options.values.length)this.handles.each(function(h){e=(c.values(h)-c._valueMin())/(c._valueMax()-c._valueMin())*100;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";d(this).stop(1,1)[f?"animate":"css"](j,a.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(h===0)c.range.stop(1,1)[f?"animate":"css"]({left:e+"%"},a.animate);if(h===1)c.range[f?"animate":"css"]({width:e-g+"%"},{queue:false,duration:a.animate})}else{if(h===0)c.range.stop(1,1)[f?"animate":"css"]({bottom:e+"%"},a.animate);if(h===1)c.range[f?"animate":"css"]({height:e-g+"%"},{queue:false,duration:a.animate})}g=e});else{k=this.value();l=this._valueMin();i=this._valueMax();e=i!==l?(k-l)/(i-l)*100:0;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[f?"animate":"css"](j,a.animate);if(b==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[f?"animate":"css"]({width:e+"%"},a.animate);if(b==="max"&&this.orientation==="horizontal")this.range[f?"animate":"css"]({width:100-e+"%"},{queue:false,duration:a.animate});if(b==="min"&&this.orientation==="vertical")this.range.stop(1,1)[f?"animate":"css"]({height:e+"%"},a.animate);if(b==="max"&&this.orientation==="vertical")this.range[f?"animate":"css"]({height:100-e+"%"},{queue:false,duration:a.animate})}}});d.extend(d.ui.slider,{version:"1.8.14"})})(jQuery);;(function(d,p){function u(){return++v}function w(){return++x}var v=0,x=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading…</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(b,e){if(b=="selected")this.options.collapsible&&e==this.options.selected||this.select(e);else{this.options[b]=e;this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+u()},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+w());return d.cookie.apply(null,[b].concat(d.makeArray(arguments)))},_ui:function(b,e){return{tab:b,panel:e,index:this.anchors.index(b)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=d(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(b){function e(g,f){g.css("display","");!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}var a=this,c=this.options,h=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=d(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);this.anchors.each(function(g,f){var i=d(f).attr("href"),l=i.split("#")[0],q;if(l&&(l===location.toString().split("#")[0]||(q=d("base")[0])&&l===q.href)){i=f.hash;f.href=i}if(h.test(i))a.panels=a.panels.add(a.element.find(a._sanitizeSelector(i)));else if(i&&i!=="#"){d.data(f,"href.tabs",i);d.data(f,"load.tabs",i.replace(/#.*$/,""));i=a._tabId(f);f.href="#"+i;f=a.element.find("#"+i);if(!f.length){f=d(c.panelTemplate).attr("id",i).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[g-1]||a.list);f.data("destroy.tabs",true)}a.panels=a.panels.add(f)}else c.disabled.push(g)});if(b){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(c.selected===p){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){c.selected=g;return false}});if(typeof c.selected!=="number"&&c.cookie)c.selected=parseInt(a._cookie(),10);if(typeof c.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));c.selected=c.selected||(this.lis.length?0:-1)}else if(c.selected===null)c.selected=-1;c.selected=c.selected>=0&&this.anchors[c.selected]||c.selected<0?c.selected:0;c.disabled=d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return a.lis.index(g)}))).sort();d.inArray(c.selected,c.disabled)!=-1&&c.disabled.splice(d.inArray(c.selected,c.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(c.selected>=0&&this.anchors.length){a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash)).removeClass("ui-tabs-hide");this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");a.element.queue("tabs",function(){a._trigger("show",null,a._ui(a.anchors[c.selected],a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash))[0]))});this.load(c.selected)}d(window).bind("unload",function(){a.lis.add(a.anchors).unbind(".tabs");a.lis=a.anchors=a.panels=null})}else c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[c.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");c.cookie&&this._cookie(c.selected,c.cookie);b=0;for(var j;j=this.lis[b];b++)d(j)[d.inArray(b,c.disabled)!=-1&&!d(j).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");c.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(c.event!=="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+g)};this.lis.bind("mouseover.tabs",function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(c.fx)if(d.isArray(c.fx)){m=c.fx[0];o=c.fx[1]}else m=o=c.fx;var r=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",function(){e(f,o);a._trigger("show",null,a._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");a._trigger("show",null,a._ui(g,f[0]))},s=m?function(g,f){f.animate(m,m.duration||"normal",function(){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);a.element.dequeue("tabs")})}:function(g,f){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");a.element.dequeue("tabs")};this.anchors.bind(c.event+".tabs",function(){var g=this,f=d(g).closest("li"),i=a.panels.filter(":not(.ui-tabs-hide)"),l=a.element.find(a._sanitizeSelector(g.hash));if(f.hasClass("ui-tabs-selected")&&!c.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||a.panels.filter(":animated").length||a._trigger("select",null,a._ui(this,l[0]))===false){this.blur();return false}c.selected=a.anchors.index(this);a.abort();if(c.collapsible)if(f.hasClass("ui-tabs-selected")){c.selected=-1;c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){s(g,i)}).dequeue("tabs");this.blur();return false}else if(!i.length){c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this));this.blur();return false}c.cookie&&a._cookie(c.selected,c.cookie);if(l.length){i.length&&a.element.queue("tabs",function(){s(g,i)});a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(b){if(typeof b=="string")b=this.anchors.index(this.anchors.filter("[href$="+b+"]"));return b},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=d.data(this,"href.tabs");if(e)this.href=e;var a=d(this).unbind(".tabs");d.each(["href","load","cache"],function(c,h){a.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});b.cookie&&this._cookie(null,b.cookie);return this},add:function(b,e,a){if(a===p)a=this.anchors.length;var c=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,b).replace(/#\{label\}/g,e));b=!b.indexOf("#")?b.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var j=c.element.find("#"+b);j.length||(j=d(h.panelTemplate).attr("id",b).data("destroy.tabs",true));j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(a>=this.lis.length){e.appendTo(this.list);j.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[a]);j.insertBefore(this.panels[a])}h.disabled=d.map(h.disabled,function(k){return k>=a?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");j.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){c._trigger("show",null,c._ui(c.anchors[0],c.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[a],this.panels[a]));return this},remove:function(b){b=this._getIndex(b);var e=this.options,a=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(a.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(b+(b+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=b}),function(h){return h>=b?--h:h});this._tabify();this._trigger("remove",null,this._ui(a.find("a")[0],c[0]));return this},enable:function(b){b=this._getIndex(b);var e=this.options;if(d.inArray(b,e.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(a){return a!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(b){b=this._getIndex(b);var e=this.options;if(b!=e.selected){this.lis.eq(b).addClass("ui-state-disabled");e.disabled.push(b);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[b],this.panels[b]))}return this},select:function(b){b=this._getIndex(b);if(b==-1)if(this.options.collapsible&&this.options.selected!=-1)b=this.options.selected;else return this;this.anchors.eq(b).trigger(this.options.event+".tabs");return this},load:function(b){b=this._getIndex(b);var e=this,a=this.options,c=this.anchors.eq(b)[0],h=d.data(c,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(c,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(a.spinner){var j=d("span",c);j.data("label.tabs",j.html()).html(a.spinner)}this.xhr=d.ajax(d.extend({},a.ajaxOptions,{url:h,success:function(k,n){e.element.find(e._sanitizeSelector(c.hash)).html(k);e._cleanup();a.cache&&d.data(c,"cache.tabs",true);e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.error(k,n,b,c)}catch(m){}}}));e.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(b,e){this.anchors.eq(b).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.14"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(b,e){var a=this,c=this.options,h=a._rotate||(a._rotate=function(j){clearTimeout(a.rotation);a.rotation=setTimeout(function(){var k=c.selected;a.select(++k<a.anchors.length?k:0)},b);j&&j.stopPropagation()});e=a._unrotate||(a._unrotate=!e?function(j){j.clientX&&a.rotate(null)}:function(){t=c.selected;h()});if(b){this.element.bind("tabsshow",h);this.anchors.bind(c.event+".tabs",e);h()}else{clearTimeout(a.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(c.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);;(function(d,C){function M(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=N(d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function N(a){return a.bind("mouseout",function(b){b=d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");b.length&&b.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(b){b=d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");if(!(d.datepicker._isDisabledDatepicker(J.inline?a.parent()[0]:J.input[0])||!b.length)){b.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");b.addClass("ui-state-hover");b.hasClass("ui-datepicker-prev")&&b.addClass("ui-datepicker-prev-hover");b.hasClass("ui-datepicker-next")&&b.addClass("ui-datepicker-next-hover")}})}function H(a,b){d.extend(a,b);for(var c in b)if(b[c]==null||b[c]==C)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.14"}});var A=(new Date).getTime(),J;d.extend(M.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){H(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase();f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:N(d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),true);this._updateDatepicker(b);this._updateAlternate(b);b.dpDiv.show()}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}H(a.settings,e||{});b=b&&b.constructor==Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span"){b=b.children("."+this._inlineClass);b.children().removeClass("ui-state-disabled");b.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span"){b=b.children("."+this._inlineClass);b.children().addClass("ui-state-disabled");b.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&this._hideDatepicker();var h=this._getDateDatepicker(a,true),i=this._getMinMaxDate(e,"min"),g=this._getMinMaxDate(e,"max");H(e.settings,f);if(i!==null&&f.dateFormat!==C&&f.minDate===C)e.settings.minDate=this._formatDate(e,i);if(g!==null&&f.dateFormat!==C&&f.maxDate===C)e.settings.maxDate=this._formatDate(e,g);this._attachments(d(a),e);this._autoSize(e);this._setDate(e,h);this._updateAlternate(e);this._updateDatepicker(e)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);c[0]?d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);c=a.ctrlKey||a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==C?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);if(a.input.val()!=a.lastVal)try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);d.datepicker._updateAlternate(a);d.datepicker._updateDatepicker(a)}}catch(b){d.datepicker.log(b)}return true},_showDatepicker:function(a){a=a.target||a;if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);if(d.datepicker._curInst&&d.datepicker._curInst!=b){d.datepicker._datepickerShowing&&d.datepicker._triggerOnClose(d.datepicker._curInst);d.datepicker._curInst.dpDiv.stop(true,true)}var c=d.datepicker._get(b,"beforeShow");H(b.settings,c?c.apply(a,[a,b]):{});b.lastVal=null;d.datepicker._lastInput=a;d.datepicker._setDateFromField(b);if(d.datepicker._inDialog)a.value="";if(!d.datepicker._pos){d.datepicker._pos=d.datepicker._findPos(a);d.datepicker._pos[1]+=a.offsetHeight}var e=false;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e});if(e&&d.browser.opera){d.datepicker._pos[0]-=document.documentElement.scrollLeft;d.datepicker._pos[1]-=document.documentElement.scrollTop}c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]};d.datepicker._pos=null;b.dpDiv.empty();b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});d.datepicker._updateDatepicker(b);c=d.datepicker._checkOffset(b,c,e);b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");var f=d.datepicker._get(b,"duration"),h=function(){var i=b.dpDiv.find("iframe.ui-datepicker-cover");if(i.length){var g=d.datepicker._getBorders(b.dpDiv);i.css({left:-g[0],top:-g[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex(d(a).zIndex()+1);d.datepicker._datepickerShowing=true;d.effects&&d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,h):b.dpDiv[c||"show"](c?f:null,h);if(!c||!f)h();b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();d.datepicker._curInst=b}}},_updateDatepicker:function(a){this.maxRows=4;var b=d.datepicker._getBorders(a.dpDiv);J=a;a.dpDiv.empty().append(this._generateHTML(a));var c=a.dpDiv.find("iframe.ui-datepicker-cover");c.length&&c.css({left:-b[0],top:-b[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()});a.dpDiv.find("."+this._dayOverClass+" a").mouseover();b=this._getNumberOfMonths(a);c=b[1];a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");c>1&&a.dpDiv.addClass("ui-datepicker-multi-"+c).css("width",17*c+"em");a.dpDiv[(b[0]!=1||b[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var e=a.yearshtml;setTimeout(function(){e===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);e=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||c};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-h:0;b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-g):0);b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+i):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),"isRTL");a&&(a.type=="hidden"||a.nodeType!=1||d.expr.filters.hidden(a));)a=a[b?"previousSibling":"nextSibling"];a=d(a).offset();return[a.left,a.top]},_triggerOnClose:function(a){var b=this._get(a,"onClose");if(b)b.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a])},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);this._curInst=null};d.effects&&d.effects[a]?b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e);a||e();d.datepicker._triggerOnClose(b);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(d.blockUI){d.unblockUI();d("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(d.datepicker._curInst){a=d(a.target);a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c);this._updateDatepicker(e)}},_gotoToday:function(a){a=d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;b.drawMonth=b.selectedMonth=b.currentMonth;b.drawYear=b.selectedYear=b.currentYear}else{var c=new Date;b.selectedDay=c.getDate();b.drawMonth=b.selectedMonth=c.getMonth();b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b);this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e._selectingMonthYear=false;e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(a)},_clickMonthYear:function(a){var b=this._getInst(d(a)[0]);b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()},0);b._selectingMonthYear=!b._selectingMonthYear},_selectDay:function(a,b,c,e){var f=d(a);if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=d("a",e).html();f.selectedMonth=f.currentMonth=b;f.selectedYear=f.currentYear=c;this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){a=d(a);this._getInst(a[0]);this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]);b=b!=null?b:this._formatDate(a);a.input&&a.input.val(b);this._updateAlternate(a);var c=this._get(a,"onSelect");if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");if(a.inline)this._updateDatepicker(a);else{this._hideDatepicker();this._lastInput=a.input[0];typeof a.input[0]!="object"&&a.input.focus();this._lastInput=null}},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=a.getTime();a.setMonth(0);a.setDate(1);return Math.floor(Math.round((b-a)/864E5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;e=typeof e!="string"?e:(new Date).getFullYear()%100+parseInt(e,10);for(var f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,j=c=-1,l=-1,u=-1,k=false,o=function(p){(p=B+1<a.length&&a.charAt(B+1)==p)&&B++;return p},m=function(p){var D=o(p);p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"&&D?4:p=="o"?3:2)+"}");p=b.substring(q).match(p);if(!p)throw"Missing number at position "+q;q+=p[0].length;return parseInt(p[0],10)},n=function(p,D,K){p=d.map(o(p)?K:D,function(w,x){return[[x,w]]}).sort(function(w,x){return-(w[1].length-x[1].length)});var E=-1;d.each(p,function(w,x){w=x[1];if(b.substr(q,w.length).toLowerCase()==w.toLowerCase()){E=x[0];q+=w.length;return false}});if(E!=-1)return E+1;else throw"Unknown name at position "+q;},s=function(){if(b.charAt(q)!=a.charAt(B))throw"Unexpected literal at position "+q;q++},q=0,B=0;B<a.length;B++)if(k)if(a.charAt(B)=="'"&&!o("'"))k=false;else s();else switch(a.charAt(B)){case"d":l=m("d");break;case"D":n("D",f,h);break;case"o":u=m("o");break;case"m":j=m("m");break;case"M":j=n("M",i,g);break;case"y":c=m("y");break;case"@":var v=new Date(m("@"));c=v.getFullYear();j=v.getMonth()+1;l=v.getDate();break;case"!":v=new Date((m("!")-this._ticksTo1970)/1E4);c=v.getFullYear();j=v.getMonth()+1;l=v.getDate();break;case"'":if(o("'"))s();else k=true;break;default:s()}if(q<b.length)throw"Extra/unparsed characters found in date: "+b.substring(q);if(c==-1)c=(new Date).getFullYear();else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);if(u>-1){j=1;l=u;do{e=this._getDaysInMonth(c,j-1);if(l<=e)break;j++;l-=e}while(1)}v=this._daylightSavingAdjust(new Date(c,j-1,l));if(v.getFullYear()!=c||v.getMonth()+1!=j||v.getDate()!=l)throw"Invalid date";return v},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(a,b,c){if(!b)return"";var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var i=function(o){(o=k+1<a.length&&a.charAt(k+1)==o)&&k++;return o},g=function(o,m,n){m=""+m;if(i(o))for(;m.length<n;)m="0"+m;return m},j=function(o,m,n,s){return i(o)?s[m]:n[m]},l="",u=false;if(b)for(var k=0;k<a.length;k++)if(u)if(a.charAt(k)=="'"&&!i("'"))u=false;else l+=a.charAt(k);else switch(a.charAt(k)){case"d":l+=g("d",b.getDate(),2);break;case"D":l+=j("D",b.getDay(),e,f);break;case"o":l+=g("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5),3);break;case"m":l+=g("m",b.getMonth()+1,2);break;case"M":l+=j("M",b.getMonth(),h,c);break;case"y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":l+=b.getTime();break;case"!":l+=b.getTime()*1E4+this._ticksTo1970;break;case"'":if(i("'"))l+="'";else u=true;break;default:l+=a.charAt(k)}return l},_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;return h},f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){case"d":case"m":case"y":case"@":b+="0123456789";break;case"D":case"M":return null;case"'":if(e("'"))b+="'";else c=true;break;default:b+=a.charAt(f)}return b},_get:function(a,b){return a.settings[b]!==C?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;f=h=this._getDefaultDate(a);var i=this._getFormatConfig(a);try{f=this.parseDate(c,e,i)||h}catch(g){this.log(g);e=b?"":e}a.selectedDay=f.getDate();a.drawMonth=a.selectedMonth=f.getMonth();a.drawYear=a.selectedYear=f.getFullYear();a.currentDay=e?f.getDate():0;a.currentMonth=e?f.getMonth():0;a.currentYear=e?f.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(h){var i=new Date;i.setDate(i.getDate()+h);return i},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))}catch(i){}var g=(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,j=g.getFullYear(),l=g.getMonth();g=g.getDate();for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,k=u.exec(h);k;){switch(k[2]||"d"){case"d":case"D":g+=parseInt(k[1],10);break;case"w":case"W":g+=parseInt(k[1],10)*7;break;case"m":case"M":l+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break;case"y":case"Y":j+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break}k=u.exec(h)}return new Date(j,l,g)};if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b){b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0)}return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(e?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),k=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");g=a.drawMonth-g;var m=a.drawYear;if(g<0){g+=12;m--}if(o){var n=this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(n=k&&n<k?k:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){g--;if(g<0){g=11;m--}}}a.drawMonth=g;a.drawYear=m;n=this._get(a,"prevText");n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-j,1)),this._getFormatConfig(a));n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+A+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";var s=this._get(a,"nextText");s=!h?s:this.formatDate(s,this._daylightSavingAdjust(new Date(m,g+j,1)),this._getFormatConfig(a));f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+A+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>";j=this._get(a,"currentText");s=this._get(a,"gotoCurrent")&&a.currentDay?u:b;j=!h?j:this.formatDate(j,s,this._getFormatConfig(a));h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+A+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>":"";e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,s)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+A+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":h)+"</div>":"";h=parseInt(this._get(a,"firstDay"),10);h=isNaN(h)?0:h;j=this._get(a,"showWeek");s=this._get(a,"dayNames");this._get(a,"dayNamesShort");var q=this._get(a,"dayNamesMin"),B=this._get(a,"monthNames"),v=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),D=this._get(a,"showOtherMonths"),K=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var E=this._getDefaultDate(a),w="",x=0;x<i[0];x++){var O="";this.maxRows=4;for(var G=0;G<i[1];G++){var P=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",y="";if(l){y+='<div class="ui-datepicker-group';if(i[1]>1)switch(G){case 0:y+=" ui-datepicker-group-first";t=" ui-corner-"+(c?"right":"left");break;case i[1]-1:y+=" ui-datepicker-group-last";t=" ui-corner-"+(c?"left":"right");break;default:y+=" ui-datepicker-group-middle";t="";break}y+='">'}y+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&x==0?c?f:n:"")+(/all|right/.test(t)&&x==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,k,o,x>0||G>0,B,v)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var z=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(t=0;t<7;t++){var r=(t+h)%7;z+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+s[r]+'">'+q[r]+"</span></th>"}y+=z+"</tr></thead><tbody>";z=this._getDaysInMonth(m,g);if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,z);t=(this._getFirstDayOfMonth(m,g)-h+7)%7;z=Math.ceil((t+z)/7);this.maxRows=z=l?this.maxRows>z?this.maxRows:z:z;r=this._daylightSavingAdjust(new Date(m,g,1-t));for(var Q=0;Q<z;Q++){y+="<tr>";var R=!j?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(r)+"</td>";for(t=0;t<7;t++){var I=p?p.apply(a.input?a.input[0]:null,[r]):[true,""],F=r.getMonth()!=g,L=F&&!K||!I[0]||k&&r<k||o&&r>o;R+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(r.getTime()==P.getTime()&&g==a.selectedMonth&&a._keyEvent||E.getTime()==r.getTime()&&E.getTime()==P.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!D?"":" "+I[1]+(r.getTime()==u.getTime()?" "+this._currentClass:"")+(r.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!F||D)&&I[2]?' title="'+I[2]+'"':"")+(L?"":' onclick="DP_jQuery_'+A+".datepicker._selectDay('#"+a.id+"',"+r.getMonth()+","+r.getFullYear()+', this);return false;"')+">"+(F&&!D?" ":L?'<span class="ui-state-default">'+r.getDate()+"</span>":'<a class="ui-state-default'+(r.getTime()==b.getTime()?" ui-state-highlight":"")+(r.getTime()==u.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+'" href="#">'+r.getDate()+"</a>")+"</td>";r.setDate(r.getDate()+1);r=this._daylightSavingAdjust(r)}y+=R+"</tr>"}g++;if(g>11){g=0;m++}y+="</tbody></table>"+(l?"</div>"+(i[0]>0&&G==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");O+=y}w+=O}w+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");a._keyEvent=false;return w},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var j=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),k='<div class="ui-datepicker-title">',o="";if(h||!j)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";else{i=e&&e.getFullYear()==c;var m=f&&f.getFullYear()==c;o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+A+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+A+".datepicker._clickMonthYear('#"+a.id+"');\">";for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"}u||(k+=o+(h||!(j&&l)?" ":""));if(!a.yearshtml){a.yearshtml="";if(h||!l)k+='<span class="ui-datepicker-year">'+c+"</span>";else{g=this._get(a,"yearRange").split(":");var s=(new Date).getFullYear();i=function(q){q=q.match(/c[+-].*/)?c+parseInt(q.substring(1),10):q.match(/[+-].*/)?s+parseInt(q,10):parseInt(q,10);return isNaN(q)?s:q};b=i(g[0]);g=Math.max(b,i(g[1]||""));b=e?Math.max(b,e.getFullYear()):b;g=f?Math.min(g,f.getFullYear()):g;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+A+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+A+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>";k+=a.yearshtml;a.yearshtml=null}}k+=this._get(a,"yearSuffix");if(u)k+=(h||!(j&&l)?" ":"")+o;k+="</div>";return k},_adjustInstDate:function(a,b,c){var e=a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});d.fn.datepicker=function(a){if(!this.length)return this;if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);d.datepicker.initialized=true}var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)})};d.datepicker=new M;d.datepicker.initialized=false;d.datepicker.uuid=(new Date).getTime();d.datepicker.version="1.8.14";window["DP_jQuery_"+A]=d})(jQuery);(function(b,d){b.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});this.valueDiv=b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this.oldValue=this._value();this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.valueDiv.remove();b.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===d)return this._value();this._setOption("value",a);return this},_setOption:function(a,c){if(a==="value"){this.options.value=c;this._refreshValue();this._value()===this.options.max&&this._trigger("complete")}b.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;if(typeof a!=="number")a=0;return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),c=this._percentage();if(this.oldValue!==a){this.oldValue=a;this._trigger("change")}this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(c.toFixed(0)+"%");this.element.attr("aria-valuenow",a)}});b.extend(b.ui.progressbar,{version:"1.8.14"})})(jQuery);jQuery.effects||function(f,j){function m(c){var a;if(c&&c.constructor==Array&&c.length==3)return c;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(c))return n.transparent;return n[f.trim(c).toLowerCase()]}function s(c,a){var b;do{b=f.curCSS(c,a);if(b!=""&&b!="transparent"||f.nodeName(c,"body"))break;a="backgroundColor"}while(c=c.parentNode);return m(b)}function o(){var c=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,a={},b,d;if(c&&c.length&&c[0]&&c[c[0]])for(var e=c.length;e--;){b=c[e];if(typeof c[b]=="string"){d=b.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a[d]=c[b]}}else for(b in c)if(typeof c[b]==="string")a[b]=c[b];return a}function p(c){var a,b;for(a in c){b=c[a];if(b==null||f.isFunction(b)||a in t||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(b)))delete c[a]}return c}function u(c,a){var b={_:0},d;for(d in a)if(c[d]!=a[d])b[d]=a[d];return b}function k(c,a,b,d){if(typeof c=="object"){d=a;b=null;a=c;c=a.effect}if(f.isFunction(a)){d=a;b=null;a={}}if(typeof a=="number"||f.fx.speeds[a]){d=b;b=a;a={}}if(f.isFunction(b)){d=b;b=null}a=a||{};b=b||a.duration;b=f.fx.off?0:typeof b=="number"?b:b in f.fx.speeds?f.fx.speeds[b]:f.fx.speeds._default;d=d||a.complete;return[c,a,b,d]}function l(c){if(!c||typeof c==="number"||f.fx.speeds[c])return true;if(typeof c==="string"&&!f.effects[c])return true;return false}f.effects={};f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(c,a){f.fx.step[a]=function(b){if(!b.colorInit){b.start=s(b.elem,a);b.end=m(b.end);b.colorInit=true}b.elem.style[a]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var n={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},q=["add","remove","toggle"],t={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};f.effects.animateClass=function(c,a,b,d){if(f.isFunction(b)){d=b;b=null}return this.queue(function(){var e=f(this),g=e.attr("style")||" ",h=p(o.call(this)),r,v=e.attr("class");f.each(q,function(w,i){c[i]&&e[i+"Class"](c[i])});r=p(o.call(this));e.attr("class",v);e.animate(u(h,r),{queue:false,duration:a,easing:b,complete:function(){f.each(q,function(w,i){c[i]&&e[i+"Class"](c[i])});if(typeof e.attr("style")=="object"){e.attr("style").cssText="";e.attr("style").cssText=g}else e.attr("style",g);d&&d.apply(this,arguments);f.dequeue(this)}})})};f.fn.extend({_addClass:f.fn.addClass,addClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{add:c},a,b,d]):this._addClass(c)},_removeClass:f.fn.removeClass,removeClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{remove:c},a,b,d]):this._removeClass(c)},_toggleClass:f.fn.toggleClass,toggleClass:function(c,a,b,d,e){return typeof a=="boolean"||a===j?b?f.effects.animateClass.apply(this,[a?{add:c}:{remove:c},b,d,e]):this._toggleClass(c,a):f.effects.animateClass.apply(this,[{toggle:c},a,b,d])},switchClass:function(c,a,b,d,e){return f.effects.animateClass.apply(this,[{add:a,remove:c},b,d,e])}});f.extend(f.effects,{version:"1.8.14",save:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.data("ec.storage."+a[b],c[0].style[a[b]])},restore:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.css(a[b],c.data("ec.storage."+a[b]))},setMode:function(c,a){if(a=="toggle")a=c.is(":hidden")?"show":"hide";return a},getBaseline:function(c,a){var b;switch(c[0]){case"top":b=0;break;case"middle":b=0.5;break;case"bottom":b=1;break;default:b=c[0]/a.height}switch(c[1]){case"left":c=0;break;case"center":c=0.5;break;case"right":c=1;break;default:c=c[1]/a.width}return{x:c,y:b}},createWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent();var a={width:c.outerWidth(true),height:c.outerHeight(true),"float":c.css("float")},b=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});c.wrap(b);b=c.parent();if(c.css("position")=="static"){b.css({position:"relative"});c.css({position:"relative"})}else{f.extend(a,{position:c.css("position"),zIndex:c.css("z-index")});f.each(["top","left","bottom","right"],function(d,e){a[e]=c.css(e);if(isNaN(parseInt(a[e],10)))a[e]="auto"});c.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return b.css(a).show()},removeWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent().replaceWith(c);return c},setTransition:function(c,a,b,d){d=d||{};f.each(a,function(e,g){unit=c.cssUnit(g);if(unit[0]>0)d[g]=unit[0]*b+unit[1]});return d}});f.fn.extend({effect:function(c){var a=k.apply(this,arguments),b={options:a[1],duration:a[2],callback:a[3]};a=b.options.mode;var d=f.effects[c];if(f.fx.off||!d)return a?this[a](b.duration,b.callback):this.each(function(){b.callback&&b.callback.call(this)});return d.call(this,b)},_show:f.fn.show,show:function(c){if(l(c))return this._show.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="show";return this.effect.apply(this,a)}},_hide:f.fn.hide,hide:function(c){if(l(c))return this._hide.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:f.fn.toggle,toggle:function(c){if(l(c)||typeof c==="boolean"||f.isFunction(c))return this.__toggle.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(c){var a=this.css(c),b=[];f.each(["em","px","%","pt"],function(d,e){if(a.indexOf(e)>0)b=[parseFloat(a),e]});return b}});f.easing.jswing=f.easing.swing;f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,b,d,e){return f.easing[f.easing.def](c,a,b,d,e)},easeInQuad:function(c,a,b,d,e){return d*(a/=e)*a+b},easeOutQuad:function(c,a,b,d,e){return-d*(a/=e)*(a-2)+b},easeInOutQuad:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a+b;return-d/2*(--a*(a-2)-1)+b},easeInCubic:function(c,a,b,d,e){return d*(a/=e)*a*a+b},easeOutCubic:function(c,a,b,d,e){return d*((a=a/e-1)*a*a+1)+b},easeInOutCubic:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a+b;return d/2*((a-=2)*a*a+2)+b},easeInQuart:function(c,a,b,d,e){return d*(a/=e)*a*a*a+b},easeOutQuart:function(c,a,b,d,e){return-d*((a=a/e-1)*a*a*a-1)+b},easeInOutQuart:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a+b;return-d/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(c,a,b,d,e){return d*(a/=e)*a*a*a*a+b},easeOutQuint:function(c,a,b,d,e){return d*((a=a/e-1)*a*a*a*a+1)+b},easeInOutQuint:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a*a+b;return d/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(c,a,b,d,e){return-d*Math.cos(a/e*(Math.PI/2))+d+b},easeOutSine:function(c,a,b,d,e){return d*Math.sin(a/e*(Math.PI/2))+b},easeInOutSine:function(c,a,b,d,e){return-d/2*(Math.cos(Math.PI*a/e)-1)+b},easeInExpo:function(c,a,b,d,e){return a==0?b:d*Math.pow(2,10*(a/e-1))+b},easeOutExpo:function(c,a,b,d,e){return a==e?b+d:d*(-Math.pow(2,-10*a/e)+1)+b},easeInOutExpo:function(c,a,b,d,e){if(a==0)return b;if(a==e)return b+d;if((a/=e/2)<1)return d/2*Math.pow(2,10*(a-1))+b;return d/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(c,a,b,d,e){return-d*(Math.sqrt(1-(a/=e)*a)-1)+b},easeOutCirc:function(c,a,b,d,e){return d*Math.sqrt(1-(a=a/e-1)*a)+b},easeInOutCirc:function(c,a,b,d,e){if((a/=e/2)<1)return-d/2*(Math.sqrt(1-a*a)-1)+b;return d/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g))+b},easeOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*a)*Math.sin((a*e-c)*2*Math.PI/g)+d+b},easeInOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e/2)==2)return b+d;g||(g=e*0.3*1.5);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);if(a<1)return-0.5*h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)+b;return h*Math.pow(2,-10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)*0.5+d+b},easeInBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*(a/=e)*a*((g+1)*a-g)+b},easeOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*((a=a/e-1)*a*((g+1)*a+g)+1)+b},easeInOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;if((a/=e/2)<1)return d/2*a*a*(((g*=1.525)+1)*a-g)+b;return d/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},easeInBounce:function(c,a,b,d,e){return d-f.easing.easeOutBounce(c,e-a,0,d,e)+b},easeOutBounce:function(c,a,b,d,e){return(a/=e)<1/2.75?d*7.5625*a*a+b:a<2/2.75?d*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?d*(7.5625*(a-=2.25/2.75)*a+0.9375)+b:d*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},easeInOutBounce:function(c,a,b,d,e){if(a<e/2)return f.easing.easeInBounce(c,a*2,0,d,e)*0.5+b;return f.easing.easeOutBounce(c,a*2-e,0,d,e)*0.5+d*0.5+b}})}(jQuery);(function(b){b.effects.blind=function(c){return this.queue(function(){var a=b(this),g=["position","top","bottom","left","right"],f=b.effects.setMode(a,c.options.mode||"hide"),d=c.options.direction||"vertical";b.effects.save(a,g);a.show();var e=b.effects.createWrapper(a).css({overflow:"hidden"}),h=d=="vertical"?"height":"width";d=d=="vertical"?e.height():e.width();f=="show"&&e.css(h,0);var i={};i[h]=f=="show"?d:0;e.animate(i,c.duration,c.options.easing,function(){f=="hide"&&a.hide();b.effects.restore(a,g);b.effects.removeWrapper(a);c.callback&&c.callback.apply(a[0],arguments);a.dequeue()})})}})(jQuery);(function(e){e.effects.bounce=function(b){return this.queue(function(){var a=e(this),l=["position","top","bottom","left","right"],h=e.effects.setMode(a,b.options.mode||"effect"),d=b.options.direction||"up",c=b.options.distance||20,m=b.options.times||5,i=b.duration||250;/show|hide/.test(h)&&l.push("opacity");e.effects.save(a,l);a.show();e.effects.createWrapper(a);var f=d=="up"||d=="down"?"top":"left";d=d=="up"||d=="left"?"pos":"neg";c=b.options.distance||(f=="top"?a.outerHeight({margin:true})/3:a.outerWidth({margin:true})/3);if(h=="show")a.css("opacity",0).css(f,d=="pos"?-c:c);if(h=="hide")c/=m*2;h!="hide"&&m--;if(h=="show"){var g={opacity:1};g[f]=(d=="pos"?"+=":"-=")+c;a.animate(g,i/2,b.options.easing);c/=2;m--}for(g=0;g<m;g++){var j={},k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing);c=h=="hide"?c*2:c/2}if(h=="hide"){g={opacity:0};g[f]=(d=="pos"?"-=":"+=")+c;a.animate(g,i/2,b.options.easing,function(){a.hide();e.effects.restore(a,l);e.effects.removeWrapper(a);b.callback&&b.callback.apply(this,arguments)})}else{j={};k={};j[f]=(d=="pos"?"-=":"+=")+c;k[f]=(d=="pos"?"+=":"-=")+c;a.animate(j,i/2,b.options.easing).animate(k,i/2,b.options.easing,function(){e.effects.restore(a,l);e.effects.removeWrapper(a);b.callback&&b.callback.apply(this,arguments)})}a.queue("fx",function(){a.dequeue()});a.dequeue()})}})(jQuery);(function(b){b.effects.clip=function(e){return this.queue(function(){var a=b(this),i=["position","top","bottom","left","right","height","width"],f=b.effects.setMode(a,e.options.mode||"hide"),c=e.options.direction||"vertical";b.effects.save(a,i);a.show();var d=b.effects.createWrapper(a).css({overflow:"hidden"});d=a[0].tagName=="IMG"?d:a;var g={size:c=="vertical"?"height":"width",position:c=="vertical"?"top":"left"};c=c=="vertical"?d.height():d.width();if(f=="show"){d.css(g.size,0);d.css(g.position,c/2)}var h={};h[g.size]=f=="show"?c:0;h[g.position]=f=="show"?0:c/2;d.animate(h,{queue:false,duration:e.duration,easing:e.options.easing,complete:function(){f=="hide"&&a.hide();b.effects.restore(a,i);b.effects.removeWrapper(a);e.callback&&e.callback.apply(a[0],arguments);a.dequeue()}})})}})(jQuery);(function(c){c.effects.drop=function(d){return this.queue(function(){var a=c(this),h=["position","top","bottom","left","right","opacity"],e=c.effects.setMode(a,d.options.mode||"hide"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a);var f=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var g=d.options.distance||(f=="top"?a.outerHeight({margin:true})/2:a.outerWidth({margin:true})/2);if(e=="show")a.css("opacity",0).css(f,b=="pos"?-g:g);var i={opacity:e=="show"?1:0};i[f]=(e=="show"?b=="pos"?"+=":"-=":b=="pos"?"-=":"+=")+g;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){e=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);(function(j){j.effects.explode=function(a){return this.queue(function(){var c=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3,d=a.options.pieces?Math.round(Math.sqrt(a.options.pieces)):3;a.options.mode=a.options.mode=="toggle"?j(this).is(":visible")?"hide":"show":a.options.mode;var b=j(this).show().css("visibility","hidden"),g=b.offset();g.top-=parseInt(b.css("marginTop"),10)||0;g.left-=parseInt(b.css("marginLeft"),10)||0;for(var h=b.outerWidth(true),i=b.outerHeight(true),e=0;e<c;e++)for(var f=0;f<d;f++)b.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-f*(h/d),top:-e*(i/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:h/d,height:i/c,left:g.left+f*(h/d)+(a.options.mode=="show"?(f-Math.floor(d/2))*(h/d):0),top:g.top+e*(i/c)+(a.options.mode=="show"?(e-Math.floor(c/2))*(i/c):0),opacity:a.options.mode=="show"?0:1}).animate({left:g.left+f*(h/d)+(a.options.mode=="show"?0:(f-Math.floor(d/2))*(h/d)),top:g.top+e*(i/c)+(a.options.mode=="show"?0:(e-Math.floor(c/2))*(i/c)),opacity:a.options.mode=="show"?1:0},a.duration||500);setTimeout(function(){a.options.mode=="show"?b.css({visibility:"visible"}):b.css({visibility:"visible"}).hide();a.callback&&a.callback.apply(b[0]);b.dequeue();j("div.ui-effects-explode").remove()},a.duration||500)})}})(jQuery);(function(b){b.effects.fade=function(a){return this.queue(function(){var c=b(this),d=b.effects.setMode(c,a.options.mode||"hide");c.animate({opacity:d},{queue:false,duration:a.duration,easing:a.options.easing,complete:function(){a.callback&&a.callback.apply(this,arguments);c.dequeue()}})})}})(jQuery);(function(c){c.effects.fold=function(a){return this.queue(function(){var b=c(this),j=["position","top","bottom","left","right"],d=c.effects.setMode(b,a.options.mode||"hide"),g=a.options.size||15,h=!!a.options.horizFirst,k=a.duration?a.duration/2:c.fx.speeds._default/2;c.effects.save(b,j);b.show();var e=c.effects.createWrapper(b).css({overflow:"hidden"}),f=d=="show"!=h,l=f?["width","height"]:["height","width"];f=f?[e.width(),e.height()]:[e.height(),e.width()];var i=/([0-9]+)%/.exec(g);if(i)g=parseInt(i[1],10)/100*f[d=="hide"?0:1];if(d=="show")e.css(h?{height:0,width:g}:{height:g,width:0});h={};i={};h[l[0]]=d=="show"?f[0]:g;i[l[1]]=d=="show"?f[1]:0;e.animate(h,k,a.options.easing).animate(i,k,a.options.easing,function(){d=="hide"&&b.hide();c.effects.restore(b,j);c.effects.removeWrapper(b);a.callback&&a.callback.apply(b[0],arguments);b.dequeue()})})}})(jQuery);(function(b){b.effects.highlight=function(c){return this.queue(function(){var a=b(this),e=["backgroundImage","backgroundColor","opacity"],d=b.effects.setMode(a,c.options.mode||"show"),f={backgroundColor:a.css("backgroundColor")};if(d=="hide")f.opacity=0;b.effects.save(a,e);a.show().css({backgroundImage:"none",backgroundColor:c.options.color||"#ffff99"}).animate(f,{queue:false,duration:c.duration,easing:c.options.easing,complete:function(){d=="hide"&&a.hide();b.effects.restore(a,e);d=="show"&&!b.support.opacity&&this.style.removeAttribute("filter");c.callback&&c.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);(function(d){d.effects.pulsate=function(a){return this.queue(function(){var b=d(this),c=d.effects.setMode(b,a.options.mode||"show");times=(a.options.times||5)*2-1;duration=a.duration?a.duration/2:d.fx.speeds._default/2;isVisible=b.is(":visible");animateTo=0;if(!isVisible){b.css("opacity",0).show();animateTo=1}if(c=="hide"&&isVisible||c=="show"&&!isVisible)times--;for(c=0;c<times;c++){b.animate({opacity:animateTo},duration,a.options.easing);animateTo=(animateTo+1)%2}b.animate({opacity:animateTo},duration,a.options.easing,function(){animateTo==0&&b.hide();a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()}).dequeue()})}})(jQuery);(function(c){c.effects.puff=function(b){return this.queue(function(){var a=c(this),e=c.effects.setMode(a,b.options.mode||"hide"),g=parseInt(b.options.percent,10)||150,h=g/100,i={height:a.height(),width:a.width()};c.extend(b.options,{fade:true,mode:e,percent:e=="hide"?g:100,from:e=="hide"?i:{height:i.height*h,width:i.width*h}});a.effect("scale",b.options,b.duration,b.callback);a.dequeue()})};c.effects.scale=function(b){return this.queue(function(){var a=c(this),e=c.extend(true,{},b.options),g=c.effects.setMode(a,b.options.mode||"effect"),h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:g=="hide"?0:100),i=b.options.direction||"both",f=b.options.origin;if(g!="effect"){e.origin=f||["middle","center"];e.restore=true}f={height:a.height(),width:a.width()};a.from=b.options.from||(g=="show"?{height:0,width:0}:f);h={y:i!="horizontal"?h/100:1,x:i!="vertical"?h/100:1};a.to={height:f.height*h.y,width:f.width*h.x};if(b.options.fade){if(g=="show"){a.from.opacity=0;a.to.opacity=1}if(g=="hide"){a.from.opacity=1;a.to.opacity=0}}e.from=a.from;e.to=a.to;e.mode=g;a.effect("size",e,b.duration,b.callback);a.dequeue()})};c.effects.size=function(b){return this.queue(function(){var a=c(this),e=["position","top","bottom","left","right","width","height","overflow","opacity"],g=["position","top","bottom","left","right","overflow","opacity"],h=["width","height","overflow"],i=["fontSize"],f=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],k=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=c.effects.setMode(a,b.options.mode||"effect"),n=b.options.restore||false,m=b.options.scale||"both",l=b.options.origin,j={height:a.height(),width:a.width()};a.from=b.options.from||j;a.to=b.options.to||j;if(l){l=c.effects.getBaseline(l,j);a.from.top=(j.height-a.from.height)*l.y;a.from.left=(j.width-a.from.width)*l.x;a.to.top=(j.height-a.to.height)*l.y;a.to.left=(j.width-a.to.width)*l.x}var d={from:{y:a.from.height/j.height,x:a.from.width/j.width},to:{y:a.to.height/j.height,x:a.to.width/j.width}};if(m=="box"||m=="both"){if(d.from.y!=d.to.y){e=e.concat(f);a.from=c.effects.setTransition(a,f,d.from.y,a.from);a.to=c.effects.setTransition(a,f,d.to.y,a.to)}if(d.from.x!=d.to.x){e=e.concat(k);a.from=c.effects.setTransition(a,k,d.from.x,a.from);a.to=c.effects.setTransition(a,k,d.to.x,a.to)}}if(m=="content"||m=="both")if(d.from.y!=d.to.y){e=e.concat(i);a.from=c.effects.setTransition(a,i,d.from.y,a.from);a.to=c.effects.setTransition(a,i,d.to.y,a.to)}c.effects.save(a,n?e:g);a.show();c.effects.createWrapper(a);a.css("overflow","hidden").css(a.from);if(m=="content"||m=="both"){f=f.concat(["marginTop","marginBottom"]).concat(i);k=k.concat(["marginLeft","marginRight"]);h=e.concat(f).concat(k);a.find("*[width]").each(function(){child=c(this);n&&c.effects.save(child,h);var o={height:child.height(),width:child.width()};child.from={height:o.height*d.from.y,width:o.width*d.from.x};child.to={height:o.height*d.to.y,width:o.width*d.to.x};if(d.from.y!=d.to.y){child.from=c.effects.setTransition(child,f,d.from.y,child.from);child.to=c.effects.setTransition(child,f,d.to.y,child.to)}if(d.from.x!=d.to.x){child.from=c.effects.setTransition(child,k,d.from.x,child.from);child.to=c.effects.setTransition(child,k,d.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){n&&c.effects.restore(child,h)})})}a.animate(a.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){a.to.opacity===0&&a.css("opacity",a.from.opacity);p=="hide"&&a.hide();c.effects.restore(a,n?e:g);c.effects.removeWrapper(a);b.callback&&b.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);(function(d){d.effects.shake=function(a){return this.queue(function(){var b=d(this),j=["position","top","bottom","left","right"];d.effects.setMode(b,a.options.mode||"effect");var c=a.options.direction||"left",e=a.options.distance||20,l=a.options.times||3,f=a.duration||a.options.duration||140;d.effects.save(b,j);b.show();d.effects.createWrapper(b);var g=c=="up"||c=="down"?"top":"left",h=c=="up"||c=="left"?"pos":"neg";c={};var i={},k={};c[g]=(h=="pos"?"-=":"+=")+e;i[g]=(h=="pos"?"+=":"-=")+e*2;k[g]=(h=="pos"?"-=":"+=")+e*2;b.animate(c,f,a.options.easing);for(e=1;e<l;e++)b.animate(i,f,a.options.easing).animate(k,f,a.options.easing);b.animate(i,f,a.options.easing).animate(c,f/2,a.options.easing,function(){d.effects.restore(b,j);d.effects.removeWrapper(b);a.callback&&a.callback.apply(this,arguments)});b.queue("fx",function(){b.dequeue()});b.dequeue()})}})(jQuery);(function(c){c.effects.slide=function(d){return this.queue(function(){var a=c(this),h=["position","top","bottom","left","right"],f=c.effects.setMode(a,d.options.mode||"show"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a).css({overflow:"hidden"});var g=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var e=d.options.distance||(g=="top"?a.outerHeight({margin:true}):a.outerWidth({margin:true}));if(f=="show")a.css(g,b=="pos"?isNaN(e)?"-"+e:-e:e);var i={};i[g]=(f=="show"?b=="pos"?"+=":"-=":b=="pos"?"-=":"+=")+e;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){f=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);(function(e){e.effects.transfer=function(a){return this.queue(function(){var b=e(this),c=e(a.options.to),d=c.offset();c={top:d.top,left:d.left,height:c.innerHeight(),width:c.innerWidth()};d=b.offset();var f=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({top:d.top,left:d.left,height:b.innerHeight(),width:b.innerWidth(),position:"absolute"}).animate(c,a.duration,a.options.easing,function(){f.remove();a.callback&&a.callback.apply(b[0],arguments);b.dequeue()})})}})(jQuery);

// browser/os detection
(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);

// for 'in' operator
function oc(a){var o={};for(var i=0;i<a.length;i++)o[a[i]]='';return o;}

var reformal_wdg_w="713";var reformal_wdg_h="460";var reformal_wdg_domain="bescript";var reformal_wdg_mode=1;var reformal_wdg_title="beScript";var reformal_wdg_ltitle="Есть идеи? Выскажите их!…";var reformal_wdg_lfont="Verdana, Geneva, sans-serif";var reformal_wdg_lsize="12px";var reformal_wdg_color="#FFA000";var reformal_wdg_bcolor="#516683";var reformal_wdg_tcolor="#FFFFFF";var reformal_wdg_align="";var reformal_wdg_charset="utf-8";var reformal_wdg_waction=0;var reformal_wdg_vcolor="#9FCE54";var reformal_wdg_cmline="#E0E0E0";var reformal_wdg_glcolor="#105895";var reformal_wdg_tbcolor="#FFFFFF";var reformal_wdg_tcolor_aw4="#3F4543";var reformal_wdg_bimage="d9e259410faa9283cd24c5c312bf56bb.png";var dref_w=((typeof reformal_wdg_w!="undefined")?reformal_wdg_w:713);var dref_h=((typeof reformal_wdg_h!="undefined")?reformal_wdg_h:450);var dref_mode=((typeof reformal_wdg_mode!="undefined")?reformal_wdg_mode:0);var dref_title=((typeof reformal_wdg_title!="undefined")?reformal_wdg_title:"Реформал");var dref_ltitle=((typeof reformal_wdg_ltitle!="undefined")?reformal_wdg_ltitle:"Оставить отзыв");var dref_lfont=((typeof reformal_wdg_lfont!="undefined")?reformal_wdg_lfont:"");var dref_lsize=((typeof reformal_wdg_lsize!="undefined")?reformal_wdg_lsize:"12px");var dref_color=((typeof reformal_wdg_color!="undefined"&&"#"!=reformal_wdg_color)?reformal_wdg_color:"orange");var dref_bcolor=((typeof reformal_wdg_bcolor!="undefined")?reformal_wdg_bcolor:"#FFA000");var dref_tcolor=((typeof reformal_wdg_tcolor!="undefined")?reformal_wdg_tcolor:"#FFFFFF");var dref_align=((typeof reformal_wdg_align!="undefined"&&""!=reformal_wdg_align)?reformal_wdg_align:"left");var dref_charset=((typeof reformal_wdg_charset!="undefined")?reformal_wdg_charset:"utf-8");var dref_waction=((typeof reformal_wdg_waction!="undefined")?reformal_wdg_waction:"0");var dref_vcolor=((typeof reformal_wdg_vcolor!="undefined")?reformal_wdg_vcolor:"#9fce54");dref_vcolor=dref_vcolor.substring(1,dref_vcolor.length);var dref_cmline=((typeof reformal_wdg_cmline!="undefined")?reformal_wdg_cmline:"#E0E0E0");dref_cmline=dref_cmline.substring(1,dref_cmline.length);var dref_glcolor=((typeof reformal_wdg_glcolor!="undefined")?reformal_wdg_glcolor:"#105895");dref_glcolor=dref_glcolor.substring(1,dref_glcolor.length);var dref_tbcolor=((typeof reformal_wdg_tbcolor!="undefined")?reformal_wdg_tbcolor:"#FFFFFF");dref_tbcolor=dref_tbcolor.substring(1,dref_tbcolor.length);var dref_tcolor_aw4=(typeof reformal_wdg_tcolor_aw4!="undefined")?reformal_wdg_tcolor_aw4:"#3F4543";dref_tcolor_aw4=dref_tcolor_aw4.substring(1,dref_tcolor_aw4.length);var dref_ext_img=(typeof reformal_wdg_bimage!="undefined"&&reformal_wdg_bimage!="")?1:0;var dref_ext_img_m=(dref_ext_img&&reformal_wdg_bimage.substring(3,reformal_wdg_bimage).toLowerCase()=="htt")?1:0;if(dref_ext_img_m&&reformal_wdg_bimage.indexOf("reformal.ru/files/",0)>0){dref_ext_img_m=0;var v=reformal_wdg_bimage.toString().split("/");reformal_wdg_bimage=v[v.length-1]}var dref_ext_cms=((typeof reformal_wdg_cms!="undefined")?reformal_wdg_cms:"reformal");if(typeof reformal_wdg_vlink=="undefined"){out_link="http://"+reformal_wdg_domain+".reformal.ru/proj/?mod=one"}else{out_link=((typeof reformal_wdg_https!="undefined")?"https://":"http://")+reformal_wdg_vlink}MyOtzivCl=function(){var a="http://reformal.ru/";this.mo_get_win_width=function(){var b=0;if(typeof(window.innerWidth)=="number"){b=window.innerWidth}else{if(document.documentElement&&document.documentElement.clientWidth){b=document.documentElement.clientWidth}else{if(document.body&&document.body.clientWidth){b=document.body.clientWidth}}}return b};this.mo_get_win_height=function(){var b=0;if(typeof(window.innerHeight)=="number"){b=window.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){b=document.documentElement.clientHeight}else{if(document.body&&document.body.clientHeight){b=document.body.clientHeight}}}return b};this.mo_get_scrol=function(){var b=0;if(self.pageYOffset){b=self.pageYOffset}else{if(document.documentElement&&document.documentElement.scrollTop){b=document.documentElement.scrollTop}else{if(document.body){b=document.body.scrollTop}}}return b};this.mo_show_box=function(){if(document.getElementById("fthere").innerHTML==""){document.getElementById("fthere").innerHTML='<iframe id="thrwdgfr" src="'+a+"wdg4.php?w="+dref_w+"&h="+dref_h+"&domain="+reformal_wdg_domain+"&bcolor="+dref_tbcolor+"&glcolor="+dref_glcolor+"&cmline="+dref_cmline+"&vcolor="+dref_vcolor+"&tcolor_aw4="+dref_tcolor_aw4+'" width="'+dref_w+'" height="'+(dref_h-75)+'" frameborder="0" scrolling="no">Frame error</iframe>'}var b=this.mo_get_win_width()/2-dref_w/2;var c=this.mo_get_win_height()/2-dref_h/2+this.mo_get_scrol();document.getElementById("myotziv_box").style.top=(dref_ext_cms=="joomla")?"35px":c+"px";document.getElementById("myotziv_box").style.left=b+"px";document.getElementById("myotziv_box").style.display="block"};this.mo_hide_box=function(){document.getElementById("myotziv_box").style.display="none"};this.mo_showcss=function(){GM_addStyle(".widsnjx {margin:0 auto; position:relative;}.widsnjx fieldset {padding:0; border:none; border:0px solid #000; margin:0;}");GM_addStyle("#poxupih { width:"+(dref_w-(-40))+"px; height:auto; position:relative;z-index:1001; min-height:490px;}.poxupih_top {background:url(http://widget.reformal.ru/i/wdt/box_shadow_n.png) top left repeat-x ; padding-top:20px; margin:0 20px;}.poxupih_btm {background:url(http://widget.reformal.ru/i/wdt/box_shadow_s.png) bottom repeat-x; padding-bottom:20px;}.poxupih_1t {background:url(http://widget.reformal.ru/i/wdt/box_shadow_w.png) left repeat-y; padding-left:20px; margin:0 -20px;}.poxupih_rt {background:url(http://widget.reformal.ru/i/wdt/box_shadow_e.png) right repeat-y; padding-right:20px;}.poxupih_center {width:"+(dref_w)+"px;min-width:"+(dref_w)+"px; min-height:"+(dref_h-10)+"px; height:"+(dref_h-10)+"px; background:"+dref_bcolor+";color:"+(dref_tcolor)+";}#poxupih_tl {position:absolute;top:0;left:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_nw.png) 0 0 no-repeat;}#poxupih_bl {position:absolute;bottom:0;left:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_sw.png) 0 0 no-repeat;}#poxupih_tr {position:absolute;top:0;right:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_ne.png) 0 0 no-repeat;}#poxupih_br {position:absolute;bottom:0;right:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_se.png) 0 0 no-repeat;}");GM_addStyle(".gertuik { padding:10px 20px; font-size:18px; font-weight:bold; font-family:Arial, Helvetica, sans-serif; overflow:hidden; max-height:42px;}a.pokusijy {cursor:pointer;display:block; width:16px; height:16px; background: url(http://reformal.ru/i/wdg_data/expand.png) 100% 0px no-repeat; float:right; margin-top:3px;}");GM_addStyle(".bvnmrte {padding:0; width:100%;overflow:hidden;}.drsdtf { font-family: Tahoma, Geneva, sans-serif; padding:3px 20px; text-align:right; font-size:10px; max-height:22px;}.drsdtf a { font-weight:bold; color:#fff; text-decoration:none;}");GM_addStyle('#poxupih  a {position:relative; z-index:10;} #poxupih { width:"+(dref_w)+"px;}.poxupih_center {width:"+(dref_w)+"px; height:"+(dref_h)+"px; background-color:"+dref_bcolor+";}');GM_addStyle(".frby{position:fixed; left:0; top:0; z-index:5; width:22px; height:100%;}");GM_addStyle("* html .frby{position:absolute;}");GM_addStyle(".frby table{border-collapse:collapse;}");GM_addStyle(".frby td{padding:0px; vertical-align: middle;}");GM_addStyle(".frby a{display:block; background:"+(dref_ext_img_m?"none":dref_color)+";}");GM_addStyle(".frby a:hover{background:"+(dref_ext_img_m?"none":dref_color)+";}");GM_addStyle(".frby img{border:0;}");GM_addStyle(".frgtd{position:fixed; right:0px; top:0; z-index:5; width:22px; height:100%;}");GM_addStyle("* html .frgtd{position:absolute;}");GM_addStyle(".frgtd table{border-collapse:collapse;}");GM_addStyle(".frgtd td{padding:0px; vertical-align: middle;}");GM_addStyle(".frgtd a{display:block; background:"+(dref_ext_img_m?"none":dref_color)+";}");GM_addStyle(".frgtd a:hover{background:"+(dref_ext_img_m?"none":dref_color)+";}");GM_addStyle(".frgtd img{border:0;}")};this.mo_showframe=function(){this.mo_showcss();var c=$(document.body);var d="";var b=$("#beScript_idea");b.click(function(){MyOtziv.mo_show_box()});d+='<div style="'+((dref_ext_cms=="joomla")?"position:fixed;":"position:absolute;")+' display: none; top: 0px; left: 0px;" id="myotziv_box"> <div class="widsnjx"> <div id="poxupih"> <div class="poxupih_top"> <div class="poxupih_btm"> <div class="poxupih_1t"> <div class="poxupih_rt"> <div class="poxupih_center">';d+='<div class="gertuik"> <a class="pokusijy" title="" onclick=""></a> '+dref_title+'</div> <div class="bvnmrte" id="fthere"></div>';d+='<div class="drsdtf">на платформе <a href="http://reformal.ru" title="Reformal.ru">Reformal.ru</a></div> </div> </div> </div> </div> </div> <div id="poxupih_tl"></div> <div id="poxupih_bl"></div> <div id="poxupih_tr"></div> <div id="poxupih_br"></div> </div> </div></div>';$(document.body).append(d);$(".pokusijy").click(function(){MyOtziv.mo_hide_box()})}};

var MyOtziv=new MyOtzivCl();

// ------------------------
// -      Start point     -
// ------------------------
//}

// var jQuery=$=(function(window){return window.$})(window);

function runBEScript() {
    try {
        beScript.init();
    } catch (e) {
        beScript.log( "beScript Error! " + e );
        beScript.log( e.stack );
    }
}

(function(){
    runBEScript();
})();
