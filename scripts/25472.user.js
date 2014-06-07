// ==UserScript==
// @name         Nexus War People Counter
// @namespace    http://wiki.nexuswar.com/index.php/Nexus_War_Utilities
// @description  Counts the number and status (ally, enemy, etc) of characters at your location.
// @include      http://*nexuswar.com/map/*
// ==/UserScript==

function countChars() {
    
    var singular_types = new Array;
    singular_types['ally'] = "ally";
    singular_types['neutral'] = "neutral";
    singular_types['faction'] = "factionmate";
    singular_types['hostile'] = "hostile";
    singular_types['enemy'] = "enemy";
    singular_types['friendly'] = "friendly";
    
    var plural_types = new Array;
    plural_types['ally'] = "allies";
    plural_types['neutral'] = "neutrals";
    plural_types['faction'] = "factionmates";
    plural_types['hostile'] = "hostiles";
    plural_types['enemy'] = "enemies";
    plural_types['friendly'] = "friendlies";
    
    var colors = new Array;
    colors['ally'] = "#38B549";
    colors['neutral'] = "#898989";
    colors['faction'] = "#91268F";
    colors['hostile'] = "#CC0000";
    colors['enemy'] = "#000000";
    colors['friendly'] = "#00AEEF";    

    var elem=document.getElementById('locdesc').innerHTML;
    p=document.getElementsByTagName("p");
    for(x = 0; x < p.length; x++) {
        if (p[x].innerHTML.match(/^There are (\d+?) others here: /)) {
            var others = RegExp.$1
            
            var types = new Array();
            
            function target(name, level, html)
            {
              this.name = name;
              this.level = parseInt(level);
              this.html = html;
            }
            
            function sortByLevel(a, b)
            {
              var x = a.level; var y = b.level;
              return ((x < y) ? 1 : ((x > y) ? -1 : ((a.name == b.name)?0:((a.name > b.name)?1:-1))));
            }
            
            s=p[x].getElementsByTagName("span");
            for(y = 0; y < s.length; y++) {
              var res = s[y].innerHTML.match(/<a class=\"(\w+?)\"/g);
              var type = RegExp.$1;
              if (type) {
                res = s[y].innerHTML.match(/a> \(([0-9]+?)\)<im/g);
                var lvl = RegExp.$1;
                res = s[y].innerHTML.match(/'\)\">([\w\W]+?)<\/a> \(/g);
                var name = RegExp["$1"].toLowerCase();
                if(types[type]==undefined)
                  {
                    types[type] = new Array();
                    types[type][0] = new target(name, lvl, s[y].innerHTML);
                    types[type]['count'] = 1;
                  }
                else
                  {
                    var id = types[type]['count'];
                    types[type][id] = new target(name, lvl, s[y].innerHTML);
                    types[type]['count']++;
                  }
              }
            }
            
            printout = ""; var i = 0;
            for(var type in types) {
              if(i == 0) 
                printout += "(";
              else
                printout += ", ";
              if(types[type]['count'] == 1)
                printout += "<font color=\"" + colors[type] + "\">1" + " " + singular_types[type] + "</font>";
              else
                printout += "<font color=\"" +colors[type] + "\">" + types[type]['count'] + " " + plural_types[type] + "</font>";
              i++;
            }
            if(i > 0)
              printout += ")";  
            printout += "</div>";
            for(var type in types) {
              printout += "<div>";
              if(types[type]['count'] == 1)
                printout += "<font color=\"" + colors[type] + "\">" + " " + singular_types[type] + "</font>: ";
              else
                printout += "<font color=\"" +colors[type] + "\">" + plural_types[type] + "</font>: ";
              
              types[type].sort(sortByLevel);
              
              for(z = 0; z < types[type]['count']; z++)
              {
                printout += "<span class=\"nowrap\">"+types[type][z].html+"</span>"+((types[type]['count']>z+1)?", ":".");
              }
              printout += "</div>";
            }
            
            p[x].innerHTML = "<div>There are " + s.length + " others here " + printout;
            return;
        }
    }
}

countChars();