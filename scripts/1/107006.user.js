// ==UserScript==
// @name           Google Search No Plus 1
// @namespace      http://odyniec.net/
// @description    Disables the animation of the "+1" button in Google search results (or hides it altogether)
// @require        https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// @include        http://google.*
// @include        http://www.google.*
// @include        https://google.*
// ==/UserScript==

(function () {
    function reload() {
        var css;

        if (cfg.get('mode') == 'Disable animation')
            css = '.esw, .esw:hover { background: url("/images/nav_logo82.png") repeat scroll 0px -243px transparent !important; }';
        else
            css = '.esw, .esw:hover { display: none !important; }';

        var style = document.querySelector('head style#__no-plus-1');

        if (!style) {
            style = document.createElement('style');
            style.id = '__no-plus-1';
            document.querySelector('head').appendChild(style);
        }
        
        style.textContent = css;
    }

    var cfg = new MonkeyConfig({
        title: 'No Plus 1 Settings',
        parameters: {
            mode: {
                label: 'Plus 1 button:',
                type: 'select',
                variant: 'radio',
                choices: [ 'Disable animation', 'Hide' ],
                'default': 'Disable animation'
            }
        },
        menuCommand: true,
        onSave: function (values) {
            reload();
        }
    });

    reload();
})();
