// ==UserScript==
// @name           DS//LO - Berichtauswertung 0.0.9.1
// @description    Wertet Berichte aus. Bilanz, Verlorene Einheiten, Bacherpunkte, Link zum rekrutieren.
// @author         Layne Obserdia < layne.obserdia@gmail.com >
// @version        0.0.9.1
// @include        http://de*.die-staemme.de/game.php?*screen=report*view=*
// @include        http://de*.die-staemme.de/public_report/*
// @include        http://de*.die-staemme.de/game.php?*screen=train*mode=mass*
// @include        http://de*.die-staemme.de/game.php*screen=ranking
// ==/UserScript==

/**
 * CHANGELOG:
 * 0.0.9.1     : Fix for Version 7.0 (total haul).
 * 0.0.9.0     : Fix for Version 7.0.
 * 0.0.8.2     : Zusätzliche Anzeige der Prozente.
 * 0.0.8.1     : Anpassen der RegEx für Dorferkennung. Anpassen der @include.
 */

(function(){
    var browser = getBrowser();
    var pa = checkForPA();
    var pageParameters = getPageParameters(location.search);
// Objects
    var Ressources = function(ressources) {
        this.objectName = 'Ressources';

        this.setWood(ressources[0]);
        this.setStone(ressources[1]);
        this.setIron(ressources[2]);
        this.setPopulation(ressources[3]);
        return this;
    };
    Ressources.prototype = {
        checkRessource: function(ressource) {
            if (isNaN(ressource)) {
                return false;
            }
            return true;
        },
        checkRessources: function(ressources) {
            if (!(ressources instanceof Object) && ressources.objectName != 'Ressources') {
                return false;
            }
            return true;
        },

        setWood: function(wood) {
            if (this.checkRessource(wood)) {
                this.wood = parseInt(wood, 10);
            }
        },
        setStone: function(stone) {
            if (this.checkRessource(stone)) {
                this.stone = parseInt(stone, 10);
            }
        },
        setIron: function(iron) {
            if (this.checkRessource(iron)) {
                this.iron = parseInt(iron, 10);
            }
        },
        setPopulation: function(population) {
            if (this.checkRessource(population)) {
                this.population = parseInt(population, 10);
            }
        },

        add: function(addRessources) {
            if (!this.checkRessources(addRessources)) {
                throw 'Ressources.add can\'t add ' + typeof addRessources;
            }
            this.wood  += addRessources.wood;
            this.stone += addRessources.stone;
            this.iron  += addRessources.iron;
            this.population += addRessources.population;
            return this;
        },
        subtract: function(subRessources) {
            if (!this.checkRessources(subRessources)) {
                throw 'Ressources.substract can\'t subtract ' + typeof subRessources;
            }
            this.wood  -= subRessources.wood;
            this.stone -= subRessources.stone;
            this.iron  -= subRessources.iron;
            this.population -= subRessources.population;
            return this;
        },
        multiply: function(factor) {
            this.wood  *= parseFloat(factor);
            this.stone *= parseFloat(factor);
            this.iron  *= parseFloat(factor);
            this.population *= parseFloat(factor);
            return this;
        },

        get_multiply: function(factor) {
            ressources = new Ressources([this.wood,this.stone,this.iron,this.population]);
            ressources.wood  *= parseFloat(factor);
            ressources.stone *= parseFloat(factor);
            ressources.iron  *= parseFloat(factor);
            ressources.population *= parseFloat(factor);
            return ressources;
        },
        get_sum: function() {
            return this.wood + this.stone + this.iron;
        },

        toArray: function() {
            var array = [
                this.wood,
                this.stone,
                this.iron,
                this.population
            ];
            return array;
        }
    };
    var Unit = function(name, ressources, bpAtt, bpDef) {
        if (ressources.objectName != 'Ressources') {
            throw 'new unit: ressources has to be an Ressources-object! But is : ' + ressources.objectName;
        }
        if (isNaN(bpAtt) || isNaN(bpDef)) {
            throw 'new unit: bpAtt and bpDef have to be integer';
        }
        this.objectName = 'Unit';
        this.name = name.toString().toLowerCase();
        this.ressources = ressources;
        this.bp = {
            att: parseInt(bpAtt, 10),
            def: parseInt(bpDef, 10)
        };
        return this;
    };
    var Building = function(name, level) {
        if (isNaN(level)) {
            throw 'new Building: level has to be an Number but is: ' + typeof level;
        }
        this.objectName = 'Building';
        this.name = name.toString().toLowerCase();
        this.level = parseInt(level, 10);
        return this;
    };
    var Player = function(name, active, village, units, buildings) {
        if (village.objectName != 'Village' && village !== null) {
            throw 'new Player: (' + name + ') village has to be an Village-object! But is: ' + village.objectName;
        }
        if (!(units instanceof Object)) {
            throw 'new Player: (' + name + ') units has to be an object! But is typeof: ' + typeof units;
        }
        if (buildings && buildings.objectName != 'Building') {
            throw 'new Player: (' + name + ') buildings has to be an object! But is: ' + buildings.objectName;
        }
        this.objectName= 'Player';
        this.name      = name.toString();
        this.active    = false;
        this.village   = {};
        this.units     = units;
        this.buildings = {};
        if (active === true) {
            this.active = true;
        }
        if (village) {
            this.village = village;
        }
        if (buildings) {
            this.buildings = buildings;
        }
        return this;
    };
    var Coordinate = function(x,y) {
        this.objectName = 'Coordinate';
        this.x = parseInt(x, 10);
        this.y = parseInt(y, 10);
        return this;
    };
    var Village = function(name, coordinates, id)  {
        if (coordinates.objectName != 'Coordinate') {
            throw 'new Village: (' + coordinates + ') player has to be an Coordinate-object! But is typeof: ' + typeof coordinates;
        }
        this.objectName = 'Village';
        this.name = name.toString();
        this.coordinates = coordinates;
        this.continent = parseInt(this.coordinates.x.toString().substring(0, 1) + this.coordinates.y.toString().substring(0, 1), 10);
        this.id = 0;
        if (!isNaN(id)) {
            this.id = id;
        }
        return this;
    };
// Settings
    var set = {
        'storageprefix' : 'dslo_'
    };
    var lang = {
        'de': {
            'living_units': 'Überlebende:',
            'basherpoints': 'Basherpunkte:',
            'balance_lost': 'Verluste:',
            'total'       : 'Gesamt:',
            'link_recruit': '» Verlorene Truppen rekrutieren'
        }
    };
    var actions = {
        recruit: function () {
            insertRecruitment(getPageParameters(location.search));
        },
        ranking: function () {
            var trs, i = 0, activeTr, div;
            trs = document.getElementById('player_ranking_table').getElementsByTagName('tr');
            for (i = 0; activeTr = trs[i]; i++) {
                if (activeTr.getAttribute('class') === 'lit') {
                    linkParams = getPageParameters(activeTr.getElementsByTagName('td')[1].getElementsByTagName('a')[0].getAttribute('href'));
                    if (browser.getValue(set.storageprefix + 'player_name') !== activeTr.getElementsByTagName('td')[1].textContent &&
                        browser.getValue(set.storageprefix + 'player_id') !== linkParams.id
                    ) {
                        browser.setValue(set.storageprefix + 'player_name', activeTr.getElementsByTagName('td')[1].textContent);
                        browser.setValue(set.storageprefix + 'player_id', linkParams.id);
                        if (browser.getValue(set.storageprefix + 'player_name' === activeTr.getElementsByTagName('td')[1].textContent) &&
                            browser.getValue(set.storageprefix + 'player_id' === linkParams.id)
                        ) {
                            div = document.createElement('div');
                            div.setAttribute('id', 'dslo_notification_saved');
                            div.setAttribute('stlye', 'position: fixed; top:50px; left:50px;');
                            div.appendChild(document.createTextNode('Spielername und ID wurden eingelesen und gespeichert. (vom US: Verlusteanzeige)'));
                            document.getElementsByTagName('body')[0].appendChild(div);
                        }
                    }
                    break;
                }
            }
        }
    };
    var td, trs, div, link, activePlayer, player, haulHTML, i, linkParams;
    var activeTr, resultTrs, haul, balance, lostUnitsParam;

// guardian - switch for page/action

// Recruit
    if (document.location.href.search(/screen=train/) !== -1 &&
        document.location.href.search(/mode=mass/) !== -1
    ) {
        actions.recruit();
        return;
    }
// ranking
    if (document.location.href.search(/screen=ranking/) !== -1 &&
        document.getElementById('player_ranking_table')
    ) {
        actions.ranking();
        return;
    }

// report
    if((document.location.href.search(/screen=report/) === -1 ||
        document.location.href.search(/view=\d*/) === -1) &&
        document.location.href.search(/public_report/) === -1 ||
        document.getElementById('attack_info_att_units') === null
    ){
        return;
    }

// Declaration
    // Später Welten als Objekte. Dann eine Welt mit den Einstellungen generieren, anhand der URL.
    // Die Welt enthält dann die möglichen Einheiten und Gebäude (Kirche).
    var availableUnits = {
        'Speerträger'    : new Unit('spear', new Ressources([50,30,10,1]),4,1),
        'Schwertkämpfer' : new Unit('sword', new Ressources([30,30,70,1]),5,2),
        'Axtkämpfer'     : new Unit('Axe', new Ressources([60,30,40,1]),1,4),
        'Bogenschütze'   : new Unit('Archer', new Ressources([100,30,60,1]),5,2),
        'Späher'         : new Unit('spy', new Ressources([50,50,20,2]),1,2),
        'Leichte Kavallerie'      : new Unit('light', new Ressources([125,100,250,4]),5,13),
        'Berittener Bogenschütze' : new Unit('marcher', new Ressources([250,100,150,5]),6,12),
        'Schwere Kavallerie'      : new Unit('heavy', new Ressources([200,150,600,6]),23,15),
        'Rammbock' : new Unit('ram', new Ressources([300,200,200,5]),4,8),
        'Katapult' : new Unit('catapult', new Ressources([320,400,100,8]),12,10),
        'Paladin'  : new Unit('knight', new Ressources([20,20,40,10]),40,20),
        'Adelsgeschlecht' : new Unit('snob', new Ressources([40000,50000,50000,100]),200,200),
        'Miliz' : new Unit('militia', new Ressources([0,0,0,0]),4,0)
    };

//    var buildings = {
//        'Hauptgebäude'   : new Building('main', 0)
//    };
//
    var HTMLReportContent = document.getElementById('attack_luck').parentNode;
    var haulObject = {
        Holz:  0,
        Lehm:  0,
        Eisen: 0
    };
    var players = {
        att: get_player('att'),
        def: get_player('def')
    };

// Units
    players.att.bp = get_basherpoints(players.def.units.verluste, 'att', availableUnits);
    players.def.bp = get_basherpoints(players.att.units.verluste, 'def', availableUnits);
    for (player in players) {
        players[player].ressources = get_ressourcesTotal(players[player].units.verluste, availableUnits);
        if (document.getElementById('attack_info_' + player + '_units') !== null) {
            display_unitInformations(player);
        }
    }

// Balance
    resultTrs = document.getElementById('attack_results').getElementsByTagName('tr');
    for (i = 0, max = resultTrs.length; i < max; i++) {
        if (document.getElementById('attack_results').getElementsByTagName('tr')[i].childNodes[0].textContent === 'Beute:') {
            haul = get_haul();
            balance = new Ressources(haul.toArray());
            balance = balance.subtract(players.att.ressources);
            display_balance(players.att.ressources, balance);
            break;
        }
    }

    if (players.att.active === true) {
        activePlayer = 'att';
    }
    else if(players.def.active === true) {
        activePlayer = 'def';
    }
    if (pa && activePlayer) {
// Insert link to recruit
        lostUnitsParam = '';
        for (var unit in players[activePlayer].units.verluste) {
            if (players[activePlayer].units.verluste[unit] > 0) {
                lostUnitsParam += '&unit[' + availableUnits[unit].name + ']=' + players[activePlayer].units.verluste[unit];
            }
        }
        if (lostUnitsParam) {
            HTMLReportContent.insertBefore(document.createElement('hr'), document.getElementsByTagName('hr')[1]);
            link = document.createElement('a');
            link.setAttribute('href', '/game.php?village=' + players[activePlayer].village.id + '&screen=train&mode=mass' + lostUnitsParam);
            link.appendChild(document.createTextNode(lang.de.link_recruit));
            HTMLReportContent.insertBefore(link, document.getElementsByTagName('hr')[2]);
        }
    }


// Functions

    /**
     * Displays the ressources of the units for the specified player.
     *
     * @param player 'string' The player.
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-01
     */
    function display_unitInformations(player) {
        var res, unit, living, trs, td, span;
        player = player.toString();
        trs = document.getElementById('attack_info_' + player + '_units').getElementsByTagName('tr');
    // Leerzeile
        td = document.createElement('td');
        td.setAttribute('style', 'border-left: solid 1px #DFCCA6;');
        td.setAttribute('colspan', 4);
        td.innerHTML = '&nbsp;';
        trs[1].appendChild(td);
        for (res in players[player].ressources) {
            if (!isNaN(players[player].ressources[res])) {
                // Icons
                td = document.createElement('td');
                    span = document.createElement('span');
                    span.setAttribute('class', 'icon header ' + res);
                    span.innerHTML = '&nbsp;';
                td.appendChild(span);
                trs[0].appendChild(td);
                // Values
                td = document.createElement('td');
                if (players[player].ressources[res] === 0) {
                    td.setAttribute('class', 'hidden');
                }
                td.setAttribute('style', 'text-align:right;border-left: solid 1px #DFCCA6;');
                td.innerHTML = getDisplayNumber(players[player].ressources[res]);
                trs[2].appendChild(td);
            }
        }
    // living units
        for (unit in players[player].units.anzahl) {
            if (players[player].units.verluste[unit] > 0) {
                // Titel
                tr = document.createElement('tr');
                    td = document.createElement('td');
                    td.appendChild(document.createTextNode(lang.de.living_units));
                tr.appendChild(td);
                // Values
                for (unit in players[player].units.anzahl) {
                    living = players[player].units.anzahl[unit] - players[player].units.verluste[unit];
                    td = document.createElement('td');
                    td.setAttribute('style', 'text-align:right;border-top: solid 2px #DFCCA6;border-bottom: double 4px #DFCCA6;color:#706F6F;');
                    if (living === 0) {
                        td.setAttribute('class', 'hidden');
                        td.setAttribute('style', 'text-align:right;border-top: solid 2px #DFCCA6;border-bottom: double 4px #DFCCA6;');
                    }
                        td.appendChild(document.createTextNode(getDisplayNumber(living)));
                    tr.appendChild(td);
                }
                td = document.createElement('td');
                    td.setAttribute('colspan', 4);
                    td.setAttribute('style', 'border-left: solid 1px #DFCCA6;');
                tr.appendChild(td);
                trs[trs.length - 1].parentNode.appendChild(tr);
                break;
            }
        }
    // BP's
        if (!isNaN(players[player].bp) && players[player].bp > 0) {
            // Titel
            tr = document.createElement('tr');
                td = document.createElement('td');
                td.setAttribute('colspan', 13);
                if (player == 'def') {
                    td.setAttribute('colspan', 14);
                }
                td.appendChild(document.createTextNode(lang.de.basherpoints));
            tr.appendChild(td);
            // Value
            td = document.createElement('td');
            if (players[player].bp === 0) {
                td.setAttribute('class', 'hidden');
            }
                td.setAttribute('colspan', 4);
                td.setAttribute('align', 'right');
                td.appendChild(document.createTextNode(getDisplayNumber(players[player].bp)));
            tr.appendChild(td);
            trs[trs.length - 1].parentNode.appendChild(tr);
        }
    }

    /**
     * Displays the balance of the farm.
     *
     * @param lost 'Ressource' The ressources the player losts.
     * @param balance 'Ressource' The balance.
     *
     * @todo recode .... Schöner machen. Schleife + Array für Beschriftungen
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-02
     */
    function display_balance(lost, balance) {
        var result, tr, th, td, span, maximum = 0, percent = 0;
        if(browser.name == 'Firefox') {
            maximum = document.getElementById('attack_results').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].textContent.replace(/[0-9\.]*\//, '').replace('.','');
        }
        else {
            maximum = document.getElementById('attack_results').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerText.replace(/[0-9\.]*\//, '').replace('.','');
        }

        result = document.getElementById('attack_results');
        tr = document.createElement('tr');
            th = document.createElement('th');
                th.appendChild(document.createTextNode(lang.de.balance_lost));
                tr.appendChild(th);
            td = document.createElement('td');
                td.setAttribute('style', 'border-bottom: solid 1px black; width: 220px;');
                    span = document.createElement('span');
                    span.setAttribute('class', 'icon header wood');
                td.appendChild(span);
                td.appendChild(document.createTextNode(getDisplayNumber(lost.wood)));
                    span = document.createElement('span');
                    span.setAttribute('class', 'icon header stone');
                td.appendChild(span);
                td.appendChild(document.createTextNode(getDisplayNumber(lost.stone)));
                    span = document.createElement('span');
                    span.setAttribute('class', 'icon header iron');
                td.appendChild(span);
                td.appendChild(document.createTextNode(getDisplayNumber(lost.iron)));
            tr.appendChild(td);
            td = document.createElement('td');
                td.setAttribute('style', 'border-bottom: solid 1px black;');
                td.appendChild(document.createTextNode(getDisplayNumber(lost.get_sum())));
            tr.appendChild(td);
        insertAfter(tr, result.getElementsByTagName('tr')[0]);

        tr = document.createElement('tr');
            th = document.createElement('th');
                th.appendChild(document.createTextNode(lang.de.total));
                tr.appendChild(th);
            td = document.createElement('td');
                td.setAttribute('style', 'border-bottom: double 4px black; width: 220px;');
                    span = document.createElement('span');
                    span.setAttribute('class', 'icon header wood');
                td.appendChild(span);
                    span = document.createElement('span');
                    if (balance.wood < 0) {
                        span.setAttribute('style', 'color:red;');
                    }
                    span.appendChild(document.createTextNode(getDisplayNumber(balance.wood)));
                td.appendChild(span);
                    span = document.createElement('span');
                    span.setAttribute('class', 'icon header stone');
                td.appendChild(span);
                    span = document.createElement('span');
                    if (balance.stone < 0) {
                        span.setAttribute('style', 'color:red;');
                    }
                    span.appendChild(document.createTextNode(getDisplayNumber(balance.stone)));
                td.appendChild(span);
                    span = document.createElement('span');
                    span.setAttribute('class', 'icon header iron');
                td.appendChild(span);
                    span = document.createElement('span');
                    if (balance.iron < 0) {
                        span.setAttribute('style', 'color:red;');
                    }
                    span.appendChild(document.createTextNode(getDisplayNumber(balance.iron)));
                td.appendChild(span);
            tr.appendChild(td);
            td = document.createElement('td');
                style = '';
                if (balance.get_sum() < 0) {
                    style = 'color:red;';
                }
                td.setAttribute('style', 'border-bottom: double 4px black;' + style);
                td.appendChild(document.createTextNode(getDisplayNumber(balance.get_sum())));
                    percent = balance.get_sum() / (maximum / 100);
                    style = '';
                    if (percent == 100) {
                        style += 'color: #25D93F;';
                    }
                    else if (percent > 75) {
                        style += 'color: #1A993A;';
                    }
                    else if (percent < 0) {
                        style += ' color: red;';
                    }
                    else if (percent < 50) {
                        style += ' color: #FF750A;';
                    }
                    span = document.createElement('span');
                    span.setAttribute('style', 'font-weight: bold; float:right;' + style);
                    span.appendChild(document.createTextNode(kaufm(percent) + '%'));
                td.appendChild(span);

            tr.appendChild(td);
        insertAfter(tr, result.getElementsByTagName('tr')[1]);
    }

    /**
     * Checks if the player has PA.
     *
     * @type boolean
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-04
     */
    function checkForPA() {
//        var menuLinks = document.getElementById('menu_row').getElementsByTagName('a');
//        if (menuLinks[menuLinks.length - 2].textContent === 'Freunde') {
//            return true;
//        }
        return false;
    }

    /**
     * Inserts the lost units into the recruitment.
     *
     * @param recruitment The getPageParameters - result;
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-04
     */
    function insertRecruitment(recruitment) {
        var setFocus = false;
        var unit, formElements;
        for (unit in recruitment.unit) {
            document.getElementById(unit + '_' + recruitment.village).value = recruitment.unit[unit];
            setFocus = true;
        }
        if (setFocus) {
            formElements = document.getElementById('mass_train_form').getElementsByTagName('input');
            formElements[formElements.length - 1].focus();
        }
    }

    /**
     * Get total ressources for elements.
     *
     * @param elements            'object' The elements for that you will generate the total ressources.
     * @param elementInformations 'object' The informations about the elements including the ressources.
     * @return The total ressources.
     * @type Ressources.
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-01
     */
    function get_ressourcesTotal(elements, elementInformations) {
        var ressources = new Ressources([0,0,0,0]);
        var element;
        for (element in elements) {
            ressources.add(elementInformations[element].ressources.get_multiply(elements[element]));
        }
        return ressources;
    }

    /**
     * Get total basherpoints for one palyer.
     *
     * @param lostUnits 'object' The lost units of the player.
     * @param playerTyp 'string' The playertyp, eg. att, def.
     * @param unitInformations 'object' The informations about the units, cointaing the bp.
     * @return The total amount of bashpoints.
     * @type integer
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-05
     */
    function get_basherpoints(lostUnits, playerTyp, unitInformations) {
        var bp = 0;
        for (var unit in lostUnits) {
            if (lostUnits[unit] > 0) {
                bp += unitInformations[unit].bp[playerTyp] * lostUnits[unit];
            }
        }
        return bp;
    }

    /**
     * Get the player from the weboage.
     *
     * @param type 'string' att or def
     * @return the player.
     * @type Player
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-01
     */
    function get_player(type) {
        if (type !== 'att' && type !== 'def') {
            throw 'read_player: player has to be a string with one of the following values: "att", "def"!';
        }
        var player = {name: '', village: ''};
        var table = document.getElementById('attack_info_' + type);
        if (table === null) {
            return player;
        }
        var tr = table.getElementsByTagName('tr');
        var name = tr[0].childNodes[1].textContent;
        var village =tr[1].childNodes[1];
        var active = false;
        if (browser.getValue(set.storageprefix + 'player_name') === name) {
            active = true;
        }

        return new Player(name, active, get_village(village),  get_units(type));
    }

    /**
     * Get the village from the webpage.
     *
     * @param village 'string' The village as string as it is on the webpage.
     * @return The Village-Object
     * @type Village
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-01
     */
    function get_village(village) {
        var params = getPageParameters(village.getElementsByTagName('a')[0].getAttribute('href'));
        var name = village.childNodes[0].textContent.match(/^[\D\d]+(?=\(\d{1,3}\|\d{1,3}\) K\d{1,2})/)[0]
        var coordinates = village.childNodes[0].textContent.match(/\(\d{1,3}\|\d{1,3}\) K\d{1,2}$/)[0].match(/\d+/g);
        var id = params['id'];
        return new Village(name, new Coordinate(coordinates[0], coordinates[1]), id);
    }

    /**
     * Get all units for one player.
     *
     * @param type 'string' att or def.
     * @return The units for the player. anzahl: {}, verluste: {}
     * @type object
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-01
     */
    function get_units(type) {
        if (type !== 'att' && type !== 'def') {
            throw 'read_units: player has to be a string with one of the following values: "att", "def"!';
        }

        var units = {
            anzahl  : {},
            verluste: {}
        };
        var html = document.getElementById('attack_info_' + type + '_units');
        var tr, trChilds;
        var i = 0, iMax = 0, j = 0, jMax = 0;
        var existingUnits = [];

        if (html === null) {
            return units;
        }
        tr = html.getElementsByTagName('tr');
        for (i = 1, iMax = tr[0].getElementsByTagName('td').length; i < iMax; i++) {
            existingUnits.push(tr[0].getElementsByTagName('td')[i].getElementsByTagName('img')[0].getAttribute('title'));
        }
        for (i = 1, iMax = tr.length; i < iMax; i++) {
            trChilds = tr[i].getElementsByTagName('td');
            for (j = 1, jMax = trChilds.length; j < jMax; j++) {
                units[trChilds[0].textContent.substr(0, trChilds[0].textContent.length - 1).toLowerCase()][existingUnits[j - 1]] = parseInt(trChilds[j].textContent, 10);
            }
        }
        return units;
    }

    /**
     * Get the haul.
     *
     * @return The haul.
     * @type Ressource
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-02
     */
    function get_haul() {
        var haulHTML, imgs, i = 0, max = 0;
        haulHTML = document.getElementById('attack_results').getElementsByTagName('tr')[0].getElementsByTagName('td')[0];
        imgs = haulHTML.getElementsByTagName("img");
        haulHTML = haulHTML.innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split(" ");
        for (i = 0, max = imgs.length; i < max; i++) {
            haulObject[imgs[i].getAttribute('title')] = parseInt(haulHTML[i], 10);
        }
        return new Ressources([haulObject.Holz, haulObject.Lehm,haulObject.Eisen,0]);
    }

    /**
     * Get the other playertyp.
     *
     * @param playerTyp 'string' The playertyp.
     * @return The other player.
     * @type string
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-05
     */
    function get_otherPlayerTyp(playerTyp) {
        var newPlayerTyp = 'att';
        if (playerTyp === 'att') {
            newPlayerTyp = 'def';
        }
        return newPlayerTyp;
    }

    /**
     * Generates readable numbers. (Not working with decimal places yet!)
     *
     * @param number 'integer' The number that should be readable
     * @return the readable number.
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     */
    function getDisplayNumber(number) {
        number = number.toString();
        var showNumber = '', i = 0, length = 0;
        for (i = 3, length = number.length; i < length; i = i + 3) {
            if (number.substr(length - i -1, 1) === '-') {
                break;
            }
            showNumber = '.' + number.substr(length - i, 3) + showNumber;
        }
        showNumber = number.substr(0, (length - (i - 3))) + showNumber;
        if (!showNumber) {
            showNumber = number;
        }
        return showNumber;
    }

    /**
     *
     * @author http://www.dcljs.de/faq/antwort.php?Antwort=rechnen_runden
     */
    function kaufm(x) {
        var k = (Math.round(x * 100) / 100).toString();
        k += (k.indexOf('.') == -1)? '.00' : '00';
        var p = k.indexOf('.'), m = k.indexOf('-.');
        var f = (p == 0 || m == 0)? '0,' : ',';
        return k.substring(0, p) + f + k.substring(p+1, p+3);
    }

    /**
     * Splits the location.search into an object.
     *
     * @param pageParameters The search.
     * @return an Object with the pageparameter.
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-04
     */
    function getPageParameters(pageParameters) {
        pageParameters = pageParameters.substr(1).split('&');
        var pageParams = {};
        var parameters = [];
        var i, parameter, arrayElement, arrayName;
        for (i = 0, parameter; parameter = pageParameters[i]; i++) {
            parameters[i] = parameter.split('=');
        }
        for (i = 0, parameter; parameter = parameters[i]; i++) {
            if (parameter[0].search(/\[\w+\]/) !== -1) {
                arrayName = parameter[0].match(/\w+\[/).toString().trim();
                arrayElement = parameter[0].match(/\[\w+\]/).toString().trim();
                arrayElement = arrayElement.substr(1, arrayElement.length - 2);
                arrayName = arrayName.substr(0, arrayName.length - 1);
                if (pageParams[arrayName] === undefined) {
                    pageParams[arrayName] = {};
                }
                pageParams[arrayName][arrayElement] = parameter[1];
            }
            else {
                pageParams[parameter[0]] = parameter[1];
            }
        }
        return pageParams;
    }

    /**
     * Get the Browser.
     *
     * @return Browser (Chrome, Safari, Firefox, Opera, IE) IF no browser is detected it returns false.
     * @type object
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-01
     */
    function getBrowser() {
        var Browser = function(name) {
            this.name = name.toString();
            return this;
        };
        if (navigator.userAgent.match(/Firefox/)) {
            Browser.prototype = {
                'setValue': function (key, value) {
                    return GM_setValue(key, value);
                },
                'getValue': function (key) {
                    return GM_getValue(key);
                },
                'removeValue': function(key) {
                    return GM_deleteValue(key);
                }
            };
            return new Browser('Firefox');
        }
        Browser.prototype = {
                'setValue': function (key, value) {
                    return localStorage.setItem(key, value);
                },
                'getValue': function (key) {
                    return localStorage.getItem(key);
                },
                'removeValue': function(key) {
                    return localStorage.removeItem(key);
                }
            };
        if (navigator.userAgent.match(/Chrome/)) {
            return new Browser('Chrome');
        }
        if (navigator.userAgent.match(/Safari/)) {
            return new Browser('Safari');
        }
        if (navigator.userAgent.match(/Opera/)) {
            return new Browser('Opera');
        }
        if (navigator.userAgent.match(/MSIE/)) {
            return new Browser('IE');
        }
        return false;
    }

    /**
     * Insert the newChild after the refChild.
     * @author Fotiman http://www.webmasterworld.com/javascript/3304115.htm
     */
    function insertAfter(newChild, refChild) {
        refChild.parentNode.insertBefore(newChild,refChild.nextSibling);
    }

    /**
     * Inserts the CSS into the head-tag.
     *
     * @param selector 'string' The css-selector.
     * @param css      'string' The css-rule.
     *
     * @author Layne Obserdia < layne.obserdia@gmail.com >
     * @since 2010-09-02
     */
    function insertCss(selector, css) {
        var head, cssContent;
        head = document.getElementsByTagName('head')[0];
        cssContent = document.createTextNode(selector + '{' + css + '}');
        css = document.createElement('style');
        css.setAttribute('type', 'text/css');
        css.appendChild(cssContent);
        head.appendChild(css);
    }
})();