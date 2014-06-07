// ==UserScript==
// @name            ne2m (TON)
// @description     Power tools for the game "Thirst of Night" (TON)
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
			handle		: popupParts['main'], 
			scroll		: window,
			onEnd		: function(dragger, event) {
//				if (!this.drag) return;
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
				responseText	: ajax.responseText,
				status			: ajax.status,
				statusText		: ajax.statusText,
				ajax			: ajax
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
	params['user_id']		= userId;
	params['_session_id']	= sessionId;
	params['version']		= api_version;
	params['gangster']		= gangster;
	params['timestamp']		= parseInt(serverTime());		
	if (method) {
    	params['_method']		= method;		
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
			ok		: false,
			status	: r.status,
			errmsg	: r.statusText
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
//	<li><a href="#" width="12%" id="show_TON_ui_1">Research</a></li>\
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
<marquee><li id="Script_Name" style="color:white;">Dicks Love Vaginas</li></marquee>\
</td></tr></table>\
</ul>\
</div>\
<div id="ui_shell_content" style="background-image:url(http://discuss.anitahampton.net/wp-content/themes/wiki/images/header_gradient_blue.jpg);background-repeat:no-repeat;">\
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
        "Medicine": "Blood Transfusions", "Levitation": "Spectral Vision", "Ballistics": "Architecture",
        "Mercantilism": "Gargoyle Agility"};
    troops_DOA_to_TON = {"Conscript": "Grunt", "Porter": "Truck", "Halberdsman": "Slasher", 
        "Minotaur": "Sigbin", "Spy": "Flickerform", "Longbowman": "Sniper", 
        "SwiftStrikeDragon": "Vampire Bat", "BattleDragon": "Nemesis Bat", 
        "ArmoredTransport": "Armored Truck", "Giant": "Nosferatu", "FireMirror": "Impaler"};

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
	props['march[type]']	= 'AttackMarch';
	props['march[units]']		= troops_data;
	props['march[general_id]']	= general_id;
	props['march[x]']			= x;
	props['march[y]']			= y;
	
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
   

    attack_units['RedBloodCamp'][1][NOSFERATU] = {type:TROOP, qty:7000};


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

/*  Prototype JavaScript framework, version 1.7
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 *--------------------------------------------------------------------------*/

var Prototype = {

  Version: '1.7',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,

    SelectorsAPI: !!document.querySelector,

    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div'),
          form = document.createElement('form'),
          isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },

  K: function(x) { return x }
};

if (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;


var Abstract = { };


var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

/* Based on Alex Arnell's inheritance implementation. */

var Class = (function() {

  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();

  function subclass() {};
  function create() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
  }

  function addMethods(source) {
    var ancestor   = this.superclass && this.superclass.prototype,
        properties = Object.keys(source);

    if (IS_DONTENUM_BUGGY) {
      if (source.toString != Object.prototype.toString)
        properties.push("toString");
      if (source.valueOf != Object.prototype.valueOf)
        properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames()[0] == "$super") {
        var method = value;
        value = (function(m) {
          return function() { return ancestor[m].apply(this, arguments); };
        })(property).wrap(method);

        value.valueOf = method.valueOf.bind(method);
        value.toString = method.toString.bind(method);
      }
      this.prototype[property] = value;
    }

    return this;
  }

  return {
    create: create,
    Methods: {
      addMethods: addMethods
    }
  };
})();
(function() {

  var _toString = Object.prototype.toString,
      NULL_TYPE = 'Null',
      UNDEFINED_TYPE = 'Undefined',
      BOOLEAN_TYPE = 'Boolean',
      NUMBER_TYPE = 'Number',
      STRING_TYPE = 'String',
      OBJECT_TYPE = 'Object',
      FUNCTION_CLASS = '[object Function]',
      BOOLEAN_CLASS = '[object Boolean]',
      NUMBER_CLASS = '[object Number]',
      STRING_CLASS = '[object String]',
      ARRAY_CLASS = '[object Array]',
      DATE_CLASS = '[object Date]',
      NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON &&
        typeof JSON.stringify === 'function' &&
        JSON.stringify(0) === '0' &&
        typeof JSON.stringify(Prototype.K) === 'undefined';

  function Type(o) {
    switch(o) {
      case null: return NULL_TYPE;
      case (void 0): return UNDEFINED_TYPE;
    }
    var type = typeof o;
    switch(type) {
      case 'boolean': return BOOLEAN_TYPE;
      case 'number':  return NUMBER_TYPE;
      case 'string':  return STRING_TYPE;
    }
    return OBJECT_TYPE;
  }

  function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  }

  function inspect(object) {
    try {
      if (isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  }

  function toJSON(value) {
    return Str('', { '': value }, []);
  }

  function Str(key, holder, stack) {
    var value = holder[key],
        type = typeof value;

    if (Type(value) === OBJECT_TYPE && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    var _class = _toString.call(value);

    switch (_class) {
      case NUMBER_CLASS:
      case BOOLEAN_CLASS:
      case STRING_CLASS:
        value = value.valueOf();
    }

    switch (value) {
      case null: return 'null';
      case true: return 'true';
      case false: return 'false';
    }

    type = typeof value;
    switch (type) {
      case 'string':
        return value.inspect(true);
      case 'number':
        return isFinite(value) ? String(value) : 'null';
      case 'object':

        for (var i = 0, length = stack.length; i < length; i++) {
          if (stack[i] === value) { throw new TypeError(); }
        }
        stack.push(value);

        var partial = [];
        if (_class === ARRAY_CLASS) {
          for (var i = 0, length = value.length; i < length; i++) {
            var str = Str(i, value, stack);
            partial.push(typeof str === 'undefined' ? 'null' : str);
          }
          partial = '[' + partial.join(',') + ']';
        } else {
          var keys = Object.keys(value);
          for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i], str = Str(key, value, stack);
            if (typeof str !== "undefined") {
               partial.push(key.inspect(true)+ ':' + str);
             }
          }
          partial = '{' + partial.join(',') + '}';
        }
        stack.pop();
        return partial;
    }
  }

  function stringify(object) {
    return JSON.stringify(object);
  }

  function toQueryString(object) {
    return $H(object).toQueryString();
  }

  function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }

  function keys(object) {
    if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
    var results = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        results.push(property);
      }
    }
    return results;
  }

  function values(object) {
    var results = [];
    for (var property in object)
      results.push(object[property]);
    return results;
  }

  function clone(object) {
    return extend({ }, object);
  }

  function isElement(object) {
    return !!(object && object.nodeType == 1);
  }

  function isArray(object) {
    return _toString.call(object) === ARRAY_CLASS;
  }

  var hasNativeIsArray = (typeof Array.isArray == 'function')
    && Array.isArray([]) && !Array.isArray({});

  if (hasNativeIsArray) {
    isArray = Array.isArray;
  }

  function isHash(object) {
    return object instanceof Hash;
  }

  function isFunction(object) {
    return _toString.call(object) === FUNCTION_CLASS;
  }

  function isString(object) {
    return _toString.call(object) === STRING_CLASS;
  }

  function isNumber(object) {
    return _toString.call(object) === NUMBER_CLASS;
  }

  function isDate(object) {
    return _toString.call(object) === DATE_CLASS;
  }

  function isUndefined(object) {
    return typeof object === "undefined";
  }

  extend(Object, {
    extend:        extend,
    inspect:       inspect,
    toJSON:        NATIVE_JSON_STRINGIFY_SUPPORT ? stringify : toJSON,
    toQueryString: toQueryString,
    toHTML:        toHTML,
    keys:          Object.keys || keys,
    values:        values,
    clone:         clone,
    isElement:     isElement,
    isArray:       isArray,
    isHash:        isHash,
    isFunction:    isFunction,
    isString:      isString,
    isNumber:      isNumber,
    isDate:        isDate,
    isUndefined:   isUndefined
  });
})();
Object.extend(Function.prototype, (function() {
  var slice = Array.prototype.slice;

  function update(array, args) {
    var arrayLength = array.length, length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
  }

  function merge(array, args) {
    array = slice.call(array, 0);
    return update(array, args);
  }

  function argumentNames() {
    var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
      .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
      .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
  }

  function bind(context) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
    var __method = this, args = slice.call(arguments, 1);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(context, a);
    }
  }

  function bindAsEventListener(context) {
    var __method = this, args = slice.call(arguments, 1);
    return function(event) {
      var a = update([event || window.event], args);
      return __method.apply(context, a);
    }
  }

  function curry() {
    if (!arguments.length) return this;
    var __method = this, args = slice.call(arguments, 0);
    return function() {
      var a = merge(args, arguments);
      return __method.apply(this, a);
    }
  }

  function delay(timeout) {
    var __method = this, args = slice.call(arguments, 1);
    timeout = timeout * 1000;
    return window.setTimeout(function() {
      return __method.apply(__method, args);
    }, timeout);
  }

  function defer() {
    var args = update([0.01], arguments);
    return this.delay.apply(this, args);
  }

  function wrap(wrapper) {
    var __method = this;
    return function() {
      var a = update([__method.bind(this)], arguments);
      return wrapper.apply(this, a);
    }
  }

  function methodize() {
    if (this._methodized) return this._methodized;
    var __method = this;
    return this._methodized = function() {
      var a = update([this], arguments);
      return __method.apply(null, a);
    };
  }

  return {
    argumentNames:       argumentNames,
    bind:                bind,
    bindAsEventListener: bindAsEventListener,
    curry:               curry,
    delay:               delay,
    defer:               defer,
    wrap:                wrap,
    methodize:           methodize
  }
})());



(function(proto) {


  function toISOString() {
    return this.getUTCFullYear() + '-' +
      (this.getUTCMonth() + 1).toPaddedString(2) + '-' +
      this.getUTCDate().toPaddedString(2) + 'T' +
      this.getUTCHours().toPaddedString(2) + ':' +
      this.getUTCMinutes().toPaddedString(2) + ':' +
      this.getUTCSeconds().toPaddedString(2) + 'Z';
  }


  function toJSON() {
    return this.toISOString();
  }

  if (!proto.toISOString) proto.toISOString = toISOString;
  if (!proto.toJSON) proto.toJSON = toJSON;

})(Date.prototype);


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function(str) {
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};
var PeriodicalExecuter = Class.create({
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  execute: function() {
    this.callback(this);
  },

  stop: function() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  },

  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false;
      } catch(e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend(String, {
  interpret: function(value) {
    return value == null ? '' : String(value);
  },
  specialChar: {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '\\': '\\\\'
  }
});

Object.extend(String.prototype, (function() {
  var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
    typeof JSON.parse === 'function' &&
    JSON.parse('{"test": true}').test;

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) return replacement;
    var template = new Template(replacement);
    return function(match) { return template.evaluate(match) };
  }

  function gsub(pattern, replacement) {
    var result = '', source = this, match;
    replacement = prepareReplacement(replacement);

    if (Object.isString(pattern))
      pattern = RegExp.escape(pattern);

    if (!(pattern.length || pattern.source)) {
      replacement = replacement('');
      return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this);
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
  }

  function strip() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script) });
  }

  function escapeHTML() {
    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  }


  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return { };

    return match[1].split(separator || '&').inject({ }, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var key = decodeURIComponent(pair.shift()),
            value = pair.length > 1 ? pair.join('=') : pair[0];

        if (value != undefined) value = decodeURIComponent(value);

        if (key in hash) {
          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];
          hash[key].push(value);
        }
        else hash[key] = value;
      }
      return hash;
    });
  }

  function toArray() {
    return this.split('');
  }

  function succ() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  }

  function times(count) {
    return count < 1 ? '' : new Array(count + 1).join(this);
  }

  function camelize() {
    return this.replace(/-+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  }

  function underscore() {
    return this.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/-/g, '_')
               .toLowerCase();
  }

  function dasherize() {
    return this.replace(/_/g, '-');
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character];
      }
      return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }

  function isJSON() {
    var str = this;
    if (str.blank()) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON(),
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    if (cx.test(json)) {
      json = json.replace(cx, function (a) {
        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      });
    }
    try {
      if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) { }
    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
  }

  function parseJSON() {
    var json = this.unfilterJSON();
    return JSON.parse(json);
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1;
  }

  function startsWith(pattern) {
    return this.lastIndexOf(pattern, 0) === 0;
  }

  function endsWith(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d;
  }

  function empty() {
    return this == '';
  }

  function blank() {
    return /^\s*$/.test(this);
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object);
  }

  return {
    gsub:           gsub,
    sub:            sub,
    scan:           scan,
    truncate:       truncate,
    strip:          String.prototype.trim || strip,
    stripTags:      stripTags,
    stripScripts:   stripScripts,
    extractScripts: extractScripts,
    evalScripts:    evalScripts,
    escapeHTML:     escapeHTML,
    unescapeHTML:   unescapeHTML,
    toQueryParams:  toQueryParams,
    parseQuery:     toQueryParams,
    toArray:        toArray,
    succ:           succ,
    times:          times,
    camelize:       camelize,
    capitalize:     capitalize,
    underscore:     underscore,
    dasherize:      dasherize,
    inspect:        inspect,
    unfilterJSON:   unfilterJSON,
    isJSON:         isJSON,
    evalJSON:       NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
    include:        include,
    startsWith:     startsWith,
    endsWith:       endsWith,
    empty:          empty,
    blank:          blank,
    interpolate:    interpolate
  };
})());

