// ==UserScript==
// @name            Anonymous/Apocalypse (TON) - Jinster
// @description     For OL/L only - do not share with the fucking scrubs or you know what
// @include         *
// ==/UserScript==
 
if ((window.location.href.indexOf('http://www.kabam.com/thirst-of-night/play') != 0) &&
    (window.location.href.indexOf('https://www.kabam.com/thirst-of-night/play') != 0) &&
    ((window.location.href.indexOf('http://s-static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) &&
    ((window.location.href.indexOf('https://s-static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) &&
    (window.location.href.indexOf('http://kabam1-a.akamaihd.net/pixelkabam/html/pixels/KabamComTON') != 0) &&
    (window.location.href.indexOf('https://kabam1-a.akamaihd.net/pixelkabam/html/pixels/KabamComTON') != 0) &&
    (window.location.href.indexOf('http://kabam1-a.akamaihd.net/pixelkabam/html/pixels/kabamcomton') != 0) &&
    (window.location.href.indexOf('https://kabam1-a.akamaihd.net/pixelkabam/html/pixels/kabamcomton') != 0) &&
    (window.location.href.indexOf('http://www.thirstofnight.com/platforms/kabam') != 0) &&
    (window.location.href.indexOf('https://www.thirstofnight.com/platforms/kabam') != 0) &&
    ((window.location.href.indexOf('http://static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) &&
    ((window.location.href.indexOf('https://static.ak.facebook.com/connect/xd_arbiter.php') != 0) ||
        (window.location.href.indexOf('thirst-of-night') === -1)) &&
    (window.location.href.indexOf('http://apps.facebook.com/thirstofnight') != 0) &&
    (window.location.href.indexOf('https://apps.facebook.com/thirstofnight') != 0) &&
    (window.location.href.indexOf('http://plus.google.com') != 0) &&
    (window.location.href.indexOf('https://plus.google.com') != 0) &&
    (window.location.href.indexOf('http://plusone.google.com') != 0) &&
    (window.location.href.indexOf('https://plusone.google.com') != 0) &&
    (window.location.href.indexOf('http://accounts.google.com') != 0) &&
    (window.location.href.indexOf('https://accounts.google.com') != 0) &&
    (window.location.href.indexOf('-opensocial.googleusercontent.com') === -1) &&
    (window.location.href.indexOf('http://talkgadget.google.com') != 0) &&
    (window.location.href.indexOf('https://talkgadget.google.com') != 0) &&
    (window.location.href.indexOf('http://www.googleapis.com') != 0) &&
    (window.location.href.indexOf('https://www.googleapis.com') != 0)) {
    return;
}
// XXX: When requests are sent, UI is not refreshed in game.
// XXX: When leaving a tab, data in it should be preserved, for later, when user comes back to it.
 
// XXX: For buildings, better is to present a mini-city/fields to choose, and get slot id from it.
// XXX: Make the tabs, rounded corners for better look. And make them close to each other.
 
// XXX: Spying, recalling march. Building creation does not seem to work also.
// XXX: Dragon types to attack.
// XXX: Use greasemonkey @include and @exclude.
 
// Logging
// modules
var INVALID_MODULE = 0;
var UTILS_MODULE = 1;
var DATA_MODULE = 2;
var AJAX_MODULE = 3;
var POPUP_MODULE = 4;
var SCROLL_MODULE = 5;
var UI_MODULE = 6;
var AUTO_ATTACK_MODULE = 7;
var LOGGING_MODULE = 8;
var STORAGE_MODULE = 9;
var USER_MODULE = 10;
var CONFIG_MODULE = 11;
 
// module names
var module_names = ["INVALID", "HELPER CODE", "GAME DATA", "SERVER REQUESTS",
    "BASIC UI DIALOG", "SCROLL", "UI", "AUTO ATTACK", "LOGGING", "LOCAL STORAGE",
    "USER ACTIONS", "GAME CONFIG"];
 
// levels
var INVALID = 0;
var FATAL = 1;
var ERROR = 2;
var WARNING = 3;
var INFO = 4;
 
// level names
var level_names = ["INVALID", "FATAL", "ERROR", "WARNING", "INFO"];
 
var LOG_MSG_NUM_THRESHOLD = 500;
 
var LOG_OBJECT_TYPE = "Log";
 
var log_config = {};
log_config[USER_MODULE] = {level:INFO};
// Do not delete the below line.
log_config[LOGGING_MODULE] = {level:INFO};
function add_log_message(module, level, msg) {
    if ((level <= INVALID) || (level > INFO)
        || (module <= INVALID_MODULE) || (module > CONFIG_MODULE)) {
        alert('Called logging with wrong params: level (' + level + '), module (' + module + ') and message is (' + msg + ')');        
    }
    if (!log_config.hasOwnProperty(module) || !log_config[module]) { return; }
    if (level > log_config[module]['level']) { return; }
   
    var message = {type:LOG_OBJECT_TYPE, module:module, level:level, message:msg};
    store_object(message);
    if (num_stored_objs() > (2 * LOG_MSG_NUM_THRESHOLD)) {
        purge_log(LOG_MSG_NUM_THRESHOLD);
    }
}
function get_log_messages(from_index, level, isExact) {
    var messages = [];
    var to_index = from_index;
    for (var i = 0; i < num_stored_objs(); i++) {
        var key = get_key(i);  
        if (key < from_index) { continue; }
        if (to_index < key) { to_index = key; }
       
        var object = retrieve_object(key);
        if (!object || (object.type != LOG_OBJECT_TYPE)) { continue; }
       
        if (level !== undefined) {
            var logged_msg = object;
            if (isExact && (logged_msg.level == level)) {
                messages.push(logged_msg);
            } else if (!isExact && (logged_msg.level <= level)) {
                messages.push(logged_msg);
            }
        } else {
            messages.push(object);
        }
    }
    return {msgs_got_till:to_index, messages:messages};
}
function purge_log(remaining_count) {
    var my_ids = [];
    for (var i = 0; i < num_stored_objs(); i++) {
        var key = get_key(i);
       
        var object = retrieve_object(key);
        if (object && (object.type == LOG_OBJECT_TYPE)) {
            my_ids.push(key);
        }
    }
    if (my_ids.length < remaining_count) {
        return;
    }
    my_ids.sort(function(a, b) { return (a - b); });
    var start = 0;
    var end = my_ids.length - remaining_count;
     
    for (i = start; i < end; i++) {
        remove_object(my_ids[i]);
    }
    add_log_message(LOGGING_MODULE, FATAL, 'Purged log messages from index ' +
        my_ids[start] + ' to index ' + my_ids[end] + ' at time ' + parseInt(new Date().getTime() / 1000) +
        ' , retaining ' + remaining_count + ' messages.');
}
 
// log utils
function log_if_not_present1(param, name, module, level) {
    if (!is_defined(param)) {
        add_log_message(module, level, 'Parameter ' + name + ' is not defined.');
        return true;
    }
    return false;
}
function get_element_or_log_if_absent(element_id, module, level, doc) {
    if (log_if_not_present1(element_id, "get_element_or_log_if_absent::element_id", module, level)) {
        return null;
    }
    if (!doc) { doc = document; }
    var elem = doc.getElementById(element_id);    
    if (!is_defined(elem)) {
        add_log_message(UI_MODULE, level, 'UI control ' + element_id + ' is not present.');
        return null;
    }
    return elem;    
}
 
// The below functions are utils.
var serverTimeOffset = 0;
function is_defined(value) {
    if ((typeof value != 'undefined') && (value != null)) {
        return true;
    }
    return false;
}
function toQueryString(params) {
    if (log_if_not_present1(params, "toQueryString::params", UTILS_MODULE, INFO)) { params = ''; }
    var queryStr = "";
       
    var name;
    for (name in params) {
        if (queryStr === "") {
            queryStr = name + "=" + params[name];
        } else {
            queryStr = queryStr + "&" + name + "=" + params[name];
        }
    }
    return queryStr.replace(/\_/g, '%5F');
}
function serverTime() {
        return parseInt(new Date().getTime() / 1000) + serverTimeOffset;
}
if (typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
function decodeEntity(str) {
        var ta = document.createElement('textarea');
        ta.innerHTML = str;
        return ta.value;
}
function parseQuotedParams(str) {
    if (log_if_not_present1(str, "parseQuotedParams::str", UTILS_MODULE, INFO)) { str = ''; }
        var params = {};
        var pattern = /\s*(.*?)\s*=\s*('|")(.*?)\2/g;
        var match;
        while ((match = pattern.exec(str)) !== null) {
                params[match[1]] = match[3];
        }
        return params;
}
function add_style(style_spec, document_to_add_to) {
    if (!document_to_add_to) { document_to_add_to = document; }
    if (log_if_not_present1(style_spec, "add_style::style_spec", UTILS_MODULE, INFO)) { style_spec = ''; }
   
        var target = document_to_add_to.getElementsByTagName('head')[0];
        var obj = document_to_add_to.createElement('style');
        obj.type = 'text/css';
        obj.appendChild(document_to_add_to.createTextNode(style_spec));
        target.appendChild(obj);
}
 
// General purpose popup window
function set_popup_stylesheet(document_to_add_to) {
    if (!document_to_add_to) { document_to_add_to = document; }
   
    var style = '.popup_outer {\
                border: 1px solid #777;\
                padding-left:3px;\
                padding-right:3px;\
                padding-bottom:3px;\
                border-radius: 5px;\
                -moz-border-radius: 5px;\
                -webkit-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
                -moz-box-shadow: rgba(0,0,0,0.52) 0 0 5px;\
        }\
        .popup_close {\
                position: absolute;\
                display:block;\
                right:-1px;\
                margin-top:-1px;\
                width:20px;\
                height:18px;\
                text-align:center;\
                color:#fff;\
                background-color:#555;\
                font-weight:bold;\
                font-size:12px !important;\
                padding:1px;\
                border: 1px solid #666;\
                border-radius: 5px;\
                -moz-border-radius: 5px;\
                cursor: pointer;\
        }\
        .popup_close:hover {\
                background-color:#922;\
                background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
                background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
                background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.6) 99%);\
        }\
        .popup_bar:hover {\
                cursor: move;\
        }';
        add_style(style, document_to_add_to);
}
 
function PopUp(name, main_content, x, y, width, height, enableDrag, onClose, document_to_add_to) {
    if (log_if_not_present1(name, "PopUp::name", POPUP_MODULE, ERROR)) { return null; }
    if ((width <= 0) || (height <= 0)) {
        add_log_message(POPUP_MODULE, ERROR, 'Given width (' + width + ') or height (' +
            height + ') of pop-up window are invalid.');
        return null;
    }
   
    if (!document_to_add_to) { document_to_add_to = document; }
   
        this.BASE_ZINDEX = 100;
 
        this.show = show;
        this.toggleHide = toggleHide;
        this.getTopDiv = getTopDiv;
        this.getMainDiv = getMainDiv;
        this.getLayer = getLayer;
        this.setLayer = setLayer;
        this.setEnableDrag = setEnableDrag;
        this.getLocation = getLocation;
        this.setLocation = setLocation;
        this.focusMe = focusMe;
        this.unfocusMe = unfocusMe;
        this.destroy = destroy;
 
        this.div = document_to_add_to.createElement('div');
        document_to_add_to.body.appendChild(this.div);
        this.name = name;
        this.onClose = onClose;
 
        if (x < 0 || x > document_to_add_to.body.offsetWidth) { x = 0; }
        if (y < 0 || y > document_to_add_to.body.offsetHeight) { y = 0; }
 
        // Scramble
        popupParts = ['outer', 'bar', 'top', 'main', 'close'];
        for (var ind = 0; ind < popupParts.length; ind++) {
                popupParts[popupParts[ind]] = name + '_' + popupParts[ind];
        }
       
        this.div.id = popupParts['outer'];
        this.div.className = 'popup_outer';
        this.div.style.zIndex = this.BASE_ZINDEX;
        this.div.style.position = 'absolute';
        this.div.style.display = 'none';
        this.div.style.width = width + 'px';
        this.div.style.height = height + 'px';
        this.div.style.top = (y || 0) + 'px';
        this.div.style.left = (x || 0) + 'px';
        this.drag = enableDrag;
 
        var content = '<span id="' + popupParts['close'] + '" class="popup_close">X</span>\
                        <table cellspacing=0 width=100% height=100%>\
                            <tr id="' + popupParts['bar'] + '" class="popup_bar">\
                                    <td width=100% valign=bottom>\
                                        <span id="' + popupParts['top'] + '" class="popup_top"></span>\
                                    </td>\
                            </tr>\
                            <tr>\
                                <td height=100% valign=top colspan=2 id="' + popupParts['main'] + '" class="popup_main"></td>\
                            </tr>\
                        </table>';
 
        this.div.innerHTML = content;
        document_to_add_to.getElementById(popupParts['close']).addEventListener('click', e_XClose, false);
 
        this.div.addEventListener('mousedown', e_divClicked, false);
       
    var main_window = get_element_or_log_if_absent(popupParts['main'], UI_MODULE, FATAL, document_to_add_to);
    main_window.innerHTML = main_content;
       
    var event_target = this;
    /*
        if (enableDrag) {
                this.dragger = new Draggable(this.div, {
                        handle          : popupParts['main'],
                        scroll          : window,
                        onEnd           : function(dragger, event) {
//                              if (!this.drag) return;
                                var el = dragger.element;
                                var offset = Element.cumulativeOffset(el);
                                el.style.left = offset.left;
                                el.style.top = offset.top;
                        }
                });
        }
        */
 
        function e_divClicked() {
                event_target.focusMe();
        }
        function e_XClose() {
                event_target.show(false);
                if (is_defined(event_target.onClose)) {
                        event_target.onClose();
                }
        }
        function focusMe() {
                this.setLayer(5);
        }
        function unfocusMe() {
                this.setLayer(-5);
        }
        function getLocation() {
                return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
        }
        function setLocation(loc) {
        if (log_if_not_present1(loc, "PopUp::setLocation::loc", POPUP_MODULE, ERROR)) { return; }
                this.div.style.left = loc.x + 'px';
                this.div.style.top = loc.y + 'px';
        }
        function destroy() {
                document_to_add_to.body.removeChild(this.div);
        }
        function setLayer(zi) {
                this.div.style.zIndex = '' + (this.BASE_ZINDEX + zi);
        }
        function getLayer() {
                return parseInt(this.div.style.zIndex) - this.BASE_ZINDEX;
        }
        function getTopDiv() {
                return document_to_add_to.getElementById(popupParts['top']);
        }
        function getMainDiv() {
                return document_to_add_to.getElementById(popupParts['main']);
        }
        function setEnableDrag(b) {
                this.drag = b;
        }
        function show(isShow) {
                if (isShow) {
                        this.div.style.display = 'block';
                        this.focusMe();
                } else {
                        this.div.style.display = 'none';
                }
                return isShow;
        }
        function toggleHide() {
                if (this.div.style.display === 'block') {
                        return show(false);
                } else {
                        return show(true);
                }
        }
        return this;
}
 
// The below function is for Ajax.
/********************************************************************************
* Performs the following actions:                                              *
*  - Generates an appropriate request header                                   *
*  - Parses the request parameters                                             *
*  - Sends the actual request                                                  *
*  - Determines if request was successful based on returned status only        *
*  - Handles a request timed out condition                                     *
*                                                                              *
* Returns the following data:                                                  *
*  - responseText (should be JSON but could be almost anything)                *
*  - status (integer)                                                          *
*  - statusText (string if present)                                            *
*  - ajax (raw ajax request)                                                   *
********************************************************************************/      
function AjaxRequest(url, opts) {
    if (log_if_not_present1(url, "AjaxRequest::url", AJAX_MODULE, ERROR)) { return; }
    if (log_if_not_present1(opts, "AjaxRequest::opts", AJAX_MODULE, ERROR)) { return; }
   
        var timer = null, ajax, headers = {}, h, params;
 
        // Parse request parameters
        params = typeof opts.parameters === 'string' ? opts.parameters : toQueryString(opts.parameters);
 
        // Add request header specific to POST request only
        if (opts.method != 'GET') {
                headers['content-type'] = 'application/x-www-form-urlencoded';
        } else {
                url = url + ((url.indexOf('?') !== -1) ? '&' : '?') + params;
        }
 
        ajax = new XMLHttpRequest();
        if (opts && opts.headers && opts.headers.overrideMime) {
            ajax.overrideMimeType(opts.headers.overrideMime);
        } else {
        headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
        }
        ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                        clearTimeout(timer);
                        var response = {
                                responseText    : ajax.responseText,
                                status                  : ajax.status,
                                statusText              : ajax.statusText,
                                ajax                    : ajax
                        };
                        if ((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) {
                                if (opts.onSuccess) {
                                        opts.onSuccess(response);
                                }
                        } else {
                                if (opts.onFailure) {
                                        opts.onFailure(response);
                                }
                                if (opts['on' + ajax.status]) {
                                        opts['on' + ajax.status](response);
                                }
                        }
                }
        };
        ajax.open(opts.method, url, true);
 
        // Add request headers to ajax request
        for (h in headers) {
                ajax.setRequestHeader(h, headers[h]);
        }
        // Start timeout check before request is sent
        if (opts.timeoutSecs) {
                timer = setTimeout(timedOut, opts.timeoutSecs * 1000);
        }
        // Send request with params if POST otherwise just send request
        if (opts.method != 'GET') {
                ajax.send(params);
        } else {
                ajax.send();
        }
 
        function timedOut() {
                ajax.abort();
                if (opts.onFailure) {
                        // CHECK: 599 is custom error code. See if better option exists.
                        opts.onFailure({responseText:null, status:599, statusText:'Request Timed Out', ajax:ajax});
                }
        }
}
 
// generic object store, using HTML5 storage
var max_object_id = 0;
function store_object(object) {
    try {
        localStorage.setItem(max_object_id++, JSON.stringify(object));
    } catch (e) {
        add_log_message(STORAGE_MODULE, ERROR, "JSON stringify of new object failed.");
    }
}
function retrieve_object(id) {
    if (log_if_not_present1(id, "retrieve_object::id", STORAGE_MODULE, ERROR)) { return null; }
    try {
        var object = JSON.parse(localStorage.getItem(id));
        if (is_defined(object)) {
            return object;
        }
        add_log_message(STORAGE_MODULE, WARNING, "Object for id (" + id +
            ") deleted by underlying (browser) storage mechanisms.");
        return null;
    } catch (e) {
        add_log_message(STORAGE_MODULE, WARNING, "JSON parsing of object with id (" + id + ") failed.");
        return null;
    }
}
function update_object(id, object) {
    if (log_if_not_present1(id, "update_object::id", STORAGE_MODULE, ERROR)) { return; }
    try {
        localStorage.setItem(id, JSON.stringify(object));
    } catch (e) {
        add_log_message(STORAGE_MODULE, ERROR, "JSON stringify of object with id (" + id + ") failed.");
    }
}
function remove_object(id) {
    if (log_if_not_present1(id, "remove_object::id", STORAGE_MODULE, ERROR)) { return; }
    delete localStorage[id];
}
function init_object_storage() {
    max_object_id = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key > max_object_id) {
            max_object_id = key;
        }
    }
    max_object_id++;
}
function num_stored_objs() {
    return localStorage.length;
}
function get_key(key_index) {
    if (log_if_not_present1(key_index, "get_key::key_index", STORAGE_MODULE, ERROR)) { return null; }
    if ((0 > key_index) || (key_index >= localStorage.length)) {
        add_log_message(STORAGE_MODULE, ERROR, "Key index should be within [0, " + localStorage.length + ")");
        return null;
    }
    return localStorage.key(key_index);
}
 
// Ajax stuff, specific to kabam.com communication.
var apiServer;
var sessionId;
var userId;
var gangster;
var api_version = 'xylvan';
 
/********************************************************************************
* Performs the following actions:                                              *
*  - Places all parameters into an object                                      *
*  - Determines method                                                         *
*  - Sets maximum timeout                                                      *
*  - Validates returned data and passes back results to originating function   *
*                                                                              *
* Returns the following data:                                                  *
*  - ok (boolean)                                                              *
*  - dat (object if present)                                                   *
*  - errmsg (string if present)                                                *
********************************************************************************/
function MyAjaxRequest(url, callback, http_method, method, extra_params) {
        var options = {onSuccess:onSuccess, onFailure:onFailure};
        var ajax, msg;
 
    if (!extra_params) {
        extra_params = {};
    }
   
    var params = {};
        params['user_id']               = userId;
        params['_session_id']   = sessionId;
        params['version']               = api_version;
        params['gangster']              = gangster;
        params['timestamp']             = parseInt(serverTime());              
        if (method) {
        params['_method']               = method;              
        }
        for (key in extra_params) {
            params[key] = extra_params[key];
        }
 
        options.method = (http_method == 1) ? 'POST' : 'GET';
        options.parameters = params;
        options.timeoutSecs = 45;
 
        function onSuccess(r) {
                if (r.status == 200 && r.responseText) {
                        if (url.indexOf(".xml") !== -1) {
                                callback({ok:true, dat:r.responseText});
                        } else {
                                var data = r.responseText;
                                try {
                                        data = JSON.parse(r.responseText);
                                } catch (e) {}
                                callback({ok:true, dat:data});
                        }
                } else {
                        msg = 'The request was successful but no data was returned';
                        callback({ok:false, errmsg:msg});
                }
        }
 
        function onFailure(r) {
                var res = {
                        ok              : false,
                        status  : r.status,
                        errmsg  : r.statusText
                };
                if (r.status > 200 && r.responseText) {
                        res.dat = r.responseText;
                } else if (r.status == 509 && !r.responseText) {
                        res.errmsg = 'Rate Limit Exceeded, too many requests!';
                } else {
                        res.errmsg = 'This browser is not compatible at this time';
                }
                callback(res);
        }
        ajax = new AjaxRequest(apiServer + '/' + url, options);
}
 
// View functions, and controller interface with views
//      <li><a href="#" width="12%" id="show_TON_ui_1">Research</a></li>\
var ui_shell_content =
'<div id="header">\
<ul>\
<table width="100%" cellspacing="0"><tr><td>\
        <li><a href="#" width="12%" id="show_TON_ui_0">Buildings</a></li>\
        <li><a href="#" width="20%" id="show_TON_ui_2">Troops training</a></li>\
        <li><a href="#" width="8%" id="show_TON_ui_3">Attack</a></li>\
        <li><a href="#" width="8%" id="show_TON_ui_4">Donate</a></li>\
        <li><a href="#" width="4%" id="show_TON_ui_5">Log</a></li>\
</td><td width="56%" align="center" style="background-color:black;">\
<marquee><li id="Script_Name" style="color:white;">V 1.1</li></marquee>\
</td></tr></table>\
</ul>\
</div>\
<div id="ui_shell_content" style="background-image:url(http://discuss.anitahampton.net/wp-content/themes/wiki/images/header_gradient_blue.jpg);background-repeat: no-repeat">\
<table width="100%" border="0" cellspacing="0" cellpadding="0">\
  <tr>\
    <td>\
        <table width="100%" border="0" cellspacing="0" cellpadding="0">\
      <tr>\
        <td width="59%" id="Content-header" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">&nbsp;</td>\
        <td width="4%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">City:</td>\
        <td width="27%" id="Content-cities"></td>\
        <td width="10%">\
          <input type="submit" name="Update" value="Update" id="process_TON_action_reqs"/>\
                </td>\
      </tr>\
    </table>\
        </td>\
  </tr>\
  <tr>\
    <td height="58" id="Content-body">\
        </td>\
  </tr>\
</table>\
</div>';
var ui_tab_style = '#header ul {\
        list-style: none;\
        padding:0;\
        margin:0;\
} \
#header li {\
        display: inline;\
        border: light;\
        border-width: 1px 1px 0 1px;\
        margin: 0 0 0 0;\
        font-family:\'Arial Narrow\', sans-serif;\
        font-size: 16px;\
}\
#header li a {\
        padding: 0 1em;\
        background-color:#FFCC66;\
        border-top-left-radius: 5px;\
        border-top-right-radius: 5px;\
}\
#header li a:hover {\
    background-color:#FF9966;\
}\
#ui_shell_content {\
        border: 1px solid;\
}\
#header .selected {\
        padding-bottom: 1px; \
        background-color:#FF9900;\
}';
function createUI() {
    var document_to_add_to = unsafeWindow.document;
   
    set_popup_stylesheet(document_to_add_to);
    var script_ui = new PopUp('TON_Script', ui_shell_content, 0, dimensions.height, dimensions.width, 150, true, null, document_to_add_to);
 
    var ui_content_shell = get_element_or_log_if_absent('ui_shell_content', POPUP_MODULE, FATAL, document_to_add_to);
    var shell_style = ui_content_shell.getAttribute('style');    
    ui_content_shell.setAttribute('style', shell_style + ';height:120px');
 
    add_style(ui_tab_style, document_to_add_to);
 
    get_element_or_log_if_absent('show_TON_ui_0', UI_MODULE, FATAL, document_to_add_to).addEventListener('click', function() { show_TON_ui(0); }, false);
//  get_element_or_log_if_absent('show_TON_ui_1', UI_MODULE, FATAL, document_to_add_to).addEventListener('click', function() { show_TON_ui(1); }, false);
    get_element_or_log_if_absent('show_TON_ui_2', UI_MODULE, FATAL, document_to_add_to).addEventListener('click', function() { show_TON_ui(2); }, false);
    get_element_or_log_if_absent('show_TON_ui_3', UI_MODULE, FATAL, document_to_add_to).addEventListener('click', function() { show_TON_ui(3); }, false);
    get_element_or_log_if_absent('show_TON_ui_4', UI_MODULE, FATAL, document_to_add_to).addEventListener('click', function() { show_TON_ui(4); }, false);
    get_element_or_log_if_absent('show_TON_ui_5', UI_MODULE, ERROR, document_to_add_to).addEventListener('click', function() { show_TON_ui(5); }, false);
    get_element_or_log_if_absent('process_TON_action_reqs', UI_MODULE, FATAL, document_to_add_to).addEventListener('click', process_TON_action_reqs, false);
 
    log_tab_update();
    script_ui.show(true);
}
var ui_contents = [
'<table width="100%" border="0" cellspacing="0" cellpadding="0">\
  <tr>\
    <td width="10%">\
      <label style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Building type:</label>\
        </td>\
    <td width="15%">\
          <select id="Selected_Building">\
            <option value="Home">Home</option>\
            <option value="Fortress">Downtown</option>\
            <option value="ScienceCenter">Research Center</option>\
            <option value="OfficerQuarter">Generals Crypt</option>\
            <option value="DragonKeep">Gargoyle Perch</option>\
            <option value="MusterPoint">Assembly Point</option>\
            <option value="Theater">Nightclub</option>\
            <option value="StorageVault">Warehouse</option>\
            <option value="Wall">Walls</option>\
            <option value="Garrison">Barracks</option>\
            <option value="Farm">Blood Lab</option>\
            <option value="Quarry">Concrete Plant</option>\
            <option value="Mine">Crystal Pit</option>\
            <option value="Lumbermill">Steelworks</option>\
            <option value="Metalsmith">Furnace</option>\
            <option value="Factory">Arsenal</option>\
            <option value="Rookery">Bell Tower</option>\
            <option value="Sentinel">Watchtower</option>\
            <option value="Wonder">Ziggurat</option>\
            <option value="Silo">Depot</option>\
            <option value="TrainingCamp">Outpost Barracks</option>\
      </select>\
        </td>\
    <td width="10%">\
      <label style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Building level:</label>\
        </td>\
    <td width="7%">\
          <select name="select" id="Building_level">\
            <option value="0">-- All --</option>\
            <option value="1">1</option>\
            <option value="2">2</option>\
            <option value="3">3</option>\
            <option value="4">4</option>\
            <option value="5">5</option>\
            <option value="6">6</option>\
            <option value="7">7</option>\
            <option value="8">8</option>\
            <option value="9">9</option>\
            <option value="10">10</option>\
            <option value="11">11</option>\
            <option value="12">12</option>\
            <option value="13">13</option>\
            <option value="14">14</option>\
          </select>\
        </td>\
    <td width="15%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Level to upgrade to: \
    </td>\
    <td width="8%">\
          <select name="select" id="Building_Level_To_Upgrade_To">\
            <option value="0">-- N/A --</option>\
            <option value="2">2</option>\
            <option value="3">3</option>\
            <option value="4">4</option>\
            <option value="5">5</option>\
            <option value="6">6</option>\
            <option value="7">7</option>\
            <option value="8">8</option>\
            <option value="9">9</option>\
            <option value="10">10</option>\
            <option value="11">11</option>\
            <option value="12">12</option>\
            <option value="13">13</option>\
            <option value="14">14</option>\
            <option value="15">15</option>\
          </select>\
        </td>\
    <td width="7%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Upgrade:</td>\
    <td width="2%"><input id="Building_Upgrade" checked name="Building_Upgrade" type="radio" value="1"/></td>\
    <td width="7%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Remove:</td>\
    <td width="19%"><input id="Building_Remove" name="Building_Upgrade" type="radio" value="0"/></td>\
  </tr>\
</table>',
'<table width="100%" border="0" cellspacing="0" cellpadding="0">\
  <tr>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Blood Chemistry</td>\
        <td><input id="BloodChemistry" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Crystallography</td>\
        <td><input id="Crystallography" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Concrete Blends</td>\
        <td><input id="ConcreteBlends" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Vein Mining</td>\
        <td><input id="VeinMining" type="textbox" maxlength="2" size="12"/></td>\
  </tr>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Twilight Warfare</td>\
        <td><input id="TwilightWarfare" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Shapeshifting</td>\
        <td><input id="Shapeshifting" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Selective Breeding</td>\
        <td><input id="SelectiveBreeding" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Endurance</td>\
        <td><input id="Endurance" type="textbox" maxlength="2" size="12"/></td>\
  </tr>\
  <tr>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Spectral Vision</td>\
        <td><input id="SpectralVision" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Architecture</td>\
        <td><input id="Architecture" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Blood Transfusions</td>\
        <td><input id="BloodTransfusions" type="textbox" maxlength="2" size="12"/></td>\
        <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Gargoyle Agility</td>\
        <td><input id="GargoyleAgility" type="textbox" maxlength="2" size="12"/></td>\
  </tr>\
</table>',
'<table width="100%" border="0" cellspacing="0" cellpadding="0">\
  <tr>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Grunts</td>\
        <td><input id="Change_Grunts" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Trucks</td>\
        <td><input id="Change_Trucks" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Slashers</td>\
        <td><input id="Change_Slashers" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Sigbins</td>\
        <td><input id="Change_Sigbins" type="text" value="0" size="18" maxlength="5"/></td>\
  </tr>\
  <tr>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Flickerforms</td>\
        <td><input id="Change_Flickerforms" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Snipers</td>\
        <td><input id="Change_Snipers" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Vampire Bats</td>\
        <td><input id="Change_VampireBats" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Nemesis Bats</td>\
        <td><input id="Change_NemesisBats" type="text" value="0" size="18" maxlength="5"/></td>\
  </tr>\
  <tr>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Armored Trucks</td>\
        <td><input id="Change_ArmoredTrucks" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Nosferatu</td>\
        <td><input id="Change_Nosferatu" type="text" value="0" size="18" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Impalers</td>\
        <td><input id="Change_Impalers" type="text" value="0" size="18" maxlength="5"/></td>\
    <td></td>\
    <td></td>\
  </tr>\
</table>',
'<table width="100%" cellspacing="0" cellpadding="0" style="border-bottom-color:#000000;border-bottom-style:solid">\
  <tr>\
    <td width="2%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">x:</td>\
    <td width="6%"><input id="attacked_x" type="text" size="6" maxlength="3" /></td>\
    <td width="2%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">y:</td>\
    <td width="6%"><input id="attacked_y" type="text" size="6" maxlength="3" /></td>\
    <td width="13%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Choose general:</td>\
    <td width="15%">\
          <select id="Selected_General">\
          </select>\
        </td>\
    <td width="13%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Choose gargoyle:</td>\
    <td width="15%">\
          <select id="Selected_Gargoyle">\
                <option value="">-- none --</option>\
                <option value="Large">Large</option>\
                <option value="Largest">Largest</option>\
          </select>\
        </td>\
    <td width="9%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Auto-attack:</td>\
    <td width="19%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">\
          <input type="checkbox" id="Auto_Attack" value="1"/>\
        </td>\
  </tr>\
</table>\
<table width="100%" border="0" cellspacing="0" cellpadding="0">\
  <tr>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Grunts</td>\
        <td><input id="Attack_Grunts" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Trucks</td>\
        <td><input id="Attack_Trucks" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Slashers</td>\
        <td><input id="Attack_Slashers" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Sigbins</td>\
        <td><input id="Attack_Sigbins" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Flickerforms</td>\
        <td><input id="Attack_Flickerforms" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Snipers</td>\
        <td><input id="Attack_Snipers" type="text" value="0" size="7" maxlength="5"/></td>\
  </tr>\
  <tr>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Vampire Bats</td>\
        <td><input id="Attack_VampireBats" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Nemesis Bats</td>\
        <td><input id="Attack_NemesisBats" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Armored Trucks</td>\
        <td><input id="Attack_ArmoredTrucks" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Nosferatu</td>\
        <td><input id="Attack_Nosferatu" type="text" value="0" size="7" maxlength="5"/></td>\
    <td style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Impalers</td>\
        <td><input id="Attack_Impalers" type="text" value="0" size="7" maxlength="5"/></td>\
    <td></td>\
  </tr>\
</table>',
'<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">\
<input type="hidden" name="cmd" value="_s-xclick">\
<input type="hidden" name="hosted_button_id" value="HPZNTU4S8AK9A">\
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\
</form>',
'<div style="overflow:auto;width:100%;">\
<table id="Log_Msgs_Table" width="100%" border="1" style="background-color:#FF9900" cellspacing="0" cellpadding="0">\
  <tr>\
    <th width="6%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Id</th>\
    <th width="11%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Module</th>\
    <th width="7%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Level</th>\
    <th width="76%" style="font-family:\'Arial Narrow\',sans-serif;font-size:16px;">Message</th>\
  </tr>\
</table>\
</div>'];
 
var ui_descriptions = ["Upgrade/remove buildings in a city",
                                        "Research technologies in the capital, enter target level to upgrade to",
                                        "Create/de-commission troops in a city. Enter negative numbers to de-commission.",
                                        "Attack a particular enemy, send troops and generals from the capital",
                                        "If you like our script, donate to help development",
                                        "Log messages from the script"];
 
var ui_tab_type = -1;
 
function building_selected() {
    var selected_building = get_element_or_log_if_absent('Selected_Building', UI_MODULE, ERROR);
    var beginning_level = get_element_or_log_if_absent('Building_level', UI_MODULE, ERROR);
   
        if ((selected_building.value == "Home") || (selected_building.value == "Garrison") ||
            (selected_building.value == "Farm") || (selected_building.value == "Quarry") ||
            (selected_building.value == "Mine") || (selected_building.value == "Lumbermill") ||
            (selected_building.value == "TrainingCamp") || (selected_building.value == "Silo")) {
            beginning_level.disabled = false;
        } else {
        var city = get_element_or_log_if_absent('cities', UI_MODULE, ERROR);
        beginning_level.value = 0;
            for (var i = 0; i <= cityInfo[city.value].city.buildings.length; i++) {
                var building = cityInfo[city.value].city.buildings[i];
                if (building.type == selected_building.value) {
                    beginning_level.value = building.level;
                    break;
                }
            }
            beginning_level.disabled = true;
        }
}
 
function auto_attack_manage() {
    var auto_attack_cb = document.getElementById('Auto_Attack');
    if (!is_defined(auto_attack_cb)) {
        return;
    }
   
    add_log_message(USER_MODULE, INFO, "Auto-attack (" + (auto_attack_cb.checked ? "enabled" : "disabled") + ")");
 
    var object = retrieve_object(game_config_ids[AUTO_ATTACK_STATE]);
    var old_value = object.value;
   
    object.value = auto_attack_cb.checked;
    object.status = IN_USE;
   
    if (validate_config(AUTO_ATTACK_STATE, object)) {
        game_config[AUTO_ATTACK_STATE] = object;
        update_object(game_config_ids[AUTO_ATTACK_STATE], object);
    } else {
        add_log_message(CONFIG_MODULE, ERROR, "Changing the auto-attack value from (" +
            ((old_value == true) ? "enabled" : "disabled") + ") to (" +
            ((old_value == true) ? "disabled" : "enabled") + ") failed. " +
            "Config validation error.");
        auto_attack_cb.checked = old_value;
    }
}
 
var seen_msgs_count = 0;
var seen_msgs_till = 0;
function log_tab_update() {
    if (ui_tab_type == 5) {
        var messages_n_id = get_log_messages(seen_msgs_till);
        var messages = messages_n_id.messages;
        seen_msgs_till = messages_n_id.msgs_got_till;
       
        if (!is_defined(messages) || (messages.length === 0)) {
            setTimeout(log_tab_update, 2000);
            return;
        }
        var msgs_table = document.getElementById('Log_Msgs_Table');
        if (!is_defined(msgs_table)) {
            alert("Can't locate log messages table.");
            setTimeout(log_tab_update, 2000);
            return;
        }
        for (var i = 0; i < messages.length; i++) {
            var logged_msg = messages[i];
           
            var new_row = msgs_table.insertRow(msgs_table.rows.length);
           
            var cell_id = new_row.insertCell(0);
            var cell_module = new_row.insertCell(1);
            var cell_level = new_row.insertCell(2);
            var cell_message = new_row.insertCell(3);
           
            cell_id.innerHTML = seen_msgs_count++;
            cell_module.innerHTML = module_names[logged_msg.module];
            cell_level.innerHTML = level_names[logged_msg.level];
            cell_message.innerHTML = logged_msg.message;
        }
    }
    setTimeout(log_tab_update, 2000);
}
function set_generals_dropdown(city_index) {
    log_if_not_present1(city_index, "set_generals_dropdown::city_index", UI_MODULE, WARNING);
    if (!city_index) { city_index = capital_index; }
 
    if (city_index >= cityInfo.length) {
        add_log_message(UI_MODULE, WARNING, 'Trying to fetch generals information for a non-existent city. Using capital city.');
        city_index = capital_index;
    }
        var generals_dd = get_element_or_log_if_absent('Selected_General', UI_MODULE, ERROR);
 
        var generals = get_generals_by_city(city_index);
        if (!is_defined(generals) || !generals) {
            add_log_message(DATA_MODULE, ERROR, 'No generals in the city ' + cityInfo[city_index].city.name);
            generals_dd.innerHTML = "";
            return;
        }
       
        var dropdown_contents = "";
        for (general_id in generals) {
                dropdown_contents += "<option value='" + general_id + "'>" + generals[general_id].name + "</option>";
        }
        generals_dd.innerHTML = dropdown_contents;
}
function building_upgrade_clicked(isUpgrade) {
    var target_level_element = get_element_or_log_if_absent('Building_Level_To_Upgrade_To', UI_MODULE, ERROR);
    if (isUpgrade) {
        if (target_level_element.value == 0) {
            target_level_element.value = 2;
        }
        target_level_element.disabled = false;
    } else {
        target_level_element.value = 0;
        target_level_element.disabled = true;
    }
}
 
function show_TON_ui(type) {
    log_if_not_present1(type, "show_TON_ui::type", UI_MODULE, INFO);
    if (!type) { type = 0; }
    if ((type < 0) || (type > 5)) {
        add_log_message(UI_MODULE, WARNING, 'Unknown UI event. Falling back to showing the first tab.');
        type = 0;
    }
    ui_tab_type = type;
       
        var cities = get_element_or_log_if_absent('Content-cities', UI_MODULE, ERROR);
        var cities_drop_down = "<select id='cities'>";
        for (var i = 0; i < cityInfo.length; i++) {
                cities_drop_down += "<option " + ((i === 0) ? "selected " : " ") + "value='" + i + "'>" + cityInfo[i].city.name + "</option>";
        }
        cities_drop_down += "</select>";
        cities.innerHTML = cities_drop_down;
    cities.addEventListener('onchange', set_generals_dropdown, false);
       
        var description = get_element_or_log_if_absent('Content-header', UI_MODULE, WARNING);
        description.innerHTML = ui_descriptions[type];
       
        var content = get_element_or_log_if_absent('Content-body', UI_MODULE, ERROR);
        content.innerHTML = ui_contents[type];
       
        for (i = 0; i < 6; i++) {
            if (i == 1) continue;
            document.getElementById('show_TON_ui_' + i).setAttribute('class', '');
        }
        document.getElementById('show_TON_ui_' + ui_tab_type).setAttribute('class', 'selected');
 
    if ((ui_tab_type == 1) || (ui_tab_type == 3)) {
        var cities_dropdown = get_element_or_log_if_absent('cities', UI_MODULE, ERROR);
       
        cities_drop_down.value = capital_index;
        cities_drop_down.disabled = true;
    }
 
        if (ui_tab_type == 3) {
            var aa_element = get_element_or_log_if_absent('Auto_Attack', UI_MODULE, WARNING);
            aa_element.checked = (game_config[AUTO_ATTACK_STATE].value ? true : false);
            aa_element.addEventListener('click', auto_attack_manage, false);
           
            set_generals_dropdown(document.getElementById('cities').value);
        } else if (ui_tab_type == 0) {
        get_element_or_log_if_absent('Selected_Building', UI_MODULE, ERROR).addEventListener('change', building_selected);
        building_selected();
 
        var building_upgrade = get_element_or_log_if_absent('Building_Upgrade', UI_MODULE, ERROR);
        var building_remove = get_element_or_log_if_absent('Building_Remove', UI_MODULE, ERROR);
 
        building_upgrade.addEventListener('click', function() { building_upgrade_clicked(true); });
        building_remove.addEventListener('click', function() { building_upgrade_clicked(false); });
 
        building_upgrade_clicked(building_upgrade.checked);
    }
}
function check_and_research(city_id, technology, final_level) {
    var curr_level = researchInfo[technologies[technology]];
    if (curr_level >= final_level) {
        add_log_message(USER_MODULE, INFO, "Attempting to upgrade technology (" + technology +
            "), but higher level was not requested.");
        return;
    } else if (final_level > 10) {
        add_log_message(USER_MODULE, INFO, 'Chose a very high level (' + final_level + ') to upgrade (' +
            technology + ') to, should choose within 2 - 10.');
        final_level = 10;
    }
    for (var i = curr_level; i < final_level; i++) {
            var requirements = {};
            requirements[technology] = {type:TECHNOLOGY, level:i};
        var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: technology, unit_type: TECHNOLOGY, location: 0, op: OP_UPGRADE, status: WAITING_FOR_PREREQ, preReq: requirements};
        submit_action_req(object);                 
    }
}
function process_TON_action_reqs() {
    var all_cities = get_element_or_log_if_absent('cities', UI_MODULE, ERROR);    
    var city_index = all_cities.value;
    if (city_index >= cityInfo.length) {
        add_log_message(UI_MODULE, ERROR, 'City does not exist.');
        return;
    }
        var city_id = cityInfo[city_index].city.id;
        switch (ui_tab_type) {
        case 0:
                var building_type = get_element_or_log_if_absent('Selected_Building', UI_MODULE, ERROR).value;
                var building_level = get_element_or_log_if_absent('Building_level', UI_MODULE, ERROR).value;
 
        var level_to_consider_below = 15;
                var remove = document.getElementById('Building_Remove');
                var isUpgrade = (remove.checked != true);
                if (isUpgrade) {
            level_to_consider_below =
    get_element_or_log_if_absent('Building_Level_To_Upgrade_To', UI_MODULE, ERROR).value;        
        }
       
        var building_ids = [];
        var building_levels = [];
        if (building_level != 0) {
                var found = false;
                for (var j = 0; j < cityInfo[city_index].city.buildings.length; j++) {
                        var building = cityInfo[city_index].city.buildings[j];
                            if ((building.type == building_type) && (building.level == building_level)) {
                                    building_ids.push(building.id);
                                    building_levels.push(building.level);
                                found = true;
                                break;
                        }
                    }
                if (!found) {
                    add_log_message(USER_MODULE, ERROR, 'Given building parameters; type (' + buildings_DOA_to_TON[building_type] +
                    ') and level (' + building_level + ') do not match any in city (' + city_id_to_name[city_id] + ').');
                return;
            }
        } else {
            var num_buildings = 0;
                for (j = 0; j < cityInfo[city_index].city.buildings.length; j++) {
                        building = cityInfo[city_index].city.buildings[j];
                            if ((building.type == building_type) && (building.level < level_to_consider_below)) {
                                    building_ids[num_buildings] = building.id;
                                    building_levels[num_buildings++] = building.level;
                        }
                    }
        }
        for (j = 0; j < building_ids.length; j++) {
                var curr_building_level = building_levels[j];
            if (isUpgrade) {
                if (level_to_consider_below <= curr_building_level) {
                            add_log_message(USER_MODULE, WARNING, 'Called upgrade of building (' + buildings_DOA_to_TON[building_type] +
                        ') at level (' + curr_building_level + ') in city (' + city_id_to_name[city_id] +
                            ') with incorrect upgrade level specified.');
                        continue;
                    }
 
                add_log_message(USER_MODULE, INFO, "Submitted upgrading of building (" + buildings_DOA_to_TON[building_type] +
                    ") at level (" + curr_building_level + ") to level (" + level_to_consider_below + ") in city (" +
                    city_id_to_name[city_id] + ").");
                    for (var i = curr_building_level; i < level_to_consider_below; i++) {
                        var requirements = {};
                        requirements[building_ids[j]] = {type:BUILDING, level:i};
                    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: building_ids[j], unit_type: BUILDING, location: 0, qty: 1, op: OP_UPGRADE, status: WAITING_FOR_PREREQ, preReq: requirements};
                    submit_action_req(object);             
                        }
                } else {
                add_log_message(USER_MODULE, INFO, "Submitted removal of building (" + buildings_DOA_to_TON[building_type] +
                    ") at level (" + curr_building_level + ") in city (" + city_id_to_name[city_id] + ").");
                    remove_building_retry(city_id, building_ids[j]);
                }
            }
                break;
        case 1:
                var BloodChemistry = get_element_or_log_if_absent('BloodChemistry', UI_MODULE, WARNING);
                var Crystallography = get_element_or_log_if_absent('Crystallography', UI_MODULE, WARNING);
                var ConcreteBlends = get_element_or_log_if_absent('ConcreteBlends', UI_MODULE, WARNING);
                var VeinMining = get_element_or_log_if_absent('VeinMining', UI_MODULE, WARNING);
                var TwilightWarfare = get_element_or_log_if_absent('TwilightWarfare', UI_MODULE, WARNING);
                var Shapeshifting = get_element_or_log_if_absent('Shapeshifting', UI_MODULE, WARNING);
                var SelectiveBreeding = get_element_or_log_if_absent('SelectiveBreeding', UI_MODULE, WARNING);
                var Endurance = get_element_or_log_if_absent('Endurance', UI_MODULE, WARNING);
                var SpectralVision = get_element_or_log_if_absent('SpectralVision', UI_MODULE, WARNING);
                var Architecture = get_element_or_log_if_absent('Architecture', UI_MODULE, WARNING);
                var BloodTransfusions = get_element_or_log_if_absent('BloodTransfusions', UI_MODULE, WARNING);
                var GargoyleAgility = get_element_or_log_if_absent('GargoyleAgility', UI_MODULE, WARNING);
        if (!BloodChemistry && !Crystallography && !ConcreteBlends && !VeinMining &&
            !TwilightWarfare && !Shapeshifting && !SelectiveBreeding && !Endurance &&
            !SpectralVision && !Architecture && !BloodTransfusions && !GargoyleAgility) {
            add_log_message(UI_MODULE, ERROR, 'No technologies in the UI to research');
            return;
        }
        if (!(BloodChemistry && (BloodChemistry.value != 0)) && !(Crystallography && (Crystallography.value != 0)) &&
            !(ConcreteBlends && (ConcreteBlends.value != 0)) && !(VeinMining && (VeinMining.value != 0)) &&
            !(TwilightWarfare && (TwilightWarfare.value != 0)) && !(Shapeshifting && (Shapeshifting.value != 0)) &&
            !(SelectiveBreeding && (SelectiveBreeding.value != 0)) && !(Endurance && (Endurance.value != 0)) &&
            !(SpectralVision && (SpectralVision.value != 0)) && !(Architecture && (Architecture.value != 0)) &&
            !(BloodTransfusions && (BloodTransfusions.value != 0)) && !(GargoyleAgility && (GargoyleAgility.value != 0))) {
            add_log_message(USER_MODULE, INFO, 'No technologies selected for research');
            return;
        }
        add_log_message(USER_MODULE, INFO, 'Submitting technologies to research');
                if (BloodChemistry && (BloodChemistry.value != 0)) { check_and_research(city_id, 'Blood Chemistry', BloodChemistry.value); }
                if (Crystallography && (Crystallography.value != 0)) { check_and_research(city_id, 'Crystallography', Crystallography.value); }
                if (ConcreteBlends && (ConcreteBlends.value != 0)) { check_and_research(city_id, 'Concrete Blends', ConcreteBlends.value); }
                if (VeinMining && (VeinMining.value != 0)) { check_and_research(city_id, 'Vein Mining', VeinMining.value); }
                if (TwilightWarfare && (TwilightWarfare.value != 0)) { check_and_research(city_id, 'Twilight Warfare', TwilightWarfare.value); }
                if (Shapeshifting && (Shapeshifting.value != 0)) { check_and_research(city_id, 'Shapeshifting', Shapeshifting.value); }
                if (SelectiveBreeding && (SelectiveBreeding.value != 0)) { check_and_research(city_id, 'Selective Breeding', SelectiveBreeding.value); }
                if (Endurance && (Endurance.value != 0)) { check_and_research(city_id, 'Endurance', Endurance.value); }
                if (SpectralVision && (SpectralVision.value != 0)) { check_and_research(city_id, 'Spectral Vision', SpectralVision.value); }
                if (Architecture && (Architecture.value != 0)) { check_and_research(city_id, 'Architecture', Architecture.value); }
                if (BloodTransfusions && (BloodTransfusions.value != 0)) { check_and_research(city_id, 'Blood Transfusions', BloodTransfusions.value); }
                if (GargoyleAgility && (GargoyleAgility.value != 0)) { check_and_research(city_id, 'Gargoyle Agility', GargoyleAgility.value); }
                break;
        case 2:
                var grunts_to_change = get_element_or_log_if_absent('Change_Grunts', UI_MODULE, WARNING);
                var trucks_to_change = get_element_or_log_if_absent('Change_Trucks', UI_MODULE, WARNING);
                var slashers_to_change = get_element_or_log_if_absent('Change_Slashers', UI_MODULE, WARNING);
                var sigbins_to_change = get_element_or_log_if_absent('Change_Sigbins', UI_MODULE, WARNING);
                var flickerforms_to_change = get_element_or_log_if_absent('Change_Flickerforms', UI_MODULE, WARNING);
                var snipers_to_change = get_element_or_log_if_absent('Change_Snipers', UI_MODULE, WARNING);
                var vampireBats_to_change = get_element_or_log_if_absent('Change_VampireBats', UI_MODULE, WARNING);
                var nemesisBats_to_change = get_element_or_log_if_absent('Change_NemesisBats', UI_MODULE, WARNING);
                var armoredTrucks_to_change = get_element_or_log_if_absent('Change_ArmoredTrucks', UI_MODULE, WARNING);
                var nosferatu_to_change = get_element_or_log_if_absent('Change_Nosferatu', UI_MODULE, WARNING);
                var impalers_to_change = get_element_or_log_if_absent('Change_Impalers', UI_MODULE, WARNING);
 
        if (!grunts_to_change && !trucks_to_change && !slashers_to_change && !sigbins_to_change &&
            !flickerforms_to_change && !snipers_to_change && !vampireBats_to_change && !nemesisBats_to_change &&
            !armoredTrucks_to_change && !nosferatu_to_change && !impalers_to_change) {
            add_log_message(UI_MODULE, ERROR, 'No troops in the UI to train/de-commission');
            return;
        }
        if (!(grunts_to_change && (grunts_to_change.value != 0)) && !(trucks_to_change && (trucks_to_change.value != 0)) &&
            !(slashers_to_change && (slashers_to_change.value != 0)) && !(sigbins_to_change && (sigbins_to_change.value != 0)) &&
            !(flickerforms_to_change && (flickerforms_to_change.value != 0)) && !(snipers_to_change && (snipers_to_change.value != 0)) &&
            !(vampireBats_to_change && (vampireBats_to_change.value != 0)) && !(nemesisBats_to_change && (nemesisBats_to_change.value != 0)) &&
            !(armoredTrucks_to_change && (armoredTrucks_to_change.value != 0)) &&
            !(nosferatu_to_change && (nosferatu_to_change.value != 0)) && !(impalers_to_change && (impalers_to_change.value))) {
            add_log_message(USER_MODULE, INFO, 'No troops selected for training/de-commissioning');
            return;
        }
        add_log_message(USER_MODULE, INFO, 'Submitting troops to train/de-commission');
                if (grunts_to_change && (grunts_to_change.value != 0)) { change_units_retry(city_id, GRUNTS, grunts_to_change.value); }
                if (trucks_to_change && (trucks_to_change.value != 0)) { change_units_retry(city_id, TRUCKS, trucks_to_change.value); }
                if (slashers_to_change && (slashers_to_change.value != 0)) { change_units_retry(city_id, SLASHERS, slashers_to_change.value); }
                if (sigbins_to_change && (sigbins_to_change.value != 0)) { change_units_retry(city_id, SIGBINS, sigbins_to_change.value); }
                if (flickerforms_to_change && (flickerforms_to_change.value != 0)) { change_units_retry(city_id, FLICKERFORMS, flickerforms_to_change.value); }
                if (snipers_to_change && (snipers_to_change.value != 0)) { change_units_retry(city_id, SNIPERS, snipers_to_change.value); }
                if (vampireBats_to_change && (vampireBats_to_change.value != 0)) { change_units_retry(city_id, VAMPIRE_BATS, vampireBats_to_change.value); }
                if (nemesisBats_to_change && (nemesisBats_to_change.value != 0)) { change_units_retry(city_id, NEMESIS_BATS, nemesisBats_to_change.value); }
                if (armoredTrucks_to_change && (armoredTrucks_to_change.value != 0)) { change_units_retry(city_id, ARMORED_TRUCKS, armoredTrucks_to_change.value); }
                if (nosferatu_to_change && (nosferatu_to_change.value != 0)) { change_units_retry(city_id, NOSFERATU, nosferatu_to_change.value); }
                if (impalers_to_change && (impalers_to_change.value != 0)) { change_units_retry(city_id, IMPALERS, impalers_to_change.value); }
                break;
        case 3:
                var attacked_x = get_element_or_log_if_absent('attacked_x', UI_MODULE, ERROR);
                var attacked_y = get_element_or_log_if_absent('attacked_y', UI_MODULE, ERROR);
                var general_to_send = get_element_or_log_if_absent('Selected_General', UI_MODULE, ERROR);
                var gargoyle_to_send = get_element_or_log_if_absent('Selected_Gargoyle', UI_MODULE, WARNING);
        var attacking_grunts = get_element_or_log_if_absent('Attack_Grunts', UI_MODULE, WARNING);
        var attacking_trucks = get_element_or_log_if_absent('Attack_Trucks', UI_MODULE, WARNING);
        var attacking_slashers = get_element_or_log_if_absent('Attack_Slashers', UI_MODULE, WARNING);
        var attacking_sigbins = get_element_or_log_if_absent('Attack_Sigbins', UI_MODULE, WARNING);
        var attacking_flickerforms = get_element_or_log_if_absent('Attack_Flickerforms', UI_MODULE, WARNING);
        var attacking_snipers = get_element_or_log_if_absent('Attack_Snipers', UI_MODULE, WARNING);
        var attacking_vampireBats = get_element_or_log_if_absent('Attack_VampireBats', UI_MODULE, WARNING);
        var attacking_nemesisBats = get_element_or_log_if_absent('Attack_NemesisBats', UI_MODULE, WARNING);
        var attacking_armoredTrucks = get_element_or_log_if_absent('Attack_ArmoredTrucks', UI_MODULE, WARNING);
        var attacking_nosferatu = get_element_or_log_if_absent('Attack_Nosferatu', UI_MODULE, WARNING);
        var attacking_impalers = get_element_or_log_if_absent('Attack_Impalers', UI_MODULE, WARNING);
 
        if (!attacked_x || !attacked_y) {
            add_log_message(UI_MODULE, ERROR, "No attack co-ordinates in the UI, can't start an attack");
            return;
        }
        if (!general_to_send) {
            add_log_message(UI_MODULE, ERROR, "No general available in the UI");
            return;
        }
        if (!attacking_grunts && !attacking_trucks && !attacking_slashers && !attacking_sigbins &&
            !attacking_flickerforms && !attacking_snipers && !attacking_vampireBats && !attacking_nemesisBats &&
            !attacking_armoredTrucks && !attacking_nosferatu && !attacking_impalers) {
            add_log_message(UI_MODULE, ERROR, 'No troops in the UI for starting an attack');
            return;
        }
       
        var grunts = (attacking_grunts ? attacking_grunts.value : 0);
        var trucks = (attacking_trucks ? attacking_trucks.value : 0);
        var slashers = (attacking_slashers ? attacking_slashers.value : 0);
        var sigbins = (attacking_sigbins ? attacking_sigbins.value : 0);
        var flickerforms = (attacking_flickerforms ? attacking_flickerforms.value : 0);
        var snipers = (attacking_snipers ? attacking_snipers.value : 0);
        var vampireBats = (attacking_vampireBats ? attacking_vampireBats.value : 0);
        var nemesisBats = (attacking_nemesisBats ? attacking_nemesisBats.value : 0);
        var armoredTrucks = (attacking_armoredTrucks ? attacking_armoredTrucks.value : 0);
        var nosferatu = (attacking_nosferatu ? attacking_nosferatu.value : 0);
        var impalers = (attacking_impalers ? attacking_impalers.value : 0);
        var gargoyle = (gargoyle_to_send ? gargoyle_to_send.value : 0);
        var general = general_to_send.value;
       
        if (!grunts && !trucks && !slashers && !sigbins && !flickerforms && !snipers &&
            !vampireBats && !nemesisBats && !armoredTrucks && !nosferatu && !impalers) {
            add_log_message(USER_MODULE, ERROR, 'No troops selected for starting an attack');
            return;
        }
        if ((grunts < 0) || (trucks < 0) || (slashers < 0) || (sigbins < 0) || (flickerforms < 0) || (snipers < 0) ||
            (vampireBats < 0) || (nemesisBats < 0) || (armoredTrucks < 0) || (nosferatu < 0) || (impalers < 0)) {
            add_log_message(USER_MODULE, ERROR, 'Invalid (negative) number of troops specified for attack.');
            return;
        }
        if (!general) {
            add_log_message(USER_MODULE, ERROR, "Can't attack without a general");
            return;
        }
       
        add_log_message(USER_MODULE, INFO, 'Submitting troops to attack');
                var units = get_units_map(grunts, trucks, slashers, sigbins, flickerforms, snipers,
                    vampireBats, nemesisBats, armoredTrucks, nosferatu, impalers, gargoyle, general);
                attack_retry(city_id, units, attacked_x.value, attacked_y.value);
                break;
        default:
                break;
        }
}
 
// game config functions
var GAME_CONFIG_TYPE = "GameConf";
 
var AUTO_ATTACK_STATE = "AutoAttackEnabled";
var CLEANUP_INTERVAL = "CleanupInterval";
var CLEANUP_STATES = "CleanupStates";
 
var IN_USE = 1;
var NOT_IN_USE = 2;
 
var game_config = {};
 
var game_config_ids = {};
function restore_config() {
    for (var i = 0; i < num_stored_objs(); i++) {
        var key = get_key(i);
        var object = retrieve_object(key);
       
        if (!is_defined(object) || !object) { continue; }
        if (!object.hasOwnProperty('type') || (object['type'] != GAME_CONFIG_TYPE)) { continue; }
        game_config[object.name] = object;
        game_config_ids[object.name] = key;
    }
    if (!game_config.hasOwnProperty(AUTO_ATTACK_STATE)) {
        var auto_attack_state = {type:GAME_CONFIG_TYPE, name: AUTO_ATTACK_STATE, value: 0, context: {}, status: IN_USE};
        var id = store_object(auto_attack_state);
       
        game_config[AUTO_ATTACK_STATE] = auto_attack_state;
        game_config_ids[AUTO_ATTACK_STATE] = id;
    }
    if (!game_config.hasOwnProperty(CLEANUP_INTERVAL)) {
        var cleanup_interval = {type:GAME_CONFIG_TYPE, name: CLEANUP_INTERVAL, value: 60, context: {}, status: IN_USE};
        id = store_object(cleanup_interval);
       
        game_config[CLEANUP_INTERVAL] = cleanup_interval;
        game_config_ids[CLEANUP_INTERVAL] = id;
    }
    if (!game_config.hasOwnProperty(CLEANUP_STATES)) {
        // XXX: Actually, we should have different config settings depending on auto-attack on/off.
        // Ideally, we do not want to clean RUNNING, and want to keep COMPLETE for some time, before cleaning.
        var cleanup_states = {type:GAME_CONFIG_TYPE, name: CLEANUP_STATES, value: [ERROR_IN_REQUEST, COMPLETE, RUNNING], context: {}, status: IN_USE};
        id = store_object(cleanup_states);
       
        game_config[CLEANUP_STATES] = cleanup_states;
        game_config_ids[CLEANUP_STATES] = id;
    }
}
function validate_config(changed_config, changed_value) {
    return true;
}
 
// Initialization functions
// Utils set at init time.
var buildings_DOA_to_TON = {};
var technology_DOA_to_TON = {};
var troops_DOA_to_TON = {};
 
var dimensions = {};
 
var scriptLoaded = 0;
function init() {
    var found = false;
        var objects = unsafeWindow.document.getElementsByTagName('object');
        if (objects.length < 1) {
            return false;
        }
        var attrs = {};
        for (var i = 0; i < objects.length; i++) {
                if (objects[i].type && (objects[i].type == 'application/x-shockwave-flash')) {
                objects[i].innerHTML += '<param name="wmode" value="opaque">';
                objects[i].setAttribute('style', 'zIndex:0');
                var params = objects[i].innerHTML;
                var pattern = /<\s*param\s*(.*?)>/gi;
                var args, match, param;
 
                while ((match = pattern.exec(params)) !== null) {
                        param = parseQuotedParams(match[1]);
                        if (param.name && (param.name === 'flashvars')) {
                            dimensions['width'] = objects[i].width;
                            dimensions['height'] = objects[i].height;
                       
                                args = decodeEntity(param.value).split('&');
                                for (var j = 0; j < args.length; j++) {
                                        var prop = args[j].split('=');
                                        attrs[prop[0].trim()] = prop[1].trim();
                                }
                                found = true;
                                break;
                        }
                }
                if (found) { break; }
            }
        }
        if (!found) {
            return false;
        }
 
    // will have to change this if they change the names ...
    apiServer = attrs.api_server;
        sessionId = attrs.session_id;
        userId = attrs.user_id;
    gangster = attrs.gangster;
    SERVER_ID = (/realm(\d+)\./.exec(attrs.api_server) || ['', ''])[1];
 
    buildings_DOA_to_TON = {"Home": "Home", "Fortress": "Downtown", "ScienceCenter": "Research Center",
        "OfficerQuarter": "Generals Crypt", "DragonKeep": "Gargoyle Perch", "MusterPoint": "Assembly Point",
        "Theater": "Nightclub", "StorageVault": "Warehouse", "Wall": "Wall", "Garrison": "Barracks",
        "Farm": "Blood Lab", "Quarry": "Concrete Plant", "Mine": "Crystal Pit", "Lumbermill": "Steelworks",
        "Metalsmith": "Furnace", "Factory": "Arsenal", "Rookery": "Bell Tower", "Sentinel": "Watch Tower"};
    technology_DOA_to_TON = {"Metallurgy": "Twilight Warfare", "Woodcraft": "Vein Mining",
        "Masonry": "Concrete Blends", "Mining": "Crystallography", "Agriculture": "Blood Chemistry",
        "Clairvoyance": "Shapeshifting", "Dragonry": "Selective Breeding", "RapidDeployment": "Endurance",
        "Medicine": "Blood Transfusions", "Ballistics": "Spectral Vision", "Levitation": "Architecture",
        "Mercantilism": "Gargoyle Agility"};
    troops_DOA_to_TON = {"Conscript": "Grunt", "Porter": "Truck", "Halberdsman": "Slasher",
        "Minotaur": "Sigbin", "Spy": "Flickerform", "Longbowman": "Sniper",
        "SwiftStrikeDragon": "Vampire Bat", "BattleDragon": "Nemesis Bat",
        "ArmoredTransport": "Armored Truck", "Giant": "Nosferatu", "FireMirror": "Impaler",
        "AquaTroop": "Reaper", "StoneTroop": "Alchemist"};        
 
    init_object_storage();
    restore_config();
        gameActionsThread();
       
    createUI();
   
    get_map_data();
    init_attack_info();
    auto_attack_thread();
    return found;
}
 
function scriptStartup() {
        if (scriptLoaded) {
                return;
        }
        try {
            if (!init()) {
            setTimeout(scriptStartup, 1000);
                        return;
                }
                if (!apiServer) {
                        setTimeout(scriptStartup, 1000);
                        return;
                }
        } catch (e) {
                setTimeout(scriptStartup, 1000);
                return;
        }
        scriptLoaded = true;
}
setTimeout(scriptStartup, 120);
 
var SERVER_ID;
 
// Model functions, all about data.
var cityInfo = [];
var capital_index = 0;
var researchInfo = {};
 
var IN_CITY = 1;
var IN_FIELD = 2;
var generals_locations = {};
 
// Mostly for logging error messages etc...
var city_id_to_name = [];
var building_id_to_type = [];
var general_id_to_name = [];
 
var GAME_REQUEST_TYPE = "Game";
function getPlayerInfo(action_cb) {
        MyAjaxRequest('player.json', function response_got(result) {
                if (result.ok && !result.dat.errors) {
                        if (result.dat.timestamp) {
                                serverTimeOffset = result.dat.timestamp - (new Date().getTime() / 1000);
                        }
                        // Fill the cities array
                        var i = 0;
                        for (city in result.dat.cities) {
                            if (JSON.stringify(result.dat.cities[city]) === undefined) {
                                continue;
                            }
                                if (cityInfo[i] === undefined) {
                                        cityInfo[i] = {};
                                }
                                cityInfo[i].city = result.dat.cities[city];
                                city_id_to_name[cityInfo[i].city.id] = cityInfo[i].city.name;
                               
                                for (var j = 0; j < result.dat.cities[city].buildings.length; j++) {
                                    building_id_to_type[result.dat.cities[city].buildings[j].id] = result.dat.cities[city].buildings[j].type;
                                }
                               
                                if (cityInfo[i].city.type == "Capital") {
                                    capital_index = i;
                                } else {
                                    i++;
                                    continue;
                                }
                                for (j = 0; j < result.dat.cities[city].generals.length; j++) {
                    var general = result.dat.cities[city].generals[j];
                                    general_id_to_name[general.id] = general.name;
                                        generals_locations[general.id] = IN_CITY;
                }
                                for (j = 0; j < result.dat.cities[city].marches.length; j++) {
                                        var march = result.dat.cities[city].marches[j];
                                        generals_locations[march.general_id] = IN_FIELD;
                                }
                                i++;
                        }
            for (research_type in result.dat.research) {
                researchInfo[research_type] = result.dat.research[research_type];
            }
            if (action_cb) { action_cb(result, null, COMPLETE); }
                } else {
                var status_type = PROTOCOL_ERROR;
            if (action_cb) { status_type = action_cb(result, null, ERROR_NOT_STARTED); }
           
            if (status_type != DATA_SUCCESS) {
                    add_log_message(DATA_MODULE, FATAL, "Getting all cities corresponding to current player failed");
                }
                }
        }, 0);
}
function get_generals_by_city(index) {
    var generals = {};
   
    if (index != capital_index) { return generals; }
    for (var i = 0; i < cityInfo[index].city.generals.length; i++) {
        generals[cityInfo[index].city.generals[i].id] = {name: cityInfo[index].city.generals[i].name};
    }
    return generals;
}
 
var BUILDING = 1;
var TECHNOLOGY = 2;
var TROOP = 3;
var ATTACK = 4;
 
var TO_SCHEDULE = 0;
var ERROR_NOT_STARTED = 1;
var RUNNING = 2;
var COMPLETE = 3;
var ERROR_IN_REQUEST = 4;
var WAITING_FOR_PREREQ = 5;
 
var OP_CREATE = 0;
var OP_UPGRADE = 1;
var OP_DELETE = 2;
 
// For advanced uses
function submit_action_req(object) {
    store_object(object);
}
 
var previous_cleanup_at = 0;
function gameActionsThread() {
    var curr_time = (new Date().getTime() / 1000);
    var cleanup_now = false;
    if ((curr_time - previous_cleanup_at) > game_config[CLEANUP_INTERVAL].value) {
        previous_cleanup_at = curr_time;
        cleanup_now = true;
    }
 
    getPlayerInfo();
    var num_objs = num_stored_objs();
    for (var i = 0; i < num_objs; i++) {
        var actionRequest = retrieve_object(get_key(i));
       
        if (!is_defined(actionRequest) || (!actionRequest.hasOwnProperty('type')) || (actionRequest.type != GAME_REQUEST_TYPE)) { continue; }
       
        if (cleanup_now) {
            var cleanup_states = game_config[CLEANUP_STATES].value;
            for (var j = 0; j < cleanup_states.length; j++) {
                if (actionRequest.status == cleanup_states[j]) {
                    remove_object(get_key(i));
                    continue;
                }
            }
        }
       
        var can_be_scheduled = false;
        if (actionRequest.status == WAITING_FOR_PREREQ) {
            var pre_req = actionRequest.preReq;
            can_be_scheduled = true;
            if (is_defined(pre_req)) {
                for (obj_id in pre_req) {
                    if (!can_be_scheduled) { break; }
                   
                    var requisites = pre_req[obj_id];
                    var obj_type = requisites['type'];
               
                    var object_found = false;
                    var props_matched = false;
                    switch (obj_type) {
                    case BUILDING:
                        for (var k = 0; k < cityInfo.length; k++) {
                            for (var j = 0; j < cityInfo[k].city.buildings.length; j++) {
                                if (obj_id == cityInfo[k].city.buildings[j].id) {
                                    object_found = true;
                                    props_matched = true;
                                    for (requirement in requisites) {
                                        if (requirement == 'type') { continue; }
                                        if (parseInt(cityInfo[k].city.buildings[j][requirement]) < parseInt(requisites[requirement])) {
                                            props_matched = false;
                                            break;
                                        }
                                    }
                                    if (object_found) { break; }
                                }
                            }
                            if (object_found) { break; }
                        }
                        if (!object_found || !props_matched) {
                            can_be_scheduled = false;
                        }
                        break;
                    case TECHNOLOGY:
                        var research_level = researchInfo[technologies[obj_id]];
                        if (parseInt(requisites['level']) > parseInt(research_level)) {
                            can_be_scheduled = false;
                        }
                        break;
                    case TROOP:
                        var total_troops =
parseInt(cityInfo[capital_index].city.units.hasOwnProperty(obj_id) ? cityInfo[capital_index].city.units[obj_id] : 0);
                        if (parseInt(requisites['qty']) > total_troops) {
                            can_be_scheduled = false;
                        }
                        break;
                    }
                }
            }
        }
        if ((actionRequest.status == ERROR_NOT_STARTED) || can_be_scheduled) {
            if (actionRequest.preReq && (actionRequest.status == ERROR_NOT_STARTED)) {
                actionRequest.status = WAITING_FOR_PREREQ;
                update_object(get_key(i), actionRequest);
                continue;
            }
 
            actionRequest.status = TO_SCHEDULE;            
            switch (actionRequest.unit_type) {
            case BUILDING:
                if (actionRequest.op == OP_UPGRADE) {
                    upgrade_building(actionRequest.city, actionRequest.unit, action_callback, get_key(i));
                } else if (actionRequest.op == OP_DELETE) {
                    remove_building(actionRequest.city, actionRequest.unit, action_callback, get_key(i));
                } else if (actionRequest.op == OP_CREATE) {
                    add_building(actionRequest.city, actionRequest.unit, actionRequest.location, action_callback, get_key(i));
                }
                break;
            case TECHNOLOGY:
                if (actionRequest.op == OP_UPGRADE) {
                    research_technology(actionRequest.city, actionRequest.unit, action_callback, get_key(i));
                } else {
                    add_log_message(STORAGE_MODULE, ERROR, "Asking to add/remove technology " +
                        actionRequest.unit + " in city " + city_id_to_name[actionRequest.city] + ". Technology " +
                        "can only be upgraded");
                    actionRequest.status = ERROR_IN_REQUEST;
                }
                break;
            case TROOP:
                if (actionRequest.op == OP_CREATE) {
                    train_units(actionRequest.city, actionRequest.unit, actionRequest.qty, action_callback, get_key(i));
                } else if (actionRequest.op == OP_DELETE) {
                    dismiss_units(actionRequest.city, actionRequest.unit, actionRequest.qty, action_callback, get_key(i));
                } else {
                    add_log_message(STORAGE_MODULE, ERROR, "Asking to upgrade troops of type " +
                    troops_DOA_to_TON[actionRequest.unit] + " in city " + city_id_to_name[actionRequest.city] +
                    ". Troops can only be trained or de-commissioned.");
                    actionRequest.status = ERROR_IN_REQUEST;
                }
                break;
            case ATTACK:
                if (actionRequest.op == OP_CREATE) {
                    attack(actionRequest.city, actionRequest.unit, actionRequest.location.x, actionRequest.location.y,
                        action_callback, get_key(i));
                } else {
                    add_log_message(STORAGE_MODULE, ERROR, "Asking to upgrade/remove attack by (" +
                        JSON.stringify(actionRequest.unit) + ") from city (" + city_id_to_name[actionRequest.city] +
                        ") to location (" + actionRequest.location.x + ", " + actionRequest.location.y +
                        "). Attacks can only be created (started).");
                    actionRequest.status = ERROR_IN_REQUEST;
                }
                break;
            default:
                add_log_message(STORAGE_MODULE, ERROR, "Request " + get_key(i) + " is not of any known type.");
                actionRequest.status = ERROR_IN_REQUEST;
                break;
            }
            update_object(get_key(i), actionRequest);
        }
    }
    setTimeout(gameActionsThread, 10000);
}
 
var PROTOCOL_ERROR = 1;
var DATA_ERROR = 2;
var DATA_SUCCESS = 3;
function action_callback(result, object_id, status) {
    if (log_if_not_present1(status, "action_callback::status", DATA_MODULE, ERROR)) { return PROTOCOL_ERROR; }
    if ((status < TO_SCHEDULE) || (status > WAITING_FOR_PREREQ)) {
        add_log_message(DATA_MODULE, ERROR, "Action request status is invalid. (" + status + ")");
        return PROTOCOL_ERROR;
    }
   
    var object = retrieve_object(object_id);
    if (!object) { return DATA_ERROR; }
    object.status = status;
    update_object(object_id, object);
    return ((status == RUNNING) ? DATA_SUCCESS : DATA_ERROR);
}
 
function add_building_retry(city_id, building_type, slot_id) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: building_type, unit_type: BUILDING, location: slot_id, qty: 1, op: OP_CREATE, status: TO_SCHEDULE};
        var id = store_object(object);
    add_building(city_id, building_type, slot_id, action_callback, id);
}
function remove_building_retry(city_id, building_id) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: building_id, unit_type: BUILDING, location: 0, qty: 1, op: OP_DELETE, status: TO_SCHEDULE};
        var id = store_object(object);
    remove_building(city_id, building_id, action_callback, id);
}
function upgrade_building_retry(city_id, building_id) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: building_id, unit_type: BUILDING, location: 0, qty: 1, op: OP_UPGRADE, status: TO_SCHEDULE};
        var id = store_object(object);
    upgrade_building(city_id, building_id, action_callback, id);
}
 
