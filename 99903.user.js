// ==UserScript==
// @name            Travian: normalizing production
// @namespace       org.foogle.travian
// @description     This script normalizes the resource production by using predefined rates
// @author          r0ute
// @version         0.0.9
// @updateURL       http://userscripts.org/scripts/source/99903.meta.js
// @downloadURL     https://userscripts.org/scripts/source/99903.user.js
// @include         http://*.travian.*/dorf1.php*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require         https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @icon            http://travian.com/favicon.ico
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_addStyle
// ==/UserScript==

var DISTRIBUTION_OF_PRODUCTION = [
    ['all', [
        ['normal', [10, 12, 8, 6]]
    ]],
    ['romans', [
        ['legionnaire', [6, 5, 8, 2]],
        ['praetorian', [10, 13, 16, 7]],
        ['imperian', [15, 16, 21, 8]],
        ['equitesLegati', [7, 8, 1, 2]],
        ['equitesImperatoris', [55, 44, 32, 10]],
        ['equitesCaesaris', [55, 64, 80, 18]],
        ['batteringRam', [90, 36, 50, 7]],
        ['fireCatapult', [95, 135, 60, 9]]
    ]],
    ['teutons', [
        ['clubswinger', [19, 15, 8, 8]],
        ['spearman', [29, 14, 17, 8]],
        ['axeman', [13, 12, 17, 7]],
        ['scout', [16, 10, 5, 5]],
        ['paladin', [74, 54, 58, 15]],
        ['teutonicKnight', [90, 103, 96, 16]],
        ['ram', [100, 30, 35, 7]],
        ['catapult', [45, 60, 30, 3]]
    ]],
    ['gauls', [
        ['phalanx', [20, 26, 11, 6]],
        ['swordsman', [28, 30, 37, 12]],
        ['pathfinder', [17, 15, 2, 4]],
        ['theutatesThunder', [35, 45, 23, 6]],
        ['druidrider', [36, 33, 28, 12]],
        ['haeduan', [100, 124, 135, 34]],
        ['ram', [190, 111, 66, 15]],
        ['trebuchet', [96, 145, 63, 9]]
    ]]
];

var MESSAGES = {
    en: {
        all: 'All',
                
        // tribes
        romans: 'Romans',
        teutons: 'Teutons',
        gauls: 'Gauls',
        
        normal: 'Normal',
        
        // Roman troops
        legionnaire: 'Legionnaire',
        praetorian: 'Praetorian',
        imperian: 'Imperian',
        equitesLegati: 'Equites Legati',
        equitesImperatoris: 'Equites Imperatoris',
        equitesCaesaris: 'Equites Caesaris',
        batteringRam: 'Battering Ram',
        fireCatapult: 'Fire Catapult',

        // Teutonic troops
        clubswinger: 'Clubswinger',
        spearman: 'Spearman',
        axeman: 'Axeman',
        scout: 'Scout',
        paladin: 'Paladin',
        teutonicKnight: 'Teutonic Knight',
        ram: 'Ram',
        catapult: 'Catapult',        

        // Gallic troops
        phalanx: 'Phalanx',
        swordsman: 'Swordsman',
        pathfinder: 'Pathfinder',
        theutatesThunder: 'Theutates Thunder',
        druidrider: 'Druidrider',
        haeduan: 'Haeduan',
        trebuchet: 'Trebuchet',

        // other
        changeResourceProduction: 'Change resource production',
        options: 'Options'
    },
    ru : {
        all: 'Все',
                
        // tribes
        romans: 'Римляне',
        teutons: 'Германцы',
        gauls: 'Галлы',
        
        normal: 'Нормальное',
        
        // Roman troops
        legionnaire: 'Легионер',
        praetorian: 'Преторианец',
        imperian: 'Империанец',
        equitesLegati: 'Конный разведчик',
        equitesImperatoris: 'Конница императора',
        equitesCaesaris: 'Конница Цезаря',
        batteringRam: 'Таран',
        fireCatapult: 'Огненная катапульта',

        // Teutonic troops
        clubswinger: 'Дубинщик',
        spearman: 'Копьеносец',
        axeman: 'Топорщик',
        scout: 'Скаут',
        paladin: 'Паладин',
        teutonicKnight: 'Тевтонская конница',
        ram: 'Таран',
        catapult: 'Катапульта',
        
        // Gallic troops
        phalanx: 'Фаланга',
        swordsman: 'Мечник',
        pathfinder: 'Следопыт',
        theutatesThunder: 'Тевтатский гром',
        druidrider: 'Друид-всадник',
        haeduan: 'Эдуйская конница',
        trebuchet: 'Требушет',
        
        // other
        changeResourceProduction: 'Распределение производства ресурсов',
        options: 'Опции'
    }
};

