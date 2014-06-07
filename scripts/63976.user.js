// ==UserScript==
// @name           Wowhead Tooltip Links
// @namespace      Wowhead
// @include        http://*.wowhead.com/item=*
// @include        http://*.wowhead.com/npc=*
// @include        http://*.wowhead.com/object=*
// @include        http://*.wowhead.com/quest=*
// @include        http://*.wowhead.com/spell=*
// @include        http://*.wowhead.com/zone=*
// ==/UserScript==

function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "\/"+name+"=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if(results == null) {
        return "";
    } else {
        return results[1];
    }
}

h1 = document.getElementsByTagName("h1")[1];
title = h1.innerHTML;
tagPattern = /<\/?[^>]+>/g;
title = title.replace(tagPattern, '');
title = title.replace(/"/g, '&quot;')

suchtext = "";
icon = "";

if(gup("item")) {

    for(i=0; i<document.getElementsByTagName("script").length; i++) {
        suchtext = suchtext + document.getElementsByTagName("script")[i].innerHTML;
    }
    var Suche = /\('[a-z0-9]*'\).appendChild\(Icon.create\('(.*)',/;
    var Ergebnis = Suche.exec(suchtext);
    if(Ergebnis) icon = Ergebnis[1].toLowerCase();

    id = gup("item");
    box = document.getElementById("tt" + id);
    b = box.getElementsByTagName("b");
    quality = b[0].getAttribute("class");
    link = '<a rel=&quot;external&quot; href=&quot;' + window.location.href.replace(/"/g, '&quot;') + '&quot; class=&quot;' + quality + ' icontiny&quot; style=&quot;padding-left: 18px; background: left center no-repeat; background-image: url(http://static.wowhead.com/images/wow/icons/tiny/' + icon + '.gif);&quot;>' + title + '</a>';
    
} else {

    if(gup("npc") || gup("zone") || gup("object")) {
        
        if(gup("npc")) {
            
            id = gup("npc");
            
        } else if(gup("zone")) {
            
            id = gup("zone");
            
        } else if(gup("object")) {
            
            id = gup("object");
            
        }
        
        link = '<a rel=&quot;external&quot; href=&quot;' + window.location.href.replace(/"/g, '&quot;') + '&quot;>' + title + '</a>';
        
    } else {
        
        if(gup("quest")) {
            
            questicon = "";
            for(i=0; i<document.getElementsByTagName("script").length; i++) {
                suchtext = suchtext + document.getElementsByTagName("script")[i].innerHTML;
            }
            var Suche = /tooltip_dailyquest/;
            if(Suche.test(suchtext)) {
                questicon = "_daily";
            }            
            
            id = gup("quest");
            link = '<a rel=&quot;external&quot; href=&quot;' + window.location.href.replace(/"/g, '&quot;') + '&quot; class=&quot;quest icontiny&quot; style=&quot;padding-left: 18px; background: left center no-repeat; background-image: url(http://static.wowhead.com/images/icons/tiny/quest_start' + questicon + '.gif);&quot;>' + title + '</a>';
            
        } else if(gup("spell")) {
            
            id = gup("spell");
            link = '<a rel=&quot;external&quot; href=&quot;' + window.location.href.replace(/"/g, '&quot;') + '&quot; class=&quot;quest&quot;>' + title + '</a>';
            
        } else if(gup("achievement")) {
            
            for(i=0; i<document.getElementsByTagName("script").length; i++) {
                suchtext = suchtext + document.getElementsByTagName("script")[i].innerHTML;
            }
            var Suche = /\('[a-z0-9]*'\).appendChild\(Icon.create\('(.*)',/;
            var Ergebnis = Suche.exec(suchtext);
            if(Ergebnis) icon = Ergebnis[1].toLowerCase();
            
            id = gup("achievement");
            link = '<a rel=&quot;external&quot; href=&quot;' + window.location.href.replace(/"/g, '&quot;') + '&quot; class=&quot;quest icontiny&quot; style=&quot;padding-left: 18px; background: left center no-repeat; background-image: url(http://static.wowhead.com/images/icons/tiny/' + icon + '.gif);&quot;>' + title + '</a>';
            
        }
        
    }
    
}

h1.innerHTML = h1.innerHTML + ' <input type="text" value="' + link + '" onclick="this.select()" style="width: 400px;" />';