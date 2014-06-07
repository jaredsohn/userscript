// ==UserScript==
// @name           plug.dj Drum & Bass background
// @namespace      background by: Ledge ; edit by: Leopaprd 10.5 ; Script by thedark1337 <-- Big thanks!
// @include        http://plug.dj/drum-bass/
// @version        3.0
// ==/UserScript==
(function() {
    var a = {
        b: function() {
            if (typeof API !== 'undefined' && API.enabled)
                this.c();
            else
                setTimeout(function() {
                    a.b();
                }, 100);
        },
        c: function() {
            setTimeout(function() {
            console.log('DnB Custom Background Loader v.1.8 enabled!');
                $('body').css('background-image', 'url(http://i.imgur.com/iB6Na27.jpg)');
                $('div.background').hide();
            },3E3);
        }
    };
    a.b();
})();