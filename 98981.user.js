// ==UserScript==
// @author         idP
// @copyright      2011, idP
// @description    Various tools to help you with the game
// @include        http://*.grepolis.*/game/*
// @name           Grepolis2Tools
// @namespace      idP.grepolis.tools
// @require        http://www.idp.ro/scripts/updater.aspx?id=98981
// @source         http://userscripts.org/scripts/show/98981
// @version        0.1
// ==/UserScript==



// Fixes
// none for the moment



G2T = {

    uW       : null,

    $        : null,

    UnitData : { // Unit data from grepo version 1.07
        militia:           { resources: null,                                       population:   0, favor:   0 },
        sword:             { resources: { wood:    95, stone:     0, iron:    85 }, population:   1, favor:   0 },
        slinger:           { resources: { wood:    55, stone:   100, iron:    40 }, population:   1, favor:   0 },
        archer:            { resources: { wood:   120, stone:     0, iron:    75 }, population:   1, favor:   0 },
        hoplite:           { resources: { wood:     0, stone:    75, iron:   150 }, population:   1, favor:   0 },
        rider:             { resources: { wood:   240, stone:   120, iron:   360 }, population:   3, favor:   0 },
        chariot:           { resources: { wood:   200, stone:   440, iron:   320 }, population:   4, favor:   0 },
        catapult:          { resources: { wood:  1200, stone:  1200, iron:  1200 }, population:  15, favor:   0 },
        minotaur:          { resources: { wood:  1400, stone:   600, iron:  3100 }, population:  30, favor: 202 },
        manticore:         { resources: { wood:  4400, stone:  3000, iron:  3400 }, population:  45, favor: 405 },
        zyklop:            { resources: { wood:  2000, stone:  4200, iron:  3360 }, population:  40, favor: 360 },
        harpy:             { resources: { wood:  1600, stone:   400, iron:  1360 }, population:  14, favor: 130 },
        medusa:            { resources: { wood:  1500, stone:  3800, iron:  2200 }, population:  18, favor: 210 },
        centaur:           { resources: { wood:  1740, stone:   300, iron:   700 }, population:  12, favor: 100 },
        pegasus:           { resources: { wood:  2800, stone:   360, iron:    80 }, population:  20, favor: 180 },
        big_transporter:   { resources: { wood:   500, stone:   500, iron:   400 }, population:   7, favor:   0 },
        bireme:            { resources: { wood:   800, stone:   700, iron:   180 }, population:   8, favor:   0 },
        attack_ship:       { resources: { wood:  1300, stone:   300, iron:   800 }, population:  10, favor:   0 },
        demolition_ship:   { resources: { wood:   500, stone:   750, iron:   150 }, population:   8, favor:   0 },
        small_transporter: { resources: { wood:   800, stone:     0, iron:   400 }, population:   5, favor:   0 },
        trireme:           { resources: { wood:  2000, stone:  1300, iron:   900 }, population:  16, favor:   0 },
        colonize_ship:     { resources: { wood: 10000, stone: 10000, iron: 10000 }, population: 170, favor:   0 },
        sea_monster:       { resources: { wood:  5400, stone:  2800, iron:  3800 }, population:  50, favor: 400 }
        },

    server   : "",

    init : function() {
        // Get the unsafe window outside of GM.
        if (typeof unsafeWindow === 'object') {
            GT.uW = unsafeWindow;
            }
            else {
                GT.uW = window;
                }

        var uW = GT.uW;
        var $  = GT.$;

        GT.server = "";

        var sr = /http\:\/\/(\w+)\.grepolis\..*/.exec(uW.document.URL);
        if (sr) {
            GT.server = sr[1];
            }

        //get jQuery (used by Grepo, but also very usefull for us)
        GT.$  = GT.uW.jQuery;
        var $ = GT.$;

        // Get GameData
        if ( uW.GameData && uW.GameData.units && uW.GameData.units.archer ) {
            var farm, town, towns = this.mapData.getTowns(this.mapTiles.tile.x, this.mapTiles.tile.y, this.mapTiles.tileCount.x, this.mapTiles.tileCount.y);
            for (var i in towns) {
                var town_type = this.getTownType(towns[i]);
                //var farm = towns[i];
                //var town = towns[i];

//                if ((town.grepolis_farm_info === undefined) && (town.grepolis_town_info === undefined)) {
                    var html = null;
                    switch (town_type) {
                        case 'farm_town':
                            GT.gtLog('farm_town')
                            break;



//                var pixel = this.mapTiles.map2Pixel(town.x, town.y);
//                var coords = {
//                    x: Math.round(pixel.x - this.scroll.x - this.mapTiles.tileSize.x + town.offset_x + 42),
//                    y: pixel.y - this.scroll.y - this.mapTiles.tileSize.y + town.offset_y + 35,
//                    radius: 32
//                    };
//                if (farm.grepolis_farm_info !== undefined) {
//                    farm.grepolis_farm_info.attr('style', 'display: none;');
//                    }
//                if (town.grepolis_town_info !== undefined) {
//                    town.grepolis_town_info.attr('style', 'display: none;');
//                    }
//                if ((coords.x + coords.radius < 0) || (coords.y + coords.radius < 0) || (coords.x - coords.radius > this.xSize) || (coords.y - coords.radius > this.ySize)) {
//                    continue;
//                    }
//                        case 'town'     :
//                            sb += "\\\"";
//                            break;
//                        case 'free'     :
//                            sb += "\\\\";
//                            break;
                        case 'unknown'  :
                        default         :
                            GT.gtLog('unknown')
                            break;
                        }

                    if (town_type == 'farm_town') {
                        
                        }
                    }
                }






			var gunits = GT.unwrap( uW.GameData.units );
			GT.UnitData = {};
			for (var u in gunits)
			{
				var nu = 
				{ resources : gunits[u].resources,
				  population: gunits[u].population,
				  favor     : gunits[u].favor
				};
				GT.UnitData[ u ] = nu;
			}
			GT.storeValue( "Units", GT.UnitData );
		}
		else
		{
			var gunits = GT.readValue( "Units" );
			if ( gunits && gunits.length > 0 )
				eval( "GT.UnitData = "+gunits );
			else
			{
				GT.rclog( "Geen eenheid gegevens gevonden - standaard gegevens van Grepolis v.1.07");
			}
		}

		},

    // Our console function (with "crossbrowser" support.. *boah*...)
    // Used for debugging purposes.
    gtLog : function(msg) {
        try {
            if (typeof GM_log !== 'undefined') {
                GM_log(msg);
                }
                else {
                    if (typeof opera.postError !== 'undefined') {
                        opera.postError(msg);
                        }
                        else {
                            GT.uW.console.log(msg);
                            }
                    }
            }
            catch (e) {
                };
        },

    // Some DOM functions return "wrapped" objects with restricted access to some properties.
    // We need the real ones... 
    unwrap : function(node) {
        return (node && node.wrappedJSObject) ? node.wrappedJSObject : node;
        },

    /*
    * Escapes a string for use in object dumps,
    * without any prototype magic.
    */
    escapeString : function(str) {
        var sb = "";
        for (var i = 0; i < str.length; i++) {
            var c  = str[i];
            var cc = str.charCodeAt(i);
            if ((cc >= 0x000 && cc <= 0x01F) || (cc >= 0x007F && cc <= 0x09F)) {
                // Use Unicode
                sb += "\\u";
                var hexval = cc.toString(16);
                while (hexval.length < 2) {
                    hexval = "0" + hexval;
                    }
                sb += hexval;
                }
                else
                    switch (c) {
                        case "'" : sb += "\\'" ; break;
                        case '"' : sb += "\\\""; break;
                        case '\\': sb += "\\\\"; break;
                        case '/' : sb += "\\/" ; break;
                        case '\b': sb += "\\b" ; break;
                        case '\f': sb += "\\f" ; break;
                        case '\n': sb += "\\n" ; break;
                        case '\r': sb += "\\r" ; break;
                        case '\t': sb += "\\t" ; break;
                        default  : sb += c     ; break;
                        }
            }
        return sb;
        },

    /*
    * JSON like strinigify funtion.
    * Creates simple javascript source from objects, but not real JSON.
    */
    xString : function(obj) {
        if (obj === null) {
            return 'null';
            }

        switch (typeof obj) {
            case   'undefined':
            case   'unknown'  :
                return '';
            case   'function' :
            case   'number'   :
            case   'boolean'  :
                return obj.toString();
            case   'string'   :
                return '"' + GT.escapeString(obj) + '"';
            case   'object'   :
                if (obj.nodeType != 1) {
                    var x = [];
                    if ('splice' in obj && 'join' in obj) { // Array
                        for (var e in obj) {
                            x.push(GT.xString(obj[e]));
                            }
                        return '[' + x.join(',') + ']';
                        }
                        else {
                            for (var e in obj) {
                                x.push( '"' + e + '":' + GT.xString(obj[e]));
                                }
                            return '{' + x.join(',') + '}';
                            }
                    }
                break;
            }
        return obj.toString();
        },

    storeValue : function(name, value) {
        try {
            GT.gtLog("storing " + GT.server + "." + name);
            value = GT.xString( value );
            GM_setValue(GT.server + "." + name, value);
            }
            catch (e) {
                GT.gtLog("failed - " + e);
                }
        },

    readValue : function(name) {
        try {
            var data = GM_getValue(GT.server + "." + name);
            return data;
            }
            catch (e) {
                GT.gtLog(e);
                }
        return null;
        },

    // Generate random Ids
    makeRandomString : function() {
        var ret = 'gT';
        for (var i = 0; i < 14; i++) {
            ret += Math.floor(Math.random() * 10);
            }
        return ret;
    	},

    // Convenience replacement for "parseInt".
    pInt : function(txt, dft) {
        var v = parseInt(txt, 10);
        if (isNaN(v)) {
            v = (dft === undefined) ? 0 : dft;
            }
        return v;
        },

    // Fills up numbers (to look more pretty)
    pad : function(number, digits) {
        var x = "" + number;
        while (x.length < digits) {
            x = "0" + x;
            }
        return x;
        },

    // Format large integer values
    // E.g. "1000" will be "1.000"
    fInt : function(val) {
        var txt = "";
        while ( val >= 1000 ) {
            var nv = Math.floor(val / 1000);
            txt = "." + GT.pad(val - (nv * 1000), 3) + txt;
            val = nv;
            }
        txt = "" + val + txt;
        return txt;
        },

    // Crossbrowser event fixing (stupid IE).
    cbFix : function(e) {
        if (undefined == e) {
            e = GT.uW.event;
            }
        if (undefined == e.layerX) {
            e.layerX = e.offsetX;
            }
        if (undefined == e.layerY) {
            e.layerY = e.offsetY;
            }
        return e;
        },

    // Get the absolute left position of some html element inside the page.
    getLeft : function(el) {
        var x = 0;
        while (el != null) {
            x += el.offsetLeft;
            el = el.offsetParent;
            }
        return x;
        },

    // Get the absolute top position of some html element inside the page.
    getTop : function(el) {
        var y = 0;
        while (el != null) {
            y += el.offsetTop;
            el = el.offsetParent;
            }
        return y;
        },

    //////////////////////////////////////////////
    // Simple "drag" support.
    //////////////////////////////////////////////
    drag : {
        obj : null,

        init : function(oAnchor, oRoot) {
            var a = GT.unwrap(GT.uW.document.getElementById(oAnchor));
            var o = GT.unwrap(GT.uW.document.getElementById(oRoot));

            a.onmousedown = GT.drag.start;
            a.root = o ? o: a;

            if (isNaN(parseInt(a.root.style.left))) {
                a.root.style.left = "0px";
                }
            if (isNaN(parseInt(a.root.style.top))) {
                a.root.style.top = "0px";
                }
            },

        start : function(e) {
            var o = GT.drag.obj = GT.unwrap(this);
            var e = GT.cbFix(e);
            var y = GT.pInt(o.root.style.top);
            var x = GT.pInt(o.root.style.left);
            o.lastMouseX = e.clientX;
            o.lastMouseY = e.clientY;

            var d = GT.uW.document;
            d.onmousemove = GT.drag.drag;
            d.onmouseup = GT.drag.end;
            return false;
            },

        drag : function(e) {
            e = GT.cbFix(e);
            var o = GT.drag.obj;
            var rt = o.root;

            var ex = e.clientX;
            var ey = e.clientY;
            var x = GT.pInt(rt.style.left);
            var y = GT.pInt(rt.style.top);
            var w = rt.offsetWidth;
            var nx, ny;

            nx = ex - o.lastMouseX;
            ny = ey - o.lastMouseY;

            var rtLeft = GT.getLeft(rt);
            var ww = GT.uW.innerWidth;

            x += nx;
            if (x<0) {
                x = 0;
                }
            if ((x + w) > ww) {
                x = ww - w;
                }

            y += ny;
            if (y < 0) {
                y = 0;
                }

            rt.style.left = x + "px";
            rt.style.top = y + "px";

            o.lastMouseX = ex;
            o.lastMouseY = ey;

            return false;
            },

        end : function() {
            var d = GT.uW.document;
            d.onmousemove = null;
            d.onmouseup = null;
            GT.drag.obj = null;
            }
        },

    /*
    * Create some pop-up as hidden div add the end of body. 
    * Used by the other "create" functions, simply to encapsulate
    * the general code for handling "grepo-style" pop-ups here).
    * 
    * @param idPrefix  Prefix to use for all IDs (to make it unique).
    * @param content   HTML code to put in the content area of the popup.
    */
    createTownInfoWnd : function(idPrefix, content) {
        var stStyle = "background-color: Grey " + "url(/images/game/layout/resources.png) no-repeat scroll -0px -30px; " + "height: 30px; width: 30px;";
        var wdStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat; " + "height: 30px; width: 30px;";
        var svStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -60px; " + "height: 30px; width: 30px;";
        var bhStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -120px; " + "height: 30px; width: 30px;";
        var fvStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -150px; " + "height: 30px; width: 30px;";

        GT.$("body").after(

            // Z-index 21, just above the "Manager"-bar (currently 20) and below the pop-ups.
            '<div class="game_inner_box" style="z-index: 21; position:absolute; left:0px; top:0px; display:none;" id="' + idPrefix + 'ResCostBox">'
            +   '<table class="popup_table_inside">'
            +       '<tr>'
            +           '</tr>'
            +       '</table>'
            +   '</div>'
            );
        },

    createFarmInfoWnd : function(idPrefix, content) {
        var stStyle = "background-color: Grey " + "url(/images/game/layout/resources.png) no-repeat scroll -0px -30px; " + "height: 30px; width: 30px;";
        var wdStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat; " + "height: 30px; width: 30px;";
        var svStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -60px; " + "height: 30px; width: 30px;";
        var bhStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -120px; " + "height: 30px; width: 30px;";
        var fvStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -150px; " + "height: 30px; width: 30px;";

        GT.$("body").after(

            // Z-index 21, just above the "Manager"-bar (currently 20) and below the pop-ups.
            '<div class="game_inner_box" style="z-index: 21; position:absolute; left:0px; top:0px; display:none;" id="' + idPrefix + 'ResCostBox">'
            +   '<table class="popup_table_inside">'
            +       '<tr>'
            +           '<td>'
            +               '<img src="http://static.grepolis.com/images/game/towninfo/mood.png" />'
            +               '</td>'
            +           '<td>'
            +               ('%1%'.replace('%1', farm.mood))
            +               '</td>'
            +           '<td>'
            +               '<img src="http://static.grepolis.com/images/game/towninfo/strength.png" />'
            +               '</td>'
            +           '<td>'
            +               ('%1%'.replace('%1', farm.strength))
            +               '</td>'
            +           '</tr>'
            +       '<tr>'
            +           '<td colspan="4">'
            +               '<span class="resource_' + town.demand + '_icon"></span>'
            +               '<span class="popup_ratio">' + ' 1:' + town.ratio + '</span>'
            +               '<span class="resource_' + town.offer + '_icon"></span>'
            +               '</td>'
            +           '</tr>'
            +       '</table>'
            +   '</div>'
            );
        },

    createFarmInfoWnd : function(idPrefix, content) {
        var Style = "";
    	},

    /*
    * Create some pop-up as hidden div add the end of body. 
    * Used by the other "create" functions, simply to encapsulate
    * the general code for handling "grepo-style" pop-ups here).
    * 
    * @param idPrefix  Prefix to use for all IDs (to make it unique).
    * @param title     Text to display in title.
    * @param content   HTML code to put in the content area of the popup.
    */
    createPopup : function(idPrefix, title, content) {
        var stStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll -0px -30px; " + "height: 30px; width: 30px;";
        var wdStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat; " + "height: 30px; width: 30px;";
        var svStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -60px; " + "height: 30px; width: 30px;";
        var bhStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -120px; " + "height: 30px; width: 30px;";
        var fvStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -150px; " + "height: 30px; width: 30px;";

        GT.$("body").after(

            // Z-index 21, just above the "Manager"-bar (currently 20) and below the pop-ups.
            '<div class="game_inner_box" style="z-index: 21; position:absolute; left:0px; top:0px; display:none;" id="' + idPrefix + 'ResCostBox">'
            +   '<table cellspacing="0" cellpadding="0" class="game_border" >'
            +       '<tr>'
            +           '<td class="game_border_edge" />'
            +           '<td class="game_border_top" />'
            +           '<td class="game_border_edge game_border_edge_2" />'
            +           '</tr>'
            +       '<tr>'
            +           '<td class="game_border_left" />'
            +           '<td>'
            +               '<div style="position:relative; margin: 0px; display: inline-block;">'
            +               '<div class="game_border_socket game_border_socket1" />'
            +               '<div class="game_border_socket game_border_socket2" />'
            +               '<div class="game_border_socket game_border_socket3" />'
            +               '<div class="game_border_socket game_border_socket4" />'

            // Title bar (dragable)
            +               '<div class="game_header" style="cursor:move;" id="' + idPrefix + 'boxDragBar">' + title + '</div>'
            +               '<div class="game_body">' + content + '</div>'
            +               '</td>'
            +           '<td class="game_border_right" />'
            +           '</tr>'
            +       '<tr>'
            +           '<td class="game_border_edge game_border_edge_3" />'
            +           '<td class="game_border_bottom" />'
            +           '<td class="game_border_edge game_border_edge_4" />'
            +           '</tr>'
            +       '</table>'
            +   '</div>'
            );

    // Delay drag binding, otherwise some of the properties may not be initializied.
    GT.uW.setTimeout(GT.drag.init, 100, idPrefix + 'boxDragBar', idPrefix + 'ResCostBox');
        },

    /*
    * Create the a resource pop-up. 
    * 
    * @param idPrefix  Prefix to use for all IDs (to make it unique).
    * @param title     Text to display in title.
    */
    createResPopup : function(idPrefix, title) {
        var stStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll -0px -30px; " + "height: 30px; width: 30px;";
        var wdStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat; " + "height: 30px; width: 30px;";
        var svStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -60px; " + "height: 30px; width: 30px;";
        var bhStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -120px; " + "height: 30px; width: 30px;";
        var fvStyle = "background: transparent " + "url(/images/game/layout/resources.png) no-repeat scroll 0px -150px ;" + "height: 30px; width: 30px;";

        GT.createPopup(idPrefix, title, ''
            +   '<table cellspacing="0" cellpadding="0" class="place_simulator_table">'
            +       '<tr>'
            +           '<td class="place_simulator_even" width="18px" />'
            +           '<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="' + idPrefix + 'HeadWood"  style="' + wdStyle + '" /></td>'
            +           '<td class="left_border place_simulator_even" style="min-width: 45px" align=center><div id="' + idPrefix + 'HeadStone" style="' + stStyle + '" /></td>'
            +           '<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="' + idPrefix + 'HeadIron"  style="' + svStyle + '" /></td>'
            +           '<td class="left_border place_simulator_even" style="min-width: 45px" align=center><div id="' + idPrefix + 'HeadFavor" style="' + fvStyle + '" /></td>'
            +           '<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="' + idPrefix + 'HeadBH"    style="' + bhStyle + '" /></td>'
            +           '</tr>'
            +       '<tr>'
            +           '<td class="left_border place_simulator_even place_losses" align=center style="border-left:0px;"><div class="place_symbol place_att_losts" id="' + idPrefix + 'AttLosts" /></td>'
            +           '<td class="left_border place_simulator_odd place_losses" ><div id="' + idPrefix + 'AttWood"  /></td>'
            +           '<td class="left_border place_simulator_even place_losses"><div id="' + idPrefix + 'AttStone" /></td>'
            +           '<td class="left_border place_simulator_odd place_losses" ><div id="' + idPrefix + 'AttIron"  /></td>'
            +           '<td class="left_border place_simulator_even place_losses"><div id="' + idPrefix + 'AttFavor" /></td>'
            +           '<td class="left_border place_simulator_odd place_losses" ><div id="' + idPrefix + 'AttBH" "  /></td>'
            +           '</tr>'
            +       '<tr>'
            +           '<td class="left_border place_simulator_even place_losses" align=center style="border-left:0px;"><div class="place_symbol place_def_losts" id="' + idPrefix + 'DefLosts" /></td>'
            +           '<td class="left_border place_simulator_odd place_losses" ><div id="' + idPrefix + 'DefWood"  /></td>'
            +           '<td class="left_border place_simulator_even place_losses"><div id="' + idPrefix + 'DefStone" /></td>'
            +           '<td class="left_border place_simulator_odd place_losses" ><div id="' + idPrefix + 'DefIron"  /></td>'
            +           '<td class="left_border place_simulator_even place_losses"><div id="' + idPrefix + 'DefFavor" /></td>'
            +           '<td class="left_border place_simulator_odd place_losses" ><div id="' + idPrefix + 'DefBH"    /></td>'
            +           ' </tr>' 
            +       '</table>'
            +   '</div>'
            );

        var $ = GT.$;
        // Bind info pop-ups to headers.
        $('#' + idPrefix + 'HeadWood' ).setPopup('rcwood_lost' );
        $('#' + idPrefix + 'HeadStone').setPopup('rcstone_lost');
        $('#' + idPrefix + 'HeadIron' ).setPopup('rciron_lost' );
        $('#' + idPrefix + 'HeadFavor').setPopup('rcfavor_lost');
        $('#' + idPrefix + 'HeadBH'   ).setPopup('rcbh_lost'   );
        $('#' + idPrefix + 'AttLosts' ).setPopup('rcatt_lost'  );
        $('#' + idPrefix + 'DefLosts' ).setPopup('rcdef_lost'  );
        },

    // Flags to initicate that a pop-up was already shown and should not be aligned again.
    bBoxOnceShown : {},

    /*
    * Displays a pop-up.
    * @param idPrefix    see createResPopup
    * @param adjustToId  Id of element that should be used to adjust the box.
    * @param adjustMode  "left" or "right"
    */
    ShowPopup : function(idPrefix, adjustToId, adjustMode) {
        var $ = GT.$;
        var showBox = $('#' + idPrefix + 'Show')[0];
        var resBox = $('#' + idPrefix + 'ResCostBox')[0];

        var bShow = resBox.style.display === "none";

        showBox.className = bShow ? "place_sim_bonuses_more_confirm" : "place_sim_showhide";
        $('#' + idPrefix + 'Show').setPopup(bShow ? 'closeResBox' : 'openResBox');
        resBox.style.display = bShow ? "block" : "none";

        if (!GT.bBoxOnceShown[idPrefix]) {
            GT.bBoxOnceShown[idPrefix] = true;
            var adjNode = $('#' + adjustToId)[0];
            resBox.style.top = (GT.getTop(adjNode) + adjNode.offsetHeight + 2) + "px";
            resBox.style.left = (GT.getLeft(adjNode) + adjNode.offsetWidth - resBox.offsetWidth + 2) + "px";
            }

        return false;
        },

	};

GT.init();