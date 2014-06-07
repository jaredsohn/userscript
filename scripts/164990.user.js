// ==UserScript==
// @name       Simple Highlighter
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Make Simple Highlighter - Chrome extension look better. Remember to adjust colors in the settings of the extension.
// @match      http://*/*
// @copyright  2013, Wilhelm Matilainen
// @require http://code.jquery.com/jquery.min.js
// ==/UserScript==

function fixHighlights(event){
    var me = $(event.target);
    var myClass = me.attr('class');    
    
    if(myClass === undefined)
        return;
    
    if(me.attr('class').match('simplehl') === null)
        return;
        
    var color = me.css('background-color').match(/[\d\.]+/g);
    
    if(color === null)
        return;
    
    var bgcolor = color[0] + ',' + color[1] + ',' + color[2];
        
    me.attr('style', 'padding: 0 0.2em 0.2em 0.2em !important; border-radius: 2px 2px 6px 6px !important; background-color: rgba(' + bgcolor + ',1) !important');
}

$(document).on('DOMNodeInserted', function(event){
    setTimeout(function(){fixHighlights(event);}, 200);
});