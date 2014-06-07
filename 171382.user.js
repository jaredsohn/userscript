// ==UserScript==
// @name           B4EenhancedLoader
// @namespace      Sid@
// @description    Load B4E Enhanced script on room join
// @author         Jeremy "Colgate" Richardson
// @author         Thomas "TAT" Andresen
// @include        http://plug.dj/boost4ever-fr/
// @version        1.0
// ==/UserScript==

var script = document.createElement("script");
script.textContent = "if (typeof Class !== 'undefined' && typeof Slug !== 'undefined') {" +
    "var B4EenhancedLoader = Class.extend({" +
        "init: function() {if (typeof Slug !== 'undefined') this.wait();}," +
        "wait: function() {if (typeof API !== 'undefined' && API.isReady) this.run(); else setTimeout($.proxy(this.wait,this),100);}," +
        "run: function() {console.log('B4EenhancedLoader v.1.0 running!');$.getScript('https://raw.github.com/5ida/B4E/master/B4E.js');}" +
    "});" +
    "_TEL = new B4EenhancedLoader(); }";
document.head.appendChild(script);