var Template = Class.create({
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern = pattern || Template.Pattern;
  },

  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();

    return this.template.gsub(this.pattern, function(match) {
      if (object == null) return (match[1] + '');

      var before = match[1] || '';
      if (before == '\\') return match[2];

      var ctx = object, expr = match[3],
          pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

      match = pattern.exec(expr);
      if (match == null) return before;

      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null == ctx || '' == match[3]) break;
        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }

      return before + String.interpret(ctx);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $break = { };

var Enumerable = (function() {
  function each(iterator, context) {
    var index = 0;
    try {
      this._each(function(value) {
        iterator.call(context, value, index++);
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  }

  function eachSlice(number, iterator, context) {
    var index = -number, slices = [], array = this.toArray();
    if (number < 1) return array;
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.collect(iterator, context);
  }

  function all(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = true;
    this.each(function(value, index) {
      result = result && !!iterator.call(context, value, index);
      if (!result) throw $break;
    });
    return result;
  }

  function any(iterator, context) {
    iterator = iterator || Prototype.K;
    var result = false;
    this.each(function(value, index) {
      if (result = !!iterator.call(context, value, index))
        throw $break;
    });
    return result;
  }

  function collect(iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];
    this.each(function(value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function detect(iterator, context) {
    var result;
    this.each(function(value, index) {
      if (iterator.call(context, value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  }

  function findAll(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function grep(filter, iterator, context) {
    iterator = iterator || Prototype.K;
    var results = [];

    if (Object.isString(filter))
      filter = new RegExp(RegExp.escape(filter));

    this.each(function(value, index) {
      if (filter.match(value))
        results.push(iterator.call(context, value, index));
    });
    return results;
  }

  function include(object) {
    if (Object.isFunction(this.indexOf))
      if (this.indexOf(object) != -1) return true;

    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  }

  function inGroupsOf(number, fillWith) {
    fillWith = Object.isUndefined(fillWith) ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  }

  function inject(memo, iterator, context) {
    this.each(function(value, index) {
      memo = iterator.call(context, memo, value, index);
    });
    return memo;
  }

  function invoke(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  }

  function max(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value >= result)
        result = value;
    });
    return result;
  }

  function min(iterator, context) {
    iterator = iterator || Prototype.K;
    var result;
    this.each(function(value, index) {
      value = iterator.call(context, value, index);
      if (result == null || value < result)
        result = value;
    });
    return result;
  }

  function partition(iterator, context) {
    iterator = iterator || Prototype.K;
    var trues = [], falses = [];
    this.each(function(value, index) {
      (iterator.call(context, value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  }

  function pluck(property) {
    var results = [];
    this.each(function(value) {
      results.push(value[property]);
    });
    return results;
  }

  function reject(iterator, context) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator.call(context, value, index))
        results.push(value);
    });
    return results;
  }

  function sortBy(iterator, context) {
    return this.map(function(value, index) {
      return {
        value: value,
        criteria: iterator.call(context, value, index)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  }

  function toArray() {
    return this.map();
  }

  function zip() {
    var iterator = Prototype.K, args = $A(arguments);
    if (Object.isFunction(args.last()))
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  }

  function size() {
    return this.toArray().length;
  }

  function inspect() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }









  return {
    each:       each,
    eachSlice:  eachSlice,
    all:        all,
    every:      all,
    any:        any,
    some:       any,
    collect:    collect,
    map:        collect,
    detect:     detect,
    findAll:    findAll,
    select:     findAll,
    filter:     findAll,
    grep:       grep,
    include:    include,
    member:     include,
    inGroupsOf: inGroupsOf,
    inject:     inject,
    invoke:     invoke,
    max:        max,
    min:        min,
    partition:  partition,
    pluck:      pluck,
    reject:     reject,
    sortBy:     sortBy,
    toArray:    toArray,
    entries:    toArray,
    zip:        zip,
    size:       size,
    inspect:    inspect,
    find:       detect
  };
})();

function $A(iterable) {
  if (!iterable) return [];
  if ('toArray' in Object(iterable)) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}


function $w(string) {
  if (!Object.isString(string)) return [];
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

Array.from = $A;


(function() {
  var arrayProto = Array.prototype,
      slice = arrayProto.slice,
      _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

  function each(iterator, context) {
    for (var i = 0, length = this.length >>> 0; i < length; i++) {
      if (i in this) iterator.call(context, this[i], i, this);
    }
  }
  if (!_each) _each = each;

  function clear() {
    this.length = 0;
    return this;
  }

  function first() {
    return this[0];
  }

  function last() {
    return this[this.length - 1];
  }

  function compact() {
    return this.select(function(value) {
      return value != null;
    });
  }

  function flatten() {
    return this.inject([], function(array, value) {
      if (Object.isArray(value))
        return array.concat(value.flatten());
      array.push(value);
      return array;
    });
  }

  function without() {
    var values = slice.call(arguments, 0);
    return this.select(function(value) {
      return !values.include(value);
    });
  }

  function reverse(inline) {
    return (inline === false ? this.toArray() : this)._reverse();
  }

  function uniq(sorted) {
    return this.inject([], function(array, value, index) {
      if (0 == index || (sorted ? array.last() != value : !array.include(value)))
        array.push(value);
      return array;
    });
  }

  function intersect(array) {
    return this.uniq().findAll(function(item) {
      return array.detect(function(value) { return item === value });
    });
  }


  function clone() {
    return slice.call(this, 0);
  }

  function size() {
    return this.length;
  }

  function inspect() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }

  function indexOf(item, i) {
    i || (i = 0);
    var length = this.length;
    if (i < 0) i = length + i;
    for (; i < length; i++)
      if (this[i] === item) return i;
    return -1;
  }

  function lastIndexOf(item, i) {
    i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
    var n = this.slice(0, i).reverse().indexOf(item);
    return (n < 0) ? n : i - n - 1;
  }

  function concat() {
    var array = slice.call(this, 0), item;
    for (var i = 0, length = arguments.length; i < length; i++) {
      item = arguments[i];
      if (Object.isArray(item) && !('callee' in item)) {
        for (var j = 0, arrayLength = item.length; j < arrayLength; j++)
          array.push(item[j]);
      } else {
        array.push(item);
      }
    }
    return array;
  }

  Object.extend(arrayProto, Enumerable);

  if (!arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend(arrayProto, {
    _each:     _each,
    clear:     clear,
    first:     first,
    last:      last,
    compact:   compact,
    flatten:   flatten,
    without:   without,
    reverse:   reverse,
    uniq:      uniq,
    intersect: intersect,
    clone:     clone,
    toArray:   clone,
    size:      size,
    inspect:   inspect
  });

  var CONCAT_ARGUMENTS_BUGGY = (function() {
    return [].concat(arguments)[0][0] !== 1;
  })(1,2)

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
  if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
})();
function $H(object) {
  return new Hash(object);
};

var Hash = Class.create(Enumerable, (function() {
  function initialize(object) {
    this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);
  }


  function _each(iterator) {
    for (var key in this._object) {
      var value = this._object[key], pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  }

  function set(key, value) {
    return this._object[key] = value;
  }

  function get(key) {
    if (this._object[key] !== Object.prototype[key])
      return this._object[key];
  }

  function unset(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  }

  function toObject() {
    return Object.clone(this._object);
  }



  function keys() {
    return this.pluck('key');
  }

  function values() {
    return this.pluck('value');
  }

  function index(value) {
    var match = this.detect(function(pair) {
      return pair.value === value;
    });
    return match && match.key;
  }

  function merge(object) {
    return this.clone().update(object);
  }

  function update(object) {
    return new Hash(object).inject(this, function(result, pair) {
      result.set(pair.key, pair.value);
      return result;
    });
  }

  function toQueryPair(key, value) {
    if (Object.isUndefined(value)) return key;
    return key + '=' + encodeURIComponent(String.interpret(value));
  }

  function toQueryString() {
    return this.inject([], function(results, pair) {
      var key = encodeURIComponent(pair.key), values = pair.value;

      if (values && typeof values == 'object') {
        if (Object.isArray(values)) {
          var queryValues = [];
          for (var i = 0, len = values.length, value; i < len; i++) {
            value = values[i];
            queryValues.push(toQueryPair(key, value));
          }
          return results.concat(queryValues);
        }
      } else results.push(toQueryPair(key, values));
      return results;
    }).join('&');
  }

  function inspect() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }

  function clone() {
    return new Hash(this);
  }

  return {
    initialize:             initialize,
    _each:                  _each,
    set:                    set,
    get:                    get,
    unset:                  unset,
    toObject:               toObject,
    toTemplateReplacements: toObject,
    keys:                   keys,
    values:                 values,
    index:                  index,
    merge:                  merge,
    update:                 update,
    toQueryString:          toQueryString,
    inspect:                inspect,
    toJSON:                 toObject,
    clone:                  clone
  };
})());

Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function toColorPart() {
    return this.toPaddedString(2, 16);
  }

  function succ() {
    return this + 1;
  }

  function times(iterator, context) {
    $R(0, this, true).each(iterator, context);
    return this;
  }

  function toPaddedString(length, radix) {
    var string = this.toString(radix || 10);
    return '0'.times(length - string.length) + string;
  }

  function abs() {
    return Math.abs(this);
  }

  function round() {
    return Math.round(this);
  }

  function ceil() {
    return Math.ceil(this);
  }

  function floor() {
    return Math.floor(this);
  }

  return {
    toColorPart:    toColorPart,
    succ:           succ,
    times:          times,
    toPaddedString: toPaddedString,
    abs:            abs,
    round:          round,
    ceil:           ceil,
    floor:          floor
  };
})());

function $R(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var ObjectRange = Class.create(Enumerable, (function() {
  function initialize(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  }

  function _each(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  }

  function include(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }

  return {
    initialize: initialize,
    _each:      _each,
    include:    include
  };
})());



var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (Object.isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});
Ajax.Base = Class.create({
  initialize: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    Object.extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (Object.isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,

  initialize: function($super, url, options) {
    $super(options);
    this.transport = Ajax.getTransport();
    this.request(url);
  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.isString(this.options.parameters) ?
          this.options.parameters :
          Object.toQueryString(this.options.parameters);

    if (!['get', 'post'].include(this.method)) {
      params += (params ? '&' : '') + "_method=" + this.method;
      this.method = 'post';
    }

    if (params && this.method === 'get') {
      this.url += (this.url.include('?') ? '&' : '?') + params;
    }

    this.parameters = params.toQueryParams();

    try {
      var response = new Ajax.Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Ajax.Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (Object.isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300) || status == 304;
  },

  getStatus: function() {
    try {
      if (this.transport.status === 1223) return 204;
      return this.transport.status || 0;
    } catch (e) { return 0 }
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);
      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  },

  evalResponse: function() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];








Ajax.Response = Class.create({
  initialize: function(request){
    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    if ((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = String.interpret(transport.responseText);
      this.headerJSON   = this._getHeaderJSON();
    }

    if (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = Object.isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  },

  status:      0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  },

  getResponseHeader: function(name) {
    return this.transport.getResponseHeader(name);
  },

  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders();
  },

  _getHeaderJSON: function() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;
    json = decodeURIComponent(escape(json));
    try {
      return json.evalJSON(this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  },

  _getResponseJSON: function() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(this.getHeader('Content-type') || '').include('application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return this.responseText.evalJSON(options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }
});

Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = Object.clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (Object.isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (Object.isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});


function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(Element.extend(query.snapshotItem(i)));
    return results;
  };
}

/*--------------------------------------------------------------------------*/

if (!Node) var Node = { };

if (!Node.ELEMENT_NODE) {
  Object.extend(Node, {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  });
}



(function(global) {
  function shouldUseCache(tagName, attributes) {
    if (tagName === 'select') return false;
    if ('type' in attributes) return false;
    return true;
  }

  var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (function(){
    try {
      var el = document.createElement('<input name="x">');
      return el.tagName.toLowerCase() === 'input' && el.name === 'x';
    }
    catch(err) {
      return false;
    }
  })();

  var element = global.Element;

  global.Element = function(tagName, attributes) {
    attributes = attributes || { };
    tagName = tagName.toLowerCase();
    var cache = Element.cache;

    if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
      tagName = '<' + tagName + ' name="' + attributes.name + '">';
      delete attributes.name;
      return Element.writeAttribute(document.createElement(tagName), attributes);
    }

    if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));

    var node = shouldUseCache(tagName, attributes) ?
     cache[tagName].cloneNode(false) : document.createElement(tagName);

    return Element.writeAttribute(node, attributes);
  };

  Object.extend(global.Element, element || { });
  if (element) global.Element.prototype = element.prototype;

})(this);

Element.idCounter = 1;
Element.cache = { };

Element._purgeElement = function(element) {
  var uid = element._prototypeUID;
  if (uid) {
    Element.stopObserving(element);
    element._prototypeUID = void 0;
    delete Element.Storage[uid];
  }
}

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },

  hide: function(element) {
    element = $(element);
    element.style.display = 'none';
    return element;
  },

  show: function(element) {
    element = $(element);
    element.style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: (function(){

    var SELECT_ELEMENT_INNERHTML_BUGGY = (function(){
      var el = document.createElement("select"),
          isBuggy = true;
      el.innerHTML = "<option value=\"test\">test</option>";
      if (el.options && el.options[0]) {
        isBuggy = el.options[0].nodeName.toUpperCase() !== "OPTION";
      }
      el = null;
      return isBuggy;
    })();

    var TABLE_ELEMENT_INNERHTML_BUGGY = (function(){
      try {
        var el = document.createElement("table");
        if (el && el.tBodies) {
          el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
          var isBuggy = typeof el.tBodies[0] == "undefined";
          el = null;
          return isBuggy;
        }
      } catch (e) {
        return true;
      }
    })();

    var LINK_ELEMENT_INNERHTML_BUGGY = (function() {
      try {
        var el = document.createElement('div');
        el.innerHTML = "<link>";
        var isBuggy = (el.childNodes.length === 0);
        el = null;
        return isBuggy;
      } catch(e) {
        return true;
      }
    })();

    var ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY ||
     TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY;

    var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
      var s = document.createElement("script"),
          isBuggy = false;
      try {
        s.appendChild(document.createTextNode(""));
        isBuggy = !s.firstChild ||
          s.firstChild && s.firstChild.nodeType !== 3;
      } catch (e) {
        isBuggy = true;
      }
      s = null;
      return isBuggy;
    })();


    function update(element, content) {
      element = $(element);
      var purgeElement = Element._purgeElement;

      var descendants = element.getElementsByTagName('*'),
       i = descendants.length;
      while (i--) purgeElement(descendants[i]);

      if (content && content.toElement)
        content = content.toElement();

      if (Object.isElement(content))
        return element.update().insert(content);

      content = Object.toHTML(content);

      var tagName = element.tagName.toUpperCase();

      if (tagName === 'SCRIPT' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
        element.text = content;
        return element;
      }

      if (ANY_INNERHTML_BUGGY) {
        if (tagName in Element._insertionTranslations.tags) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          Element._getContentFromAnonymousElement(tagName, content.stripScripts())
            .each(function(node) {
              element.appendChild(node)
            });
        } else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString(content) && content.indexOf('<link') > -1) {
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          var nodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts(), true);
          nodes.each(function(node) { element.appendChild(node) });
        }
        else {
          element.innerHTML = content.stripScripts();
        }
      }
      else {
        element.innerHTML = content.stripScripts();
      }

      content.evalScripts.bind(content).defer();
      return element;
    }

    return update;
  })(),

  replace: function(element, content) {
    element = $(element);
    if (content && content.toElement) content = content.toElement();
    else if (!Object.isElement(content)) {
      content = Object.toHTML(content);
      var range = element.ownerDocument.createRange();
      range.selectNode(element);
      content.evalScripts.bind(content).defer();
      content = range.createContextualFragment(content.stripScripts());
    }
    element.parentNode.replaceChild(content, element);
    return element;
  },

  insert: function(element, insertions) {
    element = $(element);

    if (Object.isString(insertions) || Object.isNumber(insertions) ||
        Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))
          insertions = {bottom:insertions};

    var content, insert, tagName, childNodes;

    for (var position in insertions) {
      content  = insertions[position];
      position = position.toLowerCase();
      insert = Element._insertionTranslations[position];

      if (content && content.toElement) content = content.toElement();
      if (Object.isElement(content)) {
        insert(element, content);
        continue;
      }

      content = Object.toHTML(content);

      tagName = ((position == 'before' || position == 'after')
        ? element.parentNode : element).tagName.toUpperCase();

      childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());

      if (position == 'top' || position == 'after') childNodes.reverse();
      childNodes.each(insert.curry(element));

      content.evalScripts.bind(content).defer();
    }

    return element;
  },

  wrap: function(element, wrapper, attributes) {
    element = $(element);
    if (Object.isElement(wrapper))
      $(wrapper).writeAttribute(attributes || { });
    else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);
    else wrapper = new Element('div', wrapper);
    if (element.parentNode)
      element.parentNode.replaceChild(wrapper, element);
    wrapper.appendChild(element);
    return wrapper;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(),
          attribute = pair.last(),
          value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property, maximumLength) {
    element = $(element);
    maximumLength = maximumLength || -1;
    var elements = [];

    while (element = element[property]) {
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
      if (elements.length == maximumLength)
        break;
    }

    return elements;
  },

  ancestors: function(element) {
    return Element.recursivelyCollect(element, 'parentNode');
  },

  descendants: function(element) {
    return Element.select(element, "*");
  },

  firstDescendant: function(element) {
    element = $(element).firstChild;
    while (element && element.nodeType != 1) element = element.nextSibling;
    return $(element);
  },

  immediateDescendants: function(element) {
    var results = [], child = $(element).firstChild;
    while (child) {
      if (child.nodeType === 1) {
        results.push(Element.extend(child));
      }
      child = child.nextSibling;
    }
    return results;
  },

  previousSiblings: function(element, maximumLength) {
    return Element.recursivelyCollect(element, 'previousSibling');
  },

  nextSiblings: function(element) {
    return Element.recursivelyCollect(element, 'nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return Element.previousSiblings(element).reverse()
      .concat(Element.nextSiblings(element));
  },

  match: function(element, selector) {
    element = $(element);
    if (Object.isString(selector))
      return Prototype.Selector.match(element, selector);
    return selector.match(element);
  },

  up: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return $(element.parentNode);
    var ancestors = Element.ancestors(element);
    return Object.isNumber(expression) ? ancestors[expression] :
      Prototype.Selector.find(ancestors, expression, index);
  },

  down: function(element, expression, index) {
    element = $(element);
    if (arguments.length == 1) return Element.firstDescendant(element);
    return Object.isNumber(expression) ? Element.descendants(element)[expression] :
      Element.select(element, expression)[index || 0];
  },

  previous: function(element, expression, index) {
    element = $(element);
    if (Object.isNumber(expression)) index = expression, expression = false;
    if (!Object.isNumber(index)) index = 0;

    if (expression) {
      return Prototype.Selector.find(element.previousSiblings(), expression, index);
    } else {
      return element.recursivelyCollect("previousSibling", index + 1)[index];
    }
  },

  next: function(element, expression, index) {
    element = $(element);
    if (Object.isNumber(expression)) index = expression, expression = false;
    if (!Object.isNumber(index)) index = 0;

    if (expression) {
      return Prototype.Selector.find(element.nextSiblings(), expression, index);
    } else {
      var maximumLength = Object.isNumber(index) ? index + 1 : 1;
      return element.recursivelyCollect("nextSibling", index + 1)[index];
    }
  },


  select: function(element) {
    element = $(element);
    var expressions = Array.prototype.slice.call(arguments, 1).join(', ');
    return Prototype.Selector.select(expressions, element);
  },

  adjacent: function(element) {
    element = $(element);
    var expressions = Array.prototype.slice.call(arguments, 1).join(', ');
    return Prototype.Selector.select(expressions, element.parentNode).without(element);
  },

  identify: function(element) {
    element = $(element);
    var id = Element.readAttribute(element, 'id');
    if (id) return id;
    do { id = 'anonymous_element_' + Element.idCounter++ } while ($(id));
    Element.writeAttribute(element, 'id', id);
    return id;
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (Prototype.Browser.IE) {
      var t = Element._attributeTranslations.read;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name]) name = t.names[name];
      if (name.include(':')) {
        return (!element.attributes || !element.attributes[name]) ? null :
         element.attributes[name].value;
      }
    }
    return element.getAttribute(name);
  },

  writeAttribute: function(element, name, value) {
    element = $(element);
    var attributes = { }, t = Element._attributeTranslations.write;

    if (typeof name == 'object') attributes = name;
    else attributes[name] = Object.isUndefined(value) ? true : value;

    for (var attr in attributes) {
      name = t.names[attr] || attr;
      value = attributes[attr];
      if (t.values[attr]) name = t.values[attr](element, value);
      if (value === false || value === null)
        element.removeAttribute(name);
      else if (value === true)
        element.setAttribute(name, name);
      else element.setAttribute(name, value);
    }
    return element;
  },

  getHeight: function(element) {
    return Element.getDimensions(element).height;
  },

  getWidth: function(element) {
    return Element.getDimensions(element).width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className ||
      new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    if (!Element.hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    element.className = element.className.replace(
      new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').strip();
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    return Element[Element.hasClassName(element, className) ?
      'removeClassName' : 'addClassName'](element, className);
  },

  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.blank();
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);

    if (element.compareDocumentPosition)
      return (element.compareDocumentPosition(ancestor) & 8) === 8;

    if (ancestor.contains)
      return ancestor.contains(element) && ancestor !== element;

    while (element = element.parentNode)
      if (element == ancestor) return true;

    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = Element.cumulativeOffset(element);
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    style = style == 'float' ? 'cssFloat' : style.camelize();
    var value = element.style[style];
    if (!value || value == 'auto') {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  },

  getOpacity: function(element) {
    return $(element).getStyle('opacity');
  },

  setStyle: function(element, styles) {
    element = $(element);
    var elementStyle = element.style, match;
    if (Object.isString(styles)) {
      element.style.cssText += ';' + styles;
      return styles.include('opacity') ?
        element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
    }
    for (var property in styles)
      if (property == 'opacity') element.setOpacity(styles[property]);
      else
        elementStyle[(property == 'float' || property == 'cssFloat') ?
          (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :
            property] = styles[property];

    return element;
  },

  setOpacity: function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;
    return element;
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      if (Prototype.Browser.Opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = Element.getStyle(element, 'overflow') || 'auto';
    if (element._overflow !== 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  },

  clonePosition: function(element, source) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || { });

    source = $(source);
    var p = Element.viewportOffset(source), delta = [0, 0], parent = null;

    element = $(element);

    if (Element.getStyle(element, 'position') == 'absolute') {
      parent = Element.getOffsetParent(element);
      delta = Element.viewportOffset(parent);
    }

    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if (options.setWidth)  element.style.width = source.offsetWidth + 'px';
    if (options.setHeight) element.style.height = source.offsetHeight + 'px';
    return element;
  }
};

