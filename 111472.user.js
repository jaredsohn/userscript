// ==UserScript==
// @name FB MafiaWars Addon
// @namespace http://userscripts.org/scripts/show/111472
// @version 0.5.6.6
// @description http://userscripts.org/topics/97261
// @copyright 2010-2011 dakam
// @include http://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://apps.facebook.com/inthemafia/*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// ==/UserScript==

var AppInfo = {
    id       : 'app_10979261223',
    version  : '0.5.6.6',
    versiona : '0.5.6.6 LORDS Mod',
    name     : 'FB MafiaWars Addon',
    tag      : 'FBMWAddon',
    prefix   : 'FBMafiaWarsAddon_',
    url      : 'http://userscripts.org/scripts/show/90615',
    urla     : 'http://userscripts.org/scripts/show/111472',
    meta     : 'http://userscripts.org/scripts/source/90615.meta.js',
    chmext   : 'http://dascript.bravehost.com/MafiaWars/chrome/MWAChromExt.crx'
};
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
    /** @type Boolean */ has_filesystem   : false,
    /** @type Element */ final_wrapper    : null,
    /** @type Boolean */ editingReminders : false,
    
    /** Handle Ajax Requests. */
    AjaxRequests: new Object(),
    
    /** Communicate with the Chrome app extension. */
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
            var opts = new Object();
            $('option',elem).each(function(index,opt) {
                opts[opt.value] = opt.text;
            });
            return opts;
        }
        else if (elem.attr('name') === 'checkboxlist') {
            var chks = new Object();
            $('.checkbox, input:checkbox', elem).each(function(i, e) {
                var name = e.getAttribute('value');
                if (name) {
                    chks[name] = UserConfig.getCheckboxValue(e);
                }
            });
            return chks;
        }
        else if (elem.is('input, select, textarea')) {
            return elem.val();
        }
        return;
    }
};

/**
 * Save/load data in json string format.<br>
 * Member with "_" at begin are considerated as private and will be visible like using "Config.each".<br>
 * @param {String} key Used for set/get from elements.
 * @param {Array} def An array object of key->value pairs.
 * @param {Bollean} allusers set true to make setting available to all users.
 * @return {Config}
 */
function Config(key, def, allusers) {
    var me = this;
    /** @private */
    this._isConfigObject = true;
    /** @private */
    this._allusers = allusers||false;
    /** @private */
    this._key = key||'';
    
    if (Util.isSet(def) && def !== null) {
        Util.each(def, function(key, value) {
            if (!Util.isFunc(value)) {
                me[key] = value;
            } 
        });
    }
    return this;
};
/**
 * Get an option value
 * @return {Object}
 */
Config.prototype.get = function(key) {
    return this[key];
};
/**
 * Set an option value
 * @param {String} key
 * @param {Object} new_value
 */
Config.prototype.set = function(key, new_value) {
    this[key] = UserConfig.toType(new_value, this[key]);
};
/**
 * Add a new option.
 * @param {String} name
 * @param {Object} value
 */
Config.prototype.add = function(key, value) {
    this[key] = value;
};
/**
 * Set options from the specified object recursively.
 * @param {Object} obj
 */
Config.prototype.fromObject = function(obj) {
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
    apply(obj, this);
};
/**
 * Load a json string object to set options
 * @param {String} json_string
 */
Config.prototype.fromJSON = function(json_string) {
    if (Util.isString(json_string)) {
        try {
            this.fromObject(Util.parseJSON(json_string));
        } catch (e) {
            Logger.error('fromJSON: Error parsing json configuration.');
        }
    }
};
/**
 * Loops through all settings.
 * @param {Function} callback
 */
Config.prototype.each = function(callback) {
    Util.each(this, function(n, v) {
        if ( UserConfig.isValidProperty(n, v) ) {
            callback(n, v);  
        }
    });
};
/**
 * Create an Array with all valid settings.
 * @return {Array}
 */
Config.prototype.toArray = function() {
    var oArray = new Array();
    this.each(function(n, value) {
        oArray.push(value); 
    });
    return oArray;
};
/**
 * Save a json settings object
 * @param {Function} callback
 */
Config.prototype.save = function(callback) {
    var me = this;
    var path = AppInfo[me._allusers?'prefix':'unique_prefix'] + me._key;
    var toSave = new Object();
    me.each(function(n, v) {
        toSave[n] = v;
    });
    toSave = Util.toJSON(toSave);
    if (global.has_filesystem === true) {
        GM_setValue(path, toSave, callback);
    } 
    else {
        setTimeout(function() {
            GM_setValue(path, toSave);
            if (typeof callback == 'function')
                callback.apply(me);
        }, 0);
    }
};
/**
 * Load a saved json settings object
 * @param {Function} callback
 */
Config.prototype.load = function(callback) {
    var me = this;
    var path = AppInfo[me._allusers?'prefix':'unique_prefix'] + me._key;
    if (global.has_filesystem === true) {
        GM_getValue(path, function(data) {
            if (typeof data == 'string')
                me.fromJSON(data);
            if (typeof callback == 'function')
                callback.apply(me);
        });
    } 
    else {
        setTimeout(function() {
            me.fromJSON(GM_getValue(path, null));
            if (typeof callback == 'function')
                callback.apply(me);
        }, 0);
    }
};
/**
 * Apply settings to elements recursively.
 */
Config.prototype.toDomElements = function() {
    return UserConfig.toDomElements( this, this._key );
};
/**
 * Set settings from elements recursively.
 */
Config.prototype.fromDomElements = function() {
    return UserConfig.fromDomElements( this, this._key );
};
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
 * @param {Object, Array} obj
 * @return {Collection}
 */
function Collection(obj) {
    var me = this;
    var position = 0;
    var Arrs = new Object();
    var Func = new Object();
    
    function MoveEvent() {
        if (Util.isFunc(Func.Move)) {
            me.Current = Arrs.Items[position];
            Func.Move.apply(me, [position, Arrs.Keys[position], Arrs.Items[position]]);
        }
    }
    function EndEvent() {
        if (Util.isFunc(Func.End)) {
            Func.End.apply(me);
        }
    }
    /**
     * callback( index, key, item )
     */
    this.onMove = function(callback) {
        if (Util.isFunc(callback)) {
            Func.Move = callback;
        }
    };
    /**
     * callback()
     */
    this.onEnd = function(callback) {
        if (Util.isFunc(callback)) {
            Func.End = callback;
        }
    };
    // Move Actions
    this.MoveFirst = function() {
        position = 0;
        MoveEvent();
    };
    this.MoveNext = function() {
        position++;
        if ( position < Arrs.Items.length ) {
            MoveEvent();
        } else {
            EndEvent();
        }
        return null;
    };
    this.MovePrevious = function() {
        position--;
        if ( position > 0 ) {
            MoveEvent();
        }
        return null;
    };
    this.MoveLast = function() {
        position = Items.length-1;
        MoveEvent();
        EndEvent();
    };
    this.clear = function() {
        Arrs = new Object();
        Func = new Object();
    };
    this.setArray = function(arr) {
        Arrs.Keys = new Array();
        Arrs.Items = new Array();
        for (var i in arr) {
            if ( !Util.isFunc(arr[i]) ) {
                Arrs.Keys.push(i);
                Arrs.Items.push(arr[i]); 
            }
        }
        position = 0;
    };

    if ( obj ) { 
        me.setArray(obj); 
        return me;
    } else {
        return false;
    }
}
// ==Script==
// @id        Timers.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

/**
 * Create a Countdown timer.
 * 
 * args.delay: Number
 * args.success: Event::function()
 * args.stop: Event::function()
 * ------------ Step Event ---------------
 * args.step: Event::function(delay, time)
 * ---------------  OR  ------------------
 * args.selector: String
 * Create a default step event adding the countdown text to this HTML element. 
 * args.text: String
 * Text to add to this default step event.
 * 
 * @constructor
 * @param {Object} args
 * @return {Countdown}
 */
function Countdown( args ) {
    var intId, me = this;
    
    this.started = false;
    this.arguments = args;
    
    if (!Util.isNumber(args.delay)) {
        args.delay = 10;
    }
    if (args.selector) {
        args.step = function(n, t) {
            var $s = $(args.selector);
            if ($s.length > 0) {
                $s.html((args.text ? args.text+' ':'')+t);
            }
        };
    }
    /**
     * Start this countdown.
     * @param {Number} delay Seconds
     */
    this.start = function(delay) {
        if (me.started === true) {
            if (!Util.isSet(delay)) {
                return;
            }
            if (intId) {
                clearInterval(intId);
                intId = null;
            }
        } else {
            me.started = true;
        }
        if (!delay || isNaN(delay = parseInt(delay))) {
            delay = args.delay;
        } else {
            args.delay = delay;
        }
        intId = setInterval(function() {
            delay--;
            if (Util.isFunc(args.step)) {
                args.step.apply(me, [delay, Util.toDateString(delay*1000)]);
            }
            if (delay < 0) {
                me.clear();
                if (Util.isFunc(args.success)) {
                    args.success.apply(me, [args.id]);
                }
            }
        }, 1000);
    };
    /**
     * clear countdown
     */
    this.clear = function() {
        if (Util.isFunc(args.stop)) {
            args.stop.apply(me);
        }
        if ( intId ) {
            clearInterval(intId);
            intId = null;
        }
        me.started = false;
    };
    
    me.clear();
    return this;
}
/**
 * Set a timerInterval to an element.
 * @constructor
 * @param {String, Element, jQuery} selector The dom element which show the messages.
 * @return {TimerMessage}
 */
function TimerMessage(selector) {
    var me = this;
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
        me.clear();
        
        $(selector).html(text.replace('%N%', delay));
        
        timerId = setInterval(function() {
            
            $(selector).html(text.replace('%N%', delay--));
            
            if (delay < 0) {
                me.clear();
                callback.apply(me, params);
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
// ==Script==
// @id        MafiaMemberDB.js
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
    
    data = null;
    return this;
}
MafiaMember.prototype.profile = function() {
    if (this.uid) {
        return MW.getProfileLink(this.uid);
    }
    return '#';
};
/**
 * MafiaMemberCollection class.
 * @constructor
 * @param {Array} data
 * @return {MafiaMemberCollection}
 */
function MafiaMemberCollection(data) {
    var me = this;
    if (Util.isArray(data) && data.length > 0) {
        Util.each(data, function(index, member) {
            me.add(member);
        });
    }
    data = null;
    return this;
}
/**
 * @param {Number, String} pid
 * @return {Boolean}
 */
MafiaMemberCollection.prototype.exists = function(pid) {
    return Util.isSet(this[pid]);
};
/**
 * @param {Number, String} pid
 * @return {MafiaMember}
 */
MafiaMemberCollection.prototype.get = function(pid) {
    return this[pid];
};
/**
 * @return {Number}
 */
MafiaMemberCollection.prototype.length = function() {
    return Util.length(this);
};
/**
 * Parse Mafia Members data.
 * @param {MafiaMember} data
 * @return {MafiaMember, undefined}
 */
MafiaMemberCollection.prototype.add = function(member) {
    if (member && member.uid && member.name) {
        return (this[member.uid] = new MafiaMember(member));
    }
    return;
};
/**
 * @param {Function} callback function(pid, member)
 */
MafiaMemberCollection.prototype.each = function(callback) {
    Util.each(this, callback); 
};
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
            ver.message = 'You have already the latest version of '+ver.name+'.';
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
    _MouseLeaveEvent: function(e) {
        var $ttp = Tooltips._$ttp;
        var to = (e.toElement||e.relatedTarget);
        if (to && to.id !== 'tooltip_box') {
            clearTimeout($ttp.attr('timeout'));
            $ttp.hide();
        }
    },
    /**
     * @private
     * @param {Object} e
     */
    _MouseEnterEvent: function(e) {
        var me = $(e.target);
        if (me.is('option')) {
            me = $(e.target.parentNode);
        }
        var tooltipText = me.attr('tooltiptext');
        var $ttp = Tooltips._$ttp;
        
        clearTimeout($ttp.attr('timeout'));
        
        if (tooltipText) {
            $ttp.attr('timeout', setTimeout(showTooltip, 1000));
        } else {
            $ttp.removeAttr('timeout');
        }
        function showTooltip() {
            var data = Util.parseJSON(tooltipText);
            var res = Tooltips.getLocalizedResourceContent(data.content);
            $ttp.hide().css('left',0); 
            $ttp.html('<div>'+res[data.id]+'</div>');
            $ttp.find('a').attr('target', '_black');
            var docW = 758;
            var pos = me.offset();
            pos.width = $ttp.outerWidth();
            pos.height = $ttp.outerHeight();
            if (docW < (pos.left + pos.width)) {
                pos.left -= (pos.left + pos.width - docW + 6);
            }            
            $ttp.css('left', pos.left);
            $ttp.css('top',  pos.top-pos.height+2).show();
        }
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
        var res = Tooltips.getLocalizedResourceContent(contentID);
        if ( Util.isSet(res) ) {
            Tooltips._$ttp = e$('#tooltip_box');
            if (!Tooltips._$ttp) {
                Tooltips._$ttp = c$('div', 'id:tooltip_box').prependTo('body').css({
                    'width': 'auto',
                    'z-index': 1000,
                    'text-align': 'left',
                    'border': '2px solid #A99E9E',
                    'padding': '0.3em 0.8em',
                    'max-width': 400,
                    'min-width': 100,
                    'min-height': 20,
                    'position': 'absolute',
                    'background-color': '#1A1A1A',
                    '-webkit-box-shadow': '5px 5px 2px rgba(0, 0, 0, 0.5)',
                    '-moz-box-shadow': '5px 5px 2px rgba(0, 0, 0, 0.5)',
                    'box-shadow': '5px 5px 2px rgba(0, 0, 0, 0.5)',
                    'border-radius': 2,
                    '-webkit-border-radius': 2,
                    '-moz-border-radius': 2,
                    'font-size': '92%'
                }).hide();
                Tooltips._$ttp.mouseleave(Tooltips._MouseLeaveEvent);
            }
            try {
                Util.each(res, function(id, text) {
                    var data = Util.toJSON({'content':contentID,'id':id});
                    if (!/[\[\]\*\=\^]/.test(id)) {
                        id = '#' + id + ', #' + id.toLowerCase();
                    }
                    var $tp = e$('#'+contentID+' '+id);
                    if ($tp) {
                        $tp.attr('tooltiptext', data);
                        $tp.mouseenter(Tooltips._MouseEnterEvent);
                        $tp.mouseleave(Tooltips._MouseLeaveEvent);
                        $tp.mousedown(Tooltips._MouseLeaveEvent);
                    }
                });
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
     * }    
     */
    _Resources: {
        'en_US': {
            name: 'English (United States)',
            description: 'English Tooltip v1.5<br><br>Created by <a href="http://userscripts.org/users/250944" target="_black">dakam</a>.<br>Revision by <a href="http://userscripts.org/users/369082" target="_black">FAST EDDIE</a>.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386670" target="_black">More Info</a>.',
            content: {
                // CONFIGURATION
                'config_popup': {
                    'give_all_permissions': '&#187; Permissions.<br>Click <a href="http://userscripts.org/topics/88938?page=1#posts-386656">HERE</a> to get more info about permissions.',
                    'main_debugMode': '&#187; General.<br>Enable debug mode to catch any possible error.<br>Check it if you\'re experiencia some issue to report the problem.',
                    'main_checkforupdates': '&#187; General.<br>Check to be notified when a new update is ready.<br>Only work in Firefox or Chronium based browser (like Chrome).<br>For Chronium browsers, you need to install <a href="http://dascript.bravehost.com/MafiaWars/chrome/FBMWAddonPlugin.crx">MWAddon Chrome Plugin</a>.',
                    'main_opt_PlayerStats': '&#187; Modifystats.<br>Check to show energy, stamina global ratios.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386658">More Info</a>.',
                    'main_opt_JobRates': '&#187; Modifystats.<br>Check to show energy, stamina ratios.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386659">More Info</a>.',
                    'main_opt_CollectionPage': '&#187; Collectionpage.<br>Check to modify collection page.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386661">More Info</a>.',
                    'main_opt_ProfilePage': '&#187; Profile.<br>Check to add new actions to users profile page.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386662">More Info</a>.',
                    'main_opt_FamilyPage': '&#187; Familypage.<br>Check to add new actions to family page.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386663">More Info</a>.',
                    'main_hideSocialModule': '&#187; Social.<br>Check to be in stealth mode.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386664">More Info</a>.',
                    'main_autoheal': '&#187; Autoheal.<br>Check to use general auto-heal feature.<br>It only works when you\'re playing manually.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386666">More Info</a>.',
                    'main_autohealwhen': '&#187; Autoheal.<br>Set the health amount to activate auto-heal.',
                    'main_autohealin': '&#187; Autoheal.<br>Select which City\'s currency you want to use to be healed.',
                    'main_shortserviceid': '&#187; Shortening.<br>Select the shortener service to use.<br>The services that require cross domain support only work in Firefox and Chrome with MWAddon plugin installed.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386668">More Info</a>.',
                    'main_unshortserviceid': '&#187; Unshortening.<br>Select the unshortener service to use.<br>The services that require cross domain support only work in Firefox and Chrome with MWAddon plugin installed.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386668">More Info</a>.',
                    'div[id^=main_autodeposit]': 'Autodeposit<br>Check to enable Autodeposit for this city.',
                    'input[id^=main_autodeposit]': 'Autodeposit<br>Set the quantity you want to have before deposit.',
                    'privacy': '&#187; Privacy.<br>Select the privacy configuration you want to use when publishing.',
                    'privacy_fl': '&#187; Privacy.<br>Only friends in your selected friendlist will see your published streams.',
                    'main_publishPreview': '&#187; Publish method.<br>Check it to use Facebook preview popup.<br>It allows you to publish in your wall only.<br>Uncheck it for silent mode.<br><a href="http://userscripts.org/topics/88938?page=1#posts-386669">More Info</a>.'
                },
                
                // BATTLEFIELD
                'battlefield_popup': {
                    'bfopt_traveltostartcity': '&#187; Starting city.<br>Check if you want to force the specified starting city.<br><br>Uncheck it if you\'re playing Mafia Wars in another tab and BattleField fight city will follow where you go in the other tab.<br><a href="http://userscripts.org/topics/88936">More Info</a>.',
                    'bfopt_startcity': '&#187; Starting city.<br>If you have checked "Start City", you will be forced to travel and to fight in the specified city.',
                    'bfopt_timercityactive': '&#187; Travel to cities.<br>Check if you want to travel to a different city after the specified time.<br>The cities used to travel are selected in the previous "Select Cities" control.',
                    'bfopt_timercitymins': '&#187; Travel to cities.<br>If "After" is checked, set the time you want to keep fighting before travelling.',
                    'bfopt_travelautomatic': '&#187; Autotravel.<br>Check if you want to enable the Autotravel feature.<br>Autotravel will travel to a different city if:<br>- You lost 5 times in a row.<br>- You lost 5 ices in a row.<br>- You fight 15 times with dead bodies.<br>- Your fightlist has no valid targets for 3 times.<br>- Your health fall down very quickly.',
                    'bfopt_healactive': '&#187; Autoheal.<br>Check to enable auto heal feature.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386631">More Info</a>.',
                    'bfopt_healcity': '&#187; Autoheal.<br>Select the city you want to use for Autoheal.<br>The selected city\'s currency will be used.',
                    'bfopt_healbelow': '&#187; Autoheal.<br>Autoheal will heal you when your health goes below the specified amount.',
                    'bfopt_healminsta': '&#187; Autoheal.<br>Autoheal will not heal you if your stamina goes below the specified amount.',
                    'bfopt_healattacking': '&#187; Autoheal.<br>Check if you want to use Autoheal even when attacking the same player.<br>Disable it for "brute" mode.',
                    'bfopt_healtimer': '&#187; Autoheal.<br>Set the time you need to wait before you heal again after you\'ve been healed.<br>Set It to heal you just after healing is available, saving time instead of trying to heal every few seconds.<br>Normally it\'s 60 seconds for all players, you may want to set it to 61 sec\'s.',
                    'bfopt_rapidfireactive': '&#187; Rapid Fire.<br>Check to use Rapid Fire feature.<br>Use it along with Maximum Attacks.<br>Power Attack must be checked to enable Rapid Fire.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386632">More Info</a>.',
                    'bfopt_rapidfirehealth': '&#187; Rapid Fire.<br>Select when you want to start Rapid Fire.<br>The higher you set it, the more possibilities you have to get an ice but it also costs you more stamina.<br>If you did not check "Maximum Attack", It can also cost you more Stamina.',
                    'bfopt_rapidfireattacks': '&#187; Rapid Fire.<br>Set the Rapid Fire Aggressiveness.<br>The higher you set it, you will do more attacks before RapidFire stop.',
                    'bfopt_rapidfiretiming': '&#187; Rapid Fire.<br>Set the Rapid Fire Timing.<br>Lowering this value attack faster. but will give you more errors.<br>A good success rate will give you more possibilites to get an ice. So, faster don\'t mean better.',
                    'bfopt_rapidfireautotiming': '&#187; Rapid Fire.<br>Enable the Rapid Fire Autotiming.<br>Use it the first time to get a good success rate value for your timing.<br>For example, enable it and run battlefield a while until you don\'t get bad Autotiming messages in your log. Then go back and disable it to keep the good timing value.',
                    'bfopt_attackusemax': '&#187; Attacks.<br>Check to use Maximum Attacks.<br>Maximum Attacks will be calculated after some attacks, then if the required attacks to ice your enemy are more than the specified value, the foe will be skipped.',
                    'bfopt_attackmax': '&#187; Attacks.<br>Set the Maximum Attacks you would use on the same opponent.<br>Opponents that requires more than this value will be skipped.',
                    'bfopt_attackretries': '&#187; Attacks.<br>Set the Maximum Retries you want to perform before skip an opponent when server return an invalid response.',
                    'bfopt_attackpwr': '&#187; Attacks.<br>Check to enable Power Attack.<br>Use it if you want to use Rapid Fire.',
                    'bfopt_attacktonpc': '&#187; Attacks.<br>Check it if you want to fight non-player opponents added by Mafia Wars when you have an active mission availible.<br>You must also configure "Start City" to required city where they are hideing.',
                    'bfopt_attackuseperfoe': '&#187; Attacks.<br>Check to enable a limit of attacks per foe.<br>The difference between Maximum Attacks, is that this will skip the foe just after you\'ve reached the specified limit.',
                    'bfopt_attackperfoe': '&#187; Attacks.<br>Set the limit of attacks per opponent.',
                    'bfopt_attkdelayusea': '&#187; Attacks.<br>Check to use a delay between attacks to same player.<br>Uncheck it if you\'re going for ices.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386634">More Info</a>.',
                    'bfopt_attkdelaya': '&#187; Attacks.<br>Set the attack delay for same player.',
                    'bfopt_attkdelayuseb': '&#187; Attacks.<br>Check to use a delay when you\'re ready to attack a new player.<br>This has low effect when going for ices, recommended to be checked.',
                    'bfopt_attkdelayb': '&#187; Attacks.<br>Set the ready to attack delay.<br>Recomended to use at least 1 second.',
                    'bfopt_rediceactive': '&#187; Red ices.<br>Check to keep attacking a player when you lose. Attack the "BEAST".<br>The Red Ice term means that you can get an ice while losing the fights.<br>You will lose experience points, health and loot when attacking in this way.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386636">More Info</a>.',
                    'bfopt_redicemaxattk': '&#187; Red ices.<br>Set maximum attacks to enable red ice.<br>It only works if "RedIce" is checked.',
                    'bfopt_rediceafterwon': '&#187; Red ices.<br>Sometimes you could lose a fight after you have won, your opponent suddenly got stronger by a boost or leveling up.<br>Check this to allow Red Ice mode for the current opponent after winning at least the first attack.<br>"This function can work Individually".',
                    'bfopt_attackrevenge': '&#187; Revenges.<br>Check to enable revenge feature.<br>This feature allows you to Auto attack the thief that has stolen your ice.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386637">More Info</a>.',
                    'bfopt_attackrevengefilter': '&#187; Revenges.<br>Select the revenge filter.<br>- "Attack everyone": attack any thief without use any filter (skip options still used).<br>- "Attack any mafia/level": attack any thief using filters but not the mafia/level ones.<br>- "Use all filters": attack the thief only if it passed all filters.',
                    'bfopt_timerrivalsactive': '&#187; Rivals.<br>Enable to load your rivals list after some time and attack lived targets.',
                    'bfopt_timerrivalsmins': '&#187; Rivals.<br>Set the minutes you want to wait before load your rival list again.',
                    'bfopt_levelrangeactive': '&#187; Filtering by level.<br>Check to use a level range filter players.',
                    'bfopt_levelrangemin': '&#187; Filtering by level.<br>Set the minimal level range.',
                    'bfopt_levelrangemax': '&#187; Filtering by level.<br>Set the maximum level range.',
                    'bfopt_levelrangemethod': '&#187; Filtering by level.<br>Select if players IN level range are Attacked or Skipped.',
                    'bfopt_mafiarangeactive': '&#187; Filtering by mafia.<br>Check to use a mafia range to filter players.',
                    'bfopt_mafiarangemin': '&#187; Filtering by mafia.<br>Set the minimal mafia range.',
                    'bfopt_mafiarangemax': '&#187; Filtering by mafia.<br>Set the maximum mafia range.',
                    'bfopt_mafiarangemethod': '&#187; Filtering by mafia.<br>Select if players IN mafia range are Attacked or Skipped.',
                    'bfopt_publishactive': '&#187; Autopublish.<br>Check to enable Autopublish feature.<br>It only works if you set silent mode, you should have deactivated "Use Facebook user interface." In "Configuration" menu, via "Publish tab".<br><a href="http://userscripts.org/topics/88936?page=1#posts-386639">More Info</a>.',
                    'bfopt_publishafter': '&#187; Autopublish.<br>Select the amount of ices you need to archive before you publish it.',
                    'bfopt_publishto': '&#187; Autopublish.<br>Set the group or page id where you want to Autopublish your ices or leave it blank for your wall.<br>When you\'re in the group/page, look in profile picture link, look for group_id=XXX, copy the XXX number. Add to box',
                    'bfopt_usestampack': '&#187; PowerPack.<br>Check to use a powerpack to refill your stamina.',
                    'bfopt_usestampackwhen': '&#187; PowerPack.<br>Set to use StaminaPack only if your required experience points to level up are more than this.',
                    'bfopt_usehealpack': '&#187; PowerPack.<br>Check to use a powerpack to refill your health.',
                    'bfopt_usehealpackwhen': '&#187; PowerPack.<br>Set to use HealthPack only if your stamina points are more than this.',
                    // -----------
                    // SECOND PAGE
                    // -----------
                    'bfopt_maxloglength': '&#187; Log events.<br>Select the maximum amount of log events that will be displayed.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386640">More Info</a>.',
                    'bfopt_showsocialevents': '&#187; Log events.<br>Check to enable showing social events in general log.<br>Uncheck it if you are going for long sessions to save Memory usage.',
                    'bfopt_showlootevents': '&#187; Log events.<br>Check to enable showing loot events in general log.<br>Uncheck it if you are going for long sessions to save Memory usage.',
                    'bfopt_namefilteractive': '&#187; Filtering.<br>Check to skip players by their names.',
                    'bfopt_namefilterexpr': '&#187; Filtering.<br>Used when "Skip Names" is checked.<br>Click "EDIT" to set the filter.<br>Put every name/characters you want to skip by lines.',
                    'bfopt_badgefilteractive': '&#187; Filtering.<br>Check to skip players by their badges.',
                    'bfopt_badgefilterexpr': '&#187; Filtering.<br>Click "EDIT" to set the filter.<br>Set here those badge tiers you want to SKIP by lines.',
                    'bfopt_skipiced': '&#187; Filtering.<br>Check to filter/skip player by an iced state.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386648">More Info</a>.',
                    'bfopt_skipicedbyme': '&#187; Filtering.<br>Check to filter/skip players that were iced by you.',                    
                    'bfopt_skipusehealth': '&#187; Skipping.<br>Check to skip a player if the health percentage is more than specified.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386644">More Info</a>.',
                    'bfopt_skiphealth': '&#187; Skipping.<br>Select the maximum health percentage allowed before you will attack an opponent.',
                    'bfopt_skipusemincash': '&#187; Skipping.<br>Check to skip players by the cash gained for each fight.<br>These players are known as "The Bank".<br><a href="http://userscripts.org/topics/88936?page=1#posts-386645">More Info</a>.',
                    'bfopt_skipbymincash': '&#187; Skipping.<br>If checked, set the minimal cash you should collect to keep attacking.<br>The maximum amount of cash that you can gain in a single fight is up to $65000 without bonuses (New York, Moscow, Vegas, Italy).<br>Keep in mind the cost factor in others cities make it lower.',
                    'bfopt_skipwrongcash': '&#187; Skipping.<br>Check if you want to skip the current opponent when cash gained is from a different city.<br>This works very well if you\'re going for x5 loot in Brazil.',
                    'bfopt_skipunderattk': '&#187; Skipping.<br>Check if you want to skip a player that is under attack by other players.',
                    'bfopt_skipunderattkpct': '&#187; Skipping.<br>Set the percentage of damage does by others to the current opponent needed for skip.',
                    'bfopt_stopbyices': '&#187; Autostop.<br>Check to stop when you archive a specified amount of session ices.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386649">More Info</a>.',
                    'bfopt_stopiceamount': '&#187; Autostop.<br>Set the amount of session ices to archive to stop.',
                    'bfopt_stopkeepstaon': '&#187; Autostop.<br>Check to stop when your stamina goes below a specified number.',
                    'bfopt_stopkeepsta': '&#187; Autostop.<br>Set the amount of stamina you want to keep.',
                    'bfopt_stopkeepexpon': '&#187; Autostop.<br>Check to stop before you raise a new level.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386650">More Info</a>.',
                    'bfopt_stopkeepexp': '&#187; Autostop.<br>Set the amount of experience that you want to keep before level up.',
                    'bfopt_stopbylevelup': '&#187; Autostop.<br>Check to stop after you raise a new level.<br>It will stop and show the level up popup.',
                    'bfopt_stopresume': '&#187; Autoresume.<br>Check to allow Battlefield to resume when it was stopped by any reason.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386652">More Info</a>.',
                    'bfopt_stopresumedelay': '&#187; Autoresume.<br>Set the amount of minutes to wait before you resume Battlefield after it was stopped.',
                    'bfopt_timerfightactive': '&#187; Autopause.<br>Check if you want to pause Battlefield after a specified time.<br>And set the time in the next Box.',
                    'bfopt_timerfightmins': '&#187; Autopause.<br>Set the amount of time in minutes that you want to keep fighting before you pause Battlefield, Only works if previous box is checked.',
                    'bfopt_timerfightresume': '&#187; Autopause.<br>Set the amount of time in minutes to wait before you resume Battlefield when it was stopped by the Autopause feature.',
                    // -----------
                    // OTHER PAGES
                    // -----------
                    'bfopt_useblacklist': '&#187; Blacklist.<br>Check to add players who defeat you to blacklist.<br><a href="http://userscripts.org/topics/88936?page=1#posts-386653">More Info</a>.',
                    'bfopt_blacklist': '&#187; Blacklist.<br>The balcklist is used to filter/skip players.<br>If you have an allience with a "player" add them here.<br>By default battlefield does not attack the Blacklist.',
                    'bfopt_whitelistcountactive': '&#187; Whitelist.<br>Check if you want to attack the whole whitelist X times.<br>After attack the whole whitelist X times, you\'ll continue with Random BF Attacks.',
                    'bfopt_whitelistcount': '&#187; Whitelist.<br>If "Attack whitelist only" is checked, set here the amount of times that you want to attack the whole whitelist.<br>It will not attack the same Target again until the full list has circulated, Either listed or Randomly.',
                    'bfopt_randomizewhitelist': '&#187; Whitelist.<br>Check to attack the whole whitelist in any random order.',
                    'bfopt_whitelist': '&#187; Whitelist.<br>You can use the "Attack witelist" button to attack these players, it works like Rival list but allows a greater amount of players.',
                    'bfopt_frdclanlist': '&#187; Family.<br>The Friend Clan list is used to add friendly families.<br>If you just want to skip "freindly allies", add their families using the buttons on the right side.<br>Just add their profile link (located in the family profile page, copy and paste here), or the families IDs.',
                    'bfopt_enmclanlist': '&#187; Family.<br>The Enemy Clan list is used to add enemy families.<br>If you just want to FIGHT againts all members of a family, add the family using the buttons on the right side.<br>Just add their profile link (located in the family profile page, copy and paste here), or the families IDs.<br>Click Attack Families to attack them!.'
                },
                
                // FREE GIFTS CENTER
                'freegiftscenter_popup': {
                    'filter_text': '&#187; Searching.<br>Add a text word to search for.<br>You can add searches separated by the "|" character.<br>Example: join|build|mystery.',
                    'category_select': '&#187; Searching.<br>Select the category of the requests you want to show.',
                    'mss_action': '&#187; Collector.<br>Select what action you want to perform for this gift.',
                    'mss_amount': '&#187; Collector.<br>Set the amount of this gift you want to collect using the selected action.',
                    'friendlists': '&#187; Friend Lists.<br>Select a list to fill your Friends box.<br>Sender will send gifts to all friends showed in your friend box.<br>Use "EDIT" to add/remove friends.<br>Select Custom list and click "SAVE" to save a new friendlist.',
                    'fgopt_sendback': '&#187; Send back.<br>Check to send thanks gifts.',
                    'fgopt_sendinternally': '&#187; Send back.<br>Check send thanks gifts only internally.<br>Faster.',
                    'fgopt_activefrmin': '&#187; Active Friends.<br>Set how many gifts should have sent your friends to be considerated as "Active friends".',
                    'fgopt_excludedpattern': '&#187; Skipping.<br>Set the text pattern used to add gifts to your exclude list.<br>You can add different texts separated by "|" character.<br>Example: reached your limit|gold mastery'
                },
                
                // REMINDER EDITOR
                'remindereditor_popup': {
                    'setting_name': '&#187; Reminder Editor.<br>Set the reminder name.',
                    'setting_description': '&#187; Reminder Editor.<br>Set a description to remember the task.',
                    'setting_checktype': '&#187; Reminder Editor.<br>Select if you want to check every X hours, or after X time clock every day.',
                    'setting_every': '&#187; Reminder Editor.<br>Set the time in hours or the time clock.',
                    'setting_gotocity': '&#187; Reminder Editor.<br>Check if you want to go to a specified city.',
                    'setting_gotocityid': '&#187; Reminder Editor.<br>Select the city to travel.',
                    'setting_gotopage': '&#187; Reminder Editor.<br>Check if you want to go to a specified page.',
                    'setting_gotopageurl': '&#187; Reminder Editor.<br>Set the page url to go.<br>You can paste here the full url link copied from a link in Mafia Wars that directs you to the wanted page.',
                    'setting_runplugin': '&#187; Reminder Editor.<br>Check to execute a pre-installed plugin.',
                    'setting_runpluginid': '&#187; Reminder Editor.<br>Select the plugin to execute.',
                    'setting_resetonload': '&#187; Reminder Editor.<br>Check if this reminder will be reset after a page load.',
                    'setting_resetonloadurl': '&#187; Reminder Editor.<br>Set the page that will reset this reminder.<br>Same as "Go To Page", you can paste here a full url link of a Mafia Wars page.'
                },
                
                // PLUGIN MANAGER
                'pluginmanager_popup': {
                    'app_name': '&#187; Plugin Manager.<br>Set the selected script app name.',
                    'app_code': '&#187; Plugin Manager.<br>Paste the script code to be executed here.<br>You can also Drag n Drop app here.'
                },
                
                // MULTI GIFTER
                'multigifter_popup': {
                    'mgopt_giftpages': '&#187; Pagination.<br>Check to enable pagination for items.',
                    'mgopt_userpages': '&#187; Pagination.<br>Check to enable pagination for users.',
                    'mgopt_hidezeroamount': '&#187; Item quantity.<br>Check to hide items with zero quantity.',
                    'mgopt_delay': '&#187; Delay.<br>Set the time in seconds to wait to send a new gift.',
                    'gift_page': '&#187; Pagination.<br>Select the page you want to go to.',
                    'user_page': '&#187; Pagination.<br>Select the page you want to go to.',
                    'gift_category': '&#187; Gift category.<br>Select the item group category to show.',
                    'user_category': '&#187; User category.<br>Select the user group category to show.',
                    'collection_filter_type': '&#187; Filtering.<br>Select a collection type to filter.',
                    'collection_filter': '&#187; Filtering.<br>Select a collection name to filter.',
                    'search_gift': '&#187; Searching.<br>Set a search to find gifts.<br>You can set here different searches separating every one by "|" character.',
                    'saved_search': '&#187; Searching.<br>Use a previously saved search.',
                    'search_user': '&#187; Searching.<br>Set a search to find users.<br>You can set here different searches separating every one by "|" character.'
                },
                
                // HOME FEED CENTER
                'homefeedcenter_popup': {
                    'hfopt_filter': '&#187; Filtering.<br>Put a search text to filter your posts.<br>You can use "|" character to set diferent searches.<br>Example:Build|operation|mission.',
                    'hfopt_grouping': '&#187; Filtering.<br>Select a group of posts to show.',
                    'hfopt_dogotowar': '&#187; Helping.<br>Check it to help in published wars.<br> Click to open more options.',
                    'hfopt_dogivesocialhelp': '&#187; Helping.<br>Check it to help in published jobs.<br>Click to open selection menu.',
                    'hfopt_dosocialmissions': '&#187; Helping.<br>Check it to join in operations.<br>Click to open more options.',
                    'hfopt_doclaimbonusandreward': '&#187; Helping.<br>Check it to claim/collect all bonuses and rewards published.<br>Click to open selection Menu.',
                    'hfopt_docollectloot': '&#187; Helping.<br>Check it to collect published loots (actually this option is unnecesary).<br>Click to open search filter. One entry per line.',
                    'hfopt_dopropertyhelp': '&#187; Helping.<br>Check it to help sending property parts.<br>Click to open selection menu.',
                    'hfopt_dogetboost': '&#187; Helping.<br>Check it to help in levelup bonuses.',
                    'hfopt_dosendenergyandphones': '&#187; Helping.<br>Check it to help sending rob phones and energy packs.',
                    'hfopt_doacceptgiftevent': '&#187; Helping.<br>Check it to help in gift events.',
                    'hfopt_dohitlistbounty': '&#187; Helping.<br>Check it to help in hitlist bounties.<br>Click to open selection by filter options.',
                    'hfopt_dosecretstash': '&#187; Helping.<br>Check it to help in secret stashes.<br>Click to open selection by filter options.',            
                    'hfopt_docitycrew': '&#187; Helping.<br>Check it to help your friends by joining their city crew.<br>Click to open selection by filter options.',
                    // SKIP EDIT
                    'skiptext_givesocialhelp': '&#187; Edit Skip Action.<br>Set the text returned by the server after collect the selected feed when you reached the limit for this feed to skip it.',
                    'skiptext_claimbonusandreward': '&#187; Edit Skip Action.<br>Set the text returned by the server after collect the selected feed when you reached the limit for this feed to skip it.',
                    'skiptext_propertyhelp': '&#187; Edit Skip Action.<br>Set the text returned by the server after collect the selected feed when you reached the limit for this feed to skip it.',
                    // GENERAL
                    'hfopt_autoclose': '&#187; General.<br>If checked, the help options you click "accept" the link will be autoclosed after a few seconds.',
                    'hfopt_feedslimit': '&#187; General.<br>Set here the limit of posts you want to load when using "AutoHelp".',
                    'hfopt_maxloglength': '&#187; General.<br>Set here the maximum number of log entries when using "AutoHelp".',
                    'hfopt_helpdelay': '&#187; General.<br>Set here how much time you want to wait between helping.',
                    'hfopt_refreshdelay': '&#187; General.<br>Set here how much time you want to wait before refreshing your home posts.',
                    'hfopt_useuserfilter': '&#187; User Filter.<br>Enable/disable user filter.',
                    'hfopt_userfilteraction': '&#187; User Filter.<br>Select how you want to use the filter.',
                    'hfopt_userfilter': '&#187; User Filter.<br>Click "EDIT" to add/remove friends.',
                    // WAR
                    'hfopt_waruseminattack': '&#187; War help.<br>Check it if you want to collect only those items with more than the specified attack.',
                    'hfopt_warminattack': '&#187; War help.<br>Set the minimum war reward item attack need to help in a war.',
                    'hfopt_warusemindefense': '&#187; War help.<br>Check it if you want to collect only those items with more than the specified defense.',
                    'hfopt_warmindefense': '&#187; War help.<br>Set the minimum war reward item defense need to help in a war.',
                    'hfopt_warusenamefilter': '&#187; War help.<br>Check it to use war reward item\'s name to filter wars. If you check it, you should uncheck minimal attack/defense options.',
                    'hfopt_warnamefilter': '&#187; War help.<br>Add war reward item\'s names separated by commas or "|" character.<br>Example:Paraglider|Sharksaw|emu Or Paraglider,Sharksaw,Emu.',
                    // WAR LOOT
                    'warloot_data': '&#187; War Loot.<br>You should have added at least one condition.<br>If you add a limited condition and is reached, or you\'ve disabled a condition, the next condition will be used to determinate if you help in a war.',
                    'warloot_name': '&#187; War Loot.<br>Set the name of the loot you want to collect.<br>(Asterisk) "*" means anything.',
                    'warloot_att': '&#187; War Loot.<br>Set the minimal attack a loot should have to help in the war.<br>"0" means anything.',
                    'warloot_def': '&#187; War Loot.<br>Set the minimal defense a loot should have to help in the war.<br>"0" means anything.',
                    'warloot_max': '&#187; War Loot.<br>Set the limit for this loot.<br>If you set it to 5, this loot will be "skipped" once you successfully participed in 5 wars.',
                    'warloot_enabled': '&#187; War Loot.<br>Enable/Disable this loot.',
                    // OPERATIONS
                    'hfopt_joinmission': '&#187; Operations.<br>Select the slot type where you want to join.',
                    'hfopt_joinmissionafter': '&#187; Operations.<br>If the previous slot type are not available, select a second slot type to join.',
                    'hfopt_maxfreeslots': '&#187; Operations.<br>Select the maximum amount of free slots to join in an operation.',
                    'hfopt_opusenamefilter': '&#187; Operations.<br>Check to filter operations by name.<br>You will try to join only the operations that match the filter name.',
                    'hfopt_opnamefilter': '&#187; Operations.<br>Add operatons names separated by "|" character.<br>Example:<br>Fix The Tripple Crown|Steal Government Research',
                    // DAILY TAKE
                    'hfopt_dtlootpriority': '&#187; Daily Take<br>Enter the EXACT name of the items you want ADDON to retrieve.<br>Put one item on each line in the order you want to retrieve them (the most important item first).<br>HINT: You can get the name of the item by hovering over it in the Daily Take window.',
                    'hfopt_dtcheckminatkdef': '&#187; Daily Take<br>Check to retrieve fight loot if there is nothing that is on your Priority List available.<br>You can specify a minimum attack and defense.<br>If there is nothing that meets your specifications, the daily take will be ignored.',
                    'hfopt_dtminattack': '&#187; Daily Take<br>Set the minimal attack value for the fight loot.',
                    'hfopt_dtmindefense': '&#187; Daily Take<br>Set the minimal defense value for the fight loot.' 
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
        
        if (file) {
            
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
        var cURL = unsafeWindow.webkitURL || unsafeWindow.URL;
        if (blobBuilder) {
            var bb = new blobBuilder();
            bb.append(data);
            if (FileSystem.lastObjectURL) {
                FileSystem.revokeObjectURL(FileSystem.lastObjectURL);
            }
            return ( FileSystem.lastObjectURL = cURL.createObjectURL(bb.getBlob()) );
        }
        
    },
    /**
     * Revoke a blob object url (saves memory usage).
     */
    revokeObjectURL: function(objectURL) {
        var cURL = unsafeWindow.webkitURL || unsafeWindow.URL;
        if (cURL && objectURL) {
            cURL.revokeObjectURL(objectURL);
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
        if (!Util.isString(text)) {
            return new Object(); 
        }
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
        if ((ms=parseInt(ms)) < 0){ms = 0;}

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
     * Return an new object with all url parameters.
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
     * @param {Object} obj
     * @param {Function} callback
     */
    each: function(obj, callback) {
      if (typeof($) !== 'undefined') {
          $.each(obj, callback);
      } else {
          for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                  if (callback(key, obj[key]) === false) {
                      break;
                  }
              }
          }
      }
    },
    /**
     * Execute a Regular expresion and return and object.
     * @param {RegExp} rgx
     * @param {String} text
     * @return {Object}
     */
    doRgx: function(expr, text) {
        var r, retult = new Object();
        if (Util.isSet(expr) && Util.isSet(text)) {
            if (Util.isString(expr)) {
                expr = new RegExp(expr, 'i');
            }
            if (expr.exec && (r = expr.exec(text))) {
                for (var i=0; i < r.length; i++) {
                    retult['$'+i] = r[i];
                }
            }
        }
        return retult;
    },
    /**
     * Execute a Regular expresion and return the result of the test.
     * @param {RegExp} rgx
     * @param {String} text
     * @return {Boolean}
     */
    doRgxTest: function(expr, text) {
        if (Util.isSet(expr) && Util.isSet(text)) {
            if (Util.isString(expr)) {
                expr = new RegExp(expr, 'i');
            }
            if (expr.test) {
                return expr.test(text);
            }
        }
        return false;
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
        if (!Util.isString(string)) {
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
     * Render the specified HTML content as a template, using the specified data
     * @param {Object} template
     * @param {Object} data
     */
    render: function(template, data) {
        Util.each(data, function(id, text) {
            var pattern = new RegExp('\\$\\{'+id+'\\}', 'gi');
            template = template.replace(pattern, text);
        });
        return template;
    },
    /**
     * @param {String} string
     * @param {String} sStart
     * @param {String} sEnd
     * @param {Number} [nStartPos]
     * @param {Number} [nEndPos]
     * @param {Number} [nStartIndex]
     * @param {Boolean} [bUseLastIndex]
     * @return {String}
     */
    substr: function(string, sStart, sEnd, nStartPos, nEndPos, nStartIndex, bUseLastIndex) {
        if (!(Util.isString(string) && Util.isString(sStart) && Util.isString(sEnd))) {
            return string;
        }

        nStartPos = Util.isNumber(nStartPos) ? nStartPos : 0;
        nEndPos = Util.isNumber(nEndPos) ? nEndPos : 0;

        var bIndex, aIndex = string.indexOf(sStart, nStartIndex);
        if (aIndex === -1) {
            return false;
        }
        if (bUseLastIndex !== true) {
            bIndex = string.indexOf(sEnd, aIndex + Math.max(nStartPos,1));
        } else {
            bIndex = string.lastIndexOf(sEnd);
        }
        if (bIndex === -1) {
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

        if (Util.isString(url) && /https?/i.test(url)) {
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
        if (isNaN(current) || isNaN(max) || current < 1 || max < 1) {
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
        if (!Util.isSet(second)) {
            return first;
        }
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
        if ( !Util.isNumber(p.retries) ) { p.retries = 50; }
        if ( !Util.isNumber(p.delay)   ) { p.delay = 100;  }
        var interval_id = setInterval(function() {
            if (p.test() === true || p.retries < 0) {
                clearInterval(interval_id);
                p.success();
            }
            p.retries--;
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
    parseGiftData: function(htmlText) {
        var groups_levels, item_amounts, item_names, item_imgs, gifts_daily_left;
        try {
	        eval( Util.substr(htmlText, 'var groups_levels', 'var friends_names') );
        } catch (e) { 
            Logger.error('parseGiftData: '+e.message); 
        }
        return (global.giftData = {
            'gifts_daily_left' : gifts_daily_left,
            'groups_levels'    : groups_levels,
            'item_amounts'     : item_amounts,
            'item_names'       : item_names,
            'item_imgs'        : item_imgs
        });
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
        var data = global.giftData;
        
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
                        callback();
                        return;
                    }
                    global.gift_key = Util.doRgx(/gift_key['"]\s*value=['"]([^'"]+)/, htmlText).$1;
                    callback( MW.parseGiftData(htmlText) );
                }
            });
        }
    },
    /**
     * Update Inventory data.
     * @param {String} [htmlText] optional server response.
     * @return {Object}
     */
    parseInventoryData: function(htmlText) {
        var Items, Item, div = document.createElement('div');
        try {
	        eval( Util.substr(htmlText, 'var Items', '</script>') );
        } catch (e) { 
            Logger.error('parseInventoryData: '+e.message); 
        }
        try {
            div.setAttribute('onclick', "return Item;");
            Item = div.onclick();
        } catch(e) { 
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
        var data = global.inventoryData;
        
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
                    callback( MW.parseInventoryData(htmlText) );
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
     * @param {Function} callback function(data, msg, title)
     */
    getGiftRequest: function(giftId, giftCat, callback, params) {
        var url = MW.getIntURL('requests', 'friend_selector');
        giftId = '&free_gift_id='+(giftId || 0);
        giftCat = '&free_gift_cat='+(giftCat || 1);
        httpAjaxRequest({
            url      : 'remote/' + url + giftId + giftCat + '&fbml_iframe=1',
            liteLoad : 1,
			data     : params,
            success  : function(htmlText) {
                callback(
                    Util.doRgx(/MW.Request.setData\('([^']+)/,  htmlText).$1,
                    Util.doRgx(/MW.Request.setMsg\('([^']+)/,   htmlText).$1,
                    Util.doRgx(/MW.Request.setTitle\('([^']+)/, htmlText).$1
                );
            }
        });
    },
    /**
     * @param {Number} req_id
     * @param {Function} callback function(data, msg, title)
     */
    getCityRequest: function(req_id, callback) {
        httpAjaxRequest({
            url      : 'remote/'+MW.getIntURL('requests','pop_mfs')+'&request_id='+req_id,
            liteLoad : 1,
            success  : function(htmlText) {
                callback(
                    Util.doRgx(/MW.Request.setData\('([^']+)/,  htmlText).$1,
                    Util.doRgx(/MW.Request.setMsg\('([^']+)/,   htmlText).$1,
                    Util.doRgx(/MW.Request.setTitle\('([^']+)/, htmlText).$1
                );
            }
        });
    },
    /**
     * @param {Number} giftId
     * @param {Number} giftCat
     * @param {Function} callback function(item_id)
     */
    getGiftItemId: function(giftId, giftCat, callback) {
        MW.getGiftRequest(giftId, giftCat, function(data, msg, title) {
            var item_id;
            if (data) {
                try {
                   item_id = Util.parseJSON(unescape(data).replace(/\\"/g, '"')).item_id;
                }
                catch(e) {
                    Logger.error('getItemId: '+e.message);
                }
            }
            callback(item_id);
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
                        result = Util.parseJSON(jsonData.data).success_message;
                        if (/You cannot deposit that much/i.test(result)) {
                            if (UserConfig.main.autoDeposit && UserConfig.main.autoDeposit[city]) {
                                UserConfig.main.autoDeposit[city].active = false;
                            }
                            result = 'You can\'t deposit in this city, autodeposit has been disabled.';
                        }
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
     * Collect clan experience.
     * @param {String} type
     * @param {Function} callback
     */
    collectClanXP: function(type, callback) {
        httpAjaxRequest({
            'url': 'remote/'+MW.getIntURL('clan','collectProgress')+'&exp_type='+type, 
            'success': function(data) {
                callback&&callback(data.msg);
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
     * Collect stamina PowerPack
     * @param {Function} callback
     * @param {String} [type]
     */
    usePack: function(callback, type) {
        var url = 'remote/'+MW.getIntURL('module','usePowerPack');
        httpAjaxRequest({
            'url': url + (type=='hospital'?'&responseType=hospital&packType=1':''),
            'success': function(data) {
                var result = false;
                if (data && data.user_fields) {
                    if (type=='hospital') {
                        result = {
                            'health'  : parseInt(data.user_fields.user_health),
                            'success' : (data.heal_success == 0),
                            'timer'   : 600
                        };
                        result.message = 'PowerPack:<br>Health boosted to '+result.health+'.';
                    }
                    else  {
                        var success = false;
                        Util.each(data.responses, function(i, response) {
                            if (response.func=='usedPower' && response.data) {
                                success = (response.data.success == 0);
                            }
                        });
                        result = {
                            'stamina' : parseInt(data.user_fields.user_stamina),
                            'success' : success,
                            'timer'   : 28800
                        };
                        result.success = (result.stamina > parseInt(data.user_fields.user_max_stamina));
                        result.message = 'PowerPack:<br>Stamina boosted to '+result.stamina+'.';
                    }
                    result.user_fields = data.user_fields;
                }
                callback&&callback(result);
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
     * @param {Array} users
     * @param {Function} callback
     */
    getMyMafia: function(users, callback) {
        if ( !Util.isFunc(callback) ) {
            return;
        }
        if (!Util.isArray(users)) {
            callback&&callback();
            return;
        }
        httpAjaxRequest({
            'url': 'remote/' + MW.getIntURL('friendladder','friend_actions') + '&friends='+Util.toJSON(users), 
            'success': function(jsonData) {
                try {
                    callback(Util.parseJSON(jsonData.data).json_data);
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
            url = 'https://api.facebook.com/method';
        }
        
        $.ajax({
            url      : url + (path.charAt(0)==='/'?'':'/') + path + '?callback=?',
            dataType : 'jsonp',
            global   : false,
            data     : data,
            success  : function (r) {
                clearTimeout(timeout_id);
                if (bTimeout === false) {
                    var delay = parseInt((new Date()).getTime()) - start_at;
                    if (r.error_code) {
                        r.error = {'message': r.error_msg};
                    }
                    if (r && r.error) {
                        Logger.error('Request to "'+name+'" failed "'+r.error.message+'".');
                    } else {
                        Logger.debug('Request to "'+name+'" completed. ('+Util.toDelayString(delay)+').');
                    }
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
     * @param {Function} callback
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
     * @param {Function} callback
     */
    getUsers: function(ids, callback) {
        facebook.api('getUsers', '', callback, {
            'ids': ids.join(','), 
            'fields': 'id,first_name,name,picture,link'
        });
    },
    /**
     * 
     * @param {Function} callback
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
                        +        '<br>You can install it clicking ' 
                        +        Util.setAnchor(AppInfo.chmext, 'here')
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
        var requestId = String((new Date()).getTime());
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
        
        global.AjaxRequests[requestId] = xmlHttp;
        // set timeout
        var nTimeout = setTimeout(function() {
            if (Util.isSet(global.AjaxRequests[requestId])) {
                httpAjaxStopRequests(requestId,'Timeout');
                args.error && args.error('timeout.');
            }
        }, args.timeout);
        
        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState == 4) {
                clearTimeout(nTimeout);
                delete global.AjaxRequests[requestId];
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
        
        return xmlHttp;
    }
    catch(err) {
        Logger.error(err);
        args && args.error && args.error();
    }
}
/**
 * Do an ajax request.
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
        if (args.update !== false) {
            args.update = true;
        }
        try { user_clicks = ++unsafeWindow.User.clicks; } catch(err) {Logger.error(err);}
        args.data['clicks'] = user_clicks;
        
        if (showOverlay) { loadingScreen(args.message); }
        
        function updateFromJSON(data) {
            data = Util.parseJSON(data);
            if (args.update !== false) {
                try {
                    if (Util.isSet(data.questData)) {
                        unsafeWindow.MW.QuestBar.update(data.questData);
                    }
                    if (Util.isSet(data.user_fields)) {
                        unsafeWindow.user_fields_update(data.user_fields);
                        unsafeWindow.user_info_update(data.user_fields, data.user_info);
                    }
                    if (data.sk_update) {
                        unsafeWindow.SK.update();
                    }
                }
                catch(err) {
                    Logger.error(err);
                }
            }
            args.success(data);
        }
        function updateFromHTML(response) {
            MW.updateUri(response);
            if (args.update !== false) {
                try {
                    var oCtrl, sMeta;
                    if ((sMeta = Util.substr(response, '!-- Current Page: ', '--\>', 1, 18)) !== false) {
                        if ((oCtrl = Util.doRgx(/([a-zA-Z]*)?(?:_controller) ([0-9]+)/, sMeta)).$1) {
                            unsafeWindow.User.page = oCtrl.$1;
                        }
                        if (sMeta.indexOf('sk_update') != -1) {
                            unsafeWindow.SK.update();
                        }
                    }
                } 
                catch (err) {
                    Logger.error(err);
                }
            }
            args.success(response);
        }
        function handleErrorResponse(success) {
            return (function(htmlText) {
                if (showOverlay) { 
                    loadingScreen(); 
                }
                if (success === true) {
                    if (( htmlText = Util.trim(htmlText) ).charAt(0) === '{') {
                        updateFromJSON(htmlText);
                    } else {
                        updateFromHTML(htmlText);
                    }
                } else { 
                    args.error(htmlText);
                }
            });
        }
        // send request
        httpRequest({
            url       : args.url,
            data      : args.data,
            liteLoad  : args.liteLoad,
            timeout   : args.timeout,
            success   : handleErrorResponse(true),
            error     : handleErrorResponse(false)
        });
    }
    catch(err) {
        Logger.error(err);
        loadingScreen();
        args && args.error && args.error(err.message);
    }
}

/**
 * Do an ajax request.
 */
function httpAjaxStopRequests(id, reason) {
    function abort(id, xmlHttp) {
        xmlHttp.onreadystatechange = function(){};
        xmlHttp.abort();
        delete global.AjaxRequests[id];
        Logger.debug('Aborted Request id: '+id+' '+(reason?reason:''));
    }
    if (id) {
        abort(id, global.AjaxRequests[id]);
    } else {
        Util.each(global.AjaxRequests, abort);
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

var Resources = {
    // RAW data
    content : new Object(),
    // Rendered Images
    picture : new Object(),
    // load image size
    _getImageSize: function(id, data) {
        try {
	        var pic = document.createElement('img');
            pic.onload = function() {
                Resources.picture[id] = {
                    'id'     : id,
                    'width'  : pic.width,
                    'height' : pic.height,
                    'src'    : data
                };
            };
            pic.src = data;
        } catch (e) {}
    },
    /**
     * Add a new resource.
     * @param {Object} id
     * @param {Object} data
     */
    add: function(id, data) {
        if (Util.isString(id) && Util.isString(data)) {
            Resources.content[id] = data;
            if (data.indexOf('data:image') > -1) {
                Resources._getImageSize(id, data);
            }
        }
    },
    /**
     * Return the specified resurce.
     * @param {Object} id
     * @return {Object}
     */
    get: function(id) {
        return Resources.content[id];
    },
    /**
     * Return a TAG element with a picture in background.
     * @param {String} id
     * @param {String} [tag]
     * @return {jQuery}
     */
    getPicture: function(id, tag) {
        return c$(tag||'div').addClass('mwa_res_'+ id);
    },
    /**
     * Get the class name for the specified ID.
     * @return {String}
     */
    className: function(id) {
        return 'mwa_res_'+ id;
    },
    /**
     * Inject a CSS object into HTML.
     */
    insertCSS: function() {
        if (e$('#mwaddon_resources')) {
            $('#mwaddon_resources').remove();
        }
        var cssText = '', template = global.Base64.decode(
            'Lm13YV9yZXNfJHtpZH0gew0KYmFja2dyb3VuZDogdXJsKCR7c3JjfSkgdG9wIGxlZnQgbm8tcmVwZWF0'+
            'Ow0KYmFja2dyb3VuZC1zaXplOiAke3dpZHRofXB4ICR7aGVpZ2h0fXB4Ow0KYmFja2dyb3VuZC1wb3Np'+
            'dGlvbjogMHB4IDUwJTsNCm1pbi1oZWlnaHQ6ICR7aGVpZ2h0fXB4Ow0KbWluLXdpZHRoOiAke3dpZHRo'+
            'fXB4Ow0Kd2lkdGg6ICR7d2lkdGh9cHg7DQp9'
        );
        Util.each(Resources.picture, function(id, pic) {
            cssText += Util.render(template, pic) + '\n';
        });
        c$('style', 'id:mwaddon_resources').text(cssText).appendTo('head');
    }    
}

Resources.add('ok_icon', 'data:image/png;base64,'
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
    + 'nYqtx28ldCAENLBy7bIExHFqfo51qvkfZOv1Yw8N51hpuGtaOCAK3EDnAYRtr/u+uqn2/+06dvy3qQOnAAAAAElFTkSuQmCC'
);
Resources.add('mwaddon_icon', 'data:image/jpg;base64,'
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
    + 'DHQg/9k='
);
Resources.add('configuration_title', 'data:image/jpg;base64,'
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
    + 'hhQEEZQixF4uMEg+Y4Va8gOAeQKlnp8ipx/MyQqAHXJg/aRn0ZR0AsMsZQONiIHhOjEGni3Uix76jSDu44n0yGFugpBoKyo6sMkIlKDoPGjRQjpRP5D0oscRRAVacIMbtKAukNgATWuwAnZkYwIvyEEMcJqAojpCpzfgqU+3IQmkKnUUgQAAOw=='
);
Resources.add('homefeedcenter_title', 'data:image/gif;base64,'
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
    + 'yypesT+2bKjRAECEckAAmbS76E2lmrrHcLUcgImEDsrBgbYitavKFCeDhPm4QsQgm6gYQ+vQ2kioroaaYyTXWqvqGDy4wQpAucQJKHUKNGxgqh3FqxtXg9dMbKAFN6jBClTikdIuowKgvUELhGPaZQQCADs='
);
Resources.add('battlefield_title', 'data:image/gif;base64,'
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
    + 'AgA7'
);
Resources.add('multigifter_title', 'data:image/gif;base64,'
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
    + 'RwEOHEUAnfcIJSincSRy3+zABcHMSVAUIyMcfxzAlDJMKRYbfJ8kQPBB6UXiaF05Xfbqp7P7AYAI5YDACwEowH4JjxFd0MUZyATC4cSugbV6oA7phzwVXugQMYCLKMaQriGSIoYjvNshopAKOcQEeGpTHA4rNL9pbKAFN6jBChqgkE0cYAUVG0EdxREIADs='
);
Resources.add('collectallcities_title', 'data:image/gif;base64,'
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
    + 'AxqMy4gY+LIUY3jAmXiaW+EKwrm3iG4jJCoIQto2FpSq7jJ0GgnkEoi5v6VqcK06CBbGAg1cYUQFWnCDG7QgApHYAH1rsIKcYIR9++3vf6sx3/red8CLKMAJZpCDF1RgEYEAADs='
);
Resources.add('inventoryanalizer_title', 'data:image/gif;base64,'
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
    + 'c0FYuXz6WYW23gIRrZsdF0KiTPGWXTD9XUN0+RiaI7GdQYbiPFfsqqImkSdKvZRTSyrVglm1jhU9LWY3dzUIsmaSpIdciBgc1w9j+CGtS/yIeD6r0/0DtmD+7LlAG7styGajsiXdjlZsoAU3qMEKHNLuekMjEAA7'
);
Resources.add('newshelper_title', 'data:image/gif;base64,'
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
    + '+NBEAU4wgxy8oALxzGcqAgEAOw=='
);
Resources.add('craftmanager_title', 'data:image/gif;base64,'
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
    + 'c6IZgQAAOw=='
);
Resources.add('mafiawiper_title', 'data:image/gif;base64,'
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
    + 'Ow=='
);
Resources.add('freegiftscenter_title', 'data:image/gif;base64,'
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
    + 'UmGitKCAPKqAHNGFX5wheHWkJSyHiAg3XGMDl9BBN/7F1QOO9Jcs7apQv0rUsKJnrI6IggBnElHdIdN/Tz1EAFOBBp9g4gT1+Q1c6TaxrB6UrUjd6WUvwooDrCB2I7hIAU4wgxy8oAKhqEALVNaCyXA2GYEAADs='
);
Resources.add('operationscenter_title', 'data:image/gif;base64,'
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
    + 'AIQZG5BxDVaAklUU4AQzyMELKoCJGM+4xjdmRSAAADs='
);
Resources.add('pluginmanager_title', 'data:image/gif;base64,'
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
    + 'uxjGMv5FIAAAOw=='
);
Resources.add('remindereditor_title', 'data:image/png;base64,'
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
    + 'MPBZXz9/+KEd6SBTeVmJwd/ts8vOEte1oyXxLxUXoZX9Il/QAAAAAElFTkSuQmCC'
);
Resources.add('info_icon', 'data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAABKZJREFUSImdll1oHFUUx3/3zp2Z3Wyaj23SbNI2S02rrU1t+oUUjBYRqgj6UKHgx4NWCpZqEVTEBxV8UhFUKGJb0CIVK1ifKj4pioKVftivB61JWzHZZNPsJruT3dmZnbk+'
    + 'zG6yaVJBDxzuzNxz/v9zz7nn3hH8i2itASSgAKs2CsBv0FAIcUuMRWdqwAaQKJS87h8ujWwplPyNQoplIvLJtsTNC/fc2X26NWFnAAcIFiNa8KUGbp8fnkh/+dOVfU0x+7GVnS09cdMSShlR+EFAqeLpv28URl3PP7Fr+20fDfQtuwq4N5OIm8HDMIy9dOTHBwtu8MGm'
    + 'vp6VhmGK6RmfiLfBUUBrwiQMq/rCcGak2ZYvvrNn8KSUstxIMo+g7HrqkTe+eqqro/3gwOreeLFcvUVm50tLk+LS1RF3NJt//uvXHz3aFLf9+pxsjH5g7+FBLdTBvp7ueHaqQrkSzCpas3NTip2bukHreXPj+Qrprq6YocwPt+77ZIfvz+Kj6g/x+15LtKdSh+5anY7n'
    + 'HW9+XdDs6E+xfW0nAIUZl5NnMoiGBLhelQ19K+OXh0c/bt/51gBQaFjBLlxt7N+4Jt3nuAGuX52nFa9KwXFnwaYdF9erLrDLOz7b1q1a5QTsp2tXwwrWp6yW5viero6louwtnvdvzmYoewFCwHcXx9HCWNQu2dZKsqXp2Vxn53uMU4kIEnZ/qjPZV6osBNdas3Z5K6AZ'
    + 'Gp8BoMlSTDr+ol3ketDb3ZHOZSc2AKcjAqE3x2Jx6S4SfRCEvPnEAIac3Q8c+/5Pvvj5LwSaBfsXWJJISARb5gi07hbSYH56BEhJGApeOXqW+/uX8fC2XgC8QOMGtfBDDWEARESGlEhDgQ57oF4DraXrBcyuQEiQBmgB0uDUNYfVqSWz1NVQUw4FQgsMIGZKPK9Cvlhm'
    + 'LD/DWHYSdCjnCCA7li9S1iaWaWLZNsqSGEqgTIkUBlWtCYIArTWuHzDtS3y/ilNymcg7eK4L1QrosKaMzxGE+sK0UwqnfVNiWKA8UDYoC2FaIBWDfQ6FQgGATL7EpTEPwioEAWgFhhkBVz3QoSbU56HeB2X/PG5xBGWDUTNWJigLbVhow47SNlseAaYdqbIiW8OMfE0b'
    + 'KoUMvv/bHMHkiEPFOUZQ0UgjMpQNTlLeRFB7lwoMqzaqaAw8cIufMz5ahOjMh5nfoWPrZfAfp23FEqRRi8yCMOTE0ysYvL2VtiYTgBXtNg/dEef42XwEXM+7NCD7xzgl5xmGPis2FhkuT40xYBwgN3yMVL81F6VAKcVoIWC0GDUaWqNMhTAUmpqdsiFz0ac0dYCh6ZGG'
    + 'zd4ga/ZK2ppeYGn6bZYPWPU6YFi1nMei/PsV8F0I/KioVQ9GzvncuPYqufL7DB0K65DzD5TcGU1i/a8EpSuUJu4l1pIgkZwrvFG/ksPZxqKQgeunJsiPPsdU+QhDh8NGyMVv6/QDkFzXi6VeprljN8l0By1dAqs58qg4UMxqctcmKU4eF57/rp66cp2r3y6AuvXvAED6'
    + 'SSGTbUls826N2KylSAEIrceE1ueoVH8Jc8Uc1z9deCD9L0nthu7d/8nlH/ZrI5qfAOMrAAAAAElFTkSuQmCC'
);
Resources.add('ajax_loader', 'data:image/gif;base64,'
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
    + 'Nkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'
);
Resources.add('ajax_error', 'data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACYQAAAmEBwTBV+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQHSURBVDiNtZVtbxRVFMd/596ZnS1L210otMB2t62gmKA2gVLtC5Ug'
    + 'aGi0Eg2JfgY+AdAWWq0fgKJGE33ZqCQF5EFqCIoJ0RoTXpRATHjY0hYa2i6d7XZ2u7tzfbHttlgKiYn/5M5N7j33N+fMOfeMGGP4P2Q9yyCxSloUxBAioCKIyviW1R9/5N152jlZyeORkOwz6A5VVdWsa2uxamOAonB/hPzoCH4yOahE922acHsxJv9M8L2QbETbp/Sm'
    + 'aNOqtv1Yz20BgeJD5ichf+c23oWzFMbHB4IZ82HVw4epFcET66R8Nu9cKdv9diNbnsefm6Ns46YSbCk4OzmF0gpz+xaZ3369ZgK6tfbm8NgCSy2+QixPVp8MNr/WmF+zlqnECNlwFVODg/gpF991i3PKJTV0HXdiisnbCfIVYZztOxoV1qmlHpfAo9Xhg1a8fm+hJorr'
    + 'ptnyzbfE2ttRL71C8q9r+KkUJpVi5ubfeNqm4Xgvm7/6GncySWFdNToWbxp5+YV9y8DGtj+26hvw3WnKtr6ICgYBiB1pR2/fwaOh68zcukUmVM7mE58jWqMch+DWrRSmXaxYHB1wOh4DJ+pq6iUcaUIUAccmd+ki944dLYUV6zyKtfNVsmvWsfmLL0HrYqK7jpH/7Rec'
    + 'UBkoBRWVzWMtO1tgvo4tJ7BftMafngbbYnWkEvfsGRKFAvGu7iK8qxt8vwgAhjs7mLv0MxWxKH46Db6PaI2xVAy4WrwglhM0+Rz5sVEktAoVClERqcQ908/dQoG6T3vm4ytC7x4+TG7gAhXRDZjZWUw2g8lmAUE5gUjJYyydFKVAFORy+G6qCMnlyD94AIVCKfxiQgwm'
    + 'mynaLZSiZYEojKhFsAScZNFAFY2UYnY6hX5zNw3He0ueLqiup4eEVqR+PEV5TTUoQUQWwJnFqrDVMHYAbBuxbdKpNNa+d2noPbEY/qFD3D18qASPd39CsO0DZianEMsGuziU2P2w5Obdf6Pld5Q0Z9Oz8NY71PV8VoIk2o+QPXcGEJzW94h3dy/udXTA1Ss4kTCIDNZ8'
    + '39/8WB2LY3dh20gwSObGDXzPm89+J9mfzlFRG6UiFiU7cJ7ho50A+J6Hd30IFQwiWiNK9ZV4S3vFg9Y9g4hqyqZm8Naup2zbNuYuXqA8uuGx7z8zeh979x68oSHK0i7BcCVgBqrHk61cvpxfBp5o27uxoALnjEjjnOdh8gWcSBj5V/IAMo+mUZZFYHUIkGvay71edfp0'
    + 'qcMta5sTbW3lBUefRMneZbQn608t+fer+k6PLV18cqPftcsar15zEOEjDDtXAP5hjHTVfHfy/JM2V/yDLGj8wIF6Uf5+IyYoRpIGPymih9f3/XD1aeeeCf6v+gfLYZXwkd5f2QAAAABJRU5ErkJggg=='
);
Resources.add('menu_arrow', 'data:image/png;base64,'
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
    + '4YwXYKUqYTnnKiDFZZexm+4KbDlw8gsQ8fBS7yFML97klHpJYtqo+I+9wfnPvvty7GcdoltRPH5r+P9Y7fhbgAEAMJrdIgjV5tQAAAAASUVORK5CYII='
);
Resources.add('up_arrow', 'data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARfSURBVFiFvVZdbBRVFP7OvXOnLchPKpRNLS1LKRQUywapiqQRYkqB'
    + 'grYQChIbtMSGJvpk4oMxgQQTIhqjxlQjJlAxGIwkxkZ9MD6ZoCIhhaZgKy1UbYAtpD/bn53dudeHmVnuTreyLYs3OTl3ZjPn+875zrl3SSmF6S4jf/HjABDv6/512jGm+6FYuHTdQ5V1xwiAKFy2N9b7x8//GwFRuGxDwca6o00NLwYBoFmIFrOodJ917fJPU41FU5VA'
    + 'FC2vKqja/Ulj/Z7CudkCCsBgNI5PP/+i96/vTzZaVzt+uG8ExKIV1Qs372lueL6uYHaWAYAAAqCAIcvGsZOn/u797sT+aHd7a8YJiOAjtUXVL3xYv7M2f6YwXGyXgLtGYhInvjrdd/Xb469Er1w8nU7ctHpALF65a9G2ve/tqt0WMBlDTDqkSQMnIpicsHt7Tf4pw/go'
    + 'p6TMHOtq+/KeCZjFj9YHn3vpyI6tm/MEI1hSJYAJKsGCCFBQMA2GupqtgW+yxPsPlIbMyOXzLdMmYC4pawjW7Dv87KbKeQYjxKUDkpy5p4ICY05DGIzw8NqKvIgVPTJnxWox2HHusykTMEtC+4PbXz605ZkNuYwIlu0CEwDpZE5Aogc4A6RSuDYwjs6BEcSkjQdDT+Zl'
    + 'Z4nDuSvXmLcvnm1Om4BZEno1uKPxYOXTFXOJaKLmbud7mXNGuBGxcCE8DEtKmBwQ3OmJmavK5+VkGYfml60R4bazH9yVgFkSeq14Z9Ob69etnQ0AMVsm6ax7BYATcKk/gp7BsQSocAl4tqDssdycbHEwECo3r5//7R0dL2kMzaWr31hS1/T6U0+UzzIYS4CQV24X3Xu2'
    + 'pERbeBiRWByCeYDJ4Dqhwc72obaWj9/+5/df3ppAgM2YVS0KSw/w/OLRO01GIAIWLF9Vsn5TdYDcZxDBsm2cuzEECaUBwgUk9J/5sS/S03mFM4ARwIjAGDDQ3TXj5qX2A+NDg61JEsjR4VYAKU+wOVX1Z2IbtwSIAFJAXElcCDvgJk+d+Ujvn71dXx+vSBVPX+ldRkSI'
    + 'J+ZfoeNWBLbSwZMJmJzA9Vm9ZwIAbAVwUui8PQJLSp/OydkL7pQ7YwSInBm/NWph3LYnzVx/x9MrQHoEOBFiysbNMQvCoLt0vEuAZVACRgrXR6PgzA/oPjMtewMQjJAmfpoSQCFqy7RK7+0zWgHO6D873kjRiBmtACM/IHyEJlbkPlZg8tLrpDI6BYzB6X5f06W6eDxC'
    + 'GT0HOKU+bBLZa1PgSTTtk5Ao6dYHAJpfVt7TcfTdYUbkXiyOLN6eMafkRATv8gn39PQTEXdjKN0r7QompZQOylxg5jPy7XXzAygAUvO66e+UUkrpgRgA7pqRwrjmuY+QHjgOwPZ5v9muSU8CPUOdgPCZoXmPiJe5FzQOIOZaXCPprxABIEP7QeLO0gPGXCAxSRX07/WM'
    + '/VXQvSeHSvwjcvvAL4m+n6wXvDVB4xRe30Mppf4F67SXpvDAfoAAAAAASUVORK5CYII='
);
Resources.add('down_arrow', 'data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARDSURBVFiFtZddaBxVFMf/Z2Z2Nk1KEkuihSII1WJDW6yIVattLX60'
    + 'aX0piIK+iQULgtQXadAkJkR88lHqo1AffFCTbj4aslmiRZBaaZtufVAMKA1pXOtmE2d2Z+fe48PO3dxMZncnEoc9zJ3L5fzO1z33LjEzGj3mtu1HYdnNAEBUaxWpHwCA/fKffm7+h0a6rYZ0ANbuA+d3Hn/lQRDAvGoBEYE1KgeGCMmYH79wGcAzm2KAsbXNe/6xfQAR'
    + 'JDOEBCQYggHJgETwDsaFko+FTLMXy7k4i4AKGEBDuJQMyYBhxNMcywACIBgAN4YLAKYJmLWLZc0Tz05SkMZww6jAzc2NAEEC4BhwgwIjjHgRiFcDFKQAjeGuEMg5Hsx4/I0UIVZTEQH3hMSiW4LrCyQtgrGZESCq5B9MkfBFx0POLSFhEpIWwbbof4oA1sKJgD8KLgpl'
    + 'H7YGt03a3BqgIPSgVTiD8VveRUmKdXDbos3tAwh2AQI4CPj1bwc+yypQh9sWwdpoCsz2zqeMto49yuPVYwVo6jqQlFzp9YZRCbsOT4bgSZMgik77fV17TxNVzgwj0EsE5ObmvneXl28CAKnT0Ny2fae9a3+q49SZhztbmsDVTkZo39qMztYWGAaQczzccUt14bZFMPwS'
    + 'TPYrcwYhYRFIlDA6NHQlm04/x8yFNQYAgHnPvQ8k9x4cfvzN9/bd39YMCUBIhgw8d32BuSUHiQbwqDnySxjp7/322tj4CWZeqSY3fB8w2zt2NO05ePHR0+f272jdAhmEzjSAuSUHnpQbhsNzMdzfm7kxcekkMzs6b12tinzudvHaTPdP5wev/r7kVOGuL6LhZn04F//B'
    + 'N70fTN2YuNQdhkcaAABiJb/gXk0fm/1s8MqdZQeGAfxV9CLhUTtAwaWzguG+3onZycmTzFyMYtXchrLo5IjoheuQYzjT82SZjEh4rVSIlQJGBvpSN6fSp5i5XItTtw8wc56IjmVJju5+69zTtpmMBfeX8zwy0D+cTU+/zMx+PUbDRsTMBSI6/gtx6pG3ew7byS114V7+'
    + 'rkwNDXyVTU+/ysyikf5YnZCZV4ioexby4hNn3z+abGqJLMLS3ZxIDQ1+eSuTeZ2ZZRzdMTs2wMzO7ctTJ3785MNJKjnrCs/NLfqpocELtzKZ1+LCgdhnQdWIIhG99B3x1y/29HXb7a2wLYKzuOCPf/zR59lM5o2N6FNKNywAEg8dfnb43ekZeXZ0zOs6cuTT/6KHmdd3'
    + 'QgAgWnOlpdBbPYldhw59YRLN/zwz847yR/ctPOYIWNWAAKqLUeMdljCIUbm36GMZMQ/myv8sHajERKU+LG1samO1To+KAomQ+JqoObWOVREqAxQkUUd0w9QuYk2pD6BcRyhYwwCkFVKgoiFC3unhVBBTWx/2vhzyXH3rEWAATMwczr+e83Ba9G+1Xk8Bq9BqoLBUa4GZ'
    + '+V/8vLMP/1VGiAAAAABJRU5ErkJggg=='
);
Resources.add('thief_icon', 'data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAORSURBVDhPldRrTJNnFAdwEudcdMucOmEKsnIL0NELpaVMoZcoiFYUitB2VlKtguIlJi5WU+WyoMZCGUwNIqLG'
    + 'Qp1IHZStA6sCBaxZoJS5LoWUljgDFAeB8QGC9m/5oDGD4vbh/fC+z3l/Oc85z3O8XC6Xl6dncnJy6fDw8OrR0dHPxsbGPp2amvpwofh5ocHBQZ+uzi66Xq9/Wq2qctbcqemr+6mux/jYeN9kMtGHhoZ85kPnYDabLfCM/DRStu8AmURycVhsFy+R5+KwOS9plMhXGd+I'
    + 'cam0FP39/YH/BudgP5SWyklh4QgOCED8xngI04WQSvdBKBC53zchwM8fzCg6VLduHfOIzczMLHLXZbm6qrp4rbcPSMSvQCaSQCVTQYuMApVCAyWCDFI4Ed4rP0exsrjZarWGvAu+zWxgYOBLxYXCv8JCw8COY2FzwmakpqRALBRCIt6F3SIhdvL54G3ZCnYsC0wGExXl'
    + 'FTZ3g7zfgG8xg6Et4ejBA2BEEMFwZ0IhEsHjbkC2OBmyTBEyBdsQvyEa0ZFUxMXEgBsTDX1TU/lsl+dgTqdz1ZVLFxVcJgPE0HAczDoAflISwgMJCPH3RTSFhMy9eyDcmY51a9ZAmiGeMHV1Mefd5uzHe5p7AkYkDcoiJdxnDE16PYIDQ7DI6wPsSErGsHMEL178jfTU'
    + 'NMStj3W1trbyPGLqarWERo2aLS46jE/A56eB4O5eAicOQYQgyOU5+MPyJ8Tu48GOZUOrbZB4zqz2riSRw8KKFavh+4UvIoIJuFF0Av84DDiVvQvB6/zgt9YfHy1ZhsOZ+9D4q07qEdPV3ZUUZm0H72sSju/m4eHVk7DqLqL3QSXs+svQKI9gbzIXPHoQ1AoZWpsfijxi'
    + 'DZqa/S0KKTpK9sBWfx4OnRLq84eRny2AUZUL+y9F6K8/h8cKIR6V5z5zOBwEj1h7m2Fr3dksqA6xYLx2AuY7+ei8nY/7V2T4vaYA5h/zYCg7Bq1sC/p+az6z4HUaHx//pKqs+Kb2ZBK0eekwXpfBfDsXFk0BOqtz0FHxLbQ5KdDIBWj8uT7jvXezr7c3tKWyAI3fCdCQ'
    + 'm4pHJfthuJyNB0opdHlpqM0R4Wl7k2lkZGTVe7HZALvdHvDc2t3SpirEE1UB2ipPw1z7PdqrlDC2G7gTExMf/6cR9CZoenp6scViIfeYu+nmbhO9x2ymu8dO0P8ejgv9sNDaa6ZGr5SeoeYHAAAAAElFTkSuQmCC'
);
Resources.add('config_menu_icon', 'data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/ElEQVR42mNkAAJpaWnup0+ffmXAA/j4+Fjd3d3DVVVVFc+fP793+/btx0DijHZ2dv7zFyxYlJeXl7p1y5ZV2DQzMTEx5ufnz66srEj+/v3H/w0b1t+urKxy+vbt21NGoMkGy5Yv3/H371/W/Lx8pwcP'
    + '7l9EN4CRkZFv/4H9j02MTfgKCgpmzZkzpwEo/BKI/zGC5IE2aKelp/fFxsbqJycn+9y4fv00sgFAL9quXLnikKKiEgPQ9gPVNTWBCvIKGi9fvnzEiKROLDExcWpWVrYz0JCAS5cuHoJJ+Pr5tubm5lYBNTAoKSky3L93/92Xr1+58nLz9BjRXCsUGRnZV1xcEpSRkR52'
    + '5syZHUJCQhIrVq44efr0KTmgXxgkxCUY3r9//3/Z0mVTz507V4RuAAjwBwQGtlVXVyeUlZYVBwT4Z/z89VP/zes3P27dvn31zu3b54ExdgxoyDqg2o/YDAABnqCgoIk1NbVJM2ZMZ+Dl5X05a9bM5M+fvxwGyoGi+y88gLHp1tDQMExKStoCDAep7JxchiunVt08sWXm'
    + 'zLm7vvZjxBC6gKGhoV1CQsL65SuWCRnoG/5U5jn1PCfqnsKT65/fB1T/tb36gOEqTgNsbGx8gkOCly9btpRHT1f/76lTp2pYv1z+URvLUOoayiD1l1Hkx8SODzP61v0p/fCN4Q+KAR4eHtEuLi5zly1fyq6irPr/9evXk/fv318BlPrFxMSgtrKRYYtXmLLSz8//GGZM'
    + 'vb+oZxVD6ruvDL/ABgQEBKTExcVNb2puZJGUkGLg5+dfs2LFihRQKMNcqiLOELW4nmGmupEINwsnE8O8ma/WtSxmiGGUlJRU9/Hxad2xY8fR9PT0XqDNhydOnBgO1PQCLXhY5IQZwpY2MUzTMuDkZ+ViZCir/FbHKCwsbAgMtPLjx49vcHJyKm1rawv59+/ffRzRyyzB'
    + 'z+C7qJphjoQUI7N3wf9AkBfYgSGfC0xxKgcOHOgGZqq7DPgBExcbg+G//wz/f/xmuAAANAw4i9ZGbqAAAAAASUVORK5CYII='
);
Resources.add('freegifts_menu_icon', 'data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVR42n2TW0jTURzHv3/nnE7d1C3nLd3cbJuXTDfTckVpYiRSElgZ+LCHKAjxwSKhkL3Ug/UaROJL4gW7MKpZYFhSiWV4DVJDnTh1/r39ne5m2zr7g6Jo/d7OOd/zOd/f5VD4T/h8Pqp1aPTxz3k6'
    + 'O5lyf1/wUK/54yMfq6qqXFsaaueFe89aKwN4Aa2G8vJNhmEUoaGhug9Tlsq+ielTnvU1OB0OD3d6/JqhtrZxG9DX1yfWaDQrdrv9SKPxtfHrwCC1HBJxoEKbzl33AmaKB8H6KiyWGczMzuFmSfFTbVZmjUgkWmMB7e3t55VKZZNcLg8bGBlBo/EN+n9P4pgsAQuLS4g5'
    + 'rIEwWoKzKhnihEKIxSLw+fw/JL7QNH2VamhoSKcoqjsoKChywsNBsNuOxRUG0ugo6LI1kEqTMG/bQI/FCm8wH1lCPhSiCDidTo/ZbBZQdXV1gQqF4j5J4dbo3AJylApotVqEhYVBSF7k8XggD8DtdqOpqxtuH4VLudkgDowSieQCW8S2trZiInjnDAiEzTrHikldkJ+f'
    + 'D6/Xy6798aTzE9IS4nD8kBwul6siPj6+hQU0NzeLuVwu7eWFYGl2Bmurq34BCgoKoFKpWAd+kOFVB/Qnc3FQFAWbzaYkdRvbbqPRaJxa3LAnrS4vAy6nP0fodDqkpqaygGWy/7CrB3dLCsHlcJiY2NhIctm3DTCZTM9naPriFGlVdEgw6yAnJwdpaWns+bzViubBX6g+'
    + 'cwKbm5tdiYmJBbsGqaOj4w5jsz3oGhxGRqwEDocDmZmZyMjIYM/ppSW8H53Eldwsf03qk5OTb+8C6PX6cJKzqXNwWJcnl4F0hbW/BbDQNKaZDajFEXNjY2PnysrKBvaMsh+yES7sPa1Wqv0ppKSkbAOGJqZgZWzfzD96ywwGw+y+f8Efl69XS/NU0jYOh3NUJpOxAPKp'
    + 'fJ8Hhl+87R+90WKoWdyp3wPYckKKZyIDplOr1QyZOH1RUdHL/bT7ArYghYWFjwQCQX1paen4v3R/AeSaS1ILC2JNAAAAAElFTkSuQmCC'
);
Resources.add('inventory_menu_icon', 'data:image/png;base64,'   
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANkE3LLaAgAAAoFJREFUeJx1kstL1FEYhp9zzsw45VxSs5Fuk8NITldqMCWKIDCQiogW0UKoDCKCWrUOoj+gVYsocNGiRWBEi6A2CQXahJV2WdSgdNGiJh3NnzO/c2mhjZL2rc7ifR/e872f'
    + 'YIlJH01f3X9sf6ee0VMCgQqryOO7j2/l7+Wv/KsNLAVINTZmujpOrdeeDwJUOMhwLt+UJ79IuyRg2vzSH6cGMZ7BAQGtmBbjZimtWvCWbeeyNzP70scbdsR2xxpCcc+N4zHOpCkw7Sbiq1NrW+q31x38nBt9ALhFCULN5fa9h7PrjO9RcB8IBiUAvnaksisbk7tk45MH'
    + 'uZG/5kWATi8z3P+qt97f4sLxQIyIWIF1mh+M8b00SmSw2jtd3vPpGe8Xf+FEe/Ptg61Nh6rfI/WMJyKp1axZniYarAXrk+iTtLxLy6aGug2ZVCL1qO9DTwVw+dKZqx3ZVR0DAy9qvn7+JnhTxo0Itmw+QKxUz5cbz7G9RX4WCvLr6BfasptSieTWxNP+1w8DAL8nJ5sS'
    + '1SI1EqlhWbQWJSR+0THWk8M5qJuKUJWO4pxFOkNUlKLC2UxlB8boeFAb9rVuxvkeQkhAYLSPEALZkATncA4sIEtFgk7GKgCrjRZYVm5s5VH3NRz2n7YFAF7ZcqTrIt9z95kpq1IF4CQ+QoKqAhViZ3brAnOlMQZeDEEoPJfEzgOEFT5qtnNjDK8GhnAVo6gAjJk9RhkI'
    + 'YayeBxhEGTl7EkoptjUnsdYgpcLaOZNSvHw7AoDWGmdZkEBILQWApf3kBf437S0OEKhQECtMqZIvHCZ59vjh60gZcDgnhQQxF93N78ACdfFIdaFQLHbfuX9+osTwHy4bB5h5T+YrAAAAAElFTkSuQmCC'
);
Resources.add('stamina_menu_icon', 'data:image/png;base64,'   
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiRJREFUeNqUk/9qE0EQx7+7uVxySbSpv9LEai+toGiFKIhIoQYUVEQNgv+IkLyB7RO0PkEewb6B+ADS9G/xF4ptFUsba0tDrBd7aa65'
    + 'vV0ntWkaY4oOzN2xM9/Pzs7tQCmFhnezcv+psW6xho5jH/txa+Bp8H4tu19OV8D322beuCly9YXA8/8GrF5KZkI3xJhY0lF9wwqNtWJiML+UGIz+E0A/K/NiVoe7wiB2+nPgjpeKXPemF/6AdAA+x5Mp/TAzZQXwxSS8HYDzic/ovTwVHpHPugLm4slJfz8yap2WG7oK'
    + 'R/C8ys7Gk+ngsMp6XzmMoyxdHDVzHYAPfaZpnFb3tBDglRj0i1vb754hljvxENP8JzeVQzGCaAfxuANw6Aom9BCz1udVAZsUMFwER2vwvnC4ryjNVgg/sMGoNJ9iqaZO263fZhlGeYE+ZFVYwZ0LInTXhj5ch5IMTJPkdHGiEn464uvYQJpUhRagwqIBIsSOqZxcJMEZ'
    + 'QNr+1q0TfLstLEDPZQ4Por0CuUbnk/RBv85/QUI7JwmgdV7fDY5qmWIKb9sATl0tBhLSjDwStAslOr93bBPTBs5HhpqUhculoqX2NrEivSebq4BY4ZBV9lffesexUVZYE2K8qWPNSWSM4WXs5GRvxDfRQz02hlp4WQdq84D1HlbZccdHSstTzWlsAzTsxZHjZojznMH4'
    + '1d3Soay6UjO2lFPXyt+sveP8S4ABAGGU75AoIqjnAAAAAElFTkSuQmCC'
);
Resources.add('list_menu_icon', 'data:image/png;base64,'  
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5ElEQVR42m1TSWjUUBj+XiaZySxtR51aXMBaa2m1FEVEVHA7ePKkCIL0VNFj8eDuyYMo9qAggicRBPHkQXFH8eClKFgUN0a0tbYVu02TTpKXt/i/uMBQXwgvhOTb/u+xyemKdDNpxsDwd2m6lFQQUmI2'
    + 'CAWt3cuWLr6L/yxWDQKlpWS24yQvUqkUGMFprSEJhAuBMIyquay7M5/LvpgDEAShEiJmnuchnU7TxwEaGxcmQGbxOEYYcdQX8pN+NdharK97OwcgCKosqFaJUSY/CimQslJQSkGREqGAfCEPzsX3ahhu7mhdPlgDQIJZGEUQxGZUGAApJByyxSwLnucjkzMAMSqed3TV'
    + 'ypYLNQBRFDLf9+HYNiSxmjgNuwEibEScI53NwnYy8P3ZI+2tzX01AJwAIh4RewYxqUjmQUFS+rRZMAHHFGhMqqa86SNdbW19NVPgUZRk4JB8ij+ZggGSSie5cMR4OvoKQzNjKGUaxtaUVl7jIj67s2uLz2a8WaVkzCqVym//xGobK8QW0/MXPopj/Vcg6UpTwDFZs3QK'
    + 've17XpfSDVvY5FRFQSumNCVObEYyJ88mC03V6H5+HMUMUHA0TQZYvWAN9rbtw/77J3Cms+ciG/s5oaIwYDFNIaLb2DAlMiBl6z0eDN9Cg1sE0yHyTgGH153Dw6EXuFO+js3zt02woZEfZEEwmQTGEs8mQE0KXkf3MBk+w56Oy3j85QY6SxtQ567ApZe9aKnnmJfaDvZ5'
    + '8LsKqUgUJDErKpKdsBtLU4WPGBg/j7WLurGjuRcWAV/o7wWPHsFJZdFSODTN3pe/kgLJ4pj/OwNmpwbBzQG3hw/SCIexfskBuJmNeFrugUNZKJSwa0nfVTbwoayogex3gHQmLQaXSqNphKbGVn4cT76dwkz0FQI52KjCdRZj66KTn1xd3MT6B95J6n9Cij9H2qgwt1I6'
    + 'sVVXb2Nav4EvR1jebqo0ZTpuCiFPty9bO/ELz+W0wwUdlkUAAAAASUVORK5CYII='
);
Resources.add('weapon_menu_icon', 'data:image/png;base64,'  
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVR42q2Tz2sTQRTH3/zI7maboIbsph48VJLquU2JIEoPCh5aLKIgBS9eelChB8HiD0IVT4I/qij00H9B/EU9KIWCx4jQg1LbgiTZ0mZjutlNt5v91bc56KlQbR8Mb+YN7zNv5n2HwB6N7Asg13uc'
    + '/Fz8Ef4X4OnUq3zgBx7jzEMD1/PBRx/NgyCAMAzRh+D7HliWlZEkqSEI4vrDB3crHUDp68JmrabH264L7XYbh4vJLjiO20mKQBHExT0P1z7CRFGsLC0tFl8+fzxDpl5MrxnGhholFwoFaDYNKFeqoOs64GnAGQfTtIDgZaOKfKzQRVBaSecn702UyLUbN0dM00wxxgIu'
    + '8H48NbHlOBCE4ZFkIpm1W5sbRrOZrdfWulZWloFSCrlcL/TlB5aR+mjHLoxdH+/LKGrifvH2/OXRK0+kuDw+++EtCGIcFEWBVFo98+nju887Am7dKfJEl3yVUdLCdxhuGFb/+zevs6bV6lTRc7Rn7Mv83PSudXDh0ujgqlaZq1Y1sO0t6D6cKS18K+V3DRg+f1Gs1/Xf'
    + 'mqbJtm1DLBaDVOrQwD8p8fTg2dly+dc5Ve0GTVuFZFKe+QM4cWqIUQ6MhAEHCBkOjgJAjzFCMEYY5/CsUV8fiVrp+QF2I/f9L+DkEEVhxwgFAYMCZUSkBER8MBlbfIASctBx7GMIyciyxFAToecFjf35THuxbaMI8dyQO+T6AAAAAElFTkSuQmCC'
);
Resources.add('link_menu_icon', 'data:image/png;base64,'  
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwZJREFUeNp0U39IU1EU/vZckhJZQolhg0SWWqbgqEEF1d+NJDMESc0KN8hS26aSmSSas2Z/lNPIWoZm6WZh/oiIkERo/gg1JajQENLE'
    + 'uaGtua29d7v3mWFCDw7n3ffO+e75vnOOxDYwiP89EokEUqkUk5OTpuHhEQ0RBPh5HjHR0XUjo6MajuMgXQkmhIgJawE4TtJssw2k6nWXMD09A4fTgbZnz9UUhP3X/AVgaAEBAaJfBVDb1PQ49WpJMcorDCC8r9K56CpUqVTo6uhQ0/hlAHYTS7ZYrGLJEgZCK+J5Xl2g'
    + '16GisgrXy68paOiU0Wjc7PN6sxkVMIr/8l3HSgargdCzQP3MzHf88vmgOX9h8KfLJXk/PJodIYsE7/eLl3CrAZY5c6DYolg8Fc3c0IDSK5dhn50VpUpKOo7urk5sCgm1yrbvWAZYEY8JyYwhCzSZUkBZaQnSM85Qy4LqaBK62rsQH6d8aTRW5uNXEKSM+x8QkyDwGkIE'
    + 'EcTv5+nNxcjMzIZ92onu9h54l7yIikyoy8s/W5XRiKkvyAFarW0Y+TDWrNMXEvu8g4yPfyS6giLidrvJyZRTtBwkMjtmQG3aQ5DU+yBp1DLMMJ1uAKSBgYEW2qpknS4fd2pMoIk4cviQWPbct3lktWBI8OBW6Eaod0cBe8P16J+pwtgnaBwLtGG2/oFkvU6LGtNdlJYU'
    + 'KxYXf8D8wIyMzEzE7VGAULF5P3LlEcCCC9gVahC9XEa/C1BzAhWKTZjH7TI0NTYO1ZluK7ZFRGDJ7YHH4wWVBAIloggvQO4+IurFPDszvTkf7bHdYadc1hfQHmhzLuYNxsTGorPjBeQ75S0smY4Gej4bUPZ6uVvMszObNy4xMdH6pPkplEolgjeE3Nh/4CD6ensRn5Dw'
    + 'Sl+UrQUFWHLCOjFNBaPvfV8LRc/OSw5YGaTsXr252mZ7l8zQ/XTCtoaFvamqrDhXX2eZeBt8Ao/SIUu5ieqgUCSzstnYsORWLfJX1o9Kgi2rFtFJbWLNdq+NmWO78VuAAQCvqWY4vpJZwQAAAABJRU5ErkJggg=='
);
Resources.add('reminder_menu_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAm9JREFUOI2N0klIlFEAwPH/e986M6gzOpOayVRoJUYejBKqS4lLHYLoVBDZdujkIY8J3bPoZIZCCEHXoEPbKbKCFujQXoiag5WOM04647e9DmalIviHB+/w+PE2wbLyfcRV'
    + 'qKYBYQi83LvQ0b6UKDq0fNnfxOIk10OlqGi5pm/ef0SraNAQkmDyY6DSbx6Sf9tpH37+YVUg10O1LN83ZO06US1LKhG6DcJEIVH5abxPt9Pkx1qsg49fLQckgLATA9bGsmppzyOYA+UABUSQQRoORtW2UpyfN/3xAWsFMNdLvZ4obZZyFFH4Ct4EMAMqByoL3jcEKbT4'
    + 'uu3e6xsHVgDCEE16Ii6EGQUcEAo0DaT3B8mADjK2HnS3eTmgC0PYQnpgVi3ciAgWjqBcoACaAsMAZSOLw00rdqDmgw/B7DRoEQhc8HPg/gQ/A8IBTYBpIiyJjBY3ei+bSpYA0uSxn5kaU/kJQAdnCtxJCLIgCqADlgmWjohETGHZx5cA1klclc+e93989lU+Bb4DziR4'
    + 'aQh+geaCbf5BDDCilwpDB+JLnjF02rvr/xg/7g2/zgZT71HOLMqdBTe9MLws4KNUwJxbF++4Yl7v6rrw7yMtlrssymRRyTEZi7XIaHSPVl4Rk7EYwtIJAo/vXxyefm7CKKuhu/viYDgc6VgC/F/2apE0k4nd+obyc7I4emI8ZcpbD+Kk3WJOnTnL/fv36O8f2LMq8H/D'
    + 'dxr2dvYWDW6tb9xkmhaBEox+G1eWZdWtCQAoLY0mE/GyR+1trTWjYyna2ttHWlvbduhrBdLpzIht2/ufDD3bWVu7JYiEQy+SyeTMb4VU55rpNi9QAAAAAElFTkSuQmCC'
);
Resources.add('plugin_menu_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChUlEQVR42o2TX0hTURzHf8c7N53NaWYroWJZONB0IiIjsKUvTgpHRG8VPfXSw14qQ2hOzR4yhaSwQIleknooIpKkECVzqYQoBAWJUjiU4f7cu3t3d++5p3Ov29qqQQd+/P7w+37O75xzL4Icq8VrNdU5'
    + 'bSMNltbTCDGG9ejXLysBv+epe2k6sw/lArgfV3suNfuGjpU1ACuxsC1uw4OFG4vP3XONOQEneg5bEYMqCAEJ5aHm4yddd9yV5ykgCsvBz/BqZmxCjiuDskgSikKQGJVXsgDtY/aprrYBJy/HAKE82GUohUgiDJzMgSDzgBUJQvEgxGQWImIY3k9MdqcBerMOtfTVzw5f'
    + 'eOKISqqI1UxtjkmsBtHipE9gESZHZ/rSAGOFAbX1OpY7O3w1rBzJaubxTsyrNcxBQhFBkHiYerh8CxUdKkBNndU+xDEVtfXV51w17aaUiMc7Is3TXBVy2jQRkJQEfBj+0Y8szt2ugUc9b/YV7wWZnlGAiCYQkoA45oHDYToBnQrTy/SH1zaX2AVzpdG2Oh7wogNnLd7h'
    + 'ez3dDEMomZ4dh6gPaSJ1VxWECdaOiTGBl7fXBzfGA9dpqqMmov0dFt9FX9PNOAnvXAbJdCidawAF4MX97yPBj6FrunJ9YWw2tIWMtqJ215D9dYlRh0RJgeLCfMhEEAJZa21DZpV4gcARQe+/Om9VX0Ff7Ci9kl+uP3LUdfBMVZXRkikgGUEqZpAONjkB3nWtnEo9oway'
    + '9zd+stoNdX+J05OQdE2g007f/ebJ/BKZWq9jrqyWNP5rV5IFApDohS6OrvZmAUouV7411ZtaUwJCfvs0JFlTaDH47Kf3z79xDzUz/N9SOVu/AItPaIZBhlrUAAAAAElFTkSuQmCC'
);
Resources.add('update_menu_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZ'
    + 'Oixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZz'
    + 'OuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1'
    + 'XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+h'
    + 'sooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1q'
    + 'ixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg=='
);
Resources.add('run_menu_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYJJREFUeNpi/P//PwMlgImBQsASGhqKIsDIyKgEpCyAmJcI/WdZ/v79iyzACzTAsqSkpFJUVET716/fDL9+/WQA0X/+/GX4/58RaAEr'
    + 'AwsLBwMzMxtDW1tFJsufP3+QbTczNzeP+vLli/aHDx8YQHIwDLIIGW8Bgo0bNz5gYWNjg9uuoKBgXlVV5UWM369evXrc1tb2NMvPnz9htpsGBgb6IrsIFzgJBHfu3DkhLCz8luXHjx8gMT5FRUU7ExMTi9+/f+OPNiYmhoULF+4AWnwGZDnLt2/fQIKWISEhXlDDCNl+'
    + '5ubNm8eBLv4EjkagAfxKSkoOZmZmpr9+/cKrmZWVlWHmzJl7vn//fgKeDoAhbh8dHe3+9etXgrYfOnTo/LVr144BDfj45s0bBpAels+fP5toaWkpsbCw4NX8/v37jz09PUeePn16GKgHEfWcnJyZwDCQIybqgPF/GRhOV4HMd0D8Foi/MQIJLiDmAXmHyOT/D4i/gzQD'
    + '8W/GAc+NAAEGAH6Du6zbRlpcAAAAAElFTkSuQmCC'
);
Resources.add('timer_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANhSURBVDiNZZNvaBt1HMaf7+/u8stdclnb2W2ZY223adratHPNdMkyq8hWRaivHPjCPygdVCbKhm8EQV/o'
    + 'Br4QGfSldfO9RTu1IlWnNmTUZXNWdGOJTtc/4XLJpXfJNZfrnS9KR8UHnncPH3geeMj3fWzWp1MX929taxtTFTkZDqvbQ4qMWr2u2auNbLlSGX/skSO5zXnaAIy+doqSBxNnImHlpc8nJ7foJV3q6ekGAOTzeWzfscN95vjxlXqjcWE2O3f67Ntv+XcBI88+R4+mD/+8'
    + '+Pftzl+v5VqHhobAOUc6fYSICJnMrO84DrLZLB5OpoyOrj13pr/9buDj8XO+CADx3p738jf/6LSMSms6nUYgEIAkSbh6NeczxiBJEhhjSKVSKBQKLY2mg0OJwQ8AvC7c1sr97W1t5zI/fN8aj8fBOb/rwUSCotEo6boOIoLneZBlGddyuWBvX7x78svpGRYOhcYuzXyj'
    + '7h8YABFBEARIkgTO+fpIRJBlGZxzSJIEQRAQi8Uw8/V0WA2HTzLGKKXrJXFjVcYYRFEE5xzECMQIiqKAcw5RFMEYAxFhpWoIPCAmGQ8Edu7t6kIylSLP8+D7PjZ6EwhKKIR9sfupb6CfBEGAbdvYF7uPjGoVwUBwm8iIrVMZwXEcWJYFIgIAOE0HYkOE67pwXReFQgF3'
    + 'Fhawc9cu+J4HABCbbnPxVr6w9ZPzF3zP86CqKqLRKHZ3dlL+Vt6XJAlVw4CmabAsC3a9jvMTE77nA07TKbI1z5tta2935+fnoes6bNtGrLcHN2/c8OWQQnJIIU3TUK1W1wG2jdXVVXR3d6813bXLzLRq40ePPWE6joNarYbEQwdxZW4OfxYKKJfLWFxY8JeXl1EqlWAY'
    + 'BkzTRLPZxOPDw7UV0/yQfN/HO2ffP2MZlROZny61ch7EmutCVVWoqgrGGBzHgW3bME0TlUoFL748WlVbtkyMvvD8KQYAV365/mbH3j1/DT/5VCWfz0PTNBSLRTzQH6f+Aw/S0tISisUiKoaBV06+Wt3d0fHP7OW50/8701Dq0LstkciJi1NT4d9/mw+4ay4YExDkHAcG'
    + 'E87I0yN1w7Q++jGTfeM/Z9qsz774qm9b+z1jIVlORyKRexU5CMuyFuuNRkbXy+ND6cPXN+f/BU+TggAryQj/AAAAAElFTkSuQmCC'
);
Resources.add('snapshot_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA7BJREFUeNrsVc1LW1kU/72Xl7x8mxg1ammLzggGygyM4mpAprS29EvEqouuhGLpykUXBdttF/4JFdcOKJ0ZKHQ5ji2UVrQftJB+WGpN'
    + 'rJo0+p7RfGgSe85J4mg3HWjdzYXDve/ee875nd/93fuUnZ0dHGRTccDtwBNoPT09UBRl79z5iYkJ0Pzdbw3O9GulcSvZLzwYGBi4TYaRkZEr3xj/CdmM0t3dzR9XhoeHbzkcjsB/QfW1tVQqlRgaGrpBw9taOBzmuet9fX2BmpoaxGIxtLW1YXBwEFNTU2hvbxenQqGA'
    + 'zc1Ndsb29rbMWa1WOJ1OuFwuqOq/x2m32wO0X3gvJ3jS39/fwI51dXWYnp7G1tYWOjo6kEwmkcvlEI/H2REVFRWw2WwSiPeYponV1VVUV1dD04qMWywW5PP5YoKymmhiX/nsnEgkJPjKygr8fj8Kqgv3H7/G09mHeP/mOUKhEDo7O6WKSCSCYDAoSdioAnVvAks2m5UF'
    + 'VpTb7QZ/c2N0TA8HeP3BxIW+q1AJoZJLCvrR0VGcO9fJJCKTyQoDXAEBU/beA405XFtbE443NjakAqZnbu4d1teTGBsbw6YZw707o/hj4nf8+dddLESiQtvs7Ax03YVw+BWdoUmJ00IRs6L19vZygpNMD9NRPsBPnxIwDJMc4qitrcfS0hL1EUz+8wg//NyFE0c78Obp'
    + 'HfExzTWq2kdVb9FhW2kOnKBI0fj4OPcPurq6jvPmTCYDj8dDVaSILk1M06xiTNXhxp/Q0tIiIDLGWwr0obRuk+BsiiIUFROwJKmFyhUwf8Xz0GlcoNLtFARoaGgUmbocHsy9mindUkMoqq09JJU7HG6Srk1A7Z4Bl05mMt8sQXZk/nmjrjvh9fqJrlWcPn2BEqRQyMaQ'
    + '/DiJ9cW/ceLUGVKQG62tv2Jx8SOqqoLkp1NYRSjiM1AXFhZAZnJgvmTpdLp0iXQyu/BvGOsyvnTpMiorg4RQJbROROeeUeJuQc8Cqa8/IiossaEyI7syZYnyzeSsPp9PKFJVC10qOxobmzA/P08IAzh79qLonlFmMmlEo1GqMI6mppAkLT4Z2KWonEBhaTL/TFVz87FS'
    + 'AlUQBQJV4ry8vIwXL17ueyqY1lDoGD0X7n1vEjEhsTVd1xnxvWvXbv7o8fgrik+3gi97r9dG6vJK8Hw+JygZECvoi+ee7o3JTTcMA7ziIyX8RpvbvuePhiT9iKqY5AR2MkepV75TfBI2WC1Z5f+f/tfaZwEGAF5e0kpGJ78XAAAAAElFTkSuQmCC'
);
Resources.add('createtable_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAuHAAALhwGTQIdTAAAACXZwQWcAAAAYAAAAGAB4TKWmAAAC0klEQVRIx7WVT2sTURTFf9GaOEVtcSGoO9NEMMmkTXcVpRVciOJSwQ/gp1BcCeJesFIQEVwE'
    + 'lxUEcW1RaSapYGe6L5RiWpoE0+jc62Le/EltbFB88Jj73sA595577gz855VKHh49fngXmP8boJ+7P6fu3X/g7L0f2XOev37tJtlsFsuy9gXq9XqAAtBsbuH7PhsbG7x7/7Z248b14uLim6+ADCIgm83i+z7tdju6U9Vog6KiKMrS0gdmZi5SqVRYX18H+DI6ap2vVl97'
    + 'Awksy2JhYSEARkHh1u1boKAqoMqy41C2bTqdDplMBoC5uTm63S6AW62+Tg0kSGZtIjAZh1VM2jaK8r3b5emzJ3/szb4E+Xw+JlBhubbcJ5Uph6nJSb5tbvLx8ydSwOkzZ9n8tnEwQaR1mHG5jEKgvUpUTbO5RSY9wuyxWZrNJiI6HMHq6mrIhKKUbRsJSVGcmoNtlxgf'
    + 'H0PE56hl8aO3y9j4Sdy1r31YhwZ0AEWiCkSDzEUUFaFk26hpevpImvTICNlz58jl8sP2IIeIaTCK49RQCRwlxPIFTyOpCpcunxqOIAQPKyiXbQOifVUFEooxmu4H9btErVYLz1vFdV1c18XzvBhUBFGhXq+DBrFKcN9oNIa3qYoZsrDRIsY9gRzFYjG2rKmmWCgMT5DL'
    + 'TURgIDh1J5ZBQ/LwkxFkpKrMXbk6ZAXGnmFcKtkRiCqICuGwicaTflAPothb8/C8NTw3eKoYrTWQaqWxYu6Cs6A0Gl8OlCiOI4cQSRLPBRSKFyJ7RneFC3Q67WSyspcgA9DptMlOTMSWRGnU6wnAQJ6IXCV6N3PxUoh1FOgCkiQ4ErvI+NtUUywVjRwkvkUxeDQP8RoF'
    + 'ensJ/DCoTE/zjyvqZ5Jgt7XTevXi5fM7/4K8vbVdNdkr9P/0U0AaOA6cMGVmgMNGvsMmoZTJUBO7C7SBncT2Q5L/un4B6tEruiWSAgYAAAAASUVORK5CYII='
);
Resources.add('refresh_icon', 'data:image/png;base64,' 
    + 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAGLElEQVRIx62Va2wcVxXHz70zszM7s7PeXe/L2Zft3dhev+omsV23VGmaAiKqmkpRVdQSITVUFSAoCIl8KSDxBaQiVIlIpR9AqloQ'
    + 'lFRNaUuFWrt1CU6CXcd27Gzs2vFjs3Z2vE/vY3bncS8f3JgEJ6EfOB/vvef8dP7ncRGlFL6oEUKAUAoMxoAQ+kI+7P96UNd0tHxNCS+tpfuVXKlN0w3eaZdSLUH3eDwanLOJgnY3f3S3DJavKf4Pxy49ZyLuab/f1yLaZNYEBKWySjcVJVMvF94+PNDxYm9HZOFOGd0R'
    + 'MJVY6f3H5Gcv9Xa3P+R2NyKDYtAJAlUnoBkUNJNAMV+AxcTcxaHOwLcfHuq+cANSq2vMSmoz0ORxKrcFzMyvxkfH51+LhJp6iluVRKlcWUUYO+0OZ08wEnGYmIOaTkAzAWpqFeanJj89dqj7qVjEvzg5t3zv2PTVZ64rWf7ks499f1cN0plCw5t//9cvrVZBokb9Wwf3'
    + 'x95vkMWCpun8zMLafTOTF38Wi3c+yAgSgEEAcwKEO7r2vzUy9SurwF/PEetjDOfytbUKJ91OuboL8NYH40+uKznxua8/cmxfZ+tljHe0NQ4P9Qz73cmrw+Nzv4t13XMIYw7ApGARZfBEux5VqhQ4iw3VUgv5nu49HyOEAN8cPJXOeWYX1nq/+9RXfnCgO3pz8B3r2hta'
    + 'ju1x/jQxO7vJYQQYAVAAYCUHwrwNUUMHRtu6FAv7E7vadGZ+NXr08IHX+zpb5m5X+MJWhb8wvXh/YiX9bKOvSUKIAkYIMKKAEQWBQ1ArlcBvt3zkcsilWwC6YQLPcYqzQeJyhZJkl8UKyzA7d8NjlwY/mUj8sLk5cuTA4ICMeStU6iZgZAJGABghsFoYyJRype540wjD'
    + '4FsHjWMZKFVr+z6YWPq1U7YuyQJzIeRznN8b8c+4HPI6b2EreyNN53VTI4m5xD1WmxyWGhwSJ4iIYzgwCAWeGMAb5UQ82jm7a5JrdQ1fWVW+1tzVFxIlMQRa9aGNUlFbnrh6ner1WYdkGQv4nOeavM4zQCnN5EvNKSW5f71UG9SB7eVEe8hEWHJLzKi30ZHbBUhuZAM5'
    + 'Fb4ks1bQCQKraAevw2kRWBRmqBE26uqRjVRKe/fjkSuRPY2/OfHEw68euk8cLVfrrJIpeNY2su2LSWVfMOQ5S+E/s7UDmP0sOUhFZ7NqAPAsACEUDNMEA2EAasKmslkuFgqjB/vjv7//3raRBpuoAyCwiYJhC/s3WsP+je620MTwudkOXTcZlmHMHUC9rqMrq5tftTjb'
    + 'LKpOQOYxEEqBEAQIAcxOzWz5ZPZ73zz6wF/sNqt6u72j6Qbzh7+efbq9ZU/CKljMG+d4W55MIKvCg4iXwCQUMBCggIBQAIMgCITDUlnV2jFCxh2Co9fOjH7j0vzqA/290U9vvsPb8lwbYGVXC9IqUF27rCTnJtOYGEAAwCQEnB4fY3V6nz8zPPGjzVxRvOFMKYV0piD/'
    + '6b2x50fOX/7J418e+GOjQ67csk2rtTr+xStvv1zHwqNe2XJ6qKf51VQ6176UM3/bGu+2sxiAZzFYOQyb68natZXlv7UEGt8UBcv1ak1vzhYrT2xVagcFDr/4zLFDP79ZHgAAlM4U5DMfjj8+0BubjEcDCd7CkapaZ19/558nVdb+QiS6V2AZBDyzPUhUr0E+mzVMQzdc'
    + 'DZIlmy2YqfWNl588MvSCt7Gh9N/yIZMQAEoB41vWEuQKW8Ib75//TkFnf9zR2eWzyzawcBh4FgPPAFTLWzA1PZcEs/7S0cP9rzR5nRWA3fVBlFJQFAWmp6fRwsICWllZwaqq4mQyicvlCruUyg+1xPcd790/2O/z+V3ENMxUci19cfzc2fTalT9Hg+6LgsCbwWCQiqJI'
    + 'gsEgicVipK+vj4ZCoW3A6dOn4dSpU8zi4iKbz+dZVVU5Sin7eRsjAOCBsTSyvOSgxCRmvZoDauQBwADY7gWEkG61Wg2Hw2G0trYaJ06cMI8fP04RpRRM04RyuQyZTAZyuRxKpVJI13VULBZRKpVCAICAUqDbm/nzTkVAKQWv10s9Hg/hOI4GAgHqcrmo2+0GWZYBY3z3'
    + 'T///Yf8GfBnc0hL3m9sAAAAielRYdFNvZnR3YXJlAAB42isvL9fLzMsuTk4sSNXLL0oHADbYBlgQU8pcAAAAAElFTkSuQmCC'
);// ==Script==
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
        if (args.title && args.title.html) {
            args.title = c$('div').append(args.title).html();
        } else {
            args.title = '';
        }
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
        .append($(Resources.getPicture('mwaddon_icon')).css({'float':'left','margin':2}))
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
                if (args.onclose.apply(this) !== false) {
                    me.destroy();
                };
            } else {
                me.destroy();
            }
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
        if (me.is_closed === true) {
            return;
        }
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
        me.is_closed = true;
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
var TableObject = function(appendTo, bHeader) {
    var $head, me = this;
    var $table = c$('table', 'cellspacing:0').appendTo(appendTo);
    var $body = c$('tbody').appendTo($table);
    
    if (bHeader === true) {
        $head = c$('tr', 'class:table_header').appendTo($body);
    }    
    
    this.table = $table;
    this.tbody = $body;
    this.head = $head;
    
    /**
     * @param {Number} x
     * @return {jQuery}
     */
    this.row = function(x) {
        var $r = $('tr:eq('+x+')', $body);
        if ($r.length !== 1) {
            return c$('tr').appendTo($body);
        }
        return $r;
    };
    /**
     * @param {Number} x
     * @param {Number} y
     * @return {jQuery}
     */
    this.cell = function(x, y) {
        var $r = me.row(x);
        var sT = $r.hasClass('table_header') ? 'th' : 'td';
        var $cell = $(sT, $r).eq(y);
        
        if ($cell.length !== 1) {
            return c$(sT).appendTo($r);
        }
        return $cell;
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
    var $icon = {
        'info': Resources.getPicture('info_icon'),
        'error': Resources.getPicture('ajax_error'),
        'caution': c$('img').attr('src', global.zGraphicsURL+'cautionTopIcon.png')
    };
    if (!Util.isSet(args.message)) {
        args = {
            icon: 'info',
            title: title,
            message: String(args)
        };
    }
    if (!Util.isSet(args.icon)) {
        args.icon = 'info';
    }
    if (!Util.isSet(args.title)) {
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
            .append($icon[args.icon].css('float', 'left'))
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
        background : '#161616 url(\''+global.zGraphicsURL+'clan_chat/settings_popup_bgrnd_1.png\') repeat-x',
        zIndex     : 9999
    });
    
    c$('div','class:info_header').html(info.message).appendTo(Popup.content);
    
    var $body = c$('div', 'class:info_body').appendTo(Popup.content);
    
    c$('div').appendTo(Popup.content).css('margin','12px 10px 5px 10px').append(c$('span')
    .text('MWAddon requires some effort, if you think this work deserves a reward, you can donate at:'));
    c$('a', 'target:_black').appendTo(Popup.content).attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CQVWPSUMDKW5N')
    .append(c$('img').attr('src', 'https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif'));
    
    c$('center').css({'padding-top':12,'border-top':'1px dotted #333'}).appendTo(Popup.content)
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
            $body.find('br').remove();
        }
    });
    Popup.addBase64Style(
        'I3ZlcnNpb25faW5mb19wb3B1cCAuaW5mb19oZWFkZXIgew0KICAgIGhlaWdodDogNTVweDsNCiAgICBmb250LXNpemU6IDE2cHg7'+
        'DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQojdmVyc2lvbl9pbmZvX3BvcHVwIC5pbmZvX2JvZHkgew0KICAgIHRleHQtYWxp'+
        'Z246IGxlZnQ7DQogICAgb3ZlcmZsb3cteTogYXV0bzsNCiAgICBtYXJnaW46IDBweCAyNXB4IDBweCAzNXB4Ow0KICAgIGhlaWdo'+
        'dDogMzIwcHg7DQogICAgcGFkZGluZy1yaWdodDogMTBweDsNCiAgICBmb250LXNpemU6IDEycHg7DQp9DQojdmVyc2lvbl9pbmZv'+
        'X3BvcHVwIC5pbmZvX2JvZHkgcHJlIHsNCiAgICBtYXJnaW46IDBweCAwcHggNXB4IDBweDsNCiAgICBmb250LXNpemU6IDEycHg7'+
        'DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzsNCiAgICBib3JkZXI6IDFweCBzb2xp'+
        'ZCAjNDQ0Ow0KICAgIHBhZGRpbmc6IDFweCA1cHggMXB4IDVweDsNCn0NCiN2ZXJzaW9uX2luZm9fcG9wdXAgLmluZm9fYm9keSB1'+
        'bCB7DQogICAgbWFyZ2luOiAwcHggMHB4IDVweCAwcHg7DQogICAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCAjMzMzOw0KICAg'+
        'IHBhZGRpbmctYm90dG9tOiAxMHB4Ow0KfQ=='
    );
    Popup.show();
}
// ==Script==
// @id        Plugins.js
// @author    Dakam
// @memberOf  MWAddon.js
// ==Script==

UserConfig.create('plugins', {all: new Array()});

/**
 * @namespace
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
        
        function hideLayout() {
            var $div = $('#mwaddon_reminder_layout');
            $div.slideUp('medium',function() { 
                $div.remove(); 
            });
        }
    
        function showReminder() {
            var $rem = $(Util.render(global.Base64.decode(
            'PGRpdiBpZD0ibXdhZGRvbl9yZW1pbmRlcl9sYXlvdXQiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQojbXdhZGRvbl9yZW1pbmRl'+
            'cl9sYXlvdXQgew0Kd2lkdGg6IDEwMCU7DQp0b3A6IDBweDsNCmJhY2tncm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuemdu'+
            'Y2RuLmNvbS9td2ZiL2dyYXBoaWNzL3RyYXkvdHJheV9iZ183NDh4NzQ4XzAxLnBuZykgcmVwZWF0LXkgNTAlIDBweDsNCnotaW5k'+
            'ZXg6IDI1Ow0KdGV4dC1hbGlnbjogbGVmdDsNCm9wYWNpdHk6IDE7DQpwb3NpdGlvbjogYWJzb2x1dGU7DQpkaXNwbGF5OiBibG9j'+
            'azsNCn0NCiNtd2FkZG9uX3JlbWluZGVyX2xheW91dCAucm1fb3V0ZXIgew0KYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5z'+
            'dGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3RyYXkvdHJheV9ib3JkZXJfNzQ4eDcwMF8wMS5wbmciKSA1MCUgMTAwJSBu'+
            'by1yZXBlYXQ7DQp9DQojbXdhZGRvbl9yZW1pbmRlcl9sYXlvdXQgLnJtX2lubmVyIHsNCmJhY2tncm91bmQ6IHVybCgiaHR0cDov'+
            'L213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy90cmF5L3RyYXlfdG9wX3NoYWRvd183NDh4MzBfMDEucG5nIikg'+
            'NTAlIDAgbm8tcmVwZWF0Ow0KcGFkZGluZzogMTVweDsNCn0NCiNtd2FkZG9uX3JlbWluZGVyX2xheW91dCAucm1fdGl0bGUgew0K'+
            'Y29sb3I6IHllbGxvdzsNCm1hcmdpbi1sZWZ0OiA4cHg7DQpmb250LXdlaWdodDogYm9sZDsNCmZvbnQtc2l6ZTogMThweDsNCn0N'+
            'CiNtd2FkZG9uX3JlbWluZGVyX2xheW91dCAucm1fZGVzY3JpcHRpb24gew0KbWFyZ2luLXRvcDogNXB4Ow0Kb3ZlcmZsb3cteTog'+
            'YXV0bzsNCmhlaWdodDogODBweDsNCmJhY2tncm91bmQtY29sb3I6ICMxMTA7DQptYXJnaW4tbGVmdDogMTBweDsNCm1hcmdpbi1y'+
            'aWdodDogMTBweDsNCnBhZGRpbmc6IDJweDsNCmNvbG9yOiAjQ0NDOw0KYm9yZGVyOiAycHggc29saWQgYmxhY2s7DQpib3JkZXIt'+
            'cmFkaXVzOiA1cHg7DQotbW96LWJvcmRlci1yYWRpdXM6IDVweDsNCi13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4Ow0KfQ0KI213'+
            'YWRkb25fcmVtaW5kZXJfbGF5b3V0IC5ybV9jb250cm9scyB7DQpoZWlnaHQ6IDQwcHg7DQptYXJnaW4tcmlnaHQ6IDEwcHg7DQp9'+
            'DQojbXdhZGRvbl9yZW1pbmRlcl9jb250cm9scyB7DQpmbG9hdDogcmlnaHQ7DQp0ZXh0LWFsaWduOiByaWdodDsNCnBhZGRpbmc6'+
            'IDVweDsNCm1hcmdpbi10b3A6IDVweDsNCmJhY2tncm91bmQtY29sb3I6ICM0NDQ7DQpib3JkZXI6IDJweCBzb2xpZCBibGFjazsN'+
            'CmJvcmRlci1yYWRpdXM6IDVweDsNCi1tb3otYm9yZGVyLXJhZGl1czogNXB4Ow0KLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7'+
            'DQp9DQojbXdhZGRvbl9yZW1pbmRlcl9sYXlvdXQgLmJvdHRvbV90ZXh0IHsNCmZvbnQtc2l6ZTogMTBweDsNCmZvbnQtd2VpZ2h0'+
            'OiBib2xkOw0KcGFkZGluZzogMjhweCAwcHggMHB4IDEycHg7DQp9DQo8L3N0eWxlPg0KPGRpdiBjbGFzcz0icm1fb3V0ZXIiPg0K'+
            'PGRpdiBjbGFzcz0icm1faW5uZXIiPg0KPGRpdiBjbGFzcz0icm1fdGl0bGUiPiR7dGl0bGV9PC9kaXY+DQo8ZGl2IGNsYXNzPSJy'+
            'bV9kZXNjcmlwdGlvbiI+JHtkZXNjcmlwdGlvbn08L2Rpdj4NCjxkaXYgY2xhc3M9InJtX2NvbnRyb2xzIj48ZGl2IGlkPSJtd2Fk'+
            'ZG9uX3JlbWluZGVyX2NvbnRyb2xzIj48L2Rpdj4NCjxkaXYgY2xhc3M9ImJvdHRvbV90ZXh0Ij4ke3ZlcnNpb259PC9kaXY+PC9k'+
            'aXY+PC9kaXY+PC9kaXY+PC9kaXY+'), {
                title        : oRem.name+' says:',
                description  : String(oRem.description).replace(/\n/g,'<br>'),
                version      : 'MWAddon Reminder'
            }));
            $('#mw_city_wrapper').prepend($rem.hide());
            $rem.find('#mwaddon_reminder_controls')
            .append(b$('Let\'s go','class:short green').click(Events.runReminder_click))
            .append(b$('Hide','class:short orange').css('margin-left',6).click(Events.waitReminder_click))
            .append(b$('Cancel','class:short red').css('margin-left',6).click(Events.skipReminder_click));
            $rem.slideDown('medium');
        }
    },
    /**
     * Add a new reminder.
     * @param {Object} reminder
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
        'ccb': { request_id:'city_crew_brazil',name:'City Crew', img:'buy_hiredguns_75x75_01.gif'             },
        'enp': { request_id:'energy',name:'Energy Pack'      , img:'energy_request_bg.gif'                    },
        503  : { item_id: 8035,  name:'Power Pack'           , img:'huge_item_powerpack_01.png'               },
		441  : { item_id: 3000,  name:'Mission Crew'         , img:'buy_hiredguns_75x75_01.gif'               },
        1000 : { item_id: 11051, name:'Union Worker'         , img:'huge_item_union_worker_01.png'            },
        1001 : { item_id: 11052, name:'Carpenter Nails'      , img:'huge_item_carpenter_nails_01.png'         },
        1002 : { item_id: 11053, name:'Lath Strips'          , img:'huge_item_lath_strips_01.png'             },
        1003 : { item_id: 11054, name:'Iron Cast'            , img:'huge_item_iron_cast_01.png'               },
        1004 : { item_id: 11055, name:'Douglas Fir Beams'    , img:'huge_item_douglas_fir_beams_01.png'       },
        100  : { item_id: 527,   name:'Blue Mystery Bag'     , img:'item_mysterybag_blue_1.png'               },
        400  : { item_id: 4400,  name:'Secret Drop'          , img:'icon_atk_75x75_01.png'                    },
        401  : { item_id: 2600,  name:'Italian Hardwood'     , img:'huge_item_italianhardwood_01.png'         },
        402  : { item_id: 2601,  name:'Marble Slab'          , img:'huge_item_marbleslab_01.png'              },
        422  : { item_id: 4604,  name:'Exotic Animal Feed'   , img:'huge_item_exoticanimalfeed_01.png'        },
        444  : { item_id: 2610,  name:'Set of Hidden Charges', img:'huge_item_hiddencharges_01.png'           },
        445  : { item_id: 2614,  name:'Cooked Book'          , img:'huge_item_cookedbook_01.png'              },
        189  : { item_id: 2319,  name:'Special Part'         , img:'huge_item_parts_01.png'                   },
        417  : { item_id: 4605,  name:'Aquarium'             , img:'huge_item_aquarium_01.png'                },
        418  : { item_id: 4606,  name:'Big Cage'             , img:'huge_item_bigcage_01.png'                 },
        419  : { item_id: 4607,  name:'Bird Cage'            , img:'huge_item_birdcage_01.png'                },
        420  : { item_id: 4608,  name:'Feeding Trough'       , img:'huge_item_feedingtrough_01.png'           },
        421  : { item_id: 4609,  name:'Terrarium'            , img:'huge_item_terrarium_01.png'               },
        181  : { item_id: 2196,  name:'Hammer'               , img:'huge_item_hammer_01.png'                  },
        182  : { item_id: 2197,  name:'Rivet'                , img:'huge_item_rivets_01.png'                  },
        183  : { item_id: 2183,  name:'Furnace'              , img:'huge_item_furnace_01.png'                 },
        184  : { item_id: 2184,  name:'Vice'                 , img:'huge_item_vice_01.png'                    },
        185  : { item_id: 2185,  name:'Anvil'                , img:'huge_item_anvil_01.png'                   },
        75   : { item_id: 656,   name:'Arc Welder'           , img:'huge_item_arcwelder_01.gif'               },
        76   : { item_id: 657,   name:'Buzzsaw'              , img:'huge_item_electronicwhetstone_01.gif'     },
        77   : { item_id: 658,   name:'Gunpowder'            , img:'huge_item_gunpowder_01.gif'               },
        78   : { item_id: 659,   name:'Gun Drill'            , img:'huge_item_gundrill_01.gif'                },
        79   : { item_id: 660,   name:'Forge'                , img:'huge_item_forge_01.gif'                   },
        70   : { item_id: 532,   name:'Cement Block'         , img:'huge_item_cinderblock_01.png'             },
        71   : { item_id: 533,   name:'Power Tool'           , img:'huge_item_powertools_01.png'              },
        72   : { item_id: 534,   name:'Car Lift'             , img:'huge_item_carlift_01.png'                 },
        73   : { item_id: 535,   name:'Acetylene Torch'      , img:'huge_item_acetylenetorches_01.png'        },
        74   : { item_id: 536,   name:'Shipping Container'   , img:'huge_item_shippingcontainers_01.png'      },
        161  : { item_id: 1575,  name:'Cinder Block'         , img:'huge_item_Cinderblock_01.gif'             },
        162  : { item_id: 1576,  name:'Steel Girder'         , img:'huge_item_buildcasino_steelgirders_01.gif'},
        163  : { item_id: 1577,  name:'Concrete'             , img:'huge_item_Concrete_01.gif'                },
        164  : { item_id: 1578,  name:'Construction Tool'    , img:'huge_item_constructiontools_01.png'       },
        169  : { item_id: 762,   name:'Security Camera'      , img:'huge_item_securitycamera_01.png'          },
        170  : { item_id: 763,   name:'Reinforced Steel'     , img:'huge_item_reinforcedsteel_01.png'         },
        171  : { item_id: 764,   name:'Deposit Box'          , img:'item_depositbox_01.png'                   },
        172  : { item_id: 765,   name:'Motion Sensor'        , img:'item_motionsensor_01.png'                 },
        173  : { item_id: 766,   name:'Magnetic Lock'        , img:'huge_item_magneticlock_01.png'            }
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
     * @param {Object} data
     */
    add: function(id, data) {
        if (id) {
            UserFreeGifts.content[id] = data;
        }
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
                    var name = $('.freegift_box_itemname',elem).text();
                    var icon = $('.freegift_box_image img',elem).attr('src');
                    UserFreeGifts.add(id, {'name': name, 'img': icon });
                    n_added++;
                }
                catch(err) {
                    Logger.error(err);
                }
            });
            
            UserFreeGifts.each(function(id, gift) {
                gift.name = Util.formatText(gift.name);
                if (Util.isSet(gift.request_id)) {
                    return;
                }
                gift.item_cat = allCats[id] || 1;
				if (!Util.isSet(gift.item_id)) {
					if (Util.isSet(userGiftsIds[id])) {
						gift.item_id = userGiftsIds[id];
					} else {
						n_reqs++;
						MW.getGiftItemId(id, gift.item_cat, function(item_id) {
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
        name: 'Configuration',
        click: Configuration,
        resIcon: 'config_menu_icon',
        css: {'border-bottom':'1px solid white'}
    }, {
        name: 'Free Gifts Center',
        click: FreeGiftsCenter,
        resIcon: 'freegifts_menu_icon'
    }, {
        name: 'Collect All Cities',
        click: CollectAllCities,
        icon: global.zGraphicsURL + 'v3/icon_vault_23x27_01.png'
    }, {
        name: 'Battlefield v2!',
        click: Battlefieldv2,
        menu: function(){ return [{name:'Statistics',click:BattlefieldStats}]; },
        resIcon: 'stamina_menu_icon'
    }, {
        name: 'Home Feed Center',
        click: HomeFeedCenter,
        icon: global.zGraphicsURL + 'v3/icon_mafia_hat_32x25_01.png'
    }, {
        name: 'Plug-In Manager',
        click: PluginManager,
        menu: Plugins.getMenu,
        resIcon: 'plugin_menu_icon'
    }, {
        name: 'Reminder Editor',
        click: ReminderEditor,
        menu: Reminders.getMenu,
        resIcon: 'reminder_menu_icon'
    }, {
        name: 'Craft Manager',
        click: CraftManager,
        resIcon: 'weapon_menu_icon'
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
        resIcon: 'inventory_menu_icon'
    }, {
        name: 'Mafia Wiper',
        click: MafiaWiper,
        resIcon: 'list_menu_icon'
    }, {
        name: 'My Links',
        click: UserLinks,
        resIcon: 'link_menu_icon'
    }, {
        name: '*LORDS* Family Page',   
        click: LORDSFamilyPage,         
        icon: "http://profile.ak.fbcdn.net/hprofile-ak-snc4/276464_219117431470672_5640394_q.jpg"            
    }, {
        name: '*LORDS* *VIP LOUNGE*',
        click: LORDSVIPLOUNGE,
        icon: "http://profile.ak.fbcdn.net/hprofile-ak-snc4/276458_229227167099635_846845_q.jpg"
    }, {
        name: 'Mafia Wars Maniac',
        click: MWsManiac,
        icon: "http://mafia-wars-maniac.blogspot.com/"
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
                if ((parent = e$('.submenu', this)) === null) {
                    parent = c$('ul','class:submenu').appendTo(this);
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
            $('.submenu', this).hide();
        },
        show: function() {
            var b;
            while ((b = $('#fbmw_menu #like_button span')).length > 1) {
                b.last().remove();
            }
            $('#fbmw_menu').stop().animate({'left': '0px'}, 'normal'); 
        },
        hide: function() {
            $('.submenu', '#fbmw_menu').hide();
            $('#fbmw_menu').stop().animate({'left': '-180px'}, 'normal');
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
        c$('style').text(global.Base64.decode(
            'I2ZibXdfbWVudV9hcnJvdyB7DQoJcG9zaXRpb246IGFic29sdXRlOw0KCXotaW5kZXg6IDI1Ow0KCXRvcDogMTBweDsNCglsZWZ0'+
            'OiAycHg7DQoJd2lkdGg6IDQwcHg7DQoJaGVpZ2h0OiA0MHB4Ow0KfQ0KI2ZibXdfbWVudSB7DQoJcG9zaXRpb246IGFic29sdXRl'+
            'Ow0KCXotaW5kZXg6IDMwOw0KCXRvcDogMTBweDsNCglsZWZ0OiAtMTc4cHg7DQoJd2lkdGg6IDE4MHB4Ow0KCW1pbi13aWR0aDog'+
            'MTgwcHg7DQoJbWF4LXdpZHRoOiAyNDBweDsNCglib3JkZXI6IDJweCBzb2xpZDsNCglib3JkZXItbGVmdC13aWR0aDogMHB4Ow0K'+
            'CWJvcmRlci1yaWdodC13aWR0aDogMnB4Ow0KCWJvcmRlci1yaWdodC1jb2xvcjogeWVsbG93Ow0KCS13ZWJraXQtYm94LXNoYWRv'+
            'dzogNXB4IDVweCAycHggcmdiYSgwLCAwLCAwLCAwLjUpOw0KCS1tb3otYm94LXNoYWRvdzogNXB4IDVweCAycHggcmdiYSgwLCAw'+
            'LCAwLCAwLjUpOw0KCWJveC1zaGFkb3c6IDVweCA1cHggMnB4IHJnYmEoMCwgMCwgMCwgMC41KTsNCglmb250LXNpemU6IDEycHg7'+
            'DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNmYm13X21lbnUgIHVsIHsNCglsaXN0LXN0eWxl'+
            'LXR5cGU6IG5vbmU7DQoJbWFyZ2luOiAwcHg7DQoJcGFkZGluZzogMHB4Ow0KfQ0KI2ZibXdfbWVudSB1bC5zdWJtZW51IHsNCglk'+
            'aXNwbGF5OiBub25lOw0KCXBvc2l0aW9uOiBhYnNvbHV0ZTsNCgl6LWluZGV4OiAzMTsNCgl3aWR0aDogMjIwcHg7DQoJbWluLXdp'+
            'ZHRoOiAxODBweDsNCglib3JkZXI6IDFweCBzb2xpZCB5ZWxsb3c7DQoJLXdlYmtpdC1ib3gtc2hhZG93OiA1cHggNXB4IDJweCBy'+
            'Z2JhKDAsIDAsIDAsIDAuNSk7DQoJLW1vei1ib3gtc2hhZG93OiA1cHggNXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuNSk7DQoJYm94'+
            'LXNoYWRvdzogNXB4IDVweCAycHggcmdiYSgwLCAwLCAwLCAwLjUpOw0KCWZvbnQtc2l6ZTogMTJweDsNCglmb250LXdlaWdodDog'+
            'Ym9sZDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI2ZibXdfbWVudSB1bCBsaSB7DQoJYmFja2dyb3VuZC1jb2xvcjogIzAwMDAx'+
            'ODsNCgljb2xvcjogd2hpdGU7DQoJZGlzcGxheTogYmxvY2s7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCglwYWRkaW5nOiA1cHggMTBw'+
            'eCA1cHggMTBweDsNCgloZWlnaHQ6IDE2cHg7DQoJY3Vyc29yOiBwb2ludGVyOw0KfQ0KI2ZibXdfbWVudSB1bCBsaSBzcGFuew0K'+
            'CWJhY2tncm91bmQtc2l6ZTogMTZweCAhaW1wb3J0YW50Ow0KfQ0KI2ZibXdfbWVudSB1bCBsaS5pbXBvcnRhbnQgc3BhbnsNCgli'+
            'YWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9jYXV0aW9uVG9w'+
            'SWNvbi5wbmcnKSAhaW1wb3J0YW50Ow0KCWJhY2tncm91bmQtcG9zaXRpb246IDBweCA1MCUgIWltcG9ydGFudDsNCgliYWNrZ3Jv'+
            'dW5kLXJlcGVhdDogbm8tcmVwZWF0ICFpbXBvcnRhbnQ7DQp9DQojZmJtd19tZW51IHVsIGxpLm1haW4gew0KCWJvcmRlci1ib3R0'+
            'b206IDFweCBzb2xpZCB3aGl0ZTsNCn0NCiNmYm13X21lbnUgdWwgbGk6aG92ZXIgew0KCWJhY2tncm91bmQtY29sb3I6ICMzMjMy'+
            'MzI7DQoJY29sb3I6ICNGRkQ5Mjc7DQp9'
        )).appendTo(menu_container);
        
        // add green arrow
        c$('div', 'id:fbmw_menu_arrow,class:mwa_res_menu_arrow').appendTo(menu_container).mouseenter(MainMenu.Events.show);
        
        // add root menu
        MainMenu.create(MainMenu.root, c$('ul').appendTo(c$('div', 'id:fbmw_menu').css('left', '-180px')
        .appendTo(menu_container).mouseleave(MainMenu.Events.hide)));
        
        c$('div', 'id:like_button,class:button_action').appendTo('#fbmw_menu')
        .html('<fb:like href="http://www.facebook.com/MafiaWarsAddon" '
        + 'send="true" layout="button_count" width="150" show_faces="false" '
        + 'colorscheme="dark"></fb:like>').css({
            'border-top': '1px solid white',
            'padding': '4px 0px 4px 16px',
            'background-color': '#333',
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
            'icon': opt.icon,
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
            var $li = c$('li');
            var $span = c$('span').text(menu.name).appendTo($li);
            
            if (menu.icon) {
                $li.prepend(c$('img').attr('src', menu.icon).css({
                    'float': 'left',
                    'margin-right': 5,
                    'width': 16
                }));
            } else {
                if (menu.resIcon) {
                    $span.addClass(Resources.className(menu.resIcon));
                } else {
                    $span.addClass(Resources.className('run_menu_icon'));
                }
                $span.css('padding-left', 21);
            }
            
            if (menu.css) { $li.css(menu.css); }
            
            if ( menu.important ) {
                $li.prependTo(oParent).addClass('important');
            } else {
                $li.appendTo(oParent);
            }
            
            if (Util.isFunc(menu.click)) {
                menu.click = {'func': menu.click};
            }
            if (Util.isObject(menu.click)) {
                $li.click(menu.click, MainMenu.Events.click);
            }
            if (Util.isFunc(menu.menu)) {
                $li.mouseenter({'func': menu.menu}, MainMenu.Events.enter);
                $li.mouseleave(MainMenu.Events.leave);
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
 * Open Atlactic city in a new popup.
 */
function toAtlanticCity() {
    (new PopupObject({
        type: 'normal',
        title: 'Atlantic City',
        width: 705,
        content: c$('iframe').attr({
            'width': 700,
            'height': 900,
            'src': 'http://m.mafiawars.com/mobileweb?xw_controller=mobileWeb&xw_action=login_click&iframe=1&udid='+facebook.session.uid
        })
    })).show();
}
function LORDSFamilyPage() {
    unsafeWindow.open('http://www.facebook.com/groups/219117431470672/.Family');
}
function LORDSVIPLOUNGE() {
    unsafeWindow.open('http://www.facebook.com/groups/229227167099635/.VIP');
}
function MWsManiac() {
    unsafeWindow.open('http://mafia-wars-maniac.blogspot.com/');
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
/**
 * WaitOn jQuery and Facebook
 */
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
            AppInfo.unique_prefix = AppInfo.prefix + facebook.session.uid + '_';
            Logger.debug('Prefix Updated "'+AppInfo.prefix+'".');
            UserConfig.main.load(onLoad);
        });
    }
    
    function InstallNewApps(callback) {
        var installation;
        var message = 'The "${name}" ${type} is ready to be installed.<br>Do you want to proceed?';
        var params = Util.uSplit(global.location.href);
        
        if (!Util.isFunc(callback)) {
            return;
        } else if (!params) {
            callback();
            return;
        }
        try {
            if (params.mwaddon_plugin) {
                installation = {
                    app: Plugins,
                    data: Util.parseJSON( global.Base64.decode(params.mwaddon_plugin) )||{},
                    type: 'Plugin'
                };
            } 
            else if (params.mwaddon_reminder) {
                installation = {
                    app: Reminders,
                    data: Util.parseJSON( global.Base64.decode(params.mwaddon_reminder) )||{},
                    type: 'Reminder'
                };
            }
            if (Util.isSet(installation)) {
                $('#content_row > div[id^=popup_]').empty();
                showAskPopup('New '+installation.type+' Installation!',
                    Util.render(message, {
                        'name': installation.data.name||'Unknow', 
                        'type': installation.type
                    }),
                    function(){
                        installation.app.addNew(installation.data, callback);
                    }, 
                callback);
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
        
        // add resources
        Resources.insertCSS();
        
        if (UserConfig.main.checkForUpdates) {
            var now = (new Date()).getTime();
            var uInt = 4 * 60 * 60 * 1000;
            if ( now >= (UserConfig.main.appLastUpdateCheck + uInt) ) {
                UserConfig.main.set('appLastUpdateCheck', now);
                UserConfig.main.save();
                setTimeout(function(){Updater.check(false);}, 1000);
            }
        }
        // Load active Mission Crew
        (function() {
            var $a = e$('#quest_tray a:regex(onclick,showQuestRequestFriendSelector)');
            if ($a) {
                try {
    	            var q = Util.doRgx(/MW.QuestBar.showTask\((\d+),(\d+)\)/, $a.attr('onclick'));
                    if (q.$1 && q.$2) {
						UserFreeGifts.get(441).params = {'quest':q.$1, 'task':q.$2};
                        Logger.debug('activeQuest: {"quest":'+q.$1+', "task":'+q.$2+'}');
                        return false;
                    }
                } catch (e) {}
            }
        })();
        
        // close zynga bored popup :/
        setTimeout("$('#popup_fodder_zmc #pop_zmc').remove();", 3000);
        
        $(document).ready(function() {
            // Check if a new plugin/reminder install is available.
            InstallNewApps(onReady);
        });
    }
    
    function onReady() {
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
        // this is the first load...
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
    }
}
/**
 * @param {Function} callback
 */
function initStorage(callback) {

    if (typeof GM_deleteValue == 'undefined')
    {
        // make sure we have a localStorage
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
        var timeout = setTimeout(defineAPI, 10000);
        /**
         * @param {Bollean} chromeFileSystem
         */
        function defineAPI(chromeFileSystem) {
            clearTimeout(timeout);
            global.has_filesystem = chromeFileSystem;
            /**
             * Sets the named preference to the specified value.
             * @param {String} name The name preference.
             * @param {String, Number, Boolean} value Must be strings, booleans, or integers.
             */
            GM_setValue = (chromeFileSystem !== true)
            ? function(name, value) {
                localStorage.setItem(name, value);
            }
            : function(name, value, callback) {
                if (typeof callback !== 'function') {
                    callback = Util.noop;
                };
                chrome.extension.sendRequest(global.chromeExtId, {
                    action: 'SaveData',
                    file: name,
                    data: value
                }, callback);
            };
            /**
             * Returns the named preference, or defaultValue if it does not exist.
             * @param {String} name The name preference.
             * @param {String, Number, Boolean} defaultValue To return if it does not exist.
             * @return {String, Number, Boolean}
             */
            GM_getValue = (chromeFileSystem !== true)
            ? function(name, defaultValue) {
                var value = localStorage.getItem(name);
                return value ? value : defaultValue;
            }
            : function(name, callback) {
                if (typeof callback !== 'function') return;
                chrome.extension.sendRequest(global.chromeExtId, {
                    action: 'LoadData',
                    file: name
                }, callback);
            };
            /**
             * Deletes the named preference or subtree.
             * @param {String} name The name preference to delete.
             */
            GM_deleteValue = (chromeFileSystem !== true)
            ? function(name) {
                localStorage.removeItem(name);
            }
            : function(name) {
                // empty
            };
            // return;
            callback&&callback();
        }
        
        // Check for MWAddon Chrome Extended.
        if (global.is_chrome === true) {
            chrome.extension.sendRequest(global.chromeExtId, 'hasFileSystem', defineAPI);
        } else {
            defineAPI(false);
        }
    } else {
        callback&&callback();
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
    useBlacklist        : true,
    collectClanFightXp  : false,
    useStamPack         : false,
    useStamPackWhen     : 2000,
    useHealPack         : false,
    useHealPackWhen     : 1000,
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
    attackUsePerFoe     : false,
    attackPerFoe        : 40,
    //attackToNpc         : false,
    attackRevenge       : false,
    attackRevengeFilter : 1,
    // ATTACK DELAY
    attkdelayUseA       : false,
    attkdelayUseB       : true,
    attkdelayA          : 0,
    attkdelayB          : 0,
    // PUBLISH
    publishActive       : false,
    publishAfter        : 15,
    publishTo           : '',
    // RANGE FILTERS
    levelRangeActive    : false,
    levelRangeMin       : 0,
    levelRangeMax       : 10000,
    levelRangeMethod    : 'attk',
    mafiaRangeActive    : false,
    mafiaRangeMin       : 100,
    mafiaRangeMax       : 501,
    mafiaRangeMethod    : 'attk',
    compareRangeMethod  : 'AND',
    // SKIP
    skipIced            : true,
    skipIcedByMe        : false,
    skipUseHealth       : false,
    skipHealth          : 100,
    skipUnderAttk       : false,
    skipUnderAttkPct    : 15,
    skipWrongCash       : false,
    skipUseMinCash      : false,
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
    stopKeepStaOn       : false,
    stopKeepSta         : 0,
    stopKeepExpOn       : false,
    stopKeepExp         : 0,
    stopByIces          : false,
    stopIceAmount       : 0,
    stopByLevelup       : true,
    stopResume          : true,
    stopResumeDelay     : 5,
    stopAutomatic       : false,
    // TIMERS
    timerStartActive    : false,
    timerStartMins      : 30,
    timerFightActive    : false,
    timerFightMins      : 10,
    timerFightResume    : 5,
    timerCityActive     : false,
    timerCityMins       : 2,
    timerRivalsActive   : false,
    timerRivalsMins     : 1,
    // WHITELIST
    whiteListCountActive: false,
    whiteListCount      : 3,
    randomizeWhiteList  : false,
    // TRAVEL
    travelToStartCity   : false,
    travelAutomatic     : true,
    travelTo            : UserConfig.getSettingFrom(global.cities, false)
});
/**
 * Battlefield for FightV2 system.
 */
function Battlefieldv2() {
    var ERROR_SUCCESS = 0;
    var ERROR_BAD_RESPONSE = 1;
    var ERROR_NO_FIGHT_RESULT = 2;
    /**
     * Global variables.
     */
    var gVar = {
        StartCity         : MW.currentCity(),
        CurrentCity       : 0,
        Aborted           : false,
        AttackWhitelist   : false,
        AttackFamilyList  : false,
        AttackerUsedBoost : false,
        ForceHeal         : false,
        SaveFromElements  : true,
        ReadyToHeal       : 0,
        WorstItems        : new Object(),
        IcedPlayerCache   : new Object(),
        WhiteListCache    : new Object(),
        WhiteListArray    : new Array(),
        FamilyListCache   : new Object(),
        FamilyListArrays  : new Object(),
        InventoryData     : new Config('cache_loot_name', null, true)
    };
    var options = UserConfig.bfopt;
    /** @type {TimerMessage}        */ var StatusTimer = new TimerMessage('#msgcontainer');
    /** @type {Countdown}           */ var TravelCountdown;
    /** @type {Countdown}           */ var ResumeCountdown;
    /** @type {Countdown}           */ var FightCountdown;
    /** @type {Countdown}           */ var RivalsCountdown;
    //** @type {Countdown}           */ var PackCountdown;
    /** @type {CSAutoPublish}       */ var AutoPublish;
    /** @type {CSLootList}          */ var LootCache;
    /** @type {CSSessionStats}      */ var SessionStats;
    /** @type {CSAutoTravelCounter} */ var AutoTravelCounter;

    var logIcon = {
        'loot'     : global.zGraphicsURL + 'achievements/mwach_collector_75x75_01.gif',
        'fight'    : global.zGraphicsURL + 'home/icon_fight_75x75_01.gif',
        'iced'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'kill'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'heal'     : global.zGraphicsURL + 'red_cross_small.gif',
        'bank'     : global.zGraphicsURL + 'home/icon_loot_75x75_01.gif',
        'whitelist': global.zGraphicsURL + 'DW_feed_grn_01.png',
        'blacklist': global.zGraphicsURL + 'DW_feed_red_01.png',
        'help'     : global.zGraphicsURL + 'home/icon_call_for_help_75x75_01.gif',
        'published': global.zGraphicsURL + 'mw_iced_feed1_90x90.gif'
    };
    /**
     * Attacker Statistics.
     */
    var AttackerStats = {
        health         : 0,
        maxHealth      : 0,
        healthPct      : 0,
        stamina        : 0,
        maxStamina     : 0,
        userCash       : 0,
        atkGained      : 0,
        defGained      : 0,
        expToNextLevel : 0,
        is_iced        : false,
        total_ices     : 0,
        season_ices    : 0,
        season_target  : 0,
        session_ices   : 0,
        lastHealth     : 0,
        exp_fight      : 0,
        exp_fight_max  : 0,
        exp_fight_min  : 0,
        exp_per_sta    : 0,
        currCityName   : {toString: function(){
            return '<span class="good">'+global.cities[gVar.CurrentCity]+'</span>';
        }},
        powerPack      : {
            time1: 0,
            time2: 0,
            count: 0,
            on: false,
            avail: function() {
                var me = AttackerStats;
                if (!(me.powerPack.on && me.powerPack.count > 0)) {
                    return {'hospital':false,'stamina':false};
                }
                return {
                    'hospital': options.useHealPack&&(options.useHealPackWhen<me.stamina)&&(me.powerPack.time2==0),
                    'stamina' : options.useStamPack&&(options.useStamPackWhen<me.expToNextLevel)&&(me.powerPack.time1==0)
                };
            },
            toString: function() {
                var avail = AttackerStats.powerPack.avail();
                var count = AttackerStats.powerPack.count;
                count = Util.setColor(count, (count>0?'green':'red'));
                if (avail.hospital&&avail.stamina) { return 'Both ('+count+')';     }
                if (avail.hospital)                { return 'Hospital ('+count+')'; }
                if (avail.stamina)                 { return 'Stamina ('+count+')';  }
                return Util.setColor('Inactive','grey');
            }
        }
    };
    // POPUP
    var popupElt = new PopupObject('battlefield_popup', {
        type: 'main',
        title: Resources.getPicture('battlefield_title'),
        width: 750,
        onclose: function() {
            stopAutoFight(); 
            if (gVar.SaveFromElements === true) {
                options.fromDomElements();
            }
            options.save();
            //SessionStats.save();
        }
    });
    /**
     * Create a new Fight stats.
     * @constructor
     * @return {CSFightStats}
     */
    var CSFightStats = function() {
        this.fightCount = 0;
        this.fightWon = new Object();
        this.fightLost = new Object();
        this.icesWon = new Object();
        this.killWon = new Object();
        this.icesLost = new Object();
        this.foesAttacked = new Object();
        this.revenge = new Object();
        this.cash = { won: 0, lost: 0 };
        this.expGained = 0;
        this.staminaSpend = 0;
        this.coinsGained = 0;
        return this;
    };
    /**
     * Create a new Session stats.
     * @constructor
     * @return {CSSessionStats}
     */
    var CSSessionStats = function() {
        var timestamp = String(parseInt((new Date()).getTime() / 1000));
        var statistics = new Config('bf_stats');
        var allSessions = new Object();
        var oppData = new Object();
        var Session = (allSessions[timestamp] = new Object());
        var Total = (Session[0] = {
            fightCount    : 0,
            fightWon      : 0,
            fightLost     : 0,
            icesWon       : 0,
            killWon       : 0,
            icesLost      : 0,
            foesAttacked  : 0,
            revenge       : 0,
            expGained     : 0,
            staminaSpend  : 0,
            coinsGained   : 0,
            cash: {
                won: new Object(),
                lost: new Object(),
                toString: function() {
                    var me = this, span = '<span class="cur_cash" title="';
                    Util.each(global.cities, function(i, n) {
                        if (me['won'][i]) { 
                            span += n+': '+ Util.formatNum(me['won'][i]) + ' \n'; 
                        }
                    });
                    span += '">' + Util.formatNum(me['won'][gVar.CurrentCity]||0) + '</span>';
                    return  span + '</span>'
                }
            }
        });
        /**
         * Experience per stamina
         */
        this.expPerSta = function() {
            var n = Total.expGained / Total.staminaSpend;
            return isNaN(n) ? 0 : n.toFixed(2);
        };
        /**
         * Current session total.
         */
        this.currentTotal = Total;
        /**
         * Get a stat.
         */
        this.get = function(timestamp, city) {
            var select = Session;
            if (timestamp && allSessions[timestamp]) {
                select = allSessions[timestamp];
            }
            if (Util.isSet(city) && select[city]) {
                select = select[city];
            }
            return select;
        };
        /**
         * Add Stolen Ice.
         * @param {Object} thief
         */
        this.addStolenIce = function(thief) {
            oppData[thief.id] = thief.name;
            var oldVal = (Session[gVar.CurrentCity].icesLost[thief.id] || 0) + 1;
            Session[gVar.CurrentCity].icesLost[thief.id] = oldVal;
            Total.icesLost++;
        }
        /**
         * Add count to stat.
         * @param {String} stat_name
         * @param {Object} value
         */
        this.add = function(stat_name, value, city) {
            var city = city || gVar.CurrentCity;
            var opp = PlayerList.current;
            var statval;
            
            if (!Util.isSet(value)) { value = 1; }
            
            if (Util.isObject(Session[city])) {
                if (stat_name==='cash') {
                    if (value > -1) {
                        Total['cash']['won'][city] += value;
                        Session[city]['cash']['won'] += value;
                    } else {
                        Total['cash']['lost'][city] -= value;
                        Session[city]['cash']['lost'] -= value;
                    }
                } else {
                    if (Util.isObject(statval)) {
                        statval = Session[city][stat_name];
                        oppData[opp.id] = opp.name;
                        statval[opp.id] = (parseInt(statval[opp.id])||0) + value;
                    } else {
                        Session[city][stat_name] += value;
                    }
                    Total[stat_name] += value;
                }
            }
        };
        /**
         * Load all sessions.
         * @param {Object} callback
         */
        this.load = function(callback) {
            statistics.load(function() {
                statistics.each(function(timestamp, session) {
                    if (timestamp === 'opp') {
                        oppData = session;
                    } else {
                        allSessions[timestamp] = session;
                    }
                });
                callback && callback(allSessions, timestamp);
            });
        };
        /**
         * Save all sessions.
         * @param {Object} callback
         */
        this.save = function(callback) {
            Logger.debug('SessionStats; (fights:'+Total.fightCount+', save:'+(Total.fightCount > 9)+').');
            if (Total.fightCount < 10) {
                return;
            }
            statistics.add('opp', oppData);
            Util.each(allSessions, function(timestamp, session) {
                statistics.add(timestamp, session);
            });
            statistics.save(callback);
        };
        /**
         * Loops through all stats.
         * @param {Object} callback
         */
        this.each = function(callback) {
            Util.each(Session[gVar.CurrentCity], callback);
        };
        
        // Initialize
        Util.each(global.cities, function(id) {
            Session[id] = new CSFightStats();
            Total.cash.won[id] = Total.cash.lost[id] = 0;
        });
        return this;
    };
    /**
     * Auto Travel class.
     * @constructor
     * @return {CSAutoTravelCounter}
     */
    var CSAutoTravelCounter = function() {
        var counter, me = this;
        var errMsg = {
            a: {
                1: 'Your health fall down very quickly.<br>',
                2: 'You lost 5 times in a row.<br>',
                3: 'You lost 5 ices in a row.<br>',
                4: 'You fought against 15 dead bodies in a row.<br>',
                5: 'Your fightlist has no valid targets for 3 times.<br>'
            },
            b: {
                f1: 'Enable "Automatic" option in Travel line to travel if this happen again.',
                f2: 'Enable "Start City" option in Travel line to travel if this happen again.',
                f3: 'You must select the cities where you want to travel.',
                ok: 'AutoTravel will force to fight in '
            }
        };
        /**
         * Increase a counter only if fighting game list.
         * @param {String} to
         */
        function increase(to) {
            if (gVar.AttackFamilyList !== true && gVar.AttackWhitelist !== true) {
                counter[to]++;
            }
        }
        this.stolenIce = function() { increase('stolenIce'); return check(); };
        this.attack    = function() { increase('attack');    return check(); };
        this.lose      = function() { increase('loses');     return check(); };
        this.noTarget  = function() { increase('noTarget');  return check(); };
        this.heal      = function() { return check(true); };
        /**
         * Reset a counter.
         * @param {Object} to undefined to reset all counters.
         */
        this.reset = function(to)  { 
            if (!to || !Util.isSet(counter[to])) {
                counter = { 'stolenIce': 0,'attack': 0,'loses': 0, 'noTarget': 0 };  
            } else {
                counter[to] = 0;
            }
        };
        /**
         * Check the counters.
         * @param {Boolean} forceHealIssue
         */
        function check(forceHealIssue) {
            var message, is_able, newCity;

            switch(true) {
                case (forceHealIssue===true): message = errMsg['a'][1]; break;
                case (counter.loses     > 4): message = errMsg['a'][2]; PlayerList.clear(); break;
                case (counter.stolenIce > 4): message = errMsg['a'][3]; break;
                case (counter.attack   > 14): message = errMsg['a'][4]; PlayerList.clear(); break;
                case (counter.noTarget  > 2): message = errMsg['a'][5]; break;
                default                     : return false;
            }
            switch(false) {
                case (is_able=options.travelAutomatic)   : message += errMsg['b']['f1']; break;
                case (is_able=options.travelToStartCity) : message += errMsg['b']['f2']; break;
                case (is_able=setNewCurrentCity())       : message += errMsg['b']['f3']; break;
                default                                  : message += errMsg['b']['ok']; break;
            }
            if (is_able) {
                message += global.cities[is_able]+'.';
            }
            addLog(message, 'help', null, 'autotravel');
            me.reset();
            return false;
        }
        me.reset();
        return this;
    }
    /**
     * Create a fight_result from a first attack
     * @constructor
     * @param {Object} htmlText
     * @return {CSQueryResult}
     */
    var CSFightResult = function(htmlText) {
        var me = this;
        
        (function($html){
            me.fight_wrapper         = $('#fight_wrapper', $html);
            me.atkbtn_req            = $('#fightv2_atkbtn_boost_on a',       $html).attr('requirements');
            me.poweratkbtn_req       = $('#fightv2_poweratkbtn_boost_on a',  $html).attr('requirements');
            me.atkbtn_boost_on       = $('#fightv2_atkbtn_boost_on a',       $html).attr('href');
            me.atkbtn_boost_off      = $('#fightv2_atkbtn_boost_off a',      $html).attr('href');
            me.poweratkbtn_boost_on  = $('#fightv2_poweratkbtn_boost_on a',  $html).attr('href');
            me.poweratkbtn_boost_off = $('#fightv2_poweratkbtn_boost_off a', $html).attr('href');
            me.opponenet_icon        = $('#defender_pic img',                $html).attr('src');
    
            try {
                me.popup = Util.parsePopup(htmlText);
            }
            catch(err) {}
            
            var fight_result, boostAskFeed, $b;
            var scriptText = $html.find('script:regex(text,FightV2.init)').text();
            
            if (scriptText) {
                fight_result = Util.substr(scriptText,'fight_result = {',';FightV2',15,0);
                boostAskFeed = Util.substr(scriptText,'var feed','MW.Feed(feed)',0,0);
            }
            if (fight_result) {
                me.fight_result = Util.parseJSON(fight_result);
            }
            if (boostAskFeed && ($b = e$('.fv2_boost_ask_allowed a', me.fight_wrapper))) {
                $b.attr('onclick', boostAskFeed+'MW.Feed(feed);');
            }
        })(h$(htmlText));
        
        return me;
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
        
        obj = data = null;
        return this;
    };

    /**
     * Create a new opponent class.
     * @constructor
     * @return {CSOpponent}
     */
    var CSOpponent = function() {
        var me = this;
        var attack_req = {'stamina':1,'health':20};
        var pwratk_req = {'stamina':5,'health':20};

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
        this.fights        = 0;
        this.alive         = false;
        this.won           = 0;
        this.lost          = 0;
        this.isThief       = false;
        this.isNPC         = false;
        this.isRival       = false;
        this.retries       = 0;
        this.attack_url    = null;
        this.pwrattack_url = null;
        this.powerAttack   = false;
        
        this.setReqs = function(attack, pwratk) {
            if (attack && attack.stamina && attack.health) {
                attack_req = attack;
            }
            if (pwratk && pwratk.stamina && pwratk.health) {
                pwratk_req = pwratk;
            }
        };
        
        this.skip = function(reason) {
            me.skipped = true;
            if (!me.result_text) {
                me.result_text = reason;
            }
        };
        
        this.hasPwrAtkUrl = function() {
            return /xw_controller=fight/i.test(me.pwrattack_url);
        };
        this.hasAtkUrl = function() {
            return /xw_controller=fight/i.test(me.attack_url);
        };
        
        this.getAttackUrl = function(bPwrAttack) {
            var boost = 'use_boost=' + (gVar.AttackerUsedBoost ? '1' : '0');
            if (/xw_controller=fight/i.test(me.attack_url)) {
                me.attack_url = me.attack_url.replace(/use_boost=\d+/, boost);
            }
            if (/xw_controller=fight/i.test(me.pwrattack_url)) {
                me.pwrattack_url = me.pwrattack_url.replace(/use_boost=\d+/, boost);
            }
            if((me.powerAttack || bPwrAttack) && me.pwrattack_url) {
                return me.pwrattack_url;
            } else {
                me.powerAttack = false;
            }
            return me.attack_url;
        };
        
        this.requirements = function() {
            if (me.powerAttack && me.pwrattack_url) {
                return pwratk_req;
            } else {
                return attack_req;
            }
        };
        
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
     * Create an ICE Stolen popup class
     * @param {String} popup_html
     * @return {CSStolenIce}
     */
    var CSStolenIce = function(fight_data) {
        var me = this;
        var $name = $('<div>'+fight_data.thief_name+'</div>');

        this.clanName = null;
        if ( fight_data.thief_in_clan ) {
            me.clanName = $('span', $name).text();
            $('span', $name).remove();
        }
        this.id       = Util.parseNum(fight_data.thief_id);
        this.name     = Util.trim($name.text());
        this.action   = $(fight_data.thief_btn).attr('href');
        this.level    = Util.parseNum(fight_data.thief_class);
        this.pic      = $(fight_data.thief_pic).attr('src');
        this.inClan   = fight_data.thief_in_clan;
        this.inMafia  = fight_data.thief_isInMafia;
        this.tyClass  = fight_data.thief_class;
        /**
         * Return link
         */
        this.anchor = function() {
            return Util.setAnchor(MW.getProfileLink(me.id),
            (me.clanName?Util.setColor(me.clanName,'red')+' ':'') + me.name);
        };

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
        item_html = null;
        return this;
    };

    /**
     * Create a Loot class
     * @param {String} item_html
     * @return {CSItemLoot}
     */
    var CSItemLoot = function(item_html, count) {
        var me = this;
        var loot = gVar.InventoryData.data;
        var $itm = c$('div').html(item_html);
        this.name     = 'Unknow';
        this.type     = 'Unknow'; 
        this.item_id  = $itm.find('.item_card_mini').attr('item_id');
        this.pic      = $itm.find('.item_card_mini img').attr('src');
        this.attack   = Util.parseNum($itm.find('.attack').text());
        this.defense  = Util.parseNum($itm.find('.defense').text());
        this.count    = parseInt(count);
        this.longName = function() {
            var longName = me.name;
            if (me.attack) {
                longName += ' <span class="attack">'+me.attack+'</span>';
            }
            if (me.defense) {
                longName += ' <span class="defense">'+me.defense+'</span>';
            }
            if (me.increaseAttack) {
                longName += ' (<span class="attack" style="color:green;">+'+me.increaseAttack+'</span>)';
            }
            if (me.increaseDefense) {
                longName += ' (<span class="defense" style="color:green;">+'+me.increaseDefense+'</span>)';
            }
            return longName;
        }
        if (loot && (loot = loot[me.item_id])) {
            me.name = loot.name;
            me.type = loot.type;
        }
        item_html = null;
        return this;
    };

    /**
     * Create an Ice Event Loot class
     * @param {String} item_html
     * @return {CSItemLoot}
     */
    var CSItemIceEvent = function(item_html) {
        var $itm      = c$('div').html(item_html);
        this.title    = $itm.find('.ice > div > div').text();
        this.pic      = $itm.find('.ice img').attr('src');
        this.count    = Util.parseNum(this.title);
        this.event    = true;
        this.item_id  = String(this.title).toLowerCase().replace(/\s/g,'');
        if ( this.count === 0 ) {
            this.count = 1;
        }
        item_html = null;
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
            var success_msg = 'You\'ve ${count} ICES.<br>Auto-Publish has posts all and reseted count.';
            var error_msg = 'Error code #${errorcode}<br>${errormsg}';
            var properties = publish;
            
            publish = new Object();
            
            facebook.streamPublish({
                'target'      : target_id,
                'name'        : '{*actor*} has eliminated some players!',
                'properties'  : properties
            }, function(post_id) {
                if (post_id && !post_id.error_code) {
                    success_msg = Util.render(success_msg, {
                        'count': Util.length(properties)
                    });
                    addLog(success_msg, 'published', null, 'autopublish');
                }
                else if (post_id.error_code) {
                    error_msg = Util.render(error_msg, {
                        'errorcode' : post_id.error_code,
                        'errormsg'  : post_id.error_msg
                    });
                    addLog(error_msg, 'published', null, 'autopublish');
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
        var me = this;
        var cache = new Object();
        var lootTypes = new Object();
        /**
         * Estimate stats increased by a loot.
         * @param {Object} loot
         */
        function estimateStatsIncrease(loot) {
            if (!gVar.InventoryData.data) {
                return false;
            }
            var best = gVar.InventoryData.data[loot.item_id];
            var worst = (best && gVar.WorstItems) ? gVar.WorstItems[best.type] : false;
            if (best && worst) {
                if (best.attack && best.attack > worst.att) {
                    AttackerStats.atkGained += (loot.increaseAttack = (best.attack - worst.att))*loot.count;
                }
                if (best.defense && best.defense > worst.def) {
                    AttackerStats.defGained += (loot.increaseDefense = (best.defense - worst.def))*loot.count;
                    
                }
            }
            return true;
        }
        /**
         * Get a singular loot data.
         * @param {CSItemLoot} loot
         */
        function loadLoot(loot, callback) {
            Logger.debug('getItemInfo: Loading loot...');
            MW.getItemInfo(loot.item_id, function(name, type) {
                loot.name = name;
                if (lootTypes && lootTypes[type]) {
                    loot.type = lootTypes[type];
                }
                if (gVar.InventoryData.data && !gVar.InventoryData.data[loot.item_id]) {
                    gVar.InventoryData.add('forceReload', true);
                    gVar.InventoryData.data[loot.item_id] = {
                        id: loot.item_id,
                        name: name,
                        type: lootTypes[type],
                        attack: loot.attack,
                        defense: loot.defense
                    };
                    gVar.InventoryData.save();
                }
                Logger.debug('getItemInfo: loot loaded.');
            });
        }
        /**
         * Load the loot name data.
         * @param {Object} callback
         */
        this.load = function(callback) {
            var fields = ['id','name','type','attack','defense'];
            gVar.InventoryData.load(function() {
               if (!gVar.InventoryData.data || gVar.InventoryData.forceReload) {
                    // Load Inventory
                    MW.getInventoryData(function(data) {
                        if (data && data.Items) {
                            gVar.InventoryData.data = new Object();
                            Util.each(data.Items.data, function(id, data) {
                                var cdata = (gVar.InventoryData.data[id] = new Object());
                                Util.each(fields, function(index, field_name) {
                                    cdata[field_name] = data[field_name];
                                });
                            });
                            gVar.InventoryData.save(function(){
                                Logger.debug('Inventory Data saved.');
                                callback&&callback(true);
                            });
                        } else {
                            callback&&callback(false);
                        }
                    });
               } else {
                   callback&&callback(true);
               }
            });
        };
        /**
         * @param {CSItemLoot} loot
         */
        this.add = function(loot) {
            var count = loot.count||1;
            if (Util.isSet(cache[loot.item_id])) {
                (loot = cache[loot.item_id]).count += count;
            } else {
                cache[loot.item_id] = loot;
            }
            if (!estimateStatsIncrease(loot)) {
                loadLoot(loot);
            }
            return loot;
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
         * Loops through all loot items.
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
                    var a1 = a.attack  || 0,
                        d1 = a.defense || 0,
                        a2 = b.attack  || 0,
                        d2 = b.defense || 0,
                        t1 = (a.increaseAttack||0)+(a.increaseDefense||0),
                        e1 = (b.increaseAttack||0)+(b.increaseDefense||0);
                    switch(true) {
                        case (t1 != e1): return e1 - t1;
                        case (a1 != a2): return a2 - a1;
                        case (d1 != d2): return d2 - d1;
                        default:         return 0;
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
            if (Util.isSet(id) && options.get(list_id)) {
               delete options.get(list_id)[id]; 
            }
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
            var list = options.get(list_id);
            var new_array = [];
            if (Util.length(list) > 0) {
                Util.each(list, function(id, name) {
                    if (parseInt(id) && Util.isString(name));
                        new_array.push({'id':id , 'name':name});
                });
            }
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
        this.add = function(opp) {
            var is_added = false;
            Util.each(players, function(index, p) {
                return !(is_added = (p.id === opp.id));
            });
            players.push(opp);
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
                var result = new Array();
                
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
            LootCache.each(function(id, loot) {
                addLootLog(loot, true);
            }, by);
            return false;
        },
        revenge_click: function() {
            gVar.Aborted = false;
            if (PlayerList.revenge) {
                PlayerList.current = PlayerList.revenge;
                updateNewOpponent();
                manualAttack();
            }
            return false;
        },
        use_boost_click: function() {
            var state = (this.id === 'fightv2_boost_on') ? 'on' : 'off';
            httpAjaxRequest({
                url: 'remote/'+MW.getIntURL('fight','setBoostToggle')+'&toggle_state='+state,
                success: function() {
                    $('#fightv2_boost_on, #fightv2_boost_off', popupElt.content).removeClass('checked');
                    $('#fightv2_boost_'+state, popupElt.content).addClass('checked');
                    gVar.AttackerUsedBoost = (state === 'on');
                }
            });
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
            $('#import_settings').remove();
            c$('input:file','id:import_settings,name:files[],lst:'+name).css({
                'position':'absolute',
                'width':1,
                'left':'-100px',
                'opacity':0
            })
            .appendTo(popupElt.content).change(Events.importData_change).click();
            return false;
        },
        importData_change: function(e) {
            var list = options.get($(this).attr('lst'));
            if (!e.target.files || !list) {
                return;
            }
            FileSystem.fileReader(e.target.files, function(data) {
                var index = data.indexOf('base64,');
                try {
                    if (index > 0) {
                        data = global.Base64.decode(data.substr(index + 7));
                    }
                    Util.each(Util.parseJSON(data), function(name, value) {
                        if (parseInt(name))
                            list[name] = value;
                    });
                    options.toDomElements();
                    options.save();
                    showHelpPopup({
                        icon:'info',
                        title:'Import List',
                        message:'List imported successfully.'
                    });
                }
                catch(err) {
                    Logger.error(err);
                }
                finally {
                    $(e.target).remove();
                }
            });
        },
        getList_click: function() {
            var name = $(this).attr('name');
            var sOutput = String(Util.toJSON(options.get(name)));
            if (sOutput.length < 5) {
                return false;
            }
            $(this).attr({
                'target': '_black',
                'download': 'Battlefield_'+name+'.txt',
                'href': 'data:plain/text,data:application/json;base64,'+global.Base64.encode(sOutput)
            });
            return true;
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
            updateStats();
            setTimeout(function() {
                PlayerList.clear();
                refreshPlayerList(function(result) {
                    if (result > 0) {
                        var s_added = '<div style="text-align:left;">Opponents Added: ';
                        s_added += Util.setColor(result, 'green')+'</div>';
                        showFightRewards(s_added);
                        genEnemyListDom();
                    }
                    else {
                        sendMessage('No players found. Try change filters and click "Refresh".');
                    }
                    $('#ctrlcontainer', popupElt.content).show();
                });
            }, 500);
            return false;
        },
        attack_click: function() {
            gVar.Aborted = false;
            options.fromDomElements();
            options.save();
            var id = this.id.match(/attack_id_(\d+)/)[1];
            PlayerList.setCurrent(id);
            if (options.travelToStartCity) {
                gVar.StartCity = options.startCity;
            }
            $('#fight_wrapper', popupElt.content).empty();
            toFightScreen();
            reqSurvey(function() {
                gVar.SaveFromElements = false;
                manualAttack();
            });
            return false;
        },
        powerAttack_click: function() {
            PlayerList.current.powerAttack = true;
            manualAttack();
            return false;
        },
        attackAgain_click: function() {
            manualAttack();
            return false;
        },
        runAway_click: function() {
            stopAutoFight();
            gVar.AttackWhitelist = false;
            gVar.AttackFamilyList = false;
            options.toDomElements();
            options.save();
            gVar.SaveFromElements = true;
            if (PlayerList.length() > 0) genEnemyListDom();
            toStartScreen();
            return false;
        },
        autoMode_click: function() {
            httpAjaxStopRequests();
            gVar.Aborted = false;
            options.fromDomElements();
            options.save();
            toFightScreen();
            if (options.travelToStartCity) gVar.StartCity = options.startCity;
            AutoTravelCounter.reset();
            gVar.SaveFromElements = false;
            if (options.timerStartActive === true) {
                addAutoControls(true);
                addFightResumeCountdown(options.timerStartMins);
            } else {
                resetAllTimers()
                reqSurvey(AttackNewOpponent);
            }
            return false;
        },
        attackWhiteList_click: function() {
            gVar.AttackWhitelist = true;
            gVar.AttackFamilyList = false;
            gVar.Aborted = false;
            PlayerList.whiteList.attack_count = 1;
            gVar.WhiteListArray = PlayerList.whiteList.toArray();
            gVar.WhiteListCache = new Object();
            Events.autoMode_click();
            return false;
        },
        attackFamily_click: function() {
            gVar.AttackWhitelist = false;
            gVar.AttackFamilyList = true;
            gVar.Aborted = false;
            toFightScreen();
            getFamilyOpponents(Events.autoMode_click);
            return false;
        },
        stop_click: function() {
            $(this).remove();
            stopAutoFight('User stopped.');
            setTimeout(function() {
                sendMessage('AutoFight was stopped.');
                addAutoControls(true);
            }, 500);
            return false;
        },
        skip_click: function() {
            $(this).remove();
            PlayerList.current.skip('User skip manually.');
            return false;
        },
        autoHeal_click: function() {
            var instant = $(this).attr('instantheal');
            $(this).remove();
            gVar.ForceHeal = true;
            if ( parseInt(instant) === 1 ) {
                clearAllTimers();
                healPlayer(function() {
                    resetAllTimers();
                    preAttack();
                });
            }
            return false;
        },
        heal_click: function() {
            hideFightControls();
            healPlayer(addManualControls);
            return false;
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
        .append(x$('bfopt_travelautomatic', 'Automatic.'));

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
        .append(x$('bfopt_attackusemax', 'Maximum attacks:'))
        .append(n$('bfopt_attackmax', 60))
        .append(x$('bfopt_attackuseperfoe', 'Attacks Per Foe:'))
        .append(n$('bfopt_attackperfoe', 60))
        .append(n$('bfopt_attackretries', 'Error Retries:', 40))
        .append(x$('bfopt_attackpwr', 'Power Attack!'));
        //.append(x$('bfopt_attacktonpc', 'Attack non-players targets.'));
        
        // REVENGES / NPC
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_attackrevenge', 'Revenge thiefs:'))
        .append(s$('bfopt_attackrevengefilter', 200))
        .append(x$('bfopt_timerrivalsactive', 'Attack Rivals every'))
        .append(n$('bfopt_timerrivalsmins', '(min.):', 40));
        
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
        .append(x$('bfopt_levelrangeactive', 'Level:'))
        .append(n$('bfopt_levelrangemin', 40))
        .append(n$('bfopt_levelrangemax', '-', 40))
        .append(s$('bfopt_levelrangemethod', 'is:', 90))
        .append(s$('bfopt_comparerangemethod', 60))
        .append(x$('bfopt_mafiarangeactive', 'Mafia:'))
        .append(n$('bfopt_mafiarangemin', 40))
        .append(n$('bfopt_mafiarangemax', '-', 40))
        .append(s$('bfopt_mafiarangemethod', 'is:', 90));

        // AUTOPUBLISH
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_publishactive', 'Auto Publish after:'))
        .append(s$('bfopt_publishafter', 80))
        .append(t$('bfopt_publishto', 'ices to page/group (empty for wall):', 180));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_usestampack', 'Use StaminaPack if exp. above:'))
        .append(n$('bfopt_usestampackwhen', 50))
        .append(x$('bfopt_usehealpack', 'Use HealthPack if stamina above:'))
        .append(n$('bfopt_usehealpackwhen', 50));

        // -----------------
        // CONFIG PAGE 2
        // -----------------

        divListElt = c$('ul').appendTo(tabs.getLayout(1));

        // NAME FILTER
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_namefilteractive', 'Name filter:', 'div').css({'width':90,'float':'left'}))
        .append(c$('input:text', 'id:bfopt_namefilterexpr,readonly:readonly').width(520).css('margin-right',5))
        .append(c$('a', 'for:bfopt_namefilterexpr').text('EDIT').click(Events.editFilter));
        
        // BADGE FILTER
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_badgefilteractive', 'Badge filter:', 'div').css({'width':90,'float':'left'}))
        .append(c$('input:text', 'id:bfopt_badgefilterexpr,readonly:readonly').width(520).css('margin-right',5))
        .append(c$('a', 'for:bfopt_badgefilterexpr').text('EDIT').click(Events.editFilter));

        // SKIP
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_skipiced', 'Skip Iced targets.'))
        .append(x$('bfopt_skipicedbyme', 'Skip targets iced by me.'));
        
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_skipusemincash', 'Skip cash below:'))
        .append(n$('bfopt_skipbymincash', 60))
        .append(x$('bfopt_skipwrongcash', 'Skip wrong cash.'));
        
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_skipusehealth', 'Skip health:'))
        .append(s$('bfopt_skiphealth', 80))
        .append(x$('bfopt_skipunderattk', 'Skip under attack if damage percent'))
        .append(s$('bfopt_skipunderattkpct', 80));
        
        // STOP - RESUME
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_stopbyices', 'Stop when ICE amount is more than:'))
        .append(n$('bfopt_stopiceamount', 40))
        .append(x$('bfopt_stopkeepstaon', 'Stop If stamina is less than:'))
        .append(n$('bfopt_stopkeepsta', 40));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_stopbylevelup', 'Stop after LevelUp.'))
        .append(x$('bfopt_stopkeepexpon', 'Stop before LevelUp and keep:'))
        .append(n$('bfopt_stopkeepexp', 40))
        .append(c$('span').text('Exp.'));

        c$('li').appendTo(divListElt)
        .append(x$('bfopt_stopautomatic', 'Stop AutoFight if health fall down quickly.'))
        .append(x$('bfopt_stopresume', 'Keep and resume after (min):'))
        .append(n$('bfopt_stopresumedelay', 40));
        
        c$('li').appendTo(divListElt)
        .append(x$('bfopt_timerstartactive', 'Start Fighting after (min):'))
        .append(n$('bfopt_timerstartmins', 40))
        .append(x$('bfopt_timerfightactive', 'AutoPause after (min):'))
        .append(n$('bfopt_timerfightmins', 40))
        .append(n$('bfopt_timerfightresume',' resume after (min): ', 40));
        
        // LOG LENGTH
        c$('li').appendTo(divListElt)
        .append(c$('label','for:bfopt_maxloglength').text('Log Length:'))
        .append(s$('bfopt_maxloglength', 100).css('margin-left',5))
        .append(x$('bfopt_showsocialevents', 'Show social events.'))
        .append(x$('bfopt_collectclanfightxp', 'Collect Clan fight XP.'));

        $('a', divListElt).css('margin-left',5);
        
        
        function generateList($parent, sName) {
            var $elt = c$('div').appendTo($parent).css({
                'float':'left',
                'text-align':'left',
                'margin':5,
                'width':500
            });
    
            var table = c$('div',sName+'_table').appendTo($parent).css({
                'float': 'left',
                'padding-top': 50
            });
            
            Util.each([
                {id:'add_new_list',     name:sName, text:'Add New',    evt:Events.addNewToList_click},
                {id:'delete_item_list', name:sName, text:'Delete',     evt:Events.deleteSelected_click},
                {id:'clear_list',       name:sName, text:'Clear List', evt:Events.clearList_click},
                {id:'go_profile',       name:sName, text:'MW Profile', evt:Events.mwProfile_click},
                {id:'add_from_list',    name:sName, text:'Load List',  evt:Events.addFromList_click},
                {id:'get_current_list', name:sName, text:'Save List',  evt:Events.getList_click}
            ], function(i,b) {
                b$(b.text, 'id:'+b.id+',name:'+b.name+',class:short white fightV2AttackBtn')
                .appendTo(c$('dl').appendTo(table).css('margin',5)).click(b.evt);
            });
            
            return $elt;
        }
        
        // -----------------
        // BLACKLIST OPTIONS
        // -----------------
        generateList(tabs.getLayout(2), 'blackList')
        .append(x$('bfopt_useblacklist','Add players who defeat me to BlackList:'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_blacklist,multiple:multiple').width(500).height(270));

        // -----------------
        // WHITELIST OPTIONS
        // -----------------
        generateList(tabs.getLayout(3), 'whiteList')
        .append(x$('bfopt_whitelistcountactive','Attack whitelist only:'))
        .append(n$('bfopt_whitelistcount', 40))
        .append(c$('span').text(' times.'))
        .append(x$('bfopt_randomizewhitelist','Randomize Whitelist.'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_whitelist,multiple:multiple').width(500).height(250));
        
        // -----------------
        // FRIEND CLANLIST OPTIONS
        // -----------------
        generateList(tabs.getLayout(4), 'frdClanList')
        .append(c$('div').text('Add your friendly families to skip here:'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_frdclanlist,multiple:multiple').width(500).height(270));

        // -----------------
        // ENEMY CLANLIST OPTIONS
        // -----------------
        generateList(tabs.getLayout(5), 'enmClanList')
        .append(c$('div').text('Add your Enemy families to attack here:'))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(c$('select', 'id:bfopt_enmclanlist,multiple:multiple').width(500).height(270));


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
            {name:'Current City:',      cls:'stat_travel',         id:'currcityname'                       },
            {name:'Total Fights:',      cls:'stamina',             id:'fightCount'                         },
            {name:'Won Fights:',        cls:'attack',              id:'fightWon'                           },
            {name:'Lost Fights:',       cls:'defense',             id:'fightLost'                          },
            {name:'Foes Attacked:',     cls:'attack',              id:'foesAttacked'                       },
            {name:'Foes Ice/Kill:',     cls:'stat_kill',           id:['killWon', 'icesWon']               },
            {name:'Session Ices:',      cls:'stat_kill',           id:'session_ices'                       },
            {name:'Stolen Ices:',       res:'thief_icon',          id:'icesLost'                           },
            {name:'Revenges:',          cls:'attack',              id:'revenge'                            },
            {name:'Clan fight XP:',     cls:'stat_iced',           id:['exp_fight_max', 'exp_fight']       },
            {name:'Ice Season:',        cls:'stat_iced',           id:['season_target','season_ices']      },
            {name:'Total Ices:',        cls:'stat_iced',           id:'total_ices'                         },
            {name:'Attack gained:',     cls:'mafia_attack',        id:'atkgained'                          },
            {name:'Defense gained:',    cls:'mafia_defense',       id:'defgained'                          },
            {name:'Exp. gained:',       cls:'experience',          id:['exptonextlevel','expGained']       },
            {name:'Exp. per stamina:',  cls:'experience',          id:'exp_per_sta'                        },
            {name:'Victory Coins:',     cls:'stat_victory',        id:'coinsGained'                        },
            {name:'Cash:',              cls:'cash',                id:'cash'                               },
            {name:'PowerPack:',         cls:'stat_powerpack',      id:'powerpack'                          },
            {name:'Load Rivals:',       res:'timer_icon',          id:'loadrivals'                         },
            {name:'Auto Travel:',       res:'timer_icon',          id:'timetotravel'                       },
            {name:'Auto Pause:',        res:'timer_icon',          id:'timetopause'                        }
        ],
        function(index, stat) {
            var $span = c$('span').text(stat.name);
            var $dl = c$('dl').appendTo(fightV2_stats);

            if (stat.cls) {
                $dl.append(c$('dt', 'class:'+stat.cls).append($span));
            }
            else {
                if (stat.icn) {
                    $dl.append(c$('img').attr('src',global.zGraphicsURL + stat.icn));
                }
                else if (stat.res) {
                    $dl.addClass(Resources.className(stat.res)).css({
                        'width': 'auto',
                        'padding-left': 19
                    });
                }
                $dl.append(c$('dt').append($span));
            }
            if (Util.isString(stat.id)) {
                $dl.append(c$('dd', 'id:mass_stat_'+stat.id).text('0'));
            }
            else {
                $dl.append(c$('dd', 'id:mass_stat_'+stat.id[0]).text('0'));
                $dl.append(c$('dd').text('/'));
                $dl.append(c$('dd', 'id:mass_stat_'+stat.id[1]).text('0'));
            }
        });        
        
        (function($parent) {
            var $div, $elt = c$('div', 'events_list').appendTo($parent);
            
            c$('div', 'class:buttons').appendTo($elt)
            .append(c$('a', 'href:#items,class:selected').text('General').click(Events.showLog_click))
            .append(c$('a', 'href:#loot').text('Loot').click(Events.showLog_click))
            .append(c$('a', 'href:#iced').text('Ices').click(Events.showLog_click))
            .append(c$('a', 'href:#events').text('Events').click(Events.showLog_click));
            
            c$('div', 'id:items_logs,class:player_updates').height(420).appendTo($elt);
            
            c$('div', 'id:loot_logs').appendTo($elt)
            .append(c$('div', 'class:buttons').css('text-align','right')
            .append(c$('a', 'href:#name').text('Name').click(Events.sortloot_click))
            .append(c$('a', 'href:#attack').text('Attack').click(Events.sortloot_click))
            .append(c$('a', 'href:#defense').text('Defense').click(Events.sortloot_click))
            .append(c$('a', 'href:#best').text('Best').click(Events.sortloot_click)))
            .append(c$('ul', 'id:lootlistlog').height(401));
                
            $div = c$('div', 'id:iced_logs').height(420).css('text-align','center').appendTo($elt);
            
            c$('textarea','readonly:readonly,id:text_plain_ice_log').css({
                'width': '90%',
                'height': '90%',
                'color': 'white',
                'background-color': 'transparent',
                'border': 0
            }).appendTo($div);
            
            c$('div').css('clear','both').appendTo($div);
            b$('Select All','class:short green').css({'float':'right','margin-right':15})
            .attr('onclick',"$(this).prevAll('textarea').select(); return false;").appendTo($div);
            
            c$('div', 'id:events_logs').height(420).appendTo($elt).append(c$('ul','id:eventslogger'));
            
            // MANUAL LIST OF FIGHTERS
            $div = c$('div', 'opponents_list').appendTo($parent);
            
            c$('div', 'class:header').appendTo($div)
            .append(c$('a', 'sort_by_name').text('Name').click(Events.sort_click))
            .append(c$('a', 'sort_by_level').text('Level').click(Events.sort_click))
            .append(c$('a', 'sort_by_mafia').text('Mafia').click(Events.sort_click))
            .append(c$('a').text('Refresh').click(Events.refresh_click));
            
            c$('div', 'id:opponents_table,class:player_updates').appendTo($div);
            
        })( c$('div', 'class:fightV2_log').appendTo(wrapper_log_stats) );
        
        popupElt.applyOptions({
            'bfopt_healcity'            : global.cities,
            'bfopt_startcity'           : global.cities,
            'bfopt_comparerangemethod'  : {'AND': 'AND', 'OR': 'OR'},
            'bfopt_attkdelaya'          : {1:'1-3', 2:'2-4', 3:'3-5', 4:'1-5'},
            'bfopt_attkdelayb'          : {1:'1', 2:'2', 3:'3', 4:'4'},
            'bfopt_levelrangemethod'    : {'attk':'Attacked', 'skip':'Skipped'},
            'bfopt_mafiarangemethod'    : {'attk':'Attacked', 'skip':'Skipped'},
            'bfopt_attackrevengefilter' : {0:'Attack to everyone',1:'Attack to any level/mafia',2:'Use all filters'},
            'bfopt_maxloglength'        : {10:'10', 50:'50', 100:'100', 250:'250', 500:'500', 1000:'1000'},
            'bfopt_publishafter'        : {5:'5', 10:'10', 15:'15', 20:'20'},
            'bfopt_skiphealth'          : {20:'> 20%', 30:'> 30%', 40:'> 40%', 50:'> 50%', 60:'> 60%', 70:'> 70%', 80:'> 80%', 90:'> 90%', 100:'100%'},
            'bfopt_skipunderattkpct'    : {5:'> 5%', 10:'> 10%', 15:'> 15%', 20:'> 20%', 25:'> 25%', 30:'> 30%', 40:'> 40%', 50:'> 50%'},
            'bfopt_rapidfirehealth'     : {10:'< 10%', 20:'< 20%', 30:'< 30%', 40:'< 40%', 50:'< 50%', 60:'< 60%', 70:'< 70%', 80:'< 80%', 90:'< 90%', 100:'< 100%'}
        });
        
        // fix class
        $('input:text, select, textarea', popupElt.content).addClass('black_box');
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

        StatusTimer.start('Ready to attack '+PlayerList.current.anchor()+' in %N% seconds...', delay, fn);
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
        StatusTimer.start('Ready to attack '+PlayerList.current.anchor()+' in %N% seconds...', delay, fn);
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
        var profileRegex = /(profile|family).php\?id=([^\n]+)|user=([^\n]+)|^([\s\d,\n]+)$/g;
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
                data.push(global.Base64.decode(rgx[3]));
            }
            else if (rgx[4]) {
                data = String(rgx[4]).split(/[\s,\n]+/);
                break;
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
        var $html = h$(data), sText;
        try {
            opp.attack_url = String($('a:regex(href,xw_action=attack)', $html).attr('href'));
            opp.id = Util.parseNum(Util.uSplit(opp.attack_url).opponent_id);
            sText = Util.htmlDecode($html.find('.stats_title .stats_title_text:first').text());
            opp.name = Util.substr(sText, '"', '"', 1, 0, 0, true);
            opp.level = Util.parseNum(sText.substr(sText.lastIndexOf('"') + 1));
        }
        catch(err) {
            Logger.error(err);
            return {error_msg:err.message};
        }
        return opp;
    }

    function parseClanProfile(data) {
        var clan = new Object();
        var $html = h$(data);
        try {
            clan.name = $html.find('#clan_main #clan_header > h3').text();
        }
        catch(err) {
            Logger.error(err);
            return {error_msg:err.message};
        }
        return clan;
    }
    function getFamilyOpponents(callback) {
        var message = 'Found <span style="color:green;">${added}</span> Players in Family ${family}.<br>${result}...'
        var tempList = PlayerList.enmClanList.toArray();
        gVar.FamilyListArrays.original = new Array();
        
        function getFamily(p) {
            var url = 'remote/' + MW.getIntURL('clan') + '&from_red_link=1&id=';
            
            httpAjaxRequest({url: url + global.Base64.encode(p.id),
                success: function(htmlText) {
                    var elt = h$(htmlText);
                    var tmpl = {
                        added: 0,
                        family: elt.find('#clan_main #clan_header > h3').text(),
                        result: 'All families loaded, starting'
                    };                    
                    elt.find('ul#member_list li').each(function(index, element) {
                        var user;
                        try {
                            user = Util.uSplit($('.name_n_rank a',element).attr('href')).user;
                            user = global.Base64.decode(user);
                            gVar.FamilyListArrays.original.push(Util.parseNum(user));
                            tmpl.added++;
                        }
                        catch(err) {
                            Logger.error('AttackFamilies.getFamily:'+ err.message);
                        }
                    });
                    if (tempList.length > 0) {
                        tmpl.result = 'Loading next family';
                        getFamily(tempList.shift());
                    } else {
                        callback();
                    }
                    addLog(Util.render(message,tmpl), 'help', null, 'attackfamily');
                }
            });
        }        
        sendMessage('Loading families...', true);
        PlayerList.clear();
        if (tempList.length < 1) {
            sendMessage('There is no families in your enemy family list.');
            stopAutoFight();
        } else {
            getFamily(tempList.shift());
        }
    }

    function fromFamilyList() {
        if (gVar.FamilyListArrays.original.length < 1) {
            sendMessage('There is no more possible enemies to attack in your family list.');
            stopAutoFight();          
        }
        if (!Util.isArray(gVar.FamilyListArrays.current) || gVar.FamilyListArrays.current.length < 1) {
            gVar.FamilyListArrays.current = gVar.FamilyListArrays.original.slice();
        }        
        var pId;
        if (gVar.FamilyListArrays.current.length > 1) {
            pId = gVar.FamilyListArrays.current.splice(Math.random() * gVar.FamilyListArrays.current.length, 1).shift();
        } else {
            pId = gVar.FamilyListArrays.current.shift();
        }

        if (PlayerList.blackList.exists(pId)) {
            gVar.FamilyListArrays.original.splice(gVar.FamilyListArrays.original.indexOf(pId), 1);
            fromFamilyList();
            Logger.debug('Enemy Family "' + pId + '" is blacklisted.');
            return;
        }
        if ( Util.isSet(gVar.FamilyListCache[pId]) ) {
            PlayerList.current = gVar.FamilyListCache[pId].clone();
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
                    gVar.FamilyListCache[pId] = PlayerList.current.clone();
                    updateNewOpponent();
                    preAttack();
                }
            });
        }
    }

    function fromRandomWhiteList() {
        if (gVar.WhiteListArray.length < 1) {
            if (PlayerList.whiteList.length() > 0 && (!options.whiteListCountActive 
                 || PlayerList.whiteList.attack_count < options.whiteListCount)) 
            {
                PlayerList.whiteList.attack_count++;
                gVar.WhiteListArray = PlayerList.whiteList.toArray();
                
            } else {
                if (options.whiteListCountActive) {
                    gVar.AttackWhitelist = false;
                    AttackNewOpponent();
                } else {
                    sendMessage('No enemy in WhiteList. Please add players to attack.');
                    stopAutoFight();
                }
                return; 
            }            
        }
        
        var p;
        if (options.randomizeWhiteList && gVar.WhiteListArray.length > 1) {
            p = gVar.WhiteListArray.splice(Math.random() * gVar.WhiteListArray.length, 1).shift();
        } else {
            p = gVar.WhiteListArray.shift();
        }

        if (PlayerList.blackList.exists(p.id)) {
            PlayerList.whiteList.remove(p.id);
            fromRandomWhiteList();
            Logger.debug('Whitelist enemy "' + p.name + '" is blacklisted.');
            return;
        }
        if ( Util.isSet(gVar.WhiteListCache[p.id]) ) {
            PlayerList.current = gVar.WhiteListCache[p.id].clone();
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
                    gVar.WhiteListCache[p.id] = PlayerList.current.clone();
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
        var bInRanges = true;
        function isInLevelRange() {
            if (options.levelRangeActive !== true) {
                return (options.compareRangeMethod==='AND');
            }
            if (opp.level >= options.levelRangeMin && opp.level <= options.levelRangeMax) {
                return (options.levelRangeMethod === 'attk');
            } else {
                return (options.levelRangeMethod !== 'attk');
            }
        }
        function isInMafiaRange() {
            if (options.mafiaRangeActive !== true) {
                return (options.compareRangeMethod==='AND');
            }
            if (opp.mafia >= options.mafiaRangeMin && opp.mafia <= options.mafiaRangeMax) {
                return (options.mafiaRangeMethod === 'attk');
            } else {
                return (options.mafiaRangeMethod !== 'attk');
            }
        }
        function isFiltered(expr, str) {
            if (!Util.isString(expr) || expr.length < 1) {
                return false;
            }
            return (new RegExp(expr, 'i')).test(str);
        }

        if ( opp.isNPC === true ) {
            return false;//options.attackToNpc; disabled.
        }
        if (parseInt(opp.id)===98025069 || options.skipIced === true && opp.iced === true) {
            return false;
        }
        if (PlayerList.blackList.exists(opp.id)) {
            addEventLog(opp, 'blacklisted.');
            //Logger.debug('skipping blacklisted id: ' + opp.id);
            return false;
        }
        if (PlayerList.whiteList.exists(opp.id) || opp.isRival) {
            // whitelist and rivals users are always valid opponents.
            return true;
        }
        if (opp.isThief === true && options.attackRevengeFilter == 0) {
            // revenge not filtered
            return true;
        }
        if (opp.clanId && PlayerList.frdClanList.exists(opp.clanId)) {
            addEventLog(opp, 'friendly clan: '+opp.clanName);
            //Logger.debug('skipping friendly clan: ' + opp.clanName);
            return false;
        }
        if (options.badgeFilterActive === true ) {
            if (isFiltered(options.badgeFilterExpr, opp.badge)) {
                //addEventLog(opp, 'Badge filtered: '+opp.badge);
                Logger.debug('filtered badge: (' + opp.badge +') '+ opp.name);
                return false;
            }
        }
        if (options.nameFilterActive === true) {
            if (isFiltered(options.nameFilterExpr, opp.clanName + ' ' + opp.name)) {
                //addEventLog(opp, 'Name filtered.');
                Logger.debug('filtered name: ' + opp.clanName + ' ' + opp.name);
                return false;
            }
        }
        if (opp.isThief !== true && options.skipIcedByMe && Util.isSet(gVar.IcedPlayerCache[opp.id])) {
            addEventLog(opp, 'already iced by you.');
            //Logger.debug('skipping "'+opp.name+'" because i iced them.');
            return false;
        }
        if (opp.isThief === true && options.attackRevengeFilter == 1) {
            // revenge not filtered by level
            return true;
        }
        if (options.levelRangeActive||options.mafiaRangeActive) {
            if (options.compareRangeMethod==='AND') {
                bInRanges = (isInLevelRange() && isInMafiaRange());
            } else {
                bInRanges = (isInLevelRange() || isInMafiaRange());
            }
        }
        if (!bInRanges) {
            Logger.debug('Out level/mafia range. level:' + opp.level + ', mafia:' + opp.mafia);
            return false;
        }
        return true;
    }

    // Adds opponents to list
    function addNewOpponents(htmlText) {
        var table = loadFightTable();
        var count = -1;
        if ( table.length > 0 ) {
            count = 0;
            Util.each(table, function(index, opp) {
                if (isValidOpponent(opp)) {
                    PlayerList.add(opp);
                    count++;
                }
            });
            Logger.debug('Added '+count+' opponents.');
        }
        return count;
        /**
         * Load the fight table, normal or rivals.
         */
        function loadFightTable() {
            var $html = h$(htmlText);
            var fields = new Array();
            var query = options.skipIced 
            ? '.fight_table tr:has(td.fight_list_player_alive)'
            : '.fight_table tr:has(td[class^=fight_list_player])';
            // fighters table
            $html.find(query).each(function(index, element) {
                var $el, opp;
                try {
                    if ( ($el = e$('a:regex(href,action=attack)', element)) ) {
                        opp = new CSOpponent();
                        opp.attack_url = $el.attr('href');
                        opp.id = Util.parseNum(Util.uSplit(opp.attack_url).opponent_id);
                        opp.setReqs(Util.parseJSON($el.attr('requirements')));
                    }
                    else {
                        return;
                    }
                    // NPC opponent
                    if ( ($el = e$('td[id^=npc_]', element)) ) {
                        opp.name = Util.trim($el.html());
                        opp.isNPC = true;
                        fields.push(opp);
                        return;
                    }
                    // Normal opponent
                    if (!Util.isSet(opp.id) || opp.id === 0) {
                        return;
                    }
                    if ( ($el = e$('td:eq(0) a:regex(href,controller=clan)', element)) ) {
                        opp.clanId   = global.Base64.decode(Util.uSplit($el.attr('href')).id);
                        opp.clanName = Util.trim($el.text());
                    }
                    opp.isRival   = (e$('a:regex(href,rivals_remove|rivals_add)', element) !== null);
                    opp.badge     = $('.fight_list_badge_area img', element).attr('title');
                    opp.badge_url = $('.fight_list_badge_area img', element).attr('src');
                    opp.title     = Util.trim($('td:eq(0) span:first', element).text());
                    opp.name      = Util.trim($('td:eq(0) a:regex(href,controller=stats)', element).text());
                    opp.level     = Util.parseNum($('td:eq(0) *[class^=fight_list_level]', element).text());
                    opp.iced      = ($('img:regex(src,iced)', element).length > 0);
                    opp.mafia     = Util.parseNum($('td:eq(1)', element).text());
    
                    fields.push(opp);
                }
                catch(err) {
                    Logger.error('loadFightTable: '+err.message);
                }
            });
            
            return fields;
        }
    }

    // Refresh fight table
    function refreshPlayerList(callback) {
        $('#opponents_table').empty();
        sendMessage('Loading fight page...', true);

        httpAjaxRequest({
            url: 'remote/' + MW.getIntURL('fight'),
            liteLoad: 1,
            success: function(htmlText) {
                var result = 0;
                sendMessage();

                if (/<!--[^:]*:\s*fight_controller/.test(htmlText)) {
                    result = addNewOpponents(htmlText);
                } else {
                    Logger.error('Unexpected page, looking for "fight_controller".');
                }
                if (Util.isFunc(callback)) {
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
            .append(c$('span', 'id:player_name,class:update_txt').css({'color':(pl.iced?'#433':'white'),'width':260}).html(text))
            .append(c$('span', 'id:player_mafia,class:update_txt').width(50).css('padding',5).text(pl.mafia))
            .append(b$('Attack', 'class:short red,id:attack_id_'+ index).click(Events.attack_click).css({
                'float': 'right',
                'margin-right': 15
            }));
        });
    }
    /**
     * Check logs and remove last log item if it's more than maximum.
     * @param {String} list
     */
    function checkMaximumLogs(list) {
        var $ul = $(list||'#items_logs');
        if ($ul.children().length > options.maxLogLength) {
            $ul.children().last().remove();
        }
    }
    /**
     * Add generic loot
     * @param {CSItemCard} loot
     */
    function addGenericLoot(loot) {
        if (loot.type === 'coins') {
            SessionStats.add('coinsGained', Util.parseNum(loot.quantity));
        }
        if ( !options.get('showSocialEvents') ) {
            return;
        }
        var textMessage = 'Social Event:<br>'+ loot.title+' '+loot.quantity;
        var updateItem = c$('div', 'class:update_item,id:generic_item');

        c$('div', 'class:update_timestamp').appendTo(updateItem).html((new Date()).toUTCString());
        c$('div', 'class:update_icon').appendTo(updateItem)
        .append(c$('img').attr({
            'width': 40,
            'height': 40,
            'src': loot.pic
        }));
        c$('div', 'class:update_txt').appendTo(updateItem).html(textMessage);
        checkMaximumLogs();
        $('#items_logs').prepend(updateItem);
    }
    /**
     * Add loot item to loot log.
     * @param {CSItemLoot} loot
     * @param {Boolean} bLastPos
     */
    function addLootLog(loot, bLastPos) {
        if (!Util.isSet(loot)) {
            return;
        }
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
            c$('li', 'loot_'+loot.item_id).append(lootPic)
            .append(c$('span').css('margin-left',10).text('Found '))
            .append(c$('span','item_count').css('color','green').text(loot.count))
            .append(c$('span').css('margin-left',5).append(loot.longName()))
            [bLastPos?'appendTo':'prependTo']('#lootlistlog');
        }
    }
    /**
     * Generate a new log event.
     * @param {String} message
     * @param {String} icon
     * @param {String} pic
     * @param {String} id
     */
    function addLog(message, icon, pic, id) {
        if (!Util.isString(icon)) {
            icon = 'fight';
        }
        checkMaximumLogs();
        var updateItem;
        var updateIcon = c$('img').attr({
            'width': 40,
            'height': 40,
            'src': logIcon[icon]
        });
        if (id) {
            id = icon+'_item_'+id;
            updateItem = e$('#items_logs #'+id, popupElt.content)
            ||           c$('div', 'class:update_item,id:'+id);
        } else {
            id = icon+'_item';
            updateItem = c$('div', 'class:update_item,id:'+id);
        }
        updateItem.empty();
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
        $('a.sexy_button_new', updateItem).css('color', 'black');
        
        // insert
        $('#items_logs').prepend(updateItem);
    }

    function parseLootData(lootData, count) {
        if (Util.isSet(lootData) && lootData.length > 0) {
            var i;
            for (i = 0; i < lootData.length; i++) {
                if ( /fake_item_card/.test(lootData[i]) ) {
                    addGenericLoot(new CSItemCard(lootData[i]));
                }
                else if ( /item_with_preview/.test(lootData[i]) ) {
                    addLootLog( LootCache.add(new CSItemLoot(lootData[i], count)) );
                }
                else if ( /item_card_mini ice/.test(lootData[i]) ) {
                    var evt = new CSItemIceEvent(lootData[i]);
                    checkMaximumLogs('#eventslogger');
                    c$('li').html('&#187; '+Util.setColor('You won: '+evt.title,'green')).prependTo('#eventslogger');
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
        var ice_tmpl = '${name} ${event} ${oppname} to get ${count}.';
        var season_tmpl = 'Season ice: ${ices} of ${target} (left ${left} ices).';
        var log_tmpl = '# [${time}] ${event} ${count} to ${oppname}';
        var tmpl = {
            time     : (new Date()).toLocaleTimeString(),
            name     : 'You',
            event    : 'ICED',
            count    : ice.count,
            ices     : ice.season_ices||0,
            target   : ice.season_target||0,
            oppname  : opp.anchor()
        };
        tmpl.left = tmpl.target - tmpl.ices;
        
        gVar.IcedPlayerCache[opp.id] = true;
        AutoTravelCounter.reset('stolenIce');

        if ( ice.isKilled ) {
            SessionStats.add('killWon');
            AttackerStats.session_ices += 2;
            tmpl.event = 'KILLED';
        }
        else {
            SessionStats.add('icesWon');
            AttackerStats.session_ices++;
        }
        if ( opp.isThief ) {
            SessionStats.add('revenge');
            tmpl.event += ' the THIEF';
        }
        
        if (ice.season_ices && ice.season_target) {
            ice_tmpl += ('<br>' + season_tmpl);
        }

        addLog( Util.render(ice_tmpl, tmpl) +'<br>'+ ice.action, 'iced', opp.image );
        
        if (ice.description) {
            $('#text_plain_ice_log',popupElt.content)[0].value += '# '+ice.description+'\n';
        } else {
            $('#text_plain_ice_log',popupElt.content)[0].value += Util.render(log_tmpl, tmpl);
        }
        if ( options.publishActive && ice.canPublish ) {
            AutoPublish.add( ice, (opp.clanId ? opp.clanName+' '+opp.name : opp.name) );
        }
    }
    /**
     * @param {CSOpponent} opp
     */
    function addStolenIceToLog(opp) {
        var thief = opp.thief;
        var message = 'ICE STOLEN BY: ';
        var result = thief.tyClass;
        
        SessionStats.addStolenIce(thief);
        AutoTravelCounter.stolenIce();

        function skipRevenge() {
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
            result = 'When fighting against '+ opp.anchor() +'.';
            return false;            
        }

        if ( skipRevenge() !== true )
        {
            PlayerList.revenge = new CSOpponent();
            PlayerList.revenge.name = thief.name;
            PlayerList.revenge.id = thief.id;
            PlayerList.revenge.attack_url = thief.action;
            PlayerList.revenge.isThief = true;
            PlayerList.revenge.level = thief.level;
            PlayerList.revenge.clanName = thief.clanName;
        }
        addLog( message+thief.anchor()+'<br>'+result, 'iced', thief.pic, thief.id );
    }
    /**
     * @param {CSOpponent} opp
     * @param {String} reason
     */
    function addEventLog(opp, reason) {
        var $li = e$('#eventslogger #skippedlog'+opp.id)||c$('li','id:skippedlog'+opp.id);
        var text = reason||opp.result_text||'Too late, was iced.';
        $li.html(Util.render('&#187;${action} ${oppname}:${result}', {
            action  : (opp.fights > 0 ? ' Fought against' : ''),
            oppname : opp.anchor(),
            result  : ((opp.name+text).length > 40 ? '<br>' : ' ' ) + text
        }));
        checkMaximumLogs('#eventslogger');
        $li.prependTo('#eventslogger');
    }

    // update stats from AttackerStats and SessionStats classes.
    function updateStats() {        
        Util.each(AttackerStats, function(name, value) {
            var elem = e$('#mass_stat_' + name.toLowerCase());
            if (elem !== null) {
                elem.html(String(value));
            }
        });
        Util.each(SessionStats.currentTotal, function(name, value) {
            var elem = e$('#mass_stat_' + name);
            if (elem !== null) {
                elem.html(String(value));
            }
        });
    }
    /**
     * @param {String} message
     * @param {Boolean} hasAjax
     */
    function sendMessage(message, hasAjax, continue_fn) {
        var $elt = $('#msgcontainer').empty().show();
        if ( Util.isString(message) ) {
            if ( hasAjax === true ) {
                Resources.getPicture('ajax_loader', 'span')
                .appendTo($elt).html(message).css('padding-left', 18);
            }
            else {
                $elt.html(message);
            }
            if ( Util.isFunc(continue_fn) ) {
                $elt.append(c$('a','href:#').text('click here to continue.').click(continue_fn));
            }
        }
    }

    /**
     * @param {Number} toCity
     * @param {Function} callback
     * @param {Number} try_count for private use
     */
    function travelTo(toCity, callback) {
        if (gVar.Aborted) {
            return;
        }
        var trvmsg = 'Traveling to ${city}...';
        var errmsg = 'Unexpected city (#${trycount}), taveling to ${city} in %N% seconds.';
        var tmpl = {trycount: 0};
        // fix possible undefined city
        if ( !Util.isSet(global.cities[toCity]) ) {
            if ( gVar.CurrentCity === (toCity = (gVar.StartCity = 1)) ) {
                callback && callback();
                return;
            }
        }
        (function tryAgain() {
            if (gVar.Aborted) {
                return;
            }
            tmpl.trycount++;
            tmpl.city = global.cities[toCity];
            
            sendMessage(Util.render(trvmsg, tmpl), true);
            
            MW.travel(toCity, function(city) {
                if ((gVar.CurrentCity = parseInt(city)) === parseInt(toCity)) {
                    sendMessage();
                    addTravelCountdown();
                    callback && callback();
                }
                else {
                    // so many tries, removing city and setting a new one.
                    if (tmpl.trycount > 2) {
                        Logger.error('Can\'t travel to '+global.cities[toCity]+' the city will be removed.');
                        delete global.cities[toCity];
                        toCity = setNewCurrentCity();
                        tmpl.trycount = 0;
                    }
                    StatusTimer.start(Util.render(errmsg, tmpl), 3, tryAgain);
                }
            });
        })();
    }
    /**
     * @param {Function} callback
     */
    function healPlayer(callback) {
        if (gVar.Aborted) {
            return;
        }
        var city, try_count = 0, powerPackTry = false;;
        
        function tryHeal() {
            var now = (new Date()).getTime();
            
            if ( (++try_count) < 4 ) {
                city = parseInt(options.healCity);
            }
            else if (city !== 1){
                options.healCity = (city=1);
                options.save();
            } else {
                StatusTimer.start('Error healing. Try again in %N% seconds.', 60, tryHeal);
                return;
            }
            if (gVar.ReadyToHeal > now) {
                if (!gVar.ForceHeal) {
                    gVar.ForceHeal = true;
                    if (options.stopAutomatic === true) {
                        addLog('AutoStop:<br>Your health fall down very quickly.', 'help', null, 'autostop');
                        sendMessage('Seem you\'re under attack!, AutoFight was stopped.');
                        stopAutoFight('AutoStop forced to skip.');
                        if (options.stopResume) {
                            addFightResumeCountdown(parseInt(options.stopResumeDelay||5));
                        }
                        return;
                    } 
                    else {
                        AutoTravelCounter.heal();
                    }
                }
                if (options.useHealPack && AttackerStats.powerPack.avail().hospital) {
                    usePowerPack('hospital', callback, function() {
                        AttackerStats.powerPack.on = false;
                        tryHeal();
                    });
                } else {
                    try_count--;
                    StatusTimer.start('Ready to heal in %N% seconds.', Math.ceil((gVar.ReadyToHeal-now)/1000), tryHeal);
                }
                return;
            }
            gVar.ForceHeal = false;
            
            if (city === 1 && city !== gVar.CurrentCity) {
                Heal('remote/' + MW.getIntURL('hospital', 'heal', gVar.CurrentCity) + '&xcity=1');
            }
            else if (city !== 0 && city !== gVar.CurrentCity) {
                travelTo(city, function() { Heal('remote/' + MW.getIntURL('hospital', 'heal', city)); });
            }
            else {
                Heal('remote/' + MW.getIntURL('hospital', 'heal', city));
            }
        }

        function Heal(url) {
            sendMessage('Healing at ' + global.cities[city] + '...', true);
            httpAjaxRequest({'url':url, 'success': function(jsonData) {
                try {
                    updateUserFields(jsonData);
                    
                    if (AttackerStats.health < Math.min(options.healBelow,AttackerStats.maxHealth-100)) {
                        StatusTimer.start(jsonData.hospital_message+' try again in %N% seconds.', 5, tryHeal);
                    }
                    else {
                        gVar.ReadyToHeal = (new Date()).getTime() + (options.healTimer * 1000);
                        updateHealTimer();
                        addLog(jsonData.hospital_message, 'heal', null, 'healmessage');
                        setHealth(0, AttackerStats.healthPct);
                        updateAttackerHealthVal(AttackerStats.health);
                        updateStats();
                        if (gVar.CurrentCity !== gVar.StartCity && (options.travelToStartCity||city!==1)) {
                            travelTo(gVar.StartCity, callback);
                        }
                        else {
                            callback && callback();
                        }
                    }
                }
                catch(err) {
                    StatusTimer.start('Error healing. Try again in %N% seconds.', 5, tryHeal);
                }
            }});
            
            function updateHealTimer() {
                httpAjaxRequest({
                    'url': 'remote/' + MW.getIntURL('hospital', 'view'), 
                    'success': function(htmlText){
                        var $script = h$(htmlText).find('script:regex(text,var PowerPacks)');
                        if ($script.length > 0) {
                            var waitHealTimer = Util.doRgx(/waitHealTimer:\s*(-?\d+),/i,$script.text()).$1;
                            if (Util.isSet(waitHealTimer)) {
                                Logger.debug('ReadyToHeal set to: '+waitHealTimer+' secs.');
                                gVar.ReadyToHeal = (new Date()).getTime() + (parseInt(waitHealTimer)*1000);
                            }
                        }
                    }
                });
            }
        }
        
        tryHeal();
    }
    /**
     * Uses a PowerPack and attack new opponent if success.
     * @param {Function} success
     * @param {Function} fail
     */
    function usePowerPack(type, success, fail) {
        httpAjaxStopRequests();
        clearAllTimers();
        addAutoControls(true);
        sendMessage('Using PowerPack...', true);
        $('#mass_stat_powerpack').html(Util.setColor('Loading','green'));
        MW.usePack(function(data) {
            $('#mass_stat_powerpack').html(Util.setColor('Inactive','grey'));
            if (data) {
                updateUserFields(data);
                //AttackerStats.powerPack.time = data.timer;
                if (data && data.success) {
                    addLog(data.message,'help',null,'powerpack');
                    resetAllTimers();
                    success&&success();
                } else {
                    addLog('PowerPack:<br>Seem there was a server error.','help',null,'powerpack');
                    fail&&fail();
                }
            } else {
                AttackerStats.powerPack.on = false;
                reqSurvey(fail);
            }
        }, type);
    }
    // -----------------------------
    // MANUAL MODE
    // -----------------------------
    function manualAttack() {
        hideFightControls();

        if (AttackerStats.stamina < getStaminaSpendPerFight()) {
            showHelpPopup({
                icon: 'info',
                title: 'No stamina left',
                message: 'You need to have some stamina to attack.'
            });
            Events.runAway_click();
            return;
        }
        if (AttackerStats.health < PlayerList.current.requirements().health) {
            healPlayer(Attack);
            return;
        }
        Attack(false);
    }
    
    function checkBankMoney(callback) {
        var deposit = UserConfig.main.autoDeposit[gVar.CurrentCity];
        if (deposit && deposit.active === true) {
            if (AttackerStats.userCash > deposit.amount) {
                sendMessage('Depositing '+Util.setColor(Util.formatNum(AttackerStats.userCash),'green')+ '...', true);
                MW.deposit(gVar.StartCity, AttackerStats.userCash, function(result) {
                    if ( result ) {
                        $('#bank_item', '#items_logs').remove();
                        addLog(result, 'bank', null, 'deposit');
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
            if (data.user_fields) {
                user_fields = data.user_fields;
            }
            else {
                eval(Util.substr(String(data),'var user_fields', 'user_fields_update'));
            }
            if (user_fields) {
                gVar.CurrentCity              = parseInt(user_fields['current_city_id']);
                AttackerStats.health          = parseInt(user_fields['user_health']);
                AttackerStats.maxHealth       = parseInt(user_fields['user_max_health']);
                AttackerStats.stamina         = parseInt(user_fields['user_stamina']);
                AttackerStats.maxStamina      = parseInt(user_fields['user_max_stamina']);
                AttackerStats.expToNextLevel  = parseInt(user_fields['exp_to_next_level']);
                AttackerStats.userCash        = parseInt(user_fields['user_cash']);
                AttackerStats.powerPack.ask   = parseInt(user_fields['powerPackAsk']) != 0;
                AttackerStats.powerPack.time1 = parseInt(user_fields['powerPackStaminaUse']);
                AttackerStats.powerPack.time2 = parseInt(user_fields['powerPackHealthUse']);
                AttackerStats.powerPack.count = parseInt(user_fields['powerPackCount']);
                AttackerStats.powerPack.on    = parseInt(user_fields['powerPackOn']) == 1;
                AttackerStats.is_iced         = (parseInt(user_fields['xp_earned']) < 0);
                AttackerStats.healthPct = parseInt((AttackerStats.health*100)/AttackerStats.maxHealth);
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
        if (gVar.CurrentCity === 7 || gVar.CurrentCity === 8) {
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
            if (Util.isSet(global.cities[id]) && gVar.StartCity !== id) {
                if ( value === true ) cities.push(id);
            } 
        });
        
        if (cities.length > 0) {
            gVar.StartCity = parseInt(cities[ Math.floor(Math.random() * cities.length) ]);
            return gVar.StartCity;
        } else {
            gVar.StartCity = 1;
        }
        return false;
    }
    function resetAllTimers() {
        addTravelCountdown();
        addFightCountdown();
        addRivalsCountdown();
    }
    function clearAllTimers() {
        StatusTimer.clear();
        TravelCountdown.clear();
        ResumeCountdown.clear();
        FightCountdown.clear();
        RivalsCountdown.clear();
    }
    function addTravelCountdown() {
        TravelCountdown.clear();
        if (options.timerCityActive) {
            TravelCountdown.start(options.timerCityMins*60);
        }
    }
    /** @param {Number} mins_delay minutes. */
    function addFightResumeCountdown(mins_delay) {
        ResumeCountdown.clear();
        ResumeCountdown.start((mins_delay||options.timerFightResume)*60);
    }
    function addFightCountdown() {
        FightCountdown.clear();
        if (options.timerFightActive) {
            FightCountdown.start(options.timerFightMins*60);
        }
    }
    function addRivalsCountdown() {
        RivalsCountdown.clear();
        if (options.timerRivalsActive) {
            RivalsCountdown.start(options.timerRivalsMins*60);
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
        AutoPublish.publishTo(options.publishTo, continue_fn);
    }

    function AttackNewOpponent() {
        if (gVar.Aborted) {
            return;
        }
        if (options.collectClanFightXp && (AttackerStats.exp_fight>=AttackerStats.exp_fight_max) && 
           (AttackerStats.exp_fight_max > AttackerStats.exp_fight_min)) {
            MW.collectClanXP('exp_fight', function(msg) {
                if (msg) {
                    AttackerStats.exp_fight_min = AttackerStats.exp_fight_max;
                    addLog(msg,'help',null,'clanxp');
                } else {
                    options.collectClanFightXp = false;
                }
            });
        }
        if ( options.publishActive && AutoPublish.length() >= options.publishAfter ) {
            publishCurrentIces(AttackNewOpponent);
            return;
        }
        if (PlayerList.current) {
            updateCurrentOppStats();
        }
        // next opponent
        if (gVar.AttackWhitelist === true) {
            fromRandomWhiteList();
            return;
        }
        if (gVar.AttackFamilyList === true) {
            fromFamilyList();
            return;
        }
        var opponent = PlayerList.setLastCurrent();

        // check if a valid opponent object
        if (!opponent) {
            PlayerList.clear();
            AutoTravelCounter.noTarget();
            refreshPlayerList(AttackNewOpponent);
            return;
        } else {
            AutoTravelCounter.reset('noTarget');
        }
        // check if opponent is filtered
        if (!isValidOpponent(opponent)) {
            AttackNewOpponent();
            return;
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
        if (gVar.Aborted) {
            return;
        }
        if (options.travelToStartCity && gVar.CurrentCity !== gVar.StartCity) {
            travelTo(gVar.StartCity, preAttack);
            return;
        } else {
            gVar.StartCity = gVar.CurrentCity;
        }
        if ( !Util.isSet(PlayerList.current) || PlayerList.current.skipped ) {
            AttackNewOpponent();
            return;
        }       
        var opp = PlayerList.current; 
        var b_RapidFire = false;
        var fs = AttackerStats;
        var delay = parseInt(options.stopResumeDelay) > 0 ? parseInt(options.stopResumeDelay) * 60 : 300;
        var sStopMessage, sTimerMessage;
        var n_MinHealthReq = opp.requirements().health;
        var n_MinStaminaReq = opp.requirements().stamina;
        var n_forIce = opp.attacksToIce();
        
        if (options.attackUsePerFoe && options.attackPerFoe <= opp.fights) {
            opp.skip('Limited attacks per foe reached: '+opp.fights);
            checkBankMoney(AttackNewOpponent);
            return;
        }
        if (options.attackUseMax && n_forIce > 0 && options.attackMax < n_forIce) {
            opp.skip('Out Maximum Attacks: '+n_forIce);
            checkBankMoney(AttackNewOpponent);
            return;
        }
        opp.powerAttack = (options.attackPwr && opp.hasPwrAtkUrl());
        if (opp.powerAttack && (!options.attackUseMax||opp.fights > 2)) {
            if (options.rapidFireActive && n_forIce > 4) {
                b_RapidFire = ( opp.curHealthPct < options.rapidFireHealth );
            }
        }
        // fix healBelow option to minimum.
        if ( isNaN(parseInt(options.healBelow)) || options.healBelow < n_MinHealthReq ) {
            options.healBelow = parseInt(n_MinHealthReq);
            options.save();
        }
        
        if ( options.stopKeepExpOn && fs.expToNextLevel < options.stopKeepExp ) {
            sStopMessage = 'AutoFight deactivated, you need '+fs.expToNextLevel+' exp. points to levelup.';
        }
        else if ( fs.stamina < Math.max((options.stopKeepStaOn?options.stopKeepSta:0), n_MinStaminaReq) ) {
            if ((fs.stamina < n_MinStaminaReq) && AttackerStats.powerPack.avail().stamina) {
                checkBankMoney(function(){
                    usePowerPack('stamina', AttackNewOpponent, function(){
                        AttackerStats.powerPack.on = false;
                        preAttack();
                    });
                });
                return;
            }
            if (options.stopResume) {
                sTimerMessage = 'No stamina left, continue in %N% seconds.';
            } else {
                sStopMessage = 'AutoFight deactivated, No stamina left.';
            }
        }
        else if (gVar.ForceHeal) {
            healPlayer(preAttack);
            return;
        }
        else if ( fs.health < Math.max((options.healActive?options.healBelow:0), n_MinHealthReq) ) {
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
            else if (options.healAttaking || opp.fights === 0 || fs.health < n_MinHealthReq) {
                healPlayer(preAttack);
                return;
            }
            
        }
        else if (options.stopByIces && fs.session_ices >= options.stopIceAmount) {
            sStopMessage = 'AutoFight deactivated, you made '+fs.session_ices+' ices.';
        }
        
        if ( sStopMessage ) {
            clearAllTimers();
            checkBankMoney(function() {
                sendMessage(sStopMessage);
                stopAutoFight('AutoFight was stopped.');
            });
            return;
        }
        if ( sTimerMessage ) {
            clearAllTimers();
            checkBankMoney();
            addAutoControls(false, true);
            StatusTimer.start(sTimerMessage, delay, function() {
                PlayerList.clear();
                reqSurvey(function() {
                    resetAllTimers();
                    AttackNewOpponent();
                });
            });
            return;
        }
        if (!/xw_controller=fight/i.test(opp.getAttackUrl())) {
            AttackNewOpponent();
            return;
        }
        if ( opp.fights > 0 ) {
            addSkipControl();
        }
        if ( !opp.isNPC && b_RapidFire === true ) {
            AttackWithRapidFire();
        } else {
            Attack(true);
        }
    }

    function AttackWithRapidFire() {
        if (gVar.Aborted) {
            return;
        }
        var opp = PlayerList.current;
        var url = opp.getAttackUrl();
        var levelUp_stop = false, b_AttackAgain = true, b_Stopped = false;
        var b_NeedHeal = false, b_Finished = false;
        var n_atkMaxHealth = 100, n_defMaxHealth = 100;
        var n_Stamina = AttackerStats.stamina, n_Health = AttackerStats.health;
        var n_maxCount = Math.max(options.rapidFireAttacks, 2);
        var requests_left = 0, total_sent = 0;
        var n_tIntID, n_atkDamage = 0, n_defDamage = 0;
        var s_text = ' to ' + opp.anchor() + '...';
        var n_minHealth = opp.requirements().health;
        var n_minStamina = opp.requirements().stamina;
        var n_ExpToLevel = AttackerStats.expToNextLevel;
        var n_goodResponses = 0, n_badResponses = 0;
        
        if (options.attackUsePerFoe) {
            n_maxCount = Math.max(parseInt((options.attackPerFoe - opp.fights)/5), 2);
        }
        if (options.healActive && options.healAttaking) {
            n_minHealth = Math.max(options.healBelow, n_minHealth);
        }
        if (options.stopKeepStaOn) {
            n_minStamina = Math.max(options.stopKeepSta, n_minStamina);
        }
        
        sendNewRFAttack();
        options.rapidFireTiming = Math.max(Math.min(options.rapidFireTiming, 1000), 200);
        n_tIntID = setInterval(sendNewRFAttack, options.rapidFireTiming);
        
        function sendNewRFAttack() {
            if (total_sent > n_maxCount) {
                stopRapidFire();
            }  else {
                requests_left++;
                showRapidFireTitle(++total_sent);
                sendMessage('Rapid Fire x'+total_sent+s_text, true);
                httpAjaxRequest({'url':url,'liteLoad':1,'update':false,'success':rapidFireResponse});
            }
        }
        
        function stopRapidFire() {
            if (b_Stopped !== true) {
                b_Stopped = true;
                if (n_tIntID) {
                    clearInterval(n_tIntID);
                    n_tIntID = null;
                }
            }
        }
        
        function rapidFireResponse(response) {
            requests_left--;
            var resp = parseAttack( response, true );
            var defender = resp.fight_result ? resp.fight_result.defender : false;
            var attacker = resp.fight_result ? resp.fight_result.attacker : AttackerStats;
            
            if (n_Health > attacker.health) {
                n_Health = attacker.health;
            }
            if (n_Stamina > attacker.stamina) {
                n_Stamina = attacker.stamina;
            }
            if (n_ExpToLevel > AttackerStats.expToNextLevel) {
                n_ExpToLevel = AttackerStats.expToNextLevel;
            }
            if (gVar.ForceHeal || n_Health < n_minHealth || n_Stamina < n_minStamina
            || (options.stopKeepExpOn && (n_ExpToLevel < options.stopKeepExp))) {
                stopRapidFire();
            }
            
            if ( resp.success !== ERROR_SUCCESS ) {
                n_badResponses++;
                
                if ( parseInt((n_badResponses*100)/n_maxCount) > 80 ) {
                    stopRapidFire();
                }
            }
            else {
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
                if (opp.startedHealthPct && defender.current_health_pct > opp.startedHealthPct) {
                    opp.skip('Seem that was healed.');
                    b_AttackAgain = false;
                }
                if (resp.levelUp_stop === true) {
                    b_AttackAgain = false;
                    levelUp_stop = true;
                    gVar.Aborted = true;
                }
                if (b_AttackAgain !== true) {
                    stopRapidFire();
                }
            }
            
            // completed
            if (requests_left < 1 && b_Stopped === true && b_Finished === false) {
                b_Finished = true;
                if (options.rapidFireAutoTiming === true && total_sent > 4 && n_Health > 20) {
                    if (n_badResponses > n_goodResponses) {
                        if ((options.rapidFireTiming += 50) < 1050) {
                            addLog('RapidFire Autotiming:<br>Very bad success rate, timing increased by 50.','help',null,'autotiming');
                        }
                    }
                    else if (parseInt((n_goodResponses*100)/total_sent) > 80) {
                        if ((options.rapidFireTiming -= 50) > 150) {
                            addLog('RapidFire Autotiming:<br>Very good success rate, timing decreased by 50.','help',null,'autotiming');
                        }
                    }
                }
                AttackerStats.health = n_Health;
                AttackerStats.stamina = n_Stamina;
                AttackerStats.expToNextLevel = n_ExpToLevel;
                updateFightResponse(resp);
                
                if (b_AttackAgain && n_goodResponses < 1) {
                    b_AttackAgain = false;
                    opp.skip('So many server errors.');
                }
                if (levelUp_stop === true) {
                    stopAutoFight('Leveled up.');
                    sendMessage('AutoFight deactivated, you Leveled UP!!.');
                }
                else if (b_AttackAgain) {
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

    function Attack( bAuto ) {
        if (gVar.Aborted) {
            return;
        }
        var url = PlayerList.current.getAttackUrl();
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
            'update': false,
            'success': function (htmlText) {
                if (gVar.Aborted) {
                    return;
                }
                var fr = {success:ERROR_BAD_RESPONSE};
                try {
    	            if ( PlayerList.current.isNPC ) {
                        $('#fight_wrapper', popupElt.content).empty();
                        fr = parseNPCAttack(htmlText, bAuto);
                    } else {
                        fr = parseAttack(htmlText, bAuto !== true);
                        updateFightResponse(fr);
                    }
                } catch (e) {
                	Logger.error(e.message);
                }
                switch( fr.success ) {
                    case ERROR_BAD_RESPONSE:
                        if (bAuto) {
                            addAutoControls(true);
                            StatusTimer.start('There was an error, try again in %N% seconds.',8, preAttack);
                        }
                        else {
                            sendMessage('There was an error.');
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
                                PlayerList.current.skip('So many server errors.');
                                AttackNewOpponent();
                            }
                        }
                        else {
                            sendMessage('This opponent can\'t be attacked, go back and try a different one.');
                            PlayerList.current = null;
                            addManualControls(true);
                        }
                        break;

                    case ERROR_SUCCESS:
                        if (bAuto) {
                            if (fr.levelUp_stop) {
                                stopAutoFight('Leveled up.');
                                sendMessage('AutoFight deactivated, you Leveled UP!!.');
                            }
                            else if (fr.attack_again) {
                                PlayerList.current.retries = 0;
                                setAttackTimer(preAttack);
                            } 
                            else {
                                addAutoControls();
                                checkBankMoney(AttackNewOpponent);
                            }
                        }
                        else {
                            updateCurrentOppStats();
                            PlayerList.current = null;
                            checkBankMoney(addManualControls);
                        }
                        break;
                }
            },
            'error': function(errorText) {
                if (bAuto) {
                    addAutoControls(true);
                    StatusTimer.start('ERROR: '+errorText+', try again in %N% seconds.',8, preAttack);
                }
                else {
                    sendMessage('ERROR: '+errorText);
                    addManualControls(true);
                }
            }
        });
    }
    
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


    function showBoostUsage(boostCount, nextBoostTag, askTimeout) {
        var c = 0;
        if (Util.isSet(boostCount) && boostCount > 0) {
            c = boostCount;
        }
        $('.boost_wgt_boost_count', popupElt.content).html(c);
        if( c > 0 ) {
            $('#fv2_boost_toggle_ask_btns', popupElt.content).hide();
        } else {
            $('#fv2_boost_toggle_ask_btns', popupElt.content).show();
            if( askTimeout > 0) {
                $('.fv2_boost_ask_allowed', popupElt.content).hide();
            } else {
                $('.fv2_boost_ask_allowed', popupElt.content).show();
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
    /**
     * Stop AutoFight and skip current fight with the specified reason.
     * @param {Object} reason
     */
    function stopAutoFight(reason) {
        gVar.Aborted = true;
        httpAjaxStopRequests();
        clearAllTimers();
        if (reason) {
            if (PlayerList.current) {
                PlayerList.current.result_text = reason;
                updateCurrentOppStats();
            }
            addAutoControls(true);
        }
        PlayerList.clear();
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
        $('#fv2_wgt_open_button_wrapper, #fv2_wgt_button_open_link, #wrapper_items_won, .fv2_boost_ask_not_allowed', e).remove();
        //$('.boostcontainer', e).removeAttr('style').css('padding-top',15);
        //$('.boost_wgt_next_boost', e).removeAttr('style');
        $('#fightv2_boost_on, #fightv2_boost_off', e).removeAttr('onclick').removeClass('checked').css('cursor','pointer').click(Events.use_boost_click);
        $('#fightv2_boost_'+(gVar.AttackerUsedBoost?'on':'off'), e).addClass('checked');
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

        if (curr && curr.alive && curr.hasAtkUrl()) {
            c$('div', 'fv2_button_row1').appendTo(wrapper)
            .append(b$('Attack again','class:short red fightV2AttackBtn').click(Events.attackAgain_click));
        }
        if (options.attackPwr && curr && curr.alive && curr.hasPwrAtkUrl()) {
            c$('div', 'fv2_button_row2').appendTo(wrapper)
            .append(b$('Power Attack','class:short red fightV2AttackBtn').click(Events.powerAttack_click));
        }
        if (wrapper.length < 2 && !bHideHealButton && AttackerStats.healthPct < 80) {
            c$('div', 'fv2_button_row3').appendTo(wrapper)
            .append(b$('Heal','class:short red fightV2AttackBtn').click(Events.heal_click));
        }
        c$('div', 'fv2_button_row3').appendTo(wrapper)
        .append(b$('Run Away', 'class:fightV2AttackBtn').click(Events.runAway_click));
    }

    function addAutoControls(onlyRunAway, bInstantHeal) {
        var wrapper = hideFightControls();
        if (wrapper.length < 1 || wrapper.is(':hidden')) {
            return;
        }
        if (onlyRunAway !== true) {
            c$('div', 'fv2_button_row1').appendTo(wrapper)
            .append(b$('Stop','class:short red fightV2AttackBtn').click(Events.stop_click));
        }
        if (onlyRunAway !== true && AttackerStats.healthPct < 80) {
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

    function parseNPCAttack(htmlText) {
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
            SessionStats.add('fightWon');
        } else {
            s_outText = 'You fought 1 time. <span class="bad">You lost the fight</span>, ';
            SessionStats.add('fightLost');
        }
        SessionStats.add('fightCount', 1);
        SessionStats.add('expGained', n_expe);
        SessionStats.add('cash', n_cash);
        SessionStats.add('staminaSpend', opponent.requirements().stamina);
        
        s_outText += 'You ' + (fight_result.won ? 'gained' : 'losed');
        s_outText += ' <span class="' + (fight_result.won ? 'good' : 'bad') + '">' + n_expe;
        s_outText += '</span> experience points ';
        s_outText += 'and <span class="' + fight_result.cash.attr('class') + '">';
        s_outText += n_cash + '</span> cash. ';

        updateStats();
        addLog(s_outText);

        return {'success': ERROR_SUCCESS};
    }
    /**
     * Evaluate a fight result.
     * @param {String} htmlText
     * @param {Boolean} disableSkipChecks
     */
    function parseAttack(htmlText, disableSkipChecks) {
        var fight_result, fight_data;
        var bfirstAttack = false;
        var opponent = PlayerList.current;
        var attack_again = false;
        var bLevelUpStop = false;
        var bOpponentGetIced = false;

        updateUserFields(htmlText);
        
        if (Util.isSet(htmlText.fight_result)) {
            if (htmlText.clanXp&&htmlText.clanXp.exp_fight) {
                AttackerStats.exp_fight = htmlText.clanXp.exp_fight.xp;
                AttackerStats.exp_fight_max = htmlText.clanXp.exp_fight.xp_max;
            }
            fight_data = htmlText;
            if (fight_data.worstitems) {
                gVar.WorstItems = fight_data.worstitems;
            }
        }
        else {
            fight_data = new CSFightResult(htmlText);
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
        // check it has a fight results
        if ( !(fight_result = fight_data.fight_result) ) {
            //Logger.error('parseAttack: ERROR_NO_FIGHT_RESULT');
            return {'success': ERROR_NO_FIGHT_RESULT};
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
            SessionStats.add('foesAttacked', 1);
            opponent.startedHealthPct = fight_result.defender.current_health_pct;
            opponent.setReqs(Util.parseJSON(fight_data.atkbtn_req)
            ,                Util.parseJSON(fight_data.poweratkbtn_req));
            opponent.attack_url = fight_data.atkbtn_boost_off;
            opponent.pwrattack_url = fight_data.poweratkbtn_boost_off;
            
            if (fight_data.opponenet_icon) {
                opponent.image = fight_data.opponenet_icon;
            }
        }
        
        var n_done = fight_result.defender.damage_dealt;
        var n_take = fight_result.attacker.damage_dealt;
        var b_goodCash = (fight_result.cash_city === gVar.StartCity);
        var n_grpAttack, n_grpDefense;
        
        if (fight_result.status != 'ok') {
            if (fight_result.status == 'failed') {
                if (Util.isSet(fight_result.error)) {
                    Logger.error('parseAttack: '+fight_result.error);
                }
            }
            return {'success': ERROR_NO_FIGHT_RESULT, 'first_attack': bfirstAttack};
        }
        
        gVar.AttackerUsedBoost = fight_result.use_boost;

        // Add loot
        if (Util.isSet(fight_result.loot)) {
            parseLootData(fight_result.loot, lootQuantity());
        }
        if( Util.isSet(fight_result.socialMessageCards)) {
            parseLootData(fight_result.socialMessageCards, lootQuantity());
        }

        // check ICE state
        if ( opponent.ice_state === 0 ) {
            if( fight_result.you_just_killed || fight_result.you_just_iced ) {
                bOpponentGetIced = true;
                opponent.result_text = fight_result.you_just_killed
                ? 'You just killed and get x2 iced count.' 
                : 'You just iced and got your ice.';
                addIcedToLog(new CSIce(fight_result), opponent);
            } else if ( fight_result.ice_was_just_stolen ) {
                bOpponentGetIced = true;
                opponent.thief = new CSStolenIce(fight_result);
                opponent.result_text = 'But ice was just stolen by ' + opponent.thief.anchor();
                addStolenIceToLog(opponent);
            }
        }

        // APPLY STATS
        if (fight_result.ices_so_far)     { AttackerStats.season_ices   = fight_result.ices_so_far;     }
        if (fight_result.ices_target)     { AttackerStats.season_target = fight_result.ices_target;     }
        if (fight_result.total_ice_count) { AttackerStats.total_ices    = fight_result.total_ice_count; }
        
        opponent.exp = fight_result.experience;
        opponent.won = fight_result.power_attack.won;
        opponent.lost = fight_result.power_attack.lost;
        opponent.fights = (opponent.lost + opponent.won);
        opponent.cashFrom = fight_result.cash_city;
        opponent.cash = fight_result.cash;
        opponent.curHealthPct = fight_result.defender.current_health_pct;
        opponent.curOtherDamage = fight_result.defender.other_damage;
        
        AttackerStats.healthPct = fight_result.attacker.current_health_pct;
        AttackerStats.health = fight_result.attacker.health;
        AttackerStats.stamina = fight_result.attacker.stamina;
        
        if (fight_result.attacker.other_damage > 0) {
            addLog('You\'re under attack!<br>Trying to heal...','help',null,'underattack');
            gVar.ForceHeal = true;
        }
        
        if (fight_result.isWin) {
            // SKIP CHECKS
            AutoTravelCounter.reset('loses');
            if (disableSkipChecks !== true && attack_again) {
                // skip is health is more than
                if ( options.skipUseHealth && fight_result.defender.current_health_pct > options.skipHealth ) {
                    opponent.skip('Health percentage:'+fight_result.defender.current_health_pct+'%');
                    //Logger.debug('skiping ' + opponent.name + ' health percentage is '+fight_result.defender.current_health_pct+'%');
                    attack_again = false;
                }
                // skip if no minimal cash
                if (options.skipUseMinCash && (opponent.cash < 1 || parseInt(opponent.cash/opponent.fights) < options.skipByMinCash)) {
                    opponent.skip('Cash gained per fight is too low.');
                    //Logger.debug('skiping ' + opponent.name + ' cash of: ' + n_currentCash + ' less than: '+ options.skipByMinCash);
                    attack_again = false;
                }
                // skip if cash from different city
                if (options.skipWrongCash && b_goodCash !== true) {
                    opponent.skip('Cash gained from different city.');
                    //Logger.debug('skiping ' + opponent.name + ' cash from different city.');
                    attack_again = false;
                }
                // skip if other damage
                if ( opponent.ice_state === 0 && options.skipUnderAttk && fight_result.defender.other_damage) {
                    if ( fight_result.defender.current_health_pct > 5 && fight_result.defender.other_damage > options.skipUnderAttkPct ) {
                        opponent.skip('So many damage from others ('+fight_result.defender.other_damage+'%).');
                        //Logger.debug('skiping ' + opponent.name + ' get so many damage from others.');
                        attack_again = false;
                    }
                }
            }
        } else {            
            if ( options.redIceActive === true ) {
                if ( !bfirstAttack && opponent.attacksToIce() >= options.redIceMaxAttk ) {
                    opponent.skip('So many fights for RedIce:'+opponent.attacksToIce());
                    attack_again = false;
                }  
            }
            else if ( opponent.won > 0 && options.redIceAfterWon ) {
                if ( attack_again === true && opponent.autoRedIce !== true ) {
                    opponent.autoRedIce = true;
                    addLog('You lost after win '+opponent.won+' figths.<br>Red Ice mode temporarily activated for '+opponent.anchor(),'blacklist',opponent.image);                    
                }
            } 
            else {
                if ( opponent.won < 1 ) {
                    // add enemy to blacklist
                    if ( options.get('useBlacklist') ) {
                        if (PlayerList.addCurrentToBlackList()) {
                            addLog('"The beast" '+opponent.anchor()+' is too strong!, added to BlackList.','blacklist',opponent.image);
                            if (opponent.fights > 0) opponent.skip('You lost, blacklisted.');
                        }
                    }
                    AutoTravelCounter.lose();
                }
                attack_again = false;
            }
        }
        
        PlayerList.current = opponent;

        return {
            'success'      : ERROR_SUCCESS,
            'opponent'     : opponent,
            'iced'         : bOpponentGetIced,
            'fight_result' : fight_result,
            'first_attack' : bfirstAttack,
            'attack_again' : attack_again,
            'levelUp_stop' : bLevelUpStop
        };
        
        function lootQuantity() {
            if (fight_result.cash_city === gVar.CurrentCity) {
                if (gVar.CurrentCity===7 || gVar.CurrentCity===8) return 5;
            }
            return 1;
        }
    }
    
    function updateCurrentOppStats() {
        var opp = PlayerList.current;
        if (opp.updated !== true) {
            addEventLog(opp);
            //
            SessionStats.add('fightCount', opp.lost + opp.won);
            SessionStats.add('staminaSpend', getStaminaSpendPerFight() * opp.fights);
            SessionStats.add('expGained', opp.exp);
            SessionStats.add('cash', opp.cash, opp.cashFrom);
            if (opp.won > 0) {
                SessionStats.add('fightWon', opp.won);
            }
            if (opp.lost > 0) {
                SessionStats.add('fightLost', opp.lost);
            }
            opp.updated = true;
            if (opp.isRival !== true) {
                if (opp.fights > 1) {
                    AutoTravelCounter.reset('attack');
                } else if (opp.won > 0) {
                    AutoTravelCounter.attack();
                }
            }              
        }
        updateStats();
    }

    function updateFightResponse(response, bHideRewards) {
        if (!response || !response.fight_result) {
            return;
        }
        var fight_result = response.fight_result;
        // UPDATE FIGHT DATA
        setHealth(0, fight_result.attacker.current_health_pct);
        setHealth(1, fight_result.defender.current_health_pct);

        updateAttackerHealthVal(fight_result.attacker.health);
        updateAttackerAttackVal(fight_result.attacker.skill_atk, fight_result.attacker.skill_atk_no_boost, gVar.AttackerUsedBoost);
        updateAttackerStaminaVal(fight_result.attacker.stamina, fight_result.attacker.max_stamina);

        showDamageTaken( 0, fight_result.attacker.damage_dealt );
        showDamageTaken( 1, fight_result.defender.damage_dealt );

        showOtherDamageTaken( 0, fight_result.attacker.other_damage );
        showOtherDamageTaken( 1, fight_result.defender.other_damage );

        if (bHideRewards !== true) {
            showFightRewards(fight_result.fight_info_div);  
        }
        //updateFactionBar(fight_result.user_stats.faction_module);
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
    }

    function Initialize() {
        // Generate DOM
        genMainDom();
        
        PlayerList.blackList = new CSList('blackList');
        PlayerList.whiteList = new CSList('whiteList');
        PlayerList.enmClanList = new CSList('enmClanList');
        PlayerList.frdClanList = new CSList('frdClanList');
        AutoTravelCounter = new CSAutoTravelCounter();
        AutoPublish = new CSAutoPublish();
        SessionStats = new CSSessionStats();
        AttackerStats.exp_per_sta = {toString: SessionStats.expPerSta};
        SessionStats.load();

        TravelCountdown = new Countdown({
            success: setNewCurrentCity,
            step: function(n, time) {
                $('#mass_stat_timetotravel').html(time);
            },
            stop: function() {
                $('#mass_stat_timetotravel').html(Util.setColor('Inactive','grey'));
            }
        });
        ResumeCountdown = new Countdown({
            success: function() {
                gVar.Aborted = false;
                sendMessage('Updating...', true);
                reqSurvey(AttackNewOpponent);
                resetAllTimers();
            },
            step: function(n, time) {
                $('#msgcontainer').html('Resume AutoFight in: '+time);
            }
        });
        FightCountdown = new Countdown({
            success: function() {
                gVar.Aborted = true;
                clearAllTimers();
                setTimeout(function() {
                    addAutoControls(true);
                    addFightResumeCountdown();
                },2000);
            },
            step: function(n, time) {
                $('#mass_stat_timetopause').html(time);
            },
            stop: function() {
                $('#mass_stat_timetopause').html(Util.setColor('Inactive','grey'));
            }
        });
        RivalsCountdown = new Countdown({
            success: function() {
                $('#mass_stat_loadrivals').html(Util.setColor('Loading','green'));
                httpAjaxRequest({url: 'remote/' + MW.getIntURL('fight') + '&tab=1',
                    liteLoad: 1,
                    success: function(htmlText) {
                        var message, result = addNewOpponents(htmlText);
                        if (result < 1) {
                            message = 'Rival list successfully loaded:<br>No Rivals has been added.';
                        } else {
                            message = 'Rival list successfully loaded:<br>Added '+result+' rivals to be attacked in next rounds.';
                        }
                        addLog(message, 'help', null, 'rivals');
                        addRivalsCountdown();
                    }
                });
            },
            step: function(n, time) {
                $('#mass_stat_loadrivals').html(time);
            },
            stop: function() {
                $('#mass_stat_loadrivals').html(Util.setColor('Inactive','grey'));
            }
        });
        /*
        PackCountdown = new Countdown({
            success: function() {
                AttackerStats.powerPack.on = false;
            },
            step: function(n, time) {
                $('#mass_stat_powerpack').html(time);
            },
            stop: function() {
                $('#mass_stat_powerpack').html(AttackerStats.powerPack.toString());
            }
            
        });
        */
        showDiv('items', '_logs');
        toStartScreen();
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
                    updateStats();
                    // get players from fight_controller page
                    if ($('#inner_page').attr('class') == 'fight_controller') {
                        addNewOpponents($('#inner_page').html());
                        if (PlayerList.length() > 0) {
                            genEnemyListDom();
                            sendMessage();
                            $('#ctrlcontainer', popupElt.content).show();
                            return;
                        }
                    } else {
                        // if no opponents, refresh.
                        Events.refresh_click();
                    }
                } catch (e) {
                    sendMessage('Error loading stats, please Close and Open again.');
                    return;
                }
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
        'LmdpZikgbm8tcmVwZWF0IDBweCA1MCU7DQoJcGFkZGluZy1sZWZ0OiAxOXB4Ow0KICAgIGJhY2tncm91bmQtc2l6ZTogMTZweDsN'+
        'Cn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAubWFmaWFfZGVmZW5zZSB7DQoJYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9td2ZiLnN0YXRp'+
        'Yy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvaWNvbl9tYWZpYV9kZWZlbnNlXzIyeDE2XzAxLmdpZikgbm8tcmVwZWF0IDBweCA1'+
        'MCU7DQoJcGFkZGluZy1sZWZ0OiAxOXB4Ow0KICAgIGJhY2tncm91bmQtc2l6ZTogMTZweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1'+
        'cCAuc3RhdF90cmF2ZWwgIHsgDQoJYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFw'+
        'aGljcy9pY29uX3RyYXZlbF8zMngxN18wMS5naWYpIG5vLXJlcGVhdCAwcHggNTAlOw0KCXBhZGRpbmctbGVmdDogMTlweDsNCiAg'+
        'ICBiYWNrZ3JvdW5kLXNpemU6IDE2cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgLnN0YXRfdmljdG9yeSB7DQoJYmFja2dyb3Vu'+
        'ZDogdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy92aWN0b3J5X2ljb24uZ2lmKSBuby1yZXBl'+
        'YXQgMHB4IDUwJTsNCglwYWRkaW5nLWxlZnQ6IDE5cHg7DQogICAgYmFja2dyb3VuZC1zaXplOiAxNnB4Ow0KfQ0KI2JhdHRsZWZp'+
        'ZWxkX3BvcHVwIC5zdGF0X3Bvd2VycGFjayB7DQogICAgYmFja2dyb3VuZDogdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5j'+
        'b20vbXdmYi9ncmFwaGljcy9IUF9wb3dlcnBhY2sucG5nKSBuby1yZXBlYXQgMHB4IDUwJTsNCiAgICBiYWNrZ3JvdW5kLXNpemU6'+
        'IDE2cHggMTZweDsNCiAgICBwYWRkaW5nLWxlZnQ6IDE5cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgLnN0YXRfaWNlZCB7DQoJ'+
        'YmFja2dyb3VuZDogdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvbWFwX2Jhc2VkX2pvYnMv'+
        'bWFzdGVyeV9zdGFyc19tZWRfODF4MzBfMDIucG5nKSBuby1yZXBlYXQgLTY0cHggLTEzcHg7DQoJcGFkZGluZy1sZWZ0OiAxOXB4'+
        'Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwIC5zdGF0X2tpbGwgew0KCWJhY2tncm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMu'+
        'emduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL21hcF9iYXNlZF9qb2JzL21hc3Rlcnlfc3RhcnNfbWVkXzgxeDMwXzAyLnBuZykgbm8t'+
        'cmVwZWF0IC00N3B4IDJweDsNCglwYWRkaW5nLWxlZnQ6IDE5cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI2Z2Ml93aWRnZXRf'+
        'd3JhcHBlciB7DQogICAgYmFja2dyb3VuZDogYmxhY2sgdXJsKCdodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dy'+
        'YXBoaWNzL2ZpZ2h0L3YyL2ZpZ2h0X21haW5fYmFja2dyb3VuZC5qcGcnKSB0b3AgbGVmdCBuby1yZXBlYXQ7DQogICAgd2lkdGg6'+
        'IDc1MHB4Ow0KCWhlaWdodDogMzUwcHg7DQoJYm9yZGVyOiAwcHg7DQogICAgdG9wOiAwcHg7DQogICAgbGVmdDogMHB4OyANCglw'+
        'b3NpdGlvbjogcmVsYXRpdmU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI29wdGlvbnNfd3JhcHBlciB7DQoJYmFja2dyb3VuZDog'+
        'YmxhY2sgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9zb2NpYWxtaXNzaW9ucy9iZ190ZXh0'+
        'dXJlX21vZHVsZS5qcGcpIG5vLXJlcGVhdCBzY3JvbGwgNTAlIDAlOw0KCXBhZGRpbmc6IDBweCA1cHg7DQoJaGVpZ2h0OiAxMDAl'+
        'Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodF93cmFwcGVyIGRpdi51c2VyYm94IHsNCgl3aWR0aDogMjMycHg7DQoJaGVp'+
        'Z2h0OiAzNDVweDsNCgliYWNrZ3JvdW5kOiB1cmwoJ2h0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3Mv'+
        'ZmlnaHQvdjIvZmlnaHRfcGxheWVyYmFja2dyb3VuZC5wbmcnKSAwIDM1cHggbm8tcmVwZWF0Ow0KCXRleHQtYWxpZ246IGNlbnRl'+
        'cjsNCglmbG9hdDogbGVmdDsNCiAgICBwb3NpdGlvbjogcmVsYXRpdmU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI2F0dGFja2Vy'+
        'X2ZpZ2h0X3N0YXR1cywgI2RlZmVuZGVyX2ZpZ2h0X3N0YXR1cyB7DQoJaGVpZ2h0OiAzNnB4Ow0KCWZvbnQtc2l6ZTogMjhweDsN'+
        'Cn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAgI2F0dGFja2VyX2ZpZ2h0X3N0YXRzIHsNCgltYXJnaW46IDEwcHggYXV0bzsNCgl3aWR0'+
        'aDogMjAwcHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgICNhdHRhY2tlcl9waWMgew0KCWZsb2F0OiBsZWZ0Ow0KCXRleHQtYWxp'+
        'Z246IHJpZ2h0Ow0KCXdpZHRoOiAxNDdweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAuZGl2SFBCYXIgew0KCWJhY2tncm91bmQ6'+
        'IHVybCgnaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9maWdodC92Mi9maWdodF9oZWFsdGhfZ3Jl'+
        'eS5wbmcnKSB0b3AgbGVmdCByZXBlYXQteDsNCgl3aWR0aDogMjE1cHg7DQoJaGVpZ2h0OiAyM3B4Ow0KCW1hcmdpbjogNXB4IGF1'+
        'dG87DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI2ZpZ2h0X2J0bl9wYW5lbCB7DQoJaGVpZ2h0OiAzNTBweDsNCglmbG9hdDogbGVm'+
        'dDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjYXR0YWNrZXJfYmVzdF9pdGVtcywgI2RlZmVuZGVyX2Jlc3RfaXRlbXMgew0KCXdp'+
        'ZHRoOiA2NXB4Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgltYXJnaW4tdG9wOiA0NXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVw'+
        'ICN3cmFwcGVyX2FjdGlvbnMgew0KCXdpZHRoOiAxMzBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9kZWZlbmRl'+
        'ciB7DQoJbWFyZ2luOiA1cHggNXB4IDAgNXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodF9idG5fcGFuZWwgZGl2LmJv'+
        'b3N0Y29udGFpbmVyIHsNCgl3aWR0aDogMTg1cHg7DQoJbWFyZ2luOiAycHggMCAwIDQwcHg7DQoJdGV4dC1hbGlnbjogY2VudGVy'+
        'Ow0KCW1pbi1oZWlnaHQ6IDc4cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI2ZpZ2h0X2J0bl9wYW5lbCBkaXYuYm9vc3Rjb250'+
        'YWluZXIgew0KCXRleHQtYWxpZ246IGNlbnRlcjsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAubGlzdGVkIHsNCgliYWNrZ3JvdW5k'+
        'OiB0cmFuc3BhcmVudCB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy92My9pY29uX3dpc2hs'+
        'aXN0X2FkZF8xOXgxNF8wMS5naWYpIG5vLXJlcGVhdCAtMXB4IDUwJTsNCglwYWRkaW5nLWxlZnQ6IDE5cHg7DQp9DQojYmF0dGxl'+
        'ZmllbGRfcG9wdXAgI2ZpZ2h0T3B0IHsNCgltYXJnaW46IDBweDsNCgl3aWR0aDogNzM4cHg7DQp9DQojYmF0dGxlZmllbGRfcG9w'+
        'dXAgI2ZpZ2h0T3B0IHVsIHsNCglsaXN0LXN0eWxlLXR5cGU6IG5vbmU7DQoJaGVpZ2h0OiAxMDAlOw0KCXdpZHRoOiAxMDAlOw0K'+
        'CW1hcmdpbjogMTBweCAwcHggMHB4Ow0KCXBhZGRpbmc6IDBweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCW92ZXJmbG93OiBhdXRv'+
        'Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNmaWdodE9wdCB1bCBsaSB7DQoJZGlzcGxheTogYmxvY2s7DQoJbWFyZ2luOiAwcHgg'+
        'MHB4IDBweCA1cHg7DQoJcGFkZGluZzogMHB4Ow0KCWhlaWdodDogMjhweDsNCgltYXgtaGVpZ2h0OiAyOHB4Ow0KCW92ZXJmbG93'+
        'OiBoaWRkZW47DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfaW5mbyB7DQoJYmFja2dyb3VuZDogdXJsKCdodHRwOi8v'+
        'bXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL2ZpZ2h0L3YyL2ZpZ2h0X2xvb3R0cmF5X3NsaXZlci5qcGcnKSB0'+
        'b3AgbGVmdCByZXBlYXQteDsNCgloZWlnaHQ6IDEyMHB4Ow0KCW1hcmdpbi10b3A6IDBweDsNCgltYXJnaW4tcmlnaHQ6IGF1dG87'+
        'DQoJbWFyZ2luLWJvdHRvbTogMHB4Ow0KCW1hcmdpbi1sZWZ0OiBhdXRvOw0KCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzMz'+
        'Ow0KfSANCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9pbmZvIC5maWdodFYyX21zZ19jdHJsIHsNCglmbG9hdDogbGVmdDsN'+
        'Cgl3aWR0aDogNDkwcHg7DQoJaGVpZ2h0OiAxMDBweDsNCgltYXJnaW46IDE0cHggMTFweCAwOw0KCW92ZXJmbG93OiBoaWRkZW47'+
        'DQoJcG9zaXRpb246IHJlbGF0aXZlOw0KCXotaW5kZXg6IDA7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfaW5mbyAj'+
        'Y3RybGNvbnRhaW5lciB7DQoJaGVpZ2h0OiA0MHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2luZm8gLmZpZ2h0'+
        'VjJfcmVzdWx0IHsNCglmbG9hdDogcmlnaHQ7DQoJYmFja2dyb3VuZDogdXJsKCdodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNv'+
        'bS9td2ZiL2dyYXBoaWNzL2ZpZ2h0L3YyL2ZpZ2h0X2xvb3R0cmF5X2xpbmUucG5nJykgMCA1MCUgbm8tcmVwZWF0Ow0KCXdpZHRo'+
        'OiAyMTBweDsNCgloZWlnaHQ6IDEwMHB4Ow0KCXBhZGRpbmc6IDEwcHggNXB4IDEwcHggMTVweDsNCn0NCiNiYXR0bGVmaWVsZF9w'+
        'b3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgew0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNrOw0KCWJhY2tncm91bmQtaW1hZ2U6IHVy'+
        'bChodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3MvaXRhbHlfZDQuanBnKTsNCgliYWNrZ3JvdW5kLXBv'+
        'c2l0aW9uOiA1MCUgMCU7DQoJYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsNCgloZWlnaHQ6IDQ1MHB4Ow0KfQ0KI2JhdHRs'+
        'ZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9zdGF0cyB7DQoJYmFja2dyb3VuZDogdXJsKCdodHRwOi8v'+
        'bXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL2ZpZ2h0L3YyL2ZpZ2h0X2xvb3R0cmF5X2xpbmUucG5nJykgMCA1'+
        'MCUgbm8tcmVwZWF0Ow0KCWZsb2F0OiByaWdodDsNCgloZWlnaHQ6IDk3JTsNCgl3aWR0aDogMjEwcHg7DQoJcGFkZGluZzogMTBw'+
        'eCA1cHggMTBweCAxNXB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0'+
        'YXRzIC5maWdodFYyX3N0YXRzIGRsIHsNCgloZWlnaHQ6IDIwcHg7DQoJbWFyZ2luOiAwcHg7DQp9DQojYmF0dGxlZmllbGRfcG9w'+
        'dXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX3N0YXRzIGRsIGltZyB7DQoJZmxvYXQ6IGxlZnQ7DQoJaGVpZ2h0OiAxOXB4'+
        'Ow0KCXdpZHRoOiAxOXB4Ow0KCW1hcmdpbi1yaWdodDogMnB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19z'+
        'dGF0cyAuZmlnaHRWMl9zdGF0cyBkbCBkdCB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luOiAwcHg7DQp9DQojYmF0dGxlZmllbGRf'+
        'cG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX3N0YXRzIGRsIGRkIHsNCglmbG9hdDogcmlnaHQ7DQoJbWFyZ2luOiAw'+
        'cHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX3N0YXRzIC5udW1iZXJzIHsNCglm'+
        'bG9hdDogcmlnaHQ7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbWFyZ2luOiAwcHg7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCglwYWRk'+
        'aW5nOiAwcHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyB7DQoJZmxvYXQ6'+
        'IGxlZnQ7DQoJaGVpZ2h0OiA5OSU7DQoJd2lkdGg6IDUxNXB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19z'+
        'dGF0cyAuZmlnaHRWMl9sb2cgI2V2ZW50c19saXN0IHsNCgloZWlnaHQ6IGF1dG87DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCgl0ZXh0'+
        'LWFsaWduOiBsZWZ0Ow0KCWhlaWdodDogMTAwJTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZp'+
        'Z2h0VjJfbG9nICNldmVudHNfbGlzdCAjZmlnaHRsb2dzIHsNCglib3JkZXI6IDBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAj'+
        'd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlzdCAuYnV0dG9ucyB7DQoJYm9yZGVyLWJvdHRvbTogMXB4'+
        'IHNvbGlkICMzMzM7DQoJYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzMzMzsNCn0JDQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBw'+
        'ZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgLmJ1dHRvbnMgYSB7DQoJYm9yZGVyLWxlZnQ6IDFweCBzb2xp'+
        'ZCAjMzMzOw0KCWJvcmRlci1yaWdodDogMXB4IHNvbGlkICMzMzM7DQoJcGFkZGluZy1sZWZ0OiAxMHB4Ow0KCXBhZGRpbmctcmln'+
        'aHQ6IDEwcHg7DQoJb3BhY2l0eTogMC41Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRW'+
        'Ml9sb2cgI2V2ZW50c19saXN0IC5idXR0b25zIGEuc2VsZWN0ZWQgew0KCWZvbnQtd2VpZ2h0OiBib2xkOw0KCW9wYWNpdHk6IDE7'+
        'DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgLmJ1dHRv'+
        'bnMgYTpmaXJzdC1jaGlsZCB7DQoJbWFyZ2luLWxlZnQ6IDIwcHg7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9n'+
        'X3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgdWwgew0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCgltYXJnaW46IDBw'+
        'eDsNCglvdmVyZmxvdzogYXV0bzsNCglwYWRkaW5nOiAwcHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCgl3aWR0aDogMTAwJTsNCn0N'+
        'CiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlzdCB1bCBsaSB7DQoJ'+
        'bWFyZ2luOiA4cHggNXB4IDBweCAyMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRW'+
        'Ml9sb2cgI2V2ZW50c19saXN0IHVsI2xvb3RsaXN0bG9nIHsNCgltYXJnaW4tdG9wOiA1cHg7DQp9DQojYmF0dGxlZmllbGRfcG9w'+
        'dXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjZXZlbnRzX2xpc3QgdWwjZXZlbnRzbG9nZ2VyIHsNCiAgICBmb250'+
        'LXNpemU6IDEycHg7DQogICAgbWFyZ2luLXRvcDogNXB4Ow0KICAgIGhlaWdodDogNDAwcHg7DQogICAgb3ZlcmZsb3cteTogbm9u'+
        'ZTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNldmVudHNfbGlzdCB1bCNl'+
        'dmVudHNsb2dnZXIgbGkgew0KICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMzMzOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVw'+
        'ICNzdGF0c19sb2dzIHRhYmxlIHsNCiAgICB3aWR0aDogOTglOw0KICAgIG1hcmdpbjogMTVweCAwcHggMHB4IDVweDsNCn0NCiNi'+
        'YXR0bGVmaWVsZF9wb3B1cCAjc3RhdHNfbG9ncyB0YWJsZSB0cjpmaXJzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZCB7DQogICAgd2lk'+
        'dGg6IDEwMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICNzdGF0c19sb2dzIHRhYmxlIHRyOmZpcnN0LWNoaWxkIHRoIHsNCiAg'+
        'ICB3aWR0aDogNTBweDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjc3RhdHNfbG9ncyB0YWJsZSB0ciB0ZDpmaXJzdC1jaGlsZCB7'+
        'DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjc3RhdHNfbG9ncyB0YWJsZSB0ciB0ZCB7DQog'+
        'ICAgdGV4dC1hbGlnbjogY2VudGVyOw0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9s'+
        'b2cgI29wcG9uZW50c19saXN0IHsNCgloZWlnaHQ6IDEwMCU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJfbG9nX3N0'+
        'YXRzIC5maWdodFYyX2xvZyAjb3Bwb25lbnRzX2xpc3QgLmhlYWRlciB7DQoJaGVpZ2h0OiA1JTsNCn0NCiNiYXR0bGVmaWVsZF9w'+
        'b3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9nICNvcHBvbmVudHNfbGlzdCAuaGVhZGVyIGEgew0KCWZsb2F0OiBs'+
        'ZWZ0Ow0KCW1hcmdpbi1sZWZ0OiAyMHB4Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRW'+
        'Ml9sb2cgI29wcG9uZW50c19saXN0ICNvcHBvbmVudHNfdGFibGUgew0KCWhlaWdodDogOTUlOw0KfQ0KI2JhdHRsZWZpZWxkX3Bv'+
        'cHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgLnBsYXllcl91cGRhdGVzIHsNCiAgICBvdmVyZmxvdy14OiBoaWRk'+
        'ZW47DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0'+
        'VjJfbG9nIC51cGRhdGVfdHh0IHsNCgl3aWR0aDogMzYwcHg7DQoJZm9udC1mYW1pbHk6IHRyZWJ1Y2hldCBNUzsNCglmb250LXdl'+
        'aWdodDogYm9sZDsNCgljb2xvcjogd2hpdGU7DQoJY2xlYXI6IG5vbmU7DQp9DQojYmF0dGxlZmllbGRfcG9wdXAgI3dyYXBwZXJf'+
        'bG9nX3N0YXRzIC5maWdodFYyX2xvZyAjaXRlbXNfbG9ncyAubG9vdCB7DQoJYmFja2dyb3VuZDogYmxhY2sgdXJsKGh0dHA6Ly9t'+
        'd2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9maWdodF9ib251c2VzL3NpZGVfYm9udXNsb290LnBuZykgbm8tcmVw'+
        'ZWF0IHNjcm9sbCAxMDAlIDUwJTsNCn0NCiNiYXR0bGVmaWVsZF9wb3B1cCAjd3JhcHBlcl9sb2dfc3RhdHMgLmZpZ2h0VjJfbG9n'+
        'ICNpdGVtc19sb2dzIC5zdGFzaCB7DQoJYmFja2dyb3VuZDogYmxhY2sgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20v'+
        'bXdmYi9ncmFwaGljcy9maWdodF9ib251c2VzL3NpZGVfc2VjcmV0c3Rhc2gucG5nKSBuby1yZXBlYXQgc2Nyb2xsIDEwMCUgNTAl'+
        'Ow0KfQ0KI2JhdHRsZWZpZWxkX3BvcHVwICN3cmFwcGVyX2xvZ19zdGF0cyAuZmlnaHRWMl9sb2cgI2l0ZW1zX2xvZ3MgLnN0YXNo'+
        'IC51cGRhdGVfdHh0IHsNCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsNCglvcGFjaXR5OiAwLjk7DQp9DQojYmF0dGxlZmllbGRf'+
        'cG9wdXAgI3dyYXBwZXJfbG9nX3N0YXRzIC5maWdodFYyX2xvZyAjaXRlbXNfbG9ncyAubG9vdCAudXBkYXRlX3R4dCB7DQoJYmFj'+
        'a2dyb3VuZC1jb2xvcjogYmxhY2s7DQoJb3BhY2l0eTogMC45Ow0KfQ=='
    );
    // load options and Initialize
    options.load(function() {
        LootCache = new CSLootList();
        LootCache.load(function(success) {
            if (success === true) {
                Initialize();
            } else {
                popupElt.destroy();
            }
        });
    });
}
// ==Script==
// @id        BattlefieldStats.js
// @author    Dakam
// @requires  MWAddon.js
// ==Script==

function BattlefieldStats() {
    var statistics = new Config('bf_stats');
    var opponent_data, Sessions =  new Object();
    // POPUP
    var popupElt = new PopupObject('bfstats_popup', {
        type: 'normal',
        title: 'Battlefield Statistics'
    });
    
    
    function genMainDom() {
        popupElt.content.height('auto');
        c$('img').appendTo(popupElt.content).attr({
            'alt'   : 'Under Construction...',
            'title' : 'Under Construction...',
            'src'   :'http://www.icis.com/blogs/green-chemicals/under_construction2.jpg'
        });
        return;
        c$('div', 'id:stats_logs').css('text-align','center').appendTo($elt)
        .append(c$('div').css('margin-top',15))
        .append(s$('oldsession_time_select', 'Select Session:', 300).change(Events.sessionstats_change))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(s$('oldsession_type_select', 'Select Type:', 100).change(Events.sessionstats_change))
        .append(c$('div', 'id:table_stats'));
    }
    
    
    function genStatsTable() {
        var type = $('#oldsession_type_select').val();
        var timestamp = $('#oldsession_time_select').val();
        var session = SessionStats.get(timestamp);
        var rowFileds = Util.clone(global.cities);
        rowFileds[0] = 'Total';
        // If no session return.
        if (!session) {
            return;
        }
        function getValue(from) {
            result = 0;
            if (Util.isObject(from)) {
                Util.each(from, function(id, count) {
                    result += count;
                });
                return result
            }
            return from||0;
        }
        /**
         * @param {String} name
         */
        function getStat(name, prct) {
            return function(c) {
                /**
                 * @param {String} curr_name
                 * @param {String} max_name
                 */
                function Percent() {
                    var min = session[c][name], 
                        max = session[c][prct],
                        n   = Util.percent(getValue(min), getValue(max));
                    return n.toFixed(Math.abs(n) < 10 ? 2 : 0);
                }
                if (session[c]) {
                    if (prct) {
                        return '<span title="'+Percent()+'%" style="cursor:pointer;">'
                        +      getValue(session[c][name]) + '</span>';
                    } else {
                        return getValue(session[c][name]);
                    }
                } else {
                    return '0'
                }
            }
        }
        /**
         * Get a table builder
         */
        var Builder = {
            fights: {
                'City'   : rowFileds,
                'Fights' : getStat('fightCount'),
                'Foes'   : getStat('foesAttacked', 'fightCount'),
                'Won'    : getStat('fightWon', 'fightCount'),
                'Lost'   : getStat('fightLost', 'fightCount')
            },
            ices: {
                'City'     : rowFileds,
                'Fights'   : getStat('fightCount'),
                'Ices'     : getStat('icesWon', 'fightCount'),
                'Kill'     : getStat('killWon', 'fightCount'),
                'Stolen'   : getStat('icesLost', 'fightCount'),
                'Revenges' : getStat('revenge', 'fightCount')
                
            },
            other: {
                'City'     : rowFileds,
                'Exp.'     : getStat('expGained'),
                'Stamina'  : getStat('staminaSpend'),
                'CashWon'  : getStat('cashWon'),
                'CashLost' : getStat('cashLost'),
                'Coins'    : getStat('coinsGained')
                
            }
        };
        // ------------------------------------
        // GENERATE TABLE
        // ------------------------------------
        var $parent = $('#stats_logs #table_stats', popupElt.content).empty();
        var tlb = new TableObject($parent, true);
        var row = 1, column = 0;
        tlb.table.attr({
            'cellspacing': 1,
            'border': 1            
        });
        Util.each(Builder[type||'fights'], function(name, bld) {
            tlb.cell(0,column++).html(name);
        });
        column = 0;
        Util.each(rowFileds, function(cityId) {
            Util.each(Builder[type||'fights'], function(name, bld) {
                tlb.cell(row,column++).html( Util.isFunc(bld) ? bld(cityId) : bld[cityId] );
            });
            row++;
        });
    }
    
    function Initialize() {
        statistics.each(function(timestamp, session) {
            if (timestamp === 'opp') {
                opponent_data = session;
            } else {
                Sessions[timestamp] = session;
            }
        });
        genMainDom();
        popupElt.show();
        
        return;
        SessionStats.load(function(sessions, curr) {
            Util.each(sessions, function(timestamp) {
                var $op = c$('option', 'value:'+timestamp);
                if (parseInt(curr) === parseInt(timestamp)) {
                    $op.prependTo('#oldsession_time_select');
                    $op.attr('selected', 'selected').html('Current Session');
                } else {
                    $op.appendTo('#oldsession_time_select');
                    $op.html((new Date(timestamp*1000)).toLocaleString());
                }
            });
        });
    }
    
    statistics.load(Initialize);
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
            var $city = c$('div','class:city_messages,id:message_city'+city);
            $('.city_booble .city' + city).empty().append($city);
            if (options.collect[city] === 'skip') {
                $city.html('This city is skipped by the user.');
            } else {
                $city.html('Waiting...');
            }
        });
        options.save(c_cities.MoveFirst);
    };

    var popupElt = new PopupObject('collectall_popup', {
        type: 'main',
        title: Resources.getPicture('collectallcities_title'),
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
        
        var $elt = c$('div', 'class:city_booble').appendTo(popupElt.content);
        var $div = c$('div').css({
            'float': 'right',
            'text-align': 'left',
            'width': 250
        });
        
        c$('div').css('margin',5).appendTo(c$('div','class:city'+id).appendTo($elt))
        .append(s$('caopt_collect_'+id, 'Collect: ', 100)).append($div);
        
        x$('caopt_deposit_'+id, 'Deposit cash after collect it.').appendTo($div);
        if (Util.isSet(taskMasters[id])) {
            c$('div').css('clear','both').appendTo($div);
            x$('caopt_taskmaster_'+id, 'Active Taskmaster before collect.').appendTo($div);
        }
        
        $elt = $('#caopt_collect_'+id, popupElt.content);
        Util.each((cityCodes[id] || {'skip':'Skip','all':'All'}), function(v, n) {
            $elt.append(c$('option', 'value:'+v).text(n));
        });
    }
    /**
     * @param {Number} pos
     * @param {Number} city
     * @param {String} city_name
     */
    function nextCity(pos, city, city_name) {
        var $city = $('#message_city'+city, popupElt.content);
        var collectMessage = '';
        
        if (abort_process) {
            return;
        }
        Logger.debug( options.collect[city] );
        if (options.collect[city] === 'skip') {
            c_cities.MoveNext();
            return;
        }
        
        $city.html('Traveling...');
        
        MW.travel(city, function(new_city) {
            if (new_city === parseInt(city)) {
                taskMaster();
            }
            else {
                $city.html('Error traveling.');
                c_cities.MoveNext();
            }
        });
        
        function taskMaster() {
            if (Util.isSet(taskMasters[city]) && options.taskmaster[city] === true) {
                $city.html('Activating Taskmaster...');
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
            $city.html('Depositing...');
            
            MW.deposit(city, amount, function(result) {
                $city.html(collectMessage + '<br>' + result);
                c_cities.MoveNext();
            });
        }
        function collectAll(obj) {
            if (abort_process) {
                return;
            }
            $city.html('Collecting...');
            
            MW.collect(city, options.collect[city], function(r) {
                $city.html(collectMessage = r.message);
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
        {id:'opt_CollectionPage',   label:'Modify Collection Page to use Multi Gifter popup for send gifts.'},
        {id:'opt_ProfilePage',      label:'Modify User\'s Profiles to add new actions.'},
        {id:'opt_FamilyPage',       label:'Modify Family\'s Pages to add new actions.'}
    ];
    
    var popupElt = new PopupObject('config_popup', {
        type: 'main',
        title: Resources.getPicture('configuration_title'),
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
            $(this).attr({
                'target': '_black',
                'download': 'MWAddonSettings.txt'
            });
            return true;
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
                popupElt.destroy();
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
                showHelpPopup({
                    icon:'info',
                    title:'Import Setting',
                    message:'File Settings imported successfully.',
                    buttons: [{
                        label: 'Accept',
                        addClass: 'medium white',
                        onclick: Configuration
                    }]
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
    function createExportData(e) {
        var me = this;
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
            $(me).attr('href', 'data:plain/text,'+dataURL);
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
        .append(b$('Export settings', 'id:export_settings,class:medium orange').click(Events.export_click).mouseenter(createExportData))
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
        .attr('href', 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CQVWPSUMDKW5N')
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
    /**
     * @type {CSPropertyCollection}
     */
    var Properties;
    var options = UserConfig.cmopt;
    var gVar = {
        nyCashProps: false,
        countdowns: new Object(),
        ny_props: {
            '1'              : {name:'Sports Bar',             icon:'LimitedTimeProperty/SportsBar/flashImage.png'         },
            '2'              : {name:'Venetian Condo',         icon:'LimitedTimeProperty/Condo/condoFlash.png'             },
            '3'              : {name:'Tad\'s Gun Shop',        icon:'LimitedTimeProperty/Gunshop/2_pv2.png'                },
            '4'              : {name:'Biker Clubhouse',        icon:'LimitedTimeProperty/BikerClubhouse/flashImage.png'    },
            '5'              : {name:'Martial Arts Dojo',      icon:'LimitedTimeProperty/MartialArts/flashImage.png'       },
            '6'              : {name:'Botanical Garden',       icon:'LimitedTimeProperty/Garden/flashImage.png'            },
            '7'              : {name:'Cemetery',               icon:'LimitedTimeProperty/Cemetery/flashImage.png'          },
            '8'              : {name:'Cider House',            icon:'LimitedTimeProperty/Ciderhouse/flashImage.png'        },
            '9'              : {name:'Toy Store',              icon:'LimitedTimeProperty/Toystore/flashImage.png'          },
            '10'             : {name:'Assassin\'s Academy',    icon:'LimitedTimeProperty/Assassin/Assassin-flashImage.png' },
            'chop_shop'      : {name:'Chop Shop',              icon:'PropertiesV2/prop11_chopshop.png'                     },
            'weapons_depot'  : {name:'Weapons Depot',          icon:'PropertiesV2/prop12_weaponsdepot_01.png'              },
            'armory'         : {name:'Armory',                 icon:'PropertiesV2/armory.png'                              },
            'private_zoo'    : {name:'Private Zoo',            icon:'PropertiesV2/zoo.png'                                 },
            '100'            : {name:'School Of Choice',       icon:'LimitedTimeProperty/SchoolOfChoice/flashImage.png'    }
        },
        props: {
            'port': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=6&building_type=7&id=',
                up    : '&city=6&building_type=7',
                cash  : global.zGraphicsURL + 'icon_cash_italy_16x16_02.png',
                load  : 'it'
            },
            'warehouse': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=8&building_type=3&id=',
                up    : '&city=8&building_type=3',
                cash  : global.zGraphicsURL + 'chic_clam_sm.png',
                load  : 'ch'
            },
            'speakeasy': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=8&building_type=2&id=',
                up    : '&city=8&building_type=2',
                load  : 'ch'
            },
            'black_market': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=7&building_type=3&id=',
                up    : '&city=7&building_type=3',
                cash  : global.zGraphicsURL + 'brz_real_sm.png',
                load  : 'br'
            },
            'workshop': {
                buy   : MW.getIntURL('propertyV2','portBuyItem') + '&city=7&building_type=2&id=',
                up    : '&city=7&building_type=2',
                load  : 'br'
            }
        },
        reqs: {
            ny: 'remote/' + MW.getIntURL('LimitedTimeProperty', 'showProperties')+'&view_tab=build&page_click=viewV2',
            br: 'remote/' + MW.getIntURL('propertyV2', 'createData', 7) + '&city=7',
            ch: 'remote/' + MW.getIntURL('propertyV2', 'createData', 8) + '&city=8',
            it: 'remote/' + MW.getIntURL('propertyV2', 'createData', 6) + '&city=6',
            ny_cash_prop: 'remote/'+ MW.getIntURL('propertyV2', 'view', 1)
        }
    };
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
        this.is_ny = false;
        this.canUpgrade = false;
        
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
         * @return {Collection} 
         */
        this.getCollection = function() {
            return new Collection(Props);
        };
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
                    if (a.is_ny_cash && b.is_ny_cash) {
                        return a.upgrade_cost - b.upgrade_cost;
                    }
                    if (a.is_ny_cash || b.is_ny_cash) {
                        return (a.is_ny_cash ? -1 : 1);
                    }
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            Util.each(obj, callback);
        }
        
        return this;        
    };
    // -------------
    // EVENTS
    // -------------
    var Events = {
        upgrade: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $('.property_inner a', Popup.content).addClass('disabled');
            var me = $(this);
            var name = me.attr('name');
            var prop = Properties.get(name);
            var url, to_level, $input;
            if (!prop.upgrade) {
                return;
            }
            options.fromDomElements();
            options.save();
            if (prop.is_ny) {
                url = prop.upgrade;
            } else if (prop.is_ny_cash) {
                to_level = parseInt( $('#upgrade_in_'+prop.id, Popup.content).val() );
                $input = $('#level_'+prop.id, Popup.content);
                url = prop.upgrade;
            } else {
                url = 'remote/';
                url += MW.getIntURL('propertyV2','buy', Util.uSplit(prop.upgrade).city) 
                url += prop.upgrade;
            }
            (function upgradeProperty() {
                sendMessage('Upgrading '+prop.name+'...', true);
                httpAjaxRequest({'url': url, 'liteLoad':1, 
                'success': function(response) {
                    if (Popup.is_closed === true) {return;}
                    var message = parseUpgradeResponse(response);
                    if (prop.is_ny_cash) {
                        if (/success/i.test(message)) {
                            prop.level++;
                        }
                        if (to_level > prop.level) {
                            $input.text(prop.level);
                            setTimeout(upgradeProperty, 1000);
                        } else {
                          Properties.each(updateProperty);
                        }
                    } else {
                        refreshProperty(prop.id, true);
                    }
                    sendMessage(message);
                    addLog(message, 'info');
                }, 
                'error' : function(errText) {
                    sendMessage(errText);
                    addLog(errText, 'info');
                }});
            })();
            return false;
        },
        build: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $('.property_inner a', Popup.content).addClass('disabled');
            
            var name = $(this).attr('name');
            var id = $('option:selected', '#cmopt_build_'+name).val();
            var item = Properties.get(name).get(id);
            
            options.fromDomElements();
            options.save();
            
            craftItem(name, item);
            return false;
        },        
        build_change: function() {
            var id = $(this).attr('name');
            if (id) {
                updateProperty(id);
            }
        },
        upgrade_change: function() {
            var id = Util.doRgx(/upgrade_in_(.*)/, this.id).$1;
            if (id) {
                updateProperty(id);
            }
        },
        upgrade_keyup: function() {
            var me = $(this);
            var waiting = me.attr('timeout');
            if (waiting) {
                clearTimeout(waiting);
            }
            me.attr('timeout', setTimeout(function() {
                me.removeAttr('timeout');
                me.change();
            }, 600));
        },
        refresh: function() {
            gVar.restart = true;
            Popup.close(); 
            return false;
        },
        autocraft: function() {
            var $btn = $(this);
            if ($btn.hasClass('disabled')) {
                return false;
            }
            options.fromDomElements();
            options.save();
            if ($btn.hasClass('green')) {
                $btn.removeClass('green').addClass('red disabled');
                gVar.tab.showTab(3);
                gVar.autocrafting = true;
                tabsEnabled(false);
                addLog('AutoCrafting started.', 'info');
                autoCrafting();
            } else {
                $btn.removeClass('red').addClass('green disabled');
                gVar.autocrafting = false;
                tabsEnabled(true);
                addLog('AutoCrafting stopped.', 'info');
                sendMessage('AutoCrafting stopped.');
            }
            setTimeout(function() {
                $btn.removeClass('disabled');
            }, 5000);
            return false;
        }
    };
    // -------------
    // POPUP ELEMENT
    // -------------
    var Popup = new PopupObject('craftmanager_popup', {
        type: 'main',
        title: Resources.getPicture('craftmanager_title'),
        width: 700,
        background: 'url("'+global.zGraphicsURL+'LimitedTimeProperty/generic.png") 0% 0% no-repeat',
        onclose: function() {
            gVar.autocrafting = false;
            Util.each(gVar.countdowns, function(id, timer) {
                timer.clear();
            });
            httpAjaxStopRequests();
            options.fromDomElements();
            options.save();
            if (gVar.restart === true) {
                CraftManager();
            }
        },
        buttons: [{
             label: 'Refresh',
             addClass: 'medium white',
             onclick: Events.refresh
        }, {
             label: 'AutoCraft',
             addClass: 'medium green',
             onclick: Events.autocraft
        }]
    });
    /**
     * Parse a New York Cash property
     * @param {Object} scriptText
     */
    function getNYCashProperties(scriptText) {
		var flashvars;
		try {
			eval( Util.substr(scriptText, 'var flashvars', 'swfobject') );
			if (flashvars && flashvars.mw_data) {
				parseProps(Util.parseJSON(unescape( flashvars.mw_data )));
			}
		} catch(e) { }
        function parseProps(data) {
        	Util.each(data, function(index, ny_prop) {
        		if (!Util.isString(ny_prop.type)||!/Cash/i.test(ny_prop.type)||parseInt(ny_prop.maxlevel)!=0) {
        			return;
        		}
                var id = 'ny_cash_' + ny_prop.property_id;
                var prop = new CSProperty(id, ny_prop.name.replace(/\+/g,' '), ny_prop.property_pic);
                prop.is_ny_cash      = true;
                prop.canUpgrade      = parseInt(ny_prop.maxlevel) == 0;
                prop.level           = parseInt(ny_prop.level);
                prop.upgrade_cost    = parseInt(ny_prop.upgrade_cost);
                prop.build_cost      = parseInt(ny_prop.build_cost);
                prop.last_collected  = parseInt(ny_prop.last_collected);
                prop.upgrade         = ny_prop.buy_url + '&fundtype=bank';
                // Add property
                Properties.add(prop);
        	});
            if (Util.isArray(data) && data.length > 0) {
                gVar.nyCashProps = true;
                $('#craft_tab_2', Popup.content).show();
            }
        }
    }
    /**
     * Parse a New York property.
     * @param {Object} masterElt
     */
    function getNYProperty(masterElt) {
        var id = (masterElt.id||'').replace('propsDiv','');
        var ny_prop = (gVar.ny_props[id]||{
            name: 'Unknow Property', 
            icon: 'LimitedTimeProperty/button/'+id+'-off.png'
        });
        var prop = new CSProperty(id, ny_prop.name, global.zGraphicsURL+ny_prop.icon);
        
        prop.is_ny = true;
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
        var items = new Object(), prop, now = parseInt((new Date()).getTime() / 1000);
        if (Util.isArray(data.items)) {
            Util.each(data.items, function(index, item) {
                items[item.id] = item;
            });
        }
        Util.each(data.properties, function(index, p) {
            if (!p.purchase_items) {
                return;
            }
            var readyAt = (p.last_purchase_time_stamp + p.purchase_refresh_rate);
            var prop_id = Util.trim(p.name_unlocalized.toLowerCase().replace(/\s/g,'_'));
            
            prop = new CSProperty(prop_id, p.name, p.image_url + (prop_id=='port'?'_bg3.jpg':''));
            prop.time_left = Math.max(0, readyAt - now);
            prop.level = Util.parseNum(p.level);
            prop.buy_avail = parseInt(p.available_purchases);
            
            if (prop.time_left > 0) {
                if (gVar.countdowns[prop_id]) {
                    gVar.countdowns[prop_id].start(prop.time_left);
                } else {
                    addCountdown(prop_id, prop.time_left);
                }
            } else if (gVar.countdowns[prop_id]) {
                gVar.countdowns[prop_id].clear();
            }
            
            Util.each(p.purchase_items, function(item_id, item) {
                var me = new CSPropertyItem();
                var itemProp = (item.property ? data.properties[item.property] : p);
                
                me.name = item.name;
                me.level = parseInt(item.unlock_level);
                me.image = item.image;
                me.attack = item.attack||0;
                me.defense = item.defense||0;
                me.bonus = item.special_ability_text;
                
                if (item.price > 0 && gVar.props[prop_id]) {
                    me.requirements.push({
                        name: 'Cash',
                        icon: gVar.props[prop_id].cash,
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
                } else if ((prop.buy_avail&&prop.buy_avail > 0) || now > readyAt && gVar.props[prop_id]) {
                    me.buy = 'remote/' + gVar.props[prop_id].buy + item_id;
                }
                Util.each(p.parts_required, function(index, req) {
                    if (items[req.id]) {
                        return (prop.canUpgrade = (items[req.id].num_owned > req.quantity));
                    } else {
                        return (prop.canUpgrade = false);
                    }
                });
                if (prop.canUpgrade) {
                    prop.upgrade = gVar.props[prop_id].up;
                }
                prop.add(me);
            });
            // Add property
            Properties.add(prop);
        });
    }
    
    function genMainDom() {
        c$('div','id:craft_messages').appendTo(c$('div').css({
            'height': 40,
            'border-bottom': '1px solid #333',
            'padding': '5px 5px 5px 20px'
        }).appendTo(Popup.content));
        gVar.tab = new TabObject(Popup.content,'craft',['New York', 'Brazil, Chicago, Italy','New York Cash', 'Craft Log'],420);
        gVar.tab.getLayout(3).append(c$('ul', 'id:craftingLogger').css({
            'padding-top': 10,
            'height': 410
        }));
        $('#craft_tab_0_layout, #craft_tab_1_layout, #craft_tab_2_layout').css('overflow-y','auto');
        $('#craft_tab_2', Popup.content).hide();
    }
    /**
     * Generate a property interface.
     * @param {String} index
     * @param {CSProperty} prop
     */
    function genPropertyDom(index, prop) {
        var bestItem = 0, opt_id = 'build_'+prop.id, opt_enabled = prop.id+'_enabled';
        var prop_index = (prop.is_ny?'0':(prop.is_ny_cash?'2':'1'));
        var $outer = c$('div', 'class:property_outer,id:prop_id_'+prop.id).appendTo('#craft_tab_'+prop_index+'_layout');
        
        $outer = c$('div', 'class:property_inner').appendTo($outer);
        
        if (!prop.is_ny_cash) {
            x$('cmopt_'+opt_enabled,'','div').attr('title','Enable/Disable this property for AutoCrafting.').css({
                'margin': 0,
                'width': 50,
                'height': 60,
                'float': 'left'
            }).appendTo($outer);
        }
        
        var $buttons = c$('div','class:buttons').appendTo($outer);
        
        if (prop.is_ny_cash) {
            b$('Upgrade', 'class:medium orange,id:upgrade_'+prop.id+',name:'+prop.id)
            .css('margin-top',15).click(Events.upgrade).appendTo($buttons);
        } else {
            b$('Craft', 'class:short green disabled,id:'+opt_id+',name:'+prop.id).click(Events.build).appendTo($buttons);
            c$('div').css({'clear':'both', 'margin-top':5}).appendTo($buttons);
            b$('Upgrade', 'class:short orange disabled,id:upgrade_'+prop.id+',name:'+prop.id).click(Events.upgrade).appendTo($buttons);
        }
        
        $outer = c$('div', 'class:body,id:'+prop.id+'_body').appendTo($outer);
        $outer.addClass((prop.is_ny_cash||prop.is_ny)?'ny_property_icon':'property_icon');
        $outer.css('background-image','url("'+prop.icon+'")');
        c$('h4').html(prop.name+' (Level <span id="level_'+prop.id+'">0</span>):').appendTo($outer);
        c$('div', 'id:'+prop.id+'_countdown,class:cdn_timer').appendTo($outer);
        
        $outer = c$('p').appendTo($outer);
        
        if (prop.is_ny_cash) {
            n$('upgrade_in_'+prop.id, 'Upgrade to Level:', 100).appendTo($outer);
            $('input', $outer).addClass('black_box').val(prop.level)
            .change(Events.upgrade_change).keyup(Events.upgrade_keyup);
            return;
        }
        var $select = c$('select', 'class:black_box,id:cmopt_'+opt_id+',name:'+prop.id).width(480).appendTo($outer);
        c$('div','id:item_requirements').appendTo($outer);
        
        prop.each(function(i, item) {
            var name = 'Level ' + item.level + ' - ' + item.name;
            if ( item.attack > 0 || item.defense > 0 ) {
                name += ' [' + item.attack + '/' + item.defense + ']';
            }
            if ( item.bonus ) {
                name += ' [' + item.bonus + ']';
            }
            c$('option', 'value:'+i).text(name).appendTo($select);
            
            if (item.level === prop.level) {
                bestItem = i;
            }
        });
        if (!prop.is_ny_cash) {
            if ( !Util.isSet(options[opt_id]) ) {
                options.add(opt_id, bestItem);
            }
            if ( !Util.isSet(options[opt_enabled]) ) {
                options.add(opt_enabled, true);
            }
        }
        $select.change(Events.build_change);
    }
    
    function autoCrafting() {
        var bNoCraftItems = true;
        if (Popup.is_closed === true) {
            return;
        }
        Properties.each(function(id, prop) {
            var item_id = $('option:selected', '#cmopt_build_'+id).val();
            var item = prop.get(item_id);
            
            if ( options.get(id+'_enabled') && item && item.canBuy() ) {
                craftItem(id, item);
                return (bNoCraftItems=false);
            } else {
                return bNoCraftItems;
            }
        });
        if (bNoCraftItems) {
            var coutndown;
            Util.each(gVar.countdowns, function(id, timer) {
                if (timer.arguments.delay > 0) {
                    if (!Util.isSet(coutndown)) {
                        coutndown = timer;
                    } else {
                        if (timer.arguments.delay < coutndown.arguments.delay) {
                            coutndown = timer;
                        }
                    }
                }
            });
            if (Util.isSet(coutndown)) {
                sendMessage('<span id="'+coutndown.arguments.id+'_countdown"></span>');
                addLog('AutoCrafting paused: Waiting for the next available item.', 'info');
            } else {
                sendMessage('AutoCrafting stopped.');
                addLog('AutoCrafting stopped: You can\'t craft more items.', 'info');
            }
        }
    }
    /**
     * Enable/Disable tabs.
     * @param {Boolean} is_enabled
     */
    function tabsEnabled(is_enabled) {
        $('.tab, .tab_clear', '#craft_header')[is_enabled?'show':'hide']();
        if (gVar.nyCashProps !== true) {
            $('#craft_tab_2', Popup.content).hide();
        }
    }
    /**
     * Craft the specified item.
     * @param {String} prop_id
     * @param {CSPropertyItem} item
     */
    function craftItem(prop_id, item) {
        sendMessage('Crafting '+item.name+'...', true);
        $('#'+prop_id+'_countdown', Popup.content).html(Util.setColor('Loading...','green'));
        httpAjaxRequest({url: item.buy, success: function(response) {
            var message = parseResponse(response);
            sendMessage(message);
            addLog(message);
            refreshProperty(prop_id);
        }});
    }
    /**
     * Add a message to the user.
     * @param {Object} message
     * @param {Object} bLoadIcon
     */
    function sendMessage(message, bLoadIcon) {
        var $msg = $('#craft_messages').empty();
        var $span = c$('span').html(message||'');
        
        if (bLoadIcon) {
            Resources.getPicture('ajax_loader').css({
                'float':'left',
                'padding-left': 20,
                'width': 'auto'
            }).append($span).prependTo($msg);
        } else {
            $span.appendTo($msg).hide().fadeIn(500);
        }
    }
    /**
     * @param {String} message
     * @param {String} icon
     */
    function addLog(message, icon) {
        var timestamp = Util.setColor('['+(new Date()).toLocaleTimeString()+ '] ', 'grey');
        var $li = (icon==='error') 
        ? Resources.getPicture('ajax_error', 'li')
        : Resources.getPicture('info_icon', 'li');
        if (icon !== 'error') {
            message = Util.setColor(message, '#E1E1E1');
        } else {
            message = Util.setColor(message, 'red');
        }
        $li.prependTo('#craftingLogger').append(c$('p').html(timestamp+message||''));
    }
    /**
     * Parse a server response after buy an item.
     * @param {String} htmlText
     * @return {String}
     */
    function parseResponse(htmlText) {
        if (!htmlText.data) {       
            var response = h$(htmlText).find('.pop_box > div > div:eq(2)').html();
            return response.substr(0, response.indexOf('<br>'));
        }
        var data = Util.parseJSON(htmlText.data);
        return data.purchase_message;
    }
    /**
     * Parse a server response after upgrade a property.
     * @param {String} htmlText
     * @return {String}
     */
    function parseUpgradeResponse(htmlText) {
        if (!htmlText.data) {
            return h$(htmlText).find('.message_body:first').text();
        }
        var data = Util.parseJSON(htmlText.data);
        if (data.result && data.description) {
            return Util.formatText(data.result)+'! '+data.description;
        } else {
            return data.purchase_message||data.success_message||data.result;
        }
    }
    /**
     * Refresh a property after the countdown.
     * @param {String} id
     * @param {Boolean} update
     */
    function refreshProperty(id, update) {
        var url, prop = Properties.get(id);
        try {
	        url = ( prop.is_ny ? gVar.reqs.ny : gVar.reqs[gVar.props[id].load] );
            loadProperties(url, function(success) {
                Properties.each(updateProperty);
                if (gVar.autocrafting) {
                    autoCrafting();
                }
            });
        } catch (e) {
            Logger.debug('RefreshProperty: ' + e.message);
        	return;
        }
    }
    /**
     * Update a Property.
     * @param {String} prop_id
     * @param {CSProperty} [prop]
     */
    function updateProperty(prop_id, prop) {
        var $outer;
        if (!Util.isObject(prop)) {
            prop = Properties.get(prop_id);
        }
        if (!($outer = e$('#prop_id_'+prop_id, Popup.content))) {
            return;
        }
        $('#level_'+prop_id, $outer).text(prop.level);
        
        if (prop.is_ny_cash) {
            $('#'+prop_id+'_countdown', $outer).empty();
            if (prop && prop.canUpgrade && parseInt($('input', $outer).val()) > prop.level) {
                $('#upgrade_'+prop_id, $outer).removeClass('disabled');
            }
            else {
                $('#upgrade_'+prop_id, $outer).addClass('disabled');
            }
            $('#'+prop_id+'_countdown', $outer).html(calculateNYUpgradeCost());
        } else {
            if (!gVar.countdowns[prop_id] || gVar.countdowns[prop_id].started !== true) {
                $('#'+prop_id+'_countdown', $outer).html(Util.setColor('Ready!', 'green'));
            }
            updateCraftProperty();
        }
        function calculateNYUpgradeCost() {
            var to_level = parseInt($('input', $outer).val());
            var from_level = prop.level;
            var spend_cost = 0;
            while (from_level < to_level) {
                spend_cost += prop.build_cost + (prop.upgrade_cost * from_level);
                from_level++;
            }
            return 'Cost: $' + Util.setColor(Util.formatNum(spend_cost), 'green');
        }
        function updateCraftProperty() {
            var selectedIndex = $('select option:selected', $outer).val();
            var item = prop.get(selectedIndex);
            var reqDiv = $('#item_requirements', $outer);
            var $b = $('a#build_'+prop_id), $u = $('#upgrade_'+prop.id);
            var craftText = 'Craft';
            
            if (prop.buy_avail && prop.buy_avail > 0) {
                craftText += ' ('+prop.buy_avail+')';
            }
            $b.toggleClass('disabled',item.canBuy()===false).find('span:last').text(craftText);
            
            if (prop.canUpgrade) {
                $b.removeClass('medium').addClass('short');
                $u.removeClass('disabled').show();
            } else {
                $b.removeClass('short').addClass('medium').css('margin-top',15);
                $u.addClass('disabled').hide();
            }
            
            if (!prop.selectedIndex || prop.selectedIndex != selectedIndex) {
                prop.selectedIndex = selectedIndex;
                reqDiv.empty();
            } else {
                return;
            }
            
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
    }
    /**
     * Add a new countdown.
     * @param {String} id
     * @param {Number} timeLeft
     */
    function addCountdown(id, timeLeft) {
        gVar.countdowns[id] = new Countdown({
            id          : id,
            selector    : '#craftmanager_popup #'+id+'_countdown',
            delay       : timeLeft,
            text        : 'Build new item in:',
            success     : refreshProperty
        });
    }
    /**
     * Load properties form the given url.
     * @param {Object} url
     * @param {Object} callback
     */
    function loadProperties(url, callback) {
        /**
         * Parse a countdown from script.
         * @param {Object} script
         */
        function parseCountdown(script) {
            var timeLeft = Util.doRgx(/var timeLeft\s?=\s?(\d+)/i,   script).$1;
            var id = Util.doRgx(/id:\s?'buildTimer?Prop([\w\d]+)'/i, script).$1;
            
            if (timeLeft && (timeLeft = parseInt(timeLeft)) > 0 && id) {
                if (gVar.countdowns[id]) {
                    gVar.countdowns[id].start(timeLeft);
                } else{
                    addCountdown(id, timeLeft);
                }
            } else if (id && gVar.countdowns[id]) {
                gVar.countdowns[id].clear();
            }
        }
        httpAjaxRequest({'url':url,
        'success': function(htmlText) {
            if (htmlText.data) {
                try {
                    getProperty(Util.parseJSON(htmlText.data));
                } catch (e) {
                    Logger.error(e);
                }
            } else {
                h$(htmlText).find('.master, script:regex(text,addCountdown|mw_collectall)').each(function(i,e) {
                    if ($(e).is('script')) {
                        if (/var flashvars/.test( $(e).text() )) {
                            getNYCashProperties($(e).text());
                        } else {
                            parseCountdown($(e).text()); 
                        }
                    } 
                    else if ( e.id && /propsDiv/.test(e.id) ) {
                        Properties.add(getNYProperty(e));
                    }
                    else if ( e.id && /upgradeDiv/.test(e.id) ) {
                        try {
                            var prop = Properties.get((e.id).replace('upgradeDiv',''));
                            var $btn = e$('div[id^=cs_buy_all_and_upgrade] a', e);
                            prop.canUpgrade = (Util.parseJSON($btn.attr('requirements')).favor == 0);
                            prop.upgrade = Util.toUrl($('div[id^=cs_build_or_upgrade] a', e));
                        } catch (e) {}
                    }
                });
            }
            addLog('Properties loaded successfully.', 'info');
            callback&&callback(true);
        }, 
        'error': function() {
            addLog('There was an error while loading properties.', 'error');
            callback&&callback(false);
        }});
    }
    
    function Initialize() {
        var reqs_sent = 0;
        
        Properties = new CSPropertyCollection();
        genMainDom();
        
        loadingScreen('Loading properties...');
        Util.each(gVar.reqs, function(name, url) {
            reqs_sent++;
            loadProperties(url, function() { reqs_sent--; });
        });
        
        Util.until({
            retries: 300,
            test: function() { return (reqs_sent < 1); },
            success: function() {
                loadingScreen();
                if (Properties.length() > 0) {
                    Properties.each(genPropertyDom, true);
                    options.toDomElements();
                    sendMessage('Default items selected.');
                    Properties.each(function(id, prop) {
                        if (gVar.countdowns[id]) {
                            gVar.countdowns[id].start();
                        } else if (!prop.is_ny_cash) {
                            addCountdown(id, 0);
                        }
                        updateProperty(id);
                    });
                    Popup.show();
                } else {
                    Popup.destroy();
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
    Popup.addBase64Style(
        'I2NyYWZ0bWFuYWdlcl9wb3B1cCB1bCwgDQojY3JhZnRtYW5hZ2VyX3BvcHVwIGxpLA0KI2NyYWZ0bWFuYWdlcl9wb3B1cCBwIHsN'+
        'CgltYXJnaW46IDBweDsNCglwYWRkaW5nOiAwcHg7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVwIC5ibGFja19ib3ggew0KCWZvbnQt'+
        'd2VpZ2h0OiBib2xkOyANCgljb2xvcjogcmdiKDIwOCwgMjA4LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAx'+
        'NTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNrOyANCglmb250LXNpemU6IDE0cHg7DQp9DQojY3JhZnRtYW5hZ2Vy'+
        'X3BvcHVwIC5wcm9wZXJ0eV9vdXRlciB7DQogICAgbWFyZ2luOiAycHg7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVwIC5wcm9wZXJ0'+
        'eV9pbm5lciB7DQogICAgYm9yZGVyOiB0aGluIHNvbGlkICMzMzM7DQogICAgcGFkZGluZzogNXB4Ow0KfQ0KI2NyYWZ0bWFuYWdl'+
        'cl9wb3B1cCAucHJvcGVydHlfaW5uZXIgLm55X3Byb3BlcnR5X2ljb24gew0KICAgIGJhY2tncm91bmQtcG9zaXRpb246IDVweCAt'+
        'NjBweDsNCiAgICBiYWNrZ3JvdW5kLXNpemU6IDc1cHggYXV0bzsNCiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0Ow0K'+
        'fQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgLnByb3BlcnR5X2ljb24gew0KICAgIGJhY2tncm91bmQtcG9z'+
        'aXRpb246IDVweCAtMTBweDsNCiAgICBiYWNrZ3JvdW5kLXNpemU6IDc1cHggNzVweDsNCiAgICBiYWNrZ3JvdW5kLXJlcGVhdDog'+
        'bm8tcmVwZWF0Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgZGl2LmJvZHkgew0KICAgIG1pbi1oZWln'+
        'aHQ6IDYycHg7DQogICAgcGFkZGluZzogMHB4IDgwcHggMHB4IDgwcHg7DQogICAgdGV4dC1hbGlnbjogbGVmdDsNCiAgICBtYXgt'+
        'aGVpZ2h0OiA2MnB4Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgZGl2LmJvZHkgaDQgew0KICAgIGZs'+
        'b2F0OiBsZWZ0Ow0KICAgIG1hcmdpbjogMnB4IDBweCAycHggMTBweDsNCn0NCiNjcmFmdG1hbmFnZXJfcG9wdXAgLnByb3BlcnR5'+
        'X2lubmVyIGRpdi5ib2R5IGRpdi5jZG5fdGltZXIgew0KICAgIGZsb2F0OiByaWdodDsNCiAgICBtYXJnaW46IDJweCAzMHB4IDJw'+
        'eCAwcHg7DQogICAgZm9udC1zaXplOiAxMnB4Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgZGl2LmJv'+
        'ZHkgcCB7DQogICAgbWFyZ2luOiAwcHg7DQogICAgdGV4dC1hbGlnbjogY2VudGVyOw0KICAgIHBhZGRpbmctdG9wOiAyM3B4Ow0K'+
        'fQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgZGl2LmJ1dHRvbnMgew0KICAgIHBhZGRpbmctdG9wOiAycHg7'+
        'DQogICAgZmxvYXQ6IHJpZ2h0Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCAucHJvcGVydHlfaW5uZXIgZGl2LmJ1dHRvbnMgYSB7'+
        'DQogICAgd2lkdGg6IDc1cHg7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVwICNpdGVtX3JlcXVpcmVtZW50cyB7DQogICAgcGFkZGlu'+
        'Zy1sZWZ0OiAzNnB4Ow0KICAgIHRleHQtYWxpZ246IGxlZnQ7DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQojY3JhZnRtYW5h'+
        'Z2VyX3BvcHVwICNpdGVtX3JlcXVpcmVtZW50cyAucmVxX2ZpZWxkIHsNCiAgICBmbG9hdDogbGVmdDsNCiAgICBtYXJnaW46IDBw'+
        'eCAwcHggMHB4IDE1cHg7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVwICNpdGVtX3JlcXVpcmVtZW50cyAucmVxX2ZpZWxkIGltZyB7'+
        'DQogICAgd2lkdGg6IDE4cHg7DQogICAgaGVpZ2h0OiAxOHB4Ow0KICAgIGZsb2F0OiBsZWZ0Ow0KICAgIG1hcmdpbi1yaWdodDog'+
        'MnB4Ow0KfQ0KI2NyYWZ0bWFuYWdlcl9wb3B1cCB1bCB7DQoJbGlzdC1zdHlsZS10eXBlOiBub25lOw0KCW92ZXJmbG93OiBhdXRv'+
        'Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVwICNjcmFmdGluZ0xvZ2dlciBsaSB7DQogICAgcGFk'+
        'ZGluZzogM3B4Ow0KICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMjIyOw0KICAgIG1hcmdpbjogMXB4Ow0KICAgIHdpZHRo'+
        'OiBhdXRvICFpbXBvcnRhbnQ7DQogICAgYmFja2dyb3VuZC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7DQogICAgbWluLWhlaWdodDog'+
        'MThweCAhaW1wb3J0YW50Ow0KICAgIGJhY2tncm91bmQtcG9zaXRpb246IDVweCA1MCU7DQp9DQojY3JhZnRtYW5hZ2VyX3BvcHVw'+
        'ICNjcmFmdGluZ0xvZ2dlciBsaSBwIHsNCiAgICBmb250LXNpemU6IDEycHg7DQogICAgcGFkZGluZy1sZWZ0OiAzMHB4Ow0KfQ0K'+
        'I2NyYWZ0bWFuYWdlcl9wb3B1cCAjY3JhZnRfbWVzc2FnZXMgew0KICAgIGZsb2F0OiBsZWZ0Ow0KICAgIHdpZHRoOiA1NTBweDsN'+
        'CiAgICBtYXJnaW4tdG9wOiAxMHB4Ow0KICAgIHRleHQtYWxpZ246IGxlZnQ7DQp9DQo='
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
    var eventNames = {
		3013: 'mafia_invite',
		3012: 'gift',
		3052: 'energy_pack',
		3018: 'safehouse',
		3053: 'none',
		3054: 'none',
		3053: 'none',
		3053: 'none',
		3066: 'help',
		3065: 'none',
		3067: 'none',
		3070: 'family'
    };
    // popup
    var Popup = new PopupObject('freegiftscenter_popup', {
        type: 'main',
        title: Resources.getPicture('freegiftscenter_title'),
        onclose: function() {
            options.fromDomElements();
            options.save();
        }
    });
    /**
     * Create a new RequestV2.
     * @constructor
     * @param {Object} e
     * @return {CSRequestV2}
     */
    var CSRequestV2 = function(e) {
        var params = Util.uSplit(e.acceptUrl);
        var sendBack = {
            to: new Array(),
            message: e.sendbackMsg,
            data: e.sendbackData,
            title: ''
        };
        this.id    = e.event_hash;
        this.type  = eventNames[e.event_type];
        this.url   = e.acceptUrl;
        this.rem   = e.ignoreUrl;
        this.icon  = e.sender_pic;
        this.name  = e.sender_name ;
        this.body  = e.request_msg;
        
        if (e.sendbackData) {
            sendBack.to.push(String(e.sender_id));
            this.send = sendBack;
        }
        this.gift = {
			item_id  : e.data.item_id,
			item_cat : e.data.item_cat,
			name     : e.item_name,
			img      : e.item_pic
        };
        this.user_id = Util.parseNum(params.from_user);
        this.profile = MW.getProfileLink(params.from_user);
        
        return this;
    };    
    /**
     * Create a new Request.
     * @constructor
     * @param {jQuery, Element} e
     * @return {CSRequest}
     */
    var CSRequest = function(e) {
        var params, $sendback, $accept, $ignore;
        
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
        
        var params = Util.uSplit(this.url);
        var gift = UserFreeGifts.getByItemId(params.item_id, params.item_cat);
        
        this.gift = {
			item_id  : params.item_id,
			item_cat : params.item_cat,
			name     : gift.name,
			img      : UserFreeGifts.getImageUrl(gift.img)
        };
		
        this.user_id = Util.parseNum(params.from_user);
        this.profile = MW.getProfileLink(this.user_id);
        
        return this;
    };
    /**
     * Create a new Request Collection.
     * @constructor
     * @return {CSRequestCollection}
     */
    var CSRequestCollection = function() {
        var groupedItemEvents = new Object();
        var requests = new Object();
        /**
         * Add a new request to the collection.
         * @param {CSRequest} req
         */
        this.add = function(req) {
            var groupedId = req.gift.item_id;
            requests[req.id] = req;
            if (!Util.isSet(groupedItemEvents[groupedId])) {
                groupedItemEvents[groupedId] = new Array();
            }
            groupedItemEvents[groupedId].push(req);
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
                if (!Util.isSet(type)||req.type === type) {
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
                if (!Util.isSet(type)||req.type === type) {
					var grp = groupedList[req.gift.item_id];
					if (!Util.isSet(grp)) {
						groupedList[req.gift.item_id] = (grp = new Array());
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
        addAllGifts_click: function() {
            $('ul.mss_selectable li', Popup.content).each(function(index, element) {
                var $li = $(element);
                addToCollector($li);
				$li.fadeOut(500, function() { $li.remove(); });
            });
            genMssSelectedDom();
            return false;
        },
        addGift_click: function() {
			var $li = e$('ul.mss_selectable li.selected', Popup.content);
			if (!$li) {
				$('#mss_info', Popup.content).html('Select a gift first!.');
				return false;
			}
			var n_left = addToCollector($li, $('#mass_body #mss_amount').val());
			if (n_left < 1) {
				$li.fadeOut(500, function() { $li.remove(); });
			} else {
                $('.gift_amount', $li).text(n_left+'x');
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
                    $sl.empty();
                    Util.each(users, function(i, user) {
                        c$('option','value:'+user.uid).appendTo($sl).text(user.name);
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
            if (options.ignoreLimits !== true && excluded.is(req.gift.item_id) && !$li.hasClass('asking')) {
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
                    excluded.add(req.gift.item_id);
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
		$('#snd_messages').empty().append(Resources.getPicture('ajax_loader','span').css('padding-left', 18).text('Loading Friend Lists...'));
		
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
     * Add a gift to collector.
     * @param {jQuery} $li
     * @param {Number} n_amount
     */
    function addToCollector($li, n_amount) {
        var n_iid = $li.attr('iid');
		var n_total = parseInt($li.attr('count')) - Collector.amountOf(n_iid);
		n_amount = Math.min(n_total, (n_amount||n_total));
		Collector.add({
			iid    : n_iid,
			name   : $('.gift_name', $li).text(),
			icon   : $('img', $li).attr('src'),
			action : $('#mass_body #mss_action').val(),
			amount : n_amount
		});
        return n_total - n_amount;
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
            function checkGiftData(data, msg, title) {
                if (data && msg && title) {
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
            } 
            addMessageLog('Loading and preparing "'+gift.name+'" to be send.', 'load');
            if (gift.request_id) {
                MW.getCityRequest(gift.request_id, checkGiftData);
            } else {
                MW.getGiftRequest(gift_id, gift.item_cat, checkGiftData, gift.params);
            }
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
            var cs = (result !== true ? 'mwa_res_ajax_error' : 'mwa_res_ok_icon');
            $('#snd_messages div[name=load]').attr('name','ok').removeClass().addClass(cs);
        }
        /**
         * @param {String} message
         */
        function addMessageLog(message, icon) {
            var $div = Resources.getPicture('info_icon');
            switch(icon) {
                case 'error':  $div = Resources.getPicture('ajax_error');  break;
                case 'load':   $div = Resources.getPicture('ajax_loader'); break;
            }
            $div.prependTo('#snd_messages').attr('name',(icon?icon:'info')).append(c$('span').html(message));
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
                if (options.ignoreLimits !== true && excluded.is(req_set.iid)) {
                    c_gift.MoveNext();
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
            var $li = (icon==='error') 
            ? Resources.getPicture('ajax_error', 'li')
            : Resources.getPicture('info_icon', 'li');
            
            var userProfile = Util.isSet(req) 
            ? Util.setAnchor(req.profile, req.name) + ': ' : '';
            
            if (icon !== 'error') {
                message = Util.setColor(message, '#E1E1E1');
            } else {
                message = Util.setColor(message, 'red');
            }
            $li.prependTo('#mss_messagelog').append(c$('p').html(userProfile + message));
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
                var $html = h$(htmlText);
                var zmc = $html.find('script:regex(ZmcController)');
                var $li = $html.find('ul#zmc_message_list_ul li');
                
                Popup.content.append(zmc);
                zmc = unsafeWindow.ZmcController;
                Requests = new CSRequestCollection();
                
                if (Util.isSet(zmc.allEvents)) {
                    Util.each(zmc.allEvents, function(index, e) {
                        Requests.add(new CSRequestV2(e)); 
                    });
                } else {
                    $li.each(function(index, elem) {
                        Requests.add(new CSRequest(elem)); 
                    });
                }
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
			.append(s$('mss_action', 'Action:', 260))
			.append(c$('div').css({'clear':'both','margin-top':4}))
			.append(n$('mss_amount', 'Amount to collect:', 80))
			.append(c$('div').css({'clear':'both','margin-top':6}))
			.append(b$('Add All', 'class:short green').css('float','left').click(Events.addAllGifts_click))
			.append(b$('Add Selected >>', 'class:short green').click(Events.addGift_click)))
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
        
        function getEventOptions() {
            var result = {
                'all'    : 'All',
                'search' : 'Search'
            };
            Util.each(eventNames, function(id, name) {
                if (name !== 'none') {
                    result[name] = Util.formatText(name.replace(/_/g,' '));
                }
            });
            return result;
        }            
        Popup.applyOptions({
			'mss_action': {
				'accept'  :'Accept And Thank', 
				'okonly'  :'Accept Only', 
				'thank'   :'Thank Only', 
				'ignore'  :'Ignore'
			},
            'category_select' : getEventOptions(),
            'friendlists'     : {'none': 'Custom', 'active': 'Most Active'}
        });
    }

    function genRequestDom() {
        var $ul = $('#reqslist', Popup.content).empty();
        var $icon = Resources.getPicture('ajax_loader').text('Loading...').css('padding-left',18).attr('id','loading_overlay');
        
        Requests.each(function(id, req) {
            
            var name  = '<a href="'+req.profile+'" target="_black">'+req.name+'</a>';
            var $img  = c$('span', 'class:player_pic,title:'+req.name);
            var $li   = c$('li', 'id:req_'+id+',class:'+req.type).appendTo($ul);
            $li = c$('div', 'class:li_wrapper clearfix').appendTo($li);
            if (req.icon) {
                $img.css('background', "url('"+req.icon+"') 50% 50% no-repeat");
            }
            
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
                        
            c$('div','class:body').append('<h4>'+name+'</h4><p>'+req.body+'</p>').appendTo($li).append($icon.clone().hide());
        });

        if ($('li', $ul).length < 1) {
            c$('li').appendTo($ul).append(c$('center').css('padding-top',40).text('You don\'t have request.'));
        }
    }
	
	function genMssSelectableDom() {        
		var $ul = $('.mss_selectable', Popup.content).empty();
        Collector.clear();
		Util.each(Requests.toGroup('gift'), function(item_id, reqs) {
			var gift = reqs[0].gift, reqText = reqs[0].body;
            
            c$('li','iid:'+item_id+',title:'+reqText+',count:'+reqs.length).appendTo($ul)
            .append(c$('img').attr('src', gift.img))
            .append(c$('div', 'class:gift_amount').text(reqs.length+'x'))
            .append(c$('div', 'class:gift_name').text(gift.name))
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
        'MTZfMDEuZ2lmIikgNXB4IDEzcHggbm8tcmVwZWF0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVsLA0K'+
        'I2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjc2VuZF9ib2R5IHVsIHsNCgloZWlnaHQ6IDQ2MHB4Ow0KCW1hcmdpbi10b3A6IDJweDsN'+
        'Cglib3JkZXI6IHNvbGlkIDFweCAjNjY2Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJcGFkZGluZzogNXB4Ow0KfQ0KI2ZyZWVnaWZ0'+
        'c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVsIGxpIGltZywNCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI3NlbmRfYm9keSB1bCBs'+
        'aSBpbWcgew0KCWZsb2F0OiBsZWZ0Ow0KICAgIHdpZHRoOiAxOHB4Ow0KICAgIGhlaWdodDogMThweDsNCn0NCiNmcmVlZ2lmdHNj'+
        'ZW50ZXJfcG9wdXAgI21hc3NfYm9keSB1bCBsaSwNCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI3NlbmRfYm9keSB1bCBsaSB7DQoJ'+
        'cGFkZGluZzogM3B4Ow0KCXRleHQtZGVjb3JhdGlvbjogbm9uZTsNCglib3JkZXI6IDFweCBzb2xpZCAjMjIyOw0KCW1hcmdpbjog'+
        'MXB4Ow0KICAgIHdpZHRoOiBhdXRvICFpbXBvcnRhbnQ7DQogICAgYmFja2dyb3VuZC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7DQog'+
        'ICAgbWluLWhlaWdodDogMThweCAhaW1wb3J0YW50Ow0KICAgIGJhY2tncm91bmQtcG9zaXRpb246IDVweCA1MCU7DQp9DQojZnJl'+
        'ZWdpZnRzY2VudGVyX3BvcHVwIHVsI21zc19zdWNjZXNzbG9nIGxpIGg0IHsNCglmb250LXNpemU6IDE0cHg7DQoJbGluZS1oZWln'+
        'aHQ6IDE4cHg7DQoJbWFyZ2luLWJvdHRvbTogNHB4Ow0KCXBhZGRpbmctdG9wOiAycHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCglj'+
        'b2xvcjogI0ZGRDkyNzsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwjbXNzX3N1Y2Nlc3Nsb2cgbGkgcCB7DQoJZm9udC1z'+
        'aXplOiAxMnB4Ow0KCW1pbi1oZWlnaHQ6IDM1cHg7DQoJcGFkZGluZy1sZWZ0OiA0MHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9w'+
        'b3B1cCB1bCNtc3NfbWVzc2FnZWxvZyBsaSBwIHsNCglmb250LXNpemU6IDEycHg7DQoJaGVpZ2h0OiAyMHB4Ow0KCXBhZGRpbmct'+
        'bGVmdDogMzBweDsNCgltYXJnaW4tYm90dG9tOiAxcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNzZW5kX2JvZHkgdWwg'+
        'bGkgaW1nIHsNCgltYXJnaW4tcmlnaHQ6IDVweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI3NlbmRfYm9keSB1bC5zbmRf'+
        'c2VsZWN0YWJsZSBsaSBkaXYgew0KCXdpZHRoOiA5MCU7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsI21zc19zdWNjZXNz'+
        'bG9nIGxpIGltZyB7DQoJbWFyZ2luLXJpZ2h0OiA1cHg7DQoJaGVpZ2h0OiAzMHB4Ow0KCXdpZHRoOiAzMHB4Ow0KfQ0KI2ZyZWVn'+
        'aWZ0c2NlbnRlcl9wb3B1cCAjc2VuZF9ib2R5ICNzbmRfbWVzc2FnZXMgew0KICAgIG1pbi1oZWlnaHQ6IDgwcHg7DQogICAgb3Zl'+
        'cmZsb3cteTogYXV0bzsNCiAgICBtYXgtaGVpZ2h0OiA4MHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjc2VuZF9ib2R5'+
        'ICNzbmRfbWVzc2FnZXMgZGl2IHsNCiAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50Ow0KICAgIGJhY2tncm91bmQtc2l6ZTogMThw'+
        'eCAhaW1wb3J0YW50Ow0KICAgIG1pbi1oZWlnaHQ6IDE4cHggIWltcG9ydGFudDsNCiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAw'+
        'cHggNTAlOw0KICAgIHBhZGRpbmc6IDJweCA1cHggMnB4IDIwcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNtYXNzX2Jv'+
        'ZHkgZGl2LmxpX3dyYXBwZXIsDQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNzZW5kX2JvZHkgZGl2LmxpX3dyYXBwZXIgew0KICAg'+
        'IHdpZHRoOiAzNDRweDsNCiAgICBmbG9hdDogbGVmdDsNCiAgICBtYXJnaW46IDJweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9w'+
        'dXAgI21hc3NfYm9keSB1bCNtc3Nfc3VjY2Vzc2xvZyBsaSBpbWcgew0KICAgIHdpZHRoOiAzMnB4Ow0KICAgIGhlaWdodDogMzJw'+
        'eDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgI21hc3NfYm9keSB1bC5tc3Nfc2VsZWN0YWJsZSBsaSB7DQoJY3Vyc29yOiBw'+
        'b2ludGVyOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVsLm1zc19zZWxlY3RhYmxlIGxpLnNlbGVjdGVk'+
        'LA0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjc2VuZF9ib2R5IHVsLnNuZF9zZWxlY3RhYmxlIGxpLnNlbGVjdGVkIHsNCglib3Jk'+
        'ZXI6IDFweCBzb2xpZCB5ZWxsb3c7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNtYXNzX2JvZHkgdWwubXNzX3NlbGVjdGFi'+
        'bGUgbGk6aG92ZXIsDQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNzZW5kX2JvZHkgdWwuc25kX3NlbGVjdGFibGUgbGk6aG92ZXIg'+
        'ew0KICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsIGxpIGRpdi5naWZ0X25h'+
        'bWUgew0KICAgIG1hcmdpbjogMHB4IDBweCAwcHggNXB4Ow0KICAgIGZsb2F0OiBsZWZ0Ow0KICAgIG92ZXJmbG93OiBoaWRkZW47'+
        'DQogICAgbWF4LWhlaWdodDogMjBweDsNCiAgICBtYXgtd2lkdGg6IDI4MHB4Ow0KICAgIGhlaWdodDogMjBweDsNCn0NCiNmcmVl'+
        'Z2lmdHNjZW50ZXJfcG9wdXAgdWwgbGkgZGl2LmdpZnRfYW1vdW50IHsNCgltYXJnaW46IDBweCAzcHggMHB4IDhweDsNCglmbG9h'+
        'dDogbGVmdDsNCglvdmVyZmxvdzogaGlkZGVuOw0KCW1heC1oZWlnaHQ6IDIwcHg7DQoJbWF4LXdpZHRoOiAzMHB4Ow0KCW1pbi13'+
        'aWR0aDogMjBweDsNCgljb2xvcjogeWVsbG93Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAjbWFzc19ib2R5IHVsLm1zc19z'+
        'ZWxlY3RlZCBsaSBkaXYucXVhbnRpdHkgew0KCWZsb2F0OiByaWdodDsNCiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7DQp9DQojZnJl'+
        'ZWdpZnRzY2VudGVyX3BvcHVwICNtYXNzX2JvZHkgdWwubXNzX3NlbGVjdGVkIGxpIGRpdi5xdWFudGl0eSBpbnB1dCB7DQoJZm9u'+
        'dC13ZWlnaHQ6IGJvbGQ7IA0KCWNvbG9yOiByZ2IoMjA4LCAyMDgsIDIwOCk7IA0KCWJvcmRlcjogMXB4IHNvbGlkIHJnYigxNTMs'+
        'IDE1MywgMTUzKTsgDQoJYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IA0KCWZvbnQtc2l6ZTogMTRweDsNCgl3aWR0aDogMzBweDsN'+
        'CgloZWlnaHQ6IDE1cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwICNtYXNzX2JvZHkgdWwubXNzX3NlbGVjdGVkIGxpIGEg'+
        'ew0KCW1hcmdpbi1sZWZ0OiAycHg7DQoJZmxvYXQ6IHJpZ2h0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCAudG9wX2N0cmwg'+
        'ew0KCWJvcmRlcjogc29saWQgMXB4ICM2NjY7DQoJaGVpZ2h0OiAyMHB4Ow0KICAgIHBhZGRpbmc6IDVweDsNCiAgICBtYXJnaW4t'+
        'dG9wOiAycHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIC50b3BfY3RybCBhIHsNCglmbG9hdDogcmlnaHQ7DQp9DQojZnJl'+
        'ZWdpZnRzY2VudGVyX3BvcHVwIC5zdGFydF9jdHJsIHsNCgloZWlnaHQ6IDM3cHg7DQoJYm9yZGVyOiBzb2xpZCAxcHggIzY2NjsN'+
        'CgltYXJnaW4tdG9wOiAycHg7DQoJcGFkZGluZy10b3A6IDNweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgLnN0YXJ0X2N0'+
        'cmwgYSB7DQoJbWFyZ2luLXJpZ2h0OiAxMHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGRpdi5saV93'+
        'cmFwcGVyIHsNCglib3JkZXItdG9wOiAxcHggc29saWQgIzIyMjsNCglwYWRkaW5nOiA2cHggMTRweCAwIDUycHg7DQp9DQojZnJl'+
        'ZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGk6Zmlyc3QtY2hpbGQgew0KCWJvcmRlci13aWR0aDogMHB4Ow0KfQ0KI2Zy'+
        'ZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpIHsNCgltaW4taGVpZ2h0OiA3NnB4Ow0KCW1heC1oZWlnaHQ6IDE2MHB4'+
        'Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpLmdpZnQgew0KCWJhY2tncm91bmQ6IHVybCgiaHR0cDov'+
        'L213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy92My9pY29uX2dpZnRfMjd4MjhfMDEucG5nIikgMTdweCAyMHB4'+
        'IG5vLXJlcGVhdDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaS5tYWZpYV9pbnZpdGUgew0KICAgIGJh'+
        'Y2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy92My9pY29uX21hZmlhX2hh'+
        'dF8zMngyNV8wMS5wbmciKSAxNHB4IDIwcHggbm8tcmVwZWF0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94'+
        'IGxpLmVuZXJneV9wYWNrIHsNCiAgICBiYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIv'+
        'Z3JhcGhpY3MvdjMvaWNvbl9lbmVyZ3lfcGFja18yOXgyN18wMS5wbmciKSAxNnB4IDIwcHggbm8tcmVwZWF0Ow0KfQ0KI2ZyZWVn'+
        'aWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpLmhlbHAgew0KICAgIGJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3Rh'+
        'dGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9tYXBfYmFzZWRfam9icy9leHBlcnRfdmlldy9pY29uX21lZ2FwaG9uZS5wbmci'+
        'KSAxN3B4IDIwcHggbm8tcmVwZWF0Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpLmZhbWlseSB7DQog'+
        'ICAgYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3YzL0ZhbWlseV9a'+
        'TUNfSWNvbi5wbmciKSAxNXB4IDIwcHggbm8tcmVwZWF0ICFpbXBvcnRhbnQ7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVs'+
        'Lm1hZmlhX2ludml0ZSBsaSB7DQogICAgZGlzcGxheTogbm9uZTsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwubWFmaWFf'+
        'aW52aXRlIGxpLm1hZmlhX2ludml0ZSB7DQogICAgZGlzcGxheTogYmxvY2s7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVs'+
        'LmdpZnQgbGkgew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLmdpZnQgbGkuZ2lmdCB7'+
        'DQogICAgZGlzcGxheTogYmxvY2s7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLmVuZXJneV9wYWNrIGxpIHsNCiAgICBk'+
        'aXNwbGF5OiBub25lOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5lbmVyZ3lfcGFjayBsaS5lbmVyZ3lfcGFjayB7DQog'+
        'ICAgZGlzcGxheTogYmxvY2s7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnNhZmVob3VzZSBsaSB7DQogICAgZGlzcGxh'+
        'eTogbm9uZTsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwuc2FmZWhvdXNlIGxpLnNhZmVob3VzZSB7DQogICAgZGlzcGxh'+
        'eTogYmxvY2s7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLmhlbHAgbGkgew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQoj'+
        'ZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLmhlbHAgbGkuaGVscCB7DQogICAgZGlzcGxheTogYmxvY2s7DQp9DQojZnJlZWdpZnRz'+
        'Y2VudGVyX3BvcHVwIHVsLmZhbWlseSB7DQogICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsNCn0NCiNmcmVl'+
        'Z2lmdHNjZW50ZXJfcG9wdXAgdWwuZmFtaWx5IGxpIHsNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9w'+
        'b3B1cCB1bC5mYW1pbHkgbGkuZmFtaWx5IHsNCiAgICBkaXNwbGF5OiBibG9jazsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAg'+
        'dWwuc2VhcmNoIGxpIHsNCiAgICBkaXNwbGF5OiBub25lOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5zZWFyY2ggbGku'+
        'bWF0Y2hlZCB7DQogICAgZGlzcGxheTogYmxvY2s7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgZGl2'+
        'LmJ1dHRvbnMgew0KCWZsb2F0OiByaWdodDsNCglmb250LXNpemU6IDEwcHg7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbWFyZ2lu'+
        'OiAzcHggMHB4IDBweCAxNHB4Ow0KCXRleHQtYWxpZ246IHJpZ2h0Ow0KCXdpZHRoOiA3MHB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRl'+
        'cl9wb3B1cCB1bC5yZXFfYm94IGxpIGRpdi5ib2R5IHsNCgltYXJnaW4tcmlnaHQ6IDEwMHB4Ow0KCW1hcmdpbi1sZWZ0OiA2NXB4'+
        'Ow0KCW1pbi1oZWlnaHQ6IDYwcHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgZGl2LmJvZHkgI2xv'+
        'YWRpbmdfb3ZlcmxheSBpbWcgew0KICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsNCiAgICBib3R0b206IC0zcHg7DQogICAgbWFyZ2lu'+
        'LXJpZ2h0OiA1cHg7DQp9DQojZnJlZWdpZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgaDQgew0KCWZvbnQtc2l6ZTogMTRw'+
        'eDsNCglsaW5lLWhlaWdodDogMThweDsNCgltYXJnaW4tYm90dG9tOiA0cHg7DQoJcGFkZGluZy10b3A6IDJweDsNCn0NCiNmcmVl'+
        'Z2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSBwIHsNCglmb250LXNpemU6IDEycHg7DQoJbGluZS1oZWlnaHQ6IDE1cHg7'+
        'DQoJbWFyZ2luLWJvdHRvbTogNXB4Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpLmZhaWxlZCBwIHsN'+
        'Cgljb2xvcjogcmVkOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpLmFza2luZyBwIHsNCgljb2xvcjog'+
        'eWVsbG93Ow0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bC5yZXFfYm94IGxpIGltZyB7DQogICAgZmxvYXQ6IGxlZnQ7DQog'+
        'ICAgbWF4LXdpZHRoOiA1NHB4Ow0KCW1heC1oZWlnaHQ6IDU0cHg7DQogICAgbWFyZ2luLXJpZ2h0OiA1cHg7DQp9DQojZnJlZWdp'+
        'ZnRzY2VudGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgZGl2LmJ1dHRvbnMgYS5zZXh5X2J1dHRvbl9uZXcgew0KCW1hcmdpbi1ib3R0'+
        'b206IDZweDsNCn0NCiNmcmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSBkaXYuYnV0dG9ucyBhLmlnbm9yZSwNCiNm'+
        'cmVlZ2lmdHNjZW50ZXJfcG9wdXAgdWwucmVxX2JveCBsaSBkaXYuYnV0dG9ucyBhLmFjY2VwdG9ubHksDQojZnJlZWdpZnRzY2Vu'+
        'dGVyX3BvcHVwIHVsLnJlcV9ib3ggbGkgZGl2LmJ1dHRvbnMgYS50aGFua3Nvbmx5IHsNCgl0ZXh0LXRyYW5zZm9ybTogdXBwZXJj'+
        'YXNlOw0KfQ0KI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCB1bCwgI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBsaSwgI2ZyZWVnaWZ0c2Nl'+
        'bnRlcl9wb3B1cCBkbCwgI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBkdCwgI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBkZCwgI2ZyZWVn'+
        'aWZ0c2NlbnRlcl9wb3B1cCBoMiwgI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBoMywgI2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBoNCwg'+
        'I2ZyZWVnaWZ0c2NlbnRlcl9wb3B1cCBwIHsNCgltYXJnaW46IDBweDsNCglwYWRkaW5nOiAwcHg7DQp9'
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
    
    actions                    : {'skipif':new Object(),'fail':new Object()},
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
    warloot                    : new Object(),
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
    /** @type {CSStreamCollection} */ var feedStream;
    /** @type {CSActionCollection} */ var Actions;
    var options = UserConfig.hfopt;
    
    // popup
    var popupElt = new PopupObject('homefeedcenter_popup', {
        type: 'main',
        title: Resources.getPicture('homefeedcenter_title'),
        onclose: function() {
            cancel_process = true;
            httpAjaxStopRequests();
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
            }
            else if (arr.length > 199) {
                arr = arr.splice(0, 1);
            }
            arr.push(feed.post_id);
            options.save();
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
        /** @type String   */ this.skipif    = params.skipif;
        /** @type String   */ this.fail      = params.fail;
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
            Util.each(actions, callback);
        };
        return this;
    };
    /**
     * @constructor
     * @param {Object} element
     * @return {CSDailyTakeLoot}
     */
    var CSDailyTakeLoot = function(element) {
        var expr = /do_ajax\('popup_fodder','(remote\/html_server.php[^']+)/i;
        var $pic = $('div:first img', element);
        this.pic      = $pic.attr('src');
        this.url      = Util.doRgx(expr, $('.collectbutton a', element).attr('onclick')).$1;
        this.attack   = parseInt($('.attack', element).text()||0);
        this.defense  = parseInt($('.defense', element).text()||0);
        this.name     = $pic.attr('title');
        return this;
    };
    var CSDailyTakeLootCollection = function() {
        var Items = new Array();
        /**
         * @param {CSDailyTakeLoot} loot
         */
        this.add = function(loot) {
            if (loot && loot.url) {
                Items.push(loot);
            }
        };
        this.length = function() {
            return Items.length;
        };
        /**
         * @param {Number} index
         */
        this.get = function(index) {
            return Items[index];
        };
        /**
         * Loops through all loot items and return the matched item.
         * @param {String} name
         * @return {CSDailyTakeLoot}
         */
        this.getByName = function(name) {
            var matched;
            if (Util.isString(name) && name.length > 0) {
                var expr = new RegExp(name, 'i');
                Util.each(Items, function(index,loot) {
                    if (expr.test(loot.name)) {
                        matched = loot;
                        return false;
                    }
                });
            }
            return matched;
        };
        /**
         * Loops through all loot items and return the matched item.
         * @param {Number} attack
         * @param {Number} defense
         * @return {CSDailyTakeLoot}
         */
        this.getByStats = function(attack, defense) {
            var matched;
            if (Util.isString(name) && name.length > 0) {
                Util.each(Items, function(index,loot) {
                    if (loot.attack >= attack || loot.defense >= defense) {
                        matched = loot;
                        return false;
                    }
                });
            }
            return matched;
        };        
        /**
         * Get all items names.
         */
        this.names = function() {
            var names = new Array();
            Util.each(Items, function(index,loot) {
                names.push(loot.name);
            });
            return names.join(', ');
        };
        /**
         * Loops through all loot items.
         * @param {Object} callback
         */
        this.each = function(callback) {
            Util.each(Items, callback);
        };
        return this;
    };

    // EVENTS
    var Events = {
        selectHelp: function() {
            var me = $(this), $ul = $('#logList');
            var p = me.position(), w = me.width();
            var t = $ul.position().top;
            var h = t + $ul.height() - me.outerHeight();
            me.addClass('selected').css({'top':Math.max(t, Math.min(h, p.top)), 'width':w});
        },
        unselectHelp: function() {
            $(this).removeAttr('style').removeClass('selected');
        },
        likeFeed_click: function() {
            var me = $(this);
            me.unbind().css('opacity',0.5);
            facebook.likeAdd(me.attr('postid'),function() {
                me.replaceWith(Util.setColor('Liked!','yellow')).css('opacity',1);
            });
            return false;
        },
        resetWarloot: function() {
            var $ops = $('#warloot_data option');
            if ($ops.length > 0) {
                $ops.each(function(index,op) {
                    var loot = options.warloot[op.value];
                    if (loot) {
                        loot.count = 0;
                    }
                });
                options.save(updateWarLoot);
            }
            return false;
        },
        removeWarloot: function() {
            var $selection = $('#warloot_data option:selected');
            if ($selection.length > 0) {
                $selection.each(function(index,op) {
                    delete options.warloot[op.value];
                });
                options.save(updateWarLoot);
            }
            return false;
        },
        editWarloot: function() {
            var $selected = $('#warloot_data option:selected:first');
            if ($selected.length > 0) {
                warLootData(options.warloot[$selected.val()]);
                $('#minipopup_content').show();
                $('#panel_container').css('z-index',1);
            }
            return false;
        },
        addWarloot: function() {
            warLootData({});
            $('#minipopup_content').show();
            $('#panel_container').css('z-index',1);
            return false;
        },
        saveWarloot: function() {
            $('#minipopup_content').hide();
            $('#panel_container').css('z-index',10);
            var data = warLootData();
            options.warloot[data.id] = data;
            options.save(updateWarLoot);
            return false;
        },
        addUserToFilter_click: function() {
            var added_users = new Array();
            var listElt = $('#hfopt_userfilter');
            $('option',listElt).each(function(i, e) {
                added_users.push(e.value);
            });
            showFriendsSelector(function(users) {
                if (users && users.length > 0) {
                    listElt.empty();
                    Util.each(users, function(i, user) {
                        c$('option','value:'+user.uid).text(user.name).appendTo(listElt);
                    });
                }
            }, added_users);
            return false;
        },
        clearUserFilter_click: function() {
            $('#hfopt_userfilter', popupElt.content).empty();
            return false;
        },
        helpFeed_click: function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            $(this).addClass('disabled');
            var unkActionMsg = 'Unknow feed.<br>You can still help by <a href="${link}" target="_black">click here</a>.';
            var id = $(this).attr('feed');
            var $li = $('li[feed='+id+']');
            var $p = $('.body > p', $li).empty();
            var $div = $('.state_completed',$li);
            var help = feedStream.get(id);
            
            $('.state_accept, .state_completed', $li).hide();
            
            if (help && help.action && isChecked(help.action.enable)) {
                Resources.getPicture('ajax_loader','span').appendTo($p).css('padding-left',18).text('Loading...');
                doHelp(help.url, help.action, function(data, success) {
                    data = cleanResponse(data);
                    help.collected();
                    $li.addClass('collected');
                    if (success === true) {
                        addCommentFeed($div, help.feed.post_id, data);
                    }
                    completed(data);
                });
            }
            else {
                completed(Util.render(unkActionMsg,{'link':help.feed.attachment.href}));
                $li.addClass('collected');
            }
            function completed(message, callback) {
                $p.hide().html(message).fadeIn(500, function(){$div.show();});
            }
            return false
        },
        deleteFeed_click: function() {
            removeFeed( $(this).attr('feed') );
            return false
        },
        skip_click: function() {
            showDiv('control', 'panel', 500, qryAction('#status_panel','empty'));
        },
        refresh_click: function() {
            showDiv('ajaxloader', 'body');
            showDiv('status', 'panel');
            c$('div').css('padding-top',5).appendTo($('#status_panel').empty())
                     .text('Loading... wait a moment please.');
            facebook.queryFeed(function(fs) {
                if (!Util.isArray(fs) || fs.length < 1) {
                    showErrorMessage();
                    return;
                }
                feedStream = new CSStreamCollection(fs);
                genFeedsDom();
                updateWarLoot();
                showDiv('feedlist', 'body');
                showDiv('control', 'panel', 500);
            }, options.feedsLimit);
        },
        cancel_click: function() {
            messageTimer.clear();
            cancel_process = true;
            options.save(Events.refresh_click);
            $('#logList, #logSkippedList').empty();
            return false;
        },
        config_click: function() {
            $('#control_panel').fadeOut(500, function() {
                $('#minipopup_overlay').fadeIn(500);
                $('#panel_container').animate({height: 280}, 'normal', function() {
                    $('#config_panel').fadeIn(500);
                });
            });
        },
        save_click: function() {
            options.fromDomElements();
            options.save();
            $('#config_panel').fadeOut(500, function() {
                $('#panel_container').animate({height:35}, 'normal', function() {
                    $('#minipopup_overlay').fadeOut(500);
                    $('#control_panel').fadeIn(500);
                });
            });
        },
        keyup: function() {
            var search = this.value;
            clearTimeout($(this).attr('timeout'));
            $(this).attr('timeout', setTimeout(function() {
                if (Util.isString(search) && search.length > 3) {
                    $('li[feed]', '#feedlist_body').each(function(index, element) {
                        if (Util.doRgxTest(search, $('.body > p',element).text())) {
                            $(element).show();
                        } else {
                            $(element).hide();
                        }
                    });
                } else {
                    $('li[feed]', '#feedlist_body').show();
                }
            }, 1000));
        },
        change: function() {
            var gid = $('option:selected', this).val();
            if (gid === 'none') {
                $('li[feed]', '#feedlist_body').show();
                return;
            }
            $('li[feed]', '#feedlist_body').hide();
            $('li[gid='+gid+']', '#feedlist_body').show();
        },
        clearall: function() {
            $('li.collected', popupElt.content).each(function(index, element) {
                removeFeed( $(element).attr('feed') );
            });
        },
        config_change: function(e) {
            var $prnt = $(this).parent();
            var name = $(this).attr('name');
            
            if (!$(e.target).hasClass('checkbox') && !$(this).hasClass('selected')) {
                $('.selected', $prnt).toggleClass('selected', false);
                $(this).toggleClass('selected', true);
                showDiv(name, 'config');
            }
            return false;
        },
        subconfig_change: function(e) {
            var $div = $(this).parent().parent();
            var name = $(this).attr('name');
            var action = Actions.get(name);
            
            if (!$(e.target).hasClass('checkbox') && !$(this).hasClass('selected')) {
                $('.selected', $div).removeClass('selected');
                $(this).addClass('selected');
                if (action) {
                    $('#action_skipif', $div).attr('name',name).val(action.skipif||'');
                    $('#action_fail',   $div).attr('name',name).val(action.fail||'');
                }
            }
            return false;
        },
        action_issue_change: function() {
            var id = $(this).attr('name');
            var type = Util.doRgx(/action_(\w+)/, this.id).$1;
            var text = this.value;
            if (!Util.isString(id) || !Util.isString(text)) { 
                return; 
            }
            if (text.length < 1) {
                delete Actions.get(id)[type];
                delete options.actions[type][id];
            }
            else if (text !== Actions.get(id)[type]) {
                options.actions[type][id] = text;
                Actions.get(id)[type] = text;
            }
        }
    };
    /**
     * Return a function to execute the defined jQuery action.
     * @param {Object} selector
     * @param {String} action
     * @param {Object} [context]
     */
    function qryAction(selector, action, context) {
        return function() {
            $(selector, context)[action]();
        };
    }
    /**
     * Set/Get the war loot current data.
     * @param {Object} [data]
     * @return [Object]
     */
    function warLootData(data) {
        var $content = $('#minipopup_content');
        var save = Util.isSet(data);
        data = Util.merge({
            id      : parseInt((new Date()).getTime()/1000),
            enabled : true,
            name    : '*',
            att     : 0,
            def     : 0,
            max     : 0,
            count   : 0
        }, data);
        Util.each(data, function(name, value) {
            var $el = $('#warloot_'+name, $content);
            if ($el.length > 0) {
                if ($el.is('input, select')) {
                    if (save) {
                        $el.val(value);
                    } else {
                        data[name] = $el.val();
                    }
                } else {
                    if (save) {
                        $el.toggleClass('checked',value);
                    } else {
                        data[name] = $el.hasClass('checked');
                    }
                }
            }
        });
        if (!Util.isString(data.name) || data.name.length < 1) {
            data.name = '*';
        }
        return data;
    }
    function updateWarLoot() {
        var $list = $('#warloot_data').empty();
        var text = '${enabled}: (${count}/${max}) collect "${name}" if > "${att}/${def}".';
        Util.each(options.warloot, function(id, data) {
            c$('option','value:'+id).appendTo($list).text(Util.render(text, {
                enabled: (data.enabled?'ON':'OFF'),
                name: (data.name==='*'?'Anything':data.name),
                att: data.att,
                def: data.def,
                max: (data.max > 0 ? data.max : '\u221E'),
                count: data.count,
            }));
        });
    }
    
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
    function cleanResponse(response) {
        if (typeof(response) !== 'string') {
            return response;
        }
        var obj = $('<div>'+ response.replace(/<div[^>]*>/g, '<div>') +'</div>');
        $('img, .sexy_button_new, .sexy_button, br, div:empty, .msg_energy_but_col, script', obj).remove();
        return obj.html();
    }
    /**
     * Add a comment button.
     * @param {Object} element
     * @param {String} post_id
     * @param {String} message
     */
    function addCommentFeed(element, post_id, message) {
        message = h$('<div>'+message+'</div>').text();
        if (!post_id || !(Util.isString(message) && message.length > 2)) { 
            return;
        }
        c$('a','href:#,class:ignore').text('Comment').appendTo(element).click(function() {
            var me = $(this);
            me.unbind().css('opacity',0.5);
            facebook.commentAdd(post_id, message, function() {
                me.replaceWith(Util.setColor('Commented!','yellow')).css('opacity',1);
            });
            return false;
        });
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
            skipif     : 'You have already collected'
        });
        Actions.add('war_view', {
            name       : 'Go to war',
            group      : 'doGotoWar',
            next       : helpInWar
        });
        Actions.add('war_share_reward_feed_click', {
            name       : 'Claim war reward',
            group      : 'doClaimBonusAndReward',
            next       : warRewardResult,
            fail       : 'You cannot claim this reward'
        });
        Actions.add('socialmission_joinMission', {
            name       : 'Join in a mission',
            group      : 'doSocialMissions',
            next       : joinOperation
        });
        Actions.add('robbing_mastery_bonus', {
            name       : 'Claim robbing mastery bonus',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=mastery_bonus)'
        });
        Actions.add('index_ach_celeb', {
            name       : 'Get archivement reward',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=ach_celeb)',
            fail       : 'You already got the bonus before'
        });
        Actions.add('story_claim_boss_bonus', {
            name       : 'Claim a boss bonus',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=claim_boss_bonus)'
        });
        Actions.add('index_crm_levelup_claim', {
            name       : 'Get free Loyalty Points',
            group      : 'doClaimBonusAndReward',
            next       : '.message_body a:regex(href,xw_action=crm_levelup_claim)',
            skipif     : 'have already received the maximum amount'
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
        Actions.add('socialmission_rewardBrag',        { 
            name       : 'Claim social mission reward',
            group      : 'doClaimBonusAndReward',
            fail       : 'You are too late to claim a reward.'
        });
        Actions.add('job_collect_loot', {
            name       : 'Collect a loot',
            group      : 'doPropertyHelp',
            skipif     : 'have to wait'
        });        
        Actions.add('limitedTimeProperty_addPropertyPart', {
            name       : 'Send Limited Time Property Parts',     
            group      : 'doPropertyHelp',
            skipif     : 'You have already sent \\d+ parts today'
        });
        Actions.add('limitedTimeProperty_upgradeBragFeed',{ 
            name       : 'Limited Time Property Upgraded',
            group      : 'doPropertyHelp',
            skipif     : 'You already have all parts needed for this level'
        });
        Actions.add('fight_iced_boost_claim', {
            name       : 'Get iced boost',
            group      : 'doClaimBonusAndReward',
            skipif     : 'You can only receive \\d+ free iced fight boosts per day'
        });
        Actions.add('fight_send_boost_from_feed',      { 
            name       : 'Collect Fight Boost',
            group      : 'doClaimBonusAndReward',
            fail       : 'This boost is no longer available' 
        });
        Actions.add('index_levelUpBonusClaim', {
            name       : 'Get levelup Bonus',
            group      : 'doClaimBonusAndReward',
            skipif     : 'You have already collected the maximum',
            fail       : 'available bonus rewards have already been claimed'
        });
        Actions.add('lootladderevent_share_feed_click', {
            name       : 'Collect a Share Loot Event',
            group      : 'doClaimBonusAndReward',
            skipif     : 'try again tomorrow'
        });
        Actions.add('lootladderevent_ask_feed_click', {
            name       : 'Collect an Ask Loot Event',
            group      : 'doClaimBonusAndReward',
            skipif     : 'try again tomorrow'
        });
        Actions.add('lootladderevent_brag_feed_click', {
            name       : 'Collect a Golden Loot Event',
            group      : 'doClaimBonusAndReward',
            skipif     : 'try again tomorrow'
        });
        Actions.add('Epicclanboss_ask_feed_click', { 
            name       : 'Collect Boss help item',
            group      : 'doClaimBonusAndReward',
            skipif     : 'You have already collected \\d+ Rifle Rounds today|You are at max capacity' 
        }); 
        Actions.add('job_give_help', { 
            name       : 'Give job help',
            group      : 'doGiveSocialHelp',
            skipif     : 'Try again tomorrow',
            fail       : 'You are too late to help|have already helped|already helped out'
        });
        Actions.add('story_give_help_social', { 
            name       : 'Give social help',
            group      : 'doGiveSocialHelp',
            skipif     : 'Try again tomorrow',
            fail       : 'You are too late to help|have already helped|already helped out'
        });
        Actions.add('story_give_help_moscow_social', { 
            name       : 'Give moscow help',
            group      : 'doGiveSocialHelp',
            skipif     : 'Try again tomorrow',
            fail       : 'You are too late to help|have already helped|already helped out'
        });
        Actions.add('job_sd_boost_get', { 
            name       : 'Collect 2x loot boosts',
            group      : 'doClaimBonusAndReward',
            skipif     : 'you can only collect \\d+ boosts from feeds per day',
            fail       : 'these boosts have already been claimed|already helped your friend with this request'
        });
        Actions.add('propertyV2_one_click_get', { 
            name       : 'Get Rob Squad',
            group      : 'doPropertyHelp',
            skipif     : 'can only collect \\d+ Rob Squads from feeds per day|already helped your friend' 
        });
        Actions.add('propertyV2_collect_all_share', { 
            name       : 'Get Free Property Parts',
            group      : 'doPropertyHelp',
            skipif     : 'you have already collected the maximum amount',
            fail       : 'already helped your friend with this request'
        });
        Actions.add('propertyV2_itemFeedHelp', { 
            name       : 'Property item Help',
            group      : 'doPropertyHelp',
            skipif     : 'You have already helped \\d+ people today',
            fail       : 'has already received the maximum amount'
        });
        Actions.add('propertyV2_cs_redeem_special_item_feed',{ 
            name       : 'Property special help',
            group      : 'doPropertyHelp',
            fail       : 'cannot receive any more Exotic Feeds from you today'
        });
        Actions.add('ClanProperty_getPartsFromFeed', { 
            name       : 'Get Clan Property Parts',
            group      : 'doPropertyHelp',
            skipif     : 'already collected the maximum number of gifts from these requests today' 
        });
        Actions.add('index_levelup_boost_claim', { 
            name       : 'Get levelup boost',            
            group      : 'doClaimBonusAndReward',
            fail       : 'All of the available bonus rewards have already been claimed.',
        });
        Actions.add('FeedOfTheDay_feed_accept', { 
            name       : 'Collect Don\'s Gift',
            group      : 'doClaimBonusAndReward',
            skipif     : 'You have reached your limit for collecting'
        });
        Actions.add('job_mastery_feed_claim', { 
            name       : 'Collect job Mastery reward',
            group      : 'doClaimBonusAndReward',
            skipif     : 'have claimed the maximum number'
        });
        Actions.add('quest_questFeedReward', { 
            name       : 'Claim quest reward',
            group      : 'doClaimBonusAndReward',
            fail       : 'the max number of people have already|you may only collect from a feed once'
        });
        Actions.add('job_accept_city_crew_feed', { 
            name       : 'Join in a crew',
            group      : 'doCityCrew',
            fail       : 'the Crew queue is full|users already assisted'
        });
        Actions.add('bossfightv2_ask_feed_click',      { name: 'Collect a Boss Fight item',    group: 'doClaimBonusAndReward' });
        Actions.add('map_mapboss_reward_claim',        { name: 'Claim boss reward',            group: 'doClaimBonusAndReward' });
        Actions.add('propertyV2_getCustomer',          { name: 'Get a customer',               group: 'doPropertyHelp' });
        Actions.add('propertyV2_cs_help_item',         { name: 'Send Property Parts',          group: 'doPropertyHelp' });
        Actions.add('propertyV2_cs_help_initial',      { name: 'Property Started',             group: 'doPropertyHelp' });
        Actions.add('propertyV2_cs_help_final',        { name: 'Property Upgraded',            group: 'doPropertyHelp' });
        Actions.add('index_send_energy',               { name: 'Send energy',                  group: 'doSendEnergyAndPhones' });
        Actions.add('index_power_pack_get',            { name: 'Send Power Pack',              group: 'doSendEnergyAndPhones' });
        Actions.add('robbing_call_for_help_get_phone', { name: 'Get robbing phone',            group: 'doSendEnergyAndPhones' });
        Actions.add('robbing_one_click_get',           { name: 'Get Rob Squad',                group: 'doSendEnergyAndPhones' });
        Actions.add('job_accept_city_crew',            { name: 'Join in a crew',               group: 'doCityCrew' });

        /*
        Actions.add('freegifts_acceptGiftEvent',       { name: 'Collect Gift Event',           group: 'doClaimBonusAndReward' });
        Actions.add('hitlist_feed_hit', {
            name       : 'Hitlist Bounty',
            group      : 'doHitlistBounty',
            repeat     : '.message_body a:regex(href,action=attack), a:regex(href,action=power_attack)',
            bad        : '.message_body:has(span.bad)',
            success    : '.fight_results, .fightres_stats'
        });
        */
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
                if (Util.isFunc(action.next)) {
                    action.next.apply(action, [htmlText, callback]);
                    return;
                }
                var $r, $html = h$(htmlText);
                
                if (action.next && ($r = $html.find(action.next)).length > 0) {
                    doHelp(getUrlFromElement($r), {}, callback, true);
                    return;
                }
                if (($r = $html.find('.message_body:first, #mbox_generic_1 tr:eq(1)')).length > 0) {
                    callback($r.html(), !Util.doRgxTest(action.fail, $r.text()));
                }
                else {
                    callback(ERROR_BAD_RESPONSE);
                }
            }
        });
    }
    /**
     * @param {Object} id
     */
    function removeFeed(id) {
        var $li = $('li[feed='+id+']');
        $li.fadeOut(500, qryAction($li, 'remove'));
        feedStream.remove(parseInt(id));
        $('#total_feeds', '#feed_center_header').html(feedStream.length());
    }
    /**
     * Add an error message.
     */
    function showErrorMessage() {
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
     * Help in a war.
     * @param {String} htmlText
     * @return {Boolean, String}
     */
    function helpInWar(htmlText, callback) {
        var $html = h$(htmlText);
        var reward = $html.find('.helpers_rewards ul img').attr('title');
        var message = 'Wrong War Loot. ( '+reward+' )';
        var queries = {
            att: 'a:regex(href,xw_controller=war&xw_action=attack)',
            shr: '.war_attacks div.left a:regex(href,controller=stats)',
            scs: '.post_help_results p, .pop_box > div > div > div:eq(1)',
            msg: '.message_body:first'
        };
        if (!reward) {
            callback( 'Unknow War loot.', false );
            return;
        }
        if (Util.length(options.warloot) < 1) {
            callback( 'Your War Loot filter is empty.', false );
            return;
        }
        if ($html.find(queries.att).length < 1) {
            callback( 'This war is already over.', false );
            return;
        }
        /**
         * @param {String} url
         * @param {Object} loot
         */
        function attackTo(url, loot) {
            httpAjaxRequest({
                'url': url, 
                'success': function(htmlText) {
                    if (!MW.update(htmlText)) {
                        callback(ERROR_BAD_RESPONSE);
                        return;
                    }
                    var $html = h$(htmlText);
                    var att = $html.find(queries.att);
                    if (att.length > 0) {
                        attackTo( getUrlFromElement(att), loot );
                    } else {
                        if (!(message = $(queries.scs, Util.parsePopup(htmlText)).text())) {
                            message = $html.find(queries.msg).text();
                        }
                        postWarResult(loot, $html);
                    }
                }
            });
        }
        /**
         * @param {Object} loot
         * @param {jQuery} $html
         */
        function postWarResult(loot, $html) {
            var failed = true;
            $html.find(queries.shr).each(function(i, a){
                try {
                	var id = global.Base64.decode(Util.uSplit(a.href).user);
                	if (global.USER_ID === id) {
                        if (loot) {
                            if (Util.isNumber(loot.count)) {
                                loot.count++;
                            } else {
                                loot.count = 1;
                            }
                            options.save();
                        }
                        callback( message+' This War Loot: ( '+reward+' )', true );
                	    return (failed=false);
                	}
                } catch(e){}
            });
            if (failed) {
                callback( message, false );
            }
        }
        Util.each(options.warloot, function(id, data) {
            var expr_name = new RegExp(data.name==='*'?'.':data.name, 'i');
            var attack = parseInt(Util.doRgx(/Attack:\s?(\d+)/i,reward).$1||1);
            var defense = parseInt(Util.doRgx(/Defense:\s?(\d+)/i,reward).$1||1);
            
            if (!data.enabled) {
                return true;
            } else if ((data.max = parseInt(data.max)) > 0) {
                if ((data.count = parseInt(data.count||0)) >= data.max) {
                    return true;
                }
            }
            if (expr_name.test(reward) && (attack>=parseInt(data.att)||defense>=parseInt(data.def))) {
                attackTo(getUrlFromElement($html.find(queries.att)), data);
                return (message=false);
            }
            return (data.max < 1);
        });
        if (message !== false) {
            callback( message, false );
        }
    }
    /**
     * Parse a war reward help.
     * @param {Object} htmlText
     */
    function warRewardResult(htmlText, callback) {
        var $h = h$(htmlText);
        var popup = Util.parsePopup(htmlText);
        var message = String($('.pop_box > div > div > div:eq(1)',popup).text()||$h.find('.message_body:first').text());
        callback(message, (!Util.doRgxTest(this.fail, message) && message.length > 0));
    }
    /**
     * Collect a Daily Take.
     * @param {String} htmlText
     * @param {Function} callback
     */
    function collectDailyTake(htmlText, callback) {
        var temp = Util.parsePopup(htmlText);
        var rewards = new CSDailyTakeLootCollection();
        /**
         * Return an expression to match loot names.
         * @return {String}
         */
        function createPriorityName() {
            var text = Util.trim(String(options.dtLootPriority));
            if (!Util.isString(text) || text.length < 1) {
                return;
            } 
            else if (/\n/.test(text)) {
                text = text.split(/\n/).join('|');
            }
            return text;
        }
        /**
         * Parse collect popup and return the text. 
         * @param {CSDailyTakeLoot} loot
         */
        function collectAndReturn(loot) {
            httpAjaxRequest({
                'url': loot.url, 
                'success': function(htmlText) {
                    var response = h$(htmlText).find('#collectText');
                    if (response.length > 0) {
                        callback( response.text(), true );
                    } else {
                        callback( 'Seem that an user has received the reward before you.');
                    }
                }
            });
        }
        $('#dt_body_area .collectbox .dt_pop_item',temp).each(function(i, elem) {
            rewards.add(new CSDailyTakeLoot(elem));
        });
        if (rewards.length() < 1) {
            if ((temp = h$(htmlText).find('.message_body')).length > 0) {
               callback(temp.text());
            } else {
               callback('This "Daily Take" was taken.'); 
            }
            return;
        }
        if ( (temp = createPriorityName()) ) {
            if ( (temp = rewards.getByName(temp)) ) {
                collectAndReturn( temp );
                return;  
            }
        }
        if (options.dtCheckMinAtkDef) {
            if ( (temp = rewards.getByStats(options.dtMinAttack, options.dtMinDefense)) ) {
                collectAndReturn( temp );
                return;  
            }
        }
        callback( 'Filtered. ('+ rewards.names() +')' );
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
     * Add a new success action.
     * @param {CSStream} stream
     * @param {String} responseText
     */
    function addHelpLog(stream, responseText) {
        var $log = $('#logList');
        var title = stream.action.name;
        var feed = stream.feed;

        if ($log.children().length > options.get('maxLogLength')) {
            $log.children().last().remove();
        }
        var $li = c$('li'), $wrapper, $buttons;
        var atch = feed.attachment;
        var $title = c$('a','target:_black').attr('href',feed.permalink).text(atch.name||atch.description);
        var $img = atch.media[0]
        ? c$('img','class:feed_icon,title:'+title).attr('src',atch.media[0].src)
        : c$('span');
        
        $wrapper = c$('div').addClass('li_wrapper clearfix').appendTo($li).append($img);
        $buttons = c$('div','class:buttons').appendTo($wrapper)
        .append(c$('a','href:#,class:ignore,postid:'+feed.post_id).text('like it').click(Events.likeFeed_click))
        .append(c$('div').css('clear','both'));
        c$('div','class:body').append(c$('h4').append($title)).append(c$('p').html(responseText)).appendTo($wrapper);
        
        $li.prependTo($log);
        $wrapper.mouseenter(Events.selectHelp).mouseleave(Events.unselectHelp);
        addCommentFeed($buttons, feed.post_id, responseText);
    }
    /**
     * Add a new skip/fail action.
     * @param {CSStream} stream
     * @param {String} message
     */
    function addSkippedLog(stream, message) {
        var timestamp = Util.setColor('['+(new Date()).toLocaleTimeString()+ '] ', 'grey');
        var $log = $('#logSkippedList');
        var streamName = Util.setAnchor(stream.feed.permalink, stream.action.name);
         
        if ($log.children().length > options.get('maxLogLength')) {
            $log.children().last().remove();
        }
        Resources.getPicture('info_icon','li').prependTo($log)
        .append(c$('p').html(timestamp+' '+streamName+': '+message));
    }
    /**
     * Send a message when auto collecting
     * @param {String} text
     */
    function sendMessage(text) {
        Resources.getPicture('ajax_loader', 'span').css('padding-left', 18)
        .appendTo($('#auto_feed_helper_messages').empty()).html(text);
    }

    function StartCollector() {
        var nDelay         = options.get('helpDelay');
        var nRefreshDelay  = getRefreshDelay();
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
	            if (cStream.action.skip === true) {
                    skipHelp();
	                return;
	            }
                // collect the stream
                sendMessage('Helping in:  '+cStream.action.name);

                doHelp(cStream.url, cStream.action, function(response, success) {
                    response = cleanResponse(response);
                    cStream.collected();
                    cStream.action.skip = Util.doRgxTest(cStream.action.skipif, response);
                    if (cStream.action.skip || success !== true) {
                        addSkippedLog(cStream, response); 
                    } else {
                        addHelpLog(cStream, response);
                    }
                    nCompleted++;
                    toNextStream('Done!, Next in %N%...',nDelay);
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
                if (fs && fs.error) {
                    retry(fs.error.message+' try again in %N%...');
                    return;
                }
                if (!Util.isArray(fs) || fs.length < 1) {
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
        .append(c$('span').css('color','green').text('Success: '))
        .append(c$('span','completed_helps').text(0))
        .append(c$('span').css({'color':'green','margin-left':5}).text('Skip: '))
        .append(c$('span','skipped_helps').text(0))

        c$('div','auto_feed_helper_messages').appendTo('#status_panel').html('Preparing...').css({
            'padding':'5px 0 0 30px',
            'float': 'left'
        });
        b$('CANCEL', 'class:short red').click(Events.cancel_click).appendTo('#status_panel').css({
            'float': 'right',
            'margin-right': 40
        });

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
        var $control = c$('div', 'control_panel').height(35)
        var $config = c$('div', 'config_panel');
        var $group = c$('select', 'id:hfopt_grouping, class:black_box').width(152);
        var $cfgselect = c$('div', 'id:main_selector,class:select_tab').css({
            width: 250,
            height: 200
        });
        // fix content height
        popupElt.content.css('margin-top', 5);

        // header popup
        c$('dl', 'class:total_requests')
        .appendTo(c$('div', 'feed_center_header').appendTo(popupElt.header))
        .append('<dt id="total_feeds">'+feedStream.length()+'</dt>')
        .append('<dd>Total Posts</dd>');
        
        c$('div','id:minipopup_overlay').appendTo(popupElt.content);
        c$('div','id:minipopup_content').appendTo(popupElt.content)
        .append(c$('center').text('ADDING WAR LOOT'))
        .append(c$('input:hidden', 'id:warloot_id'))
        .append(c$('input:hidden', 'id:warloot_count'))
        .append(c$('div').css({'clear':'both','margin-top':8}))
        .append(t$('warloot_name', 'Name:', 350))
        .append(c$('div').css({'clear':'both','margin-top':8}))
        .append(n$('warloot_att', 'Attack above:', 50))
        .append(n$('warloot_def', 'Defense above:', 50))
        .append(c$('div').css({'clear':'both','margin-top':8}))
        .append(n$('warloot_max', 'Limit to collect:'))
        .append(c$('div', 'class:save_button').append(x$('warloot_enabled', 'Enabled'))
        .append(b$('Save', 'class:short green').click(Events.saveWarloot)));
        
        // middle, config, buttons
        c$('div', 'panel_container').appendTo(popupElt.content)
        .append(c$('div', 'status_panel').height(35)).append($control).append($config);

        c$('div', 'class:search_box').appendTo($control)
        .append(c$('label', 'for:hfopt_filter').text('Search: '))
        .append(c$('input:text', 'id:hfopt_filter, class:black_box').width(149).keyup(Events.keyup))
        .append($group.change(Events.change));

        c$('div', 'class:control_box').appendTo($control)
        .append(b$('Clear all', 'class:short white').click(Events.clearall))
        .append(b$('Refresh','class:short orange').css('margin-left',5).click(Events.refresh_click))
        .append(b$('Config','class:short orange').css('margin-left',5).click(Events.config_click))
        .append(b$('AutoHelp','class:short orange').css('margin-left',10).click(StartCollector));
        
        // add options checkboxes and group list
        $cfgselect.appendTo($config);
        
        Util.each(groupNames, function(id, name) {
            var $elm = c$('div', 'name:'+id).appendTo($cfgselect).click(Events.config_change);
            // add the group to the filter            
            $group.append(c$('option', 'value:'+id).text(name));
            // add the group to configuration
            if (id !== 'none') {
                $elm.append(x$('hfopt_'+id.toLowerCase()).css('margin',0));
            }
            c$('p').text(name).appendTo($elm);
        });
        $config        
        .append( c$('div', 'class:config_tab,id:none_config')                  .append(genGeneralConfig())                             )
        .append( c$('div', 'class:config_tab,id:doGotoWar_config')             .append(genWarFilter())                                 )
        .append( c$('div', 'class:config_tab,id:doGiveSocialHelp_config')      .append(genMultiCheckboxConfig('GiveSocialHelp'))       )
        .append( c$('div', 'class:config_tab,id:doSocialMissions_config')      .append(genMissionConfig())                             )
        .append( c$('div', 'class:config_tab,id:doClaimBonusAndReward_config') .append(genMultiCheckboxConfig('ClaimBonusAndReward'))  )
        .append( c$('div', 'class:config_tab,id:doPropertyHelp_config')        .append(genMultiCheckboxConfig('PropertyHelp'))         )
        .append( c$('div', 'class:config_tab,id:doAcceptGiftEvent_config')     .append(genEmptyConfig())                               )
        .append( c$('div', 'class:config_tab,id:doCityCrew_config')            .append(genEmptyConfig())                               )
        .append( c$('div', 'class:config_tab,id:doDailyTake_config')           .append(genDailyTakeFilter())                           )
        .append( c$('div', 'class:config_tab,id:doSendEnergyAndPhones_config') .append(genEmptyConfig())                               )
        .append( c$('div', 'class:save_config').append(b$('Save Configuration','class:short orange').click(Events.save_click))         );

        // ADD BODY ELEMENTS
        c$('div').appendTo(popupElt.content).css({'width':'100%','height':35});
        c$('div', 'feedlist_body').height(700).appendTo(popupElt.content);
        c$('div', 'ajaxloader_body').css('padding-top',25).height(675)
        .append(c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif'))
        .appendTo(popupElt.content);
        c$('div', 'automode_body').height(700)
        .append(c$('ul', 'id:logList,class:feed_box').height(400)).css('border-bottom','2px solid #333;')
        .append(c$('ul', 'id:logSkippedList,class:skipped_log').height(300))
        .appendTo(popupElt.content);
        
        // =====================

        function genEmptyConfig() {
            return c$('center').css('margin-top', 10)
            .html('This category don\'t have any configuration.');
        }
        function genMultiCheckboxConfig(id) {
            var $elm = c$('div');
            var grp = String(id).toLowerCase();
            var opts = options.get(id);
            var $tlb = c$('div', 'class:select_tab,name:checkboxlist,id:hfopt_'+grp);
            
            $tlb.height(150).width(400).appendTo($elm);
            t$('action_skipif', 'Skip Check:', 335, {
                'change'   : Events.action_issue_change,
                'focusout' : Events.action_issue_change
            }).appendTo($elm).css({'float':'right','margin':'5px 0px 0px 0px'});
            t$('action_fail', 'Fail Check:', 335, {
                'change'   : Events.action_issue_change,
                'focusout' : Events.action_issue_change
            }).appendTo($elm).css({'float':'right','margin':'5px 0px 0px 0px'});
            
            Actions.each(function(name, action) {
                var skipif = options.actions.skipif[name];
                var fail = options.actions.fail[name];
                if ( action.group !== 'do'+id ) { return; }
                if ( !Util.isSet(opts[name]) )  { opts[name] = true; }
                if ( Util.isString(skipif)&& skipif.length>0 ) { action.skipif = skipif; }
                if ( Util.isString(fail)  && fail.length > 0 ) { action.fail = fail; }
                c$('div', 'name:'+name).appendTo($tlb).click(Events.subconfig_change)
                .append(x$(name).attr('value',name).css('margin',0))
                .append(c$('p').text(action.name));
            });
            return $elm;
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
                .css({'float':'left', 'width':340, 'height':120, 'margin-right':5}))
            .append(c$('div').css('float','left')
            .append(b$('Edit','class:green short').css('min-width',60).click(Events.addUserToFilter_click))
            .append(c$('div').css('clear','both').css('margin-top',5))
            .append(b$('Clear','class:red short').css('min-width',60).click(Events.clearUserFilter_click)));
        }
        function genWarFilter() {
            var $div = c$('div').append(c$('div').text('War Loot:'))
            c$('select', 'id:warloot_data,multiple:multiple').appendTo($div).css({
                'width':420, 
                'height':160
            });
            c$('div').css({'clear':'both','margin-top':5}).appendTo($div);
            c$('div','class:warloot_buttons').appendTo($div)
            .append(b$('REMOVE', 'class:short red').click(Events.removeWarloot))
            .append(b$('EDIT', 'class:short orange').click(Events.editWarloot))
            .append(b$('ADD', 'class:short green').click(Events.addWarloot))
            .append(b$('RESET', 'class:short green').click(Events.resetWarloot));
            
            return $div;
        }
        function genDailyTakeFilter() {
            return c$('div')
            .append(c$('div').text('1st CHECK -> Loot Priority/Filter'))
            .append(c$('textarea', 'class:black_box,cols:50,rows:8,id:hfopt_dtlootpriority'))
            .append(c$('div').css('clear','both').css('margin-top',5))
            .append(x$('hfopt_dtcheckminatkdef', '2nd Check -> Minimal Attack/Defense', 'div'))
            .append(n$('hfopt_dtminattack', 'Minimal Attack:', 60))
            .append(n$('hfopt_dtmindefense', '-OR- Minimal Defense:', 60));
        }
        function genMissionConfig() {
            var $elm = c$('div');
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
            .appendTo($elm);

            c$('div').css('margin',5)
            .append(c$('label', 'for:hfopt_joinmission').text('Join only in: '))
            .append(c$('select', 'id:hfopt_joinmission, class:black_box').width(90))
            .append(c$('label', 'for:hfopt_joinmissionafter').text(' if not possible then: '))
            .append(c$('select', 'id:hfopt_joinmissionafter, class:black_box').width(90))
            .appendTo($elm);

            c$('div').css('margin',5)
            .append(c$('label', 'for:hfopt_maxfreeslots').text('And only if remain: '))
            .append(c$('select', 'id:hfopt_maxfreeslots, class:black_box').width(110))
            .appendTo($elm);

            c$('div').css('margin',5)
            .append(x$('hfopt_opusenamefilter', 'Active Operation Name Filter:'))
            .append(c$('br'))
            .append(c$('textarea', 'class:black_box,cols:45,rows:6,id:hfopt_opnamefilter'))
            .appendTo($elm);

            return $elm;
        }

        $('input:text, select', popupElt.content).addClass('black_box');

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
        var $li, $ul = c$('ul', 'class:feed_box').height(700);
        // ADD FEEDS
        feedStream.each(function(index, obj) {
            var feed  = obj.feed;
            var atch  = feed.attachment;
            var name  = '<a href="'+feed.permalink+'" target="_black">';
            var desp  = atch.description ? atch.description : atch.caption;
            
            name += (atch.name||atch.caption||atch.description) + '</a>';
            
            $li = c$('li', 'gid:'+(obj.gid||'none')+',feed:'+index).appendTo($ul);
            if (obj.isNew) {
                $li.addClass('new_post');
            }
            $li = c$('div', 'class:li_wrapper clearfix').appendTo($li);
            if (atch.media && atch.media[0] && atch.media[0].src) {
                c$('img', 'class:feed_icon').attr('src', atch.media[0].src).appendTo($li);
            }
            c$('div','class:buttons state_accept').appendTo($li)
            .append(b$('Help', 'class:medium white,feed:'+index).click(Events.helpFeed_click))
            .append(c$('a', 'href:#,class:ignore,feed:'+index).text('ignore').click(Events.deleteFeed_click));
            c$('div','class:buttons state_completed').appendTo($li).css('display','none')
            .append(b$('Clear', 'class:medium white,feed:'+index).click(Events.deleteFeed_click))
            .append(c$('div').css('clear','both'))
            .append(c$('a','href:#,class:ignore,postid:'+feed.post_id).text('like it').click(Events.likeFeed_click))
            .append(c$('div').css('clear','both'));
            
            c$('div','class:body').append('<h4>'+name+'</h4><p>'+desp+'</p>').appendTo($li);
        });
        $('#feedlist_body').empty().append($ul);
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
            Actions = new CSActionCollection();
	        // add all pre-configured actions
	        addDefaultActions();
            feedStream = new CSStreamCollection(fs);
            Logger.debug('HFC: '+ feedStream.length());

            genMainDom();
            options.toDomElements();
            genFeedsDom();
            updateWarLoot();

            showDiv('feedlist', 'body');
            showDiv('control', 'panel');
            showDiv('none', 'config');

            // show popup
            popupElt.show();

        }, options.feedsLimit);
    }

    popupElt.addBase64Style(
        'I2ZlZWRfY2VudGVyX2hlYWRlciB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWhlaWdodDogNjRweDsNCgltYXJnaW4tcmlnaHQ6IDUwcHg7'+
        'DQoJbWFyZ2luLXRvcDogNnB4Ow0KfQ0KI2ZlZWRfY2VudGVyX2hlYWRlciBkbC50b3RhbF9yZXF1ZXN0cyB7DQoJZmxvYXQ6IGxl'+
        'ZnQ7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbWFyZ2luOiAxNHB4IDBweCAwcHg7DQp9DQojZmVlZF9jZW50ZXJfaGVhZGVyIGRs'+
        'LnRvdGFsX3JlcXVlc3RzIGR0IHsNCgliYWNrZ3JvdW5kOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dy'+
        'YXBoaWNzL3ptYy90b3RhbF9yZXF1ZXN0c19idWJibGVfMzh4MzhfMDEucG5nKSBuby1yZXBlYXQgMHB4IDBweDsNCglmbG9hdDog'+
        'bGVmdDsNCglmb250LXNpemU6IDE4cHg7DQoJaGVpZ2h0OiAzOHB4Ow0KCWxpbmUtaGVpZ2h0OiAzOHB4Ow0KCW1hcmdpbi1yaWdo'+
        'dDogNnB4Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgl3aWR0aDogMzhweDsNCn0NCiNmZWVkX2NlbnRlcl9oZWFkZXIgZGwudG90'+
        'YWxfcmVxdWVzdHMgZGQgew0KCWJhY2tncm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuenluZ2EuY29tL213ZmIvZ3JhcGhp'+
        'Y3Mvem1jL3RvdGFsX3JlcXVlc3RzX2JnXzIwMHgyNF8wMS5wbmcpIG5vLXJlcGVhdCAxMDAlIDUwJTsNCglmb250LXNpemU6IDEy'+
        'cHg7DQoJaGVpZ2h0OiAzOHB4Ow0KCWxpbmUtaGVpZ2h0OiAzOHB4Ow0KCW1hcmdpbi1sZWZ0OiA1cHg7DQoJcGFkZGluZzogMHB4'+
        'IDIwcHggMHB4IDM5cHg7DQoJd2hpdGUtc3BhY2U6IG5vd3JhcDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAuYmxhY2tfYm94'+
        'IHsNCglmb250LXdlaWdodDogYm9sZDsgDQoJY29sb3I6IHJnYigyMDgsIDIwOCwgMjA4KTsgDQoJYm9yZGVyOiAxcHggc29saWQg'+
        'cmdiKDE1MywgMTUzLCAxNTMpOyANCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgDQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI2hv'+
        'bWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRfYm94IHsNCiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7DQogICAgb3ZlcmZsb3c6'+
        'IGF1dG87DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuc2tpcHBlZF9sb2cgew0KICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9u'+
        'ZTsNCiAgICBvdmVyZmxvdzogYXV0bzsNCiAgICBwYWRkaW5nOiAzcHg7DQogICAgZm9udC1zaXplOiAxMnB4Ow0KICAgIGJvcmRl'+
        'ci1ib3R0b206IDFweCBzb2xpZCAjNDQ0Ow0KICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDQ0Ow0KfQ0KI2hvbWVmZWVkY2Vu'+
        'dGVyX3BvcHVwIHVsLnNraXBwZWRfbG9nIGxpIHsNCiAgICBib3JkZXI6IDJweCBzb2xpZCAjMUYxRjFGOw0KICAgIG1hcmdpbjog'+
        'MHB4IDBweCA0cHg7DQogICAgcGFkZGluZzogMHB4IDBweCAwcHggMTZweDsNCiAgICB3aWR0aDogYXV0byAhaW1wb3J0YW50Ow0K'+
        'ICAgIGJhY2tncm91bmQtc2l6ZTogMTZweCAhaW1wb3J0YW50Ow0KICAgIG1pbi1oZWlnaHQ6IDE2cHggIWltcG9ydGFudDsNCn0N'+
        'CiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5za2lwcGVkX2xvZyBsaSBpbWcgew0KCWZsb2F0OiBsZWZ0Ow0KCXdpZHRoOiAyMHB4'+
        'Ow0KCWhlaWdodDogMjBweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5za2lwcGVkX2xvZyBsaSBwIHsNCiAgICBtYXJn'+
        'aW46IDFweCAwcHggMHB4IDNweDsNCiAgICBoZWlnaHQ6IDIwcHg7DQoJbGluZS1oZWlnaHQ6IDIwcHg7DQogICAgb3ZlcmZsb3ct'+
        'eTogaGlkZGVuOw0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNmZWVkbGlzdF9ib2R5IHVsLmZlZWRfYm94IGxpOmZpcnN0LWNo'+
        'aWxkIHsNCglib3JkZXItd2lkdGg6IDBweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSB7DQoJbWFy'+
        'Z2luOiAwcHggMHB4IDZweDsNCgloZWlnaHQ6IDgwcHg7DQoJbWF4LWhlaWdodDogMTAwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJf'+
        'cG9wdXAgdWwuZmVlZF9ib3ggbGkubmV3X3Bvc3Qgew0KCWJhY2tncm91bmQ6IHVybChodHRwOi8vbXdmYi5zdGF0aWMuenluZ2Eu'+
        'Y29tL213ZmIvZ3JhcGhpY3Mvem1jL25ld19tZXNzYWdlX2NhbGxvdXRfNDV4NDVfMDEucG5nKSBuby1yZXBlYXQgMHB4IDBweDsN'+
        'Cn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBkaXYubGlfd3JhcHBlciB7DQogICAgcGFkZGluZzogNHB4IDE0'+
        'cHggMnB4IDRweDsNCiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzFGMUYxRjsNCiAgICBib3JkZXItdG9wOiAycHggc29s'+
        'aWQgIzFGMUYxRjsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAjYXV0b21vZGVfYm9keSB1bCNsb2dMaXN0IGRpdi5zZWxlY3Rl'+
        'ZCB7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIGJhY2tncm91bmQtY29sb3I6ICMxMjEyMTI7DQogICAgYm9yZGVyLXRv'+
        'cDogMnB4IHNvbGlkICM0NDQ7DQogICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0NDQ7DQp9DQojaG9tZWZlZWRjZW50ZXJf'+
        'cG9wdXAgdWwuZmVlZF9ib3ggbGkgaW1nLmZlZWRfaWNvbiB7DQoJZmxvYXQ6IGxlZnQ7DQoJZGlzcGxheTogYmxvY2s7DQoJd2lk'+
        'dGg6IDcwcHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgdWwuZmVlZF9ib3ggbGkubmV3X3Bvc3QgaW1nLmZlZWRfaWNvbiB7'+
        'DQoJbWFyZ2luOiAxNXB4IDAgMCAxNXB4Ow0KCXdpZHRoOiA1NXB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRf'+
        'Ym94IGxpIGRpdi5idXR0b25zIHsNCglmbG9hdDogcmlnaHQ7DQoJZm9udC1zaXplOiAxMHB4Ow0KCWZvbnQtd2VpZ2h0OiBib2xk'+
        'Ow0KCW1hcmdpbjogM3B4IDBweCAwcHggMTRweDsNCgl0ZXh0LWFsaWduOiByaWdodDsNCgl3aWR0aDogNzBweDsNCn0NCiNob21l'+
        'ZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBkaXYuYm9keSB7DQoJbWFyZ2luOiAwcHggODBweDsNCgloZWlnaHQ6IDcw'+
        'cHg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI2F1dG9tb2RlX2JvZHkgdWwuZmVlZF9ib3ggbGkgZGl2LmJvZHkgew0KCW1h'+
        'cmdpbi1sZWZ0OiA4MHB4Ow0KCWhlaWdodDogNzBweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBo'+
        'NCB7DQoJZm9udC1zaXplOiAxNHB4Ow0KCWxpbmUtaGVpZ2h0OiAxOHB4Ow0KCW1hcmdpbi1ib3R0b206IDRweDsNCglwYWRkaW5n'+
        'LXRvcDogMnB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLmZlZWRfYm94IGxpIHAgew0KCWZvbnQtc2l6ZTogMTJweDsN'+
        'CglsaW5lLWhlaWdodDogMTVweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBkaXYuYnV0dG9ucyBh'+
        'LnNleHlfYnV0dG9uX25ldyB7DQogICAgbWluLXdpZHRoOiA2MnB4Ow0KCW1hcmdpbi1ib3R0b206IDZweDsNCn0NCiNob21lZmVl'+
        'ZGNlbnRlcl9wb3B1cCB1bC5mZWVkX2JveCBsaSBkaXYuYnV0dG9ucyBhLmlnbm9yZSB7DQoJdGV4dC10cmFuc2Zvcm06IHVwcGVy'+
        'Y2FzZTsNCn0NCiNmZWVkX2NlbnRlcl9oZWFkZXIgcCwgI2hvbWVmZWVkY2VudGVyX3BvcHVwIHVsLCAjaG9tZWZlZWRjZW50ZXJf'+
        'cG9wdXAgbGksICNob21lZmVlZGNlbnRlcl9wb3B1cCBkbCwgI2hvbWVmZWVkY2VudGVyX3BvcHVwIGR0LCAjaG9tZWZlZWRjZW50'+
        'ZXJfcG9wdXAgZGQsICNob21lZmVlZGNlbnRlcl9wb3B1cCBoMiwgI2hvbWVmZWVkY2VudGVyX3BvcHVwIGgzLCAjaG9tZWZlZWRj'+
        'ZW50ZXJfcG9wdXAgaDQsICNob21lZmVlZGNlbnRlcl9wb3B1cCBwIHsNCgltYXJnaW46IDBweDsNCglwYWRkaW5nOiAwcHg7DQp9'+
        'DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgLnNlbGVjdF90YWIgew0KCWJvcmRlcjogMXB4IHNvbGlkICM0RjRGNEY7DQoJZmxvYXQ6'+
        'IGxlZnQ7DQoJbWluLWhlaWdodDogMTQwcHg7DQoJbWFyZ2luOiAycHg7DQoJb3ZlcmZsb3c6IGF1dG87DQoJcGFkZGluZzogNXB4'+
        'Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJd2lkdGg6IDI0MHB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIC5zZWxlY3RfdGFi'+
        'IGRpdiB7DQoJYm9yZGVyOiAxcHggc29saWQgIzJGMkYyRjsNCglvdmVyZmxvdzogaGlkZGVuOw0KCXBhZGRpbmc6IDBweCAycHgg'+
        'MnB4IDVweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAuc2VsZWN0X3RhYiBkaXYuc2VsZWN0ZWQgew0KCWJvcmRlcjogMXB4'+
        'IHNvbGlkIHllbGxvdzsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAuc2VsZWN0X3RhYiBkaXYgaW5wdXQgew0KCWZsb2F0OiBs'+
        'ZWZ0Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIC5zZWxlY3RfdGFiIGRpdiBwIHsNCglmbG9hdDogbGVmdDsNCgljdXJzb3I6'+
        'IHBvaW50ZXI7DQoJd2lkdGg6IDg2JTsNCglvdmVyZmxvdzogaGlkZGVuOw0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIC5jb25m'+
        'aWdfdGFiIHsNCglmbG9hdDogbGVmdDsNCglwYWRkaW5nOiAwcHggMTBweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCXdpZHRoOiA0'+
        'MjBweDsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAuc2F2ZV9jb25maWcgew0KCWNsZWFyOiBib3RoOw0KCXBhZGRpbmctdG9w'+
        'OiAxNnB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNmZWVkbGlzdF9ib2R5LCANCiNob21lZmVlZGNlbnRlcl9wb3B1cCAj'+
        'YXV0b21vZGVfYm9keSAgew0KCXRleHQtYWxpZ246IGxlZnQ7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI3BhbmVsX2NvbnRh'+
        'aW5lciB7DQoJYmFja2dyb3VuZDogIzExMSB1cmwoaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL3pt'+
        'Yy90YWJzX2JnXzF4NDVfMDEuZ2lmKSByZXBlYXQteCAwcHggMTAwJTsNCiAgICB3aWR0aDogMTAwJTsNCiAgICBwb3NpdGlvbjog'+
        'YWJzb2x1dGU7DQogICAgei1pbmRleDogMTA7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI3BhbmVsX2NvbnRhaW5lciAuc2Vh'+
        'cmNoX2JveCB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luOiAwcHggNXB4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJd2lkdGg6IDM3'+
        'MHB4Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwICNwYW5lbF9jb250YWluZXIgLmNvbnRyb2xfYm94IHsNCglmbG9hdDogcmln'+
        'aHQ7DQoJbWFyZ2luOiAwcHggNXB4Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgl3aWR0aDogMzQwcHg7DQp9DQojaG9tZWZlZWRj'+
        'ZW50ZXJfcG9wdXAgI3N0YXR1c19wYW5lbCwgDQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI2NvbnRyb2xfcGFuZWwgIHsNCgloZWln'+
        'aHQ6IDM1cHg7DQogICAgd2lkdGg6IDEwMCU7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI2NvbmZpZ19wYW5lbCB7DQoJaGVp'+
        'Z2h0OiAyNTBweDsNCgltYXJnaW46IDVweDsNCiAgICB3aWR0aDogMTAwJTsNCn0NCiNob21lZmVlZGNlbnRlcl9wb3B1cCAjbWlu'+
        'aXBvcHVwX292ZXJsYXkgew0KICAgIGRpc3BsYXk6IG5vbmU7DQogICAgd2lkdGg6IDEwMCU7DQogICAgaGVpZ2h0OiA3NTBweDsN'+
        'CiAgICBwb3NpdGlvbjogYWJzb2x1dGU7DQogICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7DQogICAgb3BhY2l0eTogMC41Ow0K'+
        'ICAgIHotaW5kZXg6IDU7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI21pbmlwb3B1cF9jb250ZW50IHsNCiAgICBkaXNwbGF5'+
        'OiBub25lOw0KICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICBsZWZ0OiAxNTBweDsNCiAgICB0b3A6IDE1MHB4Ow0KICAgIHdp'+
        'ZHRoOiA0MjBweDsNCiAgICBiYWNrZ3JvdW5kOiAjMUExQTFBOw0KICAgIHRleHQtYWxpZ246IGxlZnQ7DQogICAgcGFkZGluZzog'+
        'NXB4Ow0KICAgIGJvcmRlcjogM3B4IHNvbGlkICNBOTlFOUU7DQogICAgLW1vei1ib3JkZXItcmFkaXVzOiA2cHg7DQogICAgYm9y'+
        'ZGVyLXJhZGl1czogNnB4Ow0KICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNnB4Ow0KICAgIHotaW5kZXg6IDE1Ow0KfQ0KI2hv'+
        'bWVmZWVkY2VudGVyX3BvcHVwICNtaW5pcG9wdXBfY29udGVudCBjZW50ZXIgew0KICAgIGhlaWdodDogMzBweDsNCiAgICBib3Jk'+
        'ZXItYm90dG9tOiAxcHggZG90dGVkICMzMzM7DQogICAgbWFyZ2luLWJvdHRvbTogMTVweDsNCiAgICBmb250LXNpemU6IDE4cHg7'+
        'DQogICAgZm9udC13ZWlnaHQ6IGJvbGQ7DQogICAgY29sb3I6ICM5ODk4OTg7DQp9DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI21p'+
        'bmlwb3B1cF9jb250ZW50IC5zYXZlX2J1dHRvbiB7DQogICAgY2xlYXI6IGJvdGg7DQogICAgbWFyZ2luLXRvcDogMTVweDsNCiAg'+
        'ICBib3JkZXItdG9wOiAxcHggZG90dGVkICMzMzM7DQogICAgcGFkZGluZy10b3A6IDVweDsNCiAgICBoZWlnaHQ6IDMwcHg7DQp9'+
        'DQojaG9tZWZlZWRjZW50ZXJfcG9wdXAgI21pbmlwb3B1cF9jb250ZW50IC5zYXZlX2J1dHRvbiBhIHsNCiAgICBtYXJnaW4tcmln'+
        'aHQ6IDEwcHg7DQogICAgZmxvYXQ6IHJpZ2h0Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIC53YXJsb290X2J1dHRvbnMgew0K'+
        'ICAgIHRleHQtYWxpZ246IHJpZ2h0Ow0KfQ0KI2hvbWVmZWVkY2VudGVyX3BvcHVwIC53YXJsb290X2J1dHRvbnMgYSB7DQogICAg'+
        'bWFyZ2luLWxlZnQ6IDVweDsNCn0NCg=='
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
 * @param {Boolean} forceFreshInventory
 */
function InventoryAnalizer(forceFreshInventory) {
    var Snapshots = new Config('LootQuantities',{});
    var Increments = new Object();
    var Groups = ['Weapons', 'Armor', 'Vehicles', 'Animals', 'Henchmen'];
    var Indexes = {'1':0, '2':1, '3':2, '8': 3, '13': 4};
    var Wishlist, Templates = {
        list: global.Base64.decode(
            'PGxpIGlkeD0iJHtpbmRleH0iPg0KICAgIDxkaXYgY2xhc3M9InF1YWxpdHkiPg0KICAgICAgICA8aW1nIHRpdGxlPSIke2FjdGl2'+
            'ZV90aXRsZX0iIHN0eWxlPSJtYXJnaW4tdG9wOiAxcHg7IiBzcmM9IiR7YWN0aXZlX3VybH0iPg0KICAgIDwvZGl2Pg0KICAgIDxk'+
            'aXYgY2xhc3M9InF1YWxpdHkiPiR7cXVhbGl0eV9pY29ufTwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9InNwYWNlIj48L2Rpdj4NCiAg'+
            'ICA8ZGl2IGNsYXNzPSJpdGVtX25hbWUiPiR7aXRlbV9uYW1lfTwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9InNwYWNlIj48L2Rpdj4N'+
            'CiAgICA8ZGl2IGNsYXNzPSJudW1iZXIgcXVhbnRpdHkiPiR7cXVhbnRpdHl9PC9kaXY+DQogICAgPGRpdiBjbGFzcz0ic3BhY2Ui'+
            'PjwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9Im51bWJlciI+JHt2MX08L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJudW1iZXIiPiR7djJ9'+
            'PC9kaXY+DQogICAgPGRpdiBjbGFzcz0ibnVtYmVyIj4ke3YzfTwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9InNwYWNlIj48L2Rpdj4N'+
            'CiAgICA8ZGl2IGNsYXNzPSJudW1iZXIiPiR7djR9PC9kaXY+DQogICAgPGRpdiBjbGFzcz0ibnVtYmVyIj4ke3Y1fTwvZGl2Pg0K'+
            'ICAgIDxkaXYgY2xhc3M9Im51bWJlciI+JHt2Nn08L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJzcGFjZSI+PC9kaXY+DQogICAgPGRp'+
            'diBjbGFzcz0idG90YWwiPiR7djd9PC9kaXY+DQogICAgPGRpdiBjbGFzcz0idG90YWwiPiR7djh9PC9kaXY+DQogICAgPGRpdiBj'+
            'bGFzcz0idG90YWwiPiR7djl9PC9kaXY+DQo8L2xpPg=='
        ),
        table: global.Base64.decode(
            'PGRpdiBjbGFzcz0iaGVhZGVyIj4NCiAgICA8ZGl2IGNsYXNzPSJxdWFsaXR5Ij4ke2FjdGl2ZX08L2Rpdj4NCiAgICA8ZGl2IGNs'+
            'YXNzPSJzcGFjZSI+PC9kaXY+DQogICAgPGRpdiBjbGFzcz0icXVhbGl0eSI+JHtxdWFsaXR5fTwvZGl2Pg0KICAgIDxkaXYgY2xh'+
            'c3M9InNwYWNlIj48L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJpdGVtX25hbWUiPiR7aXRlbV9uYW1lfTwvZGl2Pg0KICAgIDxkaXYg'+
            'Y2xhc3M9InNwYWNlIj48L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJudW1iZXIgcXVhbnRpdHkiIHRpdGxlPSIke3NxfSI+JHtscX08'+
            'L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJzcGFjZSI+PC9kaXY+DQogICAgPGRpdiBjbGFzcz0ibnVtYmVyIiB0aXRsZT0iJHtzMX0i'+
            'PiR7bDF9PC9kaXY+DQogICAgPGRpdiBjbGFzcz0ibnVtYmVyIiB0aXRsZT0iJHtzMn0iPiR7bDJ9PC9kaXY+DQogICAgPGRpdiBj'+
            'bGFzcz0ibnVtYmVyIiB0aXRsZT0iJHtzM30iPiR7bDN9PC9kaXY+DQogICAgPGRpdiBjbGFzcz0ic3BhY2UiPjwvZGl2Pg0KICAg'+
            'IDxkaXYgY2xhc3M9Im51bWJlciIgdGl0bGU9IiR7czR9Ij4ke2w0fTwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9Im51bWJlciIgdGl0'+
            'bGU9IiR7czV9Ij4ke2w1fTwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9Im51bWJlciIgdGl0bGU9IiR7czZ9Ij4ke2w2fTwvZGl2Pg0K'+
            'ICAgIDxkaXYgY2xhc3M9InNwYWNlIj48L2Rpdj4NCiAgICA8ZGl2IGNsYXNzPSJ0b3RhbCIgdGl0bGU9IiR7czd9Ij4ke2w3fTwv'+
            'ZGl2Pg0KICAgIDxkaXYgY2xhc3M9InRvdGFsIiB0aXRsZT0iJHtzOH0iPiR7bDh9PC9kaXY+DQogICAgPGRpdiBjbGFzcz0idG90'+
            'YWwiIHRpdGxlPSIke3M5fSI+JHtsOX08L2Rpdj4NCjwvZGl2Pg0KPHVsIGNsYXNzPSJpdGVtX2xpc3QiPiR7bGlzdH08L3VsPg=='
        )
    };
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
            return Inventory[type][subtype];
        }
    };

    var popupElt = new PopupObject('ianalyzer_popup', {
        type: 'main',
        title: Resources.getPicture('inventoryanalizer_title'),
        onclose: function() {
            delete Inventory;
        }
    });

    var Events = {
        refresh_click: function() {
            popupElt.close();
            InventoryAnalizer(true);
            return false;
        },
        takeSnapshot_click: function() {
            var snapshot;
            if (!Snapshots.base) { 
                Snapshots.add('base', (snapshot=new Object()));   
            } else {
                snapshot = Snapshots.base;
            } 
            Util.each(Inventory.all, function(id, loot) {
                snapshot[id] = loot.quantity;
            });
            Snapshots.save(function() {
                showHelpPopup({
                    icon: 'info',
                    title: 'Inventory Analyzer says:',
                    message: 'Snapshot taken successfully.'
                });
            });
            genListDom();
            return false;
        },
        filter_click: function() {
            genListDom();
            return false;
        },
        tab_click: function() {
            $('.cs_tabs', popupElt.content).removeClass('activeTab').addClass('inactiveTab');
            $(this).removeClass('inactiveTab').addClass('activeTab');
            genListDom();
            return false;
        },
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
        
        showAskPopup('Adding to Multi Gifter',
        'Do you want to add all unnecessary '+type+' to<br>MultiGifter Favorites ?',
        function() { setTimeout(addtoFav, 1000); });
        
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
                showAskPopup('Adding to Multi Gifter',
                'All '+type+' were added.<br>Do you like to open MultiGifter now ?',
                function() {
                    popupElt.close();
                    setTimeout(MultiGifter, 1000);
                });
            });
        }
    }

    function genHTMLTable() {
        var sOutput = '<html><head></head><body>';
        var $lst = $('.item_list', popupElt.content).clone();
        var $hdr = $('.header', popupElt.content).clone();

        $lst.find('.space').remove();
        $hdr.find('.space').remove();

        $lst.find('img').replaceWith(function() {
            var rgx;
            var title = $(this).attr('title');
            var url = $(this).attr('src');
            var span = '<span title="' + title + '">';

            if (/active-icon/.test(url)) {
                return span + 'A</span>';
            }
            if (/inactive-icon/.test(url)) {
                return span + 'N</span>';
            }
            if ((rgx = /Quality:\s*(\w)\w+/.exec(title))) {
                return span + rgx[1] + '</span>';
            }
            return '';
        });

        $lst = $lst.html();
        $hdr = $hdr.html();

        $lst = $lst.replace(/<li[^>]*>/g, '<tr>').replace(/<\/li>/g, '</tr>');
        $lst = $lst.replace(/<div[^>]*>/g, '<td>').replace(/<\/div>/g, '</td>');
        $hdr = $hdr.replace(/<div[^>]*>/g, '<th>').replace(/<\/div>/g, '</th>');
        
        sOutput += '<table cellspacing="0" cellpadding="4" border="1" style="text-align:center;"><tbody>';
        sOutput += '<tr>' + $hdr + '</tr>' + $lst;
        return sOutput + '</tbody></table></body></html>';
    }

    function setWishlist(jsonData) {
        try {
            var data = Util.parseJSON(jsonData.data);
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
        var $wl = $('#wishlist').empty();

        Util.each(Wishlist, function(index, item) {
            var $span = c$('div', 'class:attack_defense');
            $span.append(c$('span','class:attack').html(item.attack||0));
            $span.append(c$('span','class:defense').html(item.attack||0));
            
            c$('div', 'class:wl_item,title:'+item.name)
            .append(c$('img', 'class:remove,wid:'+index).attr('src', sRemImgSrc).click(Events.remWishlist_click))
            .append(c$('img').attr('src', item.image).width(50).height(50))
            .append($span).appendTo($wl);
        });
    }

    function genListDom() {
        var sName = $('#type_filter option:selected', popupElt.content).val();
        var sFilter = $('#show_filter option:selected', popupElt.content).val();
        var nLoc = parseInt($('#loc_filter option:selected', popupElt.content).val());
        var bMod = $('#snapshow_filter').hasClass('checked');
        var bNeed = /get/.test(sFilter);
        var html = {
            active     : 'A',
            quality    : 'Q',
            item_name  : 'Item Name',
            list       : '',
            sq: (bNeed ? 'Items needed' : 'Item quantity'),
            lq: 'QT',
            s1: (bNeed ? 'Attack gained if equipped' : 'Items equipped in attack'),
            s2: (bNeed ? 'Defense gained if equipped' : 'Items equipped in defense'),
            s3: (bNeed ? 'Combined gained if equipped' : 'Items equipped in tournaments'),
            s4: 'Attack',
            s5: 'Defense',
            s6: 'Combined',
            s7: (bNeed ? 'Attack gained if total equipped' : 'Total attack from this item'),
            s8: (bNeed ? 'Defense gained if total equipped' : 'Total defense from this item'),
            s9: (bNeed ? 'Combined gained if total equipped' : 'Total combined from this item'),
            l1: (bNeed ? '+A' : 'EA'),
            l2: (bNeed ? '+D' : 'ED'),
            l3: (bNeed ? '+C' : 'ET'),
            l4: 'AT',
            l5: 'DF',
            l6: 'CB',
            l7: (bNeed ? 'GA' : 'TA'),
            l8: (bNeed ? 'GD' : 'TD'),
            l9: (bNeed ? 'GC' : 'TC')
        };
        // List of items
        Util.each(Inventory[sName][sFilter], function(index, item) {
            var increment = Increments[item.id],
                quantity = Util.isSet(increment) ? ('<span style="color:'
                + (increment > 0 ? 'green' : 'red') + ';" title="You ' 
                + (increment > 0 ? 'won ' : 'lost ') + increment
                + ' from your last snapshot.">') : '<span>';
                
            if ((nLoc > 0 && nLoc !== item.location) || (bMod && !increment)) {
                return true;
            }
            if (bNeed) {
                quantity += item['need'+sFilter.substr(sFilter.lastIndexOf('_'))];
            } else {
                quantity += item.quantity;
            }
            html.list += Util.render(Templates.list, {
                index         : index,
                active_title  : (item.active?'Active item - Your Mafia is using this item in fights/robs.': 'Inactive item - Your Mafia is not using this item in fights/robs.'),
                active_url    : global.zGraphicsURL + 'inventory/ItemCard/icons/' + (item.active?'Inventory-active-icon.png':'Inventory-inactive-icon.png'),
                quality_icon  : (Inventory.Qualities[String(item.quality)] || {}).image,
                item_name     : item.name,
                quantity      : quantity + '</span>',
                v1: (bNeed ? item.gain_offense : item.equipped_offense),
                v2: (bNeed ? item.gain_defense : item.equipped_defense),
                v3: (bNeed ? item.gain_combined : item.equipped_combined),
                v4: item.attack,
                v5: item.defense,
                v6: item.combined,
                v7: (bNeed ? item.gained_offense : item.attack * item.quantity),
                v8: (bNeed ? item.gained_defense : item.defense * item.quantity),
                v9: (bNeed ? item.gained_combined : item.combined * item.quantity)
            });
        });
        if (html.list.length < 1) {
            html.list = '<div style="margin-top:25px;">No items match your criteria.</div>';
        }
        $('#info_table').html(Util.render(Templates.table,html)).find('li').click(Events.item_click);
    }

    function genSelectedItemDom(item) {
        var $iteminfo = $('#item_info', popupElt.content).empty();
        if (!Util.isSet(item)) {
            c$('div').text('Select an item to show extended info.').appendTo($iteminfo);
            return;
        }
        var $info = c$('div', 'class:info');
        var iLocation = Inventory.Locations[item.location];
        var sSearchUrl = 'http://mafiawars.wikia.com/index.php?title=Special:Search&search='
        +   ((Util.isString(item.name)&&item.name.length>0)?item.name.replace(/\s+?/g,'+'):'');
        var types = (function() {
            var tp = new Array();
            if (item.subtypes && item.subtypes.length) {
                Util.each(item.subtypes, function(i, index) {
                    var subtype = Inventory.Subtypes[String(index)];
                    if(Util.isSet(subtype)) {
                        tp.push(subtype.name);
                    }
                });
            }
            if (tp.length > 0) {
                return tp.join(', ');
            } else {
                return;
            }
        })();
        $iteminfo.append(c$('div','class:imagen').html(item.image)).append($info);

        if (types) {
            c$('div').css({'float':'left','margin-right':5})
            .html('Item type: '+ types + ' ').appendTo($info);
        }
        if (item.tradeable === 1) {
            c$('div').click(Events.toMGSend_click).css('cursor','pointer')
            .attr({'title':'Open with MultiGifter.','gift-link':item.gift_link})
            .append(c$('img').attr('src',global.zGraphicsURL+'inventory/ItemCard/icons/Inventory-gift-icon.png'))
            .appendTo(c$('div').css({'float':'right','margin-right':5}).appendTo($info));
        }
        if (item.favor_id > 0 && parseInt(item.rp_price) > 0) {
            c$('div').appendTo($info).css({'float':'left','color':'green'}).html('('+item.rp_price + ' RP)');
        }
        else if (item.pawn_shop > 0 && parseInt(item.lp_price) > 0) {
            c$('div').appendTo($info).css({'float':'left','color':'green'}).html('('+item.lp_price + ' LP)');
        }
        else if (item.purchasable && parseInt(item.cash_price) > 0) {
            c$('div').appendTo($info).css({'float':'left','color':'green'}).html('(buy: '+item.cash_price+')');
        }

        c$('div').css('clear', 'both').html('You can search it at ').appendTo($info)
        .append(c$('a', 'target:_black').attr('href', sSearchUrl).text('wikia'));

        if (item.tradeable === 1) {
            c$('div').html('This item can be added to ').appendTo($info)
            .append(c$('a', 'href:#,itemid:'+item.id).text('wishlist')
            .click(Events.addWishlist_click));
        }

        if (iLocation && iLocation.link && iLocation.name) {
            c$('div').html('You can get this item in ').appendTo($info)
            .append(c$('a', 'target:_black').attr('href', iLocation.link).text(iLocation.name));
        }
    }

    function genMainDom() {
        var $snap = b$('', 'class:short white button_icon');
        var $tbl = b$('', 'class:short white button_icon');
        var $snd = b$('', 'class:short white sexy_send_gift_new button_icon');
        var $rfh = b$('', 'class:short white sexy_send_gift_new button_icon');
        
        $snap.find('span:last').replaceWith(Resources.getPicture('snapshot_icon','div'));
        $snap.attr('title','Take a new snapshot of your current inventory loot amounts.');
        $tbl.find('span:last').replaceWith(Resources.getPicture('createtable_icon','div'));
        $tbl.attr('title','Generate a html table to open in a new tab.');
        $snd.attr('title','Send unused loot to the MultiGifter favourites.');
        $rfh.find('span:last').replaceWith(Resources.getPicture('refresh_icon','div'));
        $rfh.attr('title','Refresh your inventory (use it to get a fresh copy of your inventory).');
        
        c$('div', 'class:frame_box').height(80).appendTo(popupElt.content)
        .append(c$('div', 'item_info').text('Select an item to show extended info.'))
        .append(c$('div', 'wishlist'));
        c$('div', 'class:frame_box middle_bar')
        .append(c$('select', 'id:type_filter,class:black').width(120).change(Events.filter_click))
        .append(c$('select', 'id:show_filter,class:black').width(160).change(Events.filter_click))
        .append(c$('select', 'id:loc_filter,class:black').width(160).change(Events.filter_click))
        .append(x$('snapshow_filter', 'Modified.').click(Events.filter_click).attr('title','Show only modified items from the last snapshot.'))
        .append($snd.click(Events.toMGFav_click)).append($tbl.click(Events.genTable_click))
        .append($snap.click(Events.takeSnapshot_click)).append($rfh.click(Events.refresh_click))
        .appendTo(popupElt.content);
        
        c$('div', 'info_table').appendTo(popupElt.content).css({
            'margin': '0px 2px 2px 2px',
            'padding': '0px 2px 2px 2px'
        });

        function buildStrengthBox(title, type) {
            var elem = c$('div', 'class:mafia_strength')
            .append(c$('div', 'class:total_title').append(c$('span').text(title)));

            Util.each(['Weapons', 'Armor', 'Vehicles', 'Animals', 'Henchmen', 'Total'], function(index, name) {
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
        c$('div', 'class:frame_box').css({'padding-left':38,'height':210})
        .append(buildStrengthBox('Attack Strength', 'offense'))
        .append(buildStrengthBox('Defense Strength', 'defense'))
        .append(buildStrengthBox('Combined Strength', 'combined'))
        .append(buildQualitiesBox()).appendTo(popupElt.content);
        
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
                'weak_offense'        : 'Weak offense',
                'weak_defense'        : 'Weak defense',
                'weak_combined'       : 'Weak combined',
                'get_offense'         : 'Need for offense',
                'get_defense'         : 'Need for defense',
                'get_combined'        : 'Need for tournament',
                'give_away'           : 'To given away.'
            },
            'loc_filter': (function locs() {
                var result = {0:'All Locations'};
                Util.each(Inventory.Locations, function(id, loc) {
                    result[id] = loc.name;
                });
                return result;
            })()
        });
    }

    function Initialize(Items) {
        var cQualities = Inventory.global['Qualities'];
        var snapshot = Snapshots.base;
        if (!snapshot)   { 
            Snapshots.add('base', (snapshot=new Object())); 
        }
        // get all items
        Util.each(Items, function(id, obj) {
            var gItems = Inventory[Groups[Indexes[obj.type]]];
            var bValid = (obj.attack + obj.defense) > 0;
            var bAvailable = (obj.unique !== 1);
            var baseQuantity = snapshot[id];
            if (Util.isSet(baseQuantity)) {
                if (obj.quantity != baseQuantity) {
                    Increments[id] = obj.quantity - baseQuantity;
                }
            } else {
                snapshot[id] = obj.quantity;
            }
            try {
                if (gItems) {
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
                    obj['is_equipped']       = (obj['equipped_offense']+obj['equipped_defense'] > 0);
                    obj['equipped_quantity'] = Math.max(obj['equipped_offense'], obj['equipped_defense']);

                    // add equiped items
                    if (obj['is_equipped']) {
                        gItems['top_combined'].push(obj);
                        cQualities[obj.quality] += obj['equipped_quantity'];
                        cQualities['Total']     += obj['equipped_quantity'];
                        if(obj['equipped_offense'] > 0) {
                            gItems['top_offense'].push(obj);
                        }
                        if (obj['equipped_defense'] > 0) {
                            gItems['top_defense'].push(obj);
                        }
                    } else if(!obj['is_equipped'] && bValid && obj.quantity > 0) {
                        gItems['top_combined'].push(obj);
                        if(obj['attack'] > obj['defense']) {
                            gItems['weak_offense'].push(obj);
                        }
                        else {
                            gItems['weak_defense'].push(obj);
                        }
                    }
                    
                    // add needed items
                    if(bValid && bAvailable) {
                        gItems['get_combined'].push(obj);
                        gItems['get_offense'].push(obj);
                        gItems['get_defense'].push(obj);
                    }
                }
            }
            catch(err) {
                Logger.error(err);
            }
        });
        Snapshots.save();
        
        // calculate all
        Util.each(Groups, function(index, groupTag) {
            var gItems = Inventory[groupTag];
            gItems['top_offense'].sort(sortBy.attack);
            gItems['top_defense'].sort(sortBy.defense);
            gItems['top_combined'].sort(sortBy.combined);
            gItems['weak_offense'].sort(sortBy.attack);
            gItems['weak_defense'].sort(sortBy.defense);

            // calculate combined
            var top_combined = [];
            var nMaxCombined = 501;

            Util.each(gItems['top_combined'], function(index, item) {
                if (nMaxCombined > 0) {
                    top_combined.push(item);
                    nMaxCombined -= item['quantity'];
                    item['equipped_combined'] = item['quantity'];
                    if (nMaxCombined < 0) {
                        item['equipped_combined'] += nMaxCombined;
                    }
                }
                else {
                    gItems['weak_combined'].push(item);
                }
            });
             gItems['weak_combined'].sort(sortBy.combined);
            (gItems['top_combined'] = top_combined).sort(sortBy.combined);

            // calculate need, gain, total, etc..
            var getList = {'get_offense':[], 'get_defense':[], 'get_combined':[]};

            Util.each(['offense', 'defense', 'combined'], function(index, tagName) {
                var sTag = 'get_' + tagName;

                Util.each(gItems[sTag], function(index, Item) {

                    var top = gItems['top_' + tagName];
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

            (gItems['get_offense']  = getList['get_offense'] ).sort(sortBy.attack);
            (gItems['get_defense']  = getList['get_defense'] ).sort(sortBy.defense);
            (gItems['get_combined'] = getList['get_combined']).sort(sortBy.combined);
            

            var cItemsAdded = {};
            var cnct = gItems['weak_offense'].slice();
            cnct = cnct.concat(gItems['weak_defense']);
            Util.each(cnct.concat(gItems['weak_combined']), function(index, Item) {
                if (cItemsAdded[String(Item.id)] === true) {
                    return true;
                }
                if (Item['equipped_offense'] < 1 &&
                    Item['equipped_defense'] < 1 &&
                    Item['equipped_combined'] < 1)
                {
                    gItems['give_away'].push(Item);
                    cItemsAdded[String(Item.id)] = true;
                }
            });

            gItems['give_away'].sort(sortBy.quantity);

            Util.each(['offense', 'defense', 'combined'], function(index, tagName) {
                var cGlobal = Inventory.global;
                var tags = {
                    top             : 'top_' + tagName,
                    equipped        : 'equipped_' + tagName,
                    groupStrength   : groupTag + '_' + tagName,
                    totalStrength   : 'Total_' + tagName
                 };

                Util.each(gItems[tags.top], function(index, Item) {
                    var nAmount = Item[tagName] * Item[tags.equipped];

                    cGlobal[tags.groupStrength] += nAmount;
                    cGlobal[tags.totalStrength] += nAmount;
                });
            });
        });


    }

    popupElt.addBase64Style(
        'I2lhbmFseXplcl9wb3B1cCAuYmxhY2sgew0KCXdpZHRoOiAyNDBweDsNCgltYXJnaW4tcmlnaHQ6IDVweDsNCglmb250LXdlaWdo'+
        'dDogYm9sZDsgDQoJY29sb3I6IHJnYigyMDgsIDIwOCwgMjA4KTsgDQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAx'+
        'NTMpOyANCgliYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgDQoJZm9udC1zaXplOiAxNHB4Ow0KfQ0KI2lhbmFseXplcl9wb3B1cCAu'+
        'ZnJhbWVfYm94IHsNCiAgICBib3JkZXI6IDFweCBzb2xpZCAjMkYyRjJGOw0KICAgIG1hcmdpbjogNHB4IDNweCA0cHggM3B4Ow0K'+
        'ICAgIG1pbi1oZWlnaHQ6IDI2cHg7DQogICAgcGFkZGluZzogNHB4Ow0KICAgIHRleHQtYWxpZ246IGxlZnQ7DQp9DQojaWFuYWx5'+
        'emVyX3BvcHVwIGRpdi5oZWFkZXIgew0KCWJvcmRlcjogMXB4IHNvbGlkICM3Nzc7DQoJaGVpZ2h0OiAyMHB4Ow0KCW92ZXJmbG93'+
        'OiBoaWRkZW47DQoJdGV4dC1hbGlnbjogY2VudGVyOw0KCXBhZGRpbmc6IDJweDsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgZGl2Lmhl'+
        'YWRlciBkaXYuaXRlbV9uYW1lIHsNCgl0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQojaWFuYWx5emVyX3BvcHVwIHVsLml0ZW1fbGlz'+
        'dCB7DQoJYm9yZGVyOiAxcHggc29saWQgIzk5OTsNCgloZWlnaHQ6IDM3NXB4Ow0KCWxpc3Qtc3R5bGUtdHlwZTogbm9uZTsNCglt'+
        'YXJnaW46IDBweDsNCglvdmVyZmxvdy14OiBoaWRkZW47DQoJb3ZlcmZsb3cteTogYXV0bzsNCglwYWRkaW5nOiAwcHg7DQp9DQoj'+
        'aWFuYWx5emVyX3BvcHVwIHVsLml0ZW1fbGlzdCBsaSB7DQoJYm9yZGVyOiAxcHggc29saWQgIzMzMzsNCgljdXJzb3I6IHBvaW50'+
        'ZXI7DQoJaGVpZ2h0OiAxOXB4Ow0KCW1hcmdpbjogMXB4Ow0KCW92ZXJmbG93OiBoaWRkZW47DQoJcGFkZGluZzogMXB4Ow0KfQ0K'+
        'I2lhbmFseXplcl9wb3B1cCB1bC5pdGVtX2xpc3QgbGkuc2VsZWN0ZWQgew0KCWJvcmRlcjogMXB4IHNvbGlkICNDQzA7DQp9DQoj'+
        'aWFuYWx5emVyX3BvcHVwIGRpdi5udW1iZXIgew0KCWZsb2F0OiBsZWZ0Ow0KCW1heC13aWR0aDogMzBweDsNCgltaW4td2lkdGg6'+
        'IDMwcHg7DQoJcGFkZGluZzogMXB4Ow0KCXdpZHRoOiBhdXRvOw0KfQ0KI2lhbmFseXplcl9wb3B1cCBkaXYubnVtYmVyLnF1YW50'+
        'aXR5IHsNCgltYXgtd2lkdGg6IDQwcHg7DQoJbWluLXdpZHRoOiA0MHB4Ow0KfQ0KI2lhbmFseXplcl9wb3B1cCBkaXYucXVhbGl0'+
        'eSB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWF4LXdpZHRoOiAxNnB4Ow0KCW1pbi13aWR0aDogMTZweDsNCglwYWRkaW5nOiAxcHg7DQoJ'+
        'd2lkdGg6IGF1dG87DQp9DQojaWFuYWx5emVyX3BvcHVwIGRpdi50b3RhbCB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWF4LXdpZHRoOiA1'+
        'MHB4Ow0KCW1pbi13aWR0aDogNTBweDsNCglwYWRkaW5nOiAxcHg7DQoJd2lkdGg6IGF1dG87DQp9DQojaWFuYWx5emVyX3BvcHVw'+
        'IGRpdi5zcGFjZSB7DQoJYmFja2dyb3VuZC1jb2xvcjogIzNGM0YzRjsNCglmbG9hdDogbGVmdDsNCgloZWlnaHQ6IDE5cHg7DQoJ'+
        'bWF4LXdpZHRoOiAxcHg7DQoJbWluLXdpZHRoOiAxcHg7DQoJd2lkdGg6IDFweDsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgZGl2Lml0'+
        'ZW1fbmFtZSB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWF4LXdpZHRoOiAyMjBweDsNCglwYWRkaW5nOiAxcHg7DQoJdGV4dC1hbGlnbjog'+
        'bGVmdDsNCgl3aWR0aDogMjIwcHg7DQoJcGFkZGluZzogMHB4IDVweDsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgLmZyYW1lX2JveCBk'+
        'aXYjaXRlbV9pbmZvIHsNCglmbG9hdDogbGVmdDsNCgl3aWR0aDogMzc4cHg7DQp9DQojaWFuYWx5emVyX3BvcHVwIC5mcmFtZV9i'+
        'b3ggZGl2LmltYWdlbiB7DQoJYm9yZGVyOiAxcHggc29saWQgIzVGNUY1RjsNCglmbG9hdDogbGVmdDsNCn0NCiNpYW5hbHl6ZXJf'+
        'cG9wdXAgLmZyYW1lX2JveCBkaXYuaW5mbyB7DQoJZmxvYXQ6IGxlZnQ7DQoJaGVpZ2h0OiA4MHB4Ow0KCW1hcmdpbi1sZWZ0OiA1'+
        'cHg7DQoJbWF4LWhlaWdodDogODBweDsNCgltYXgtd2lkdGg6IDI5MHB4Ow0KfQ0KI2lhbmFseXplcl9wb3B1cCAuZnJhbWVfYm94'+
        'IGRpdiN3aXNobGlzdCB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lkdGg6IDMwMHB4Ow0KfQkNCiNpYW5hbHl6ZXJfcG9wdXAgLmZyYW1l'+
        'X2JveCBkaXYud2xfaXRlbSB7DQoJYm9yZGVyOiAxcHggc29saWQgIzRGNEY0RjsNCglmbG9hdDogbGVmdDsNCgloZWlnaHQ6IDcy'+
        'cHg7DQoJbWFyZ2luOiAxcHg7DQoJcGFkZGluZzogM3B4Ow0KCXRleHQtYWxpZ246IGxlZnQ7DQoJd2lkdGg6IDkwcHg7DQp9DQoj'+
        'aWFuYWx5emVyX3BvcHVwIC5mcmFtZV9ib3ggZGl2LndsX2l0ZW0gaW1nLnJlbW92ZSB7DQoJZmxvYXQ6IHJpZ2h0Ow0KCWN1cnNv'+
        'cjogcG9pbnRlcjsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgLmZyYW1lX2JveCBkaXYud2xfaXRlbSAuYXR0YWNrX2RlZmVuc2Ugew0K'+
        'CW1hcmdpbjogMHB4Ow0KfQ0KI2lhbmFseXplcl9wb3B1cCAuZnJhbWVfYm94IGRpdi53bF9pdGVtIC5hdHRhY2tfZGVmZW5zZSAu'+
        'ZGVmZW5zZSB7DQoJbWFyZ2luLWxlZnQ6IDVweDsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgLm1hZmlhX3N0cmVuZ3RoIHsNCgliYWNr'+
        'Z3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9pbnZlbnRv'+
        'cnkvc3VtbWFyeS9NYWZpYS1zdHJlbmd0aC1ib3gyLnBuZykgbm8tcmVwZWF0Ow0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogMjEw'+
        'cHg7DQoJd2lkdGg6IDE2MHB4Ow0KCWZvbnQtc2l6ZTogMTJweDsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgLm1hZmlhX3N0cmVuZ3Ro'+
        'ID4gZGl2Omxhc3QtY2hpbGQgew0KCW1hcmdpbi10b3A6IDE1cHg7DQp9DQojaWFuYWx5emVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0'+
        'aC5xdWFsaXRpZXMgPiBkaXY6bGFzdC1jaGlsZCB7DQoJbWFyZ2luLXRvcDogMzVweDsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgLm1h'+
        'ZmlhX3N0cmVuZ3RoIC50b3RhbF90aXRsZSB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJbWFyZ2luLWJvdHRvbTogMjFweDsNCglt'+
        'YXJnaW4tbGVmdDogYXV0bzsNCgltYXJnaW4tcmlnaHQ6IGF1dG87DQoJcGFkZGluZy10b3A6IDEwcHg7DQoJcG9zaXRpb246IHJl'+
        'bGF0aXZlOw0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgl3aWR0aDogMTYwcHg7DQp9DQojaWFuYWx5emVyX3BvcHVwIC5tYWZpYV9z'+
        'dHJlbmd0aC5xdWFsaXRpZXMgLnRvdGFsX3RpdGxlIHsNCgltYXJnaW4tYm90dG9tOiAxM3B4Ow0KfQ0KI2lhbmFseXplcl9wb3B1'+
        'cCAubWFmaWFfc3RyZW5ndGggLnRvdGFsX3RpdGxlIHNwYW4gew0KCWNvbG9yOiAjRkZDRDAwOw0KCXRleHQtdHJhbnNmb3JtOiB1'+
        'cHBlcmNhc2U7DQp9DQojaWFuYWx5emVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0aCAubWFmaWFfc3RyZW5ndGhfc3BhY2luZyB7DQoJ'+
        'aGVpZ2h0OiAxOHB4Ow0KCW1hcmdpbi1sZWZ0OiAycHg7DQoJbWFyZ2luLXRvcDogN3B4Ow0KfQ0KI2lhbmFseXplcl9wb3B1cCAu'+
        'bWFmaWFfc3RyZW5ndGgucXVhbGl0aWVzIC5tYWZpYV9zdHJlbmd0aF9zcGFjaW5nIHsNCgltYXJnaW4tdG9wOiA0cHg7DQp9DQoj'+
        'aWFuYWx5emVyX3BvcHVwIC50ZXh0X3Bvc2l0aW9uaW5nIHsNCgljb2xvcjogIzk5OTsNCglmb250LXNpemU6IDExcHg7DQp9DQoj'+
        'aWFuYWx5emVyX3BvcHVwIC5tYWZpYV9zdHJlbmd0aCAubWFmaWFfc3RyZW5ndGhfc3BhY2luZyAuc3RhdF9uYW1lIHsNCglmbG9h'+
        'dDogbGVmdDsNCgltYXJnaW4tbGVmdDogMTBweDsNCgl3aWR0aDogODBweDsNCn0NCiNpYW5hbHl6ZXJfcG9wdXAgLnNleHlfYnV0'+
        'dG9uX25ldy5idXR0b25faWNvbiA+IHNwYW4gew0KICAgIHdpZHRoOiAyOHB4Ow0KfQ0KI2lhbmFseXplcl9wb3B1cCAuc2V4eV9i'+
        'dXR0b25fbmV3LmJ1dHRvbl9pY29uID4gc3BhbiA+IHNwYW4gew0KICAgIG1pbi1oZWlnaHQ6IDE2cHg7DQogICAgcGFkZGluZy1s'+
        'ZWZ0OiAwcHg7DQp9DQojaWFuYWx5emVyX3BvcHVwIC5zZXh5X2J1dHRvbl9uZXcuYnV0dG9uX2ljb24gPiBzcGFuID4gZGl2IHsN'+
        'CiAgICBoZWlnaHQ6IDI2cHg7DQp9DQojaWFuYWx5emVyX3BvcHVwIC5mcmFtZV9ib3gubWlkZGxlX2JhciBhIHsNCiAgICBmbG9h'+
        'dDogcmlnaHQ7DQogICAgbWFyZ2luLWxlZnQ6IDVweDsNCn0NCg=='
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
        Snapshots.load(function() {
            Initialize(Inventory.all = data.Items.data);
            genMainDom();
            genListDom();
            httpAjaxRequest({
                url:'remote/' + MW.getIntURL('wishlist', 'add') + '&isajax=1&retwl=1&gift_category=0&gift_id=0',
                success: setWishlist
            });
            popupElt.show();
        });
    }, forceFreshInventory);
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
        title: Resources.getPicture('mafiawiper_title'),
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
        function error(message) {
            popupElt.destroy();
            showHelpPopup({
                icon: 'error',
                message: message
            }); 
        }
        MW.getGiftData(function(data) {
            if (!data || !data.groups_levels) {
                error('Cant load your MafiaWars friends.');
                return;
            }
            loadingScreen('Loading Application users...');
            facebook.getAppFriends(function(result) {
                if (!result || result.error) {
                    error(result.error.message);
                    return;
                } else {
                   result = parseUsers(result); 
                }
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
        c$('img').attr('src', Resources.content.ajax_loader).appendTo(parent.empty());

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
        var $ul = $('.member_list ul', popupElt.content);
        var $li;

        for (var i = 0, user; (user = users[i]); i++)
        {
            if (user.name) {
                $li = c$('li').appendTo($ul);
                $li.append(c$('span', 'class:user_name').text(user.name));
                c$('div', 'class:buttons').appendTo($li)
                .append(b$('FB Profile', 'uid:'+user.id +',class:short white').click(Events.profile_click))
                .append(b$('Remove', 'class:short red,id:user_' + i).click(Events.remove_click))
                .append(b$('Ignore', 'class:short green,uid:'+user.id).click(Events.ignore_click));
                if (options.get('ignored').indexOf(user.id) !== -1) {
                    $li.hide();
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
        .attr('src', Resources.content.ajax_loader)).append(messageElt);

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
    var options = UserConfig.mgopt;
    var sendTimer = new TimerMessage('#next_gift_timer');
    var gVar = {
        is_working: false,
        daily_left: 0,
        gift_count_avail: 0,
        categories: {
            0: 'Collections',
            1: 'Loot',
            2: 'Boosts'
        },
        /** @type {CSInventory} */ Inventory  : null,
        /** @type {CSFriends} */   Friends    : null
    }
    var Queue = [];
    var InventoryFilter = new Object();

    var popupElt = new PopupObject('multigifter_popup', {
        type: 'main',
        title: Resources.getPicture('multigifter_title'),
        onclose: function() {
            sendTimer.clear();
            Events.cancel_click();
            httpAjaxStopRequests();
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
                Util.each(collectionFilter[group], function(name, arr) {
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
            for (var c in gVar.categories) {
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
            var q, item;
            for (var c in gVar.categories) {
                for (var i = 0; i < freeGift[c].length; i++) {
                    q = (freeGift[c][i].amount = new_amounts[c][freeGift[c][i].id]);
                    if (inventory&&inventory[i]) {
                        inventory[i].quantity = q;
                    }
                }
            }
        };

        this.update = function(data, Items) {
            var item, info;
            resetData();
            for (var c in gVar.categories) {
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
            ? 'http://www.facebook.com/groups/${target}/?id=${id}' 
            : 'http://www.facebook.com/${target}/posts/${id}'
            
            Util.each(logText.split(/\n/), function(index, text) {
                var line = Util.doRgx(/^\#\s\[([\d\.:]+)\]\s(.*)/, text);
                properties['['+line.$1+']'] = line.$2;
            });
            
            facebook.streamPublish({
                'target'      : target_id,
              //'message'     : message,
                'name'        : '{*actor*} sent inventory items!',
                'properties'  : properties
            }, function(post_id) {
                if (post_id) {
                    var p = Util.doRgx(/(\d+)_(\d+)/, post_id);
                    self.unbind().removeClass('sexy_announce_gray disabled').attr({
                        'href': Util.render(view_link,{'id':p.$2, 'target':p.$1}),
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
                        gVar.Inventory.updateFavorites();
                        changeCategory('gift', 3);
                    });
                }
                else
                {
                    options.set('userFav', new Array());
                    options.save(function() {
                        gVar.Friends.updateFavorites();
                        changeCategory('user', 1);
                    });
                }
            });
            return false;
        },
        addAllGifts_click: function() {
            var sAsk = 'You will add '+gVar.Inventory.getAllItems().length;
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
            gVar.Inventory.lootFilter(buildLootFilter());
            changeCategory('gift', 1);
            return false;
        },
        clearFilter_click: function() {
            gVar.Inventory.clearLootFilter();
            changeCategory('gift', 1);
            return false;
        },
        collectionFilterType_change: function() {
            updateCollectionFilterData($(this).val());
            return false;
        },
        collectionFilter_change: function() {
            gVar.Inventory.collectionFilter($(this).attr('group'), $(this).val());
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
                addGiftToQueue(count, gVar.Inventory.selected);
            }
            else {
                addGiftToQueue('-'+ count, gVar.Inventory.selected);
            }
            return false;
        },
        finish_click: function() {
            $('#mglist_queue').empty();
            globalMessage();
            $('#vertical_spacer').animate({'padding-top':422},500,'linear');
            $('#mglist_queue').animate({'height':320},500,'linear');
            $('#main_log').fadeOut(500, function() {
                $('#main_container').fadeIn(500);
            });
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
            gVar.is_working = false;
            return false;
        },
        delQueue_click: function() {
            Queue = [];
            $('#mglist_queue').empty();
            gVar.gift_count_avail = gVar.daily_left;
            return false;
        },
        start_click: function() {
            if (Queue.length > 0) {
                // Hide all delete buttons of batch process to prevent errors
                $('*[id^="delete_id_"]', '#mglist_queue').hide();
                $('#global_messages').empty()
                showDiv('message');
                $('#main_container').fadeOut(500, function() {
                    $('#mglist_queue').animate({'height':430},500,'linear');
                    $('#vertical_spacer').animate({'padding-top':300},500,'linear');
                    $('#main_log').fadeIn(500);
                    showDiv('status');
                    gVar.is_working = true;
                    startBatchProcess();
                });
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
                $('#gift_fav_clear').css('display',(index===3?'inline':'none'));
                $('div[id^=filter_container]').hide();
                (e$('#filter_container_' + index) || $('#filter_container_msg')).show();
            } else {
                $('#user_fav_clear').css('display',(index===1?'inline':'none'));
            }
            getController(name).setCat(index);
            updatePageDownList(name);
            $('#'+name+'_page')[0].selectedIndex = getController(name).currentPage() - 1;
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

            if (getController(name).currentPage() > 1) {
                $('#'+name+'_page')[0].selectedIndex = getController(name).currentPage() - 2;
                $('#'+name+'_page').change();
            }
            return false;
        },
        nextPage_click: function() {
            var name = $(this).attr('name');

            if (getController(name).currentPage() < getController(name).pages()) {
                $('#'+name+'_page')[0].selectedIndex = getController(name).currentPage();
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
            getController(name).search(this.value.toLowerCase());
            changeCategory(name, (name == 'gift' ? 4 : 2));
        }
    };
    
    function getController(name) {
        return (name==='gift'?gVar.Inventory:gVar.Friends);
    }
    
    function genMainDom() {
        var $log = c$('div', 'id:main_log').appendTo(popupElt.content);
        var $main = c$('div', 'id:main_container').appendTo(popupElt.content);
        var $ctr = c$('div', 'class:controls');
        
        // GIFT BAR
        var $bar = c$('div', 'class:controlbar').appendTo($main);
        c$('div').css('clear','both').appendTo($main);

        c$('div', 'class:leftside').appendTo($bar)
        .append(c$('select', 'id:gift_category,name:gift').width(150).change(Events.category_change))
        .append(c$('a','href:#,id:gift_fav_clear').css('margin-left',5).text('Clear').click(Events.clear_click).hide())
        .append(c$('input:checkbox', 'mgopt_giftpages').css('margin-left',5).change(Events.swithGiftPages_click))
        .append(c$('label', 'for:mgopt_giftpages').text('Use Pages.'))
        .append(c$('div', 'id:gift_page_box').css('float', 'right')
        .append(c$('a','name:gift,id:mgpage_prev,href:#,class:active').click(Events.prevPage_click))
        .append(c$('select', 'id:gift_page').width(70).change(Events.giftPage_change))
        .append(c$('a','name:gift,id:mgpage_next,href:#,class:active').click(Events.nextPage_click)));

        c$('div', 'class:rightside').appendTo($bar).width(290)
        .append(c$('input:checkbox', 'mgopt_hidezeroamount').change(Events.swithGiftPages_click))
        .append(c$('label', 'for:mgopt_hidezeroamount').text('Hide 0 amount.').css('margin-right',15))
        .append(b$('Filters', 'name:filter,class:short white').click(Events.showTab_click))
        .append(b$('Search', 'name:search,class:short white').click(Events.showTab_click));

        c$('div', 'id:gift_list,class:item_list').css('float','left').appendTo($main);

        var $tab = c$('div', 'class:tab_container').appendTo($main);

        // SELECTED GIFT TAB
        c$('center', 'tab_selected_gift').appendTo($tab)
        .append(c$('div').text('Selected gift:'))
        .append(c$('div', 'id:giftcard, class:ItemCardBox').css({
            'cursor': 'default',
            'margin-top': 5,
            'width': 'auto'
        }));

        // COLLECTION FILTER TAB
        var $flt = c$('div', 'tab_filter').hide().appendTo($tab);

        c$('div', 'filter_container_0').css('padding',20).appendTo($flt)
        .append(s$('collection_filter_type', 'Select Collection Type', 260,{change:Events.collectionFilterType_change}))
        .append(c$('div').css({'clear':'both','margin-top':5}))
        .append(s$('collection_filter', 'Select Collection Name', 260,{change:Events.collectionFilter_change}));

        // LOOT FILTER TAB
        var tab = new TabObject(
            c$('div', 'filter_container_1').hide().appendTo($flt),
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
        .append(c$('select', 'id:attack_more_less'))
        .append(c$('span').text(' than '))
        .append(c$('input:text', 'id:attack_amount').width(60))
        .append('<br />')
        .append(c$('span').text('Defense is: '))
        .append(c$('select', 'id:defense_more_less'))
        .append(c$('span').text(' than '))
        .append(c$('input:text', 'id:defense_amount').width(60));
        
        function genList($append, name) {
            c$('ul', 'class:checkboxlist,name:'+name).appendTo($append);
            c$('center').appendTo($append)
            .append(b$('ALL', 'name:'+name).width(60).click(Events.selectAll_click))
            .append(c$('div').css({'clear':'both','margin-top':5}))
            .append(b$('NONE', 'name:'+name).width(60).click(Events.selectNone_click));
        }
        genList(tab.getLayout(1), 'ItemTypes');
        genList(tab.getLayout(2), 'Qualities');
        genList(tab.getLayout(3), 'Locations');

        c$('center').css('margin-top', 2).appendTo('#filter_container_1')
        .append(b$('Filter Items', 'class:short white').click(Events.filterItems_click))
        .append(b$('Clear Filter', 'class:short white').css('margin-left',5).click(Events.clearFilter_click));

        // FILTER MESSAGE
        c$('div', 'filter_container_msg').hide().appendTo($flt)
        .append(c$('center').css('margin', 10).text('Filter work only with "Collection" and "Loot" categories.'));

        // ADD FILTER OPTIONS
        Util.each(InventoryFilter, function(filterName, obj) {
            var chkList = $('ul[name='+filterName+']');

            Util.each(obj, function(name, value) {
                var sText = typeof(value) == 'string' ? value : value.name;
                c$('li').appendTo(chkList)
                .append(c$('input:checkbox', 'id:'+filterName+'_'+name+',checked:checked').val(name))
                .append(c$('label', 'for:'+filterName+'_'+name).text(sText));
            });
        });

        // SEARCH TAB
        c$('div', 'tab_search').css('padding-top',20).hide().appendTo($tab)
        .append(c$('div').append(c$('label','for:search_gift').text('Type the text to search:')))
        .append(c$('input:text','id:search_gift').width(200).focus(Events.textFocus).change(Events.input_change))
        .append(b$('Go', 'class:short white,name:gift').css('margin-left',5).click(Events.doSearch))
        .append(b$('Save', 'class:short white').css('margin-left',5).click(Events.saveSearch))
        .append('<br /><br />')
        .append(c$('div').append(c$('label', 'for:saved_search').text('Select a saved search:')))
        .append(c$('select', 'id:saved_search').width(220).change(Events.search_change))
        .append(b$('Remove', 'class:short white').css('margin-left',5).click(Events.removeSearch));

        c$('div').css('clear','both').appendTo($main);
        // USER
        $bar = c$('div', 'class:controlbar').appendTo($main);

        c$('div', 'class:leftside').appendTo($bar)
        .append(c$('select', 'id:user_category,name:user').width(160).change(Events.category_change))
        .append(c$('a','href:#,id:user_fav_clear').css('margin-left',5).text('Clear').click(Events.clear_click).hide())
        .append(c$('input:checkbox', 'mgopt_userpages').css('margin-left',5).change(Events.swithUserPages_click))
        .append(c$('label', 'for:mgopt_userpages').text('Use Pages.'))
        .append(c$('div', 'id:user_page_box').css('float','right')
        .append(c$('a','name:user,id:mgpage_prev,href:#,class:active').click(Events.prevPage_click))
        .append(c$('select', 'id:user_page').width(70).change(Events.userPage_change))
        .append(c$('a','name:user,id:mgpage_next,href:#,class:active').click(Events.nextPage_click)));

        c$('div', 'class:rightside').appendTo($bar)
        .append(c$('label','for:search_user').text('Search:'))
        .append(c$('input:text', 'id:search_user').width(140).focus(Events.textFocus).change(Events.input_change))
        .append(b$('Go', 'class:short white,name:user').css('margin-left',5).click(Events.doSearch))
        .append(c$('div').css('float', 'right')
        .append(c$('a', 'href:#,title:Clear all selected friends.').html('(Clear)').click(Events.clearUsers_click)));

        c$('div').css('clear','both').appendTo($main);
        c$('div', 'id:user_list,class:item_list').appendTo($main);
        c$('div', 'id:selected_users').appendTo($main);
        c$('div','id:vertical_spacer').appendTo(popupElt.content);
        
        $ctr.appendTo(popupElt.content);

        // global_messages
        c$('div', 'message_controls').appendTo($ctr).append('<span id="global_messages">');

        // CONTROL
        c$('div', 'start_controls').appendTo($ctr)
        .append(c$('div', 'class:gift_delay')
        .append(c$('label', 'for:mgopt_delay').html('Delay:&nbsp;'))
        .append(c$('input:text', 'id:mgopt_delay').width(30).focus(Events.textFocus)))
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
        c$('center', 'finish_controls').appendTo($ctr)
        .append(b$('FINISH').addClass('short orange').click(Events.finish_click));

        // CANCEL
        b$('CANCEL', 'id:cancel_button,class:short orange').click(Events.cancel_click)
        .appendTo(c$('div', 'status_controls').appendTo($ctr));

        // QUEUE
        c$('div', 'mglist_queue').appendTo(popupElt.content);
        
        // LOG
        c$('textarea', 'readonly:readonly').attr('onclick', '$(this).select();').appendTo($log);
        //
        $ctr = c$('div', 'status_controls').appendTo($log).css('padding',20);
        
        Resources.getPicture('ajax_loader').css('float','left').appendTo($ctr);
        c$('div', 'id:next_gift_timer').appendTo($ctr).css('float','right');
        c$('div').css('padding-left', 35).appendTo($ctr)
        .append(c$('span').text('Current Job:').css({'margin-right':5,'color':'grey'}))
        .append(c$('span', 'id:status_current_job_text'));
        c$('div').css({'padding-left':35, 'margin-top':10}).appendTo($ctr)
        .append(c$('span').text('Job Progress:').css({'margin-right':5,'color':'grey'}))
        .append(c$('span', 'id:status_send_message'));
        
        //
        c$('div', 'finish_controls').appendTo($log)
        .append(c$('div').css('padding-left',20).text('Select Group:'))
        .append(c$('select', 'id:group_selection').css({'margin-left':20,'width':580}))
        .append(b$('Publish','class:short white sexy_announce_gray').click(Events.publish_click));
        
        
        //------------------------
        // USER INTERFACE FINISHED
        //------------------------
        $('input:text, select, textarea', popupElt.content).addClass('black_box');
        
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
            names.push(gVar.Friends.getName(ids[i]));
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
        if (gVar.is_working)
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
        gVar.is_working = false;
        showDiv('finish', 'slow');
    }

    function tryShowControls(ms) {
        if (Queue.length > 0 || gVar.Inventory.selected.id &&
            $('#selected_users').children().length > 0)
        {
            showDiv('start', ms);
        }
        else {
            $('#global_messages').css('color', 'white')
            .html('You have ' + gVar.gift_count_avail + ' gifts left to send today (10000 daily).');
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

        for (var i = 0, len = getController(name).pages(); i < len; i++) {
            elem.append(c$('option', 'value:'+i).text((i + 1) + '/' + len));
        }

        $('#'+name+'_page_box')[options.get(name+'Pages') ? 'show' : 'hide']();
    }

    var selectGift = function(cat, id) {
        var select = gVar.Inventory.select(cat, id);
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
        c$('div', 'user_' + id).appendTo('#selected_users').text(gVar.Friends.getName(id))
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

        var pageArray = getController(listName).getPageItems(page);

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
        else if (gVar.Inventory.selected && gVar.Inventory.selected.id) {
            i = gVar.Inventory.selected;
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
        getController(lstName).updateFavorites();
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
        var text = msg || 'You have ' + gVar.gift_count_avail + ' gifts left to send today (10000 daily).';
        if (gVar.daily_left) {
            $('#global_messages').css('color', color || 'white').html('<strong>'+text+'</strong>');
        }
        showDiv('message');
        setTimeout(tryShowControls, 4000);
    }

    function addAllGifts(quantity) {
        Util.each(gVar.Inventory.getAllItems(), function(index, gift) {
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
        var maxQuantity = Math.min(maxAmounts, gVar.daily_left - giftCount);
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
        gVar.gift_count_avail = gVar.daily_left - giftCount;
        gVar.gift_count_avail -=  (Math.max(0, quantity) * recipients.length);

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
        gVar.gift_count_avail = gVar.daily_left - giftCount;
    }
    
    function addBatchProcess(id) {
        var item = Queue[id];
        var jobID = 'queue_item_' + id;
        var message = 'Send ' + item.quantity + ' ' + item.gift.name + '(s) To ';
        if (item.recip.length == 1) {
            message += Util.setColor(gVar.Friends.getName(item.recip[0]), 'yellow');
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
        var table = new TableObject(updateItem);
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
            if (!gVar.is_working)
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
            if (!gVar.is_working) {
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
                    var updatedData = MW.parseGiftData(htmlText);
                    var amount = updatedData.item_amounts[job.gift.cat][job.gift.id] || 0;
                    job.gift.amount = amount;
                    if (gVar.Inventory.all[job.gift.id]) {
                        gVar.Inventory.all[job.gift.id].quantity = amount;
                    }
                    gVar.gift_count_avail = (gVar.daily_left = updatedData.gifts_daily_left);
                    
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
        gVar.Inventory = new CSInventory(50);
        gVar.Friends = new CSFriends(50);
        
        MW.getGiftData(function(gift_data) {
            gVar.Friends.update(gift_data);

            gVar.daily_left        = gift_data.gifts_daily_left;
            gVar.gift_count_avail  = gift_data.gifts_daily_left;

            Logger.debug('gift_key: '+global.gift_key);
            Logger.debug('daily_left: ' + gift_data.gifts_daily_left);

            MW.getInventoryData(function(inv_data) {
                Logger.debug('Loading inventory...');
                gVar.Inventory.all = inv_data.Items.data;
                InventoryFilter.ItemTypes = inv_data.Item.Types;
                InventoryFilter.Locations = inv_data.Item.Locations;
                InventoryFilter.Qualities = inv_data.Item.Qualities;
                gVar.Inventory.update(gift_data, inv_data.Items);
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
        'I211bHRpZ2lmdGVyX3BvcHVwIHsNCiAgICBtaW4taGVpZ2h0OiA3ODVweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAuYmxhY2tf'+
        'Ym94IHsNCglmb250LXdlaWdodDogYm9sZDsNCgljb2xvcjogcmdiKDIwOCwgMjA4LCAyMDgpOyANCglib3JkZXI6IDFweCBzb2xp'+
        'ZCByZ2IoMTUzLCAxNTMsIDE1Myk7IA0KCWJhY2tncm91bmQtY29sb3I6IGJsYWNrOyANCglmb250LXNpemU6IDE0cHg7DQp9DQoj'+
        'bXVsdGlnaWZ0ZXJfcG9wdXAgYSB7DQoJdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5j'+
        'b250cm9sYmFyIHsNCgliYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFw'+
        'aGljcy9tYXBfYmFzZWRfam9icy9leHBlcnRfdmlldy9leHBlcnR2aWV3X25hdl9taWQuZ2lmKTsNCglib3JkZXItY29sb3I6IGJs'+
        'YWNrOw0KCWhlaWdodDogMzVweDsNCiAgICBtYXgtaGVpZ2h0OiAzNXB4Ow0KICAgIG92ZXJmbG93LXk6IGhpZGRlbjsNCgl0ZXh0'+
        'LWFsaWduOiBsZWZ0Ow0KCXdpZHRoOiBhdXRvOw0KCWNsZWFyOiBib3RoOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250'+
        'cm9sYmFyICogew0KCXZlcnRpY2FsLWFsaWduOiBtaWRkbGU7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2LmNvbnRyb2xiYXIg'+
        'ZGl2LmxlZnRzaWRlIHsNCglmbG9hdDogbGVmdDsNCglwYWRkaW5nOiA1cHggMHB4IDVweCA1cHg7DQoJd2lkdGg6IDQwMHB4Ow0K'+
        'fQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250cm9sYmFyIGRpdi5yaWdodHNpZGUgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdp'+
        'bi1sZWZ0OiAxNXB4Ow0KCXBhZGRpbmc6IDVweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbGJhciBkaXYucmln'+
        'aHRzaWRlIGEgew0KCW1hcmdpbi1yaWdodDogNnB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi50YWJfY29udGFpbmVyIHsN'+
        'Cgl0ZXh0LWFsaWduOiBsZWZ0Ow0KCWZsb2F0OiBsZWZ0Ow0KCWhlaWdodDogMTUwcHg7DQoJbWFyZ2luOiA1cHg7DQoJd2lkdGg6'+
        'IDMxNXB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250cm9scyB7DQoJYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHA6'+
        'Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvbWFwX2Jhc2VkX2pvYnMvZXhwZXJ0X3ZpZXcvZXhwZXJ0dmll'+
        'd19uYXZfbWlkLmdpZik7DQoJaGVpZ2h0OiAzOHB4Ow0KCXRleHQtYWxpZ246IGNlbnRlcjsNCgl3aWR0aDogYXV0bzsNCglib3Jk'+
        'ZXItY29sb3I6IGJsYWNrOw0KCWNsZWFyOiBib3RoOwkNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbHMgI3N0YXJ0'+
        'X2NvbnRyb2xzIGEubWVkaXVtIHsNCgltYXJnaW4tbGVmdDogNXB4Ow0KCW1hcmdpbi10b3A6IDJweDsNCn0NCiNtdWx0aWdpZnRl'+
        'cl9wb3B1cCBkaXYuY29udHJvbHMgI3N0YXJ0X2NvbnRyb2xzIGEuc2hvcnQgew0KCW1hcmdpbi1sZWZ0OiA1cHg7DQp9DQojbXVs'+
        'dGlnaWZ0ZXJfcG9wdXAgZGl2LmNvbnRyb2xzICNmaW5pc2hfY29udHJvbHMgYS5zaG9ydCB7DQoJbWFyZ2luOiA0cHg7DQp9DQoj'+
        'bXVsdGlnaWZ0ZXJfcG9wdXAgZGl2LmNvbnRyb2xzICNtZXNzYWdlX2NvbnRyb2xzIHsNCgl3aWR0aDogYXV0bzsNCglwYWRkaW5n'+
        'LXRvcDogMTBweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYuY29udHJvbHMgI3N0YXR1c19jb250cm9scyB7DQoJaGVpZ2h0'+
        'OiAzNXB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250cm9scyAjc3RhdHVzX2NvbnRyb2xzICNjYW5jZWxfYnV0dG9u'+
        'IHsNCgltYXJnaW4tcmlnaHQ6IDMwcHg7DQoJbWFyZ2luLXRvcDogNHB4OwkNCglmbG9hdDogcmlnaHQ7DQp9DQojbXVsdGlnaWZ0'+
        'ZXJfcG9wdXAgZGl2LmNvbnRyb2xzICNzdGF0dXNfY29udHJvbHMgaW1new0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdpbjogMTBweCAw'+
        'cHggMTBweCAxNXB4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250cm9scyAjc3RhdHVzX2NvbnRyb2xzIC5qb2Jfc3Rh'+
        'dHVzIHsNCglmbG9hdDogbGVmdDsNCgltYXJnaW4tbGVmdDogNDBweDsNCgl0ZXh0LWFsaWduOiBsZWZ0Ow0KfQ0KI211bHRpZ2lm'+
        'dGVyX3BvcHVwIGRpdi5jb250cm9scyAjc3RhdHVzX2NvbnRyb2xzIC5qb2Jfc3RhdHVzIC5jdXJyZW50X2pvYiB7DQoJZmxvYXQ6'+
        'IGxlZnQ7DQoJbWFyZ2luLXJpZ2h0OiA1cHg7DQoJY29sb3I6IGdyZWVuOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdi5jb250'+
        'cm9scyAjc3RhdHVzX2NvbnRyb2xzIC5qb2Jfc3RhdHVzICNuZXh0X2dpZnRfdGltZXIgew0KCWZsb2F0OiBsZWZ0Ow0KCW1hcmdp'+
        'bi1sZWZ0OiA1cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2LmNvbnRyb2xzICNzdGF0dXNfY29udHJvbHMgLmpvYl9zdGF0'+
        'dXMgI3N0YXR1c19jdXJyZW50X2pvYl90ZXh0IHsNCgl3aWR0aDogMzAwcHg7DQoJZmxvYXQ6IGxlZnQ7DQoJY29sb3I6IGdyZXk7'+
        'DQoJb3ZlcmZsb3c6IGF1dG87DQoJbWF4LXdpZHRoOiAzMDBweDsNCgltYXgtaGVpZ2h0OiAxOXB4Ow0KfQ0KI211bHRpZ2lmdGVy'+
        'X3BvcHVwIGRpdi5jb250cm9scyAjc3RhdHVzX2NvbnRyb2xzIC5qb2Jfc3RhdHVzICNzdGF0dXNfc2VuZF9tZXNzYWdlIHsNCgl3'+
        'aWR0aDogNTAwcHg7DQoJb3ZlcmZsb3c6IGhpZGRlbjsNCgltYXgtd2lkdGg6IDUwMHB4Ow0KCW1heC1oZWlnaHQ6IDE5cHg7DQp9'+
        'DQojbXVsdGlnaWZ0ZXJfcG9wdXAgIGRpdi5naWZ0X2RlbGF5IHsNCglmbG9hdDogbGVmdDsNCgltYXJnaW46IDVweDsNCgl0ZXh0'+
        'LWFsaWduOiBjZW50ZXI7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21ncGFnZV9wcmV2IHsNCgliYWNrZ3JvdW5kOiB0cmFuc3Bh'+
        'cmVudCB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNkbi5jb20vbXdmYi9ncmFwaGljcy9pbnZlbnRvcnkvRmlsdGVyRHJvcERv'+
        'd24vaW52ZW50b3J5X2Fycm93X2luYWN0aXZlX2xlZnQucG5nKSBuby1yZXBlYXQ7DQoJY3Vyc29yOiBkZWZhdWx0Ow0KCWxpbmUt'+
        'aGVpZ2h0OiAxNnB4Ow0KCXBhZGRpbmctbGVmdDogMTZweDsNCgl3aWR0aDogMTZweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAj'+
        'bWdwYWdlX3ByZXYuYWN0aXZlIHsNCgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoaHR0cDovL213ZmIuc3RhdGljLnpnbmNk'+
        'bi5jb20vbXdmYi9ncmFwaGljcy9pbnZlbnRvcnkvRmlsdGVyRHJvcERvd24vaW52ZW50b3J5X2Fycm93X2FjdGl2ZV9sZWZ0LnBu'+
        'Zykgbm8tcmVwZWF0Ow0KCWN1cnNvcjogcG9pbnRlcjsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAjbWdwYWdlX25leHR7DQoJYmFj'+
        'a2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKGh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3MvaW52ZW50'+
        'b3J5L0ZpbHRlckRyb3BEb3duL2ludmVudG9yeV9hcnJvd19pbmFjdGl2ZV9yaWdodC5wbmcpIG5vLXJlcGVhdDsNCgljdXJzb3I6'+
        'IGRlZmF1bHQ7DQoJbGluZS1oZWlnaHQ6IDE2cHg7DQoJcGFkZGluZy1sZWZ0OiAxNnB4Ow0KCXdpZHRoOiAxNnB4Ow0KfQ0KI211'+
        'bHRpZ2lmdGVyX3BvcHVwICNtZ3BhZ2VfbmV4dC5hY3RpdmUgew0KCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChodHRwOi8v'+
        'bXdmYi5zdGF0aWMuemduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL2ludmVudG9yeS9GaWx0ZXJEcm9wRG93bi9pbnZlbnRvcnlfYXJy'+
        'b3dfYWN0aXZlX3JpZ2h0LnBuZykgbm8tcmVwZWF0Ow0KCWN1cnNvcjogcG9pbnRlcjsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAg'+
        'I3NlbGVjdGVkX3VzZXJzIHsNCglmbG9hdDogcmlnaHQ7DQoJbWFyZ2luLXJpZ2h0OiA1cHg7DQoJd2lkdGg6IDMwMHB4Ow0KCWJv'+
        'cmRlcjogMXB4IHNvbGlkIHJnYigxNTMsIDE1MywgMTUzKTsNCgloZWlnaHQ6IDE2MHB4Ow0KCW92ZXJmbG93OiBhdXRvOw0KCWZv'+
        'bnQtc2l6ZTogMTJweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAgI3NlbGVjdGVkX3VzZXJzIGRpdiB7DQoJYmFja2dyb3VuZC1j'+
        'b2xvcjogIzMzMzsNCgltYXJnaW46IDJweDsNCglwYWRkaW5nOiAycHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNtdWx0aWdp'+
        'ZnRlcl9wb3B1cCAgI3NlbGVjdGVkX3VzZXJzIGRpdiBhIHsNCglmbG9hdDogcmlnaHQ7DQoJbWFyZ2luLWxlZnQ6IDVweDsNCn0N'+
        'CiNtdWx0aWdpZnRlcl9wb3B1cCAjbWdsaXN0X3F1ZXVlIHsNCgl3aWR0aDogYXV0bzsNCgloZWlnaHQ6IDMyMHB4Ow0KCXRleHQt'+
        'YWxpZ246IGxlZnQ7DQoJcGFkZGluZzogMHB4IDZweDsNCglib3JkZXI6IDFweCBzb2xpZCByZ2IoMTUzLCAxNTMsIDE1Myk7DQoJ'+
        'Y2xlYXI6IGJvdGg7DQoJb3ZlcmZsb3cteDogaGlkZGVuOw0KCW92ZXJmbG93LXk6IGF1dG87DQp9DQojbXVsdGlnaWZ0ZXJfcG9w'+
        'dXAgI21nbGlzdF9xdWV1ZSBkaXYucXVldWVfaXRlbSB7DQoJYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzMzM7DQoJY2xlYXI6'+
        'IGJvdGg7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luLXRvcDogNXB4Ow0KCXBhZGRpbmctYm90dG9tOiA1cHg7DQoJd2lkdGg6IGF1'+
        'dG87DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21nbGlzdF9xdWV1ZSBkaXYucXVldWVfaXRlbSBkaXYuc3RhdHVzIHsNCgltYXJn'+
        'aW4tcmlnaHQ6IDEwcHg7DQoJYm9yZGVyOiAwcHg7DQoJZmxvYXQ6IGxlZnQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21nbGlz'+
        'dF9xdWV1ZSBkaXYucXVldWVfaXRlbSBkaXYuc3RhdHVzIGRpdiB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0'+
        'aWMuenluZ2EuY29tL213ZmIvZ3JhcGhpY3MvZmxhZ3MvbXdfbWVzc2FnZWJveF9jaGVja2JveDJfbm9ybWFsaXplZC5naWYiKSBu'+
        'by1yZXBlYXQgc2Nyb2xsIDAlIDAlIHRyYW5zcGFyZW50Ow0KCW1hcmdpbjogMTBweDsNCgltaW4taGVpZ2h0OiAyMHB4Ow0KCW1p'+
        'bi13aWR0aDogMjBweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAjbWdsaXN0X3F1ZXVlIGRpdi5xdWV1ZV9pdGVtIGRpdi5zdGF0'+
        'dXMgZGl2LmNvbXBsZXRlIHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFw'+
        'aGljcy9mbGFncy9td19tZXNzYWdlYm94X2NoZWNrYm94MV9ub3JtYWxpemVkLmdpZiIpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCUg'+
        'dHJhbnNwYXJlbnQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21nbGlzdF9xdWV1ZSBkaXYucXVldWVfaXRlbSBkaXYuaWNvbiB7'+
        'DQoJYm9yZGVyOiAwcHg7DQoJZmxvYXQ6IGxlZnQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21nbGlzdF9xdWV1ZSBkaXYucXVl'+
        'dWVfaXRlbSB0YWJsZSB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luLWxlZnQ6IDEwcHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAg'+
        'I21nbGlzdF9xdWV1ZSBkaXYucXVldWVfaXRlbSB0YWJsZSAjcXVldWVfam9iX25hbWUuam9iX3R4dCB7DQoJZm9udC13ZWlnaHQ6'+
        'IGJvbGQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21nbGlzdF9xdWV1ZSBkaXYucXVldWVfaXRlbSB0YWJsZSAuam9iX3R4dCB7'+
        'DQoJZmxvYXQ6IGxlZnQ7DQoJZm9udC1zaXplOiAxMnB4Ow0KCW1hcmdpbi1sZWZ0OiAxNXB4Ow0KCXZlcnRpY2FsLWFsaWduOiB0'+
        'b3A7DQoJY29sb3I6IHdoaXRlOw0KCXdpZHRoOiA0NTBweDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1cCAuY2hlY2tib3hsaXN0IHsN'+
        'CglmbG9hdDogbGVmdDsNCglib3JkZXI6IDFweCBzb2xpZCAjOTk5Ow0KCWhlaWdodDogMTA0cHg7DQoJbWFyZ2luOiAxcHg7DQoJ'+
        'cGFkZGluZzogMXB4Ow0KCXdpZHRoOiAyMjBweDsNCglvdmVyZmxvdy14OiBoaWRkZW47DQoJb3ZlcmZsb3cteTogYXV0bzsNCn0N'+
        'CiNtdWx0aWdpZnRlcl9wb3B1cCAudGFiX2JveF9jb250ZW50IGNlbnRlciB7DQoJZmxvYXQ6IGxlZnQ7DQoJbWFyZ2luOiAxNXB4'+
        'IDBweCAwcHggM3B4Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIC5pdGVtX2xpc3Qgew0KCWZsb2F0OiBsZWZ0Ow0KCXBhZGRpbmc6'+
        'IDFweDsNCgl3aWR0aDogNDAwcHg7DQoJYm9yZGVyOiAxcHggc29saWQgcmdiKDE1MywgMTUzLCAxNTMpOw0KCW92ZXJmbG93LXg6'+
        'IGhpZGRlbjsNCglvdmVyZmxvdy15OiBhdXRvOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIC5pdGVtX2xpc3QgdWwgew0KCW1hcmdp'+
        'bjogMHB4OyANCglwYWRkaW5nOiAwcHg7DQoJbGlzdC1zdHlsZS10eXBlOiBub25lOw0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIC5p'+
        'dGVtX2xpc3QgdWwgbGkgew0KCXdpZHRoOiBhdXRvOw0KCW1hcmdpbjogMXB4OyANCgloZWlnaHQ6IDMwcHg7IA0KCWJvcmRlcjog'+
        'MXB4IHNvbGlkICMzMzMzMzM7IA0KCW92ZXJmbG93OiBoaWRkZW47IA0KCWN1cnNvcjogcG9pbnRlcjsNCn0NCiNtdWx0aWdpZnRl'+
        'cl9wb3B1cCAuaXRlbV9saXN0IHVsIGxpIC5mYXZvcml0ZSB7DQoJYmFja2dyb3VuZDogdXJsKCJodHRwOi8vbXdmYi5zdGF0aWMu'+
        'emduY2RuLmNvbS9td2ZiL2dyYXBoaWNzL3YzL2ljb25fd2lzaGxpc3RfYWRkXzE5eDE0XzAxLmdpZiIpIG5vLXJlcGVhdCBzY3Jv'+
        'bGwgMCUgMCUgdHJhbnNwYXJlbnQ7DQoJY3Vyc29yOiBwb2ludGVyOw0KCWZsb2F0OiByaWdodDsNCgloZWlnaHQ6IDE0cHg7DQoJ'+
        'bWFyZ2luOiA4cHg7DQoJd2lkdGg6IDE5cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgLml0ZW1fbGlzdCB1bCBsaSAuZmF2b3Jp'+
        'dGUucmVtb3ZlIHsNCgliYWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56Z25jZG4uY29tL213ZmIvZ3JhcGhpY3Mv'+
        'djMvaWNvbl93aXNobGlzdF9yZW1vdmVfMTl4MTRfMDEuZ2lmIikgbm8tcmVwZWF0IHNjcm9sbCAwJSAwJSB0cmFuc3BhcmVudDsN'+
        'Cn0NCiNtdWx0aWdpZnRlcl9wb3B1cCBkaXYjZ2lmdF9saXN0IHsNCgloZWlnaHQ6IDE4MHB4Ow0KfQ0KI211bHRpZ2lmdGVyX3Bv'+
        'cHVwIGRpdiN1c2VyX2xpc3Qgew0KCWhlaWdodDogMTYwcHg7DQp9CQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdiNnaWZ0X2xpc3Qg'+
        'dWwgbGkgZGl2Lml0ZW1fbmFtZSB7DQoJZmxvYXQ6IGxlZnQ7DQoJd2lkdGg6IDI5MHB4Ow0KCWhlaWdodDogMTdweDsNCglvdmVy'+
        'ZmxvdzogaGlkZGVuOw0KCXBhZGRpbmc6IDZweCAwcHg7DQoJdGV4dC1hbGlnbjogbGVmdDsNCn0NCiNtdWx0aWdpZnRlcl9wb3B1'+
        'cCBkaXYjZ2lmdF9saXN0IHVsIGxpIGltZyB7DQoJZmxvYXQ6IGxlZnQ7DQoJaGVpZ2h0OiAyNXB4Ow0KCW1hcmdpbjogMnB4IDEw'+
        'cHg7DQoJd2lkdGg6IDI1cHg7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgZGl2I3VzZXJfbGlzdCB1bCBsaSBkaXYuY2hlY2tib3gg'+
        'ew0KCWJhY2tncm91bmQ6IHVybCgiaHR0cDovL213ZmIuc3RhdGljLnp5bmdhLmNvbS9td2ZiL2dyYXBoaWNzL2ZsYWdzL213X21l'+
        'c3NhZ2Vib3hfY2hlY2tib3gyX25vcm1hbGl6ZWQuZ2lmIikgbm8tcmVwZWF0IHNjcm9sbCAwJSAwJSB0cmFuc3BhcmVudDsNCgl0'+
        'ZXh0LWFsaWduOiBsZWZ0Ow0KCW1hcmdpbjogNXB4IDBweCAwcHggMTBweDsNCgltaW4taGVpZ2h0OiAyMHB4Ow0KCXdpZHRoOiAz'+
        'MDBweDsgDQoJcGFkZGluZy1sZWZ0OiAzMHB4OyANCgloZWlnaHQ6IDIwcHg7DQoJY3Vyc29yOiBwb2ludGVyOw0KCWZsb2F0OiBs'+
        'ZWZ0Ow0KfQ0KI211bHRpZ2lmdGVyX3BvcHVwIGRpdiN1c2VyX2xpc3QgdWwgbGkuc2VsZWN0ZWQgZGl2LmNoZWNrYm94IHsNCgli'+
        'YWNrZ3JvdW5kOiB1cmwoImh0dHA6Ly9td2ZiLnN0YXRpYy56eW5nYS5jb20vbXdmYi9ncmFwaGljcy9mbGFncy9td19tZXNzYWdl'+
        'Ym94X2NoZWNrYm94MV9ub3JtYWxpemVkLmdpZiIpIG5vLXJlcGVhdCBzY3JvbGwgMCUgMCUgdHJhbnNwYXJlbnQ7DQp9DQojbXVs'+
        'dGlnaWZ0ZXJfcG9wdXAgZGl2I2dpZnRfbGlzdCB1bCBsaS5zZWxlY3RlZCB7IA0KCWJvcmRlcjogMXB4IHNvbGlkICNGRkZGMDA7'+
        'DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21haW5fbG9nIHsNCiAgICB0ZXh0LWFsaWduOiBsZWZ0Ow0KICAgIHdpZHRoOiAxMDAl'+
        'Ow0KICAgIGRpc3BsYXk6IG5vbmU7DQogICAgcG9zaXRpb246IGFic29sdXRlOw0KICAgIHBhZGRpbmc6IDVweDsNCn0NCiNtdWx0'+
        'aWdpZnRlcl9wb3B1cCAjbWFpbl9sb2cgdGV4dGFyZWEgew0KICAgIHdpZHRoOiA3MTVweDsNCiAgICBoZWlnaHQ6IDIwMHB4Ow0K'+
        'fQ0KI211bHRpZ2lmdGVyX3BvcHVwICNtYWluX2xvZyAjc3RhdHVzX2NvbnRyb2xzIHsNCiAgICBwYWRkaW5nOiAyMHB4Ow0KfQ0K'+
        'I211bHRpZ2lmdGVyX3BvcHVwICNtYWluX2xvZyAjZmluaXNoX2NvbnRyb2xzIGEgew0KICAgIG1hcmdpbi1yaWdodDogMjBweDsN'+
        'CiAgICBmbG9hdDogcmlnaHQ7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI21haW5fY29udGFpbmVyIHsNCiAgICBwb3NpdGlvbjog'+
        'YWJzb2x1dGU7DQp9DQojbXVsdGlnaWZ0ZXJfcG9wdXAgI3ZlcnRpY2FsX3NwYWNlciB7DQogICAgY2xlYXI6IGJvdGg7DQogICAg'+
        'cGFkZGluZy10b3A6IDQyMnB4Ow0KfQ=='
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
        title: Resources.getPicture('operationscenter_title'),
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
                global.fb_groups.addToSelect('#select_fbgroups',options.defaultGroup);
                button.enable();
            });
            return false;
        },
        setDefault_click: function() {
            options.set('defaultGroup', $('#select_fbgroups option:selected').val());
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
        Util.each(socialMissions, function(instance, mission) {            
            if (List.isNot('ignored', mission.instance_id) &&
               (List.isNot('published', mission.instance_id) || bIncludePublished === true) &&
                mission.is_mastered && mission.slots.free > 0)
            {
                if (mission.slackers !== true || options.get('addSlackers')) {
                    validOps.push(mission);
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
        var target = $('#select_fbgroups option:selected').val();

        if (validOps.length > 1) {
            Util.each(validOps, function(index, op) {
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
        title: Resources.getPicture('pluginmanager_title'),
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
        .append(Resources.getPicture('up_arrow').attr('name','up').click(Events.updown_click))
        .append('<br />')
        .append(Resources.getPicture('down_arrow').attr('name','down').click(Events.updown_click));

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
        title: Resources.getPicture('remindereditor_title'),
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
    brcrew       : true,
    chcrew       : true
});
/**
 * Show a popup with all user links.
 */
function UserLinks()
{
    var CheckedLinks = UserConfig.ulopt;
    var StoredLinks = new Config('usershortenlinks', {});
    var ShortLinks = {
        profile: {
            name: 'Profile',
            long_url: MW.getProfileLink()
        },
        promote: {
            name: 'Promote',
            long_url: MW.getExtURL('group', 'view', {
                'next_params': {
                    'promote': 'yes',
                    'pid': global.USER_ID
                }
            })
        },
        slots: {
            name: 'Slots',
            long_url: MW.getExtURL('stats', 'view', {
                'next_params': {
                    'user': global.USER_ID,
                    'vegasslots': '1',
                    'referrer': 'ad_feed'
                }
            })
        },
        warhelp: {
            name: 'War Help',
            long_url: MW.getExtURL('war', 'view', {
                'next_params': {
                    'leader_id': global.USER_ID
                }
            })
        },
        brcrew: {
            name: 'Brazil Crew',
            long_url: MW.getExtURL('job', 'accept_city_crew_feed', {
                'next_params': {
                    'target_id': global.USER_ID
                }
            })
        },
        chcrew: {
            name: 'Chicago Crew',
            long_url: MW.getExtURL('job', 'accept_city_crew_feed', {
                'next_params': {
                    'target_id': global.USER_ID
                }
            })
        }
    };

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
            StoredLinks = new Config('usershortenlinks', {});
            StoredLinks.save(function() {
                popupElt.destroy();
                UserLinks();
            });
            return false;
        },
        publish_click: function() {
            var self = $(this);
            var id = self.attr('isfor');
            var params = publishConfig[id];
            
            if (!/http/.test(ShortLinks[id].long_url) || self.hasClass('disabled')) {
                return false;
            }
            self.addClass('disabled');
            params.link = ShortLinks[id].long_url;
            showGroupSelection(0, function(target, msg) {
                params.target = target;
                params.message = msg;
                facebook.streamPublish(params, function() {
                    self.unbind().removeClass('sexy_announce_gray')
                    .find('span > span').text('Published!');
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
            CheckedLinks.fromDomElements();
            CheckedLinks.save();
            StoredLinks.save();
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
        'chcrew': {
            'name'        : '{*actor*} needs your help in Chicago',
            'caption'     : 'Join {*actor*}\'s elite crew in Chicago and you\'ll both get rewarded handsomely.',
            'picture'     : global.zGraphicsURL + 'crew_module/chicago/feed_crew1.png',
            'actionText'  : 'Join Now'
        },
        'brcrew': {
            'name'        : '{*actor*} needs your help in Brazil',
            'caption'     : 'Join {*actor*}\'s elite crew in Brazil and you\'ll both get rewarded handsomely.',
            'picture'     : global.zGraphicsURL + 'crew_module/brazil/feed_crew1.png',
            'actionText'  : 'Join Now'
        },
        'masteryboost': {
            'name'        : '{*actor*} is sharing a Mastery boost!',
            'caption'     : 'Here is a Mastery boost to help you do jobs faster. If you accept, we\'ll both get a boost to help us with jobs. Sweet!.',
            'picture'     : global.zGraphicsURL + 'AsnSocialJob/MFS-2x_mastery.jpg',
            'actionText'  : 'Accept'
        },
        'sdboostget': {
            'name'        : 'Help me loot!',
            'caption'     : 'Please give me 2x loot boosts to help me get powerful loot faster.',
            'picture'     : global.zGraphicsURL + 'boosts/big_item_boost-2xLoot-feed-icon.png',
            'actionText'  : 'Give 2x Loot Boost'
        }
    };

    function publishAll(target_id, message, callback) {
        var properties = new Object();
        var index = 1;

        CheckedLinks.fromDomElements();
        CheckedLinks.save();

        Util.each(ShortLinks, function(name, link) {
            if (/http/.test(link.long_url) && CheckedLinks.get(name)) {
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
        StoredLinks.add(id, shortUrl);
    }

    function genMainDom() {
        Util.each(ShortLinks, function( id, link ) {
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

    function Initialize() {
        genMainDom();
        // add short links if there is not found
        Util.each(ShortLinks, function(id, link) {
            if (StoredLinks[id]) {
                setLink(id, link.name, (link.short_url = StoredLinks[id]));
            }
            else if (link.long_url) {
                getShortURL(link.long_url,
                    function(shortUrl)  { setLink(id, link.name, shortUrl); },
                    function(errorText) { $('#'+id+'_link').val(errorText); }
                );
            }
        });
        // load checked links
        CheckedLinks.load(function() {
            CheckedLinks.toDomElements();
            popupElt.show();
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
    StoredLinks.load(Initialize);
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
    var url = Util.toUrl($('a:regex(href,xw_action=attack), a:regex(onclick,xw_action=attack)'));
    var user_id = Util.parseNum(Util.uSplit(url).opponent_id);
    var promote_url = MW.getIntURL('group','view')+'&promote=yes&pid='+escape('p|'+user_id);
    var is_inMafia = (e$('.zy_popup_box_body_dark a:regex(href,xw_action=remove)') !== null);
    if (isFriend && !(user_id && user_id!=0)) {
        showHelpPopup({
            icon: 'error',
            message: 'There was an error obtaining the user id.<br>Please, report this issue.'
        });
        return;
    }
    
    c$('div', 'class:box').appendTo(c$('div', 'class:motd_outer').insertAfter(br))
    .append(c$('div', 'class:box_top').append(c$('div', 'class:box_top_right')))
    .append(c$('div', 'class:box_middle').append(c$('div', 'class:box_middle_right').css('padding-left', 10)))
    .append(c$('div', 'class:box_bottom').append(c$('div', 'class:box_bottom_right')));
    
    var container = $('.motd_outer').clone().insertAfter('.motd_outer').find('.box_middle_right');
    $('.motd_outer:first .box_middle_right').append(anchors);
    
    function addToList() {
        var list_name = $(this).attr('name');
        var bfopt = UserConfig.bfopt;
        bfopt.load(function() {
            var text  = Util.htmlDecode($('.stats_title_text:first').text());
            var name  = Util.substr(text, '"', '"', 1, 0, 0, true);
            var level = Util.parseNum(text.substr(text.lastIndexOf('"') + 1));
            
            if (Util.isSet(bfopt.get(list_name)[user_id])) {
                showHelpPopup({
                    icon: 'info',
                    title: 'Adding player to '+list_name,
                    message: 'The player '+name+' is already in Battlefield\'s '+list_name+'.',
                    autoclose: 5
                });
                return;
            }
            bfopt.get(list_name)[user_id] = name + '  level ' + level + ' (from profile)';
            bfopt.save(function() {
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
    c$('a', 'href:#,name:blackList').appendTo(container).text('Add to Blacklist').click(addToList);
    if (is_inMafia) {
        c$('span').text(' | ').appendTo(container);
        c$('a', 'href:#').appendTo(container).text('Promote')
        .attr('onclick',"do_ajax('inner_page','remote/"+promote_url+"',1,1,0,0);return false;");
    } else {
        c$('span').text(' | ').appendTo(container);
        c$('a', 'href:#,name:whiteList').appendTo(container).text('Add to Whitelist').click(addToList);
    }
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
                AppInfo.name + ' v' + AppInfo.versiona + '&nbsp;|&nbsp;' +
                '<a href="'+ AppInfo.urla + '">Mod Updates</a></span>';
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
            initStorage(initjQuery);
        }
    }
    else if (/apps.facebook.com\/inthemafia/.test(global.location.href)) {
        addVersionText();
    }
    // died...
    return false;
})();
