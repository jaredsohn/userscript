// ==UserScript==
// @name           SpeedButtoN Addon
// @copyright      2010 - All Mafiya
// @version        0.0.5
// @description    Facebook MafiaWars Relaxing.
// @include 	   http://apps.facebook.com/inthemafia/*
// @include 	   http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include 	   http://www.facebook.com/plugins/serverfbml.php*
// @include 	   https://apps.facebook.com/inthemafia/*
// @include 	   https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include  	   https://www.facebook.com/plugins/serverfbml.php*
// ==/UserScript==

const DEBUG_MODE = false;

if (typeof(unsafeWindow) == 'undefined') {
    unsafeWindow = getwindow();
}

var scriptAppInfo = 
{
    appName: 'SpeedButtoN Addon',
    appTag: 'SpeedButtoN_',
    appVer: '0.0.5'
};

var Base64 = function () {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    /**
     * private method for UTF-8 encoding
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
     * @param {String} input
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
     * @param {String} input
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
}

/**
 * Creates a Config object that save/load data in json string format.
 * @constructor
 * @param {String} name Used for set/get from elements (element.id = name + defOptions.var_name) 
 * @param {Array} defOptions Array of key => value pairs.
 * @return {Config}
 */
var Config = function(name, _default) {
    var options = _default;
    var elementKey = name;
    var appPath = scriptAppInfo.appTag + name;
    var _this = this;
    
    var toGood = function(value, def) {
        switch (typeof(def)) {
            case 'string'  : return String(value);
            case 'number'  : return parseInt(value);
            case 'boolean' : return value === true;
            default: 
                if (typeof(value) !== typeof(def)) {
                    return def;
                }
                else {
                    return value;
                }
        }
    };
    this.all = _default;
    
    this.loadJSON = function(str) {
        if (!str) return;
        
        var tempOpt = $.parseJSON(str);
        $.each(tempOpt, function(name, value){
            if (typeof(options[name]) !== 'undefined') {
                options[name] = toGood(value, options[name]);
            }
        });
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
            //log$('saving: ('+appPath+')'+$.toJSON(options));
            GM_setValue(appPath, $.toJSON(options));
            if (typeof callback == 'function')
                callback.apply(_this);
        }, 0);
    };
    this.load = function(callback) {
        setTimeout(function() {
            _this.loadJSON(GM_getValue(appPath, null));
            //log$('loaded ('+appPath+'): '+GM_getValue(appPath, 'null'));
            if (typeof callback == 'function')
                callback.apply(_this);
        }, 0);
    };
    this.toDomElements = function() {
        $.each(options, function(name, value) {
            _this.setToElement(name);
        });
    };
    this.fromDomElements = function() {
        $.each(options, function(name, value) {
            _this.getFromElement(name);
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
        else {
            this.set(name, elem.val());
        }
    };
    return this;
};

/**
 * Global variables
 */
var global = {
    /** @type String */ USER_ID      : '',
    /** @type String */ PERSON_ID    : '',
    /** @type String */ MW64_ID      : '',
    /** @type Base64 */ Base64       : null,
    /** @type Config */ options      : null,
    /** @type Object */ popups       : new Object(),
    /** @type String */ zGraphicsURL : 'http://mwfb.static.zynga.com/mwfb/graphics/',
    /** @type String */ fbAuthUrl    : 'https://graph.facebook.com/oauth/authorize?client_id=10979261223&redirect_uri=http://apps.facebook.com/inthemafia/&type=user_agent&display=popup',
    /** @type String */ href         : '',
    /** @type Object */ uri          : new Object(),
    
    cities: {
        1: 'New York',
        2: 'Cuba',
        3: 'Moscow',
        4: 'Bangkok',
        5: 'Las Vegas',
        6: 'Italy'
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
    },
    readerCycle : null,
    speedMod    : null,
    speedBattle : null,
    speedCollect: null
};

// =========================================================
// CONSOLE LOG (DEBUG)
// =========================================================
function log$(message) {
    if (DEBUG_MODE === false)
        return;
        
    try {
        (console||unsafeWindow.console).log('SpeedAddon (DEBUG): ' + message);
    } 
    catch (e) {
        // EMPTY
    }
}
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
        .log('SpeedAddon (ERROR): ' + sMessage + '\n' + sStack);
    } 
    catch (e) {
        // EMPTY
    }
}

// =========================================================
// SELECTORS
// =========================================================
function e$(selector, context) {
    var j = $(selector, context);
    if (j.length > 0) {
        return j;
    }
    
    return null;
}
function h$(htmlText) {
    if (typeof(htmlText) == 'string') {
        var elem = c$('div');
        elem[0].innerHTML = '<div>' + htmlText + '</div>';
        return elem;        
    }
    return $(htmlText);
}
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
function x$(selector, context) {
    context = context || document;
    return document.evaluate(selector, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
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
                log$('localStorage is undefined, using a temporal storage.');
                localStorage = new (function() {
                    var tmp_array= [];
                    this.setItem= function(name, value){
                        tmp_array[name] = value;
                    },
                    this.getItem = function(name) {
                        return tmp_array[name] || null;
                    },
                    this.removeItem = function(name) {
                        tmp_array[name] = null;
                    }
                    return this;
                })();
            }
        }
        /**
         * Sets the named preference to the specified value.
         * @param {String} name The name preference.
         * @param {String, Number, Boolean} value Must be strings, booleans, or integers.
         */
        GM_setValue = function(name, value) {
            localStorage.setItem(name, value);
        };
        /**
         * Returns the named preference, or defaultValue if it does not exist
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
         * @param {String} name The name preference to delete.
         */
        GM_deleteValue = function(name) {
            localStorage.removeItem(name);
        };
    }
}
function initjQuery(accessToken) {
 try   
 {
    if (typeof(unsafeWindow) == 'undefined' || typeof(unsafeWindow.$) == 'undefined' || typeof(unsafeWindow.FB) == 'undefined') {
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
            MWFB = unsafeWindow.FB;
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
            if (a[s_member]) {
                return r.test(a[s_member]);
            }
            return false;   
        };
        
        if (!(global.USER_ID = getUserID())) {
            alert('MWAddon: Error, no user id found. Aborting load.');
            return;
        }
        // get person ID
        global.PERSON_ID = String(global.USER_ID).match(/(\d+)/)[1];
        
        // create Base64 Object
        global.Base64 = new Base64();
        
        // get Base64 User ID
        global.MW64_ID = global.Base64.encode(String(global.USER_ID)); 
        global.MW64_ID = global.MW64_ID.replace(/=/g,'');
        GM_log('MW ID:'+global.MW64_ID);
        
        // create default global options
        global.options = new Config('main', {
            privacy              : {'value': 'ALL_FRIENDS'},
            checkForUpdates      : false,
            appLastUpdateCheck   : 0,
            usebitly             : false,
            api_bit_ly_login     : '',
            api_bit_ly_key       : ''
        });
        //////////////////////////////////////////////////////////////
        if (global.speedMod==null) global.speedMod = new speedHandler();
        //////////////////////////////////////////////////////////////
        global.options.load(function() 
        {
            // for handle page loadings
            $('#mainDiv').ajaxComplete(function(e, r, o) {
                update_uri(o.url);
                var metadata = /<!--\s*Current\s*Page:\s*(\w+)/.exec(r.responseText);
                //metadata && loadController(metadata[1], r.responseText);
            });
            
            // this is the first load so...
            update_uri($('#nav_link_home_unlock a').attr('href'));
            //loadController(getCurrentPageName());
            ////////////////////////////////////////
            global.speedMod.initMod();
            global.speedMod.createDom();
            global.speedMod.loadcontroller();
            ////////////////////////////////////////
        });
    }
 } catch(err) {
   log$('Failed to load jQuery/facebook. Try again in 3 second.');
   setTimeout(initjQuery, 3000);
 }  
}

// =========================================================
// DOM OBJECTS
// =========================================================
/**
 * Create a popup with the specified options.<br>
 * The options members are:<br><br>
 * - {String} <b>title</b> To set popup title.<br>
 * - {Number} <b>top</b> To set popup top.<br>
 * - {Boolean} <b>autoOpen</b> Once created, show it up.<br>
 * - {Function} <b>onclose</b> On close event.<br>
 * - {Array} <b>buttons:</b><br>
 * --- {String} <b>label</b> to set the button text.<br>
 * --- {Function} <b>onclick</b> On click event.
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
        options.appendTo = e$('#speed_addon_popup'); 
    }
    
    var self      = this;
    var pid       = Math.round(new Date().getTime() / 100);
    var fodderElt = (options.appendTo || c$('div', 'speed_addon_popup').prependTo('#final_wrapper'));
    var divElt    = c$('div','pop_'+pid).appendTo(fodderElt);
    var bgElt     = c$('div','class:pop_bg,pop_bg_'+pid).appendTo(divElt);
    var popupElt  = c$('div','class:pop_box,pop_box_'+pid).appendTo(divElt);

    if (options.type == 'main') {
        popupElt.css({
            'width'       : 730,
            'border'      : '4px solid #A99E9E',
            'text-align'  : 'left',
            'top'         : 20
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
        'background': '#121212',
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
            'text-align': 'center'
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
        bgElt.show();
        popupElt.show();
        $('#inner_page').height(Math.max(parseInt(popupElt.height()) + 100, $('#inner_page').height()));
    };
    /**
     * Add Style element to popup from a base64 encoded string.
     * @param {String} base64String An String encoded in base64
     */
    this.addBase64Style = function(base64String) {
        c$('style').prependTo(popupElt).append(global.Base64.decode(base64String));
    };
    /**
     * Add Script element to popup from a base64 encoded string.
     * @param {String} base64String An String encoded in base64
     */
    this.addBase64Script = function(base64String) {
        c$('script').prependTo(popupElt).append(global.Base64.decode(base64String));
    };
    
    this.destroy = function() {
        divElt.remove();
        delete global.popups[id], this;
    };
    
    /**
    * Apply the specified options to all select elements.
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
 * @constructor
 * @param {Element, jQuery} appendTo The Object where the tabs is append.
 * @param {String} id the string id of this dom object.
 * @param {Array} tabNames Array of all tabs Names.
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
    }
    /**
     * Get the specified layout. 
     * @param {String, Number} id Can be the tab name (string) or tab index (integer)
     * @return {jQuery}
     */
    this.getLayout = function(id) 
    {
        var tabID = (isNaN(id) ? layerKeys[id] : id  );
        return e$('#' + layerID + '_tab_' + tabID + '_layout');
    }
    /**
     * Get the specified tab header. 
     * @param {String, Number} id Can be the tab name (string) or tab index (integer)
     * @return {jQuery}
     */
    this.getTabHeader = function(id,callback) { 
        var etab     = e$('#' + layerID + '_tab_' + id);
    	  var isActive = etab.hasClass('tab tab_active_op');
    	  var tabTitle = e$('.tab_middle', etab);
    	  callback(isActive,tabTitle);
    }
    /**
     * Get the specified active tab header. 
     */
    this.getActiveTabID = function() { 
        for (var i = 0; i < tabNames.length; i++) {
        	  if (e$('#' + layerID + '_tab_' + i).hasClass('tab tab_active_op'))
        	     return i;
        }	
        return 0;
    }
    /**
     * Add html code to the right of all tabs.
     * @param {String} innerHTML
     */
    this.tabClear = function(innerHTML) 
    {
        (e$('.tab_clear', headerLayout) || 
         c$('div').addClass('tab_clear').appendTo(headerLayout)).html(innerHTML);
    }
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
}
// =========================================================
// POPUPS
// =========================================================

/**
 * Display a modal message popup.<br>
 * Usage:<br><br>
 * <b>icon</b>: {String} Can be info or error.<br>
 * <b>title</b>: {String} the title of the new popup.<br>
 * <b>message</b>: {String} message sent to user.<br>
 * <b>buttons</b>: {Array} optional buttons. 
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
            .append(c$('h3').css('padding', '3px 28px').html(options.title))
            .append(c$('div').css('margin-top', 10).html(options.message))
    });
    if (typeof(options.top) == 'undefined') {
        $('#TopField').focus();
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
                 .append(c$('h3').css('margin', 0).text(message||'write a text:'))
                 .append(inputElt)
    });
}
/**
 * Display a modal popup showing text to user.
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
                 .append(c$('h3').css('margin', 0).text(message))
                 .append(inputElt)
    });
}

// =========================================================
// UTILS
// =========================================================


/**
 * Apply the specified options to an select element.
 * @param {Object} options
 * @param {Object} context
 */
function applySelectOptions(options, context) {
    $.each(options, function(id, opt) {
        var elem = $('#' + id, context);
        $.each(opt, function(value, name) {
            elem.append(c$('option', 'value:'+value).text(name));
        });
    });
}

/**
 * Return an object with all url parameters
 * @param {String} url
 * @return {Object}
 */
function splitUrl(url) {
    if (typeof(url) !== 'string') {
        return {};
    }
    var spl, n, sUrl = {};  
    var s_url = url.replace(/&amp;/g, '&');
    
    if ((spl = s_url.split('?')).length == 2) {
        s_url = spl[1];
    }
    if ((spl = s_url.split('&')).length > 0) {
        for (var i = 0; i < spl.length; i++) {
            if ((n = spl[i].split('=')).length == 2) {
                sUrl[n[0]] = unescape(n[1]);
            }
        }
    }
    return sUrl;
};

/**
 * Set a timerInterval to an element.
 * @param {String, Element, jQuery} selector the dom element to apply text.
 */
var timerMessage = function(selector) {
    var timerId;
    var self = this;
    /**
     * Start the timer with the specified options.<br>
     * - text must contain %N% tag to be replaced by the countwown delay
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
};

// =========================================================
// METHODS
// =========================================================

/**
 * Use "XMLHttpRequest()" to do an ajax request.
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
            options.timeout = 15000;
        }
        if (options.liteLoad !== 1) {
            options.liteLoad = 0;
        }
        
        // define url and params
        var connector = (options.url.indexOf('?') == -1) ? '?' : '&';
        var url = (/http/.test(options.url) ? '' : 'http://facebook.mafiawars.zynga.com/mwfb/') + options.url;
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
                    //options.error && options.error('(#'+xmlHttp.status+') '+xmlHttp.statusText);
                    options.error && options.error('(#'+xmlHttp.status+')');
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
        var url = (/http/.test(options.url) ? '' : 'http://facebook.mafiawars.zynga.com/mwfb/') + options.url;
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
                    options.error && options.error('(#'+xhr.status+')');
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
 * @param {Object} options
 * @param {Function} [callback]
 */
function ajaxRequest(options, callback) 
{
    var _overlay;
    try {
        if (typeof(options) == 'string' && typeof(callback) == 'function') {
            var sUrl = options;
            options = {
                url: sUrl,
                success: callback
            };
        }
        if (typeof(options) !== 'object') {
            throw ReferenceError('options is not defined.');
        }
        if (typeof(options.success) !== 'function') {
            if (typeof(callback) == 'function') {
                options.success = callback; 
            }
            else {
                throw ReferenceError('callback is not defined.');
            }
        }
        
        // send request
        httpRequest({
            url: options.url,
            data: options.data,
            liteLoad: options.liteLoad,
            timeout: 20000,
            success: function(htmlText) {
                global.uri.cb  = doRegex(/cb=([a-fA-F0-9]+)/ , htmlText).$1;
                global.uri.tmp = doRegex(/tmp=([a-fA-F0-9]+)/, htmlText).$1;
                options.success(htmlText);
            },
            error: function(errText) {
                options.success(errText);
            }
        });
    }
    catch(err) {
        logErr$(err);
        options && options.success && options.success(err.message);
    }
}

/**
 * Do a Json request.
 * @param {String} url
 * @param {Function} callback
 */
function jsonRequest(url, callback) 
{
    if (typeof(callback) !== 'function') {
        logErr$(ReferenceError('callback is not defined.'));
        return;
    }
    
    // send request
    httpRequest({
        url: url,
        liteLoad: 1,
        timeout: 15000,
        error: callback,
        success: function(htmlText) {
            var jsonData;
            try {
                jsonData = $.parseJSON(htmlText);
                unsafeWindow.user_fields_update(jsonData.user_fields);
                unsafeWindow.user_info_update(jsonData.user_fields, jsonData.user_info);
            } 
            catch (err) {
                jsonData = err.message;
                logErr$(err);
            }
            callback(jsonData);
        }
    });
}

/**
 * Show an error message about server http request response.
 */
function badServerResponse() {
    showHelpPopup({
        icon: 'error',
        title: 'Bad server response',
        message: 'There is an error in the server response. Try again later.'
    });
}

/**
 * Execute a Regular expresion and return and object.
 * @param {RegExp} rgx
 * @param {String} text
 */
function doRegex(rgx, text) {
    var output = {}
    var result = rgx.exec(String(text));
    if (result) {
        for (var i = 0; i < result.length; i++) {
            output['$'+ i] = result[i];
        }
    }
    return output;
}

/**
 * Update "tmp" and "cb" uri components.
 * @param {String} text
 */
function update_uri(text) {
    var uri = splitUrl(text);
    global.uri.tmp = uri.tmp;
    global.uri.cb = uri.cb;
}
/**
 * Evaluate a Mafia Wars HTML text response to make sure it's fine.
 * @param {String} responseText
 */
function mw_updater(htmlText) 
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
}
/**
 * Get user ID from script code.
 * @return {Number}
 */
function getUserID() 
{
    var match = /'sf_xw_user_id':\s?'([^']+)'/.exec($('body').html());
    if (match) {
        log$('MW USER ID: ' + unescape(match[1]));
        return unescape(match[1]);
    }
    return null;
}

/**
 * Return a valid internal Mafia wars url.
 * @param {String} controller Default is "index".
 * @param {String} action Default is "view".
 * @param {Number} city To force city ID, otherwise the current city is used.
 * @return {String}
 */
function getIntURL(controller, action, city) 
{
    var params = [
        'xw_controller='   + (controller || 'index'),
        'xw_action='       + (action || 'view'),
        'xw_city='         + (city || getCurrentCity()),
        'xw_person='       + global.PERSON_ID,
        'cb='              + global.uri.cb,
        'tmp='             + global.uri.tmp
    ];
    return 'html_server.php?' + params.join('&');
}

/**
 * Return a valid external Mafia Wars url.
 * @param {String} controller Default is "index".
 * @param {String} action Default is "view".
 * @param {Object} params {Name => Value} pairs.
 * @return {String}
 */
function getExtURL(controller, action, params) 
{
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
}

/**
 * Return the profile url of the user id
 * @param {String} user_id
 * @return {String}
 */
function getProfileLink(user_id) 
{
    var id = global.Base64.encode(String(user_id) || global.USER_ID); 
    return 'http://apps.facebook.com/inthemafia/profile.php?id='+escape('{"user":"'+id+'"}');
}

/**
 * Deposit the amount of cash specified..
 * @param {Number} city city id where to deposit 
 * @param {Number, String} amount cash to deposit
 * @param {Function} callback return server response or undefined.
 */ 
function bankDeposit(city, amount, callback) {
    var cityNames = {
        1: 'new_york',
        2: 'cuba',
        3: 'moscow',
        4: 'bangkok',
        5: 'vegas',
        6: 'italy'
    };
    var url = 'remote/'; 
    if (city == 5) {
        url += getIntURL('propertyV2', 'doaction');
        url += '&doaction=ActionBankDeposit&building_type=6&city='+city;
    }
    else {
        url += getIntURL('bank', 'deposit_all') + '&city=' + cityNames[city];
    }
    jsonRequest(
        url + '&amount=' + amount, 
        function(jsonData) 
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
    );
}

/**
 * Travel to the specified city. 
 * @param {Number} destination city id for destiny
 * @param {String} div selector
 * @param {Function} callback return true if success.
 */
function travelToCity(destination, div, callback) {
    var cityRegex = /current_city_id'.\s*=\s*parseInt."(\d)".;/i;
    var loadMessage = 'Traveling to '+global.cities[destination]+'...';
    
    if (typeof(div) == 'function') {
        callback = div;
        div = null;
    }
    ajaxRequest({
        url: 'remote/' + getIntURL('travel', 'travel'),
        liteLoad: 1,
        data: {
            'destination' : destination || 1,
            'from'        : 'index',
            'zone'        : 1,
            'nextParams'  : ''
        },
        message:  (div ? loadMessage : null), 
        success: function(htmlText) {
            var cityId = doRegex(cityRegex, htmlText).$1 || 0;
            if (mw_updater(htmlText)) {
                if (div) {
                    $('#'+div).html(htmlText);
                }
            }
            log$('travelToCity: '+ cityId);
            callback && callback(parseInt(cityId));
        }
    });
} 

/**
 * Return a valid gift link.<br><br>
 * Usage: <br>
 * {Number} <b>giftId </b> to set the gift ID.<br>
 * {Number} <b>giftCat</b> to set the gift Category.<br>
 * {String} <b>message</b> to show overlay message.<br>
 * @param {Object} options 
 */
function getGiftLink(options) 
{
    try {
        if (typeof(options) !== 'object') {
            throw ReferenceError('options is not defined.');
        }
        if (typeof(options.success) !== 'function') {
            throw ReferenceError('callback is not defined.');
        }
        // do the request
        ajaxRequest({
            url: 'remote/' + getIntURL('requests', 'friend_selector'),
            liteLoad: 1,
            message: options.message,
            data: {
                'req_controller' : 'freegifts',
                'free_gift_id'   : options.giftId || 0,
                'free_gift_cat'  : options.giftCat || 1
            },
            success: function(htmlText) {
                options.success( doRegex(/<fb:req-choice url='([^']+)'/, htmlText).$1 );
            }
        }); 
    }
    catch(err) {
        logErr$(err);
    }
}
/**
 * Convert a long url to a new short url.
 * @param {String} longURL The long url to be shorter.
 * @param {Function} success The function to be executed after finish -> success(shortURL).
 * @param {Function} error The function to be executed if an error happen -> error().
 */