Object.extend(Element.Methods, {
  getElementsBySelector: Element.Methods.select,

  childElements: Element.Methods.immediateDescendants
});

Element._attributeTranslations = {
  write: {
    names: {
      className: 'class',
      htmlFor:   'for'
    },
    values: { }
  }
};

if (Prototype.Browser.Opera) {
  Element.Methods.getStyle = Element.Methods.getStyle.wrap(
    function(proceed, element, style) {
      switch (style) {
        case 'height': case 'width':
          if (!Element.visible(element)) return null;

          var dim = parseInt(proceed(element, style), 10);

          if (dim !== element['offset' + style.capitalize()])
            return dim + 'px';

          var properties;
          if (style === 'height') {
            properties = ['border-top-width', 'padding-top',
             'padding-bottom', 'border-bottom-width'];
          }
          else {
            properties = ['border-left-width', 'padding-left',
             'padding-right', 'border-right-width'];
          }
          return properties.inject(dim, function(memo, property) {
            var val = proceed(element, property);
            return val === null ? memo : memo - parseInt(val, 10);
          }) + 'px';
        default: return proceed(element, style);
      }
    }
  );

  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(
    function(proceed, element, attribute) {
      if (attribute === 'title') return element.title;
      return proceed(element, attribute);
    }
  );
}

