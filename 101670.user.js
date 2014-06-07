// ==UserScript==
// @name           View as Source
// @namespace      http://odyniec.net/
// @description    Open any link in the document as plain text using the "view-source" scheme
// @require        https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// @include        *
// ==/UserScript==

(
function () {
    var 
        /* MonkeyConfig configuration */
        cfg,
        /* An object representing the configured keyboard shortcut */
        shortcut,
        /* Is the "View as Source" mode enabled? */
        enabled = false,
        /* Time to stay active */
        duration,
        /* The time when message box fade out animation started */
        startTime = 0,
        /* Duration of the fade out animation */
        animDuration = 250,
        /* Message box div element */
        msgDiv;

    function initCfg() {
        cfg = new MonkeyConfig({
            title: 'View as Source Configuration',
            menuCommand: true,
            params: {
                duration: { type: 'number',
                    default: 5,
                    html: '[FIELD]&nbsp;seconds' },
                keyboard_shortcut: { type: 'custom',
                    default: 'shift+alt+u',
                    html: '<select>' +
                        '<option value="alt">Alt</option>' +
                        '<option value="ctrl">Ctrl</option>' +
                        '<option value="shift+alt">Shift + Alt</option>' +
                        '<option value="shift+ctrl">Shift + Ctrl</option>' +
                        '</select> + ' +
                        '<select>' +
                        '<option value="a">A</option>' +
                        '<option value="b">B</option>' +
                        '<option value="c">C</option>' +
                        '<option value="d">D</option>' +
                        '<option value="e">E</option>' +
                        '<option value="f">F</option>' +
                        '<option value="g">G</option>' +
                        '<option value="h">H</option>' +
                        '<option value="i">I</option>' +
                        '<option value="j">J</option>' +
                        '<option value="k">K</option>' +
                        '<option value="l">L</option>' +
                        '<option value="m">M</option>' +
                        '<option value="n">N</option>' +
                        '<option value="o">O</option>' +
                        '<option value="p">P</option>' +
                        '<option value="q">Q</option>' +
                        '<option value="r">R</option>' +
                        '<option value="s">S</option>' +
                        '<option value="t">T</option>' +
                        '<option value="u">U</option>' +
                        '<option value="v">V</option>' +
                        '<option value="w">W</option>' +
                        '<option value="x">X</option>' +
                        '<option value="y">Y</option>' +
                        '<option value="z">Z</option>' +
                        '</select>',
                    get: function (parent) {
                        var select1 = parent.querySelector('select'),
                            select2 = parent.querySelector('select:nth-child(2)');
                        
                        return select1.value + '+' + select2.value;
                    },
                    set: function (value, parent) {
                        var select1 = parent.querySelector('select'),
                            select2 = parent.querySelector('select:nth-child(2)');
                    
                        select1.value = value.substr(0,
                                value.lastIndexOf('+'));
                        select2.value = value.substr(-1);
                    }
                }
            },
            onSave: function (values) {
                setKeyCfg(values.keyboard_shortcut);
                duration = values.duration * 1000;
            }
        });
    }
    
    /**
     * Parses keyboard shortcut string.
     * 
     * @param {string} key Keyboard shortcut 
     */
    function setKeyCfg(key) {
        var k = key.toLowerCase().split(/\s*\+\s*/);
        
        shortcut = { keyCode: 0, shift: false, ctrl: false, alt: false };
        
        for (var i = 0; i < k.length; i++) {
            switch (k[i]) {
            case 'shift':
                shortcut.shift = true;
                break;
            case 'ctrl': case 'control':
                shortcut.ctrl = true;
                break;
            case 'alt':
                shortcut.alt = true;
                break;
            default:
                shortcut.keyCode = k[i].charCodeAt(0);
                break;
            }
        }
    }

    /**
     * Handles window keydown event.
     * 
     * @param {Event} event Event object
     */
    function winKeyDown(event) {
        var keyCode = String.fromCharCode(event.which).toLowerCase()
            .charCodeAt(0);

        if (!enabled &&
            (shortcut.keyCode == keyCode || !shortcut.keyCode) &&
            !(shortcut.shift ^ event.shiftKey) &&
            !(shortcut.ctrl ^ event.ctrlKey) &&
            !(shortcut.alt ^ event.altKey))
        {
            /* Enable document click event handler */
            document.addEventListener('click', docClick, false);
            
            document.getElementsByTagName('body')[0].appendChild(msgDiv);
            msgDiv.style.display = '';
            msgDiv.style.opacity = 1;

            setTimeout(msgFadeOut, duration - animDuration);

            enabled = true;
        }
    }

    /**
     * Handles document click event.
     * 
     * @param {Event} event Event object
     */
    function docClick(event) {
        if (event.target.tagName && event.target.tagName.toLowerCase() == 'a') {
            var href = event.target.href;

            if (href) {
                event.target.href = 'view-source:' + href +
                    (href.match(/\?/) ? '' : '?');

                /* Revert the original href value after one second */
                setTimeout(function () {
                               event.target.href = href;
                           }, 1000);
            }
        }
    }

    /**
     * Performs the fade out animation and disables the "View as Source" mode
     * when animation is completed. 
     */
    function msgFadeOut() {
        if (startTime == 0)
            startTime = Date.now();

        /* Has animDuration passed? */
        if (Date.now() - startTime <= animDuration) {
            /* No -- continue animation */
            setTimeout(msgFadeOut, 50);
            msgDiv.style.opacity = (animDuration - Date.now() + startTime)
                / animDuration;
        }
        else {
            /*
             * Yes - reset animation start time, hide the div, and remove the
             * document click event handler (thus disabling the script
             * functionality).
             */
            startTime = 0;
            msgDiv.style.display = 'none';
            document.removeEventListener('click', docClick, false);
            enabled = false;
        }
    }

    /**
     * Applies style settings to message div.
     */
    function styleMsgDiv() {
        /* Message box appears in the bottom right corner of browser viewport */
        msgDiv.style.position = 'fixed';
        msgDiv.style.right = '5px';
        msgDiv.style.bottom = '5px';

        /* Make sure it goes on top of everything */
        msgDiv.style.zIndex = 99999;

        /* Adjust appearance */
        msgDiv.style.paddingLeft =
            msgDiv.style.paddingTop =
            msgDiv.style.paddingRight =
            msgDiv.style.paddingBottom = '0.5em';

        msgDiv.style.backgroundColor = '#ff8';
        msgDiv.style.color = '#330';
        msgDiv.style.fontFamily = 'sans-serif';
        msgDiv.style.fontSize = '10pt';

        msgDiv.style.borderStyle = 'solid';
        msgDiv.style.borderColor = '#bb6';
        msgDiv.style.borderWidth = '1px';
        msgDiv.style.borderTopLeftRadius =
            msgDiv.style.borderTopRightRadius =
            msgDiv.style.borderBottomLeftRadius =
            msgDiv.style.borderBottomRightRadius = 
            msgDiv.style.MozBorderRadiusTopleft = 
            msgDiv.style.MozBorderRadiusTopright =
            msgDiv.style.MozBorderRadiusBottomleft =
            msgDiv.style.MozBorderRadiusBottomright = '0.5em';
        msgDiv.style.boxShadow =
            msgDiv.style.MozBoxShadow = '1px 1px 4px #888';

        /* Initially hidden */
        msgDiv.style.display = 'none';
    }

    initCfg();
    
    /* Apply configuration values */
    setKeyCfg(cfg.get('keyboard_shortcut') || 'Shift + Alt + U');
    duration = (cfg.get('duration') >= 1 ? cfg.get('duration') : 5) * 1000;

    /* Create message div */
    msgDiv = document.createElement('div');
    msgDiv.innerHTML = 'View as Source';

    styleMsgDiv();

    /* Start listening for window keydown events */
    window.addEventListener('keydown', winKeyDown, true);
}
)();