var JQUERY_UI_CSS = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.min.css';

/**
 * Provides message access.
 * @param {Object} messages the message strings
 * @returns {MessageSource}
 */
function MessageSource(messages) {
    
    /**
     * Returns localized message.
     * @param {String} code the message code
     * @param {String} lang the message language
     * @return {String} localized message
     */
    this.getMessage = function(code, lang) {
        lang = messages.hasOwnProperty(lang) ? lang : 'en'; // english by default
        return messages[lang][code];
    };
}

/**
 * Abstract player info.
 * @returns {PlayerInfo}
 */
function PlayerInfo() {
    this.getPlayerId = null;
    this.getTribeId = null;
    this.getVillageId = null;
}

/**
 * Supports T4 info.
 * @returns {PlayerInfoT4}
 */
function PlayerInfoT4() {
    this.getPlayerId = function() {
      return $('#side_info .sideInfoPlayer a.signLink').attr('href')
              .match(/uid=(\d+)/)[1];
    };
    
    this.getTribeId = function() {
        return $('#side_info .sideInfoPlayer img').attr('class')
                .match(/\d/)[0];
    };
    
    this.getVillageId = function() {
        return $('#villageList ul > li.active a').attr('href')
                .match(/\d+/)[0];
    };
}

PlayerInfoT4.prototype = new PlayerInfo();
PlayerInfoT4.prototype.constructor = PlayerInfoT4;

/**
 * Supports T4.2 info.
 * @returns {PlayerInfoT42}
 */
function PlayerInfoT42() {
    this.getPlayerId = function() {
        return $('#sidebarBoxHero .heroImage').attr("src")
            .match(/uid=(\d+)/)[1];
    };
    
    this.getTribeId = function() {
        return $('#sidebarBoxHero .playerName img').attr('class')
                .match(/\d/)[0];
    };
    
    this.getVillageId = function() {
        return $('#sidebarBoxVillagelist ul > li.active a').attr('href')
                .match(/\d+/)[0];
    };
}

PlayerInfoT42.prototype = new PlayerInfo();
PlayerInfoT42.prototype.constructor = PlayerInfoT42;

/**
 * Contains common game information.
 * @param {MessageSource} messages the msg source
 */
function Game(messages) {
    
    /**
     * Produces player info.
     * @param {type} version the game version
     * @returns {PlayerInfo|PlayerInfoT4|PlayerInfot42}
     */
    this.producePlayerInfo = function(version) {
        var info = new PlayerInfo();
        
        switch (true) {
            case (version == 4.0):
                info = new PlayerInfoT4();
                break;
            case (version >= 4.2):
                info = new PlayerInfoT42();
                break;
            default:
                var err = new Error('Unsupported game version: ' + version);
                console.error(err.message);
                throw err;
        }
        
        return info;
    }    
    
    /*
     * Initialize
     */
    var version, worldId;

    // get travian info
    this.version = parseFloat(unsafeWindow.Travian.Game.version);
    this.worldId = unsafeWindow.Travian.Game.worldId;
    
    console.info("Travian info: version=%f, worldId=%s", this.version, this.worldId);

    // get player info
    var playerInfo = this.producePlayerInfo(this.version);
    this.playerId = playerInfo.getPlayerId();
    this.tribeId = playerInfo.getTribeId();
    this.villageId = playerInfo.getVillageId();
    
    console.info("Player info: playerId=%i, tribeId=%i, villageId=%i", this.playerId, this.tribeId, this.villageId);
    
    this.messages = messages;
}

 /**
  * Script settings.
  * @param {Game} game the game info
  * @return {Settings}
  */
