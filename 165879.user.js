// ==UserScript==
// @name           IFZEnhancedLoaderEVERYWHERE
// @namespace      superimpega
// @description    Load IFZ Enhanced script on room join
// @author         Alex "Super" Matthewson
// @include        http://plug.dj/*
// @version        1.0
// ==/UserScript==

var script = document.createElement("script");
script.textContent = "if (typeof Class !== 'undefined' && typeof Slug !== 'undefined') {" +
    "var IFZenhancedLoader = Class.extend({" +
        "init: function() {if (typeof Slug !== 'undefined') this.wait();}," +
        "wait: function() {if (typeof API !== 'undefined' && API.isReady) this.run(); else setTimeout($.proxy(this.wait,this),100);}," +
        "run: function() {console.log('IFZenhancedLoader v.1.0 running!');$.getScript('https://raw.github.com/superimpega/RyanC/master/h.js');}" +
    "});" +
    "_IEL = new IFZenhancedLoader(); }";
document.head.appendChild(script);