function add_building(city_id, building_type, slot_id, action_cb, context) {
    var props = {};
    props["city_building[building_type]"] = building_type;
    props["city_building[slot]"] = slot_id;
   
    var baseMsg = "Creating building (" + buildings_DOA_to_TON[building_type] +
                        ") in city (" + city_id_to_name[city_id] + ") ";
    MyAjaxRequest('cities/' + city_id + '/buildings.json', function response_got(result) {
        if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                    errMsg = baseMsg + "failed.";
                if (result.dat.errors) {
                        errMsg += " Errors are: " + result.dat.errors.join('<br/>');
                    }
                    add_log_message(DATA_MODULE, ERROR, errMsg);
                    add_log_message(USER_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                    add_log_message(USER_MODULE, INFO, errMsg);
                }
            } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, RUNNING); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
                add_log_message(DATA_MODULE, level, finalMsg);
                add_log_message(USER_MODULE, level, finalMsg);
            }
        }, 1, 'post', props);      
}
function remove_building(city_id, building_id, action_cb, context) {
    var baseMsg = "Removing building (" + buildings_DOA_to_TON[building_id_to_type[building_id]] +
        ") in city (" + city_id_to_name[city_id] + ") ";
    MyAjaxRequest('cities/' + city_id + '/buildings/' + building_id + '.json', function response_got(result) {
        if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                    errMsg = baseMsg + "failed.";
                if (result.dat.errors) {
                        errMsg += " Errors are: " + result.dat.errors.join('</br>');
                    }
                    add_log_message(DATA_MODULE, ERROR, errMsg);
                    add_log_message(USER_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                    add_log_message(USER_MODULE, INFO, errMsg);
                }
            } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, RUNNING); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
                add_log_message(DATA_MODULE, level, finalMsg);
                add_log_message(USER_MODULE, level, finalMsg);
            }
        }, 1, 'delete');
}
function upgrade_building(city_id, building_id, action_cb, context) {
    var baseMsg = "Upgrading building (" + buildings_DOA_to_TON[building_id_to_type[building_id]] +
        ") in city (" + city_id_to_name[city_id] + ") ";
    MyAjaxRequest('cities/' + city_id + '/buildings/' + building_id + '.json', function result_got(result) {
                if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                errMsg = baseMsg + "failed.";
                if (result.dat.errors) {
                        errMsg += " Errors are: " + result.dat.errors.join('</br>');
                    }
                    add_log_message(DATA_MODULE, ERROR, errMsg);
                    add_log_message(USER_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                    add_log_message(USER_MODULE, INFO, errMsg);
                }
            } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, RUNNING); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
                add_log_message(DATA_MODULE, level, finalMsg);
                add_log_message(USER_MODULE, level, finalMsg);
            }
        }, 1, 'put');
}
       
