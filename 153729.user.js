    // ==UserScript==
    // @name           Rotate 4chan 180deg
    // @namespace     http://userscripts.org/users/496934
    // @description    Delete CSS rotation
    // @include        http://*.4chan.org/*
    // @include        https://*.4chan.org/*
    // ==/UserScript==
     
     
    (function () {
        var styles = document.getElementsByTagName("style");
        for (var i = 0; i < styles.length; i++)
        {
            if (styles[i].textContent.indexOf("body{transform:") == 0) {
                styles[i].parentNode.removeChild(styles[i]);
            }
        }
     
    }).call(this);