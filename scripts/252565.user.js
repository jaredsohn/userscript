// ==UserScript==
// @name       Destiny.gg Chat GreenText
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Properly greentext chat messages
// @match      http://www.destiny.gg/embed/chat
// @copyright  2012+, hephaestus
// ==/UserScript==

if(destiny){
// Green Text formatter
destiny.fn.GreenTextFormatter = function(chat){
    return this;
}
destiny.fn.GreenTextFormatter.prototype.format = function(str, user){
    var loc = str.indexOf("&gt;") // cheap
    if(loc != -1 && loc == 0){
        // without a css class
        str = '<span style="color:#789922">'+str+'</span>';
        // with a css class
        //str = '<span class="greentext">'+str+'</span>';
        //console.log("formatting greentext")
    }
    return str;
}
destiny.chat.gui.formatters.push(new destiny.fn.GreenTextFormatter(destiny.chat.gui));
}