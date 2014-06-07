// ==UserScript==
// @name           WoL Gnome
// @namespace      maiku@maikumori.com:wol-gnome
// @description    A tiny gnome who adds new features and to WoL website.
// @include        http://www.worldoflogs.com/*
// @include        http://worldoflogs.com/*
// ==/UserScript==
// ==Globals== 

var $, pageHandlers, specs, armoryIcon;

//Let's hijack jQuery.
$ = unsafeWindow.jQuery;

//Each page can have one of more page handlers.
pageHandlers = [];

//Maps spec names to spec type. Maybe should rewrite to use this format:
//http://raidbots.com/ClassHelper.class.phps
specs = {
    "Frost" : "dps",
    "Unholy" : "dps",
    "Balance"  : "dps",
    "Feral/Cat" : "dps",
    "Beast Mastery" : "dps",
    "Marksmanship" : "dps",
    "Survival" : "dps",
    "Arcane" : "dps",
    "Fire" : "dps",
    "Retribution" : "dps",
    "Shadow" : "dps",
    "Assassination" : "dps",
    "Combat" : "dps",
    "Subtlety" : "dps",
    "Elemental" : "dps",
    "Enhancement" : "dps",
    "Affliction" : "dps",
    "Demonology" : "dps",
    "Destruction" : "dps",
    "Arms" : "dps",
    "Fury" : "dps",
    
    "Restoration" : "healer",
    "Holy" : "healer",
    "Discipline" : "healer",
    
    "Blood" : "tank",
    "Protection" : "tank",
    "Feral/Bear" : "tank"
};

/*
    Page handlers
    =============
*/

//Modified code from sp00n (http://userscripts.org/scripts/show/115860)
//Adds icon with link to armory to rankning overview page and subpages.
function ph_rankings() {
    var rows = $(".playerRankMixed").find("tr");
    rows.each(function(k, row) {
        var rank, name, server, guild, region, link, img;
        //Should now work on overview page as well.
        rank = $(row).find("td:first:has('span')");
        if (rank.length < 1) return true;

        name   = rank.next().children().html().toLowerCase();
        guild  = rank.nextAll().eq(3).children().html().toLowerCase();
        server = rank.nextAll().eq(4).children().html().toLowerCase();

        //Server: two first letters are region, followd by a dash.
        region = server.substr(0, 2);
        server = server.substr(3).replace(/\s/g, "-");

        link   = "http://" + region + ".battle.net/wow/en/character/" +
                           server + "/" + name + "/advanced";

        //Build the link.
        img = $("<img \>").attr({
            "src"  : armoryIcon,
            "style": "position: relative; top: 2px; padding-right: 4px;"
        })
        //Add it to the DOM.
        rank.next().prepend($("<a>").attr({
            "href"  : link,
            "target": "_blank"
        }).html(img));
    });
}
registerPageHandler(/^\/rankings\/players\/.*$/i,  ph_rankings);

