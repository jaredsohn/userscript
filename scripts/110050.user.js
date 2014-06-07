// ==UserScript==
// @name           kraut_linkify
// @namespace      kraut
// @include        http://krautchan.net/b/*
// @version 1
// ==/UserScript==

var jQuery;
kraut_linkify = function(){
    if((typeof jQuery === "undefined") || (typeof document.addSetting === "undefined")){
        window.setTimeout("kraut_linkify()", 50);
        return;
    }
    document.addSetting("linkify", true, "bool", "Textlinks umwandeln");
    if(document.getSetting("linkify", true)){
        jQuery('blockquote>p:not(.linkify)').each(function(){
        var n = jQuery(this);
        var html = n.html();
        html = html.replace(/(^|\s|\>)(www\..+?\..+?)(\s|$)/g, '$1<a href="http://anonym.to/?http://$2">$2</a>$3').replace(/(^|\s|\>)(((https?|ftp):\/\/|mailto:).+?)(<|\s|$)/g, '$1<a href="http://anonym.to/?$2">$2</a>$5');
        jQuery(n).html(html).addClass('linkify');
     });
    }
}
script=document.createElement("script");
script.textContent="kraut_linkify = "+kraut_linkify.toString()+";kraut_linkify();"
document.body.appendChild(script);

