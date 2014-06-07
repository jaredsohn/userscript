// ==UserScript==
// @name FB MafiaWars Addon
// @copyright 2010 - David Cabrera
// @version 0.4.2.4
// @description Facebook MafiaWars Tools.
// @include http://userscripts.org/scripts/source/90615.meta.js*
// @include http://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include http://www.connect.facebook.com/widgets/serverfbml.php*
// @exclude http://facebook.mafiawars.com/mwfb/*#*
// @exclude http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=requests*
// @exclude http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=freegifts*
// ==/UserScript==

// Launch app with currect window object
(function(w){MWAddon((typeof(unsafeWindow)!=='undefined')?unsafeWindow:w);})(window);


/**
 * Main
 * @param {Object} unsafeWindow
 */
function MWAddon(unsafeWindow) {

var DEBUG_MODE = false;

var scriptAppInfo = 
{
    appName: 'FB MafiaWars Addon',
    appTag: 'FBMafiaWarsAddon_',
    appVer: '0.4.2.4',
    appUrl: 'http://userscripts.org/scripts/show/90615',
    appMeta: 'http://userscripts.org/scripts/source/90615.meta.js',
    appPlugInUrl:'http://dascript.bravehost.com/MafiaWars/chrome/FBMWAddonPlugin.crx',
    appUpdateInterval: 6
};

var Base64 = function () {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    /**
     * private method for UTF-8 encoding
     * 
     * @private
     * @param {String} string
     * @return {String}
     */
    var _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        
        for (var n = 0; n < string.length; n++) {
        
            var c = string.charCodeAt(n);
            
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    /**
     * private method for UTF-8 decoding
     * 
     * @private
     * @param {String} utftext
     * @return {String}
     */
    var _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = 0, c1 = 0, c2 = 0, c3 = 0;
        
        while (i < utftext.length) {
        
            c = utftext.charCodeAt(i);
            
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };  
    /**
     * Public method for encode
     * 
     * @param {String} input
     * @return {String}
     */
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = _utf8_encode(input);
        
        while (i < input.length) {
        
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            
            output = output +
            _keyStr.charAt(enc1) +
            _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) +
            _keyStr.charAt(enc4);
            
        }
        return output;
    };
    /**
     * Public method for decode
     * 
     * @param {String} input
     * @return {String}
     */
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        
        while (i < input.length) {
        
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            
            output = output + String.fromCharCode(chr1);
            
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
            
        }
        output = _utf8_decode(output);
        return output;
    };
    
    return this;
};

/**
 * Creates a Config object that save/load data in json string format.
 * 
 * @constructor
 * @param {String} name 
 *     Used for set/get from elements (element.id = name + defOptions.var_name)
 * @param {Array} defOptions Array of key => value pairs.
 * @return {Config}
 */
var Config = function(elementKey, options) {
    var appPath = scriptAppInfo.appTag + elementKey;
    var self = this;
    
    var toGood = function(value, def) {
        switch (typeof(def)) {
            case 'string'  : return typeof(value)!=='object' ? String(value) : def;
            case 'number'  : return typeof(value)!=='object' ? parseInt(value) : def;
            case 'boolean' : return value === true;
            default: return typeof(value)===typeof(def) ? value : def;
        }
    };
    this.all = options;
    this.loadConfig = function(opts) {
        if (!Util.isSet(opts)) return;
        $.each(opts, function(name, value){
            if ( Util.isSet(options[name]) ) {
                options[name] = toGood(value, options[name]);
            }
        });
    };
    this.loadJSON = function(str) {
        if (!str) return;
        this.loadConfig($.parseJSON(str));
    };
    this.each = function(fn) {
        $.each(options, fn);
    };
    this.get = function(key) {
        return options[key];
    };
    this.set = function(key, new_value) {
        options[key] = toGood(new_value, options[key]);
    };
    this.save = function(callback) {
        setTimeout(function() {
            // log$('saving: ('+appPath+')'+$.toJSON(options));
            GM_setValue(appPath, $.toJSON(options));
            if (typeof callback == 'function')
                callback.apply(self);
        }, 0);
    };
    this.load = function(callback) {
        setTimeout(function() {
            self.loadJSON(GM_getValue(appPath, null));
            // log$('loaded ('+appPath+'): '+GM_getValue(appPath, 'null'));
            if (typeof callback == 'function')
                callback.apply(self);
        }, 0);
    };
    this.toDomElements = function() {
        $.each(options, function(name, value) {
            self.setToElement(name);
        });
    };
    this.fromDomElements = function() {
        $.each(options, function(name, value) {
            self.getFromElement(name);
        });
    };  
    this.setToElement = function(name) {
        var elem = e$('#' + elementKey +'_'+ name.toLowerCase());
        if (elem == null) 
            return;
            
        if (elem.is('input:checkbox')) {
            elem[0].checked = this.get(name);
        }
        else if (elem.is('select[multiple]')) {
            elem.empty();
            $.each(this.get(name), function(name, value) {
                elem.append(c$('option', 'value:'+name).text(value));
            });
        }
        else if (elem.attr('name') === 'checkboxlist') {
            $.each(this.get(name), function(name, value) {
                elem.find('input#'+name)[0].checked = value;
            });
        }
        else {
            elem.val(this.get(name));
        }
        
    };
    this.getFromElement = function(name) {
        var elem = e$('#' + elementKey +'_'+ name.toLowerCase());
        if (elem == null) 
            return;
        
        if (elem.is('input:checkbox')) {
            this.set(name, elem.get(0).checked);
        }
        else if (elem.is('select[multiple]')) {
            var arr = {};
            elem.children().each(function(index,opt){
                arr[opt.value] = $(opt).text();
            });
            this.set(name, arr);
        }
        else if (elem.attr('name') === 'checkboxlist') {
            var arr = {};
            elem.find('input:checkbox').each(function(index,ch){
                arr[ch.id] = ch.checked;
            });
            this.set(name, arr);
        }
        else {
            this.set(name, elem.val());
        }
    };
    return this;
};

/**
 * Create a new Mafia Member.
 * @param {Object} data
 * @return {MafiaMember}
 */
var MafiaMember = function(data) {
    this.uid          = data.uid;
    this.name         = data.name ? global.Base64.decode(data.name) : '';
    this.level        = data.level;
    this.first_name   = data.first_name ? global.Base64.decode(data.first_name) : '';
    this.profile_pic  = data.profile_pic;
    this.profile      = MW.getProfileLink(data.uid);
    return this;
};

/**
 * Create e new Mafia Members Collection.
 * @param {Array} data
 * @return {MafiaMemberCollection}
 */
var MafiaMemberCollection = function() {
    var members = new Object();
    
    /**
     * @param {Number, String} pid
     * @return {Boolean}
     */
    this.exists = function(pid) {
        return Util.isSet(members[pid]);
    };
    /**
     * @param {Number, String} pid
     * @return {MafiaMember}
     */
    this.get = function(pid) {
        return members[pid];
    };
    this.add = function(data) {
        log$('MafiaMemberCollection.add: ' +data.length);
	    for (var i = 0; i < data.length; i++) {
            try {
                members[data[i].uid] = new MafiaMember(data[i]);
            }
            catch(err) {
                log$('ERROR parsing:\n'+Util.toJSON(data[i]));
            }
	    }
    }
    
    return this;
};

/**
 * Create a new Collection object.
 * @param {Object, Array} array_object
 * @return {Collection}
 */
var Collection = function(array_object) {
    var currentPos = 0;
    var Items, Keys, move_callback, end_callback;
    
    function MoveEvent() {
        if (Util.isFunc(move_callback)) {
            move_callback(currentPos, Keys[currentPos], Items[currentPos]);
        }
    }
    function EndEvent() {
        if (Util.isFunc(end_callback)) {
            end_callback();
        }
    }
    
    /**
     * callback( pos, key, item )
     */
    this.onMove = function(callback) {
        move_callback = callback;
    };
    /**
     * callback()
     */
    this.onEnd = function(callback) {
        end_callback = callback;
    };
    // Move Actions
    this.MoveFirst = function() {
        currentPos = 0;
        MoveEvent();
    };
    this.MoveNext = function() {
        currentPos++;
        if ( currentPos < Items.length ) {
            MoveEvent();
        }
        else {
            EndEvent();
        }
        return null;
    };
    this.MovePrevious = function() {
        currentPos--;
        if ( currentPos > 0 ) {
            MoveEvent();
        }
        else {
            EndEvent();
        }
        return null;
    };
    this.MoveLast = function() {
        currentPos = Items.length-1;
        MoveEvent();
    };
    this.clear = function() {
        Items = null;
        Keys = null;
        move_callback = null;
        end_callback = null;
    };
    this.setArray = function(arr) {
        Keys = new Array();
        Items = new Array();
        for (var i in arr) {
            Keys.push(i);
            Items.push(arr[i]);
        }
        currentPos = 0;
    };
    
    if ( array_object ) { this.setArray(array_object); }
    return this;
};

/**
 * Create a Countdown timer.
 * @param {Object} selector
 * @param {Number} time_left
 * @param {Function} onFinish
 * @return {Countdown}
 */
var Countdown = function( selector, callback, text ) {
    var interval_id;
    var self = this;
    if (!text) text = '';
    /**
     * Start this countdown.
     * @param {Number} delay Seconds
     */
    this.start = function(delay) {
	    interval_id = setInterval(function() {
            var elem = e$(selector);
            if ( elem ) {
	            delay--;
	            elem.html(text+' '+Util.toDateString(delay*100)).show();
            } else {
                clearInterval(interval_id);
                return;
            }
	        if (delay < 0) {
	            clearInterval(interval_id);
	            callback && callback();
	        }
	        
	    }, 100);
    };
    /**
     * clear countdown
     */
    this.clear = function() {
        if ( interval_id ) {
            clearInterval(interval_id);
            $(selector).hide();
        }
    };
    return this;
};

/**
 * Global variables
 */
var global = {
    /** @type String  */ USER_ID       : '',
    /** @type String  */ PERSON_ID     : '',
    /** @type Base64  */ Base64        : null,
    /** @type Config  */ options       : null,
    /** @type Object  */ popups        : new Object(),
    /** @type String  */ zGraphicsURL  : 'http://mwfb.static.zynga.com/mwfb/graphics/',
    /** @type String  */ href          : '',
    /** @type Object  */ uri           : new Object(),
    /** @type Boolean */ is_chrome     : false,
    /** @type String  */ plugin_id     : 'hppjlcpgmenflhpooppkbiceomcccoak',
    /** @type Boolean */ xd_support    : false,
    /** @type jQuery  */ final_wrapper : null,
    
    pages: {
        'story_controller': PageJob,
        'job_controller': PageJob,
        'map_controller': PageJobMap,
        'freegifts_controller': PageGift,
        'collection_controller': PageCollection,
        'index_controller': PageIndex
    },
    
    cities: {
        1: 'New York',
        2: 'Cuba',
        3: 'Moscow',
        4: 'Bangkok',
        5: 'Las Vegas',
        6: 'Italy',
        7: 'Brazil'
    },
    
    user_links: {
        profile      : {name:'Profile',       locked:true                                       },
        promote      : {name:'Promote',       locked:true                                       },
        slots        : {name:'Slots',         locked:true                                       },
        crimespree   : {name:'Crime Spree',   req_type:'safehouse'                              },
        masteryboost : {name:'Mastery Boost', req_type:'masteryboost'                           },
        energy       : {name:'Energy Pack',   req_type:'simple', req_name:'energy_pack'         },
        bzcrew       : {name:'Brazil Crew',   req_type:'simple', req_name:'city_crew', city: 7  }
        //scretstash   : {name:'Secret Stash',  req_type:'simple', req_name:'stash_raiders'       }
    },
    
    userStats: {
        'health': function() {
            return unsafeWindow.User.health;
        },
        'max_health': function() {
            return unsafeWindow.User.max_health;
        },
        'energy': function() {
            return unsafeWindow.User.energy;
        },
        'max_energy': function() {
            return unsafeWindow.User.max_energy;
        },
        'stamina': function() {
            return unsafeWindow.User.stamina;
        },
        'max_stamina': function() {
            return unsafeWindow.User.max_stamina;
        },
        'exp_to_next_level': function() {
            return $('#exp_to_next_level').text();
        },
        'healthpercent': function() {
            return parseFloat((unsafeWindow.User.health * 100) / unsafeWindow.User.max_health);
        }
    }
};

var defaults = {
    'checkeduserlinks': {
        profile      : true,
        promote      : true,
        slots        : true,
        crimespree   : true,
        energy       : true,
        bzcrew       : true,
        masteryboost : true
    },
    'giftpage': {
        defaultGroup : 0,
        lastNoteId   : -1,
        persLinks    : true,
        hideGroups   : false, 
        checkedGifts : new Array(),
        mySelections : new Array(),
        today        : 0,
        todayLinks   : new Object()
    },
    'operations': {
        defaultGroup : 0,
        addSlackers  : false,
        today        : 0,
        ignoredOps   : new Object(),
        publishedOps : new Object(),
        todayLinks   : new Object()
    },
    'multigift': {
        delay          : 3,
        giftFav        : [],
        userFav        : [],
        giftPages      : true,
        userPages      : true,
        search         : [],
        hideZeroAmount : true
    },
    'feedstream': {
        maxLogLength               : 50,
        lastPostTime               : 0,
        feedsLimit                 : 100, 
        autoClose                  : false,
        doGotoWar                  : true,
        doGiveSocialHelp           : true,
        doSocialMissions           : false,
        doClaimBonusAndReward      : true,
        doCollectLoot              : true,
        doPropertyHelp             : true,
        doGetBoost                 : true,
        doSendEnergyAndPhones      : true,
        doAcceptGiftEvent          : true,
        doHitlistBounty            : true, 
        helpDelay                  : 3,
        refreshDelay               : 0,
        joinMission                : 0,
        joinMissionAfter           : 0,
        diff_easy                  : false,
        diff_medium                : false,
        diff_hard                  : true,
        diff_event                 : false,
        maxFreeSlots               : 100,
        doClaimBonusAndRewardCfg   : {},
        doGiveSocialHelpCfg        : {},
        doPropertyHelpCfg          : {},
        warFilter                  : false,
        warFilterText              : 'Attack: (5[2-9]|[6-9][0-9])\nDefense: (5[2-9]|[6-9][0-9])',
        collectLootFilter          : false,
        collectLootFilterText      : 'Railguns\nRange Finder Rifles\nMugati Sports',
        missionFilter              : false, 
        missionFilterText          : ''
    },
    'freegifts': {
        sendThanksRequest : true,
        sendBackType      : 0,
        collectNoMafia    : false,
        massSendBack      : false,
        remOnSuccess      : true,
        remOnIgnore       : false,
        useFilter         : false,
        filter            : 'Capsule,Hollow,Coffin,Secret,Exotic,Special,Italian,Marble,Spree',
        useBackGiftFilter : false,
        thanksBackFilter  : '',
        csSelect          : 0,
        csReward          : 0,
        excludedPattern   : 'reached your limit|gold mastery',
        excludedGifts     : new Object(),
        ignoreLimits      : false,
        useExcludedGifts  : true,
        skipSameUser      : true,
        defaultGroup      : 0,
        scanTime          : 4
    },
    'showcraftable': {
        vehicles : false,
        weapons  : false,
        armory   : false,
        zoo      : false
    },
    'collectall': {
        noDelay       : false,
        collectCity1  : true,
        depositCity1  : true,
        collectCity2  : true,
        depositCity2  : true,
        collectCity3  : true,
        depositCity3  : true,
        collectCity4  : true,
        depositCity4  : true,
        collectCity5  : true,
        depositCity5  : true,
        collectCity6  : true,
        depositCity6  : true,        
        collectCity7  : true,
        depositCity7  : true
    },
    'bfopt': {
        maxLogLength        : 250,
        useHeal             : true,
        healIn              : 1,
        healWhen            : 40,
        useBank             : true,
        useBankWhen         : 5000,
        useAttackDelay      : false,
        attackDelay         : 2,
        useNewPlayerDelay   : true,
        newPlayerDelay      : 2,
        autoPublish         : false,
        autoPublishAfter    : 10,
        autoPublishIn       : '', 
        skipLevel           : false,
        skipLevelWay        : 1,
        skipLevelOf         : 1000,
        skipLevelBut        : false,
        skipLevelButWay     : 1,
        skipLevelButMafia   : 501,
        skipMafia           : false,
        skipMafiaWay        : 1,
        skipMafiaOf         : 501,
        skipMafiaBut        : false,
        skipMafiaButWay     : 1,
        skipMafiaButLevel   : 1000,
        skipIfOtherDamage   : false,
        skipIcedPlayers     : true,
        useSkipIfHealt      : false,
        skipIfHealt         : 80,
        addUserToWList      : false,
        cashNeedToGain      : 200000,
        useAttackCount      : false,
        attackCounter       : 11,
        attackWhenLost      : false,
        attackWhenLostBut   : false,
        attackWhenLostButIf : 25,
        skipIced            : true,
        skipDiffCityCash    : false,
        skipMinimalCash     : true,
        minimalCash         : 9000,
        usePowerAttack      : true,
        useNameFilter       : true,
        useFilterRegex      : false,
        nameFilterVal       : '{}[]()$%&#|@\/?*<>',
        showSocialEvents    : false,
        showLootEvents      : true,
        useBlacklist        : true,
        skipNoListedClans   : true,
        stopBeforeLvlUp     : true,
        expLeftToStop       : 50,
        stopWhenStamina     : false,
        stopAfterLevelUp    : false,
        staminaToKeep       : 500,
        skipNoFaction       : true,
        useFactions         : true, 
        bangkokFaction      : 'any',
        useStopWhenIced     : false,
        stopWhenIced        : 10,
        blackList           : new Object(),
        whiteList           : new Object(),
        clanList            : new Object(),
        takeRevenge         : true,
        takeRevengeIfWin    : true,
        forceStartingCity   : false,
        travelWhenNoTargets : false,
        startingCity        : 1,
        fightTime           : false,
        fightTimeout        : 10,
        fightTimeoutResume  : 5,
        fightCityTime       : false,
        fightCityTimeout    : 2,
        keepFigthing        : true,
        resumeDelay         : 5,
        fightInNewYork      : true,
        fightInCuba         : true,
        fightInMoscow       : true,
        fightInBangkok      : true,
        fightInLasVegas     : true,
        fightInItaly        : true,
        fightInBrazil       : true,
        depositIn1          : true,
        depositIn2          : true,
        depositIn3          : true,
        depositIn4          : true,
        depositIn5          : true,
        depositIn6          : true,
        depositIn7          : true
    },
    'plugins': {
        all: new Array()
    },
    'main': {
        groups               : {'0': 'My wall'},            
        // publish configuration 
        privacy              : {'value': 'ALL_FRIENDS'},
        publishPreview       : false,            
        // check updates
        checkForUpdates      : true,
        appLastUpdateCheck   : 0,            
        // bit.ly configuration
        usebitly             : false,
        api_bit_ly_login     : '',
        api_bit_ly_key       : '',            
        // MWaddon features on/off
        opt_PlayerStats      : true,
        opt_JobRates         : true,
        opt_GiftPage         : true,
        opt_CollectionPage   : true,
        opt_HideSocialModule : false,
        // Menu Timers
        menu_timers          : new Object(),            
        // Autodeposit Configuration
        autoDepositIn1       : false, 
        autoDepositAmount1   : 5000,
        autoDepositIn2       : false, 
        autoDepositAmount2   : 5000,
        autoDepositIn3       : false, 
        autoDepositAmount3   : 5000,
        autoDepositIn4       : false, 
        autoDepositAmount4   : 5000,
        autoDepositIn5       : false, 
        autoDepositAmount5   : 5000,
        autoDepositIn6       : false, 
        autoDepositAmount6   : 5000,
        autoDepositIn7       : false, 
        autoDepositAmount7   : 5000
    }
};

var Util = {
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isSet: function(obj) {
        return typeof obj !== 'undefined'; 
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isString: function(obj) {
        return typeof obj === 'string'; 
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isBoolean: function(obj) {
        return typeof obj === 'boolean'; 
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isObject: function(obj) {
        return typeof obj === 'object'; 
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isFunc: function(obj) {
        return typeof obj === 'function';
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isArray: function(obj) {
        if(typeof obj === 'object') {
            return /Array/.test(obj.constructor);
        }
        else {
            return false;
        }
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isNumber: function(obj) {
        return Math.round(obj, 0) === obj;
    },
    /**
     * @param {Object} obj
     * @return {String}
     */
    toJSON: function(obj) {
        return $.toJSON(obj);
    },
    /**
     * @param {Object} obj
     * @return {Number}
     */
    length: function(obj) {
        var e, count = 0;
        for (e in obj) {
            count++;
        }
        return count;
    },
    /**
     * @param {String} text
     * @return {Object}
     */
    parseParam: function(text) {
        text = String(text).replace(/\+/g,'');
        try {
            return $.parseJSON( text );
        }
        catch(err) {
            log$('parseParam ERROR: ' + text);
            return {};
        }
        
    },
    /**
     * @param {Number} num
     * @param {Number} digits
     * @return {String}
     */
    padNum: function(num, digits) {
        if (!this.isNumber(num)) {
            return num;
        }
        if (!this.isNumber(digits)) {
            digits = 2;
        }
        num = num.toString();
        while (digits > num.length) {
            num = '0' + num;
        }
        return num;
    },
    /**
     * @param {Number, String} num
     * @return {String}
     */
    formatNum: function(num) {
        var expr = /(\d+)(\d{3})/, fixed = String(num);
        
        while ( expr.test(fixed) ) {
            fixed = fixed.replace(expr, '$1,$2');
        }
        return fixed;
    },
    /**
     * Return the Date String from the giving milliseconds Number.
     * 
     * @param {Number} ms
     * @return {String}
     */
    toDateString: function(ms) {
        var dateText = '', s, m, h, d;
        if (ms < 0) ms = 0;
        
        s = Math.floor(ms / 100);
        m = Math.floor(s / 60);
        h = Math.floor(m / 60);
        d = Math.floor(h / 24);
        
        dateText += (d > 0 ? d+'d ' : '');
        dateText += ((h=h%24) > 0 ? this.padNum(h)+'h ' : '');
        dateText += ((m=m%60) > 0 ? this.padNum(m) : '00') + 'm ';
        dateText += ((s=s%60) > 0 ? this.padNum(s) : '00') + 's';
        
        return dateText
    },
    /**
     * Return an new object with all url parameters
     * 
     * @param {String} url
     * @return {Object}
     */
     uSplit: function(url) {
        var cUrl = new Object();
        if (!Util.isString(url)) {
            return cUrl;
        }
        try {
            url = url.replace(/&amp;/g, '&');
            url = url.replace(/&quot;/g, '"');
            url = String( url.split('?')[1] );
            
            $.each(url.split('&'), function(index, param) {
                var p;
                if ( (p = param.split('=') ).length === 2) {
                    cUrl[p[0]] = unescape(p[1]);
                }
            });
        }
        catch(err) {
            logErr$(err);
        }
        return cUrl;
    },
    uParse: function(url) {
        var rgx = /^(([^:\/?#]+):)(\/\/([^\/?#]*))([^?#]*)(\?([^#]*))?(#(.*))?/gi;
        var url_params = this.doRgx(rgx, url);
        
        return {
		  scheme    : url_params.$2,
		  authority : url_params.$4,
		  path      : url_params.$5,
		  query     : url_params.$7,
		  fragment  : url_params.$9
        }
    },
    /**
     * Execute a Regular expresion and return and object.
     * 
     * @param {RegExp} rgx
     * @param {String} text
     * @return {Object}
     */
     doRgx: function(rgx, text) {
        var i, r, cRegex = {};
        
        if ( r = rgx.exec(text) ) 
        {
            for (i = 0; i < r.length; i++) {
                cRegex['$'+ i] = r[i];
            }
        }
        return cRegex;
    },
    /**
     * @param {String} text
     * @return {String}
     */
    htmlDecode: function(text) {
        if (!Util.isString(text)) return '';
        try {
            return $.trim(c$('textarea').html(text).val());
        }
        catch(err) {
            logErr$(err);
            return $.trim(unescape(text));
        }
    },
    /**
     * @param {String} text
     * @param {String} color
     * @param {String} [id]
     * @return {String}
     */
    setColor: function(text, color, id) {
        return '<span '+(id?'id="'+id+'" ':'')+'style="color:'+color+';">'+text+'</span>'; 
    },
    /**
     * Return a Hex color string. 
     * @param {String} color
     * @return {String}
     */
    rgbToHex: function(color) {
        if (typeof(color) !== 'string' || color.length < 1) 
            return color;
        
        if (color.charAt(0) !== '#') {
            var rgx, rgb;
            if ((rgx = /rgba?\((\d+)[,\s]*(\d+)[,\s]*(\d+)\)/.exec(color))) {
            
                rgb = 1 << 24 | parseInt(rgx[1]) << 16 | parseInt(rgx[2]) << 8 | parseInt(rgx[3]);
                return '#' + rgb.toString(16).substr(1);
            }
        }
        while (color.length < 7) {
            color += '0';
        }
        return String(color).toLowerCase();
    },
    /**
     * @param {String} string
     * @return {Number}
     */
    parseNum: function(string) {
        if (!Util.isSet(string)) {
            return 0;
        }
        if (!this.isString(string)) {
            return parseInt(string);
        }
        var number_part = string.replace(/\D+/g, '');
        return (number_part.length > 0) ? parseInt(number_part) : 0;
    },
    /**
     * @param {Element, jQuery} elem
     * @return {String}
     */
    textNodes: function(elem) {
        return $(elem).contents().filter(function() {return this.nodeType === 3;}).text();
    },
    /**
     * @param {String} string
     * @param {String} sStart
     * @param {String} sEnd
     * @param {Number} [nStartPos]
     * @param {Number} [nEndPos]
     * @param {Number} [nStartIndex]
     * @return {String}
     */
    substr: function(string, sStart, sEnd, nStartPos, nEndPos, nStartIndex) {
        if ( !(this.isString(string) && this.isString(sStart) && this.isString(sEnd)) ) {
            return string;
        }
        
        nStartPos    = Util.isNumber(nStartPos) ? nStartPos : 0;
        nEndPos      = Util.isNumber(nEndPos)   ? nEndPos   : 0;
        
        var aIndex   = string.indexOf(sStart, nStartIndex) + nStartPos;
        var bIndex   = string.indexOf(sEnd, aIndex) + nEndPos;
        
        return string.substr(aIndex, bIndex - aIndex);
    },
    
    /**
     * @param {jQuery} jQry
     * @return {String}
     */
    toUrl: function(jQry) {
        if (!jQry.length || !jQry.attr) 
            return '';
            
        var url = jQry.attr('href');
        
        if (this.isString(url) && url.match('http')) {
            return url;
        }
        return this.doRgx(/['"](remote[^'"]*)/, jQry.attr('onclick')).$1;
    },
    /**
     * Format a text, uppercase every first letter
     * @param {String} string text to format
     * @return {String}
     */
    formatText: function(string) {
        var letters = String(string).split(/\s/g);
        var outText = '';
        $.each(letters, function(i, l){outText+=l.charAt(0).toUpperCase()+l.substr(1).toLowerCase()+' ';});
        return $.trim(outText);
    },
    /**
     * 
     * @param {Element, jQuery} element
     * @return {String}
     */
    getInputSelectedValue: function(element) {
        var element = $(element)[0];
        if (element.options) {
            return element.options[element.selectedIndex].value;
        }
    },
    /**
     * Search for a javascript code that apply html to the popup_fodder element, return the HTML code.
     * @param {String} htmlText
     * @return {jQuery}
     */
    parsePopup: function(htmlText) {
        try {
            var sHtml = this.doRgx(/\$\('#popup_fodder'\).html\("(.*?)"\);\s*?MW.Popup.show/, htmlText).$1;
            if ( sHtml ) {
                eval('sHtml = "'+sHtml+'";');
		        return sHtml;
            }
        }
        catch(err) {
            log$('parsePopup error:\n'+ err.message);
        }
        return;
    },
    /**
     * Move an item in the Array the steps specified by move.
     * @param {Array} the_array array where item will be moved
     * @param {Number} index element to move
     * @param {Number} move + / - values
     * @return {Number}
     */
    moveArrayItem: function(the_array, index, move) {
        var to_index = index + move, item;
		
        if (index < 0 || index >= the_array.length) {
            return index;
        }
        if (to_index < 0 || to_index >= the_array.length || to_index === index) {
            return index;
        }
        
        item = the_array[to_index];
        the_array[to_index] = the_array[index];
        the_array[index] = item;
            
        return to_index;
    }
};

var MW = {
    decodeURL: function(encodedText) {
        try {
            var rgx, text = global.Base64.decode(encodedText);
            if ( rgx = /i:\d;s:\d+:"([^"]+)";i:\d;s:\d+:"([^"]+)";i:\d;s:\d+:"([^"]+)";/.exec(text) ) {
                return {
                    'next_controller' : rgx[1],
                    'next_action'     : rgx[2],
                    'next_params'     : Util.uSplit('?'+rgx[3])
                };
            }
            return {};
        }
        catch(err) {
            log$('decodeURL ERROR: '+encodedText);
            return {};
        }
    },
    /**
     * Get user ID from script code.
     * @return {Number}
     */
    getUserID: function() {
        var match = /'sf_xw_user_id':\s?'([^']+)'/.exec($('body').html());
        if (match) {
            log$('MW USER ID: ' + unescape(match[1]));
            return unescape(match[1]);
        }
        return null;
    },
    /**
     * Update Mafia Wars from a HTML text response.
     * 
     * @param {String} htmlText
     * @return {Boolean}
     */
    update: function(htmlText) 
    {
        try {
            var script = h$(htmlText).find('script:regex(text,local_xw_sig =|var user_fields)');
            
            if (script.length > 0) {
                $('#sf_updater').append(script);
                return true;
            }
        }
        catch(err) {
            logErr$(err);
        }
        return false;
    },
    /** 
     * @param {String} url
     */
    updateUri: function(url) {
        global.uri.cb  = (Util.doRgx(/cb=([a-fA-F0-9]+)/,  url).$1 || global.uri.cb  || '');
        global.uri.tmp = (Util.doRgx(/tmp=([a-fA-F0-9]+)/, url).$1 || global.uri.tmp || '');
    },
    /**
     * Get the current city ID.
     * 
     * @return {Number}
     */
    currentCity: function() {
        try {
            var cityId = String($('#mw_city_wrapper').attr('class')).substring(7);
            if (parseInt(cityId) < 1) {
                throw Error('unexpected cityId value.');
            }
            return parseInt(cityId);
        } 
        catch (err) {
            logErr$(err);
            return 1;
        }
    },
    /**
     * get the current Page name.
     * 
     * @return {String}
     */
    currentPageName: function() {
        return $('#inner_page').attr('class');
    },
    /**
     * Return a valid internal Mafia wars url.
     * 
     * @param {String} controller Default is "index".
     * @param {String} action Default is "view".
     * @param {Number} city To force city ID, otherwise the current city is used.
     * @return {String}
     */
    getIntURL: function(controller, action, city) {
        var params = [
            'xw_controller='   + (controller || 'index'),
            'xw_action='       + (action || 'view'),
            'xw_city='         + (city || this.currentCity()),
            'xw_person='       + global.PERSON_ID,
            'cb='              + global.uri.cb  || ((new Date()).getTime() / 100),
            'tmp='             + global.uri.tmp || ((new Date()).getTime() / 100)
        ];
        return 'html_server.php?' + params.join('&');
    },
    /**
     * Return a valid external Mafia Wars url.
     * 
     * @param {String} controller Default is "index".
     * @param {String} action Default is "view".
     * @param {Object}  params {Name => Value} pairs.
     * @return {String}
     */
    getExtURL: function(controller, action, params) {
        var url = 'http://apps.facebook.com/inthemafia/track.php?';
        
        if (typeof(params) !== 'object') {
            params = {};
        }
        
        url += 'next_controller=' + (controller || 'index');
        url += '&next_action=' + (action || 'view');
        
        $.each(params, function(name, value) {
            if (name == 'next_params') {
                value = escape( $.toJSON(value) ); 
            }
            if (name != 'next_controller' && name != 'next_action') {
                url += ('&' + name + '=' + value);
            }
        });
        
        return url;
    },
    /**
     * Return the profile url of the user
     * 
     * @param {String} user_id
     * @return {String}
     */
    getProfileLink: function(user_id) {
        if (!Util.isSet(user_id)) {
            user_id = global.USER_ID;
        }
        if (String(user_id).charAt(0) !== 'p') {
            user_id = 'p|'+user_id;
        }
        var id = global.Base64.encode(user_id);
        return 'http://apps.facebook.com/inthemafia/profile.php?id='+escape('{"user":"'+id+'"}');
    },
    /**
     * Return the profile url of the family
     * 
     * @param {String} family_id
     * @return {String}
     */
    getFamilyLink: function(family_id) {
        family_id = global.Base64.encode(family_id);
        return 'http://apps.facebook.com/inthemafia/family.php?id='+escape('{"id":"'+family_id+'"}');
    },
    /**
     * Return a valid gift link.<br><br>
     * Usage: <br>
     * <b>message:</b> {String} show overlay message.<br><br>
     * 
     * <b>req_type:<b> {String} set request type.<br>
     * <b>req_name:<b> {String} used with req_type to set request name.<br>
     * 
     * <b>giftId:</b> {Number} to set the gift ID.<br>
     * <b>giftCat:</b> {Number} to set the gift Category.<br><br>
     * 
     * @param {Object} options
     */
    getGiftLink: function(options) {
        try {
            if (typeof(options) !== 'object') {
                throw ReferenceError('options is not defined.');
            }
            if (typeof(options.success) !== 'function') {
                throw ReferenceError('callback is not defined.');
            }
            var sUrl = '';
            if (options.giftId) options.req_type = 'gift';
            
            switch(options.req_type) {
            	case 'gift':
                    sUrl = MW.getIntURL('requests', 'friend_selector') +
                        '&free_gift_id='+(options.giftId || 0) + 
                        '&free_gift_cat='+(options.giftCat || 1);
                    break;
                    
            	case 'simple':
                    sUrl = MW.getIntURL('requests', 'friend_selector_simple', options.city) +
                        '&req_type=' + options.req_type +
                        '&req_name='+options.req_name;
                    break;       
                           
            	case 'safehouse':
            	    sUrl = MW.getIntURL('safehouse', 'safehouse_request');
            	    break;
                    
                case 'masteryboost':
                    sUrl = MW.getIntURL('requests', 'friend_selector') +
                        '&req_controller=AsnSocialJob';
                    break;
            }
            
            if (sUrl.length < 1) {
            	log$('getGiftLink ERROR(options.req_type): '+Util.toJSON(options));
            	return;
            };
            // send request
            httpAjaxRequest({
                url      : 'remote/' + sUrl + '&fbml_iframe=1',
                liteLoad : 1,
                message  : options.message,
                success  : function(htmlText) {options.success(Util.doRgx(/<fb:req-choice url='([^']+)'/, htmlText).$1);}
            }); 
        }
        catch(err) {
            logErr$(err);
        }
    },
    /**
     * Deposit the amount of cash specified.
     * 
     * @param {Number} city city id where to deposit
     * @param {Number, String} amount cash to deposit
     * @param {Function} callback return server response or undefined.
     */ 
    deposit: function(city, amount, callback) {
        var cityNames = {
            1: 'new_york',
            2: 'cuba',
            3: 'moscow',
            4: 'bangkok',
            5: 'vegas',
            6: 'italy',
            7: 'brazil'
        };
        var url = 'remote/'; 
        if (city == 5) {
            url += MW.getIntURL('propertyV2', 'doaction');
            url += '&doaction=ActionBankDeposit&building_type=6&city='+city;
        }
        else {
            url += MW.getIntURL('bank', 'deposit_all') + '&city=' + cityNames[city];
        }
        httpAjaxRequest({
            'url': url + '&amount=' + amount, 
            'success': function(jsonData) 
            {
                var result;
                try {
                    result = jsonData.deposit_message;
                    if (typeof(result) == 'undefined') {
                        result = $.parseJSON(jsonData.data).success_message;
                    }
                }
                catch(err) {
                    logErr$(err);
                    result = 'Error depositing your cash of: ' + amount;
                }
                callback(result);
            }
        });
    },
    /**
     * Travel to the specified city.
     * 
     * @param {Number} destination city id for destiny
     * @param {String} div selector
     * @param {Function} callback return true if success.
     */
    travel: function(destination, div, callback) {
        var cityRegex = /current_city_id'.\s*=\s*parseInt."(\d)".;/i;
        var loadMessage = 'Traveling to '+global.cities[destination]+'...';
        
        if (typeof(div) == 'function') {
            callback = div;
            div = null;
        }
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('travel', 'travel'),
            liteLoad: 1,
            data: {
                'destination' : destination || 1,
                'from'        : 'index',
                'zone'        : 1,
                'nextParams'  : ''
            },
            message:  (div ? loadMessage : null), 
            success: function(htmlText) {
                var cityId = Util.doRgx(cityRegex, htmlText).$1 || 0;
                if (MW.update(htmlText)) {
                    if (div) {
                        $('#'+div).html(htmlText);
                    }
                }
                log$('MW.travel: '+ cityId);
                callback && callback(parseInt(cityId));
            }
        });
    },
    /**
     * Returns all mafia members
     * @param {Function} callback
     */
    getMyMafia: function(users, callback) {
        if ( !Util.isFunc(callback) ) {
            return;
        }
        httpAjaxRequest({
            'url': 'remote/' + MW.getIntURL('friendladder','friend_actions') + '&friends='+Util.toJSON(users), 
            'success': function(jsonData) {
                try {
                    callback($.parseJSON(jsonData.data).json_data);
                }
                catch(err) {
                    logErr$(err);
                }
            }
        });
    },
    /**
     * Send a Facebook request
     * @param {String} url
     * @param {Function} callback use function(success, message)
     */
    sendRequest: function(url, callback) {
        httpAjaxRequest({'url':url, 'success':parseGiftData});
        
        function parseGiftData(htmlText) {
            var body    = Util.substr(htmlText, '<fb:fbml>', '</fb:fbml>', 0, 10);
            var params  = Util.doRgx(/FB.Facebook.init\("([^"]+)",\s*"([^"]+)"\)/, htmlText);
            log$('MW.sendRequest->app_key:'+params.$1);
            
            if (body && params.$1 && params.$2) {
                httpXDRequest({
                    method: 'POST',
                    header: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: 'http://www.connect.facebook.com/widgets/serverfbml.php',
                    data: $.param({
                        'app_key'        : params.$1,
                        'channel_url'    : params.$2,
                        'fbml'           : body
                    }),
                    onload: function(responseDetails) {
                        parseRequestData(responseDetails.responseText);
                    }
                });    
            }
            else {
                callback && callback(false, 'Error parsing gift data.');
            }
        }
        function parseRequestData(htmlText) {
            var sendData, sendParams, postFormId, fb_dtsg, user_id, content;
            try {
                sendData   = Util.doRgx(/.sendInvitation\(([^\)]+)/, htmlText).$1;
                sendData   = Util.htmlDecode(sendData);
                sendParams = $.parseJSON(sendData.substring(sendData.indexOf('{')));
                postFormId = Util.doRgx(/post_form_id:"([^"]+)"/, htmlText).$1;
                fb_dtsg    = Util.doRgx(/fb_dtsg:"([^"]+)"/, htmlText).$1;
                user_id    = Util.doRgx(/name="ids\[\]"\s*value="(\d+)"/, htmlText).$1;
                content    = h$(htmlText).find('form').attr('content');
                if ( !(Util.isSet(content) && Util.isSet(user_id)) ) {
                    throw Error('No data found');
                }
            }
            catch(err) {
                logErr$(err);
                callback && callback(false, 'Seem that you can\'t send FB requests to this friend.');
                return;
            }
            send(user_id, {
                '__d'                 : 1,
                'app_id'              : sendParams.app_id,
                'content'             : content,
                'donot_send'          : false,
                'fb_dtsg'             : fb_dtsg,
                'form_id'             : sendParams.request_form,
                'include_ci'          : sendParams.include_ci      || false,
                'invite'              : sendParams.invite          || false,
                'is_in_canvas'        : sendParams.is_in_canvas    || true,
                'is_multi'            : sendParams.is_multi        || false,
                'lsd'                 : '',
                'message'             : '', 
                'post_form_id'        : postFormId,
                'post_form_id_source' : 'AsyncRequest',
                'prefill'             : true,
                'preview'             : false,
                'request_type'        : sendParams.request_type    || 'Mafia Wars gift'
            });
        }
        function send(user_id, data) {
            var success = false, success_message;
            httpXDRequest({
                method: 'POST',
                header: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: 'http://www.connect.facebook.com/fbml/ajax/prompt_send.php?__a=1',
                data: $.param(data) + '&to_ids[0]=' + user_id,
                onload: function(responseDetails) {
                    var data, rdText = responseDetails.responseText;
                    try {
                        data = $.parseJSON(rdText.substring(rdText.indexOf('{')));
                        if (data.payload && data.payload.to_ids && parseInt(data.payload.to_ids[0]) == user_id) {
                            success = true;
                            success_message = 'Facebook gift request sent!';
                        }
                        else {
                            success_message = (data.errorDescription || 'Error sending request.');
                        }
                    }
                    catch(err) {
                        logErr$(err);
                        log$('Facebook.sendRequest:\n'+responseDetails.responseText);
                        success_message = 'Error parsing Facebook response.';
                    }
                    callback && callback(success, success_message);
                }
            });
        }
    }
};

// =========================================================
// CONSOLE LOG (DEBUG)
// =========================================================
/**
 * Send text to window console.
 * @param {String} msg
 */
function log$(message) {
    if (DEBUG_MODE === false)
        return;
        
    try {
        (console||unsafeWindow.console).log('FBMWAddon (DEBUG): ' + message);
    } 
    catch (e) {
        // EMPTY
    }
}
/**
 * @param {Object} err
 */
function logErr$(err) {
    var sStack   = '';
    var sMessage = '';
    try {
        sMessage = err.message + '. ';
        sStack = err.stack.split('\n')[1];
    }
    catch(e) {
        sMessage = err;
    }
    try {
        (console||unsafeWindow.console)
        .log('FBMWAddon (ERROR): ' + sMessage + '\n' + sStack);
    } 
    catch (e) {
        // EMPTY
    }
}

// =========================================================
// SELECTORS
// =========================================================
/**
 * Get a jQuery with at least 1 element, otherwise null.
 * 
 * @param {Object} selector
 * @param {Object} context
 * @return {jQuery}
 */
function e$(selector, context) {
    var j = $(selector, context);
    if (j.length > 0) {
        return j;
    }
    
    return null;
}

/**
 * Create a jQuery from a HTML text.
 * 
 * @param {String} htmlText
 * @return {jQuery}
 */
function h$(htmlText) {
    if (typeof(htmlText) == 'string') {
        var elem = c$('div');
        elem[0].innerHTML = '<div>' + htmlText + '</div>';
        return elem;        
    }
    return $(htmlText);
}

/**
 * Create a new element.<br><br>
 * Script and style tag are supported.<br>
 * Input elements can set the type in format "input:text" for example.<br><br>
 * 
 * @param {String, jQuery, Element} name The new element to create.
 * @param {Object, String} attr Attributes to set to the new jquery element
 * @return {jQuery}
 */
function c$(name, attr) {
    var inputRegex = /^input:(\w+)$/i;
    var obj, r, a;
    // create the object
    if (typeof(name) !== "string") {
        obj = $(name);
    }
    else if ((r = inputRegex.exec(name))) {
        obj = $('<input type="' + r[1] + '">');
    }   
    else {
        if (name == 'style') {
            obj = $('<' + name + ' type="text/css">');
        }
        else if (name == 'script') {
            obj = $('<' + name + ' type="text/javascript">');
        }
        else {
            obj = $('<' + name + '>');
        }
    }
    // return undefined if no object is created
    if (obj.length < 1) 
        return null;
        
    // apply attributes
    if (typeof(attr) === "string") 
    {
        if ((r = attr.split(',')).length > 1) {
            for (var i = 0; i < r.length; i++) {
                if ((a = r[i].split(':')).length == 2) {
                    obj.attr($.trim(a[0]), $.trim(a[1]));
                }
            }
        }
        else if ((a = attr.split(':')).length == 2) {
            obj.attr($.trim(a[0]), $.trim(a[1]));
        }
        else {
            obj.attr('id', $.trim(attr));
        }
    }
    else if (typeof(attr) === "object") {
        obj.attr(attr);
    }
    
    return obj;
}

/**
 * Get a Element from an evaluated expression.
 * 
 * @param {Object} selector
 * @param {Object} context
 * @return {Element}
 */
function x$(selector, context) {
    context = context || document;
    return document.evaluate(selector, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/**
 * Return an Array of Node Elements
 * 
 * @param {Object} selector
 * @param {Object} context
 * @return {Array}
 */
function a$(selector, context) {
    context = context || document;
    var elem, elements = [];
    var result = document.evaluate(selector, context, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    while ((elem = result.iterateNext())) {
        if (elem.nodeType) 
            elements.push(elem);
    }
    return elements;
}

// =========================================================
// INIT FUNCTIONs
// =========================================================
function initStorage() {

    if (typeof GM_deleteValue == 'undefined')
    {
        log$('Greasemonkey api don\'t found. using localStorage...');
        if (typeof(localStorage) == 'undefined' || typeof(localStorage.getItem) == 'undefined') 
        {
            if (!(localStorage = unsafeWindow.localStorage)) {
                logErr$(Error('localStorage is undefined, using a temporal storage.'));
                localStorage = new (function() {
                    var tmp_array = [];
                    this.setItem = function(name, value){
                        tmp_array[name] = value;
                    };
                    this.getItem = function(name) {
                        return tmp_array[name] || null;
                    };
                    this.removeItem = function(name) {
                        tmp_array[name] = null;
                    };
                    return this;
                })();
            }
        }
        /**
         * Sets the named preference to the specified value.
         * 
         * @param {String} name The name preference.
         * @param {String, Number, Boolean} value Must be strings, booleans, or integers.
         */
        GM_setValue = function(name, value) {
            localStorage.setItem(name, value);
        };
        /**
         * Returns the named preference, or defaultValue if it does not exist
         * 
         * @param {String} name The name preference.
         * @param {String, Number, Boolean} defaultValue To return if it does not exist.
         * @return {String, Number, Boolean}
         */
        GM_getValue = function(name, defaultValue) {
            var value = localStorage.getItem(name);
            return value || defaultValue;
        };
        /**
         * deletes the named preference or subtree
         * 
         * @param {String} name The name preference to delete.
         */
        GM_deleteValue = function(name) {
            localStorage.removeItem(name);
        };
    }
}
function initjQuery() {
    
    if (typeof(unsafeWindow.$) == 'undefined' || typeof(unsafeWindow.MWFB) == 'undefined') {
        log$('Failed to load jQuery/facebook. Try again in 3 second.');
        setTimeout(initjQuery, 3000);
    }
    else {
        log$('jQuery is loaded.');
        
        if (typeof($) == 'undefined') {
            $ = unsafeWindow.$;
        }
        if (typeof(do_ajax) == 'undefined') {
            do_ajax = unsafeWindow.do_ajax;
        }
        if (typeof(MWFB) == 'undefined') {
            MWFB = unsafeWindow.MWFB;
        }
        
        // init facebook
        facebook.init();
        
        // add regex selector to jQuery
        $.expr[":"].regex = function(a, i, m, r) 
        {
            var p, s_expr, s_member;
            // get member and expr
            if ((p = m[3].split(',')).length > 1) {
                s_member = $.trim(p[0]);
                s_expr = $.trim(p[1]);
            }
            else {
                s_member = 'html';
                s_expr = $.trim(m[3]);
            }
            // create regex expr
            var r = new RegExp(s_expr, 'i');
            
            // is a jQuery member
            if ($(a)[s_member]) {
                return r.test($(a)[s_member]());
            }               
            // is a element member
            if ($(a).attr(s_member)) {
                return r.test($(a).attr(s_member));
            }
            return false;   
        };
        
        if (!(global.USER_ID = MW.getUserID())) {
            alert('MWAddon: Error, no user id found. Aborting load.');
            return;
        }
        // get person ID
        global.PERSON_ID = String(global.USER_ID).match(/(\d+)/)[1];
        
        // create Base64 Object
        global.Base64 = new Base64();
        
        // create default global options
        global.options = new Config('main', defaults.main);
        
        // set locked user links 
        global.user_links.profile.longUrl = MW.getProfileLink();
        global.user_links.promote.longUrl =  MW.getExtURL('group', 'view', {
            'next_params': {
                'promote': 'yes',
                'pid': global.USER_ID
            }
        });
        global.user_links.slots.longUrl = MW.getExtURL('stats', 'view', {
            'next_params': {
                'user': global.USER_ID,
                'vegasslots': '1',
                'referrer': 'ad_feed'                    
            }
        });
        
        // load options
        global.options.load(function() {
            if (global.options.get('checkForUpdates')) {
                checkForUpdates();
            }
            // for handle page loadings
            $('#mainDiv').ajaxComplete(function(e, r, o) {
                MW.updateUri(o.url);
                
                modMenu();
                AutoDeposit(r.responseText);
                setTimeout(modUserStats, 20);
                
                if (o.url.match('xw_action=share_loot')) {
                    setTimeout(function() {
                        SecretStash(r.responseText);
                    }, 500);
                    return;
                }
                if (o.url.match('xw_action=view_stage_jobs')) {
                    setTimeout(PageJob, 200);
                    return;
                }
                var metadata = /<!--\s*Current\s*Page:\s*(\w+)/.exec(r.responseText);
                metadata && loadController(metadata[1], r.responseText);
            });
            
            // this is the first load so...
            modMenu();
            modUserStats();
            MW.updateUri(global.href);
            loadController(MW.currentPageName());
            
            // close zynga bored popup :/
            setTimeout(function() {$('#popup_fodder_zmc #pop_zmc').remove();}, 3000);
        });
    }
}

/**
 * Check for updates at the userscripts metadata iframe.
 * 
 * @param {Object} metadata
 */
function updateCheck(metadata, bPopup) {
    var lastVer  = Util.doRgx(/@version\s*(.+)/, metadata).$1;
    var metaName = Util.doRgx(/@name\s*(.+)/, metadata).$1;
    
    if (metaName == scriptAppInfo.appName && scriptAppInfo.appVer !== lastVer) {
        var message = scriptAppInfo.appName + ' has been updated to version '+lastVer+'.\n\n';
        
        if (bPopup === true) {
            showHelpPopup({
                icon: 'info',
                title: 'NEW UPDATE!!',
                message: message, 
                buttons: [{
                    label: 'Update Now!',
                    addClass: 'medium white',
                    onclick: function() {
                        unsafeWindow.open(scriptAppInfo.appUrl, '_blank');
                    }
                }]
            });
            return;
        }
        if (confirm(message += 'URL:'+scriptAppInfo.appUrl+'\n\nDo you want to update now?')) {
            unsafeWindow.open(scriptAppInfo.appUrl, '_blank');
        }
    }
}

/**
 * Request script metadata for check updates
 */
function checkForUpdates() {
    var now = new Date().getTime();
    var uInt = scriptAppInfo.appUpdateInterval * 60 * 60 * 100;
    if ( now < (global.options.get('appLastUpdateCheck') + uInt) ) {
        return;
    }
    global.options.set('appLastUpdateCheck', now);
    global.options.save();
    
    if (global.xd_support === true) {
        httpXDRequest({
            method: 'GET',
            url: scriptAppInfo.appMeta + '?' + now,
            onload: function(responseDetails) {
                updateCheck(responseDetails.responseText, true);
            }
        });
    }
    else {
        setTimeout(function() {
            // Add iframe Updater
            var el = document.createElement('iframe');
            el.setAttribute('style', 'display: none;');
            el.setAttribute('src', scriptAppInfo.appMeta + '?' + now);
            document.getElementsByTagName('body')[0].appendChild(el);
        }, 6000);  
    }
}

/**
 * Load the specified controller for the current page.
 * 
 * @param {String} name Controller name
 * @param {Object} responseText Response HTML of page.
 */
function loadController(name, responseText) 
{
    if (typeof global.pages[name] == 'function') {
        log$('loading: ' + name);
        setTimeout(function() {
            global.pages[name].apply(document, [responseText]);
        }, 500);
    }
    else 
        log$('No handled: ' + name);
}

// =========================================================
// DOM OBJECTS
// =========================================================
/**
 * Create a popup with the specified options.<br>
 * Options:<br>
 * <br>
 * <b>type:</b> {String} set popup type.<br>
 * <b>persistent:</b> {Boolean} set popup persistent in memory on/off.<br>
 * <b>appendTo:</b> {Element, jQuery} append popup in.<br>
 * <b>title:</b> {String} set popup title.<br>
 * <b>top:</b> {Number} set popup top.<br>
 * <b>center:</b> {Boolean} set default text-align.<br>
 * <b>background:</b> {String} set background style sheet.<br>
 * <b>autoOpen:</b> {Boolean} show it up.<br>
 * <b>onclose:</b> {Function} onclose event.<br>
 * <b>closeAfterClick:</b> {Boolean} close after click any of popup buttons.<br>
 * <b>buttons:</b> {Array} of buttons options<br>
 * 
 * @constructor
 * @param {String} id
 * @param {Object} options
 * @return {domPopupObject}
 */
var domPopupObject = function(id, options) {
    
    if (typeof(id) !== 'string') {
        if (typeof id == 'object') {
            options = id;
        }
        id = 'mwaddon_popup';
    }
    if (typeof options !== 'object') {
        options = {};
    }
    if (typeof options.title !== 'string') {
        options.title = '';
    }
    if (options.autoOpen !== true) {
        options.autoOpen = false;
    }
    if (typeof options.center !== 'boolean') {
        options.center = true;
    }
    if (typeof options.type !== 'string') {
        options.type = 'normal';
    }
    if (typeof options.appendTo == 'undefined') {
        options.appendTo = e$('#fbmw_addon_popup'); 
    }
    
    var self      = this;
    var pid       = Math.round(new Date().getTime() / 100);
    var fodderElt = (options.appendTo || c$('div', 'fbmw_addon_popup').prependTo(global.final_wrapper));
    var divElt    = c$('div','pop_'+pid).appendTo(fodderElt);
    var bgElt     = c$('div','class:pop_bg,pop_bg_'+pid).appendTo(divElt);
    var popupElt  = c$('div','class:pop_box,pop_box_'+pid).appendTo(divElt);

    if (options.type == 'main') {
        popupElt.css({
            'width'       : 730,
            'border'      : '4px solid #A99E9E',
            'text-align'  : 'left',
            'top'         : 20,
            'z-index'     : 49
        });
    }
    else {
        popupElt.css('top', 80);
        switch(options.type) {
            case 'rob'    : divElt.addClass('pop_rob');          break;
            case 'help'   : divElt.addClass('cash_help_box');    break;
            case 'simple' : divElt.addClass('simpleWithTitle');  break;
        }
    }
    
    if (options.width) {
        popupElt.width(options.width);
    }
    if (options.top) {
        popupElt.css('top', options.top);
    }
    popupElt.css({
        'background': options.background ? options.background : '#121212',
        'left': '50%',
        'margin': '0px -'+ String(popupElt.outerWidth()/2) + 'px'
    }); 
    
    if (options.zIndex) {
        popupElt.css('z-index', options.zIndex + 1);
        bgElt.css('z-index', options.zIndex);
    }

    var onclose = function() {
        bgElt.hide();
        popupElt.fadeOut(200, function() {
            if (typeof(options.onclose) == 'function') {
                options.onclose.apply(this);
            }
            if (options.persistent !== true) {
                self.destroy();
            }
        });
        $('#content_row, #inner_page').height('auto');
        return false;
    };  
    
    var closeAfterClick = function() {
      if (options.closeAfterClick === true) {
        onclose();
      }
      return false;
    };   
    
    var eTitle = c$('center').html(options.title).css({
        'font-size'   : 24,
        'font-weight' : 'bold',
        'position'    : 'absolute',
        'width'       : '100%'
    });
    
    // close button
    c$('a').appendTo(popupElt).addClass('pop_close').bind('click', onclose);
    
    // header
    /**
     * @type {jQuery}
     */
    this.header = c$('div').appendTo(popupElt);
    
    if (options.type == 'main') {
        this.header.css({
            'background'    : 'black url('+global.zGraphicsURL+'zmc/brick_bg_700x73_01.jpg) no-repeat 0px 0px',
            'border-bottom' : '2px solid #2f2f2f',
            'height': 70
        })
        .append(c$('div').append(c$('img').attr('src', global.resource.mwaddon_icon)).css({
            'float'  : 'left',
            'height' : 64,
            'margin' : 2
        }))
        .append(eTitle.html(options.title).css('top',15));
    }
    else if (options.type == 'normal') {
        this.header.css({
            'border-bottom' : '2px solid #A99E9E',
            'margin-bottom' : 5,
            'height'        : 45
        })
        .append(eTitle.html(options.title).css('top',10));
    }
    else {
        this.header.css('height', 15);
    }
    
    /**
     * @type {jQuery}
     */
    this.content = c$('div', id).appendTo(popupElt).css('clear','both');
    
    if (options.content) {
        this.content.append(options.content);
    }
    if (options.center) {
        this.content.css('text-align', 'center');
    }
    
    // add buttons
    var bDiv = c$('div').css('padding', '10px 5px').appendTo(popupElt);
    
    if (options.buttons instanceof Array) {
        bDiv.css({
            'border-top': '2px solid #2F2F2F',
            'background-color': 'transparent',
            'text-align': 'center',
            'max-height': 40,
            'height': 40
        });
        for (var i = 0; i < options.buttons.length; i++) {
            var obutton = options.buttons[i] || {};
            if (typeof obutton.label !== 'string') { 
                obutton.label = 'undefined';
            }
            if (typeof obutton.onclick !== 'function') {
                obutton.onclick = onclose;
            }
            b$(obutton.label).appendTo(bDiv).addClass(obutton.addClass)
            .css('margin-left', 5).click(closeAfterClick).click(obutton.onclick);
        }
    }
    /**
     * Close the popup, fires onclose event.
     */
    this.close = function() {
        onclose();
    };
    /**
     * Show the popup.
     */
    this.show = function() {
        if ($(document.body).css('overflow-y')) {
            $(document.body).css('overflow-y','hidden').parent().css('overflow-y','hidden');
        }
        bgElt.show();
        popupElt.show();
        $('#inner_page').height(Math.max(parseInt(popupElt.height()) + 100, $('#inner_page').height()));
    };
    /**
     * Add Style element to popup from a base64 encoded string.
     * 
     * @param {String} base64String An String encoded in base64
     */
    this.addBase64Style = function(base64String) {
        c$('style').prependTo(popupElt).append(global.Base64.decode(base64String));
    };
    /**
     * Add Script element to popup from a base64 encoded string.
     * 
     * @param {String} base64String An String encoded in base64
     */
    this.addBase64Script = function(base64String) {
        c$('script').prependTo(popupElt).append(global.Base64.decode(base64String));
    };
    
    this.destroy = function() {
        divElt.remove();
        delete global.popups[id];
        delete this;
    };
    
    /**
     * Apply the specified options to all select elements.
     * 
     * @param {Object} clOpt
     */
    this.applyOptions = function(clOpt) {
        $.each(clOpt, function(id, _option) {
            var elem = $('#' + id, popupElt);
           
            $.each(_option, function(value, name) {
                elem.append(c$('option', 'value:'+value).text(name));
            });
           
        });
    };
    
    if (options.persistent === true) {
        global.popups[id] = this;
    }
    
    // auto open
    if (options.autoOpen) {
        this.show();
    }
    
    return this;
};
/**
 * Create a new DOM Tabs layout.
 * 
 * @constructor
 * @param {Element,jQuery} appendTo The Object where the tabs is append.
 * @param {String} id the string id of this dom object.
 * @param {Array}  tabNames Array of all tabs Names.
 * @param {Object} [height] Optional height of tab Layout.
 * @param {Object} [width] Optional width of tab Layout.
 * @param {String} [layerCSS] Optional css of tab Layout.
 * @return {domTabObject}
 */
var domTabObject = function(appendTo, id, tabNames, height, width, layerCSS) 
{
    /**
     * Show a tab.
     * @param {String, Number} id Can be the tab name (string) or tab index (integer).
     */
    this.showTab = function(id) 
    {
        var tabID = ( isNaN(id) ? layerKeys[id] : id  );
        var elt = e$('#' + layerID + '_tab_' + tabID);
        if (elt)
            elt.click();
    };
    /**
     * Get the specified layout.
     * @param {String, Number} id Can be the tab name (string) or tab index (integer)
     * @return {jQuery}
     */
    this.getLayout = function(id) 
    {
        var tabID = (isNaN(id) ? layerKeys[id] : id  );
        return e$('#' + layerID + '_tab_' + tabID + '_layout');
    };
    /**
     * Add html code to the right of all tabs.
     * @param {String, Elemet, jQuery} obj
     */
    this.tabClear = function() 
    {
        return (e$('.tab_clear', headerLayout) || c$('div').addClass('tab_clear').appendTo(headerLayout));
    };
    if (tabNames.length < 1) 
        return null;
    var layerID = id, layerKeys = [];
    var mainLayout =  c$('div', layerID).appendTo(appendTo);
    var headerLayout = c$('div').addClass('tab_box_header').height(35).appendTo(mainLayout);    
    var tab_click = function(){
        $('div[id*="layout"]', '#' + layerID).hide();
        $('div[id^="' + layerID + '_tab_"]', headerLayout).removeClass().addClass('tab tab_inactive_op');
        $('#' + this.id + '_layout').show();
        $(this).removeClass().addClass('tab tab_active_op');
    };
    if (width)  
        mainLayout.width(width);
    for (var i = 0; i < tabNames.length; i++) {
        var tab = c$('div', layerID + '_tab_' + i).appendTo(headerLayout)
        .addClass('tab tab_inactive_op').click(tab_click).css({
            'margin-right': 3,
            'cursor': 'pointer',
            'padding-top': 8
        });
        c$('div').addClass('tab_start').html('&nbsp;').appendTo(tab);
        c$('div').addClass('tab_middle').html(tabNames[i]).appendTo(tab);
        c$('div').addClass('tab_end').html('&nbsp;').appendTo(tab);
        // add the tab layouts.
        var layout = c$('div','id:'+layerID+'_tab_'+i+'_layout,class:tab_box_content').appendTo(mainLayout).hide();
        if (height)   layout.height(height);
        if (layerCSS) layout.css(layerCSS);
        // To parse tab name keys
        layerKeys[tabNames[i]] = i;
    }
    // show up the tab layer.
    this.showTab(0);
    return this;
};
/**
 * Create a new DOM table object.
 * 
 * @constructor
 * @param {Element} appendTo
 * @param {Number} rows
 * @param {Number} columns
 * @param {Object} styleCSS
 * @return {domTableObject}
 */
var domTableObject = function(appendTo, rows, columns, styleCSS) 
{
    var row_array = [], cell_array = [];
    
    this.table = c$('table', 'cellspacing:0').appendTo(appendTo);
    this.tbody = c$('tbody').appendTo(this.table);
    
    if (styleCSS) {
        this.table.css(styleCSS);
    }
    for (var r = 0; r < rows; r++) {
        row_array[r] = c$('tr').appendTo(this.tbody);
        cell_array[r] = [];
        for (var c = 0; c < columns; c++) {
            cell_array[r][c] = c$('td').appendTo(row_array[r]);
        }
    }
    /**
     * @param {Number} x
     * @return {jQuery}
     */
    this.row = function(x) 
    {
        return row_array[x];
    };
    /**
     * @param {Number} x
     * @param {Number} y
     * @return {jQuery}
     */
    this.cell = function(x, y) 
    {
        return cell_array[x][y];
    };
    return this;
};

/**
 * 
 * @param {String} id
 * @param {Object} appendTo
 * @param {Object} styleCSS
 */
var domListObject = function(id, appendTo, styleCSS) {
    var ulList = c$('ul').css('list-style-type','none');
    
    this.element = c$('div').css({'overflow':'auto','border':'1px solid white'}).append(ulList);
    
    if (appendTo) this.element.appendTo(appendTo);
    if (styleCSS) this.element.css(styleCSS);
    
    /**
     * @param {String, Element, jQuery} toAdd
     * @return jQuery
     */
    this.addField = function(toAdd) {
        var liElt = c$('li').prependTo(ulList).css({
		    'border': '1px solid #333',
		    'cursor': 'pointer',
		    'height': 25,
		    'margin': 1,
		    'overflow': 'hidden',
		    'padding': 1
        });
        
        if (Util.isString(toAdd)) {
            liElt.html(toAdd);
        }
        else if (Util.isObject(toAdd)) {
            liElt.append(toAdd);
        }
        return liElt;
    };
    /**
     * @return jQuery
     */
    this.fields = function() {
        return $('li', ulList);
    };
    /**
     * @param {Number} index
     * @return jQuery
     */
    this.field = function(index) {
        return $('li', ulList).eq(index);
    };
    /**
     * @param {Number} index
     */
    this.removeField = function(index) {
        $('li', ulList).eq(index).remove();
    };
    this.clear = function() {
        ulList.empty();
    };
    
    return this;
};

// =========================================================
// POPUPS
// =========================================================

/**
 * Display a modal message popup.<br>
 * Usage:<br> <br>
 * <b>icon</b>: {String} Can be info or error.<br>
 * <b>title</b>: {String} the title of the new popup.<br>
 * <b>message</b>: {String} message sent to user.<br>
 * <b>buttons</b>: {Array} optional buttons.
 * 
 * @param {Object} options
 */
function showHelpPopup(options) {
    var icons = {
        'info': global.resource.info_icon,
        'error': global.resource.ajax_error
    };
    var helpPopup = new domPopupObject({
        type: 'help',
        top: options.top,
        autoOpen: true,
        zIndex: 99999,
        closeAfterClick: true,
        onclose: options.onclose,
        buttons: options.buttons,
        content: c$('div').css({'text-align': 'left','margin': '5px 30px'})
            .append(c$('img').css('float', 'left').attr('src', icons[options.icon]))
            .append(c$('h4').css('padding', '3px 28px').html(options.title))
            .append(c$('div').css('margin-top', 10).html(options.message))
    });
    if (typeof(options.top) == 'undefined') {
        $('#TopField').focus();
    }
    if (Util.isSet(options.autoclose) && parseInt(options.autoclose) > 0) {
        setTimeout(helpPopup.close, options.autoclose * 100);
    }
}
/**
 * Display a modal popup asking user for text.
 * @param {String} message
 * @param {String} defaultText
 * @param {Function} callback
 */
function showPromptPopup(message, defaultText, callback) {
    if (typeof(message) !== 'string') {
        return;
    }
    var inputElt = c$('textarea', 'rows:12,cols:72').val(defaultText||'');
    var popupElt = new domPopupObject({
        type     : 'simple',
        autoOpen : true,
        zIndex   : 99999,
        buttons  : [
            {
                label   : 'Accept',
                onclick : function() {
                    popupElt.close();
                    callback && callback(inputElt.val());
                    return false;
                }
                
            },{ label: 'Cancel' }
        ],
        content: c$('div').css('margin-top', 10)
                 .append(c$('h4').css('margin', 0).text(message||'write a text:'))
                 .append(inputElt)
    });
}
/**
 * @param {String} message
 * @param {String} text
 */
function showTextPopup(message, text) {
    if (!message || !text) {
        return;
    }
    var inputElt = c$('textarea', 'readonly:readonly,rows:12,cols:72').val(text);
    var popupElt = new domPopupObject({
        type     : 'simple',
        autoOpen : true,
        zIndex   : 99999,
        buttons  : [{
            label    : 'Select All',
            addClass : 'short white',
            onclick  : function() {inputElt.select(); return false;}
        }],
        content: c$('div').css('margin-top', 10)
                 .append(c$('h4').css('margin', 0).text(message))
                 .append(inputElt)
    });
}

function showPublishMessage() {
    if (!global.options.get('publishPreview') === true) {
        showHelpPopup({
            icon: 'info',
            title: 'Post Published!',
            message: 'You\'ve published to selected target.',
            autoclose: 3
        });
    }
}

function loadingOverlay(message) {
    $('#fbmw_menu').mouseleave();
    
    if (message == 'hide') {
        return $('#overlay_pop').hide();
    }
    
    if (e$('#fbmw_addon_popup #overlay_pop') !== null) {
        $('#loaderText', '#overlay_pop').text(message);
        return $('#overlay_pop').show();
    }
    
    var divElt = c$('div', 'id:overlay_pop').hide()
    .appendTo(e$('#fbmw_addon_popup') || c$('div', 'fbmw_addon_popup').prependTo(global.final_wrapper));
    
    c$('div', 'id:overlay_pop_bg,class:pop_bg').css('z-index', 995).appendTo(divElt).show();
    c$('div', 'id:overlay_pop_box,class:socialMissionTryAgain').css('z-index', 999)
    .appendTo(divElt).css('top', 100).show()
    .append(c$('div', 'loaderText').text(message))
    .append(c$('div').append(
            c$('img').attr('src', 
            'http://mwfb.static.zgncdn.com/mwfb/graphics/socialmissions/ajax-loader.gif')
        )
    );
    
    return divElt.show();
}

// =========================================================
// UTILS
// =========================================================
/**
 * Set a timerInterval to an element.
 * 
 * @param {String, Element, jQuery} selector The dom element which show the messages.
 */
var timerMessage = function(selector) {
    var timerId,  self = this;
    /**
     * Start the timer with the specified options.<br> - text must contain %N%
     * tag to be replaced by the countwown delay
     * 
     * @param {String} text Text to apply.
     * @param {Number} delay Countdown in seconds.
     * @param {Function} callback function to be executed when delay is 0
     * @param {Array} [params] Optional array of parameters for callback.
     */
    this.start = function(text, delay, callback, params) {
        if (e$(selector) == null) {
            return 0;
        }
        self.clear();
        
        $(selector).html(text.replace('%N%', delay));
        
        timerId = setInterval(function() {
            
            $(selector).html(text.replace('%N%', delay--));
            
            if (delay < 0) {
                self.clear();
                callback.apply(self, params);
            }
            
        }, 100);
        
        return timerId;
    };
    /**
     * Clear the timer.
     */
    this.clear = function() {
        if (timerId) {
            clearInterval(timerId);
        }
    };
    
    return this;
};

// =========================================================
// METHODS
// =========================================================

/**
 * check Google Chrome cross-domain support
 */
function checkXDChromeSupport() {
    try {
        chrome.extension.sendRequest(
            global.plugin_id, { id:'FBMWAddon', action:'test' }, 
            function(success) { global.xd_support = success; }
        );    
    }
    catch(err) {
        logErr$(err);
    }
}

/**
 * Cross-domain request
 * @param {Object} options
 */
function httpXDRequest(options) {
    
    if (global.xd_support !== true) {
        if (global.is_chrome === true) {
            showHelpPopup({
                icon: 'info',
                title: 'MWAddon Chrome Plug-in',
                message: 'You\'ve request an action that require MWAddon Chrome Plug-in.'
                    + '<br>You can install it clicking <a href="'+scriptAppInfo.appPlugInUrl
                    + '" target="_black">here</a>'
            });  
        }
        else {
            showHelpPopup({
                icon: 'error',
                title: 'not supported',
                message: 'This feature is not supported by your browser.'
            });
        }
        if (Util.isSet(options.onerror)) {
            options.onerror('Not supported');
        }
        return;
    }
    
    if (global.is_chrome === true) {
        options.id = 'FBMWAddon';
        chrome.extension.sendRequest(global.plugin_id, options, function(r) {
            if ( r ) {
                if (Util.isSet(options.onload)) { 
                    options.onload(r);
                }
            }
            else if (Util.isSet(options.onerror)) {
                options.onerror(r);
            }
        });
    }
    else if (typeof GM_xmlhttpRequest !== 'undefined') {
        setTimeout(function() { GM_xmlhttpRequest(options); }, 0);
    }
}

/**
 * Use "XMLHttpRequest()" to do an ajax request.
 * 
 * @param {Object} options
 */
function httpRequest(options) {
    try {
        var xmlHttp = new XMLHttpRequest();
        
        if (!xmlHttp) {
            throw Error('Can\'t create XMLHttpRequest object.');
        }
        if (typeof(options.success) !== 'function') {
            throw ReferenceError('success is not defined');
        }
        if (typeof(options.url) !== 'string') {
            throw ReferenceError('url is not defined');
        }
        if (typeof(options.timeout) !== 'number') {
            options.timeout = 30000;
        }
        if (options.liteLoad !== 1) {
            options.liteLoad = 0;
        }
        
        // define url and params
        var connector = (options.url.indexOf('?') == -1) ? '?' : '&';
        var url = (/http/.test(options.url) ? '' : 'http://facebook.mafiawars.com/mwfb/') + options.url;
        var body = {
            'ajax': 1,
            'liteload': options.liteLoad,
            'sf_xw_user_id': global.USER_ID,
            'sf_xw_sig': unsafeWindow.local_xw_sig
        };       
        
        // add optional parameters.
        if (typeof(options.data) == 'object') {
            $.each(options.data, function(name, value) {
                body[name] = value;
            });
        };
        
        // set timeout
        var nTimeout = setTimeout(
            function() {
                xmlHttp.onreadystatechange = function(){};
                xmlHttp.abort();
                log$('Timeout for url:\n'+url);
                options.error && options.error('timeout.');
            },
        options.timeout);
        
        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState == 4) {
                clearTimeout(nTimeout);
                if (xmlHttp.status == 200) {
                    options.success(xmlHttp.responseText);
                }
                else {
                    options.error && options.error('(#'+xmlHttp.status+') '+xmlHttp.statusText);
                }
            }
        };
        
        // send request
        xmlHttp.open('POST', url + connector + 'xw_client_id=8', true);
        xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlHttp.send($.param(body));
    }
    catch(err) {
        logErr$(err);
        options && options.error && options.error();
    }
}
/**
 * Use "$.ajax()" to do an ajax request.
 * 
 * @param {Object} options
 */
function httpRequest_jquery(options) {
    try {
        if (typeof(options.success) !== 'function') {
            throw ReferenceError('success is not defined');
        }
        if (typeof(options.url) !== 'string') {
            throw ReferenceError('url is not defined');
        }
        if (typeof(options.timeout) !== 'number') {
            options.timeout = 15000;
        }
        if (options.liteLoad !== 1) {
            options.liteLoad = 0;
        }
        
        // define url and params
        var connector = (options.url.indexOf('?') == -1) ? '?' : '&';
        var url = (/http/.test(options.url) ? '' : 'http://facebook.mafiawars.com/mwfb/') + options.url;
        var params = {
            'ajax': 1,
            'liteload': options.liteLoad,
            'sf_xw_user_id': global.USER_ID,
            'sf_xw_sig': unsafeWindow.local_xw_sig
        };       
        
        // add optional parameters.
        if (typeof(options.data) == 'object') {
            $.each(options.data, function(name, value) {
                params[name] = value;
            });
        };
        
        // set timeout
        var bAborted = false;
        var nTimeout = setTimeout(
            function() {
                bAborted = true;
                log$('Timeout for url:\n'+url);
                options.error && options.error('timeout');
            },
        options.timeout);
        
        // send request
        $.ajax({
            type: 'POST',
            url: url + connector + 'xw_client_id=8',
            data: params,
            global: false,
            success: function(htmlText) {
                if (bAborted === false) {
                    clearTimeout(nTimeout);
                    options.success(htmlText);
                }
            },
            error: function(xhr, textStatus) {
                if (bAborted === false) {
                    clearTimeout(nTimeout);
                    options.error && options.error('(#'+xhr.status+') '+xhr.statusText);
                }
            }
        });
    }
    catch(err) {
        logErr$(err);
        options && options.error && options.error();
    }
}

/**
 * Do an ajax request.
 * 
 * @param {Object} options
 * @param {Function} [callback]
 */
function httpAjaxRequest(options, callback) 
{
    var user_clicks = 1;
    try {
        if (Util.isString(options) && Util.isFunc(callback)) {
            var sUrl = options;
            options = {'url':sUrl, 'success':callback};
        }
        if (!Util.isObject(options)) {
            throw ReferenceError('options is not defined.');
        }
        if (!Util.isFunc(options.success)) {
            if (Util.isFunc(callback)) { options.success = callback; }
            else { throw ReferenceError('callback is not defined.'); }
        }
        if (!Util.isSet(options.data)) { 
            options.data = new Object(); 
        }
        try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {logErr$(err);}
        options.data['clicks'] = user_clicks;
        
        if (typeof(options.message) == 'string') { loadingOverlay(options.message); }
        
        var updateFromJSON = function(data) {
            //log$('updateFromJSON:'+data);
            data = $.parseJSON(data);
            try {
		        if (Util.isSet(data.user_fields)) {
                    unsafeWindow.user_fields_update(data.user_fields);
		            unsafeWindow.user_info_update(data.user_fields, data.user_info);
		        }
                if (data.sk_update) {
                    unsafeWindow.SK.update();
                }
                if (Util.isSet(data.questData)) {
                    unsafeWindow.MW.QuestBar.update(data.questData);
                }
            }
            catch(err) {
                logErr$(err);
            }
            options.success && options.success(data);
        };
        var updateFromHTML = function(response) {
            MW.updateUri(response);
            //log$('updateFromHTML:'+response);
            try {
                var metaStr = Util.substr(response, '!-- Current Page: ', ' --\>', 1, 18);
                var meta = Util.doRgx(/([a-zA-Z]*)?(?:_controller) ([0-9]+)/, metaStr);
                if (meta.$1) {
                    unsafeWindow.User.page = meta.$1;
                }
                if (metaStr.indexOf('sk_update') != -1) {
                    unsafeWindow.SK.update();
                }
            }
            catch(err) {
                logErr$(err);
            }
            options.success && options.success(response);
        };
        // send request
        httpRequest({
            url       : options.url,
            data      : options.data,
            liteLoad  : options.liteLoad,
            timeout   : 15000,
            
            success: function(htmlText) 
            {
                loadingOverlay('hide');
                if (( htmlText = $.trim(htmlText) ).charAt(0) === '{') {
                    updateFromJSON(htmlText);
                } else {
                    updateFromHTML(htmlText);
                }
            },
            error: function(errText) 
            {
                loadingOverlay('hide');
                options.success(errText);
            }
        });
    }
    catch(err) {
        logErr$(err);
        loadingOverlay('hide');
        options && options.success && options.success(err.message);
    }
}

/**
 * Show an error message about server http request response.
 */
function showBadResponse() {
    showHelpPopup({
        icon: 'error',
        title: 'Bad server response',
        message: 'There is an error in the server response. Try again later.'
    });
}

/**
 * Show a popup for group selection
 * 
 * @param {Number} defaultGroup
 * @param {Function} callback
 */
function showGroupSelection(defaultGroup, callback, defaultMessage) 
{
    var Events = {
	    select_click: function() {
	        $(this).replaceWith(c$('p').text('Target Selected!'));
	        setTimeout(function() {
	            popupElt.close();
	            callback(Util.getInputSelectedValue($('#select_fbgroups', popupElt.content)), 
	                     $('#message_post',popupElt.content).val());
	        }, 100);
	    },
        refresh_click: function() {
	        var button = $(this);
	        if (button.attr('disabled')) {
	            return false;
	        }
            else {
	            button.attr('disabled', true).css('opacity', 0.4);
            }
            Groups.refresh(function() {
                Groups.addToSelect('#select_fbgroups',defaultGroup);
                button.removeAttr('disabled').css('opacity', 1);
            });
	        return false;
	    }
    };

    var popupElt = new domPopupObject('target_selection_popup', {
        type       : 'simple',
        top        : 150,
        width      : 560,
        background : 'black url(\''+global.zGraphicsURL+'Fight-Explain_bg.jpg\') repeat-x',
        zIndex     : 99999
    });
    
    popupElt.addBase64Style(
        'I3RhcmdldF9zZWxlY3Rpb25fcG9wdXAgLmJsYWNrIHsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogcmdiKDIwOCwgMjA4'+
        'LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNr'+
        'OyANCglmb250LXNpemU6IDE0cHg7DQp9DQojdGFyZ2V0X3NlbGVjdGlvbl9wb3B1cCAucG9wdXBfYm9keSB7DQoJbWFyZ2luLXRv'+
        'cDogMjBweDsNCgltYXJnaW4tcmlnaHQ6IDEwcHg7DQoJbWFyZ2luLWJvdHRvbTogMjBweDsNCgltYXJnaW4tbGVmdDogNTBweDsN'+
        'CgloZWlnaHQ6IDIwMHB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojdGFyZ2V0X3NlbGVjdGlvbl9wb3B1cCBhIHsNCgl0ZXh0'+
        'LWRlY29yYXRpb246IG5vbmU7DQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI3RhcmdldF9zZWxlY3Rpb25fcG9wdXAgcCB7DQogICAg'+
        'bWFyZ2luOiAxcHg7DQoJcGFkZGluZzogMHB4Ow0KfQ=='
    );
    
    c$('div', 'class:popup_body').appendTo(popupElt.content)
    .append(c$('p').text('Write a post Message:').css('margin-bottom',1))
    .append(c$('textarea', 'id:message_post,class:black').width(400).height(80))
    .append('<br /><br />')
    .append(c$('p').text('Select Post destination:').css('margin-bottom',1))
    .append(c$('select', 'id:select_fbgroups,class:black').css('margin-right',5).width(400))
    .append(c$('a', 'href:#').text('Refresh').click(Events.refresh_click));
    
    b$('Publish', 'class:medium white').appendTo(popupElt.content).click(Events.select_click);
    
    if (Util.isString(defaultMessage)) {
        $('#message_post', popupElt.content).val(defaultMessage);
    }
    Groups.addToSelect('#select_fbgroups',defaultGroup);
    popupElt.show();
}

/**
 * Convert a long url to a new short url.
 * 
 * @param {String} longURL The long url to be shorter.
 * @param {Function} success The function to be executed after finish -> success(shortURL).
 * @param {Function} error The function to be executed if an error happen -> error().
 */
function getShortURL(longURL, success, error)
{
    try {
        if (!Util.isFunc(success)) {
            throw ReferenceError('callback is not defined.');
        }
        if (!Util.isString(longURL) || !/http/.test(longURL)) {
            throw ReferenceError('longURL is not defined.');
        }
        
        var bBitLy = global.options.get('usebitly');
        if (!global.options.get('api_bit_ly_login') || !global.options.get('api_bit_ly_key')) 
            bBitLy = false;
        
            
        // CROSS-DOMAIN TINYURL REQUEST
            
        if (global.xd_support === true && bBitLy !== true) {
            log$('Using tinyurl cross-domain request for short link...');
            httpXDRequest({
                method: 'GET',
                url : 'http://tinyurl.com/api-create.php?url=' + escape(longURL),
                onerror: error,
                onload: function(responseDetails) {
                    success && success(responseDetails.responseText);
                }
            });
            return;
        }
        
        
        // API
        var _api;
        
        // bit.ly.
        if (bBitLy === true) {
            log$('Using bit.ly api request for short link...');
            _api = {
                name: 'bit.ly',
                url: 'http://api.bit.ly/v3/shorten?callback=?',
                data: {
                    longUrl: String(longURL).replace(/\s+/g,'%20'),
                    format: 'json',
                    login: global.options.get('api_bit_ly_login'),
                    apiKey: global.options.get('api_bit_ly_key')
                }
            };
        }
        // tinyurl
        else {
            log$('Using tinyurl api request for short link...');
            _api = {
	            name: 'tinyurl',
	            url: 'http://json-tinyurl.appspot.com/?callback=?',
	            data: { url: longURL }
	        };
        }
        
        // USE JSONP API
        var bAborted = false;
        var nTimeout = setTimeout(
            function() {
                bAborted = true;
                error && error('timeout');
                if (_api.name == 'tinyurl') {
                    showHelpPopup({
                        icon: 'error',
                        title: 'Tinyurl service seem to be down.',
                        message: 'You can use bit.ly service to short your links.<br>' +
                            '<a href="http://userscripts.org/topics/66391" target="_black">Go here</a>' +
                            ' and learn about how to configure bit.ly service.<br>' +
                            'Click "Config" to open MWAddon configuration popup.<br>',
                        buttons: [{
                            label: 'Config',
                            addClass: 'short white',
                            onclick: appConfig
                        }, {
                            label: 'Cancel'
                        }]
                    });
                }
            },
        10000);
        
        // send request
        $.ajax({
            dataType: 'jsonp',
            url: _api.url,
            data: _api.data,
            global: false,
            success: function(jsonData)
            {
                if (bAborted === false) {
                    clearTimeout(nTimeout);
                    if (jsonData.status_code == 200) {
                        success && success(jsonData.data.url);
                    }  
                    else if (jsonData.ok) {
                        success && success(jsonData.tinyurl);
                    }
                    else {
                        error && error('unexpected json response.');
                    }
                }
            }
        });
    }
    catch(err) {
        logErr$(err);
        error && error(err.message);
    }
}

/**
 * Convert a short url to a long url.
 * 
 * @param {String} shortURL The short url to unshort.
 * @param {Function} success The function to be executed after finish -> success(longURL).
 * @param {Function} error The function to be executed if an error happen -> error().
 */
function getUnshortUrl(shortURL, success, error) {
    var errorHandler = function(err) {
        logErr$(err);
        error && error(err.message);       
    };
    try {
        if (!Util.isFunc(success)) {
            throw ReferenceError('callback is not defined.');
        }
        if (!Util.isString(shortURL) || !/http/.test(shortURL)) {
            throw ReferenceError('shortURL is not defined.');
        }
        // USE JSONP API
        var bAborted = false;
        var nTimeout = setTimeout(function() {
            bAborted = true;
            error && error('timeout');
        },10000);
        
        $.ajax({
            dataType: 'jsonp',
            url: 'http://api.unshort.me/?t=jsonp&r=' + shortURL,
            global: false,
            success: function(jsonData)
            {
                if (bAborted === false) {
                    clearTimeout(nTimeout);
                    
                    if (jsonData.success) {
                        success && success(jsonData.resolvedURL);
                    }
                    else {
                        error && error('unexpected json response.');
                    }
                }
            }
        });
    }
    catch(err) {
        errorHandler(err);
    }
}
/**
 * Return a new jQuery with the new sexy style button.
 * 
 * @param {String} label
 * @param {String} attr
 * @return {jQuery}
 */
function b$(label, attr) {
    var spanElt = c$('span').append(c$('span').html(label));
    return c$('a', attr).addClass('sexy_button_new').append(spanElt);
}

// =========================================================
// FACEBOOK CALLS.
// =========================================================
var facebook = {
    user: { 'first_name': 'Unknow' },
    
    session: {
        'uid'          : null,
        'session_key'  : null,
        'secret'       : null,
        'expires'      : null,
        'access_token' : null
    },
    
    _error: function (r) {
        showHelpPopup({
            icon: 'error',
            title: 'ERROR: (#'+r.error_code+')',
            message: r.error_msg
        });
    },
    
    init: function() {
        var fb = this;
        MWFB.getLoginStatus(function(response) {
            if (response) {
                log$('facebook api is loaded.');
                fb.session = response.session;
                MWFB.api('/me', function(user) {
                    fb.user = user;
                });
            }
            else {
                logErr$(Error('Unable to load facebook session.'));
            }
        }, true);
    },
    
    updateSession: function(callback) {
        var self = this;
        MWFB.getLoginStatus(function(response) {
            self.session = response.session;
            callback && callback();
        }, true);
    },
    
    // VALIDATE
    validate: function(r, onSuccess, onError) {
        //log$($.toJSON(r));
        
        if (r && (r.error_code == 101 || r.error_code == 190)) {
            facebook.updateSession();
            showHelpPopup({
                icon: 'error',
                title: 'Invalid token',
                message: 'Please, give offline permission to avoid this error.',
                buttons: [{
                    label: 'Give offline permission',
                    addClass: 'short white',
                    onclick: function () {
                        facebook.requestPermission('offline_access');
                    }
                }]
            });
        }
        else if (r && r.error_code && onError) {
            onError(r);
        }
        else {
            onSuccess && onSuccess(r);
        }
    },
    
    // REST API REQUEST
    restApi: function(method, onSuccess, onError, data) {
        data = data || new Object();
        
        data['format'] = 'json';
        data['access_token'] = this.session.access_token;
        
        $.ajax({
            url      : 'https://api.facebook.com/method/' + method + '?callback=?',
            dataType : 'jsonp',
            global   : false,
            data     : data,
            success  : function(res){facebook.validate(res, onSuccess, onError);}   
        });
    },
        
    // PERMISSIONS
    getAppPermissions: function(permissions, callback) {
        // read_stream, publish_stream, user_groups, offline_access,
        // read_friendlists
        var sql = 'SELECT '+permissions+' FROM permissions WHERE uid=me()';
		if (typeof callback === 'undefined') return;
		this.restApi('fql.query', callback, this._error, {query:sql});
		/*
        MWFB.api({method:'fql.query', query:sql}, function(result) {
            log$($.toJSON(result));
            callback && callback(result ? result[0] : null);
        });
		*/
    },
    requestPermission: function(permissions, callback) {
		var external_url = 'http://www.facebook.com/dialog/oauth/?scope={1}'+
		    '&client_id=10979261223&redirect_uri=http://apps.facebook.com/inthemafia/?';
			
		showHelpPopup({
			icon: 'info',
			title: 'Need permissions',
			message: 'You need to give permissions to Mafia Wars.<br><br>'+
				'Click "Accept" to open a new tab.<br>Click "Allow" to give the permissions.<br>'+
				'Reload Mafia wars to make sure it take effect.',
			buttons: [{
			    label:'Accept',
				addClass: 'short white',
				onclick: function(){ unsafeWindow.open( external_url.replace('{1}',permissions) ); }
			}, {
			    label: 'Cancel'
  			}]	
		});
		/*
		var self = this;
        MWFB.ui(
            {method:'permissions.request',perms:permissions}, 
            function(r) {
                self.session = r.session;
                callback && callback(r.perms == permissions);
            }
        );
		*/
    },
    needAppPermission: function(perms, callback) {
        var bNeedAsk = false;
        this.getAppPermissions(perms, function(result) {
		    var values = (result && result[0]) ? result[0] : null;
			
            if (!values) {
	            showHelpPopup({
	                icon: 'error',
	                title: 'Error loading permissions',
	                message: 'There is an unknow error getting your facebook permissions.<br>'+
                        'Close and Open your browser.<br><br>If you still getting this issue, '+
                        'clear the cookies and cache data of your browser, close it and open again.<br><br>'+
                        'If problem persist, go to Facebook privacy settings and remove all permissions for Mafia Wars, '+
                        'close the browser and try again.'
	            });
                return;
            }
            for (n in values) {
                if (parseInt(values[n]) !== 1) {
                    bNeedAsk = true;
                    break;
                }
            }
            if (bNeedAsk) {
                facebook.requestPermission(perms, callback);
            }
            else {
                callback && callback(true);
            }
        });
    },    
	
    // PUBLISH METHODS
    streamPublish: function(options, callback, bSilectMode) {
        var targetId = (options.target ? String(parseFloat(options.target)) : '');
        var privacy = global.options.get('privacy');
        var attachment = options.attachment || new Object();
        var actionLinks = options.actionLinks;
        
        if (!Util.isSet(actionLinks) && (options.actionText && options.url)) {
            actionLinks = new Array({
                'text': options.actionText,
                'href': options.url
            });
        }
        if (options.pic && options.url) {
            attachment['media'] = [{
                'type': 'image',
                'src': options.pic,
                'href': options.url
            }];
            attachment['href'] = options.url;
        }
        if (options.properties) {
            attachment['properties'] = options.properties;
        }
        if (options.description) {
            attachment['description'] = String(options.description).replace(/\{\*actor\*\}/g, this.user.first_name);
        }
        if (options.name) {
            attachment['name'] = String(options.name).replace(/\{\*actor\*\}/g, this.user.first_name);
        }
        this.needAppPermission('publish_stream', function(success) {
            if (success !== true) {
                return;
            }    
            if (global.options.get('publishPreview') === true) {
                 MWFB.ui({
                    'method'       : 'stream.publish',
                    'message'      : options.message,
                    'target_id'    : targetId,
                    'privacy'      : parseFloat(targetId) > 0 ? '' : $.toJSON(privacy),
                    'attachment'   : $.toJSON(attachment),
                    'action_links' : Util.isSet(actionLinks) ? $.toJSON(actionLinks) : ''
                 }, function(response) {
                     callback && callback(response && response.post_id);
                 });
            }
            else {
                facebook.restApi('stream.publish', callback, bSilectMode ? callback : facebook._error, {
                    'message'      : options.message,
                    'target_id'    : targetId,
                    'privacy'      : parseFloat(targetId) > 0 ? '' : $.toJSON(privacy),
                    'attachment'   : $.toJSON(attachment),
                    'action_links' : Util.isSet(actionLinks) ? $.toJSON(actionLinks) : ''
                });
            }    
        });
    },
    notesCreate: function(title, content, callback) {
        this.needAppPermission('publish_stream', function(success) {
            if (success === true) {
                facebook.restApi('notes.create',callback, facebook._error, {
                    'title'    : title,
                    'content'  : content
                }); 
            }
        });
    },
    notesEdit: function(note_id, title, content, callback) {
        var error = function(r) {
            showHelpPopup({
                icon: 'error',
                title:'Can\'t edit the note.',
                message: 'Make sure the note exists.'
            });
        };
        this.needAppPermission('publish_stream', function(success) {
            if (success === true) {
                facebook.restApi('notes.edit', callback, error, {
                    'note_id'  : note_id,
                    'title'    : title,
                    'content'  : content
                }); 
            }
        });
    },
    streamAddLike: function(post_id, callback) {
        this.restApi('stream.addLike', callback, this._error, {
            'post_id'  : post_id
        });
    },
    streamAddComment: function(post_id, comment, callback) {
        this.restApi('stream.addComment', callback, this._error, {
            'post_id'  : post_id,
            'comment'  : comment
        });
    },
    
    // FRIENDLIST
    friendlist: function(callback) {
        MWFB.api('/me/friendlists', function(result) {
            facebook.validate(result, callback, facebook._error); 
        });
    },
    friendlistCreate: function(name, callback) {
        MWFB.api('/me/friendlists', 'post', {'name': name}, function(result) {
            facebook.validate(result, callback, facebook._error); 
        });
    },
    friendlistAdd: function(listId, userId, callback) {
        MWFB.api('/'+listId+'/members/'+userId, 'post', function(result) {
            facebook.validate(result, callback); 
        });
    },
    
    // RETRIEVAL METHODS
    homeGet: function(callback, data) {
        MWFB.api('/me/friendlists', {'name': name}, function(result) {
            facebook.validate(result, callback); 
        });
        
    },
    
    streamGet: function(callback, data) {
        this.restApi('stream.get', callback, this._error, data);
    },
    friendsGetAppUsers: function (callback) {
        this.restApi('friends.getAppUsers', callback, this._error);
    },
    
    groupsGet: function(callback) {
        this.needAppPermission('user_groups', function(success) {
            var list = {'0': 'My Wall'};
            if (!success) {
                callback(list);
                return;
            }
            facebook.restApi('groups.get', function(groups) {
                if (groups && !groups.error_code) {
	                for (var i = 0; i < groups.length; i++) {
	                    list[groups[i].gid] = groups[i].name;
	                }
                }
                callback(list);
            }, this._error);
        });
    },
    
    queryFeed: function(limit, callback) {
        var sql = '';
        
        if (!Util.isNumber(limit)) { limit = 50; }
        
        sql += 'SELECT strip_tags(attachment), post_id, source_id, target_id, created_time, permalink';
        sql += ' FROM stream WHERE app_id=10979261223 ';
        sql += 'AND source_id in (SELECT target_id FROM connection WHERE source_id=me())';
        sql += 'order by created_time desc limit '+limit;
        this.updateSession(function() {
		    facebook.restApi('fql.query', callback, this._error, {query:sql});
		    //MWFB.api({method:'fql.query', query:sql}, callback, facebook._error);
        });
    },
    
    queryHomeLinks: function(max_time, callback) {
        if (!max_time) {
            max_time = parseInt((new Date()).getTime()/100);
        }
        var queries = {
            'query1': 'SELECT uid,status_id,message,time FROM status WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=me()) AND time<'+max_time+' order by time desc limit 300',
            'query2': 'SELECT strip_tags(attachment),post_id,source_id,target_id,created_time,message FROM stream WHERE app_id=10979261223 AND source_id in (SELECT target_id FROM connection WHERE source_id=me()) AND created_time<'+max_time+' order by created_time desc limit 300'
        };
        this.updateSession(function() {
            facebook.restApi('fql.multiquery', function(items) {
                var data = {status:{},streams:{}};
                if ( items && items[0] && items[0].fql_result_set ) {
                    data.status = items[0].fql_result_set;
                }
                if ( items && items[1] && items[1].fql_result_set ) {
                    data.streams = items[1].fql_result_set;
                }
                callback && callback(data);
            }, callback, {queries:Util.toJSON(queries)});
        });
    }

};

var Groups = {
    /**
     * @param {Function} callback
     */
    refresh: function(callback) {
        facebook.groupsGet(function(groups) {
            global.options.set('groups', groups);
            global.options.save(callback);
        });
    },
    /**
     * @param {Object} selector
     * @param {Number} default_group_id
     */
    addToSelect: function(selector, default_group_id) {
        var elt = $(selector).empty();
        $.each(global.options.get('groups'), function(id, name) {
            elt.append(c$('option', 'value:'+id).text(name));
        });
        if ( default_group_id ) {
            $('option[value='+default_group_id+']', elt).attr('selected','selected');
        }
    }
};

// =========================================================
// CONFIG POPUP
// =========================================================
/**
 * Create a new popup with global config options
 */
function Configuration() {
    
    if (typeof(global.popups['config_popup']) !== 'undefined') {
        global.popups['config_popup'].show();
        return;
    }
    var checkboxes = [
        {id:'checkForUpdates',      label:'Check for Addon updates.'},
        {id:'opt_PlayerStats',      label:'Modify player stats to show energy/stamita/global ratios.'},
        {id:'opt_JobRates',         label:'Modify jobs stats to show energy/stamita ratios.'},
        {id:'opt_GiftPage',         label:'Modify gift page to show new gifts and options.'},
        {id:'opt_CollectionPage',   label:'Modify Collection Page to use Multi Gifter popup for send gifts.'},
        {id:'opt_HideSocialModule', label:'Hide Social Module in Main page.'}
    ];
    var popupElt = new domPopupObject('config_popup', {
        type: 'main',
        title: '<img src="'+global.resource.configuration_title+'">',
        persistent: true,
        width: 650,
        center: false,
        buttons: [{
            label: 'Save configuration'
        }],
        onclose: saveConfig
    });
    var option_click = function() {
        var isfor = $(this).attr('isfor').replace('[','\\[').replace(']','\\]');
        var elem = $('#'+isfor).get(0);
        
        // throggle checked
        elem.checked = elem.checked !== true;
        $(this).toggleClass('checked',elem.checked);
    };
    var importSettings_click = function() {
        var index, values = new Object();
        popupElt.destroy();
        showPromptPopup(
            'Paste here the encoded configuration:', '', 
            function(resp) {
                try {
	                if (index = resp.indexOf('base64,')) {
	                    resp = global.Base64.decode(resp.substr(index + 7));
	                }
	                $.each($.parseJSON(resp), function(name, value) {
	                    if (!Util.isSet(defaults[name])) {
	                        return;   
	                    }
	                    var options = new Config(name, defaults[name]);
                        options.load(function() {
	                        options.loadConfig(value);
	                        if (name === 'main') {
                                global.options = options;
                                global.options.save(function() {
                                    setTimeout(Configuration, 100);
                                });
                            }    
                            else {
                                options.save();   
                            }
                        });
	                });
                }
                catch(err) {
                    logErr$(err);
                }
            }
        );
        return false;
    };
    var exportSettings_click = function() {
        var savedValues = new Object();
        var categories = new Array();
        
        $.each(defaults, function(name, value) {categories.push(name);});
        saveConfig(function() {loadSettings(categories.shift());});
        
        function loadSettings(name) {
            if (Util.isSet(name)) {
                var options = new Config(name, defaults[name]);
	            options.load(function() {
                    savedValues[name] = new Object();
                    $.each(options.all, function(opt, value) {
                        if (!/blackList|whiteList|excluded_thanks|excluded_gifts|todayLinks/.test(opt))
                            savedValues[name][opt] = value;
                    });
                    loadSettings(categories.shift());
	            });
            }
            else {
	            var sOutput = String($.toJSON(savedValues));
	            showTextPopup(
	                'Copy this encoded configuration to share/save:', 
	                'data:application/json;base64,' + global.Base64.encode(sOutput)
	            ); 
            }
        }
        return false;
    };
    var privacy_change = function() {
        var self = this;
        var pflElt = $('#privacy_fl', popupElt.content);
        var selected = this.options[this.selectedIndex].value;
        var privacy = global.options.get('privacy');
        
        if(selected == 'CUSTOM') {
            facebook.needAppPermission('read_friendlists', function(success) {
                if(!success) {
                    self.selectedIndex = 1;
                    return;
                }
                facebook.friendlist(function(list) {
                    if (!list || list.error_code || list.data.length < 1) {
                        showHelpPopup({
                            icon: 'error',
                            title: 'friendlist length',
                            message: 'Seem that you haven\'t friendlists.'
                        });
                        return;
                    }
                    var data = list.data, opt;
                    pflElt.empty();
                    for(var i = 0; i < data.length; i++) {
                        opt = c$('option', 'value:'+data[i].id).text(data[i].name);
                        pflElt.append(opt);
                        if (privacy && privacy.allow == data[i].id) {
                            opt.attr('selected', 'selected');
                        }
                    }
                    pflElt.show();
                });
            });
        }
        else {
            pflElt.hide();
        }
        return false;
    };
    function saveConfig(callback) {
        var value = $('option:selected', '#privacy').val();
        if (value !== 'CUSTOM') {
            global.options.set('privacy', {'value':value});
        }
        else {
            global.options.set('privacy', {
                'value': value,
                'friends': 'SOME_FRIENDS',
                'allow': $('option:selected', '#privacy_fl').val()
            });
        }
        global.options.fromDomElements();
        global.options.save(callback);
    }
    function addCheckBox(id, label, element, bLeft) {
        var bChecked = global.options.get(id);
        id = String(id).toLowerCase();
        
        var checkElt = c$('input:checkbox', 'id:main_'+id).appendTo(element).hide();
        var boxElt   = c$('div', 'isfor:main_'+id+',class:checkbox clearfix')
            .appendTo(element).text(label).click(option_click);
            
        if (bChecked) {
            checkElt.attr('checked', 'checked');
            boxElt.addClass('checked'); 
        }
        if (bLeft) {
            boxElt.css('float', 'left').width(100);
        }
    }
    // add style
    popupElt.addBase64Style(
		'I2NvbmZpZ19wb3B1cCAuYmxhY2tfYm94IHsNCgl3aWR0aDogNDAwcHg7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7IA0KCWNvbG9yOiBy'+
		'Z2IoMjA4LCAyMDgsIDIwOCk7IA0KCWJvcmRlcjogMXB4IHNvbGlkIHJnYigxNTMsIDE1MywgMTUzKTsgDQoJYmFja2dyb3VuZC1j'+
		'b2xvcjogYmxhY2s7IA0KCWZvbnQtc2l6ZTogMTRweDsNCn0NCiNjb25maWdfcG9wdXAgLmZyYW1lX2JveCB7DQoJYm9yZGVyOiAx'+
		'cHggc29saWQgIzRGNEY0RjsNCgltYXJnaW4tYm90dG9tOiAyMHB4Ow0KCXBhZGRpbmc6IDEwcHg7DQoJdGV4dC1hbGlnbjogbGVm'+
		'dDsNCn0NCiNjb25maWdfcG9wdXAgZGl2LmNoZWNrYm94IHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56'+
		'eW5nYS5jb20vbXdmYi9ncmFwaGljcy9mbGFncy9td19tZXNzYWdlYm94X2NoZWNrYm94Ml9ub3JtYWxpemVkLmdpZiIpIG5vLXJl'+
		'cGVhdCBzY3JvbGwgMCUgMCUgdHJhbnNwYXJlbnQ7DQoJdGV4dC1hbGlnbjogbGVmdDsNCgltYXJnaW4tdG9wOiA0cHg7DQoJbWlu'+
		'LWhlaWdodDogMjBweDsNCgl3aWR0aDogYXV0bzsgDQoJcGFkZGluZy1sZWZ0OiAzMHB4OyANCgloZWlnaHQ6IDIwcHg7DQoJY3Vy'+
		'c29yOiBwb2ludGVyOw0KfQ0KI2NvbmZpZ19wb3B1cCBkaXYuY2hlY2tib3guY2hlY2tlZCB7DQoJYmFja2dyb3VuZDogdXJsKCJo'+
		'dHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3MvZmxhZ3MvbXdfbWVzc2FnZWJveF9jaGVja2JveDFfbm9y'+
		'bWFsaXplZC5naWYiKSBuby1yZXBlYXQgc2Nyb2xsIDAlIDAlIHRyYW5zcGFyZW50Ow0KfQ=='
    );
    
    function genMainDom() {
        c$('div').appendTo(popupElt.header).html('Version: '+ scriptAppInfo.appVer).css({
            'float'        : 'right',
            'font-size'    : 16,
            'font-weight'  : 'bold',
            'margin'       : '35px 40px 0px'
        });
        popupElt.content.css('padding', '10px 30px');
        
        var thisTab, tb = new domTabObject(popupElt.content,'config_tabs',
            ['General', 'Autodeposit', 'Short Service', 'Publish'], 300);
            
        // GENERAL SETTINGS    
        thisTab = tb.getLayout(0).css('padding',20);
        c$('p').appendTo(thisTab)
        .append(c$('span').text('To make all MWAddon work, you need to give '))
        .append(c$('a','href:#').text('All required Permission')
        .click(function () {facebook.requestPermission('read_stream,publish_stream,user_groups,offline_access,read_friendlists');}))
        .append(c$('span').text(' to Mafia Wars.'));
        $.each(checkboxes, function(index, item) {addCheckBox(item.id, item.label, thisTab);});
        c$('center').appendTo(thisTab).css('margin-top', 20)
        .append(b$('Import all settings', 'class:medium orange').click(importSettings_click))
        .append('<br /><br />')
        .append(b$('Export all settings', 'class:medium orange').click(exportSettings_click))
        
        // AUTODEPOSIT SETTINGS
        thisTab = tb.getLayout(1).css('padding',20);
        c$('p').text('Set Autodeposit for:').appendTo(thisTab);
        var ulElt = c$('ul').appendTo(thisTab).css('list-style-type','none');
        $.each(global.cities, function(index, name) {
            var boxElt = c$('li').appendTo(ulElt).height(25);
            addCheckBox('autoDepositIn'+index, name, boxElt, true);
            c$('span').text(' When cash is more than: ').appendTo(boxElt);
            c$('input:text','class:black_box,id:main_autodepositamount'+index).width(150).appendTo(boxElt);
        });
        
        // SHORT LINK SERVICES
        thisTab = tb.getLayout(2).css('padding',20);
        addCheckBox('usebitly', 'Use bit.ly service for shorting url.', thisTab);
        var table = new domTableObject(thisTab, 2, 2);
        table.cell(0, 0).css('text-align', 'right').append(c$('span').text('Login name: '));
        table.cell(0, 1).append(c$('input:text', 'id:main_api_bit_ly_login, class:black_box'));
        table.cell(1, 0).css('text-align', 'right').append(c$('a').text('Your api key: ').attr({
            'href': "http://bit.ly/a/your_api_key",
            'target': "_black"
        }));
        table.cell(1, 1).append(c$('input:text', 'id:main_api_bit_ly_key, class:black_box'));
        
        // PUBLISH SETTINGS
        thisTab = tb.getLayout(3).css('padding',20);
        var privacy = global.options.get('privacy');
        var privacyOpts = {
            'Everyone'            : 'EVERYONE',
            'All friends'         : 'ALL_FRIENDS',
            'Friends of friends'  : 'FRIENDS_OF_FRIENDS',
            'Myself'              : 'SELF',
            'From friend list'    : 'CUSTOM'
        };
        c$('p').appendTo(thisTab).text('Wall posts privacy: ');
        var elem = c$('select', 'id:privacy,class:black_box').width(200)
        .css('margin-left',10).change(privacy_change).appendTo(thisTab);
        c$('select', 'id:privacy_fl,class:black_box').appendTo(thisTab)
        .css('margin-left',10).width(200).hide();
        $.each(privacyOpts, function(name, value) {
            var opt = c$('option', 'value:'+value).text(name);
            elem.append(opt);
            if (privacy && privacy.value == value) {
                opt.attr('selected', 'selected');
            }
        });
        elem.change();
        c$('p').appendTo(thisTab).text('Publish API: ');
        addCheckBox('publishPreview', 'Use Facebook user interface.', thisTab);
        c$('div').appendTo(thisTab).text('IMPORTANT!').css('color','red');
        c$('div').appendTo(thisTab).html('Check this option ONLY if you\'re going to publish in your wall.<br>Otherwise uncheck it.');
        
        // PAYPAL BUTTON
        c$('a', 'target:_black').appendTo(c$('center').css('margin',5).appendTo(popupElt.content))
        .attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CQVWPSUMDKW5N')
        .append(c$('img').attr('src', 'https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif'));
    
    }
    
    global.options.load(function() {
        genMainDom();
        global.options.toDomElements();
        // show popup
        popupElt.show();
    });
} 

// =========================================================
// MODS
// =========================================================

/**
 * Add the top header menu.
 */
function modMenu()
{
    if (e$('#fbmw_menu_container') !== null) {
        return;
    }
    
    var plugins = new Config('plugins', defaults.plugins);
    var menu_container = c$('div', 'fbmw_menu_container').prependTo(global.final_wrapper);
    
    var menuOptions = [
        {name:'FBMWAddon Options',        'click': Configuration,        'main': true               },
        {name:'Free Gifts Center',        'click': FreeGiftsCenter,      'timer':'freeGiftsCenter'  },
        {name:'Collect All Cities',       'click': CollectAllCities,     'timer':'collectAllCities' },
        {name:'Battlefield v2! (beta)',   'click': Battlefieldv2                                    },
        {name:'Home Feed Center',         'click': HomeFeedCenter,       'timer':'homeFeedCenter'   },
        {name:'Gifts Page (Short Links)', 'click': tofreegiftsPage,      'timer':'freegifts'        },
        {name:'Craft Manager',            'click': CraftManager,         'timer':'craftManager'     },
        {name:'Operations Center',        'click': OperationsCenter,     'timer':'operationscenter' },
        {name:'Multi Gifter',             'click': MultiGifter                                      },
        {name:'Plug-In Manager',          'click': PluginManager,        'plugins': true            },
        {name:'My Links',                 'click': UserLinks                                        },
        {name:'Inventory Analizer',       'click': InventoryAnalizer                                },
        {name:'Mafia Wiper',              'click': MafiaWiper                                       },
        {name:'Go Atlantic City!',        'click': toAtlanticCity,       'timer':'AtlanticCity'     }
    ];
    
    var mainMenuClick = function() {
        var menu = menuOptions[$(this).attr('idx')];
        if (menu.timer) {
            global.options.get('menu_timers')[menu.timer] = (new Date()).getTime();
            global.options.save();
        }
        if (Util.isFunc(menu.click)){
            menu.click();
        }
        return false;
    };
    var pluginMenuClick = function() {
        var menu = plugins.get('all')[$(this).attr('idx')];
        if (Util.isString(menu.click)) {
            window.location = menu.click;
        }  
        return false;
    };
    var menuEnter = function() {
        var self    = $(this);
        var menu    = menuOptions[ $(this).attr('idx') ];
        
        var subMenu = $('#fbmw_menu #fbmw_plugins');
        
        if (menu.plugins) {
            if (subMenu.length === 1) {
		        subMenu.css('top', self.position().top);
		        subMenu.show();
            }
            return false;
        }
        
        if (menu.timer) {
	        var nNow  = (new Date()).getTime();
	        var nTime = global.options.get('menu_timers')[menu.timer];
	        if (nTime) {
	            $(this).attr('title', 'You run '+menu.name+' '+Util.toDateString(nNow - nTime)+' ago.');
	        }
        }
        
        subMenu.hide();
        return false;
    };
    
    // Add styles
    c$('style').text(global.Base64.decode(
        'I2ZibXdfbWVudV9hcnJvdyB7DQoJcG9zaXRpb246IGFic29sdXRlOw0KCXotaW5kZXg6IDI1Ow0KCXRvcDogMTBweDsNCglsZWZ0'+
        'OiAycHg7DQoJd2lkdGg6IDQwcHg7DQoJaGVpZ2h0OiA0MHB4Ow0KfQ0KI2ZibXdfbWVudSB7DQoJcG9zaXRpb246IGFic29sdXRl'+
        'Ow0KCXotaW5kZXg6IDMwOw0KCXRvcDogMTBweDsNCgl3aWR0aDogMTgwcHg7DQoJbWluLXdpZHRoOiAxODBweDsNCglib3JkZXI6'+
        'IDFweCBzb2xpZDsNCglib3JkZXItbGVmdC13aWR0aDogMHB4Ow0KCWJvcmRlci1yaWdodC13aWR0aDogMnB4Ow0KCWJvcmRlci1y'+
        'aWdodC1jb2xvcjogeWVsbG93Ow0KCWZvbnQtc2l6ZTogMTJweDsNCglmb250LXdlaWdodDogYm9sZDsNCglsZWZ0OiAtMTc4cHg7'+
        'DQoJdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNmYm13X21lbnUgZGl2LmFkZG9uX3N1Ym1lbnUgew0KCWRpc3BsYXk6IG5vbmU7DQoJ'+
        'cG9zaXRpb246IGFic29sdXRlOw0KCXotaW5kZXg6IDMxOw0KCXdpZHRoOiAxODBweDsNCgltaW4td2lkdGg6IDE4MHB4Ow0KCWJv'+
        'cmRlcjogMXB4IHNvbGlkIHllbGxvdzsNCglmb250LXNpemU6IDEycHg7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJdGV4dC1hbGln'+
        'bjogbGVmdDsNCn0NCiNmYm13X21lbnUgYS5idXR0b25fYWN0aW9uIHsNCgliYWNrZ3JvdW5kOiAjMDAwMDE4IDEwMCUgNTAlIG5v'+
        'LXJlcGVhdDsNCgljb2xvcjogd2hpdGU7DQoJZGlzcGxheTogYmxvY2s7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCglwYWRkaW5nOiA1'+
        'cHggNXB4IDVweCAxMHB4Ow0KfQ0KI2ZibXdfbWVudSBhLm1haW4gew0KCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCB3aGl0ZTsN'+
        'Cn0NCiNmYm13X21lbnUgYS5idXR0b25fYWN0aW9uOmhvdmVyIHsNCgliYWNrZ3JvdW5kLWNvbG9yOiAjMzIzMjMyOw0KCWNvbG9y'+
        'OiAjRkZEOTI3Ow0KCXRleHQtZGVjb3JhdGlvbjogbm9uZTsNCn0='
    )).appendTo(menu_container);
    
    setTimeout(function() {
	    // Add menu arrow
	    c$('div', 'fbmw_menu_arrow').appendTo(menu_container)
	    .css('background-image', 'url("' + global.resource.menu_arrow + '")')
	    .mouseenter(function(){ $('#fbmw_menu').stop().animate({'left': '0px'}, 'normal'); });
	    
	    // Add menu
	    var mainMenu = c$('div', 'id:fbmw_menu').appendTo(menu_container);
	    
	    mainMenu.mouseleave(function() {
	        $('#fbmw_menu').stop().animate({'left': '-178px'}, 'normal');
	        $('#fbmw_plugins').hide();
	    });
	    
	    // Add main menu options
	    $.each(menuOptions, function(index, menu) {
	        var a = c$('a', 'class:button_action').appendTo(mainMenu).html(menu.name);
	        if (menu.main) a.css('border-bottom', '1px solid white');
	        a.click(mainMenuClick).mouseenter(menuEnter).attr('idx', index);
	    });
	    
	    // Add plugins submenu options
	    plugins.load(function() {
	        var plugInsMenu = c$('div', 'id:fbmw_plugins,class:addon_submenu').appendTo(mainMenu)
	        
	        plugInsMenu.css('left', mainMenu.outerWidth());
	        if (plugins.get('all').length < 1) {
	            c$('a', 'class:button_action').appendTo(plugInsMenu)
	            .text('No Plug-Ins installed.').click(PluginManager);
	            return;
	        }
	        $.each(plugins.get('all'), function(index, menu) {
	            var a = c$('a', 'class:button_action').appendTo(plugInsMenu);
	            a.html(menu.name).click(pluginMenuClick).attr('idx', index);
	        });
	    });
    }, 2000);
}

/**
 * Update the user stats with ratios.
 */
function modUserStats()
{
    
    if (!global.options.get('opt_PlayerStats')) {
        return;
    }
    var fixedInt = function(n){
        if (n == 'Infinity') {
            return 0;
        }
        else {
            return n.toFixed(Math.abs(n) < 10 ? 2 : 0);
        }
    };
    try {
        var energy = global.userStats.energy(), stamina = global.userStats.stamina();
        var expNeedtoLevel = global.userStats.exp_to_next_level();
        var energyRatio = fixedInt(expNeedtoLevel / energy);
        var staminaRatio = fixedInt(expNeedtoLevel / stamina);
        var globalRatio = fixedInt(expNeedtoLevel / (energy + stamina));
        
        var statElt = $('#user_stats').find('.stat');
        if (e$('.experience > strong', statElt) !== null) 
            $('.experience > strong', statElt).hide().appendTo(statElt);
        $('.experience', statElt).html('Exp Need: <span class="energy_highlight">' + expNeedtoLevel + '</span>');
        
        var tooltips = {
            'energy_ratio': 'You need to gain {0} experience points for each one energy point to level up.',
            'stamita_ratio': 'You need to gain {0} experience points for each one stamita point to level up.',
            'global_ratio': 'You need to gain {0} experience points for each one energy and stamita point to level up.'
        };
        var applyTag = function(str, tag_array) {
            for (var t in tag_array) {
                str = str.replace('{' + t + '}', tag_array[t]);
            }
            return str;
        };
        
        $('.level_stat', '#user_stats').width(70);
        
        (e$('#energy_ratio') ||
        c$('span', 'energy_ratio').addClass('energy').appendTo(statElt).css({
            'padding-right': 5,
            'font-size': 12
        }))
        .attr('title', applyTag(tooltips['energy_ratio'], {0:energyRatio})).text(energyRatio + ' -');
        
        (e$('#stamita_ratio') ||
        c$('span', 'stamita_ratio').addClass('energy').appendTo(statElt).css({
            'padding-right': 5,
            'font-size': 12,
            'background': 'url("http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif") no-repeat scroll 0pt 50% transparent'
        }))
        .attr('title', applyTag(tooltips['stamita_ratio'], {0:staminaRatio})).text(staminaRatio + ' -');
        
        (e$('#global_ratio') ||
        c$('span', 'global_ratio').addClass('more_in').appendTo(statElt).css('font-size', 12))
        .attr('title', applyTag(tooltips['global_ratio'], {0:globalRatio})).text(globalRatio);
    } 
    catch (err) {
        logErr$(err);
    }
}

/**
 * Add a no-frame link to the Top of Mafia Wars canvas iframe.
 */
function modNoCanvasFrame() 
{
    var canvas_iframe = x$('//iframe[@class="canvas_iframe_util"]');
    
    if (canvas_iframe !== null) {
        var divElt = document.createElement('div');
        
        divElt.innerHTML = '<span style="font-weight: bold; font-size: 14px;">'+
            scriptAppInfo.appName + ' v' + scriptAppInfo.appVer + '&nbsp;|&nbsp;' +
            '<a href="'+ scriptAppInfo.appUrl + '">Check Updates</a></span>';
            /*'&nbsp;|&nbsp;'+
            '<a href="' + canvas_iframe.getAttribute('src') + '">'+
            'Load No-Frame MafiaWars Game.</a></span>';*/
        canvas_iframe.parentNode.insertBefore(divElt, canvas_iframe);
    }
}

/**
 * Check Cash and auto deposit it. 
 */
function AutoDeposit(htmlText) {
    var user_fields; 
    try {
        user_fields = $.parseJSON(htmlText).user_fields;
    }
    catch(err) {
        eval(Util.substr(htmlText,'var user_fields', 'user_fields_update'));
    }
    if (!Util.isSet(user_fields)) return;
    
    var cityId = user_fields['current_city_id'];
    var cash = user_fields['user_cash'];
    
    if (global.options.get('autoDepositIn'+cityId) !== true) {
        return;
    }
    if (cash > global.options.get('autoDepositAmount'+cityId)) {
        MW.deposit(cityId, cash, function(msgText) {
            var messageElt;
            if ((messageElt = e$('#deposit_message')) !== null) {
                clearTimeout(messageElt.attr('timeout'));
            }
            else {
                messageElt = c$('div', 'deposit_message').prependTo('#mainDiv');
            } 
            messageElt.stop().html(msgText).css({
                'opacity': 1,
                'width': '69%',
                'height': 35,
                'position': 'absolute',
                'top': 1,
                'left': '30%',
                'background-color': 'black',
                'z-index': 9999,
                'border': '2px solid white',
                'text-align': 'center',
                'padding-top': 15,
                'font-weight': 'bold'
            })
            .attr('timeout', setTimeout(function() {
                messageElt.fadeOut(3000, function() {
                    messageElt.remove();
                })
            }, 5000));
        });
    }
}

// =========================================================
// PAGES.
// =========================================================
function toAtlanticCity() {
    var popupElt = new domPopupObject({
        type: 'normal',
        title: 'Atlantic City',
        autoOpen: true,
        content: c$('iframe').attr({
            'width': 550,
            'height': 450,
            'src': 'http://m.mafiawars.com/mobileweb?iframe=1'
        })
    });
}
function tofreegiftsPage() {
    do_ajax('mainDiv', 'remote/' + MW.getIntURL('freegifts', 'view'), 0, 1);
    return false;
}
function toOperationsPage() {
    do_ajax('inner_page', 'remote/' + MW.getIntURL('socialmission', 'view'), 1, 1);
    return false;
}

function PageIndex() {
    if (global.options.get('opt_HideSocialModule')) {
        $('#FeaturedEventsModule').hide();   
    }
}

/**
 * Update the gift page adding a checkbox to each gift box and buttons for get
 * links.
 */
function PageGift() 
{
    if (!global.options.get('opt_GiftPage') || e$('.freegift_grid') == null)
        return;
        
    var n_giftCat = 1;
    var freegift_buttons;
    var options = new Config('giftpage', defaults.giftpage);
    
    var fixedGifts = {
        86 : { name:'Red Mystery Bag'     , img:'item_mysterybag_red.png'                  , title:'MYSTERY'        , isnew:true},
        400: { name:'Secret Drop'         , img:'icon_atk_75x75_01.png'                    , title:'MYSTERY'        , isnew:true},
        401: { name:'Italian Hardwood'    , img:'huge_item_italianhardwood_01.png'         , title:'ITALY'          , isnew:true},
        402: { name:'Marble Slab'         , img:'huge_item_marbleslab_01.png'              , title:'ITALY'          , isnew:true},
        422: { name:'Exotic Animal Feed'  , img:'huge_item_exoticanimalfeed_01.png'        , title:'ITEM PART'      , isnew:true},
        444: { name:'Set of Hidden Charges', img:'huge_item_hiddencharges_01.png'          , title:'CONSUMABLES'    , isnew:true},
        445: { name:'Cooked Book'         , img:'huge_item_cookedbook_01.png'              , title:'CONSUMABLES'    , isnew:true},
        //423: { name:'Time Capsule'        , img:'huge_item_timecapsule_01.png'             , title:'MYSTERY REWARD' , isnew:true},
        //434: { name:'Coffin'              , img:'huge_item_coffinclosed_01.png'            , title:'MYSTERY REWARD' , isnew:true},
        189: { name:'Special Part'        , img:'huge_item_parts_01.png'                   , title:'ITEM PART'      , isnew:true},  
        417: { name:'Aquarium'            , img:'huge_item_aquarium_01.png'                , title:'PRIVATE ZOO'    , isnew:true},
        418: { name:'Big Cage'            , img:'huge_item_bigcage_01.png'                 , title:'PRIVATE ZOO'    , isnew:true},
        419: { name:'Bird Cage'           , img:'huge_item_birdcage_01.png'                , title:'PRIVATE ZOO'    , isnew:true},
        420: { name:'Feeding Trough'      , img:'huge_item_feedingtrough_01.png'           , title:'PRIVATE ZOO'    , isnew:true},
        421: { name:'Terrarium'           , img:'huge_item_terrarium_01.png'               , title:'PRIVATE ZOO'    , isnew:true},
        181: { name:'Hammer'              , img:'huge_item_hammer_01.png'                  , title:'ARMORY' },
        182: { name:'Rivet'               , img:'huge_item_rivets_01.png'                  , title:'ARMORY' },
        183: { name:'Furnace'             , img:'huge_item_furnace_01.png'                 , title:'ARMORY' },
        184: { name:'Vice'                , img:'huge_item_vice_01.png'                    , title:'ARMORY' },
        185: { name:'Anvil'               , img:'huge_item_anvil_01.png'                   , title:'ARMORY' },
        75 : { name:'Arc Welder'          , img:'huge_item_arcwelder_01.gif'               , title:'WEAPONS DEPOT' },
        76 : { name:'Buzzsaw'             , img:'huge_item_electronicwhetstone_01.gif'     , title:'WEAPONS DEPOT' },
        77 : { name:'Gunpowder'           , img:'huge_item_gunpowder_01.gif'               , title:'WEAPONS DEPOT' },
        78 : { name:'Gun Drill'           , img:'huge_item_gundrill_01.gif'                , title:'WEAPONS DEPOT' },
        79 : { name:'Forge'               , img:'huge_item_forge_01.gif'                   , title:'WEAPONS DEPOT' },
        70 : { name:'Cement Block'        , img:'huge_item_cinderblock_01.png'             , title:'CHOP SHOP' },
        71 : { name:'Power Tool'          , img:'huge_item_powertools_01.png'              , title:'CHOP SHOP' },
        72 : { name:'Car Lift'            , img:'huge_item_carlift_01.png'                 , title:'CHOP SHOP' },
        73 : { name:'Acetylene Torch'     , img:'huge_item_acetylenetorches_01.png'        , title:'CHOP SHOP' },
        74 : { name:'Shipping Container'  , img:'huge_item_shippingcontainers_01.png'      , title:'CHOP SHOP' },   
        161: { name:'Cinder Block'        , img:'huge_item_Cinderblock_01.gif'             , title:'CASINO' },
        162: { name:'Steel Girder'        , img:'huge_item_buildcasino_steelgirders_01.gif', title:'CASINO' },
        163: { name:'Concrete'            , img:'huge_item_Concrete_01.gif'                , title:'CASINO' },
        164: { name:'Construction Tool'   , img:'huge_item_constructiontools_01.png'       , title:'CASINO' },
        169: { name:'Security Camera'     , img:'huge_item_securitycamera_01.png'          , title:'VAULT' },
        170: { name:'Reinforced Steel'    , img:'huge_item_reinforcedsteel_01.png'         , title:'VAULT' },
        171: { name:'Deposit Box'         , img:'item_depositbox_01.png'                   , title:'VAULT' },
        172: { name:'Motion Sensor'       , img:'item_motionsensor_01.png'                 , title:'VAULT' },
        173: { name:'Magnetic Lock'       , img:'huge_item_magneticlock_01.png'            , title:'VAULT' }
    };
    var Gift = {
        sortByName: function(a, b) {
            var x = b.title.toLowerCase();
            var y = a.title.toLowerCase();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        },
        isValid: function(id, url) {
            try {
                if (Util.uSplit(url).ztrack_subcategory.indexOf('527_') !== -1) {
                    return (/mystery bag/.test(fixedGifts[id].name.toLowerCase()));
                }
            }
            catch(err) { logErr$(err); }
            return true;
        },
        getNameFromTag: function(tag) {
            return tag.substring(tag.lastIndexOf('_') + 1);
        },
        getImageUrl: function(name) {
            if (/http/.test(name)) {
                return name;
            }
            else {
                return global.zGraphicsURL + name;
            }
        },
        getCat: function(giftID) {
	        var elt = document.createElement('div');
	        elt.setAttribute('onclick', 'return allCats['+giftID+'];');
            try {
                return elt.onclick();
            } 
            catch (e) {
                try {
                    return unsafeWindow.allCats[giftID];
                }
                catch(e) {
                    return 1;
                }
            }
        }
    };
    
    var Events = {
        selection_click: function() {
            var sArr, index = parseInt( this.options[this.selectedIndex].value );
            if (index === -1) { sArr = options.get('checkedGifts'); } 
            else { sArr = options.get('mySelections')[index].ids; }
            
            log$('onChange: '+this.options[this.selectedIndex].value);
            
            $.each(fixedGifts, function(id, gift) {
                var elem = e$('#freegift_box_' + id);
                if (elem === null) { return; }
                
                var checked = $('.freegift_box_stats input', elem)[0].checked;
                
                if ((checked && sArr.indexOf(id)=== -1) || (!checked && sArr.indexOf(id)!== -1)) {
                    $('.freegift_box_stats', elem).click();
                }
                 
            });
            return false;
        },
        updateSelection_click: function() {
            var a = new Array();
            var index = parseInt( $('option:selected', '#myselections').val() );
            
            if (index > -1) {
	            $('input:checkbox[name=freegift_box_input]:checked', '#gift_container')
	            .each(function(i, elem) { a.push(elem.value); });
	            options.get('mySelections')[index].ids = a;
	            options.save();
                showHelpPopup({
                    icon: 'info',
                    title: 'Update selection',
                    message: 'Your selection has been updated.',
                    autoclose: 3
                });
            }
            return false;
        },
        saveSelection_click: function() {
            var n, a = new Array();
            if ( !(n = prompt('Type the name for the new selection (5 char. min.):')) ) { return; }
            if (n.length < 5) { return; }
            
            if (!Util.isArray(options.get('mySelections')) ) {
                options.set('mySelections', new Array());
            }
            
	        $('input:checkbox[name=freegift_box_input]:checked', '#gift_container')
	        .each(function(index, elem) { a.push(elem.value); });
	        options.get('mySelections').push({ 'name':n, 'ids':a });
	        options.save(updateSelectCtrl);
            
            $('#myselections').change();
            return false;
        },
        remSelection_click: function() {
            var mySL = options.get('mySelections');
            var index = parseInt( $('option:selected', '#myselections').val() );
            
            if (index === -1) {
                showHelpPopup({
                    icon: 'info',
                    title: 'Can\'t remove Selection',
                    message: 'This selection is locked and used internaly by MWAddon.'
                });
            }
            else if (confirm('Are you sure to delete this selection?')) {
                log$('onRemove: '+mySL[index].name);
                mySL.splice(index, 1);
                options.save(updateSelectCtrl);
            }
            $('#myselections').change();
            return false;
        },
        select_click: function() {
            var type = $(this).attr('href').substring(1);
            
            $('.tab_box_content:visible').find('.freegift_box')
            .each(function(i, elem) {
                var checked = $('.freegift_box_stats input', elem)[0].checked;
                
                if ( (type === 'invert') || 
                     (type === 'all' && checked !== true) || 
                     (type !== 'all' && checked !== false) ) 
                { 
                    $('.freegift_box_stats', elem).click(); 
                }
            });
            return false;
        },
        resetLinks_click: function() {
            resetLinks(true);
            showHelpPopup({
                icon: 'info',
                title: 'Links restored',
                message: 'All stored links has been reset and now you\'ll create new ones.'
            });
            return false;
        },
        shortLinks_click: function() {
        	options.fromDomElements();
        	options.save();
            getLinks(true, showShortLinks);
            return false;
        },
        publishAll_click: function() {
            var checked = $('input:checkbox[name=freegift_box_input]:checked', '#gift_container');
            log$('checked amount: '+checked.length);
            options.fromDomElements();
            options.save();
            if (checked.length > 25) {
                showHelpPopup({
                    icon: 'info',
                    title: 'Too many gifts',
                    message: 'You\'ve selected too many gifts for publish all.<br>'
                           + 'please select a maximum of 25.'
                });
                return false;
            }
            getLinks(false, function(colArr) {
                if ($('#giftpage_perslinks').attr('checked')) {
                    getPersonalLinks(function(perLinks) {
                        var outText = '\n';
                        $.each(perLinks, function(i, o) {
                            outText += Util.formatText(o.name) + ' => '+ o.short_url + '\n';
                        });
                        Show(colArr, outText);
                    });
                }
                else {
                    Show(colArr);
                }
            });
            function Show(collection, defMessage) {
                showGroupSelection(options.get('defaultGroup'), function(target, msg) {
                    options.set('defaultGroup', target);
                    options.save();
                    publishLinks(collection, target, msg);
                }, defMessage);
            }
            return false;
        },
        publishSelected_click: function() {
            var selectedGift = e$('.freegift_box_selected');
            if (selectedGift == null) {
                showHelpPopup({
                    icon: 'info',
                    title: 'Select a gift to publish.',
                    message: 'Click in the image of a gift to make it selected.<br>Then try again.'
                });
                return false;
            }
        	options.fromDomElements();
            showGroupSelection(options.get('defaultGroup'), function(target, msg) {
                options.set('defaultGroup', target);
                options.save();
                publishSelected(selectedGift.attr('id').substring(13), target, msg);
            });
            return false;
        },
        checkbox_click: function() {
            var checkbox = $('input:checkbox', this).get(0);
            checkbox.checked = checkbox.checked !== true;
            $(this).css('background-color',checkbox.checked ? 'grey' : 'transparent')
            .find('span').text(checkbox.checked ? 'CHECKED' : 'UNCHECKED');
            return false;
        },
        category_click: function() {
            var text = String($(this).text()).replace(/\s/g,'');
            var checked = $('input:checkbox', $(this).parent()).get(0).checked !== true;
            
            $('div[giftcat='+text+']', '#gift_container').each(function(index, elem) {
                var checkbox = $('input:checkbox', elem).get(0);
                if (checkbox.checked !== checked) {
                    $('.freegift_box_stats', elem).click();
                }
            });
            return false;
        }
    };
    
    function genGiftDom() 
    {
        var gift, giftId, checked;
        var tab = new domTabObject(
            c$('div').insertAfter('.freegift_grid'),
            'gift_container', ['New Gifts', 'Old Gifts'], 845, 695
        );
        
        $('.freegift_grid').parent().height('auto');
        $('.freegift_grid').remove();
        $('#gift_container').css('margin',0);
        
        tab.tabClear()
        .append(c$('a', 'href:#').text('Reset Stored Links').click(Events.resetLinks_click))
        .append(c$('span').text('|').css('margin','0px 10px 0px 10px'))
        .append(c$('a', 'href:#all').text('Select All').click(Events.select_click))
        .append(c$('span').text('|').css('margin','0px 10px 0px 10px'))
        .append(c$('a', 'href:#none').text('Select None').click(Events.select_click))
        .append(c$('span').text('|').css('margin','0px 10px 0px 10px'))
        .append(c$('a', 'href:#invert').text('Invert Selection').click(Events.select_click));
        
        for (var id in fixedGifts) 
        {
            if (!((gift = fixedGifts[id]) && gift.name))
                continue;
                
            try {
                checked = options.get('checkedGifts').indexOf(id) !== -1;
                giftId = 'freegift_box_' + id;
                
                c$('div', 'giftcat:'+gift.title.replace(/\s/g,'')+',id:'+giftId)
                .appendTo(tab.getLayout(gift.isnew?0:1)).css('margin', '8px 9px')
                .addClass('freegift_box freegift_box_unselected freegift_box_unlocked')
                .append(
                    c$('div','class:freegift_box_tag').css('cursor','pointer')
                    .attr('title','Click here to Check/Uncheck all '+gift.title.toLowerCase()+' gifts.')
                    .click(Events.category_click).html(gift.title||'')
                )
                .append(
                    c$('div', 'freegift_box_inner_' + id)
                    .append(
                        c$('div','class:freegift_box_image').css('cursor','pointer').append(
                            c$('img', {
                                'style' : 'width: 75px; height: 75px; border: 0px none;',
                                'src'   : Gift.getImageUrl(gift.img),
                                'alt'   : gift.name,
                                'title' : 'Click here to Select this gift.'
                            })
                        )
                    )
                    .append(c$('div').addClass('freegift_box_itemname').html(gift.name))
                    .append(
                        c$('div', {
                            'title': 'Click here to Check/Uncheck this gift',
                            'class': 'freegift_box_stats',
                            'style': 'cursor: pointer; background-color: '+(checked?'grey;':'transparent;')
                        })
                        .append(c$('span').text(checked ?'CHECKED':'UNCHECKED'))
                        .append(
                            c$('input:checkbox', {
                                'id'      :'freegift_box_input_' + id,
                                'name'    :'freegift_box_input',
                                'checked' : checked,
                                'value'   : id
                            }).hide()
                        )
                        .click(Events.checkbox_click)
                    )
                );
                
                $('.freegift_box_image', '#freegift_box_inner_' + id).get(0).setAttribute(
                    'onclick',
                    "$('div[id^=freegift_box_]').removeClass('freegift_box_selected').addClass('freegift_box_unselected');"+
                    "$('#"+giftId+"').removeClass('freegift_box_unselected').addClass('freegift_box_selected');"+
                    "selectedGift = " + id + ";"+
                    "giftCat = allCats[selectedGift]; return false;"
                );
                
            }
            catch (err) {
                logErr$(err);
            }
        }
    }
    
    function getNewGifts() 
    {
        $('.freegift_grid').children().each(function(index, elem) {
            try {
	            if (!(elem.id && e$('.freegift_box_stats', elem) !== null))
	                return;
	            
	            var id = parseInt(elem.id.substring(13));
	            if (fixedGifts[id]) {
	                fixedGifts[id].isnew = true;
	                return;
	            }
	            
	            var tag = $('.freegift_box_tag',elem);
	            
	            fixedGifts[id] = {
	                isnew : true,
	                name  : $('.freegift_box_itemname',elem).text(),
	                img   : $('.freegift_box_image img',elem).attr('src'),
	                title : (tag.text() || Gift.getNameFromTag(tag.attr('class'))).toUpperCase()
	            };
            }
            catch(err) {
                logErr$(err);
            }
        }); 
    }
    
    // get all the checked links
    function getLinks(bAddShort, callback) 
    {
        var gifts_array = new Array(), workDiv;
        var b_ignoredGifts = false;
        var giftLog = new Array();        
        var current;
        
        // Get checked gifts
        $('input:checkbox[name=freegift_box_input]:checked', '#gift_container')
        .each(function(index, elem) { gifts_array.push(elem.value); });
        
        // save checked gifts
        options.set('checkedGifts', gifts_array.slice());
        options.save();
        
        if (!gifts_array.length) {
            return;
        }
        freegift_buttons.children().hide();
        workDiv = c$('center').appendTo(freegift_buttons);
        showNormalMessage();
        nextGift();
        
        function showNormalMessage() 
        {
            var elt = c$('div').css('padding-top',7).appendTo(workDiv.empty());
            
            c$('img').attr('src',global.resource.ajax_loader).appendTo(elt).css('vertical-align', 'middle');
            
            c$('span', 'message_info').appendTo(elt).css({
                'margin-left': 10,
                'font-weight': 'bold'
            });
        }
        
        function showRetryMessage(name, retry_callback, skip_callback) 
        {
            var elt = c$('div').appendTo(workDiv.empty());
            
            c$('img').attr('src',global.resource.ajax_error).appendTo(elt).css('vertical-align', 'middle');
            
            c$('span').css('margin-left', 5).appendTo(elt)
            .text('Can\'t get gift link for ' + name + '.');
            
            b$('Retry').css('margin-left', 5).addClass('medium white freegift_send_button')
            .appendTo(elt).click(function() {
                showNormalMessage();
                retry_callback();
            });
                
            b$('Skip').css('margin-left', 5)
            .addClass('medium white freegift_send_button').appendTo(elt).click(
                function() {
                    showNormalMessage();
                    skip_callback();
                }
            );
        }
        
        function showIgnoredAlert(fn) {
            showHelpPopup({
                icon: 'info',
                title: 'Gifts ignored',
                onclose: fn,
                message: 'Some gifts have invalid links and has been ignored.'
            });     
        }
        
        function addGift(id, short_url, long_url) {
            giftLog.push({
                'id'         : id,
                'title'      : String(fixedGifts[id].title).toUpperCase(),
                'name'       : fixedGifts[id].name,
                'img'        : Gift.getImageUrl(fixedGifts[id].img),
                'short_url'  : short_url,
                'long_url'   : long_url
            });
            options.get('todayLinks')[id] = {
                'long_url' : long_url,
                'short_url': short_url
            };
            options.save();
            nextGift();
        }
        
        function nextGift() {
            if (gifts_array.length < 1) {
                workDiv.remove();
                freegift_buttons.children().show();
                
                if (giftLog.length > 0) {
                    if (b_ignoredGifts) {
                        showIgnoredAlert(function() {
                            callback(giftLog);
                        });
                    }
                    else {
                        callback(giftLog);
                    }
                }
                else {
                    showHelpPopup({
                        icon: 'info',
                        title: 'No links',
                        message: 'Make sure you checked some gifts.'
                    });
                }
                return;
            }
            current = gifts_array.shift();
            getGift();
        }
        
        // get first link.
        function getGift() {
            var giftName = fixedGifts[current].name, link;
            $('#message_info').text('Trying to get '+giftName+' gift...');
            
            if ( (link = options.get('todayLinks')[current]) ) {
                if (bAddShort) {
                    if (/http/.test(link.short_url)) {
                        addGift(current, link.short_url, link.long_url);
                    }
                    else {
                        getShortURL(link.long_url, 
                            function(shortURL) {
                                addGift(current, shortURL, link.long_url);
                            },
                            function(errText) {
                                showRetryMessage(giftName, getGift, nextGift);
                            }
                        );
                    }
                }
                else {
                    addGift(current, null, link.long_url);
                }
                return;
            }
            
            // long url
            MW.getGiftLink({
                'giftId': current,
                'giftCat': Gift.getCat(current),
                'success': function(url) 
                {
                    if (!Gift.isValid(current, url)) {
                        b_ignoredGifts = true;
                        nextGift();
                        return;
                    }
                    if (bAddShort) {
                        getShortURL(url, 
                            function(shortURL) {
                                addGift(current, shortURL, url);
                            },
                            function(errText) {
                                showRetryMessage(giftName, getGift, nextGift);
                            }
                        );
                    }
                    else {
                        addGift(current, null, url);
                    }
                }
            });
        }
    }
    /**
     * Add personal links to a group Array.
     * @param {Array} group
     */
    function getPersonalLinks(callback) {
        var personalLinks = new Array();
	    var checkedLinks = new Config('checkeduserlinks', defaults.checkeduserlinks);
	    var shortLinks = new Config('userlinks', {
	        profile: '',
	        promote: '',
	        slots: ''
	    });
        
        checkedLinks.load(function() {
	        shortLinks.load(function() {
	            global.user_links.profile.shortUrl  = shortLinks.get('profile');
	            global.user_links.promote.shortUrl  = shortLinks.get('promote');
	            global.user_links.slots.shortUrl    = shortLinks.get('slots');
	            loadLinks();
	        });
        });

        function loadLinks() {
	        var myCollection = new Collection(global.user_links);
            
	        myCollection.onMove(function(index, key, link) {
                if (!checkedLinks.get(key)) {
                    myCollection.MoveNext();
                    return;
                }
                var tLink = options.get('todayLinks')[key];
                
	            function add(shortUrl) {
	                personalLinks.push({'name':link.name,'short_url':shortUrl});
                    options.get('todayLinks')[key] = shortUrl;
	                myCollection.MoveNext();
	            }
            
	            if (Util.isSet(tLink)) {
                    add(tLink);
	            }
                else if (link.shortUrl) {
                    add(link.shortUrl)
                }
                else {
		            if (link.longUrl) {
                        getShortURL(link.longUrl, add,  myCollection.MoveNext);
		            }
	                else if (link.req_type) {
                        MW.getGiftLink({
                            'message'  : 'Shorting '+link.name+' link...',
                            'req_type' : link.req_type,
                            'req_name' : link.req_name,
                            'city'     : link.city, 
                            'success'  : function(longUrl) {
                               global.user_links[ key ].longUrl = longUrl;
                               getShortURL(link.longUrl, add,  myCollection.MoveNext);
                            }
                        });
	                }
                    else {
                        myCollection.MoveNext();
                    }
                }
	        });
	        
	        myCollection.onEnd(function() {
                options.save(function() { callback(personalLinks); }); 
            });
	        myCollection.MoveFirst();
        }
    }
    /**
     * @param {Array} Links
     */
    function showShortLinks(Links) 
    {
        var groupList = new Object();
        var s_date = (new Date()).toDateString();
        var s_outText = s_date + '\n';
        var s_noteContent = '<ul>';

        var popup = new domPopupObject({
            title: 'Short Links',
            type: 'normal',
            top: 150
        });
        
        var publishNote = function() {
            var self = this;
            if ($(self).attr('disabled')) {
                return false;
            }
            $(self).attr('disabled', true).css('opacity', 0.4);
            
            var sTitle = 'Mafia Wars Free Gift Links ('+s_date+')';
            var note_id = options.get('lastNoteId');
            
            var finish = function(new_note) {
                if (parseInt(new_note) > 0) {
                    options.set('lastNoteId', parseInt(new_note));
                    options.save();
                }
                $(self).parent().empty().append(c$('h3').text('Note published!'));
            };
            
            s_noteContent = s_noteContent +'</ul>';
            
            if ($(self).attr('action') == 'edit') {
                facebook.notesEdit(note_id, sTitle, s_noteContent, finish);
            }
            else {
                facebook.notesCreate(sTitle, s_noteContent, finish);
            }
            return false;
        };
        function setLinksAndShow(personalLinks) {
	        Links.sort(Gift.sortByName);
	        
            if (Util.isArray(personalLinks)) {
                groupList['PERSONAL LINKS'] = personalLinks;
            }
            
	        $.each(Links, function(index, gift) {
	            if (typeof(groupList[gift.title]) === 'undefined') {
	                groupList[gift.title] = new Array();
	            }
	            groupList[gift.title].push(gift);
	        });
	        
	        $.each(groupList, function(name, arr) {
	        	if (!$('#giftpage_hidegroups').attr('checked')) {
	                s_outText += ('\n'+ name + ':\n').toUpperCase();
	                s_noteContent += '</ul><b>'+ String(name).toUpperCase() + ':</b><ul>';
	        	}
	            $.each(arr, function(index, gift) {
	                s_outText += Util.formatText(gift.name) + ' => '+ gift.short_url + '\n';
	                s_noteContent += '<li><a href="'+ gift.short_url +'">'+Util.formatText(gift.name)+'</a></li>';
	            });
	        });
	
	        var textElt = c$('textarea', 'readonly:readonly,rows:15,cols:60');
	        textElt.appendTo(popup.content).get(0).innerHTML = s_outText;
	        
	        c$('center', 'id:publish,class:clearfix').css('margin-top',20).appendTo(popup.content)
	        .append(b$('Select All', 'class:short white').click(function(){ textElt.select(); }))
	        .append(b$('Publish New Note', 'action:new,class:medium white').css('margin-left',10).click(publishNote))
	        .append(b$('Edit old Note', 'action:edit,class:medium white').css('margin-left',10).click(publishNote));
	        
	        popup.show();
        }
        
        if ($('#giftpage_perslinks').attr('checked')) {
        	getPersonalLinks(setLinksAndShow);
        }
        else { 
            setLinksAndShow();
        }
        
    }
    /**
     * @param {Array} Links
     * @param {Number} target_id
     */
    function publishLinks(Links, target_id, message) {
        var properties = new Object();
        var publish_config;
        
        Links.sort(Gift.sortByName);
        
        if (Links.length > 1) {
            var imageSrc = '';
            $.each(Links, function(index, gift) {
                var idx = index+1;
                properties['#'+((idx>9)?'':'0')+idx+' '+gift.title] = {
                    'text': gift.name,
                    'href': gift.long_url
                };
            });
            publish_config = {
                'target'      : target_id,
                'message'     : message,
                'name'        : '{*actor*} wants to share some gifts!',
                'properties'  : properties
            }; 
        }
        else {
            publish_config = {
                'target'      : target_id,
                'message'     : message,
                'name'        : '{*actor*} has a ' + Links[0].name,
                'description' : '{*actor*} wants to gift you a ' + Links[0].name + ', be sure to collect it now.',
                'pic'         : Links[0].img,
                'url'         : Links[0].long_url,
                'actionText'  : 'Collect it'
            }
        }
        facebook.streamPublish(publish_config, showPublishMessage);
    }
    
    function publishSelected(gift_id, target_id, message) {
        var giftName  = fixedGifts[ gift_id ].name;
        var picture   = Gift.getImageUrl(fixedGifts[ gift_id ].img);
        
        MW.getGiftLink({
            giftId: gift_id,
            giftCat: Gift.getCat(gift_id),
            message: 'Obtaining the gift link...',
            success: function(url) {
                if (url) {
                    facebook.streamPublish({
                        'target'       : target_id,
                        'message'      : message,
                        'name'         : '{*actor*} has a ' + giftName,
                        'description'  : '{*actor*} wants to gift you a ' + giftName + ', be sure to collect it now.',
                        'pic'          : picture,
                        'url'          : url,
                        'actionText'   : 'Collect it'
                    }, showPublishMessage );
                }
                else {
                    showHelpPopup({icon:'error', title:'Can\'t get gift url, try again later.'});
                }
            }
        });
    }
    
    function resetLinks(bForce) {
        var n_today = new Date().getDay();
        // reset today links
        if (bForce === true || options.get('today') !== n_today) {
            options.set('today', n_today);
            options.set('todayLinks', new Object());
            options.save();
        }
    }
    
    function updateSelectCtrl() {
        var dd = $('#myselections').empty();
        dd.append(c$('option', 'value:-1').text('Last Selection Used'));
        $.each(options.get('mySelections'), function(i, o) {
           dd.append(c$('option', 'value:'+i).text(o.name));
        });
    }
    
    function Initialize() {
        resetLinks();
        
        // Add configuration box
        ( e$('.social_section') || 
          c$('div', 'class:social_section').insertAfter('.freegift_header:first') )
        .empty().css('padding', '0px 15px').append('<br />')
        .append(c$('input:checkbox', 'id:giftpage_perslinks'))
        .append(c$('label', 'for:giftpage_perslinks').text('Include my personal links.'))
        .append(c$('a', 'href:#').text('(Open "My Links" to configure)').click(UserLinks).css('margin-left',15))
        .append('<br />')
        .append(c$('input:checkbox', 'id:giftpage_hidegroups'))
        .append(c$('label', 'for:giftpage_hidegroups').text('Disable links category grouping.'))
        .append('<br /><br />')
        .append(c$('label', 'for:myselections').text('My Selection: '))
        .append(c$('select', 'id:myselections').width(200).change(Events.selection_click))
        .append(c$('span').text('|').css('margin','0px 10px 0px 10px'))
        .append(c$('a', 'href:#').text('Create').click(Events.saveSelection_click))
        .append(c$('span').text('|').css('margin','0px 10px 0px 10px'))
        .append(c$('a', 'href:#').text('Update').click(Events.updateSelection_click))
        .append(c$('span').text('|').css('margin','0px 10px 0px 10px'))
        .append(c$('a', 'href:#').text('Delete').click(Events.remSelection_click));
        
        // Add buttons 
        freegift_buttons = $('.freegift_buttons').first().empty();
        b$('Get Short Links','name:showShortLinks,class:medium white sexy_send_gift_new')
          .appendTo(freegift_buttons).click(Events.shortLinks_click).css('margin-right',10);
        b$('Publish All Links','name:publishLinks,class:medium white sexy_announce_gray')
          .appendTo(freegift_buttons).click(Events.publishAll_click).css('margin-right',10);
        b$('Publish Selected','name:publishSelected,class:medium white sexy_announce_gray')
          .appendTo(freegift_buttons).click(Events.publishSelected_click).css('margin-right',10);
        
         // fix a chrome issue 
        if (e$('#freegift_ask_button_bottom') !== null) {
            $('#freegift_ask_button_bottom')[0]
            .setAttribute('onclick', 'getGiftFeed(); return false;');
        }
    
        getNewGifts();
        genGiftDom();
        options.toDomElements();
        updateSelectCtrl();
    }
        
    // load options
    options.load(Initialize);
}
/**
 * Add Energy ratios to Jobs.
 */
function PageJob() 
{
    if (!global.options.get('opt_JobRates'))
        return;
    if (e$('.job_list') !== null) {
        // Normal jobs
        $('tr', 'table[class=job_list]').each(function(index, domElement){
            try {
                var reward = parseInt($('td[class*="job_reward"] > span.experience', domElement).text());
                var energy = parseInt($('td[class*="job_energy"] > span.energy', domElement).text());
                if (reward && energy) {
                    var elem = $('td[class*="job_energy"]', domElement);
                    (e$('#job_energy_ratio', elem) || 
                     c$('div', 'job_energy_ratio').appendTo(elem))
                    .html((reward / energy).toFixed(2) + ' Ratio').css({
                        'color': 'green',
                        'font-weight': 'bold'
                    });
                }
            } 
            catch (err) {
                logErr$(err);
            }
        });
    }
    else if (e$('#new_user_jobs') !== null) {
        // Started jobs
        $('div[id^="job_"]', '#new_user_jobs').each(function(index, domElement){
            try {
                var reward = parseInt($('dd.experience', domElement).text());
                var energy = parseInt($('dd.energy', domElement).text());
                if (reward && energy) {
                    var elem = $('dd.energy', domElement).parent();
                    (e$('#job_energy_ratio', elem) || 
                     c$('dt', 'job_energy_ratio').appendTo(elem))
                    .html('('+(reward / energy).toFixed(2)+')').css({
                        'color': 'green',
                        'font-weight': 'bold'
                    });
                }
            } 
            catch (err) {
                logErr$(err);
            }
        });
    }
    else if (e$('#brazil_jobs') !== null) {
        // Started jobs
        $('.job', '#brazil_jobs').each(function(index, domElement){
            try {
                var reward = parseInt($('ul.pays .experience', domElement).attr('current_value'));
                var energy = parseInt($('ul.uses .energy', domElement).attr('current_value'));
                if (reward && energy) {
                    var elem = $('ul.uses', domElement);
                    (e$('#job_energy_ratio', elem) || 
                     c$('li', 'job_energy_ratio').appendTo(elem))
                    .html('('+(reward / energy).toFixed(2)+')').css({
                        'color': 'green',
                        'font-weight': 'bold'
                    });
                }
            } 
            catch (err) {
                logErr$(err);
            }
        });
    }
}
/**
 * Add Energy ratios to new city Jobs.
 */
function PageJobMap()
{
    if (!global.options.get('opt_JobRates'))
        return; 
    if (e$('#job_panel') !== null) {
        // Started jobs
        $('.job_container', '#job_panel').each(function(index, domElement){
            try {
                var reward = e$('dd.experience', domElement);
                var energy = e$('dd.energy', domElement) || e$('dd.stamina', domElement);
                if (reward && energy) {
                    var elem = energy.parent();
                    (e$('#job_energy_ratio', elem) || 
                     c$('dd', 'job_energy_ratio').appendTo(elem))
                    .html('('+(parseInt(reward.text()) / parseInt(energy.text())).toFixed(2)+')')
                    .css({
                        'color': 'green',
                        'font-weight': 'bold'
                    });
                }
            } 
            catch (err) {
                logErr$(err);
            }
        });
    }   
}
/**
 * Modify gift buttons to open Multi Gifter.
 */
function PageCollection()
{
    if (!global.options.get('opt_CollectionPage')) {
        return;
    }
    var giftButton_click = function() {
        var u = Util.uSplit($(this).attr('href'));
        MultiGifter(u.gift_category, u.gift_id);
        $('#TopField').focus();
        return false;
    };
    $('a:regex(href,gift_id)').each(function(index,elem) {
        if (elem.href && elem.href.indexOf('xw_controller=gift') !== -1) {
            $(elem).removeAttr('onclick').click(giftButton_click);
        }
    });
}
// =========================================================
// CONTROLLERS.
// =========================================================

/**
 * Update missions to add getShortURL buttons.
 */
function OperationsCenter() {
    
    const STATUS_COMPLETED = 0;
    const STATUS_STARTED   = 1;
    const STATUS_NOSTARTED = 2;
    const STATUS_EXPIRED   = 3;
    const STATUS_REMOVED   = 4;
    
    var missions_links = {};
    var missions_posts = {};
    var socialMissions = {};
    var linkRegex  = /'?href'?:\s*'([^']+)/g;
    
    var options = new Config('operations', defaults.operations);
    
    var popupElt = new domPopupObject('operationscenter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.operationscenter_title+'">',
        zIndex: 30,
        onclose: function() {
            options.fromDomElements();
            options.save();
        }
    });
    
    /**
     * @param {String} instance_id
     * @param {Element} socialMission
     * @param {Number} page
     * @param {String} type
     * @return {CSOperation}
     */
    var CSOperation = function(instance_id, socialMission, page, type) {
        var self = this, id = socialMission, elem;

        this.name        = $.trim($('.missionName', id).text());
        this.difficulty  = $.trim($('.missionDifficulty > span', id).text());
        this.slots       = {total:0, free:0, users:new Array()};
        this.owner_id    = Util.doRgx(/(\d+)/, global.USER_ID).$1;
        this.instance_id = instance_id;
        this.feed_key    = missions_links[instance_id].feed_key;
        this.mission_num = missions_links[instance_id].mission_num;
        this.is_owner    = true;
        this.missionPic  = getPicture($('.missionPic', id).attr('style'));
        this.leader      = null;
        this.slackers    = false;
        this.mastered    = 100;
        this.is_mastered = false;
        this.status      = STATUS_EXPIRED;
        this.page        = page;
        this.type        = type;
        this.timer       = '';
        this.taskMastery = c$('div').css('display','none');

        if ( e$('.missionTimeText .missionTimer', id) ) {
            this.status  = STATUS_STARTED;
            this.timer   = Util.setColor('Mission Started!', 'yellow');
        }
        else if ( e$('.missionAction a:regex(onclick,collectReward)', id) ) {
            this.status  = STATUS_COMPLETED;
            this.timer   = Util.setColor('Mission Completed!', 'green');
        }
        else if ( e$('.missionAction a:regex(onclick,startMission)', id) ) {
            this.status  = STATUS_NOSTARTED;
            this.timer   = Util.setColor('Not Started.', 'white');
        }
        else if ( (elem = e$('.missionAction a:regex(onclick,removeMission)', id)) ) {
            this.status  = STATUS_REMOVED;
            this.timer   = Util.setColor('Leader removed you.', 'red');
            this.owner_id = Util.doRgx(/removeMission\(['"](\d+)['"],/, elem.attr('onclick')).$1;
        }
        
        if ( (elem = e$('*[id^=taskDoJob_' + instance_id + '_]', id)) ) {
            this.is_owner    = false
            this.owner_id    = elem.attr('id').substr(elem.attr('id').lastIndexOf('_')+1);
            this.leader      = $('.missionLeader > div:eq(1) > div:eq(1) > div:eq(0)', id).text();
            this.leaderLink  = $('.missionLeader > div:eq(1) > div:eq(1) > div:eq(1) a', id).attr('href');
            
            if ( (elem = e$('.doTaskModule', id)) ) {
                this.taskName = $('.doTaskName', elem);
                this.taskMastery = $('.doTaskMastery', elem);
                this.taskMastery.removeClass().addClass('task_mastery');
                this.taskName.removeClass().addClass('task_name');
                
                this.position = elem.attr('id').substr(12, 1);
                this.mastered = parseInt(this.taskMastery.find('div').css('width'));
                this.is_mastered = (this.mastered === 100);
            }
        }
        else if (this.status === STATUS_STARTED) {
            this.is_mastered = true;
        }
        
        // get free slots
        $('.missionTaskBox', id).each(function(i, elt) {
            self.slots.total++;
            if (e$('.missionTaskImage > div', elt) == null) {
                self.slots.free++;
                self.slots.users[i] = {
                    'name'     : 'Free slot',
                    'profile'  : '#',
                    'image'    : getPicture($('.missionTaskImage', elt).attr('style')),
                    'progress' : '0%'
                }
            }
            else {
                var sProgress = $('.missionTaskStatus > div', elt).css('width'); 
                var userElt = $('#socialmission_box_hover_'+i+'_'+instance_id+'_big tr:first a:first img', id);
                self.slots.users[i] = {
                    'name'     : userElt.attr('title'),
                    'profile'  : userElt.parent().attr('href'),
                    'image'    : $('.missionTaskImage img', elt).attr('src'),
                    'progress' : sProgress
                }
                if (sProgress !== '100%') {
                    self.slackers = true;
                }
            }
        });
        
        this.getJoinUrl = function() {
            return MW.getExtURL('socialmission', 'joinMission', {
                'zy_track'    : 'feed',
                'sendtime'    : Math.round(new Date().getTime() / 100),
                'friend'      : 'p|'+self.owner_id,
                'next_params' : {
                    'owner_id'    : 'p|'+self.owner_id,
                    'feed_key'    : self.feed_key,
                    'instance_id' : self.instance_id,
                    'mission_num' : self.mission_num
                }
            });            
        };
        this.getUrl = function(action) {
            var data;
            if (action === 'doTask') {
                var data = {
                    'owner_id'     : self.owner_id,
                    'instance_id'  : self.instance_id,
                    'position'     : self.position
                };
            }
            else if (action === 'sendPostBack') {
                data = {'instance' : self.instance_id};
            }
            else {
                data = {
                    'owner'    : self.owner_id,
                    'instance' : self.instance_id,
                    'type'     : self.type,
                    'page'     : self.page
                };
            }
            return 'remote/'+MW.getIntURL('socialmission', action)+'&'+$.param(data);
        };
        this.info = function() {
            return '['+self.difficulty+' ('+self.slots.free+'/'+self.slots.total+')] ' + self.name;
        };
        return this;
    };
    
    /**
     * @param {Element} button
     * @return {CSButton}
     */
    var CSButton = function(button) {
        var self = this;
        /**
         * @type {String}
         */
        this.id       = $(button).attr('instance');
        /**
         * @type {CSOperation}
         */
        this.mission  = socialMissions[ this.id ];
        
        this.hide = function() {
            var liElem = $(button).parent().parent();
            liElem.fadeOut(500, liElem.remove);
        };
        this.remove = function() {
            delete socialMissions[ this.id ];
            this.hide();
        };
        this.isDisable = function() {
            return $(button).attr('disabled');
        };
        this.enable = function() {
            $(button).removeAttr('disabled').removeClass('greyButton');
        };
        this.disable = function() {
            $(button).attr('disabled',true).addClass('greyButton');
        };
        return this;
    };
    
    var List = {
        add: function(name, instance_id) {
            if (Util.isSet(instance_id)) {
                options.get(name+'Ops')[instance_id] = true;
                options.save();
            }
            if (name === 'ignored') {
                $('#ignored_count', popupElt.content).text(this.length(name));
            }
        },
        is: function(name, instance_id) {
            if (Util.isSet(instance_id)) {
                return options.get(name+'Ops')[instance_id] === true;
            }
            return false;
        },
        isNot: function(name, instance_id) {
            return this.is(name, instance_id) !== true;
        },
        reset: function(name) {
            options.set(name+'Ops', new Object());
            options.save();
            if (name === 'ignored') {
                $('#ignored_count', popupElt.content).text(this.length(name));
            }
        },
        length: function(name) {
            var list = options.get(name+'Ops');
            var item, count = 0;
            for (item in list) {
                count++;
            }
            return count;
        }
    }
    
    var Events = {
        refresh_click: function() {
            fullLoad('remote/'+MW.getIntURL('socialmission'), 'initiator', function() {
                fullLoad('remote/'+MW.getIntURL('socialmission'), 'helper', function() {
                    loadingOverlay('hide');
                    updateOperations();
                });
            });
            return false;
        },
        resetList_click: function() {
            var name = String($(this).attr('href')).substr(1);
            List.reset(name);
            updateOperations();
            showHelpPopup({
                icon: 'info',
                title: 'Reset',
                message: 'List '+name+' has been reset.'
            });
            return false;
        },
        ignore_click: function() {
            var button = new CSButton(this);
            
            List.add('ignored', button.id);
            button.hide();
            return false;
        },
        startMission_click: function() {
            var button = new CSButton(this);
            if (button.isDisable()) return false;
            
            button.disable();
            httpAjaxRequest({
                url: button.mission.getUrl('startMission'),
                liteLoad: 1,
                success: function(htmltext) {
                    if (MW.update(htmltext)) {
	                    showHelpPopup({
	                        icon: 'info',
	                        title: 'Mission Started!',
	                        message: 'The mission "'+button.mission.name+
                                 '" has been started.<br>You need to refresh all '+
                                 'missions to see the changes.'
	                    });
                        button.remove();
                    }
                }
            });
            return false;
        },
        collectReward_click: function() {
            var button = new CSButton(this);
            if (button.isDisable()) return false;
            
            button.disable();
            httpAjaxRequest({
                url: button.mission.getUrl('collectReward'),
                liteLoad: 1,
                success: function(htmltext) {
                    var dialog = h$(htmltext).find('script:regex(text,pop_socialmission_collect_dialog)');
                    $('#popup_fodder').empty().append(dialog);
                    button.remove();
                }
            });
            return false;
        },
        doTask_click: function() {
            var button = new CSButton(this);
            if (button.isDisable()) return false;
            
            button.disable();
            httpAjaxRequest({
                url: button.mission.getUrl('doTask'), 
                success: function(msg) 
                {
	                try {
	                    var data = $.parseJSON(msg.data);
	                    if(data.do_task_status === 2) {
	                        button.mission.mastered = data.progress;
	                        updateMasteryBar(data, button.id, function(is_mastered) {
	                            if (button.mission.is_mastered = is_mastered) {
	                                $('#operations_list .task_buttons a')
	                                .attr('disabled',true).addClass('greyButton');
	                                loadPage(button.mission.page, button.mission.type, updateOperations);
	                            }
	                        });
	                    }
	                    updateResults(data, button.id);
	                }
	                catch(err) {
	                    logErr$(err);
	                }
	                button.enable();
                }
            });
            return false;
        },
        sendPostBack: function() {
            var button = new CSButton(this);
            if (button.isDisable()) return false;
            
            button.disable();
            var stream = missions_posts[button.id];
            
            if ( Util.isSet(stream) ) {
                facebook.streamPublish({
                    'target'      : stream.target,
                    'attachment'  : stream.attachment,
                    'actionLinks' : stream.actionLinks
                }, function(post_id) {
                    if (!post_id) {
                        button.enable();
                    }
                }, true);
            }
            return false;
        },
        removeMission_click: function() {
            var button = new CSButton(this);
            if (button.isDisable()) return false;
            
            button.disable();
            httpAjaxRequest(button.mission.getUrl('removeMission'), button.remove); 
        },
        close_click: function() {
            (new CSButton(this)).remove();
            return false;
        },
        refreshGroups_click: function() {
            var button = new CSButton(this);
            if (button.isDisable()) { return false; }            
            button.disable();
            Groups.refresh(function() {
                Groups.addToSelect('#select_fbgroups',options.get('defaultGroup'));
                button.enable();
            });
            return false;
        },
        setDefault_click: function() {
            options.set('defaultGroup', Util.getInputSelectedValue('#select_fbgroups'));
            options.save();
            showHelpPopup({
                icon: 'info',
                title: 'Default group',
                message: 'The selected group has been saved as default.'
            });
            return false;
        },
        publish_click: function() {
            var button = new CSButton(this);
            if (button.isDisable()) return false;
            
            button.disable();
            publishOperation(button.mission, function() {
                updateOperations();
                button.enable();
            });
            return false;
        },
        publishAgain_click: function() {
            showHelpPopup({
                icon: 'info',
                title: 'mission published',
                message: 'This mission has been published.<br>Do you want to reset published missions? ',
                buttons: [{
                    label: 'Reset',
                    addClass: 'short green',
                    onclick: function() {
                        List.reset('published');
                        updateOperations();
                    }
                }, {
                    label: 'Close',
                    addClass: 'short white'
                }]
            });
            return false;
        },
        publishAll_click: function() {
            var button = new CSButton(this);
            if (button.isDisable()) return false;
            
            button.disable();
            publishAll(function(success) {
                if (success === true) {
                    showPublishMessage();
                    updateOperations();
                }
                button.enable();
            });
            return false;
        },
        shortLinks_click: function() {
            shortAll(function(new_links) {
                $('#shortlinks_area').val(new_links);
            });
            return false;
        },
        checkbox_click: function() {
            options.fromDomElements();
            options.save();
        },
        selectAll_click: function() {
            $('#shortlinks_area', popupElt.content).select();
            return false;
        },
        goBack_click: function() {
            showDiv('main', 'panel');
            return false;
        }
    };
    
    function addMissionLink(url) {
        try {
            var params = $.parseJSON(Util.uSplit(url).next_params) ;
            
            if (!params.instance_id) {
                throw TypeError('Cant read "instance_id" from url.');
            }
            if (!params.feed_key) {
                throw TypeError('Cant read "feed_key" from url.');
            }
            if (!params.mission_num) {
                throw TypeError('Cant read "mission_num" from url.');
            }
            return missions_links[params.instance_id] = params;
        }
        catch(err) {
            logErr$(err);
            return {key:0, num:0};
        }
    }
    
    function addPostScript(script) {
        var instance = Util.doRgx(/postInitActionFeed(\w+)/, script).$1;
        if (!Util.isSet(instance)) {
            return;
        }
        if (Util.isSet(missions_posts[instance])) {
            return;
        }
        var nStartIndex = script.indexOf('var postInitActionFeed');
        var text = Util.substr(script,'{','FB.Connect.streamPublish',1,0,nStartIndex);
        
        function evaluate() {
            var target, attachment, actionLinks;
            
            eval(text);
            
            missions_posts[instance] = {
                'target': target,
                'attachment': attachment,
                'actionLinks': actionLinks
            }
        }
        evaluate();
    }
    
    function loadPage(nPage, type, callback) {
        httpAjaxRequest({
            'url': 'remote/'+MW.getIntURL('socialmission'),
            'liteLoad': 1,
            'data': { 
                'type': type,
                'page': nPage 
            },
            'success': function(htmlText) 
            {
                var rgx, jQry = h$(htmlText);
                
                if (!MW.update(htmlText)) {
                    callback && callback();
                    return;
                }
                
                jQry.find('script:regex(text,var postInitActionFeed)')
                .each(function(index, elem) {
                    addPostScript(String($(elem).text()));
                });
                
                // we need instance_id, feed_key and mission_num for every link.
                while ((rgx = linkRegex.exec(htmlText))) {
                    if (/joinMission/.test(rgx[1])) {
                        addMissionLink(unescape(rgx[1]));
                    }
                }
                // look all missions and try to add getShortUrl button.
                jQry.find('.socialMission').each(function(index, elem) {
                    if (!elem.id || elem.id.length < 14) {
                        return;
                    }
                    var op, instance = elem.id.substring(14);
                    log$('loading m:' +instance);
                    if (Util.isSet(missions_links[instance])) {
                        socialMissions[instance] = new CSOperation(instance, elem, nPage, type);
                    }
                });
                
                var paging = jQry.find('.socialMissionPaging .right');
                
                if (paging.hasClass('pagingDisabled') || paging.attr('disabled')) {
                    callback && callback();
                }
                else {
                    callback && callback(Util.doRgx(/viewPage\((\d)\);/i, paging.attr('onclick')).$1);
                }
            }
        });
    }
    
    function updateOperations() {
        var tempElem = c$('ul');
        var keepMissions = new Object();
        
        $.each(socialMissions, function (instance, mission) {
            if (List.is('ignored', mission.instance_id)) {
                return;
            }
            var liElem = c$('li','instance:'+instance), slotsElt;
            var bMastered = false, bAddIgnore = true, button, leaderElt;
            var slackers = mission.slackers
            ? Util.setColor('Yes', 'red') 
            : Util.setColor('No', 'green');
            
            if (List.is('published', mission.instance_id)) {
                keepMissions[mission.instance_id] = true;
            }
            
            c$('div','class:mission_header')
            .append(c$('span', 'class:operation_name').text(mission.name))
            .append(c$('span').css('margin-left',10).text('Slots: '+mission.slots.free+'/'+mission.slots.total))
            .append(c$('span').css('margin-left',10).html('Slackers: '+slackers))
            .append(leaderElt = c$('span').css('margin-left',10))
            .append(c$('span', 'class:operation_status').html(mission.timer))
            .appendTo(liElem);
            
            if (!mission.is_owner) {
                leaderElt.html('Leader: <a href="'+mission.leaderLink+'" target="_black">'+mission.leader+'</a>');
            }
            
            c$('img').attr('src', mission.missionPic).appendTo(liElem);
            var buttonsElem = c$('div','class:task_buttons').appendTo(liElem);
            
            c$('div', 'class:stats').appendTo(liElem)
            .append(mission.is_mastered ? c$('div','class:mastered_message').text('100% Mastered!') : mission.taskMastery)   
            .append(slotsElt = c$('div','id:operation_slots'))
            .append(c$('div','id:job_result').hide());
            
            $.each(mission.slots.users, function(i, slot) {
                var a = c$('a','target:_black').appendTo(slotsElt).attr('href',slot.profile);
                var div = c$('div', 'class:task_box').appendTo(a);
                c$('div', 'class:task_image').appendTo(div)
                .append(c$('img','title:'+slot.name).attr('src', slot.image));
                c$('div', 'class:task_status').appendTo(div)
                .append(c$('div','class:fill').css('width',slot.progress))
            });
            
            if(mission.status === STATUS_STARTED) {
                if (!mission.is_mastered) {
                    button = {text:'Do Job',cls:'medium orange',click:Events.doTask_click};
                }
                else if (mission.slots.free > 0) {
                    if (List.isNot('published', mission.instance_id)) {
                        button = {text:'Publish',cls:'sexy_announce_gray medium white',click:Events.publish_click};
                    }
                    else {
                        button = {text:'Published!',cls:'sexy_announce_gray medium white',click:Events.publishAgain_click};
                    }
                }
                else {
                    button = {text:'Remember',cls:'sexy_announce_gray medium white',click:Events.sendPostBack};
                }
            }
            else if(mission.status === STATUS_NOSTARTED) {
                button = {text:'Start Now',cls:'medium white',click:Events.startMission_click};
            }
            else if(mission.status === STATUS_COMPLETED) {
                button = {text:'Collect',cls:'medium green',click:Events.collectReward_click};
                bAddIgnore = false;
            }
            else if(mission.status === STATUS_REMOVED) {
                button = {text:'Close',cls:'medium white',click:Events.removeMission_click};
                bAddIgnore = false;
            }
            else {
                button = {text:'Close',cls:'medium white',click:Events.close_click};
                bAddIgnore = false;
            }
            
            if (Util.isSet(button)) {
                b$(button.text,'class:'+button.cls+',instance:'+instance)
                .click(button.click).appendTo(buttonsElem);
            }
            if (bAddIgnore === true) {
                c$('br').appendTo(buttonsElem);
                c$('a','href:#,class:ignore,instance:'+instance).text('ignore')
                .appendTo(buttonsElem).click(Events.ignore_click);
            }
            
            if (mission.is_mastered) {
                liElem.appendTo(tempElem);
            }
            else {
                liElem.prependTo(tempElem);
            }
        });
        
        options.set('publishedOps', keepMissions);
        options.save();
        $('#operations_list').empty().append(tempElem.children());
    }
    
    function updateResults(data, id, callback) {
        var task_data = data.task_data, sHtml = '';
        var operation_slots = $('li[instance='+id+'] #operation_slots', popupElt.content);
        var job_result = $('li[instance='+id+'] #job_result', popupElt.content); 
        
        if (job_result.length > 0) {
            clearTimeout(parseInt(job_result.attr('timeout')));
            job_result.clearQueue();
        }
            
        if (data.do_task_status === 2) {
            sHtml += '<div>Gained: ';
            if(Util.isSet(task_data.payouts)) {
                var pay = task_data.payouts[0];
                sHtml += '<span class="'+pay.cssClass+'">'+pay.amount+'</span>';
            }
            sHtml += '</div><div>Spent: ';
            if(Util.isSet(task_data.requirements)) {
                var used = task_data.requirements[0];
                sHtml += '<span class="'+used.cssClass+'">'+used.amount+'</span>';
            }
        }
        else {
            sHtml += Util.setColor('You can\'t do this mission. You have not enough energy/stamina.', 'red');
        }
        
        job_result.html(sHtml).show();
        operation_slots.hide();
        
        var nTimeout = setTimeout(function() {
            job_result.fadeOut(2000, function() {
                job_result.empty().hide();
                operation_slots.show();
            });
        },5000);
        
        job_result.attr('timeout', nTimeout);
    }
    
    function updateMasteryBar(data, id, callback) {
        if (!data.do_task_status == 2) {
            return;
        }
        var mastery_bar, mastery_bar_outer, target_progress = data.progress;
        
        if ((mastery_bar_outer = $('li[instance='+id+'] .task_mastery')).length < 1) {
            return;
        }
        if (data.is_task_mastered) {
            target_progress = 100;
        }
        mastery_bar = mastery_bar_outer.find('div');
        mastery_bar[0].mastery_percentage = Math.ceil((parseInt(mastery_bar.css('width')) / parseInt(mastery_bar_outer.css('width'))) * 100);
        mastery_bar.clearQueue();
        
        mastery_bar.animate({
            'mastery_percentage': target_progress
        }, {
            easing: 'linear',
            duration: 500,
            step: function() {
	            var this_bar = $(this);
                var this_bar_text = parseInt(this.mastery_percentage) + '% Mastered!';
                if(this.mastery_percentage > target_progress) {
                    this.mastery_percentage = target_progress;
                }
                this_bar.css('width', this.mastery_percentage + '%');
                $('p', this_bar).text(this_bar_text);
                
                if (this_bar.parent().length > 0)
                    this_bar.parent()[0].firstChild.nodeValue = this_bar_text;
            },
            complete: function() {
                var this_bar = $(this);
                var this_bar_text = parseInt(this.mastery_percentage) + '% Mastered!';
                
                this_bar.css('width', this.mastery_percentage + '%');
                $('p', this_bar).text(this_bar_text);
                
                callback(data.is_task_mastered);
            }
        });
    }
    
    function getPicture(s_background) {
        if (Util.isString(s_background)) {
            var url = Util.doRgx(/url\(([^\)]+)\)/, s_background).$1;
            if (Util.isSet(url)) {
                return String(url).replace(/["']/g,'');
            }
        }
        return '';
    }
    
    function showDiv(name, type, ms, fn) {
        $('div[id*=_'+type+']', popupElt.content).hide();
        var elem = $('#' + name + '_' + type, popupElt.content);
        if (ms) {
            elem.fadeIn(ms, fn);
        }
        else {
            elem.show();
        }
    }
    
    function getValidMissions(bIncludePublished) {
        var validOps = new Array();
        // get valid operations only
        $.each(socialMissions, function(instance, mission) {
            if (List.isNot('ignored', mission.instance_id) && 
               (List.isNot('published', mission.instance_id) || bIncludePublished === true) && 
                mission.is_mastered && mission.slots.free > 0) 
            {
                if (mission.slackers !== true || options.get('addSlackers')) { 
                    validOps.push(mission)
                }
            }
        });
        return validOps;
    }
    
    /**
     * @param {CSOperation} mission
     * @param {Function} callback
     */
    function publishOperation(mission, callback) {
        var target = Util.getInputSelectedValue($('#select_fbgroups', popupElt.content));
        var description = (mission.is_owner === false) 
        ? '{*actor*} needs your expertise helping to "'+mission.leader+'" before time runs out.'
        : '{*actor*} needs your expertise to finish an operation before time runs out.';

        facebook.streamPublish({
            'target'       : target,
            //'message'      : $('#publishmessage').val(),
            'name'         : mission.info(),
            'description'  : description,
            'pic'          : mission.missionPic,
            'url'          : mission.getJoinUrl(),
            'actionText'   : 'Join Operation'
        }, function(post_id) {
            if(post_id) {
                List.add('published', mission.instance_id);
                callback && callback(true);
            }
        });
    }
    
    function publishAll(callback) {
        var publish_config, validOps = getValidMissions();
        var properties = new Object();
        var target = Util.getInputSelectedValue('#select_fbgroups');
        
        if (validOps.length > 1) {
            var imageSrc = '';
            $.each(validOps, function(index, op) {
                var idx = index+1;
                var name = '#'+ ( (idx > 9) ? '' : '0' ) + idx+' Leader ';
                name += (op.is_owner ? facebook.user.first_name : op.leader);
                properties[name] = {
                    'text': op.info(),
                    'href': op.getJoinUrl()
                };
            });
            publish_config = {
                'target'     : target,
                'name'       : '{*actor*} needs your expertise to finish this operations',
                //'message'    : $('#publishmessage').val(),
                'properties' : properties
            }; 
            facebook.streamPublish(publish_config, function(post_id) {
                if (post_id) {
                    $.each(validOps, function(index, op) {
                        List.add('published', op.instance_id);
                    });
                    callback && callback(true);
                }
            });
        }
        else if (validOps.length === 1) {
            publishOperation(validOps[0], callback);
        }
        else {
            showHelpPopup({
                icon: 'info',
                title: 'No Valid Operations',
                message: 'To publish a mission, should be 1 or more slots free and no slackers.'
            });
            callback && callback();
        }
    }
    
    function shortAll(callback) {
        var links = '', operation, leader, todayLink;
        var validOps = getValidMissions(true);
        
        if (validOps.length < 1) {
            showHelpPopup({
                icon: 'info',
                title: 'No Valid Operations',
                message: 'To get short links, should be 1 or more slots free and no slackers.'
            });
            return;
        }
        
        var opsCollection = new Collection(validOps);
        
        opsCollection.onMove(function(pos, key, item) {
            operation = item; 
            leader    = (operation.is_owner === false)?' from: '+operation.leader+' => ':' => ';
            todayLink = options.get('todayLinks')[operation.instance_id];
            
            if (Util.isSet(operation.instance_id) && Util.isSet(todayLink)) {
                links += (operation.info() + leader + todayLink + '\n');
                opsCollection.MoveNext();
                return;
            }
            getShortURL(operation.getJoinUrl(), function(shortURL) {
                
                options.get('todayLinks')[operation.instance_id] = shortURL;
                options.save();
                links += (operation.info() + leader + shortURL + '\n');
                opsCollection.MoveNext();
                
            }, opsCollection.MoveNext);
        });
        
        opsCollection.onEnd(function() {
            showDiv('shortlinks', 'panel');
            callback && callback(links);
        });
        
        showDiv('loading', 'panel');
        opsCollection.MoveFirst();
    }
    
    function genMainDom() {
        
        var mainElt = c$('div', 'id:main_panel,class:extended_info').height(130).appendTo(popupElt.content);
        
        c$('div', 'class:groups_selection')
        .append(c$('label','for:select_fbgroups').css('margin-right', 5).text('Publish in:'))
        .append(c$('select', 'id:select_fbgroups,class:black').css('margin-right',5).width(400))
        .append(c$('a', 'href:#').text('Default').click(Events.setDefault_click))
        .append(b$('Refresh groups', 'class:short white').css('float','right').click(Events.refreshGroups_click))
        .appendTo(mainElt);
        
        c$('div').width('100%')
        .append(c$('input:checkbox','id:operations_addslackers').click(Events.checkbox_click))        
        .append(c$('label','for:operations_addslackers').text('Publish/Short missions with slackers.'))
        .appendTo(mainElt);
        
        c$('div', 'class:left_box').appendTo(mainElt)
        .append(c$('a','href:#ignored').html('Reset Ignored (<span id="ignored_count">'+List.length('ignored')+'</span>)').click(Events.resetList_click))
        .append('<br />')
        .append(c$('a','href:#published').text('Reset Published').click(Events.resetList_click))
        .append('<br />')
        .append(b$('Refresh operations', 'class:medium white').click(Events.refresh_click));
        
        c$('div', 'class:right_box').appendTo(mainElt)
        .append(b$('Short All Operations', 'class:sexy_send_gift_new medium white').click(Events.shortLinks_click))
        .append('<br />')
        .append(b$('Publish All Operations', 'class:sexy_announce_gray medium white').click(Events.publishAll_click));
        
        c$('div','class:user_stats').appendTo(mainElt)
        .append(c$('div').append($('#stat_energy_cont').clone()).append($('#stat_stamina_cont').clone()));
        
        c$('div', 'id:shortlinks_panel,class:extended_info').height(130)
        .append(c$('textarea','id:shortlinks_area,class:black').click(Events.selectAll_click))
        .append(c$('div', 'class:shorting_buttons')
            .append(b$('Select All', 'class:medium white').click(Events.selectAll_click))
            .append('<br /><br />')
            .append(b$('Go back', 'class:medium white').click(Events.goBack_click))
        )
        .appendTo(popupElt.content);
        
        c$('div', 'id:loading_panel,class:extended_info').css('text-align','center').height(130)
        .append(c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif'))
        .appendTo(popupElt.content);
        
        c$('ul', 'operations_list').height(600).appendTo(popupElt.content);
    }
    
    function fullLoad(url, type, callback) {
        
        function afterLoad(new_page) {
            if (new_page) {
                loadingOverlay('Loading '+type+' operations, page '+new_page+'...');
                loadPage(new_page, type, afterLoad);
            }
            else {
                callback && callback();
            }
        }
        loadingOverlay('Loading '+type+' operations...');
        loadPage(1, type, afterLoad);
    }
    
    function Initialize() {
        var n_today = new Date().getDay();
        // reset stored data if need
        if (options.get('today') !== n_today) {
            options.set('today', n_today);
            options.set('todayOps', {});
            options.set('todayLinks', {});
            options.save();
        }
        fullLoad('remote/'+MW.getIntURL('socialmission'), 'initiator', function() {
            fullLoad('remote/'+MW.getIntURL('socialmission'), 'helper', function() {
                genMainDom();
                updateOperations();
                Groups.addToSelect('#select_fbgroups',options.get('defaultGroup'));
                
                options.toDomElements();
                showDiv('main', 'panel');
                
                loadingOverlay('hide');
                popupElt.show();
            });
        });
    }
    
    // add styles
    popupElt.addBase64Style(
        'I29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgLmJsYWNrIHsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogcmdiKDIwOCwgMjA4'+
        'LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNr'+
        'OyANCglmb250LXNpemU6IDE0cHg7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCAuZXh0ZW5kZWRfaW5mbyB7DQoJYm9yZGVy'+
        'OiAxcHggc29saWQgIzRGNEY0RjsgDQoJaGVpZ2h0OiA4MHB4Ow0KCW1hcmdpbjogNXB4Ow0KCXBhZGRpbmc6IDEwcHg7DQoJdGV4'+
        'dC1hbGlnbjogbGVmdDsNCn0NCiNvcGVyYXRpb25zY2VudGVyX3BvcHVwIC5leHRlbmRlZF9pbmZvIC5ncm91cHNfc2VsZWN0aW9u'+
        'IHsNCglib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzMzsNCgl3aWR0aDogMTAwJTsNCgltYXJnaW4tYm90dG9tOiAycHg7DQoJ'+
        'aGVpZ2h0OiAzMHB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgLmV4dGVuZGVkX2luZm8gLmxlZnRfYm94IHsNCglmbG9h'+
        'dDogbGVmdDsNCgltYXJnaW4tdG9wOiA2cHg7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCAuZXh0ZW5kZWRfaW5mbyAubGVm'+
        'dF9ib3ggLnNleHlfYnV0dG9uX25ldyB7DQoJbWFyZ2luLXRvcDogNXB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgLmV4'+
        'dGVuZGVkX2luZm8gLnJpZ2h0X2JveCB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCW1hcmdpbi10b3A6IDVweDsNCgl0ZXh0LWFsaWduOiBy'+
        'aWdodDsNCn0NCiNvcGVyYXRpb25zY2VudGVyX3BvcHVwIC5leHRlbmRlZF9pbmZvIC5yaWdodF9ib3ggLnNleHlfYnV0dG9uX25l'+
        'dyB7DQoJbWFyZ2luLXRvcDogNXB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgLmV4dGVuZGVkX2luZm8gLnVzZXJfc3Rh'+
        'dHMgew0KCWhlaWdodDogNzBweDsNCgltYXJnaW4tbGVmdDogMjMwcHg7DQoJbWFyZ2luLXJpZ2h0OiAyNTBweDsNCgltYXJnaW4t'+
        'dG9wOiAyMHB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgLmV4dGVuZGVkX2luZm8gIC5zdGF0IGg0IHsNCgltYXJnaW46'+
        'IDBweDsNCn0JDQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCAuZXh0ZW5kZWRfaW5mbyAgI3N0YXRfc3RhbWluYV9jb250IGg0IHsN'+
        'CglwYWRkaW5nLWxlZnQ6IDIwcHg7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCAuZXh0ZW5kZWRfaW5mbyB0ZXh0YXJlYSB7'+
        'DQoJd2lkdGg6IDUwMHB4Ow0KCWhlaWdodDogMTIwcHg7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCAuZXh0ZW5kZWRfaW5m'+
        'byAuc2hvcnRpbmdfYnV0dG9ucyB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCW1hcmdpbi1yaWdodDogNTBweDsNCgltYXJnaW4tdG9wOiAy'+
        'MHB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgdWwgew0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCglvdmVyZmxvdzog'+
        'YXV0bzsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCWJvcmRlcjogMnB4IHNvbGlkICMzMzM7DQoJbWFyZ2luOiA1cHg7DQoJcGFkZGlu'+
        'ZzogNXB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgdWwgbGkgew0KCWhlaWdodDogOTVweDsNCgltaW4taGVpZ2h0OiAz'+
        'NXB4Ow0KCW1heC1oZWlnaHQ6IDEwMHB4Ow0KCXBhZGRpbmc6IDBweCA4cHggMHB4IDhweDsNCgltYXJnaW4tYm90dG9tOiA1cHg7'+
        'DQoJYm9yZGVyOiAxcHggc29saWQgIzMzMzsNCn0NCiNvcGVyYXRpb25zY2VudGVyX3BvcHVwIHVsIGxpIC5taXNzaW9uX2hlYWRl'+
        'ciB7DQoJY2xlYXI6IGJvdGg7DQoJaGVpZ2h0OiAyMHB4Ow0KCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNDQ0Ow0KCW1hcmdp'+
        'bi1ib3R0b206IDNweDsNCn0NCiNvcGVyYXRpb25zY2VudGVyX3BvcHVwIHVsIGxpIGltZyB7DQoJYm9yZGVyOiAxcHggc29saWQg'+
        'Z3JleTsNCglmbG9hdDogbGVmdDsNCgl3aWR0aDogMTIwcHg7DQoJaGVpZ2h0OiA2N3B4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJf'+
        'cG9wdXAgdWwgbGkgZGl2LnN0YXRzIHsNCgltYXJnaW4tbGVmdDogMTI1cHg7DQoJaGVpZ2h0OiA3MHB4Ow0KCW1hcmdpbi1yaWdo'+
        'dDogMTIwcHg7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCB1bCBsaSAub3BlcmF0aW9uX3N0YXR1cyB7DQoJZm9udC1zaXpl'+
        'OiAxNHB4Ow0KCWZsb2F0OiByaWdodDsNCn0JDQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCB1bCBsaSAub3BlcmF0aW9uX25hbWUg'+
        'ew0KCWZvbnQtc2l6ZTogMTVweDsNCgljb2xvcjogI0ZGQ0QwMDsNCgl0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOw0KCWZvbnQt'+
        'd2VpZ2h0OiBib2xkOw0KCW1hcmdpbi1yaWdodDogMTVweDsNCn0NCiNvcGVyYXRpb25zY2VudGVyX3BvcHVwIHVsIGxpICNqb2Jf'+
        'cmVzdWx0IHsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCXdpZHRoOiAxMDAlOw0KCWhlaWdodDogMTAwJTsNCglwYWRkaW5nOiA1cHgg'+
        'MHB4IDBweCA1cHg7DQoJZm9udC1zaXplOiAxMnB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgdWwgbGkgZGl2LnRhc2tf'+
        'YnV0dG9ucyB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWZvbnQtc2l6ZTogMTBweDsNCglmb250LXdlaWdodDogYm9sZDsNCgl0ZXh0LWFs'+
        'aWduOiByaWdodDsNCgltYXJnaW46IDE1cHggMHB4IDBweCA1cHg7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCB1bCBsaSBk'+
        'aXYudGFza19idXR0b25zIGEuaWdub3JlIHsNCgl0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOw0KfQ0KLnRhc2tfbWFzdGVyeSB7'+
        'DQoJcGFkZGluZzogMCAxMHB4IDAgMDsNCgltYXJnaW46IDBweDsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRp'+
        'Yy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvbWFwX2Jhc2VkX2pvYnMvbWFzdGVyeV9iYXJfYmcuZ2lmIikgMCAwIHJlcGVhdC14'+
        'Ow0KCWJvcmRlcjogMXB4IHNvbGlkICM5OTk7DQoJY29sb3I6ICM5OTk7DQoJZm9udC1zaXplOiAxMXB4Ow0KCWhlaWdodDogMTRw'+
        'eDsNCglsaW5lLWhlaWdodDogMTZweDsNCglwb3NpdGlvbjogcmVsYXRpdmU7DQoJdGV4dC1hbGlnbjogcmlnaHQ7DQoJd2lkdGg6'+
        'IDQwMHB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgdWwgbGkgLnRhc2tfbWFzdGVyeSBkaXYgew0KCWJhY2tncm91bmQ6'+
        'IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9zb2NpYWxtaXNzaW9ucy9wZXJjZW50X2Jh'+
        'cl95ZWxsb3cuZ2lmIikgMCAwIHJlcGVhdC14Ow0KCWhlaWdodDogMTRweDsNCglvdmVyZmxvdzogaGlkZGVuOw0KCXBvc2l0aW9u'+
        'OiBhYnNvbHV0ZTsNCgl0b3A6IDBweDsNCglsZWZ0OiAwcHg7DQp9DQoudGFza19tYXN0ZXJ5IGRpdiBwIHsNCgljb2xvcjogYmxh'+
        'Y2s7DQoJbWFyZ2luOiAwcHggMHB4IDBweCA1cHg7DQoJcGFkZGluZzogMHB4IDBweCAwcHggMHB4Ow0KCXBvc2l0aW9uOiBhYnNv'+
        'bHV0ZTsNCgl0b3A6IDBweDsNCglsZWZ0OiAwcHg7DQoJd2lkdGg6IDQwMHB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAg'+
        'dWwgbGkgLnRhc2tfbmFtZSB7DQoJZmxvYXQ6IGxlZnQ7DQoJY29sb3I6ICNGRkNEMDA7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJ'+
        'Zm9udC1zaXplOiAxNHB4Ow0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgdWwgbGkgLnRhc2tfYm94IHsNCgl3aWR0aDogNDBw'+
        'eDsNCglmbG9hdDogbGVmdDsNCgltYXJnaW46IDJweCAycHggMHB4IDBweDsNCglwb3NpdGlvbjogcmVsYXRpdmU7DQoJY2xlYXI6'+
        'IG5vbmU7DQoJYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7DQoJYm9yZGVyOiAxcHggc29saWQgIzk5OTsNCn0NCiNvcGVyYXRpb25z'+
        'Y2VudGVyX3BvcHVwIHVsIGxpIC50YXNrX2ltYWdlIHsNCgloZWlnaHQ6IDQwcHg7DQoJd2lkdGg6IDQwcHg7DQoJdGV4dC1hbGln'+
        'bjogY2VudGVyOw0KfQ0KI29wZXJhdGlvbnNjZW50ZXJfcG9wdXAgdWwgbGkgLnRhc2tfaW1hZ2UgaW1nIHsNCgl3aWR0aDogMzhw'+
        'eDsNCgloZWlnaHQ6IDM4cHg7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCB1bCBsaSAudGFza19zdGF0dXMgew0KCWJhY2tn'+
        'cm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3NvY2lhbG1pc3Npb25zL3BlcmNl'+
        'bnRfYmFyX2JsYW5rLmdpZikgMCAwIG5vLXJlcGVhdDsNCgl3aWR0aDogNDBweDsNCgloZWlnaHQ6IDdweDsNCglmb250LXNpemU6'+
        'IDlweDsNCglmb250LWZhbWlseTogZmFudGFzeTsNCglmb250LXdlaWdodDogYm9sZDsNCglmbG9hdDogbGVmdDsNCglwYWRkaW5n'+
        'OiAwIDAgMCAwOw0KCWRpcmVjdGlvbjogbHRyOw0KCS1tb3otbWFyZ2luLXN0YXJ0OiAtMXB4Ow0KCS13ZWJraXQtbWFyZ2luLXN0'+
        'YXJ0OiAtMXB4Ow0KCWJvcmRlcjogMXB4IHNvbGlkICM5OTk7DQoJY29sb3I6ICM5OTk7DQoJbGluZS1oZWlnaHQ6IDE0cHg7DQoJ'+
        'cG9zaXRpb246IHJlbGF0aXZlOw0KCXRleHQtYWxpZ246IGNlbnRlcjsNCn0NCiNvcGVyYXRpb25zY2VudGVyX3BvcHVwIHVsIGxp'+
        'IC50YXNrX3N0YXR1cyBkaXYgew0KCWJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9n'+
        'cmFwaGljcy9zb2NpYWxtaXNzaW9ucy9wZXJjZW50X2Jhcl95ZWxsb3cuZ2lmIikgMCAwIHJlcGVhdC14Ow0KCWhlaWdodDogMTRw'+
        'eDsNCglvdmVyZmxvdzogaGlkZGVuOw0KCXBvc2l0aW9uOiBhYnNvbHV0ZTsNCgl0b3A6IDA7DQoJbGVmdDogMDsNCn0NCiNvcGVy'+
        'YXRpb25zY2VudGVyX3BvcHVwIHVsIGxpIC50YXNrX3N0YXR1cyBkaXYuZmlsbCB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8v'+
        'bXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3NvY2lhbG1pc3Npb25zL3BlcmNlbnRfYmFyX2dyZWVuLmdpZiIp'+
        'IDAgMCByZXBlYXQteDsNCgloZWlnaHQ6IDEwMCU7DQp9DQojb3BlcmF0aW9uc2NlbnRlcl9wb3B1cCAjaWdub3JlZF9jb3VudCB7'+
        'DQoJCWNvbG9yOiBncmVlbjsNCn0NCiNvcGVyYXRpb25zY2VudGVyX3BvcHVwIHVsIGxpIC5tYXN0ZXJlZF9tZXNzYWdlIHsNCglj'+
        'b2xvcjogZ3JlZW47DQoJZm9udC1zaXplOiAxMnB4Ow0KCWhlaWdodDogMTZweDsNCglmb250LXdlaWdodDogYm9sZDsNCn0='
    );
    
    // load options
    options.load(Initialize);
}

/**
 * Analize all items from inventory.
 */
function InventoryAnalizer() {
    
    var Groups = ['Weapons', 'Armor', 'Vehicles', 'Animals'];
    var Indexes = {'1':0, '2':1, '3':2, '8': 3};
    var Qualities, Wishlist;
    var Filter = function() {
        return {
            'top_offense'   : new Array(),
            'top_defense'   : new Array(),
            'top_combined'  : new Array(),
            'weak_offense'  : new Array(),
            'weak_defense'  : new Array(),
            'weak_combined' : new Array(),
            'get_offense'   : new Array(),
            'get_defense'   : new Array(),
            'get_combined'  : new Array(),
            'give_away'     : new Array()
        };
    };
    var Inventory = {
        all        : new Array(),
        Weapons    : Filter(),
        Armor      : Filter(),
        Vehicles   : Filter(),
        Animals    : Filter(),
        Qualities  : null,
        ItemTypes  : null,
        Locations  : null,
        global     : {
            'Weapons_offense'    : 0,
            'Weapons_defense'    : 0,
            'Weapons_combined'   : 0,
            'Armor_offense'      : 0,
            'Armor_defense'      : 0,
            'Armor_combined'     : 0,
            'Vehicles_offense'   : 0,
            'Vehicles_defense'   : 0,
            'Vehicles_combined'  : 0,
            'Animals_offense'    : 0,
            'Animals_defense'    : 0,
            'Animals_combined'   : 0,
            'Total_offense'      : 0,
            'Total_defense'      : 0,
            'Total_combined'     : 0,
            'Qualities'          : {
                'Total': 0,
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0
            }
        }
    };
    
    var popupElt = new domPopupObject('invAnalizer_popup', {
        type: 'main',
        title: '<img src="'+global.resource.inventoryanalizer_title+'">',
        onclose: function() {
            delete Inventory;
        }
    });
    
    var Events = {
        remWishlist_click: function() {
            var id = $(this).attr('wid');
            var url = 'remote/' + MW.getIntURL('wishlist', 'remove');
            
            httpAjaxRequest({'url':url+'&isajax=1&retwl=1&wid='+id, 'success':setWishlist});
            
            return false;
        },
        addWishlist_click: function() {
            var id = $(this).attr('itemid');
            for(var i = 0; i < Wishlist.length; i++) {
                if(parseInt(id) === parseInt(Wishlist[i].id)) {
                    return false;
                }                
            }
            var sText = $(this).text();
            var url = 'remote/' + MW.getIntURL('wishlist', 'add');
            
            $(this).replaceWith(c$('span').text(sText));
            httpAjaxRequest({'url':url+'&isajax=1&retwl=1&gift_category=1&gift_id='+id, 'success':setWishlist});
            
            return false;
        },
        item_click: function() {
            var sName   = Util.getInputSelectedValue($('#type_filter', popupElt.content));
            var sFilter = Util.getInputSelectedValue($('#show_filter', popupElt.content));
            $('.item_list li.selected', popupElt.content).toggleClass('selected', false);
            $(this).toggleClass('selected', true);
            
            genSelectedItemDom(Inventory[sName][sFilter][$(this).attr('idx')]);
        },
        genTable_click: function() {
            var sOutput = 'data:text/html;base64,';
            sOutput += global.Base64.encode(genHTMLTable());
            unsafeWindow.open(sOutput, '_black');
        }
    };
    
    var sortBy = {
        attack   : function(a, b) { return b.attack - a.attack; },
        defense  : function(a, b) { return b.defense - a.defense; },
        combined : function(a, b) { return (b.attack+b.defense) - (a.attack+a.defense); },
        quantity : function(a, b) { return b.quantity - a.quantity; }
    };
    
    var getInventoryData = function(html) {
        var Items, Item;
        
        eval(Util.substr(html, 'var Items', '</script>'));
        
        if (unsafeWindow.Item) {
            Item = unsafeWindow.Item;
            log$('Loaded Item data from dom.');
        }
        else {
            eval(Util.substr($('head').html(), 'var Item', '</script>'));
            log$('Loaded Item data from head html.');
        }
        
        Inventory.ItemTypes = Item.Types;
        Inventory.Locations = Item.Locations;
        Inventory.Qualities = Item.Qualities;
        Inventory.Subtypes  = Item.Subtypes;
        
        //log$($.toJSON(Items.data));
        return Inventory.all = Items.data;
    };
    
    function genHTMLTable() {
        var sOutput = '<html><head></head><body><table cellspacing="1" border="1" style="text-align:center;"><tbody>';
        var eList = $('.item_list', popupElt.content).clone();
        var eHeader = $('.header', popupElt.content).clone();
        
        eList.find('.space').remove();
        eHeader.find('.space').remove();
        
        eList.find('img').replaceWith(function() {
            var rgx;
            var sTitle = $(this).attr('title');
            var sUrl = $(this).attr('src');
            var sSpan = '<span title="' + sTitle + '">';
            
            if (/active-icon/.test(sUrl)) {
                return sSpan + 'A</span>';
            }
            if (/inactive-icon/.test(sUrl)) {
                return sSpan + 'N</span>';
            }
            if ((rgx = /Quality:\s*(\w)\w+/.exec(sTitle))) {
                return sSpan + rgx[1] + '</span>';
            }
            return '';
        });
        
        var sList = eList.html();
        var sHeader = eHeader.html();
        
        sList = sList.replace(/<li[^>]*>/g, '<tr>').replace(/<\/li>/g, '</tr>');
        sList = sList.replace(/<div[^>]*>/g, '<td>').replace(/<\/div>/g, '</td>');
        sHeader = sHeader.replace(/<div[^>]*>/g, '<th>').replace(/<\/div>/g, '</th>');
        
        sOutput += '<tr>' + sHeader + '</tr>' + sList;
        
        return sOutput + '</tbody></table></body></html>';
    }
    
    function setWishlist(jsonData) {
        try {
            var data = $.parseJSON(jsonData.data);
            if (data && data.wldata) {
                Wishlist = data.wldata;
                updateWishlist();                
            }
            else {
                showHelpPopup({
                    icon: 'error',
                    title: 'Error adding item to wishlist',
                    message: data.wlmsg
                });
            }
        }
        catch(err) {
            logErr$(err);
        }
    }
    
    function updateWishlist() {
        var sRemImgSrc = global.zGraphicsURL + 'inventory/ItemCard/icons/Inventory-wishlist2-icon.png';
        var elem = $('#wishlist').empty();
        
        $.each(Wishlist, function(index, item) {
            c$('div', 'class:wl_item,title:'+item.name)
            .append(c$('img', 'class:remove,wid:'+index).attr('src', sRemImgSrc).click(Events.remWishlist_click))
            .append(c$('img').attr('src', item.image).width(50).height(50))
            .append(c$('div', 'class:attack_defense').html(
                '<span class="attack">'+item.attack+
                '</span><span class="defense">'+item.defense+'</span>'
            ))
            .appendTo(elem);
        });         
    }
    
    function genListDom() {
        var sName      = Util.getInputSelectedValue($('#type_filter', popupElt.content));
        var sFilter    = Util.getInputSelectedValue($('#show_filter', popupElt.content));
        var bNeed      = /get/.test(sFilter);
        var sHtmlText  = '';
        
        if (/line/.test(sFilter)) {
            return;
        }
        
        var iElt = $('#info_table').empty();
        
        var sQTitle = bNeed ? 'Items needed' : 'Item quantity';
        var sATitle = bNeed ? 'Attack gained if equipped' : 'Items equipped in attack';
        var sDTitle = bNeed ? 'Defense gained if equipped' : 'Items equipped in defense';
        var sCTitle = bNeed ? 'Combined gained if equipped' : 'Items equipped in tournaments';
        var sGATitle = bNeed ? 'Attack gained if total equipped' : 'Total attack from this item';
        var sGDTitle = bNeed ? 'Defense gained if total equipped' : 'Total defense from this item';
        var sGCTitle = bNeed ? 'Combined gained if total equipped' : 'Total combined from this item';
        
        c$('div', 'class:header')
        .append(c$('div', 'class:quality').html('A'))
        .append(c$('div', 'class:space'))
        .append(c$('div', 'class:quality').html('Q'))
        .append(c$('div', 'class:space'))
        .append(c$('div', 'class:item_name').html('Item Name'))
        .append(c$('div', 'class:space'))
        .append(c$('div', 'class:number quantity,title:'+sQTitle).html('QT'))
        .append(c$('div', 'class:space'))
        .append(c$('div', 'class:number,title:'+sATitle).html(bNeed?'+A':'EA'))
        .append(c$('div', 'class:number,title:'+sDTitle).html(bNeed?'+D':'ED'))
        .append(c$('div', 'class:number,title:'+sCTitle).html(bNeed?'+C':'ET'))
        .append(c$('div', 'class:space'))
        .append(c$('div', 'class:number').html('AT'))
        .append(c$('div', 'class:number').html('DF'))
        .append(c$('div', 'class:number').html('CB'))
        .append(c$('div', 'class:space'))
        .append(c$('div', 'class:total,title:'+sGATitle).html(bNeed?'GA':'TA'))
        .append(c$('div', 'class:total,title:'+sGDTitle).html(bNeed?'GD':'TD'))
        .append(c$('div', 'class:total,title:'+sGCTitle).html(bNeed?'GC':'TC'))
        .appendTo(iElt);
        
        // List of items
        $.each(Inventory[sName][sFilter], function(index, item) {
            
            var nCombined       = item.attack + item.defense;
            var nTotalAttack    = item.attack * item.quantity;
            var nTotalDefense   = item.defense * item.quantity;
            var nTotalCombined  = nCombined * item.quantity;
            var sImageQuality   = (Inventory.Qualities[String(item.quality)] || {}).image;
            var sImgActiveSrc   = 'http://mwfb.static.zgncdn.com/mwfb/graphics/inventory/ItemCard/icons/';
            var sImageActive    = item.active ? 'Inventory-active-icon.png' : 'Inventory-inactive-icon.png';
            var sActiveTitle    = item.active 
                ? 'Active item - Your Mafia is using this item in fights/robs.' 
                : 'Inactive item - Your Mafia is not using this item in fights/robs.';
            
            sHtmlText += '<li idx="'+index+'"><div class="quality">';
            sHtmlText += '<img title="'+sActiveTitle+'" style="margin-top: 1px;"';
            sHtmlText += 'src="'+sImgActiveSrc+sImageActive+'"></div>';
            sHtmlText += '<div class="quality">'+sImageQuality+'</div>';
            sHtmlText += '<div class="space"></div>';
            sHtmlText += '<div class="item_name">'+item.name+'</div>';
            sHtmlText += '<div class="space"></div>';
            
            if (bNeed) {
                var index = sFilter.lastIndexOf('_'); 
                sHtmlText += '<div class="number quantity">'+item['need'+sFilter.substr(index)]+'</div>';
            }
            else {
                sHtmlText += '<div class="number quantity">'+item.quantity+'</div>';
            }
            
            sHtmlText += '<div class="space"></div>';
            
            if (bNeed) {
                sHtmlText += '<div class="number">+'+item.gain_offense+'</div>';
                sHtmlText += '<div class="number">+'+item.gain_defense+'</div>';
                sHtmlText += '<div class="number">+'+item.gain_combined+'</div>';
            }
            else {
                sHtmlText += '<div class="number">'+item.equipped_offense+'</div>';
                sHtmlText += '<div class="number">'+item.equipped_defense+'</div>';
                sHtmlText += '<div class="number">'+item.equipped_combined+'</div>';
            }
            
            sHtmlText += '<div class="space"></div>';
            sHtmlText += '<div class="number">'+item.attack+'</div>';
            sHtmlText += '<div class="number">'+item.defense+'</div>';
            sHtmlText += '<div class="number">'+nCombined+'</div>';
            sHtmlText += '<div class="space"></div>';
            
            if (bNeed) {
                sHtmlText += '<div class="total">+'+item.gained_offense+'</div>';
                sHtmlText += '<div class="total">+'+item.gained_defense+'</div>';
                sHtmlText += '<div class="total">+'+item.gained_combined+'</div></li>';
            }
            else {
                sHtmlText += '<div class="total">'+nTotalAttack+'</div>';
                sHtmlText += '<div class="total">'+nTotalDefense+'</div>';
                sHtmlText += '<div class="total">'+nTotalCombined+'</div></li>';                
            }

        });
        
        c$('ul', 'class:item_list').html(sHtmlText).appendTo(iElt).find('li').click(Events.item_click);
    }
    
    function genSelectedItemDom(item) {
        
        if (typeof(item) == 'undefined') {
            $('#item_info', popupElt.content).empty()
            .append(c$('div').text('Select an item to show extended info.'));
            return; 
        }
         // selected item info
        var infoElt, sSearchUrl = 'http://mafiawars.wikia.com/index.php?title=Special:Search&search=';
        var iLocation = Inventory.Locations[item.location];
        var sType = [];
        
        if (item.subtypes && item.subtypes.length) {
            $.each(item.subtypes, function(i, index) {
                var subtype = Inventory.Subtypes[String(index)];
                
                if(typeof(subtype) !== 'undefined') {
                    sType.push(subtype.name); 
                }
            });
        }
        
        $('#item_info', popupElt.content).empty()
        .append(c$('div', 'class:imagen').html(item.image))
        .append(infoElt = c$('div', 'class:info'));
        
        if (sType.length > 0) {
            c$('div').css({'float':'left','margin-right':5})
            .html('Item type: '+sType.join(', ') + ' ').appendTo(infoElt);
        }
        
        if (item.favor_id > 0 && parseInt(item.rp_price) > 0) {
            c$('div').appendTo(infoElt).css({'float':'left','color':'green'}).html('('+item.rp_price + ' RP)')
            // .html('<img
            // src="'+global.zGraphicsURL+'v3/icon-gf-coin.gif">'+item.rp_price
            // + ' RP');
        }
        else if (item.pawn_shop > 0 && parseInt(item.lp_price) > 0) {
            c$('div').appendTo(infoElt).css({'float':'left','color':'green'}).html('('+item.lp_price + ' LP)')
            // .html('<img
            // src="'+global.zGraphicsURL+'crm/CRM_LP-icon-s.png">'+item.lp_price
            // + ' LP');
        }
        else if (item.purchasable && parseInt(item.cash_price) > 0) {
            c$('div').appendTo(infoElt).css({'float':'left','color':'green'}).html('(buy: '+item.cash_price+')');
        }
        
        c$('div').css('clear', 'both').html('You can search it at ').appendTo(infoElt)
        .append(c$('a', 'target:_black').attr('href', sSearchUrl+String(item.name).replace(/\s+?/g,'+')).text('wikia'));
        
        if (item.tradeable > 0) {
            c$('div').html('This item can be added to ').appendTo(infoElt)
            .append(c$('a', 'href:#,itemid:'+item.id).text('wishlist')
            .click(Events.addWishlist_click));
        }
        
        if (iLocation && iLocation.link && iLocation.name) {
            var link = (/http/.test(iLocation.link)?'':'http://facebook.mafiawars.com/mwfb/') + iLocation.link;
            c$('div').html('You can get this item in ').appendTo(infoElt)
            .append(c$('a', 'target:_black').attr('href', link).text(iLocation.name));
        }
    }
    
    function genMainDom() {
        
        // filter
        c$('div', 'class:frame_box').appendTo(popupElt.content)
        .append(c$('label', 'for:show_filter').text('Show: '))
        .append(c$('select', 'id:type_filter,class:black').width(150).change(genListDom))
        .append(c$('select', 'id:show_filter,class:black').change(genListDom))
        .append(b$('Generate Table', 'class:short white').css('float', 'right').click(Events.genTable_click));
        
        c$('div', 'class:frame_box').height(80).appendTo(popupElt.content)
        .append(c$('div', 'item_info').text('Select an item to show extended info.'))
        .append(c$('div', 'wishlist'));
          
        // List
        var divElt = c$('div', 'info_table').appendTo(popupElt.content).css({
            'margin': 2,
            'padding': 2
        });
        
        function buildStrengthBox(title, type) {
            var elem = c$('div', 'class:mafia_strength')
            .append(c$('div', 'class:total_title').append(c$('span').text(title)));
            
            $.each(['Weapons', 'Armor', 'Vehicles', 'Animals', 'Total'], function(index, name) {
                var nQuantity = Inventory.global[name+'_'+type];
                var sClassFix = (type == 'offense') ? 'attack' : type;
                
                c$('div', 'class:mafia_strength_spacing').appendTo(elem)
                .append(c$('div', 'class:stat_name').text(name + ':'))
                .append(c$('span','class:text_positioning '+sClassFix).text(nQuantity));
            });
            
            return elem;
        }
        
        function buildQualitiesBox() {
            var cQualities = Inventory.global.Qualities;
            var elem = c$('div', 'class:mafia_strength qualities')
            .append(c$('div', 'class:total_title').append(c$('span').text('Qualities equipped')));
            
            $.each(Inventory.Qualities, function(name, cQuality) {
                var nQuantity = cQualities[name];
                c$('div', 'class:mafia_strength_spacing').appendTo(elem)
                .append(c$('div').css('float', 'left').html(cQuality.image).css('margin-left',5))
                .append(c$('div', 'class:stat_name').text(cQuality.name + ':'))
                .append(c$('span','class:text_positioning').text(nQuantity));
            });
            
            c$('div', 'class:mafia_strength_spacing').appendTo(elem)
            .append(c$('div', 'class:stat_name').text('Total:'))
            .append(c$('span','class:text_positioning').text(cQualities['Total']));
            
            return elem;
        }
        
        // global stats
        c$('div', 'class:frame_box').height(200).appendTo(popupElt.content)
        .append(buildStrengthBox('Attack Strength', 'offense'))
        .append(buildStrengthBox('Defense Strength', 'defense'))
        .append(buildStrengthBox('Combined Strength', 'combined'))
        .append(buildQualitiesBox());
        
        // apply options
        popupElt.applyOptions({
            'type_filter': {
                'Weapons'  : 'Weapons',
                'Armor'    : 'Armor',
                'Vehicles' : 'Vehicles',
                'Animals'  : 'Animals'
            },
            'show_filter': {
                'top_offense'         : 'Top offense',
                'top_defense'         : 'Top defense',
                'top_combined'        : 'Top combined',
                'line0'               : '-------------------',
                'weak_offense'        : 'Weak offense',
                'weak_defense'        : 'Weak defense',
                'weak_combined'       : 'Weak combined',
                'line1'               : '-------------------',
                'get_offense'         : 'Need for offense',
                'get_defense'         : 'Need for defense',
                'get_combined'        : 'Need for tournament',
                'line2'               : '-------------------',
                'give_away'           : 'To given away.'
            }
        });
    }
    
    function Initialize(htmlText) {
        if (MW.update(htmlText) !== true) {
            popupElt.destroy();
            showBadResponse();
            return;
        }
        var Items = getInventoryData(htmlText);
        
        // get all items
        $.each(Items, function(id, obj) {
            var sInventory;
            var cQualities   = Inventory.global['Qualities'];
            var nGroupIndex  = Indexes[String(obj.type)];
            var bEquipped    = (obj.equipped_offense + obj.equipped_defense) > 0;
            var nEquipped    = Math.max(obj.equipped_offense, obj.equipped_defense);
            var bValid       = (obj.attack + obj.defense) > 0;
            var bAvailable   = (
                (obj.location != 7 && obj.location != 10 && obj.location != 16 
                && obj.location != 9 && obj.specialAbility.length < 1) 
                || obj.favor_id != -1 || obj.vc_available == true
            );
            try {
                if (typeof(sInventory = Inventory[Groups[nGroupIndex]]) !== 'undefined') 
                {
                    // add new stats
                    obj['equipped_combined'] = 0;
                    obj['need_offense']      = 0;
                    obj['need_defense']      = 0;
                    obj['need_combined']     = 0;
                    obj['gained_offense']    = 0;
                    obj['gained_defense']    = 0;
                    obj['gained_combined']   = 0;
                    obj['need_total']        = 0;
                    obj['gain_offense']      = 0;
                    obj['gain_defense']      = 0;
                    obj['gain_combined']     = 0;
                    obj['combined']          = obj['attack'] + obj['defense'];
                    obj['offense']           = obj['attack'];
                    
                    // add equiped items
                    if (bEquipped) {                        
                        cQualities[obj.quality] += nEquipped;
                        cQualities['Total'] += nEquipped;
                        sInventory['top_combined'].push(obj);
                        if(obj.equipped_offense > 0) {
                            sInventory['top_offense'].push(obj);
                        }
                        if(obj.equipped_defense > 0) {
                            sInventory['top_defense'].push(obj);
                        }
                    }
                    // add owned items
                    else if(!bEquipped && bValid && obj.quantity > 0) {
                        sInventory['top_combined'].push(obj); 
                        if(obj.attack > obj.defense) {
                            sInventory['weak_offense'].push(obj); 
                        }
                        else {
                            sInventory['weak_defense'].push(obj);
                        }
                    }
                    // add needed items
                    if(bValid && bAvailable) {
                        sInventory['get_combined'].push(obj);
                        sInventory['get_offense'].push(obj);
                        sInventory['get_defense'].push(obj);
                    }
                }
            }
            catch(err) {
                logErr$(err);
            }
        });
        
        // calculate all
        $.each(Groups, function(index, groupTag) {
            Inventory[groupTag]['top_offense'].sort(sortBy.attack);
            Inventory[groupTag]['top_defense'].sort(sortBy.defense);
            Inventory[groupTag]['top_combined'].sort(sortBy.combined);
            Inventory[groupTag]['weak_offense'].sort(sortBy.attack);
            Inventory[groupTag]['weak_defense'].sort(sortBy.defense);
            
            // calculate combined
            var top_combined = [];
            var nMaxCombined = 501;
            
            $.each(Inventory[groupTag]['top_combined'], function(index, item) {
                if (nMaxCombined > 0) {
                    top_combined.push(item);
                    nMaxCombined -= item['quantity'];
                    item['equipped_combined'] = item['quantity'];
                    if (nMaxCombined < 0) {
                        item['equipped_combined'] += nMaxCombined;
                    }
                }
                else {
                    Inventory[groupTag]['weak_combined'].push(item);
                }
            });
            
            (Inventory[groupTag]['top_combined'] = top_combined).sort(sortBy.combined);
            Inventory[groupTag]['weak_combined'].sort(sortBy.combined);
            
            // calculate need, gain, total, etc..
            var getList = {'get_offense':[], 'get_defense':[], 'get_combined':[]};
            
            $.each(['offense', 'defense', 'combined'], function(index, tagName) {
                var sTag = 'get_' + tagName;
                
                $.each(Inventory[groupTag][sTag], function(index, Item) {
                    
                    var top = Inventory[groupTag]['top_' + tagName];
                    var nMax = 501, nGain = 0;
                    var tag = {
                        gain     : 'gain_' + tagName,
                        needed   : 'need_' + tagName,
                        gained   : 'gained_' + tagName,
                        equipped : 'equipped_' + tagName
                    };
                    
                    for (var i = 0; i < top.length; i++) {
                        nMax -= top[i][tag.equipped];
                        
                        if (Item[tagName] > top[i][tagName]) 
                        {
                            nGain = Item[tagName] - top[i][tagName];
                            Item[tag.needed] += top[i][tag.equipped];
                            Item[tag.gained] += (nGain * top[i][tag.equipped]);
                        }
                        if (nMax < 1) {
                            break;
                        }
                    }
                    
                    Item[tag.gain] = nGain;
                    
                    if (Item[tag.needed] > 0) {
                        Item['need_total'] = Math.max(Item['need_offense'] , Item['need_defense']);
                        Item['need_total'] = Math.max(Item['need_total']   , Item['need_combined']);
                        getList[sTag].push(Item);
                    }
                });
            });
            
            (Inventory[groupTag]['get_offense']  = getList['get_offense'] ).sort(sortBy.attack);
            (Inventory[groupTag]['get_defense']  = getList['get_defense'] ).sort(sortBy.defense);
            (Inventory[groupTag]['get_combined'] = getList['get_combined']).sort(sortBy.combined);
            
            var aMergedWeak = $.merge(Inventory[groupTag]['weak_offense'], Inventory[groupTag]['weak_defense']);
            var cItemsAdded = {};
            
            $.each($.merge(aMergedWeak, Inventory[groupTag]['weak_combined']), function(index, Item) {
                if (cItemsAdded[String(Item.id)] === true) {
                    return true;
                }
                if (Item['equipped_offense'] < 1 && 
                    Item['equipped_defense'] < 1 && 
                    Item['equipped_combined'] < 1)
                {
                    Inventory[groupTag]['give_away'].push(Item);
                    cItemsAdded[String(Item.id)] = true;
                }
            });
            
            Inventory[groupTag]['give_away'].sort(sortBy.quantity);

            $.each(['offense', 'defense', 'combined'], function(index, tagName) {
                var cGlobal = Inventory.global;
                var tags = {
                    top             : 'top_' + tagName,
                    equipped        : 'equipped_' + tagName,
                    groupStrength   : groupTag + '_' + tagName,
                    totalStrength   : 'Total_' + tagName
                 };
                
                $.each(Inventory[groupTag][tags.top], function(index, Item) {
                    var nAmount = Item[tagName] * Item[tags.equipped];
                    
                    cGlobal[tags.groupStrength] += nAmount;
                    cGlobal[tags.totalStrength] += nAmount;
                });
            });
        });
        
        genMainDom();
        genListDom();
        // add wishlist
        httpAjaxRequest({
            url:'remote/' + MW.getIntURL('wishlist', 'add') + '&isajax=1&retwl=1&gift_category=0&gift_id=0', 
            success: setWishlist
        });
        // show popup
        popupElt.show();
    }
    
    popupElt.addBase64Style(
        'I2ludkFuYWxpemVyX3BvcHVwIC5ibGFjayB7DQoJd2lkdGg6IDI0MHB4Ow0KCW1hcmdpbi1sZWZ0OiA1cHg7DQoJZm9udC13ZWln'+
        'aHQ6IGJvbGQ7IA0KCWNvbG9yOiByZ2IoMjA4LCAyMDgsIDIwOCk7IA0KCWJvcmRlcjogMXB4IHNvbGlkIHJnYigxNTMsIDE1Mywg'+
        'MTUzKTsgDQoJYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IA0KCWZvbnQtc2l6ZTogMTRweDsNCn0NCiNpbnZBbmFsaXplcl9wb3B1'+
        'cCAuZnJhbWVfYm94IHsNCglib3JkZXI6IDFweCBzb2xpZCAjMkYyRjJGOw0KCW1hcmdpbjogNXB4Ow0KCW1pbi1oZWlnaHQ6IDI2'+
        'cHg7DQoJcGFkZGluZzogNXB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgZGl2LmhlYWRlciB7'+
        'DQoJYm9yZGVyOiAxcHggc29saWQgIzc3NzsNCgloZWlnaHQ6IDIwcHg7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCgl0ZXh0LWFsaWdu'+
        'OiBjZW50ZXI7DQoJcGFkZGluZzogMnB4Ow0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIGRpdi5oZWFkZXIgZGl2Lml0ZW1fbmFtZSB7'+
        'DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIHVsLml0ZW1fbGlzdCB7DQoJYm9yZGVyOiAxcHgg'+
        'c29saWQgIzk5OTsNCgloZWlnaHQ6IDM3NXB4Ow0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCgltYXJnaW46IDBweDsNCglvdmVy'+
        'Zmxvdy14OiBoaWRkZW47DQoJb3ZlcmZsb3cteTogYXV0bzsNCglwYWRkaW5nOiAwcHg7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAg'+
        'dWwuaXRlbV9saXN0IGxpIHsNCglib3JkZXI6IDFweCBzb2xpZCAjMzMzOw0KCWN1cnNvcjogcG9pbnRlcjsNCgloZWlnaHQ6IDE5'+
        'cHg7DQoJbWFyZ2luOiAxcHg7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCglwYWRkaW5nOiAxcHg7DQp9DQojaW52QW5hbGl6ZXJfcG9w'+
        'dXAgdWwuaXRlbV9saXN0IGxpLnNlbGVjdGVkIHsNCglib3JkZXI6IDFweCBzb2xpZCAjQ0MwOw0KfQ0KI2ludkFuYWxpemVyX3Bv'+
        'cHVwIGRpdi5udW1iZXIgew0KCWZsb2F0OiBsZWZ0Ow0KCW1heC13aWR0aDogMzBweDsNCgltaW4td2lkdGg6IDMwcHg7DQoJcGFk'+
        'ZGluZzogMXB4Ow0KCXdpZHRoOiBhdXRvOw0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIGRpdi5udW1iZXIucXVhbnRpdHkgew0KCW1h'+
        'eC13aWR0aDogNDBweDsNCgltaW4td2lkdGg6IDQwcHg7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgZGl2LnF1YWxpdHkgew0KCWZs'+
        'b2F0OiBsZWZ0Ow0KCW1heC13aWR0aDogMTZweDsNCgltaW4td2lkdGg6IDE2cHg7DQoJcGFkZGluZzogMXB4Ow0KCXdpZHRoOiBh'+
        'dXRvOw0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIGRpdi50b3RhbCB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWF4LXdpZHRoOiA1MHB4Ow0K'+
        'CW1pbi13aWR0aDogNTBweDsNCglwYWRkaW5nOiAxcHg7DQoJd2lkdGg6IGF1dG87DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgZGl2'+
        'LnNwYWNlIHsNCgliYWNrZ3JvdW5kLWNvbG9yOiAjM0YzRjNGOw0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogMTlweDsNCgltYXgt'+
        'd2lkdGg6IDFweDsNCgltaW4td2lkdGg6IDFweDsNCgl3aWR0aDogMXB4Ow0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIGRpdi5pdGVt'+
        'X25hbWUgew0KCWZsb2F0OiBsZWZ0Ow0KCW1heC13aWR0aDogMjIwcHg7DQoJcGFkZGluZzogMXB4Ow0KCXRleHQtYWxpZ246IGxl'+
        'ZnQ7DQoJd2lkdGg6IDIyMHB4Ow0KCXBhZGRpbmc6IDBweCA1cHg7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgLmZyYW1lX2JveCBk'+
        'aXYjaXRlbV9pbmZvIHsNCglmbG9hdDogbGVmdDsNCgl3aWR0aDogMzc4cHg7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgLmZyYW1l'+
        'X2JveCBkaXYuaW1hZ2VuIHsNCglib3JkZXI6IDFweCBzb2xpZCAjNUY1RjVGOw0KCWZsb2F0OiBsZWZ0Ow0KfQ0KI2ludkFuYWxp'+
        'emVyX3BvcHVwIC5mcmFtZV9ib3ggZGl2LmluZm8gew0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogODBweDsNCgltYXJnaW4tbGVm'+
        'dDogNXB4Ow0KCW1heC1oZWlnaHQ6IDgwcHg7DQoJbWF4LXdpZHRoOiAyOTBweDsNCn0NCiNpbnZBbmFsaXplcl9wb3B1cCAuZnJh'+
        'bWVfYm94IGRpdiN3aXNobGlzdCB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lkdGg6IDMwMHB4Ow0KfQkNCiNpbnZBbmFsaXplcl9wb3B1'+
        'cCAuZnJhbWVfYm94IGRpdi53bF9pdGVtIHsNCglib3JkZXI6IDFweCBzb2xpZCAjNEY0RjRGOw0KCWZsb2F0OiBsZWZ0Ow0KCWhl'+
        'aWdodDogNzJweDsNCgltYXJnaW46IDFweDsNCglwYWRkaW5nOiAzcHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCgl3aWR0aDogOTBw'+
        'eDsNCn0NCiNpbnZBbmFsaXplcl9wb3B1cCAuZnJhbWVfYm94IGRpdi53bF9pdGVtIGltZy5yZW1vdmUgew0KCWZsb2F0OiByaWdo'+
        'dDsNCgljdXJzb3I6IHBvaW50ZXI7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgLmZyYW1lX2JveCBkaXYud2xfaXRlbSAuYXR0YWNr'+
        'X2RlZmVuc2Ugew0KCW1hcmdpbjogMHB4Ow0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIC5mcmFtZV9ib3ggZGl2LndsX2l0ZW0gLmF0'+
        'dGFja19kZWZlbnNlIC5kZWZlbnNlIHsNCgltYXJnaW4tbGVmdDogNXB4Ow0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIC5tYWZpYV9z'+
        'dHJlbmd0aCB7DQoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIv'+
        'Z3JhcGhpY3MvaW52ZW50b3J5L3N1bW1hcnkvTWFmaWEtc3RyZW5ndGgtYm94LnBuZykgbm8tcmVwZWF0Ow0KCWZsb2F0OiBsZWZ0'+
        'Ow0KCWhlaWdodDogMjAwcHg7DQoJd2lkdGg6IDE2MHB4Ow0KCWZvbnQtc2l6ZTogMTJweDsNCn0NCiNpbnZBbmFsaXplcl9wb3B1'+
        'cCAubWFmaWFfc3RyZW5ndGggPiBkaXY6bGFzdC1jaGlsZCB7DQoJbWFyZ2luLXRvcDogMjBweDsNCn0NCiNpbnZBbmFsaXplcl9w'+
        'b3B1cCAubWFmaWFfc3RyZW5ndGgucXVhbGl0aWVzID4gZGl2Omxhc3QtY2hpbGQgew0KCW1hcmdpbi10b3A6IDE1cHg7DQp9DQoj'+
        'aW52QW5hbGl6ZXJfcG9wdXAgLm1hZmlhX3N0cmVuZ3RoIC50b3RhbF90aXRsZSB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbWFy'+
        'Z2luLWJvdHRvbTogMjFweDsNCgltYXJnaW4tbGVmdDogYXV0bzsNCgltYXJnaW4tcmlnaHQ6IGF1dG87DQoJcGFkZGluZy10b3A6'+
        'IDEwcHg7DQoJcG9zaXRpb246IHJlbGF0aXZlOw0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgl3aWR0aDogMTYwcHg7DQp9DQojaW52'+
        'QW5hbGl6ZXJfcG9wdXAgLm1hZmlhX3N0cmVuZ3RoLnF1YWxpdGllcyAudG90YWxfdGl0bGUgew0KCW1hcmdpbi1ib3R0b206IDEz'+
        'cHg7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgLm1hZmlhX3N0cmVuZ3RoIC50b3RhbF90aXRsZSBzcGFuIHsNCgljb2xvcjogI0ZG'+
        'Q0QwMDsNCgl0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOw0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0aCAu'+
        'bWFmaWFfc3RyZW5ndGhfc3BhY2luZyB7DQoJaGVpZ2h0OiAxOHB4Ow0KCW1hcmdpbi1sZWZ0OiAycHg7DQoJbWFyZ2luLXRvcDog'+
        'N3B4Ow0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0aC5xdWFsaXRpZXMgLm1hZmlhX3N0cmVuZ3RoX3NwYWNp'+
        'bmcgew0KCW1hcmdpbi10b3A6IDRweDsNCn0JDQojaW52QW5hbGl6ZXJfcG9wdXAgLnRleHRfcG9zaXRpb25pbmcgew0KCWNvbG9y'+
        'OiAjOTk5Ow0KCWZvbnQtc2l6ZTogMTFweDsNCn0NCiNpbnZBbmFsaXplcl9wb3B1cCAubWFmaWFfc3RyZW5ndGggLm1hZmlhX3N0'+
        'cmVuZ3RoX3NwYWNpbmcgLnN0YXRfbmFtZSB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luLWxlZnQ6IDEwcHg7DQoJd2lkdGg6IDgw'+
        'cHg7DQp9'
    );
    
    httpAjaxRequest({
        url: 'remote/' + MW.getIntURL('inventory'),
        message: 'Loading inventory data...',
        success: Initialize
    });
}

/**
 * help collecting free gifts
 */
function FreeGiftsCenter() 
{
    const SEND_FBR = 0;
    const SEND_ZMC = 1;
    
    /** @type {MafiaMemberCollection} */ 
    var MyMafiaMembers;
    
    var Requests = new Array();
    var cancel_process = false;
    var options = new Config('freegifts', defaults.freegifts);
    var searchLinksRegex = /([^:=\n\r]+)[:=]>?\s(http:\/\/(?:bit.ly|tiny|spockon)[^\/]*\/[^\s]+)/g;
    
    // popup
    var popupElt = new domPopupObject('freegiftscenter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.freegiftscenter_title+'">',
        onclose: function() {
            options.fromDomElements();
            options.save();
        }
    });
    /**
     * @constructor
     * @param {String} url
     * @return {CSLink}
     */
    var CSLink = function(url, fbId) {
        var cUrl, cPrm, self = this;
        var event_hash = (new Date()).getTime();
        var bExclude = false;
        
        this.url           = url;
        this.fbId          = fbId;
        this.event_type    = -1;
        this.user_id       = -1;
        this.gift_id       = -1;
        this.canSendBack   = false;
        this.fromStream    = false;
        this.onlyOnePerDay = false;
        
        try {
            if (!Util.isString(url) || url.indexOf('?') == -1) {
                throw ReferenceError('Invalid url argument');
            }
            cUrl = Util.uSplit(url);
            
            if (cUrl.next_params && !(cUrl.next_controller && cUrl.next_action)) {
                // encoded params
                cUrl = MW.decodeURL(cUrl.next_params);
                cPrm = cUrl.next_params;
            }
            else {
                cPrm = Util.parseParam(cUrl.next_params);
            }
            
            // fix url params 
            if (cUrl.next_action === 'accept_gift') 
            {
                this.onlyOnePerDay = true;
                this.event_type = (cPrm.et = 3012);
                this.canSendBack = true;
            }
            else if (cUrl.next_controller === 'secretStash') 
            {
                cUrl.next_controller  = 'freegifts';
                cUrl.next_action      = 'accept_gift';
                cUrl.from_user        = Util.parseParam(cUrl.value).from;
                cPrm = {
                    'et'             : (this.event_type = 3012), 
                    'mult'           : 1,
                    'item_cat'       : 1,
                    'item_id'        : 3004,
                    'time_id'        : cPrm.time, 
                    'from_user'      : cUrl.from_user,
                    'from_user_ppid' : cUrl.from_user, 
                    'stash_slot_id'  : cPrm.id,
                    'stash_time'     : cPrm.time,
                    'stash_hash'     : cPrm.hash,
                    'zmc'            : event_hash
                };
            }
            else if (cUrl.next_controller === 'safehouse') 
            {
                this.event_type = (cPrm.et = 3012);
            }
            else if (cUrl.next_controller === 'recruit' && fbId) 
            {
                this.event_type = 3013;
                cUrl.next_action = 'accept';
                cPrm = {
                    'user_id'   : fbId,
                    'from_user' : Util.parseParam(cUrl.value).from,
                    'item_id'   : 194,
                    'gift_cat'  : 1,
                    'gift_id'   : 6
                };
            }
            else if (cUrl.next_action === 'accept_energy_req') 
            {
                this.event_type = (cPrm.et = 3052);
                this.canSendBack = true;
            }
            else if (cUrl.next_action === 'accept_city_crew') 
            {
                this.event_type = 3053;
                cPrm.from_zmc = 1;
            }
            else if (Util.isSet(cPrm.double_mastery_boost)) 
            {
                this.event_type = (cPrm.et = 3053);
                cPrm.b_type = 66;
                cPrm.dmzmckey = event_hash;
            }
            else if (cUrl.next_action === 'getCustomer') 
            {
                this.fromStream  = true;
                cPrm.from_user = cPrm.target;
            }
            else {
                log$('Excluded url: '+Util.toJSON(cPrm));
                bExclude = true; 
            }
            
            if ( bExclude === false ) {
	            // build url
	            url = 'remote/' + MW.getIntURL(cUrl.next_controller, cUrl.next_action);
	            
	            $.each(cPrm, function(n, p) {
	                if (!/exclude|activehustle|gift_hack|mastery_boost/.test(n))
	                    url += ('&' + n + '=' + p);
	            });
	            
                if ( !this.fromStream ) {
	                // set up gift 
	                this.url      = url + '&src=2&event_hash='+event_hash;
	                this.user_id  = cPrm.from_user;
	                this.gift_id  = cPrm.item_id;
                }
                else {
                    // set up stream
                    this.url      = url;
                    this.user_id  = cPrm.from_user;
                    this.gift_id  = 0;
                }
            }
            
        }  
        catch(err) {
            log$('CSLink ERROR:'+err.message);
        }
        
        this.sendBackUrl = function(request_type) {
            var sbUrl = '';
            if (request_type === SEND_FBR) {
	            if (self.event_type===3012) 
                {
	                sbUrl = self.url.replace('xw_action=accept_gift', 'xw_action=giftback_iframe');
                    sbUrl += '&fbml_iframe=1';
	            } 
                else if (self.event_type===3052)
                {
	                sbUrl = 'remote/' + MW.getIntURL('messageCenter','energy_request')
                    sbUrl += '&senderId=' + self.user_id + '&fbml_iframe=1';
	            }  
            }
            else if (fbId) {
                if (self.event_type===3012) 
                {
		            sbUrl = 'http://m.mafiawars.com/mobileweb?';
		            sbUrl += 'xw_controller=freegifts&xw_action=zmc_giftback_mobile&iframe=1&ids='+fbId;
		            sbUrl += '&time_id='+cPrm.time_id+'&loop='+cPrm.loop+'&gkey='+cPrm.gkey;
		            sbUrl += '&giftback_key='+cPrm.giftback_key+'&gift_cat='+cPrm.item_cat;
		            sbUrl += '&gift_id='+cPrm.item_id+'&mult=1';
		        } 
                else if (self.event_type===3052)
                {
		            sbUrl += 'http://m.mafiawars.com/mobileweb?';
		            sbUrl += 'xw_controller=messageCenter&xw_action=energy_request&iframe=1&senderId='+fbId;
                }
            }
            return sbUrl;
        };
        
        return this;
    };
    /**
     * @constructor
     * @param {jQuery, Element} elem
     * @return {CSRequest}
     */
    var CSRequest = function(elem) {
        var self = this;
        var r = $('.appRequest input:regex(name,http)', elem);
        var n = $('.appRequest .appRequestTitle > strong > a', elem);
        var b = $('.appRequestBody, .appRequestBodyNewA', elem).find('span');
        var p = $('.appRequest .UIImageBlock_Image', elem);
        var i = $('.appRequest .UIImageBlock_Image img', elem);
        var u = $('form #params\\[from_id\\]', elem);
        if (n.length < 1) { n =  $('.appRequest .UIImageBlock_Image .uiTooltipText', elem); }
        
        this.id       = u.val(),
        this.url      = Util.doRgx(/actions\[([^\]]+)\]/, r.attr('name')).$1;
        this.icon     = i.attr('src');
        this.name     = n.text();
        this.profile  = p.attr('href');
        this.body     = b.text();
        this.reject   = $('form', elem).serialize();
        
        this.remove = function() {
            httpXDRequest({
                method : 'POST',
                header : {'Content-Type': 'application/x-www-form-urlencoded'},
                url    : 'http://www.facebook.com/ajax/reqs.php?__a=1',
                data   : self.reject + '&actions[reject]=&lsd=&post_form_id_source=AsyncRequest'
            });
            delete self;
        }
        
        delete r;
        delete n;
        delete b;
        delete i;
        delete elem;
        
        return this;
    };
    /**
     * Create a nre Gift collection.
     * @param {String} id
     * @param {String} name
     * @return {CSGiftCollection}
     */
    var CSGiftCollection = function(id, name) {
        var links = new Array();
        
        this.name = name;
        this.id = id;
        this.links = links;
        
        /**
         * @param {String} link
         */
        this.add = function(link) {
            links.push(link)
        };
        /**
         * @param {Number} index
         * @return {CSGiftCollection}
         */
        this.get = function(index) {
            return links[index];
        };
        /**
         * @param {Function} callback
         */
        this.each = function(callback) {
            $.each(links, callback);
        };
        
        this.length = function() {
            return links.length;
        };
        
        return this;
    };
    /**
     * Create a new Collector.
     * @return {CSCollector}
     */
    var CSCollector = function() {
        var gifts = new Object();
        
        function to_ID(name) {
            return String(name).toLowerCase().replace(/\s/g,'_');
        }
        
        this.gifts = gifts;
        
        this.length = function() {
            return Util.length(gifts);
        };
        /**
         * @param {String} name
         * @return {CSGiftCollection}
         */
        this.add = function(name) {
            var gift_id = to_ID(name);
            
            if ( Util.isSet(gifts[gift_id]) ) {
                return gifts[gift_id];
            }
            return gifts[gift_id] = new CSGiftCollection(gift_id, name);
        };        
        /**
         * @param {String} gift_id
         * @return {CSGiftCollection}
         */
        this.get = function(gift_id) {
            return gifts[ to_ID(gift_id) ];
        };
        /**
         * @param {String} gift_id
         * @return {Boolean}
         */
        this.exists = function(gift_id) {
            return Util.isSet( gifts[ to_ID(gift_id) ] );
        }
        /**
         * @param {Function} callback
         */
        this.each = function(callback) {
            $.each(gifts, callback);
        };
        
        this.sort = function() {
            var sort_array = new Array();
            var sorted_gifts = new Object();
            
            $.each(gifts, function(id, links) {
                sort_array.push(links);
            });
	        sort_array.sort(function(a, b) {
	            var x = a.name.toLowerCase();
	            var y = b.name.toLowerCase();
	            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	        });
            $.each(sort_array, function(index, links) {
                sorted_gifts[links.id] = links;
            });
            gifts = sorted_gifts;
        };
        
        this.clear = function() {
            delete gifts;
            gifts = new Object();
        };
         
        return this;
    };
    
    /**
     * Create a new user filter.
     * @return {CSFilter}
     */
    var CSFilter = function() {
        var bUseFilter = options.get('useFilter');
        var filterString = String(options.get('filter')).replace(/\s*,\s*/g,'|');
        var filter = new RegExp( filterString , 'i');
        var fixed = /\[|\]/;
        /**
         * Return true if text match the criteria.
         * @param {String} text
         * @return {Boolean}
         */
        this.test = function(text) {
            if ( bUseFilter ) {
                return !fixed.test(text) && filter.test(text);
            }
            return !fixed.test(text); 
        }
        
        return this;
    }
    
    var Collector = new CSCollector();
    
    var excluded = {
        /**
         * Check if a gift is excluded
         * @param {Number} gid
         * @return {Boolean}
         */
        is: function(gid) {
            try {
                var nNow   = parseInt((new Date()).getTime()/100);
                var isEx   = options.get('excludedGifts')[gid];
                var nTime  = isEx ? (isEx - nNow) : 0;
                
                if (nTime > 0) return options.get('useExcludedGifts');
            }
            catch(err) { 
                logErr$(err); 
            }
            return false;
        },
        /**
         * Add a gift to excluded list
         * @param {Number} gid
         */
        add: function(gid) {
            try {
                var nTime = parseInt((new Date()).getTime()/100) + (6*60*60);
                options.get('excludedGifts')[gid] = nTime;
                options.save();
            }
            catch(err) {
                logErr$(err);
            }
        },
        /**
         * Reset the list
         */
        reset: function() {
            options.set('excludedGifts', new Object());
            options.save();
        }
    };
    
    // EVENTS
    var Events = {
        refresh_groups_click: function() {
            var self = this;
            if ($(this).attr('btn')) {
                return false;
            }
            $(this).attr('btn', true).css('opacity', 0.4);
            Groups.refresh(function() {
                Groups.addToSelect('#select_fbgroups',options.get('defaultGroup'));
                $(self).removeAttr('btn').css('opacity', 1);
            });
            return false;
        },
        filter_click: function() {
            var s = String( $('#filter_text', popupElt.content).val() ).toLowerCase();
            $('#reqslist li').each(function(index, element){
                var b = String( $('.body p', element).text() ).toLowerCase();
                if ( b.match(s) ) {
                    $(element).show();
                }
                else {
                    $(element).hide();
                }
            });
            return false;
        },
        clear_filter_click: function() {
            $('#filter_text', popupElt.content).val('');
            $('#reqslist li').show();
            return false;
        },
        add_links_click: function() {
            var id = Util.getInputSelectedValue($('#select_fbgroups', popupElt.content));
            var scan = $('#mass_start_config_tab_0').hasClass('tab_active_op');
            var self = this;
            var enableButton = function() {
                $(self).removeAttr('btn').css('opacity', 1);
            };
            if ($(this).attr('btn')) {
                return false;
            }
            $(this).attr('btn', 'disabled').css('opacity', 0.4);
            if ( scan ) {
	            options.fromDomElements();
	            options.save(function() {
                    if ( id > 0 ) {
		                scanGroup(id, enableButton);
                    } else {
                        scanWall(enableButton);
                    }
	            });
            }
            else {
	            var elem = $('#massive_input', popupElt.content);
	            var text = String(elem.val());
	            elem.val('');
                
	            if (text.indexOf('http') !== -1) {
	                options.fromDomElements();
	                options.save(function() {
		                parseTextLinks(text);
		                showLinks();
                        enableButton();
	                });
	            } else { enableButton(); }
            }
            return false;
        },
        start_collecting_click: function() {
            var g, count, bCountAdded = false, gifts = new Array();
            
            $('#masslinkslist > li', popupElt.content).each(function(n, elem) {
                count = parseInt($('input', elem).val());
                if (count > 0) {
                    g = Collector.get( $(elem).attr('gift') );
                    g.amount = count;
                    gifts.push(g);
                    bCountAdded = true;
                }
            });
            if (bCountAdded === true) {
                gifts.sort(function(a, b) {
                    if (/crime\s?spree/i.test(a.name)) {
                        return -1;
                    }
                    return a.length() > b.length();
                });
                showDiv('log','mass');
                StartCollector(gifts);
            }
            return false;
        },
        clear_collector_click: function() {
            Collector.clear();
            restoreCollectorScreen();
            return false;
        },
        tab_click: function() {
            var tabName = $(this).attr('tb');
            
            $('.tab_bar li', popupElt.content).removeClass('active');
            $(this).addClass('active');
            
            showDiv(tabName, 'body');
            
            options.fromDomElements();
            options.save();
            return false;
        },
        accept_click: function() {
            if ($(this).attr('disabled') == true) {
                return false;
            }
            $(this).attr('disabled', true);
            
            var backRegex  = new RegExp(options.get('thanksBackFilter'), 'i');
            var link,id    = $(this).attr('req');
            var dBtns      = $(this).parent();            
            var dBody      = $('.body p', '#req_' + id);
            
            // check if request is valid
            if (Util.isSet(Requests[id])) {
                link = new CSLink(Requests[id].url, Requests[id].id);
            }
            else {
                dBody.html(Util.setColor('There was an error with this request.','red'));
                addFinishButtons(dBtns, id);
                return false;
            }
            // check if gift is excluded
            if (excluded.is(link.gift_id)) {
                dBody.html(Util.setColor('You\'ve reached the limit of this gift.<br>Are you sure to continue?','yellow'));
                addFinishButtons(dBtns, id, collect);
            }
            else {
                collect();
            }
            // Add loader animation and collect the gift.
            function collect() {
                var nSendBack = parseInt(options.get('sendBackType'));
                
                if (options.get('sendThanksRequest') !== true || 
                   (options.get('useBackGiftFilter') && !backRegex.test(Requests[id].body))) 
                {
                    nSendBack = -1;
                }
                
	            c$('center').css('margin-top',10).appendTo(dBtns.empty())
	            .append(c$('img').attr('src', global.resource.ajax_loader));
                
                collectGift(link, nSendBack, function(data) {
	                var limitRegex = new RegExp(options.get('excludedPattern'), 'i');
	                var image = data.image ? '<img src="'+data.image+'">' : '';
	                
	                if (limitRegex.test(data.message)) {
	                    excluded.add(link.gift_id);
	                }
	                dBody.hide().html(image+data.message).fadeIn(1000);
	                addFinishButtons(dBtns, id);
	                if (data.excluded !== true && options.get('remOnSuccess')) {
	                    Requests[id].remove();
	                }
                });
            }
            return false
        },
        clear_request_click: function() {
            var id  = $(this).attr('req');
            $('#req_'+id).fadeOut(500, function(){
                $('#req_'+id).remove();
            });
            return false
        },
        ignore_request_click: function() {
            var id  = $(this).attr('req');
            var req = Requests[id];
            if (options.get('remOnIgnore')) {
                req && req.remove();
            }
            $('#req_'+id).fadeOut(500, function(){
                $('#req_'+id).remove();
            });
            return false
        },
        refresh_click: function() {
            showDiv('ajaxloader', 'body');
            getUserRequests(function() {
                genFBRequestDom();
                showDiv('reqs', 'body');
            });
            return false
        },
        clear_all: function() {
            $('#reqslist li').each(function(index, element){
                $('#clearbtn', element).click();
            });
        },
        reset_click: function() {
            var self = $(this);
            var message = c$('span').text('Restored!');
            excluded.reset();
            self.hide();
            message.appendTo(self.parent())
            setTimeout(function() {
                self.show();
                message.remove();
            },3000);
            return false;
        },
        select_group_change: function() {
            options.set('defaultGroup', Util.getInputSelectedValue('#select_fbgroups'));
            options.save();
            return false;
        }
    };

    /**
     * Collect a gift and send back if specified.
     * @param {CSLink} link
     * @param {Number} nSendType
     * @param {Function} callback
     */
    function collectGift(link, nSendType, callback) 
    {
        var url, item_image, item_message;
        var bCrimeSpree = false, bSuccess = false, bExcluded = false;
        
        if( (bExcluded = (link.user_id === -1)) ) {
            item_message = 'This link is from an unknow user.<br>'
                + 'You can accept it in a new tab <a href="'
                + link.url + '" target="_black">click here</a>';
            finish();
            return;
        }
        if (nSendType !== SEND_FBR && nSendType !== SEND_ZMC || link.fromStream) { 
            nSendType = -1; 
        }
        // accept gift
        httpAjaxRequest({'url':link.url, 'liteLoad':1, 'success':parseAcceptResponse});
        
        /**
         * Parse accept gift response.
         * @param {String} htmlText
         */
        function parseAcceptResponse(json) {
            if ( link.fromStream ) {
                try {
                    item_message = e$('table.messages td.message_body:first',h$(json)).text();
                    bSuccess = true;
                }
                catch(err) {
                    item_message = Util.setColor('There was an error with this request.', 'red');
                }
                finish();
                return;
            }
            //log$(Util.toJSON(json));
            try {
                if ( (bSuccess = Util.isBoolean(json.is_success) ? json.is_success : (parseInt(json.is_success) === 1)) ) {
                    if(parseInt(json.event_type) == 3018 && json.popup) {
                        bCrimeSpree = true;
                        parseCrimeSpree(json.popup);
                        return;
                    }
                    
                    item_image = json.item_image_path;
                    item_message = json.success_message;
                    
                    if (/You have accepted the Crime Spree/i.test(item_message)) {
                        bSuccess = false;
                    }
                    if (nSendType !== -1 && link.canSendBack===true) 
                    {
                        if (nSendType === SEND_FBR) {
				            MW.sendRequest(link.sendBackUrl(SEND_FBR),parseFacebookSendBackResponse);
                        }
			            else {
			                httpXDRequest({
			                    method: 'GET',
			                    header: {'Content-Type': 'text/html'},
			                    url: link.sendBackUrl(SEND_ZMC),
			                    onload: parseZMCSendBackResponse
			                });
			            } 
                        return;
                    }
                }
                else {
                    item_message = json.fail_message
                    ? Util.setColor(json.fail_message, 'red')
                    : Util.setColor('There was an error with this request.', 'red');
                }
            }
            catch(e) {
                logErr$(e);
                item_message = Util.setColor('There was an error with this request.', 'red');
                // unsafeWindow.open('data:text/html;base64,'+global.Base64.encode(htmlText));
            }
            finish();
        }
        /**
         * Parse Crime Spree response popup
         * @param {String} htmlText
         */
        function parseCrimeSpree(htmlText) {
            var url, sel, jQry = h$(htmlText);
            
            switch(parseInt(options.get('csReward'))) {
                case 0 : url = jQry.find('#xp_gain_url').val(); break;
                case 1 : url = jQry.find('#nrg_gain_url').val(); break;
                case 2 : url = jQry.find('#sta_gain_url').val(); break;
                default: url = jQry.find('#normal_url').val(); break;
            }
            switch(parseInt(options.get('csSelect'))) {
                case 1 : sel = jQry.find('#gag_item_id').val(); break;
                default: sel = jQry.find('#value_item_id').val(); break;
            }
            httpAjaxRequest({
                url: url+'&gift_id='+sel, 
                success: function(jsonData) 
                {
	                var elm = h$(jsonData.popup);
	                item_image = elm.find('.mid_row .left_box .box_image:first img').attr('src');
	                item_message = elm.find('#safehouse_request_msg strong').text();
	                bSuccess = true;
	                finish();
                }
            });
        }
        /**
         * Parse Facebook send back gift response.
         * @param {Boolean} success
         * @param {String} message
         */
        function parseFacebookSendBackResponse(success, message) {
            if (success !== true && link.fbId) {
                item_message += '<br>'+Util.setColor('Facebook Request fail:','yellow');
                item_message += '<br>'+Util.setColor('<b>'+message+'<b>','red');
                item_message += '<br>'+Util.setColor('Using ZMC to send:','yellow');
                httpXDRequest({
                    method: 'GET',
                    header: {'Content-Type': 'text/html'},
                    url: link.sendBackUrl(SEND_ZMC),
                    onload: parseZMCSendBackResponse
                });
            }
            else {
                item_message += '<br>'+Util.setColor('<b>'+message+'<b>',success?'green':'red');
                finish();
            }
        }
        /**
         * Parse Zynga Message Center send back gift response.
         * @param {Object} responseDetails
         */
        function parseZMCSendBackResponse(responseDetails) {
            try {
                var resJSON = $.parseJSON(responseDetails.responseText);
                item_message += '<br>';
                
                if (resJSON.is_success == false)
                {
                    item_message += Util.setColor('<b>'+resJSON.fail_message+'<b>','red');
                }               
                else if (resJSON.total_requests_sent > 0)
                {                   
                    if (resJSON.show_request_preview) {
                        // TODO
                        // if a preview need, add code to parse and show the popup.
                        // parsePopup(resJSON.request_preview);
                    }
                    item_message += Util.setColor('<b>'+resJSON.success_message+'<b>','green');
                }
                else
                {
                    item_message += Util.setColor('<b>'+resJSON.success_message+'<b>','yellow');
                }
            }
            catch(err) {
                logErr$(err);
            }
            finish();
        }
        /**
         * Finish all process and send result to callback function.
         */
        function finish() {
            callback({
                'success'    : bSuccess,
                'image'      : item_image,
                'message'    : item_message,
                'excluded'   : bExcluded,
                'crimespree' : bCrimeSpree
            });
        }
    }
    /**
     * Parse all user status to get valid links.
     * @param {Array} data
     * @return {Number}
     */
    function parseStatus(data) {
        var outText = '';
        
        $.each(data, function(index, status) {
            if (searchLinksRegex.test(status.message)) {
               outText += status.message;
            }
        });
        
        return parseTextLinks(outText);
    }
    /**
     * Parse all user streams to get valid links.
     * @param {Array} data
     * @return {Number}
     */
    function parseStreams(data) {
        var outText = '';
        var commentText = '';
        var filter = new CSFilter();
        var mafiaUrl = /next_action=accept_gift/;
        var count = 0;
        
        $.each(data, function(index, post) {            
            var prop = (post.attachment) ? post.attachment.properties : null;

            if (/http:\/\//.test(post.message)) {
                outText += $.trim(post.message)+'\n';
            }
            
            if (post.comments && post.comments.comment_list) {
                $.each(post.comments.comment_list, function(index, comment) {
                    commentText += $.trim(comment.text)+'\n';
                });
            }
            
            if (Util.isArray(prop) && prop.length > 0) {
                $.each(prop, function(idx,link) {
                    if ( filter.test(link.text) && mafiaUrl.test(link.href)  ) {
                        Collector.add(link.text).add(link.href);
                        count++;
                    }
                });
            }
        });
        log$('parseStreams.properties.count: '+count);
        return parseTextLinks(outText) + parseTextLinks(commentText);
    }
    /**
     * Show/Hide status messages.
     * @param {Boolean} bShow
     */
    function showsScanStatus(bShow, stop_callback) {
        if ( bShow ) {
            $('#mass_start_config_tab_0_layout .howto').hide();
            $('#mass_start_config_tab_0_layout #scan_status').show();
        } else {
            $('#mass_start_config_tab_0_layout .howto').show();
            $('#mass_start_config_tab_0_layout #scan_status').hide();
        }
        var elt = $('#mass_start_config_tab_0_layout #scan_status');
        elt.find('a').remove();
        
        if (stop_callback) {
	        c$('center').css('margin-top',15).appendTo(elt)
	        .append(b$('Stop Scan','class:medium red').click(stop_callback));
        }
    }
    /**
     * Scan the specified group.
     * @param {Number} group_id
     * @param {Function} callback
     */
    function scanGroup(group_id, callback) {
        var statusElt = $('#mass_start_config_tab_0_layout #scan_status #scan_message');
        var total_posts = 0, total_links = 0;
        var limit_time = options.get('scanTime');
        
        limit_time = parseInt((new Date()).getTime()/1000) - (limit_time*60*60);
        showsScanStatus(true, function() {
            $(this).unbind();
            $(this).remove();
            limit_time = parseInt((new Date()).getTime()/1000);
            return false;
        });
        var finish = function() {
            showsScanStatus(false);
            showLinks();
            callback && callback();
        }
        
        function query(time) {
            if ( cancel_process === true ) {
                return;
            }
            if (!Util.isSet(time) || time < limit_time) {
                finish();
                return;
            }
            statusElt.html('<div>Posts Found: '+Util.setColor(total_posts,'green')+'</div>'
                         + '<div>Links Found: '+Util.setColor(total_links,'green')+'</div>');
	        facebook.streamGet(function(data) {
                if (!data || !data.posts || data.posts.length < 1) {
                    finish();
                    return;
                }
                total_posts += data.posts.length;
	            total_links += parseStreams(data.posts);
                query( data.posts[data.posts.length-1].created_time );
	        }, {
	            'limit'      : 50, 
	            'end_time'   : time,
	            'source_ids' : group_id
	        });
        }
        
        query( parseInt((new Date()).getTime()/1000) );
    }
    /**
     * Scan user's wall.
     * @param {Function} callback
     */
    function scanWall(callback) {
        var statusElt = $('#mass_start_config_tab_0_layout #scan_status #scan_message');
        var total_posts = 0, total_links = 0;
        var limit_time = options.get('scanTime');
        
        limit_time = parseInt((new Date()).getTime()/100) - (limit_time*60*60);
        showsScanStatus(true, function() {
            $(this).unbind();
            $(this).remove();
            limit_time = parseInt((new Date()).getTime()/1000);
            return false;
        });
        var finish = function() {
            showsScanStatus(false);
            showLinks();
            callback && callback();
        }
        function query(time) {
            if ( cancel_process === true ) {
                return;
            }
            if (!Util.isSet(time) || time < limit_time) {
                finish();
                return;
            }
            statusElt.html('<div>Posts Found: '+Util.setColor(total_posts,'green')+'</div>'
                         + '<div>Links Found: '+Util.setColor(total_links,'green')+'</div>');
            facebook.queryHomeLinks(time, function(data) {
                if (!data.status || ! data.streams) {
	                finish();
	                return;
                }
                total_posts += (data.status.length + data.streams.length);
                total_links += parseStatus(data.status);
                total_links += parseStreams(data.streams);
                query( data.streams[data.streams.length-1].created_time );
            });
        }
        
        query( parseInt((new Date()).getTime()/1000) );
    }
    /**
     * @param {String} text
     */     
    function parseTextLinks(text) {
        if ( !Util.isString(text) ) {
            return 0;
        }
        var gifts = Collector;
        var filter = new CSFilter();
        var rgx, count = 0;
        
        
        while ( (rgx=searchLinksRegex.exec(text)) ) {
            var link, name = $.trim(rgx[1]);
            
            if ( filter.test(name) ) {
                if ( !gifts.exists(name) ) {
                    gifts.add(name).add($.trim(rgx[2]));
                }
                else {
                    gifts.get(name).add($.trim(rgx[2]));
                }
            }
            
            count++;
        }
        log$('parseTextLinks count: '+ count);
        
        return count;
    }
    
    function showLinks() {
        var sHtml = '';
        var gifts = Collector;
        var total_links = 0;
        
        gifts.sort();
        
        sHtml += '<li>Total gifts: '+Util.setColor('0', 'green', 'total_gifts');
        sHtml += ' -- Total links: '+Util.setColor('0', 'green', 'total_links');
        sHtml += '</li>';
        
        gifts.each(function(id, gift) {
            var name = String(gift.name).length > 28
            ? String(gift.name).substring(0, 28)
            : String(gift.name);
            
            sHtml += '<li gift="'+id+'">';
            sHtml += '<div style="width:200px;cursor:pointer;" onclick="';
            sHtml += '$(this).parent().find(\'input\').select();">'+name+':</div>';
            sHtml += '<div><input type="text" class="black_box" value="0" onclick="';
            sHtml += '$(this).select();"> / '+gift.length()+'</div>';
            sHtml += '<a href="#select_all" onclick="';
            sHtml += '$(this).parent().find(\'input\').val('+gift.length()+');return false;">';
            sHtml += 'ALL</a></li>';
            
            total_links += gift.length();
        });
        
        var list = $('#masslinkslist', popupElt.content).html(sHtml);
        list.find('#total_gifts').text( gifts.length() );
        list.find('#total_links').text( total_links );
    }
    
    /**
     * @param {Array} links
     */
    function StartCollector(gifts) {
        var noMafiaUsers = new Object();
        var nSendBack    = options.get('massSendBack') ? SEND_FBR : -1;
        var acceptedFrom = new Object();
        var mwRegex      = /facebook.mafiawars.com|apps.facebook.com/;
        var limitRegex   = new RegExp(options.get('excludedPattern'), 'i');
        var nSuccess     = 0;
        var bCancelled   = false;
	    /** @type {Collection} */ 
	    var c_links;
	    /** @type {Collection} */ 
	    var p_links;
        
        function checkUsers(users, data) {
            MyMafiaMembers.add(data);
            $.each(users, function(index, id) {
                if ( !MyMafiaMembers.exists(id) && !Util.isSet(noMafiaUsers[id]) ) {
                    noMafiaUsers[id] = true;
                    if (!options.get('collectNoMafia')) {
	                    addMessageLog('All links from this user will be skipped because he\'s not in your mafia.', 'error', {
	                        'profile': MW.getProfileLink(id),
	                        'first_name': id
	                    });
                    }
                }
            });
        }
        
        var c_gift = new Collection(gifts);
        
        c_gift.onEnd(finish);
        
        c_gift.onMove(function(p1, k1, gift) {
            if (bCancelled||cancel_process) { return; }
            
            var link_count = 0;
            var users = new Array();
            var links = new Array();
            
            p_links = new Collection();
            p_links.setArray(gift.links.splice(0,gift.amount));
            
            setGiftName('Working on '+Util.setColor(gift.name, 'green'));
            gift.total = gift.amount;
            
            p_links.onMove(function(p2, k2, link) {
                sendMessage( 'link #' + (++link_count) );
	            if (mwRegex.test(link)) {
	                parseLink(link);
	            }
	            else {
	                getUnshortUrl(link, parseLink, p_links.MoveNext);
	            }
	            function parseLink(longUrl) 
                {
                    if (/login.php/.test(longUrl)) {
                        longUrl = unescape( Util.uSplit(longUrl).next );
                    }
                    if (mwRegex.test(longUrl)) {
                        var link = new CSLink(longUrl);
                        links.push(link);
                        
                        if (link.user_id !== -1 && !noMafiaUsers[link.user_id]) {
                            if ( !MyMafiaMembers.exists(link.user_id) && users.indexOf(link.user_id) === -1 ) 
                            {
                                users.push(link.user_id);
                            }
                        }
                    }
                    
                    if (users.length === 5) {
			            MW.getMyMafia(users, function(data) {
                            checkUsers(users, data);
                            users = new Array();
			                p_links.MoveNext();
			            });
                    }
                    else {
                        p_links.MoveNext();
                    }
	            }
            });
            
            p_links.onEnd(function() {
                if (bCancelled||cancel_process) { return; }
	            if (users.length > 0) {
	                MW.getMyMafia(users, function(data) {
                        checkUsers(users, data);
	                    collectLinks(gift, links, after_collect);  
	                });
	            }
	            else {
	                collectLinks(gift, links, after_collect);  
	            }
                function after_collect() {
	                users = new Array();
	                links = new Array();
                    if (gift.amount < 1 || gift.links.length < 1) {
                        c_gift.MoveNext();
                    }
                    else {
                        setGiftName('Working on '+Util.setColor(gift.name, 'green'));
                        p_links.setArray(gift.links.splice(0,gift.amount));
                        p_links.MoveFirst();
                    }
                }
	        });
            
            p_links.MoveFirst();
            
        });
        
        function collectLinks(gift, links, callback) {
            if (bCancelled||cancel_process) { return; }
            
            setGiftName('Collecting '+Util.setColor(gift.name, 'green')+' links');
            sendMessage('...');
            
            c_links = new Collection(links);
            
            c_links.onEnd(callback);
            
            c_links.onMove(function(index, key, link) {
                var user;
                if (bCancelled||cancel_process) { return; }
                if (gift.amount < 1) { callback(); return; }
	            try {
	                if (link === null || link.user_id === -1 || !Util.isSet(link.user_id)) {
	                    c_links.MoveNext();
	                    return;
	                }
                    if (noMafiaUsers[link.user_id] && !options.get('collectNoMafia')) {
                        c_links.MoveNext();
                        return;
                    }
                    if ( !(user = MyMafiaMembers.get(link.user_id)) ) {
                        user = {
	                        'profile': MW.getProfileLink(link.user_id),
	                        'first_name': link.user_id
	                    }
                    }
	                if(options.get('ignoreLimits') !== true && excluded.is(link.gift_id)) {
	                    addMessageLog('Skipped. You\'ve reached the limits for '+gift.name+'.');
	                    callback();
	                    return;
	                }
	                if (acceptedFrom[link.user_id] === true) {
                        c_links.MoveNext();
	                    return;
	                }
	                sendMessage('from '+(user ? user.first_name : link.user_id));
	                
	                collectGift(link, nSendBack, function(data) {
	                    if (data.success) {
	                        nSuccess++;
	                        if (!/has expired/.test(data.message)) {
	                            gift.amount--;
	                        }
	                        addCollectLog(gift, user, data);
	                    }
	                    else {
	                        addMessageLog(data.message, 'error', user);
	                    }
	                    if (options.get('skipSameUser') && link.onlyOnePerDay === true) { 
	                        acceptedFrom[link.user_id] = true;
	                    }
	                    if (limitRegex.test(data.message) && !excluded.is(link.gift_id)) {
	                        excluded.add(link.gift_id);
	                        addMessageLog('Limit reached. "'+gift.name+'" added to exclude list.');
	                    }
	                    c_links.MoveNext();
	                });
	            }
	            catch(err) {
	                logErr$(err);
	                c_links.MoveNext();
	            }
	        });
            
            c_links.MoveFirst();
            
        }
        /**
         * @param {String} title
         * @param {MafiaMember} from
         * @param {Object} data
         */
        function addCollectLog(gift, from, data) {
            var gift_image = data.image || global.zGraphicsURL+'v3/icon_gift_27x28_01.png';
            var title = gift.name+' ('+(gift.total-gift.amount)+'/'+gift.total+'):';
            
            title += ' from <a href="'+from.profile+'" target="_black">'+from.first_name+'</a>';
            
            c$('li').prependTo('#collecting_log')
            .append(c$('h4').html(title))
            .append(c$('img').attr('src', from.profile_pic))
            .append(c$('img').attr('src', gift_image))
            .append(c$('p').html(data.message));
        }
        /**
         * @param {String} message
         * @param {String} icon
         * @param {MafiaMember} from
         */
        function addMessageLog(message, icon, from) {
            var userProfile = '';
            var sImgSrc = (icon==='error')?global.resource.ajax_error:global.resource.info_icon;
            if (icon !== 'error') {
                message = Util.setColor(message, '#999930');
            }
            if (Util.isSet(from)) {
                userProfile += '<a href="'+from.profile+'" target="_black">'+from.first_name+'</a>: ';
            }
            c$('li').prependTo('#messages_log')
            .append(c$('img').attr('src', sImgSrc))
            .append(c$('p').html(userProfile + message));
        }

        
        function setGiftName(giftname) {
            $('#gift_name_text', popupElt.content).html(giftname);
        }
        
        function sendMessage(message) {
            $('#message_text', popupElt.content).html(message);
        }
        
        function finish() {
            bCancelled = true;
            c_gift.clear();
            c_links.clear();
            p_links.clear();
            setGiftName('Finished.');
            sendMessage(nSuccess+' links collected.');
            addMessageLog('Process finished at '+(new Date()).toUTCString(), 'info');
            $('#massive_controls a').remove();
            b$('Return','class:short green').css('float','right').appendTo('#massive_controls')
            .click(function() {
                $(this).unbind();
                showDiv('start', 'mass');
            });
            // clear collector class
            Collector.clear();
            // restore initial collector screen
            restoreCollectorScreen();
        }
        
        // start
        $('#collecting_log', popupElt.content).empty();
        $('#messages_log', popupElt.content).empty();
        $('#massive_controls a').remove();
        $('#gift_name_text, #message_text', popupElt.content).empty();
        b$('STOP','class:short red').css('float','right').appendTo('#massive_controls')
        .click(function() { $(this).remove(); finish(); return false; });
        addMessageLog('Process started at '+(new Date()).toUTCString(), 'info');
        c_gift.MoveFirst();
    }
    
    function getUserRequests(callback) {        
        httpXDRequest({
            method: 'GET',
            url: 'http://www.facebook.com/reqs.php',
            onload: function(responseDetails) {
                try {
                    var jQry = h$(responseDetails.responseText)
                                  .find('#confirm_10979261223 ul.requests > li');
                    
                    log$( 'getUserRequests: '+jQry.length );
                    
                    delete Requests;
                    Requests = new Array();
                    
                    jQry.each(function(index, elem) { Requests.push(new CSRequest(elem)); });
                    
                    callback && callback(true); 
                }
                catch(err) {
                    logErr$(err);
                }
            },
            onerror: function(responseDetails) {
                callback && callback(false);
            }
        });
    }
    
    function showDiv(name, type, ms, fn) {
        $('div[id*=_'+type+']', popupElt.content).hide();
        var elem = $('#' + name + '_' + type, popupElt.content);
        if (ms) {
            elem.fadeIn(ms, fn);
        }
        else {
            elem.show();
        }
    }
    
    function genMainDom() {
        
        // fix content height
        popupElt.content.height(680);
        
        // add tab bar
        var tabBar = c$('ul', 'class:tab_bar').appendTo(popupElt.content);
        
        c$('li','tb:reqs,class:request active').appendTo(tabBar).click(Events.tab_click)
        .append(c$('a','href:#').html('<span><em>Facebook Requests</em></span>'));
        c$('li','tb:mass,class:collector').appendTo(tabBar).click(Events.tab_click)
        .append(c$('a','href:#').html('<span><em>Massive Collector</em></span>'));
        c$('li','tb:cnfg').appendTo(tabBar).click(Events.tab_click)
        .append(c$('a','href:#').html('<span><em>Configuration</em></span>'));
        
        // loader
        c$('div', 'ajaxloader_body').css('padding-top',40).height(600)
        .append(c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif'))
        .appendTo(popupElt.content);
        
        // ADD BODY ELEMENTS
        var reqsBody = c$('div', 'reqs_body').height(640).appendTo(popupElt.content);
        var massBody = c$('div', 'mass_body').height(640).appendTo(popupElt.content);
        var cnfgBody = c$('div', 'cnfg_body').height(640).appendTo(popupElt.content);
        
        
        // REQUEST
        var reqsPanel = c$('div', 'class:frame_box').appendTo(reqsBody);
        // add configurations
        c$('div').css('float','left')
        .append(c$('label', 'for:filter_text').text('Search: '))
        .append(c$('input:text', 'id:filter_text, class:black_box').width(250))
        .append(c$('a', 'href:#').text(' Go').click(Events.filter_click))
        .append(' | ')
        .append(c$('a', 'href:#').text('Clear').click(Events.clear_filter_click))
        .appendTo(reqsPanel);
        
        c$('div').css('float','right')
        .append(b$('Clear all', 'class:short white').click(Events.clear_all))
        .append(b$('Refresh','class:short orange').css('margin-left',5).click(Events.refresh_click))
        .appendTo(reqsPanel);
        
        c$('ul', 'id:reqslist,class:req_box').height(560).appendTo(reqsBody);
        
        // COLLECTOR
        var massElt = c$('div').height(520);
        var massCtrl = c$('div').appendTo(massElt).css(
            {'float':'left','width':'49%','height':600,'text-align':'center'}
        );
        var tabs = new domTabObject(massCtrl,'mass_start_config',['Scan','Paste'], 380, 357);
        
        c$('div','start_mass').css('margin',5).height(600).append(massElt).appendTo(massBody);
                
        c$('div').css({'text-align':'left','padding':5}).appendTo(tabs.getLayout(0))
        .append(c$('p').text('Select group to scan:').css('color','#F4C506'))
        .append(c$('select','id:select_fbgroups,class:black_box').width('100%').change(Events.select_group_change))
        .append(c$('div').css('clear','both'))
        .append(b$('Refresh','class:short white').css('float','right').click(Events.refresh_groups_click))
        .append(c$('div').css('clear','both'))
        .append(c$('label','for:freegifts_scantime').text('Scan about: '))
        .append(c$('input:text','id:freegifts_scantime,class:black_box').width(40).val(1))
        .append(c$('span').css('margin-left',5).text('hour/s old posts.'))
        .append(c$('div', 'class:howto,id:scan_status').hide().append(c$('div').css('margin-left',15)
	        .html('<img style="vertical-align: middle;" src="' + global.resource.ajax_loader + '">')
	        .append(c$('span').css('margin-left',5).text('Scanning..., it may take a while.'))
	        .append(c$('div', 'id:scan_message').css('margin-top',10))
        ))
        .append(c$('div', 'class:howto')
            .append(c$('img').attr('src', global.resource.info_icon))
            .append(c$('div', 'class:howto_title').text(' HOWTO:'))
            .append(c$('div').text('- Set how hours old you can scan for posts.'))
            .append(c$('div').text('- Select group/wall and click "Add" to scan it.'))
            .append(c$('div').text('- Set quantity for the gifts to collect.'))
            .append(c$('div').text('- Click "Start" to begin.'))
        );
        
        c$('div').css({'text-align':'left','padding':5}).appendTo(tabs.getLayout(1))
        .append(c$('textarea', 'id:massive_input,class:black_box').css({'width':'98%','height':200}))
        .append(c$('div', 'class:howto')
            .append(c$('img').attr('src', global.resource.info_icon))
            .append(c$('div', 'class:howto_title').text(' HOWTO:'))
            .append(c$('div').text('- Paste all links you found here.'))
            .append(c$('div').text('- click "Add" to parse all links you pasted.'))
            .append(c$('div').text('- Set quantity for the gifts to collect.'))
            .append(c$('div').text('- Click "Start" to begin.'))
        );
        
        // filter box
        c$('div').css({'clear':'both','text-align':'left'}).appendTo(massCtrl)
        .append(c$('input:checkbox', 'id:freegifts_usefilter'))
        .append(c$('label', 'for:freegifts_usefilter').text('Filter gifts:'))
        .append(c$('textarea', 'id:freegifts_filter,class:black_box').css({'width':'100%','height':140}));
                
        c$('div').width('49%').css({'float':'left','margin-left':10}).append(
            c$('div').css({'height':40,'text-align':'left'})
            .append(b$('Add','class:medium white').click(Events.add_links_click))
            .append(b$('Clear all', 'class:medium white').css('margin-left',5).click(Events.clear_collector_click))
            .append(b$('Start','class:medium green').css('float','right').click(Events.start_collecting_click))
        )
        .append(c$('ul', 'id:masslinkslist,class:mass_gift_list').height(545))
        .appendTo(massElt);
        
        c$('div','log_mass').appendTo(massBody)
        .append(c$('div','class:frame_box,id:massive_controls')
	        .append(c$('span', 'id:gift_name_text'))
	        .append(c$('span', 'id:message_text').css('margin-left', 5))
        )
        .append(c$('ul','messages_log').height(250))
        .append(c$('ul','collecting_log').height(300));
        
        // CONFIGURATION
        c$('div', 'class:frame_box')
        .append(c$('span').text('Remove request from facebook page when: '))
        .append(c$('input:checkbox', 'id:freegifts_remonsuccess').css('margin-left',5))
        .append(c$('label', 'for:freegifts_remonsuccess').text('Collected.'))
        .append(c$('input:checkbox', 'id:freegifts_remonignore').css('margin-left',5))
        .append(c$('label', 'for:freegifts_remonignore').text('Ignored.'))
        .append('<br /><br />')
        .append(c$('input:checkbox', 'id:freegifts_sendthanksrequest').css('margin-left',5))
        .append(c$('label','for:freegifts_sendthanksrequest').text('Send back gift request through:'))
        .append(c$('select', 'id:freegifts_sendbacktype,class:black_box').css('margin-left',5))
        .append('<br />')
        .append(c$('input:checkbox', 'id:freegifts_usebackgiftfilter'))
        .append(c$('label','for:freegifts_usebackgiftfilter').text('Enable send back filter:'))
        .append(c$('input:text','id:freegifts_thanksbackfilter,class:black_box').width('100%'))
        .append(c$('p').text('Only if request text match, back gift will be send, otherwise not.').css('color','#F4C506'))
        .appendTo(cnfgBody);
        
        c$('div', 'class:frame_box')
        .append(c$('h4').css('margin',0).text('Collector Settings:'))
        .append(c$('input:checkbox', 'id:freegifts_ignorelimits').css('margin-left',10))
        .append(c$('label','for:freegifts_ignorelimits').text('Continue collecting after limits is reached.'))
        .append('<br />')
        .append(c$('input:checkbox', 'id:freegifts_skipsameuser').css('margin-left',10))
        .append(c$('label','for:freegifts_skipsameuser').text('Skip users which already collected from (default: checked. More fast, less errors).'))
        .append('<br />')
        .append(c$('input:checkbox', 'id:freegifts_masssendback').css('margin-left',10))
        .append(c$('label','for:freegifts_masssendback').text('Send back Facebook requests when accepting in collector.'))
        .append('<br />')
        .append(c$('input:checkbox', 'id:freegifts_collectnomafia').css('margin-left',10))
        .append(c$('label','for:freegifts_collectnomafia').text('Collect gifts from no-mafia members.'))
        .appendTo(cnfgBody);
        
        c$('div', 'class:frame_box')
        .append(c$('h4').css('margin',0).text('Crime Spree Settings:'))
        .append(c$('label','for:freegifts_csselect').text('Step 1:').css('color','#F4C506'))
        .append(c$('select', 'id:freegifts_csselect,class:black_box'))
        .append(c$('label','for:freegifts_csreward').text('Step 2:').css('color','#F4C506'))
        .append(c$('select', 'id:freegifts_csreward,class:black_box'))
        .appendTo(cnfgBody).find('label,select').css('margin-left',5);
        
        
        c$('div', 'class:frame_box')
        .append(c$('h4').css('margin',0).text('Excluded Gifts:'))
        .append(c$('input:checkbox', 'id:freegifts_useexcludedgifts'))
        .append(c$('label','for:freegifts_useexcludedgifts').text('Use excluded list.'))
        .append(c$('p').text('Gifts with the following text after collect it, will be excluded:  ').css('margin',0)
            .append(c$('a','href:#').text('(Reset list)').click(Events.reset_click)))
        .append(c$('input:text','id:freegifts_excludedpattern,class:black_box').width('100%'))
        .append(c$('p').css('color','#F4C506').text('You can add multiples strings to check for. '+
                             'Just add "|" (without quotes) to separate every one.'))
        .appendTo(cnfgBody);
        
        // default collector init screen
        restoreCollectorScreen();
        
        tabs.showTab(0);
        
        popupElt.applyOptions({
            'freegifts_csselect': {0:'Help!', 1:'Sabotage!'},
            'freegifts_csreward': {0:'+100 Experience', 1:'+50 Energy', 2:'+50 Stamina'},
            'freegifts_sendbacktype': {0:'Facebook Request (Limited)', 1:'Zynga Message Center (Unlimited)'}
        });
    }
    
    function restoreCollectorScreen() {
        $('#masslinkslist', popupElt.content).empty();
        $('#massive_input', popupElt.content).val('');
    }
    
    function addFinishButtons(cQry, id, callback) {
        cQry.empty().hide();
        b$('Clear','id:clearbtn,class:medium white,req:'+id).appendTo(cQry)
        .click(Events.clear_request_click);
        if (callback) {
            cQry.append(c$('a','href:#,class:ignore').text('continue').click(callback));
            excluded.reset();
        }
        cQry.fadeIn(500);
    }
    
    function genFBRequestDom() {
        var liElt, ulElt = $('#reqslist', popupElt.content).empty();
        
        $.each(Requests, function(index, req) {
            var name  = '<a href="'+req.profile+'" target="_black">'+req.name+'</a>';
            var eImg  = c$('span', 'class:player_pic');
            if (req.icon) {
                eImg.css('background', "url('"+req.icon+"') 50% 50% no-repeat");
            }
            c$('li', 'class:gift,id:req_'+index).appendTo(ulElt).append(
                c$('div').addClass('li_wrapper clearfix')
                .append(eImg.append(c$('span'))).append(
                    c$('div','class:buttons')
                    .append(b$('Accept', 'class:medium white,req:'+index).click(Events.accept_click))
                    .append(c$('a', 'href:#,class:ignore,req:'+index).text('ignore').click(Events.ignore_request_click))
                )
                .append(c$('div','class:body').append('<h4>'+name+'</h4><p>'+req.body+'</p>'))
            );
        });
        
        if ($('li', ulElt).length < 1) {
            c$('li').appendTo(ulElt)
            .append(c$('center').css('padding-top',40).text('You don\'t have request.'));
        }
    }
    
    function Initialize(success) {
        var overlay = loadingOverlay('Loading requests...');
        getUserRequests(function(success) {
            overlay.hide();
            
            if (success === false) {
                popupElt.destroy();
                return;
            }
            MyMafiaMembers = new MafiaMemberCollection();
            
            genMainDom();
            genFBRequestDom();
            
            options.toDomElements();
            
            showDiv('reqs', 'body');
            showDiv('control', 'panel');
            showDiv('start', 'mass');
            
            Groups.addToSelect('#select_fbgroups',options.get('defaultGroup'));
            // show popup
            popupElt.show();
        });
    }

    popupElt.addBase64Style(
        'I2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAuYmxhY2tfYm94IHsNCglmb250LXdlaWdodDogYm9sZDsgDQoJY29sb3I6IHJnYigyMDgs'+
        'IDIwOCwgMjA4KTsgDQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAxNTMpOyANCgliYWNrZ3JvdW5kLWNvbG9yOiBi'+
        'bGFjazsgDQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBzcGFuLnBsYXllcl9waWMgew0KCWZs'+
        'b2F0OiBsZWZ0Ow0KCWRpc3BsYXk6IGJsb2NrOw0KCXdpZHRoOiA1NHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBzcGFu'+
        'LnBsYXllcl9waWMgc3BhbiB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dy'+
        'YXBoaWNzL3YzL3VzZXJwaWNfb3V0bGluZV81NHg1NF8wMS5wbmciKSA1MCUgNTAlIG5vLXJlcGVhdDsNCglkaXNwbGF5OiBibG9j'+
        'azsNCgloZWlnaHQ6IDU0cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIC5mcmFtZV9ib3ggew0KCWNsZWFyOiBib3RoOw0K'+
        'CWJvcmRlcjogMXB4IHNvbGlkICMzMzM7DQoJbWFyZ2luOiA1cHg7DQoJcGFkZGluZzogMTBweCA4cHg7DQoJbWluLWhlaWdodDog'+
        'MjdweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCB7DQoJbGlzdC1zdHlsZS10eXBl'+
        'OiBub25lOw0KCW92ZXJmbG93OiBhdXRvOw0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVs'+
        'LnRhYl9iYXIgew0KCWJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy96'+
        'bWMvdGFic19iZ18xeDQ1XzAxLmdpZiIpIDAgMTAwJSByZXBlYXQteDsNCgloZWlnaHQ6IDQ4cHg7DQoJb3ZlcmZsb3c6IHZpc2li'+
        'bGU7DQoJcGFkZGluZy1sZWZ0OiA2cHg7DQoJdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsNCgl0ZXh0LWFsaWduOiBjZW50ZXI7'+
        'DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnRhYl9iYXIgbGkgew0KCWJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIu'+
        'c3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy96bWMvdGFiX2RpdmlkZXJfMngyN18wMS5naWYiKSAwIDExcHggbm8tcmVw'+
        'ZWF0Ow0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbi1sZWZ0OiA1cHg7DQoJcGFkZGluZy1sZWZ0OiA2cHg7DQoJd2lkdGg6IDE1MHB4'+
        'Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC50YWJfYmFyIGxpOmZpcnN0LWNoaWxkIHsNCgliYWNrZ3JvdW5kOiBub25l'+
        'Ow0KCW1hcmdpbi1sZWZ0OiAwOw0KCXBhZGRpbmctbGVmdDogMDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwudGFiX2Jh'+
        'ciBsaSBhIHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3Mvem1j'+
        'L3RhYl9pbmFjdGl2ZV8xNTB4OTBfMDEucG5nIikgMCAwIG5vLXJlcGVhdDsNCgljb2xvcjogd2hpdGU7DQoJZGlzcGxheTogYmxv'+
        'Y2s7DQoJaGVpZ2h0OiA0NXB4Ow0KCXBhZGRpbmctbGVmdDogM3B4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC50YWJf'+
        'YmFyIGxpLmFjdGl2ZSBhIHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3Jh'+
        'cGhpY3Mvem1jL3RhYl9hY3RpdmVfMTUweDEyMF8wMS5wbmciKSAtNHB4IDFweCBuby1yZXBlYXQ7DQp9DQojZnJlZWdpZnRzY2Vu'+
        'dGVyX3BvcHVwIHVsLnRhYl9iYXIgbGkgYSBzcGFuIHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56Z25j'+
        'ZG4uY29tL213ZmIvZ3JhcGhpY3Mvem1jL3RhYl9pbmFjdGl2ZV8xNTB4OTBfMDEucG5nIikgMTAwJSAxMDAlIG5vLXJlcGVhdDsN'+
        'CglkaXNwbGF5OiBibG9jazsNCgloZWlnaHQ6IDQ1cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnRhYl9iYXIgbGku'+
        'YWN0aXZlIGEgc3BhbiB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBo'+
        'aWNzL3ptYy90YWJfYWN0aXZlXzE1MHgxMjBfMDEucG5nIikgMTAwJSAtNzVweCBuby1yZXBlYXQ7DQp9DQojZnJlZWdpZnRzY2Vu'+
        'dGVyX3BvcHVwIHVsLnRhYl9iYXIgbGkgZW0gew0KCWRpc3BsYXk6IGJsb2NrOw0KCWZvbnQtc2l6ZTogMTBweDsNCglmb250LXN0'+
        'eWxlOiBub3JtYWw7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbGluZS1oZWlnaHQ6IDEycHg7DQoJcGFkZGluZy10b3A6IDE2cHg7'+
        'DQoJaGVpZ2h0OiAyMHB4Ow0KCXBhZGRpbmctbGVmdDogMzVweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2ZyZWVnaWZ0c2Nl'+
        'bnRlcl9wb3B1cCB1bC50YWJfYmFyIGxpLmNvbGxlY3RvciBlbSB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0'+
        'aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3YzL2ljb25fc2hlZXRfMjV4MjRfMDEucG5nIikgMnB4IDEwcHggbm8tcmVwZWF0'+
        'Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC50YWJfYmFyIGxpLnJlcXVlc3QgZW0gew0KYmFja2dyb3VuZDogdXJsKCJo'+
        'dHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3YzL2ljb25fZ2lmdF8yN3gyOF8wMS5wbmciKSAycHgg'+
        'NXB4IG5vLXJlcGVhdDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwudGFiX2JhciBsaS5hdXRvbWF0aWMgZW0gew0KYmFj'+
        'a2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL21hcF9iYXNlZF9qb2JzL2V4'+
        'cGVydF92aWV3L2ljb25fbWVnYXBob25lLnBuZyIpIDJweCAxMHB4IG5vLXJlcGVhdDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9w'+
        'dXAgdWwjY29sbGVjdGluZ19sb2csICNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwjbWVzc2FnZXNfbG9nICB7DQoJYm9yZGVyOiAy'+
        'cHggc29saWQgIzMzMzsNCgltYXJnaW46IDVweDsNCglwYWRkaW5nOiA1cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVs'+
        'I2NvbGxlY3RpbmdfbG9nIGxpIHsNCgltYXgtaGVpZ2h0OiAxMDBweDsNCgltaW4taGVpZ2h0OiA2MHB4Ow0KCXBhZGRpbmc6IDVw'+
        'eCAyMHB4IDBweCAxNXB4Ow0KCWJvcmRlcjogMXB4IHNvbGlkICMyMjI7DQoJbWFyZ2luLWJvdHRvbTogNXB4OwkNCn0NCiNmcmVl'+
        'Z2lmdHNjZW50ZXJfcG9wdXAgdWwjY29sbGVjdGluZ19sb2cgbGkgaDQgew0KCWZvbnQtc2l6ZTogMTRweDsNCglsaW5lLWhlaWdo'+
        'dDogMThweDsNCgltYXJnaW4tYm90dG9tOiA0cHg7DQoJcGFkZGluZy10b3A6IDJweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCWNv'+
        'bG9yOiAjRkZEOTI3Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCNjb2xsZWN0aW5nX2xvZyBsaSBwIHsNCglmb250LXNp'+
        'emU6IDEycHg7DQoJbWluLWhlaWdodDogMzVweDsNCglwYWRkaW5nLWxlZnQ6IDQwcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3Bv'+
        'cHVwIHVsI2NvbGxlY3RpbmdfbG9nIGxpIGltZyB7DQoJbWFyZ2luLXJpZ2h0OiA1cHg7DQoJaGVpZ2h0OiAzMHB4Ow0KCXdpZHRo'+
        'OiAzMHB4Ow0KCWZsb2F0OiBsZWZ0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCNtZXNzYWdlc19sb2cgbGkgew0KCW1h'+
        'eC1oZWlnaHQ6IDQwcHg7DQoJcGFkZGluZzogNXB4IDIwcHggMHB4IDE1cHg7DQoJYm9yZGVyOiAxcHggc29saWQgIzIyMjsNCglt'+
        'YXJnaW4tYm90dG9tOiA1cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsI21lc3NhZ2VzX2xvZyBsaSBwIHsNCglmb250'+
        'LXNpemU6IDEycHg7DQoJaGVpZ2h0OiAyMHB4Ow0KCXBhZGRpbmctbGVmdDogMzBweDsNCgltYXJnaW4tYm90dG9tOiAxcHg7DQp9'+
        'DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsI21lc3NhZ2VzX2xvZyBsaSBpbWcgew0KCWhlaWdodDogMTZweDsNCgl3aWR0aDog'+
        'MTZweDsNCglmbG9hdDogbGVmdDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwubWFzc19naWZ0X2xpc3Qgew0KCWhlaWdo'+
        'dDogNDc0cHg7DQogICAgYm9yZGVyOiAxcHggc29saWQgI0FBQTsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2ZyZWVnaWZ0c2Nl'+
        'bnRlcl9wb3B1cCB1bC5tYXNzX2dpZnRfbGlzdCBsaSB7DQoJaGVpZ2h0OiAyMHB4Ow0KCXBhZGRpbmc6IDVweCA1cHggMHB4IDVw'+
        'eDsNCgl0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLm1hc3NfZ2lmdF9saXN0IGxp'+
        'IGRpdiB7DQoJZmxvYXQ6IGxlZnQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLm1hc3NfZ2lmdF9saXN0IGxpIGEgew0K'+
        'CWZsb2F0OiByaWdodDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwubWFzc19naWZ0X2xpc3QgbGkgaW5wdXQgew0KCXdp'+
        'ZHRoOiA0MHB4Ow0KCWhlaWdodDogMTVweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBkaXYubGlfd3Jh'+
        'cHBlciB7DQoJYm9yZGVyLXRvcDogMXB4IHNvbGlkICMyMjI7DQoJcGFkZGluZzogNnB4IDE0cHggMCA1MnB4Ow0KfQ0KI2ZyZWVn'+
        'aWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpOmZpcnN0LWNoaWxkIHsNCglib3JkZXItd2lkdGg6IDBweDsNCn0NCiNmcmVl'+
        'Z2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSB7DQoJbWluLWhlaWdodDogNzZweDsNCgltYXgtaGVpZ2h0OiAxNjBweDsN'+
        'Cn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaS5naWZ0IHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9t'+
        'd2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvdjMvaWNvbl9naWZ0XzI3eDI4XzAxLnBuZyIpIDE3cHggMjBweCBu'+
        'by1yZXBlYXQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgZGl2LmJ1dHRvbnMgew0KCWZsb2F0OiBy'+
        'aWdodDsNCglmb250LXNpemU6IDEwcHg7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbWFyZ2luOiAzcHggMHB4IDBweCAxNHB4Ow0K'+
        'CXRleHQtYWxpZ246IHJpZ2h0Ow0KCXdpZHRoOiA3MHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxp'+
        'IGRpdi5ib2R5IHsNCgltYXJnaW4tcmlnaHQ6IDEwMHB4Ow0KCW1hcmdpbi1sZWZ0OiA2NXB4Ow0KCW1pbi1oZWlnaHQ6IDYwcHg7'+
        'DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgaDQgew0KCWZvbnQtc2l6ZTogMTRweDsNCglsaW5lLWhl'+
        'aWdodDogMThweDsNCgltYXJnaW4tYm90dG9tOiA0cHg7DQoJcGFkZGluZy10b3A6IDJweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJf'+
        'cG9wdXAgdWwucmVxX2JveCBsaSBwIHsNCglmb250LXNpemU6IDEycHg7DQoJbGluZS1oZWlnaHQ6IDE1cHg7DQoJbWFyZ2luLWJv'+
        'dHRvbTogNXB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpIHAgaW1nIHsNCgl3aWR0aDogNDVweDsN'+
        'CgloZWlnaHQ6IDQ1cHg7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luLXJpZ2h0OiA4cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3Bv'+
        'cHVwIHVsLnJlcV9ib3ggbGkgZGl2LmJ1dHRvbnMgYS5zZXh5X2J1dHRvbl9uZXcgew0KCW1hcmdpbi1ib3R0b206IDZweDsNCn0N'+
        'CiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSBkaXYuYnV0dG9ucyBhLmlnbm9yZSB7DQoJdGV4dC10cmFuc2Zv'+
        'cm06IHVwcGVyY2FzZTsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgZGl2Lmhvd3RvIHsNCgljbGVhcjogYm90aDsNCglwYWRk'+
        'aW5nLXRvcDogMTBweDsNCglib3JkZXItdG9wOiAxcHggc29saWQgIzMzMzsNCgltYXJnaW4tdG9wOiA1cHg7DQp9DQojZnJlZWdp'+
        'ZnRzY2VudGVyX3BvcHVwIGRpdi5ob3d0byBpbWcgew0KCWZsb2F0OiBsZWZ0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBk'+
        'aXYuaG93dG8gZGl2Lmhvd3RvX3RpdGxlIHsNCglwYWRkaW5nLXRvcDogM3B4Ow0KCW1hcmdpbi1sZWZ0OiAzMHB4Ow0KCWhlaWdo'+
        'dDogMjVweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwsICNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgbGksICNmcmVlZ2lm'+
        'dHNjZW50ZXJfcG9wdXAgZGwsICNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgZHQsICNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgZGQsICNm'+
        'cmVlZ2lmdHNjZW50ZXJfcG9wdXAgaDIsICNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgaDMsICNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAg'+
        'aDQsICNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgcCB7DQoJbWFyZ2luOiAwcHg7DQoJcGFkZGluZzogMHB4Ow0KfQ0K'
    );
    
    // Initialize
    options.load(Initialize);
}

/**
 * Get feed stories and autohelp all
 */
function HomeFeedCenter() 
{
    const ERROR_BAD_RESPONSE = 'Bad server response, try it yourself.';
    
    var messageTimer;
    var cancel_process = false;
    var inputSearchCalltimer;
    
    var options = new Config('feedstream', defaults.feedstream);
    // popup
    var popupElt = new domPopupObject('homefeedcenter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.homefeedcenter_title+'">',
        onclose: function() {
            cancel_process = true;
            messageTimer && messageTimer.clear();
            options.fromDomElements();
            options.save();
        }
    });
    
    var groupNames = [
        'None',
        'Go to War',
        'Give Social Help',
        'Social Missions',
        'Claim Bonus And Reward',
        'Collect Loot',
        'Property Help',
        'Get Boost',
        'Send Energy And Phones',
        'Accept Gift Event',
        'Hitlist Bounty'
    ];
    
    /**
     * @constructor
     * @param {Object} feed
     * @return {CSStream}
     */
    var CSStream = function(feed) {
        var nLastTime = options.get('lastPostTime');
        var sUrl, cParams, id = 'unknow', cAction, sGrpName;
        var isValid = true, cFilter;
        
        try {
            sUrl      = feed.attachment.href || feed.attachment.media[0].href;
            cParams   = Util.uSplit(sUrl);
            id        = cParams.next_controller + '_' + cParams.next_action;
            cAction   = Actions.get(id);
            
            if (cAction && cAction.group) {
                sGrpName = getGroupNameForSetting(cAction.group);
            }
        }
        catch(err) {
            isValid = false;
            log$('CSStream: No valid Feed:\n'+Util.toJSON(feed));
        }
        
        /** @type {Object}   */ this.feed         = feed;
        /** @type {Boolean}  */ this.isValid      = isValid;
        /** @type {Boolean}  */ this.isNew        = (feed.created_time > nLastTime);
        /** @type {String}   */ this.id           = id;
        /** @type {String}   */ this.groupName    = sGrpName;
        /** @type {String}   */ this.url          = sUrl;
        /** @type {CSAction} */ this.action       = cAction;
        if ( sGrpName === 'doCollectLoot' ) {
            this.filter = getFilter('collectLootFilter');
        }
        
        return this;
    };
    /**
     * Create a new Stream collection.
     * @param {Object} feeds
     * @param {Boolean} bOnlyNewFeeds
     * @return {CSStreamCollection}
     */
    var CSStreamCollection = function(feeds, bOnlyNewFeeds) {
        var nLastTime = options.get('lastPostTime');
        var nNewLastTime = nLastTime;
        var streams = new Array();
        
        /**
         * @param {Number} index
         * @return {CSStream}
         */
        this.get = function(index) {
            return streams[index];
        };
        /** @return {CSStream} */
        this.shift = function() {
            return streams.shift();
        };
        /** @param {Number} index */
        this.remove = function(index) {
            streams[index] = null;
        };
        /** @return {Number} */
        this.length = function() {
            var len = 0;
            for (var i = 0; i < streams.length; i++) {
                if (streams[i]) { len++; }
            }
            return len;
        };
        /** @param {Function} callback */
        this.each = function(callback) {
            $.each(streams, callback);
        };
        
        $.each(feeds, function(n, feed) {
            if (feed && feed.created_time) {
                var me  = parseFloat(facebook.session.uid); 
                var sid = parseFloat(feed.source_id);
                var tid = feed.target_id ? parseFloat(feed.target_id) : null;
                
                if ( sid !== me && (tid == null || tid == me) ) {
                    var strm = new CSStream(feed);
                    if ( feed.created_time > nNewLastTime ) { 
                        nNewLastTime = feed.created_time;
                    }
                    if ( strm.isValid && (bOnlyNewFeeds !== true || strm.isNew) ) {
                        streams.push(strm);
                    }
                }
            }
        });
        
        options.set('lastPostTime',nNewLastTime);
        options.save();
        
        /** @type Number   */
        this.lastTime = nNewLastTime;
        
        return this;
    };
    /**
     * @constructor
     * @param {Object} params
     * @return {CSAction}
     */
    var CSAction = function(params) {
        /** @type String   */ this.name      = params.name;
        /** @type Number   */ this.group     = params.group;
        /** @type Object   */ this.next      = params.next;
        /** @type String   */ this.repeat    = params.repeat;
        /** @type String   */ this.bad       = params.bad;
        /** @type Object   */ this.success   = params.success;
        /** @type Function */ this.filter    = params.filter;
        /** @type RegExp   */ this.skipif    = params.skipif;
        /** @type String   */ this.popup     = params.popup;
        return this;
    };
    /**
     * @constructor
     * @return {CSActionCollection}
     */
    var CSActionCollection = function() {
        var actions = new Object();
        /**
         * @param {String} id
         * @param {Object} params
         */
        this.add = function(id, params) {
            actions[id] = new CSAction(params);
        };
        /** @return {CSAction} */
        this.get = function(id) {
            return actions[id];
        };
        /** @param {Function} callback */
        this.each = function(callback) {
            $.each(actions, callback);
        };
        return this;
    };
    
    /** @type {CSStreamCollection} */
    var feedStream;
    var Actions = new CSActionCollection();

    // EVENTS
    var Events = {
        helpFeed_click: function() {
            if ($(this).attr('disabled') == true) {
                return false;
            }
            $(this).attr('disabled', true);
            
            var id      = $(this).attr('feed');
            var eParent = $(this).parent();
            var eText   = $('.body > p', '#feed_' + id);
            var cHelp   = feedStream.get(id);
            
            var addClearButton = function() {
                if (isChecked('#feedstream_autoclose')) {
                    setTimeout(function() {
                        Events.deleteFeed_click.apply($('a.ignore', eParent).get(0));
                    }, 2000);
                }
                else {
                    b$('Clear', 'id:clearbtn,class:medium white,feed:'+id)
                      .appendTo(eParent).click(Events.deleteFeed_click);
                }
            };
            
            log$(cHelp.id);
            eParent.children().fadeOut(200);
            
            if (cHelp.action && isChecked(cHelp.action.enable)) {
                eText.html('<img style="vertical-align: middle;" src="'+
                global.resource.ajax_loader+'">'+'<span style="margin-left: 5px;">Loading...</span>');
                
                doHelp(toInternalUrl(cHelp.url), cHelp.action, function(data) {
                    eText.hide().html(cleanData(data)).fadeIn(500, addClearButton);
                });
            }
            else {
                eText.hide().html('I can\'t do it.<br>But you can still help by '+
                '<a href="'+cHelp.url+'" target="_black">open it in a new tab.</a>')
                .fadeIn(500, addClearButton);
            }
            return false
        },
        deleteFeed_click: function() {
            var id = $(this).attr('feed');
            
            $('#feed_'+id).fadeOut(500, function(){
                $('#feed_'+id).remove();
            });
            feedStream.remove(parseInt(id));
            $('#total_feeds', '#feed_center_header').html(feedStream.length());
            return false
        },
        skip_click: function() {
            showDiv('control', 'panel', 500, function(){
                $('#status_panel').empty();
            });
        },
        refresh_click: function() {
            showDiv('ajaxloader', 'body');
            
            $('#status_panel').empty()
            .append(c$('div').css('padding-top',5).text('Loading... wait a moment please.'));
            
            showDiv('status', 'panel', 500);
            
            facebook.queryFeed(options.get('feedsLimit'), function(fs) {
                feedStream = new CSStreamCollection(fs);
                
                if (feedStream.length() < 1) {
                    showDiv('feedlist', 'body');
                    
                    $('#status_panel').empty().append(
                        c$('div').css({'text-align':'center', 'padding-top':5})
                        .append(c$('span').text('There is some error in facebook response.'))
                        .append(b$('Retry','class:short white').css('margin-left',5).click(Events.refresh_click))
                        .append(b$('Cancel','class:short white').css('margin-left',5).click(Events.skip_click))
                    );
                    return;
                }
                
                genFeedsDom();
                
                showDiv('feedlist', 'body');
                showDiv('control', 'panel', 500);
            });
        },
        config_click: function() {
            $('#control_panel').fadeOut(500, function() {
                $('#panel_container').animate({height: 230}, 'normal', function() {
                    $('#config_panel').fadeIn(500);
                });
            });
        },
        save_click: function() {
            options.fromDomElements();
            options.save();
            $('#config_panel').fadeOut(500, function() {
                $('#panel_container').animate({height:35}, 'normal', function() {
                    $('#control_panel').fadeIn(500);
                });
            });
        },
        keyup: function() {
            var val = this.value.toLowerCase();
            
            // perform search only when user stop writing.
            if (inputSearchCalltimer) 
                clearTimeout(inputSearchCalltimer);
            
            inputSearchCalltimer = setTimeout(function() {
                $('li[id^=feed_]').each(function(index, element) {
                    if ($('.body', element).text().toLowerCase().match(val)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            }, 500);
        },
        change: function() {
            var selectIndex = this.selectedIndex;
            if (selectIndex == 0) {
                $('li[id^=feed_]', '#feedlist_body').show();
                return;
            }
            $('li[id^=feed_]', '#feedlist_body').hide();
            Actions.each(function(name, obj) {
                if (obj.group && parseInt(obj.group) == selectIndex) {
                    $('li[name='+name+']', '#feedlist_body').show();  
                }    
            });
        },
        clearall: function() {
            $('li[id^=feed_]', '#feedlist_body').each(function(index, element){
                $('#clearbtn', element).click();
            });
        },
        config_change: function() {
            var selection = c$(this).attr('name');
            $('.select_tab .selected', popupElt.content).toggleClass('selected', false);
            $(this).parent().toggleClass('selected', true);
            showDiv(selection, 'config');
        }
    };
    /** 
     * @param {Element, jQuery, String} selector
     * @return {String}
     */
    function getUrlFromElement(selector) {
        var obj = $(selector);
        
        if (!obj.length || !obj.attr) 
            return '';
            
        var url = obj.attr('href');
        
        if (typeof(url) == 'string' && url.match('http')) {
            return url;
        }
        return Util.doRgx(/['"](remote[^'"]*)/, obj.attr('onclick')).$1;
    }
    /**
     * @param {String} url
     * @return {String}
     */
    function toInternalUrl(url) {
        if (typeof(url) !== 'string' || url.indexOf('?') == -1) {
            return '';
        }
        var params = Util.uSplit(url), a, b;
        var sOutUrl = 'remote/' + MW.getIntURL(params.next_controller, params.next_action);
        var unQuote = function(str) {
            var rgx;
            return (rgx = /"([^"]+)"/.exec(str)) ? rgx[1] : str;
        };
        for (var uri in params) {
            if (String(uri).indexOf('next_') == -1) {
                 sOutUrl += (typeof(params[uri]) == 'string' ?  '&'+uri+'='+params[uri] : '');
            }
        }
        if ((a = String(params.next_params).split(',')).length > 0) {
            for (var i = 0; i < a.length; i++) {
                if ((b = String(a[i]).split(':')).length == 2) {
                    sOutUrl += ('&' + unQuote(b[0]) + '=' + unQuote(b[1]));
                }
            }
        }

        return sOutUrl;
    }
    /**
     * @param {String} data
     * @return {String}
     */
    function cleanData(data) {
        if (typeof(data) !== 'string') {
            return data;
        }
        var obj = $('<div>'+ data.replace(/<div[^>]*>/g, '<div>') +'</div>');
        $('img, .sexy_button_new, br, div:empty, .msg_energy_but_col', obj).remove();
        return obj.html();
    }
    /**
     * Return true if checkbox exist and is cheched. Otherwise false.
     * @param {Object} selector
     * @param {Object} context
     * @return {Boolean}
     */
    function isChecked(selector, context) {
        if (typeof(selector) == 'undefined') {
            return true;
        }
        return $(selector, context).attr('checked');
    }
    
    /**
     * @param {String} filter_name
     * @return {Function}
     */
    function getFilter(filter_name) {
        var sFilter = String(options.get(filter_name + 'Text'));
        
        /** @return {Boolean} */
        var fn = function(text) {
            if (!options.get(filter_name) || !sFilter) {
                return false;
            }
            var filterArray = new Array();
            $.each(sFilter.split('\n'), function(i, n) {
                var s = $.trim(n);
                if (s.charAt(0) !== '#' && s.length > 2) {
                    filterArray.push(s);
                }
            });
            if (filterArray.length < 1) {
                return false;
            }
            var RegText = filterArray.join('|');
            
            if ((new RegExp(RegText, 'i')).test(text)) {
                return false;
            }
            return true;
        };
        
        return fn;
    };    
    /**
     * @return {Number}
     */
    function getRefreshDelay() {
		var refreshDelay = parseInt(options.get('refreshDelay'));
        if ( refreshDelay < 5 ) { 
            refreshDelay = 5; 
        }
        return refreshDelay;
    }
    /**
     * @return {String}
     */
    function getGroupNameForSetting(group_id) {
        return 'do'+ groupNames[group_id].replace(/\s*/g, '');
    }    
    /**
     * Add default actions.
     */
    function addDefaultActions() {
        Actions.add('hitlist_feed_hit', {
            name       : 'Hitlist Bounty', 
            group      : 10,
            repeat     : '.message_body a:regex(href,action=attack), a:regex(href,action=power_attack)',
            bad        : '.message_body:has(span.bad)',
            success    : '.fight_results, .fightres_stats'
        });
        Actions.add('war_view', {
            name       : 'Go to war', 
            group      : 1,
            repeat     : 'a:regex(href,xw_controller=war&xw_action=attack)',
            popup      : '.post_help_results h3, .pop_box > div > div > div:eq(1)',
            filter     : filterWar
        });
        Actions.add('war_share_reward_feed_click', {
            name       : 'Claim war reward', 
            group      : 4,
            popup      : '.pop_box > div > div > div:eq(1)'
        });
        Actions.add('freegifts_acceptGiftEvent', {
            name       : 'Accept Gift Event',
            group      : 9,
            success    : /padding:\s*10px\s*20px;\s*margin:\s*5px\s*0px[^>]*>([^<]+)</i,
            skipif     : /You have already claimed the maximum/i
        });
        Actions.add('index_ach_celeb', {
            name       : 'Get archivement reward', 
            group      : 4,
            next       : '.message_body a:regex(href,xw_action=ach_celeb)'
        });
        Actions.add('story_claim_boss_bonus', {
            name       : 'Claim a boss bonus', 
            group      : 4,
            next       : '.message_body a:regex(href,xw_action=claim_boss_bonus)'
        });
        Actions.add('propertyV2_getBoost', {
            name       : 'Get a property boost', 
            group      : 5,
            next       : '.message_body a:regex(href,xw_action=getBoost)'
        });
        Actions.add('index_send_energy_mbox', {
            name       : 'Send energy',
            group      : 8,
            next       : '.message_body a:regex(href,xw_action=send_energy_mbox)'
        });
        Actions.add('index_send_energy', {
            name       : 'Send energy',
            group      : 8
        });
        Actions.add('socialmission_joinMission', {
            name       : 'Join in a mission', 
            group      : 3,
            enable     : '#feedstream_dosocialmissions',
            next       : doOperation
        });
        Actions.add('job_collect_loot', {
            name       : 'Collect a loot', 
            group      : 5,
            skipif     : /have\s*to\s*wait/i 
        });
        Actions.add('propertyV2_itemFeedHelp', {
            name       : 'Property item Help', 
            group      : 6,
            skipif     : /You\s*have\s*already\s*helped\s\w+/i 
        });
        Actions.add('index_iced_boost_claim', {
            name       : 'Get iced boost', 
            group      : 7,
            skipif     : /You\s*can\s*only\s*receive/i 
        });
        Actions.add('lootladderevent_share_feed_click', {
            name       : 'Collect a Loot Event',
            group      : 4,
            skipif     : /try again tomorrow/i 
        });
        Actions.add('lootladderevent_ask_feed_click', {
            name       : 'Collect a Loot Event',
            group      : 4,
            skipif     : /try again tomorrow/i 
        });
        Actions.add('lootladderevent_brag_feed_click', {
            name       : 'Collect a Golden Loot Event',
            group      : 4,
            skipif     : /try again tomorrow/i 
        });
        Actions.add('bossfightv2_ask_feed_click',      { name: 'Collect a Boss Fight item',    group: 4 });
        Actions.add('quest_questFeedReward',           { name: 'Claim quest reward',           group: 4 });
        Actions.add('job_give_help',                   { name: 'Give job help',                group: 2 });
        Actions.add('story_give_help_social',          { name: 'Give social help',             group: 2 });
        Actions.add('story_give_help_moscow_social',   { name: 'Give moscow help',             group: 2 });
        Actions.add('socialmission_rewardBrag',        { name: 'Claim social mission reward',  group: 4 });
        Actions.add('map_mapboss_reward_claim',        { name: 'Claim boss reward',            group: 4 });
        Actions.add('propertyV2_getCustomer',          { name: 'Get a customer',               group: 6 });
        Actions.add('propertyV2_cs_help_item',         { name: 'Property help',                group: 6 });
        Actions.add('propertyV2_cs_help_initial',      { name: 'Property initial help',        group: 6 });
        Actions.add('propertyV2_cs_help_final',        { name: 'Property final help',          group: 6 });
        Actions.add('propertyV2_cs_redeem_special_item_feed',{ name: 'Property special help',  group: 6 });
        Actions.add('index_levelup_boost_claim',       { name: 'Get levelup boost',            group: 7 });
        Actions.add('index_levelUpBonusClaim',         { name: 'Get levelup boost',            group: 7 });
        Actions.add('robbing_call_for_help_get_phone', { name: 'Get robbing phone',            group: 8 });
    }
    /**
     * Collect a link.
     * @param {String} url
     * @param {CSAction} action
     * @param {Function} callback
     */
    function doHelp(url, action, callback) 
    {
        httpAjaxRequest({
            url: url,
            success: function(htmlText) 
            {
                if (!MW.update(htmlText)) {
                    callback(ERROR_BAD_RESPONSE);
                    return;
                }
                var r, r2, eQry = h$(htmlText);
                
                if (typeof(action.next) == 'function') {
                    action.next(htmlText, callback);
                    return;
                }
                if (action.filter && (r = action.filter(htmlText)) !== false) {
                    callback(r);
                    return;
                }
                if (action.bad && (r = eQry.find(action.bad)).length > 0) {
                    callback(r.html()); 
                    return;
                }
                if (action.repeat && (r = eQry.find(action.repeat)).length > 0) {
                    doHelp(getUrlFromElement(r), action, callback);
                    return;
                }
                if (action.popup && (r = Util.parsePopup(htmlText))) {
                    if ((r2 = h$(r).find(action.popup)).length > 0) {
                        callback(r2.text());
                        return;
                    }
                    else if ( /txt_past_war_results/.test(r) ) {
                        callback('You get past war result popup. So, this help has no response.');
                        return;
                    } 
                }
                if (action.success && action.success.exec && (r = action.success.exec(htmlText))) {
                    callback(r[1]);
                    return;
                }
                if (action.success && (r = eQry.find(action.success)).length > 0) {
                    callback(r.html());
                    return;
                }
                if (action.next && (r = eQry.find(action.next)).length > 0) {
                    doHelp(getUrlFromElement(r), {}, callback);
                    return;
                }
                
                if ((r = eQry.find('.message_body:first, #mbox_generic_1 tr:eq(1)')).length > 0) {
                    callback(r.html());  
                }
                else {
                    callback(ERROR_BAD_RESPONSE);
                    log$(htmlText);
                }
            }
        });
    }
    
    function filterWar(htmlText) {
        if (!options.get('warFilter')) { return false; }
        try {
            var text = h$(htmlText).find('.helpers_rewards ul img').attr('title');
            
            if ( getFilter('warFilter')(text) !== false) {
                return 'War Filtered. ( '+text+' )';
            }
        }
        catch(err) {
            logErr$(err);
        }
        return false;
    }
    
    function doOperation(htmlText, callback) 
    {
        var qHtml = h$(htmlText);
        
        if (e$('.socialMissionSelector', qHtml) == null) {
            callback('You can\'t join. Try helping out other mafia members.');
            return;
        }
        try {
            var nFree   = options.get('maxFreeSlots');
            var sName   = $('.missionSelectHeaderTitle', qHtml).text();
            var sDiff   = $('.missionDifficulty > span', qHtml).attr('class');
            var nSpend1 = parseInt($('#feedstream_joinmission').val());
            var nSpend2 = parseInt($('#feedstream_joinmissionafter').val());
            var sQuery  = 'a:regex(onclick,action=selectPosition)';
            var nSlots  = $(sQuery, qHtml).length;
            var cSlots  = new Array();
            
            if ( getFilter('missionFilter')(sName) !== false) {
                callback('Operation Filtered. ( '+sName+' )');
                return;
            }
            if (nSlots > nFree) {
                callback('Mission '+ sName + ' skipped: too many slots free ('+nSlots+').');
                return;
            }
            if (!options.get('diff_' + sDiff.toLowerCase())) {
                callback('Mission '+ sName + ' skipped: difficulty don\'t match.');
                return;
            }
            $('.missionSelectorBox:has('+sQuery+')', qHtml).each(function(index,elem) {
                var nSpendType = 0;
                var hasEnergy  = (e$('dd.energy', elem) !== null);
                var hasStamina = (e$('dd.stamina', elem) !== null);
                
                if ((hasEnergy || hasStamina) && !Util.isSet(cSlots[4])) {
                    cSlots[4] = $(sQuery, elem);
                }
                if (hasEnergy && !hasStamina) {
                    nSpendType = 1;
                }
                else if (!hasEnergy && hasStamina) {
                    nSpendType = 2;
                }
                else if (hasEnergy && hasStamina) {
                    nSpendType = 3;
                }
                
                if (!Util.isSet(cSlots[nSpendType])) {
                    log$('Adding SpendType: '+ nSpendType);
                    cSlots[nSpendType] = $(sQuery, elem);
                }
            });
            
            var button = (cSlots[nSpend1] || cSlots[nSpend2]);
            
            if (typeof(button) == 'undefined' || button.length < 1) {
                callback('Mission '+ sName + ' skipped: spend type don\'t match.');
                return;
            }
        }
        catch(err) {
            logErr$(err);
            callback(ERROR_BAD_RESPONSE);
            return;
        }

        httpAjaxRequest({
            url: getUrlFromElement(button),
            success: function(htmlText) 
            {
                if (MW.update(htmlText)) 
                    callback('You has join in ' + sName + ' mission.');
                else 
                    callback(ERROR_BAD_RESPONSE);
            }
        });
    }
    
    function showDiv(name, type, ms, fn) {
        $('div[id*=_'+type+']', popupElt.content).hide();
        var elem = $('#' + name + '_' + type, popupElt.content);
        if (ms) {
            elem.fadeIn(ms, fn);
        }
        else {
            elem.show();
        }
    }
    
    function autoMode() {
        var nDelay       = options.get('helpDelay');
        var skippedHelps = new Array();
        var nCompleted   = 0;
        var nSkipped     = 0;
        /** @type {CSStream} */
        var cStream;
        
        var cancel_click = function() {
            messageTimer.clear();
            cancel_process = true;
            Events.refresh_click();
            delete messageTimer;
            return false;
        };
        
        messageTimer = new timerMessage('#auto_feed_helper_messages');
        
        function closeAndNext(message, delay) {
            $('#completed_helps').text(nCompleted);
            $('#skipped_helps').text(nSkipped);
            $('#total_feeds', '#feed_center_header').html(feedStream.length());
            
            if (feedStream.length() < 1) {
                messageTimer.start('All helps finished!. Refresh and continue in %N% seconds.', 
                    getRefreshDelay(), refreshList);
                return;
            }
            cStream = feedStream.shift();
            
            if (!delay) {
                doNewHelp();
            } else {
                messageTimer.start(''+message, delay, doNewHelp);
            }
        } 
        // begin automatic mode
        function doNewHelp() {
            if (cancel_process) {
                return;
            }
            try {            
            if (typeof(cStream) == 'undefined') {
                closeAndNext();
                return;
            }
            
            if (!Util.isSet(cStream.action)) {
                closeAndNext();
                return;
            }
            if (Util.isFunc(cStream.filter)) {
                if (cStream.filter(cStream.feed.attachment.name) !== false) {
                    genHelpLogDom(cStream, 'This has been filtered.');
                    nSkipped++;
                    closeAndNext();
                    return;
                }
            }
            if (Util.isSet(options.get(cStream.groupName+'Cfg'))) {
                var opt = options.get(cStream.groupName+'Cfg')[cStream.id];
                if (Util.isSet(opt) && opt === false) {
                    nSkipped++;
                    closeAndNext();
                    return;
                }
            }
            if (skippedHelps[cStream.id]) {
                log$('Help Skipped: '+cStream.id+'\n['+cStream.feed.permalink+'].');
                nSkipped++;
            } 
            else if (options.get(cStream.groupName)) 
            {
                $('#auto_feed_helper_messages').html(
                    '<img style="vertical-align: middle;" src="'+global.resource.ajax_loader+'">'+
                    '<span style="margin-left: 5px;">Helping in:  "' + cStream.action.name + '"...</span>'
                );
                doHelp(toInternalUrl(cStream.url), cStream.action, function(data) {
                    genHelpLogDom(cStream, cleanData(data));
                    
                    if (cStream.action.skipif && cStream.action.skipif.test(data)) {
                        skippedHelps[cStream.id] = true;
                        closeAndNext('Done! but you can\'t accept more, Next help in %N%...',nDelay);
                    }
                    else {
                        nCompleted++;
                        closeAndNext('Done!, Next help in %N%...',nDelay);
                    }
                });
                return;
            }
            closeAndNext();
            
            } 
            catch (err) {
                log$('autoMode.doNewHelp.error: ' + err.message);
                closeAndNext();
            }
        }
        
        function refreshList() {
            if (cancel_process) {
                return;
            }
            $('#auto_feed_helper_messages').html(
                '<img style="vertical-align: middle;" src="'+global.resource.ajax_loader+'">'+
                '<span style="margin-left: 5px;">Refreshing home posts...</span>'
            );
            facebook.queryFeed(options.get('feedsLimit'), function(fs) {
                // catch error
                if (Util.length(fs) < 1) {
                    messageTimer.start('Error loading posts, try again in %N%...',getRefreshDelay(),refreshList);
                    return;
                }
                ;
                if ((feedStream = new CSStreamCollection(fs, true)).length() < 1) {
                    messageTimer.start('No new posts, refresh again in %N%...',getRefreshDelay(), refreshList);
                    return;
                }
                $('#total_feeds', '#feed_center_header').html(feedStream.length());
                doNewHelp();
            });
        }
        
        function genHelpLogDom(stream, responseText) {
            var list = $('#logList');
            var title = stream.action.name;
            var feed = stream.feed;
            
            if ($('#logList').children().length > options.get('maxLogLength')) {
                $('#logList').children().last().remove();
            }
            var atch = feed.attachment;
            var eTitle = c$('a','target:_black').attr('href',feed.permalink).text(atch.name||atch.description);
            var eImg = atch.media[0] 
            ? c$('img','class:feed_icon,title:'+title).attr('src',atch.media[0].src) 
            : c$('span');
                
            c$('li').prependTo('#logList').append(
                c$('div').addClass('li_wrapper clearfix')
                .append(eImg).append(c$('div','class:body')
                    .append(c$('h4').append(eTitle))
                    .append(c$('p').html(responseText))
                )
            );
        }
        
        $('#status_panel').empty();
        
        c$('div').appendTo('#status_panel').css({
            'padding':'5px 0 0 15px',
            'float': 'left'
        })
        .append(c$('span').css('color','green').text('Completed: '))
        .append(c$('span','completed_helps').text(0))
        .append(c$('span').css({'color':'green','margin-left':5}).text('Skipped: '))
        .append(c$('span','skipped_helps').text(0))     
        
        c$('div','auto_feed_helper_messages').appendTo('#status_panel')
        .html('Preparing to help...').css({
            'padding':'5px 0 0 30px',
            'float': 'left'
        });
    
        b$('CANCEL').addClass('short red').click(cancel_click)
        .appendTo('#status_panel').css({
            'float': 'right',
            'margin-right': 40
        });
        
        showDiv('automode', 'body');
        showDiv('status', 'panel', 500);
        
        options.fromDomElements();
        options.save();
        
        cancel_process = false;
        
        cStream = feedStream.shift();
        doNewHelp();
    }
    
    function genMainDom() {
        
        // fix content height
        popupElt.content.height('680').css('margin-top', 5);
        
        // header popup
        c$('dl', 'class:total_requests')
        .appendTo(c$('div', 'feed_center_header').appendTo(popupElt.header))
        .append('<dt id="total_feeds">'+feedStream.length()+'</dt>')
        .append('<dd>Total Posts</dd>');
        
        var controlDiv, configDiv;
        
        // middle, config, buttons
        c$('div', 'panel_container').appendTo(popupElt.content)
        .append(c$('div', 'status_panel').height(35))
        .append(controlDiv = c$('div', 'control_panel').height(35))
        .append(configDiv  = c$('div', 'config_panel'));
        
        // add configurations
        c$('div', 'class:search_box')
        .append(c$('label', 'for:feedstream_filter').text('Search: '))
        .append(c$('input:text', 'id:feedstream_filter, class:black_box').width(149).keyup(Events.keyup))
        .append(c$('select', 'id:feedstream_grouping, class:black_box').width(152).change(Events.change))
        .appendTo(controlDiv);
        
        c$('div', 'class:control_box')
        .append(b$('Clear all', 'class:short white').click(Events.clearall))
        .append(b$('Refresh','class:short orange').css('margin-left',5).click(Events.refresh_click))
        .append(b$('Config','class:short orange').css('margin-left',5).click(Events.config_click))
        .append(b$('AutoHelp','class:short orange').css('margin-left',10).click(autoMode))
        .appendTo(controlDiv);
        
        
        // ADD CONFIGURATION
        
        // add options checkboxes and group list
        var eConfigSelector = c$('div', 'class:select_tab').appendTo(configDiv);
        var eGroup = $('#feedstream_grouping');
        
        $.each(groupNames, function(index, name) {
            var tag = name.replace(/\s*/g, '').toLowerCase();
            eGroup.append(c$('option', 'value:'+index).text(name));
            var elem = c$('div').appendTo(eConfigSelector);
            if (name=='None') {
                elem.addClass('selected')
                .append(c$('p', 'name:'+tag).text('General').click(Events.config_change));
            }
            else {
                elem.append(c$('input:checkbox', 'id:feedstream_do'+tag))
                .append(c$('p', 'name:'+tag).text(name).click(Events.config_change));
            }

        });
        
        // add configuration
        c$('div', 'class:config_tab,id:none_config')
        .append(genGeneralConfig()).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:gotowar_config')
        .append(genConfigFilter('warfilter')).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:givesocialhelp_config')
        .append(genMultiCheckboxConfig(2)).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:socialmissions_config')
        .append(genMissionConfig()).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:claimbonusandreward_config')
        .append(genMultiCheckboxConfig(4)).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:collectloot_config')
        .append(genConfigFilter('collectlootfilter')).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:propertyhelp_config')
        .append(genMultiCheckboxConfig(6)).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:getboost_config')
        .append(genEmptyConfig()).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:sendenergyandphones_config')
        .append(genEmptyConfig()).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:acceptgiftevent_config')
        .append(genEmptyConfig()).appendTo(configDiv);
        
        c$('div', 'class:config_tab,id:hitlistbounty_config')
        .append(genEmptyConfig()).appendTo(configDiv);        
        
        c$('div', 'class:save_config').appendTo(configDiv)
        .append(b$('Save Configuration','class:short orange').click(Events.save_click));
        
        
        // ADD BODY ELEMENTS
        c$('div', 'feedlist_body').height(600).appendTo(popupElt.content);
        
        c$('div', 'ajaxloader_body').css('padding-top',25).height(575)
        .append(c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif'))
        .appendTo(popupElt.content);
        
        c$('div', 'automode_body').height(600)
        .append(c$('ul', 'id:logList,class:feed_box').height(600))
        .appendTo(popupElt.content);
        
        function genEmptyConfig() {
            var elem = c$('center').css('margin-top', 10)
            .html('This category don\'t have any configuration.');
            
            return elem;
        }
        function genMultiCheckboxConfig(group_id) {
            var elem = c$('div');
            var sGroup = getGroupNameForSetting(group_id).toLowerCase();
            var table;
            
            c$('div').css({'float':'left','margin-right':5}).appendTo(elem)
            .append(c$('img').attr('src', global.resource.menu_arrow));
            table = c$('div', 'class:select_tab,name:checkboxlist,id:feedstream_'+sGroup+'cfg')
            .height(150).appendTo(elem);
            
            Actions.each(function(id, action) {
                if ( action.group !== group_id ) return;
                c$('div').appendTo(table)
                .append(c$('input:checkbox', 'id:'+id+',checked:checked'))
                .append(c$('label', 'for:action_'+id).text(action.name));
            });
            return elem;
        }
        function genGeneralConfig() {
            var elem = c$('div')
            .append(c$('input:checkbox', 'feedstream_autoclose'))
            .append(c$('label', 'for:feedstream_autoclose').text('Autoclose helps.'))
            .append(c$('div','class:clearfix'))
            .append(c$('label', 'for:feedstream_feedslimit').text('Load Feeds Limit: '))
            .append(c$('input:text', 'id:feedstream_feedslimit, class:black_box').width(100))
            .append(c$('div','class:clearfix'))
            .append(c$('label', 'for:feedstream_maxloglength').text('Log Length: '))
            .append(c$('select', 'id:feedstream_maxloglength, class:black_box').width(100))
            .append('<br />')
            .append(c$('div','class:clearfix'))
            .append(c$('label', 'for:feedstream_helpdelay').text('Help delay (sec.): '))
            .append(c$('select', 'id:feedstream_helpdelay, class:black_box').width(100))
            .append(c$('div','class:clearfix'))
            .append(c$('label', 'for:feedstream_refreshdelay').text('Refresh delay: '))
            .append(c$('select', 'id:feedstream_refreshdelay, class:black_box').width(100));
            
            return elem;
        }
        function genConfigFilter(id, value) {
            return c$('div')
            .append(c$('input:checkbox', 'id:feedstream_'+id))
            .append(c$('label','for:'+id).text('Active filter (add filters delimited by lines):'))
            .append(c$('br'))
            .append(c$('textarea', 'class:black_box,cols:45,rows:8,id:feedstream_'+id+'text'));
        }
        function genMissionConfig() {
            var elem = c$('div');
            c$('div').css('margin',5)
            .append(c$('span').text('Mission difficulty: '))
            .append(c$('input:checkbox', 'id:feedstream_diff_easy'))
            .append(c$('label', 'for:feedstream_diff_easy').text('Easy'))
            .append(c$('input:checkbox', 'id:feedstream_diff_medium'))
            .append(c$('label', 'for:feedstream_diff_medium').text('Medium'))
            .append(c$('input:checkbox', 'id:feedstream_diff_hard'))
            .append(c$('label', 'for:feedstream_diff_hard').text('Hard'))
            .append(c$('input:checkbox', 'id:feedstream_diff_event'))
            .append(c$('label', 'for:feedstream_diff_event').text('Event'))
            .appendTo(elem);
            
            c$('div').css('margin',5)
            .append(c$('label', 'for:feedstream_joinmission').text('Join only in: '))
            .append(c$('select', 'id:feedstream_joinmission, class:black_box').width(90))
            .append(c$('label', 'for:feedstream_joinmissionafter').text(' if not possible then: '))
            .append(c$('select', 'id:feedstream_joinmissionafter, class:black_box').width(90))
            .appendTo(elem);
            
            c$('div').css('margin',5)
            .append(c$('label', 'for:feedstream_maxfreeslots').text('And only if remain: '))
            .append(c$('select', 'id:feedstream_maxfreeslots, class:black_box').width(110))
            .appendTo(elem);
            
            c$('div').css('margin',5)
            .append(c$('input:checkbox', 'id:feedstream_missionfilter'))
            .append(c$('label','for:feedstream_missionfilter').text('Active Mission Name Filter:'))
            .append(c$('br'))
            .append(c$('textarea', 'class:black_box,cols:45,rows:3,id:feedstream_missionfiltertext'))
            .appendTo(elem);
            
            return elem;
        }
        
        popupElt.applyOptions({
            'feedstream_maxloglength'      : {50:'50', 200:'200', 500:'500', 1000:'1000'},
            'feedstream_joinmission'       : {4:'Any', 1:'Energy', 2:'Stamina', 3:'Both'},
            'feedstream_joinmissionafter'  : {0:'None', 1:'Energy', 2:'Stamina', 3:'Both', 4:'Any'},
            'feedstream_maxfreeslots'      : {100:'Any slots', 1:'1 slot', 2:'2 slots', 3:'3 slots', 4:'4 slots'},
            'feedstream_helpdelay'         : {0:'None', 1:'1 sec', 2:'2 sec', 3:'3 sec', 5:'5 sec'},
            'feedstream_refreshdelay'      : {5:'5 sec', 15:'15 sec', 30:'30 sec', 60:'1 min', 180:'3 min', 300:'5 min', 600:'10 min'}
        });
    }
    
    function genFeedsDom() {
        var liElt, ulElt = c$('ul', 'class:feed_box').height(600);
        // ADD FEED
        feedStream.each(function(index, obj) {
            var feed  = obj.feed;
            var sId   = obj.id;
            var atch  = feed.attachment;
            var attr  = (obj.isNew?'class:new_post, ':'')+'name:'+sId+', ';
            var name  = '<a href="'+feed.permalink+'" target="_black">';
            var desp  = atch.name ? atch.description : '';
            var eImg  = atch.media[0]
            ? c$('img', 'class:feed_icon').attr('src', atch.media[0].src)
            : c$('span');
            
            name += (atch.name || atch.description) + '</a>';
            
            c$('li', attr+'id:feed_'+index).appendTo(ulElt).append(
                c$('div').addClass('li_wrapper clearfix')
                .append(eImg).append(
                    c$('div','class:buttons')
                    .append(b$('Help', 'class:medium white,feed:'+index).click(Events.helpFeed_click))
                    .append(c$('a', 'href:#,class:ignore,feed:'+index).text('ignore').click(Events.deleteFeed_click))
                )
                .append(c$('div','class:body').append('<h4>'+name+'</h4><p>'+desp+'</p>'))
            );
        });
        options.save();

        $('#feedlist_body').empty().append(ulElt);
        $('#total_feeds', '#feed_center_header').html(feedStream.length());
        
        if ($('#feedstream_grouping').val() !== groupNames[0]) {
            $('#feedstream_grouping').change();
        }
    }
    
    function Initialize() {
        // add all pre-configured actions
        addDefaultActions();
        
        var overlay = loadingOverlay('Loading home posts...');
        
        facebook.queryFeed(options.get('feedsLimit'), function(fs) {
            overlay.hide();
            // catch error
            if (Util.length(fs) == 0) {
                showHelpPopup({
                    icon: 'error',
                    title: 'Error loading home posts',
                    message: 'There was an error while loading your home posts<br>' +
                        'Maybe it\'s a temporal facebook problem.<br>Try again later.'
                });
                return;
            }
            
            log$('HFC: fs.length = '+ Util.length(fs));
            feedStream = new CSStreamCollection(fs);
            log$('HFC: feedStream.length = '+ feedStream.length());
            
            genMainDom();
            options.toDomElements();
            genFeedsDom();
            
            showDiv('feedlist', 'body');
            showDiv('control', 'panel');
            showDiv('none', 'config');
            
            // show popup
            popupElt.show();
        });
    }

    popupElt.addBase64Style(
        'I2hvbWVmZWVkY2VudGVyX3BvcHVwIC5ibGFja19ib3ggew0KCWZvbnQtd2VpZ2h0OiBib2xkOyANCgljb2xvcjogcmdiKDIwOCwg'+
        'MjA4LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJs'+
        'YWNrOyANCglmb250LXNpemU6IDE0cHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVlZF9ib3ggew0KCWhlaWdodDog'+
        'NDAwcHg7DQoJbGlzdC1zdHlsZS10eXBlOiBub25lOw0KCW92ZXJmbG93OiBhdXRvOw0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVw'+
        'ICNmZWVkbGlzdF9ib2R5IHVsLmZlZWRfYm94IGxpOmZpcnN0LWNoaWxkIHsNCglib3JkZXItd2lkdGg6IDBweDsNCn0NCiNob21l'+
        'ZmVlZGNlbnRlcl9wb3B1cCAjZmVlZGxpc3RfYm9keSB1bC5mZWVkX2JveCBsaSB7DQoJYm9yZGVyLXRvcDogMnB4IHNvbGlkICMx'+
        'RjFGMUY7DQoJbWFyZ2luOiAwcHggMHB4IDZweDsNCgloZWlnaHQ6IDgwcHg7DQoJbWF4LWhlaWdodDogMTAwcHg7DQp9DQojaG9t'+
        'ZWZlZWRjZW50ZXJfcG9wdXAgI2F1dG9tb2RlX2JvZHkgdWwuZmVlZF9ib3ggbGkgew0KCWJvcmRlci1ib3R0b206IDJweCBzb2xp'+
        'ZCAjMUYxRjFGOw0KCW1hcmdpbjogMHB4IDBweCA2cHg7DQoJaGVpZ2h0OiA4MHB4Ow0KCW1heC1oZWlnaHQ6IDEwMHB4Ow0KfQ0K'+
        'I2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRfYm94IGxpLm5ld19wb3N0IHsNCgliYWNrZ3JvdW5kOiB1cmwoaHR0cDovL213'+
        'ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL3ptYy9uZXdfbWVzc2FnZV9jYWxsb3V0XzQ1eDQ1XzAxLnBuZykgbm8t'+
        'cmVwZWF0IDBweCAwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVlZF9ib3ggZGl2LmxpX3dyYXBwZXIgew0KCWJv'+
        'cmRlci10b3A6IDsNCglwYWRkaW5nOiA2cHggMTRweCAwcHggNHB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRf'+
        'Ym94IGxpIGltZy5mZWVkX2ljb24gew0KCWZsb2F0OiBsZWZ0Ow0KCWRpc3BsYXk6IGJsb2NrOw0KCXdpZHRoOiA3MHB4Ow0KfQ0K'+
        'I2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRfYm94IGxpLm5ld19wb3N0IGltZy5mZWVkX2ljb24gew0KCW1hcmdpbjogMTVw'+
        'eCAwIDAgMTVweDsNCgl3aWR0aDogNTVweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBkaXYuYnV0'+
        'dG9ucyB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWZvbnQtc2l6ZTogMTBweDsNCglmb250LXdlaWdodDogYm9sZDsNCgltYXJnaW46IDNw'+
        'eCAwcHggMHB4IDE0cHg7DQoJdGV4dC1hbGlnbjogcmlnaHQ7DQoJd2lkdGg6IDcwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9w'+
        'dXAgdWwuZmVlZF9ib3ggbGkgZGl2LmJvZHkgew0KCW1hcmdpbjogMHB4IDgwcHg7DQoJaGVpZ2h0OiA3MHB4Ow0KfQ0KI2hvbWVm'+
        'ZWVkY2VudGVyX3BvcHVwICNhdXRvbW9kZV9ib2R5IHVsLmZlZWRfYm94IGxpIGRpdi5ib2R5IHsNCgltYXJnaW4tbGVmdDogODBw'+
        'eDsNCgloZWlnaHQ6IDcwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVlZF9ib3ggbGkgaDQgew0KCWZvbnQtc2l6'+
        'ZTogMTRweDsNCglsaW5lLWhlaWdodDogMThweDsNCgltYXJnaW4tYm90dG9tOiA0cHg7DQoJcGFkZGluZy10b3A6IDJweDsNCn0N'+
        'CiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBwIHsNCglmb250LXNpemU6IDEycHg7DQoJbGluZS1oZWlnaHQ6'+
        'IDE1cHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVlZF9ib3ggbGkgZGl2LmJ1dHRvbnMgYS5zZXh5X2J1dHRvbl9u'+
        'ZXcgew0KCW1hcmdpbi1ib3R0b206IDZweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBkaXYuYnV0'+
        'dG9ucyBhLmlnbm9yZSB7DQoJdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsNCn0NCiNmZWVkX2NlbnRlcl9oZWFkZXIgcCwgI2hv'+
        'bWVmZWVkY2VudGVyX3BvcHVwIHVsLCAjaG9tZWZlZWRjZW50ZXJfcG9wdXAgbGksICNob21lZmVlZGNlbnRlcl9wb3B1cCBkbCwg'+
        'I2hvbWVmZWVkY2VudGVyX3BvcHVwIGR0LCAjaG9tZWZlZWRjZW50ZXJfcG9wdXAgZGQsICNob21lZmVlZGNlbnRlcl9wb3B1cCBo'+
        'MiwgI2hvbWVmZWVkY2VudGVyX3BvcHVwIGgzLCAjaG9tZWZlZWRjZW50ZXJfcG9wdXAgaDQsICNob21lZmVlZGNlbnRlcl9wb3B1'+
        'cCBwIHsNCgltYXJnaW46IDBweDsNCglwYWRkaW5nOiAwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgICNjb25maWdfcGFu'+
        'ZWwgew0KCW1hcmdpbjogNXB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICAuc2VsZWN0X3RhYiB7DQoJYm9yZGVyOiAxcHgg'+
        'c29saWQgIzRGNEY0RjsNCglmbG9hdDogbGVmdDsNCgloZWlnaHQ6IDE2MHB4Ow0KCW1hcmdpbjogMnB4Ow0KCW92ZXJmbG93OiBh'+
        'dXRvOw0KCXBhZGRpbmc6IDVweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCXdpZHRoOiAyNDBweDsNCn0NCiNob21lZmVlZGNlbnRl'+
        'cl9wb3B1cCAgLnNlbGVjdF90YWIgZGl2IHsNCglib3JkZXI6IDFweCBzb2xpZCAjMkYyRjJGOw0KCW1heC13aWR0aDogMjMwcHg7'+
        'DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCglwYWRkaW5nOiAycHg7CQ0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICAuc2VsZWN0X3Rh'+
        'YiBkaXYuc2VsZWN0ZWQgew0KCWJvcmRlcjogMXB4IHNvbGlkIHllbGxvdzsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAgLnNl'+
        'bGVjdF90YWIgZGl2IGlucHV0IHsNCglmbG9hdDogbGVmdDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAgLnNlbGVjdF90YWIg'+
        'ZGl2IHAgew0KCWZsb2F0OiBsZWZ0Ow0KCWN1cnNvcjogcG9pbnRlcjsNCgl3aWR0aDogMTk1cHg7DQoJbWF4LXdpZHRoOiAxOTVw'+
        'eDsNCglvdmVyZmxvdzogaGlkZGVuOw0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICAuY29uZmlnX3RhYiB7DQoJZmxvYXQ6IGxl'+
        'ZnQ7DQoJaGVpZ2h0OiAxNTBweDsNCglwYWRkaW5nOiAxMHB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJd2lkdGg6IDQyMHB4Ow0K'+
        'fQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICAuc2F2ZV9jb25maWcgew0KCWNsZWFyOiBib3RoOw0KCXBhZGRpbmctdG9wOiAxNnB4'+
        'Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNmZWVkbGlzdF9ib2R5LCAjYXV0b21vZGVfYm9keSAgew0KCXRleHQtYWxpZ246'+
        'IGxlZnQ7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI3BhbmVsX2NvbnRhaW5lciB7DQoJYmFja2dyb3VuZDogdXJsKGh0dHA6'+
        'Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy96bWMvdGFic19iZ18xeDQ1XzAxLmdpZikgcmVwZWF0LXggMHB4'+
        'IDEwMCU7DQoJaGVpZ2h0OiAzNXB4Ow0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCglvdmVyZmxvdzogdmlzaWJsZTsNCn0NCiNo'+
        'b21lZmVlZGNlbnRlcl9wb3B1cCAjcGFuZWxfY29udGFpbmVyIC5zZWFyY2hfYm94IHsNCglmbG9hdDogbGVmdDsNCgltYXJnaW46'+
        'IDBweCA1cHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCgl3aWR0aDogMzcwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI3Bh'+
        'bmVsX2NvbnRhaW5lciAuY29udHJvbF9ib3ggew0KCWZsb2F0OiByaWdodDsNCgltYXJnaW46IDBweCA1cHg7DQoJdGV4dC1hbGln'+
        'bjogY2VudGVyOw0KCXdpZHRoOiAzNDBweDsNCn0JDQojZmVlZF9jZW50ZXJfaGVhZGVyIHsNCglmbG9hdDogcmlnaHQ7DQoJaGVp'+
        'Z2h0OiA2NHB4Ow0KCW1hcmdpbi1yaWdodDogNTBweDsNCgltYXJnaW4tdG9wOiA2cHg7DQp9DQojZmVlZF9jZW50ZXJfaGVhZGVy'+
        'IGRsLnRvdGFsX3JlcXVlc3RzIHsNCglmbG9hdDogbGVmdDsNCglmb250LXdlaWdodDogYm9sZDsNCgltYXJnaW46IDE0cHggMHB4'+
        'IDBweDsNCn0NCiNmZWVkX2NlbnRlcl9oZWFkZXIgZGwudG90YWxfcmVxdWVzdHMgZHQgew0KCWJhY2tncm91bmQ6IHVybChodHRw'+
        'Oi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3Mvem1jL3RvdGFsX3JlcXVlc3RzX2J1YmJsZV8zOHgzOF8wMS5w'+
        'bmcpIG5vLXJlcGVhdCAwcHggMHB4Ow0KCWZsb2F0OiBsZWZ0Ow0KCWZvbnQtc2l6ZTogMThweDsNCgloZWlnaHQ6IDM4cHg7DQoJ'+
        'bGluZS1oZWlnaHQ6IDM4cHg7DQoJbWFyZ2luLXJpZ2h0OiA2cHg7DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KCXdpZHRoOiAzOHB4'+
        'Ow0KfQ0KI2ZlZWRfY2VudGVyX2hlYWRlciBkbC50b3RhbF9yZXF1ZXN0cyBkZCB7DQoJYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9t'+
        'd2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy96bWMvdG90YWxfcmVxdWVzdHNfYmdfMjAweDI0XzAxLnBuZykgbm8t'+
        'cmVwZWF0IDEwMCUgNTAlOw0KCWZvbnQtc2l6ZTogMTJweDsNCgloZWlnaHQ6IDM4cHg7DQoJbGluZS1oZWlnaHQ6IDM4cHg7DQoJ'+
        'bWFyZ2luLWxlZnQ6IDVweDsNCglwYWRkaW5nOiAwcHggMjBweCAwcHggMzlweDsNCgl3aGl0ZS1zcGFjZTogbm93cmFwOw0KfQ0K'
    );
    
    // make sure we have permissions and Initialize
    facebook.needAppPermission('read_stream,offline_access', function(success) {
        if (success !== true) {
            showHelpPopup({
                icon: 'info',
                title: 'facebook permissions',
                message: 'Home Feed Center need to give some facebook '+
                    'permission to Mafia Wars in order to work.'
            });
            return;
        }
        options.load(Initialize);
    });
}

/**
 * Modify secret stash for add new shorter button.
 * 
 * @param {Object} responseText
 */
function SecretStash(responseText) {
    var linkRegex = /'href':'([^']+)'\+targetUrlParam}/g;
    var box_id, link, rgx;
    if (!(box_id = /pop_box_(\d+)/.exec(responseText))) {
        return;
    }
    var getShort_click = function() 
    {
        var gift_box = $('#pop_box_' + box_id[1] + ' > div:eq(0) > div:eq(1)');
        var name = $('div:eq(0) > div:eq(0)', gift_box).text();
        name += ' (' + $('div:eq(0) > div:eq(2)', gift_box).text() + ') => ';
        
        $(this).hide();
        gift_box.height(157).css('text-align', 'center').empty();
        c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif').appendTo(gift_box);
        
        // get short url
        getShortURL(link, 
            function(shortURL) {
                gift_box.empty()
                $('<textarea readonly="readonly" rows="4" cols="64">')
                .appendTo(gift_box).val(name + shortURL);
            },
            function(errorText) {
                gift_box.empty()
                c$('span').appendTo(gift_box).css('margin-bottom', 8)
                .text('Error: '+errorText);
                gift_box.append('<br>');
                c$('a', 'target:_black').css('margin-left', 4).text('Open new Tab to get short URL')
                .attr('href', 'http://tinyurl.com/create.php?url=' + link).appendTo(gift_box);
            }
        );
    };
    while ((rgx = linkRegex.exec(responseText))) {
        if (/next_action=collect_loot/.test(rgx[1])) {
            link = rgx[1];
            break;
        }
    }
    if (!link) {
        log$('SecretStash: has not find any link.');
        return;
    }
    b$('Get Short Link').appendTo('#pop_box_' + box_id[1] + ' > div:eq(0) > div:eq(2)')
    .addClass('short white').click(getShort_click);
}

/**
 * Collect all cities and bank cash
 */
function CollectAllCities() {
    
    var message = new timerMessage('#message_log');
    var startCity = MW.currentCity();
    var abort_process = false;
    
    var options = new Config('collectall', defaults.collectall); 
    
    var collectAll_click = function() {
        if ($(this).attr('disabled')) {
            return;
        }
        $(this).attr('disabled', true);
        $(this).css('opacity', 0.5);
        $('#checkboxes_div').hide();
        options.fromDomElements();
        options.save(function() {
            travel(1);
        });
    };
    
    var popupElt = new domPopupObject('collectall_popup', {
        type: 'main',
        title: '<img src="'+global.resource.collectallcities_title+'">',
        width: 690,
        top: 40,
        onclose: function() {
            message.clear();
            abort_process = true;
            options.fromDomElements();
            options.save();
            delete message;
        },
        buttons: [{
            label: 'Collect All!',
            addClass: 'short white',
            onclick: collectAll_click
        }, {label: 'Exit'}]
    });
    
    var main_div = c$('div').appendTo(popupElt.content).addClass('clearfix');
    
    var getMsg = function(id, city) {
        switch(id) {
            case 1: return 'Traveling to ' + global.cities[city] + ' in %N%...';
            case 2: return 'Collecting all in ' + global.cities[city] + ' in %N%...';
            case 3: return 'Depositing cash in ' + global.cities[city] + ' in %N%...';
        }
    };
    
    function genCityBoobleDom(id, name) {
        
        var sqr = c$('div', 'class:booble,id:city_booble_'+id).appendTo(main_div);
        
        c$('p','class:booble_title').appendTo(sqr).text(name);
        
        var body = c$('div','class:city'+id).appendTo(sqr);
        c$('p', 'collect_from_'+id).text('Ready.').appendTo(body);
        c$('p', 'cash_in_'+id).appendTo(body)
        .append(c$('input:checkbox', 'collectall_collectcity'+id))
        .append(c$('label','for:collectall_collectcity'+id).text('Travel to this city.'))
        .append('<br />')
        .append(c$('input:checkbox', 'collectall_depositcity'+id))
        .append(c$('label','for:collectall_depositcity'+id).text('Deposit cash after collect it.'));
        
    }
    function setTimer(id, city, delay, callback) {
        if(options.get('noDelay')) {
            callback();
            return;
        }
        message.start(getMsg(id, city), delay, callback);
    }
    function travel(city) {
        if (abort_process || typeof global.cities[city] == 'undefined') {
            $('#message_log').text('All done!');
            MW.travel(startCity);
            return;
        }
        if (!options.get('collectCity'+city)) {
            $('#cash_in_' + city).html('The City is skipped by user.');
            travel(++city);
            return;
        }
        setTimer(1, city, 1, function()
        {
            $('#message_log').text('Traveling to ' + global.cities[city] + '...');
            MW.travel(city, function(new_city) {
                if (new_city === parseInt(city)) {
                    collectAll(city);
                }
                else {
                    message.start('Error traveling to '+global.cities[city]+' next city in %N%', 5, function() {
                        travel(++city);
                    });
                }
            });
        });
    }
    function depositAll(city, amount) {
        if (abort_process) {
            return;
        }
        if (isNaN(amount) || parseInt(amount) < 1) {
            $('#cash_in_' + city).html('No cash to deposit.');
            travel(++city);
            return;
        }
        if (!options.get('depositCity'+city)) {
            $('#cash_in_' + city).html('Deposit is skipped by user.');
            travel(++city);
            return;
        }
        setTimer(3, city, 2, function() 
        {
            $('#message_log').text('Depositing cash in ' + global.cities[city] + '...');
            MW.deposit(city, amount, function(result) 
            {
                $('#cash_in_' + city).html(result);
                travel(++city);
            });
        });
    }
    function collectAll(city) {
        if (abort_process) {
            return;
        }
        setTimer(2, city, 3, function() {
            $('#message_log').text('Collecting all in ' + global.cities[city] + '...');
            
            httpAjaxRequest({
                url: 'remote/' + MW.getIntURL('propertyV2', 'collectall', city) + '&requesttype=json',
                success: function(jsonData) 
                {
                    try {
	                    var data = $.parseJSON(jsonData.data);
	                    $('#collect_from_' + city).html(data.description||data.success_message);
	                    depositAll(city, data.cash);
                    }
                    catch(err) {
                        logErr$(err);
                        message.start('Error collecting, try again in %N%...', 5, function () {
                            collectAll(city);
                        });
                    }
                }
            });
        });
    }
    
    popupElt.addBase64Style(
        'I2NvbGxlY3RhbGxfcG9wdXAgZGl2LmJvb2JsZSB7DQoJbWFyZ2luOiA1cHggMTBweDsNCgl3aWR0aDogMzIwcHg7DQp9DQojY29s'+
        'bGVjdGFsbF9wb3B1cCBkaXYuYm9vYmxlIHAuYm9vYmxlX3RpdGxlIHsNCgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoaHR0'+
        'cDovL20ubWFmaWF3YXJzLmNvbS9td2ZiL2dyYXBoaWNzL21vYmlsZVdlYi8zMjAvYmctcHJvcC1oZHIucG5nKSByZXBlYXQteCBz'+
        'Y3JvbGwgMCUgMCU7DQoJYm9yZGVyOiB0aGluIHNvbGlkICM2QjZCNkI7DQoJLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA4cHggOHB4'+
        'IDBweCAwcHg7DQoJLW1vei1ib3JkZXItcmFkaXVzOiA4cHggOHB4IDBweCAwcHg7DQoJYm9yZGVyLXJhZGl1czogOHB4IDhweCAw'+
        'cHggMHB4Ow0KCWNvbG9yOiAjRThFOEU4Ow0KCWZvbnQtc2l6ZTogMThweDsNCglsaW5lLWhlaWdodDogMjdweDsNCgltYXJnaW46'+
        'IDBweDsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwIGRpdi5ib29ibGUgZGl2IHsNCglib3JkZXI6IHRoaW4gc29saWQgIzZCNkI2QjsN'+
        'Cgktd2Via2l0LWJvcmRlci1yYWRpdXM6IDBweCAwcHggOHB4IDhweDsNCgktbW96LWJvcmRlci1yYWRpdXM6IDBweCAwcHggOHB4'+
        'IDhweDsNCglib3JkZXItcmFkaXVzOiAwcHggMHB4IDhweCA4cHg7DQp9DQojY29sbGVjdGFsbF9wb3B1cCBkaXYuYm9vYmxlIGRp'+
        'diBwIHsNCgljb2xvcjogI0NEQ0RDRDsNCglmb250LXNpemU6IDE0cHg7DQoJaGVpZ2h0OiA0MHB4Ow0KCW1hcmdpbjogMHB4Ow0K'+
        'CXBhZGRpbmc6IDVweDsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwICNjaXR5X2Jvb2JsZV8xLCAjY2l0eV9ib29ibGVfMywgI2NpdHlf'+
        'Ym9vYmxlXzUsICNjaXR5X2Jvb2JsZV83IHsNCglmbG9hdDogbGVmdDsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwICNjaXR5X2Jvb2Js'+
        'ZV8yLCAjY2l0eV9ib29ibGVfNCwgI2NpdHlfYm9vYmxlXzYgew0KCWZsb2F0OiByaWdodDsNCn0NCiNjb2xsZWN0YWxsX3BvcHVw'+
        'IGRpdi5ib29ibGUgZGl2LmNpdHkxIHsNCgliYWNrZ3JvdW5kOiBibGFjayB1cmwoaHR0cDovL20ubWFmaWF3YXJzLmNvbS9td2Zi'+
        'L2dyYXBoaWNzL21vYmlsZVdlYi8zMjAvYmctcHJvcC1jaXR5MS5wbmcpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCU7DQp9CQ0KI2Nv'+
        'bGxlY3RhbGxfcG9wdXAgZGl2LmJvb2JsZSBkaXYuY2l0eTIgew0KCWJhY2tncm91bmQ6IGJsYWNrIHVybChodHRwOi8vbS5tYWZp'+
        'YXdhcnMuY29tL213ZmIvZ3JhcGhpY3MvbW9iaWxlV2ViLzMyMC9iZy1wcm9wLWNpdHkyLnBuZykgbm8tcmVwZWF0IHNjcm9sbCAw'+
        'JSAwJTsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwIGRpdi5ib29ibGUgZGl2LmNpdHkzIHsNCgliYWNrZ3JvdW5kOiBibGFjayB1cmwo'+
        'aHR0cDovL20ubWFmaWF3YXJzLmNvbS9td2ZiL2dyYXBoaWNzL21vYmlsZVdlYi8zMjAvYmctcHJvcC1jaXR5My5wbmcpIG5vLXJl'+
        'cGVhdCBzY3JvbGwgMCUgMCU7DQp9DQojY29sbGVjdGFsbF9wb3B1cCBkaXYuYm9vYmxlIGRpdi5jaXR5NCB7DQoJYmFja2dyb3Vu'+
        'ZDogYmxhY2sgdXJsKGh0dHA6Ly9tLm1hZmlhd2Fycy5jb20vbXdmYi9ncmFwaGljcy9tb2JpbGVXZWIvMzIwL2JnLXByb3AtY2l0'+
        'eTQucG5nKSBuby1yZXBlYXQgc2Nyb2xsIDAlIDAlOw0KfQ0KI2NvbGxlY3RhbGxfcG9wdXAgZGl2LmJvb2JsZSBkaXYuY2l0eTUg'+
        'ew0KCWJhY2tncm91bmQ6IGJsYWNrIHVybChodHRwOi8vbS5tYWZpYXdhcnMuY29tL213ZmIvZ3JhcGhpY3MvbW9iaWxlV2ViLzMy'+
        'MC9iZy1wcm9wLWNpdHk1LnBuZykgbm8tcmVwZWF0IHNjcm9sbCAwJSAwJTsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwIGRpdi5ib29i'+
        'bGUgZGl2LmNpdHk2IHsNCgliYWNrZ3JvdW5kOiBibGFjayB1cmwoaHR0cDovL20ubWFmaWF3YXJzLmNvbS9td2ZiL2dyYXBoaWNz'+
        'L21vYmlsZVdlYi8zMjAvYmctcHJvcC1jaXR5Ni5wbmcpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCU7DQp9DQojY29sbGVjdGFsbF9w'+
        'b3B1cCBkaXYuYm9vYmxlIGRpdi5jaXR5NyB7DQoJYmFja2dyb3VuZDogYmxhY2sgdXJsKGh0dHA6Ly9tLm1hZmlhd2Fycy5jb20v'+
        'bXdmYi9ncmFwaGljcy9tb2JpbGVXZWIvMzIwL2JnLXByb3AtY2l0eTcucG5nKSBuby1yZXBlYXQgc2Nyb2xsIDAlIDAlOw0KfQ0K'+
        'I2NvbGxlY3RhbGxfcG9wdXAgLnN0YXR1cyB7DQoJYmFja2dyb3VuZC1jb2xvcjogIzExMTsNCglib3JkZXI6IDFweCBzb2xpZCB3'+
        'aGl0ZTsNCgktd2Via2l0LWJvcmRlci1yYWRpdXM6IDZweCA2cHg7DQoJLW1vei1ib3JkZXItcmFkaXVzOiA2cHggNnB4Ow0KCWJv'+
        'cmRlci1yYWRpdXM6IDZweCA2cHg7DQoJaGVpZ2h0OiAyMHB4Ow0KCW1hcmdpbjogNXB4Ow0KCXBhZGRpbmc6IDVweCAxMHB4Ow0K'+
        'fQ=='
    );  
    
    for (var c in global.cities) {
        genCityBoobleDom(c, global.cities[c]);
    }
    var bottomDiv = c$('div','class:status').appendTo(popupElt.content);
    
    c$('strong', 'message_log').appendTo(bottomDiv).css('color', 'grey');
    
    c$('div', 'checkboxes_div').appendTo(bottomDiv)
    .append(c$('input:checkbox', 'collectall_nodelay'))
    .append(c$('label','for:collectall_nodelay').text('No delay.'));
    
    options.load(function() {
        options.toDomElements();
        
        // show popup
        popupElt.show();
    });
}

/**
 * Show a popup with all user links.
 */
function UserLinks() 
{
    var checkedLinks = new Config('checkeduserlinks', defaults.checkeduserlinks);
    var shortLinks = new Config('userlinks', {
        profile: '',
        promote: '',
        slots: ''
    });
    
    var Events = {
        publishAll_click: function() {
            var self = this;
            showGroupSelection(0, function(target, msg) {
                publishAll(target, msg, function() {
                    $(self).replaceWith(c$('b').text('Published!'));
                });
            });
            return false;
        },
        resetAll_click: function() {
            $.each(global.user_links, function(index, link) {
                if (!link.locked) {
	                delete link['longUrl'];
	                delete link['shortUrl'];
                }
            });
            shortLinks = new Config('userlinks', {});
            shortLinks.save(function() {
                popupElt.destroy();
                UserLinks();
            })
            return false;
        },
        publish_click: function() {
            var self  = this;
            var id    = $(self).attr('isfor');
            
            log$('id:'+id);
            if (!isValid(global.user_links[ id ].longUrl, self)) {
                return false;
            }
            publishConfig[ id ].url = global.user_links[ id ].longUrl;
            
            facebook.streamPublish(publishConfig[id], function() {
                $(self).replaceWith(c$('b').text('Published!'));
            });
            
            return false;
        },
        text_click: function() {
            $(this).select();
            return false;
        }
    };
        
    var popupElt = new domPopupObject('user_links', {
        title: 'My Links',
        type: 'normal',
        buttons: [{
            label: 'Publish All',
            addClass: 'short green sexy_announce_gray',
            onclick: Events.publishAll_click
        }, {
            label: 'Reset all links',
            addClass: 'short white',
            onclick: Events.resetAll_click
        }, {
            label: 'Close'
        }],
        onclose: function() {
            checkedLinks.fromDomElements();
            checkedLinks.save();
            shortLinks.save();
        }
    });
    
    var publishConfig = {
        'promote': {
            'name'        : 'Who doesn\'t want to be a gangster?',
            'description' : 'Promote me to your top-mafia and turn you into a really gangster!!',
            'pic'         : global.zGraphicsURL + 'levelup_test_2.jpg',
            'actionText'  : 'Promote me'
        },
        'crimespree': {
            'name'        : 'Who says crime doesn\'t pay?',
            'description' : 'Join me on a crime spree and find out what we loot.',
            'pic'         : global.zGraphicsURL + 'safehouse/v2/Safehouse-Loyalty_safe-open.gif',
            'actionText'  : 'Help or Sabotage'
        },
        'slots': {
            'name'        : '{*actor*} owns a Vegas Slot Machine!',
            'description' : '{*actor*} is offering free spins to all!',
            'pic'         : global.zGraphicsURL + 'vegas_slots_777.png',
            'actionText'  : 'Play Slots'
        },
        'energy': {
            'name'        : '{*actor*} wants an energy pack!',
            'description' : '{*actor*} needs an energy pack to help grow their criminal empire.',
            'pic'         : global.zGraphicsURL + 'mw_feed_energypack_90x90_02.gif',
            'actionText'  : 'Send one'
        },
        'bzcrew': {
            'name'        : '{*actor*} has an elite Crew in Brazil!',
            'description' : 'You can join {*actor*}\'s elite Crew in Brazil! Without your help, {*actor*} may not succeed.',
            'pic'         : global.zGraphicsURL + 'crew_module/crew_icon.png',
            'actionText'  : 'Accept'
        },
        'masteryboost': {
            'name'        : '{*actor*} is sharing a Mastery boost!',
            'description' : 'Here is a Mastery boost to help you do jobs faster. If you accept, we\'ll both get a boost to help us with jobs. Sweet!.',
            'pic'         : global.zGraphicsURL + 'AsnSocialJob/MFS-2x_mastery.jpg',
            'actionText'  : 'Accept'
        }
    };
    
    function isValid(link, button) {
        if (!/http/.test(link) || $(button).attr('disabled')) {
            return false;
        }
        $(button).attr('disabled', true).css('opacity', 0.4);
        return true;
    };
    
    function publishAll(target_id, message, callback) {
        var properties = new Object();
        var index = 1;
        
        checkedLinks.fromDomElements();
        checkedLinks.save();
        
        $.each(global.user_links, function(name, link) {
            if (/http/.test(link.longUrl) && checkedLinks.get(name)) {
                properties['#'+(index++)] = {
                    'text': link.name,
                    'href': link.longUrl
                };
            }
        });
        facebook.streamPublish({
            'target'      : target_id,
            'message'     : message,
            'name'        : '{*actor*} wants to share some personal links!',
            'properties'  : properties
        }, callback);
    }
    
    function setLink(id, name, shortUrl) {
    	$('#'+id+'_link').val(name + ' => ' + shortUrl);
    	if (Util.isSet(shortLinks.get(id))) {
    		shortLinks.set(id, shortUrl);
    	}
    }
    
    function genMainDom() {
    	$.each(global.user_links, function( id, link ) {
	        var elem = c$('dl', 'class:frame_box').appendTo(popupElt.content);
            
	        c$('dt').appendTo(elem)
            .append(c$('input:checkbox', 'id:checkeduserlinks_'+id))
            .append(c$('label','for:checkeduserlinks_'+id).text(link.name+' Link:'));
            
	        c$('dd').appendTo(elem).append(
	            c$('input:text', 'class:black,readonly:readonly,id:'+id+'_link')
	            .val('Loading...').click(Events.text_click)
	        );
	        if (Util.isSet(publishConfig[id])) {
	            c$('dd').css('float','right').appendTo(elem)
	            .append(b$('Publish','class:short white sexy_announce_gray,isfor:'+id).click(Events.publish_click));
	        }
    	});
    }
    
	function updateUserLinks(callback) {
	    var myCollection = new Collection(global.user_links);
        
	    // on every collection move, add long link if there is not found
	    myCollection.onMove(function(index, key, link) {
	        if (!link.req_type || link.longUrl) {
	            myCollection.MoveNext();
	            return;
	        }
	        MW.getGiftLink({
	            'message'  : 'Loading '+link.name+' link...',
	            'req_type' : link.req_type,
	            'req_name' : link.req_name,
	            'city'     : link.city, 
	            'success'  : function(longUrl) {
	                global.user_links[ key ].longUrl = longUrl;
	                myCollection.MoveNext();
	            }
	        });
	    });
        
	    myCollection.onEnd(callback);
        
	    myCollection.MoveFirst();
	}
    
    function Initialize() {
        genMainDom();
        
        updateUserLinks(function() {
	        // set saved data
	        global.user_links.profile.shortUrl  = shortLinks.get('profile');
	        global.user_links.promote.shortUrl  = shortLinks.get('promote');
	        global.user_links.slots.shortUrl    = shortLinks.get('slots');
            // add shor links if there is not found
            $.each(global.user_links, function(id, link) {
                log$(id+': '+link.shortUrl);
                if (link.shortUrl) {
                    setLink(id, link.name, link.shortUrl);
                }
                else {
                    getShortURL(link.longUrl, 
                        function(shortUrl)  { setLink(id, link.name, shortUrl); }, 
                        function(errorText) { $('#'+id+'_link').val(errorText); }
                    );
                }
            });
            // load checked links
            checkedLinks.load(function() {
                checkedLinks.toDomElements();
                popupElt.show();
            });
        });
    }
    
    popupElt.addBase64Style(
        'I3VzZXJfbGlua3MgLmJsYWNrIHsNCgl3aWR0aDogMzAwcHg7DQoJbWFyZ2luLWxlZnQ6IDVweDsNCglmb250LXdlaWdodDogYm9s'+
        'ZDsgDQoJY29sb3I6IHJnYigyMDgsIDIwOCwgMjA4KTsgDQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAxNTMpOyAN'+
        'CgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgDQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI3VzZXJfbGlua3MgZGwuZnJhbWVfYm94'+
        'IHsNCglib3JkZXI6IDFweCBzb2xpZCAjMkYyRjJGOw0KCW1pbi1oZWlnaHQ6IDI2cHg7DQoJbWFyZ2luOiA1cHg7DQoJcGFkZGlu'+
        'ZzogMTBweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI3VzZXJfbGlua3MgZGwuZnJhbWVfYm94IGR0LCBkZCB7DQoJZmxvYXQ6'+
        'IGxlZnQ7CQ0KfQ0KI3VzZXJfbGlua3MgZGwuZnJhbWVfYm94IGR0IHsNCgl3aWR0aDogMTYwcHg7DQp9'

    );
    shortLinks.load(Initialize);
}

/**
 * Show a popup with all craft types for build it.
 */
function CraftManager() 
{
    if (MW.currentCity() !== 1) {
        MW.travel(1, 'inner_page', function(city) {
            if (city !== 1) {
                showHelpPopup({
                    icon: 'error',
                    title: 'Error traveling',
                    message: 'I can\'t travel to New York to open Craft Manager.'+
                             'Please, go there and try again.'
                });
                return;
            }
            CraftManager();
        });
        return;
    }
    var arrow_url = global.zGraphicsURL+'gift_loop_arrow_green_39x50_01.png';
    var craftingUrl = MW.getIntURL('propertyV2', 'open_chop_crafting');
    var options = new Config('showcraftable', defaults.showcraftable);
    
    var crafts = {
        vehicles: [],
        weapons: [],
        armory: [],
        zoo: []
    };
    var popupElt = new domPopupObject('craftmanager_popup', {
        type: 'main',
        title: '<img src="'+global.resource.craftmanager_title+'">',
        width: 650,
        onclose: function() {
            options.fromDomElements();
            options.save(function() {
                delete options, crafts;
            });
        }
    });
    var gift_box_class = {
        'padding': 1,
        'width': 260,
        'height': 120,
        'float': 'left',
        'border': '1px solid rgb(153, 153, 153)',
        'overflow-x': 'hidden',
        'overflow-y': 'auto'
    };
    var gift_item_class = {
        'margin': 1, 
        'height': 45, 
        'border': '1px solid #333333', 
        'overflow': 'hidden', 
        'cursor': 'pointer'
    };
    var item_text_class = {
        'float': 'left', 
        'padding': '12px 0px',
        'height': 17, 
        'text-align': 'left',
        'overflow': 'hidden'
    }; 
    var itemList_onclick = function() {
        try {
            // mark selected item
            $('div[selected=true]', $(this).parent())
            .css('border', '1px solid #333333').attr('selected', 'false');
            
            $(this).css('border', '1px solid #FFFF00').attr('selected', 'true');
            
            // item description
            var iName = this.id;
            var cName = $(this).parent().attr('id');
            var col = crafts[cName];
            var div = $('#' + cName + '_detail_box').empty();
            
            c$('div').appendTo(div).css('float', 'left')
            .html(col[iName].attack + '<br>' + col[iName].defense + '<br>' + col[iName].special);
                     
            c$('div').appendTo(div).append(col[iName].required).css({
                'float': 'right',
                'margin-right': 10
            });
            // craft button
            div = $('#' + cName + '_button_box').empty();
            div.html(col[iName].button);
            if (e$('a', div) == null) {
                return;
            }
            if ($('a', div).text().match('Ask')) {
                return;
            }
            
            var href = $('a', div).attr('href');
            
            $('a', div).removeAttr('href').removeAttr('onclick').click(function() {
                
                $(this).hide();
                div.html(c$('img').attr('src', global.resource.ajax_loader));
                
                httpAjaxRequest({
                    url: href,
                    success: function(htmlText) 
                    {
                        var resultElt = $('div[class^=pop_box] > div > div', '<div>'+htmlText+'</div>').eq(2);
                        var resultText = (resultElt.length > 0 ? resultElt.html() : 'Error: can\'t get message.');
                        $('#' + cName + '_div').empty()
                        .append(c$('div').html(resultText).css({'margin': 10,'text-align': 'center'}));
                    }
                });
            });
        } 
        catch (err) {
            logErr$(err);
        }
        
    };
    // generate the current list of craftable items and a detail box.
    function genCraftListDom(elem, countDown, id, colItem) {
        var div = $('#' + id + '_div').empty().append(countDown);
        
        var craft_box = c$('div', id).css(gift_box_class).appendTo(div);

        c$('div').appendTo(div).append(c$('img').attr('src', arrow_url)).css({
            'float': 'left',
            'height': 120
        });
        c$('div', id + '_detail_box').appendTo(div).html($('#ChopShopTimer', elem).html()).css({
            'float': 'left',
            'text-align': 'left',
            'width': 300,
            'height': 80,
            'border': '1px solid #333333',
            'padding': 5
        });
        c$('div', id + '_button_box').appendTo(div).css({
            'float': 'left',
            'padding': 5,
            'width': 300
        });
        $('div[id^="rp_confirm_speedup"]', div).css({
            'left': 100,
            'top': 0
        });
        
        $('li[id^="VehicleObject"]', elem).each(function(index, domElement) {
            var itemId = id + '_list_item_' + index;
            var name = $('div[id^="RecipeName"]', domElement).html();
            var item = c$('div', itemId).appendTo(craft_box);
            
            item.css(gift_item_class).attr('selected', 'false').click(itemList_onclick);
            
            $('div[id^="VehiclePic"]', domElement).find('img').appendTo(item).css({
                'margin-right': 10,
                'float': 'left',
                'width': 40,
                'height': 40
            });
            c$('div', 'item_name').css(item_text_class).appendTo(item).html($.trim(name));

            colItem[itemId] = {
                attack: $('div[id^="ItemAttack"]', domElement).html(),
                defense: $('div[id^="ItemDefense"]', domElement).html(),
                special: $('div[id^="ItemSpecial"]', domElement).html(),
                required: $('div[id^="ItemsRequired"]/div', domElement).html(),
                button: $('div[id^="BuildButton"]', domElement).html()
            };
            if ($('#showcraftable_' + id).get(0).checked) {
                if (/<a\s*href="http/.test(colItem[itemId].button)) 
                    item.show();
                else 
                    item.hide();
            }
        });
    }
    // generate a title dom with name and checkbox option.
    function genTitleDom(name) {
        var title = c$('div').appendTo(popupElt.content).css({
            'margin-top': 10,
            'border-bottom': '1px solid rgb(85, 85, 85)',
            'text-align': 'left'
        });
        c$('span').css('margin-left', 20).text(name).appendTo(title);
        
        // name is used for id reference now, so lower case it
        name = name.toLowerCase();
        
        // checkbox div for show craftable only
        c$('div').appendTo(title).css({
            'float': 'right',
            'margin-right': 15
        }).append(
        $('<input type="checkbox" id="showcraftable_'+name+'">')
        // onclick checkbox fires it, if checked hide no craftable items.
        .click(function() {
            var name = this.id.match(/showcraftable_(.+)/)[1];
            if (this.checked) {
                $('div[id^=' + name + '_list_item_]').each(function(index, domElement) {
                    if (/<a\shref="http/.test(crafts[name][domElement.id].button)) 
                        $(domElement).show();
                    else 
                        $(domElement).hide();
                });
                
            }
            else
                $('div[id^='+name+'_list_item_]').show();   
        })
        ).append(c$('label').text('Show Craftable Only.').attr('for', 'showcraftable_'+name));
        
        // add ajax loader while it's first load.
        c$('div', name+'_div').height(120).appendTo(popupElt.content)
        .append(c$('img').attr('src', global.resource.ajax_loader)).css('padding', 10);
    }
    
    function buildCrafter(id, name) {
        // Get all crafting objects
        httpAjaxRequest({
            url: 'remote/' + craftingUrl + '&building_name=' + name,
            success: function(htmlText) 
            {
                htmlText = htmlText.replace(/"chopshopCountdown"/g, '"'+ id + 'Countdown"')
                                   .replace(/enhancedBuildablesFeedPublish/g, id+'FeedPublish');
                                      
                var script = h$(htmlText).find('script:regex(text,countdown|FeedPublish)');
                
                genCraftListDom(h$(htmlText), script, id, crafts[id]);
            }
        });
    }
    
    // Generate all 4 craft types
    genTitleDom('Vehicles');
    genTitleDom('Weapons');
    genTitleDom('Armory');
    genTitleDom('Zoo');
    
    // load options and make sure it's ready for generate the dom.
    options.load(function() {
        options.toDomElements();
        buildCrafter('vehicles', 'Chop%20Shop');
        buildCrafter('weapons', 'Weapons%20Depot');
        buildCrafter('armory', 'Armory');
        buildCrafter('zoo', 'Private%20Zoo');
    });

    // show the popup window.
    popupElt.show();
}

function MafiaWiper() 
{
    var abort_process = false;
    var users = [], groups_users;
    var options = new Config('mafiawiper', {
        ignored: []
    });
    
    var popupElt = new domPopupObject('mafiawiper_popup', {
        type: 'main',
        title: '<img src="'+global.resource.mafiawiper_title+'">',
        onclose: function() {
            abort_process = true;
            delete users;
        }
    });
    
    var evalData = function(html) {
        var groups_levels;        
        eval( Util.substr(html, 'var groups_levels', 'var friends_names') );
        groups_users = groups_levels;
    };
    
    var Events = {
        resetIgnored_click: function() {
            $('.member_list ul li').each(function(index, elem) {
                $(elem).show();
            });
            options.set('ignored', []);
            options.save();
            $(this).hide();
            return false;
        },
        ignore_click: function() {
            options.get('ignored').push($(this).attr('uid'));
            options.save();
            $(this).parent().parent().fadeOut(500, function() {
                $('#remove_ignored').css('display','inline');
            });
            
            return false;
        },
        profile_click: function() {
            var userId = $(this).attr('uid');
            $(this).removeClass('white').parent().parent().css('border-color', '#777');
            unsafeWindow.open('http://www.facebook.com/profile.php?id=' + userId, '_black');
            return false;
        },
        remove_click: function() {
            if ($('#ask_for_delete').attr('checked')) {
                if (!confirm('Are you sure to remove?')) 
                    return false;
            }
            removeUser(this.id.substring(5));
            return false;
        },
        removeAll_click: function() {
            if (confirm('Are you really sure to remove ALL?')) {
                removeAll();
            }
            return false;
        },
        createFriendList_click: function() {
            var self = this;
            if ($(self).attr('disabled')) {
                return false;
            }
            $(self).attr('disabled', true).css('opacity', 0.4);
            facebook.needAppPermission('manage_friendlists', function(success) {
                if (success == true) {
                    facebook.friendlistCreate($('#friendlistname').val(), function(r) {
                        if (r && r.id) {
                            addUsersToFriendList(r.id);
                        }
                        else {
                            showHelpPopup({
                                icon: 'error',
                                title: 'Error creating friendlist',
                                message: 'Make sure the friendlist name doesn\'t exists.'
                            });
                            $(self).css('opacity', 1).removeAttr('disabled');
                        }
                    });
                }
                else {
                    $(self).css('opacity', 1).removeAttr('disabled');
                }
            });
        }
    };
    popupElt.addBase64Style(
        'I21hZmlhd2lwZXJfcG9wdXAgLmJsYWNrIHsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogcmdiKDIwOCwgMjA4LCAyMDgp'+
        'OyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNrOyANCglm'+
        'b250LXNpemU6IDE0cHg7DQp9DQojbWFmaWF3aXBlcl9wb3B1cCAuZnJhbWVfYm94IHsNCglib3JkZXI6IDFweCBzb2xpZCAjMkYy'+
        'RjJGOw0KCWhlaWdodDogNDBweDsNCgltYXJnaW46IDVweDsNCglwYWRkaW5nOiAxMHB4IDIwcHggMHB4Ow0KCXRleHQtYWxpZ246'+
        'IGxlZnQ7DQp9DQojbWFmaWF3aXBlcl9wb3B1cCBpbnB1dCB7DQoJdmVydGljYWwtYWxpZ246IHRvcDsNCn0NCiNtYWZpYXdpcGVy'+
        'X3BvcHVwIC5mcmFtZV9ib3ggaW5wdXQgew0KCXZlcnRpY2FsLWFsaWduOiBtaWRkbGU7DQoJd2lkdGg6IDIzMHB4Ow0KCW1hcmdp'+
        'bi1yaWdodDogNXB4Ow0KCW1hcmdpbi1sZWZ0OiA1cHg7DQp9DQojbWFmaWF3aXBlcl9wb3B1cCAuZnJhbWVfYm94IGEgew0KCWZs'+
        'b2F0OiByaWdodDsNCn0NCiNtYWZpYXdpcGVyX3BvcHVwIC5pbmZvIHsNCgloZWlnaHQ6IDUwcHg7DQoJbWFyZ2luOiA1cHg7DQp9'+
        'DQojbWFmaWF3aXBlcl9wb3B1cCAubWVtYmVyX2xpc3Qgew0KCWJvcmRlcjogMXB4IHNvbGlkICM5OTk7DQoJaGVpZ2h0OiAzODBw'+
        'eDsNCgltYXJnaW46IDRweDsNCglwYWRkaW5nOiA1cHg7DQoJb3ZlcmZsb3cteDogaGlkZGVuOw0KCW92ZXJmbG93LXk6IGF1dG87'+
        'DQp9DQojbWFmaWF3aXBlcl9wb3B1cCAubWVtYmVyX2xpc3QgdWwgew0KCXBhZGRpbmc6IDBweDsNCgltYXJnaW46IDBweDsNCgls'+
        'aXN0LXN0eWxlLXR5cGU6IG5vbmU7DQp9DQojbWFmaWF3aXBlcl9wb3B1cCAubWVtYmVyX2xpc3QgdWwgbGkgew0KCWJvcmRlcjog'+
        'MXB4IHNvbGlkICMzMzM7DQoJaGVpZ2h0OiA0NXB4Ow0KCW1hcmdpbjogMXB4Ow0KCW92ZXJmbG93OiBoaWRkZW47DQp9DQojbWFm'+
        'aWF3aXBlcl9wb3B1cCAubWVtYmVyX2xpc3QgdWwgbGkgc3Bhbi51c2VyX25hbWUgew0KCWZsb2F0OiBsZWZ0Ow0KCW1heC13aWR0'+
        'aDogNDAwcHg7DQoJcGFkZGluZzogMTJweCA1cHg7DQp9DQojbWFmaWF3aXBlcl9wb3B1cCAubWVtYmVyX2xpc3QgdWwgbGkgLmJ1'+
        'dHRvbnN7DQoJZmxvYXQ6IHJpZ2h0Ow0KCXBhZGRpbmc6IDhweCA1cHg7DQp9DQojbWFmaWF3aXBlcl9wb3B1cCAubWVtYmVyX2xp'+
        'c3QgdWwgbGkgLmJ1dHRvbnMgYXsNCgltYXJnaW4tbGVmdDogNXB4Ow0KfQ0K'
    );
    
    c$('center', 'class:info').appendTo(popupElt.content)
    .append(c$('div', 'top_div').html('Loading...'))
    .append(
        c$('div', 'loading_div').css('margin-top', 5)
        .append(c$('img').attr('src', global.resource.ajax_loader).css('vertical-align', 'middle'))
        .append(
            c$('span', 'wiper_msg_log').text('Loading Mafia members...').css({
                'margin-left': 10,
                'font-weight': 'bold'
            })
        )
    );
    
    c$('div', 'id:create_friend_list').hide()
    .appendTo(c$('div', 'class:frame_box clearfix').appendTo(popupElt.content))
    .append(c$('label', 'for:friendlistname').text('You can create a new Facebook FriendList:'))
    .append(c$('input:text', 'id:friendlistname,class:black').val('No Playing Mafia Wars'))
    .append(b$('Create', 'class:short white').click(Events.createFriendList_click));
    
    c$('div', 'class:clearfix').css('height',25).appendTo(popupElt.content)
    .append(c$('input:checkbox', 'checked:checked,id:ask_for_delete'))
    .append(c$('label', 'for:ask_for_delete').text('Ask for remove'))
    .append(
        c$('a', 'remove_ignored').text('Reset ignored members').hide()
        .css('margin-left',20).click(Events.resetIgnored_click)
    );
    
    c$('ul').appendTo(c$('div', 'class:member_list').appendTo(popupElt.content));
    
    options.load(popupElt.show);
    
    // get all mafia members
    httpAjaxRequest({
        url: 'remote/' + MW.getIntURL('gift'),
        success: function(htmlText) 
        {
            evalData(htmlText);
            
            facebook.friendsGetAppUsers(function(result) {
                for (i in groups_users) {
                    if (result.indexOf(parseInt(i)) == -1) {
                        users.push({
                            'id': i,
                            'name': $.trim(groups_users[i])
                        });
                    }
                }
                // show total no mafia members
                $('#top_div').html('Members that are not playing Mafia Wars: ' + users.length);
                $('#loading_div').empty().append(
                    c$('div').append(b$('Remove All','class:short red').click(Events.removeAll_click))
                );
                
                showResults();
                delete groups_users;
            });
        }
    });
    
    function removeUser(index, callback) {
        if (abort_process) {
            return;
        }
        var parent = $('#user_' + index, '.member_list').parent();
        c$('img').attr('src', global.resource.ajax_loader).appendTo(parent.empty());
        
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('stats') + '&user=' + users[index].id,
            success: function(htmlText) 
            {
                httpAjaxRequest({
                    url: $('.zy_popup_box_body_dark a:regex(href,xw_action=remove)', htmlText).attr('href'),
                    success: function(htmlText) 
                    {
                        if (MW.update(htmlText)) {
                            parent.html(Util.setColor('User has been removed.', 'green'));
                        }
                        else {
                            parent.html(Util.setColor('Error. but maybe removed.', 'red'));
                        }
                        delete users[index];
                        callback && callback();
                    }
                });
            }
        });  
    }
    
    function removeAll() {
        var last_index = 0;
        function removeNext() {
            if (last_index < users.length) {
                if (typeof(users[last_index]) !== 'undefined' && 
                    options.get('ignored').indexOf(String(users[last_index].id)) === -1) 
                {
                    $('#loading_div').html('Deleting '+users[last_index].name);
                    removeUser(last_index++, removeNext);
                }
                else 
                {
                    last_index++;
                    removeNext();
                }
            }
            else {
                $('#loading_div').html('All members has been removed.');
            }
        }
        removeNext();
    }
    
    function showResults() 
    {
        // fill the list of memebers
        var listElt = $('.member_list ul', popupElt.content); 
        var profileBtn, addedElt;
            
        for (var i = 0; i < users.length; i++) 
        {
            if (users[i].name) {
                
                addedElt = c$('li').appendTo(listElt)
                .append(c$('span', 'class:user_name').text(users[i].name))
                .append(
                    c$('div', 'class:buttons')
                    .append(b$('FB Profile', 'uid:'+users[i].id +',class:short white').click(Events.profile_click))
                    .append(b$('Remove', 'class:short red,id:user_' + i).click(Events.remove_click))
                    .append(b$('Ignore', 'class:short green,uid:'+users[i].id).click(Events.ignore_click))
                );
                
                if (options.get('ignored').indexOf(users[i].id) !== -1) {
                    addedElt.hide();
                } 
            }
        }
        $('#create_friend_list').show();
        if (options.get('ignored').length > 0) {
            $('#remove_ignored').css('display','inline');
        }
    }
    function addUsersToFriendList(friendListID) {
        var len = users.length, message;
        
        $('#create_friend_list').empty()
        .append(c$('img').css('vertical-align', 'middle').attr('src', global.resource.ajax_loader))
        .append(message = c$('span').css('margin-left', 5));
        
        function addMember(index) {
            if (index >= len) {
                $('#create_friend_list').html('FriendList successfully created.');
                return;
            }
            if (users[index] && users[index].id) {
                message.text('Adding user (' + (index+1) + '/'+ len + ')...');
                facebook.friendlistAdd(friendListID, users[index].id, function() {
                    addMember(++index);
                });
            }
            else {
                addMember(++index);
            }
        }
        addMember(0);
    }
}

/**
 * Send multiple items from inventory.
 */
function MultiGifter(select_gift_cat, select_gift_id) 
{
    if (typeof(global.popups['multigifter_popup']) !== 'undefined') {
        if (select_gift_cat && select_gift_id) {
            global.popups['multigifter_popup'].selectGift(select_gift_cat, select_gift_id);
        }
        global.popups['multigifter_popup'].show();
        return;
    }
    
    var sendTimer = new timerMessage('#next_gift_timer');
    var already_working = false;
    var daily_left, gift_count_avail, gift_key;
    var Queue = [], plainTextLog = '';
    var gift_categories = {
        0: 'Collections',
        1: 'Loot',
        2: 'Boosts'
    };
    
    var options = new Config('multigift', defaults.multigift);
    
    var InventoryFilter = new Object();
    
    var collectionFilter = {
        'Crew': {
            'Bring Back the Pack'       : [300022, 300023, 300024, 300025, 300026, 300027, 300028],
            'Prototype Carjacking'      : [300001, 300002, 300003, 300004, 300005, 300006, 300007],
            'Theft of a Drone'          : [300008, 300009, 300010, 300011, 300012, 300013, 300014],
            'Weapons Shipment Hijackin' : [300015, 300016, 300017, 300018, 300019, 300020, 300021]
        },
        'Special': {
            'Silence Don Romo'    : [100036, 100037, 100038, 100039, 100040, 100041, 100042],
            'Mystery Bag'         : [400008, 400009, 400010, 400011, 400012, 400013, 400014],
            'Slots'               : [100029, 100030, 100031, 100032, 100033, 100034, 100035],
            'Global Cup'          : [100022, 100023, 100024, 100025, 100026, 100027, 100028],
            'ST. Patrick\'s Day'  : [100008, 100009, 100010, 100011, 100012, 100013, 100014],
            'Chinese New Year'    : [400001, 400002, 400003, 400004, 400005, 400006, 400007],
            'Valentine Day'       : [100001, 100002, 100003, 100004, 100005, 100006, 100007],
            'Tools of the Trade'  : [500001, 500002, 500003, 500004, 500005, 500006, 500007],
            'Stolen Diamond'      : [500008, 500009, 500010, 500011, 500012, 500013, 500014],
            'Pantheon Trophies'   : [705001, 705002, 705003, 705004, 705005, 705006, 705007],
            'Continental Rings'   : [705008, 705009, 705010, 705011, 705012, 705013, 705014],
            'Championship Belts'  : [705015, 705016, 705017, 705018, 705019, 705020, 705021],
            'Easter Crime Basket' : [100015, 100016, 100017, 100018, 100019, 100020, 100021]
        },
        'Mission': {
            'Operations': [800001, 800002, 800003, 800004, 800005, 800006, 800007]
        },
        'New York': {
            'Diamond Flush'     : [1036, 1037, 1038, 1039, 1040, 1041, 1042],
            'Heart Flush'       : [1043, 1044, 1045, 1046, 1047, 1048, 1049],
            'Sculptures'        : [1022, 1023, 1024, 1025, 1026, 1027, 1028],
            'Poker Chips'       : [1029, 1030, 1031, 1032, 1033, 1034, 1035],
            'Club Flush'        : [1050, 1051, 1052, 1053, 1054, 1055, 1056],
            'Boxing'            : [1085, 1086, 1087, 1088, 1089, 1090, 1091],
            'Cigars'            : [1001, 1002, 1003, 1004, 1005, 1006, 1007],
            'Spade Flush'       : [1057, 1058, 1059, 1060, 1061, 1062, 1063],
            'Billiards'         : [1092, 1093, 1094, 1095, 1096, 1097, 1098],
            'Rings'             : [1008, 1009, 1010, 1011, 1012, 1013, 1014],
            'Ties'              : [1064, 1065, 1066, 1067, 1068, 1069, 1070],
            'Paintings'         : [1015, 1016, 1017, 1018, 1019, 1020, 1021],
            'Cufflinks'         : [1071, 1072, 1073, 1074, 1075, 1076, 1077],
            'Barber'            : [1099, 1100, 1101, 1102, 1103, 1104, 1105],
            'Great Race Horses' : [1078, 1079, 1080, 1081, 1082, 1083, 1084],
            'Daily Chance'      : [1106, 1107, 1108, 1109, 1110, 1111, 1112],
            'Money Laundering'  : [1113, 1114, 1115, 1116, 1117, 1118, 1119]
        },
        'Cuba': {
            'Rum Drinks'      : [2001, 2002, 2003, 2004, 2005, 2006, 2007],
            'Tropical Fruits' : [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            'Entertainers'    : [2015, 2016, 2017, 2018, 2019, 2020, 2021],
            'Tropical Fish'   : [2022, 2023, 2024, 2025, 2026, 2027, 2028],
            'Beards'          : [2029, 2030, 2031, 2032, 2033, 2034, 2035]
        },
        'Moscow': {
            'Prison Tattoos'     : [3001, 3002, 3003, 3004, 3005, 3006, 3007],
            'Matryoshka Dolls'   : [3008, 3009, 3010, 3011, 3012, 3013, 3014],
            'Russian Leaders'    : [3015, 3016, 3017, 3018, 3019, 3020, 3021],
            'Vodka Drinks'       : [3022, 3023, 3024, 3025, 3026, 3027, 3028],
            'Soviet Memorabilia' : [3029, 3030, 3031, 3032, 3033, 3034, 3035],
            'Faberge Egg'        : [3036, 3037, 3038, 3039, 3040, 3041, 3042]
        },
        'Las Vegas': {
            'Matchbooks'      : [5057, 5058, 5059, 5060, 5061, 5062, 5063],
            'Cactus'          : [5036, 5037, 5038, 5039, 5040, 5041, 5042],
            'Mojave Animals'  : [5043, 5044, 5045, 5046, 5047, 5048, 5049],
            'Poker Hands'     : [5050, 5051, 5052, 5053, 5056, 5054, 5055]
        },
        'Bangkok': {
            'Chess Set' : [4001, 4002, 4003, 4004, 4005, 4006, 4007],
            'Masks'     : [4008, 4009, 4010, 4011, 4012, 4013, 4014],
            'Spices'    : [4015, 4016, 4017, 4018, 4019, 4020, 4021],
            'Carvings'  : [4022, 4023, 4024, 4025, 4026, 4027, 4028],
            'Orchids'   : [4029, 4030, 4031, 4032, 4033, 4034, 4035]
        },
        'Italy': {
            'Dinner Is Served'   : [6001, 6002, 6003, 6004, 6005, 6006, 6007],
            'Roman Standards'    : [6008, 6009, 6010, 6011, 6012, 6013, 6014],
            'The Great Inventor' : [6015, 6016, 6017, 6018, 6019, 6020, 6021],
            'Famous Rulers'      : [6022, 6023, 6024, 6025, 6026, 6027, 6028]
        }
    };
    
    /**
     * @constructor
     * @param {Number} itemsPerPage
     * @return {userController}
     */
    var userController = function(itemsPerPage) {
        var userIds, friends, currPage, currCat = 0;
        
        this.setItemsPerPage = function(n) {
            itemsPerPage = n;
        };
        
        this.setCat = function(cat) {
            if (typeof(friends[cat]) !== 'undefined') {
                currCat = cat;
            }
        };
        
        this.currentPage = function(set) {
            if (set = parseInt(set)) {
                return currPage[currCat] = (set < 1) ? 1 : (set > this.pages()) ? this.pages() : set;
            }
            return currPage[currCat];
        };
        
        this.getPageItems = function(page) {
            if (!options.get('userPages')) {
                return friends[currCat];
            }
            var maxLength = friends[currCat].length;
            var startIndex = (this.currentPage(page) - 1) * itemsPerPage;
            var endIndex = startIndex + itemsPerPage;
            
            return friends[currCat].slice(startIndex, (endIndex > maxLength ? maxLength : endIndex));
        };
        
        this.getItem = function(id) {
            return userIds[id];
        };
        
        this.getName = function(id) {
            if (userIds[id]) {
                return userIds[id].name;
            }
            return 'ERROR';
        };
        
        this.pages = function() {
            if (options.get('giftPages')) {
                return Math.floor(friends[currCat].length / itemsPerPage) + 1;
            }
            return 1;
        };
        
        this.updateFavorites = function() {
            var fav = options.get('userFav');
            friends[1] = [];
            currPage[1] = 1;
            for (var i = 0; i < fav.length; i++) {
                friends[1].push(userIds[fav[i]]);
            }
        };
        
        this.search = function(text) {
            if (typeof(text) !== 'string') {
                text = '';
            }
            friends[2] = [];
            currPage[2] = 1;
            if (text.length < 1) {
                return;
            }
            for (var i = 0; i < friends[0].length; i++) {
                if (friends[0][i].name.toLowerCase().match(text.toLowerCase())) 
                    friends[2].push(friends[0][i]);
            }
        };
        
        this.update = function(data) {
            resetData();
            for (var i in data.groups_levels) {
                if (!data.groups_levels[i].match('Unknown')) {
                    friends[0].push(userIds[i] = {
                        'id'   : i,
                        'name' : data.groups_levels[i]
                    });
                }
            }
            friends[0].sort(_Util.sortByName);
            this.updateFavorites();
        }
        
        function resetData() {
            friends = {0: [],1: [],2: []};
            userIds = {};
            currPage = {0: 1,1: 1,2: 1};
            currCat = 0;
        }
        resetData();
        return this;
    };
    /**
     * @constructor
     * @param {Number}
     *            itemsPerPage
     * @return {giftController}
     */
    var giftController = function(itemsPerPage) {
        var freeGift, filterItems, giftIds, currPage, currCat = 0;
        
        this.selected = {};
        
        this.setItemsPerPage = function(n) {
            itemsPerPage = n;
        };
        
        this.setCat = function(cat) {
            if (typeof(freeGift[cat]) !== 'undefined') {
                currCat = cat;
            }
        };
        
        this.currentPage = function(set) {
            if (set = parseInt(set)) {
                return currPage[currCat] = (set < 1) ? 1 : (set > this.pages()) ? this.pages() : set;
            }
            return currPage[currCat];
        };
        
        this.getPageItems = function(page) {
            var category = getCategory();
            if (!options.get('giftPages')) {
                return category;
            }
            var maxLength = category.length;
            var startIndex = (this.currentPage(page) - 1) * itemsPerPage;
            var endIndex = startIndex + itemsPerPage;
            
            return category.slice(startIndex, (endIndex > maxLength ? maxLength : endIndex));
        };
        
        this.getAllItems = function() {
            return getCategory().slice();
        };
        
        this.getItem = function(cat, id) {
            return giftIds[cat][id];
        };
        
        this.pages = function() {
            if (options.get('giftPages')) {
                return Math.floor(getCategory().length / itemsPerPage) + 1;
            }
            return 1;
        };
        
        this.lootFilter = function(nf) {
            filterItems[1] = [];
            currPage[1] = 1;
            
            var gift, bActive, bInactive, bAttack, bDefense, bType, bQuality, bLocation; 
            var nEvalAttack  = (parseInt(nf.attack.q) || 0) * nf.attack.op;
            var nEvalDefense = (parseInt(nf.defense.q) || 0) * nf.defense.op;
            
            for (var i = 0; i < freeGift[1].length; i++) {
                gift = freeGift[1][i];
                
                bActive   = (gift.active == true && nf.active) || (gift.active == false && nf.inactive);
                bAttack   = nEvalAttack == 0 || (gift.attack * nf.attack.op) > nEvalAttack;
                bDefense  = nEvalDefense == 0 || (gift.defense * nf.defense.op) > nEvalDefense;
                bType     = nf.ItemTypes.length === 0 || nf.ItemTypes[gift.type] === true;
                bQuality  = nf.Qualities.length === 0 || nf.Qualities[gift.quality] === true;
                bLocation = nf.Locations.length === 0 || nf.Locations[gift.location] === true;
                
                if (bActive && bAttack && bDefense && bType && bQuality && bLocation) {
                    filterItems[1].push(gift);
                }
            }
        };
        
        this.clearLootFilter = function() {
            filterItems[1] = null;
        };
        
        this.collectionFilter = function(group, id) {
            if (group == 'all') {
                filterItems[0] = null;
                return;
            }
            filterItems[0] = [];
            currPage[0] = 1;
            
            var filterArray = [], gift;
            
            if (id == 'all') {
                $.each(collectionFilter[group], function(name, arr) {
                    filterArray = $.merge(filterArray, arr);
                });
            }
            else {
                filterArray = collectionFilter[group][id];
            }
            for (var i = 0; i < freeGift[0].length; i++) {
                gift = freeGift[0][i];
                
                if (filterArray.indexOf(parseInt(gift.id)) !== -1) {
                    filterItems[0].push(gift);
                }
            }
        };
        
        this.clearCollectionFilter = function() {
            filterItems[0] = null;
        };
        
        this.search = function(text) {
            if (typeof(text) !== 'string') {
                text = '';
            }
            freeGift[4] = [];
            currPage[4] = 1;
            if (text.length < 1) {
                return;
            }
            for (var c in gift_categories) {
                for (var i = 0; i < freeGift[c].length; i++) {
                    if (freeGift[c][i].name.toLowerCase().match(text.toLowerCase())) 
                        freeGift[4].push(freeGift[c][i]);
                }
            }
        };
        
        this.updateFavorites = function() {
            var fav = options.get('giftFav');
            freeGift[3] = [];
            currPage[3] = 1;
            var cat = 0, id = 0;
            for (var i = 0; i < fav.length; i++) {
                cat = fav[i].charAt(0);
                id = fav[i].substring(2);
                freeGift[3].push(giftIds[cat][id]);
            }
        };
        
        this.select = function(cat, id) {
            this.selected = giftIds[cat][id];
        };
        
        this.updateAmounts = function(new_amounts) {
            var item;
            for (var c in gift_categories) {
                for (var i = 0; i < freeGift[c].length; i++) {
                    freeGift[c][i].amount = new_amounts[c][freeGift[c][i].id];
                }
            }
        };
        
        this.update = function(data, Items) {
            var item, info;
            resetData();
            for (var c in gift_categories) {
                for (var i in data.item_names[c]) {
                    freeGift[c].push(item = giftIds[c][i] = {
                        cat     : c,
                        id      : i,
                        name    : data.item_names[c][i],
                        amount  : data.item_amounts[c][i],
                        img     : data.item_imgs[c][i]
                    });
                    if (c == 1 && typeof(info = Items.data[i]) !== 'undefined') {
                        item.type     = info.type;
                        item.attack   = info.attack;
                        item.defense  = info.defense;
                        item.quality  = info.quality;
                        item.location = info.location;
                        item.active   = info.active;
                        item.eqoff    = info.equipped_offense;
                        item.eqdef    = info.equipped_defense;
                        item.image    = info.image;
                    }
                }
            }
            this.updateFavorites();
        };
        
        function getCategory() {
            return filterItems[currCat] || freeGift[currCat];
        }
        
        function resetData() {
            filterItems = {0: null, 1: null};
            freeGift = {0: [], 1: [], 2: [], 3: [], 4: [], 5: []};
            giftIds = {0: {}, 1: {}, 2: {}};
            currPage = {0: 1, 1: 1, 2: 1, 3: 1, 4: 1};
            currCat = 0;
        }
        
        resetData();
        return this;
    };
    
    var Inventory = new giftController(50);
    var Friends = new userController(50);
    var Controller = {
        user: Friends,
        gift: Inventory
    };
    
    var popupElt = new domPopupObject('multigifter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.multigifter_title+'">',
        persistent: true,
        onclose: function() {
            sendTimer.clear();
            Events.cancel_click();
            options.fromDomElements();
            options.save();
        }
    });
    
    var _Util = {
        changeCategory: function(name, index) {
            $('#'+name+'_category')[0].selectedIndex = index;
            $('#'+name+'_category').change();
        },
        namesFromIds: function(ids) {
            var names = [];
            for (var i = 0; i < ids.length; i++) {
                names.push(Friends.getName(ids[i]));
            }
            return names;
        },
        sortByName: function(a, b) {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        },
        isSameArray: function(arr1, arr2) {
            var max = Math.max(arr1.length, arr2.length);
            for (var i = 0; i < max; i++) {
                if (arr1[i] != arr2[i]) {
                    return false
                }
            }
            return true;
        },
        isSameGift: function(gift1, gift2) {
            return (gift1 === gift2 || gift1.id == gift2.id && gift1.cat == gift2.cat);
        },
        getGift: function() {
            return Inventory.selected;
        },
        getUsers: function(elem) {
            var users = [];
            
            $('#selected_users').children().each(function(i, elem) {
                users.push(elem.id.substring(5));
            });
            
            return users;
        },
        deleteJob: function(id) {
            if (Queue.length > 1) {
                Queue.splice(id, 1);
                rebuildBatchProcess();
            }
            else {
                Events.delQueue_click();
            }
            tryShowControls();
        }
    };
    
    var showDiv = function(name, ms) {
        if (already_working)
            return;
        $('*[id*=_controls]').hide();
        if (ms)
            $('#'+name+'_controls').fadeIn(ms);
        else
            $('#'+name+'_controls').show();
    };
    
    var showTab = function(name) {
        $('*[id^=tab_]', popupElt.content).hide();
        $('#tab_' + name, popupElt.content).show();
    };
    
    var cancelProcess = function() {
        Queue = [];
        already_working = false
        showDiv('finish', 'slow');
    };
    
    var tryShowControls = function(ms) {
        if (Queue.length > 0 || Inventory.selected.id && 
            $('#selected_users').children().length > 0) 
        {
            showDiv('start', ms);
        }
        else {
            $('#global_messages').css('color', 'white')
            .html('You have ' + gift_count_avail + ' gifts left to send today (10000 daily).');
            showDiv('message', ms);
        }
    };
    
    var getGiftData = function(html) {
        var groups_levels, 
            item_amounts, 
            item_names, 
            item_imgs, 
            gifts_daily_left;
        
        eval( Util.substr(html, 'var groups_levels', 'var friends_names') );
        
        return {
            'gifts_daily_left' : gifts_daily_left,
            'groups_levels'    : groups_levels,
            'item_amounts'     : item_amounts,
            'item_names'       : item_names,
            'item_imgs'        : item_imgs
        };
    };
    
    var getInventoryData = function(html) {
        var Items, Item;
        
        eval( Util.substr(html, 'var Items', '</script>') );
        eval( Util.substr($('head').html(), 'var Item', '</script>') );
        
        Inventory.all = Items.data;
        InventoryFilter.ItemTypes = Item.Types;
        InventoryFilter.Locations = Item.Locations;
        InventoryFilter.Qualities = Item.Qualities;
        
        return Items;
    };
    
    // EVENTS
    var Events = {
        addAllGifts_click: function() {
            var sAsk = 'You will add '+Controller.gift.getAllItems().length;
            var nQuantity = prompt(sAsk+' gifts.\nSet up the quantity of every one to send:', 1);
            
            if ((nQuantity = parseInt(nQuantity)) > 0) {
                addAllGifts(nQuantity);
            }
        },
        selectAll_click: function() {
            $('.checkboxlist[name='+$(this).attr('name')+'] input:checkbox')
            .each(function(index, elem) { elem.checked = true; });
            return false;
        },
        selectNone_click: function() {
            $('.checkboxlist[name='+$(this).attr('name')+'] input:checkbox')
            .each(function(index, elem) { elem.checked = false; });
            return false;
        },
        showTab_click: function() {
            showTab($(this).attr('name'));
            return false;
        },
        filterItems_click: function() {
            Inventory.lootFilter(buildLootFilter());
            _Util.changeCategory('gift', 1);
            return false;
        },
        clearFilter_click: function() {
            Inventory.clearLootFilter();
            _Util.changeCategory('gift', 1);
            return false;
        },
        collectionFilterType_change: function() {
            updateCollectionFilterData($(this).val());
            return false;
        },
        collectionFilter_change: function() {
            Inventory.collectionFilter($(this).attr('group'), $(this).val());
            _Util.changeCategory('gift', 0);
            return false;
        },
        saveSearch: function() {
            var name = prompt('Write the name of the new search:', 'MySearch');
            if (name) {
                options.get('search').push({name:name,text:$('#search_gift').val()});
                options.save();
                loadSavedSearch();
            } 
            return false;
        },
        removeSearch: function() {
            var index = $('#saved_search')[0].selectedIndex;
            if (index === 0) {
                return false;
            }
            if (confirm('Are you sure to delete this Search?')) {
                options.get('search').splice($('#saved_search')[0].selectedIndex-1, 1);
                loadSavedSearch();
                $('#search_gift').val('').change();
            }
            return false;
        },
        textFocus: function() {
            this.select();
            return false;
        },
        giftAddRemove_click: function() {
            var self = $(this).parent();
            addRemoveFav('gift', self.attr('gcat')+'_'+self.attr('gid'), $(this).hasClass('remove'));
            $(this).toggleClass('remove', $(this).hasClass('remove') == false);
            return false;
        },
        userAddRemove_click: function() {
            addRemoveFav('user', $(this).parent().attr('uid'), $(this).hasClass('remove'));
            $(this).toggleClass('remove', $(this).hasClass('remove') == false);
            return false;
        },
        search_change: function() {
            var index = this.selectedIndex-1;
            if (index < 0) {
                $('#search_gift').val('').change();
                return false;
            }
            $('#search_gift').val(options.get('search')[index].text).change();
            return false;
        },
        removeUser_click: function() {
            var id = $(this).parent().attr('id');
            $(this).parent().remove();
            $('li[uid=' + id.substring(5) + ']').toggleClass('selected', false);
            tryShowControls();
            return false;
        },
        user_click: function() {
            var self = $(this).parent();
            var selected = e$('#user_'+self.attr('uid'), '#selected_users');
            if (selected !== null) {
                $('a', selected).click();
                return false;
            }
            selectUser(self.attr('uid'));
            self.toggleClass('selected', true);
            tryShowControls();
            return false;
        },
        gift_click: function() {
            var self = $(this).parent();
            selectGift(self.attr('gcat'), self.attr('gid'));
            return false;
        },
        clearUsers_click: function() {
            $('li.selected', '#user_list').toggleClass('selected', false);
            $('#selected_users').empty();
            tryShowControls();
            return false;
        },
        addRem_click: function() {
            var action = $('#count_addrem').attr('action');
            var count = $(this).attr('amount');
            
            if (action == 'add') {
                addGiftToQueue(count, _Util.getGift());
            }
            else {
                addGiftToQueue('-'+ count, _Util.getGift());
            }
            return false;
        },
        finish_click: function() {
            $('#multigift_queue').empty();
            globalMessage();
            return false;
        },
        showLog_click: function() {
            $('#multigift_queue').empty()
            var logElt = c$('textarea', 'readonly:readonly,class:black')
            
            logElt.appendTo('#multigift_queue').html(plainTextLog).css({
                'margin-top': 5,
                'width': '99%',
                'height': 250
            });
            c$('center').appendTo('#multigift_queue')
            .append(b$('Select All Text', 'class:short white')
                .click(function() { logElt.select(); }));
            
            return false;
        },
        toggleAction_click: function() {
            var action = $(this).attr('action');
            if (action == 'add') {
                $('#start_controls a[amount]').removeClass('green').addClass('red');
                $(this).attr('action', 'remove').html('REMOVE');
            }
            else {
                $('#start_controls a[amount]').removeClass('red').addClass('green');
                $(this).attr('action', 'add').html('ADD');
            }
            return false;
        },
        cancel_click: function() {
            already_working = false;
            return false;
        },
        delQueue_click: function() {
            Queue = [];
            $('#multigift_queue').empty();
            gift_count_avail = daily_left;
            return false;
        },
        start_click: function() {
            if (Queue.length > 0) {
                showDiv('status');
                already_working = true;
                startBatchProcess();
            }
            else {
                globalMessage('Please, add a job before start.', 'green');
            }
            return false;
        },
        deleteJob_click: function() {
            var n = this.id.substring(10);
            if (!isNaN(n)) {
                _Util.deleteJob(parseInt(n));
            }
            return false;
        },  
        category_change: function() {
            var index = this.selectedIndex;
            var name = $(this).attr('name');
            
            if (name == 'gift') {
                $('div[id^=filter_container]').hide();
                (e$('#filter_container_' + index) || $('#filter_container_msg')).show();
            }
            
            Controller[name].setCat(index);
            updatePageDownList(name);
            $('#'+name+'_page')[0].selectedIndex = Controller[name].currentPage() - 1;
            $('#'+name+'_page').change();
            
            // showTab('selected_gift');
        },
        giftPage_change: function() {
            showPage('gift', this.selectedIndex+1);
        },
        userPage_change: function() {
            showPage('user', this.selectedIndex+1);
        },
        prevPage_click: function() {
            var name = $(this).attr('name');
            
            if (Controller[name].currentPage() > 1) {
                $('#'+name+'_page')[0].selectedIndex = Controller[name].currentPage() - 2;
                $('#'+name+'_page').change();
            }
            return false;
        },
        nextPage_click: function() {
            var name = $(this).attr('name');
            
            if (Controller[name].currentPage() < Controller[name].pages()) {
                $('#'+name+'_page')[0].selectedIndex = Controller[name].currentPage();
                $('#'+name+'_page').change();
            }
            return false;
        },
        swithGiftPages_click: function() {
            options.fromDomElements();
            options.save();
            updatePageDownList('gift');
            $('#gift_page').change();
        },
        swithUserPages_click: function() {
            options.fromDomElements();
            options.save();
            updatePageDownList('user');
            $('#user_page').change();
        },
        doSearch: function() {
            $('#search_'+$(this).attr('name')).change();
        },
        input_change: function() {
            var name = this.id.substring(7);
            
            Controller[name].search(this.value.toLowerCase());
            _Util.changeCategory(name, (name == 'gift' ? 4 : 2));
        }
    };
    function genMainDom() {
        
        // GIFT BAR
        var giftBarElt = c$('div', 'class:controlbar').appendTo(popupElt.content);
        
        c$('div', 'class:leftside').appendTo(giftBarElt)
        .append(c$('select', 'class:black,id:gift_category,name:gift').width(200).change(Events.category_change))
        .append(c$('input:checkbox', 'multigift_giftpages').css('margin-left',5).change(Events.swithGiftPages_click))
        .append(c$('label', 'for:multigift_giftpages').text('Use Pages.'))
        .append(
            c$('div', 'id:gift_page_box').css('float', 'right')
            .append(c$('a','name:gift,id:mgpage_prev,href:#,class:active').click(Events.prevPage_click))
            .append(c$('select', 'class:black,id:gift_page').width(70).change(Events.giftPage_change))
            .append(c$('a','name:gift,id:mgpage_next,href:#,class:active').click(Events.nextPage_click))
        );
        
        c$('div', 'class:rightside').appendTo(giftBarElt).width(290)
        .append(c$('input:checkbox', 'multigift_hidezeroamount').change(Events.swithGiftPages_click))
        .append(c$('label', 'for:multigift_hidezeroamount').text('Hide 0 amount.').css('margin-right',15))
        .append(b$('Filters', 'name:filter,class:short white').click(Events.showTab_click))
        .append(b$('Search', 'name:search,class:short white').click(Events.showTab_click));
        
        c$('div', 'id:gift_list,class:item_list').css('float','left').appendTo(popupElt.content);
        
        var tabContainerElt = c$('div', 'class:tab_container').appendTo(popupElt.content);
        
        // SELECTED GIFT TAB
        c$('center', 'tab_selected_gift').appendTo(tabContainerElt)
        .append(c$('div').text('Selected gift:'))
        .append(c$('div', 'id:giftcard, class:ItemCardBox').css({
            'cursor': 'default',
            'margin-top': 5,
            'width': 'auto'
        }));
        
        // COLLECTION FILTER TAB
        var filterTabElt = c$('div', 'tab_filter').hide().appendTo(tabContainerElt);
        
        c$('div', 'filter_container_0').css('padding',20).appendTo(filterTabElt)
        .append(c$('label', 'for:collection_filter_type').text('Select Collection Type:'))
        .append('<br />')
        .append(
            c$('select', 'class:black,id:collection_filter_type').width(250)
            .change(Events.collectionFilterType_change)
        )
        .append('<br /><br />')
        .append(c$('label', 'for:collection_filter').text('Select Collection Name:'))
        .append('<br />')
        .append(
            c$('select', 'class:black,id:collection_filter').width(250)
            .change(Events.collectionFilter_change)
        );
        
        // LOOT FILTER TAB
        var tab = new domTabObject(
            c$('div', 'filter_container_1').hide().appendTo(filterTabElt),
            'filter_list',['GENERAL','TYPE','QUALITY','ORIGIN'], 110
        );
        
        // General
        tab.getLayout(0).css('padding', '0px 5px')
        .append(c$('input:checkbox', 'id:active_filter,checked:checked'))
        .append(c$('label', 'for:active_filter').text('Active items.'))
        .append(c$('input:checkbox', 'id:inactive_filter,checked:checked'))
        .append(c$('label', 'for:inactive_filter').text('Inactive items.'))
        .append('<br /><br />')
        .append(c$('span').text('Attack is: '))
        .append(c$('select', 'class:black,id:attack_more_less'))
        .append(c$('span').text(' than '))
        .append(c$('input:text', 'class:black,id:attack_amount').width(60))
        .append('<br />')
        .append(c$('span').text('Defense is: '))
        .append(c$('select', 'class:black,id:defense_more_less'))
        .append(c$('span').text(' than '))
        .append(c$('input:text', 'class:black,id:defense_amount').width(60));
        
        // Type
        tab.getLayout(1).append(c$('ul', 'class:checkboxlist, name:ItemTypes'))
        .append(
            c$('center').css('margin', 10)
            .append(b$('Select All', 'name:ItemTypes').click(Events.selectAll_click))
            .append('<br /><br />')
            .append(b$('Select None', 'name:ItemTypes').click(Events.selectNone_click))
        );
        
        // Quality
        tab.getLayout(2).append(c$('ul', 'class:checkboxlist, name:Qualities'))
        .append(
            c$('center').css('margin', 10)
            .append(b$('Select All', 'name:Qualities').click(Events.selectAll_click))
            .append('<br /><br />')
            .append(b$('Select None', 'name:Qualities').click(Events.selectNone_click))
        );
        
        // Location
        tab.getLayout(3).append(c$('ul', 'class:checkboxlist, name:Locations'))
        .append(c$('center').css('margin', 10)
            .append(b$('Select All', 'name:Locations').click(Events.selectAll_click))
            .append('<br /><br />')
            .append(b$('Select None', 'name:Locations').click(Events.selectNone_click))
        );  
        
        $('#filter_container_1').append(
            c$('center').css('margin-top', 2)
            .append(b$('Filter Items', 'class:short white').click(Events.filterItems_click))
            .append(b$('Clear Filter', 'class:short white').css('margin-left',5).click(Events.clearFilter_click))
        );
        
        // FILTER MESSAGE
        c$('div', 'filter_container_msg').hide().appendTo(filterTabElt)
        .append(c$('center').css('margin', 10).text('Filter work only with "Collection" and "Loot" categories.'));

        // ADD FILTER OPTIONS
        $.each(InventoryFilter, function(filterName, obj) {
            var chkList = $('ul[name='+filterName+']');
            
            $.each(obj, function(name, value) {
                var sText = typeof(value) == 'string' ? value : value.name;
                
                c$('li').appendTo(chkList)
                .append(c$('input:checkbox', 'id:'+filterName+'_'+name+',checked:checked').val(name))
                .append(c$('label', 'for:'+filterName+'_'+name).text(sText));
            }); 
        });
        
        // SEARCH TAB
        c$('div', 'tab_search').css('padding-top',20).hide().appendTo(tabContainerElt)
        .append(c$('div').append(c$('label','for:search_gift').text('Type the text to search:')))
        .append(c$('input:text','class:black,id:search_gift').width(200).focus(Events.textFocus).change(Events.input_change))
        .append(b$('Go', 'class:short white,name:gift').css('margin-left',5).click(Events.doSearch))
        .append(b$('Save', 'class:short white').css('margin-left',5).click(Events.saveSearch))
        .append('<br /><br />')
        .append(c$('div').append(c$('label', 'for:saved_search').text('Select a saved search:')))
        .append(c$('select', 'class:black,id:saved_search').width(220).change(Events.search_change))
        .append(b$('Remove', 'class:short white').css('margin-left',5).click(Events.removeSearch))
        
        // USER
        giftBarElt = c$('div', 'class:controlbar').css('margin-top', 10).appendTo(popupElt.content);
        
        c$('div', 'class:leftside').appendTo(giftBarElt)
        .append(c$('select', 'class:black,id:user_category,name:user').width(200).change(Events.category_change))
        .append(c$('input:checkbox', 'multigift_userpages').css('margin-left',5).change(Events.swithUserPages_click))
        .append(c$('label', 'for:multigift_userpages').text('Use Pages.'))
        .append(
            c$('div', 'id:user_page_box').css('float','right')
            .append(c$('a','name:user,id:mgpage_prev,href:#,class:active').click(Events.prevPage_click))
            .append(c$('select', 'class:black,id:user_page').width(70).change(Events.userPage_change))
            .append(c$('a','name:user,id:mgpage_next,href:#,class:active').click(Events.nextPage_click))
        );

        c$('div', 'class:rightside').appendTo(giftBarElt)
        .append(c$('label','for:search_user').text('Search:'))
        .append(c$('input:text', 'class:black,id:search_user').width(150)
            .focus(Events.textFocus).change(Events.input_change)
        )
        .append(b$('Go', 'class:short white,name:user').css('margin-left',5).click(Events.doSearch))
        .append(c$('div').css('float', 'right')
            .append(c$('a', 'href:#,title:Clear all selected friends.')
                .html('(Clear)').click(Events.clearUsers_click)
            )   
        );
        
        c$('div', 'id:user_list,class:item_list').appendTo(popupElt.content);
        c$('div', 'id:selected_users').appendTo(popupElt.content);
        
        var controls = c$('div', 'class:controls').appendTo(popupElt.content);
        
        // global_messages
        c$('div', 'message_controls').appendTo(controls).append('<span id="global_messages">');
        
        var bLabels = ''
        
        // CONTROL
        c$('div', 'start_controls').appendTo(controls)
        .append(c$('div', 'class:gift_delay')
            .append(c$('label', 'for:multigift_delay').html('Delay:&nbsp;'))
            .append(c$('input:text', 'class:black,id:multigift_delay').width(30).focus(Events.textFocus))
        )       
        .append(c$('span').width(50).append(c$('a','id:count_addrem,action:add').html('ADD').click(Events.toggleAction_click))) 
        .append(b$('1', 'amount:1,class:medium green').click(Events.addRem_click))
        .append(b$('5', 'amount:5,class:medium green').click(Events.addRem_click))
        .append(b$('10', 'amount:10,class:medium green').click(Events.addRem_click))
        .append(b$('25', 'amount:25,class:medium green').click(Events.addRem_click))
        .append(b$('50', 'amount:50,class:medium green').click(Events.addRem_click))
        .append(b$('ALL', 'amount:all,class:medium green').click(Events.addRem_click))
        .append(b$('START', 'class:short orange').click(Events.start_click))
        .append(b$('ADD ALL', 'class:short orange,title:Add all gifts that you can see.').click(Events.addAllGifts_click))
        .append(b$('CLEAR ALL', 'class:short orange,title:Clear all gifts added.').click(Events.delQueue_click));
        
        // FINISH
        c$('div', 'finish_controls').appendTo(controls)
        .append(b$('FINISH').addClass('short orange').click(Events.finish_click))
        .append(b$('SHOW LOG').addClass('short orange').click(Events.showLog_click));
            
        // STATUS
        var status_control = c$('div', 'status_controls').appendTo(controls);
        
        b$('CANCEL', 'cancel_button').appendTo(status_control)
        .addClass('short orange').click(Events.cancel_click);
        
        c$('img').attr('src', global.resource.ajax_loader).appendTo(status_control);
        
        c$('div', 'class:job_status').appendTo(status_control)
        .append(c$('span', 'class:current_job').text('Current Job:'))
        .append(c$('div', 'status_current_job_text'))
        .append(c$('span', 'next_gift_timer'))
        .append(c$('br'))
        .append(c$('div', 'status_send_message'));
            
        // QUEUE
        c$('div', 'multigift_queue').appendTo(popupElt.content);
        updatePageDownList('user');
        updatePageDownList('gift');
        loadSavedSearch();
        
        popupElt.applyOptions({
            'attack_more_less'        : {1:'More', '-1':'Less'},
            'defense_more_less'       : {1:'More', '-1':'Less'},
            'gift_category'           : {0:'Collections', 1:'Loot', 2:'Boosts', 3:'Favorites', 4:'Search'},
            'user_category'           : {0:'All MW Friends', 1:'Favorites', 2:'Search'},
            'collection_filter_type'  : {'all': 'All'}
        });
        
        var collectionFilterTypeElt = $('#collection_filter_type');
        for (var i in collectionFilter) {
            collectionFilterTypeElt.append(c$('option', 'value:'+i).text(i));
        }
        
        updateCollectionFilterData('all');
    }
    
    function updateCollectionFilterData(id) {
        var collectionFilterElt = $('#collection_filter').attr('group', id).empty()
        .append(c$('option', 'value:all').text('All'));
        
        if (typeof(collectionFilter[id]) !== 'undefined') {
            for (var i in collectionFilter[id]) {
                collectionFilterElt.append(c$('option', 'value:'+i).text(i));
            }
        }
        collectionFilterElt.change();
    }
    
    function loadSavedSearch() {
        var elem = $('#saved_search').empty()
                   .append(c$('option', 'value:-1').text('None'));
        var searchList = options.get('search');
        
        for (var i = 0; i < searchList.length; i++) {
            elem.append(c$('option', 'value:'+i).text(searchList[i].name));
        }
    }
    
    function updatePageDownList(name) {
        var elem = $('#'+name+'_page').empty();
         
        for (var i = 0, len = Controller[name].pages(); i < len; i++) {
            elem.append(c$('option', 'value:'+i).text((i + 1) + '/' + len));
        }
        
        $('#'+name+'_page_box')[options.get(name+'Pages') ? 'show' : 'hide']();
    }
    
    var selectGift = function(cat, id) {
        Inventory.select(cat, id);
        $('li.selected', '#gift_list').toggleClass('selected', false);
        $('li[gcat='+cat+'][gid='+id+']', '#gift_list').toggleClass('selected', true);
        $('#giftcard').empty().append( buildCard(Inventory.selected) );
        showTab('selected_gift');
        tryShowControls();
    }
    
    function selectUser(id) {
        if (e$('#user_' + id) !== null) {
            return;
        }
        c$('div', 'user_' + id).appendTo('#selected_users').text(Friends.getName(id))
        .append(c$('a').text('X').click(Events.removeUser_click));
    }
    
    function showPage(listName, page) {
        var i, shtml = '';
        var elem = {
            'user': function(item) {
                var r = '<li uid="' + item.id + '"><div class="checkbox">' + item.name + '</div>';
                r += '<a title="Add/Remove from favorites" ';
                
                if (options.get('userFav').indexOf(item.id) === -1) {
                    r += 'class="favorite"></a></li>';
                }
                else {
                    r += 'class="favorite remove"></a></li>';
                }
                return r;
            },
            'gift': function(item) {
                if ((!item.amount || item.amount < 1) && options.get('hideZeroAmount')) {
                    return '';
                }
                var r = '<li gcat="' + item.cat + '" gid="' + item.id + '">';
                r += '<img src="' + item.img + '">';
                r += '<div class="item_name">' + item.name;
                r += ' (' + Util.setColor(item.amount,'green', 'item_quantity')  + ')';
                if ((item.attack && item.attack > 0) || (item.defense && item.defense > 0)) {
                    r += ' (<span class="more_in">';
                    r += item.attack + '|' + item.defense + '</span>)';
                }
                r += '</div><a title="Add/Remove from favorites" ';
                if (options.get('giftFav').indexOf(item.cat + '_' + item.id) === -1) {
                    r += 'class="favorite"></a></li>';
                }
                else {
                    r += 'class="favorite remove"></a></li>';
                }
                return r;
            }
        };
        
        var pageArray = Controller[listName].getPageItems(page);
        
        for (i = 0; i < pageArray.length; i++) {
            shtml += elem[listName](pageArray[i]);
        }
        
        $('#'+listName+'_list').html('<ul>'+shtml+'</ul>');
        delete shtml;
        
        $('div', '#'+listName+'_list').click(Events[listName+'_click']);
        
        if (listName == 'user') {
            $('#selected_users').children().each(function(index,elem) {
                $('#user_list li[uid='+elem.id.substring(5)+']').addClass('selected');
            });
        }
        else if (Inventory.selected.id) {
            i = Inventory.selected;
            $('#gift_list li[gid='+i.id+'][gcat='+i.cat+']').addClass('selected');
        }
        
        $('a', '#'+listName+'_list').click(Events[listName+'AddRemove_click']);
        
    }
    
    function addRemoveFav(lstName, value, remove) {
        var list = options.get(lstName+'Fav');
        if (remove === true) {
            list.splice(list.indexOf(value), 1);
        }
        else {
            list.push(value);
        }
        options.save();
        Controller[lstName].updateFavorites();
    }
    
    function buildLootFilter() {
        var new_filter = {
            active   : $('#active_filter')[0].checked,
            inactive : $('#inactive_filter')[0].checked,
            attack   : { 
                op : parseInt( $('#attack_more_less').val()) || 0,
                q  : parseInt( $('#attack_amount').val() ) || 0
             },
            defense  : { 
                op : parseInt( $('#defense_more_less').val() ) || 0,
                q  : parseInt( $('#defense_amount').val() ) || 0 
            }
        };
        
        $('.checkboxlist').each(function(list_index, list_elem) {
            var current_list = new_filter[$(list_elem).attr('name')] = {};
            
            $('input:checkbox', list_elem).each(function(i, elem) {
                if (elem.checked) {
                    current_list[elem.value] = true;
                }
            });
        });
        
        return new_filter;
    }
    
    function buildCard(gift) {
        var ItemQuantity
        var iconSrc = 'http://mwfb.static.zgncdn.com/mwfb/graphics/inventory/ItemCard/icons/';
        
        var card = c$('div', 'class:defenseCard equipped visible').css({
            'float': 'none',
            'text-align': 'left'
        })
        .append(c$('div', 'class:itemCardName').text(gift.name))
        .append(
            c$('div', 'class:itemCardQuantity').html('x'+gift.amount)
            .append(ItemQuantity = c$('span').css('margin-left', 5))
        )
        .append(c$('div', 'class:itemCardImage').html(gift.image || '<img src="'+gift.img+'">'));
        
        if (parseInt(gift.cat) == 1) {
            
            c$('div', 'class:attack_defense').appendTo(card)
            .append(
                c$('span', 'class:attack').text(gift.attack).css({
                    'margin-left': 17,
                    'padding-right': 6
                })
            )
            .append(c$('span', 'class:defense').text(gift.defense));
            
            var imgTitle = (gift.active ? 'Active item - Your Mafia is using this item in fights/robs.' : 
                                          'Inactive item - Your Mafia is not using this item in fights/robs.');
                                          
            c$('div', 'class:icon equippedIcon').appendTo(card)
            .append(
                c$('img', 'title:'+imgTitle)
                .attr('src', iconSrc+'Inventory-'+(gift.active?'':'in')+'active-icon.png')
            );
            
            c$('div', 'class:icon').appendTo(card).html(InventoryFilter.Qualities[gift.quality].image);
            
            if ((gift.eqoff && gift.eqoff > 0) || (gift.eqdef && gift.eqdef > 0)) {
                ItemQuantity
                .append('(')
                .append(c$('span', 'title:Number active on attack.').css('color', '#FF9121').text(gift.eqoff))
                .append('/')
                .append(c$('span', 'title:Number active on defense.').css('color', '#609AD1').text(gift.eqdef))
                .append(')');
            }
        }
        
        return card;
    }
    
    function globalMessage(msg, color) {
        var text = msg || 'You have ' + gift_count_avail + ' gifts left to send today (10000 daily).';
        if (daily_left) {
            $('#global_messages').css('color', color || 'white').html('<strong>'+text+'</strong>');
        }
        showDiv('message');
        setTimeout(tryShowControls, 4000);
    }
    
    function addAllGifts(quantity) {
        $.each(Controller.gift.getAllItems(), function(index, gift) {
            addGiftToQueue(quantity, gift, true);
        });
    }
    
    function addGiftToQueue(quantity, giftToSend, bNoMessages) {
        var qID = -1;
        var recipients = _Util.getUsers();
        var maxAmounts = giftToSend.amount || 0;
        var giftCount = 0;
        // handle total gift count and gift count.
        for (var i = 0; i < Queue.length; i++) {
            if (Queue[i].quantity) {
                // total count
                giftCount += (Queue[i].quantity * Queue[i].recip.length);
                if (_Util.isSameGift(Queue[i].gift, giftToSend)) {
                    // gift count
                    maxAmounts -= (Queue[i].quantity * Queue[i].recip.length); 
                    if (_Util.isSameArray(Queue[i].recip, recipients))
                        qID = i; // job exist
                }
            }
        }
        
        // Fix amount per user
        maxAmounts = Math.floor(maxAmounts / recipients.length);
        var maxQuantity = Math.min(maxAmounts, daily_left - giftCount);
        switch(quantity) {
            case 'all':  quantity = maxQuantity;            break;
            case '-all': quantity = giftToSend.amount * -1; break;
            default:     quantity = parseInt(quantity);     break;
        }
        // check all is ok
        if (giftToSend.cat < 0 || giftToSend.id < 1) {
            if (!bNoMessages) globalMessage('Please, select a gift to send.', 'red');
            return false;
        }
        if (recipients.length < 1) {
            if (!bNoMessages) globalMessage('Please, select the user to send gift.', 'red');
            return false;
        }
        if (typeof(quantity) == 'undefined') {
            if (!bNoMessages) globalMessage('You need to set the gift amount.', 'red');
            return false;
        }
        if (maxQuantity < 1 && quantity > 0) {
            if (!bNoMessages) globalMessage('You dont have gifts left to send.', 'red');
            return false;
        }
        // fix quantity
        quantity = Math.min(quantity, maxQuantity)
        // all ok, add job to queue
        if (qID > -1) {
            Queue[qID].quantity += quantity;
        }
        else {
            qID = Queue.length;
            Queue[qID] = {
                thisID:   qID,
                gift:     giftToSend,
                recip:    recipients,
                quantity: quantity,
                giftSend: 0
            };
        }
        gift_count_avail = daily_left - giftCount;
        gift_count_avail -=  (Math.max(0, quantity) * recipients.length);

        if (Queue[qID].quantity > 0)
            addBatchProcess(qID);
        else
            _Util.deleteJob(qID);
        
        return true;
    }
    function rebuildBatchProcess() {
        var giftCount = 0;
        $('#multigift_queue').empty();
        for (var i = 0; i < Queue.length; i++) {
            Queue[i].thisID = i;
            giftCount += (Queue[i].quantity * Queue[i].recip.length);
            addBatchProcess(i);
        }
        gift_count_avail = daily_left - giftCount;
    }
    function addBatchProcess(id) {
        var item = Queue[id];
        var jobID = 'queue_item_' + id;
        var message = 'Send ' + item.quantity + ' ' + item.gift.name + '(s) To ';
        if (item.recip.length == 1) {
            message += Util.setColor(Friends.getName(item.recip[0]), 'yellow');
        }
        else {
            message += '<span title="'+ _Util.namesFromIds(item.recip).join(', ');
            message += '" style="color: yellow; cursor: pointer;">'
            message += item.recip.length+ ' users.</span>';
        }
        var updateItem = e$('#'+jobID) || 
        c$('div', 'class:queue_item,id:'+jobID).prependTo('#multigift_queue');
        
        updateItem.empty();
        c$('div','class:update_timestamp').appendTo(updateItem).html(new Date().toUTCString());
        c$('div','class:status').append(c$('div')).appendTo(updateItem);
        c$('div','class:icon').appendTo(updateItem).append(c$('img').attr({
            'width': 40,
            'height': 40,
            'src': item.gift.img
        }));
        var table = new domTableObject(updateItem, 2, 2);
        c$('span').css('float', 'right').text('Job:').appendTo(table.cell(0,0));
        c$('span').css('float', 'right').text('Status:').appendTo(table.cell(1,0));
        c$('span', 'class:job_txt,id:queue_item_status_'+id).text('Waiting.').appendTo(table.cell(1,1));
        c$('span', 'class:job_txt,id:queue_job_name').appendTo(table.cell(0,1)).html(message);
        
        b$('delete', 'delete_id_'+id).click(Events.deleteJob_click)
        .appendTo(updateItem).css('float','right');
    }
    function getFixedGiftCount(q) {
        q = parseInt(q);
        return (q>49)?50 : (q>24)?25 : (q>9)?10 : (q>4)?5 : 1;
    }
    function startBatchProcess() {
        if (Queue.length < 1)             
            return;
        
        var params, job, message_header = '';
        var timerInterval = function(delay, fn) {
            if (!parseInt(delay)) { delay = 3 };
            sendTimer.start('Next in %N% sec.', delay, fn);
        }
        
        // Hide all delete buttons of batch process to prevent errors
        $('*[id^="delete_id_"]', '#multigift_queue').hide();
        // empty plain text log
        plainTextLog = '';
        // start a new job
        function startNewJob() 
        {
            // set current job
            job = Queue[0];
            // set link parameters
            params = {
                'gift_category':job.gift.cat,
                'gift_count':   1,
                'gift_id':      job.gift.id,
                'gift_key':     gift_key,
                'sendkey':      ''
            };
            for (var i = 0; i < job.recip.length; i++) {
                params['recipients['+i+']'] = job.recip[i];
            }
            $('#status_current_job_text')
            .text('Sending ' + (job.quantity * job.recip.length) + ' ' + job.gift.name + '(s)');
            $('#queue_item_status_' + job.thisID).text('Working...');
            sendGift();
        }
        // end the current job
        function endCurrentJob()
        {
            plainTextLog += '# ['+(new Date()).toDateString()+ '] Sent '+ job.giftSend + ' ' + job.gift.name;
            plainTextLog += '(s) to ' + _Util.namesFromIds(job.recip).join(', ') + '\n';
            // delete finished job or abort all
            if (!already_working)
                Queue = [];
            else
                Queue.splice(0, 1);
                
            $('.status > div', '#queue_item_' + job.thisID).addClass('complete');
            
            if (Queue.length > 0) 
                startNewJob();
            else 
                cancelProcess();
        }
        // send a gift
        function sendGift() {
            if (!already_working) {
                endCurrentJob();
                return;
            }
            // Fix quantity to send
            params['gift_count'] = getFixedGiftCount(job.quantity);
            // update status
            $('#next_gift_timer').html('Sending now.');
            $('#status_send_message')
            .html('Sending ' + params['gift_count'] + ' ' + job.gift.name + '.');
            // send gift
            httpAjaxRequest({
                url: 'remote/' + MW.getIntURL('gift', 'send'),
                liteLoad: 0,
                data: params,
                success: function(htmlText) 
                {
                    if (MW.update(htmlText) !== true) {
                        timerInterval(10, sendGift);
                        return;
                    }
                    Inventory.updateAmounts(getGiftData(htmlText).item_amounts);
                        
                    var amount = job.gift.amount || 0;
                    $('#item_quantity',
                      '#gift_list li[gid=' + job.gift.id + '][gcat=' + job.gift.cat + ']'
                    ).text(amount);
                    
                    message_header = h$(htmlText).find('.message_body').text();
                    
                    $('#status_send_message').html(message_header);
                    $('#next_gift_timer').html('Next in ' + $('#multigift_delay').val() + ' sec.');
                    
                    if (/You\s*gave|Has\s*dado|Du\s*hast|Vous\s*avez\s*donn|Hai\s*dato/i.test(message_header)) 
                    {
                        job.quantity = Math.min(job.quantity - params['gift_count'], amount);
                        job.giftSend += params['gift_count'];
                        if (job.quantity > 0) {
                            timerInterval($('#multigift_delay').val(), sendGift);
                        }
                        else {
                            timerInterval($('#multigift_delay').val(), endCurrentJob);
                        }
                    }
                    else if (amount > 0) 
                    {
                        timerInterval(10, sendGift);
                    }
                    else 
                    {
                        timerInterval($('#multigift_delay').val(), endCurrentJob);
                    }
                    $('#queue_item_status_' + job.thisID).html(
                        'You have sent ' + (job.giftSend * job.recip.length) + ' ' + job.gift.name + '(s).'
                    );
                }
            });
        }
        // Start all batch process.
        startNewJob();
    }

    function Initialize() {
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('gift'),
            message: 'Loading friend list...',
            success: function(htmlText) 
            {
                if (MW.update(htmlText) !== true) {
                    popupElt.destroy();
                    showBadResponse();
                    return;
                }
                var data = getGiftData(htmlText);
                
                Friends.update(data);
                
                daily_left        = data.gifts_daily_left;
                gift_count_avail  = data.gifts_daily_left;
                gift_key          = Util.doRgx(/gift_key['"]\s*value=['"]([^'"]+)/, htmlText).$1;
                
                log$(gift_key);
                log$('daily_left: ' + data.gifts_daily_left);
                
                httpAjaxRequest({
                    url: 'remote/' + MW.getIntURL('inventory'),
                    message: 'Loading inventory data...',
                    success: function(htmlText) 
                    {
                        if (MW.update(htmlText) !== true) {
                            popupElt.destroy();
                            showBadResponse();
                            return;
                        }
                        log$('Loading inventory...');
                        Inventory.update(data, getInventoryData(htmlText));
                        log$('Inventory loaded...');
                        
                        genMainDom();
                        popupElt.selectGift = selectGift;
                        
                        if (select_gift_cat && select_gift_id) {
                            selectGift(select_gift_cat, select_gift_id);
                        }
                        
                        _Util.changeCategory('gift', (options.get('giftFav').length > 0) ? 3 : 0);
                        _Util.changeCategory('user', (options.get('userFav').length > 0) ? 1 : 0);
                        
                        globalMessage();
                        
                        options.toDomElements();
                        showDiv('none');
                        // show popup
                        popupElt.show();
                    }
                });
            }
        });
    }
    
    popupElt.addBase64Style(
        'I211bHRpZ2lmdGVyX3BvcHVwIC5ibGFjayB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJY29sb3I6IHJnYigyMDgsIDIwOCwgMjA4'+
        'KTsgDQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAxNTMpOyANCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgDQoJ'+
        'Zm9udC1zaXplOiAxNHB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGEgew0KCXRleHQtZGVjb3JhdGlvbjogbm9uZTsNCn0NCiNt'+
        'dWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbGJhciB7DQoJYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHA6Ly9td2ZiLnN0YXRp'+
        'Yy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvbWFwX2Jhc2VkX2pvYnMvZXhwZXJ0X3ZpZXcvZXhwZXJ0dmlld19uYXZfbWlkLmdp'+
        'Zik7DQoJYm9yZGVyLWNvbG9yOiBibGFjazsNCgljbGVhcjogYm90aDsNCgloZWlnaHQ6IDM1cHg7DQoJdGV4dC1hbGlnbjogbGVm'+
        'dDsNCgl3aWR0aDogYXV0bzsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbGJhciAqIHsNCgl2ZXJ0aWNhbC1hbGln'+
        'bjogbWlkZGxlOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250cm9sYmFyIGRpdi5sZWZ0c2lkZSB7DQoJZmxvYXQ6IGxl'+
        'ZnQ7DQoJcGFkZGluZzogNXB4IDBweCA1cHggNXB4Ow0KCXdpZHRoOiA0MDBweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYu'+
        'Y29udHJvbGJhciBkaXYucmlnaHRzaWRlIHsNCglmbG9hdDogbGVmdDsNCgltYXJnaW4tbGVmdDogMTVweDsNCglwYWRkaW5nOiA1'+
        'cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2LmNvbnRyb2xiYXIgZGl2LnJpZ2h0c2lkZSBhIHsNCgltYXJnaW4tcmlnaHQ6'+
        'IDZweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYudGFiX2NvbnRhaW5lciB7DQoJdGV4dC1hbGlnbjogbGVmdDsNCglmbG9h'+
        'dDogbGVmdDsNCgloZWlnaHQ6IDE1MHB4Ow0KCW1hcmdpbjogNXB4Ow0KCXdpZHRoOiAzMTVweDsNCn0NCiNtdWx0aWdpZnRlcl9w'+
        'b3B1cCBkaXYuY29udHJvbHMgew0KCWJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9t'+
        'd2ZiL2dyYXBoaWNzL21hcF9iYXNlZF9qb2JzL2V4cGVydF92aWV3L2V4cGVydHZpZXdfbmF2X21pZC5naWYpOw0KCWhlaWdodDog'+
        'MzhweDsNCgl0ZXh0LWFsaWduOiBjZW50ZXI7DQoJd2lkdGg6IGF1dG87DQoJYm9yZGVyLWNvbG9yOiBibGFjazsNCgljbGVhcjog'+
        'Ym90aDsJDQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2LmNvbnRyb2xzICNzdGFydF9jb250cm9scyBhLm1lZGl1bSB7DQoJbWFy'+
        'Z2luLWxlZnQ6IDVweDsNCgltYXJnaW4tdG9wOiAycHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2LmNvbnRyb2xzICNzdGFy'+
        'dF9jb250cm9scyBhLnNob3J0IHsNCgltYXJnaW4tbGVmdDogNXB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250cm9s'+
        'cyAjZmluaXNoX2NvbnRyb2xzIGEuc2hvcnQgew0KCW1hcmdpbjogNHB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250'+
        'cm9scyAjbWVzc2FnZV9jb250cm9scyB7DQoJd2lkdGg6IGF1dG87DQoJcGFkZGluZy10b3A6IDEwcHg7DQp9DQojbXVsdGlnaWZ0'+
        'ZXJfcG9wdXAgZGl2LmNvbnRyb2xzICNzdGF0dXNfY29udHJvbHMgew0KCWhlaWdodDogMzVweDsNCn0NCiNtdWx0aWdpZnRlcl9w'+
        'b3B1cCBkaXYuY29udHJvbHMgI3N0YXR1c19jb250cm9scyAjY2FuY2VsX2J1dHRvbiB7DQoJbWFyZ2luLXJpZ2h0OiAzMHB4Ow0K'+
        'CW1hcmdpbi10b3A6IDRweDsJDQoJZmxvYXQ6IHJpZ2h0Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250cm9scyAjc3Rh'+
        'dHVzX2NvbnRyb2xzIGltZ3sNCglmbG9hdDogbGVmdDsNCgltYXJnaW46IDEwcHggMHB4IDEwcHggMTVweDsNCn0NCiNtdWx0aWdp'+
        'ZnRlcl9wb3B1cCBkaXYuY29udHJvbHMgI3N0YXR1c19jb250cm9scyAuam9iX3N0YXR1cyB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFy'+
        'Z2luLWxlZnQ6IDQwcHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbHMgI3N0'+
        'YXR1c19jb250cm9scyAuam9iX3N0YXR1cyAuY3VycmVudF9qb2Igew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbi1yaWdodDogNXB4'+
        'Ow0KCWNvbG9yOiBncmVlbjsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbHMgI3N0YXR1c19jb250cm9scyAuam9i'+
        'X3N0YXR1cyAjbmV4dF9naWZ0X3RpbWVyIHsNCglmbG9hdDogbGVmdDsNCgltYXJnaW4tbGVmdDogNXB4Ow0KfQ0KI211bHRpZ2lm'+
        'dGVyX3BvcHVwIGRpdi5jb250cm9scyAjc3RhdHVzX2NvbnRyb2xzIC5qb2Jfc3RhdHVzICNzdGF0dXNfY3VycmVudF9qb2JfdGV4'+
        'dCB7DQoJd2lkdGg6IDMwMHB4Ow0KCWZsb2F0OiBsZWZ0Ow0KCWNvbG9yOiBncmV5Ow0KCW92ZXJmbG93OiBhdXRvOw0KCW1heC13'+
        'aWR0aDogMzAwcHg7DQoJbWF4LWhlaWdodDogMTlweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbHMgI3N0YXR1'+
        'c19jb250cm9scyAuam9iX3N0YXR1cyAjc3RhdHVzX3NlbmRfbWVzc2FnZSB7DQoJd2lkdGg6IDUwMHB4Ow0KCW92ZXJmbG93OiBo'+
        'aWRkZW47DQoJbWF4LXdpZHRoOiA1MDBweDsNCgltYXgtaGVpZ2h0OiAxOXB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwICBkaXYu'+
        'Z2lmdF9kZWxheSB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luOiA1cHg7DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KfQ0KI211bHRp'+
        'Z2lmdGVyX3BvcHVwICNtZ3BhZ2VfcHJldiB7DQoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKGh0dHA6Ly9td2ZiLnN0YXRp'+
        'Yy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvaW52ZW50b3J5L0ZpbHRlckRyb3BEb3duL2ludmVudG9yeV9hcnJvd19pbmFjdGl2'+
        'ZV9sZWZ0LnBuZykgbm8tcmVwZWF0Ow0KCWN1cnNvcjogZGVmYXVsdDsNCglsaW5lLWhlaWdodDogMTZweDsNCglwYWRkaW5nLWxl'+
        'ZnQ6IDE2cHg7DQoJd2lkdGg6IDE2cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21ncGFnZV9wcmV2LmFjdGl2ZSB7DQoJYmFj'+
        'a2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvaW52ZW50'+
        'b3J5L0ZpbHRlckRyb3BEb3duL2ludmVudG9yeV9hcnJvd19hY3RpdmVfbGVmdC5wbmcpIG5vLXJlcGVhdDsNCgljdXJzb3I6IHBv'+
        'aW50ZXI7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21ncGFnZV9uZXh0ew0KCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCho'+
        'dHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL2ludmVudG9yeS9GaWx0ZXJEcm9wRG93bi9pbnZlbnRv'+
        'cnlfYXJyb3dfaW5hY3RpdmVfcmlnaHQucG5nKSBuby1yZXBlYXQ7DQoJY3Vyc29yOiBkZWZhdWx0Ow0KCWxpbmUtaGVpZ2h0OiAx'+
        'NnB4Ow0KCXBhZGRpbmctbGVmdDogMTZweDsNCgl3aWR0aDogMTZweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAjbWdwYWdlX25l'+
        'eHQuYWN0aXZlIHsNCgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdm'+
        'Yi9ncmFwaGljcy9pbnZlbnRvcnkvRmlsdGVyRHJvcERvd24vaW52ZW50b3J5X2Fycm93X2FjdGl2ZV9yaWdodC5wbmcpIG5vLXJl'+
        'cGVhdDsNCgljdXJzb3I6IHBvaW50ZXI7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgICNzZWxlY3RlZF91c2VycyB7DQoJZmxvYXQ6'+
        'IHJpZ2h0Ow0KCW1hcmdpbi1yaWdodDogNXB4Ow0KCXdpZHRoOiAzMDBweDsNCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAx'+
        'NTMsIDE1Myk7DQoJaGVpZ2h0OiAxNjBweDsNCglvdmVyZmxvdzogYXV0bzsNCglmb250LXNpemU6IDEycHg7DQp9DQojbXVsdGln'+
        'aWZ0ZXJfcG9wdXAgICNzZWxlY3RlZF91c2VycyBkaXYgew0KCWJhY2tncm91bmQtY29sb3I6ICMzMzM7DQoJbWFyZ2luOiAycHg7'+
        'DQoJcGFkZGluZzogMnB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgICNzZWxlY3RlZF91c2Vy'+
        'cyBkaXYgYSB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCW1hcmdpbi1sZWZ0OiA1cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI211bHRp'+
        'Z2lmdF9xdWV1ZSB7DQoJd2lkdGg6IGF1dG87DQoJaGVpZ2h0OiAzMjBweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCXBhZGRpbmc6'+
        'IDBweCA2cHg7DQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAxNTMpOw0KCWNsZWFyOiBib3RoOw0KCW92ZXJmbG93'+
        'LXg6IGhpZGRlbjsNCglvdmVyZmxvdy15OiBhdXRvOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwICNtdWx0aWdpZnRfcXVldWUgZGl2'+
        'LnF1ZXVlX2l0ZW0gew0KCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzMzOw0KCWNsZWFyOiBib3RoOw0KCWZsb2F0OiBsZWZ0'+
        'Ow0KCW1hcmdpbi10b3A6IDVweDsNCglwYWRkaW5nLWJvdHRvbTogNXB4Ow0KCXdpZHRoOiBhdXRvOw0KfQ0KI211bHRpZ2lmdGVy'+
        'X3BvcHVwICNtdWx0aWdpZnRfcXVldWUgZGl2LnF1ZXVlX2l0ZW0gZGl2LnN0YXR1cyB7DQoJbWFyZ2luLXJpZ2h0OiAxMHB4Ow0K'+
        'CWJvcmRlcjogMHB4Ow0KCWZsb2F0OiBsZWZ0Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwICNtdWx0aWdpZnRfcXVldWUgZGl2LnF1'+
        'ZXVlX2l0ZW0gZGl2LnN0YXR1cyBkaXYgew0KCWJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9t'+
        'd2ZiL2dyYXBoaWNzL2ZsYWdzL213X21lc3NhZ2Vib3hfY2hlY2tib3gyX25vcm1hbGl6ZWQuZ2lmIikgbm8tcmVwZWF0IHNjcm9s'+
        'bCAwJSAwJSB0cmFuc3BhcmVudDsNCgltYXJnaW46IDEwcHg7DQoJbWluLWhlaWdodDogMjBweDsNCgltaW4td2lkdGg6IDIwcHg7'+
        'DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI211bHRpZ2lmdF9xdWV1ZSBkaXYucXVldWVfaXRlbSBkaXYuc3RhdHVzIGRpdi5jb21w'+
        'bGV0ZSB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3MvZmxhZ3Mv'+
        'bXdfbWVzc2FnZWJveF9jaGVja2JveDFfbm9ybWFsaXplZC5naWYiKSBuby1yZXBlYXQgc2Nyb2xsIDAlIDAlIHRyYW5zcGFyZW50'+
        'Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwICNtdWx0aWdpZnRfcXVldWUgZGl2LnF1ZXVlX2l0ZW0gZGl2Lmljb24gew0KCWJvcmRl'+
        'cjogMHB4Ow0KCWZsb2F0OiBsZWZ0Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwICNtdWx0aWdpZnRfcXVldWUgZGl2LnF1ZXVlX2l0'+
        'ZW0gdGFibGUgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbi1sZWZ0OiAxMHB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwICNtdWx0'+
        'aWdpZnRfcXVldWUgZGl2LnF1ZXVlX2l0ZW0gdGFibGUgI3F1ZXVlX2pvYl9uYW1lLmpvYl90eHQgew0KCWZvbnQtd2VpZ2h0OiBi'+
        'b2xkOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwICNtdWx0aWdpZnRfcXVldWUgZGl2LnF1ZXVlX2l0ZW0gdGFibGUgLmpvYl90eHQg'+
        'ew0KCWZsb2F0OiBsZWZ0Ow0KCWZvbnQtc2l6ZTogMTJweDsNCgltYXJnaW4tbGVmdDogMTVweDsNCgl2ZXJ0aWNhbC1hbGlnbjog'+
        'dG9wOw0KCWNvbG9yOiB3aGl0ZTsNCgl3aWR0aDogNDUwcHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgLmNoZWNrYm94bGlzdCB7'+
        'DQoJZmxvYXQ6IGxlZnQ7DQoJYm9yZGVyOiAxcHggc29saWQgIzk5OTsNCgloZWlnaHQ6IDEwNHB4Ow0KCW1hcmdpbjogMXB4Ow0K'+
        'CXBhZGRpbmc6IDFweDsNCgl3aWR0aDogMTgwcHg7CQ0KCW92ZXJmbG93LXg6IGhpZGRlbjsNCglvdmVyZmxvdy15OiBhdXRvOw0K'+
        'fQ0KI211bHRpZ2lmdGVyX3BvcHVwIC50YWJfYm94X2NvbnRlbnQgY2VudGVyIHsNCglmbG9hdDogbGVmdDsNCgltYXJnaW46IDVw'+
        'eA0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIC5pdGVtX2xpc3Qgew0KCWZsb2F0OiBsZWZ0Ow0KCXBhZGRpbmc6IDFweDsNCgl3aWR0'+
        'aDogNDAwcHg7DQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAxNTMpOw0KCW92ZXJmbG93LXg6IGhpZGRlbjsNCglv'+
        'dmVyZmxvdy15OiBhdXRvOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIC5pdGVtX2xpc3QgdWwgew0KCW1hcmdpbjogMHB4OyANCglw'+
        'YWRkaW5nOiAwcHg7DQoJbGlzdC1zdHlsZS10eXBlOiBub25lOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIC5pdGVtX2xpc3QgdWwg'+
        'bGkgew0KCXdpZHRoOiBhdXRvOw0KCW1hcmdpbjogMXB4OyANCgloZWlnaHQ6IDMwcHg7IA0KCWJvcmRlcjogMXB4IHNvbGlkICMz'+
        'MzMzMzM7IA0KCW92ZXJmbG93OiBoaWRkZW47IA0KCWN1cnNvcjogcG9pbnRlcjsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAuaXRl'+
        'bV9saXN0IHVsIGxpIC5mYXZvcml0ZSB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9t'+
        'd2ZiL2dyYXBoaWNzL3YzL2ljb25fd2lzaGxpc3RfYWRkXzE5eDE0XzAxLmdpZiIpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCUgdHJh'+
        'bnNwYXJlbnQ7DQoJY3Vyc29yOiBwb2ludGVyOw0KCWZsb2F0OiByaWdodDsNCgloZWlnaHQ6IDE0cHg7DQoJbWFyZ2luOiA4cHg7'+
        'DQoJd2lkdGg6IDE5cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgLml0ZW1fbGlzdCB1bCBsaSAuZmF2b3JpdGUucmVtb3ZlIHsN'+
        'CgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvdjMvaWNvbl93aXNo'+
        'bGlzdF9yZW1vdmVfMTl4MTRfMDEuZ2lmIikgbm8tcmVwZWF0IHNjcm9sbCAwJSAwJSB0cmFuc3BhcmVudDsNCn0NCiNtdWx0aWdp'+
        'ZnRlcl9wb3B1cCBkaXYjZ2lmdF9saXN0IHsNCgloZWlnaHQ6IDE4MHB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdiN1c2Vy'+
        'X2xpc3Qgew0KCWhlaWdodDogMTYwcHg7DQp9CQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdiNnaWZ0X2xpc3QgdWwgbGkgZGl2Lml0'+
        'ZW1fbmFtZSB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lkdGg6IDI5MHB4Ow0KCWhlaWdodDogMTdweDsNCglvdmVyZmxvdzogaGlkZGVu'+
        'Ow0KCXBhZGRpbmc6IDZweCAwcHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYjZ2lmdF9s'+
        'aXN0IHVsIGxpIGltZyB7DQoJZmxvYXQ6IGxlZnQ7DQoJaGVpZ2h0OiAyNXB4Ow0KCW1hcmdpbjogMnB4IDEwcHg7DQoJd2lkdGg6'+
        'IDI1cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2I3VzZXJfbGlzdCB1bCBsaSBkaXYuY2hlY2tib3ggew0KCWJhY2tncm91'+
        'bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL2ZsYWdzL213X21lc3NhZ2Vib3hfY2hl'+
        'Y2tib3gyX25vcm1hbGl6ZWQuZ2lmIikgbm8tcmVwZWF0IHNjcm9sbCAwJSAwJSB0cmFuc3BhcmVudDsNCgl0ZXh0LWFsaWduOiBs'+
        'ZWZ0Ow0KCW1hcmdpbjogNXB4IDBweCAwcHggMTBweDsNCgltaW4taGVpZ2h0OiAyMHB4Ow0KCXdpZHRoOiAzMDBweDsgDQoJcGFk'+
        'ZGluZy1sZWZ0OiAzMHB4OyANCgloZWlnaHQ6IDIwcHg7DQoJY3Vyc29yOiBwb2ludGVyOw0KCWZsb2F0OiBsZWZ0Ow0KfQ0KI211'+
        'bHRpZ2lmdGVyX3BvcHVwIGRpdiN1c2VyX2xpc3QgdWwgbGkuc2VsZWN0ZWQgZGl2LmNoZWNrYm94IHsNCgliYWNrZ3JvdW5kOiB1'+
        'cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9mbGFncy9td19tZXNzYWdlYm94X2NoZWNrYm94'+
        'MV9ub3JtYWxpemVkLmdpZiIpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCUgdHJhbnNwYXJlbnQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9w'+
        'dXAgZGl2I2dpZnRfbGlzdCB1bCBsaS5zZWxlY3RlZCB7IA0KCWJvcmRlcjogMXB4IHNvbGlkICNGRkZGMDA7DQp9DQo='
    );
    
    // load options and Initialize.
    options.load(Initialize);
}

/**
 * Battlefield for FightV2 system.
 */
function Battlefieldv2() 
{
    const ERROR_SUCCESS = 0;
    const ERROR_BAD_RESPONSE = 1;
    const ERROR_NO_FIGHT_RESULT = 2;
                          
    var statusTimer = new timerMessage('#msgcontainer'); 
    var StartCity = MW.currentCity();
    var CurrentCity = 0;
    var abort_process = false;
    var bAttackWhiteList = false;
    var bAttackerUsedBoost = false;
    var bDoManualHeal = false;
    var nIcedCount = 0;
    
    var lootCache = new Object();
    var icedPlayerCache = new Object();
    var whiteListCache = new Object();
    
    /** @type {Array}         */ var whiteListArray;
    /** @type {Countdown}     */ var travelCountdown;
    /** @type {Countdown}     */ var fightResumeCountdown;
    /** @type {Countdown}     */ var fightCountdown;
    /** @type {CSAutoPublish} */ var autoPublish;
    
    var logIcon = {
        'loot'     : global.zGraphicsURL + 'achievements/mwach_collector_75x75_01.gif',
        'fight'    : global.zGraphicsURL + 'home/icon_fight_75x75_01.gif',
        'iced'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'kill'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'help'     : global.zGraphicsURL + 'home/icon_call_for_help_75x75_01.gif',
        'heal'     : global.zGraphicsURL + 'red_cross_small.gif',
        'bank'     : global.zGraphicsURL + 'home/icon_loot_75x75_01.gif',
        'whitelist': global.zGraphicsURL + 'DW_feed_grn_01.png',
        'blacklist': global.zGraphicsURL + 'DW_feed_red_01.png',
        'published': global.zGraphicsURL + 'mw_iced_feed1_90x90.gif'
    };
    
    var options = new Config('bfopt', defaults.bfopt);
    
    var fightStats = {
        health         : 0,
        maxHealth      : 0,
        healthpct      : 0, 
        stamina        : 0,
        maxStamina     : 0,
        userCash       : 0,
        yakuza         : 0,
        maxyakuza      : 1500,
        maxtriad       : 1500,
        triad          : 0, 
        totalFight     : 0,
        wonFights      : 0,
        lostFights     : 0,
        revenges       : 0,
        staminaSpend   : 0,
        experience     : 0,
        blacklisted    : 0,
        whitelisted    : 0,
        iced           : 0,
        kill           : 0,
        coins          : 0,
        startGroupAtk  : 0,
        startGroupDef  : 0,
        atkGained      : 0,
        defGained      : 0,
        attackStat     : 0,
        expToNextLevel : 0,
        
        
        cashWon        : {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0},
        
        currCityName   : function() { return '<span class="good">'+global.cities[ CurrentCity ]+'</span>'; },
        exp_per_sta    : function() {
            var n = fightStats.experience / fightStats.staminaSpend;
            return isNaN(n) ? 0 : n.toFixed(2); 
        },
        
        allCitiesCash : function(bExcludeStarted) {
            var c, title = '';
            if (!Util.isBoolean(bExcludeStarted)) bExcludeStarted = true;
            
            for (c in fightStats.cashWon) {
                if ((parseInt(c) !== StartCity || bExcludeStarted !== true) && fightStats.cashWon[c] > 0) {
                    title += global.cities[c] + ': ';
                    title += Util.formatNum(fightStats.cashWon[c]) + '\n';
                }
            }
            return title;
        },
        
        cityCash  : function() {
            return '<span class="good" title="' + fightStats.allCitiesCash(true) + '">'
                 + Util.formatNum(fightStats.cashWon[StartCity]) + '</span>';
        }
        
    };
    /**
     * Create a fight_result from a first attack
     * @constructor
     * @param {Object} htmlText
     * @return {CSQueryResult}
     */
    var CSFightResult = function(htmlText) {
        var obj = h$(htmlText);
        var fr_text, fightbar;
        
        this.fight_wrapper = obj.find('#fight_wrapper');
        
        this.atkbtn_boost_on = obj.find('#fightv2_atkbtn_boost_on a').attr('href');
        this.atkbtn_boost_off = obj.find('#fightv2_atkbtn_boost_off a').attr('href');
        this.poweratkbtn_boost_on = obj.find('#fightv2_poweratkbtn_boost_on a').attr('href');
        this.poweratkbtn_boost_off = obj.find('#fightv2_poweratkbtn_boost_off a').attr('href');
            
        this.opponenet_icon = obj.find('#defender_pic img').attr('src');
        
        try {
            this.popup = Util.parsePopup(htmlText);
        }
        catch(err) {}
        
        if (String(htmlText).indexOf('fight_result = {') > 0) {
            fr_text = Util.substr(htmlText,'fight_result = {',';FightV2',15,0);
        }
        
        if (fr_text) {
            this.fight_result = $.parseJSON(fr_text);
            fightbar = h$(this.fight_result.user_stats.fight_mastery_div);
            this.fightbar = {
                "skill_atk"  : fightbar.find('.fightbar_skill .fightbar_skill_atk').text(),
                "skill_def"  : fightbar.find('.fightbar_skill .fightbar_skill_def').text(),
                "group_size" : fightbar.find('.fightbar_group .fightbar_group_stat:last').text(),
                "group_atk"  : fightbar.find('.fightbar_group .fightbar_group_stat:first div:eq(0)').text(),
                "group_def"  : fightbar.find('.fightbar_group .fightbar_group_stat:first div:eq(1)').text()
            };
        }
        return this;
    };
    /**
     * Create a new opponent class.
     * @return {CSOpponent}
     */
    var CSOpponent = function() {
        
        this.id        = 0;
        this.title     = '';
        this.name      = '';
        this.level     = 0;
        this.mafia     = 0;
        this.clanName  = null;
        this.clanId    = null;
        this.iced      = false;
        this.faction   = '';
        this.attack    = null;
        this.pwratk    = null;
        this.fights    = 0;
        this.alive     = false;
        this.lastWon   = 0;
        this.lastLost  = 0;
        this.lastXp    = 0;
        this.lastCash  = 0;
        this.isThief = false;
        
        this.anchor = function() {
            return '<a href="'+MW.getProfileLink(this.id)+'" target="_black">'+this.name+'</a>';
        };
        this.profile = function() {
            return MW.getProfileLink(this.id);
        };
        this.clan = function() {
            if (this.clanName && this.clanId) {
                return '<a href="'+MW.getFamilyLink(this.clanId)+'" target="_black">'+Util.setColor(this.clanName,'red')+'</a>'; 
            }
            return '';
        };
        this.isListed = function(list_name) {
            return PlayerList[list_name].exists(this.id);            
        };
        /**
         * @return {CSOpponent}
         */
        this.clone = function() {
            var n = new CSOpponent();
            for (m in n) {
                n[m] = this[m];
            }
            return n
        };
        
        return this;
    };
    
    /**
     * Parse an opponent table. 
     * @param {Object} htmlText
     */
    var CSOpponentTable = function(htmlText) {
        var jQry = h$(htmlText);
        var fields = new Array();
        // fighters table
        jQry.find('.fight_table tr:has(a)').each(function(index, element) 
        {
            var elem, opp = new CSOpponent();
            try {
                if ((elem = e$('img:regex(src,triads|yakuza)', element))) {
                    opp.faction = elem.attr('alt');
                }
                // attack button
                if ( (elem = e$('a:regex(href,action=attack)', element)) ) {
                    opp.attack = elem.attr('href');
                    opp.id = Util.parseNum(Util.uSplit(opp.attack).opponent_id);
                    if (!Util.isSet(opp.id) || opp.id === 0) {
                        return;
                    }
                }
                else {
                    return; // cant get opponent id and attack url.
                }
                opp.title    = $.trim($('td:eq(0) > span:first', element).text());
                if ( elem = e$('td:eq(0) a:regex(href,controller=clan)', element) ) {                    
	                opp.clanId   = global.Base64.decode(Util.uSplit(elem.attr('href')).id);
	                opp.clanName = $.trim(elem.text());
                }
                opp.name     = $.trim($('td:eq(0) a:regex(href,controller=stats)', element).text());
                opp.level    = Util.parseNum(Util.textNodes($('td:eq(0)', element)));
                opp.iced     = ($('img:regex(src,iced)', element).length > 0);
                opp.mafia    = Util.parseNum($('td:eq(1)', element).text());
                
                fields.push(opp);
            }
            catch(err) {
                logErr$(err);
            }
        });
        
        /**
         * @return {CSOpponent}
         */
        this.get = function(index) {
            return fields[index];
        }
        
        this.each = function(callback) {
            $.each(fields, callback);
        }
        
        this.length = fields.length;
        
        delete jQry;
        return this;
    };
    
    /**
     * Create an ICE Stolen popup class
     * @param {String} popup_html
     * @return {CSStolenIcePopup}
     */
    var CSStolenIcePopup = function(popup_html) {
        var popup    = $('div.ice_stolen_wrapper', h$(popup_html));
        this.message = popup.find('.ice_stolen_revenge_name').html();
        this.name    = popup.find('.ice_stolen_revenge_name a').text();
        this.action  = popup.find('.ice_stolen_revenge_action a').attr('href');
        this.defhtml = popup.find('.ice_stolen_enemy_mafia_title').html();
        this.defStat = Util.parseNum(popup.find('.ice_stolen_enemy_mafia_value').text());
        this.pic     = popup.find('.ice_stolen_thief_pic img').attr('src');
        this.id      = Util.parseNum(Util.uSplit(this.action).opponent_id);
        return this;
    };
    
    /**
     * Create a Loot class
     * @param {String} item_html
     * @return {CSItemCard}
     */
    var CSItemCard = function(item_html) {
        var item      = c$('div').html(item_html);
        this.title    = item.find('#fake_item_card_title').text();
        this.pic      = item.find('#fake_item_card_img img').attr('src');
        this.quantity = item.find('#fake_item_card_qty, #fake_item_card_subtitle').text();
        
        if ( /victory/.test(this.pic) ) {
            this.type = 'coins';
        }
        return this;
    };
    
    /**
     * Create a Loot class
     * @param {String} item_html
     * @return {CSItemLoot}
     */
    var CSItemLoot = function(item_html) {
        var item      = c$('div').html(item_html);
        this.item_id  = item.find('.item_card_mini').attr('item_id');
        this.pic      = item.find('.item_card_mini img').attr('src');
        return this;
    };
    
    /**
     * Create an ICE popup class
     * @param {String} popup_html
     * @return {CSIcePopup}
     */
    var CSIcePopup = function(popup_html) {
        this.count  = '';
        this.action = '';
        this.canPublish = false;
        this.text = 'bringing your body count to ';
        
        if ( /iced_event_iced_popup/.test(popup_html) ) {
            var popup   = $('#iced_event_iced_popup', h$(popup_html));
            this.count  = popup.find('#iced_event_iced_status_fightstats_count div:eq(2)').text();
            this.text   = 'Event ice count ';
            var obj = /(MW.Feed\(\{.*?\}\);)\s?MW./.exec(popup_html);
            if (obj[1]) {
                this.canPublish = true;
                this.action = '<a href="javascript: void(0);" class="sexy_button_new medium white sexy_announce_gray" '+
                              'onclick="'+obj[1]+'"><span><span>Share</span></span></a>';
            }
        }
        else if ( /iced_popv2_wrapper/.test(popup_html) ) {
            var popup   = $('div.iced_popv2_wrapper', h$(popup_html));
            this.count  = popup.find('.iced_popv2_stats_table .iced_popv2_table_right:first').text();
            
            if (popup.find('.icev2_share_allowed').css('display') === 'block') {
                this.action = popup.find('.iced_popv2_share_action').html(); 
                this.canPublish = true;
            } else {
                this.action = popup.find('.iced_popv2_noshare_text').html();
            }
        }
        return this;
    };
    
    var CSAutoPublish = function() {
        var publish = new Array();
        /**
         * @param {CSIcePopup} popup
         */
        this.add = function(popup, oppName) {
            if ( !popup ) {
                return;
            }
            if ( popup.action && popup.canPublish === true ) {
                var feed, obj;
                try {
	                obj = /"MW.Feed\((\{.*?\})\);"/.exec(popup.action);
	                eval ( 'var feed='+ obj[1] + ';' );
	                publish.push({
	                    'text': popup.count+' by taking down '+oppName,
	                    'href': String(unescape(feed.attachment.href)).replace(/&amp;/g,'&')
	                });
                }
                catch(err) {
                    logErr$(err);
                }
            }
        };
        this.length = function() {
            return publish.length;
        };
        this.publishTo = function(target_id, callback) {
            var this_publish = publish.slice();
	        var properties = new Object();
	        publish = new Array();
            
	        $.each(this_publish, function(index, post) {
                properties['#'+(index+1)+' ICE'] = {
                    'text': post.text,
                    'href': post.href
                };
	        });
	        facebook.streamPublish({
	            'target'      : target_id,
	            'name'        : '{*actor*} has knocked out some players!',
	            'properties'  : properties
	        }, function(post_id) {
                if (post_id && !post_id.error_code) {
                    addToLog( 'You\'ve  '+this_publish.length+' ICES.<br>Auto-Publish has posts all and reseted count.', 'published' );
                }
                else if (post_id.error_code) {
	                addToLog( 'There is the error code #'+post_id.error_code+' publishing your ices.', 'published' );
                }
                callback && callback();
	        }, true);
        };
        this.clear = function() {
            publish = new Array();
        };
        return this;
    };
    
    /**
     * Create a new list
     * @param {String} list_id Used to save/load
     * @return {CSList}
     */
    var CSList = function(list_id) {
        this.id = list_id;
        /**
         * Add opponent to a list
         * @param {Object} id
         * @param {CSOpponent} opp
         */
        this.add = function(data) {
            var now = (new Date()).toDateString();
            if ( !Util.isSet(data.id) ) { 
                return; 
            }
            if ( data.level ) {
                options.get(list_id)[data.id] = data.name + '  level ' + data.level + ' at '+now;
            }
            else {
                options.get(list_id)[data.id] = data.name + ' at '+now;
            }
            options.save();
        };
        /**
         * Return true if opponent exists
         * @param {Object} id
         * @return {Boolean}
         */
        this.exists = function(id) {
            return Util.isSet(id) && Util.isSet(options.get(list_id)[id]);
        };
        this.each = function(callback) {
            $.each(options.get(list_id), callback);
        };
        this.remove = function(id) {
            options.get(list_id)[id] = null;
        };
        
        /**
         * @return {Array}
         */
        this.toArray = function() {
            var new_array = [];
            $.each(options.get(list_id), function(id, name) {
                if (parseInt(id) && Util.isString(name));
                    new_array.push({'id':id , 'name':name});
            });
            return new_array;
        };
        
        return this;
    };
    
    var CSPlayerList = function() {
        var players = new Array();
        /** @type {CSOpponent} */ 
        this.current = null;
        /** @type {CSOpponent} */ 
        this.revenge  = null;
        /** @type {CSList} */ 
        this.blackList = null;
        /** @type {CSList} */ 
        this.whiteList = null;
        /** @type {CSList} */ 
        this.clanList = null;
        /**
         * @return {Boolean}
         */
        this.addCurrentToBlackList = function() {
            var bNew = !this.blackList.exists(this.current.id);
            this.blackList.add(this.current);
            return bNew;
        };
        /**
         * @return {Boolean}
         */
        this.addCurrentToWhiteList = function() {
            var bNew = !this.whiteList.exists(this.current.id);
            this.whiteList.add(this.current);
            return bNew;
        };
        /**
         * Set the current opponent
         * @param {Number} id
         * @return {CSOpponent}
         */
        this.setCurrent = function(id) {
            if (this.players.length < 1) {
                return this.current = undefined;
            }
            if (typeof id === 'undefined') {
                return this.current = undefined;
            }
            id = parseInt(id);
            this.current = this.players[id];
            if (this.players.length > 1)
                this.players.splice(id, 1);
            else
                this.players = new Array();
            
            return this.current;
        };
        /**
         * @return {CSOpponent}
         */
        this.setRandomCurrent = function() {
            if ( this.revenge ) {
                this.current = this.revenge;
                this.revenge = null;
                return this.current;
            }
            if (this.players.length > 1) {
                return this.setCurrent(Math.floor(Math.random() * this.players.length));
            }
            else {
                return this.setCurrent(0);
            }
        };
        /**
         * Add a new opponent to list
         * @param {CSOpponent} opponent
         */
        this.add = function(opponent) {
            if (this.players.length > 30) {
                this.players = [];
                if (this.current) 
                    this.players.push(this.current);
            }
            this.players.push(opponent);
        };
        /**
         * Add a list of opponents
         * @param {Array} arr
         */
        this.setPlayers = function(arr) {
            this.players = arr;
        };
        /**
         * @return {Number}
         */
        this.length = function() {
            return this.players.length;
        };
        this.clear = function() {
            this.players = new Array();
        };
        this.sort = function(by) {
	        var sortBy = {
	            'name': function(a, b) {
	                var x = a.name.toLowerCase();
	                var y = b.name.toLowerCase();
	                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	            },
	            'level': function(a, b) {
	                return b.level - a.level;
	            },
	            'mafia': function(a, b) {
	                return b.mafia - a.mafia;
	            },
	            'iced': function(a, b) {
	                return a.iced ? -1 : 1 ;
	            }
	        };
            if ( this.players.length > 0 ) {
                this.players.sort(sortBy[by]);
            }
        };
        this.each = function(fn) {
            if (typeof fn !== 'function')
                return;
            for (var i = this.players.length - 1; i >= 0; i--) {
                fn.apply(this.players[i], [i, this.players[i]]);
            }   
        };
        
        return this;
    };

    var PlayerList = new CSPlayerList();
    
    // EVENTS
    var Events = {
        /*
        refresh_groups_click: function() {
            Groups.refresh(function() {
               Groups.addToSelect('#bfopt_autopublishin', options.get('autoPublishIn'));
            });
            return false;
        },
        */        
        use_boost_click: function() {
            bAttackerUsedBoost = bAttackerUsedBoost === false;
            updateAttackerUsedBoost();
            return false;
        },
        saveSession_click: function() {
            var outText = 'GENERAL:\n';
            $.each({
                'Total Fights: ':'totalFight',
                'Won Fights: ':'wonFights',
                'Lost Fights: ':'lostFights',
                'Revenges: ':'revenges',
                'Attack gained: ':'atkGained',
                'Defense Gained: ':'defGained',
                'Experience Gained: ':'experience',
                'Experience Per Stamina: ':'exp_per_sta',
                'Victory Coins: ':'coins',
                'Iced Players: ':'iced',
                'Killed Players: ':'kill'
            },
            function(name, value) {
                if (Util.isFunc(fightStats[value])) {
                    outText += name + fightStats[value]();
                } else {
                    outText += name + fightStats[value];
                }
                outText += '\n';
            });
            
            outText += '\n\nCASH:\n';
            outText += fightStats.allCitiesCash(false) + '\n';
            
            outText += '\n\nLOOT:\n';
            $.each(lootCache, function(name, shtml) {
                var loot = $('<div>'+shtml+'</div>');
                outText += $.trim(Util.textNodes(loot));
                if ( e$('.attack', loot) ) {
                    outText += ' (Attack: ' + loot.find('.attack').text()+')';
                }
                if ( e$('.defense', loot) ) {
                    outText += ' (Defense: ' + loot.find('.defense').text()+')';
                }
                outText += '\n';
            });
            outText += '\n\nICED:\n';
            $.each(icedPlayerCache, function(id, bool) {
                outText += MW.getProfileLink(id) + '\n';
            });
            showTextPopup('Session stats, copy to share:', outText);
            return false;
        },
        showLog_click: function() {
            var name = String($(this).attr('href')).substring(1);
            $('#events_list .buttons a').css('opacity', 0.5);
            $(this).css('opacity', 1);
            showDiv(name, '_logs');
            return false;
        },
        addNewToList_click: function() {
            var list_name = $(this).attr('name');
            
            var profileUrl = showPromptPopup(
                'Paste here all MW profiles by line delimited:', '',
                function(text) { addMWProfiles(list_name, text); }
            );
            return false;
        },
        deleteSelected_click: function() {
            var name = $(this).attr('name').toLowerCase();
            $('option:selected', '#bfopt_'+name).remove();
            options.fromDomElements();
            options.save();
            return false;
        },
        clearList_click: function() {
            var name = $(this).attr('name');
            $('#bfopt_'+name.toLowerCase()).empty();
            options.set(name, {});
            options.save();
            return false;
        },
        mwProfile_click: function() {
            var name = $(this).attr('name').toLowerCase();
            var selectedElts = $('#bfopt_'+name).find('option:selected');
            
            if (selectedElts.length === 0) {
                showHelpPopup({
                    icon: 'info',
                    title: 'No opponents selected.',
                    message: 'You need to select at least one opponent for go to his profile page.'
                });
                return;
            }
            
            if (selectedElts.length < 2 || confirm('Are you sure to open ALL selected users?')) {
                selectedElts.each(function(index, elem) {
		            if ( name === 'clanlist' ) {
		                unsafeWindow.open( MW.getFamilyLink(elem.value) );
		            } else {
		                unsafeWindow.open( MW.getProfileLink(elem.value) );
		            }
                });
            }
            return false;
        },
        addFromList_click: function() {
            var name = $(this).attr('name');
            var list = options.get(name);
            
            showPromptPopup(
                'Paste here the encoded list to add:', '', 
                function(resp) 
                {
                    if (typeof(resp) !== 'string' || resp.length < 2) {
                        return;
                    }
                    var index = resp.indexOf('base64,');
                    if (index > 0) {
                        resp = global.Base64.decode(resp.substr(index + 7));
                    }
                    $.each($.parseJSON(resp), function(name, value) {
                        if (parseInt(name)) 
                            list[name] = value;
                    });
                    options.toDomElements();
                    options.save();
                }
            );
            return false;
        },
        getList_click: function() {
            var name = $(this).attr('name');
            var sOutput = String($.toJSON(options.get(name)));
            if (sOutput.length < 5) {
                return false;
            }
            showTextPopup(
                'Copy this encoded text to save or share your list:', 
                'data:application/json;base64,' + global.Base64.encode(sOutput)
            );
            return false;
        },
        sort_click: function() {
            PlayerList.sort(this.id.match(/sort_by_(\w+)/)[1]);
            genEnemyListDom();
            return false;
        },
        refresh_click: function() {
            $('#opponents_table').empty();
            showFightRewards();
            options.fromDomElements();
            setTimeout(function() {
                PlayerList.clear();
                refreshPlayerList(function(n_parsed, n_added) {
                    if (n_added > 0) {
                        var s_parsed = '<div style="text-align:left;">Total Opponents Parsed: ';
                        var s_added  = '<div style="text-align:left;">Total Opponents Added: ';
                        s_parsed += Util.setColor(n_parsed,'green')+'</div>'; 
                        s_added  += Util.setColor(n_added, 'green')+'</div>';
                        showFightRewards(s_parsed+s_added);
                        genEnemyListDom();
                    }
                    else {
                        sendMessage('No players found. Try change filters and click "Refresh".');
                    }
                }, false);
            }, 500);
            return false;
        },
        attack_click: function() {
            abort_process = false;
            options.fromDomElements();
            var id = this.id.match(/attack_id_(\d+)/)[1];
            var url = PlayerList.setCurrent(id).attack;
            
            if (options.get('forceStartingCity')) { 
                StartCity = options.get('startingCity');
            }
            toFightScreen();
            reqSurvey(function() {
                manualAttack(url);
            });
            return false;
        },
        powerAttack_click: function() {
            if (bAttackerUsedBoost) {
                manualAttack(PlayerList.current.pwratk_boost);
            }
            else {
                manualAttack(PlayerList.current.pwratk);
            }
            return false;
        },
        attackAgain_click: function() {
            if (bAttackerUsedBoost) {
                manualAttack(PlayerList.current.attack_boost);
            }
            else {
                manualAttack(PlayerList.current.attack);
            }
            return false;
        },
        runAway_click: function() {            
            abort_process = true;
            clearAllTimers();
            bAttackWhiteList = false;
            options.setToElement('blackList');
            options.setToElement('whiteList');
            options.save();
            if (PlayerList.length() > 0) genEnemyListDom();
            toStartScreen();
            return false;
        },
        autoMode_click: function() {
            abort_process = false;
            options.fromDomElements();
            options.save();
            toFightScreen();
            if (options.get('forceStartingCity')) {
                StartCity = options.get('startingCity');
            }
            addTravelCountdown();
            addFightCountdown();
            reqSurvey(AttackNewOpponent);
            return false;
        },
        attackWhiteList_click: function() {
            bAttackWhiteList = true;
            abort_process = false;
            whiteListArray = PlayerList.whiteList.toArray();
            whiteListCache = new Object();
            Events.autoMode_click();
            return false;
        },
        stop_click: function() {
            $(this).remove();
            abort_process = true;
            updateStats();
            clearAllTimers();
            setTimeout(function() {
                sendMessage('AutoFight was stopped.');
                addAutoControls(true);
            }, 2000);
            return false;
        },
        skip_click: function() {
            $(this).remove();
            PlayerList.current.skip = true;
            return false;
        },
        autoHeal_click: function() {
            $(this).remove();
            bDoManualHeal = true;
            return false;
        },
        heal_click: function() {
            hideFightControls();
            healPlayer(addManualControls);
            return false;
        }
    };
    // POPUP
    var popupElt = new domPopupObject('battlefield_popup', {
        type: 'main',
        title: '<img src="'+global.resource.battlefield_title+'">',
        width: 750,
        onclose: function() {
            clearAllTimers();
            abort_process = true;
            options.fromDomElements();
            options.save();
            PlayerList.clear();
        }
    });
    // Regex Expresions
    var Regex = {
        user_health: function(text) {
            return parseInt(Util.doRgx(/user_health..\s?=\s?parseInt..(\d+)/, text).$1 || 0);
        },
        exp_to_next_level: function(text) {
            return parseInt(Util.doRgx(/exp_to_next_level..\s?=\s?parseInt..(\d+)/, text).$1 || 0);
        },
        user_stamina: function(text) {
            return parseInt(Util.doRgx(/user_stamina..\s?=\s?parseInt..(\d+)/, text).$1 || 0);
        },
        fight_results: function(text) {
            var a = /class=.fight_results./;
            return a.test(text);
        },
        fight_controller: function(text) {
            return /<!--[^:]*:\s*fight_controller/.test(text);
        },
        icedCount: function(text) {
            return Util.doRgx(/description.:.\D+([\d,]+)/, text).$1 || 0;
        },
        stashCount: function(text) {
            return Util.doRgx(/popFightLootFeed_\d/, text).$0;
        },
        factionProgress: function(text) {
            return parseInt(Util.doRgx(/^(\d+)/, text).$1 || 0);
        }
    };
    
    // GENERATE ALL MAIN DOM ELEMENTS
    function genMainDom() {
        
        function cb(id, text) {
            return c$('span').css('margin-right', 5)
                .append(c$('input:checkbox','id:' + id))
                .append(c$('label', 'for:'+id).text(text));
        }
        
        popupElt.content.css('margin',0);
        
        var battle_div = c$('div', 'id:fv2_widget_wrapper').height(350).appendTo(popupElt.content);
        var fightStatus = c$('div', 'id:fight_wrapper').appendTo(battle_div);
        /*
        c$('div', 'id:wrapper_attacker,class:userbox').appendTo(fightStatus);
        
        var fight_btn_panel = c$('div', 'id:fight_btn_panel').appendTo(fightStatus);
        
        c$('div', 'id:attacker_best_items').appendTo(fight_btn_panel)
        .append(c$('div', 'class:subhdr').text('Top Items'))
        .append(c$('ul', 'class:fightV2ItemList')
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:attacker_best_item_1')))
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:attacker_best_item_2')))
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:attacker_best_item_3')))
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:attacker_best_item_8')))
        );
        c$('div', 'id:wrapper_actions').appendTo(fight_btn_panel)
        
        c$('div', 'id:defender_best_items').appendTo(fight_btn_panel)
        .append(c$('div', 'class:subhdr').text('Top Items'))
        .append(c$('ul', 'class:fightV2ItemList')
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:defender_best_item_1')))
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:defender_best_item_2')))
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:defender_best_item_3')))
            .append(c$('li').append(c$('div','class:fightV2ItemDiv,id:defender_best_item_8')))
        );
        
        c$('div').css('clear','both').appendTo(fight_btn_panel);
        c$('div', 'class:boostcontainer').appendTo(fight_btn_panel);
        
        c$('div', 'id:wrapper_defender,class:userbox').appendTo(fightStatus);
        
        c$('div').css('clear','both').appendTo(fightStatus);
        */
        var tabs = new domTabObject(
            c$('div', 'options_wrapper').appendTo(battle_div), 'fightOpt', 
            ['Config Page 1','Config Page 2','BlackList','WhiteList','ClanList'], 310, 738, 
            {'background':'transparent','border-bottom':'0px'}
        );
        
        // ---------------
        // CONFIG PAGE 1
        // ---------------
        var divListElt = c$('ul').appendTo(tabs.getLayout(0));
        
        // HEAL
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_useheal', 'Heal in '))
        .append(c$('select','bfopt_healin').width(100))
        .append(c$('label','for:bfopt_healwhen').text(' if less than:'))
        .append(c$('input:text', 'id:bfopt_healwhen,size:5,class:right'));
        // NAME FILTER
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_usenamefilter', 'Filter:'))
        .append(c$('input:text', 'id:bfopt_namefilterval').width(160))
        .append(cb('bfopt_usefilterregex', 'Regex syntax.'));
        // BANK MONEY
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_usebank', 'Bank when money is more than:'))
        .append(c$('input:text', 'id:bfopt_usebankwhen,size:5,class:right'));
        // SKIP WRONG CASH
        c$('li').appendTo(divListElt)        
        .append(cb('bfopt_skipminimalcash', 'Skip target if cash is less than:'))
        .append(c$('input:text', 'id:bfopt_minimalcash').width(100));
        // ATTACK DELAY 1
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_useattackdelay', 'Delay when attack same player:'))
        .append(c$('select', 'id:bfopt_attackdelay,class:right').width(68));
        // ATTACK DELAY 2
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_usenewplayerdelay', 'Delay when changing player:'))
        .append(c$('select', 'id:bfopt_newplayerdelay,class:right').width(68));
        // SKIP IF HEALT AMOUNT
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_useskipifhealt', 'Skip if enemy health is:'))
        .append(c$('select', 'id:bfopt_skipifhealt').width(120));
        // SKIP OTHER DAMAGE  
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_skipifotherdamage', 'Skip if damage from others.'));
        // ATTACK COUNT
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_useattackcount', 'Maximum attacks:'))
        .append(c$('input:text', 'id:bfopt_attackcounter,size:5'))
        .append(cb('bfopt_usepowerattack', 'Power Attack!'));
        // POWER ATTACK / ATTACK WHEN LOST
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_attackwhenlost', 'Attack when lost.'))
        .append(cb('bfopt_attackwhenlostbut', 'If attacks less than:'))
        .append(c$('input:text', 'id:bfopt_attackwhenlostbutif').width(35));
        // STOP ON LEVELUP  
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_usestopwheniced', 'Stop when ICED amount is:'))
        .append(c$('input:text', 'id:bfopt_stopwheniced, size:5, class:right'));
        // SKIP CASH FROM DIFFERENT CITY
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_skipdiffcitycash', 'Skip target if cash from different city.'));
        // STOP ON LEVELUP
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_stopbeforelvlup', 'Stop before LevelUp when remain:'))
        .append(c$('input:text', 'id:bfopt_explefttostop, size:5, class:right'));
        // STOP AFTER LEVEL UP
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_stopafterlevelup', 'Stop after LevelUp and show popup.'));
        // REVENGE  
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_takerevenge', 'Revenge Stolen Ices.'))
        .append(cb('bfopt_takerevengeifwin', 'Only if i could win.'));
        // SKIP ICED TARGETS
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_skipiced', 'Skip iced targets.'))
        .append(cb('bfopt_skipicedplayers', 'Skip if iced by me.'));
        // SPEND STAMINA
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_stopwhenstamina', 'Stop when stamina is less than:'))
        .append(c$('input:text', 'id:bfopt_staminatokeep, size:5, class:right'));
        // BANGKOK FACTIONS
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_usefactions', 'Bangkok faction:'))
        .append(c$('select', 'id:bfopt_bangkokfaction').width(95));
        //.append(cb('bfopt_skipnofaction', 'Skip no points.'));
        // LEVEL CAP
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_skiplevel', 'Skip users level'))
        .append(c$('select', 'bfopt_skiplevelway').width(80))
        .append(c$('label','for:bfopt_skiplevelof').text(' than:'))                           
        .append(c$('input:text', 'id:bfopt_skiplevelof,size:5,class:right'));
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_skiplevelbut', 'But attack if mafia is'))  
        .append(c$('select', 'bfopt_skiplevelbutway').width(80))
        .append(c$('label','for:bfopt_skiplevelbutmafia').text(' than:'))                           
        .append(c$('input:text', 'id:bfopt_skiplevelbutmafia,size:5,class:right'));
        // MAFIA CAP
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_skipmafia', 'Skip users mafia'))
        .append(c$('select', 'bfopt_skipmafiaway').width(80))
        .append(c$('label','for:bfopt_skipmafiaof').text(' than:'))                           
        .append(c$('input:text', 'id:bfopt_skipmafiaof,size:5,class:right'));
        c$('li').appendTo(divListElt)
        .append(cb('bfopt_skipmafiabut', 'But attack if level is'))  
        .append(c$('select', 'bfopt_skipmafiabutway').width(80))
        .append(c$('label','for:bfopt_skipmafiabutlevel').text(' than:'))                           
        .append(c$('input:text', 'id:bfopt_skipmafiabutlevel,size:5,class:right'));
        
        // -----------------
        // CONFIG PAGE 2
        // -----------------
        
        var divListElt = c$('ul').appendTo(tabs.getLayout(1));
        
        // LOG LENGTH
        c$('li').appendTo(divListElt).css('width','99%')
        .append(c$('label','for:bfopt_maxloglength').text('Log Length:').css('margin-left',4))
        .append(c$('select', 'bfopt_maxloglength').width(100).css('margin-left',5))
        .append(cb('bfopt_showsocialevents', 'Show social events in log.'))
        .append(cb('bfopt_showlootevents', 'Show loot events in log.'));
        
        c$('li').appendTo(divListElt).css('width','99%')
        .append(c$('span').text('Deposit in: ').css('margin-left',4))
        .append(cb('bfopt_depositin1',  'New York'))
        .append(cb('bfopt_depositin2',  'Cuba'))
        .append(cb('bfopt_depositin3',  'Moscow'))
        .append(cb('bfopt_depositin4',  'Bangkok'))
        .append(cb('bfopt_depositin5',  'Las Vegas'))
        .append(cb('bfopt_depositin6',  'Italy'))
        .append(cb('bfopt_depositin7',  'Brazil'));
        
        c$('li').appendTo(divListElt).css('margin-top',10).css('width','99%')
        .append(cb('bfopt_forcestartingcity', 'Start City:'))
        .append(c$('select', 'bfopt_startingcity').width(100))
        .append(cb('bfopt_fightcitytime', 'Travel after:'))
        .append(c$('input:text', 'id:bfopt_fightcitytimeout').width(60))
        .append(c$('span').text(' minutes. '))
        .append(cb('bfopt_travelwhennotargets', 'Travel if no targets to attack.'));
        
        c$('li').appendTo(divListElt).css('margin-bottom',10).css('width','99%')
        .append(c$('span').text('Cities to travel: ').css('margin-left',4))
        .append(cb('bfopt_fightinnewyork',  'New York'))
        .append(cb('bfopt_fightincuba',     'Cuba'))
        .append(cb('bfopt_fightinmoscow',   'Moscow'))
        .append(cb('bfopt_fightinbangkok',  'Bangkok'))
        .append(cb('bfopt_fightinlasvegas', 'Las Vegas'))
        .append(cb('bfopt_fightinitaly',    'Italy'))
        .append(cb('bfopt_fightinbrazil',   'Brazil'));
        
        c$('li').appendTo(divListElt).css('width','99%')
        .append(cb('bfopt_fighttime', 'Pause battlefield after:'))
        .append(c$('input:text', 'id:bfopt_fighttimeout').width(60))
        .append(c$('span').text(' minutes.  And resume after: '))
        .append(c$('input:text', 'id:bfopt_fighttimeoutresume').width(60))
        .append(c$('span').text(' minutes.'));
        
        c$('li').appendTo(divListElt).css('margin-bottom',10).css('width','99%')
        .append(cb('bfopt_keepfigthing', 'Keep running after stamina/health is out and resume after:'))
        .append(c$('input:text', 'id:bfopt_resumedelay').width(60))
        .append(c$('span').text(' minutes.'));
        
        c$('li').appendTo(divListElt).css('width','99%')
        .append(cb('bfopt_autopublish',  'Auto Publish after: '))
        .append(c$('select', 'bfopt_autopublishafter').width(80))
        .append(c$('span').text(' ices.  In Page/Group ID or empty for wall: '))
        .append(c$('input:text', 'bfopt_autopublishin').width(180));
        //.append(c$('a', 'href:#').text('Refresh').click(Events.refresh_groups_click));
        
        // -----------------
        // BLACKLIST OPTIONS
        // -----------------
        var listTab = tabs.getLayout(2);
        
        c$('div').css({'float':'left','text-align':'left','margin':5,'width':500}).appendTo(listTab)
        .append(c$('input:checkbox','bfopt_useblacklist'))
        .append(c$('label','for:bfopt_useblacklist').text('Add players who defeat me to BlackList:'))
        .append(c$('br'))
        .append(c$('select', 'id:bfopt_blacklist,multiple:multiple').width(500).height(280));
        
        var table = c$('div','blackList_table').appendTo(listTab).css({
            'float': 'left',
            'padding-top': 50
        });
        c$('dl').appendTo(table).css('margin',5)
        .append(b$('Add New', 'id:add_new_list,name:blackList,class:short white fightV2AttackBtn'));
        c$('dl').appendTo(table).css('margin',5)
        .append(b$('Delete', 'id:delete_item_list,name:blackList,class:short white fightV2AttackBtn'));
        c$('dl').appendTo(table).css('margin',5)
        .append(b$('Clear List', 'id:clear_list,name:blackList,class:short white fightV2AttackBtn'));
        c$('dl').appendTo(table).css('margin',5)
        .append(b$('MW Profile', 'id:go_profile,name:blackList,class:short white fightV2AttackBtn'));
        c$('dl').appendTo(table).css('margin',5)
        .append(b$('Load List', 'id:add_from_list,name:blackList,class:short white fightV2AttackBtn'));
        c$('dl').appendTo(table).css('margin',5)
        .append(b$('Save List', 'id:get_current_list,name:blackList,class:short white fightV2AttackBtn'));
        
        $('a', listTab).css('margin-left',5);
        
        // -----------------
        // WHITELIST OPTIONS
        // -----------------
        listTab = tabs.getLayout(3);
        
        c$('div').css({'float':'left','text-align':'left','margin':5,'width':500}).appendTo(listTab)
        .append(c$('input:checkbox','bfopt_addusertowlist'))
        .append(c$('label','for:bfopt_addusertowlist').text('Add to WhiteList if gain same or more than:'))
        .append(c$('input:text', 'id:bfopt_cashneedtogain,class:right').width(80))
        .append(c$('br'))
        .append(c$('select', 'id:bfopt_whitelist,multiple:multiple').width(500).height(280));
        
        table.clone().appendTo(c$('div','whiteList_table').appendTo(listTab))
        .find('a').each(function(index, elem) {
            $(elem).attr('name', 'whiteList');
        });
        
        // -----------------
        // CLANLIST OPTIONS
        // -----------------
        listTab = tabs.getLayout(4);
        
        c$('div').css({'float':'left','text-align':'left','margin':5,'width':500}).appendTo(listTab)
        .append(c$('input:checkbox','bfopt_skipnolistedclans'))
        .append(c$('label','for:bfopt_skipnolistedclans').text('Skip all clans but attack to (uncheck to skip only listed clans):'))
        .append(c$('select', 'id:bfopt_clanlist,multiple:multiple').width(500).height(280));
        
        table.clone().appendTo(c$('div','clanList_table').appendTo(listTab))
        .find('a').each(function(index, elem) {
            $(elem).attr('name', 'clanList');
        });
        
        // Assign click events
        $('#add_new_list', '#options_wrapper').click(Events.addNewToList_click);
        $('#delete_item_list', '#options_wrapper').click(Events.deleteSelected_click)
        $('#clear_list', '#options_wrapper').click(Events.clearList_click)
        $('#go_profile', '#options_wrapper').click(Events.mwProfile_click)
        $('#add_from_list', '#options_wrapper').click(Events.addFromList_click)
        $('#get_current_list', '#options_wrapper').click(Events.getList_click)
        
        // fix class
        $('input:text, select', battle_div).addClass('black_box');
        
        // ---------------
        // USER PANELS
        // ---------------
        var wrapper_info = c$('div', 'id:wrapper_info').appendTo(popupElt.content);
        
        var fightV2_msg_ctrl = c$('div','class:fightV2_msg_ctrl').appendTo(wrapper_info);
        c$('div','class:fightV2_result').appendTo(wrapper_info);
        c$('div').css('clear','both').appendTo(wrapper_info);
        
        // START PANEL
        c$('center', 'ctrlcontainer').appendTo(fightV2_msg_ctrl)
        .append(b$('Random Attacks!', 'class:short red').click(Events.autoMode_click))
        .append(b$('Attack WhiteList!', 'class:short red').css('margin-left', 5).click(Events.attackWhiteList_click));
        
        // ACTIVE STATUS
        c$('center', 'msgcontainer').css('margin',5).appendTo(fightV2_msg_ctrl);
        
        // BOTTOM PART
        var wrapper_log_stats = c$('div', 'id:wrapper_log_stats').appendTo(popupElt.content);
        
        // STATS
        var fightV2_stats = c$('div', 'class:fightV2_stats').appendTo(wrapper_log_stats);
        
        // generate stats
        $.each([
            {name:'Time left to pause:',                           id:'timetopause',           timer:true  },
            {name:'Time left to travel:',                          id:'timetotravel',          timer:true  },
            {name:'Current City:', icn:'icon_travel_32x17_01.gif', id:'currcityname'                       },
            {name:'Yakuza',        icn:'bangkok_yakuza_small.gif', id:['maxyakuza','yakuza'],     city:4   },
            {name:'Triad',         icn:'bangkok_triads_small.gif', id:['maxtriad','triad'],       city:4   },
            {name:'Total Fights:',      cls:'stamina',             id:'totalfight'                         },
            {name:'Won Fights:',        cls:'attack',              id:'wonfights'                          },
            {name:'Lost Fights:',       cls:'defense',             id:'lostfights'                         },
            {name:'Revenge:',           cls:'attack',              id:'revenges'                           },
            {name:'Attack gained:',     cls:'mafia_attack',        id:'atkgained'                          },
            {name:'Defense gained:',    cls:'mafia_defense',       id:'defgained'                          },
            {name:'Exp. gained:',       cls:'experience',          id:['exptonextlevel','experience']      },
            {name:'Exp. per stamina:',  cls:'experience',          id:'exp_per_sta'                        },
            {name:'Victory Coins:',     cls:'stat_victory',        id:'coins'                              },
            {name:'Fighters ICED:',     cls:'stat_iced',           id:'iced'                               },
            {name:'Fighters KILL:',     cls:'stat_kill',           id:'kill'                               },
            {name:'Cash:',              cls:'cash',                id:'citycash'                           },
            {name:'Blacklisted:',       cls:'listed',              id:'blacklisted'                        },
            {name:'Whitelisted:',       cls:'listed',              id:'whitelisted'                        }
        ], function(index, stat) 
        {
            var span = c$('span').text(stat.name);
            var dl = c$('dl').appendTo(fightV2_stats);
            
            if (stat.cls) {
                dl.append(c$('dt', 'class:'+stat.cls).append(span));
            }
            else {
                if (stat.icn) {
                    dl.append(c$('img').attr('src',global.zGraphicsURL + stat.icn));
                }
                dl.append(c$('dt').append(span));
            }
            if (Util.isString(stat.id)) {
                dl.append(c$('dd', 'id:mass_stat_'+stat.id).text('0'));
            }
            else {
                dl.append(c$('dd', 'id:mass_stat_'+stat.id[0]).text('0'));
                dl.append(c$('dd').text('/'));
                dl.append(c$('dd', 'id:mass_stat_'+stat.id[1]).text('0'));
            }
            if (stat.city) { 
                dl.attr('city', stat.city);
                if (stat.city !== StartCity) dl.hide();
            }
            if (stat.timer) dl.attr('id','timer_'+stat.id);
        });
        
        c$('center').appendTo(fightV2_stats)
        .append(c$('a', 'href:#').text('Save Session Stats').click(Events.saveSession_click));
        
        
        // PANELS
        var fightV2_log = c$('div', 'class:fightV2_log').appendTo(wrapper_log_stats);
        
        // AUTOMATIC LOG
        c$('div', 'events_list').appendTo(fightV2_log)
        .append(c$('div', 'class:buttons')
            .append(c$('a', 'href:#items').css('opacity',  1).text('General').click(Events.showLog_click))
            .append(c$('a', 'href:#loot').css('opacity', 0.5).text('Loot').click(Events.showLog_click))
            .append(c$('a', 'href:#iced').css('opacity', 0.5).text('Iced').click(Events.showLog_click))
        )
        .append(c$('div', 'id:items_logs,class:player_updates').height('95%'))
        .append(c$('ul',  'id:loot_logs').height('95%'))
        .append(c$('ul',  'id:iced_logs').height('95%'));
        
        // MANUAL LIST OF FIGHTERS
        c$('div', 'opponents_list').appendTo(fightV2_log)
        .append(
            c$('div', 'class:header')
            .append(c$('a', 'sort_by_name').text('Name').click(Events.sort_click))
            .append(c$('a', 'sort_by_level').text('Level').click(Events.sort_click))
            .append(c$('a', 'sort_by_mafia').text('Mafia').click(Events.sort_click))
            .append(c$('a').text('Refresh').click(Events.refresh_click))
        )
        .append(c$('div', 'id:opponents_table,class:player_updates'));
        
        popupElt.applyOptions({
            'bfopt_healin'          : global.cities,
            'bfopt_startingcity'    : global.cities,
            'bfopt_attackdelay'     : {1:'1-3', 2:'2-4', 3:'3-5', 4:'1-5'},
            'bfopt_newplayerdelay'  : {1:'1', 2:'2', 3:'3', 4:'4'},
            'bfopt_skiplevelway'    : {1:'greater', '-1':'lower'},
            'bfopt_skipmafiaway'    : {1:'greater', '-1':'lower'},
            'bfopt_skiplevelbutway' : {1:'greater', '-1':'lower'},
            'bfopt_skipmafiabutway' : {1:'greater', '-1':'lower'},
            'bfopt_cashpercent'     : {25:'25%', 50:'50%', 75:'75%', 100:'100%'},
            'bfopt_maxloglength'    : {10:'10', 50:'50', 100:'100', 250:'250', 500:'500', 1000:'1000'},
            'bfopt_bangkokfaction'  : {'any':'Balance','Yakuza':'Yakuza','Triad':'Triads'},
            'bfopt_autopublishafter': {5:'5', 10:'10', 15:'15', 20:'20'},
            'bfopt_skipifhealt'     : {20:'> 20%', 40:'> 40%', 60:'> 60%', 80:'> 80%', 100:'Get healed.'}
        });
        
        //Groups.addToSelect('#bfopt_autopublishin', options.get('autoPublishIn'));
    }
    
    // show specified div element
    function showDiv(name, type, bfade, fn) {
        $('div[id*='+type+'],ul[id*='+type+']', popupElt.content).stop().css('opacity', 1).hide();
        if (bfade === true) {
            $('#' + name + type, popupElt.content).fadeIn(1000, fn);
        }
        else {
            $('#' + name + type, popupElt.content).show();
        }
    }
    
    function setAttackTimer(fn) {
        if (options.get('useAttackDelay') !== true) {
            fn.apply(document);
            return;
        }
        var min = 1, max = 3, delay = 5;
        switch(options.get('attackDelay')) {
            case 2: min = 2; max = 4; break;
            case 3: min = 3; max = 5; break;
            case 4: max = 5; break;
        }
        delay = Math.floor(Math.random() * (max-min+1)) + min;
        
        statusTimer.start('Ready to attack '+PlayerList.current.anchor()+' in %N% seconds...', delay, fn);
    }
    
    function setAttackNewTimer(fn) {
        if (options.get('useNewPlayerDelay') !== true) {
            fn.apply(document);
            return;
        }
        var delay = options.get('newPlayerDelay');
        if (!Util.isSet(delay) || delay < 1) {
            delay = 2;
        }        
        statusTimer.start('Ready to attack '+PlayerList.current.anchor()+' in %N% seconds...', delay, fn);
    }
    
    /**
     * @param {String} list_name
     * @param {String} profilesText
     */
    function addMWProfiles(list_name, profilesText) {
        
        if (!Util.isSet(PlayerList[list_name])) {
            logErr$(new Error('Attempt to add MW Profiles in unknow list name.'));
            return;
        }
        var profileRegex = /(profile|family).php\?id=([^\n]+)/g;
        var rgx, data = [];
        
        while ((rgx = profileRegex.exec(profilesText))) {
            data.push(unescape(rgx[2]));
        }
        if (data.length < 1) {
            return;
        }
        
        log$(list_name+' parsed:'+data.length);
        
        var profiles = new Collection(data);
        
        profiles.onMove(function(pos, key, item) {
            try {
                var id, url;
                
                if ( list_name === 'clanList' ) {
                    id = $.parseJSON(item).id;
                    url = 'remote/' + MW.getIntURL('clan') + '&from_red_link=1&id=' + id;
                    id = global.Base64.decode(id);
                } else {
                    id = global.Base64.decode($.parseJSON(item).user);
                    url = 'remote/' + MW.getIntURL('stats') + '&user=' + id;
                }
                if ( PlayerList[list_name].exists(Util.parseNum(id)) ) {
                    profiles.MoveNext();
                    return;
                }
                httpAjaxRequest({url: url, message: 'Loading id: '+id,
                    success: function(htmlText) {
				        var result;
                        if ( list_name === 'clanList' ) {
                            result = parseClanProfile(htmlText);
                            result.id = id;
                        } else {
                            result = getOpponentFromProfile(htmlText);
                        }
				        if (!result.error_msg) {
                            PlayerList[list_name].add(result);
				        }
				        else {
				            log$('Error adding user_id: '+id+' to '+list_name+' "'+result.error_msg+'".'); 
				        }
                        profiles.MoveNext();
                    }
                });
            }
            catch(err) {
                logErr$(err);
            }
        });
        
        profiles.onEnd(function() {
            options.toDomElements();
            options.save();
            profiles.clear();
        });
        
        profiles.MoveFirst();
    }
    
    function getOpponentFromProfile(data) {
        var opp = new CSOpponent();
        var eQry = h$(data), sText;
        try {
            opp.attack = String($('a:regex(href,xw_action=attack)', eQry).attr('href'));
            opp.id     = Util.parseNum(Util.uSplit(opp.attack).opponent_id);
            sText      = Util.htmlDecode(eQry.find('.stats_title_text:first').text());
            opp.name   = Util.substr(sText, '"', '"', 1);
            opp.level  = Util.parseNum(sText.substr(sText.lastIndexOf('"') + 1)); 
        }
        catch(err) {
            logErr$(err);
            return {error_msg:err.message}; 
        }
        return opp;
    }
    
    function parseClanProfile(data) {
        var clan = new Object();
        var eQry = h$(data);
        try {
            clan.name = eQry.find('#clan_main #clan_header > h3').text(); 
        }
        catch(err) {
            logErr$(err);
            return {error_msg:err.message}; 
        }
        return clan;
    }
    
    function fromRandomWhiteList() {
        if (whiteListArray.length == 0) {
            whiteListArray = PlayerList.whiteList.toArray();
        }        
        if (whiteListArray.length == 0) {
            abort_process = true;
            sendMessage('No enemy in WhiteList.\nPlease add some enemy to begin.');
            clearAllTimers();
            addAutoControls();
            return;
        }
        var p = whiteListArray.shift();
        
        if (PlayerList.blackList.exists(p.id)) {
            log$('Skiping blacklisted id: ' + p.id);
            PlayerList.whiteList.remove(p.id);
            fromRandomWhiteList();
            return;
        }
        if ( Util.isSet(whiteListCache[p.id]) ) {
            PlayerList.current = whiteListCache[p.id].clone();
            setAttackNewTimer(function() {
                updateNewOpponent();
                preAttack();
            });
        } else {
	        sendMessage('Loading profile (' + p.name + ')...', true);    
	        httpAjaxRequest({
	            url: 'remote/' + MW.getIntURL('stats') + '&user=p|' + p.id,
	            success: function(htmlText) {
	                PlayerList.current = getOpponentFromProfile(htmlText);
	                whiteListCache[p.id] = PlayerList.current.clone();
	                updateNewOpponent();
	                preAttack();
	            }
	        });
	    }
    }
    
    /**
     * Return true is opponent is valid (not filtered)
     * @param {CSOpponent} opp
     * @param {Boolean} iced
     * @return {Boolean}
     */
    function isValidOpponent(opp, iced) {
        var n1 = options.get('skipMafiaOf');
        var x1 = options.get('skipMafiaButLevel');
        var n2 = options.get('skipLevelOf');
        var x2 = options.get('skipLevelButMafia');
        var o1 = options.get('skipMafiaWay');
        var w1 = options.get('skipMafiaButWay');
        var o2 = options.get('skipLevelWay');
        var w2 = options.get('skipLevelButWay');
        var i = 0, c = '', v;
        
        if (options.get('skipIced') && opp.iced) {
            return false;
        }
        if (opp.clanId && (options.get('skipNoListedClans') !== PlayerList.clanList.exists(opp.clanId))) {
            //log$('skipping user: '+opp.id+'. he\'s in clan: '+opp.clanId);
            return false;
        }
        if ( opp.isThief === true ) {
            // don't check the following skip criteria if opponent is a thief.
            return true;
        }
        if (options.get('skipIcedPlayers') && Util.isSet(icedPlayerCache[opp.id])) {
            log$('skipping "'+opp.name+'" because i iced them.');
            return false;
        }
        if (options.get('skipMafia') && (opp.mafia * o1) > (n1 * o1)) {
            if (!options.get('skipMafiaBut') || (opp.level * w1) < (x1 * w1)) {
	            log$('skipping "'+opp.name+'" mafia: '+opp.mafia+' level: '+opp.level);
	            return false;
            }
        }
        if (options.get('skipLevel') && (opp.level * o2) > (n2 * o2)) {
            if (!options.get('skipLevelBut') || (opp.level * w2) < (x2 * w2)) {
	            log$('skipping "'+opp.name+'" level: '+opp.level+' mafia: '+opp.mafia);
	            return false;
            }
        }
        if (PlayerList.blackList.exists(opp.id)) {
            log$('skipping blacklisted id: ' + opp.id);
            return false;
        }
        if (options.get('useNameFilter') && options.get('nameFilterVal').length > 0) {
            if (options.get('useFilterRegex')) {
                try {
                    if ((new RegExp(options.get('nameFilterVal'))).test(opp.name)) {
                        log$('skipping name: ' + opp.name);
                        return false;
                    }
                }
                catch(e) {}
            }
            else {
                v = options.get('nameFilterVal');
                while (i < v.length) {
                    c = v.charAt(i++);
                    if ((c !== ' ') && (opp.name.indexOf(c) !== -1)) {
                        log$('skiping name: ' + opp.name);
                        return false;
                    }
                }
            }
        }
        return true;
    }
    /**
     * Filter an opponent by faction
     * @param {CSOpponent} opp
     * @return {Boolean}
     */
    function isValidFaction(faction) {
        if (StartCity === 4 && options.get('useFactions')) {
            var sFaction = (options.get('bangkokFaction') == 'any') 
            ? (fightStats.triad > fightStats.yakuza) ? 'Triad' : 'Yakuza'
            : options.get('bangkokFaction');
            
            if (String(faction).toLowerCase() !== String(sFaction).toLowerCase()) return false;
        }
        return true;
    }
    
    // Adds opponents to list
    function addNewOpponents(htmlText) {
        var table = new CSOpponentTable(htmlText);
        var newList = new Array();
        
        table.each(function(index, opp) {
            if (isValidOpponent(opp)) { newList.push(opp); }
        });
        if ( newList.length > 0 ) {
            PlayerList.setPlayers(newList);
        }
        return {
            'parsed' : table.length,
            'added'  : PlayerList.length()
        };
    }
    
    // Refresh fight table
    function refreshPlayerList(callback, bTravelIfNoTargets) {
        $('#opponents_table').empty();
        sendMessage('Finding players...', true);
        log$('bTravelIfNoTargets: '+bTravelIfNoTargets);
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('fight'),
            liteLoad: 1, 
            success: function(htmlText) {
                sendMessage();
                if (Regex.fight_controller(htmlText)) {
                    var result = addNewOpponents(htmlText);
	                if (bTravelIfNoTargets === true && result.added < 1) {
	                    setNewCurrentCity();
	                    addTravelCountdown();
                        travelTo(StartCity, function() { 
                            refreshPlayerList(callback, bTravelIfNoTargets); 
                        });
	                    return;
	                }
                }
                if (Util.isFunc(callback)) {
                    callback.apply(document, [result.parsed, result.added]);
                }
            }
        });
    }
    
    // generate a list of opponenets
    function genEnemyListDom() {
        if (PlayerList.length() < 1) {
            return; 
        }
        
        var listDiv = $('#opponents_table').empty();
        
        PlayerList.each(function(index, pl) {
            c$('div', 'class:update_item,id:enemy_player_' + index)
            .appendTo(listDiv).css('width', '99%')
            .append(c$('div', 'class:update_timestamp'))
            .append(
                c$('div', 'class:update_icon').append(
                    c$('img', {
                        'width': 40,
                        'height': 40,
                        'src': global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif'
                    })
                )
            ).append(c$('span', 'id:player_name,class:update_txt').width(260)
                .html(pl.title + '<br>' + pl.clan() + ' ' + pl.name + '<br>Level: ' + pl.level)
            ).append(c$('span', 'id:player_mafia,class:update_txt')
                .width(50).css('padding',5).text(pl.mafia)
            ).append(b$('Attack', 'class:short red,id:attack_id_'+ index)
                .click(Events.attack_click).css({
                    'float': 'right',
                    'margin-right': 15
                })
            );
        });
    }
    
    /**
     * check items amount and remove last log item if it's more than maximum.
     */
    function fixMaxLogItems() {
        if ($('#items_logs').children().length > options.get('maxLogLength')) {
            $('#items_logs').children().last().remove();
        }
    }
    
    /**
     * Add generic loot to log 
     * @param {CSItemCard} loot
     */
    function addGenericLoot(loot) {
        if (loot.type === 'coins') {
            log$('Adding coins: '+Util.parseNum(loot.quantity));
            fightStats.coins += Util.parseNum(loot.quantity);
        }
        if ( !options.get('showSocialEvents') ) {
            return;
        }
        
        fixMaxLogItems();
        
        var textMessage = 'Social Event:<br>'+ loot.title+' '+loot.quantity;
        var updateItem = c$('div', 'class:update_item,id:generic_item').prependTo('#items_logs');
        
        c$('div', 'class:update_timestamp').appendTo(updateItem).html((new Date()).toUTCString());
        c$('div', 'class:update_icon').appendTo(updateItem)
        .append(c$('img').attr({
            'width': 40,
            'height': 40,
            'src': loot.pic
        }));
        c$('div', 'class:update_txt').appendTo(updateItem).html(textMessage);
    }
    
    /**
     * Add generic loot to log 
     * @param {CSItemLoot} loot
     */
    function addLootItem(loot, brazilCount) {
        var updateItem, item_txt;
        var lootPic = c$('img').attr({'width': 40,'height': 40, 'src':loot.pic});
        var count = brazilCount ? 5 : 1;
        log$('addLootItem brazilCount: '+brazilCount);
        log$('addLootItem count: '+count);
        
        if (options.get('showLootEvents')) {
            fixMaxLogItems();
	        updateItem = c$('div', 'class:update_item,id:generic_item').prependTo('#items_logs');
	        
	        c$('div', 'class:update_timestamp').appendTo(updateItem).html((new Date()).toUTCString());
	        c$('div', 'class:update_icon').appendTo(updateItem)
	        .append(c$('img').attr({
	            'width': 40,
	            'height': 40,
	            'src': logIcon['loot']
	        }));
	        c$('div').addClass('update_pic').appendTo(updateItem).append(lootPic);
	        item_txt = c$('div', 'class:update_txt').appendTo(updateItem).html('Loading item stats...');
        }
        
        function addToLootLog(sHtml) {
            var elt = e$('#loot_'+loot.item_id, '#loot_logs');
            
            if (elt !== null) {
                count += parseInt($('#item_count', elt).text());
                $('#item_count', elt).text(count);
            }
            else {
                c$('li', 'loot_'+loot.item_id).prependTo('#loot_logs')
                  .append(lootPic.clone().css('vertical-align', 'middle'))
                  .append(c$('span').css('margin-left',10).text('Found '))
                  .append(c$('span','item_count').css('color','green').text(count))
                  .append(c$('span').append(sHtml));
            }
        }
        
        if ( Util.isSet(lootCache[loot.item_id]) ) {
            if ( item_txt ) {
                item_txt.html('You Found: '+lootCache[loot.item_id]);
            }
            addToLootLog( lootCache[loot.item_id] );
        }
        else {
	        httpAjaxRequest({
	            'url': 'remote/' + MW.getIntURL('item', 'get_item_data') + '&item_id=' + loot.item_id, 
	            'success': function(jsonData) {
	                var popup;
	                if ( jsonData.popup ) {
	                    popup = c$('div').html(jsonData.popup).find('#'+jsonData.popup_id+' h3');
                        if ( item_txt ) {
	                       item_txt.html('You Found: '+popup.html());
                        }
                        addToLootLog( lootCache[loot.item_id] = popup.html() );
	                }
	            }
	        });
        }
    }
    
    // generate a new log event
    function addToLog(message, icon, pic, id) {
        if (typeof icon !== 'string') {
            icon = 'fight';
        }
        fixMaxLogItems();
        
        var updateItem, lootPic;
        var updateIcon = c$('img').attr({
            'width': 40,
            'height': 40,
            'src': logIcon[icon]
        });
        if (icon == 'fight') {
            updateItem = c$('div').css('text-align','left')
            .appendTo($('#msgcontainer', '#wrapper_info').empty());
        }
        else if (id) {
            if ( !(updateItem = e$('#items_logs #'+icon+'_item_'+id, popupElt.content)) ) {
                updateItem = c$('div', 'class:update_item,id:'+icon+'_item_'+id).prependTo('#items_logs');
            }
            else {
                updateItem.empty();
            }
        } 
        else {    
            updateItem = c$('div', 'class:update_item,id:'+icon+'_item').prependTo('#items_logs');
        }
        c$('div', 'class:update_timestamp').appendTo(updateItem).html((new Date()).toUTCString());
        c$('div', 'class:update_icon').appendTo(updateItem).append(updateIcon);
        if (pic) {
            c$('div').addClass('update_pic').appendTo(updateItem).append(
                lootPic = c$('img').attr({
                    'width': 40,
                    'height': 40,
                    'src': pic
                })
            );
        }
        c$('div', 'class:update_txt').appendTo(updateItem).html(message);
        $('#items_logs a.sexy_button_new', popupElt.content).css('color', 'black');
    }
    
    function addLootToLog(lootData, bBrazil) {
        if (Util.isSet(lootData) && lootData.length > 0) {
            var i;
            for (i = 0; i < lootData.length; i++) {
                if ( /fake_item_card/.test(lootData[i]) ) {
                    addGenericLoot(new CSItemCard(lootData[i]));
                }
                else if ( /item_with_preview/.test(lootData[i]) ) {
                    addLootItem(new CSItemLoot(lootData[i]), bBrazil);
                }
                else {
                    log$('Unknow Loot Found:\n'+lootData[i]);
                }
            }
        }
    }
    /**
     * 
     * @param {CSIcePopup} ice
     * @param {CSOpponent} opp
     */
    function addIcedToLog(ice, opp, killed) {
        /*
        if ( !(Util.parseNum(ice.count) > 0) ) {
            getBodyCount(function(count) {
                log$('getBodyCount: '+count);
                log$('nIcedCount: '+nIcedCount);
	            if (count > nIcedCount) {
	                ice.count = nIcedCount = count;
                    addIcedToLog(ice, opp, killed);
	            }
            });
            return;
        }
        */
        var text = 'You ICED ';
        var oppName = opp.clanId !== null 
        ? Util.setColor(opp.clanName, 'red') +' '+ opp.name
        : opp.name;
        
        fightStats.iced++;
        
        if (options.get('skipIcedPlayers')) {
            icedPlayerCache[opp.id] = true;   
        }
        if ( killed ) {
            fightStats.kill++;
            text += 'and KILLED ';
        }
        text += opp.anchor();
        text += ',<br>' + ice.text + ice.count;
        text += '<br>' + ice.action;
        
        addToLog( text, 'iced', opp.image );
        
        c$('li').prependTo('#iced_logs').css('margin-top', 10)
        .html('#'+ice.count+'  ' + oppName + ':          ')
        .append(c$('br')).append(c$('a', 'target:_black').attr('href',opp.profile()).text(opp.profile()));
        
        if ( options.get('autoPublish') && ice.canPublish ) {
            autoPublish.add( ice, oppName );
        }
    }
    /*
    function getBodyCount(callback) {
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('stats'),
            success: function(htmlText) {
                var obj = h$(htmlText).find('table.main_table');
                var count = parseInt(obj.find('tr:eq(9) td:eq(1)').text());
                callback(count);
            }
        });
    }
    */
    /**
     * @param {CSStolenIcePopup} thief
     */
    function addStolenIceToLog(thief) {
        var revengeText = '!!';
        var canWin = (thief.defStat < fightStats.attackStat);
        if (options.get('takeRevenge') && (!options.get('takeRevengeIfWin') || canWin)) {
            var revenge = new CSOpponent();
            fightStats.revenges++;
            revengeText = ' but you\'ll take your revenge !!';
            revenge.name = thief.name;
            revenge.id = thief.id;
            revenge.attack = thief.action;
            revenge.isThief = true;
            PlayerList.revenge = revenge;
        } else {
            revengeText = '!! and will be skipped.';
        }
        addToLog( thief.message+revengeText+'<br>'+thief.defhtml, 'iced', thief.pic, thief.id );
    }
    
    // update stats from fightStats class
    function updateStats() {
        var elt, nTime = (new Date()).getTime();        
        for (f in fightStats) {
            var stat = fightStats[f];
            var elem = e$('#mass_stat_' + f.toLowerCase());
            if (elem !== null) {
                if (Util.isFunc(stat)) {
                    elem.html(stat());
                }
                else if (!Util.isObject(stat)) {
                    elem.html(stat);
                }
            }
        }
    }
    /**
     * @param {String} message
     * @param {Boolean} hasAjax
     */
    function sendMessage(message, hasAjax, continue_fn) {
        if ( !message ) {
            $('#msgcontainer').empty();
            return;
        }
        if ( hasAjax === true ) {
            $('#msgcontainer').show()
            .html('<img style="vertical-align: middle;" src="' + global.resource.ajax_loader + '">')
            .append('<span style="margin-left: 5px;">' + message + '</span>');
        }
        else {
            $('#msgcontainer').html(message).show();
        }
        if ( Util.isFunc(continue_fn) ) {
            $('#msgcontainer').append(c$('a','href:#').text('click here to continue.').click(continue_fn));
        }
    }
    
    /**
     * @param {Number} toCity
     * @param {Function} callback
     */
    function travelTo(toCity, callback) {
        if (abort_process) { 
            return;
        }
        var tryAgain = function() { travelTo(toCity, callback); };
        
        sendMessage('Traveling to ' + global.cities[toCity] + '...', true);        
        MW.travel(toCity, function(city) {
            if ((CurrentCity = parseInt(city)) === parseInt(toCity)) {
                sendMessage();
                callback && callback();
            }
            else {
                statusTimer.start('Unexpected city, taveling to '+ global.cities[toCity] + ' in %N% seconds.', 15, tryAgain);
            }
        });
    }
    /**
     * @param {Function} callback
     */
    function healPlayer(callback) {
        if (abort_process) {
            return;
        }
        var tryAgain = function() { healPlayer(callback); };
        var city = parseInt(options.get('healIn'));
        bDoManualHeal = false;
        
        function Heal(url) {
            sendMessage('Healing at ' + global.cities[city] + '...', true);
            httpAjaxRequest({'url':url, 'success':function(jsonData) 
                {
                    try {
                        updateUserFields(jsonData);
                        
                        if (fightStats.health < options.get('healWhen')) {
                            statusTimer.start(jsonData.hospital_message+' try again in %N% seconds.', 15, tryAgain);
                        }
                        else {
                            $('#heal_item', '#items_logs').remove();
                            addToLog(jsonData.hospital_message, 'heal');
                            setHealth(0, fightStats.healthpct);
                            updateAttackerHealthVal(fightStats.health);
                            sendMessage(jsonData.hospital_message);
                            updateStats();
                            
                            if (CurrentCity !== StartCity) {
                                travelTo(StartCity, callback);
                            }
                            else {
                                callback && callback(); 
                            }
                        }
                    }
                    catch(err) {
                        statusTimer.start('Error healing. Try again in %N% seconds.', 15, tryAgain);
                    }
                }
            });            
        }
        if (city === 1 && city !== CurrentCity) {
            Heal('remote/' + MW.getIntURL('hospital', 'heal', CurrentCity) + '&xcity=1');
        }
        else if (city !== CurrentCity) {
            travelTo(city, function() { Heal('remote/' + MW.getIntURL('hospital', 'heal', city)); });
        }
        else {
            Heal('remote/' + MW.getIntURL('hospital', 'heal', city));
        }

    }
    
    // -----------------------------
    // MANUAL MODE
    // -----------------------------
    function manualAttack(url) {
        hideFightControls();
        
        if (fightStats.stamina < staToSpend()) {
            showHelpPopup({
                icon: 'info',
                title: 'No stamina left',
                message: 'You need to have some stamina to attack.'
            });
            Events.runAway_click();
            return;
        }
        if (fightStats.health < 25) {
            healPlayer(function() {
                Attack(url, false);
            });
            return;
        }
        if (!/xw_controller=fight/i.test(url)) {
            sendMessage('Error: Attack link seem to be broken.');
            return; 
        }
        Attack(url, false);
    }

    function clearAllTimers() {
        statusTimer.clear();
        travelCountdown.clear();
        fightResumeCountdown.clear();
        fightCountdown.clear();
    }
    
    function checkBankMoney(callback) {
        if (options.get('useBank') && options.get('depositIn'+CurrentCity) &&
           (fightStats.userCash > options.get('useBankWhen'))) 
        {
            MW.deposit(StartCity, fightStats.userCash, function(result) {
                $('#bank_item', '#items_logs').remove();
                addToLog(result, 'bank');
                callback && callback();
            });
        }
        else {
            callback && callback();
        }
    }
    
    // update player account stats
    function updateUserFields(data) {
        var user_fields;
        try {
            if (typeof(data.user_fields) == 'object') {
                user_fields = data.user_fields;
            }
            else {
                eval(Util.substr(String(data),'var user_fields', 'user_fields_update'));
            }
            if (user_fields) {
                fightStats.health          = user_fields['user_health'];
                fightStats.maxHealth       = user_fields['user_max_health'];
                fightStats.stamina         = user_fields['user_stamina'];
                fightStats.maxStamina      = user_fields['user_max_stamina'];
                fightStats.expToNextLevel  = user_fields['exp_to_next_level'];
                fightStats.userCash        = user_fields['user_cash'];
                        
                CurrentCity = parseInt(user_fields['current_city_id']);
                
                fightStats.healthpct = parseInt((fightStats.health*100)/fightStats.maxHealth);
            }
        }
        catch(err) {
            logErr$(err);
        }
    }
    
    // request a survey for fast player update
    function reqSurvey(callback) {
        sendMessage('Updating...', true);
         httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('survey', 'show_nps_survey'),
            success: function(jsonData) 
            {
                sendMessage();
                updateUserFields(jsonData);
                updateStats();
                if (Util.isSet(callback)) {
                    callback();
                }
                else {
                    preAttack();
                }   
            }
         });
    } 
    
    // -----------------------------
    // AUTOMATIC MODE
    // -----------------------------
    function staToSpend() {
        if (CurrentCity === 7) {
            return 5;
        }
        else {
            return 1;    
        }
    }
    function setNewCurrentCity() {
        var cities = new Array();
        if (options.get('fightInNewYork')  && StartCity !== 1) cities.push(1);
        if (options.get('fightInCuba')     && StartCity !== 2) cities.push(2);
        if (options.get('fightInMoscow')   && StartCity !== 3) cities.push(3);
        if (options.get('fightInBangkok')  && StartCity !== 4) cities.push(4);
        if (options.get('fightInLasVegas') && StartCity !== 5) cities.push(5);
        if (options.get('fightInItaly')    && StartCity !== 6) cities.push(6);
        if (options.get('fightInBrazil')   && StartCity !== 7) cities.push(7);
        
        if (cities.length > 0) {
            StartCity = cities[ Math.floor(Math.random() * cities.length) ];
        }
        delete cities;
    }
    
    function addTravelCountdown() {
        travelCountdown.clear();
        if (!options.get('fightCityTime')) { return; }
        var delay = options.get('fightCityTimeout');
        travelCountdown.start(delay*60);
    }
    function addFightResumeCountdown() {
        fightResumeCountdown.clear();
        var delay = options.get('fightTimeoutResume');
        fightResumeCountdown.start(delay*60)
    }
    function addFightCountdown() {
        fightCountdown.clear();
        if (!options.get('fightTime')) { return; }
        var delay = options.get('fightTimeout');
        fightCountdown.start(delay*60)
    }
    
    function publishCurrentIces(callback) {
        var bContinued = false;
        var continue_fn = function() {
            if ( bContinued === false ) {
                bContinued = true;
                sendMessage();
                callback();
            }
        }
        sendMessage('Paused while publishing your ices. ', false, continue_fn);
        autoPublish.publishTo(options.get('autoPublishIn'), continue_fn);
    }
    
    function AttackNewOpponent() {
        if (abort_process) {
            return;
        }
        if ( options.get('autoPublish') && autoPublish.length() >= options.get('autoPublishAfter') ) {
            publishCurrentIces(AttackNewOpponent);
            return;
        }
        // next opponent
        if (bAttackWhiteList) {
            fromRandomWhiteList();
            return;
        }
        PlayerList.setRandomCurrent();
        
        // check if a valid opponent object 
        if (!Util.isSet(PlayerList.current)) {
	        PlayerList.clear();
	        refreshPlayerList(AttackNewOpponent, options.get('travelWhenNoTargets'));
            return;
        }
        // check if opponent is not filtered 
        if (!isValidOpponent(PlayerList.current, false)) {
            AttackNewOpponent();
            return;
        }
        // check faction
        if (!PlayerList.current.isThief && !isValidFaction(PlayerList.current.faction)) {
            log$('skipping "'+PlayerList.current.name+'" faction: '+PlayerList.current.faction);
            AttackNewOpponent();
            return;
        }
        // attack
        setAttackNewTimer(function() {
	        updateNewOpponent();
	        preAttack();
        });
    }
    
    function preAttack() {
        if (abort_process) {
            return;
        }
        if ( PlayerList.current.skip ) {
            AttackNewOpponent();
            return;
        }
        
        var op = options.get, fs = fightStats;
        var delay = parseInt(op('resumeDelay')) > 0 ? parseInt(op('resumeDelay')) * 60 : 300;
        var sStopMEssage, sTimerMessage;

        if (CurrentCity !== StartCity) {
            travelTo(StartCity, preAttack);
            return;
        }
        
        switch(true) {
            case (op('stopBeforeLvlUp') && fs.expToNextLevel < op('expLeftToStop')):
                sStopMEssage = 'AutoFight deactivated, experience is less than specified.';
                break;
                
            case (fs.stamina < staToSpend() || (op('stopWhenStamina') && fs.stamina < op('staminaToKeep'))):    
	            if (op('keepFigthing')) {
	                sTimerMessage = 'No stamina left, continue in %N% seconds.';
                } else {
	                sStopMEssage = 'AutoFight deactivated, No stamina left.';
                }
                break;
                
            case (bDoManualHeal || (op('useHeal') && fs.health < op('healWhen'))):
                healPlayer(preAttack);
                return;
                break;
                
            case (!op('useHeal') && fs.health < 21):
                if (op('keepFigthing')) {
                    sTimerMessage = 'Healing is set off, continue in %N% seconds.';
                } else {
                    sStopMEssage = 'AutoFight deactivated, Healing is set off.';
                }
                break;
                
            case (op('useStopWhenIced') && fs.iced >= op('stopWhenIced')):
                sStopMEssage = 'AutoFight deactivated, you made '+fs.iced+' ices.';
                break;
        }
        if ( sStopMEssage ) {
            checkBankMoney();
            abort_process = true;
            clearAllTimers();
            sendMessage(sStopMEssage);
            addAutoControls(true);
            return;
        }
        if ( sTimerMessage ) {
            clearAllTimers();
            checkBankMoney();
            addAutoControls();
            statusTimer.start(sTimerMessage, delay, function() {
	            reqSurvey(function() {
	                addFightCountdown();
	                addTravelCountdown();
                    preAttack();
	            });
	        });
            return;
        }
        
        var opp = PlayerList.current;
        var url = (bAttackerUsedBoost && opp.fights>0)? opp.attack_boost : opp.attack; 
        var counter = op('attackCounter') - opp.fights;
        
        //bAttackerUsedBoost = $('#fightv2_boost_on', popupElt.content).hasClass('checked');
        
        if (op('useAttackCount') && counter < 1) {
            log$('skiping '+opp.name+' - due max. attacks, count: '+opp.fights);
            checkBankMoney(AttackNewOpponent);
            return;
        }
        if (op('usePowerAttack') && opp.pwratk) {
            if (counter > 4 || !op('useAttackCount')) {
                url = (bAttackerUsedBoost && opp.fights>0) ? opp.pwratk_boost : opp.pwratk;
            }
        }
        if (!/xw_controller=fight/i.test(url)) {
            AttackNewOpponent();
            return; 
        }
        if ( opp.fights > 0 ) {
            addSkipControl();
        }
        Attack(url, true);
    }
    
    function Attack(url, bAuto) {
        if (abort_process) {
            return;
        }
        var sAttackMessage = 'Attacking ' + PlayerList.current.anchor() + '...';
        if ( PlayerList.current.fights_for_ice ) {
            sAttackMessage += '<br>You need about '+PlayerList.current.fights_for_ice+' attacks to get the ice.';
        }
        sendMessage(sAttackMessage, true);
        httpAjaxRequest({
            url: url,
            liteLoad: 1,
            success: function(htmlText) 
            {
                if (abort_process) {
                    return;
                }
                var fr = parseAttack(htmlText, bAuto);
                
                if (bAuto && fr.first_attack && !bAttackWhiteList) {
                    addNewOpponents(htmlText);
                }
                switch( fr.success ) {
                    case ERROR_BAD_RESPONSE:
                        if (bAuto) {
                            addAutoControls(true);
                            statusTimer.start('Some error in server response, try again in %N% seconds.',8, preAttack);
                        }
                        else {
                            sendMessage('Error: Some error in server response.');
                            addManualControls(true);
                        }
                        break;
                        
                    case ERROR_NO_FIGHT_RESULT:
                        if (bAuto) {
                            addAutoControls(true);
                            statusTimer.start('No fight result, next opponent in %N% seconds.',2, AttackNewOpponent);
                        }
                        else {
                            sendMessage('This opponent can\'t be attacked, go back and try a different one.');
                            PlayerList.current.attack = null;
                            addManualControls(true);
                        }
                        break;
                        
                    case ERROR_SUCCESS:
                        if (bAuto) {
                            if (fr.levelUp_stop) {
                                abort_process = true;
                                updateStats();
                                clearAllTimers();
                                addAutoControls(true);
                                sendMessage('AutoFight deactivated, you Leveled UP!!.');
                            } 
                            else if (fr.attack_again) {
                                setAttackTimer(preAttack);
                            }
                            else {
                                addAutoControls();
                                AttackNewOpponent();
                                checkBankMoney();
                            }
                        }
                        else {
                            checkBankMoney(addManualControls);
                        }
                        break;
                }
            }
        });
    }
    // -----------------------------
    // ATTACK PARSER
    // -----------------------------    
    function updateAttackerHealthVal(val) {
        $('#attacker_health', popupElt.content).html(val);
    }

    function updateAttackerStaminaVal(s, maxS) {
        $('#attacker_stamina', popupElt.content).html(s);
        $('#attacker_max_stamina', popupElt.content).html(maxS);
    }
    
    function setHealth( player_id, val ) {
        var hp_fill;
        var target_width;
        var target_css;
        var defender_hp;
        var attacker_hp;
        var healthBarWidth = 215;
    
	    function getHealthBarCss(healthPerc) {
	        switch(true) {
	            case (healthPerc < 34):  return 'hpbg_low';
	            case (healthPerc < 67):  return 'hpbg_mid';
	            default:  return 'hpbg_high';
	        };
	    }

        if( player_id == 0 ) {
            attacker_hp = val;
            if (attacker_hp > 100) attacker_hp = 100;
            if (attacker_hp < 0) attacker_hp = 0;

            hp_fill = "#attacker_hp";
            target_width = (attacker_hp/100) * healthBarWidth;
            target_css = getHealthBarCss(attacker_hp);
        } else {
            defender_hp = val;
            if(defender_hp > 100 ) defender_hp = 100;
            if(defender_hp < 0 ) defender_hp = 0;

            hp_fill = "#defender_hp";
            target_width = (defender_hp/100) * healthBarWidth;
            target_css = getHealthBarCss(defender_hp);
        }

	    (function animateHealth( going_up ) {
	        
	        var fill_bar = $(hp_fill, popupElt.content);
	        if( going_up ) {
	            fill_bar.stop(true).animate({ 'width': target_width + 'px' }, 400 );
	        } else {
	            fill_bar.stop(true).animate({ 'width': target_width + 'px' }, 100 );            
	        }
	
	        fill_bar.removeClass('hpbg_low hpbg_mid hpbg_high');
	        fill_bar.addClass(target_css);
            
	    })( val > 0 );
    }

    function updateAttackerAttackVal(val, val_no_boost, used_boost) {
        var last_atk_skill = val;
        var last_atk_skill_no_boost = val_no_boost;
        var attacker_used_boost = used_boost;

        if ($('#fightv2_boost_on', popupElt.content).hasClass('checked') || used_boost) {
            $('#attacker_attack', popupElt.content).html(val);
        } else {
            $('#attacker_attack', popupElt.content).html(val_no_boost);           
        }
    }
    
    function updateAttackerUsedBoost() {
        $('#fightv2_boost_on, #fightv2_boost_off', popupElt.content).removeClass('checked');
        $('#fightv2_boost_'+(bAttackerUsedBoost?'on':'off'), popupElt.content).addClass('checked');
    }
    
    function updateNewOpponent() {
        $('#wrapper_defender', popupElt.content).empty();
        $('#defender_best_items .fightV2ItemList li', popupElt.content).empty();
        $('#divAttackerDmgTaken', popupElt.content).empty();
        $('#attacker_fight_status', popupElt.content).empty();
        $('#wrapper_info .fightV2_result', popupElt.content).empty();
    }
    
    function showOtherDamageTaken(player_id, val) {
        var damageDiv, labelSpan, damageSpan;
        if( player_id == 0 ) {
            damageDiv = $("#divAttackerOtherAtkId", popupElt.content);
            damageSpan = $("#spanAttackerOtherAtk", popupElt.content);
            labelSpan = $("#spanAttackerOtherAtkLabel", popupElt.content);
        } else {
            damageDiv = $("#divDefenderOtherAtkId", popupElt.content);
            damageSpan = $("#spanDefenderOtherAtk", popupElt.content);
            labelSpan = $("#spanDefenderOtherAtkLabel", popupElt.content);
        }
        if(!Util.isSet(val) || val == 0 ) {
            damageDiv.hide();
            damageSpan.html('');
            labelSpan.html('');
        } else {
            var real_val = -val;
            damageDiv.show();
            damageSpan.removeClass('fv2_dmg_negative');
            damageSpan.removeClass('fv2_dmg_positive');
            if( real_val <= 0 ) {
                damageSpan.html(real_val+'%');
                damageSpan.addClass('fv2_dmg_negative');
                labelSpan.html("other attackers");
            } else {
                /*damageSpan.html('+'+real_val+'%');*/
                damageSpan.html('');
                damageSpan.addClass('fv2_dmg_positive');    
                labelSpan.html("healed");
            }
        }
    }
    
    function showDamageTaken(player_id, val) {

        var damageDiv;
        if( player_id == 0 ) {
            damageDiv = $("#divAttackerDmgTaken", popupElt.content);
        } else {
            damageDiv = $("#divDefenderDmgTaken", popupElt.content);
        }

        damageDiv.fadeIn(500);
        damageDiv.removeClass('fv2_dmg_negative fv2_dmg_positive');
        if( val < 0 ) {
            damageDiv.html(-val);
            damageDiv.css('color', 'green');    
        } else {
            damageDiv.html('-'+val);
            damageDiv.css('color', 'red');  
        }
    }
    
    function showBoostUsed(player_id, imgTag) {
        var divEl;
        if(player_id == 0) {
            divEl = $("#attacker_boost_used_tag", popupElt.content);
            $('#attacker_boost_used', popupElt.content).show();
        } else {
            divEl = $("#defender_boost_used_tag", popupElt.content);
            $('#defender_boost_used', popupElt.content).show();
        }
        
        divEl.html(imgTag);
    }


    function showBoostUsage(boostCount, nextBoostTag, askTimeout, qtyArray) {
        var c = 0;
        if (Util.isSet(boostCount) && boostCount > 0) {
            c = boostCount;
        }
        $('.boost_wgt_boost_count', popupElt.content).html(c);
        
        if( c > 0 ) {
            $('#fv2_boost_toggle_btns', popupElt.content).show();
            $('#fv2_boost_toggle_ask_btns', popupElt.content).hide();
        } else {
            $('#fv2_boost_toggle_btns', popupElt.content).hide();
            $('#fv2_boost_toggle_ask_btns', popupElt.content).show();

            if( askTimeout > 0 ) {
                startBoostAskTimer(askTimeout, 1);
                $(".fv2_boost_ask_allowed", popupElt.content).hide();
                $(".fv2_boost_ask_not_allowed", popupElt.content).show();
            } else {
                $(".fv2_boost_ask_allowed", popupElt.content).show();
                $(".fv2_boost_ask_not_allowed", popupElt.content).hide();             
            }
        }

        $('.boost_wgt_next_boost', popupElt.content).hide();
        if (Util.isSet(nextBoostTag) && nextBoostTag != '') {
            $('.boost_wgt_next_boost', popupElt.content).html(nextBoostTag);
            $('.boost_wgt_next_boost', popupElt.content).show();
        }
    }

    function showTopItems(player_id, topItems) {
        var divPre;
        if(player_id == 0) {
            divPre = 'attacker';
        } else {
            divPre = 'defender';
        }
        
        for (var i in topItems) {
            if (topItems[i] != '') {
                $('#' + divPre + 'attacker_best_item_' + i, popupElt.content).html(topItems[i]);
            }
        }
    }

    function showFightRewards(msg) {
        if (!Util.isSet(msg)) {
            $('#wrapper_info .fightV2_result', popupElt.content).empty();
            return;
        }
        $("#wrapper_info .fightV2_result", popupElt.content).html(msg)
        .find('#figthv2_moreinfo_btn').remove();
        $('#msgcontainer', popupElt.content).empty();
    }
    
    function showWonLost(isWin) {
        $('#attacker_fight_status', popupElt.content).css('opacity', 0).removeClass('good bad');
        $('#defender_fight_status', popupElt.content).css('opacity', 0).removeClass('good bad');
        
        if (Util.isSet(isWin) && isWin == true) {
            $('#attacker_fight_status', popupElt.content).html('Won').addClass('good');
            $('#defender_fight_status', popupElt.content).html('Lost').addClass('bad');
        } else {
            $('#attacker_fight_status', popupElt.content).html('Lost').addClass('bad');
            $('#defender_fight_status', popupElt.content).html('Won').addClass('good');
        }
        $('#attacker_fight_status', popupElt.content).stop(true).animate({ 'opacity': 1 }, 300 );
        $('#defender_fight_status', popupElt.content).stop(true).animate({ 'opacity': 1 }, 300 );
    }

    function updateFactionBar(barHtml) {
        var statsElt = $('#wrapper_log_stats .fightV2_stats dl[city=4]', popupElt.content).hide();
        if (Util.isSet(barHtml)) {
            if (barHtml != '') {
                var fct = h$(barHtml).find('.faction_main .faction_container');
	            fightStats.yakuza = Regex.factionProgress(fct.eq(0).find('.zy_progress_bar_faction_text').text());
	            fightStats.triad  = Regex.factionProgress(fct.eq(1).find('.zy_progress_bar_faction_text').text());
                statsElt.show();
            }
        }
    }

    function showIceState(defender, first_attack) {
        
        var ice_state_set = false;
        if (Util.isSet(defender.is_iced)) {
            if (defender.iced_self) {
                $('#fv2_defender_you_iced', popupElt.content).css('display', 'none');
                $('#fv2_defender_iced_self', popupElt.content).css('display', 'block');
                $('#fv2_defender_was_iced', popupElt.content).css('display', 'none');         
                ice_state_set = true;
            } else if (defender.you_iced || (!first_attack && defender.is_iced)) {
                $('#fv2_defender_you_iced', popupElt.content).css('display', 'block');
                $('#fv2_defender_iced_self', popupElt.content).css('display', 'none');            
                $('#fv2_defender_was_iced', popupElt.content).css('display', 'none');
                ice_state_set = true;
            } else if (defender.is_iced) {
                $('#fv2_defender_you_iced', popupElt.content).css('display', 'none');
                $('#fv2_defender_iced_self', popupElt.content).css('display', 'none');
                $('#fv2_defender_was_iced', popupElt.content).css('display', 'block');
                ice_state_set = true;
            }
        }
        if( !ice_state_set ) {
            $('#fv2_defender_you_iced', popupElt.content).css('display', 'none');
            $('#fv2_defender_iced_self', popupElt.content).css('display', 'none');
            $('#fv2_defender_was_iced', popupElt.content).css('display', 'none');         
        } else {
            //             
        }
    }
    function genFightWrapper(sHtml) {
        $('#fight_wrapper', popupElt.content).html(sHtml)
        .find('#wrapper_actions .fightV2AttackButtons').empty();
        $('.boostcontainer', popupElt.content).removeAttr('style').css('padding-top',15);
        $('.boost_wgt_next_boost', popupElt.content).removeAttr('style');
        $('#fightv2_boost_on, #fightv2_boost_off', popupElt.content)
        .removeAttr('onclick').removeClass('checked').css('cursor','pointer').click(Events.use_boost_click);
        $('#fightv2_boost_'+(bAttackerUsedBoost?'on':'off'), popupElt.content).addClass('checked');
        $('#wrapper_items_won', popupElt.content).remove();
    }
    
    function toFightScreen() {
        $('#ctrlcontainer', popupElt.content).hide();
        $('#msgcontainer', popupElt.content).show();
        $('#fightmsgcontainer', popupElt.content).show();
        $('#fight_wrapper', popupElt.content).show();
        $('#options_wrapper', popupElt.content).hide();
        $('#opponents_table', popupElt.content).empty();
        showDiv('events', '_list');
        showFightRewards();
    }
    
    function toStartScreen() {
        $('#ctrlcontainer', popupElt.content).show();
        $('#fightmsgcontainer', popupElt.content).hide();
        $('#fight_wrapper', popupElt.content).hide();
        $('#options_wrapper', popupElt.content).show();
        $('#msgcontainer', popupElt.content).empty().show();
        $('.fightV2_result', popupElt.content).empty();
        $('#attacker_boost_used', popupElt.content).empty();
        showDiv('opponents', '_list');
        hideFightControls();
        updateNewOpponent();
    }
    
    function addManualControls(bHideHealButton) {
        var wrapper = hideFightControls();
        var curr = PlayerList.current;
        
        if (curr && curr.alive && curr.attack) {
            c$('div', 'fv2_button_row1').appendTo(wrapper)
            .append(b$('Attack again','class:short red fightV2AttackBtn').click(Events.attackAgain_click));
        }
        if (options.get('usePowerAttack') &&  curr && curr.alive && curr.pwratk) {
            c$('div', 'fv2_button_row2').appendTo(wrapper)
            .append(b$('Power Attack','class:short red fightV2AttackBtn').click(Events.powerAttack_click));
        }
        if (!bHideHealButton && fightStats.healthpct < 80) {
            c$('div', 'fv2_button_row3').appendTo(wrapper)
            .append(b$('Heal','class:short red fightV2AttackBtn').click(Events.heal_click));
        }
        c$('div', 'fv2_button_row4').appendTo(wrapper)
        .append(b$('Run Away', 'class:fightV2AttackBtn').click(Events.runAway_click));
    }
    
    function addAutoControls(onlyRunAway) {
        var wrapper = hideFightControls();
        if (onlyRunAway !== true) {
	        c$('div', 'fv2_button_row1').appendTo(wrapper)
	        .append(b$('Stop','class:short red fightV2AttackBtn').click(Events.stop_click));
        }
        if (onlyRunAway !== true && fightStats.healthpct < 80) {
            c$('div', 'fv2_button_row2').appendTo(wrapper)
            .append(b$('Heal','class:short red fightV2AttackBtn').click(Events.autoHeal_click));
        }
        c$('div', 'fv2_button_row3').appendTo(wrapper)
        .append(b$('Run Away','class:fightV2AttackBtn').click(Events.runAway_click));
    }
    
    function addSkipControl() {
        var wrapper = hideFightControls();
        c$('div', 'fv2_button_row3').appendTo(wrapper)
        .append(b$('Stop','class:short red fightV2AttackBtn').click(Events.stop_click));
        c$('div', 'fv2_button_row1').appendTo(wrapper)
        .append(b$('Skip','class:short white fightV2AttackBtn').click(Events.skip_click));
    }
    
    function hideFightControls() {
        return $('#wrapper_actions .fv2_btncontainer').empty();
    }
    
    /**
     * Evaluate a fight result.
     * @param {String} htmlText HTML Response Text
     * @param {Boolean} autoMode True for automatic mode
     */
    function parseAttack(htmlText, autoMode) {
        var fight_result, fight_data;
        var bfirstAttack = false;
        var opponent = PlayerList.current;
        var attack_again = false;
        var bLevelUpStop = false;
        
        updateUserFields(htmlText);
        
        if (Util.isSet(htmlText.fight_result)) {
            fight_data = htmlText;
        }
        else {
            fight_data = new CSFightResult(htmlText);
        }
        // check it has a fight results
        if ( !(fight_result = fight_data.fight_result) ) {
            log$('ERROR_NO_FIGHT_RESULT');
            return {success: ERROR_NO_FIGHT_RESULT, first_attack: bfirstAttack};
        }
        log$('fight_result: ok');
        
        opponent.alive = attack_again = !(fight_result.defender.was_iced 
        || fight_result.defender.is_iced 
        || fight_result.defender.is_killed 
        || fight_result.defender.iced_self
        || fight_result.defender.you_iced);
            
        if (fight_data.fight_wrapper) {
            genFightWrapper(fight_data.fight_wrapper.html());
            bfirstAttack = true;
            opponent.attack_boost = fight_data.atkbtn_boost_on;
            opponent.attack = fight_data.atkbtn_boost_off;
            opponent.pwratk_boost = fight_data.poweratkbtn_boost_on;
            opponent.pwratk = fight_data.poweratkbtn_boost_off;
            if (fight_data.opponenet_icon) {
                opponent.image = fight_data.opponenet_icon;
            }
        }
        log$('bfirstAttack: '+bfirstAttack);
        
        var rgx, s_outText = '';
        var n_cash = fight_result.cash;
        var n_done = fight_result.defender.damage_dealt;
        var n_take = fight_result.attacker.damage_dealt;
        var n_expe = fight_result.experience;
        var n_won = 0, n_lost = 0, current_won = 0, current_lost = 0;
        var s_cashfrom   = fight_result.cash_class;
        var b_goodCash   = (fight_result.cash_city === StartCity);
        var n_grpAttack  = Util.parseNum(fight_data.fightbar.group_atk);
        var n_grpDefense = Util.parseNum(fight_data.fightbar.group_def);
        
        if (!fight_data.status == 'ok') {
            if (fight_data.status == 'failed') {
                if (Util.isSet(fight_data.error)) {
                    //addErrorLog(fight_data.error);
                }
            }
            return {success: ERROR_BAD_RESPONSE, first_attack: bfirstAttack};
        }
        
        if (options.get('useSkipIfHealt') && fight_result.defender.current_health_pct > options.get('skipIfHealt')) {
            attack_again = false;
        }
        if ( fight_result.defender.other_damage && fight_result.defender.other_damage > 0) {
            if ( options.get('skipIfOtherDamage') ) {
               attack_again = false;
            }
        }
        if (Util.isSet(fight_result.loot)) {
            addLootToLog(fight_result.loot, (fight_result.cash_city===7 && CurrentCity===7));
        }
        if( Util.isSet(fight_result.socialMessageCards)) {
            addLootToLog(fight_result.socialMessageCards, (fight_result.cash_city===7 && CurrentCity===7));
        }
        
        // POPUPS
        if ( fight_data.popup ) {
	        if ( /levelUpBg/.test(fight_data.popup) ) {
                if ( options.get('stopAfterLevelUp') ) {
		            $('#popup_fodder').html(fight_data.popup);
		            bLevelUpStop = true;
                }
	        }
	        else if ( /ice_stolen_wrapper/.test(fight_data.popup) ) {
	            addStolenIceToLog(new CSStolenIcePopup(fight_data.popup), opponent);
	        } 
	        else if ( fight_result.defender.you_iced || /iced_event_iced_popup|iced_popv2_wrapper/.test(fight_data.popup) ) {
	            addIcedToLog(new CSIcePopup(fight_data.popup), opponent, fight_result.defender.is_killed);
	        }
        }
        n_won  = fight_result.power_attack.won;
        n_lost = fight_result.power_attack.lost;
        
        current_won  = n_won - opponent.lastWon;
        current_lost = n_lost - opponent.lastLost;
        
        opponent.fights = (n_lost + n_won);
        
        // check opponent health
        if (opponent.lastHealthPct) {
	        if ( opponent.lastHealthPct > fight_result.defender.current_health_pct ) {
	            //var fixed_pct = opponent.lastHealthPct - (fight_result.defender.current_health_pct+fight_result.defender.other_damage);
	            var fixed_pct = opponent.lastHealthPct - fight_result.defender.current_health_pct;
	            opponent.fights_for_ice = Math.ceil(fight_result.defender.current_health_pct / (fixed_pct / (current_won+current_lost)));
	        }
	        else if ( options.get('useSkipIfHealt') && options.get('skipIfHealt') === 100 ) {
	            // opponent get healed
	            attack_again = false;
	        }
        }
        
        if (fight_result.is_power_attack)
        {
            s_outText = 'You fought '+ (current_won + current_lost) +' times. '
                      + '<span class="good">You won ' + current_won + ' fights</span> and '
                      + '<span class="bad">lost ' + current_lost + ' fights</span>, ';
        }
        else 
        {   // normal attacks
            if (fight_result.isWin) {
                s_outText = 'You fought 1 time. <span class="good">You won the fight</span>, ';
            }
            else {
                s_outText = 'You fought 1 time. <span class="bad">You lost the fight</span>, ';
            }
        }
        
        // apply stats
        fightStats.attackStat   = n_grpAttack;
        fightStats.healthpct    = fight_result.attacker.current_health_pct;
        fightStats.wonFights    += current_won;
        fightStats.lostFights   += current_lost;
        fightStats.totalFight   += (current_won + current_lost); 
        fightStats.experience   += n_expe - opponent.lastXp;
        fightStats.staminaSpend += (current_won + current_lost) * staToSpend();
        fightStats.atkGained    = (n_grpAttack > fightStats.startGroupAtk ? n_grpAttack - fightStats.startGroupAtk : 0);
        fightStats.defGained    = (n_grpDefense > fightStats.startGroupDef ? n_grpDefense - fightStats.startGroupDef : 0);
        fightStats.cashWon[fight_result.cash_city] += (fight_result.isWin ? (n_cash-opponent.lastCash) : n_cash * -1);
        
        opponent.lastWon         = n_won;
        opponent.lastLost        = n_lost;
        opponent.lastXp          = n_expe;
        opponent.lastCash        = n_cash
        opponent.lastHealthPct   = fight_result.defender.current_health_pct;
        
        if (fight_result.isWin) 
        {
            // add enemy to whitelist
            if (b_goodCash && options.get('addUserToWList')) {
                if (n_cash >= options.get('cashNeedToGain')) 
                {
                    if (PlayerList.addCurrentToWhiteList()) {
                        fightStats.whitelisted++;
                        addToLog('"The bank" ' + opponent.anchor() + 
                                ' has nice cash, added to WhiteList.',
                                'whitelist', opponent.image);
                    }
                }
            }
            else if (autoMode) {
                // skip if no minimal cash
                if (options.get('skipMinimalCash') && n_cash < options.get('minimalCash')) {
                    log$('skiping ' + opponent.name + ' cash of: ' + n_cash + ' less than: '+ options.get('minimalCash'));
                    attack_again = false;
                }
                // skip if cash from different city
                if (options.get('skipDiffCityCash') && b_goodCash !== true) {
                    log$('skiping ' + opponent.name + ' cash from different city.');
                    attack_again = false;
                }
                /*
                if (StartCity === 4 && options.get('skipNoFaction') && !obj.addFaction) {
                    log$('skiping ' + opponent.name + ' no faction points.');
                    attack_again = false;
                }
                */
            }
        }
        else if ( !options.get('attackWhenLost') )
        {   // add enemy to blacklist
            attack_again = false;
            if (options.get('useBlacklist')) {
                if (PlayerList.addCurrentToBlackList()) {
                    fightStats.blacklisted++;
                    addToLog('"The beast" ' + opponent.anchor() + 
                            ' is too strong!, added to BlackList.',
                            'blacklist', opponent.image);
                }
            }
        }
        else 
        {   // check attack when lost 
            if ( !bfirstAttack && (options.get('attackWhenLostBut') && opponent.fights_for_ice >= options.get('attackWhenLostButIf'))) {
                log$('skiping ' + opponent.name + ' fights for ice: '+opponent.fights_for_ice+'.');
                attack_again = false;
            }
        }
        
        s_outText += 'taking <span class="bad">' + n_take + '</span> damage ';
        s_outText += 'and dealing <span class="good">' + n_done + '</span> damage to your enemy. ';
        s_outText += 'You ' + (fight_result.isWin ? 'gained' : 'losed');
        s_outText += ' <span class="' + (fight_result.isWin ? 'good' : 'bad') + '">' + (n_expe - opponent.lastXp); 
        s_outText += '</span> experience points ';
        s_outText += 'and <span class="' + fight_result.cash_class + '">';
        s_outText += n_cash + '</span> cash. ';

        
        setHealth(0, fight_result.attacker.current_health_pct);
        updateFactionBar(fight_result.user_stats.faction_module);
        updateAttackerUsedBoost();
        
        if ( !autoMode || attack_again || options.get('useNewPlayerDelay') ) {
	        setHealth(1, fight_result.defender.current_health_pct);
	        
	        updateAttackerHealthVal(fight_result.attacker.health);
	        updateAttackerAttackVal(fight_result.attacker.skill_atk, fight_result.attacker.skill_atk_no_boost, bAttackerUsedBoost);
	        updateAttackerStaminaVal(fight_result.attacker.stamina, fight_result.attacker.max_stamina);
	
	        showDamageTaken( 0, fight_result.attacker.damage_dealt );
	        showDamageTaken( 1, fight_result.defender.damage_dealt );
	        
	        showOtherDamageTaken( 0, fight_result.attacker.other_damage );
	        showOtherDamageTaken( 1, fight_result.defender.other_damage );
	        
	        showFightRewards(fight_result.fight_info_div);
	        showWonLost(fight_result.isWin);
	        
	        $('#defender_boost_used, #attacker_boost_used', popupElt.content).hide();
	        if (Util.isSet(fight_result.attacker.boost_used_tag) && fight_result.attacker.boost_used_tag != '') {
	            showBoostUsed(0, fight_result.attacker.boost_used_tag);
	        }
	        if (Util.isSet(fight_result.defender.boost_used_tag) && fight_result.defender.boost_used_tag != '') {
	            showBoostUsed(1, fight_result.defender.boost_used_tag);
	        }
	        
	        showBoostUsage(fight_result.boost.total_qty, fight_result.boost.next, fight_result.boost.ask_timeout, fight_result.boost.qty_array);
	        showIceState(fight_result.defender, bfirstAttack);
	        showTopItems(0, fight_result.attacker.top_items);
	        showTopItems(1, fight_result.defender.top_items);
	        
	        // Add data to log
	        addToLog(s_outText);
        }
        
        PlayerList.current = opponent;
        updateStats();        
        
        return {
            success  : ERROR_SUCCESS,
            isWin    : fight_result.isWin,
            stamina  : fight_result.attacker.stamina,
            health   : fight_result.attacker.health,
            was_iced : fight_result.attacker.was_iced,
            first_attack : bfirstAttack,
            attack_again : attack_again,
            levelUp_stop : bLevelUpStop
        };
    }
    
    function Initialize() {
        autoPublish = new CSAutoPublish();
        
        PlayerList.blackList = new CSList('blackList');
        PlayerList.whiteList = new CSList('whiteList');
        PlayerList.clanList  = new CSList('clanList');
        
	    travelCountdown = new Countdown('#timer_timetotravel', function() {
	        setNewCurrentCity();
	        addTravelCountdown();
	    }, 'Travel to new city in: ');
	    fightResumeCountdown = new Countdown('#msgcontainer', function() {
	        abort_process = false;
	        sendMessage('Updating...', true);
	        reqSurvey(AttackNewOpponent);
            addTravelCountdown();
            addFightCountdown();
	    }, 'Resume AutoFight in: ');
	    fightCountdown = new Countdown('#timer_timetopause', function() {
            abort_process = true;
            clearAllTimers();
            setTimeout(function() {
	            addAutoControls(true);
	            addFightResumeCountdown();
            },2000);
	    }, 'Pause AutoFight in: ');
        // Generate DOM
        genMainDom();
        
        showDiv('items', '_logs');
        toStartScreen();
        $('#timer_timetotravel, #timer_timetopause').hide();
        /*
        getBodyCount(function(count) {
            nIcedCount = count;
            log$(nIcedCount);
        });
        */
        sendMessage('Loading...', true);
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('survey', 'show_nps_survey'),
            success: function(jsonData) 
            {
                updateUserFields(jsonData);
                sendMessage();
                fightStats.startGroupAtk = Util.parseNum(jsonData.fightbar.group_atk);
                fightStats.startGroupDef = Util.parseNum(jsonData.fightbar.group_def);
                if (options.get('forceStartingCity') && StartCity !== options.get('startingCity')) {
                    travelTo(options.get('startingCity'), finish);
                }
                else {
                    finish();
                }
            }
        });
        
        function finish() {
            updateStats();
            // get players and show them
            if ($('#inner_page').attr('class') == 'fight_controller') {
                setTimeout(function(){
                    addNewOpponents($('#inner_page').html());
                    if (PlayerList.length() > 0) {
                        genEnemyListDom();
                    }
                    $('#start_buttons',popupElt.content).show();
                }, 100);
            }
            else {
                setTimeout(Events.refresh_click, 1000);
            }
        }
    
        options.toDomElements();
        // show popup
        popupElt.show();
    }
    
    popupElt.addBase64Style(
        'I2JhdHRsZWZpZWxkX3BvcHVwIC5ibGFja19ib3ggew0KCWZvbnQtd2VpZ2h0OiBib2xkOyANCgljb2xvcjogcmdiKDIwOCwgMjA4'+
        'LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNr'+
        'OyANCglmb250LXNpemU6IDE0cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgLm1hZmlhX2F0dGFjayAgew0KCWJhY2tncm91bmQ6'+
        'IHVybChodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL2ljb25fbWFmaWFfYXR0YWNrXzIyeDE2XzAx'+
        'LmdpZikgbm8tcmVwZWF0IDBweCA1MCU7DQoJcGFkZGluZy1sZWZ0OiAyM3B4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwIC5tYWZp'+
        'YV9kZWZlbnNlIHsNCgliYWNrZ3JvdW5kOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9p'+
        'Y29uX21hZmlhX2RlZmVuc2VfMjJ4MTZfMDEuZ2lmKSBuby1yZXBlYXQgMHB4IDUwJTsNCglwYWRkaW5nLWxlZnQ6IDIzcHg7DQp9'+
        'DQojYmF0dGxlZmllbGRfcG9wdXAgI2Z2Ml93aWRnZXRfd3JhcHBlciB7DQogICAgYmFja2dyb3VuZDogdXJsKCdodHRwOi8vbXdm'+
        'Yi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL2ZpZ2h0L3YyL2ZpZ2h0X21haW5fYmFja2dyb3VuZC5qcGcnKSB0b3Ag'+
        'bGVmdCBuby1yZXBlYXQgYmxhY2s7DQogICAgd2lkdGg6IDc1MHB4Ow0KCWhlaWdodDogMzUwcHg7DQoJYm9yZGVyOiAwcHg7DQoJ'+
        'cG9zaXRpb246IHJlbGF0aXZlOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNvcHRpb25zX3dyYXBwZXIgew0KCWJhY2tncm91bmQ6'+
        'IGJsYWNrIHVybChodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3Mvc29jaWFsbWlzc2lvbnMvYmdfdGV4'+
        'dHVyZV9tb2R1bGUuanBnKSBuby1yZXBlYXQgc2Nyb2xsIDUwJSAwJTsNCglwYWRkaW5nOiAwcHggNXB4Ow0KCWhlaWdodDogMTAw'+
        'JTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjZmlnaHRfd3JhcHBlciBkaXYudXNlcmJveCB7DQoJd2lkdGg6IDIzMnB4Ow0KCWhl'+
        'aWdodDogMzQ1cHg7DQoJYmFja2dyb3VuZDogdXJsKCdodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNz'+
        'L2ZpZ2h0L3YyL2ZpZ2h0X3BsYXllcmJhY2tncm91bmQucG5nJykgMCAzNXB4IG5vLXJlcGVhdDsNCgl0ZXh0LWFsaWduOiBjZW50'+
        'ZXI7DQoJZmxvYXQ6IGxlZnQ7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNhdHRhY2tl'+
        'cl9maWdodF9zdGF0dXMsICNkZWZlbmRlcl9maWdodF9zdGF0dXMgew0KCWhlaWdodDogMzZweDsNCglmb250LXNpemU6IDI4cHg7'+
        'DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgICNhdHRhY2tlcl9maWdodF9zdGF0cyB7DQoJbWFyZ2luOiAxMHB4IGF1dG87DQoJd2lk'+
        'dGg6IDIwMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICAjYXR0YWNrZXJfcGljIHsNCglmbG9hdDogbGVmdDsNCgl0ZXh0LWFs'+
        'aWduOiByaWdodDsNCgl3aWR0aDogMTQ3cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgLmRpdkhQQmFyIHsNCgliYWNrZ3JvdW5k'+
        'OiB1cmwoJ2h0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvZmlnaHQvdjIvZmlnaHRfaGVhbHRoX2dy'+
        'ZXkucG5nJykgdG9wIGxlZnQgcmVwZWF0LXg7DQoJd2lkdGg6IDIxNXB4Ow0KCWhlaWdodDogMjNweDsNCgltYXJnaW46IDVweCBh'+
        'dXRvOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodF9idG5fcGFuZWwgew0KCWJhY2tncm91bmQ6IHVybCgnaHR0cDovL213'+
        'ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9maWdodC92Mi9maWdodF9jZW50ZXJfYmFja2dyb3VuZC5wbmcnKSB0'+
        'b3AgbGVmdCBuby1yZXBlYXQ7DQoJaGVpZ2h0OiAzNTBweDsNCglmbG9hdDogbGVmdDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAj'+
        'YXR0YWNrZXJfYmVzdF9pdGVtcywgI2RlZmVuZGVyX2Jlc3RfaXRlbXMgew0KCXdpZHRoOiA2NXB4Ow0KCXRleHQtYWxpZ246IGNl'+
        'bnRlcjsNCgltYXJnaW4tdG9wOiA0NXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2FjdGlvbnMgew0KCXdpZHRo'+
        'OiAxMzBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjZmlnaHRfYnRuX3BhbmVsIGRpdi5ib29zdGNvbnRhaW5lciB7DQoJd2lk'+
        'dGg6IDE4NXB4Ow0KCW1hcmdpbjogMnB4IDAgMCA0MHB4Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgltaW4taGVpZ2h0OiA3OHB4'+
        'Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodF9idG5fcGFuZWwgZGl2LmJvb3N0Y29udGFpbmVyIHsNCgl0ZXh0LWFsaWdu'+
        'OiBjZW50ZXI7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgLnN0YXRfdmljdG9yeSB7DQoJYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9t'+
        'd2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy92aWN0b3J5X2ljb24uZ2lmKSBuby1yZXBlYXQgLTJweCA1MCU7DQoJ'+
        'cGFkZGluZy1sZWZ0OiAxOXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwIC5zdGF0X2ljZWQgew0KCWJhY2tncm91bmQ6IHVybCho'+
        'dHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL21hcF9iYXNlZF9qb2JzL21hc3Rlcnlfc3RhcnNfbWVk'+
        'XzgxeDMwXzAyLnBuZykgbm8tcmVwZWF0IC02NHB4IC0xM3B4Ow0KCXBhZGRpbmctbGVmdDogMTlweDsNCn0NCiNiYXR0bGVmaWVs'+
        'ZF9wb3B1cCAuc3RhdF9raWxsIHsNCgliYWNrZ3JvdW5kOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9n'+
        'cmFwaGljcy9tYXBfYmFzZWRfam9icy9tYXN0ZXJ5X3N0YXJzX21lZF84MXgzMF8wMi5wbmcpIG5vLXJlcGVhdCAtNDdweCAycHg7'+
        'DQoJcGFkZGluZy1sZWZ0OiAxOXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwIC5saXN0ZWQgew0KCWJhY2tncm91bmQ6IHRyYW5z'+
        'cGFyZW50IHVybChodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3YzL2ljb25fd2lzaGxpc3RfYWRk'+
        'XzE5eDE0XzAxLmdpZikgbm8tcmVwZWF0IC0xcHggNTAlOw0KCXBhZGRpbmctbGVmdDogMTlweDsNCn0NCiNiYXR0bGVmaWVsZF9w'+
        'b3B1cCAjZmlnaHRPcHQgew0KCW1hcmdpbjogMHB4Ow0KCXdpZHRoOiA3MzhweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjZmln'+
        'aHRPcHQgdWwgew0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCgloZWlnaHQ6IDEwMCU7DQoJd2lkdGg6IDEwMCU7DQoJbWFyZ2lu'+
        'OiAxMHB4IDBweCAwcHg7DQoJcGFkZGluZzogMHB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJb3ZlcmZsb3c6IGF1dG87DQp9DQoj'+
        'YmF0dGxlZmllbGRfcG9wdXAgI2ZpZ2h0T3B0IHVsIGxpIHsNCglkaXNwbGF5OiBibG9jazsNCglmbG9hdDogbGVmdDsNCgltYXJn'+
        'aW46IDBweCAwcHggMHB4IDVweDsNCglwYWRkaW5nOiAwcHg7DQoJaGVpZ2h0OiAyNXB4Ow0KCW1heC1oZWlnaHQ6IDI1cHg7DQoJ'+
        'd2lkdGg6IDQ4JTsNCglvdmVyZmxvdzogaGlkZGVuOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2luZm8gew0KCWJh'+
        'Y2tncm91bmQ6IHVybCgnaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9maWdodC92Mi9maWdodF9s'+
        'b290dHJheV9zbGl2ZXIuanBnJykgdG9wIGxlZnQgcmVwZWF0LXg7DQoJaGVpZ2h0OiAxMjBweDsNCgltYXJnaW4tdG9wOiAwcHg7'+
        'DQoJbWFyZ2luLXJpZ2h0OiBhdXRvOw0KCW1hcmdpbi1ib3R0b206IDBweDsNCgltYXJnaW4tbGVmdDogYXV0bzsNCglib3JkZXIt'+
        'Ym90dG9tOiAxcHggc29saWQgIzMzMzsNCn0gDQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfaW5mbyAuZmlnaHRWMl9tc2df'+
        'Y3RybCB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lkdGg6IDQ5MHB4Ow0KCWhlaWdodDogMTAwcHg7DQoJbWFyZ2luOiAxNHB4IDExcHgg'+
        'MDsNCglvdmVyZmxvdzogaGlkZGVuOw0KCXBvc2l0aW9uOiByZWxhdGl2ZTsNCgl6LWluZGV4OiAwOw0KfQ0KI2JhdHRsZWZpZWxk'+
        'X3BvcHVwICN3cmFwcGVyX2luZm8gI2N0cmxjb250YWluZXIgew0KCWhlaWdodDogNDBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1'+
        'cCAjd3JhcHBlcl9pbmZvIC5maWdodFYyX3Jlc3VsdCB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWJhY2tncm91bmQ6IHVybCgnaHR0cDov'+
        'L213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9maWdodC92Mi9maWdodF9sb290dHJheV9saW5lLnBuZycpIDAg'+
        'NTAlIG5vLXJlcGVhdDsNCgl3aWR0aDogMjEwcHg7DQoJaGVpZ2h0OiAxMDBweDsNCglwYWRkaW5nOiAxMHB4IDVweCAxMHB4IDE1'+
        'cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIHsNCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsN'+
        'CgliYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL2l0YWx5X2Q0'+
        'LmpwZyk7DQoJYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDAlOw0KCWJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7DQoJaGVp'+
        'Z2h0OiA0NTBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfc3RhdHMgew0KCWJh'+
        'Y2tncm91bmQ6IHVybCgnaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9maWdodC92Mi9maWdodF9s'+
        'b290dHJheV9saW5lLnBuZycpIDAgNTAlIG5vLXJlcGVhdDsNCglmbG9hdDogcmlnaHQ7DQoJaGVpZ2h0OiA5NyU7DQoJd2lkdGg6'+
        'IDIxMHB4Ow0KCXBhZGRpbmc6IDEwcHggNXB4IDEwcHggMTVweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2JhdHRsZWZpZWxk'+
        'X3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9zdGF0cyBkbCB7DQoJaGVpZ2h0OiAyMHB4Ow0KCW1hcmdpbjogMHB4'+
        'Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9zdGF0cyBkbCBpbWcgew0KCWZsb2F0'+
        'OiBsZWZ0Ow0KCWhlaWdodDogMTlweDsNCgl3aWR0aDogMTlweDsNCgltYXJnaW4tcmlnaHQ6IDJweDsNCn0NCiNiYXR0bGVmaWVs'+
        'ZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfc3RhdHMgZGwgZHQgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbjog'+
        'MHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9zdGF0cyBkbCBkZCB7DQoJZmxv'+
        'YXQ6IHJpZ2h0Ow0KCW1hcmdpbjogMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRW'+
        'Ml9zdGF0cyAubnVtYmVycyB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWZvbnQtd2VpZ2h0OiBib2xkOw0KCW1hcmdpbjogMHB4Ow0KCW92'+
        'ZXJmbG93OiBoaWRkZW47DQoJcGFkZGluZzogMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAu'+
        'ZmlnaHRWMl9sb2cgew0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogOTklOw0KCXdpZHRoOiA1MTVweDsNCn0NCiNiYXR0bGVmaWVs'+
        'ZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlzdCB7DQoJaGVpZ2h0OiBhdXRvOw0KCW92'+
        'ZXJmbG93OiBoaWRkZW47DQoJdGV4dC1hbGlnbjogbGVmdDsNCgloZWlnaHQ6IDEwMCU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAg'+
        'I3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgI2ZpZ2h0bG9ncyB7DQoJYm9yZGVyOiAwcHg7DQp9'+
        'DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgLmJ1dHRvbnMg'+
        'ew0KCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzMzOw0KCW1hcmdpbi1ib3R0b206IDVweDsNCn0JDQojYmF0dGxlZmllbGRf'+
        'cG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgLmJ1dHRvbnMgYSB7DQoJYm9yZGVyLWxl'+
        'ZnQ6IDFweCBzb2xpZCAjMzMzOw0KCWJvcmRlci1yaWdodDogMXB4IHNvbGlkICMzMzM7DQoJcGFkZGluZy1sZWZ0OiAxMHB4Ow0K'+
        'CXBhZGRpbmctcmlnaHQ6IDEwcHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xv'+
        'ZyAjZXZlbnRzX2xpc3QgLmJ1dHRvbnMgYTpmaXJzdC1jaGlsZCB7DQoJbWFyZ2luLWxlZnQ6IDIwcHg7DQp9DQojYmF0dGxlZmll'+
        'bGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgdWwgew0KCWxpc3Qtc3R5bGUtdHlw'+
        'ZTogbm9uZTsNCgltYXJnaW46IDBweDsNCglvdmVyZmxvdzogYXV0bzsNCglwYWRkaW5nOiAwcHg7DQoJdGV4dC1hbGlnbjogbGVm'+
        'dDsNCgl3aWR0aDogMTAwJTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNl'+
        'dmVudHNfbGlzdCB1bCBsaSB7DQoJbWFyZ2luOiAxMHB4IDBweCAwcHggMjBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3Jh'+
        'cHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlzdCBkaXYjaXRlbXNfbG9ncyB7DQoJaGVpZ2h0OiA3NSU7DQp9'+
        'DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjb3Bwb25lbnRzX2xpc3Qgew0KCWhl'+
        'aWdodDogMTAwJTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNvcHBvbmVu'+
        'dHNfbGlzdCAuaGVhZGVyIHsNCgloZWlnaHQ6IDUlOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAu'+
        'ZmlnaHRWMl9sb2cgI29wcG9uZW50c19saXN0IC5oZWFkZXIgYSB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luLWxlZnQ6IDIwcHg7'+
        'DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjb3Bwb25lbnRzX2xpc3QgI29w'+
        'cG9uZW50c190YWJsZSB7DQoJaGVpZ2h0OiA5NSU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5m'+
        'aWdodFYyX2xvZyAucGxheWVyX3VwZGF0ZXMgew0KICAgIG92ZXJmbG93LXg6IGhpZGRlbjsNCiAgICB0ZXh0LWFsaWduOiBsZWZ0'+
        'Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgLnVwZGF0ZV90eHQgew0KCXdp'+
        'ZHRoOiAzNjBweDsNCglmb250LWZhbWlseTogdHJlYnVjaGV0IE1TOw0KCWZvbnQtd2VpZ2h0OiBib2xkOw0KCWNvbG9yOiB3aGl0'+
        'ZTsNCgljbGVhcjogbm9uZTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNp'+
        'dGVtc19sb2dzIC5sb290IHsNCgliYWNrZ3JvdW5kOiBibGFjayB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2Zi'+
        'L2dyYXBoaWNzL2ZpZ2h0X2JvbnVzZXMvc2lkZV9ib251c2xvb3QucG5nKSBuby1yZXBlYXQgc2Nyb2xsIDEwMCUgNTAlOw0KfQ0K'+
        'I2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgI2l0ZW1zX2xvZ3MgLnN0YXNoIHsNCgli'+
        'YWNrZ3JvdW5kOiBibGFjayB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL2ZpZ2h0X2JvbnVz'+
        'ZXMvc2lkZV9zZWNyZXRzdGFzaC5wbmcpIG5vLXJlcGVhdCBzY3JvbGwgMTAwJSA1MCU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAg'+
        'I3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjaXRlbXNfbG9ncyAuc3Rhc2ggLnVwZGF0ZV90eHQgew0KCWJhY2tncm91'+
        'bmQtY29sb3I6IGJsYWNrOw0KCW9wYWNpdHk6IDAuOTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMg'+
        'LmZpZ2h0VjJfbG9nICNpdGVtc19sb2dzIC5sb290IC51cGRhdGVfdHh0IHsNCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsNCglv'+
        'cGFjaXR5OiAwLjk7DQp9'
    );
    
    // load options and Initialize
    options.load(Initialize);
}


function PluginManager() {
    var options = new Config('plugins', defaults.plugins);
    
    var popupElt = new domPopupObject('pluginmanager_popup', {
        type: 'main',
        title: '<img src="'+global.resource.pluginmanager_title+'">',
        onclose: function() {
            options.save(function() {
                $('#fbmw_menu_container').remove();
                modMenu();
            });
        }    
    });
    
    var Events = {
        updown_click: function() {
            var appId = parseInt( $('#app_list li.selected',popupElt.content).attr('app_id') );
            var apps = options.get('all');
            var action = $(this).attr('name');
            
            var new_index = Util.moveArrayItem( apps, appId, (action === 'up' ? -1 : 1) );
            
            $('#app_list',popupElt.content).empty();
            
            options.save(function() {
                $.each(apps, addNewApp);
                $('li[app_id='+new_index+']',popupElt.content).click();
            });
            return false;
        },
        addApp_click: function() {
            var all = options.get('all');
            var index = all.length;
            var app = {'name':'New Plug-In', 'click':''};
            
            all.push(app);
            $('#app_name, #app_code').val('');
            
            options.save(function() {
                addNewApp(index, app);
                $('li[app_id='+index+']',popupElt.content).click();
            });
            
            return false;
        },
        field_click: function() {
            var appId = parseInt( $(this).attr('app_id') );
            var app = options.get('all')[appId];
            
            $('#app_list li',popupElt.content).toggleClass('selected', false);
            $(this).toggleClass('selected', true);
            
            $('#app_name').val(app.name||'');
            $('#app_code').val(app.click||'');
            
            $('#info_panel').show();
            
            return false;
        },
        saveApp_click: function() {
            var selected = $('#app_list li.selected');
            var appId = parseInt( selected.attr('app_id') );
            
            options.get('all')[appId] = {
                name: $('#app_name').val(),
                click: clearCode($('#app_code').val())
            };
            $('#app_list',popupElt.content).empty();
            options.save(function() {
                $.each(options.get('all'), addNewApp);
                $('li[app_id='+appId+']',popupElt.content).click();
            });
            return false;
        },
        removeApp_click: function() {
            var appId = parseInt( $('#app_list li.selected').attr('app_id') );
            if (!confirm('Are you sure?')) return false;
            
            options.get('all').splice(appId, 1);
            $('#app_list',popupElt.content).empty();
            $('#info_panel').hide();
            options.save(function() {
                $.each(options.get('all'), addNewApp);
            });
            return false;
        }
    };
    
    function clearCode(code) {
        code = unescape($.trim(code));
        log$('clearCode:\n'+code);
        if (!/^javascript:/.test(code)) {
            code = 'javascript:('+code+')();';
        }
        return code;
    }
    
    function addNewApp(index, app) {
        c$('li', 'app_id:'+index).appendTo($('#app_list',popupElt.content))
        .click(Events.field_click).append(c$('span').text(app.name));
    }
    
    function genMainDom() {
        
        c$('center').appendTo(c$('div', 'class:frame_box').appendTo(popupElt.content))
        .append(b$('Add New Plug-In', 'class:short green').click(Events.addApp_click));
        
        var main_frame = c$('div', 'class:frame_box').height(350).appendTo(popupElt.content);
        
        c$('ul', 'app_list').appendTo(main_frame);
        
        c$('div', 'arrow_controls').appendTo(main_frame)
        .append(c$('img', {'name':'up','src':global.resource.up_arrow}).click(Events.updown_click))
        .append('<br />')
        .append(c$('img', {'name':'down','src':global.resource.down_arrow}).click(Events.updown_click));
        
        c$('div','info_panel').appendTo(main_frame)
        .append(c$('p').text('Edit selected Plug-In:'))
        .append(c$('div').text('Name:').css('float','left').width(50))
        .append(c$('input:text', 'id:app_name,class:black').width(350))
        .append('<br />')
        .append(c$('div').text('Code:').css('float','left').width(50))
        .append(c$('textarea', 'id:app_code,class:black').width(345).height(260))
        .append('<br />')
        .append(c$('center')
            .append(b$('Save Changes', 'class:short green').click(Events.saveApp_click))
            .append(b$('Remove App', 'class:short red').click(Events.removeApp_click).css('margin-left',5))
        ).hide();
    }
    
    function Initialize() {
        genMainDom()
        $.each(options.get('all'), addNewApp);
        popupElt.show();
    }
    
    popupElt.addBase64Style(
        'I3BsdWdpbm1hbmFnZXJfcG9wdXAgLmJsYWNrIHsNCgl3aWR0aDogMjQwcHg7DQoJbWFyZ2luLWxlZnQ6IDVweDsNCglmb250LXdl'+
        'aWdodDogYm9sZDsgDQoJY29sb3I6IHJnYigyMDgsIDIwOCwgMjA4KTsgDQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUz'+
        'LCAxNTMpOyANCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgDQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI3BsdWdpbm1hbmFnZXJf'+
        'cG9wdXAgLmZyYW1lX2JveCB7DQoJYm9yZGVyOiAxcHggc29saWQgIzJGMkYyRjsNCgltYXJnaW46IDVweDsNCgltaW4taGVpZ2h0'+
        'OiAyNnB4Ow0KCXBhZGRpbmc6IDVweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI3BsdWdpbm1hbmFnZXJfcG9wdXAgI2FwcF9s'+
        'aXN0IHsNCglmbG9hdDogbGVmdDsNCgl3aWR0aDogMjQwcHg7DQp9DQojcGx1Z2lubWFuYWdlcl9wb3B1cCB1bCB7DQoJYm9yZGVy'+
        'OiAxcHggc29saWQgIzk5OTsNCgloZWlnaHQ6IDM1MHB4Ow0KCXdpZHRoOiAzNTBweDsNCglsaXN0LXN0eWxlLXR5cGU6IG5vbmU7'+
        'DQoJbWFyZ2luOiAwcHg7DQoJb3ZlcmZsb3cteDogaGlkZGVuOw0KCW92ZXJmbG93LXk6IGF1dG87DQoJcGFkZGluZzogMHB4Ow0K'+
        'fQ0KI3BsdWdpbm1hbmFnZXJfcG9wdXAgdWwgbGkgew0KCWJvcmRlcjogMXB4IHNvbGlkICMzMzM7DQoJY3Vyc29yOiBwb2ludGVy'+
        'Ow0KCWhlaWdodDogMjJweDsNCgltYXJnaW46IDFweDsNCglvdmVyZmxvdzogaGlkZGVuOw0KCXBhZGRpbmctdG9wOiAzcHg7DQoJ'+
        'cGFkZGluZy1sZWZ0OiA2cHg7DQp9DQojcGx1Z2lubWFuYWdlcl9wb3B1cCB1bCBsaS5zZWxlY3RlZCB7DQoJYm9yZGVyOiAxcHgg'+
        'c29saWQgI0NDMDsNCn0NCiNwbHVnaW5tYW5hZ2VyX3BvcHVwICNhcnJvd19jb250cm9scyB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lk'+
        'dGg6IDMwcHg7DQoJbWFyZ2luLXRvcDogMTIwcHg7DQp9DQojcGx1Z2lubWFuYWdlcl9wb3B1cCAjYXJyb3dfY29udHJvbHMgaW1n'+
        'IHsNCgljdXJzb3I6IHBvaW50ZXI7DQp9DQojcGx1Z2lubWFuYWdlcl9wb3B1cCAjaW5mb19wYW5lbCB7DQoJZmxvYXQ6IGxlZnQ7'+
        'DQoJd2lkdGg6IDQyMHB4Ow0KfQ0KI3BsdWdpbm1hbmFnZXJfcG9wdXAgI2luZm9fcGFuZWwgcCB7DQoJbWFyZ2luOiAwcHggMHB4'+
        'IDVweCAwcHg7DQp9'
    );
    
    options.load(Initialize);
}

// =========================================================
// serverfbml gift request.
// =========================================================
/**
 * Add some buttons to facebook serverfbml gift requests for save/load friends
 * and get the gift url.
 */
function giftFormControls() 
{
    if (x$('//form[contains(@id, "req_form_")]') == null) 
        return false;
        
    var contentText = x$('//form[contains(@id, "req_form_")]').getAttribute('content');
    if (!/next_action=(accept_(gift|boost)|respond)/.test(contentText))         
        return false;
        
    var parentElt = document.getElementById('app_content_10979261223');
    var getTiny_click = function() {
        var time = Math.round(new Date().getTime() / 1000);
        var url = /<fb:req-choice url='([^']+)'/.exec(contentText)[1];
        var name = /ztrack_subcategory=([^&]+)/.exec(url)[1];
        window.open('http://tinyurl.com/create.php?alias=' + time + '-' + unescape(name) + '&url=' + escape(url));
        
    };
    try {
        var divElt = document.createElement('div');
        parentElt.insertBefore(divElt, parentElt.firstChild);
        divElt.setAttribute('style', 'text-align: center; padding-bottom: 10px; background-color: rgb(0, 0, 0);');
        divElt.innerHTML = '<input style="width: 180px; height: 30px; margin-left: 5px;" id="tiny_button" type="button" value="Get Tiny URL">';
        document.getElementById('tiny_button').addEventListener('click', getTiny_click, false);
    } 
    catch (err) {
        logErr$(err);
    }
    return false;
}


(function(){
    
    var getWindow = function() {
        var elt = document.createElement("div");
        elt.setAttribute("onclick", "return window;");
        return elt.onclick();
    };
    var getDocumentUrl = function() {
        var elt = document.createElement("div");
        elt.setAttribute("onclick", "return document.location.href;");
        return elt.onclick();
    };
    // =========================================================
    // Make sure we are in a correct url
    // =========================================================
    
    try {
        global.href = document.location.href;
    }
    catch(e) {
        global.href = getDocumentUrl();
    }
    
    if (/serverfbml/.test(global.href)) {
        setTimeout(giftFormControls, 5000);
    }
    else if (/html_server/.test(global.href)) {
        // make sure it's the real game
        if ((global.final_wrapper = document.getElementById('final_wrapper'))) {
            // catch chrome
            if (typeof chrome !== 'undefined' && typeof chrome.extension !== 'undefined') {
                log$('Chromium browser detected.');
                unsafeWindow = getWindow();
                global.is_chrome = true;
                checkXDChromeSupport();
            }
            else {
                global.xd_support = (typeof GM_xmlhttpRequest !== 'undefined'); 
            }
            log$('Mafia Wars Game detected.');
            initStorage();
            initjQuery();
        }
    }
    else if (/apps.facebook.com\/inthemafia/.test(global.href)) {
        modNoCanvasFrame();
    }
    else if (global.href.match(scriptAppInfo.appMeta)) {
        updateCheck(document.getElementsByTagName('body')[0].innerHTML);
    }
    // died...
    return false;
})(); 

// =========================================================
// END OF ALL CODE.
//
// RESOURCES:
// =========================================================

global.resource = {
    mwaddon_icon: 'data:image/jpg;base64,' +
    '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e'+
    'Hh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAABwAFBggBAgME/8QANRAAAgEEAQMCBAIJBQEAAAAAAQIDBAUGERIAByETMQgUIlFhcRUWIyRBQlKCkRcyM2KBof/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMFBP/EACIRAAICAgIA'+
    'BwAAAAAAAAAAAAABAhEDMRIhBBMiQWGh4f/aAAwDAQACEQMRAD8Apl1YS1/DFc66/wCP0Yyb07bd8W/WB682/YgYBd0/H1PqIMkf1ch4Ynj46r31aa0fEFAI7Ji9VdVp7PS0MMMtSqMeKpRvE0XgctGRIW8ePcnoAOdp+0+Q5xklioqmludos96eeOmuzW9pYXeKGSXg'+
    'myocn0mGg33+3TTesEvMeYVOP4/bb5eDEW9JmtbwzSBNCQmIFioVtr7n286PgGXGu6mI43jOI2Wx1NNTC2VPzlTIYZOZmegnhlZmO+R5yaGvAAUDwOmntZmuJW+XHay7XCNq61W9IITJHIwp/wBs7SHQHk8SNHzrfQDT2O7Ezd0LVS10GRm2lrxLbayM0HqmlVaZpll/'+
    '5F5BmAj4+NE72fbpo7h9mMkxae30lDDcL7WSWcXa5RUtvbVvjLuo5sC2xqMnZC/l1JuxPd6Pt/Q5vAlYsb3KZJaFtHy3JwxHjx9JU+ft1Obj3mwy55lleS1FypluVbSfo2jneCVv3X5VgQgA0hMrEFiN68ex6Ar5Q9te4VctK1Hg+R1C1cDVFMY7bKRNEvHbr9PlfrTy'+
    'P6h9+otIjxyNHIrI6khlYaII9wR1Yyl7yQVXde61lZlksON19tgo5oHSVkkj9CJJeBQh4pCYlPNfJ4+d+Oq9XSSOW51UsMkkkTzOyPISXYFjosT7n79AebpdLpdAZUbOt66lmJQYvFL6l5rqhCVI3Frxvx7EdRWBxHPHIVDBGDcT/HR9urR9jbFg15pJqbIO31DXWinp'+
    'AbjcXWoWVHD8gTIraG10NKUI9yCpOoeRY+2jfFgeZOvYrbJb0rb3HQ2mRZ/XmWKEH6dljob30Wbf2swevqkwqHKqtc1alaqjkNP+5SMYhKsJbeweA5b1r6vJ2OHUVyK5WUdxqmvxi0JaqWBZEpUA8LKGYggHewAQvnewuyNnQnFryKnihrbnSxwfpyksjCKv9WFnecD0'+
    '4gq8TIWKlDonj5Ka0AvVl6lZlKPGXEAnS63mSSOVo5UZHU6ZWXRB/L+HWnUFRdLpdLoAmdjMHpskvlXeLqxNjsFHJcrkAgJcIP2cK72CzycVHIa1yJB1oyy/ZfOaE2i01KVFwuc7110r/l0ScM/HVOrgeEQKGLDzyd1GgNM24fkEmP8AZf8AVa2QlrvlFaa6saNSZDRU'+
    'xAhjGvI5TCRt/ZCD79MFPiHcOWmeW24LlFZJKCfVhtU7gD+1etEldsvdQ62xszn5JXpKWghARIdy1AHIs3Jt+f5dHY8e+h0TfhBwaPI+4NHcnpZqpKVw6zcA0cMikk8ixA3x4ka2wJ/268gdS4HnVHYKl7vh2RUpjmXh8za50OmDFvdfbYH+f8nD4Sr1SY/SVlBNT3aa'+
    'mZlmlFPH6a+qQoYM+gQo1xIL6I34PXkzSpP5Ol4eHmyUo1aX3r9BX8W9tFm79X61K0LpSpTIjR+5X5eMjn/20QPyA6E/RT+LC6wXjv8A5RUwUkFMYp46aX0TtZJIokjd/wD0qf8A5vzvoWdbR0qOZNtybezaJHlkWONGd3IVVUbLE+wA6NOKYJi9gyy14nfaNcnzeulS'+
    'OW2tUNDbbPtSzGqkjIeZ4xpnRGVVAYFiRroTYrdWsWT2q9pEsrW+thqhGw2HMbh9H8Drp6ospWjvOSXfT1VVd454A7sVYJO25W2P5mTkh/B26kqGrKrx3dx3uDkHbyy6pJ6SjY0lHi1sFKsqGIcHT01MraD72WYhgfPjqO9ysK7l0NrxGpo8izvIbtkNPUzzWueCoFVR'+
    'tAyK4ZBI7Hy58kDQA+/j2z/EC1fTVVdV03pX2sxuSxVFWF2xQ74ty1veyST+I+3XK3d9jTdrI8LY8pUx+ezpV8DyRZABoHW+OgB+SjqW7JZjKMZ7lYQ+KJjGRZ3dq2/UElXLa4o6mnqqT02AdCkcjMCCTs+NfxHTxJ3G72mkNq/03yC6x04FPXi9W2orJuTgcU9VEjkj'+
    '2GUj6ix2CD5101v3zgftVJhboJJ2xxLMtUUPJVUEFQdb4nYH9o663HvvTz9s5MVhjEdWcXgsTVYVg0gReJBOt60W9/6z1D7Ck1ojGV4FbL4LhJjtjvOJ5TQ07Vtbid35s8sA2zS0kjhXfiv1GNxy0GKs+uhF0Z7n3Vpq3uHgWWyScmxazU9HKADyqHhD/T5HkOX0fwJ6'+
    'DHQg/9k='
    ,
    configuration_title: 'data:image/jpg;base64,' +
    'R0lGODlhswApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAswApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKTlJWWl5iZgzd+nZ5+dCaao6Slpqeo'+
    'lUafrH4oqbCxsrOpEq2serS6u7y9ADi3rCS+xMXGlk6sUlSsLsfP0NBan2iCrEjR2dq7ZJ9ignqfTIwnVVxmZFo3DYwt7u6D7/CC8vXw9owhUV5mZlw2C9rVoycvnr0VIw48GmjQ3kB8i8qdS7dO4LuG8Lp5+gYgnKdxg9AEA7JIY6cvguh8oiHIZCs6AFwSWWQmGI+S'+
    'n2YCUOmJZcxgfsAEZOSxE5ZBQIB2qiZzkchbJAe5RLlzpUuORf2ABHBGaQuprMpU7dkSKMymgp4G8/nTk06enf98urwVYREJVniQKvXDNOegrkC/lv0kFq4fGlfBiRMkYi/MwZ+EGJZrtm0nnSX25oXs5+1KzreqDcLSSoSgpEr7umXsGCwryVa9Kf4oCMpePxhA36Ic'+
    '7KxfAEzwtuLA2TNZy0AtDLLTysrpvaov176dG/naxB0XA5DyiQwAW5+GWd8N2op5K12Q6wTTHUADViyKp/xs3Qr7T84AcLgFR5CS86yclx5a3HniHXieiDfXbtjJAceDcDgHgBefYAMAHvjp1gpv0jGClks9zNZJfmhNJh8AfNCXQzASMMLKK651SKEnFmLoCYm3ISYb'+
    'JCXSt+CGJ+K0GnI+iOgHjkOaqN7/fMdx4UlWMLj4CYwn9njcj6zouFEkVsbFWYFZBhljZ5wVmd2NJyrZ5WGCMNcJM55UIaUnVC5pp5qfgBnbljz+hqdbQwBpp5AdumRmVkh2+Kein0HwCRBweGLGnJ3U+aGfPuYUaJbYPbImh50ZIChahJJJpCBTOKGqE4mauqipbo4I'+
    'wF2esOBkJ3xQ6kqpOn1anKic7ugpplf6RVqm4jCh7BR2GsolsV6qV8EGrBDnwiccIPEJBIu8yGuayEp3bE+dOuLrkiiEOZ4nXDT7SZE5xCvvmMZFi6UnagiirScOxPAJCN1O+e2d4ZKZ7p6dcDRskgXPtF/BrLR7qSdFRpoh/8HFAiWHQgBY8QkBMFxsjcD0gpuxdA+T'+
    'K6y50LK5JLAntyLxb85ajCbG9gJlxgOD1NRJLiaIDIC3JePsclMwx1VuI+eipe69Mw9ZczMm56zUB4LYDFNjNAZM58BN/xYsnwszGrNONlp9WQ1ss+0uxQDYLKvRoPrhRqx+bJZiJ27o94mEI39ddNhDpn0YdhskrnjVR7cMqk5gvwtAFVTTLZ8AwiRdDQafgOF1pZEz'+
    'fDaTSu+YFUiEm622qaF3cujFqbu6kgOfTGoBNZ/vOrjjjGuZsJGo8275oLvDfebcsdd72O1bIuhHf4MQXaXwn2J3eu/YEz+98Yhm/2nKQQHgqP8nmwUOevGqNy566XxeP3zyTNMs+fFHeu841514AQDtn+RuqfzrU1/6fOcHrGgHfmNZHeTQ54fX3QyBk1HBJ7gwgAWw'+
    'wgDRI9n2Btg76x2QeiAcUusaaKRWKe9xpDvMtfaigAwKboOyG10CD2e6DwYQhTPE4QgdiLwQDlAGt+GW+XQHwxN2sIa0eZ8PWcdAHtZPiTe0wW0o4MLzFTGFOJyMB5MIwYbFT2rz6x4UBwiMvVRnaBp8GwfpNi4/5AtznzCCINooob2dD4EDE8MnoDDE/NBREHbU3ad4'+
    'cBviDPF/Q/ojikj2KSWwwgnT+MQKBBGcT3ygjJ7wgP1EWDQ4eSL1A0C8WCU9cUlWaJJuPpggAA5QrSoS0U6j7EQpP3HKT61QKacMpVJaOEYmnigKt8mPLoHCy08lg10AQIApXYnIDg0zGMV0nAL2IodB8A8oYtlkhwZGK6Xk55rByCbdUNOJdinzX8wcGDhvIU5f6UAp'+
    'hhQEEZQixF4uMEg+Y4Va8gOAeQKlnp8ipx/MyQqAHXJg/aRn0ZR0AsMsZQONiIHhOjEGni3Uix76jSDu44n0yGFugpBoKyo6sMkIlKDoPGjRQjpRP5D0oscRRAVacIMbtKAukNgATWuwAnZkYwIvyEEMcJqAojpCpzfgqU+3IQmkKnUUgQAAOw=='
    ,
    homefeedcenter_title: 'data:image/gif;base64,' +
    'R0lGODlh4QApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA4QApAAAH/4AJgoMAAIOEhYmKi4yNjo+QjYeTiJGWl5iKITdMRDcdmaGio49Gfqen'+
    'AgBWqH5wpLCxhaattX4+srmON7Z+dCa6wbq0qKqsqK/Cyo7EvbfLw86nKNDVl81+xq3J1tDYtrjdoxLSp3ri6IvY2sjpyt+14e6XOOWnJPPo66vb+dGtegIKlOfvkZNaUqjUclHQ2r5jp7g1HLVvIiYtrdAUqoXE4rKH/RSdqMLFDBktNxosasGyZUtFLl0WikkTUsWV'+
    'NGUCyKkz5wlQmMi0ElNITysmM3myTPqS6dKdSl9GbeG05YoRBxSBbJcIjTMgioT2QlBIiTMRAMT2omOzlipGav9tsU0rbW7cWlMuxSUKwCgqpHSd2W31pRCdVjQAALGn8W6rwc7ALJjllh9XAGfKUS3k+NSRjWcDr23b6u2izqcgjxbdi4+lvUWPcq47u1UZAIdRJV5c'+
    'rjFt1r0iANgasZAIe3OBo3JdQxpa1L5IF2sEXbXc2tKyRILdV7ZyVNZPCcl9ajfj76mxO9NI3FUhKPb8YFBfK4XX0NWlp6L+Oz/6VgRAwp1fpwDmH3S6KXbegfFZ0F4yUrRCBgDktIIPa/edwkVGtTxXixUgWtGFftnw10qIItKH4ojAWZHhKSAIOFRsf6kYIosIlgeA'+
    'EiF+COKId62oIhgLPViIF610BAD/Hq0wxBoRbjhTQodPZnJTWK0QYeIpWsKVJQAELCQjKnzJAceZcFihXpenxZeYIrVQk0hcbGKJSpd8IIaNEmaFRKdhiK0pQy9yGEDln5jsyeeiMSLa5p1b+tEleX686Qh3l37ppT2WgoaKnGtGOqme8SWDKKVv0olAL0cY2oqHkCZq'+
    'T6OaPsqlqIAm+AimuG56SoS2dApAnHbe6qukuZYHTy2maopqqBvWgoGrqMBq7DWzVnlsnXM6G+iuM4Ibq62SDhHsIsR2O26xyOJGqj3NxvpslS7UYgcA1J5ibbvYlkPruupey+6oumZK5pgCByxpvjrC2Qqo2pLbpR1NLuun/7e6/ulBLV7ge2gtTITMRF6lZHuXyCPT'+
    'hzLJp35r8Cl8vVygyCx/iUUtwqarMs1rVrBBLRxgQ8MNELmn7bx/MmyEx6/+xwWJQ98g9Q30tfK006G6W3CkMUday9V/ooAzug+z+3XVtagxXGVFx2ss0prmiQpDDO97dsmleW012hpmPa/MXR97958cjO3wp2bv/Z8fcmRl5NHfIkoxKjYwXS3WeE8nuOLQgY1xw4Aj'+
    'bIvnkDKcc9kKDy6NGQ9Qlnfbfkf+eaWW64s5M5VtjgrpvfDe7t9ci656rIYnojPmOX6w9usXyyu78wnW/WQN1FNPomkDV2/99NrHvvWxgUusff8NWTP5/fF0jk+fG5Ofgsfy08EOecazJya9o5ZcqTC3WUucLO3iglkhNkDAAvZvYP87HeL2hysB1IIEj2sZ/aCno/vV'+
    'Kn+589+2egU88NGoQAdkoNZA56lpIHCDI6xUBOvnvQp+DGDX65UGNdhBcvGFQH4w0AVF2EH07bCFKmRb8972PCJG74UJiyEKZ3jCGrLrht7BHw9dVkI/QEyKQKTBCikIQAm6sGlYzNx+lnhCGlLRg92pUcSaeEYfwnB+yhIiV7zYRRZa8I24yxsZRWjG79nwgzkMYRbJ'+
    'tkBBwjGIzJsjCw9pPyTyC4N6ZCIf2ejHJwJSh2+kowJNOMkp6mb/i0ZsmCZr54d98U+MJdqjIUcZQD9AUY1hZKXxULfK+oHyd0XE5RHB+ENUYq+TteSisP6YRhCu0ZMkHBYtj5nFWxJMlHZ05CnzqDlJBtNY5jsFDET3SmPGcpGzLCQzGfm4m6FCTQCQGydHeUcuFeCd'+
    '71SixOAZzyfRswBrKgAGaqECSJjzFGpzYCuWZk96DvJwnMynQckpx+IAgAm1+EA9WuGBQbbzOr7UG3j4Fp3FncICkOgTKpyAkVasgKPWeSYAw5nQ/6Q0gY8blD0UYFFH1iI5jdAfSnfqUTlEol72qKhLD8pSKyZuowxNpEMdYI/b1JSXgpHnUdMzVI/OIBIKd7CHT3kq'+
    'yypesT+2bKjRAECEckAAmbS76E2lmrrHcLUcgImEDsrBgbYitavKFCeDhPm4QsQgm6gYQ+vQ2kioroaaYyTXWqvqGDy4wQpAucQJKHUKNGxgqh3FqxtXg9dMbKAFN6jBClTikdIuowKgvUELhGPaZQQCADs='
    ,
    battlefield_title: 'data:image/gif;base64,' +
    'R0lGODlhjQAoAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAjQAoAAAH/4AJgoMJBwCHiImKi4yNjo+QkZKTlJJGfpiZmGpLlZ6foKGioJeapn4O'+
    'o6qrrK2NpaeZdK60tbaTsLGYKbe9vre5fnqnUL/Gx6PBAgHDmWTI0NGWpgIAXppoii3b24nc3+Dh4i0A4Yzj3Ifo3ebl6+rg5+EnHYrKAFyaaorNmFiIQHRlQhNQoJ9sZDQRYZRQ1ywADWPNiuhnIUSBDylaVETR1BRE9/Jl2oeIhCk8AA0eLCgQoUKGGA911DTx5UWH'+
    'Mm1yNMjnUEh9ibCcEnGIpS6CKl1m2phopqycODVClTi1IkyDWQD8HJnIzikrRZMajaUUE1NETjFljCn1JlW3Vv8XpdVEYOsmRBxiwTmkxIpfU36tdOn7V1PgLnDPVvUTWPDixojbdoRcVTFcxmhMgbgHBhuiHLokKDKFghHppjpRL71qVq7NtjtXu15NwJSLYAYemBKD'+
    'SKQwTTBGayq96DTa1Mdlx269PC5s1cybW6SjiUawWE0QecVERVMV4ZmIg8ckPjHruNJnM3+ePDr0uNQzWVfppxoACJqAwMlkZryf8ogYV9l5lrFn3oHpqQdfdddp4kUAJWnCgm89JSKghcO9VyByAyZoIIIaHhIfJvOpRMAhLmjCARKaQIBheKZl2B567/nBxI1MfHQZ'+
    'jjke2BGPOn7Y1oh+lJgJH6c4cQj/i5k4EIMmILxIXowwzrihLlwspkmWkgmUJYhWisggNQPgockzAFhBFwyauCDlf1ROGaaCpnw5F5evedlhgkQaiUk113AFgBmZ6AGACW2+CeAhFwqp52Vb+vioo7L1aZcfJO2nFgAiaIKEonHCOWdzdWqZCZ6y3blniABYSg0+QAGA'+
    'JCZuAJBXJmAFKKN/5VFqVg3AAltZsMJ2uRSxNaw6p6uaVOMbpgAY4BkGmoABanG7gqnstsa6NyqrzGbiLFAOaNKfBZ7pWiWvrCbo7py+0rjsmM3CyhW6mfAmgSZ7qSsnu98GzG2eyrULLr3i2nvXrZhYi18mKPkrKsDbaqtt/7fyVjwkwn8qDG2nmXgBQLmaXEuxxfEq'+
    'hvGV3nYYbsfP7qPClgMsYIoBEi8KQKMcoszhygQG3SrH9Xm8T4oqKZBzqL32nLKCFj0NtZjyXbqPDPS5yGi2Swvsc8EdSs0n0eNyZQN9FHR9stgGh+3025WSDUBn/AGAA30YqG3y1y1fTHDfUpuZCQzBENCAKdbyQB8HeuutUQGQQ15Z5JL7napClBcwOeWTU6uJCg16'+
    'BIAPkR5gCuNbr7v3XH7IAOlTlq8X0+uZuM46JhaEnqETkSJgigeNp/4v7ZjYPruBGJuylkDGGySHViqxEdapAPgOZfA7Z8t6828h//cpy+vCvUQuM0CPkX1GZWl9JlEKP/HqBo2v/MCX40R86/cz4dMpfMjhhespod76MNG+7KnOcfEjXvgyljyamKp2kMKDG6xQj0ME'+
    'AgA7'
    ,
    multigifter_title: 'data:image/gif;base64,' +
    'R0lGODlhmwApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAmwApAAAH/4AJgoOCBQCHh4SEiIyNjo+QkZKRITdMRDcdk5ucnZ4ARn6io35ijF6k'+
    'o06frK2QN6midCautbaMobF+IIcYun6rt8Kbub8ow8idxalfh1q/wcnShxK/o3rT2Y7LqRAI1tHawzjWoyTi4tykPS3g6MhOqVJUqS7v2dxYo2hco1x4pMLdc/Vs36FUSAZK44bi1wiAqg61mEhRIsUWiC5OzKixI8aOksiQMgVADykmFi+m9MgSZMuNADyuGHEAVyoB'+
    'fGJhgygqmMhRRA7RIUXj0E9RQQ8BKecHDYCjfpJCgkrS5CiUT0klhZqKztJyTrmSomPUGpgFh7gJKEjKCgCewP/KAhVKVC5SRF+thdUacuQhq6KwQt1qzSvTvb/IZi0XAdRNH7GKwvXJF8DQUUUX31V6WHPUvqOqnrT72XPXvL8Q61IsNpVTtSJi8ZpMOullUZkH4+2s'+
    'OxLVv6M9E06MWpfqWKyZ+rGg9lsqBG8D1qaLefohJVayp8pupYtw0KKq6hmvJ4p1rty7Y9feNrt39Ny9m7YCpp5aADlJHaL93XLd/o2kcgwivU3ll2+VFeiIgIwoSGBl+eF2nxxj7Sddf7f5kVtlAZIyoHUGhgZeaQ4ywuCDcznSW4Y03GcGKWpYGBGG/5UIwIkgPkIV'+
    'AullB8V5HC7oYYNBorgZi/fVZ1D/dDOuWGORBw1pZGkhhudccL3ZGOUoHwJIZIpI3gQAKqOYIWNP1rGYIyI4eqniSFdeBWSKj7RpY292kOLCff2MQsaZcdFYnZtbitKllqSJEWdgc17FxKNTmCglaX48CmltFWyQCgd8kvInk2gKituahfpxKJRfWhmLYAlaw4WkXKYa'+
    'y6umxRJjp34CShmYT9IJq6GySqWjXy0AVmmjs/5qqqyp0NraKHLUhKson/Ln5KA22onqlKLJ2d+zftBa6qm/OGuNGQ+kJWaf1OqaZq+bdRjrlMK+KWJJWLZarrLk6mJuOR84RooAALDrR7UXXjsqoTdOyjC3wHmbpVY1VFwx/7/BWnyxaW7kOQoeAo9CsMEIN1mZmgxr'+
    '66u94UXM6LfbNjwvqd8JkAoJ0x7srqga0qxyvMPeayyrKSL6M5XBUifhup7urHDPKTuMqGfdvjzxyhjTG/SRROVccqhPb4i1zMBqjaDQ+RYd89H1vouZ106fDC/SbEodM9UuHwvz2OMmzXJpYQ5ccNOgBhq2z3bznWjeRG9mdOJAmx24yIPnWviuXGOLKtsjVq331ZFn'+
    'TXPYcF/u9sLZQk53I7/hK7G+odc9M8OkM225tXJrPjbnZ7fsutWwry572aPnvrTgJMfNq+6x815lKYwj2/bwy5rNuvEals6fPqO4hZ+UgxUgvtD4fVv/CFt+xGhz2o6vrToR45PPc4u2t2s6AEyk8gE5pHhAaSoyIFv1aIYIKaTCCej7XPCmV77/jSI5yzse5ZJ3Pxko'+
    'RwEOHEUAnfcIJSincSRy3+zABcHMSVAUIyMcfxzAlDJMKRYbfJ8kQPBB6UXiaF05Xfbqp7P7AYAI5YDACwEowH4JjxFd0MUZyATC4cSugbV6oA7phzwVXugQMYCLKMaQriGSIoYjvNshopAKOcQEeGpTHA4rNL9pbKAFN6jBChqgkE0cYAUVG0EdxREIADs='
    ,
    collectallcities_title: 'data:image/gif;base64,' +
    'R0lGODlh4wApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA4wApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKTlJQJl5eVmpqFh4mboKGTN36lpn50'+
    'JqKrrK2bJqd+VK6hpLGoqrS6kUa3pyi7wcKbUrFuw5K9vqXAyMESy6Z6ztTVAGq3ENaL0NF+09utON6lJOHnrQq+Lejj5ObooU6xUlSxLvH5myq+Uujzp+rd07dJyyk0gmIhIcgw0hRfcNAZNIUQgMKGlMicEiNIzykmjE5U4WKGjJYbDRi1WMnSEcuWjV7KXBlyZMmT'+
    'KQXN3ClJzDIGg2a6lKlJoymOADyaAglA6E6nRJs+pbloBRYxaMAsuTDIaCmkSksxFYRmGZBFXv0QcZR2baO0sf/oLCrr6ywAIOQqQgobCx6AtmxPuc24seNHQYDxekMI+G80uYI8LGOaFuxhQWe8sUMsOLCpwWgfD8ocjZ3iaHodQThl59Rmx589lwItqbLhpZxjn17G'+
    'uDNsX5BXR1trO+llEeQg/1Yrm/lb0QCQe5O721fqRrBMKSsFpatvRo0JH70tNvfsu3mXu4V7CvLEaASK82UKhZwfDOadg/8eehnk+uRgUN0t1zGywim7IaVec7RFIt9liaXXGHumQEZHLHz5QcKDuAFQjClkANCNKfCE1995z51ixYpWdCHIh6WEOGI5SrAYC4suQqLE'+
    'L+15F1uKKIr3FXl+UNZZjSveuKL/ixMquSQAAtxjQCwwFCcHHFjCYYUgXpyyEAB4nILPgkDqd6KZg3RpypdhmjJmQr9Q8p4fGrRmigH5NUimkH4gdWWWW+4JpynN5GkoIwT0BYCdpchQ3CONXWgKDYfu96OlQZ7plqSlUDpILIVGgo0pErBxigWValpUYZCYaFGcPqLo'+
    'KgCJnmIOo344yiqkvnHqh6ezChormof66umgzFDSZikK+ERiqsPqyet4rfL3KqGqCkurorjqSu20KBoL7bjakinup7BGUqspAswJA7nBgtung9aCmm2wsaiw6CneDlntj+cGK7C1xZ5y7LXJSjIjHwDY4ya8BP/rr7y02Rst/7m45rCvKf3OK7FzAUc88EdMlDxFwZMu'+
    'YnEkHLAGAEClfDlyprXtyiAjK5MJV8kmC+JsKXIVILTQyyl4MwAhX5otprdwcegSQEQNxME5P5JdKREhccos5cbbnNFlVpyuztE4DcARsWxRJthMb2owxEoPG4vZXqOLrSQynMIGAEScAgbcNNP77dF2J3wohaWYrU4sTjDNdrZJB9512eTiPPYjOpxiBt8HAU7sx49f'+
    'rPLYTS5jNnqx5Jhf6Ch36rmeiPtBd8SW3x0J2qb87U4pcry+6uBh12442aYvgsUtCj56dOSfz6xWDdBDX/notkPCxClO03AKOM5L+7XgNOdc+v9s0Uu/iJqnfLG6IBu0737rv/oe/PyRVO2Iw6VgAUDepwgwedzg85j73ics8fmmbgCwwi1WUDQiGQlgb/uf5LoniAZY'+
    '0ILC80OoHjGnWbggFgiQ4OfkZZkOucqAP0IgAKoQi95xqDzmiiAF6Qe5CCJLg5MAwym6w4JYaGOGfCohDE9IugPSjhFyiIUFXlgk+AFLZFAEYAxTVjgcSsIMh0GBEkXovbU5EFoolFXEVkBGMgKABPli4gPDJcMoTtCNILMhwqwoKoVo7RQa4OLv/DUfMBYxhQRbVzkE'+
    'mSs1OlF+bVueHO3XCDjYBwR6rIQhC/hHMQKQkObgS8eE2MQpui7/komc37luuEFH+GoZ5gDiJCZJxOqNj1iY3FijWNmrNkpRlaIb5RxL2YhlRQMYuAwgJ9eIpjA6Z1ax7BYtIUjFYEZSl4xkRIZ8oS9nkvCLlHSlES/JLX4tk43NhCPsxCkIaF7OEXwQTA5aEAsWgHKV'+
    'rOpjNof3ygYlk1/HM4UaoBQLIwgin6UIVDrv1pahEU09Bi1AnhL6TxUJYqDDiyb1zqOBgRTUoAvFKCQA6od9RukU/pwnHYk3G4YSUhW+lMGOTuGEOfmBgQC43ik+sLtSeCA/t5DBcnK60x7FNBY0jcVNq8jLRXw0NhXlV0+VGrtc6YhxLoVpK+m5TeA89CMg/mjnB8kx'+
    'VP55QwE4jYVOmzpW6Hg1GmAlqiSOSlGxLpVjb20UJLbqjaFOdaSvjIsgsOgNDCwuGr0ThAPIUQa5uZWscYXMYL1R2ImO1BFsZU5S4YpYxD7ir8sIrEhDlVef5sAbxwBA5qLBgUX0LRraCCtTvVFW/wzitMtIrVrVFYu1TNZ1lWVtJEa7jNL6UZuAdK0g3BCNDQziBKf0'+
    'AxqMy4gY+LIUY3jAmXiaW+EKwrm3iG4jJCoIQto2FpSq7jJ0GgnkEoi5v6VqcK06CBbGAg1cYUQFWnCDG7QgApHYAH1rsIKcYIR9++3vf6sx3/red8CLKMAJZpCDF1RgEYEAADs='
    ,
    inventoryanalizer_title: 'data:image/gif;base64,' +
    'R0lGODlh7gApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA7gApAAAH/4AJgoMAhYaHiImKi4yNjo+QkZKOg4KTl5iZmolGfp6eApuio6SlkSaf'+
    'nlSmrK2RnamhrrO0tYlSqX5utrytsJ+yvcLDmWq5fhDEype/oMvP0IgKx34t0deKzX7B2N28KtRS3t7a3OPnrFPUcOjX5QAt8fGG8vPw9db38oX4/fz19ADq6yew0IkqXMyQ0XKjASKCK0YcOORvYL5GYqj5YRBw3z+PFAt2BBlSIEGAJz1ClHjoHZlUXwrRSUUDAJBU'+
    'XAAgyOUBwEuNdAr99BQTwMxPNW9q9ITGEBqNQA4NPQZmQaEmqbwU4ulIj0YShqYWPeqp5iGvn7AgmkpEEVsAIv+W+sk5NVdQn0urFnKZq4xRmjZx6uRaN9Xdun7J+kkq109TAGfkXiycKwIAHqnAbE3VkxGEVHZSTe77F+khErnwrE3VNtHbuEvpLj3c2DLfXEIUM/6k'+
    'dSdnvECFHssNWOnSprBnh23cVEcqMZs/cWiE6lMzKMtx6z6E5ZgIqazdhk9OTXZw4McB3JZb80fWwammU/ZEu/Hu9FAa+8EgvLEFG6mYAYAAufDHyAqpGOcHdP2xd0houVgB3ietrUYhXHKZR019clmw3lI1OccbfJ9ogJ4nVqRoRRcNggiAEipGmCKLuHxCBgAS5ALW'+
    'iX5YAUYuLsCQSlMEpkJBI0qkgoL/Ydk5WAgH60zoSYVS+tGWCCqmmIuGKKrIIo8+AvmhRjXh8J5vn/D3lmv6mWVILigc4kUqSBSCRyoutNgaHzQt+Qk7BuTiQCNapKIBhJ4Y0CKZhuSgkQRNWinehYgEmooQJ1IZ6Z40jUlNTQB+otk0RmY6qZNvKllla9uZWlpZIIAG'+
    'AKmfKMqIMZ9IwEYqFiz6qSFcfIKWJzBseqqkiFT3CQiuWjilTJ3mEspUNeZSkwyZzZpLMms660e1gB0C56rQmuaqbhTkAsBnn/DhyJ2fKJDRJztS+2shiFKRShXGsknpIU+o2yy5ry72IRFDHFOTC88BwEAuHHW7asLWIjJu/7+trqmbpfGm+2cjBEhb6CfFZkpxuOx6'+
    'AgQcnwio57GaAmBGtgNjHG0smXJsGjifQPdwKopKvKnOZVmsqs3mromoH3kujUGsPTeSY7sA6PtJnjkrXAhqn7AQrCfuvuzvs4cQHVXNYi/twsEAdAeYsn7c6IC0PDJhNxNTvOy2ual+EifSRWdawQa5TDez3yykIg4jUH5iBwBO0Kl3xQAwLB0SqSSDds1w+8Fs3Xfn'+
    'LTjh8bHtp2kepCJ3Knr4+klOpp4eeN+e/C12xo2pUYgVqdgQqidPUJcKO5h/skrslBfviQMxpPK50GIbEnkqkW7peiq6s924aRgMiWMqclw/1//L288eXe0E476UHBMB4N4nU4Bb8iLYfsIGAETQ/Fb5i+2eCgFCulr0CGaIw3lCK+KD3Xw8wT710O0tRKtJyvygO495'+
    '4n48EoypImg0v6UvXAs0wwMMATcvjMwTJmKEiDwhoPx94jEQpJwBWwc3rEFvYCFLRQ+qp8EQjtCBOFtTxWilCwB0z0YJFBvlaOcH250LhI35QCF+xsBdfYIAjThCtsz0ifC5inIsow+GPlGnzUmMa5/oTAZfJz5PSJFtAIBX4MAHgPKpJVM1yGMexSbH/onraLeDYirc'+
    'sDTVFMINGnkMI5ggGBqwjo/h4pMndlE+CZkxPIZYgsD0pMc98oj/kKlQDRxbhSjVkIcJAwScH5noRI0J8llFolch8kMNSzLCap5QS/2A8UTT6KwpR/SEZi75rxMhMJUvi6UnSDDKcOHKD+6SXROQ2UvzAeBigUwaJlvFs2OowBEn9MMqLPcJBFSzf3NrGQAs4D1ikg0A'+
    'OfxEDgj4QaQ001xzumIAA3dDV/LtfE2sJz+3GS5lAs0RP/oEdhKXuXPWhJ1Rm5on2OFOZAEAjZ6YTr+8xaqb8dKfgaPl8hz1CRNQE6SrBGgrCapNSrWqbceAXSMM6AdUys4PvUJpTcqnmQkasp+YBEASUhG2jQrUYA9kaeCSlCYXesJAQHVpuFh5VLPo1BAj/zjGCR7x'+
    'TE8gQXkodOgYDwiAdH7ipEGdikzRKlV7JrWtgSNnE3HpB1tFlWwvVWlVs2m+YXkCi44Io1yYddVuzmUAC8hF0IJKMIPagKMwK1dZ7hk4DaQCB0PxYkU7+s9rAlKsoC3E9DyhBUgo5itilatGFLDZQpDHDxo1qippQFk/6uwJiJLpXZGVV896cLZ8Telo/VDaR/RRI3G6'+
    '6i6Xwi3G9qsZrYPs2HjrUWdctRDPnMrZWlswN+kVuKGFXCqK2xX9fPOqv1vKkXbbmnmRdroxc2ht3SRSHck2uN71LfrAe13RjhcSkpxSDlqQCxaIlYtyUZNzk5mLGcA3st2dr/8hUqARwGaqABjGMH47uN9C7K1HhQhwQMM7XPI2IhdtsSyexIqZxsiHNRnWsKleW4EY'+
    'F+DCMcavhKdIDQaJj0PU7Sw2AcDIVHwAwZ7oTH/F+wkTL8KgKc6FDMTqA8EcoHBr/MSU3+LU8mTZD0Dm7GTfitepyuwY8+ThJ8Is2ZTqd8SFWO5qNyy9/zoCygBQsZbFOtycoCnJX/bDlsOjoJh+mc0RJnOQzbeDY0BKzWIM75udaFaN+IXO/m3yI/CsZ08MGq79U5Cf'+
    'c0FYuXz6WYW23gIRrZsdF0KiTPGWXTD9XUN0+RiaI7GdQYbiPFfsqqImkSdKvZRTSyrVglm1jhU9LWY3dzUIsmaSpIdciBgc1w9j+CGtS/yIeD6r0/0DtmD+7LlAG7styGajsiXdjlZsoAU3qMEKHNLuekMjEAA7'
    ,
    newshelper_title: 'data:image/gif;base64,' +
    'R0lGODlhnAApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAnAApAAAH/4AJgoIAhYODhYmKi4yNjo+QioeEAJMJkZiZmpuLRn6ffliFVqB+cJyo'+
    'qY2epQIApKCnqrO0j6ygRK+lsrW9kbefrrCfvL7GqcCfGMOmx86dpX7Cu8/Vmcl+bMzF1r7J07Hd4qvR5c3j3tHgxOjtANjl3O6o37rh8+Lw0bIt/f7/LQAADCjwX6GBilZgEYMGzJILmOptOzjQYEGLiyqe6MCoosWKK0YcUKSPGgAy5j7RAQCkFBcACKJpAKDEZSEP'+
    'KZn8UmeP3cmUflb+xNUIZcopioyaE6q0HJgFhZLpiFeoabSVLUG9jFlqZk2tACAA9ZPLFs+JQ5dWLVV2kdVofP8SvQXFdKyfCO/U4dm3NiXWUl5gyqRpU4tdAmZb9Tw3V2XfT22T2s3yuFzdsWjytprCN61lAD8AC+5KGJQWAHSi6YlGIjGodYyBXoZc1K4fxI2DVk5p'+
    '4RuKzlatCLfSBcBUUIG5gvJaCouAaC4MRIPhOthiWcGHF/ccWW40K2iigfDsZzjx3VbAQP+m3GfT7gBwiG7vhzkoKwRYA7BTSkZ1addVBh93tRGVXykuEMjIe4XwUQoN9fB3D4OL2DDfYF99IsWBoLQm4Sf+OZKMEhm6x1aBtC14ImoPKujWiqmBAiFPaphEoSIylALG'+
    'aMsBwEQpTnD4iYf9/WcOdiu+SJT/ikvG+AkNLkrW5IP1eGFjkom4UIoYPH4ykxOlKAFANCrsV6SItiG5pJIpsklWIU76AeWNUqYY54yKGTYhloWosGWX9QEAJlEf+pGDmaCESI5darZZ55tM2tkind4tWagL9WBxZSlMdMoEUiaUQgagM0FRChAAiFHKSgW02iokJe3J'+
    'qadIRVmppDKS5+mnAlawQTQcSLSpOS/hBMqo9JVaCg4AHBHNFpskQ8MNaOX2kq0CwjkpUNfm9okamr0WIHk2YVCKGaQCIEUp1ClQjhOaCCsrsdlGCulqoFBn7W7RyDGSvCam9JJYoGTmbikcAEBFKWWyVM52OylWLbf1uklE/wcwRGMCuWBx/IkZD0R11rDlvHTwJwYD'+
    'u5gIiWgaDZcRizuxwBU/mpIEHvvRrV0fhGvdzJDVILTQhZTCBgAMROMBAHoqo4iV0XwR888kEzE00djm/K2AV9ewmxuF4uEzgEBDusiHpxAMCstQf+LAIsx8sgKsI89r9qMDeuvHeFkz+FwpJAAc25qK1OgYBfqpCgpii1TRL90SV43i3beaA2XNlZd1p+CNUl5I22Jr'+
    'QCYAZoBihyNyRGPBf7B1njefu5HhBRUqFID35JpTWXfAjiZiKigAiAAdAG4UXMgKyCMPAAmjoxm53a8TnvkjlNa7+e6D915IiQr4WYoNiIYCgP+QfpBAvqKMcI75+lmzT+H1z/PuOQBagkJBjqXU8LeG4+uHL4isG1f1+ga76dkrdzJSX9ZE1yFncUoC7Oof4MLnB/RB'+
    'I37Zm98AB+g+GOkOg65rhHRktDAdCa9H5CNSogJYtuhpr30EnFICsRfCRhjOD1Rgwye48Ak+rKAUhUghBS1IEhp2UHrsOyKunqRADv7ODze8xQ1hJsRCETERTSzgBguoREjBT2ZVc9WrCpECc5irHEUIosYAsJcVOg+M0BOj7bgjxyTSUYzW+yAc5XeVRCStHADQodIS'+
    '4SBQMAEE0WABC0nWR635h4M5m40X9Ug1uzWyEKUTlbqiIbZEZBKAKBhYpCVXxa8iQTI3kkQgE40YSUXsIBrwOkE0RJGIHIzFDZDbYwYb6a1HcrGVCvpiJflIykRAsBQso09rFFG8lGwgl8PcZTF7CUNU5nGGICylYwoHik6mRQ+NcFw00AARaJKNkdMciy+RWDleejBX'+
    '+NBEAU4wgxy8oALxzGcqAgEAOw=='
    ,
    craftmanager_title: 'data:image/gif;base64,' +
    'R0lGODlhvQApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAvQApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKMCZWWlQWUl5aTnZ6foKGLN36lpn50'+
    'JqKrrJBGp6Zii16wpU6tuLm6r7WmKLrAoLy1IIIYvX63wcvMjhLIpnrN043DsF+CWsjK1N26ONCmJN7U1rAQCNDc5OyhTrBSVLAu7czmpz0t6vX8ntqmaATBQtIPmDksALmY4oLn1LqCEBeROSULgJ5TTAS12MixxYoRBx51bNFopMmTJl3BQoFsRENTD0eW7DhIJiOb'+
    'jkJE8WLGDBcbC26i3KjR5MeQgybGEnTRVEYASnuBCcqoaSksjKLWogMknJ+Aj8wJ4FNL2ktbVU9hlXgKGwA6p/9opDW1lpEZZDzYIqMjSCusqX0pMsUYOFyERSRg4ckKjatXsI7E/jtlBcDZZIgVMz5V5m3czKcWM0ITTm7hXnyhej2staJVP0/91oIMACEsEXpRdw1H'+
    'm5FYH7XkXl5n+xTupLWEwDVlWlBxU8cFlfAqWvXe08gCth7sFDsyC4Ps1KqMfO9uaL0XiRVBzLLDReJhkffeqzmA+JQXMVFciwN9U6nJVosF21lEmHWmWAHGPIJw0AscuZVixYRWdKEEhfJN2IVKpwiQDiwIuAfTIA7WAmF5pZH44CILmkIGAA3AwoJ3FFZIY4umuFCg'+
    'HHD0CAd5WhEhCFnMCZIDMhKg6If/kI+sNIlYABBpiiDDDXJkL0n+B0tzV9aSJYJ+9MBdKfSAyeRmpTAppR80FPhIkIIsV4ppCpXyGgxKntmIk5JAKccpqVUpSJ1+3KkkMs0Raih2PozpR5lwNhKpnGy66cikn91nijymVJEnJHxGAuVdpqhB5XuC4MdpKZ5iJ0V94W16'+
    'SqtgNmpgjtjp+alnzFkq6SlMUioXBKcAAYcpZuzqSKgcmiIAADh+deqIABBrirHI5jlEcIJYWwq2pSTLqKOQAnupubzO6SuaS6Z6Cj2JmcICoXwou+cpv/QJy7O0ZCsiWgDEW8q8ptSbqwHcBnwKwaUYXKsgUzghsRPlmqJr/67u5rhuhERUsAEs/rlwCgdInAKBd0yk'+
    'zMQUizAb1r4AEOrHi/9iBoDIppBsMsbPsSkIzqXobMrJD0Pil8or5+oxyBsfWoupAJRsigMxnFIMmLBw0TK+T8IsM82CSl0K1VZjzFKmYvtBtilXa9VoDnDH7fRCWpYKZkVvhiMHUlacQgAM79at9SAuR+b1KWCj2rcpfwduJgAlFgnA4qU0juvDxzouYCmDb17K3ndH'+
    '4rkZDwxCaqEAmKA5NIMLxLW+HcaM+LQAny6N6pfDiXCmtqe+uimNZp4763WTjh3e54bzgSDC88WeKQRhfUrrABRezeEu0m5z8wA8X0r0kW7JPP+A3Z8C/inBMyg93eufsnzT3rmBnx+iSekG5PmZWcP++2/tS9ex+5r2lGE//CUIYzUzTQEj5wcgoQ8AwiNTrvjXP6zJ'+
    'LzShA8AGNshBjAkAFiTYXSkCcgxTgAGBy3qdqLBXisSNSITSKmEpTvi4dPkMhiQ8BQ3dBoAqqC9S7BLSB09BggK9JjboEpYDTpEsC5wCLEC81/9g5yzZZa9mt1hitpwIEAQKCwBaDBcAuDjCcd1KgjUMYpziYsQDYYo5ZPSDLJ5hihNFkRHW8w0LZzbAMQqGjqWwYxI/'+
    'E8c5nkKQwCMXCjm2xl4J5oyw8WJcGHhCb9FvkXhUYbNK8SwBYtH/gDOsFgZr+EVKitIUouEhJCuWpuS10oZteuQRJckc7/nBC2CEBSb9V4p8rTCAs/ukLXEZxlLQck7lMwUxdVm017CyXb+yWCPVJUs3DpI5KpjeABYACwOkUYq9BGAVPVmlbC5km90k5WfMyTl0nsKb'+
    'qnTmLtXpyKVAEonShCXQoKGAb2Zyir8cZzCrtE9k9PONyCxoLw76wFXOE6GVqmZ36DknGXjFDye7Iy/94MtN+qGTA32PRb2S0Wsic6ThKGkiHerPY0bUnrOkKJtscFEKtJRwmnwZMK9YJZp6xaYQlYtPwwHUhsrzpkFt40SDCg6vYOCmrgOoR0HK0/c0NRxP/w0qAK4K'+
    'jawa9XevVCMsn2OqIZrCCC6lAQ8u6h+N4lSqOhVoVUe0Vq+01aQ+q2s4/COGU0AhqmgMUgEGO9i0KgEWTphMKVaQVuDQ7QAgg2r1cmq4nbawj47lHAAgOzKZyiWzftAaZ3MGgFWVIgMoDWxj0qrQWnggre+g24dM8Vq3Apaj4uSkFS/7ydhqdralqC1e5eLb0AIAuH54'+
    'bRQu+kxYBGi4CvCKHHYlrPMYF7nFsO1k4VpZufK2StbVGnY9C4DwHhcWxRAYNJoLqLQCQAd7pW5czDte7eZRPXt0IVroi17y8rdsADjdE4d3HfIC4ASUGuEGGAnL/7JNsvcdBDaUyPkeB5ciu8Mt7/TOC2BowWJDf3pU3Z6bzy8OogItuMENWnCYiLj4xZCYwAtyEIMW'+
    'c6IZgQAAOw=='
    ,
    mafiawiper_title: 'data:image/gif;base64,' +
    'R0lGODlhmQAoAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAmQAoAAAH/4AJgoOCBQCHh4SEiIyNjo+QkZKOigmJi5eDk5ucnYdGfqGifmKMXqOi'+
    'Tp6rrJECqEYACKgUADi0rbmdoKihIIcYvaGqusWer6Oxs6O1t8zG0I68vV+HWsJ+xNHbj7CyuM6itdzR070Qy8La5OyoSN/POrjsxuaoPS3Y2fT07vDiAOQ946fLHhZRaLiI4oJn1DqC0PiMepcuVC2BoiBAzGUPBbYRDVM1akGSpKOSKFECSNlipEpOekYp+WcRAA9U'+
    'DlamPMSyxYkOJ3uW5MlyxYgDjOwJkIhKD4CQwxrFFIWlERl9dABcFUVE6qiqm6D6mVnRT62boxhoHdV1LbYpjP+2CsvqVhiYBZ9QCbiGyspTh4xIoMJjFWtdP20PCR5FeJMdmTTN2kSl4HBbucL4IMKMii7nXhEAKPXRi8ZfkYgOohIR1zDmxABUj2I9Sc4oJpFrkR5l'+
    'wPKhz6iy/DZ8WBga0XpF9Poldt3jvq2xZX3N6Pkov5PYAC5bi4le38WFEQgvyrM+URaUlvWD4HTUQxyEwYkuyop9K13AA4jfa/4kNKNAkRsAQqAyHFcH1gfgKL9wdh9+CYZiBRiouKAUAEyJckhziOSAjQSbseUIdYd4KAyIkmAmxYBEjOIUeNQRUKF+9CF2SIZ+0HCh'+
    'beVtCNghCoUyVSgwhIhgYUcCEKT/H0P6UaQkp4iyIncAtNgjjCICQMcoppGIZChtbSmKjt+ZMYoaPqIGgHVUjFKFkWCOmOWaorQpypuSyOaHX1QiMQobEV6WpZihdDlnjWFyeSGFCKX5HgSjAAGHKGbAaeOXl0IqiqSUTgLFKFoM6F2nWB5JaI40WpromBdGGUql7u0D'+
    'wGKhsLCkZoHKeSStftgqCq6RKDEKFwAogIoFADgxihe5gneqoUkieoh1flj43ZJ+kOGorC6MwoGfGUXoBxPkMgEXid2K8u0oGkUyaihgAMAAKhgAIMUoVDRL4rPFlWtuoBVsgAoHF2KrbazEgBuKAzEwKO6w4CnsB8MORxJO/7byoqIBAFbcpu+gXJIXCrEii4JmwaMc'+
    'zCHHoxAAwyguPLwQeB2L4jLMkqQbCpoODKzkKE98fGSTRQI3ssyiyIEUyqKo/KOZQgJgAs4lE0si1ExKTTUkvLoBgASo/MJoKDgIDWYHL49iQtVI+2HGA3mNIsDPTW9LzKShZKWcKO+wTSLefug9kSQajCIHAMGofVjMpZ4HotF+kAx5KB8gJzfdoTiNWoZe8ydhoDWE'+
    'Hjp4nO93nSQ9i+KU56HErJ0otJE4uR9oWib66MW5QS1hTGduNwAGjHJc4vA2K23wjRLvR7yuGLj3mADwGAqyjWPzS6q5IiMKCb1jjDAAqb8KgP8FwhuvKvijVEp+o5KcaoDOoegQa3vVl3a+rnFqqei1Kf++fiilAJso/OOl8/2PFF8bhX8igbWJwW8fjLkfZ8jgBSqo'+
    'wBD3w9SqCtU9zUWFdfHSVCgaU8BcgRAAIvRDYyJRs1BoQGJ+0MK82Fc92GjwEfva3+UM9rvn+YFZ4QuF+XLlQyAaSBLmIIGeaHdA7NQwEiVs1rM6+DsVDGsAC0BFb6JIHSsuBItalETaWic92AFNgoe6If4uNUX+1e17DxRGZbgoojj2ojKR8KENhCEsUTzpiZCIorN0'+
    'KIq58fB7MjhPKDRCRwQlUpHtgkQQpVcGUbzLDxsz26VwmEYpEjL/FIbs3/f2qMhaNDJOpDzPOCJBLb5hYzyatKG01rjBHFHxexfDRr1OaaNcCqNeUPqlMACFxmipUY1t3KEoOYSW83AAe9Rppj6eKYlLauh1AZqlIANVgG5205OscqPvvrebox3AZ7zsSjkjB4BzemsS'+
    'U0NFpew0ChRos5OW6gw4OShO73FIWTMriwegKSKAHk2gk0DeKFb0gl6gKJZQJE4Ow6nMN3IICBArS4M6SR2MBjRsm2hgtUxnODVus2TmMdUn/RBKiwLGowcFaToBAFN2anQT1uwNnUQhoHsas0b6HCRFC4k5f740ozLlqIhqSqybTqKIiLiXKFri0/xxUjr7BMxRIAAA'+
    'Ow=='
    ,
    freegiftscenter_title: 'data:image/gif;base64,' +
    'R0lGODlh2wApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA2wApAAAH/4AJgoOEggCHiImKi4yNjo8hN0xENx2Pl5iZmoqRk5WboKGijkZ+pqeo'+
    'fj6jrJk3qaZ0Jq20oq+wsrW6uwClsKirvLq+v34owsiJxL/Hyc6Yy7/Bz6ESxad61LzW137Z2uDK3arhmzjjfiTlrefj6uva0Xrz9NPwjk6pUlSpLvei+VDt6/fvWTQBBTdpQYXmUCokCRUydIgKYkRhBxm12MixxYoRBxR1HLnxEMmRj8igEnNIDyomJlECOEmzZqIV'+
    'WMSgAbPkAiaVp1gCcHkK5syaLWJyRCQT6VKnSjt+DIko4yKgv8AsQIQV16GuqeikXNny5VdURM4WowNkXEMAHv+KGXXUVShRU0bBohILoOuXQ3RQ0QDQtltDvaf4Ijal9ZBVRYtPRVD7S/E1vo3qli1K2U/avpcLX2sIodvnzGSHmgW9trOfMgACnxosutjhy65hTX6c'+
    'KLKpt5Ett6ab+q6fvGhzJ679q+HCbgSIB92MV3ms3EJkm6LtlnVl66ca8uaKzoJ3r+fDjp2umvP5z8GZw2qo3ZTxdNJN2V0dHPxswt31l94vFoznmhVgEASWFQxa0cWBDT6Ynx920aNHFJ3Bl0qDDirR4IYMdiFAPwakAsOE+7m3YIT+bQeAhwyC6GB6HEq4YIKouGDg'+
    'e4fwIRiPVyWniWYTanjKaYuk0gz/AASkoo4dqMiA4iFywGElHFZkyIhvLiaiZG9CQiakj7NFo8SZaIIAZH2DdYUkeUduQiRqcQLJyJeHNInKk1FOWeSW6AzmJSpL2glmnWxGA4uabgL2Y6NB1plJXQhwyCAUWhqqCJ5MOgkAlKdISad+65nyZmdS/CIoIpxqmmmi4zAq'+
    'JJuu1joqhQjAglydkN5J6KCnqPBpn7cKdeup7w0By6oUnVJor4ea6miZsQIJqin+QAuntEOulGsqu3KrLbCmFHqtHzkMG6qfxwJ6ZImpMAtAq+Nam6Oiqch6ZAUbpMJBekwEzMQUrgk8cKm46popWAYTzOqviIixFwAFVFwx/8LGuluUwA43ikW8m0JcMMcZ8utvNDTc'+
    'oLLKLaoBHhcvY/wtf0JGBvPDziZyRCpbyJnaranc3CgKIJNrTLSwCD2Oyzv6JgdVNsc8ZQvGheuZ1M2Wm4gCsDjRLXtAo6J0nBwUjbPW2ybt39O9pIJQpL+Y8UDaQWOtMYXUHbfwNTdnfXQi8kl4yZx3180jvP8Z/Szf4MntmNuFw/KB1FH7WfXexfQ9r8iIfJxKxsUi'+
    'bDikZvu9eOYtTt50Km6ci0eGNcQeO+yy14Bx3lYbaWrttp/9tyJewPLX7UXynikePyqONBHGp9c6Kq+vHueIe9Zab+jtVQfk9ZvnzIgVsKxA/P8G5JefqZiIJu/76dyiLy31p5AgPbe01ss93Hhnr/f2YSbJuSJVSIUciHc5681KfaZb3t0+AytUvM19V4vNo/qXNmRh'+
    'r4CQ4l6rFiGHVJjngjSTlAIlmLj1jRCCDBTM/CJYPwqe7yfFCaG4XGhCRKzghjcEAAlSISwQqoiGkKKV8iq4wGltZ4Up/I/9aOhD7WWQid1DW6f2pKd1NXF/S0xfCRNIRPwl8YiQ86IR/dAmIEIRfylyYs2gyKkqmkIdxhHV3dKIRTNqsUs1fGEXG3iKB46whSLs4qRi'+
    '+ENesVFkbsTPueSIRtzp8VUIjOLvDHhHMiJxjGUM5CMtJ8MIahD/kZ5aJCcL2b4/RpJedqSfCsOIQkxSspSDI6QaDanJPCaST1acoyNfycJTci6LqqSWA4tIQhcBM4KDZA8G11hLLk4xfuoyBSMhSMfcEVOIeeTlFy3JSlMqES0Wu9h7wlmARzzHFC6D3yxn2ExJLimR'+
    's0BeLhfhOXQCQJ1+MEKGyAnJLbpzefxc0yqHKcZiknFAiQEPZhiRKlQ44Zzr9OQhvdejl4AgFSxwhBJS8dBUiA+h1xGoP1E5nCAOtI/XnGBJcaNRdFjTVv9EhBnGgQFHuAAdHlBoP/HoTJD6QTjBBCNBW2nQTH7HpwtdxEXH8dJPUhQAOeiGGx7BtW4MUKcieuVpTLFq'+
    'UmGitKCAPKqAHNGFX5wheHWkJSyHiAg3XGMDl9BBN/7F1QOO9Jcs7apQv0rUsKJnrI6IggBnElHdIdN/Tz1EAFOBBp9g4gT1+Q1c6TaxrB6UrUjd6WUvwooDrCB2I7hIAU4wgxy8oAKhqEALVNaCyXA2GYEAADs='
    ,
    operationscenter_title: 'data:image/gif;base64,' +
    'R0lGODlh6AApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'+
    'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'+
    'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA6AApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKTlJWWl4+Fh4mYnZ6fgzd+o6R+dCag'+
    'qaqrrKmipaOnrbOgRrCwKLS6u7yYtrekub3DjRLApXrEysu6xsejyczEOM+kJNLY2ZfU1X7X2rpOsFJUsC7g6OmL4qXk5uqtWqVogrBI8PjZ8qT0APb5qsiUEiNITykmglooXNjihCJGDCMqTChxxYgDjyIuksgRgERGJ6pwMUNGy40GEBkO0shoBRYxaMAsuTBJICmC'+
    'AAySQuiR40KKP4FO7OnzZ9GhHC1iHGRzFE6do3g2vTVl0VRYdARdLQVmQSOofrAMAtKN3lQii9AcA2K11BdBdP9K0Rjk4RhPSFOfHtT6LCuAqW8BxCU1l2w1s335Huuq2GnBvX+r8WGaOHK1CItIwMIztqzlUWgFnanWgnKpMoLlCoJQLfSjvI93Nr7l9yrqwaMKe95K'+
    'qnY3zLBzQuZdKstsrMdv9ROE5ZYIQYafISYVWkQ3v59JCcHtZy6Afc8I4B0YO2ry3sm3q45+bDow34ez65Wd/Zh44qbOw7IwyM4tK9DtVkpoUHTjBwb6qZYaMrB840hwYElVGX6EAcAeMO7RliApFkA4HCxWqFUKCPVZYaIVXRxnBRjvAMABMHAIosSJIJqY4lmCSFEK'+
    'GQA4Y82GuQEggDkGwALDeDeV54f/hKWciCKQ3QEwo4k1PnmVkymWyGIpLnhIH44EvINjI2PyoWAOx0jACC5tUSeIF6XcAwAeXEI5V5ilXOMfKTIg6RgAcsAhKBwAZudam9V4NwibpoH24ICCmEmYl+YZCpdqYzIyJnfecUEKWEcuwuhsoW2qIIVB4vnjnqP0+Rp5fvpx'+
    'aKPPKFpPKcKQ+qibC+ZG6ZK69hplpojKemmFALBaDilVrIlrsaVCKqx3U+l4y50NJluKq7v++SqvmrYDjK3+PEvrrMFy+iuTjk5rKZnScgoAa6QAAQcpZjgbDLTpnjrgENfeSooK2vIZK07fthsudQDDQu6o7y7crrqwRthv/4XEnisIq36coxkpLHg6ymSimhusqcie'+
    'VaTDG5eSQ8GtHhxJxqSurOCiJkfML8wdr3txkFcxITQTVRlawQawcACAC6VwgEQpEJS8r8bvymtpcwqKUUpWBXTd9cywJhzV0EXjiDWyOE993NBEk3p00j5XjekzXACphiBPk+JADCNKPUqu76IcpKUosAzAEbBsYUlwYsNSN+GGp/13sY7bLZ+S7BorHClH4vc4hXIs'+
    'ZUUpBMBQp+R+AD6m4FFa+qKCCtziRCWMd3vL55C+jrbAk9NaeX2whH755pWe1YHppaDieYJmPDCIGZ8CYMLpvKe+M+vUQmrz4BbekqUktcN7DP/ubm7fOuqq082888NbDPwtai7/fikfCHJvLABYR4qc1afPK/bBihwAzpYk8IXNdr8bkwDLpbb5+YF8z6hf3FB1N0PV'+
    '4IIXPI4bOMYZAEjKD25wUZP8Zj2qAfBddNodAOAEi8DILFZEwGAGUXiz/kFLhjXQIAfb96FqkEhnGhtSnrZHDwxwhYT+a9cJT7iI0cFiBWAr4AamSMVgSUxzVkPfzq6IFiFaY4KJohoXj5UbB5QiXxaYBxKvFy9/8SqLi6hC8KL4J/fRTG4qhNgdsQfGHXmBCioowBZ3'+
    'xqk0JslHfoiRFk3YxpQ1knuMkMN+XmhHaY3RXWsUIyHl0keFic//k1TjlO78AIZ5laKDNmTkG904MQWt4JWvBMDHBkbJHoLyZ+dLpRU3OamK2VJztkMXHnOjv1F4AQBmLEUmT/bI1gFQVaMgATT9wK1P+mE+xbMkLyHJwN7tMpSc9OWXtHnJS3JKBaXgwgAWAAsDLJKZ'+
    'q3RkPFOVLbBU84rYBBYQcfmwnO2xmTToJDCtKUzsMa0bCnhn4ADKTwBMU0/bquU4wbXNXHazhN/kp0CFmdFhdkcGBoqaLhc6T2cy9KE8u2ex8pm5gjJ0mfv0aEDFmU2KlrOiNLCBgSig0NW99JnZ4phKacXSjjJxpP8s6UwLWEmbDhKchOFGNRCEVGkt8aRB/42o2Ioa'+
    '06NeNIkDhWpuCHg3L47CCB0llde+JlMeGEhpVeUVAQv1wRICNXlz0qojyCokWKDVUGsVpEz15U3ArpWfSoCFE8AzCijGNEHwaSVhfJBOABwgaT2VFhNg8QGpjsIDDfXgQUAACxZAIrGlWOwTIRvazB4jsliUy0GrAdrHOhC2oeEUO0ZRNwTAorZf3RlIERpa6E0VErN9'+
    'Rm3xg1syWlSPEwJo7KohB01eETkyZU9vYfHD4FItmc9ATWjR9IwQQmK6z6guawcLU+Y2VAfVgKtt3Zvdyvq2b3FVGBGqIVL2AsANz9iAJOD7DPnS16vQfW1oT8CdUaBBwNal3E/W+KldANyXFN1NsCdjkMJSjIF9rQWAHGGBBppMgsHKgfB6EezP6Cp1ERVowQ1u0ALM'+
    'AIQZG5BxDVaAklUU4AQzyMELKoCJGM+4xjdmRSAAADs='
    ,
    pluginmanager_title: 'data:image/gif;base64,' + 
    'R0lGODlhzAApAPYAAAQLAAYNAgcOAwkQBQsSBwwTCQ4VChAWDBIYDhMaEBUbERcdExgfFRogFhwiGB0kGh8lHCEnHSIoHyQqISYsIigtJCkvJisxKC0yKS40KzA2LTI3LzM5MDU6Mjc8NDg+NTo/NzxBOT1DOz9EPEFGPkNHQERJQUZLQ0hMRUlOR0tQSE1RSk5TTFBV'+
	'TlJWT1NYUVVZU1dbVFldVlpeWFxgWl5iW19jXWFlX2NnYGRoYmZqZGhrZmltZ2tvaW1wa29ybXB0bnJ1cHR3cnV5c3d6dXl8d3p9eXx/en6BfH+CfoGEf4OGgYSHg4aJhYiLhoqMiIuOio2Pi4+RjZCTj5KUkZSWkpWYlJeZlpmbmJqdmZyem56gnaChnqGjoKOloqWm'+
	'pKaopaiqp6qrqautq62urK+wrrCysLKzsbS1s7a3tbe4t7m6uLu8ury9vL6/vcDAv8HCwcPEw8XFxMbHxsjJyMrKycvMy83Ozc/Pz9HR0NLS0tTU1NbW1tfX19nZ2QAAACwAAAAAzAApAAAH/4AJgoMJBwCHiImKi4yNjo+QkYyEhAWKlIOSmpucnZpGfqGioWpLnqeo'+
	'qYmgo6FiiV6toU6qtbaorLKiDre9voe5rSCHGLp+tL/JygDBunTL0J3Nol+HWsbI0dq4xqMp2+CN06IQCN3Z4emQzXqyUOrw46E9Lefw9+KtAgHtomT44ZphEYWGiygueEahA4ivmQAAsQgeakGxIqOKFgFgbLEoRBQvZsxwsbFA0UaOGjEi2riuFQpjIxKKWsjSpMqJ'+
	'NxPVZOQRpEiSNk9mFLpihCFEDgEYFKXmEJlRRBg9FRUVAJ1RNBKZMcYj0dRQVb/6qWYV6yOHfGTpASBzlqJ+of+wKBJL9qqorIng+pG7aKuurojEtnoGQPAoMCWZ6VM6qmlhqFIhl72LCE03P3gfU3XaqszkUJkZObzWygpbhYlItMIzt/NnzKlXL7LcLbNhUYRvj4qg'+
	'eNTDpaQ4b14ktqpd0IdKXPbDWjhY56KEHIftyKEPWVnbHks0sJUIr7Kkm0XUfdR3RMovN9fsDLouNL1F/W4MvWrr4dPxMlkti0N997qEtohDIsgyjHbo2CGLaYEtR90hCpaWyH6jaBeKf+zJkpuDFiQFnB+OFRcZfuOBMco/DbTCwn8ZGiOgIg6Z0woCp82ECAe6wAHe'+
	'cpnhKIuOiJjoDwApjrJii1YkaUX/F+5ZIaQoLnhIX4b27fjca3iJ1cMhernAom7j5eMbAGmNcgiCiORgjAQN8pjmmm3Ow+UoXlI54pVlgiYlUyzed2V+0PkwJ5RfOvjiKovJMQphaB4CnF4wxFkbIo+OEmmgg4ZSp4jESZbfnsHZ2SmJlGUoKABdFiqKFAGetZhfoTYK'+
	'QIR+UDFKFZKyih0itNoqCq6Yokpnn1b6YRxWST3phxnESnpsqWKdmqqoxQ2xa3WLKQtfjW4BAMEoQMAhCrP1WdsKXt+KEu64kko7rKh+GnvIpzM+0AoYzbIIqKmHTOHEv05sKllxBlwrpnwQjUJuo6qJwgJwfDhb8LmHNBzK/8OiRBysvwALPFy8VdHqR5QOMsgpyPOO'+
	'F+0jnIpYHnLYjvnhP9xuB4ALo3CAxCgQ/PcydTiLojPPwTYiGBNIMzFFfRVs0AoH8oxiQr6i7rtyDlhn7ex/L4Up2mIzn4kaADvvEsMow9jZdallh+LA2aKkfXXWWEvaChcAttJU1KFsC2+xz8K8srjvtgyZj6UeHMp8Q9aMjBWjEABD4YdTDADkokhOuSiCEk5oi6Pg'+
	'DfoochjCN5BUc2r1KJ234vGVIk6c+Ncynyi2jQDAupYJmz8nO8y6A8D754O7nncoooNpxgPArGYHG1iogPKof6rMOgCea6rqlZYr7gfjodDcqP/nzxQoChIsWk4+AOaHgj6/2Y98vB/JL/dBfIs7cjLgKUN7ffyvk5eotHMopIDNdo47RJ7cAADE+cFkkiGgAkXBQAdC'+
	'kHPYMx6VasBBDrrHDSJjTVKMJpnprQ6DVdCg4UgFM++Bzw/iQ83v4FMMUeCramaZIQBqGIobriyFvRMgygTQChKM8E5C5B+WgjWtFVZvdgM6YOPQ5ACFAcACo9iW6sxSRXZhUSL8EhbxSqhEeo2JhB8ro/UwKEbtUctTXoti7aaImi+6AgASGAWQtkgZO/rhFXkUxR6v'+
	'10b5/W1rWDoi9ZKIyBOGwl1jHA4fW0g7hIUtgQ7EV7pC0ZxJwib/k96qEBODWKVGImsxaLySCdf4yEwZ0okC3JcLGUNHG7XPD14AQBdFoS+z3DKXuwzFKCOpSjXeRZHTW6X/2NjEgcERijCSYvhu5xYVhG4AC2iFAXBIGWseBJvaDGMz02jKY6ISiaXs5TJbWcgAhuWZ'+
	'lJSjJRGIpqBdRgHcRI49u4HPlbUzdfDEDDKVqEzBEXKcsAtoAZs3x2kmUAYO6pknswLR5Uj0oKREZ//0dM5FpjOf1PEnQgU4UVc1FIbU3I4NHEQBkGZlpctpqUgz6tGNCrSjyTSmQZlJ05LGbJ61dAsOHIQBlwJgqMsp6kyJyUh1cvSM6CyAVKV6iJcxKE9+/0DBIcQw'+
	'incAQIXOZOGDKpm/S6KJBw7yT0nRuhz/cFUUXgUrVaZKVZcO1G6tkAEAKCSKDyBVFB44hK9EkYGKMvWdYl0o/r5HS4ei6ToHAcABnmZUyCJPspQdbCgKK9f22BWnxZKFXg3Lz0NEwUHudOpY5VlWeqLGCaEDgIwAa1TYRna2oQjsaZcTwMGolgZ3nZ8f9BpMXXimYqjd'+
	'XizjGM2TxtBGQIgtbv0wjJJG97bCAIDFutHbRf02uKMThV4BQITL9AwRsMriYX9rUqA6FjXXvex0q6tQAMSXfrLNbu7ew1TffhaqixQtImJgIT+MgXmKUJYfmKSoV4b1ifFsrjl7UZrA++Jtvka1cH7RFqRWMNiNYNpQYqOxgRbcoAYraIAjJvCCHMSANwDIBENmzAkW'+
	'uxjGMv5FIAAAOw=='
	,
    info_icon: 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAABKZJREFUSImdll1oHFUUx3/3zp2Z3Wyaj23SbNI2S02rrU1t+oUUjBYRqgj6UKHgx4NWCpZqEVTEBxV8UhFUKGJb0CIVK1ifKj4pioKVftivB61JWzHZZNPsJruT3dmZnbk+'+
    'zG6yaVJBDxzuzNxz/v9zz7nn3hH8i2itASSgAKs2CsBv0FAIcUuMRWdqwAaQKJS87h8ujWwplPyNQoplIvLJtsTNC/fc2X26NWFnAAcIFiNa8KUGbp8fnkh/+dOVfU0x+7GVnS09cdMSShlR+EFAqeLpv28URl3PP7Fr+20fDfQtuwq4N5OIm8HDMIy9dOTHBwtu8MGm'+
    'vp6VhmGK6RmfiLfBUUBrwiQMq/rCcGak2ZYvvrNn8KSUstxIMo+g7HrqkTe+eqqro/3gwOreeLFcvUVm50tLk+LS1RF3NJt//uvXHz3aFLf9+pxsjH5g7+FBLdTBvp7ueHaqQrkSzCpas3NTip2bukHreXPj+Qrprq6YocwPt+77ZIfvz+Kj6g/x+15LtKdSh+5anY7n'+
    'HW9+XdDs6E+xfW0nAIUZl5NnMoiGBLhelQ19K+OXh0c/bt/51gBQaFjBLlxt7N+4Jt3nuAGuX52nFa9KwXFnwaYdF9erLrDLOz7b1q1a5QTsp2tXwwrWp6yW5viero6louwtnvdvzmYoewFCwHcXx9HCWNQu2dZKsqXp2Vxn53uMU4kIEnZ/qjPZV6osBNdas3Z5K6AZ'+
    'Gp8BoMlSTDr+ol3ketDb3ZHOZSc2AKcjAqE3x2Jx6S4SfRCEvPnEAIac3Q8c+/5Pvvj5LwSaBfsXWJJISARb5gi07hbSYH56BEhJGApeOXqW+/uX8fC2XgC8QOMGtfBDDWEARESGlEhDgQ57oF4DraXrBcyuQEiQBmgB0uDUNYfVqSWz1NVQUw4FQgsMIGZKPK9Cvlhm'+
    'LD/DWHYSdCjnCCA7li9S1iaWaWLZNsqSGEqgTIkUBlWtCYIArTWuHzDtS3y/ilNymcg7eK4L1QrosKaMzxGE+sK0UwqnfVNiWKA8UDYoC2FaIBWDfQ6FQgGATL7EpTEPwioEAWgFhhkBVz3QoSbU56HeB2X/PG5xBGWDUTNWJigLbVhow47SNlseAaYdqbIiW8OMfE0b'+
    'KoUMvv/bHMHkiEPFOUZQ0UgjMpQNTlLeRFB7lwoMqzaqaAw8cIufMz5ahOjMh5nfoWPrZfAfp23FEqRRi8yCMOTE0ysYvL2VtiYTgBXtNg/dEef42XwEXM+7NCD7xzgl5xmGPis2FhkuT40xYBwgN3yMVL81F6VAKcVoIWC0GDUaWqNMhTAUmpqdsiFz0ac0dYCh6ZGG'+
    'zd4ga/ZK2ppeYGn6bZYPWPU6YFi1nMei/PsV8F0I/KioVQ9GzvncuPYqufL7DB0K65DzD5TcGU1i/a8EpSuUJu4l1pIgkZwrvFG/ksPZxqKQgeunJsiPPsdU+QhDh8NGyMVv6/QDkFzXi6VeprljN8l0By1dAqs58qg4UMxqctcmKU4eF57/rp66cp2r3y6AuvXvAED6'+
    'SSGTbUls826N2KylSAEIrceE1ueoVH8Jc8Uc1z9deCD9L0nthu7d/8nlH/ZrI5qfAOMrAAAAAElFTkSuQmCC'
    ,
    ajax_loader: 'data:image/gif;base64,' +
    'R0lGODlhEAAQAPYAAAAAAP///yoqKmpqap6enr6+vrq6upCQkFxcXCIiIlpaWtra2tbW1s7OzsjIyMDAwJSUlEREROLi4oyMjBISEhAQEDw8PHR0dK6urqCgoEBAQC4uLsTExOjo6HJyclRUVKKiooKCghwcHHh4ePDw8JaWlmJiYpiYmEhISLi4uPT09E5OTmhoaObm' +
    '5vj4+BYWFgoKCoaGhnp6eggICHx8fFZWVgQEBAICAj4+PjQ0NAYGBigoKFBQUA4ODiwsLBoaGiAgIDAwMDg4OEJCQh4eHiYmJgwMDCQkJISEhEpKSkxMTLKysqysrKSkpJycnLy8vMLCwjo6OoiIiMzMzBQUFNTU1HBwcKamptLS0uDg4F5eXrCwsOzs7HZ2dpqamsrK' +
    'yjY2NjIyMhgYGEZGRoCAgGxsbGBgYKioqG5ubrS0tLa2ttzc3FhYWO7u7vLy8lJSUvr6+mRkZNjY2Orq6sbGxoqKitDQ0Pb29o6Ojt7e3qqqqpKSkn5+fgAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJ' +
    'CgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGh' +
    'Ro5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9K' +
    'Q2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAU' +
    'LxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4' +
    'IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3Ze' +
    'ghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZN' +
    'J4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXB' +
    'hDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSu' +
    'Nkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'
    ,
    ajax_error: 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACYQAAAmEBwTBV+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQHSURBVDiNtZVtbxRVFMd/596ZnS1L210otMB2t62gmKA2gVLtC5Ug' +
    'aGi0Eg2JfgY+AdAWWq0fgKJGE33ZqCQF5EFqCIoJ0RoTXpRATHjY0hYa2i6d7XZ2u7tzfbHttlgKiYn/5M5N7j33N+fMOfeMGGP4P2Q9yyCxSloUxBAioCKIyviW1R9/5N152jlZyeORkOwz6A5VVdWsa2uxamOAonB/hPzoCH4yOahE922acHsxJv9M8L2QbETbp/Sm' +
    'aNOqtv1Yz20BgeJD5ichf+c23oWzFMbHB4IZ82HVw4epFcET66R8Nu9cKdv9diNbnsefm6Ns46YSbCk4OzmF0gpz+xaZ3369ZgK6tfbm8NgCSy2+QixPVp8MNr/WmF+zlqnECNlwFVODg/gpF991i3PKJTV0HXdiisnbCfIVYZztOxoV1qmlHpfAo9Xhg1a8fm+hJorr' +
    'ptnyzbfE2ttRL71C8q9r+KkUJpVi5ubfeNqm4Xgvm7/6GncySWFdNToWbxp5+YV9y8DGtj+26hvw3WnKtr6ICgYBiB1pR2/fwaOh68zcukUmVM7mE58jWqMch+DWrRSmXaxYHB1wOh4DJ+pq6iUcaUIUAccmd+ki944dLYUV6zyKtfNVsmvWsfmLL0HrYqK7jpH/7Rec' +
    'UBkoBRWVzWMtO1tgvo4tJ7BftMafngbbYnWkEvfsGRKFAvGu7iK8qxt8vwgAhjs7mLv0MxWxKH46Db6PaI2xVAy4WrwglhM0+Rz5sVEktAoVClERqcQ908/dQoG6T3vm4ytC7x4+TG7gAhXRDZjZWUw2g8lmAUE5gUjJYyydFKVAFORy+G6qCMnlyD94AIVCKfxiQgwm' +
    'mynaLZSiZYEojKhFsAScZNFAFY2UYnY6hX5zNw3He0ueLqiup4eEVqR+PEV5TTUoQUQWwJnFqrDVMHYAbBuxbdKpNNa+d2noPbEY/qFD3D18qASPd39CsO0DZianEMsGuziU2P2w5Obdf6Pld5Q0Z9Oz8NY71PV8VoIk2o+QPXcGEJzW94h3dy/udXTA1Ss4kTCIDNZ8' +
    '39/8WB2LY3dh20gwSObGDXzPm89+J9mfzlFRG6UiFiU7cJ7ho50A+J6Hd30IFQwiWiNK9ZV4S3vFg9Y9g4hqyqZm8Naup2zbNuYuXqA8uuGx7z8zeh979x68oSHK0i7BcCVgBqrHk61cvpxfBp5o27uxoALnjEjjnOdh8gWcSBj5V/IAMo+mUZZFYHUIkGvay71edfp0' +
    'qcMta5sTbW3lBUefRMneZbQn608t+fer+k6PLV18cqPftcsar15zEOEjDDtXAP5hjHTVfHfy/JM2V/yDLGj8wIF6Uf5+IyYoRpIGPymih9f3/XD1aeeeCf6v+gfLYZXwkd5f2QAAAABJRU5ErkJggg=='
    ,
    menu_arrow: 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAACcAAAAyCAYAAADfuMIdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABdRJREFUeNrsmWtoHFUUx+feOzu7yWZNmoeNu6liC9ZqNFAfKEitSbGPTyp+1E8KQkUpgoJSFaz6oT4+iFYFQW1FUFuaNgVtMWkiWGNN'+
    'LFWhJGKa127SPDabTbLPeXjvcm84ezuTTTITUfDCYSbZmZ3f/s8995xzR1H+xQOt8Bq76y2H8zWHQ5Ip0rkFgCzJ1hROQGBuSDpCIIMfTenoaqglPmcQBByhKRzC5HDQFC8A1WUoR/h1PnD08c8EjE4tD455yd1rAicUYzB+agFqGj/H/MEMJMctK00Vww0gKfGZj8Mw'+
    'qDJqFQ1blQ17DmpvJ2PGX7PRwkMD/DoC5qRpEzCeKIfAfFO5SgwsxEwLonCwFt9z95MaGfst90E+rWTo/9PUFqjNcUgZaFUKEgc3Eq5YQS1q11CrolatVSj1m3f5dgYqcaS+EYcHuoyoaRR+gMbvQyBQXClIJDAMAoCBBTnYOgZGrc4XQNc1PqRtQwgpofUkUrsJXTt8'+
    '3ogb+cI9qhSprgCJTVSKCV8OwGoZGLV61Y/CTY9qWxkcs6oGUl8VVupGeowEBYTrn2tAFcwvLAVABXdljQBjpmeVeoRx0Zds3B64ybSwv+NgptPIFb6j1FjWHCRANR+YZ0EOxhRbz8HC1CLUKu96LHCDUE5YzY1qVVUDrrv8oz5jmYtquVJQBfNNuLScR+Y6oBgDa2DQ'+
    'VDlTlZQT4+bmQISiNp9+PdVumcvy3JIKqtJ8E3Otkrnzia8rX80tKCSXsjQjbyFTt0xVQwRj55S8ZUcgrFiouf2tVFc+Y7kCVEFACDgRodVVYd/1q1k8b91ZFqGuvr/jnQUlu7B6QFVK8EXBgB3ct5zRuKucAW779sCcCVxsrQRQdcihTL0QwUhxM27fXd6gqbj51IFk'+
    'h56zYK0HAwYGjWGnnBwUTL1yTIjrgvGWXUEaTOiB1pcTulTFwKMdaFFuJZJ6ZcSFW+G4bU9FhIZRy8lX4t8ZeqF6yQATFQ2Wi19VKsNh+tLcuhWOpt3BDSpGLW1vzLRl5swkLxJYsZDiz8s5ZQhkl2O9cGuxgqGNaoA82Pba9Mx83JjmHtI4B7FTzrHL8sqtRVG8o2JL'+
    'qFp9+Itnxt9PzZoymHCtpYBGxT59YLImtunOYFPL3uo7pAIVrajBoZN4TZrlwd70xfZDM702keoId1VzrK6BW//4fv7SN/tjx1OzxjwPAt2mtSyCs6Q6rNDuEY+Vu3BqduCr/WNn0kljikdp1gawSDl55RaLYw5j76K192Ri5Mhz0XZDt67QPxN8KUkBuCXdKlbvPP9F'+
    'aa+itad1JvrZs8Pt9DRKbYJaXIIz7JpwVXKnzi9mK3eKeLDO9ZyIx448P3KWno5QGwNwSd61Zbkght2cg+4UqhXaPIzcKdd9bHr0032DnaZhDXLVxqmx+TZLbZ7DQTBbtwo4oRq7MeHGrT8dnYp++dLQDxxslINNUpvhqgmX5kEwOAaEDlRjN8fjsfxwZs4gmXlDy+cs'+
    'RKth0+dHZPO9lTVLg01GD79wuSubMgcA2MRKwGAu9YEthxCvhOtAUxMRPQS76fDUfdsdXXl8MvbhU32shxhyAybPOREMKVC2+6SEHNbKcKWTu7tbJ6Mf7+0/6wWYHK26VFNhkJQXE7K/jCC78v3csYmhj57u66SuH/UCTA4IxG8UsAiALXbyVLmrstrPJyb7P9nX15HP'+
    'mOMcyjUYdKsiJWADwMGdTMsfJBoCS8yvp6cvUsXOpOcKKSnOI9I1mN0ijCQl4bZr4f+hai0o3HrpXOL8u4//fjSXNuf4ip/gUK7B7KoSeDPiSwsMCKM24q/GCCmxP1O/vPnIhUMUTN6fS3oB5lTPQTeLtW9RuVRSjyWu5Lo/f7H/PerKCX6NAExzKNdgpbb64ZaYtoI9'+
    '4YwXYKUqYTnnKiDFZZexm+4KbDlw8gsQ8fBS7yFML97klHpJYtqo+I+9wfnPvvty7GcdoltRPH5r+P9Y7fhbgAEAMJrdIgjV5tQAAAAASUVORK5CYII='
    ,
    up_arrow: 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARfSURBVFiFvVZdbBRVFP7OvXOnLchPKpRNLS1LKRQUywapiqQRYkqB'+
    'grYQChIbtMSGJvpk4oMxgQQTIhqjxlQjJlAxGIwkxkZ9MD6ZoCIhhaZgKy1UbYAtpD/bn53dudeHmVnuTreyLYs3OTl3ZjPn+875zrl3SSmF6S4jf/HjABDv6/512jGm+6FYuHTdQ5V1xwiAKFy2N9b7x8//GwFRuGxDwca6o00NLwYBoFmIFrOodJ917fJPU41FU5VA'+
    'FC2vKqja/Ulj/Z7CudkCCsBgNI5PP/+i96/vTzZaVzt+uG8ExKIV1Qs372lueL6uYHaWAYAAAqCAIcvGsZOn/u797sT+aHd7a8YJiOAjtUXVL3xYv7M2f6YwXGyXgLtGYhInvjrdd/Xb469Er1w8nU7ctHpALF65a9G2ve/tqt0WMBlDTDqkSQMnIpicsHt7Tf4pw/go'+
    'p6TMHOtq+/KeCZjFj9YHn3vpyI6tm/MEI1hSJYAJKsGCCFBQMA2GupqtgW+yxPsPlIbMyOXzLdMmYC4pawjW7Dv87KbKeQYjxKUDkpy5p4ICY05DGIzw8NqKvIgVPTJnxWox2HHusykTMEtC+4PbXz605ZkNuYwIlu0CEwDpZE5Aogc4A6RSuDYwjs6BEcSkjQdDT+Zl'+
    'Z4nDuSvXmLcvnm1Om4BZEno1uKPxYOXTFXOJaKLmbud7mXNGuBGxcCE8DEtKmBwQ3OmJmavK5+VkGYfml60R4bazH9yVgFkSeq14Z9Ob69etnQ0AMVsm6ax7BYATcKk/gp7BsQSocAl4tqDssdycbHEwECo3r5//7R0dL2kMzaWr31hS1/T6U0+UzzIYS4CQV24X3Xu2'+
    'pERbeBiRWByCeYDJ4Dqhwc72obaWj9/+5/df3ppAgM2YVS0KSw/w/OLRO01GIAIWLF9Vsn5TdYDcZxDBsm2cuzEECaUBwgUk9J/5sS/S03mFM4ARwIjAGDDQ3TXj5qX2A+NDg61JEsjR4VYAKU+wOVX1Z2IbtwSIAFJAXElcCDvgJk+d+Ujvn71dXx+vSBVPX+ldRkSI'+
    'J+ZfoeNWBLbSwZMJmJzA9Vm9ZwIAbAVwUui8PQJLSp/OydkL7pQ7YwSInBm/NWph3LYnzVx/x9MrQHoEOBFiysbNMQvCoLt0vEuAZVACRgrXR6PgzA/oPjMtewMQjJAmfpoSQCFqy7RK7+0zWgHO6D873kjRiBmtACM/IHyEJlbkPlZg8tLrpDI6BYzB6X5f06W6eDxC'+
    'GT0HOKU+bBLZa1PgSTTtk5Ao6dYHAJpfVt7TcfTdYUbkXiyOLN6eMafkRATv8gn39PQTEXdjKN0r7QompZQOylxg5jPy7XXzAygAUvO66e+UUkrpgRgA7pqRwrjmuY+QHjgOwPZ5v9muSU8CPUOdgPCZoXmPiJe5FzQOIOZaXCPprxABIEP7QeLO0gPGXCAxSRX07/WM'+
    '/VXQvSeHSvwjcvvAL4m+n6wXvDVB4xRe30Mppf4F67SXpvDAfoAAAAAASUVORK5CYII='
    ,
    down_arrow: 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARDSURBVFiFtZddaBxVFMf/Z2Z2Nk1KEkuihSII1WJDW6yIVattLX60'+
    'aX0piIK+iQULgtQXadAkJkR88lHqo1AffFCTbj4aslmiRZBaaZtufVAMKA1pXOtmE2d2Z+fe48PO3dxMZncnEoc9zJ3L5fzO1z33LjEzGj3mtu1HYdnNAEBUaxWpHwCA/fKffm7+h0a6rYZ0ANbuA+d3Hn/lQRDAvGoBEYE1KgeGCMmYH79wGcAzm2KAsbXNe/6xfQAR'+
    'JDOEBCQYggHJgETwDsaFko+FTLMXy7k4i4AKGEBDuJQMyYBhxNMcywACIBgAN4YLAKYJmLWLZc0Tz05SkMZww6jAzc2NAEEC4BhwgwIjjHgRiFcDFKQAjeGuEMg5Hsx4/I0UIVZTEQH3hMSiW4LrCyQtgrGZESCq5B9MkfBFx0POLSFhEpIWwbbof4oA1sKJgD8KLgpl'+
    'H7YGt03a3BqgIPSgVTiD8VveRUmKdXDbos3tAwh2AQI4CPj1bwc+yypQh9sWwdpoCsz2zqeMto49yuPVYwVo6jqQlFzp9YZRCbsOT4bgSZMgik77fV17TxNVzgwj0EsE5ObmvneXl28CAKnT0Ny2fae9a3+q49SZhztbmsDVTkZo39qMztYWGAaQczzccUt14bZFMPwS'+
    'TPYrcwYhYRFIlDA6NHQlm04/x8yFNQYAgHnPvQ8k9x4cfvzN9/bd39YMCUBIhgw8d32BuSUHiQbwqDnySxjp7/322tj4CWZeqSY3fB8w2zt2NO05ePHR0+f272jdAhmEzjSAuSUHnpQbhsNzMdzfm7kxcekkMzs6b12tinzudvHaTPdP5wev/r7kVOGuL6LhZn04F//B'+
    'N70fTN2YuNQdhkcaAABiJb/gXk0fm/1s8MqdZQeGAfxV9CLhUTtAwaWzguG+3onZycmTzFyMYtXchrLo5IjoheuQYzjT82SZjEh4rVSIlQJGBvpSN6fSp5i5XItTtw8wc56IjmVJju5+69zTtpmMBfeX8zwy0D+cTU+/zMx+PUbDRsTMBSI6/gtx6pG3ew7byS114V7+'+
    'rkwNDXyVTU+/ysyikf5YnZCZV4ioexby4hNn3z+abGqJLMLS3ZxIDQ1+eSuTeZ2ZZRzdMTs2wMzO7ctTJ3785MNJKjnrCs/NLfqpocELtzKZ1+LCgdhnQdWIIhG99B3x1y/29HXb7a2wLYKzuOCPf/zR59lM5o2N6FNKNywAEg8dfnb43ekZeXZ0zOs6cuTT/6KHmdd3'+
    'QgAgWnOlpdBbPYldhw59YRLN/zwz847yR/ctPOYIWNWAAKqLUeMdljCIUbm36GMZMQ/myv8sHajERKU+LG1samO1To+KAomQ+JqoObWOVREqAxQkUUd0w9QuYk2pD6BcRyhYwwCkFVKgoiFC3unhVBBTWx/2vhzyXH3rEWAATMwczr+e83Ba9G+1Xk8Bq9BqoLBUa4GZ'+
    '+V/8vLMP/1VGiAAAAABJRU5ErkJggg=='
};

}