function getShortURL(longURL, success, error)
{
    try {
        if (typeof(success) !== 'function') {
            throw ReferenceError('callback is not defined.');
        }
        if (typeof(longURL) !== 'string' || !/http/.test(longURL)) {
            throw ReferenceError('longURL is not defined.');
        }
        
        // default api set to json-tinyurl
        var _api = {
            name: 'tinyurl',
            url: 'http://json-tinyurl.appspot.com/?callback=?',
            data: { url: longURL }
        };
        
        // if api.bit.ly available, use it.
        if (global.options.get('usebitly') && global.options.get('api_bit_ly_login') && global.options.get('api_bit_ly_key')) {
            _api = {
                name: 'bit.ly',
                url: 'http://api.bit.ly/v3/shorten?callback=?',
                data: {
                    longUrl: longURL,
                    format: 'json',
                    login: global.options.get('api_bit_ly_login'),
                    apiKey: global.options.get('api_bit_ly_key')
                }
            };
        }
        
        // set timeout
        var bAborted = false;
        var nTimeout = setTimeout(
            function() {
                bAborted = true;
                error && error('timeout');
                if (_api.name == 'tinyurl') {
                	
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
 * Get the current city ID.
 * @return {Number}
 */
function getCurrentCity() 
{
    try {
        var cityId = doRegex(/\D+(\d)/, $('#mw_city_wrapper').attr('class')).$1;
        if (parseInt(cityId) < 1) {
            throw Error('unexpected cityId value.');
        }
        return parseInt(cityId);
    } 
    catch (err) {
        logErr$(err);
        return 1;
    }
}

/**
 * get the current Page name.
 * @return {String}
 */
function getCurrentPageName() 
{
    return $('#inner_page').attr('class');
}

/**
 * Return the Date String from the giving milliseconds Number.
 * @param {Number} ms
 * @return {String}
 */
function millisecondsToDateString(ms) 
{
    var pad = function(n) {
        return (n > 9 ? n : '0' + n);
    };
    var dateText = '',s,m,h,d;
    
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    h = Math.floor(m / 60);
    d = Math.floor(h / 24);
    
    dateText += (d > 0 ? d+'d ' : '');
    dateText += ((h=h%24) > 0 ? pad(h) : '00') + 'h ';
    dateText += ((m=m%60) > 0 ? pad(m) : '00') + 'm ';
    dateText += ((s=s%60) > 0 ? pad(s) : '00') + 's';
    
    return dateText
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

// =========================================================
// FACEBOOK CALLS.
// =========================================================
var facebook = {
    
    user_name: 'Unknow',
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
    
    updateSession: function(callback) {
        var fb = this;
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
                	//logErr$(Error('Unable to load facebook session.'));
                    return;
                }
            }
            callback && callback();
        }, true);
    },
    
    init: function() {
        var fb = this;
        this.updateSession(function() {
            //log$(Util.toJSON(facebook.session));
            MWFB.api('/me', function(user) {
                if (user && user.first_name) {
                    fb.user = user;
                } else {
                    try {
                    	fb.user.first_name = unsafeWindow.SNAPI.getCurrentUserInfo().name;
                    } catch (e) {
                    	//logErr$(Error('Unable to load facebook user info.'));
                    }
                }
            });
        });
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
    getAppPermissions: function (permissions, callback) {
        //read_stream, publish_stream, user_groups, offline_access, read_friendlists
        var sql = 'SELECT '+permissions+' FROM permissions WHERE uid=me()';
        MWFB.api({method:'fql.query', query:sql}, function(result) {
            callback && callback(result ? result[0] : null);
        });
    },
    requestPermission: function(permissions, callback) {
        MWFB.ui(
            {method:'permissions.request',perms:permissions}, 
            function(r) {
                facebook.session = r.session;
                callback && callback(r.perms == permissions);
            }
        );
    },
    needAppPermission: function(perms, callback) {
        var bNeedAsk = false;
        this.getAppPermissions(perms, function(values) {
            $.each(values, function (n, v) {
                if (parseInt(v) !== 1) {
                    bNeedAsk = true;
                    return false;
                }
            });
            if (bNeedAsk) {
                facebook.requestPermission(perms, callback);
            }
            else {
                callback && callback(true);
            }
        });
    },
    
    // PUBLISHING METHODS
    streamPublish: function(options, callback) {
        var targetId = (options.target ? String(parseFloat(options.target)) : '');
        var privacy = global.options.get('privacy');
        var attachment = {
            'media': [{
                'type': 'image',
                'src': options.pic,
                'href': options.url
            }],
            'description': String(options.description).replace('{*actor*}', this.user_name),
            'name': String(options.name).replace('{*actor*}', this.user_name),
            'href': options.url
        };
        var actionLinks = [{
            'text': options.actionText,
            'href': options.url
        }];
        this.needAppPermission('publish_stream', function(success) {
            if (success === true) {
		        facebook.restApi('stream.publish', callback, facebook._error, {
		            'target_id'    : targetId,
		            'privacy'      : parseFloat(targetId) > 0 ? '' : $.toJSON(privacy),
		            'attachment'   : $.toJSON(attachment),
		            'action_links' : $.toJSON(actionLinks)
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
    friendsGetAppUsers: function (callback) {
        this.restApi('friends.getAppUsers', callback, this._error);
    },
    
    groupsGet: function(callback) {
        this.restApi('groups.get', callback, this._error);
    },
    
    queryFeed: function(callback) {
        var sql = '';
        sql += 'SELECT strip_tags(attachment), post_id, source_id, target_id, created_time, permalink';
        sql += ' FROM stream WHERE app_id=10979261223 ';
        sql += 'AND source_id in (SELECT target_id FROM connection WHERE source_id=me() AND is_following=1)';
        facebook.updateSession(function() {
            MWFB.api({method:'fql.query', query:sql}, callback, facebook._error);
        });
    }
};

// =========================================================
// PAGES.
// =========================================================
function tofreegiftsPage() {
    do_ajax('mainDiv', 'remote/' + getIntURL('freegifts', 'view'), 0, 1);
    return false;
}
function toOperationsPage() {
    do_ajax('inner_page', 'remote/' + getIntURL('socialmission', 'view'), 1, 1);
    return false;
}

// =========================================================
// CONTROLLERS.
// =========================================================

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
    var _accessToken, _tokenRgx;
    
    if (/html_server/.test(global.href)) {
        // catch a new access_token key
        if ((_tokenRgx = /&access_token=([^&]+)/.exec(global.href))) {
            log$('detected access_token: '+_tokenRgx[1]);
            _accessToken = _tokenRgx[1];
        }
        // make sure it's the real game
        if (document.getElementById('final_wrapper')) {
            // catch chrome 
            if (typeof(chrome) !== 'undefined' && chrome.extension) {
                log$('Chromium browser detected.');
                unsafeWindow = getWindow();
            }
            log$('Mafia Wars Game detected.');
            initStorage();
            initjQuery(_accessToken);
        }
    }
    else if (/apps.facebook.com\/inthemafia/.test(global.href)) {
        if ((_tokenRgx = /#(access_token.+)$/.exec(global.href))) {
            unsafeWindow.location.replace(
                'http://apps.facebook.com/inthemafia/track.php?'+
                'next_controller=index&next_action=view&next_params='+ 
                JSON.stringify( splitUrl(_tokenRgx[1]) )
            );
        }
    }
    //else if (global.href.match(scriptAppInfo.appMeta)) {
    //    updateCheck(document.getElementsByTagName('body')[0].innerHTML);
    //}
    // script died...
    return false;
})(); 

// =========================================================
// END OF ALL CODE.
//
// RESOURCES:
// =========================================================

global.resource = {
    mwaddon_icon: 'data:image/jpg;base64,' +
    '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'+
    'DHQg/9k='
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
    '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'
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
    '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'
    
};  


var nav_play = 'data:image/png;base64,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';
var nav_pause ='data:image/png;base64,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';
var nav_off = 'data:image/png;base64,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';
var nav_on = 'data:image/png;base64,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';

var speedbackground = 'data:image/jpeg;base64,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' +
'2rn0kku2Ppidw00J3Hv8AyoQmjF26F23tAdCyUkkOsfQ/Rhu6IOomeT9Hn/CJN9PaJ38jmeFkpJKdTSD6W/vu2yg2enJkO3QI3TxPZUUkQpt2bfdG6dY5lAgSIPh4oaSIQ//Z/+0MJlBob3Rvc2hvcCAzLjAAOEJJTQQlAAAAAAAQAAAAAAAAAAAAAAAAAAAAADhCSU0D7QA' +
'AAAAAEABIAAAAAQABAEgAAAABAAE4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAE' +
'AL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP/' +
'///////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAI4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADSQAAAAYAAAAAAAA' +
'AAAAAADIAAAFyAAAACgBVAG4AdABpAHQAbABlAGQALQAxAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAFyAAAAMgAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAAB' +
'SY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAMgAAAABSZ2h0bG9uZwAAAXIAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAA' +
'ABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9' +
'uZwAAADIAAAAAUmdodGxvbmcAAAFyAAAAA3VybFRFWFQAAAABAAAAAAAAbnVsbFRFWFQAAAABAAAAAAAATXNnZVRFWFQAAAABAAAAAAAGYWx0VGFnVEVYVAAAAAEAAAAAAA5jZWxsVGV4dElzSFRNTGJvb2wBAAAACGNlbGxUZXh0VEVYVAAAAAEAAAAAAAlob3J6QWxpZ25' +
'lbnVtAAAAD0VTbGljZUhvcnpBbGlnbgAAAAdkZWZhdWx0AAAACXZlcnRBbGlnbmVudW0AAAAPRVNsaWNlVmVydEFsaWduAAAAB2RlZmF1bHQAAAALYmdDb2xvclR5cGVlbnVtAAAAEUVTbGljZUJHQ29sb3JUeXBlAAAAAE5vbmUAAAAJdG9wT3V0c2V0bG9uZwAAAAAAAAA' +
'KbGVmdE91dHNldGxvbmcAAAAAAAAADGJvdHRvbU91dHNldGxvbmcAAAAAAAAAC3JpZ2h0T3V0c2V0bG9uZwAAAAAAOEJJTQQoAAAAAAAMAAAAAj/wAAAAAAAAOEJJTQQUAAAAAAAEAAAAAjhCSU0EDAAAAAAGPgAAAAEAAACgAAAAFgAAAeAAAClAAAAGIgAYAAH/2P/gABB' +
'KRklGAAECAABIAEgAAP/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAw' +
'MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAFgCgAwEiAAIRAQMRAf/dAAQACv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUI' +
'jJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqK' +
'ygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A4npuN0R2EzIzCDY0XG6s2bXODfdU/G22s9/06vs9rd+/0bv0ldqs19P6KXMBbSWl+HM3x7LK3Pzy4/aP8HdtZv2/T/Ren/hFgV4' +
'9lg3MDY7y5rTPwe5qn9gvI0az/tyv/wBKJKduzp/QfQJpdVZYWXbJvMl7RkmobPU/NdXUz/Bf4L+f+0JqMXoVldRtrqqD6qLLXC90tNmR9ntEOsP83j/p9uz2LGGBkGfYz/tysf8AoxE+xWA6sbpyfUr/APSiVpbnUcLpwxQ3DLBleu1h/SF012M3Szc8t242VVk49j/9H9m' +
'/4y3R/Zf1d9U+6ra6251TTkGDUWWXUCx3qez0P0LN359n6NYYwrNYY06d7Kv/AEombhPESxnn+lq/9KoWp1X4HQAwimxtpfS802usLZextV1Xqje303ZW3Oxf+DsZj/8AXqHUqMLGzLmYTRkVEsNReXS1pb6j2WMbY/dkMcfTu/S+l7P0f/BjOFboQxs9z6lX/pVSbhv09vf' +
'j1Khz/wBdStTX3vGn2ev4Q/8A8mml0649eviH9/7atDBvJjaIn/TVcf8Abyn9jsA91TXaiD61Wg00/nkrVTTJsbM0Vj/P/wDJqU2D/A1Enyf/AOTVo4dsbnVM00gXVfxuKZ+GXWPOO1pY3a1531gbwBv2+o+vcz1N22xK1U14sn+YqB8Is/8AJqG57hu+z1Qf6/8A5NW24N4' +
'cS+obTMRbXP8A5+/dSGG8yRUI7fpa4/8APySqam9/airSR+f/AOTTOe7n0Kv+n/5NWXYTyDsrBg+6bax5f6X95QdhZAE+mwD/AI2v8vqJKQF75I9CvT+v/wCTTGwzHoVyOfp/+TVpmE5svyGNFbBLgLWuc4/msZ6bnO/8wQ7Xb7GerW0MmX1tDWtAB0bS5oD/AHNSUgNvP6C' +
'v5b//ACaibA72+k1n8pu6R/nPcrFj22Oabah9IGxjWtY0Nn6NXphrtqHdd6kS1oJ7Na1oH7vp7Goof//Q8ybXW4S61lZGkPDj8/Y1yl6NMf0ikfJ//pNVUkktv0KP+5FP+a//ANJogppnS+iPg/8A9Jqgkgp0BTTrF+P5wLP/AEmnbTTpF9BPjD//AEms5JJTpejRA/T08dh' +
'Z/wCk1JtWPI/S0TJ59T+1+YstJJTptoxSdcigA66iyY8P5tHbTXB2ZGPG7WW2cwP5CxUkEh2jRXGuTjl/bc18f9FqNdtFhDS8tDWhjoImGtD3bZdt3/T2rn0kku2Ppidw00J3Hv8AyoQmjF26F23tAdCyUkkOsfQ/Rhu6IOomeT9Hn/CJN9PaJ38jmeFkpJKdTSD6W/vu2yg' +
'2enJkO3QI3TxPZUUkQpt2bfdG6dY5lAgSIPh4oaSIQ//ZOEJJTQQhAAAAAABVAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAEwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAUwA0AAAAAQA4QklNBAYAAAAAAAcAAgABAAEBAP/' +
'hESxodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWM' +
'wNjMgNTMuMzUyNjI0LCAyMDA4LzA3LzMwLTE4OjEyOjE4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh' +
'0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDo' +
'vL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5' +
'jb20vZXhpZi8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzQgV2luZG93cyIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxMS0wMS0yM1QxNDoxMjo1MiswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTEtMDEtMjNUMTQ6MTI6NTIrMDc6MDAiIHhtcDp' +
'DcmVhdGVEYXRlPSIyMDExLTAxLTIzVDE0OjEyOjUyKzA3OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUzODI0RjMxQzAyNkUwMTE4NDBEOEY3QTQ5OUIxNzFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUyODI0RjMxQzAyNkUwMTE4NDBEOEY3QTQ5OUI' +
'xNzFEIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6RTI4MjRGMzFDMDI2RTAxMTg0MEQ4RjdBNDk5QjE3MUQiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE' +
'5NjYtMi4xIiB0aWZmOk9yaWVudGF0aW9uPSIxIiB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIgdGlmZjpOYXRpdmVEaWdlc3Q9IjI1NiwyNTcsMjU4LDI1OSw' +
'yNjIsMjc0LDI3NywyODQsNTMwLDUzMSwyODIsMjgzLDI5NiwzMDEsMzE4LDMxOSw1MjksNTMyLDMwNiwyNzAsMjcxLDI3MiwzMDUsMzE1LDMzNDMyOzM2MDRDQzg0OEY4OUZDMUNDNDIwMDBDQTU4NTQ2QzQ5IiBleGlmOlBpeGVsWERpbWVuc2lvbj0iMzcwIiBleGlmOlB' +
'peGVsWURpbWVuc2lvbj0iNTAiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpOYXRpdmVEaWdlc3Q9IjM2ODY0LDQwOTYwLDQwOTYxLDM3MTIxLDM3MTIyLDQwOTYyLDQwOTYzLDM3NTEwLDQwOTY0LDM2ODY3LDM2ODY4LDMzNDM0LDMzNDM3LDM0ODUwLDM0ODUyLDM0ODU' +
'1LDM0ODU2LDM3Mzc3LDM3Mzc4LDM3Mzc5LDM3MzgwLDM3MzgxLDM3MzgyLDM3MzgzLDM3Mzg0LDM3Mzg1LDM3Mzg2LDM3Mzk2LDQxNDgzLDQxNDg0LDQxNDg2LDQxNDg3LDQxNDg4LDQxNDkyLDQxNDkzLDQxNDk1LDQxNzI4LDQxNzI5LDQxNzMwLDQxOTg1LDQxOTg2LDQ' +
'xOTg3LDQxOTg4LDQxOTg5LDQxOTkwLDQxOTkxLDQxOTkyLDQxOTkzLDQxOTk0LDQxOTk1LDQxOTk2LDQyMDE2LDAsMiw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwyMCwyMiwyMywyNCwyNSwyNiwyNywyOCwzMDswQjQ5MkZCMTkzODdDQTkwMUM' +
'5MjFDRjdFNjU1QUQ0OSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RTI4MjRGMzFDMDI2RTAxMTg0MEQ4RjdBNDk5QjE3MUQiIHN0RXZ0OndoZW49IjIwMTEtMDE' +
'tMjNUMTQ6MTI6NTIrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzQgV2luZG93cyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RTM4MjRGMzFDMDI2RTAxMTg0MEQ4RjdBNDk' +
'5QjE3MUQiIHN0RXZ0OndoZW49IjIwMTEtMDEtMjNUMTQ6MTI6NTIrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzQgV2luZG93cyIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGV' +
'zY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA' +
'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFl' +
'aIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAABAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAI' +
'EAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMAAAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkM' +
'AAAQ8AAAIDHRleHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPZGVzYwAAAAAAAAAWSUVDIGh0dHA6Ly93d3cuaWVjLmNoAAAAAAA' +
'AAAAAAAAWSUVDIGh0dHA6Ly93d3cuaWVjLmNoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALklFQyA2MTk2Ni0yLjEgRGVmYXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAALklFQyA2MTk2Ni0' +
'yLjEgRGVmYXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGl' +
'uIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdmlldwAAAAAAE6T+ABRfLgAQzxQAA+3MAAQTCwADXJ4AAAABWFlaIAAAAAAATAlWAFAAAABXH+dtZWFzAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAACjwAAAAJzaWcgAAAAAENSVCBjdXJ2AAAAAAA' +
'ABAAAAAAFAAoADwAUABkAHgAjACgALQAyADcAOwBAAEUASgBPAFQAWQBeAGMAaABtAHIAdwB8AIEAhgCLAJAAlQCaAJ8ApACpAK4AsgC3ALwAwQDGAMsA0ADVANsA4ADlAOsA8AD2APsBAQEHAQ0BEwEZAR8BJQErATIBOAE+AUUBTAFSAVkBYAFnAW4BdQF8AYMBiwGSAZo' +
'BoQGpAbEBuQHBAckB0QHZAeEB6QHyAfoCAwIMAhQCHQImAi8COAJBAksCVAJdAmcCcQJ6AoQCjgKYAqICrAK2AsECywLVAuAC6wL1AwADCwMWAyEDLQM4A0MDTwNaA2YDcgN+A4oDlgOiA64DugPHA9MD4APsA/kEBgQTBCAELQQ7BEgEVQRjBHEEfgSMBJoEqAS2BMQE0wT' +
'hBPAE/gUNBRwFKwU6BUkFWAVnBXcFhgWWBaYFtQXFBdUF5QX2BgYGFgYnBjcGSAZZBmoGewaMBp0GrwbABtEG4wb1BwcHGQcrBz0HTwdhB3QHhgeZB6wHvwfSB+UH+AgLCB8IMghGCFoIbgiCCJYIqgi+CNII5wj7CRAJJQk6CU8JZAl5CY8JpAm6Cc8J5Qn7ChEKJwo9ClQ' +
'KagqBCpgKrgrFCtwK8wsLCyILOQtRC2kLgAuYC7ALyAvhC/kMEgwqDEMMXAx1DI4MpwzADNkM8w0NDSYNQA1aDXQNjg2pDcMN3g34DhMOLg5JDmQOfw6bDrYO0g7uDwkPJQ9BD14Peg+WD7MPzw/sEAkQJhBDEGEQfhCbELkQ1xD1ERMRMRFPEW0RjBGqEckR6BIHEiYSRRJ' +
'kEoQSoxLDEuMTAxMjE0MTYxODE6QTxRPlFAYUJxRJFGoUixStFM4U8BUSFTQVVhV4FZsVvRXgFgMWJhZJFmwWjxayFtYW+hcdF0EXZReJF64X0hf3GBsYQBhlGIoYrxjVGPoZIBlFGWsZkRm3Gd0aBBoqGlEadxqeGsUa7BsUGzsbYxuKG7Ib2hwCHCocUhx7HKMczBz1HR4' +
'dRx1wHZkdwx3sHhYeQB5qHpQevh7pHxMfPh9pH5Qfvx/qIBUgQSBsIJggxCDwIRwhSCF1IaEhziH7IiciVSKCIq8i3SMKIzgjZiOUI8Ij8CQfJE0kfCSrJNolCSU4JWgllyXHJfcmJyZXJocmtyboJxgnSSd6J6sn3CgNKD8ocSiiKNQpBik4KWspnSnQKgIqNSpoKpsqzys' +
'CKzYraSudK9EsBSw5LG4soizXLQwtQS12Last4S4WLkwugi63Lu4vJC9aL5Evxy/+MDUwbDCkMNsxEjFKMYIxujHyMioyYzKbMtQzDTNGM38zuDPxNCs0ZTSeNNg1EzVNNYc1wjX9Njc2cjauNuk3JDdgN5w31zgUOFA4jDjIOQU5Qjl/Obw5+To2OnQ6sjrvOy07azuqO+g' +
'8JzxlPKQ84z0iPWE9oT3gPiA+YD6gPuA/IT9hP6I/4kAjQGRApkDnQSlBakGsQe5CMEJyQrVC90M6Q31DwEQDREdEikTORRJFVUWaRd5GIkZnRqtG8Ec1R3tHwEgFSEtIkUjXSR1JY0mpSfBKN0p9SsRLDEtTS5pL4kwqTHJMuk0CTUpNk03cTiVObk63TwBPSU+TT91QJ1B' +
'xULtRBlFQUZtR5lIxUnxSx1MTU19TqlP2VEJUj1TbVShVdVXCVg9WXFapVvdXRFeSV+BYL1h9WMtZGllpWbhaB1pWWqZa9VtFW5Vb5Vw1XIZc1l0nXXhdyV4aXmxevV8PX2Ffs2AFYFdgqmD8YU9homH1YklinGLwY0Njl2PrZEBklGTpZT1lkmXnZj1mkmboZz1nk2fpaD9' +
'olmjsaUNpmmnxakhqn2r3a09rp2v/bFdsr20IbWBtuW4SbmtuxG8eb3hv0XArcIZw4HE6cZVx8HJLcqZzAXNdc7h0FHRwdMx1KHWFdeF2Pnabdvh3VnezeBF4bnjMeSp5iXnnekZ6pXsEe2N7wnwhfIF84X1BfaF+AX5ifsJ/I3+Ef+WAR4CogQqBa4HNgjCCkoL0g1eDuoQ' +
'dhICE44VHhauGDoZyhteHO4efiASIaYjOiTOJmYn+imSKyoswi5aL/IxjjMqNMY2Yjf+OZo7OjzaPnpAGkG6Q1pE/kaiSEZJ6kuOTTZO2lCCUipT0lV+VyZY0lp+XCpd1l+CYTJi4mSSZkJn8mmia1ZtCm6+cHJyJnPedZJ3SnkCerp8dn4uf+qBpoNihR6G2oiailqMGo3a' +
'j5qRWpMelOKWpphqmi6b9p26n4KhSqMSpN6mpqhyqj6sCq3Wr6axcrNCtRK24ri2uoa8Wr4uwALB1sOqxYLHWskuywrM4s660JbSctRO1irYBtnm28Ldot+C4WbjRuUq5wro7urW7LrunvCG8m70VvY++Cr6Evv+/er/1wHDA7MFnwePCX8Lbw1jD1MRRxM7FS8XIxkbGw8d' +
'Bx7/IPci8yTrJuco4yrfLNsu2zDXMtc01zbXONs62zzfPuNA50LrRPNG+0j/SwdNE08bUSdTL1U7V0dZV1tjXXNfg2GTY6Nls2fHadtr724DcBdyK3RDdlt4c3qLfKd+v4DbgveFE4cziU+Lb42Pj6+Rz5PzlhOYN5pbnH+ep6DLovOlG6dDqW+rl63Dr++yG7RHtnO4o7rT' +
'vQO/M8Fjw5fFy8f/yjPMZ86f0NPTC9VD13vZt9vv3ivgZ+Kj5OPnH+lf65/t3/Af8mP0p/br+S/7c/23////uAA5BZG9iZQBkgAAAAAH/2wCEAAgGBgYGBggGBggMCAcIDA4KCAgKDhANDQ4NDRARDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBCQgICQo' +
'JCwkJCw4LDQsOEQ4ODg4REQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIADIBcgMBIgACEQEDEQH/3QAEABj/xACSAAACAgMBAAAAAAAAAAAAAAACBAADAQUHBgEBAQEAAAAAAAAAAAAAAAAAAAECEAACAQMBBAUHBwcKAwkAAAABAgM' +
'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' +
'RqUDx3DsVg9kdikqlBsfq/oqla6pVH//Z';

var speedAnchor = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAACKpJREFUSEs1lglUVeUahjcClasyw6GQq2ktu9lgq7xiiqkoKoNDSuaACqJ2UXJAkUFE5WCooUGZJKIyqSCcA4f5MMogLNEsE1SUSQUZBGdFEeS53zl0/8W7vr3/w97v//7/+33fNqKzE0yeK3NCSxXd+XoFkzcURekjf0YSUYx4Xekx7VB6ejoUo0cy0+dV+e2lXHQpSk+3opiaKkp3j6J0dQrkHkHf/jKH8t34d5R4z1mKkYnMdfbIzJRAlG+OoMyJRrH9BWVmKIrdr3ItcAjBeHowrzse5svoRsZHVTFRMDamhi9O3mJsZBXTYi6zJq+N0OsQXAE+hfewP3penpX3jN/Jky5QluyJRVl8itemhfLqzBD62B/E2CHMANNZv2PyzQH62f+Oqd1BPj10iSFh1Qz97TqjwisZF/U3nx27xifHahgdXsGoX8px1lRxquouiZdb8b34UhYfxsKgkyjK4jgUmwCUaVGiRK9GVNiFCQ6i2EucdQhltqi1CcZyTwFpVxvIq2/DMeYPRh+qYtzRK0w4WsG4Y1cZE1HNR+HXsfzlHOF/dhBX0cHUQ5Uo8+RdyqKjTPLKZKyPBktvDV95JQuSGOcp91vUTNyYx2jfJMa4RVJz/wnhZ2sIzKngfnc3a9KusiD5Fou1NSzS1rIwuYZv1bXMjq/GRVNLcl0H4X+19W6hsiSCrzakCJEaSy+1gWjcliS+3pqGlW8qE7dp+cIvm/WheVxoamduUiULk9pJuVKP+lwTy3Pu4p7dwlo9spr5Xncb16xWliZUEVf9lPh68cBc2SnjZVGMWSskvqLGJ4kJ3ilM/Idkkl8GVjtFlX8+87Yn0PLkCetTq1iSXMvtRy/YV3ydDVlteOhaBM1szGzCXXeLlbomXFPqOXiuhcRGMYLDz2Jfp2N86ZbAeH8tVn6poiSdSdsymLwtkyn+Oqx35GAv96NVyQRGl2EYPc/IuHqPtbm32VzQJGhjU34rG3JbWJ/TgFt2K6vTG/ip+CbqZiGyFyLTZdF84XqCqf7pfL09Q6CP6UzemYm1SsfMwBym/VjC5B9P4xSUwks5G/3YV1KPR1EbvkUtbClqxbOwhc2nm/DIb2aTrp41WU2oihtJNxCFoJgsPcZnLrFM25HJpB0ZTBGCKQFZTNslBAK73XnY7D2D7Z5CHPek86jjRS9RWSOeZ9rxLxEbn2nDp+QO3kLqWSgx9yZrdI2oSm7/QySKTFyiGbU8CpvAbKxUmUyVqCeYsTvfALufCrANLmLu/mJmBmVz5+Fz/d6xr/QWvuUPUJXdZYfAX8j8ilvwKrqDT34j62QbdxY2IL4wJL1i4hzF56tOYPuTrFxearcnX1YvBHtPYy8EDj8XM/vnQuaFFmIdlEfj3adC9JKQs7fxO/+YoPK77Cq/R+DZdgJKW/HTqyzSb2ErqqIGsu/8c0aKUwTDneMxc41lmEcao7bqGC/nMjH4LA7B+TiEnGG2ZPz8A2ex3ltMQ/tTXkrZ2l92B9WFZwRfeMD2C+2oSpvwLm7jv6fvisUbcExrxFl9ldjbQmSrzyMhGumWQv/VCQxcp2WgeyLm6zQMck/mX1t0fOiVzic+GYwRB77voaWu5SHP6cInp551RbL6gkZWF7fjUvCEFelNLEq9IYlbjW3SLRbGXyGy4f9Ey48w4nst5hvTMNugjxmM9M9lRoCGAUI2YutpPvIv4JMd+ZhvSqe29SFP6WZzbj2uhffxFJetLHrMkox7+ObU4ZbXyHfaeuy0zTieuEJ4vf6MpKwpzkcYukrDyO1FmG3UMnh9Gpa7Mg3O2q0+w3vemXwqJF+q8hjunW5Q1C1ntFl3A9fc+7jndeCWVY364g3R2cP67Grma28xPbmJOdGVHL4hRLMOCNHSSCxWneLz4HL6e2ZgtjWPz7ekCY30KRkbTlzkI8mvUcGl/Nu7hJvNvWZYJ7myIP8eC3JvEFreZpjTP7M6+RoO2kZmJLVgd+wPfq3Tm0GvyCmKYasS+Hh3Ce8ElPCeTxqvrIrlvjx2PPcvTOVcRv9YLrlVhKUqjZZHeqLneGRdZ1lqm5SbRqbGN5BR2cJjUWQffQ675AZspPbYRv2FqkJahYNekdS64a6nGBVwmuH7/2CYTz6vbktln/aiQdG80AIsxAhD951nbMh5HjyXLibj+8wb2KQ9xEFs5VVwzaDoxN/NWCXUY59Qi01cHTbRV/D5s0sU6V3nHMkHrgm855nOh2GXGeifh8WOUkZsiuNBV28VSKq8ifUBHfa71HR29xjmPBLLWKmppPjmPcP9g57nzIq5gK2miRmnqph+/BqTY6txzX8g/UyvyDmW91cmMmzFUT6IuMbQwEJG+JdirjqDZVCxvKK3tunHs65OnhlmOuno7lUGL8SFiKUvYR1fw6wTtcw4WYd1bA1W0TXME/cpjr/p+1GUmCETi9n7Dds2RFXGQO9sLKQHDfbN5mOP45Q19K5aX3p6ifVG6VV2sfExM4OzGPvbJazCapn4+zXGhV1iwuHLjD1cwfiIGpRvpUv3+TZMkjWHgeKMIdK+392UwSCPVAZvyaD/plT6bS7mtaUxTN6uJiDxPJrym2jO1rFXcw77vdkM+kHN8J1FDNteyMht2Xwo+ECcO9RbxxBJDTPffJT50sq/CYqXj5No3loWw4Dp+zCbHsLg+RGYuyRi4ZbGwNXJvC3xDfdMTNZkYrQikVdc4ui7Wo2ZV6kgmyEeGoatS+TdjacwX6/F4odUzH9IwWxtEsrCKObu1aC86BH7TfCTj7BITJfLw3MjeHNOOK/IR0nf+ZG8tfQ4/ZYdlyiLcTrCm0Ly1oqTDFoRywCp/G+7xmHmHMeA5fH0c1ELTtJX/sfUJQFlwWGU/7jzVFJMkSPmqWy3k3wSGX8XjuIUY4CxHktiMHKKpo9c62EkMFkai7HASHZBWRxlmDd26p0zROnYiixMWXQEx+BknvQeJf8DZA75YlEGKf4AAAAASUVORK5CYII=';

function getRandRange(_iLow, _iHigh) {
    return Math.floor((_iHigh - _iLow) * Math.random()) + _iLow;
}

function speedHandler() {
 const ERROR_SUCCESS = 0;
 const ERROR_BAD_RESPONSE = 1;
 const ERROR_UNKNOW_ACTION = 2;
 var _this = this;
 var tablog;
 var _Util = {
     isValid: function(feed) {
         var me  = parseFloat(facebook.session.uid); 
         var sid = parseFloat(feed.source_id);
         var tid = feed.target_id ? parseFloat(feed.target_id) : null;
         return (sid !== me && (tid == null || tid == me));
     },
     toIntUrl: function(url) 
     {
         if (typeof(url) !== 'string' || url.indexOf('?') == -1) {
             return '';
         }
         var params = splitUrl(url), a, b;
         var sOutUrl = 'remote/' + getIntURL(params.next_controller, params.next_action);
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
     },
     clean: function(data) 
     {
         if (typeof(data) !== 'string') {
             return data;
         }
         var obj = $('<div>'+ data.replace(/<div[^>]*>/g, '<div>') +'</div>');
         $('img, .sexy_button_new, div:empty', obj).remove();
         return obj.html();
     },
     getLength: function(obj) 
     {
         var len = 0;
         for (var i in obj) {
             len++;
         }
         return len;
     },
     getFixedLength: function(obj) 
     {
         var len = 0;
         for (var i in obj) {
             if (obj[i] !== undefined) len++;
         }
         return len;
     },
     getActionName: function(url) {
         if (typeof(url) == 'string' && /next_controller/.test(url)) {
             var u = splitUrl(url);
             if (((u.next_controller=='job')&&(u.next_action!=='collect_loot'))||((u.next_controller=='story')&&(u.next_action.indexOf('give_help')!=-1))) {
                if ((u.cityId==1)||(u.cityId==3))
                   return u.next_controller + '_' + u.next_action+ '_' + u.cityId + '_' + u.jobId;
                else   
                   return u.next_controller + '_' + u.next_action+ '_' + u.cityId;
             } else
                return u.next_controller + '_' + u.next_action;
         }
         else {
             return '';
         }
     },
     urlFromStream: function(stream) {
         if (!(stream && stream.attachment)) {
             return '';
         }
         var att = stream.attachment;
         
         if (att.href) {
             return att.href;  
         }
         if (att.media[0] && att.media[0].href) {
             return att.media[0].href; 
         }
         return '';
     },
     /**
      * @param {jQuery} obj
      */
     getUrl: function(obj) {
         if (!obj.length || !obj.attr) 
             return '';
             
         var url = obj.attr('href');
         
         if (typeof(url) == 'string' && url.match('http')) {
             return url;
         }
         return doRegex(/['"](remote[^'"]*)/, obj.attr('onclick')).$1;
     },
     isChecked: function(selector, context) {
         if (typeof(selector) == 'undefined') {
             return true;
         }
         return $(selector, context).attr('checked');
     },
     filterText: function(filterName, text) {
         var RegText = String(streamOptions.get(filterName)).replace(/\n+/g,'|');
         
         if ((new RegExp(RegText, 'i')).test(text)) {
             return true;
         }
         return false;
     },
     filterFriends: function(_id, _key) {
         //var _sourceText = String(options.get('friendFilter')).replace(/\n+/g,'|');
         var _sourceText = String(streamOptions.get('friendFilter'));
         
         if ((new RegExp(_id+':.+:'+_key,'g')).test(_sourceText)) {
            return true;
         }
         return false;
     }
 };
 
 var fightoptions = new Config('speedbfopt', {
       fightin         : 6,                             
       useHeal         : false,                         
       healIn          : 1,                             
       healWhen        : 100,                           
       useBank         : true,                          
       useBankWhen     : 5000,                          
       usebankcity     : 6,                             
       useAttackDelay  : false,                         
       attackDelay     : 2,                             
       skipLevel       : true,                          
       skipLevelWay    : 1,                             
       skipLevelOf     : 1500,                          
       skipMafia       : false,                         
       skipMafiaWay    : 1,                             
       skipMafiaOf     : 501,                           
       addUserToWList  : false,                         
       cashNeedToGain  : 300000,                        
       useAttackCount  : true,                          
       attackCounter   : 16,                            
       skipIced        : true,                          
       skipNoCash      : false,                         
       usePowerAttack  : true,                          
       attackEvenLost  : false,                         
       useNameFilter   : false,                         
       nameFilterRgx   : ' ', 
       showloot        : true,                          
       showstash       : false,                         
       showcoins       : false,                         
       showhelp        : false,                         
       showBlackListed : false,                          
       showWhiteListed : false,                          
       useBlacklist    : true,                          
       stopBeforeLvlUp : false,                         
       expLeftToStop   : 50,                            
       stopWhenStamina : false,                         
       staminaToKeep   : 100,                           
       skipNoFaction   : false,                         
       useFactions     : false,                         
       bangkokFaction  : 'any',                         
       showDialogs     : false,                         
       blackList       : {},                            
       whiteList       : {}                             
 });
 var speedoptions = new Config('speedopt', {
     playStream: false,
     playFight: false,
     playProperty: false,
     playtimer:{
     	1:{name:'reader',value:1},
     	2:{name:'war',value:1},
     	3:{name:'job',value:2}
     },
     limitCycle : 3,
     last_created_timex : 0,
     post_id: 0
 });
 var streamOptions =  new Config('speedstreamopt', {   
     doGotowar                :{doing:true, rf: false, ff: false},
     doNewYorkJob             :{doing:true, ff: true}, 
     doCubaJob                :{doing:true, ff: true},
     doMoscowJob              :{doing:true, ff: true},
     doBangkokJob             :{doing:true, ff: true},
     doVegasJob               :{doing:true, ff: true},
     doItalyJob               :{doing:true, ff: true},
     doSpecialPart            :{doing:true},
     doNYPropertyhelp         :{doing:true},
     doPropertyinitial        :{doing:true},
     doPropertyfinal          :{doing:true},
     doV_IPropertyHelp        :{doing:true, ff: true, pf:true},
     doGetapropertyboost      :{doing:true},
     doGetacustomer           :{doing:true},
     doJoininamission         :{doing:false, ff:true, mf:true},
     doClaimOperationreward   :{doing:true},
     doMissionreward          :{doing:true},
     doGetaphone              :{doing:true},
     doRobberMastery          :{doing:true},
     doSendEnergy             :{doing:true},
     doCollectaloot           :{doing:true, sf:true},
     doSecretStash            :{doing:true},
     doAcceptGiftEvent        :{doing:true},
     doGetarchivementreward   :{doing:true},
     doGiftEventLoot          :{doing:true},
     doWarReward              :{doing:true},
     doIcebonus               :{doing:true},
     
     isShowIgnorring : true,
     useRewardFilter:false,
     useFriendWar:false,
     useFriendJob:true,
     useFriendProp:true,
     useFriendMission:true,
     usePropertyFilter:true,
     useMissionFilter:true,
     useStashFilter:true,
     missionEnergy:true,
     missionStamina:true,
     rewardFilter: 'Attack: [6-9][0-9]\nDefense: [6-9][0-9]',
     propertyFilter: 'Stone Columns\nTerracotta Tiles\nMarble Slabs\nItalian Hardwood',
     stashFilter: 'Health Kit',
     missionFilter: '',
     friendFilter: ''
 });
 
 var _Actions = {
     war_view: {
         name      : 'Go to war', 
         Group     : 1,
         repeat    : 'a:regex(href,xw_action=attack)',
         success   : /(You won the fight[^<]*|This war is already[^<]*|You have already[^<]*)/i,
         filtered  : true,
         key       : 'W'
     },
     war_share_reward_feed_click           : { name: 'War Reward', Group: 5},
     
     job_give_help_1_73                    : { name: 'New York Job',filtered: true, Group: 2, key: 'N'},
     job_give_help_2                       : { name: 'Cuba Job',filtered: true, Group: 2, key: 'C'},
     story_give_help_moscow_social_3_76    : { name: 'Moscow Job',filtered: true, Group: 2, key: 'M'},
     story_give_help_social_4              : { name: 'Bangkok Job',filtered: true, Group: 2, key: 'B'},
     story_give_help_social_5              : { name: 'Vegas Job',filtered: true, Group: 2, key: 'V'},
     story_give_help_social_6              : { name: 'Italy Job',filtered: true, Group: 2, key: 'I'},
     propertyV2_cs_redeem_special_item_feed: { name: 'Special Part', Group: 3},
     propertyV2_cs_help_item               : { name: 'NY Property help', Group: 3},
     propertyV2_cs_help_initial            : { name: 'Property initial',Group: 3},
     propertyV2_cs_help_final              : { name: 'Property final', Group: 3},
     propertyV2_itemFeedHelp               : { name: 'V_I Property Help', Group: 3, filtered:true, key: 'P'},
     propertyV2_getBoost                   : { name  : 'Get a property boost', 
                                               group : 3,
                                               next  : '.message_body .sexy_button_new:regex(href,xw_action=getBoost)'
                                             },
     propertyV2_getCustomer          : {name: 'Get a customer',Group: 3},
     socialmission_joinMission       : {name: 'Join in a mission', group: 4, next: doOperation, filtered:true, key: 'O'},
     socialmission_rewardBrag        : {name: 'Claim Operation reward', Group: 4},
     quest_questFeedReward           : {name: 'Mission reward', Group: 4},
     robbing_call_for_help_get_phone : {name: 'Get a phone',Group: 5}, 
     robbing_mastery_bonus           : {name: 'Robber Mastery', loop:true, Group: 5}, 
     index_send_energy_mbox          : {name: 'Send Energy', Group: 5,
     	                                  next: '.message_body .sexy_button_new:regex(onclick,xw_action=send_energy_mbox)'}, 
     job_collect_loot                : {name: 'Collect a loot', group: 5},
     fight_collect_fight_loot        : {name: 'Secret Stash', Group: 5,
     	                                  next: '.message_body .sexy_button_new:regex(onclick,xw_action=collect_fight_loot)'}, 
     freegifts_acceptGiftEvent       : {name    : 'Accept Gift Event', group: 5,
                                        success : /padding:\s*10px\s*20px;\s*margin:\s*5px\s*0px[^>]*>([^<]+)</i},      
     index_ach_celeb                 : {name: 'Get achievement reward', group: 5, 
     	                                  next: '.message_body .sexy_button_new:regex(href,xw_action=ach_celeb)'},
     lootladderevent_share_feed_click: {name: 'Gift Event Loot',Group: 5},
     index_iced_boost_claim          : {name: 'Ice bonus',Group: 5}
     
     	                                  
 };
var actionName = function(action) {
      return 'do'+ action.name.replace(/\s*/g, '');
    };

 
function doOperation(htmlText, callback) 
{
    if (e$('.socialMissionSelector', htmlText) == null) {
        callback('You can\'t join. Try helping out other mafia members.');
        return;
    }

    var joinButton;
    //var n_free  = options.get('maxFreeSlots');
    var s_name  = $('.missionSelectHeaderTitle', htmlText).text();
    var s_diff  = $('.missionDifficulty > span', htmlText).attr('class');
    //var spend   = $('#feedstream_joinmission').val();
    var query   = 'a:regex(onclick,action=selectPosition)';
    var n_slots = $(query, htmlText).length;
    
    log$('slots: '+ n_slots);
    GM_log('slots: '+ n_slots);

    var msgOp = s_name + ' ['+s_diff+']';
    //log$('slots: '+ n_slots);
    
    //if (n_free > 0 && n_slots > n_free) {
    //    callback('Mission '+ s_name + ' skipped: too many slots free ('+n_slots+').');
    //    return;
    //}
    
    //log$('n:'+s_name + '  d:'+s_diff);
    
    //if (!options.get('diff_' + s_diff.toLowerCase())) {
    //    callback('Mission '+ s_name + ' skipped: difficulty don\'t match.');
    //    return;
    //}
    
    $('.missionSelectorBox:has('+query+')', htmlText).each(function(index,elem) {
        var hasEnergy  = e$('dd.energy', elem);
        var hasStamina = e$('dd.stamina', elem);
        var bValid = false;
        var btnTx = '<br>';
        if (hasEnergy!==null) btnTx += 'Energy : ' + hasEnergy.text();
        if (hasStamina!==null) btnTx += (hasEnergy!==null ? ' and ':'') + 'Stamina : ' + hasStamina.text();
        btnTx += '  <div>'+$('div.missionSelectorButton', elem).html()+'</div>';
        
        msgOp += btnTx;
    });
    if (n_slots>0)
       callback(msgOp);
    else 
       callback(msgOp + '<br>No free slot.');
}

 var listStream = {
 	 1:{_event:0, Refresh_Timer:undefined},
 	 2:{list:undefined,_event:0},
 	 3:{list:undefined,_event:0},
 	 4:{name:'fight',_event:0},
 	 5:{name:'collect',_event:0}
 }
 //var timerReaderCycle;
 var unfinish_Timer;
 var List = function(_aParams) {
     var Self = this;
     this.First  = null;
     this.Last   = null;
     // empty list
     this.Erase  = function() {
         var pointer = this.First;
         var hold;
         while (pointer != null) {
             hold = pointer.Next;
             pointer = null;
             pointer = hold;
         }
         this.First  = null;
         this.Last   = null;
     };
     this.Run    = function() {
         var oHold;
         if (this.First == null) {
            var iCycle = setTimeout(function () {listStream[_aParams].list.Run()}, speedoptions.get('playtimer')[_aParams].value*1000);
         } else {
             oHold = this.First;
             this.First = oHold.Next;
             oHold.Process();
         };
     };
     this.Append = function(_data) {
         if (this.First == null) {
             this.First  = _data;
             this.Last   = _data;
         } else {
             this.Last.Next  = _data;
             this.Last   = _data;
         };
     };
     this.Insert = function(_data) {
         if (this.First == null) {
             this.First  = _data;
             this.Last   = _data;
         } else {
             _data.Next  = this.First;
             this.First  = _data;
         };
     };
 }

 var headerAttr = {
 	   stream_msg   : c$('td','L0-msg').css({'float':'left','position': 'absolute','left': '21px','top' : '43px',
        	          'text-align':'left','font-size':11,'vertical-align':'middle'}),
 	   reader_msg   : c$('td','R0-msg').css({'float':'left','position': 'absolute','left': '435px','top' : '43px',
        	          'text-align':'left','font-size':11,'vertical-align':'middle'}),
 	   fighting_msg : c$('td','Bot-msg').css({'float':'left','position': 'absolute','left': '21px','top' : '76px',
        	          'text-align':'left','font-size':11,'vertical-align':'middle'}),
     war_value    : c$('h2','war-value').css({'float':'left','position': 'absolute','left': '648px','top' : '44px',
        	          'text-align':'center','vertical-align':'middle','opacity' : 0.5}),
     job_value    : c$('h2','op-value').css({'float':'left','position': 'absolute','left': '685px','top' : '44px',
        	          'text-align':'center','vertical-align':'middle','opacity' : 0.5}),
     other_value  : c$('h2','oth-value').css({'float':'left','position': 'absolute','left': '723px','top' : '44px',
        	          'text-align':'center','vertical-align':'middle','opacity' : 0.5}),
     //message_body : c$('div','logbox').css({'float':'left', 'overflow': 'scroll', 'overflow-x': 'hidden',
     // 	            'fontFamily':'arial','font-weight':'normal','font-size':'11px', 'left': '5px', 'top': '5px', 'bottom': '5px', 'right': '5px', 'padding':'3px', 'margin':'2px'})
     message_body : {
     	Generic:undefined,
     	War:undefined,
     	Mission:undefined,
     	Fight:undefined,
     	Loot:undefined,
     	Request:undefined
     }
 }
 function addCounter(names, add) {
 	 var txval = parseInt(headerAttr[names].text())+(add?1:-1);
 	 headerAttr[names].text(String((txval>0?txval:0)));
 }
 var configVisible = false;
 var thisAnchor = false;
 var speedEvent = {
   playClick: function() {
   	 var play = !speedoptions.get('playStream');
   	 speedoptions.set('playStream',play);
     $('#speed_navplay').attr('style','display:'+(play? 'none':'block'));
     $('#speed_navpause').attr('style','display:'+(play? 'block':'none'));
     if (play) {
        addCounter('war_value',false);
        addCounter('job_value',false);
        addCounter('other_value',false);
        clearTimeout(listStream[1]._event);
        clearTimeout(listStream[2]._event);
        clearTimeout(listStream[3]._event);
        listStream[2].list.Erase();
        listStream[3].list.Erase();
        doPlaying();
     } else {
        // Clear all timers.
        addCounter('war_value',false);
        addCounter('job_value',false);
        addCounter('other_value',false);
        clearTimeout(listStream[1]._event);
        clearTimeout(listStream[2]._event);
        clearTimeout(listStream[3]._event);
        addToLog('Generic','<span style="color:#00FFCC;"> Stop processing wall.</strong>!</span>');
     	  global.readerCycle.stop();
     }
     speedoptions.save();	  
     return play;
   },
   fightClick: function() {
   	 var play = !speedoptions.get('playFight');
   	 speedoptions.set('playFight',play);
     $('#speed_nav0_On').attr('style','display:'+(play? 'block':'none'));
     $('#speed_nav0_Off').attr('style','display:'+(play? 'none':'block'));
     clearTimeout(listStream[4]._event);
     if (play) {
     	  listStream[4]._event = setTimeout(function () { global.speedBattle.start();}, 10000); 
     	  addToLog('Fight','<span style="color:#00FFCC;"> Fighting at critical health is ON!</strong></span>'); 
     } else {
     	  global.speedBattle.stop();
     	  addToLog('Fight','<span style="color:#00FFCC;"> Fighting at critical health is OFF!</strong>!</span>'); 
     }
     speedoptions.save();	  
     return play;
   },
   collectClick: function() {
   	 var play = !speedoptions.get('playProperty');
   	 speedoptions.set('playProperty',play);
     $('#speed_nav1_On').attr('style','display:'+(play? 'block':'none'));
     $('#speed_nav1_Off').attr('style','display:'+(play? 'none':'block'));
     if (play) {
     	  listStream[5]._event = setTimeout(function () { CollectProperties();}, 10000); 
     } else {
     	  clearTimeout(listStream[5]._event);
     }
     speedoptions.save();	  
     return play;
   },
   configClick: function() {
     _this.configVisible = !_this.configVisible;
     if (_this.configVisible) {
     $('#logContainer').animate({'top': 500}, 'normal', function() {
        $('#btn_saveconf').fadeIn(1000);
        
     });
     $('#speedheader').animate({'height': 500}, 'normal', function() {
        //$('#config_panel').fadeIn(500);
     });
     } else {
     $('#btn_saveconf').fadeOut(500);
     $('#logContainer').animate({'top': 102}, 'normal', function() {
     	
     });
     $('#speedheader').animate({'height': 102}, 'normal', function() {
        //$('#config_panel').fadeIn(500);
     });
     }
     return;
   },
   anchorClick: function() {
     _this.thisAnchor = !_this.thisAnchor;
     return;
   },
   save_configclick: function() {
 	   fightoptions.fromDomElements();
 	   fightoptions.save();
 	   
 	   saveSpeedOpt(); 
 	   
 	   saveStreamOpt();
 	   
     speedEvent.configClick();
     return;
   },
   clearLog: function() {
   	 if (tablog.getActiveTabID()==3) {
   	 	  headerAttr.message_body['Fight'].html('');
   	 	  headerAttr.message_body['Loot'].html('');
   	 } else
   	    tablog.getLayout(tablog.getActiveTabID()).html('');
   },
   fight_profileclick: function() {
   	  var elem = e$('#fight_profile', tablog.getLayout(3));
   	  if (elem && elem.val()!=='') {
   	     global.speedBattle.fightProfile(elem.val());
   	  }
   }
 }
 this.createDom = function() {
    var wDom = 750, wlDom = 7;
    var speed_container = (e$('#speed_menu_container') || 
        c$('div', 'speed_menu_container').prependTo('#final_wrapper'));
        //'#000018',
    function createFirstDom() {
      var menuElt = c$('div', 'speed_menu').prependTo(speed_container).css({
            'background-color': 'transparent',
            'position': 'absolute',
            //'opacity' : 0.95,
            'z-index': 30,
            'top': 10,
            'left': wDom+10-wlDom,
            'width': wDom,
            'height': 500,
            'border': '1px solid #CDCDCD',
            'border-left-width': '1px',
            'border-right-width': '1px',
            'font-size': 10,
            'font-weight': 'bold',
            'overflow-y': 'hidden'
      });
      menuElt.mouseleave(function() {
        if (!_this.thisAnchor)
           $('#speed_menu').stop().animate({
               'left': (wDom+10-wlDom)+'px'
           }, 'normal');
      });
      menuElt.mouseenter(function() {
        $('#speed_menu').stop().animate({
            'left': wlDom+'px'
        }, 'normal');
      });
      var header = c$('div', 'speedheader').appendTo(menuElt)
        .css({'background-color':'#000000','position': 'absolute','height': 102,'z-index': 1001,'border':'0px','overflow': 'hidden'})
        .append(c$('img',{'width': 750,'height': 101,'src': speedbackground}))
        .append(headerAttr.war_value.text('0'))
        .append(headerAttr.job_value.text('0'))
        .append(headerAttr.other_value.text('0'))
        	
        .append(headerAttr.stream_msg.text('No current helped.'))
        .append(headerAttr.reader_msg.text('Stream ready!'))
        .append(headerAttr.fighting_msg.text('Hold on fighting...'));
      //play/pause
      var eltCol = c$('td','speed_playOnOff').css({'float':'left','left': '290px','top' : '11px', 'width':'19px','height':'20px','position': 'absolute','cursor': 'pointer'}).click(speedEvent.playClick);
      eltCol.append(c$('img',{'id':'speed_navplay','width': 19,'height': 20, 'title':'Play stream helper', 'src': nav_play,'style':'display:'+(speedoptions.get('playStream')?'none':'block')+';'}))
      .append(c$('img',{'id':'speed_navpause','width': 19,'height': 20, 'title':'Pause stream helper', 'src': nav_pause,'style':'display:'+(speedoptions.get('playStream')?'block':'none')+';'}))
      .appendTo(header);
      //fight btn
      eltCol = c$('td','speed_navFightOnOff').css({'float':'left','left': '311px','top' : '11px', 'width':'19px','height':'20px','position': 'absolute','cursor': 'pointer'}).click(speedEvent.fightClick);
      eltCol.append(c$('img',{'id':'speed_nav0_On','width': 19,'height': 20, 'title':'Play fighting', 'src': nav_on,'style':'display:'+(speedoptions.get('playFight')?'block':'none')+';'}))
      .append(c$('img',{'id':'speed_nav0_Off','width': 19,'height': 20, 'title':'Pause fighting', 'src': nav_off,'style':'display:'+(speedoptions.get('playFight')?'none':'block')+';'}))
      .appendTo(header);
      //collect property btn
      eltCol = c$('td','speed_navCollectOnOff').css({'float':'left','left': '332px','top' : '11px', 'width':'19px','height':'20px','position': 'absolute','cursor': 'pointer'}).click(speedEvent.collectClick);
      eltCol.append(c$('img',{'id':'speed_nav1_On','width': 19,'height': 20, 'title':'Play Auto collecting', 'src': nav_on,'style':'display:'+(speedoptions.get('playProperty')?'block':'none')+';'}))
      .append(c$('img',{'id':'speed_nav1_Off','width': 19,'height': 20, 'title':'Pause Auto collecting', 'src': nav_off,'style':'display:'+(speedoptions.get('playProperty')?'none':'block')+';'}))
      .appendTo(header);
      //configuration
      eltCol = c$('td','speed_navconfOnOff').css({'float':'left','left': '353px','top' : '11px', 'width':'19px','height':'20px','position': 'absolute','cursor': 'pointer'}).click(speedEvent.configClick);
      eltCol.append(c$('img',{'id':'speed_nav1_On','width': 19,'height': 20, 'title':'Config', 'src': nav_on,'style':'display:block;','cursor': 'pointer'}))
      .appendTo(header);
      //anchor
      eltCol = c$('td','speed_anchorOnOff').css({'float':'left','left': '720px','top' : '11px', 'width':'19px','height':'20px','position': 'absolute','cursor': 'pointer'}).click(speedEvent.anchorClick);
      eltCol.append(c$('img',{'id':'speed_anchor','width': 20,'height': 20, 'title':'Lock/Unlock this !', 'src': speedAnchor,'style':'display:block;','cursor': 'pointer'}))
      .appendTo(header);
      
      eltCol = c$('div','logContainer').css({'float':'left','position': 'absolute','z-index': 1010,
      	'left':'0px','right':'0px', 'bottom':'0px','top':102, 'background-color':'#000000','opacity':'0.9', 
      	'font-size':'10px', 'color': '#BCD2EA', 'text-align':'left', 'vertical-align': 'top', 'border':'1px solid #BCD2EA', 'padding':'0px', 'margin':'2px'})
      //.append(headerAttr.message_body)
      .appendTo(menuElt);
      tablog = new domTabObject(c$('div', 'feedlog_div').appendTo(eltCol).css({'float':'left','position': 'absolute','left':'2px','top':'2px','right':'2px','bottom':'2px'}), 'feedlogOpt', 
          ['Generic','War','Mission','Fight','Request'],350);//, 'auto', 'auto', '#000000'
      headerAttr.message_body['Generic'] = tablog.getLayout(0);
      headerAttr.message_body['War'] = tablog.getLayout(1);
      headerAttr.message_body['Mission'] = tablog.getLayout(2);
      //headerAttr.message_body['Fight'] = tablog.getLayout(3);
      tablog.getLayout(3).css({'float':'left', 'fontFamily':'arial','font-weight':'normal','font-size':'11px', 'width':730});
      c$('div').appendTo(tablog.getLayout(3)).css({'width':730,'margin':'2px'})
      .append(c$('label','for:fight_profile').text(' Fight using MW profile '))
      .append(c$('input:text', 'id:fight_profile, class:black_box').css({'padding':'2px','width':'400px'}))
      .append(c$('label','for:fight_profile').text('  '))
      .append(b$('Fight','class:short orange').click(speedEvent.fight_profileclick));//
      headerAttr.message_body['Fight'] = c$('div','id:speedlog_fight').appendTo(tablog.getLayout(3));
      headerAttr.message_body['Loot']  = c$('div','id:speedloot_fight').appendTo(tablog.getLayout(3));
      headerAttr.message_body['Request'] = tablog.getLayout(4);
      var wL;
      for (var mH in headerAttr.message_body) {
          //headerAttr.message_body[mH].css({'float':'left', 'overflow': 'scroll', 'overflow-x': 'hidden',
          if (mH=='Fight')
             wL = 460;
          else if (mH=='Loot')
             wL = 256;
          else
             wL = 730;
          if (mH=='Fight' || mH=='Loot')   //344
          headerAttr.message_body[mH].css({'float':'left', 'overflow': 'auto', 'white-space' : 'wrap','border':'1px solid #CDCDCD',
      	  'fontFamily':'arial','font-weight':'normal','font-size':'11px', 'width':wL, 'height':310, 'margin':'2px'}); //'padding-right':'30px', 
          else
          headerAttr.message_body[mH].css({'float':'left', 'overflow': 'auto', 'white-space' : 'wrap',
      	  'fontFamily':'arial','font-weight':'normal','font-size':'11px', 'width':wL}); //'padding-right':'30px', 
        //var tabs = new domTabObject(
        //    c$('div', 'options_div').appendTo(battle_div), 'fightOpt', 
        //    ['General','BlackList','WhiteList'], 190, 'auto', 'transparent'
        //);
      }  
      
      tablog.tabClear(
            '<a style="text-decoration: none;"id="speedclear_log" href="#">'+
            'clear log</a>'
      );
      $('#speedclear_log').click(speedEvent.clearLog);
      //menuElt
      //create configuration
      var tabs = new domTabObject(c$('div', 'speedconf_div').appendTo(header).css(
      {'float':'left','position': 'absolute','left':'2px','top':'102px','right':'2px','bottom':'2px'}), 'speedCfgOpt', 
      ['Timer','Stream','Fighting','Gift Request'],300);//, 'auto', 'auto', '#000000'
      //tabs.getLayout(0).width(690).css({'float':'left', //'overflow': 'scroll', 'overflow-x': 'hidden',
      //	  'fontFamily':'arial','font-weight':'normal','font-size':'11px','padding-right':'30px', 'padding-left':'10px','padding-top':'10px'});//'width':740,
      //stream configuration
      createTimerDom(tabs.getLayout(0));
      createStreamDom(tabs.getLayout(1));
      createFightDom(tabs.getLayout(2));
      c$('div','btn_saveconf').appendTo(header)
      .css({'text-align': 'right', 'width': 740, 'vertical-align': 'bottom','position': 'absolute','bottom':'10px'})
        .append(b$('Save Config','class:short orange').click(speedEvent.save_configclick)).hide();
      
    }
    function createTimerDom(parents)
    {
      var selectOpts = {
        'speedstream_readerdelay': 
            {0:'0 sec.', 1:'1 sec.', 2:'2 sec.', 4:'4 sec.', 6:'6 sec.', 10:'10 sec.'},
        'speedstream_wardelay': 
            {0:'0 sec.', 1:'1 sec.', 2:'2 sec.', 3:'3 sec.', 4:'4 sec.'},
        'speedstream_helpdelay': 
            {0:'0 sec.', 2:'2 sec.', 3:'4 sec.', 6:'6 sec.'},
      };
      parents.width(690).css({'float':'left', //'overflow': 'scroll', 'overflow-x': 'hidden', 
      	  'fontFamily':'arial','font-weight':'normal','font-size':'11px','padding-right':'30px', 'padding-left':'10px','padding-top':'10px'});//'width':740,      
      c$('div').appendTo(parents)
        .append(c$('label', 'for:speedstream_readerdelay').text('Stream reader (sec.): '))
        .append(c$('select', 'id:speedstream_readerdelay, class:black_box').width(100).css({'position':'absolute','left':'120px'}))
        .append(c$('label','for:speedstream_limitread').text(' Max. stream/read :').css({'position':'absolute','left':'240px'}))
        .append(c$('input:text', 'id:speedstream_limitread,size:2,class:right').css({'position':'absolute','left':'340px'}))
        
        //.append(c$('div','class:clearfix'))
        .append('<br />')
        .append(c$('label', 'for:speedstream_helpdelay').text('Help process (sec.): ').css({'position':'absolute','margin-top':'12px'}))
        .append(c$('select', 'id:speedstream_helpdelay, class:black_box').width(100).css({'position':'absolute','left':'120px','margin-top':'12px'}))
        .append('<br />')
        .append(c$('label', 'for:speedstream_wardelay').text('War assist(sec.): ').css({'position':'absolute','margin-top':'24px'}))
        .append(c$('select', 'id:speedstream_wardelay, class:black_box').width(100).css({'position':'absolute','left':'120px','margin-top':'24px'}));
        
      applySelectOptions(selectOpts, parents.content);
    }
    function createStreamDom(parents)
    {
      parents.width(690).css({'float':'left', //'overflow': 'scroll', 'overflow-x': 'hidden', 
      	  'fontFamily':'arial','font-weight':'normal','font-size':'11px','padding-right':'30px', 'padding-left':'10px','padding-top':'10px'});//'width':740,      
      c$('div').appendTo(parents)
      .append(c$('span').text('Help in:'));
      var cfgGroups = c$('div').appendTo(parents).css({
          'border': '1px solid white',
          'width': 250,
          'height': 250,
          'text-align': 'left',
          'overflow': 'auto'
      });
      c$('div').appendTo(parents)
      .append(c$('input:checkbox', 'speedstreamopt_isshowignorring'))
      .append(c$('label', 'for:speedstreamopt_isshowignorring').text('Show Ignoring'));
      
      
      // add options checkboxes and group list
      var g_name;
      for (var _Am in _Actions) {
          g_name = _Actions[_Am].name;
          c$('input:checkbox', 'speedstreamopt_' + actionName(_Actions[_Am]).toLowerCase()).appendTo(cfgGroups);
          c$('label', 'for:speedstreamopt_' + actionName(_Actions[_Am]).toLowerCase()).appendTo(cfgGroups).text(g_name);
          c$('br').appendTo(cfgGroups);
      }
      var streamtabs = new domTabObject(c$('div', 'speedstreamconf_div').appendTo(parents).css(
      {'float':'left','position': 'absolute','left':'270px','top':'50px','right':'2px','bottom':'2px'}), 'speedStreamOpt', 
      ['War','Friends','Mission','Property','Stash']);//, 'auto', 'auto', '#000000'
      for (var tabs=0; tabs<5; tabs++)
        streamtabs.getLayout(tabs).width(450).height(245).css({'float':'left', 
      	    'fontFamily':'arial','font-weight':'normal','font-size':'11px'});
      var divListElt;
      //War Dom
      divListElt = c$('ul').appendTo(streamtabs.getLayout(0));
      c$('li','class:clearfix').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
      .append(c$('input:checkbox','speedstreamopt_userewardfilter')).append(c$('label','for:speedstreamopt_userewardfilter').text('Use Reward Filter'))
      .append(c$('br'))
      .append(c$('label').text('Reward Filter List'))
      .append(c$('br'))
      .append(c$('textarea', 'cols:50,rows:11,id:speedstreamopt_rewardfilter').css({'font-size':'11px','overflow':'auto','white-space':'pre'}));
      //friend Dom
      divListElt = c$('ul').appendTo(streamtabs.getLayout(1));
      c$('li','class:clearfix').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
      .append(c$('input:checkbox','speedstreamopt_usefriendwar')).append(c$('label','for:speedstreamopt_usefriendwar').text('Use on War '))
      .append(c$('input:checkbox','speedstreamopt_usefriendjob')).append(c$('label','for:speedstreamopt_usefriendjob').text('Use on Job '))
      .append(c$('input:checkbox','speedstreamopt_usefriendprop')).append(c$('label','for:speedstreamopt_usefriendprop').text('Use on Property '))
      .append(c$('input:checkbox','speedstreamopt_usefriendmission')).append(c$('label','for:speedstreamopt_usefriendmission').text('Use on Mission '))
      .append(c$('br'))
      .append(c$('label').text('Friend Filter (format: ID:Name:W:N:C:M:B:V:I:P:O)'))
      .append(c$('br'))
      .append(c$('textarea', 'cols:50,rows:11,id:speedstreamopt_friendfilter').css({'font-size':'11px','overflow':'auto','white-space':'pre'}));
      //mission Dom
      divListElt = c$('ul').appendTo(streamtabs.getLayout(2));
      c$('li','class:clearfix').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
      .append(c$('input:checkbox','speedstreamopt_usemissionfilter')).append(c$('label','for:speedstreamopt_usemissionfilter').text('Use mission Filter '))
      .append(c$('input:checkbox','speedstreamopt_missionenergy')).append(c$('label','for:speedstreamopt_missionenergy').text('Use Energy '))
      .append(c$('input:checkbox','speedstreamopt_missionstamina')).append(c$('label','for:speedstreamopt_missionstamina').text('Use Stamina '))
      .append(c$('br'))
      .append(c$('label').text('Mission Filter List'))
      .append(c$('br'))
      .append(c$('textarea', 'cols:51,rows:11,id:speedstreamopt_missionfilter').css({'font-size':'11px','overflow':'auto','white-space':'pre'}));
      //property Dom
      divListElt = c$('ul').appendTo(streamtabs.getLayout(3));
      c$('li','class:clearfix').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
      .append(c$('input:checkbox','speedstreamopt_usepropertyfilter')).append(c$('label','for:speedstreamopt_usepropertyfilter').text('Use Property Filter (Vegas and Italy Only)'))
      .append(c$('br'))
      .append(c$('label').text('Property Filter List'))
      .append(c$('br'))
      .append(c$('textarea', 'cols:50,rows:11,id:speedstreamopt_propertyfilter').css({'font-size':'11px','overflow':'auto','white-space':'pre'}));
      //stash Dom
      divListElt = c$('ul').appendTo(streamtabs.getLayout(4));
      c$('li','class:clearfix').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
      .append(c$('input:checkbox','speedstreamopt_usestashfilter')).append(c$('label','for:speedstreamopt_usestashfilter').text('Use Loot Filter'))
      .append(c$('br'))
      .append(c$('label').text('Loot Filter List'))
      .append(c$('br'))
      .append(c$('textarea', 'cols:50,rows:11,id:speedstreamopt_stashfilter').css({'font-size':'11px','overflow':'auto','white-space':'pre'}));
    }
    function createFightDom(parents)
    {
        var selectOpts = {
            'speedbfopt_fightin': 
                {1:'New York', 2:'Cuba', 3:'Moscow', 4:'Bangkok', 5:'Las Vegas', 6:'Italy', 7:'Current City'},
            'speedbfopt_healin': 
                {1:'New York', 2:'Cuba', 3:'Moscow', 4:'Bangkok', 5:'Las Vegas', 6:'Italy'},
            'speedbfopt_usebankcity': 
                {1:'New York', 2:'Cuba', 3:'Moscow', 4:'Bangkok', 5:'Las Vegas', 6:'Italy'},
            'speedbfopt_attackdelay': 
                {1:'1', 2:'2', 3:'3', 4:'4'},
            'speedbfopt_skiplevelway': 
                {1:'greater', '-1':'lower'},
            'speedbfopt_skipmafiaway': 
                {1:'greater', '-1':'lower'},
            'speedbfopt_bangkokfaction': {'any':'Balance','yakuza':'Yakuza','triad':'Triads'}     
        };
        parents.width(690).css({'float':'left', //'overflow': 'scroll', 'overflow-x': 'hidden', 
       	  'fontFamily':'arial','font-weight':'normal','font-size':'11px','padding-right':'30px', 'padding-left':'10px','padding-top':'10px'});//'width':740,      
        var divListElt = c$('ul').appendTo(parents);
        // General
        c$('li').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
        .append(c$('label','for:speedbfopt_fightin').text('Fight in '))
        .append(c$('select','speedbfopt_fightin').width(100))
        .append(c$('input:checkbox', 'speedbfopt_useattackdelay'))
        .append(c$('label','for:speedbfopt_useattackdelay').text('delay :'))
        .append(c$('select', 'id:speedbfopt_attackdelay,class:right').width(68))
        .append(c$('input:checkbox','speedbfopt_skipiced'))
        .append(c$('label','for:speedbfopt_skipiced').text('Skip iced.'))
        .append(c$('input:checkbox','speedbfopt_skipnocash').css('margin-left', 5))
        .append(c$('label','for:speedbfopt_skipnocash').text('Skip when no cash.'))
        .append(c$('input:checkbox','speedbfopt_usepowerattack').css('margin-left', 5))
        .append(c$('label','for:speedbfopt_usepowerattack').text('Power attack.'));
        
        
        
        c$('li').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
        .append(c$('input:checkbox', 'speedbfopt_useheal'))
        .append(c$('label','for:speedbfopt_useheal').text('Heal in '))
        .append(c$('select','speedbfopt_healin').width(100))
        .append(c$('label','for:speedbfopt_healwhen').text(' when less than:'))
        .append(c$('input:text', 'id:speedbfopt_healwhen,size:5,class:right'));
        // BANK MONEY
        c$('li').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
        .append(c$('input:checkbox', 'speedbfopt_usebank'))
        .append(c$('label','for:speedbfopt_usebank').text('Bank when money is more than:'))
        .append(c$('input:text', 'id:speedbfopt_usebankwhen,size:5,class:right'))
        .append(c$('label','for:speedbfopt_usebankcity').text('when fight in '))
        .append(c$('select','speedbfopt_usebankcity').width(100));
        // LEVEL CAP
        c$('li').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
        .append(c$('input:checkbox','speedbfopt_skiplevel'))
        .append(c$('label','for:speedbfopt_skiplevel').text('Skip users level '))
        .append(c$('select', 'speedbfopt_skiplevelway').width(80))
        .append(c$('label','for:speedbfopt_skiplevel').text(' than:'))                           
        .append(c$('input:text', 'id:speedbfopt_skiplevelof,size:5,class:right'));
        // MAFIA CAP
        c$('li').appendTo(divListElt).css({'padding-top':'2px','padding-bottom':'2px'})
        .append(c$('input:checkbox','speedbfopt_skipmafia'))
        .append(c$('label','for:speedbfopt_skipmafia').text('Skip users mafia '))
        .append(c$('select', 'speedbfopt_skipmafiaway').width(80))
        .append(c$('label','for:speedbfopt_skipmafia').text(' than:'))                           
        .append(c$('input:text', 'id:speedbfopt_skipmafiaof,size:5,class:right'));
        c$('li').appendTo(divListElt)
        .append(c$('input:checkbox','speedbfopt_useattackcount'))
        .append(c$('label','for:speedbfopt_useattackcount').text('Maximum attacks per figther:'))
        .append(c$('input:text', 'id:speedbfopt_attackcounter,size:5,class:right'));
        c$('li').appendTo(divListElt)
        .append(c$('input:checkbox','speedbfopt_showloot'))
        .append(c$('label','for:speedbfopt_showloot').text('Show Loot.'))
        .append(c$('input:checkbox','speedbfopt_showcoins').css('margin-left', 5))
        .append(c$('label','for:speedbfopt_showcoins').text('Show Coins.'))
        .append(c$('input:checkbox','speedbfopt_showstash').css('margin-left', 5))
        .append(c$('label','for:speedbfopt_showstash').text('Show Stash.'))
        .append(c$('input:checkbox','speedbfopt_showhelp'))
        .append(c$('label','for:speedbfopt_showhelp').text('Show Troops.'));
        c$('li').appendTo(divListElt)
        .append(c$('input:checkbox','speedbfopt_stopbeforelvlup'))
        .append(c$('label','for:speedbfopt_stopbeforelvlup').text('Exp. Reserved : '))
        .append(c$('input:text', 'id:speedbfopt_explefttostop, size:5, class:right'))
        .append(c$('input:checkbox','speedbfopt_stopwhenstamina'))
        .append(c$('label','for:speedbfopt_stopwhenstamina').text(' Stamina Reserved : '))
        .append(c$('input:text', 'id:speedbfopt_staminatokeep, size:5, class:right'));
        c$('li').appendTo(divListElt)
        .append(c$('input:checkbox','speedbfopt_usefactions'))
        .append(c$('label','for:speedbfopt_usefactions').text('Bangkok faction: '))
        .append(c$('select', 'id:speedbfopt_bangkokfaction').width(95))
        .append(c$('input:checkbox','speedbfopt_skipnofaction').css('margin-left', 5))
        .append(c$('label','for:speedbfopt_skipnofaction').text('Skip no points.'));
        c$('li').appendTo(divListElt)
        .append(c$('input:checkbox','speedbfopt_usenamefilter'))
        .append(c$('label','for:speedbfopt_usenamefilter').text('Fighting Filter (not attack containing this!)'))
        .append(c$('br'))
        .append(c$('textarea', 'cols:30,rows:2,id:speedbfopt_namefilterrgx').css({'font-size':'11px','overflow':'auto','white-space':'pre'}));
        
        // ATTACK COUNT
        //.append(c$('input:checkbox','bfopt_showhelp'))
        //.append(c$('label','for:bfopt_showhelp').text('Show Troops.'))
        //.append(c$('input:checkbox','bfopt_showblacklisted'))
        //.append(c$('label','for:bfopt_showblacklisted').text('Blacklisted.'))
        //.append(c$('input:checkbox','bfopt_showwhitelisted'))
        //.append(c$('label','for:bfopt_showwhitelisted').text('Whitelisted.'));
    	 
    	 applySelectOptions(selectOpts, parents.content);
    }
    if (e$('#speed_menu') == null) createFirstDom();
 }   
 function doPlaying() {
   addToLog('Generic','<span style="color:#00FFCC;"> Start processing wall.</strong>!</span>');
   global.readerCycle.start('<img style="vertical-align: middle;" src="'+global.resource.ajax_loader+'"> Reading feed %N% sec.',null,30);
   listStream[2]._event = setTimeout(function() {listStream[2].list.Run();}, 
     getRandRange(speedoptions.get('playtimer')[2].value*750,speedoptions.get('playtimer')[2].value*1250));
   listStream[3]._event = setTimeout(function() {listStream[3].list.Run();}, 
     getRandRange(speedoptions.get('playtimer')[3].value*750,speedoptions.get('playtimer')[3].value*1250));
 }
 function fn_ReaderCycle(selector,watchDog) {
     var multiSql = {
     'query1':'SELECT post_id,strip_tags(attachment), created_time, source_id, target_id, permalink, actor_id FROM stream WHERE app_id=10979261223 AND source_id in (SELECT target_id FROM connection WHERE source_id=me()) AND filter_key = "nf" AND is_hidden = 0 AND(source_id = actor_id OR target_id = me()) ORDER BY created_time DESC LIMIT ' + speedoptions.get('limitCycle'),
     'query2':'SELECT name, profile_url FROM user WHERE uid IN (SELECT source_id FROM #query1)'}
     //'query2':'SELECT name,url FROM profile WHERE id IN (SELECT source_id FROM #query1)'}
     var sql  = 'SELECT post_id,strip_tags(attachment), created_time, source_id, target_id, permalink, actor_id';
         sql += ' FROM stream ';
         sql += ' WHERE app_id=10979261223 ';
         sql += ' AND source_id in (SELECT target_id FROM connection WHERE source_id=me()) ';
         sql += ' AND filter_key = "nf" AND is_hidden = 0 AND (source_id = actor_id OR target_id = me())';
         sql += ' ORDER BY created_time DESC LIMIT %N%';
     var reader = this;
     var textFmt = {
     	read:'<img style="vertical-align: middle;" src="'+global.resource.ajax_loader+'"> Reading feed %N% sec.',
     	found:'Found %N% news. Next in %J% sec.',
     	error:'Error reading...'
     }
     var statusMode = {
     	idle:0,
     	playing:1
     }
     this.status = statusMode.idle; //reader.status
     this.start = function(text,dataStream, delay) {
         reader.clear();
         if (!speedoptions.get('playStream')) {
            selector.html('Stream Ready.');
         	  return;
         }
         this.status = statusMode.playing; //reader.status
         selector.html(text.replace('%N%', delay));
         ///////////////////////////////////////////////
         try
         {
           facebook.updateSession(function() {
               MWFB.api({method:'fql.multiquery', queries:$.toJSON(multiSql)}, function(callback) {
                     	 if (callback && (callback.length==2))
                     	    dataStream = {stream:callback[0].fql_result_set, 
                     	    	            user:callback[1].fql_result_set};  //name
                     	 else {
                     	 	  clearInterval(listStream[1].Refresh_Timer);
                       	  var valdelay = getRandRange(speedoptions.get('playtimer')[1].value*750,speedoptions.get('playtimer')[1].value*1250);
                       	  selector.html(textFmt.error+'next in '+valdelay/1000+' sec.');
                       	  dataStream = null;
                       	  listStream[1]._event = setTimeout(function () {reader.start(textFmt.read,null,watchDog);}, valdelay);
                     	 }
               }, facebook._error);
           });

           //facebook.restApi('fql.multiquery', function(callback) {
           //	 if (callback && (callback.length==2))
           //	    dataStream = {stream:callback[0].fql_result_set, 
           //	    	            user:callback[1].fql_result_set};  //name
           //	 else {
           //	 	  clearInterval(listStream[1].Refresh_Timer);
           //  	  var valdelay = getRandRange(speedoptions.get('playtimer')[1].value*750,speedoptions.get('playtimer')[1].value*1250);
           //  	  selector.html(textFmt.error+'next in '+valdelay/1000+' sec.');
           //  	  dataStream = null;
           //  	  listStream[1]._event = setTimeout(function () {reader.start(textFmt.read,null,watchDog);}, valdelay);
           //	 }
           //}, {'queries':$.toJSON(multiSql)});
           //facebook.restApi('fql.query', function(callback) {
           //	 if (callback && (callback.length>0))
           //	    dataStream = callback;
           //}, {'query': 'SELECT post_id,strip_tags(attachment), created_time, source_id, target_id, permalink, actor_id FROM stream WHERE app_id=10979261223 AND source_id in (SELECT target_id FROM connection WHERE source_id=me())  AND filter_key = "nf" AND is_hidden = 0 AND (source_id = actor_id OR target_id = me()) ORDER BY created_time DESC LIMIT 3'});
         } catch (errorMsg)  	{
         	  GM_log('error.:');
         }
         ///////////////////////////////////////////////
         listStream[1].Refresh_Timer = setInterval(function() {
         	try
         	{
             delay -= 0.5;
             selector.html(text.replace('%N%', delay));
             
             if ((dataStream!=null)||(delay<0)) reader.clear();
             
             if (dataStream!=null) {
             	  unfinish_Timer = 0;
             	  var valdelay = getRandRange(speedoptions.get('playtimer')[1].value*750,speedoptions.get('playtimer')[1].value*1250);
             	  fnQuery(dataStream,textFmt.found.replace('%J%', valdelay/1000));
             	  dataStream = null;
             	  listStream[1]._event = setTimeout(function () {reader.start(textFmt.read,null,watchDog);}, valdelay);
             	  return;
             }
             if (delay<0) {
             	 unfinish_Timer++
             	 //forceGoHome();
             	 if (unfinish_Timer>3) {
             	 	  //reload Page
             	 	  
             	 	  
             	 }
             	 var valdelay = getRandRange(speedoptions.get('playtimer')[1].value*750,speedoptions.get('playtimer')[1].value*1250);
             	 selector.html(textFmt.error+'next in '+valdelay/1000+' sec.');
             	 dataStream = null;
             	 listStream[1]._event = setTimeout(function () {reader.start(textFmt.read,null,watchDog);}, valdelay);
             	 return;
             }
           }  catch(err0) {
           	  GM_log('Error--->'+err0.message);
           	  reader.clear();
           	  clearTimeout(listStream[1]._event)
             	var valdelay = getRandRange(speedoptions.get('playtimer')[1].value*750,speedoptions.get('playtimer')[1].value*1250);
             	selector.html(textFmt.error+'next in '+valdelay/1000+' sec.');
             	dataStream = null;
             	listStream[1]._event = setTimeout(function () {reader.start(textFmt.read,null,watchDog);}, valdelay);
             	return;
           }
         }, 500);
     };
     this.stop = function() {
     	reader.clear();
     	selector.html('Stop by user.');
     	reader.status = statusMode.idle;
     }
     this.clear = function() {
     	   clearTimeout(listStream[1]._event);
         clearInterval(listStream[1].Refresh_Timer);
     };
     function fnQuery(dataStream, text) {
       var lct = speedoptions.get('post_id');
       var countReader = 0;
       var icycle;
       var oWall;
       var action;
       var href;
       var postID; 
       var lcreated_time = speedoptions.get('last_created_timex');
       if (_Util.getLength(dataStream.stream) > 0) {
            for (i = 0; i < dataStream.stream.length; i++) {
                if (_Util.isValid(dataStream.stream[i])) {
                     if (dataStream.stream[i].created_time>lcreated_time)
                        lcreated_time = dataStream.stream[i].created_time;
                     href = _Util.urlFromStream(dataStream.stream[i]);
                     action = _Actions[_Util.getActionName(href)];
                     //GM_log(_Util.getActionName(href));
                     if ((dataStream.stream[i].created_time>speedoptions.get('last_created_timex'))&& action && (action.name!=='undefined')) {
                     	  lct = dataStream.stream[i].post_id;
                     	  if (validPostFeed(action, dataStream.stream[i])) {
                           if (action.Group==1) {
                              icycle = 2;
                              addCounter('war_value',true);
                           } else {
                              icycle = 3;
                              if (action.key && (action.key=='O'))
                                 addCounter('job_value',true);
                              else   
                                 addCounter('other_value',true);
                           }
                           oWall = new WallItem(icycle);
                           oWall.action                = action;
                           oWall.stremInfo.post_id     = dataStream.stream[i].post_id;
                           oWall.stremInfo.source_id   = dataStream.stream[i].source_id;
                           oWall.stremInfo.target_id   = dataStream.stream[i].target_id;
                           oWall.stremInfo.name        = dataStream.stream[i].attachment.name;
                           oWall.stremInfo.created_time= dataStream.stream[i].created_time;
                           oWall.stremInfo.href        = href;
                           oWall.stremInfo.permalink   = dataStream.stream[i].permalink;
                           oWall.stremInfo.userName    = dataStream.user[i].name;
                           oWall.stremInfo.userUrl     = dataStream.user[i].profile_url;
                           
                           listStream[icycle].list.Append(oWall);
                           countReader++
                     	  } else if (streamOptions.get('isShowIgnorring')) {
                     	  	printIgnorring(action, dataStream.stream[i], dataStream.user[i]);
                     	  }
                     }
                }
                //delete dataStream[i];
            }
            delete dataStream;
            speedoptions.set('last_created_timex', lcreated_time);
            if (postID) speedoptions.set('post_id', postID);
            selector.html(text.replace('%N%', countReader));
       }
     }
     function validPostFeed(action,datast) {
     	 var actionfilter = streamOptions.get(actionName(action));
     	 var processing = actionfilter.doing;
     	 GM_log(action.name+'->'+processing);
       if (processing) {
       	  if (actionfilter.ff && !_Util.filterFriends(datast.source_id, action.key)) {
       	  	 return false;
       	  }
       	  if (actionfilter.sf && !_Util.filterText('stashFilter',datast.attachment.name)) {
       	  	 return false; 
       	  }
       	  if (actionfilter.pf && !_Util.filterText('propertyFilter',datast.attachment.name)) {
       	  	 return false; 
       	  }
       	  return true;
       } else return false;
     }
     function printIgnorring(action,data,userNm) {
       var f     = data.attachment;
       var url = _Util.urlFromStream(data);
       url = _Util.toIntUrl(url);
       url = (/http/.test(url) ? '' : 'http://facebook.mafiawars.zynga.com/mwfb/') + url;
       var Title = '<a href="'+url+'" style="color:#00FFCC;" target="_black">'+f.name+'</a>';
       
       var dt0   =   new Date(data.created_time*1000);
       var dt1   =   new Date();
       var dtTx  = dt0.toString(); 
       //dtTx = dtTx.slice(0,dtTx.indexOf('GMT'))+'['+ (Date.parse(dt1.toString())-Date.parse(dt0.toString()))/1000 + 's]';
       dtTx = (Date.parse(dt1.toString())-Date.parse(dt0.toString()))/1000;
       var name  = '<a href="'+data.permalink+'" target="_black">'+action.name+'</a> - '+
           '<a href="'+(userNm?userNm.profile_url:'')+'" target="_black">'+(userNm?userNm.name:'')+'</a>';
       var strResult = 'IGNORING!!';
       addToLog((action.name=='Go to war'?'War':(action.name=='Join in a mission'?'Mission':'Generic')),name+'<br>'+Title+'<br>'+strResult,dtTx);
     }
     return this;
 }
 var error_message = 'I can\'t get a good server response, try it yourself.';
 function doHelp(url, action, callback, _rf, icounter, _first) 
 {
     //GM_log('Do help: '+url);
     ajaxRequest({
         url: url,
         success: function(htmlText) 
         {
           //success", "notmodified", "error", "timeout", or "parsererror           
           if (!mw_updater(htmlText)) {
              if (icounter<=0)
                 doHelp(url, action, callback, _rf, (icounter==-1? icounter=1:icounter++), _first);
              else
                 callback(error_message);
              return;
           }
           var r, eQry = h$(htmlText);
                
           if (typeof(action.next) == 'function') {
               action.next(htmlText, callback);
               return;
           }
           if (action.repeat && (r = eQry.find(action.repeat)).length > 0) {
              //get reward
              /*if (_first && _rf) {
                 //var rewardTx = $('.helpers_rewards ul > li > img', '<div>'+ htmlText+'</div>');
                 var rewardTx = eQry.find('.helpers_rewards ul img').attr('title');
                 if (!_Util.filterText('rewardFilter', rewardTx)) {
                 	  rewardTx += '<br>Reward not Qualify.';
                 	  callback(rewardTx);
                 	  delete htmlText;
                 	  return;
                 }
              }*/   
              var pickHit;
              if (r.length>1)
                    pickHit = r.eq(getRandRange(1,r.length)-1);//r.eq(r.length-1);
              else 
                 	  pickHit = r;
              doHelp(_Util.getUrl(pickHit), action, callback, _rf, 0, false);
              delete htmlText;
              return;
           }
           if (action.success && action.success.exec && (r = action.success.exec(htmlText))) {
               var msg = r[1]; 
               if (action.Group==1) {
                  var posH = -1;
                  //get reward
                  msg = 'Reward : <span class="good">'+eQry.find('.helpers_rewards ul img').attr('title')+'</span>';
              	  //get position
              	  var posMe = eQry.find('.war_attacks div > div.left ul > li > a');
                  if (posMe &&(posMe.length>0)) {
                     
                     for (var i=0; i<posMe.length; i++)
                         if (posMe.eq(i).attr('href').indexOf('user='+global.MW64_ID)!=-1) 
                         {
                         	 posH = posMe.length - i;
                         	 break;
                         }
                     if (posH!=-1)
                        msg += '<br>Hit on Position : <span class="good">'+posH+'</span>';
                  }
                  msg += '<br>'+r[1];   
                  if (posH==1 && icounter==0) {
                    doHelp(url, action, callback, _rf, -1, false);
                  } else {
                    callback(msg);
                  }
               } else callback(msg);
               delete htmlText;
               return;
           }
           if (action.next && (r = eQry.find(action.next)).length > 0) {
               doHelp(_Util.getUrl(r), {}, callback, _rf, 0, false);
               delete htmlText;
               return;
           }
           if ((r = eQry.find('.message_body:first, #mbox_generic_1 tr:eq(1)')).length > 0) {
               callback(r.html());  
               delete htmlText;
           }
           else {
               callback(error_message);
               delete htmlText;
           }
         }
     });
 }
 
 function WallItem(cycleName) {
     this.Next         =   null;
     this.action       =   undefined;
     this.stremInfo    =   {
     	 post_id:undefined,
        source_id:undefined,
        target_id:undefined,
     	 name:undefined,
        created_time:undefined,
        href:undefined,
        permalink:undefined,
        userName:undefined,
        userUrl:undefined
     }
     this.Process      =   function() {
         function NextWall() {
             if (speedoptions.get('playStream')) {
                 if (Self.Next != null) {
                 	genMessageHeader(headerAttr.stream_msg,'Help In : '+Self.action.name+' finished.', false);
                 	listStream[cycleName].list.Run(); 
                 } else {
                 	genMessageHeader(headerAttr.stream_msg,'Help In : All finished.', false);
                   listStream[cycleName]._event = setTimeout(function () {listStream[cycleName].list.Run();}, 
                   getRandRange(speedoptions.get('playtimer')[cycleName].value*750,speedoptions.get('playtimer')[cycleName].value*1250));
                 }
                 //delete Self.action;
             } else genMessageHeader(headerAttr.stream_msg,'Stream ready.', false);
         }
         var Self;
         var iWatchDog;
         var xloop = 0, irepeatjob = 0;
         try 
         {
           Self = this;
           //GM_log('DO HELP - ' + Self.action.name);
           genMessageHeader(headerAttr.stream_msg,'Help In : '+Self.action.name, true);
           if (Self.action.name) {
               while (xloop<10) {
                 irepeatjob = 0;
                 doHelp(_Util.toIntUrl(Self.stremInfo.href), Self.action, function(dataresult) {
                 	 if (Self.action.Group==1) {
                 	    addCounter('war_value',false);
                   } else {
                      if (Self.action.key && (Self.action.key=='O'))
                         addCounter('job_value',false);
                      else   
                         addCounter('other_value',false);
                   }
                 	 genSpeedHelpLogDom(Self.action, Self.stremInfo, dataresult);
                 	 NextWall();
                 },streamOptions.get(actionName(Self.action)).rf, irepeatjob, true);
                 if (Self.action.loop) 
                    xloop++;
                 else break;
               }
           } else {
           	NextWall();
           }
         } catch (err) {
         	GM_log('Error: Processing - '+err.message);
         	NextWall();
         }
     }
 }

 //var speedbattlefield;// = new fnspeedbattlefield();
function fnspeedbattlefield() 
{
    const ERROR_SUCCESS = 0;
    const ERROR_BAD_RESPONSE = 1;
    const ERROR_NO_FIGHT_RESULT = 2;
                          
    var statusTimer = new timerMessage('#Bot-msg'); 
    var StartCity = getCurrentCity();
    var CurrentCity = 0;
    var lastfightUser = '';
    var abort_process = false;
    var bfirstRun = true;
    var bAttackWhiteList = false;
    
    var cities = {
        1: ['New York', 'new_york', 65000],
        2: ['Cuba','cuba', 10000],
        3: ['Moscow','moscow', 65000],
        4: ['Bangkok','bangkok', 10000],
        5: ['Las Vegas','vegas', 65000],
        6: ['Italy', 'italy', 65000]
    };
    var logIcon = {
        'asn'      : global.zGraphicsURL + 'AsnFight/victory-coin-55x55.png',
        'loot'     : global.zGraphicsURL + 'achievements/mwach_collector_75x75_01.gif',
        'fight'    : global.zGraphicsURL + 'home/icon_fight_75x75_01.gif',
        'iced'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'kill'     : global.zGraphicsURL + 'home/icon_hitlist_75x75_01.gif',
        'stash'    : global.zGraphicsURL + 'achievements/mwach_collector_75x75_01.gif',
        'help'     : global.zGraphicsURL + 'home/icon_call_for_help_75x75_01.gif',
        'heal'     : global.zGraphicsURL + 'red_cross_small.gif',
        'bank'     : global.zGraphicsURL + 'home/icon_loot_75x75_01.gif',
        'whitelist': global.zGraphicsURL + 'DW_feed_grn_01.png',
        'blacklist': global.zGraphicsURL + 'DW_feed_red_01.png'
    };
    var fightStats = {
        health         : 0,
        maxHealth      : 0,
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
        experience     : 0,
        victorycoins   : 0,
        blacklisted    : 0,
        whitelisted    : 0,
        iced           : 0,
        kill           : 0,
        money          : 0,
        stash          : 0,
        coins          : 0,
        startGroupAtk  : 0,
        startGroupDef  : 0,
        atkGained      : 0,
        defGained      : 0,
        expToNextLevel : 0,
        exp_per_sta: function() 
        {
            if (isNaN(this.experience) || isNaN(this.totalFight) || (this.experience+this.totalFight < 1)) {
                return 0;
            }
            var fixedInt = function(n) {
                return n.toFixed(Math.abs(n) < 10 ? 2 : 0);
            }
            return fixedInt(this.experience / this.totalFight);
        },
        healthpercent: function() 
        {
            if (isNaN(unsafeWindow.User.max_health) || isNaN(this.health) ) {
                return 0;
            }
            return parseFloat((this.health * 100) / unsafeWindow.User.max_health);
        },
        cash: function() 
        {
            var m = this.money, s = '';
            if (m > 1000) {
                m = parseInt(m/1000);
                s = 'k';
            }   
            return '' + m + s;
        }
    };
    var _fightUtil = {
        htmlDecode: function(text) {
            return $.trim(c$('textarea').html(text).val());
        },
        /**
         * Return a Hex color string.
         * @param {String} color
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
        getNumber: function(text) {
            var new_text = String(text).replace(/\D*/g, '');
            return (new_text.length > 0) ? parseInt(new_text) : 0;
        },
        toArray: function(obj) {
            var new_array = [], opp;
            $.each(obj, function(id, name) {
                if (parseInt(id) && typeof(name) === 'string');
                    new_array.push({'id':id , 'name':name});
            });
            return new_array;
        },
        opponentListed: function(name, id) {
            return typeof(fightoptions.get(name)[id]) !== 'undefined';
        },
        getLevel: function(elem) {
            return this.getNumber(
                $(elem).contents().filter(function() {
                    return this.nodeType === 3;
                }).text()
            );
        },
        addStashCount: function(html, count) {
            return html.replace(/popFightLootFeed_\d+/g, 'popFightLootFeed_'+count)
                       .replace(/fight_loot_feed_btn_\d+/g, 'fight_loot_feed_btn_'+count);
        },
        addIcedCount: function(html, count) {
            return html.replace(/postFeedAndSendFightBrag/g,'postFeedAndSendFightBrag_'+count)
                       .replace(/#pop_bg_\d+/gi, '#feed_send_fight_btn'+count); 
        },
        addCoinsCount: function(html, count) {
            return html.replace(/postW2Wback/g, 'postW2Wback_'+count)
                       .replace(/share_asn_feed/g, 'share_asn_feed_'+count)
                       .replace(/ASNFightW2Wcallback/g, 'ASNFightW2Wcallback_'+count);
                       
        },
        filterText: function(filterName, text) {
            var RegText = String(fightoptions.get(filterName)).replace(/\n+/g,'|');
            RegText = RegText.toLowerCase();
            if ((new RegExp(RegText, 'i')).test(text.toLowerCase())) {
                return true;
            }
            return false;
        }
    };
    
    /**
     * Create a new fight result query
     * @constructor
     * @param {Object} str
     * @return {queryResult}
     */
    var queryResult = function(data) {
        var Qry  = h$(data);
        var obj  = Qry.find('.fight_results');
        var fct  = Qry.find('.zy_progress_bar_faction_text');
        var plr  = $('.fightres_player', obj);
        var opp  = $('.fightres_opponent', obj);
        
        this.hint         = $('.fightres_hint > span', obj);
        this.title        = $('.fightres_title', obj);
        this.health       = $('.fightres_stats > .fightres_health', obj);
        this.damage       = $('.fightres_stats > .fightres_damage', obj);
        this.experience   = $('.fightres_stats > .fightres_experience', obj);
        this.attackAgain  = $('a:regex(href,action=attack)', obj).attr('href');
        this.pwrAttack    = $('a:regex(href,action=power_attack)', obj).attr('href');
        this.cash         = $('.fightres_stats > div[class^=sexy_]', obj);
        this.vCoin        = $('img:regex(src,victory_icon)', obj).parent();
        this.share_asn    = $('#asn_fight_module > div:eq(1), #share_asn_feed', obj);
        this.bonuses      = $('.fightres_bonuses', obj);
        this.won          = this.title.hasClass('good');
        
        this.addFaction   = $('img:regex(src,yakuza),img:regex(src,triad)', obj).length === 2;
        this.yakuza       = fct.eq(0).text();
        this.triad        = fct.eq(1).text();
        
        this.player = {
            name:         $('.fightres_name > a', plr).text(),
            image:        $('.fightres_image > img', plr),
            groupSize:    $('.fightres_fightstats > .fightres_group_size', plr).text(),
            groupAttack:  $('.fightres_fightstats > .fightres_group_attack', plr).text(),
            groupDefense: Qry.find('.fightbar_group_stat > div:eq(1)').text(),
            skillAttack:  $('.fightres_fightstats > .fightres_skill_attack', plr).text()
        };
        this.opponent = {
            name:         $('.fightres_name > a', opp).text(),
            image:        $('.fightres_image > img', opp),
            groupSize:    $('.fightres_fightstats > .fightres_group_size', opp).text(),
            groupDefense: $('.fightres_fightstats > .fightres_group_defense', opp).text(),
            skillDefense: $('.fightres_fightstats > .fightres_skill_defense', opp).text()
        };
        
        delete obj, plr, opp;
        return this;
    };
    /**
     * Player opponent
     * @constructor
     * @param {Number} id
     * @param {String} title
     * @param {String} name
     * @param {Number} level
     * @param {Number} mafia
     * @param {String} profile
     * @param {String} url
     * @param {String} faction
     * @return {opponentStats}
     */
    var opponentStats = function(id, title, name, level, mafia, profile, url, iced, faction) {
        
        this.id      = _fightUtil.getNumber(id);
        this.title   = title;
        this.name    = name;
        this.level   = parseInt(level);
        this.mafia   = parseInt(mafia);
        this.iced    = iced;
        this.faction = faction ? String(faction).toLowerCase() : '';
        this.anchor  = '<a href="'+profile+'" target="_black">'+name+'</a>';
        this.profile = profile;
        this.attack  = url;
        this.pwratk  = null;
        this.fights  = 0;
        this.alive   = false;
        this.win     = false;
        
        return this;
    };

    var _List = {
        players: new Array(),
        /**
         * @type {opponentStats}
         */
        current: undefined,
        
        sortBy: {
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
        },
        /**
         * Add opponent to list
         * @param {String} list
         * @param {opponentStats} opp
         */
        addToList: function(list, opp) {
            try {
                if (!_fightUtil.opponentListed(list, opp.id)) {
                    log$('added to ' + list + ': ' + opp.id);
                }
                else {
                    log$('opponent exists in ' + list + ': ' + opp.id);
                }
                fightoptions.get(list)[opp.id] = opp.name + '  level ' + opp.level;
                return true;
            }
            catch(err) {
                logErr$(err);
            }
            return false;
        },
        addCurrentToBlackList: function() {
            var bNew = !_fightUtil.opponentListed('blackList', this.current.id);
            this.addToList('blackList', this.current);
            return bNew;
        },
        addCurrentToWhiteList: function() {
            var bNew = !_fightUtil.opponentListed('whiteList', this.current.id);
            this.addToList('whiteList', this.current);
            return bNew;
        },
        setRandomCurrent: function() {
            return this.setCurrent(Math.floor(Math.random() * this.players.length));
        },
        /**
         * Set the current opponent
         * @param {Number} id
         * @return {opponentStats}
         */
        setCurrent: function(id) {
            if (this.players.length < 1) {
                return this.current = undefined;
            }
            if (typeof id == 'undefined') {
                return this.current;
            }
            id = parseInt(id);
            this.current = this.players[id];
            if (this.players.length > 1)
                this.players.splice(id, 1);
            else
                this.players = new Array();
            
            return this.current;
        },
        /**
         * Add a new opponent to list
         * @param {opponentStats} opponent
         */
        add: function(opponent) {
            if (this.players.length > 30) {
                this.players = [];
                if (this.current) 
                    this.players.push(this.current);
            }
            this.players.push(opponent);
        },
        length: function() {
            return this.players.length;
        },
        clear: function() {
            this.players = [];
            this.current = undefined;
        },
        sort: function(by) {
            this.players.sort(this.sortBy[by]);
        },
        each: function(fn) {
            if (typeof fn !== 'function')
                return;
            for (var i = this.players.length - 1; i >= 0; i--) {
                fn.apply(this.players[i], [i, this.players[i]]);
            }   
        }
    };
    var getSelectedListKey = function(listName) {
        return $('#speedbfopt_'+listName).find('option[selected]');
    };
    // Regex Expresions
    var _Regex = {
        user_health: function(text) {
            return parseInt(doRegex(/user_health..\s?=\s?parseInt..(\d+)/, text).$1 || 0);
        },
        exp_to_next_level: function(text) {
            return parseInt(doRegex(/exp_to_next_level..\s?=\s?parseInt..(\d+)/, text).$1 || 0);
        },
        user_stamina: function(text) {
            return parseInt(doRegex(/user_stamina..\s?=\s?parseInt..(\d+)/, text).$1 || 0);
        },
        fight_results: function(text) {
            var a = /class=.fight_results./;
            return a.test(text);
        },
        fight_controller: function(text) {
            return /<!--[^:]*:\s*fight_controller/.test(text);
        },
        icedCount: function(text) {
            return doRegex(/description.:.\D+([\d,]+)/, text).$1 || 0;
        },
        stashCount: function(text) {
            return doRegex(/popFightLootFeed_\d/, text).$0;
        },
        factionProgress: function(text) {
            return parseInt(doRegex(/^(\d+)/, text).$1 || 0);
        }
    };
        
    // set up the attack timer
    function setAttackTimer(fn) {
        if (fightoptions.get('useAttackDelay') !== true) {
            fn.apply(document);
            return;
        }
        var min = 1, max = 3, delay = 5;
        switch(fightoptions.get('attackDelay')) {
            case 2: min = 2; max = 4; break;
            case 3: min = 3; max = 5; break;
            case 4: max = 5; break;
        }
        delay = Math.floor(Math.random() * (max-min+1)) + min;
        
        statusTimer.start('Attacking '+_List.current.anchor+' in %N% seconds...', delay, fn);
    }
    
    // add user profiles to specified list
    function addMWProfiles(listName, profilesText) {
        var profileRegex = /profile.php\?id=([^\n]+)/g;
        var rgx, data = [];
        var eDiv = $('#'+listName+'_table');
        var eCenter = c$('center').css('margin-top', 10);
        var eLoadInfo =  c$('div').css({'margin':10,'font-weight':'bold'}).text('Loading...');

        while ((rgx = profileRegex.exec(profilesText))) {
            data.push(unescape(rgx[1]));
        }
        if (data.length < 1) {
            return;
        }
        $('table', eDiv).hide();
        eCenter.append(eLoadInfo)
        .append(c$('img').attr('src', global.zGraphicsURL+'socialmissions/ajax-loader.gif'))
        .appendTo(eDiv);
        
        function addProfile() {
            if (data.length < 1) {
                eCenter.remove();
                $('table', eDiv).show();
                fightoptions.toDomElements();
                fightoptions.save();
                return;
            }
            try {
                var id = global.Base64.decode($.parseJSON(data[0]).user);
                if (_fightUtil.opponentListed(listName, _fightUtil.getNumber(id))) {
                    return;
                }
                eLoadInfo.text('Loading user id: '+id);
                ajaxRequest({
                    url: 'remote/' + getIntURL('stats') + '&user=' + id,
                    success: function(htmlText) 
                    {
                        data.splice(0, 1); 
                        addPlayerToWhiteList(htmlText, listName);
                        addProfile();
                    }
                });
            }
            catch(err) {
                logErr$(err);
                data.splice(0, 1);
                addProfile();
            }
        }
        addProfile();
    }
    
    // get and opponent from his profile page
    function getOpponentFromProfile(data) {
        var eQry = h$(data), id, attack, url, sText, startIndex, endIndex, name, level;
        try {
            attack     = String($('a:regex(onclick,xw_action=attack)', eQry).attr('onclick'));
            url        = doRegex(/['"](remote[^"']*)/, attack).$1;
            id         = splitUrl(url).opponent_id;
            sText      = _fightUtil.htmlDecode(eQry.find('.stats_title_text:first').text());
            startIndex = sText.indexOf('"') + 1;
            endIndex   = sText.lastIndexOf('"');
            name       = sText.substr(startIndex, endIndex - startIndex);
            level      = _fightUtil.getNumber(sText.substr(endIndex + 1));
        }
        catch(err) {
            logErr$(err);
            GM_log(err);
            return {error_msg:err.message}; 
        }
        GM_log(id+ ''+ name+ ''+ level+ ''+ 0+ ''+ getProfileLink(id)+ ''+  url);
        return new opponentStats(id, '', name, level, 0, getProfileLink(id),  url);
    }
    
    function addPlayerToWhiteList(page, listName) {
        var player = getOpponentFromProfile(page);
        if (player.error_msg) {
            return false;
        }
        else {
            return _List.addToList(listName, player);
        }
    }
    
    function fromRandomWhiteList() {
        var p, lst = _fightUtil.toArray(fightoptions.get('whiteList'));
          
        if (lst.length == 0) {
            autoModeMessage('No enemy in WhiteList.\nPlease add some enemy to begin.');
            abort_process = true;
            return;
        }
        if (lst.length == 1) {
            p = lst[0];
        }
        else {
            p = lst[Math.floor(Math.random() * lst.length)];
        }
        if (_fightUtil.opponentListed('blackList', p.id)) {
            log$('skiping blacklisted id: ' + p.id);
            delete fightoptions.get('whiteList')[p.id];
            fromRandomWhiteList();
            return;
        }
        autoModeMessage('Loading profile page of enemy: (' + p.name + ')...', true);    
        ajaxRequest({
            url: 'remote/' + getIntURL('stats') + '&user=p|' + p.id,
            success: function(htmlText) 
            {
                _List.current = getOpponentFromProfile(htmlText);
                autoAttack();
            }
        });
    }
    
    /**
     * Filter an opponent.
     * @param {opponentStats} opp
     * @param {Boolean} iced
     * @return {Boolean}
     */
    function isValidOpponent(opp, iced) {
        var n1 = fightoptions.get('skipMafiaOf'), n2 = fightoptions.get('skipLevelOf');
        var o1 = fightoptions.get('skipMafiaWay'), o2 = fightoptions.get('skipLevelWay');
        var i = 0, c = '';
        
        if (fightoptions.get('skipIced') && opp.iced) {
            return false;
        }
        if (fightoptions.get('skipMafia') && (opp.mafia * o1) > (n1 * o1)) {
            log$('skipping "'+opp.name+'" mafia: '+opp.mafia);
            return false;
        }
        if (fightoptions.get('skipLevel') && (opp.level * o2) > (n2 * o2)) {
            log$('skipping "'+opp.name+'" level: '+opp.level);
            return false;
        }
        if (_fightUtil.opponentListed('blackList', opp.id)) {
            log$('skipping blacklisted id: ' + opp.id);
            return false;
        }        
        if (fightoptions.get('useNameFilter') && String(fightoptions.get('nameFilterRgx')).length > 0) {
           if (_fightUtil.filterText('nameFilterRgx',opp.name)) {
              GM_log('skipping name: ' + opp.name);
              return false;
           }
        }
        return true;
    }
    
    /**
     * Filter an opponent by faction 
     * @param {opponentStats} opp
     * @return {Boolean}
     */
    function isValidFaction(faction) {
        if (StartCity === 4 && fightoptions.get('useFactions')) {
            var sFaction = (fightoptions.get('bangkokFaction') == 'any') 
            ? (fightStats.triad > fightStats.yakuza) ? 'triad' : 'yakuza'
            : fightoptions.get('bangkokFaction');
            
            if (faction !== sFaction) return false;
        }
        return true;
    }
    
    // parse fight page to get all opponents
    function parseOpponentTable(htmlText) {
        var jQry = h$(htmlText), faction;
        // update factions
        if (CurrentCity === 4 && (faction = jQry.find('.zy_progress_bar_faction_text')).length === 2) {
            fightStats.yakuza = _Regex.factionProgress(faction.eq(0).text());
            fightStats.triad  = _Regex.factionProgress(faction.eq(1).text());
            updateStats();
        }
        var countFight = 0;
        // fighters table
        jQry.find('.fight_table tr:has(a)').each(function(index, element) 
        {
            var elem, sUrl, nId, sId, bIced, sProfile, sName, sTitle, nMafia, nLevel, sFaction = '';
            try {
                if ((elem = e$('img:regex(src,triads|yakuza)', element))) {
                    sFaction = elem.attr('alt');
                }                
                if ((elem = e$('a:regex(href,action=attack)', element))) {
                    nId = _fightUtil.getNumber(sId = splitUrl(sUrl = elem.attr('href')).opponent_id);
                    sProfile = getProfileLink(sId);
                }
                sName    = $.trim($('td:eq(0) a', element).text());
                nLevel   = _fightUtil.getLevel($('td:eq(0)', element));
                bIced    = ($('img:regex(src,iced)', element).length > 0);
                sTitle   = $.trim($('td:eq(0) span', element).text());
                nMafia   = _fightUtil.getNumber($('td:eq(1)', element).text());
                
                if (sUrl && sName && sProfile && nLevel && nId) {
	                var opp = new opponentStats(nId, sTitle, sName, nLevel, nMafia, sProfile, sUrl, bIced, sFaction);
	                if (isValidOpponent(opp)) {
	                   _List.add(opp);
                     countFight++;
                     if (countFight>5) return false;
                  }
                }
            }
            catch(err) {
                logErr$(err);
            }
        });
        if (!fightoptions.get('skipIced')) _List.sort('iced');
        log$('UserList parsed: new fighters total: ' + _List.length());
    }
    
    // Refresh fight table 
    function refreshPlayerList(callback) {
        GM_log('Refreshing player...');
        
        ajaxRequest({
            url: 'remote/' + getIntURL('fight'),
            liteLoad: 1, 
            success: function(htmlText) 
            {
                if (_Regex.fight_controller(htmlText)) {
                    parseOpponentTable(htmlText);
                }
                if (typeof(callback) == 'function') {
                    callback.apply(document, [htmlText]);
                }
            }
        });
    }
    
    // generate a new log event
    function genLogDom(message, icon, pic) {
        if (icon && icon=='loot')
           addLootToLog(message, pic);
           //addToLog('Loot', message);
        else
           addToLog('Fight', message);
        //addToLog(loged,message, sec, icon, pic) {
    }
    
    // add a new loot log
    function addLootToLog(message, pic) {
        //var obj = $('<div>'+message+'</div>');
        
        //$('a', obj).remove();
        //message = obj.text().replace(/<br>[^!]+!/g,'');
        
        var rgx2,rgx = message.match(/\s(\d)\s([^!]*)!/);
        //var rgx2,rgx = message.match(/\s(\d)\s([^?]+)<br>/);
        if (rgx) {  
            var title = rgx[2].replace(/\s*/g, '');
            var count = parseInt(rgx[1]); 
            var elt = e$('#loot_item_'+title, headerAttr.message_body['Loot']);
            if (elt !== null) {
               var strlt = elt.html();
               rgx2 = strlt.match(/\s(\d)\s([^!]*)!/);
               //GM_log(rgx2);
               if (rgx2) {
                  count += parseInt(rgx2[1]); 
                  elt.html(strlt.replace(/found\s*\d/g,'found '+count));
               }
            }
            else {
            	 rgx2 = message.match(/\(([^\)]+)\)/g);
            	 if (rgx2 && rgx2.length==3)
                  c$('div', 'loot_item_'+title).css({'padding':'2px'}).html('found '+rgx[0]+' '+rgx2[1]).prependTo(headerAttr.message_body['Loot']);
               else    
                  c$('div', 'loot_item_'+title).css({'padding':'2px'}).html('found '+rgx[0]).appendTo(headerAttr.message_body['Loot']);
            }
        }
    }
    
    // update stats from fightStats class
    function updateStats() {
        //$('#mass_stat_exp_per_sta').text(fightStats.exp_per_sta());
        //$('.bossfight_current_health_med').attr('style', 'width: ' + fightStats.healthpercent() + '%;');
        //$('#mass_stat_cash').html(fightStats.cash());
        //
        //for (f in fightStats) {
        //    var stat = fightStats[f];
        //    var elem = e$('#mass_stat_' + f.toLowerCase());
        //    if (elem !== null && typeof(stat) == 'number') {
        //        elem.text(stat);
        //    }
        //}
    }
    
    // show a message
    function autoModeMessage(message, hasAjax, hideStopButton) {
        if (hasAjax === true) {
            $('#Bot-msg')
            .html('<img style="vertical-align: middle;" src="' + global.resource.ajax_loader + '">')
            .append('<span style="margin-left: 5px;">' + message + '</span>');
        }
        else {
            $('#Bot-msg').html(message);
        }
    }
    
    // travel to specified city
    function tavelTo(toCity, callback) {
        if (abort_process) { 
            return;
        }
        var tryAgain = function() { tavelTo(toCity, callback); };
        
        autoModeMessage('Traveling to ' + cities[toCity][0] + '...', true);        
        travelToCity(toCity, function(city) {
            if ((CurrentCity = city) === parseInt(toCity)) {
                callback && callback();
            }
            else {
                statusTimer.start('Unexpected city, taveling to '+ cities[toCity][0] + ' in %N% seconds.', 15, tryAgain);
            }
        });
    }
    
    // heal player
    function healPlayer(callback) {
        if (abort_process) {
            return;
        }
        var tryAgain = function() { healPlayer(callback); };
        var city = parseInt(fightoptions.get('healIn'));
        
        function Heal(url) {
            autoModeMessage('Healing at ' + cities[city][0] + '...', true);
            jsonRequest(url, function(jsonData) 
            {
                try {
                    fightStats.health = parseInt(jsonData.user_fields["user_health"]);
                    if (fightStats.health < fightoptions.get('healWhen')) {
                        statusTimer.start(jsonData.hospital_message+' try again in %N% seconds.', 30, tryAgain);
                    }
                    else {
                        genLogDom(jsonData.hospital_message, 'heal');
                        updateStats();
                        if (CurrentCity !== StartCity) {
                            tavelTo(StartCity, callback);
                        }
                        else {
                            callback && callback(); 
                        }
                    }
                }
                catch(err) {
                    statusTimer.start('Error healing. Try again in %N% seconds.', 15, tryAgain);
                }
            });            
        }
        if (city === 1 && city !== CurrentCity) {
            Heal('remote/' + getIntURL('hospital', 'heal', CurrentCity) + '&xcity=1');
        }
        else if (city !== CurrentCity) {
            tavelTo(city, function() { Heal('remote/' + getIntURL('hospital', 'heal', city)); });
        }
        else {
            Heal('remote/' + getIntURL('hospital', 'heal', city));
        }

    }
    
    // check cash to bank it
    function checkBankMoney(callback) {
        if (fightoptions.get('useBank') && fightStats.userCash > fightoptions.get('useBankWhen') && CurrentCity==fightoptions.get('usebankcity')) {
            bankDeposit(StartCity, fightStats.userCash, function(result) {
                genLogDom(result, 'bank');
                callback && callback();
            });
        }
        else {
            callback && callback();
        }
    }
    
    // update player account stats
    function updateUserFields(data) {
        var user_fields, faction;
        if (typeof(data.user_fields) == 'object') {
            user_fields = data.user_fields;
        }
        else {
            data = String(data);
            var startIndex = data.indexOf('var user_fields');
            var endIndex = data.indexOf('user_fields_update', startIndex);
            eval(data.substr(startIndex, endIndex - startIndex));
        }
        if (user_fields) {
	        fightStats.health          = user_fields['user_health'];
	        fightStats.maxHealth       = user_fields['user_max_health'];
	        fightStats.stamina         = user_fields['user_stamina'];
	        fightStats.maxStamina      = user_fields['user_max_stamina'];
	        fightStats.expToNextLevel  = user_fields['exp_to_next_level'];
	        fightStats.userCash        = user_fields['user_cash'];
	                
	        CurrentCity = user_fields['current_city_id'];
        }
    }
    
    // request a survey for fast player update  
    function reqSurvey() {
         jsonRequest(
            'remote/' + getIntURL('survey', 'show_nps_survey'),
            function(jsonData) 
            {
                updateUserFields(jsonData);
                updateStats();
                autoAttack();
            }
        );
    } 
    
    //-----------------------------
    // AUTOMATIC MODE
    //-----------------------------
    var autoAttackNew = function() {
        if (bAttackWhiteList) {
            fromRandomWhiteList();
            return;
        }
        // next opponent
        _List.setRandomCurrent();
        if (typeof(_List.current) == 'undefined') {
            autoRefreshList();
            return;
        }
        if (_fightUtil.opponentListed('blackList', _List.current.id)) {
            log$('skipping blacklisted id: ' + _List.current.id);
            autoAttackNew();
            return;
        }
        if (!isValidFaction(_List.current.faction)) {
            log$('skipping "'+_List.current.name+'" faction: '+_List.current.faction);
            autoAttackNew();
            return;
        }
        setAttackTimer(function() {
            autoAttack();
        });
    }
    function autoRefreshList() {
        if (abort_process) 
            return;
        
        autoModeMessage('Can\'t find fighters, try to change filters, or wait...', true);
        _List.clear();
        
        refreshPlayerList(function() {
            if (_List.length() > 0) {
                autoAttackNew();
            }
            else {
                setTimeout(autoRefreshList, 3000);
            }
        });
    }
    function autoAttack() {
        var op = fightoptions.get, fs = fightStats;
        
        if (abort_process) {
            return;
        }
        try {
            if (fightoptions.get('fightin')!==7) 
               StartCity = fightoptions.get('fightin');
            else 
            	 StartCity = CurrentCity;
            if (CurrentCity !== StartCity) {
               tavelTo(StartCity, autoAttack);
               return;
            }
            if (op('stopBeforeLvlUp') && fs.expToNextLevel < op('expLeftToStop')) {
                checkBankMoney();
                autoModeMessage('Auto-Attack deactivated, experience is less than specified.');
                abort_process = true;
                return;
            }
            if (fs.stamina < 1 || (op('stopWhenStamina') && fs.stamina < op('staminaToKeep'))) {
                checkBankMoney();
                if (op('stopWhenStamina'))
                   statusTimer.start('No stamina left, continue in %N% seconds.', 4.5*60*(op('staminaToKeep')-fs.stamina), quickUpdateStat);
                else
                   statusTimer.start('No stamina left, continue in %N% seconds.', 4.5*60, quickUpdateStat);
                return;
            }
            if (fs.health < op('healWhen')) {
                checkBankMoney();
                if (!op('useHeal')) {
                    if (fs.health<20) {
                       statusTimer.start('Healing is set off, continue in %N% seconds.', (20-fs.health)*2.5*60, quickUpdateStat);
                       return;
                    }   
                }
                else {
                    healPlayer(autoAttack);
                    return;
                }
            }
            var url = _List.current.attack; 
            var counter = op('attackCounter') - _List.current.fights;
            
            if (op('useAttackCount') && counter < 1) {
                log$('skiping '+_List.current.name+' - due max. attacks, count: '+_List.current.fights);
                checkBankMoney(autoAttackNew);
                return;
            }
            if (op('usePowerAttack') && _List.current.pwratk) {
                if (counter > 4 || !op('useAttackCount')) url = _List.current.pwratk;
            }
            if (!/xw_controller=fight/i.test(url)) {
                autoAttackNew();
                return; 
            }
            autoModeMessage('Attacking ' + _List.current.anchor + '...', true);
            
            ajaxRequest({
                url: url,
                liteLoad: 1,
                success: function(htmlText) 
                {
                    if (abort_process) {
                        return;
                    }
                    if (_List.length() < 3 && !bAttackWhiteList) {
                        parseOpponentTable(htmlText);
                    }
                    switch( parseAttackResponse(htmlText, true) ) {
                        case ERROR_BAD_RESPONSE:
                            statusTimer.start('Some error in server response, try again in %N% seconds.',3, autoAttackNew);
                            break;
                            
                        case ERROR_NO_FIGHT_RESULT:
                            if (fightStats.health < op('healWhen')) {
                                autoAttackNew();
                            }
                            else if (!bAttackWhiteList) {
                                autoRefreshList();
                            }
                            break;
                            
                        case ERROR_SUCCESS:
                            if (_List.current.alive && _List.current.win) {
                                setAttackTimer(autoAttack);
                            }
                            else {
                                checkBankMoney(autoAttackNew);
                            }
                            break;
                    }
                }
            });
        }
        catch(err) {
            logErr$(err);
            autoAttackNew();
        }

    }
    //-----------------------------
    // ATTACK PARSER
    //-----------------------------
    /**
     * Evaluate a fight result. 
     * @param {String} html HTML Response Text
     * @param {Boolean} autoMode True for automatic mode
     */
    function parseAttackResponse(htmlText, autoMode) {
        var obj = h$(htmlText)
        var oScript = {
            user_fields: obj.find('script:regex(text,local_xw_sig =|var user_fields)'),
            postW2Wback: obj.find('script:regex(text,postW2Wback|share_asn_feed)'),
            postFightBrag: obj.find('script:regex(text,_postFeedAndSendFightBrag)')
        };
        
        // update stats and signature
        if (oScript.user_fields.length < 1) {
            return ERROR_BAD_RESPONSE;
        }
        
        $('#sf_updater').append(oScript.user_fields);
        updateUserFields(oScript.user_fields.text());
        
        // check it has a fight results
        if (!_Regex.fight_results(htmlText)) {
            return ERROR_NO_FIGHT_RESULT;
        }
        
        obj = new queryResult(htmlText);
        
        var rgx, s_dialog, s_outText = '';
        var opponent = _List.current;
        var n_cash = _fightUtil.getNumber(obj.cash.text().replace(',',''));
        var n_done = _fightUtil.getNumber(obj.damage.text());
        var n_take = _fightUtil.getNumber(obj.health.text());
        var n_expe = _fightUtil.getNumber(obj.experience.text());
        var n_won = 0, n_lost = 0;
        var s_cashfrom = String(obj.cash.attr('class')).replace(/sexy_|_cash|good|bad|\s*/g, '');
        var b_goodCash = (s_cashfrom  == cities[StartCity][1]);
        
        
        /**
         * Return a new HTML text of a Iced bonus.
         * @param {Number, String} count Iced count.
         * @return {String}
         */
        function addIcedToLog(script) {
            var sHtml = '', bHtml = '';
            var n_count = _Regex.icedCount(script);
            
            bHtml += '<a id="feed_send_fight_btn'+fightStats.iced;
            bHtml += '" onclick="postFeedAndSendFightBrag_'+fightStats.iced+'(); return false;" ';
            bHtml += 'class="sexy_button_new medium white"><span><span style="color: black;">';
            bHtml += 'Share with Friends</span></span></a>';
            
            sHtml += 'You ICED ' + opponent.anchor + ', bringing your body count to ' + n_count;
            sHtml += '.<div id="iced_bonus">'; 
            sHtml += _fightUtil.addIcedCount(script, fightStats.iced);
            sHtml += bHtml + '</div>';
            
            genLogDom(sHtml, 'iced');
            fightStats.iced++;
        }
        
        function addCoinsToLog() {
            try {
                var asn         = c$('div').append(obj.share_asn);
                var icon        = String($('img', asn).attr('src'));
                var sHtml       = '<script>'+oScript.postW2Wback.text()+'</script>';
                var startIndex  = icon.lastIndexOf('/')+1;
                var endIndex    = icon.lastIndexOf('.');
                var id          = $.trim(icon.substr(startIndex, endIndex-startIndex));
                
                if (id.length > 2 && e$('#' + id) == null) 
                {
                    log$('addCoinsToLog:'+ id);
                    asn.attr('id', id);
                    $('img', asn).remove();
                    $('div', asn).removeAttr('style');
                    
                    sHtml += c$('div').append(asn).html();
                    
                    genLogDom(_fightUtil.addCoinsCount(sHtml, fightStats.coins), 'asn', icon);
                    fightStats.coins++;
                }
                else {
                    $('#' + id).append(_fightUtil.addCoinsCount(sHtml, fightStats.coins));
                }
            } catch (err) {
                logErr$(err);
            }
        }
        
        function addKillToLog(count) {
            fightStats.kill++;
            
            genLogDom('You killed ' + opponent.anchor + ', bringing your total body count to ' + count + '!', 'kill');
        }
        
        if (StartCity === 4) {
            fightStats.yakuza = _Regex.factionProgress(obj.yakuza);
            fightStats.triad  = _Regex.factionProgress(obj.triad);
        }
        
        // set opponent attack buttons
        opponent.attack = obj.attackAgain;
        opponent.pwratk = obj.pwrAttack;
        var fullAnchor = opponent.anchor + ' (Lv.'+opponent.level+' ';
					  fullAnchor += '<img style="width: 22px; height: 16px;" alt="Mafia Defense Strength" title="Mafia Defense Strength" src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon_mafia_defense_22x16_01.gif">'+obj.opponent.groupDefense;
					  fullAnchor += ') ';
        if (obj.hint.length > 1)
        {
            s_dialog = 'POWERATTACK';
            
            n_won  = _fightUtil.getNumber(obj.hint.eq(0).text());
            n_lost = _fightUtil.getNumber(obj.hint.eq(1).text());
            
            s_outText = 'You fought ' + fullAnchor + ' ' + (n_lost + n_won) +' times. '
                      + '<span class="good">You won ' + n_won + ' fights</span> and '
                      + '<span class="bad">lost ' + n_lost + ' fights</span>, ';
        }
        else 
        {
            var nKillCount = 0;
            s_dialog = _fightUtil.rgbToHex(obj.hint.css('color'));
            
            if (s_dialog == '#ffffff' && (nKillCount = _fightUtil.getNumber(obj.hint.text())) > 0) {
                addKillToLog(nKillCount);
            }
            if (obj.won) {
                s_dialog += '_WON';
                n_won++; 
                s_outText = 'You fought ' + fullAnchor + ' 1 time. <span class="good">You won the fight</span>, ';
            }
            else {
                s_dialog += '_LOST';
                n_lost++;
                s_outText = 'You fought ' + fullAnchor + ' 1 time. <span class="bad">You lost the fight</span>, ';
            }
        }
        // apply stats
        fightStats.atkGained   = _fightUtil.getNumber(obj.player.groupAttack) - fightStats.startGroupAtk;
        fightStats.defGained   = _fightUtil.getNumber(obj.player.groupDefense) - fightStats.startGroupDef;
        fightStats.wonFights   += n_won;
        fightStats.lostFights  += n_lost;
        opponent.fights        += (n_lost + n_won);
        fightStats.totalFight  += (n_lost + n_won); 
        fightStats.experience  += n_expe;
        if (b_goodCash)
            fightStats.money   += (obj.cash.hasClass('good') ? n_cash : n_cash * -1);
        
        // Set player to dead by default
        opponent.alive = false;
        
        if (opponent.pwratk || opponent.attack) 
        {
            opponent.alive = true;
        }
        if (obj.won) 
        {
            opponent.win = true;
            if (opponent.alive) {
                // skip if no cash
                if (fightoptions.get('skipNoCash') && (n_cash < 1 || !b_goodCash)) {
                    log$('skiping ' + opponent.name + ' drop cash: ' + n_cash);
                    opponent.alive = false;
                }
                // skip if not faction
                if (StartCity === 4 && fightoptions.get('skipNoFaction') && !obj.addFaction) {
                    log$('skiping ' + opponent.name + ' no faction points.');
                    opponent.alive = false;
                }
            }
        }
        else 
        {
            opponent.win = false;
            // add enemy to blacklist
            if (fightoptions.get('useBlacklist')) {
                if (_List.addCurrentToBlackList()) {
                    fightStats.blacklisted++;
                    if (fightoptions.get('showBlackListed'))
                        genLogDom(
                            '"The beast" ' + _List.current.anchor + 
                            ' is too strong!, added to BlackList.',
                            'blacklist',
                            obj.opponent.image.attr('src')
                        );
                }
            }
        }
        
        s_outText += 'taking <span class="bad">' + n_take + '</span> damage ';
        s_outText += 'and dealing <span class="good">' + n_done + '</span> damage to your enemy. ';
        s_outText += 'You ' + (obj.won ? 'gained' : 'losed');
        s_outText += ' <span class="' + obj.experience.attr('class') + '">' + n_expe; 
        s_outText += '</span> experience points ';
        s_outText += 'and <span class="' + obj.cash.attr('class') + '">';
        s_outText += obj.cash.text().replace(/[\t\s+]*/g,'') + '</span>. ';
        
        
        // VICTORY POINTS
        if (obj.vCoin.length) {
            fightStats.victorycoins += _fightUtil.getNumber(obj.vCoin.text());
            s_outText += 'and gain <span>' + obj.vCoin.html() +'</span>';
        }
        
        if (fightoptions.get('showcoins') && obj.share_asn.length > 0) {
            addCoinsToLog();
        }
        
        // BONUSES
        $('.fightres_bonus', obj.bonuses).each(function(index, element)
        {
            var imgUrl   = $('.fightres_bonus_image > img', element).attr('src');
            var imgLoot  = e$('img:regex(src,bonusloot)', element);
            var imgStash = e$('img:regex(src,secretstash)', element);
            var elt      = $('.fightres_bonus_message', element);
            var s_bonus  = imgLoot ? 'loot' : (imgStash ? 'stash' : 'help');
            
            if (!fightoptions.get('show'+s_bonus)) {
                return;
            }
            
            if (s_bonus == 'loot') {
                imgUrl = $('.fightres_bonus_message img', element).attr('src');
                $('div:has(img)', elt).remove();
            }
            var strlog = elt.html().replace(/<div\s+style*=*"([^"]+)"/,'<div');
            elt.html(strlog);

            if (s_bonus == 'stash') {
                genLogDom(_fightUtil.addStashCount(elt.html(), fightStats.stash), s_bonus,  imgUrl);
                fightStats.stash++;
            }
            else {
                genLogDom(elt.html(), s_bonus,  imgUrl);
            }
        });

        // Add data to log
        genLogDom(s_outText);
        
        // ICED bonus
        if (oScript.postFightBrag.length > 0) {
            addIcedToLog('<script>'+oScript.postFightBrag.text()+'</script>');
            s_dialog = 'ICED';
        }
        
        // UPDATE ALL FIELDS STATS
        updateStats();
        
        //if (!autoMode || (fightoptions.get('useAttackDelay') && fightoptions.get('attackDelay') >= 1)) {
        //    if (fightoptions.get('showDialogs')) showDialog(s_dialog, obj.won);
        //}
        
        _List.current = opponent;
        
        delete obj;
        
        return ERROR_SUCCESS;
    }
    
    function Initialize() {
        _List.clear();
        autoModeMessage('', false, true);
        // Get stats.
        jsonRequest(
            'remote/' + getIntURL('survey', 'show_nps_survey'),
            function(jsonData) 
            {
                updateUserFields(jsonData);
                
                fightStats.startGroupAtk = _fightUtil.getNumber(jsonData.fightbar.group_atk);
                fightStats.startGroupDef = _fightUtil.getNumber(jsonData.fightbar.group_def);

                updateStats();
            }
        );
        
        fightoptions.toDomElements();
        reqSurvey();
    };
     function quickUpdateStat() {
        function doUpdate(htmlText) {
              var oScript = {
                  user_fields: h$(htmlText).find('script:regex(text,local_xw_sig =|var user_fields)'),
                  postW2Wback: h$(htmlText).find('script:regex(text,postW2Wback|share_asn_feed)'),
                  postFightBrag: h$(htmlText).find('script:regex(text,_postFeedAndSendFightBrag)')
              };
              // update stats and signature
              if (oScript.user_fields.length < 1) {
                  return ERROR_BAD_RESPONSE;
              }
              $('#sf_updater').append(oScript.user_fields);
              updateUserFields(oScript.user_fields.text());
              updateStats();
              autoAttackNew();
        }
        fightStats.health = 30;
        fightStats.stamina = 100;
        CurrentCity = getCurrentCity();
        if (fightoptions.get('fightin')==7)
           StartCity = getCurrentCity();
        else
           StartCity = fightoptions.get('fightin');
        autoRefreshList();
    }
   // EVENTS
    this.fightProfile = function(xurl) {
        var ap = abort_process;
        abort_process = true;
        var profileRegex = /profile.php\?id=([^\n]+)/g;
        var rgx, userMW;
        if (rgx = profileRegex.exec(xurl)) {
           userMW = unescape(rgx[1]);
           GM_log(userMW);
           try {
                var id = global.Base64.decode($.parseJSON(userMW).user);
                //if (_fightUtil.opponentListed('blackList', _fightUtil.getNumber(id))) {
                //    return;
                //}
                GM_log(id);
                ajaxRequest({
                    url: 'remote/' + getIntURL('stats') + '&user=' + $.parseJSON(userMW).user,//_fightUtil.getNumber(id),
                    success: function(htmlText)
                    {
                        _List.clear();
      									statusTimer.clear();
                        autoModeMessage('', false, true);
                        abort_process = false;
                        var opp = getOpponentFromProfile(htmlText);//
                        _List.add(opp);
                        _List.current = opp;
                        //_List.add(getOpponentFromProfile(htmlText));
                        autoAttack();
                    }
                });
           }
           catch(err) {
                logErr$(err);
                abort_process = ap;
           }
        };
    };
    this.stop  = function() {
      abort_process = true;
      statusTimer.clear();
      autoModeMessage('', false, true);
      return false;
    };
    this.start = function()  {
      abort_process = false;
      statusTimer.clear();
      autoModeMessage('', false, true);
      if (fightoptions.get('fightin')==7)
         StartCity = getCurrentCity();
      else
         StartCity = fightoptions.get('fightin');
      Initialize();
    };
    return this;
}
  
 this.initMod = function() {
 	  //clearTimeout(listStream[1]._event);
 	  //clearTimeout(listStream[2]._event);
 	  //clearTimeout(listStream[3]._event);
 	  if (listStream[2].list==undefined) listStream[2].list = new List(2);
 	  if (listStream[3].list==undefined) listStream[3].list = new List(3);
   	
   	if (global.readerCycle==null) global.readerCycle = new fn_ReaderCycle(headerAttr.reader_msg,30);
 	  if (global.speedBattle==null) global.speedBattle = new fnspeedbattlefield();
 }
this.loadcontroller =  function() {
 	addToLog('Generic','Initializing SpeedButtoN modul...Ready!');
  speedoptions.load(function() {
     $('#speed_navplay').attr('style','display:'+(speedoptions.get('playStream')? 'none':'block'));
     $('#speed_navpause').attr('style','display:'+(speedoptions.get('playStream')? 'block':'none'));
     $('#speed_nav0_On').attr('style','display:'+(speedoptions.get('playFight')? 'block':'none'));
     $('#speed_nav0_Off').attr('style','display:'+(speedoptions.get('playFight')? 'none':'block'));
     $('#speed_nav1_On').attr('style','display:'+(speedoptions.get('playProperty')? 'block':'none'));
     $('#speed_nav1_Off').attr('style','display:'+(speedoptions.get('playProperty')? 'none':'block'));
     
     e$('#speedstream_readerdelay').val(speedoptions.get('playtimer')[1].value);
     e$('#speedstream_wardelay').val(speedoptions.get('playtimer')[2].value);
     e$('#speedstream_helpdelay').val(speedoptions.get('playtimer')[3].value);
     e$('#speedstream_limitread').val(speedoptions.get('limitCycle'));

     if (speedoptions.get('playStream') && (global.readerCycle.status==0)) setTimeout(doPlaying, 5000);
     if (speedoptions.get('playFight') && (!listStream[4]._event)) {
        listStream[4]._event = setTimeout(function () { global.speedBattle.start();}, 20000); 
        addToLog('Fight','<span style="color:#00FFCC;"> Fighting at critical health is ON!</strong></span>'); 
     }
     if (speedoptions.get('playProperty') && (!listStream[5]._event)) {
        listStream[5]._event = setTimeout(function () { CollectProperties();}, 20000); 
     }
  });
 	  //loading options
 	fightoptions.load(function() {
 	  fightoptions.toDomElements();
 	});
 	streamOptions.load(function() {
     streamOptions.each(function(name, value) {
        var elem = e$('#speedstreamopt_'+ name.toLowerCase());
        if (elem == null) 
            return;
        var valobject = value;    
        if ((typeof(value) == 'object') && (value.doing!==undefined)) {
        	 valobject = value.doing;
        }	
        if (elem.is('input:checkbox')) {
           elem[0].checked = valobject;
        }
        else {
            elem.val(valobject);
        }
     });
 	});
}
function speedtoGood(value, def) {
 switch (typeof(def)) {
     case 'string'  : return String(value);
     case 'number'  : return isNaN(value) === false  ? parseInt(value) : def;
     case 'boolean' : return value === true;
     default: 
         if (typeof(value) !== typeof(def)) {
             return def;
         }
         else {
             return value;
         }
 }
}

function saveSpeedOpt() { 
  speedoptions.set('playtimer',{
    1:{name:'reader',value:speedtoGood(e$('#speedstream_readerdelay').val(),speedoptions.get('playtimer')[1].value)},
    2:{name:'war',value:speedtoGood(e$('#speedstream_wardelay').val(),speedoptions.get('playtimer')[2].value)},
    3:{name:'job',value:speedtoGood(e$('#speedstream_helpdelay').val(),speedoptions.get('playtimer')[3].value)}
   });
  speedoptions.set('limitCycle',e$('#speedstream_limitread').val());
  speedoptions.save();
}
function saveStreamOpt() {
var useRewardFilter = streamOptions.get('useRewardFilter'),
    useFriendWar = streamOptions.get('useFriendWar'),
    useFriendJob = streamOptions.get('useFriendJob'),
    useFriendProp = streamOptions.get('useFriendProp'),
    useFriendMission = streamOptions.get('useFriendMission'),
    usePropertyFilter = streamOptions.get('usePropertyFilter'),
    useMissionFilter = streamOptions.get('useMissionFilter'),
    useStashFilter = streamOptions.get('useStashFilter');
  streamOptions.each(function(name, value) {
     var elem = e$('#speedstreamopt_'+ name.toLowerCase());
     if (elem == null) 
         return;
     if (elem.is('input:checkbox')) {
        if (typeof(value) == 'object') {
           value.doing = elem.get(0).checked;
           streamOptions.set(name, value);
           
        } else
        	 streamOptions.set(name, elem.get(0).checked);
     }
     else {
     	   streamOptions.set(name, elem.val());
     }
     if (typeof(value) == 'object') {
     	  if (value.rf!==undefined) {
     	  	 value.rf = false; value.ff = useFriendWar;
     	  } 
     	  else if (value.mf!==undefined) {
     	  	 value.mf = useMissionFilter; value.ff = useFriendMission;
     	  }	  
     	  else if (value.sf!==undefined) {
     	  	value.sf = useStashFilter;
     	  }
     	  else if (value.pf!==undefined) {
     	  	value.pf = usePropertyFilter;
     	  	value.ff = useFriendProp;
     	  }
     	  else if (value.ff!==undefined) value.ff = useFriendJob;
 	      
 	      streamOptions.set(name, value);
     }
  });
  
  streamOptions.save();
}

function CollectProperties() {
   //function dohttpRequest(options) {
   //    try {
   //        var xmlHttp = new XMLHttpRequest();
   //        
   //        if (!xmlHttp) {
   //            throw Error('Can\'t create XMLHttpRequest object.');
   //        }
   //        if (typeof(options.success) !== 'function') {
   //            throw ReferenceError('success is not defined');
   //        }
   //        if (typeof(options.url) !== 'string') {
   //            throw ReferenceError('url is not defined');
   //        }
   //        if (typeof(options.timeout) !== 'number') {
   //            options.timeout = 15000;
   //        }
   //        if (options.liteLoad !== 1) {
   //            options.liteLoad = 0;
   //        }
   //        // set timeout
   //        var nTimeout = setTimeout(
   //            function() {
   //                xmlHttp.onreadystatechange = function(){};
   //                xmlHttp.abort();
   //                log$('Timeout for url:\n'+options.url);
   //                options.error && options.error('timeout.');
   //            },
   //        options.timeout);
   //        var body = {
   //            //'ajax': 1,
   //            'liteload': options.liteLoad
   //        };       
   //        
   //        xmlHttp.onreadystatechange = function() {
   //            if(xmlHttp.readyState == 4) {
   //                clearTimeout(nTimeout);
   //                if (xmlHttp.status == 200) {
   //                    options.success(xmlHttp.responseText);
   //                }
   //                else {
   //                    options.error && options.error('(#'+xmlHttp.status+') ');
   //                }
   //            }
   //        };
   //        GM_log(options.url);
   //        // send request
   //        xmlHttp.open('POST', options.url, true);
   //        xmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
   //        //xmlHttp.send($.param(body));
   //        xmlHttp.send();
   //    }
   //    catch(err) {
   //        logErr$(err);
   //        options && options.error && options.error(err);
   //    }
   //}
   function readProperties(xurl,callback) {
   //     // send request
   //     dohttpRequest({
   //         url: xurl,
   //         liteLoad:1,
   //         timeout: 20000,
   //         success: function(htmlText) {
   //             callback(htmlText);
   //         },
   //         error: function(errText) {
   //             GM_log(errText);
   //             callback(errText);
   //         }
   //     });
     
     
     
     GM_xmlhttpRequest({
         method: 'POST',
         url:  xurl,
         //data: _myParms,
         headers: {
             'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
             'Accept-Language': 'en-us,en;q=0.5',
             'Content-Type':    'application/x-www-form-urlencoded'
         },
         onload: function(_responseDetails) {
           if (_responseDetails.status == 200) 
              callback(_responseDetails.responseText);
         }
     });
   }
   var doCollectCity= function (_url, _msg) {
   	  var xUrl = (_msg.city==0 ? 'http://m.mafiawars.com/mobileweb?xw_controller=PropertyV2Mobile&xw_action=view&iframe=1':_url);
   	  readProperties(xUrl, function(data) {
   	  	 var propBox;
          var Time_text = /\d+\s?hour|\d+\s?minute|\d+\s?second/i;
   	  	 var val_text = /\d+/i;
   	  	 if (_msg.city!=0) {
   	  	 	  //grab result value
   	  	 	  propBox = $('.property-tile', '<div>'+data+'</div>').eq(_msg.city-1).html();
   	  	 	  var collectTx = $('.property-body > div > div > p', '<div>'+propBox+'</div>').eq(0).text();
 				    _msg.msg = _msg.msg.replace('%J%', collectTx.replace('<br>',' '));
 				    //deposit money
            if (_msg.city==getCurrentCity())
               bankDeposit(_msg.city, 1000000000, function(result) {
                   _msg.msg += '<br>' + result;
                   addToLog('Generic',_msg.msg);
               });
            else   
    				   addToLog('Generic',_msg.msg);
   	  	 	  if (_msg.city==6) {
   	  	 	     addToLog('Generic','<span class="good">Collecting again in '+_msg.time/60+' minute(s)</span>');
                if (speedoptions.get('playProperty'))
                   listStream[5]._event = setTimeout(function () { CollectProperties();}, (_msg.time? _msg.time*1000:600000));
   	  	 	     return;
   	  	 	  }
   	  	 }
   	  	 while (_msg.city<=6) {
   	  	    propBox = $('.property-tile', '<div>'+data+'</div>').eq(_msg.city).html();
   	  	    var button  = $('.property-button > a:regex(href,xw_action=collect_city)', '<div>'+propBox+'</div>');
   	  	    var pCity   = $('.property-header', '<div>'+propBox+'</div>').text();
   	  	    var txTime  = $('.property-body >div:eq(1) > div > p', '<div>'+propBox+'</div>');
             var timeText = Time_text.exec(txTime.text());
             var timeUnit = $.trim(String(timeText).split(" ")[1]);
             
             var timeval  = parseInt(String(timeText).split(" ")[0]);
             if (timeUnit=='hour')
                timeval  = timeval * 60 * 60;
             else if (timeUnit=='minute')
                timeval  = timeval * 60;
             
             if (!_msg.time || (timeval<_msg.time))
                _msg.time = timeval;
             
             _msg.msg = '<span style="color:#00FFCC;" class="good">Collecting from '+pCity+'</span>';
   	  	    if (button && button.attr("href")) {
   	  	    	 var Href = button.attr("href");
   	  	    	 _msg.city++;
   	  	    	 _msg.msg += '<br>%J%, next in '+timeText+'(s)';
   	  	    	 GM_log(Href);
   	  	    	 doCollectCity('http://m.mafiawars.com/'+Href.slice(Href.indexOf('mobileweb?')), _msg);
   	  	    	 break;
   	  	    } else {
   	  	    	 _msg.msg += '<br>Available in '+timeText+'(s)';
   	  	    	 addToLog('Generic',_msg.msg);
   	  	    	 _msg.city++;
   	  	    	 if (_msg.city==6) {
   	  	    	    addToLog('Generic','<span class="good">Collecting again in '+_msg.time/60+' minute(s)</span>');
                  if (speedoptions.get('playProperty'))
                     listStream[5]._event = setTimeout(function () { CollectProperties();}, (_msg.time? _msg.time*1000:600000));
                  return;   
                }
   	  	    }
   	  	 }   
   	  });	
   }
   addToLog('Generic','<span class="good">Start collecting properties...</span>');
   var _data = {
     city  :0,
     time  :undefined,
     msg   :''
   }
   doCollectCity('*', _data);
   
 }
 
 function genMessageHeader(_span,txt,ajaxInclude) {
  var ajaxFill = (ajaxInclude ? '<img style="vertical-align: middle;" src="'+global.resource.ajax_loader+'">' : '');
  _span.html(ajaxFill + txt);
 }
 
 function genSpeedHelpLogDom(action, stremInfo, data) {
   try 
   {  
     var userNM='None';
         var strResult; 
         var connector = (stremInfo.href.indexOf('?') == -1) ? '?' : '&';
         var url = _Util.toIntUrl(stremInfo.href);
         url = (/http/.test(url) ? '' : 'http://facebook.mafiawars.zynga.com/mwfb/') + url;
         var Title = '<a href="'+url+'" style="color:#00FFCC;" target="_black">'+stremInfo.name+'</a>';
         
         var dt0   =   new Date(stremInfo.created_time*1000);
         var dt1   =   new Date();
         var dtTx = (Date.parse(dt1.toString())-Date.parse(dt0.toString()))/1000;
         var name  = '<a href="'+stremInfo.permalink+'" target="_black">'+action.name+'</a> - '+
             '<a href="'+stremInfo.url+'" target="_black">'+stremInfo.userName+'</a>';
         if (action.key && action.key=='O')
         	  strResult = data;
         else
            strResult = _Util.clean(data);
         addToLog((action.name=='Go to war'?'War':(action.name=='Join in a mission'?'Mission':'Generic')),name+'<br>'+Title+'<br>'+strResult,dtTx);
   } catch(err) {
   	addToLog('Generic','Error while logging');
   }  
 }
 
 function addToLog(loged,message, sec, icon, pic) {
     //var idTab;
     //if (loged=='War') idTab=1;
     //else if (loged=='Mission') idTab=2;
     //else if (loged=='Fight') idTab=3;
     //else	idTab=0;
     //tablog.getTabHeader(idTab, function(isActive,tabTitle) {
     //	 if (!isActive) {
     //	 	  var val,ttl = tabTitle.html().toString();
     //	 	  if (val =/\d+/g.exec(ttl))
     //	 	  	 tabTitle.html(tabTitle.html().toString()+parseInt(val)++);
     //	 	  else 
     //	 	  	 tabTitle.html(ttl +'(0)');
     //     //tabTitle.html.replace(/\d+/g, 'popFightLootFeed_'+count)	
     //  } 
     //});
     if (typeof icon !== 'string') 
         icon = 'fight';
     
     // check items amount and kill last if more than max.
     if (headerAttr.message_body[loged].children().length > 150) {
         headerAttr.message_body[loged].children().last().remove();
     }
     var updateItem, lootPic;
     var updateIcon = c$('img').attr({
         'width': 24,
         'height': 24,
         'src': global.resource.info_icon
     });
     //if (icon == 'fight') {
     //    updateItem = $('#fightlogs', '#fightlog_list').empty();
     //}
     //else {
     //if (loged=='Fight')
         updateItem = c$('div', icon+'_item').css({'border-bottom':'1px solid rgb(50,50,50)'}).prependTo(headerAttr.message_body[loged]);
     //else
     //    updateItem = c$('div', icon+'_item').css({'width':730,'border-bottom':'1px solid rgb(50,50,50)'}).prependTo(headerAttr.message_body[loged]);
     //}
     if (loged!='Loot')
     c$('div').addClass('update_timestamp').appendTo(updateItem).html(new Date().toString()+((sec && sec>0)? ' [<span class="good">'+sec+' sec</span>]':''));
     //c$('div').appendTo(updateItem).append(updateIcon);
     //if (pic) {
     //    lootPic = c$('img').attr({
     //        'width': 40,
     //        'height': 40,
     //        'src': pic
     //    });
     //    c$('div').addClass('update_pic').appendTo(updateItem).append(lootPic);
     //}
     var updateTxt = c$('div').appendTo(updateItem).html('<div>'+message+'</div>').css({
         'padding-left': 10,
         'padding-bottom': 3,
         'padding-right': 3//,
         //'left':30//,
         //'width': 700
         //'clear': 'none'
     });
     //updateTxt.fadeIn(1000);//,function(){});
     //if (logBackground[icon]) {
     //    updateItem.css('background', 
     //        'url("' + logBackground[icon] + '") no-repeat scroll right center transparent');
     //    updateTxt.css({
     //        'background-color': 'black',
     //        'opacity': '0.9'
     //    });
     //}
     
     //$('a.sexy_button_new', updateItem).css('color', 'black');	
     
     //if (icon == 'loot' && lootPic && lootPic.length == 1) {
     //    addLootToLog(message, lootPic.clone());
     //}
 }
 
 return this; 
}