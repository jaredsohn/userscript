// ==UserScript==
// @name         Addon〤mod
// @namespace    FACEBOOK MAFIA WARS ADDON
// @copyright    David Cabrera, Spockholm, etc
// @description  http://userscripts.org/topics/88133
// @include      http://apps.facebook.com/inthemafia/*
// @include      http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include      https://apps.facebook.com/inthemafia/*
// @include      https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @version      0.3.6
// ==/UserScript==

var AppInfo = {
   id        : 'app_10979261223',
   version   : '0.3.6',
   name      : 'Addon〤mod',
   tag       : 'Addon〤',
   prefix    : 'Addon〤mod_',
   url       : 'http://userscripts.org/scripts/show/118357',
   meta      : 'http://userscripts.org/scripts/source/118357.meta.js'
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
    /** @type Element */ final_wrapper    : null,
    /** @type Boolean */ editingReminders : false,
    
    chromeExtId: 'llfmkjppmncfcgdebajkjnopgodlcaoe',

    pages: {
        'story_controller': PageJob,
        'job_controller': PageJob,
        'map_controller': PageJobMap,
        'freegifts_controller': PageGift,
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
     * @param {Object} def default confiduration " setting_name: value ".
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
     * @param {Function} func function(name,value){...}
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
            
        }, 1000);
        
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
     * @param {Object} callback
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
            ver.message = 'You already have the latest version of '+ver.name+'.';
        }
        callback(ver);
    },
    /**
     * Check for a new update.
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
                    'bfopt_nohealiflows