else if (Prototype.Browser.IE) {
  Element.Methods.getStyle = function(element, style) {
    element = $(element);
    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
    var value = element.style[style];
    if (!value && element.currentStyle) value = element.currentStyle[style];

    if (style == 'opacity') {
      if (value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if (value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }

    if (value == 'auto') {
      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))
        return element['offset' + style.capitalize()] + 'px';
      return null;
    }
    return value;
  };

  Element.Methods.setOpacity = function(element, value) {
    function stripAlpha(filter){
      return filter.replace(/alpha\([^\)]*\)/gi,'');
    }
    element = $(element);
    var currentStyle = element.currentStyle;
    if ((currentStyle && !currentStyle.hasLayout) ||
      (!currentStyle && element.style.zoom == 'normal'))
        element.style.zoom = 1;

    var filter = element.getStyle('filter'), style = element.style;
    if (value == 1 || value === '') {
      (filter = stripAlpha(filter)) ?
        style.filter = filter : style.removeAttribute('filter');
      return element;
    } else if (value < 0.00001) value = 0;
    style.filter = stripAlpha(filter) +
      'alpha(opacity=' + (value * 100) + ')';
    return element;
  };

  Element._attributeTranslations = (function(){

    var classProp = 'className',
        forProp = 'for',
        el = document.createElement('div');

    el.setAttribute(classProp, 'x');

    if (el.className !== 'x') {
      el.setAttribute('class', 'x');
      if (el.className === 'x') {
        classProp = 'class';
      }
    }
    el = null;

    el = document.createElement('label');
    el.setAttribute(forProp, 'x');
    if (el.htmlFor !== 'x') {
      el.setAttribute('htmlFor', 'x');
      if (el.htmlFor === 'x') {
        forProp = 'htmlFor';
      }
    }
    el = null;

    return {
      read: {
        names: {
          'class':      classProp,
          'className':  classProp,
          'for':        forProp,
          'htmlFor':    forProp
        },
        values: {
          _getAttr: function(element, attribute) {
            return element.getAttribute(attribute);
          },
          _getAttr2: function(element, attribute) {
            return element.getAttribute(attribute, 2);
          },
          _getAttrNode: function(element, attribute) {
            var node = element.getAttributeNode(attribute);
            return node ? node.value : "";
          },
          _getEv: (function(){

            var el = document.createElement('div'), f;
            el.onclick = Prototype.emptyFunction;
            var value = el.getAttribute('onclick');

            if (String(value).indexOf('{') > -1) {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                attribute = attribute.toString();
                attribute = attribute.split('{')[1];
                attribute = attribute.split('}')[0];
                return attribute.strip();
              };
            }
            else if (value === '') {
              f = function(element, attribute) {
                attribute = element.getAttribute(attribute);
                if (!attribute) return null;
                return attribute.strip();
              };
            }
            el = null;
            return f;
          })(),
          _flag: function(element, attribute) {
            return $(element).hasAttribute(attribute) ? attribute : null;
          },
          style: function(element) {
            return element.style.cssText.toLowerCase();
          },
          title: function(element) {
            return element.title;
          }
        }
      }
    }
  })();

  Element._attributeTranslations.write = {
    names: Object.extend({
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing'
    }, Element._attributeTranslations.read.names),
    values: {
      checked: function(element, value) {
        element.checked = !!value;
      },

      style: function(element, value) {
        element.style.cssText = value ? value : '';
      }
    }
  };

  Element._attributeTranslations.has = {};

  $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +
      'encType maxLength readOnly longDesc frameBorder').each(function(attr) {
    Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;
    Element._attributeTranslations.has[attr.toLowerCase()] = attr;
  });

  (function(v) {
    Object.extend(v, {
      href:        v._getAttr2,
      src:         v._getAttr2,
      type:        v._getAttr,
      action:      v._getAttrNode,
      disabled:    v._flag,
      checked:     v._flag,
      readonly:    v._flag,
      multiple:    v._flag,
      onload:      v._getEv,
      onunload:    v._getEv,
      onclick:     v._getEv,
      ondblclick:  v._getEv,
      onmousedown: v._getEv,
      onmouseup:   v._getEv,
      onmouseover: v._getEv,
      onmousemove: v._getEv,
      onmouseout:  v._getEv,
      onfocus:     v._getEv,
      onblur:      v._getEv,
      onkeypress:  v._getEv,
      onkeydown:   v._getEv,
      onkeyup:     v._getEv,
      onsubmit:    v._getEv,
      onreset:     v._getEv,
      onselect:    v._getEv,
      onchange:    v._getEv
    });
  })(Element._attributeTranslations.read.values);

  if (Prototype.BrowserFeatures.ElementExtensions) {
    (function() {
      function _descendants(element) {
        var nodes = element.getElementsByTagName('*'), results = [];
        for (var i = 0, node; node = nodes[i]; i++)
          if (node.tagName !== "!") // Filter out comment nodes.
            results.push(node);
        return results;
      }

      Element.Methods.down = function(element, expression, index) {
        element = $(element);
        if (arguments.length == 1) return element.firstDescendant();
        return Object.isNumber(expression) ? _descendants(element)[expression] :
          Element.select(element, expression)[index || 0];
      }
    })();
  }

}

else if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1) ? 0.999999 :
      (value === '') ? '' : (value < 0.00001) ? 0 : value;
    return element;
  };
}

else if (Prototype.Browser.WebKit) {
  Element.Methods.setOpacity = function(element, value) {
    element = $(element);
    element.style.opacity = (value == 1 || value === '') ? '' :
      (value < 0.00001) ? 0 : value;

    if (value == 1)
      if (element.tagName.toUpperCase() == 'IMG' && element.width) {
        element.width++; element.width--;
      } else try {
        var n = document.createTextNode(' ');
        element.appendChild(n);
        element.removeChild(n);
      } catch (e) { }

    return element;
  };
}

if ('outerHTML' in document.documentElement) {
  Element.Methods.replace = function(element, content) {
    element = $(element);

    if (content && content.toElement) content = content.toElement();
    if (Object.isElement(content)) {
      element.parentNode.replaceChild(content, element);
      return element;
    }

    content = Object.toHTML(content);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();

    if (Element._insertionTranslations.tags[tagName]) {
      var nextSibling = element.next(),
          fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());
      parent.removeChild(element);
      if (nextSibling)
        fragments.each(function(node) { parent.insertBefore(node, nextSibling) });
      else
        fragments.each(function(node) { parent.appendChild(node) });
    }
    else element.outerHTML = content.stripScripts();

    content.evalScripts.bind(content).defer();
    return element;
  };
}

Element._returnOffset = function(l, t) {
  var result = [l, t];
  result.left = l;
  result.top = t;
  return result;
};

Element._getContentFromAnonymousElement = function(tagName, html, force) {
  var div = new Element('div'),
      t = Element._insertionTranslations.tags[tagName];

  var workaround = false;
  if (t) workaround = true;
  else if (force) {
    workaround = true;
    t = ['', '', 0];
  }

  if (workaround) {
    div.innerHTML = '&nbsp;' + t[0] + html + t[1];
    div.removeChild(div.firstChild);
    for (var i = t[2]; i--; ) {
      div = div.firstChild;
    }
  }
  else {
    div.innerHTML = html;
  }
  return $A(div.childNodes);
};

Element._insertionTranslations = {
  before: function(element, node) {
    element.parentNode.insertBefore(node, element);
  },
  top: function(element, node) {
    element.insertBefore(node, element.firstChild);
  },
  bottom: function(element, node) {
    element.appendChild(node);
  },
  after: function(element, node) {
    element.parentNode.insertBefore(node, element.nextSibling);
  },
  tags: {
    TABLE:  ['<table>',                '</table>',                   1],
    TBODY:  ['<table><tbody>',         '</tbody></table>',           2],
    TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],
    TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],
    SELECT: ['<select>',               '</select>',                  1]
  }
};

(function() {
  var tags = Element._insertionTranslations.tags;
  Object.extend(tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH:    tags.TD
  });
})();

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    attribute = Element._attributeTranslations.has[attribute] || attribute;
    var node = $(element).getAttributeNode(attribute);
    return !!(node && node.specified);
  }
};

Element.Methods.ByTag = { };

Object.extend(Element, Element.Methods);

(function(div) {

  if (!Prototype.BrowserFeatures.ElementExtensions && div['__proto__']) {
    window.HTMLElement = { };
    window.HTMLElement.prototype = div['__proto__'];
    Prototype.BrowserFeatures.ElementExtensions = true;
  }

  div = null;

})(document.createElement('div'));