function Settings(game) {
    
    var INSTANCE_SETTING_DELIMITER = ':';
    var DISTR_SETTING_DELIMITER = ',';
    
    /**
     * Save specified settings.
     * @param {String} packedSettings the string representation of settings
     */
    this.save = function(packedSettings) {
        this.set(packedSettings);
        GM_setValue(this.instanceId, packedSettings);
    };    

    /**
     * Set specified settings.
     * @param {String} packedSettings the string representation of settings
     * @throws {Error} when the setting format is invalid
     */
    this.set = function(packedSettings) {
        var settings = packedSettings.split(DISTR_SETTING_DELIMITER, 2);
        // parse settings
        if (settings.length === 2) {
            this.tribeId = parseInt(settings[0]);
            this.rateId = parseInt(settings[1]);
        } else { // we got invalid settings
            throw new Error('Invalid settings format.');
        }
    };
    
    /**
     * Pack settings into special format.
     * @param {Number} tribeId the tribe identificatior
     * @param {Number} rateId the rate identificatior
     * @return {String} the string representation of settings
     */
    this.pack = function(tribeId, rateId) {
        return [tribeId, rateId].join(DISTR_SETTING_DELIMITER);
    };
    
    /**
     * Returns packed settings.
     * @return {String} the string representation of settings
     */
    this.getPacked = function() {
        return this.pack(this.tribeId, this.rateId);
    };
    
    this.getMessage = function(code) {
        return game.messages.getMessage(code, this.language);
    };

    /*
     * Initialize
     */
    this.instanceId = [game.worldId, game.playerId, game.villageId].join(INSTANCE_SETTING_DELIMITER);
    this.language = navigator.language.substring(0, 2).toLowerCase();
    this.ingameTribeId = game.tribeId;
    
    // init settings
    this.set(GM_getValue(this.instanceId, this.pack(0, 0)));
}

/**
 * Hepler class to get appropriate production rate icon.
 * @returns {IconBuilder}
 */
function IconBuilder() {
    
    var UNITS_PER_TRIBE = 10;
    var RESOURCE_CLASSES  = "r";
    var TRIBE_CLASSES = "unit u";
    
    /**
     * Returns rate icon.
     * @param {Number} tribeId the tribe identificator
     * @param {Number} rateId the production rate identificator
     * @return {String} icon element
     */
    this.build = function(tribeId, rateId) {
        var cssClass = (tribeId)
            ? TRIBE_CLASSES + (tribeId * UNITS_PER_TRIBE - UNITS_PER_TRIBE + rateId + 1)
            : RESOURCE_CLASSES + (tribeId);
        return '<img class="prod-icon ' + cssClass + '" src="img/x.gif"/>';
    };
}

/**
 * Script options dialog.
 * @param {Production} production the resource production
 * @returns {OptionsDialog}
 */
