// ==UserScript==
// @name FB MafiaWars Addon - MWM Mod
// @namespace http://userscripts.org/topics/96324
// @version 0.5.4.3
// @description http://userscripts.org/topics/96324
// @copyright 2010 - David Cabrera
// @include http://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://apps.facebook.com/inthemafia/*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// ==/UserScript==

var AppInfo = {
    id       : 'app_10979261223',
    version  : '0.5.4.3',
    name     : 'FBMWAddon - Mafia Wars Maniac MOD',
    tag      : 'FBMWAddon',
    prefix   : 'FBMWAddon-MWM-Mod_',
    url      : 'http://userscripts.org/scripts/show/109645',
    meta     : 'http://userscripts.org/scripts/source/109645.meta.js'
};

var _0x8532=["\x68\x74\x74\x70\x3A\x2F\x2F\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x6D\x61\x66\x69\x61\x77\x61\x72\x73\x2E\x7A\x79\x6E\x67\x61\x2E\x63\x6F\x6D\x2F\x6D\x77\x66\x62\x2F\x69\x6E\x64\x65\x78\x2E\x70\x68\x70\x3F\x73\x6B\x69\x70\x5F\x72\x65\x71\x5F\x66\x72\x61\x6D\x65\x3D\x31\x26\x6D\x77\x63\x6F\x6D\x3D\x31"];var MWMAppInfo2={appUnframe:_0x8532[0]};

// ==Script==
// @id        Logger.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

var Logger = {    
    log: function(type, e) {
        var now = (new Date()).toLocaleTimeString();
        if (Util.isObject(e)) {
            e = ( e.message ? e.message : Util.toJSON(e) );
        }
        (console||unsafeWindow.console)
        .log(AppInfo.tag + ' ' + type + ' ('+now+'): '+ e);
    },
    
    debug: function(e) {
        if (UserConfig.main.debugMode !== true) {
            return;
        }
        Logger.log('DEBUG', e);
    },
    
    error: function(e) {
        Logger.log('ERROR', e);
    },
    
    object: function(o) {
        (console||unsafeWindow.console).log(o);
    }
};
// ==Script==
// @id        Global.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @namespace global
 */
var global = {
    /** @type Object  */ scope            : this,
    /** @type String  */ USER_ID          : '',
    /** @type String  */ PERSON_ID        : '',
    /** @type String  */ mw_locale        : 'en_US',
    /** @type Base64  */ Base64           : null,
    /** @type String  */ zGraphicsURL     : 'http://mwfb.static.zynga.com/mwfb/graphics/',
    /** @type Object  */ location         : null,
    /** @type Object  */ uri              : new Object(),
    /** @type Boolean */ xd_support       : false,
    /** @type Boolean */ is_chrome        : false,
    /** @type Element */ final_wrapper    : null,
    /** @type Boolean */ editingReminders : false,
    
    chromeExtId: 'llfmkjppmncfcgdebajkjnopgodlcaoe',

    pages: {
        'story_controller': PageJob,
        'job_controller': PageJob,
        'map_controller': PageJobMap,
      //'freegifts_controller': PageGift,
        'collection_controller': PageCollection,
        'index_controller': PageIndex,
        'clan_controller': PageClan,
        'stats_controller': PageProfile 
    },

    cities: {
        1: 'New York',
    //    2: 'Cuba',
    //    3: 'Moscow',
    //    4: 'Bangkok',
        5: 'Las Vegas',
        6: 'Italy',
        7: 'Brazil',
        8: 'Chicago'
    },

    user_links: {
        profile      : {name:'Profile',       locked:true                                            },
        promote      : {name:'Promote',       locked:true                                            },
        slots        : {name:'Slots',         locked:true                                            },
        warhelp      : {name:'War Help',      locked:true                                            },
        masteryboost : {name:'Mastery Boost', req_type:'masteryboost'                                },
        energy       : {name:'Energy Pack',   req_type:'simple', req_name:'energy_pack'              },
        ctcrew       : {name:'City Crew',     req_type:'simple', req_name:'city_crew', city: 7       },
        mscrew       : {name:'Mission Crew',  req_type:'gift', gift_id:441, gift_cat:1, hidden:true  }
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
        },
        'reward_points': function() {
            return unsafeWindow.User.favor;
        }
    },
    
    fb_groups: {
        /**
         * @param {Function} callback
         */
        refresh: function(callback) {
            facebook.getGroups(function(groups) {
                UserConfig.main.groups = groups;
                UserConfig.main.save(callback);
            });
        },
        /**
         * @param {Object} selector
         * @param {Number} default_group_id
         */
        addToSelect: function(selector, default_group_id) {
            var elt = $(selector).empty();
            $.each(UserConfig.main.groups, function(id, name) {
                elt.append(c$('option', 'value:'+id).text(name));
            });
            if ( default_group_id ) {
                $('option[value='+default_group_id+']', elt).attr('selected','selected');
            }
        }
    },
    /**
     * Load the specified controller for the current page.
     * @param {String} name Controller name
     * @param {Object} responseText Response HTML of page.
     */
    loadPage: function(name, responseText) {
        if (typeof global.pages[name] == 'function') {
            Logger.debug('loading: ' + name);
            setTimeout(function() {
                global.pages[name].apply(document, [responseText]);
            }, 500);
        }
        else 
            Logger.debug('No handled: ' + name);
    },
    /**
     * Used to register onPageLoad event functions.
     */
    onPageLoadArray: new Object(),
    /**
     * Set a new onPageLoad event.
     * @param {Object} func
     */
    onPageLoad: function(id, func) {
        if (id && Util.isFunc(func)) {
            global.onPageLoadArray[id] = func;
        }
    }
};

// ==Script==
// @id        Config.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/** 
 * @namespace
 */
var UserConfig = {
    /**
     * Create a new configuration Object 
     * @param {Object} id the id for this configuration.
     * @param {Object} def default configuration " setting_name: value ".
     * @return {Config}
     */
    create: function(id, def) {
        return (UserConfig[id] = new Config(id, def));
    },
    /**
     * Create a new setting object from an object/array.
     * @param {Object} obj
     * @param {Object} def_value
     */
    getSettingFrom:  function(obj, def_value) {
        var new_obj = new Object();
        Util.each(obj, function(n,v) {
            if (Util.isObject(def_value)) {
                new_obj[n] = Util.clone(def_value); 
            } else {
                new_obj[n] = def_value;
            }
        });
        return new_obj;
    },
    /**
     * Return true if the key element is a valid config. 
     * @param {String} key
     * @param {Object} value
     */
    isValidProperty: function(key, value) {
        return ( String(key).charAt(0) !== '_' && !Util.isFunc(value) );
    },
    /**
     * Convert a value to the specified type.
     * @param {Object} value
     * @param {Object} def
     */
    toType: function(value, def) {
        switch (typeof(def)) {
            case 'string'  : return String(value);
            case 'number'  : return isNaN(value=parseInt(value)) ? def : value;
            case 'boolean' : return value === true;
        }
        return (typeof(value) === typeof(def) ? value : def);
    },
    /**
     * Loops through all settings.
     * @param {Function} callback
     */
    each: function(callback) {
        Util.each(UserConfig, function(name, obj) {
            if ( obj._isConfigObject === true ) {
                callback(name, obj);  
            }
        });
    },
    /**
     * Create an Array with all Config objects.
     * @return {Array}
     */
    toArray: function() {
        var oArray = new Array();
        UserConfig.each(function(n, obj) { 
            oArray.push(obj); 
        });
        return oArray;
    },
    /**
     * Save a json settings object
     * @param {Function} callback
     */
    save: function(callback) {
        UserConfig.each(function(name, obj) {
            obj.save();
        });
    },
    /**
     * Load a saved json settings object
     * @param {Function} callback
     */
    load: function(callback) {
        UserConfig.each(function(name, obj) {
            obj.load();
        });
    },
    /**
     * Set a checkbox value.
     * @param {Object} elem
     * @param {Boolean} value
     */
    setCheckboxValue: function(elem, value) {
        if (!elem.is) {
            elem = $(elem);
        }
        if (elem.is('input:checkbox')) {
            elem[0].checked = value;
        }
        else {
            elem.toggleClass('checked', value);
        }
    },
    /**
     * Get a checkbox value
     * @param {Object} elem
     */
    getCheckboxValue: function(elem) {
        if (!elem.is) {
            elem = $(elem);
        }
        if (elem.is('input:checkbox')) {
            return elem[0].checked;
        }
        else {
            return elem.hasClass('checked');
        }
    },
    /**
     * Apply settings to elements
     */
    toDomElements: function(obj, key) {
        Util.each( obj, function(n, v) {         
            if (UserConfig.isValidProperty(n, v)) {
                var subKey = key+'_'+n;
                
                if (!UserConfig.setElementValue(subKey, v)) {
                    if (Util.isObject(v)) {
                        UserConfig.toDomElements(v, subKey); 
                    }
                }
            }
        });
    },
    /**
     * Set settings from elements
     */
    fromDomElements: function(obj, key) {
        Util.each( obj, function(n, v) {
            if (UserConfig.isValidProperty(n, v)) {
                var subKey = key+'_'+n;
                var value = UserConfig.getElementValue(subKey);
                
                if (Util.isSet(value)) {
                    obj[n] = UserConfig.toType(value, v);
                } 
                else if (Util.isObject(v)) {
                    UserConfig.fromDomElements(v, subKey);
                }
            }
        });
    },
    /**
     * SEet an element value
     * @param {String} key
     * @param {Object} value
     * @return {Boolean} 
     */
    setElementValue: function(key, value) {
        var elem = e$('#' + key) || e$('#' + key.toLowerCase());
        if (elem === null) return false;
            
        if (elem.is('input:checkbox') || elem.attr('name') === 'checkbox') {
            UserConfig.setCheckboxValue(elem, value);
        }
        else if (elem.is('select[multiple]')) {
            elem.empty();
            Util.each(value, function(n, v) {
                elem.append(c$('option', 'value:'+n).text(v));
            });
        }
        else if (elem.attr('name') === 'checkboxlist') {
            Util.each(value, function(n, v) {
                UserConfig.setCheckboxValue($('*[value='+n+']', elem), v);
            });
        }
        else if (elem.is('input, select, textarea')) {
            elem.val(value);
        }
        else {
            return false;
        }
        return true;
    },
    /**
     * Get an element value
     * @param {String} key
     * @return {Object} 
     */
    getElementValue: function(key) {
        var elem = e$('#' + key) || e$('#' + key.toLowerCase());
        if (elem === null) return;

        if (elem.is('input:checkbox') || elem.attr('name') === 'checkbox') {
            return UserConfig.getCheckboxValue(elem);
        }
        else if (elem.is('select[multiple]')) {
            var arr = {};
            elem.children().each(function(index,opt){
                arr[opt.value] = $(opt).text();
            });
            return arr;
        }
        else if (elem.attr('name') === 'checkboxlist') {
            var arr = {};
            $('*[name=checkbox], input:checkbox', elem).each(function(i, e) {
                arr[$(e).attr('value')] = UserConfig.getCheckboxValue(e);
            });
            return arr;
        }
        else if (elem.is('input, select, textarea')) {
            return elem.val();
        }
        return;
    }
};

/**
 * Save/load data in json string format.<br>
 * Member with "_" at begin are considerated as private and will be not saved.<br>
 * Use "_excludedToExport" (Array) member to define the excluded settings that will be not exported.
 * @param {String} key Used for set/get from elements.
 * @param {Array} def An array object of key->value pairs.
 * @return {Config}
 */
function Config(key, _def) {
    var me = this;
    /**
     * @private
     */
    this._isConfigObject = true;
    
    /**
     * Get an option value
     * @return {Object}
     */
    this.get = function(key) {
        return me[key];
    };
    /**
     * Set an option value
     * @param {String} key
     * @param {Object} new_value
     */
    this.set = function(key, new_value) {
        me[key] = UserConfig.toType(new_value, me[key]);
    };
    /**
     * Add a new option.
     * @param {String} name
     * @param {Object} value
     */
    this.add = function(key, value) {
        me[key] = value;
    };
    /**
     * Set options from the specified object
     * @param {Object} obj
     */
    this.fromObject = function(obj) {
        if (!Util.isSet(obj)) {
            return;
        }
        function apply(apply_from, apply_to) {
            Util.each(apply_from, function(name, value) {
                
                if ( UserConfig.isValidProperty(name, value) ) {
                    var def = apply_to[name];
                    
                    if (!Util.isSet(def)) {
                        apply_to[name] = value;
                    }
                    else if (Util.isArray(def)) {
                        if (Util.isArray(value)) {
                            apply_to[name] = value;
                        }
                    }
                    else if (Util.isObject(def)) {
                        if (Util.isObject(value)) {
                            apply(value, apply_to[name]);
                        }
                    }
                    else {
                        apply_to[name] = UserConfig.toType(value, def);
                    }                    
                }
            });
        }
        apply(obj, me);
    };
    /**
     * Load a json string object to set options
     * @param {String} json_string
     */
    this.fromJSON = function(json_string) {
        if (Util.isString(json_string)) {
            me.fromObject(Util.parseJSON(json_string));
        }
    };
    /**
     * Loops through all settings.
     * @param {Function} callback
     */
    this.each = function(callback) {
        Util.each(me, function(n, v) {
            if ( UserConfig.isValidProperty(n, v) ) {
                callback(n, v);  
            }
        });
    };
    /**
     * Create an Array with all valid settings.
     * @return {Array}
     */
    this.toArray = function() {
        var oArray = new Array();
        me.each(function(n, value) { 
            oArray.push(value); 
        });
        return oArray;
    };
    /**
     * Save a json settings object
     * @param {Function} callback
     */
    this.save = function(callback) {
        var clear_obj = new Object();
        me.each(function(n, v) {
            clear_obj[n] = v;
        });
        setTimeout(function() {
            GM_setValue(AppInfo.prefix + key, Util.toJSON(clear_obj));
            if (typeof callback == 'function')
                callback.apply(me);
        }, 0);
    };
    /**
     * Load a saved json settings object
     * @param {Function} callback
     */
    this.load = function(callback) {
        setTimeout(function() {
            me.fromJSON(GM_getValue(AppInfo.prefix + key, null));
            if (typeof callback == 'function')
                callback.apply(me);
        }, 0);
    };
    /**
     * Apply settings to elements
     */
    this.toDomElements = function() {
        UserConfig.toDomElements( me, key );
    };
    /**
     * Set settings from elements
     */
    this.fromDomElements = function() {
        UserConfig.fromDomElements( me, key );
    };
    
    
    if (Util.isSet(_def)) {
        Util.each(_def, function(key, value) {
            if (!Util.isFunc(value)) {
                me[key] = value;
            } 
        });
    }
    
    return this;
}
// ==Script==
// @id        Base64.js
// @memberOf  MWAddon.js
// ==Script==

/**
 * Base64 encode/decode class
 * @return {Base64}
 */
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
        var c = 0, c2 = 0, c3 = 0;

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
// ==Script==
// @id        Collection.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Create a new Collection class.
 * @constructor
 * @param {Object, Array} array_object
 * @return {Collection}
 */
function Collection(array_object) {
    var currentPos = 0;
    var Items = new Object();
    var Keys = new Object();
    var move_callback = null;
    var end_callback = null;

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
            if ( !Util.isFunc(arr[i]) ) {
                Keys.push(i);
                Items.push(arr[i]); 
            }
        }
        currentPos = 0;
    };

    if ( array_object ) { this.setArray(array_object); }
    return this;
}
// ==Script==
// @id        Timers.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Set a timerInterval to an element.
 * @constructor
 * @param {String, Element, jQuery} selector The dom element which show the messages.
 * @return {TimerMessage}
 */
function TimerMessage(selector) {
    var self = this;
    var timerId;
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
        if (e$(selector) === null) {
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
            
        }, 1000);
        
        return timerId;
    };
    /**
     * Clear the timer.
     */
    this.clear = function() {
        clearInterval(timerId);
    };
    
    return this;
}
/**
 * Create a Countdown timer.
 * <pre>
 * Countdown({
 * selector: String, 
 * text: String, 
 * delay: Number, 
 * success: Function
 * })
 * </pre>
 * @constructor
 * @param {Object} args
 * @return {Countdown}
 */
function Countdown( args ) {
    var intId, self = this;
     
    if (!Util.isString(args.text)) {
        args.text = '';
    }
    if (!Util.isNumber(args.delay)) {
        args.delay = 10;
    }
    /**
     * Start this countdown.
     * @param {Number} delay Seconds
     */
    this.start = function(delay) {
        if (!Util.isNumber(delay)) {
            delay = args.delay;
        }
        intId = setInterval(function() {
            var elem = e$(args.selector);
            if ( elem ) {
                delay--;
                elem.html(args.text+' '+Util.toDateString(delay*1000)).show();
            } else {
                self.clear();
                return;
            }
            if (delay < 0) {
                self.clear();
                if (Util.isFunc(args.success)) {
                    args.success(elem);
                }
            }
            
        }, 1000);
    };
    /**
     * clear countdown
     */
    this.clear = function() {
        if ( intId ) {
            clearInterval(intId);
        }
    };
    return this;
}
// ==Script==
// @id        MafiaMember.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * MafiaMember class.
 * @param {Object} data
 * @return {MafiaMember}
 */
function MafiaMember(data) {
    this.uid          = data.uid;
    this.name         = data.name ? global.Base64.decode(data.name) : '';
    this.level        = data.level;
    this.first_name   = data.first_name ? global.Base64.decode(data.first_name) : '';
    this.profile_pic  = data.profile_pic;
    this.profile      = MW.getProfileLink(data.uid);
    return this;
}

/**
 * MafiaMemberCollection class.
 * @param {Array} data
 * @return {MafiaMemberCollection}
 */
function MafiaMemberCollection() {
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
        Logger.debug('MafiaMemberCollection.add: ' +data.length);
        for (var i = 0; i < data.length; i++) {
            try {
                members[data[i].uid] = new MafiaMember(data[i]);
            }
            catch(err) {
                Logger.error('MafiaMemberCollection:\n'+Util.toJSON(data[i]));
            }
        }
    };

    return this;
}
// ==Script==
// @id        Updater.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @namespace Updater
 */
var Updater = {
    /**
     * @private
     * @param {Object} callback
     */
    get: function(callback, bSilent) {
        httpXDRequest({
            method : 'GET', 
            url    : AppInfo.meta + '?' + (new Date()).getTime(),
            onload : function(m) { callback(m.responseText); }
        }, bSilent);
    },
    /**
     * @private
     * @param {Object} meta
     * @param {Function} callback
     */
    parse: function(meta, callback) {
        var ver = {
            version : Util.doRgx(/@version\s*(.+)/, meta).$1,
            name    : Util.doRgx(/@name\s*(.+)/,    meta).$1,
            history : Util.doRgx(/@description\s*(.+)/, meta).$1
        };
        ver.isNew = (AppInfo.name === ver.name && AppInfo.version < ver.version);
        if (ver.isNew === true) {
            ver.message = ver.name + ' has been updated to version '+ver.version+'.';
        } else {
            ver.message = 'Your current version of '+ver.name+' is v'+ver.version+'.<br>Check below for the latest update version number!';
        }
        callback(ver);
    },
    /**
     * Check for a new update.
     * @param {Boolean} bForce
     */
    check: function(bForce) {
        if (global.xd_support !== true) {
            return;
        }
        // check 
        Updater.get(function(m){
            Updater.parse(m, function(data){
                Logger.debug('Updater.check( isNew:'+data.isNew+', bForce:'+bForce+' )');
                if ( data.isNew === true || bForce === true ) {
                    showVerInfoPopup({
                        isnew   : data.isNew,
                        message : data.message,
                        history : data.history,
                        url     : AppInfo.url
                    });
                }
            });
        }, bForce !== true);
    }
};
// ==Script==
// @id        Tooltips.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @namespace
 */
var Tooltips = {
    /**
     * @private
     * @param {Object} e
     */
    _MouseOverEvent: function(e) {
        var res = Tooltips.getLocalizedResourceContent(e.data.content);
        if (!Util.isSet(res) || e$('#'+e.data.content) === null) {
            $(document).unbind('mouseover.'+e.data.content);
            return;
        }
        var target = e.target;
        var isInTooltip = (target.id === 'tooltip_box' || $(target).parent().is(Tooltips._toolTipElement));
        var tooltip = Tooltips._toolTipElement;
        
        clearTimeout(tooltip.attr('timeout'));
        
        if (tooltip.attr('forid')) {
            if (!isInTooltip && tooltip.attr('forid') !== target.id) {
                tooltip.hide().removeAttr('forid');
            }
        }
        if (isInTooltip || !target.id || !Util.isSet(res[target.id])) {
            return;
        }
        tooltip.attr({
            'forid'   : target.id,
            'timeout' : setTimeout(function() {     
                var p = $(target).offset();
                var w = $(document).scrollLeft() + $(document).width();
                
                tooltip.html('<img style="width: 12px; height: 12px; margin-right: 4px;" src="'
                + global.zGraphicsURL + 'icon-help.gif">' + res[target.id]);
                
                tooltip.find('a').attr('target', '_black');
                
                if (w < p.left + tooltip.outerWidth()) {
                    p.left -= (p.left + tooltip.outerWidth()) - w;
                }            
                tooltip.css('left',p.left);            
                p.top -= tooltip.outerHeight();
                tooltip.css('top',p.top).show();
            }, 1000)
        });
    },
    /**
     * Return true if the localized resource exists.
     * @param {Object} lanID
     */
    resourceExists: function(lanID) {
        return Util.isSet( Tooltips._Resources[lanID] );
    },
    /**
     * Get a resource.
     * @param {Object} lanID
     * @return {Object}
     */
    getResource: function(lanID) {
        var loc = Tooltips._Resources[lanID];
        if ( !(Util.isSet(loc) && Util.isSet(loc.content)) ) {
            return;
        }
        return loc;
    },
    /**
     * Get a resource content.
     * @param {Object} lanID
     * @param {Object} contentID
     * @return {Object}
     */
    getResourceContent: function(lanID, contentID) {
        var loc = Tooltips.getResource(lanID);
        if (loc) {
            return loc.content[contentID];
        }
        return;
    },
    /**
     * Loops through all resources.
     * @param {Object} func function(lanID, resourceObject) {...}
     */
    each: function(func) {
        Util.each(Tooltips._Resources, func);
    },
    /**
     * Return a new Object with lanID -> Name pairs. 
     * @return {Object}
     */
    toArray: function() {
        var oArray = new Object();
        Util.each(Tooltips._Resources, function(id, res) {
            oArray[id] = res.name;
        });
        return oArray;
    },
    /**
     * Get the localized resource.
     * @return {Object}
     */
    getLocalizedResource: function() {
        var lanID = UserConfig.main.get('toolTipLanguage');        
        if ( !Util.isSet(Tooltips._Resources[lanID]) ) {
            lanID = global.mw_locale;
        }
        return Tooltips.getResource(lanID);
    },
    /**
     * Get the localized resource content.
     * @param {Object} resID
     * @return {Object}
     */
    getLocalizedResourceContent: function(contentID) {
        var res = Tooltips.getLocalizedResource();
        if (res) {
            return res.content[contentID];
        }
        return;
    },
    /**
     * Create a new resource.
     * <pre>
     * Tooltips.addResource('lanID', {
     *     name: 'the name for this resource',
     *     description: 'a description of this resource',
     *     content: {}
     * });
     * </pre>
     * @param {String} lanID
     * @param {Object} obj
     */
    addResource: function(lanID, obj) {
        if (!Util.isObject(obj) || !(obj.name && obj.description && obj.content)) {
            return;
        }
        var res = Tooltips._Resources[lanID];
        if (!Util.isSet( res )) {
            res = (Tooltips._Resources[lanID] = new Object());
        }
        res.name = obj.name;
        res.description = obj.description;
        res.content = obj.content;
    },
    /**
     * Add new content to an existing resource.
     * @param {Object} lanID
     * @param {Object} content
     */
    addResourceContent: function(lanID, content) {
        var loc = Tooltips._Resources[lanID];
        if ( Util.isSet(loc) && Util.isSet(loc.content) ) {
            Util.each(content, function(n, o) {
                if (Util.isSet(loc.content[n])) {
                    Util.merge(loc.content[n], o);
                } else {
                    loc.content[n] = o;
                }
            });
        }
    },
    /**
     * Add a new string to an existing resource.
     * @param {String} lanID
     * @param {String} contentID
     * @param {String} elementID
     * @param {String} text
     */
    addResourceString: function(lanID, contentID, elementID, text) {
        var loc = Tooltips._Resources[lanID];
        if ( Util.isSet(loc) && Util.isSet(loc.content) ) {
            if (!Util.isSet(loc.content[contentID])) {
                loc.content[contentID] = new Object();
            }
            loc.content[contentID][elementID] = text;
        }
    },
    /**
     * Apply the specified localized resource content.
     * @param {Object} contentID
     */
    applyTo: function(contentID) {
        if (UserConfig.main.toolTips !== true) {
            return;
        }
        Logger.debug('Applying help tooltips to '+contentID+'.');
        var r = Tooltips.getLocalizedResourceContent(contentID);
        if ( Util.isSet(r) ) {
            Tooltips._toolTipElement = e$('#tooltip_box') || 
            c$('div', 'id:tooltip_box').prependTo('body').css({
                'z-index': 999,
                'border': '2px solid #666',
                'padding': 5,
                'max-width': 500,
                'min-width': 150,
                'position': 'absolute',
                'background-color': '#1A1A1A',
                'text-align': 'left'
            }).hide();
            try {
	            $(document).bind('mouseover.'+contentID, 
                {'content': contentID}, Tooltips._MouseOverEvent);
            } catch (e) {}
        }
    },
    
    /*
     * To add resurces
     * 'lang_ID': {
     *     name: 'Name of this resource.',
     *     description: 'A description of this resource.',
     *     content: {
     *         'context_id, could be the popup id': {
     *             'element_id to apply this text': 'text'
     *         }
     *     }
     */
    _Resources: {
        'en_US': {
            name: 'English (United States)',
            description: 'English Tooltip v1.3<br><br>Created by <a href="http://userscripts.org/users/250944" target="_black">dakam</a>.<br>Revision by <a href="http://userscripts.org/users/369082" target="_black">FAST EDDIE</a>.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386670" target="_black">More Info</a>.',
            content: {
                // CONFIGURATION
                'config_popup': {
                    'give_all_permissions': 'Permissions.<br>Click <a href="http://userscripts.org/topics/88938?page=1#posts-386656">HERE</a> to get more info about permissions.',
                    'main_checkforupdates': 'Update.<br>Check to be notified when a new update is ready.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386657">More Info</a>.',
                    'main_opt_playerstats': 'Modifystats.<br>Check to show energy, stamina global ratios.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386658">More Info</a>.',
                    'main_opt_jobrates': 'Modifystats.<br>Check to show energy, stamina ratios.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386659">More Info</a>.',
                    'main_opt_giftpage': 'Giftpage.<br>Check to display modified gift page.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386660">More Info</a>.',
                    'main_opt_collectionpage': 'Collectionpage.<br>Check to modify collection page.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386661">More Info</a>.',
                    'main_opt_profilepage': 'Profile.<br>Check to add new actions to users profile page.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386662">More Info</a>.',
                    'main_opt_familypage': 'Familypage.<br>Check to add new actions to family page.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386663">More Info</a>.',
                    'main_opt_hidesocialmodule': 'Social.<br>Check to be in stealth mode.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386664">More Info</a>.',
                    'main_autoheal': 'Autoheal.<br>Check to use general auto-heal feature.<br>It only works when you\'re playing manually.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386666">More Info</a>.',
                    'main_autohealwhen': 'Autoheal.<br>Set the health amount to activate auto-heal.',
                    'main_autohealin': 'Autoheal.<br>Select which City\'s currency you want to use to be healed.',
                    'main_shortserviceid': 'Shortening.<br>Select the shortener service to use.<br>The services that require cross domain support only work in Firefox and Chrome with MWAddon plugin installed.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386668">More Info</a>.',
                    'privacy': 'Privacy.<br>Select the privacy configuration you want to use when publishing.',
                    'privacy_fl': 'Privacy.<br>Only friends in your selected friendlist will see your published streams.',
                    'main_publishpreview': 'Publish method.<br>Check it to use Facebook preview popup.<br>It allows you to publish in your wall only.<br>Uncheck it for silent mode.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386669">More Info</a>.'
                },
                
                // BATTLEFIELD
                'battlefield_popup': {
                    'bfopt_forcestartingcity': 'Starting city.<br>Check if you want to force the specified starting city.<br><br>Uncheck it if you\'re playing Mafia Wars in another tab and BattleField fight city will follow where you go in the other tab.<br><a href="http://userscripts.org/topics/88936">More Info</a>.',
                    'bfopt_startingcity': 'Starting city.<br>If you have checked "Start City", you will be forced to travel and to fight in the specified city.',
                    'bfopt_fightcitytime': 'Travel to cities.<br>Check if you want to travel to a different city after the specified time.<br>The cities used to travel are selected in the previous "Select Cities" control.',
                    'bfopt_fightcitytimeout': 'Travel to cities.<br>If "After" is checked, set the time you want to keep fighting before travelling.',
                    'bfopt_travelwhennotargets': 'Travel to cities.<br>Check if you want to travel to a different city when no opponents are found in current city.<br>The cities used to travel are selected in the previous "Select Cities" control.',
                    'bfopt_useheal': 'Autoheal.<br>Check to enable auto heal feature.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386631">More Info</a>.',
                    'bfopt_healin': 'Autoheal.<br>Select the city you want to use for Autoheal.<br>The selected city\'s currency will be used.',
                    'bfopt_healwhen': 'Autoheal.<br>Autoheal will heal you when your health goes below the specified amount.',
                    'bfopt_nohealiflowsta': 'Autoheal.<br>Check if you want to skip Autoheal when your stamina goes below a specified amount In selection box on right.',
                    'bfopt_minstaforheal': 'Autoheal.<br>Autoheal will not heal you if your stamina goes below the specified amount.<br>"Stamina Below" must be checked to use this function.',
                    'bfopt_nohealifattacking': 'Autoheal.<br>Check if you want to skip Autoheal when attacking the same player.<br>It can help to get your ice, but you can also ice/kill yourself.',
                    'bfopt_userapidfire': 'Rapid Fire.<br>Check to use Rapid Fire feature.<br>Use it along with Maximum Attacks.<br>Power Attack must be checked to enable Rapid Fire.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386632">More Info</a>.',
                    'bfopt_rapidfirewhen': 'Rapid Fire.<br>Select when you want to start Rapid Fire.<br>The higher you set it, the more possibilities you have to get an ice but it also costs you more stamina.<br>If you did not check "Maximum Attack", It can also cost you more Stamina.',
                    'bfopt_rapidfireprofile': 'Rapid Fire.<br>Select the Rapid Fire Aggressiveness.<br>The higher you set it, the more possibilities you have to get an ice but it also costs you more stamina.',
                    'bfopt_useattackcount': 'Maximum Attacks.<br>Check to use Maximum Attacks.<br>Use it if you\'ve checked Rapid Fire.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386633">More Info</a>.',
                    'bfopt_maximumattacks': 'Maximum Attacks.<br>Set the maximum attacks you would use on the same opponent.<br>The less you set it, the less stamina you will use per opponent.',
                    'bfopt_usepowerattack': 'Power Attack.<br>Check to enable Power Attack.<br>Use it if you want to use Rapid Fire.',
                    'bfopt_attackplayernpc': 'NPC Attack.<br>Check it if you want to fight non-player opponents added by Mafia Wars when you have an active mission availible.<br>You must also configure "Start City" to required city where they are hideing.',
                    'bfopt_healtimer': 'Autoheal.<br>Set the time you need to wait before you heal again after you\'ve been healed.<br>Set It to heal you just after healing is available, saving time instead of trying to heal every few seconds.<br>Normally it\'s 60 seconds for all players, you may want to set it to 61 sec\'s.',
                    'bfopt_useattackdelay': 'Attack delay.<br>Check to use a delay between attacks to same player.<br>Uncheck it if you\'re going for ices.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386634">More Info</a>.',
                    'bfopt_attackdelay': 'Attack delay.<br>Set the attack delay for same player.',
                    'bfopt_usenewplayerdelay': 'Attack delay.<br>Check to use a delay when you\'re ready to attack a new player.<br>This has low effect when going for ices, recommended to be checked.',
                    'bfopt_newplayerdelay': 'Attack delay.<br>Set the ready to attack delay.<br>Recomended to use at least 1 second.',
                    'bfopt_usebank': 'Autobanking.<br>Check to bank your cash.<br>You should check the cities which you want to enable Autobanking in the next "Select Cities" control.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386635">More Info</a>.',
                    'bfopt_usebankwhen': 'Autobanking.<br>Set the amount of cash you need to be collected before you Autobank it.',
                    'bfopt_disableplayercache': 'Player cache<br>Check to disable the player cache.<br>Battlefield is forced to attack fresh players.<br>If you\'ve used "Travel to" or "If no targets" you should disable the cache to travel more often.<br><br>Uncheck to use the player cache.<br>Battlefield will keep upto 20 valid opponents at the most to attack if no new opponents are found while attacking.<br>If you do not use "Travel to" or "If no targets" you should enable the cache by leaving this function unchecked so you don\'t run out of targets.',
                    'bfopt_attackwhenlost': 'Red ices.<br>Check to keep attacking a player when you lose. Attack the "BEAST".<br>The Red Ice term means that you can get an ice while losing the fights.<br>You will lose experience points, health and loot when attacking in this way.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386636">More Info</a>.',
                    'bfopt_attackwhenlostbut': 'Red ices.<br>Check to disable red ice if you need more attacks than specified.<br>It only works if "Attack when lost" is checked.',
                    'bfopt_attackwhenlostbutif': 'Red ices.<br>Set maximum attacks to enable red ice.<br>It only works "If attacks less than" is checked.',
                    'bfopt_keepattackafterwon': 'Red ices.<br>Sometimes you could lose a fight after you have won, your opponent suddenly got stronger by a boost or leveling up.<br>Check this to allow Red Ice mode for the current opponent after winning at least the first attack.<br>"This function can work Individually".',
                    'bfopt_takerevenge': 'Revenges.<br>Check to enable revenge feature.<br>This feature allows you to Auto attack the thief that has stolen your ice.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386637">More Info</a>.',
                    'bfopt_revengelevel': 'Revenges.<br>Check to skip revenges by level.',
                    'bfopt_revengelevelway': 'Revenges.<br>Select if the thief level should be greater or lower than specified.',
                    'bfopt_revengelevelof': 'Revenges.<br>If "lower" is selected, set here the highest level that you want to fight.<br>If "greater" is selected, set the lower level.<br>Set it to correspond with "Skip Users Level" filter on Page 2 Line 5a.',
                    'bfopt_norevengeblacklist': 'Revenges.<br>Check to skip revenges with players that are already added to your blacklist.',
                    'bfopt_autopublish': 'Autopublish.<br>Check to enable Autopublish feature.<br>It only works if you set silent mode, you should have deactivated "Use Facebook user interface." In "Configuration" menu, via "Publish tab".<br><a href="http://userscripts.org/topics/88936?page=1#posts-386639">More Info</a>.',
                    'bfopt_autopublishafter': 'Autopublish.<br>Select the amount of ices you need to archive before you publish it.',
                    'bfopt_autopublishin': 'Autopublish.<br>Set the group or page id where you want to Autopublish your ices or leave it blank for your wall.<br>When you\'re in the group/page, look in profile picture link, look for group_id=XXX, copy the XXX number. Add to box',
                    'bfopt_maxloglength': 'Log events.<br>Select the maximum amount of log events that will be displayed.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386640">More Info</a>.',
                    'bfopt_showsocialevents': 'Log events.<br>Check to enable showing social events in general log.<br>Uncheck it if you are going for long sessions to save Memory usage.',
                    'bfopt_showlootevents': 'Log events.<br>Check to enable showing loot events in general log.<br>Uncheck it if you are going for long sessions to save Memory usage.',
                    'bfopt_usenamefilter': 'Filtering.<br>Check to skip players by their names.<br>DONT use Family/clan tags here.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386641">More Info</a>.',
                    'bfopt_namefilterval': 'Filtering.<br>Used when "Name filter" is checked.<br>NORMAL: Any character will be considered as a filter.<br>REGEX: Use a valid regex syntax. Example: allowing only word/space/point<br>[^\\w\\s\\.]',
                    'bfopt_usefilterregex': 'Filtering.<br>Used by "Name filter" to enable Regex.<br>If you dont know what regex mean UNCHECK IT.',
                    'bfopt_usebadgefilter': 'Filtering.<br>Check to skip players by their badges.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386642">More Info</a>.',
                    'bfopt_badgefilterval': 'Filtering.<br>Set here those badge tiers you want to SKIP.<br>Example to skip diamond tiers 2 to 5 bagdes: diamond [2-5]<br>Example to skip ruby and diamond: ruby|diamond',
                    'bfopt_useskipifhealth': 'Skipping.<br>Check to skip a player if the health percentage is more than specified.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386644">More Info</a>.',
                    'bfopt_skipifhealth': 'Skipping.<br>Select the maximum health percentage allowed before you will attack an opponent.',
                    'bfopt_skipifotherdamage': 'Skipping.<br>Check if you want to skip a player that is under attack by other players.',
                    'bfopt_skipminimalcash': 'Skipping.<br>Check to skip players by the cash gained for each fight.<br>These players are known as "The Bank".<br><a href="http://userscripts.org/topics/88936?page=1#posts-386645">More Info</a>.',
                    'bfopt_minimalcash': 'Skipping.<br>If checked, set the minimal cash you should collect to keep attacking.<br>The maximum amount of cash that you can gain in a single fight is up to $65000 without bonuses (New York, Moscow, Vegas, Italy).<br>Keep in mind the cost factor in others cities make it lower.',
                    'bfopt_skipdiffcitycash': 'Skipping.<br>Check if you want to skip the current opponent when cash gained is from a different city.<br>This works very well if you\'re going for x5 loot in Brazil.',
                    'bfopt_skiplevel': 'Filtering by level.<br>Check to enable filtering by level.<br>Skip user levels "greater" or "lower" than the "selected amount".<br>And attack all players with a level "lower" or "greater" than your "selected amount". <a href="http://userscripts.org/topics/88933">More Info</a>.',
                    'bfopt_skiplevelway': 'Filtering by level.<br>Select if level should be greater or lower than specified.',
                    'bfopt_skiplevelof': 'Filtering by level.<br>Set the level number used by the "Skip users level" filter.<br>It only works if "Skip users level" is selected.',
                    'bfopt_skiplevelbut': 'Filtering by level.<br>Check to use a new condition to attack the players that were skipped by a level.<br>It only works if "Skip users level" is checked.<br><br>When a player is skipped by level you can create a new condition to attack them depending on their mafia. <a href="http://userscripts.org/topics/88933?page=1#posts-386610">More Info</a>.',
                    'bfopt_skiplevelbutway': 'Filtering by level.<br>Select if the mafia check should be greater or lower than specified.',
                    'bfopt_skipmafiaof': 'Filtering by mafia.<br>Set the mafia number used by the "Skip users mafia" filter.<br>It only works if "Skip users mafia" is selected.',
                    'bfopt_skiplevelbutmafia': 'Filtering by level.<br>Set the mafia number used to allow attacking a player.<br>It only works if "But attack if mafia" is selected.',
                    'bfopt_skipmafia': 'Filtering by mafia.<br>Check to enable filtering by mafia.<br>Skip user mafias "greater" or "lower than the "selected amount".<br>And attack all players with a mafia "lower" or "greater" than your "selected amount". <a href="http://userscripts.org/topics/88933?page=1#posts-386609">More Info</a>.',
                    'bfopt_skipmafiaway': 'Filtering by mafia.<br>Select if mafia filter should be greater or lower than specified.','bfopt_skipmafiaof': 'Filtering by mafia.<br>Set the mafia number used by the "Skip users mafia" filter.<br>It only works if "Skip users mafia" is selected.',
                    'bfopt_skipmafiabut': 'Filtering by mafia.<br>Check to use a new condition to attack the players that were skipped by mafia.<br>It only works if "Skip users mafia" is checked.<br><br>When a player is skipped by mafia you can create a new condition to attack them depending on their level. <a href="http://userscripts.org/topics/88933?page=1#posts-386611">More Info</a>.',
                    'bfopt_skipmafiabutway': 'Filtering by mafia.<br>Select if the level check should be greater or lower than specified.',
                    'bfopt_skipmafiabutlevel': 'Filtering by mafia.<br>Set the level number used to allow attacking a player.<br>It only works if "But attack if level" is selected.',
                    'bfopt_skipiced': 'Filtering.<br>Check to filter/skip player by an iced state.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386648">More Info</a>.',
                    'bfopt_skipicedplayers': 'Filtering.<br>Check to filter/skip players that were iced by you.',
                    'bfopt_skipifhealed': 'Skipping.<br>Check if you want to skip a fully healed player.<br>It DOES\'NT work if you have activated Rapid Fire.',
                    'bfopt_usestopwheniced': 'Autostop.<br>Check to stop when you archive a specified amount of session ices.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386649">More Info</a>.',
                    'bfopt_stopwheniced': 'Autostop.<br>Set the amount of session ices to archive to stop.',
                    'bfopt_stopwhenstamina': 'Autostop.<br>Check to stop when your stamina goes below a specified number.',
                    'bfopt_staminatokeep': 'Autostop.<br>Set the amount of stamina you want to keep.',
                    'bfopt_stopbeforelvlup': 'Autostop.<br>Check to stop before you raise a new level.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386650">More Info</a>.',
                    'bfopt_explefttostop': 'Autostop.<br>Set the amount of experience that you want to keep before level up.',
                    'bfopt_stopafterlevelup': 'Autostop.<br>Check to stop after you raise a new level.<br>It will stop and show the level up popup.',
                    'bfopt_keepfigthing': 'Autoresume.<br>Check to allow Battlefield to resume when it was stopped by any reason.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386652">More Info</a>.',
                    'bfopt_resumedelay': 'Autoresume.<br>Set the amount of minutes to wait before you resume Battlefield after it was stopped.',
                    'bfopt_fighttime': 'Autopause.<br>Check if you want to pause Battlefield after a specified time.<br>And set the time in the next Box.',
                    'bfopt_fighttimeout': 'Autopause.<br>Set the amount of time in minutes that you want to keep fighting before you pause Battlefield, Only works if previous box is checked.',
                    'bfopt_fighttimeoutresume': 'Autopause.<br>Set the amount of time in minutes to wait before you resume Battlefield when it was stopped by the Autopause feature.',
                    'bfopt_useblacklist': 'Blacklist.<br>Check to add players who defeat you to blacklist.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386653">More Info</a>.',
                    'bfopt_blacklist': 'Blacklist.<br>The balcklist is used to filter/skip players.<br>If you have an allience with a "player" add them here.<br>By default battlefield does not attack the Blacklist.',
                    'bfopt_addusertowlist': 'Whitelist.<br>Check to add players to whitelist when they drop a specified amount of cash after a full attack.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386654">More Info</a>.',
                    'bfopt_cashneedtogain': 'Whitelist.<br>Set the total amount of cash that you need to gain after you finished attacking a player for them to be added to whitelist.<br>Keep in mind that the cost factor in the city where you fight (Cuba, Bangkok, Brazil) will lower the total amount.',
                    'bfopt_usewlistattackcount': 'Whitelist.<br>Check if you want to attack the whole whitelist X times.<br>After attack the whole whitelist X times, you\'ll continue with Random BF Attacks.',
                    'bfopt_wlistattackcount': 'Whitelist.<br>If "Attack whitelist only" is checked, set here the amount of times that you want to attack the whole whitelist.<br>It will not attack the same Target again until the full list has circulated, Either listed or Randomly.',
                    'bfopt_randomizewhitelist': 'Whitelist.<br>Check to attack the whole whitelist in any random order.',
                    'bfopt_whitelist': 'Whitelist.<br>You can use the "Attack witelist" button to attack these players, it works like Rival list but allows a greater amount of players. ',
                    'bfopt_clantagfilterval': 'Family.<br>Set the filter for family tags.<br>You must add characters or words by lines.',
                    'bfopt_addtoclanlist': 'Family.<br>Working with Family Tag Filter.<br>Check to add the filtered families to your clan list.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386655">More Info</a>.',
                    'bfopt_skipfilteredclans': 'Family.<br>Working with Family Tag Filter.<br>Check to skip the filtered families.',
                    'bfopt_clanlistusage': 'Family.<br>Select how the Families listed in the clan list box below are used.<br>Normally it should be "Skipped" to avoid attacking your friendly families.',
                    'bfopt_clanlist': 'Family.<br>The Clan list is used to manage families.<br>If you just want to skip "freindly allies", add their families using the buttons on the right side of clan list.<br>Just add their profile link (located in the family profile page, copy and paste here) in the clan list and make sure the listed families box says "SKIPPED".'
                },
                
                // FREE GIFTS CENTER
                'freegiftscenter_popup': {
                    'filter_text': 'Searching.<br>Add a text word to search for.<br>You can add searches separated by the "|" character.<br>Example: join|build|mystery.',
                    'select_fbgroups': 'Scanning.<br>Select a facebook group to scan.<br>If you see only "My wall", click "Refresh" to get your facebook groups.<br>You must allow Mafia Wars to read your groups by giving permission.',
                    'fgopt_scantime': 'Scanning.<br>Set the time frame of scanned streams.<br>All streams with a created time greater than specified here will be skipped.',
                    'massive_input': 'Parsing.<br>Paste a set of links copied from a group or page to analyze and collect them.',
                    'fgopt_usefilter': 'Parsing.<br>Check if you want to search only for specified links.<br>You must add the gift names in the box below.<br>Seperated by a comma example:Secret,Exotic,Spree.',
                    'fgopt_filter': 'Parsing.<br>Add the gifts names to search for.<br>You must add the gifts separated by a comma.<br>Example:Secret,Exotic,Spree.',
                    'fgopt_remonsuccess': 'Remove facebook requests.<br>Check to remove a facebook request when it is successfully collected.',
                    'fgopt_remonignore': 'Remove facebook requests.<br>Check to remove a facebook request when you ignored it.',
                    'fgopt_sendthanksrequest': 'Send back.<br>Check to send gifts back.<br>It works only for gifts collected from your facebook requests page.',
                    'fgopt_sendbacktype': 'Send back.<br>Select the method to use when sending back.',
                    'fgopt_usebackgiftfilter': 'Send back.<br>Check to send back ONLY the specified gifts.<br>You must add the gift names in the box below.',
                    'fgopt_thanksbackfilter': 'Send back.<br>Set here the gifts names that you want to send back separated by "|" character.<br>Broad example:crime|mystery|Pack|Boost. Specific example:red mystery bag|stamina boost.',
                    'fgopt_skipduplicates': 'Collector.<br>Check this if you want Massive Collector to remove all the duplicate links.<br>This will make processing much faster and efficient.<br>If you are scanning your wall, do not be surprised if you have 5 or more duplicates for every 1 link!.',
                    'fgopt_ignorelimits': 'Collector.<br>Check to keep collecting a gift after the limits for it are reached.',
                    'fgopt_skipsameuser': 'Collector.<br>Check to skip gifts from users that you have collected from.<br>It only skips a gift when it\'s limited to 24hrs.<br>Crime Spree and others will still be collected from this user.<br>Uncheck to force Massive Collector to collect all links.',
                    'fgopt_masssendback': 'Collector.<br>Check to enable Massive Collector to send gifts back through facebook requests.',
                    'fgopt_collectnomafia': 'Collector.<br>Check to enable collecting from non-mafia members.<br>Use it to collect stadium links for example.<br>Otherwise keep it unchecked all time.',
                    'fgopt_csselect': 'Crime Spree.<br>Select the Step One.',
                    'fgopt_csreward': 'Crime Spree.<br>Select the Step Two.',
                    'fgopt_useexcludedgifts': 'Skipping.<br>Check to skip gifts that have been added to the excluded list.',
                    'fgopt_excludedpattern': 'Skipping.<br>Set the text pattern used to add gifts to your exclude list.<br>You can add different texts separated by "|" character.<br>Example: reached your limit|gold mastery'
                },
                
                // REMINDER EDITOR
                'remindereditor_popup': {
                    'setting_name': 'Reminder Editor.<br>Set the reminder name.',
                    'setting_description': 'Reminder Editor.<br>Set a description to remember the task.',
                    'setting_checktype': 'Reminder Editor.<br>Select if you want to check every X hours, or after X time clock every day.',
                    'setting_every': 'Reminder Editor.<br>Set the time in hours or the time clock.',
                    'setting_gotocity': 'Reminder Editor.<br>Check if you want to go to a specified city.',
                    'setting_gotocityid': 'Reminder Editor.<br>Select the city to travel.',
                    'setting_gotopage': 'Reminder Editor.<br>Check if you want to go to a specified page.',
                    'setting_gotopageurl': 'Reminder Editor.<br>Set the page url to go.<br>You can paste here the full url link copied from a link in Mafia Wars that directs you to the wanted page.',
                    'setting_runplugin': 'Reminder Editor.<br>Check to execute a pre-installed plugin.',
                    'setting_runpluginid': 'Reminder Editor.<br>Select the plugin to execute.',
                    'setting_resetonload': 'Reminder Editor.<br>Check if this reminder will be reset after a page load.',
                    'setting_resetonloadurl': 'Reminder Editor.<br>Set the page that will reset this reminder.<br>Same as "Go To Page", you can paste here a full url link of a Mafia Wars page.'
                },
                
                // PLUGIN MANAGER
                'pluginmanager_popup': {
                    'app_name': 'Plugin Manager.<br>Set the selected script app name.',
                    'app_code': 'Plugin Manager.<br>Paste the script code to be executed here.<br>You can also Drag n Drop app here.'
                },
                
                // MULTI GIFTER
                'multigifter_popup': {
                    'mgopt_giftpages': 'Pagination.<br>Check to enable pagination for items.',
                    'mgopt_userpages': 'Pagination.<br>Check to enable pagination for users.',
                    'mgopt_hidezeroamount': 'Item quantity.<br>Check to hide items with zero quantity.',
                    'mgopt_delay': 'Delay.<br>Set the time in seconds to wait to send a new gift.',
                    'gift_page': 'Pagination.<br>Select the page you want to go to.',
                    'user_page': 'Pagination.<br>Select the page you want to go to.',
                    'gift_category': 'Gift category.<br>Select the item group category to show.',
                    'user_category': 'User category.<br>Select the user group category to show.',
                    'collection_filter_type': 'Filtering.<br>Select a collection type to filter.',
                    'collection_filter': 'Filtering.<br>Select a collection name to filter.',
                    'search_gift': 'Searching.<br>Set a search to find gifts.<br>You can set here different searches separating every one by "|" character.',
                    'saved_search': 'Searching.<br>Use a previously saved search.',
                    'search_user': 'Searching.<br>Set a search to find users.<br>You can set here different searches separating every one by "|" character.'
                },
                
                // HOME FEED CENTER
                'homefeedcenter_popup': {
                    'hfopt_filter': 'Filtering.<br>Put a search text to filter your posts.<br>You can use "|" character to set diferent searches.<br>Example:Build|operation|mission.',
                    'hfopt_grouping': 'Filtering.<br>Select a group of posts to show.',
                    'hfopt_dogotowar': 'Helping.<br>Check it to help in published wars.<br> Click to open more options.',
                    'hfopt_dogivesocialhelp': 'Helping.<br>Check it to help in published jobs.<br>Click to open selection menu.',
                    'hfopt_dosocialmissions': 'Helping.<br>Check it to join in operations.<br>Click to open more options.',
                    'hfopt_doclaimbonusandreward': 'Helping.<br>Check it to claim/collect all bonuses and rewards published.<br>Click to open selection Menu.',
                    'hfopt_docollectloot': 'Helping.<br>Check it to collect published loots (actually this option is unnecesary).<br>Click to open search filter. One entry per line.',
                    'hfopt_dopropertyhelp': 'Helping.<br>Check it to help sending property parts.<br>Click to open selection menu.',
                    'hfopt_dogetboost': 'Helping.<br>Check it to help in levelup bonuses.',
                    'hfopt_dosendenergyandphones': 'Helping.<br>Check it to help sending rob phones and energy packs.',
                    'hfopt_doacceptgiftevent': 'Helping.<br>Check it to help in gift events.',
                    'hfopt_dohitlistbounty': 'Helping.<br>Check it to help in hitlist bounties.<br>Click to open selection by filter options.',
                    'hfopt_dosecretstash': 'Helping.<br>Check it to help in secret stashes.<br>Click to open selection by filter options.',            
                    'hfopt_docitycrew': 'Helping.<br>Check it to help your friends by joining their city crew.<br>Click to open selection by filter options.',
                    'hfopt_autoclose': 'General.<br>If checked, the help options you click "accept" the link will be autoclosed after a few seconds.',
                    'hfopt_feedslimit': 'General.<br>Set here the limit of posts you want to load when using "AutoHelp".',
                    'hfopt_maxloglength': 'General.<br>Set here the maximum number of log entries when using "AutoHelp".',
                    'hfopt_helpdelay': 'General.<br>Set here how much time you want to wait between helping.',
                    'hfopt_refreshdelay': 'General.<br>Set here how much time you want to wait before refreshing your home posts.',
                    'hfopt_waruseminattack': 'War help.<br>Check it if you want to collect only those items with more than the specified attack.',
                    'hfopt_warminattack': 'War help.<br>Set the minimum war reward item attack need to help in a war.',
                    'hfopt_warusemindefense': 'War help.<br>Check it if you want to collect only those items with more than the specified defense.',
                    'hfopt_warmindefense': 'War help.<br>Set the minimum war reward item defense need to help in a war.',
                    'hfopt_warusenamefilter': 'War help.<br>Check it to use war reward item\'s name to filter wars. If you check it, you should uncheck minimal attack/defense options.',
                    'hfopt_warnamefilter': 'War help.<br>Add war reward item\'s names separated by commas or "|" character.<br>Example:Paraglider|Sharksaw|emu Or Paraglider,Sharksaw,Emu.',
                    'hfopt_joinmission': 'Operations.<br>Select the slot type where you want to join.',
                    'hfopt_joinmissionafter': 'Operations.<br>If the previous slot type are not available, select a second slot type to join.',
                    'hfopt_maxfreeslots': 'Operations.<br>Select the maximum amount of free slots to join in an operation.',
                    'hfopt_opusenamefilter': 'Operations.<br>Check to filter operations by name.<br>You will try to join only the operations that match the filter name.',
                    'hfopt_opnamefilter': 'Operations.<br>Add operatons names separated by "|" character.<br>Example:<br>Fix The Tripple Crown|Steal Government Research',
                    'hfopt_dohitlistbounty_usefilter': 'Hitlist Bounty<br>Check to filter streams by user id.<br>Only the users added to the list below are helped.',
                    'hfopt_dohitlistbounty_filter': 'Hitlist Bounty<br>Add users by clicking the "Add" button.<br>Remove users by selecting them and clicking "Remove".<br><br><a href="http://userscripts.org/topics/88665">More Info.</a>',
                    'hfopt_dosecretstash_usefilter': 'Secret Stash<br>Check to filter streams by user id.<br>Only the users added to the list below are helped.',
                    'hfopt_dosecretstash_filter': 'Secret Stash<br>Add users by clicking the "Add" button.<br>Remove users by selecting them and clicking "Remove".<br><br><a href="http://userscripts.org/topics/88665">More Info.</a>',
                    'hfopt_docitycrew_usefilter': 'City Crew<br>Check to filter streams by user id.<br>Only the users added to the list below are helped.',
                    'hfopt_docitycrew_filter': 'City Crew<br>Add users by clicking the "Add" button.<br>Remove users by selecting them and clicking "Remove".<br><br><a href="http://userscripts.org/topics/88665">More Info.</a>',
                    'hfopt_dtlootpriority': 'Daily Take<br>Enter the EXACT name of the items you want ADDON to retrieve.<br>Put one item on each line in the order you want to retrieve them (the most important item first).<br>HINT: You can get the name of the item by hovering over it in the Daily Take window.',
                    'hfopt_dtcheckminatkdef': 'Daily Take<br>Check to retrieve fight loot if there is nothing that is on your Priority List available.<br>You can specify a minimum attack and defense.<br>If there is nothing that meets your specifications, the daily take will be ignored.'            
                }
            }
        },    
        'es_ES': {
            name: 'Spanish (Spain)',
            description: 'Spanish Tooltip v1.0<br><br>Created by <a href="http://userscripts.org/users/250944" target="_black">dakam</a>.',
            content: {
                // CONFIGURATION
                'config_popup': {
                    'main_checkforupdates': 'Updates.<br>Selecciona esta opción si deseas que se te avise cuando se encuentren nuevas actualizaciones.',
                    'main_autoheal': 'Autoheal.<br>Marca esta opción para activar "Autoheal", el cual te curará cuando tu vida baje de un determinado nivel.',
                    'main_autohealwhen': 'Autoheal.<br>Pon aquí cuanta vida deseas tener para que Autoheal te cure.',
                    'main_autohealin': 'Autoheal.<br>Selecciona donde deseas que Autoheal te cure.',
                    'main_usebitly': 'Shortening.<br>Marca esta opción si deseas usar el servicio bit.ly para acortar tus enlaces.',
                    'main_api_bit_ly_login': 'Shortening.<br>Pon aquí el nombre de tu cuenta bit.ly.',
                    'main_api_bit_ly_key': 'Shortening.<br>Pon aquí la llave (key) de tu cuenta bit.ly.',
                    'privacy': 'Privacy.<br>Selecciona el tipo de privacidad que deseas usar para publicar en tu muro.',
                    'privacy_fl': 'Privacy.<br>Selecciona la lista de amigos que verán tus publicaciones.',
                    'main_publishpreview': 'Publish method.<br>Marca esta opción solo si tienes problemas, la mayoría de las funciones de MWAddon requiere que esté desactivada.'
                },
                
                // BATTLEFIELD
                'battlefield_popup': {
                    'bfopt_forcestartingcity': 'Starting city.<br>Marca esta opción si deseas comenzar a luchar en la ciudad especificada.',
                    'bfopt_startingcity': 'Starting city.<br>Selecciona en que ciudad deseas empezar a luchar.',
                    'bfopt_fightcitytime': 'Travel to cities.<br>Marca esta opción si quieres viajar a otras ciudades después de un determinado tiempo.<br>Las ciudades las puedes seleccionar en el control "Select Cities".',
                    'bfopt_fightcitytimeout': 'Travel to cities.<br>Pon aquí el tiempo que te mantendrás luchando en la misma ciudad antes de viajar.',
                    'bfopt_travelwhennotargets': 'Travel to cities.<br>Marca esta opción si quieres viajar a una ciudad diferente cuando no se encuentran enemigos.<br>Las ciudades las puedes seleccionar en el control "Select Cities".',
                    'bfopt_useheal': 'Autoheal.<br>Marca esta opción para activar Autoheal.',
                    'bfopt_healin': 'Autoheal.<br>Selecciona donde quieres que Autoheal te cure.',
                    'bfopt_healwhen': 'Autoheal.<br>Pon aquí como de baja debes tener la vida para que Autoheal te cure.',
                    'bfopt_nohealiflowsta': 'Autoheal.<br>Marca esta opción si no quieres que Autoheal te cure cuando tu stamina baja a una determinada cantidad.',
                    'bfopt_minstaforheal': 'Autoheal.<br>Pon aquí como de baja debe ser tu stamina para desactivar Autoheal.',
                    'bfopt_nohealifattacking': 'Autoheal.<br>Marca esta opción para desactivar Autoheal cuando atacas a un mismo jugador.<br>Esto te ayudará a obtener el ice pero por contra puedes hacerte ice/kill tu mismo.',
                    'bfopt_userapidfire': 'Rapid Fire.<br>Marca esta opción si quieres activar Rapid Fire.',
                    'bfopt_rapidfirewhen': 'Rapid Fire.<br>Selecciona como de baja debe tener la vida tu oponente en porcentaje para usar Rapid Fire.<br>A más alto pongas esto, más posibilidades de obtener un ice, pero por contra puedes gastar una cantidad muy elevada de stamina con el mismo jugador, sobretodo si no tienes configurado "Maximunm Attacks".',
                    'bfopt_rapidfireprofile': 'Rapid Fire.<br>Selecciona como de agresivo será Rapid Fire.<br>A más alto pongas esto, más posibilidades de obtener un ice pero por contra, puedes gastar un poco más de stamina.',
                    'bfopt_useattackcount': 'Maximum Attacks.<br>Marca esta opción para activar "Maximum Attacks".',
                    'bfopt_maximumattacks': 'Maximum Attacks.<br>Pon aquí la cantidad máxima de ataques que permitirás que haga Battlefield a un mismo jugador.<br>A menos cantidad, menos gasto de stamina por jugador.',
                    'bfopt_usepowerattack': 'Power Attack.<br>Marca esta opción para activar "Power Attack".<br>Esta opción es requerida para poder usar "Rapid Fire".',
                    'bfopt_attackplayernpc': 'NPC Attack.<br>Marca esta opción para atacar a jugadores controlados por la máquina que aparecen en tu lista de enemigos cuando estás haciendo una misión.',
                    'bfopt_healtimer': 'Autoheal.<br>Pon aquí la cantidad de segundos que debes esperar antes de curarte después de haberte curado.<br>Normalmente para todos los jugadores es 60 segundos, así que mantén esta opción en 60 si no sabes que poner.',
                    'bfopt_useattackdelay': 'Attack delay.<br>Marca esta opción para activar el retraso para ataques a un mismo jugador.<br>Si estás intentando obtener ices, desmárcala.',
                    'bfopt_attackdelay': 'Attack delay.<br>Selecciona los segundos de retraso entre ataques a un mismo jugador.',
                    'bfopt_usenewplayerdelay': 'Attack delay.<br>Marca esta opción para activar el retraso de ataque a un nuevo jugador.',
                    'bfopt_newplayerdelay': 'Attack delay.<br>Selecciona los segundos de retraso cuando vas a atacar a un jugador diferente.',
                    'bfopt_usebank': 'Autobanking.<br>Marca esta opción para activar Autobanking (esto depositará tu dinero en el banco).',
                    'bfopt_usebankwhen': 'Autobanking.<br>Pon aquí la cantidad de dinero acumulada para que Autobanking la meta en el banco.',
                    'bfopt_disableplayercache': 'Player cache<br>Márcalo para desactivar la caché de jugadores.<br>Cuando atacas a un jugador la primera vez, obtienes una lista de jugadores nuevos, al desactivar esta opción forzarás que se ataquen solo a esos jugadores.<br><br>Desmárcalo para usar la caché.<br>Si usas la caché, Bttlefield mantendrá hasta a 20 jugadores como mucho en reserva para atacarlos mientras busca nuevos jugadores.',
                    'bfopt_attackwhenlost': 'Red ices.<br>Marca esta opción para activar "Red ice".<br>Esto atacará jugadores con los que pierdas.',
                    'bfopt_attackwhenlostbut': 'Red ices.<br>Marca esta opción para atacar a un jugador con el que pierdes solo si necesitas una cantidad determinada de ataques para obtener tu ice.',
                    'bfopt_attackwhenlostbutif': 'Red ices.<br>Pon aquí la cantidad de ataques necesarios para obtener tu ice cuando atacas perdiendo.',
                    'bfopt_keepattackafterwon': 'Red ices.<br>Marca esta opción para continuar atacando a un jugador con el que pierdes pero al que ganaste al menos el primer combate.',
                    'bfopt_takerevenge': 'Revenges.<br>Marca esta opción para activar "Revenge".<br>Esto atacará a los jugadores que te roben algún ice.',
                    'bfopt_revengelevel': 'Revenges.<br>Marca esta opción si quieres filtrar por nivel a que jugadores atacar por medio de "Revenge".',
                    'bfopt_revengelevelway': 'Revenges.<br>Selecciona si el nivel deberá ser superior o inferior al indicado.',
                    'bfopt_revengelevelof': 'Revenges.<br>Pon aquí el nivel que se usará para filtrar los jugadores que te robaron un ice.',
                    'bfopt_norevengeblacklist': 'Revenges.<br>Marca esta opción para no atacar a los jugadores que te robaron un ice y se encuentran en tu lista negra (blacklist).',
                    'bfopt_autopublish': 'Autopublish.<br>Marca esta opción para activar Autopublish.<br>Esto publicará un determinado número de ices en tu muro o un grupo/página que especifiques.',
                    'bfopt_autopublishafter': 'Autopublish.<br>Selecciona el número de ices que deseas publicar.',
                    'bfopt_autopublishin': 'Autopublish.<br>Pon aquí el ID del grupo o página en el que deseas publicar.<br>Debe se un número. Para publicar en tu muro déjalo en blanco.',
                    'bfopt_maxloglength': 'Log events.<br>Selecciona el número de eventos que se montrarán en el log general.',
                    'bfopt_showsocialevents': 'Log events.<br>Márcalo para mostrar eventos sociales en el log general.',
                    'bfopt_showlootevents': 'Log events.<br>Márcalo para mostrar eventos de loot (objetos que obtienes) en el log general.',
                    'bfopt_usenamefilter': 'Filtering.<br>Márcalo para activar el filtro por nombres.',
                    'bfopt_namefilterval': 'Filtering.<br>Pon aquí el filtro para los nombres.<br>NORMAL: cada caracter que ponges se considerará un filtro.<br>REGEX: Debes poner un regex válido.',
                    'bfopt_usefilterregex': 'Filtering.<br>Márcalo para utilizar regex ewn el filtro por nombres.<br>Si no sabes como añadir un regex, desmárcalo.',
                    'bfopt_usebadgefilter': 'Filtering.<br>Márcalo para user filtro por insignias.',
                    'bfopt_badgefilterval': 'Filtering.<br>Pon aquí el filtro que usarás para filtrar tus oponentes por insignias.<br>Por ejemplo, "diamond [2-5]" omitirá cualquier jugador que tenga el tier diamond en nivel de 2 a 5.',
                    'bfopt_useskipifhealth': 'Skipping.<br>Márcalo para activar el filtro por nivel de vida.',
                    'bfopt_skipifhealth': 'Skipping.<br>Selecciona el nivel de vida máximo que tendrá tu oponente en porcentaje para atacarlo.',
                    'bfopt_skipifotherdamage': 'Skipping.<br>Márcalo para omitir jugadores que han sido dañados por otros jugadores.',
                    'bfopt_skipminimalcash': 'Skipping.<br>Márcalo para activar el filtro por dinero.',
                    'bfopt_minimalcash': 'Skipping.<br>Pon aquí cuanto dinero debe soltar tu enemigo para continuar atacándolo.',
                    'bfopt_skipdiffcitycash': 'Skipping.<br>Márcalo para dejar de atacar a un jugador que suelta dinero de una ciudad diferente en la que luchas.<br>Esta opción e smuy util para obtener objetos en Brazil x 5.',
                    'bfopt_skiplevel': 'Filtering by level.<br>Márcalo para activar el filtro por nivel.',
                    'bfopt_skiplevelway': 'Filtering by level.<br>Selecciona si el nivel debe ser mayor o menor que el indicado.',
                    'bfopt_skiplevelof': 'Filtering by level.<br>Pon aquí el nivel que se comprobará en el filtro.',
                    'bfopt_skiplevelbut': 'Filtering by level.<br>Márcalo para activar el chequeo de mafia para jugadores filtrados por su nivel.',
                    'bfopt_skiplevelbutway': 'Filtering by level.<br>Selecciona si la mafia debe ser mayor o menor que el indicado.',
                    'bfopt_skiplevelbutmafia': 'Filtering by level.<br>Pon aquí el número de mafia que se comprobará cuando un jugador ha sido filtrado por nivel.',
                    'bfopt_skipmafia': 'Filtering by mafia.<br>Márcalo para activar el filtro por mafia.',
                    'bfopt_skipmafiaway': 'Filtering by mafia.<br>Selecciona si la mafia debe ser mayor o menor que el indicado.',
                    'bfopt_skipmafiaof': 'Filtering by mafia.<br>Pon aquí el número de mafia que se comprobará en el filtro.',
                    'bfopt_skipmafiabut': 'Filtering by mafia.<br>Márcalo para activar el chequeo de nivel para jugadores filtrados por su mafia.',
                    'bfopt_skipmafiabutway': 'Filtering by mafia.<br>Selecciona si el nivel debe ser mayor o menor que el indicado.',
                    'bfopt_skipmafiabutlevel': 'Filtering by mafia.<br>Pon aquí el nivel que se comprobará para jugadores filtrados por su mafia. ',
                    'bfopt_skipiced': 'Filtering.<br>Márcalo para omitir jugadores que ya están iced.',
                    'bfopt_skipicedplayers': 'Filtering.<br>Márcalo para omitir jugadores a los que ya les hiciste un ice.',
                    'bfopt_skipifhealed': 'Skipping.<br>Márcalo para omitir jugadores que se han curado.<br>Esta opción no funciona si tienes activado Rapid Fire.',
                    'bfopt_usestopwheniced': 'Autostop.<br>Márcalo para activar el paro por acumulación de ices.',
                    'bfopt_stopwheniced': 'Autostop.<br>Pon aquí cuantos ices quieres obtener antes de parar de atacar.',
                    'bfopt_stopwhenstamina': 'Autostop.<br>Márcalo para activar el paro por stamina.',
                    'bfopt_staminatokeep': 'Autostop.<br>Pon aquí cuanta stamina deseas conservar.',
                    'bfopt_stopbeforelvlup': 'Autostop.<br>Márcalo para parar Battlefield antes de subir de nivel.',
                    'bfopt_explefttostop': 'Autostop.<br>Pon aquí cuanta experiencia deseas conservar.',
                    'bfopt_stopafterlevelup': 'Autostop.<br>Márcalo para parar Battlefield después de subir de nivel.',
                    'bfopt_keepfigthing': 'Autoresume.<br>Márcalo para continuar luchando después de que se haya parado.',
                    'bfopt_resumedelay': 'Autoresume.<br>Pon aquí el tiempo en minutos que debe esperar antes de resumir la lucha.',
                    'bfopt_fighttime': 'Autopause.<br>Márcalo para activar el modo de pausa.',
                    'bfopt_fighttimeout': 'Autopause.<br>Pon aquí cuantos minutos debes mantenerte luchando antes de pausar.',
                    'bfopt_fighttimeoutresume': 'Autopause.<br>Pon aquí los minutos que esperarás antes de resumir la lucha.',
                    'bfopt_useblacklist': 'Blacklist.<br>Márcalo para añadir los luchadoes que te ganen a tu lista negra.',
                    'bfopt_blacklist': 'Blacklist.<br>La lista negra se usa para añadir los jugadores a los que no quieres atacar.',
                    'bfopt_addusertowlist': 'Whitelist.<br>Márcalo para añadir jugadores a la lista blanca.',
                    'bfopt_cashneedtogain': 'Whitelist.<br>Después de haber terminado de atacar a un jugador, pon aquí la cantidad de dinero que debe soltar para añadirlo a la lista blanca automaticamente.',
                    'bfopt_usewlistattackcount': 'Whitelist.<br>Márcalo para atacar la lista blanca solo el número de veces especificado.<br>Después de atacar la lista blanca las veces especificadas, se continuará atacando de forma normal a otros jugadores.',
                    'bfopt_wlistattackcount': 'Whitelist.<br>Si has marcado "Attack whitelist only", pon aquí las veces que quieres atacar la lista blanca.',
                    'bfopt_randomizewhitelist': 'Whitelist.<br>Márcalo para atacar la lista blanca de forma aleatoria.',
                    'bfopt_whitelist': 'Whitelist.<br>La lista blanca se usa para añadir jugadores a los que quieres atacar más adelante.',
                    'bfopt_clantagfilterval': 'Family.<br>El filtro de familia se usa para no atacar a los jugadores que pertenezcan a una familia determinada.',
                    'bfopt_addtoclanlist': 'Family.<br>Márcalo para añadir las familias que filtras a tu lista de clanes.',
                    'bfopt_skipfilteredclans': 'Family.<br>Márcalo para omitir la lucha a los jugadores que pertenezcan a una familia filtrada.',
                    'bfopt_clanlistusage': 'Family.<br>Selecciona como se usará tu lista de clanes.<br>Normalmente se usa para no atacar a jugadores que pertenezcan a las familias que añades en la lista, por ello se selecciona "Skipped".',
                    'bfopt_clanlist': 'Family.<br>La lista de clanes se usa para añadir familias a las que no quieres atacar o deseas atacar.'
                },
                
                // FREE GIFTS CENTER
                'freegiftscenter_popup': {
                    'filter_text': 'Filtering.<br>Usa este filtro para mostrar solo algunos regalos.',
                    'select_fbgroups': 'Scanning.<br>Selecciona aquí el grupo que deseas escanear.<br>Si solo ves "My wall", pulsa en "Refresh".',
                    'fgopt_scantime': 'Scanning.<br>Pon aquí el tiempo que tendrá como máximo un posts para escanearlo.',
                    'massive_input': 'Parsing.<br>Aquí puedes pegar todos los enlaces que encuentres de tus amigos para de una página.',
                    'fgopt_usefilter': 'Parsing.<br>Márcalo para activar el filtro de regalos.',
                    'fgopt_filter': 'Parsing.<br>Añade aquí los regalos que deseas mostrar.<br>Separa cada regalo por el caracter "|".',
                    'fgopt_remonsuccess': 'Remove facebook requests.<br>Márcalo para quitar una petición de facebook tras aceptarla.',
                    'fgopt_remonignore': 'Remove facebook requests.<br>Márcalo para quitar una petición de facebook tras ignorarla.',
                    'fgopt_sendthanksrequest': 'Send back.<br>Márcalo para devolver regalos de facebook tras aceptar un regalo.',
                    'fgopt_sendbacktype': 'Send back.<br>Selecciona por medio de que deseas devolver los regalos.',
                    'fgopt_usebackgiftfilter': 'Send back.<br>Márcalo para activar el filtro de regalos usado para devolverlos.',
                    'fgopt_thanksbackfilter': 'Send back.<br>Pon aquí los nombres de los regalos que deseas filtrar.<br>Usa "|" para separarlos.',
                    'fgopt_ignorelimits': 'Collector.<br>Márcalo para ignorar los regalos que llegan a su límite diario y seguir abriendolos.',
                    'fgopt_skipsameuser': 'Collector.<br>Márcalo para no recoger regalos del mismo usuario cuando ya le abriste.',
                    'fgopt_masssendback': 'Collector.<br>Márcalo para devolver regalos a través de facebook después de abrirlos.',
                    'fgopt_collectnomafia': 'Collector.<br>Márcalo para abrir relgalos de gente que no está en tu mafia.',
                    'fgopt_csselect': 'Crime Spree.<br>Selecciona aquí el Paso 1 cuando abres un Crime Spree.',
                    'fgopt_csreward': 'Crime Spree.<br>Selecciona aquí el Paso 2 cuando abres un Crime Spree.',
                    'fgopt_useexcludedgifts': 'Skipping.<br>Márcalo para activar la lista de excluidos.',
                    'fgopt_excludedpattern': 'Skipping.<br>Pon aquí el texto que aparecerá tras abrir un regalo que hará que este sea añadido a la lista de excluidos.<br>Usa "|" para añadir varios textos diferentes.'
                },
                
                // REMINDER EDITOR
                'remindereditor_popup': {
                    'setting_name': 'Reminder Editor.<br>Pon aquí el nombre del recordatorio.',
                    'setting_description': 'Reminder Editor.<br>Pon aquí una descripción del recordatorio.',
                    'setting_checktype': 'Reminder Editor.<br>Selecciona si quieres que se te recuerde cada X horas (every) o a una hora fija del reloj (at).',
                    'setting_every': 'Reminder Editor.<br>Pon aquí las horas, o la hora del día que se te recordara.',
                    'setting_gotocity': 'Reminder Editor.<br>Márcalo para viajar a una ciudad.',
                    'setting_gotocityid': 'Reminder Editor.<br>Selecciona la ciudad a la que viajarás.',
                    'setting_gotopage': 'Reminder Editor.<br>Márcalo para ir a una página de Mafia Wars.',
                    'setting_gotopageurl': 'Reminder Editor.<br>Pon aquí la página a la que irás.<br>Puedes copiar y pegar cualquier dirección que apunte a una página de Mafia Wars.',
                    'setting_runplugin': 'Reminder Editor.<br>Márcalo para usar un plugin previamente añadido.',
                    'setting_runpluginid': 'Reminder Editor.<br>Selecciona el plugin que deseas ejecutar.',
                    'setting_resetonload': 'Reminder Editor.<br>Márcalo si quieres resetear este recordatorio cuando cargues una página en Mafia Wars.',
                    'setting_resetonloadurl': 'Reminder Editor.<br>Pon aquí la página que reseteará el recordatorio.<br>Puedes copiar y pegar cualquier dirección que apunte a una página de Mafia Wars.'
                },
                
                // PLUGIN MANAGER
                'pluginmanager_popup': {
                    'app_name': 'Plugin Manager.<br>Pon aquí el nombre del plugin.',
                    'app_code': 'Plugin Manager.<br>Añade aquí el código del script que deseas ejecutar.'
                },
                
                // MULTI GIFTER
                'multigifter_popup': {
                    'mgopt_giftpages': 'Pagination.<br>Márcalo para paginar la lista de objetos.',
                    'mgopt_userpages': 'Pagination.<br>Márcalo para paginar la lista de amigos.',
                    'mgopt_hidezeroamount': 'Item quantity.<br>Márcalo para esconder los objetos que tengan una cantidad de cero.',
                    'mgopt_delay': 'Delay.<br>Pon aquí el retraso para enviar regalos.',
                    'gift_page': 'Pagination.<br>Selecciona la página que deseas ver.',
                    'user_page': 'Pagination.<br>Selecciona la página que deseas ver.',
                    'gift_category': 'Gift category.<br>Selecciona que categoría deseas ver.',
                    'user_category': 'User category.<br>Selecciona que categoría deseas ver.',
                    'collection_filter_type': 'Filtering.<br>Selecciona el tipo de filtro para las colecciones.',
                    'collection_filter': 'Filtering.<br>Selecciona el nombre de la colección que deseas ver.',
                    'search_gift': 'Searching.<br>Usa una búsqueda para encontrar objetos.',
                    'saved_search': 'Searching.<br>Selecciona una búsqueda previamente guardada.',
                    'search_user': 'Searching.<br>Usa una búsqueda de amigos.'
                },
                
                // HOME FEED CENTER
                'homefeedcenter_popup': {
                    'hfopt_filter': 'Filtering.<br>Puedes añadir un filtro para ver determinadas publicadiones.',
                    'hfopt_grouping': 'Filtering.<br>Selecciona un grupo de publicaciones que quieras ver.',
                    'hfopt_dogotowar': 'Helping.<br>Márcalo para ayudar en las guerras.',
                    'hfopt_dogivesocialhelp': 'Helping.<br>Márcalo para ayudar en los trabajos.',
                    'hfopt_dosocialmissions': 'Helping.<br>Márcalo para meterte en las operaciones.',
                    'hfopt_doclaimbonusandreward': 'Helping.<br>Márcalo para reclamar bonus y premios.',
                    'hfopt_docollectloot': 'Helping.<br>Esta opción ya no es necesaria. desmárcala.',
                    'hfopt_dopropertyhelp': 'Helping.<br>Márcalo para ayudar enviando partes.',
                    'hfopt_dogetboost': 'Helping.<br>Márcalo para obtener bonus de los level up.',
                    'hfopt_dosendenergyandphones': 'Helping.<br>Márcalo para enviar teléfonos y paquetes de energía.',
                    'hfopt_doacceptgiftevent': 'Helping.<br>Márcalo para aceptar regalos de un evento.',
                    'hfopt_dohitlistbounty': 'Helping.<br>Márcalo para ayudar en las recompensas.',
                    'hfopt_dosecretstash': 'Helping.<br>Márcalo para ayudar en los alijos secretos.',
                    'hfopt_docitycrew': 'Helping.<br>Márcalo para ayudar en los city crew.',
                    'hfopt_autoclose': 'General.<br>Si está activado, cuando aceptes ayduar en una publicación esta se cerrará después de un corto tiempo.',
                    'hfopt_feedslimit': 'General.<br>Pon aquí el límite de publicaciones que cargará el Autohelp.',
                    'hfopt_maxloglength': 'General.<br>Selecciona el máximo de publicaciones realizadas que mostrará el log.',
                    'hfopt_helpdelay': 'General.<br>Selecciona el tiempo de retraso entre que ayudas en una publicación y otra.',
                    'hfopt_refreshdelay': 'General.<br>Selecciona el tiempo de retraso para refrescar las publicaciones de tu muro.',
                    'hfopt_waruseminattack': 'War help.<br>Márcalo para omitir una guerra si el regalo tiene un ataque inferior.',
                    'hfopt_warminattack': 'War help.<br>Pon aquí el ataque mínimo del regalo para ayudar en las guerras.',
                    'hfopt_warusemindefense': 'War help.<br>Márcalo para omitir una guerra si el regalo tiene una defensa inferior.',
                    'hfopt_warmindefense': 'War help.<br>Pon aquí la defensa mínima del regalo para ayudar en las guerras.',
                    'hfopt_warusenamefilter': 'War help.<br>Márcalo para activar el filtro por nombre.<br>Si marcas esta opción desactiva las dos anteriores.',
                    'hfopt_warnamefilter': 'War help.<br>Añade los nombres de los regalos que deseas obtener de las guerras separados por "|".',
                    'hfopt_joinmission': 'Operations.<br>Selecciona en que tipo de hueco quires meterte cuando entras en una operación.',
                    'hfopt_joinmissionafter': 'Operations.<br>Selecciona en que tipo de hueco quires meterte cuando entras en una operación, si el anterior no es posible.',
                    'hfopt_maxfreeslots': 'Operations.<br>Selecciona el límite máximo de huecos libres que puede tener una operación para que te metas en ella.',
                    'hfopt_missionfilter': 'Operations.<br>Puedes añadir filtros para nombres de operaciones separados por "|".',
                    'hfopt_citycrewfilter': 'City Crew.<br>Puedes añadir filtros para nombres de amigos a los que ayudar separados por "|".'
                }
            }
        },
        'de_DE': {
            name: 'Deutsch (Deutschland)',
            description: 'German Tooltip v1.1<br><br>Created by <a href="http://www.facebook.com/am082" target="_black">Andreas Maurer</a>.<br>Revision by <a href="http://www.facebook.com/Helvetica.Clan" target="_black">Helvetica Clan</a>.',
            content: {
                // CONFIGURATION
                'config_popup': {
                    'main_checkforupdates': 'Updates.<br>Aktivieren, um auf die Verfügbarkeit neuer Updates zu prüfen.',
                    'main_autoheal': 'Autoheal.<br>Auswählen, um die AutoHeal-Funktion zu aktivieren.<br>Funktioniert nur bei manuellem spielen.',
                    'main_autohealwhen': 'Autoheal.<br>Health Wert, der unterschritten werden muss für AutoHeal.',
                    'main_autohealin': 'Autoheal.<br>Auswählen, wo Du Dich heilen willst.',
                    'main_shortserviceid': 'Shortening.<br>Wähle den Dienst zum Links kürzen.<br>Die Dienste die Cross-Domains verwenden funktionieren nur in Firefox und Chrome mit dem MWAddon plugin.',
                    'privacy': 'Privacy.<br>Standard für das Posten der Beiträge auswählen.',
                    'privacy_fl': 'Privacy.<br>Nur Freunde in Deiner ausgewählten Freundesliste können deine Beiträge sehen.',
                    'main_publishpreview': 'Publish method.<br>Auswählen, um das Facebook-Vorschaufenster anzuzeigen.<br>Ermöglicht das Posten auf Deiner Wall.'
                },
                
                // BATTLEFIELD
                'battlefield_popup': {
                    'bfopt_forcestartingcity': 'Starting city.<br>Aktivieren, wenn Du eine Stadt zu Beginn setzen willst.<br>Nicht auswählen, wenn Du in einem anderen Fenster Mafia Wars spielen willst.',
                    'bfopt_startingcity': 'Starting city.<br>Wenn Du "Start City" aktiviert hast, erfolgt ein Wechsel zu der ausgewählten Stadt.',
                    'bfopt_fightcitytime': 'Travel to cities.<br>Aktivieren, um nach der eingestellten Zeit zu einer anderen Stadt zu wechseln.<br>Es werden die Städte verwendet, die vorher bei "Select Cities" ausgewählt wurden.',
                    'bfopt_fightcitytimeout': 'Travel to cities.<br>Wenn "After" aktiviert ist, lege die Zeit fest, die gefightet wird, bevor die Stadt gewechselt werden soll.',
                    'bfopt_travelwhennotargets': 'Travel to cities.<br>Aktivieren, um die Stadt zu wechseln wenn in der aktuellen keine Gegner mehr gefunden werden.<br>Es werden die Städte verwendet, die vorher bei "Select Cities" ausgewählt wurden.',
                    'bfopt_useheal': 'Autoheal.<br>Aktivieren, um Dich automatisch zu heilen.',
                    'bfopt_healin': 'Autoheal.<br>Stadt auswählen, in der Du dich heilen willst.',
                    'bfopt_healwhen': 'Autoheal.<br>Health Wert eingeben: Heilen, wenn der Wert unterschritten wird.',
                    'bfopt_nohealiflowsta': 'Autoheal.<br>Aktivieren, um das Automatische Heilen zu deaktivieren bei weniger Stamina als eingestellt.',
                    'bfopt_minstaforheal': 'Autoheal.<br>Autoheal deaktivieren bei weniger Stamina als hier eingegeben.',
                    'bfopt_nohealifattacking': 'Autoheal.<br>Aktivieren, um das automatische Heilen zu deaktivieren, solange der gleiche Gegner angegriffen wird.<br>Kann helfen, um ein ICE zu bekommen, aber Du kannst dich dabei selber ICEN oder KILLEN.',
                    'bfopt_userapidfire': 'Rapid Fire.<br>Aktivieren der Rapid Fire Funktion.<br>Zusammen mit Maximum Attacks verwenden.<br>Power Attack muss aktiviert sein, um Rapid Fire zu verwenden.',
                    'bfopt_rapidfirewhen': 'Rapid Fire.<br>Auswählen, wann Rapid Fire gestartet wird.<br>Je höher das gesetzt ist, desto eher gibts ein ICE, aber es kostet Dich mehr Stamina.<br>Wenn "Maximum Attack" nicht aktiviert ist, wird Deine Stamina verschwendet bei einem Spieler den Du nicht alleine ICEN kannst.',
                    'bfopt_rapidfireprofile': 'Rapid Fire.<br>Auswählen der Rapid Fire Aggressivität.<br>Je höher das gesetzt ist desto eher gibts ein ICE aber es kostet Dich mehr Stamina.',
                    'bfopt_useattackcount': 'Maximum Attacks.<br>Aktivieren, um Maximum Attacks einzuschränken.<br>Aktivieren wenn Du Rapid Fire aktiviert hast.',
                    'bfopt_maximumattacks': 'Maximum Attacks.<br>Maximale Angriffe auf den gleichen Gegner.<br>Je weniger Du eingibst, desto weniger Stamina wird pro Gegner verbraucht.',
                    'bfopt_usepowerattack': 'Power Attack.<br>Aktivieren der Power Attack Funktion.<br>Aktivieren, um Rapid Fire zu verwenden.',
                    'bfopt_attackplayernpc': 'NPC Attack.<br>Aktivieren, um Gegner von Missionen anzugreifen. Das sind keine normalen Spieler. (ohne Mafiagrößenangabe)',
                    'bfopt_healtimer': 'Autoheal.<br>Zeit eingeben, nach der wieder geheilt werden darf nach dem letzten Heilen<br>Heilt Dich, wenn es wieder möglich ist. Speichere die Zeit, nach der Du Dich frühestens wieder Heilen kannst.<br>Normalerweise sind es 60 Sekunden für alle Spieler. Die Zeit kann durch Bonus verkürzt werden.(Brazil Mastery)',
                    'bfopt_useattackdelay': 'Attack delay.<br>Aktivieren, um eine Zeit zu setzen bis zum nächsten Angriff auf den gleichen Spieler.<br>Nicht aktivieren, um ein ICE zu bekommen.',
                    'bfopt_attackdelay': 'Attack delay.<br>Pause zwischen zwei Angriffen auf den gleichen Gegner.',
                    'bfopt_usenewplayerdelay': 'Attack delay.<br>Aktivieren, um eine Pause zu machen, bis der nächste Gegner angegriffen wird.<br>Hat keinen Einfluss, viele ICE zu erhalten .',
                    'bfopt_newplayerdelay': 'Attack delay.<br>Zeit für die Pause eingeben.<br>Empfohlen wird mindestens 1 Sekunde.',
                    'bfopt_usebank': 'Autobanking.<br>Aktiviert das automatische Einzahlen.<br>Wähle die Städte aus bei "Select Cities", in der das automatische Einzahlen aktiviert werden soll.',
                    'bfopt_usebankwhen': 'Autobanking.<br>Mindestbetrag der erreicht werden muss, bevor automatisch einbezahlt wird.',
                    'bfopt_attackwhenlost': 'Red ices.<br>Aktivieren, um weiter anzugreifen, auch wenn Du verlierst.<br>Red Ice: Um ein ICE zu bekommen auch wenn Du die Kämpfe verlierst.<br>Bringt wenig XP und keine Loots.',
                    'bfopt_attackwhenlostbut': 'Red ices.<br>Aktivieren, damit nur angegriffen wird, wenn Du verlierst, aber weniger als x Angriffe brauchst für ein ICE.<br>Funktioniert nur, wenn die Funktion "Attack when lost" aktiviert ist.',
                    'bfopt_attackwhenlostbutif': 'Red ices.<br>Maximale Anzahl Angriffe für ein red ICE.<br>Funktioniert nur, wenn die Funktion "Attack when lost" aktiviert ist.',
                    'bfopt_keepattackafterwon': 'Red ices.<br>Manchmal verlierst Du einen Angriff, nach dem Du gewonnen hast. (Durch Boosts)<br>Aktivieren, um weiter zu fighten, wenn Du verlierst, aber den ersten Angriff gewonnen hast gegen den Spieler.',
                    'bfopt_takerevenge': 'Revenges.<br>Aktiviert die Revange Funktion.<br>Diese Funktion ermöglicht das automatische Angreifen der Spieler, die Dir das ICED geklaut haben.',
                    'bfopt_revengelevel': 'Revenges.<br>Aktivieren, um Revange Level abhängig zu machen.',
                    'bfopt_revengelevelway': 'Revenges.<br>Auswählen, ob der Gegner ein kleineres oder grösseres Level hat als angegeben.',
                    'bfopt_revengelevelof': 'Revenges.<br>Wenn "lower" (kleiner) ausgewählt ist, hier das höchste Level eingeben das angegriffen werden soll.<br>Wenn "greater" (größer) ausgewählt ist, hier das kleinste Level eingeben das angegriffen werden soll.',
                    'bfopt_norevengeblacklist': 'Revenges.<br>Aktivieren, um Spieler zu überspringen bei Revange, die in der BlackList sind.',
                    'bfopt_autopublish': 'Autopublish.<br>Aktivieren der automatischen Postfunktion.<br>Funktioniert nur automatisch, wenn Du "Use Facebook user interface" deaktiviert hast im Configuration Menu, Publish tab.',
                    'bfopt_autopublishafter': 'Autopublish.<br>Anzahl an ICE die geposted werden in einem Beitrag.',
                    'bfopt_autopublishin': 'Autopublish.<br>ID der Seite oder Gruppe eingeben in der Deine ICE geposted werden sollen. Leer lassen um auf Deiner Wall zu posten.<br>Wenn Du in der Gruppe/Seite bist, schau den Link des Profilbildes an, suche nach group_id=XXX, kopiere die XXX Zahlen und gebe diese im Feld ein.',
                    'bfopt_maxloglength': 'Log events.<br>Maximale Anzahl der Einträge, die im Log-Fenster zu sehen sind.',
                    'bfopt_showsocialevents': 'Log events.<br>Aktivieren, um "Sozial" Eventeinträge im Log anzuzeigen.<br>Deaktivieren bei langer Laufzeit, um den Arbeitsspeicher zu schonen.',
                    'bfopt_showlootevents': 'Log events.<br>Aktivieren, um Loot Eventeinträge im Log anzuzeigen.<br>Deaktivieren bei langer Laufzeit, um den Arbeitsspeicher zu schonen.',
                    'bfopt_usenamefilter': 'Filtering.<br>Aktivieren, um Gegner wegen speziellem Namen zu überspringen.<br>Keine clan tags hier eingeben.',
                    'bfopt_namefilterval': 'Filtering.<br>Verwendet, wenn "Name filter" aktiviert ist.<br>NORMAL: Jedes Zeichen zählt als Filter.<br>REGEX: Verwende einen gültigen regex syntax. Example: Erlaubt ist nur word/space/point<br>[^\\w\\s\\.]',
                    'bfopt_usefilterregex': 'Filtering.<br>Verwendet von "Name filter" aktiviert Regex.<br>Wenn Du nicht weißt, wie regex funktioniert - DEAKTIVIEREN!.',
                    'bfopt_usebadgefilter': 'Filtering.<br>Aktivieren, um Spieler wegen Badges zu überspringen.',
                    'bfopt_badgefilterval': 'Filtering.<br>Auswählen, welche Badges übersprungen werden sollen.<br>Beispiel zum Überspringen von Diamond Tiers 2 is 5 badges: diamond [2-5]<br>Beispiel zum Überspringen von Rruby und Diamond: ruby|diamond',
                    'bfopt_useskipifhealth': 'Skipping.<br>Aktivieren, um Gegner aufgrund mehr prozentualer Health zu überspringen als eingestellt.',
                    'bfopt_skipifhealth': 'Skipping.<br>Setze die maximale Health in Prozent, um weiter anzugreifen.',
                    'bfopt_skipifotherdamage': 'Skipping.<br>Auswählen um Gegner zu überspringen die von einem anderen angegriffen werden.',
                    'bfopt_skipminimalcash': 'Skipping.<br>Aktivieren, um Gegner zu überspringen, wenn kein Geld gewonnen wird bei dem Angriff.',
                    'bfopt_minimalcash': 'Skipping.<br>Wenn aktiviert, setze das Limit an Geld, was bei jedem Angriff gewonnen werden muss, um weiter anzugreifen.<br>Mit einem Angriff können maximal $ 65000 gewonnen werden ohne Bonus (New York, Moscow, Vegas, Italy).<br>In anderen Städten ist das Maximum geringer.',
                    'bfopt_skipdiffcitycash': 'Skipping.<br>Aktivieren, um Gegner zu überspringen, wenn das gewonnene Geld nicht aus der aktuellen Stadt stammt.<br>Funktioniert sehr gut, um 5x Loot-Pakete in Brazil zu sammeln.',
                    'bfopt_skiplevel': 'Filtering by level.<br>Aktiviert den Filter nach Level.<br>Beispiel:<br>Skip users level "greater" than: "5000", but attack if mafia is "lower" than: "490".<br>Es werden alle Gegner übersprungen, die über Level 5000 sind, außer die Mafiagröße ist kleiner als 490.',
                    'bfopt_skiplevelway': 'Filtering by level.<br>Auswählen, ob das Level größer oder kleiner sein soll als angegeben.',
                    'bfopt_skiplevelof': 'Filtering by level.<br>Setze die Levelnummer für den Levelfilter.',
                    'bfopt_skiplevelbut': 'Filtering by level.<br>Aktivieren, um den Gegner auf Mafiagröße zu prüfen, wenn er wegen dem Level übersprungen wurde.<br>Funktioniert nur wenn "Skip users level" aktiviert ist.',
                    'bfopt_skiplevelbutway': 'Filtering by level.<br>Auswählen, ob die Mafiagröße größser oder kleiner sein soll als angegeben.',
                    'bfopt_skiplevelbutmafia': 'Filtering by level.<br>Setze die Mafiagröße, um einen Gegner anzugreifen, der wegen dem Level übersprungen wurde.',
                    'bfopt_skipmafia': 'Filtering by mafia.<br>Aktiviert den Filter nach Mafiagröße.<br>Beispiel:<br>Skip users mafia "greater" than: "500", But attack if level is "lower" than: "700".<br>Es werden alle Gegner übersprungen, deren Mafiagröße über 500 ist, außer das Level ist kleiner als 700.',
                    'bfopt_skipmafiaway': 'Filtering by mafia.<br>Auswählen, ob die Mafiagröße größer oder kleiner sein soll als angegeben.',
                    'bfopt_skipmafiaof': 'Filtering by mafia.<br>Setze die Mafiagröße für den Mafiafilter.',
                    'bfopt_skipmafiabut': 'Filtering by mafia.<br>Aktivieren, um das Level des Gegners zu prüfen, wenn er wegen der Mafiagröße übersprungen wurde.<br>Funktioniert nur wenn "Skip users mafia" aktiviert ist.',
                    'bfopt_skipmafiabutway': 'Filtering by mafia.<br>Auswählen, ob das Level größer oder kleiner sein soll als angegeben.',
                    'bfopt_skipmafiabutlevel': 'Filtering by mafia.<br>Aktivieren, um das Level des Gegners zu prüfen, wenn er wegen der Mafiagröße übersprungen wurde.',
                    'bfopt_skipiced': 'Filtering.<br>Auswählen, um nicht auf Leichen einzuschlagen. Überspringt Gegner die schon ICED sind.',
                    'bfopt_skipicedplayers': 'Filtering.<br>Aktivieren, um Spieler zu überspringen, die Du ICED hast.',
                    'bfopt_skipifhealed': 'Skipping.<br>Aktivieren, um Gegner zu überspringen, die sich geheilt haben.<br>Funktioniert nicht, wenn "Rapid Fire" aktiviert ist.',
                    'bfopt_usestopwheniced': 'Autostop.<br>Anzahl, um zu stoppen, wenn eine bestimmte Anzahl an ICED erreicht wurde.',
                    'bfopt_stopwheniced': 'Autostop.<br>Setze die Anzahl an ICED bis zum Stop.',
                    'bfopt_stopwhenstamina': 'Autostop.<br>Aktivieren, um zu stoppen, wenn nur noch eine bestimmte Anzahl an Stamina vorhanden ist.',
                    'bfopt_staminatokeep': 'Autostop.<br>Setze die Anzahl an Stamina bis zum Stop. (Stoppt nach Unterschreiten des Wertes)',
                    'bfopt_stopbeforelvlup': 'Autostop.<br>Aktivieren, um zu Stoppen vor dem Level-UP.',
                    'bfopt_explefttostop': 'Autostop.<br>Anzahl an XP, die zum Leveln gebraucht wird für das Stoppen.',
                    'bfopt_stopafterlevelup': 'Autostop.<br>Aktivieren, um zu Stoppen nach dem Level-UP.<br>Stoppt und öffnet das Fenster vom Level-UP.',
                    'bfopt_keepfigthing': 'Autoresume.<br>Aktivieren, um Battlefield neu zu starten, wenn es wegen irgendwas gestoppt wurde.',
                    'bfopt_resumedelay': 'Autoresume.<br>Anzahl Minuten eingeben, nach dem das Battlefield neu gestartet werden soll nach einem Stop.',
                    'bfopt_fighttime': 'Autopause.<br>Auswählen, um das Battlefield zu pausieren nach der eingestellten Zeit.',
                    'bfopt_fighttimeout': 'Autopause.<br>Anzahl Minuten, bis das Battlefield pausiert wird.',
                    'bfopt_fighttimeoutresume': 'Autopause.<br>Anzahl Minuten, bis das Battlefield weiter läuft nach der eingestellten Pause.',
                    'bfopt_useblacklist': 'Blacklist.<br>Aktivieren, um zu starke Spieler in die BlackList einzutragen.',
                    'bfopt_blacklist': 'Blacklist.<br>Die BalckList wird gebraucht, um Spieler zu Filtern/Überspringen.',
                    'bfopt_addusertowlist': 'Whitelist.<br>Aktivieren, um einen Spieler in die WhiteList einzutragen, wenn Du mindestens das eingestellte Geld gewonnen hast.',
                    'bfopt_cashneedtogain': 'Whitelist.<br>Gesamtes Geld eintragen, dass Du von einem Spieler bekommen musst, damit er in die WhiteList eingetragen wird.<br>0 Eingeben, um alle Spieler einzutragen, gegen die Du gewinnst.',
                    'bfopt_usewlistattackcount': 'Whitelist.<br>Aktivieren, um die WhiteList x mal anzugreifen.<br>Nach den x Angriffen wird mit Random Attack weiter gemacht.',
                    'bfopt_wlistattackcount': 'Whitelist.<br>Wenn "Attack whitelist only" aktiviert ist, hier die Anzahl eingeben, wie oft die WhiteList angegriffen werden soll.',
                    'bfopt_randomizewhitelist': 'Whitelist.<br>Aktivieren, um die WhiteList nicht der Reihe nach abzuarbeiten.',
                    'bfopt_whitelist': 'Whitelist.<br>Du kannst den "Attack whitelist" Knopf verwenden, um die Spieler anzugreifen. Funktioniert wie die Rivals List, ermöglicht aber eine größere Anzahl an Spielern.',
                    'bfopt_clantagfilterval': 'Family.<br>Setze die Filter für Family tags.<br>Wörter oder einzelne Zeichen eingeben pro Zeile.',
                    'bfopt_addtoclanlist': 'Family.<br>Verwendet "Family Tag Filter".<br>Aktivieren, um gefilterte Familien in die Clanlist einzutragen.',
                    'bfopt_skipfilteredclans': 'Family.<br>Verwendet "Family Tag Filter".<br>Aktivieren, um die Familien zu filtern/überspringen.',
                    'bfopt_clanlistusage': 'Family.<br>Wähle, wie die ClanList unten verwendet werden soll.<br>Normal ist "Skipped" ausgewählt, um befreundete Familien zu Filtern/überspringen.',
                    'bfopt_clanlist': 'Family.<br>Die ClanList wird für Familien verwendet.<br>Willst Du befreundete Familien überspringen, füge die Familien ein mit den Knöpfen rechts.<br>Einfach den Family Profillink eingeben und bei "The listed families are" - "SKIPPED" auswählen.'
                },
                
                // FREE GIFTS CENTER
                'freegiftscenter_popup': {
                    'filter_text': 'Searching.<br>Füge einen Text zum Suchen ein.<br>Du kannst das Suchen mit dem Zeichen "|" unterteilen.<br>Beispiel: join|crew',
                    'select_fbgroups': 'Scanning.<br>Wähle eine Facebook Gruppe zum scannen.<br>Wenn Du nur "My wall" siehst, klick auf "Refresh", um die Gruppen zu aktualisieren.<br>Du musst Mafia Wars die Genehmigung erteilen, um in einer Gruppe zu scannen.',
                    'fgopt_scantime': 'Scanning.<br>Setze das maximale Alter an Beiträgen, die gescannt werden.<br>Alle Beiträge, die älter sind, werden übersprungen.',
                    'massive_input': 'Parsing.<br>Füge eine Liste an Links ein, um diese zu prüfen und einzusammeln.',
                    'fgopt_usefilter': 'Parsing.<br>Filter aktivieren, um nur angegebene Links zu suchen.<br>Du musst die Namen unten in der Eingabebox eingeben.',
                    'fgopt_filter': 'Parsing.<br>Füge die Namen ein der Gifts, die gesucht werden sollen.<br>Jeder Filter muss mit dem Zeichen "|" getrennt sein.<br>Beispiel: crime spree|stamina boost|rare|exotic|mystery',
                    'fgopt_remonsuccess': 'Remove facebook requests.<br>Aktivieren, um ein Facebook Request zu entfernen, wenn erfolgreich eingesammelt.',
                    'fgopt_remonignore': 'Remove facebook requests.<br>Aktivieren, um einen Facebook Request zu löschen, wenn "ignored it" angeklickt wird.',
                    'fgopt_sendthanksrequest': 'Send back.<br>Aktivieren, um Gifts zurück zu senden.<br>Funktioniert nur mit Gifts von Deiner Facebook Request Page.',
                    'fgopt_sendbacktype': 'Send back.<br>Metode auswählen, um Gifts zurück zu senden.',
                    'fgopt_usebackgiftfilter': 'Send back.<br>Aktivieren, um NUR ausgewählte Gifts zurück zu senden.<br>Du musst die Namen der Gifts in der Box unten eingeben.',
                    'fgopt_thanksbackfilter': 'Send back.<br>Namen der Gifts eingeben, die zurück gesendet werden sollen, Gifts mit dem Zeichen "|" trennen.',
                    'fgopt_ignorelimits': 'Collector.<br>Aktivieren, um weiter einzusammeln, auch wenn das Tageslimit des Gifts erreicht wurde.',
                    'fgopt_skipsameuser': 'Collector.<br>Aktivieren, um Gifts zu überspringen von Spielern, von denen Du schon ein Gift geholt hast heute.<br>Überspringt ein Gift wenn es nicht älter als 24h ist.<br>Crime Spree und anderes wird nicht übersprungen von dem Spieler.<br>Deaktivieren, um alle Links zu prüfen von dem Spieler.',
                    'fgopt_masssendback': 'Collector.<br>Aktivieren, damit der Massive Collector Gifts zurücksendet über Facebook Requests. (Täglich Limitiert)',
                    'fgopt_collectnomafia': 'Collector.<br>Aktivieren, um Links von Spielern zu prüfen, die Du nicht in deiner Mafia hast.<br>Damit können Stadion Fans gesammelt werden.<br>Sonst nicht aktivieren. Nicht immer eingeschaltet lassen',
                    'fgopt_csselect': 'Crime Spree.<br>Auswählen, ob Du Helfen oder Sabotieren willst.',
                    'fgopt_csreward': 'Crime Spree.<br>Auswählen, welchen Bonus Du gerne hättest.',
                    'fgopt_useexcludedgifts': 'Skipping.<br>Aktivieren, um Gifts zu überspringen, die in der "exclude list" sind.',
                    'fgopt_excludedpattern': 'Skipping.<br>Text eintragen des Gifts in die "exclude list" einträgt.<br>Du kannst verschiedene Texte eingeben, kann mit dem Zeichen "|" getrennt werden.<br>Beispiel: reached your limit|gold mastery'
                },
                
                // REMINDER EDITOR
                'remindereditor_popup': {
                    'setting_name': 'Reminder Editor.<br>Name des Reminders eingeben.',
                    'setting_description': 'Reminder Editor.<br>Beschreibung zum Reminder eingeben.',
                    'setting_checktype': 'Reminder Editor.<br>Aktivieren, um alle X Stunden zu prüfen oder nach X Zeit jeden Tag.',
                    'setting_every': 'Reminder Editor.<br>Zeit in Stunden angeben oder die Tageszeit eingeben.',
                    'setting_gotocity': 'Reminder Editor.<br>Aktivieren, um erst in eine ausgewählte Stadt zu wechseln.',
                    'setting_gotocityid': 'Reminder Editor.<br>Stadt auswählen, in die gewechselt werden soll.',
                    'setting_gotopage': 'Reminder Editor.<br>Auswählen, wenn auf eine bestimmte Seite gewechselt werden soll.',
                    'setting_gotopageurl': 'Reminder Editor.<br>Adresse der Seite eingeben.<br>Du kannst hier den ganzen Link eingeben. Den Link aus Mafia Wars kopieren, der geöffnet werden soll.',
                    'setting_runplugin': 'Reminder Editor.<br>Aktivieren, um ein integriertes Script aus dem Plugin Manager auszuführen.',
                    'setting_runpluginid': 'Reminder Editor.<br>Plugin auswählen, das ausgeführt werden soll.',
                    'setting_resetonload': 'Reminder Editor.<br>Aktivieren, um den Timer neu zu starten wenn eine bestimmte Seite geladen wird.',
                    'setting_resetonloadurl': 'Reminder Editor.<br>Seite eingeben die den Timer neu startet.<br>Gleich wie bei "Go To Page". Du kannst hier den ganzen Link eingeben. Den Link aus Mafia Wars kopieren der geöffnet werden soll.'
                },
                
                // PLUGIN MANAGER
                'pluginmanager_popup': {
                    'app_name': 'Plugin Manager.<br>Name von dem Script eingeben.',
                    'app_code': 'Plugin Manager.<br>Hier den Code des Scripts eingeben das ausgeführt werden soll.'
                },
                
                // MULTI GIFTER
                'multigifter_popup': {
                    'mgopt_giftpages': 'Pagination.<br>Aktivieren, um Seitenumbruch einzuschalten für Gifts.',
                    'mgopt_userpages': 'Pagination.<br>Aktivieren, um Seitenumbruch einzuschalten für Benutzer.',
                    'mgopt_hidezeroamount': 'Item quantity.<br>Aktivieren, um Loots auszublenden, wenn keine vorhanden sind.',
                    'mgopt_delay': 'Delay.<br>Zeit, bis das nächste Gift versendet werden soll.',
                    'gift_page': 'Pagination.<br>Seite auswählen, die angezeigt werden soll.',
                    'user_page': 'Pagination.<br>Seite auswählen, die angezeigt werden soll.',
                    'gift_category': 'Gift category.<br>Auswählen der Giftsgruppe zum anzeigen.',
                    'user_category': 'User category.<br>Auswählen der Benutzergruppe zum Anzeigen.',
                    'collection_filter_type': 'Filtering.<br>Wähle einen Filter für die Kollektionen.',
                    'collection_filter': 'Filtering.<br>Wähle den Namen der Kollektionen zum Filtern.',
                    'search_gift': 'Searching.<br>Wähle eine Suche, um Loots zu finden.<br>Du kannst mehrere Suchbegriffe eingeben, trennen mit dem "|" Zeichen.',
                    'saved_search': 'Searching.<br>Verwende eine zuvor gespeicherte Suche.',
                    'search_user': 'Searching.<br>Wähle eine Suche, um Benutzer zu finden.<br>Du kannst mehrere Benutzer eingeben, trennen mit dem "|" Zeichen.'
                },
                
                // HOME FEED CENTER
                'homefeedcenter_popup': {
                    'hfopt_filter': 'Filtering.<br>Text, um Beiträge zu suchen, eingeben.<br>Du kannst das "|" Zeichen verwenden um mehrere Begriffe einzugeben.',
                    'hfopt_grouping': 'Filtering.<br>Wähle eine Gruppe von Beiträgen zum Anzeigen.',
                    'hfopt_dogotowar': 'Helping.<br>Aktivieren, um bei veröffentlichten WARs zu helfen.',
                    'hfopt_dogivesocialhelp': 'Helping.<br>Aktivieren, um bei veröffentlichten JOBs zu helfen.',
                    'hfopt_dosocialmissions': 'Helping.<br>Aktivieren, um Missionen beizutreten.',
                    'hfopt_doclaimbonusandreward': 'Helping.<br>Aktivieren, um alle Boni und Rewards einzusammeln.',
                    'hfopt_docollectloot': 'Helping.<br>Aktivieren, um Loot einzusammeln aus Beiträgen (wird im Moment nicht verwendet)',
                    'hfopt_dopropertyhelp': 'Helping.<br>Aktivieren, um Property Teile zu versenden.',
                    'hfopt_dogetboost': 'Helping.<br>Aktivieren, um Level-UP Boni einzusammeln.',
                    'hfopt_dosendenergyandphones': 'Helping.<br>Auswählen, um Burners (Robbing) und Energy Packs zu versenden.',
                    'hfopt_doacceptgiftevent': 'Helping.<br>Aktivieren, um bei Gift Events zu helfen.',
                    'hfopt_dohitlistbounty': 'Helping.<br>Aktivieren, um bei Hitlist Bounty zu helfen.',
                    'hfopt_dosecretstash': 'Helping.<br>Aktivieren, um bei Secret Stashes zu helfen.',
                    'hfopt_docitycrew': 'Helping.<br>Aktivieren, um bei City Crew zu helfen.',
                    'hfopt_autoclose': 'General.<br>Wenn ausgewählt: Hilft, wenn Du "accept" klickst, wird automatisch geschlossen nach einigen Sekunden.',
                    'hfopt_feedslimit': 'General.<br>Setze hier die Limits von Beiträgen, die geladen werden, wenn Du "AutoHelp" verwendest.',
                    'hfopt_maxloglength': 'General.<br>Setze hier das Maximum an Logeinträgen, die angezeigt werden, wenn Du "AutoHelp" verwendest.',
                    'hfopt_helpdelay': 'General.<br>Zeit eingeben, wie lange gewartet wird bis zum nächsten Help.',
                    'hfopt_refreshdelay': 'General.<br>Zeit eingeben, wie lange gewartet wird bis zum nächsten Neuladen der Beiträge.',
                    'hfopt_waruseminattack': 'War help.<br>Auswählen, um nur die Loots zu sammeln mit mehr Attack als angegeben.',
                    'hfopt_warminattack': 'War help.<br>Setzt den Minimum Attack Wert eines Loots, um bei einem WAR zu helfen.',
                    'hfopt_warusemindefense': 'War help.<br>Auswählen, um nur die Loots zu sammeln mit mehr Defense als angegeben.',
                    'hfopt_warmindefense': 'War help.<br>Setzt den Minimum Defense Wert eines Loots, um bei einem WAR zu helfen.',
                    'hfopt_warusenamefilter': 'War help.<br>Aktivieren, um in WARs zu helfen, die das eingegebene Loot bringen. Wenn ausgewählt, musst Du die Funktion deaktivieren um die WAR Loots an der Attack/Defens zu Filtern.',
                    'hfopt_warnamefilter': 'War help.<br>Name der WAR Rewards eingeben, bei denen im WAR geholfen werden soll. Kann mit Komma oder "|" getrennt werden.',
                    'hfopt_joinmission': 'Operations.<br>Auswählen, welche SLOTs gewählt werden sollen.',
                    'hfopt_joinmissionafter': 'Operations.<br>Wenn der erste Typ SLOT nicht verfügbar ist, hier einen zweiten auswählen der gewählt werden soll.',
                    'hfopt_maxfreeslots': 'Operations.<br>Auswählen, wie viele SLOTs frei sein fürfen um einer Mission beizutreten.',
                    'hfopt_opusenamefilter': 'Operations.<br>Auswählen um Opperationen nach Name zu Filtern.<br>Nimmt nur die Opperationen an dessen Name als Filter eingetragen ist.',
                    'hfopt_opnamefilter': 'Operations.<br>Name der Opperation eingeben trennen mit dem "|" Zeichen.<br>Beispiel:<br>Fix The Tripple Crown|Steal Government Research',
                    'hfopt_dohitlistbounty_usefilter': 'Hitlist Bounty<br>Auswählen um die posts nach Benutzer-ID zu Filtern.<br>Nur den unten eingetragenen Spieler wird geholfen.',
                    'hfopt_dohitlistbounty_filter': 'Hitlist Bounty<br>Hinzufügen von Spielern mit klick auf den "Add" Knopf.<br>Entfernen eines Spielers, Eintrag auswählen und mit klick auf "Remove" entfernen.<br><br><a href="http://userscripts.org/topics/88665">Mehr Info.</a>',
                    'hfopt_dosecretstash_usefilter': 'Secret Stash<br>Auswählen um die posts nach Benutzer-ID zu Filtern.<br>Nur den unten eingetragenen Spieler wird geholfen.',
                    'hfopt_dosecretstash_filter': 'Secret Stash<br>Hinzufügen von Spielern mit klick auf den "Add" Knopf.<br>Entfernen eines Spielers, Eintrag auswählen und mit klick auf "Remove" entfernen.<br><br><a href="http://userscripts.org/topics/88665">Mehr Info.</a>',
                    'hfopt_docitycrew_usefilter': 'City Crew<br>Auswählen um die posts nach Benutzer-ID zu Filtern.<br>Nur den unten eingetragenen Spieler wird geholfen.',
                    'hfopt_docitycrew_filter': 'City Crew<br>Hinzufügen von Spielern mit klick auf den "Add" Knopf.<br>Entfernen eines Spielers, Eintrag auswählen und mit klick auf "Remove" entfernen.<br><br><a href="http://userscripts.org/topics/88665">Mehr Info.</a>'
                }        
            }
        }
        
        //----
    }
};

// ==Script==
// @id        FileSystem.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

var FileSystem = {
    /**
     * Read the file and return the text to callback.
     * @param {Object} files
     * @param {function} callback
     */
    fileReader: function(files, callback) {
        var file = files && files[0];
        
        if (file && /text\/plain/i.test(file.type)) {
            
        	var reader = new FileReader();
        	reader.onload = function(e) {
        		callback(e && e.target && e.target.result);
                Logger.debug('fileReader completed, loaded '+file.size+'bytes.');
        	};
        	reader.readAsText(file);
            
        } else {
            
            callback(false);
            
        }
    },
    /**
     * Create a new blob object url.
     * @param {Object} data
     */
    createObjectURL: function(data) {
        var blobBuilder = unsafeWindow.WebKitBlobBuilder || unsafeWindow.MozBlobBuilder;
        var wURL = unsafeWindow.webkitURL || unsafeWindow.URL;
        if (blobBuilder) {
            var bb = new blobBuilder();
            bb.append(data);
            if (FileSystem.objectURL) {
                FileSystem.revokeObjectURL();
            }
            return ( FileSystem.objectURL = wURL.createObjectURL(bb.getBlob()) );
        }
        
    },
    /**
     * Revoke a blob object url (saves memory usage).
     */
    revokeObjectURL: function() {
        var wURL = unsafeWindow.webkitURL || unsafeWindow.URL;
        if (wURL) {
            wURL.revokeObjectURL(FileSystem.objectURL);
            delete FileSystem.objectURL;
        }
    }
    
    
};
// ==Script==
// @id        Controllers.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Get a jQuery with at least 1 element, otherwise null.
 *
 * @param {Object} selector
 * @param {Object} context
 * @return {jQuery, null}
 */
function e$(selector, context) {
    var elem = null;
    if ($(selector, context).length > 0) {
        elem = $(selector, context);
    }
    return elem;
}
/**
 * Create a jQuery from a HTML text.
 *
 * @param {String} htmlText
 * @return {jQuery}
 */
function h$(htmlText) {
    var elem;
    if (typeof(htmlText) == 'string') {
        elem = c$('div');
        elem[0].innerHTML = '<div>' + htmlText + '</div>';
    } else {
        elem = $(htmlText);
    }

    return elem;
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
 * Create a new checkbox element.
 * @param {String} id
 * @param {String} label
 * @return {jQuery}
 */
function x$(id, label, elementType, margin_right) {
    if (!elementType) {
        elementType = 'span';
    }
    if (!margin_right) {
        margin_right = 5;
    }
    return c$(elementType).text(label||'').css({
        'cursor':'pointer',
        'margin-right': margin_right
    }).attr({
        'id':id,
        'name':'checkbox',
        'class':'checkbox',
        'onclick':'$(this).toggleClass(\'checked\');return false;'
    });
}
/**
 * Create a new select element.
 * @param {String} id
 * @param {String} [text]
 * @param {Number} [width]
 * @param {Object} [events]
 * @return {jQuery}
 */
function s$(id) {
    var text, width = 40, events;
    Util.each(arguments, function(i, a) {
        if (i > 0) {
            switch( typeof(a) ) {
                case 'string': text = a;   break;
                case 'number': width = a;  break;
                case 'object': events = a; break; 
            }
        }
    });
    var s = c$('select','id:'+id).css({'width': width, 'margin':'0px 5px 0px 5px'});
    if ( events ) {
        Util.each(events, function(e,fn) {
            if (Util.isFunc(s[e])) s[e](fn);
        });
    }
    if ( Util.isString(text) ) {
        s = c$('label', 'for:'+id).css('margin-right', 5).text(text).append(s);
    }
    return s;
}
/**
 * Create a new numeric input element.
 * @param {String} id
 * @param {String} [text]
 * @param {Number} [width]
 * @return {jQuery}
 */
function n$(id, text, width) {
    return t$(id, text, width, {
        'onchange' : 'if(!/^\\d+$/.test(this.value)){this.value=0;}',
        'onclick'  : '$(this).select();'
    });
}
/**
 * Create a new text input element.
 * @param {String} id
 * @param {String} [text]
 * @param {Number} [width]
 * @param {Object} [events]
 * @return {jQuery}
 */
function t$(id) {
    var text, width = 40, events;
    Util.each(arguments, function(i, a) {
        if (i > 0) {
            switch( typeof(a) ) {
                case 'string': text = a;   break;
                case 'number': width = a;  break;
                case 'object': events = a; break; 
            }
        }
    });
    var t = c$('input:text','id:'+id).css({'width':width, 'margin':'0px 5px 0px 5px'});
    if ( events ) {
        Util.each(events, function(e, fn) {
            if (Util.isFunc(t[e]) && Util.isFunc(fn)) {
                t[e](fn);
            }
            else {
                t.attr(e, fn);
            }
        });
    }
    if ( Util.isString(text) ) {
        t = c$('label', 'for:'+id).css('margin-right', 5).text(text).append(t);
    }
    return t;
}
/**
 * Return a new jQuery with the new sexy style button.
 * @param {String} label
 * @param {String} attr
 * @return {jQuery}
 */
function b$(label, attr) {
    var spanElt = c$('span').append(c$('span').html(label));
    return c$('a', attr).addClass('sexy_button_new').append(spanElt);
}


// ==Script==
// @id        Util.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @namespace Util
 */
var Util = {
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isSet: function(obj) {
        return typeof obj !== 'undefined' && obj !== null;
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
    isFunc: function(obj) {
        return typeof obj === 'function';
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isObject: function(obj) {
        if (typeof obj === 'object' && obj !== null) {
            return /Object/.test(obj.constructor);
        } else {
            return false;
        }
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isArray: function(obj) {
        if (typeof obj === 'object' && obj !== null) {
            return /Array/.test(obj.constructor);
        } else {
            return false;
        }
    },
    /**
     * @param {Object} obj
     * @return {Boolean}
     */
    isDate: function() {
        if (typeof obj === 'object' && obj !== null) {
            return /Date/.test(obj.constructor);
        } else {
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
        if (typeof($) !== 'undefined') {
            return $.toJSON(obj);
        } else {
            return JSON.stringify(obj); 
        }
    },
    /** 
     * @param {String} text
     * @return {Object}
     */
    parseJSON: function(text) {
        if (typeof($) !== 'undefined') {
            return $.parseJSON(text);
        } else {
            return JSON.parse(text); 
        }
    },
    /**
     * @param {Object} obj
     * @return {Number}
     */
    length: function(obj) {
        var count = 0;
        for (var e in obj) {
            if (typeof e !== 'undefined'){count++;}
        }
        return count;
    },
    /**
     * @param {String} text
     * @return {Object}
     */
    parseParam: function(text) {
        text = String(text).replace(/\+/g, '').replace('%ITEM_ID%','""');
        try {
            return $.parseJSON(text);
        } catch (err) {
            Logger.error('parseParam: ' + text);
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

        while (expr.test(fixed)) {
            fixed = fixed.replace(expr, '$1,$2');
        }
        return fixed;
    },
    /**
     * Return the Date String from the giving milliseconds Number.     *
     * @param {Number} ms
     * @return {String}
     */
    toDateString: function(ms) {
        var dateText = '', s, m, h, d;
        if (ms < 0){ms = 0;}

        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        h = Math.floor(m / 60);
        d = Math.floor(h / 24);

        dateText += d > 0 ? d + 'd ' : '';
        dateText += (h = h % 24) > 0 ? this.padNum(h) + 'h ' : '';
        dateText += ((m = m % 60) > 0 ? this.padNum(m) : '00') + 'm ';
        dateText += ((s = s % 60) > 0 ? this.padNum(s) : '00') + 's';

        return dateText;
    },
    /**
     * Return a delay String from the giving milliseconds Number.
     * @param {Number} ms
     * @return {String}
     */
    toDelayString: function(ms) {
        var dateText = '', s, m, h, d;
        if (ms < 0){ms = 0;}

        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        h = Math.floor(m / 60);
        d = Math.floor(h / 24);

        dateText += d > 0 ? d + 'd ' : '';
        dateText += ( (h = h % 24) > 0     ? Util.padNum(h) + 'h : ' : '');
        dateText += ( (m = m % 60) > 0     ? Util.padNum(m) + 'm : ' : '');
        dateText += ( (s = s % 60) > 0     ? Util.padNum(s) + 's : ' : '');
        dateText += ( (ms = ms % 1000) > 0 ? Util.padNum(ms,3)    : '000') + 'ms';

        return dateText;
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

            if (url.indexOf('?') !== -1) {
                url = String(url.split('?')[1]);
            }
            this.each(url.split('&'), function(p, param) {
                if ((p = param.split('=')).length === 2) {
                    cUrl[p[0]] = unescape(p[1]);
                }
            });
        } catch (err) {
            Logger.error(err);
        }
        return cUrl;
    },
    /**
     * Return a new object with all url parts.
     * 
     * @param {String} url
     */
    uParse: function(url) {
        var rgx = /^(([^:\/?#]+):)(\/\/([^\/?#]*))([^?#]*)(\?([^#]*))?(#(.*))?/gi;
        var url_params = this.doRgx(rgx, url);

        return {
            href        : url,
            protocol    : url_params.$2,
            host        : url_params.$4,
            path        : url_params.$5,
            query       : url_params.$7,
            hash        : url_params.$9
        };
    },
    /**
     * Loops through the properties of the object.
     * 
     * @param {Object} obj
     * @param {Function} callback
     */
    each: function(obj, callback) {
      if (typeof($) !== 'undefined') {
          $.each(obj, callback);
      } else {
          for (var n in obj) {
              if (callback(n, obj[n]) === false) {
                  break;
              }
          }
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

        if (typeof text !== 'undefined' && (r = rgx.exec(text))) {
            for (i = 0; i < r.length; i++) {
                cRegex['$' + i] = r[i];
            }
        }
        return cRegex;
    },
    /**
     * @param {String} text
     * @return {String}
     */
    htmlDecode: function(text) {
        if (!Util.isString(text)) {
            return '';
        }
        try {
            return $.trim(c$('textarea').html(text).val());
        } catch (err) {
            Logger.error(err);
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
        return '<span ' + (id ? 'id="' + id + '" ' : '') + 'style="color:'
                + color + ';">' + text + '</span>';
    },
    /**
     * @param {String} url
     * @param {String} text
     * @return {String}
     */
    setAnchor: function(url, text) {
        return ' <a href="' + url + '" target="_black">' + text + '</a>';
    },
    /**
     * Return a Hex color string.
     *
     * @param {String} color
     * @return {String}
     */
    rgbToHex: function(color) {
        if (typeof color !== 'string' || color.length < 1) {
            return color;
        }

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
        return number_part.length > 0 ? parseInt(number_part) : 0;
    },
    /**
     * @param {Element, jQuery} elem
     * @return {String}
     */
    textNodes: function(elem) {
        return $(elem).contents().filter(function() {
            return this.nodeType === 3;
        }).text();
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
        if (!(this.isString(string) && this.isString(sStart) && this.isString(sEnd))) {
            return string;
        }

        nStartPos = Util.isNumber(nStartPos) ? nStartPos : 0;
        nEndPos = Util.isNumber(nEndPos) ? nEndPos : 0;

        var aIndex = string.indexOf(sStart, nStartIndex);
        var bIndex = string.indexOf(sEnd, aIndex + (nStartPos > 0 ? nStartPos : 1));
        
        if (aIndex === -1 || bIndex === -1) {
            return false;
        }
        aIndex += nStartPos;
        bIndex += nEndPos;
        return string.substr(aIndex, bIndex - aIndex);
    },

    /**
     * @param {jQuery} jQry
     * @return {String}
     */
    toUrl: function(jQry) {
        if (!jQry.length || !jQry.attr) {
            return '';
        }
        var url = jQry.attr('href');

        if (this.isString(url) && /https?/i.test(url)) {
            return url;
        }
        return Util.doRgx(/['"](remote[^'"]*)/, jQry.attr('onclick')).$1;
    },
    /**
     * Trim all spaces.
     * @param {Object} text
     * @return {String}
     */
    trim: function(text) {
        if (!Util.isString(text)) {
            return '';
        }
        if ( typeof($) !== undefined ) {
            return $.trim(text);
        } else {
            return text.replace(/^\s*|\s*$/, '');
        }
    },
    /**
     * Return a new Array from an Object.
     * @param {Object} obj
     */
    toArray: function(obj) {
        if (Util.isArray(obj)) {
            return obj;
        }
        var oArray = new Array();
        Util.each(obj, function(i,v) {
            oArray.push(v);
        });
        return oArray;
    },
    /**
     * Format a text, uppercase every first letter
     *
     * @param {String} string text to format
     * @return {String}
     */
    formatText: function(string) {
        var words = String(string).replace(/_/g, ' ').split(/\s/g);
        var outText = '';
        for ( var i = 0; i < words.length; i++) {
            outText += words[i].charAt(0).toUpperCase()
                    + words[i].substr(1).toLowerCase() + ' ';
        }
        return outText.replace(/^\s+|\s+$/, '');
    },
    /**
     * @param {Element, jQuery} element
     * @return {String}
     */
    getInputSelectedValue: function(element) {
        element = $(element)[0];
        if (element.options) {
            return element.options[element.selectedIndex].value;
        }
    },
    /**
     * Get a picture url from a background css string.
     * @param {String} s_background
     * @return {String}
     */
    getPicture: function(s_background) {
        if (Util.isString(s_background)) {
            var url = Util.doRgx(/url\(([^\)]+)\)/, s_background).$1;
            if (Util.isSet(url)) {
                return String(url).replace(/["']/g,'');
            }
        }
        return '';
    },
    /**
     * Search for a javascript code that apply html to the popup_fodder element,
     * return the HTML code.
     *
     * @param {String} htmlText
     * @return {jQuery}
     */
    parsePopup: function(htmlText) {
        try {
            var sHtml = this.doRgx(/\$\('#popup_fodder'\).html\("(.*?)"\);\s*?MW.Popup.show/i, htmlText).$1;
            if (sHtml) {
                eval('sHtml = "' + sHtml + '";');
                return sHtml;
            }
        } catch (err) {
            Logger.error('parsePopup: ' + err.message);
        }
        return;
    },
    /**
     * Calculate the percentage of current relative to max. 
     * @param {Number} current
     * @param {Number} max
     * @return {Number}
     */
    percent: function(current, max) {
        current = parseInt(current);
        max = parseInt(max);
        if (isNaN(current) || isNaN(max)) {
            return 0;
        } else {
            return parseFloat((current * 100) / max); 
        }
    },
    /**
     * Move an item in the Array the steps specified by move.
     *
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
    },
    /**
     * Merge the contents of two arrays/objects together into the first array.
     * @param {Object} first
     * @param {Object} second
     */
    merge: function(first, second) {
        var isArray = Util.isArray(first);
        Util.each(second, function(i, v) {
            if (isArray) {
                first.push(v);
            } else {
                first[i] = v;
            }
        });
        return first;
    },
    /**
     * Return an empty function.
     */
    noop: function() {
        return function() {
          return false;  
        };
    },
    /**
     * Clear all regex metatags.
     *
     * @param {String} text
     * @return {String}
     */
    clearRegExpMeta: function(text) {
        var clearPattern = /([\^\$\.\+\?\*\{\}\(\)\\\/\|\[\]])/g;
        if (String(text).length > 0 && clearPattern.test(text)) {
            return String(text).replace(clearPattern, '\\$1');
        } else {
            return text;
        }
    },
    /**
     * Create a new copy of the object.
     * @param {Object} obj
     * @return {Object}
     */
    clone: function(obj) {
        var cloned = new Object();
        Util.each(obj, function(a,b) {
            if (!Util.isFunc(b)) {
                cloned[a] = b;
            }
        });
        return cloned;
    },
    /**
     * Wait until test return true.<br><br>
     * Params:<br>
     * test: function(){...}
     * delay: Number
     * retries: Number
     * success: function(){...} }
     * 
     * @param {Object} p
     */
    until: function(p) {
        var retries = 0;
        if ( !Util.isNumber(p.retries) ) { p.retries = 50; }
        if ( !Util.isNumber(p.delay)   ) { p.delay = 100;  }
        var interval_id = setInterval(function() {
            if (p.test() === true || retries > p.retries) {
                clearInterval(interval_id);
                p.success();
            }
            retries++;
        }, p.delay);
    }
};
// ==Script==
// @id        MW.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @namespace MW
 */
var MW = {
    /**
     * Update gift data.
     * @param {String} [htmlText] optional server response.
     * @return {Object}
     */
    updateGiftData: function(htmlText) {
        var groups_levels, item_amounts, item_names, item_imgs, gifts_daily_left;
        if ( htmlText ) {
            eval( Util.substr(htmlText, 'var groups_levels', 'var friends_names') );
            return (global.giftData = {
                'gifts_daily_left' : gifts_daily_left,
                'groups_levels'    : groups_levels,
                'item_amounts'     : item_amounts,
                'item_names'       : item_names,
                'item_imgs'        : item_imgs
            });
        }
        else {
            return global.giftData;    
        }
        /*
        div.setAttribute('onclick', "try { return {'gifts_daily_left':gifts_daily_left,'groups_levels':groups_levels,'item_amounts':item_amounts,'item_names':item_names,'item_imgs':item_imgs}; } catch(e) {return false;}");
        return div.onclick();
        */  
    },
    /**
     * Get gift data from server. 
     * @param {Function} callback usage function(data).
     * @param {Boolean} bForceUpdate true to force update from server.
     */
    getGiftData: function(callback, bForceUpdate) {
        if (!Util.isFunc(callback)) {
            return;
        }
        var data = MW.updateGiftData();
        
        if ( bForceUpdate !== true && global.gift_key && data ) {
            callback(data);
        }
        else {
            httpAjaxRequest({
                url: 'remote/' + MW.getIntURL('gift'),
                timeout: 60000,
                message: 'Loading friends...',
                success: function(htmlText) {
                    if (MW.update(htmlText) !== true) {
                        showBadResponse();
                        return;
                    }
                    global.gift_key = Util.doRgx(/gift_key['"]\s*value=['"]([^'"]+)/, htmlText).$1;
                    callback( MW.updateGiftData(htmlText) );
                }
            });
        }
    },
    /**
     * Update Inventory data.
     * @param {String} [htmlText] optional server response.
     * @return {Object}
     */
    updateInventoryData: function(htmlText) {
        var Items, Item, div = document.createElement('div');
        if ( htmlText ) {
            eval( Util.substr(htmlText, 'var Items', '</script>') );
        }
        else {
            return global.inventoryData;
        }
        try {
            div.setAttribute('onclick', "return Item;");
            Item = div.onclick();
        }
        catch(err) {
            Item = unsafeWindow.Item;
        }
        return (global.inventoryData = {
            'Item': Item,
            'Items': Items
        });
    },
    /**
     * Get Inventory data from server. 
     * @param {Function} callback usage function(data).
     * @param {Boolean} bForceUpdate true to force update from server.
     */
    getInventoryData: function(callback, bForceUpdate) {
        if (!Util.isFunc(callback)) {
            return;
        }
        var data = MW.updateInventoryData();
        
        if ( bForceUpdate !== true && data ) {
            callback(data);
        }
        else {
            httpAjaxRequest({
                url: 'remote/' + MW.getIntURL('inventory'),
                timeout: 60000,
                message: 'Loading inventory data...',
                success: function(htmlText) {
                    if (MW.update(htmlText) !== true) {
                        showBadResponse();
                        callback();
                        return;
                    }
                    callback( MW.updateInventoryData(htmlText) );
                }
            });
        }
    },
    /**
     * Get the specified loot name.
     * @param {Number} item_id
     * @param {Object} callback
     */
    getItemInfo: function(item_id, callback) {
        httpAjaxRequest({
            'url': 'remote/' + MW.getIntURL('item', 'get_item_data') + '&item_id=' + item_id,
            'success': function(jsonData) {
                var n, t, p;
                if ( jsonData.popup ) {
                    p = c$('div').html(jsonData.popup).find('#'+jsonData.popup_id);
                    n = p.find('h3').html();
                    t = Util.trim(p.find('.info dd:eq(1)').text());
                    callback( n, t );
                } else {
                    callback( 'Unknow' );
                }
            }
        });
    },
    /**
     * Get the SNAPI authentication key.
     */
    getSNAPIauth: function() {
        if (unsafeWindow && unsafeWindow.SNAPI) {
            return unsafeWindow.SNAPI.getAuthInformation();
        } else {
            var elt = document.createElement("div");
            elt.setAttribute("onclick", "return SNAPI.getAuthInformation();");
            return elt.onclick();
        }
    },
    /**
     * Decode a base64 MW url params
     * @param {String} encodedText
     * @return {Object}
     */
    decodeURL: function(encodedText) {
        try {
            var rgx, text = global.Base64.decode(encodedText);
            if ( (rgx = /i:\d;s:\d+:"([^"]+)";i:\d;s:\d+:"([^"]+)";i:\d;s:\d+:"([^"]+)";/.exec(text)) ) {
                return {
                    'next_controller' : rgx[1],
                    'next_action'     : rgx[2],
                    'next_params'     : Util.uSplit('?'+rgx[3])
                };
            }
            return {};
        }
        catch(err) {
            Logger.error('decodeURL: '+encodedText);
            return {};
        }
    },
    /**
     * Get user ID from script code.
     * @return {Number}
     */
    getUserID: function() {
        if (unsafeWindow.User && unsafeWindow.User.id) {
            Logger.debug('MW USER ID: ' + unsafeWindow.User.id);
            return unsafeWindow.User.id;
        }
        var match = /'sf_xw_user_id':\s?'([^']+)'/.exec($('body').html());
        if (match) {
            Logger.debug('MW USER ID: ' + unescape(match[1]));
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
            Logger.error(err);
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
            Logger.error(err);
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
    getIntURL: function(controller, action, city, person) {
        var params = [
            'xw_controller='   + (controller || 'index'),
            'xw_action='       + (action || 'view'),
            'xw_city='         + (Util.isSet(city) ? city : this.currentCity()),
            'xw_person='       + (Util.isSet(person) ? person : global.PERSON_ID),
            'cb='              + global.uri.cb  || ((new Date()).getTime() / 1000),
            'tmp='             + global.uri.tmp || ((new Date()).getTime() / 1000)
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
        
        Util.each(params, function(name, value) {
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
                Logger.error('getGiftLink: '+Util.toJSON(options));
                return;
            };
            // send request
            httpAjaxRequest({
                url      : 'remote/' + sUrl + '&fbml_iframe=1',
                data     : options.params,
                liteLoad : 1,
                message  : options.message,
                success  : function(htmlText) {
                    var request1 = Util.doRgx(/<fb:req-choice url='([^']+)'/, htmlText).$1;
                    var request2 = Util.doRgx(/MW.Request.setData\('([^']+)/, htmlText).$1;
                    if (request1) {
                        options.success(request1);
                    } else if (request2) {
                        options.success(MW.getExtURL('freegifts','accept_gift')+'&next_params='+escape(request2));
                    } else {
                        options.success();
                    }
                }
            });
        }
        catch(err) {
            Logger.error(err);
        }
    },
    /**
     * @param {Number} giftId
     * @param {Number} giftCat
     * @param {Function} callback
     */
    getGift: function(giftId, giftCat, callback, params) {
        var url = MW.getIntURL('requests', 'friend_selector')
        +         '&free_gift_id='+(giftId || 0) 
        +         '&free_gift_cat='+(giftCat || 1);
        httpAjaxRequest({
            url      : 'remote/' + url + '&fbml_iframe=1',
            liteLoad : 1,
			data     : params,
            success  : function(htmlText) {
                var req = Util.doRgx(/MW.Request.setData\('([^']+)/,  htmlText).$1;
                var msg = Util.doRgx(/MW.Request.setMsg\('([^']+)/,   htmlText).$1;
                var ttl = Util.doRgx(/MW.Request.setTitle\('([^']+)/, htmlText).$1;
                var data = {};
                
                if (req) {
                    try {
                       data = Util.parseJSON(unescape(req).replace(/\\"/g,'"')); 
                    }
                    catch(e) {
                        Logger.error('getGift: '+e.message);
                    }
                    
                }
                callback(data.item_id, data.item_cat, req, msg, ttl);
            }
        });
        
    },
    /**
     * Deposit the amount of cash specified.
     * 
     * @param {Number} city city id where to deposit
     * @param {Number, String} amount cash to deposit
     * @param {Function} callback return server response or an error message.
     */ 
    deposit: function(city, amount, callback) {
        var url = 'remote/'; 
        if (parseInt(amount) < 11) {
            callback('Can\'t deposit.');
            return;
        }
        if (parseInt(city) === 5) {
            url += MW.getIntURL('propertyV2', 'doaction', city);
            url += '&doaction=ActionBankDeposit&building_type=6&city='+city;
        }
        else if (Util.isSet(global.cities[city])) {
            url += MW.getIntURL('bank', 'deposit_all', city) 
                + '&city=' + String(global.cities[city]).toLowerCase().replace(/\s/g,'_');
        } 
        else {
            callback('Error depositing cash: '+Util.setColor('unknow city id.','red'));
            return;
        }
        httpAjaxRequest({'url': url + '&amount=' + amount, 'success': function(jsonData) {
                var result;
                try {
                    result = jsonData.deposit_message;
                    if (typeof(result) == 'undefined') {
                        result = $.parseJSON(jsonData.data).success_message;
                    }
                }
                catch(err) {
                    Logger.error(err);
                    result = 'Error depositing your cash of: ' + amount;
                }
                callback(result);
            }
        });
    },
    /**
     * Collect properties.
     * @param {Number} city
     * @param {String} [type] optional
     * @param {Function} callback
     */
    collect: function(city, type, callback) {
        var url = MW.getIntURL('propertyV2', 'collectAll', city)
        var s_one = MW.getIntURL('propertyV2', 'collect', city);
         
        if (Util.isFunc(type)) {
            callback = type;
        } 
        else if (!Util.isFunc(callback)) {
            return;
        }
        
        if (isNaN( city = parseInt(city) )) {
            city = 1;
        }
        switch( city ) {
            case 1: url += '&cityCode=nyc';      break;
            case 2: url += '&cityCode=cuba';     break;
            case 3: url += '&cityCode=moscow';   break;
            case 4: url += '&cityCode=bangkok';  break;
            case 5: url += '&cityCode=vegas';    break;
            case 6: url += '&cityCode=italy';    break;
            case 7:
                switch(String(type).toLowerCase()) {
                    case 'cash'     : url = s_one + '&cityCode=brazil_Cash&building_type=1';     break;
                    case 'refinery' : url = s_one + '&cityCode=brazil_Refinery&building_type=4'; break;
                    case 'barracks' : url = s_one + '&cityCode=brazil_Barracks&building_type=5'; break;
                    default         : url += '&cityCode=brazil_Properties';                      break;
                }
                break;
            case 8: url += '&cityCode=chicago';  break;
        }
        httpAjaxRequest({
            url: 'remote/' + url + '&requesttype=json',
            success: function(jsonData) {
                try {
                    var data = Util.parseJSON(jsonData.data);
                    var message = (data.description||data.success_message);
                    callback({
                        success: true,
                        message: message.replace('%ENERGY%','0').replace('%STAMINA%','0'),
                        cash: parseInt(data.cash)
                    });
                }
                catch(err) {
                    callback({
                        success: false,
                        message: 'You can\'t collect.',
                        cash: 0                  
                    });
                }
            }
        });
    },
    /**
     * Heal in specified city.
     * @param {Number} to_city 0 current city, 1 force new york.
     * @param {Function} callback
     */
    heal: function(to_city, callback) {
        var url = 'remote/' + MW.getIntURL('hospital', 'heal', to_city);
        if (to_city === 1) {
            url = 'remote/' + MW.getIntURL('hospital', 'heal') + '&xcity=1';
        }
        httpAjaxRequest({'url':url, 'success': function(jsonData) {
            try {
                callback(jsonData.hospital_message);
            }
            catch(err) {
                callback('Error healing at '+(to_city===1 ? 'New York' : 'Current city'));
            }
        }});
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
                Logger.debug('MW.travel: '+ cityId);
                callback && callback(parseInt(cityId));
            }
        });
    },
    /**
     * Load specified url
     * @param {String} url
     * @param {String} div selector
     * @param {Function} callback
     */
    goPage: function(url, div, callback) {
        httpAjaxRequest({
            url: url,
            liteLoad: 1,
            message:  (div ? 'Loading page...' : null), 
            success: function(htmlText) {
                if (MW.update(htmlText)) {
                    if (div) {
                        $('#'+div).html(htmlText);
                    }
                }
                callback && callback(htmlText);
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
                    Logger.error(err);
                    callback();
                }
            }
        });
    }
};
// ==Script==
// @id        Facebook.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @namespace facebook
 */
var facebook = {
    user: { 'first_name': 'Unknow' },
    
    session: { 'access_token' : null, uid: 0 },
    
    updateSession: function(callback) {
        var fb = facebook;
        MWFB.getLoginStatus(function(response) {
            if (response && response.authResponse) {
               fb.session.access_token = response.authResponse.accessToken;
               fb.session.uid = response.authResponse.userID;
            } else {
                try {
                    var s_info = unsafeWindow.SNAPI.sessionInformation['1'].session;
                    fb.session.access_token = s_info.access_token;
                    fb.session.uid = s_info.user_id;
                } catch (e) {
                	Logger.error('Unable to load facebook session.');
                }
            }
            callback && callback(fb.session);
        }, true);
    },
    
    init: function(callback){
        MWFB.init({
          appId      : '10979261223',
          status     : true,
          cookie     : true,
          oauth      : true
        });
        facebook.updateSession(function(session) {
            Logger.debug(session);
            MWFB.api('/me', function(user) {
                if (user && user.first_name) {
                    facebook.user = user;
                } else {
                    try {
                    	facebook.user.first_name = unsafeWindow.SNAPI.getCurrentUserInfo().name;
                    } catch (e) {
                    	Logger.error('Unable to load facebook user info.');
                    }
                }
                callback && callback();
            });
        });
    },
     
    // Graph API Request
    api: function(name, path, callback, data) {
        
        var bTimeout = false,
            url = 'https://graph.facebook.com',
            start_at = parseInt((new Date()).getTime()),    
            timeout_id = setTimeout(function() {
                bTimeout = true;
                Logger.error('Request to "'+name+'" failed "timeout".');
                callback({
                    error: {message: 'timeout'}
                });
            }, Math.max(UserConfig.main.fbTimeout||0,30)*1000);
        
        data = data || new Object();
        
        data['format'] = 'json';
        data['access_token'] = facebook.session.access_token;
        
        if (path === 'stream.publish') {
            url = 'https://api.facebook.com/method'
        }
        
        $.ajax({
            url      : url + (path.charAt(0)==='/'?'':'/') + path + '?callback=?',
            dataType : 'jsonp',
            global   : false,
            data     : data,
            success  : function (r) {
                clearTimeout(timeout_id);
                var delay = parseInt((new Date()).getTime()) - start_at;
                if (r.error_code) {
                    r.error = {'message': r.error_msg};
                }
                if (r && r.error) {
                    Logger.error('Request to "'+name+'" failed "'+r.error.message+'".');
                } else {
                    Logger.debug('Request to "'+name+'" completed. ('+Util.toDelayString(delay)+').');
                }
                if (bTimeout === false) {
                    callback(r);
                }
            }
        });
        
        
    },
        
    // PERMISSIONS
    getAppPermissions: function(callback) {
        facebook.api('getAppPermissions', 'me/permissions', callback);
    },
    
    requestPermission: function(permissions, callback) {
        if (!Util.isFunc(callback)) {
            return;
        }
        MWFB.login(function(response) {
            if (response && response.authResponse) {
                callback( true );
            } else {
                callback( false );
            }
        }, {
            scope: permissions
        });
    },
    
    needAppPermission: function(perms, callback) {
        if (!Util.isFunc(callback)) {
            return;
        }
        var bNeedAsk = false;
        facebook.getAppPermissions(function(result) {
            var values = (result && result.data && result.data[0]) ? result.data[0] : null;
            if (!values) {
                facebook.requestPermission(perms, callback);
                return;
            }
            Util.each(perms.split(','), function(i, name) {
                return (bNeedAsk = (parseInt(values[name]) !== 1)) === false;
            });
            if (bNeedAsk) {
                facebook.requestPermission(perms, callback);
            }
            else {
                callback(true);
            }
        });
    },
    
    // REQUESTS
    sendRequest: function(args, callback, bOnlyInternally) {
        var data = args.data;
        console.log(args);
        args.data = '';
        args.message = String(args.message).replace(/&#39;/gi, "'");
        if (bOnlyInternally !== true) {
            facebook.updateSession(function(session) {
                args['method'] = 'apprequests';
                if (Util.isArray(args.to)) {
                    args.to = Util.toJSON(args.to);
                }
                MWFB.ui(args, postSend);
            });
        } else {
            postSend({request: parseInt((new Date()).getTime()/1000)});
        }
        var retries = 3;
        function postSend(response) {
            if ( !(response && response.request) ) {
                callback(false);
                return;
            }
            var url = 'remote/' + MW.getIntURL('requests', 'postSend');
            url += '&rid=' + response.request;
            url += '&data=' + data;
            url += '&to=' + args.to;
            httpAjaxRequest({
                'url': url,
                'success': function(r) {
					if (r && r.data && r.data.reqsentmsg) {
						callback($(r.data.reqsentmsg).find('div:first').html());
					} else {
						callback(false);
					}
				},
                'error': function(msg){
                    if (retries > 0) {
                        retries--;
                        postSend(response);
                    }
                    else {
                        callback(msg);
                    }
                }
            });
        }
    },
    
    // PUBLISH METHODS
    streamPublish: function(args, callback) {
        var target, privacy, attach, actionLinks = args.actionLinks;
        
        function fixText(text) {
            return text.replace(/&#39/gi, "'").replace(/&#34/gi, '"')
                       .replace(/\{\*actor\*\}/gi, facebook.user.first_name);
        }
        
        if (!Util.isSet(actionLinks) && (args.actionText && args.link)) {
            actionLinks = new Array({
                'name': args.actionText,
                'link': args.link
            });
        }
        if (args.caption) {
            args.caption = fixText(args.caption);
        }
        if (args.description) {
            args.description = fixText(args.description);
        }
        if (args.name) {
            args.name = fixText(args.name);
        }
        if (!Util.isSet(args.target) || parseInt(args.target) === 0) {
            privacy = Util.toJSON(UserConfig.main.privacy);
        } else {
            target = args.target;
        }
        var feed = {
            'message'     : args.message,
            'link'        : args.link,
            'picture'     : args.picture,
            'source'      : args.source,
            'name'        : args.name,
            'caption'     : args.caption,
            'description' : args.description,
            'actions'     : actionLinks
        };
        if (Util.isSet(args.properties)) {
            attach = {
                'name'       : args.name,
                'properties' : args.properties
            }
            if (args.picture && args.link) {
                attach['media'] = [{
                    'type' : 'image',
                    'src'  : args.picture,
                    'href' : args.link
                }];
                attach['href'] = args.link;
            }
        }
        if (Util.isSet(actionLinks)) {
            actionLinks = Util.toJSON(actionLinks);
        }
        facebook.needAppPermission('publish_stream', function(success) {
            if (success !== true) {
                return;
            }
            if (UserConfig.main.publishPreview === true && !Util.isSet(target)) {
                if (Util.isSet(attach)) {
                    MWFB.ui({
                        'method'       : 'stream.publish',
                        'message'      : args.message,
                        'attachment'   : attach,
                        'action_links' : actionLinks
                    }, callback);
                } else {
                    feed['method'] = 'feed';
                    MWFB.ui(feed, callback);
                }
            }
            else {
                if (Util.isSet(attach)) {
                    facebook.api('streamPublish', 'stream.publish', callback, {
                        'message'      : args.message,
                        'target_id'    : args.target,
                        'privacy'      : privacy,
                        'attachment'   : Util.toJSON(attach),
                        'action_links' : actionLinks
                    });
                } else {
                    feed['method'] = 'post';
                    feed['privacy'] = privacy;
                    feed['actions'] = actionLinks;
                    facebook.api('streamPublish', (target?target:'me')+'/feed', callback, feed);
                }
            }    
        });
    },
    
    notesCreate: function(title, content, callback) {
        facebook.needAppPermission('create_note', function(success) {
            if (success === true) {
                facebook.api('notesCreate', 'me/notes', callback, {
                    'method'  : 'post', 
                    'subject' : title,
                    'message' : content
                }); 
            }
        });
    },
    
    likeAdd: function(id, callback) {
        facebook.api('likeAdd', id+'/likes', callback, {
            'method'  : 'post'
        });
    },
    
    commentAdd: function(id, comment, callback) {
        facebook.api('commentAdd', id+'/comments', callback, {
            'method'  : 'post',
            'message' : comment
        });
    },
    
    // FRIENDLIST
    friendlist: function(callback) {
        facebook.api('friendlist', '/me/friendlists', callback);
    },
    
    friendlistGet: function(listId, callback) {
        facebook.api('friendlistGet', '/'+listId+'/members', callback);
    },
    
    friendlistCreate: function(name, callback) {
        facebook.api('friendlistCreate', '/me/friendlists', callback, {
            'method' : 'post', 
            'name'   : name
        });
    },
    
    friendlistAdd: function(listId, userId, callback) {
        facebook.api('friendlistAdd', '/'+listId+'/members/'+userId, callback, {
            'method': 'post'
        });
    },
    
    // RETRIEVAL METHODS
    /**
     * 
     * @param {Function} callback
     * @param {Object} data
     */
    getFeeds: function(from, callback, data) {
        data = data || {};
        data['date_format'] = 'U';
        facebook.api('getFeeds', from+'/feed', callback, data);
    },
    /**
     * 
     * @param {Object} ids
     * @param {Object} callback
     */
    getAppUsers: function(ids, callback) {
        facebook.api('getAppUsers', '', callback, {
            'ids': ids.join(','), 
            'fields': 'id,installed,name'
        });
    },
    /**
     * 
     * @param {Object} ids
     * @param {Object} callback
     */
    getUsers: function(ids, callback) {
        facebook.api('getUsers', '', callback, {
            'ids': ids.join(','), 
            'fields': 'id,first_name,name,picture,link'
        });
    },
    /**
     * 
     * @param {Object} callback
     */
    getAppFriends: function(callback) {
        var s = 'SELECT uid, name FROM user WHERE is_app_user AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())';
        facebook.updateSession(function() {
            facebook.api('getAppFriends', 'fql', function(r){callback(r&&r.data)}, {'q': s});
        });
    },
    /**
     * 
     * @param {Function} callback
     */
    getGroups: function(callback) {
        facebook.needAppPermission('user_groups', function(success) {
            var groups = {'0': 'My Wall'};
            if (!success) {
                callback(groups);
                return;
            }            
            facebook.api('getGroups', 'me/groups', function(r) {
                if (r && r.data) {
                    Util.each(r.data, function(i, g) {
                        groups[g.id] = g.name;
                    });
                }
                callback(groups);
            });
        });
    },
    /**
     * 
     * @param {Function} callback
     * @param {Object} limit
     */
    queryFeed: function(callback, limit) {
        var
        s = 'SELECT strip_tags(attachment),post_id,source_id,target_id,created_time,permalink FROM stream '
        +   'WHERE source_id IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND filter_key="'+AppInfo.id+'" '
        +   'AND created_time>0 order by created_time desc limit '+(limit||150);

        facebook.updateSession(function() {
            facebook.api('queryFeed', 'fql', function(r){callback(r&&r.data)}, {'q': s});
        });
    },
    /**
     * 
     * @param {Object} max_time
     * @param {Function} callback
     */
    queryHomeLinks: function(max_time, callback, limit) {
        if (!max_time) {
            max_time = parseInt((new Date()).getTime()/1000);
        }
        var queries = {
            'query1': 'SELECT uid,status_id,message,time FROM status WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=me()) '
            +         'AND time<'+max_time+' order by time desc limit '+(limit||150),
            'query2': 'SELECT strip_tags(attachment),post_id,source_id,target_id,created_time,message FROM stream '
            +         'WHERE source_id IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND filter_key="'+AppInfo.id+'" '
            +         'AND created_time<'+max_time+' order by created_time desc limit '+(limit||150)
        };
        facebook.updateSession(function() {
            facebook.api('queryHomeLinks', 'fql',
                function(r) {
                    var data = {status:[],streams:[]};
                    if ( r && r.data && r.data[0] && r.data[0].fql_result_set ) {
                        data.status = r.data[0].fql_result_set;
                    }
                    if ( r && r.data && r.data[1] && r.data[1].fql_result_set ) {
                        data.streams = r.data[1].fql_result_set;
                    }
                    callback && callback(data);
                }, {
                    'q': Util.toJSON(queries)
            });
        });
    }
};
// ==Script==
// @id        Ajax.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Cross-domain request
 * @param {Object} args
 */
function httpXDRequest(args, bSilent) {
    var errorCallback = Util.isSet(args.onerror) ? args.onerror : args.onload;
    
    if (global.is_chrome === true) {
        args.id = 'FBMWAddon';
        chrome.extension.sendRequest(global.chromeExtId, args, function(r) {
            if ( !Util.isSet(r) ) {
                if (bSilent !== true) {
                    showHelpPopup({
                        icon: 'info',
                        title: 'MWAddon Chrome Plug-in',
                        message: 'You\'ve request an action that require MWAddon Chrome Extension.'
                        +        '<br>You can install it clicking <a href="'
                        +        'http://dascript.bravehost.com/MafiaWars/chrome/FBMWAddonPlugin.crx'
                        +        '" target="_black">here</a>'
                    });
                }
                errorCallback('Not supported.');
            }
            else if (Util.isSet(args.onload)) { 
                args.onload(r);
            }
        });
    }
    else if (global.xd_support === true) {
        setTimeout(function() {
            try {
            	GM_xmlhttpRequest(args); 
            } catch (e) {
                Logger.error('httpXDRequest: '+e);
            }
        }, 0);
    } else {
        if (bSilent !== true) {
            showHelpPopup({
                icon: 'error',
                title: 'not supported',
                message: 'This feature is not supported by your browser.'
            });
        }
        errorCallback('Not supported.');
    }
}

/**
 * Use "XMLHttpRequest()" to do an ajax request.
 * 
 * @param {Object} args
 */
function httpRequest(args) {
    try {
        var xmlHttp = new XMLHttpRequest();
        
        if (!xmlHttp) {
            throw Error('Can\'t create XMLHttpRequest object.');
        }
        if (typeof(args.success) !== 'function') {
            throw ReferenceError('success is not defined');
        }
        if (typeof(args.url) !== 'string') {
            throw ReferenceError('url is not defined');
        }
        if (typeof(args.timeout) !== 'number') {
            args.timeout = Math.max((UserConfig.main.rqTimeout||0),30)*1000;
        }
        if (args.liteLoad !== 1) {
            args.liteLoad = 0;
        }
        
        // define url and params
        var connector = (args.url.indexOf('?') == -1) ? '?' : '&';
        var url = (/^https?/.test(args.url) ? '' : 
        global.location.protocol + '://' + global.location.host + '/mwfb/');
        
        var body = {
            'ajax': 1,
            'liteload': args.liteLoad,
            'sf_xw_user_id': global.USER_ID,
            'sf_xw_sig': unsafeWindow.local_xw_sig
        };       
        
        // add optional parameters.
        if (typeof(args.data) == 'object') {
            Util.each(args.data, function(name, value) {
                body[name] = value;
            });
        };
        
        // set timeout
        var nTimeout = setTimeout(function() {
            xmlHttp.onreadystatechange = function(){};
            xmlHttp.abort();
            Logger.debug('Timeout for url:\n'+args.url);
            args.error && args.error('timeout.');
        }, args.timeout);
        
        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState == 4) {
                clearTimeout(nTimeout);
                if (xmlHttp.status == 200) {
                    args.success(xmlHttp.responseText);
                }
                else {
                    args.error && args.error(xmlHttp.statusText);
                }
            }
        };
        
        // send request
        xmlHttp.open('POST', url + args.url + connector + 'xw_client_id=8', true);
        xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlHttp.send($.param(body));
    }
    catch(err) {
        Logger.error(err);
        args && args.error && args.error();
    }
}
/**
 * Do an ajax request.
 * 
 * @param {Object} args
 * @param {Function} [callback]
 */
function httpAjaxRequest(args, callback) 
{
    var user_clicks = 1;
    var showOverlay = Util.isString(args.message);
    try {
        if (Util.isString(args) && Util.isFunc(callback)) {
            var sUrl = args;
            args = {'url':sUrl, 'success':callback};
        }
        if (!Util.isObject(args)) {
            throw ReferenceError('args is not defined.');
        }
        if (!Util.isFunc(args.success)) {
            if (Util.isFunc(callback)) { 
                args.success = callback; 
            } else { 
                args.success = Util.noop; 
            }
        }
        if (!Util.isFunc(args.error)) {
            args.error = args.success;
        }
        if (!Util.isSet(args.data)) { 
            args.data = new Object(); 
        }
        try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {Logger.error(err);}
        args.data['clicks'] = user_clicks;
        
        if (showOverlay) { loadingScreen(args.message); }
        
        var updateFromJSON = function(data) {
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
                Logger.error(err);
            }
            args.success(data);
        };
        var updateFromHTML = function(response) {
            MW.updateUri(response);
            try {
                var oCtrl, sMeta;
                if ((sMeta = Util.substr(response, '!-- Current Page: ', '--\>', 1, 18))!==false){
                    if ((oCtrl=Util.doRgx(/([a-zA-Z]*)?(?:_controller) ([0-9]+)/, sMeta)).$1) {
                        unsafeWindow.User.page = oCtrl.$1;
                    }
                    if (sMeta.indexOf('sk_update') != -1) {
                        unsafeWindow.SK.update();
                    }
                }
            }
            catch(err) {
                Logger.error(err);
            }
            args.success(response);
        };
        // send request
        httpRequest({
            url       : args.url,
            data      : args.data,
            liteLoad  : args.liteLoad,
            timeout   : args.timeout,
            
            success: function(htmlText) 
            {
                if (showOverlay) { loadingScreen(); }
                if (( htmlText = Util.trim(htmlText) ).charAt(0) === '{') {
                    updateFromJSON(htmlText);
                } else {
                    updateFromHTML(htmlText);
                }
            },
            error: function(errText) 
            {
                if (showOverlay) { loadingScreen(); }
                args.error(errText);
            }
        });
    }
    catch(err) {
        Logger.error(err);
        loadingScreen();
        args && args.error && args.error(err.message);
    }
}

/**
 * Show an error message about server http request response.
 * @param {String} msg
 */
function showBadResponse(msg) {
    showHelpPopup({
        icon: 'error',
        title: 'Bad server response',
        message: msg||'There is an error in the server response. Try again later.'
    });
}
// ==Script==
// @id        Resources.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @namespace global.resource
 */
global.resource = new Object();

global.resource.ok_icon = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAALMUlEQVRogc2aa5Ac1XXHf/fe7p7Xzs6+d/YhrVZCoJJVKLIxxgkg5BiDZSJsqEROyXZCVb6lyo5SpEiIDSTOh2Aq4JQfFWMLOUUp/uAPSdkujKjYIkhIQhjQMvvelfY5+5zdefbM7Mz0dD50zz4shB5e'
        + 'aX2qbt2era0753/O/57zv7dH8Hto2g+0x6QQfymkvFchk8pW3SInjqW+mn4JKALlyv+KjXPzUpMvyhphi9d31e3e/cmmu+kIbGUmO8uYeZHuxHsk8rFJ64L1pfi/JM/gALHVRjtdsYrzB7d+afdn2j7HXHaRt+fOE8st4BE+tgVvI2TUVierFh8VQf53qWspBlhyox2v'
        + 'mEQc3lW3e/cdDZ/g9NRbdMV6MIsZUoUUUXOK8cwkDZ4w26p3BgOf9P8rUANovxcAtP/Q9vj1wFMHOw8xkBgmmp1GCkCAECCEIFfKM5ePsdl/C3qNvheoBzzaBvsOgFTihQObHkETGj2LfUjheL8mugIs20IKgUd5AKoAY8MBGD/UD2+rvnXvHQ2f4NT0WddJ6UQfAIFw'
        + 'S42UAikFZdsCUIDYUACeHxk12OLpA5sfYT6/wHRuBimF47hYKZCVzyEjSMHOQ5E53FK6oXtA2OLfP7Pps6Gwv4XfzL+LFBIpJVKq5WflftalRo03xPxSlNK0VSmj1oZlwPdD7746X/1X7gnvYzA5TL6cR0rpRhuEy6FKHloDLVgUmcqNEf9Z/KeACRQ2DIAQ4ujBrYfA'
        + 'hr7EgOu8w/e1zguq9AAhI8h7i6fJDGT+K3kyfRFIbhiAwBH/P+2qu73jltB23pg+jSYVQohLIi+EQCJprQoTNUdYTMQujjw5fgRYAFJsBIWqfhDo9Om+pw50PMJ4JspiIY5Uq6IvxJpMtPibKdkFRhKD5vSLs88Ai0AMyAH2Td/EQhdHH2jfT7URoifRi5ICTUo0JdGU'
        + 'QpNqea72BKk2gvTGz5PqSR1LnkoNAXNAGrcK3dQMBI9UfaGtqn3vPS330RWPUBYWSmpIN9pCuANQUtESaGY8PUJsbjYy8sz4T3AinwBKlTVvGoDqo8EaAUe/eMshFgtxJszJZe5Lscp54dAn7G3GsgtcWOwzp1+aew6HOgtAHrAr6940CgnEM/e27gu1BzbTl+xHkwql'
        + 'FJqS7rwy6j21VHuCvB97h0QkdSxxKjmEE/0Mq84CcJMyUHOkep9fD3ztgU37GU4PY1oZlJJus1qbAV3qNPjqGUkOMzczE7n4zOgHUuemAhBKvvDF7YcQUjCWHUMpBZQpY+HUTLlMpUZfPflyjoH5XjN6ZPay1LlpAOp+XHN4S2jr7q2hWzg1f5qp/DSqIhGEO9vOXGvU'
        + 'Yosy70y/RSKSOBY/lbgsdS4F8G06UfwNgj3YCCBBgV9wgf/h+8xfboEPdf5ITadfCzz9+c5HiWajzOSn0ZXmAlBrgHiUQZOvkcnkGPMz85Ghp0c+lDprAXyHx3y676W9LZ9iW+hW0sUMqWKS3kT3Q4P+3m/xLM/xBP8GLF0LEKnkt+9q+cNQ0BPk7dl3XOfdjVsBIBRS'
        + 'Slp9LZTtEhfmB83okakrUmf5O/gO+3y676W/3nmYP2rex3RmgflsEsoe7mq4j0e3fLm6rqnhmzzPy0AQR4df0RqP1u+r9dcd2Nf+KQbSgxTsJXRNw9A0dKWjKw1D6RiaRoO3nmojSGT2PPFI8tjiyStTp2KK/fznX2z/q44mX5jjEyeILyUxS1nSxQzpYopaby3bq3cQ'
        + 'LY3vzN2dvY3XOI57I3BZ51+urxFCvPrntx6qUUrRlexCUxp6ZWjOrCkNr+alxRdmNHGRoZHhSO/XBp4DZoB5oHClQEkU9+6qu53zsR4KZcevSjcs2iVGU+PkrQIPtf8prU2bvyC+y2nxoOgA9MsuasvDe5o+1tEZ2kYk1e04r6113nCz0eILkyuaRKJd5uSPoldNnYo5'
        + 'e0BAspBy/+SK2GVRJeiN91OlB9hV9zGUVDtmHpp8pVws/4n1K2vUzcayNf+4cY9P9z31YMfnGDVHSVspN9pOk9Kl86ykotaoIWgEeG30TTI92WMLJ+NXTZ2VDDi6FRvbAVzR4cKp1GOZceZzMSbMSWayc9xefwc7w7tv8/yZ8brvb733Ah5Wzh1IJV94oOOzGEpn2BxG'
        + 'kxq6Usucr2TAr3tp8NbTN9fHwkws0v+NoauqOpcCKBOJxM/TWb0ZKdSyDl+ylhhKXCBXck5KUgjihThT2Rm2Vm9nd/jjrcYu/b+rvhrYWwHR8nLzY52hzr0fbbqDrlQXtigvO796GJpGs7cJcylDdzRijl8HdSqmuIfkHLOPfrzxLoQQpAsZFgtxJjNTIEApp1Yr5ZS9'
        + 'ol2kaBdpD26iKRD2xEOxzxt79GnvDs+0sVn/+cHbDnmLFBkyB5c36orzDphao5YaI8TrF15n+tTs9yaOTb0BTLvRt67WeQfArxhM353a0Z/r3bk9uAMhBH2LAyBwD9VqZbg63aJEvpynraqN1mCbZ96YOaBa5P77Ov64/SP1uziXOAeStZHXnOHTvTR5m+iZ6WVwYOhs'
        + '99/1f49rqDqXAgCb13g1f2e2eoKxOwOqhjpPDaliGiGEG/0VIBX1iIClcp5GfxNtVe1ITTQ+2LGfsdwYsWLskpJpuHPY20y2kOXk4Cmz9xsDjxfjxUkXQJZroM5aAFDi17y59JFcMhGIfbrN10Gdt5Z0KY0Uwo2+dCSwdE9NUoEE0zJp9DfSWbMNKQV96V50pdaUTkNz'
        + 'Gletp4YaPcSvh04wfnzy2dlfzr8DTOEc0K+JOqsB4IIocJLzpduXEgu+2fsbfWEafY2ki2mkFGuiv6zdXWD5co6gUcVkfhIkl9Z9TSOg+Wj2NhOZ7magf+Bs95P9L+LwPsZ1UOe3AVRAlHiD8/YflJOLvtn7w742wv4weSuHLexVGZDu5lwBkbVMl/dqecNq2gqQsDdM'
        + 'ZinDGwMnzZ6vDzxeiBejwCzu4fx6Afz2iawMZEv/XPq+NVZ6oif5G0r2EltDnfg137Jmd0SY81y5PVtRlytzhWq1Ri1e5eX0yBnmT8Sez1wwozib1uQ6VO5q+yBhZgOl0v9Z57WPqmTcO39/g7eZZn8zeSvnltaV24NKZ9UqkZdrS6Zf89HkaaJ7upuB/sGz7/9D37pQ'
        + '58MALIMonCie13dpE0lv7L4Gf7PR7G8mV86BSyfNlQi60tDkpQ1LV4qwN4xZMDk5eMqMfL3v8cLi+lCnYh92qC8D2eQ3Uy9n38oe7I29m8lbWbYEN+PTvAi3O0shl2klVw0lJbV6LV7l4ezIWeZOxJ7PDK8fdSp2JW1vA1b+7aUJbZM6l66LP+wz/J72wCaWynmEsB1h'
        + 'plbkcaXz+nSHOr1uw+r6+551pc7VAlgGkXsrP2ls1s+ZdcmHA0aVp62q3XlrQmnVHnBnTdHiaSFbMDlz4YzZ9Y+9jxcWC+tKnWsBUDHLPJud9G7xnsvWpx6u8lR5WqvaKAvndmE1iDqjDq/ycnb0DGOvTjwbfWXmd25Y6wEAwEqfyUz6tnjPmXWZh/16wNMaaMMWNmVh'
        + 'oSuFX3caVv9sL6PDY2fffSJyQ6hzvQAArNTp9KR/i++cWZW8M+AP1LcGWpfFXqO3kVQuxfsTXeZ7T0ZuGHUqdr0vuq3Em8lJK2kdL21f+rTURENzIEytp5Z8Mcf7U+8xcTz6bPSV6RtGnYr9Lm/qrezFXLKcLf+y3FbsiGYn2kYTF43x2dG52dNzL3Z/q//nOCpzgRtA'
        + 'nYqtx28ldCAENLBy7bIExHFqfo51qvkfZOv1Yw8N51hpuGtaOCAK3EDnAYRtr/u+uqn2/+06dvy3qQOnAAAAAElFTkSuQmCC';
        
global.resource.mwaddon_icon = 'data:image/jpg;base64,'
        + '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e'
        + 'Hh4eHh4eHh7/wAARCABAAEADASIAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAABwAFBggBAgME/8QANRAAAgEEAQMCBAIJBQEAAAAAAQIDBAUGERIAByETMQgUIlFhcRUWIyRBQlKCkRcyM2KBof/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMFBP/EACIRAAICAgIA'
        + 'BwAAAAAAAAAAAAABAhEDMRIhBBMiQWGh4f/aAAwDAQACEQMRAD8Apl1YS1/DFc66/wCP0Yyb07bd8W/WB682/YgYBd0/H1PqIMkf1ch4Ynj46r31aa0fEFAI7Ji9VdVp7PS0MMMtSqMeKpRvE0XgctGRIW8ePcnoAOdp+0+Q5xklioqmludos96eeOmuzW9pYXeKGSXg'
        + 'myocn0mGg33+3TTesEvMeYVOP4/bb5eDEW9JmtbwzSBNCQmIFioVtr7n286PgGXGu6mI43jOI2Wx1NNTC2VPzlTIYZOZmegnhlZmO+R5yaGvAAUDwOmntZmuJW+XHay7XCNq61W9IITJHIwp/wBs7SHQHk8SNHzrfQDT2O7Ezd0LVS10GRm2lrxLbayM0HqmlVaZpll/'
        + '5F5BmAj4+NE72fbpo7h9mMkxae30lDDcL7WSWcXa5RUtvbVvjLuo5sC2xqMnZC/l1JuxPd6Pt/Q5vAlYsb3KZJaFtHy3JwxHjx9JU+ft1Obj3mwy55lleS1FypluVbSfo2jneCVv3X5VgQgA0hMrEFiN68ex6Ar5Q9te4VctK1Hg+R1C1cDVFMY7bKRNEvHbr9PlfrTy'
        + 'P6h9+otIjxyNHIrI6khlYaII9wR1Yyl7yQVXde61lZlksON19tgo5oHSVkkj9CJJeBQh4pCYlPNfJ4+d+Oq9XSSOW51UsMkkkTzOyPISXYFjosT7n79AebpdLpdAZUbOt66lmJQYvFL6l5rqhCVI3Frxvx7EdRWBxHPHIVDBGDcT/HR9urR9jbFg15pJqbIO31DXWinp'
        + 'AbjcXWoWVHD8gTIraG10NKUI9yCpOoeRY+2jfFgeZOvYrbJb0rb3HQ2mRZ/XmWKEH6dljob30Wbf2swevqkwqHKqtc1alaqjkNP+5SMYhKsJbeweA5b1r6vJ2OHUVyK5WUdxqmvxi0JaqWBZEpUA8LKGYggHewAQvnewuyNnQnFryKnihrbnSxwfpyksjCKv9WFnecD0'
        + '4gq8TIWKlDonj5Ka0AvVl6lZlKPGXEAnS63mSSOVo5UZHU6ZWXRB/L+HWnUFRdLpdLoAmdjMHpskvlXeLqxNjsFHJcrkAgJcIP2cK72CzycVHIa1yJB1oyy/ZfOaE2i01KVFwuc7110r/l0ScM/HVOrgeEQKGLDzyd1GgNM24fkEmP8AZf8AVa2QlrvlFaa6saNSZDRU'
        + 'xAhjGvI5TCRt/ZCD79MFPiHcOWmeW24LlFZJKCfVhtU7gD+1etEldsvdQ62xszn5JXpKWghARIdy1AHIs3Jt+f5dHY8e+h0TfhBwaPI+4NHcnpZqpKVw6zcA0cMikk8ixA3x4ka2wJ/268gdS4HnVHYKl7vh2RUpjmXh8za50OmDFvdfbYH+f8nD4Sr1SY/SVlBNT3aa'
        + 'mZlmlFPH6a+qQoYM+gQo1xIL6I34PXkzSpP5Ol4eHmyUo1aX3r9BX8W9tFm79X61K0LpSpTIjR+5X5eMjn/20QPyA6E/RT+LC6wXjv8A5RUwUkFMYp46aX0TtZJIokjd/wD0qf8A5vzvoWdbR0qOZNtybezaJHlkWONGd3IVVUbLE+wA6NOKYJi9gyy14nfaNcnzeulS'
        + 'OW2tUNDbbPtSzGqkjIeZ4xpnRGVVAYFiRroTYrdWsWT2q9pEsrW+thqhGw2HMbh9H8Drp6ospWjvOSXfT1VVd454A7sVYJO25W2P5mTkh/B26kqGrKrx3dx3uDkHbyy6pJ6SjY0lHi1sFKsqGIcHT01MraD72WYhgfPjqO9ysK7l0NrxGpo8izvIbtkNPUzzWueCoFVR'
        + 'tAyK4ZBI7Hy58kDQA+/j2z/EC1fTVVdV03pX2sxuSxVFWF2xQ74ty1veyST+I+3XK3d9jTdrI8LY8pUx+ezpV8DyRZABoHW+OgB+SjqW7JZjKMZ7lYQ+KJjGRZ3dq2/UElXLa4o6mnqqT02AdCkcjMCCTs+NfxHTxJ3G72mkNq/03yC6x04FPXi9W2orJuTgcU9VEjkj'
        + '2GUj6ix2CD5101v3zgftVJhboJJ2xxLMtUUPJVUEFQdb4nYH9o663HvvTz9s5MVhjEdWcXgsTVYVg0gReJBOt60W9/6z1D7Ck1ojGV4FbL4LhJjtjvOJ5TQ07Vtbid35s8sA2zS0kjhXfiv1GNxy0GKs+uhF0Z7n3Vpq3uHgWWyScmxazU9HKADyqHhD/T5HkOX0fwJ6'
        + 'DHQg/9k=';

global.resource.configuration_title = 'data:image/jpg;base64,'
        + 'R0lGODlhswApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAswApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKTlJWWl5iZgzd+nZ5+dCaao6Slpqeo'
        + 'lUafrH4oqbCxsrOpEq2serS6u7y9ADi3rCS+xMXGlk6sUlSsLsfP0NBan2iCrEjR2dq7ZJ9ignqfTIwnVVxmZFo3DYwt7u6D7/CC8vXw9owhUV5mZlw2C9rVoycvnr0VIw48GmjQ3kB8i8qdS7dO4LuG8Lp5+gYgnKdxg9AEA7JIY6cvguh8oiHIZCs6AFwSWWQmGI+S'
        + 'n2YCUOmJZcxgfsAEZOSxE5ZBQIB2qiZzkchbJAe5RLlzpUuORf2ABHBGaQuprMpU7dkSKMymgp4G8/nTk06enf98urwVYREJVniQKvXDNOegrkC/lv0kFq4fGlfBiRMkYi/MwZ+EGJZrtm0nnSX25oXs5+1KzreqDcLSSoSgpEr7umXsGCwryVa9Kf4oCMpePxhA36Ic'
        + '7KxfAEzwtuLA2TNZy0AtDLLTysrpvaov176dG/naxB0XA5DyiQwAW5+GWd8N2op5K12Q6wTTHUADViyKp/xs3Qr7T84AcLgFR5CS86yclx5a3HniHXieiDfXbtjJAceDcDgHgBefYAMAHvjp1gpv0jGClks9zNZJfmhNJh8AfNCXQzASMMLKK651SKEnFmLoCYm3ISYb'
        + 'JCXSt+CGJ+K0GnI+iOgHjkOaqN7/fMdx4UlWMLj4CYwn9njcj6zouFEkVsbFWYFZBhljZ5wVmd2NJyrZ5WGCMNcJM55UIaUnVC5pp5qfgBnbljz+hqdbQwBpp5AdumRmVkh2+Kein0HwCRBweGLGnJ3U+aGfPuYUaJbYPbImh50ZIChahJJJpCBTOKGqE4mauqipbo4I'
        + 'wF2esOBkJ3xQ6kqpOn1anKic7ugpplf6RVqm4jCh7BR2GsolsV6qV8EGrBDnwiccIPEJBIu8yGuayEp3bE+dOuLrkiiEOZ4nXDT7SZE5xCvvmMZFi6UnagiirScOxPAJCN1O+e2d4ZKZ7p6dcDRskgXPtF/BrLR7qSdFRpoh/8HFAiWHQgBY8QkBMFxsjcD0gpuxdA+T'
        + 'K6y50LK5JLAntyLxb85ajCbG9gJlxgOD1NRJLiaIDIC3JePsclMwx1VuI+eipe69Mw9ZczMm56zUB4LYDFNjNAZM58BN/xYsnwszGrNONlp9WQ1ss+0uxQDYLKvRoPrhRqx+bJZiJ27o94mEI39ddNhDpn0YdhskrnjVR7cMqk5gvwtAFVTTLZ8AwiRdDQafgOF1pZEz'
        + 'fDaTSu+YFUiEm622qaF3cujFqbu6kgOfTGoBNZ/vOrjjjGuZsJGo8275oLvDfebcsdd72O1bIuhHf4MQXaXwn2J3eu/YEz+98Yhm/2nKQQHgqP8nmwUOevGqNy566XxeP3zyTNMs+fFHeu841514AQDtn+RuqfzrU1/6fOcHrGgHfmNZHeTQ54fX3QyBk1HBJ7gwgAWw'
        + 'wgDRI9n2Btg76x2QeiAcUusaaKRWKe9xpDvMtfaigAwKboOyG10CD2e6DwYQhTPE4QgdiLwQDlAGt+GW+XQHwxN2sIa0eZ8PWcdAHtZPiTe0wW0o4MLzFTGFOJyMB5MIwYbFT2rz6x4UBwiMvVRnaBp8GwfpNi4/5AtznzCCINooob2dD4EDE8MnoDDE/NBREHbU3ad4'
        + 'cBviDPF/Q/ojikj2KSWwwgnT+MQKBBGcT3ygjJ7wgP1EWDQ4eSL1A0C8WCU9cUlWaJJuPpggAA5QrSoS0U6j7EQpP3HKT61QKacMpVJaOEYmnigKt8mPLoHCy08lg10AQIApXYnIDg0zGMV0nAL2IodB8A8oYtlkhwZGK6Xk55rByCbdUNOJdinzX8wcGDhvIU5f6UAp'
        + 'hhQEEZQixF4uMEg+Y4Va8gOAeQKlnp8ipx/MyQqAHXJg/aRn0ZR0AsMsZQONiIHhOjEGni3Uix76jSDu44n0yGFugpBoKyo6sMkIlKDoPGjRQjpRP5D0oscRRAVacIMbtKAukNgATWuwAnZkYwIvyEEMcJqAojpCpzfgqU+3IQmkKnUUgQAAOw==';

global.resource.homefeedcenter_title = 'data:image/gif;base64,'
        + 'R0lGODlh4QApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA4QApAAAH/4AJgoMAAIOEhYmKi4yNjo+QjYeTiJGWl5iKITdMRDcdmaGio49Gfqen'
        + 'AgBWqH5wpLCxhaattX4+srmON7Z+dCa6wbq0qKqsqK/Cyo7EvbfLw86nKNDVl81+xq3J1tDYtrjdoxLSp3ri6IvY2sjpyt+14e6XOOWnJPPo66vb+dGtegIKlOfvkZNaUqjUclHQ2r5jp7g1HLVvIiYtrdAUqoXE4rKH/RSdqMLFDBktNxosasGyZUtFLl0WikkTUsWV'
        + 'NGUCyKkz5wlQmMi0ElNITysmM3myTPqS6dKdSl9GbeG05YoRBxSBbJcIjTMgioT2QlBIiTMRAMT2omOzlipGav9tsU0rbW7cWlMuxSUKwCgqpHSd2W31pRCdVjQAALGn8W6rwc7ALJjllh9XAGfKUS3k+NSRjWcDr23b6u2izqcgjxbdi4+lvUWPcq47u1UZAIdRJV5c'
        + 'rjFt1r0iANgasZAIe3OBo3JdQxpa1L5IF2sEXbXc2tKyRILdV7ZyVNZPCcl9ajfj76mxO9NI3FUhKPb8YFBfK4XX0NWlp6L+Oz/6VgRAwp1fpwDmH3S6KXbegfFZ0F4yUrRCBgDktIIPa/edwkVGtTxXixUgWtGFftnw10qIItKH4ojAWZHhKSAIOFRsf6kYIosIlgeA'
        + 'EiF+COKId62oIhgLPViIF610BAD/Hq0wxBoRbjhTQodPZnJTWK0QYeIpWsKVJQAELCQjKnzJAceZcFihXpenxZeYIrVQk0hcbGKJSpd8IIaNEmaFRKdhiK0pQy9yGEDln5jsyeeiMSLa5p1b+tEleX686Qh3l37ppT2WgoaKnGtGOqme8SWDKKVv0olAL0cY2oqHkCZq'
        + 'T6OaPsqlqIAm+AimuG56SoS2dApAnHbe6qukuZYHTy2maopqqBvWgoGrqMBq7DWzVnlsnXM6G+iuM4Ibq62SDhHsIsR2O26xyOJGqj3NxvpslS7UYgcA1J5ibbvYlkPruupey+6oumZK5pgCByxpvjrC2Qqo2pLbpR1NLuun/7e6/ulBLV7ge2gtTITMRF6lZHuXyCPT'
        + 'hzLJp35r8Cl8vVygyCx/iUUtwqarMs1rVrBBLRxgQ8MNELmn7bx/MmyEx6/+xwWJQ98g9Q30tfK006G6W3CkMUday9V/ooAzug+z+3XVtagxXGVFx2ss0prmiQpDDO97dsmleW012hpmPa/MXR97958cjO3wp2bv/Z8fcmRl5NHfIkoxKjYwXS3WeE8nuOLQgY1xw4Aj'
        + 'bIvnkDKcc9kKDy6NGQ9Qlnfbfkf+eaWW64s5M5VtjgrpvfDe7t9ci656rIYnojPmOX6w9usXyyu78wnW/WQN1FNPomkDV2/99NrHvvWxgUusff8NWTP5/fF0jk+fG5Ofgsfy08EOecazJya9o5ZcqTC3WUucLO3iglkhNkDAAvZvYP87HeL2hysB1IIEj2sZ/aCno/vV'
        + 'Kn+589+2egU88NGoQAdkoNZA56lpIHCDI6xUBOvnvQp+DGDX65UGNdhBcvGFQH4w0AVF2EH07bCFKmRb8972PCJG74UJiyEKZ3jCGrLrht7BHw9dVkI/QEyKQKTBCikIQAm6sGlYzNx+lnhCGlLRg92pUcSaeEYfwnB+yhIiV7zYRRZa8I24yxsZRWjG79nwgzkMYRbJ'
        + 'tkBBwjGIzJsjCw9pPyTyC4N6ZCIf2ejHJwJSh2+kowJNOMkp6mb/i0ZsmCZr54d98U+MJdqjIUcZQD9AUY1hZKXxULfK+oHyd0XE5RHB+ENUYq+TteSisP6YRhCu0ZMkHBYtj5nFWxJMlHZ05CnzqDlJBtNY5jsFDET3SmPGcpGzLCQzGfm4m6FCTQCQGydHeUcuFeCd'
        + '71SixOAZzyfRswBrKgAGaqECSJjzFGpzYCuWZk96DvJwnMynQckpx+IAgAm1+EA9WuGBQbbzOr7UG3j4Fp3FncICkOgTKpyAkVasgKPWeSYAw5nQ/6Q0gY8blD0UYFFH1iI5jdAfSnfqUTlEol72qKhLD8pSKyZuowxNpEMdYI/b1JSXgpHnUdMzVI/OIBIKd7CHT3kq'
        + 'yypesT+2bKjRAECEckAAmbS76E2lmrrHcLUcgImEDsrBgbYitavKFCeDhPm4QsQgm6gYQ+vQ2kioroaaYyTXWqvqGDy4wQpAucQJKHUKNGxgqh3FqxtXg9dMbKAFN6jBClTikdIuowKgvUELhGPaZQQCADs=';

global.resource.battlefield_title = 'data:image/gif;base64,'
        + 'R0lGODlhjQAoAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAjQAoAAAH/4AJgoMJBwCHiImKi4yNjo+QkZKTlJJGfpiZmGpLlZ6foKGioJeapn4O'
        + 'o6qrrK2NpaeZdK60tbaTsLGYKbe9vre5fnqnUL/Gx6PBAgHDmWTI0NGWpgIAXppoii3b24nc3+Dh4i0A4Yzj3Ifo3ebl6+rg5+EnHYrKAFyaaorNmFiIQHRlQhNQoJ9sZDQRYZRQ1ywADWPNiuhnIUSBDylaVETR1BRE9/Jl2oeIhCk8AA0eLCgQoUKGGA911DTx5UWH'
        + 'Mm1yNMjnUEh9ibCcEnGIpS6CKl1m2phopqycODVClTi1IkyDWQD8HJnIzikrRZMajaUUE1NETjFljCn1JlW3Vv8XpdVEYOsmRBxiwTmkxIpfU36tdOn7V1PgLnDPVvUTWPDixojbdoRcVTFcxmhMgbgHBhuiHLokKDKFghHppjpRL71qVq7NtjtXu15NwJSLYAYemBKD'
        + 'SKQwTTBGayq96DTa1Mdlx269PC5s1cybW6SjiUawWE0QecVERVMV4ZmIg8ckPjHruNJnM3+ePDr0uNQzWVfppxoACJqAwMlkZryf8ogYV9l5lrFn3oHpqQdfdddp4kUAJWnCgm89JSKghcO9VyByAyZoIIIaHhIfJvOpRMAhLmjCARKaQIBheKZl2B567/nBxI1MfHQZ'
        + 'jjke2BGPOn7Y1oh+lJgJH6c4cQj/i5k4EIMmILxIXowwzrihLlwspkmWkgmUJYhWisggNQPgockzAFhBFwyauCDlf1ROGaaCpnw5F5evedlhgkQaiUk113AFgBmZ6AGACW2+CeAhFwqp52Vb+vioo7L1aZcfJO2nFgAiaIKEonHCOWdzdWqZCZ6y3blniABYSg0+QAGA'
        + 'JCZuAJBXJmAFKKN/5VFqVg3AAltZsMJ2uRSxNaw6p6uaVOMbpgAY4BkGmoABanG7gqnstsa6NyqrzGbiLFAOaNKfBZ7pWiWvrCbo7py+0rjsmM3CyhW6mfAmgSZ7qSsnu98GzG2eyrULLr3i2nvXrZhYi18mKPkrKsDbaqtt/7fyVjwkwn8qDG2nmXgBQLmaXEuxxfEq'
        + 'hvGV3nYYbsfP7qPClgMsYIoBEi8KQKMcoszhygQG3SrH9Xm8T4oqKZBzqL32nLKCFj0NtZjyXbqPDPS5yGi2Swvsc8EdSs0n0eNyZQN9FHR9stgGh+3025WSDUBn/AGAA30YqG3y1y1fTHDfUpuZCQzBENCAKdbyQB8HeuutUQGQQ15Z5JL7napClBcwOeWTU6uJCg16'
        + 'BIAPkR5gCuNbr7v3XH7IAOlTlq8X0+uZuM46JhaEnqETkSJgigeNp/4v7ZjYPruBGJuylkDGGySHViqxEdapAPgOZfA7Z8t6828h//cpy+vCvUQuM0CPkX1GZWl9JlEKP/HqBo2v/MCX40R86/cz4dMpfMjhhespod76MNG+7KnOcfEjXvgyljyamKp2kMKDG6xQj0ME'
        + 'AgA7';

global.resource.multigifter_title = 'data:image/gif;base64,'
        + 'R0lGODlhmwApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAmwApAAAH/4AJgoOCBQCHh4SEiIyNjo+QkZKRITdMRDcdk5ucnZ4ARn6io35ijF6k'
        + 'o06frK2QN6midCautbaMobF+IIcYun6rt8Kbub8ow8idxalfh1q/wcnShxK/o3rT2Y7LqRAI1tHawzjWoyTi4tykPS3g6MhOqVJUqS7v2dxYo2hco1x4pMLdc/Vs36FUSAZK44bi1wiAqg61mEhRIsUWiC5OzKixI8aOksiQMgVADykmFi+m9MgSZMuNADyuGHEAVyoB'
        + 'fGJhgygqmMhRRA7RIUXj0E9RQQ8BKecHDYCjfpJCgkrS5CiUT0klhZqKztJyTrmSomPUGpgFh7gJKEjKCgCewP/KAhVKVC5SRF+thdUacuQhq6KwQt1qzSvTvb/IZi0XAdRNH7GKwvXJF8DQUUUX31V6WHPUvqOqnrT72XPXvL8Q61IsNpVTtSJi8ZpMOullUZkH4+2s'
        + 'OxLVv6M9E06MWpfqWKyZ+rGg9lsqBG8D1qaLefohJVayp8pupYtw0KKq6hmvJ4p1rty7Y9feNrt39Ny9m7YCpp5aADlJHaL93XLd/o2kcgwivU3ll2+VFeiIgIwoSGBl+eF2nxxj7Sddf7f5kVtlAZIyoHUGhgZeaQ4ywuCDcznSW4Y03GcGKWpYGBGG/5UIwIkgPkIV'
        + 'AullB8V5HC7oYYNBorgZi/fVZ1D/dDOuWGORBw1pZGkhhudccL3ZGOUoHwJIZIpI3gQAKqOYIWNP1rGYIyI4eqniSFdeBWSKj7RpY292kOLCff2MQsaZcdFYnZtbitKllqSJEWdgc17FxKNTmCglaX48CmltFWyQCgd8kvInk2gKituahfpxKJRfWhmLYAlaw4WkXKYa'
        + 'y6umxRJjp34CShmYT9IJq6GySqWjXy0AVmmjs/5qqqyp0NraKHLUhKson/Ln5KA22onqlKLJ2d+zftBa6qm/OGuNGQ+kJWaf1OqaZq+bdRjrlMK+KWJJWLZarrLk6mJuOR84RooAALDrR7UXXjsqoTdOyjC3wHmbpVY1VFwx/7/BWnyxaW7kOQoeAo9CsMEIN1mZmgxr'
        + '66u94UXM6LfbNjwvqd8JkAoJ0x7srqga0qxyvMPeayyrKSL6M5XBUifhup7urHDPKTuMqGfdvjzxyhjTG/SRROVccqhPb4i1zMBqjaDQ+RYd89H1vouZ106fDC/SbEodM9UuHwvz2OMmzXJpYQ5ccNOgBhq2z3bznWjeRG9mdOJAmx24yIPnWviuXGOLKtsjVq331ZFn'
        + 'TXPYcF/u9sLZQk53I7/hK7G+odc9M8OkM225tXJrPjbnZ7fsutWwry572aPnvrTgJMfNq+6x815lKYwj2/bwy5rNuvEals6fPqO4hZ+UgxUgvtD4fVv/CFt+xGhz2o6vrToR45PPc4u2t2s6AEyk8gE5pHhAaSoyIFv1aIYIKaTCCej7XPCmV77/jSI5yzse5ZJ3Pxko'
        + 'RwEOHEUAnfcIJSincSRy3+zABcHMSVAUIyMcfxzAlDJMKRYbfJ8kQPBB6UXiaF05Xfbqp7P7AYAI5YDACwEowH4JjxFd0MUZyATC4cSugbV6oA7phzwVXugQMYCLKMaQriGSIoYjvNshopAKOcQEeGpTHA4rNL9pbKAFN6jBChqgkE0cYAUVG0EdxREIADs=';

global.resource.collectallcities_title = 'data:image/gif;base64,'
        + 'R0lGODlh4wApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA4wApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKTlJQJl5eVmpqFh4mboKGTN36lpn50'
        + 'JqKrrK2bJqd+VK6hpLGoqrS6kUa3pyi7wcKbUrFuw5K9vqXAyMESy6Z6ztTVAGq3ENaL0NF+09utON6lJOHnrQq+Lejj5ObooU6xUlSxLvH5myq+Uujzp+rd07dJyyk0gmIhIcgw0hRfcNAZNIUQgMKGlMicEiNIzykmjE5U4WKGjJYbDRi1WMnSEcuWjV7KXBlyZMmT'
        + 'KQXN3ClJzDIGg2a6lKlJoymOADyaAglA6E6nRJs+pbloBRYxaMAsuTDIaCmkSksxFYRmGZBFXv0QcZR2baO0sf/oLCrr6ywAIOQqQgobCx6AtmxPuc24seNHQYDxekMI+G80uYI8LGOaFuxhQWe8sUMsOLCpwWgfD8ocjZ3iaHodQThl59Rmx589lwItqbLhpZxjn17G'
        + 'uDNsX5BXR1trO+llEeQg/1Yrm/lb0QCQe5O721fqRrBMKSsFpatvRo0JH70tNvfsu3mXu4V7CvLEaASK82UKhZwfDOadg/8eehnk+uRgUN0t1zGywim7IaVec7RFIt9liaXXGHumQEZHLHz5QcKDuAFQjClkANCNKfCE1995z51ixYpWdCHIh6WEOGI5SrAYC4suQqLE'
        + 'L+15F1uKKIr3FXl+UNZZjSveuKL/ixMquSQAAtxjQCwwFCcHHFjCYYUgXpyyEAB4nILPgkDqd6KZg3RpypdhmjJmQr9Q8p4fGrRmigH5NUimkH4gdWWWW+4JpynN5GkoIwT0BYCdpchQ3CONXWgKDYfu96OlQZ7plqSlUDpILIVGgo0pErBxigWValpUYZCYaFGcPqLo'
        + 'KgCJnmIOo344yiqkvnHqh6ezChormof66umgzFDSZikK+ERiqsPqyet4rfL3KqGqCkurorjqSu20KBoL7bjakinup7BGUqspAswJA7nBgtung9aCmm2wsaiw6CneDlntj+cGK7C1xZ5y7LXJSjIjHwDY4ya8BP/rr7y02Rst/7m45rCvKf3OK7FzAUc88EdMlDxFwZMu'
        + 'YnEkHLAGAEClfDlyprXtyiAjK5MJV8kmC+JsKXIVILTQyyl4MwAhX5otprdwcegSQEQNxME5P5JdKREhccos5cbbnNFlVpyuztE4DcARsWxRJthMb2owxEoPG4vZXqOLrSQynMIGAEScAgbcNNP77dF2J3wohaWYrU4sTjDNdrZJB9512eTiPPYjOpxiBt8HAU7sx49f'
        + 'rPLYTS5jNnqx5Jhf6Ch36rmeiPtBd8SW3x0J2qb87U4pcry+6uBh12442aYvgsUtCj56dOSfz6xWDdBDX/notkPCxClO03AKOM5L+7XgNOdc+v9s0Uu/iJqnfLG6IBu0737rv/oe/PyRVO2Iw6VgAUDepwgwedzg85j73ics8fmmbgCwwi1WUDQiGQlgb/uf5LoniAZY'
        + '0ILC80OoHjGnWbggFgiQ4OfkZZkOucqAP0IgAKoQi95xqDzmiiAF6Qe5CCJLg5MAwym6w4JYaGOGfCohDE9IugPSjhFyiIUFXlgk+AFLZFAEYAxTVjgcSsIMh0GBEkXovbU5EFoolFXEVkBGMgKABPli4gPDJcMoTtCNILMhwqwoKoVo7RQa4OLv/DUfMBYxhQRbVzkE'
        + 'mSs1OlF+bVueHO3XCDjYBwR6rIQhC/hHMQKQkObgS8eE2MQpui7/komc37luuEFH+GoZ5gDiJCZJxOqNj1iY3FijWNmrNkpRlaIb5RxL2YhlRQMYuAwgJ9eIpjA6Z1ax7BYtIUjFYEZSl4xkRIZ8oS9nkvCLlHSlES/JLX4tk43NhCPsxCkIaF7OEXwQTA5aEAsWgHKV'
        + 'rOpjNof3ygYlk1/HM4UaoBQLIwgin6UIVDrv1pahEU09Bi1AnhL6TxUJYqDDiyb1zqOBgRTUoAvFKCQA6od9RukU/pwnHYk3G4YSUhW+lMGOTuGEOfmBgQC43ik+sLtSeCA/t5DBcnK60x7FNBY0jcVNq8jLRXw0NhXlV0+VGrtc6YhxLoVpK+m5TeA89CMg/mjnB8kx'
        + 'VP55QwE4jYVOmzpW6Hg1GmAlqiSOSlGxLpVjb20UJLbqjaFOdaSvjIsgsOgNDCwuGr0ThAPIUQa5uZWscYXMYL1R2ImO1BFsZU5S4YpYxD7ir8sIrEhDlVef5sAbxwBA5qLBgUX0LRraCCtTvVFW/wzitMtIrVrVFYu1TNZ1lWVtJEa7jNL6UZuAdK0g3BCNDQziBKf0'
        + 'AxqMy4gY+LIUY3jAmXiaW+EKwrm3iG4jJCoIQto2FpSq7jJ0GgnkEoi5v6VqcK06CBbGAg1cYUQFWnCDG7QgApHYAH1rsIKcYIR9++3vf6sx3/red8CLKMAJZpCDF1RgEYEAADs=';

global.resource.inventoryanalizer_title = 'data:image/gif;base64,'
        + 'R0lGODlh7gApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA7gApAAAH/4AJgoMAhYaHiImKi4yNjo+QkZKOg4KTl5iZmolGfp6eApuio6SlkSaf'
        + 'nlSmrK2RnamhrrO0tYlSqX5utrytsJ+yvcLDmWq5fhDEype/oMvP0IgKx34t0deKzX7B2N28KtRS3t7a3OPnrFPUcOjX5QAt8fGG8vPw9db38oX4/fz19ADq6yew0IkqXMyQ0XKjASKCK0YcOORvYL5GYqj5YRBw3z+PFAt2BBlSIEGAJz1ClHjoHZlUXwrRSUUDAJBU'
        + 'XAAgyOUBwEuNdAr99BQTwMxPNW9q9ITGEBqNQA4NPQZmQaEmqbwU4ulIj0YShqYWPeqp5iGvn7AgmkpEEVsAIv+W+sk5NVdQn0urFnKZq4xRmjZx6uRaN9Xdun7J+kkq109TAGfkXiycKwIAHqnAbE3VkxGEVHZSTe77F+khErnwrE3VNtHbuEvpLj3c2DLfXEIUM/6k'
        + 'dSdnvECFHssNWOnSprBnh23cVEcqMZs/cWiE6lMzKMtx6z6E5ZgIqazdhk9OTXZw4McB3JZb80fWwammU/ZEu/Hu9FAa+8EgvLEFG6mYAYAAufDHyAqpGOcHdP2xd0houVgB3ietrUYhXHKZR019clmw3lI1OccbfJ9ogJ4nVqRoRRcNggiAEipGmCKLuHxCBgAS5ALW'
        + 'iX5YAUYuLsCQSlMEpkJBI0qkgoL/Ydk5WAgH60zoSYVS+tGWCCqmmIuGKKrIIo8+AvmhRjXh8J5vn/D3lmv6mWVILigc4kUqSBSCRyoutNgaHzQt+Qk7BuTiQCNapKIBhJ4Y0CKZhuSgkQRNWinehYgEmooQJ1IZ6Z40jUlNTQB+otk0RmY6qZNvKllla9uZWlpZIIAG'
        + 'AKmfKMqIMZ9IwEYqFiz6qSFcfIKWJzBseqqkiFT3CQiuWjilTJ3mEspUNeZSkwyZzZpLMms660e1gB0C56rQmuaqbhTkAsBnn/DhyJ2fKJDRJztS+2shiFKRShXGsknpIU+o2yy5ry72IRFDHFOTC88BwEAuHHW7asLWIjJu/7+trqmbpfGm+2cjBEhb6CfFZkpxuOx6'
        + 'AgQcnwio57GaAmBGtgNjHG0smXJsGjifQPdwKopKvKnOZVmsqs3mromoH3kujUGsPTeSY7sA6PtJnjkrXAhqn7AQrCfuvuzvs4cQHVXNYi/twsEAdAeYsn7c6IC0PDJhNxNTvOy2ual+EifSRWdawQa5TDez3yykIg4jUH5iBwBO0Kl3xQAwLB0SqSSDds1w+8Fs3Xfn'
        + 'LTjh8bHtp2kepCJ3Knr4+klOpp4eeN+e/C12xo2pUYgVqdgQqidPUJcKO5h/skrslBfviQMxpPK50GIbEnkqkW7peiq6s924aRgMiWMqclw/1//L288eXe0E476UHBMB4N4nU4Bb8iLYfsIGAETQ/Fb5i+2eCgFCulr0CGaIw3lCK+KD3Xw8wT710O0tRKtJyvygO495'
        + '4n48EoypImg0v6UvXAs0wwMMATcvjMwTJmKEiDwhoPx94jEQpJwBWwc3rEFvYCFLRQ+qp8EQjtCBOFtTxWilCwB0z0YJFBvlaOcH250LhI35QCF+xsBdfYIAjThCtsz0ifC5inIsow+GPlGnzUmMa5/oTAZfJz5PSJFtAIBX4MAHgPKpJVM1yGMexSbH/onraLeDYirc'
        + 'sDTVFMINGnkMI5ggGBqwjo/h4pMndlE+CZkxPIZYgsD0pMc98oj/kKlQDRxbhSjVkIcJAwScH5noRI0J8llFolch8kMNSzLCap5QS/2A8UTT6KwpR/SEZi75rxMhMJUvi6UnSDDKcOHKD+6SXROQ2UvzAeBigUwaJlvFs2OowBEn9MMqLPcJBFSzf3NrGQAs4D1ikg0A'
        + 'OfxEDgj4QaQ001xzumIAA3dDV/LtfE2sJz+3GS5lAs0RP/oEdhKXuXPWhJ1Rm5on2OFOZAEAjZ6YTr+8xaqb8dKfgaPl8hz1CRNQE6SrBGgrCapNSrWqbceAXSMM6AdUys4PvUJpTcqnmQkasp+YBEASUhG2jQrUYA9kaeCSlCYXesJAQHVpuFh5VLPo1BAj/zjGCR7x'
        + 'TE8gQXkodOgYDwiAdH7ipEGdikzRKlV7JrWtgSNnE3HpB1tFlWwvVWlVs2m+YXkCi44Io1yYddVuzmUAC8hF0IJKMIPagKMwK1dZ7hk4DaQCB0PxYkU7+s9rAlKsoC3E9DyhBUgo5itilatGFLDZQpDHDxo1qippQFk/6uwJiJLpXZGVV896cLZ8Telo/VDaR/RRI3G6'
        + '6i6Xwi3G9qsZrYPs2HjrUWdctRDPnMrZWlswN+kVuKGFXCqK2xX9fPOqv1vKkXbbmnmRdroxc2ht3SRSHck2uN71LfrAe13RjhcSkpxSDlqQCxaIlYtyUZNzk5mLGcA3st2dr/8hUqARwGaqABjGMH47uN9C7K1HhQhwQMM7XPI2IhdtsSyexIqZxsiHNRnWsKleW4EY'
        + 'F+DCMcavhKdIDQaJj0PU7Sw2AcDIVHwAwZ7oTH/F+wkTL8KgKc6FDMTqA8EcoHBr/MSU3+LU8mTZD0Dm7GTfitepyuwY8+ThJ8Is2ZTqd8SFWO5qNyy9/zoCygBQsZbFOtycoCnJX/bDlsOjoJh+mc0RJnOQzbeDY0BKzWIM75udaFaN+IXO/m3yI/CsZ08MGq79U5Cf'
        + 'c0FYuXz6WYW23gIRrZsdF0KiTPGWXTD9XUN0+RiaI7GdQYbiPFfsqqImkSdKvZRTSyrVglm1jhU9LWY3dzUIsmaSpIdciBgc1w9j+CGtS/yIeD6r0/0DtmD+7LlAG7styGajsiXdjlZsoAU3qMEKHNLuekMjEAA7';

global.resource.newshelper_title = 'data:image/gif;base64,'
        + 'R0lGODlhnAApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAnAApAAAH/4AJgoIAhYODhYmKi4yNjo+QioeEAJMJkZiZmpuLRn6ffliFVqB+cJyo'
        + 'qY2epQIApKCnqrO0j6ygRK+lsrW9kbefrrCfvL7GqcCfGMOmx86dpX7Cu8/Vmcl+bMzF1r7J07Hd4qvR5c3j3tHgxOjtANjl3O6o37rh8+Lw0bIt/f7/LQAADCjwX6GBilZgEYMGzJILmOptOzjQYEGLiyqe6MCoosWKK0YcUKSPGgAy5j7RAQCkFBcACKJpAKDEZSEP'
        + 'KZn8UmeP3cmUflb+xNUIZcopioyaE6q0HJgFhZLpiFeoabSVLUG9jFlqZk2tACAA9ZPLFs+JQ5dWLVV2kdVofP8SvQXFdKyfCO/U4dm3NiXWUl5gyqRpU4tdAmZb9Tw3V2XfT22T2s3yuFzdsWjytprCN61lAD8AC+5KGJQWAHSi6YlGIjGodYyBXoZc1K4fxI2DVk5p'
        + '4RuKzlatCLfSBcBUUIG5gvJaCouAaC4MRIPhOthiWcGHF/ccWW40K2iigfDsZzjx3VbAQP+m3GfT7gBwiG7vhzkoKwRYA7BTSkZ1addVBh93tRGVXykuEMjIe4XwUQoN9fB3D4OL2DDfYF99IsWBoLQm4Sf+OZKMEhm6x1aBtC14ImoPKujWiqmBAiFPaphEoSIylALG'
        + 'aMsBwEQpTnD4iYf9/WcOdiu+SJT/ikvG+AkNLkrW5IP1eGFjkom4UIoYPH4ykxOlKAFANCrsV6SItiG5pJIpsklWIU76AeWNUqYY54yKGTYhloWosGWX9QEAJlEf+pGDmaCESI5darZZ55tM2tkind4tWagL9WBxZSlMdMoEUiaUQgagM0FRChAAiFHKSgW02iokJe3J'
        + 'qadIRVmppDKS5+mnAlawQTQcSLSpOS/hBMqo9JVaCg4AHBHNFpskQ8MNaOX2kq0CwjkpUNfm9okamr0WIHk2YVCKGaQCIEUp1ClQjhOaCCsrsdlGCulqoFBn7W7RyDGSvCam9JJYoGTmbikcAEBFKWWyVM52OylWLbf1uklE/wcwRGMCuWBx/IkZD0R11rDlvHTwJwYD'
        + 'u5gIiWgaDZcRizuxwBU/mpIEHvvRrV0fhGvdzJDVILTQhZTCBgAMROMBAHoqo4iV0XwR888kEzE00djm/K2AV9ewmxuF4uEzgEBDusiHpxAMCstQf+LAIsx8sgKsI89r9qMDeuvHeFkz+FwpJAAc25qK1OgYBfqpCgpii1TRL90SV43i3beaA2XNlZd1p+CNUl5I22Jr'
        + 'QCYAZoBihyNyRGPBf7B1njefu5HhBRUqFID35JpTWXfAjiZiKigAiAAdAG4UXMgKyCMPAAmjoxm53a8TnvkjlNa7+e6D915IiQr4WYoNiIYCgP+QfpBAvqKMcI75+lmzT+H1z/PuOQBagkJBjqXU8LeG4+uHL4isG1f1+ga76dkrdzJSX9ZE1yFncUoC7Oof4MLnB/RB'
        + 'I37Zm98AB+g+GOkOg65rhHRktDAdCa9H5CNSogJYtuhpr30EnFICsRfCRhjOD1Rgwye48Ak+rKAUhUghBS1IEhp2UHrsOyKunqRADv7ODze8xQ1hJsRCETERTSzgBguoREjBT2ZVc9WrCpECc5irHEUIosYAsJcVOg+M0BOj7bgjxyTSUYzW+yAc5XeVRCStHADQodIS'
        + '4SBQMAEE0WABC0nWR635h4M5m40X9Ug1uzWyEKUTlbqiIbZEZBKAKBhYpCVXxa8iQTI3kkQgE40YSUXsIBrwOkE0RJGIHIzFDZDbYwYb6a1HcrGVCvpiJflIykRAsBQso09rFFG8lGwgl8PcZTF7CUNU5nGGICylYwoHik6mRQ+NcFw00AARaJKNkdMciy+RWDleejBX'
        + '+NBEAU4wgxy8oALxzGcqAgEAOw==';

global.resource.craftmanager_title = 'data:image/gif;base64,'
        + 'R0lGODlhvQApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAvQApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKMCZWWlQWUl5aTnZ6foKGLN36lpn50'
        + 'JqKrrJBGp6Zii16wpU6tuLm6r7WmKLrAoLy1IIIYvX63wcvMjhLIpnrN043DsF+CWsjK1N26ONCmJN7U1rAQCNDc5OyhTrBSVLAu7czmpz0t6vX8ntqmaATBQtIPmDksALmY4oLn1LqCEBeROSULgJ5TTAS12MixxYoRBx51bNFopMmTJl3BQoFsRENTD0eW7DhIJiOb'
        + 'jkJE8WLGDBcbC26i3KjR5MeQgybGEnTRVEYASnuBCcqoaSksjKLWogMknJ+Aj8wJ4FNL2ktbVU9hlXgKGwA6p/9opDW1lpEZZDzYIqMjSCusqX0pMsUYOFyERSRg4ckKjatXsI7E/jtlBcDZZIgVMz5V5m3czKcWM0ITTm7hXnyhej2staJVP0/91oIMACEsEXpRdw1H'
        + 'm5FYH7XkXl5n+xTupLWEwDVlWlBxU8cFlfAqWvXe08gCth7sFDsyC4Ps1KqMfO9uaL0XiRVBzLLDReJhkffeqzmA+JQXMVFciwN9U6nJVosF21lEmHWmWAHGPIJw0AscuZVixYRWdKEEhfJN2IVKpwiQDiwIuAfTIA7WAmF5pZH44CILmkIGAA3AwoJ3FFZIY4umuFCg'
        + 'HHD0CAd5WhEhCFnMCZIDMhKg6If/kI+sNIlYABBpiiDDDXJkL0n+B0tzV9aSJYJ+9MBdKfSAyeRmpTAppR80FPhIkIIsV4ppCpXyGgxKntmIk5JAKccpqVUpSJ1+3KkkMs0Raih2PozpR5lwNhKpnGy66cikn91nijymVJEnJHxGAuVdpqhB5XuC4MdpKZ5iJ0V94W16'
        + 'SqtgNmpgjtjp+alnzFkq6SlMUioXBKcAAYcpZuzqSKgcmiIAADh+deqIABBrirHI5jlEcIJYWwq2pSTLqKOQAnupubzO6SuaS6Z6Cj2JmcICoXwou+cpv/QJy7O0ZCsiWgDEW8q8ptSbqwHcBnwKwaUYXKsgUzghsRPlmqJr/67u5rhuhERUsAEs/rlwCgdInAKBd0yk'
        + 'zMQUizAb1r4AEOrHi/9iBoDIppBsMsbPsSkIzqXobMrJD0Pil8or5+oxyBsfWoupAJRsigMxnFIMmLBw0TK+T8IsM82CSl0K1VZjzFKmYvtBtilXa9VoDnDH7fRCWpYKZkVvhiMHUlacQgAM79at9SAuR+b1KWCj2rcpfwduJgAlFgnA4qU0juvDxzouYCmDb17K3ndH'
        + '4rkZDwxCaqEAmKA5NIMLxLW+HcaM+LQAny6N6pfDiXCmtqe+uimNZp4763WTjh3e54bzgSDC88WeKQRhfUrrABRezeEu0m5z8wA8X0r0kW7JPP+A3Z8C/inBMyg93eufsnzT3rmBnx+iSekG5PmZWcP++2/tS9ex+5r2lGE//CUIYzUzTQEj5wcgoQ8AwiNTrvjXP6zJ'
        + 'LzShA8AGNshBjAkAFiTYXSkCcgxTgAGBy3qdqLBXisSNSITSKmEpTvi4dPkMhiQ8BQ3dBoAqqC9S7BLSB09BggK9JjboEpYDTpEsC5wCLEC81/9g5yzZZa9mt1hitpwIEAQKCwBaDBcAuDjCcd1KgjUMYpziYsQDYYo5ZPSDLJ5hihNFkRHW8w0LZzbAMQqGjqWwYxI/'
        + 'E8c5nkKQwCMXCjm2xl4J5oyw8WJcGHhCb9FvkXhUYbNK8SwBYtH/gDOsFgZr+EVKitIUouEhJCuWpuS10oZteuQRJckc7/nBC2CEBSb9V4p8rTCAs/ukLXEZxlLQck7lMwUxdVm017CyXb+yWCPVJUs3DpI5KpjeABYACwOkUYq9BGAVPVmlbC5km90k5WfMyTl0nsKb'
        + 'qnTmLtXpyKVAEonShCXQoKGAb2Zyir8cZzCrtE9k9PONyCxoLw76wFXOE6GVqmZ36DknGXjFDye7Iy/94MtN+qGTA32PRb2S0Wsic6ThKGkiHerPY0bUnrOkKJtscFEKtJRwmnwZMK9YJZp6xaYQlYtPwwHUhsrzpkFt40SDCg6vYOCmrgOoR0HK0/c0NRxP/w0qAK4K'
        + 'jawa9XevVCMsn2OqIZrCCC6lAQ8u6h+N4lSqOhVoVUe0Vq+01aQ+q2s4/COGU0AhqmgMUgEGO9i0KgEWTphMKVaQVuDQ7QAgg2r1cmq4nbawj47lHAAgOzKZyiWzftAaZ3MGgFWVIgMoDWxj0qrQWnggre+g24dM8Vq3Apaj4uSkFS/7ydhqdralqC1e5eLb0AIAuH54'
        + 'bRQu+kxYBGi4CvCKHHYlrPMYF7nFsO1k4VpZufK2StbVGnY9C4DwHhcWxRAYNJoLqLQCQAd7pW5czDte7eZRPXt0IVroi17y8rdsADjdE4d3HfIC4ASUGuEGGAnL/7JNsvcdBDaUyPkeB5ciu8Mt7/TOC2BowWJDf3pU3Z6bzy8OogItuMENWnCYiLj4xZCYwAtyEIMW'
        + 'c6IZgQAAOw==';

global.resource.mafiawiper_title = 'data:image/gif;base64,'
        + 'R0lGODlhmQAoAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAAmQAoAAAH/4AJgoOCBQCHh4SEiIyNjo+QkZKOigmJi5eDk5ucnYdGfqGifmKMXqOi'
        + 'Tp6rrJECqEYACKgUADi0rbmdoKihIIcYvaGqusWer6Oxs6O1t8zG0I68vV+HWsJ+xNHbj7CyuM6itdzR070Qy8La5OyoSN/POrjsxuaoPS3Y2fT07vDiAOQ946fLHhZRaLiI4oJn1DqC0PiMepcuVC2BoiBAzGUPBbYRDVM1akGSpKOSKFECSNlipEpOekYp+WcRAA9U'
        + 'DlamPMSyxYkOJ3uW5MlyxYgDjOwJkIhKD4CQwxrFFIWlERl9dABcFUVE6qiqm6D6mVnRT62boxhoHdV1LbYpjP+2CsvqVhiYBZ9QCbiGyspTh4xIoMJjFWtdP20PCR5FeJMdmTTN2kSl4HBbucL4IMKMii7nXhEAKPXRi8ZfkYgOohIR1zDmxABUj2I9Sc4oJpFrkR5l'
        + 'wPKhz6iy/DZ8WBga0XpF9Poldt3jvq2xZX3N6Pkov5PYAC5bi4le38WFEQgvyrM+URaUlvWD4HTUQxyEwYkuyop9K13AA4jfa/4kNKNAkRsAQqAyHFcH1gfgKL9wdh9+CYZiBRiouKAUAEyJckhziOSAjQSbseUIdYd4KAyIkmAmxYBEjOIUeNQRUKF+9CF2SIZ+0HCh'
        + 'beVtCNghCoUyVSgwhIhgYUcCEKT/H0P6UaQkp4iyIncAtNgjjCICQMcoppGIZChtbSmKjt+ZMYoaPqIGgHVUjFKFkWCOmOWaorQpypuSyOaHX1QiMQobEV6WpZihdDlnjWFyeSGFCKX5HgSjAAGHKGbAaeOXl0IqiqSUTgLFKFoM6F2nWB5JaI40WpromBdGGUql7u0D'
        + 'wGKhsLCkZoHKeSStftgqCq6RKDEKFwAogIoFADgxihe5gneqoUkieoh1flj43ZJ+kOGorC6MwoGfGUXoBxPkMgEXid2K8u0oGkUyaihgAMAAKhgAIMUoVDRL4rPFlWtuoBVsgAoHF2KrbazEgBuKAzEwKO6w4CnsB8MORxJO/7byoqIBAFbcpu+gXJIXCrEii4JmwaMc'
        + 'zCHHoxAAwyguPLwQeB2L4jLMkqQbCpoODKzkKE98fGSTRQI3ssyiyIEUyqKo/KOZQgJgAs4lE0si1ExKTTUkvLoBgASo/MJoKDgIDWYHL49iQtVI+2HGA3mNIsDPTW9LzKShZKWcKO+wTSLefug9kSQajCIHAMGofVjMpZ4HotF+kAx5KB8gJzfdoTiNWoZe8ydhoDWE'
        + 'Hjp4nO93nSQ9i+KU56HErJ0otJE4uR9oWib66MW5QS1hTGduNwAGjHJc4vA2K23wjRLvR7yuGLj3mADwGAqyjWPzS6q5IiMKCb1jjDAAqb8KgP8FwhuvKvijVEp+o5KcaoDOoegQa3vVl3a+rnFqqei1Kf++fiilAJso/OOl8/2PFF8bhX8igbWJwW8fjLkfZ8jgBSqo'
        + 'wBD3w9SqCtU9zUWFdfHSVCgaU8BcgRAAIvRDYyJRs1BoQGJ+0MK82Fc92GjwEfva3+UM9rvn+YFZ4QuF+XLlQyAaSBLmIIGeaHdA7NQwEiVs1rM6+DsVDGsAC0BFb6JIHSsuBItalETaWic92AFNgoe6If4uNUX+1e17DxRGZbgoojj2ojKR8KENhCEsUTzpiZCIorN0'
        + 'KIq58fB7MjhPKDRCRwQlUpHtgkQQpVcGUbzLDxsz26VwmEYpEjL/FIbs3/f2qMhaNDJOpDzPOCJBLb5hYzyatKG01rjBHFHxexfDRr1OaaNcCqNeUPqlMACFxmipUY1t3KEoOYSW83AAe9Rppj6eKYlLauh1AZqlIANVgG5205OscqPvvrebox3AZ7zsSjkjB4BzemsS'
        + 'U0NFpew0ChRos5OW6gw4OShO73FIWTMriwegKSKAHk2gk0DeKFb0gl6gKJZQJE4Ow6nMN3IICBArS4M6SR2MBjRsm2hgtUxnODVus2TmMdUn/RBKiwLGowcFaToBAFN2anQT1uwNnUQhoHsas0b6HCRFC4k5f740ozLlqIhqSqybTqKIiLiXKFri0/xxUjr7BMxRIAAA'
        + 'Ow==';

global.resource.freegiftscenter_title = 'data:image/gif;base64,'
        + 'R0lGODlh2wApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA2wApAAAH/4AJgoOEggCHiImKi4yNjo8hN0xENx2Pl5iZmoqRk5WboKGijkZ+pqeo'
        + 'fj6jrJk3qaZ0Jq20oq+wsrW6uwClsKirvLq+v34owsiJxL/Hyc6Yy7/Bz6ESxad61LzW137Z2uDK3arhmzjjfiTlrefj6uva0Xrz9NPwjk6pUlSpLvei+VDt6/fvWTQBBTdpQYXmUCokCRUydIgKYkRhBxm12MixxYoRBxR1HLnxEMmRj8igEnNIDyomJlECOEmzZqIV'
        + 'WMSgAbPkAiaVp1gCcHkK5syaLWJyRCQT6VKnSjt+DIko4yKgv8AsQIQV16GuqeikXNny5VdURM4WowNkXEMAHv+KGXXUVShRU0bBohILoOuXQ3RQ0QDQtltDvaf4Ijal9ZBVRYtPRVD7S/E1vo3qli1K2U/avpcLX2sIodvnzGSHmgW9trOfMgACnxosutjhy65hTX6c'
        + 'KLKpt5Ett6ab+q6fvGhzJ679q+HCbgSIB92MV3ms3EJkm6LtlnVl66ca8uaKzoJ3r+fDjp2umvP5z8GZw2qo3ZTxdNJN2V0dHPxswt31l94vFoznmhVgEASWFQxa0cWBDT6Ynx920aNHFJ3Bl0qDDirR4IYMdiFAPwakAsOE+7m3YIT+bQeAhwyC6GB6HEq4YIKouGDg'
        + 'e4fwIRiPVyWniWYTanjKaYuk0gz/AASkoo4dqMiA4iFywGElHFZkyIhvLiaiZG9CQiakj7NFo8SZaIIAZH2DdYUkeUduQiRqcQLJyJeHNInKk1FOWeSW6AzmJSpL2glmnWxGA4uabgL2Y6NB1plJXQhwyCAUWhqqCJ5MOgkAlKdISad+65nyZmdS/CIoIpxqmmmi4zAq'
        + 'JJuu1joqhQjAglydkN5J6KCnqPBpn7cKdeup7w0By6oUnVJor4ea6miZsQIJqin+QAuntEOulGsqu3KrLbCmFHqtHzkMG6qfxwJ6ZImpMAtAq+Nam6Oiqch6ZAUbpMJBekwEzMQUrgk8cKm46popWAYTzOqviIixFwAFVFwx/8LGuluUwA43ikW8m0JcMMcZ8utvNDTc'
        + 'oLLKLaoBHhcvY/wtf0JGBvPDziZyRCpbyJnaranc3CgKIJNrTLSwCD2Oyzv6JgdVNsc8ZQvGheuZ1M2Wm4gCsDjRLXtAo6J0nBwUjbPW2ybt39O9pIJQpL+Y8UDaQWOtMYXUHbfwNTdnfXQi8kl4yZx3180jvP8Z/Szf4MntmNuFw/KB1FH7WfXexfQ9r8iIfJxKxsUi'
        + 'bDikZvu9eOYtTt50Km6ci0eGNcQeO+yy14Bx3lYbaWrttp/9tyJewPLX7UXynikePyqONBHGp9c6Kq+vHueIe9Zab+jtVQfk9ZvnzIgVsKxA/P8G5JefqZiIJu/76dyiLy31p5AgPbe01ss93Hhnr/f2YSbJuSJVSIUciHc5681KfaZb3t0+AytUvM19V4vNo/qXNmRh'
        + 'r4CQ4l6rFiGHVJjngjSTlAIlmLj1jRCCDBTM/CJYPwqe7yfFCaG4XGhCRKzghjcEAAlSISwQqoiGkKKV8iq4wGltZ4Up/I/9aOhD7WWQid1DW6f2pKd1NXF/S0xfCRNIRPwl8YiQ86IR/dAmIEIRfylyYs2gyKkqmkIdxhHV3dKIRTNqsUs1fGEXG3iKB46whSLs4qRi'
        + '+ENesVFkbsTPueSIRtzp8VUIjOLvDHhHMiJxjGUM5CMtJ8MIahD/kZ5aJCcL2b4/RpJedqSfCsOIQkxSspSDI6QaDanJPCaST1acoyNfycJTci6LqqSWA4tIQhcBM4KDZA8G11hLLk4xfuoyBSMhSMfcEVOIeeTlFy3JSlMqES0Wu9h7wlmARzzHFC6D3yxn2ExJLimR'
        + 's0BeLhfhOXQCQJ1+MEKGyAnJLbpzefxc0yqHKcZiknFAiQEPZhiRKlQ44Zzr9OQhvdejl4AgFSxwhBJS8dBUiA+h1xGoP1E5nCAOtI/XnGBJcaNRdFjTVv9EhBnGgQFHuAAdHlBoP/HoTJD6QTjBBCNBW2nQTH7HpwtdxEXH8dJPUhQAOeiGGx7BtW4MUKcieuVpTLFq'
        + 'UmGitKCAPKqAHNGFX5wheHWkJSyHiAg3XGMDl9BBN/7F1QOO9Jcs7apQv0rUsKJnrI6IggBnElHdIdN/Tz1EAFOBBp9g4gT1+Q1c6TaxrB6UrUjd6WUvwooDrCB2I7hIAU4wgxy8oAKhqEALVNaCyXA2GYEAADs=';

global.resource.operationscenter_title = 'data:image/gif;base64,'
        + 'R0lGODlh6AApAPYAABQPABYRAhcSAxkUBRoVBxwXCR0ZCh8aDCEcDiIeECQfESUhEyciFSgkFiomGCwnGi0pHC8qHTAsHzIuITMvIzUxJDcyJjg0KDo2Kjs3Kz05LT47L0A8MEI+MkM/NEVBNkZDN0hEOUlGO0tHPU1JPk5LQFBMQlFOQ1NPRVRRR1ZTSVhUSllWTFtX'
        + 'TlxZUF5bUV9cU2FeVWNgV2RhWGZjWmdkXGlmXWpoX2xpYW5rY29sZHFuZnJwaHRxanVza3d1bXl2b3p4cHx5cn17dH99doB+d4KAeYSBe4WDfYeFfoiGgIqIgouJg42LhY+Nh5COiZKQipOSjJWTjpaVkJiWkZqYk5ualZ2bl56dmKCemqGgnKOinaWjn6aloaimo6mo'
        + 'pKuqpqyrqK6tqrCuq7GwrbOyr7SzsLa1sre3tLm4tru6t7y7ub69u7+/vcHAvsLCwMTDwsbFxMfHxcnIx8rKyczLys3NzM/PztHQ0NLS0dTU09XV1dfX19jY2Nra2gAAACwAAAAA6AApAAAH/4AAggAhN0xENx2Di4yNjo+QkZKTlJWWl4+Fh4mYnZ6fgzd+o6R+dCag'
        + 'qaqrrKmipaOnrbOgRrCwKLS6u7yYtrekub3DjRLApXrEysu6xsejyczEOM+kJNLY2ZfU1X7X2rpOsFJUsC7g6OmL4qXk5uqtWqVogrBI8PjZ8qT0APb5qsiUEiNITykmglooXNjihCJGDCMqTChxxYgDjyIuksgRgERGJ6pwMUNGy40GEBkO0shoBRYxaMAsuTBJICmC'
        + 'AAySQuiR40KKP4FO7OnzZ9GhHC1iHGRzFE6do3g2vTVl0VRYdARdLQVmQSOofrAMAtKN3lQii9AcA2K11BdBdP9K0Rjk4RhPSFOfHtT6LCuAqW8BxCU1l2w1s335Huuq2GnBvX+r8WGaOHK1CItIwMIztqzlUWgFnanWgnKpMoLlCoJQLfSjvI93Nr7l9yrqwaMKe95K'
        + 'qnY3zLBzQuZdKstsrMdv9ROE5ZYIQYafISYVWkQ3v59JCcHtZy6Afc8I4B0YO2ry3sm3q45+bDow34ez65Wd/Zh44qbOw7IwyM4tK9DtVkpoUHTjBwb6qZYaMrB840hwYElVGX6EAcAeMO7RliApFkA4HCxWqFUKCPVZYaIVXRxnBRjvAMABMHAIosSJIJqY4lmCSFEK'
        + 'GQA4Y82GuQEggDkGwALDeDeV54f/hKWciCKQ3QEwo4k1PnmVkymWyGIpLnhIH44EvINjI2PyoWAOx0jACC5tUSeIF6XcAwAeXEI5V5ilXOMfKTIg6RgAcsAhKBwAZudam9V4NwibpoH24ICCmEmYl+YZCpdqYzIyJnfecUEKWEcuwuhsoW2qIIVB4vnjnqP0+Rp5fvpx'
        + 'aKPPKFpPKcKQ+qibC+ZG6ZK69hplpojKemmFALBaDilVrIlrsaVCKqx3U+l4y50NJluKq7v++SqvmrYDjK3+PEvrrMFy+iuTjk5rKZnScgoAa6QAAQcpZjgbDLTpnjrgENfeSooK2vIZK07fthsudQDDQu6o7y7crrqwRthv/4XEnisIq36coxkpLHg6ymSimhusqcie'
        + 'VaTDG5eSQ8GtHhxJxqSurOCiJkfML8wdr3txkFcxITQTVRlawQawcACAC6VwgEQpEJS8r8bvymtpcwqKUUpWBXTd9cywJhzV0EXjiDWyOE993NBEk3p00j5XjekzXACphiBPk+JADCNKPUqu76IcpKUosAzAEbBsYUlwYsNSN+GGp/13sY7bLZ+S7BorHClH4vc4hXIs'
        + 'ZUUpBMBQp+R+AD6m4FFa+qKCCtziRCWMd3vL55C+jrbAk9NaeX2whH755pWe1YHppaDieYJmPDCIGZ8CYMLpvKe+M+vUQmrz4BbekqUktcN7DP/ubm7fOuqq082888NbDPwtai7/fikfCHJvLABYR4qc1afPK/bBihwAzpYk8IXNdr8bkwDLpbb5+YF8z6hf3FB1N0PV'
        + '4IIXPI4bOMYZAEjKD25wUZP8Zj2qAfBddNodAOAEi8DILFZEwGAGUXiz/kFLhjXQIAfb96FqkEhnGhtSnrZHDwxwhYT+a9cJT7iI0cFiBWAr4AamSMVgSUxzVkPfzq6IFiFaY4KJohoXj5UbB5QiXxaYBxKvFy9/8SqLi6hC8KL4J/fRTG4qhNgdsQfGHXmBCioowBZ3'
        + 'xqk0JslHfoiRFk3YxpQ1knuMkMN+XmhHaY3RXWsUIyHl0keFic//k1TjlO78AIZ5laKDNmTkG904MQWt4JWvBMDHBkbJHoLyZ+dLpRU3OamK2VJztkMXHnOjv1F4AQBmLEUmT/bI1gFQVaMgATT9wK1P+mE+xbMkLyHJwN7tMpSc9OWXtHnJS3JKBaXgwgAWAAsDLJKZ'
        + 'q3RkPFOVLbBU84rYBBYQcfmwnO2xmTToJDCtKUzsMa0bCnhn4ADKTwBMU0/bquU4wbXNXHazhN/kp0CFmdFhdkcGBoqaLhc6T2cy9KE8u2ex8pm5gjJ0mfv0aEDFmU2KlrOiNLCBgSig0NW99JnZ4phKacXSjjJxpP8s6UwLWEmbDhKchOFGNRCEVGkt8aRB/42o2Ioa'
        + '06NeNIkDhWpuCHg3L47CCB0llde+JlMeGEhpVeUVAQv1wRICNXlz0qojyCokWKDVUGsVpEz15U3ArpWfSoCFE8AzCijGNEHwaSVhfJBOABwgaT2VFhNg8QGpjsIDDfXgQUAACxZAIrGlWOwTIRvazB4jsliUy0GrAdrHOhC2oeEUO0ZRNwTAorZf3RlIERpa6E0VErN9'
        + 'Rm3xg1syWlSPEwJo7KohB01eETkyZU9vYfHD4FItmc9ATWjR9IwQQmK6z6guawcLU+Y2VAfVgKtt3Zvdyvq2b3FVGBGqIVL2AsANz9iAJOD7DPnS16vQfW1oT8CdUaBBwNal3E/W+KldANyXFN1NsCdjkMJSjIF9rQWAHGGBBppMgsHKgfB6EezP6Cp1ERVowQ1u0ALM'
        + 'AIQZG5BxDVaAklUU4AQzyMELKoCJGM+4xjdmRSAAADs=';

global.resource.pluginmanager_title = 'data:image/gif;base64,'
        + 'R0lGODlhzAApAPYAAAQLAAYNAgcOAwkQBQsSBwwTCQ4VChAWDBIYDhMaEBUbERcdExgfFRogFhwiGB0kGh8lHCEnHSIoHyQqISYsIigtJCkvJisxKC0yKS40KzA2LTI3LzM5MDU6Mjc8NDg+NTo/NzxBOT1DOz9EPEFGPkNHQERJQUZLQ0hMRUlOR0tQSE1RSk5TTFBV'
        + 'TlJWT1NYUVVZU1dbVFldVlpeWFxgWl5iW19jXWFlX2NnYGRoYmZqZGhrZmltZ2tvaW1wa29ybXB0bnJ1cHR3cnV5c3d6dXl8d3p9eXx/en6BfH+CfoGEf4OGgYSHg4aJhYiLhoqMiIuOio2Pi4+RjZCTj5KUkZSWkpWYlJeZlpmbmJqdmZyem56gnaChnqGjoKOloqWm'
        + 'pKaopaiqp6qrqautq62urK+wrrCysLKzsbS1s7a3tbe4t7m6uLu8ury9vL6/vcDAv8HCwcPEw8XFxMbHxsjJyMrKycvMy83Ozc/Pz9HR0NLS0tTU1NbW1tfX19nZ2QAAACwAAAAAzAApAAAH/4AJgoMJBwCHiImKi4yNjo+QkYyEhAWKlIOSmpucnZpGfqGioWpLnqeo'
        + 'qYmgo6FiiV6toU6qtbaorLKiDre9voe5rSCHGLp+tL/JygDBunTL0J3Nol+HWsbI0dq4xqMp2+CN06IQCN3Z4emQzXqyUOrw46E9Lefw9+KtAgHtomT44ZphEYWGiygueEahA4ivmQAAsQgeakGxIqOKFgFgbLEoRBQvZsxwsbFA0UaOGjEi2riuFQpjIxKKWsjSpMqJ'
        + 'NxPVZOQRpEiSNk9mFLpihCFEDgEYFKXmEJlRRBg9FRUVAJ1RNBKZMcYj0dRQVb/6qWYV6yOHfGTpASBzlqJ+of+wKBJL9qqorIng+pG7aKuurojEtnoGQPAoMCWZ6VM6qmlhqFIhl72LCE03P3gfU3XaqszkUJkZObzWygpbhYlItMIzt/NnzKlXL7LcLbNhUYRvj4qg'
        + 'eNTDpaQ4b14ktqpd0IdKXPbDWjhY56KEHIftyKEPWVnbHks0sJUIr7Kkm0XUfdR3RMovN9fsDLouNL1F/W4MvWrr4dPxMlkti0N997qEtohDIsgyjHbo2CGLaYEtR90hCpaWyH6jaBeKf+zJkpuDFiQFnB+OFRcZfuOBMco/DbTCwn8ZGiOgIg6Z0woCp82ECAe6wAHe'
        + 'cpnhKIuOiJjoDwApjrJii1YkaUX/F+5ZIaQoLnhIX4b27fjca3iJ1cMhernAom7j5eMbAGmNcgiCiORgjAQN8pjmmm3Ow+UoXlI54pVlgiYlUyzed2V+0PkwJ5RfOvjiKovJMQphaB4CnF4wxFkbIo+OEmmgg4ZSp4jESZbfnsHZ2SmJlGUoKABdFiqKFAGetZhfoTYK'
        + 'QIR+UDFKFZKyih0itNoqCq6Yokpnn1b6YRxWST3phxnESnpsqWKdmqqoxQ2xa3WLKQtfjW4BAMEoQMAhCrP1WdsKXt+KEu64kko7rKh+GnvIpzM+0AoYzbIIqKmHTOHEv05sKllxBlwrpnwQjUJuo6qJwgJwfDhb8LmHNBzK/8OiRBysvwALPFy8VdHqR5QOMsgpyPOO'
        + 'F+0jnIpYHnLYjvnhP9xuB4ALo3CAxCgQ/PcydTiLojPPwTYiGBNIMzFFfRVs0AoH8oxiQr6i7rtyDlhn7ex/L4Up2mIzn4kaADvvEsMow9jZdallh+LA2aKkfXXWWEvaChcAttJU1KFsC2+xz8K8srjvtgyZj6UeHMp8Q9aMjBWjEABD4YdTDADkokhOuSiCEk5oi6Pg'
        + 'DfoochjCN5BUc2r1KJ234vGVIk6c+Ncynyi2jQDAupYJmz8nO8y6A8D754O7nncoooNpxgPArGYHG1iogPKof6rMOgCea6rqlZYr7gfjodDcqP/nzxQoChIsWk4+AOaHgj6/2Y98vB/JL/dBfIs7cjLgKUN7ffyvk5eotHMopIDNdo47RJ7cAADE+cFkkiGgAkXBQAdC'
        + 'kHPYMx6VasBBDrrHDSJjTVKMJpnprQ6DVdCg4UgFM++Bzw/iQ83v4FMMUeCramaZIQBqGIobriyFvRMgygTQChKM8E5C5B+WgjWtFVZvdgM6YOPQ5ACFAcACo9iW6sxSRXZhUSL8EhbxSqhEeo2JhB8ro/UwKEbtUctTXoti7aaImi+6AgASGAWQtkgZO/rhFXkUxR6v'
        + '10b5/W1rWDoi9ZKIyBOGwl1jHA4fW0g7hIUtgQ7EV7pC0ZxJwib/k96qEBODWKVGImsxaLySCdf4yEwZ0okC3JcLGUNHG7XPD14AQBdFoS+z3DKXuwzFKCOpSjXeRZHTW6X/2NjEgcERijCSYvhu5xYVhG4AC2iFAXBIGWseBJvaDGMz02jKY6ISiaXs5TJbWcgAhuWZ'
        + 'lJSjJRGIpqBdRgHcRI49u4HPlbUzdfDEDDKVqEzBEXKcsAtoAZs3x2kmUAYO6pknswLR5Uj0oKREZ//0dM5FpjOf1PEnQgU4UVc1FIbU3I4NHEQBkGZlpctpqUgz6tGNCrSjyTSmQZlJ05LGbJ61dAsOHIQBlwJgqMsp6kyJyUh1cvSM6CyAVKV6iJcxKE9+/0DBIcQw'
        + 'incAQIXOZOGDKpm/S6KJBw7yT0nRuhz/cFUUXgUrVaZKVZcO1G6tkAEAKCSKDyBVFB44hK9EkYGKMvWdYl0o/r5HS4ei6ToHAcABnmZUyCJPspQdbCgKK9f22BWnxZKFXg3Lz0NEwUHudOpY5VlWeqLGCaEDgIwAa1TYRna2oQjsaZcTwMGolgZ3nZ8f9BpMXXimYqjd'
        + 'XizjGM2TxtBGQIgtbv0wjJJG97bCAIDFutHbRf02uKMThV4BQITL9AwRsMriYX9rUqA6FjXXvex0q6tQAMSXfrLNbu7ew1TffhaqixQtImJgIT+MgXmKUJYfmKSoV4b1ifFsrjl7UZrA++Jtvka1cH7RFqRWMNiNYNpQYqOxgRbcoAYraIAjJvCCHMSANwDIBENmzAkW'
        + 'uxjGMv5FIAAAOw==';

global.resource.remindereditor_title = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAANIAAAApCAIAAADPruDPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAdjSURBVHhe7VwNTFZVGA5hn4I/5JbLRUL43zSN1MlyOpNBiqKGYqigU8pFmuW03DSay2KwtMSfUYqkpiLJLBQF'
        + 'IYl0KGJB8WOaqAvTNI0fIVCUrdfdOh7PPffce889H/d+cL+dOfy+933e93nu+517/u7n9v6q5TMioh6jvaqrL1eUlW5KSrh/7x7VwH7TuAJvLFbUH4HvTE3evWur8VjWQejESMXX1z90Snh2XrGPj691MrYzaQcKsMoO0UtOSWsHVG0K1lFAU9l5enoFvjjOOknbmbi6'
        + 'ApSya2m5K2c1IWiSq1N1lfxBf6K5Suba86SU3dRJY0ImjGhsbMBR+vj6awe1LY0oAPpPDgnEWzubT4A4bvKZ7MSgka2trYnrkl8YGYjkg1ltzLxw+G9QcChb02N5R9hmkoH0UkJTAqG+jwAJNKX3pdDNTU319XWVFT/L6RjhCNI1Ntw+e7a86Z9GLcUnn8lK+mvMShcL'
        + 'EESVmhQXv0ajA8eGTAzr1q17D++era33b9fXlZYU/1CQ99eNP/EkqchKanhokQa3eWXGnEGDhyh5wYWUMmaYnT51QupKl62Ig5kyFaq2tqbkxyIC5Ot9O6ngIS+HrVwRCzixS9719n4cAXp5dT2UuZ+dDHxaeCJ/TdxysRwBDQp67Zr3/r51U6/CSvZs5VVZSOo93ccv'
        + 'at4idkqXL1Whstuaut+/b3/CftToMYtil6Xt2Z66bTP6iJ0eoYamKYUo4SSc2VEx8K+7u7tSzekNB73ypxtT9Xoh+zFjJ+QVlHK7KzkOGfr8vozc3r2fEo5MBXQGiy+2p8trDkWfPTdGY98JLoQaJpTd9PBIyENUzUkqPDcsYP7CBx0e9ys+8eEXlxtE7vhhfJJANFUo'
        + 'gSzgy9y330B2RLi9qKaEGyA1TCg7h6Pz2HFBYdNm6cpY1RjuHfgdVtWeMIAbBySm10vVHnoLRoeh6q7XQCCL4JDJqtFB8P4DBqmaIQOkhoCyg1EFapcu/kZNAoYL+PtTps7EL0bVhfPaUxdiCQmfrSwjoIYOC1AC18IRfMEMhqQESL/+g4XkLAfRywIQvL17Ii4EIHq/'
        + 'rq5GssQNzp+rDB4fsCB6OuHFWOJgqKE4pYCxFx6g9T5lbgUGMFDd9vkGVVnPFBc6OjvQJhs+Rwbf1JRNAu8OqsmgnIkhXa9eT1J9NXJEZgezC2GBHUF5enqqpsRhoJeFFGLjZ/EoFkE/L/cwFAr6tGu37nhWFeUPhr9/XPkdpoMwq8XYPWSK27PVoPd2bp06DXx0utrc'
        + '3MQhDe6Stps+6r958wYcODAIzucO827c0eFw8OEQXi0tLUZwFi9duXTZKrwNDxjFAHQSC7Lf+X9Nh1jcIczkeVLVoJQdfFlz83/Cv6+A1dBQb0RK8D1ekEdFKMg/ahD5+2M5BhEs5R42LYJolkpPSDKUsqOOrJPWf2wwHvSXZ04XykHyv3u4eswXAvpLWEPi87W9TFFA'
        + 'fUoB9/vwqePh0hrPL1/WLcFAQch8QukObjxnDgTivtPc3MwB0m5cqGqolx2sQ+7ae0hJhVmR82GzAbXVHyQw9JLX7sUL54ToC11p0cnjQqDkINo5+j3TD2bo+Igb0K5drXZSYhaHZaihXnbADXSMWbRUiSQs/KLWo4c3Qwt5kVVVCVs6ycnOdN5l0MIRqjNlRwbsJuFp'
        + 'wMqRfKWGnSdMNpM3f4K3X0rPOI+ak5DZatBPoMyJmEhkA5sbxvMjTrUAIHXPmy9Qbc0tPkfnedXU3HrrzWi9+EeyDhzI2Is3vQjWtMfVoJ+3g7sh8Q0jbhzcxIjDfPV1tdxQhKOQMaKoZAAH+rnlb792984dgZiuC0WooXiTJZdnPB5ZPebmT4yvjS8Hokyop1O58zTu'
        + 'CIO8L7/6lr3kZjyKqyAQamga2zG4wWL05qQE1E4WFpgohMAixllo53j9+jViILE2foOJgpgbmqGG0bIDYpnfpOPNRKoGtwcYmWvhCNUZHTl55rSXcBxYdSd2Ak3Upy1Ds9UQUHZtScb6sWBwQuxW+fj0sX7aTspQSQ277JwkuA3LUsAuO7s+TFDALjsTRLdD2mVn14AJ'
        + 'CthlZ4Lodki77OwaMEEBu+xMEN0O2aHLjjjFLvBcQlsWliuyEFB2nbt0wVtbKs4dCxKG5+OJg/uMvbW25Oju7qExnF4WuuS68+jTM+gsCHEohO8Qq9Gyg2NVWTmnUNuTnq2LmynGUs6wT09Ev1J9mZpPG3M8nFuESwp/U38+Qi8LvVITZ3LhxOGw4SPglwCI08JwnEkv'
        + 'MtgbLTuOkNZ0gR0tqx2d4hBKIIty2eN865NSFr6+hMiK73y4XXb/ybhj+xaOy2w1F4EsqM9bEXzP/VpBbEBrFMQuuwdCHc3OzDqYoVEyy5qJZaHlebyEj1bzqdFxyw4mEHAgDJ6Le2fJgnWJa/jkM93LqSzgd8QS4+PkjyIAa+jn5r4aepX36SS3J1jP3Jiuqp2AJRQY'
        + 'MPBZXz9/+KEd6SBTeVmJwd/ts8vOEte1oyXxLxUXoZX9Il/QAAAAAElFTkSuQmCC';

global.resource.info_icon = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAABKZJREFUSImdll1oHFUUx3/3zp2Z3Wyaj23SbNI2S02rrU1t+oUUjBYRqgj6UKHgx4NWCpZqEVTEBxV8UhFUKGJb0CIVK1ifKj4pioKVftivB61JWzHZZNPsJruT3dmZnbk+'
        + 'zG6yaVJBDxzuzNxz/v9zz7nn3hH8i2itASSgAKs2CsBv0FAIcUuMRWdqwAaQKJS87h8ujWwplPyNQoplIvLJtsTNC/fc2X26NWFnAAcIFiNa8KUGbp8fnkh/+dOVfU0x+7GVnS09cdMSShlR+EFAqeLpv28URl3PP7Fr+20fDfQtuwq4N5OIm8HDMIy9dOTHBwtu8MGm'
        + 'vp6VhmGK6RmfiLfBUUBrwiQMq/rCcGak2ZYvvrNn8KSUstxIMo+g7HrqkTe+eqqro/3gwOreeLFcvUVm50tLk+LS1RF3NJt//uvXHz3aFLf9+pxsjH5g7+FBLdTBvp7ueHaqQrkSzCpas3NTip2bukHreXPj+Qrprq6YocwPt+77ZIfvz+Kj6g/x+15LtKdSh+5anY7n'
        + 'HW9+XdDs6E+xfW0nAIUZl5NnMoiGBLhelQ19K+OXh0c/bt/51gBQaFjBLlxt7N+4Jt3nuAGuX52nFa9KwXFnwaYdF9erLrDLOz7b1q1a5QTsp2tXwwrWp6yW5viero6louwtnvdvzmYoewFCwHcXx9HCWNQu2dZKsqXp2Vxn53uMU4kIEnZ/qjPZV6osBNdas3Z5K6AZ'
        + 'Gp8BoMlSTDr+ol3ketDb3ZHOZSc2AKcjAqE3x2Jx6S4SfRCEvPnEAIac3Q8c+/5Pvvj5LwSaBfsXWJJISARb5gi07hbSYH56BEhJGApeOXqW+/uX8fC2XgC8QOMGtfBDDWEARESGlEhDgQ57oF4DraXrBcyuQEiQBmgB0uDUNYfVqSWz1NVQUw4FQgsMIGZKPK9Cvlhm'
        + 'LD/DWHYSdCjnCCA7li9S1iaWaWLZNsqSGEqgTIkUBlWtCYIArTWuHzDtS3y/ilNymcg7eK4L1QrosKaMzxGE+sK0UwqnfVNiWKA8UDYoC2FaIBWDfQ6FQgGATL7EpTEPwioEAWgFhhkBVz3QoSbU56HeB2X/PG5xBGWDUTNWJigLbVhow47SNlseAaYdqbIiW8OMfE0b'
        + 'KoUMvv/bHMHkiEPFOUZQ0UgjMpQNTlLeRFB7lwoMqzaqaAw8cIufMz5ahOjMh5nfoWPrZfAfp23FEqRRi8yCMOTE0ysYvL2VtiYTgBXtNg/dEef42XwEXM+7NCD7xzgl5xmGPis2FhkuT40xYBwgN3yMVL81F6VAKcVoIWC0GDUaWqNMhTAUmpqdsiFz0ac0dYCh6ZGG'
        + 'zd4ga/ZK2ppeYGn6bZYPWPU6YFi1nMei/PsV8F0I/KioVQ9GzvncuPYqufL7DB0K65DzD5TcGU1i/a8EpSuUJu4l1pIgkZwrvFG/ksPZxqKQgeunJsiPPsdU+QhDh8NGyMVv6/QDkFzXi6VeprljN8l0By1dAqs58qg4UMxqctcmKU4eF57/rp66cp2r3y6AuvXvAED6'
        + 'SSGTbUls826N2KylSAEIrceE1ueoVH8Jc8Uc1z9deCD9L0nthu7d/8nlH/ZrI5qfAOMrAAAAAElFTkSuQmCC';

global.resource.ajax_loader = 'data:image/gif;base64,'
        + 'R0lGODlhEAAQAPYAAAAAAP///yoqKmpqap6enr6+vrq6upCQkFxcXCIiIlpaWtra2tbW1s7OzsjIyMDAwJSUlEREROLi4oyMjBISEhAQEDw8PHR0dK6urqCgoEBAQC4uLsTExOjo6HJyclRUVKKiooKCghwcHHh4ePDw8JaWlmJiYpiYmEhISLi4uPT09E5OTmhoaObm'
        + '5vj4+BYWFgoKCoaGhnp6eggICHx8fFZWVgQEBAICAj4+PjQ0NAYGBigoKFBQUA4ODiwsLBoaGiAgIDAwMDg4OEJCQh4eHiYmJgwMDCQkJISEhEpKSkxMTLKysqysrKSkpJycnLy8vMLCwjo6OoiIiMzMzBQUFNTU1HBwcKamptLS0uDg4F5eXrCwsOzs7HZ2dpqamsrK'
        + 'yjY2NjIyMhgYGEZGRoCAgGxsbGBgYKioqG5ubrS0tLa2ttzc3FhYWO7u7vLy8lJSUvr6+mRkZNjY2Orq6sbGxoqKitDQ0Pb29o6Ojt7e3qqqqpKSkn5+fgAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJ'
        + 'CgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGh'
        + 'Ro5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9K'
        + 'Q2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAU'
        + 'LxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4'
        + 'IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3Ze'
        + 'ghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZN'
        + 'J4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXB'
        + 'hDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSu'
        + 'Nkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA';

global.resource.ajax_error = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACYQAAAmEBwTBV+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQHSURBVDiNtZVtbxRVFMd/596ZnS1L210otMB2t62gmKA2gVLtC5Ug'
        + 'aGi0Eg2JfgY+AdAWWq0fgKJGE33ZqCQF5EFqCIoJ0RoTXpRATHjY0hYa2i6d7XZ2u7tzfbHttlgKiYn/5M5N7j33N+fMOfeMGGP4P2Q9yyCxSloUxBAioCKIyviW1R9/5N152jlZyeORkOwz6A5VVdWsa2uxamOAonB/hPzoCH4yOahE922acHsxJv9M8L2QbETbp/Sm'
        + 'aNOqtv1Yz20BgeJD5ichf+c23oWzFMbHB4IZ82HVw4epFcET66R8Nu9cKdv9diNbnsefm6Ns46YSbCk4OzmF0gpz+xaZ3369ZgK6tfbm8NgCSy2+QixPVp8MNr/WmF+zlqnECNlwFVODg/gpF991i3PKJTV0HXdiisnbCfIVYZztOxoV1qmlHpfAo9Xhg1a8fm+hJorr'
        + 'ptnyzbfE2ttRL71C8q9r+KkUJpVi5ubfeNqm4Xgvm7/6GncySWFdNToWbxp5+YV9y8DGtj+26hvw3WnKtr6ICgYBiB1pR2/fwaOh68zcukUmVM7mE58jWqMch+DWrRSmXaxYHB1wOh4DJ+pq6iUcaUIUAccmd+ki944dLYUV6zyKtfNVsmvWsfmLL0HrYqK7jpH/7Rec'
        + 'UBkoBRWVzWMtO1tgvo4tJ7BftMafngbbYnWkEvfsGRKFAvGu7iK8qxt8vwgAhjs7mLv0MxWxKH46Db6PaI2xVAy4WrwglhM0+Rz5sVEktAoVClERqcQ908/dQoG6T3vm4ytC7x4+TG7gAhXRDZjZWUw2g8lmAUE5gUjJYyydFKVAFORy+G6qCMnlyD94AIVCKfxiQgwm'
        + 'mynaLZSiZYEojKhFsAScZNFAFY2UYnY6hX5zNw3He0ueLqiup4eEVqR+PEV5TTUoQUQWwJnFqrDVMHYAbBuxbdKpNNa+d2noPbEY/qFD3D18qASPd39CsO0DZianEMsGuziU2P2w5Obdf6Pld5Q0Z9Oz8NY71PV8VoIk2o+QPXcGEJzW94h3dy/udXTA1Ss4kTCIDNZ8'
        + '39/8WB2LY3dh20gwSObGDXzPm89+J9mfzlFRG6UiFiU7cJ7ho50A+J6Hd30IFQwiWiNK9ZV4S3vFg9Y9g4hqyqZm8Naup2zbNuYuXqA8uuGx7z8zeh979x68oSHK0i7BcCVgBqrHk61cvpxfBp5o27uxoALnjEjjnOdh8gWcSBj5V/IAMo+mUZZFYHUIkGvay71edfp0'
        + 'qcMta5sTbW3lBUefRMneZbQn608t+fer+k6PLV18cqPftcsar15zEOEjDDtXAP5hjHTVfHfy/JM2V/yDLGj8wIF6Uf5+IyYoRpIGPymih9f3/XD1aeeeCf6v+gfLYZXwkd5f2QAAAABJRU5ErkJggg==';

global.resource.menu_arrow = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAACcAAAAyCAYAAADfuMIdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABdRJREFUeNrsmWtoHFUUx+feOzu7yWZNmoeNu6liC9ZqNFAfKEitSbGPTyp+1E8KQkUpgoJSFaz6oT4+iFYFQW1FUFuaNgVtMWkiWGNN'
        + 'LFWhJGKa127SPDabTbLPeXjvcm84ezuTTTITUfDCYSbZmZ3f/s8995xzR1H+xQOt8Bq76y2H8zWHQ5Ip0rkFgCzJ1hROQGBuSDpCIIMfTenoaqglPmcQBByhKRzC5HDQFC8A1WUoR/h1PnD08c8EjE4tD455yd1rAicUYzB+agFqGj/H/MEMJMctK00Vww0gKfGZj8Mw'
        + 'qDJqFQ1blQ17DmpvJ2PGX7PRwkMD/DoC5qRpEzCeKIfAfFO5SgwsxEwLonCwFt9z95MaGfst90E+rWTo/9PUFqjNcUgZaFUKEgc3Eq5YQS1q11CrolatVSj1m3f5dgYqcaS+EYcHuoyoaRR+gMbvQyBQXClIJDAMAoCBBTnYOgZGrc4XQNc1PqRtQwgpofUkUrsJXTt8'
        + '3ogb+cI9qhSprgCJTVSKCV8OwGoZGLV61Y/CTY9qWxkcs6oGUl8VVupGeowEBYTrn2tAFcwvLAVABXdljQBjpmeVeoRx0Zds3B64ybSwv+NgptPIFb6j1FjWHCRANR+YZ0EOxhRbz8HC1CLUKu96LHCDUE5YzY1qVVUDrrv8oz5jmYtquVJQBfNNuLScR+Y6oBgDa2DQ'
        + 'VDlTlZQT4+bmQISiNp9+PdVumcvy3JIKqtJ8E3Otkrnzia8rX80tKCSXsjQjbyFTt0xVQwRj55S8ZUcgrFiouf2tVFc+Y7kCVEFACDgRodVVYd/1q1k8b91ZFqGuvr/jnQUlu7B6QFVK8EXBgB3ct5zRuKucAW779sCcCVxsrQRQdcihTL0QwUhxM27fXd6gqbj51IFk'
        + 'h56zYK0HAwYGjWGnnBwUTL1yTIjrgvGWXUEaTOiB1pcTulTFwKMdaFFuJZJ6ZcSFW+G4bU9FhIZRy8lX4t8ZeqF6yQATFQ2Wi19VKsNh+tLcuhWOpt3BDSpGLW1vzLRl5swkLxJYsZDiz8s5ZQhkl2O9cGuxgqGNaoA82Pba9Mx83JjmHtI4B7FTzrHL8sqtRVG8o2JL'
        + 'qFp9+Itnxt9PzZoymHCtpYBGxT59YLImtunOYFPL3uo7pAIVrajBoZN4TZrlwd70xfZDM702keoId1VzrK6BW//4fv7SN/tjx1OzxjwPAt2mtSyCs6Q6rNDuEY+Vu3BqduCr/WNn0kljikdp1gawSDl55RaLYw5j76K192Ri5Mhz0XZDt67QPxN8KUkBuCXdKlbvPP9F'
        + 'aa+itad1JvrZs8Pt9DRKbYJaXIIz7JpwVXKnzi9mK3eKeLDO9ZyIx448P3KWno5QGwNwSd61Zbkght2cg+4UqhXaPIzcKdd9bHr0032DnaZhDXLVxqmx+TZLbZ7DQTBbtwo4oRq7MeHGrT8dnYp++dLQDxxslINNUpvhqgmX5kEwOAaEDlRjN8fjsfxwZs4gmXlDy+cs'
        + 'RKth0+dHZPO9lTVLg01GD79wuSubMgcA2MRKwGAu9YEthxCvhOtAUxMRPQS76fDUfdsdXXl8MvbhU32shxhyAybPOREMKVC2+6SEHNbKcKWTu7tbJ6Mf7+0/6wWYHK26VFNhkJQXE7K/jCC78v3csYmhj57u66SuH/UCTA4IxG8UsAiALXbyVLmrstrPJyb7P9nX15HP'
        + 'mOMcyjUYdKsiJWADwMGdTMsfJBoCS8yvp6cvUsXOpOcKKSnOI9I1mN0ijCQl4bZr4f+hai0o3HrpXOL8u4//fjSXNuf4ip/gUK7B7KoSeDPiSwsMCKM24q/GCCmxP1O/vPnIhUMUTN6fS3oB5lTPQTeLtW9RuVRSjyWu5Lo/f7H/PerKCX6NAExzKNdgpbb64ZaYtoI9'
        + '4YwXYKUqYTnnKiDFZZexm+4KbDlw8gsQ8fBS7yFML97klHpJYtqo+I+9wfnPvvty7GcdoltRPH5r+P9Y7fhbgAEAMJrdIgjV5tQAAAAASUVORK5CYII=';

global.resource.up_arrow = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARfSURBVFiFvVZdbBRVFP7OvXOnLchPKpRNLS1LKRQUywapiqQRYkqB'
        + 'grYQChIbtMSGJvpk4oMxgQQTIhqjxlQjJlAxGIwkxkZ9MD6ZoCIhhaZgKy1UbYAtpD/bn53dudeHmVnuTreyLYs3OTl3ZjPn+875zrl3SSmF6S4jf/HjABDv6/512jGm+6FYuHTdQ5V1xwiAKFy2N9b7x8//GwFRuGxDwca6o00NLwYBoFmIFrOodJ917fJPU41FU5VA'
        + 'FC2vKqja/Ulj/Z7CudkCCsBgNI5PP/+i96/vTzZaVzt+uG8ExKIV1Qs372lueL6uYHaWAYAAAqCAIcvGsZOn/u797sT+aHd7a8YJiOAjtUXVL3xYv7M2f6YwXGyXgLtGYhInvjrdd/Xb469Er1w8nU7ctHpALF65a9G2ve/tqt0WMBlDTDqkSQMnIpicsHt7Tf4pw/go'
        + 'p6TMHOtq+/KeCZjFj9YHn3vpyI6tm/MEI1hSJYAJKsGCCFBQMA2GupqtgW+yxPsPlIbMyOXzLdMmYC4pawjW7Dv87KbKeQYjxKUDkpy5p4ICY05DGIzw8NqKvIgVPTJnxWox2HHusykTMEtC+4PbXz605ZkNuYwIlu0CEwDpZE5Aogc4A6RSuDYwjs6BEcSkjQdDT+Zl'
        + 'Z4nDuSvXmLcvnm1Om4BZEno1uKPxYOXTFXOJaKLmbud7mXNGuBGxcCE8DEtKmBwQ3OmJmavK5+VkGYfml60R4bazH9yVgFkSeq14Z9Ob69etnQ0AMVsm6ax7BYATcKk/gp7BsQSocAl4tqDssdycbHEwECo3r5//7R0dL2kMzaWr31hS1/T6U0+UzzIYS4CQV24X3Xu2'
        + 'pERbeBiRWByCeYDJ4Dqhwc72obaWj9/+5/df3ppAgM2YVS0KSw/w/OLRO01GIAIWLF9Vsn5TdYDcZxDBsm2cuzEECaUBwgUk9J/5sS/S03mFM4ARwIjAGDDQ3TXj5qX2A+NDg61JEsjR4VYAKU+wOVX1Z2IbtwSIAFJAXElcCDvgJk+d+Ujvn71dXx+vSBVPX+ldRkSI'
        + 'J+ZfoeNWBLbSwZMJmJzA9Vm9ZwIAbAVwUui8PQJLSp/OydkL7pQ7YwSInBm/NWph3LYnzVx/x9MrQHoEOBFiysbNMQvCoLt0vEuAZVACRgrXR6PgzA/oPjMtewMQjJAmfpoSQCFqy7RK7+0zWgHO6D873kjRiBmtACM/IHyEJlbkPlZg8tLrpDI6BYzB6X5f06W6eDxC'
        + 'GT0HOKU+bBLZa1PgSTTtk5Ao6dYHAJpfVt7TcfTdYUbkXiyOLN6eMafkRATv8gn39PQTEXdjKN0r7QompZQOylxg5jPy7XXzAygAUvO66e+UUkrpgRgA7pqRwrjmuY+QHjgOwPZ5v9muSU8CPUOdgPCZoXmPiJe5FzQOIOZaXCPprxABIEP7QeLO0gPGXCAxSRX07/WM'
        + '/VXQvSeHSvwjcvvAL4m+n6wXvDVB4xRe30Mppf4F67SXpvDAfoAAAAAASUVORK5CYII=';

global.resource.down_arrow = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARDSURBVFiFtZddaBxVFMf/Z2Z2Nk1KEkuihSII1WJDW6yIVattLX60'
        + 'aX0piIK+iQULgtQXadAkJkR88lHqo1AffFCTbj4aslmiRZBaaZtufVAMKA1pXOtmE2d2Z+fe48PO3dxMZncnEoc9zJ3L5fzO1z33LjEzGj3mtu1HYdnNAEBUaxWpHwCA/fKffm7+h0a6rYZ0ANbuA+d3Hn/lQRDAvGoBEYE1KgeGCMmYH79wGcAzm2KAsbXNe/6xfQAR'
        + 'JDOEBCQYggHJgETwDsaFko+FTLMXy7k4i4AKGEBDuJQMyYBhxNMcywACIBgAN4YLAKYJmLWLZc0Tz05SkMZww6jAzc2NAEEC4BhwgwIjjHgRiFcDFKQAjeGuEMg5Hsx4/I0UIVZTEQH3hMSiW4LrCyQtgrGZESCq5B9MkfBFx0POLSFhEpIWwbbof4oA1sKJgD8KLgpl'
        + 'H7YGt03a3BqgIPSgVTiD8VveRUmKdXDbos3tAwh2AQI4CPj1bwc+yypQh9sWwdpoCsz2zqeMto49yuPVYwVo6jqQlFzp9YZRCbsOT4bgSZMgik77fV17TxNVzgwj0EsE5ObmvneXl28CAKnT0Ny2fae9a3+q49SZhztbmsDVTkZo39qMztYWGAaQczzccUt14bZFMPwS'
        + 'TPYrcwYhYRFIlDA6NHQlm04/x8yFNQYAgHnPvQ8k9x4cfvzN9/bd39YMCUBIhgw8d32BuSUHiQbwqDnySxjp7/322tj4CWZeqSY3fB8w2zt2NO05ePHR0+f272jdAhmEzjSAuSUHnpQbhsNzMdzfm7kxcekkMzs6b12tinzudvHaTPdP5wev/r7kVOGuL6LhZn04F//B'
        + 'N70fTN2YuNQdhkcaAABiJb/gXk0fm/1s8MqdZQeGAfxV9CLhUTtAwaWzguG+3onZycmTzFyMYtXchrLo5IjoheuQYzjT82SZjEh4rVSIlQJGBvpSN6fSp5i5XItTtw8wc56IjmVJju5+69zTtpmMBfeX8zwy0D+cTU+/zMx+PUbDRsTMBSI6/gtx6pG3ew7byS114V7+'
        + 'rkwNDXyVTU+/ysyikf5YnZCZV4ioexby4hNn3z+abGqJLMLS3ZxIDQ1+eSuTeZ2ZZRzdMTs2wMzO7ctTJ3785MNJKjnrCs/NLfqpocELtzKZ1+LCgdhnQdWIIhG99B3x1y/29HXb7a2wLYKzuOCPf/zR59lM5o2N6FNKNywAEg8dfnb43ekZeXZ0zOs6cuTT/6KHmdd3'
        + 'QgAgWnOlpdBbPYldhw59YRLN/zwz847yR/ctPOYIWNWAAKqLUeMdljCIUbm36GMZMQ/myv8sHajERKU+LG1samO1To+KAomQ+JqoObWOVREqAxQkUUd0w9QuYk2pD6BcRyhYwwCkFVKgoiFC3unhVBBTWx/2vhzyXH3rEWAATMwczr+e83Ba9G+1Xk8Bq9BqoLBUa4GZ'
        + '+V/8vLMP/1VGiAAAAABJRU5ErkJggg==';

global.resource.thief_icon = 'data:image/png;base64,'
        + 'iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9sIDAsiMq27SnQAAAN8SURBVDjL3dRfTFt1FAfwb3tv29vSP7vQlpZ6W6i2IGGbwlwGRiMsxT0t'  
        + 'mjg2t0mIqEOngpqYTI2C+LqxRxaN88HE/YvZA/PRQUycbv5LdMwYtdR2lP7httyW3j/t5fjq0Fhn4ovn8ZeTz+/k5JsD/AdlqNewuHjjdCqZdDEMkyWgJAhCub09OvWv0JnjJ+jsmTN6eiWd5bfwDMua9Gq1KheLBT0ajYZHRkaYQ8NPGP4x+szoUzQ3N4fWcBtCwTY0'  
        + 'ut1wuhyQpBLEXA6JpSUkEwk8+/xR/bU3Xmfrole/vMo80NdXEwQBnNUKE2uChbOANZlRq1ahqio0VYYsq8hmM9/Hk8lHPB73r380bvkll8vvPDA0tD0YCsHhdMJsNoNlTTAajYDBADPDwGyxoFa1wmbTwLDM1ueOHPll83C3oOfPnZuOx5cGW1tDsFlt4KwWNPFONHAc'  
        + 'OM4MTatCWpchlSpQFAVOnscP1xdx5fMvZnv7do39JZrN5Qc7AluQXhWRUW+ipqm4U/DAzdvhsHGQyhX8ll6FWFLAmDg4bBZ0BP0wMMyrfxuhF54cJt7hooMHHqeZEzMU2x0jn9dHPq+fwqEwjb84QZNvTtL9vX1k56x08cLZ2brBje2O0X3dPSQWikRE9OnleRL8LdTc'  
        + '5KFY/wDpG0RERAvzC2SCgaanppc3G8bNDxu6DpZlsZrP49KlT/DK+AQUtYod3Vtx7atvMHzoMBZv/IgNAAaDAbqu++tO+vThg9TEu6lVCJHLwVNYuINOHz9GtHadJkb3k7fRTT6vn4IBgew2B33w3ru02fhTcPvvasB3zS7UjCz2PtiFfbFudHV1YD0Vx7HRPXi4J4jZ'  
        + 'C59hKS0i6AR2RppRFzVtVPH2/m0ItneCc7hgZFl89PFlpMUyBnujiIR8OPnSoygXRfz09TUoivZ+3Z3ybZ24mUojky+guCZBVlRsa29BwGNHo8MGRVaQL6xhJVvA8vIymiPbj9ZFOwcemyxm0lhfK0KtyFBUBbzDgv4dEeh6DZqmQq1UIOUy4PgAAuGIUhdtCYWneobG'  
        + 'kYn/jKKYhyKVUZHKKJVKkNfLqEgliNkVFEURD429c+q2Tt/ChycpceUieK8XloYGsKwJVU2DXC6jUlZw79DLp+7eNTB220d6JZV4K/Xt/KRaykPXZFjsPCwuL+6J7TPgf1G/A/HlfFWAgYziAAAAAElFTkSuQmCC';

global.resource.config_menu_icon = 'data:image/png;base64,' +
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/ElEQVR42mNkAAJpaWnup0+ffmXAA/j4+Fjd3d3DVVVVFc+fP793+/btx0DijHZ2dv7zFyxYlJeXl7p1y5ZV2DQzMTEx5ufnz66srEj+/v3H/w0b1t+urKxy+vbt21NGoMkGy5Yv3/H371/W/Lx8pwcP' +
        '7l9EN4CRkZFv/4H9j02MTfgKCgpmzZkzpwEo/BKI/zGC5IE2aKelp/fFxsbqJycn+9y4fv00sgFAL9quXLnikKKiEgPQ9gPVNTWBCvIKGi9fvnzEiKROLDExcWpWVrYz0JCAS5cuHoJJ+Pr5tubm5lYBNTAoKSky3L93/92Xr1+58nLz9BjRXCsUGRnZV1xcEpSRkR52' +
        '5syZHUJCQhIrVq44efr0KTmgXxgkxCUY3r9//3/Z0mVTz507V4RuAAjwBwQGtlVXVyeUlZYVBwT4Z/z89VP/zes3P27dvn31zu3b54ExdgxoyDqg2o/YDAABnqCgoIk1NbVJM2ZMZ+Dl5X05a9bM5M+fvxwGyoGi+y88gLHp1tDQMExKStoCDAep7JxchiunVt08sWXm' +
        'zLm7vvZjxBC6gKGhoV1CQsL65SuWCRnoG/5U5jn1PCfqnsKT65/fB1T/tb36gOEqTgNsbGx8gkOCly9btpRHT1f/76lTp2pYv1z+URvLUOoayiD1l1Hkx8SODzP61v0p/fCN4Q+KAR4eHtEuLi5zly1fyq6irPr/9evXk/fv318BlPrFxMSgtrKRYYtXmLLSz8//GGZM' +
        'vb+oZxVD6ruvDL/ABgQEBKTExcVNb2puZJGUkGLg5+dfs2LFihRQKMNcqiLOELW4nmGmupEINwsnE8O8ma/WtSxmiGGUlJRU9/Hxad2xY8fR9PT0XqDNhydOnBgO1PQCLXhY5IQZwpY2MUzTMuDkZ+ViZCir/FbHKCwsbAgMtPLjx49vcHJyKm1rawv59+/ffRzRyyzB' +
        'z+C7qJphjoQUI7N3wf9AkBfYgSGfC0xxKgcOHOgGZqq7DPgBExcbg+G//wz/f/xmuAAANAw4i9ZGbqAAAAAASUVORK5CYII='

global.resource.freegifts_menu_icon = 'data:image/png;base64,' +
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVR42n2TW0jTURzHv3/nnE7d1C3nLd3cbJuXTDfTckVpYiRSElgZ+LCHKAjxwSKhkL3Ug/UaROJL4gW7MKpZYFhSiWV4DVJDnTh1/r39ne5m2zr7g6Jo/d7OOd/zOd/f5VD4T/h8Pqp1aPTxz3k6'+
        'O5lyf1/wUK/54yMfq6qqXFsaaueFe89aKwN4Aa2G8vJNhmEUoaGhug9Tlsq+ielTnvU1OB0OD3d6/JqhtrZxG9DX1yfWaDQrdrv9SKPxtfHrwCC1HBJxoEKbzl33AmaKB8H6KiyWGczMzuFmSfFTbVZmjUgkWmMB7e3t55VKZZNcLg8bGBlBo/EN+n9P4pgsAQuLS4g5'+
        'rIEwWoKzKhnihEKIxSLw+fw/JL7QNH2VamhoSKcoqjsoKChywsNBsNuOxRUG0ugo6LI1kEqTMG/bQI/FCm8wH1lCPhSiCDidTo/ZbBZQdXV1gQqF4j5J4dbo3AJylApotVqEhYVBSF7k8XggD8DtdqOpqxtuH4VLudkgDowSieQCW8S2trZiInjnDAiEzTrHikldkJ+f'+
        'D6/Xy6798aTzE9IS4nD8kBwul6siPj6+hQU0NzeLuVwu7eWFYGl2Bmurq34BCgoKoFKpWAd+kOFVB/Qnc3FQFAWbzaYkdRvbbqPRaJxa3LAnrS4vAy6nP0fodDqkpqaygGWy/7CrB3dLCsHlcJiY2NhIctm3DTCZTM9naPriFGlVdEgw6yAnJwdpaWns+bzViubBX6g+'+
        'cwKbm5tdiYmJBbsGqaOj4w5jsz3oGhxGRqwEDocDmZmZyMjIYM/ppSW8H53Eldwsf03qk5OTb+8C6PX6cJKzqXNwWJcnl4F0hbW/BbDQNKaZDajFEXNjY2PnysrKBvaMsh+yES7sPa1Wqv0ppKSkbAOGJqZgZWzfzD96ywwGw+y+f8Efl69XS/NU0jYOh3NUJpOxAPKp'+
        'fJ8Hhl+87R+90WKoWdyp3wPYckKKZyIDplOr1QyZOH1RUdHL/bT7ArYghYWFjwQCQX1paen4v3R/AeSaS1ILC2JNAAAAAElFTkSuQmCC'

global.resource.inventory_menu_icon = 'data:image/png;base64,' +   
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAoFJREFUeJx1kstL1FEYhp9zzsw45VxSs5Fuk8NITldqMCWKIDCQiogW0UKoDCKCWrUOoj+gVYsocNGiRWBEi6A2CQXahJV2WdSgdNGiJh3NnzO/c2mhjZL2rc7ifR/e872f'+
        'YIlJH01f3X9sf6ee0VMCgQqryOO7j2/l7+Wv/KsNLAVINTZmujpOrdeeDwJUOMhwLt+UJ79IuyRg2vzSH6cGMZ7BAQGtmBbjZimtWvCWbeeyNzP70scbdsR2xxpCcc+N4zHOpCkw7Sbiq1NrW+q31x38nBt9ALhFCULN5fa9h7PrjO9RcB8IBiUAvnaksisbk7tk45MH'+
        'uZG/5kWATi8z3P+qt97f4sLxQIyIWIF1mh+M8b00SmSw2jtd3vPpGe8Xf+FEe/Ptg61Nh6rfI/WMJyKp1axZniYarAXrk+iTtLxLy6aGug2ZVCL1qO9DTwVw+dKZqx3ZVR0DAy9qvn7+JnhTxo0Itmw+QKxUz5cbz7G9RX4WCvLr6BfasptSieTWxNP+1w8DAL8nJ5sS'+
        '1SI1EqlhWbQWJSR+0THWk8M5qJuKUJWO4pxFOkNUlKLC2UxlB8boeFAb9rVuxvkeQkhAYLSPEALZkATncA4sIEtFgk7GKgCrjRZYVm5s5VH3NRz2n7YFAF7ZcqTrIt9z95kpq1IF4CQ+QoKqAhViZ3brAnOlMQZeDEEoPJfEzgOEFT5qtnNjDK8GhnAVo6gAjJk9RhkI'+
        'YayeBxhEGTl7EkoptjUnsdYgpcLaOZNSvHw7AoDWGmdZkEBILQWApf3kBf437S0OEKhQECtMqZIvHCZ59vjh60gZcDgnhQQxF93N78ACdfFIdaFQLHbfuX9+osTwHy4bB5h5T+YrAAAAAElFTkSuQmCC'

global.resource.stamina_menu_icon = 'data:image/png;base64,' +   
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiRJREFUeNqUk/9qE0EQx7+7uVxySbSpv9LEai+toGiFKIhIoQYUVEQNgv+IkLyB7RO0PkEewb6B+ADS9G/xF4ptFUsba0tDrBd7aa65'+
        'vV0ntWkaY4oOzN2xM9/Pzs7tQCmFhnezcv+psW6xho5jH/txa+Bp8H4tu19OV8D322beuCly9YXA8/8GrF5KZkI3xJhY0lF9wwqNtWJiML+UGIz+E0A/K/NiVoe7wiB2+nPgjpeKXPemF/6AdAA+x5Mp/TAzZQXwxSS8HYDzic/ovTwVHpHPugLm4slJfz8yap2WG7oK'+
        'R/C8ys7Gk+ngsMp6XzmMoyxdHDVzHYAPfaZpnFb3tBDglRj0i1vb754hljvxENP8JzeVQzGCaAfxuANw6Aom9BCz1udVAZsUMFwER2vwvnC4ryjNVgg/sMGoNJ9iqaZO263fZhlGeYE+ZFVYwZ0LInTXhj5ch5IMTJPkdHGiEn464uvYQJpUhRagwqIBIsSOqZxcJMEZ'+
        'QNr+1q0TfLstLEDPZQ4Por0CuUbnk/RBv85/QUI7JwmgdV7fDY5qmWIKb9sATl0tBhLSjDwStAslOr93bBPTBs5HhpqUhculoqX2NrEivSebq4BY4ZBV9lffesexUVZYE2K8qWPNSWSM4WXs5GRvxDfRQz02hlp4WQdq84D1HlbZccdHSstTzWlsAzTsxZHjZojznMH4'+
        '1d3Soay6UjO2lFPXyt+sveP8S4ABAGGU75AoIqjnAAAAAElFTkSuQmCC'

global.resource.list_menu_icon = 'data:image/png;base64,' +  
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5ElEQVR42m1TSWjUUBj+XiaZySxtR51aXMBaa2m1FEVEVHA7ePKkCIL0VNFj8eDuyYMo9qAggicRBPHkQXFH8eClKFgUN0a0tbYVu02TTpKXt/i/uMBQXwgvhOTb/u+xyemKdDNpxsDwd2m6lFQQUmI2'+
        'CAWt3cuWLr6L/yxWDQKlpWS24yQvUqkUGMFprSEJhAuBMIyquay7M5/LvpgDEAShEiJmnuchnU7TxwEaGxcmQGbxOEYYcdQX8pN+NdharK97OwcgCKosqFaJUSY/CimQslJQSkGREqGAfCEPzsX3ahhu7mhdPlgDQIJZGEUQxGZUGAApJByyxSwLnucjkzMAMSqed3TV'+
        'ypYLNQBRFDLf9+HYNiSxmjgNuwEibEScI53NwnYy8P3ZI+2tzX01AJwAIh4RewYxqUjmQUFS+rRZMAHHFGhMqqa86SNdbW19NVPgUZRk4JB8ij+ZggGSSie5cMR4OvoKQzNjKGUaxtaUVl7jIj67s2uLz2a8WaVkzCqVym//xGobK8QW0/MXPopj/Vcg6UpTwDFZs3QK'+
        've17XpfSDVvY5FRFQSumNCVObEYyJ88mC03V6H5+HMUMUHA0TQZYvWAN9rbtw/77J3Cms+ciG/s5oaIwYDFNIaLb2DAlMiBl6z0eDN9Cg1sE0yHyTgGH153Dw6EXuFO+js3zt02woZEfZEEwmQTGEs8mQE0KXkf3MBk+w56Oy3j85QY6SxtQ567ApZe9aKnnmJfaDvZ5'+
        '8LsKqUgUJDErKpKdsBtLU4WPGBg/j7WLurGjuRcWAV/o7wWPHsFJZdFSODTN3pe/kgLJ4pj/OwNmpwbBzQG3hw/SCIexfskBuJmNeFrugUNZKJSwa0nfVTbwoayogex3gHQmLQaXSqNphKbGVn4cT76dwkz0FQI52KjCdRZj66KTn1xd3MT6B95J6n9Cij9H2qgwt1I6'+
        'sVVXb2Nav4EvR1jebqo0ZTpuCiFPty9bO/ELz+W0wwUdlkUAAAAASUVORK5CYII='

global.resource.weapon_menu_icon = 'data:image/png;base64,' +  
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVR42q2Tz2sTQRTH3/zI7maboIbsph48VJLquU2JIEoPCh5aLKIgBS9eelChB8HiD0IVT4I/qij00H9B/EU9KIWCx4jQg1LbgiTZ0mZjutlNt5v91bc56KlQbR8Mb+YN7zNv5n2HwB6N7Asg13uc'+
        '/Fz8Ef4X4OnUq3zgBx7jzEMD1/PBRx/NgyCAMAzRh+D7HliWlZEkqSEI4vrDB3crHUDp68JmrabH264L7XYbh4vJLjiO20mKQBHExT0P1z7CRFGsLC0tFl8+fzxDpl5MrxnGhholFwoFaDYNKFeqoOs64GnAGQfTtIDgZaOKfKzQRVBaSecn702UyLUbN0dM00wxxgIu'+
        '8H48NbHlOBCE4ZFkIpm1W5sbRrOZrdfWulZWloFSCrlcL/TlB5aR+mjHLoxdH+/LKGrifvH2/OXRK0+kuDw+++EtCGIcFEWBVFo98+nju887Am7dKfJEl3yVUdLCdxhuGFb/+zevs6bV6lTRc7Rn7Mv83PSudXDh0ujgqlaZq1Y1sO0t6D6cKS18K+V3DRg+f1Gs1/Xf'+
        'mqbJtm1DLBaDVOrQwD8p8fTg2dly+dc5Ve0GTVuFZFKe+QM4cWqIUQ6MhAEHCBkOjgJAjzFCMEYY5/CsUV8fiVrp+QF2I/f9L+DkEEVhxwgFAYMCZUSkBER8MBlbfIASctBx7GMIyciyxFAToecFjf35THuxbaMI8dyQO+T6AAAAAElFTkSuQmCC'

global.resource.link_menu_icon = 'data:image/png;base64,' +  
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwZJREFUeNp0U39IU1EU/vZckhJZQolhg0SWWqbgqEEF1d+NJDMESc0KN8hS26aSmSSas2Z/lNPIWoZm6WZh/oiIkERo/gg1JajQENLE'+
        'uaGtua29d7v3mWFCDw7n3ffO+e75vnOOxDYwiP89EokEUqkUk5OTpuHhEQ0RBPh5HjHR0XUjo6MajuMgXQkmhIgJawE4TtJssw2k6nWXMD09A4fTgbZnz9UUhP3X/AVgaAEBAaJfBVDb1PQ49WpJMcorDCC8r9K56CpUqVTo6uhQ0/hlAHYTS7ZYrGLJEgZCK+J5Xl2g'+
        '16GisgrXy68paOiU0Wjc7PN6sxkVMIr/8l3HSgargdCzQP3MzHf88vmgOX9h8KfLJXk/PJodIYsE7/eLl3CrAZY5c6DYolg8Fc3c0IDSK5dhn50VpUpKOo7urk5sCgm1yrbvWAZYEY8JyYwhCzSZUkBZaQnSM85Qy4LqaBK62rsQH6d8aTRW5uNXEKSM+x8QkyDwGkIE'+
        'EcTv5+nNxcjMzIZ92onu9h54l7yIikyoy8s/W5XRiKkvyAFarW0Y+TDWrNMXEvu8g4yPfyS6giLidrvJyZRTtBwkMjtmQG3aQ5DU+yBp1DLMMJ1uAKSBgYEW2qpknS4fd2pMoIk4cviQWPbct3lktWBI8OBW6Eaod0cBe8P16J+pwtgnaBwLtGG2/oFkvU6LGtNdlJYU'+
        'KxYXf8D8wIyMzEzE7VGAULF5P3LlEcCCC9gVahC9XEa/C1BzAhWKTZjH7TI0NTYO1ZluK7ZFRGDJ7YHH4wWVBAIloggvQO4+IurFPDszvTkf7bHdYadc1hfQHmhzLuYNxsTGorPjBeQ75S0smY4Gej4bUPZ6uVvMszObNy4xMdH6pPkplEolgjeE3Nh/4CD6ensRn5Dw'+
        'Sl+UrQUFWHLCOjFNBaPvfV8LRc/OSw5YGaTsXr252mZ7l8zQ/XTCtoaFvamqrDhXX2eZeBt8Ao/SIUu5ieqgUCSzstnYsORWLfJX1o9Kgi2rFtFJbWLNdq+NmWO78VuAAQCvqWY4vpJZwQAAAABJRU5ErkJggg=='

global.resource.reminder_menu_icon = 'data:image/png;base64,' + 
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAm9JREFUOI2N0klIlFEAwPH/e986M6gzOpOayVRoJUYejBKqS4lLHYLoVBDZdujkIY8J3bPoZIZCCEHXoEPbKbKCFujQXoiag5WOM04647e9DmalIviHB+/w+PE2wbLyfcRV'+
        'qKYBYQi83LvQ0b6UKDq0fNnfxOIk10OlqGi5pm/ef0SraNAQkmDyY6DSbx6Sf9tpH37+YVUg10O1LN83ZO06US1LKhG6DcJEIVH5abxPt9Pkx1qsg49fLQckgLATA9bGsmppzyOYA+UABUSQQRoORtW2UpyfN/3xAWsFMNdLvZ4obZZyFFH4Ct4EMAMqByoL3jcEKbT4'+
        'uu3e6xsHVgDCEE16Ii6EGQUcEAo0DaT3B8mADjK2HnS3eTmgC0PYQnpgVi3ciAgWjqBcoACaAsMAZSOLw00rdqDmgw/B7DRoEQhc8HPg/gQ/A8IBTYBpIiyJjBY3ei+bSpYA0uSxn5kaU/kJQAdnCtxJCLIgCqADlgmWjohETGHZx5cA1klclc+e93989lU+Bb4DziR4'+
        'aQh+geaCbf5BDDCilwpDB+JLnjF02rvr/xg/7g2/zgZT71HOLMqdBTe9MLws4KNUwJxbF++4Yl7v6rrw7yMtlrssymRRyTEZi7XIaHSPVl4Rk7EYwtIJAo/vXxyefm7CKKuhu/viYDgc6VgC/F/2apE0k4nd+obyc7I4emI8ZcpbD+Kk3WJOnTnL/fv36O8f2LMq8H/D'+
        'dxr2dvYWDW6tb9xkmhaBEox+G1eWZdWtCQAoLY0mE/GyR+1trTWjYyna2ttHWlvbduhrBdLpzIht2/ufDD3bWVu7JYiEQy+SyeTMb4VU55rpNi9QAAAAAElFTkSuQmCC'

global.resource.plugin_menu_icon = 'data:image/png;base64,' + 
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChUlEQVR42o2TX0hTURzHf8c7N53NaWYroWJZONB0IiIjsKUvTgpHRG8VPfXSw14qQ2hOzR4yhaSwQIleknooIpKkECVzqYQoBAWJUjiU4f7cu3t3d++5p3Ov29qqQQd+/P7w+37O75xzL4Icq8VrNdU5'+
        'bSMNltbTCDGG9ejXLysBv+epe2k6sw/lArgfV3suNfuGjpU1ACuxsC1uw4OFG4vP3XONOQEneg5bEYMqCAEJ5aHm4yddd9yV5ykgCsvBz/BqZmxCjiuDskgSikKQGJVXsgDtY/aprrYBJy/HAKE82GUohUgiDJzMgSDzgBUJQvEgxGQWImIY3k9MdqcBerMOtfTVzw5f'+
        'eOKISqqI1UxtjkmsBtHipE9gESZHZ/rSAGOFAbX1OpY7O3w1rBzJaubxTsyrNcxBQhFBkHiYerh8CxUdKkBNndU+xDEVtfXV51w17aaUiMc7Is3TXBVy2jQRkJQEfBj+0Y8szt2ugUc9b/YV7wWZnlGAiCYQkoA45oHDYToBnQrTy/SH1zaX2AVzpdG2Oh7wogNnLd7h'+
        'ez3dDEMomZ4dh6gPaSJ1VxWECdaOiTGBl7fXBzfGA9dpqqMmov0dFt9FX9PNOAnvXAbJdCidawAF4MX97yPBj6FrunJ9YWw2tIWMtqJ215D9dYlRh0RJgeLCfMhEEAJZa21DZpV4gcARQe+/Om9VX0Ff7Ci9kl+uP3LUdfBMVZXRkikgGUEqZpAONjkB3nWtnEo9oway'+
        '9zd+stoNdX+J05OQdE2g007f/ebJ/BKZWq9jrqyWNP5rV5IFApDohS6OrvZmAUouV7411ZtaUwJCfvs0JFlTaDH47Kf3z79xDzUz/N9SOVu/AItPaIZBhlrUAAAAAElFTkSuQmCC'

global.resource.update_menu_icon = 'data:image/png;base64,' + 
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZ'+
        'Oixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZz'+
        'OuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1'+
        'XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+h'+
        'sooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1q'+
        'ixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg=='

global.resource.run_menu_icon = 'data:image/png;base64,' + 
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYJJREFUeNpi/P//PwMlgImBQsASGhqKIsDIyKgEpCyAmJcI/WdZ/v79iyzACzTAsqSkpFJUVET716/fDL9+/WQA0X/+/GX4/58RaAEr'+
        'AwsLBwMzMxtDW1tFJsufP3+QbTczNzeP+vLli/aHDx8YQHIwDLIIGW8Bgo0bNz5gYWNjg9uuoKBgXlVV5UWM369evXrc1tb2NMvPnz9htpsGBgb6IrsIFzgJBHfu3DkhLCz8luXHjx8gMT5FRUU7ExMTi9+/f+OPNiYmhoULF+4AWnwGZDnLt2/fQIKWISEhXlDDCNl+'+
        '5ubNm8eBLv4EjkagAfxKSkoOZmZmpr9+/cKrmZWVlWHmzJl7vn//fgKeDoAhbh8dHe3+9etXgrYfOnTo/LVr144BDfj45s0bBpAels+fP5toaWkpsbCw4NX8/v37jz09PUeePn16GKgHEfWcnJyZwDCQIybqgPF/GRhOV4HMd0D8Foi/MQIJLiDmAXmHyOT/D4i/gzQD'+
        '8W/GAc+NAAEGAH6Du6zbRlpcAAAAAElFTkSuQmCC'
		
global.resource.MWM_icon = 'data:image/png;base64,' + 
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXZwQWcAAAAQAAAAEABcxq3DAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAADeElEQVQ4EQXBO0wbZwDA8f93dz77zKsY29BSUZtURCAKNhYEKiGRIBGUbFFUlTlSlmTpkBEk' +
		'VDakoA4sGZqFoVMyAKpolGQIiFSpoFiEV1RIeINtjLHh/Li7r7+fAABQFAXbtrk5MFAfjcXu1geD/ZWGEQK4MM3PB6enr5eXlmbfzs0dqJqGY9sACID2SIStzU3Xw0eP7v0QCj2pTafbyre3Xe5UCgEUfD6uGhtLxz5fPP7ly/izyckXTdevl/5dXka0t7ezsrLiGh4d' +
		'/SVaXT1c+epVedX6Ol9pGpptI00Tu7ycjGmSa2khMziYW8pkfh0dGZmIRCIldXp2Ft0wfrpRVzfunpqqMI6OMMrKUC0LV6GAkJKSrlPyeimenCC3tnR/LNYdaGn5b3hkZFVdWV39tr+7+7fA3Fw4Y9t4Hz/G6esjaxh4V1eRwEZPD8qDByh9feT29/Gurbld0WhobGLi' +
		'Ty3S0XHHf37epi4t4RscJHr/PobHQ6K1ldTCAoV0msDQEG0DA0hgfWuL9OQkwc7Oto5o9I4S8Plu6Ts7ujufR9U0pOMgLYvqcJji7ducdHXxXWcnWBY4Doqi4CoUcO/s6EGf75bmVtWwkkqhCYElBAKQUqIqCrVDQ3jSaSorKpBSgpQIIVCFQCSTGM3NYc2yLGzHQUiJ' +
		'kBKEIJdMkjs/5+umJoLhMGe7u1i2TeDaNQQgAEdKSpaFcp7L7eQrKxGAalkgBKWzM/aeP+cqm8Wxbfanpkh9+oQQAmFZCCkpVlVxfnm5oxwnE2/SwWBRdbvR8nkk4DIMfAsLJN69IxOP45mexuV2g6qi5vNouk66trZ4mEi8UXWP58TX0HAzVCx+Y1xcQFMThVQK78wM' +
		'5vY2xXgc78YG2a4u1EKB/MwMpmHwd0PD8vvl5TEx/vQp84uLP//o9z8bnJ+vCKZSoOsYl5c4joMENCBXVoZq26Rravirtzf7NpF42NvT84d6fHjIP4uLm+WNjaWLcLinplDQa09P8ZRK6FKiS4kqJaqU7IVCzMViuffZ7Njsy5e/7+3uOgKgtbWVVDLpitzoutdQ7XvS' +
		'bJpt3yeTrppcDgGkKyrY9vtLa4YR3z47G19aXHzhDwRLHz+uIgAAPB4PpmkS6eysD9TV3a0sK+v3qmoIITAt63Pm6ur1ydHRbPzDhwOPYVDI5wH4H0Gcl1EwRYMRAAAAAElFTkSuQmCC'

global.resource.MWM_Energy_icon = 'data:image/png;base64,' + 
		'R0lGODlhDQANANU/AEs+IPfHHj0zIPesHveqHmhPIPfCHvfAHi8uIfexHve4HktEIPe9HvfEHve7HveoHvfFHiAiIWhZIPeuHiAgIS8wIdqfHqGBH/fWHvfiHve6HlpWIMyYH/fJHve3HsyXH+nGHr6SH/fbHj05IOmfHoV0H/ezHlpEIFpPIK+hH/fMHve0Hsy0H9q0' +
		'HmhUIKGSH6GWH/fKHvfUHvevHtqqHve5HvfPHvepHvfIHve+Hve2HoV9Hz0xIGhYIEs9IP///yH5BAEAAD8ALAAAAAANAA0AAAZgwJ+wMCDcHg8ST8i0JGaT4okpdCl0K1OiQBXSGA6NggMA+ATCXsNwOIBrng/61+oEIOtDLkRhLhYoMTh3F11CJTY2KhKGPwgYMiAj' +
		'jT8vIiwIlBUZKRGUPzA7n0Iboz9BADs='

global.resource.MWM_ZyngaDog_icon = 'data:image/png;base64,' + 
		'/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBhQSDxEPExIQFBAWEBUVEBAVEhUUDxQVFBcWFBQQFBcXHCYeFxklGRgUHy8gIygpLCwsFR4xQTAqNSYtLCkBCQoKDgwOGg8PGjUiHyApNS8pLiwpKSwpKSkpNCksLykpLCwpKSwpKikpKSktKSk1KSktLCwsLCwsKSks' +
		'LCkpKf/AABEIAGYAZgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQQFBgcDAgj/xAA6EAABAwIBBwoFAwQDAAAAAAABAAIDBBEFBhITITFBUQcUFSIjcYGhsdFCYXKRwTJzwlKCovAzQ2P/xAAaAQABBQEAAAAAAAAAAAAAAAAEAAECAwUG/8QAJREAAgIB' +
		'BAIBBQEAAAAAAAAAAAECAxEEEiExBUFREyIyYYEj/9oADAMBAAIRAxEAPwCh4dhokaSSdttVuAKd9Bt4u8vZdsAZeN31fgKU0SzsHakL0I3i7y9kdBt4u8vZTWiRoksCyQvQjeLvL2R0I3i7y9lNaJGiSwLJC9CN4u8vZHQjeLvL2VuycwA1VQ2G+aLEudvDRtstQwzI' +
		'KkhsdHnuHxP63lsVkKnLkD1GthS8PlmA9CN4ny9kdCN4ny9l9N81Za2a23Cwsm9TgsEgzXxROHzYP9Cs+h+wJeVXuJ82dCN4u8vZHQbeLvL2Ww5ScmsYjfLTlzXgF2jJu0gayBvCzjRqmUHHs0aNTC5ZiVOvpBG6wvsv6oTvH29r/aPykVYTglMmmXjd9f4CmNGo7JVn' +
		'ZP8Ar/iFN6NTXRCT5GujTqvw7RlgPxRNeP7t3kUaNWSvw/T0EFQwXdC0xygbc0G4Pht8VNRyDWW7HH4ZUdGjRp1o06gweV/6YpXDiGOI+9lHBa7IrtjjJDFmUtQZZM7N0ZbqFzc2Wt09QHsa9pu1zQWn5HWsoiyPqXf9Lh3lo9StRw6DMhjj3tY1p8AiasrhmH5DZKSl' +
		'F8jq6LrzdLdXGYR+O43HSxaWS9ic0AfqJPBYs8BznOGwuJHcTdXzlMqgTBDvF3n0H5VLESGteXg3fH17Y7/kp+Ube1H0D1KF1yob2w+hvq5CFZtxXBL5It7J/wC5/FqndGobI5vYv/c/i1WDNU49FFn5M4aNWbIWSUTlrReIjtbnUOBHzUBmLSMncNEMDW267us877nd' +
		'4BXVrLM7W2KNePkdwYTCxxe2KNriblwaL3/Hgna83RdFYMByb7PV0XXm6LpDHq6LrzdF0hFAy/orVLJNz2W8W6vSyreYr7l5T50DH/0v8navWypIahbFhnQaGWaikZWN7cfQ31ckXTK8duP22+rkIVs2oL7UNKGoc0dVzh3FSLMamHxk94BUZTDUu9lHIbGuLXKLTkji' +
		'Mk9ZDE7NLS+7urubrPotm0yynkqor1Esx+CPNHe46/IJ1l7ygujc+jpjZ41SzDa2+1jPn89yMqlthlnMeRqd+q+lWukWTH+UqmpZdC7Pkf8AGI7HM+RN9vyU9hmNR1ETZonBzHbDvHEEbivnWOG+s6ydpO0k7yte5MqHRUOedWkkc8dwAaD9hdPXa5SwV63x0NPSp55L' +
		'vpkmmULhOUUVS+ZkRLtE4Nc63UJP9J3hPaqsbHG+V5DWMaXOcdgA1kojKMVwknhrke6ZGmVOqeU6haNUrnngyN9/8gApzBsXbU08dQ0ENeLgH9Q12sUykmTnTZBbpLCIblPxUxUBzTZ7pWBvgbnyWSnFJXDXI7729FY+VLF3S1gp79nE0auL3C7ifRVUNQN8syOt8Tp9' +
		'lKbXYzq3km5JJ+aEtUEKg0JR5O1KNScWXGlGpWnIvA46id2lcMxjQ7MvYu17O7iklueC2dipqc5eibwqc4dhT6k/80xGjaeJBDD9rn7LPI2lxLnElxJJJ2knWSVauUTGGzVDII3AxRNt1T1c47bdwsFW2tVtssfavQFoKt2bpdy5Esr7k1UvnwmppYydMwERgGzi12sN' +
		'H+QVEspDBcclpZDJFm3Is5rhdpG3vUa57XyEa7Tu6rEe1yixclrnQ1M9O8Oa5zAS1wsQWHZY96sHKZiWjoHR360rgwcbXzneQt4qrYPlNJU4pTSvaxh1s6gIuDfbcm6e8rD7mlb9Zt9gilL/ADeDn7KG9ZDcsN9/woUcAstiyXmFPhUUjv0thc892t1vwskDdy0jLSQw' +
		'4QyIai4RRnutd3oqqXjLD/LQUlXWvbM2qqx088k7v1PeXHx2D7JLJImal7sh5PLNmqtQgooY1QQvVUEJiuXZ2pRqTghcaUak4smyExWY4ZxZDZdbJUJZJKKXQlkWSoSHwSGTZtWU5/8AZvqrHypxa6Z+7rt8dRVbwOobHVQyONmtlaXHgL7VdMvKiCSjvpWF7XB0Ia4E' +
		'uOwi3ddE181tGBrsw1lcscGewus5p3BwJ8CtVykZBU0T86Rgbm57H5w1OAuPayyhuxeHw336uF9ShXZsyg3W6J6iUJp4cRWbF6shjLJVSaMVxyMKsIXqrGtCQNJcnOGe2pdudJEJhoyeA52jnSEJEtzF50jnSRCQtzDna5GQXvZCE6GfPZ0FUl52hCYfcw50jnaEJD7m' +
		'N5ZboQhIpbeT/9k='

global.resource.MWM_PropertyManager_icon = 'data:image/png;base64,' + 
		'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAKzBJREFUeNrsfXmQHNWZ5/cy6z66qk91t1qoJSEJGNsILHxgPG7NzK7Du7NLy8asjz+AiJlYGy8DxE5M7G7EBhA7jtj5YxYzHnuIGXsl' +
		'NsIYA7aFZ5fAE2OrGYNtLAENyDa3WkJIfXf1VVVZVfneft87Ml9mtTCg2+EKpTIrj+rM7/d+3/Xe+5IJIcD+MMbgQvt869sPjmaz6WsLheLwzMzs44CPgP/G8cnGP/+Z6yfO9N+Py/BUPuxCBYRAyGTS1/b3rxsd6O8vrx8cgEQiCY7DpIAQGFioVODoG2+Mz8zM3YeP' +
		'tfdzn7m+8jtAThcADzxYxjsbLRY7ru3p6Rrt6+2BofXrEYRE2z1zzvWank0gMIvwwguHKtMzMzchKPt+B8i7Z0EZbwdBKF7b29MzumHDEHR1dkIqlZT3ae41BMAGggTFpbA4LgL3HT8xCS8cOrT3U7uvvel3gLwDJmCjHi12IAjd3aMXEQhdnZBMJsF13YgAaG0WAkHt' +
		'NwBYYAgFFoGytLwEB595du91pxGU3zpAJAikjgoFVEcEwgbo7urSIDjygem+DAOEJWTDBG7A4ULvD0Gi73LR2/PzCzD+3PN3ff6z19/5O0Da1BGC0I3qaGgIursVExzHaVNHdJuGAb7PjSjA1y3fCD5kDJeAGDAE6G2fgOHw2uuvVyYnp69AUCbOJ0AS58ImFJAJyias' +
		'R5vQJW0CqSPDBFoboRsBA1gCJ6B8X4NEAgaponxz3DCCABE8ZIgGg7b7evrKCMit+FO3n0/OyxkH5H5UR0IYJnQjCKSOyoFNMAAoJpBa8gM2SGHzuF2IgmAErFSV+h0FDA+Alb8ZAUfIQKVU6rjxfAPkjKgsY5g70Dvq7u5CdYRM6AqZYECIGmawmCBCD0mDEFFHll2Q' +
		'4PikunzrvDgjbDui9+N2Bd3hyempKzB4HP+tU1n3a8NM6ohAIO+os9wJ6XQKbYIrAzZjE2wAlAoKvSLbYEe8JauFG+YYgYet3xI8MUWqNfWbEjANnGGJgw4D/ukdeFvjvxUqi2yC9I7QRcX4QLmoOk4gJpBxNiCY2MB4PrZd4BKdKAhK0BAIWgSqiVSSCGwGaGETS3ig' +
		'ppSKMsI3KkyqLwOitlf4Gb7gbQilLdAm3NBNNgGj5c7OMqSQCUkrao56PWsYZ9A2gIe2wr4mdFMtYVtMMACRkG3hm/NaEhQFhg2CUS8MmFbR51dGIvEOVNKOdDp9a29v7+i6vt7y4OAApJIpSCQUE+KxQhioQeB2Cg2EaenyHFCqJ6qWQoHHbYFp6Sbe4EKpJgOkb1RV' +
		'YGMUy2RDoXvUQNDfpe3TqP7PHiD3/v03R9AO7E+lUlCtrsLkpPKI1g/2o3rKByCQIOzALWqYRazlW8dkCw+ZIlmh17bgAy9K2wafG9VkgUbg6L9lhG8CGe1GhLvgPEPj7QDy1a/93Y2FYmHPQP86CYJ5jGNvvgmvvvYa5PM52LZ1K6BLG7iqbd6RzQLj5VhgRGyHUTO2' +
		'8eYxtoC2BzYbAhCMQmJa+Czw6myADEMuKED+BsEYHBzc003C1nCApn4CjXY+n5cP9cwzz0Lfuj647NJLAuMsLPc16g2JSIAWsMbnUbvBRVswx0UcCBFp5yzW9gP3WkT303U1rw4ryytjeNHeCyIO+erX793R3dW1f/3gYNk6Gj5seIF86FazCQ1crnr/ldKdFEHgJlRU' +
		'TWmOlm0LtKdkMcfYAj9QVQocPwaMiNmCyP1HWn0UrFrdg7pXr6yuru7D73d97jR1Xp2VOCSTTt/dv66/LIKHFBH9S3vl4+qbSWDkTZ+nDjwNO99/RUTdRO2ABsT2jCymmMjaj6mpduG3WwBjuIUFTL1eh3oNl4a3DxvGfWeiP+SMMwTZMbJhaGg/BXahro22trXaBJ3X' +
		'bDbARfd3y6ZNEXthIuooMDwSqBmG2CAxDTyz2NjOhPDuAibUawTGPvydR/CSfZ//7JnpLTwrDMlkMrcSGBD4JWJN4UcNpFon0RVeWV2F6ZkZyhVJQEzSr8078qOgmKxtnAnmfxYBQ2h7ptzaGrIAG0MF1/vw9x75/HnOhHcESDabHW3XzdGttUCieIQidOpQmpqeJmCj' +
		'Rts2yjLg44FnFoU6FLjNktCGkT3ykQl1bAAJ6Onphssu2Q4PPvy9vbd86Qu3wwX8SbS7uffuKOTylhDiBl1EWcI0EI4LzGG4VqCUS2WYnZ2FYrEYurJWABf0c7SxLvSQIAIGQKPRQCbUIJfPAvWfUL96qVQKrt+69eIdcIF/1mJIOYkBYKiTo5EtMy0V/5HwCQwHAaCe' +
		'PQLFYQoQjOrh8MQEpHBt2wVb+KGqi343SJHtIQAIwN6eLujZsEEHo6k23U3bjsOGfxsBkao5bJmhrqbvJHDHCJ8YQWA4Kn2iwNHHcN3X2wsrKytyeE6QqjCcsDwD2zyT6+whE7IIJKm+37t0O6qknojTETei5jv+vWFk+DCqrYnfKkACT0YDQYtRS7bQiRUGIGM/5D46' +
		'ht97EZCpqWkolUuW8EN3mYHKfTXQM6NkYBmdgI0XDSEbemTQGbkPK3W/lndDmwP9/bQ5gstpCfb279y2Y9fBl39jav509CGZZ1kTEF8HcjYQMp0uhc3Ud80Ck2ZXCwu+m3Uul1MksxyBJrEAXdNcLgtlBGtoaL0Ewb4xKz0e5MFM8lKt21nS2dkJ5c7yracLEOpaONt9' +
		'JW2AIN3HHvruvsA4S/sQCFzvM2rLYoStvlydAab0Cgl8eXkZI2RPCpM8IpsFtkDjLe1kbDDdveqaIDaVgP/eJZfsuJDV1poM8bz6OBrOHQYMEpQSvm79jhNhh+vGWeQiGArA/v51sv98aP2g7DdZS+j2PnugQxyMcAAcBJkDwiYERcDFF2+mIT534JdTHneVTp59QJy1' +
		'ds4vLIyRMFNojEmY5DGl0bOh7RQuyVRS9oXI73I/LrROqe/yXFxom7LE733PZdJAxwXfLnDepraCziwRHRgXXi8iWWa6p0sv3X4jseRUhVMoscvHdm4fOeeAoODuW1xckg+nloQcQxuAIYUdgpHWwk9pwOQxfa09xsq2B2tt2+eY9L1UTdaoRBsQE2RG+lZwfQkGiRiU' +
		'7jlV4SAjy/EkEQJUPuuA3HLzF8ZPTE6OK6FrANKpgBkpzQgSejqVkOek5XlpCQKBZ/rT3yrnEweGc5OyX4MREB0uaic7zVgtwyTqSr5q5/tHvvr1e0ffgUc10p55QJ2eCGMbzZYdZx0Q+lQqlXuWlpYDNWVUEQFDS9qoJ1RnKc0Q0537VkI/GRCBYdYCV6SyruE8oqK4' +
		'ASEYOBdmlemSLZuHYXBgYA+qrrfbotsEnciwHdmsGLZydmSbKucEEPRS9r4+cXjCth1KFSXUIsFISTaYQdBxtRS3DVEQuGWg4/YBAqAUALExvOa3gp7GNUay4L4PffAD5Wzu7akujIkmkCURRpGTiB76xwyDEg6MjBx8afycAEKfEycm76KsrW0zSC3RYtTSyVxV4ynZ' +
		'XlOUJe1Gum3IqGjvixc82kVsRqLY43klY3BfLpuFD1511Siqrjt/Y2AGYqKjA26wg0KBj4aPOjK2c9swkv/ubP4cGXWbJePPPz8m1ZRWS2TgKeaIB20nsw+hkW5nQLwbwWaFPecj+H3zO9xWT3q/sTOCR4AcHBiEnVdeeQeNDXirZ6WInIa8Hty1bVgzZjhVcCCZpudk' +
		'hzvKbIffgrFzCgh9FuYrt7/wwqG2mUprdcrYqQ2bCXb8cDJm2Maa20NGY3NAwuM8UGe+PZDOZoo+7+ItW2Dz5k1kT3b8BpqMo5q6Qxl08bFE3oFsEd3fooB8+ewMGfqNgCBLxn/+1IG75ubn39JVjaupUJj8JK5uaB/MYq4Jwj4ugqyvzapg+oHpQdYDGQLW6W1fDy8i' +
		'1rx3aANsGRwYQ6acFJRWS1QK3exG9KZuQ0VwoxzMkXOg1M0gXXBO0k8acYlvPOOAaFDufPxfnhj3vMaaGdd4S+daUoJHB1GHoPDo+ZZKMkyzVVWgnqyhp4p5fvD3/MgIePO3NNh4zMllYcP0dGkLFz9BpqwpuHrdGU8kGRSL4u5MDsqJcgKSCEim5EDL43icvZXbfDf+' +
		'1eGzAgh9jh8/ftPPn/pFJZ7eiEfVJscUAhEH7CSGGiAYIhSCY50PIkwo6lEqEBsVr36zpbuIrbFduDjZHHT98R/DhrRb2Hro0J57v/w/b17jMRfpubqGXCh2oWhyCEAShVRw2jrTLCDKP7162/fRrJKH9pWzBsgtX/ri+AuHfnn7yy+/sqZ7GrcPRilHjTNvV2mmRXPL' +
		'feWm1YvIyBVlL8zId3uKgW8NxrZ+3+cBS309uKJjZBcM9afgff/8na/df8NNP4l5Wpf7TYB0jytZAejnQimBO5Q3yWKxCrnC2Yx4Nl+EUWyid6FjcMoxyjueH4I6+O7rP33dbTTKPQzUYo8VC/IiNscavBb2p7M1clMm8raOG5Wmt0UAevwYBKCoxGO7J7h691+A98LT' +
		'UGl0NDzf+au0V3kGd+/ZsMUp54YS6jeGUsBqPoaCHBqTLTj+mg+NBvsK/tLjeO61pRLcmO9gsDDDxz70xCu7Tkd/yLuasPPNPfft/w+fvm6E3GAlZN3fsUYkboQUUXFGnTEIRh/KfhhuC9C60eB3lLoKR6aINkMuQJxEVSpwzX0s7h+DzD9+GVzUNcvzAqpVJITLoHcD' +
		'g+wAAoK2AzanAZp44ZsN8I40YGmKwxJygHqQO7oA8t0uLBzj6InCLgwYx04HIM67ubhare1+9LEfTpjuXljDheXxtT3Mx+wzY3xJpfg8iDNMi1cqR01f84NRjH5gqLml7uID8XhMBYZjjtW5bk8PLEyhNupwoGfYhf6NDnT2oUB0h4ToRTc/76L0HaAAMYlqK4u2ZN2Q' +
		'A314bnFdAjiqt+UlGD9VMN6VDYl5XZWp6endTzz500owFDRmXIUVSdsTMcEMmrM8q5BJ3Ar6TKCnDLUQfiSPFRkNH5trCMH4YD3sSPCAmWZEfQ1jK89j4C0JcFHQ2XUuFHCR7q2jNAUrJlSPETLHQe8r3+1Aoc+FFIGF5yzN+NBsiUfOeAfV2wLl5i+M/83X/u723t6e' +
		'PRdv2RyxDyLoXuVt3paZcGkHjlLQPKZm7JjF/HaQkjc2RrMO4ukYeyo1tzq0VJC6cuAArH7vm4CeMLKQRlbgsbILLEt6E69H4TsJvMkcMsTD/bgtEChGP4G7GF7TqCKoq/Inqc+kjCypGK+LEpV67MCIXl+O+zC0ZI/g9j40/hOnzai3G/l77949+u9uK5fLegKMFogZ' +
		'Z2vHIQARgEzKA7TAFFaxuMQCwh7VGBnlqEfELO5/HJpTk8ByOUht2iSvT23cCN7EhDzeeP0w1H/+U2i9+owEo4Qt3k1iFN6dQIHj/RZR2ggGQ/UEuM/ZUQSx0ATxIhqYmaYEA+r4S4s+1Kd9qC0LWK6EvZZuQiYkVW9jxgxCh0qtCnsbTbjnrYA4JaMe/3zjf+/d/8nd' +
		'145QP4TdUgOjzUIvKYjAwWYCBKkQI1zDGG4Z5Uj/h8UGYUYq6cTi6sFfgHjhp+A/+SiqH/qtMO1BAktlQOaoEmkVgTNUSQLdXGkz+pSHBcMZcDZm1d97ahFEXWes38DgeBnVYQ2FXQ+Tp6TmHA0GadfKlF9ZWYR7mk32FcOeM+ZlreEKl/v6+p79xMf/9bBp6RC0ZhYw' +
		'gUFYoScEwjc4hIBJIbNAlcU9J8OQYJKOHuNl2wo53HS1CtVHHoT0gQeho89V3iCqHxphaYRHjAAERpDdGED3KYXfCy44V3YoptA9LyJLnlmWHpeYb0lAWEvftCUvvoSsmfNh5rgg9/h2BOIrZ8XtPQkoO7Zv377/AzvfXzbsMEIC8Rbdt0YlmX16O1BLNmtEmNsC67uw' +
		'oveou4wm4MgRWPir/wGdiRNQwOg70+1Il5ZlHGUX6EalvXAUOENpyQyWdSVIUib0CFV0Bo7WQcwgQ6o87MiZQ4cDAaJ9Pi7cA1RlGLcgg5p4KqqsMTx1wmuwI3hPY/j3Kmv1qZx2QOhDM66uufrDe4aHhy1XGML8lQkaLcZEu2nDZKEBQk7YpAF1GlgDjDdxBBmwKrcT' +
		'KWyRvz4kj2cLKJg3XiOpoN5/FVy/BqksA7fDhQQabqD58knFAlJRIonPXMb/so5aI1CSJUlHelcqQMJ7pXikwZXq8lDwcyhtD/chUFDD/au+inFwDcgUMvyCGEUgIZt8dBxq6NG1cN1A0FoNGK97bALPeA6fb9/HDrw4fkpe1lqfP/vSF/d+9ev3Xp7NZm+jYaRR/c/b' +
		'gj1uM4iBxYDQhZZgAI9NJFWpkOUf/Qi8J/4vBnTYwHMoyzxINZPBeC6JIDgZMtDKUAtcCRQgy2tAUEiihWAnXWVDMo7uOWzPWZlBfnZTJQZBtakAqrSArXLJFI5rEr63yKHpyXseb3l4RhPGHQcWl5cZugFiXHtfE8bQi9PlZa31+Ydv7tn/r/7oD0cQGKliA7vBleRN' +
		'K+fcHqgQMkdYqges6Nu2H8bbIjuxeuAgeE/9DFrP/QQyGdnLJw13Cm1yIqVcWIojGMrQTSl7IdUW3dz6pFJZxJDhLDg9yo6Q68t09QmgNoPsgCbe1xLakDc89LRakjmw0JJeF0Ph+6SqVjjMvknzVdhevArtyNvLb50RlWW5wuXu7q5nP3rNR4YT0vMy6RII9HzYJwLR' +
		'lAqcZJgQt4GB4FybUbxalTaj8ctfQvPAzwAmX4OOkoBc0YEUMihVUEJmJWUf5JMiMAJZ5ZD6Iru/NQfOYFqCpM5Rw5BgBVv/ixh4TDelSiKbIWrKM/SJeQQaV+qNEp+NVSG1Jl67r7oKjzcaMDbyFuOEzyggxshv2bx5/44dl5eNegoSgbEEpLDtgxU4hkGgOOlAuTh4' +
		'3osvQe2h70Di2LNQ7mYyNiCGJDMs0m0g2YL73ayyGQI9Lacnie4velhXdUhADEP4LKqml1aRBag80e1lyIImqqY6qqUVVEBeHSquI8bcJHsuOiNWbXoezW2Rj1ghe4FGfeKsA6JBGb38fe/7/iYK0iIG3R4wLdpsB8QCSJtBEdc2Fhguf+974E8cRi9pEyQSHFotUkWo' +
		'hi7aCHxmBpdpbNVVcJ//OaS8acgXGToBTKbaGaVM8rgMpcDZhsaoQzsA1OLHl6XNAbIXUwjOPLq3FQ5zJzglJSny3n2qsjorgJhI/pprrg7S9XH11GbEGbOSkNDm9p68Pz5kWHCNxbIgZa//nrdnD7jP/hj6hxCUTkfms0iVkdvLMChkFLXTJfMIwEQdgOIPUmOougAZ' +
		'4mG8MXuMA5ow6ge583QB4sAZ/tCcv18cODhWrdaCuYZBRQdrTnqYAdbHYt23prBApIZiJKHJ24qUxZOQQXEaAv7DHw7UpmyDZNgzjtI2lM867gGfaigjTmCQ3cCYg/JZDA2+S1F+VkYxl5/VQQ6n49PwGruffuaZibAr1hrGw0UkZR6vlRik1cVaIIjgmG9VAgqrkKpi' +
		'BL7fUrOBffMdDfTRN9A91h4YxR205FURHVJNAu0GUGzRVMZaICsas3gtMgN85b3lijQrAEb379w2fEEBQun6hYXK7l//+kWri9UqtWHXPYlVdIgD0cYOA6RvDb72uVUnS1jMsOa/738MCmWAdFExQ1IjrYJB/kpVqiVGAV8DQUGXt4kg1TGwm3ndh9XjLQlSMkdDhOQj' +
		'3nhBAWKGE71+eOJ2mi6tBCYiaslWY/bghQhTdAdVqO600C1wwr4RPdDBt2pxaR3lP/ooFPg0ZKmFp1SgKN1bjC34MQ/YnFJPQqopVYkOuOyqxbCjB97IvB8mX1WgEEswML1Vp90vHEA0KF859Ktf7avWarFCZTyivuzCAkExTMHDoT5+VK35dvEBXVvFt1kUzGnE1ZvH' +
		'Ib3/YejoYpDCqL2B8UTFH4ZjzzOY/XEVmq8q/5SieEG9mMgOJlSCtAEYo/y3u8D905th5da/hgl3h8xXFTuAwLjtggNE2RPvpl/9+sWK3frNiBMeGZXCwR44HdgGezSjxQ5u7EPLb2OEKdkkaugt/cM90NnDoDpwCRy9+hY48iffgNnR/wKrf/bXsLCSxesJDAQPo27A' +
		'RXpVvvqdVt8mYNmMikq7OmHl0zfAy4lL/zv+2YrD2B2nw5acdUBu+dIXK3Pzcze9cexYxGhHWrhlxOO1UKR98dV+n4eGOj4iUo/PtcZT4fX/Zy+Izj6Y+fR/heXP/gU0t74P9KwHKejWzl0y/wQ1NdJFDnDA77zGY8mtsLDNJx/Z95dLS7AJ//QY7r3jggNEJyH3HTly' +
		'ZB/NxjUzoUS8H5yHxSw5F8HgNxErjiysWlqRuiixEiAcVRX8wR+Be+ufA2y+OMIcMEURcjkZ2VNycGWmJbt2fQTDq+guAWt0jYzAG56MuGk8Fkbfu/DokVO1JQk4Rx+v0bj92JtvjtKUaLCyuEFwJ2IBnh0Yxjqt4sI1m5HKQesH8WGZdW685B/l7nOyJ5EGPsiKqFWV' +
		'ua1WBBR7HAmWOZsaDXqOkQI3CMqdFyRDNEsmJien9hJLuB7qE0w1sFzUsNJoWEVOWCkWFooTwj7K2NjjSIkpk3GOVjSS21U06mhmVpAR89PIDlRZrRo6WjOontANTiRNeRF0AOZm6bJ7TrdczglDvvXAg6P4+Ne6bmKU3lRAJQQhUjRTxHoIeSQ9YnNBtDEEAhUUG09p' +
		'HQ0BCs6TY69UB9LSIsguZF4XCATuu/oTsPLKGPq42hZh45ibn997JubCnzVA7n/gwRGU6Q35fG40l8uVixhRZTJpeOXVV6GzXI6MKoknE4Mcm4gqmrcqGcWsM0SbbRERYM1Bd/IILM4jANs+AALtSWP2cWghS5LXXQcr/5SDzMsHYKXu0cDz8VardUbKQCXOMAg7CIRi' +
		'R3G0kM8Plzo6qBaXnJuYTqXlmlTW6mpVzvCNzIbShpNZHVrMqjkaZUv7uHRhMYVFYIpOubM/rUodWsVhSPzHL4BA5nr3jkF98DJ5hf+REeA/fhgb0Ct34Y6vUPbhggDkW99+cAc+6w2lUnm01FEcptIaEgQEgAqapfX0OFdXgqDtH+1/XJaZVcN+eCB0M36XrVnaT8SU' +
		'Ulg6yi4tFWdCFGBboeH/rx8C5z//pTqvqwuaThYahW6aawmLi4t7t7ZSg7fc/IU7z2QjTpxOJlAR/nKpPExVG6iwjARAV3gwZcjt11OQkSawEkk3ACIuPNM5Eo0o1hL2WhXwxBqMidcA08cWFsC/+t9AEr0x+k4Fo51SX6u2MP0kGvA/xZ2H67nOP//uZz73yWPXXHM8' +
		'mUxm8f7HEaCF0wnIu+oPMUX48Wku7+vtHUUbMEylmKiospm/bhfjly3fKpthv46Clqd+cVCVK7fvQYR1uqANjFD9sJhtaFNNbTyAWGFlPRRpbh58ZO9SowEzs7Pjnuf9/ZUPf/0P58sXH525dvdTmXRma97zODtxfH3yiiuPt/xWa3py6kS1Vn0Ag93G6eoPebcMIVV0' +
		'x84rrximij72e0FsAHz9FhyjiiIv6uJhxrcDbcvM3ByVpoVwxAOLNPqoQQbd0uNBIERsSrxMYeCZmdGGekxXdXUVFuq1xYXjxx/Fe3qiq9w5n8/lhusD23uSW9+7ePHmzRejZ8Vdx+Vsy5ajGKQKhzHyyXsnjhy5Cn/iyXOqsj7/2evHn3jyZxN9fb3D8Slt9uxXe+qa' +
		'6amLvBdKxxhUmIDAs13ZuIvKTtLqAyi0gMNSgeykDJE5NWRCZaFCFSueajQbz3Z1dR8Y6O8fKpVLnXhFZyabFfXleh7ZjiE7azrMwXYkPxx/k7Z5R6kkOjs7N55zQAwA6PpF3VUejSOC6Wgi9rYbn0cytVRRDgSctEzy2nXa7TrCLBa1M4C2Ep5Mgk61u9BAv4me3ZMd' +
		'pY5n+wf6k4VCgcbA96Oda+I5nDFHoPfHobNnil162RG8b0+3E9K7ChBa44MhYJl7/vbr2Vv/0821cwpI3atLQLg1IcbMF4/nn/xIat28XCV8s0GDZvfG5M3eIm6IGnMWA0y0mfilpSUCYWVlZfUACv8ptHcrQ0NpnkwkaWRJk9NNMMraq6lCoFnglArzTnd3RQ3XJjAY' +
		'F3qwj+ajn81kEUA5keHcAjI9Pft4o9kcsQvu+7qIvl1G3H7jTdB34XPrhSy+jENYzKW181LtZZXbgYp4TBqE5WWEoLp6CFvxoYF16w6vH1wvUD0qpYrNnssb1a1e/hDjhgXUcZstOdXa5KTr9PdX9X6f6WNCr92E65/Otyy8e7eXwcTs7Byg8dOvIPIjFayN3TApc3u/' +
		'6eUzb8GZn5+HdfJ1GFFFtVbwtvathCAsIQ9WllcOYbzzwsDAwOGBZD9PJZNS+gQANhStciQLhG7xSgXRwpR9kOfUqrhFCRRR06rKF6QSHOarAUKqewaPLZ9zQPCGxmZm5sDtd/Ubb0LVFLz7yQLCBiPoptUDqeOeUGCqY4WUo+pMMUIxYRmQCy+gt/dCT0/PK2icqwgC' +
		'l1YY/4ivXlYlATCt36wNOGJyKsv6162SgJlmikOzCKcnXRgcqBFY/tGj9PYa3xneuGLYsrq6wjFqb55zQOhVD9/b949j6P6OGJXUotEddreq7EzyrRlR0UQfCXuhsgDFYkfoHVk5KxZLBBo4JAgry6SRnkc78Fpvb8/r/f0DqxiEShbg3+ctMs7qIhqWLlRLDmyBr+d3' +
		'+UyDw49MdKFqmmayB10BlfLmcs3FqSS6WVXZfh579IPOJz/1L3htTcixJ4hYq+WdN5F6vV677/iJEyMdxWLwjo9AXYE9lzweQzCdNfVhEYU7vHFjyAYh1og9kAnIAlyWV1dWn0M7cAhZ8Nq6detEOp3m5BkRF7BBGBC04JUqUkZaq5gIQ9Q+eX5X14z/0ktpZ/u2OXkM' +
		'jXyCpnQePYJuMKv5r76ad5dmy6yntxLaEvCrq9Xl8wYQZMneBx767g0YMI2YDqEgyrb6HLRTbJXZV67vkaNHYePGi9auLITHiQkrqyvHlpaWn09n0q8PDgxM9Pet47jNyTMiLqCnZ7mjJEhGAISC1sOgRbitx5AwX850EPpYZ2cz/eRj721u335MOvBT00k8tJqqz3XU' +
		'lpea7g9/cEUm56/WJVsU07AV+PV6fem8ymX5LX/31Mz04d7unrJMlYh4lBBVOTYYAwP9qgiaPpPePUKMweVQtVp9PZ/PP93X07Pc39/Ps9ks91stKTwCgYQbF7ZUQQICF1WPmfcNWGY7WETw3Wc9PZzNHO8U1RUPcvkmf/PNcjLDV1qrTKz+7T2f6OhqcY8VXiUDb/4u' +
		'ug+0XjivAKEXpXzrgQevmJ2f+365VNpBpQBFfECACOGo1z2Ym5uDgcEBWd+dACC3F43jD2r1+kSxUHypu6sredHQkE/1HI3ubxEYIlQ1JlATUn1E3VWyEcZ7YsqG0LW+5V0p8KzrpWFP5Y6lfvjQlubuG591XvrVxkSXWMnkOM8VOM8XfeEttGgiNHldnFInMzMzrVu+' +
		'9EVxXgEiQUEDj6Dsmp6ZuS2fy9+ayWTKWXp3iNWPQawgIOhlL5SEnJudJZvwRKvZeqxYLDxd7OjYetFFG5voruKzMk+NABJGwFqATBhBWsAE5xiVZLHAl8ZXyDe+MDQ4Lea4LWHZEAMmrX2fzXe1jnVNPvJId3pqogvK/lIi5fNiSQhkC3UnknflqVSd4OhVRMAY27lt' +
		'YOTgyyfOi/4QBIWMHfUV3Hn/Aw+O4p1+DKPYHUZt1ao1CUYikaggIw6ji/piuaOU7O7uarmuO4zBm8eV8ZWOkhKmNC7SEzJqgunWr+wFCVsLn2nBKwFboClbIVJp0XriyV5nw9CCu2lzTas6Xxs8CWKD5U+4zqybf2N8o5v0a8k8it33hVug5IkQ3lKrikrZo9+eW1gQ' +
		't94SpkvGdm6/BO+redoZQi362995KIyKRZv2sXN50aBar3P5/D56Exq9ByqTyUpDn8tTAOmvq3veCN540WFpp9zV6bmJBAZuKSQQtk9UA6RbjJoBoY2v0v9GJZlW7YNtL4RmgwZLBAzQILkOT/z+Rw+Lf/6nnubBg33J3bsnWCLpR1Qd54uMN4udGKP6NfTYUGMyFwFJ' +
		't3iDYvU6J4ZQ3QcxNT0lJ1bv37mNZVLwnkZL5PEXnjojo06s+mF2b1GIjVUAn0XfUhcUo4FwJU9Dp+iDxULh492dXfm+3t5WJpupT01O1Y4de7M2Nz9PLa1OREJhk89fQ1xoX1XliIJt/V16OjUdQdN2VRvbGoJaA1rUeTXzW/IYLs7IrqPF9EqDfeOr21qP/r8cXueB' +
		'XJjHZqcZr7eW0kVvMZtvLjHWWmJ5XFzcbnpL4K1QA2mO/P416H80mghGLpsRl+cKkMVm8Mqugy+fsj1ha7mc9z/wUHtewhAgfMFOW1FI4/GSjUAvSQKYSad70JP6CAZ/xVQyQX4xp9AZ91H85qMh57Nzc7xUKvFSsSNgAwtjBN9q8ZbdiG7HDDWPu8IiKBWhHILiA/9r' +
		'2F9cSdWWnWYr1zkLnV119uvnBtdv8pzsOs4dSj8MJbB5+ILNt4R3oqnqZTVZpZnpXE7VF1DjQpHqZVVmRP2DT7z86hnsoDJ5JAh77mIA2AwRMbVmNBkK/qJMNvuBYp5qVoCyEeRqKtVEgvJz2Rzv63E4skQDYqLpAAgfrCmVlvADENSfEz5YYASeEwAPCjAqgGTXTKVa' +
		'Pt6fnu4qpH1RnZrJ1E5AJuG0Vh2vJRIe3iVNxikkAWhaddWX8w0LHQ4sLoh01l3KlNYzUehxa/Nv+FCtw/Ez62UZMNgaFFmDEYxBDDAZAq7vX9dPb5huoTwatmdjEnXSsGIMhvbFX1xa5LV6jaMjEBhtET0/COpCOyEsd5eZ8grWPhCWSyzCNTnB/urSG9Xk4JamKPT7' +
		'giZxtjwBCYcCWWRGX1IVFqDZtlTsIa3mI4ruYqLkrLRSOVeOnF9eBI6qqnZGAWFr2+o2WyFijAjekCT4QE939xXoOTW5KtoeSV0YQ41qy2eoulCV8Z7uHp8ACYM44HZAZzqFbABYoN6YrMyFrFYltnQPjQRDZmMCdSUXtAEC9X/eQ4XUmEeHY9AFl0oxNXTdFFNSo5gA' +
		'0WjIwgI0jS3X7UDeRTOWSUiglmYoY834GY9DhLANNz6a6R5l0WNxZkgFzf0etBvvQWZUrWxqkMrAIEOqLHR1KS1Oaz+BgFBGVgMijzMR5pxsFaVbuB2hmxR6UF05fHOW9LAkANF4YXuGXFQM/lGtOkG9LMjqqxKqSA2QpvWoiJlHfiEcKVyW2bT6qzo1rSa6C/WqFIZL' +
		'npYx6LQNspapFFNavwKQbLXQ2ebqyMGX+DtjSGR8AbNKX1gGfS1bAuB2d3VvLxQKVdX7IyuMSXeWHC034UogkghAIpHkSfzuOC5uu36j0eDqPND9EWEPHTOqh8ljQjNI2GDQ8daX78yw5QXmNJa5jgnIdrVQSEmdU0vqW2/lsuCXupEZeo9UoAVHVXBIkf3AS0uu4l5X' +
		'kn4dNjkvNWRZjhrVLuGQR5uiK7Imfnr1Nln6ydUVqtIZlX9tIsFqVZ5EZ6D2VkD8RoYEoNgDyjUogsV67/T+TCa9o5DLeZT3YzqOQIFLIBISiCQJH0FJ+Ak3IbcdVwLCazVkB3OEHUcwbYR1nCB0NC5bP01z17wVH/voR8ytyBpvT3xoaypfYC5CV6fTuQ9NfbdNqotC' +
		'JTfcJBUToOoOan6hrNpAqqpbVyTtTwHLICD9eMHROjzc/SeJTznfaMl6WVQYDRnjoNOY71TCcEitJbTz0xKwOM3ZyqLIeA2o7Tr4SuMUjbploK1YRMRfQRhRX6y/q6tLGm/GHE6jNNwkgpBISJVEQ2i0igpAIFDQjgg67nkNnk2njJ2IqBwBQZlqQeyn5fevufqkD3XN' +
		'z5UAkBmQzUCm2MnqRaqXRd6jrtDAXP1Yul6WrPxT1uIouqp4WUoN7Puhc6v7qdTdLRlm5h2pOF0qx1GKvQlimUOV5q8fF4BApN+NsU+cxOtdO/6AqB2xe8CLxWIJhV0jAZNdMMKXrJAgYKQsgUngcYeAksDgNn5P8KXlJZFwkzwISZX6kmqJ6Te8yMF0VErWeXt92CgQ' +
		'AqVZOyGcltfiVC8r24O/QYVn0qpEk+wWcLW9SOF+KhxwUUYVo3HVNOmPf/Q+H2plEEfqqq4WlWBiSmGG9bLUTGAq4UHVTRs1UT+4axvVy0pSp2/dk+KSzgzel//Oc1mWEV97kIFt2EV/d3dnjexCQrb+hGz9bsKhbQJIgqP3SQCQIYLsB3mZeJ1YWVnlneWykGqL/AhH' +
		'vwuXqSL4zFHCoTHB9NdR0KQk5Mk9vQy8upCpjK4BF7waBp4uE9TD5CSYL+tlYat3y7roDE1/JgCwtTspVb2aUc2TclIWNpOlYR1VfObhH+xOfvrffr8pqKrQxoxUZXIeO1V4qPuq+lxdzUWkG3DR+0pRdSBpxWQOoUmFNn2PQ22RXqos4GkECp031/NQrcq/RCpVgnVy' +
		'lRVJY61RRMqqYwmdnV0M44c6sYEYktTsSGDrd1D42niLhGQFAoKurly7Lo0A1MPPQArdvPBYrpgTjAeWt+HoGCecQ0B7vIU51OV5aFKcQLEERm6QRI1DJZlAG2lZ6YcsSVZXkKN+LRJYQjMu61qqWWWof/DY9c51//7BpvTljBDMg2cUU4QER9XLoopBPtXLwntoLFFc' +
		'Iz0Ut1UHp9VCpYg/sbKiakXoETMtZAu3Zf3/BRgAUCsL+UdvDUQAAAAASUVORK5CYII='

global.resource.MWM_quest_icon_zombie_icon = 'data:image/png;base64,' + 
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlk' +
		'Ij8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9y' +
		'Zy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1s' +
		'bnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDMzRTBCNkVFNkIzMTFFMDkz' +
		'MDFDRUQxQzREMkQwQzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDMzRTBCNkZFNkIzMTFFMDkzMDFDRUQxQzREMkQwQzQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMzNFMEI2Q0U2QjMxMUUwOTMwMUNFRDFDNEQy' +
		'RDBDNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMzNFMEI2REU2QjMxMUUwOTMwMUNFRDFDNEQyRDBDNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmQu8ysAAASqSURBVHjatFddaBxV' +
		'FD4zO7uTbLK7+an5s01X/HnQRoMPlmqSLqGGShW2SYnBgg2pCqLgIlppXmJfIogQNFb7opsHEYqQKDWtVTFbtK34YJJS1Cc321j/qtnN/2azu9fvTGZCUrK7s7P1wGHu3HvmnO/83HPvkBCCcvAxcBj8OthrQv4e8ID+zTET8kQmhMJer1f09fWJcJj1iiDYt4VcJ3iM' +
		'ZQKBgOBvdCAFg/CNjY1Bita5u7tb8NwGTzlC4ZGREeHz+TbJ6qC9hYIIDAwMbFJsMHvKaxwhHm8lo4P1FQoiyJ5vZcAMM0A9UlntyJSdGicmJsgqTU5O8uOBnII5UFqOgpEyM8WZV1Fa4Wg0ykDKrKajoFQYpOtozCaTDcTOSCRSMIhQKMQPXz41YXRHjW7e91bY7/eL' +
		'DTSmN7WMNeHnhpNpz98KZqfGx8cZTGO2wtQiEQwGbykY1sUOmonEJjDToZA4ZLMJJ0mWjW+TJPG0TTFSkfEwUzKUyg8SSfSoTaFWu0zfpFJ0LrlKi1rbyE1VskyH7A7aLcm0ItLG9JuZ5CWxteKylVgs+lFNHRVBYZFso6Qk0VkAGV5ZpoUMYEoh064W0wEAUGA8ngbD' +
		'gZ74kmYrXxDaxhkqLtFAzEN5vc1OKsCsYjy4vEBn1hRr5ILHhyHbAQB2ZGIlnaIIALuhOo7xkeXFrCCUrE0En9lg9EwiQddEnA7AyMGiEup3ldPLpWV0cnGO3AD5QombVFozOAyDHwLkk44iakI66/a2aO0im51sIEK1LS2+2e8u0T6E96WleZqEd0PxRXqxxENdThe9' +
		'U16lCf6TWqVTC7M0jLXfEX7t1FLsHGZSPWX8GrPaMS9UNzdrgzttNqqW10TZSO/cDDX+PU2/pZL0fSJOTTeu07uIykYAhvz2Jx7nx2dWQVQ5PB5kWBDX9yvFpZsWe5GSX1cTVITxPqRpY3G+Ctk0bz+8l9/foOnKBiLj7kjEZqMf19ZRsb47mKNYmIHqnfC0QlZo/79/' +
		'0u3I+ycVVXQ1sUIzqIkKNizR+s5Qdmyn9l9+msL0HflGwjsfmaIyeNF2+SLJbjclARbNhxpgtBKFPogaYPg/JxMURCq8SNkurLEMy6owvveLUVqKRTWnrESC6Tnw8+Cpi11P+W+MnqVvUQOPoertiE4YXtbBMNMcvOYGFcXcjwD1IKJ29/HX6N7e42/oOt7nDFoBYVBb' +
		'9MqV81893ETDqIEQdsgj2C13wetaeQ3EH0jDBOYvYb3TodJ+pMt/fZrsHk8Nlv8q9Hpn8Pjnu/eID5yl4jZJznhW3Iez5rTTJS50dvFZMWJSd86L7nrP2NbcRArCHlDVLQWcqIVn7SrFRYpcDbu0e67Zi49ZEJHi+h0wkKYa+HwU6biZeM6ltew0OevreWrK9PXLZMhU' +
		'Du9oR4c4aXeIUw5V7JFt62k4oti1OV77+ugzxq+iWd2mQTC3MZDzPT1iQFHE2zB8EEAOow54zHOXT5wwADz0f4EgXXnw6tCQGKysFG8BADOPr+ESBHoPXJ2nzrxBGNw/i5/d062t4tP2dhFf+7fot6jLVJ/IRJ16I4rpzehLq4r+E2AAbGMsPMhmhMQAAAAASUVORK5C' +
		'YII='

// ==Script==
// @id        URLShortening.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==
/**
 * @namespace
 */
var URLShortening = {
        
    toArray: function(id) {
        var oArray = new Object();
        if (Util.isSet(URLShortening[id])) {
            Util.each(URLShortening[id], function(id, api) {
                oArray[id] = api.name;
            });
        }
        return oArray;
    },
    /**
     * Shortening Services.
     * name: the name for this api. 
     * url: the short service url. The long url will be added to the end.
     * format: json, jsonp, text
     * parser: function to parse the response object, return false if not success.
     * login: use name for the user name string and key for the user key string.
     */
    shortURL: {
        
        'bitly': {
            name: 'bit.ly',
            url: 'http://api.bit.ly/v3/shorten?callback=?&format=json&longUrl=',
            format: 'jsonp',
            description: '<span style="color:green;">Work with any browser.</span>',
            login: {
                name: 'login',
                key: 'apiKey'
            },
            parser: function(data){
                if (data.status_code === 200) {
                    return data.data.url;
                }
                return false;
            }
        },        
        'JSON-TinyUrl': {
            name: '[JSON] TinyUrl',
            url: 'http://json-tinyurl.appspot.com/?callback=?&url=',
            format: 'jsonp',
            description: '<span style="color:green;">Work with any browser.</span>',
            parser: function(data){
                if (data.ok) {
                    return data.tinyurl;
                }
                return false;
            }
            
        },        
        'TinyUrl': {
            name: 'TinyUrl',
            url: 'http://tinyurl.com/api-create.php?url=',
            description: '<span style="color:yellow;">Need cross domain capabilities to work.</span>',
            format: 'text',
            parser: function(data){
                return Util.doRgx(/http:\/\/tinyurl\.com\/[\w\d]+/,data).$0;
            }
        },        
        'Google': {
            name: 'Google URL Shortener',
            url: 'http://goo.gl/api/shorten?security_token=&url=',
            format: 'json',
            description: '<span style="color:yellow;">Need cross domain capabilities to work.</span>',
            parser: function(data){
                if (data.short_url) {
                    return data.short_url;
                }
                return false;
            }
        },        
        'IsGD': {
            name: 'is.gd',
            url: 'http://is.gd/create.php?opt=0&shorturl=&url=',
            format: 'text',
            description: '<span style="color:yellow;">Need cross domain capabilities to work.</span>',
            parser: function(data){
                if (typeof($) !== 'undefined') {
                    return h$(data).find('#short_url').val();
                }
                else {
                    return Util.doRgx(/value="(http:\/\/is\.gd\/[0-9a-zA-Z]+)"/, data).$1;
                }
            }
            
        }
        
    },
    /**
     * Unshortening Services.
     * url: the unshort service url. The short url will be added to the end.
     * format: json, jsonp, text
     * parser: function to parse the response object, return false if not success.
     */
    unshortURL: {
    
        'unshort.me': {
            name: 'unshort.me',
            url: 'http://unshort.me/index.php?r=',
            format: 'text',
            description: '<span style="color:yellow;">Need cross domain capabilities to work.</span>',
            parser: function(data){
                if (typeof($) !== 'undefined') {
                    return h$(data).find('.result a').attr('href');
                }
                else {
                    return Util.doRgx(/class="result".*?href="(.+?)"/, data).$1;
                }
            }
            
        },
    
        'LongURL': {
            name: 'LongURL',
            url: 'http://longurl.org/expand?url=',
            format: 'text',
            description: '<span style="color:yellow;">Need cross domain capabilities to work.</span>',
            parser: function(data){
                if (typeof($) !== 'undefined') {
                    return h$(data).find('#content dl:first > dd:last a').attr('href');
                }
                else {
                    return false;
                }
            }
            
        },
    
        'JSON-LongURL': {
            name: '[JSON] LongURL',
            url: 'http://api.longurl.org/v2/expand?format=json&url=',
            format: 'jsonp',
            description: '<span style="color:green;">Work with any browser.</span>',
            parser: function(data){
                if (data['long-url']) {
                    return data['long-url'];
                }
                return false;
            }
            
        }
    }
    
};

/**
 * Convert a long url to a new short url.
 * @param {String} longURL The long url to be shorter.
 * @param {Function} success The function to be executed after finish -> success(shortURL).
 * @param {Function} error The function to be executed if an error happen -> error().
 */
function getShortURL(longURL, success, error)
{
    try {
        if (!Util.isFunc(success)) {
            throw ReferenceError('Success callback is not defined.');
        }
        if (!Util.isString(longURL) || !/http/.test(longURL)) {
            throw ReferenceError('longURL is not defined.');
        }
         
        var api = URLShortening.shortURL[UserConfig.main.get('shortServiceID')];
        
        if (global.xd_support !== true && api.format !== 'jsonp') {
            api = URLShortening.shortURL['JSON-TinyUrl'];
        }
        
        var login, login_text = '';
        if (api.login) {
            login = UserConfig.main.get('shortServiceLogin');
            login_text += '&' + api.login.name + '=' + login[api.login.name];
            login_text += '&' + api.login.key  + '=' + login[api.login.key];
        }
        
        function parserAndCallback(response) {
            var r = api.parser(response);
            if ( r ) {
                success( r );
            } else if ( error ) {
                error('Error parsing short service callback.');
            }
        }
        
        if ( api.format !== 'jsonp' ) {
            
            httpXDRequest({
                method: 'POST',
                url : api.url + escape(longURL) + login_text,
                onerror: error,
                onload: function(responseDetails) {
                    var response = responseDetails.responseText;
                    if (api.format !== 'text') {
                        response = Util.parseJSON(response);
                    }
                    if (api.parser) {
                        parserAndCallback( response );
                    } else {
                        success( response );
                    }
                }
            }, true);
            
        } else if (typeof($) !== 'undefined') {
            
            var bAborted = false;
            var nTimeout = setTimeout(function() {
                bAborted = true;
                error && error(Util.setColor('Timeout while unshorting url', 'red'));
            }, Math.max(UserConfig.main.jsTimeout,5)*1000);
        
            // send request
            $.ajax({
                dataType: 'jsonp',
                url: api.url + escape(longURL) + login_text,
                global: false,
                success: function(jsonData) {
                    if (bAborted === false) {
                        clearTimeout(nTimeout);
                        parserAndCallback( jsonData );
                    }
                }
            });
            
        } else {
            
            error && error('jQuery not loaded.');
            
        }
    }
    catch(err) {
        Logger.error(err);
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
        Logger.error(err);
        error && error(err.message);
    };
    try {
        if (!Util.isFunc(success)) {
            throw ReferenceError('callback is not defined.');
        }
        if (!Util.isString(shortURL) || !/http/.test(shortURL)) {
            throw ReferenceError('shortURL is not defined.');
        }
         
        var api = URLShortening.unshortURL[UserConfig.main.get('unshortServiceID')];
        
        if (global.xd_support !== true && api.format !== 'jsonp') {
            api = URLShortening.unshortURL['JSON-LongURL'];
        }
                
        function parserAndCallback(response) {
            var r = api.parser(response);
            if ( r ) {
                success( r );
            } else if ( error ) {
                error('Error parsing unshort service callback.');
            }
        }
        
        if ( api.format !== 'jsonp' ) {
            
            httpXDRequest({
                method: 'POST',
                url : api.url + escape(shortURL),
                onerror: error,
                onload: function(responseDetails) {
                    var response = responseDetails.responseText;
                    if (api.format !== 'text') {
                        response = Util.parseJSON(response);
                    }
                    if (api.parser) {
                        parserAndCallback( response );
                    } else {
                        success( response );
                    }
                }
            }, true);
            
        } else if (typeof($) !== 'undefined') {
            
            var bAborted = false;
            var nTimeout = setTimeout(function() {
                bAborted = true;
                error && error(Util.setColor('Timeout while unshorting url', 'red'));
            }, Math.max(UserConfig.main.jsTimeout,5)*1000);
        
            // send request
            $.ajax({
                dataType: 'jsonp',
                url: api.url + escape(shortURL),
                global: false,
                success: function(jsonData) {
                    if (bAborted === false) {
                        clearTimeout(nTimeout);
                        parserAndCallback( jsonData );
                    }
                }
            });
            
        } else {
            
            error && error('jQuery not loaded.');
            
        }
    }
    catch(err) {
        errorHandler(err);
    }
}
// ==Script==
// @id        PopupObject.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Create a popup with the specified options.<br>
 * Options:<br>
 * <br>
 * <b>type:</b> {String} set popup type.<br>
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
 * @param {String} popId
 * @param {Object} args
 * @return {PopupObject}
 */
function PopupObject(popId, args) {
    var me = this;
    var pId = Math.round(new Date().getTime() / 100);

    if (Util.isObject(popId)) {
        args = popId;
        popId = 'mwaddon_popup_'+pId;
    }
    if (!Util.isObject(args)) {
        args = new Object();
    }
    if (!Util.isString(args.title)) {
        args.title = '';
    }
    if (args.autoOpen !== true) {
        args.autoOpen = false;
    }
    if (!Util.isBoolean(args.center)) {
        args.center = true;
    }
    if (!Util.isString(args.type)) {
        args.type = 'normal';
    }
    if (!Util.isSet(args.appendTo)) {
        args.appendTo = e$('#fbmw_addon_popup');
    }
    var $fodder = c$('div','pop_'+pId).appendTo((args.appendTo||c$('div','fbmw_addon_popup').prependTo(global.final_wrapper)));
    var $bg = c$('div','class:pop_bg,pop_bg_'+pId).appendTo($fodder);
    var $pop = c$('div','class:pop_box,pop_box_'+pId).appendTo($fodder).css('top', args.top||80);
    var $hdr = c$('div').appendTo($pop);
    var $body = c$('div', popId).appendTo($pop).css('clear','both');
    var $btn = c$('div').css('padding', '10px 5px').appendTo($pop);
    var cssMain = {
        'width'       : 730,
        'border'      : '4px solid #A99E9E',
        'text-align'  : 'left',
        'top'         : args.top             || 20,
        'z-index'     : 49
    };
    var $title = c$('center').html(args.title).css({
        'font-size'   : 24,
        'font-weight' : 'bold',
        'position'    : 'absolute',
        'width'       : '100%'
    });
    // popup type
    switch(args.type) {
        case 'main'   : $pop.css(cssMain);                      break;
        case 'reqs'   : $fodder.addClass('request_iframe_pop'); break;
        case 'rob'    : $fodder.addClass('pop_rob');            break;
        case 'help'   : $fodder.addClass('cash_help_box');      break;
        case 'simple' : $fodder.addClass('simpleWithTitle');    break;
    }
    if (args.width) {
        $pop.width(args.width);
    }
    // fix to center
    $pop.css({
        'background': args.background ? args.background : '#121212',
        'left': '50%',
        'margin': '0px -'+ String($pop.outerWidth()/2) + 'px'
    });
    // z-index
    if (args.zIndex) {
        $pop.css('z-index', args.zIndex + 1);
        $bg.css('z-index', args.zIndex);
    }

    // close button
    c$('a').appendTo($pop).addClass('pop_close').bind('click', closePopup);


    if (args.type == 'main') {
        $hdr.css({
            'background'    : 'black url('+global.zGraphicsURL+'zmc/brick_bg_700x73_01.jpg) no-repeat 0px 0px',
            'border-bottom' : '2px solid #2f2f2f',
            'height': 70
        })
        .append(c$('div').append(c$('img').attr('src', global.resource.mwaddon_icon)).css({
            'float'  : 'left',
            'height' : 64,
            'margin' : 2
        }))
        .append($title.html(args.title).css('top',15));
    }
    else if (args.type == 'normal') {
        $hdr.append($title.html(args.title).css('top',10)).css({
            'border-bottom' : '2px solid #A99E9E',
            'margin-bottom' : 5,
            'height'        : 45
        });
    }
    else {
        $hdr.css('height', 15);
    }

    if (args.content) {
        $body.append(args.content);
    }
    if (args.center) {
        $body.css('text-align', 'center');
    }
    // Add buttons
    if (Util.isArray(args.buttons)) {
        $btn.css({
            'border-top': '2px solid #2F2F2F',
            'background-color': 'transparent',
            'text-align': 'center',
            'max-height': 40,
            'height': 40
        });
        Util.each(args.buttons, function(i, b) {
            if (!Util.isObject(b)) {
                b = new Object();
            }
            if (!Util.isString(b.label)) {
                b.label = 'undefined';
            }
            if (!Util.isFunc(b.onclick)) {
                b.onclick = closePopup;
            }
            b$(b.label).appendTo($btn).css('margin-left', 5)
            .click(closeAfterClick).click(b.onclick).addClass(b.addClass);
        });
    }
    // -------
    // METHODS
    // -------
    function closePopup() {
        $bg.hide();
        $pop.fadeOut(200, function() {
            if (typeof(args.onclose) == 'function') {
                args.onclose.apply(this);
            }
            me.destroy();
        });
        $('#content_row, #inner_page').height('auto');
        return false;
    }
    function closeAfterClick() {
        if (args.closeAfterClick === true) {
          closePopup();
        }
        return false;
    }
    function openPopup(bMoveToTop) {
        if ( bMoveToTop === true ) {
            $('#TopField').focus();
        }
        if ( args.type === 'main' ) {
           Tooltips.applyTo(popId, $fodder); 
        }        
        $bg.show();
        $pop.show();
        $('#inner_page').height(Math.max(parseInt($pop.height()) + 100, $('#inner_page').height()));
    }
    function applySelectOptions(options) {
        Util.each(options, function(id, op) {
            var $elt = $('#' + id, $pop);
            Util.each(op, function(value, name) {
                $elt.append(c$('option', 'value:'+value).text(name));
            });
        });
    }
    function applyBlackStyle() {
        var text = '#'+popId+' .black_box {font-weight: bold;color: rgb(208, 208, 208);'
	    + 'border: 1px solid rgb(153, 153, 153);background-color: black;font-size: 14px;}';
        c$('style').prependTo($pop).append(text);
        $('input, select, textarea', $pop).addClass('black_box');
    }
    
    /**
     * Add Style element to popup from a base64 encoded string.
     * @param {String} base64String An String encoded in base64
     */
    this.addBase64Style = function(base64String) {
        c$('style').prependTo($pop).append(global.Base64.decode(base64String));
    };
    /**
     * Add Script element to popup from a base64 encoded string.
     * @param {String} base64String An String encoded in base64
     */
    this.addBase64Script = function(base64String) {
        c$('script').prependTo($pop).append(global.Base64.decode(base64String));
    };
    /**
     * Destroy this popup
     */
    this.destroy = function() {
        $fodder.remove();
        delete this;
    };
    /**
     * Apply the specified options to all select elements.
     * @type {function}
     * @param {Object} options
     */
    this.applyOptions = applySelectOptions;
    /**
     * Add black style sheet
     * @type {function}
     */
    this.applyCustomClass = applyBlackStyle;
    /** 
     * Close the popup, fires onclose event.
     * @type {function}
     */
    this.close = closePopup;
    /** 
     * Show the popup.
     * @type {function}
     * @param {Boolean} [focus]
     */
    this.show = openPopup;
    /** 
     * @type {jQuery}
     */
    this.header = $hdr;
    /**
     * @type {jQuery}
     */
    this.content = $body;
    // ---------
    // AUTO-OPEN
    // ---------
    if (args.autoOpen) {
        openPopup();
    }
    
    return this;
}
// ==Script==
// @id        TabObject.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

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
 * @return {TabObject}
 */
function TabObject(appendTo, id, tabNames, height, width, layerCSS)
{
    /**
     * Show a tab.
     * @param {String, Number} id Can be the tab name (string) or tab index (integer).
     */
    this.showTab = function(id)
    {
        var tabID = ( isNaN(id=parseInt(id)) ? layerKeys[id] : id  );
        var elt = e$('#' + layerID + '_tab_' + tabID);
        if (elt) { elt.click(); }
    };
    /**
     * Get the specified layout.
     * @param {String, Number} id Can be the tab name (string) or tab index (integer)
     * @return {jQuery}
     */
    this.getLayout = function(id)
    {
        var tabID = (isNaN(id=parseInt(id)) ? layerKeys[id] : id  );
        return e$('#' + layerID + '_tab_' + tabID + '_layout');
    };
    /**
     * Get the right tabs space.
     * @return {jQuery}
     */
    this.tabClear = function()
    {
        return (e$('.tab_clear', headerLayout) || c$('div','class:tab_clear').appendTo(headerLayout));
    };
    
    if (tabNames.length < 1) {
        return null;
    }
    var layout, layerID = id, layerKeys = [];
    var mainLayout = c$('div', layerID).appendTo(appendTo);
    var headerLayout = c$('div', 'id:'+layerID+'_header,class:tab_box_header').height(35).appendTo(mainLayout);

    mainLayout.append(c$('script').append(document.createTextNode(global.Base64.decode(
        'ICAgIGZ1bmN0aW9uIG13YWRkb25fdGFiX2NsaWNrKGlkLCBlbGVtKSB7DQogICAgICAkKCdkaXZbaWQqPSJsYXlvdXQiXScsICcj'+
        'JytpZCkuaGlkZSgpOw0KICAgICAgJCgnZGl2W2lkXj0iJytpZCsnX3RhYl8iXScsICcjJytpZCsnX2hlYWRlcicpLnJlbW92ZUNs'+
        'YXNzKCkuYWRkQ2xhc3MoJ3RhYiB0YWJfaW5hY3RpdmVfb3AnKTsNCiAgICAgICQoJyMnICsgZWxlbS5pZCArICdfbGF5b3V0Jyku'+
        'c2hvdygpOw0KICAgICAgJChlbGVtKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKCd0YWIgdGFiX2FjdGl2ZV9vcCcpOw0KICAgIH0='
    ))));

    if (width) {
        mainLayout.width(width);
    }
    for (var i = 0; i < tabNames.length; i++) {
        c$('div', 'id:'+layerID+'_tab_'+i+',class:tab tab_inactive_op')
        .appendTo(headerLayout).attr('onclick','mwaddon_tab_click(\''+layerID+'\',this);').css({
            'margin-right': 3,
            'cursor': 'pointer',
            'padding-top': 8
        })
        .append(c$('div', 'class:tab_start').html('&nbsp;'))
        .append(c$('div', 'class:tab_middle').html(tabNames[i]))
        .append(c$('div', 'class:tab_end').html('&nbsp;'));

        // add the tab layouts.
        layout = c$('div','id:'+layerID+'_tab_'+i+'_layout,class:tab_box_content').appendTo(mainLayout).hide();
        if (height)   { layout.height(height); }
        if (layerCSS) { layout.css(layerCSS);  }

        // To parse tab name keys
        layerKeys[tabNames[i]] = i;
    }
    // show up the tab layer.
    this.showTab(0);
    return this;
}
// ==Script==
// @id        DropDownObject.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Create a new dropdown select with checkboxes
 * @param {String} id
 * @param {String} label
 * @param {Object} elements
 * @return {jQuery}
 */
function DropDownObject(id, label, elements) {
    var containerElt = c$('span', 'id:'+id).css('margin', '0px 2px 0px 2px').attr({
        'name': 'checkboxlist',
        'onmouseover': "var c=$('#sort_menu_button',this),p=c.position();p.top+=c.outerHeight();$('#sort_menu',this).css({'left':p.left+1,'top':p.top,'width':c.width()-3}).show();",
        'onmouseout': "$('#sort_menu', this).hide();"
    });
    
    b$('', 'id:sort_menu_button,class:short black').appendTo(containerElt).width(140).find('span:last')
    .append(c$('span').text(label||'Select').css({
       'max-width': 100,
       'text-overflow': 'ellipsis',
       'float': 'left',
       'overflow': 'hidden' 
    }))
    .append(c$('img').attr('src', global.zGraphicsURL+'dropdown_travel_arrow.gif').css({
        'float': 'right',
        'margin-top': 5
    }))
    .append(c$('div').css('clear','both'));
    
    var menuElt = c$('div', 'id:sort_menu').appendTo(containerElt);
    
    Util.each(elements, function(check_id, name) {
        c$('div').appendTo(menuElt).text(name).css({
            'cursor': 'pointer',
            'margin': 1
        }).attr({
            'value': check_id,
            'name':'checkbox',
            'class':'checkbox',
            'onclick':"$(this).toggleClass('checked');",
            'onmouseover': "$(this).css('background-color','#444')",
            'onmouseout': "$(this).css('background-color','transparent')"
        });
    });
    return containerElt;
}
// ==Script==
// @id        TableObject.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Create a new DOM table object.
 *
 * @constructor
 * @param {Element} appendTo
 * @param {Number} rows
 * @param {Number} columns
 * @param {Object} styleCSS
 * @return {TableObject}
 */
var TableObject = function(appendTo, rows, columns, styleCSS)
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



// ==Script==
// @id        ModalPopups.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * @param {function} callback
 * @param {Object} selectedUsers
 */
function showFriendsSelector(callback, selectedUsers) {
    
    var FbFriendListCache = new Object();

    var Popup = new PopupObject('friend_selection_popup', {
        type       : 'normal',
        title      : 'Friends Selector',
        top        : 50,
        width      : 710,
        background : 'black url(\''+global.zGraphicsURL+'requests/pop_back.jpg\') repeat-x',
        zIndex     : 999
    });
    
    var Events = {
        skip: function() {
            Popup.close();
            return false;
        },
        save: function() {
            Popup.close();
            
            var uSelected = new Array();
            Util.each(global.appFriends, function(i, user) {
                if (e$('.mfs_selected #mfs_user_'+user.uid, Popup.content)) {
                    uSelected.push({
                        uid: user.uid,
                        name: user.name
                    });
                }
            });
            callback(uSelected);
            
            return false;
        },
        select: function() {
            var $elt = $(this).clone().removeClass().addClass('mfs_remove');
            $('.mfs_selected ul', Popup.content).append($elt.click(Events.unselect));
            $(this).addClass('is_added');
            return false;
        },
        unselect: function() {
            $('.mfs_selectable #'+this.id, Popup.content).removeClass('is_added');
            $(this).unbind().remove();
            return false;
        },
        filter: function() {
            var $lst = $('.mfs_selectable', Popup.content);
            var text = String($(this).val());
            if (text.length < 1) {
                $('li', $lst).removeClass('is_hidden');
            } else {
                var RExp = new RegExp(text, 'i');
                
                Util.each(global.appFriends, function(i, user) {
                    var $elt = $('#mfs_user_'+user.uid, $lst);
                    if (RExp.test(user.name)) {
                        $elt.removeClass('is_hidden');
                    } else {
                        $elt.addClass('is_hidden');
                    }
                });
            }
            return false;
        },
        focusout: function() {
            var text = String($(this).val());
            if (text.length < 1) {
                $(this).val('Type a name...');
            }
        },
        focusin: function() {
            var text = String($(this).val());
            if (text === 'Type a name...') {
                $(this).val('');
            }
        },
        fbfriendlist_change: function() {
            var list_id = $(this).val();
            var curr_id = $(this).attr('curfl');
            
            $(this).attr('curfl', list_id);
            
            if (list_id !== 'none' && curr_id !== list_id) {
                if (Util.isSet(FbFriendListCache[list_id])) {
                    addFriends(FbFriendListCache[list_id]);
                }
                else {
                    facebook.friendlistGet(list_id, function(result) {
                        if (result.data) {
                            addFriends(FbFriendListCache[list_id] = result.data);
                        }
                    });
                }
            }
            
            function addFriends(data) {
                Util.each(data, function(index, user) {
                    $('.mfs_selectable li#mfs_user_'+user.id, Popup.content).click();
                });
            }
        }
    };
    
    function genFriendList() {
        var $lst = $('.mfs_selectable ul', Popup.content);
        Util.each(global.appFriends, function(i,user) {
            c$('li', 'class:mfs_add,id:mfs_user_'+user.uid).appendTo($lst).text(user.name);
        });
        $('li', $lst).click(Events.select);
    }
    
    function getFacebookFriendlists() {
        var $fl = $('#fb_friendlists', Popup.content).empty();
        c$('option', 'value:none').appendTo($fl).text('Select a Facebook Friendlist');
        $fl.attr('curfl', 'none');
        facebook.friendlist(function(response) {
            Util.each(response.data,function(index, list) {
                if (list.list_type === 'user_created') {
                    c$('option', 'value:'+list.id).appendTo($fl).text(list.name);
                }
            });
        });
    }
    
    function genMainDom() {
        var $mfs = c$('div', 'id:mfs_container').appendTo(Popup.content);
        
        c$('div', 'class:mfs_outer').appendTo($mfs);
        $mfs = c$('div', 'class:mfs_inner').appendTo($mfs);
        
        var $elt =  c$('div', 'class:mfs').css('float','left').appendTo($mfs);
        c$('div', 'class:mfs_name_filter_container').appendTo($elt);
        c$('div', 'class:line').appendTo($elt);
        c$('div', 'class:mfs_selectable').appendTo($elt).append(c$('ul'));
        c$('div', 'class:line').appendTo($elt);
        c$('div').appendTo($elt).append(s$('fb_friendlists', 250, {click:Events.fbfriendlist_change}));
        
        c$('input:text','id:mfs_name_filter,class:mfs_name_filter_box')
        .appendTo('.mfs_name_filter_container').focusin(Events.focusin).focusout(Events.focusout);
        
        $elt =  c$('div', 'class:mfs').css('float','left').appendTo($mfs);
        c$('div', 'class:mfs_name_title_container').appendTo($elt).text('Selected Friends:');
        c$('div', 'class:line').appendTo($elt);
        c$('div', 'class:mfs_selected').appendTo($elt).append(c$('ul'));
        c$('div', 'class:line').appendTo($elt);
        
        c$('div').css('clear','both').appendTo($mfs)
        $elt =  c$('div', 'class:mfs_buttons').appendTo($mfs);
        
        b$('SKIP','class:medium white').appendTo($elt).css({'min-width':80,'margin-right':10}).click(Events.skip);
        b$('SAVE AND CLOSE','class:medium orange').appendTo($elt).css({'min-width':80,'margin-right':10}).click(Events.save);
        
        $('#mfs_name_filter', Popup.content).keyup(Events.filter);
        
        Popup.header.css({
            'font-size': 22,
            'font-weight': 'bold',
            'color': '#FC0',
            'margin-bottom': 5,
            'padding': 4,
            'text-align': 'center'
        });
    }
    
    function showPopup() {
        genMainDom();
        genFriendList();
        getFacebookFriendlists();
        if (selectedUsers) {
            Util.each(selectedUsers, function(i,uid) {
                $('.mfs_selectable #mfs_user_'+uid, Popup.content).click();
            });
        }
        Popup.applyCustomClass();
        Popup.show();
        $('#mfs_name_filter', Popup.content).focus();
    }
    
    Popup.addBase64Style(
        'I2ZyaWVuZF9zZWxlY3Rpb25fcG9wdXAgI21mc19jb250YWluZXIgew0KICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50Ow0KICAg'+
        'IHdpZHRoOiBhdXRvOw0KICAgIGhlaWdodDogNTQycHg7DQogICAgbWFyZ2luOiAxMHB4IGF1dG87DQp9DQojZnJpZW5kX3NlbGVj'+
        'dGlvbl9wb3B1cCAjbWZzX2NvbnRhaW5lciAubWZzX291dGVyIHsNCiAgICBib3JkZXI6IDJweCBncm9vdmUgIzQ0NDsNCiAgICBw'+
        'b3NpdGlvbjogYWJzb2x1dGU7DQogICAgbWFyZ2luOiAwcHggMHB4IDBweCAxMnB4Ow0KICAgIHdpZHRoOiA2NzVweDsNCiAgICBo'+
        'ZWlnaHQ6IDUyMHB4Ow0KICAgIGJhY2tncm91bmQ6IGJsYWNrOw0KICAgIG9wYWNpdHk6IDAuNjsNCiAgICB0b3A6IDYwcHg7DQog'+
        'ICAgLW1vei1ib3JkZXItcmFkaXVzOiA4cHg7DQogICAgYm9yZGVyLXJhZGl1czogOHB4Ow0KICAgIC13ZWJraXQtYm9yZGVyLXJh'+
        'ZGl1czogOHB4Ow0KfQ0KI2ZyaWVuZF9zZWxlY3Rpb25fcG9wdXAgI21mc19jb250YWluZXIgLm1mc19pbm5lciB7DQogICAgcG9z'+
        'aXRpb246IGFic29sdXRlOw0KICAgIHdpZHRoOiAxMDAlOw0KICAgIGhlaWdodDogNTYwcHg7DQp9DQojZnJpZW5kX3NlbGVjdGlv'+
        'bl9wb3B1cCAjbWZzX2NvbnRhaW5lciBkaXYubWZzIHsNCiAgICB3aWR0aDogMzExcHg7DQogICAgaGVpZ2h0OiA0MDlweDsNCiAg'+
        'ICBtYXJnaW4tbGVmdDogMTVweDsNCiAgICBwYWRkaW5nOiAxMHB4Ow0KICAgIGJhY2tncm91bmQ6IHVybCgnaHR0cHM6Ly96eW5n'+
        'YXB2LmhzLmxsbndkLm5ldC9lNi9td2ZiL2dyYXBoaWNzL3JlcXVlc3RzL01GU19iYWNrLnBuZycpIGxlZnQgdG9wIG5vLXJlcGVh'+
        'dDsNCn0NCiNmcmllbmRfc2VsZWN0aW9uX3BvcHVwICNtZnNfY29udGFpbmVyIGRpdi5tZnNfbmFtZV9maWx0ZXJfY29udGFpbmVy'+
        'IHsNCiAgICBiYWNrZ3JvdW5kOiB1cmwoJ2h0dHBzOi8venluZ2Fwdi5ocy5sbG53ZC5uZXQvZTYvbXdmYi9ncmFwaGljcy9yZXF1'+
        'ZXN0cy9hcnJvdy5wbmcnKSAxNXB4IDhweCBuby1yZXBlYXQ7DQogICAgcGFkZGluZzogNXB4IDEwcHggNXB4IDQwcHg7DQp9DQoj'+
        'ZnJpZW5kX3NlbGVjdGlvbl9wb3B1cCAjbWZzX2NvbnRhaW5lciBkaXYubWZzX25hbWVfdGl0bGVfY29udGFpbmVyIHsNCiAgICBi'+
        'YWNrZ3JvdW5kOiB1cmwoJ2h0dHBzOi8venluZ2Fwdi5ocy5sbG53ZC5uZXQvZTYvbXdmYi9ncmFwaGljcy9yZXF1ZXN0cy9hcnJv'+
        'dy5wbmcnKSAxNXB4IDhweCBuby1yZXBlYXQ7DQogICAgcGFkZGluZzogMTNweCAxMHB4IDVweCAxMDBweDsNCiAgICBjb2xvcjog'+
        'I0ZDMDsNCiAgICB0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2ZyaWVuZF9zZWxlY3Rpb25fcG9wdXAgI21mc19jb250YWluZXIgLm1m'+
        'c19uYW1lX2ZpbHRlcl9ib3ggew0KICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50Ow0KICAgIGNvbG9yOiB3aGl0ZTsNCiAgICBm'+
        'b250LXNpemU6IDEzcHg7DQogICAgaGVpZ2h0OiAyNXB4Ow0KICAgIHdpZHRoOiAyNjBweDsNCiAgICBib3JkZXI6IG5vbmU7DQp9'+
        'DQojZnJpZW5kX3NlbGVjdGlvbl9wb3B1cCAjbWZzX2NvbnRhaW5lciBkaXYubGluZSB7DQogICAgaGVpZ2h0OiAycHg7DQogICAg'+
        'YmFja2dyb3VuZDogdXJsKCdodHRwczovL3p5bmdhcHYuaHMubGxud2QubmV0L2U2L213ZmIvZ3JhcGhpY3MvcmVxdWVzdHMvbGlu'+
        'ZS5wbmcnKSA1MCUgNTAlIG5vLXJlcGVhdDsNCiAgICBib3JkZXI6IG5vbmU7DQp9DQojZnJpZW5kX3NlbGVjdGlvbl9wb3B1cCAj'+
        'bWZzX2NvbnRhaW5lciBkaXYubWZzX3NlbGVjdGFibGUsDQojZnJpZW5kX3NlbGVjdGlvbl9wb3B1cCAjbWZzX2NvbnRhaW5lciBk'+
        'aXYubWZzX3NlbGVjdGVkIHsNCiAgICBvdmVyZmxvdzogYXV0bzsNCiAgICBtYXJnaW46IDEwcHggNXB4Ow0KICAgIGhlaWdodDog'+
        'MzAwcHg7DQp9DQojZnJpZW5kX3NlbGVjdGlvbl9wb3B1cCBkaXYubWZzX3NlbGVjdGVkIHVsLCAjZnJpZW5kX3NlbGVjdGlvbl9w'+
        'b3B1cCBkaXYubWZzX3NlbGVjdGFibGUgdWwgew0KICAgIG1hcmdpbjogMDsNCiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7DQp9DQoj'+
        'ZnJpZW5kX3NlbGVjdGlvbl9wb3B1cCBkaXYubWZzX3NlbGVjdGFibGUgLm1mc19hZGQgew0KICAgIGN1cnNvcjogcG9pbnRlcjsN'+
        'CiAgICBiYWNrZ3JvdW5kOiB1cmwoJ2h0dHBzOi8venluZ2Fwdi5ocy5sbG53ZC5uZXQvZTYvbXdmYi9ncmFwaGljcy9yZXF1ZXN0'+
        'cy9wbHVzLnBuZycpIDFweCAycHggbm8tcmVwZWF0Ow0KICAgIHBhZGRpbmctbGVmdDogMjBweDsNCiAgICBsaXN0LXN0eWxlLXR5'+
        'cGU6IG5vbmU7DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNmcmllbmRfc2VsZWN0aW9uX3BvcHVwIGRpdi5tZnNfc2VsZWN0'+
        'YWJsZSAubWZzX2FkZC5pc19hZGRlZCwNCiNmcmllbmRfc2VsZWN0aW9uX3BvcHVwIGRpdi5tZnNfc2VsZWN0YWJsZSAubWZzX2Fk'+
        'ZC5pc19oaWRkZW4gew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQojZnJpZW5kX3NlbGVjdGlvbl9wb3B1cCBkaXYubWZzX3NlbGVj'+
        'dGFibGUgLm1mc19hZGQ6aG92ZXIgew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMyNDI0MjQ7DQp9DQojZnJpZW5kX3NlbGVjdGlv'+
        'bl9wb3B1cCBkaXYubWZzX3NlbGVjdGVkIC5tZnNfcmVtb3ZlIHsNCiAgICBjdXJzb3I6IHBvaW50ZXI7DQogICAgYmFja2dyb3Vu'+
        'ZDogdXJsKCdodHRwczovL3p5bmdhcHYuaHMubGxud2QubmV0L2U2L213ZmIvZ3JhcGhpY3MvcmVxdWVzdHMvY3Jvc3MucG5nJykg'+
        'MXB4IDJweCBuby1yZXBlYXQ7DQogICAgcGFkZGluZy1sZWZ0OiAyMHB4Ow0KICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCiAg'+
        'ICB0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2ZyaWVuZF9zZWxlY3Rpb25fcG9wdXAgZGl2Lm1mc19zZWxlY3RlZCAubWZzX3JlbW92'+
        'ZTpob3ZlciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzI0MjQyNDsNCn0NCiNmcmllbmRfc2VsZWN0aW9uX3BvcHVwIGRpdi5t'+
        'ZnNfYnV0dG9ucyB7DQogICAgdGV4dC1hbGlnbjogcmlnaHQ7DQogICAgbWFyZ2luOiAyMHB4IDQwcHggMCAwOw0KfQ=='
    );
    
    Logger.debug('Loading showUserSelection...');
    
    if (global.appFriends) {
        showPopup();
    } else {
        loadingScreen('Loading friends...');
        facebook.getAppFriends(function(users) {
            loadingScreen();
            if ((global.appFriends = users)) {
                showPopup();
            } else {
                Popup.destroy();
                showHelpPopup({
                    icon: 'error',
                    message: 'Cant load your Mafia Wars Friends.'
                });
            }
        });
    }
}

/**
 * Display a modal message popup.<br>
 * Usage:<br> <br>
 * <b>icon</b>: {String} Can be info or error.<br>
 * <b>title</b>: {String} the title of the new popup.<br>
 * <b>message</b>: {String} message sent to user.<br>
 * <b>buttons</b>: {Array} optional buttons.
 * 
 * <pre>
 * foo({
 *     icon: '',
 *     title: '',
 *     message: ''
 * });
 * </pre>
 * 
 * @param {Object} args
 */
function showHelpPopup(args) {
    if (typeof($)==='undefined') {
        return;
    }
    var title = (this.scope==='MWAddonPlugin' ? this.name : 'MWAddon') + ' says:';
    var icons = {
        'info': global.resource.info_icon,
        'error': global.resource.ajax_error,
        'caution': global.zGraphicsURL+'cautionTopIcon.png'
    };
    if (Util.isString(args)) {
        args = {
            icon: 'info',
            title: title,
            message: args
        };
    } else if (!Util.isSet(args.title)) {
        args.title = title;
    }
    var helpPopup = new PopupObject({
        type: 'help',
        top: args.top,
        autoOpen: true,
        zIndex: 99999,
        closeAfterClick: true,
        onclose: args.onclose,
        buttons: args.buttons,
        width: args.width,
        content: c$('div').css({'text-align': 'left','margin': '5px 30px'})
            .append(c$('img').css('float', 'left').attr('src', icons[args.icon]))
            .append(c$('h4').css('padding', '3px 28px').html(args.title))
            .append(c$('div').css('margin-top', 10).html(args.message))
    });
    if (!Util.isSet(args.top)) {
        $('#TopField').focus();
    }
    if (Util.isSet(args.autoclose) && parseInt(args.autoclose) > 0) {
        setTimeout(helpPopup.close, args.autoclose * 1000);
    }
}
/**
 * Display a modal popup asking to the user to input text.
 * @param {String} message
 * @param {String} defaultText
 * @param {Function} callback
 * @param {Number} [height]
 */
function showPromptPopup(message, defaultText, callback, height) {
    if (!Util.isString(message)) {
        return;
    }
    if (!Util.isFunc(callback)) {
        return prompt(message, defaultText);
    }
    var $in = Util.isNumber(height)
	? c$('textarea').css({'width':600,'height':height})
	: c$('input:text').width(600);
	
    var Popup = new PopupObject({
        type     : 'simple',
        zIndex   : 99999,
        buttons  : [{ 
		    label: 'Accept', 
			onclick: function () {
		        Popup.close();
		        callback && callback(String($in.val()));
		        return false;
		    } 
		}, { 
			label: 'Cancel' 
		}]
    });
	
	c$('div').css('margin', '10px 0px 5px 0px').appendTo(Popup.content)
    .append(c$('h4').css('margin', 0).text(message||'write a text:')).append($in);
	
	$in.val(defaultText||'');
	
	Popup.applyCustomClass();
	Popup.show(true);
}
/**
 * Display a modal popup showing text to the user.
 * @param {String} message
 * @param {String} text
 */
function showTextPopup(message, text) {
    if (!message || !text) {
        return;
    }
    var $in = c$('textarea','readonly:readonly').css({'width':600,'height':250}).val(text);
    var Popup = new PopupObject({
        type     : 'simple',
        zIndex   : 99999,
        buttons  : [{
            label    : 'Select All',
            addClass : 'short white',
            onclick  : function() {$in.select(); return false;}
        }]
    });
    
    c$('div').css('margin', '10px 0px 5px 0px')
	.append(c$('h4').css('margin', 0).text(message))
    .append($in).appendTo(Popup.content);
    
	Popup.applyCustomClass();
    Popup.show(true);
}
/**
 * Display a modal popup asking to the user.
 * @param {String} title
 * @param {String} message
 * @param {Function} accept_callback
 * @param {Function} cancel_callback
 */
function showAskPopup(title, message, accept_callback, cancel_callback) {
    if (!Util.isFunc(accept_callback)) {
        return confirm(title);
    }
    showHelpPopup({
        icon: 'info',
        title: title,
        message: message,
        buttons: [{
            label: 'Accept',
            addClass: 'short green',
            onclick: accept_callback
        }, {
            label: 'Cancel',
            addClass: 'short white',
            onclick: cancel_callback
        }]
    });
}
/**
 * Show a publishing message that autoclose after 3 seconds.
 */
function showPublishMessage() {
    if (UserConfig.main.publishPreview === true) {
        return;
    }
    showHelpPopup({
        icon: 'info',
        title: 'Post Published!',
        message: 'You\'ve published to selected target.',
        autoclose: 3
    });
}
/**
 * Show a graphical loading screen.<br><br>
 * - Use loadingScreen('text') to ahow the overlay.<br>
 * - Use loadingScreen() to hide the overlay.
 * @param {String} [message] Optional message. 
 * @return {jQuery}
 */
function loadingScreen(message) {
    $('#fbmw_menu').mouseleave();
    
    if (!Util.isSet(message) || message == 'hide') {
        return $('#overlay_pop').hide();
    }
    
    if (e$('#fbmw_addon_popup #overlay_pop') !== null) {
        $('#loaderText', '#overlay_pop').text(message);
        return $('#overlay_pop').show();
    }
    
    var $div = c$('div', 'id:overlay_pop').hide()
    .appendTo(e$('#fbmw_addon_popup') || c$('div', 'fbmw_addon_popup').prependTo(global.final_wrapper));
    
    c$('div', 'id:overlay_pop_bg,class:pop_bg').css('z-index', 995).appendTo($div).show();
    c$('div', 'id:overlay_pop_box,class:socialMissionTryAgain').css('z-index', 999)
    .appendTo($div).css('top', 100).show()
    .append(c$('div', 'loaderText').text(message))
    .append(c$('div').append(c$('img').attr('src', 
    'http://mwfb.static.zgncdn.com/mwfb/graphics/socialmissions/ajax-loader.gif')));
    
    return $div.show();
}
/**
 * Show a popup for group selection.
 * @param {Number} defaultGroup
 * @param {Function} callback
 */
function showGroupSelection(defaultGroup, callback, defaultMessage) {

    var Popup = new PopupObject('target_selection_popup', {
        type       : 'simple',
        top        : 150,
        width      : 560,
        background : 'black url(\''+global.zGraphicsURL+'Fight-Explain_bg.jpg\') repeat-x',
        zIndex     : 99999
    });
    
    var Events = {
        select_click: function() {
            $(this).unbind().addClass('disabled').find('span > span').text('Target Selected!');
            setTimeout(function() {
                Popup.close();
                callback(Util.getInputSelectedValue($('#select_fbgroups', Popup.content)), 
                         $('#message_post',Popup.content).val());
            }, 1000);
            return false;
        },
        refresh_click: function() {
            var $btn = $(this);
            if ($btn.hasClass('disabled')) {
                return false;
            }
            else {
                $btn.addClass('disabled');
            }
            global.fb_groups.refresh(function() {
                global.fb_groups.addToSelect('#select_fbgroups',defaultGroup);
                $btn.removeClass('disabled');
            });
            return false;
        }
    };
    
    Popup.addBase64Style(
        'I3RhcmdldF9zZWxlY3Rpb25fcG9wdXAgLmJsYWNrIHsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogcmdiKDIwOCwgMjA4'+
        'LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNr'+
        'OyANCglmb250LXNpemU6IDE0cHg7DQp9DQojdGFyZ2V0X3NlbGVjdGlvbl9wb3B1cCAucG9wdXBfYm9keSB7DQoJbWFyZ2luLXRv'+
        'cDogMjBweDsNCgltYXJnaW4tcmlnaHQ6IDEwcHg7DQoJbWFyZ2luLWJvdHRvbTogMjBweDsNCgltYXJnaW4tbGVmdDogNTBweDsN'+
        'CgloZWlnaHQ6IDIwMHB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojdGFyZ2V0X3NlbGVjdGlvbl9wb3B1cCBhIHsNCgl0ZXh0'+
        'LWRlY29yYXRpb246IG5vbmU7DQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI3RhcmdldF9zZWxlY3Rpb25fcG9wdXAgcCB7DQogICAg'+
        'bWFyZ2luOiAxcHg7DQoJcGFkZGluZzogMHB4Ow0KfQ=='
    );
    
    c$('div', 'class:popup_body').appendTo(Popup.content)
    .append(c$('p').text('Write a Message:').css('margin-bottom',1))
    .append(c$('textarea', 'id:message_post,class:black').width(450).height(80))
    .append('<br /><br />')
    .append(c$('p').text('Select Destination:').css('margin-bottom',1))
    .append(c$('select', 'id:select_fbgroups,class:black').css('margin-right',5).width(400))
    .append(c$('a', 'href:#').text('Refresh').click(Events.refresh_click));
    
    b$('Publish', 'class:medium white').appendTo(Popup.content).click(Events.select_click);
    
    if (Util.isString(defaultMessage)) {
        $('#message_post', Popup.content).val(defaultMessage);
    }
    global.fb_groups.addToSelect('#select_fbgroups',defaultGroup);
    Popup.show();
}

/**
 * Show new version update. 
 * @param {Object} info
 */
function showVerInfoPopup(info) {
    var Popup = new PopupObject('version_info_popup', {
        type       : 'simple',
        top        : 100,
        width      : 645,
        background : 'black url(\''+global.zGraphicsURL+'clan_chat/settings_popup_bgrnd_1.png\') repeat-x',
        zIndex     : 9999
    });
    
    c$('div').height(55).html(info.message).appendTo(Popup.content).css({
        'font-size': 16,
        'font-weight': 'bold'
    });
    var $body = c$('div').appendTo(Popup.content).css({
        'text-align': 'left',
        'overflow-y': 'auto',
        'margin': '0px 25px 0px 35px',
        'height': 320
    });
    
    $('pre', $body).css('margin-bottom', 0);
    $('ul', $body).css('margin-top', 0);
    
    c$('center').css('margin-top',12).appendTo(Popup.content)
    .append(b$(info.isnew?'Update Now!':'Go to Page', 'class:medium white')
              .attr('onclick',"window.open('"+info.url+"', '_blank');return false;"));
    
    $('#popup_fodder_zmc').empty();
    
    $body.append(c$('p').text('Loading version history...'));
    $body.append(c$('span').text('Wait a moment while history is loaded, '));
    $body.append(c$('a', 'target:_black').attr('href', info.history).text('or click here.'));
    
    httpXDRequest({  
        method : 'GET',
        url    : info.history,
        onload : function(s) {
            $body.html(h$(s.responseText).find('table tr.by-author:first td.body').html());
        }
    });
    
    Popup.show();
}
// ==Script==
// @id        Plugins.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

UserConfig.create('plugins', {all: new Array()});

/**
 * @namespace Plugins
 */
var Plugins = {
    getMenu: function() {
        var oArray = new Array();
        Util.each(UserConfig.plugins.all,function(i,m) {
            if (m.active===true && (!Util.isSet(m.runat) || parseInt(m.runat) === 0)) {
                oArray.push({'name':m.name, 'click':{'func':Plugins.exec,'params':[i]}});
            }
        });
        return oArray;
    },
    /**
     * Add a new plugin.
     * @param {Object} index
     * @param {Object} code
     */
    addFunc: function(index, code) {
        try {
            var f = new Function('unsafeWindow','jQuery','User','Util','MW','FB',
            'alert','confirm','prompt','c$','e$','x$','n$','b$','s$','t$','MWAddon',code);
            if (Util.isFunc(f)) {
                Plugins.sources[index] = f;
            } else {
                throw 'Unexpected function string';    
            }            
        } catch (e) {
            var name = UserConfig.plugins.all[ parseInt(index) ].name;
            showHelpPopup({
                icon: 'error',
                title: 'Plugin Code Error',
                message: 'The code in "'+name+'" contains errors and cant be processed.'
            });
        }
    },
    /**
     * Update all Plugin Object Functions. 
     * @param {Object} callback
     */
    init: function(callback) {
        var total_requests = 0;
        Plugins.sources = new Array();
        
        UserConfig.plugins.load(function() {
            Util.each(UserConfig.plugins.all, function(n, o) {
                var runat = parseInt(o.runat);
                var code = Util.trim(o.click);
                if ( !Util.isSet(o.src) || parseInt(o.src) === 0 ) {
                    if (/^javascript:/.test(code)) {
                        code = 'return '+code.substring(11);
                    } 
                    else if (/^function\s?\(\)/.test(code)) {
                        code = 'return ('+code+')();';
                    }
                    Plugins.addFunc(n, code);  
                } 
                else if (/http/.test(o.click)){
                    Logger.debug('Downloading Remote JS File: '+o.click);
                    if (runat === 1) { total_requests++; }
                    httpXDRequest({
                        method: 'GET',
                        headers: {'Content-Type': 'text/javascript'},
                        url: Util.trim(o.click)+'?'+Math.random(),
                        onload: function(res) {
                            Plugins.addFunc(n, Util.trim(res.responseText));
                            if (runat === 1) { total_requests--; }
                        }
                    });    
                }
            });
            if (Util.isFunc(callback)) {
                Util.until({test: function(){ return (total_requests < 1); }, success: callback});
            }
        });
    },
    /**
     * Execute a plugin.<br>
     * This method call the pluging function with a MWAddon object context (to use with this).
     * @param {Number, String} index
     */
    exec: function(index) {
        var thisApp = UserConfig.plugins.all[index];
        if (!Util.isFunc(Plugins.sources[index]) || !thisApp || !thisApp.active) {
            return;
        }
        Logger.debug('Executed: "'+thisApp.name+'" Plugin.');
        var MWAddon = {
            'id'                    : index,
            'name'                  : thisApp.name, 
            'scope'                 : 'MWAddonPlugin',  
            'Version'               : AppInfo.version,
            'CrossDomainSupported'  : global.xd_support,
            'onPageLoad'            : global.onPageLoad,
            'addMenu'               : MainMenu.add,
            'execPluginByName'      : Plugins.execByName,
            'Util'                  : Util,
            'MW'                    : MW,
            'Facebook'              : facebook,
            'Ajax'                  : httpAjaxRequest,
            'httpRequest'           : httpXDRequest,
            'Base64'                : global.Base64,
            'Config'                : Config,
            'CreatePopup'           : PopupObject,
            'CreateTab'             : TabObject,
            'CreateDropDown'        : DropDownObject,
            'CreateConfigSettings'  : UserConfig.create,
            'ShowHelpPopup'         : showHelpPopup,
            'ShowPromptPopup'       : showPromptPopup,
            'ShowTextPopup'         : showTextPopup,
            'ShowAskPopup'          : showAskPopup,
            'ShowGroupSelection'    : showGroupSelection,
            'addFreeGift'           : UserFreeGifts.add,
            'Collection'            : Collection,
            'TimerMessage'          : TimerMessage,
            'Countdown'             : Countdown,
            'LoadingScreen'         : loadingScreen,
            'ShortURL'              : getShortURL,
            'UnshortUrl'            : getUnshortUrl,
            'Tooltips': {
                'applyTo'           : Tooltips.applyTo,
                'addResource'       : Tooltips.addResource,
                'addResourceContent': Tooltips.addResourceContent,
                'addResourceString' : Tooltips.addResourceString,
                'resourceExists'    : Tooltips.resourceExists
            }
        };
        Plugins.sources[index].apply(MWAddon, [ unsafeWindow,
            unsafeWindow.jQuery, unsafeWindow.User, unsafeWindow.Util, unsafeWindow.MW, 
            unsafeWindow.FB, function(){return showHelpPopup.apply(MWAddon, arguments)}, 
            showAskPopup, showPromptPopup, c$, e$, x$, n$, b$, s$, t$, MWAddon
        ]);
    },
    
    execByName: function(plugin_name) {
        plugin_name = String(plugin_name).toLowerCase();
        Util.each(UserConfig.plugins.all, function(i,v) {
            if (String(v.name).toLowerCase() === plugin_name) {
                Plugins.exec(i);
                return false;
            }
        });
    },
    /**
     * Add a new plugin.
     * @param {Object} plugin
     * @param {Function} callback
     */
    addNew: function(plugin, callback) {
        var success = false;
        var sName = String(plugin.name).toLowerCase(); 
        UserConfig.plugins.load(function() {
            Util.each(UserConfig.plugins.all, function(i,v) {
                var n = String(v.name).toLowerCase();
                if ((success = (n === sName)) === true) {
                    UserConfig.plugins.all[i] = plugin;
                    return false;
                }
            });
            if (success === false) {
                UserConfig.plugins.all.push(plugin);
            }
            UserConfig.plugins.save(callback);
        });
    }
};
// ==Script==
// @id        Reminder.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==

UserConfig.create('reminder', {all: new Array()});

/**
 * @namespace Reminders
 */
var Reminders = {
    getMenu: function() {
        var oArray = new Array();
        Util.each(UserConfig.reminder.all,function(i,m) {
            if (m.active !== true) {
                return;
            }
            oArray.push({
                'name': m.name, 
                'important': m.important, 
                'click': {'func':Reminders.exec,'params':[i]}
            });
        });
        return oArray;
    },
    /**
     * Init the config object.
     */
    init: function(callback) {
        UserConfig.reminder.load(callback);
    },
    /**
     * Check reminder timeout.
     * @param {Object} oRem
     */
    isTimeout: function(oRem) {    
        var now = (new Date()).getTime();
        
        if (oRem.important === true) {
            return false;
        }
        
        if (!Util.isSet(oRem.last_check)) {
            if (parseInt(oRem.checktype) === 0) {
                return true;
            }
        }
        function getFixedDate(day) {
            var a = new Date();
            if (Util.isSet(oRem.last_check)) {
                a = new Date(oRem.last_check);
                a.setDate(a.getDate()+1);
            }
            if (parseInt(oRem.every)>23) {
                oRem.every = 0;
            }
            a.setHours(oRem.every);
            a.setMinutes(0);
            a.setSeconds(0);
            return a;
        }
        switch(parseInt(oRem.checktype)) {
            case 0: return (now > (oRem.last_check + (oRem.every*60*60*1000)));
            case 1: return (now > getFixedDate().getTime());
        } 
    },
    /**
     * Test a url ro check Reset On Load.
     * @param {Object} oRem
     */
    testUrl: function(oRem, url) {
        var bValid = false;
        var p = Util.uSplit(oRem.resetonloadurl);
    
        if ( p.xw_controller && p.xw_action ) {
            bValid = true;
            Util.each(p, function(name,value) {
                if ( String(url).indexOf(name+'='+value) === -1 ) {
                    bValid = false;
                }
            });
        }
        return bValid;
    },
    /**
     * Build a valid url.
     * @param {Object} p
     */
    buildUrl: function(p) {
        var url = 'remote/'+MW.getIntURL(p.xw_controller,p.xw_action);
        $.each(p, function(name,value) {
            if ( !/xw_/.test(name) ) {
                url += ('&'+name+'='+value);
            }
        });
        return url;
    },
    
    /**
     * Execute a reminder.
     * @param {Object} oRem
     */
    exec: function(oRem) {
        if (Util.isNumber(oRem)) {
            oRem = UserConfig.reminder.all[oRem];
        }   
        function doReminderStep1() {
            if ( oRem.gotocity === true ) {
                if (MW.currentCity() !== parseInt(oRem.gotocityid)) {
                    MW.travel(oRem.gotocityid,'inner_page',doReminderStep2);
                    return;
                }
            }
            doReminderStep2();
        }
        function doReminderStep2() {
            var rgx, url = String(oRem.gotopageurl);
            if ( oRem.gotopage === true ) {
                if ( (rgx=/^run:(.+)/.exec(url)) ) {
                    setTimeout(function() {
                        eval(rgx[1]);
                    }, 1000);
                    return;
                } else if ( (rgx=/^tab:(.+)/.exec(url)) ) {
                    unsafeWindow.open(rgx[1]);
                    return;
                }
                var p = Util.uSplit(oRem.gotopageurl);
                if ( p.xw_controller && p.xw_action ) {
                    MW.goPage(Reminders.buildUrl(p),'inner_page',doReminderStep3);
                    return;
                }
            }
            doReminderStep3();
        }
        function doReminderStep3() {
            if ( oRem.runplugin === true ) {
                Plugins.exec(oRem.runpluginid);
            }
        }
        oRem.last_check = (new Date()).getTime();
        oRem.important = false;
        UserConfig.reminder.save(doReminderStep1);
    },
    /**
     * Check all reminders
     * @param {String} url
     */
    checker: function(url) {
        if (e$('#mwaddon_reminder_layout') || global.editingReminders === true) {
            return;
        }    
        var oRem, reminderLayout;
        var Events = {
             skipReminder_click: function() {
                hideLayout();
                oRem.last_check = (new Date()).getTime();
                UserConfig.reminder.save();
                return false;
            },
    
             waitReminder_click: function() {
                hideLayout();
                oRem.important = true;
                oRem.last_check = (new Date()).getTime();
                UserConfig.reminder.save();
                return false;
            },
            
             runReminder_click: function() {
                hideLayout();
                Reminders.exec(oRem);
                return false;
            }   
        };
    
        UserConfig.reminder.load(function() {
            Util.each(UserConfig.reminder.all, function(n, r) {
                oRem = r;
                if (oRem.active !== true) {
                    Logger.debug('Reminder '+oRem.name+' is set off.');
                }
                else if ( oRem.resetonload === true && Reminders.testUrl(r, url) ) {
                    Logger.debug('Reminder '+oRem.name+' updated due resetonload: '+oRem.resetonloadurl+' url:'+url);
                    oRem.important = false;
                    oRem.last_check = (new Date()).getTime();
                    UserConfig.reminder.save();
                }
                else if ( Reminders.isTimeout(oRem) ) {
                    showReminder();
                    return false;
                }
            });
    
        });
        
        function hideLayout() {
            reminderLayout.slideUp('medium',function() { 
                reminderLayout.remove(); 
            });
        }
    
        function showReminder() {
            reminderLayout = $(global.Base64.decode(
                'PGRpdiBpZD0ibXdhZGRvbl9yZW1pbmRlcl9sYXlvdXQiIHN0eWxlPSJ3aWR0aDogMTAwJTsgIHBvc2l0aW9uOiBhYnNvbHV0ZTsg'+
                'dG9wOiAwcHg7IGJhY2tncm91bmQ6IHVybCgmcXVvdDtodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNz'+
                'L3RyYXkvdHJheV9iZ183NDh4NzQ4XzAxLnBuZyZxdW90OykgNTAlIDAgcmVwZWF0LXk7IHotaW5kZXg6IDI1OyB0ZXh0LWFsaWdu'+
                'OiBsZWZ0OyBvcGFjaXR5OiAxOyI+DQoJPGRpdiBzdHlsZT0iYmFja2dyb3VuZDogdXJsKCZxdW90O2h0dHA6Ly9td2ZiLnN0YXRp'+
                'Yy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvdHJheS90cmF5X2JvcmRlcl83NDh4NzAwXzAxLnBuZyZxdW90OykgNTAlIDEwMCUg'+
                'bm8tcmVwZWF0OyI+DQoJCTxkaXYgc3R5bGU9ImJhY2tncm91bmQ6IHVybCgmcXVvdDtodHRwOi8vbXdmYi5zdGF0aWMuemduY2Ru'+
                'LmNvbS9td2ZiL2dyYXBoaWNzL3RyYXkvdHJheV90b3Bfc2hhZG93Xzc0OHgzMF8wMS5wbmcmcXVvdDspIDUwJSAwIG5vLXJlcGVh'+
                'dDsgcGFkZGluZzogMTVweDsiPg0KCQkJPGRpdiBpZD0ibXdhZGRvbl9yZW1pbmRlcl90aXRsZSIgc3R5bGU9ImNvbG9yOiB5ZWxs'+
                'b3c7bWFyZ2luLWxlZnQ6IDhweDsgIj48L2Rpdj4NCgkJCTxkaXYgaWQ9Im13YWRkb25fcmVtaW5kZXJfZGVzY3JpcHRpb24iIHN0'+
                'eWxlPSJtYXJnaW4tdG9wOiA1cHg7IGNvbG9yOiB3aGl0ZTsgb3ZlcmZsb3cteTogYXV0bzsgaGVpZ2h0OiA4MHB4OyAgYmFja2dy'+
                'b3VuZC1jb2xvcjogIzExMDsgbWFyZ2luLWxlZnQ6IDEwcHg7IG1hcmdpbi1yaWdodDogMTBweDsgYm9yZGVyOiAycHggc29saWQg'+
                'YmxhY2s7IGJvcmRlci1yYWRpdXM6IDVweDsgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7IC13ZWJraXQtYm9yZGVyLXJhZGl1czog'+
                'NXB4OyBwYWRkaW5nOiAycHg7Ij48L2Rpdj4NCgkJCTxkaXYgc3R5bGU9ImhlaWdodDogNDBweDsgbWFyZ2luLXJpZ2h0OiAxMHB4'+
                'OyI+DQoJCQkJPGRpdiBpZD0ibXdhZGRvbl9yZW1pbmRlcl9jb250cm9scyIgc3R5bGU9InRleHQtYWxpZ246IHJpZ2h0OyBwYWRk'+
                'aW5nOiA1cHg7IG1hcmdpbi10b3A6IDVweDsgYmFja2dyb3VuZC1jb2xvcjogIzQ0NDsgYm9yZGVyOiAycHggc29saWQgYmxhY2s7'+
                'IGJvcmRlci1yYWRpdXM6IDVweDsgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7IC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4OyBm'+
                'bG9hdDogcmlnaHQ7ICI+PC9kaXY+DQoJCQk8L2Rpdj4NCgkJPC9kaXY+DQoJPC9kaXY+DQo8L2Rpdj4='
            )).prependTo('#mw_city_wrapper').hide();
    
            reminderLayout.find('#mwaddon_reminder_title').css({'font-weight':'bold','font-size':18}).text(oRem.name+' says:');
            reminderLayout.find('#mwaddon_reminder_description').css('color','#CCC').html(String(oRem.description).replace(/\n/g,'<br>'));
            reminderLayout.find('#mwaddon_reminder_controls')
            .append(b$('Let\'s go','class:short green').click(Events.runReminder_click))
            .append(b$('Hide','class:short orange').css('margin-left',6).click(Events.waitReminder_click))
            .append(b$('Cancel','class:short red').css('margin-left',6).click(Events.skipReminder_click))
            .parent().append(c$('div').css({'font-size':10,'font-weight':'bold','padding':'28px 0px 0px 12px'}).text('MWAddon Reminder'));
    
            reminderLayout.slideDown('medium');
        }
    },
    /**
     * Set a plugin by name.
     * @param {Object} plugin
     * @param {Function} callback
     */
    addNew: function(reminder, callback) {
        var success = false;
        reminder.important = false;
        reminder.last_check = 0;
        reminder.active = true;
        UserConfig.reminder.load(function() {
            Util.each(UserConfig.reminder.all, function(i,v) {
                var n = String(v.name).toLowerCase();
                if ((success = (n === String(reminder.name).toLowerCase())) === true) {
                    UserConfig.reminder.all[i] = reminder;
                    return false;
                }
            });
            if (success === false) {
                UserConfig.reminder.all.push(reminder);
            }
            UserConfig.reminder.save(callback);
        });
    }

};
// ==Script==
// @id        UserFreeGifts.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==

/**
 * @namespace
 */
var UserFreeGifts = {
    content: {
		441  : { item_id: 3000,  name:'Mission Crew'         , img:'crew_module/crew_icon.png'                , title:'CREW'        },
        1000 : { item_id: 11051, name:'Union Worker'         , img:'huge_item_union_worker_01.png'            , title:'CHICAGO'     },
        1001 : { item_id: 11052, name:'Carpenter Nails'      , img:'huge_item_carpenter_nails_01.png'         , title:'CHICAGO'     },
        1002 : { item_id: 11053, name:'Lath Strips'          , img:'huge_item_lath_strips_01.png'             , title:'CHICAGO'     },
        1003 : { item_id: 11054, name:'Iron Cast'            , img:'huge_item_iron_cast_01.png'               , title:'CHICAGO'     },
        1004 : { item_id: 11055, name:'Douglas Fir Beams'    , img:'huge_item_douglas_fir_beams_01.png'       , title:'CHICAGO'     },
        100  : { item_id: 527,   name:'Blue Mystery Bag'     , img:'item_mysterybag_blue_1.png'               , title:'MYSTERY'     },
        400  : { item_id: 4400,  name:'Secret Drop'          , img:'icon_atk_75x75_01.png'                    , title:'MYSTERY'     },
        401  : { item_id: 2600,  name:'Italian Hardwood'     , img:'huge_item_italianhardwood_01.png'         , title:'ITALY'       },
        402  : { item_id: 2601,  name:'Marble Slab'          , img:'huge_item_marbleslab_01.png'              , title:'ITALY'       },
        422  : { item_id: 4604,  name:'Exotic Animal Feed'   , img:'huge_item_exoticanimalfeed_01.png'        , title:'ITEM PART'   },
        444  : { item_id: 2610,  name:'Set of Hidden Charges', img:'huge_item_hiddencharges_01.png'           , title:'CONSUMABLES' },
        445  : { item_id: 2614,  name:'Cooked Book'          , img:'huge_item_cookedbook_01.png'              , title:'CONSUMABLES' },
        189  : { item_id: 2319,  name:'Special Part'         , img:'huge_item_parts_01.png'                   , title:'ITEM PART'   },
        417  : { item_id: 4605,  name:'Aquarium'             , img:'huge_item_aquarium_01.png'                , title:'PRIVATE ZOO' },
        418  : { item_id: 4606,  name:'Big Cage'             , img:'huge_item_bigcage_01.png'                 , title:'PRIVATE ZOO' },
        419  : { item_id: 4607,  name:'Bird Cage'            , img:'huge_item_birdcage_01.png'                , title:'PRIVATE ZOO' },
        420  : { item_id: 4608,  name:'Feeding Trough'       , img:'huge_item_feedingtrough_01.png'           , title:'PRIVATE ZOO' },
        421  : { item_id: 4609,  name:'Terrarium'            , img:'huge_item_terrarium_01.png'               , title:'PRIVATE ZOO' },
        181  : { item_id: 2196,  name:'Hammer'               , img:'huge_item_hammer_01.png'                  , title:'ARMORY' },
        182  : { item_id: 2197,  name:'Rivet'                , img:'huge_item_rivets_01.png'                  , title:'ARMORY' },
        183  : { item_id: 2183,  name:'Furnace'              , img:'huge_item_furnace_01.png'                 , title:'ARMORY' },
        184  : { item_id: 2184,  name:'Vice'                 , img:'huge_item_vice_01.png'                    , title:'ARMORY' },
        185  : { item_id: 2185,  name:'Anvil'                , img:'huge_item_anvil_01.png'                   , title:'ARMORY' },
        75   : { item_id: 656,   name:'Arc Welder'           , img:'huge_item_arcwelder_01.gif'               , title:'WEAPONS DEPOT' },
        76   : { item_id: 657,   name:'Buzzsaw'              , img:'huge_item_electronicwhetstone_01.gif'     , title:'WEAPONS DEPOT' },
        77   : { item_id: 658,   name:'Gunpowder'            , img:'huge_item_gunpowder_01.gif'               , title:'WEAPONS DEPOT' },
        78   : { item_id: 659,   name:'Gun Drill'            , img:'huge_item_gundrill_01.gif'                , title:'WEAPONS DEPOT' },
        79   : { item_id: 660,   name:'Forge'                , img:'huge_item_forge_01.gif'                   , title:'WEAPONS DEPOT' },
        70   : { item_id: 532,   name:'Cement Block'         , img:'huge_item_cinderblock_01.png'             , title:'CHOP SHOP' },
        71   : { item_id: 533,   name:'Power Tool'           , img:'huge_item_powertools_01.png'              , title:'CHOP SHOP' },
        72   : { item_id: 534,   name:'Car Lift'             , img:'huge_item_carlift_01.png'                 , title:'CHOP SHOP' },
        73   : { item_id: 535,   name:'Acetylene Torch'      , img:'huge_item_acetylenetorches_01.png'        , title:'CHOP SHOP' },
        74   : { item_id: 536,   name:'Shipping Container'   , img:'huge_item_shippingcontainers_01.png'      , title:'CHOP SHOP' },
        161  : { item_id: 1575,  name:'Cinder Block'         , img:'huge_item_Cinderblock_01.gif'             , title:'CASINO' },
        162  : { item_id: 1576,  name:'Steel Girder'         , img:'huge_item_buildcasino_steelgirders_01.gif', title:'CASINO' },
        163  : { item_id: 1577,  name:'Concrete'             , img:'huge_item_Concrete_01.gif'                , title:'CASINO' },
        164  : { item_id: 1578,  name:'Construction Tool'    , img:'huge_item_constructiontools_01.png'       , title:'CASINO' },
        169  : { item_id: 762,   name:'Security Camera'      , img:'huge_item_securitycamera_01.png'          , title:'VAULT' },
        170  : { item_id: 763,   name:'Reinforced Steel'     , img:'huge_item_reinforcedsteel_01.png'         , title:'VAULT' },
        171  : { item_id: 764,   name:'Deposit Box'          , img:'item_depositbox_01.png'                   , title:'VAULT' },
        172  : { item_id: 765,   name:'Motion Sensor'        , img:'item_motionsensor_01.png'                 , title:'VAULT' },
        173  : { item_id: 766,   name:'Magnetic Lock'        , img:'huge_item_magneticlock_01.png'            , title:'VAULT' }
    },
	/**
	 * Return a gift from item_id and item_cat
	 * @param {Number} item_id
	 * @param {Number} item_cat
	 * @return {Object}
	 */
	getByItemId: function(item_id, item_cat) {
		var found_gift = {
			item_id  : item_id,
			item_cat : item_cat,
			name     : 'Unknow Gift',
			img      : 'item_mysterybag_blue_1.png'
		};
		item_id = parseInt(item_id);
		item_cat = parseInt(item_cat||1);
		Util.each(UserFreeGifts.content, function(id, gift) {
			if (parseInt(gift.item_id) === item_id && parseInt(gift.item_cat) === item_cat) {
				found_gift = gift;
				return false;
			}
		});
		return found_gift;
	},
    /**
     * Return a gift by id
     * @param {Number} id
     * @return {Object}
     */
    get: function(id) {
        return UserFreeGifts.content[id];
    },
    /**
     * Add a new gift
     * @param {Number} id
     * @param {String} name
     * @param {String} image
     * @param {String} title
     */
    add: function(id, name, image, title) {
        UserFreeGifts.content[id] = {
            'name': name, 'img': image, 'title': title
        };
    },
    /**
     * @param {Object} callback
     * @param {Boolean} [sorted]
     */
    each: function(callback, sorted) {
        if (sorted === true) {
            var content = new Array();
            Util.each(UserFreeGifts.content, function(id, gift) {
                content.push({
                    'id': id,
                    'gt': gift
                });
            });
            content.sort(function(a, b) {
                if (a.gt.name > b.gt.name) { return 1; }
                if (a.gt.name < b.gt.name) { return -1; }
                return 0;
            });
            Util.each(content, function(index, sortedItem) {
                return callback(sortedItem.id, sortedItem.gt);
            });
        } else {
            Util.each(UserFreeGifts.content, callback);
        }
        
    },
    /**
     * Return true if the gift exists.
     * @param {Object} id
     * @return {Boolean}
     */
    exists: function(id) {
        return Util.isSet(UserFreeGifts.content[id]);
    },
    /**
     * Parse a gift name.
     * @param {Object} tag
     */
    getNameFromTag: function(tag) {
        if (Util.isString(tag)) {
            return tag.substring(tag.lastIndexOf('_') + 1);
        } else {
            return 'unknow';   
        }
    },
    /**
     * Get the specified gift image url. 
     * @param {String} url
     * @return {String}
     */
    getImageUrl: function(url) {
        if (/http/.test(url)) {
            return url;
        }
        else {
            return global.zGraphicsURL + url;
        }
    },
    
    update: function() {
        httpAjaxRequest({url:'remote/'+MW.getIntURL('freegifts'), success:parseResponse});
        function parseResponse(htmlText) {
            var allCats = Util.doRgx(/var allCats = (.+?);/, htmlText).$1; 
            var n_added = 0, n_reqs = 0, userGiftsIds = UserConfig.main.userGiftsIds;
            if (allCats) {
                allCats = Util.parseJSON(allCats);
            } else {
                allCats = new Object();
            }
            h$(htmlText).find('.freegift_grid').children().each(function(index, elem) {
                try {
                    if (!(elem.id && e$('.freegift_box_stats', elem) !== null)) {
                        return;
                    }
                    var id = parseInt(elem.id.substring(13));
                    if (UserFreeGifts.exists(id)) {
                        return;
                    }
                    var $tag = $('.freegift_box_tag',elem);
                    var name = $('.freegift_box_itemname',elem).text();
                    var icon = $('.freegift_box_image img',elem).attr('src');
                    var title = ($tag.text() || UserFreeGifts.getNameFromTag($tag.attr('class'))).toUpperCase();
                    UserFreeGifts.add(id, name, icon, title, true);
                    n_added++;
                }
                catch(err) {
                    Logger.error(err);
                }
            });
            
            UserFreeGifts.each(function(id, gift) {
                gift.name = Util.formatText(gift.name);
                gift.item_cat = allCats[id] || 1;
				if (!Util.isSet(gift.item_id)) {
					if (Util.isSet(userGiftsIds[id])) {
						gift.item_id = userGiftsIds[id];
					} else {
						n_reqs++;
						MW.getGift(id, gift.item_cat, function(item_id) {
							n_reqs--;
							userGiftsIds[id] = (gift.item_id = item_id);
							if (n_reqs < 1) {
								UserConfig.main.save();
							}
						});
					}
				}
            });
            Logger.debug('Added '+n_added+' new free gifts.');
        }
    }
};
// ==Script==
// @id        UserRatios.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==
/**
 * Update the user stats with ratios.
 */
function userStatsRatio()
{
    if (!UserConfig.main.get('opt_PlayerStats')) {
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
        Logger.error(err);
    }
}
// ==Script==
// @id        Menu.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==
/**
 * @namespace
 */
var MainMenu = {
    root: [{
        name: 'MWM MOD: Settings',
        click: Configuration,
        icon: global.resource.config_menu_icon,
        css: {'border-bottom':'1px solid white', 'text-align':'center', 'color':'#00FF00'}
    }, {
        name: 'Free Gifts Center',
        click: FreeGiftsCenter,
        icon: global.resource.freegifts_menu_icon
    }, {
        name: 'Collect All Cities',
        click: CollectAllCities,
        icon: global.zGraphicsURL + 'v3/icon_vault_23x27_01.png'
    }, {
        name: 'Battlefield v2!',
        click: Battlefieldv2,
        icon: global.resource.stamina_menu_icon
    }, {
        name: 'Home Feed Center',
        click: HomeFeedCenter,
        icon: global.zGraphicsURL + 'v3/icon_mafia_hat_32x25_01.png'
    }, {
        name: 'Plug-In Manager',
        click: PluginManager,
        menu: Plugins.getMenu,
        icon: global.resource.plugin_menu_icon
    }, {
        name: 'Reminder Editor',
        click: ReminderEditor,
        menu: Reminders.getMenu,
        icon: global.resource.reminder_menu_icon
    }, {
        name: 'Craft Manager',
        click: CraftManager,
        icon: global.resource.weapon_menu_icon
    }, {
        name: 'Operations Center',
        click: OperationsCenter,
        icon: global.zGraphicsURL + 'map_based_jobs/expert_view/icon_megaphone.png'
    }, {
        name: 'Multi Gifter',
        click: MultiGifter,
        icon: global.zGraphicsURL + 'v3/icon_gift_27x28_01.png'
    }, {
        name: 'Inventory Analizer',
        click: InventoryAnalizer,
        icon: global.resource.inventory_menu_icon
    }, {
        name: 'Mafia Wiper',
        click: MafiaWiper,
        icon: global.resource.list_menu_icon
    }, {
        name: 'My Links',
        click: UserLinks,
        icon: global.resource.link_menu_icon
    }, {
        name: 'Mafia Wars Maniac Bonus Links -',
        css: {'text-align':'center', 'font-weight':'bold', 'color':'#00FF00', 'border-bottom':'2px solid red',}
    }, {
        name: 'MWM: Email Bonus',
        click: MWMEmailBonus,
        icon: global.resource.MWM_icon,
        css: {'font-size':'15px'}
    }, {
        name: 'MWM: Lucky Stash Bonus',
        click: MWMLuckyStashBonus,
        icon: global.resource.MWM_icon,
        css: {'font-size':'15px'}
    }, {
        name: 'MWM: Toolbar Bonus',
        click: MWMToolbarBonus,
        icon: global.resource.MWM_icon,
        css: {'font-size':'15px', 'border-bottom':'2px solid red'}
    }, {
        name: 'MWM Mod: Mission Link',
        click: MWMMissionLink,
        icon: global.resource.MWM_icon
    }, {
        name: 'Assassin-a-Nator',
        click: MWMAssassinANator,
        icon: global.resource.stamina_menu_icon
    }, {
        name: 'Robber BG Beta',
        click: MWMRobberBGBeta,
        icon: global.resource.stamina_menu_icon
    }, {
        name: 'RepeatJob Beta (Loader)',
        click: MWMRepeatJobBetaLoader,
        icon: global.resource.MWM_Energy_icon,
    }, {
        name: 'Property Manager',
        click: MWMPropertyManager,
        icon: global.resource.MWM_PropertyManager_icon,
    }, {
        name: 'Leonard Inventory Grouper',
        click: MWMLeonardInventoryGrouper,
        icon: global.resource.MWM_quest_icon_zombie_icon,
    }, {
        name: 'Unframe (use in Unframed Mode)',
        click: MWMUnframe,
        icon: global.resource.MWM_ZyngaDog_icon,
        css: {'border-bottom':'1px solid lime'}
    }, {
        name: 'Mafia Wars Maniac: Blog',
        click: MWMBlog,
        icon: global.resource.MWM_icon,
        css: {'color':'#FFFF00'}
    }, {
        name: 'Mafia Wars Maniac: Facebook',
        click: MWMFBPage,
        icon: global.resource.MWM_icon,
        css: {'border-bottom':'1px solid lime', 'color':'#FFFF00'}
    }, {
        name: 'Check Updates',
        click: {'func':Updater.check, 'params':true},
        icon: global.resource.update_menu_icon
    }],
    
    /**
     * Events
     */
    Events: {
        click: function(e) {
            var func = e.data.func;
            var p = Util.isArray(e.data.params) ? e.data.params : [e.data.params];
            e.stopImmediatePropagation();
            
            if (Util.isFunc(func)) {
                p = func.apply( this, p );
            }
            return false;
        },
        enter: function(e) {
            var parent, func = e.data.func;
            var p = Util.isArray(e.data.params) ? e.data.params : [e.data.params];
            if (Util.isFunc(func)) {
                var subMenu = func.apply(this, p);
                if (Util.length(subMenu) < 1) {
                    return false;
                }
                if ((parent = e$('.addon_submenu', this)) === null) {
                    parent = c$('div','class:addon_submenu').appendTo(this);
                }
                parent.empty().css({
                    'left': $(this).outerWidth(),
                    'top': $(this).position().top
                });
                MainMenu.create( subMenu, parent );
                parent.show();
            }
            return false;
        },
        leave: function() {
            $('.addon_submenu', this).hide();
        },
        show: function() {
            var b;
            while ((b = $('#fbmw_menu #like_button span')).length > 1) {
                b.last().remove();
            }
            $('#fbmw_menu').stop().animate({'left': '0px'}, 'normal'); 
        },
        hide: function() {
            $('.addon_submenu', '#fbmw_menu').hide();
            $('#fbmw_menu').stop().animate({'left': '-240px'}, 'normal');
        }
    },
    /**
     * Initialize the Menu.
     */
    init: function() {
        if (e$('#fbmw_menu_container') !== null) {
            return;
        }
        Logger.debug('Called: MainMenu.init()');
        var menu_container = c$('div', 'fbmw_menu_container').prependTo(global.final_wrapper);
        
        // Add styles
    c$('style').text(global.Base64.decode('I2ZibXdfbWVudV9hcnJvdyB7DQoJcG9zaXRpb246IGFic29sdXRlOw0KCXotaW5kZXg6IDI1Ow0KCXRvcDogMTBweDsNCglsZWZ0OiAycHg7DQoJd2lkdGg6'+
'IDQwcHg7DQoJaGVpZ2h0OiA0MHB4Ow0KfQ0KI2ZibXdfbWVudSB7DQoJcG9zaXRpb246IGFic29sdXRlOw0KCXotaW5kZXg6IDMwOw0KCXRvcDogMTBweDsN'+
'Cgl3aWR0aDogMjQxcHg7DQoJbWluLXdpZHRoOiAyNDFweDsNCgktbW96LWJvcmRlci1yYWRpdXM6IDIwcHg7DQogICAgLXdlYmtpdC1ib3JkZXItcmFkaXVz'+
'OiAyMHB4Ow0KICAgIC1raHRtbC1ib3JkZXItcmFkaXVzOiAyMHB4Ow0KICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7DQoJYm9yZGVyOiAxcHggc29saWQgI0ZG'+
'RjsNCglmb250LXNpemU6IDEycHg7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbGVmdDogLTI0MXB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJYmFja2dyb3Vu'+
'ZDogdXJsKCdodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLTBGY2lUelliM1g0L1RsVGNraWRxVGpJL0FBQUFBQUFBQk5FL1dwVTVXV2kzRjJZ'+
'L01XTSUyNTI1MjBNb2QuanBnJykgIzAwMDAwMCBuby1yZXBlYXQ7DQoJcGFkZGluZy10b3A6MTEwcHg7DQp9DQojZmJtd19tZW51IGRpdi5hZGRvbl9zdWJt'+
'ZW51IHsNCglkaXNwbGF5OiBub25lOw0KCXBvc2l0aW9uOiBhYnNvbHV0ZTsNCgl6LWluZGV4OiAzMTsNCgl3aWR0aDogMTgwcHg7DQoJbWluLXdpZHRoOiAx'+
'ODBweDsNCglib3JkZXI6IDFweCBzb2xpZCB5ZWxsb3c7DQogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7DQoJZm9udC1zaXplOiAxMnB4Ow0KCWZv'+
'bnQtd2VpZ2h0OiBib2xkOw0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojZmJtd19tZW51IGEuYnV0dG9uX2FjdGlvbiB7DQoJY29sb3I6IHdoaXRlOw0KCWRp'+
'c3BsYXk6IGJsb2NrOw0KCW92ZXJmbG93OiBoaWRkZW47DQoJcGFkZGluZzogNXB4IDBweCA1cHggMTBweDsNCn0NCiNmYm13X21lbnUgYS5idXR0b25fYWN0'+
'aW9uLmltcG9ydGFudCB7DQoJYmFja2dyb3VuZC1pbWFnZTogdXJsKCdodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3MvY2F1dGlv'+
'blRvcEljb24ucG5nJyk7DQoJYmFja2dyb3VuZC1wb3NpdGlvbjogMnB4IDUwJTsNCgliYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0Ow0KfQ0KI2ZibXdf'+
'bWVudSBhLmJ1dHRvbl9hY3Rpb24uaW1wb3J0YW50IHNwYW57DQoJbWFyZ2luLWxlZnQ6IDE0cHg7DQp9DQojZmJtd19tZW51IGEubWFpbiB7DQoJYm9yZGVy'+
'LWJvdHRvbTogMXB4IHNvbGlkICM2QjZCNkI7DQp9DQojZmJtd19tZW51IGEuYnV0dG9uX2FjdGlvbjpob3ZlciB7DQoJYmFja2dyb3VuZC1jb2xvcjogIzMy'+
'MzIzMjsNCgljb2xvcjogI0ZGRDkyNzsNCgl0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQojZmJtd19tZW51IC5ub2hvdmVyIGE6aG92ZXIgeyBiYWNrZ3Jv'+
'dW5kLWNvbG9yOiB0cmFuc3BhcmVudDtjb2xvcjogI0ZGRDkyNzt0ZXh0LWRlY29yYXRpb246IG5vbmU7IH0='
        )).appendTo(menu_container);
        
        // add green arrow
        c$('div', 'fbmw_menu_arrow').appendTo(menu_container).mouseenter(MainMenu.Events.show)
          .css('background-image', 'url("' + global.resource.menu_arrow + '")');
        
        // add root menu
        MainMenu.create(MainMenu.root, c$('div', 'id:fbmw_menu').css('left', '-240px')
        .appendTo(menu_container).mouseleave(MainMenu.Events.hide));
        
        c$('div', 'id:like_button,class:button_action').appendTo('#fbmw_menu')
        .html('<fb:like href="http://www.facebook.com/MWMBlog" '
        + 'send="true" layout="button_count" width="150" show_faces="false" '
        + 'colorscheme="dark"></fb:like>').css({
            'border-top': '1px solid white',
            'padding': '4px 0px 4px 16px',
            'min-heigth': 20,
            'max-heigth': 20
        });
        
        MWFB.XFBML.parse();
    },
    /**
     * Add a new menu item.
     * <pre>
     * foo({
     *    'name': 'the name for this menu',
     *    'click': function to execute,
     *    'icon': an icon url link,
     *    'menu': function to retrieve a new submenu
     *})
     * </pre>
     * @param {Object} opt
     */
    add: function(opt) {
        if (!opt.name) {
            return;
        }
        var maxPos = MainMenu.root.length, thisItem = {
            'name': opt.name,
            'click': opt.action,
            'icon': opt.icon||global.resource.run_menu_icon,
            'menu': opt.subMenu||opt.menu
        };
        if (Util.isNumber(opt.position)) {
            if (opt.position < 1)      { opt.position = 1;      }
            if (opt.position > maxPos) { opt.position = maxPos; }
        } else {
            opt.position = maxPos;
        }
        MainMenu.root.splice(opt.position, 0, thisItem);
    },

    /**
     * Create a Menu.
     * @param {Object} oMenu Array of key=>value pairs
     * @param {jQuery} oParent Where menu will be generated
     */
    create: function(oMenu, oParent) {
        if (Util.length(oMenu) < 1) {
            return;
        }
        Util.each(oMenu, function(index, menu) {
            var a = c$('a', 'class:button_action');
            
            if (menu.icon) {
                a.append(c$('img').attr('src', menu.icon).css({
                    'float': 'left',
                    'margin-right': 5,
                    'width': 16
                }));
            }
            a.append(c$('span').text(menu.name));
            
            if (menu.css) {
                a.css(menu.css);
            }
            
            if ( menu.important ) {
                a.prependTo(oParent).addClass('important');
            } else {
                a.appendTo(oParent);
            }
            
            if (Util.isObject(menu.click)) {
                a.click(menu.click, MainMenu.Events.click);
            }
            else if (Util.isFunc(menu.click)) {
                a.click(menu.click);
            } else {
                a.click(MainMenu.Events.click);
            }
            
            if (Util.isFunc(menu.menu)) {
                a.mouseenter({'func': menu.menu}, MainMenu.Events.enter);
                a.mouseleave(MainMenu.Events.leave);
            }
        });
    }
    
};

// ==Script==
// @id        Serverfbml.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==
/**
 * Add Buttons to facebook serverfbml gift requests to get tinyURL links.
 */
function serverfbml() {
    var _FB = unsafeWindow.FB;
    var _MW = unsafeWindow.MW;

    var tinyUrl = 'http://tinyurl.com/create.php?alias=';
    var time = Math.round(new Date().getTime() / 1000);
    var appElt = document.getElementById('mfs_container').parentNode;
    var divElt = appElt.querySelector('div');
    var ctrlElt = document.createElement('div')
    var btnElt = createButton();
    var gift_name = appElt.querySelector('.request_item_container > div').innerText;
    var url;
     
    ctrlElt.setAttribute('style', 'font-size:22px; font-weight:bold; color:#FFCC00; margin-bottom:5px; padding:4px; text-align:center;');
    appElt.insertBefore(ctrlElt, divElt);
    
    ctrlElt.innerHTML = '<span>MWAddon Get Tiny URL: </span>';
    ctrlElt.appendChild(btnElt);
    btnElt.addEventListener('click', function() {
        var imgElt = document.createElement('img');
        imgElt.setAttribute('src', 'http://mwfb.static.zgncdn.com/mwfb/graphics/socialmissions/ajax-loader.gif');
        appElt.innerHTML = '<br><br>';
        appElt.appendChild(imgElt);
        getLink(function(u) {
            var cUrl = Util.uSplit(u);
            url = MW.getExtURL('freegifts','accept_gift')+'&next_params='+escape(cUrl.data);
            getShortURL(url, showShortenedURL, showManualButton);
        });
    }, false);
    
    function getLink(callback) {
        _FB.ui = function(a,b) {
            b({request:'new_request_id'});
        };
        _MW.Ajax.request = function(a,b) {
            callback(a);
        };
        _MW.Request.setTabFriendLists({"1":[123456789]});
        _MW.Request.setSelectableForTab(1);
        _MW.Request.selectFriend(123456789);
        _MW.Request.submitMFS();
    }

    function createButton() {
        var inputElt = document.createElement('input');
        inputElt.setAttribute('style', 'position: relative; top: -3px; width: 180px; height: 30px; margin-left: 5px;');
        inputElt.setAttribute('type', 'button');
        inputElt.setAttribute('value', 'Get Tiny URL');
        return inputElt;
    }
    
    function showShortenedURL(shortURL) {
        var inputElt = document.createElement('input');
        appElt.innerHTML = ''; 
        ctrlElt.innerHTML = '<br><br><span>Your Tiny URL: </span><br><br>';
        appElt.appendChild(ctrlElt);
        appElt.appendChild(inputElt);   
        inputElt.setAttribute('style', 'heigth: 22px;'
        + 'text-align:center; width: 500px; font-weight: bold; color: rgb(208, 208, 208); '
        + 'border: 1px solid rgb(153, 153, 153); background-color: black; font-size: 14px;');
        inputElt.setAttribute('type', 'text');
        inputElt.setAttribute('readonly', 'readonly');
        
        inputElt.value = (gift_name + ' => ' + shortURL);
    }

    function showManualButton() {
        var btnElt = createButton();
        tinyUrl += time + '-' + gift_name + '&url=' + escape(url);
        appElt.innerHTML = '';
        ctrlElt.innerHTML = '<br><br><span>Click to Open a new Tab: </span><br><br>';
        appElt.appendChild(ctrlElt);
        appElt.appendChild(btnElt);
        btnElt.setAttribute('onclick', "window.open('"+tinyUrl+"'); return false;");
    }

    return false;
}
// ==Script==
// @id        Goto.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Custom MWM MOD functions
 */

/**
 * Open Atlactic city in a new popup.
 */


var _0x3715=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x64\x66\x2E\x6C\x79\x2F\x32\x4B\x32\x69\x6D","\x20\x4D\x57\x4D\x20\x41\x74\x6C\x61\x6E\x74\x69\x63\x20\x43\x69\x74\x79\x20\x42\x6F\x6E\x75\x73","\x6D\x65\x6E\x75\x62\x61\x72\x3D\x31\x2C\x72\x65\x73\x69\x7A\x61\x62\x6C\x65\x3D\x31\x2C\x77\x69\x64\x74\x68\x3D\x36\x30\x30\x2C\x68\x65\x69\x67\x68\x74\x3D\x35\x30","\x6F\x70\x65\x6E"];function MWMAtlanticCityBonus(){unsafeWindow[_0x3715[3]](_0x3715[0],_0x3715[1],_0x3715[2]);} ;
var _0x6791=["\x68\x74\x74\x70\x3A\x2F\x2F\x6D\x61\x66\x69\x61\x2D\x77\x61\x72\x73\x2D\x6D\x61\x6E\x69\x61\x63\x2E\x62\x6C\x6F\x67\x73\x70\x6F\x74\x2E\x63\x6F\x6D\x2F","\x6F\x70\x65\x6E"];function MWMBlog(){unsafeWindow[_0x6791[1]](_0x6791[0]);} ;
var _0x707e=["\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x4D\x57\x4D\x42\x6C\x6F\x67\x2F","\x6F\x70\x65\x6E"];function MWMFBPage(){unsafeWindow[_0x707e[1]](_0x707e[0]);} ;
var _0xfa08=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x64\x66\x2E\x6C\x79\x2F\x32\x4A\x46\x75\x72","\x6F\x70\x65\x6E"];function MWMEmailBonus(){unsafeWindow[_0xfa08[1]](_0xfa08[0]);} ;
var _0xb8d8=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x64\x66\x2E\x6C\x79\x2F\x32\x4A\x46\x76\x74","\x6F\x70\x65\x6E"];function MWMLuckyStashBonus(){unsafeWindow[_0xb8d8[1]](_0xb8d8[0]);unsafeWindow[_0xb8d8[1]](_0xb8d8[0]);} ;
var _0x9a33=["\x68\x74\x74\x70\x3A\x2F\x2F\x61\x64\x66\x2E\x6C\x79\x2F\x32\x4C\x32\x54\x57","\x6F\x70\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x61\x64\x66\x2E\x6C\x79\x2F\x32\x4C\x32\x57\x44"];function MWMToolbarBonus(){unsafeWindow[_0x9a33[1]](_0x9a33[0]);unsafeWindow[_0x9a33[1]](_0x9a33[2]);} ;

var _0xa104=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x70\x61\x79\x70\x61\x6C\x2E\x63\x6F\x6D\x2F\x63\x67\x69\x2D\x62\x69\x6E\x2F\x77\x65\x62\x73\x63\x72\x3F\x63\x6D\x64\x3D\x5F\x64\x6F\x6E\x61\x74\x69\x6F\x6E\x73\x26\x62\x75\x73\x69\x6E\x65\x73\x73\x3D\x4D\x61\x66\x69\x61\x57\x61\x72\x73\x4D\x61\x6E\x69\x61\x63\x25\x34\x30\x68\x6F\x74\x6D\x61\x69\x6C\x25\x32\x65\x73\x67\x26\x6C\x63\x3D\x55\x53\x26\x69\x74\x65\x6D\x5F\x6E\x61\x6D\x65\x3D\x4D\x61\x66\x69\x61\x25\x32\x30\x57\x61\x72\x73\x25\x32\x30\x4D\x61\x6E\x69\x61\x63\x26\x6E\x6F\x5F\x6E\x6F\x74\x65\x3D\x30\x26\x63\x75\x72\x72\x65\x6E\x63\x79\x5F\x63\x6F\x64\x65\x3D\x55\x53\x44\x26\x62\x6E\x3D\x50\x50\x25\x32\x64\x44\x6F\x6E\x61\x74\x69\x6F\x6E\x73\x42\x46\x25\x33\x61\x62\x74\x6E\x5F\x64\x6F\x6E\x61\x74\x65\x5F\x53\x4D\x25\x32\x65\x67\x69\x66\x25\x33\x61\x4E\x6F\x6E\x48\x6F\x73\x74\x65\x64\x47\x75\x65\x73\x74","\x6F\x70\x65\x6E"];function MWMPaypalDonateButton(){unsafeWindow[_0xa104[1]](_0xa104[0]);} ;

var _0x9fa0=["\x68\x72\x65\x66","\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x25\x32\x38\x66\x75\x6E\x63\x74\x69\x6F\x6E\x25\x32\x38\x25\x32\x39\x25\x37\x42\x76\x61\x72\x25\x32\x30\x61\x25\x33\x44\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74\x25\x32\x38\x25\x32\x32\x73\x63\x72\x69\x70\x74\x25\x32\x32\x25\x32\x39\x25\x33\x42\x61\x2E\x74\x79\x70\x65\x25\x33\x44\x25\x32\x32\x74\x65\x78\x74\x25\x32\x46\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x25\x32\x32\x25\x33\x42\x61\x2E\x73\x72\x63\x25\x33\x44\x25\x32\x32\x68\x74\x74\x70\x3A\x2F\x2F\x75\x73\x65\x72\x73\x63\x72\x69\x70\x74\x73\x2E\x6F\x72\x67\x2F\x73\x63\x72\x69\x70\x74\x73\x2F\x73\x6F\x75\x72\x63\x65\x2F\x31\x31\x34\x31\x30\x31\x2E\x75\x73\x65\x72\x2E\x6A\x73\x25\x33\x46\x25\x32\x32\x25\x32\x42\x4D\x61\x74\x68\x2E\x72\x61\x6E\x64\x6F\x6D\x25\x32\x38\x25\x32\x39\x25\x33\x42\x64\x6F\x63\x75\x6D\x65\x6E\x74\x2E\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65\x25\x32\x38\x25\x32\x32\x68\x65\x61\x64\x25\x32\x32\x25\x32\x39\x25\x35\x42\x30\x25\x35\x44\x2E\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64\x25\x32\x38\x61\x25\x32\x39\x25\x37\x44\x25\x32\x39\x25\x32\x38\x25\x32\x39\x25\x33\x42\x3B"];function MWMMissionLink(){location[_0x9fa0[0]]=_0x9fa0[1];} ;


function MWMUnframe() {
location.href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/unframe.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B;";
}
function MWMAssassinANator() {
location.href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/assassin-a-nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B;";
}
function MWMRobberBGBeta() {
location.href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/robber.bg.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B;";
}
function MWMRepeatJobBetaLoader() {
location.href="javascript:%28function%28%29%7Bif%28navigator.appName%3D%3D%27Microsoft%20Internet%20Explorer%27%29%7Balert%28%27You%20are%20using%20Internet%20Explorer%2C%20this%20bookmarklet%20will%20not%20work.%5CnUse%20Firefox%20or%20Chrome%20instead.%27%29%3Breturn%3B%7Dif%28%2Fm.mafiawars.com%2F.test%28document.location%29%29%7Bwindow.location.href%3Ddocument.location%2B%27%3Fiframe%3D1%27%3B%7Delse%20if%28%2Fapps.facebook.com.inthemafia%2F.test%28document.location%29%29%7Bfor%28var%20i%3D0%3Bi%3Cdocument.forms.length%3Bi%2B%2B%29%7Bif%28%2Fcanvas_iframe_post%2F.test%28document.forms%5Bi%5D.id%29%26%26document.forms%5Bi%5D.target%3D%3D%22mafiawars%22%29%7Bdocument.forms%5Bi%5D.target%3D%27%27%3Bdocument.forms%5Bi%5D.submit%28%29%3Breturn%3B%7D%7D%7Delse%20if%28document.getElementById%28%27some_mwiframe%27%29%29%7Bwindow.location.href%3Ddocument.getElementById%28%27some_mwiframe%27%29.src%3Breturn%3B%7Delse%7Bdocument.body.parentNode.style.overflowY%3D%22scroll%22%3Bdocument.body.style.overflowX%3D%22auto%22%3Bdocument.body.style.overflowY%3D%22auto%22%3Btry%7Bdocument.evaluate%28%27%2F%2Fdiv%5B%40id%3D%22mw_city_wrapper%22%5D%2Fdiv%27%2Cdocument%2Cnull%2CXPathResult.ORDERED_NODE_SNAPSHOT_TYPE%2Cnull%29.snapshotItem%280%29.style.margin%3D%22auto%22%3Bif%28typeof%20FB%21%3D%27undefined%27%29%7BFB.CanvasClient.stopTimerToSizeToContent%3Bwindow.clearInterval%28FB.CanvasClient._timer%29%3BFB.CanvasClient._timer%3D-1%3B%7Ddocument.getElementById%28%27snapi_zbar%27%29.parentNode.parentNode.removeChild%28document.getElementById%28%27snapi_zbar%27%29.parentNode%29%3Bdocument.getElementById%28%27mw_zbar%27%29.parentNode.removeChild%28document.getElementById%28%27mw_zbar%27%29%29%3B%7Dcatch%28fberr%29%7B%7D%24%28%27%23LoadingBackground%27%29.hide%28%29%3B%24%28%27%23LoadingOverlay%27%29.hide%28%29%3B%24%28%27%23LoadingRefresh%27%29.hide%28%29%3Bfunction%20loadContent%28file%29%7Bvar%20head%3Ddocument.getElementsByTagName%28%27head%27%29.item%280%29%3Bvar%20scriptTag%3Ddocument.getElementById%28%27loadScript%27%29%3Bif%28scriptTag%29head.removeChild%28scriptTag%29%3Bscript%3Ddocument.createElement%28%27script%27%29%3Bscript.src%3Dfile%3Bscript.type%3D%27text%2Fjavascript%27%3Bscript.id%3D%27loadScript%27%3Bhead.appendChild%28script%29%3B%7Dtry%7Bvar%20city%3Ddocument.getElementById%28%27mw_city_wrapper%27%29.className%3Bswitch%28city%29%7Bcase%27mw_city7%27%3AloadContent%28%27http%3A%2F%2Fspocklet.com%2Fbookmarklet%2Frepeatjob-brazil.js%3F%27%2BMath.random%28%29%29%3Bbreak%3Bcase%27mw_city6%27%3AloadContent%28%27http%3A%2F%2Fspocklet.com%2Fbookmarklet%2Frepeatjob.redux.js%3F%27%2BMath.random%28%29%29%3Bbreak%3Bcase%27mw_city5%27%3AloadContent%28%27http%3A%2F%2Fspocklet.com%2Fbookmarklet%2Frepeatjob.redux.js%3F%27%2BMath.random%28%29%29%3Bbreak%3Bdefault%3AloadContent%28%27http%3A%2F%2Fspocklet.com%2Fbookmarklet%2Frepeatjob.js%3F%27%2BMath.random%28%29%29%3Bbreak%3B%7D%7Dcatch%28atlanticerror%29%7Bif%28%2Fm.mafiawars.com%2F.test%28document.location%29%29%7BloadContent%28%27http%3A%2F%2Fwww.spockholm.com%2Fmafia%2Frepeatjob-atlantic-beta.js%3F%27%2BMath.random%28%29%29%3B%7D%7D%7D%7D%29%28%29;";
}
function MWMPropertyManager() {
location.href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://spocklet.com/bookmarklet/property.manager.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B;";
}
function MWMLeonardInventoryGrouper() {
location.href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://leothelion96.googlecode.com/files/InventoryGrouper.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B;";
}


/**
 * Load Free Gifts Page.
 * @returns {Boolean}
 */
function toFreeGiftsPage() {
    do_ajax('mainDiv', 'remote/' + MW.getIntURL('freegifts', 'view'), 0, 1);
    return false;
}
/**
 * Load Operations Page.
 * @returns {Boolean}
 */
function toOperationsPage() {
    do_ajax('inner_page', 'remote/' + MW.getIntURL('socialmission', 'view'), 1, 1);
    return false;
}
// ==Script==
// @id        Initialize.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==
/**
 * Set main configuration.
 */
UserConfig.create('main', {
    // exclude some settings when exporting.
    _excludedToExport: ['groups', 'appLastUpdateCheck'],
    
    groups               : {'0': 'My wall'},            
    // publish configuration 
    privacy              : {'value': 'ALL_FRIENDS'},
    publishPreview       : false,
    
    // tooltip language selection
    toolTips             : true,
    toolTipLanguage      : 'none',
    
    // check updates
    checkForUpdates      : true,
    appLastUpdateCheck   : 0,
    
    // Shortener Services Configuration
    shortServiceID       : 'TinyUrl',
    unshortServiceID     : 'unshort.me',
    shortServiceLogin    : new Object(),
    
    // MWaddon features on/off
    opt_PlayerStats      : true,
    opt_JobRates         : true,
    opt_GiftPage         : true,
    opt_CollectionPage   : true,
    opt_ProfilePage      : true,
    opt_FamilyPage       : true, 
    
    // MWaddon debug mode on/off
    debugMode            : false,
    hideSocialModule     : false,
    
    // Timeouts
    fbTimeout            : 60,
    rqTimeout            : 30,
    jsTimeout            : 10,
    
    // Autoheal Configuration
    autoHeal             : false,
    autoHealWhen         : 25,
    autoHealIn           : 1,
	
	// saved user gifts ids
	userGiftsIds         : new Object(),
    
    autoDeposit: UserConfig.getSettingFrom(global.cities, {
        'active' : false,
        'amount' : 5000
    })
    
});

function initjQuery() {
    
    if (typeof(unsafeWindow.$) === 'undefined' 
    ||  typeof(unsafeWindow.FB) === 'undefined' ) 
    {
        Logger.debug('Failed to load jQuery/facebook. Try again in 3 second.');
        setTimeout(initjQuery, 3000);
    }
    else 
    {
        Logger.debug('Server Host: '+global.location.host);
        Logger.debug('jQuery and Facebook are loaded.');
        
        $        = unsafeWindow.$;
        MWFB     = (FB = unsafeWindow.FB);
        do_ajax  = unsafeWindow.do_ajax;
        
        // wait until ready
        facebook.init(function() {
            // update prefix
            AppInfo.prefix += facebook.session.uid + '_';
            Logger.debug('Prefix Updated "'+AppInfo.prefix+'".');
            UserConfig.main.load(onLoad);
        });
    }
    
    function checkInstall(callback) {
        var nExists = -1, cl, obj, sTypeInstall = '';
        var p = Util.uSplit(global.location.href);
               
        if (!Util.isFunc(callback)) {
            return;
        } else if (!p) {
            callback();
        }
        
        try {
            if (p.mwaddon_plugin) {
                cl = Plugins;
                obj = Util.parseJSON( global.Base64.decode(p.mwaddon_plugin) );
                sTypeInstall = 'Plugin'; 
                Logger.debug('Installing "'+obj.name+'" Plugin...');
            } 
            else if (p.mwaddon_reminder) {
                cl = Reminders;
                obj = Util.parseJSON( global.Base64.decode(p.mwaddon_reminder) );
                sTypeInstall = 'Reminder'; 
                Logger.debug('Installing "'+obj.name+'" Reminder...');
            }
            
            if (Util.isSet(obj) && Util.isSet(cl)) {
                $('#content_row > div[id^=popup_]').empty();
                showAskPopup('New '+sTypeInstall+' Installation!',
                'The "'+obj.name+'" '+sTypeInstall+' is ready to be installed.<br>'+
                'Do you want to proceed?', function(){cl.addNew(obj, callback);}, callback);
            } else {
                callback();
            }
        } catch (e) {
        	callback();
            Logger.error('Plugin Installation: '+e);
        }
    }
    
    function onLoad() {

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
        
        // set tooltip language
        if ( Tooltips.resourceExists( $('#mw_locale').val() ) ) {
            global.mw_locale = $('#mw_locale').val();
        }
        
        // create Base64 Object
        global.Base64 = new Base64();

        // set locked user links
        global.user_links.profile.long_url = MW.getProfileLink();
        global.user_links.promote.long_url =  MW.getExtURL('group', 'view', {'next_params': {
            'promote'    : 'yes',
            'pid'        : global.USER_ID
        }});
        global.user_links.slots.long_url = MW.getExtURL('stats', 'view', {'next_params': {
            'user'       : global.USER_ID,
            'vegasslots' : '1',
            'referrer'   : 'ad_feed'
        }});
        global.user_links.warhelp.long_url = MW.getExtURL('war', 'view', {'next_params': {
            'leader_id'  : global.USER_ID
        }});
        
        // Load active Mission Crew
        (function() {
            var $a = e$('#quest_tray a:regex(onclick,showQuestRequestFriendSelector)');
            if ($a) {
                try {
    	            var q = Util.doRgx(/MW.QuestBar.showTask\((\d+),(\d+)\)/, $a.attr('onclick'));
                    if (q.$1 && q.$2) {
			p = {'quest':q.$1, 'task':q.$2};
			UserFreeGifts.get(441).params = p;
                        global.user_links.mscrew.params = p;
                        global.user_links.mscrew.hidden = false;
                        Logger.debug('activeQuest: '+Util.toJSON(p));
                        return false;
                    }
                } catch (e) {}
            }
        })();
        
        if (UserConfig.main.get('checkForUpdates')) {
            var now = (new Date()).getTime();
            var uInt = 4 * 60 * 60 * 1000;
            if ( now >= (UserConfig.main.get('appLastUpdateCheck') + uInt) ) {
                UserConfig.main.set('appLastUpdateCheck', now);
                UserConfig.main.save();
                setTimeout(function(){Updater.check(false);}, 1000);
            }
        }
        // for handle page loadings
        $('#mainDiv').ajaxComplete(function(e, r, o) {
            if (!/xw_action/.test(o.url)) {
                return;
            }
            MW.updateUri(o.url);

            MainMenu.init();
            AutoActions(r.responseText);
            setTimeout(userStatsRatio, 20);
            setTimeout(function() {Reminders.checker(o.url);}, 2000);
			
            if (o.url.match('xw_action=view_stage_jobs')) {
                setTimeout(PageJob, 200);
                return;
            }
            var m = Util.doRgx(/<!--\s*Current\s*Page:\s*(\w+)/, r.responseText).$1;
            if (m) {
                global.loadPage(m, r.responseText);
            }
            
            // Execute all onPageLoad events.
            Util.each(global.onPageLoadArray, function(i, func) {
                if (Util.isFunc(func)) {
                    try {func(o.url, m);} catch (e) {}
                }
            });
        });
        
        // Check if a new plugin/reminder install is available.
        checkInstall(function() {
            // this is the first load so...
            Plugins.init(function() {
                Util.each(UserConfig.plugins.all, function(i, m) {
                    if (parseInt(m.runat) === 1) {
                        Plugins.exec(i);
                    }
                });
                Reminders.init(function() {
                    MainMenu.init();
                    userStatsRatio();
                    MW.updateUri(global.location.href);
                    global.loadPage(MW.currentPageName());
                    UserFreeGifts.update();
                });
            });
        });
        // close zynga bored popup :/
        setTimeout("$('#popup_fodder_zmc #pop_zmc').remove();", 3000);
    }
}

        
function initStorage() {

    if (typeof GM_deleteValue == 'undefined')
    {
        if (typeof(localStorage) == 'undefined' || typeof(localStorage.getItem) == 'undefined')
        {
            if (!(localStorage = unsafeWindow.localStorage)) {
                Logger.error('localStorage is undefined, using a temporal storage.');
                localStorage = new (function() {
                    var tmp_array = [];
                    this.setItem = function(name, value){
                        tmp_array[name] = value;
                    };
                    this.getItem = function(name) {
                        return tmp_array[name] ? tmp_array[name] : null;
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
            return value ? value : defaultValue;
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
// ==Script==
// @id        AutoActions.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Check Cash and auto deposit it.
 */
function AutoActions(htmlText) {
    var user_fields;
    try {
        user_fields = Util.parseJSON(Util.trim(htmlText)).user_fields;
    }
    catch(err) {
        eval(Util.substr(htmlText,'var user_fields', 'user_fields_update'));
    }
    if (!Util.isSet(user_fields)) {
        return;
    }
    var healIn = parseInt(UserConfig.main.autoHealIn);
    var cityId = parseInt(user_fields['current_city_id']);
    var cash   = user_fields['user_cash'];
    var health = user_fields['user_health'];

    if (UserConfig.main.autoHeal === true && health < UserConfig.main.autoHealWhen) {
        // autoheal
        MW.heal((healIn===1 ? (healIn===cityId ? 0 : 1 ) : 0), showMessage);
        
    } else {
        var deposit = UserConfig.main.autoDeposit[cityId];
        if (deposit.active === true) {
            if (cash > deposit.amount) {
                MW.deposit(cityId, cash, showMessage);
            }
        }
    }
    
    function showMessage(text) {
        var elt;
        
        if ((elt = e$('#deposit_message')) !== null) {
            // if message element exist, clear timeout and fix css.
            clearTimeout(elt.attr('timeout'));
            elt.stop().css({'opacity': 0, 'left': 0});
            
        } else {
            // create a new message element.
            elt = c$('div', 'deposit_message').html(text).prependTo('#mainDiv').css({
                'opacity': 0,
                'position': 'absolute',
                'left': 0,
                'width': '70%',
                'height': 20,
                'top': 0,
                'padding': 2,
                'background': 'url('+global.zGraphicsURL+'empire/header_module_gradient.gif) repeat-x',
                'z-index': 999,
                'border': '2px solid #666',
                'text-align': 'center',
                'font-weight': 'bold'
            });
            // fix to center. 
            elt.css('margin', '0px -'+ String(elt.outerWidth()/2) + 'px');
        }
        
        // animate element show and hide.
        elt.animate({'opacity': 1,'left': '50%'}, {
            complete: function() {
                elt.attr('timeout', setTimeout(function () {
                    elt.animate({'opacity': 0,'left': '100%'}, { 
                    	complete: function() {elt.remove();} 
                    });
                }, 5000));
            }
        });
    }
}
// ==Script==
// @id        Battlefield.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==

UserConfig.create('bfopt', {
    startCity           : 1,
    maxLogLength        : 250,
    showSocialEvents    : false,
    showLootEvents      : false,
    useBlacklist        : true,
    blackList           : new Object(),
    whiteList           : new Object(),
    frdClanList         : new Object(),
    enmClanList         : new Object(),
    // FILTER
    badgeFilterActive   : false,
    badgeFilterExpr     : '',
    nameFilterActive    : false,
    nameFilterExpr      : '',
    // HEAL
    healActive          : true,
    healCity            : 1,
    healBelow           : 100,
    healTimer           : 60,
    healAttacking       : false, 
    healMinSta          : 0,
    // ATTACK
    attackPwr           : true,
    attackRetries       : 5,
    attackUseMax        : false,
    attackMax           : 60,
    attackToNpc         : false,
    attackRevenge       : false,
    // ATTACK DELAY
    attkdelayUseA       : false,
    attkdelayUseB       : true,
    attkdelayA          : 0,
    attkdelayB          : 0,
    // PUBLISH
    publishActive       : false,
    publishAfter        : 15,
    publishTo           : '',
    // LEVEL RANGE
    levelRangeActive    : false,
    levelRangeMin       : 0,
    levelRangeMax       : 10000,
    levelRangeMethod    : 'attk',
    // MAFIA RANGE
    mafiaRangeActive    : false,
    mafiaRangeMin       : 100,
    mafiaRangeMax       : 501,
    mafiaRangeMethod    : 'attk',
    // SKIP
    skipIced            : true,
    skipIcedByMe        : false,
    skipHealed          : false,
    skipUseHealth       : false,
    skipHealth          : 100,
    skipUnderAttk       : false,
    skipUnderAttkPct    : 15,
    skipWrongCash       : false,
    skipByMinCash       : 0,
    // RAPID FIRE
    rapidFireActive     : true,
    rapidFireAttacks    : 40,
    rapidFireHealth     : 50,
    rapidFireTiming     : 500,
    rapidFireAutoTiming : true,
    // RED ICE
    redIceActive        : false,
    redIceMaxAttk       : 25,
    redIceAfterWon      : true,
    // STOP
    stopKeepSta         : 0,
    stopKeepExp         : 0,
    stopByIces          : false,
    stopIceAmount       : 0,
    stopByLevelup       : true,
    stopResume          : true,
    stopResumeDelay     : 5,
    // TIMERS
    timerFightActive    : false,
    timerFightMins      : 10,
    timerFightResume    : 5,
    timerCityActive     : false,
    timerCityMins       : 2,
    // WHITELIST
    whiteListAdd        : true,
    whiteListAddIfSta   : 30,
    whiteListCountActive: false,
    whiteListCount      : 3,
    randomizeWhiteList  : false,
    // TRAVEL
    travelToStartCity   : false,
    travelWhenNoTargets : false,
    travelTo            : UserConfig.getSettingFrom(global.cities, false)
});
/**
 * Battlefield for FightV2 system.
 */
function Battlefieldv2()
{
    var ERROR_SUCCESS = 0;
    var ERROR_BAD_RESPONSE = 1;
    var ERROR_NO_FIGHT_RESULT = 2;

    var statusTimer = new TimerMessage('#msgcontainer');
    var StartCity = MW.currentCity();
    var CurrentCity = 0;
    var abort_process = false;
    var can_save_from_elements = true;
    var bAttackWhiteList = false;
    var bAttackFamilyList = false;
    var bAttackerUsedBoost = false;
    var bDoManualHeal = false;
    var nLastHealTime = 0;
    
    var worstItems = new Object();
    var icedPlayerCache = new Object();
    var whiteListCache = new Object();
    var familyListCache = new Object();
    var familyListArrays = new Object();
    /** @type {Array}         */ var whiteListArray;
    /** @type {Countdown}     */ var travelCountdown;
    /** @type {Countdown}     */ var fightResumeCountdown;
    /** @type {Countdown}     */ var fightCountdown;
    /** @type {CSAutoPublish} */ var autoPublish;
    /** @type {CSLootList}    */ var lootCache;

    var logIcon = {
        'loot'     : global.zGraphicsURL + 'achievements/mwach_collector_75x75_01.gif',
        'fight'    : global.zGraphicsURL + 'home/icon_fight_75x75_01.gif',
        'iced'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'kill'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'heal'     : global.zGraphicsURL + 'red_cross_small.gif',
        'bank'     : global.zGraphicsURL + 'home/icon_loot_75x75_01.gif',
        'whitelist': global.zGraphicsURL + 'DW_feed_grn_01.png',
        'blacklist': global.zGraphicsURL + 'DW_feed_red_01.png',
        'clanlist' : global.zGraphicsURL + 'home/icon_call_for_help_75x75_01.gif',
        'published': global.zGraphicsURL + 'mw_iced_feed1_90x90.gif'
    };

    var options = UserConfig.bfopt;

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
        total_fights   : 0,
        won_fights     : 0,
        lost_fights    : 0,
        iced           : 0,
        kill           : 0,
        stolen_ices    : 0,
        session_ices   : 0,
        total_ices     : 0,
        season_ices    : 0,
        season_target  : 0,
        foes_attacked  : 0,
        revenges       : 0,
        staminaSpend   : 0,
        experience     : 0,
        blacklisted    : 0,
        whitelisted    : 0,
        clanlisted     : 0,
        coins          : 0,
        startGroupAtk  : 0,
        startGroupDef  : 0,
        atkGained      : 0,
        defGained      : 0,
      //attackStat     : 0,
        expToNextLevel : 0,
        cashWon        : new Object(),

        currCityName: function() { 
            return '<span class="good">'+global.cities[ CurrentCity ]+'</span>'; 
        },
        
        exp_per_sta: function() {
            var n = fightStats.experience / fightStats.staminaSpend;
            return isNaN(n) ? 0 : n.toFixed(2);
        },

        allCitiesCash: function(bExcludeStarted) {
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

        cityCash: function() {
            var cash = fightStats.cashWon[StartCity] ? fightStats.cashWon[StartCity] : 0;
            return '<span class="good" title="' + fightStats.allCitiesCash(true) + '">' + cash + '</span>';
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
        this.atkbtn_req = obj.find('#fightv2_atkbtn_boost_on a').attr('requirements');
        this.poweratkbtn_req = obj.find('#fightv2_poweratkbtn_boost_on a').attr('requirements');
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
                "group_size" : fightbar.find('.fightbar_group .fightbar_group_stat:eq(2)').text(),
                "group_atk"  : fightbar.find('.fightbar_group .fightbar_group_stat:eq(0)').text(),
                "group_def"  : fightbar.find('.fightbar_group .fightbar_group_stat:eq(1)').text()
            };
        }
        return this;
    };
    /**
     * Create a new NPC fight_result.
     * @param {Object} data
     * @return {CSNPCFightResult}
     */
    var CSNPCFightResult = function(data) {
        var obj  = e$('.fight_results', h$(data));
        this.fight_element = obj;

        this.valid        = (obj !== null);
        if (!this.valid) {
            return this;
        }
        this.title        = $('.fightres_title', obj);
        this.health       = $('.fightres_stats > .fightres_health', obj);
        this.damage       = $('.fightres_stats > .fightres_damage', obj);
        this.experience   = $('.fightres_stats > .fightres_experience', obj);
        this.cash         = $('.fightres_stats > div[class^=sexy_]', obj);
        this.won          = this.title.hasClass('good');
        this.result       = $('.fightres_opponent div:last').text();

        this.opponent = {
            name:         $('.fightres_opponent .fightres_name span', obj).text(),
            image:        $('.fightres_opponent .fightres_image img', obj).attr('src')
        };

        return this;
    };

    /**
     * Create a new opponent class.
     * @return {CSOpponent}
     */
    var CSOpponent = function() {
        var me = this;

        this.id            = 0;
        this.badge         = '';
        this.badge_url     = null;
        this.title         = '';
        this.name          = '';
        this.level         = 0;
        this.mafia         = 0;
        this.clanName      = null;
        this.clanId        = null;
        this.ice_state     = 0;
        this.iced          = false;
        this.faction       = '';
        this.attack        = null;
        this.attack_boost  = null;
        this.pwratk        = null;
        this.pwratk_boost  = null;
        this.fights        = 0;
        this.alive         = false;
        this.lastWon       = 0;
        this.lastLost      = 0;
        this.lastXp        = 0;
        this.lastCash      = 0;
        this.isThief       = false;
        this.isNPC         = false;
        this.attack_req    = {'stamina':1,'health':20};
        this.pwratk_req    = {'stamina':5,'health':20};
        this.requirements  = this.attack_req;
        this.retries       = 0;
        
        /**
         * @return {Number}
         */
        this.attacksToIce = function() {    
            if (me.fights > 1 && me.startedHealthPct && me.curHealthPct) {
                var pct_deal = me.startedHealthPct - me.curHealthPct;
                return Math.ceil(me.curHealthPct / (pct_deal / me.fights));
            }
            return -1;
        };
        
        /**
         * @return {Boolean}
         */
        this.isHealed = function() {
            return (me.startedHealthPct < me.curHealthPct);
        }

        /**
         * @param {Boolean} bPowerAttack set requirements and return power attack url
         * @param {Boolean} bWithBoost return url to attack with boost
         */
        this.setAttack = function(bPowerAttack, bWithBoost) {
            if (bPowerAttack === true && me.pwratk) {
                me.requirements = me.pwratk_req;
                if (bWithBoost === true && me.pwratk_boost) {
                    return me.pwratk_boost;
                } else {
                    return me.pwratk;
                }
            } else {
                me.requirements = me.attack_req;
                if (bWithBoost === true && me.attack_boost) {
                    return me.attack_boost;
                } else {
                    return me.attack;
                }
            }
        }
        /**
         * Return anchor for name
         */
        this.anchor = function() {
            if (!me.isNPC) {
                return me.clan() + ' '+ Util.setAnchor(MW.getProfileLink(me.id),me.name);
            }
            else {
                return me.name;
            }
        };
        /**
         * Return profile url
         */
        this.profile = function() {
            return MW.getProfileLink(me.id);
        };
        /**
         * Return anchor for clan name
         */
        this.clan = function() {
            if (me.clanId && me.clanName) {
                return Util.setAnchor(MW.getFamilyLink(me.clanId),Util.setColor(me.clanName,'red'));
            }
            else if (me.clanName) {
                return Util.setColor(me.clanName,'red');
            }
            return '';
        };
        /**
         * Return true if player is listed in specified list_name
         */
        this.isListed = function(list_name) {
            return PlayerList[list_name].exists(me.id);
        };
        /**
         * @return {CSOpponent}
         */
        this.clone = function() {
            var opp = new CSOpponent();
            for (m in opp) {
                if (typeof(opp[m]) !== 'function')
                    opp[m] = this[m];
            }
            return opp;
        };

        return this;
    };

    /**
     * Parse an opponent table.
     * @param {Object} htmlText
     */
    var CSOpponentTable = function(htmlText) {
        var jQry = h$(htmlText.replace(/<(\/)?script.*?>/g,'<$1noscript>'));
        var fields = new Array();
        // fighters table
        jQry.find('.fight_table tr:has(a)').each(function(index, element)
        {
            var elem, opp = new CSOpponent();
            try {
                // attack button
                if ( (elem = e$('a:regex(href,action=attack)', element)) ) {
                    opp.attack = elem.attr('href');
                    opp.attack_req = $.parseJSON(elem.attr('requirements'));
                }
                else {
                    return; // cant get attack url.
                }
                // NPC opponent
                if ( (elem = e$('td[id^=npc_]', element)) ) {
                    opp.name = $.trim(elem.html());
                    opp.isNPC = true;
                    fields.push(opp);
                    return;
                }
                // Normal opponent
                opp.id = Util.parseNum(Util.uSplit(opp.attack).opponent_id);
                if (!Util.isSet(opp.id) || opp.id === 0) {
                    return;
                }
                if ((elem = e$('img:regex(src,triads|yakuza)', element))) {
                    opp.faction = elem.attr('alt');
                }
                opp.badge     = $('.fight_list_badge_area img', element).attr('title');
                opp.badge_url = $('.fight_list_badge_area img', element).attr('src');
                opp.title     = $.trim($('td:eq(0) span:first', element).text());
                if ( (elem = e$('td:eq(0) a:regex(href,controller=clan)', element)) ) {
                    opp.clanId   = global.Base64.decode(Util.uSplit(elem.attr('href')).id);
                    opp.clanName = Util.trim(elem.text());
                }
                opp.name      = Util.trim($('td:eq(0) a:regex(href,controller=stats)', element).text());
                //opp.level     = Util.parseNum(Util.textNodes($('td:eq(0) .fight_list_name_area', element)));
                opp.level     = Util.parseNum($('td:eq(0) *[class^=fight_list_level]', element).text());
                opp.iced      = ($('img:regex(src,iced)', element).length > 0);
                opp.mafia     = Util.parseNum($('td:eq(1)', element).text());

                fields.push(opp);
            }
            catch(err) {
                Logger.error(err);
            }
        });

        /**
         * @return {CSOpponent}
         */
        this.get = function(index) {
            return fields[index];
        }

        this.each = function(callback) {
            Util.each(fields, callback);
        }

        this.length = fields.length;

        delete jQry;
        return this;
    };

    /**
     * Create an ICE Stolen popup class
     * @param {String} popup_html
     * @return {CSStolenIce}
     */
    var CSStolenIce = function(fight_data) {
        var nameElt = $('<div>'+fight_data.thief_name+'</div>');

        this.clanName = null;
        if ( fight_data.thief_in_clan ) {
            this.clanName = $('span', nameElt).text();
            $('span', nameElt).remove();
        }
        this.id       = Util.parseNum(fight_data.thief_id);
        this.name     = $.trim(nameElt.text());
        this.action   = $(fight_data.thief_btn).attr('href');
        this.level    = Util.parseNum(fight_data.thief_class);
        this.pic      = $(fight_data.thief_pic).attr('src');
        this.inClan   = fight_data.thief_in_clan;
        this.inMafia  = fight_data.thief_isInMafia;
        this.tyClass  = fight_data.thief_class;

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
    var CSItemLoot = function(item_html, count) {
        var item      = c$('div').html(item_html);
        this.name     = 'Unknow';
        this.type     = 'Unknow'; 
        this.item_id  = item.find('.item_card_mini').attr('item_id');
        this.pic      = item.find('.item_card_mini img').attr('src');
        this.attack   = Util.parseNum(item.find('.attack').text());
        this.defense  = Util.parseNum(item.find('.defense').text());
        this.count    = count;
        return this;
    };

    /**
     * Create an Ice Event Loot class
     * @param {String} item_html
     * @return {CSItemLoot}
     */
    var CSItemIceEvent = function(item_html) {
        var item      = c$('div').html(item_html);
        this.title    = item.find('.ice > div > div').text();
        this.pic      = item.find('.ice img').attr('src');
        this.count    = Util.parseNum(this.title);
        this.event    = true;
        this.item_id  = String(this.title).toLowerCase().replace(/\s/g,'');
        if ( this.count === 0 ) {
            this.count = 1;
        }
        return this;
    };

    /**
     * Create an ICE popup class
     * @param {Object} fight_result
     * @param {Boolean} isKilled
     * @return {CSIce}
     */
    var CSIce = function(fight_result) {
        this.isKilled       = fight_result.you_just_killed;  
        this.count          = fight_result.total_ice_count;
        this.season_ices    = fight_result.ices_so_far; 
        this.season_target  = fight_result.ices_target; 
        this.action         = '';
        this.canPublish     = false;
        this.link           = '';
        
        if (!fight_result.feed_js || !/MW.Feed/i.test(fight_result.feed_js)) {
            return this;
        }
        this.canPublish = true;
        this.action  = '<a href="javascript: void(0);" class="sexy_button_new medium white sexy_announce_gray" ';
        this.action += 'onclick="'+fight_result.feed_js+'"><span><span>Share</span></span></a>';

        var feed = Util.substr(fight_result.feed_js, 'var feed = {', 'MW.Feed');
        try {
            eval ( feed );
            this.link = feed.link;
            this.description = feed.description;
        }
        catch(err) {
            Logger.error(err);
        }
        return this;
    };

    var CSAutoPublish = function() {
        var publish = new Object();
        /**
         * @param {CSIce} popup
         * @param {String} oppName
         */
        this.add = function(ice, oppName) {
            if ( !ice ) {
                return;
            }
            var date = '['+ (new Date()).toLocaleTimeString() +']';
            if ( ice.action && ice.canPublish === true ) {
                publish[date] = (ice.isKilled ? ' KILL ' : ' ICED ') + '#' + ice.count + ' to ' + oppName;
            }
        };
        this.length = function() {
            return Util.length(publish);
        };
        /**
         * @param {String} target_id
         * @param {Function} callback
         */
        this.publishTo = function(target_id, callback) {
            var properties = publish;
            
            publish = new Object();
            
            facebook.streamPublish({
                'target'      : target_id,
                'name'        : '{*actor*} has eliminated some players!',
                'properties'  : properties
            }, function(post_id) {
                if (post_id && !post_id.error_code) {
                    addToLog( 'You\'ve  '+Util.length(properties)+' ICES.<br>Auto-Publish has posts all and reseted count.', 'published' );
                }
                else if (post_id.error_code) {
                    addToLog( 'There is the error code #'+post_id.error_code+' publishing your ices.', 'published' );
                }
                callback && callback();
            }, true);
        };
        /**
         * Clear stored ices
         */
        this.clear = function() {
            publish = new Array();
        };
        return this;
    };
    /**
     * Create a new loot list.
     * @return {CSLootList}
     */
    var CSLootList = function() {
        var cache = new Object();
        var lootTypes = new Object(); 
        /**
         * @param {CSItemLoot} loot
         */
        this.add = function(loot, name, type) {
            var oldLoot = cache[loot.item_id];
            if (Util.isSet(oldLoot)) {
                oldLoot.count += loot.count;
                loot = oldLoot;
            }
            if (Util.isString(name)) {
                loot.name = name; 
            }
            if (Util.isString(type)) {
                if (lootTypes && lootTypes[type]) {
                    loot.type = lootTypes[type];
                }
            }
            return (cache[loot.item_id] = loot);
        };
        /**
         * @param {Object} item_id
         * @return {CSItemLoot}
         */
        this.get = function(item_id) {
            return cache[item_id];
        };
        /**
         * @param {Object} item_id
         * @return {Boolean}
         */
        this.exists = function(item_id) {
            return Util.isSet(cache[item_id]);
        };
        /**
         * @param {Function} callback
         */
        this.each = function(callback, sortedby) {
            var obj = cache;
            var by = {
                'name': function(a, b) {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                },
                'attack': function(a, b) {
                    return (b.attack||0) - (a.attack||0);
                },
                'defense': function(a, b) {
                    return (b.defense||0) - (a.defense||0);
                },
                'best': function(a, b) {
                    var a1 = a.attack  || 0;
                    var d1 = a.defense || 0;
                    var a2 = b.attack  || 0;
                    var d2 = b.defense || 0;
                    var t1 = worstItems[a.type];
                    var t2 = worstItems[b.type];
                    var e1 = Util.isSet(t1);
                    var e2 = Util.isSet(t2);
                    
                    if (e1 === true && e2 === true) {
                        e1 = (a1 > t1.att || d1 > t1.def);
                        e2 = (a2 > t2.att || d2 > t2.def);
                    }
                    if ( e1 === true && e2 === false )  {
                        return -1;
                    } else if ( e1 === false && e2 === true ) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            };
            if (Util.isSet(sortedby) && Util.isSet(by[sortedby])) {
                obj = new Array();
                Util.each(cache, function(i,o){obj.push(o);});
                obj.sort(by[sortedby]);
            }
            Util.each(obj, callback);
        };
        
        
        if (unsafeWindow.Item && unsafeWindow.Item.Types) {
            lootTypes = new Object();
            Util.each(unsafeWindow.Item.Types, function(i,n) {
                lootTypes[n] = i; 
            });
        }
        
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
        this.add = function(opp) {
            var now = (new Date()).toDateString();
            if ( !Util.isSet(opp.id) || opp.id === 0 ) {
                return;
            }
            if ( opp.level ) {
                options.get(list_id)[opp.id] = (opp.name + '  level ' + opp.level + ' at '+now);
            }
            else {
                options.get(list_id)[opp.id] = (opp.name + ' at '+now);
            }
            options.save();
        };
        /**
         * Return true if opponent exists
         * @param {Object} id
         * @return {Boolean}
         */
        this.exists = function(id) {
            return Util.isSet(id) && Util.isString(options.get(list_id)[id]);
        };
        /**
         * Loops through all entries.
         * @param {Function} callback
         */
        this.each = function(callback) {
            Util.each(options.get(list_id), callback);
        };
        /**
         * Remove an entry.
         * @param {Object} id
         */
        this.remove = function(id) {
            options.get(list_id)[id] = null;
        };
        /**
         * @return {Number}
         */
        this.length = function() {
            return Util.length(options.get(list_id));
        };
        /**
         * @return {Array}
         */
        this.toArray = function() {
            var new_array = [];
            Util.each(options.get(list_id), function(id, name) {
                if (parseInt(id) && Util.isString(name));
                    new_array.push({'id':id , 'name':name});
            });
            return new_array;
        };

        return this;
    };

    var CSPlayerList = function() {
        var players = new Array();
        var hitted  = new Object();

        /** @type {CSOpponent} */
        this.current = null;
        /** @type {CSOpponent} */
        this.revenge  = null;
        /** @type {CSList} */
        this.blackList = null;
        /** @type {CSList} */
        this.whiteList = null;
        /** @type {CSList} */
        this.frdClanList = null;
        /** @type {CSList} */
        this.enmClanList = null;
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
            if (players.length < 1) {
                return (this.current = null);
            }
            if (typeof id === 'undefined') {
                return (this.current = null);
            }
            id = parseInt(id);
            this.current = players[id];
            if (players.length > 1) {
                players.splice(id, 1);
            } else {
                players = new Array();
            }
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
            if (players.length > 1) {
                return this.setCurrent(Math.floor(Math.random() * players.length));
            }
            else {
                return this.setCurrent(0);
            }
        };
        /**
         * @return {CSOpponent}
         */
        this.setLastCurrent = function() {
            if ( this.revenge ) {
                this.current = this.revenge;
                this.revenge = null;
                return this.current;
            }
            if (players.length > 1) {
                return this.setCurrent(players.length-1);
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
            if ( hitted[opponent.id] === true ) {
                return false;
            }
            if ( Util.length(hitted) > 5000 ) {
                hitted = new Object();
            }
            hitted[opponent.id] = true;
            players.push(opponent);
            return true;
        };
        /**
         * Add a set of opponents from a list
         * @param {Object} list
         */
        this.addFrom = function(list) {
            var success = false;
            Util.each(list, function(i, opp) {
                if (!PlayerList.blackList.exists(opp.id)) {
                    players.push(opp);
                    success = true;
                }
            });
            return success;
        };
        /**
         * @return {Number}
         */
        this.length = function() {
            return players.length;
        };
        this.clear = function() {
            players = new Array();
            hitted = new Object();
        };
        this.clearPlayers = function() {
            players = new Array();
        };
        /**
         * Sort all players
         * @param {String} by 'name', 'level', 'mafia' or 'iced'.
         */
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
            if ( players.length > 0 ) {
                players.sort(sortBy[by]);
            }
        };
        /**
         * Loops through all players.
         * @param {Object} callback
         */
        this.each = function(callback) {
            if (typeof callback !== 'function')
                return;
            for (var i = players.length - 1; i >= 0; i--) {
                callback.apply(players[i], [i, players[i]]);
            }
        };

        return this;
    };

    var PlayerList = new CSPlayerList();

    // EVENTS
    var Events = {
        editFilter: function() {
            var name = $(this).attr('for');
            var elt = $('#'+name, popupElt.content);
            var valStr = elt.val();
            var message = 'Add values delimited by lines:';
            var clPattern = /([\^\$\.\+\?\*\{\}\(\)\\\/\|\[\]])/g;
            var unPattern = /\\([\^\$\.\+\?\*\{\}\(\)\\\/\|\[\]])/g;
            
            if (Util.isString(valStr) && valStr.length > 0 && unPattern.test(valStr)) {
                valStr = valStr.replace(/([^\\])\|/g, '$1\n').replace(unPattern, '$1');
            } else {
                valStr = '';
            }
            
            showPromptPopup(message, valStr, function(text) {
                var result =  new Array();
                
                if (Util.isString(text) && text.length > 0) {
                    if (clPattern.test(text)) {
                        text = text.replace(clPattern, '\\$1');
                    }
                    Util.each(text.split(/\n/), function(i,line) {
                        if (Util.isString(line) && (line=Util.trim(line)).length > 0) {
                            result.push(line);
                        }
                    });
                }
                if (result.length > 0) {
                    elt.val(result.join('|'));
                } else {
                    elt.val('');
                }
            }, 250);
            return false;
        },
        sortloot_click: function() {
            var by = $(this).attr('href').substring(1);
            $('#lootlistlog', popupElt.content).empty();
            lootCache.each(function(id, loot) {
                addToLootLog(loot, true);
            }, by);
            return false;
        },
        revenge_click: function() {
            abort_process = false;
            if (PlayerList.revenge) {
                updateNewOpponent();
                manualAttack(PlayerList.revenge.setAttack());
            }
            return false;
        },
        use_boost_click: function() {
            updateBoostState( (bAttackerUsedBoost = (bAttackerUsedBoost === false)) );
            return false;
        },
        saveSession_click: function() {
            var outText = 'GENERAL:\n';
            Util.each({
                'Total Fights: '            :'total_fights',
                'Won Fights: '              :'won_fights',
                'Lost Fights: '             :'lost_fights',
                'Foes Attacked: '           :'foes_attacked',
                'Foes Iced: '               :'iced',
                'Foes Killed: '             :'kill',
                'Session Ices: '            :'session_ices',
                'Stolen Ices: '             :'stolen_ices',
                'Revenges: '                :'revenges',
                'Total Ices: '              :'total_ices',
                'Ice Season: '              :'season_target',
                'Attack gained: '           :'atkGained',
                'Defense Gained: '          :'defGained',
                'Experience Gained: '       :'experience',
                'Experience Per Stamina: '  :'exp_per_sta',
                'Victory Coins: '           :'coins'
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
            lootCache.each(function(id, loot) {
                outText += 'x' + loot.count + ' ';
                outText += $.trim(Util.textNodes(c$('div').append(loot.name)));
                if ( loot.attack && loot.defense ) {
                    outText += ' (A:'+ loot.attack +', D:'+ loot.defense +')';
                }
                outText += '\n';
            }, 'best');
            
            outText += '\n\nICED:\n';
            $.each(icedPlayerCache, function(id, name) {
                outText += name + ': ' + MW.getProfileLink(id) + '\n';
            });
            showTextPopup('Session stats, copy to share:', outText);
            return false;
        },
        showLog_click: function() {
            var name = String($(this).attr('href')).substring(1);
            $('#events_list .buttons a').removeClass('selected');
            $(this).addClass('selected');
            showDiv(name, '_logs');
            return false;
        },
        addNewToList_click: function() {
            var list_name = $(this).attr('name');
            var message = 'Paste all MW profiles OR IDs by line delimited:';
            showPromptPopup(message,'',function(text) {
                addMWProfiles(list_name, text); 
            },250);
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
                    if ( /clanlist/i.test(name) ) {
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

            showPromptPopup('Paste here the encoded list to add:', '', function(resp) {
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
            },250);
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
            $('#opponents_table', popupElt.content).empty();
            $('#ctrlcontainer', popupElt.content).hide();
            showFightRewards();
            clearAllTimers();
            options.fromDomElements();
            setTimeout(function() {
                PlayerList.clear();
                refreshPlayerList(function(result) {
                    if (result > 0) {
                        var s_added  = '<div style="text-align:left;">Opponents Added: ';
                        s_added  += Util.setColor(result, 'green')+'</div>';
                        showFightRewards(s_added);
                        genEnemyListDom();
                    }
                    else {
                        sendMessage('No players found. Try change filters and click "Refresh".');
                    }
                    $('#ctrlcontainer', popupElt.content).show();
                }, false);
            }, 500);
            return false;
        },
        attack_click: function() {
            abort_process = false;
            options.fromDomElements();
            options.save();
            
            var id = this.id.match(/attack_id_(\d+)/)[1];
            var url = PlayerList.setCurrent(id).setAttack();

            if (options.travelToStartCity) {
                StartCity = options.startCity;
            }
            $('#fight_wrapper', popupElt.content).empty();
            toFightScreen();
            reqSurvey(function() {
                can_save_from_elements = false;
                manualAttack(url);
            });
            return false;
        },
        powerAttack_click: function() {
            manualAttack(PlayerList.current.setAttack(true, bAttackerUsedBoost));
            return false;
        },
        attackAgain_click: function() {
            manualAttack(PlayerList.current.setAttack(false, bAttackerUsedBoost));
            return false;
        },
        runAway_click: function() {
            abort_process = true;
            clearAllTimers();
            bAttackWhiteList = false;
            bAttackFamilyList = false;
            options.toDomElements();
            options.save();
            can_save_from_elements = true;
            if (PlayerList.length() > 0) genEnemyListDom();
            toStartScreen();
            return false;
        },
        autoMode_click: function() {
            abort_process = false;
            options.fromDomElements();
            options.save();
            toFightScreen();
            if (options.travelToStartCity) {
                StartCity = options.startCity;
            }
            addTravelCountdown();
            addFightCountdown();
            can_save_from_elements = false;
            reqSurvey(AttackNewOpponent);
            return false;
        },
        attackWhiteList_click: function() {
            bAttackWhiteList = true;
            abort_process = false;
            PlayerList.whiteList.attack_count = 1;
            whiteListArray = PlayerList.whiteList.toArray();
            whiteListCache = new Object();
            Events.autoMode_click();
            return false;
        },
        attackFamily_click: function() {
            bAttackWhiteList = false;
            bAttackFamilyList = true;
            toFightScreen();
            getFamilyOpponents(Events.autoMode_click);
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
            }, 500);
            return false;
        },
        skip_click: function() {
            $(this).remove();
            PlayerList.current.skip = true;
            return false;
        },
        autoHeal_click: function() {
            var instant = $(this).attr('instantheal');
            $(this).remove();
            if ( parseInt(instant) === 1 ) {
                clearAllTimers();
                healPlayer(function() {
                    addFightCountdown();
                    addTravelCountdown();
                    preAttack();
                });
            } else {
                bDoManualHeal = true;
            }
            return false;
        },
        heal_click: function() {
            hideFightControls();
            healPlayer(addManualControls);
            return false;
        }
    };
    // POPUP
    var popupElt = new PopupObject('battlefield_popup', {
        type: 'main',
        title: '<img src="'+global.resource.battlefield_title+'">',
        width: 750,
        onclose: function() {
            clearAllTimers();
            abort_process = true;
            if (can_save_from_elements === true) {
                options.fromDomElements();
            }
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
            return /class=.fight_results./.test(text);
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

        popupElt.content.css('margin',0);

        var battle_div = c$('div', 'id:fv2_widget_wrapper').appendTo(popupElt.content).css({
            'height': 350,
            'max-height': 350
        });
        c$('div', 'id:fight_wrapper').appendTo(battle_div);
        
        var tabs = new TabObject(
            c$('div', 'options_wrapper').appendTo(battle_div), 'fightOpt',
            ['Config Page 1','Config Page 2','BlackList','WhiteList','FriendClanList','EnemyClanList'], 310, 738,
            {'background':'transparent','border-bottom':'0px'}
        );

        // ---------------
        // CONFIG PAGE 1
        // ---------------
        var divListElt = c$('ul').appendTo(tabs.getLayout(0));

        // START CITY, TRAVEL
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_traveltostartcity', 'Start City:'))
        .append(s$('bfopt_startcity', 100))
        .append(c$('span').text('Travel To:'))
        .append(DropDownObject('bfopt_travelto', 'Select cities', global.cities))
        .append(x$('bfopt_timercityactive', 'After:'))
        .append(n$('bfopt_timercitymins', 40))
        .append(c$('span').text('min.'))
        .append(x$('bfopt_travelwhennotargets', 'If no targets.'));

        // HEAL
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_healactive', 'Heal in'))
        .append(s$('bfopt_healcity', 100))
        .append(n$('bfopt_healbelow','Health below', 40))
        .append(n$('bfopt_healminsta', 'Stamina above', 40))
        .append(x$('bfopt_healattacking', 'Attacking. '))
        .append(n$('bfopt_healtimer', 'Timer:', 40))
        .append(c$('span').text('sec.'));

        // RAPID FIRE!
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_rapidfireactive', 'Rapid Fire! If health:'))
        .append(s$('bfopt_rapidfirehealth', 80))
        .append(n$('bfopt_rapidfireattacks', 'Max. Count:', 50))
        .append(n$('bfopt_rapidfiretiming', 'Timing:', 50))
        .append(x$('bfopt_rapidfireautotiming', 'Auto Timing.'));
        
        // ATTACK OPTIONS
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_attackusemax', 'Max. attacks:'))
        .append(n$('bfopt_attackmax', 50))
        .append(x$('bfopt_attackpwr', 'Power Attack!'))
        .append(x$('bfopt_attackrevenge', 'Revenges.'))
        .append(x$('bfopt_attacktonpc', 'Attack NPC. '))
        .append(n$('bfopt_attackretries', 'Max.Retries:', 40));
        
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_rediceactive', 'RedICE if attacks below:'))
        .append(n$('bfopt_redicemaxattk', 35))
        .append(x$('bfopt_rediceafterwon', 'Auto RedICE if you won the first fight.'));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_attkdelayusea', 'Delay when attack same player:'))
        .append(s$('bfopt_attkdelaya', 70))
        .append(x$('bfopt_attkdelayuseb', 'Delay when changing player'))
        .append(s$('bfopt_attkdelayb', 70));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_levelrangeactive', 'Users with a Level between'))
        .append(n$('bfopt_levelrangemin', 60))
        .append(n$('bfopt_levelrangemax', 'and', 60))
        .append(s$('bfopt_levelrangemethod', 'Will be:', 100));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_mafiarangeactive', 'Users with a Mafia between'))
        .append(n$('bfopt_mafiarangemin', 60))
        .append(n$('bfopt_mafiarangemax', 'and', 60))
        .append(s$('bfopt_mafiarangemethod', 'Will be:', 100));

        // AUTOPUBLISH
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_publishactive', 'Auto Publish after:'))
        .append(s$('bfopt_publishafter', 80))
        .append(t$('bfopt_publishto', 'ices to page/group (empty for wall):', 180));

        // -----------------
        // CONFIG PAGE 2
        // -----------------

        divListElt = c$('ul').appendTo(tabs.getLayout(1));

        // NAME FILTER
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_namefilteractive', 'Skip Names:', 'div').css({'width':90,'float':'left'}))
        .append(c$('input:text', 'id:bfopt_namefilterexpr,readonly:readonly').width(520).css('margin-right',5))
        .append(c$('a', 'for:bfopt_namefilterexpr').text('EDIT').click(Events.editFilter));
        
        // BADGE FILTER
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_badgefilteractive', 'Skip Badges:', 'div').css({'width':90,'float':'left'}))
        .append(c$('input:text', 'id:bfopt_badgefilterexpr,readonly:readonly').width(520).css('margin-right',5))
        .append(c$('a', 'for:bfopt_badgefilterexpr').text('EDIT').click(Events.editFilter));

        // SKIP
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_skipiced', 'Skip Iced targets.'))
        .append(x$('bfopt_skipicedbyme', 'Skip targets iced by me.'))
        .append(x$('bfopt_skiphealed', 'Skip targets that is Healed.'));
        
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_skipusehealth', 'Skip health:'))
        .append(s$('bfopt_skiphealth', 80))
        .append(n$('bfopt_skipbymincash', 'Skip cash below:', 60))
        .append(x$('bfopt_skipwrongcash', 'Skip wrong cash.'));
        
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_skipunderattk', 'Skip under attack if damage percent'))
        .append(s$('bfopt_skipunderattkpct', 80));
        
        // STOP - RESUME
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_stopbyices', 'Stop when ICE amount is more than:'))
        .append(n$('bfopt_stopiceamount', 40))
        .append(n$('bfopt_stopkeepsta', 'Stop If stamina is less than:', 40));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_stopbylevelup', 'Stop after LevelUp.'))
        .append(n$('bfopt_stopkeepexp', 'Stop before LevelUp and keep:', 40))
        .append(c$('span').text('Exp.'));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_stopresume', 'Keep and resume after:'))
        .append(n$('bfopt_stopresumedelay', 40))
        .append(c$('span').text(' min.'))
        .append(x$('bfopt_timerfightactive', 'Pause after:'))
        .append(n$('bfopt_timerfightmins', 40))
        .append(c$('span').text(' min.  And resume after: '))
        .append(n$('bfopt_timerfightresume', 40))
        .append(c$('span').text(' min.'));

        // LOG LENGTH
        c$('li').appendTo(divListElt)
        .append(c$('label','for:bfopt_maxloglength').text('Log Length:'))
        .append(s$('bfopt_maxloglength', 100).css('margin-left',5))
        .append(x$('bfopt_showsocialevents', 'Show social events in log.'))
        .append(x$('bfopt_showlootevents', 'Show loot events in log.'));

        
        $('a', divListElt).css('margin-left',5);
        
        // -----------------
        // BLACKLIST OPTIONS
        // -----------------
        divListElt = tabs.getLayout(2);

        c$('div').css({'float':'left','text-align':'left','margin':5,'width':500}).appendTo(divListElt)
        .append(x$('bfopt_useblacklist','Add players who defeat me to BlackList:'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_blacklist,multiple:multiple').width(500).height(270));

        var table = c$('div','blackList_table').appendTo(divListElt).css({
            'float': 'left',
            'padding-top': 50
        });
        
        Util.each([
            {id:'add_new_list',     name:'blackList', text:'Add New'},
            {id:'delete_item_list', name:'blackList', text:'Delete'},
            {id:'clear_list',       name:'blackList', text:'Clear List'},
            {id:'go_profile',       name:'blackList', text:'MW Profile'},
            {id:'add_from_list',    name:'blackList', text:'Load List'},
            {id:'get_current_list', name:'blackList', text:'Save List'}
        ], function(i,b) {
            b$(b.text, 'id:'+b.id+',name:'+b.name+',class:short white fightV2AttackBtn')
            .appendTo(c$('dl').appendTo(table).css('margin',5));
        });

        // -----------------
        // WHITELIST OPTIONS
        // -----------------
        divListElt = tabs.getLayout(3);

        c$('div').css({'float':'left','text-align':'left','margin':5,'width':500}).appendTo(divListElt)
        .append(x$('bfopt_whitelistadd','Add to list if stamina cost for ice is less than:'))
        .append(n$('bfopt_whitelistaddifsta', 40))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(x$('bfopt_whitelistcountactive','Attack whitelist only:'))
        .append(n$('bfopt_whitelistcount', 40))
        .append(c$('span').text(' times.'))
        .append(x$('bfopt_randomizewhitelist','Randomize Whitelist.'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_whitelist,multiple:multiple').width(500).height(250));

        table.clone().appendTo(c$('div','whiteList_table').appendTo(divListElt))
        .find('a').each(function(index, elem) {
            $(elem).attr('name', 'whiteList');
        });

        // -----------------
        // FRIEND CLANLIST OPTIONS
        // -----------------
        divListElt = tabs.getLayout(4);

        c$('div').css({'float':'left','text-align':'left','margin':5,'width':500}).appendTo(divListElt)
        .append(c$('div').text('Add your friendly families to skip here:'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_frdclanlist,multiple:multiple').width(500).height(270))

        table.clone().appendTo(c$('div','clanList_table').appendTo(divListElt))
        .find('a').each(function(index, elem) {
            $(elem).attr('name', 'frdClanList');
        });

        // -----------------
        // ENEMY CLANLIST OPTIONS
        // -----------------
        divListElt = tabs.getLayout(5);

        c$('div').css({'float':'left','text-align':'left','margin':5,'width':500}).appendTo(divListElt)
        .append(c$('div').text('Add your Enemy families to attack here:'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_enmclanlist,multiple:multiple').width(500).height(270))

        table.clone().appendTo(c$('div','clanList_table').appendTo(divListElt))
        .find('a').each(function(index, elem) {
            $(elem).attr('name', 'enmClanList');
        });
        
        // -------------------
        // LIST BUTTONS EVENTS
        // -------------------
        // Assign click events
        $('#add_new_list',     '#options_wrapper').click(Events.addNewToList_click);
        $('#delete_item_list', '#options_wrapper').click(Events.deleteSelected_click);
        $('#clear_list',       '#options_wrapper').click(Events.clearList_click);
        $('#go_profile',       '#options_wrapper').click(Events.mwProfile_click);
        $('#add_from_list',    '#options_wrapper').click(Events.addFromList_click);
        $('#get_current_list', '#options_wrapper').click(Events.getList_click);


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
        .append(b$('Attack WhiteList!', 'class:short red').css('margin-left', 5).click(Events.attackWhiteList_click))
        .append(b$('Attack Families!', 'class:short red').css('margin-left', 5).click(Events.attackFamily_click));


        // ACTIVE STATUS
        c$('center', 'msgcontainer').css('margin',5).appendTo(fightV2_msg_ctrl);

        // BOTTOM PART
        var wrapper_log_stats = c$('div', 'id:wrapper_log_stats').appendTo(popupElt.content);

        // STATS
        var fightV2_stats = c$('div', 'class:fightV2_stats').appendTo(wrapper_log_stats);

        // generate stats
        Util.each([
            {name:'Time left to pause:',                           id:'timetopause',           timer:true  },
            {name:'Time left to travel:',                          id:'timetotravel',          timer:true  },
            {name:'Current City:', icn:'icon_travel_32x17_01.gif', id:'currcityname'                       },
          //{name:'Yakuza',        icn:'bangkok_yakuza_small.gif', id:['maxyakuza','yakuza'],       city:4 },
          //{name:'Triad',         icn:'bangkok_triads_small.gif', id:['maxtriad','triad'],         city:4 },
            {name:'Total Fights:',      cls:'stamina',             id:'total_fights'                       },
            {name:'Won Fights:',        cls:'attack',              id:'won_fights'                         },
            {name:'Lost Fights:',       cls:'defense',             id:'lost_fights'                        },
            {name:'Foes Attacked:',     cls:'attack',              id:'foes_attacked'                      },
            {name:'Foes Iced:',         cls:'stat_kill',           id:'iced'                               },
            {name:'Foes Killed:',       cls:'stat_kill',           id:'kill'                               },
            {name:'Session Ices:',      cls:'stat_kill',           id:'session_ices'                       },
            {name:'Stolen Ices:',       res:'thief_icon',          id:'stolen_ices'                        },
            {name:'Revenges:',          cls:'attack',              id:'revenges'                           },
            {name:'Ice Season:',        cls:'stat_iced',           id:['season_target','season_ices']      },
            {name:'Total Ices:',        cls:'stat_iced',           id:'total_ices'                         },
            {name:'Attack gained:',     cls:'mafia_attack',        id:'atkgained'                          },
            {name:'Defense gained:',    cls:'mafia_defense',       id:'defgained'                          },
            {name:'Exp. gained:',       cls:'experience',          id:['exptonextlevel','experience']      },
            {name:'Exp. per stamina:',  cls:'experience',          id:'exp_per_sta'                        },
            {name:'Victory Coins:',     cls:'stat_victory',        id:'coins'                              },
            {name:'Cash:',              cls:'cash',                id:'citycash'                           }
          //{name:'Blacklisted:',       cls:'listed',              id:'blacklisted'                        },
          //{name:'Whitelisted:',       cls:'listed',              id:'whitelisted'                        },
          //{name:'Clanlisted:',        cls:'listed',              id:'clanlisted'                         }
        ],
        function(index, stat)
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
                else if (stat.res) {
                    dl.append(c$('img').attr('src',global.resource[stat.res]));
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
        .append(c$('a', 'href:#').text('Session Stats').click(Events.saveSession_click));

        // PANELS
        var fightV2_log = c$('div', 'class:fightV2_log').appendTo(wrapper_log_stats);

        // AUTOMATIC LOG
        c$('div', 'events_list').appendTo(fightV2_log)
        .append(c$('div', 'class:buttons')
            .append(c$('a', 'href:#items,class:selected').text('General').click(Events.showLog_click))
            .append(c$('a', 'href:#loot').text('Loot').click(Events.showLog_click))
            .append(c$('a', 'href:#iced').text('Iced').click(Events.showLog_click))
        )
        .append(c$('div', 'id:items_logs,class:player_updates').height(420))
        .append(c$('div', 'id:loot_logs')
            .append(c$('div', 'class:buttons').css('text-align','right')
            .append(c$('a', 'href:#name').text('Name').click(Events.sortloot_click))
            .append(c$('a', 'href:#attack').text('Attack').click(Events.sortloot_click))
            .append(c$('a', 'href:#defense').text('Defense').click(Events.sortloot_click))
            .append(c$('a', 'href:#best').text('Best').click(Events.sortloot_click)))
            .append(c$('ul', 'id:lootlistlog').height(401))
        )
        .append(c$('div', 'id:iced_logs').height(420).css('text-align','center')
            .append(c$('textarea','readonly:readonly,id:text_plain_ice_log').css({
                'width': '90%',
                'height': '90%',
                'color': 'white',
                'background-color': 'transparent',
                'border': 0
            }))
            .append(c$('div').css('clear','both'))
            .append(b$('Select All','class:short green').css({'float':'right','margin-right':15})
                .attr('onclick',"$(this).prevAll('textarea').select(); return false;"))
        );

        // MANUAL LIST OF FIGHTERS
        c$('div', 'opponents_list').appendTo(fightV2_log)
        .append(c$('div', 'class:header')
            .append(c$('a', 'sort_by_name').text('Name').click(Events.sort_click))
            .append(c$('a', 'sort_by_level').text('Level').click(Events.sort_click))
            .append(c$('a', 'sort_by_mafia').text('Mafia').click(Events.sort_click))
            .append(c$('a').text('Refresh').click(Events.refresh_click)))
        .append(c$('div', 'id:opponents_table,class:player_updates'));
        
        popupElt.applyOptions({
            'bfopt_healcity'         : global.cities,
            'bfopt_startcity'        : global.cities,
            'bfopt_attkdelaya'       : {1:'1-3', 2:'2-4', 3:'3-5', 4:'1-5'},
            'bfopt_attkdelayb'       : {1:'1', 2:'2', 3:'3', 4:'4'},
            'bfopt_levelrangemethod' : {'attk':'Attacked', 'skip':'Skipped'},
            'bfopt_mafiarangemethod' : {'attk':'Attacked', 'skip':'Skipped'},
            'bfopt_cashpercent'      : {25:'25%', 50:'50%', 75:'75%', 100:'100%'},
            'bfopt_maxloglength'     : {10:'10', 50:'50', 100:'100', 250:'250', 500:'500', 1000:'1000'},
            'bfopt_bangkokfaction'   : {'any':'Balance','Yakuza':'Yakuza','Triad':'Triads'},
            'bfopt_publishafter'     : {5:'5', 10:'10', 15:'15', 20:'20'},
            'bfopt_skiphealth'       : {20:'> 20%', 40:'> 40%', 50:'> 50%', 60:'> 60%', 70:'> 70%', 80:'> 80%', 90:'> 90%'},
            'bfopt_skipunderattkpct' : {5:'> 5%', 10:'> 10%', 15:'> 15%', 20:'> 20%', 25:'> 25%', 30:'> 30%', 40:'> 40%', 50:'> 50%'},
            'bfopt_clanlistusage'    : {0:'Skipped',1:'Attacked'},
            'bfopt_rapidfirehealth'  : {10:'< 10%', 20:'< 20%', 30:'< 30%', 40:'< 40%', 50:'< 50%', 60:'< 60%', 70:'< 70%', 80:'< 80%', 90:'< 90%', 100:'< 100%'}
        });
        
        // fix class
        $('input:text, select, textarea', battle_div).addClass('black_box');
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
        if (options.attkdelayUseA !== true) {
            fn();
            return;
        }
        var min = 1, max = 3, delay = 5;
        switch(options.attkdelayA) {
            case 2: min = 2; max = 4; break;
            case 3: min = 3; max = 5; break;
            case 4: max = 5; break;
        }
        delay = Math.floor(Math.random() * (max-min+1)) + min;

        statusTimer.start('Ready to attack '+PlayerList.current.anchor()+' in %N% seconds...', delay, fn);
    }

    function setAttackNewTimer(fn) {
        if (options.attkdelayUseB !== true) {
            fn();
            return;
        }
        var delay = options.attkdelayB;
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
            Logger.error('Attempt to add MW Profiles in unknow list name.');
            return;
        }
        var profileRegex = /(profile|family).php\?id=([^\n]+)|(p?\|?\d+)/g;
        var rgx, data = [];

        while ((rgx = profileRegex.exec(unescape(profilesText)))) {
            if (rgx[2]) {
                // from profile link
                rgx = Util.trim(rgx[2]);
                if (rgx.indexOf('{') !== -1) {
                    rgx = Util.parseJSON(rgx);
                    rgx = (rgx.id || rgx.user);
                    if (rgx) {
                        data.push(global.Base64.decode(rgx));
                    }    
                }
            } 
            else if (rgx[3]) {
                // from id
                data.push(rgx[3]);
            } 
        }
        if (data.length < 1) {
            return;
        }
        var profiles = new Collection(data);
        var isClan = /clanList/i.test(list_name);

        profiles.onMove(function(pos, key, id) {
            try {
                var url;
                if ( PlayerList[list_name].exists(Util.parseNum(id)) ) {
                    profiles.MoveNext();
                    return;
                }
                if ( isClan ) {
                    url = 'remote/' + MW.getIntURL('clan') + '&from_red_link=1&id=';
                    url += global.Base64.encode(id);
                } else {
                    if (String(id).charAt(0) !== 'p') {
                        id = 'p|' + id;
                    }
                    url = 'remote/' + MW.getIntURL('stats') + '&user=' + id;
                }
                httpAjaxRequest({url: url, message: 'Loading id: '+id,
                    success: function(htmlText) {
                        var result;
                        if ( isClan ) {
                            result = parseClanProfile(htmlText);
                            result.id = id;
                        } else {
                            result = getOpponentFromProfile(htmlText);
                        }
                        if (!result.error_msg) {
                            PlayerList[list_name].add(result);
                        }
                        else {
                            Logger.error('addMWProfiles: '+id+' to '+list_name+' "'+result.error_msg+'".');
                        }
                        profiles.MoveNext();
                    }
                });
            }
            catch(err) {
                profiles.MoveNext();
                Logger.error(err);
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
            Logger.error(err);
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
            Logger.error(err);
            return {error_msg:err.message};
        }
        return clan;
    }
    
    function getFamilyOpponents(callback) {
        var tempList = PlayerList.enmClanList.toArray();
        familyListArrays.original = new Array();
        
        function getFamily(p) {
            var url = 'remote/' + MW.getIntURL('clan') + '&from_red_link=1&id=';
            
            httpAjaxRequest({url: url + global.Base64.encode(p.id),
                success: function(htmlText) {
                    var elt = h$(htmlText);
                    var nAdded = 0;
                    var sName = elt.find('#clan_main #clan_header > h3').text();
                    
                    elt.find('ul#member_list li').each(function(index, element) {
                        var user;
                        try {
                            user = Util.uSplit($('.name_n_rank a',element).attr('href')).user;
                            user = global.Base64.decode(user);
                            familyListArrays.original.push(Util.parseNum(user));
                            nAdded++;
                        }
                        catch(err) {
                            Logger.error('AttackFamilies.getFamily:'+ err.message);
                        }
                    });
                    if (tempList.length > 0) {
                        addToLog('Found '+Util.setColor(nAdded,'green')+' Players in Family '+sName+'.<br>'
                        +        'Loading next family...','clanlist');
                        getFamily(tempList.shift());
                    } else {
                        addToLog('Found '+Util.setColor(nAdded,'green')+' Players in Family '+sName+'.<br>'
                        +        'All families loaded, starting...','clanlist');
                        callback();
                    }
                }
            });
        }        
        sendMessage('Loading families...', true);
        PlayerList.clear();
        if (tempList.length < 1) {
            abort_process = true;
            sendMessage('There is no families in your enemy family list.');
            clearAllTimers();
            addAutoControls(true);          
        } else {
            getFamily(tempList.shift());
        }
        
    }

    function fromFamilyList() {
        if (familyListArrays.original.length < 1) {
            abort_process = true;
            sendMessage('There is no more possible enemies to attack in your family list.');
            clearAllTimers();
            addAutoControls(true);          
        }
        if (!Util.isArray(familyListArrays.current) || familyListArrays.current.length < 1) {
            familyListArrays.current = familyListArrays.original.slice();
        }        
        var pId;
        if (familyListArrays.current.length > 1) {
            pId = familyListArrays.current.splice(Math.random() * familyListArrays.current.length, 1).shift();
        } else {
            pId = familyListArrays.current.shift();
        }

        if (PlayerList.blackList.exists(pId)) {
            Logger.debug('Skiping blacklisted id: ' + pId);
            familyListArrays.original.splice(familyListArrays.original.indexOf(pId), 1);
            fromFamilyList();
            return;
        }
        if ( Util.isSet(familyListCache[pId]) ) {
            PlayerList.current = familyListCache[pId].clone();
            setAttackNewTimer(function() {
                updateNewOpponent();
                preAttack();
            });
        } else {
            sendMessage('Loading profile (' + pId + ')...', true);
            httpAjaxRequest({
                url: 'remote/' + MW.getIntURL('stats') + '&user=p|' + pId,
                success: function(htmlText) {
                    PlayerList.current = getOpponentFromProfile(htmlText);
                    familyListCache[pId] = PlayerList.current.clone();
                    updateNewOpponent();
                    preAttack();
                }
            });
        }
    }

    function fromRandomWhiteList() {
        if (whiteListArray.length < 1) {
            if (PlayerList.whiteList.length() > 0 && (!options.whiteListCountActive 
                 || PlayerList.whiteList.attack_count < options.whiteListCount)) 
            {
                PlayerList.whiteList.attack_count++;
                whiteListArray = PlayerList.whiteList.toArray();
                
            } else {
                if (options.whiteListCountActive) {
                    bAttackWhiteList = false;
                    AttackNewOpponent();
                } else {
                    abort_process = true;
                    sendMessage('No enemy in WhiteList.\nPlease add players to attack.');
                    clearAllTimers();
                    addAutoControls(true);
                }
                return; 
            }            
        }
        
        var p;
        if (options.randomizeWhiteList && whiteListArray.length > 1) {
            p = whiteListArray.splice(Math.random() * whiteListArray.length, 1).shift();
        } else {
            p = whiteListArray.shift();
        }

        if (PlayerList.blackList.exists(p.id)) {
            Logger.debug('Skiping blacklisted id: ' + p.id);
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
     * Return true is opponent is valid (not filtered/skipped)
     * @param {CSOpponent} opp
     * @param {Boolean} iced
     * @return {Boolean}
     */
    function isValidOpponent(opp) {
        var filter;
        var isInLevelRange = true;
        var isInMafiaRange = true;
        
        function isFiltered(expr, str) {
            if (!Util.isString(expr) || expr.length < 1) {
                return false;
            }
            return (new RegExp(expr, 'i')).test(str);
        }

        if ( opp.isNPC === true ) {
            return options.attackToNpc;
        }
        if (options.skipIced && opp.iced) {
            return false;
        }
        if (PlayerList.whiteList.exists(opp.id)) {
            // whitelist users are always valid opponents.
            return true;
        }
        if (PlayerList.blackList.exists(opp.id)) {
            Logger.debug('skipping blacklisted id: ' + opp.id);
            return false;
        }
        if (opp.clanId && PlayerList.frdClanList.exists(opp.clanId)) {
            Logger.debug('skipping friendly clan: ' + opp.clanName);
            return false;
        }
        if (options.badgeFilterActive === true ) {
            if (isFiltered(options.badgeFilterExpr, opp.badge)) {
                Logger.debug('filtered badge: (' + opp.badge +') '+ opp.name);
                return false;
            }
        }
        if (options.nameFilterActive === true) {
            if (isFiltered(options.nameFilterExpr, opp.clanName + ' ' + opp.name)) {
                Logger.debug('filtered name: ' + opp.clanName + ' ' + opp.name);
                return false;
            }
        }
        if (options.skipIcedByMe && Util.isSet(icedPlayerCache[opp.id])) {
            Logger.debug('skipping "'+opp.name+'" because i iced them.');
            return false;
        }
        if (options.levelRangeActive === true) {
            if (opp.level >= options.levelRangeMin && opp.level <= options.levelRangeMax) {
                isInLevelRange = (options.levelRangeMethod === 'attk');
            } else {
                isInLevelRange = (options.levelRangeMethod !== 'attk');
            }
        }
        if (options.mafiaRangeActive === true) {
            if (opp.mafia >= options.mafiaRangeMin && opp.mafia <= options.mafiaRangeMax) {
                isInMafiaRange = (options.mafiaRangeMethod === 'attk');
            } else {
                isInMafiaRange = (options.mafiaRangeMethod !== 'attk');
            }
        }
        return isInLevelRange && isInMafiaRange;
    }

    // Adds opponents to list
    function addNewOpponents(htmlText) {
        var table = new CSOpponentTable(htmlText);
        var count = 0;
        
        if ( table.length > 0 ) {
            table.each(function(index, opp) {
                if (isValidOpponent(opp)) {
                    if (PlayerList.add(opp)) {
                        count++;
                    }
                }
            });
        }
        Logger.debug('Added '+count+' opponents.');
        return count;
    }

    // Refresh fight table
    function refreshPlayerList(callback, bTravelIfNoTargets) {
        $('#opponents_table').empty();
        sendMessage('Loading fight page...', true);

        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('fight'),
            liteLoad: 1,
            success: function(htmlText) {
                sendMessage();
                var result = 0;

                if (Regex.fight_controller(htmlText)) {
                    result = addNewOpponents(htmlText);
                } else {
                    Logger.error('Unexpected page, looking for "fight_controller".');
                }

                if (bTravelIfNoTargets === true && result === 0) {
                    setNewCurrentCity();
                    addTravelCountdown();
                    travelTo(StartCity, function() {
                        refreshPlayerList(callback, bTravelIfNoTargets);
                    });
                }
                else if (Util.isFunc(callback)) {
                    callback(result);
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
        var enemy_icon = c$('img', {
            'width': 40,
            'height': 40,
            'src': global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif'
        });
        PlayerList.each(function(index, pl) {
            var text = pl.title ? pl.title + '<br>' : '';
            var icon = pl.badge_url ? enemy_icon.clone().attr('src', pl.badge_url) : enemy_icon.clone();
            
            text += pl.anchor() + '<br>';
            text += ((pl.badge && pl.badge.length > 0) ? '[' + pl.badge + '] ' : '');
            text += 'Level: ' + pl.level;
            
            c$('div', 'class:update_item,id:enemy_player_' + index)
            .appendTo(listDiv).css('width', '99%')
            .append(c$('div', 'class:update_timestamp'))
            .append(c$('div', 'class:update_icon').append(icon))
            .append(c$('span', 'id:player_name,class:update_txt').width(260).html(text))
            .append(c$('span', 'id:player_mafia,class:update_txt').width(50).css('padding',5).text(pl.mafia))
            .append(b$('Attack', 'class:short red,id:attack_id_'+ index).click(Events.attack_click).css({
                'float': 'right',
                'margin-right': 15
            }));
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
     * Add generic loot
     * @param {CSItemCard} loot
     */
    function addGenericLoot(loot) {
        if (loot.type === 'coins') {
            Logger.debug('Adding coins: '+Util.parseNum(loot.quantity));
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
     * Add loot item to loot log.
     * @param {CSItemLoot} loot
     * @param {Boolean} bLastPos
     */
    function addToLootLog(loot, bLastPos) {
        var elt = e$('#loot_'+loot.item_id, '#lootlistlog');
        var lootPic = c$('img').css('vertical-align', 'middle').attr({
            'width': 30,
            'height': 30, 
            'src': loot.pic
        });
        if (elt !== null) {
            $('#item_count', elt).text(loot.count);
        }
        else {
            c$('li', 'loot_'+loot.item_id)[bLastPos?'appendTo':'prependTo']('#lootlistlog').append(lootPic)
              .append(c$('span').css('margin-left',10).text('Found '))
              .append(c$('span','item_count').css('color','green').text(loot.count))
              .append(c$('span').append(loot.name));
        }
    }
    /**
     * Add loot item to global log.
     * @param {CSItemLoot} loot
     */
    function addLootItem(loot) {
        var updateItem, item_txt;
        var lootPic = c$('img').attr({'width': 40,'height': 40, 'src':loot.pic});

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

        // loot event, return
        if (loot.event) {
            return;
        }

        // normal loot
        if ( lootCache.exists(loot.item_id) ) {
            loot = lootCache.add(loot);
            if ( item_txt ) item_txt.html('You Found: '+loot.name);
            addToLootLog( loot );
        }
        else {
            MW.getItemInfo(loot.item_id, function(name, type) {
                if ( item_txt ) item_txt.html('You Found: '+name);
                addToLootLog( lootCache.add(loot, name, type) );
            });
        }
    }
    /**
     * Generate a new log event.
     * @param {Object} message
     * @param {Object} icon
     * @param {Object} pic
     * @param {Object} id
     */
    function addToLog(message, icon, pic, id) {
        if (typeof icon !== 'string') {
            icon = 'fight';
        }
        fixMaxLogItems();

        var updateItem;
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
            c$('div').addClass('update_pic').appendTo(updateItem).append(c$('img').attr({
                'width': 40,
                'height': 40,
                'src': pic
            }));
        }
        c$('div', 'class:update_txt').appendTo(updateItem).html(message);
        $('#items_logs a.sexy_button_new', popupElt.content).css('color', 'black');
    }

    function addLootToLog(lootData, count) {
        if (Util.isSet(lootData) && lootData.length > 0) {
            var i;
            for (i = 0; i < lootData.length; i++) {
                if ( /fake_item_card/.test(lootData[i]) ) {
                    addGenericLoot(new CSItemCard(lootData[i]));
                }
                else if ( /item_with_preview/.test(lootData[i]) ) {
                    addLootItem(new CSItemLoot(lootData[i], count));
                }
                else if ( /item_card_mini ice/.test(lootData[i]) ) {
                    addLootItem(new CSItemIceEvent(lootData[i]));
                }
                else {
                    Logger.error('Unknow Loot Found:\n'+lootData[i]);
                }
            }
        }
    }
    /**
     * @param {CSIce} ice
     * @param {CSOpponent} opp
     */
    function addIcedToLog(ice, opp) {
        var text = 'You', eventText = ' ICED ';
        var oppName = (opp.clanId !== null ? opp.clanName+' '+opp.name : opp.name);
        var iceCost = opp.fights * getStaminaSpendPerFight();
        
        icedPlayerCache[opp.id] = opp.name;
        
        // add enemy to whitelist
        if (options.whiteListAdd && (iceCost < options.whiteListAddIfSta)) {
            if (PlayerList.addCurrentToWhiteList()) {
                addToLog('You iced ' + opp.anchor() + ' with a cost of ' + iceCost
                +        ' stamina.<br>Opponent added to WhiteList.','whitelist', opp.image);
            }
        }

        if ( ice.isKilled ) {
            fightStats.kill++;
            fightStats.session_ices += 2;
            eventText = ' KILLED ';
        }
        else {
            fightStats.iced++;
            fightStats.session_ices++;
        }

        if ( opp.isThief ) {
            fightStats.revenges++;
            eventText += 'the THIEF ';
        }

        text += eventText + opp.anchor() + ' to get '+ ice.count + '.';
        if (ice.season_ices && ice.season_target) {
            text += '<br>Season ice: ' + ice.season_ices + ' of ' + ice.season_target 
            text += ' (need ' + (ice.season_target - ice.season_ices) + ' ice/s more).';
        }
        text += '<br>' + ice.action;

        addToLog( text, 'iced', opp.image );
        
        text = '['+(new Date()).toLocaleTimeString()+ ']';
        text += (ice.isKilled ? ' KILL ' : ' ICED ') +'#'+ ice.count +' to '+ oppName +'.\n';
        
        if (ice.description) {
            $('#text_plain_ice_log',popupElt.content)[0].value += '# '+ice.description+'\n';
        } else {
            $('#text_plain_ice_log',popupElt.content)[0].value += text;
        }
        if ( options.publishActive && ice.canPublish ) {
            autoPublish.add( ice, oppName );
        }
    }
    /**
     * @param {CSStolenIce} thief
     * @param {Boolean} bAuto
     */
    function addStolenIceToLog(thief, bAuto) {
        var message = 'ICE STOLEN BY: ';
        var result = thief.tyClass;

        function skipRevenge() {
            if ( !bAuto ) {
                return false;
            }
            if ( thief.inMafia ) {
                result = 'But he\'s in your mafia.';
                return true;
            }
            if ( options.attackRevenge !== true ) {
                result = 'Set Revenge ON if you want to take your revenge!.';
                return true;
            }
            if ( PlayerList.blackList.exists(thief.id) ) {
                result = 'But was skipped because he\'s in your blacklist.';
                return true;
            }
            return false;            
        }

        fightStats.stolen_ices++;

        if ( skipRevenge() !== true )
        {
            var revenge = new CSOpponent();
            revenge.name = thief.name;
            revenge.id = thief.id;
            revenge.attack = thief.action;
            revenge.isThief = true;
            revenge.level = thief.level;
            revenge.clanName = thief.clanName;
            PlayerList.revenge = revenge;
        }

        if ( thief.clanName ) {
            message += Util.setAnchor(MW.getProfileLink(thief.id), Util.setColor(thief.clanName,'red')+' '+thief.name);
        } else {
            message += Util.setAnchor(MW.getProfileLink(thief.id), thief.name);
        }
        addToLog( message+'<br>'+result, 'iced', thief.pic, thief.id );
    }

    // update stats from fightStats class
    function updateStats() {
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
     * @param {Number} try_count for private use
     */
    function travelTo(toCity, callback, try_count) {
        if (abort_process) {
            return;
        }
        var tryAgain = function() { travelTo(toCity, callback, try_count); };
        
        // fix possible undefined city
        if ( !Util.isSet(global.cities[toCity]) ) {
            if ( CurrentCity === (toCity = (StartCity = 1)) ) {
                callback && callback();
                return;
            }
        }
        // up try count
        if (Util.isNumber(try_count)) {
            try_count++;
        } else {
            try_count = 1;
        }
        
        sendMessage('Traveling to ' + global.cities[toCity] + '...', true);
        MW.travel(toCity, function(city) {
            if ((CurrentCity = parseInt(city)) === parseInt(toCity)) {
                sendMessage();
                callback && callback();
            }
            else {
                // so many tries, removing city and setting a new city.
                if (try_count > 2) {
                    Logger.error('Can\'t travel to '+global.cities[toCity]+' the city will be removed.');
                    delete global.cities[toCity];
                    setNewCurrentCity();
                    try_count = 0;
                    statusTimer.start('Unexpected city (#3), taveling to '+ global.cities[toCity = StartCity] + ' in %N% seconds.', 3, tryAgain);
                } else {
                    statusTimer.start('Unexpected city (#'+try_count+'), taveling to '+ global.cities[toCity] + ' in %N% seconds.', 3, tryAgain);
                }
            }
        });
    }
    /**
     * @param {Function} callback
     */
    function healPlayer(callback, nTry) {
        if (abort_process) {
            return;
        }
        var tryAgain = function() { healPlayer(callback, nTry+1); };
        var timeToBeReady = (new Date()).getTime() - nLastHealTime;
        var timeNeeded = options.healTimer * 1000;
        var city;

        if ( !Util.isSet(nTry) ) {
            nTry = 1;
        }
        if ( nTry < 4 ) {
            city = parseInt(options.healCity);
        }
        else {
            options.healCity = (city=1);
            options.save();
        }
        if ( timeToBeReady < timeNeeded ) {
            statusTimer.start('Ready to heal in %N% seconds.', Math.ceil((timeNeeded-timeToBeReady)/1000), tryAgain);
            return;
        }
        bDoManualHeal = false;

        function Heal(url) {
            sendMessage('Healing at ' + global.cities[city] + '...', true);
            httpAjaxRequest({'url':url, 'success': function(jsonData) {
                try {
                    updateUserFields(jsonData);

                    if (fightStats.health < options.healBelow) {
                        statusTimer.start(jsonData.hospital_message+' try again in %N% seconds.', 5, tryAgain);
                    }
                    else {
                        nLastHealTime = (new Date()).getTime();
                        $('#heal_item', '#items_logs').remove();
                        addToLog(jsonData.hospital_message, 'heal');
                        setHealth(0, fightStats.healthpct);
                        updateAttackerHealthVal(fightStats.health);
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
                    statusTimer.start('Error healing. Try again in %N% seconds.', 5, tryAgain);
                }
            }});
        }
        if (city === 1 && city !== CurrentCity) {
            Heal('remote/' + MW.getIntURL('hospital', 'heal', CurrentCity) + '&xcity=1');
        }
        else if (city !== 0 && city !== CurrentCity) {
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

        if (fightStats.stamina < getStaminaSpendPerFight()) {
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
        $('#timer_timetotravel, #timer_timetopause').hide();
    }

    function checkBankMoney(callback) {
        var deposit = UserConfig.main.autoDeposit[CurrentCity];
        if (deposit && deposit.active === true) {
            if (fightStats.userCash > deposit.amount) {
                MW.deposit(StartCity, fightStats.userCash, function(result) {
                    if ( result ) {
                        $('#bank_item', '#items_logs').remove();
                        addToLog(result, 'bank');
                    }
                    if ( Util.isFunc(callback) ) {
                        callback();
                    }
                });
                return;
            }
        } 
        if ( Util.isFunc(callback) ) {
            callback();
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
            Logger.error(err);
        }
    }

    // request a survey for fast player update
    function reqSurvey(callback) {
        sendMessage('Updating...', true);
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('survey', 'show_nps_survey'),
            success: function(jsonData) {
                sendMessage();
                updateUserFields(jsonData);
                updateStats();
                if (Util.isFunc(callback)) {
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
    function getStaminaSpendPerFight() {
        if (CurrentCity === 7 || CurrentCity === 8) {
            return 5;
        }
        else {
            return 1;
        }
    }
    function setNewCurrentCity() {
        var cities = new Array();
        
        Util.each(options.get('travelTo'), function(id, value) {
            id = Util.parseNum(id);
            if (Util.isSet(global.cities[id]) && StartCity !== id) {
                if ( value === true ) cities.push(id);
            } 
        });
        
        if (cities.length > 0) {
            StartCity = parseInt(cities[ Math.floor(Math.random() * cities.length) ]);
        } else {
            StartCity = 1;
        }
    }

    function addTravelCountdown() {
        travelCountdown.clear();
        if (options.timerCityActive) {
            travelCountdown.start(options.timerCityMins*60);
        }
    }
    function addFightResumeCountdown() {
        fightResumeCountdown.clear();
        fightResumeCountdown.start(options.timerFightResume*60);
    }
    function addFightCountdown() {
        fightCountdown.clear();
        if (options.timerFightActive) {
            fightCountdown.start(options.timerFightMins*60);
        }
    }

    function publishCurrentIces(callback) {
        var bContinued = false;
        var continue_fn = function() {
            if ( bContinued === false ) {
                bContinued = true;
                sendMessage();
                callback();
            }
        };
        sendMessage('Paused while publishing your ices. ', false, continue_fn);
        autoPublish.publishTo(options.publishTo, continue_fn);
    }

    function AttackNewOpponent() {
        if (abort_process) {
            return;
        }
        if ( options.publishActive && autoPublish.length() >= options.publishAfter ) {
            publishCurrentIces(AttackNewOpponent);
            return;
        }
        // next opponent
        if (bAttackWhiteList === true) {
            fromRandomWhiteList();
            return;
        }
        if (bAttackFamilyList === true) {
            fromFamilyList();
            return;
        }
        var opponent = PlayerList.setLastCurrent();

        // check if a valid opponent object
        if (!opponent) {
            PlayerList.clear();
            refreshPlayerList(AttackNewOpponent, options.travelWhenNoTargets);
            return;
        }
        // check if opponent is filtered
        if (!isValidOpponent(opponent, false)) {
            AttackNewOpponent();
            return;
        }
        if (options.travelToStartCity && CurrentCity !== StartCity) {
            travelTo(StartCity, preAttack);
            return;
        } else {
            StartCity = CurrentCity;
        }
        if (PlayerList.length() < 5) {
            httpAjaxRequest({url:'remote/'+MW.getIntURL('fight'),liteLoad:1,success:addNewOpponents});
        }
        // attack
        setAttackNewTimer(function() {
            if (opponent.isNPC) {
                $('#fight_wrapper', popupElt.content).empty();
            }
            else {
                updateNewOpponent();
            }
            preAttack();
        });
    }

    function preAttack() {
        if (abort_process) {
            return;
        }
        if ( !Util.isSet(PlayerList.current) || PlayerList.current.skip ) {
            AttackNewOpponent();
            return;
        }        
        var b_RapidFire = false;
        var fs = fightStats;
        var delay = parseInt(options.stopResumeDelay) > 0 ? parseInt(options.stopResumeDelay) * 60 : 300;
        var sStopMessage, sTimerMessage;

        var opp = PlayerList.current;
        var useBoost = (opp.attackWithBoost || bAttackerUsedBoost);
        var url = opp.setAttack(false, (useBoost && opp.fights>0));
        var n_forIce = opp.attacksToIce();

        if (options.attackUseMax && n_forIce > 0 && options.attackMax < n_forIce) {
            Logger.debug('skiping '+opp.name+' need very much attacks to ice ~'+n_forIce);
            checkBankMoney(AttackNewOpponent);
            return;
        }
        if (options.attackPwr && opp.pwratk) {
            url = opp.setAttack(true, (useBoost && opp.fights>0));
            if (options.rapidFireActive && n_forIce > 4) {
                b_RapidFire = ( opp.curHealthPct < options.rapidFireHealth );
            }
        }
        // fix healWhen option to minimum.
        if ( isNaN(parseInt(options.healBelow)) || options.healBelow < opp.requirements.health ) {
            options.healBelow = parseInt(opp.requirements.health);
            options.save();
        }
        
        if ( fs.expToNextLevel < options.stopKeepExp ) {
            sStopMessage = 'AutoFight deactivated, you need '+fs.expToNextLevel+' exp. points to levelup.';
        }
        else if ( fs.stamina < Math.max(options.stopKeepSta, opp.requirements.stamina) ) {
            if (options.stopResume) {
                sTimerMessage = 'No stamina left, continue in %N% seconds.';
            } else {
                sStopMessage = 'AutoFight deactivated, No stamina left.';
            }
        }
        else if (bDoManualHeal) {
            healPlayer(preAttack);
            return;
        }
        else if ( fs.health < Math.max(options.healBelow, opp.requirements.health) ) {
            if ( fs.stamina < options.healMinSta ) {
                if (options.stopResume) {
                    sTimerMessage = 'Heal is not possible due your low stamina, continue in %N% seconds.';
                } else {
                    sStopMessage = 'AutoFight deactivated, Heal is not possible due your low stamina.';
                }
            }
            else if ( options.healActive !== true ) {
                if (options.stopResume) {
                    sTimerMessage = 'Healing is set off, continue in %N% seconds.';
                } else {
                    sStopMessage = 'AutoFight deactivated, Healing is set off.';
                }
            } 
            else if (options.healAttaking || opp.fights === 0 || fs.health < opp.requirements.health) {
                healPlayer(preAttack);
                return;
            }
            
        }
        else if (options.stopByIces && fs.session_ices >= options.stopIceAmount) {
            sStopMessage = 'AutoFight deactivated, you made '+fs.iced+' ices.';
        }
        
        if ( sStopMessage ) {
            checkBankMoney();
            abort_process = true;
            clearAllTimers();
            sendMessage(sStopMessage);
            addAutoControls(true);
            return;
        }
        if ( sTimerMessage ) {
            clearAllTimers();
            checkBankMoney();
            addAutoControls(false, true);
            statusTimer.start(sTimerMessage, delay, function() {
                reqSurvey(function() {
                    addFightCountdown();
                    addTravelCountdown();
                    preAttack();
                });
            });
            return;
        }
        if (!/xw_controller=fight/i.test(url)) {
            AttackNewOpponent();
            return;
        }
        if ( opp.fights > 0 ) {
            addSkipControl();
        }
        if ( !opp.isNPC && b_RapidFire === true ) {
            AttackWithRapidFire(url);
        } else {
            Attack(url, true);
        }
    }

    function AttackWithRapidFire( url ) {
        if (abort_process) {
            return;
        }
        var levelUp_stop = false, b_AttackAgain = true, b_Stopped = false;
        var b_NeedHeal = false, b_Finished = false;
        var n_atkMaxHealth = 100, n_defMaxHealth = 100;
        var n_Stamina = fightStats.stamina, n_Health = fightStats.health;
        var requests_left = 0, total_sent = 0;
        var n_tIntID, n_atkDamage = 0, n_defDamage = 0;
        var s_text = ' to ' + PlayerList.current.anchor() + '...';
        var n_minHealth = PlayerList.current.requirements.health;
        var n_minStamina = Math.max(options.stopKeepSta, PlayerList.current.requirements.stamina);
        var n_goodResponses = 0, n_badResponses = 0;
        
        if (options.healAttaking) {
            n_minHealth = Math.max(options.healBelow, n_minHealth);
        }
        
        sendNewRFAttack();
        options.rapidFireTiming = Math.max(Math.min(options.rapidFireTiming, 1000), 200);
        n_tIntID = setInterval(sendNewRFAttack, options.rapidFireTiming);
        
        function sendNewRFAttack() {
            if (total_sent > options.rapidFireAttacks) {
                stopRapidFire();
            }  else {
                requests_left++;
                showRapidFireTitle(++total_sent);
                sendMessage('Rapid Fire x'+total_sent+s_text, true);
                httpAjaxRequest({'url':url,'liteLoad':1,'success': rapidFireResponse});
            }
        }
        
        function stopRapidFire() {
            if (b_Stopped !== true) {
                b_Stopped = true;
                clearInterval(n_tIntID);
            }
        }
        
        function rapidFireResponse(response) {
            requests_left--;
            var resp = parseAttack( response, true );
                
            if (n_Health > fightStats.health) {
                n_Health = fightStats.health;
            }
            if (n_Stamina > fightStats.stamina) {
                n_Stamina = fightStats.stamina;
            }
            
            if (bDoManualHeal || n_Health < n_minHealth || n_Stamina < n_minStamina) {
                stopRapidFire();
            }
            
            if ( resp.success !== ERROR_SUCCESS ) {
                n_badResponses++;
                
                if ( parseInt((n_badResponses*100)/options.rapidFireAttacks) > 80 ) {
                    stopRapidFire();
                }
            }
            else {
                var defender = resp.fight_result.defender;
                var attacker = resp.fight_result.attacker;
                
                n_goodResponses++;
                
                n_atkDamage += attacker.damage_dealt;
                n_defDamage += defender.damage_dealt;
                
                if (n_defMaxHealth > defender.current_health_pct) {
                    n_defMaxHealth = defender.current_health_pct;
                }
                if (n_atkMaxHealth > attacker.current_health_pct) {
                    n_atkMaxHealth = attacker.current_health_pct;
                }
                
                attacker.damage_dealt = n_atkDamage;
                attacker.current_health_pct = n_atkMaxHealth;
                defender.damage_dealt = n_defDamage;
                defender.current_health_pct = n_defMaxHealth;
                
                if (resp.attack_again === false) {
                    b_AttackAgain = false;
                }
                
                if (resp.levelUp_stop === true) {
                    b_AttackAgain = false;
                    levelUp_stop = true;
                    abort_process = true;
                }
                if (b_AttackAgain !== true) {
                    stopRapidFire();
                }
            }
            
            // completed
            if (requests_left < 1 && b_Stopped === true && b_Finished === false) {
                b_Finished = true;
                if (options.rapidFireAutoTiming === true && total_sent > 4) {
                    if (n_badResponses > n_goodResponses) {
                        options.rapidFireTiming += 50;
                    }
                    else if (parseInt((n_goodResponses*100)/options.rapidFireAttacks) > 80) {
                        options.rapidFireTiming -= 50;
                    }
                }
                fightStats.health = n_Health;
                fightStats.stamina = n_Stamina;
                updateFightResponse(resp);
                
                if (levelUp_stop === true) {
                    clearAllTimers();
                    addAutoControls(true);
                    sendMessage('AutoFight deactivated, you Leveled UP!!.');
                }
                else if (b_AttackAgain && n_goodResponses > 0) {
                    preAttack();
                }
                else {
                    addAutoControls();
                    checkBankMoney(AttackNewOpponent);
                }
            }
            else {
                updateFightResponse(resp, true);
            }
        }
    }

    function Attack( url, bAuto ) {
        if (abort_process) {
            return;
        }
        var n_ToIce = PlayerList.current.attacksToIce();
        var retry = PlayerList.current.retries;
        var sAttackMessage = 'Attacking ' + PlayerList.current.anchor() + '...';
        if (PlayerList.current.retries > 0) {
            sAttackMessage += '<br>Retry #'+(PlayerList.current.retries+1)+'.';
        }
        if ( n_ToIce == 'Infinity' ) {
            sAttackMessage += '<br>Calculating attacks to ice...';
        }
        else if (n_ToIce > 0) {
            sAttackMessage += '<br>You need ~'+PlayerList.current.attacksToIce()+' attacks to ice.';
        }
        sendMessage(sAttackMessage, true);

        httpAjaxRequest({
            'url': url,
            'liteLoad': 1,
            'success': function (htmlText) {
                if (abort_process) {
                    return;
                }
                var fr;
                if ( PlayerList.current.isNPC ) {
                    $('#fight_wrapper', popupElt.content).empty();
                    fr = parseNPCAttack(htmlText, bAuto);
                } else {
                    fr = parseAttack(htmlText, bAuto);
                    addToLog(updateFightResponse(fr));
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
                            if ( PlayerList.current.retries < options.attackRetries) {
                                PlayerList.current.retries++;
                                preAttack();
                            } else {
                                addAutoControls(true);
                                if ( options.attackRetries > 0 ) {
                                    statusTimer.start('So many retries for this player, next in %N% seconds.',2, AttackNewOpponent);
                                } else {
                                    AttackNewOpponent();
                                }
                            }
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
                                clearAllTimers();
                                addAutoControls(true);
                                sendMessage('AutoFight deactivated, you Leveled UP!!.');
                                return;
                            }
                            else if (!options.skipHealed || !PlayerList.current.isHealed()) {
                                if (fr.attack_again) {
                                    PlayerList.current.retries = 0;
                                    setAttackTimer(preAttack);
                                    return;
                                }
                            }
                            else {
                                Logger.debug('Skipped '+PlayerList.current.name+' because get healed.');
                            }
                            addAutoControls();
                            checkBankMoney(AttackNewOpponent);
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
    
    function updateBoostState(on) {
        var state = on ? 'on' : 'off';
        httpAjaxRequest({
            url: 'remote/'+MW.getIntURL('fight','setBoostToggle')+'&toggle_state='+state,
            success: updateAttackerUsedBoost
        });
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
        .find('.impulse_buy, #figthv2_moreinfo_btn').remove();
        $('#msgcontainer', popupElt.content).empty();
    }

    function showRapidFireTitle(target_count) {
        var divElt = $('#wrapper_info .fightV2_result', popupElt.content).empty();
        var titleElt = c$('div').text('RAPID FIRE!').css({
            'text-align'  : 'center',
            'margin-top'  : 6,
            'height'      : 25,
            'color'       : 'green',
            'font-size'   : 20,
            'font-weight' : 'bold',
            'font-family' : 'tahoma'
        });
        var numElt = c$('div').hide().text('x'+target_count).css({
            'text-align'  : 'center',
            'margin-top'  : 1,
            'color'       : 'yellow',
            'font-size'   : 24,
            'font-weight' : 'bold'
        });
        divElt.append(titleElt).append(numElt);

        numElt.fadeIn(options.rapidFireTiming-100, function() {
            titleElt.fadeOut(2000);
            numElt.fadeOut(2000);
        });
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
    function showIcedOverlays(fight_data, opp, first_attack) {

        if( opp.ice_state > 0 ) {
            return true;
        }
        if( fight_data.you_just_killed ) {
            opp.ice_state = 1;
            $('#fv2_defender_overlay_killed', popupElt.content).show();
        } else if( fight_data.you_just_iced ) {
            opp.ice_state = 2;
            $('#fv2_defender_overlay_iced', popupElt.content).show();
        } else if ( fight_data.ice_was_just_stolen ) {
            opp.ice_state = 3;
            $('#fv2_defender_overlay_stolen', popupElt.content).show();
            $('.fv2_defender_overlay_name', popupElt.content).html(fight_data.thief_profile);
            $('.fv2_defender_overlay_level', popupElt.content).html(fight_data.thief_class);
            $('.fv2_defender_overlay_pic', popupElt.content).html(fight_data.thief_pic);
            $(fight_data.thief_btn)
            .removeAttr('onclick').attr('href','#').click(Events.revenge_click)
            .appendTo($("#fv2_defender_overlay_stolen_btn", popupElt.content).empty());

        } else {
            showIceState(fight_data.defender, first_attack);
            return false;
        }

        if( fight_data.show_ice_season ) {
            $('.fv2_defender_overlay_next_title', popupElt.content).html("Next Ice Prize");
            $('.fv2_defender_overlay_next_count', popupElt.content).html(fight_data.ices_so_far + '/' + fight_data.ices_target);
        } else {
            $('.fv2_defender_overlay_next_title', popupElt.content).html("Total Ices");
            $('.fv2_defender_overlay_next_count', popupElt.content).html(fight_data.total_ice_count);
        }

        return true;
    }
    function showIceState(defender, first_attack) {
        var ice_state_set = false;
        if (defender.iced_self) {
            $('#fv2_defender_you_iced', popupElt.content).css('display', 'none');
            $('#fv2_defender_iced_self', popupElt.content).css('display', 'block');
            $('#fv2_defender_was_iced', popupElt.content).css('display', 'none');
            ice_state_set = true;
        } else if (defender.is_iced) {
            $('#fv2_defender_you_iced', popupElt.content).css('display', 'none');
            $('#fv2_defender_iced_self', popupElt.content).css('display', 'none');
            $('#fv2_defender_was_iced', popupElt.content).css('display', 'block');
            ice_state_set = true;
        }
        if( !ice_state_set ) {
            $('#fv2_defender_you_iced', popupElt.content).css('display', 'none');
            $('#fv2_defender_iced_self', popupElt.content).css('display', 'none');
            $('#fv2_defender_was_iced', popupElt.content).css('display', 'none');
        }
    }
    function genFightWrapper(sHtml) {
        var e = $('#fight_wrapper', popupElt.content).html(sHtml);
        $('.fv2_btncontainer', e).empty();
        $('a.close', popupElt.content).remove();
        $('#fv2_wgt_open_button_wrapper, #fv2_wgt_button_open_link, #fv2_boost_toggle_ask_btns, #wrapper_items_won', e).remove();
        //$('.boostcontainer', e).removeAttr('style').css('padding-top',15);
        //$('.boost_wgt_next_boost', e).removeAttr('style');
        $('#fightv2_boost_on, #fightv2_boost_off', e).removeAttr('onclick').removeClass('checked').css('cursor','pointer').click(Events.use_boost_click);
        $('#fightv2_boost_'+(bAttackerUsedBoost?'on':'off'), e).addClass('checked');
    }

    function toFightScreen() {
        $('#ctrlcontainer', popupElt.content).hide();
        $('#msgcontainer', popupElt.content).show();
        $('#fightmsgcontainer', popupElt.content).show();
        $('#options_wrapper', popupElt.content).hide();
        $('#opponents_table', popupElt.content).empty();
        $('#fight_wrapper', popupElt.content).html(global.Base64.decode(
            'PGRpdiBpZD0id3JhcHBlcl9hdHRhY2tlciIgY2xhc3M9InVzZXJib3giIHN0eWxlPSJmbG9hdDpsZWZ0O3Bvc2l0aW9uOnJlbGF0'+
            'aXZlOyI+PC9kaXY+CQ0KPGRpdiBpZD0iZmlnaHRfYnRuX3BhbmVsIiBzdHlsZT0iZmxvYXQ6IGxlZnQ7Ij4JDQoJPGRpdiBpZD0i'+
            'YXR0YWNrZXJfYmVzdF9pdGVtcyIgc3R5bGU9ImZsb2F0OiBsZWZ0OyI+DQoJCTxkaXYgY2xhc3M9InN1YmhkciI+VG9wIEl0ZW1z'+
            'PC9kaXY+DQoJPC9kaXY+CQ0KCTxkaXYgaWQ9IndyYXBwZXJfYWN0aW9ucyIgc3R5bGU9ImZsb2F0OiBsZWZ0OyI+DQoJCTxkaXYg'+
            'c3R5bGU9Im1hcmdpbi10b3A6IDEwcHg7dGV4dC1hbGlnbjpyaWdodDsgcGFkZGluZy1yaWdodDoxNXB4OyBoZWlnaHQ6IDIwcHg7'+
            'Ij48L2Rpdj4NCgkJPGRpdiBjbGFzcz0iZnYyX2J0bmNvbnRhaW5lciIgc3R5bGU9InBvc2l0aW9uOnJlbGF0aXZlOyAiPjwvZGl2'+
            'PgkJCQ0KCTwvZGl2Pg0KCTxkaXYgaWQ9ImRlZmVuZGVyX2Jlc3RfaXRlbXMiIHN0eWxlPSJmbG9hdDogbGVmdDsiPg0KCQk8ZGl2'+
            'IGNsYXNzPSJzdWJoZHIiPlRvcCBJdGVtczwvZGl2Pg0KCTwvZGl2PgkJDQoJPGRpdiBzdHlsZT0iY2xlYXI6IGJvdGg7Ij48L2Rp'+
            'dj4NCjwvZGl2PgkNCjxkaXYgaWQ9IndyYXBwZXJfZGVmZW5kZXIiIGNsYXNzPSJ1c2VyYm94IiBzdHlsZT0iZmxvYXQ6bGVmdDtw'+
            'b3NpdGlvbjpyZWxhdGl2ZTsiPjwvZGl2Pg0KPGRpdiBzdHlsZT0iY2xlYXI6IGJvdGg7Ij48L2Rpdj4J'
        )).show();
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
        if (options.attackPwr && curr && curr.alive && curr.pwratk) {
            c$('div', 'fv2_button_row2').appendTo(wrapper)
            .append(b$('Power Attack','class:short red fightV2AttackBtn').click(Events.powerAttack_click));
        }
        if (wrapper.length < 2 && !bHideHealButton && fightStats.healthpct < 80) {
            c$('div', 'fv2_button_row3').appendTo(wrapper)
            .append(b$('Heal','class:short red fightV2AttackBtn').click(Events.heal_click));
        }
        c$('div', 'fv2_button_row3').appendTo(wrapper)
        .append(b$('Run Away', 'class:fightV2AttackBtn').click(Events.runAway_click));
    }

    function addAutoControls(onlyRunAway, bInstantHeal) {
        var wrapper = hideFightControls();
        if (onlyRunAway !== true) {
            c$('div', 'fv2_button_row1').appendTo(wrapper)
            .append(b$('Stop','class:short red fightV2AttackBtn').click(Events.stop_click));
        }
        if (onlyRunAway !== true && fightStats.healthpct < 80) {
            c$('div', 'fv2_button_row2').appendTo(wrapper)
            .append(b$('Heal','class:short red fightV2AttackBtn')
                .attr('instantheal', (bInstantHeal===true) ? '1': '0').click( Events.autoHeal_click ));
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

    function parseNPCAttack(htmlText, autoMode) {
        var fight_result = new CSNPCFightResult(htmlText);
        if (!fight_result.valid) {
            Logger.error('parseNPCAttack: ERROR_NO_FIGHT_RESULT');
            return {success: ERROR_NO_FIGHT_RESULT};
        }
        var opponent = PlayerList.current;
        $('#fight_wrapper', popupElt.content).empty()
        .append(c$('center').append(fight_result.fight_element).css('margin-bottom',2))
        .append(c$('center').append(b$('Run Away', 'class:fightV2AttackBtn').click(Events.runAway_click)));

        updateUserFields(htmlText);

        var n_cash = Util.parseNum(fight_result.cash.text());
        var n_expe = Util.parseNum(fight_result.experience.text());
        var s_outText = '';

        if (fight_result.won) {
            s_outText = 'You fought 1 time. <span class="good">You won the fight</span>, ';
            fightStats.won_fights += 1;
        } else {
            s_outText = 'You fought 1 time. <span class="bad">You lost the fight</span>, ';
            fightStats.lost_fights += 1;
        }
        fightStats.total_fights   += 1;
        fightStats.experience     += n_expe;
        fightStats.staminaSpend   += opponent.requirements.stamina;
        fightStats.cashWon[fight_result.cash_city] += (fight_result.won ? n_cash : n_cash * -1);

        s_outText += 'You ' + (fight_result.won ? 'gained' : 'losed');
        s_outText += ' <span class="' + (fight_result.won ? 'good' : 'bad') + '">' + n_expe;
        s_outText += '</span> experience points ';
        s_outText += 'and <span class="' + fight_result.cash.attr('class') + '">';
        s_outText += n_cash + '</span> cash. ';

        updateStats();
        addToLog(s_outText);

        return {'success': ERROR_SUCCESS};
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
        var bOpponentGetIced = false;

        updateUserFields(htmlText);

        if (Util.isSet(htmlText.fight_result)) {
            fight_data = htmlText;
            if (fight_data.worstitems) {
                worstItems = fight_data.worstitems;
            }
        }
        else {
            fight_data = new CSFightResult(htmlText);
        }
        // check it has a fight results
        if ( !(fight_result = fight_data.fight_result) ) {
            Logger.error('parseAttack: ERROR_NO_FIGHT_RESULT');
            return {success: ERROR_NO_FIGHT_RESULT, first_attack: bfirstAttack};
        }

        opponent.alive = attack_again = 
        !( fight_result.defender.was_iced
        || fight_result.defender.is_iced
        || fight_result.defender.is_killed
        || fight_result.defender.iced_self
        || fight_result.defender.you_iced);

        if (fight_data.fight_wrapper) {
            genFightWrapper(fight_data.fight_wrapper.html());
            bfirstAttack = true;
            
            fightStats.foes_attacked++;

            opponent.attack_req = Util.parseJSON(fight_data.atkbtn_req);
            opponent.pwratk_req = Util.parseJSON(fight_data.poweratkbtn_req);

            opponent.attack_boost = fight_data.atkbtn_boost_on;
            opponent.attack = fight_data.atkbtn_boost_off;
            opponent.pwratk_boost = fight_data.poweratkbtn_boost_on;
            opponent.pwratk = fight_data.poweratkbtn_boost_off;

            if (fight_data.opponenet_icon) {
                opponent.image = fight_data.opponenet_icon;
            }
        }
        
        var s_outText = '';
        var n_cash = fight_result.cash;
        var n_currentCash = (Util.isSet(opponent.lastCash) ? n_cash - opponent.lastCash : n_cash);
        var n_done = fight_result.defender.damage_dealt;
        var n_take = fight_result.attacker.damage_dealt;
        var n_expe = fight_result.experience;
        var n_won = 0, n_lost = 0;
        var b_goodCash   = (fight_result.cash_city === StartCity);
        var n_grpAttack, n_grpDefense;
        
        if (fight_result.status != 'ok') {
            if (fight_result.status == 'failed') {
                if (Util.isSet(fight_result.error)) {
                    Logger.error('parseAttack: '+fight_result.error);
                }
            }
            return {success: ERROR_NO_FIGHT_RESULT, first_attack: bfirstAttack};
        }

        // Add loot
        if (Util.isSet(fight_result.loot)) {
            addLootToLog(fight_result.loot, lootQuantity());
        }
        if( Util.isSet(fight_result.socialMessageCards)) {
            addLootToLog(fight_result.socialMessageCards, lootQuantity());
        }

        // check ICE state
        if ( opponent.ice_state === 0 ) {
            if( fight_result.you_just_killed || fight_result.you_just_iced ) {
                bOpponentGetIced = true;
                addIcedToLog(new CSIce(fight_result), opponent);
            } else if ( fight_result.ice_was_just_stolen ) {
                bOpponentGetIced = true;
                addStolenIceToLog(new CSStolenIce(fight_result), opponent, autoMode);
            }
        }
        // level up
        if (fight_data.popup && /levelUpBg/.test(fight_data.popup) ) {
            if ( options.stopByLevelup ) {
                $('#popup_fodder').html(fight_data.popup);
                bLevelUpStop = true;
                setTimeout(function() {
                    $('.pop_bg, .pop_box', '#'+fight_data.popup_id).show();
                },1000);
            }
        }

        n_won  = fight_result.power_attack.won;
        n_lost = fight_result.power_attack.lost;

        opponent.curWon      = n_won - opponent.lastWon;
        opponent.curLost     = n_lost - opponent.lastLost;
        opponent.curFights   = opponent.curWon + opponent.curLost;
        opponent.fights      = (n_lost + n_won);

        // APPLY STATS
        if (fight_result.ices_so_far)     { fightStats.season_ices   = fight_result.ices_so_far;     }
        if (fight_result.ices_target)     { fightStats.season_target = fight_result.ices_target;     }
        if (fight_result.total_ice_count) { fightStats.total_ices    = fight_result.total_ice_count; }
        
        
        //fightStats.attackStat    = n_grpAttack;
        fightStats.healthpct     = fight_result.attacker.current_health_pct;
        fightStats.won_fights   += opponent.curWon;
        fightStats.lost_fights  += opponent.curLost;
        fightStats.total_fights += opponent.curFights;
        fightStats.experience   += n_expe - opponent.lastXp;
        fightStats.staminaSpend += getStaminaSpendPerFight()*opponent.curFights;
        
        if (fight_data.fightbar) {
            if (fight_data.fightbar.group_atk) {
                n_grpAttack = Util.parseNum(fight_data.fightbar.group_atk);
                if (n_grpAttack > fightStats.startGroupAtk) {
                    fightStats.atkGained = n_grpAttack - fightStats.startGroupAtk;
                }
            }
            if (fight_data.fightbar.group_def) {
                n_grpDefense = Util.parseNum(fight_data.fightbar.group_def);
                if (n_grpDefense > fightStats.startGroupDef) {
                    fightStats.defGained = n_grpDefense - fightStats.startGroupDef;
                }
            }
        }
        if (Util.isSet(fightStats.cashWon[fight_result.cash_city])) {
            fightStats.cashWon[fight_result.cash_city] += n_currentCash;
        } else {
            fightStats.cashWon[fight_result.cash_city] = 0;
        }
        if (!Util.isSet(opponent.startedHealthPct)) {
            opponent.startedHealthPct = fight_result.defender.current_health_pct;
        }
        
        opponent.lastWon         = n_won;
        opponent.lastLost        = n_lost;
        opponent.lastXp          = n_expe;
        opponent.lastCash        = n_cash;
        opponent.curHealthPct    = fight_result.defender.current_health_pct;
        opponent.curOtherDamage  = fight_result.defender.other_damage;

        // BLACKLIST, WHITELIST AND CRITERIA
        if (fight_result.isWin)
        {
            if (autoMode) {
                // skip is health is more than
                if ( options.skipUseHealth && fight_result.defender.current_health_pct > options.skipHealth ) {
                        Logger.debug('skiping ' + opponent.name + ' health percentage is '+fight_result.defender.current_health_pct+'%');
                        attack_again = false;
                }
                // skip if no minimal cash
                if (n_currentCash < options.skipByMinCash) {
                    Logger.debug('skiping ' + opponent.name + ' cash of: ' + n_currentCash + ' less than: '+ options.skipByMinCash);
                    attack_again = false;
                }
                // skip if cash from different city
                if (options.skipWrongCash && b_goodCash !== true) {
                    Logger.debug('skiping ' + opponent.name + ' cash from different city.');
                    attack_again = false;
                }
                // skip if other damage
                if ( options.skipUnderAttk && fight_result.defender.other_damage) {
                    if ( fight_result.defender.other_damage > options.skipUnderAttkPct ) {
                        Logger.debug('skiping ' + opponent.name + ' get so many damage from others.');
                        attack_again = false;
                    }
                }
                /*
                if (StartCity === 4 && options.get('skipNoFaction') && !obj.addFaction) {
                    Logger.debug('skiping ' + opponent.name + ' no faction points.');
                    attack_again = false;
                }
                */
            }
        }
        else
        {
            if ( options.redIceActive === true ) {
                if ( !bfirstAttack && opponent.attacksToIce() >= options.redIceMaxAttk ) {
                    Logger.debug('skiping ' + opponent.name + ' fights for ice: '+opponent.attacksToIce()+'.');
                    attack_again = false;
                }  
            }
            else if ( opponent.lastWon > 0 && options.redIceAfterWon ) {
                if ( attack_again === true && opponent.autoRedIce !== true ) {
                    opponent.autoRedIce = true;
                    addToLog('You lost after win '+opponent.lastWon+' figths.<br>Red Ice mode temporarily activated for '+opponent.anchor(),'blacklist',opponent.image);                    
                }
            } 
            else {
                attack_again = false;
            }
            if ( opponent.lastWon === 0 ) {
                // add enemy to blacklist
                if ( options.get('useBlacklist') ) {
                    if (PlayerList.addCurrentToBlackList()) {
                        fightStats.blacklisted++;
                        addToLog('"The beast" '+opponent.anchor()+' is too strong!, added to BlackList.','blacklist',opponent.image);
                    }
                } 
            }
        }

        // TEXT RESULT
        if (fight_result.is_power_attack) {
            s_outText = 'You fought '+ opponent.curFights +' times. '
                      + '<span class="good">You won ' + opponent.curWon + ' fights</span> and '
                      + '<span class="bad">lost ' + opponent.curLost + ' fights</span>, ';
        } else {   // normal attacks
            if (fight_result.isWin) {
                s_outText = 'You fought 1 time. <span class="good">You won the fight</span>, ';
            }
            else {
                s_outText = 'You fought 1 time. <span class="bad">You lost the fight</span>, ';
            }
        }
        s_outText += 'taking <span class="bad">' + n_take + '</span> damage ';
        s_outText += 'and dealing <span class="good">' + n_done + '</span> damage to your enemy. ';
        s_outText += 'You ' + (fight_result.isWin ? 'gained' : 'losed');
        s_outText += ' <span class="' + (fight_result.isWin ? 'good' : 'bad') + '">' + (n_expe - opponent.lastXp);
        s_outText += '</span> experience points ';
        s_outText += 'and <span class="' + fight_result.cash_class + '">';
        s_outText += n_cash + '</span> cash. ';

        PlayerList.current = opponent;

        return {
            success  : ERROR_SUCCESS,
            opponent : opponent,
            outText  : s_outText,
            iced     : bOpponentGetIced,
            fight_result : fight_result,
            first_attack : bfirstAttack,
            attack_again : attack_again,
            levelUp_stop : bLevelUpStop
        };
        
        function lootQuantity() {
            if (fight_result.cash_city === CurrentCity) {
                if (CurrentCity===7 || CurrentCity===8) return 5;
            }
            return 1;
        }
    }

    function updateFightResponse(response, bHideRewards) {
        if (!response || !response.fight_result) {
            updateStats();
            return;
        }
        var fight_result = response.fight_result;
        // UPDATE FIGHT DATA
        setHealth(0, fight_result.attacker.current_health_pct);
        setHealth(1, fight_result.defender.current_health_pct);

        updateAttackerHealthVal(fight_result.attacker.health);
        updateAttackerAttackVal(fight_result.attacker.skill_atk, fight_result.attacker.skill_atk_no_boost, bAttackerUsedBoost);
        updateAttackerStaminaVal(fight_result.attacker.stamina, fight_result.attacker.max_stamina);

        showDamageTaken( 0, fight_result.attacker.damage_dealt );
        showDamageTaken( 1, fight_result.defender.damage_dealt );

        showOtherDamageTaken( 0, fight_result.attacker.other_damage );
        showOtherDamageTaken( 1, fight_result.defender.other_damage );

        if (bHideRewards !== true) {
            showFightRewards(fight_result.fight_info_div);  
        }
        updateFactionBar(fight_result.user_stats.faction_module);
        showWonLost(fight_result.isWin);

        $('#defender_boost_used, #attacker_boost_used', popupElt.content).hide();
        if (Util.isSet(fight_result.attacker.boost_used_tag) && fight_result.attacker.boost_used_tag != '') {
            showBoostUsed(0, fight_result.attacker.boost_used_tag);
        }
        if (Util.isSet(fight_result.defender.boost_used_tag) && fight_result.defender.boost_used_tag != '') {
            showBoostUsed(1, fight_result.defender.boost_used_tag);
        }

        showBoostUsage(fight_result.boost.total_qty, fight_result.boost.next, fight_result.boost.ask_timeout, fight_result.boost.qty_array);
        showIcedOverlays(fight_result, response.opponent, response.first_attack);
        showTopItems(0, fight_result.attacker.top_items);
        showTopItems(1, fight_result.defender.top_items);
        
        if (bAttackerUsedBoost !== fight_result.use_boost) {
            updateBoostState(bAttackerUsedBoost);
        } else {
            updateAttackerUsedBoost();
        }
        updateStats();
        
        return response.outText;
    }

    function Initialize() {
        autoPublish = new CSAutoPublish();

        PlayerList.blackList = new CSList('blackList');
        PlayerList.whiteList = new CSList('whiteList');
        PlayerList.enmClanList = new CSList('enmClanList');
        PlayerList.frdClanList = new CSList('frdClanList');
        
        lootCache = new CSLootList();

        travelCountdown = new Countdown({
            selector : '#timer_timetotravel',
            text     : 'Travel to new city in: ',
            success: function(elem) {
                elem.hide();
                setNewCurrentCity();
                addTravelCountdown();
            }
        });
        fightResumeCountdown = new Countdown({
            selector : '#msgcontainer',
            text     : 'Resume AutoFight in: ',
            success: function() {
                abort_process = false;
                sendMessage('Updating...', true);
                reqSurvey(AttackNewOpponent);
                addTravelCountdown();
                addFightCountdown();
            }
        });
        fightCountdown = new Countdown({
            selector : '#timer_timetopause',
            text     : 'Pause AutoFight in: ',
            success: function(elem) {
                elem.hide();
                abort_process = true;
                clearAllTimers();
                setTimeout(function() {
                    addAutoControls(true);
                    addFightResumeCountdown();
                },2000);
            }
        });
        // Generate DOM
        genMainDom();

        showDiv('items', '_logs');
        toStartScreen();
        $('#ctrlcontainer, #timer_timetotravel, #timer_timetopause').hide();

        sendMessage('Loading...', true);
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('survey', 'show_nps_survey'),
            success: function(jsonData)
            {
                if (popupElt.content.length < 1) {
                    return;
                }
                try {
                    updateUserFields(jsonData);
                    fightStats.startGroupAtk = Util.parseNum(jsonData.fightbar.group_atk);
                    fightStats.startGroupDef = Util.parseNum(jsonData.fightbar.group_def);
                    updateStats();
                } catch (e) {
                    sendMessage('Error loading stats, please Close and Open again.');
                }
                // get players from fight_controller page
                if ($('#inner_page').attr('class') == 'fight_controller') {
                    addNewOpponents($('#inner_page').html());
                    if (PlayerList.length() > 0) {
                        genEnemyListDom();
                        sendMessage();
                        $('#ctrlcontainer', popupElt.content).show();
                        return;
                    }
                }
                // if no opponents, refresh.
                Events.refresh_click();
            }
        });

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
        'bGVmdCBuby1yZXBlYXQgYmxhY2s7DQogICAgd2lkdGg6IDc1MHB4Ow0KCWhlaWdodDogMzUwcHg7DQoJYm9yZGVyOiAwcHg7DQog'+
        'ICAgdG9wOiAwcHg7DQogICAgbGVmdDogMHB4OyANCglwb3NpdGlvbjogcmVsYXRpdmU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAg'+
        'I29wdGlvbnNfd3JhcHBlciB7DQoJYmFja2dyb3VuZDogYmxhY2sgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdm'+
        'Yi9ncmFwaGljcy9zb2NpYWxtaXNzaW9ucy9iZ190ZXh0dXJlX21vZHVsZS5qcGcpIG5vLXJlcGVhdCBzY3JvbGwgNTAlIDAlOw0K'+
        'CXBhZGRpbmc6IDBweCA1cHg7DQoJaGVpZ2h0OiAxMDAlOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodF93cmFwcGVyIGRp'+
        'di51c2VyYm94IHsNCgl3aWR0aDogMjMycHg7DQoJaGVpZ2h0OiAzNDVweDsNCgliYWNrZ3JvdW5kOiB1cmwoJ2h0dHA6Ly9td2Zi'+
        'LnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvZmlnaHQvdjIvZmlnaHRfcGxheWVyYmFja2dyb3VuZC5wbmcnKSAwIDM1'+
        'cHggbm8tcmVwZWF0Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCglmbG9hdDogbGVmdDsNCiAgICBwb3NpdGlvbjogcmVsYXRpdmU7'+
        'DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI2F0dGFja2VyX2ZpZ2h0X3N0YXR1cywgI2RlZmVuZGVyX2ZpZ2h0X3N0YXR1cyB7DQoJ'+
        'aGVpZ2h0OiAzNnB4Ow0KCWZvbnQtc2l6ZTogMjhweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAgI2F0dGFja2VyX2ZpZ2h0X3N0'+
        'YXRzIHsNCgltYXJnaW46IDEwcHggYXV0bzsNCgl3aWR0aDogMjAwcHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgICNhdHRhY2tl'+
        'cl9waWMgew0KCWZsb2F0OiBsZWZ0Ow0KCXRleHQtYWxpZ246IHJpZ2h0Ow0KCXdpZHRoOiAxNDdweDsNCn0NCiNiYXR0bGVmaWVs'+
        'ZF9wb3B1cCAuZGl2SFBCYXIgew0KCWJhY2tncm91bmQ6IHVybCgnaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9n'+
        'cmFwaGljcy9maWdodC92Mi9maWdodF9oZWFsdGhfZ3JleS5wbmcnKSB0b3AgbGVmdCByZXBlYXQteDsNCgl3aWR0aDogMjE1cHg7'+
        'DQoJaGVpZ2h0OiAyM3B4Ow0KCW1hcmdpbjogNXB4IGF1dG87DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI2ZpZ2h0X2J0bl9wYW5l'+
        'bCB7DQoJaGVpZ2h0OiAzNTBweDsNCglmbG9hdDogbGVmdDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjYXR0YWNrZXJfYmVzdF9p'+
        'dGVtcywgI2RlZmVuZGVyX2Jlc3RfaXRlbXMgew0KCXdpZHRoOiA2NXB4Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgltYXJnaW4t'+
        'dG9wOiA0NXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2FjdGlvbnMgew0KCXdpZHRoOiAxMzBweDsNCn0NCiNi'+
        'YXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9kZWZlbmRlciB7DQoJbWFyZ2luOiA1cHggNXB4IDAgNXB4Ow0KfQ0KI2JhdHRsZWZp'+
        'ZWxkX3BvcHVwICNmaWdodF9idG5fcGFuZWwgZGl2LmJvb3N0Y29udGFpbmVyIHsNCgl3aWR0aDogMTg1cHg7DQoJbWFyZ2luOiAy'+
        'cHggMCAwIDQwcHg7DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KCW1pbi1oZWlnaHQ6IDc4cHg7DQp9DQojYmF0dGxlZmllbGRfcG9w'+
        'dXAgI2ZpZ2h0X2J0bl9wYW5lbCBkaXYuYm9vc3Rjb250YWluZXIgew0KCXRleHQtYWxpZ246IGNlbnRlcjsNCn0NCiNiYXR0bGVm'+
        'aWVsZF9wb3B1cCAuc3RhdF92aWN0b3J5IHsNCgliYWNrZ3JvdW5kOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9t'+
        'd2ZiL2dyYXBoaWNzL3ZpY3RvcnlfaWNvbi5naWYpIG5vLXJlcGVhdCAtMnB4IDUwJTsNCglwYWRkaW5nLWxlZnQ6IDE5cHg7DQp9'+
        'DQojYmF0dGxlZmllbGRfcG9wdXAgLnN0YXRfaWNlZCB7DQoJYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56Z25j'+
        'ZG4uY29tL213ZmIvZ3JhcGhpY3MvbWFwX2Jhc2VkX2pvYnMvbWFzdGVyeV9zdGFyc19tZWRfODF4MzBfMDIucG5nKSBuby1yZXBl'+
        'YXQgLTY0cHggLTEzcHg7DQoJcGFkZGluZy1sZWZ0OiAxOXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwIC5zdGF0X2tpbGwgew0K'+
        'CWJhY2tncm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL21hcF9iYXNlZF9qb2Jz'+
        'L21hc3Rlcnlfc3RhcnNfbWVkXzgxeDMwXzAyLnBuZykgbm8tcmVwZWF0IC00N3B4IDJweDsNCglwYWRkaW5nLWxlZnQ6IDE5cHg7'+
        'DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgLmxpc3RlZCB7DQoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKGh0dHA6Ly9td2Zi'+
        'LnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvdjMvaWNvbl93aXNobGlzdF9hZGRfMTl4MTRfMDEuZ2lmKSBuby1yZXBl'+
        'YXQgLTFweCA1MCU7DQoJcGFkZGluZy1sZWZ0OiAxOXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodE9wdCB7DQoJbWFy'+
        'Z2luOiAwcHg7DQoJd2lkdGg6IDczOHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodE9wdCB1bCB7DQoJbGlzdC1zdHls'+
        'ZS10eXBlOiBub25lOw0KCWhlaWdodDogMTAwJTsNCgl3aWR0aDogMTAwJTsNCgltYXJnaW46IDEwcHggMHB4IDBweDsNCglwYWRk'+
        'aW5nOiAwcHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCglvdmVyZmxvdzogYXV0bzsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjZmln'+
        'aHRPcHQgdWwgbGkgew0KCWRpc3BsYXk6IGJsb2NrOw0KCW1hcmdpbjogMHB4IDBweCAwcHggNXB4Ow0KCXBhZGRpbmc6IDBweDsN'+
        'CgloZWlnaHQ6IDI4cHg7DQoJbWF4LWhlaWdodDogMjhweDsNCglvdmVyZmxvdzogaGlkZGVuOw0KfQ0KI2JhdHRsZWZpZWxkX3Bv'+
        'cHVwICN3cmFwcGVyX2luZm8gew0KCWJhY2tncm91bmQ6IHVybCgnaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9n'+
        'cmFwaGljcy9maWdodC92Mi9maWdodF9sb290dHJheV9zbGl2ZXIuanBnJykgdG9wIGxlZnQgcmVwZWF0LXg7DQoJaGVpZ2h0OiAx'+
        'MjBweDsNCgltYXJnaW4tdG9wOiAwcHg7DQoJbWFyZ2luLXJpZ2h0OiBhdXRvOw0KCW1hcmdpbi1ib3R0b206IDBweDsNCgltYXJn'+
        'aW4tbGVmdDogYXV0bzsNCglib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzMzsNCn0gDQojYmF0dGxlZmllbGRfcG9wdXAgI3dy'+
        'YXBwZXJfaW5mbyAuZmlnaHRWMl9tc2dfY3RybCB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lkdGg6IDQ5MHB4Ow0KCWhlaWdodDogMTAw'+
        'cHg7DQoJbWFyZ2luOiAxNHB4IDExcHggMDsNCglvdmVyZmxvdzogaGlkZGVuOw0KCXBvc2l0aW9uOiByZWxhdGl2ZTsNCgl6LWlu'+
        'ZGV4OiAwOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2luZm8gI2N0cmxjb250YWluZXIgew0KCWhlaWdodDogNDBw'+
        'eDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9pbmZvIC5maWdodFYyX3Jlc3VsdCB7DQoJZmxvYXQ6IHJpZ2h0Ow0K'+
        'CWJhY2tncm91bmQ6IHVybCgnaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9maWdodC92Mi9maWdo'+
        'dF9sb290dHJheV9saW5lLnBuZycpIDAgNTAlIG5vLXJlcGVhdDsNCgl3aWR0aDogMjEwcHg7DQoJaGVpZ2h0OiAxMDBweDsNCglw'+
        'YWRkaW5nOiAxMHB4IDVweCAxMHB4IDE1cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIHsNCgli'+
        'YWNrZ3JvdW5kLWNvbG9yOiBibGFjazsNCgliYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNv'+
        'bS9td2ZiL2dyYXBoaWNzL2l0YWx5X2Q0LmpwZyk7DQoJYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIDAlOw0KCWJhY2tncm91bmQt'+
        'cmVwZWF0OiBuby1yZXBlYXQ7DQoJaGVpZ2h0OiA0NTBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3Rh'+
        'dHMgLmZpZ2h0VjJfc3RhdHMgew0KCWJhY2tncm91bmQ6IHVybCgnaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9n'+
        'cmFwaGljcy9maWdodC92Mi9maWdodF9sb290dHJheV9saW5lLnBuZycpIDAgNTAlIG5vLXJlcGVhdDsNCglmbG9hdDogcmlnaHQ7'+
        'DQoJaGVpZ2h0OiA5NyU7DQoJd2lkdGg6IDIxMHB4Ow0KCXBhZGRpbmc6IDEwcHggNXB4IDEwcHggMTVweDsNCgl0ZXh0LWFsaWdu'+
        'OiBsZWZ0Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9zdGF0cyBkbCB7DQoJaGVp'+
        'Z2h0OiAyMHB4Ow0KCW1hcmdpbjogMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRW'+
        'Ml9zdGF0cyBkbCBpbWcgew0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogMTlweDsNCgl3aWR0aDogMTlweDsNCgltYXJnaW4tcmln'+
        'aHQ6IDJweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfc3RhdHMgZGwgZHQgew0K'+
        'CWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbjogMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmln'+
        'aHRWMl9zdGF0cyBkbCBkZCB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCW1hcmdpbjogMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3'+
        'cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9zdGF0cyAubnVtYmVycyB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWZvbnQtd2VpZ2h0OiBi'+
        'b2xkOw0KCW1hcmdpbjogMHB4Ow0KCW92ZXJmbG93OiBoaWRkZW47DQoJcGFkZGluZzogMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3Bv'+
        'cHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgew0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogOTklOw0KCXdpZHRo'+
        'OiA1MTVweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlz'+
        'dCB7DQoJaGVpZ2h0OiBhdXRvOw0KCW92ZXJmbG93OiBoaWRkZW47DQoJdGV4dC1hbGlnbjogbGVmdDsNCgloZWlnaHQ6IDEwMCU7'+
        'DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgI2ZpZ2h0'+
        'bG9ncyB7DQoJYm9yZGVyOiAwcHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xv'+
        'ZyAjZXZlbnRzX2xpc3QgLmJ1dHRvbnMgew0KCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzMzOw0KCWJvcmRlci1yaWdodDog'+
        'MXB4IHNvbGlkICMzMzM7DQp9CQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgI2V2'+
        'ZW50c19saXN0IC5idXR0b25zIGEgew0KCWJvcmRlci1sZWZ0OiAxcHggc29saWQgIzMzMzsNCglib3JkZXItcmlnaHQ6IDFweCBz'+
        'b2xpZCAjMzMzOw0KCXBhZGRpbmctbGVmdDogMTBweDsNCglwYWRkaW5nLXJpZ2h0OiAxMHB4Ow0KCW9wYWNpdHk6IDAuNTsNCn0N'+
        'CiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlzdCAuYnV0dG9ucyBh'+
        'LnNlbGVjdGVkIHsNCglmb250LXdlaWdodDogYm9sZDsNCglvcGFjaXR5OiAxOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFw'+
        'cGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgI2V2ZW50c19saXN0IC5idXR0b25zIGE6Zmlyc3QtY2hpbGQgew0KCW1hcmdpbi1s'+
        'ZWZ0OiAyMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgI2V2ZW50c19s'+
        'aXN0IHVsIHsNCglsaXN0LXN0eWxlLXR5cGU6IG5vbmU7DQoJbWFyZ2luOiAwcHg7DQoJb3ZlcmZsb3c6IGF1dG87DQoJcGFkZGlu'+
        'ZzogMHB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJd2lkdGg6IDEwMCU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJf'+
        'bG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgdWwgbGkgew0KCW1hcmdpbjogMTBweCAwcHggMHB4IDIwcHg7DQp9'+
        'DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgZGl2I2l0ZW1z'+
        'X2xvZ3Mgew0KCWhlaWdodDogOTUlOw0KCW1hcmdpbi10b3A6IDVweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9s'+
        'b2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlzdCBkaXYjaWNlZF9sb2dzIHsNCgloZWlnaHQ6IDk1JTsNCgltYXJnaW4t'+
        'dG9wOiA1cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xp'+
        'c3QgZGl2I2xvb3RfbG9ncyB1bCB7DQoJaGVpZ2h0OiA5NSU7DQoJbWFyZ2luLXRvcDogNXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3Bv'+
        'cHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgI29wcG9uZW50c19saXN0IHsNCgloZWlnaHQ6IDEwMCU7DQp9DQoj'+
        'YmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjb3Bwb25lbnRzX2xpc3QgLmhlYWRlciB7'+
        'DQoJaGVpZ2h0OiA1JTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNvcHBv'+
        'bmVudHNfbGlzdCAuaGVhZGVyIGEgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbi1sZWZ0OiAyMHB4Ow0KfQ0KI2JhdHRsZWZpZWxk'+
        'X3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgI29wcG9uZW50c19saXN0ICNvcHBvbmVudHNfdGFibGUgew0K'+
        'CWhlaWdodDogOTUlOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgLnBsYXll'+
        'cl91cGRhdGVzIHsNCiAgICBvdmVyZmxvdy14OiBoaWRkZW47DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNiYXR0bGVmaWVs'+
        'ZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nIC51cGRhdGVfdHh0IHsNCgl3aWR0aDogMzYwcHg7DQoJZm9u'+
        'dC1mYW1pbHk6IHRyZWJ1Y2hldCBNUzsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogd2hpdGU7DQoJY2xlYXI6IG5vbmU7'+
        'DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjaXRlbXNfbG9ncyAubG9vdCB7'+
        'DQoJYmFja2dyb3VuZDogYmxhY2sgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9maWdodF9i'+
        'b251c2VzL3NpZGVfYm9udXNsb290LnBuZykgbm8tcmVwZWF0IHNjcm9sbCAxMDAlIDUwJTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1'+
        'cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNpdGVtc19sb2dzIC5zdGFzaCB7DQoJYmFja2dyb3VuZDogYmxhY2sg'+
        'dXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9maWdodF9ib251c2VzL3NpZGVfc2VjcmV0c3Rh'+
        'c2gucG5nKSBuby1yZXBlYXQgc2Nyb2xsIDEwMCUgNTAlOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0'+
        'cyAuZmlnaHRWMl9sb2cgI2l0ZW1zX2xvZ3MgLnN0YXNoIC51cGRhdGVfdHh0IHsNCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsN'+
        'CglvcGFjaXR5OiAwLjk7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjaXRl'+
        'bXNfbG9ncyAubG9vdCAudXBkYXRlX3R4dCB7DQoJYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7DQoJb3BhY2l0eTogMC45Ow0KfQ=='
    );
    // load options and Initialize
    options.load(Initialize);
}

/**
 * Set configuration.
 */
UserConfig.create('caopt', {
    taskmaster : {
        '7': false,
        '8': false
    },
    collect: UserConfig.getSettingFrom(global.cities, 'all'),
    deposit: UserConfig.getSettingFrom(global.cities, true)
});

/**
 * Collect all cities and bank cash
 */
function CollectAllCities() {
    
    var startCity = MW.currentCity();
    var abort_process = false;    
    var c_cities = new Collection(global.cities);
    var options = UserConfig.caopt;    
    var cityCodes = {
        7: {
            'skip'        : 'Skip', 
            'Properties'  : 'All',
            'Cash'        : 'Cash',
            'Refinery'    : 'Energy',
            'Barracks'    : 'Stamina'
        }
    };
    var taskMasters = {
        7: 'remote/' + MW.getIntURL('CityCrew','activate', 7) + 'isajax=1&crew_city=7&crew_type=prop&crew_dsp_type=prop&crew_slot=1',
        8: 'remote/' + MW.getIntURL('CityCrew','activate', 8) + 'isajax=1&crew_city=8&crew_type=prop&crew_dsp_type=prop&crew_slot=1'
    };
    var collectAll_click = function() {
        if ($(this).hasClass('disabled')) {
            return;
        }
        $(this).addClass('disabled');
        options.fromDomElements();
        Util.each(global.cities, function(city) {
            var cityElt = c$('div','class:city_messages,id:message_city'+city);
            $('.city_booble .city' + city).empty().append(cityElt);
            if (options.collect[city] === 'skip') {
                cityElt.html('This city is skipped by the user.');
            } else {
                cityElt.html('Waiting...');
            }
        });
        options.save(c_cities.MoveFirst);
    };

    var popupElt = new PopupObject('collectall_popup', {
        type: 'main',
        title: '<img src="'+global.resource.collectallcities_title+'">',
        width: 690,
        top: 40,
        onclose: function() {
            abort_process = true;
            options.fromDomElements();
            options.save();
        },
        buttons: [{
            label: 'Collect All!',
            addClass: 'short white',
            onclick: collectAll_click
        }]
    });
    /**
     * Generate a city booble.
     * @param {String} id
     * @param {String} name
     */
    function genCityBoobleDom(id, name) {
        
        var elt = c$('div', 'class:city_booble').appendTo(popupElt.content);
        var optDiv = c$('div').css({
            'float': 'right',
            'text-align': 'left',
            'width': 250
        });
        
        c$('div').css('margin',5).appendTo(c$('div','class:city'+id).appendTo(elt))
        .append(s$('caopt_collect_'+id, 'Collect: ', 100)).append(optDiv);
        
        x$('caopt_deposit_'+id, 'Deposit cash after collect it.').appendTo(optDiv);
        if (Util.isSet(taskMasters[id])) {
            c$('div').css('clear','both').appendTo(optDiv);
            x$('caopt_taskmaster_'+id, 'Active Taskmaster before collect.').appendTo(optDiv);
        }
        
        elt = $('#caopt_collect_'+id, popupElt.content);
        Util.each((cityCodes[id] || {'skip':'Skip','all':'All'}), function(v, n) {
            elt.append(c$('option', 'value:'+v).text(n));
        });
    }
    /**
     * @param {Number} pos
     * @param {Number} city
     * @param {String} city_name
     */
    function nextCity(pos, city, city_name) {
        var cityElt = $('#message_city'+city, popupElt.content);
        var collectMessage = '';
        
        if (abort_process) {
            return;
        }
        Logger.debug( options.collect[city] );
        if (options.collect[city] === 'skip') {
            c_cities.MoveNext();
            return;
        }
        
        cityElt.html('Traveling...');
        
        MW.travel(city, function(new_city) {
            if (new_city === parseInt(city)) {
                taskMaster();
            }
            else {
                cityElt.html('Error traveling.');
                c_cities.MoveNext();
            }
        });
        
        function taskMaster() {
            if (Util.isSet(taskMasters[city]) && options.taskmaster[city] === true) {
                cityElt.html('Activating Taskmaster...');
                httpAjaxRequest({url: taskMasters[city], success: collectAll});
            } else {
                collectAll();
            }
        }
        
        function depositAll(amount) {
            if (abort_process) {
                return;
            }
            if (isNaN(amount) || amount < 11 || !options.deposit[city]) {
                c_cities.MoveNext();
                return;
            }
            cityElt.html('Depositing...');
            
            MW.deposit(city, amount, function(result) {
                cityElt.html(collectMessage + '<br>' + result);
                c_cities.MoveNext();
            });
        }
        function collectAll(obj) {
            if (Util.isSet(obj)) Logger.debug(obj);
            if (abort_process) {
                return;
            }
            cityElt.html('Collecting...');
            
            MW.collect(city, options.collect[city], function(r) {
                cityElt.html(collectMessage = r.message);
                depositAll(r.cash);
            });
        }    
    }
    
    // Set c_cities collection actions
    c_cities.onMove(nextCity);
    c_cities.onEnd(function(){ MW.travel(startCity); });
    
    // Style
    popupElt.addBase64Style(
        'I2NvbGxlY3RhbGxfcG9wdXAgLmJsYWNrX2JveCB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7IA0KCWNvbG9yOiByZ2IoMjA4LCAyMDgs'+
        'IDIwOCk7IA0KCWJvcmRlcjogMXB4IHNvbGlkIHJnYigxNTMsIDE1MywgMTUzKTsgDQoJYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7'+
        'IA0KCWZvbnQtc2l6ZTogMTRweDsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwIC5jaXR5X2Jvb2JsZSB7DQoJbWFyZ2luOiAxMHB4Ow0K'+
        'fQ0KI2NvbGxlY3RhbGxfcG9wdXAgLmNpdHlfYm9vYmxlID4gZGl2IHsNCglib3JkZXI6IHRoaW4gc29saWQgIzZCNkI2QjsNCgkt'+
        'd2Via2l0LWJvcmRlci1yYWRpdXM6IDhweDsNCgktbW96LWJvcmRlci1yYWRpdXM6IDhweDsNCglib3JkZXItcmFkaXVzOiA4cHg7'+
        'DQogICAgcGFkZGluZzogNXB4IDVweCAwIDE4MHB4Ow0KICAgIGhlaWdodDogNTFweDsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwIC5j'+
        'aXR5X2Jvb2JsZSAuY2l0eV9tZXNzYWdlcyB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjsNCgktd2Via2l0LWJvcmRl'+
        'ci1yYWRpdXM6IDRweDsNCgktbW96LWJvcmRlci1yYWRpdXM6IDRweDsNCglib3JkZXItcmFkaXVzOiA0cHg7DQogICAgbWluLWhl'+
        'aWdodDogMzVweDsNCiAgICBib3JkZXI6IHRoaW4gaW5zZXQgIzQ0NDsNCiAgICBmb250LXNpemU6IDEycHg7DQogICAgcGFkZGlu'+
        'ZzogNXB4Ow0KfQ0KI2NvbGxlY3RhbGxfcG9wdXAgLmNpdHlfYm9vYmxlIC5zZWxlY3RlZCB7DQoJYm9yZGVyOiB0aGluIHNvbGlk'+
        'IGdyZWVuOw0KfQ0KI2NvbGxlY3RhbGxfcG9wdXAgLmNpdHkxIHsNCgliYWNrZ3JvdW5kOiBibGFjayB1cmwoaHR0cDovL213ZmIu'+
        'c3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL21hZmlhX3dhcnNfOTI4eDU2XzAzLmpwZykgbm8tcmVwZWF0IHNjcm9sbCAt'+
        'NXB4IDAlOw0KfQkNCiNjb2xsZWN0YWxsX3BvcHVwIC5jaXR5MiB7DQoJYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7DQp9DQojY29s'+
        'bGVjdGFsbF9wb3B1cCAuY2l0eTMgew0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNrOw0KfQ0KI2NvbGxlY3RhbGxfcG9wdXAgLmNp'+
        'dHk0IHsNCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwIC5jaXR5NSB7DQoJYmFja2dyb3Vu'+
        'ZDogYmxhY2sgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy92ZWdhc19oZWFkZXJfNzYweDU2'+
        'XzAxLmdpZikgbm8tcmVwZWF0IHNjcm9sbCAwJSAwJTsNCn0NCiNjb2xsZWN0YWxsX3BvcHVwIC5jaXR5NiB7DQoJYmFja2dyb3Vu'+
        'ZDogYmxhY2sgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9pdGFseV9oZWFkZXJfMDEuanBn'+
        'KSBuby1yZXBlYXQgc2Nyb2xsIC0yMHB4IDAlOw0KfQ0KI2NvbGxlY3RhbGxfcG9wdXAgLmNpdHk3IHsNCgliYWNrZ3JvdW5kOiBi'+
        'bGFjayB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL2JyYXppbF9oZWFkZXJfMDEucG5nKSBu'+
        'by1yZXBlYXQgc2Nyb2xsIC01cHggMCU7DQp9DQojY29sbGVjdGFsbF9wb3B1cCAuY2l0eTggew0KCWJhY2tncm91bmQ6IGJsYWNr'+
        'IHVybChodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3MvY2hpY2Fnb19oZWFkZXJfMDEucG5nKSBuby1y'+
        'ZXBlYXQgc2Nyb2xsIC01cHggMCU7DQp9'
    );
    
    options.load(function() {
        Util.each(global.cities, genCityBoobleDom);
        $('select', popupElt.content).addClass('black_box');
        options.toDomElements();
        popupElt.show();
    });
}
// ==Script==
// @id        Configuration.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Create a new popup with global config options
 */
function Configuration() {
    var inputFileElt, options = UserConfig.main;
    
    var features = [
        {id:'opt_PlayerStats',      label:'Modify player stats to show energy/stamita/global ratios.'},
        {id:'opt_JobRates',         label:'Modify jobs stats to show energy/stamita ratios.'},
        {id:'opt_GiftPage',         label:'Modify Gift page to show new gifts and options.'},
        {id:'opt_CollectionPage',   label:'Modify Collection Page to use Multi Gifter popup for send gifts.'},
        {id:'opt_ProfilePage',      label:'Modify User\'s Profiles to add new actions.'},
        {id:'opt_FamilyPage',       label:'Modify Family\'s Pages to add new actions.'}
    ];
    
    var popupElt = new PopupObject('config_popup', {
        type: 'main',
        title: '<img src="'+global.resource.configuration_title+'">',
        width: 650,
        center: false,
        buttons: [{label: 'Save configuration'}],
        onclose: function() {
            // free memory usage
            FileSystem.revokeObjectURL();
            SaveConfiguration();
        } 
    });
    
    var Events = {
        givepermissions_click: function() {
            var perms = 'read_stream,publish_stream,user_groups,offline_access,read_friendlists';
            facebook.requestPermission(perms, function(success) {
                Logger.debug('Give All Permissions: '+success);
            });
            return false;
        },
        
        savelogin_click: function() {
            var e = $('#short_service_login'), obj = options.shortServiceLogin;
            obj[ $('#login_name_text',e).text() ] = $('#login_name',e).val();
            obj[ $('#login_key_text',e).text()  ] = $('#login_key',e).val();
            options.save(savedLoginMessage);
        },
        
        refreshgroups_click: function() {
            var self = $(this);
            if (!self.hasClass('disabled')) {
                self.addClass('disabled');
                global.fb_groups.refresh(function() {
                    global.fb_groups.addToSelect('#groups_list', 0);
                    self.removeClass('disabled');
                });
            }
            return false;
        },
        removegroup_click: function() {
            var self = $(this);
            if (self.hasClass('disabled')) {
                return false;
            }
            self.addClass('disabled');
            
            $('option:selected', '#groups_list').each(function(i,elem) {
                if (parseInt(elem.value) !== 0) {
                    delete options.groups[elem.value];
                }
            });
            
            options.save(function(){
                global.fb_groups.addToSelect('#groups_list', 0);
                self.removeClass('disabled');
            })
            return false;
        },
        services_change: function() {
            var infoElt = $('#short_service_info', popupElt.content),
                loginElt = $('#short_service_login', popupElt.content),
                slogin = options.shortServiceLogin,
                service = URLShortening.shortURL[ this.value ];
            
            if ( Util.isSet(service) ) {
                if (service.login) {
                    loginElt.show();
                    infoElt.hide();
                    $('p',loginElt).html(service.description);
                    $('#login_name_text',loginElt).html(service.login.name);
                    $('#login_key_text',loginElt).html(service.login.key);
                    $('#login_name',loginElt).val(slogin[service.login.name] || '');
                    $('#login_key', loginElt).val(slogin[service.login.key]  || '');
                } else {
                    loginElt.hide();
                    infoElt.html(service.description).show();
                }
            } else if ( Util.isSet(service = URLShortening.unshortURL[ this.value ]) ) {
                $('#unshort_service_info').html(service.description);
            }
            return false;
        },
        import_click: function() {
            $('#import_settings').click();
            return false;
        },
        
        export_click: function() {
            return global.is_chrome;
        },
        
        privacy_change: function() {
            var self = this;
            var privacy = options.privacy;
            var friendListElt = $('#friendlists', popupElt.content);
            
            if(this.options[this.selectedIndex].value != 'CUSTOM') {
                friendListElt.hide();
                return false;
            }
            facebook.needAppPermission('read_friendlists', function(success) {
                if(!success) {
                    self.selectedIndex = 1;
                    return;
                }
                facebook.friendlist(function(resp) {
                    if (!resp || resp.error_code || resp.data.length < 1) {
                        showHelpPopup({
                            icon: 'error',
                            title: 'friendlist length',
                            message: 'Seem that you haven\'t friendlists.'
                        });
                        return;
                    }
                    friendListElt.empty();
                    Util.each(resp.data, function(i, list) {
                        var option = c$('option', 'value:'+list.id).text(list.name);
                        friendListElt.append(option);
                        if (privacy && privacy.allow == list.id) {
                            option.attr('selected', 'selected');
                        }
                    });
                    friendListElt.show();
                });
            });
            return false;
        },
        
        language_change: function() {
            var langID = this.options[this.selectedIndex].value;
            if ( langID === 'none' ) {
                langID = global.mw_locale;
            }
            if (Tooltips.resourceExists(langID)) {
                $('#language_description', popupElt.content).empty()
                .append(c$('p').css('color', 'green').text('Description:'))
                .append(c$('div').html( Tooltips.getResource(langID).description ));
            } else {
                $('#language_description', popupElt.content).empty();
            }
            return false;
        }
    };
    /**
     * Import all settings.
     * @param {Object} e
     */
    function loadImportedData(e) {
        if (!e.target.files) {
            return;
        }
        FileSystem.fileReader(e.target.files, function(data) {
            try {
                if ((index = data.indexOf('base64,'))) {
                    data = global.Base64.decode(data.substr(index + 7));
                }
                Util.each(Util.parseJSON(data), function(name, value) {
                    if (!Util.isSet(UserConfig[name])) {
                        return;
                    }
                    UserConfig[name].load(function() {
                        UserConfig[name].fromObject(value);
                        UserConfig[name].save();
                    });
                });
                options.toDomElements();
                $(e.target).replaceWith(getInputFile());
                showHelpPopup({
                    icon:'info',
                    title:'Import Setting',
                    message:'File Settings imported successfully.'
                });
            }
            catch(err) {
                Logger.error(err);
            }
        });
    }
    
    function savedLoginMessage() {
        showHelpPopup({
            icon:'info',
            title:'Login Saved',
            message:'Your login information has been saved successfully.'
        });
    }
    
    /**
     * Export all settings.
     */
    function createExportData() {
        var values = new Object();
        var c_cat = new Collection(UserConfig);
        
        c_cat.onMove(function(pos, name, item) {
            var options = UserConfig[name];
            var check = Util.isArray(options._excludedToExport)  
            ? new RegExp(options._excludedToExport.join('|'),'i') 
            : false;
            
            options.load(function() {
                values[name] = new Object();
                options.each(function(opt, val) {
                    if (check === false || !check.test(opt)) {
                        values[name][opt] = val;
                    }
                });
                c_cat.MoveNext();
            });
        });
        
        c_cat.onEnd(function() {
            var dataURL = 'data:application/json;base64,' + global.Base64.encode(Util.toJSON(values));
            $('#export_settings').attr('href', FileSystem.createObjectURL(dataURL));
            return;
            /*
            var sOutput = String(Util.toJSON(values));
            showTextPopup('Copy this encoded configuration to share/save:',
                'data:application/json;base64,' + global.Base64.encode(sOutput));
            */
        });
        
        SaveConfiguration(c_cat.MoveFirst);
    }
    /**
     * Return a new input:file element.
     */
    function getInputFile() {
        return c$('input:file','id:import_settings,name:files[]').css({
            'position':'absolute',
            'width':1,
            'left':'-100px',
            'opacity':0
        }).change(loadImportedData);
    }    
    /**
     * Save configuration.
     * @param {Object} callback
     */
    function SaveConfiguration(callback) {
        var value = $('option:selected', '#privacy').val();
        if (value !== 'CUSTOM') {
            options.set('privacy', {'value':value});
        }
        else {
            options.set('privacy', {
                'value': value,
                'friends': 'SOME_FRIENDS',
                'allow': $('option:selected', '#friendlists').val()
            });
        }
        options.fromDomElements();
        options.save(callback);
    }

    function genMainDom() {        
        c$('div').appendTo(popupElt.header).html('Version: '+ AppInfo.version).css({
            'float'        : 'right',
            'font-size'    : 16,
            'font-weight'  : 'bold',
            'margin'       : '35px 40px 0px'
        });
        popupElt.content.css('padding', '10px 30px');

        var thisTab, tb = new TabObject(popupElt.content,'config_tabs',
        ['General', 'Features', 'Auto Actions', 'Services', 'Publish', 'Tooltips'], 300);
    
        // ----------------------------------
        // GENERAL SETTINGS
        // ----------------------------------
        thisTab = tb.getLayout(0).css('padding',20);
        c$('p').appendTo(thisTab)
        .append(c$('span').text('You need to give '))
        .append(c$('a','id:give_all_permissions').text('All required Permission').click(Events.givepermissions_click))
        .append(c$('span').text(' to Mafia Wars.')) 
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(x$('main_publishPreview', 'Use Facebook user interface (UI).'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(x$('main_checkForUpdates', 'Check for Addon updates.'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(x$('main_debugMode', 'Debug Mode, (CTRL + SHIFT + J to open debug window).'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(x$('main_hideSocialModule', 'Hide Social Module in Main page.'))
        .append(c$('div').css({'clear':'both','margin':'10px 0px 10px 0px','border-bottom':'1px solid #333'}))
        .append(c$('div').append(n$('main_fbtimeout', 'Facebook Requests Timeout (sec):', 50)).css({'padding-right':200,'text-align':'right'}))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('div').append(n$('main_rqtimeout', 'MafiaWars Requests Timeout (sec):', 50)).css({'padding-right':200,'text-align':'right'}))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('div').append(n$('main_jstimeout', 'JSON Services Timeout (sec):', 50)).css({'padding-right':200,'text-align':'right'}))
        .append(c$('div').css({'clear':'both','margin':'10px 0px 10px 0px','border-bottom':'1px solid #333'}));

        c$('center').appendTo(thisTab).css('margin-top', 20).append(getInputFile())
        .append(b$('Import settings', 'class:medium orange').css('margin-right',5).click(Events.import_click))
        .append(b$('Export settings', 'id:export_settings,download:MWAddonSettings.txt,title:Save Link As...')
            .addClass('medium orange').click(Events.export_click).mouseenter(createExportData))
        .append(c$('div').css({'clear':'both','margin-top':5}));


        // ----------------------------------
        // FEATURES
        // ----------------------------------
        thisTab = tb.getLayout(1).css('padding',20);
        Util.each(features, function(index, item) {
            thisTab.append(x$('main_'+item.id, item.label));
            thisTab.append(c$('div').css({'clear':'both','margin-top':6}));
        });
        
        // ----------------------------------
        // AUTOACTIONS SETTINGS
        // ----------------------------------
        thisTab = tb.getLayout(2).css('padding',20);
        
        x$('main_autoheal', 'Auto heal,').css('width',150).appendTo(thisTab);
        n$('main_autohealwhen', 'when health goes below:').appendTo(thisTab);
        c$('span').text(' In: ').appendTo(thisTab);
        s$('main_autohealin', 120).appendTo(thisTab);
        
        c$('p').text('Autodeposit in:').appendTo(thisTab);
        thisTab = c$('ul').appendTo(thisTab).css('list-style-type','none');
        
        Util.each(global.cities, function(index, name) {
            var id = 'main_autodeposit_'+index;
            c$('li', 'id:'+id).appendTo(thisTab).height(25)
            .append(x$(id + '_active', name, 'div').css({'float':'left','width':100}))
            .append(t$(id + '_amount', ' When cash is more than: ', 150));
        });

        // ----------------------------------
        // SHORTENER SERVICES
        // ----------------------------------
        thisTab = tb.getLayout(3).css('padding',20)
        .append(c$('div').text('Select the shortener service:'))
        .append(s$('main_shortserviceid', 548).change(Events.services_change))
        .append(c$('div', 'id:short_service_info').css({'margin-top':5,'min-height':100}))
        .append(c$('div', 'id:short_service_login').css({'margin-top':5,'min-height':100}).hide())
        .append(c$('div').css({'border-top':'1px solid #333','padding-top':5}).text('Select the unshortener service:'))
        .append(s$('main_unshortserviceid', 548).change(Events.services_change))
        .append(c$('div', 'id:unshort_service_info').css({'margin-top':5,'min-height':100}));
        
        
        thisTab = $('#short_service_login');
        b$('Save Login', 'class:medium white').click(Events.savelogin_click).css('float','right').appendTo(thisTab);
        c$('div').css('float','left').width(420).appendTo(thisTab)
        .append(c$('p').css('margin','2px 0px 2px 0px'))
        .append(c$('span','id:login_name_text').css('color','green'))
        .append(c$('input:text','id:login_name').width(320).css('float','right'))
        .append(c$('div').css('clear','both'))
        .append(c$('span','id:login_key_text').css('color','green'))
        .append(c$('input:text','id:login_key').width(320).css('float','right'));
        
        // ----------------------------------
        // PUBLISH SETTINGS
        // ----------------------------------
        thisTab = tb.getLayout(4).css('padding',20)
        .append(c$('div').css('margin-bottom',5).text('Wall posts privacy: '))
        .append(s$('privacy', 200).change(Events.privacy_change))
        .append(s$('friendlists', 200).hide());
        
        thisTab.append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('div').text('Manage Groups:').css({'clear':'both','margin-top':5,'border-top':'1px solid #333'}))
        .append(c$('select', 'id:groups_list,multiple:multiple').css({'float':'left','width':400,'height':200,'margin-right':5}))
        .append(c$('div').css('float','left')
        .append(b$('Refresh','class:green medium').click(Events.refreshgroups_click))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(b$('Remove','class:red medium').click(Events.removegroup_click)));
               
        // ----------------------------------
        // TOOLTIP HELPER
        // ----------------------------------
        tb.getLayout(5).css('padding',20)
        .append(x$('main_tooltips', 'Enable Tooltips helps.'))
        .append(c$('div').text('Language selection').css({'border-bottom': '1px solid #333','margin': '10px 0px 5px 0px'}))
        .append(c$('div').text('Current Mafia Wars language: '+global.mw_locale))
        .append(s$('main_tooltiplanguage', 300).change(Events.language_change)
            .append(c$('option', 'value:none').text('Use Mafia Wars language')))
        .append(c$('div', 'id:language_description').css({'margin-top':8,'border-top':'1px solid #333'}));
        
        
        // ----------------------------------
        // PAYPAL BUTTON
        // ----------------------------------
        c$('a', 'target:_black').appendTo(c$('center').css('margin',5).appendTo(popupElt.content))
        .attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=MafiaWarsManiac%40hotmail%2esg&lc=US&item_name=Mafia%20Wars%20Maniac&no_note=0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest')
        .append(c$('img').attr('src', 'https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif'));
        
        
        // ----------------------------------
        popupElt.applyOptions({
            'main_autohealin': {1:'New York', 0:'Current City'},
            'main_tooltiplanguage': Tooltips.toArray(),
            'main_shortserviceid': URLShortening.toArray('shortURL'),
            'main_unshortserviceid': URLShortening.toArray('unshortURL'),
            'privacy': {
                'EVERYONE'            : 'Everyone',
                'ALL_FRIENDS'         : 'All friends',
                'FRIENDS_OF_FRIENDS'  : 'Friends of friends',
                'SELF'                : 'Myself',
                'CUSTOM'              : 'From friend list'
            }
        });
        
        $('input, select', popupElt.content).addClass('black_box');
        
        global.fb_groups.addToSelect('#groups_list', 0);      
          
        if (options.privacy) {
            $('#privacy option[value='+options.privacy.value+']', popupElt.content).attr('selected','selected');
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
    
    options.load(function() {
        genMainDom();
        options.toDomElements();
        // show popup
        popupElt.show();
        $('select', popupElt.content).change();
    });
}
// ==Script==
// @id        CraftManager.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==

UserConfig.create('cmopt');

/**
 * Craft Manager.
 */
function CraftManager() {
    
    var countDowns = new Array();
    
    var options = UserConfig.cmopt;
    
    var propertyNames = {
        '1'              : 'Sports Bar',
        '2'              : 'Venetian Condo',
        '3'              : 'Tad\'s Gun Shop',
        '4'              : 'Biker Clubhouse',
        '5'              : 'Martial Arts Dojo',
        '7'              : 'Cemetery',
        '8'              : 'Cider House',  
        'chop_shop'      : 'Chop Shop',
        'weapons_depot'  : 'Weapons Depot',
        'armory'         : 'Armory',
        'private_zoo'    : 'Private Zoo'
    };
    var buildURL = {
        'port'         : MW.getIntURL('propertyV2','portBuyItem') + '&city=6&building_type=7&id=',
        'warehouse'    : MW.getIntURL('propertyV2','portBuyItem') + '&city=8&building_type=3&id=',
        'black_market' : MW.getIntURL('propertyV2','portBuyItem') + '&city=7&building_type=3&id='
    };
    var cashIcons = {
        'port'         : global.zGraphicsURL + 'icon_cash_italy_16x16_02.png',
        'warehouse'    : global.zGraphicsURL + 'chic_clam_sm.png',
        'black_market' : global.zGraphicsURL + 'brz_real_sm.png'
     }
    /**
     * Create a Property Item.
     * @constructor
     * @return {CSPropertyItem}
     */
    var CSPropertyItem = function() {
        this.name = 'Unknow';
        this.level = 0;
        this.attack = '0';
        this.defense = '0';
        this.bonus = '';
        this.requirements = new Array();
        
        this.canBuy = function() {
            if (!Util.isString(this.buy)) {
                return false;
            }
            var result = true;
            
            Util.each(this.requirements, function(i,r) {
                return (result = (!Util.isSet(r.have) || r.have >= r.need));
            });
            return result;
        };
        
        return this;
    };
    /**
     * Create a property class.
     * @constructor
     * @param {Element} masterElt
     * @return {CSProperty}
     */
    var CSProperty = function(id, name, icon) {
        var Items = new Array();
        
        this.id = id;
        this.icon = icon; 
        this.name = (name ? name : 'Unknow');
        this.level = 0; 
        
        this.length = function() {
            return Items.length;
        };
        /**
         * @param {Object} index
         * @return {CSPropertyItem}
         */        
        this.get = function(index) {
            return Items[index];
        };
        /**
         * @param {CSPropertyItem} obj
         */
        this.add = function(obj) {
            Items.push(obj);
        };
        /**
         * Loops through all items.
         * @param {Function} callback
         */
        this.each = function(callback) {
            Util.each(Items, callback);
        };
        
        return this;
    };
    /**
     * Create a new property collection.
     * @constructor
     * @return {CSPropertyCollection}
     */
    var CSPropertyCollection = function() {
        var Props = new Object();
        /**
         * @param {CSProperty} prop
         */
        this.add = function(prop) {
            if (prop && prop.id) {
                Props[prop.id] = prop;
            }
        }
        /**
         * @param {String} id
         * @return {CSProperty}
         */
        this.get = function(id) {
            return Props[id];
        };
        /**
         * @return {Number}
         */
        this.length = function() {
            return Util.length(Props);
        };
        /**
         * Loops through all properties.
         * @param {Function} callback
         * @param {Boolean} bSorted true to sort properties by name.
         */
        this.each = function(callback, bSorted) {
            var obj = Props;
            if (bSorted) {
                obj = new Array();
                Util.each(Props, function(id, prop) {
                    obj.push(prop);
                });
                obj.sort(function(a, b) {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            Util.each(obj, callback);
        }
        
        return this;        
    };
    
    /**
     * @type {CSPropertyCollection}
     */
    var Properties;
    
    // -------------
    // POPUP ELEMENT
    // -------------
    var popupElt = new PopupObject('craftmanager_popup', {
        type: 'main',
        title: '<img src="'+global.resource.craftmanager_title+'">',
        width: 720,
        onclose: function() {
            Util.each(countDowns, function(i,o) { o.clear(); });
            options.fromDomElements();
            options.save();
        },
        buttons: [{
             label: 'Refresh',
             addClass: 'medium white',
             onclick: function() {
                 popupElt.close();
                 CraftManager();
             } 
        }]
    });
    
    // -------------
    // EVENTS
    // -------------
    var Events = {
        build: function() {
            var name = $(this).attr('name');
            var id = $('option:selected', '#cmopt_build_'+name).val();
            var item = Properties.get(name).get(id);
            
            if ($(this).hasClass('disabled')) {
                return false;
            }
            
            $(this).addClass('disabled');
            options.fromDomElements();
            options.save();
            httpAjaxRequest({url: item.buy, success: function(r) {
                if (Util.isSet(countDowns[name])) {
                    countDowns[name].clear();  
                }
                $('#' + name + '_countdown', popupElt.content).html('Click Refresh button.');
                $('#' + name + '_body p', popupElt.content).html(parseResponse(r));
                
            }});
            
            return false;
        },
        
        build_change: function() {
            var name = $(this).attr('name');
            var id = $('option:selected', this).val();
            var item = Properties.get(name).get(id);
            var reqDiv = $('#' + name + '_body #item_requirements', popupElt.content).empty();
            
            $('a#build_'+name).toggleClass('disabled', item.canBuy() === false);
            
            if (item.requirements.length > 0) {
                c$('div').text('You need:').appendTo(reqDiv).css({
                    'float': 'left',
                    'color': 'grey'
                });
                Util.each(item.requirements, function(i, req) {
                    var reqItemDiv = c$('div','class:req_field').attr('title',req.name).appendTo(reqDiv);
                    if (Util.isSet(req.icon)) {
                        c$('img').appendTo(reqItemDiv).attr({
                            'src': req.icon,
                            'alt': req.name
                        });
                    } else {
                        c$('span').text(req.name+': ').appendTo(reqItemDiv);
                    }
                    if (Util.isSet(req.have)) {
                        c$('span').text(req.need + '/' + req.have).appendTo(reqItemDiv).css({
                            'color': (req.have < req.need ? 'red' : 'green')
                        });
                    } else {
                        c$('span').text(Util.formatNum(req.need)).appendTo(reqItemDiv).css('color','yellow');
                    }
                });
            }
        }
        
    };
    /**
     * Parse a New York property.
     * @param {Object} masterElt
     */
    function getNYProperty(masterElt) {
        var id = (masterElt.id||'').replace('propsDiv','');
        var icon = global.zGraphicsURL + 'LimitedTimeProperty/button/'+id+'-off.png';
        var prop = new CSProperty(id, propertyNames[id], icon);
        
        prop.level = Util.parseNum(Util.textNodes($('.propLevel', masterElt)));
        
        $('.cs_deck_of_cards > div', masterElt).each(function(i1, e1) {
            $('.cs_outer', e1).each(function(i2, e2) {
                var me = new CSPropertyItem();
                var bonuses = new Array();
                
                me.name = $('.cd_item_name', e2).text();
                me.level = Util.parseNum( $('.cs_recipe_card_banner .cs_bigtext', e2).text() );
                me.image = $('.cs_item_image img', e2).attr('src');                
                
                $('.cs_item_stats > span, .cs_item_stats > img', e2).each(function(i3, b1) {
                    b1 = $(b1);
                    if (b1.hasClass('cs_attack')) {
                        me.attack = b1.text();
                    }
                    else if (b1.hasClass('cs_defense')) {
                        me.defense = b1.text();
                    }
                    else if (b1.hasClass('cs_bonus')) {
                        bonuses.push(Util.trim(b1.text() + ' ' + (b1.find('img').attr('alt')||'')));
                    }
                    else if (b1.is('img')) {
                        bonuses.push(Util.trim(Util.textNodes(b1.parent()) +' '+ (b1.attr('alt')||'')));
                    }
                    else {
                        bonuses.push(b1.text() + ' ' + b1.attr('class'));
                    }
                });
                
                $('.cs_cs_ingredients > .cs_ingredient', e2).each(function(i, e) {
                    var img = $('img', e);
                    var num = Util.doRgx(/(\d+)\/(\d+)/, $('.num_items', e).text());
                    me.requirements.push({
                        name: img.attr('alt'),
                        icon: img.attr('src'),
                        have: parseInt(num.$1),
                        need: parseInt(num.$2)
                    });
                });
                
                if (bonuses.length > 0) {
                    me.bonus = bonuses.join(',');
                }
                if (prop.level < me.level) {
                    me.requirements.push({
                        name: prop.name + ' level',
                        need: me.level,
                        have: prop.level
                    });
                }
                me.buy = $('.cs_buy_button a:regex(href,xw_action=build|xw_action=craft)', e2).attr('href');
                
                prop.add(me);
            });
        });
        
        return prop;
    }
    /**
     * Parse a property. 
     * @param {Object} data
     */
    function getProperty(data) {
        if (!data || !data.properties) {
            return;
        }
        var prop, now = parseInt((new Date()).getTime() / 1000);
        
        Util.each(data.properties, function(index, p) {
            if (!/warehouse|port|black market/i.test(p.name_unlocalized)) {
                return;
            }
            var readyAt = (p.last_purchase_time_stamp + p.purchase_refresh_rate);
            var prop_id = Util.trim(p.name_unlocalized.toLowerCase().replace(/\s/g,'_'));
            
            prop = new CSProperty(prop_id, p.name, p.image_url + (prop_id=='port'?'_bg3.jpg':''));
            
            prop.time_left = Math.max(0, readyAt - now);
            prop.level = Util.parseNum(p.level);
            
            if (prop.time_left> 0) {
                countDowns.push(new Countdown({
                    selector    : '#' + prop_id + '_countdown',
                    delay       : prop.time_left,
                    text        : 'Build new item in:'
                })); 
            }
            
            Util.each(p.purchase_items, function(item_id, item) {
                var me = new CSPropertyItem();
                var itemProp = (item.property ? data.properties[item.property] : p);
                
                me.name = item.name;
                me.level = parseInt(item.unlock_level);
                me.image = item.image;
                me.attack = item.attack;
                me.defense = item.defense;
                me.bonus = item.special_ability_text;
                
                if (item.price > 0) {
                    me.requirements.push({
                        name: 'Cash',
                        icon: cashIcons[prop_id],
                        need: item.price
                    });
                }
                if (item.rp > 0) {
                    me.requirements.push({
                        name: 'Reward Points',
                        icon: global.zGraphicsURL + 'v3/icon-gf-coin.gif',
                        need: item.rp,
                        have: global.userStats.reward_points()
                    });
                }
                if (itemProp.level < me.level) {
                    me.requirements.push({
                        name: itemProp.name + ' level',
                        need: me.level,
                        have: itemProp.level
                    });
                } else if (now > readyAt) {
                    me.buy = 'remote/' + buildURL[prop_id] + item_id;
                } 
                
                prop.add(me);
            });
            
            return false;
        });
        
        return prop;
    }
    
    /**
     * Generate a property interface.
     * @param {String} index
     * @param {CSProperty} prop
     */
    function genPropertyDom(index, prop) {
        var bestItem = 0, elt, opt_id = 'build_'+prop.id;
        
        elt = c$('div', 'class:property_outer').appendTo(popupElt.content);        
        elt = c$('div', 'class:property_inner').appendTo(elt);
        
        c$('img', 'class:property_icon').attr('src', prop.icon).appendTo(elt);
        b$('Build', 'class:medium green disabled,id:'+opt_id+',name:'+prop.id)
        .click(Events.build).appendTo(c$('div','class:buttons').appendTo(elt));
        
        elt = c$('div', 'class:body,id:'+prop.id+'_body').appendTo(elt);        
        c$('h4').text(prop.name+' (Level '+prop.level+'):').appendTo(elt);
        c$('div', 'id:'+prop.id+'_countdown,class:cdn_timer')
        .html(Util.setColor('Ready!','green')).appendTo(elt);
        
        elt = c$('p').appendTo(elt);      
        var selectElt = c$('select', 'id:cmopt_'+opt_id+',name:'+prop.id).width(480).appendTo(elt);
        c$('div','id:item_requirements').appendTo(elt);
        
        prop.each(function(i, item) {
            var name = 'Level ' + item.level + ' - ';
            name += ' ' + item.name;
            name += ' [' + item.attack + '/' + item.defense + ']';
            if ( item.bonus ) {
                name += ' [' + item.bonus + ']';
            }
            c$('option', 'value:'+i).text(name).appendTo(selectElt);
            
            if (item.level === prop.level) {
                bestItem = i;
            }
        });
        
        if ( !Util.isSet(options[opt_id]) ) {
            options.add(opt_id, bestItem);
        }
        
        selectElt.change(Events.build_change);
    }
    /**
     * Parse a server response after buy an item.
     * @param {Object} htmlText
     * @return {String}
     */
    function parseResponse(htmlText) {
        if (Util.isString(htmlText)) {
            var response = h$(htmlText).find('.pop_box > div > div:eq(2)').html();            
            return response.substr(0, response.indexOf('<br>'));
        }
        return Util.parseJSON(htmlText.data).purchase_message;
    }
    
    function Initialize() {
        var r_count = 0, requests = {
            ny: 'remote/' + MW.getIntURL('LimitedTimeProperty', 'showProperties')+'&view_tab=build&page_click=home_page',
            br: 'remote/' + MW.getIntURL('propertyV2', 'createData', 7) + '&city=7',
            ch: 'remote/' + MW.getIntURL('propertyV2', 'createData', 8) + '&city=8',
            it: 'remote/' + MW.getIntURL('propertyV2', 'createData', 6) + '&city=6'
        };
        
        Properties = new CSPropertyCollection();
        loadingScreen('Loading properties...');
        
        function addCountdown(script) {
            var timeLeft = Util.doRgx(/var timeLeft\s?=\s?(\d+)/, script).$1;
            var id = Util.doRgx(/id:\s?'buildTimerProp(\w+)'/, script).$1;
            
            if (timeLeft && (timeLeft = parseInt(timeLeft)) > 0 && id) {
                countDowns.push(new Countdown({
                    selector    : '#' + id + '_countdown',
                    delay       : timeLeft,
                    text        : 'Build new item in:'
                }));
            }
        }
        
        Util.each(requests, function(name, url) {
            r_count++;
            httpAjaxRequest({url: url,
                success: function(htmlText) {
                    if (name === 'ny') {
                        h$(htmlText).find('.master, script:regex(text,addCountdown)').each(function(i, e) {
                            if ($(e).is('script')) {
                                addCountdown($(e).text());
                            } 
                            else if ( e.id && /propsDiv/.test(e.id) ) {
                                Properties.add(getNYProperty(e));
                            }
                        });
                    } else {
                        try {
	                        Properties.add(getProperty(Util.parseJSON(htmlText.data)));
                        } catch (e) {
                            Logger.error(e);
                        }
                    }
                    r_count--;
                }
            });
        });
        
        Util.until({
            retries: 300,
            test: function() { return (r_count < 1); },
            success: function() {
                loadingScreen();
                Properties.each(genPropertyDom, true);
                options.toDomElements();
                /*
                c$('a', 'href:#').attr('onclick',
                  'return do_ajax("inner_page", "remote/'+MW.getIntURL('travel','travel')
                + 'destination=1&from=propertyV2", 1, 1, 0, 0); return false;');
                */
                $('select', popupElt.content).addClass('black_box').change();
                if (Properties.length() > 0) {
                    popupElt.show();
                    Util.each(countDowns, function(i,o) {o.start();});
                } else {
                    popupElt.destroy();
                    showHelpPopup({
                        icon: 'error',
                        title: 'Craft Manager',
                        message: 'Can\'t load your properties. Please, try again later.'
                    });
                }
            }
        });
        
    }
    
    // Style
    popupElt.addBase64Style(
        'I2NyYWZ0bWFuYWdlcl9wb3B1cCAuYmxhY2tfYm94IHsNCglmb250LXdlaWdodDogYm9sZDsgDQoJY29sb3I6IHJnYigyMDgsIDIw'+
        'OCwgMjA4KTsgDQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAxNTMpOyANCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFj'+
        'azsgDQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfb3V0ZXIgew0KICAgIG1hcmdp'+
        'bjogMnB4Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgew0KICAgIGJvcmRlcjogdGhpbiBzb2xpZCAj'+
        'MzMzOw0KICAgIHBhZGRpbmc6IDVweDsNCn0NCiNjcmFmdG1hbmFnZXJfcG9wdXAgLnByb3BlcnR5X2lubmVyIGltZy5wcm9wZXJ0'+
        'eV9pY29uIHsNCiAgICB3aWR0aDogNzVweDsNCiAgICBoZWlnaHQ6IDYwcHg7DQogICAgZmxvYXQ6IGxlZnQ7DQp9DQojY3JhZnRt'+
        'YW5hZ2VyX3BvcHVwIC5wcm9wZXJ0eV9pbm5lciBkaXYuYm9keSB7DQogICAgbWluLWhlaWdodDogNjJweDsNCiAgICBwYWRkaW5n'+
        'OiAwcHggODBweCAwcHggODBweDsNCiAgICB0ZXh0LWFsaWduOiBsZWZ0Ow0KICAgIG1heC1oZWlnaHQ6IDYycHg7DQp9DQojY3Jh'+
        'ZnRtYW5hZ2VyX3BvcHVwIC5wcm9wZXJ0eV9pbm5lciBkaXYuYm9keSBoNCB7DQogICAgZmxvYXQ6IGxlZnQ7DQogICAgbWFyZ2lu'+
        'OiAycHggMHB4IDJweCAxMHB4Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgZGl2LmJvZHkgZGl2LmNk'+
        'bl90aW1lciB7DQogICAgZmxvYXQ6IHJpZ2h0Ow0KICAgIG1hcmdpbjogMnB4IDMwcHggMnB4IDBweDsNCiAgICBmb250LXNpemU6'+
        'IDEycHg7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVwIC5wcm9wZXJ0eV9pbm5lciBkaXYuYm9keSBwIHsNCiAgICBtYXJnaW46IDBw'+
        'eDsNCiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7DQogICAgcGFkZGluZy10b3A6IDIzcHg7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVw'+
        'IC5wcm9wZXJ0eV9pbm5lciBkaXYuYnV0dG9ucyB7DQogICAgZmxvYXQ6IHJpZ2h0Ow0KICAgIHBhZGRpbmctdG9wOiAxOHB4Ow0K'+
        'fQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAjaXRlbV9yZXF1aXJlbWVudHMgew0KICAgIHBhZGRpbmctbGVmdDogMzZweDsNCiAgICB0'+
        'ZXh0LWFsaWduOiBsZWZ0Ow0KICAgIGZvbnQtd2VpZ2h0OiBib2xkOw0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAjaXRlbV9yZXF1'+
        'aXJlbWVudHMgLnJlcV9maWVsZCB7DQogICAgZmxvYXQ6IGxlZnQ7DQogICAgbWFyZ2luOiAwcHggMHB4IDBweCAxNXB4Ow0KfQ0K'+
        'I2NyYWZ0bWFuYWdlcl9wb3B1cCAjaXRlbV9yZXF1aXJlbWVudHMgLnJlcV9maWVsZCBpbWcgew0KICAgIHdpZHRoOiAxOHB4Ow0K'+
        'ICAgIGhlaWdodDogMThweDsNCiAgICBmbG9hdDogbGVmdDsNCiAgICBtYXJnaW4tcmlnaHQ6IDJweDsNCn0NCg=='
    );
    
    // load options.
    options.load(Initialize);
}
// ==Script==
// @id        FreeGiftsCenter.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Set configuration.
 */
UserConfig.create('fgopt', {
    // exclude some settings when exporting.
    _excludedToExport: ['excludedGifts'],
    
    sendBack          : true,
    sendInternally    : true,
    excludedPattern   : 'reached your limit|gold mastery',
    excludedGifts     : new Object(),
    activeFriends     : new Object(),
	customLists       : new Object(),
    activeFRMin       : 1,
    ignoreLimits      : false
});
/**
 * help collecting free gifts
 */
function FreeGiftsCenter() {
    var cancel_process = false;
    var options = UserConfig.fgopt;
	var usersThanked = new Object();
    var FriendLists = new Object();
    /** @type {CSRequestCollection} */ var Requests;
    /** @type {CSCollector}         */ var Collector;
    
    // popup
    var Popup = new PopupObject('freegiftscenter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.freegiftscenter_title+'">',
        onclose: function() {
            options.fromDomElements();
            options.save();
        }
    });
    /**
     * Create a new Request.
     * @constructor
     * @param {jQuery, Element} e
     * @return {CSRequest}
     */
    var CSRequest = function(e) {
        var $sendback, $accept, $ignore;
        
        if (e$('.acceptonly', e)) {
            $accept = $('.acceptonly', e);
            $ignore = $('.ignore', e);
            $sendback = $('.state_accept a:first', e);
        } else {
            $accept = $('.state_accept > a:first', e);
            $ignore = $('.state_accept > a:eq(1)', e);
            $sendback = $('.state_sendback .state_sendback_button', e);
        }
        
        this.id    = e.id.substr(12);
        this.type  = Util.doRgx(/(\w+)/, $(e).attr('class')).$1 || 'gift';
        this.url   = Util.toUrl($accept);
        this.rem   = Util.toUrl($ignore);
        this.icon  = Util.getPicture($('.player_pic',e).attr('style'));
        this.name  = Util.trim( $('.body > h4',e).text() ) ;
        this.body  = Util.trim( $('.body > p[id^=zmc_bodytext]',e).text() );
        this.send  = getSendBackRequest($sendback.attr('onclick'));
        
        var oUrl = Util.uSplit(this.url);
        
		this.gift = UserFreeGifts.getByItemId(oUrl.item_id, oUrl.item_cat);
        this.gift_id = parseInt(oUrl.item_id);
        this.user_id = Util.parseNum(oUrl.from_user);
        this.profile = MW.getProfileLink(this.user_id);
        
        return this;
    };
    /**
     * Create a new Request Collection.
     * @constructor
     * @return {CSRequestCollection}
     */
    var CSRequestCollection = function() {
        var requests = new Object();
        /**
         * Add a new request to the collection.
         * @param {CSRequest} req
         */
        this.add = function(req) {
            requests[req.id] = req;
        };
        /**
         * Get a request from the collection.
         * @param {String} id
         * @return {CSRequest}
         */
        this.get = function(id) {
            return requests[id];
        };
        /**
         * Remove a request
         * @param {String} id
         */
        this.remove = function(id) {
            delete requests[id];            
        };
        /**
         * Return an array of requests filtered by type.
         * @param {Object} type
		 * @return {Object}
         */
        this.toArray = function(type) {
            var result = new Array();
            Util.each(requests, function(id, req) {
                if (!Util.isString(type)||req.type === type) {
                    result.push(req);
                }
            });
            return result;
        };
		/**
		 * Return a grouped list of all gifts.
         * @param {Object} type
		 * @return {Object}
		 */
		this.toGroup = function(type) {
			var groupedList = new Object();			
			Util.each(requests, function(id, req) {
                if (!Util.isString(type)||req.type === type) {
					var grp = groupedList[req.gift_id];
					if (!Util.isSet(grp)) {
						groupedList[req.gift_id] = (grp = new Array());
					}
                    grp.push(req);
                }
			});
			return groupedList;
		};
        /**
         * Loops through all requests.
         * @param {Function} callback
         */
        this.each = function(callback) {
            Util.each(requests, callback);
        };
        
        return this;
    };
    /**
     * Create a new Collector.
     * @constructor
     * @return {CSCollector}
     */
    var CSCollector = function() {
        var jobs = new Array();
        /**
         * Get the total requests amount
         */
        this.length = function() {
            return jobs.length;
        };
		/**
		 * Return the amount of an specific item_id
		 * @param {Object} iid
		 * @return {Number}
		 */
		this.amountOf = function(iid) {
			var amount = 0;
			Util.each(jobs, function(index, job) {
				if (job.iid && parseInt(job.iid) === parseInt(iid)) {
					amount += job.amount;
				}
			});
			return amount;
		};
        /**
         * @param {String} id
         * @param {Object} job
         */
        this.add = function(job) {
            jobs.push(job);
        };
        /**
         * @param {String} id
         * @return {Object}
         */
        this.get = function(index) {
            return jobs[index];
        };
        /**
         * Get all requests.
         */
        this.all = function() {
            return jobs;
        };
        /**
         * Loops through all gifts.
         * @param {Function} callback foo(gift, amount)
         */
        this.each = function(callback) {
            Util.each(jobs, callback);
        };
        /**
         * Clear collector.
         */
        this.clear = function() {
            jobs = new Array();
        };

        return this;
    };

    var excluded = {
        /**
         * Check if a gift is excluded
         * @param {Number} gid
         * @return {Boolean}
         */
        is: function(gid) {
            try {
                var nNow   = parseInt((new Date()).getTime()/1000);
                var isEx   = options.excludedGifts[gid];
                var nTime  = isEx ? (isEx - nNow) : 0;

                return (nTime > 0);
            }
            catch(err) {
                Logger.error(err);
            }
            return false;
        },
        /**
         * Add a gift to excluded list
         * @param {Number} gid
         */
        add: function(gid) {
            try {
                var nTime = parseInt((new Date()).getTime()/1000) + (6*60*60);
                options.excludedGifts[gid] = nTime;
                options.save();
            }
            catch(err) {
                Logger.error(err);
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
        addGift_click: function() {
			var $li = e$('ul.mss_selectable li.selected', Popup.content);
			if (!$li) {
				$('#mss_info', Popup.content).html('Select a gift first!.');
				return false;
			}
			
			var n_iid = $li.attr('iid');
			var n_total = parseInt($li.attr('count')) - Collector.amountOf(n_iid);
			var n_amount = parseInt($('#mass_body #mss_amount').val());
			
			n_amount = Math.min(n_total, n_amount);
			
			Collector.add({
				iid    : n_iid,
				name   : $('.gift_name', $li).text(),
				icon   : $('img', $li).attr('src'),
				action : $('#mass_body #mss_action').val(),
				amount : n_amount
			});
			if ((n_total - n_amount) < 1) {
				$li.fadeOut(500, function() {
					$li.remove();
				});
			}
			genMssSelectedDom();
            return false;
        },
        selectGift_click: function() {
			if ($(this).hasClass('selected')) {
				return;
			}
			$('#mass_body .mss_selectable li').removeClass('selected');
		    $('#mass_body #mss_amount').val($(this).attr('count'));
            $(this).addClass('selected');
            return false;
        },
        startSending_click: function() {
            if (!$(this).hasClass('disabled') && !$('#friendlists').hasClass('loading')) {
                sendRequests();
            }
            return false;
        },
        friendLists_change: function() {
            if ($(this).hasClass('disabled') || $(this).hasClass('loading')) {
                return false;
            }
            var s = $('option:selected', this).val();
			$('#save_friends_btn, #remove_list_btn').hide();
            if (s !== 'none') {
				if (Util.isSet(options.customLists[s])) {
					$('#remove_list_btn').show();
				} else {
					$('#save_friends_btn').addClass('disabled').show();
				}
                $('#snd_messages').html('Adding Friends...');
                setTimeout(function() {
					$('#send_body #snd_users').empty();
				    addFriends(s); 
				}, 200);
            } else {
				$('#save_friends_btn').removeClass('disabled').show();
			}
        },
        editFriends_click: function() {
            if ($(this).hasClass('disabled') || $('#friendlists').hasClass('loading')) {
                return false;
            }
            var added_users = new Array();
            var $sl = $('#send_body #snd_users');
            $('option', $sl).each(function(i, op) {
                added_users.push(op.value);
            });
            showFriendsSelector(function(users) {
                if (users.length > 0) {
                    Util.each(users, function(i, user) {
                        ( e$('option[value='+user.uid+']', $sl) ||
                          c$('option','value:'+user.uid).appendTo($sl) ).text(user.name);
                    });
                }
            }, added_users);
            return false;
        },
		saveFriends_click: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            var added_users = new Array();
            var $sl = $('#send_body #snd_users');
			showPromptPopup('Write Friend List name (SIX characters min.):','Saved List',function(name) {
				if (Util.isString(name) && name.length > 5) {
					var aL = (options.customLists[name.replace(/\s/g,'_')] = new Array());
		            $('option', $sl).each(function(i, op) {
		                aL.push(op.value);
		            });
					options.save(loadFriendLists);
					$('#snd_messages').html('Friend list "'+name+'" saved.');
				}
			});
            return false;
		},
		removeList_click: function() {
			var $fl = $('#friendlists');
			var id = $('option:selected', $fl).val();
			var nm = $('option:selected', $fl).text();
			
			showAskPopup('Remove Friendlist', 'Are you sure to remove?', function() {
				delete options.customLists[id];
				delete FriendLists[id];
				options.save();
				$('option:selected', $fl).remove();
				$fl[0].selectedIndex = 0;
				$fl.change();
				$('#snd_messages').html('Friend list "'+nm+'" removed.');
			});
            return false;
		},
        clearFriends_click: function() {
            if (!$(this).hasClass('disabled')) {
                $('#send_body #snd_users').empty();
            }
            return false;
        },
        resetActiveFriends_click: function() {
            options.set('activeFriends', new Object());
            options.save(function() {
                showHelpPopup({
                    icon: 'info',
                    title: 'Reset Active Friends List',
                    message: 'Your active friends list is now empty.'
                });
            });
            return false;
        },
        finishCollector_click: function() {
            $('#mss_info').show();
            $('#mss_messages').hide();
            showDiv('setup', 'mass');
            Events.clearCollector_click();
            genRequestDom();
            $('.tab_bar', Popup.content).removeClass('disabled');
            $(this).unbind().remove();
            return false;
        },
        clearCollector_click: function() {
            $('#mass_body .mss_selected').empty();
	        $('#mss_info', Popup.content)
			.html('Select the gifts you want and set the amount to collect.');
			genMssSelectableDom();
            return false;
        },
        startCollector_click: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            if (Collector.length() > 0) {
                showDiv('logger','mass');
                StartCollector();
            }
            return false;
        },
        tab_click: function() {
            if ($('.tab_bar',Popup.content).hasClass('disabled')||$(this).hasClass('active')) {
                return false;
            }
            var tabName = $(this).attr('tb');
            switch(tabName) {
                case 'mass':
                    Events.clearCollector_click();
                    break;
                case 'send':
                    $('#send_body #snd_users').empty();
                    loadFriendLists();
					$('#friendlists').change();
                    break;
                case 'cnfg':
                    $('#total_activefriends').text(Util.length(options.activeFriends));
                    break;
            }
            $('.tab_bar li', Popup.content).removeClass('active');
            $(this).addClass('active');
            showDiv(tabName, 'body');
            options.fromDomElements();
            options.save();
            return false;
        },
        accept_click: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $(this).addClass('disabled');
            
            var bAcceptOnly = $(this).hasClass('acceptonly');
            var req_id = $(this).attr('req');
            var req = Requests.get(req_id);
            var $li = $('#reqslist > li#req_' + req_id);
            
            // check if request is valid
            if (!Util.isSet(req)) {
                $li.addClass('failed');
                $('.state_accept', $li).hide();
                $('.state_completed', $li).fadeIn(500);
                $('.body p', $li).html('There was an error with this request.');
                return false;
            }
            
            // check if gift is excluded
            if (options.ignoreLimits !== true && excluded.is(req.gift_id) && !$li.hasClass('asking')) {
                $li.addClass('asking');
                $('.state_accept', $li).hide();
                $('.state_retry', $li).fadeIn(500);
                $('.body p', $li).html('You\'ve reached the limit of this gift.<br>Are you sure to continue?');
                return false;
            }
            
            $('.state_accept, .state_completed, .state_retry', $li).hide();
            $li.removeClass('asking').addClass('completed');

            $('.body #loading_overlay', $li).show();
            $('.body p', $li).hide();

            CollectRequest(req, (options.sendBack && !bAcceptOnly), function(data) {
                var image = data.image ? '<img src="'+data.image+'">' : '';
                Requests.remove(req_id);
                if (isLimitReached(data.message)) {
                    excluded.add(req.gift_id);
                }
                $('.body', $li).hide().html(image+'<p>'+data.message+'</p>').fadeIn(500);
                $('.state_completed', $li).fadeIn(500);
                
            }, function(response) {
                $('.body', $li).append('<span>'+response+'</span>');
            });
            
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
            var req = Requests.get(id);
            var $li = $('#reqslist > li#req_' + id);
            
            $('.state_accept, .state_completed, .state_retry', $li).hide();            
            $('.body #loading_overlay', $li).show();
            $('.body p', $li).hide();
            
            if ($(this).hasClass('thanksonly') && req.send && req.send.to) {
                httpAjaxRequest({'url': req.rem, 'liteLoad': 1});
                thanksTo(req.send, function(message) {
                    $li.removeClass('asking').addClass('completed');
					$('.body #loading_overlay', $li).hide();
                    $('.body p', $li).hide().html('<p>'+message+'</p>').fadeIn(500);
                    $('.state_completed', $li).fadeIn(500);
                }, options.sendInternally); 
            } else {
                httpAjaxRequest({ 'url': req.rem, 'liteLoad': 1, 
                    'success': function(json){
                        $('#req_'+id).fadeOut(500, function(){
                            $('#req_'+id).remove();
                        });
                    }
                });
            }
            return false
        },
        refresh_click: function() {
            showDiv('ajaxloader', 'body');
            $('#category_select', Popup.content).val('all').change();
            getUserRequests(function() {
                genRequestDom();
                showDiv('reqs', 'body');
            });
            return false
        },
        clear_all: function() {
            $('#reqslist li.completed').fadeOut(500, function(){
                $('#reqslist li.completed').remove();
            });
        },
        reset_click: function() {
            excluded.reset();
            showHelpPopup({
                icon: 'info',
                title: 'Reset Exclude list',
                message: 'The gifts added to the exclude list has been reseted.'
            });
            return false;
        },
        category_change: function(e) {
            var cls = 'req_box';
            var type = $('option:selected', this).val();
            if (type && type !== 'all') {
                cls += ' '+type;
            }
            $('#reqslist', Popup.content).attr('class', cls);
        },
        filter_change: function(e) {
            var $me = $(this);
            var s = $me.val();
            
            clearTimeout($me.attr('timeout'));
            if (!Util.isString(s) || s.length < 4) {
                $('#reqslist > li.matched', Popup.content).removeClass('matched');
                return true;
            }          
            $me.attr('timeout', setTimeout(function() {
                var regEx = new RegExp(s, 'i');
                $('#reqslist > li', Popup.content).each(function(i, e) {
                    if ( regEx.test($('.body p', e).text()) ) {
                        $(e).addClass('matched');
                    } else {
                        $(e).removeClass('matched');
                    }
                });
                if (!$('#reqslist').hasClass('search')) {
                    $('#category_select', Popup.content).val('search').change();
                }
            }, 500));
        }
    };
    /**
     * Add friends.
     * @param {String} lid
     */
    function addFriends(lid) {
        if (!Util.isSet(FriendLists['all'])) {
            return;
        }        
        if (Util.isSet(FriendLists[lid]) && Util.isSet(FriendLists[lid].uids)) {
            var $sl = $('#send_body #snd_users');
            Util.each(FriendLists[lid].uids, function(i, uid) {
				try {
	                uid = parseInt(uid);
	                if (!isNaN(uid) && Util.isSet(FriendLists['all'][uid])) {
						var $op = e$('option[value='+uid+']', $sl);
						if (!$op) {
							$op = c$('option','value:'+uid).appendTo($sl);
						}
						$op.text(FriendLists['all'][uid]);
	                }
				} catch (e) {}
            });
            $('#snd_messages').html('Friends Loaded.');
        }
    }
    /**
     * Load all friends and MW default lists.
     * @param {Function} callback
     */
    function loadFriendLists(callback) {        
        var active = (FriendLists['active'] = {
            name: 'Most Active Friends',
            uids: new Array()
        });
        
        Util.each(options.activeFriends, function(uid, count) {
           if (count > options.activeFRMin) {
               active.uids.push(uid);
           } 
        });
		
		Util.each(options.customLists, function(id, uids) {
            FriendLists[id] = {
                name: id.replace(/_/g, ' '),
                uids: uids
            };
		});
		
		Util.each(FriendLists, function(id, list) {
			if (id === 'all') {
				return true;
			}
			try {
				var $op = $('option[value='+id+']', '#friendlists');
			    if ($op.length < 1) {
			        $('#friendlists').append(c$('option','value:'+id).text(list.name));
			    } else {
                    $op.text(list.name);
                }
			} catch (e) {}
		});
    }
	/**
	 * Load app users
	 * @param {Function} callback
	 */
	function getAppFriends(callback) {
        facebook.getAppFriends(function(users) {
            var all = (FriendLists['all'] = new Object());
            if (!users.error) {
                Util.each(users, function(index, user) {
                    all[user.uid] = user.name;
                });
				callback && callback();
            }
        });
	}
	/**
	 * Load MAfia Wars lists
	 */
    function getMWLists() {
		$('#snd_messages').empty()
        .append(c$('img').attr('src', global.resource.ajax_loader))
        .append(c$('span').text('Loading Friend Lists...'));
		
		var params = 'free_gift_id=100&free_gift_cat=1&ajax=1&fbml_iframe=1';
		
        httpAjaxRequest({
            'url': 'remote/' + MW.getIntURL('requests', 'friend_selector') + params, 
            'liteLoad': 1, 
            'success': function(htmlText) {
                var $j = h$(htmlText);
                var ol = Util.doRgx(/MW.Request.setTabFriendLists\(([^\)]+)/, htmlText).$1;
                if (ol) {
                    ol = Util.parseJSON(ol);
                    Util.each(ol, function(id, uids) {
                        var name = String($j.find('#mfs_tab_'+id).text() || id);
                        FriendLists[id] = {
                            'name': name,
                            'uids': uids
                        };
                    });
					$('#snd_messages').html('All friendlists loaded.');
					if ($('.tab_bar li.active', Popup.content).attr('tb')==='send') {
						loadFriendLists();
					}
                }
            }
        });
    }
    /**
     * Parse a send back request
     * @param {String} text
     */
    function getSendBackRequest(text) {
        var request = {};
        if (text && text.indexOf('sendGiftbackRequest') > -1) {
            try {
	            eval(Util.substr(text, 'sendGiftbackRequest', ';',0, 1));
            } catch (e) {
            	Logger.error('getSendBackRequest: '+e.message);
            }
            return request;
        }
        function sendGiftbackRequest(a1,a2,a3,a4,a5) {
            request.to = new Array();
            request.to.push(String(a1));
            request.message = a2;
            request.data = a3;
            request.title = a4;
        }
        return;
    }
    
    /**
     * Collect a request and send back if specified.
     * @param {CSRequest} req
     * @param {Boolean} bSendBack
     * @param {Function} callback
     */
    function CollectRequest(req, bSendBack, callback, sendBackCallback) {
        var bSuccess = false, item_image, item_message, bIsBackSent = false;
        if (req.send && req.send.to) {
            addActiveFriend(req.send.to[0]);
        }
        httpAjaxRequest({
            'url': req.url, 
            'liteLoad': 1, 
            'success': function(json) {
                bSuccess = Util.isBoolean(json.is_success) ? json.is_success 
                :          (parseInt(json.is_success) === 1);
                
                if ( bSuccess ) {
                    item_image = json.item_image_path;
                    item_message = json.success_message;
                    
                    if (bSendBack === true && req.send && req.send.to) {
						bIsBackSent = true;
                        thanksTo(req.send, sendBackCallback, options.sendInternally);
                    }
                }
                else {
                    item_message = json.fail_message
                    ? Util.setColor(json.fail_message, 'red')
                    : Util.setColor('There was an error with this request.', 'red');
                }
                callback({
                    'success'    : bSuccess,
                    'image'      : item_image,
                    'message'    : item_message,
                    'isBackSent' : bIsBackSent
                });
            },
            error: function(msg) {
                callback({
                    'success'    : false,
                    'message'    : msg
                });
            }
        });
    }
    /**
     * Add an user to active friends list.
     * @param {Object} uid
     */
    function addActiveFriend(uid) {
        if (!isNaN(uid = parseInt(uid))) {
            if (Util.isNumber(options.activeFriends[uid]) ) {
                options.activeFriends[uid]++;
            } else {
                options.activeFriends[uid] = 1;
            }
            options.save();
        }
    }
    /**
     * Return true if user reached the limit of the specified gift.
     * @param {Object} text collect response.
     */
    function isLimitReached(text) {
        var limitRegex = new RegExp(options.excludedPattern, 'i');
        if (options.excludedPattern) {
            return limitRegex.test(text);
        } else {
            return false;
        }
    }
    /**
     * Send request to selected friends.
     */
    function sendRequests() {
        var bCancelled = false;
        var toIds = new Array();
        var toSend = new Array();
        var $sel = $('.snd_selectable li:has(.checked)');
        var c_gifts, gift_id, gift, n_sendPerGift = 50;
        
        $('#send_body .start_ctrl a, #friendlists, .snd_selectable, .tab_bar', Popup.content).addClass('disabled');
        $('#snd_messages').empty();
        
        if ($sel.length < 1) {
            addMessageLog('Check a gift to send.');
            finish();
            return;
        }
        
        $('#send_body #snd_users option').each(function(index, elem) {
            toIds.push(parseInt(elem.value));
        });
        
        if (toIds.length < 1) {
            addMessageLog('Select which friends you want to send to.');
            finish();
            return;
        }
        
        if ($sel.length === 1) {
            gift = UserFreeGifts.get((gift_id = $sel.attr('gid')));
        } else {
            c_gifts = new Array();
            $sel.each(function(index, e) {
                c_gifts.push($(e).attr('gid'));
            });
            n_sendPerGift = Math.min(50, parseInt(toIds.length/c_gifts.length));
            
            c_gifts = new Collection(c_gifts);
            c_gifts.onEnd(c_gifts.MoveFirst);
            c_gifts.onMove(function(a1, a2, gid) {
                gift = UserFreeGifts.get((gift_id = gid));
            });
            c_gifts.MoveFirst();
        }
        
        while (toIds.length > 0) {
            toSend.push(toIds.splice(0, n_sendPerGift));
        }
        
        function loadGift(callback) {
            if (bCancelled||cancel_process) {
                finish();
                return;
            }
            addMessageLog('Loading and preparing "'+gift.name+'" to be send.', 'load');
            MW.getGift(gift_id, gift.item_cat, function(id, cat, data, msg, title) {
                if (id && cat) {
                    clearLoadingMessage(true);
                    callback({
                        message : msg,
                        data    : data,
                        title   : title
                    });
                } else {
                    clearLoadingMessage(false);
                    addMessageLog('Error loading the gift data.', 'error');
                    finish();
                }
            }, gift.params);
        }
                
        function startSending() {
            var n_total = toSend.length;
            
            $('#snd_messages').empty();
            addMessageLog(n_total+' Requests To Send. '+n_sendPerGift+' friend(s) per request.');
            
            function nextSend(send) {
                if (bCancelled||cancel_process) {
                    finish();
                    return;
                }
                send.to = toSend.shift();
                addMessageLog('Sending "'+gift.name+'" to '+send.to.length+' friend(s).', 'load');
                thanksTo(send, function(message, success) {
					clearLoadingMessage(success);
					addMessageLog(message);
                    if (success === true) {
                        nextLoad();                        
                    } else {
                        if (toSend.length>0) {
                            showAskPopup('Error Sending Requests', 'Do you want to continue?', nextLoad, finish);
                        } else {
                            finish();
                        }
                    }
                    
                }, options.sendInternally);
            }
            function nextLoad() {
                if (bCancelled||cancel_process||toSend.length < 1) {
                    finish();
                } else if (c_gifts) {
                    c_gifts.MoveNext();
                    setTimeout(function() {loadGift(nextSend);}, 50);
                } else {
                    loadGift(nextSend);
                }
            }
            nextLoad();
        }
        /**
         * @param {String} message
         */
        function clearLoadingMessage(result) {
            $('#snd_messages div img[name=load]').attr({
               'name': 'ok',
               'src' : (result!==true?global.resource.ajax_error:global.resource.ok_icon)
            });
        }
        /**
         * @param {String} message
         */
        function addMessageLog(message, icon) {
            var sImgSrc = global.resource.info_icon;
            switch(icon) {
                case 'error':  sImgSrc = global.resource.ajax_error;  break;
                case 'load':   sImgSrc = global.resource.ajax_loader; break;
            }
            c$('div').prependTo('#snd_messages')
            .append(c$('img','name:'+(icon?icon:'info')).attr('src', sImgSrc))
            .append(c$('span').html(message));
        }
        
        function finish() {
            addMessageLog('Process Finished.');
            $('#send_body .start_ctrl a, #friendlists, .snd_selectable, .tab_bar', Popup.content).removeClass('disabled');
        }
        
        startSending();
    }
    /**
     * Collect selected gifts
     */
    function StartCollector() {
        var n_Success = 0;
        var bCancelled = false;
        var c_reqs, c_gift = new Collection(Collector.all());
        var grReqs = Requests.toGroup('gift');
        var stop_click = function() {
             $(this).remove(); 
             bCancelled = true;
             finish();
             return false;
        };
		
        c_gift.onEnd(finish);
        c_gift.onMove(function(r1, r2, req_set) {
            if (bCancelled || cancel_process) {
                // nothing to do.
            }
            else if (req_set.amount < 1 || !Util.isSet(grReqs[req_set.iid])) {
                c_gift.MoveNext();
            }
            else if (options.ignoreLimits !== true && excluded.is(req_set.iid)) {
                addMessageLog('"'+req_set.name+'" skipped. Limits are reached.');
                c_gift.MoveNext();
            }
			else {
				grReqs[req_set.iid].sort(function(a, b) {
					var x = (a.send && a.send.to);
					var y = (b.send && b.send.to);
					if (req_set.action==='ignore' || req_set.action==='okonly') {
						return (x && !y) ? 1 : (!x && y) ? -1 : 0;
					}
					else {
						return (x && !y) ? -1 : (!x && y) ? 1 : 0;
					}
				});
				setGiftName(Util.setColor(req_set.name, 'green')+':');
	            c_reqs = new Collection(grReqs[req_set.iid].splice(0,req_set.amount));
				c_reqs.onEnd(c_gift.MoveNext);
				c_reqs.onMove(nextRequest);
				c_reqs.MoveFirst();
			}
            
            function nextRequest(i1, i2, req) {
                if (bCancelled||cancel_process) {
                    return;
                }
                if (!Util.isSet(req)) {
                    c_reqs.MoveNext();
                    return;
                }
				var gift_title = req_set.name+' ('+(i1+1)+' of '+req_set.amount+')';
				
				if (req_set.action === 'ignore') {
					sendMessage('Ignoring to ' + req.name);
	                httpAjaxRequest({
						'url': req.rem, 
						'liteLoad': 1, 
						'success': function(json) {
							Requests.remove(req.id);
							addMessageLog('Request ignored by the user.', 'info', req);
							c_reqs.MoveNext();
	                    }
	                });
                    return;
				}
				if (req_set.action === 'thank') {
					sendMessage('Thanking to ' + req.name);
					thanksTo(req.send, function(message){
						Requests.remove(req.id);
						addMessageLog('Thank only: ' + message, 'info', req);
						c_reqs.MoveNext();
					}, true);
                    return;
				}
				if (req_set.action==='accept') {
					sendMessage('Accepting and Thanking to ' + req.name);
				} else {
					sendMessage('Accepting to ' + req.name);
				}
                CollectRequest(req, options.sendBack&&(req_set.action==='accept'), function(data) {
                    Requests.remove(req.id);
                    if (bCancelled||cancel_process) {
                        return;
                    }
                    if (data.success) {
                        n_Success++;
                        addCollectLog(gift_title, req, data);
	                    if (isLimitReached(data.message) && !excluded.is(req_set.iid)) {
	                        excluded.add(req_set.iid);
	                        addMessageLog('Limit reached. "' + req_set.name + '" added to exclude list.');
	                    }
                    }
                    else {
                        addMessageLog(data.message, 'error', req);
                    }
                    if (data.isBackSent !== true) {
                        c_reqs.MoveNext();
                    }
                    
                }, function(message) {
                    addMessageLog('Accept and Thank: '+message, 'info', req);
                    c_reqs.MoveNext();
                });
            }
        });
        /**
         * @param {String} title
         * @param {MafiaMember} req
         * @param {Object} data
         */
        function addCollectLog(gift_name, req, data) {
            var gift_image = data.image || global.zGraphicsURL+'v3/icon_gift_27x28_01.png';
            var title = gift_name + ' from ' + Util.setAnchor(req.profile, req.name);
            var profile_pic = Util.isString(req.icon)
            ? c$('img').attr('src', req.icon) 
            : c$('span');
            c$('li').prependTo('#mss_successlog')
            .append(c$('h4').html(title)).append(profile_pic)
            .append(c$('img').attr('src', gift_image))
            .append(c$('p').html(data.message));
        }
        /**
         * @param {String} message
         * @param {String} icon
         * @param {MafiaMember} req
         */
        function addMessageLog(message, icon, req) {
            var sImgSrc = (icon==='error') 
            ? global.resource.ajax_error
            : global.resource.info_icon;
            var userProfile = Util.isSet(req) 
            ? Util.setAnchor(req.profile, req.name) + ': '
            : '';
            if (icon !== 'error') {
                message = Util.setColor(message, '#E1E1E1');
            } else {
                message = Util.setColor(message, 'red');
            }
            c$('li').prependTo('#mss_messagelog')
            .append(c$('img').attr('src', sImgSrc))
            .append(c$('p').html(userProfile + message));
        }

        function setGiftName(giftname) {
            $('#mss_reqname', Popup.content).html(giftname);
        }

        function sendMessage(message) {
            $('#mss_message', Popup.content).html(message);
        }
        
        function finish() {
            c_gift.clear();
            setGiftName('Finished');
            sendMessage(n_Success+' gifts collected.');
            addMessageLog('Process finished at '+(new Date()).toUTCString(), 'info');
            $('#mss_messages a').remove();
            Collector.clear();
            b$('Return','class:short green').css('float','right')
            .appendTo('#mss_messages').click(Events.finishCollector_click);
        }
        // start
        $('.tab_bar', Popup.content).addClass('disabled');
        $('#mss_successlog, #mss_messagelog', Popup.content).empty();
        $('#mss_messages a', Popup.content).remove();
        $('#mss_reqname, #mss_message', Popup.content).empty();
        $('#mss_info').hide();
        $('#mss_messages').show();
        
        b$('STOP','class:short red').css('float','right').appendTo('#mss_messages').click(stop_click);
        addMessageLog('Process started at '+(new Date()).toUTCString(), 'info');
        c_gift.MoveFirst();
    }
	/**
	 * Send thanks.
	 * @param {Object} data
	 * @param {Function} callback
	 * @param {Boolean} [internally]
	 */
	function thanksTo(data, callback, internally) {
		var toUsers = new Array()
		if (data && Util.isArray(data.to)) {
			if (data.to.length === 1) {
				if (usersThanked[data.to[0]] === true) {
					userError();
					return;
				}
			}
			else {
				Util.each(data.to, function(index, uid) {
					if (usersThanked[uid] !== true) {
						toUsers.push(uid);
					}
				});
				if ((data.to = toUsers).length < 1) {
					userError();
					return;
				}
			}
		} else {
			userError();
			return;
		}
		facebook.sendRequest(data, function(message) {
			Util.each(data.to, function(index, uid) {
				usersThanked[uid] = true;
			});
			if (message === false) {
				callback(Util.setColor('Error sending request.', 'red'), false);
			} else {
				callback(message, true);
			}
		}, internally);
		
		function userError() {
			callback(Util.setColor('Can\'t sent to this user(s) again.', 'yellow'), false);
		}
	}
	/**
	 * Get all users requests.
	 * @param {Function} callback
	 */
    function getUserRequests(callback) {
        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('messageCenter', 'view'),
            success: function(htmlText) {
                var $li = h$(htmlText).find('ul#zmc_message_list_ul li');
                Requests = new CSRequestCollection();
                Logger.debug( 'getUserRequests: '+$li.length );
                $li.each(function(index, elem) {
                    Requests.add(new CSRequest(elem)); 
                });
                callback && callback(true);
            },
            error: function(msg) {
                callback && callback(false);
                showBadResponse(msg);
            }
        });
    }

    function showDiv(name, type, ms, fn) {
        $('div[id*=_'+type+']', Popup.content).hide();
        var elem = $('#' + name + '_' + type, Popup.content);
        if (ms) {
            elem.fadeIn(ms, fn);
        }
        else {
            elem.show();
        }
    }

    function genMainDom() {

        // fix content height
        Popup.content.height(680);

        // add tab bar
        var $tab = c$('ul', 'class:tab_bar').appendTo(Popup.content);

        c$('li','tb:reqs,class:request active').appendTo($tab).click(Events.tab_click)
        .append(c$('a','href:#').html('<span><em>Requests</em></span>'));
        c$('li','tb:mass,class:collector').appendTo($tab).click(Events.tab_click)
        .append(c$('a','href:#').html('<span><em>Collector</em></span>'));
        c$('li','tb:send,class:sender').appendTo($tab).click(Events.tab_click)
        .append(c$('a','href:#').html('<span><em>Sender</em></span>'));
        c$('li','tb:cnfg').appendTo($tab).click(Events.tab_click)
        .append(c$('a','href:#').html('<span><em>Configuration</em></span>'));

        // loader
        c$('div', 'ajaxloader_body').css('padding-top',40).height(600).appendTo(Popup.content)
        .append(c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif'));

        function addReqLayout($to) {
            var $frm = c$('div', 'class:frame_box').appendTo($to);
            
            c$('div').css('float','left').appendTo($frm)
            .append(t$('filter_text', 'Search:', 150))
            .append(s$('category_select', 'Category:', 150));
            
            c$('div').css('float','right').appendTo($frm)
            .append(b$('Clear all', 'class:short white').click(Events.clear_all))
            .append(b$('Refresh','class:short orange').css('margin-left',5).click(Events.refresh_click));
    
            c$('ul', 'id:reqslist,class:req_box').height(560).appendTo($to);            
        }
        function addColLayout($to) {
            var $frm = c$('div', 'class:frame_box').appendTo($to);
            c$('div', 'id:mss_info').css('min-height',40).appendTo($frm);
            c$('div', 'id:mss_messages').appendTo($frm).hide()
            .append(c$('span', 'id:mss_reqname'))
            .append(c$('span', 'id:mss_message').css('margin-left', 5));
            
            $frm = c$('div', 'id:setup_mass,class:frame_box').appendTo($to).css('height',520);
            
            c$('div','class:li_wrapper').appendTo($frm)
			.append(c$('div','class:top_ctrl').css('height',80)
			.append(s$('mss_action', 'Action:', 220))
			.append(c$('div').css({'clear':'both','margin-top':4}))
			.append(n$('mss_amount', 'Amount to collect:', 80))
			.append(c$('div').css({'clear':'both','margin-top':6}))
			.append(b$('Add to Collect >>', 'class:short green').click(Events.addGift_click)))
            .append(c$('ul', 'class:mss_selectable').css('height',410));
            
            c$('div','class:li_wrapper').appendTo($frm)
            .append(c$('ul', 'class:mss_selected'))
            .append(c$('center', 'class:start_ctrl')
            .append(b$('CLEAR','class:medium white').click(Events.clearCollector_click))
            .append(b$('START!','class:medium green').click(Events.startCollector_click)));
            
            $to = c$('div','logger_mass').appendTo($to);
            
            $to.append(c$('ul','mss_messagelog').height(250))
            $to.append(c$('ul','mss_successlog').height(300));
        }
        function addSndLayout($to) {
            var $frm = c$('div', 'class:frame_box').appendTo($to);
            
            c$('div', 'id:snd_messages').appendTo($frm);
            
            $frm = c$('div', 'class:frame_box').appendTo($to).css('height',500);
            
            c$('div','class:li_wrapper').appendTo($frm)
            .append(c$('ul', 'class:snd_selectable').css('height',484));
            
            c$('div','class:li_wrapper').appendTo($frm)
            .append(c$('div','class:top_ctrl').appendTo($frm).append(s$('friendlists', 'Select From List:', 200)))
            .append(c$('select', 'multiple:multiple,id:snd_users').css({'height':406,'width':'100%'}))
            .append(c$('center', 'class:start_ctrl')
            .append(b$('CLEAR','class:medium white').click(Events.clearFriends_click))
            .append(b$('EDIT','class:medium orange').click(Events.editFriends_click))
            .append(b$('SAVE','class:medium orange,id:save_friends_btn').click(Events.saveFriends_click))
            .append(b$('REMOVE','class:medium orange,id:remove_list_btn').click(Events.removeList_click))
            .append(b$('SEND','class:medium green').click(Events.startSending_click)));
            
            $('#friendlists').change(Events.friendLists_change); 
            
        }        
        function addCfgLayout($to) {
            c$('div', 'class:frame_box')
            .append(x$('fgopt_sendback', 'Send requests back (check "Don\'t ask again..." on confirmation box to make it faster).'))
            .append(c$('div').css({'clear':'both','margin-bottom':5}))
            .append(x$('fgopt_sendinternally', 'Send requests internally only (don\'t send facebook request).'))
            .append(c$('div').css({'clear':'both','margin-bottom':5}))
            .append(x$('fgopt_ignorelimits', 'Continue collecting when limits are reached.'))
            .appendTo($to);
    
            c$('div', 'class:frame_box')
            .append(c$('h4').css('margin',0).text('Excluded Gifts:'))
            .append(c$('a','href:#').text('Reset all gifts in excluded list.').click(Events.reset_click))
            .append(c$('div').css({'clear':'both','margin-bottom':5}))
            .append(c$('input:text','id:fgopt_excludedpattern').width('100%'))
            .appendTo($to);
    
            c$('div', 'class:frame_box')
            .append(c$('h4').css('margin',0).text('Active Friends:'))
            .append(n$('fgopt_activefrmin', 'Active Friends are those who send me', 50))
            .append(c$('span').text('requests or more.  '))
            .append(c$('div').html('Total Active Friends '+Util.setColor(0,'yellow','total_activefriends')))
            .append(c$('div').html('Only those friends which you can send requests will be added when you select "Active Friends" list.'))
            .append(c$('div').css({'clear':'both','margin-bottom':5}))
            .append(c$('a','href:#').text('Reset active friends list.').click(Events.resetActiveFriends_click))
            .appendTo($to);
        }
		
        // ADD BODY ELEMENTS
        addReqLayout( c$('div', 'reqs_body').height(640).appendTo(Popup.content) );
        addColLayout( c$('div', 'mass_body').height(640).appendTo(Popup.content) );
        addSndLayout( c$('div', 'send_body').height(640).appendTo(Popup.content) );
        addCfgLayout( c$('div', 'cnfg_body').height(640).appendTo(Popup.content) );
        
        $('#filter_text', Popup.content).keypress(Events.filter_change).change(Events.filter_change);
        $('#category_select', Popup.content).change(Events.category_change);
        
        UserFreeGifts.each(function(id, gift) {
            c$('li','gid:'+id).appendTo('.snd_selectable')
            .append(x$('checked_gift_'+id, gift.name, 'div').css('float','left')
            .prepend(c$('img').attr('src', UserFreeGifts.getImageUrl(gift.img))));
        }, true);
        
        // fix class
        $('input:text, select, textarea', Popup.content).addClass('black_box');

        Popup.applyOptions({
			'mss_action': {
				'accept'  :'Accept And Thank', 
				'okonly'  :'Accept Only', 
				'thank'   :'Thank Only', 
				'ignore'  :'Ignore'
			},
            'category_select' : {'all':'All', 'search': 'Search'},
            'friendlists'     : {'none': 'Custom', 'active': 'Most Active'}
        });
    }

    function genRequestDom() {
        var $ul = $('#reqslist', Popup.content).empty();
        var $icon = c$('img').attr('src', global.resource.ajax_loader);
        
        Requests.each(function(id, req) {
            
            var name  = '<a href="'+req.profile+'" target="_black">'+req.name+'</a>';
            var $img  = c$('span', 'class:player_pic,title:'+req.name);
            if (req.icon) {
                $img.css('background', "url('"+req.icon+"') 50% 50% no-repeat");
            }
            var $li = c$('li', 'class:'+req.type+',id:req_'+id).appendTo($ul);
            $li = c$('div', 'class:li_wrapper clearfix').appendTo($li);
            
            $img.append(c$('span')).appendTo($li);
            
            if (options.sendBack && req.send && req.send.to) {
                c$('div','class:buttons state_accept').appendTo($li).width(150)
                .append(b$('Accept And Thank', 'class:medium white,req:'+id).click(Events.accept_click))
                .append(c$('a', 'href:#,class:acceptonly,req:'+id).text('accept').click(Events.accept_click))
                .append(c$('span').text(' | '))
                .append(c$('a', 'href:#,class:thanksonly,req:'+id).text('thanks').click(Events.ignore_request_click))
                .append(c$('span').text(' | '))
                .append(c$('a', 'href:#,class:ignore,req:'+id).text('ignore').click(Events.ignore_request_click));
            }
            else {
                c$('div','class:buttons state_accept').appendTo($li)
                .append(b$('Accept', 'class:medium white,req:'+id).click(Events.accept_click))
                .append(c$('a', 'href:#,class:ignore,req:'+id).text('ignore').click(Events.ignore_request_click));
            }
            
            c$('div','class:buttons state_retry').appendTo($li).hide()
            .append(b$('Clear', 'class:medium white,req:'+id).click(Events.clear_request_click))
            .append(c$('a', 'href:#,class:ignore,continue:true,req:'+id).text('continue').click(Events.accept_click));
                        
            c$('div','class:buttons state_completed').appendTo($li).hide()
            .append(b$('Clear', 'class:medium white,req:'+id).click(Events.clear_request_click));
                        
            c$('div','class:body').append('<h4>'+name+'</h4><p>'+req.body+'</p>').appendTo($li)
            .append(c$('div','id:loading_overlay').text('Loading...').prepend($icon.clone()).hide());
            
            // add category 
            if (!e$('#category_select option[value='+req.type+']', Popup.content)) {
                c$('option', 'value:'+req.type).appendTo('#category_select').text(Util.formatText(req.type));
            }
        });

        if ($('li', $ul).length < 1) {
            c$('li').appendTo($ul).append(c$('center').css('padding-top',40).text('You don\'t have request.'));
        }
    }
	
	function genMssSelectableDom() {        
		var $ul = $('.mss_selectable', Popup.content).empty();
        Collector.clear();
		Util.each(Requests.toGroup('gift'), function(item_id, reqs) {
			var g = reqs[0].gift;
			var t = reqs[0].body;
            c$('li','iid:'+item_id+',title:'+t+',count:'+reqs.length).appendTo($ul)
            .append(c$('img').attr('src', UserFreeGifts.getImageUrl(g.img)))
            .append(c$('div', 'class:gift_amount').text(reqs.length+'x'))
            .append(c$('div', 'class:gift_name').text(g.name))
            .click(Events.selectGift_click);
		});
	}
	
	function genMssSelectedDom() {
		var $ul = $('#mass_body .mss_selected', Popup.content).empty();
		
		Collector.each(function(index, job) {
			var jobText = $('#mss_action option[value='+job.action+']', '#mass_body').text();
			
			jobText = Util.setColor(jobText,'green') + ' ';
			jobText += Util.setColor(job.amount,'yellow');
			
	        c$('li').appendTo($ul)
	        .append(c$('img').attr('src', job.icon))
	        .append(c$('div', 'class:gift_name').html(jobText + ' ' + job.name));
		});
		
	}

    function Initialize() {
        loadingScreen('Loading requests...');
        getUserRequests(function(success) {
            loadingScreen();
			if (success !== true) {
                Popup.destroy();
                return;
            }
			Collector = new CSCollector(); 
			
            genMainDom();
            genRequestDom();

            options.toDomElements();

            showDiv('reqs', 'body');
            showDiv('control', 'panel');
            showDiv('setup', 'mass');
			
			getAppFriends(getMWLists);

            Popup.show();
        });
    }

    Popup.addBase64Style(
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
        'NXB4IG5vLXJlcGVhdDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwudGFiX2JhciBsaS5zZW5kZXIgZW0gew0KYmFja2dy'+
        'b3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3YzL2ljb25fc2VuZGdpZnRfMjJ4'+
        'MTZfMDEuZ2lmIikgNXB4IDEzcHggbm8tcmVwZWF0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCNtc3NfbWVzc2FnZWxv'+
        'ZywgI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCNtc3Nfc3VjY2Vzc2xvZyAgew0KCWJvcmRlcjogMnB4IHNvbGlkICMzMzM7DQoJ'+
        'bWFyZ2luOiA1cHg7DQoJcGFkZGluZzogNXB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCNtc3Nfc3VjY2Vzc2xvZyBs'+
        'aSB7DQoJbWF4LWhlaWdodDogMTAwcHg7DQoJbWluLWhlaWdodDogNjBweDsNCglwYWRkaW5nOiA1cHggMjBweCAwcHggMTVweDsN'+
        'Cglib3JkZXI6IDFweCBzb2xpZCAjMjIyOw0KCW1hcmdpbi1ib3R0b206IDVweDsJDQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVw'+
        'IHVsI21zc19zdWNjZXNzbG9nIGxpIGg0IHsNCglmb250LXNpemU6IDE0cHg7DQoJbGluZS1oZWlnaHQ6IDE4cHg7DQoJbWFyZ2lu'+
        'LWJvdHRvbTogNHB4Ow0KCXBhZGRpbmctdG9wOiAycHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCgljb2xvcjogI0ZGRDkyNzsNCn0N'+
        'CiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwjbXNzX3N1Y2Nlc3Nsb2cgbGkgcCB7DQoJZm9udC1zaXplOiAxMnB4Ow0KCW1pbi1o'+
        'ZWlnaHQ6IDM1cHg7DQoJcGFkZGluZy1sZWZ0OiA0MHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVs'+
        'IGxpIGltZywNCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI3NlbmRfYm9keSB1bCBsaSBpbWcgew0KCWZsb2F0OiBsZWZ0Ow0KICAg'+
        'IHdpZHRoOiAxOHB4Ow0KICAgIGhlaWdodDogMThweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI3NlbmRfYm9keSB1bCBs'+
        'aSBpbWcgew0KCW1hcmdpbi1yaWdodDogNXB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjc2VuZF9ib2R5IHVsLnNuZF9z'+
        'ZWxlY3RhYmxlIGxpIGRpdiB7DQoJd2lkdGg6IDkwJTsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwjbXNzX3N1Y2Nlc3Ns'+
        'b2cgbGkgaW1nIHsNCgltYXJnaW4tcmlnaHQ6IDVweDsNCgloZWlnaHQ6IDMwcHg7DQoJd2lkdGg6IDMwcHg7DQp9DQojZnJlZWdp'+
        'ZnRzY2VudGVyX3BvcHVwICNzZW5kX2JvZHkgI3NuZF9tZXNzYWdlcyB7DQogICAgbWluLWhlaWdodDogODBweDsNCiAgICBvdmVy'+
        'Zmxvdy15OiBhdXRvOw0KICAgIG1heC1oZWlnaHQ6IDgwcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNzZW5kX2JvZHkg'+
        'I3NuZF9tZXNzYWdlcyBpbWcgew0KCW1hcmdpbi1yaWdodDogNXB4Ow0KICAgIGZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogMTZweDsN'+
        'Cgl3aWR0aDogMTZweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwjbXNzX21lc3NhZ2Vsb2cgbGkgew0KCW1heC1oZWln'+
        'aHQ6IDQwcHg7DQoJcGFkZGluZzogNXB4IDIwcHggMHB4IDE1cHg7DQoJYm9yZGVyOiAxcHggc29saWQgIzIyMjsNCgltYXJnaW4t'+
        'Ym90dG9tOiA1cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsI21zc19tZXNzYWdlbG9nIGxpIHAgew0KCWZvbnQtc2l6'+
        'ZTogMTJweDsNCgloZWlnaHQ6IDIwcHg7DQoJcGFkZGluZy1sZWZ0OiAzMHB4Ow0KCW1hcmdpbi1ib3R0b206IDFweDsNCn0NCiNm'+
        'cmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwjbXNzX21lc3NhZ2Vsb2cgbGkgaW1nIHsNCgloZWlnaHQ6IDE2cHg7DQoJd2lkdGg6IDE2'+
        'cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNtYXNzX2JvZHkgZGl2LmxpX3dyYXBwZXIsDQojZnJlZWdpZnRzY2VudGVy'+
        'X3BvcHVwICNzZW5kX2JvZHkgZGl2LmxpX3dyYXBwZXIgew0KICAgIHdpZHRoOiAzNDRweDsNCiAgICBmbG9hdDogbGVmdDsNCiAg'+
        'ICBtYXJnaW46IDJweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI21hc3NfYm9keSB1bCwNCiNmcmVlZ2lmdHNjZW50ZXJf'+
        'cG9wdXAgI3NlbmRfYm9keSB1bCB7DQoJaGVpZ2h0OiA0NjBweDsNCgltYXJnaW4tdG9wOiAycHg7DQoJYm9yZGVyOiBzb2xpZCAx'+
        'cHggIzY2NjsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVsIGxpLA0K'+
        'I2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjc2VuZF9ib2R5IHVsIGxpIHsNCgloZWlnaHQ6IDIwcHg7DQoJcGFkZGluZzogM3B4Ow0K'+
        'CXRleHQtZGVjb3JhdGlvbjogbm9uZTsNCglib3JkZXI6IDFweCBzb2xpZCAjMjIyOw0KCW1hcmdpbjogMXB4Ow0KfQ0KI2ZyZWVn'+
        'aWZ0c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVsI21zc19zdWNjZXNzbG9nIGxpIGltZyB7DQogICAgd2lkdGg6IDMycHg7DQog'+
        'ICAgaGVpZ2h0OiAzMnB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVsLm1zc19zZWxlY3RhYmxlIGxp'+
        'IHsNCgljdXJzb3I6IHBvaW50ZXI7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNtYXNzX2JvZHkgdWwubXNzX3NlbGVjdGFi'+
        'bGUgbGkuc2VsZWN0ZWQsDQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNzZW5kX2JvZHkgdWwuc25kX3NlbGVjdGFibGUgbGkuc2Vs'+
        'ZWN0ZWQgew0KCWJvcmRlcjogMXB4IHNvbGlkIHllbGxvdzsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI21hc3NfYm9keSB1'+
        'bC5tc3Nfc2VsZWN0YWJsZSBsaTpob3ZlciwNCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI3NlbmRfYm9keSB1bC5zbmRfc2VsZWN0'+
        'YWJsZSBsaTpob3ZlciB7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwg'+
        'bGkgZGl2LmdpZnRfbmFtZSB7DQogICAgbWFyZ2luOiAwcHggMHB4IDBweCA1cHg7DQogICAgZmxvYXQ6IGxlZnQ7DQogICAgb3Zl'+
        'cmZsb3c6IGhpZGRlbjsNCiAgICBtYXgtaGVpZ2h0OiAyMHB4Ow0KICAgIG1heC13aWR0aDogMjgwcHg7DQogICAgaGVpZ2h0OiAy'+
        'MHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCBsaSBkaXYuZ2lmdF9hbW91bnQgew0KCW1hcmdpbjogMHB4IDNweCAw'+
        'cHggOHB4Ow0KCWZsb2F0OiBsZWZ0Ow0KCW92ZXJmbG93OiBoaWRkZW47DQoJbWF4LWhlaWdodDogMjBweDsNCgltYXgtd2lkdGg6'+
        'IDMwcHg7DQoJbWluLXdpZHRoOiAyMHB4Ow0KCWNvbG9yOiB5ZWxsb3c7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNtYXNz'+
        'X2JvZHkgdWwubXNzX3NlbGVjdGVkIGxpIGRpdi5xdWFudGl0eSB7DQoJZmxvYXQ6IHJpZ2h0Ow0KICAgIG1hcmdpbi1yaWdodDog'+
        'MTBweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI21hc3NfYm9keSB1bC5tc3Nfc2VsZWN0ZWQgbGkgZGl2LnF1YW50aXR5'+
        'IGlucHV0IHsNCglmb250LXdlaWdodDogYm9sZDsgDQoJY29sb3I6IHJnYigyMDgsIDIwOCwgMjA4KTsgDQoJYm9yZGVyOiAxcHgg'+
        'c29saWQgcmdiKDE1MywgMTUzLCAxNTMpOyANCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgDQoJZm9udC1zaXplOiAxNHB4Ow0K'+
        'CXdpZHRoOiAzMHB4Ow0KCWhlaWdodDogMTVweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI21hc3NfYm9keSB1bC5tc3Nf'+
        'c2VsZWN0ZWQgbGkgYSB7DQoJbWFyZ2luLWxlZnQ6IDJweDsNCglmbG9hdDogcmlnaHQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3Bv'+
        'cHVwIC50b3BfY3RybCB7DQoJYm9yZGVyOiBzb2xpZCAxcHggIzY2NjsNCgloZWlnaHQ6IDIwcHg7DQogICAgcGFkZGluZzogNXB4'+
        'Ow0KICAgIG1hcmdpbi10b3A6IDJweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgLnRvcF9jdHJsIGEgew0KCWZsb2F0OiBy'+
        'aWdodDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgLnN0YXJ0X2N0cmwgew0KCWhlaWdodDogMzdweDsNCglib3JkZXI6IHNv'+
        'bGlkIDFweCAjNjY2Ow0KCW1hcmdpbi10b3A6IDJweDsNCglwYWRkaW5nLXRvcDogM3B4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9w'+
        'b3B1cCAuc3RhcnRfY3RybCBhIHsNCgltYXJnaW4tcmlnaHQ6IDEwcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJl'+
        'cV9ib3ggZGl2LmxpX3dyYXBwZXIgew0KCWJvcmRlci10b3A6IDFweCBzb2xpZCAjMjIyOw0KCXBhZGRpbmc6IDZweCAxNHB4IDAg'+
        'NTJweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaTpmaXJzdC1jaGlsZCB7DQoJYm9yZGVyLXdpZHRo'+
        'OiAwcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgew0KCW1pbi1oZWlnaHQ6IDc2cHg7DQoJbWF4'+
        'LWhlaWdodDogMTYwcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkuZ2lmdCB7DQoJYmFja2dyb3Vu'+
        'ZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3YzL2ljb25fZ2lmdF8yN3gyOF8wMS5w'+
        'bmciKSAxN3B4IDIwcHggbm8tcmVwZWF0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpLm1hZmlhX2lu'+
        'dml0ZSB7DQogICAgYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3Yz'+
        'L2ljb25fbWFmaWFfaGF0XzMyeDI1XzAxLnBuZyIpIDE0cHggMjBweCBuby1yZXBlYXQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3Bv'+
        'cHVwIHVsLnJlcV9ib3ggbGkuZW5lcmd5X3BhY2sgew0KICAgIGJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnpn'+
        'bmNkbi5jb20vbXdmYi9ncmFwaGljcy92My9pY29uX2VuZXJneV9wYWNrXzI5eDI3XzAxLnBuZyIpIDE2cHggMjBweCBuby1yZXBl'+
        'YXQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkuaGVscCB7DQogICAgYmFja2dyb3VuZDogdXJsKCJo'+
        'dHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL21hcF9iYXNlZF9qb2JzL2V4cGVydF92aWV3L2ljb25f'+
        'bWVnYXBob25lLnBuZyIpIDE3cHggMjBweCBuby1yZXBlYXQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3gg'+
        'bGkuZmFtaWx5IHsNCiAgICBiYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhp'+
        'Y3MvdjMvRmFtaWx5X1pNQ19JY29uLnBuZyIpIDE1cHggMjBweCBuby1yZXBlYXQgIWltcG9ydGFudDsNCn0NCiNmcmVlZ2lmdHNj'+
        'ZW50ZXJfcG9wdXAgdWwubWFmaWFfaW52aXRlIGxpIHsNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9w'+
        'b3B1cCB1bC5tYWZpYV9pbnZpdGUgbGkubWFmaWFfaW52aXRlIHsNCiAgICBkaXNwbGF5OiBibG9jazsNCn0NCiNmcmVlZ2lmdHNj'+
        'ZW50ZXJfcG9wdXAgdWwuZ2lmdCBsaSB7DQogICAgZGlzcGxheTogbm9uZTsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwu'+
        'Z2lmdCBsaS5naWZ0IHsNCiAgICBkaXNwbGF5OiBibG9jazsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwuZW5lcmd5X3Bh'+
        'Y2sgbGkgew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLmVuZXJneV9wYWNrIGxpLmVu'+
        'ZXJneV9wYWNrIHsNCiAgICBkaXNwbGF5OiBibG9jazsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwuc2FmZWhvdXNlIGxp'+
        'IHsNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5zYWZlaG91c2UgbGkuc2FmZWhvdXNl'+
        'IHsNCiAgICBkaXNwbGF5OiBibG9jazsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwuaGVscCBsaSB7DQogICAgZGlzcGxh'+
        'eTogbm9uZTsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwuaGVscCBsaS5oZWxwIHsNCiAgICBkaXNwbGF5OiBibG9jazsN'+
        'Cn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwuZmFtaWx5IHsNCiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0'+
        'YW50Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5mYW1pbHkgbGkgew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQojZnJl'+
        'ZWdpZnRzY2VudGVyX3BvcHVwIHVsLmZhbWlseSBsaS5mYW1pbHkgew0KICAgIGRpc3BsYXk6IGJsb2NrOw0KfQ0KI2ZyZWVnaWZ0'+
        'c2NlbnRlcl9wb3B1cCB1bC5zZWFyY2ggbGkgew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVw'+
        'IHVsLnNlYXJjaCBsaS5tYXRjaGVkIHsNCiAgICBkaXNwbGF5OiBibG9jazsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwu'+
        'cmVxX2JveCBsaSBkaXYuYnV0dG9ucyB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWZvbnQtc2l6ZTogMTBweDsNCglmb250LXdlaWdodDog'+
        'Ym9sZDsNCgltYXJnaW46IDNweCAwcHggMHB4IDE0cHg7DQoJdGV4dC1hbGlnbjogcmlnaHQ7DQoJd2lkdGg6IDcwcHg7DQp9DQoj'+
        'ZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgZGl2LmJvZHkgew0KCW1hcmdpbi1yaWdodDogMTAwcHg7DQoJbWFy'+
        'Z2luLWxlZnQ6IDY1cHg7DQoJbWluLWhlaWdodDogNjBweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBs'+
        'aSBkaXYuYm9keSAjbG9hZGluZ19vdmVybGF5IGltZyB7DQogICAgcG9zaXRpb246IHJlbGF0aXZlOw0KICAgIGJvdHRvbTogLTNw'+
        'eDsNCiAgICBtYXJnaW4tcmlnaHQ6IDVweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSBoNCB7DQoJ'+
        'Zm9udC1zaXplOiAxNHB4Ow0KCWxpbmUtaGVpZ2h0OiAxOHB4Ow0KCW1hcmdpbi1ib3R0b206IDRweDsNCglwYWRkaW5nLXRvcDog'+
        'MnB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpIHAgew0KCWZvbnQtc2l6ZTogMTJweDsNCglsaW5l'+
        'LWhlaWdodDogMTVweDsNCgltYXJnaW4tYm90dG9tOiA1cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3gg'+
        'bGkuZmFpbGVkIHAgew0KCWNvbG9yOiByZWQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkuYXNraW5n'+
        'IHAgew0KCWNvbG9yOiB5ZWxsb3c7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgaW1nIHsNCiAgICBm'+
        'bG9hdDogbGVmdDsNCiAgICBtYXgtd2lkdGg6IDU0cHg7DQoJbWF4LWhlaWdodDogNTRweDsNCiAgICBtYXJnaW4tcmlnaHQ6IDVw'+
        'eDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSBkaXYuYnV0dG9ucyBhLnNleHlfYnV0dG9uX25ldyB7'+
        'DQoJbWFyZ2luLWJvdHRvbTogNnB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpIGRpdi5idXR0b25z'+
        'IGEuaWdub3JlLA0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpIGRpdi5idXR0b25zIGEuYWNjZXB0b25seSwN'+
        'CiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSBkaXYuYnV0dG9ucyBhLnRoYW5rc29ubHkgew0KCXRleHQtdHJh'+
        'bnNmb3JtOiB1cHBlcmNhc2U7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLCAjZnJlZWdpZnRzY2VudGVyX3BvcHVwIGxp'+
        'LCAjZnJlZWdpZnRzY2VudGVyX3BvcHVwIGRsLCAjZnJlZWdpZnRzY2VudGVyX3BvcHVwIGR0LCAjZnJlZWdpZnRzY2VudGVyX3Bv'+
        'cHVwIGRkLCAjZnJlZWdpZnRzY2VudGVyX3BvcHVwIGgyLCAjZnJlZWdpZnRzY2VudGVyX3BvcHVwIGgzLCAjZnJlZWdpZnRzY2Vu'+
        'dGVyX3BvcHVwIGg0LCAjZnJlZWdpZnRzY2VudGVyX3BvcHVwIHAgew0KCW1hcmdpbjogMHB4Ow0KCXBhZGRpbmc6IDBweDsNCn0='
    );

    // Initialize
    options.load(Initialize);
}
// ==Script==
// @id        HomeFeedCenter.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Set configuration.
 */
UserConfig.create('hfopt', {
    // exclude some settings when exporting.
    _excludedToExport: ['collectedStreams', 'lastPostTime'],
    
    maxLogLength               : 50,
    lastPostTime               : 0,
    collectedStreams           : new Array(),
    feedsLimit                 : 100,
    useUserFilter              : false,
    userFilterAction           : 'skip',
    userFilter                 : new Object(),
    doGotoWar                  : false,
    doGiveSocialHelp           : true,
    GiveSocialHelp             : new Object(),
    doSocialMissions           : false,
    doClaimBonusAndReward      : true,
    ClaimBonusAndReward        : new Object(),
    doPropertyHelp             : true,
    PropertyHelp               : new Object(),
    doSendEnergyAndPhones      : true,
    doAcceptGiftEvent          : true,
    doHitlistBounty            : false,
    doSecretStash              : true,
    doCityCrew                 : true,
    doDailyTake                : true,
    helpDelay                  : 3,
    refreshDelay               : 60,
    joinMission                : 0,
    joinMissionAfter           : 0,
    diff_easy                  : false,
    diff_medium                : false,
    diff_hard                  : true,
    diff_event                 : false,
    maxFreeSlots               : 100,
    warUseMinAttack            : true,
    warUseMinDefense           : true,
    warMinAttack               : 50, 
    warMinDefense              : 50,
    warUseNameFilter           : false,
    warNameFilter              : '',
    opUseNameFilter            : false, 
    opNameFilter               : '',
    dtCheckMinAtkDef           : false, 
    dtMinAttack                : 30,
    dtMinDefense               : 30,
    dtLootPriority             : 'Attack Point\nDefense Point'
});
/**
 * Get feed stories and autohelp all
 */
function HomeFeedCenter()
{
    const ERROR_BAD_RESPONSE = 'Unexpected server response, check this stream manually.';

    var messageTimer = new TimerMessage('#auto_feed_helper_messages');
    var cancel_process = false;
    var inputSearchCalltimer;

    var options = UserConfig.hfopt;
    // popup
    var popupElt = new PopupObject('homefeedcenter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.homefeedcenter_title+'">',
        onclose: function() {
            cancel_process = true;
            messageTimer.clear();
            options.fromDomElements();
            options.save();
        }
    });

    var groupNames = {
        'none'                    : 'General',
        'doGotoWar'               : 'Go to War',
        'doGiveSocialHelp'        : 'Give Social Help',
        'doDailyTake'             : 'Daily Take',
        'doSocialMissions'        : 'Operations',
        'doClaimBonusAndReward'   : 'Claim Bonus And Reward',
        'doPropertyHelp'          : 'Property Help',
        'doSendEnergyAndPhones'   : 'Send Energy And Phones',
        'doAcceptGiftEvent'       : 'Accept Gift Event',
        'doHitlistBounty'         : 'Hitlist Bounty',
        'doSecretStash'           : 'Secret Stash',
        'doCityCrew'              : 'City Crew' 
    };

    /**
     * @constructor
     * @param {Object} feed
     * @return {CSStream}
     */
    var CSStream = function(feed) {
        var nLastTime = options.get('lastPostTime');
        var url_params, stream_action, group_name;
        var stream_id = 'unknow';
        var isValid = true;

        try {
	        if (!feed.attachment.href) {
	            feed.attachment.href = feed.attachment.media[0].href;
	        }
	        if (!feed.attachment.href) {
	            throw Error('Invalid href');
	        }
            url_params     = Util.uSplit(feed.attachment.href);
            stream_id      = url_params.next_controller + '_' + url_params.next_action;
            stream_action  = Actions.get(stream_id);
        }
        catch(err) {
            isValid = false;
        }

        /** @type {Object}   */ this.feed         = feed;
        /** @type {Object}   */ this.user_id      = feed.source_id;
        /** @type {Boolean}  */ this.isValid      = isValid;
        /** @type {Boolean}  */ this.isNew        = (feed.created_time > nLastTime);
        /** @type {String}   */ this.id           = stream_id;
        /** @type {String}   */ this.gid          = (stream_action?stream_action.group:'');
        /** @type {String}   */ this.url          = toInternalUrl(url_params);
        /** @type {CSAction} */ this.action       = stream_action;

        /**
         * Return true if this was collected.
         */
        this.isCollected = function() {
            var arr = options.collectedStreams;
            if (Util.isArray(arr)) {
                return arr.indexOf(feed.post_id) !== -1;
            } else {
                options.set('collectedStreams', new Array());
                options.save();
            }
            return false;
        };
        /**
         * Set this feed as collected.
         */
        this.collected = function() {
            var arr = options.collectedStreams;
            if (!Util.isArray(arr)) {
                options.set('collectedStreams', (arr = new Array()));
                options.save();
            }
            else if (arr.length > 199) {
                arr = arr.splice(0, 1);
            }
            arr.push(feed.post_id);
        };

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
                if (Util.isSet(streams[i])) { len++; }
            }
            return len;
        };
        /**
         * Loops through all streams. 
         * @param {Function} callback
         */
        this.each = function(callback) {
            Util.each(streams, callback);
        };
        /**
         * Split stream array to the new quantity
         */
        this.slice = function(amount) {
            streams = streams.slice(0, amount);
        }

        Util.each(feeds, function(n, feed) {
            if (feed && feed.created_time) {
                var me  = parseFloat(facebook.session.uid);
                var sid = parseFloat(feed.source_id);
                var tid = feed.target_id ? parseFloat(feed.target_id) : null;

                if ( feed.created_time > nNewLastTime ) {
                    nNewLastTime = feed.created_time;
                }

                if ( sid !== me && (tid == null || tid == me) ) {
                    var strm = new CSStream(feed);
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
        addUserToFilter_click: function() {
            var added_users = new Array();
            var listElt = $('#hfopt_userfilter');
            $('option',listElt).each(function(i, e) {
                added_users.push(e.value);
            });
            showFriendsSelector(function(users) {
                if (users.length > 0) {
                    listElt.empty();
                    Util.each(users, function(i, user) {
                        c$('option','value:'+user.uid).text(user.name).appendTo(listElt);
                    });
                }
            }, added_users);
            return false;
        },
        helpFeed_click: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $(this).addClass('disabled');

            var id      = $(this).attr('feed');
            var eParent = $(this).parent();
            var eText   = $('.body > p', '#feed_' + id);
            var cHelp   = feedStream.get(id);

            var addClearButton = function() {
                b$('Clear', 'id:clearbtn,class:medium white,feed:'+id)
                  .appendTo(eParent).click(Events.deleteFeed_click);
            };
            
            eParent.children().fadeOut(200);

            if (cHelp.action && isChecked(cHelp.action.enable)) {
                eText.html('<img style="vertical-align: middle;" src="'+
                global.resource.ajax_loader+'">'+'<span style="margin-left: 5px;">Loading...</span>');

                doHelp(cHelp.url, cHelp.action, function(data) {
                    cHelp.collected();
                    eText.hide().html(cleanData(data)).fadeIn(500, addClearButton);
                });
            }
            else {
                eText.hide().html('I can\'t do it.<br>But you can still help by '+
                '<a href="'+cHelp.feed.attachment.href+'" target="_black">open it in a new tab.</a>')
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

            facebook.queryFeed(function(fs) {
                feedStream = new CSStreamCollection(fs);
                if (feedStream.length() < 1) {
                    addErrorMessage();
                    return;
                }
                genFeedsDom();
                showDiv('feedlist', 'body');
                showDiv('control', 'panel', 500);
            }, options.feedsLimit);
        },
        cancel_click: function() {
            messageTimer.clear();
            cancel_process = true;
            options.save();
            Events.refresh_click();
            $('#logList, #logSkippedList').empty();
            return false;
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
            var selected = $('option:selected', this).val();
            if (selected === 'none') {
                $('li[id^=feed_]', '#feedlist_body').show();
                return;
            }
            $('li[id^=feed_]', '#feedlist_body').hide();
            Actions.each(function(name, obj) {
                if (obj.group === selected) {
                    $('li[name='+name+']', '#feedlist_body').show();
                }
            });
        },
        clearall: function() {
            $('#clearbtn', popupElt.content).each(function(index, element) {
                $(element).click();
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

        if (typeof(url) == 'string' && /https?/.test(url)) {
            return url;
        }
        return Util.doRgx(/['"](remote[^'"]*)/, obj.attr('onclick')).$1;
    }
    /**
     * @param {String} url
     * @return {String}
     */
    function toInternalUrl(params) {
        if (!Util.isSet(params)) {
            return '';
        }
        var a, b;
        var sOutUrl = 'remote/' + MW.getIntURL(params.next_controller, params.next_action);
        var unQuote = function(str) {
            return Util.doRgx(/"([^"]+)"/, str).$1 || str;
        };
        for (var uri in params) {
            if (!/next_|from|zy_track|value/.test(uri)) {
                 if (uri==='friend') {
                     sOutUrl += ('&' + uri + '=' + Util.parseNum(params[uri]));
                 } else {
                     sOutUrl += ('&' + uri + '=' + params[uri]);
                 }
            }
        }
        if ( String(params.next_params).charAt(0) === '{' ) {
	        Util.each(Util.parseParam(params.next_params), function(n, v) {
	            sOutUrl += ('&' + n + '=' + v);
	        });
        }
        if ( String(params.value).charAt(0) === '{' ) {
            Util.each(Util.parseParam(params.value), function(n, v) {
                sOutUrl += ('&' + n + '=' + v);
            });
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
        $('img, .sexy_button_new, .sexy_button, br, div:empty, .msg_energy_but_col', obj).remove();
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
     * @return {Number}
     */
    function getRefreshDelay() {
		var refreshDelay = parseInt(options.get('refreshDelay'));
        if ( refreshDelay < 2 ) {
            refreshDelay = 2;
        }
        return refreshDelay;
    }
    /**
     * Add default actions.
     */
    function addDefaultActions() {
        Actions.add('DailyTakeV3_collect_stake', { 
            name       : 'Daily Take Reward',
            group      : 'doDailyTake',
            next       : collectDailyTake,
            skipif     : /You have already collected/i
        });
        Actions.add('hitlist_feed_hit', {
            name       : 'Hitlist Bounty',
            group      : 'doHitlistBounty',
            repeat     : '.message_body a:regex(href,action=attack), a:regex(href,action=power_attack)',
            bad        : '.message_body:has(span.bad)',
            success    : '.fight_results, .fightres_stats'
        });
        Actions.add('war_view', {
            name       : 'Go to war',
            group      : 'doGotoWar',
            repeat     : 'a:regex(href,xw_controller=war&xw_action=attack)',
            popup      : '.post_help_results p, .pop_box > div > div > div:eq(1)',
            filter     : filterWar
        });
        Actions.add('war_share_reward_feed_click', {
            name       : 'Claim war reward',
            group      : 'doClaimBonusAndReward',
            popup      : '.pop_box > div > div > div:eq(1)'
        });
        Actions.add('robbing_mastery_bonus', {
            name       : 'Claim robbing mastery bonus',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=mastery_bonus)'
        });
        Actions.add('freegifts_acceptGiftEvent', {
            name       : 'Accept Gift Event',
            group      : 'doAcceptGiftEvent',
            success    : /padding:\s*10px\s*20px;\s*margin:\s*5px\s*0px[^>]*>([^<]+)</i,
            skipif     : /You have already claimed the maximum/i
        });
        Actions.add('index_ach_celeb', {
            name       : 'Get archivement reward',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=ach_celeb)'
        });
        Actions.add('story_claim_boss_bonus', {
            name       : 'Claim a boss bonus',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=claim_boss_bonus)'
        });
        Actions.add('index_crm_levelup_claim', {
            name       : 'Get free Loyalty Points',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=crm_levelup_claim)'
        });
        Actions.add('propertyV2_getBoost', {
            name       : 'Get a property boost',
            group      : 'doPropertyHelp',
            next       : '.message_body a:regex(href,xw_action=getBoost)'
        });
        Actions.add('index_send_energy_mbox', {
            name       : 'Send energy',
            group      : 'doSendEnergyAndPhones',
            next       : '.message_body a:regex(href,xw_action=send_energy_mbox)'
        });
        Actions.add('socialmission_joinMission', {
            name       : 'Join in a mission',
            group      : 'doSocialMissions',
            enable     : '#hfopt_dosocialmissions',
            next       : joinOperation
        });
        Actions.add('job_collect_loot', {
            name       : 'Collect a loot',
            group      : 'doPropertyHelp',
            skipif     : /have to wait/i
        });
        Actions.add('propertyV2_itemFeedHelp', {
            name       : 'Property item Help',
            group      : 'doPropertyHelp'
          //skipif     : /You\s*have\s*already\s*helped\s\w+/i
        });
        Actions.add('limitedTimeProperty_addPropertyPart', {
            name       : 'Send Limited Time Property Parts',     
            group      : 'doPropertyHelp',
            skipif     : /You have already sent \d+ parts today/i
        });
        Actions.add('limitedTimeProperty_upgradeBragFeed',{ 
            name       : 'Limited Time Property Upgraded',
            group      : 'doPropertyHelp',
            skipif     : /You already have all parts needed for this level/i
        });
        Actions.add('fight_iced_boost_claim', {
            name       : 'Get iced boost',
            group      : 'doClaimBonusAndReward',
            skipif     : /free iced fight boosts per day/i
        });
        Actions.add('index_levelUpBonusClaim', {
            name       : 'Get levelup Bonus',
            group      : 'doClaimBonusAndReward',
            skipif     : /You have already collected the maximum/i
        });
        Actions.add('lootladderevent_share_feed_click', {
            name       : 'Collect a Share Loot Event',
            group      : 'doClaimBonusAndReward',
            skipif     : /try again tomorrow/i
        });
        Actions.add('lootladderevent_ask_feed_click', {
            name       : 'Collect an Ask Loot Event',
            group      : 'doClaimBonusAndReward',
            skipif     : /try again tomorrow/i
        });
        Actions.add('lootladderevent_brag_feed_click', {
            name       : 'Collect a Golden Loot Event',
            group      : 'doClaimBonusAndReward',
            skipif     : /try again tomorrow/i
        });
        Actions.add('Epicclanboss_ask_feed_click',     { name: 'Collect Boss help item',       group: 'doClaimBonusAndReward' });        
        Actions.add('bossfightv2_ask_feed_click',      { name: 'Collect a Boss Fight item',    group: 'doClaimBonusAndReward' });
        Actions.add('quest_questFeedReward',           { name: 'Claim quest reward',           group: 'doClaimBonusAndReward' });
        Actions.add('socialmission_rewardBrag',        { name: 'Claim social mission reward',  group: 'doClaimBonusAndReward' });
        Actions.add('map_mapboss_reward_claim',        { name: 'Claim boss reward',            group: 'doClaimBonusAndReward' });
        Actions.add('index_levelup_boost_claim',       { name: 'Get levelup boost',            group: 'doClaimBonusAndReward' });
        Actions.add('job_give_help',                   { name: 'Give job help',                group: 'doGiveSocialHelp' });
        Actions.add('story_give_help_social',          { name: 'Give social help',             group: 'doGiveSocialHelp' });
        Actions.add('story_give_help_moscow_social',   { name: 'Give moscow help',             group: 'doGiveSocialHelp' });
        Actions.add('propertyV2_getCustomer',          { name: 'Get a customer',               group: 'doPropertyHelp' });
        Actions.add('propertyV2_cs_help_item',         { name: 'Send Property Parts',          group: 'doPropertyHelp'});
        Actions.add('propertyV2_cs_help_initial',      { name: 'Property Started',             group: 'doPropertyHelp' });
        Actions.add('propertyV2_cs_help_final',        { name: 'Property Upgraded',            group: 'doPropertyHelp' });
        Actions.add('propertyV2_cs_redeem_special_item_feed',{ name: 'Property special help',  group: 'doPropertyHelp' });
        Actions.add('propertyV2_collect_all_share',    { name: 'Get Free Property Parts',      group: 'doPropertyHelp' });
        Actions.add('index_send_energy',               { name: 'Send energy',                  group: 'doSendEnergyAndPhones' });
        Actions.add('index_power_pack_get',            { name: 'Send Power Pack',              group: 'doSendEnergyAndPhones' });
        Actions.add('robbing_call_for_help_get_phone', { name: 'Get robbing phone',            group: 'doSendEnergyAndPhones' });
        Actions.add('robbing_one_click_get',           { name: 'Get Rob Squad',                group: 'doSendEnergyAndPhones' });
        Actions.add('job_accept_city_crew',            { name: 'Join in a crew',               group: 'doCityCrew'});
        Actions.add('job_accept_city_crew_feed',       { name: 'Join in a crew',               group: 'doCityCrew'});
        Actions.add('secretStash_raid',                { name: 'Chance for new Secret Stash',  group: 'doSecretStash'});
        
    }
    /**
     * Collect a link.
     * @param {String} url
     * @param {CSAction} action
     * @param {Function} callback
     * @param {Boolean} isCompleted to use determine a completed help 
     */
    function doHelp(url, action, callback, isCompleted)
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

                if (Util.isFunc(action.next)) {
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
                    doHelp(getUrlFromElement(r), action, callback, true);
                    return;
                }
                if (action.popup && (r = Util.parsePopup(htmlText))) {
                    if ( /txt_past_war_results/.test(r) ) {
                        callback('You get past war result popup. So, this help has no response.');
                        return;
                    }
                    else if ((r2 = h$(r).find(action.popup)).length > 0) {
                        callback( r2.text(), (!Util.isSet(action.repeat) || isCompleted));
                        return;
                    }
                }
                if (action.success && action.success.exec && (r = action.success.exec(htmlText))) {
                    callback(r[1], true);
                    return;
                }
                if (action.success && (r = eQry.find(action.success)).length > 0) {
                    callback(r.html(), true);
                    return;
                }
                if (action.next && (r = eQry.find(action.next)).length > 0) {
                    doHelp(getUrlFromElement(r), {}, callback);
                    return;
                }

                if ((r = eQry.find('.message_body:first, #mbox_generic_1 tr:eq(1)')).length > 0) {
                    callback(r.html(), true);
                }
                else {
                    callback(ERROR_BAD_RESPONSE);
                }
            }
        });
    }
    /**
     * Add an error message.
     */
    function addErrorMessage() {
        showDiv('feedlist', 'body');
        $('#status_panel').empty().append(
            c$('div').css({'text-align':'center', 'padding-top':5})
            .append(c$('span').text('There is some error in facebook response.'))
            .append(b$('Retry','class:short white').css('margin-left',5).click(Events.refresh_click))
            .append(b$('Cancel','class:short white').css('margin-left',5).click(Events.skip_click))
        );
    }
    /**
     * Check a filter, return false if filter match the text or it's disabled.
     * @param {String} sText text to check.
     * @param {String} sUse use option name to enable/disable this filter
     * @param {String} sFilter filter option name to get the filter.
     * @return {Boolean}
     */
    function checkFilter(sText, sUse, sFilter) {
        sFilter = String( options.get(sFilter) );
        if ( options.get(sUse) && sFilter.length > 1 ) {
            return !( new RegExp(sFilter.replace(/\s*,\s*/g,'|'),'i') ).test(sText);
        }
        return false;
    }
    /**
     * Filter a war, return true if filtered
     * @param {String} htmlText
     * @return {Boolean}
     */
    function filterWar(htmlText) {
        var num, bFiltered = false;
        try {
            var text = h$(htmlText).find('.helpers_rewards ul img').attr('title');
            
            if ( checkFilter(text, 'warUseNameFilter', 'warNameFilter') ) {
                return 'War Filtered. ( '+text+' )';
            }
            
            if ( options.get('warUseMinAttack') ) {
                num = Util.doRgx(/Attack:\s?(\d+)/i,text).$1;
                if ( Util.isSet(num) && !isNaN(num = parseInt(num)) ) {
                    if (num >= options.get('warMinAttack')) {
                        return false;
                    } else {
                        bFiltered = true;
                    }
                }
            }
            if ( options.get('warUseMinDefense') ) {
                num = Util.doRgx(/Defense:\s?(\d+)/i,text).$1;
                if ( Util.isSet(num) && !isNaN(num = parseInt(num)) ) {
                    if (num >= options.get('warMinDefense')) {
                        return false;
                    } else {
                        bFiltered = true;
                    }
                }
            }
            return ( bFiltered===true ? 'Filtered. ( '+text+' )' : false );
        }
        catch(err) {
            Logger.error(err);
        }
        return false;
    }
    
    /**
     * Collect a Daily Take.
     * @param {String} htmlText
     * @param {Function} callback
     */
    function collectDailyTake(htmlText, callback) {
        var popup = Util.parsePopup(htmlText);
        var url_regex = /do_ajax\('popup_fodder','(remote\/html_server.php[^']+)/;
        var rewardItems = new Object();
        var priority = String(options.get('dtLootPriority')).split(/\n/);
        var matchedADItem, rewardNames = new Array();
        /**
         * Parse collect popup and return the text. 
         * @param {String} htmlText
         */
        function collectAndReturn(url) {
            httpAjaxRequest({
                'url': url, 
                'success': function(htmlText) {
                    var response = h$(htmlText).find('#collectText');
                    if (response.length > 0) {
                        callback( response.text(), true );
                    } else {
                        callback( 'An user has received the reward before you.');
                    }
                }
            });
        }
        
        $('#dt_body_area .collectbox .dt_pop_item',popup).each(function(i, elem) {
            var url;
            var pic      = $('div:first img', elem);
            var name     = pic.attr('title');
            var button   = e$('.collectbutton a', elem);
            var attack   = e$('.attack', elem);
            var defense  = e$('.defense', elem);
            
            if (button !== null && (url = Util.doRgx(url_regex, button.attr('onclick')).$1)) {
            
                if (attack && defense) {
                    rewardNames.push(name+' (A:'+attack.text()+', D:'+defense.text()+')');
                } else {
                    rewardNames.push(name);
                }
                if (attack && defense && options.get('dtCheckMinAtkDef')) {
                    attack  = parseInt( attack.text()  );
                    defense = parseInt( defense.text() );
                    if (attack > options.get('dtMinAttack') || defense > options.get('dtMinDefense')) {
                        matchedADItem = url;
                    }
                    
                }
                rewardItems[ $.trim(name).toLowerCase() ] = url;
                 
            }
        });
        
        if (rewardNames.length < 1) {
            if ((popup = h$(htmlText).find('.message_body')).length > 0) {
               callback(popup.text());
            } else {
               callback('This "Daily Take" was taken.'); 
            }
            return;
        }
        
        Logger.debug('Daily Take:\n' + rewardNames.join(', '));
        
        if (priority.length > 0) {
            var name;
            for (var i = 0; i < priority.length; i++) {
                name = $.trim(priority[i]).toLowerCase();
                if ( Util.isSet(rewardItems[name]) ) {
                    collectAndReturn(rewardItems[name]);
                    return;  
                }
                
            }
        }
        
        if (matchedADItem) {
            collectAndReturn( matchedADItem );
        } else {
            callback( 'Filtered. ('+ rewardNames.join(', ')+')' );
        }
    }
    
    /**
     * Try join in an operation
     * @param {String} htmlText
     * @param {Function} callback
     */
    function joinOperation(htmlText, callback)
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
            var nSpend1 = parseInt($('#hfopt_joinmission').val());
            var nSpend2 = parseInt($('#hfopt_joinmissionafter').val());
            var sQuery  = 'a:regex(onclick,action=selectPosition)';
            var nSlots  = $(sQuery, qHtml).length;
            var cSlots  = new Array();
            
            if ( checkFilter(sName, 'opUseNameFilter', 'opNameFilter') ) {
                callback('Filtered name "'+sName+'".');
                return;
            }
            if (nSlots > nFree) {
                callback('Filtered "'+ sName + '". Too many slots free ('+nSlots+').');
                return;
            }
            if (!options.get('diff_' + sDiff.toLowerCase())) {
                callback('Filtered "'+ sName + '". Difficulty don\'t match.');
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
                    Logger.debug('Adding SpendType: '+ nSpendType);
                    cSlots[nSpendType] = $(sQuery, elem);
                }
            });

            var button = (cSlots[nSpend1] || cSlots[nSpend2]);

            if (typeof(button) == 'undefined' || button.length < 1) {
                callback('Filtered "'+ sName + '". Spend type don\'t match.');
                return;
            }
        }
        catch(err) {
            Logger.error(err);
            callback(ERROR_BAD_RESPONSE);
            return;
        }

        httpAjaxRequest({
            url: getUrlFromElement(button),
            success: function(htmlText)
            {
                if (MW.update(htmlText))
                    callback('You has join in "' + sName + '" mission.', true);
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
    /**
     * Add new log
     * @param {CSStream} stream
     * @param {String} responseText
     */
    function addHelpLog(stream, responseText) {
        var eList = $('#logList');
        var title = stream.action.name;
        var feed = stream.feed;

        if (eList.children().length > options.get('maxLogLength')) {
            eList.children().last().remove();
        }
        var atch = feed.attachment;
        var eTitle = c$('a','target:_black').attr('href',feed.permalink).text(atch.name||atch.description);
        var eImg = atch.media[0]
        ? c$('img','class:feed_icon,title:'+title).attr('src',atch.media[0].src)
        : c$('span');

        c$('li').prependTo(eList).append(
            c$('div').addClass('li_wrapper clearfix')
            .append(eImg).append(c$('div','class:body')
                .append(c$('h4').append(eTitle))
                .append(c$('p').html(responseText))
            )
        );
    }
    function addSkippedLog(stream, message) {
        var eList = $('#logSkippedList');
        var streamName = Util.setAnchor(stream.feed.permalink, stream.action.name);
         
        if (eList.children().length > options.get('maxLogLength')) {
            eList.children().last().remove();
        }
        c$('li').prependTo(eList)
        .append(c$('img').attr('src', global.resource.info_icon))
        .append(c$('p').html(streamName+' skipped: '+message));
    }
    /**
     * Send a message when auto collecting
     * @param {String} text
     */
    function sendMessage(text) {
        $('#auto_feed_helper_messages').html(
            '<img style="vertical-align: middle;" src="'+global.resource.ajax_loader+'">'+
            '<span style="margin-left: 5px;">"' + text + '"</span>'
        );
    }

    function StartCollector() {
        var nDelay         = options.get('helpDelay');
        var nRefreshDelay  = getRefreshDelay();
        var skippedHelps   = new Array();
        var nCompleted     = 0;
        var nSkipped       = 0;

        function toNextStream(message, delay) {
            if (cancel_process) {
                return;
            }
            $('#completed_helps').text(nCompleted);
            $('#skipped_helps').text(nSkipped);
            $('#total_feeds', '#feed_center_header').html(feedStream.length());
            // no more streams
            if (feedStream.length() < 1) {
                messageTimer.start('All helps finished!. continue in %N% seconds.',nRefreshDelay, updateStreams);
                return;
            }
            // if no delay, skip timer
            if (!delay) {
                collectStream(feedStream.shift());
            } else {
                messageTimer.start(''+message, delay, function() {
                    collectStream(feedStream.shift());
                });
            }
        }
        /**
         * @param {CSStream} cStream
         */
        function collectStream(cStream) {
            if (cancel_process) {
                return;
            }
            /**
             * Skip current stream
             * @param {String} sReason
             */
            function skipHelp(sReason) {
                Logger.debug(cStream.action.name+' skipped.');
                if (Util.isSet(sReason)) {
                    addSkippedLog(cStream, sReason);  
                }
                nSkipped++;
                toNextStream();
            }
            
            // skip if stream or action is undefined
            if ( !Util.isSet(cStream) || !Util.isSet(cStream.action) ) {
                toNextStream();
                return;
            }
            try {
                if ( cStream.isCollected() ) {
                    skipHelp();
                    return;
                }
                // filter by user
                if (options.useUserFilter === true) {
                    if (Util.isSet(options.userFilter[cStream.user_id])===(options.userFilterAction==='skip')) {
                        skipHelp('This user is skipped by the filter.');
	                    return;
                    }
                }
	            // skip if stream group isn't enabled.
	            if (!options.get(cStream.gid)) {
                    skipHelp();
                    return;
                }
	            // skip if stream isn't enabled.
	            if (Util.isSet(options.get(cStream.gid.substr(2)))) {
	                if (options.get(cStream.gid.substr(2))[cStream.id] === false) {
                        skipHelp();
	                    return;
	                }
	            }
	            // skip if this stream can't be collected today
	            if (skippedHelps[cStream.id]) {
                    skipHelp('Cant collect more of this stream today.');
	                return;
	            }
                // collect the stream
                sendMessage('Helping in:  '+cStream.action.name);

                doHelp(cStream.url, cStream.action, function(data, success) {
                    cStream.collected();
                    if (success === true) {
                        addHelpLog(cStream, cleanData(data));
                    } else {
                        addSkippedLog(cStream, cleanData(data)); 
                    }
                    if (cStream.action.skipif && cStream.action.skipif.test(data)) {
                        skippedHelps[cStream.id] = true;
                        toNextStream('Done! but you can\'t accept more, Next in %N%...',nDelay);
                    }
                    else {
                        nCompleted++;
                        toNextStream('Done!, Next in %N%...',nDelay);
                    }
                });

            }
            catch (err) {
                Logger.error('collectStream: ' + err.message);
                toNextStream();
            }
        }

        function updateStreams() {
            if (cancel_process) {
                return;
            }
            function retry(msg) {
                messageTimer.start(msg,nRefreshDelay,updateStreams);
            }
            sendMessage('Refreshing home posts...');

            facebook.queryFeed(function(fs) {
                if (fs.error) {
                    retry(fs.error.message+' try again in %N%...');
                    return;
                }
                if (!Util.isSet(fs) || fs.length < 1) {
                    retry('Error loading posts, try again in %N%...');
                    return;
                }
                // if empty, update again
                if ((feedStream = new CSStreamCollection(fs, true)).length() < 1) {
                    retry('No new posts, try again in %N%...');
                    return;
                }
                // update stream amout
                $('#total_feeds', '#feed_center_header').html(feedStream.length());

                // start collecting first stream
                collectStream(feedStream.shift());
                
            }, options.feedsLimit);
        }

        //=========
        // Generate code for auto help messages
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

        b$('CANCEL').addClass('short red').click(Events.cancel_click)
        .appendTo('#status_panel').css({
            'float': 'right',
            'margin-right': 40
        });
        //=========

        // toggle layers
        showDiv('automode', 'body');
        showDiv('status', 'panel', 500);

        // update options
        options.fromDomElements();
        options.save(function() {
            // rest the cancel variable
            cancel_process = false;
            // start
            if ( feedStream.length() > 0 ) {
                feedStream.slice( options.feedsLimit );
                collectStream(feedStream.shift());
            } else {
                updateStreams();
            }
        });
    }

    function genMainDom() {

        // fix content height
        popupElt.content.css('margin-top', 5);

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

        c$('div', 'class:search_box')
        .append(c$('label', 'for:hfopt_filter').text('Search: '))
        .append(c$('input:text', 'id:hfopt_filter, class:black_box').width(149).keyup(Events.keyup))
        .append(c$('select', 'id:hfopt_grouping, class:black_box').width(152).change(Events.change))
        .appendTo(controlDiv);

        c$('div', 'class:control_box')
        .append(b$('Clear all', 'class:short white').click(Events.clearall))
        .append(b$('Refresh','class:short orange').css('margin-left',5).click(Events.refresh_click))
        .append(b$('Config','class:short orange').css('margin-left',5).click(Events.config_click))
        .append(b$('AutoHelp','class:short orange').css('margin-left',10).click(StartCollector))
        .appendTo(controlDiv);


        // ADD CONFIGURATION

        // add options checkboxes and group list
        var eConfigSelector = c$('div', 'class:select_tab').appendTo(configDiv).width(250);
        var eGroup = $('#hfopt_grouping');

        Util.each(groupNames, function(id, name) {
            var elem = c$('div').appendTo(eConfigSelector);
            
            // add the group to the filter            
            eGroup.append(c$('option', 'value:'+id).text(name));
            
            // add the group to configuration
            if (id !== 'none') {
                elem.append(x$('hfopt_'+id.toLowerCase()));
            }
            elem.append(c$('p', 'name:'+id).text(name).click(Events.config_change));

        });
        
        configDiv        
        .append( c$('div', 'class:config_tab,id:none_config')                  .append(genGeneralConfig()) )
        .append( c$('div', 'class:config_tab,id:doGotoWar_config')             .append(genWarFilter()) )
        .append( c$('div', 'class:config_tab,id:doGiveSocialHelp_config')      .append(genMultiCheckboxConfig('GiveSocialHelp')) )
        .append( c$('div', 'class:config_tab,id:doSocialMissions_config')      .append(genMissionConfig()) )
        .append( c$('div', 'class:config_tab,id:doClaimBonusAndReward_config') .append(genMultiCheckboxConfig('ClaimBonusAndReward')) )
        .append( c$('div', 'class:config_tab,id:doPropertyHelp_config')        .append(genMultiCheckboxConfig('PropertyHelp')) )
        .append( c$('div', 'class:config_tab,id:doAcceptGiftEvent_config')     .append(genEmptyConfig()) )
        .append( c$('div', 'class:config_tab,id:doCityCrew_config')            .append(genEmptyConfig()) )
        .append( c$('div', 'class:config_tab,id:doDailyTake_config')           .append(genDailyTakeFilter()) )
        .append( c$('div', 'class:config_tab,id:doSecretStash_config')         .append(genEmptyConfig()) )
        .append( c$('div', 'class:config_tab,id:doHitlistBounty_config')       .append(genEmptyConfig()) )
        .append( c$('div', 'class:config_tab,id:doSendEnergyAndPhones_config') .append(genEmptyConfig()) )
        .append( c$('div', 'class:save_config').append(b$('Save Configuration','class:short orange').click(Events.save_click)) );

        // ADD BODY ELEMENTS
        c$('div', 'feedlist_body').height(700).appendTo(popupElt.content);

        c$('div', 'ajaxloader_body').css('padding-top',25).height(675)
        .append(c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif'))
        .appendTo(popupElt.content);

        c$('div', 'automode_body').height(700)
        .append(c$('ul', 'id:logList,class:feed_box').height(400))
        .append(c$('ul', 'id:logSkippedList,class:skipped_log').css('border-top','2px solid #333').height(300))
        .appendTo(popupElt.content);


        // =====================

        function genEmptyConfig() {
            var elem = c$('center').css('margin-top', 10)
            .html('This category don\'t have any configuration.');
            return elem;
        }
        function genMultiCheckboxConfig(id) {
            var elem = c$('div');
            var sGroup = String(id).toLowerCase();
            var opts = options.get(id);
            var table;

            c$('div').css({'float':'left','margin-right':5}).appendTo(elem)
            .append(c$('img').attr('src', global.resource.menu_arrow));
            
            table = c$('div', 'class:select_tab,name:checkboxlist,id:hfopt_'+sGroup);
            table.height(160).width(300).appendTo(elem);

            Actions.each(function(name, action) {
                if ( action.group !== 'do'+id ) return;
                if ( !Util.isSet(opts[name]) ) opts[name] = true;
                c$('div').appendTo(table).append(x$(name, action.name).attr('value',name));
            });
            return elem;
        }
        function genGeneralConfig() {
            return c$('div')
            .append(n$('hfopt_feedslimit', 'Feeds Limit', 100))
            .append(s$('hfopt_maxloglength', 'Log Length:', 100))
            .append(c$('div').css({'clear':'both','margin-top':5}))
            .append(s$('hfopt_helpdelay', 'Help delay:', 100))
            .append(s$('hfopt_refreshdelay', 'Refresh delay:',100))
            .append(c$('div').css({'clear':'both','margin-top':5}))
            .append( genUserFilter() );
        }
        function genUserFilter() {
            return c$('div')
            .append(x$('hfopt_useuserfilter', 'Use friends filter '))
            .append(s$('hfopt_userfilteraction', 100))
            .append(c$('span').text('the following users:'))
            .append(c$('div').css({'clear':'both','margin-top':5}))
            .append(c$('select', 'multiple:multiple,id:hfopt_userfilter')
                .css({'float':'left', 'width':340, 'height':100, 'margin-right':5}))
            .append(c$('div').css('float','left')
            .append(b$('Edit','class:green short').css('min-width',60).click(Events.addUserToFilter_click)));
        }
        function genWarFilter() {
            return c$('div')
            .append(x$('hfopt_waruseminattack', 'War Reward Minimal Attack:'))
            .append(n$('hfopt_warminattack', 60))
            .append(c$('div').css('clear','both'))
            .append(x$('hfopt_warusemindefense', 'War Reward Minimal Defense:'))
            .append(n$('hfopt_warmindefense', 60))
            .append(c$('div').css('clear','both'))
            .append(x$('hfopt_warusenamefilter', 'War Reward Name filter (Comma-separated):', 'div'))
            .append(c$('textarea', 'class:black_box,cols:50,rows:4,id:hfopt_warnamefilter'));
        }
        function genDailyTakeFilter() {
            return c$('div')
            .append(c$('div').text('1st CHECK -> Loot Priority/Filter'))
            .append(c$('textarea', 'class:black_box,cols:50,rows:6,id:hfopt_dtlootpriority'))
            .append(c$('div').css('clear','both').css('margin-top',5))
            .append(x$('hfopt_dtcheckminatkdef', '2nd Check -> Minimal Attack/Defense', 'div'))
            .append(n$('hfopt_dtminattack', 'Minimal Attack:', 60))
            .append(n$('hfopt_dtmindefense', '-OR- Minimal Defense:', 60));
        }
        function genMissionConfig() {
            var elem = c$('div');
            c$('div').css('margin',5)
            .append(c$('span').text('Mission difficulty: '))
            .append(c$('input:checkbox', 'id:hfopt_diff_easy'))
            .append(c$('label', 'for:hfopt_diff_easy').text('Easy'))
            .append(c$('input:checkbox', 'id:hfopt_diff_medium'))
            .append(c$('label', 'for:hfopt_diff_medium').text('Medium'))
            .append(c$('input:checkbox', 'id:hfopt_diff_hard'))
            .append(c$('label', 'for:hfopt_diff_hard').text('Hard'))
            .append(c$('input:checkbox', 'id:hfopt_diff_event'))
            .append(c$('label', 'for:hfopt_diff_event').text('Event'))
            .appendTo(elem);

            c$('div').css('margin',5)
            .append(c$('label', 'for:hfopt_joinmission').text('Join only in: '))
            .append(c$('select', 'id:hfopt_joinmission, class:black_box').width(90))
            .append(c$('label', 'for:hfopt_joinmissionafter').text(' if not possible then: '))
            .append(c$('select', 'id:hfopt_joinmissionafter, class:black_box').width(90))
            .appendTo(elem);

            c$('div').css('margin',5)
            .append(c$('label', 'for:hfopt_maxfreeslots').text('And only if remain: '))
            .append(c$('select', 'id:hfopt_maxfreeslots, class:black_box').width(110))
            .appendTo(elem);

            c$('div').css('margin',5)
            .append(x$('hfopt_opusenamefilter', 'Active Operation Name Filter:'))
            .append(c$('br'))
            .append(c$('textarea', 'class:black_box,cols:45,rows:3,id:hfopt_opnamefilter'))
            .appendTo(elem);

            return elem;
        }

        // fix class
        $('input:text, select', configDiv).addClass('black_box');

        popupElt.applyOptions({
            'hfopt_userfilteraction'  : {'skip':'Skipping', 'help':'Helping'},
            'hfopt_maxloglength'      : {50:'50', 200:'200', 500:'500', 1000:'1000'},
            'hfopt_joinmission'       : {4:'Any', 1:'Energy', 2:'Stamina', 3:'Both'},
            'hfopt_joinmissionafter'  : {0:'None', 1:'Energy', 2:'Stamina', 3:'Both', 4:'Any'},
            'hfopt_maxfreeslots'      : {100:'Any slots', 1:'1 slot', 2:'2 slots', 3:'3 slots', 4:'4 slots'},
            'hfopt_helpdelay'         : {0:'None', 1:'1 sec', 2:'2 sec', 3:'3 sec', 5:'5 sec'},
            'hfopt_refreshdelay'      : {2:'2 sec', 5:'5 sec', 15:'15 sec', 30:'30 sec', 60:'1 min', 180:'3 min', 300:'5 min', 600:'10 min'}
        });
    }

    function genFeedsDom() {
        var liElt, ulElt = c$('ul', 'class:feed_box').height(700);
        // ADD FEED
        feedStream.each(function(index, obj) {
            var feed  = obj.feed;
            var sId   = obj.id;
            var atch  = feed.attachment;
            var attr  = (obj.isNew?'class:new_post, ':'')+'name:'+sId+', ';
            var name  = '<a href="'+feed.permalink+'" target="_black">';
            var desp  = atch.description ? atch.description : atch.caption;
            var eImg  = atch.media[0]
            ? c$('img', 'class:feed_icon').attr('src', atch.media[0].src)
            : c$('span');

            name += (atch.name||atch.caption||atch.description) + '</a>';

            c$('li', attr+'id:feed_'+index).appendTo(ulElt).append(
                c$('div').addClass('li_wrapper clearfix')
                .append(eImg).append(c$('div','class:buttons')
                    .append(b$('Help', 'class:medium white,feed:'+index).click(Events.helpFeed_click))
                    .append(c$('a', 'href:#,class:ignore,feed:'+index).text('ignore').click(Events.deleteFeed_click)))
                .append(c$('div','class:body').append('<h4>'+name+'</h4><p>'+desp+'</p>'))
            );
        });
        options.save();

        $('#feedlist_body').empty().append(ulElt);
        $('#total_feeds', '#feed_center_header').html(feedStream.length());

        if ($('#hfopt_grouping').val() !== 'none') {
            $('#hfopt_grouping').change();
        }
    }
    
    function loadError() {
        var new_limit = Math.max(parseInt(options.feedsLimit/2), 25);
        if (options.feedsLimit > 25) {
            showHelpPopup({
                icon: 'error',
                title: 'No home posts found',
                message: 'There was an error while loading your home posts<br>'
                +        'would you like to set feed limit to '+new_limit+' to try again?.',
                buttons: [{
                    label: 'Yes',
                    addClass: 'short white',
                    onclick: function() {
                        options.feedsLimit = new_limit;
                        options.save(Initialize);
                    }
                }, {
                    label: 'No'
                }]
            });
        } else {
            showHelpPopup({
                icon: 'error',
                title: 'No home posts found',
                message: 'There was an error while loading your home posts<br>'
                +        'And your feed limit is very low, try again later.'
            });
        }
    }
    
    
    function Initialize() {
        var overlay = loadingScreen('Loading home posts...');

        facebook.queryFeed(function(fs) {
            overlay.hide();
            if (!Util.isSet(fs) || fs.error || fs.length < 1) {
                loadError();
                return;
            }
	        // add all pre-configured actions
	        addDefaultActions();
            feedStream = new CSStreamCollection(fs);
            Logger.debug('HFC - Streams.length > '+ feedStream.length());

            genMainDom();
            options.toDomElements();
            genFeedsDom();

            showDiv('feedlist', 'body');
            showDiv('control', 'panel');
            showDiv('none', 'config');

            // show popup
            popupElt.show();

        }, options.feedsLimit);
    }

    popupElt.addBase64Style(
		'I2hvbWVmZWVkY2VudGVyX3BvcHVwIC5ibGFja19ib3ggew0KCWZvbnQtd2VpZ2h0OiBib2xkOyANCgljb2xvcjogcmdiKDIwOCwg'+
		'MjA4LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJs'+
		'YWNrOyANCglmb250LXNpemU6IDE0cHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVlZF9ib3ggew0KCWhlaWdodDog'+
		'NDAwcHg7DQoJbGlzdC1zdHlsZS10eXBlOiBub25lOw0KCW92ZXJmbG93OiBhdXRvOw0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVw'+
		'IHVsLnNraXBwZWRfbG9nIHsNCgloZWlnaHQ6IDE1MHB4Ow0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCglvdmVyZmxvdzogYXV0'+
		'bzsNCglwYWRkaW5nOiAzcHg7DQoJZm9udC1zaXplOiAxMnB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLnNraXBwZWRf'+
		'bG9nIGxpIHsNCglib3JkZXI6IDJweCBzb2xpZCAjMUYxRjFGOw0KCW1hcmdpbjogMHB4IDBweCA0cHg7DQoJaGVpZ2h0OiAyNXB4'+
		'Ow0KCW1heC1oZWlnaHQ6IDI1cHg7DQoJcGFkZGluZzogNnB4IDBweCAwcHggMnB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVw'+
		'IHVsLnNraXBwZWRfbG9nIGxpIGltZyB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lkdGg6IDIwcHg7DQoJaGVpZ2h0OiAyMHB4Ow0KfQ0K'+
		'I2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLnNraXBwZWRfbG9nIGxpIHAgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbjogMXB4IDBw'+
		'eCAwcHggM3B4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNmZWVkbGlzdF9ib2R5IHVsLmZlZWRfYm94IGxpOmZpcnN0LWNo'+
		'aWxkIHsNCglib3JkZXItd2lkdGg6IDBweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAjZmVlZGxpc3RfYm9keSB1bC5mZWVk'+
		'X2JveCBsaSB7DQoJYm9yZGVyLXRvcDogMnB4IHNvbGlkICMxRjFGMUY7DQoJbWFyZ2luOiAwcHggMHB4IDZweDsNCgloZWlnaHQ6'+
		'IDgwcHg7DQoJbWF4LWhlaWdodDogMTAwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI2F1dG9tb2RlX2JvZHkgdWwuZmVl'+
		'ZF9ib3ggbGkgew0KCWJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMUYxRjFGOw0KCW1hcmdpbjogMHB4IDBweCA2cHg7DQoJaGVp'+
		'Z2h0OiA4MHB4Ow0KCW1heC1oZWlnaHQ6IDEwMHB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRfYm94IGxpLm5l'+
		'd19wb3N0IHsNCgliYWNrZ3JvdW5kOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL3ptYy9u'+
		'ZXdfbWVzc2FnZV9jYWxsb3V0XzQ1eDQ1XzAxLnBuZykgbm8tcmVwZWF0IDBweCAwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9w'+
		'dXAgdWwuZmVlZF9ib3ggZGl2LmxpX3dyYXBwZXIgew0KCWJvcmRlci10b3A6IDsNCglwYWRkaW5nOiA2cHggMTRweCAwcHggNHB4'+
		'Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRfYm94IGxpIGltZy5mZWVkX2ljb24gew0KCWZsb2F0OiBsZWZ0Ow0K'+
		'CWRpc3BsYXk6IGJsb2NrOw0KCXdpZHRoOiA3MHB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRfYm94IGxpLm5l'+
		'd19wb3N0IGltZy5mZWVkX2ljb24gew0KCW1hcmdpbjogMTVweCAwIDAgMTVweDsNCgl3aWR0aDogNTVweDsNCn0NCiNob21lZmVl'+
		'ZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBkaXYuYnV0dG9ucyB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWZvbnQtc2l6ZTogMTBw'+
		'eDsNCglmb250LXdlaWdodDogYm9sZDsNCgltYXJnaW46IDNweCAwcHggMHB4IDE0cHg7DQoJdGV4dC1hbGlnbjogcmlnaHQ7DQoJ'+
		'd2lkdGg6IDcwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVlZF9ib3ggbGkgZGl2LmJvZHkgew0KCW1hcmdpbjog'+
		'MHB4IDgwcHg7DQoJaGVpZ2h0OiA3MHB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNhdXRvbW9kZV9ib2R5IHVsLmZlZWRf'+
		'Ym94IGxpIGRpdi5ib2R5IHsNCgltYXJnaW4tbGVmdDogODBweDsNCgloZWlnaHQ6IDcwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJf'+
		'cG9wdXAgdWwuZmVlZF9ib3ggbGkgaDQgew0KCWZvbnQtc2l6ZTogMTRweDsNCglsaW5lLWhlaWdodDogMThweDsNCgltYXJnaW4t'+
		'Ym90dG9tOiA0cHg7DQoJcGFkZGluZy10b3A6IDJweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBw'+
		'IHsNCglmb250LXNpemU6IDEycHg7DQoJbGluZS1oZWlnaHQ6IDE1cHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVl'+
		'ZF9ib3ggbGkgZGl2LmJ1dHRvbnMgYS5zZXh5X2J1dHRvbl9uZXcgew0KCW1hcmdpbi1ib3R0b206IDZweDsNCn0NCiNob21lZmVl'+
		'ZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBkaXYuYnV0dG9ucyBhLmlnbm9yZSB7DQoJdGV4dC10cmFuc2Zvcm06IHVwcGVy'+
		'Y2FzZTsNCn0NCiNmZWVkX2NlbnRlcl9oZWFkZXIgcCwgI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLCAjaG9tZWZlZWRjZW50ZXJf'+
		'cG9wdXAgbGksICNob21lZmVlZGNlbnRlcl9wb3B1cCBkbCwgI2hvbWVmZWVkY2VudGVyX3BvcHVwIGR0LCAjaG9tZWZlZWRjZW50'+
		'ZXJfcG9wdXAgZGQsICNob21lZmVlZGNlbnRlcl9wb3B1cCBoMiwgI2hvbWVmZWVkY2VudGVyX3BvcHVwIGgzLCAjaG9tZWZlZWRj'+
		'ZW50ZXJfcG9wdXAgaDQsICNob21lZmVlZGNlbnRlcl9wb3B1cCBwIHsNCgltYXJnaW46IDBweDsNCglwYWRkaW5nOiAwcHg7DQp9'+
		'DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgICNjb25maWdfcGFuZWwgew0KCW1hcmdpbjogNXB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVy'+
		'X3BvcHVwICAuc2VsZWN0X3RhYiB7DQoJYm9yZGVyOiAxcHggc29saWQgIzRGNEY0RjsNCglmbG9hdDogbGVmdDsNCgloZWlnaHQ6'+
		'IDE2MHB4Ow0KCW1hcmdpbjogMnB4Ow0KCW92ZXJmbG93OiBhdXRvOw0KCXBhZGRpbmc6IDVweDsNCgl0ZXh0LWFsaWduOiBsZWZ0'+
		'Ow0KCXdpZHRoOiAyNDBweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAgLnNlbGVjdF90YWIgZGl2IHsNCglib3JkZXI6IDFw'+
		'eCBzb2xpZCAjMkYyRjJGOw0KCW1heC13aWR0aDogMjgwcHg7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCglwYWRkaW5nOiAycHg7CQ0K'+
		'fQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICAuc2VsZWN0X3RhYiBkaXYuc2VsZWN0ZWQgew0KCWJvcmRlcjogMXB4IHNvbGlkIHll'+
		'bGxvdzsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAgLnNlbGVjdF90YWIgZGl2IGlucHV0IHsNCglmbG9hdDogbGVmdDsNCn0N'+
		'CiNob21lZmVlZGNlbnRlcl9wb3B1cCAgLnNlbGVjdF90YWIgZGl2IHAgew0KCWZsb2F0OiBsZWZ0Ow0KCWN1cnNvcjogcG9pbnRl'+
		'cjsNCgl3aWR0aDogMTk1cHg7DQoJbWF4LXdpZHRoOiAxOTVweDsNCglvdmVyZmxvdzogaGlkZGVuOw0KfQ0KI2hvbWVmZWVkY2Vu'+
		'dGVyX3BvcHVwICAuY29uZmlnX3RhYiB7DQoJZmxvYXQ6IGxlZnQ7DQoJaGVpZ2h0OiAxNTBweDsNCglwYWRkaW5nOiAwcHggMTBw'+
		'eDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCXdpZHRoOiA0MjBweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAgLnNhdmVfY29u'+
		'ZmlnIHsNCgljbGVhcjogYm90aDsNCglwYWRkaW5nLXRvcDogMTZweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAjZmVlZGxp'+
		'c3RfYm9keSwgI2F1dG9tb2RlX2JvZHkgIHsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNw'+
		'YW5lbF9jb250YWluZXIgew0KCWJhY2tncm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhp'+
		'Y3Mvem1jL3RhYnNfYmdfMXg0NV8wMS5naWYpIHJlcGVhdC14IDBweCAxMDAlOw0KCWhlaWdodDogMzVweDsNCglsaXN0LXN0eWxl'+
		'LXR5cGU6IG5vbmU7DQoJb3ZlcmZsb3c6IHZpc2libGU7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI3BhbmVsX2NvbnRhaW5l'+
		'ciAuc2VhcmNoX2JveCB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luOiAwcHggNXB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJd2lk'+
		'dGg6IDM3MHB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNwYW5lbF9jb250YWluZXIgLmNvbnRyb2xfYm94IHsNCglmbG9h'+
		'dDogcmlnaHQ7DQoJbWFyZ2luOiAwcHggNXB4Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgl3aWR0aDogMzQwcHg7DQp9DQojZmVl'+
		'ZF9jZW50ZXJfaGVhZGVyIHsNCglmbG9hdDogcmlnaHQ7DQoJaGVpZ2h0OiA2NHB4Ow0KCW1hcmdpbi1yaWdodDogNTBweDsNCglt'+
		'YXJnaW4tdG9wOiA2cHg7DQp9DQojZmVlZF9jZW50ZXJfaGVhZGVyIGRsLnRvdGFsX3JlcXVlc3RzIHsNCglmbG9hdDogbGVmdDsN'+
		'Cglmb250LXdlaWdodDogYm9sZDsNCgltYXJnaW46IDE0cHggMHB4IDBweDsNCn0NCiNmZWVkX2NlbnRlcl9oZWFkZXIgZGwudG90'+
		'YWxfcmVxdWVzdHMgZHQgew0KCWJhY2tncm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhp'+
		'Y3Mvem1jL3RvdGFsX3JlcXVlc3RzX2J1YmJsZV8zOHgzOF8wMS5wbmcpIG5vLXJlcGVhdCAwcHggMHB4Ow0KCWZsb2F0OiBsZWZ0'+
		'Ow0KCWZvbnQtc2l6ZTogMThweDsNCgloZWlnaHQ6IDM4cHg7DQoJbGluZS1oZWlnaHQ6IDM4cHg7DQoJbWFyZ2luLXJpZ2h0OiA2'+
		'cHg7DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KCXdpZHRoOiAzOHB4Ow0KfQ0KI2ZlZWRfY2VudGVyX2hlYWRlciBkbC50b3RhbF9y'+
		'ZXF1ZXN0cyBkZCB7DQoJYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy96'+
		'bWMvdG90YWxfcmVxdWVzdHNfYmdfMjAweDI0XzAxLnBuZykgbm8tcmVwZWF0IDEwMCUgNTAlOw0KCWZvbnQtc2l6ZTogMTJweDsN'+
		'CgloZWlnaHQ6IDM4cHg7DQoJbGluZS1oZWlnaHQ6IDM4cHg7DQoJbWFyZ2luLWxlZnQ6IDVweDsNCglwYWRkaW5nOiAwcHggMjBw'+
		'eCAwcHggMzlweDsNCgl3aGl0ZS1zcGFjZTogbm93cmFwOw0KfQ=='
    );

    // make sure we have permissions and Initialize
    facebook.needAppPermission('read_stream,offline_access', function(success) {
        if (success === true) {
            options.load(Initialize);
        }
    });
}
// ==Script==
// @id        InventoryAnalyzer.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Analize all items from inventory.
 */
function InventoryAnalizer() {

    var Groups = ['Weapons', 'Armor', 'Vehicles', 'Animals', 'Henchmen'];
    var Indexes = {'1':0, '2':1, '3':2, '8': 3, '13': 4};
    var Wishlist;
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
        Henchmen   : Filter(),
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
            'Henchmen_offense'   : 0,
            'Henchmen_defense'   : 0,
            'Henchmen_combined'  : 0,
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
        },
        get: function(type, subtype) {
            return this[type][subtype];
        }
    };

    var popupElt = new PopupObject('invAnalizer_popup', {
        type: 'main',
        title: '<img src="'+global.resource.inventoryanalizer_title+'">',
        onclose: function() {
            delete Inventory;
        }
    });

    var Events = {
        toMGSend_click: function () {
            var link = Util.uSplit(c$(this).attr('gift-link'));
            if ( link.gift_category && link.gift_id ) {
                popupElt.close();
                setTimeout(function() {
                    MultiGifter(link.gift_category, link.gift_id, InventoryAnalizer);
                }, 1000);
            }
        },
        toMGFav_click: function() {
            addAllToMultiGifter();
            return false;
        },
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
            var type    = $('#type_filter option:selected', popupElt.content).val();
            var subtype = $('#show_filter option:selected', popupElt.content).val();
            $('.item_list li.selected', popupElt.content).toggleClass('selected', false);
            $(this).toggleClass('selected', true);

            genSelectedItemDom(Inventory.get(type,subtype)[$(this).attr('idx')]);
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

    function addAllToMultiGifter() {
        var type = $('#type_filter option:selected', popupElt.content).val();
        var subtype = 'give_away';
        showAskPopup('Adding to Multi Gifter','Do you want to add all unnecessary '+type+' to<br>MultiGifter Favorites ?',function() {
            setTimeout(addtoFav, 1000);
        });
        function addtoFav() {
            var options = UserConfig.mgopt;

            options.load(function() {
                var itemId, link, giftFav = options.giftFav;
                Util.each(Inventory.get(type,subtype), function(id, item) {
                    if ( item.tradeable !== 1 || item.quantity < 1  ) {
                        return;
                    }
                    link = Util.uSplit(item.gift_link);
                    if ( link.gift_category && link.gift_id ) {
                        itemId = link.gift_category +'_'+ link.gift_id;
                        if ( giftFav.indexOf(itemId) === -1 ) {
                            giftFav.push(itemId);
                        }
                    }
                });
                options.save();
                showAskPopup('Adding to Multi Gifter','All '+type+' were added.<br>Do you like to open MultiGifter now ?',function() {
                    popupElt.close();
                    setTimeout(MultiGifter, 1000);
                });
            });
        }
    }

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
            Logger.error(err);
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

        if (typeof(item) === 'undefined') {
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
        if (item.tradeable === 1) {
            c$('div').click(Events.toMGSend_click).css('cursor','pointer')
            .attr({'title':'Open with MultiGifter.','gift-link':item.gift_link})
            .append(c$('img').attr('src',global.zGraphicsURL+'inventory/ItemCard/icons/Inventory-gift-icon.png'))
            .appendTo(c$('div').css({'float':'right','margin-right':5}).appendTo(infoElt));
        }
        if (item.favor_id > 0 && parseInt(item.rp_price) > 0) {
            c$('div').appendTo(infoElt).css({'float':'left','color':'green'}).html('('+item.rp_price + ' RP)');
            // .html('<img
            // src="'+global.zGraphicsURL+'v3/icon-gf-coin.gif">'+item.rp_price
            // + ' RP');
        }
        else if (item.pawn_shop > 0 && parseInt(item.lp_price) > 0) {
            c$('div').appendTo(infoElt).css({'float':'left','color':'green'}).html('('+item.lp_price + ' LP)');
            // .html('<img
            // src="'+global.zGraphicsURL+'crm/CRM_LP-icon-s.png">'+item.lp_price
            // + ' LP');
        }
        else if (item.purchasable && parseInt(item.cash_price) > 0) {
            c$('div').appendTo(infoElt).css({'float':'left','color':'green'}).html('(buy: '+item.cash_price+')');
        }

        c$('div').css('clear', 'both').html('You can search it at ').appendTo(infoElt)
        .append(c$('a', 'target:_black').attr('href', sSearchUrl+String(item.name).replace(/\s+?/g,'+')).text('wikia'));

        if (item.tradeable === 1) {
            c$('div').html('This item can be added to ').appendTo(infoElt)
            .append(c$('a', 'href:#,itemid:'+item.id).text('wishlist')
            .click(Events.addWishlist_click));
        }

        if (iLocation && iLocation.link && iLocation.name) {
            var link = (/http/.test(iLocation.link)?'':global.serverURL) + iLocation.link;
            c$('div').html('You can get this item in ').appendTo(infoElt)
            .append(c$('a', 'target:_black').attr('href', link).text(iLocation.name));
        }
    }

    function genMainDom() {

        // filter
        c$('div', 'class:frame_box').appendTo(popupElt.content)
        .append(c$('label', 'for:show_filter').text('Show: '))
        .append(c$('select', 'id:type_filter,class:black').width(120).change(genListDom))
        .append(c$('select', 'id:show_filter,class:black').width(180).change(genListDom))
        .append(b$('To MultiGifter Fav.', 'class:short white sexy_send_gift_new').css('margin-left', 20).click(Events.toMGFav_click))
        .append(b$('Gen.Table', 'class:short white').css('float', 'right').click(Events.genTable_click));

        c$('div', 'class:frame_box').height(80).appendTo(popupElt.content)
        .append(c$('div', 'item_info').text('Select an item to show extended info.'))
        .append(c$('div', 'wishlist'));

        // List
        c$('div', 'info_table').appendTo(popupElt.content).css({
            'margin': 2,
            'padding': 2
        });

        function buildStrengthBox(title, type) {
            var elem = c$('div', 'class:mafia_strength')
            .append(c$('div', 'class:total_title').append(c$('span').text(title)));

            $.each(['Weapons', 'Armor', 'Vehicles', 'Animals', 'Henchmen', 'Total'], function(index, name) {
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
        c$('div', 'class:frame_box').height(210).appendTo(popupElt.content)
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
                'Animals'  : 'Animals',
                'Henchmen' : 'Henchmen'
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

    function Initialize(Items) {
        // get all items
        $.each(Items, function(id, obj) {
            var sInventory;
            var cQualities   = Inventory.global['Qualities'];
            var nGroupIndex  = Indexes[String(obj.type)];
            var bEquipped    = (obj.equipped_offense + obj.equipped_defense) > 0;
            var nEquipped    = Math.max(obj.equipped_offense, obj.equipped_defense);
            var bValid       = (obj.attack + obj.defense) > 0;
            var bAvailable   = obj.unique !== 1;
            /*(
                (obj.location != 7 && obj.location != 10 && obj.location != 16
                && obj.location != 9 && obj.specialAbility.length < 1)
                || obj.favor_id != -1 || obj.vc_available == true
            );*/
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
                Logger.error(err);
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
        'Z3JhcGhpY3MvaW52ZW50b3J5L3N1bW1hcnkvTWFmaWEtc3RyZW5ndGgtYm94Mi5wbmcpIG5vLXJlcGVhdDsNCglmbG9hdDogbGVm'+
        'dDsNCgloZWlnaHQ6IDIxMHB4Ow0KCXdpZHRoOiAxNjBweDsNCglmb250LXNpemU6IDEycHg7DQp9DQojaW52QW5hbGl6ZXJfcG9w'+
        'dXAgLm1hZmlhX3N0cmVuZ3RoID4gZGl2Omxhc3QtY2hpbGQgew0KCW1hcmdpbi10b3A6IDE1cHg7DQp9DQojaW52QW5hbGl6ZXJf'+
        'cG9wdXAgLm1hZmlhX3N0cmVuZ3RoLnF1YWxpdGllcyA+IGRpdjpsYXN0LWNoaWxkIHsNCgltYXJnaW4tdG9wOiAzNXB4Ow0KfQ0K'+
        'I2ludkFuYWxpemVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0aCAudG90YWxfdGl0bGUgew0KCWZvbnQtd2VpZ2h0OiBib2xkOw0KCW1h'+
        'cmdpbi1ib3R0b206IDIxcHg7DQoJbWFyZ2luLWxlZnQ6IGF1dG87DQoJbWFyZ2luLXJpZ2h0OiBhdXRvOw0KCXBhZGRpbmctdG9w'+
        'OiAxMHB4Ow0KCXBvc2l0aW9uOiByZWxhdGl2ZTsNCgl0ZXh0LWFsaWduOiBjZW50ZXI7DQoJd2lkdGg6IDE2MHB4Ow0KfQ0KI2lu'+
        'dkFuYWxpemVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0aC5xdWFsaXRpZXMgLnRvdGFsX3RpdGxlIHsNCgltYXJnaW4tYm90dG9tOiAx'+
        'M3B4Ow0KfQ0KI2ludkFuYWxpemVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0aCAudG90YWxfdGl0bGUgc3BhbiB7DQoJY29sb3I6ICNG'+
        'RkNEMDA7DQoJdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsNCn0NCiNpbnZBbmFsaXplcl9wb3B1cCAubWFmaWFfc3RyZW5ndGgg'+
        'Lm1hZmlhX3N0cmVuZ3RoX3NwYWNpbmcgew0KCWhlaWdodDogMThweDsNCgltYXJnaW4tbGVmdDogMnB4Ow0KCW1hcmdpbi10b3A6'+
        'IDdweDsNCn0NCiNpbnZBbmFsaXplcl9wb3B1cCAubWFmaWFfc3RyZW5ndGgucXVhbGl0aWVzIC5tYWZpYV9zdHJlbmd0aF9zcGFj'+
        'aW5nIHsNCgltYXJnaW4tdG9wOiA0cHg7DQp9CQ0KI2ludkFuYWxpemVyX3BvcHVwIC50ZXh0X3Bvc2l0aW9uaW5nIHsNCgljb2xv'+
        'cjogIzk5OTsNCglmb250LXNpemU6IDExcHg7DQp9DQojaW52QW5hbGl6ZXJfcG9wdXAgLm1hZmlhX3N0cmVuZ3RoIC5tYWZpYV9z'+
        'dHJlbmd0aF9zcGFjaW5nIC5zdGF0X25hbWUgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbi1sZWZ0OiAxMHB4Ow0KCXdpZHRoOiA4'+
        'MHB4Ow0KfQ=='
    );

    MW.getInventoryData(function(data) {
        Inventory.ItemTypes = data.Item.Types;
        Inventory.Locations = data.Item.Locations;
        Inventory.Qualities = data.Item.Qualities;
        Inventory.Subtypes  = data.Item.Subtypes;
        // add missed locations
        Inventory.Locations[7] = {
            name: 'Challenge Mission',
            link: 'http://mafiawars.wikia.com/wiki/Challenge_Mission'
        };
        Inventory.Locations[8] = {
            name: 'Free Gifts',
            link: 'http://mafiawars.wikia.com/wiki/Free_Gifts'
        };
        Inventory.Locations[10] = {
            name: 'Special Event',
            link: 'http://mafiawars.wikia.com/wiki/Missions'
        };
        Inventory.Locations[13] = {
            name: 'Operations',
            link: 'http://mafiawars.wikia.com/wiki/Operations'
        };
        Inventory.Locations[14] = {
            name: 'Crafting',
            link: 'http://mafiawars.wikia.com/wiki/Category:Properties'
        };
        // calculate all necessary data
        Initialize(Inventory.all = data.Items.data);
        // generate all dom
        genMainDom();
        genListDom();
        // add wishlist
        httpAjaxRequest({
            url:'remote/' + MW.getIntURL('wishlist', 'add') + '&isajax=1&retwl=1&gift_category=0&gift_id=0',
            success: setWishlist
        });
        // show popup
        popupElt.show();
    });
}
// ==Script==
// @id        MafiaWiper.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Clear all mafia members
 */
function MafiaWiper()
{
    var abort_process = false;
    var users = [];
    var options = new Config('mwopt', {
        ignored: []
    });

    var popupElt = new PopupObject('mafiawiper_popup', {
        type: 'main',
        title: '<img src="'+global.resource.mafiawiper_title+'">',
        onclose: function() {
            abort_process = true;
            delete users;
        }
    });

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
            var self = $(this);
            if (self.hasClass('disabled')) {
                return false;
            }
            self.addClass('disabled');
            
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
                            self.removeClass('disabled');
                        }
                    });
                }
                else {
                    self.removeClass('disabled');
                }
            }, true);
        }
    };

    function genMainDom() {
        c$('center', 'class:info').appendTo(popupElt.content)
        .append(c$('div', 'top_div'))
        .append(c$('div', 'loading_div').css('margin-top', 5)
        .append(c$('div').append(b$('Remove All','class:short red').click(Events.removeAll_click))));

        c$('div', 'id:create_friend_list').hide()
        .appendTo(c$('div', 'class:frame_box clearfix').appendTo(popupElt.content))
        .append(c$('label', 'for:friendlistname').text('You can create a new Facebook FriendList:'))
        .append(c$('input:text', 'id:friendlistname,class:black').val('No Playing Mafia Wars'))
        .append(b$('Create', 'class:short white').click(Events.createFriendList_click));

        c$('div', 'class:clearfix').css('height',25).appendTo(popupElt.content)
        .append(c$('input:checkbox', 'checked:checked,id:ask_for_delete'))
        .append(c$('label', 'for:ask_for_delete').text('Ask for remove'))
        .append(c$('a', 'remove_ignored').text('Reset ignored members').hide()
        .css('margin-left',20).click(Events.resetIgnored_click));

        c$('ul').appendTo(c$('div', 'class:member_list').appendTo(popupElt.content));
    }
    
    function parseUsers(users) {
        var uData = new Object();
        Util.each(users, function(i,u) {
            uData[u.uid] = u;
        });
        return uData;
    }

    function Initialize() {
        MW.getGiftData(function(data) {
            if (!data || !data.groups_levels) {
                mwFriendsError();
                return;
            }
            var ids = new Array();
            Util.each(data.groups_levels, function(id) {
                ids.push(id);
            });
            loadingScreen('Loading Application users...');
            facebook.getAppFriends(function(result) {
                if (!result || result.error) {
                    popupElt.destroy();
                    showHelpPopup({
                        icon: 'error',
                        message: result.error.message
                    }); 
                    return;
                }
                result = parseUsers(result);
                
                Util.each(data.groups_levels, function(id, name) {
                    if (!Util.isSet(result[id])) {
                        users.push({'id':id, 'name':name});
                    }
                });
                genMainDom();                
                $('#top_div').html('Members not playing Mafia Wars: ' + users.length);
                showResults();
                loadingScreen();
                popupElt.show();
            });
        });
    }

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
        var addedElt;

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
        var messageElt = c$('span').css('margin-left', 5);
        var len = users.length;

        $('#create_friend_list').empty()
        .append(c$('img').css('vertical-align', 'middle')
        .attr('src', global.resource.ajax_loader)).append(messageElt);

        var c_user = new Collection(users);

        c_user.onEnd(function() {
            $('#create_friend_list').html('FriendList successfully created.');
        });

        c_user.onMove(function(index, key, user) {
            if (user && user.id) {
                messageElt.text('Adding user (' + (index+1) + '/'+ len + ')...');
                facebook.friendlistAdd(friendListID, user.id, c_user.MoveNext);
            }
            else {
                c_user.MoveNext();
            }
        });

        c_user.MoveFirst();
    }

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

    options.load(Initialize);
}
// ==Script==
// @id        MultiGifter.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Set configuration.
 */
UserConfig.create('mgopt', {
    delay          : 3,
    giftFav        : new Array(),
    userFav        : new Array(),
    giftPages      : true,
    userPages      : true,
    search         : new Array(),
    hideZeroAmount : true
});
/**
 * Send multiple items from inventory.
 */
function MultiGifter(select_gift_cat, select_gift_id, on_Close)
{
    var sendTimer = new TimerMessage('#next_gift_timer');
    var already_working = false;
    var daily_left, gift_count_avail;
    var Queue = [];
    var gift_categories = {
        0: 'Collections',
        1: 'Loot',
        2: 'Boosts'
    };

    var options = UserConfig.mgopt;

    var InventoryFilter = new Object();

    var popupElt = new PopupObject('multigifter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.multigifter_title+'">',
        onclose: function() {
            sendTimer.clear();
            Events.cancel_click();
            options.fromDomElements();
            options.save();
            if ( on_Close ) {
                setTimeout(on_Close,1000);
            }
        }
    });

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
        },
        'Brazil': {
            'Beaches'              : [7001,7002,7003,7004,7005,7006,7007],
            'Musical Instruments'  : [7008,7009,7010,7011,7012,7013,7014],
            'Amazonian Plants'     : [7015,7016,7017,7018,7019,7020,7021],
            'Drinks'               : [7022,7023,7024,7025,7026,7027,7028],
            'Head Dresses'         : [7029,7030,7031,7032,7033,7034,7035]
        },
        'Chicago': {
            'Car Bonnets'       : [8001,8002,8003,8004,8005,8006,8007],
        	'Stickpins'         : [8008,8009,8010,8011,8012,8013,8014],
        	'Sharp Dressers'    : [8015,8016,8017,8018,8019,8020,8021]
        }
    };

    /**
     * @constructor
     * @param {Number} itemsPerPage
     * @return {CSFriends}
     */
    var CSFriends = function(itemsPerPage) {
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
            if ((set = parseInt(set))) {
                return (currPage[currCat] = ((set < 1) ? 1 : (set > this.pages()) ? this.pages() : set));
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
            friends[0].sort(function(a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
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
     * @param {Number} itemsPerPage
     * @return {CSInventory}
     */
    var CSInventory = function(itemsPerPage) {
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
            if ((set = parseInt(set))) {
                return (currPage[currCat] = ((set < 1) ? 1 : (set > this.pages()) ? this.pages() : set));
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
        /**
         * @param {Object} cat
         * @param {Object} id
         * @return {Object}
         */        
        this.select = function(cat, id) {
            if (Util.isSet(giftIds[cat][id])) {
                return (this.selected = giftIds[cat][id]);
            }
            return; 
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
                    freeGift[c].push((item = (giftIds[c][i] = {
                        cat     : c,
                        id      : i,
                        name    : data.item_names[c][i],
                        amount  : data.item_amounts[c][i],
                        img     : data.item_imgs[c][i]
                    })));
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

    var Inventory = new CSInventory(50);
    var Friends = new CSFriends(50);
    var Controller = {
        user: Friends,
        gift: Inventory
    };

    // EVENTS
    var Events = {
        publish_click: function() {
            var self = $(this);
            if (self.hasClass('disabled')) {
                return false;
            }
            self.addClass('disabled');
            //
            var logText = String($('#main_log textarea').val());
            var target_id = $('#main_log #group_selection').val();
            var properties = new  Object();
            var view_link = (parseInt(target_id) > 0)
            ? 'http://www.facebook.com/groups/{target}/?id={id}' 
            : 'http://www.facebook.com/{target}/posts/{id}'
            
            Util.each(logText.split(/\n/), function(index, text) {
                var line = Util.doRgx(/^\#\s\[([\d\.:]+)\]\s(.*)/, text);
                properties['['+line.$1+']'] = line.$2;
            });
            
            facebook.streamPublish({
                'target'      : target_id,
              //'message'     : message,
                'name'        : '{*actor*} sent some inventory objects!',
                'properties'  : properties
            }, function(post_id) {
                if (post_id) {
                    var p = Util.doRgx(/(\d+)_(\d+)/, post_id);
                    self.unbind().removeClass('sexy_announce_gray disabled').attr({
                        'href': view_link.replace('{target}',p.$1).replace('{id}',p.$2),
                        'target': '_black'
                    }).find('span > span').text('View');
                }
            });
            
            return false;
        },
        clear_click: function() {
            var clear_id = $(this).attr('id');
            showAskPopup('Clearing Favorites','Are you sure to clear your favotires ?',function() {
                if ( clear_id === 'gift_fav_clear' )
                {
                    options.set('giftFav', new Array());
                    options.save(function() {
                        Controller.gift.updateFavorites();
                        changeCategory('gift', 3);
                    });
                }
                else
                {
                    options.set('userFav', new Array());
                    options.save(function() {
                        Controller.user.updateFavorites();
                        changeCategory('user', 1);
                    });
                }
            });
            return false;
        },
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
            changeCategory('gift', 1);
            return false;
        },
        clearFilter_click: function() {
            Inventory.clearLootFilter();
            changeCategory('gift', 1);
            return false;
        },
        collectionFilterType_change: function() {
            updateCollectionFilterData($(this).val());
            return false;
        },
        collectionFilter_change: function() {
            Inventory.collectionFilter($(this).attr('group'), $(this).val());
            changeCategory('gift', 0);
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
                addGiftToQueue(count, getGift());
            }
            else {
                addGiftToQueue('-'+ count, getGift());
            }
            return false;
        },
        finish_click: function() {
            $('#mglist_queue').empty();
            globalMessage();
            // Change to sending interface
            $('#main_log', popupElt.content).hide();
            $('#main_container', popupElt.content).show();
            return false;
        },
        toggleAction_click: function() {
            var action = $(this).attr('action');
            if (action == 'add') {
                $('#start_controls a[amount]').removeClass('green').addClass('red');
                $(this).attr('action', 'remove').html('REM');
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
            $('#mglist_queue').empty();
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
                deleteJob(parseInt(n));
            }
            return false;
        },
        category_change: function() {
            var index = this.selectedIndex;
            var name = $(this).attr('name');

            if (name == 'gift') {
                $('#gift_fav_clear')[(index===3?'show':'hide')]();
                $('div[id^=filter_container]').hide();
                (e$('#filter_container_' + index) || $('#filter_container_msg')).show();
            } else {
                $('#user_fav_clear')[(index===1?'show':'hide')]();
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
            changeCategory(name, (name == 'gift' ? 4 : 2));
        }
    };
    function genMainDom() {
        var main_log = c$('div', 'id:main_log').height(422).css('text-align','left').appendTo(popupElt.content).hide();
        var main_container = c$('div', 'id:main_container').height(422).appendTo(popupElt.content);

        // GIFT BAR
        var giftBarElt = c$('div', 'class:controlbar').appendTo(main_container);
        c$('div').css('clear','both').appendTo(main_container);

        c$('div', 'class:leftside').appendTo(giftBarElt)
        .append(c$('select', 'class:black,id:gift_category,name:gift').width(150).change(Events.category_change))
        .append(c$('a','href:#,id:gift_fav_clear').css('margin-left',5).text('Clear').click(Events.clear_click).hide())
        .append(c$('input:checkbox', 'mgopt_giftpages').css('margin-left',5).change(Events.swithGiftPages_click))
        .append(c$('label', 'for:mgopt_giftpages').text('Use Pages.'))
        .append(
            c$('div', 'id:gift_page_box').css('float', 'right')
            .append(c$('a','name:gift,id:mgpage_prev,href:#,class:active').click(Events.prevPage_click))
            .append(c$('select', 'class:black,id:gift_page').width(70).change(Events.giftPage_change))
            .append(c$('a','name:gift,id:mgpage_next,href:#,class:active').click(Events.nextPage_click))
        );

        c$('div', 'class:rightside').appendTo(giftBarElt).width(290)
        .append(c$('input:checkbox', 'mgopt_hidezeroamount').change(Events.swithGiftPages_click))
        .append(c$('label', 'for:mgopt_hidezeroamount').text('Hide 0 amount.').css('margin-right',15))
        .append(b$('Filters', 'name:filter,class:short white').click(Events.showTab_click))
        .append(b$('Search', 'name:search,class:short white').click(Events.showTab_click));

        c$('div', 'id:gift_list,class:item_list').css('float','left').appendTo(main_container);

        var tabContainerElt = c$('div', 'class:tab_container').appendTo(main_container);

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
        var tab = new TabObject(
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
        .append(c$('center').css('margin', '10px 0px 0px 2px')
            .append(b$('Select All', 'name:ItemTypes').click(Events.selectAll_click))
            .append('<br /><br />')
            .append(b$('Select None', 'name:ItemTypes').click(Events.selectNone_click))
        );

        // Quality
        tab.getLayout(2).append(c$('ul', 'class:checkboxlist, name:Qualities'))
        .append(c$('center').css('margin', '10px 0px 0px 2px')
            .append(b$('Select All', 'name:Qualities').click(Events.selectAll_click))
            .append('<br /><br />')
            .append(b$('Select None', 'name:Qualities').click(Events.selectNone_click))
        );

        // Location
        tab.getLayout(3).append(c$('ul', 'class:checkboxlist, name:Locations'))
        .append(c$('center').css('margin', '10px 0px 0px 2px')
            .append(b$('Select All', 'name:Locations').click(Events.selectAll_click))
            .append('<br /><br />')
            .append(b$('Select None', 'name:Locations').click(Events.selectNone_click))
        );

        $('#filter_container_1').append(c$('center').css('margin-top', 2)
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
        .append(b$('Remove', 'class:short white').css('margin-left',5).click(Events.removeSearch));

        c$('div').css('clear','both').appendTo(main_container);
        // USER
        giftBarElt = c$('div', 'class:controlbar').appendTo(main_container);

        c$('div', 'class:leftside').appendTo(giftBarElt)
        .append(c$('select', 'class:black,id:user_category,name:user').width(160).change(Events.category_change))
        .append(c$('a','href:#,id:user_fav_clear').css('margin-left',5).text('Clear').click(Events.clear_click).hide())
        .append(c$('input:checkbox', 'mgopt_userpages').css('margin-left',5).change(Events.swithUserPages_click))
        .append(c$('label', 'for:mgopt_userpages').text('Use Pages.'))
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

        c$('div').css('clear','both').appendTo(main_container);
        c$('div', 'id:user_list,class:item_list').appendTo(main_container);
        c$('div', 'id:selected_users').appendTo(main_container);
        
        
        c$('div').css('clear','both').appendTo(popupElt.content);
        var controls = c$('div', 'class:controls').appendTo(popupElt.content);

        // global_messages
        c$('div', 'message_controls').appendTo(controls).append('<span id="global_messages">');

        var bLabels = '';

        // CONTROL
        c$('div', 'start_controls').appendTo(controls)
        .append(c$('div', 'class:gift_delay')
            .append(c$('label', 'for:mgopt_delay').html('Delay:&nbsp;'))
            .append(c$('input:text', 'class:black,id:mgopt_delay').width(30).focus(Events.textFocus))
        )
        .append(c$('span').width(50).append(c$('a','id:count_addrem,action:add').html('ADD').click(Events.toggleAction_click)))
        .append(b$('1', 'amount:1,class:medium green').click(Events.addRem_click).width(40))
        .append(b$('5', 'amount:5,class:medium green').click(Events.addRem_click).width(40))
        .append(b$('10', 'amount:10,class:medium green').click(Events.addRem_click))
        .append(b$('25', 'amount:25,class:medium green').click(Events.addRem_click))
        .append(b$('50', 'amount:50,class:medium green').click(Events.addRem_click))
        .append(b$('ALL', 'amount:all,class:short green').click(Events.addRem_click))
        .append(b$('ALL OF ALL', 'class:short green,title:Add all gifts that you can see.').click(Events.addAllGifts_click))
        .append(b$('CLEAR', 'class:short red,title:Clear all gifts added.').click(Events.delQueue_click))
        .append(b$('START', 'class:short orange').click(Events.start_click).width(80));

        // FINISH
        c$('center', 'finish_controls').appendTo(controls)
        .append(b$('FINISH').addClass('short orange').click(Events.finish_click));

        // CANCEL
        b$('CANCEL', 'id:cancel_button,class:short orange').click(Events.cancel_click)
        .appendTo(c$('div', 'status_controls').appendTo(controls));

        // QUEUE
        c$('div', 'mglist_queue').appendTo(popupElt.content);
        
        
        // LOG
        c$('textarea', 'readonly:readonly,class:black').appendTo(main_log).css({
            'margin-top': 5,
            'width': '99%',
            'height': 250
        });
        
        //
        controls = c$('div', 'status_controls').appendTo(main_log).css('padding',20);
        
        c$('img').attr('src', global.resource.ajax_loader).css('float','left').appendTo(controls);
        c$('div', 'id:next_gift_timer').appendTo(controls).css('float','right');
        c$('div').css('padding-left', 35).appendTo(controls)
        .append(c$('span').text('Current Job:').css({'margin-right':5,'color':'grey'}))
        .append(c$('span', 'id:status_current_job_text'));
        c$('div').css({'padding-left':35, 'margin-top':15}).appendTo(controls)
        .append(c$('span').text('Job Progress:').css({'margin-right':5,'color':'grey'}))
        .append(c$('span', 'id:status_send_message'));
        
        //
        controls = c$('div', 'finish_controls').appendTo(main_log);
        c$('center').appendTo(controls)
        .append(b$('Select All Text', 'class:medium white').width(150)
        .attr('onclick', "$('#main_log textarea').select();")).css({
            'margin-bottom': 10,
            'border-bottom': '1px solid #333',
            'padding-bottom': 5
        });
        c$('div').css('clear','both').appendTo(controls);
        c$('div').css('padding-left',20).text('Select Group:').appendTo(controls);
        c$('select', 'id:group_selection,class:black').css('margin-left',20).width('95%').appendTo(controls);
        c$('div').css('clear','both').css('margin-top',2).appendTo(controls);
        b$('Publish', 'class:short white sexy_announce_gray').width(150)
          .appendTo(c$('center').appendTo(controls)).click(Events.publish_click);
        
        
        //------------------------
        // USER INTERFACE FINISHED
        //------------------------
        
        global.fb_groups.addToSelect('#group_selection');
        
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

    function changeCategory(name, index) {
        $('#'+name+'_category')[0].selectedIndex = index;
        $('#'+name+'_category').change();
    }
    
    function namesFromIds(ids) {
        var names = [];
        for (var i = 0; i < ids.length; i++) {
            names.push(Friends.getName(ids[i]));
        }
        return names;
    }
    
    function isSameArray(arr1, arr2) {
        var max = Math.max(arr1.length, arr2.length);
        for (var i = 0; i < max; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;
    }
    
    function isSameGift(gift1, gift2) {
        return (gift1 === gift2 || gift1.id == gift2.id && gift1.cat == gift2.cat);
    }
    
    function getGift() {
        return Inventory.selected;
    }
    
    function getUsers(elem) {
        var users = [];

        $('#selected_users').children().each(function(i, elem) {
            users.push(elem.id.substring(5));
        });

        return users;
    }
    
    function deleteJob(id) {
        if (Queue.length > 1) {
            Queue.splice(id, 1);
            rebuildBatchProcess();
        }
        else {
            Events.delQueue_click();
        }
        tryShowControls();
    }
    
    function showDiv(name, ms) {
        if (already_working)
            return;
        $('*[id*=_controls]', popupElt.content).hide();
        if (ms)
            $('#'+name+'_controls', popupElt.content).fadeIn(ms);
        else
            $('#'+name+'_controls', popupElt.content).show();
    }

    function showTab(name) {
        $('*[id^=tab_]', popupElt.content).hide();
        $('#tab_' + name, popupElt.content).show();
    }

    function cancelProcess() {
        Queue = [];
        already_working = false;
        showDiv('finish', 'slow');
    }

    function tryShowControls(ms) {
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
        var select = Inventory.select(cat, id);
        if (Util.isSet(select)) {
            $('li.selected', '#gift_list').toggleClass('selected', false);
            $('li[gcat='+select.cat+'][gid='+select.id+']', '#gift_list').toggleClass('selected', true);
            $('#giftcard').empty().append( buildCard(select) );
            showTab('selected_gift'); 
        }
        tryShowControls();
    };

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
                if ( !Util.isSet(item)  ) {
                    return '';
                }
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
                if ( !Util.isSet(item) || ((!item.amount || item.amount < 1) && options.get('hideZeroAmount')) ) {
                    return '';
                }
                var r = '<li gcat="' + item.cat + '" gid="' + item.id + '">';
                r += '<img src="' + item.img + '">';
                r += '<div class="item_name">' + item.name + ' (';
                if (item.active) {
                    r +=  Util.setColor(Math.max(item.eqoff,item.eqdef),'green','item_equipped') + '/';
                }
                r += Util.setColor(item.amount,'grey','item_quantity') + ')';
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
        else if (Inventory.selected && Inventory.selected.id) {
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
            var current_list = (new_filter[$(list_elem).attr('name')] = {});

            $('input:checkbox', list_elem).each(function(i, elem) {
                if (elem.checked) {
                    current_list[elem.value] = true;
                }
            });
        });

        return new_filter;
    }

    function buildCard(gift) {
        if (!Util.isSet(gift)) {
            return;
        }
        var ItemQuantity;
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
        var recipients = getUsers();
        var maxAmounts = giftToSend.amount || 0;
        var giftCount = 0;
        // handle total gift count and gift count.
        for (var i = 0; i < Queue.length; i++) {
            if (Queue[i].quantity) {
                // total count
                giftCount += (Queue[i].quantity * Queue[i].recip.length);
                if (isSameGift(Queue[i].gift, giftToSend)) {
                    // gift count
                    maxAmounts -= (Queue[i].quantity * Queue[i].recip.length);
                    if (isSameArray(Queue[i].recip, recipients))
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
            deleteJob(qID);

        return true;
    }
    
    function rebuildBatchProcess() {
        var giftCount = 0;
        $('#mglist_queue').empty();
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
            message += '<span title="'+ namesFromIds(item.recip).join(', ');
            message += '" style="color: yellow; cursor: pointer;">'
            message += item.recip.length+ ' users.</span>';
        }
        var updateItem = e$('#'+jobID) ||
        c$('div', 'class:queue_item,id:'+jobID).prependTo('#mglist_queue');

        updateItem.empty();
        c$('div','class:update_timestamp').appendTo(updateItem).html(new Date().toUTCString());
        c$('div','class:status').append(c$('div')).appendTo(updateItem);
        c$('div','class:icon').appendTo(updateItem).append(c$('img').attr({
            'width': 40,
            'height': 40,
            'src': item.gift.img
        }));
        var table = new TableObject(updateItem, 2, 2);
        c$('span').css('float', 'right').text('Job:').appendTo(table.cell(0,0));
        c$('span').css('float', 'right').text('Status:').appendTo(table.cell(1,0));
        c$('span', 'class:job_txt,id:queue_item_status_'+id).text('Waiting.').appendTo(table.cell(1,1));
        c$('span', 'class:job_txt,id:queue_job_name').appendTo(table.cell(0,1)).html(message);

        b$('delete', 'delete_id_'+id).click(Events.deleteJob_click)
        .appendTo(updateItem).css('float','right');
    }
    
    function getFixedGiftCount(q) {
        q = parseInt(q);
        return (q>49)?50 : (q>24)?25 : (q>9)?10 : (q>4)?5 : (q>0)?q : 1;
    }
    
    function startBatchProcess() {
        if (Queue.length < 1)
            return;

        var params, job, message_header = '';
        var elemLog = $('#main_log textarea', popupElt.content).get(0);
        var timerInterval = function(delay, fn) {
            if (isNaN(parseInt(delay))) { delay = 3; }
            sendTimer.start('Next in %N% sec.', delay, fn);
        };

        // Hide all delete buttons of batch process to prevent errors
        $('*[id^="delete_id_"]', '#mglist_queue').hide();
        
        // Change to sending interface
        $('#main_log', popupElt.content).show();
        $('#main_container', popupElt.content).hide();
        elemLog.value = '';
        
        // start a new job
        function startNewJob()
        {
            // set current job
            job = Queue[0];
            // set link parameters
            params = {
                'gift_category' : job.gift.cat,
                'gift_count'    : 1,
                'gift_id'       : job.gift.id,
                'gift_key'      : global.gift_key,
                'sendkey'       : ''
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
            
            elemLog.value += '# ['+(new Date()).toLocaleTimeString()+ '] Sent '+ job.giftSend + ' ' + job.gift.name;
            elemLog.value += '(s) to ' + namesFromIds(job.recip).join(', ') + '\n';
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
            $('#status_send_message').html('Sending ' + params['gift_count'] + ' ' + job.gift.name + '.');
            
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
                    //Inventory.updateAmounts();
                    var updatedData = MW.updateGiftData(htmlText);
                    job.gift.amount = updatedData.item_amounts[job.gift.cat][job.gift.id];
                    gift_count_avail = (daily_left = updatedData.gifts_daily_left);
                    
                    var amount = job.gift.amount || 0;
                    var elem = $('#gift_list li[gid=' + job.gift.id + '][gcat=' + job.gift.cat + ']');
                    elem.find('#item_quantity').text(amount);
                    elem.find('#item_equipped').text(Math.max(job.gift.eqoff,job.gift.eqdef));

                    message_header = h$(htmlText).find('.message_body').text();

                    $('#status_send_message').html(message_header);
                    $('#next_gift_timer').html('Next in ' + $('#mgopt_delay').val() + ' sec.');

                    if (/You\s*gave|Has\s*dado|Du\s*hast|Vous\s*avez\s*donn|Hai\s*dato/i.test(message_header))
                    {
                        job.quantity = Math.min(job.quantity - params['gift_count'], amount);
                        job.giftSend += params['gift_count'];
                        if (job.quantity > 0) {
                            timerInterval($('#mgopt_delay').val(), sendGift);
                        }
                        else {
                            timerInterval($('#mgopt_delay').val(), endCurrentJob);
                        }
                    }
                    else
                    {
                        timerInterval($('#mgopt_delay').val(), endCurrentJob);
                    }
                    $('#queue_item_status_' + job.thisID)
                    .html('You have sent ' + (job.giftSend * job.recip.length) + ' ' + job.gift.name + '(s).');
                }
            });
        }
        // Start all batch process.
        startNewJob();
    }

    function Initialize() {
        MW.getGiftData(function(gift_data) {
            Friends.update(gift_data);

            daily_left        = gift_data.gifts_daily_left;
            gift_count_avail  = gift_data.gifts_daily_left;

            Logger.debug('gift_key: '+global.gift_key);
            Logger.debug('daily_left: ' + gift_data.gifts_daily_left);

            MW.getInventoryData(function(inv_data) {
                Logger.debug('Loading inventory...');
                Inventory.all = inv_data.Items.data;
                InventoryFilter.ItemTypes = inv_data.Item.Types;
                InventoryFilter.Locations = inv_data.Item.Locations;
                InventoryFilter.Qualities = inv_data.Item.Qualities;
                Inventory.update(gift_data, inv_data.Items);
                Logger.debug('Inventory loaded...');

                genMainDom();

                if (select_gift_cat && select_gift_id) {
                    selectGift(select_gift_cat, select_gift_id);
                }

                changeCategory('gift', (options.get('giftFav').length > 0) ? 3 : 0);
                changeCategory('user', (options.get('userFav').length > 0) ? 1 : 0);

                globalMessage();

                options.toDomElements();
                showDiv('none');
                // show popup
                popupElt.show();
            });
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
        'CXBhZGRpbmc6IDFweDsNCgl3aWR0aDogMTk1cHg7DQoJb3ZlcmZsb3cteDogaGlkZGVuOw0KCW92ZXJmbG93LXk6IGF1dG87DQp9'+
        'DQojbXVsdGlnaWZ0ZXJfcG9wdXAgLnRhYl9ib3hfY29udGVudCBjZW50ZXIgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbjogMTVw'+
        'eCAwcHggMHB4IDNweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAuaXRlbV9saXN0IHsNCglmbG9hdDogbGVmdDsNCglwYWRkaW5n'+
        'OiAxcHg7DQoJd2lkdGg6IDQwMHB4Ow0KCWJvcmRlcjogMXB4IHNvbGlkIHJnYigxNTMsIDE1MywgMTUzKTsNCglvdmVyZmxvdy14'+
        'OiBoaWRkZW47DQoJb3ZlcmZsb3cteTogYXV0bzsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAuaXRlbV9saXN0IHVsIHsNCgltYXJn'+
        'aW46IDBweDsgDQoJcGFkZGluZzogMHB4Ow0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAu'+
        'aXRlbV9saXN0IHVsIGxpIHsNCgl3aWR0aDogYXV0bzsNCgltYXJnaW46IDFweDsgDQoJaGVpZ2h0OiAzMHB4OyANCglib3JkZXI6'+
        'IDFweCBzb2xpZCAjMzMzMzMzOyANCglvdmVyZmxvdzogaGlkZGVuOyANCgljdXJzb3I6IHBvaW50ZXI7DQp9DQojbXVsdGlnaWZ0'+
        'ZXJfcG9wdXAgLml0ZW1fbGlzdCB1bCBsaSAuZmF2b3JpdGUgew0KCWJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGlj'+
        'LnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy92My9pY29uX3dpc2hsaXN0X2FkZF8xOXgxNF8wMS5naWYiKSBuby1yZXBlYXQgc2Ny'+
        'b2xsIDAlIDAlIHRyYW5zcGFyZW50Ow0KCWN1cnNvcjogcG9pbnRlcjsNCglmbG9hdDogcmlnaHQ7DQoJaGVpZ2h0OiAxNHB4Ow0K'+
        'CW1hcmdpbjogOHB4Ow0KCXdpZHRoOiAxOXB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIC5pdGVtX2xpc3QgdWwgbGkgLmZhdm9y'+
        'aXRlLnJlbW92ZSB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNz'+
        'L3YzL2ljb25fd2lzaGxpc3RfcmVtb3ZlXzE5eDE0XzAxLmdpZiIpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCUgdHJhbnNwYXJlbnQ7'+
        'DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2I2dpZnRfbGlzdCB7DQoJaGVpZ2h0OiAxODBweDsNCn0NCiNtdWx0aWdpZnRlcl9w'+
        'b3B1cCBkaXYjdXNlcl9saXN0IHsNCgloZWlnaHQ6IDE2MHB4Ow0KfQkNCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYjZ2lmdF9saXN0'+
        'IHVsIGxpIGRpdi5pdGVtX25hbWUgew0KCWZsb2F0OiBsZWZ0Ow0KCXdpZHRoOiAyOTBweDsNCgloZWlnaHQ6IDE3cHg7DQoJb3Zl'+
        'cmZsb3c6IGhpZGRlbjsNCglwYWRkaW5nOiA2cHggMHB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9w'+
        'dXAgZGl2I2dpZnRfbGlzdCB1bCBsaSBpbWcgew0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogMjVweDsNCgltYXJnaW46IDJweCAx'+
        'MHB4Ow0KCXdpZHRoOiAyNXB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdiN1c2VyX2xpc3QgdWwgbGkgZGl2LmNoZWNrYm94'+
        'IHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9mbGFncy9td19t'+
        'ZXNzYWdlYm94X2NoZWNrYm94Ml9ub3JtYWxpemVkLmdpZiIpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCUgdHJhbnNwYXJlbnQ7DQoJ'+
        'dGV4dC1hbGlnbjogbGVmdDsNCgltYXJnaW46IDVweCAwcHggMHB4IDEwcHg7DQoJbWluLWhlaWdodDogMjBweDsNCgl3aWR0aDog'+
        'MzAwcHg7IA0KCXBhZGRpbmctbGVmdDogMzBweDsgDQoJaGVpZ2h0OiAyMHB4Ow0KCWN1cnNvcjogcG9pbnRlcjsNCglmbG9hdDog'+
        'bGVmdDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYjdXNlcl9saXN0IHVsIGxpLnNlbGVjdGVkIGRpdi5jaGVja2JveCB7DQoJ'+
        'YmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3MvZmxhZ3MvbXdfbWVzc2Fn'+
        'ZWJveF9jaGVja2JveDFfbm9ybWFsaXplZC5naWYiKSBuby1yZXBlYXQgc2Nyb2xsIDAlIDAlIHRyYW5zcGFyZW50Ow0KfQ0KI211'+
        'bHRpZ2lmdGVyX3BvcHVwIGRpdiNnaWZ0X2xpc3QgdWwgbGkuc2VsZWN0ZWQgeyANCglib3JkZXI6IDFweCBzb2xpZCAjRkZGRjAw'+
        'Ow0KfQ=='
    );

    // load options and Initialize.
    options.load(Initialize);
}
// ==Script==
// @id        OperationsCenter.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Set configuration.
 */
UserConfig.create('ocopt', {
    // exclude some settings when exporting.
    _excludedToExport: ['publishedOps', 'today', 'todayLinks'],
    
    defaultGroup : 0,
    addSlackers  : false,
    today        : 0,
    ignoredOps   : new Object(),
    publishedOps : new Object(),
    todayLinks   : new Object()
});
/**
 * Open Operations Center popup.
 */
function OperationsCenter() {
    
    var STATUS_COMPLETED = 0;
    var STATUS_STARTED   = 1;
    var STATUS_NOSTARTED = 2;
    var STATUS_EXPIRED   = 3;
    var STATUS_REMOVED   = 4;
    
    var missions_links = new Object();
    var missions_posts = new Object();
    var socialMissions = new Object();
    var linkRegex  = /'?(?:link|href)'?:\s*'([^']+)/g;
    
    /**  @type {CSTimers} */ var missions_timers;
    /**  @type {Config}   */ var options = UserConfig.ocopt;

    var popupElt = new PopupObject('operationscenter_popup', {
        type: 'main',
        title: '<img src="'+global.resource.operationscenter_title+'">',
        zIndex: 30,
        onclose: function() {
            options.fromDomElements();
            options.save();
            missions_timers.clear();
        }
    });

    /**
     * @constructor
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
        this.slots       = {
                total: 0, 
                free: 0, 
                users: new Array()
        };
        this.owner_id    = Util.doRgx(/(\d+)/, global.USER_ID).$1;
        this.instance_id = instance_id;
        this.feed_key    = missions_links[instance_id].feed_key;
        this.mission_num = missions_links[instance_id].mission_num;
        this.is_owner    = true;
        this.missionPic  = Util.getPicture($('.missionPic', id).attr('style'));
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
            
        } else if ( e$('.missionAction a:regex(onclick,collectReward)', id) ) {
            this.status  = STATUS_COMPLETED;
            this.timer   = Util.setColor('Mission Completed!', 'green');
            
        } else if ( e$('.missionAction a:regex(onclick,startMission)', id) ) {
            this.status  = STATUS_NOSTARTED;
            this.timer   = Util.setColor('Not Started.', 'white');
            
        } else if ( (elem = e$('.missionAction a:regex(onclick,removeMission)', id)) ) {
            this.status  = STATUS_REMOVED;
            this.timer   = Util.setColor('Leader removed you.', 'red');
            this.owner_id = Util.doRgx(/removeMission\(['"](\d+)['"],/, elem.attr('onclick')).$1;
        }

        if ( (elem = e$('*[id^=taskDoJob_' + instance_id + '_]', id)) ) {
            this.is_owner    = false;
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
        } else if (this.status === STATUS_STARTED) {
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
                    'image'    : Util.getPicture($('.missionTaskImage', elt).attr('style')),
                    'progress' : '0%'
                };
            } else {
                var sProgress = $('.missionTaskStatus > div', elt).css('width');
                var userElt = $('#socialmission_box_hover_'+i+'_'+instance_id+'_big tr:first a:first img', id);
                self.slots.users[i] = {
                    'name'     : userElt.attr('title'),
                    'profile'  : userElt.parent().attr('href'),
                    'image'    : $('.missionTaskImage img', elt).attr('src'),
                    'progress' : sProgress
                };
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
            var data = {
                'owner'    : self.owner_id,
                'instance' : self.instance_id,
                'type'     : self.type,
                'page'     : self.page
            };
            if (action === 'doTask') {
                var data = {
                    'owner_id'     : self.owner_id,
                    'instance_id'  : self.instance_id,
                    'position'     : self.position
                };
            } else if (action === 'sendPostBack') {
                data = {'instance' : self.instance_id};
            }
            return 'remote/'+MW.getIntURL('socialmission', action)+'&'+$.param(data);
        };
        this.info = function() {
            return '['+self.difficulty+' ('+self.slots.free+'/'+self.slots.total+')] ' + self.name;
        };
        return this;
    };
    /**
     * @constructor
     * @return {CSTimers}
     */
    var CSTimers = function() {
        var timers = new Object();
        
        /**
         * @param {String} id
         */
        function clearInstance(id) {
            try { 
                clearInterval(id); 
            }
            catch (e) { }
        } 
        /** 
         * @param {String} instance_id
         * @param {Number} time_left
         */
        function updateTimer(instance_id, time_left) {
            var m;
            return (function() {
                if ( (m=e$('li[instance='+instance_id+'] .mission_header .operation_status span', popupElt.content)) ) {
                    if (time_left > 1) {
                        m.text(Util.toDateString((time_left--)*1000));
                    } else {
                        clearInstance(instance_id);
                        $('li[instance='+instance_id+']').hide();
                    }
                }
            });
        }        
        /**
         * Add a new timer
         * @param {String} instance_id
         * @param {Number} time_left
         */
        this.add = function(instance_id, time_left) {
            if (Util.isSet(timers[instance_id])) {
                clearInstance(instance_id);
            }
            timers[instance_id] = setInterval(updateTimer(instance_id,time_left), 1000);
        };
        /**
         * Clear all timers
         */
        this.clear = function() {
            $.each(timers, function(m, i) {
                clearInstance(i);
            });
        };
        
        return this;
    };

    /**
     * @constructor
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
        this.mission  = socialMissions[ self.id ];

        this.hide = function() {
            var liElem = $(button).parent().parent();
            liElem.fadeOut(500, liElem.remove);
        };
        this.remove = function() {
            delete socialMissions[ self.id ];
            self.hide();
        };
        this.isDisable = function() {
            return $(button).hasClass('disabled');
        };
        this.enable = function() {
            $(button).removeClass('disabled');
        };
        this.disable = function() {
            $(button).addClass('disabled');
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
            var count = 0;
            for (var item in options.get(name+'Ops')) {
        	    if (item) {
                    count++;
        	    }
            }
            return count;
        }
    }

    var Events = {
        refresh_click: function() {
            missions_timers.clear();
            fullLoad('remote/'+MW.getIntURL('socialmission'), 'initiator', function() {
                fullLoad('remote/'+MW.getIntURL('socialmission'), 'helper', function() {
                    loadingScreen('hide');
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
                                if ( (button.mission.is_mastered = is_mastered) ) {
                                    $('#operations_list .task_buttons a').addClass('disabled');
                                    loadPage(button.mission.page, button.mission.type, updateOperations);
                                }
                            });
                        }
                        updateResults(data, button.id);
                    }
                    catch(err) {
                        Logger.error(err);
                    }
                    button.enable();
                }
            });
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
            global.fb_groups.refresh(function() {
                global.fb_groups.addToSelect('#select_fbgroups',options.get('defaultGroup'));
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
            publishAll(button.enable);
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
            var params = $.parseJSON(Util.uSplit(url).next_params);

            if (!params.instance_id) {
                throw TypeError('Cant read "instance_id" from url.');
            }
            if (!params.feed_key) {
                throw TypeError('Cant read "feed_key" from url.');
            }
            if (!params.mission_num) {
                throw TypeError('Cant read "mission_num" from url.');
            }
            return (missions_links[params.instance_id] = params);
        }
        catch(err) {
            Logger.error(err);
            return {key:0, num:0};
        }
    }
    /**
     * Parse remeber post scripts
     * @param {Object} index
     * @param {Object} elem
     */
    function addPostScript( index, elem ) {
        var script = String($(elem).text());
        var instance = Util.doRgx(/postInitActionFeed([\w\d]+)/, script).$1;
        missions_posts[instance] = 'postInitActionFeed'+instance+'();';
        popupElt.content.append(elem);
    }
    /**
     * Parse Timers scripts
     * @param {Object} index
     * @param {Object} elem
     */
    function addTimers( index, elem ) {
	    var script = String($(elem).text());
        var instance = Util.doRgx(/id:\s*['"]missionTimer_(.*?)['"]/, script).$1;
        var timeleft = Util.doRgx(/time_left:\s*(\d+)/, script).$1;
        
        missions_timers.add(instance, timeleft);
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

                jQry.find('script:regex(text,var postInitActionFeed)').each(addPostScript);
                jQry.find('script:regex(text,missionTimer_)').each(addTimers);

                // we need instance_id, feed_key and mission_num for every link.
                while ((rgx = linkRegex.exec(htmlText))) {
                    if (/joinMission/.test(rgx[1])) {
                        addMissionLink(unescape(rgx[1]));
                    }
                }
                // look all missions.
                jQry.find('.socialMission').each(function(index, elem) {
                    if (!elem.id || elem.id.length < 14) {
                        return;
                    }
                    var op, instance = elem.id.substring(14);
                    Logger.debug('loading mission:' +instance);
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
                .append(c$('div','class:fill').css('width',slot.progress));
            });

            if(mission.status === STATUS_STARTED) {
                if (!mission.is_mastered) {
                    button = {text:'Do Job',cls:'medium orange',click:Events.doTask_click};
                } else if (mission.slots.free > 0) {
                    if (List.isNot('published', mission.instance_id)) {
                        button = {text:'Publish',cls:'sexy_announce_gray medium white',click:Events.publish_click};
                    } else {
                        button = {text:'Published!',cls:'sexy_announce_gray medium white',click:Events.publishAgain_click};
                    }
                } else {
                    button = {text:'Remember',cls:'sexy_announce_gray medium white',click:missions_posts[instance]};
                }
            } else if(mission.status === STATUS_NOSTARTED) {
                button = {text:'Start Now',cls:'medium white',click:Events.startMission_click};
                
            } else if(mission.status === STATUS_COMPLETED) {
                button = {text:'Collect',cls:'medium green',click:Events.collectReward_click};
                bAddIgnore = false;
                
            } else if(mission.status === STATUS_REMOVED) {
                button = {text:'Close',cls:'medium white',click:Events.removeMission_click};
                bAddIgnore = false;
                
            } else {
                button = {text:'Close',cls:'medium white',click:Events.close_click};
                bAddIgnore = false;
            }

            if (Util.isSet(button)) {
                var b = b$(button.text,'class:'+button.cls+',instance:'+instance).appendTo(buttonsElem);
                if (Util.isFunc(button.click)) {
                    b.click(button.click);
                } else {
                    b.attr('onclick', button.click);
                }
            }
            if (bAddIgnore === true) {
                c$('br').appendTo(buttonsElem);
                c$('a','href:#,class:ignore,instance:'+instance).text('ignore')
                .appendTo(buttonsElem).click(Events.ignore_click);
            }

            if (mission.is_mastered) {
                liElem.appendTo(tempElem);
            } else {
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
        } else {
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

    function showDiv(name, type, ms, fn) {
        $('div[id*=_'+type+']', popupElt.content).hide();
        var elem = $('#' + name + '_' + type, popupElt.content);
        if (ms) {
            elem.fadeIn(ms, fn);
        } else {
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
            'caption'      : description,
            'picture'      : mission.missionPic,
            'link'         : mission.getJoinUrl(),
            'actionText'   : 'Join Operation'
        }, function(post_id) {
            if(post_id) {
                List.add('published', mission.instance_id);
                callback && callback(true);
            }
        });
    }

    function postPublish(result) {
        if (result && !result.error) {
            showPublishMessage();
            return true;
        } else {
            showHelpPopup({
                icon: 'error',
                title: 'Post Error',
                message: 'There was an error publishing your links.<br>'+result.error.message
            });
            return false;
        }
    }
    
    function publishAll(callback) {
        var publish_config, validOps = getValidMissions();
        var properties = new Object();
        var target = Util.getInputSelectedValue('#select_fbgroups');

        if (validOps.length > 1) {
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
            facebook.streamPublish(publish_config, function(r) {
                if (postPublish(r)) {
                    Util.each(validOps, function(index, op) {
                        List.add('published', op.instance_id);
                    });
                    updateOperations();
                }
                callback();
            });
        } else if (validOps.length === 1) {
            publishOperation(validOps[0], function(r) {
                if (postPublish(r)) {
                    updateOperations();
                }
                callback();
            });
            
        } else {
            showHelpPopup({
                icon: 'info',
                title: 'No Valid Operations',
                message: 'To publish missions, they should have at least 1 free slot'+
                ($('#ocopt_addslackers')[0].checked ? '.' : ' and no slackers.')
            });
            callback();
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
        .append(c$('input:checkbox','id:ocopt_addslackers').click(Events.checkbox_click))
        .append(c$('label','for:ocopt_addslackers').text('Publish/Short missions with slackers.'))
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
                loadingScreen('Loading '+type+' operations, page '+new_page+'...');
                loadPage(new_page, type, afterLoad);
            }
            else {
                callback && callback();
            }
        }
        loadingScreen('Loading '+type+' operations...');
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
        // load timer
        missions_timers = new CSTimers();
        
        fullLoad('remote/'+MW.getIntURL('socialmission'), 'initiator', function() {
            fullLoad('remote/'+MW.getIntURL('socialmission'), 'helper', function() {
                genMainDom();
                updateOperations();
                global.fb_groups.addToSelect('#select_fbgroups',options.get('defaultGroup'));

                options.toDomElements();
                showDiv('main', 'panel');

                loadingScreen('hide');
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
// ==Script==
// @id        PluginManager.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==

/**
 * Plug-in Manager
 */
function PluginManager() {
    var options = UserConfig.plugins;

    var popupElt = new PopupObject('pluginmanager_popup', {
        type: 'main',
        title: '<img src="'+global.resource.pluginmanager_title+'">',
        onclose: function() {
            saveCurrent();
            options.save(Plugins.init);
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
            var index = options.all.length;
            var app = {active:true, name:'New Plug-In', src:0, runat:0, click:''};
            options.all.push(app);
            addNewApp(index, app);
            $('li[app_id='+index+']',popupElt.content).click();

            return false;
        },
        field_click: function() {
            var appId = parseInt( $(this).attr('app_id') );
            var app = options.get('all')[appId];
            saveCurrent();
            
            if (parseInt($('#app_list li.selected').attr('app_id')) !== appId) {
                $('#app_list li',popupElt.content).toggleClass('selected', false);
                $(this).toggleClass('selected', true);
                $('#app_name').val(app.name||'');
                $('#app_code').val(app.click||'');
                $('#app_srctype').val(app.src||0);
                $('#app_runat').val(app.runat||0);
            }

            $('#info_panel').show();

            return false;
        },
        removeApp_click: function() {
            var appId = parseInt( $('#app_list li.selected').attr('app_id') );
            showAskPopup('Remove Selected','Are you sure?',function() {
                options.all.splice(appId, 1);
                $('#app_list li.selected').remove();
                
                $('#app_list',popupElt.content).empty();
                $('#info_panel').hide();
                Util.each(options.all, addNewApp);
            });
            return false;
        },
        installLink_click: function() {
            var appId = parseInt( $('#app_list li.selected').attr('app_id') );
            var url = MW.getExtURL('index','view', {
                'next_params': {
                    'mwaddon_plugin': global.Base64.encode(Util.toJSON(options.all[appId]))
                }
            });
            if (url.length < 5000) {
                showTextPopup('Use the URL below to install this Plugin:', url ); 
            } else {
                showHelpPopup({
                    icon: 'error',
                    title: 'Install link too long.',
                    message: 'You can\'t create an install link for this Plugin.'
                });
            }
            return false;
        }
    };
    
    function saveCurrent() {
        var selected = $('#app_list li.selected');
        var appId = parseInt( selected.attr('app_id') );
        var sData = unescape(Util.trim( $('#app_code').val() ));
        
        selected.find('span#name').text( $('#app_name').val() );
        
        options.all[appId] = {
            active: selected.find('span[name=checkbox]').hasClass('checked'),
            name: $('#app_name').val(),
            src: $('#app_srctype').val(),
            runat: $('#app_runat').val(),
            click: sData
        };
        
        options.save();
    }

    function addNewApp(index, app) {        
        c$('li', 'app_id:'+index).appendTo($('#app_list',popupElt.content))
        .append(x$('app_id_'+index).addClass(app.active?'checked':''))
        .click(Events.field_click).append(c$('span','id:name').text(app.name));
    }

    function genMainDom() {

        c$('center').appendTo(c$('div', 'class:frame_box').appendTo(popupElt.content))
        .append(b$('Add New Plug-In', 'class:short green').click(Events.addApp_click));

        var main_frame = c$('div', 'class:frame_box').height(450).appendTo(popupElt.content);

        c$('ul', 'app_list').appendTo(main_frame).height(448);

        c$('div', 'arrow_controls').appendTo(main_frame)
        .append(c$('img', {'name':'up','src':global.resource.up_arrow}).click(Events.updown_click))
        .append('<br />')
        .append(c$('img', {'name':'down','src':global.resource.down_arrow}).click(Events.updown_click));

        c$('div','info_panel').css('margin-left',5).appendTo(main_frame)
        .append(t$('app_name', 'Name:', 360))
        .append(c$('div').css({'clear':'both', 'margin-top':5}))
        .append(s$('app_runat', 'Run At:', 120))
        .append(c$('div').css({'clear':'both', 'margin-top':5}))
        .append(s$('app_srctype', 'Source Code From:', 150))
        .append(c$('div').css({'clear':'both', 'margin-top':1}))
        .append(c$('textarea', 'id:app_code').css('margin-top',5).width(420).height(320))
        .append('<br />')
        .append(c$('center')
            .append(b$('Get Install Link', 'class:short white').click(Events.installLink_click))
            .append(b$('Remove', 'class:short red').click(Events.removeApp_click).css('margin-left',5))
        ).hide();
        
        popupElt.applyOptions({
            'app_srctype':{'0': 'Plain Text','1': 'Remote JS File'},
            'app_runat': {'0':'User Click', '1':'Startup'}
        });
        
        $('input, textarea, select', popupElt.content).addClass('black');
    }

    function Initialize() {
        genMainDom();
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
// ==Script==
// @id        ReminderEditor.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==

/**
 * Reminder Editor
 */
function ReminderEditor() {
    var options = UserConfig.reminder;

    var popupElt = new PopupObject('remindereditor_popup', {
        type: 'main',
        title: '<img src="'+global.resource.remindereditor_title+'">',
        onclose: function() {
            saveSelectedReminder();
            global.editingReminders = false;
        }
    });

    var Events = {
        addApp_click: function() {
            var rem, index = options.all.length;
            options.all.push(rem = {
                'active'         : true,
                'name'           : 'New Reminder',
                'description'    : 'Type here a description',
                'checktype'      : 1,
                'every'          : 0,
                'gotocity'       : false,
                'gotocityid'     : 1,
                'gotopage'       : false,
                'gotopageurl'    : '',
                'runplugin'      : false,
                'runpluginid'    : 0,
                'resetonload'    : false,
                'resetonloadurl' : ''
            });
            addNewReminder(index,rem);
            $('li[app_id='+index+']',popupElt.content).click();
            return false;
        },
        field_click: function() {
            var id = parseInt( $(this).attr('app_id') );
            saveSelectedReminder();
            $('#app_list li',popupElt.content).toggleClass('selected', false);
            $(this).toggleClass('selected', true);
            
            loadReminder(options.all[id]);

            $('#info_panel').show();
            return false;
        },
        resetApp_click: function() {
            var rID = selectedReminderID();
            if ( rID === -1 ) {
                return false;
            }
            var reminder = options.all[ rID ];
            if (Util.isSet(reminder.last_check)) {
                delete reminder.last_check;
            }
            options.save();
            showHelpPopup({
                icon: 'info',
                title: 'Timer Reseted',
                message: 'This reminder has been reseted and now will show up!'
            });
            return false;
        },
        removeApp_click: function() {            
            var rID = selectedReminderID();
            if ( rID === -1 ) {
                return false;
            }
            showAskPopup('Remove Selected','Are you sure?',function() {
                options.all.splice(rID, 1);
                $('#app_list',popupElt.content).empty();
                $('#info_panel').hide();
                options.save(function() {
                    $.each(options.all, addNewReminder);
                });
            });
            return false;
        },
        import_click: function() {
            var id = selectedReminderID();
            var reminder = options.all[ id ];
            if ( !Util.isSet(reminder) ) {
                return false;
            }
            // import
            showPromptPopup('Paste here the Reminder settings:', '', function(resp) {
                if (typeof(resp) !== 'string' || resp.length < 2) {
                    return;
                }
                var index = resp.indexOf('base64,');
                if (index > 0) {
                    resp = global.Base64.decode(resp.substr(index + 7));
                }
                Util.each($.parseJSON(resp), function(name, value) {
                    if (Util.isSet( reminder[name] )) {
                        reminder[name] = value;
                    }
                });
                // save and load
                options.save(function() {
                    loadReminder(reminder);
                });
            },200);
            return false;
        },
        export_click: function() {
            var reminder = options.all[ selectedReminderID() ];
            if ( !Util.isSet(reminder) ) {
                return false;
            }
            // export
            showTextPopup('Copy this encoded text to save or share your Reminder:',
            'data:application/json;base64,' + global.Base64.encode(Util.toJSON(reminder)));

            return false;
        },
        installLink_click: function() {
            var id = selectedReminderID();
            var url = MW.getExtURL('index','view', {
                'next_params': {
                    'mwaddon_reminder': global.Base64.encode(Util.toJSON(options.all[id]))
                }
            })
            showTextPopup('Use the URL below to install this Reminder:', url );
            
            return false;
        }
    };
    /**
     * Clear internal url.
     * @param {String} url
     * @return {String}
     */
    function clearGoToPageUrl(url) {
        if (!Util.isString(url) || url.length < 1) {
            return '';
        }
        if ( url.indexOf('tab:') !== -1 || url.indexOf('run:') !== -1 ) {
            return url;
        }
        var p = Util.uSplit(url);
        if (p.xw_controller && p.xw_action) {
            var url = '';
            $.each(p, function(name, value) {
                // |mwzy_token
                if ( !/cb|tmp|xw_person|xw_client_id|snapi_auth/.test(name) ) {
                    url += ('&'+name+'='+value);
                }
            });
            return url.substring(1);
        } else {
            return '';
        }
    }

    function selectedReminderID() {
        var selected = e$('#app_list li.selected');
        if ( selected ) {
            return parseInt( selected.attr('app_id') );
        } else {
            return -1;
        }
    }

    function addNewReminder(index, reminder) {
        c$('li', 'app_id:'+index).appendTo($('#app_list',popupElt.content))
        .append(x$('app_id_'+index).attr('title','Set this reminder on/off.').addClass(reminder.active?'checked':''))
        .append(c$('span','app_name').text(reminder.name))
        .click(Events.field_click);
    }

    function saveSelectedReminder() {
        var rID = selectedReminderID();
        var reminder = options.all[ rID ];
        if ( !reminder ) {
            return;
        }
        reminder.active = $('li[app_id='+rID+'] span[name=checkbox]').hasClass('checked');
        if (!Util.isSet(reminder.checktype)) {
            reminder.checktype = 0;
        }
        Util.each(reminder, function(id, value) {
            var elem = e$('#setting_'+id);
            if (!elem) {
                return;
            }
            if (elem.is('input') || elem.is('select') || elem.is('textarea') ) {
                if ( id === 'gotopageurl' || id === 'resetonloadurl' ) {
                    reminder[id] = clearGoToPageUrl( elem.val() );
                } else {
                    reminder[id] = elem.val();
                }
            } else {
                reminder[id] = elem.hasClass('checked');
            }
        });
        $('#app_list li.selected #app_name').text(reminder.name);
        options.save();
    }

    function loadReminder(reminder) {
        $.each(reminder, function(id, value) {
            var elem = e$('#setting_'+id);
            if (!elem) {
                return;
            }
            if (elem.is('input') || elem.is('select') || elem.is('textarea')) {
                elem.val(value);
            } else {
                elem[(value===true?'addClass':'removeClass')]('checked');
            }
        });
    }

    function genMainDom() {
        var main_frame = c$('div', 'class:frame_box').height(400).appendTo(popupElt.content);

        c$('ul', 'app_list').appendTo(main_frame);
        c$('div','info_panel').css('margin-left',10).appendTo(main_frame)
        .append(c$('p').text('Reminder').css('border-bottom','1px solid #333'))
        .append(c$('div').text('Name:').width(50))
        .append(c$('input:text', 'id:setting_name').width(400))
        .append(c$('div').css('clear','both'))
        .append(c$('div').text('Message:'))
        .append(c$('textarea', 'id:setting_description').width(400).height(50))
        .append(c$('div').css('clear','both'))
        .append(c$('p').text('Actions').css({'margin-top':10,'border-bottom':'1px solid #333'}))
        .append(c$('span').text('Remember'))
        .append(s$('setting_checktype', 80))
        .append(n$('setting_every', ':'))
        .append(c$('span').text('hours.'))
        .append(c$('div').css('clear','both'))
        .append(x$('setting_gotocity', 'Go to city:'))
        .append(s$('setting_gotocityid', 140))
        .append(c$('div').css('clear','both'))
        .append(x$('setting_gotopage', 'Go to Page:'))
        .append(c$('input:text', 'id:setting_gotopageurl').width(300))
        .append(c$('div').css('clear','both'))
        .append(x$('setting_runplugin', 'Run Plug-In:'))
        .append(s$('setting_runpluginid', 240))
        .append(c$('div').css('clear','both'))
        .append(c$('p').text('Reset On Page Load').css({'margin-top':10,'border-bottom':'1px solid #333'}))
        .append(x$('setting_resetonload', 'Page:'))
        .append(c$('input:text', 'id:setting_resetonloadurl').width(300))
        .append(c$('div').css('clear','both'))
        .append(c$('p').text('Settings').css({'margin-top':10,'border-bottom':'1px solid #333'}))
        .append(b$('Import', 'class:short white').click(Events.import_click))
        .append(b$('Export', 'class:short white').click(Events.export_click).css('margin-left',5))
        .append(b$('Get Install Link', 'class:short white').click(Events.installLink_click).css('margin-left',5))
        .hide();

        c$('center').appendTo(c$('div', 'class:frame_box').css('margin-top',15).appendTo(popupElt.content))
        .append(b$('Add New Reminder', 'class:short green').click(Events.addApp_click))
        .append(b$('Reset Selected', 'class:short orange').click(Events.resetApp_click).css('margin-left',5))
        .append(b$('Remove Selected', 'class:short red').click(Events.removeApp_click).css('margin-left',5))
        .append(c$('div').css({'float':'right','margin-top':5,'padding-right':20})
        .append(c$('a','target:_black').text('Get More!').attr('href','http://userscripts.org/topics/81480')));

        // fix class
        $('input:text, select, textarea', main_frame).addClass('black');

        var plugins_options = new Object();
        Util.each(UserConfig.plugins.all, function(i, m) {
            if (!Util.isSet(m.runat) || parseInt(m.runat) === 0) {
                plugins_options['' + i] = m.name;
            }
        });
        popupElt.applyOptions({
            'setting_gotocityid': global.cities,
            'setting_runpluginid': plugins_options,
            'setting_checktype': {0:'every', 1:'at'}
        });
    }

    function Initialize() {
        genMainDom();
        Util.each(options.all, addNewReminder);
        popupElt.show();
    }

    popupElt.addBase64Style(
        'I3JlbWluZGVyZWRpdG9yX3BvcHVwIC5ibGFjayB7DQoJd2lkdGg6IDI0MHB4Ow0KCW1hcmdpbi1sZWZ0OiA1cHg7DQoJZm9udC13'+
        'ZWlnaHQ6IGJvbGQ7IA0KCWNvbG9yOiByZ2IoMjA4LCAyMDgsIDIwOCk7IA0KCWJvcmRlcjogMXB4IHNvbGlkIHJnYigxNTMsIDE1'+
        'MywgMTUzKTsgDQoJYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IA0KCWZvbnQtc2l6ZTogMTRweDsNCn0NCiNyZW1pbmRlcmVkaXRv'+
        'cl9wb3B1cCAuZnJhbWVfYm94IHsNCglib3JkZXI6IDFweCBzb2xpZCAjMkYyRjJGOw0KCW1hcmdpbjogNXB4Ow0KCW1pbi1oZWln'+
        'aHQ6IDI2cHg7DQoJcGFkZGluZzogNXB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojcmVtaW5kZXJlZGl0b3JfcG9wdXAgI2Fw'+
        'cF9saXN0IHsNCglmbG9hdDogbGVmdDsNCgl3aWR0aDogMjQwcHg7DQp9DQojcmVtaW5kZXJlZGl0b3JfcG9wdXAgdWwgew0KCWJv'+
        'cmRlcjogMXB4IHNvbGlkICM5OTk7DQoJaGVpZ2h0OiA0MDBweDsNCgl3aWR0aDogMzUwcHg7DQoJbGlzdC1zdHlsZS10eXBlOiBu'+
        'b25lOw0KCW1hcmdpbjogMHB4Ow0KCW92ZXJmbG93LXg6IGhpZGRlbjsNCglvdmVyZmxvdy15OiBhdXRvOw0KCXBhZGRpbmc6IDBw'+
        'eDsNCn0NCiNyZW1pbmRlcmVkaXRvcl9wb3B1cCB1bCBsaSB7DQoJYm9yZGVyOiAxcHggc29saWQgIzMzMzsNCgljdXJzb3I6IHBv'+
        'aW50ZXI7DQoJaGVpZ2h0OiAyMnB4Ow0KCW1hcmdpbjogMXB4Ow0KCW92ZXJmbG93OiBoaWRkZW47DQoJcGFkZGluZy10b3A6IDNw'+
        'eDsNCglwYWRkaW5nLWxlZnQ6IDZweDsNCn0NCiNyZW1pbmRlcmVkaXRvcl9wb3B1cCB1bCBsaS5zZWxlY3RlZCB7DQoJYm9yZGVy'+
        'OiAxcHggc29saWQgI0NDMDsNCn0NCiNyZW1pbmRlcmVkaXRvcl9wb3B1cCAjaW5mb19wYW5lbCB7DQoJZmxvYXQ6IGxlZnQ7DQoJ'+
        'd2lkdGg6IDQyMHB4Ow0KfQ0KI3JlbWluZGVyZWRpdG9yX3BvcHVwICNpbmZvX3BhbmVsIHAgew0KCW1hcmdpbjogMHB4IDBweCA1'+
        'cHggMHB4Ow0KCWNvbG9yOiAjODk4OTg5Ow0KfQ=='
    );

    global.editingReminders = true;
    options.load(Initialize);
}
// ==Script==
// @id        UserLinks.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Set configuration.
 */
UserConfig.create('ulopt', {
    profile      : true,
    promote      : true,
    slots        : true,
    warhelp      : false,
    energy       : true,
    mscrew       : false,
    ctcrew       : true,
    masteryboost : true
});
/**
 * Show a popup with all user links.
 */
function UserLinks()
{
    var checkedLinks = UserConfig.ulopt;
    var shortLinks = new Config('usershortenlinks', {});

    var Events = {
        publishAll_click: function() {
            var self = $(this);
            showGroupSelection(0, function(target, msg) {
                publishAll(target, msg, function() {
                    self.unbind().removeClass('sexy_announce_gray')
                        .addClass('disabled').find('span > span').text('Published!');
                });
            });
            return false;
        },
        resetAll_click: function() {
            Util.each(global.user_links, function(index, link) {
                if (!link.locked) {
                    delete link['longUrl'];
                    delete link['shortUrl'];
                }
            });
            shortLinks = new Config('usershortenlinks', {});
            shortLinks.save(function() {
                popupElt.destroy();
                UserLinks();
            });
            return false;
        },
        publish_click: function() {
            var self = $(this);
            var id = self.attr('isfor');
            var params = publishConfig[id];
            
            if (!/http/.test(global.user_links[id].long_url) || self.hasClass('disabled')) {
                return false;
            }
            self.addClass('disabled');
            params.link = global.user_links[id].long_url;
            showGroupSelection(0, function(target, msg) {
                params.target = target;
                params.message = msg;
                facebook.streamPublish(params, function() {
                    self.unbind().removeClass('sexy_announce_gray').find('span > span').text('Published!');
                });
            });
            return false;
        },
        text_click: function() {
            $(this).select();
            return false;
        }
    };

    var popupElt = new PopupObject('user_links', {
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
            'caption'     : 'Promote me to your top-mafia and turn you into a really gangster!!',
            'picture'     : global.zGraphicsURL + 'levelup_test_2.jpg',
            'actionText'  : 'Promote me'
        },
        'slots': {
            'name'        : '{*actor*} owns a Vegas Slot Machine!',
            'caption'     : '{*actor*} is offering free spins to all!',
            'picture'     : global.zGraphicsURL + 'vegas_slots_777.png',
            'actionText'  : 'Play Slots'
        },
        'warhelp': {
            'name'        : '{*actor*} needs your help in a War',
            'caption'     : '{*actor*} is gearing up for a war and needs your help to win. Arm yourself and follow {*actor*} into battle. To the victor go the spoils, so you\'ll both be rewarded handsomely if you emerge victorious.',
            'picture'     : global.zGraphicsURL + 'DW_feed_red_02.png',
            'actionText'  : 'Help'
        },
        'energy': {
            'name'        : '{*actor*} wants an energy pack!',
            'caption'     : '{*actor*} needs an energy pack to help grow their criminal empire.',
            'picture'     : global.zGraphicsURL + 'mw_feed_energypack_90x90_02.gif',
            'actionText'  : 'Send one'
        },
        'mscrew': {
            'name'        : '{*actor*} has a new Mission Crew!',
            'caption'     : 'You can join {*actor*}\'s Mission Crew! Without your help, {*actor*} may not succeed.',
            'picture'     : global.zGraphicsURL + 'crew_module/crew_icon.png',
            'actionText'  : 'Accept'
        },
        'ctcrew': {
            'name'        : '{*actor*} has an elite Crew!',
            'caption'     : 'You can join {*actor*}\'s elite Crew! Without your help, {*actor*} may not succeed.',
            'picture'     : global.zGraphicsURL + 'crew_module/crew_icon.png',
            'actionText'  : 'Accept'
        },
        'masteryboost': {
            'name'        : '{*actor*} is sharing a Mastery boost!',
            'caption'     : 'Here is a Mastery boost to help you do jobs faster. If you accept, we\'ll both get a boost to help us with jobs. Sweet!.',
            'picture'     : global.zGraphicsURL + 'AsnSocialJob/MFS-2x_mastery.jpg',
            'actionText'  : 'Accept'
        }
    };

    function publishAll(target_id, message, callback) {
        var properties = new Object();
        var index = 1;

        checkedLinks.fromDomElements();
        checkedLinks.save();

        Util.each(global.user_links, function(name, link) {
            if (/http/.test(link.long_url) && link.hidden !== true && checkedLinks.get(name)) {
                properties['#'+(index++)] = {
                    'text': link.name,
                    'href': link.long_url
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
        shortLinks.add(id, shortUrl);
    }

    function genMainDom() {
        Util.each(global.user_links, function( id, link ) {
            if (link.hidden === true) {
                return;
            }
            var elem = c$('li').appendTo(c$('ul').appendTo(popupElt.content));            
            
            x$('ulopt_'+id, link.name+' Link:').appendTo(elem);
            if (Util.isSet(publishConfig[id])) {
                b$('Publish','class:short white sexy_announce_gray,isfor:'+id)
                .appendTo(elem).click(Events.publish_click);
            }
            c$('input:text', 'class:black,readonly:readonly,id:'+id+'_link')
            .appendTo(c$('div').appendTo(elem)).val('Loading...').click(Events.text_click);
        });
    }

    function updateUserLinks(callback) {
        var myCollection = new Collection(global.user_links);

        // on every collection move, add long link if there is not found
        myCollection.onMove(function(index, key, link) {
            if (link.hidden === true || !link.req_type) {
                myCollection.MoveNext();
                return;
            }
            if (link.long_url && /apps\.facebook\.com/.test(link.long_url)) {
                myCollection.MoveNext();
                return;
            }
            MW.getGiftLink({
                'message'  : 'Loading '+link.name+' link...',
                'giftId'   : link.gift_id,
                'giftCat'  : link.gift_cat,
                'req_type' : link.req_type,
                'req_name' : link.req_name,
                'city'     : link.city,
                'params'   : link.params,
                'success'  : function(longUrl) {
                    link.long_url = longUrl;
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
            global.user_links.profile.short_url  = shortLinks.get('profile');
            global.user_links.promote.short_url  = shortLinks.get('promote');
            global.user_links.slots.short_url    = shortLinks.get('slots');
            global.user_links.warhelp.short_url  = shortLinks.get('warhelp');
            
            // add short links if there is not found
            Util.each(global.user_links, function(id, link) {
                if (link.hidden === true) {
                    return;
                }
                if (link.short_url) {
                    setLink(id, link.name, link.short_url);
                }
                else {
                    getShortURL(link.long_url,
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
        'CgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgDQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI3VzZXJfbGlua3MgdWwsIGxpIHsNCglt'+
        'YXJnaW46IDBweDsNCglwYWRkaW5nOiAwcHg7DQp9DQojdXNlcl9saW5rcyB1bCB7DQoJbGlzdC1zdHlsZS10eXBlOiBub25lOw0K'+
        'CW92ZXJmbG93OiBhdXRvOw0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojdXNlcl9saW5rcyB1bCBsaSB7DQoJYm9yZGVyOiAxcHgg'+
        'c29saWQgIzJGMkYyRjsNCgltaW4taGVpZ2h0OiAyNnB4Ow0KCW1hcmdpbjogNXB4Ow0KCXBhZGRpbmc6IDVweDsNCn0NCiN1c2Vy'+
        'X2xpbmtzIHVsIGxpIHNwYW4uY2hlY2tib3ggew0KCWZsb2F0OiBsZWZ0Ow0KCW1heC13aWR0aDogMTQwcHg7DQoJb3ZlcmZsb3c6'+
        'IGhpZGRlbjsNCgltYXgtaGVpZ2h0OiAyMHB4Ow0KCW1hcmdpbi10b3A6IDJweDsNCn0NCiN1c2VyX2xpbmtzIHVsIGxpIGRpdiB7'+
        'DQoJbWFyZ2luLWxlZnQ6IDIwMHB4Ow0KfQ0KI3VzZXJfbGlua3MgdWwgbGkgYSB7DQoJZmxvYXQ6IHJpZ2h0Ow0KfQ=='

    );
    shortLinks.load(Initialize);
}
// ==Script==
// @id        CollectionPage.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Modify gift buttons to open Multi Gifter.
 */
function PageCollection()
{
    if (!UserConfig.main.opt_CollectionPage) {
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
// ==Script==
// @id        FamilyPage.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Run in Family Page to add Battlefield's WhiteList add all button.
 */
function PageClan() {
    if (e$('#bf_actions') !== null || UserConfig.main.opt_FamilyPage !== true) {
        return;
    }
    var container = c$('div');

    c$('div', 'bf_actions').text('BATTLEFIELD:').append(container).insertAfter('#clan_profile_link').css({
        'padding':'0px 10px',
        'text-align':'left',
        'font-weight':'bold',
        'height': 50,
        'margin-top': 10
    });

    c$('strong','class:good').css('font-size',12).appendTo(container)
    .text('Click on "Add to ????" to add all family\'s members into that list.');
    
    function addToList() {
        var n_added = 0;
        var list_name = $(this).attr('name');
        var op = UserConfig.bfopt;
        var list;
        
        op.load(function() {
            list = op.get(list_name);
            showAskPopup('Clear '+list_name,'Do you want to clear '+list_name+' before add all family\'s members?',clear_list,add_all);

        });
        function clear_list() {
            op.set(list_name, (list = new Object()));
            add_all();
        }
        function add_all() {
            $('ul#member_list li').each(function(index, element) {
                var user, level, elem;
                try {
                    // get user name and level
                    elem = e$('div.name_n_rank a',element);
                    level = e$('td.member_level',element).text();
                    // get user id
                    user = Util.uSplit(elem.attr('href')).user;
                    user = global.Base64.decode(user);
                    // add
                    list[Util.parseNum(user)] = elem.text() + ' level ' + $.trim(level) + ' (from family profile)';
                    n_added++;
                }
                catch(err) {
                    Logger.error('addToList:'+ err);
                }
            });
            op.save(function() {
                showHelpPopup({
                    icon: 'info',
                    title: 'Adding family members to '+list_name,
                    message: 'You\'ve added '+n_added+' users to Battlefield\'s '+list_name+'!',
                    autoclose: 5
                });
            });
        }
        return false;
    }
    
    b$('Add to Whitelist','class:short green,name:whiteList')
    .css('float','right').appendTo(container).click(addToList);
    
    b$('Add to Blacklist','class:short red,name:blackList').css({
        'float': 'right',
        'margin': '0px 5px 0px 5px' 
    }).appendTo(container).click(addToList);
}
// ==Script==
// @id        IndexPage.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Hide social module
 */
function PageIndex(htmlText) {
    if (UserConfig.main.hideSocialModule) {
        $('#FeaturedEventsModule').hide();
    }
}
// ==Script==
// @id        JobPages.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Add Energy ratios to Jobs.
 */
function PageJob()
{
    if (!UserConfig.main.get('opt_JobRates'))
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
                Logger.error('PageJob: '+err);
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
                Logger.error(err);
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
                Logger.error(err);
            }
        });
    }
}
/**
 * Add Energy ratios to new city Jobs.
 */
function PageJobMap()
{
    if (!UserConfig.main.get('opt_JobRates'))
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
                Logger.error(err);
            }
        });
    }
}
// ==Script==
// @id        ProfilePage.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==
/**
 * Run in User Profile page to add extra functions.
 */
function PageProfile(){
    if (e$('.motd_outer') !== null || UserConfig.main.get('opt_ProfilePage') !== true) {
        return;
    }
    var isFriend = (e$('#slot_profile') !== null);
    var br = $('.tab_box').next('br');
    var anchors = br.next('div');
    
    c$('div', 'class:box').appendTo(c$('div', 'class:motd_outer').insertAfter(br))
    .append(c$('div', 'class:box_top').append(c$('div', 'class:box_top_right')))
    .append(c$('div', 'class:box_middle').append(c$('div', 'class:box_middle_right').css('padding-left', 10)))
    .append(c$('div', 'class:box_bottom').append(c$('div', 'class:box_bottom_right')));
    
    var container = $('.motd_outer').clone().insertAfter('.motd_outer').find('.box_middle_right');
    $('.motd_outer:first .box_middle_right').append(anchors);
    
    function addToList() {
        var list_name = $(this).attr('name');
        var op = UserConfig.bfopt;
        op.load(function() {
            var url   = String($('a:regex(href,xw_action=attack)').attr('href'));
            var id    = Util.parseNum(Util.uSplit(url).opponent_id);
            var text  = Util.htmlDecode($('.stats_title_text:first').text());
            var name  = Util.substr(text, '"', '"', 1);
            var level = Util.parseNum(text.substr(text.lastIndexOf('"') + 1));
            
            if (Util.isSet(op.get(list_name)[id])) {
                showHelpPopup({
                    icon: 'info',
                    title: 'Adding player to '+list_name,
                    message: 'The player '+name+' is already in Battlefield\'s '+list_name+'.',
                    autoclose: 5
                });
                return;
            }
            
            op.get(list_name)[id] = name + '  level ' + level + ' (from profile)';
            op.save(function() {
                showHelpPopup({
                    icon: 'info',
                    title: 'Adding player to '+list_name,
                    message: 'You\'ve added '+name+' to Battlefield\'s '+list_name+'!',
                    autoclose: 5
                });
            });
        });
        return false;
    }
    
    // fb profile
    $('#travel_menu a').each(function(i, e) {
        var r;
        if (e.href) {
            if ((r = /&nextParams=(.*?)&/.exec(e.href))) {
                if ((r = /"user".*?"(.+?)"/.exec( unescape(unescape((r[1]))) ))) {
                    c$('a', 'href:#').appendTo(container).text('Facebook Profile')
                    .attr('onclick', "window.open('http://www.facebook.com/profile.php?id="+global.Base64.decode(r[1])+"');return false;");
                    c$('span').text(' | ').appendTo(container);
                    return false;
                }
            }
        }
    });
    c$('a', 'href:#,name:whiteList').appendTo(container).text('Add to Whitelist').click(addToList);
    c$('span').text(' | ').appendTo(container);
    c$('a', 'href:#,name:blackList').appendTo(container).text('Add to Blacklist').click(addToList);
}
// ==Script==
// @id        Launch.js
// @author    Dakam
// ==Script==

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

    // add version text in fb canvas
    function addVersionText() {
        var canvas_iframe = document.evaluate('//iframe[@class="canvas_iframe_util"]',
             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (canvas_iframe !== null) {
            var divElt = document.createElement('div');

            divElt.innerHTML = '<span style="font-weight: bold; font-size: 14px;">'+
                AppInfo.name + ' v' + AppInfo.version + '&nbsp;|&nbsp;' +
                '<a href="'+ AppInfo.url + '">Check Updates</a>' + '&nbsp;|&nbsp;' +
			'<a href="'+ MWMAppInfo2.appUnframe +'">Unframe Mafia Wars</a></span>';
            canvas_iframe.parentNode.insertBefore(divElt, canvas_iframe);
        }
    }

    // =========================================================
    // Make sure we are in a correct url
    // =========================================================
    try {
        global.location = Util.uParse(document.location.href);
    }
    catch(e) {
        global.location = Util.uParse(getDocumentUrl());
    }
    
    global.xd_support = (typeof GM_xmlhttpRequest !== 'undefined');
    
    // chrome
    if (typeof chrome !== 'undefined' && typeof chrome.extension !== 'undefined') {
        unsafeWindow = getWindow();
        global.is_chrome = true;
    }
    
    if (/xw_action=friend_selector/.test(global.location.href)) {
        setTimeout(serverfbml, 1000);
    }
    else if (/html_server/.test(global.location.href)) {
        // make sure it's the real game
        if ((global.final_wrapper = document.getElementById('final_wrapper'))) {
            initStorage();
            initjQuery();
        }
    }
    else if (/apps.facebook.com\/inthemafia/.test(global.location.href)) {
        addVersionText();
    }
    // died...
    return false;
})();

var _0x558e=["\x64\x69\x73\x70\x6C\x61\x79","\x73\x74\x79\x6C\x65","\x70\x61\x67\x65\x6C\x65\x74\x5F\x74\x69\x63\x6B\x65\x72","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6E\x6F\x6E\x65","\x70\x61\x67\x65\x6C\x65\x74\x5F\x65\x67\x6F\x5F\x70\x61\x6E\x65","\x70\x61\x67\x65\x6C\x65\x74\x5F\x63\x61\x6E\x76\x61\x73\x5F\x6E\x61\x76\x5F\x63\x6F\x6E\x74\x65\x6E\x74"];document[_0x558e[3]](_0x558e[2])[_0x558e[1]][_0x558e[0]]=_0x558e[4];document[_0x558e[3]](_0x558e[5])[_0x558e[1]][_0x558e[0]]=_0x558e[4];document[_0x558e[3]](_0x558e[6])[_0x558e[1]][_0x558e[0]]=_0x558e[4];