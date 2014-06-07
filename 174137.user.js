// ==UserScript==
// @name        Facebook X
// @namespace   http://userscripts.org/scripts/show/174137
// @description Enhancements for Facebook: Logout Button in navbar (languages auto detected), remove Find Friends link from navbar, higher messenger window size...
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @exclude     http://*.facebook.com/plugins/*
// @exclude     https://*.facebook.com/plugins/*
// @author      _FBX_
// @homepage    https://www.facebook.com/pages/FBX/412114995568800
// @version     1.1.6
// ==/UserScript==

(function () {

    if (self != window.top) { return; } // Don't run in frames

    //
    // Settings ------------- (true = enabled / false = disabled) ------------- Start
    //
    var prefs = {

        Bookmarks: true,
        Logout: true,
        HideFindFriends: true,
        HideProfilPic: true,
        HigherChatWindow: true,
        ChatWindowHeight: '400px',
        BubbledChat: true,
        HideChatHeader: true,
        HidePrivacyIcon: false,
        HideFooter: true,
        HideOfflineFriends: true,
        ShowPhoneUsers: false,
        NightModeOpacity: '0.3',
        NightMode: true,
        ScrollToTop: true,
        ScrollButton: false

    };
    //
    // Settings ----------------------------------------------------------------- End

    var id = 0;
    var language = 'en';
    var detectedLanguage = '';
    var storage;
    var lang = {
        en: {
            '_language': 'English',
            'BookmarkAdd': 'Add new Bookmark',
            'BookmarkExists': 'There is already a Bookmark for this page.',
            'BookmarkNamePrompt': 'Enter a name for this bookmark:\n%s',
            'BookmarksConfirmRemoval': 'Are you sure you want to remove the following Bookmarks?',
            'BookmarksManage': 'Manage Bookmarks',
            'BookmarksRemoveSelected': 'Remove selected Bookmarks',
            'Bookmarks': '|||',
            'Close': 'Close'
        }
    }

    //
    // Get Elements
    //
    function $(q, root, single) {
        if (root && typeof root == 'string') {
            root = $(root, null, true);
            if (!root) { return null; }
        }
        root = root || document;
        if (q[0] == '#') { return root.getElementById(q.substr(1)); }
        else if (q[0] == '/' || (q[0] == '.' && q[1] == '/')) {
            if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
            return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        }
        else if (q[0] == '.') { return root.getElementsByClassName(q.substr(1)); }
        return root.getElementsByTagName(q);
    }

    // Greasemonkey functions / cross-browser stuff
    // Figure out what type of storage should be used
    //
    var storage = 'none';
    try {
        if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
            GM_setValue('testkey', 'testvalue');
            if (GM_getValue('testkey', false) === 'testvalue') { storage = 'greasemonkey'; }
        }
    } catch (x) { }
    if (storage == 'none' && typeof window.localStorage == 'object') { storage = 'window.localstorage'; }
    //

    // Implement JSON functions if they're not already defined
    if (!this.JSON) {
        JSON = {};
        JSON.stringify = function (obj) {
            var t = typeof (obj);
            if (t != "object" || obj === null) {
                if (t == "string") obj = '"' + obj.replace(/"/g, '\\"') + '"';
                return String(obj);
            } else {
                var n, v, json = [], arr = (obj && obj.constructor == Array);
                for (n in obj) {
                    v = obj[n]; t = typeof (v);
                    if (t == "string") v = '"' + v.replace(/"/g, '\\"') + '"';
                    else if (t == "object" && v !== null) v = JSON.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        };
        JSON.parse = function (str) {
            if (str === "") str = '""';
            eval("var p=" + str + ";");
            return p;
        };
    }

    function setValue(key, value) {
        prefs[key] = value;
        switch (storage) {
            case 'greasemonkey':
                GM_setValue(id + '-' + key, value);
                break;

            case 'window.localstorage':
                window.localStorage['fx-' + id + '-' + key] = value;
                break;
        }
    }

    function getValue(key, value) {
        switch (storage) {
            case 'greasemonkey':
                return GM_getValue(id + '-' + key, value);

            case 'window.localstorage':
                var val = window.localStorage['fx-' + id + '-' + key];
                if (val == 'true') { return true; }
                else if (val == 'false') { return false; }
                else if (val) { return val; }
                break;
        }
        return value;
    }
    //

    //
    // Style
    //
    function addStyle(css) {
        if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
        else if (heads = document.getElementsByTagName('head')) {
            var style = document.createElement('style');
            try { style.innerHTML = css; }
            catch (x) { style.innerText = css; }
            style.type = 'text/css';
            heads[0].appendChild(style);
        }
    }


    function registerMenuCommand(name, func) {
        if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
    }


    //
    // Figure out what language we should be using
    //
    buffer = document.body.className.match(/locale_([^ ]+)/i);
    if (buffer) {
        language = buffer[1].toLowerCase();
        detectedLanguage = language;
        if (!lang[language]) {
            language = language.split('_')[0];
            if (!lang[language]) { language = 'en'; }
        }
    }


    // Add div for popups and shadows
    //
    var popupDiv = document.createElement('div');
    popupDiv.id = 'fxPopupContainer';
    popupDiv.className = 'fxPopupContainer';
    document.body.appendChild(popupDiv);
    on('click', popupDiv, function (e) { if (e.target.id == 'fxPopupContainer') { hidePopup() } });
    var shadowDiv = document.createElement('div');
    shadowDiv.id = 'fxShadow';
    document.body.appendChild(shadowDiv);
    //


    //
    // Misc. Short Functions
    //

    // Get a string in the current language, or default to english
    function $l(key, text) {
        var string, l;
        if (lang[language][key]) { string = lang[language][key]; l = language; }
        else { string = lang['en'][key]; l = 'en' }
        if (text) { string = string.replace('%s', text); }
        return string;
    }

    // Pad with a 0
    function $0(x) { return x < 10 ? '0' + x : '' + x; }

    // Add event listeners
    function on(type, elm, func) {
        if (type instanceof Array) { for (var i = 0; i < type.length; i++) { on(type[i], elm, func); } }
        else {
            if (elm instanceof Array) { for (var j = 0; j < elm.length; j++) { on(type, elm[j], func); } }
            else { (typeof elm === 'string' ? $(elm) : elm).addEventListener(type, func, false); }
        }
    }

    // Add 'click' event listener
    function onClick(elm, func) { (typeof elm === 'string' ? $('#' + elm) : elm).addEventListener('click', func, false); }

    // Click on an element
    function click(elm) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, true);
        elm.dispatchEvent(evt);
    }

    // Click on an element selected using xpath
    function clickX(path) {
        var elm = $(path, null, true);
        if (!elm) { return false; }
        click(elm);
        return true;
    }

    // Get an elements position
    function getPosition(elm) {
        var x = 0;
        var y = 0;
        while (elm != null) {
            x += elm.offsetLeft;
            y += elm.offsetTop;
            elm = elm.offsetParent;
        }
        return Array(x, y);
    }


    // Show a popup div with a shadow background
    //
    function showPopup(content, onTop, fixedPosition) {
        $('#fxPopupContainer').innerHTML = content;
        $('#fxPopupContainer').style.position = fixedPosition ? 'fixed' : 'absolute';
        $('#fxShadow').style.zIndex = '1000';
        $('#fxPopupContainer').style.zIndex = '1001';
        $('#fxShadow').style.display = 'block';
        $('#fxPopupContainer').style.display = 'block';
        if (!fixedPosition) { window.scroll(0, 0); }
    }
    //

    // Show a popup dialog - similar to showPopup() but more automated
    //
    function showDialog(content, controls, opts) {
        if (!opts) { opts = ''; }
        if (!controls) { controls = ''; }
        if (!opts.match(/\bnocontrols\b/)) { content += '<div style="border-top:1px solid #ccc; margin-top:10px; padding-top:10px; text-align:right;">' + controls + (opts.match(/\bnoclose\b/) ? '' : '<input type="button" value="' + $l('Close') + '" id="fx-popup-close" />') + '</div>'; }
        showPopup('<div class="fxPopup" style="' + (opts.match(/\bsmall\b/) ? 'max-width:450px; margin:80px auto;' : 'max-width:600px; margin:30px auto;') + '">' + content + '</div>');
        if (!opts.match(/\b(noclose|nocontrols)\b/)) { onClick($('#fx-popup-close'), hidePopup); }
    }
    //

    // Hide popups created with showPopup()
    //
    function hidePopup() {
        if ($('#fxPopupContainer')) {
            $('#fxPopupContainer').style.display = 'none';
            $('#fxShadow').style.display = 'none';
        }
    }
    //

    //
    // Add CSS ---------------------------------------------------------------- Start
    //
    var style = '';

    // Add Bookmarks - Start
    style = style + '.fxPopup { padding:10px; background:#f6f6f6; border:3px double #666666; border-radius:5px; }' +
    '.fxPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }' +
    '#fxShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.4; }';
    // Add Bookmarks - End

    if (prefs.HideFindFriends) { style = style + '#pageNav a[href*="sk=ff"], #pageNav a[href*="/find-friends"] { display:none; }'; } //hide find friends in navbar
    if (prefs.HideProfilPic) { style = style + '#pageNav .tinyman .headerTinymanPhoto { display:none }'; } //hide profil pic in navbar
    if (prefs.HideChatHeader) { style = style + '.fbNubFlyoutHeader { display:none }'; } //hide header in messenger window if chat is deactivated
    if (prefs.HigherChatWindow) { style = style + '.fbNubFlyout.fbDockChatTabFlyout{ height: ' + prefs.ChatWindowHeight + ' !important; box-sizing:border-box !important; } .clearfix.fbNubFlyoutTitlebar.titlebar{ resize:vertical !important; position: relative !important; }'; } //change messenger window height
    if (prefs.HidePrivacyIcon) { style = style + '#navPrivacy { display:none }'; } // Hide privacy icon in top navigation bar 
    if (prefs.HideFooter) { style = style + '.rhcFooterWrap { display:none }'; } //hide copyright footer in right column


    if (style != '') { addStyle(style); }
    //
    // Add CSS ------------------------------------------------------------------ End


    //
    // Add Bookmarks ---------------------------------------------------------- Start
    //
    //if (GM_getValue('testkey', false) === 'testvalue') {  //  only available in Firefox/Greasemonkey
    if (prefs.Bookmarks && !$('#fx-bookmarks')) {

        try {
            var bmArray = [];
            var bmString = '';

            function getURL() {
                var url = location.href;
                if (m = location.href.match(/^(.*?facebook\.com\/).*#!?\/?(.*)$/)) { url = m[1] + m[2]; }
                return url.replace(/\?$/, '');
            }

            function getBookmark(url) {
                for (var i = 0; i < bmArray.length; i++) {
                    // The second condition below is only needed until the script's name or namepsace gets changed
                    // It handles a modification to getURL()
                    if (bmArray[i].indexOf('|' + url + '|') != -1 || bmArray[i].indexOf('|' + url + '?|') != -1) { return i; }
                }
                return false;
            }

            function setBookmarkHTML() {
                var bmHTML = '';
                for (var i = 0; i < bmArray.length; i++) {
                    buffer = bmArray[i].split('|');
                    bmHTML = bmHTML + '<div class="linkWrap noCount"><a href="' + buffer[1] + '">' + buffer[0] + '</a></div>';
                }
                $('#fx-bookmark-list').innerHTML = bmHTML +
				'<div style="height:1px; margin:6px 5px; background:#ddd;"></div>' +
				'<div class="linkWrap noCount"><a id="fx-add-bookmark">' + $l('BookmarkAdd') + '</a></div>' +
				'<div class="linkWrap noCount"><a id="fx-manage-bookmark">' + $l('BookmarksManage') + '</a></div>';
                addBookmarkListeners();
            }

            function reloadBookmarkList() {
                var bmString = getValue('BookmarkList', '');
                if (bmString.match(/^\[.*\]$/)) { bmArray = JSON.parse(bmString).sort(); }
            }

            function updateBookmarkList() {
                bmString = JSON.stringify(bmArray);
                setValue('BookmarkList', bmString);
                prefs['BookmarkList'] = bmString;
                setBookmarkHTML();
            }

            function addBookmarkListeners() {

                on('click', '#fx-add-bookmark', function () {
                    var url = getURL();
                    if (getBookmark(url) !== false) { window.alert($l('BookmarkExists')); }
                    else {
                        name = document.title.replace(/^.*[\|\)] /i, '').replace(/ on facebook$/i, '');
                        if (name = window.prompt($l('BookmarkNamePrompt', url), name)) {
                            bmArray.push(name + '|' + url + '|');
                            updateBookmarkList();
                        }
                    }
                });

                on('click', '#fx-manage-bookmark', function () {
                    var removalList = [];
                    for (var i = 0, url = getURL(); i < bmArray.length; i++) {
                        var bookmark = bmArray[i].split('|');
                        removalList.push('<label><input type="checkbox" value="' + bmArray[i] + '" ' + (bookmark[1] == url ? 'checked="checked"' : '') + ' />' + bookmark[0] + '</label> - ' + bookmark[1]);
                    }
                    showDialog(
					'<div style="max-height:500px; overflow:auto; background:white; border:1px solid #ccc; padding:5px 0;">' +
					'<form id="fx-bookmark-removal-list" style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">' + removalList.join('<br />') + '</form>' +
					'</div>',
					'<input type="button" id="fx-remove-bookmark-button" value="' + $l('BookmarksRemoveSelected') + '" /> '
				);
                    on('click', '#fx-remove-bookmark-button', function () {
                        var urls = Array();
                        var names = Array();
                        var inputs = $('input', '#fx-bookmark-removal-list');
                        for (var i = 0; i < inputs.length; i++) {
                            if (inputs[i].checked) {
                                urls.push(inputs[i].value.split('|')[1]);
                                names.push(inputs[i].value.split('|')[0]);
                            }
                        }
                        if (window.confirm($l('BookmarksConfirmRemoval') + '\n' + names.join('\n'))) {
                            for (var i = 0; i < urls.length; i++) {
                                if ((bookmark = getBookmark(urls[i])) !== false) { bmArray.splice(bookmark, 1); }
                            }
                            updateBookmarkList();
                            hidePopup();
                        }
                    });
                });
            }

            var pageNav = $('#pageNav');
            if (pageNav) {

                addStyle(
				'body #fx-bookmarks { position:relative; display:list-item; z-index:2000; padding:0 10px;}' +
				'body #fx-bookmarks.openToggler ul#fx-bookmark-list, #fx-bookmarks.openToggler li, body #fx-bookmarks:hover ul#fx-bookmark-list, #fx-bookmarks:hover li  { display:block; }' +
				'body #fx-bookmarks ul a, #fx-bookmarks ul a:focus { background:white; }' +
				'body #fx-bookmarks li { display:block; float:none; }' +
				'body #fx-bookmark-list { overflow:auto; }' +
                // The following line is based on: #navAccountLink img
				'#fx-bookmarks img { background:url(https://s-static.ak.facebook.com/rsrc.php/v1/yR/r/J4KWsmBQZvg.png) no-repeat -137px 0; height:4px; left:5px; position:relative; top:-2px; width:7px; }' +
                // The following line is based on: #navAccount ul
				'#fx-bookmarks ul#fx-bookmark-list { background:#fff;display:none;border-width:2px 1px 2px;border-style:solid;border-color:#3B5998 #333 #2d4486;margin-right:-1px;margin-top:-1px;min-width:200px;padding:4px 0;position:absolute;right:0;top:100%;width:200px;z-index:1 }' +
                // The following line is based on: #navAccount ul a
				'#fx-bookmarks ul#fx-bookmark-list a {color:#222;display:block;font-weight:normal;height:20px;line-height:20px;padding:1px 0 1px 10px;white-space:nowrap;}' +
                // The following line is based on: #navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active
				'#fx-bookmarks ul#fx-bookmark-list a:hover {background:#6d84b4;border-bottom:1px solid #3b5998;border-top:1px solid #3b5998;color:#fff;padding:0 0 0 10px;}' +
                // The following line is based on: .openToggler #navAccountLink
				'#fx-bookmarks:hover fx-bookmark-link {background-color:#fff;color:#333;height:22px;position:relative;z-index:3}' +
				'#fx-bookmarks ul#fx-bookmark-list a:after{display:none}'
			);

                var bookmarks = document.createElement('li');
                bookmarks.id = 'fx-bookmarks';
                bookmarks.className = 'navItem middleItem';
                bookmarks.innerHTML = '<a href="#" onclick="return false;" id="fx-bookmark-link" role="button" rel="toggle" class="navLink">' + $l('Bookmarks') + '</a>' + '<ul id="fx-bookmark-list"></ul>';
                pageNav.insertBefore(bookmarks, pageNav.firstChild);

                on('mouseover', '#fx-bookmark-link', function () {
                    reloadBookmarkList();
                    setBookmarkHTML();
                    $('#fx-bookmark-list').style.maxHeight = (window.innerHeight - 65) + 'px';
                });
            }

        } catch (x) { }
    }
    //
    // Add Bookmarks ------------------------------------------------------------ End

    //
    // Add Logout link -------------------------------------------------------- Start
    //
    if (prefs.Logout && !$('#fx-logout')) {
        try {
            fxLogout = document.createElement('li');
            fxLogout.id = 'fx-logout';
            fxLogout.className = 'navItem middleItem';
            fxLogout.innerHTML = '<a class="navLink">' + $('//form[@id="logout_form"]//input[@type="submit"]', null, true).value + '</a>';
            onClick(fxLogout, function () { $('#logout_form').submit(); });
            $('#pageNav').appendChild(fxLogout);
        } catch (x) { }
    }
    //
    // Add Logout link ---------------------------------------------------------- End


    //
    // Add Bubbled Chat ------------------------------------------------------- Start
    //
    // version     	 v1.2.3
    // author		 iLendSoft
    // downloadURL	 http://userscripts.org/scripts/show/164153

    if (prefs.BubbledChat) {

        try {

            function main() {
                var rounded = false;

                var style = '\
		.hide {\
			display: none !important;\
		}\
		.chat_background {\
			background: #EDEFF4;\
		}\
		.hide_seperator {\
			border-top: none;\
		}\
		.messages_right {\
			float: right;\
			margin-right: 5px;\
		}\
		.message_sent {\
			background-color: #DBEDFE;\
			float: right;\
			clear: both;\
			max-width: 185px;\
			border-color: rgba(0, 0, 0, 0.18) rgba(0, 0, 0, 0.18) rgba(0, 0, 0, 0.29);\
			border-style: solid;\
			border-width: 1px;\
			padding: 4px 6px 4px 5px;\
		}\
		 .profile_pic_mod {\
			background-image: url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/yGu7SrADS5b.png");\
			background-position: -267px -187px;\
			background-repeat: no-repeat;\
			background-size: auto auto;\
			height: 35px;\
			width: 35px;\
			padding-top: 2px;\
			padding-left: 2px;\
		}\
		.messages_left {\
			float: left;\
			margin-top: 2px;\
		}\
		.message_received {\
			clear: both;\
			background-color: #F7F7F7;\
			float: left;\
			max-width: 150px;\
			border-color: rgba(0,0,0,0.18) rgba(0,0,0,0.18) rgba(0,0,0,0.29);\
			border-style: solid;\
			border-width: 1px;\
			padding: 4px 6px 4px 5px;\
		}\
		.fbDockChatTabFlyout {\
			height: 490px !important;\
		}\
		._kso {\
			margin-left: 1px;\
			margin-bottom: 3px;\
		}\
		._56oy ._55pk {\
			max-width: 150px;\
		}\
		._50ke{\
			position: absolute;\
		}';

                if (rounded) {
                    style += '\
			.message_received, .message_sent {\
				border-radius: 5px;\
			}\
		';
                }

                var youArray = new Array("Du", "You");

                var css = document.createElement("style");
                css.type = "text/css";
                css.innerHTML = style;
                document.body.appendChild(css);

                var checkExist = setInterval(function () {
                    var elem = document.getElementById("ChatTabsPagelet");
                    if (elem) {
                        clearInterval(checkExist);
                        elem.addEventListener('DOMNodeInserted', nodeInserted, false);
                    }
                }, 100);

                function nodeInserted(event) {
                    var curevent = event.target;

                    if (curevent.className.search(/(^|\s)fbChatConvItem($|\s)/) != -1) {
                        addClass('hide_seperator', curevent);

                    } else if (curevent.getAttribute('data-jsid').search(/(^|\s)message($|\s)/) != -1) {
                        var message = curevent;

                        var timeContainer = message.parentNode.childNodes[0];
                        var tempTime = timeContainer.childNodes[1].innerHTML;
                        addClass('hide', timeContainer);

                        message.title = tempTime;

                        var senderImage = curevent.parentNode.parentNode.childNodes[0].childNodes[1];
                        var sender = senderImage.getAttribute("aria-label");

                        if (youArray.indexOf(sender) != -1) {
                            addClass('hide', senderImage);
                            addClass('messages_right', message);
                            addClass('message_sent', message);

                        } else {
                            addClass('profile_pic_mod', senderImage);
                            addClass('messages_left', message);
                            addClass('message_received', message);
                        }
                    }
                }

                function addClass(classname, element) {
                    var cn = element.className;
                    if (cn.indexOf(classname) != -1) { return; }
                    if (cn != '') { classname = ' ' + classname; }
                    element.className = cn + classname;
                }
            }

            var script = document.createElement('script');
            script.appendChild(document.createTextNode('(' + main + ')();'));
            (document.body || document.head || document.documentElement).appendChild(script);

        } catch (x) { }
    }
    //
    // Add Bubbled Chat ----------------------------------------------------------- End


    //
    // Hide Offline Friends ----------------------------------------------------- Start
    //
    if (prefs.HideOfflineFriends) {

        var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
        w.addEventListener("load", function () {
            w.setTimeout(function () {
                var d = w.document,
	b = "_hide_offline",
	c = b + new Date().getTime(),
	k = function () {
	    var h = d.getElementsByTagName('head'); if (h = h && h[0])
	        if (d.getElementById(c)) {
	            h.removeChild(d.getElementById(c))
	        } else {
	            var s = d.createElement("style");
	            s.setAttribute("id", c);
	            s.setAttribute("type", "text/css");
	            if (prefs.ShowPhoneUsers) {
	                s.innerHTML = ".fbChatOrderedList li:not(.active):not(.mobile) {display: none;}"; // with phone users
	            } else {
	                s.innerHTML = ".fbChatOrderedList li:not(.active):not(.idle) {display: none;}";
	            }
	            h.appendChild(s)
	        }
	},
	i = "uiMenuItem";
                if (w.localStorage[b] == "1") { k(); i += " checked" }
                w.setTimeout(function () {
                    for (var n = 0, t = d.getElementsByClassName("fbChatSidebarDropdown"); n < t.length; n++) {
                        var u = t[n].getElementsByTagName("ul");
                        if (u = u && u[0]) u.innerHTML = '<!--<li class="uiMenuItem"><a tabindex="-1" class="itemAnchor" onclick="window.open(\'/presence/popout.php\',\'_blank\',\'\');">Pop Out Chat</a></li>--><li class="' + i + '"><a tabindex="-1" class="itemAnchor ' + c + '">Hide Offline Friends</a></li>' + u.innerHTML
                    }
                    w.setTimeout(function () {
                        for (var n = 0, t = d.getElementsByClassName(c); n < t.length; n++) {
                            t[n].addEventListener('click', function (e) {
                                var p = this.parentNode;
                                if (p) {
                                    var m = p.className.match(' checked');
                                    p.className = m ? p.className.replace(' checked', '') : p.className + ' checked';
                                    w.localStorage[b] = m ? "0" : "1";
                                }
                                k();
                                if (!e) e = w.event;
                                if (e.stopPropagation) e.stopPropagation(); else e.cancelBubble = true;
                            }, true)
                        }
                    }, 0)
                }, 0)
            }, 0)
        }, false)

    }
    //
    // Hide Offline Friends ----------------------------------------------------------- End

    //
    // Night Mode ------------------------------------------------------------------- Start
    //
    if (prefs.NightMode) {

        var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
        w.addEventListener("load", function () {
            w.setTimeout(function () {
                var d = w.document,
	b = "_night_mode",
	c = b + new Date().getTime(),
	k = function () {
	    var h = d.getElementsByTagName('head'); if (h = h && h[0])
	        if (d.getElementById(c)) {
	            h.removeChild(d.getElementById(c))
	        } else {
	            var s = d.createElement("style");
	            s.setAttribute("id", c);
	            s.setAttribute("type", "text/css");
	            s.innerHTML = 'html:after { content:"" !important; position: fixed !important; top: 0 !important; bottom: 0 !important; left: 0 !important; right: 0 !important; background: #000 !important; z-index: 99999999 !important; pointer-events: none !important; opacity: ' + prefs.NightModeOpacity + ' !important}';
	            h.appendChild(s)
	        }
	},
	i = "uiMenuItem";
                if (w.localStorage[b] == "1") { k(); i += " checked" }
                w.setTimeout(function () {
                    for (var n = 0, t = d.getElementsByClassName("fbChatSidebarDropdown"); n < t.length; n++) {
                        var u = t[n].getElementsByTagName("ul");
                        if (u = u && u[0]) u.innerHTML = '<!--<li class="uiMenuItem"><a tabindex="-1" class="itemAnchor" onclick="window.open(\'/presence/popout.php\',\'_blank\',\'\');">Pop Out Chat</a></li>--><li class="' + i + '"><a tabindex="-1" class="itemAnchor ' + c + '">Night Mode</a></li>' + u.innerHTML
                    }
                    w.setTimeout(function () {
                        for (var n = 0, t = d.getElementsByClassName(c); n < t.length; n++) {
                            t[n].addEventListener('click', function (e) {
                                var p = this.parentNode;
                                if (p) {
                                    var m = p.className.match(' checked');
                                    p.className = m ? p.className.replace(' checked', '') : p.className + ' checked';
                                    w.localStorage[b] = m ? "0" : "1";
                                }
                                k();
                                if (!e) e = w.event;
                                if (e.stopPropagation) e.stopPropagation(); else e.cancelBubble = true;
                            }, true)
                        }
                    }, 0)
                }, 0)
            }, 0)
        }, false)

    }
    //
    // Night Mode --------------------------------------------------------------------- End


    //
    // Scroll to Top ---------------------------------------------------------------- Start
    //
    if (prefs.ScrollToTop) {

        function scrollToTop() {
            window.scrollTo(0, 0);
        }
        var bar = document.getElementById("blueBar");
        bar.addEventListener('click', scrollToTop, false);
    }
    //

    //
    boot();
    function boot() {

        if (prefs.ScrollButton) {

            try {
                var jewelContainer = document.getElementById("jewelContainer");
                var fbJewel = jewelContainer.getElementsByClassName("fbJewel");
                var newJewel = document.createElement("div");
                newJewel.className = "fbJewel";
                newJewel.id = "fbTopJewel";
                newJewel.innerHTML = '<a class="jewelButton" onclick="window.scrollTo(0,0);" style="background-image:url(data:image/png;base64,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);"></a>';
                insertAfter(jewelContainer, newJewel, fbJewel[2]);
                //jewelContainer.insertBefore(newJewel,fbJewel[0]);
                //preference which one you use
            } catch (e) {

                setTimeout(boot, 1);
            }
        }
    }

    function insertAfter(parent, node, referenceNode) {
        parent.insertBefore(node, referenceNode.nextSibling);
    }
    //
    // Scroll to Top ------------------------------------------------------------------ End

})();