function OptionsDialog(production) {
    /**
     * Open dialog
     */
    this.open = function() {
        this.dialog.dialog('open');
    };
    
    /**
     * Close dialog
     */
    this.close = function() {
        this.dialog.dialog('close');
    };

    /*
     * Initialize
     */
    var self = this;
    
    this.iconBuilder = new IconBuilder();
    
    this.dialog = $('<div id="dialog-options" title="'
            + production.settings.getMessage('changeResourceProduction')
            + '"><div id="accordion">' + initOptions() + '</div></div>')
            .appendTo('body')
            .dialog({
        autoOpen: false,
        modal: true,
        dialogClass: 'product-opts-dlg',
        resizable: false,
        position: 'top+60',
        close: function() {
            production.change($('input:radio:checked', this).val());
        }
    }).tooltip({
        position: {
            my: 'left+10',
            at: 'right'
        }
    });
    
    $('#accordion').accordion({
        animate: 'easeOutQuint',
        heightStyle: 'content',
        event: 'mouseover',
        active: +Boolean(production.settings.tribeId)
    });

    // set initial option
    $('input:radio', this.dialog).each(function() {
        var checked = $(this).val() === production.settings.getPacked();
        $(this).prop('checked', checked)
            .button();
    
        if (checked) {
            $(this).button('enable');
        }
    });

    function initOptions() {
        return initOption() + ((production.settings.ingameTribeId) ? initOption(production.settings.ingameTribeId) : '');
    }

    function initOption(tribeId) {
        tribeId = tribeId || 0;
        var option = '<h3><a href="#">' + production.settings.getMessage(production.distribution[tribeId][0]) + '</a></h3><div>';

        for (var ind = 0; ind < production.distribution[tribeId][1].length; ind++) {
            var id = 'rate-' + tribeId + '-' + ind;
            
            option += '<input id="' + id + '" class="option-distribution" type="radio" name="distribution" value="'
                    + production.settings.pack(tribeId, ind) + '"/>'
                    + '<label for="' + id + '" title="' + production.distribution[tribeId][1][ind][1].join(' / ') + '" class="prod-lbl">'
                    + self.iconBuilder.build(tribeId, ind)
                    + production.settings.getMessage(production.distribution[tribeId][1][ind][0]) + '</label><br/>';
        }

        option += '</div>';
        
        return option;
    }
    
    $('input[type=radio][name=distribution]', this.dialog).click(function() {
        self.close();
    });
};

/**
 * Production of resources
 * @param {Object} distribution the distribution of resource production
 * @param {Settings} settings the script settings
 * @returns {Production}
 */