var technologies = {"Twilight Warfare": "Metallurgy", "Vein Mining": "Woodcraft",
        "Concrete Blends": "Masonry", "Crystallography": "Mining",
        "Blood Chemistry": "Agriculture", "Shapeshifting": "Clairvoyance",
        "Selective Breeding": "Dragonry", "Endurance": "RapidDeployment",
        "Blood Transfusions": "Medicine", "Spectral Vision": "Levitation",
        "Architecture": "Ballistics", "Gargoyle Agility": "Mercantilism"};
 
function research_technology_retry(city_id, technology_name) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: technology_name, unit_type: TECHNOLOGY, location: 0, op: OP_UPGRADE, status: TO_SCHEDULE};
        var id = store_object(object);
        research_technology(city_id, technology_name, action_callback, id);
}
 
function research_technology(city_id, technology_name, action_cb, context) {
    if (!technologies.hasOwnProperty(technology_name)) {
        add_log_message(DATA_MODULE, WARNING, "Not a valid technology for researching (" + technology_name + ")");        
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
    if (city_id != cityInfo[capital_index].city.id) {
        add_log_message(DATA_MODULE, ERROR, "Research can only be done, in the Capital city.");
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;        
    }
   
    var props = {};
        props['research[research_type]'] = technologies[technology_name];
    props['_eventType'] = 'begin_research_request';
 
    var baseMsg = "Researching technology (" + technology_name + ") in city (" +
        city_id_to_name[city_id] + ") ";    
        MyAjaxRequest('cities/' + city_id + '/researches.json', function result_got(result) {
            if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                var errMsg = baseMsg + "failed.";
                    if (result.dat.errors) {
                    errMsg += " Errors are: " + result.dat.errors.join('</br>');
                }
                    add_log_message(DATA_MODULE, ERROR, errMsg);
                    add_log_message(USER_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                    add_log_message(USER_MODULE, INFO, errMsg);
            }
            } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, RUNNING); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
            add_log_message(DATA_MODULE, level, finalMsg);
            add_log_message(USER_MODULE, level, finalMsg);
            }
        }, 1, 'post', props);
}
 