Element.extend = (function() {

  function checkDeficiency(tagName) {
    if (typeof window.Element != 'undefined') {
      var proto = window.Element.prototype;
      if (proto) {
        var id = '_' + (Math.random()+'').slice(2),
            el = document.createElement(tagName);
        proto[id] = 'x';
        var isBuggy = (el[id] !== 'x');
        delete proto[id];
        el = null;
        return isBuggy;
      }
    }
    return false;
  }

  function extendElementWith(element, methods) {
    for (var property in methods) {
      var value = methods[property];
      if (Object.isFunction(value) && !(property in element))
        element[property] = value.methodize();
    }
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY = checkDeficiency('object');

  if (Prototype.BrowserFeatures.SpecificElementExtensions) {
    if (HTMLOBJECTELEMENT_PROTOTYPE_BUGGY) {
      return function(element) {
        if (element && typeof element._extendedByPrototype == 'undefined') {
          var t = element.tagName;
          if (t && (/^(?:object|applet|embed)$/i.test(t))) {
            extendElementWith(element, Element.Methods);
            extendElementWith(element, Element.Methods.Simulated);
            extendElementWith(element, Element.Methods.ByTag[t.toUpperCase()]);
          }
        }
        return element;
      }
    }
    return Prototype.K;
  }

  var Methods = { }, ByTag = Element.Methods.ByTag;

  var extend = Object.extend(function(element) {
    if (!element || typeof element._extendedByPrototype != 'undefined' ||
        element.nodeType != 1 || element == window) return element;

    var methods = Object.clone(Methods),
        tagName = element.tagName.toUpperCase();

    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);

    extendElementWith(element, methods);

    element._extendedByPrototype = Prototype.emptyFunction;
    return element;

  }, {
    refresh: function() {
      if (!Prototype.BrowserFeatures.ElementExtensions) {
        Object.extend(Methods, Element.Methods);
        Object.extend(Methods, Element.Methods.Simulated);
      }
    }
  });

  extend.refresh();
  return extend;
})();

if (document.documentElement.hasAttribute) {
  Element.hasAttribute = function(element, attribute) {
    return element.hasAttribute(attribute);
  };
}
else {
  Element.hasAttribute = Element.Methods.Simulated.hasAttribute;
}

Element.addMethods = function(methods) {
  var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;

  if (!methods) {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      "FORM":     Object.clone(Form.Methods),
      "INPUT":    Object.clone(Form.Element.Methods),
      "SELECT":   Object.clone(Form.Element.Methods),
      "TEXTAREA": Object.clone(Form.Element.Methods),
      "BUTTON":   Object.clone(Form.Element.Methods)
    });
  }

  if (arguments.length == 2) {
    var tagName = methods;
    methods = arguments[1];
  }

  if (!tagName) Object.extend(Element.Methods, methods || { });
  else {
    if (Object.isArray(tagName)) tagName.each(extend);
    else extend(tagName);
  }

  function extend(tagName) {
    tagName = tagName.toUpperCase();
    if (!Element.Methods.ByTag[tagName])
      Element.Methods.ByTag[tagName] = { };
    Object.extend(Element.Methods.ByTag[tagName], methods);
  }

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    for (var property in methods) {
      var value = methods[property];
      if (!Object.isFunction(value)) continue;
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = value.methodize();
    }
  }

  function findDOMClass(tagName) {
    var klass;
    var trans = {
      "OPTGROUP": "OptGroup", "TEXTAREA": "TextArea", "P": "Paragraph",
      "FIELDSET": "FieldSet", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Heading", "H2": "Heading", "H3": "Heading",
      "H4": "Heading", "H5": "Heading", "H6": "Heading", "Q": "Quote",
      "INS": "Mod", "DEL": "Mod", "A": "Anchor", "IMG": "Image", "CAPTION":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "TR":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "IFrame"
    };
    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName + 'Element';
    if (window[klass]) return window[klass];
    klass = 'HTML' + tagName.capitalize() + 'Element';
    if (window[klass]) return window[klass];

    var element = document.createElement(tagName),
        proto = element['__proto__'] || element.constructor.prototype;

    element = null;
    return proto;
  }

  var elementPrototype = window.HTMLElement ? HTMLElement.prototype :
   Element.prototype;

  if (F.ElementExtensions) {
    copy(Element.Methods, elementPrototype);
    copy(Element.Methods.Simulated, elementPrototype, true);
  }

  if (F.SpecificElementExtensions) {
    for (var tag in Element.Methods.ByTag) {
      var klass = findDOMClass(tag);
      if (Object.isUndefined(klass)) continue;
      copy(T[tag], klass.prototype);
    }
  }

  Object.extend(Element, Element.Methods);
  delete Element.ByTag;

  if (Element.extend.refresh) Element.extend.refresh();
  Element.cache = { };
};


document.viewport = {

  getDimensions: function() {
    return { width: this.getWidth(), height: this.getHeight() };
  },

  getScrollOffsets: function() {
    return Element._returnOffset(
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop);
  }
};

(function(viewport) {
  var B = Prototype.Browser, doc = document, element, property = {};

  function getRootElement() {
    if (B.WebKit && !doc.evaluate)
      return document;

    if (B.Opera && window.parseFloat(window.opera.version()) < 9.5)
      return document.body;

    return document.documentElement;
  }

  function define(D) {
    if (!element) element = getRootElement();

    property[D] = 'client' + D;

    viewport['get' + D] = function() { return element[property[D]] };
    return viewport['get' + D]();
  }

  viewport.getWidth  = define.curry('Width');

  viewport.getHeight = define.curry('Height');
})(document.viewport);


Element.Storage = {
  UID: 1
};

Element.addMethods({
  getStorage: function(element) {
    if (!(element = $(element))) return;

    var uid;
    if (element === window) {
      uid = 0;
    } else {
      if (typeof element._prototypeUID === "undefined")
        element._prototypeUID = Element.Storage.UID++;
      uid = element._prototypeUID;
    }

    if (!Element.Storage[uid])
      Element.Storage[uid] = $H();

    return Element.Storage[uid];
  },

  store: function(element, key, value) {
    if (!(element = $(element))) return;

    if (arguments.length === 2) {
      Element.getStorage(element).update(key);
    } else {
      Element.getStorage(element).set(key, value);
    }

    return element;
  },

  retrieve: function(element, key, defaultValue) {
    if (!(element = $(element))) return;
    var hash = Element.getStorage(element), value = hash.get(key);

    if (Object.isUndefined(value)) {
      hash.set(key, defaultValue);
      value = defaultValue;
    }

    return value;
  },

  clone: function(element, deep) {
    if (!(element = $(element))) return;
    var clone = element.cloneNode(deep);
    clone._prototypeUID = void 0;
    if (deep) {
      var descendants = Element.select(clone, '*'),
          i = descendants.length;
      while (i--) {
        descendants[i]._prototypeUID = void 0;
      }
    }
    return Element.extend(clone);
  },

  purge: function(element) {
    if (!(element = $(element))) return;
    var purgeElement = Element._purgeElement;

    purgeElement(element);

    var descendants = element.getElementsByTagName('*'),
     i = descendants.length;

    while (i--) purgeElement(descendants[i]);

    return null;
  }
});

