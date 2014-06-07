// ==UserScript==
// @name       Cookie Clicker Auto Clicker
// @namespace    
// @description  Enable/Disable AutoClicker and Auto Golden Clicker. Modified from the Script by Zackton at http://userscripts.org/scripts/review/176985, with a fix to stop multiple golden cookie clicks at a time.
// @version    0.1
// @match      http://orteil.dashnet.org/cookieclicker/
// ==/UserScript==


(function () {
    var count;
    var options = {
        panelId: 'cookie-cheater',
        intervalDelay: 1,
        longDelay: 250,
        buttons: {
            'bigCookie': {
                label: 'Autoclick Big Cookie',
                action: function () {
                    toggleAutoAction('bigCookie', function () {
                        Game.ClickCookie();
                    })
                }
            },
            'autoGoldenCookie': {
                label: 'Autoclick Golden Cookie',
                action: function () {
                    toggleAutoAction('autoGoldenCookie', function () {
						if (Game.goldenCookie.life > 0 ) {
							Game.goldenCookie.click();
						}
                    })
                }
            },
            'showGoldenCookieDelay': {
                label: 'Display GC Delay In Title',
                action: function () {
                    toggleAutoAction('showGoldenCookieDelay', function () {
                        document.title = '(' + Math.floor(Game.goldenCookie.delay / Game.fps) + ' s) ' + Beautify(Game.cookies) + ' ' + (Game.cookies == 1 ? 'cookie' : 'cookies')
                    })
                }
            },
            'soundGC': {
                label: 'Play Sound When GC Spawns',
                action: function () {
                    toggleAutoAction('soundGC', function () {
                        if (Math.floor(Game.goldenCookie.delay / Game.fps) <= 0) {
                           theSound.play();
                        }
                    })
                }
            },
        }
    };

    addStyleSheet();
    addPanel();
    for (var name in options.buttons) {
        if (!options.buttons[name]) {
            return;
        }
        addButton(name, options.buttons[name].label, options.buttons[name].action);
    }

    function autoAction(name, action) {
        if (!options.buttons[name]) {
            return;
        }
        if (name=='bigCookie') {
            options.buttons[name].interval = setInterval(action, options.intervalDelay);
        }
        else {
        	options.buttons[name].interval = setInterval(action, options.longDelay);
        }
    }
    function stopAutoAction(name) {
        clearInterval(options.buttons[name].interval);
    }

    function toggleAutoAction(name, action) {
        if (!options.buttons[name].on) {
            autoAction(name, action);
            options.buttons[name].on = true;
            options.buttons[name].element.className = 'active';
        } else {
            stopAutoAction(name);
            options.buttons[name].on = false;
            options.buttons[name].element.className = '';
        }
    }

    function addPanel() {
        if (document.getElementById(options.panelId)) {
            document.getElementById(options.panelId).remove();
        }
        options.panel = document.createElement("div");
        options.panel.id = options.panelId;
        document.body.appendChild(options.panel);
    }

    function addButton(name, label, action) {
        if (!options.buttons[name]) {
            return;
        }
        options.buttons[name].element = document.createElement('button');
        options.buttons[name].element[(typeof document.body.style.WebkitAppearance == "string") ? "innerText" : "innerHTML"] = label;
        options.buttons[name].element.addEventListener('click', action);
        options.panel.appendChild(options.buttons[name].element);
    }

    function addStyleSheet() {
        var stylesClassName = options.panelId + '-styles';
        var styles = document.getElementsByClassName(stylesClassName);
        if (styles.length <= 0) {
            styles = document.createElement('style');
            styles.type = 'text/css';
            styles.className += ' ' + stylesClassName;
            document.body.appendChild(styles);
        }
        var css = '#' + options.panelId + '{position:fixed;top:0;right:0;background:#fff;color:#000;padding:5px;z-index:9999;}#' + options.panelId + ' button{margin-left: 5px;}#' + options.panelId + ' button.active:after{content:"*";color:red;}';
        styles[(typeof document.body.style.WebkitAppearance == "string") ? "innerText" : "innerHTML"] = css;
    }

var goldenCookieRawSound = "http://dc144.4shared.com/img/926529133/bd50c11b/dlink__2Fdownload_2FiEhv4VrW_3Ftsid_3D20130907-80140-a0150fa0/preview.mp3";

var theSound = new Audio(goldenCookieRawSound);

})();