// List of units to train
var GRUNTS = "Conscript";
var TRUCKS = "Porter";
var SLASHERS = "Halberdsman";
var SIGBINS = "Minotaur";
var FLICKERFORMS = "Spy";
var SNIPERS = "Longbowman";
var VAMPIRE_BATS = "SwiftStrikeDragon";
var NEMESIS_BATS = "BattleDragon";
var ARMORED_TRUCKS = "ArmoredTransport";
var NOSFERATU = "Giant";
var IMPALERS = "FireMirror";
var REAPERS = "AquaTroop";
var ALCHEMIST = "StoneTroop";
 
function is_valid_troop_type(troop_type) {
    if ((troop_type == GRUNTS) || (troop_type == TRUCKS) || (troop_type == SLASHERS) || (troop_type == SIGBINS) ||
        (troop_type == FLICKERFORMS) || (troop_type == SNIPERS) || (troop_type == VAMPIRE_BATS) || (troop_type == NEMESIS_BATS) ||
        (troop_type == ARMORED_TRUCKS) || (troop_type == NOSFERATU) || (troop_type == IMPALERS)) {
        return true;
    }
    return false;
}
 
function train_units_retry(city_id, unit_id, quantity) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: quantity, op: OP_CREATE, status: TO_SCHEDULE};
        var id = store_object(object);
        train_units(city_id, unit_id, quantity, action_callback, id);
}
 
