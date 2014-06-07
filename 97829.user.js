// ==UserScript==
// @name           Alertes leboncoin
// @namespace      http://alertes-leboncoin.appspot.com
// @description    Genere un flux rss sur la recherche en cours
// @include        http://www.leboncoin.fr/*
// ==/UserScript==
var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.5.0/dojo/dojo.xd.js";
var link = document.createElement('link');
link.rel = "stylesheet";
link.type= "text/css";
link.href="http://o.aolcdn.com/dojo/1.5.0/dijit/themes/claro/claro.css";
document.getElementsByTagName('head')[0].appendChild(script);
document.getElementsByTagName('head')[0].appendChild(link);

// Add the dojo requires
window.addEventListener('load', function(event) {
    var dojo =  unsafeWindow["dojo"];
    dojo.require("dijit.Tooltip");

    // Add the claro theme to the page
    dojo.addOnLoad(function(){
        var dijit = unsafeWindow["dijit"];
        dojo.addClass(document.getElementsByTagName('body')[0], "claro");

        var rssIconParent = dojo.byId("titlesearch");
        if (!dojo.byId("rss")) {
            var container = dojo.create("div", {
                style : "float:right; margin-right:40px; text-align: right;"    
            }, rssIconParent, "last");
            
            var rssIcon = dojo.create("img", {
                    id : "rss",
                    src : "http://media02.hongkiat.com/v4s/logo/social_network/rss.png",
                    style : "cursor : pointer; padding-bottom:0.8em;",
                    alt : "Cliquez ici pour obtenir un flux RSS de votre recherche sur les dernières 24h."
                }, container, "first");
            
            var info = dojo.create("a", {
                innerHTML : "Qu'est-ce qu'un flux RSS ?",
                href : "http://www.atelier51.com/infos-pme/services-en-ligne/les-flux-rss--a-quoi-ca-sert-.html",
                style : "display: block; font-weight:lighter; font-size:x-small;",
                target : "_blank"
            }, container, "last");
            
            dojo.connect(rssIcon, "onclick", function(e) {
                dojo.stopEvent(e);
                window.open("http://alertes-leboncoin.appspot.com/feed?url=" + encodeURIComponent(document.URL) + "&days=1&_action_rss=RSS");
            });
            
            new dijit.Tooltip({
                connectId: [rssIcon],
                label: "Cliquez ici pour générer un flux RSS pour cette recherche.<br/>Vous pourrez l'utiliser pour surveiller les annonces <br/>correspondant à vos critères sur les dernières <em>24 heures</em>.",
                position: "left,below"
            });
        }
    });
}, 'false');