(function() {

  function toDecimal(pctString) {
    var match = pctString.match(/^(\d+)%?$/i);
    if (!match) return null;
    return (Number(match[1]) / 100);
  }

  function getPixelValue(value, property, context) {
    var element = null;
    if (Object.isElement(value)) {
      element = value;
      value = element.getStyle(property);
    }

    if (value === null) {
      return null;
    }

    if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)) {
      return window.parseFloat(value);
    }

    var isPercentage = value.include('%'), isViewport = (context === document.viewport);

    if (/\d/.test(value) && element && element.runtimeStyle && !(isPercentage && isViewport)) {
      var style = element.style.left, rStyle = element.runtimeStyle.left;
      element.runtimeStyle.left = element.currentStyle.left;
      element.style.left = value || 0;
      value = element.style.pixelLeft;
      element.style.left = style;
      element.runtimeStyle.left = rStyle;

      return value;
    }

    if (element && isPercentage) {
      context = context || element.parentNode;
      var decimal = toDecimal(value);
      var whole = null;
      var position = element.getStyle('position');

      var isHorizontal = property.include('left') || property.include('right') ||
       property.include('width');

      var isVertical =  property.include('top') || property.include('bottom') ||
        property.include('height');

      if (context === document.viewport) {
        if (isHorizontal) {
          whole = document.viewport.getWidth();
        } else if (isVertical) {
          whole = document.viewport.getHeight();
        }
      } else {
        if (isHorizontal) {
          whole = $(context).measure('width');
        } else if (isVertical) {
          whole = $(context).measure('height');
        }
      }

      return (whole === null) ? 0 : whole * decimal;
    }

    return 0;
  }

  function toCSSPixels(number) {
    if (Object.isString(number) && number.endsWith('px')) {
      return number;
    }
    return number + 'px';
  }

  function isDisplayed(element) {
    var originalElement = element;
    while (element && element.parentNode) {
      var display = element.getStyle('display');
      if (display === 'none') {
        return false;
      }
      element = $(element.parentNode);
    }
    return true;
  }

  var hasLayout = Prototype.K;
  if ('currentStyle' in document.documentElement) {
    hasLayout = function(element) {
      if (!element.currentStyle.hasLayout) {
        element.style.zoom = 1;
      }
      return element;
    };
  }

  function cssNameFor(key) {
    if (key.include('border')) key = key + '-width';
    return key.camelize();
  }

  Element.Layout = Class.create(Hash, {
    initialize: function($super, element, preCompute) {
      $super();
      this.element = $(element);

      Element.Layout.PROPERTIES.each( function(property) {
        this._set(property, null);
      }, this);

      if (preCompute) {
        this._preComputing = true;
        this._begin();
        Element.Layout.PROPERTIES.each( this._compute, this );
        this._end();
        this._preComputing = false;
      }
    },

    _set: function(property, value) {
      return Hash.prototype.set.call(this, property, value);
    },

    set: function(property, value) {
      throw "Properties of Element.Layout are read-only.";
    },

    get: function($super, property) {
      var value = $super(property);
      return value === null ? this._compute(property) : value;
    },

    _begin: function() {
      if (this._prepared) return;

      var element = this.element;
      if (isDisplayed(element)) {
        this._prepared = true;
        return;
      }

      var originalStyles = {
        position:   element.style.position   || '',
        width:      element.style.width      || '',
        visibility: element.style.visibility || '',
        display:    element.style.display    || ''
      };

      element.store('prototype_original_styles', originalStyles);

      var position = element.getStyle('position'),
       width = element.getStyle('width');

      if (width === "0px" || width === null) {
        element.style.display = 'block';
        width = element.getStyle('width');
      }

      var context = (position === 'fixed') ? document.viewport :
       element.parentNode;

      element.setStyle({
        position:   'absolute',
        visibility: 'hidden',
        display:    'block'
      });

      var positionedWidth = element.getStyle('width');

      var newWidth;
      if (width && (positionedWidth === width)) {
        newWidth = getPixelValue(element, 'width', context);
      } else if (position === 'absolute' || position === 'fixed') {
        newWidth = getPixelValue(element, 'width', context);
      } else {
        var parent = element.parentNode, pLayout = $(parent).getLayout();

        newWidth = pLayout.get('width') -
         this.get('margin-left') -
         this.get('border-left') -
         this.get('padding-left') -
         this.get('padding-right') -
         this.get('border-right') -
         this.get('margin-right');
      }

      element.setStyle({ width: newWidth + 'px' });

      this._prepared = true;
    },

    _end: function() {
      var element = this.element;
      var originalStyles = element.retrieve('prototype_original_styles');
      element.store('prototype_original_styles', null);
      element.setStyle(originalStyles);
      this._prepared = false;
    },

    _compute: function(property) {
      var COMPUTATIONS = Element.Layout.COMPUTATIONS;
      if (!(property in COMPUTATIONS)) {
        throw "Property not found.";
      }

      return this._set(property, COMPUTATIONS[property].call(this, this.element));
    },

    toObject: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var obj = {};
      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        var value = this.get(key);
        if (value != null) obj[key] = value;
      }, this);
      return obj;
    },

    toHash: function() {
      var obj = this.toObject.apply(this, arguments);
      return new Hash(obj);
    },

    toCSS: function() {
      var args = $A(arguments);
      var keys = (args.length === 0) ? Element.Layout.PROPERTIES :
       args.join(' ').split(' ');
      var css = {};

      keys.each( function(key) {
        if (!Element.Layout.PROPERTIES.include(key)) return;
        if (Element.Layout.COMPOSITE_PROPERTIES.include(key)) return;

        var value = this.get(key);
        if (value != null) css[cssNameFor(key)] = value + 'px';
      }, this);
      return css;
    },

    inspect: function() {
      return "#<Element.Layout>";
    }
  });

  Object.extend(Element.Layout, {
    PROPERTIES: $w('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'),

    COMPOSITE_PROPERTIES: $w('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),

    COMPUTATIONS: {
      'height': function(element) {
        if (!this._preComputing) this._begin();

        var bHeight = this.get('border-box-height');
        if (bHeight <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bTop = this.get('border-top'),
         bBottom = this.get('border-bottom');

        var pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        if (!this._preComputing) this._end();

        return bHeight - bTop - bBottom - pTop - pBottom;
      },

      'width': function(element) {
        if (!this._preComputing) this._begin();

        var bWidth = this.get('border-box-width');
        if (bWidth <= 0) {
          if (!this._preComputing) this._end();
          return 0;
        }

        var bLeft = this.get('border-left'),
         bRight = this.get('border-right');

        var pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        if (!this._preComputing) this._end();

        return bWidth - bLeft - bRight - pLeft - pRight;
      },

      'padding-box-height': function(element) {
        var height = this.get('height'),
         pTop = this.get('padding-top'),
         pBottom = this.get('padding-bottom');

        return height + pTop + pBottom;
      },

      'padding-box-width': function(element) {
        var width = this.get('width'),
         pLeft = this.get('padding-left'),
         pRight = this.get('padding-right');

        return width + pLeft + pRight;
      },

      'border-box-height': function(element) {
        if (!this._preComputing) this._begin();
        var height = element.offsetHeight;
        if (!this._preComputing) this._end();
        return height;
      },

      'border-box-width': function(element) {
        if (!this._preComputing) this._begin();
        var width = element.offsetWidth;
        if (!this._preComputing) this._end();
        return width;
      },

      'margin-box-height': function(element) {
        var bHeight = this.get('border-box-height'),
         mTop = this.get('margin-top'),
         mBottom = this.get('margin-bottom');

        if (bHeight <= 0) return 0;

        return bHeight + mTop + mBottom;
      },

      'margin-box-width': function(element) {
        var bWidth = this.get('border-box-width'),
         mLeft = this.get('margin-left'),
         mRight = this.get('margin-right');

        if (bWidth <= 0) return 0;

        return bWidth + mLeft + mRight;
      },

      'top': function(element) {
        var offset = element.positionedOffset();
        return offset.top;
      },

      'bottom': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pHeight = parent.measure('height');

        var mHeight = this.get('border-box-height');

        return pHeight - mHeight - offset.top;
      },

      'left': function(element) {
        var offset = element.positionedOffset();
        return offset.left;
      },

      'right': function(element) {
        var offset = element.positionedOffset(),
         parent = element.getOffsetParent(),
         pWidth = parent.measure('width');

        var mWidth = this.get('border-box-width');

        return pWidth - mWidth - offset.left;
      },

      'padding-top': function(element) {
        return getPixelValue(element, 'paddingTop');
      },

      'padding-bottom': function(element) {
        return getPixelValue(element, 'paddingBottom');
      },

      'padding-left': function(element) {
        return getPixelValue(element, 'paddingLeft');
      },

      'padding-right': function(element) {
        return getPixelValue(element, 'paddingRight');
      },

      'border-top': function(element) {
        return getPixelValue(element, 'borderTopWidth');
      },

      'border-bottom': function(element) {
        return getPixelValue(element, 'borderBottomWidth');
      },

      'border-left': function(element) {
        return getPixelValue(element, 'borderLeftWidth');
      },

      'border-right': function(element) {
        return getPixelValue(element, 'borderRightWidth');
      },

      'margin-top': function(element) {
        return getPixelValue(element, 'marginTop');
      },

      'margin-bottom': function(element) {
        return getPixelValue(element, 'marginBottom');
      },

      'margin-left': function(element) {
        return getPixelValue(element, 'marginLeft');
      },

      'margin-right': function(element) {
        return getPixelValue(element, 'marginRight');
      }
    }
  });

  if ('getBoundingClientRect' in document.documentElement) {
    Object.extend(Element.Layout.COMPUTATIONS, {
      'right': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.right - rect.right).round();
      },

      'bottom': function(element) {
        var parent = hasLayout(element.getOffsetParent());
        var rect = element.getBoundingClientRect(),
         pRect = parent.getBoundingClientRect();

        return (pRect.bottom - rect.bottom).round();
      }
    });
  }

  Element.Offset = Class.create({
    initialize: function(left, top) {
      this.left = left.round();
      this.top  = top.round();

      this[0] = this.left;
      this[1] = this.top;
    },

    relativeTo: function(offset) {
      return new Element.Offset(
        this.left - offset.left,
        this.top  - offset.top
      );
    },

    inspect: function() {
      return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this);
    },

    toString: function() {
      return "[#{left}, #{top}]".interpolate(this);
    },

    toArray: function() {
      return [this.left, this.top];
    }
  });

  function getLayout(element, preCompute) {
    return new Element.Layout(element, preCompute);
  }

  function measure(element, property) {
    return $(element).getLayout().get(property);
  }

  function getDimensions(element) {
    element = $(element);
    var display = Element.getStyle(element, 'display');

    if (display && display !== 'none') {
      return { width: element.offsetWidth, height: element.offsetHeight };
    }

    var style = element.style;
    var originalStyles = {
      visibility: style.visibility,
      position:   style.position,
      display:    style.display
    };

    var newStyles = {
      visibility: 'hidden',
      display:    'block'
    };

    if (originalStyles.position !== 'fixed')
      newStyles.position = 'absolute';

    Element.setStyle(element, newStyles);

    var dimensions = {
      width:  element.offsetWidth,
      height: element.offsetHeight
    };

    Element.setStyle(element, originalStyles);

    return dimensions;
  }

  function getOffsetParent(element) {
    element = $(element);

    if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
      return $(document.body);

    var isInline = (Element.getStyle(element, 'display') === 'inline');
    if (!isInline && element.offsetParent) return $(element.offsetParent);

    while ((element = element.parentNode) && element !== document.body) {
      if (Element.getStyle(element, 'position') !== 'static') {
        return isHtml(element) ? $(document.body) : $(element);
      }
    }

    return $(document.body);
  }


  function cumulativeOffset(element) {
    element = $(element);
    var valueT = 0, valueL = 0;
    if (element.parentNode) {
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);
    }
    return new Element.Offset(valueL, valueT);
  }

  function positionedOffset(element) {
    element = $(element);

    var layout = element.getLayout();

    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (isBody(element)) break;
        var p = Element.getStyle(element, 'position');
        if (p !== 'static') break;
      }
    } while (element);

    valueL -= layout.get('margin-top');
    valueT -= layout.get('margin-left');

    return new Element.Offset(valueL, valueT);
  }

  function cumulativeScrollOffset(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return new Element.Offset(valueL, valueT);
  }

  function viewportOffset(forElement) {
    element = $(element);
    var valueT = 0, valueL = 0, docBody = document.body;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == docBody &&
        Element.getStyle(element, 'position') == 'absolute') break;
    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (element != docBody) {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);
    return new Element.Offset(valueL, valueT);
  }

  function absolutize(element) {
    element = $(element);

    if (Element.getStyle(element, 'position') === 'absolute') {
      return element;
    }

    var offsetParent = getOffsetParent(element);
    var eOffset = element.viewportOffset(),
     pOffset = offsetParent.viewportOffset();

    var offset = eOffset.relativeTo(pOffset);
    var layout = element.getLayout();

    element.store('prototype_absolutize_original_styles', {
      left:   element.getStyle('left'),
      top:    element.getStyle('top'),
      width:  element.getStyle('width'),
      height: element.getStyle('height')
    });

    element.setStyle({
      position: 'absolute',
      top:    offset.top + 'px',
      left:   offset.left + 'px',
      width:  layout.get('width') + 'px',
      height: layout.get('height') + 'px'
    });

    return element;
  }

  function relativize(element) {
    element = $(element);
    if (Element.getStyle(element, 'position') === 'relative') {
      return element;
    }

    var originalStyles =
     element.retrieve('prototype_absolutize_original_styles');

    if (originalStyles) element.setStyle(originalStyles);
    return element;
  }

  if (Prototype.Browser.IE) {
    getOffsetParent = getOffsetParent.wrap(
      function(proceed, element) {
        element = $(element);

        if (isDocument(element) || isDetached(element) || isBody(element) || isHtml(element))
          return $(document.body);

        var position = element.getStyle('position');
        if (position !== 'static') return proceed(element);

        element.setStyle({ position: 'relative' });
        var value = proceed(element);
        element.setStyle({ position: position });
        return value;
      }
    );

    positionedOffset = positionedOffset.wrap(function(proceed, element) {
      element = $(element);
      if (!element.parentNode) return new Element.Offset(0, 0);
      var position = element.getStyle('position');
      if (position !== 'static') return proceed(element);

      var offsetParent = element.getOffsetParent();
      if (offsetParent && offsetParent.getStyle('position') === 'fixed')
        hasLayout(offsetParent);

      element.setStyle({ position: 'relative' });
      var value = proceed(element);
      element.setStyle({ position: position });
      return value;
    });
  } else if (Prototype.Browser.Webkit) {
    cumulativeOffset = function(element) {
      element = $(element);
      var valueT = 0, valueL = 0;
      do {
        valueT += element.offsetTop  || 0;
        valueL += element.offsetLeft || 0;
        if (element.offsetParent == document.body)
          if (Element.getStyle(element, 'position') == 'absolute') break;

        element = element.offsetParent;
      } while (element);

      return new Element.Offset(valueL, valueT);
    };
  }


  Element.addMethods({
    getLayout:              getLayout,
    measure:                measure,
    getDimensions:          getDimensions,
    getOffsetParent:        getOffsetParent,
    cumulativeOffset:       cumulativeOffset,
    positionedOffset:       positionedOffset,
    cumulativeScrollOffset: cumulativeScrollOffset,
    viewportOffset:         viewportOffset,
    absolutize:             absolutize,
    relativize:             relativize
  });

  function isBody(element) {
    return element.nodeName.toUpperCase() === 'BODY';
  }

  function isHtml(element) {
    return element.nodeName.toUpperCase() === 'HTML';
  }

  function isDocument(element) {
    return element.nodeType === Node.DOCUMENT_NODE;
  }

  function isDetached(element) {
    return element !== document.body &&
     !Element.descendantOf(element, document.body);
  }

  if ('getBoundingClientRect' in document.documentElement) {
    Element.addMethods({
      viewportOffset: function(element) {
        element = $(element);
        if (isDetached(element)) return new Element.Offset(0, 0);

        var rect = element.getBoundingClientRect(),
         docEl = document.documentElement;
        return new Element.Offset(rect.left - docEl.clientLeft,
         rect.top - docEl.clientTop);
      }
    });
  }
})();
window.$$ = function() {
  var expression = $A(arguments).join(', ');
  return Prototype.Selector.select(expression, document);
};