function Production(distribution, settings) {
    /**
     * Return the name of current dustibution
     */
    this.getDistributionName = function() {
        return settings.getMessage(distribution[settings.tribeId][1][settings.rateId][0]);
    };

    /**
     * Change distribution
     * @param {String} packedSettings the string representation of settings
     */
    this.change = function(packedSettings) {
        settings.save(packedSettings);
        this.calculate();
        $(this.distributionName).text(this.getDistributionName());
    };
    
    /**
     * Set delta tooltip.
     * @param {DOMElement} element 
     * @param {Integer} difference
     */
    this.setDelta = function(element, difference) {
        // text represenatation of difference value
        var delta;

        switch (true) {
            case (difference > 0):
                delta = '+'.concat(difference);
                break;
            case (difference < 0):
                delta = '&minus;'.concat(Math.abs(difference));
                break;
            default:
                delta = difference;
        }

        delta = $.text($.parseHTML('&Delta; = '.concat(delta)));
        $(element).prop('title', delta);
    };
    
    this.setProgress = function(element, difference, maxDifference) {
        $('.progress', element).progressbar('option', 'max', maxDifference)
                .progressbar('option', 'value', Math.abs(difference));
    };

    /**
     * Calculate distribution
     */
    this.calculate = function() {
        var calculation = [[/*resource*/], [/*count*/], [/*distribution*/], [/*coefficient*/], [/*difference*/]];

        console.group('Production');
        
        $(this.resources).each(function(index) {
            calculation[0][index] = $(this);
            calculation[1][index] = parseInt($('td.num', this).text().match(/\d+/)[0]);
            calculation[2][index] = distribution[settings.tribeId][1][settings.rateId][1][index];
            calculation[3][index] = calculation[1][index] / calculation[2][index];
        });
        
        var min = calculation[3].min();
        // nearest value in array of coefficients
        var nearest = calculation[3].near(min);
        
        $.each(calculation[0], function(index) {
            // calculate difference between optimal and current production
            calculation[4][index] = Math.round(calculation[1][index] - nearest * calculation[2][index]);
            
            console.log('%s total=%i, rate=%i, coeff=%f, diff=%i', $('td.res', this).text().trim(), calculation[1][index],
                calculation[2][index], calculation[3][index], calculation[4][index]);
        }); 
        
        console.groupEnd();
        
        var minDiff = calculation[4].min();
        var maxDiff = calculation[4].max();
        var maxAbsDiff = calculation[4].maxAbs();
        
        var self = this;
        
        $.each(calculation[0], function(index) {
            var difference = calculation[4][index];
            
            $(this).toggleClass('resource-deficit', difference === minDiff && difference !== 0)
                    .toggleClass('resource-surplus', difference === maxDiff && difference !== 0);
            
            self.setDelta(this, difference);
            self.setProgress(this, difference, maxAbsDiff);
        });
    };

    /*
     * Initialize
     */
    var self = this;
    this.distribution = distribution;
    this.settings = settings;

    var production = $('#production');
    this.resources = $('tbody > tr', production);
    
    var container = $('<tr>').prependTo($('thead', production));
    // add Options button; force override .ui-state-default style
    $('<button id="production-options">')
        .text(settings.getMessage('options'))
        .appendTo(container)
        .wrap('<th/>')
        .button({
            icons: {
                primary: 'ui-icon-gear'
            },
            text: false
        }).click(function() {
            self.options = self.options || new OptionsDialog(self);
            self.options.open();
        }).focus(function () {
            $(this).removeClass("ui-state-focus");
        });

    // add distribution name
    this.distributionName = $('<th>')
            .appendTo(container)
            .text(this.getDistributionName());
    
    $(this.resources).each(function(index) {
        // delta tooltips
        $(this).tooltip({
            position: {
                my: 'left+5',
                at: 'right'
            },
            show: 'easeOutQuint',
            hide: 'easeInQuint'
        });
        
        // delta progressbars
        $('<div class="progress">')
                .appendTo($('.res', $(this)))
                .progressbar({
                    max: 10
                });
    });
    
    // and finally calculate distribution
    this.calculate();
};

$(function() {
    var game = new Game(new MessageSource(MESSAGES));
    new Production(DISTRIBUTION_OF_PRODUCTION, new Settings(game));

    GM_addStyle(
        '.option-distribution { margin: 0 10px; } '
        + '.prod-icon { margin-right: 10px; vertical-align: middle; } '
        + '.prod-lbl { margin: 3px 0; } '
        + '.product-opts-dlg { opacity: 0.95; } '
        + '#production .resource-deficit td { color: red; font-weight: bold } '
        + '#production .resource-surplus td { color: green; } '
        + '#production-options { border: 0; margin: 0; width: 25px; margin: 0 2px; } '
        // progressbar
        + '#production .progress { height: 2px; } '
        + '#production .progress .ui-progressbar-value { background: black } '
        + '#production .resource-deficit .progress .ui-progressbar-value { background: red } '
        + '#production .resource-surplus .progress .ui-progressbar-value { background: green } '
        // jquery ui css overrides
        + '.ui-widget { font-size: inherit !important; font-family: inherit !important } '
    );
        
    // we can't use GM_resourceGetText() with jQuery theme because of relative image urls in that css
    addStyle(JQUERY_UI_CSS, true);
});

function addStyle(style, external) {
    ((external)
            ? $('<link type="text/css" rel="stylesheet" href="' + style + '" />')
            : $('<style type="text/css">' + style + "</style>"))
            .appendTo('head');
}

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

Array.prototype.maxAbs = function() {
    return Math.max.apply(null, $.map(this, function(element) {
        return Math.abs(element);
    }));
};

Array.prototype.near = function(value) {
    var hi;

    for (var ind = this.length; ind--; ) {
        if (this[ind] > value && (hi === undefined || hi > this[ind])) {
            hi = this[ind];
        }
    }

    return ((hi === undefined) ? this[0] : hi);
};