//Ads a overview table for each role with average performance to the ranking
//info page.
function ph_rankInfo() {
    var i, rows, total_bosses, raiders, len, ef_container, ef_row_tpl, ef_table;
    raiders = {
        "dps"    : [],
        "healer" : [],
        "tank"   : []
    };
    total_bosses = $(".playerdata").length;
    rows         = $(".playerdata tr:not(:first-child)");
    
    //Gather information about players.
    for (i = 0, len = rows.length; i < len; i++) {
        var row, nick, effectiveness, spec_type;
        
        row           = rows[i];
        nick          = $(".actor span", row)[0].innerHTML;
        effectiveness = parseFloat($(":nth-child(10)", row)[0]
                                       .innerHTML.slice(0, -1));
        spec_type     = specs[$(":nth-child(2)", row)[0]
                              .innerHTML.split(" ")[0]];
        //Array turned into dictionary for easier lookups.
        if (raiders[spec_type][nick] !== undefined) {
            raiders[spec_type][raiders[spec_type][nick]].data
                                                        .push(effectiveness);
            raiders[spec_type][raiders[spec_type][nick]].sum += effectiveness;    
        } else {  
            raiders[spec_type].push({
                "nick" : nick,
                "sum"  : effectiveness,
                "data" : [effectiveness]
            });
            
            raiders[spec_type][nick] = raiders[spec_type].length - 1;
        }
    }
    
    //Build the overview table.
    ef_container = document.createElement('div');
    ef_row_tpl = template('<tr bgColor="{{ color }}">'+
                                '<td class="n">{{ nick }}</td>'        +
                                '<td>{{ effectiveness }}%</td>'        +
                                '<td class="n"> {{boss_count}}</td>'   +
                              '</tr>');
    
    ef_container.style.overflow = "auto";
    ef_container.style.width = "100%";
    
    for (spec_type in raiders) {
        raiders[spec_type].sort(function(a, b){
            return (b.sum / b.data.length) - (a.sum / a.data.length);
        });
        
        ef_table                = document.createElement('table');
        ef_table.className      = "debug playerdata";
        ef_table.style.cssFloat = "left";
        
        ef_table.innerHTML += "<tr><th colspan=3>"                     +
                                spec_type.charAt(0).toUpperCase()      +
                                spec_type.slice(1)                     +
                                (spec_type == "dps" ? "": "s")         +
                              "</th></tr><tr>"                         +
                                "<th>Player</th>"                      +
                                "<th>Avg Effectiveness</th>"           +
                                "<th>Fights participated</th>"         +
                              "</tr>";
        
        for (i = 0, len = raiders[spec_type].length; i < len; i++) {
            ef_table.innerHTML += ef_row_tpl({
                nick : raiders[spec_type][i].nick,
                effectiveness : (raiders[spec_type][i].sum /
                                 raiders[spec_type][i].data.length).toFixed(2),
                boss_count: raiders[spec_type][i].data.length,
                color: (raiders[spec_type][i].data.length != total_bosses) ?
                        "#292929" : ""
            });
        }
        
        ef_container.appendChild(ef_table);    
    }
    
    //Add it after first header.
    $("h1:first").after(ef_container);   
}
registerPageHandler(/^\/reports\/[-a-z0-9]*\/rankinfo\/.*$/i,  ph_rankInfo);

/*
    Main function
    =============
*/

function main() {
    var i, urlRegEx;
    //Dispatch
    //Try catch for debugging in Firefox.
    try {
        for(i = 0; i < pageHandlers.length; i++ ) {
            urlRegEx = pageHandlers[i].urlRegEx;
            if(urlRegEx === null || urlRegEx.test(document.location.pathname)) {
                pageHandlers[i].handler();
            }
        }
    } catch (e) {
        console.log(e)
    }
};

//Launch main function as soon as we can use jQuery.
if (typeof(unsafeWindow.jQuery) != 'undefined') {
    $(function() {
        main();
    });
}

/*
    Helper functions
    ================
*/

//TO-DO: Use jQuery template instead.
//From underscore.js
function template(str, data) {
    var c, tmpl, func;
    c  = {
        evaluate    : /\{([\s\S]+?)\}/g,
        interpolate : /\{\{(.+?)\}\}/g,
        escape      : /<%-([\s\S]+?)%>/g
    };
    
    tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape, function(match, code) {
           return "',_.escape(" + code.replace(/\\'/g, "'") + "),'";
         })
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
         
    func = new Function('obj', tmpl);
    
    return data ? func(data) : func;
};
//Register function as page handler.
function registerPageHandler(urlRegEx, handler) {
    pageHandlers.push({
        "urlRegEx" : urlRegEx,
        "handler"  : handler
    });
};

/*
    Binary data
    ===========
*/

armoryIcon = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHB" +
             "gkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6" +
             "Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc" +
             "3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAMAAwDASIAAh" +
             "EBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgIE/8QAIRAAAgEDBAMBAAAAAAAAA" +
             "AAAAQMCBAURAAYSIUFRYYH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAIBEAAAQG" +
             "AwAAAAAAAAAAAAAAAAECQQMREhMhIjFxof/aAAwDAQACEQMRAD8AxsrK+us4TbG" +
             "cVxLYlaxgRIiJQAH3OPveiW56xtvvLqNMlyikRiSwczy4jPcs+c9au63yt29VNR" +
             "bjAQZODjzGcSicj896VbT2va9yWeN5uy2NrKxk2MImQAc4wB660BUW3sspoYu8+" +
             "BNDFy4//9k=";