Prototype.Selector = (function() {

  function select() {
    throw new Error('Method "Prototype.Selector.select" must be defined.');
  }

  function match() {
    throw new Error('Method "Prototype.Selector.match" must be defined.');
  }

  function find(elements, expression, index) {
    index = index || 0;
    var match = Prototype.Selector.match, length = elements.length, matchIndex = 0, i;

    for (i = 0; i < length; i++) {
      if (match(elements[i], expression) && index == matchIndex++) {
        return Element.extend(elements[i]);
      }
    }
  }

  function extendElements(elements) {
    for (var i = 0, length = elements.length; i < length; i++) {
      Element.extend(elements[i]);
    }
    return elements;
  }


  var K = Prototype.K;

  return {
    select: select,
    match: match,
    find: find,
    extendElements: (Element.extend === K) ? K : extendElements,
    extendElement: Element.extend
  };
})();
Prototype._original_property = window.Sizzle;
/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

[0, 0].sort(function(){
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	var origContext = context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true, contextXML = isXML(context),
		soFar = selector;

	while ( (chunker.exec(""), m = chunker.exec(soFar)) !== null ) {
		soFar = m[3];

		parts.push( m[1] );

		if ( m[2] ) {
			extra = m[3];
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			var ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			var ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				var cur = parts.pop(), pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort(sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					results.splice(i--, 1);
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;

		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice(1,1);

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	leftMatch: {},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( !/\W/.test(part) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context, isXML){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");

			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}

			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while ( (node = node.previousSibling) )  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while ( (node = node.nextSibling) )  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
						return true;
					}

					var doneName = match[0],
						parent = elem.parentNode;

					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						}
						parent.sizcache = doneName;
					}

					var diff = elem.nodeIndex - last;
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value != check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}

	return array;
};

try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 );

} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return 0;
		}

		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	sortOrder = function( a, b ) {
		if ( !a.sourceIndex || !b.sourceIndex ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return 0;
		}

		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	sortOrder = function( a, b ) {
		if ( !a.ownerDocument || !b.ownerDocument ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return 0;
		}

		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.setStart(a, 0);
		aRange.setEnd(a, 0);
		bRange.setStart(b, 0);
		bRange.setEnd(b, 0);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

(function(){
	var form = document.createElement("div"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<a name='" + id + "'/>";

	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	if ( !!document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
	root = form = null; // release memory in IE
})();

(function(){

	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function(match, context){
			var results = context.getElementsByTagName(match[1]);

			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	div.innerHTML = "<a href='#'></a>";
	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {
		Expr.attrHandle.href = function(elem){
			return elem.getAttribute("href", 2);
		};
	}

	div = null; // release memory in IE
})();

if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle, div = document.createElement("div");
	div.innerHTML = "<p class='TEST'></p>";

	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
		return;
	}

	Sizzle = function(query, context, extra, seed){
		context = context || document;

		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
			try {
				return makeArray( context.querySelectorAll(query), extra );
			} catch(e){}
		}

		return oldSizzle(query, context, extra, seed);
	};

	for ( var prop in oldSizzle ) {
		Sizzle[ prop ] = oldSizzle[ prop ];
	}

	div = null; // release memory in IE
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	if ( div.getElementsByClassName("e").length === 0 )
		return;

	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null; // release memory in IE
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && elem.ownerDocument.documentElement.nodeName !== "HTML";
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};


window.Sizzle = Sizzle;

})();

;(function(engine) {
  var extendElements = Prototype.Selector.extendElements;

  function select(selector, scope) {
    return extendElements(engine(selector, scope || document));
  }

  function match(element, selector) {
    return engine.matches(selector, [element]).length == 1;
  }

  Prototype.Selector.engine = engine;
  Prototype.Selector.select = select;
  Prototype.Selector.match = match;
})(Sizzle);

window.Sizzle = Prototype._original_property;
delete Prototype._original_property;

var Form = {
  reset: function(form) {
    form = $(form);
    form.reset();
    return form;
  },

  serializeElements: function(elements, options) {
    if (typeof options != 'object') options = { hash: !!options };
    else if (Object.isUndefined(options.hash)) options.hash = true;
    var key, value, submitted = false, submit = options.submit, accumulator, initial;

    if (options.hash) {
      initial = {};
      accumulator = function(result, key, value) {
        if (key in result) {
          if (!Object.isArray(result[key])) result[key] = [result[key]];
          result[key].push(value);
        } else result[key] = value;
        return result;
      };
    } else {
      initial = '';
      accumulator = function(result, key, value) {
        return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
    }

    return elements.inject(initial, function(result, element) {
      if (!element.disabled && element.name) {
        key = element.name; value = $(element).getValue();
        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&
            submit !== false && (!submit || key == submit) && (submitted = true)))) {
          result = accumulator(result, key, value);
        }
      }
      return result;
    });
  }
};

Form.Methods = {
  serialize: function(form, options) {
    return Form.serializeElements(Form.getElements(form), options);
  },

  getElements: function(form) {
    var elements = $(form).getElementsByTagName('*'),
        element,
        arr = [ ],
        serializers = Form.Element.Serializers;
    for (var i = 0; element = elements[i]; i++) {
      arr.push(element);
    }
    return arr.inject([], function(elements, child) {
      if (serializers[child.tagName.toLowerCase()])
        elements.push(Element.extend(child));
      return elements;
    })
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('disable');
    return form;
  },

  enable: function(form) {
    form = $(form);
    Form.getElements(form).invoke('enable');
    return form;
  },

  findFirstElement: function(form) {
    var elements = $(form).getElements().findAll(function(element) {
      return 'hidden' != element.type && !element.disabled;
    });
    var firstByIndex = elements.findAll(function(element) {
      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;
    }).sortBy(function(element) { return element.tabIndex }).first();

    return firstByIndex ? firstByIndex : elements.find(function(element) {
      return /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    var element = form.findFirstElement();
    if (element) element.activate();
    return form;
  },

  request: function(form, options) {
    form = $(form), options = Object.clone(options || { });

    var params = options.parameters, action = form.readAttribute('action') || '';
    if (action.blank()) action = window.location.href;
    options.parameters = form.serialize(true);

    if (params) {
      if (Object.isString(params)) params = params.toQueryParams();
      Object.extend(options.parameters, params);
    }

    if (form.hasAttribute('method') && !options.method)
      options.method = form.method;

    return new Ajax.Request(action, options);
  }
};

/*--------------------------------------------------------------------------*/


Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
};

Form.Element.Methods = {

  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = { };
        pair[element.name] = value;
        return Object.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  setValue: function(element, value) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    Form.Element.Serializers[method](element, value);
    return element;
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    try {
      element.focus();
      if (element.select && (element.tagName.toLowerCase() != 'input' ||
          !(/^(?:button|reset|submit)$/i.test(element.type))))
        element.select();
    } catch (e) { }
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.disabled = false;
    return element;
  }
};

/*--------------------------------------------------------------------------*/

var Field = Form.Element;

var $F = Form.Element.Methods.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = (function() {
  function input(element, value) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return inputSelector(element, value);
      default:
        return valueSelector(element, value);
    }
  }

  function inputSelector(element, value) {
    if (Object.isUndefined(value))
      return element.checked ? element.value : null;
    else element.checked = !!value;
  }

  function valueSelector(element, value) {
    if (Object.isUndefined(value)) return element.value;
    else element.value = value;
  }

  function select(element, value) {
    if (Object.isUndefined(value))
      return (element.type === 'select-one' ? selectOne : selectMany)(element);

    var opt, currentValue, single = !Object.isArray(value);
    for (var i = 0, length = element.length; i < length; i++) {
      opt = element.options[i];
      currentValue = this.optionValue(opt);
      if (single) {
        if (currentValue == value) {
          opt.selected = true;
          return;
        }
      }
      else opt.selected = value.include(currentValue);
    }
  }

  function selectOne(element) {
    var index = element.selectedIndex;
    return index >= 0 ? optionValue(element.options[index]) : null;
  }

  function selectMany(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(optionValue(opt));
    }
    return values;
  }

  function optionValue(opt) {
    return Element.hasAttribute(opt, 'value') ? opt.value : opt.text;
  }

  return {
    input:         input,
    inputSelector: inputSelector,
    textarea:      valueSelector,
    select:        select,
    selectOne:     selectOne,
    selectMany:    selectMany,
    optionValue:   optionValue,
    button:        valueSelector
  };
})();

