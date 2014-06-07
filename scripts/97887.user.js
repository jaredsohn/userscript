// ==UserScript==
// @name           Add GT Links to Facebook profiles.
// @namespace      Facebook
// @version        2.0
// @description    Adds GhostTrappers specific links to the standard Facebook profile menu.
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://*.facebook.com/*
// @include        http://*.facebook.com/*#*
// @exclude        http://apps.facebook.com/*
// @exclude        http://www.facebook.com/*viewas*
// ==/UserScript==

const DEBUG_MODE = false;

// copyright      2011 - Julio Napuri "Add MafiaWars Links to Facebook Profiles" http://userscripts.org/scripts/show/95147
// Note: I not a script writer. I just edit to change the function.
/**
 * Global variables
 */
var GT = {
    USER_ID      : '',
    USER_PID     : ''
};

/**
 * RESOURCES
 */
var resources = {
    GT_icon : 'http://photos-a.ak.fbcdn.net/photos-ak-snc1/v43/116/51157989152/app_2_51157989152_7136.gif'
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
        (console||unsafeWindow.console).log('FBGT ADD PROFILE: ' + msg);
    } 
    catch (e) {
    // EMPTY
    }
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
 * Create Item for UL GT list
 * @param {Array} option
 * @return {Object}
 */
function addItem(option) {
    var _nav = document.createElement("li");
    _nav.setAttribute('id', 'navItemM_' + option._name);
    _nav.setAttribute('class', 'key-GT-' + option._name);
    _nav.innerHTML = "GT";
    _nav.innerHTML = _nav.innerHTML.replace("GT",
        "<a class='item' href='" + option.url + "' target='_blank'>"+
        "<span class='imgWrap'>"+
        "<i class='img sp_1a0aga' style='background-image: url(" + option.icon + ");background-repeat: no-repeat;display: inline-block;height: 16px;width: 16px;'></i></span>"+
        "</span><span class='linkWrap'>" + option.title +"</span></a>"
        );
    var _list = document.getElementById("GT_list");
    _list.appendChild(_nav);
    return this;
}

/**
 * Return the profile url of the user id
 * @return {String}
 */
function getProfileLink() {
      var _url = 'http://www.ghost-trappers.com/fb/profiletab/index_intern.php?fbid='+escape(GT.USER_ID);    
return addItem({
        _name: 'profile',
        title: 'Ghost Trapper Profile',
        icon:resources.GT_icon,
        url: _url
    });
}


/**
 * Create div container
 * @return {String}
 */
function _createFBUserID(){
    if(!document.getElementById("FBUserID")) {
        var sideNav = document.getElementById("sideNav");
        var sideGT = document.createElement("div");
        sideGT.setAttribute("id", "FBUserID");
        sideGT.setAttribute("class", "expandableSideNav");
        sideGT.innerHTML = "<ul id='GT_list' class='uiSideNav'></ul>";
        sideNav.appendChild(sideGT);
        log$('Container created');
    }
    return this;
}

/**
 * Add GT Profile
 * @return {Object}
 */
function addGTProfile() {
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
                GT.USER_ID = _userId;
                log$("Get User ID from Facebook: " + GT.USER_ID);

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
                        GT.USER_PID = _pid;
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

addGTProfile();
window.setInterval(function (){
    addGTProfile()
}, 5000);