// ==UserScript==
// @name           Travian Time Line
// @namespace      TravianTL
// @version        0.27
// @description    Adds a time line on the right of each page to show events that have happened or will happen soon. Also adds a few other minor functions. Like: custom sidebar; resources per minute; ally lines; add to the villages list; colored marketplace.

// @include        http://*.travian*.*/*.php*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// @exclude        http://help.travian*.*
// @exclude        http://*.travian*.*/manual.php*

// @author         bcmpinc
// @author         arandia
// @license        GPL 3 or any later version
// ==/UserScript==

/*****************************************************************************
 * Copyright (C) 2008, 2009 Bauke Conijn, Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org.licenses/>
 *****************************************************************************/


// This script improves the information provided by Travian. For example: by adding 
// a timeline that shows different events like completion of build tasks and the 
// arrival of armies. It does this by modify the html of the page.
//
// This script is completely passive, so it does not click links automatically or 
// send http requests. This means that for certain data to be collected you have to 
// read your reports and watch your ally page and allies profiles.
// 
// This script can be combined with other scripts:
//  - If you have the 'Travian Task Queue'-script, you can click on the timeline to 
//    automatically enter the schedule time.
//  - If you have the 'Travian Beyond'-script, additional villages will also get an 
//    attack and a merchant link button. (Currently you have to add these additional 
//    villages in the scripts source code.)


