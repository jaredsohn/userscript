// ==UserScript==
// @name           Facebook 直接秀黑幫連結 小小包
// @copyright      2011 - Julio Napuri
// @version        1.0.1
// @description    Adds MafiaWars specific links to the standard Facebook profile menu.
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://*.facebook.com/*
// @include        http://*.facebook.com/*#*
// @exclude        http://apps.facebook.com/*
// @exclude        http://apps.facebook.com/inthemafia
// @exclude        http://www.facebook.com/*viewas*
// ==/UserScript==

const DEBUG_MODE = false;

// Credits : Some ideas taken from FB MafiaWars Addon. Thank you dakam

/**
 * Global variables
 */
var MW = {
    USER_ID      : '',
    USER_PID     : ''
};

/**
 * RESOURCES
 */
var resources = {
    mafia_icon : 'data:image/gif;base64,' +
'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBAQEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56enqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT09Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOjsVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIvLi4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKvDkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT0zG+AAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7'
}

/**
 * Send text to window console
 * @param {String} msg
  @param {Boolean} force
 */
function log$(msg, force) {
    if (DEBUG_MODE === false && !force)
        return;
    try {
        (console||unsafeWindow.console).log('FBMW ADD PROFILE: ' + msg);
    } 
    catch (e) {
    // EMPTY
    }
}

/**
 * Return a valid external Mafia Wars url
 * @param {String} controller Default is "index"
 * @param {String} action Default is "view"
 * @param {Object} params {Name => Value} pairs
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

    for (var name in params) {
        if (name == 'next_params') {
            value = escape(JSON.stringify(params[name]));
        }
        if (name != 'next_controller' && name != 'next_action') {
            url += ('&' + name + '=' + value);
        }
    }
    return url;
}

/**
 * Return the file name
 * @param {String} url
 * @param {String} extension
 * @return {String}
 */
function getFileName(url,extension){
    var f = /([^\/\\]+)$/.exec(url) || ['',''];
    f = /^([^\.]+)(\.\w+)?/.exec(f[1]);
    if(extension) f[1]+= (f[2] || '');
    return f[1];
}

/**
 * Create Item for UL Mafia list
 * @param {Array} option
 * @return {Object}
 */
function addItem(option) {
    var _nav = document.createElement("li");
    _nav.setAttribute('id', 'navItemM_' + option._name);
    _nav.setAttribute('class', 'key-mafia-' + option._name);
    _nav.innerHTML = "MAFIA";
    _nav.innerHTML = _nav.innerHTML.replace("MAFIA",
        "<a class='item' href='" + option.url + "' target='_blank'>"+
        "<span class='imgWrap'>"+
        "<i class='img sp_1a0aga' style='background-image: url(" + option.icon + ");background-repeat: no-repeat;display: inline-block;height: 16px;width: 16px;'></i></span>"+
        "</span><span class='linkWrap'>" + option.title +"</span></a>"
        );
    var _list = document.getElementById("mafia_list");
    _list.appendChild(_nav);
    return this;
}

/**
 * Return the profile url of the user id
 * @return {String}
 */
function getProfileLink() {
    var _url = 'http://apps.facebook.com/inthemafia/profile.php?id='+escape('{"user":"'+ MW.USER_ID+'"}');
    return addItem({
        _name: 'profile',
        title: 'Mafia 檔案',
        icon:resources.mafia_icon,
        url: _url
    });
}

/**
 * Return all profile urls of the user id
 * @return {Object}
 */
function userLinks() {

    var options = {
        promote: {
            title: '加TOP',
            url: getExtURL('group', 'view', {
                'next_params': {
                    'promote': 'yes',
                    'pid': MW.USER_ID
                }
            })
        },

        crime: {
            title: '小小包',
            url: getExtURL('safehouse', 'answer_gift', {
                'next_params': {
                    'from_user': MW.USER_ID,
                    'time_id': Math.round((new Date()).getTime() / 1000),
                    'gkey': "186634552e420a5fea5984c1d7ea5b47"
                }
            })
        },

        slots: {
            title: '拉霸',
            url: getExtURL('stats', 'view', {
                'next_params': {
                    'user': MW.USER_ID,
                    'vegasslots': "1",
                    'referrer': "ad_feed"
                }
            })
        }
    };

    for (var link in options) {
        addItem({
            _name: link,
            title: options[link].title,
            icon: resources.mafia_icon,
            url: options[link].url
        });
    }
}

/**
 * Create div container
 * @return {String}
 */
function _createFBUserID(){
    if(!document.getElementById("FBUserID")) {
        var sideNav = document.getElementById("sideNav");
        var sideMafia = document.createElement("div");
        sideMafia.setAttribute("id", "FBUserID");
        sideMafia.setAttribute("class", "expandableSideNav");
        sideMafia.innerHTML = "<ul id='mafia_list' class='uiSideNav'></ul>";
        sideNav.appendChild(sideMafia);
        log$('Container created');
    }
    return this;
}

/**
 * Add Mafia Profile
 * @return {Object}
 */
function addMafiaProfile() {
    if (document.getElementById("pagelet_fbx_navigation")) {
        if (!document.getElementById("FBUserID")) {
            var _app_6261817190 = document.getElementById("navItem_app_6261817190");// Reviews
            var _app_2373072738 = document.getElementById("navItem_app_2373072738");// Discussions

            if(_app_6261817190 || _app_2373072738 ) {
                _createFBUserID();
                log$('Facebook Application Profile detected');
                return true;
            }

            var _profile_pic = document.getElementById("profile_pic");
            var _profile_minifeed = document.getElementById("profile_minifeed");

            if (_profile_pic || _profile_minifeed) {
                log$('Facebook Profile detected');
                _createFBUserID();

                var _image_name = getFileName(_profile_pic.getAttribute("src"));
                var _userId = _image_name.split("_")[1];
                MW.USER_ID = _userId;
                log$("Get User ID from Facebook: " + MW.USER_ID);

                getProfileLink();

                try{
                    log$('Access Friend Profile wall mini-feed');
                    var _minifeed = document.getElementById("profile_minifeed").innerHTML;

                    //var pattern = new RegExp(friend=p.\w.\d{5,}', 'g');
                    var pattern = /friend=p.\w.\d{5,}/
                    var _pid = _minifeed.match(pattern);
                    _pid = unescape(_pid);
                    _pid = _pid.replace("friend=","");
                    if(typeof(_pid) !== 'undefined' && _pid != null && _pid != 'null') {
                        MW.USER_PID = _pid;
                        log$('Set User PID from Facebook:' + _pid);
                        userLinks();
                    }
                } catch(err) {
                    log$("Error: " + err);
                }
            }
        }
    }
    return false;
}

addMafiaProfile();
window.setInterval(function (){
    addMafiaProfile()
}, 5000);