function train_units(city_id, unit_id, quantity, action_cb, context) {
    if (quantity <= 0) {
        add_log_message(DATA_MODULE, ERROR, "Can't train negative number (" + quantity + ") of troops.");
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
    if (!is_valid_troop_type(unit_id)) {
        add_log_message(DATA_MODULE, ERROR, "Invalid troop type for training (" + unit_id + ").");
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
   
        var props = {};
        props['units[quantity]']  = quantity;
        props['units[unit_type]'] = unit_id;
        props['_eventType'] = 'beginTrainingRequest';
       
    var baseMsg = "Training troops of type (" + troops_DOA_to_TON[unit_id] + ") in city (" +
        city_id_to_name[city_id] + ") ";
        MyAjaxRequest('cities/' + city_id + '/units.json', function result_got(result) {
                if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                var errMsg = baseMsg + "failed.";
                    if (result.dat.errors) {
                    errMsg += " Errors are: " + result.dat.errors.join('</br>');
                }
                add_log_message(DATA_MODULE, ERROR, errMsg);
                add_log_message(USER_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                    add_log_message(USER_MODULE, INFO, errMsg);
            }
            } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, RUNNING); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
                add_log_message(DATA_MODULE, level, finalMsg);
                add_log_message(USER_MODULE, level, finalMsg);
                }
    }, 1, 'post', props);
}
 
