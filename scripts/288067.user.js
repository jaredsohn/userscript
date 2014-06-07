// ==UserScript==
// @name           Fantastic Contraption: FC++
// @version        1.9.3
// @namespace      http://sk89q.therisenrealm.com
// @description    Fixes a few bugs and adds a few features to the Fantastic Contraption website (post-FCR integration).
// @copyright      (c) 2009, 2010 sk89q (http://www.sk89q.com)
// @include        http://*.fantasticcontraption.com/*
// @include        http://fantasticcontraption.com/*
// @include        http://www.sparkworkz.com/fc2/*
// @include        http://sparkworkz.com/fc2/*
// @exclude        http://*.fantasticcontraption.com/forum/*
// @exclude        http://fantasticcontraption.com/forum/*
// ==/UserScript==

(function() {
    var version = '1.9.3';
    
    var msgContainer = null;
    var controlsContainer = null;
    var locked = false;
    var lastDisplay = '';
    var fadeOutTimer = null;
    var scrollWheelAlerted = false;
    var expanded = false;
    var playingVideo = false;
    var dangerWillRobinson = false;

    var _resLockUnlockIconHeader = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAKklEQVR42mJgBAIGIADTUDaYB+FAMCOM';
    var resLockIcon = _resLockUnlockIconHeader + 'hoigchjgABsHajohDjYDAAIMABZlADuJKU6EAAAAAElFTkSuQmCC';
    var resUnlockIcon = _resLockUnlockIconHeader + 'ZmTE5DDAATYO1HRCHGwGAAQYABf5AD/Xp2TOAAAAAElFTkSuQmCC';
    var _resExpandShrinkIconHeader = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAA';
    var resExpandIcon = _resExpandShrinkIconHeader + 'I0lEQVR42mJgwAMYoYAwhwFFhgEE4coYkDgMyBy4HhwAIMAAEkYAOXh7YksAAAAASUVORK5CYII=';
    var resShrinkIcon = _resExpandShrinkIconHeader + 'MElEQVR42mJggANGRgY0DiMYwDhQURgHWYYRSQYkjsxhxGo0EocRDhiQOYwMAAEGABIpAEamB5T2AAAAAElFTkSuQmCC';
    var downArrowIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAKElEQVR42mJgRAIMuDlIACiDYIOUwdlgPTA2xAAomxGZxGcPMgcgwAAfqwBt5ofwfgAAAABJRU5ErkJggg==';
    
    // ==============================
    // Functions
    // ==============================

    function execUnsafeJS(js) {
        location.href = "javascript:(" + encodeURI(uneval(js)) + ")();";
    }
    
    // Compat
    if (window.chrome) {
        if (typeof unsafeWindow == 'undefined') {
            unsafeWindow = window;
            dangerWillRobinson = true;
        }
            
        if (GM_registerMenuCommand.toString().match(/is not supported/)) {
            var style = 
                '#fcplusplus-menu { position: fixed; top: 0; left: 0; z-index: 999; background: #FFFFFF;' +
                '   border: 2px outset #999999; padding: 3px 5px 3px 5px; height: 16px; cursor: pointer }' +
                '#fcplusplus-menu div { display: none; background: #FFFFFF; border: 2px outset #999999; text-align: left; }' +
                '#fcplusplus-menu div a { display: block; padding: 2px 5px 2px 5px; }' +
                '#fcplusplus-menu div a:hover { display: block; background: #CCCCCC; color: #000000; }' +
                '#fcplusplus-menu:hover div { float: left; display: block; position: relative; top: 21px; left: -7px; margin-right: -150px; width: 150px; }';
            GM_addStyle(style);
            
            var menu = document.createElement('div');
            menu.id = 'fcplusplus-menu';    
            menu.innerHTML = 'Menu <img src="' + downArrowIcon + '" alt="" />';
            var submenu = document.createElement('div');
            menu.appendChild(submenu);
            document.body.appendChild(menu);
            
            window.GM_registerMenuCommand = function(caption, commandFunc) {
                var link = document.createElement('a');
                link.href = 'javascript:;';
                link.onclick = function() {
                    submenu.style.display = 'none';
                    setTimeout(function() { submenu.style.display = ''; }, 100);
                    commandFunc();
                }
                link.appendChild(document.createTextNode(caption));
                submenu.appendChild(link);
            }
        }
        
        if (GM_setValue.toString().match(/is not supported/)) {
            window.GM_setValue = function(key, value) {
                key = "fcplusplus_" + key;
                localStorage[key] = JSON.stringify(value);
            }
            
            window.GM_getValue = function(key, def) {
                key = "fcplusplus_" + key;
                if (key in localStorage) {
                    return JSON.parse(localStorage[key]);
                } else {
                    return def;
                }
            }
        }
    }
    
    // ==============================
    // Message display / control bar
    // ==============================

    function attach() {
        var style = 
            '#fcplusplus-controls { position: fixed; bottom: 0; right: 0; z-index: 999; background: #FFFFFF; }' +
            '#fcplusplus-controls a { display: block; float: right; border: 2px outset #999999; padding: 3px 5px 3px 5px; height: 16px; }' +
            '#fcplusplus-controls a:hover { background: #CCCCCC; color: #000000; }' +
            //'#fcplusplus-controls a img { vertical-align: middle; }' +
            '#fcplusplus-display { position: fixed; top: 0; right: 0; z-index: 999; background: #FDB601; border: ' +
                '3px solid #673400; border-right: 0; border-top: 0; padding: 3px 5px 3px 5px; }' + 
            '#fcplusplus-video-wrapper { position: fixed; top: 0; left: 0; bottom: 0; right: 0; }' +
            '#fcplusplus-video { margin: 0; }';
        GM_addStyle(style);
        
        // Controls
        controlsContainer = document.createElement('div');
        controlsContainer.id = 'fcplusplus-controls';    
        controlsContainer.innerHTML = '<a href="javascript:;" id="fcplusplus-expand-button"><img src="' + resExpandIcon +'" /></a>' +
                                      '<a href="javascript:;" id="fcplusplus-lock-button"><img src="' + resUnlockIcon +'" /> Unlocked</a>';
        document.body.appendChild(controlsContainer);
        document.getElementById('fcplusplus-lock-button').addEventListener('click', function(event) {
            toggleLock();
        }, false);
        document.getElementById('fcplusplus-expand-button').addEventListener('click', function(event) {
            toggleExpandedSWF();
        }, false);
        
        // Message
        msgContainer = document.createElement('div');
        msgContainer.id = 'fcplusplus-display';
        msgContainer.style.display = 'none';
        document.body.appendChild(msgContainer);
    }

    function display(message, delay) {
        if (!delay) {
            delay = 2000;
        }
        
        if (lastDisplay == message) {
            setHideTimeout(delay);
        } else {
            lastDisplay = message;
            msgContainer.innerHTML = message;
            msgContainer.style.display = '';
            setHideTimeout(delay);
        }
    }

    function clearDisplay() {
        if (fadeOutTimer) {
            clearTimeout(fadeOutTimer);
            fadeOutTimer = null;
        }
        
        lastDisplay = '';
        msgContainer.style.display = 'none';
    }

    function setHideTimeout(delay) {
        if (fadeOutTimer) {
            clearTimeout(fadeOutTimer);
            fadeOutTimer = null;
        }
        
        fadeOutTimer = setTimeout(function() {
            lastDisplay = '';
            msgContainer.style.display = 'none';
        }, delay);
    }

    function resetDisplay() {
        msgContainer.innerHTML = 'Enhanched by FC++';
    }

    function attachBranding() {
        var style = 
            '#accountbar + div + #fcplusplus-ad { padding-top: 5px; }';
        GM_addStyle(style);
        
        var enhanced = document.createElement('div');
        enhanced.id = 'fcplusplus-ad';
        enhanced.innerHTML = '<a href="http://fcexts.fc.sk89q.com/inbound?from=fcplusplus&amp;version=' + version + '"><img src="http://fcexts.fc.sk89q.com/fcplusplus/enhanced.png?version=' + version + '" alt="Enhanced with FC++" style="border: 0" /></a>';
        document.getElementById('rightbar').appendChild(enhanced);
        
        GM_registerMenuCommand("About FC++...", function() {
            GM_openInTab('http://fcexts.fc.sk89q.com/inbound?from=fcplusplus');
        });
        
        /*var navItem = document.createElement('li');
        navItem.className = 'hov';
        navItem.innerHTML = '<a class="dir" href="#">FC++</a>' +
                            '<ul><li><a href="http://fcexts.fc.sk89q.com/inbound?from=fcplusplus">About FC++</a></li>' +
                            '<li><a class="border" href="http://sk89q.therisenrealm.com">sk89q\'s website</a></li></ul>';
        var navElement = document.getElementById('nav');
        for (var i = 0; i < navElement.childNodes.length; i++) {
            if (navElement.childNodes[i].nodeName == 'UL') {
                navElement.childNodes[i].appendChild(navItem);
            }
        }*/
    }

    // ==============================
    // Video
    // ==============================

    function stopVideo() {
        var playerWrapper = document.getElementById('fcplusplus-video-wrapper');
        playerWrapper.parentNode.removeChild(playerWrapper);
        
        playingVideo = false;
    }

    function playVideo(filename) {    
        if (playingVideo) {
            stopVideo();
        } else {
            var playerWrapper = document.createElement('div');
            playerWrapper.id = "fcplusplus-video-wrapper";
            
            var player = document.createElement('object');
            player.id = "fcplusplus-video";
            
            with (player) {
                setAttribute('type', 'application/x-shockwave-flash');
                setAttribute('data', 'http://fcexts.fc.sk89q.com/fcplusplus/player.swf');
                setAttribute('allowscriptaccess', 'always');
                width = '100%';
                height = '100%';
            }
            
            var videoURL = ['fcplusplus', filename].join('/');
            var params = {
                movie: 'http://fcexts.fc.sk89q.com/fcplusplus/player.swf',
                FlashVars: 'file=http://fcexts.fc.sk89q.com' + videoURL + '&id=fcplusplus-video&autostart=true&controlbar=none'
            };
            
            for (var key in params) {
                var p = document.createElement('param');
                p.setAttribute('name', key);
                p.setAttribute('value', params[key]);
                player.appendChild(p);
            }
            
            unsafeWindow.playerReady = function(id) {
                unsafeWindow.fcPlusPlus_videoError = function(err) {
                    display('The video could not be played', 3000);
                    stopVideo();
                };
                unsafeWindow.fcPlusPlus_videoState = function(state) {
                    if (state.newstate == 'IDLE' || state.newstate == 'PAUSED' || state.newstate == 'COMPLETED') {
                        stopVideo();
                    }
                };
                
                execUnsafeJS(function() {
                    window.document.getElementById('fcplusplus-video').addModelListener("ERROR", "fcPlusPlus_videoError");
                    window.document.getElementById('fcplusplus-video').addModelListener("STATE", "fcPlusPlus_videoState");
                });
            };
            
            playerWrapper.appendChild(player);
            document.body.appendChild(playerWrapper);
            
            playingVideo = true;
        }
    }

    // ==============================
    // Lock
    // ==============================

    function registerLock() {
        function lockHandler(event) {
            if (locked) {
                event.returnValue = 'You will lose your design if you were building one!'
                return 'You will lose your design if you were building one!'
            }
        }
        if (window.chrome) {
            window.onbeforeunload = lockHandler;
        }
        window.addEventListener('beforeunload', lockHandler, false);
        
        GM_registerMenuCommand("Toggle lock", function() {
            toggleLock();
        });
        GM_registerMenuCommand("Set auto-lock...", function() {
            askAutoLock();
        });
        
        handleAutoLock();
    }

    function toggleLock(noMessage) {
        var lockElement = document.getElementById('fcplusplus-lock-button');
        if (locked) {
            clearDisplay();
            lockElement.innerHTML = '<img src="' + resUnlockIcon +'" /> Unlocked';
        } else {
            if (!noMessage) {
                display('Locked! Now you can\'t accidentally browse away!', 4000);
            }
            lockElement.innerHTML = '<img src="' + resLockIcon +'" /> <strong>Locked</strong>';
        }
        locked = !locked;
    }

    function handleAutoLock() {
        var mode = parseInt(GM_getValue('autolock', -1));
        if (mode > 0) {
            setTimeout(function() {
                if (!locked) {
                    toggleLock(true);
                    display('Automatically locked!', 5000);
                }
            }, mode * 1000);
        } else if (mode == 0) {
            toggleLock(true);
            display('Automatically locked!', 5000);
        }
    }

    function askAutoLock() {
        var question = 'You can enable auto-lock so that the page is automatically locked each ' +
                       'time that the page is loaded. Enter your choice according to one of the ' +
                       'options listed below. You can either have it lock after you have left the page open ' +
                       'for a while or you can have it lock right away.\n\n' +
                       'SSS - wait number of seconds (i.e. 45 for 45 seconds)\n' +
                       'MM:SS - wait number of minutes and seconds (i.e. 5:15 for 5 minutes, 15 seconds)\n' +
                       '0 - don\'t wait, do it right away\n' +
                       'off - don\'t auto-lock';
        var result = prompt(question)
        
        if (result == null) {
            display('The auto-lock setting was not changed');
            return;
        }
        
        var m;
        var value = -1;
        var message;
        if (result == '0') {
            value = 0;
            message = 'FC++ will auto-lock on page load.';
        } else if (result.match('^[0-9]+$')) {
            value = parseInt(result);
            message = 'FC++ will wait ' + value + ' second(s) before auto-locking.';
        } else if (m = result.match('^([0-9]+):([0-9]+)$')) {
            value = parseInt(m[1]) * 60 + parseInt(m[2]);
            message = 'FC++ will wait ' + m[1] + ' minute(s) and ' + m[2] + ' second(s) before auto-locking.';
        } else {
            value = -1;
            message = 'Auto-lock has been disabled.';
        }
        
        GM_setValue('autolock', value);
        alert(message + '\nThis setting will not take effect until you refresh the page.');
    }

    // ==============================
    // Expand SWF
    // ==============================

    function registerExpandSWF() {
        GM_registerMenuCommand("Toggle expanded game window", function() {
            toggleExpandedSWF();
        });
        
        var style = 
            '.fcplusplus-expanded-swf #flash { padding: 0 !important; margin: 0 -300px 0 -1px !important; width: 1004px !important; height: 716px !important; z-index: 99999 !important; }' +
            '.fcplusplus-expanded-swf #flash object { width: 100%; height: 100%; }' +
            '.fcplusplus-expanded-swf #rightbar { display: none }';
        GM_addStyle(style);
        
        GM_registerMenuCommand("Set auto-expand...", function() {
            askAutoExpand();
        });
        
        handleAutoExpand();
    }

    function toggleExpandedSWF() {
        var expandElement = document.getElementById('fcplusplus-expand-button');
        if (expanded) {
            document.body.className = '';
            expandElement.innerHTML = '<img src="' + resExpandIcon +'" />';
        } else {
            document.body.className = 'fcplusplus-expanded-swf';
            expandElement.innerHTML = '<img src="' + resShrinkIcon +'" />';
        }
        expanded = !expanded;
    }

    function handleAutoExpand() {
        var mode = parseInt(GM_getValue('autoExpand', 0));
        if (mode > 0) {
            toggleExpandedSWF();
        }
    }

    function askAutoExpand() {
        var result = confirm('Would you like your game to be expanded everytime you visit FC?');
        GM_setValue('autoExpand', result ? 1 : 0);
    }


    // ==============================
    // Easter eggs, 'features'
    // ==============================

    function registerCoffee() {
        if (dangerWillRobinson) return;
        
        GM_registerMenuCommand("Make coffee", function() {
            playVideo('coffee.flv');
        });
    }

    function registerEggs() {
        var navItem = document.createElement('li');
        navItem.innerHTML = '<a href="/download" id="fcplusplus-download-egg">Download</a>';
        var navElement = document.getElementById('nav');
        for (var i = 0; i < navElement.childNodes.length; i++) {
            if (navElement.childNodes[i].nodeName == 'UL') {
                navElement.childNodes[i].appendChild(navItem);
            }
        }
        document.getElementById('fcplusplus-download-egg').addEventListener('click', function(event) {
            playVideo('rr.flv');
            event.preventDefault()
        }, false);
    }

    // ==============================
    // Fixes
    // ==============================

    function applyScrollStopper() {
        function handleScroll(event) {
            if (!scrollWheelAlerted) {
                display('FC++ has disabled the scroll wheel', 3000);
                scrollWheelAlerted = true;
            }
            
            event.preventDefault();
            event.returnValue = false;
        }
        
        window.addEventListener('DOMMouseScroll', handleScroll, false);
    }

    function applyNavigationFixes() {
        var navElement = document.getElementById('nav');
        var navParent = navElement.parentNode;
        navParent.removeChild(navElement);
        navParent.insertBefore(navElement, navParent.childNodes[0]);
        
        var style = 
            '#header { background: #13234C; }' +
            '#nav { margin: 0 0 0 0; height: 31px; background: url(../images/header2.gif); }' +
            'ul.dropdown li { line-height: 1em; }';
        GM_addStyle(style);
    }

    // ==============================
    // Links to FCR
    // ==============================
    
    function addInfoBox() {
        var m, isLevel, id;
        m = window.location.href.match(/\?levelId=([0-9]+)/);
        if (m) {
            id = m[1];
            isLevel = true;
        }
        m = window.location.href.match(/\?designId=([0-9]+)/);
        if (m) {
            id = m[1];
            isLevel = false;
        }
        if (isLevel != null) {
            var infoBox = document.createElement('div');
            infoBox.id = 'accountbar';
            infoBox.style.marginBottom = '5px';
            var header = document.createElement('div');
            header.className = 'accounthead';
            header.innerHTML = 'Current ' + (isLevel ? 'Level' : 'Design');
            infoBox.appendChild(header);
            var content = document.createElement('div');
            content.style.padding = '25px';
            content.style.paddingTop = '10px';
            content.style.paddingBottom = '0';
            if (isLevel) {
                content.innerHTML = '<img src="/image?type=level&amp;do=thumb&amp;id=' + id + '" width="100" style="float: left; border: 2px solid #ECECF9" />' + 
                    '<ul style="margin-left: 110px; padding: 0">' + 
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/level?levelId=' + id + '">View on FCR</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/level?levelId=' + id + '#statistics">View statistics</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/designs?levelId=' + id + '">Browse solutions</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/export?type=level&amp;id=' + id + '&amp;format=fcml">Export to FCML</a></li>' +
                    '</ul><br style="clear: both" />';
            } else {
                content.innerHTML = '<img src="/image?type=design&amp;do=thumb&amp;id=' + id + '" width="100" style="float: left; border: 2px solid #ECECF9" />' + 
                    '<ul style="margin-left: 110px; padding: 0">' + 
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/design?designId=' + id + '">View on FCR</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/design?designId=' + id + '#statistics">View statistics</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/designredirect?designId=' + id + '&amp;want=level">View level on FCR</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/designredirect?designId=' + id + '&amp;want=play">Play the level</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/designredirect?designId=' + id + '&amp;want=solutions">Find other solutions</a></li>' +
                    '<li style="width: auto">&raquo; <a href="http://fc.sk89q.com/export?type=design&amp;id=' + id + '&amp;format=fcml">Export to FCML</a></li>' +
                    '</ul><br style="clear: both" />';
            }
            infoBox.appendChild(content);
            document.getElementById('rightbar').insertBefore(infoBox,
                document.getElementById('accountbar'));
        }
    }
    
    function hijackAccountLinks() {
        var redirects = ['dashboard', 'mydesigns', 'mylevels'];
        var links = document.links;
        for (var i in links) {
            var href = links[i].getAttribute('href');
            if (href) {
                if (href.match(/^user\?userId=/)) {
                    links[i].setAttribute('href', 'http://fc.sk89q.com/' + href);
                    links[i].innerHTML = 'View my public profile on orig. FCR';
                } else {
                    for (var r in redirects) {
                        if (redirects[r] == href) {
                            links[i].setAttribute('href', 'http://fc.sk89q.com/' + href);
                            break;
                        }
                    }
                }
            }
        }
    }

    // ==============================
    // Script
    // ==============================

    var m;

    // Main page with the game?
    if (m = window.location.href.match(/^http:\/\/(?:(?:qa|www)\.)?(?:fantasticcontraption\.com|sparkworkz\.com\/fc2)\/(?:index\.php|login)?(?:\?(.*))?(?:#.*)?$/)) {
        attach();
        try { attachBranding(); } catch (e) {}
        applyScrollStopper();
        try { registerLock(); } catch (e) {}
        try { registerExpandSWF(); } catch (e) {}
        try { registerCoffee(); } catch (e) {}
        //registerEggs();
        try { hijackAccountLinks(); } catch (e) {}
        try { addInfoBox(); } catch (e) {}
        //applyNavigationFixes();
        
        // Hide the right ad
        var style = 
            '#rightbar object, #rightbar embed, #rightbar applet { display: none !important; }' +
            '#rightcontent { height: auto; padding: 0; }';
        GM_addStyle(style);
        
        var queryString = m.length == 2 ? new String(m[1]) : '';
        
        var params = {};
        if (m = queryString.match(/levelId=([0-9]+)/)) {
            params.levelId = m[1];
        } else if (m = queryString.match(/designId=([0-9]+)/)) {
            params.designId = m[1];
        } else if (m = queryString.match(/editId=([0-9]+)/)) {
            params.editId = m[1];
        }
        
        // Anti-unsafeWindow
        var fixSWFPayload = function() {
            window.swfobject.embedSWF("/game/Contraption.swf", "flash", "500", "694", "9.0.0", "/scripts/expressInstall.swf", params);
        };
        //location.href = "javascript:params = " + encodeURI(uneval(params)) + ";(" + encodeURI(uneval(fixSWFPayload)) + ")();";
    }
})();