try {
    script_start_time = new Date().getTime();

    //////////////////////////////////////////
    //  SCRIPT CONFIG  ( DEFAULT SETTINGS ) //
    // You can modify them whatever you like//
    //   however, they will be overwritten  //
    //        by any in-game settings       //
    //////////////////////////////////////////

    // Debug functions...
    var d_none=-1, d_highest=0, d_hi=1, d_med=2, d_low=3, d_lowest=4, d_all=4;
    /* d_none is for the final release - don't forget to set it before uploading
    var d_level=d_highest;/*/
    var d_level=d_all;//*/

    /*************************************************
     * Provides basic debugging
     *************************************************/
    function debug(lvl, msg){
        if (lvl <= d_level) GM_log("\n"+msg);
        //if (unsafeWindow.console) unsafeWindow.console.log(msg); // firebug logging
    }

    /*************************************************
     * Shortcut to debug at the highest level
     *************************************************/
    function dbg(msg){
        debug(d_highest, msg);
    }

    USERNAME = "someone";               // your username
    RACE = 1;                           // Your race (0=Romans, 1=Teutons, 2=Gauls)

    USE_TIMELINE = true;                // enable the timeline.
    USE_ALLY_LINES = true;              // Draw lines on the area map to allies.
    USE_CUSTOM_SIDEBAR = true;          // Modify the links in the sidebar.
    USE_MARKET_COLORS = true;           // Color the market offers to quickly determine their value.
    USE_ENHANCED_RESOURCE_INFO = true;  // Add resource/minute and resources on market to the resource bar.
    USE_EXTRA_VILLAGE = true;           // Add additional vilages to the vilage list.
    USE_SETTINGS = true;                // Enable settings menu and use settinge stored by GM_setValue.
    USE_VILLAGE_TITLE_TEXT = true;      // List future events for a village in its title-text

    USE_SERVER_TIME = false;            // Use the server time instead of the local clock. Requires a 24 hours clock.
    USE_DEBUG_MODE = false;             // Makes the script throw an alert when something bad happened.
    SHOW_TIMELINE_REPORT_INFO = true;   // Show the size of the army, the losses and the amount of resources stolen.
    COLLAPSE_TIMELINE = false;          // Make the timeline very small by default

    REMOVE_PLUS_BUTTON = true;  // Removes the Plus button
    REMOVE_PLUS_COLOR = true;   // De-colors the Plus link (needs USE_CUSTOM_SIDEBAR)
    REMOVE_TARGET_BLANK = true; // Removes target="_blank", such that all sidebar links open in the same window.
    REMOVE_HOME_LINK = true;    // Redirects travian image to current page instead of travian homepage.

    FIX_TIMELINE = false;       // Keep timeline on the same position when scrolling the window.

    TIMELINE_SIZES_HISTORY    =   90; // minutes +/- 15 min, for aligning. This is the amount that is displayed.
    TIMELINE_SIZES_FUTURE     =   90; // minutes. The amount displayed
    TIMELINE_DISTANCE_HISTORY =  270; // minutes, the distance that can be scrolled backwards in history (from 0).
    TIMELINE_SIZES_HEIGHT     =    5; // pixel height of one minute.
    TIMELINE_SIZES_WIDTH      =  400; // width of the timeline (in pixels)
    TIMELINE_COLLAPSED_WIDTH  =   60; // width of the timeline when collapsed (in pixels)
    TIMELINE_COLLAPSE_SPEED   = 1500; // collapse fade speed in pixels per second.
    TIMELINE_COLLAPSE_RATE    =   50; // updates of the collapse fade per second.
    TIMELINE_COLOR            = "rgba(255, 255, 204, 0.5)"; // Background color of the timeline
    TYPE_BUILDING=0; TYPE_ATTACK=1; TYPE_REPORT=2; TYPE_MARKET=3; TYPE_RESEARCH=4; TYPE_PARTY=5; // The types of events
    BUILDING_COLOR='rgb(0,0,0)'; ATTACK_COLOR='rgb(255,0,0)'; REPORT_COLOR='rgb(155,0,155)';
    MARKET_COLOR='rgb(0,155,0)'; RESEARCH_COLOR='rgb(0,0,255)'; PARTY_COLOR='rgb(255,155,155)';

    KEEP_TIMELINE_UPDATED = false;    // Update the timeline every 'TIMELINE_UPDATE_INTERVAL' msec.
    TIMELINE_UPDATE_INTERVAL = 30000; // Interval between timeline updates in msec.
    TIMELINE_SCALE_WARP = false;      // Use cubic transformation on the timeline to make events close to 'now' have more space than events far away.

    TIME_DIFFERENCE = 0; // server time - local time

    SIDEBAR_HR = true;      // Use <hr> to seperate sidebar sections instead of <br>

    // Numbers for original sidebar links
    //-1: -- break --
    // 0: Home
    // 1: Instructions
    // 2: Profile
    // 3: Log out
    // 4: Forum
    // 5: Chat
    // 6: Travian Plus
    // 7: Support

    // Original sidebar links
    // SIDEBAR_LINKS = [0,1,2,3,-1,4,5,-1,6,7];

    SIDEBAR_LINKS = [ 1,["FAQ", "http://help.travian.nl/"],
                      ["Travian Forum", "http://forum.travian.nl"],
                      ["Wiki","http://wiki.travianteam.com/mediawiki/index.php/"],
                      -1,
                      2,
                      ["Alliance Forum", "/allianz.php?s=2"],
                      //["Alliantie Forum", "http://www.external-travian-forum.com/"],
                      ["Alliance Overview", "allianz.php"],
                      -1,
                      ["Barracks", "/build.php?gid=19"],
                      ["Stable", "/build.php?gid=20"],
                      ["Workshop", "/build.php?gid=21"],
                      ["Marketplace", "/build.php?gid=17"],
                      ["Rally Point", "/build.php?gid=16"],
                      -1,
                      6,
                      7 
                      ];//*/

    SPECIAL_LOCATIONS = []; // Draws lines to these locations on the map.

    DEBUG_SIDEBAR = false;       // Append original sidebar links, with index numbers

    // These villages are added to the villages list 
    // (without link, but travian beyond will recognize them and add attack and merchant links)
    VILLAGES = [];  

    //////////////////////////////////////////
    //  LOAD IN-GAME SETTINGS               //
    //////////////////////////////////////////

    var url = location.href.match("//(\\w+)\\.travian.(\\w+)/");
    var gm_prefix = url[1]+'.'+url[2]+'.';
    var travian_world_analyzer_server_code = url[2]+(url[1]=='speed'?'x':url[1].substr(1));
    var tl_scroll_offset = 0; // This is how far the timeline has been offset by scrolling, in minutes
    function prefix(s) {
        return gm_prefix+s;
    }

    // I think this is pretty self-explanitory... we can't update the timeline from here, though... :(
    GM_registerMenuCommand('Travian Timeline: Clear all events', function(e){
            events = {};
            GM_setValue(prefix("TIMELINE"), uneval(events));
        });

    window.addEventListener('load', main, false); // Run everything after the DOM loads!

    function set_basic_settings(){  
        var saved_settings=["USERNAME", "RACE",
                      
                            "SPECIAL_LOCATIONS","VILLAGES","USE_TIMELINE","USE_ALLY_LINES",
                            "USE_CUSTOM_SIDEBAR","USE_MARKET_COLORS","USE_ENHANCED_RESOURCE_INFO",
                            "USE_EXTRA_VILLAGE","USE_SERVER_TIME","USE_DEBUG_MODE", 
                            "SHOW_TIMELINE_REPORT_INFO", "COLLAPSE_TIMELINE",
                      
                            "TIMELINE_SIZES_HISTORY","TIMELINE_SIZES_FUTURE", "TIMELINE_DISTANCE_HISTORY",
                            "TIMELINE_SIZES_HEIGHT", "TIMELINE_SIZES_WIDTH", "TIME_DIFFERENCE",
                            "TIMELINE_COLLAPSED_WIDTH", "TIMELINE_COLOR", "KEEP_TIMELINE_UPDATED",
                            "TIMELINE_SCALE_WARP",

                            "BUILDING_COLOR", "ATTACK_COLOR", "REPORT_COLOR",
                            "MARKET_COLOR", "RESEARCH_COLOR", "PARTY_COLOR"
                            ];

        for (i in saved_settings) {
            var v = saved_settings[i];
            x = GM_getValue(prefix(v));    
            if (x!==undefined && x!=="") {
                try {
                    eval(v+"="+x);
                } catch (e) {
                    eval(v+"=x");      
                }
            }
        }
        TIMELINE_EVENT_COLORS = [BUILDING_COLOR, ATTACK_COLOR, REPORT_COLOR, MARKET_COLOR, RESEARCH_COLOR, PARTY_COLOR];
    } /* USE_SETTINGS */

    //////////////////////////////////////////
    //  SCRIPT CODE                         //
    //////////////////////////////////////////

    //////////////////////////////////////////
    //  JAVASCRIPT ENHANCEMENTS             //
    //////////////////////////////////////////

    // Get relative position of a dom element
    // Modified to work in the used situation.USE_SERVER_TIME
    function getPos(obj) {
        var w = obj.offsetWidth;
        var h = obj.offsetHeight;
        var l = obj.offsetLeft;
        var t = obj.offsetTop;
        return [l,t,w,h];
    }

    // Remove a DOM element
    function remove(el) {
        el.parentNode.removeChild(el);
    }

    // Create a repeat-string-N-times method for all String objects
    String.prototype.repeat = function(n) {
        var s = "";
        while (--n >= 0) {
            s += this;
        }
        return s;
    }

    String.prototype.pad = function(n) {
        n = n-this.length;
        if (n<=0) return this;
        return this+" ".repeat(n);
    }

    function tl_date(){
        this.date = new Date();
        this.date.setTime(this.date.getTime() + TIME_DIFFERENCE*3600000);
        this.date.setMilliseconds(0);
        this.start_time = this.date.getTime();

        this.set_time = function(time){
            // This takes time as [string, hours, minutes, seconds (optional), 'am' or 'pm' or '' (optional)].
            debug(d_low, 'Setting the time: '+time);

            // Can't understand why people use am/pm, it's so confusing..??
            if (time[time.length - 1] == 'am' || time[time.length - 1] == 'pm')
                if (time[1]==12) time[1]=0;
            if (time[time.length - 1] == 'pm') time[1] -= -12;
            
            this.date.setHours(time[1], time[2], (time[3] != undefined && time[3].match('\\d')) ? time[3] : 0);

            return this.date.getTime();
        }

        this.set_day = function(day){
            // day is [day, month, year (optional)]. Month is 1-12.
            debug(d_low, 'Setting the day: '+day);

            this.date.setFullYear(day[2] == undefined ? this.date.getFullYear() : '20'+day[2], day[1] - 1, day[0]);

            return this.date.getTime();
        }

        this.adjust_day = function(duration){
            // The idea with this is to compare a duration value with the current day/time, and adjust the day for every 24 hours in duration.
            // duration is of type [string, hours, ....].
            debug(d_low, 'Adjusting the day by: '+duration);

            this.date.setDate(this.date.getDate() + Math.floor(duration[1]/24));

            // Cover the wrap-around cases. If an event has a duration, then it must be in the future. Hence, if the time we've set for it
            // is in the past, we've done something wrong and it's probably a midnight error.
            // This check needs to be done carefully as otherwise some events will get pushed 24 hours father into the future than they should be.
            if (this.date.getTime() < this.start_time-600000) this.date.setDate(this.date.getDate() + 1);

            return this.date.getTime();
        }
    }

    Math.sinh = function(x) { 
        return .5*(Math.exp(x)-Math.exp(-x));
    }
    Math.cosh = function(x) { 
        return .5*(Math.exp(x)+Math.exp(-x));
    }
    Math.arsinh = function(x) { 
        return Math.log(x+Math.sqrt(x*x+1));
    }
    Math.arcosh = function(x) { 
        return Math.log(x+Math.sqrt(x*x-1));
    }

    //////////////////////////////////////////
    //  OPTIONS SCREEN                      //
    //////////////////////////////////////////
    function set_options_screen(){
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = "2";
        var right = TIMELINE_SIZES_WIDTH;
        if (COLLAPSE_TIMELINE) right = TIMELINE_COLLAPSED_WIDTH;
        if (!USE_TIMELINE) right = 0;
        right+=5;
        div.style.right = right+"px";
        div.style.top = "-5px";
        div.style.MozBorderRadius = "6px";
        div.style.padding = "3px";
        div.style.border = "1px solid #999";
        div.style.background = "#ccc";
        div.innerHTML = "<a href=\"#\" style=\"color: blue; font-size: 12px;\">Travian Time Line Settings</a>";
        document.body.appendChild(div);
  
        // The settings/options window is only generated when needed.
        function settings() {
            var div = document.createElement("div");
            div.style.position = "fixed";
            div.style.zIndex = "250";
            div.style.left = "0px";
            div.style.top = "0px";
            div.style.right = "0px";
            div.style.bottom = "0px";
            div.style.background = "rgba(192,192,192,0.8)";
            div.innerHTML = '<div style="position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; cursor: pointer;"></div>'+
                '<div style="position: absolute; left: 50%; top: 50%;">'+
                '<pre id="TL_MENU" style="position: absolute; left: -300px; top: -250px; width: 600px; height: 450px;'+
                ' border: 3px solid #000; background: #fff; overflow: auto; padding: 8px;">'+
                '</pre></div>';
            document.body.appendChild(div);
    
            var box = div.childNodes[1].firstChild;
    
            var uses = "";
            function using(n, v) {
                uses+='[<span style="cursor: pointer; color: '+(eval(v)?'green':'red')+'" id="TL_'+v+'">'+n+"</span>]";
            }
            using("timeline", "USE_TIMELINE");
            using("ally lines", "USE_ALLY_LINES");
            using("custom sidebar", "USE_CUSTOM_SIDEBAR");
            using("market colors", "USE_MARKET_COLORS");
            uses+='==\n==';
            using("enhanced resource info", "USE_ENHANCED_RESOURCE_INFO");
            using("extra village", "USE_EXTRA_VILLAGE");
            using("debug mode", "USE_DEBUG_MODE");
            uses+='==\n==';
            using("collapse timeline", "COLLAPSE_TIMELINE");
            using("timeline extended info", "SHOW_TIMELINE_REPORT_INFO");
            uses+='==\n==';
            using("use server time", "USE_SERVER_TIME");
            uses+="(use a 24 hours clock)";
            uses+='==\n==';
            using("keep timeline updated", "KEEP_TIMELINE_UPDATED");
            using("warp timeline scale", "TIMELINE_SCALE_WARP");
    
            var race='<select id="tl_RACE">';
            for (var i=0; i<3; i++) {
                race+='<option value="'+i+'"';
                if (i==RACE) race+='selected="" ';
                race+='>'+['Romans', 'Teutons', 'Gauls'][i]+'</option>';
            }
            race+='</select>';
    
            var sizeoptions='';
            function tlo(n, v, nn) {
                if (!nn)
                    nn="TIMELINE_SIZES_"+n;
                sizeoptions += "    "+n.pad(16)+' = <input id="TL_'+nn+'" value="'+eval(nn)+'"/> '+v+'\n';
            }
            tlo("WIDTH","px");
            tlo("COLLAPSED","px","TIMELINE_COLLAPSED_WIDTH");
            tlo("HEIGHT","px/min");
            tlo("HISTORY","min");
            tlo("FUTURE","min");
            tlo("SAVED HISTORY", "min", "TIMELINE_DISTANCE_HISTORY");
    
            box.innerHTML = '<div style="text-align: center;">=='+uses+'==</div>'+
                '<i>Leave input fields empty to use the default value.</i><hr/>'+
                'USERNAME = <input id="TL_USERNAME" value="'+USERNAME+'"/>\n'+
                'RACE     = '+race+'\n'+
                'TIMELINE_SIZES:\n'+sizeoptions+'\n'+
                'TIME_DIFFERENCE = <input id="TL_TIME_DIFFERENCE" value="'+TIME_DIFFERENCE+'"/> hours (server time - local time)\n'+
                'TIMELINE_COLOR  = <input id="TL_TIMELINE_COLOR" value="'+TIMELINE_COLOR+'"/> (as in css)\n'+
                '<a href="#" style="color: blue" id="TL_EVENT_COLORS">EVENT COLORS</a>'+'\n'+
                'SPECIAL_LOCATIONS='+uneval(SPECIAL_LOCATIONS)+'\n'+
                'VILLAGES='+uneval(VILLAGES)+'\n'+
                '<hr/>'+'script duration: '+script_duration+'ms.\n';

            set_add_listeners(box);
            function set_add_listeners(box){
                var list = box.childNodes[0].childNodes;
                for (i in list) {    
                    var el = list[i];
                    function toggle(e) {
                        var el = e.target;
                        var id = el.id.substr(3);
                        var b = !eval(id);
                        eval(id+"="+b);
                        GM_setValue(prefix(id),b);
                        el.style.color = b?'green':'red';        
                    }
                    el.addEventListener("click",toggle,false);
                }
    
                var list = box.childNodes;
                for (i in list) {
                    var el = list[i];
                    function opt_change(e) {
                        var el = e.target;
                        var id = el.id.substr(3);
                        GM_setValue(prefix(id),eval(id+"='"+e.target.value+"'"));
                    }
                    el.addEventListener("change",opt_change,false);
                }

                // This replaces the contents of the box with the Colours menu...
                function set_colors_dialog(){
                    box = document.getElementById('TL_MENU');
                    base = box.innerHTML;
                    clr = '<i>Customize your event colours...</i>\n';

                    function add_color(display, event_name){
                        clr += display.pad(9)+'= <input id="TL_EVENT_'+event_name+'" value="'+eval(event_name)+'"/>\n';
                    }
                    add_color('BUILDING', 'BUILDING_COLOR');
                    add_color('ATTACK', 'ATTACK_COLOR');
                    add_color('REPORT', 'REPORT_COLOR');
                    add_color('MARKET', 'MARKET_COLOR');
                    add_color('RESEARCH', 'RESEARCH_COLOR');
                    add_color('PARTY', 'PARTY_COLOR');

                    clr += '\n<a href="#" style="color: blue" id="TL_MENU_BACK">BACK</a>\n';

                    box.innerHTML = clr;

                    document.getElementById('TL_MENU_BACK').addEventListener('click', function(e){
                            box.innerHTML = base;
                            set_add_listeners(box);
                        }, false);
                    colors = box.childNodes;
                    for (i in colors){
                        if (colors[i] == undefined) continue;
                        colors[i].addEventListener('change', function(e){
                                id = e.target.id.substr(9);
                                GM_setValue(prefix(id), eval(id+'="'+e.target.value+'"'));
                            }, false);
                    }
                }
                document.getElementById('TL_EVENT_COLORS').addEventListener('click', set_colors_dialog, false);
            }

            // We don't want to add this event listener multiple times... so don't include it in set_add_listeners().
            function remove_settings_dialog() {
                remove(div);
            }    
            div.firstChild.addEventListener("click",remove_settings_dialog,false);
        }
  
        var link = div.firstChild;
        link.addEventListener("click",settings,false);
  
    } /* USE_SETTINGS */

    //////////////////////////////////////////
    //  COLLECT SOME INFO                   //
    //////////////////////////////////////////
    function storeInfo(){
        // Meaning of GM Values: (Some of the variable names are in dutch, to stay compatible with older scripts) 
        //
        // DORP (dutch for village): 
        //      id of the current active village. It's 0 when only 1 village is available and does not always accurate.
        // 
        // MARKT (dutch for market):
        //      an array of length 4 containing the amount of resources currently available for sale on the marketplace. (might often be inaccurate)
        //
        // PRODUCTIE (dutch for production):
        //      an array of length 4 containing the production rates of resp. wood, clay, iron and grain. (amount produced per hour)
        //
        // ALLIANCE:
        //      dictionary (map) mapping the names of your ally's members to a list of it's villages. 

        none = "0,0,0,0";

        // Keep track of current city id
        x = location.href.match("newdid=(\\d+)");
        if (x!=null) {
            dorp_id=x[1]-0;
            GM_setValue(prefix("DORP"),dorp_id);
        } else {
            dorp_id=GM_getValue(prefix("DORP"),0);
        }

        // Store info about resources put on the market if availbale
        x = document.getElementById("lmid2");
        if (x!=null && x.innerHTML.indexOf("\"dname\"")>0) {
            var res = document.evaluate( "//table[@class='f10']/tbody/tr[@bgcolor='#ffffff']/td[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    
            var cnt = new Array(0,0,0,0);
    
            for ( var i=0 ; i < res.snapshotLength; i++ ){
                c = res.snapshotItem(i).textContent - 0;
                t = res.snapshotItem(i).firstChild.src.match("\\d") - 1;
                cnt[t] += c;
            }
            markt = eval(GM_getValue(prefix("MARKT"), "{}"));
            if (markt==undefined) markt={};
            markt[dorp_id]=cnt;
            GM_setValue(prefix("MARKT"), uneval(markt));
        }

        // Store info about production rate if available
        //function storeProductionRate(){
        if (location.href.indexOf("dorf1")>0) {
            var res = document.evaluate( "//div[@id='lrpr']/table/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            var prod = new Array(0,0,0,0);
    
            for ( var i=0 ; i < res.snapshotLength; i++ ){
                c = res.snapshotItem(i).childNodes[4].firstChild.textContent.match("-?\\d+") - 0;
                t = res.snapshotItem(i).childNodes[1].innerHTML.match("\\d")[0] - 1;
                prod[t] += c;
            }
            productie = eval(GM_getValue(prefix("PRODUCTIE"), "{}"));
            if (productie==undefined) productie={};
            productie[dorp_id]=prod;
            GM_setValue(prefix("PRODUCTIE"), uneval(productie));
        }

        // Load ally data
        //function captureAllianceData(){
        try {
            ally = eval(GM_getValue(prefix("ALLIANCE"), "{}"));
            if (ally==undefined) ally = {};
        } catch (e) {
            alert(e);
            ally = { };
        }    
        if (ally==undefined) ally2={};

        // Store list of your alliance members.
        if (location.href.indexOf("allianz")>0 && location.href.indexOf("s=")<0) {
            var res = document.evaluate( "//td[@class='s7']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            if (res.snapshotLength>0) {
                ally2= ally;
                ally = {}
                for ( var i=0 ; i < res.snapshotLength; i++ ){
                    x    = res.snapshotItem(i);
                    name = x.textContent;
                    id   = x.href.match("\\d+")[0];
                    cnt  = x.parentNode.parentNode.childNodes[5].textContent;
                    if (ally2[name] != undefined) {
                        y = ally2[name];
                        y[0] = id;
                        y[1] = cnt;
                        ally[name] = y;
                    } else {
                        // [id, pop, {city1: [city1,x,y],city2: [city2,x,y],...} ]
                        ally[name] = [id, cnt, {}];
                    }
                }
                GM_setValue(prefix("ALLIANCE"), uneval(ally));
            }
        } 

        // Get alliance member data
        if (location.href.indexOf("spieler")>0) {
            who = document.body.innerHTML.match("<td class=\"rbg\" colspan=\"3\">[A-Z][a-z]+ ([^<]+)</td>");
            if (who) {
                who = who[1];
                if (ally[who] != undefined || who == USERNAME) {
                    var res = document.evaluate( "//td[@class='s7']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                    cities = {};
                    for ( var i=0 ; i < res.snapshotLength; i++ ){
                        x    = res.snapshotItem(i);
                        name = x.textContent;
                        y    = x.parentNode.parentNode.childNodes[4].textContent.match("\\((-?\\d+)\\|(-?\\d+)\\)");
                        y[0] = name;none = "0,0,0,0";

                        y[1] -= 0;
                        y[2] -= 0;
                        cities[name] = y;
                    }
                    if (ally[who]==undefined) ally[who]=[0,0,{}];
                    ally[who][2] = cities;
                    GM_setValue(prefix("ALLIANCE"), uneval(ally));
                }
            }
        }
    }

    //////////////////////////////////////////
    //  ENHANCED RESOURCE INFO              //
    //////////////////////////////////////////
    function res_main(){
        head = document.getElementById("lres0");
        if (head!=null) {
            a="";
            head = head.childNodes[1].childNodes[0];
        
            cnt  = eval(GM_getValue(prefix("MARKT"),     "{}"))
                prod = eval(GM_getValue(prefix("PRODUCTIE"), "{}"));
            if (cnt !=undefined) cnt  = cnt [dorp_id];
            if (prod!=undefined) prod = prod[dorp_id];
            if (cnt ==undefined) cnt =[0,0,0,0];
            if (prod==undefined) prod=[0,0,0,0];
        
            cur = head.textContent.split("\n").filter(function(x) {return x[0]>='0' && x[0]<='9'; });
        
            for ( var i=0 ; i < 4; i++ )
                {
                    if (cnt[i]>0)
                        c = "+" + cnt[i] + " ";
                    else
                        c = ""
                            p = (prod[i]>0?"+":"") + Math.round(prod[i]/6)/10.0;
                    a+="<td></td><td>"+c+p+"/m</td>";
                    cur[i] = cur[i].split("/")[0];
                }
            a+="<td></td><td></td>";
            
            tr = document.createElement("tr");
            head.appendChild(tr);
            tr.innerHTML = a;

        }
    }

    //////////////////////////////////////////
    //  MARKET COLORS                       //
    //////////////////////////////////////////
    function mkt_main(){
        function colorify() { 
            x = document.getElementById("lmid2");
            if (x!=null && x.innerHTML.indexOf("</tr><tr class=\"cbg1\">")>0) {
                var res = document.evaluate( "//table[@class='tbg']/tbody/tr[not(@class) and not(@bgcolor)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            
                for ( var i=0 ; i < res.snapshotLength; i++ )
                    {
                        x = res.snapshotItem(i);
                        if (x.childNodes[6]!=undefined && x.childNodes[6].textContent>0) {
                            a = x.childNodes[2].textContent-0;
                            b = x.childNodes[6].textContent-0;
                            r = a/b;
                            if (r>1.5)
                                color="#ddffdd";
                            else if (r>1.001)
                                color = "#eeffdd";
                            else if (r>0.999)
                                color = "#ffffdd";
                            else if (r>0.501)
                                color = "#ffeedd";
                            else
                                color = "#ffdddd";

                            x.style.backgroundColor = color;
                        }
                    }
            }
        }
        for (i=1; i<=10; i++) 
            setTimeout(colorify,i*1000);
        colorify();
    } 

    //////////////////////////////////////////
    //  ALLY LINES                          //
    //////////////////////////////////////////
    // Show lines to allies and yourself
    function al_main(){
        var res = document.evaluate( "//img[@usemap='#karte']", document, null, XPathResult. ANY_UNORDERED_NODE_TYPE, null );
        x = res.singleNodeValue;
        if (x != null) {
            pos = getPos(x);
            canvas=document.createElement("canvas");
            canvas.style.position = "absolute";
            canvas.style.left = pos[0]+"px";
            canvas.style.top  = pos[1]+"px";
            canvas.style.zIndex = 14;
            canvas.width  = pos[2];
            canvas.height = pos[3];
        
            rdiv=document.createElement("div");
            rdiv.style.position = "absolute";
            rdiv.style.left = "315px";
            rdiv.style.top  = "500px";
            rdiv.style.border = "solid 1px #000";
            rdiv.style.background = "#ffc";
            rdiv.style.zIndex = 16;
            rdiv.style.padding = "3px";
            rdiv.style.MozBorderRadius = "6px";

            x.parentNode.insertBefore(canvas, x.nextSibling);
            document.body.appendChild(rdiv);
        
            var rx = document.evaluate( "//input[@name='xp']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );   
            var ry = document.evaluate( "//input[@name='yp']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );   

            posx = rx.singleNodeValue.value - 0;
            posy = ry.singleNodeValue.value - 0;

            function update() {
                x = GM_getValue(prefix("SPECIAL_LOCATIONS"));    
                if (x!==undefined && x!=="") {
                    SPECIAL_LOCATIONS = eval(x);
                }

                var g = canvas.getContext("2d");
                g.clearRect(0,0,pos[2],pos[3]);
                g.save()
                    g.translate(pos[2]/2-1,pos[3]/2 + 5.5);
                        
                function touch(x, y) {
                    x -= posx;
                    y -= posy;
                    if (x<-400) x+=800;
                    if (x> 400) x-=800;
                    if (y<-400) y+=800;
                    if (y> 400) y-=800;
                    g.beginPath();
                    px = 1.83*(x+y);
                    py = 1.00*(x-y);
                    px += py/50;
                    px2 = px * 20;
                    py2 = py * 20;
                    g.moveTo(px,py);
                    g.lineTo(px2,py2);
                    if (x!=0 || y!=0) 
                        g.fillRect(px-2,py-2,4,4);
                    g.stroke();

                    if (x>=-3 && x<=3 && y>=-3 && y<=3) {
                        if (x==0 && y==0) 
                            g.lineWidth = 2.5;
                        g.beginPath();
                        g.moveTo(px2+20,py2);
                        g.arc(px2,py2,20,0,Math.PI*2,true);
                        g.stroke();
                        if (x==0 && y==0) 
                            g.lineWidth = 1;
                    }
                }
            
                g.fillStyle   = "rgba(128,128,128,0.8)";
                for (a in ally) {
                    b = ally[a][2];
                    if (a == USERNAME) {
                        g.strokeStyle = "rgba(128,64,0,1.0)";
                    } else {
                        g.strokeStyle = "rgba(0,128,255,0.4)";
                    }
                
                    for (c in b) {
                        touch(b[c][1],b[c][2]);
                    }
                }

                g.strokeStyle = "rgba(255,0,128,0.8)";
                for (i=0; i<SPECIAL_LOCATIONS.length; i++) {
                    p=SPECIAL_LOCATIONS[i];
                    touch(p[0],p[1]);
                }                
                g.restore();
            
                wasc = travian_world_analyzer_server_code;
                rdiv.innerHTML = "<b>Analyze neighbourhood:</b><br/>Radius: " +
                    "<a href=\"http://travian.ws/analyser.pl?s="+wasc+"&q="+posx+","+posy+",5\" > 5</a>, "+
                    "<a href=\"http://travian.ws/analyser.pl?s="+wasc+"&q="+posx+","+posy+",10\">10</a>, "+
                    "<a href=\"http://travian.ws/analyser.pl?s="+wasc+"&q="+posx+","+posy+",15\">15</a>, "+
                    "<a href=\"http://travian.ws/analyser.pl?s="+wasc+"&q="+posx+","+posy+",20\">20</a>, "+
                    "<a href=\"http://travian.ws/analyser.pl?s="+wasc+"&q="+posx+","+posy+",25\">25</a>";
            }
        
            update();
        
            function upd() {
                setTimeout(upd2,50);
            }
        
            function upd2(){
                z = unsafeWindow.m_c.z;
                try {
                    if (z != null) {
                        if (posx != z.x || posy != z.y) {
                            posx  = z.x - 0;
                            posy  = z.y - 0;
                            update();
                        }
                    }
                } catch (e) {
                    alert(e);
                }
            }            

            document.addEventListener('click',upd,true);
            document.addEventListener('keydown',upd,true);
            document.addEventListener('keyup',upd,true);
        }
    
        // add a "this location is special!" button to the map's village view.
        if (location.href.indexOf("karte.php?d=")>0) {
            res = document.evaluate( "//div[@id='lmid2']//h1", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );
            x = res.singleNodeValue;
            if (x) {
                l = x.textContent.match("\\((-?\\d+)\\|(-?\\d+)\\)");
                insl = false;
                for (v in SPECIAL_LOCATIONS) {
                    if (SPECIAL_LOCATIONS[v][0]==l[1] &&
                        SPECIAL_LOCATIONS[v][1]==l[2]) {
                        insl=true;
                        break;
                    }
                }
                addspecial = document.createElement("a");
                addspecial.innerHTML = "s";
                addspecial.title = "[timeline] Toggle ("+l[1]+"|"+l[2]+") as special location.";
                addspecial.href="#";
                addspecial.style.color = insl?"#0f0":"#f00";
                addspecial.className=l[1]+","+l[2]+","+(insl?1:0);
                function addsl(e){
                    var el = e.target;
                    var l = el.className.split(",");
                    if (l[2]>0) {
                        last = SPECIAL_LOCATIONS.pop();
                        for (v in SPECIAL_LOCATIONS) {
                            if (SPECIAL_LOCATIONS[v][0]==l[2] &&
                                SPECIAL_LOCATIONS[v][1]==l[3]) {
                                SPECIAL_LOCATIONS[v]=last;
                                break;
                            }
                        }
                    } else {
                        SPECIAL_LOCATIONS.push([l[0]-0,l[1]-0]);
                    }
                    GM_setValue(prefix("SPECIAL_LOCATIONS"), uneval(SPECIAL_LOCATIONS));
                    el.style.color = l[2]<1?"#0f0":"#f00";
                    el.className=l[0]+","+l[1]+","+(1-l[2]);
                }
                addspecial.addEventListener('click',addsl,true);
                x.appendChild(addspecial); 
                x.parentNode.style.zIndex=5;
            }
        }
    }

    //////////////////////////////////////////
    //  REMOVE PLUS BUTTON                  //
    //////////////////////////////////////////
    function remove_plus_button(){
        plus = document.getElementById("lplus1");
        if (plus) {
            plus.parentNode.style.visibility="hidden";
        }
    }

    //////////////////////////////////////////
    //  CUSTOM SIDEBAR                      //
    //////////////////////////////////////////
    // Modifies Navigation menu (sidebar)
    function csb_main(){
        navi = document.getElementById("navi_table");
        if (navi) {
            if (REMOVE_HOME_LINK)
                navi.parentNode.childNodes[1].href="?";
            
            navi=navi.childNodes[1].childNodes[0].childNodes[1];
        
            function add(text, target) {
                if (target=="") {
                    el=document.createElement("b");
                } else {
                    el=document.createElement("a");
                    el.href=target;
                }
                el.innerHTML = text;
                navi.appendChild(el);
            }

            function add_break(nr) {
                if (SIDEBAR_HR) {
                    hr=document.createElement("hr");
                    if (nr<navi.childNodes.length) {
                        navi.insertBefore(hr,navi.childNodes[nr]);
                    } else {
                        navi.appendChild(hr);
                    }
                } else {
                    br1=document.createElement("br");
                    br2=document.createElement("br");
                    if (nr<navi.childNodes.length) {
                        navi.insertBefore(br1,navi.childNodes[nr]);
                        navi.insertBefore(br2,navi.childNodes[nr]);
                    } else {
                        navi.appendChild(br1);
                        navi.appendChild(br2);
                    }
                }
            }
        
            // Make copy of links
            oldnavi = [];
            for (i = 0; i < navi.childNodes.length; i++)
                if (navi.childNodes[i].tagName=="A")
                    oldnavi.push(navi.childNodes[i]);

            // Remove all links
            for (i = navi.childNodes.length - 1; i>=0; i--) 
                navi.removeChild(navi.childNodes[i]);
        
            // Add new links
            for (i = 0; i < SIDEBAR_LINKS.length; i++) {
                x = SIDEBAR_LINKS[i];
                if (x.constructor == Array) {
                    add(x[0], x[1]);
                } else if (x.constructor == String) {
                    add(x, "");
                } else if (x<0) {
                    add_break();
                } else {
                    el = oldnavi[x];
                    if (REMOVE_TARGET_BLANK) {
                        el.removeAttribute("target");
                    }
                    // Remove color from Plus link
                    if (REMOVE_PLUS_COLOR)
                        el.innerHTML=el.textContent;
                    navi.appendChild(el);
                }
            }

            // debugging code
            if (DEBUG_SIDEBAR) {
                for (var j=0; j<oldnavi.length; j++) {
                    add(j+": ","")
                        navi.appendChild(oldnavi[j]);
                }
            }
        }
    }

    //////////////////////////////////////////
    //  TIMELINE                            //
    //////////////////////////////////////////
    function tl_main(){
        tp1 = document.getElementById("tp1");
        if (!tp1) return;
        //if (USE_TIMELINE && tp1) {
        /*  A timeline-data-packet torn apart:
            Example: {'1225753710000':[0, 0, 0, 0, 189, 0, 0, 0, 0, 0, 0, 0, "Keert terug van 2. Nador", 0, 0, 0, 0]}
        
            '1225753710000':       ## ~ The time at which this event occure(s|d).      
            [0,                     0 ~ Type of event (0=building, 1=attack, 2=report, 3=market, 4=research, 5=party)
            0,                      1 ~ Amount of farm-men involved 
            0,                      2 ~ Amount of defense-men involved
            0,                      3 ~ Amount of attack-men involved 
            189,                    4 ~ Amount of scouts  involved 
            0,                      5 ~ Amount of defense-horses involved 
            0,                      6 ~ Amount of attack-horses involved 
            0,                      7 ~ Amount of rams involved 
            0,                      8 ~ Amount of trebuchets involved 
            0,                      9 ~ Amount of leaders involved 
            0,                     10 ~ Amount of settlers involved 
            0,                     11 ~ Amount of heros involved 
            "Keert terug van 2. ", 12 ~ Event message.
            0,                     13 ~ Amount of wood involved
            0,                     14 ~ Amount of clay involved
            0,                     15 ~ Amount of iron involved
            0,                     16 ~ Amount of grain involved
            "1."]                  17 ~ Issuing city
             
            Instead of a number, the fields 1 to 11 and 13 to 16 are also allowed to be a tuple (list).
            In this case the first field is the original amount and the second field is the amount by which the amount has decreased.             
        */

        ///////////////////////////////////
        // Start Timeline Data collector //
        ///////////////////////////////////
    
        function tl_update_data() {
            try {
                events = eval(GM_getValue(prefix("TIMELINE"),"{}"));
                if (events==undefined) events = {};
            } catch (e) {
                alert(e);
                events = { };
            }
        }
        tl_update_data();
    
        // Added a third optional parameter to fix a bug with event overwriting. The event would be encountered,
        // this function wouldn't change it and return right away, and then the code following it would
        // be executed corrupting the event. This is a quick fix, but it really doesn't solve the problem.
        function tl_get_event(t, msg, name) {
            if (name == undefined) name = '';
            e = events[t];
            if (e == undefined) {
                e = [0,0,0,0,0,0,0,0,0,0,0,0,msg,0,0,0,0,name];
                events[t]=e;
            } else {
                debug(d_low, "An event already exists at this time!");
                throw "ERR_EVENT_OVERWRITE";
            }
            return e;
        }

        // Extract the active village
        try {
            active_vil = document.evaluate('//a[@class="active_vl"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.textContent;
        } catch (e) {
            active_vil = 0;
        }
        debug(d_low, "The active village is: "+active_vil);

        // Travelling armies (rally point)
        x = document.getElementById("lmid2");
        if (x!=null && x.innerHTML.indexOf("warsim.php")>0) {
    
            var res = document.evaluate( "//table[@class='tbg']/tbody", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        
            for ( var i=0 ; i < res.snapshotLength; i++ )
                {
                    x = res.snapshotItem(i);
                    what = x.childNodes[3].childNodes[0].innerHTML;
                    // Instead of checking if this is the correct line, just act as if it's correct
                    // If it isn't this will certainly fail.
                    try {
                        d = new tl_date();
                        d.set_time(x.childNodes[3].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[3].textContent.match("(\\d\\d?)\\:(\\d\\d)\\:(\\d\\d)"));
                        t = d.adjust_day(x.childNodes[3].childNodes[1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].textContent.match('(\\d\\d?):\\d\\d:\\d\\d'));
                        where = x.childNodes[0].childNodes[2].textContent;
                
                        try {
                            e = tl_get_event(t, where, active_vil);
                        }
                        catch(er){
                            if (er == "ERR_EVENT_OVERWRITE") continue;
                            throw er;
                        }
                        for (var j = 1; j<12; j++) {
                            y = x.childNodes[2].childNodes[j];
                            if (y!=undefined)
                                e[j] = y.textContent - 0;
                        }

                        e[0] = TYPE_ATTACK;
                    } catch (e) {
                        // So it probably wasn't the correct line.
                    }
                }
        }
    
        // Reports 
        if (location.href.indexOf("berichte.php?id")>0) {
            try {
                res = document.evaluate( "//table[@class='tbg']/tbody", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );
                x = res.singleNodeValue;
                if (x != undefined) {
                    if (x.innerHTML.indexOf("\n<tbody><tr class=\"cbg1\">\n")>0) {
                        d = new tl_date();

                        time = x.childNodes[2].childNodes[3].textContent.match("(\\d\\d?)[/.](\\d\\d)[/.](\\d\\d) [ a-zA-Z]+ (\\d\\d?):(\\d\\d):(\\d\\d)");
                        d.set_time(time.slice(3, 7)); // The first element in the array passed is ignored...
                        t = d.set_day(time.slice(1, 4));
                        where = x.childNodes[0].childNodes[3].innerHTML;
                
                        e = tl_get_event(t,where);
                        e[12] = where;
                
                        // army composition + losses
                        x = x.childNodes[6].childNodes[1];
                        dualrow=false;
                        if (x.childNodes[2]==undefined) {
                            x = x.childNodes[1].childNodes[1]; 
                        } else {
                            x = x.childNodes[2].childNodes[1]; 
                            dualrow=true;
                        }

                        for (var j = 1; j<12; j++) {
                            y1 = x.childNodes[3].childNodes[j];
                            if (dualrow) y2 = x.childNodes[4].childNodes[j];
                            if (y1!=undefined) {
                                if (dualrow && y2.textContent>0)
                                    e[j] = [y1.textContent - 0, y2.textContent - 0];
                                else
                                    e[j] = y1.textContent - 0;
                            }
                        }
                
                        // profit
                        if (dualrow) {
                            if (x.childNodes[5].childNodes[3] != undefined) {
                                y = x.childNodes[5].childNodes[3].textContent.split(" ");                
                                for (var j = 1; j<5; j++) {
                                    e[j + 12] = y[j - 1] - 0;
                                }
                            }
                        } else {
                            if (x.childNodes[4].childNodes[3] != undefined) {
                                y = x.childNodes[4].childNodes[3].textContent.split(" ");                
                                e[16] = 0-y[0];
                            }
                        }
                        e[0] = TYPE_REPORT;
                    }
                }
            } catch (er){
                if (er != "ERR_EVENT_OVERWRITE") throw er;
            }
        } else if (location.href.indexOf("dorf")>0) { // building build task:
            bouw = document.getElementById("lbau1");
            if (bouw == undefined)
                bouw = document.getElementById("lbau2");
            if (bouw != undefined) {
                y = bouw.childNodes[1].childNodes[0];
                for (nn in y.childNodes) {
                    x = y.childNodes[nn];

                    where = x.childNodes[1].textContent;

                    d = new tl_date();
                    d.set_time(x.childNodes[3].textContent.match('(\\d\\d?):(\\d\\d) ?([a-z]*)'));
                    t = d.adjust_day(x.childNodes[2].textContent.match('(\\d\\d?):\\d\\d:\\d\\d'));

                    res = document.evaluate( "//div[@class='dname']/h1", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );

                    // What's the point of this again??
                    var h = 0;
                    for(var i = 0; i < x.length; i ++) {
                        h*=13;
                        h+=i;
                        h%=127;
                    }
                    t+=h*2;
                    try {
                        e = tl_get_event(t, where, active_vil);
                    } catch (er){
                        if (er == "ERR_EVENT_OVERWRITE") continue;
                        throw er;
                    }
                    e[0] = TYPE_BUILDING;
                }
            }
        } else if (location.href.indexOf('build.php')>0){ // If we're on an individual building page
            // Market Deliveries
            if (document.forms[0] != undefined &&
                document.forms[0].innerHTML.indexOf('/b/ok1.gif" onmousedown="btm1(')>0){ // And there is a OK button
                // Then this must be the market! (in a language-insensitive manner :D)

                var shipment = document.evaluate('//table[@class="tbg"]/tbody', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var i=0; i < shipment.snapshotLength; i++){
                    x = shipment.snapshotItem(i);
                    d = new tl_date();

                    // Extract the arrival time
                    d.set_time(x.childNodes[2].childNodes[2].textContent.match('(\\d\\d?):(\\d\\d) ?([a-z]*)'));

                    // Extract and adjust by the duration of the shipment
                    t = d.adjust_day(x.childNodes[2].childNodes[1].textContent.match('(\\d\\d?):(\\d\\d):(\\d\\d)'));

                    // Extract the value of the shipment
                    res = x.childNodes[4].childNodes[1].textContent.split(' | ');
                    debug(d_low, "Merchant carrying "+res);
                
                    // Check if merchant is returning
                    ret = x.childNodes[4].childNodes[1].childNodes[0].className[0]=='c';
                    if (ret) debug(d_low, "Merchant is returning");

                    // Extract the action type
                    type = x.childNodes[0].childNodes[3].textContent;
                    
                    try {
                        e = tl_get_event(t, type, active_vil);
                    } catch (er){
                        if (er == "ERR_EVENT_OVERWRITE") continue;
                        throw er;
                    }

                    e[0] = TYPE_MARKET;

                    // Add resource pictures and amounts (if sending)
                    if (!ret)
                        for (j=0; j<4; j++)
                            e[13+j]=res[j];
                }
            }

            // Party events! Still a building...
            // The theory here is "look for a table who's second td has an explicit width of 25% and is not a header".
            // This should be exclusive for Town Halls.
            x = document.evaluate('//table[@class="tbg"]/tbody/tr[not(@class="cbg1")]/td[(position()=2) and (@width="25%")]',
                                  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (x.snapshotLength == 1){
                x = x.snapshotItem(0).parentNode;
                d = new tl_date();

                debug(d_med, "Found a party event!");

                d.set_time(x.childNodes[5].textContent.match('(\\d\\d?):(\\d\\d) ([a-z]*)'));
                t = d.adjust_day(x.childNodes[3].textContent.match('(\\d\\d?):\\d\\d:\\d\\d'));

                msg = x.childNodes[1].textContent;
                debug(d_low, 'Type = '+msg);

                try {
                    e = tl_get_event(t, msg, active_vil);
                    e[0] = TYPE_PARTY;
                } catch (er){
                    if (er != 'ERR_EVENT_OVERWRITE') throw er;
                }
            }
            
            // Research Events
            // Ok, the idea here is to look for a building with a table of class 'tbg' that has its first
            // td with width=6%. For a baracks training troops, it would be 5%. Markets et al don't
            // explicitly specify a width. It's a bit of a hack, but the simplest I can come up with...
            // This is still inside the if(building) statement
            try {
                x = document.evaluate('//table[@class="tbg"]/tbody/tr[not(@class)]/td[(@width="6%") and (position()<2)]',
                                      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if (x.snapshotLength == 1){
                    x = x.snapshotItem(0).parentNode;
                    d = new tl_date();

                    d.set_time(x.childNodes[7].textContent.match('(\\d\\d?):(\\d\\d) ?([a-z]*)'));
                    t = d.adjust_day(x.childNodes[5].textContent.match('(\\d\\d?):\\d\\d:\\d\\d'));

                    // Extract the unit being upgraded
                    type = x.childNodes[3].textContent;
                    debug(d_low, "Upgrading "+type);

                    // Extract the name of the building where the upgrade is occuring
                    // y is the table above the research-in-progress table
                    y = x.parentNode.parentNode.previousSibling.previousSibling.childNodes[1];
                    building = y.childNodes[0].childNodes[1].textContent;
                    debug(d_low, "Upgrading at the "+building);

                    // Extract the level upgrading to - not for the acadamy!
                    // We can't go far into these <td>s, because Beyond changes its guts (a lot!). Messing too much around
                    // in there could create compatibility problems... so keep it remote with textContent.
                    for (var i=0; i < y.childNodes.length; i++){
                        level = y.childNodes[i].childNodes[1].textContent.match(type+' ([(][A-Z][a-z]* )(\\d\\d?)([)])');
                        if (level){
                            level[2] -= -1; // It's upgrading to one more than its current value. Don't use '+'.
                            level = level[1]+level[2]+level[3];
                            debug(d_low, "Upgrading to "+level);
                            break;
                        }
                    }

                    // And now throw all of this information into an event
                    // Don't throw in the level information if we're  researching a new unit at the acadamy... because there isn't any!
                    e = tl_get_event(t, building+': '+type+(level ? ' '+level : ''), active_vil);
                    e[0] = TYPE_RESEARCH;

                } else if (x.snapshotLength > 1) alert ("Something's wrong. Found "+x.snapshotLength+" matches for xpath search");
            } catch (er){
                if (er != "ERR_EVENT_OVERWRITE") throw er;
            }
        }

        /////////////////////////////////
        // End Timeline Data collector //
        /////////////////////////////////


        TIMELINE_SIZES_FULL_HEIGHT  = (TIMELINE_SIZES_HISTORY+TIMELINE_SIZES_FUTURE)*TIMELINE_SIZES_HEIGHT; // pixels

        // Create timeline canvas + container
        tl = document.createElement("canvas");
        tlc = document.createElement("div");
        if (FIX_TIMELINE)
            tlc.style.position = "fixed";
        else
            tlc.style.position = "absolute";
        tlc.style.top      = "0px";
        tlc.style.right    = "0px";
        tlc.style.width    = (COLLAPSE_TIMELINE?TIMELINE_COLLAPSED_WIDTH:TIMELINE_SIZES_WIDTH) + "px";
        tlc.style.height   = TIMELINE_SIZES_FULL_HEIGHT + "px";
        tlc.style.zIndex   = "20";
        tlc.style.backgroundColor=TIMELINE_COLOR;
        tlc.style.visibility = GM_getValue(prefix("TL_VISIBLE"), "visible");
        tlc.style.overflow = "hidden";
        tl.id = "tl";
        tl.width  = TIMELINE_SIZES_WIDTH;
        tl.height = TIMELINE_SIZES_FULL_HEIGHT;
        tl.style.position = "relative";
        tl.style.left = (COLLAPSE_TIMELINE?TIMELINE_COLLAPSED_WIDTH-TIMELINE_SIZES_WIDTH:0)+"px";
        tlc.appendChild(tl);
        document.body.appendChild(tlc);
    
        // Code for expanding/collapsing the timeline.
        if (COLLAPSE_TIMELINE) {
            tl_col_cur = TIMELINE_COLLAPSED_WIDTH;
            tl_col_tar = TIMELINE_COLLAPSED_WIDTH;
            tl_col_run = false;
            tl_col_prev = 0;
            function tlc_fade() {
                tl_col_next = new Date().getTime();
                diff = (tl_col_next - tl_col_prev) / 1000.0;
                tl_col_prev = tl_col_next;
                tl_col_run = true;
                if (tl_col_cur==tl_col_tar) {
                    tl_col_run = false;
                    return;
                }
                if (tl_col_cur<tl_col_tar) {
                    tl_col_cur+=TIMELINE_COLLAPSE_SPEED*diff;
                    if (tl_col_cur>tl_col_tar)
                        tl_col_cur=tl_col_tar;
                }
                if (tl_col_cur>tl_col_tar) {
                    tl_col_cur-=TIMELINE_COLLAPSE_SPEED*diff;
                    if (tl_col_cur<tl_col_tar)
                        tl_col_cur=tl_col_tar;
                }
                tlc.style.width = tl_col_cur + "px";
                tlc.firstChild.style.left = (tl_col_cur-TIMELINE_SIZES_WIDTH)+"px";
                setTimeout(tlc_fade, 1000/TIMELINE_COLLAPSE_RATE);
            }
            function tlc_expand(e) {
                tl_col_tar = TIMELINE_SIZES_WIDTH;
                tl_col_prev = new Date().getTime();
                if (!tl_col_run) tlc_fade();
            }
            function tlc_collapse(e) {
                tl_col_tar = TIMELINE_COLLAPSED_WIDTH;
                tl_col_prev = new Date().getTime();
                if (!tl_col_run) tlc_fade();
            }
            tlc.addEventListener('mouseover',tlc_expand,false);
            tlc.addEventListener('mouseout',tlc_collapse,false);
        }
    
        // Show/hide timeline (click-event listener)
        function toggle_tl(e) {
            tlc.style.visibility=tlc.style.visibility!='hidden'?'hidden':'visible';
            GM_setValue(prefix("TL_VISIBLE"), tlc.style.visibility);
        }
    
        button = document.createElement("div");
        button.style.position = tlc.style.position;
        button.style.backgroundColor = "rgba(0,0,128,0.5)";
        button.style.right = "0px";
        button.style.top = "-2px";
        button.style.width  = "60px";
        button.style.height = "21px";
        button.style.zIndex = "20";
        button.style.textAlign = "center";
        button.style.color = "#fff";
        button.style.fontWeight = "bold";
        button.style.MozBorderRadiusBottomleft = "6px";    
        button.style.cursor = "pointer";
        button.addEventListener('click',toggle_tl,true);
        button.innerHTML = "timeline";
        document.body.appendChild(button);

        function determine_now() {
            // d = time corresponding to the top of the timeline
            // n = current time. (with time difference applied)
            // tl_t_time = time corresponding to the top of the timeline (want to conserve 'd' for local variables)
            // tl_c_time = current time with time difference
        
            // get server time
            server_time = tp1.textContent.split(":");
            
            // determine 'now'
            tl_t_time = new Date();
            tl_t_time.setTime(tl_t_time.getTime()+TIME_DIFFERENCE*3600000); // Adjust local time to server time.
            if (USE_SERVER_TIME) {
                t = tl_t_time.getTime();
                tl_t_time.setHours(server_time[0]);
                tl_t_time.setMinutes(server_time[1]);
                tl_t_time.setSeconds(server_time[2]);
                tl_t_time.setMilliseconds(0);
                if (tl_t_time.getTime()<t-60000)
                    tl_t_time.setDate(tl_t_time.getDate()+1);
            }

            // This is for the hilighting...
            tl_c_time = new Date();
            tl_c_time.setTime(tl_t_time.getTime());
        
            tl_t_time.setMilliseconds(0);
            tl_t_time.setSeconds(0);
            if (tl_t_time.getMinutes()<15) {
                tl_t_time.setMinutes(0);
            } else if (tl_t_time.getMinutes()<45) {
                tl_t_time.setMinutes(30);
            } else {
                tl_t_time.setMinutes(60);    
            }
        
            tl_warp_now = (tl_c_time.getTime() - tl_t_time.getTime())/1000/60 + TIMELINE_SIZES_HISTORY;
            tl_warp_now/=TIMELINE_SIZES_HISTORY+TIMELINE_SIZES_FUTURE;
        }

        // Delete events older than TIMELINE_DISTANCE_HISTORY
        determine_now();
        list = { };
        old = tl_t_time.getTime()-TIMELINE_DISTANCE_HISTORY*60000;
        for (e in events) {
            if (e>old) {
                list[e] = events[e];            
                // room for updates: (for migration to new versions of this script)
            }
        }
        events=list;
        GM_setValue(prefix("TIMELINE"),uneval(events));

        // warp helper function
        function tl_warp_deform(y) {
            return y - y*(y-tl_warp_now)*(y-1);
        }
    
        // transforms the y coordinate if TIMELINE_SCALE_WARP is in use.
        function tl_warp(y) {
            if (!TIMELINE_SCALE_WARP) return y*TIMELINE_SIZES_HEIGHT;
            y+=TIMELINE_SIZES_HISTORY;
            y/=TIMELINE_SIZES_HISTORY+TIMELINE_SIZES_FUTURE;
        
            y = tl_warp_deform(tl_warp_deform(y));
        
            y*=TIMELINE_SIZES_HISTORY+TIMELINE_SIZES_FUTURE;
            y-=TIMELINE_SIZES_HISTORY;
            return y*TIMELINE_SIZES_HEIGHT;
        }

        // Wrapped timeline drawing code in a function such that it can be called once every minute.
        function update_timeline(once) {
            if (once == undefined) once = false;
            determine_now();
            tl_update_data();
        
            // Get context
            var g = tl.getContext("2d");
            g.clearRect(0,0,TIMELINE_SIZES_WIDTH,TIMELINE_SIZES_FULL_HEIGHT);
            g.save();
                
            // Draw bar
            g.translate(TIMELINE_SIZES_WIDTH - 9.5, TIMELINE_SIZES_HISTORY * TIMELINE_SIZES_HEIGHT + .5);
        
            g.strokeStyle = "rgb(0,0,0)";
            g.beginPath();
            g.moveTo(0,-TIMELINE_SIZES_HISTORY * TIMELINE_SIZES_HEIGHT);
            g.lineTo(0, TIMELINE_SIZES_FUTURE * TIMELINE_SIZES_HEIGHT);
            g.stroke();
            for (var i=-TIMELINE_SIZES_HISTORY - tl_scroll_offset; i<=TIMELINE_SIZES_FUTURE - tl_scroll_offset; i+=1) {
                g.beginPath();
                l = -2;
                ll = 0;
                if (i%5 == 0) l-=2;
                if (i%15 == 0) l-=2;
                if ((i + tl_t_time.getMinutes())%60 == 0) ll+=8;
                g.moveTo(l, tl_warp(i + tl_scroll_offset));
                g.lineTo(ll,  tl_warp(i + tl_scroll_offset));    
                g.stroke();
            }

            // Draw times
            g.mozTextStyle = "8pt Monospace";
            function round15(i){ return Math.floor(i/15)*15;}
            function drawtime(i, t) {
                h = t.getHours()+"";
                m = t.getMinutes()+"";
                if (m.length==1) m = "0" + m;
                x = h+":"+m;

                g.save();
                g.translate(-g.mozMeasureText(x) - 10, 4 + tl_warp(i + tl_scroll_offset));
                g.mozDrawText(x);    
                g.restore();    
            }
            for (var i=round15(-TIMELINE_SIZES_HISTORY - tl_scroll_offset);
                 i <= round15(TIMELINE_SIZES_FUTURE - tl_scroll_offset); i+=15) {
                t = new Date(tl_t_time);
                t.setMinutes(t.getMinutes() + i);
                drawtime(i, t);
            }

            // Draw current time
            diff = (tl_c_time.getTime() - tl_t_time.getTime()) / 1000 / 60;
            if (diff+tl_scroll_offset >= -TIMELINE_SIZES_HISTORY && diff+tl_scroll_offset <= TIMELINE_SIZES_FUTURE){
                y = tl_warp(diff + tl_scroll_offset);

                g.strokeStyle = "rgb(0,0,255)";
                g.beginPath();
                g.moveTo(-8, y);
                g.lineTo( 4, y);
                g.lineTo( 6, y-2);
                g.lineTo( 8, y);
                g.lineTo( 6, y+2);
                g.lineTo( 4, y);
                g.stroke();

                g.fillStyle = "rgb(0,0,255)";
                drawtime(diff, tl_c_time);

                // Highlight the 'elapsed time since last refresh'
                diff2 = (script_start_time - tl_t_time.getTime()) / 1000 / 60;
                y2 = tl_warp(diff2 + tl_scroll_offset);
                g.fillStyle = "rgba(0,128,255,0.1)";
                g.fillRect(9-TIMELINE_SIZES_WIDTH, y,TIMELINE_SIZES_WIDTH+1, y2-y);
            }

            unit = new Array(17);
            for (i=1; i<12; i++) {
                unit[i] = new Image();
                if (i==11)
                    unit[i].src = "img/un/u/hero.gif";
                else
                    unit[i].src = "img/un/u/"+(RACE*10+i)+".gif";
            }

            for (i=13; i<17; i++) {
                unit[i] = new Image();
                unit[i].src = "img/un/r/"+(i-12)+".gif";
            }


            function left(q) {
                if (q.constructor == Array)
                    return q[0]-q[1];
                else
                    return q-0;
            }

            // Draw data
            for (e in events) {
                p = events[e];
                diff = (e - tl_t_time.getTime()) / 1000 / 60 + tl_scroll_offset;
                if (diff<-TIMELINE_SIZES_HISTORY || diff>TIMELINE_SIZES_FUTURE) continue;
                y = tl_warp(diff);
                y = Math.round(y);
                g.strokeStyle = TIMELINE_EVENT_COLORS[p[0]];
                g.beginPath();
                g.moveTo(-10, y);
                g.lineTo(-50, y);    
                g.stroke();
            
                g.fillStyle = "rgb(0,128,0)";
                var cap = 60*left(p[1])+40*left(p[2])+110*left(p[5]) - ((p[13]-0)+(p[14]-0)+(p[15]-0)+(p[16]-0));
                cap = (cap<=0)?"*":"";
                g.save();
                g.translate(20 - TIMELINE_SIZES_WIDTH - g.mozMeasureText(cap), y+4);
                g.mozDrawText(cap + p[12]);
                g.restore();

                if (p[17]) {
                    g.fillStyle = "rgb(0,0,128)";
                    g.save();
                    g.translate(20 - TIMELINE_SIZES_WIDTH, y-5);
                    g.mozDrawText(p[17]);
                    g.restore();
                }

                if (SHOW_TIMELINE_REPORT_INFO) {
                    g.fillStyle = "rgb(64,192,64)";
                    g.save();
                    g.translate(-40, y+4+12); // Move this below the message.
                    for (i = 16; i>0; i--) {
                        if (i==12)
                            g.fillStyle = "rgb(0,0,255)";
                        else if (p[i]) {
                            try {
                                g.translate(-unit[i].width - 8, 0);
                                g.drawImage(unit[i], -0.5, Math.round(-unit[i].height*0.7) -0.5);
                            } catch (e) {
                                // This might fail if the image is not yet or can't be loaded.
                                // Ignoring this exception prevents the script from terminating to early.
                                var fs = g.fillStyle;
                                g.fillStyle = "rgb(128,128,128)";
                                g.translate(-24,0);
                                g.mozDrawText("??");
                                g.fillStyle = fs;
                            }
                            if (p[i].constructor == Array) {
                                g.fillStyle = "rgb(192,0,0)";
                                g.translate(-g.mozMeasureText(-p[i][1]) - 2, 0);
                                g.mozDrawText(-p[i][1]);
                                g.fillStyle = "rgb(0,0,255)";
                                g.translate(-g.mozMeasureText(p[i][0]), 0);
                                g.mozDrawText(p[i][0]);
                            } else {
                                g.translate(-g.mozMeasureText(p[i]) - 2, 0);
                                g.mozDrawText(p[i]);
                            }
                        }
                    }
                }
                g.restore();
            }
            g.restore();
            if (KEEP_TIMELINE_UPDATED && once != true) {
                setTimeout(update_timeline,TIMELINE_UPDATE_INTERVAL);
            }
        }
    
        update_timeline();
        
        // For displaying time properly.
        function pad2(x) {
            if (x<10) return "0"+x;
            else return x;
        }
    
        // To keep the link with the 'travian task queue'-script working properly, we also need to be able 
        // to undo the warping. I'm using a simple binairy search for that.
        function tl_unwarp(y) {
            y-=TIMELINE_SIZES_HISTORY*TIMELINE_SIZES_HEIGHT;
            if (!TIMELINE_SCALE_WARP) return y/TIMELINE_SIZES_HEIGHT;
            var b_l = -TIMELINE_SIZES_HISTORY;
            var b_h =  TIMELINE_SIZES_FUTURE;
            for (i=0; i<32; i++) {
                b_m = (b_l+b_h)/2;
                if (y<tl_warp(b_m)) {
                    b_h=b_m;
                } else {
                    b_l=b_m;
                }
            }
            return (b_l+b_h)/2;
        }
    
        // The click event listener for the link  with the 'travian task queue'-script.
        function setAt(e) {
            var at = document.getElementById("at");
            if (at) {
                // d = 'top of the timeline time'        
                var n = new Date();
                n.setTime(tl_t_time.getTime() + (tl_unwarp(e.pageY) - tl_scroll_offset) *60*1000);
                s=(n.getFullYear())+"/"+(n.getMonth()+1)+"/"+n.getDate()+" "+n.getHours()+":"+pad2(n.getMinutes())+":"+pad2(n.getSeconds());
                at.value=s;
            }
        }
    
        tlc.addEventListener("click",setAt,false);

        // Mouse Scroll Wheel
        function tl_mouse_wheel(e){
            if (tl_scroll_offset - e.detail * TIMELINE_SIZES_HEIGHT >= TIMELINE_DISTANCE_HISTORY - TIMELINE_SIZES_HISTORY) return;

            e.stopPropagation(); // Kill the event to the standard window...
            e.preventDefault();
            tl_scroll_offset -= e.detail * TIMELINE_SIZES_HEIGHT; // tl_scroll_offset is in minutes...
            update_timeline(true); // We don't want this call to start its own series of display updates...
        }

        tlc.addEventListener('DOMMouseScroll', tl_mouse_wheel, false);
    
    } /* USE_TIMELINE */

    function ev_main(){
        res = document.evaluate( "//div[@id='lright1']/table/tbody", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );
    
        function newcell(innerhtml) {
            cell = document.createElement("td");
            cell.innerHTML = innerhtml;
            cell.className = "nbr";
            return cell;
        }
    
        if (tab = res.singleNodeValue) {
            for (i = 0; i < VILLAGES.length; i++) {
                x = VILLAGES[i];
                row = document.createElement("tr");
                row.appendChild(newcell("<span>â€¢ </span> "+x[0]));
                row.appendChild(newcell("<table cellspacing=\"0\" cellpadding=\"0\" class=\"dtbl\">\n<tbody><tr>\n<td class=\"right dlist1\">("+x[1]+"</td>\n<td class=\"center dlist2\">|</td>\n<td class=\"left dlist3\">"+x[2]+")</td>\n</tr>\n</tbody></table>"));
                tab.appendChild(row);
            }
        }
    } /* USE_EXTRA_VILLAGE */

    //////////////////////////////////////////
    //  VILLAGE TOOL TIP                    //
    //////////////////////////////////////////
    // This could cause problems with single-village accounts at the moment...
    function vtt_main(){

        // This creates a tooltip. Each element of list e is a new line
        function vtt_tooltip(e, id, contents){
            id = "TTL_TTP_"+id;
            div = document.createElement('div');
            div.setAttribute('id', id);
            div.setAttribute('style', 'position:absolute; top:120px; left:720px; padding:2px; z-index:200; border:solid 1px #000000; background-color:#FFFFFF; visibility:hidden;');
            div.innerHTML = contents;
            document.getElementById('ltop1').parentNode.appendChild(div);
            var timer;

            delay_mouseover = function (e){
                if (timer != undefined) window.clearTimeout(timer);
                timer = window.setTimeout(function(){
                        x = document.getElementById(id);
                        x.style.visibility = 'visible';
                        x.style.left = (e.pageX+12)+'px';
                        x.style.top = (e.pageY+1)+'px';
                    }, 500);
            }
            delay_mouseout = function (){
                if (timer != undefined) window.clearTimeout(timer);
                timer = window.setTimeout(function(){
                        document.getElementById(id).style.visibility = 'hidden';
                    }, 300);
            }

            e.addEventListener('mouseover', delay_mouseover, false);
            e.addEventListener('mouseout', delay_mouseout, false);
        }

        // Get the village list first
        x = document.evaluate('//div[@id="lright1"]/table/tbody', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.childNodes;
        village_event_list = new Array(); // This holds the events still to be done in the future, for each village

        // 'events' is quite logically based on time. To sort and display events by village, we have to recreate the entire structure...
        for (e in events){
            ev = events[e];
            if (e < tl_c_time.getTime()) continue; // If this event is in the past, ignore it

            // Match them up to the villages... this isn't the best sorting algorithm but c'est la vie
            for (i in x){
                y = x[i].childNodes[0].childNodes[2];

                d = new Date();
                d.setTime(e);
                // village_event_list[i] stores an array of [time, string message]. Thus the format parsing must be done here.
                // It must be stored with the time in the first index so that array.sort() works properly.
                if (village_event_list[i] == undefined) village_event_list[i] = [];
                txt = '<td vAlign="bottom">'+d.getHours()+':'+(d.getMinutes()<10?'0':'')+d.getMinutes()+'</td>'; // Precede every event by the time
                txt += '<td style="color:'+TIMELINE_EVENT_COLORS[ev[0]]+'">';

                // If this is an *internal* *trade* market event, we sort based on destination...
                // Also, returning merchants have no cargo, and should only appear to the sending village
                if (ev[0] == 3 && ev[12].indexOf(y.textContent) >= 0 && ev[13]+ev[14]+ev[15]+ev[16] > 0){
                    txt += ev[17];
                    for (j=1; j <= 4; j++) txt += ' <img src="img/un/r/'+j+'.gif"/> '+ev[j+12]; // Add images and amounts
                    
                }
                else if (ev[17] == y.textContent){ // This is for generic events
                    txt += ev[12];
                    if (ev[0] == 3 && ev[13]+ev[14]+ev[15]+ev[16] > 0){ // If a market event, but don't show if there's no cargo
                        for (j=1; j <= 4; j++) txt += ' <img src="img/un/r/'+j+'.gif"/> '+ev[j+12]; // Add images and amounts
                    }
                    else if (ev[0] == 1){ // If a attack event
                        for (j=1; j <= 11; j++){
                            if (ev[j] == 0) continue;
                            txt += ' <img src="img/un/u/'+(j==11?'hero':RACE*10+j)+'.gif"/> '+ev[j]; // Add unit images & quantities
                        }
                    }
                } else continue;
                txt += '</td>';
                village_event_list[i].push([e, txt]);
            }
        }

        for (i in x){
            if (village_event_list[i].length == 0) vtt_tooltip(x[i], i, 'IDLE!');
            else {
                village_event_list[i].sort();
                txt = [];
                for (j in village_event_list[i]) txt.push(village_event_list[i][j][1]);
                vtt_tooltip(x[i], i, '<table class="f10" style="font-size:11px"><tbody><tr>'+txt.join('</tr><tr>')+'</tr></tbody></table>');
            }
        }
    }

} catch (e) {
    if (USE_DEBUG_MODE) 
        alert("Timeline caught an error: \n"+
              e.name+" at line "+e.lineNumber+"\n"+
              "Message:"+e.message+"\n"+
              "Stack trace:\n"+e.stack);
    throw e;
}

function main(){
    if (USE_SETTINGS){
	    set_basic_settings();
	    set_options_screen();
    }
    storeInfo();
    if (USE_ENHANCED_RESOURCE_INFO) res_main();
    if (USE_MARKET_COLORS) mkt_main();
    if (USE_ALLY_LINES) al_main();
    if (REMOVE_PLUS_BUTTON) remove_plus_button();
    if (USE_CUSTOM_SIDEBAR) csb_main();
    if (USE_TIMELINE) tl_main();
    if (USE_EXTRA_VILLAGE) ev_main();
    if (USE_VILLAGE_TITLE_TEXT) vtt_main();

    script_duration = new Date().getTime() - script_start_time;
}