function dismiss_units_retry(city_id, unit_id, quantity) {
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: quantity, op: OP_DELETE, status: TO_SCHEDULE};
        var id = store_object(object);
        dismiss_units(city_id, unit_id, quantity, action_callback, id);
}
function dismiss_units(city_id, unit_id, quantity, action_cb, context) {
    if (quantity <= 0) {
        add_log_message(DATA_MODULE, ERROR, "Can't dismiss negative number (" + quantity + ") of troops.");
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
    if (!is_valid_troop_type(unit_id)) {
        add_log_message(DATA_MODULE, ERROR, "Invalid troop type for de-commissioning (" + unit_id + ").");
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
       
        var props = {};
        props['units[quantity]']  = quantity;
        props['units[unit_type]'] = unit_id;
        props['_eventType'] = 'dismissTroopsRequest';
       
    var baseMsg = "Dismissing troops of type (" + troops_DOA_to_TON[unit_id] +
        ") in city (" + city_id_to_name[city_id] + ") ";
        MyAjaxRequest('cities/' + city_id + '/units/dismiss.json', function result_got(result) {
                if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                var errMsg = baseMsg + "failed.";
                    if (result.dat.errors) {
                    errMsg += " Errors are: " + result.dat.errors.join('</br>');
                }
                add_log_message(DATA_MODULE, ERROR, errMsg);
                add_log_message(USER_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                    add_log_message(USER_MODULE, INFO, errMsg);
            }
            } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, RUNNING); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
                add_log_message(DATA_MODULE, level, finalMsg);
                add_log_message(USER_MODULE, level, finalMsg);
                }
    }, 1, 'delete', props);
}
 
