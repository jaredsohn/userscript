// ==UserScript==
        // @name           Google - International
        // @description    Google - International: is a greasemonkey script that automatically redirects Google to the international (default) version if located on an external country domain.
        // @namespace      http://userscripts.org/users/75976
        // @authors:       ScriptDeveloper
        // @copyright      ScriptDeveloper
        // @include        http://google.*/
        // @include        http://www.google.*/
        // @exclude        http://google.com/
        // @exclude        http://www.google.com/
        // @exclude        http://*google.com/*
        // @version        1.3
        // ==/UserScript==
        
        window.addEventListener("load", function(e) {
        document.innerHTML = window.location = 'http://www.google.com/ncr';
        }, false);  