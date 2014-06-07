// ==UserScript==
// @name           Buffed.de: Database Links
// @namespace      http://www.ginchen.de
// @include        http://wowdata.buffed.de/?i=*
// @include        http://wowdata.buffed.de/?n=*
// @include        http://wowdata.buffed.de/?q=*
// ==/UserScript==



/***** Functions *****/

function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if(results == null) {
        return "";
    } else {
        return results[1];
    }
}

function getElementsByClass(node, searchClass, tag) {
    var classElements = new Array();
    var els = node.getElementsByTagName(tag);
    var pattern = new RegExp('\\b'+searchClass+'\\b');
    for(var i = 0; i < els.length; i++) {
        if(pattern.test(els[i].className)) {
            classElements[classElements.length] = els[i];
        }
    }
    return classElements;
}



/***** Main part *****/

var box;

if(location.href.match(/\?i=(\d+)/)) {

    var theitemid = gup("i");
    box = getElementsByClass(document, 'headline1', 'h1');
    box = box[0];
    var vorher = box.innerHTML;
    var nachher = vorher;
    nachher = vorher + '<b>Links:</b> <a alt="Thottbot" target="_blank" href="http://thottbot.com/i'+ theitemid +'"><img align="bottom" src="http://i.thottbot.com/Thottbot.ico" /></a> <a target="_blank" href="http://www.wowhead.com/?item='+ theitemid +'"><img alt="Wowhead" align="bottom" src="http://www.wowhead.com/favicon.ico" /></a> <a target="_blank" href="http://wow.allakhazam.com/db/item.html?witem='+ theitemid +'"><img alt="Allakhazam" align="bottom" src="http://wow.allakhazam.com/favicon.ico" /></a>';

} else if(location.href.match(/\?n=(\d+)/)) {

    var theitemid = gup("n");
    box = getElementsByClass(document, 'headline1', 'h1');
    box = box[0];
    var vorher = box.innerHTML;
    var nachher = vorher;
    nachher = vorher + ' <a target="_blank" href="http://thottbot.com/c'+ theitemid +'"><img alt="Thottbot" align="bottom" src="http://i.thottbot.com/Thottbot.ico" /></a> <a target="_blank" href="http://www.wowhead.com/?npc='+ theitemid +'"><img alt="Wowhead" align="bottom" src="http://www.wowhead.com/favicon.ico" /></a> <a target="_blank" href="http://wow.allakhazam.com/db/mob.html?wmob='+ theitemid +'"><img alt="Allakhazam" align="bottom" src="http://wow.allakhazam.com/favicon.ico" /></a>';
    
} else if(location.href.match(/\?q=(\d+)/)) {

    var theitemid = gup("q");
    box = getElementsByClass(document, 'headline1', 'h1');
    box = box[0];
    var vorher = box.innerHTML;
    var nachher = vorher;
    nachher = vorher + ' <a target="_blank" href="http://thottbot.com/q'+ theitemid +'"><img alt="Thottbot" align="bottom" src="http://i.thottbot.com/Thottbot.ico" /></a> <a target="_blank" href="http://www.wowhead.com/?quest='+ theitemid +'"><img alt="Wowhead" align="bottom" src="http://www.wowhead.com/favicon.ico" /></a> <a target="_blank" href="http://wow.allakhazam.com/db/quest.html?wquest='+ theitemid +'"><img alt="Allakhazam" align="bottom" src="http://wow.allakhazam.com/favicon.ico" /></a>';

}

box.innerHTML = nachher;