function change_units_retry(city_id, unit_id, quantity) {
    var object;
    var id;
    if (quantity > 0) {
        object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: quantity, op: OP_CREATE, status: TO_SCHEDULE};
        id = store_object(object);
        train_units(city_id, unit_id, quantity, action_callback, id);
    } else {
        object = {type:GAME_REQUEST_TYPE, city: city_id, unit: unit_id, unit_type: TROOP, location: 0, qty: -quantity, op: OP_DELETE, status: TO_SCHEDULE};
        id = store_object(object);
        dismiss_units(city_id, unit_id, -quantity, action_callback, id);
    }
}
function change_units(city_id, unit_id, quantity, action_cb, context) {
    if (quantity > 0) {
        train_units(city_id, unit_id, quantity, action_cb, context);
    } else {
        dismiss_units(city_id, unit_id, -quantity, action_cb, context);
    }
}
 
function get_units_map(grunts, trucks, slashers, sigbins, flickerforms, snipers, vampireBats, nemesisBats,
    armoredTrucks, nosferatu, impalers, gargoyle_type, general_id) {
    var units = {};
    if (grunts != 0) {
        units.Conscript = grunts;
    }
    if (trucks != 0) {
        units.Porter = trucks;
    }
    if (slashers != 0) {
        units.Halberdsman = slashers;
    }
    if (sigbins != 0) {
        units.Minotaur= sigbins;
    }
    if (flickerforms != 0) {
        units.Spy = flickerforms;
    }
    if (snipers != 0) {
        units.Longbowman = snipers;
    }
    if (vampireBats != 0) {
        units.SwiftStrikeDragon = vampireBats;
    }
    if (nemesisBats != 0) {
        units.BattleDragon = nemesisBats;
    }
    if (armoredTrucks != 0) {
        units.ArmoredTransport = armoredTrucks;
    }
    if (nosferatu != 0) {
        units.Giant = nosferatu;
    }
    if (impalers != 0) {
        units.FireMirror = impalers;
    }
    if (gargoyle_type) {
        units[gargoyle_type] = 1;
    }
    if (general_id) {
        units["General:" + general_id] = 1;
    }
    return units;
}
 
function attack_retry(city_id, units, x, y) {    
    var object = {type:GAME_REQUEST_TYPE, city: city_id, unit: units, unit_type: ATTACK, location: {x:x, y:y}, qty: 1, op: OP_CREATE, status: TO_SCHEDULE};
    var id = store_object(object);
    attack(city_id, units, x, y, action_callback, id);  
}
 
function attack(city_id, units, x, y, action_cb, context) {
    if ((x < 0) || (x >= MAP_LENGTH) || (y < 0) || (y >= MAP_WIDTH)) {
        add_log_message(DATA_MODULE, ERROR, "Attack location (" + x + ", " + y + ") not correct!");
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
        return;
    }
    if (city_id != cityInfo[capital_index].city.id) {
        city_id = cityInfo[capital_index].city.id;
    }
   
    var general_id;
        var multiple_troops = false;
        var troops_data = "{";
        for (var prescribed_unit in units) {
            if (prescribed_unit.indexOf("General:") === 0) {
                general_id = prescribed_unit.substring(8);
                continue;
            }
                if (units[prescribed_unit] > 0) {
                        if (multiple_troops === true) {
                                troops_data += ',';
                        }
                        troops_data += '"' + prescribed_unit + '":' + units[prescribed_unit];
                        multiple_troops = true;
                }
        }
        if (!general_id) {
                getPlayerInfo();
            // Use the best general in city
            for (var i = 0; i < cityInfo.length; i++) {
                if (cityInfo[i].city.id == city_id) {
                    var city = cityInfo[i].city;
                   
                    var max_level = 0;
                    var max_general = null;
                    for (var j = 0; j < city.generals.length; j++) {
                        var general = city.generals[j];
                       
                        if ((max_level < general.level) && (generals_locations[general.id] == IN_CITY)) {
                            max_general = general;
                            max_level = general.level;
                        }
                }
                general_id = (max_general) ? max_general.id : 0;
                break;
                }
            }
            if (!general_id) {
            if (action_cb) { action_cb(null, context, ERROR_NOT_STARTED); }
            return;
            }
    }
    if (!multiple_troops) {
            add_log_message(DATA_MODULE, ERROR, "Can't attack without any troops.");
        if (action_cb) { action_cb(null, context, ERROR_IN_REQUEST); }
            return;
    }
    generals_locations[general_id] = IN_FIELD;
        troops_data += "}";
 
        var props = {};
        props['march[type]']    = 'AttackMarch';
        props['march[units]']           = troops_data;
        props['march[general_id]']      = general_id;
        props['march[x]']                       = x;
        props['march[y]']                       = y;
       
    var baseMsg = "Sending troops (to attack) on (" + x + ", " + y +
        ") from city (" + city_id_to_name[city_id] + ") ";
        MyAjaxRequest('cities/' + city_id + '/marches.json', function result_got(result) {
                if (!result.ok || result.dat.errors || (result.dat.result && !result.dat.result.success)) {
                    generals_locations[general_id] = IN_CITY;
                               
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                var errMsg = baseMsg + "failed.";
                errMsg += " The general (" + general_id_to_name[general_id] +
                    ") is used for attack.";
                    if (result.dat.errors) {
                    errMsg += " Errors are: " + result.dat.errors.join('</br>');
                }
                add_log_message(DATA_MODULE, ERROR, errMsg);
                add_log_message(USER_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                    add_log_message(USER_MODULE, INFO, errMsg);
                }
                } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, RUNNING); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
                add_log_message(DATA_MODULE, level, finalMsg);
                add_log_message(USER_MODULE, level, finalMsg);
                }
        }, 1, 'post', props);
}
 