/*--------------------------------------------------------------------------*/


Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, element, frequency, callback) {
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  },

  execute: function() {
    var value = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(value) ?
        this.lastValue != value : String(this.lastValue) != String(value)) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = Class.create({
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this);
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
});

Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
(function() {

  var Event = {
    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45,

    cache: {}
  };

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'onmouseenter' in docEl
    && 'onmouseleave' in docEl;



  var isIELegacyEvent = function(event) { return false; };

  if (window.attachEvent) {
    if (window.addEventListener) {
      isIELegacyEvent = function(event) {
        return !(event instanceof window.Event);
      };
    } else {
      isIELegacyEvent = function(event) { return true; };
    }
  }

  var _isButton;

  function _isButtonForDOMEvents(event, code) {
    return event.which ? (event.which === code + 1) : (event.button === code);
  }

  var legacyButtonMap = { 0: 1, 1: 4, 2: 2 };
  function _isButtonForLegacyEvents(event, code) {
    return event.button === legacyButtonMap[code];
  }

  function _isButtonForWebKit(event, code) {
    switch (code) {
      case 0: return event.which == 1 && !event.metaKey;
      case 1: return event.which == 2 || (event.which == 1 && event.metaKey);
      case 2: return event.which == 3;
      default: return false;
    }
  }

  if (window.attachEvent) {
    if (!window.addEventListener) {
      _isButton = _isButtonForLegacyEvents;
    } else {
      _isButton = function(event, code) {
        return isIELegacyEvent(event) ? _isButtonForLegacyEvents(event, code) :
         _isButtonForDOMEvents(event, code);
      }
    }
  } else if (Prototype.Browser.WebKit) {
    _isButton = _isButtonForWebKit;
  } else {
    _isButton = _isButtonForDOMEvents;
  }

  function isLeftClick(event)   { return _isButton(event, 0) }

  function isMiddleClick(event) { return _isButton(event, 1) }

  function isRightClick(event)  { return _isButton(event, 2) }

  function element(event) {
    event = Event.extend(event);

    var node = event.target, type = event.type,
     currentTarget = event.currentTarget;

    if (currentTarget && currentTarget.tagName) {
      if (type === 'load' || type === 'error' ||
        (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'
          && currentTarget.type === 'radio'))
            node = currentTarget;
    }

    if (node.nodeType == Node.TEXT_NODE)
      node = node.parentNode;

    return Element.extend(node);
  }

  function findElement(event, expression) {
    var element = Event.element(event);

    if (!expression) return element;
    while (element) {
      if (Object.isElement(element) && Prototype.Selector.match(element, expression)) {
        return Element.extend(element);
      }
      element = element.parentNode;
    }
  }

  function pointer(event) {
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


  function stop(event) {
    Event.extend(event);
    event.preventDefault();
    event.stopPropagation();

    event.stopped = true;
  }


  Event.Methods = {
    isLeftClick:   isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick:  isRightClick,

    element:     element,
    findElement: findElement,

    pointer:  pointer,
    pointerX: pointerX,
    pointerY: pointerY,

    stop: stop
  };

  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {
    m[name] = Event.Methods[name].methodize();
    return m;
  });

  if (window.attachEvent) {
    function _relatedTarget(event) {
      var element;
      switch (event.type) {
        case 'mouseover':
        case 'mouseenter':
          element = event.fromElement;
          break;
        case 'mouseout':
        case 'mouseleave':
          element = event.toElement;
          break;
        default:
          return null;
      }
      return Element.extend(element);
    }

    var additionalMethods = {
      stopPropagation: function() { this.cancelBubble = true },
      preventDefault:  function() { this.returnValue = false },
      inspect: function() { return '[object Event]' }
    };

    Event.extend = function(event, element) {
      if (!event) return false;

      if (!isIELegacyEvent(event)) return event;

      if (event._extendedByPrototype) return event;
      event._extendedByPrototype = Prototype.emptyFunction;

      var pointer = Event.pointer(event);

      Object.extend(event, {
        target: event.srcElement || element,
        relatedTarget: _relatedTarget(event),
        pageX:  pointer.x,
        pageY:  pointer.y
      });

      Object.extend(event, methods);
      Object.extend(event, additionalMethods);

      return event;
    };
  } else {
    Event.extend = Prototype.K;
  }

  if (window.addEventListener) {
    Event.prototype = window.Event.prototype || document.createEvent('HTMLEvents').__proto__;
    Object.extend(Event.prototype, methods);
  }

  function _createResponder(element, eventName, handler) {
    var registry = Element.retrieve(element, 'prototype_event_registry');

    if (Object.isUndefined(registry)) {
      CACHE.push(element);
      registry = Element.retrieve(element, 'prototype_event_registry', $H());
    }

    var respondersForEvent = registry.get(eventName);
    if (Object.isUndefined(respondersForEvent)) {
      respondersForEvent = [];
      registry.set(eventName, respondersForEvent);
    }

    if (respondersForEvent.pluck('handler').include(handler)) return false;

    var responder;
    if (eventName.include(":")) {
      responder = function(event) {
        if (Object.isUndefined(event.eventName))
          return false;

        if (event.eventName !== eventName)
          return false;

        Event.extend(event, element);
        handler.call(element, event);
      };
    } else {
      if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
       (eventName === "mouseenter" || eventName === "mouseleave")) {
        if (eventName === "mouseenter" || eventName === "mouseleave") {
          responder = function(event) {
            Event.extend(event, element);

            var parent = event.relatedTarget;
            while (parent && parent !== element) {
              try { parent = parent.parentNode; }
              catch(e) { parent = element; }
            }

            if (parent === element) return;

            handler.call(element, event);
          };
        }
      } else {
        responder = function(event) {
          Event.extend(event, element);
          handler.call(element, event);
        };
      }
    }

    responder.handler = handler;
    respondersForEvent.push(responder);
    return responder;
  }

  function _destroyCache() {
    for (var i = 0, length = CACHE.length; i < length; i++) {
      Event.stopObserving(CACHE[i]);
      CACHE[i] = null;
    }
  }

  var CACHE = [];

  if (Prototype.Browser.IE)
    window.attachEvent('onunload', _destroyCache);

  if (Prototype.Browser.WebKit)
    window.addEventListener('unload', Prototype.emptyFunction, false);


  var _getDOMEventName = Prototype.K,
      translations = { mouseenter: "mouseover", mouseleave: "mouseout" };

  if (!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED) {
    _getDOMEventName = function(eventName) {
      return (translations[eventName] || eventName);
    };
  }

  function observe(element, eventName, handler) {
    element = $(element);

    var responder = _createResponder(element, eventName, handler);

    if (!responder) return element;

    if (eventName.include(':')) {
      if (element.addEventListener)
        element.addEventListener("dataavailable", responder, false);
      else {
        element.attachEvent("ondataavailable", responder);
        element.attachEvent("onlosecapture", responder);
      }
    } else {
      var actualEventName = _getDOMEventName(eventName);

      if (element.addEventListener)
        element.addEventListener(actualEventName, responder, false);
      else
        element.attachEvent("on" + actualEventName, responder);
    }

    return element;
  }

  function stopObserving(element, eventName, handler) {
    element = $(element);

    var registry = Element.retrieve(element, 'prototype_event_registry');
    if (!registry) return element;

    if (!eventName) {
      registry.each( function(pair) {
        var eventName = pair.key;
        stopObserving(element, eventName);
      });
      return element;
    }

    var responders = registry.get(eventName);
    if (!responders) return element;

    if (!handler) {
      responders.each(function(r) {
        stopObserving(element, eventName, r.handler);
      });
      return element;
    }

    var i = responders.length, responder;
    while (i--) {
      if (responders[i].handler === handler) {
        responder = responders[i];
        break;
      }
    }
    if (!responder) return element;

    if (eventName.include(':')) {
      if (element.removeEventListener)
        element.removeEventListener("dataavailable", responder, false);
      else {
        element.detachEvent("ondataavailable", responder);
        element.detachEvent("onlosecapture", responder);
      }
    } else {
      var actualEventName = _getDOMEventName(eventName);
      if (element.removeEventListener)
        element.removeEventListener(actualEventName, responder, false);
      else
        element.detachEvent('on' + actualEventName, responder);
    }

    registry.set(eventName, responders.without(responder));

    return element;
  }

  function fire(element, eventName, memo, bubble) {
    element = $(element);

    if (Object.isUndefined(bubble))
      bubble = true;

    if (element == document && document.createEvent && !element.dispatchEvent)
      element = document.documentElement;

    var event;
    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('dataavailable', bubble, true);
    } else {
      event = document.createEventObject();
      event.eventType = bubble ? 'ondataavailable' : 'onlosecapture';
    }

    event.eventName = eventName;
    event.memo = memo || { };

    if (document.createEvent)
      element.dispatchEvent(event);
    else
      element.fireEvent(event.eventType, event);

    return Event.extend(event);
  }

  Event.Handler = Class.create({
    initialize: function(element, eventName, selector, callback) {
      this.element   = $(element);
      this.eventName = eventName;
      this.selector  = selector;
      this.callback  = callback;
      this.handler   = this.handleEvent.bind(this);
    },

    start: function() {
      Event.observe(this.element, this.eventName, this.handler);
      return this;
    },

    stop: function() {
      Event.stopObserving(this.element, this.eventName, this.handler);
      return this;
    },

    handleEvent: function(event) {
      var element = Event.findElement(event, this.selector);
      if (element) this.callback.call(this.element, event, element);
    }
  });

  function on(element, eventName, selector, callback) {
    element = $(element);
    if (Object.isFunction(selector) && Object.isUndefined(callback)) {
      callback = selector, selector = null;
    }

    return new Event.Handler(element, eventName, selector, callback).start();
  }

  Object.extend(Event, Event.Methods);

  Object.extend(Event, {
    fire:          fire,
    observe:       observe,
    stopObserving: stopObserving,
    on:            on
  });

  Element.addMethods({
    fire:          fire,

    observe:       observe,

    stopObserving: stopObserving,

    on:            on
  });

  Object.extend(document, {
    fire:          fire.methodize(),

    observe:       observe.methodize(),

    stopObserving: stopObserving.methodize(),

    on:            on.methodize(),

    loaded:        false
  });

  if (window.Event) Object.extend(window.Event, Event);
  else window.Event = Event;
})();

(function() {
  /* Support for the DOMContentLoaded event is based on work by Dan Webb,
     Matthias Miller, Dean Edwards, John Resig, and Diego Perini. */

  var timer;

  function fireContentLoadedEvent() {
    if (document.loaded) return;
    if (timer) window.clearTimeout(timer);
    document.loaded = true;
    document.fire('dom:loaded');
  }

  function checkReadyState() {
    if (document.readyState === 'complete') {
      document.stopObserving('readystatechange', checkReadyState);
      fireContentLoadedEvent();
    }
  }

  function pollDoScroll() {
    try { document.documentElement.doScroll('left'); }
    catch(e) {
      timer = pollDoScroll.defer();
      return;
    }
    fireContentLoadedEvent();
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
  } else {
    document.observe('readystatechange', checkReadyState);
    if (window == top)
      timer = pollDoScroll.defer();
  }

  Event.observe(window, 'load', fireContentLoadedEvent);
})();

Element.addMethods();

/*------------------------------- DEPRECATED -------------------------------*/

Hash.toQueryString = Object.toQueryString;

var Toggle = { display: Element.toggle };

Element.Methods.childOf = Element.Methods.descendantOf;

var Insertion = {
  Before: function(element, content) {
    return Element.insert(element, {before:content});
  },

  Top: function(element, content) {
    return Element.insert(element, {top:content});
  },

  Bottom: function(element, content) {
    return Element.insert(element, {bottom:content});
  },

  After: function(element, content) {
    return Element.insert(element, {after:content});
  }
};

var $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Position = {
  includeScrollOffsets: false,

  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = Element.cumulativeScrollOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutize: function(element) {
    Position.prepare();
    return Element.absolutize(element);
  },

  relativize: function(element) {
    Position.prepare();
    return Element.relativize(element);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  page: Element.Methods.viewportOffset,

  clone: function(source, target, options) {
    options = options || { };
    return Element.clonePosition(target, source, options);
  }
};

/*--------------------------------------------------------------------------*/

if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){
  function iter(name) {
    return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?
  function(element, className) {
    className = className.toString().strip();
    var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
  } : function(element, className) {
    className = className.toString().strip();
    var elements = [], classNames = (/\s/.test(className) ? $w(className) : null);
    if (!classNames && !className) return elements;

    var nodes = $(element).getElementsByTagName('*');
    className = ' ' + className + ' ';

    for (var i = 0, child, cn; child = nodes[i]; i++) {
      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||
          (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
        elements.push(Element.extend(child));
    }
    return elements;
  };

  return function(className, parentElement) {
    return $(parentElement || document.body).getElementsByClassName(className);
  };
}(Element.Methods);

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);

/*--------------------------------------------------------------------------*/

(function() {
  window.Selector = Class.create({
    initialize: function(expression) {
      this.expression = expression.strip();
    },

    findElements: function(rootElement) {
      return Prototype.Selector.select(this.expression, rootElement);
    },

    match: function(element) {
      return Prototype.Selector.match(element, this.expression);
    },

    toString: function() {
      return this.expression;
    },

    inspect: function() {
      return "#<Selector: " + this.expression + ">";
    }
  });

  Object.extend(Selector, {
    matchElements: function(elements, expression) {
      var match = Prototype.Selector.match,
          results = [];

      for (var i = 0, length = elements.length; i < length; i++) {
        var element = elements[i];
        if (match(element, expression)) {
          results.push(Element.extend(element));
        }
      }
      return results;
    },

    findElement: function(elements, expression, index) {
      index = index || 0;
      var matchIndex = 0, element;
      for (var i = 0, length = elements.length; i < length; i++) {
        element = elements[i];
        if (Prototype.Selector.match(element, expression) && index === matchIndex++) {
          return Element.extend(element);
        }
      }
    },

    findChildElements: function(element, expressions) {
      var selector = expressions.toArray().join(', ');
      return Prototype.Selector.select(selector, element || document);
    }
  });
})();