var CellTypes = ['Invalid', 'WasteLand', 'Chasm', 'Mountain', 'Hill', 'Prairie', 'Lake', 'Marsh', 'RedBloodCamp', 'City'];
var MAP_LENGTH = 750;
var MAP_WIDTH = 750;
var cell_data = {
    player_level: '',
    player_might: '',
    is_friend: '',
    player_last_updated: '',
    cell_type: '',
    cell_level: ''};
var map_data = [];
 
function map_data_at(x, y, offset, action_cb, context) {
    var headers = {};
    headers['x'] = x;
    headers['y'] = y;
    headers['offset'] = offset;
    headers['_eventType'] = 'map_req';
   
    var baseMsg = "Getting map data at (" + x + ", " + y + ") with offset " + offset + " ";
    MyAjaxRequest('api/map.json', function response_got(result) {
                if (!result.ok || result.dat.errors || (result.dat.x != x) || (result.dat.result.y != y)) {
                var status_type = PROTOCOL_ERROR;
                if (action_cb) { status_type = action_cb(result, context, ERROR_NOT_STARTED); }
                if (status_type != DATA_SUCCESS) {
                var errMsg = baseMsg + "failed.";
                    if (result.dat.errors) {
                    errMsg += " Errors are: " + result.dat.errors.join('</br>');
                }
                add_log_message(DATA_MODULE, ERROR, errMsg);
                } else {
                    errMsg = baseMsg + "voided.";
                    add_log_message(DATA_MODULE, INFO, errMsg);
                }
                } else {
                status_type = DATA_SUCCESS;
                if (action_cb) { status_type = action_cb(result, context, COMPLETE); }
               
            var finalMsg = baseMsg + ((status_type == DATA_SUCCESS) ? "succeeded." : "failed.");
            var level = (status_type == DATA_SUCCESS) ? INFO : ERROR;
                add_log_message(DATA_MODULE, level, finalMsg);
                }
    }, 0, undefined, headers);
}
 
var static_map_init = false;
function get_static_map_data() {
    if (static_map_init) {
        return;
    }
    static_map_init = true;
   
    var details = {};
    details.binary = true;
    details.method = 'GET';
    details.url = "http://kabam1-a.akamaihd.net/tonwww/build/map.bin";
    details.overrideMimeType = "text\/plain; charset=x-user-defined";
    details.onerror = mapFetch_error;
    details.onload = mapFetch_completed;
   
    function mapFetch_error(response) {
        add_log_message(DATA_MODULE, ERROR, "Could not fetch map data, auto-attack will not work." +
            " Status is (" + response.statusText + ")");
        static_map_init = false;
    }
    function mapFetch_completed(response) {
        if (response.status != 200) {
            add_log_message(DATA_MODULE, ERROR, "Could not fetch map data, auto-attack will not work." +
                " Status is (" + response.statusText + ")");
            static_map_init = false;
            return;
        }
        for (var i = 0; i < MAP_LENGTH; i++) {
            map_data[i] = [];
            for (var j = 0; j < MAP_WIDTH; j++) {
                var cell_data_bin = parseInt(response.responseText.charCodeAt(i * MAP_WIDTH + j) & 0xff);
                    map_data[i][j] = {cell_level: (cell_data_bin & 0xf),
                    cell_type: (cell_data_bin >> 4)};
            }
        }
    }
    GM_xmlhttpRequest(details);    
}
 
var MAP_FETCH_SIZE = 15;    // (2 * Offset + 1)
function get_player_cities_data(x, y) {
    var isError = false;
    if (!is_defined(x) || (x < 0) || (x >= MAP_LENGTH) || isNaN(parseInt(x))) {
        x = 0;
        isError = true;
    }
    if (!is_defined(y) || (y < 0) || (y >= MAP_WIDTH) || isNaN(parseInt(y))) {
        y = 0;
        isError = true;
    }
    if (isError) {
        add_log_message(DATA_MODULE, WARNING, "Fetching 'player owned cities' data, wrong co-ordinates, (" +
            x + ", " + y + "), defaulting to zero when necesaary.");
    }
   
    var offset = (MAP_FETCH_SIZE - 1) / 2;
    map_data_at(x, y, offset, function(result, context, status) {
    }, null);
       
    var y_next = y + MAP_FETCH_SIZE;
    var y_end = y + offset;
    y = (y_end >= (MAP_WIDTH - 1)) ? 0 : ((y_next >= (MAP_WIDTH - 1)) ? (y_end + 1) : y_next);
   
    var x_next = x + MAP_FETCH_SIZE;
    var x_end = x + offset;
    x = (y != 0) ? x : ((x_end >= (MAP_LENGTH - 1)) ? 0 : ((x_next >= (MAP_LENGTH - 1)) ? (x_end + 1) : x_next));
   
    setTimeout(function() { get_player_cities_data(x, y); }, 1000);
}
 
function get_wilderness_map_data() {
    get_static_map_data();
}
function get_cities_map_data() {
    get_player_cities_data();
}
function get_map_data() {  
    get_wilderness_map_data();
    get_cities_map_data();
}
 
var attack_units = {};
var DATA_NOT_AVAILABLE = {};
DATA_NOT_AVAILABLE[NOSFERATU] = 999999;
// Local storage is limited, think before increasing marching distance.
var MARCH_DISTANCE = 15;
function init_attack_info() {
    for (field_type_index in CellTypes) {
        var field_type = CellTypes[field_type_index];
        if (field_type == 'RedBloodCamp') continue;
        attack_units[field_type] = {};
        for (var level = 1; level <= 12; level++) {
            attack_units[field_type][level] = DATA_NOT_AVAILABLE;
        }
    }
   
    attack_units['RedBloodCamp'] = {};
    for (level = 1; level <= 10; level++) {
        attack_units['RedBloodCamp'][level] = {};
    }
   /*
   // List of units to train
var GRUNTS = "Conscript";
var TRUCKS = "Porter";
var SLASHERS = "Halberdsman";
var SIGBINS = "Minotaur";
var FLICKERFORMS = "Spy";
var SNIPERS = "Longbowman";
var VAMPIRE_BATS = "SwiftStrikeDragon";
var NEMESIS_BATS = "BattleDragon";
var ARMORED_TRUCKS = "ArmoredTransport";
var NOSFERATU = "Giant";
var IMPALERS = "FireMirror";
var REAPERS = "AquaTroop";
var ALCHEMIST = "StoneTroop";
*/
 
 
 
/*
1. To load this script drag it onto your Google Chrome browser window - it will ask you if you want to instal it. Click yes. Then reload your TON window
 
    TROOP DOUBLING GLITCH
1. The following line defines which troops it will try to glitch.
2. You must have that many troops of that kind for it to work (IMPALERS, SNIPERS, ETC)
3. Once you define the troop type and quantity - load the script, click the attack tab, click the auto-attack box and update - that's it.
*/
    attack_units['RedBloodCamp'][1][IMPALERS] = {type:TROOP, qty:125000};

/*
    attack_units['RedBloodCamp'][1][IMPALERS] = {type:TROOP, qty:1000};
    attack_units['RedBloodCamp'][1]["Twilight Warfare"] = {type:TECHNOLOGY, level:8};
    attack_units['RedBloodCamp'][1]["Spectral Vision"] = {type:TECHNOLOGY, level:8};
    attack_units['RedBloodCamp'][1]["Endurance"] = {type:TECHNOLOGY, level:6};
    attack_units['RedBloodCamp'][1]["Blood Transfusions"] = {type:TECHNOLOGY, level:6};
*/
   
    MARCH_DISTANCE = 15;
}
 
function auto_attack_desired(x, y, cell_data) {
    if ((x < 0) || (x >= MAP_LENGTH) || (y < 0) || (y >= MAP_WIDTH) || !is_defined(cell_data)) {
        add_log_message(AUTO_ATTACK_MODULE, WARNING, "Can't determine if cell is good for attack or not. Invalid co-ords or cell data");
        return false;
    }
    if (CellTypes[cell_data.cell_type] == 'RedBloodCamp') {
        return true;
    }
    return false;
}
 
var auto_attack_id_by_location = {};
function auto_attack_thread() {
    if (game_config[AUTO_ATTACK_STATE].value) {
        getPlayerInfo();
       
        var curr_out_of_scope = auto_attack_id_by_location;
        for (var i = 0; i < cityInfo.length; i++) {
            var city = cityInfo[i].city;
            if (city.type != "Capital") { continue; }
           
            for (var x = city.x - MARCH_DISTANCE; x < city.x + MARCH_DISTANCE; x++) {
                for (var y = city.y - MARCH_DISTANCE; y < city.y + MARCH_DISTANCE; y++) {
                    x = (x < 0) ? (x + MAP_LENGTH) : ((x >= MAP_LENGTH) ? (x - MAP_LENGTH) : x);
                    y = (y < 0) ? (y + MAP_WIDTH) : ((y >= MAP_WIDTH) ? (y - MAP_WIDTH) : y);
 
                    var cell_data = map_data[x][y];
                    if (auto_attack_desired(x, y, cell_data)) {
                        var attack_reqs = attack_units[CellTypes[cell_data.cell_type]][cell_data.cell_level];
                                               
                                if (!is_defined(attack_reqs) || !attack_reqs) {
                                        add_log_message(AUTO_ATTACK_MODULE, ERROR, "No requirements/troops " +
                                                "given for attacking (" + x + ", " + y + "). Not attacking.");
                                        continue;
                                        }
 
                        var units = {};
                        for (pre_req in attack_reqs) {
                            if (attack_reqs[pre_req]['type'] == TROOP) {
                                units[pre_req] = attack_reqs[pre_req]['qty'];
                            }
                        }
                                if (!units) {
                                                add_log_message(AUTO_ATTACK_MODULE, ERROR, "No troops " +
                                                        "set for attacking (" + x + ", " + y + "). Not attacking.");
                                                continue;
                                        }
                                       
                        var location_object = {x:x, y:y, city:city.id};
                        var location_string = JSON.stringify(location_object);
                        if (auto_attack_id_by_location.hasOwnProperty(location_string)) {
                            delete curr_out_of_scope[location_string];
                           
                            var id = auto_attack_id_by_location[location_string];
                            var attack_object = retrieve_object(id);
 
                            if (attack_object && (attack_object.status != TO_SCHEDULE) &&
                                (attack_object.status != RUNNING) &&
                                (attack_object.status != COMPLETE)) {
                                attack_object.unit = units;
                                attack_object.preReq = attack_reqs;
                                update_object(id, attack_object);
                                continue;
                            }
                        }
                       
                        var attack_params = {type:GAME_REQUEST_TYPE, city: city.id, unit: units, unit_type: ATTACK,
                            location: {x:x, y:y}, qty: 1, op: OP_CREATE, status: WAITING_FOR_PREREQ, preReq: attack_reqs};
                        id = store_object(attack_params);
                        auto_attack_id_by_location[location_string] = id;
                    }
                }
            }
        }
        for (oos_location in curr_out_of_scope) {
            attack_object = retrieve_object(curr_out_of_scope[oos_location]);
 
            if (attack_object && (attack_object.status != TO_SCHEDULE) &&
                (attack_object.status != RUNNING) &&
                (attack_object.status != COMPLETE)) {
                remove_object(auto_attack_id_by_location[oos_location]);
                delete auto_attack_id_by_location[oos_location];
            }
        }
    } else {
        for (location in auto_attack_id_by_location) {
            attack_object = retrieve_object(auto_attack_id_by_location[location]);
 
            if (attack_object && (attack_object.status != TO_SCHEDULE) &&
                (attack_object.status != RUNNING) &&
                (attack_object.status != COMPLETE)) {
                remove_object(auto_attack_id_by_location[location]);
                delete auto_attack_id_by_location[location];
            }
        }
    }
    setTimeout(auto_attack_thread, 60000);
}
